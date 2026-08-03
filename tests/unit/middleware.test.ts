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
//
// COPY IS ASSERTED AS LITERALS, not by calling `loginTitle` / `variantLabel`.
// Deriving the expectation from the same functions the gate uses would make
// these tests agree with any renaming, including a wrong one.
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import { readdirSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import middleware, { config } from "../../middleware";
import { BRANDS, VARIANTS, type Brand, type VariantId } from "@/deck-variants";

// ── Fixtures ─────────────────────────────────────────────────────────────────

const ALL_IDS: VariantId[] = [
  "berau-middle-mgmt",
  "berau-leader",
  "gems-middle-mgmt",
  "gems-leader",
  "general",
];

/** One production host per variant — the rows of `VARIANT_BY_HOST` that matter. */
const HOST: Record<VariantId, string> = {
  "berau-middle-mgmt": "bc-presentation.vercel.app",
  "berau-leader": "bc-leader-ai-workshop.vercel.app",
  "gems-middle-mgmt": "gems-middle-mgmt-ai-workshop.vercel.app",
  "gems-leader": "gems-leader-ai-workshop.vercel.app",
  general: "ai-catalyst-workshop.vercel.app",
};

const origin = (id: VariantId) => `https://${HOST[id]}`;

/** A Vercel preview URL: an unmatched host, so the host rule yields `general`. */
const PREVIEW_ORIGIN = "https://berau-presentation-git-feat-abc123.vercel.app";
const BERAU_ORIGIN = origin("berau-middle-mgmt");

/** Authored copy, restated (see the header note). */
const COPY: Record<VariantId, { title: string; eyebrow: string }> = {
  "berau-middle-mgmt": {
    title: "Berau AI Catalyst Workshop — Access",
    eyebrow: "Berau AI Catalyst Workshop",
  },
  "berau-leader": {
    title: "Berau AI Catalyst Workshop — Access",
    eyebrow: "Berau AI Catalyst Workshop · Leadership",
  },
  "gems-middle-mgmt": {
    title: "GEMS AI Catalyst Workshop — Access",
    eyebrow: "GEMS AI Catalyst Workshop",
  },
  "gems-leader": {
    title: "GEMS AI Catalyst Workshop — Access",
    eyebrow: "GEMS AI Catalyst Workshop · Leadership",
  },
  general: {
    title: "AI Catalyst Workshop — Access",
    eyebrow: "AI Catalyst Workshop",
  },
};

const LEGACY_PASSWORD = "legacy-shared-password";
const BRAND_PASSWORD: Record<Brand, string> = {
  berau: "berau-only-password",
  gems: "gems-only-password",
  general: "general-only-password",
};
const SECRET = "test-auth-secret-do-not-ship";

const MAX_AGE_S = 60 * 60 * 24 * 7;

/**
 * The gate's non-credential brand selector (gh#30), restated as a literal for
 * the same reason the copy is: importing the name would make these tests agree
 * with a rename, including one that breaks every browser's existing cookie.
 */
const SELECTOR_COOKIE = "variant";

// ── Env harness ──────────────────────────────────────────────────────────────
// The gate reads `process.env` per request, so tests just stub it. Stubbing a
// var to `undefined` DELETES it rather than setting the string "undefined",
// which is what the fail-closed cases need; `unstubAllEnvs` then hands the
// developer's real shell env back.
//
// The default state is the migration's step 5 NOT yet done: only the legacy
// `SITE_PASSWORD` exists, so every brand reaches it through the fallback.
beforeEach(() => {
  vi.stubEnv("SITE_PASSWORD", LEGACY_PASSWORD);
  vi.stubEnv("SITE_PASSWORD_BERAU", undefined);
  vi.stubEnv("SITE_PASSWORD_GEMS", undefined);
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

/**
 * A token the gate must accept: `"<brand>.<expiry-ms>.<sig>"`, signed over
 * `` `${brand}|${exp}` ``, expiry in the future (gh#24).
 *
 * The brand is a free parameter, not derived from the request, precisely so the
 * cross-brand cases below can mint a token for one brand and present it as
 * another's.
 */
async function mintToken(brand: Brand, expiryMs: number, secret = SECRET): Promise<string> {
  const payload = `${brand}|${expiryMs}`;
  return `${brand}.${expiryMs}.${await sign(payload, secret)}`;
}

/** The pre-gh#24 format: `"<expiry-ms>.<sig>"`, no brand. Must not verify. */
async function mintLegacyToken(expiryMs: number, secret = SECRET): Promise<string> {
  const payload = String(expiryMs);
  return `${payload}.${await sign(payload, secret)}`;
}

const FUTURE = () => Date.now() + 60_000;

// ── Request builders ─────────────────────────────────────────────────────────

function get(origin: string, path = "/", cookie?: string): Request {
  return new Request(origin + path, {
    headers: cookie ? { cookie } : {},
  });
}

/** Mirrors the login form's real submit: POST /__auth, url-encoded body. */
function submitPassword(origin: string, password: string, query = ""): Request {
  return new Request(`${origin}/__auth${query}`, {
    method: "POST",
    body: new URLSearchParams({ password }),
  });
}

/**
 * A sub-resource request: no query string (browsers do not append one to the
 * `<script src>` the document names) and a non-document `Sec-Fetch-Dest`, which
 * is the signal the gate keys its one extra step off (gh#30).
 */
function getSubresource(
  origin: string,
  path = "/assets/index-abc123.js",
  cookie?: string,
  dest: string | null = "script",
): Request {
  const headers: Record<string, string> = {};
  if (cookie) headers.cookie = cookie;
  if (dest !== null) headers["sec-fetch-dest"] = dest;
  return new Request(origin + path, { headers });
}

function setCookieHeader(res: Response): string {
  const header = res.headers.get("set-cookie");
  expect(header).not.toBeNull();
  return header as string;
}

/** Each `Set-Cookie` separately — the gate may send two (session + selector). */
function setCookies(res: Response): string[] {
  return res.headers.getSetCookie();
}

/** The session `Set-Cookie` reduced to the `"name=value"` a browser would send back. */
function cookiePair(header: string): string {
  return header.slice(0, header.indexOf(";"));
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
  return (await res.text()).includes('action="/__auth');
}

// ── Matcher ──────────────────────────────────────────────────────────────────

describe("config.matcher", () => {
  // SCOPE: this guards the exclusion LIST, not Vercel's dispatcher. It assumes
  // the matcher is a regex anchored over the full pathname, leading slash
  // included — an assumption about Vercel's semantics that is not verified here.
  // What it does buy: deleting any exclusion fails this test, and all three are
  // deliberate (Vercel internals, the brand favicons the pre-auth login page
  // renders, and the un-gated cover photo it preloads).
  test("gates app paths but exempts Vercel internals, brand assets and the cover hero", () => {
    const pattern = new RegExp(`^${config.matcher}$`);
    expect(pattern.test("/")).toBe(true);
    expect(pattern.test("/index.html")).toBe(true);
    expect(pattern.test("/assets/app.js")).toBe(true);
    // Un-gated so the login page can preload the decorative cover photo.
    expect(pattern.test("/heroes/title-data-topology.jpg")).toBe(false);
    expect(pattern.test("/_vercel/insights/script.js")).toBe(false);
    // Un-gated so the PRE-AUTH login page renders its brand favicon; one stable
    // prefix, so adding a brand never edits this regex.
    for (const { favicon } of Object.values(BRANDS)) {
      expect(pattern.test(favicon), favicon).toBe(false);
    }
  });

  test("`assets/brand/` holds only the declared favicons — the exemption's blast radius", () => {
    // The matcher exempts the whole `brand/` prefix, so ANY file dropped in that
    // directory is served un-authenticated. That is safe only while the
    // directory holds nothing but the logos the login page needs, which is what
    // this locks: an unreferenced file there fails here rather than silently
    // shipping outside the only auth boundary.
    const dir = resolvePath(__dirname, "../../assets/brand");
    const declared = Object.values(BRANDS).map(({ favicon }) => favicon.replace("/brand/", ""));

    expect(readdirSync(dir).sort()).toEqual([...declared].sort());
  });
});

// ── Resolution: `?variant=` → host → general ──────────────────────────────────

describe("brand resolution by host", () => {
  test.each(ALL_IDS)("%s's host gets that brand's login copy", async (id) => {
    const res = await middleware(get(origin(id)));

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/html; charset=utf-8");
    expect(res.headers.get("cache-control")).toBe("no-store");

    const body = await res.text();
    expect(body).toContain(`<title>${COPY[id].title}</title>`);
    expect(body).toContain(`<span>${COPY[id].eyebrow}</span>`);
  });

  test.each(ALL_IDS)("%s's host gets that brand's cookie", async (id) => {
    const res = await middleware(submitPassword(origin(id), LEGACY_PASSWORD));
    expect(res.status).toBe(303);
    expect(setCookieHeader(res)).toMatch(new RegExp(`^${BRANDS[VARIANTS[id].brand].cookie}=`));
  });

  test("the berau alias host resolves to berau, not to the fallback", async () => {
    const res = await middleware(get("https://bc-middle-mgmt-ai-workshop.vercel.app"));
    expect(await res.text()).toContain(`<title>${COPY["berau-middle-mgmt"].title}</title>`);
  });

  test("an unmatched host (a Vercel preview URL) falls back to general", async () => {
    const res = await middleware(get(PREVIEW_ORIGIN));
    const body = await res.text();
    expect(body).toContain(`<title>${COPY.general.title}</title>`);
    expect(body).toContain(`<span>${COPY.general.eyebrow}</span>`);
  });
});

describe("brand resolution by ?variant=", () => {
  // The live defect this ticket closes: the gate ignored the parameter, so a
  // preview URL with `?variant=berau-middle-mgmt` served GENERAL's login page in
  // front of berau's deck — the two sides disagreed about who the visitor was.
  test.each(ALL_IDS)("?variant=%s on a preview host serves that brand's copy", async (id) => {
    const res = await middleware(get(PREVIEW_ORIGIN, `/?variant=${id}`));

    const body = await res.text();
    expect(body).toContain(`<title>${COPY[id].title}</title>`);
    expect(body).toContain(`<span>${COPY[id].eyebrow}</span>`);
  });

  test.each(ALL_IDS)("?variant=%s on a preview host sets that brand's cookie", async (id) => {
    const res = await middleware(
      submitPassword(PREVIEW_ORIGIN, LEGACY_PASSWORD, `?variant=${id}`),
    );
    expect(res.status).toBe(303);
    expect(setCookieHeader(res)).toMatch(new RegExp(`^${BRANDS[VARIANTS[id].brand].cookie}=`));
  });

  test("the parameter outranks the host, exactly as on the client", async () => {
    const res = await middleware(get(BERAU_ORIGIN, "/?variant=gems-leader"));
    const body = await res.text();
    expect(body).toContain(`<title>${COPY["gems-leader"].title}</title>`);
    expect(body).toContain(`<span>${COPY["gems-leader"].eyebrow}</span>`);
  });

  test("an unknown parameter value is ignored, leaving the host rule", async () => {
    const res = await middleware(get(BERAU_ORIGIN, "/?variant=not-a-variant"));
    expect(await res.text()).toContain(`<title>${COPY["berau-middle-mgmt"].title}</title>`);
  });

  test("a parameter named like an Object member does not resolve", async () => {
    const res = await middleware(get(PREVIEW_ORIGIN, "/?variant=constructor"));
    expect(await res.text()).toContain(`<title>${COPY.general.title}</title>`);
  });
});

// ── The parameter survives the round trip ────────────────────────────────────

describe("?variant= round trip", () => {
  test("the login form posts back with the parameter, so the POST checks the same brand", async () => {
    const res = await middleware(get(PREVIEW_ORIGIN, "/?variant=gems-leader"));
    expect(await res.text()).toContain('action="/__auth?variant=gems-leader"');
  });

  test("an unknown parameter is not echoed into the form action", async () => {
    const res = await middleware(get(BERAU_ORIGIN, "/?variant=not-a-variant"));
    const body = await res.text();
    expect(body).toContain('action="/__auth"');
    expect(body).not.toContain("not-a-variant");
  });

  test("the 401 retry page keeps the parameter too", async () => {
    const res = await middleware(
      submitPassword(PREVIEW_ORIGIN, "wrong-password", "?variant=gems-leader"),
    );
    expect(res.status).toBe(401);
    expect(await res.text()).toContain('action="/__auth?variant=gems-leader"');
  });

  test("a successful POST redirects back to the same variant", async () => {
    const res = await middleware(
      submitPassword(PREVIEW_ORIGIN, LEGACY_PASSWORD, "?variant=gems-leader"),
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/?variant=gems-leader");
  });

  test("a host-resolved request keeps clean URLs — no parameter added", async () => {
    const page = await middleware(get(BERAU_ORIGIN));
    expect(await page.text()).toContain('action="/__auth"');

    const posted = await middleware(submitPassword(BERAU_ORIGIN, LEGACY_PASSWORD));
    expect(posted.headers.get("location")).toBe("/");
  });
});

// ── Brand chrome on the pre-auth page ────────────────────────────────────────

describe("login page brand chrome", () => {
  test.each(ALL_IDS)("%s renders its brand favicon, typed from the path", async (id) => {
    const { favicon } = BRANDS[VARIANTS[id].brand];
    const type = favicon.endsWith(".svg") ? "image/svg+xml" : "image/png";

    const res = await middleware(get(origin(id)));

    expect(await res.text()).toContain(`<link rel="icon" type="${type}" href="${favicon}" />`);
  });

  test("the tab title never carries the leader suffix; the eyebrow does", async () => {
    const res = await middleware(get(origin("berau-leader")));
    const body = await res.text();

    expect(body).toContain("<title>Berau AI Catalyst Workshop — Access</title>");
    expect(body).toContain("<span>Berau AI Catalyst Workshop · Leadership</span>");
    expect(body).not.toContain("Leadership — Access");
  });

  test("a standard deck set gets no suffix at all", async () => {
    const body = await (await middleware(get(origin("gems-middle-mgmt")))).text();
    expect(body).not.toContain("Leadership");
  });

  test("every variant keeps the shared, brand-neutral cover hero", async () => {
    for (const id of ALL_IDS) {
      const body = await (await middleware(get(origin(id)))).text();
      expect(body, id).toContain("/heroes/title-data-topology.jpg");
    }
  });
});

// ── Password resolution: SITE_PASSWORD_<BRAND> ?? SITE_PASSWORD ──────────────

describe("password resolution", () => {
  test.each(ALL_IDS)("%s falls back to SITE_PASSWORD when its brand var is unset", async (id) => {
    const res = await middleware(submitPassword(origin(id), LEGACY_PASSWORD));
    expect(res.status).toBe(303);
  });

  test.each(["berau", "gems", "general"] as Brand[])(
    "%s's own env var replaces the fallback once set",
    async (brand) => {
      const id = ALL_IDS.find((v) => VARIANTS[v].brand === brand) as VariantId;
      vi.stubEnv(BRANDS[brand].passwordEnv, BRAND_PASSWORD[brand]);

      const accepted = await middleware(submitPassword(origin(id), BRAND_PASSWORD[brand]));
      expect(accepted.status).toBe(303);

      const rejected = await middleware(submitPassword(origin(id), LEGACY_PASSWORD));
      expect(rejected.status).toBe(401);
      expect(rejected.headers.get("set-cookie")).toBeNull();
    },
  );

  test("one brand's password does not open another brand's deck", async () => {
    vi.stubEnv("SITE_PASSWORD_BERAU", BRAND_PASSWORD.berau);
    vi.stubEnv("SITE_PASSWORD_GEMS", BRAND_PASSWORD.gems);

    const crossed = await middleware(
      submitPassword(origin("gems-middle-mgmt"), BRAND_PASSWORD.berau),
    );
    expect(crossed.status).toBe(401);

    const own = await middleware(submitPassword(origin("gems-middle-mgmt"), BRAND_PASSWORD.gems));
    expect(own.status).toBe(303);
  });

  test("both deck sets of one brand share that brand's password", async () => {
    vi.stubEnv("SITE_PASSWORD_GEMS", BRAND_PASSWORD.gems);

    for (const id of ["gems-middle-mgmt", "gems-leader"] as VariantId[]) {
      const res = await middleware(submitPassword(origin(id), BRAND_PASSWORD.gems));
      expect(res.status, id).toBe(303);
    }
  });
});

// ── Fail closed on missing configuration ─────────────────────────────────────

describe("missing configuration", () => {
  test("neither the brand var nor SITE_PASSWORD → 503, never the deck", async () => {
    vi.stubEnv("SITE_PASSWORD", undefined);

    const res = await middleware(get(origin("gems-middle-mgmt")));

    expect(res.status).toBe(503);
    expect(wasForwarded(res)).toBe(false);
    const body = await res.text();
    expect(body).toContain("Access not configured");
    // The page names the var actually missing for THIS brand.
    expect(body).toContain("SITE_PASSWORD_GEMS");
  });

  test("the brand var alone is enough — no SITE_PASSWORD needed", async () => {
    vi.stubEnv("SITE_PASSWORD", undefined);
    vi.stubEnv("SITE_PASSWORD_GEMS", BRAND_PASSWORD.gems);

    const page = await middleware(get(origin("gems-middle-mgmt")));
    expect(page.status).toBe(200);

    const posted = await middleware(
      submitPassword(origin("gems-middle-mgmt"), BRAND_PASSWORD.gems),
    );
    expect(posted.status).toBe(303);
  });

  test("one brand's missing password does not take another brand down", async () => {
    vi.stubEnv("SITE_PASSWORD", undefined);
    vi.stubEnv("SITE_PASSWORD_BERAU", BRAND_PASSWORD.berau);

    expect((await middleware(get(BERAU_ORIGIN))).status).toBe(200);
    expect((await middleware(get(origin("gems-leader")))).status).toBe(503);
  });

  test("no AUTH_SECRET → 503, never the deck", async () => {
    vi.stubEnv("AUTH_SECRET", undefined);

    const res = await middleware(get(BERAU_ORIGIN));

    expect(res.status).toBe(503);
    expect(wasForwarded(res)).toBe(false);
    expect(await res.text()).toContain("Access not configured");
  });

  test("503 still carries the requesting brand's branding", async () => {
    vi.stubEnv("SITE_PASSWORD", undefined);

    const res = await middleware(get(origin("gems-leader")));

    expect(res.status).toBe(503);
    expect(await res.text()).toContain(`<title>${COPY["gems-leader"].title}</title>`);
  });

  test("a valid cookie does not rescue an unconfigured gate", async () => {
    const token = await mintToken("berau", FUTURE());
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
    const res = await middleware(submitPassword(BERAU_ORIGIN, LEGACY_PASSWORD));
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

    // The token is `"<brand>.<expiry-ms>.<sig>"`, signed over `brand|exp` with
    // AUTH_SECRET and expiring 7 days out — checked against an independent signer.
    const [brand, exp, sig] = cookieValue(cookie).split(".");

    expect(brand).toBe("berau");
    expect(sig).toBe(await sign(`${brand}|${exp}`, SECRET));
    expect(Number(exp)).toBeGreaterThanOrEqual(before + MAX_AGE_S * 1000);
    expect(Number(exp)).toBeLessThanOrEqual(after + MAX_AGE_S * 1000);
  });

  test.each(["berau", "gems", "general"] as Brand[])(
    "the minted token names %s and signs the brand into the payload",
    async (brand) => {
      // gh#24: the brand is INSIDE the signature, so it cannot be edited, and it
      // is the field verification compares against the request's own brand.
      const id = ALL_IDS.find((v) => VARIANTS[v].brand === brand) as VariantId;
      const res = await middleware(submitPassword(origin(id), LEGACY_PASSWORD));
      const token = cookieValue(setCookieHeader(res));

      const parts = token.split(".");
      expect(parts).toHaveLength(3);
      const [tokenBrand, exp, sig] = parts;
      expect(tokenBrand).toBe(brand);
      expect(exp).toMatch(/^\d+$/);
      expect(sig).toBe(await sign(`${brand}|${exp}`, SECRET));
      // The bare expiry is NOT what is signed — that was the hole (#24).
      expect(sig).not.toBe(await sign(exp, SECRET));
    },
  );

  test("both deck sets of a brand mint the same brand's token", async () => {
    for (const id of ["gems-middle-mgmt", "gems-leader"] as VariantId[]) {
      const res = await middleware(submitPassword(origin(id), LEGACY_PASSWORD));
      expect(cookieValue(setCookieHeader(res)).split(".")[0], id).toBe("gems");
    }
  });

  test("a freshly minted cookie is accepted by the gate that minted it", async () => {
    // Closes the loop: mint → present → forwarded. Without this, every negative
    // case below could pass on a gate that rejects EVERYTHING.
    for (const id of ALL_IDS) {
      const posted = await middleware(submitPassword(origin(id), LEGACY_PASSWORD));
      const cookie = setCookieHeader(posted);
      const header = cookie.slice(0, cookie.indexOf(";"));

      expect(wasForwarded(await middleware(get(origin(id), "/", header))), id).toBe(true);
    }
  });

  test("the password is never echoed into the response", async () => {
    const res = await middleware(submitPassword(BERAU_ORIGIN, "wrong-password"));
    const body = await res.text();
    expect(body).not.toContain("wrong-password");
    expect(body).not.toContain(LEGACY_PASSWORD);
  });
});

// ── Existing session ─────────────────────────────────────────────────────────

describe("session cookie", () => {
  test("a valid cookie forwards the request to the origin", async () => {
    const token = await mintToken("berau", FUTURE());

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${token}`));

    expect(wasForwarded(res)).toBe(true);
    expect(res.status).toBe(200);
  });

  test("a valid cookie is found among other cookies", async () => {
    const token = await mintToken("berau", FUTURE());
    const header = `ab=1; berau_session=${token}; va-u=xyz`;

    expect(wasForwarded(await middleware(get(BERAU_ORIGIN, "/", header)))).toBe(true);
  });

  test("a tampered signature → the login page, not the deck", async () => {
    const token = await mintToken("berau", FUTURE());
    const tampered = token.slice(0, -1) + (token.endsWith("A") ? "B" : "A");

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${tampered}`));

    expect(wasForwarded(res)).toBe(false);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain('action="/__auth"');
    expect(body).not.toContain("Incorrect password");
  });

  test("a token signed with the wrong secret → the login page", async () => {
    const token = await mintToken("berau", FUTURE(), "not-the-real-secret");

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${token}`));

    expect(wasForwarded(res)).toBe(false);
    expect(await servedLoginPage(res)).toBe(true);
  });

  test("an expired token → the login page, not the deck", async () => {
    const token = await mintToken("berau", Date.now() - 1_000);

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${token}`));

    expect(wasForwarded(res)).toBe(false);
    expect(res.status).toBe(200);
    expect(await servedLoginPage(res)).toBe(true);
  });

  test("a correctly signed expiry cannot be extended by editing the payload", async () => {
    const token = await mintToken("berau", Date.now() - 1_000);
    const sig = token.slice(token.lastIndexOf(".") + 1);
    const forged = `berau.${FUTURE()}.${sig}`;

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

  test("the cookie NAME is still a boundary — a foreign brand's cookie name is ignored", async () => {
    // Unchanged behaviour, kept: the gate reads only THIS brand's cookie name, so
    // a token parked under another name is not even looked at.
    const token = await mintToken("berau", FUTURE());

    const onGems = await middleware(
      get(origin("gems-middle-mgmt"), "/", `berau_session=${token}`),
    );
    expect(wasForwarded(onGems)).toBe(false);
    expect(await servedLoginPage(onGems)).toBe(true);
  });

  test("the two deck sets of one brand share a session, by design", async () => {
    // The isolation boundary is the BRAND (spec §1.3): with one shared password
    // a middle-management participant can read the leader deck. Accepted.
    const token = await mintToken("gems", FUTURE());

    const res = await middleware(get(origin("gems-leader"), "/", `gems_session=${token}`));
    expect(wasForwarded(res)).toBe(true);
  });

  test("a ?variant= override is gated by that brand's cookie, not the host's", async () => {
    const withGems = await middleware(
      get(
        PREVIEW_ORIGIN,
        "/?variant=gems-leader",
        `gems_session=${await mintToken("gems", FUTURE())}`,
      ),
    );
    expect(wasForwarded(withGems)).toBe(true);

    const withGeneral = await middleware(
      get(
        PREVIEW_ORIGIN,
        "/?variant=gems-leader",
        `general_session=${await mintToken("general", FUTURE())}`,
      ),
    );
    expect(wasForwarded(withGeneral)).toBe(false);
  });
});

// ── Brand-bound tokens (gh#24) ───────────────────────────────────────────────
//
// THE HOLE THIS CLOSES: every brand signs with the same `AUTH_SECRET`, so before
// this ticket the token VALUE was valid for any brand — the cookie NAME was the
// only separation, and a cookie name is attacker-supplied. A berau token pasted
// into `gems_session` on the GEMS domain verified.
//
// This regression has NO VISIBLE SYMPTOM: every login keeps working, the
// isolation is simply gone. These tests are the only thing that would catch it,
// which is why they assert the boundary from both directions.

describe("brand-bound tokens", () => {
  const BRANDS_LIST = ["berau", "gems", "general"] as Brand[];

  /** The request that a stolen token would be replayed on: that brand's own host + own cookie name. */
  const asBrand = (target: Brand, token: string) => {
    const id = ALL_IDS.find((v) => VARIANTS[v].brand === target) as VariantId;
    return get(origin(id), "/", `${BRANDS[target].cookie}=${token}`);
  };

  test("spec check 3, last row: a berau token presented in gems_session on the GEMS domain is rejected", async () => {
    // The token is taken from a REAL berau login, not from the local helper: this
    // is the attack as performed, with the exact bytes the gate hands a berau
    // viewer. It also keeps the test honest if the mint format ever changes — the
    // helper would keep agreeing with itself, a live login cannot.
    const login = await middleware(submitPassword(BERAU_ORIGIN, LEGACY_PASSWORD));
    const berauToken = cookieValue(setCookieHeader(login));
    expect(wasForwarded(await middleware(asBrand("berau", berauToken)))).toBe(true);

    // Correct cookie NAME for gems, correct signature, correct secret, unexpired
    // — and still refused, because the token says `berau`.
    const res = await middleware(
      get(origin("gems-middle-mgmt"), "/", `gems_session=${berauToken}`),
    );

    expect(wasForwarded(res)).toBe(false);
    expect(res.status).toBe(200);

    const body = await res.text();
    expect(body).toContain('action="/__auth'); // the login page, not the deck
    expect(body).toContain(`<title>${COPY["gems-middle-mgmt"].title}</title>`); // GEMS' own door
  });

  test.each(BRANDS_LIST)("a %s token verifies on %s and on no other brand", async (owner) => {
    const token = await mintToken(owner, FUTURE());

    expect(wasForwarded(await middleware(asBrand(owner, token))), owner).toBe(true);

    for (const other of BRANDS_LIST.filter((b) => b !== owner)) {
      const res = await middleware(asBrand(other, token));
      expect(wasForwarded(res), `${owner} token on ${other}`).toBe(false);
      expect(await servedLoginPage(res)).toBe(true);
    }
  });

  test("the brand field cannot be rewritten to match — it is inside the signature", async () => {
    const token = await mintToken("berau", FUTURE());
    const [, exp, sig] = token.split(".");

    const forged = `gems.${exp}.${sig}`;
    const res = await middleware(get(origin("gems-middle-mgmt"), "/", `gems_session=${forged}`));

    expect(wasForwarded(res)).toBe(false);
    expect(await servedLoginPage(res)).toBe(true);
  });

  test("a ?variant= override is gated by the token's brand, not just the cookie name", async () => {
    // The override outranks the host, so the resolved brand is gems here. A
    // general token under gems' cookie name must not ride the override in.
    const generalToken = await mintToken("general", FUTURE());

    const res = await middleware(
      get(PREVIEW_ORIGIN, "/?variant=gems-leader", `gems_session=${generalToken}`),
    );

    expect(wasForwarded(res)).toBe(false);
    expect(await servedLoginPage(res)).toBe(true);
  });

  test("an expired token is still rejected for its OWN brand", async () => {
    const token = await mintToken("gems", Date.now() - 1_000);
    expect(wasForwarded(await middleware(asBrand("gems", token)))).toBe(false);
  });

  test.each(BRANDS_LIST)("a pre-gh#24 token (<exp>.<sig>) fails closed on %s", async (brand) => {
    // Every 7-day cookie in the wild is this shape. It must land on the login
    // page — not verify, and not throw a 500 either.
    const legacy = await mintLegacyToken(FUTURE());

    const res = await middleware(asBrand(brand, legacy));

    expect(wasForwarded(res)).toBe(false);
    expect(res.status).toBe(200);
    expect(await servedLoginPage(res)).toBe(true);
  });

  test("a malformed cookie value fails closed rather than throwing", async () => {
    const good = await mintToken("berau", FUTURE());
    const [, exp, sig] = good.split(".");

    const malformed = [
      "",
      ".",
      "..",
      "berau",
      "berau.",
      `berau.${exp}`, // no signature
      `.${exp}.${sig}`, // empty brand
      `berau..${sig}`, // empty expiry
      `berau.${exp}.${sig}.extra`, // four fields
      `berau.not-a-number.${sig}`,
      `BERAU.${exp}.${sig}`, // wrong case
      `berau|${exp}.${sig}`, // the payload delimiter, not the cookie's
      `${good}.${good}`,
      "%%%",
    ];

    for (const value of malformed) {
      const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${value}`));
      expect(wasForwarded(res), JSON.stringify(value)).toBe(false);
      expect(res.status, JSON.stringify(value)).toBe(200);
      expect(await servedLoginPage(res), JSON.stringify(value)).toBe(true);
    }
  });

  test("a token minted for an unknown brand never verifies", async () => {
    // `berau_session` is read on the berau host, so the resolved brand is berau;
    // a token claiming anything else is refused. ONE expiry value in both the
    // payload and the token, or a millisecond tick would make this pass on a
    // signature mismatch and prove nothing about the brand.
    const exp = FUTURE();
    const token = `admin.${exp}.${await sign(`admin|${exp}`, SECRET)}`;

    const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${token}`));
    expect(wasForwarded(res)).toBe(false);
  });

  test("a correctly signed but non-canonical expiry is refused", async () => {
    // Signed with the real secret, so the signature cannot be what rejects these.
    // Each coerces to a live timestamp through `Number`, and none is a form
    // minting emits — so each must be refused, whether by the digit check or (for
    // the exponent form, which smuggles in a `.`) by the field count.
    for (const exp of [" 4102444800000", "+4102444800000", "4.1024448e12", "0x3BA9EE1AE00"]) {
      const token = `berau.${exp}.${await sign(`berau|${exp}`, SECRET)}`;

      const res = await middleware(get(BERAU_ORIGIN, "/", `berau_session=${token}`));
      expect(wasForwarded(res), exp).toBe(false);
      expect(await servedLoginPage(res), exp).toBe(true);
    }
  });

  test("an expiry beyond the exact-integer range is refused", async () => {
    const exp = "99999999999999999999";
    const token = `berau.${exp}.${await sign(`berau|${exp}`, SECRET)}`;

    expect(wasForwarded(await middleware(get(BERAU_ORIGIN, "/", `berau_session=${token}`)))).toBe(
      false,
    );
  });
});

// ── The selector cookie (gh#30) ──────────────────────────────────────────────
//
// THE DEFECT: `?variant=` reaches the gate only on the document. A sub-resource
// request carries no query string, so on an unmapped host (a Vercel preview) it
// resolved to `general` while the document that referenced it was gated by the
// overridden brand — the gate answered `/assets/index-*.js` with login HTML and
// the app never booted. Verifying a variant on a preview took TWO logins.
//
// THE FIX is the Edge's one extra, non-authoritative step: `?variant=` → host row
// → selector cookie → `general`, consulted only for non-document requests on an
// unmapped host. Spec §1.3 records the asymmetry; these tests fence it in, since
// the cookie is the only input to the gate that the client resolver cannot see.

describe("selector cookie — resolution order", () => {
  const selector = (id: VariantId) => `${SELECTOR_COOKIE}=${id}`;

  test("a sub-resource on a preview resolves by the selector, not by the host default", async () => {
    // THE BUG, from the other side: with gems' session and the selector present,
    // the script request is forwarded instead of being answered with login HTML.
    const cookie = `gems_session=${await mintToken("gems", FUTURE())}; ${selector("gems-leader")}`;

    expect(wasForwarded(await middleware(getSubresource(PREVIEW_ORIGIN, "/assets/x.js", cookie)))).toBe(
      true,
    );
  });

  test.each(["script", "style", "image", "font", "empty"])(
    "every non-document destination (%s) consults it",
    async (dest) => {
      const cookie = `gems_session=${await mintToken("gems", FUTURE())}; ${selector("gems-leader")}`;
      const res = await middleware(getSubresource(PREVIEW_ORIGIN, "/assets/x.js", cookie, dest));
      expect(wasForwarded(res), dest).toBe(true);
    },
  );

  test("a mapped host ignores the selector entirely", async () => {
    // Production's five domains all have a row, so this is what keeps them
    // behaving exactly as they did before gh#30.
    const berau = await mintToken("berau", FUTURE());
    const forwarded = await middleware(
      getSubresource(BERAU_ORIGIN, "/assets/x.js", `berau_session=${berau}; ${selector("gems-leader")}`),
    );
    expect(wasForwarded(forwarded)).toBe(true);

    // And the converse: the selector cannot make a mapped host demand gems.
    const held = await middleware(
      getSubresource(
        BERAU_ORIGIN,
        "/assets/x.js",
        `gems_session=${await mintToken("gems", FUTURE())}; ${selector("gems-leader")}`,
      ),
    );
    expect(wasForwarded(held)).toBe(false);
  });

  test("`?variant=` still outranks the selector", async () => {
    const cookie = `gems_session=${await mintToken("gems", FUTURE())}; ${selector("gems-leader")}`;

    // The parameter says berau, so berau's session is what is demanded — the
    // selector must not smuggle gems past it.
    const res = await middleware(
      getSubresource(PREVIEW_ORIGIN, "/assets/x.js?variant=berau-leader", cookie),
    );
    expect(wasForwarded(res)).toBe(false);
    expect(await servedLoginPage(res)).toBe(true);
  });

  test("no selector on a preview still falls back to general", async () => {
    const general = `general_session=${await mintToken("general", FUTURE())}`;
    expect(
      wasForwarded(await middleware(getSubresource(PREVIEW_ORIGIN, "/assets/x.js", general))),
    ).toBe(true);
  });

  test("duplicate selector cookies: the first wins, and neither opens a door", async () => {
    // Only self-inflicted (two paths, two scopes), and harmless by construction:
    // the value picks WHICH door is demanded, so the worst case is the wrong
    // door — which then still needs that brand's token.
    const gems = `gems_session=${await mintToken("gems", FUTURE())}`;
    const first = await middleware(
      getSubresource(
        PREVIEW_ORIGIN,
        "/assets/x.js",
        `${gems}; ${SELECTOR_COOKIE}=gems-leader; ${SELECTOR_COOKIE}=berau-leader`,
      ),
    );
    expect(wasForwarded(first)).toBe(true); // gems demanded, gems held

    const reversed = await middleware(
      getSubresource(
        PREVIEW_ORIGIN,
        "/assets/x.js",
        `${gems}; ${SELECTOR_COOKIE}=berau-leader; ${SELECTOR_COOKIE}=gems-leader`,
      ),
    );
    expect(wasForwarded(reversed)).toBe(false); // berau demanded, not held
    expect(await servedLoginPage(reversed)).toBe(true);
  });

  test.each(["not-a-variant", "constructor", "", "gems", "GEMS-LEADER"])(
    "a selector value of %j is not a table key, so it resolves general",
    async (value) => {
      // Whatever it says, the value is validated exactly like `?variant=`.
      const cookie = `gems_session=${await mintToken("gems", FUTURE())}; ${SELECTOR_COOKIE}=${value}`;
      const res = await middleware(getSubresource(PREVIEW_ORIGIN, "/assets/x.js", cookie));
      expect(wasForwarded(res), value).toBe(false);

      const withGeneral = `general_session=${await mintToken("general", FUTURE())}; ${SELECTOR_COOKIE}=${value}`;
      expect(
        wasForwarded(await middleware(getSubresource(PREVIEW_ORIGIN, "/assets/x.js", withGeneral))),
        value,
      ).toBe(true);
    },
  );
});

describe("selector cookie — documents never consult it", () => {
  // The point of the `Sec-Fetch-Dest` gate: the client resolver cannot read
  // cookies, so if a DOCUMENT resolved by the selector the two sides would
  // disagree about who the viewer is — gems' door in front of the general deck.
  test("a document request on a preview resolves general despite the selector", async () => {
    const res = await middleware(
      new Request(`${PREVIEW_ORIGIN}/`, {
        headers: {
          "sec-fetch-dest": "document",
          cookie: `gems_session=${await mintToken("gems", FUTURE())}; ${SELECTOR_COOKIE}=gems-leader`,
        },
      }),
    );

    expect(wasForwarded(res)).toBe(false);
    const body = await res.text();
    expect(body).toContain(`<title>${COPY.general.title}</title>`);
    // …and the door it offers is general's, so the form does not carry a variant.
    expect(body).toContain('action="/__auth"');
  });

  test.each(["iframe", "frame", "fencedframe", "embed", "object"])(
    "the document-like destination %s does not consult it either",
    async (dest) => {
      const cookie = `gems_session=${await mintToken("gems", FUTURE())}; ${SELECTOR_COOKIE}=gems-leader`;
      const res = await middleware(getSubresource(PREVIEW_ORIGIN, "/", cookie, dest));
      expect(wasForwarded(res), dest).toBe(false);
    },
  );

  test("a document with a selector is NOT rejected — it is resolved by the host rule", async () => {
    // The positive half, without which every assertion above would still pass on
    // a gate that simply refused any document carrying a selector. General's own
    // session must open general's document while a gems selector sits in the jar.
    const res = await middleware(
      new Request(`${PREVIEW_ORIGIN}/`, {
        headers: {
          "sec-fetch-dest": "document",
          cookie: `general_session=${await mintToken("general", FUTURE())}; ${SELECTOR_COOKIE}=gems-leader`,
        },
      }),
    );

    expect(wasForwarded(res)).toBe(true);
  });

  test("an ABSENT Sec-Fetch-Dest falls back to the pre-gh#30 behaviour", async () => {
    // Unknown destination (an old client, curl, a Playwright API request): treat
    // it as possibly-a-document and do NOT consult the cookie. Fails closed to
    // the old two-login flow instead of risking a divergent document.
    const cookie = `gems_session=${await mintToken("gems", FUTURE())}; ${SELECTOR_COOKIE}=gems-leader`;
    const res = await middleware(getSubresource(PREVIEW_ORIGIN, "/assets/x.js", cookie, null));

    expect(wasForwarded(res)).toBe(false);
    expect(await servedLoginPage(res)).toBe(true);
  });
});

describe("selector cookie — carries no authority", () => {
  test("forging it forwards nothing without that brand's session token", async () => {
    // The whole security argument in one test: the selector chooses WHICH door is
    // checked, never whether it opens.
    const res = await middleware(
      getSubresource(PREVIEW_ORIGIN, "/assets/x.js", `${SELECTOR_COOKIE}=gems-leader`),
    );

    expect(wasForwarded(res)).toBe(false);
    expect(res.status).toBe(200);
    expect(await servedLoginPage(res)).toBe(true);
  });

  test("a foreign brand's session is still rejected — the cross-brand shortcut is NOT taken", async () => {
    // The rejected option C: accepting ANY valid token on an unmapped host would
    // let a berau participant read GEMS-specific slides (A.1, K.2) on a preview.
    // Berau's token is real, unexpired and correctly signed; the selector names
    // gems; the request must still be held.
    const berau = await mintToken("berau", FUTURE());
    const cookie = `berau_session=${berau}; ${SELECTOR_COOKIE}=gems-leader`;

    const res = await middleware(getSubresource(PREVIEW_ORIGIN, "/assets/x.js", cookie));
    expect(wasForwarded(res)).toBe(false);

    // Not even under gems' cookie NAME — the brand is inside the signature (gh#24).
    const renamed = await middleware(
      getSubresource(PREVIEW_ORIGIN, "/assets/x.js", `gems_session=${berau}; ${SELECTOR_COOKIE}=gems-leader`),
    );
    expect(wasForwarded(renamed)).toBe(false);
  });

  test("an expired session is not rescued by a live selector", async () => {
    const stale = await mintToken("gems", Date.now() - 1_000);
    const res = await middleware(
      getSubresource(PREVIEW_ORIGIN, "/assets/x.js", `gems_session=${stale}; ${SELECTOR_COOKIE}=gems-leader`),
    );
    expect(wasForwarded(res)).toBe(false);
  });
});

describe("selector cookie — when it is issued", () => {
  const selectorSet = (res: Response): string | undefined =>
    setCookies(res).find((c) => c.startsWith(`${SELECTOR_COOKIE}=`));

  test("a successful override login sets it, with the session's attributes", async () => {
    const res = await middleware(
      submitPassword(PREVIEW_ORIGIN, LEGACY_PASSWORD, "?variant=gems-leader"),
    );

    expect(res.status).toBe(303);
    const cookies = setCookies(res);
    expect(cookies).toHaveLength(2);
    expect(cookies[0]).toMatch(/^gems_session=/);

    const set = cookies[1];
    expect(set).toMatch(new RegExp(`^${SELECTOR_COOKIE}=gems-leader;`));
    expect(set).toContain("Secure");
    expect(set).toContain("SameSite=Lax");
    expect(set).toContain("Path=/");
    expect(set).toContain(`Max-Age=${MAX_AGE_S}`);
  });

  test.each(ALL_IDS)("the value is the resolved table key for %s, never an echoed string", async (id) => {
    const res = await middleware(submitPassword(PREVIEW_ORIGIN, LEGACY_PASSWORD, `?variant=${id}`));
    expect(selectorSet(res)).toMatch(new RegExp(`^${SELECTOR_COOKIE}=${id};`));
  });

  test("a percent-encoded parameter is stored decoded, as the canonical key", async () => {
    // `%2D` is `-`. What lands in the cookie must be the table key the gate will
    // later look up, not the bytes the request happened to spell it with.
    const res = await middleware(
      submitPassword(PREVIEW_ORIGIN, LEGACY_PASSWORD, "?variant=gems%2Dleader"),
    );

    expect(selectorSet(res)).toMatch(new RegExp(`^${SELECTOR_COOKIE}=gems-leader;`));
    expect(res.headers.get("location")).toBe("/?variant=gems-leader");
  });

  test("an unknown ?variant= value is cleared, never stored as the unknown string", async () => {
    const res = await middleware(
      submitPassword(PREVIEW_ORIGIN, LEGACY_PASSWORD, "?variant=not-a-variant"),
    );

    expect(res.status).toBe(303);
    expect(selectorSet(res)).toBe(`${SELECTOR_COOKIE}=; Secure; SameSite=Lax; Path=/; Max-Age=0`);
    expect(res.headers.get("location")).toBe("/");
  });

  test("a WRONG password sets nothing at all", async () => {
    const res = await middleware(
      submitPassword(PREVIEW_ORIGIN, "wrong-password", "?variant=gems-leader"),
    );

    expect(res.status).toBe(401);
    expect(setCookies(res)).toEqual([]);
  });

  test("a login WITHOUT an override clears it, so the last login wins", async () => {
    const res = await middleware(submitPassword(PREVIEW_ORIGIN, LEGACY_PASSWORD));

    expect(res.status).toBe(303);
    expect(selectorSet(res)).toContain("Max-Age=0");

    // Proven end to end: after the clearing login, a sub-resource that still
    // presents the stale value is resolved by it only if the browser kept it —
    // and the browser will not, because Max-Age=0 deletes it.
    expect(selectorSet(res)).toBe(`${SELECTOR_COOKIE}=; Secure; SameSite=Lax; Path=/; Max-Age=0`);
  });

  test.each(ALL_IDS)("a login on %s's own mapped host sends ONE cookie, as before", async (id) => {
    // Bit-for-bit unchanged on production: no selector header, set or cleared.
    const res = await middleware(submitPassword(origin(id), LEGACY_PASSWORD));

    const cookies = setCookies(res);
    expect(cookies).toHaveLength(1);
    expect(cookies[0]).toMatch(new RegExp(`^${BRANDS[VARIANTS[id].brand].cookie}=`));
  });

  test("a mapped host with an override still sends ONE cookie", async () => {
    const res = await middleware(submitPassword(BERAU_ORIGIN, LEGACY_PASSWORD, "?variant=gems-leader"));
    expect(setCookies(res)).toHaveLength(1);
    expect(setCookies(res)[0]).toMatch(/^gems_session=/);
  });
});

describe("selector cookie — a session that predates it", () => {
  // THE MIGRATION HOLE: the login branch is the only place a cookie could be set,
  // and a viewer holding a valid 7-day session never reaches it — the document
  // forwards on the token alone. So a session minted before gh#30 shipped, or one
  // whose selector a viewer cleared, would keep hitting the ORIGINAL defect for
  // the rest of its life. The forward path therefore re-issues the selector when
  // a valid token opens an explicit `?variant=` on an unmapped host.
  const gemsJar = async () => `gems_session=${await mintToken("gems", FUTURE())}`;

  test("a valid session with NO selector re-issues it when it opens ?variant=", async () => {
    const res = await middleware(
      new Request(`${PREVIEW_ORIGIN}/?variant=gems-leader`, {
        headers: { "sec-fetch-dest": "document", cookie: await gemsJar() },
      }),
    );

    expect(wasForwarded(res)).toBe(true);
    expect(setCookies(res)).toEqual([
      `${SELECTOR_COOKIE}=gems-leader; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE_S}`,
    ]);
  });

  test("so the sub-resources of that document are forwarded too — no second login", async () => {
    const jar = await gemsJar();
    const doc = await middleware(
      new Request(`${PREVIEW_ORIGIN}/?variant=gems-leader`, {
        headers: { "sec-fetch-dest": "document", cookie: jar },
      }),
    );

    // Exactly what the browser will send next: the old session plus the cookie
    // the response just set.
    const next = `${jar}; ${cookiePair(setCookies(doc)[0])}`;
    expect(wasForwarded(await middleware(getSubresource(PREVIEW_ORIGIN, "/assets/x.js", next)))).toBe(
      true,
    );
  });

  test("it is NOT re-issued when the value is already correct — no redundant header", async () => {
    const res = await middleware(
      new Request(`${PREVIEW_ORIGIN}/?variant=gems-leader`, {
        headers: {
          "sec-fetch-dest": "document",
          cookie: `${await gemsJar()}; ${SELECTOR_COOKIE}=gems-leader`,
        },
      }),
    );

    expect(wasForwarded(res)).toBe(true);
    expect(setCookies(res)).toEqual([]);
  });

  test("an INVALID session issues nothing — the forward path is the only writer here", async () => {
    // The re-issue must not become a way to set the cookie without proving a
    // brand: the token is what gates it, exactly as it gates the deck.
    const res = await middleware(
      new Request(`${PREVIEW_ORIGIN}/?variant=gems-leader`, {
        headers: {
          "sec-fetch-dest": "document",
          cookie: `gems_session=${await mintToken("gems", Date.now() - 1_000)}`,
        },
      }),
    );

    expect(wasForwarded(res)).toBe(false);
    expect(setCookies(res)).toEqual([]);
  });

  test("a foreign brand's valid token issues nothing — it never proved this brand", async () => {
    const res = await middleware(
      new Request(`${PREVIEW_ORIGIN}/?variant=gems-leader`, {
        headers: {
          "sec-fetch-dest": "document",
          cookie: `gems_session=${await mintToken("berau", FUTURE())}`,
        },
      }),
    );

    expect(wasForwarded(res)).toBe(false);
    expect(setCookies(res)).toEqual([]);
  });

  test("a MAPPED host never writes it, on the forward path either", async () => {
    const res = await middleware(
      new Request(`${BERAU_ORIGIN}/?variant=berau-leader`, {
        headers: {
          "sec-fetch-dest": "document",
          cookie: `berau_session=${await mintToken("berau", FUTURE())}`,
        },
      }),
    );

    expect(wasForwarded(res)).toBe(true);
    expect(setCookies(res)).toEqual([]);
  });

  test("a request with NO override never writes it, even with a valid session", async () => {
    const res = await middleware(
      new Request(`${PREVIEW_ORIGIN}/`, {
        headers: {
          "sec-fetch-dest": "document",
          cookie: `general_session=${await mintToken("general", FUTURE())}`,
        },
      }),
    );

    expect(wasForwarded(res)).toBe(true);
    expect(setCookies(res)).toEqual([]);
  });
});

describe("selector cookie — the single-login preview flow", () => {
  test("POST ?variant=gems-leader → document → /assets/x.js, one login, no general session", async () => {
    // The acceptance path of gh#30, walked with only what a browser would carry
    // forward from the previous step.
    const posted = await middleware(
      submitPassword(PREVIEW_ORIGIN, LEGACY_PASSWORD, "?variant=gems-leader"),
    );
    expect(posted.status).toBe(303);
    expect(posted.headers.get("location")).toBe("/?variant=gems-leader");

    const jar = setCookies(posted).map(cookiePair).join("; ");
    expect(jar).toContain("gems_session=");
    expect(jar).toContain(`${SELECTOR_COOKIE}=gems-leader`);
    expect(jar).not.toContain("general_session");

    // 1 · the document the redirect lands on — resolved by `?variant=`.
    const doc = await middleware(
      new Request(`${PREVIEW_ORIGIN}/?variant=gems-leader`, {
        headers: { "sec-fetch-dest": "document", cookie: jar },
      }),
    );
    expect(wasForwarded(doc)).toBe(true);

    // 2 · the sub-resources that document references — no query string, resolved
    // by the selector. These are the requests that used to get login HTML. Each
    // is sent with its own real `Sec-Fetch-Dest`, not one stand-in value.
    for (const [path, dest] of [
      ["/assets/index-abc123.js", "script"],
      ["/assets/index-abc123.css", "style"],
      ["/brand/x.png", "image"],
      ["/api-ish/data.json", "empty"],
    ]) {
      const asset = await middleware(getSubresource(PREVIEW_ORIGIN, path, jar, dest));
      expect(wasForwarded(asset), `${path} (${dest})`).toBe(true);
    }
  });

  test("the same flow needs gems' password, not general's", async () => {
    vi.stubEnv("SITE_PASSWORD", undefined);
    vi.stubEnv("SITE_PASSWORD_GEMS", BRAND_PASSWORD.gems);
    vi.stubEnv("SITE_PASSWORD_GENERAL", BRAND_PASSWORD.general);

    const wrong = await middleware(
      submitPassword(PREVIEW_ORIGIN, BRAND_PASSWORD.general, "?variant=gems-leader"),
    );
    expect(wrong.status).toBe(401);

    const right = await middleware(
      submitPassword(PREVIEW_ORIGIN, BRAND_PASSWORD.gems, "?variant=gems-leader"),
    );
    expect(right.status).toBe(303);

    const jar = setCookies(right).map(cookiePair).join("; ");
    expect(wasForwarded(await middleware(getSubresource(PREVIEW_ORIGIN, "/assets/x.js", jar)))).toBe(
      true,
    );
  });
});
