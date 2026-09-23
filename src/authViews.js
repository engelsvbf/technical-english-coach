import { AREAS } from "./data/content.js";
import * as auth from "./modules/auth.js";
import * as store from "./modules/store.js";

function esc(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function authShellWrap(inner) {
  return `
    <div class="auth-wrap">
      <div class="auth-card card">
        <div class="brand" style="justify-content:center; padding-bottom:6px;"><span class="dot"></span> Technical English Coach</div>
        <p class="small-muted" style="text-align:center; margin-top:0;">Tu profesor personal de inglés técnico y de trabajo.</p>
        ${inner}
      </div>
    </div>
  `;
}

function errorBox(msg) {
  return msg ? `<div class="auth-error">${esc(msg)}</div>` : "";
}

// --- Shared field / interaction helpers -------------------------------------

function pwField(id, label, autocomplete = "off") {
  return `<div class="field">
    <label>${esc(label)}</label>
    <div class="pw-wrap">
      <input type="password" id="${id}" autocomplete="${autocomplete}" />
      <button type="button" class="pw-toggle" data-target="${id}" tabindex="-1" title="Mostrar contraseña">👁</button>
    </div>
  </div>`;
}

function bindPasswordToggles(root) {
  root.querySelectorAll(".pw-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = root.querySelector(`#${btn.dataset.target}`);
      const willShow = input.type === "password";
      input.type = willShow ? "text" : "password";
      btn.textContent = willShow ? "🙈" : "👁";
      btn.title = willShow ? "Ocultar contraseña" : "Mostrar contraseña";
    });
  });
}

// Enter submits the form from any field, without needing a real <form> element.
function bindEnterSubmit(root, submitSelector) {
  root.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        root.querySelector(submitSelector)?.click();
      }
    });
  });
}

function setLoading(btn, loading, loadingText, normalText) {
  btn.disabled = loading;
  btn.textContent = loading ? loadingText : normalText;
}

const LAST_EMAIL_KEY = "etc_last_email";

// ------------------------------------------------------------------ LOGIN --

export function login(container, params, onAuthenticated) {
  const profiles = auth.listProfiles();
  const lastEmail = localStorage.getItem(LAST_EMAIL_KEY) || "";
  container.innerHTML = authShellWrap(`
    <h2>Iniciar sesión</h2>
    <div id="err"></div>
    ${profiles.length ? `
      <p class="small-muted">Cuentas guardadas en este navegador:</p>
      <div class="profile-chips">
        ${profiles.map(p => `<span class="verb-chip" data-email="${esc(p.email)}">${esc(p.name)}</span>`).join("")}
      </div>
    ` : ""}
    <div class="field"><label>Correo electrónico</label><input type="text" id="email" value="${esc(lastEmail)}" autocomplete="username" /></div>
    ${pwField("password", "Contraseña", "current-password")}
    <label style="display:flex; align-items:center; gap:6px; font-weight:400; font-size:13px; margin:-2px 0 14px;">
      <input type="checkbox" id="remember" ${lastEmail ? "checked" : ""} /> Recordar mi correo en este navegador
    </label>
    <button class="btn" id="submit" style="width:100%;">Iniciar sesión</button>
    <p class="small-muted" style="text-align:center; margin-top:14px;">
      <a href="#/forgot-password">¿Olvidaste tu contraseña?</a>
    </p>
    <p class="small-muted" style="text-align:center;">
      ¿No tienes cuenta? <a href="#/register">Crear una cuenta</a>
    </p>
  `);
  bindPasswordToggles(container);
  bindEnterSubmit(container, "#submit");
  container.querySelectorAll("[data-email]").forEach(chip => {
    chip.addEventListener("click", () => {
      container.querySelector("#email").value = chip.dataset.email;
      container.querySelector("#password").focus();
    });
  });

  const emailInput = container.querySelector("#email");
  (lastEmail ? container.querySelector("#password") : emailInput).focus();

  container.querySelector("#submit").addEventListener("click", async () => {
    const email = container.querySelector("#email").value;
    const password = container.querySelector("#password").value;
    const remember = container.querySelector("#remember").checked;
    const btn = container.querySelector("#submit");
    if (!email || !password) {
      container.querySelector("#err").innerHTML = errorBox("Completa tu correo y contraseña.");
      return;
    }
    container.querySelector("#err").innerHTML = "";
    setLoading(btn, true, "Iniciando sesión…", "Iniciar sesión");
    try {
      const profile = await auth.login(email, password);
      if (remember) localStorage.setItem(LAST_EMAIL_KEY, email.trim().toLowerCase());
      else localStorage.removeItem(LAST_EMAIL_KEY);
      onAuthenticated(profile);
    } catch (err) {
      container.querySelector("#err").innerHTML = errorBox(err.message);
      setLoading(btn, false, "", "Iniciar sesión");
    }
  });
}

