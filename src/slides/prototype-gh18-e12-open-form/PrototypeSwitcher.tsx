// PROTOTYPE — throwaway. Floating variant switcher.
//
// Deliberately ugly and un-copper: it must never be mistaken for part of the
// design under evaluation. Lives inside this prototype folder rather than
// src/components/ so the whole prototype is one deletable directory (and so it
// does not collide with the sibling prototypes running in parallel).
//
// Must be rendered OUTSIDE `.stage-wrap` — that element carries a `transform`,
// which makes it the containing block for `position: fixed` children and would
// scale the bar along with the slide.
import { useEffect } from "react";

export interface PrototypeSwitcherProps {
  keys: readonly string[];
  names: Readonly<Record<string, string>>;
  current: string;
  onChange: (next: string) => void;
  /** Extra line shown under the label — e.g. the current step. */
  status?: string;
}

export function PrototypeSwitcher({
  keys,
  names,
  current,
  onChange,
  status,
}: PrototypeSwitcherProps) {
  // Never ship the bar, even if a prototype branch is merged by accident.
  const hidden = import.meta.env.PROD;

  const cycle = (delta: number) => {
    const i = keys.indexOf(current);
    const next = keys[(i + delta + keys.length) % keys.length];
    onChange(next);
  };

  useEffect(() => {
    if (hidden) return undefined;
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t?.isContentEditable ||
        t?.tagName === "INPUT" ||
        t?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowRight") cycle(1);
      else if (e.key === "ArrowLeft") cycle(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, keys, hidden]);

  if (hidden) return null;

  return (
    <div
      data-no-advance=""
      style={{
        position: "fixed",
        bottom: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "stretch",
        gap: 1,
        background: "rgb(20,20,20)",
        border: "1px solid rgb(90,90,90)",
        borderRadius: 999,
        padding: 4,
        boxShadow: "0 10px 30px -6px rgba(0,0,0,0.8)",
        fontFamily: "ui-monospace, monospace",
        userSelect: "none",
      }}
    >
      <button onClick={() => cycle(-1)} style={arrowStyle} aria-label="previous variant">
        ←
      </button>
      <div
        style={{
          minWidth: 300,
          padding: "4px 16px",
          textAlign: "center",
          color: "rgb(240,240,240)",
          lineHeight: 1.25,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600 }}>
          {current} — {names[current] ?? "?"}
        </div>
        <div style={{ fontSize: 10, color: "rgb(150,150,150)" }}>
          {status ? `${status} · ` : ""}← → variant · Space step · PROTOTYPE gh#18
        </div>
      </div>
      <button onClick={() => cycle(1)} style={arrowStyle} aria-label="next variant">
        →
      </button>
    </div>
  );
}

const arrowStyle: React.CSSProperties = {
  width: 38,
  border: "none",
  borderRadius: 999,
  background: "rgb(45,45,45)",
  color: "rgb(240,240,240)",
  fontSize: 15,
  cursor: "pointer",
  fontFamily: "inherit",
};
