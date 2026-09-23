import {
  UNITS, VERBS, AREAS, PROJECTS, tenseTable, allVocab, allCorePhrases, allGrammarPoints,
  allExercises, allReadings, allConversations, QUICK_DICTIONARY, areaOf, unitsByArea
} from "./data/content.js";
import { STORIES, storiesByArea, storyById, allEvaluationQuestions } from "./data/stories.js";
import {
  getSettings, updateSettings, touchWord, reviewWord, setWordStatus, allTrackedWords,
  logExerciseAttempt, exerciseStats, totalStudyMinutes, getState,
  pushChatMessage, getChatHistory, clearChatHistory, resetAllProgress,
  rawStateSnapshot, restoreStateSnapshot,
  setGrammarStatus, getGrammarStatus, recordStoryEvaluation, setStoryContext, getStoryContext, clearStoryContext, storyEvaluationsFor
} from "./modules/store.js";
import {
  speak, ttsSupported, sttSupported, listenOnce, compareSpeech,
  speakSynced, PLAYBACK_RATES, RATE_PRESETS, recommendedRates,
  listEnglishVoices, getPreferredVoiceURI, setPreferredVoice, onVoicesReady
} from "./modules/speech.js";
import { analyzeText, explainGrammarPoint, tutorReply, pronunciationFeedback, hasApiKey, AIError } from "./modules/ai.js";
import * as auth from "./modules/auth.js";
import { isUnitUnlocked, unitUnlockHint, isStoryUnlocked, storyUnlockHint, isSectionUnlocked, sectionUnlockHint } from "./modules/progression.js";

// ---------------------------------------------------------------- helpers --

export function esc(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function wrapWords(text) {
  return esc(text).replace(/([A-Za-z']+)/g, (m) => `<span class="sel-word" data-word="${m.toLowerCase()}">${m}</span>`);
}

function statusLabel(status) {
  return { new: "Nueva", learning: "Aprendiendo", learned: "Aprendida", "needs-review": "Repasar" }[status] || "Nueva";
}

export function pageHeader(title, subtitle) {
  return `<h1 class="page-title">${esc(title)}</h1>${subtitle ? `<p class="page-subtitle">${esc(subtitle)}</p>` : ""}`;
}

function speakBtn(text, extraClass = "") {
  return `<button class="icon-btn speak-btn ${extraClass}" data-speak="${esc(text)}" title="Escuchar">🔊</button>`;
}

function bindSpeakButtons(root) {
  root.querySelectorAll("[data-speak]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      speak(btn.dataset.speak, getSettings().voiceRate);
    });
  });
}

// ------------------------------------------------- synchronized audio player --

const RATE_LABELS = { 0.5: "0.5x · Muy lento", 0.75: "0.75x · Lento", 1: "1x · Normal", 1.25: "1.25x", 1.5: "1.5x", 1.75: "1.75x", 2: "2x" };

export function wrapWordsSynced(text) {
  let idx = 0;
  return esc(text).replace(/(\S+)/g, (m) => {
    const clean = m.replace(/[^A-Za-z']/g, "").toLowerCase();
    const html = `<span class="sel-word sync-word" data-widx="${idx}" data-word="${clean}">${m}</span>`;
    idx++;
    return html;
  });
}

export function bindMicPractice(btn, targetText, resultEl, level) {
  if (!sttSupported()) { btn.style.display = "none"; return; }
  btn.addEventListener("click", () => {
    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = "🎙 Escuchando...";
    listenOnce({
      onResult: async (spoken) => {
        const { results, score } = compareSpeech(targetText, spoken);
        resultEl.style.display = "block";
        resultEl.innerHTML = `<strong>${score}%</strong> — ${results.map(r => `<span style="color:${r.match ? "var(--good)" : "var(--bad)"};">${r.match ? "✓" : "✗"} ${esc(r.word)}</span>`).join(" ")}<div class="small-muted">Dijiste: "${esc(spoken)}"</div>`;
      },
      onError: (err) => { resultEl.style.display = "block"; resultEl.innerHTML = `<span class="feedback-bad">${esc(err.message)}</span>`; },
      onEnd: () => { btn.disabled = false; btn.textContent = original; }
    });
  });
}

function actionButtonsHtml(text, translation) {
  return `
    <div class="toolbar" style="margin-top:10px;">
      <button class="btn secondary sm" data-add-vocab="${esc(text)}" data-vocab-es="${esc(translation || "")}">➕ Agregar al vocabulario</button>
      <button class="btn secondary sm" data-mark-practice="${esc(text)}">🔖 Practicar después</button>
    </div>`;
}

function bindAnalysisActions(panelEl) {
  panelEl.querySelectorAll("[data-add-vocab]").forEach(btn => {
    btn.addEventListener("click", () => {
      touchWord(btn.dataset.addVocab, btn.dataset.vocabEs || "");
      btn.textContent = "✓ Agregado";
      btn.disabled = true;
    });
  });
  panelEl.querySelectorAll("[data-mark-practice]").forEach(btn => {
    btn.addEventListener("click", () => {
      setWordStatus(btn.dataset.markPractice, "needs-review");
      btn.textContent = "✓ Marcada para practicar";
      btn.disabled = true;
    });
  });
}

function voiceGenderLabel(gender) {
  return { female: "♀ Voces femeninas", male: "♂ Voces masculinas", unknown: "◆ Otras voces" }[gender] || "◆ Otras voces";
}

function renderVoicePicker(wrap) {
  const list = listEnglishVoices();
  if (!list.length) {
    wrap.innerHTML = `<p class="small-muted">Cargando voces disponibles del navegador…</p>`;
    return;
  }
  const current = getPreferredVoiceURI();
  const groups = { female: [], male: [], unknown: [] };
  list.forEach(v => groups[v.gender].push(v));
  wrap.innerHTML = `
    <div class="field">
      <label style="display:flex; align-items:center; gap:8px; font-weight:400; margin:6px 0;">
        <input type="radio" name="voice-pick" value="" ${!current ? "checked" : ""} />
        Automática del sistema <span class="small-muted">— usa la primera voz en inglés disponible</span>
      </label>
    </div>
    ${["female", "male", "unknown"].filter(key => groups[key].length).map(key => `
      <div class="field">
        <strong style="font-size:13px;">${voiceGenderLabel(key)} (${groups[key].length})</strong>
        ${groups[key].map(v => `
          <div style="display:flex; align-items:center; gap:8px; margin:6px 0;">
            <label style="display:flex; align-items:center; gap:8px; font-weight:400; flex:1;">
              <input type="radio" name="voice-pick" value="${esc(v.voiceURI)}" ${current === v.voiceURI ? "checked" : ""} />
              ${esc(v.name)} <span class="small-muted">${esc(v.lang)}</span>
            </label>
            <button type="button" class="btn secondary sm voice-try" data-uri="${esc(v.voiceURI)}">▶ Probar</button>
          </div>
        `).join("")}
      </div>
    `).join("")}
    <p class="small-muted">${list.length} ${list.length === 1 ? "voz" : "voces"} en inglés detectada${list.length === 1 ? "" : "s"} en este navegador.</p>
  `;
  wrap.querySelectorAll('input[name="voice-pick"]').forEach(input => {
    input.addEventListener("change", () => setPreferredVoice(input.value));
  });
  wrap.querySelectorAll(".voice-try").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      speak("Hello! This is a preview of my voice, ready to help you practice English.", getSettings().voiceRate || 0.95, 1, btn.dataset.uri);
    });
  });
}

const PRESET_LABELS = { "very-slow": "🐢 Muy lento", slow: "🚶 Lento", normal: "🏃 Normal" };

function playerControlsHtml({ withRepeat = true, level = null } = {}) {
  const suggested = level ? recommendedRates(level) : [];
  return `
    <div class="player-toolbar">
      <button class="icon-btn play-pause" title="Reproducir">▶</button>
      <button class="icon-btn sm repeat-sentence-btn" title="Repetir la oración actual">🔁🔤</button>
      <div class="preset-group">
        ${Object.entries(PRESET_LABELS).map(([key, label]) => `<span class="speed-chip preset-chip ${RATE_PRESETS[key] === 1 ? "active" : ""}" data-preset="${key}">${label}</span>`).join("")}
      </div>
      <div class="speed-group">
        ${PLAYBACK_RATES.map(r => `<span class="speed-chip ${r === 1 ? "active" : ""} ${suggested.includes(r) ? "suggested" : ""}" data-rate="${r}" title="${esc(RATE_LABELS[r] || r + "x")}">${r}x</span>`).join("")}
      </div>
      ${withRepeat ? `
      <div class="repeat-group">
        <span class="small-muted">Repetir</span>
        ${[1, 2, 3, 5].map(n => `<span class="repeat-chip ${n === 1 ? "active" : ""}" data-repeat="${n}">${n}x</span>`).join("")}
      </div>` : ""}
      ${sttSupported() ? `<button class="btn secondary sm listen-repeat-btn">🎙 Listen &amp; Repeat</button>` : ""}
      <span class="player-status small-muted"></span>
    </div>
    ${level ? `<p class="small-muted" style="margin:-4px 0 8px;">Velocidad sugerida para tu nivel (${esc(level)}): ${suggested.map(r => r + "x").join(", ")}</p>` : ""}
    <div class="sync-progress"><div class="sync-progress-inner"></div></div>
    <div class="listen-repeat-result card" style="display:none; margin-top:8px;"></div>
  `;
}

