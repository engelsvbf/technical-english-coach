import { esc, pageHeader, wrapWordsSynced, wireAnalysis } from "./views.js";
import * as channels from "./modules/channels.js";

// -------------------------------------------------------------- connect gate --
// Every route in this file first checks isChannelsConnected(); if not, it shows
// this small register/login form for the SEPARATE channels-backend identity
// (not the app's existing local profile login).

function renderConnectGate(container, onConnected) {
  container.innerHTML = pageHeader("Intercambio en vivo", "Conecta tu cuenta de canales para crear o unirte a salas de conversación con otras personas en tiempo real.") +
    `<div class="card" style="max-width:480px;">
      <div class="toolbar" style="margin-bottom:12px;">
        <button class="btn sm" id="mode-login">Iniciar sesión</button>
        <button class="btn secondary sm" id="mode-register">Crear cuenta de canales</button>
      </div>
      <div id="connect-err"></div>
      <div class="field" id="field-name" style="display:none;"><label>Nombre para mostrar</label><input type="text" id="c-name" /></div>
      <div class="field"><label>Correo electrónico</label><input type="text" id="c-email" /></div>
      <div class="field"><label>Contraseña</label><input type="password" id="c-pass" /></div>
      <button class="btn" id="c-submit">Iniciar sesión</button>
      <p class="hint">Esta es una cuenta distinta a tu perfil local de aprendizaje — se usa solo para identificarte de forma real ante otros participantes en los canales de voz/chat.</p>
    </div>`;

  let mode = "login";
  const nameField = container.querySelector("#field-name");
  const submitBtn = container.querySelector("#c-submit");
  container.querySelector("#mode-login").addEventListener("click", () => { mode = "login"; nameField.style.display = "none"; submitBtn.textContent = "Iniciar sesión"; });
  container.querySelector("#mode-register").addEventListener("click", () => { mode = "register"; nameField.style.display = "block"; submitBtn.textContent = "Crear cuenta"; });

  submitBtn.addEventListener("click", async () => {
    const email = container.querySelector("#c-email").value.trim();
    const pass = container.querySelector("#c-pass").value;
    const errEl = container.querySelector("#connect-err");
    errEl.innerHTML = "";
    try {
      if (mode === "register") {
        const name = container.querySelector("#c-name").value.trim();
        await channels.registerChannelsUser(email, name, pass);
      } else {
        await channels.loginChannelsUser(email, pass);
      }
      onConnected();
    } catch (err) {
      errEl.innerHTML = `<p class="feedback-bad">${esc(err.message)}</p>`;
    }
  });
}

function requireConnection(container, renderFn) {
  if (!channels.isChannelsConnected()) {
    renderConnectGate(container, () => renderFn(container));
    return false;
  }
  return true;
}

// -------------------------------------------------------------- LEVEL/VIS UI --

const LEVELS = ["Any", "A1", "A2", "B1", "B2", "C1"];

function fmtCount(channel) {
  return `🗣️ ${channel.speakerCount}/${channel.maxSpeakers} hablando · 👂 ${channel.listenerCount}/${channel.maxListeners} escuchando`;
}

// ------------------------------------------------------------------- router --

export function channels_(container, params) {
  if (params[0] === "new") return channelCreate(container);
  if (params[0] === "room" && params[1]) return channelRoom(container, params[1]);
  return channelBrowser(container);
}
export { channels_ as channels };

// ------------------------------------------------------------------ BROWSER --

