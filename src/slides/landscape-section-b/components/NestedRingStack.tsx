// NestedRingStack — five concentric SVG circles for B.2's taxonomic nest.
// Adapted from foundation-core-section-e/components/RingStack.tsx; here all
// five rings are present at once and `focusIndex` only swaps brightness +
// glow.
//
// Two label-position modes:
//   - "focal"   — short horizontal mono caps label hangs off the upper-left
//                 of each ring (anchored at 225° on the circle) with a thin
//                 copper rule dropping into the ring stroke. focusIndex
//                 brightens one ring. (Steps 0..4)
//   - "summary" — all five rings full-opacity copper-400; labels sit INSIDE
//                 each ring near its top, centered on the ring's center.x.
//                 Hovering a ring or its in-ring label lifts hoveredTier
//                 (1..5) to the slide for cross-side highlighting. (Step 5)
//
// The two label sets cross-fade via opacity when `mode` flips.
import type { CSSProperties } from "react";

export type NestedRingMode = "focal" | "summary";

export interface NestedRingStackProps {
  /** 0..4 — which ring is focal (0=outermost AI, 4=innermost LLM). */
  focusIndex: 0 | 1 | 2 | 3 | 4 | null;
  width: number;
  height: number;
  /** Short labels (e.g. "AI", "ML") — one per ring, outer-to-inner. */
  labels: readonly string[];
  /** Render mode — defaults to "focal" (steps 0..4). */
  mode?: NestedRingMode;
  /** In "summary" mode: which tier (1..5) is currently hovered, or null. */
  hoveredTier?: number | null;
  /** Called when a ring/label is hovered in "summary" mode. */
  onHoverTier?: (tier: number | null) => void;
  /** Optional override labels for summary in-ring placement (per-ring). */
  summaryLabels?: readonly string[];
}

interface RingSpec {
  diameter: number;
  /** Vertical offset of the label band above the ring (px). */
  labelLift: number;
}

const RINGS: readonly RingSpec[] = [
  { diameter: 460, labelLift: 22 },
  { diameter: 380, labelLift: 20 },
  { diameter: 300, labelLift: 18 },
  { diameter: 220, labelLift: 16 },
  { diameter: 140, labelLift: 14 },
];

