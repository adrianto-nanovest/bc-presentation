// Shared variant table — the single source of truth for which brand and which
// deck set a request is serving. Spec §1 (docs/specs/2026-08-03-gems-catalyst-
// implementation-spec.md), resolved on #5, amended by #6 and #8.
//
// TWO CONSUMERS, ONE RULE (both live):
//   - `src/variant.ts` — the client resolver, reading `window.location`.
//   - `middleware.ts`  — the Vercel Edge password gate, reading the request URL.
//     It takes its cookie name, password env var, login title, eyebrow and
//     favicon from the rows below (gh#23).
//
// The Edge consumer imports this file by a RELATIVE path, because the `@/` alias
// does not resolve in Vercel's middleware build. So this module MUST stay plain
// data — **no imports at all**, no React, no DOM access at module scope. A unit
// test asserts that, because an import added here would break the Edge build
// rather than the app build, and so would not surface until deploy.
//
// Branding and auth are BRAND-level; slide composition is DECK-SET-level.

export type Brand = "berau" | "general" | "gems";
export type DeckSetId = "standard" | "leader";
export type VariantId =
  | "berau-middle-mgmt"
  | "berau-leader"
  | "gems-middle-mgmt"
  | "gems-leader"
  | "general";

/**
 * Everything that varies with the *organisation* in front of the deck.
 *
 * `label` is the only authored string: the tab title IS the label, the login
 * page title is `` `${label} — Access` ``, and the login eyebrow / title-slide
 * chip is the label plus the deck set's suffix (see `variantLabel`).
 */
export interface BrandRow {
  label: string;
  /** Session cookie name — the per-brand half of the auth boundary. */
  cookie: string;
  /** Env var holding this brand's shared password. Falls back to `SITE_PASSWORD`. */
  passwordEnv: string;
  /** Served from `assets/brand/` (`vite.config.ts` sets `publicDir: "assets"`). */
  favicon: string;
  /** Whether this brand runs the hands-on Practice Lab (drives K.1 / K.2). */
  practiceLab: boolean;
}

export const BRANDS: Record<Brand, BrandRow> = {
  berau: {
    label: "Berau AI Catalyst Workshop",
    cookie: "berau_session",
    passwordEnv: "SITE_PASSWORD_BERAU",
    favicon: "/brand/bce-logo.png",
    practiceLab: true,
  },
  gems: {
    label: "GEMS AI Catalyst Workshop",
    cookie: "gems_session",
    passwordEnv: "SITE_PASSWORD_GEMS",
    favicon: "/brand/gems-logo.svg",
    practiceLab: true,
  },
  general: {
    label: "AI Catalyst Workshop",
    cookie: "general_session",
    passwordEnv: "SITE_PASSWORD_GENERAL",
    favicon: "/brand/general-ai-logo.png",
    practiceLab: false,
  },
};

/**
 * Everything that varies with the *audience*. Slide composition lives here
 * (Phase 4); today only the label suffix distinguishes the two deck sets.
 */
export interface DeckSetRow {
  /** Appended to the brand label on the eyebrow + title chip ONLY. */
  labelSuffix?: string;
}

export const DECK_SETS: Record<DeckSetId, DeckSetRow> = {
  standard: {},
  leader: { labelSuffix: " · Leadership" },
};

/** A resolved variant: one brand crossed with one deck set. */
export interface Variant {
  id: VariantId;
  brand: Brand;
  deckSet: DeckSetId;
}

// All five ids are registered NOW. `berau-leader` and `gems-leader` resolve and
// render the STANDARD deck until Phase 4 composes the leader deck; only the
// `· Leadership` suffix distinguishes them. That is intentional.
export const VARIANTS: Record<VariantId, Variant> = {
  "berau-middle-mgmt": { id: "berau-middle-mgmt", brand: "berau", deckSet: "standard" },
  "berau-leader": { id: "berau-leader", brand: "berau", deckSet: "leader" },
  "gems-middle-mgmt": { id: "gems-middle-mgmt", brand: "gems", deckSet: "standard" },
  "gems-leader": { id: "gems-leader", brand: "gems", deckSet: "leader" },
  general: { id: "general", brand: "general", deckSet: "standard" },
};