function channelBrowser(container) {
  if (!requireConnection(container, channelBrowser)) return;
  const me = channels.getChannelsUser();
  container.innerHTML = pageHeader("Intercambio en vivo", `Conectado como ${esc(me.displayName)}. Únete a un canal o crea el tuyo.`) +
    `<div class="toolbar" style="margin-bottom:14px;">
      <button class="btn" id="new-channel-btn">➕ Crear canal</button>
      <button class="btn secondary sm" id="refresh-btn">🔄 Actualizar</button>
      <span class="spacer"></span>
      <button class="btn ghost sm" id="disconnect-btn">Desconectar cuenta de canales</button>
    </div>
    <div id="channel-list"><p class="small-muted">Cargando canales…</p></div>`;

  container.querySelector("#new-channel-btn").addEventListener("click", () => { location.hash = "#/channels/new"; });
  container.querySelector("#disconnect-btn").addEventListener("click", () => { channels.logoutChannels(); channelBrowser(container); });
  container.querySelector("#refresh-btn").addEventListener("click", load);

  const listEl = container.querySelector("#channel-list");
  async function load() {
    listEl.innerHTML = `<p class="small-muted">Cargando canales…</p>`;
    try {
      const list = await channels.listChannels();
      listEl.innerHTML = list.length ? list.map(c => `
        <div class="card unit-card" data-id="${c.id}">
          <div>
            <div style="font-weight:600;">🎙️ ${esc(c.name)} <span class="badge">${esc(c.level)}</span></div>
            <div class="small-muted">${esc(c.description)}</div>
            <div class="small-muted">Tema: ${esc(c.topic || "—")} · ${fmtCount(c)} · Dueño: ${esc(c.ownerName)}</div>
          </div>
          <span class="badge">Entrar →</span>
        </div>
      `).join("") : `<div class="empty-state">No hay canales públicos activos ahora mismo. ¡Crea el primero!</div>`;
      listEl.querySelectorAll("[data-id]").forEach(el => {
        el.addEventListener("click", () => { location.hash = `#/channels/room/${el.dataset.id}`; });
      });
    } catch (err) {
      listEl.innerHTML = `<p class="feedback-bad">${esc(err.message)}</p>`;
    }
  }
  load();
}

// ------------------------------------------------------------------- CREATE --

function channelCreate(container) {
  if (!requireConnection(container, () => channelCreate(container))) return;
  container.innerHTML = `<a href="#/channels" class="btn ghost">← Volver a canales</a>` +
    pageHeader("Crear canal", "Configura tu sala de intercambio de idiomas.") +
    `<div class="card" style="max-width:560px;">
      <div id="create-err"></div>
      <div class="field"><label>Nombre del canal</label><input type="text" id="f-name" placeholder="English at Work" /></div>
      <div class="field"><label>Descripción</label><textarea id="f-desc" placeholder="Practice English for technical meetings."></textarea></div>
      <div class="grid-2">
        <div class="field"><label>Nivel</label><select id="f-level">${LEVELS.map(l => `<option value="${l}">${l}</option>`).join("")}</select></div>
        <div class="field"><label>Tema</label><input type="text" id="f-topic" placeholder="Technology" /></div>
      </div>
      <div class="grid-2">
        <div class="field"><label>Máx. speakers (1–6)</label><input type="number" id="f-max-speakers" value="6" min="1" max="6" /></div>
        <div class="field"><label>Máx. listeners</label><input type="number" id="f-max-listeners" value="30" min="1" max="200" /></div>
      </div>
      <div class="field">
        <label>Visibilidad</label>
        <select id="f-visibility">
          <option value="Public">Pública</option>
          <option value="Private">Privada</option>
          <option value="InviteOnly">Solo por invitación</option>
        </select>
      </div>
      <button class="btn" id="create-submit">Crear canal</button>
    </div>`;

  container.querySelector("#create-submit").addEventListener("click", async () => {
    const errEl = container.querySelector("#create-err");
    errEl.innerHTML = "";
    try {
      const payload = {
        name: container.querySelector("#f-name").value.trim(),
        description: container.querySelector("#f-desc").value.trim(),
        language: "en",
        level: container.querySelector("#f-level").value,
        topic: container.querySelector("#f-topic").value.trim(),
        maxSpeakers: +container.querySelector("#f-max-speakers").value,
        maxListeners: +container.querySelector("#f-max-listeners").value,
        visibility: container.querySelector("#f-visibility").value
      };
      const result = await channels.createChannel(payload);
      location.hash = `#/channels/room/${result.id}`;
    } catch (err) {
      errEl.innerHTML = `<p class="feedback-bad">${esc(err.message)}</p>`;
    }
  });
}

// --------------------------------------------------------------------- ROOM --

let roomState = null; // set while a room view is mounted; used by channelRoomCleanup

export async function channelRoomCleanup() {
  if (!roomState) return;
  const { channelId, unsubscribers } = roomState;
  unsubscribers.forEach(off => off());
  try { await channels.leaveChannel(channelId); } catch (e) { /* best-effort */ }
  channels.disconnectHub();
  document.querySelectorAll('audio[id^="remote-audio-"]').forEach(el => el.remove());
  roomState = null;
}

function stateLabel(state) {
  return { Listener: "Oyente", Speaking: "Hablando", Muted: "Silenciado", SpeakingRequested: "Solicitó hablar", Removed: "Expulsado", Blocked: "Bloqueado" }[state] || state;
}

