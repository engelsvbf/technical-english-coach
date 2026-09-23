// Per-profile persistent state — everything lives in this browser's localStorage,
// namespaced by the currently logged-in local profile so progress never mixes
// between users of the same browser.

function keyFor(profileId) {
  return `etc_state_v1_${profileId}`;
}

function defaultState() {
  return {
    settings: {
      apiKey: "",
      apiProvider: "anthropic",
      model: "claude-sonnet-5",
      level: "A2",
      learningGoal: "",
      voiceRate: 0.95,
      goalMinutesPerDay: 20,
      interestAreas: ["proyectos"]
    },
    words: {},        // en -> { status, interval, dueAt, correct, wrong, lastSeen }
    grammar: {},       // "unit-title" -> { status }
    exercises: [],     // log of attempts { id, unit, correct, total, ts }
    studyLog: [],      // { ts, minutes, activity }
    conversationHistory: [], // AI tutor chat log (short)
    streak: { count: 0, lastDay: null },
    storyEvaluations: [],   // { storyId, scores: {comprehension,vocabulary,grammar,pronunciation,expressions}, total, ts }
    lastStoryContext: null  // { id, title, area, summaryEs } — used to seed an AI Tutor conversation
  };
}

let state = defaultState();
let currentProfileId = null;

export function initForProfile(profileId) {
  currentProfileId = profileId;
  state = load();
  return state;
}

export function clearActiveProfile() {
  currentProfileId = null;
  state = defaultState();
}

function load() {
  if (!currentProfileId) return defaultState();
  try {
    const raw = localStorage.getItem(keyFor(currentProfileId));
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed, settings: { ...defaultState().settings, ...(parsed.settings || {}) } };
  } catch (e) {
    return defaultState();
  }
}

function save() {
  if (!currentProfileId) return;
  try {
    localStorage.setItem(keyFor(currentProfileId), JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save state", e);
  }
}

export function getState() {
  return state;
}

export function getSettings() {
  return state.settings;
}

export function updateSettings(patch) {
  state.settings = { ...state.settings, ...patch };
  save();
}

// --- Spaced repetition (SM-2 lite) ---------------------------------------

const INTERVALS = [1, 2, 4, 8, 16, 32]; // days

export function getWord(en) {
  return state.words[en.toLowerCase()];
}

export function touchWord(en, es) {
  const key = en.toLowerCase();
  if (!state.words[key]) {
    state.words[key] = { en, es, status: "new", intervalIdx: 0, dueAt: Date.now(), correct: 0, wrong: 0, lastSeen: Date.now() };
    save();
  }
  return state.words[key];
}

export function setWordStatus(en, status) {
  const w = touchWord(en);
  w.status = status;
  w.lastSeen = Date.now();
  save();
}

export function reviewWord(en, wasCorrect) {
  const w = touchWord(en);
  w.lastSeen = Date.now();
  if (wasCorrect) {
    w.correct += 1;
    w.intervalIdx = Math.min(w.intervalIdx + 1, INTERVALS.length - 1);
    w.status = w.intervalIdx >= 2 ? "learned" : "learning";
  } else {
    w.wrong += 1;
    w.intervalIdx = 0;
    w.status = "needs-review";
  }
  const days = INTERVALS[w.intervalIdx];
  w.dueAt = Date.now() + days * 24 * 60 * 60 * 1000;
  save();
  return w;
}

export function dueWords(vocabList) {
  const now = Date.now();
  return vocabList.filter(v => {
    const w = state.words[v.en.toLowerCase()];
    return !w || w.dueAt <= now;
  });
}

export function allTrackedWords() {
  return Object.values(state.words);
}

// --- Exercises -------------------------------------------------------------

export function logExerciseAttempt(unitId, exerciseId, correctCount, totalCount) {
  state.exercises.push({ unit: unitId, id: exerciseId, correct: correctCount, total: totalCount, ts: Date.now() });
  bumpStreak();
  save();
}

export function exerciseStats() {
  const attempts = state.exercises;
  const totalCorrect = attempts.reduce((s, a) => s + a.correct, 0);
  const totalItems = attempts.reduce((s, a) => s + a.total, 0);
  return {
    attempts: attempts.length,
    totalCorrect,
    totalItems,
    accuracy: totalItems ? Math.round((totalCorrect / totalItems) * 100) : 0
  };
}

// --- Grammar mastery (per rule title) ---------------------------------------

export function setGrammarStatus(title, status) {
  state.grammar[title] = { status, lastSeen: Date.now() };
  save();
}

export function getGrammarStatus(title) {
  return state.grammar[title]?.status || "new";
}

// --- Story evaluations -------------------------------------------------------

export function recordStoryEvaluation(storyId, scores, total) {
  state.storyEvaluations.push({ storyId, scores, total, ts: Date.now() });
  bumpStreak();
  save();
}

export function storyEvaluationsFor(storyId) {
  return state.storyEvaluations.filter(e => e.storyId === storyId);
}

export function allStoryEvaluations() {
  return state.storyEvaluations;
}

export function setStoryContext(ctx) {
  state.lastStoryContext = ctx;
  save();
}

export function getStoryContext() {
  return state.lastStoryContext;
}

export function clearStoryContext() {
  state.lastStoryContext = null;
  save();
}

// --- Study log / streak -----------------------------------------------------

export function logStudyMinutes(minutes, activity) {
  state.studyLog.push({ ts: Date.now(), minutes, activity });
  bumpStreak();
  save();
}

function dayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function bumpStreak() {
  const today = dayKey(Date.now());
  if (state.streak.lastDay === today) return;
  const yesterday = dayKey(Date.now() - 24 * 60 * 60 * 1000);
  if (state.streak.lastDay === yesterday) {
    state.streak.count += 1;
  } else {
    state.streak.count = 1;
  }
  state.streak.lastDay = today;
}

export function totalStudyMinutes() {
  return state.studyLog.reduce((s, l) => s + l.minutes, 0);
}

// --- AI tutor chat history (kept short) -------------------------------------

export function pushChatMessage(role, content) {
  state.conversationHistory.push({ role, content, ts: Date.now() });
  if (state.conversationHistory.length > 40) {
    state.conversationHistory = state.conversationHistory.slice(-40);
  }
  save();
}

export function getChatHistory() {
  return state.conversationHistory;
}

export function clearChatHistory() {
  state.conversationHistory = [];
  save();
}

export function resetAllProgress() {
  state = defaultState();
  save();
}

// --- Backup / restore (used by the profile export/import feature) -----------

export function rawStateSnapshot() {
  return state;
}

export function restoreStateSnapshot(snapshot) {
  state = { ...defaultState(), ...snapshot, settings: { ...defaultState().settings, ...(snapshot?.settings || {}) } };
  save();
}
