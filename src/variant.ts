// Deck variant selection — one build serves every variant; the domain decides.
// bc-presentation.vercel.app (and local dev) → "berau"; any other host (the
// general BU domain, Vercel preview URLs) → "general". A `?variant=` query
// param overrides the host rule so either variant can be checked on localhost
// or a preview deployment — without it, hostname-based logic would only be
// testable in production.
export type DeckVariant = "berau" | "general";

function resolve(): DeckVariant {
  if (typeof window === "undefined") return "berau"; // node (unit tests)
  const override = new URLSearchParams(window.location.search).get("variant");
  if (override === "berau" || override === "general") return override;
  const host = window.location.hostname;
  return host === "bc-presentation.vercel.app" ||
    host === "localhost" ||
    host === "127.0.0.1"
    ? "berau"
    : "general";
}

export const VARIANT: DeckVariant = resolve();
