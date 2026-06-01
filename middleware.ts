/**
 * Vercel Routing (Edge) Middleware — password gate for the deployed deck.
 *
 * WHY THIS FILE GATES VERCEL BUT NOT LOCALHOST:
 * Vercel runs this `middleware.ts` (project root) before every matched request.
 * `vite dev` / `vite preview` never execute it — it isn't imported by the app and
 * Vite has no concept of it. So `npm run dev` on localhost is open with ZERO
 * environment branching; the gate exists only where Vercel runs it.
 *
 * Security model (server-side, password never reaches the client bundle):
 *   - The shared password lives only in the `SITE_PASSWORD` env var.
 *   - On success we mint an HMAC-SHA256-signed token `"<exp>.<sig>"` (signed with
 *     `AUTH_SECRET`) and store it in an HttpOnly, Secure, SameSite=Lax cookie.
 *   - Every later request re-verifies the signature + embedded expiry server-side.
 *   - Both the password check and the signature check use constant-time compares.
 *   - Fail closed: if env vars are missing we serve 503, never the unguarded deck.
 *
 * Edge runtime gives us Web Crypto (`crypto.subtle`), `btoa`, `TextEncoder`,
 * `request.formData()` and real `Date.now()` — no Node-only APIs are used.
 */

import { next } from '@vercel/functions';

// `process.env` is injected by Vercel for env vars; ambient-declare it so this
// file (intentionally outside tsconfig `include`) stays self-contained.
declare const process: { env: Record<string, string | undefined> };

export const config = {
  // Run on every app path so JS/assets never leak pre-auth. Skip Vercel internals
  // AND the decorative cover hero (`/heroes/title-data-topology*`) so the login
  // page can preload it while unauthenticated — the deck then paints seamlessly
  // the instant the password is correct. That image is just berau's branded cover
  // photo (decorative), not deck content, so serving it publicly leaks nothing.
  matcher: '/((?!_vercel/|heroes/title-data-topology).*)',
};

const COOKIE = 'berau_session';
const MAX_AGE_S = 60 * 60 * 24 * 7; // 7 days
const MAX_AGE_MS = MAX_AGE_S * 1000;
const AUTH_PATH = '/__auth';

const enc = new TextEncoder();

export default async function middleware(request: Request): Promise<Response> {
  const SITE_PASSWORD = process.env.SITE_PASSWORD;
  const AUTH_SECRET = process.env.AUTH_SECRET;

  // Fail closed — never expose the deck if the gate isn't configured.
  if (!SITE_PASSWORD || !AUTH_SECRET) {
    return html(notConfiguredPage(), 503);
  }

  const { pathname } = new URL(request.url);

  // ── Login submit ────────────────────────────────────────────────────────
  if (request.method === 'POST' && pathname === AUTH_PATH) {
    const form = await request.formData();
    const submitted = String(form.get('password') ?? '');
    if (timingSafeEqual(submitted, SITE_PASSWORD)) {
      const token = await mintToken(AUTH_SECRET);
      return new Response(null, {
        status: 303,
        headers: {
          Location: '/',
          'Set-Cookie': `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE_S}`,
        },
      });
    }
    return html(loginPage('Incorrect password — please try again.'), 401);
  }

  // ── Existing session ─────────────────────────────────────────────────────
  const token = readCookie(request.headers.get('cookie'), COOKIE);
  if (token && (await verifyToken(token, AUTH_SECRET))) {
    return next(); // forward to the static origin — serve the deck
  }

  // ── Not authenticated → branded login page ───────────────────────────────
  return html(loginPage(), 200);
}

// ── Crypto helpers (Web Crypto only) ─────────────────────────────────────────

async function mintToken(secret: string): Promise<string> {
  const payload = String(Date.now() + MAX_AGE_MS);
  const sig = await sign(payload, secret);
  return `${payload}.${sig}`;
}

async function verifyToken(token: string, secret: string): Promise<boolean> {
  const dot = token.lastIndexOf('.');
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await sign(payload, secret);
  if (!timingSafeEqual(sig, expected)) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const buf = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return base64url(new Uint8Array(buf));
}

