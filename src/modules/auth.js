// Local, browser-only account system. There is no server: everything lives in this
// browser's localStorage. Passwords are salted + hashed (SHA-256) before storage —
// reasonable for keeping a shared device honest, but this is NOT production-grade
// security and there is no real email-based password recovery (no backend to send
// mail from). Recovery instead uses a locally-stored security question.

const PROFILES_KEY = "etc_profiles_v1";
const SESSION_KEY = "etc_session_v1";

export class AuthError extends Error {}

function loadProfiles() {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveProfiles(profiles) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

function randomHex(bytes = 16) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function hashSecret(secret, salt) {
  return sha256Hex(`${salt}:${secret.trim().toLowerCase()}`);
}

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

export function listProfiles() {
  return loadProfiles().map(p => ({ id: p.id, name: p.name, email: p.email }));
}

export function findByEmail(email) {
  const norm = normalizeEmail(email);
  return loadProfiles().find(p => normalizeEmail(p.email) === norm) || null;
}

export async function register({ name, email, password, securityQuestion, securityAnswer }) {
  name = (name || "").trim();
  email = normalizeEmail(email);
  if (!name) throw new AuthError("Ingresa tu nombre.");
  if (!email || !email.includes("@")) throw new AuthError("Ingresa un correo válido.");
  if (!password || password.length < 4) throw new AuthError("La contraseña debe tener al menos 4 caracteres.");
  if (!securityQuestion || !securityAnswer) throw new AuthError("Completa la pregunta de seguridad para poder recuperar tu cuenta.");
  if (findByEmail(email)) throw new AuthError("Ya existe una cuenta con ese correo en este navegador.");

  const salt = randomHex();
  const passwordHash = await hashSecret(password, salt);
  const secSalt = randomHex();
  const securityAnswerHash = await hashSecret(securityAnswer, secSalt);

  const profile = {
    id: `p_${Date.now().toString(36)}_${randomHex(4)}`,
    name,
    email,
    salt,
    passwordHash,
    securityQuestion,
    secSalt,
    securityAnswerHash,
    createdAt: Date.now()
  };
  const profiles = loadProfiles();
  profiles.push(profile);
  saveProfiles(profiles);
  setSession(profile.id);
  return publicProfile(profile);
}

export async function login(email, password) {
  const profile = findByEmail(email);
  if (!profile) throw new AuthError("No existe ninguna cuenta con ese correo en este navegador.");
  const hash = await hashSecret(password, profile.salt);
  if (hash !== profile.passwordHash) throw new AuthError("Contraseña incorrecta.");
  setSession(profile.id);
  return publicProfile(profile);
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setSession(profileId) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ profileId }));
}

function publicProfile(p) {
  return { id: p.id, name: p.name, email: p.email, securityQuestion: p.securityQuestion, createdAt: p.createdAt };
}

export function getCurrentProfile() {
  const session = getSession();
  if (!session) return null;
  const profiles = loadProfiles();
  const p = profiles.find(x => x.id === session.profileId);
  return p ? publicProfile(p) : null;
}

export function getSecurityQuestion(email) {
  const profile = findByEmail(email);
  return profile ? profile.securityQuestion : null;
}

export async function resetPasswordWithSecurityAnswer(email, answer, newPassword) {
  const profiles = loadProfiles();
  const profile = profiles.find(p => normalizeEmail(p.email) === normalizeEmail(email));
  if (!profile) throw new AuthError("No existe ninguna cuenta con ese correo en este navegador.");
  const answerHash = await hashSecret(answer, profile.secSalt);
  if (answerHash !== profile.securityAnswerHash) throw new AuthError("La respuesta de seguridad no coincide.");
  if (!newPassword || newPassword.length < 4) throw new AuthError("La nueva contraseña debe tener al menos 4 caracteres.");
  const salt = randomHex();
  profile.salt = salt;
  profile.passwordHash = await hashSecret(newPassword, salt);
  saveProfiles(profiles);
  setSession(profile.id);
  return publicProfile(profile);
}

export async function changePassword(profileId, oldPassword, newPassword) {
  const profiles = loadProfiles();
  const profile = profiles.find(p => p.id === profileId);
  if (!profile) throw new AuthError("Perfil no encontrado.");
  const oldHash = await hashSecret(oldPassword, profile.salt);
  if (oldHash !== profile.passwordHash) throw new AuthError("La contraseña actual no es correcta.");
  if (!newPassword || newPassword.length < 4) throw new AuthError("La nueva contraseña debe tener al menos 4 caracteres.");
  const salt = randomHex();
  profile.salt = salt;
  profile.passwordHash = await hashSecret(newPassword, salt);
  saveProfiles(profiles);
  return true;
}

export function updateProfileInfo(profileId, { name, email }) {
  const profiles = loadProfiles();
  const profile = profiles.find(p => p.id === profileId);
  if (!profile) throw new AuthError("Perfil no encontrado.");
  if (name && name.trim()) profile.name = name.trim();
  if (email && email.trim()) {
    const norm = normalizeEmail(email);
    const clash = profiles.find(p => p.id !== profileId && normalizeEmail(p.email) === norm);
    if (clash) throw new AuthError("Ese correo ya está en uso por otra cuenta local.");
    profile.email = norm;
  }
  saveProfiles(profiles);
  return publicProfile(profile);
}

export function deleteProfile(profileId) {
  const profiles = loadProfiles().filter(p => p.id !== profileId);
  saveProfiles(profiles);
  const session = getSession();
  if (session && session.profileId === profileId) logout();
}

// --- Full raw profile record, used only for backup export/import ------------

export function exportProfileRaw(profileId) {
  const profiles = loadProfiles();
  return profiles.find(p => p.id === profileId) || null;
}

export function importProfileRaw(rawProfile) {
  if (!rawProfile || !rawProfile.email || !rawProfile.passwordHash) {
    throw new AuthError("El archivo de respaldo no es válido.");
  }
  const profiles = loadProfiles();
  const idx = profiles.findIndex(p => normalizeEmail(p.email) === normalizeEmail(rawProfile.email));
  const restored = { ...rawProfile, id: idx !== -1 ? profiles[idx].id : (rawProfile.id || `p_${Date.now().toString(36)}_${randomHex(4)}`) };
  if (idx !== -1) profiles[idx] = restored;
  else profiles.push(restored);
  saveProfiles(profiles);
  setSession(restored.id);
  return publicProfile(restored);
}
