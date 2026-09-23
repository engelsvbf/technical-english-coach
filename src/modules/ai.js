// Client for the Anthropic Messages API, called directly from the browser using the
// user's own API key (stored only in this browser's localStorage — never sent anywhere
// else, and never seen by anyone but you and Anthropic).

import { getSettings } from "./store.js";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

export class AIError extends Error {}

export function hasApiKey() {
  return !!(getSettings().apiKey && getSettings().apiKey.trim());
}

async function callClaude({ system, messages, maxTokens = 1024 }) {
  const settings = getSettings();
  if (!settings.apiKey) {
    throw new AIError("No API key configured. Go to Settings (⚙) and add your Anthropic API key.");
  }
  let res;
  try {
    res = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": settings.apiKey.trim(),
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: settings.model || "claude-sonnet-5",
        max_tokens: maxTokens,
        system,
        messages
      })
    });
  } catch (networkErr) {
    throw new AIError("Network error calling the AI service. Check your connection.");
  }

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.error?.message || JSON.stringify(body);
    } catch (e) {
      detail = res.statusText;
    }
    throw new AIError(`AI request failed (${res.status}): ${detail}`);
  }

  const data = await res.json();
  const text = (data.content || []).map(b => b.text || "").join("\n").trim();
  return text;
}

function tryParseJSON(text) {
  // The model sometimes wraps JSON in ```json fences — strip those first.
  const cleaned = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    return null;
  }
}

// --- Structured "analyze this sentence/phrase" call for the Reading module ----

export async function analyzeText(selection, { level, context } = {}) {
  const system = `You are an English teacher for Spanish-speaking students who work in a technical/QA role (incidents, Jira, vendor follow-up, technical meetings). Student level: ${level || "A2"}. Always answer with a single JSON object, no prose outside the JSON, using this exact shape:
{
  "translation": "Spanish translation",
  "meaning_in_context": "brief explanation in Spanish of what it means here",
  "pronunciation": {"ipa": "IPA if easy to produce, else empty string", "simplified": "simple Spanish-friendly phonetic hint"},
  "breakdown": "short breakdown of the sentence/phrase structure, in Spanish",
  "grammar": ["short bullet(s) in Spanish naming the grammar rule(s) used"],
  "examples": ["two or three additional English example sentences using the same structure"]
}`;
  const userMsg = `Text to analyze: "${selection}"${context ? `\nSurrounding context: "${context}"` : ""}`;
  const text = await callClaude({ system, messages: [{ role: "user", content: userMsg }], maxTokens: 700 });
  return tryParseJSON(text) || { translation: text, meaning_in_context: "", pronunciation: {}, breakdown: "", grammar: [], examples: [] };
}

// --- Grammar explainer (used from the Grammar module "Ask AI" button) --------

export async function explainGrammarPoint(title, level) {
  const system = `You are an English teacher for Spanish-speaking technical/QA professionals. Student level: ${level || "A2"}. Explain the grammar point requested following this order: qué es la regla → cómo funciona → por qué se usa → cómo se pronuncia (si aplica) → 3 ejemplos de trabajo (QA/Jira/incidentes) → 2 mini ejercicios con respuesta. Reply in Spanish with English examples, plain text (no markdown headers), concise.`;
  return callClaude({ system, messages: [{ role: "user", content: `Explain: ${title}` }], maxTokens: 900 });
}

// --- Live conversation tutor ---------------------------------------------------

export async function tutorReply(history, userMessage, { level, storyContext } = {}) {
  const system = `You are a friendly, encouraging English conversation tutor for a Spanish-speaking professional in a QA/technical role. Student level: ${level || "A2"}.
Rules:
- Speak mostly in English, adjusted to the student's level.
- Keep the conversation flowing naturally — do not interrupt every sentence with corrections.
- When the student makes an error, weave a brief, gentle correction into your reply (not a lecture), and occasionally add one line starting with "💡 Tip:" explaining WHY, in Spanish, only when it teaches something useful.
- Prefer topics related to their work: incidents, Jira, QA, technical meetings, vendor follow-up.
- Gradually introduce new vocabulary related to their work context.
- Keep replies short (2-5 sentences) so the conversation stays natural.${storyContext ? `

The student just finished reading a short story titled "${storyContext.title}" (summary: ${storyContext.summaryEs}). Since this is the start of the conversation, open by asking an engaging opinion or comprehension question about that story (in English, adapted to their level), and keep discussing it naturally as they respond.` : ""}`;
  const messages = [
    ...history.slice(-16).map(m => ({ role: m.role, content: m.content })),
    { role: "user", content: userMessage }
  ];
  return callClaude({ system, messages, maxTokens: 500 });
}

export async function pronunciationFeedback(targetText, spokenText, level) {
  const system = `You are an English pronunciation coach for a Spanish-speaking student, level ${level || "A2"}. The student tried to say a target sentence; speech recognition produced a transcript that may be imperfect. Give short, encouraging feedback in Spanish (3-5 lines max): what likely went well, what to watch for (sounds, stress, articles, endings), and one tip to practice. Do not repeat the full target sentence back verbatim more than once.`;
  const userMsg = `Target: "${targetText}"\nTranscribed speech: "${spokenText}"`;
  return callClaude({ system, messages: [{ role: "user", content: userMsg }], maxTokens: 400 });
}
