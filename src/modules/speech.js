// Thin wrapper around the browser's native Web Speech API (no external services, no API key).

let voices = [];
const voicesReadyListeners = [];
function loadVoices() {
  voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  if (voices.length) {
    voicesReadyListeners.splice(0).forEach(cb => cb());
  }
}
if (window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

// Call back once the browser has actually populated its voice list (it's often
// empty for a moment after page load, especially for Windows/Edge neural voices).
// If voices are already loaded, fires immediately.
export function onVoicesReady(cb) {
  if (voices.length) { cb(); return; }
  voicesReadyListeners.push(cb);
}

// --- Narrator voice preference --------------------------------------------
// Persisted app-wide (not per profile) so the choice survives even before a
// profile's own settings are loaded. Any en-* voice reported by the browser
// can be picked; how many that ends up being depends entirely on the OS/browser
// (Windows + Edge typically exposes a couple dozen English neural voices).
const VOICE_KEY = "etc_voice_pref_v1";
function loadPreferredVoiceURI() {
  try { return localStorage.getItem(VOICE_KEY) || ""; } catch (e) { return ""; }
}
let preferredVoiceURI = loadPreferredVoiceURI();

export function setPreferredVoice(voiceURI) {
  preferredVoiceURI = voiceURI || "";
  try {
    if (preferredVoiceURI) localStorage.setItem(VOICE_KEY, preferredVoiceURI);
    else localStorage.removeItem(VOICE_KEY);
  } catch (e) { /* ignore */ }
}

export function getPreferredVoiceURI() {
  return preferredVoiceURI;
}

const FEMALE_NAME_HINTS = [
  "zira", "jenny", "aria", "sara", "nancy", "amber", "ana", "michelle", "emma", "sonia",
  "libby", "hazel", "susan", "female", "samantha", "victoria", "karen", "moira", "tessa",
  "fiona", "kate", "salli", "joanna", "ivy", "kimberly", "olivia", "natasha", "catherine",
  "maisie", "allison", "ava", "serena", "nicky", "zoe", "sarah", "clara", "emily", "elizabeth"
];
const MALE_NAME_HINTS = [
  "david", "mark", "guy", "christopher", "eric", "roger", "tony", "steffan", "brandon",
  "justin", "male", "daniel", "james", "alex", "fred", "george", "matthew", "ryan", "brian",
  "liam", "oliver", "thomas", "arthur", "joey", "aaron", "gordon", "kevin", "nathan",
  "russell", "sean", "tom", "andrew", "william", "nathan", "gabriel"
];

function guessVoiceGender(name) {
  const n = name.toLowerCase();
  if (FEMALE_NAME_HINTS.some(h => n.includes(h))) return "female";
  if (MALE_NAME_HINTS.some(h => n.includes(h))) return "male";
  return "unknown";
}

// Every distinct English voice the browser reports, with a best-effort gender
// guess (from the voice's name — the Web Speech API doesn't expose gender
// directly) so the picker can group them as Femeninas / Masculinas / Otras.
export function listEnglishVoices() {
  const seen = new Set();
  return voices
    .filter(v => v.lang && v.lang.toLowerCase().startsWith("en"))
    .filter(v => {
      if (seen.has(v.voiceURI)) return false;
      seen.add(v.voiceURI);
      return true;
    })
    .map(v => ({ voiceURI: v.voiceURI, name: v.name, lang: v.lang, gender: guessVoiceGender(v.name) }))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
}

function pickEnglishVoice(overrideVoiceURI) {
  const uri = overrideVoiceURI || preferredVoiceURI;
  if (uri) {
    const match = voices.find(v => v.voiceURI === uri);
    if (match) return match;
  }
  return voices.find(v => v.lang === "en-US") || voices.find(v => v.lang && v.lang.startsWith("en")) || null;
}

// --- Self-calibrating speaking pace --------------------------------------
// Different system voices (especially Windows/SAPI voices in Chrome/Edge) speak
// at very different real-world paces even at the same `rate` setting. Rather
// than guess one fixed number forever, we time each utterance's actual start-to-end
// duration and use it to refine a per-rate "characters per second" estimate,
// persisted in this browser so the estimated fallback highlighter gets more
// accurate the more it's used.
const CAL_KEY = "etc_speech_calibration_v1";
function loadCalibration() {
  try { return JSON.parse(localStorage.getItem(CAL_KEY) || "{}"); } catch (e) { return {}; }
}
function saveCalibration(cal) {
  try { localStorage.setItem(CAL_KEY, JSON.stringify(cal)); } catch (e) { /* ignore */ }
}
let rateCalibration = loadCalibration();

function getCharsPerSecond(rate) {
  const key = String(rate);
  const cal = rateCalibration[key];
  if (cal && cal.samples > 0) return cal.cps;
  return 14 * rate; // initial heuristic guess (~150 words/min at rate 1)
}

function recordCalibration(rate, charCount, elapsedMs) {
  if (elapsedMs < 400 || charCount < 8) return; // ignore too-short/noisy samples
  const key = String(rate);
  const cps = charCount / (elapsedMs / 1000);
  const cal = rateCalibration[key] || { cps, samples: 0 };
  const weight = Math.min(cal.samples, 5); // cap how much history dominates a new sample
  cal.cps = (cal.cps * weight + cps) / (weight + 1);
  cal.samples += 1;
  rateCalibration[key] = cal;
  saveCalibration(rateCalibration);
}

export function ttsSupported() {
  return "speechSynthesis" in window;
}

export function speak(text, rate = 0.95, volume = 1, voiceURI = null) {
  if (!ttsSupported() || !text) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const voice = pickEnglishVoice(voiceURI);
  if (voice) utter.voice = voice;
  utter.lang = "en-US";
  utter.rate = rate;
  utter.volume = volume;
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (ttsSupported()) window.speechSynthesis.cancel();
}

// --- Playback speed -----------------------------------------------------
// SpeechSynthesisUtterance.rate changes speed without affecting pitch, so this
// covers the "speed without changing tone of voice" requirement natively.

export const PLAYBACK_RATES = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

export const RATE_PRESETS = { "very-slow": 0.5, slow: 0.75, normal: 1.0 };

const LEVEL_RATE_HINTS = {
  A1: [0.5, 0.75],
  A2: [0.75, 1.0],
  "A2+": [0.75, 1.0],
  B1: [0.75, 1.0, 1.25],
  "B1+": [0.75, 1.0, 1.25],
  B2: [1.0, 1.25, 1.5],
  C1: [1.0, 1.25, 1.5, 2.0]
};

export function recommendedRates(level) {
  return LEVEL_RATE_HINTS[level] || LEVEL_RATE_HINTS.A2;
}

// --- Synchronized word-highlight playback -----------------------------------
// The Web Speech API does not hand us pre-computed word timestamps the way a
// server-side TTS engine would. Instead we use the utterance's live "boundary"
// event (fired as each word starts) to highlight words in real time as they're
// actually spoken — no backend, no pre-generated timing file required.

export function tokenizeWithOffsets(text) {
  const words = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(text))) {
    words.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  }
  return words;
}