// --------------------------------------------------------------- REGISTER --

const SECURITY_QUESTIONS = [
  "¿Cuál es el nombre de tu primera mascota?",
  "¿En qué ciudad naciste?",
  "¿Cuál es tu comida favorita?",
  "¿Cuál fue el nombre de tu primera escuela?"
];

export function register(container, params, onAuthenticated) {
  container.innerHTML = authShellWrap(`
    <h2>Crear cuenta</h2>
    <div id="err"></div>
    <div class="field"><label>Nombre</label><input type="text" id="name" autocomplete="name" /></div>
    <div class="field"><label>Correo electrónico</label><input type="text" id="email" autocomplete="username" /></div>
    <div class="grid-2">
      ${pwField("password", "Contraseña", "new-password")}
      ${pwField("password2", "Confirmar contraseña", "new-password")}
    </div>
    <div class="field" id="pw-match-hint-wrap" style="margin-top:-10px;"><span id="pw-match-hint" class="small-muted"></span></div>
    <div class="field">
      <label>Pregunta de seguridad (para recuperar tu contraseña)</label>
      <select id="secq">${SECURITY_QUESTIONS.map(q => `<option value="${esc(q)}">${esc(q)}</option>`).join("")}</select>
    </div>
    <div class="field"><label>Respuesta</label><input type="text" id="seca" /></div>
    <div class="divider"></div>
    <div class="grid-2">
      <div class="field">
        <label>Nivel actual</label>
        <select id="level">${["A1", "A2", "A2+", "B1", "B1+", "B2"].map(l => `<option value="${l}" ${l === "A2" ? "selected" : ""}>${l}</option>`).join("")}</select>
      </div>
      <div class="field"><label>Minutos disponibles al día</label><input type="number" id="goal" value="20" min="5" max="120" /></div>
    </div>
    <div class="field"><label>Objetivo de aprendizaje (opcional)</label><input type="text" id="learningGoal" placeholder="Ej: comunicarme mejor en reuniones de trabajo" /></div>
    <div class="field">
      <label>¿Qué temas te interesan?</label>
      ${AREAS.map(a => `
        <label style="display:flex; align-items:center; gap:8px; font-weight:400; margin:6px 0;">
          <input type="checkbox" class="interest-cb" value="${a.id}" ${a.id === "proyectos" ? "checked" : ""} />
          ${a.icon} ${esc(a.name)}
        </label>
      `).join("")}
    </div>
    <button class="btn" id="submit" style="width:100%;">Crear cuenta</button>
    <p class="small-muted" style="text-align:center; margin-top:14px;">
      ¿Ya tienes cuenta? <a href="#/login">Iniciar sesión</a>
    </p>
  `);
  bindPasswordToggles(container);
  bindEnterSubmit(container, "#submit");
  container.querySelector("#name").focus();

  const pw1 = container.querySelector("#password");
  const pw2 = container.querySelector("#password2");
  const matchHint = container.querySelector("#pw-match-hint");
  function updateMatchHint() {
    if (!pw2.value) { matchHint.textContent = ""; return; }
    const ok = pw1.value === pw2.value;
    matchHint.textContent = ok ? "✓ Las contraseñas coinciden" : "Las contraseñas no coinciden";
    matchHint.style.color = ok ? "var(--good)" : "var(--bad)";
  }
  pw1.addEventListener("input", updateMatchHint);
  pw2.addEventListener("input", updateMatchHint);

  container.querySelector("#submit").addEventListener("click", async () => {
    const name = container.querySelector("#name").value;
    const email = container.querySelector("#email").value;
    const password = pw1.value;
    const password2 = pw2.value;
    const securityQuestion = container.querySelector("#secq").value;
    const securityAnswer = container.querySelector("#seca").value;
    const level = container.querySelector("#level").value;
    const goal = +container.querySelector("#goal").value;
    const learningGoal = container.querySelector("#learningGoal").value;
    const interestAreas = Array.from(container.querySelectorAll(".interest-cb:checked")).map(cb => cb.value);
    const btn = container.querySelector("#submit");

    if (password !== password2) {
      container.querySelector("#err").innerHTML = errorBox("Las contraseñas no coinciden.");
      return;
    }
    container.querySelector("#err").innerHTML = "";
    setLoading(btn, true, "Creando cuenta…", "Crear cuenta");
    try {
      const profile = await auth.register({ name, email, password, securityQuestion, securityAnswer });
      store.initForProfile(profile.id);
      store.updateSettings({
        level,
        learningGoal,
        goalMinutesPerDay: goal || 20,
        interestAreas: interestAreas.length ? interestAreas : ["proyectos"]
      });
      localStorage.setItem(LAST_EMAIL_KEY, email.trim().toLowerCase());
      onAuthenticated(profile);
    } catch (err) {
      container.querySelector("#err").innerHTML = errorBox(err.message);
      setLoading(btn, false, "", "Crear cuenta");
    }
  });
}