function base64url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Constant-time compare (no early return on first mismatch). */
function timingSafeEqual(a: string, b: string): boolean {
  const ba = enc.encode(a);
  const bb = enc.encode(b);
  let diff = ba.length ^ bb.length;
  const len = Math.max(ba.length, bb.length);
  for (let i = 0; i < len; i++) {
    diff |= (ba[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return null;
}

// ── HTML responses ───────────────────────────────────────────────────────────

function html(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

const PAGE_HEAD = `<!doctype html><html lang="en"><head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Berau Coal AI Workshop — Access</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" />
<!-- Warm berau's branded cover photo while the viewer types, so the title slide paints
     instantly on success. This path is un-gated (see config.matcher); it is just the
     decorative cover image, not deck content, so serving it publicly leaks nothing. -->
<link rel="preload" as="image" type="image/jpeg" href="/heroes/title-data-topology.jpg" />
<style>
  :root { --copper:#b86e3d; --copper-400:#c98548; --copper-700:#7a4626; --ink:#f5f5f5; --bg:#0a0a0a; }
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0; font-family: 'Source Serif 4', Georgia, serif; color: var(--ink);
    background: radial-gradient(120% 120% at 70% 10%, #1c130a 0%, #0a0a0a 55%, #050403 100%);
    display: grid; place-items: center; padding: 24px;
  }
  .card {
    width: 100%; max-width: 380px; background: #15110c; border-radius: 16px;
    padding: 40px 36px; box-shadow: 0 24px 60px rgba(0,0,0,.55);
    border: 1px solid rgba(184,110,61,.28); border-top: 4px solid var(--copper);
  }
  .eyebrow { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px;
    letter-spacing: .16em; text-transform: uppercase; color: var(--copper-400);
    font-weight: 500; margin: 0 0 10px; }
  h1 { font-family: 'Instrument Serif', Georgia, serif; font-size: 30px; line-height: 1.15;
    color: var(--ink); margin: 0 0 6px; font-weight: 400; }
  .sub { font-size: 14px; color: rgba(245,245,245,.62); margin: 0 0 26px; }
  label { display: block; font-family: 'Inter', system-ui, sans-serif; font-size: 12px;
    font-weight: 600; color: rgba(245,245,245,.78); margin: 0 0 6px; letter-spacing: .02em; }
  input[type=password], input[type=text] {
    width: 100%; padding: 12px 46px 12px 14px; font-size: 15px;
    font-family: 'Inter', system-ui, sans-serif; background: rgba(255,255,255,.04);
    border: 1.5px solid rgba(245,245,245,.16); border-radius: 9px; color: var(--ink);
    outline: none; transition: border-color .15s;
  }
  input[type=password]::placeholder, input[type=text]::placeholder { color: rgba(245,245,245,.35); }
  input[type=password]:focus, input[type=text]:focus { border-color: var(--copper); }
  .pw-wrap { position: relative; }
  .pw-toggle {
    position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
    display: grid; place-items: center; width: 34px; height: 34px; padding: 0;
    border: 0; border-radius: 7px; background: transparent; color: rgba(245,245,245,.45); cursor: pointer;
  }
  .pw-toggle:hover { color: var(--copper-400); background: rgba(255,255,255,.06); }
  .pw-toggle svg { width: 18px; height: 18px; }
  .pw-toggle .icon-off { display: none; }
  .pw-toggle.on .icon-on { display: none; }
  .pw-toggle.on .icon-off { display: block; }
  button[type="submit"] {
    width: 100%; margin-top: 18px; padding: 12px 14px; font-size: 15px; font-weight: 700;
    font-family: 'Inter', system-ui, sans-serif; color: #0a0a0a; background: var(--copper);
    border: 0; border-radius: 9px; cursor: pointer; transition: background .15s;
  }
  button[type="submit"]:hover { background: var(--copper-400); }
  .err { margin: 14px 0 0; font-size: 13px; color: #e2705a; font-weight: 600;
    font-family: 'Inter', system-ui, sans-serif; }
  .foot { margin: 22px 0 0; font-size: 11px; color: rgba(245,245,245,.4); text-align: center;
    font-family: 'Inter', system-ui, sans-serif; }
</style></head><body><div class="card">
<p class="eyebrow">Berau AI Catalyst · Vol 2, Session 2</p>
<h1>From AI Curiosity to AI Capability</h1>
<p class="sub">Adrianto Tedjokusumo · Nanovest</p>`;

const PAGE_FOOT = `<p class="foot">This presentation is private. Enter the password to continue.</p>
</div></body></html>`;

function loginPage(error?: string): string {
  return (
    PAGE_HEAD +
    `<form method="POST" action="${AUTH_PATH}">
<label for="password">Password</label>
<div class="pw-wrap">
<input id="password" type="password" name="password" autofocus autocomplete="current-password" required />
<button type="button" id="pw-toggle" class="pw-toggle" aria-label="Show password" title="Show password">
<svg class="icon-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
<svg class="icon-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M6.06 6.06A18.45 18.45 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 4.94-1.06"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
</button>
</div>
<button type="submit">View deck</button>
${error ? `<p class="err">${escapeHtml(error)}</p>` : ''}
</form>
<script>
(function () {
  var input = document.getElementById('password');
  var toggle = document.getElementById('pw-toggle');
  if (!input || !toggle) return;
  toggle.addEventListener('click', function () {
    var reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    toggle.classList.toggle('on', reveal);
    var label = reveal ? 'Hide password' : 'Show password';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    input.focus();
  });
})();
</script>` +
    PAGE_FOOT
  );
}

function notConfiguredPage(): string {
  return (
    PAGE_HEAD +
    `<p class="err">Access is not configured. Set the <code>SITE_PASSWORD</code> and
<code>AUTH_SECRET</code> environment variables in the Vercel project, then redeploy.</p>` +
    PAGE_FOOT
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
