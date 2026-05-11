// EraNode — circle marker on B.1's timeline. Circle (~64px) with an embedded
// SVG glyph; era label above (Inter caps); year range + plain caption below
// (Source Serif 4 italic + neutral copy).
//
// Sizes were tuned for 1280×720 stage and 6 nodes spread across ~960px.
// `dimmed` toggles the AGI variant — dashed border, lower opacity.
// `active` toggles the "WE ARE HERE" stage (slightly brighter stroke).
import type { CSSProperties, ReactNode } from "react";

export interface EraNodeProps {
  glyph: ReactNode;
  label: string;
  years: string;
  caption: ReactNode;
  /** Stage 5 — brighter stroke + reserved for the WE ARE HERE marker. */
  active?: boolean;
  /** Stage 6 — dashed border, dimmed text (AGI forecast). */
  dimmed?: boolean;
  /** Reveal gate — fade + slight rise when true. */
  on?: boolean;
  /** Optional stagger delay (ms). */
  delay?: number;
}

const NODE_DIAMETER = 64;

export function EraNode({
  glyph,
  label,
  years,
  caption,
  active = false,
  dimmed = false,
  on = true,
  delay = 0,
}: EraNodeProps) {
  const strokeColor = active
    ? "var(--copper-300)"
    : dimmed
      ? "var(--copper-700)"
      : "var(--copper-600)";
  const borderStyle = dimmed ? "dashed" : "solid";

  const containerStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 168,
    opacity: on ? (dimmed ? 0.55 : 1) : 0,
    transform: on ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 500ms var(--ease), transform 500ms var(--ease)",
    transitionDelay: on ? `${delay}ms` : "0ms",
    willChange: "opacity, transform",
  };

  return (
    <div
      data-testid="era-node"
      data-active={active ? "1" : "0"}
      data-dimmed={dimmed ? "1" : "0"}
      data-on={on ? "1" : "0"}
      style={containerStyle}
    >
      {/* Era label — Inter caps, above the circle. Fixed height ensures all
          6 nodes' circles align horizontally regardless of 1-line vs 2-line
          labels. */}
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 9.5,
          letterSpacing: "0.22em",
          color: active ? "var(--copper-200)" : "var(--copper-300)",
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.25,
          height: 30,
          maxWidth: 160,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {label}
      </span>

      {/* Circle with embedded glyph */}
      <div
        style={{
          marginTop: 6,
          width: NODE_DIAMETER,
          height: NODE_DIAMETER,
          borderRadius: 999,
          border: `1px ${borderStyle} ${strokeColor}`,
          background: "rgba(10,10,10,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: active
            ? "var(--copper-200)"
            : dimmed
              ? "var(--copper-700)"
              : "var(--copper-300)",
          flexShrink: 0,
        }}
      >
        {glyph}
      </div>

      {/* Year range */}
      <span
        style={{
          marginTop: 8,
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: "0.16em",
          color: "var(--neutral-500)",
          textTransform: "uppercase",
        }}
      >
        {years}
      </span>

      {/* Plain caption */}
      <span
        style={{
          marginTop: 4,
          fontFamily: "var(--serif)",
          fontSize: 12,
          color: dimmed ? "var(--neutral-500)" : "var(--neutral-300)",
          textAlign: "center",
          lineHeight: 1.35,
          maxWidth: 168,
        }}
      >
        {caption}
      </span>
    </div>
  );
}

export const ERA_NODE_DIAMETER = NODE_DIAMETER;
