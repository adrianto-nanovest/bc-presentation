// @vitest-environment node
//
// Behaviour lock for the deployed password gate (`middleware.ts`).
//
// WHY THE NODE ENVIRONMENT: the gate runs on Vercel's Edge runtime and speaks
// only Web platform APIs — `Request`/`Response`, `crypto.subtle`, `btoa`,
// `TextEncoder`. Node supplies all of them as globals; jsdom (this repo's
// default test environment) does not ship `crypto.subtle`. So this one file
// opts into `node`, which is also the closer analogue of the real runtime.
//
// These tests exercise the real default export with constructed `Request`
// objects and the real `process.env`. Nothing is stubbed: `next()` from
// `@vercel/functions` is a pure function that returns a `Response` carrying
// `x-middleware-next: 1`, so "forwarded to the origin" is directly observable.
//
// The token signer below re-states the middleware's HMAC scheme rather than
// importing its internals, which keeps the middleware's surface untouched and
// makes any edit to the scheme fail here. Be clear about what it is: a copy of
// the same algorithm, not an independent oracle. It pins the scheme; it does not
// vouch for it.
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import middleware, { config } from "../../middleware";

const BERAU_ORIGIN = "https://bc-presentation.vercel.app";
const OTHER_ORIGIN = "https://gems-catalyst.example.com";

const PASSWORD = "correct-horse-battery";
const GENERAL_PASSWORD = "general-only-password";
const SECRET = "test-auth-secret-do-not-ship";

const MAX_AGE_S = 60 * 60 * 24 * 7;