// --------------------------------------------------------- FORGOT PASSWORD --

export function forgotPassword(container, params, onAuthenticated) {
  const lastEmail = localStorage.getItem(LAST_EMAIL_KEY) || "";
  container.innerHTML = authShellWrap(`
    <h2>Recuperar contraseña</h2>
    <div id="err"></div>
    <div id="step1">
      <div class="field"><label>Correo electrónico</label><input type="text" id="email" value="${esc(lastEmail)}" autocomplete="username" /></div>
      <button class="btn" id="find-btn" style="width:100%;">Continuar</button>
    </div>
    <div id="step2" style="display:none;"></div>
    <p class="small-muted" style="text-align:center; margin-top:14px;"><a href="#/login">← Volver a iniciar sesión</a></p>
  `);
  bindEnterSubmit(container, "#find-btn");
  const emailInput = container.querySelector("#email");
  emailInput.focus();
  if (lastEmail) emailInput.select();

  container.querySelector("#find-btn").addEventListener("click", () => {
    const email = container.querySelector("#email").value;
    const btn = container.querySelector("#find-btn");
    if (!email) {
      container.querySelector("#err").innerHTML = errorBox("Ingresa tu correo.");
      return;
    }
    setLoading(btn, true, "Buscando…", "Continuar");
    const question = auth.getSecurityQuestion(email);
    setLoading(btn, false, "", "Continuar");
    if (!question) {
      container.querySelector("#err").innerHTML = errorBox("No existe ninguna cuenta con ese correo en este navegador.");
      return;
    }
    container.querySelector("#err").innerHTML = "";
    container.querySelector("#step1").style.display = "none";
    const step2 = container.querySelector("#step2");
    step2.style.display = "block";
    step2.innerHTML = `
      <div class="field"><label>${esc(question)}</label><input type="text" id="answer" /></div>
      <div class="grid-2">
        ${pwField("newpass", "Nueva contraseña", "new-password")}
        ${pwField("newpass2", "Confirmar nueva contraseña", "new-password")}
      </div>
      <button class="btn" id="reset-btn" style="width:100%;">Restablecer contraseña</button>
    `;
    bindPasswordToggles(step2);
    bindEnterSubmit(step2, "#reset-btn");
    step2.querySelector("#answer").focus();

    step2.querySelector("#reset-btn").addEventListener("click", async () => {
      const answer = step2.querySelector("#answer").value;
      const newpass = step2.querySelector("#newpass").value;
      const newpass2 = step2.querySelector("#newpass2").value;
      const resetBtn = step2.querySelector("#reset-btn");
      if (newpass !== newpass2) {
        container.querySelector("#err").innerHTML = errorBox("Las contraseñas no coinciden.");
        return;
      }
      container.querySelector("#err").innerHTML = "";
      setLoading(resetBtn, true, "Restableciendo…", "Restablecer contraseña");
      try {
        const profile = await auth.resetPasswordWithSecurityAnswer(email, answer, newpass);
        onAuthenticated(profile);
      } catch (err) {
        container.querySelector("#err").innerHTML = errorBox(err.message);
        setLoading(resetBtn, false, "", "Restablecer contraseña");
      }
    });
  });
}
