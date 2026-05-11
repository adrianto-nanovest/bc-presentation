// SectionPointerHover — a small "→ Section X" chip that slides in on hover.
// Used as an inline pointer next to each A.1 question. Presenter-controlled
// detail layer (see user memory: feedback_slide_interaction_conventions.md).
//
// Slide-in: ~150ms, translate-x 8px → 0 with fade. Mouse-leave → reverses.
// CSS-only transition — no Framer needed.
import type { CSSProperties } from "react";

export interface SectionPointerHoverProps {
  /** Pointer text, e.g. "→ Section F". */
  text: string;
  /** Whether to show the pointer. Default false (only on hover). */
  visible?: boolean;
}

export function SectionPointerHover({ text, visible = false }: SectionPointerHoverProps) {
  const style: CSSProperties = {
    display: "inline-block",
    fontFamily: "var(--mono)",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.22em",
    color: "var(--copper-300)",
    textTransform: "uppercase",
    marginLeft: 16,
    padding: "4px 8px",
    border: "1px solid var(--copper-800)",
    background: "rgba(184,110,61,0.06)",
    transform: visible ? "translateX(0)" : "translateX(-8px)",
    opacity: visible ? 1 : 0,
    transition: "transform 150ms var(--ease), opacity 150ms var(--ease)",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  };
  return (
    <span
      data-testid="section-pointer-hover"
      data-visible={visible ? "1" : "0"}
      style={style}
    >
      {text}
    </span>
  );
}