// ── Env harness ──────────────────────────────────────────────────────────────
// The gate reads `process.env` per request, so tests just stub it. Stubbing a
// var to `undefined` DELETES it rather than setting the string "undefined",
// which is what the fail-closed cases need; `unstubAllEnvs` then hands the
// developer's real shell env back.
beforeEach(() => {
  vi.stubEnv("SITE_PASSWORD", PASSWORD);
  vi.stubEnv("SITE_PASSWORD_GENERAL", undefined);
  vi.stubEnv("AUTH_SECRET", SECRET);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

// ── Token helpers (independent re-implementation of the gate's HMAC scheme) ──

const enc = new TextEncoder();

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const buf = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  let bin = "";
  for (const b of new Uint8Array(buf)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** A token the gate must accept: `"<expiry-ms>.<sig>"`, expiry in the future. */
async function mintToken(expiryMs: number, secret = SECRET): Promise<string> {
  const payload = String(expiryMs);
  return `${payload}.${await sign(payload, secret)}`;
}

// ── Request builders ─────────────────────────────────────────────────────────

function get(origin: string, path = "/", cookie?: string): Request {
  return new Request(origin + path, {
    headers: cookie ? { cookie } : {},
  });
}

/** Mirrors the login form's real submit: POST /__auth, url-encoded body. */
function submitPassword(origin: string, password: string): Request {
  return new Request(`${origin}/__auth`, {
    method: "POST",
    body: new URLSearchParams({ password }),
  });
}

function setCookieHeader(res: Response): string {
  const header = res.headers.get("set-cookie");
  expect(header).not.toBeNull();
  return header as string;
}

/** `"name=value; Attr; Attr"` → `"value"`. */
function cookieValue(header: string): string {
  return header.slice(header.indexOf("=") + 1, header.indexOf(";"));
}

/**
 * The `x-middleware-next: 1` marker `next()` sets — i.e. "serve the deck".
 * Pinned positively by "a valid cookie forwards the request", so the negative
 * assertions below cannot all quietly pass if the marker is ever renamed.
 */
function wasForwarded(res: Response): boolean {
  return res.headers.get("x-middleware-next") === "1";
}

/** The login form is the tell that the gate held: it renders instead of the deck. */
async function servedLoginPage(res: Response): Promise<boolean> {
  return (await res.text()).includes('action="/__auth"');
}

// ── Matcher ──────────────────────────────────────────────────────────────────

describe("config.matcher", () => {
  // SCOPE: this guards the exclusion LIST, not Vercel's dispatcher. It assumes
  // the matcher is a regex anchored over the full pathname, leading slash
  // included — an assumption about Vercel's semantics that is not verified here.
  // What it does buy: deleting either exclusion fails this test, and both
  // exclusions are deliberate (Vercel internals, and the un-gated cover photo
  // the login page preloads).
  test("gates app paths but exempts Vercel internals and the cover hero", () => {
    const pattern = new RegExp(`^${config.matcher}$`);
    expect(pattern.test("/")).toBe(true);
    expect(pattern.test("/index.html")).toBe(true);
    expect(pattern.test("/assets/app.js")).toBe(true);
    // Un-gated so the login page can preload the decorative cover photo.
    expect(pattern.test("/heroes/title-data-topology.jpg")).toBe(false);
    expect(pattern.test("/_vercel/insights/script.js")).toBe(false);
  });
});

// ── Variant selection by hostname ────────────────────────────────────────────

describe("variant selection", () => {
  test("the berau host gets berau copy", async () => {
    const res = await middleware(get(BERAU_ORIGIN));

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/html; charset=utf-8");
    expect(res.headers.get("cache-control")).toBe("no-store");

    const body = await res.text();
    expect(body).toContain("<title>Berau Coal AI Workshop — Access</title>");
    expect(body).toContain("Berau AI Catalyst · Vol 2, Session 2");
    expect(body).not.toContain("AI Catalyst Workshop</span>");
  });

  test("the berau host gets the berau cookie name", async () => {
    const res = await middleware(submitPassword(BERAU_ORIGIN, PASSWORD));
    expect(setCookieHeader(res)).toMatch(/^berau_session=/);
  });

  test("any other host gets general copy", async () => {
    const res = await middleware(get(OTHER_ORIGIN));

    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("<title>AI Catalyst Workshop — Access</title>");
    expect(body).toContain(">AI Catalyst Workshop</span>");
    expect(body).not.toContain("Berau AI Catalyst");
  });

  test("any other host gets the general cookie name", async () => {
    const res = await middleware(submitPassword(OTHER_ORIGIN, PASSWORD));
    expect(setCookieHeader(res)).toMatch(/^general_session=/);
  });

  test("the general variant falls back to SITE_PASSWORD when SITE_PASSWORD_GENERAL is unset", async () => {
    const res = await middleware(submitPassword(OTHER_ORIGIN, PASSWORD));
    expect(res.status).toBe(303);
  });

  test("SITE_PASSWORD_GENERAL, when set, replaces the fallback for other hosts", async () => {
    vi.stubEnv("SITE_PASSWORD_GENERAL", GENERAL_PASSWORD);

    const accepted = await middleware(submitPassword(OTHER_ORIGIN, GENERAL_PASSWORD));
    expect(accepted.status).toBe(303);

    const rejected = await middleware(submitPassword(OTHER_ORIGIN, PASSWORD));
    expect(rejected.status).toBe(401);

    // The berau host keeps using SITE_PASSWORD regardless.
    const berau = await middleware(submitPassword(BERAU_ORIGIN, PASSWORD));
    expect(berau.status).toBe(303);
  });
});

// ── Fail closed on missing configuration ─────────────────────────────────────

describe("missing configuration", () => {
  test("no SITE_PASSWORD → 503, never the deck", async () => {
    vi.stubEnv("SITE_PASSWORD", undefined);

    const res = await middleware(get(BERAU_ORIGIN));

    expect(res.status).toBe(503);
    expect(wasForwarded(res)).toBe(false);
    expect(await res.text()).toContain("Access not configured");
  });

  test("no AUTH_SECRET → 503, never the deck", async () => {
    vi.stubEnv("AUTH_SECRET", undefined);

    const res = await middleware(get(BERAU_ORIGIN));

    expect(res.status).toBe(503);
    expect(wasForwarded(res)).toBe(false);
    expect(await res.text()).toContain("Access not configured");
  });

  test("503 still carries the requesting host's branding", async () => {
    vi.stubEnv("SITE_PASSWORD", undefined);

    const res = await middleware(get(OTHER_ORIGIN));

    expect(res.status).toBe(503);
    expect(await res.text()).toContain("<title>AI Catalyst Workshop — Access</title>");
  });

  test("a valid cookie does not rescue an unconfigured gate", async () => {
    const token = await mintToken(Date.now() + 60_000);
    vi.stubEnv("AUTH_SECRET", undefined);

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${token}`));

    expect(res.status).toBe(503);
    expect(wasForwarded(res)).toBe(false);
  });
});

// ── Login submit ─────────────────────────────────────────────────────────────

describe("login submit", () => {
  test("a wrong password → 401 with the error page", async () => {
    const res = await middleware(submitPassword(BERAU_ORIGIN, "wrong-password"));

    expect(res.status).toBe(401);
    expect(res.headers.get("set-cookie")).toBeNull();
    expect(wasForwarded(res)).toBe(false);

    const body = await res.text();
    expect(body).toContain("Incorrect password — please try again.");
    expect(body).toContain('action="/__auth"');
  });

  test("an empty submit → 401 (no password field is not a free pass)", async () => {
    const res = await middleware(
      new Request(`${BERAU_ORIGIN}/__auth`, { method: "POST", body: new URLSearchParams() }),
    );

    expect(res.status).toBe(401);
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  test("the correct password → 303 to / with a signed session cookie", async () => {
    const before = Date.now();
    const res = await middleware(submitPassword(BERAU_ORIGIN, PASSWORD));
    const after = Date.now();

    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/");

    const cookie = setCookieHeader(res);
    expect(cookie).toMatch(/^berau_session=/);
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie).toContain("Path=/");
    expect(cookie).toContain(`Max-Age=${MAX_AGE_S}`);

    // The token is `"<expiry-ms>.<sig>"`, HMAC-signed with AUTH_SECRET and
    // expiring 7 days out — verified here against an independent signer.
    const token = cookieValue(cookie);
    const dot = token.lastIndexOf(".");
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);

    expect(sig).toBe(await sign(payload, SECRET));
    expect(Number(payload)).toBeGreaterThanOrEqual(before + MAX_AGE_S * 1000);
    expect(Number(payload)).toBeLessThanOrEqual(after + MAX_AGE_S * 1000);
  });

  test("the password is never echoed into the response", async () => {
    const res = await middleware(submitPassword(BERAU_ORIGIN, "wrong-password"));
    const body = await res.text();
    expect(body).not.toContain("wrong-password");
    expect(body).not.toContain(PASSWORD);
  });
});

// ── Existing session ─────────────────────────────────────────────────────────

describe("session cookie", () => {
  test("a valid cookie forwards the request to the origin", async () => {
    const token = await mintToken(Date.now() + 60_000);

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${token}`));

    expect(wasForwarded(res)).toBe(true);
    expect(res.status).toBe(200);
  });

  test("a valid cookie is found among other cookies", async () => {
    const token = await mintToken(Date.now() + 60_000);
    const header = `ab=1; berau_session=${token}; va-u=xyz`;

    expect(wasForwarded(await middleware(get(BERAU_ORIGIN, "/", header)))).toBe(true);
  });

  test("a tampered signature → the login page, not the deck", async () => {
    const token = await mintToken(Date.now() + 60_000);
    const tampered = token.slice(0, -1) + (token.endsWith("A") ? "B" : "A");

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${tampered}`));

    expect(wasForwarded(res)).toBe(false);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain('action="/__auth"');
    expect(body).not.toContain("Incorrect password");
  });

  test("a token signed with the wrong secret → the login page", async () => {
    const token = await mintToken(Date.now() + 60_000, "not-the-real-secret");

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${token}`));

    expect(wasForwarded(res)).toBe(false);
    expect(await res.text()).toContain('action="/__auth"');
  });

  test("an expired token → the login page, not the deck", async () => {
    const token = await mintToken(Date.now() - 1_000);

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${token}`));

    expect(wasForwarded(res)).toBe(false);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain('action="/__auth"');
  });

  test("a correctly signed expiry cannot be extended by editing the payload", async () => {
    const token = await mintToken(Date.now() - 1_000);
    const sig = token.slice(token.lastIndexOf(".") + 1);
    const forged = `${Date.now() + 60_000}.${sig}`;

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${forged}`));

    expect(wasForwarded(res)).toBe(false);
    expect(res.status).toBe(200);
    expect(await servedLoginPage(res)).toBe(true);
  });

  test("no cookie → the login page", async () => {
    const res = await middleware(get(BERAU_ORIGIN));

    expect(wasForwarded(res)).toBe(false);
    expect(res.status).toBe(200);
  });

  test("a berau cookie does not authenticate another host, and vice versa", async () => {
    // Both variants sign with the same AUTH_SECRET, so the token value itself is
    // valid for either — only the cookie NAME differs. Losing that split would
    // let one variant's session open another's deck, with no visible symptom.
    const token = await mintToken(Date.now() + 60_000);

    const general = await middleware(get(OTHER_ORIGIN, "/", `berau_session=${token}`));
    expect(wasForwarded(general)).toBe(false);
    expect(await servedLoginPage(general)).toBe(true);

    const berau = await middleware(get(BERAU_ORIGIN, "/", `general_session=${token}`));
    expect(wasForwarded(berau)).toBe(false);
    expect(await servedLoginPage(berau)).toBe(true);
  });
});