// segments: [{ el: DOMElement, text: string }] — one element for a single reading,
// or one per conversation line so "play all" flows sequentially across lines.
function mountSyncPlayer(root, { segments, panelEl, contextText, level, extraDictionary }) {
  segments.forEach(seg => { seg.el.innerHTML = wrapWordsSynced(seg.text); });
  if (panelEl) segments.forEach(seg => wireAnalysis(seg.el, panelEl, contextText || seg.text, extraDictionary));

  const playBtn = root.querySelector(".play-pause");
  const statusEl = root.querySelector(".player-status");
  const progressInner = root.querySelector(".sync-progress-inner");
  const lrBtn = root.querySelector(".listen-repeat-btn");
  const lrResult = root.querySelector(".listen-repeat-result");
  const repeatSentenceBtn = root.querySelector(".repeat-sentence-btn");

  let rate = getSettings().voiceRate || 0.95;
  let repeatTotal = 1;
  let repeatDone = 0;
  let playState = "idle";
  let segIdx = 0;
  let wordIdx = 0;
  let session = null;

  function syncRateUI() {
    root.querySelectorAll(".speed-chip[data-rate]").forEach(c => c.classList.toggle("active", +c.dataset.rate === rate));
    root.querySelectorAll(".speed-chip[data-preset]").forEach(c => c.classList.toggle("active", RATE_PRESETS[c.dataset.preset] === rate));
  }
  syncRateUI();

  // Finds the sentence (bounded by . ! ?) that contains the word currently
  // highlighted, so "Repetir esta oración" can replay just that sentence
  // instead of the whole reading — see spec 12.5 (granular repeat).
  function currentSentenceRange() {
    const el = currentSegEl();
    if (!el) return null;
    const spans = Array.from(el.querySelectorAll(".sync-word"));
    if (!spans.length) return null;
    const anchor = Math.min(wordIdx, spans.length - 1);
    let start = anchor, end = anchor;
    while (start > 0 && !/[.!?]$/.test(spans[start - 1].textContent.trim())) start--;
    while (end < spans.length - 1 && !/[.!?]$/.test(spans[end].textContent.trim())) end++;
    return { start, end, text: spans.slice(start, end + 1).map(s => s.textContent).join(" ") };
  }

  function currentSegEl() { return segments[segIdx]?.el; }
  function clearHighlight() { segments.forEach(s => s.el.querySelectorAll(".sync-word").forEach(w => w.classList.remove("current"))); }
  function highlight(idx) {
    clearHighlight();
    const span = currentSegEl()?.querySelector(`.sync-word[data-widx="${idx}"]`);
    if (span) { span.classList.add("current"); span.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    const totalWordsInSeg = currentSegEl()?.querySelectorAll(".sync-word").length || 1;
    const segProgress = (idx + 1) / totalWordsInSeg;
    const overall = ((segIdx + segProgress) / segments.length) * 100;
    progressInner.style.width = `${overall}%`;
    const base = segments.length > 1 ? `Línea ${segIdx + 1} de ${segments.length}` : `Palabra ${idx + 1} de ${totalWordsInSeg}`;
    statusEl.textContent = session?.isEstimated ? `${base} (estimado)` : base;
  }
  function setIcon() { playBtn.textContent = playState === "playing" ? "⏸" : "▶"; }

  function playSegment(i, fromWord = 0) {
    segIdx = i;
    playState = "playing"; setIcon();
    session = speakSynced(segments[i].text, {
      rate, startWordIndex: fromWord,
      onWord: (idx) => { wordIdx = idx; highlight(idx); },
      onEnd: () => {
        if (i + 1 < segments.length) {
          playSegment(i + 1, 0);
        } else {
          repeatDone++;
          if (repeatDone < repeatTotal) { playSegment(0, 0); }
          else { playState = "completed"; setIcon(); clearHighlight(); statusEl.textContent = "Completado"; }
        }
      },
      onError: (err) => { playState = "error"; setIcon(); statusEl.textContent = err.message; }
    });
  }

  playBtn.addEventListener("click", () => {
    if (playState === "playing") {
      session?.pause(); playState = "paused"; setIcon(); statusEl.textContent = "Pausado";
    } else if (playState === "paused") {
      session?.resume(); playState = "playing"; setIcon();
    } else {
      repeatDone = 0; playSegment(0, 0);
    }
  });

  function applyRate(newRate) {
    rate = newRate;
    updateSettings({ voiceRate: rate });
    syncRateUI();
    if (playState === "playing" || playState === "paused") {
      session?.cancel();
      playSegment(segIdx, wordIdx);
    }
  }
  root.querySelectorAll(".speed-chip[data-rate]").forEach(chip => {
    chip.addEventListener("click", () => applyRate(+chip.dataset.rate));
  });
  root.querySelectorAll(".speed-chip[data-preset]").forEach(chip => {
    chip.addEventListener("click", () => applyRate(RATE_PRESETS[chip.dataset.preset]));
  });
  if (repeatSentenceBtn) {
    repeatSentenceBtn.addEventListener("click", () => {
      const sentence = currentSentenceRange();
      if (!sentence) return;
      session?.cancel();
      playState = "playing"; setIcon();
      session = speakSynced(sentence.text, {
        rate,
        onWord: (idx) => { wordIdx = sentence.start + idx; highlight(wordIdx); },
        onEnd: () => { playState = "paused"; setIcon(); statusEl.textContent = "Oración repetida — pausado"; },
        onError: (err) => { playState = "error"; setIcon(); statusEl.textContent = err.message; }
      });
    });
  }
  root.querySelectorAll(".repeat-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      repeatTotal = +chip.dataset.repeat;
      root.querySelectorAll(".repeat-chip").forEach(c => c.classList.toggle("active", c === chip));
    });
  });

  segments.forEach(seg => {
    seg.el.querySelectorAll(".sync-word").forEach(span => {
      span.addEventListener("dblclick", (e) => { e.stopPropagation(); speak(span.textContent, rate); });
    });
  });

  if (lrBtn) {
    lrBtn.addEventListener("click", () => {
      const targetText = segments[segIdx]?.text || segments[0].text;
      lrBtn.disabled = true;
      lrBtn.textContent = "🔊 Modelo...";
      const slow = Math.min(rate, 0.8);
      speak(targetText, slow);
      const estMs = Math.max(1200, (targetText.split(/\s+/).length / (2.3 * slow)) * 1000);
      setTimeout(() => {
        lrBtn.textContent = "🎙 Tu turno...";
        listenOnce({
          onResult: (spoken) => {
            const { results, score } = compareSpeech(targetText, spoken);
            lrResult.style.display = "block";
            lrResult.innerHTML = `<strong>Resultado: ${score}%</strong><br/>${results.map(r => `<span style="color:${r.match ? "var(--good)" : "var(--bad)"};">${r.match ? "✓" : "✗"} ${esc(r.word)}</span>`).join(" ")}<div class="small-muted">Dijiste: "${esc(spoken)}"</div>`;
          },
          onError: (err) => { lrResult.style.display = "block"; lrResult.innerHTML = `<span class="feedback-bad">${esc(err.message)}</span>`; },
          onEnd: () => { lrBtn.disabled = false; lrBtn.textContent = "🎙 Listen & Repeat"; }
        });
      }, estMs);
    });
  }

  return { destroy() { if (ttsSupported()) window.speechSynthesis.cancel(); } };
}

function areaLabel(areaId) {
  const a = areaOf(areaId);
  return a ? `${a.icon} ${a.name}` : areaId;
}

// Reusable "area filter" chip row. Renders "Todas" plus one chip per area
// (only areas that actually have content in `presentAreaIds`, if given).
function areaFilterBar(activeAreaId, presentAreaIds = null) {
  const areas = presentAreaIds ? AREAS.filter(a => presentAreaIds.has(a.id)) : AREAS;
  return `
    <div class="area-tabs">
      <span class="area-chip ${activeAreaId === "all" ? "active" : ""}" data-area="all">Todas</span>
      ${areas.map(a => `<span class="area-chip ${activeAreaId === a.id ? "active" : ""}" data-area="${a.id}">${a.icon} ${esc(a.name)}</span>`).join("")}
    </div>`;
}

function bindAreaFilterBar(root, onSelect) {
  root.querySelectorAll(".area-chip").forEach(chip => {
    chip.addEventListener("click", () => onSelect(chip.dataset.area));
  });
}

// Wires click-to-analyze on any block of wrapped words, updating a side panel.
export function wireAnalysis(root, panelEl, contextText, extraDictionary) {
  async function showFor(text) {
    renderAnalysisLoading(panelEl, text);
    const dictHit = (extraDictionary && extraDictionary[text.toLowerCase()]) || QUICK_DICTIONARY[text.toLowerCase()];
    if (dictHit) {
      renderAnalysisQuick(panelEl, dictHit);
      touchWord(dictHit.en, dictHit.es);
      return;
    }
    if (!hasApiKey()) {
      renderAnalysisNoKey(panelEl, text);
      return;
    }
    try {
      const result = await analyzeText(text, { level: getSettings().level, context: contextText });
      renderAnalysisAI(panelEl, text, result);
    } catch (err) {
      renderAnalysisError(panelEl, err);
    }
  }

  root.querySelectorAll(".sel-word").forEach(span => {
    span.addEventListener("click", (e) => {
      e.stopPropagation();
      showFor(span.dataset.word);
    });
  });
  root.addEventListener("mouseup", () => {
    const sel = window.getSelection();
    const text = sel ? sel.toString().trim() : "";
    if (text && text.includes(" ") && root.contains(sel.anchorNode)) {
      showFor(text);
    }
  });
}

function renderAnalysisLoading(panelEl, text) {
  panelEl.innerHTML = `<div class="card analysis-panel"><h3>🔍 "${esc(text)}"</h3><p class="small-muted loading-dots">Analizando</p></div>`;
}

function renderAnalysisQuick(panelEl, v) {
  panelEl.innerHTML = `
    <div class="card analysis-panel">
      <h3>${esc(v.en)} ${speakBtn(v.en)}</h3>
      <div class="kv"><div class="k">Traducción</div><div class="v">${esc(v.es)}</div></div>
      <div class="kv"><div class="k">Ejemplo</div><div class="v">${esc(v.example)} ${speakBtn(v.example)}</div></div>
      <div class="kv"><div class="k">Área</div><div class="v">${areaLabel(v.area)}</div></div>
      <p class="hint">Del glosario del curso. Para un análisis más profundo (gramática, pronunciación detallada), configura tu API key y vuelve a intentarlo con una frase más larga.</p>
      ${actionButtonsHtml(v.en, v.es)}
    </div>`;
  bindSpeakButtons(panelEl);
  bindAnalysisActions(panelEl);
}

function renderAnalysisNoKey(panelEl, text) {
  panelEl.innerHTML = `
    <div class="card analysis-panel">
      <h3>🔍 "${esc(text)}"</h3>
      <p class="small-muted">Esta frase no está en el glosario del curso. Para obtener traducción, gramática, pronunciación y ejemplos generados por IA, agrega tu API key en <a href="#/profile">Mi perfil</a>.</p>
      ${speakBtn(text)}
      ${actionButtonsHtml(text, "")}
    </div>`;
  bindSpeakButtons(panelEl);
  bindAnalysisActions(panelEl);
}

function renderAnalysisAI(panelEl, text, result) {
  const grammar = (result.grammar || []).map(g => `<li>${esc(g)}</li>`).join("");
  const examples = (result.examples || []).map(ex => `<li>${esc(ex)} ${speakBtn(ex)}</li>`).join("");
  panelEl.innerHTML = `
    <div class="card analysis-panel">
      <h3>${esc(text)} ${speakBtn(text)}</h3>
      <div class="kv"><div class="k">Traducción</div><div class="v">${esc(result.translation || "—")}</div></div>
      <div class="kv"><div class="k">Significado en contexto</div><div class="v">${esc(result.meaning_in_context || "—")}</div></div>
      ${result.pronunciation?.simplified ? `<div class="kv"><div class="k">Pronunciación</div><div class="v">${esc(result.pronunciation.simplified)} ${result.pronunciation.ipa ? `<span class="small-muted">[${esc(result.pronunciation.ipa)}]</span>` : ""}</div></div>` : ""}
      ${result.breakdown ? `<div class="kv"><div class="k">Estructura</div><div class="v">${esc(result.breakdown)}</div></div>` : ""}
      ${grammar ? `<div class="kv"><div class="k">Gramática</div><ul class="v">${grammar}</ul></div>` : ""}
      ${examples ? `<div class="kv"><div class="k">Más ejemplos</div><ul class="v">${examples}</ul></div>` : ""}
      ${actionButtonsHtml(text, result.translation)}
    </div>`;
  bindSpeakButtons(panelEl);
  bindAnalysisActions(panelEl);
}

function renderAnalysisError(panelEl, err) {
  panelEl.innerHTML = `<div class="card analysis-panel"><h3>⚠️ Error</h3><p class="small-muted">${esc(err.message || String(err))}</p></div>`;
}

// --------------------------------------------------------------- exercises --

