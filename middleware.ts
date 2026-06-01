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

// The login screen is composed to BE the deck's title slide, gated: a full-bleed
// branded cover photo with a left-anchored editorial column (eyebrow → display
// headline → credit → access form). The same photo paints the real title slide on
// success, so the transition reads as one continuous frame. Pure inline CSS — this
// string is served by the Edge before any app bundle exists.
const PAGE_HEAD = `<!doctype html><html lang="en"><head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Berau Coal AI Workshop — Access</title>
<meta name="robots" content="noindex, nofollow" />
<meta name="theme-color" content="#0a0a0a" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" />
<!-- Warm berau's branded cover photo while the viewer types, so the title slide paints
     instantly on success. This path is un-gated (see config.matcher); it is just the
     decorative cover image, not deck content, so serving it publicly leaks nothing. -->
<link rel="preload" as="image" type="image/jpeg" href="/heroes/title-data-topology.jpg" />
<style>
  :root {
    --copper-200:#e8c4a0; --copper-300:#d99e6c; --copper-400:#c98548;
    --copper-500:#b86e3d; --copper-600:#9c5a30; --copper-700:#7a4626;
    --ink:#f5f5f5; --neutral-300:#a3a3a3; --neutral-400:#737373;
    --bg:#0a0a0a; --bg-deep:#050403; --field:#120d07;
    --ease:cubic-bezier(0.16,1,0.3,1);
    --display:'Instrument Serif',Georgia,serif;
    --serif:'Source Serif 4',Georgia,serif;
    --sans:'Inter',system-ui,sans-serif;
    --mono:'JetBrains Mono',ui-monospace,monospace;
  }
  * { box-sizing:border-box; }
  html,body { margin:0; }
  body {
    min-height:100vh; min-height:100svh; background:var(--bg-deep); color:var(--ink);
    font-family:var(--serif); -webkit-font-smoothing:antialiased;
    text-rendering:optimizeLegibility; overflow-x:hidden;
  }

  /* ── Atmosphere: full-bleed cover photo + readability + grain + vignette ── */
  .bg { position:fixed; inset:0; z-index:0; pointer-events:none; }
  .bg-photo {
    background:var(--bg-deep) url('/heroes/title-data-topology.jpg') 70% center / cover no-repeat;
    transform:scale(1.06); transform-origin:60% 50%;
    animation:kenburns 22s var(--ease) forwards;
  }
  /* Matches title.tsx darkenStrength (0.18) + its left readability gradient. */
  .bg-darken { background:rgba(5,5,5,.2); }
  .bg-readability {
    background:linear-gradient(90deg,
      rgba(5,5,5,.9) 0%, rgba(5,5,5,.7) 26%, rgba(5,5,5,.32) 52%,
      rgba(5,5,5,.05) 78%, rgba(5,5,5,0) 100%);
  }
  .bg-grain {
    opacity:.05; mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .bg-vignette { box-shadow:inset 0 0 240px 60px rgba(0,0,0,.55); }
  /* Brand chrome — thin copper hairline crowning the page. */
  .topbar {
    position:fixed; top:0; left:0; right:0; height:3px; z-index:6;
    background:linear-gradient(90deg, var(--copper-700) 0%, var(--copper-400) 50%, var(--copper-700) 100%);
  }

  /* ── Editorial column (left-anchored, vertically centered) ── */
  .col {
    position:relative; z-index:5; min-height:100vh; min-height:100svh;
    width:100%; max-width:1320px; margin:0 auto;
    display:flex; flex-direction:column; justify-content:center;
    padding:64px clamp(28px,7vw,104px);
  }
  .inner { width:100%; max-width:476px; }

  .eyebrow { display:flex; align-items:center; gap:13px; margin:0 0 22px; }
  .eyebrow .tick { width:30px; height:2px; flex:none; background:var(--copper-500);
    box-shadow:0 0 12px rgba(184,110,61,.55); }
  .eyebrow span { font-family:var(--mono); font-size:12px; font-weight:500;
    letter-spacing:.24em; text-transform:uppercase; color:var(--copper-400); }

  h1 { font-family:var(--display); font-weight:400; margin:0 0 16px;
    font-size:clamp(40px,6.6vw,70px); line-height:1.0; letter-spacing:-.015em;
    color:var(--ink); max-width:13ch; }
  h1 em { font-style:italic; color:var(--copper-300); }

  .credit { font-family:var(--serif); font-style:italic; font-weight:400;
    font-size:clamp(15px,1.9vw,19px); color:var(--neutral-300);
    margin:0 0 40px; max-width:34ch; }

  /* ── Access form ── */
  form { width:100%; }
  .formhead { display:flex; align-items:center; gap:14px; margin:0 0 12px; }
  .formhead .lbl { font-family:var(--mono); font-size:11px; font-weight:500;
    letter-spacing:.22em; text-transform:uppercase; color:var(--copper-300);
    white-space:nowrap; }
  .formhead .rule { flex:1; height:1px;
    background:linear-gradient(90deg, rgba(184,110,61,.55), rgba(184,110,61,0)); }

  .field { position:relative; }
  .field input {
    width:100%; padding:16px 54px 16px 18px; font-family:var(--sans);
    font-size:16px; font-weight:500; letter-spacing:.04em; color:var(--ink);
    background:rgba(20,15,9,.6); -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px);
    border:1px solid rgba(217,158,108,.3); border-radius:13px; outline:none;
    transition:border-color .2s var(--ease), box-shadow .25s var(--ease), background .2s var(--ease);
  }
  .field input::placeholder { color:rgba(245,245,245,.34); letter-spacing:.01em; font-weight:400; }
  .field input:hover { border-color:rgba(217,158,108,.5); }
  .field input:focus {
    border-color:var(--copper-400); background:rgba(20,15,9,.82);
    box-shadow:0 0 0 4px rgba(184,110,61,.16), 0 12px 36px -14px rgba(184,110,61,.55);
  }
  /* Kill the browser autofill (lavender/white) box — keep our dark field. */
  .field input:-webkit-autofill,
  .field input:-webkit-autofill:hover,
  .field input:-webkit-autofill:focus {
    -webkit-text-fill-color:var(--ink); caret-color:var(--ink);
    -webkit-box-shadow:0 0 0 1000px var(--field) inset;
    transition:background-color 9999s ease-in-out 0s;
  }

  .pw-toggle {
    position:absolute; right:8px; top:50%; transform:translateY(-50%);
    display:grid; place-items:center; width:36px; height:36px; padding:0;
    border:0; border-radius:9px; background:transparent;
    color:rgba(245,245,245,.42); cursor:pointer; transition:color .15s, background .15s;
  }
  .pw-toggle:hover { color:var(--copper-300); background:rgba(217,158,108,.1); }
  .pw-toggle svg { width:18px; height:18px; }
  .pw-toggle .icon-off { display:none; }
  .pw-toggle.on .icon-on { display:none; }
  .pw-toggle.on .icon-off { display:block; }

  .submit {
    position:relative; overflow:hidden; width:100%; margin-top:16px;
    display:flex; align-items:center; justify-content:center; gap:11px;
    padding:16px 18px; font-family:var(--sans); font-size:15px; font-weight:700;
    letter-spacing:.01em; color:#1a1206; cursor:pointer; border:0; border-radius:13px;
    background:linear-gradient(135deg, var(--copper-300) 0%, var(--copper-500) 56%, var(--copper-600) 100%);
    box-shadow:0 12px 34px -12px rgba(184,110,61,.65), inset 0 1px 0 rgba(255,255,255,.28);
    transition:transform .15s var(--ease), box-shadow .25s var(--ease);
  }
  .submit::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(115deg, transparent 32%, rgba(255,255,255,.4) 50%, transparent 68%);
    transform:translateX(-130%); transition:transform .7s var(--ease);
  }
  .submit:hover { transform:translateY(-1px);
    box-shadow:0 18px 44px -12px rgba(184,110,61,.75), inset 0 1px 0 rgba(255,255,255,.4); }
  .submit:hover::after { transform:translateX(130%); }
  .submit:active { transform:translateY(0); }
  .submit:focus-visible { outline:2px solid var(--copper-200); outline-offset:3px; }
  .submit .arrow { width:18px; height:18px; flex:none; transition:transform .2s var(--ease); }
  .submit:hover .arrow { transform:translateX(4px); }

  .err {
    display:flex; align-items:center; gap:10px; margin:16px 0 0; padding:12px 15px;
    font-family:var(--sans); font-size:13px; font-weight:500; line-height:1.4;
    color:#f0a78f; background:rgba(226,112,90,.1);
    border:1px solid rgba(226,112,90,.34); border-radius:11px;
  }
  .err::before { content:''; flex:none; width:7px; height:7px; border-radius:50%;
    background:#e2705a; box-shadow:0 0 10px rgba(226,112,90,.85); }
  .err code { font-family:var(--mono); font-size:12px; color:var(--copper-200);
    background:rgba(217,158,108,.12); padding:1px 5px; border-radius:4px; }

  .privacy {
    display:flex; align-items:center; gap:9px; margin:22px 0 0;
    font-family:var(--sans); font-size:12.5px; font-weight:400; line-height:1.4;
    color:var(--neutral-400);
  }
  .privacy svg { flex:none; width:13px; height:13px; color:var(--copper-400); }

  /* Bottom-right deck signature — balances the dark side of the frame. */
  .mark {
    position:fixed; right:clamp(24px,5vw,56px); bottom:clamp(22px,4vw,40px); z-index:6;
    display:flex; align-items:center; gap:9px; font-family:var(--mono); font-size:11px;
    font-weight:500; letter-spacing:.2em; text-transform:uppercase; color:rgba(217,158,108,.62);
  }
  .mark svg { width:13px; height:13px; }

  /* ── Entrance motion (mirrors title.tsx staged reveals) ── */
  @keyframes kenburns { from { transform:scale(1.06); } to { transform:scale(1); } }
  @keyframes riseIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .anim { opacity:0; animation:riseIn .7s var(--ease) forwards; }
  .d1 { animation-delay:.12s; } .d2 { animation-delay:.26s; } .d3 { animation-delay:.42s; }
  .d4 { animation-delay:.58s; } .d5 { animation-delay:.7s; } .d6 { animation-delay:.82s; }
  .d7 { animation-delay:.94s; }

  @media (max-width:560px) {
    h1 { font-size:clamp(34px,11vw,46px); max-width:none; }
    .col { padding:48px 26px; }
    .bg-readability { background:linear-gradient(180deg, rgba(5,5,5,.42) 0%, rgba(5,5,5,.78) 100%); }
    .mark { display:none; }
  }
  @media (prefers-reduced-motion:reduce) {
    .bg-photo { animation:none; transform:none; }
    .anim { opacity:1; animation:none; }
    .submit, .submit::after, .submit .arrow, .field input { transition:none; }
  }
</style></head><body>
<div class="bg bg-photo"></div>
<div class="bg bg-darken"></div>
<div class="bg bg-readability"></div>
<div class="bg bg-grain"></div>
<div class="bg bg-vignette"></div>
<div class="topbar"></div>
<main class="col"><div class="inner">
<p class="eyebrow anim d1"><span class="tick"></span><span>Berau AI Catalyst · Vol 2, Session 2</span></p>
<h1 class="anim d2">From AI Curiosity to AI <em>Capability</em></h1>
<p class="credit anim d3">Facilitated by Adrianto Tedjokusumo · Nanovest</p>`;