// The Web Speech API's 'boundary' event (word-level timing) is unreliable across
// browsers/voices — on many Windows/SAPI voices it never fires at all, and on
// others it fires in a burst that isn't really tied to real audio timing. A
// single estimate spanning an entire long text also drifts more and more out
// of sync as it goes, with nothing to correct it.
//
// Instead, we split the text into chunks and speak each chunk as its OWN
// utterance. Every chunk's genuine 'onstart' event is a real, reliable timing
// checkpoint — so estimation error can never accumulate past a single chunk
// before it's corrected again. Within a chunk we still estimate individual
// word timing (rate + word length + a calibrated characters-per-second figure
// for this voice), so a little drift (at most a word or so) can show up near
// the end of a chunk.
//
// Chunks are whole SENTENCES, not arbitrary word groups: splitting mid-sentence
// makes the TTS engine re-plan intonation from a fragment instead of the full
// sentence, which sounds noticeably more robotic (flat/rising pitch in the
// wrong places). A short, evenly-timed highlight lag within one sentence is a
// much smaller problem than broken prosody, so we only force a break earlier
// than the next '.', '!' or '?' as a safety net for runaway sentences that
// have gone unusually long with no punctuation.
const SENTENCE_SOFT_BREAK = 25; // prefer breaking at a comma/semicolon past this length
const SENTENCE_HARD_BREAK = 40; // break anywhere past this length, no matter what

function chunkWordIndexes(words) {
  const chunks = [];
  let current = [];
  words.forEach((w, i) => {
    current.push(i);
    const endsSentence = /[.!?]$/.test(w.text);
    const endsClause = /[,;:]$/.test(w.text);
    if (endsSentence) {
      chunks.push(current);
      current = [];
    } else if (current.length >= SENTENCE_SOFT_BREAK && endsClause) {
      chunks.push(current);
      current = [];
    } else if (current.length >= SENTENCE_HARD_BREAK) {
      chunks.push(current);
      current = [];
    }
  });
  if (current.length) chunks.push(current);
  return chunks;
}