function renderExerciseBlock(ex, container) {
  const state = { answers: {}, orderPools: {}, checked: false };
  ex.items.forEach((item, i) => {
    if (ex.type === "order") {
      state.orderPools[i] = { pool: item.text.split("/").map(s => s.trim()), assembled: [] };
    }
  });

  const wrap = document.createElement("div");
  wrap.className = "card";
  wrap.innerHTML = `<h3>${esc(ex.title)}</h3>` +
    (ex.bank ? `<p class="small-muted">Banco: ${ex.bank.map(esc).join(", ")}</p>` : "") +
    `<div class="ex-items"></div>
     <div class="toolbar" style="margin-top:12px;">
       <button class="btn check-btn">Verificar respuestas</button>
       <span class="spacer"></span>
       <span class="result-summary small-muted"></span>
     </div>`;
  const itemsEl = wrap.querySelector(".ex-items");

  function renderItems() {
    itemsEl.innerHTML = ex.items.map((item, i) => {
      if (ex.type === "mcq") {
        return `<div class="exercise-item" data-i="${i}">
          <div style="margin-bottom:6px;">${esc(item.text)} ${speakBtn(item.text)}</div>
          ${item.options.map((opt, oi) => `<div class="opt-row" data-i="${i}" data-oi="${oi}">${esc(opt)} ${speakBtn(opt, "sm")}</div>`).join("")}
        </div>`;
      }
      if (ex.type === "fill-blank") {
        const [before, after] = item.text.split("___");
        return `<div class="exercise-item" data-i="${i}">
          <span>${esc(before || "")}</span>
          <input type="text" class="fb-input" data-i="${i}" style="width:140px; display:inline-block;" />
          <span>${esc(after || "")}</span>
          <div class="fb-feedback"></div>
        </div>`;
      }
      if (ex.type === "translate") {
        return `<div class="exercise-item" data-i="${i}">
          <div style="margin-bottom:6px;">🇪🇸 ${esc(item.text)}</div>
          <textarea class="tr-input" data-i="${i}" placeholder="Escribe tu traducción en inglés..."></textarea>
          <div class="tr-feedback"></div>
        </div>`;
      }
      if (ex.type === "order") {
        const st = state.orderPools[i];
        return `<div class="exercise-item" data-i="${i}">
          <div class="assembled" data-i="${i}" style="min-height:34px; border:1px dashed var(--border); border-radius:8px; padding:6px; margin-bottom:6px;">
            ${st.assembled.map((w, wi) => `<span class="verb-chip active" data-role="assembled" data-i="${i}" data-wi="${wi}">${esc(w)}</span>`).join(" ")}
          </div>
          <div class="pool" data-i="${i}">
            ${st.pool.map((w, wi) => `<span class="verb-chip" data-role="pool" data-i="${i}" data-wi="${wi}">${esc(w)}</span>`).join(" ")}
          </div>
          <div class="order-feedback"></div>
        </div>`;
      }
      return "";
    }).join("");
    bindItemEvents();
  }

  function bindItemEvents() {
    bindSpeakButtons(itemsEl);
    itemsEl.querySelectorAll(".opt-row").forEach(row => {
      row.addEventListener("click", () => {
        const i = +row.dataset.i, oi = +row.dataset.oi;
        state.answers[i] = oi;
        itemsEl.querySelectorAll(`.opt-row[data-i="${i}"]`).forEach(r => r.classList.remove("correct", "wrong"));
        row.style.outline = "2px solid var(--brand)";
      });
    });
    itemsEl.querySelectorAll('[data-role="pool"]').forEach(chip => {
      chip.addEventListener("click", () => {
        const i = +chip.dataset.i, wi = +chip.dataset.wi;
        const st = state.orderPools[i];
        const [word] = st.pool.splice(wi, 1);
        st.assembled.push(word);
        renderItems();
      });
    });
    itemsEl.querySelectorAll('[data-role="assembled"]').forEach(chip => {
      chip.addEventListener("click", () => {
        const i = +chip.dataset.i, wi = +chip.dataset.wi;
        const st = state.orderPools[i];
        const [word] = st.assembled.splice(wi, 1);
        st.pool.push(word);
        renderItems();
      });
    });
  }

  function similarity(a, b) {
    const norm = s => s.toLowerCase().replace(/[.,!?;:"']/g, "").split(/\s+/).filter(Boolean);
    const ta = norm(a), tb = norm(b);
    const setB = [...tb];
    let matches = 0;
    ta.forEach(w => { const idx = setB.indexOf(w); if (idx !== -1) { setB.splice(idx, 1); matches++; } });
    return ta.length ? matches / ta.length : 0;
  }

  wrap.querySelector(".check-btn").addEventListener("click", () => {
    let correct = 0;
    ex.items.forEach((item, i) => {
      if (ex.type === "mcq") {
        const ok = state.answers[i] === item.answer;
        if (ok) correct++;
        itemsEl.querySelectorAll(`.opt-row[data-i="${i}"]`).forEach((r, oi) => {
          r.style.outline = "";
          if (oi === item.answer) r.classList.add("correct");
          else if (oi === state.answers[i]) r.classList.add("wrong");
        });
      } else if (ex.type === "fill-blank") {
        const input = itemsEl.querySelector(`.fb-input[data-i="${i}"]`);
        const val = (input.value || "").trim().toLowerCase();
        const ok = val === item.answer.toLowerCase();
        if (ok) correct++;
        const fb = itemsEl.querySelector(`.exercise-item[data-i="${i}"] .fb-feedback`);
        fb.innerHTML = ok ? `<span class="feedback-ok">✓ Correcto</span>` : `<span class="feedback-bad">✗ Respuesta esperada: "${esc(item.answer)}"</span>`;
      } else if (ex.type === "translate") {
        const input = itemsEl.querySelector(`.tr-input[data-i="${i}"]`);
        const val = input.value || "";
        const sim = similarity(val, item.answer);
        const ok = sim >= 0.6;
        if (ok) correct++;
        const fb = itemsEl.querySelector(`.exercise-item[data-i="${i}"] .tr-feedback`);
        fb.innerHTML = `<span class="${ok ? "feedback-ok" : "feedback-bad"}">${ok ? "✓ Muy cercano" : "Revisa"} — Sugerido: "${esc(item.answer)}"</span>`;
      } else if (ex.type === "order") {
        const st = state.orderPools[i];
        const built = st.assembled.join(" ").toLowerCase();
        const ok = built === item.answer.toLowerCase();
        if (ok) correct++;
        const fb = itemsEl.querySelector(`.exercise-item[data-i="${i}"] .order-feedback`);
        fb.innerHTML = ok ? `<span class="feedback-ok">✓ Correcto</span>` : `<span class="feedback-bad">✗ Orden esperado: "${esc(item.answer)}"</span>`;
      }
    });
    wrap.querySelector(".result-summary").textContent = `${correct} / ${ex.items.length} correctas`;
    logExerciseAttempt(ex.unit, ex.id, correct, ex.items.length);
  });

  renderItems();
  container.appendChild(wrap);
}

// ------------------------------------------------------------------ HOME --

export function home(container) {
  const state = getState();
  const settings = getSettings();
  const profile = auth.getCurrentProfile();
  const stats = exerciseStats();
  const dueCount = allTrackedWords().filter(w => w.dueAt <= Date.now() && w.status !== "new").length;
  const myAreas = settings.interestAreas && settings.interestAreas.length ? settings.interestAreas : ["proyectos"];
  // One unit per interest area, so the recommendation reflects variety across the areas
  // the user picked instead of always favoring whichever area happens to be first.
  const recommendedUnits = myAreas.map(areaId => UNITS.find(u => u.area === areaId)).filter(Boolean);
  const nameFirst = (profile?.name || "").split(" ")[0];

  container.innerHTML = `
    ${pageHeader(`Buenos días${nameFirst ? ", " + nameFirst : ""} 👋`, "Esto es lo que te recomendamos hoy.")}
    <div class="grid-3">
      <div class="card stat-card"><div class="stat-num">${state.streak.count || 0}</div><div class="stat-label">Días de racha</div></div>
      <div class="card stat-card"><div class="stat-num">${Object.keys(state.words).length}</div><div class="stat-label">Palabras en glosario</div></div>
      <div class="card stat-card"><div class="stat-num">${stats.accuracy}%</div><div class="stat-label">Precisión en ejercicios</div></div>
    </div>
    <div class="card">
      <h3>📚 Recomendado para ti</h3>
      <p class="small-muted">Basado en tus áreas de interés: ${myAreas.map(areaLabel).join(", ")}.</p>
      <div class="grid-2">
        ${recommendedUnits.map(u => `
          <div>
            <p><strong>${areaLabel(u.area)}</strong><br/><span class="small-muted">${esc(u.title)}</span></p>
            <button class="btn secondary sm" data-goto-unit="${u.id}">Empezar</button>
          </div>
        `).join("")}
        <div>
          <p><strong>Repaso de vocabulario</strong><br/><span class="small-muted">${dueCount > 0 ? `${dueCount} palabra(s) lista(s) para repasar hoy.` : "No tienes palabras pendientes de repaso — ¡bien!"}</span></p>
          <button class="btn secondary sm" id="go-vocab">Ir a Vocabulario</button>
        </div>
        <div>
          <p><strong>Conversa con el tutor IA</strong><br/><span class="small-muted">${hasApiKey() ? "Practica una conversación real en inglés." : "Configura tu API key para desbloquear el chat en vivo."}</span></p>
          <button class="btn secondary sm" id="go-tutor">Ir al Tutor IA</button>
        </div>
      </div>
    </div>
    <div class="card">
      <h3>Áreas de interés</h3>
      <div class="grid-3">
        ${AREAS.map(a => {
          const count = unitsByArea(a.id).length;
          return `<div class="card area-card" data-area-goto="${a.id}">
            <div style="font-size:26px;">${a.icon}</div>
            <div style="font-weight:600;">${esc(a.name)}</div>
            <div class="small-muted">${count} unidad${count === 1 ? "" : "es"}</div>
          </div>`;
        }).join("")}
      </div>
    </div>
  `;
  container.querySelector("#go-vocab").addEventListener("click", () => location.hash = "#/vocabulary");
  container.querySelector("#go-tutor").addEventListener("click", () => location.hash = "#/tutor");
  container.querySelectorAll("[data-goto-unit]").forEach(el => {
    el.addEventListener("click", () => location.hash = `#/lessons/${el.dataset.gotoUnit}`);
  });
  container.querySelectorAll("[data-area-goto]").forEach(el => {
    el.addEventListener("click", () => location.hash = `#/lessons/area/${el.dataset.areaGoto}`);
  });
}

// --------------------------------------------------------------- LESSONS --

function unitCard(u) {
  const project = u.projectId ? PROJECTS.find(p => p.id === u.projectId) : null;
  const unlocked = isUnitUnlocked(u.id);
  return `
    <div class="card unit-card ${unlocked ? "" : "locked"}" data-unit="${u.id}" ${unlocked ? "" : `data-locked-hint="${esc(unitUnlockHint(u.id))}"`}>
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="unit-num">${unlocked ? (areaOf(u.area)?.icon || "📘") : "🔒"}</div>
        <div>
          <div style="font-weight:600;">${esc(u.title)}</div>
          <div class="small-muted">${unlocked ? esc(u.subtitle) : unitUnlockHint(u.id)}</div>
          <div style="margin-top:6px;">
            <span class="badge">${areaLabel(u.area)}</span>
            ${project ? `<span class="badge">${esc(project.name)}</span>` : ""}
            ${unlocked ? u.grammarFocus.map(g => `<span class="badge">${esc(g)}</span>`).join(" ") : ""}
          </div>
        </div>
      </div>
      <span class="badge">${esc(u.level)}</span>
    </div>`;
}

function bindUnitCardClicks(root) {
  root.querySelectorAll("[data-unit]").forEach(el => {
    el.addEventListener("click", () => {
      if (el.classList.contains("locked")) {
        alert(`🔒 ${el.dataset.lockedHint || "Esta unidad todavía está bloqueada."}`);
        return;
      }
      location.hash = `#/lessons/${el.dataset.unit}`;
    });
  });
}

export function lessons(container, params) {
  if (params[0] === "area" && params[1]) return lessonsByArea(container, params[1]);
  if (params[0]) return lessonDetail(container, params[0]);

  const present = new Set(UNITS.map(u => u.area));
  container.innerHTML = pageHeader("Aprender", "Elige un área de interés y avanza unidad por unidad.") +
    areaFilterBar("all", present) +
    `<div id="unit-list"></div>`;
  const list = container.querySelector("#unit-list");
  function draw(areaId) {
    const filtered = areaId === "all" ? UNITS : unitsByArea(areaId);
    list.innerHTML = filtered.map(unitCard).join("") || `<div class="empty-state">Aún no hay unidades en esta área.</div>`;
    bindUnitCardClicks(list);
  }
  draw("all");
  bindAreaFilterBar(container, (areaId) => {
    container.querySelectorAll(".area-chip").forEach(c => c.classList.toggle("active", c.dataset.area === areaId));
    draw(areaId);
  });
}

function lessonsByArea(container, areaId) {
  const area = areaOf(areaId);
  const filtered = unitsByArea(areaId);
  container.innerHTML = `<a href="#/lessons" class="btn ghost">← Todas las áreas</a>` +
    pageHeader(`${area ? area.icon + " " + area.name : areaId}`, area?.description || "") +
    (filtered.map(unitCard).join("") || `<div class="empty-state">Aún no hay unidades en esta área.</div>`);
  bindUnitCardClicks(container);
}

function lessonDetail(container, unitId) {
  const u = UNITS.find(x => x.id === unitId);
  if (!u) return lessons(container, []);
  if (!isUnitUnlocked(u.id)) {
    container.innerHTML = `<a href="#/lessons" class="btn ghost">← Todas las unidades</a>` +
      pageHeader(`🔒 ${u.title}`, "Esta unidad todavía está bloqueada.") +
      `<div class="card"><p>${esc(unitUnlockHint(u.id))}</p></div>`;
    return;
  }
  container.innerHTML = `
    <a href="#/lessons" class="btn ghost">← Todas las unidades</a>
    ${pageHeader(u.title, u.subtitle)}
    <p class="small-muted">${areaLabel(u.area)}${u.recycled.length ? ` · Reutiliza: ${u.recycled.map(esc).join(", ")}` : ""}</p>

    <div class="card">
      <h3>🎯 Frases clave</h3>
      <table><tbody>
      ${u.corePhrases.map(p => `<tr><td>${esc(p.en)} ${speakBtn(p.en)}</td><td class="small-muted">${esc(p.use)}</td></tr>`).join("")}
      </tbody></table>
    </div>

    <div class="card">
      <h3>📕 Vocabulario nuevo</h3>
      <table><thead><tr><th>English</th><th>Español</th><th>Ejemplo</th></tr></thead><tbody>
      ${u.newVocab.map(v => `<tr><td>${esc(v.en)} ${speakBtn(v.en)}</td><td>${esc(v.es)}</td><td class="small-muted">${esc(v.example)}</td></tr>`).join("")}
      </tbody></table>
    </div>

    <div class="card">
      <h3>🧩 Gramática</h3>
      ${u.grammarPoints.map(g => `
        <div style="margin-bottom:14px;">
          <strong>${esc(g.title)}</strong>
          <p class="small-muted" style="margin:4px 0;">${esc(g.explanation)}</p>
          <ul>${g.examples.map(ex => `<li>${esc(ex)}</li>`).join("")}</ul>
        </div>
      `).join("")}
    </div>

    <div class="card">
      <h3>📖 Lectura</h3>
      ${u.readings.map(r => `
        <h4>${esc(r.title)} ${speakBtn(r.text)}</h4>
        <p class="reading-text">${wrapWords(r.text)}</p>
        <p class="small-muted"><strong>Idea principal:</strong> ${esc(r.summaryEs)}</p>
      `).join("")}
      <button class="btn secondary" id="go-reading">Abrir en modo lectura interactiva →</button>
    </div>

    <div class="card">
      <h3>💬 Conversaciones</h3>
      ${u.conversations.map(c => `<p><strong>${esc(c.title)}</strong></p>`).join("")}
      <button class="btn secondary" id="go-conv">Ver conversaciones interactivas →</button>
    </div>

    <div class="card">
      <h3>✏️ Ejercicios</h3>
      <p class="small-muted">${u.exercises.length} set(s) de ejercicios para esta unidad.</p>
      <button class="btn" id="go-ex">Practicar ejercicios →</button>
    </div>
  `;
  bindSpeakButtons(container);
  container.querySelector("#go-reading").addEventListener("click", () => location.hash = `#/reading/${u.id}`);
  container.querySelector("#go-conv").addEventListener("click", () => location.hash = `#/conversations/${u.id}`);
  container.querySelector("#go-ex").addEventListener("click", () => location.hash = `#/exercises/${u.id}`);
}

// --------------------------------------------------------------- READING --

export function reading(container, params) {
  const readings = allReadings();
  if (params[0]) {
    const r = readings.find(x => x.unit === params[0]);
    if (r) return readingDetail(container, r);
  }
  const present = new Set(readings.map(r => r.area));
  container.innerHTML = pageHeader("Lecturas interactivas", "Selecciona una palabra, frase u oración para ver traducción, gramática, pronunciación y ejemplos.") +
    areaFilterBar("all", present) +
    `<div id="reading-list"></div>`;
  const list = container.querySelector("#reading-list");
  function draw(areaId) {
    const filtered = areaId === "all" ? readings : readings.filter(r => r.area === areaId);
    list.innerHTML = filtered.map(r => `
      <div class="card unit-card" data-unit="${r.unit}">
        <div>
          <div style="font-weight:600;">${esc(r.title)}</div>
          <div class="small-muted">${areaLabel(r.area)} — ${esc(r.unitTitle)}</div>
        </div>
        <span class="badge">Leer →</span>
      </div>
    `).join("") || `<div class="empty-state">No hay lecturas para este filtro.</div>`;
    list.querySelectorAll("[data-unit]").forEach(el => {
      el.addEventListener("click", () => location.hash = `#/reading/${el.dataset.unit}`);
    });
  }
  draw("all");
  bindAreaFilterBar(container, (areaId) => {
    container.querySelectorAll(".area-chip").forEach(c => c.classList.toggle("active", c.dataset.area === areaId));
    draw(areaId);
  });
}

function readingDetail(container, r) {
  container.innerHTML = `
    <a href="#/reading" class="btn ghost">← Todas las lecturas</a>
    ${pageHeader(r.title, `${areaLabel(r.area)} — ${r.unitTitle}`)}
    <div class="grid-2">
      <div>
        <div class="card">
          ${playerControlsHtml({ level: getSettings().level })}
          <p class="reading-text sync-text" id="reading-body"></p>
          <p class="hint">Doble clic en una palabra para escucharla sola. Un clic para analizarla. 🔁🔤 repite la oración actual.</p>
        </div>
        <div class="card">
          <h3>Idea principal (ES)</h3>
          <p>${esc(r.summaryEs)}</p>
          <h3>Preguntas de comprensión</h3>
          <ul>${r.questions.map(q => `<li>${esc(q)}</li>`).join("")}</ul>
        </div>
      </div>
      <div id="analysis-panel">
        <div class="card analysis-panel"><p class="analysis-empty">👆 Haz clic en una palabra o selecciona una frase completa para analizarla aquí.</p></div>
      </div>
    </div>
  `;
  const body = container.querySelector("#reading-body");
  const panel = container.querySelector("#analysis-panel");
  mountSyncPlayer(container, { segments: [{ el: body, text: r.text }], panelEl: panel, contextText: r.text });
}

// ---------------------------------------------------------- CONVERSATIONS --

export function conversations(container, params) {
  const convos = allConversations();
  if (params[0]) {
    const list = convos.filter(c => c.unit === params[0]);
    if (list.length) return conversationList(container, list, params[0]);
  }
  const present = new Set(UNITS.filter(u => u.conversations.length).map(u => u.area));
  container.innerHTML = pageHeader("Conversaciones", "Diálogos reales por área de interés. Haz clic en cualquier palabra para analizarla.") +
    areaFilterBar("all", present) +
    `<div id="convo-units"></div>`;
  const list = container.querySelector("#convo-units");
  function draw(areaId) {
    const filtered = UNITS.filter(u => u.conversations.length && (areaId === "all" || u.area === areaId));
    list.innerHTML = filtered.map(u => `
      <div class="card unit-card" data-unit="${u.id}">
        <div><div style="font-weight:600;">${areaLabel(u.area)}: ${esc(u.title)}</div><div class="small-muted">${u.conversations.length} conversación(es)</div></div>
        <span class="badge">Ver →</span>
      </div>
    `).join("") || `<div class="empty-state">No hay conversaciones para este filtro.</div>`;
    list.querySelectorAll("[data-unit]").forEach(el => {
      el.addEventListener("click", () => location.hash = `#/conversations/${el.dataset.unit}`);
    });
  }
  draw("all");
  bindAreaFilterBar(container, (areaId) => {
    container.querySelectorAll(".area-chip").forEach(c => c.classList.toggle("active", c.dataset.area === areaId));
    draw(areaId);
  });
}

function conversationList(container, list, unitId) {
  const u = UNITS.find(x => x.id === unitId);
  container.innerHTML = `<a href="#/conversations" class="btn ghost">← Todas las conversaciones</a>` +
    pageHeader(`${areaLabel(u?.area)} — ${u?.title || ""}`, "") +
    `<div class="grid-2">
      <div id="convo-body"></div>
      <div id="analysis-panel"><div class="card analysis-panel"><p class="analysis-empty">👆 Haz clic en una palabra para analizarla.</p></div></div>
    </div>`;
  const body = container.querySelector("#convo-body");
  const panel = container.querySelector("#analysis-panel");
  body.innerHTML = list.map((c, ci) => `
    <div class="card convo-card">
      <h3 style="margin-top:0;">${esc(c.title)}</h3>
      ${playerControlsHtml({ level: getSettings().level })}
      ${c.lines.map((l, li) => `
        <div class="chat-line">
          <div class="chat-avatar">${esc(l.speaker.slice(0, 2).toUpperCase())}</div>
          <div class="chat-bubble">
            <div class="chat-speaker">${esc(l.speaker)}</div>
            <div class="convo-text sync-text" id="convo-${ci}-${li}"></div>
          </div>
        </div>
      `).join("")}
      <p class="hint">Doble clic en una palabra para escucharla sola. Un clic para analizarla.</p>
    </div>
  `).join("");

  list.forEach((c, ci) => {
    const root = body.querySelectorAll(".convo-card")[ci];
    const segments = c.lines.map((l, li) => ({ el: root.querySelector(`#convo-${ci}-${li}`), text: l.text }));
    mountSyncPlayer(root, { segments, panelEl: panel, contextText: c.title });
  });
}

// --------------------------------------------------------------- GRAMMAR --

function grammarStatusBadge(title) {
  const status = getGrammarStatus(title);
  if (status === "mastered") return `<span class="badge good">Dominada</span>`;
  if (status === "needs-review") return `<span class="badge bad">Repasar</span>`;
  return "";
}

export function grammar(container) {
  const unitPoints = allGrammarPoints();
  const storyPoints = STORIES.flatMap(s => s.grammarFocus.map(g => ({ ...g, area: s.area, storyId: s.id, storyTitle: s.title })));
  const points = [...unitPoints, ...storyPoints];
  const present = new Set(points.map(g => g.area));
  container.innerHTML = pageHeader("Gramática", "Reglas explicadas de forma práctica: qué es, cómo funciona, por qué se usa y ejemplos.") +
    areaFilterBar("all", present) +
    `<div id="grammar-list"></div>`;
  const list = container.querySelector("#grammar-list");
  function draw(areaId) {
    const filtered = areaId === "all" ? points : points.filter(g => g.area === areaId);
    list.innerHTML = filtered.map((g, i) => `
      <div class="card">
        <div class="toolbar">
          <h3 style="margin:0;">${esc(g.title)}</h3>
          <span class="badge">${areaLabel(g.area)}</span>
          ${g.storyTitle ? `<span class="badge">📗 ${esc(g.storyTitle)}</span>` : ""}
          ${grammarStatusBadge(g.title)}
          <span class="spacer"></span>
          <button class="btn secondary sm" data-explain="${i}">🤖 Explicar con IA</button>
        </div>
        <p>${esc(g.explanation)}</p>
        <p class="small-muted"><strong>Patrón:</strong> ${esc(g.pattern)}</p>
        <ul>${g.examples.map(ex => `<li>${esc(ex)} ${speakBtn(ex.split("→")[0].trim())}</li>`).join("")}</ul>
        <div class="ai-explain" data-slot="${i}"></div>
      </div>
    `).join("") || `<div class="empty-state">No hay reglas para este filtro.</div>`;
    bindSpeakButtons(list);
    list.querySelectorAll("[data-explain]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const i = +btn.dataset.explain;
        const slot = list.querySelector(`.ai-explain[data-slot="${i}"]`);
        slot.innerHTML = `<p class="small-muted loading-dots">Generando explicación</p>`;
        try {
          const text = await explainGrammarPoint(filtered[i].title, getSettings().level);
          slot.innerHTML = `<div class="divider"></div><p style="white-space:pre-wrap;">${esc(text)}</p>`;
        } catch (err) {
          slot.innerHTML = `<p class="feedback-bad">${esc(err.message || String(err))}</p>`;
        }
      });
    });
  }
  draw("all");
  bindAreaFilterBar(container, (areaId) => {
    container.querySelectorAll(".area-chip").forEach(c => c.classList.toggle("active", c.dataset.area === areaId));
    draw(areaId);
  });
}

