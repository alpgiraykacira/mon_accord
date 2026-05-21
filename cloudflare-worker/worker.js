// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Cloudflare Worker AI Proxy
//
// Security layers:
//   1. WORKER_TOKEN header — rejects requests without a valid token
//   2. In-memory rate limit — 15 req/min per IP (best-effort)
//   3. Max prompt size — rejects oversized payloads
//   4. CORS — blocks cross-origin browser requests
//
// Secrets (set via wrangler secret put):
//   GEMINI_API_KEY  — Gemini API key
//   WORKER_TOKEN    — shared token sent by the frontend
// ═══════════════════════════════════════════════════════════════

const ALLOWED_ORIGINS = [
  'https://alpgiraykacira.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

const GEMINI_BASE    = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL          = 'gemini-3.1-flash-lite';
const MAX_BODY_BYTES = 16_000;   // ~16 KB — tighter cap; prompts are now controlled client-side
const RATE_LIMIT     = 10;       // requests per window per IP
const RATE_WINDOW_MS = 60_000;   // 1 minute

// ── In-memory rate limiter (per isolate, best-effort) ────────
// Not perfect across all Cloudflare edge nodes, but stops
// casual per-IP abuse within the same edge location.
const ipCounters = new Map(); // ip → { n, resetAt }

function isRateLimited(ip) {
  const now   = Date.now();
  let   entry = ipCounters.get(ip);

  if (!entry || now > entry.resetAt) {
    ipCounters.set(ip, { n: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.n >= RATE_LIMIT) return true;
  entry.n++;
  return false;
}

// ── Helpers ──────────────────────────────────────────────────
function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin':  allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Worker-Token',
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

// ── Main handler ─────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return json({ error: { message: 'Method Not Allowed' } }, 405, origin);
    }

    // ── 1. Token validation ───────────────────────────────────
    const token = request.headers.get('X-Worker-Token');
    if (!env.WORKER_TOKEN || token !== env.WORKER_TOKEN) {
      return json({ error: { message: 'Unauthorized' } }, 401, origin);
    }

    // ── 2. Rate limiting ──────────────────────────────────────
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return json(
        { error: { message: 'Too many requests. Please wait a moment.' } },
        429,
        origin
      );
    }

    // ── 3. Payload size guard ─────────────────────────────────
    const contentLength = parseInt(request.headers.get('Content-Length') || '0', 10);
    if (contentLength > MAX_BODY_BYTES) {
      return json({ error: { message: 'Payload too large.' } }, 413, origin);
    }

    // ── 4. API key check ──────────────────────────────────────
    if (!env.GEMINI_API_KEY) {
      return json({ error: { message: 'AI service not configured.' } }, 503, origin);
    }

    // ── 5. Parse & proxy ──────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: { message: 'Invalid JSON body.' } }, 400, origin);
    }

    try {
      const geminiRes = await fetch(
        `${GEMINI_BASE}/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(body),
        }
      );

      const data = await geminiRes.json();
      return json(data, geminiRes.status, origin);

    } catch (e) {
      return json({ error: { message: `Proxy error: ${e.message}` } }, 502, origin);
    }
  },
};
