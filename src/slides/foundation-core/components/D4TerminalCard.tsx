// Right-column terminal card on slide D.4 — abbrev (e.g. "RPA") + Q-from
// chip ("Q3 · YES") + sub line. Hover state is lifted to the slide so that
// hovering one terminal can heat the matching YES/NO branch in the ladder
// (see D4Ladder).
//
// The slide computes which question produced this terminal (yesTerminal /
// noTerminal) and passes branch + qNum down so this component stays free of
// data-shape assumptions about the questions array.
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:1052-1077`.
import type { CSSProperties } from "react";
import type { D4Terminal, D4TerminalKey } from "../content";

export interface D4TerminalCardProps {
  abbrev: D4TerminalKey;
  terminal: D4Terminal;
  /** Question number that produced this terminal (e.g. 3 for RPA → Q3). */
  qNum: number | null;
  /** Branch label — "YES" or "NO". */
  branch: "YES" | "NO";
  /** True when the slide-owned hover key matches this terminal. */
  isHover: boolean;
  /** True once the deck has revealed the question that produced this terminal. */
  on: boolean;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
}

export function D4TerminalCard({
  abbrev,
  terminal,
  qNum,
  branch,
  isHover,
  on,
  onHoverEnter,
  onHoverLeave,
}: D4TerminalCardProps) {
  const accent = `var(--${terminal.copper})`;

  const cardStyle: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    width: "100%",
    padding: "10px 14px",
    border: `1px solid ${isHover ? "var(--copper-200)" : accent}`,
    background: isHover ? "rgba(184,110,61,0.10)" : "rgba(10,10,10,0.7)",
    boxShadow: isHover ? `0 0 0 1px ${accent} inset` : "none",
    opacity: on ? 1 : 0.25,
    transition:
      "opacity 0.4s var(--ease), border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease)",
    cursor: "default",
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", minHeight: 0 }}
    >
      <div
        data-testid="d4-terminal-card"
        data-terminal-key={abbrev}
        data-on={on ? "true" : "false"}
        data-hovered={isHover ? "true" : "false"}
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
        style={cardStyle}
      >
        <div style={{ flex: "0 0 112px" }}>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 22,
              color: "var(--neutral-50)",
              lineHeight: 1,
            }}
          >
            {abbrev}
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: "0.18em",
              color: "var(--copper-500)",
              textTransform: "uppercase",
              marginTop: 3,
              whiteSpace: "nowrap",
            }}
          >
            Q{qNum ?? "–"} · {branch}
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: 13,
            color: "var(--neutral-300)",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {terminal.sub}
        </p>
      </div>
    </div>
  );
}