const PAGE_FOOT = `</div></main>
<div class="mark anim d7">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
<span>Private Access</span>
</div>
</body></html>`;

function loginPage(error?: string): string {
  return (
    PAGE_HEAD +
    `<form method="POST" action="${AUTH_PATH}">
<div class="formhead anim d4">
<label for="password" class="lbl">Enter password</label>
<span class="rule"></span>
</div>
<div class="field anim d5">
<input id="password" type="password" name="password" autofocus autocomplete="current-password" required placeholder="Shared workshop password" />
<button type="button" id="pw-toggle" class="pw-toggle" aria-label="Show password" title="Show password">
<svg class="icon-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
<svg class="icon-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M6.06 6.06A18.45 18.45 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 4.94-1.06"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
</button>
</div>
<button type="submit" class="submit anim d6">
<span>Enter the deck</span>
<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>
</button>
${error ? `<p class="err anim" role="alert">${escapeHtml(error)}</p>` : ''}
<p class="privacy anim d7">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
This deck is private. Your access is remembered for 7 days.
</p>
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
    `<div class="formhead anim d4"><span class="lbl">Access not configured</span><span class="rule"></span></div>
<p class="err anim d5" role="alert">Set the <code>SITE_PASSWORD</code> and <code>AUTH_SECRET</code> environment variables in the Vercel project, then redeploy.</p>` +
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