// ------------------------------------------------------------- VOCABULARY --

// Merges the curated unit vocabulary with each story's vocabulary, so words
// introduced only in a story (not any lesson unit) still show up everywhere
// vocabulary is browsed, reviewed, or practiced.
function allVocabWithStories() {
  const base = allVocab();
  const byWord = new Map(base.map(v => [v.en.toLowerCase(), v]));
  STORIES.forEach(s => {
    s.vocab.forEach(v => {
      const key = v.en.toLowerCase();
      const existing = byWord.get(key);
      if (existing) {
        if (!existing.areas.includes(s.area)) existing.areas.push(s.area);
      } else {
        byWord.set(key, { ...v, unit: s.id, area: s.area, areas: [s.area] });
      }
    });
  });
  return Array.from(byWord.values());
}

export function vocabulary(container) {
  const vocab = allVocabWithStories();
  const phrases = allCorePhrases();
  const present = new Set(vocab.flatMap(v => v.areas));
  container.innerHTML = pageHeader("Vocabulario", "Tu glosario personal con repaso espaciado. Haz clic en cualquier palabra o frase para ver pronunciación, gramática y ejemplos.") +
    areaFilterBar("all", present) +
    `<div class="toolbar">
      <select id="filter-status">
        <option value="all">Todos los estados</option>
        <option value="new">Nuevas</option>
        <option value="learning">Aprendiendo</option>
        <option value="learned">Aprendidas</option>
        <option value="needs-review">Necesitan repaso</option>
      </select>
      <span class="spacer"></span>
      <span class="small-muted">${vocab.length} palabras · ${phrases.length} frases clave</span>
    </div>
    <div class="grid-2">
      <div>
        <div class="card"><div id="word-list"></div></div>
        <div class="card">
          <h3>Frases clave</h3>
          <table><tbody id="phrase-list"></tbody></table>
        </div>
      </div>
      <div id="analysis-panel">
        <div class="card analysis-panel"><p class="analysis-empty">👆 Haz clic en una palabra o frase para analizarla aquí.</p></div>
      </div>
    </div>`;

  const listEl = container.querySelector("#word-list");
  const phraseListEl = container.querySelector("#phrase-list");
  const panel = container.querySelector("#analysis-panel");
  let activeArea = "all";

  function draw(statusFilter = "all") {
    const filteredVocab = vocab.filter(v => activeArea === "all" || v.areas.includes(activeArea));
    listEl.innerHTML = filteredVocab.map(v => {
      const w = touchWord(v.en, v.es);
      if (statusFilter !== "all" && w.status !== statusFilter) return "";
      return `
        <div class="word-row" data-en="${esc(v.en)}">
          <div>
            <span class="status-dot status-${w.status}"></span>
            <span class="word-en sel-word" data-word="${esc(v.en.toLowerCase())}">${esc(v.en)}</span> ${speakBtn(v.en)}
            ${sttSupported() ? `<button class="icon-btn sm" data-mic="${esc(v.en)}" title="Practicar pronunciación">🎙</button>` : ""}
            <div class="word-es">${esc(v.es)} · <span class="small-muted">${esc(v.example)}</span></div>
            <div style="margin-top:4px;">${v.areas.map(a => `<span class="badge">${areaLabel(a)}</span>`).join(" ")}</div>
            <div class="mic-result small-muted" data-mic-result="${esc(v.en)}" style="display:none; margin-top:4px;"></div>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span class="badge">${statusLabel(w.status)}</span>
            <button class="btn secondary sm" data-correct="${esc(v.en)}">👍 La sé</button>
            <button class="btn secondary sm" data-wrong="${esc(v.en)}">🔁 Repasar</button>
          </div>
        </div>`;
    }).join("");
    bindSpeakButtons(listEl);
    listEl.querySelectorAll("[data-correct]").forEach(btn => btn.addEventListener("click", () => { reviewWord(btn.dataset.correct, true); draw(container.querySelector("#filter-status").value); }));
    listEl.querySelectorAll("[data-wrong]").forEach(btn => btn.addEventListener("click", () => { reviewWord(btn.dataset.wrong, false); draw(container.querySelector("#filter-status").value); }));
    listEl.querySelectorAll("[data-mic]").forEach(btn => {
      const resultEl = listEl.querySelector(`[data-mic-result="${CSS.escape(btn.dataset.mic)}"]`);
      bindMicPractice(btn, btn.dataset.mic, resultEl);
    });
    wireAnalysis(listEl, panel, null, null);

    const filteredPhrases = phrases.filter(p => activeArea === "all" || p.area === activeArea);
    phraseListEl.innerHTML = filteredPhrases.map(p => `<tr><td><span class="sel-word" data-word="${esc(p.en.toLowerCase())}">${esc(p.en)}</span> ${speakBtn(p.en)}</td><td class="small-muted">${esc(p.use)}</td><td><span class="badge">${areaLabel(p.area)}</span></td></tr>`).join("");
    bindSpeakButtons(phraseListEl);
    wireAnalysis(phraseListEl, panel, null, null);
  }
  draw();
  container.querySelector("#filter-status").addEventListener("change", (e) => draw(e.target.value));
  bindAreaFilterBar(container, (areaId) => {
    activeArea = areaId;
    container.querySelectorAll(".area-chip").forEach(c => c.classList.toggle("active", c.dataset.area === areaId));
    draw(container.querySelector("#filter-status").value);
  });
}