async function channelRoom(container, channelId) {
  if (!requireConnection(container, () => channelRoom(container, channelId))) return;
  await channelRoomCleanup(); // tear down any previous room before mounting a new one

  const me = channels.getChannelsUser();
  container.innerHTML = pageHeader("Cargando canal…", "") + `<p class="small-muted loading-dots">Conectando</p>`;

  const roster = new Map();       // userId -> {userId, displayName, state, isOwner}
  const pending = new Map();      // userId -> {userId, displayName, requestedAt}
  const messages = [];
  let ownerId = null;
  let channelName = "";
  const unsubscribers = [];
  roomState = { channelId, unsubscribers };

  function myState() { return roster.get(me.id)?.state; }
  function amOwner() { return ownerId === me.id; }
  function speakerIds(excludeSelf = false) {
    return [...roster.values()].filter(p => p.state === "Speaking" && (!excludeSelf || p.userId !== me.id)).map(p => p.userId);
  }

  try {
    await channels.connectHub();
  } catch (err) {
    container.innerHTML = pageHeader("Intercambio en vivo", "") + `<div class="card"><p class="feedback-bad">No se pudo conectar con el servidor de canales: ${esc(err.message)}</p></div>`;
    return;
  }

  channels.setLocalIdentity(me.id, channelId);

  unsubscribers.push(channels.on("RoomSnapshot", async (snap) => {
    if (snap.channelId !== channelId) return;
    channelName = snap.name;
    ownerId = snap.ownerId;
    roster.clear();
    snap.participants.forEach(p => roster.set(p.userId, p));
    pending.clear();
    snap.pendingRequests.forEach(r => pending.set(r.userId, r));
    messages.length = 0;
    messages.push(...snap.recentMessages);
    renderRoom();

    // Establish this client's own WebRTC links based on my current role.
    try {
      if (myState() === "Speaking") {
        await channels.ensureLocalStream();
        await channels.connectAsSpeakerTo(speakerIds(true));
      } else {
        await channels.connectAsListenerTo(speakerIds(true));
      }
    } catch (err) {
      console.error("WebRTC setup failed", err);
    }
  }));

  unsubscribers.push(channels.on("ParticipantJoined", async (p) => {
    roster.set(p.userId, p);
    renderRoom();
    if (p.userId !== me.id && p.state === "Speaking" && myState() !== "Speaking") {
      try { await channels.connectAsListenerTo([p.userId]); } catch (e) { /* ignore */ }
    }
  }));

  unsubscribers.push(channels.on("ParticipantLeft", (userId) => {
    channels.closePeer(userId);
    renderRoom();
  }));

  unsubscribers.push(channels.on("ParticipantStateChanged", async (userId, state) => {
    const existing = roster.get(userId);
    if (existing) existing.state = state;
    if (state === "SpeakingRequested") { /* pending list already updated via SpeakingRequestCreated */ }
    renderRoom();

    if (userId === me.id && state === "Speaking") {
      try {
        await channels.ensureLocalStream();
        await channels.connectAsSpeakerTo(speakerIds(true));
      } catch (err) { console.error(err); }
    } else if (userId !== me.id && state === "Speaking" && myState() !== "Speaking") {
      try { await channels.connectAsListenerTo([userId]); } catch (e) { /* ignore */ }
    } else if (userId !== me.id && (state === "Listener" || state === "Removed" || state === "Blocked")) {
      channels.closePeer(userId);
    }

    if (userId === me.id && (state === "Removed" || state === "Blocked")) {
      alert(state === "Removed" ? "El dueño te removió de este canal." : "El dueño te bloqueó de este canal.");
      location.hash = "#/channels";
    }
  }));

  unsubscribers.push(channels.on("SpeakingRequestCreated", (r) => { pending.set(r.userId, r); renderRoom(); }));
  unsubscribers.push(channels.on("SpeakingRequestResolved", (userId) => { pending.delete(userId); renderRoom(); }));
  unsubscribers.push(channels.on("NewMessage", (m) => { messages.push(m); renderMessages(); }));
  unsubscribers.push(channels.on("ChannelEnded", () => {
    alert("El dueño finalizó este canal.");
    location.hash = "#/channels";
  }));
  unsubscribers.push(channels.on("Error", (msg) => {
    const el = container.querySelector("#room-error");
    if (el) { el.innerHTML = `<p class="feedback-bad">${esc(msg)}</p>`; setTimeout(() => { el.innerHTML = ""; }, 4000); }
  }));
  unsubscribers.push(channels.on("talking-changed", (userId, talking) => {
    const row = container.querySelector(`.participant-row[data-uid="${userId}"] .speak-indicator`);
    if (row) row.classList.toggle("active", talking);
  }));
  unsubscribers.push(channels.on("peer-connection-state", (userId, state) => {
    const row = container.querySelector(`.participant-row[data-uid="${userId}"] .conn-state`);
    if (row) row.textContent = state === "connected" ? "🔊" : state === "connecting" ? "…" : "";
  }));

  // Registered before joinChannel so no early remote track is missed once WebRTC
  // setup kicks off from the RoomSnapshot handler above.
  unsubscribers.push(channels.on("remote-track", (userId, stream) => {
    let el = document.getElementById(`remote-audio-${userId}`);
    if (!el) {
      el = document.createElement("audio");
      el.id = `remote-audio-${userId}`;
      el.autoplay = true;
      el.style.display = "none";
      document.body.appendChild(el);
    }
    el.srcObject = stream;
  }));

  try {
    await channels.joinChannel(channelId);
  } catch (err) {
    container.innerHTML = pageHeader("Intercambio en vivo", "") + `<div class="card"><p class="feedback-bad">${esc(err.message)}</p></div>`;
    return;
  }

  function renderRoom() {
    const speakers = [...roster.values()].filter(p => p.state === "Speaking" || p.state === "Muted");
    const listeners = [...roster.values()].filter(p => p.state === "Listener" || p.state === "SpeakingRequested");

    container.innerHTML = `
      <a href="#/channels" class="btn ghost">← Todos los canales</a>
      ${pageHeader(`🎙️ ${channelName}`, amOwner() ? "Eres el dueño de este canal." : "")}
      <div id="room-error"></div>
      <div class="grid-2">
        <div class="participants-panel card">
          <h3>🗣️ Hablando (${speakers.length})</h3>
          ${speakers.map(p => participantRowHtml(p)).join("") || `<p class="small-muted">Nadie está hablando todavía.</p>`}
          <div class="divider"></div>
          <h3>👂 Escuchando (${listeners.length})</h3>
          ${listeners.map(p => participantRowHtml(p)).join("") || `<p class="small-muted">No hay oyentes.</p>`}
          ${amOwner() && pending.size ? `
            <div class="divider"></div>
            <h3>🎤 Solicitudes para hablar (${pending.size})</h3>
            ${[...pending.values()].map(r => `
              <div class="request-queue-row" data-uid="${r.userId}">
                <span>${esc(r.displayName)}</span>
                <span>
                  <button class="btn sm approve-btn" data-uid="${r.userId}">Allow</button>
                  <button class="btn secondary sm reject-btn" data-uid="${r.userId}">Reject</button>
                </span>
              </div>
            `).join("")}
          ` : ""}
          ${roomControlsHtml()}
        </div>
        <div class="card room-chat">
          <h3>💬 Chat del canal</h3>
          <div class="chat-window" id="room-chat-window"></div>
          <div class="chat-input-row">
            <textarea id="room-chat-input" placeholder="Escribe un mensaje..."></textarea>
            <button class="btn" id="room-chat-send">Enviar</button>
          </div>
          <div id="chat-analysis-panel"></div>
        </div>
      </div>
    `;
    renderMessages();
    bindRoomEvents();
  }

  function participantRowHtml(p) {
    return `
      <div class="participant-row" data-uid="${p.userId}">
        <span class="status-dot status-${p.state === "Speaking" ? "learned" : p.state === "Muted" ? "needs-review" : "new"}"></span>
        <span class="speak-indicator" title="Hablando ahora"></span>
        <span>${esc(p.displayName)}${p.isOwner ? " 👑" : ""} ${p.userId === me.id ? "(tú)" : ""}</span>
        <span class="role-badge">${stateLabel(p.state)}</span>
        <span class="conn-state small-muted"></span>
        ${amOwner() && p.userId !== me.id ? ownerControlsHtml(p) : ""}
      </div>`;
  }

  function ownerControlsHtml(p) {
    const btns = [];
    if (p.state === "Speaking") btns.push(`<button class="btn secondary sm" data-action="mute" data-uid="${p.userId}">Mute</button>`);
    if (p.state === "Muted") btns.push(`<button class="btn secondary sm" data-action="unmute" data-uid="${p.userId}">Unmute</button>`);
    if (p.state === "Speaking" || p.state === "Muted") btns.push(`<button class="btn secondary sm" data-action="remove-speaking" data-uid="${p.userId}">Remove speaking</button>`);
    if (p.state === "Listener" || p.state === "SpeakingRequested") btns.push(`<button class="btn secondary sm" data-action="give-speaking" data-uid="${p.userId}">Give speaking</button>`);
    btns.push(`<button class="btn secondary sm" data-action="remove-user" data-uid="${p.userId}">Remove</button>`);
    btns.push(`<button class="btn secondary sm" data-action="block-user" data-uid="${p.userId}">Block</button>`);
    return `<span class="owner-controls">${btns.join("")}</span>`;
  }

  function roomControlsHtml() {
    const mine = myState();
    const parts = [];
    if (mine === "Listener") parts.push(`<button class="btn" id="request-speak-btn">✋ Request to Speak</button>`);
    if (mine === "SpeakingRequested") parts.push(`<button class="btn secondary" id="cancel-request-btn">Cancelar solicitud</button>`);
    if (mine === "Speaking") parts.push(`<button class="btn secondary" id="mute-self-btn">🎤 Silenciarme</button>`);
    if (mine === "Muted") parts.push(`<span class="small-muted">Silenciado por el dueño.</span>`);
    if (amOwner()) parts.push(`<button class="btn secondary" id="end-channel-btn">🔴 End Channel</button>`);
    return `<div class="toolbar" style="margin-top:12px;">${parts.join("")}</div>`;
  }

  function renderMessages() {
    const win = container.querySelector("#room-chat-window");
    if (!win) return;
    win.innerHTML = messages.map(m => `
      <div class="msg ${m.userId === me.id ? "user" : "assistant"}">
        <div class="small-muted" style="margin-bottom:2px;">${esc(m.displayName)}</div>
        <div class="chat-msg-text" data-mid="${m.id}"></div>
      </div>
    `).join("") || `<p class="small-muted">Sin mensajes todavía. ¡Saluda!</p>`;
    const panel = container.querySelector("#chat-analysis-panel");
    messages.forEach(m => {
      const el = win.querySelector(`.chat-msg-text[data-mid="${m.id}"]`);
      if (el) {
        el.innerHTML = wrapWordsSynced(m.text);
        wireAnalysis(el, panel, m.text, null);
      }
    });
    win.scrollTop = win.scrollHeight;
  }

  function bindRoomEvents() {
    container.querySelector("#request-speak-btn")?.addEventListener("click", () => channels.requestToSpeak(channelId));
    container.querySelector("#cancel-request-btn")?.addEventListener("click", () => channels.cancelSpeakRequest(channelId));
    container.querySelector("#mute-self-btn")?.addEventListener("click", () => channels.removeSpeakingPermission(channelId, me.id));
    container.querySelector("#end-channel-btn")?.addEventListener("click", () => {
      if (confirm("¿Finalizar este canal para todos?")) channels.endChannel(channelId);
    });
    container.querySelectorAll(".approve-btn").forEach(b => b.addEventListener("click", () => channels.approveSpeaker(channelId, b.dataset.uid)));
    container.querySelectorAll(".reject-btn").forEach(b => b.addEventListener("click", () => channels.rejectSpeaker(channelId, b.dataset.uid)));
    container.querySelectorAll("[data-action]").forEach(b => {
      const uid = b.dataset.uid;
      const actions = {
        mute: () => channels.muteUser(channelId, uid),
        unmute: () => channels.unmuteUser(channelId, uid),
        "remove-speaking": () => channels.removeSpeakingPermission(channelId, uid),
        "give-speaking": () => channels.giveSpeakingPermission(channelId, uid),
        "remove-user": () => { if (confirm("¿Remover a este usuario del canal?")) channels.removeUser(channelId, uid); },
        "block-user": () => { if (confirm("¿Bloquear a este usuario permanentemente de este canal?")) channels.blockUser(channelId, uid); }
      };
      b.addEventListener("click", () => actions[b.dataset.action]?.());
    });
    const sendBtn = container.querySelector("#room-chat-send");
    const input = container.querySelector("#room-chat-input");
    sendBtn?.addEventListener("click", () => {
      const text = input.value.trim();
      if (!text) return;
      channels.sendChatMessage(channelId, text);
      input.value = "";
    });
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendBtn.click(); }
    });
  }
}
