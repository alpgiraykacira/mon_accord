// ═══════════════════════════════════════════════════════════════
// MON ACCORD — AI Engine
//
// Production: Calls the Cloudflare Worker proxy (VITE_PROXY_URL).
//   → API key lives only in Cloudflare — never in the bundle.
//
// Local dev fallback: If VITE_PROXY_URL is not set, falls back to
//   a direct Gemini call using the key stored in localStorage
//   (set via Settings modal).
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';

const PROXY_URL    = import.meta.env.VITE_PROXY_URL;    // Cloudflare Worker URL
const WORKER_TOKEN = import.meta.env.VITE_WORKER_TOKEN; // Shared token for worker auth
const GEMINI_BASE  = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL       = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `You are Mon Accord's AI Perfume Advisor — a world-class fragrance expert specializing in scent layering and olfactory profiling.

You work with Mon Accord's exclusive collection of 12 perfumes from 6 world regions:
- Scandinavian (Spray & Oil): Pine, moss, ice, white tea, birch, cedar
- East Asia (Spray & Oil): Sakura, green tea, bamboo, shiso, hinoki, rice
- South Africa (Spray & Oil): Rooibos, fynbos, earth, vanilla, coffee
- Mediterranean (Spray & Oil): Lemon, bergamot, orange blossom, fig, olive blossom, lavender
- South America (Spray & Oil): Tonka, cocoa, vetiver, tropical green, palo santo
- Middle East (Spray & Oil): Oud, rose, saffron, musk, frankincense

Key knowledge:
- Sprays project more (higher sillage) but less longevity. Oils are intimate but last longer.
- Layering = combining multiple sprays and oils. Oil goes on pulse points first, spray over.
- Amounts are in "sprays" for spray format and "drops" for oil format.
- A formula is a list of perfumes with their amounts (e.g., "2 sprays Mediterranean + 3 drops Middle East Oil").

Your tone: Sophisticated, warm, poetic but precise. Like a knowledgeable friend at a luxury fragrance house.
Always respond in English.
When describing scents, be vivid and sensory — help the user "smell" through words.
Keep responses concise but rich. Use fragrance terminology naturally.`;

const REQUEST_BODY = (prompt) => ({
  contents: [{ parts: [{ text: prompt }] }],
  systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
});

// ── Error classifier ──────────────────────────────────────────
function classifyError(msg, status) {
  if (status === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
    return 'rate-limit';
  }
  if (status === 401 || status === 403 || msg.includes('API_KEY') || msg.includes('API key')) {
    return 'invalid-key';
  }
  if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed to fetch')) {
    return 'network';
  }
  return 'unknown';
}

function errorText(type, waitSec) {
  switch (type) {
    case 'rate-limit':
      return `Rate limit reached. Please wait ${waitSec || 30} seconds and try again.`;
    case 'invalid-key':
      return 'AI service key is invalid. Please contact the site owner.';
    case 'network':
      return 'Network error. Please check your connection and try again.';
    default:
      return 'AI request failed. Please try again.';
  }
}

// ── Core request ─────────────────────────────────────────────
async function callGemini(prompt) {
  const body = REQUEST_BODY(prompt);

  // ── Path A: Cloudflare Worker proxy (production) ──
  if (PROXY_URL) {
    const headers = { 'Content-Type': 'application/json' };
    if (WORKER_TOKEN) headers['X-Worker-Token'] = WORKER_TOKEN;

    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data?.error?.message || `HTTP ${res.status}`;
      throw Object.assign(new Error(msg), { status: res.status });
    }
    return data;
  }

  // ── Path B: Direct Gemini call (local dev fallback) ──
  const apiKey = storage.getApiKey();
  if (!apiKey) throw Object.assign(new Error('no-api-key'), { status: 0 });

  const res = await fetch(
    `${GEMINI_BASE}/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || `HTTP ${res.status}`;
    throw Object.assign(new Error(msg), { status: res.status });
  }
  return data;
}

// ── Public API ────────────────────────────────────────────────
export async function generateAIResponse(prompt, retries = 2) {
  try {
    const data = await callGemini(prompt);
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error('Empty Gemini response', data);
      return { success: false, error: 'empty-response', text: 'AI returned an empty response. Please try again.' };
    }
    return { success: true, text };

  } catch (e) {
    const msg  = e.message || String(e);
    const status = e.status ?? 0;
    console.error('AI error:', msg);

    if (msg === 'no-api-key') {
      return { success: false, error: 'no-api-key', text: 'AI features are not available. Please contact the site owner.' };
    }

    const type = classifyError(msg, status);

    // Auto-retry on rate limit
    if (type === 'rate-limit' && retries > 0) {
      const waitMatch = msg.match(/retry[^0-9]*(\d+)/i);
      const waitSec   = waitMatch ? parseInt(waitMatch[1]) : 30;
      console.log(`Rate limited. Waiting ${waitSec}s… (${retries} retries left)`);
      await new Promise(r => setTimeout(r, (waitSec + 2) * 1000));
      return generateAIResponse(prompt, retries - 1);
    }

    const waitMatch = msg.match(/retry[^0-9]*(\d+)/i);
    return {
      success: false,
      error: type,
      text: errorText(type, waitMatch ? parseInt(waitMatch[1]) : undefined),
    };
  }
}

export function isAIAvailable() {
  return !!(PROXY_URL || storage.getApiKey());
}

export function resetAI() {
  // No longer needed (stateless fetch), kept for API compatibility.
}