// ------------------------------------------------------------------ VERBS --

export function verbs(container, params) {
  const initial = params[0] || VERBS[0].base;
  container.innerHTML = pageHeader("Verbos", "Formas verbales y tabla de tiempos. Haz clic en cualquier ejemplo para ver su gramática y pronunciación.") +
    `<div class="grid-2">
      <div class="card">
        <div class="verb-picker" id="verb-picker">
          ${VERBS.map(v => `<span class="verb-chip ${v.base === initial ? "active" : ""}" data-verb="${v.base}">${v.base}</span>`).join("")}
        </div>
        <div id="verb-detail"></div>
      </div>
      <div id="analysis-panel">
        <div class="card analysis-panel"><p class="analysis-empty">👆 Haz clic en el verbo o en cualquier ejemplo para analizarlo aquí.</p></div>
      </div>
    </div>`;
  const panel = container.querySelector("#analysis-panel");
  function draw(base) {
    const v = VERBS.find(x => x.base === base) || VERBS[0];
    container.querySelectorAll(".verb-chip").forEach(c => c.classList.toggle("active", c.dataset.verb === v.base));
    const detail = container.querySelector("#verb-detail");
    detail.innerHTML = `
      <h3><span class="sel-word" data-word="${esc(v.base.toLowerCase())}">${v.base.toUpperCase()}</span> ${speakBtn(v.base)} <span class="badge">${v.type === "irregular" ? "Irregular" : "Regular"}</span></h3>
      <table><tbody>
        <tr><td>Base form</td><td>${esc(v.base)}</td></tr>
        <tr><td>Third person</td><td>${esc(v.third)}</td></tr>
        <tr><td>Present participle</td><td>${esc(v.ing)}</td></tr>
        <tr><td>Past</td><td>${esc(v.past)}</td></tr>
        <tr><td>Past participle</td><td>${esc(v.participle)}</td></tr>
      </tbody></table>
      <div class="divider"></div>
      <h3>Tabla de tiempos verbales</h3>
      <table><thead><tr><th>Tiempo</th><th>Afirmativa</th><th>Negativa</th><th>Interrogativa</th><th>Uso</th></tr></thead>
      <tbody>
        ${tenseTable(v).map((t, ti) => `<tr>
          <td><strong>${esc(t.tense)}</strong></td>
          <td>
            <span class="sel-word" data-word="${esc(t.affirmative.toLowerCase())}">${esc(t.affirmative)}</span> ${speakBtn(t.affirmative)}
            ${sttSupported() ? `<button class="icon-btn sm" data-mic="${esc(t.affirmative)}" data-mic-i="${ti}" title="Practicar pronunciación">🎙</button>` : ""}
            <div class="mic-result small-muted" data-mic-result-i="${ti}" style="display:none; margin-top:4px;"></div>
          </td>
          <td>${esc(t.negative)}</td>
          <td>${esc(t.question)}</td>
          <td class="small-muted">${esc(t.use)}</td>
        </tr>`).join("")}
      </tbody></table>
    `;
    bindSpeakButtons(detail);
    detail.querySelectorAll("[data-mic]").forEach(btn => {
      const resultEl = detail.querySelector(`[data-mic-result-i="${btn.dataset.micI}"]`);
      bindMicPractice(btn, btn.dataset.mic, resultEl);
    });
    wireAnalysis(detail, panel, `${v.base} (verb)`, null);
  }
  container.querySelectorAll(".verb-chip").forEach(chip => {
    chip.addEventListener("click", () => { location.hash = `#/verbs/${chip.dataset.verb}`; draw(chip.dataset.verb); });
  });
  draw(initial);
}

// ------------------------------------------------------------ PRONUNCIATION --

function pronunciationItems() {
  const items = [];
  allCorePhrases().forEach(p => items.push({ text: p.en, kind: "Frase clave", unit: p.unit, area: p.area }));
  allVocabWithStories().forEach(v => items.push({ text: v.en, kind: "Palabra", unit: v.unit, area: v.area }));
  allReadings().forEach(r => {
    r.text.split(/(?<=[.!?])\s+/).forEach(sentence => {
      if (sentence.trim().split(" ").length >= 4) items.push({ text: sentence.trim(), kind: "Oración", unit: r.unit, area: r.area });
    });
  });
  STORIES.forEach(s => {
    s.text.split(/(?<=[.!?])\s+/).forEach(sentence => {
      const clean = sentence.trim().replace(/\s+/g, " ");
      if (clean.split(" ").length >= 4) items.push({ text: clean, kind: "Oración", unit: s.id, area: s.area });
    });
  });
  return items;
}

export function pronunciation(container) {
  const items = pronunciationItems();
  if (!ttsSupported()) {
    container.innerHTML = pageHeader("Pronunciación", "") + `<div class="card"><p>Tu navegador no soporta síntesis de voz (Web Speech API). Prueba con Chrome o Edge.</p></div>`;
    return;
  }
  const present = new Set(items.map(it => it.area));
  const myRate = getSettings().voiceRate;
  const suggested = recommendedRates(getSettings().level);
  container.innerHTML = pageHeader("Pronunciación", "Escucha palabras, frases y oraciones. Haz clic para analizarlas o usa \"Practicar\" para grabar tu voz y compararla.") +
    areaFilterBar("all", present) +
    `<div class="toolbar">
      <select id="kind-filter">
        <option value="all">Todo</option>
        <option value="Palabra">Palabras</option>
        <option value="Frase clave">Frases clave</option>
        <option value="Oración">Oraciones</option>
      </select>
      <span class="spacer"></span>
      ${sttSupported() ? "" : `<span class="small-muted">🎙 Reconocimiento de voz no disponible en este navegador — prueba Chrome/Edge.</span>`}
    </div>
    <div class="toolbar">
      <span class="small-muted">Velocidad:</span>
      <div class="preset-group">
        ${Object.entries(PRESET_LABELS).map(([key, label]) => `<span class="speed-chip preset-chip ${RATE_PRESETS[key] === myRate ? "active" : ""}" data-preset="${key}">${label}</span>`).join("")}
      </div>
      ${PLAYBACK_RATES.map(r => `<span class="speed-chip ${r === myRate ? "active" : ""} ${suggested.includes(r) ? "suggested" : ""}" data-rate="${r}" title="${esc(RATE_LABELS[r] || r + "x")}">${r}x</span>`).join("")}
      <span class="small-muted">· sugerido para tu nivel (${esc(getSettings().level)})</span>
    </div>
    <div class="grid-2">
      <div>
        <div class="card"><div id="pron-list"></div></div>
        <div class="card" id="practice-result" style="display:none;"></div>
      </div>
      <div id="analysis-panel">
        <div class="card analysis-panel"><p class="analysis-empty">👆 Haz clic en una palabra, frase u oración para analizarla aquí.</p></div>
      </div>
    </div>`;

  const list = container.querySelector("#pron-list");
  const panel = container.querySelector("#analysis-panel");
  let activeArea = "all";
  function draw(kindFilter = "all") {
    const filtered = items
      .filter(it => activeArea === "all" || it.area === activeArea)
      .filter(it => kindFilter === "all" || it.kind === kindFilter)
      .slice(0, 60);
    list.innerHTML = filtered.map((it, i) => `
      <div class="word-row">
        <div><span class="badge">${esc(it.kind)}</span> <span class="badge">${areaLabel(it.area)}</span> <span class="sel-word" data-word="${esc(it.text.toLowerCase())}">${esc(it.text)}</span></div>
        <div style="display:flex; gap:6px;">
          <button class="icon-btn" data-speak="${esc(it.text)}" title="Escuchar">🔊</button>
          ${sttSupported() ? `<button class="btn secondary sm" data-practice="${esc(it.text)}">🎙 Practicar</button>` : ""}
        </div>
      </div>
    `).join("") || `<div class="empty-state">No hay elementos para este filtro.</div>`;
    bindSpeakButtons(list);
    list.querySelectorAll("[data-practice]").forEach(btn => btn.addEventListener("click", () => practice(btn.dataset.practice, btn)));
    wireAnalysis(list, panel, null, null);
  }
  draw();
  container.querySelector("#kind-filter").addEventListener("change", (e) => draw(e.target.value));
  function syncPronRateUI(rate) {
    container.querySelectorAll(".speed-chip[data-rate]").forEach(c => c.classList.toggle("active", +c.dataset.rate === rate));
    container.querySelectorAll(".speed-chip[data-preset]").forEach(c => c.classList.toggle("active", RATE_PRESETS[c.dataset.preset] === rate));
  }
  container.querySelectorAll(".speed-chip[data-rate]").forEach(chip => {
    chip.addEventListener("click", () => {
      const r = +chip.dataset.rate;
      updateSettings({ voiceRate: r });
      syncPronRateUI(r);
    });
  });
  container.querySelectorAll(".speed-chip[data-preset]").forEach(chip => {
    chip.addEventListener("click", () => {
      const r = RATE_PRESETS[chip.dataset.preset];
      updateSettings({ voiceRate: r });
      syncPronRateUI(r);
    });
  });
  bindAreaFilterBar(container, (areaId) => {
    activeArea = areaId;
    container.querySelectorAll(".area-chip").forEach(c => c.classList.toggle("active", c.dataset.area === areaId));
    draw(container.querySelector("#kind-filter").value);
  });

  const resultBox = container.querySelector("#practice-result");
  function practice(target, btn) {
    btn.textContent = "🎙 Escuchando...";
    btn.disabled = true;
    listenOnce({
      onResult: async (spoken) => {
        const { results, score } = compareSpeech(target, spoken);
        resultBox.style.display = "block";
        resultBox.innerHTML = `
          <h3>Resultado: ${score}%</h3>
          <p>${results.map(r => `<span style="color:${r.match ? "var(--good)" : "var(--bad)"};">${r.match ? "✓" : "✗"} ${esc(r.word)}</span>`).join("  ")}</p>
          <p class="small-muted">Dijiste: "${esc(spoken)}"</p>
          <div id="ai-pron-feedback" class="small-muted"></div>
        `;
        if (hasApiKey()) {
          const fb = resultBox.querySelector("#ai-pron-feedback");
          fb.innerHTML = `<span class="loading-dots">Generando consejo</span>`;
          try {
            const advice = await pronunciationFeedback(target, spoken, getSettings().level);
            fb.innerHTML = `<div class="divider"></div><p style="white-space:pre-wrap;">${esc(advice)}</p>`;
          } catch (err) {
            fb.innerHTML = "";
          }
        }
      },
      onError: (err) => {
        resultBox.style.display = "block";
        resultBox.innerHTML = `<p class="feedback-bad">${esc(err.message)}</p>`;
      },
      onEnd: () => { btn.textContent = "🎙 Practicar"; btn.disabled = false; }
    });
  }
}

// -------------------------------------------------------------- EXERCISES --

