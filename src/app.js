import { getState, logStudyMinutes, initForProfile, clearActiveProfile } from "./modules/store.js";
import { getSession, getCurrentProfile, logout as authLogout } from "./modules/auth.js";
import { stopSpeaking } from "./modules/speech.js";
import { isSectionUnlocked } from "./modules/progression.js";
import * as views from "./views.js";
import * as authViews from "./authViews.js";
import * as channelViews from "./channelViews.js";

// Grouped into labeled clusters instead of one flat list -- 14 destinations in a
// single unbroken list was hard to scan, especially on the phone-width layout
// the app now also ships as (the Android package).
const NAV_GROUPS = [
  { label: null, items: [
    { route: "home", label: "Inicio", icon: "🏠" }
  ] },
  { label: "Aprender", items: [
    { route: "lessons", label: "Lecciones", icon: "📚" },
    { route: "reading", label: "Lecturas", icon: "📖" },
    { route: "stories", label: "Cuentos", icon: "📗" },
    { route: "conversations", label: "Conversaciones", icon: "💬" },
    { route: "pronunciation", label: "Pronunciación", icon: "🎧" },
    { route: "exercises", label: "Ejercicios", icon: "✏️" }
  ] },
  { label: "Vocabulario", items: [
    { route: "vocabulary", label: "Vocabulario", icon: "📕" },
    { route: "verbs", label: "Verbos", icon: "🔤" },
    { route: "grammar", label: "Gramática", icon: "🧩" }
  ] },
  { label: "Practicar", items: [
    { route: "channels", label: "Intercambio en vivo", icon: "🗣️" },
    { route: "tutor", label: "Tutor IA", icon: "🤖" }
  ] },
  { label: "Tú", items: [
    { route: "progress", label: "Mi progreso", icon: "📊" },
    { route: "profile", label: "Mi perfil", icon: "⚙️" }
  ] }
];
const NAV = NAV_GROUPS.flatMap(g => g.items);

const AUTH_ROUTES = new Set(["login", "register", "forgot-password"]);

const app = document.getElementById("app");
let currentProfile = null;

