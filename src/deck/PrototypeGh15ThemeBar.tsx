// PROTOTYPE gh#15 — light theme runtime toggle + variant switcher. THROWAWAY.
//
// Toggle contract being prototyped (issue #15 question 4):
//   t          — toggle dark ↔ light (modifier-guarded, input-guarded)
//   v          — cycle light variant A → B → C (only while light)
//   ?theme=    — URL override, wins over localStorage; kept in sync on toggle
//   ?ltv=      — URL override for the variant
//   localStorage("gh15-theme" / "gh15-ltv") — survives reload
//   <html data-theme data-lt-variant>       — survives slide nav (deck state
//                                             never touches the root attrs)
//
// The floating chrome pill is REMOVED: the deck is demoed from `npm run dev`,
// so no dev-only overlay may be visible on stage. The component renders
// nothing and only keeps the contract above alive — set the theme with
// `?theme=`/`?ltv=`, or with the keys. Deck arrow keys are taken by slide nav,
// so variant cycling deviates from the usual switcher convention and uses `v`.
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

// v2: variant C ("dark islands") dropped — rejected in first user review.
const VARIANTS = [
  { key: "A", name: "Copper on cream" },
  { key: "B", name: "Claude coral" },
] as const;

type VariantKey = (typeof VARIANTS)[number]["key"];

function readInitial(): { theme: Theme; variant: VariantKey } {
  const params = new URLSearchParams(window.location.search);
  const urlTheme = params.get("theme");
  const theme: Theme =
    urlTheme === "light" || urlTheme === "dark"
      ? urlTheme
      : localStorage.getItem("gh15-theme") === "light"
        ? "light"
        : "dark";
  // Resolution: accent B (Claude coral) locked by author review — default.
  const rawVariant = params.get("ltv") ?? localStorage.getItem("gh15-ltv") ?? "B";
  const variant = VARIANTS.some((v) => v.key === rawVariant)
    ? (rawVariant as VariantKey)
    : "B";
  return { theme, variant };
}

export function PrototypeGh15ThemeBar() {
  const [{ theme, variant }, setState] = useState(readInitial);

  // The stylesheet is pulled in on demand rather than imported at the top of
  // the module: a static CSS import is a side effect that no bundler can shake
  // out, so it would ship the whole light theme to production. import.meta.env
  // .DEV is statically false in a build, so this call is dropped instead.
  useEffect(() => {
    if (import.meta.env.DEV) {
      import("../styles/prototype-gh15-light-theme.css");
    }
  }, []);

  // Apply to <html> + persist. Root attrs are untouched by deck navigation,
  // which is exactly the "survives slide nav" property being proven.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.ltVariant = variant;
    localStorage.setItem("gh15-theme", theme);
    localStorage.setItem("gh15-ltv", variant);
    const url = new URL(window.location.href);
    url.searchParams.set("theme", theme);
    url.searchParams.set("ltv", variant);
    window.history.replaceState(null, "", url);
  }, [theme, variant]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
      } else if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        setState((s) =>
          s.theme === "light" ? { ...s, variant: nextVariant(s.variant, 1) } : s,
        );
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return null;
}

function nextVariant(current: VariantKey, dir: 1 | -1): VariantKey {
  const i = VARIANTS.findIndex((v) => v.key === current);
  return VARIANTS[(i + dir + VARIANTS.length) % VARIANTS.length].key;
}