export function exercises(container, params) {
  const all = allExercises();
  const filterUnit = params[0] || null;
  const present = new Set(all.map(ex => ex.area));
  container.innerHTML = pageHeader("Ejercicios", "Practica y recibe corrección inmediata con explicación.") +
    areaFilterBar("all", present) +
    `<div class="toolbar">
      <select id="unit-filter">
        <option value="all">Todas las unidades</option>
        ${UNITS.map(u => `<option value="${u.id}" ${filterUnit === u.id ? "selected" : ""}>${areaLabel(u.area)} — ${esc(u.title)}</option>`).join("")}
      </select>
    </div>
    <div id="exercise-list"></div>`;
  const list = container.querySelector("#exercise-list");
  let activeArea = "all";
  function draw(unitFilter) {
    list.innerHTML = "";
    let filtered = all.filter(ex => activeArea === "all" || ex.area === activeArea);
    filtered = filtered.filter(ex => unitFilter === "all" || ex.unit === unitFilter);
    if (!filtered.length) {
      list.innerHTML = `<div class="empty-state">No hay ejercicios para este filtro.</div>`;
      return;
    }
    let currentUnit = null;
    filtered.forEach(ex => {
      if (ex.unit !== currentUnit) {
        currentUnit = ex.unit;
        const h = document.createElement("h3");
        h.textContent = `${areaLabel(ex.area)} — ${ex.unitTitle}`;
        list.appendChild(h);
      }
      renderExerciseBlock(ex, list);
    });
  }
  draw(filterUnit || "all");
  container.querySelector("#unit-filter").addEventListener("change", (e) => draw(e.target.value));
  bindAreaFilterBar(container, (areaId) => {
    activeArea = areaId;
    container.querySelectorAll(".area-chip").forEach(c => c.classList.toggle("active", c.dataset.area === areaId));
    draw(container.querySelector("#unit-filter").value);
  });
}

// ------------------------------------------------------------------ TUTOR --

export function tutor(container) {
  if (!hasApiKey()) {
    container.innerHTML = pageHeader("Tutor IA", "Practica una conversación real en inglés, con corrección de errores y adaptación a tu nivel.") +
      `<div class="card">
        <p>Para usar el tutor de conversación necesitas agregar tu propia API key de Anthropic (Claude). Se guarda solo en este navegador — nunca se envía a ningún otro lugar.</p>
        <a href="#/profile" class="btn">Configurar API key →</a>
      </div>`;
    return;
  }
  const storyCtx = getStoryContext();
  container.innerHTML = pageHeader("Tutor IA", `Nivel actual: ${getSettings().level}. Habla en inglés — el tutor corrige con suavidad y sin interrumpir el flujo.`) +
    (storyCtx ? `
      <div class="card" style="background:var(--brand-soft); border-color:var(--brand);">
        <div class="toolbar" style="margin:0;">
          <span>📖 Conversando sobre: <strong>${esc(storyCtx.title)}</strong></span>
          <span class="spacer"></span>
          <button class="btn ghost sm" id="clear-story-ctx">Quitar</button>
        </div>
      </div>` : "") +
    `<div class="card">
      <div class="chat-window" id="chat-window"></div>
      <div class="chat-input-row">
        <textarea id="chat-input" placeholder="Escribe tu mensaje en inglés..."></textarea>
        <button class="btn" id="chat-send">Enviar</button>
      </div>
      <div class="toolbar" style="margin-top:8px;">
        <button class="btn secondary sm" id="chat-clear">Reiniciar conversación</button>
        ${sttSupported() ? `<button class="btn secondary sm" id="chat-mic">🎙 Hablar</button>` : ""}
        <span class="spacer"></span>
        <span class="small-muted">Sugerencia: cuenta cómo va tu día de trabajo, o pide practicar una reunión.</span>
      </div>
    </div>`;

  container.querySelector("#clear-story-ctx")?.addEventListener("click", () => { clearStoryContext(); tutor(container); });

  const win = container.querySelector("#chat-window");
  let activeChatSession = null;
  function playMessage(bubbleEl, text) {
    if (activeChatSession) { activeChatSession.cancel(); activeChatSession = null; }
    bubbleEl.innerHTML = wrapWordsSynced(text) + ` <button class="icon-btn sm chat-replay-btn" title="Escuchar de nuevo">🔊</button>`;
    bubbleEl.querySelector(".chat-replay-btn").addEventListener("click", (e) => { e.stopPropagation(); playMessage(bubbleEl, text); });
    activeChatSession = speakSynced(text, {
      rate: getSettings().voiceRate,
      onWord: (idx) => {
        bubbleEl.querySelectorAll(".sync-word").forEach(w => w.classList.remove("current"));
        bubbleEl.querySelector(`.sync-word[data-widx="${idx}"]`)?.classList.add("current");
      },
      onEnd: () => { activeChatSession = null; },
      onError: () => { activeChatSession = null; }
    });
  }

  function drawHistory() {
    const hist = getChatHistory();
    win.innerHTML = hist.map((m, i) => m.role === "user"
      ? `<div class="msg user">${esc(m.content)}</div>`
      : `<div class="msg assistant" data-msg-i="${i}">${wrapWordsSynced(m.content)} <button class="icon-btn sm chat-replay-btn" data-i="${i}" title="Escuchar de nuevo">🔊</button></div>`
    ).join("") || `<p class="small-muted">Empieza la conversación escribiendo un mensaje, por ejemplo: "Hi! Can I give you a quick update about a ticket?"</p>`;
    win.scrollTop = win.scrollHeight;
    win.querySelectorAll(".chat-replay-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const i = +btn.dataset.i;
        const bubble = win.querySelector(`.msg.assistant[data-msg-i="${i}"]`);
        const text = hist[i]?.content;
        if (bubble && text) playMessage(bubble, text);
      });
    });
  }
  drawHistory();

  async function send(text) {
    if (!text.trim()) return;
    pushChatMessage("user", text);
    drawHistory();
    const loadingMsg = document.createElement("div");
    loadingMsg.className = "msg assistant loading-dots";
    loadingMsg.textContent = "Escribiendo";
    win.appendChild(loadingMsg);
    win.scrollTop = win.scrollHeight;
    try {
      const reply = await tutorReply(getChatHistory(), text, { level: getSettings().level, storyContext: storyCtx });
      pushChatMessage("assistant", reply);
      drawHistory();
      const hist = getChatHistory();
      const lastBubble = win.querySelector(`.msg.assistant[data-msg-i="${hist.length - 1}"]`);
      if (lastBubble) playMessage(lastBubble, reply);
    } catch (err) {
      loadingMsg.remove();
      const errMsg = document.createElement("div");
      errMsg.className = "msg assistant";
      errMsg.textContent = "⚠️ " + (err.message || String(err));
      win.appendChild(errMsg);
    }
  }

  if (storyCtx && getChatHistory().length === 0) {
    clearStoryContext();
    send(`Let's talk about the story I just read: "${storyCtx.title}".`);
  }

  container.querySelector("#chat-send").addEventListener("click", () => {
    const input = container.querySelector("#chat-input");
    const text = input.value;
    input.value = "";
    send(text);
  });
  container.querySelector("#chat-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      container.querySelector("#chat-send").click();
    }
  });
  container.querySelector("#chat-clear").addEventListener("click", () => { clearChatHistory(); drawHistory(); });
  const mic = container.querySelector("#chat-mic");
  if (mic) {
    mic.addEventListener("click", () => {
      mic.textContent = "🎙 Escuchando...";
      listenOnce({
        onResult: (text) => { container.querySelector("#chat-input").value = text; },
        onError: (err) => alert(err.message),
        onEnd: () => { mic.textContent = "🎙 Hablar"; }
      });
    });
  }
}

// --------------------------------------------------------- LOCKED SECTION --

const SECTION_LABELS = { grammar: "🧩 Gramática", verbs: "🔤 Verbos" };

export function lockedSection(container, route) {
  container.innerHTML = pageHeader(`🔒 ${SECTION_LABELS[route] || "Sección bloqueada"}`, "Todavía no has desbloqueado esta sección.") +
    `<div class="card">
      <p>${esc(sectionUnlockHint(route))}</p>
      <a href="#/lessons" class="btn" style="margin-top:8px;">Ir a Aprender →</a>
    </div>`;
}

// --------------------------------------------------------------- PROGRESS --

export function progress(container) {
  const state = getState();
  const stats = exerciseStats();
  const words = allTrackedWords();
  const learned = words.filter(w => w.status === "learned").length;
  const learning = words.filter(w => w.status === "learning").length;
  const needsReview = words.filter(w => w.status === "needs-review").length;
  const totalVocab = allVocab().length;
  const minutes = Math.round(totalStudyMinutes());
  const grammarCount = allGrammarPoints().length;

  container.innerHTML = pageHeader("Mi progreso", "") +
    `<div class="grid-3">
      <div class="card stat-card"><div class="stat-num">${state.streak.count || 0}</div><div class="stat-label">Racha (días)</div></div>
      <div class="card stat-card"><div class="stat-num">${minutes}</div><div class="stat-label">Minutos estudiados</div></div>
      <div class="card stat-card"><div class="stat-num">${stats.accuracy}%</div><div class="stat-label">Precisión ejercicios</div></div>
    </div>
    <div class="card">
      <h3>Vocabulario</h3>
      <div class="progress-bar-outer"><div class="progress-bar-inner" style="width:${totalVocab ? (learned / totalVocab) * 100 : 0}%"></div></div>
      <p class="small-muted">${learned} aprendidas · ${learning} en progreso · ${needsReview} necesitan repaso · de ${totalVocab} palabras totales</p>
    </div>
    <div class="grid-2">
      <div class="card">
        <h3>Ejercicios</h3>
        <p><strong>${stats.attempts}</strong> intentos registrados</p>
        <p><strong>${stats.totalCorrect} / ${stats.totalItems}</strong> respuestas correctas</p>
      </div>
      <div class="card">
        <h3>Gramática</h3>
        <p><strong>${grammarCount}</strong> reglas cubiertas en el curso</p>
        <p class="small-muted">Usa el botón "Explicar con IA" en cada regla para profundizar.</p>
      </div>
    </div>
    <div class="card">
      <h3>Recomendación</h3>
      <p>${recommendation(needsReview, stats)}</p>
    </div>`;
}

function recommendation(needsReview, stats) {
  if (needsReview > 0) return `Tienes ${needsReview} palabra(s) marcadas para repaso. Ve a Vocabulario y refuérzalas antes de aprender contenido nuevo.`;
  if (stats.accuracy > 0 && stats.accuracy < 70) return "Tu precisión en ejercicios está por debajo del 70%. Repite los ejercicios de las últimas unidades antes de avanzar.";
  return "¡Vas muy bien! Continúa con la siguiente unidad o practica una conversación con el Tutor IA.";
}

// ------------------------------------------------------------------ STORIES --

const DIMENSION_LABELS = {
  comprehension: "Comprensión lectora",
  vocabulary: "Vocabulario",
  grammar: "Gramática",
  pronunciation: "Pronunciación",
  expressions: "Estructuras / expresiones"
};

function storyCard(s) {
  const unlocked = isStoryUnlocked(s);
  return `
    <div class="card unit-card ${unlocked ? "" : "locked"}" data-story="${s.id}" ${unlocked ? "" : `data-locked-hint="${esc(storyUnlockHint(s))}"`}>
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="unit-num">${unlocked ? (areaOf(s.area)?.icon || "📖") : "🔒"}</div>
        <div>
          <div style="font-weight:600;">${esc(s.title)}</div>
          <div class="small-muted">${unlocked ? esc(s.subtitle) : storyUnlockHint(s)}</div>
          <div style="margin-top:6px;"><span class="badge">${areaLabel(s.area)}</span><span class="badge">${esc(s.level)}</span></div>
        </div>
      </div>
      <span class="badge">${unlocked ? "Leer →" : "Bloqueado"}</span>
    </div>`;
}

function lockedStoryView(container, story) {
  container.innerHTML = `<a href="#/stories" class="btn ghost">← Todos los cuentos</a>` +
    pageHeader(`🔒 ${story.title}`, "Este cuento todavía está bloqueado.") +
    `<div class="card"><p>${esc(storyUnlockHint(story))}</p></div>`;
}

export function stories(container, params) {
  if (params[0] && params[1] === "evaluate") {
    const story = storyById(params[0]);
    if (story && !isStoryUnlocked(story)) return lockedStoryView(container, story);
    if (story) return storyEvaluationView(container, story);
  }
  if (params[0]) {
    const story = storyById(params[0]);
    if (story && !isStoryUnlocked(story)) return lockedStoryView(container, story);
    if (story) return storyDetail(container, story);
  }
  const present = new Set(STORIES.map(s => s.area));
  const levels = LEVELS_ORDER.filter(l => STORIES.some(s => s.level === l));
  container.innerHTML = pageHeader("📖 Cuentos y Literatura", "Relatos originales de 2+ páginas para practicar comprensión, vocabulario, gramática y pronunciación en profundidad.") +
    areaFilterBar("all", present) +
    `<div class="toolbar">
      <select id="level-filter">
        <option value="all">Todos los niveles</option>
        ${levels.map(l => `<option value="${l}">${l}</option>`).join("")}
      </select>
    </div>
    <div id="story-list"></div>`;
  const list = container.querySelector("#story-list");
  let activeArea = "all";
  function draw(levelId) {
    let filtered = activeArea === "all" ? STORIES : storiesByArea(activeArea);
    filtered = levelId === "all" ? filtered : filtered.filter(s => s.level === levelId);
    list.innerHTML = filtered.map(storyCard).join("") || `<div class="empty-state">No hay cuentos para este filtro todavía.</div>`;
    list.querySelectorAll("[data-story]").forEach(el => {
      el.addEventListener("click", () => {
        if (el.classList.contains("locked")) {
          alert(`🔒 ${el.dataset.lockedHint || "Este cuento todavía está bloqueado."}`);
          return;
        }
        location.hash = `#/stories/${el.dataset.story}`;
      });
    });
  }
  draw("all");
  container.querySelector("#level-filter").addEventListener("change", (e) => draw(e.target.value));
  bindAreaFilterBar(container, (areaId) => {
    activeArea = areaId;
    container.querySelectorAll(".area-chip").forEach(c => c.classList.toggle("active", c.dataset.area === areaId));
    draw(container.querySelector("#level-filter").value);
  });
}

