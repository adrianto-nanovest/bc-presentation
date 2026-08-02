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
// The floating bar is prototype chrome, not deck design — high-contrast pill,
// hidden in production builds. Deck arrow keys are taken by slide nav, so
// variant cycling deviates from the usual switcher convention and uses `v`.
import { useEffect, useState } from "react";
import "../styles/prototype-gh15-light-theme.css";

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
  const rawVariant = params.get("ltv") ?? localStorage.getItem("gh15-ltv") ?? "A";
  const variant = VARIANTS.some((v) => v.key === rawVariant)
    ? (rawVariant as VariantKey)
    : "A";
  return { theme, variant };
}

export function PrototypeGh15ThemeBar() {
  const [{ theme, variant }, setState] = useState(readInitial);

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

  if (import.meta.env.PROD) return null;

  const current = VARIANTS.find((v) => v.key === variant)!;
  const cycle = (dir: 1 | -1) =>
    setState((s) => ({ ...s, variant: nextVariant(s.variant, dir) }));

  return (
    <div style={barStyle} data-no-advance>
      <span style={tagStyle}>gh#15</span>
      <button
        style={buttonStyle}
        onClick={() =>
          setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }))
        }
        title="Toggle theme (T)"
      >
        {theme === "dark" ? "☾ dark" : "☀ light"}
      </button>
      {theme === "light" && (
        <>
          <button style={buttonStyle} onClick={() => cycle(-1)} title="Previous variant">
            {"‹"}
          </button>
          <span style={labelStyle}>
            {current.key} — {current.name}
          </span>
          <button style={buttonStyle} onClick={() => cycle(1)} title="Next variant (V)">
            {"›"}
          </button>
        </>
      )}
      <span style={hintStyle}>T theme · V variant</span>
    </div>
  );
}

function nextVariant(current: VariantKey, dir: 1 | -1): VariantKey {
  const i = VARIANTS.findIndex((v) => v.key === current);
  return VARIANTS[(i + dir + VARIANTS.length) % VARIANTS.length].key;
}

// Deliberately NOT deck-styled: neutral charcoal pill so it never reads as
// part of the design under evaluation, in either theme.
const barStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 16,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 999,
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 14px",
  borderRadius: 999,
  background: "#26242b",
  color: "#f4f4f5",
  fontFamily: "system-ui, sans-serif",
  fontSize: 13,
  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
};

const tagStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#9d9aa6",
};

const buttonStyle: React.CSSProperties = {
  background: "#3b3844",
  color: "#f4f4f5",
  border: "none",
  borderRadius: 999,
  padding: "4px 10px",
  fontSize: 13,
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  minWidth: 170,
  textAlign: "center",
};

const hintStyle: React.CSSProperties = {
  fontSize: 10,
  color: "#9d9aa6",
};