function parseHash() {
  const raw = (location.hash || "#/home").replace(/^#\/?/, "");
  const parts = raw.split("/").filter(Boolean);
  return { route: parts[0] || "home", params: parts.slice(1) };
}

// -------------------------------------------------------------- App shell --

function renderAppShell() {
  app.innerHTML = `
    <header class="topbar">
      <button class="hamburger-btn" id="hamburger-btn" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>
      <div class="topbar-title" id="topbar-title">Technical English Coach</div>
    </header>
    <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
    <aside class="sidebar" id="sidebar">
      <div class="brand"><span class="dot"></span> Technical English Coach</div>
      <nav id="nav"></nav>
      <div class="sidebar-footer" id="sidebar-footer"></div>
    </aside>
    <main id="main"></main>
  `;
  renderNav();
  renderFooter();

  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  const closeDrawer = () => { sidebar.classList.remove("open"); backdrop.classList.remove("visible"); };
  document.getElementById("hamburger-btn").addEventListener("click", () => {
    sidebar.classList.toggle("open");
    backdrop.classList.toggle("visible");
  });
  backdrop.addEventListener("click", closeDrawer);
}

function renderNav() {
  const { route } = parseHash();
  const nav = document.getElementById("nav");
  nav.innerHTML = NAV_GROUPS.map(group => `
    ${group.label ? `<div class="nav-group-label">${group.label}</div>` : ""}
    ${group.items.map(item => `
      <button class="nav-item ${route === item.route ? "active" : ""} ${isSectionUnlocked(item.route) ? "" : "locked"}" data-route="${item.route}">
        <span class="nav-icon">${isSectionUnlocked(item.route) ? item.icon : "🔒"}</span> ${item.label}
      </button>
    `).join("")}
  `).join("");
  nav.querySelectorAll("[data-route]").forEach(btn => {
    btn.addEventListener("click", () => {
      location.hash = `#/${btn.dataset.route}`;
      const sidebar = document.getElementById("sidebar");
      const backdrop = document.getElementById("sidebar-backdrop");
      sidebar?.classList.remove("open");
      backdrop?.classList.remove("visible");
    });
  });
  const title = document.getElementById("topbar-title");
  if (title) title.textContent = NAV.find(i => i.route === route)?.label || (route === "profile" ? "Mi perfil" : "Technical English Coach");
}

function renderFooter() {
  const state = getState();
  const footer = document.getElementById("sidebar-footer");
  footer.innerHTML = `
    <div style="margin-bottom:8px;">
      <div style="font-weight:600; font-size:13px;">${escapeHtml(currentProfile?.name || "")}</div>
      <div class="small-muted" style="font-size:11px;">${escapeHtml(currentProfile?.email || "")}</div>
    </div>
    <span class="streak-pill">🔥 ${state.streak.count || 0} día${state.streak.count === 1 ? "" : "s"}</span>
    <button class="btn secondary sm" id="logout-btn" style="margin-top:8px; width:100%;">Cerrar sesión</button>
  `;
  footer.querySelector("#logout-btn").addEventListener("click", () => {
    authLogout();
    clearActiveProfile();
    currentProfile = null;
    location.hash = "#/login";
    boot();
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

let activityStart = Date.now();
let activityName = "home";

function flushStudyTime(nextActivity) {
  if (!currentProfile) { activityStart = Date.now(); activityName = nextActivity; return; }
  const elapsedMs = Date.now() - activityStart;
  const minutes = elapsedMs / 60000;
  if (minutes > 0.15) {
    logStudyMinutes(Math.round(minutes * 10) / 10, activityName);
  }
  activityStart = Date.now();
  activityName = nextActivity;
}

async function routeApp() {
  stopSpeaking();
  await channelViews.channelRoomCleanup();
  const { route, params } = parseHash();
  flushStudyTime(route);
  renderNav();
  renderFooter();
  const main = document.getElementById("main");
  main.innerHTML = "";
  if (!isSectionUnlocked(route)) {
    views.lockedSection(main, route);
  } else {
    const renderer = views[route] || channelViews[route] || views.home;
    renderer(main, params);
  }
  window.scrollTo(0, 0);
  replayPageEnter(main);
}

function replayPageEnter(main) {
  main.classList.remove("page-enter");
  void main.offsetWidth; // force reflow so the animation restarts on every route change
  main.classList.add("page-enter");
}

// ------------------------------------------------------------- Auth shell --

function renderAuthShell() {
  app.innerHTML = `<main id="main" class="auth-main"></main>`;
}

async function routeAuth() {
  stopSpeaking();
  await channelViews.channelRoomCleanup();
  const { route, params } = parseHash();
  const main = document.getElementById("main");
  main.innerHTML = "";
  const renderer = authViews[toCamel(route)] || authViews.login;
  renderer(main, params, onAuthenticated);
  window.scrollTo(0, 0);
  replayPageEnter(main);
}

function toCamel(route) {
  return route.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function onAuthenticated(profile) {
  currentProfile = profile;
  initForProfile(profile.id);
  activityStart = Date.now();
  activityName = "home";
  location.hash = "#/home";
  boot();
}

// ------------------------------------------------------------------- Boot --

function boot() {
  const session = getSession();
  const profile = session ? getCurrentProfile() : null;
  const { route } = parseHash();

  if (profile) {
    currentProfile = profile;
    window.removeEventListener("hashchange", routeAuth);
    window.removeEventListener("hashchange", routeApp);
    window.addEventListener("hashchange", routeApp);
    if (AUTH_ROUTES.has(route)) location.hash = "#/home";
    renderAppShell();
    initForProfile(profile.id);
    routeApp();
  } else {
    currentProfile = null;
    clearActiveProfile();
    window.removeEventListener("hashchange", routeAuth);
    window.removeEventListener("hashchange", routeApp);
    window.addEventListener("hashchange", routeAuth);
    if (!AUTH_ROUTES.has(route)) location.hash = "#/login";
    renderAuthShell();
    routeAuth();
  }
}

window.addEventListener("beforeunload", () => flushStudyTime(activityName));
setInterval(() => { if (currentProfile) flushStudyTime(activityName); }, 60000);

boot();
