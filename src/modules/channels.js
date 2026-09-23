// Client for the language-exchange channels backend (a separate ASP.NET Core +
// SignalR process, see channelsConfig.js). This identity is deliberately SEPARATE
// from the app's existing local-only profile login (auth.js) -- that one is
// per-browser and unverifiable by a real server, so it can't be trusted for
// multi-user permissions. Connecting to channels is its own step.

import { apiBaseUrl, hubUrl, iceServers } from "./channelsConfig.js";

const AUTH_KEY = "etc_channels_auth_v1";

// --- Channels-backend auth (separate token/session from the local app login) ---

export class ChannelsAuthError extends Error {}

function loadAuth() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); } catch (e) { return null; }
}
function saveAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function getChannelsUser() {
  return loadAuth()?.user || null;
}

export function isChannelsConnected() {
  return !!loadAuth()?.token;
}

export function logoutChannels() {
  localStorage.removeItem(AUTH_KEY);
  disconnectHub();
}

async function authRequest(path, body) {
  const resp = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new ChannelsAuthError(data.message || "No se pudo conectar con el servidor de canales.");
  saveAuth(data);
  return data.user;
}

export async function registerChannelsUser(email, displayName, password) {
  return authRequest("/api/auth/register", { email, displayName, password });
}

export async function loginChannelsUser(email, password) {
  return authRequest("/api/auth/login", { email, password });
}

function authToken() {
  const auth = loadAuth();
  if (!auth?.token) throw new ChannelsAuthError("No has conectado tu cuenta de canales todavía.");
  return auth.token;
}

// --- REST helpers ------------------------------------------------------------

