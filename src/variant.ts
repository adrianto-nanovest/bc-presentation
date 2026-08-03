// Client-side variant resolution. The rule and the table live in
// `./deck-variants`, which `middleware.ts` shares at the Edge; this file only
// supplies the browser's half of the input — `?variant=` and the hostname — so
// the rule itself stays testable without a DOM.
//
// One build serves every variant; the domain decides. `?variant=` overrides the
// host rule so any variant can be checked on localhost or a preview deployment
// — without it, hostname-based logic would only be testable in production.
import { resolveVariant, type Variant } from "./deck-variants";

export function resolveClientVariant(): Variant {
  // node (unit tests, export scripts): no location to read, so the shared
  // default applies — `general`.
  if (typeof window === "undefined") return resolveVariant({});
  return resolveVariant({
    variantParam: new URLSearchParams(window.location.search).get("variant"),
    hostname: window.location.hostname,
  });
}

/** The variant this page is serving: `{ id, brand, deckSet }`. */
export const VARIANT: Variant = resolveClientVariant();
