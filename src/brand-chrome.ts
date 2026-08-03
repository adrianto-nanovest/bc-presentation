// Browser chrome that follows the brand: tab title + favicon.
//
// Applied UNCONDITIONALLY at boot (`src/main.tsx`), not as a per-variant
// re-brand. `index.html` ships the `general` default so the checked-in HTML
// matches the resolver's default, and every other brand overwrites it here.
// Kept out of `main.tsx` so it is reachable from a unit test — importing
// `main.tsx` would mount the whole app.
import { BRANDS, type Brand } from "./deck-variants";

/**
 * A `<link rel="icon">` whose `type` contradicts the file is skipped by some
 * browsers, and the brand favicons are not all PNG — so the hint is re-derived
 * from the path rather than left at `index.html`'s value.
 */
function faviconType(path: string): string {
  return path.endsWith(".svg") ? "image/svg+xml" : "image/png";
}

export function applyBrandChrome(brand: Brand, doc: Document): void {
  const { label, favicon } = BRANDS[brand];
  doc.title = label;

  const icon = doc.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!icon) return; // nothing to re-point; the title still applied
  icon.setAttribute("href", favicon);
  icon.setAttribute("type", faviconType(favicon));
}