export function NestedRingStack({
  focusIndex,
  width,
  height,
  labels,
  mode = "focal",
  hoveredTier = null,
  onHoverTier,
  summaryLabels,
}: NestedRingStackProps) {
  const cx = width / 2;
  const cy = height / 2;
  const isSummary = mode === "summary";

  return (
    <div
      data-testid="nested-ring-stack"
      data-focus={focusIndex == null ? "none" : String(focusIndex)}
      data-mode={mode}
      data-hovered-tier={hoveredTier == null ? "none" : String(hoveredTier)}
      style={{
        position: "relative",
        width,
        height,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ display: "block", overflow: "visible" }}
        aria-hidden
      >
        {RINGS.map((ring, i) => {
          const tier = i + 1;
          const focal = !isSummary && focusIndex === i;
          const summaryHover = isSummary && hoveredTier === tier;
          const innermost = i === 4;
          const r = ring.diameter / 2;

          let stroke = "var(--copper-800)";
          if (isSummary) {
            stroke = summaryHover ? "var(--copper-200)" : "var(--copper-400)";
          } else if (focal) {
            stroke = "var(--copper-400)";
          }
          const strokeWidth = focal || summaryHover ? 1.5 : 1;

          const ambientHalo = focal && innermost;
          let baseFilter: string = "none";
          if (focal) baseFilter = "drop-shadow(0 0 8px rgba(217,158,108,0.4))";
          else if (summaryHover)
            baseFilter = "drop-shadow(0 0 10px rgba(217,158,108,0.5))";

          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
              pointerEvents={isSummary ? "stroke" : "none"}
              onMouseEnter={
                isSummary && onHoverTier ? () => onHoverTier(tier) : undefined
              }
              onMouseLeave={
                isSummary && onHoverTier ? () => onHoverTier(null) : undefined
              }
              style={{
                transition:
                  "stroke 200ms var(--ease), stroke-width 200ms var(--ease), filter 200ms var(--ease)",
                filter: baseFilter,
                animation: ambientHalo
                  ? "b2-llm-glow 4s ease-in-out infinite"
                  : "none",
                cursor: isSummary ? "default" : undefined,
              }}
            />
          );
        })}
      </svg>

      {/* Focal-mode labels (hanging upper-left). Cross-fades to 0 in summary. */}
      {RINGS.map((ring, i) => {
        const focal = focusIndex === i;
        const r = ring.diameter / 2;
        const angle = (225 * Math.PI) / 180;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        const labelTop = py - ring.labelLift;
        const labelStyle: CSSProperties = {
          position: "absolute",
          left: px - 4,
          top: labelTop,
          transform: "translate(-100%, -100%)",
          fontFamily: "var(--mono)",
          fontSize: 10.5,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          lineHeight: 1.1,
          color: focal ? "var(--copper-200)" : "var(--neutral-500)",
          transition: "color 400ms var(--ease)",
          pointerEvents: "none",
        };
        const connectorStyle: CSSProperties = {
          position: "absolute",
          left: px,
          top: labelTop,
          width: 1,
          height: py - labelTop,
          background: focal ? "var(--copper-400)" : "var(--copper-800)",
          transition: "background 400ms var(--ease)",
          pointerEvents: "none",
        };
        return (
          <div
            key={`label-${i}`}
            data-testid={`ring-label-${i}`}
            style={{
              opacity: isSummary ? 0 : 1,
              transition: "opacity 250ms var(--ease)",
              pointerEvents: isSummary ? "none" : "auto",
            }}
          >
            <span style={labelStyle}>{labels[i]}</span>
            <span aria-hidden style={connectorStyle} />
          </div>
        );
      })}

      {/* Summary-mode in-ring labels. Cross-fades from 0 in focal mode. */}
      {RINGS.map((_ring, i) => {
        const tier = i + 1;
        const nextInnerR = i < RINGS.length - 1 ? RINGS[i + 1].diameter / 2 : 0;
        // Position label INSIDE this ring, just above the next inner ring's
        // stroke (so it sits in the band between this ring and the next one).
        // For the innermost ring (i==4) we center inside the circle.
        const isInnermost = i === RINGS.length - 1;
        const labelY = isInnermost
          ? cy
          : cy - nextInnerR - 14;
        const summaryHover = hoveredTier === tier;
        const text =
          (summaryLabels && summaryLabels[i]) ?? labels[i] ?? "";

        const labelStyle: CSSProperties = {
          position: "absolute",
          left: cx,
          top: labelY,
          transform: `translate(-50%, ${isInnermost ? "-50%" : "-50%"}) ${summaryHover ? "scale(1.04)" : "scale(1)"}`,
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          lineHeight: 1.1,
          textAlign: "center",
          color: summaryHover ? "var(--copper-100)" : "var(--copper-300)",
          transition:
            "color 200ms var(--ease), transform 200ms var(--ease), opacity 250ms var(--ease)",
          opacity: isSummary ? 1 : 0,
          pointerEvents: isSummary ? "auto" : "none",
          cursor: "default",
          padding: "2px 6px",
          // Reserve a small dark backdrop so text reads cleanly between strokes
          background: isSummary ? "rgba(10,10,10,0.55)" : "transparent",
        };

        return (
          <span
            key={`summary-label-${i}`}
            data-testid={`ring-label-summary-${i}`}
            data-hovered={summaryHover ? "true" : "false"}
            onMouseEnter={
              isSummary && onHoverTier ? () => onHoverTier(tier) : undefined
            }
            onMouseLeave={
              isSummary && onHoverTier ? () => onHoverTier(null) : undefined
            }
            style={labelStyle}
          >
            {text}
          </span>
        );
      })}
    </div>
  );
}