function storyDetail(container, story) {
  const prevAttempts = storyEvaluationsFor(story.id);
  const bestAttempt = prevAttempts.length ? Math.max(...prevAttempts.map(a => a.total)) : null;
  container.innerHTML = `
    <a href="#/stories" class="btn ghost">← Todos los cuentos</a>
    ${pageHeader(story.title, story.subtitle)}
    <p class="small-muted">${areaLabel(story.area)} · Nivel ${esc(story.level)}${bestAttempt !== null ? ` · Mejor resultado de evaluación: ${bestAttempt}%` : ""}</p>
    <div class="grid-2">
      <div>
        <div class="card">
          ${playerControlsHtml({ level: story.level })}
          <p class="reading-text sync-text" id="story-body" style="white-space:pre-line;"></p>
          <p class="hint">Doble clic en una palabra para escucharla sola. Un clic para analizarla. 🔁🔤 repite la oración actual.</p>
        </div>
        <div class="card">
          <h3>Idea principal (ES)</h3>
          <p>${esc(story.summaryEs)}</p>
        </div>
        <div class="card">
          <h3>🧩 Gramática presente en este cuento</h3>
          ${story.grammarFocus.map(g => `
            <div style="margin-bottom:14px;">
              <strong>${esc(g.title)}</strong>
              <p class="small-muted" style="margin:4px 0;">${esc(g.explanation)}</p>
              <ul>${g.examples.map(ex => `<li>${esc(ex)}</li>`).join("")}</ul>
            </div>
          `).join("")}
        </div>
        <div class="card">
          <h3>📕 Vocabulario del cuento</h3>
          <table><tbody>
            ${story.vocab.map(v => `<tr><td>${esc(v.en)} ${speakBtn(v.en)}</td><td>${esc(v.es)}</td><td class="small-muted">${esc(v.example)}</td></tr>`).join("")}
          </tbody></table>
        </div>
        <div class="card">
          <h3>✅ Evaluación de esta lectura</h3>
          <p class="small-muted">15 preguntas: comprensión, vocabulario, gramática, pronunciación y expresiones.</p>
          <button class="btn" id="go-eval">Comenzar evaluación →</button>
        </div>
      </div>
      <div id="analysis-panel">
        <div class="card analysis-panel"><p class="analysis-empty">👆 Haz clic en una palabra o selecciona una frase completa para analizarla aquí.</p></div>
      </div>
    </div>
  `;
  story.vocab.forEach(v => touchWord(v.en, v.es));
  bindSpeakButtons(container);
  const body = container.querySelector("#story-body");
  const panel = container.querySelector("#analysis-panel");
  const storyDict = {};
  story.vocab.forEach(v => { storyDict[v.en.toLowerCase()] = { ...v, area: story.area, unit: story.id }; });
  mountSyncPlayer(container, { segments: [{ el: body, text: story.text }], panelEl: panel, contextText: story.title, extraDictionary: storyDict });
  container.querySelector("#go-eval").addEventListener("click", () => location.hash = `#/stories/${story.id}/evaluate`);
}

