// Progressive unlocking, derived entirely from state already tracked in store.js
// (exercise attempts, story evaluations) — no new persisted fields, no database.
// Everything here is a pure function of the existing per-profile localStorage state,
// so it's automatically persistent and automatically resets with "Borrar mi progreso".

import { getState } from "./store.js";
import { UNITS, unitsByArea } from "../data/content.js";
import { STORIES } from "../data/stories.js";

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];

// Unlock thresholds for whole nav sections (in # of distinct units the user has
// attempted exercises for, across any area). Easy to retune in one place.
const SECTION_UNLOCK_AT = { grammar: 1, verbs: 2 };

export function isUnitAttempted(unitId) {
  return getState().exercises.some(e => e.unit === unitId);
}

// A unit unlocks once the previous unit *in the same area* has been attempted
// (any exercise submitted for it, regardless of score). The first unit in each
// area is always open.
export function isUnitUnlocked(unitId) {
  const unit = UNITS.find(u => u.id === unitId);
  if (!unit) return true;
  const siblings = unitsByArea(unit.area);
  const idx = siblings.findIndex(u => u.id === unitId);
  if (idx <= 0) return true;
  return isUnitAttempted(siblings[idx - 1].id);
}

export function unitUnlockHint(unitId) {
  const unit = UNITS.find(u => u.id === unitId);
  if (!unit) return "";
  const siblings = unitsByArea(unit.area);
  const idx = siblings.findIndex(u => u.id === unitId);
  const prev = siblings[idx - 1];
  return prev ? `Completa los ejercicios de "${prev.title}" para desbloquear esta unidad.` : "";
}

export function isStoryAttempted(storyId) {
  return getState().storyEvaluations.some(e => e.storyId === storyId);
}

// A story unlocks once the previous CEFR level's story *in the same area* has
// been evaluated at least once. A1 stories are always open.
export function isStoryUnlocked(story) {
  const levelIdx = LEVEL_ORDER.indexOf(story.level);
  if (levelIdx <= 0) return true;
  const prevLevel = LEVEL_ORDER[levelIdx - 1];
  const prevStory = STORIES.find(s => s.area === story.area && s.level === prevLevel);
  if (!prevStory) return true; // no earlier level exists for this area -- fail open
  return isStoryAttempted(prevStory.id);
}

export function storyUnlockHint(story) {
  const levelIdx = LEVEL_ORDER.indexOf(story.level);
  const prevLevel = LEVEL_ORDER[levelIdx - 1];
  return prevLevel ? `Completa la evaluación del cuento de nivel ${prevLevel} de esta área para desbloquear ${story.level}.` : "";
}

export function totalUnitsAttempted() {
  return new Set(getState().exercises.map(e => e.unit)).size;
}

export function isSectionUnlocked(route) {
  const need = SECTION_UNLOCK_AT[route];
  return need == null || totalUnitsAttempted() >= need;
}

export function sectionUnlockHint(route) {
  const need = SECTION_UNLOCK_AT[route];
  if (need == null) return "";
  return `Completa los ejercicios de ${need} unidad${need === 1 ? "" : "es"} (de cualquier área) para desbloquear esta sección.`;
}
