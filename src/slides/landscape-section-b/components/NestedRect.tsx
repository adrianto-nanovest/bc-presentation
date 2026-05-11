// NestedRect — one of B.2's 5 nested rectangles. Renders an SVG rect whose
// stroke animates in via pathLength (strokeDasharray / strokeDashoffset).
//
// Geometry: 0px corners (sharp) — circles are reserved for E.1's Russian-doll
// Prompt/Context/Harness metaphor.
//
// Stroke gradient pulls eye INWARD to the LLM core (tier 5):
//   tier 1 → 1px copper-700 (dimmest)
//   tier 5 → 2px copper-400 (brightest), optional ambient glow halo.
import { type CSSProperties } from "react";

export interface NestedRectProps {
  tier: 1 | 2 | 3 | 4 | 5;
  /** Rectangle width (px). */
  width: number;
  /** Rectangle height (px). */
  height: number;
  /** Whether stroke is visible (revealed). */
  on?: boolean;
  /** Optional reveal delay (ms). */
  delay?: number;
  /** Ambient copper glow halo for the innermost tier. */
  glow?: boolean;
}

// Per-tier stroke style. Inner = brighter and thicker so the eye is drawn in.
const tierStroke: Record<NestedRectProps["tier"], { color: string; width: number }> = {
  1: { color: "var(--copper-700)", width: 1 },
  2: { color: "var(--copper-600)", width: 1 },
  3: { color: "var(--copper-500)", width: 1.5 },
  4: { color: "var(--copper-400)", width: 1.5 },
  5: { color: "var(--copper-400)", width: 2 },
};

export function NestedRect({
  tier,
  width,
  height,
  on = true,
  delay = 0,
  glow = false,
}: NestedRectProps) {
  const stroke = tierStroke[tier];
  // Perimeter — used for strokeDasharray/strokeDashoffset pathLength draw.
  const perimeter = (width + height) * 2;

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    left: `calc(50% - ${width / 2}px)`,
    top: `calc(50% - ${height / 2}px)`,
    width,
    height,
    pointerEvents: "none",
  };

  return (
    <div
      data-testid={`nested-rect-${tier}`}
      data-on={on ? "1" : "0"}
      data-glow={glow ? "1" : "0"}
      style={wrapperStyle}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          display: "block",
          overflow: "visible",
          // Innermost gets a slow copper glow halo via filter-drop-shadow,
          // animated through the inline b2-llm-glow keyframe below.
          filter:
            glow && on
              ? "drop-shadow(0 0 6px rgba(201,133,72,0.45))"
              : "none",
          animation:
            glow && on ? "b2-llm-glow 4s ease-in-out infinite" : "none",
          transition: "filter 400ms var(--ease)",
        }}
        aria-hidden
      >
        <rect
          x={stroke.width / 2}
          y={stroke.width / 2}
          width={width - stroke.width}
          height={height - stroke.width}
          fill="none"
          stroke={stroke.color}
          strokeWidth={stroke.width}
          strokeDasharray={perimeter}
          strokeDashoffset={on ? 0 : perimeter}
          style={{
            transition: `stroke-dashoffset 600ms var(--ease)`,
            transitionDelay: on ? `${delay}ms` : "0ms",
          }}
        />
      </svg>
    </div>
  );
}
