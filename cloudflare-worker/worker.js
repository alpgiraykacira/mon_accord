// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Cloudflare Worker AI Proxy
//
// This worker proxies requests to the Gemini API so the API key
// never appears in the frontend bundle.
//
// Setup:
//   1. npm install -g wrangler
//   2. wrangler login
//   3. wrangler deploy
//   4. wrangler secret put GEMINI_API_KEY   ← paste your key here
//   5. Copy the worker URL to GitHub secret: VITE_PROXY_URL
// ═══════════════════════════════════════════════════════════════

const ALLOWED_ORIGINS = [
  'https://alpgiraykacira.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL = 'gemini-2.5-flash';

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: { message: 'Method Not Allowed' } }, 405, origin);
    }

    if (!env.GEMINI_API_KEY) {
      return jsonResponse({ error: { message: 'AI service not configured.' } }, 503, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: { message: 'Invalid JSON body.' } }, 400, origin);
    }

    try {
      const geminiRes = await fetch(
        `${GEMINI_BASE}/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      const data = await geminiRes.json();
      return jsonResponse(data, geminiRes.status, origin);

    } catch (e) {
      return jsonResponse({ error: { message: `Proxy error: ${e.message}` } }, 502, origin);
    }
  },
};