function similarityScore(a, b) {
  const norm = s => s.toLowerCase().replace(/[.,!?;:"']/g, "").split(/\s+/).filter(Boolean);
  const ta = norm(a), tb = norm(b);
  const setB = [...tb];
  let matches = 0;
  ta.forEach(w => { const idx = setB.indexOf(w); if (idx !== -1) { setB.splice(idx, 1); matches++; } });
  return ta.length ? matches / ta.length : 0;
}

function renderEvalQuestion(q, i, state) {
  const wrap = document.createElement("div");
  wrap.className = "card";

  if (q.type === "mcq") {
    wrap.innerHTML = `
      <div style="margin-bottom:8px;">${i + 1}. ${esc(q.text)}</div>
      ${q.options.map((opt, oi) => `<div class="opt-row" data-oi="${oi}">${esc(opt)}</div>`).join("")}
      <div class="q-feedback"></div>
    `;
    wrap.querySelectorAll(".opt-row").forEach(row => {
      row.addEventListener("click", () => {
        state.answers[i] = +row.dataset.oi;
        wrap.querySelectorAll(".opt-row").forEach(r => r.style.outline = "");
        row.style.outline = "2px solid var(--brand)";
      });
    });
  } else if (q.type === "fill-blank") {
    const [before, after] = q.text.split("___");
    wrap.innerHTML = `
      <div style="margin-bottom:8px;">${i + 1}. ${esc(before || "")}<input type="text" class="fb-input" style="width:170px; display:inline-block;" />${esc(after || "")}</div>
      <div class="q-feedback"></div>
    `;
  } else if (q.type === "short-answer") {
    wrap.innerHTML = `
      <div style="margin-bottom:8px;">${i + 1}. ${esc(q.text)}</div>
      <textarea class="sa-input" placeholder="Escribe tu respuesta en inglés..."></textarea>
      <div class="q-feedback"></div>
    `;
  } else if (q.type === "order") {
    const st = state.orderPools[i];
    wrap.innerHTML = `
      <div style="margin-bottom:8px;">${i + 1}. Ordena los eventos:</div>
      <div class="assembled" style="min-height:34px; border:1px dashed var(--border); border-radius:8px; padding:6px; margin-bottom:6px;"></div>
      <div class="pool"></div>
      <div class="q-feedback"></div>
    `;
    function renderPools() {
      wrap.querySelector(".assembled").innerHTML = st.assembled.map((w, wi) => `<span class="verb-chip active" data-role="a" data-wi="${wi}">${esc(w)}</span>`).join(" ");
      wrap.querySelector(".pool").innerHTML = st.pool.map((w, wi) => `<span class="verb-chip" data-role="p" data-wi="${wi}">${esc(w)}</span>`).join(" ");
      wrap.querySelectorAll('[data-role="p"]').forEach(chip => chip.addEventListener("click", () => {
        const wi = +chip.dataset.wi; const [w] = st.pool.splice(wi, 1); st.assembled.push(w); renderPools();
      }));
      wrap.querySelectorAll('[data-role="a"]').forEach(chip => chip.addEventListener("click", () => {
        const wi = +chip.dataset.wi; const [w] = st.assembled.splice(wi, 1); st.pool.push(w); renderPools();
      }));
    }
    renderPools();
  } else if (q.type === "pronunciation") {
    wrap.innerHTML = `
      <div style="margin-bottom:8px;">${i + 1}. Pronuncia: "<em>${esc(q.text)}</em>" ${speakBtn(q.text)}</div>
      ${sttSupported() ? `<button class="btn secondary sm mic-eval-btn">🎙 Practicar y evaluar</button>` : `<p class="small-muted">Reconocimiento de voz no disponible en este navegador.</p>`}
      <div class="mic-eval-result small-muted" style="margin-top:6px;"></div>
    `;
    bindSpeakButtons(wrap);
    const micBtn = wrap.querySelector(".mic-eval-btn");
    const resultEl = wrap.querySelector(".mic-eval-result");
    if (micBtn) {
      micBtn.addEventListener("click", () => {
        micBtn.disabled = true;
        const original = micBtn.textContent;
        micBtn.textContent = "🎙 Escuchando...";
        listenOnce({
          onResult: (spoken) => {
            const { results, score } = compareSpeech(q.text, spoken);
            state.pronScores[i] = score;
            resultEl.innerHTML = `<strong>${score}%</strong> — ${results.map(r => `<span style="color:${r.match ? "var(--good)" : "var(--bad)"};">${r.match ? "✓" : "✗"} ${esc(r.word)}</span>`).join(" ")}`;
          },
          onError: (err) => { resultEl.innerHTML = `<span class="feedback-bad">${esc(err.message)}</span>`; },
          onEnd: () => { micBtn.disabled = false; micBtn.textContent = original; }
        });
      });
    }
  }
  return wrap;
}

const LEVELS_ORDER = ["A1", "A2", "B1", "B2", "C1"];
function inferDemonstratedLevel(storyLevel, totalPct) {
  const idx = LEVELS_ORDER.indexOf(storyLevel);
  if (idx === -1) return storyLevel;
  if (totalPct >= 80) return storyLevel;
  if (totalPct >= 60) return LEVELS_ORDER[Math.max(0, idx - 1)];
  return LEVELS_ORDER[Math.max(0, idx - 2)];
}

function gradeEvaluation(container, story, questions, state) {
  const qContainer = container.querySelector("#eval-questions");
  const cards = Array.from(qContainer.querySelectorAll(":scope > .card"));
  const dimensionResults = {};
  Object.keys(DIMENSION_LABELS).forEach(d => dimensionResults[d] = { correct: 0, total: 0 });

  questions.forEach((q, i) => {
    const card = cards[i];
    dimensionResults[q.dimension].total++;
    let ok = false;
    if (q.type === "mcq") {
      ok = state.answers[i] === q.answer;
      card.querySelectorAll(".opt-row").forEach((r, oi) => {
        r.style.outline = "";
        if (oi === q.answer) r.classList.add("correct");
        else if (oi === state.answers[i]) r.classList.add("wrong");
      });
    } else if (q.type === "fill-blank") {
      const input = card.querySelector(".fb-input");
      const val = (input.value || "").trim().toLowerCase();
      ok = val === q.answer.toLowerCase();
      card.querySelector(".q-feedback").innerHTML = ok ? `<span class="feedback-ok">✓ Correcto</span>` : `<span class="feedback-bad">✗ Respuesta esperada: "${esc(q.answer)}"</span>`;
    } else if (q.type === "short-answer") {
      const input = card.querySelector(".sa-input");
      const sim = similarityScore(input.value || "", q.answer);
      ok = sim >= 0.35;
      card.querySelector(".q-feedback").innerHTML = `<span class="${ok ? "feedback-ok" : "feedback-bad"}">${ok ? "✓ Aceptable" : "Revisa"} — Modelo: "${esc(q.answer)}"</span>`;
    } else if (q.type === "order") {
      const st = state.orderPools[i];
      const built = st.assembled.join(" ").toLowerCase();
      ok = built === q.answer.toLowerCase();
      card.querySelector(".q-feedback").innerHTML = ok ? `<span class="feedback-ok">✓ Correcto</span>` : `<span class="feedback-bad">✗ Orden incorrecto</span>`;
    } else if (q.type === "pronunciation") {
      const score = state.pronScores[i];
      ok = score !== undefined && score >= 60;
      const resultEl = card.querySelector(".mic-eval-result");
      resultEl.innerHTML += score !== undefined
        ? (ok ? ` <span class="feedback-ok">✓ Aprobado</span>` : ` <span class="feedback-bad">Sigue practicando</span>`)
        : ` <span class="feedback-bad">No practicaste esta frase — no cuenta como correcta</span>`;
    }
    if (ok) dimensionResults[q.dimension].correct++;
  });

  const totalCorrect = Object.values(dimensionResults).reduce((s, d) => s + d.correct, 0);
  const totalPct = Math.round((totalCorrect / questions.length) * 100);
  const dimPct = {};
  Object.entries(dimensionResults).forEach(([d, r]) => { dimPct[d] = r.total ? Math.round((r.correct / r.total) * 100) : 0; });

  recordStoryEvaluation(story.id, dimPct, totalPct);
  if (dimPct.vocabulary < 70) story.vocab.forEach(v => setWordStatus(v.en, "needs-review"));
  if (dimPct.grammar < 70) story.grammarFocus.forEach(g => setGrammarStatus(g.title, "needs-review"));
  else if (dimPct.grammar >= 85) story.grammarFocus.forEach(g => setGrammarStatus(g.title, "mastered"));

  renderEvalResults(container, story, dimPct, totalPct);
}

function renderEvalResults(container, story, dimPct, totalPct) {
  const strengths = Object.entries(dimPct).filter(([, v]) => v >= 80).map(([k]) => DIMENSION_LABELS[k]);
  const weaknesses = Object.entries(dimPct).filter(([, v]) => v < 70).map(([k]) => DIMENSION_LABELS[k]);
  const demonstrated = inferDemonstratedLevel(story.level, totalPct);
  const recs = [];
  if (dimPct.grammar < 70) recs.push(`Repasar: ${story.grammarFocus.map(g => g.title).join(", ")}`);
  if (dimPct.vocabulary < 70) recs.push(`Practicar las ${story.vocab.length} palabras de este cuento en Vocabulario`);
  if (dimPct.pronunciation < 70) recs.push("Repetir los ejercicios de pronunciación de esta lectura");
  if (dimPct.comprehension < 70) recs.push("Releer el cuento y repasar las preguntas de comprensión");
  recs.push("Conversar sobre esta lectura con el Tutor IA");

  let results = container.querySelector("#eval-results");
  results.innerHTML = `
    <div class="card">
      <h3>📊 Resultado de la evaluación</h3>
      <div class="grid-3">
        ${Object.entries(dimPct).map(([k, v]) => `
          <div class="stat-card">
            <div class="stat-num" style="font-size:22px;">${v}%</div>
            <div class="stat-label">${DIMENSION_LABELS[k]}</div>
          </div>`).join("")}
      </div>
      <div class="divider"></div>
      <div style="text-align:center;">
        <div class="stat-num">${totalPct}%</div>
        <div class="stat-label">TOTAL · Nivel demostrado: ${esc(demonstrated)}</div>
      </div>
      <div class="divider"></div>
      ${strengths.length ? `<p><strong>Fortalezas:</strong> ${strengths.map(s => `✓ ${esc(s)}`).join(" · ")}</p>` : ""}
      ${weaknesses.length ? `<p><strong>Necesitas mejorar:</strong> ${weaknesses.map(s => `⚠ ${esc(s)}`).join(" · ")}</p>` : ""}
      <p><strong>Recomendaciones:</strong></p>
      <ul>${recs.map(r => `<li>${esc(r)}</li>`).join("")}</ul>
      <div class="toolbar" style="margin-top:14px;">
        <button class="btn secondary" id="retry-eval">🔁 Repetir evaluación</button>
        <button class="btn" id="talk-story">💬 Conversar sobre esta lectura</button>
        <a href="#/stories/${story.id}" class="btn secondary">← Volver al cuento</a>
      </div>
    </div>`;
  results.scrollIntoView({ behavior: "smooth" });
  results.querySelector("#retry-eval").addEventListener("click", () => storyEvaluationView(container, story));
  results.querySelector("#talk-story").addEventListener("click", () => {
    setStoryContext({ id: story.id, title: story.title, area: story.area, summaryEs: story.summaryEs });
    location.hash = "#/tutor";
  });
}

function storyEvaluationView(container, story) {
  const questions = allEvaluationQuestions(story);
  const state = { answers: {}, orderPools: {}, pronScores: {} };
  questions.forEach((q, i) => {
    if (q.type === "order") state.orderPools[i] = { pool: q.text.split("/").map(s => s.trim()), assembled: [] };
  });

  container.innerHTML = `
    <a href="#/stories/${story.id}" class="btn ghost">← Volver al cuento</a>
    ${pageHeader(`Evaluación: ${story.title}`, "15 preguntas en 5 dimensiones. Responde todo y presiona Ver resultados.")}
    <div id="eval-questions"></div>
    <div class="card">
      <button class="btn" id="submit-eval" style="width:100%;">Ver resultados</button>
    </div>
    <div id="eval-results"></div>
  `;

  const qContainer = container.querySelector("#eval-questions");
  let currentDimension = null;
  questions.forEach((q, i) => {
    if (q.dimension !== currentDimension) {
      currentDimension = q.dimension;
      const h = document.createElement("h3");
      h.textContent = DIMENSION_LABELS[currentDimension];
      qContainer.appendChild(h);
    }
    qContainer.appendChild(renderEvalQuestion(q, i, state));
  });

  container.querySelector("#submit-eval").addEventListener("click", () => {
    gradeEvaluation(container, story, questions, state);
  });
}

// --------------------------------------------------------------- PROFILE --

export function profile(container) {
  const s = getSettings();
  const p = auth.getCurrentProfile();
  container.innerHTML = pageHeader("Mi perfil", "Tu cuenta, preferencias de aprendizaje y áreas de interés.") +
    `<div class="card">
      <h3>👤 Datos de la cuenta</h3>
      <div id="acc-err"></div>
      <div class="grid-2">
        <div class="field"><label>Nombre</label><input type="text" id="p-name" value="${esc(p?.name || "")}" /></div>
        <div class="field"><label>Correo electrónico</label><input type="text" id="p-email" value="${esc(p?.email || "")}" /></div>
      </div>
      <button class="btn secondary" id="save-account">Guardar datos</button>
    </div>

    <div class="card">
      <h3>🔒 Cambiar contraseña</h3>
      <div id="pwd-err"></div>
      <div class="grid-2">
        <div class="field"><label>Contraseña actual</label><div class="pw-wrap"><input type="password" id="old-pass" autocomplete="current-password" /><button type="button" class="pw-toggle" data-target="old-pass" tabindex="-1">👁</button></div></div>
        <div class="field"><label>Nueva contraseña</label><div class="pw-wrap"><input type="password" id="new-pass" autocomplete="new-password" /><button type="button" class="pw-toggle" data-target="new-pass" tabindex="-1">👁</button></div></div>
      </div>
      <button class="btn secondary" id="save-pass">Cambiar contraseña</button>
      <span id="pwd-status" class="small-muted" style="margin-left:10px;"></span>
    </div>

    <div class="card">
      <h3>🎯 Objetivos y nivel</h3>
      <div class="grid-2">
        <div class="field">
          <label>Nivel actual</label>
          <select id="level">${["A1", "A2", "A2+", "B1", "B1+", "B2"].map(l => `<option value="${l}" ${s.level === l ? "selected" : ""}>${l}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Minutos disponibles al día</label><input type="number" id="goal" value="${s.goalMinutesPerDay}" min="5" max="120" /></div>
      </div>
      <div class="field"><label>Objetivo de aprendizaje</label><input type="text" id="learningGoal" value="${esc(s.learningGoal || "")}" placeholder="Ej: comunicarme mejor en reuniones de trabajo" /></div>
      <button class="btn secondary" id="save-learning">Guardar</button>
    </div>

    <div class="card">
      <div class="toolbar" style="justify-content:space-between; align-items:center;">
        <h3 style="margin:0;">🔊 Voz del narrador</h3>
        <button type="button" class="btn secondary sm" id="voice-refresh">🔄 Actualizar lista</button>
      </div>
      <p class="small-muted">Elige qué voz se usa para todas las pronunciaciones de la app (lecturas, cuentos, conversaciones, vocabulario y el tutor IA). Las voces disponibles dependen de tu navegador y sistema operativo.</p>
      <div id="voice-picker"><p class="small-muted">Cargando voces disponibles del navegador…</p></div>
    </div>

    <div class="card">
      <h3>⭐ Áreas de interés</h3>
      <p class="small-muted">Se usan para personalizar tus recomendaciones diarias. Igual puedes acceder a todas las áreas cuando quieras.</p>
      ${AREAS.map(a => `
        <label style="display:flex; align-items:center; gap:8px; font-weight:400; margin:6px 0;">
          <input type="checkbox" class="interest-cb" value="${a.id}" ${(s.interestAreas || []).includes(a.id) ? "checked" : ""} />
          ${a.icon} ${esc(a.name)} <span class="small-muted">— ${esc(a.description)}</span>
        </label>
      `).join("")}
      <button class="btn secondary" id="save-interests">Guardar áreas de interés</button>
    </div>

    <div class="card">
      <h3>🤖 Tutor de IA (opcional)</h3>
      <p class="small-muted">Para habilitar el análisis de frases con IA y el chat de conversación, ingresa tu propia API key de Anthropic. Se guarda únicamente en el almacenamiento local de este navegador — nunca se comparte con nadie más.</p>
      <div class="field">
        <label>API key de Anthropic</label>
        <input type="password" id="api-key" value="${esc(s.apiKey)}" placeholder="sk-ant-..." />
      </div>
      <div class="field">
        <label>Modelo</label>
        <select id="model">
          <option value="claude-sonnet-5" ${s.model === "claude-sonnet-5" ? "selected" : ""}>Claude Sonnet 5</option>
          <option value="claude-opus-5" ${s.model === "claude-opus-5" ? "selected" : ""}>Claude Opus 5</option>
          <option value="claude-haiku-4-5-20251001" ${s.model === "claude-haiku-4-5-20251001" ? "selected" : ""}>Claude Haiku 4.5</option>
        </select>
      </div>
      <button class="btn" id="save-key">Guardar</button>
      <span id="save-status" class="small-muted" style="margin-left:10px;"></span>
    </div>

    <div class="card">
      <h3>💾 Respaldo de tu cuenta</h3>
      <p class="small-muted">Este navegador guarda tu cuenta localmente. Descarga un respaldo para restaurarla en otro navegador o dispositivo (o si borras los datos del sitio).</p>
      <div class="toolbar">
        <button class="btn secondary" id="export-btn">Descargar respaldo</button>
        <label class="btn secondary" style="cursor:pointer;">Importar respaldo<input type="file" id="import-file" accept="application/json" style="display:none;" /></label>
      </div>
      <p id="import-status" class="small-muted"></p>
    </div>

    <div class="card">
      <h3>Datos</h3>
      <button class="btn secondary" id="reset-progress">Borrar mi progreso de aprendizaje</button>
      <p class="hint">Elimina tu glosario, historial de ejercicios y racha. No borra tu cuenta ni tu contraseña. No se puede deshacer.</p>
    </div>`;

  const voicePickerEl = container.querySelector("#voice-picker");
  onVoicesReady(() => renderVoicePicker(voicePickerEl));
  container.querySelector("#voice-refresh").addEventListener("click", () => renderVoicePicker(voicePickerEl));

  container.querySelectorAll(".pw-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = container.querySelector(`#${btn.dataset.target}`);
      const willShow = input.type === "password";
      input.type = willShow ? "text" : "password";
      btn.textContent = willShow ? "🙈" : "👁";
    });
  });

  container.querySelector("#save-account").addEventListener("click", () => {
    try {
      auth.updateProfileInfo(p.id, { name: container.querySelector("#p-name").value, email: container.querySelector("#p-email").value });
      container.querySelector("#acc-err").innerHTML = `<p class="feedback-ok">Guardado ✓</p>`;
    } catch (err) {
      container.querySelector("#acc-err").innerHTML = `<p class="feedback-bad">${esc(err.message)}</p>`;
    }
  });

  container.querySelector("#save-pass").addEventListener("click", async () => {
    try {
      await auth.changePassword(p.id, container.querySelector("#old-pass").value, container.querySelector("#new-pass").value);
      container.querySelector("#old-pass").value = "";
      container.querySelector("#new-pass").value = "";
      container.querySelector("#pwd-status").textContent = "Contraseña actualizada ✓";
      setTimeout(() => container.querySelector("#pwd-status").textContent = "", 2500);
    } catch (err) {
      container.querySelector("#pwd-err").innerHTML = `<p class="feedback-bad">${esc(err.message)}</p>`;
    }
  });

  container.querySelector("#save-learning").addEventListener("click", () => {
    updateSettings({
      level: container.querySelector("#level").value,
      goalMinutesPerDay: +container.querySelector("#goal").value,
      learningGoal: container.querySelector("#learningGoal").value
    });
    alert("Guardado");
  });

  container.querySelector("#save-interests").addEventListener("click", () => {
    const interestAreas = Array.from(container.querySelectorAll(".interest-cb:checked")).map(cb => cb.value);
    updateSettings({ interestAreas: interestAreas.length ? interestAreas : ["proyectos"] });
    alert("Áreas de interés guardadas");
  });

  container.querySelector("#save-key").addEventListener("click", () => {
    updateSettings({ apiKey: container.querySelector("#api-key").value.trim(), model: container.querySelector("#model").value });
    container.querySelector("#save-status").textContent = "Guardado ✓";
    setTimeout(() => container.querySelector("#save-status").textContent = "", 2000);
  });

  container.querySelector("#export-btn").addEventListener("click", () => {
    const raw = auth.exportProfileRaw(p.id);
    const backup = { profile: raw, state: rawStateSnapshot() };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `technical-english-coach-backup-${p.email}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  container.querySelector("#import-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const backup = JSON.parse(reader.result);
        const restored = auth.importProfileRaw(backup.profile);
        restoreStateSnapshot(backup.state);
        container.querySelector("#import-status").innerHTML = `<span class="feedback-ok">Respaldo restaurado para ${esc(restored.email)}. Recargando…</span>`;
        setTimeout(() => location.reload(), 1200);
      } catch (err) {
        container.querySelector("#import-status").innerHTML = `<span class="feedback-bad">${esc(err.message || "No se pudo leer el archivo de respaldo.")}</span>`;
      }
    };
    reader.readAsText(file);
  });

  container.querySelector("#reset-progress").addEventListener("click", () => {
    if (confirm("¿Seguro que quieres borrar tu progreso de aprendizaje? Tu cuenta y contraseña no se verán afectadas.")) {
      resetAllProgress();
      profile(container);
    }
  });
}