export function speakSynced(text, { rate = 0.95, volume = 1, startWordIndex = 0, onWord, onStart, onEnd, onError } = {}) {
  if (!ttsSupported() || !text) {
    onError && onError(new Error("La síntesis de voz no está disponible en este navegador."));
    return null;
  }
  window.speechSynthesis.cancel();

  const words = tokenizeWithOffsets(text);
  const chunks = chunkWordIndexes(words);
  if (!chunks.length) {
    onEnd && onEnd(-1);
    return { words, pause() {}, resume() {}, cancel() {}, lastWordIndex: -1, isEstimated: true };
  }

  let startChunk = chunks.findIndex(idxs => idxs[idxs.length - 1] >= startWordIndex);
  if (startChunk === -1) startChunk = 0;

  const state = {
    cancelled: false,
    paused: false,
    currentIdx: startWordIndex - 1,
    chunkIndex: startChunk,
    pointer: 0,
    timer: null,
    remainingMs: 0,
    tickStarted: 0,
    utterStartedAt: 0
  };

  function fireWord(idx) {
    if (idx !== -1 && idx !== state.currentIdx) {
      state.currentIdx = idx;
      onWord && onWord(idx, words[idx]);
    }
  }

  function estimatedWordDuration(word) {
    const cps = getCharsPerSecond(rate);
    let dur = Math.max(150, (word.text.length + 1) / cps * 1000);
    if (/[.!?]$/.test(word.text)) dur += 280 / rate;       // natural pause at sentence end
    else if (/[,;:]$/.test(word.text)) dur += 140 / rate;  // shorter pause at clause breaks
    return dur;
  }

  function scheduleNextWord() {
    if (state.cancelled || state.paused) return;
    const idxs = chunks[state.chunkIndex];
    if (!idxs || state.pointer >= idxs.length) return;
    const dur = state.remainingMs > 0 ? state.remainingMs : estimatedWordDuration(words[idxs[state.pointer]]);
    state.remainingMs = 0;
    state.tickStarted = Date.now();
    state.timer = setTimeout(() => {
      if (state.cancelled) return;
      fireWord(idxs[state.pointer]);
      state.pointer++;
      scheduleNextWord();
    }, dur);
  }

  function speakChunk() {
    if (state.cancelled) return;
    if (state.chunkIndex >= chunks.length) {
      onEnd && onEnd(state.currentIdx);
      return;
    }
    const idxs = chunks[state.chunkIndex];
    const chunkText = idxs.map(i => words[i].text).join(" ");
    const utter = new SpeechSynthesisUtterance(chunkText);
    const voice = pickEnglishVoice();
    if (voice) utter.voice = voice;
    utter.lang = "en-US";
    utter.rate = rate;
    utter.volume = volume;

    utter.onstart = () => {
      if (state.chunkIndex === startChunk) onStart && onStart();
      state.utterStartedAt = Date.now();
      state.pointer = 0;
      fireWord(idxs[0]);
      state.pointer = 1;
      scheduleNextWord();
    };
    utter.onend = () => {
      if (state.timer) clearTimeout(state.timer);
      if (state.cancelled) return;
      recordCalibration(rate, chunkText.length, Date.now() - state.utterStartedAt);
      state.chunkIndex++;
      speakChunk();
    };
    utter.onerror = (e) => {
      if (state.timer) clearTimeout(state.timer);
      if (e.error === "canceled" || e.error === "interrupted") return;
      onError && onError(new Error(e.error || "Error de síntesis de voz."));
    };
    window.speechSynthesis.speak(utter);
  }

  speakChunk();

  return {
    words,
    pause: () => {
      state.paused = true;
      if (state.timer) {
        clearTimeout(state.timer);
        const idxs = chunks[state.chunkIndex];
        const w = idxs && idxs[state.pointer] !== undefined ? words[idxs[state.pointer]] : null;
        state.remainingMs = w ? Math.max(0, estimatedWordDuration(w) - (Date.now() - state.tickStarted)) : 0;
        state.timer = null;
      }
      window.speechSynthesis.pause();
    },
    resume: () => {
      state.paused = false;
      window.speechSynthesis.resume();
      scheduleNextWord();
    },
    cancel: () => {
      state.cancelled = true;
      if (state.timer) clearTimeout(state.timer);
      window.speechSynthesis.cancel();
    },
    get lastWordIndex() { return state.currentIdx; },
    get isEstimated() { return true; }
  };
}

// --- Speech recognition (Speak & Compare) -----------------------------------

const SpeechRecognitionImpl = window.SpeechRecognition || window.webkitSpeechRecognition;

export function sttSupported() {
  return !!SpeechRecognitionImpl;
}

export function listenOnce({ onResult, onError, onEnd }) {
  if (!sttSupported()) {
    onError && onError(new Error("Speech recognition is not supported in this browser. Try Chrome or Edge."));
    return null;
  }
  const rec = new SpeechRecognitionImpl();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult && onResult(transcript);
  };
  rec.onerror = (event) => {
    onError && onError(new Error(event.error || "Speech recognition error"));
  };
  rec.onend = () => {
    onEnd && onEnd();
  };
  rec.start();
  return rec;
}

// Simple word-level comparison for "Speak and compare" pronunciation practice.
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[.,!?;:"']/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function compareSpeech(targetText, spokenText) {
  const target = normalize(targetText);
  const spoken = normalize(spokenText);
  const spokenSet = [...spoken];
  const results = target.map(word => {
    const idx = spokenSet.indexOf(word);
    if (idx !== -1) {
      spokenSet.splice(idx, 1);
      return { word, match: true };
    }
    return { word, match: false };
  });
  const matched = results.filter(r => r.match).length;
  const score = target.length ? Math.round((matched / target.length) * 100) : 0;
  return { results, score, spokenText };
}
