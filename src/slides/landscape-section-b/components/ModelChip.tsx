// ModelChip — chip showing a model name; lifts 2px and reveals "best for X"
// caption on hover. Used on B.3's task-row grid (and reused on B.4's tier
// ladder later).
//
// `glow` (optional) triggers the canonical-pose ambient pulse on B.3 step 5
// — a faint copper-200 box-shadow oscillates over a 1.6s loop to telegraph
// "you can hover these for more". Implemented as a CSS keyframe so it costs
// no React state and stops cleanly when the parent flips `glow` off.
import { useState, type CSSProperties } from "react";

export interface ModelChipProps {
  name: string;
  /** Tooltip shown on hover (e.g. "best for fastest code"). */
  bestFor: string;
  /** Faint copper ambient pulse — fires from B.3 step 5 onward. */
  glow?: boolean;
}

export function ModelChip({ name, bestFor, glow = false }: ModelChipProps) {
  const [h, setH] = useState(false);

  const chipStyle: CSSProperties = {
    position: "relative",
    display: "inline-block",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "6px 10px",
    border: `1px solid ${h ? "var(--copper-200)" : "var(--copper-700)"}`,
    background: h ? "rgba(217,158,108,0.08)" : "rgba(10,10,10,0.4)",
    color: h ? "var(--copper-100)" : "var(--neutral-200)",
    transform: h ? "translateY(-2px)" : "translateY(0)",
    transition:
      "transform 180ms var(--ease), border-color 180ms var(--ease), color 180ms var(--ease), background 180ms var(--ease), box-shadow 240ms var(--ease)",
    cursor: "default",
    // The ambient glow only applies when not hovered (hover wins to keep the
    // focus state crisp). Driven by inline CSS animation via a class hook.
    boxShadow: !h && glow ? "0 0 12px rgba(217,158,108,0.0)" : "none",
    animation: glow && !h ? "b3-chip-glow 1.6s ease-in-out infinite" : "none",
  };

  return (
    <span
      data-testid="model-chip"
      data-glow={glow ? "1" : "0"}
      data-hover={h ? "1" : "0"}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={chipStyle}
    >
      {name}
      {/* "best for X" caption — fades in beneath the chip on hover. */}
      <span
        data-testid="model-chip-bestfor"
        aria-hidden={!h}
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          marginTop: 4,
          whiteSpace: "nowrap",
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 12,
          color: "var(--copper-200)",
          textTransform: "none",
          letterSpacing: 0,
          pointerEvents: "none",
          opacity: h ? 1 : 0,
          transform: h ? "translateY(0)" : "translateY(-2px)",
          transition: "opacity 200ms var(--ease), transform 200ms var(--ease)",
        }}
      >
        best for {bestFor}
      </span>
    </span>
  );
}