async function apiFetch(path, options = {}) {
  const resp = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken()}`,
      ...(options.headers || {})
    }
  });
  const data = await resp.json().catch(() => null);
  if (!resp.ok) throw new ChannelsAuthError(data?.message || `Error del servidor de canales (${resp.status}).`);
  return data;
}

export function listChannels() {
  return apiFetch("/api/channels");
}

export function getChannel(id) {
  return apiFetch(`/api/channels/${id}`);
}

export function createChannel(payload) {
  return apiFetch("/api/channels", { method: "POST", body: JSON.stringify(payload) });
}

// --- SignalR hub connection + simple pub/sub ---------------------------------

let connection = null;
const listeners = new Map(); // eventName -> Set<callback>

function emit(eventName, ...args) {
  (listeners.get(eventName) || new Set()).forEach(cb => { try { cb(...args); } catch (e) { console.error(e); } });
}

export function on(eventName, cb) {
  if (!listeners.has(eventName)) listeners.set(eventName, new Set());
  listeners.get(eventName).add(cb);
  return () => listeners.get(eventName)?.delete(cb);
}

const HUB_EVENTS = [
  "RoomSnapshot", "ParticipantJoined", "ParticipantLeft", "ParticipantStateChanged",
  "SpeakingRequestCreated", "SpeakingRequestResolved", "NewMessage", "ChannelEnded", "Error",
  "ReceiveOffer", "ReceiveAnswer", "ReceiveIceCandidate"
];

export async function connectHub() {
  if (connection && connection.state === window.signalR.HubConnectionState.Connected) return connection;
  const token = authToken();
  connection = new window.signalR.HubConnectionBuilder()
    .withUrl(`${hubUrl}?access_token=${encodeURIComponent(token)}`)
    .withAutomaticReconnect()
    .build();

  HUB_EVENTS.forEach(name => {
    connection.on(name, (...args) => {
      emit(name, ...args);
      if (name === "ReceiveOffer") handleReceiveOffer(...args);
      if (name === "ReceiveAnswer") handleReceiveAnswer(...args);
      if (name === "ReceiveIceCandidate") handleReceiveIceCandidate(...args);
      if (name === "ParticipantStateChanged") handleParticipantStateChanged(...args);
    });
  });

  await connection.start();
  return connection;
}

export function disconnectHub() {
  closeAllPeers();
  if (connection) {
    connection.stop();
    connection = null;
  }
}

function invoke(method, ...args) {
  if (!connection) throw new ChannelsAuthError("No estás conectado a un canal.");
  return connection.invoke(method, ...args);
}

// --- High-level channel actions (thin wrappers over hub methods) -------------

export const joinChannel = (channelId) => invoke("JoinChannel", channelId);
export const leaveChannel = (channelId) => { closeAllPeers(); return invoke("LeaveChannel", channelId); };
export const sendChatMessage = (channelId, text) => invoke("SendMessage", channelId, text);
export const requestToSpeak = (channelId) => invoke("RequestToSpeak", channelId);
export const cancelSpeakRequest = (channelId) => invoke("CancelSpeakRequest", channelId);
export const approveSpeaker = (channelId, userId) => invoke("ApproveSpeaker", channelId, userId);
export const rejectSpeaker = (channelId, userId) => invoke("RejectSpeaker", channelId, userId);
export const giveSpeakingPermission = (channelId, userId) => invoke("GiveSpeakingPermission", channelId, userId);
export const removeSpeakingPermission = (channelId, userId) => invoke("RemoveSpeakingPermission", channelId, userId);
export const muteUser = (channelId, userId) => invoke("MuteUser", channelId, userId);
export const unmuteUser = (channelId, userId) => invoke("UnmuteUser", channelId, userId);
export const removeUser = (channelId, userId) => invoke("RemoveUser", channelId, userId);
export const blockUser = (channelId, userId) => invoke("BlockUser", channelId, userId);
export const unblockUser = (channelId, userId) => invoke("UnblockUser", channelId, userId);
export const endChannel = (channelId) => invoke("EndChannel", channelId);

// --- WebRTC mesh audio ---------------------------------------------------------
// Topology: whoever newly needs a link to an existing Speaker always initiates the
// offer (avoids glare). A Speaker opens sendrecv connections to every other current
// Speaker; a Listener opens recvonly connections to every current Speaker. On
// promotion, existing recvonly links are closed and recreated as sendrecv rather
// than renegotiated in place (simpler for Stage 1).

let localStream = null;
let myUserId = null;
let myChannelId = null;
const peers = new Map(); // userId -> RTCPeerConnection

export function setLocalIdentity(userId, channelId) {
  myUserId = userId;
  myChannelId = channelId;
}

export async function ensureLocalStream() {
  if (localStream) return localStream;
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  if (myUserId) startTalkMonitor(myUserId, localStream);
  return localStream;
}

export function stopLocalStream() {
  localStream?.getTracks().forEach(t => t.stop());
  localStream = null;
  if (myUserId) stopTalkMonitor(myUserId);
}

export function setLocalMicEnabled(enabled) {
  localStream?.getAudioTracks().forEach(t => { t.enabled = enabled; });
}

function newPeerConnection() {
  return new RTCPeerConnection({ iceServers });
}

function wirePeerCommon(pc, peerUserId) {
  pc.onicecandidate = (e) => {
    if (e.candidate) sendIceCandidateSafe(peerUserId, JSON.stringify(e.candidate));
  };
  pc.ontrack = (e) => {
    emit("remote-track", peerUserId, e.streams[0]);
    startTalkMonitor(peerUserId, e.streams[0]);
  };
  pc.onconnectionstatechange = () => {
    emit("peer-connection-state", peerUserId, pc.connectionState);
  };
}

// --- "Who's talking right now" visual indicator (spec 12.5) --------------------
// Simple volume-threshold monitor per stream (local + each remote), no server
// involvement -- purely a client-side visual cue over the already-flowing audio.
let audioCtx = null;
const talkMonitors = new Map(); // userId -> { intervalId }

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function startTalkMonitor(userId, stream) {
  stopTalkMonitor(userId);
  try {
    const ctx = getAudioCtx();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    let talking = false;
    const intervalId = setInterval(() => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      const isTalking = avg > 12;
      if (isTalking !== talking) { talking = isTalking; emit("talking-changed", userId, talking); }
    }, 200);
    talkMonitors.set(userId, { intervalId });
  } catch (e) { /* AudioContext unavailable -- indicator just won't show, non-fatal */ }
}

function stopTalkMonitor(userId) {
  const m = talkMonitors.get(userId);
  if (m) { clearInterval(m.intervalId); talkMonitors.delete(userId); }
  emit("talking-changed", userId, false);
}

function sendIceCandidateSafe(toUserId, payload) {
  if (!connection || !myChannelId) return;
  connection.invoke("SendIceCandidate", myChannelId, toUserId, payload).catch(() => {});
}

// Called when I become (or already am) a Speaker: open sendrecv links to every
// OTHER current speaker userId in `speakerUserIds`.
export async function connectAsSpeakerTo(speakerUserIds) {
  await ensureLocalStream();
  for (const peerUserId of speakerUserIds) {
    if (peerUserId === myUserId) continue;
    closePeer(peerUserId); // replace any existing recvonly link
    const pc = newPeerConnection();
    peers.set(peerUserId, pc);
    wirePeerCommon(pc, peerUserId);
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await connection.invoke("SendOffer", myChannelId, peerUserId, JSON.stringify(offer));
  }
}

// Called when I'm a Listener: open recvonly links to every current speaker.
export async function connectAsListenerTo(speakerUserIds) {
  for (const peerUserId of speakerUserIds) {
    if (peerUserId === myUserId || peers.has(peerUserId)) continue;
    const pc = newPeerConnection();
    pc.addTransceiver("audio", { direction: "recvonly" });
    peers.set(peerUserId, pc);
    wirePeerCommon(pc, peerUserId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await connection.invoke("SendOffer", myChannelId, peerUserId, JSON.stringify(offer));
  }
}

async function handleReceiveOffer(fromUserId, payload) {
  const offer = JSON.parse(payload);
  closePeer(fromUserId);
  const pc = newPeerConnection();
  peers.set(fromUserId, pc);
  wirePeerCommon(pc, fromUserId);
  // If I currently have a local mic stream (I'm a Speaker), answer with my audio too;
  // otherwise answer receive-only.
  if (localStream) {
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
  } else {
    pc.addTransceiver("audio", { direction: "recvonly" });
  }
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  await connection.invoke("SendAnswer", myChannelId, fromUserId, JSON.stringify(answer));
}

async function handleReceiveAnswer(fromUserId, payload) {
  const pc = peers.get(fromUserId);
  if (!pc) return;
  await pc.setRemoteDescription(JSON.parse(payload));
}

async function handleReceiveIceCandidate(fromUserId, payload) {
  const pc = peers.get(fromUserId);
  if (!pc) return;
  try { await pc.addIceCandidate(JSON.parse(payload)); } catch (e) { /* ignore late/duplicate candidates */ }
}

// If I get demoted/muted, disable my own outgoing track locally (the server can't
// forcibly stop already-flowing P2P audio, so the client must cooperate here).
function handleParticipantStateChanged(userId, state) {
  if (userId !== myUserId) return;
  if (state === "Muted") setLocalMicEnabled(false);
  if (state === "Speaking") setLocalMicEnabled(true);
  if (state === "Listener") { stopLocalStream(); closeAllPeers(); }
}

export function closePeer(userId) {
  const pc = peers.get(userId);
  if (pc) { pc.close(); peers.delete(userId); }
  stopTalkMonitor(userId);
}

export function closeAllPeers() {
  peers.forEach(pc => pc.close());
  peers.clear();
  Array.from(talkMonitors.keys()).forEach(stopTalkMonitor);
}

export function getPeerConnectionState(userId) {
  return peers.get(userId)?.connectionState || "none";
}