/**
 * `general` is the fallback: unmatched hosts (Vercel previews), `localhost`,
 * `127.0.0.1`, and the node branch of the client resolver. `berau` is NOT
 * special — that flip is deliberate (spec §1.3).
 */
export const DEFAULT_VARIANT_ID: VariantId = "general";

/**
 * `hostname → VariantId`, so aliases, `localhost` and `127.0.0.1` are ordinary
 * entries rather than special cases in the resolution code.
 */
export const VARIANT_BY_HOST: Record<string, VariantId> = {
  "bc-presentation.vercel.app": "berau-middle-mgmt", // primary, already shared
  "bc-middle-mgmt-ai-workshop.vercel.app": "berau-middle-mgmt", // alias
  "bc-leader-ai-workshop.vercel.app": "berau-leader",
  "gems-middle-mgmt-ai-workshop.vercel.app": "gems-middle-mgmt",
  "gems-leader-ai-workshop.vercel.app": "gems-leader",
  "ai-catalyst-workshop.vercel.app": "general",
  localhost: "general",
  "127.0.0.1": "general",
};

export function isVariantId(value: unknown): value is VariantId {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(VARIANTS, value);
}

/**
 * Does this hostname have a row of its own?
 *
 * `resolveVariant` needs the row; the Edge gate needs the *answer*, because its
 * one extra step (the selector cookie for sub-resources, gh#30) applies only to
 * hosts with no row — a Vercel preview. Sharing the predicate keeps the
 * `hasOwnProperty` guard in one place; a bare lookup would treat a `__proto__`
 * or `constructor` Host header as mapped.
 */
export function isMappedHost(hostname?: string | null): boolean {
  return hostname != null && Object.prototype.hasOwnProperty.call(VARIANT_BY_HOST, hostname);
}

export interface VariantRequest {
  /** The `?variant=` query param, verbatim. Unknown values are ignored. */
  variantParam?: string | null;
  hostname?: string | null;
}

/**
 * THE resolution rule, applied identically on the client and at the Edge:
 * **explicit `?variant=` → explicit host → `general`.**
 *
 * The override exists because hostname-based logic would otherwise only be
 * testable in production; it lets any variant be checked on `localhost` or a
 * preview deployment.
 */
export function resolveVariant({ variantParam, hostname }: VariantRequest): Variant {
  if (isVariantId(variantParam)) return VARIANTS[variantParam];
  // `isMappedHost` (i.e. `hasOwnProperty`), not a bare lookup: a hostname of
  // `__proto__` or `constructor` is a legal URL host, and a bare lookup would
  // return an inherited member instead of falling through to the default.
  // Reachable from a request `Host` header, since middleware.ts shares this rule.
  const byHost = isMappedHost(hostname) ? VARIANT_BY_HOST[hostname as string] : undefined;
  return VARIANTS[byHost ?? DEFAULT_VARIANT_ID];
}

/**
 * Login eyebrow + title-slide workshop chip. The suffix appears HERE and
 * nowhere else — never on the tab title or the login page title, because the
 * two audiences sit on different domains and a tab distinction buys nothing.
 */
export function variantLabel({ brand, deckSet }: Pick<Variant, "brand" | "deckSet">): string {
  return `${BRANDS[brand].label}${DECK_SETS[deckSet].labelSuffix ?? ""}`;
}

/** The pre-auth login page's `<title>`. Brand-level, so never suffixed. */
export function loginTitle(brand: Brand): string {
  return `${BRANDS[brand].label} — Access`;
}

/**
 * The `type` hint for a `<link rel="icon">`. Some browsers skip an icon whose
 * declared type contradicts the file, and the brand favicons are not all PNG —
 * so both consumers (`brand-chrome.ts` in the app, the Edge login page) derive
 * the hint from the path here rather than each carrying its own copy.
 */
export function faviconType(path: string): string {
  return path.endsWith(".svg") ? "image/svg+xml" : "image/png";
}
