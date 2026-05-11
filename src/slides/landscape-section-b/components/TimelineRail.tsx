// TimelineRail — horizontal copper line that draws stage-by-stage. Used as
// the spine of B.1's evolution timeline.
//
// Rendered as a single SVG line with strokeDasharray = total length, and
// strokeDashoffset reduced proportionally as `progress` increases (0..1).
// A second optional dashed segment renders the AGI tail when `dashedTail` is
// non-zero — that draws in only on the final stage (AGI reveal).
import type { CSSProperties } from "react";

export interface TimelineRailProps {
  /** Pixel length of the full rail (left node center → last node center). */
  length: number;
  /** Pixel length of the dashed tail (last node-1 → AGI node), if any. */
  dashedTailLength?: number;
  /** Solid portion progress, 0..1. */
  progress: number;
  /** When true, dashed tail is drawn. */
  dashedOn?: boolean;
  /** Vertical baseline (stage coord). */
  top: number;
  /** Left edge of the rail (stage coord). */
  left: number;
}

export function TimelineRail({
  length,
  dashedTailLength = 0,
  progress,
  dashedOn = false,
  top,
  left,
}: TimelineRailProps) {
  const totalWidth = length + dashedTailLength;

  const containerStyle: CSSProperties = {
    position: "absolute",
    left,
    top,
    width: totalWidth,
    height: 2,
    zIndex: 2,
    pointerEvents: "none",
  };

  // Solid copper-300 portion: strokeDasharray = length, dashoffset draws in.
  const solidDashoffset = length * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <div data-testid="timeline-rail" style={containerStyle}>
      <svg
        width={totalWidth}
        height={2}
        viewBox={`0 0 ${totalWidth} 2`}
        style={{ display: "block", overflow: "visible" }}
        aria-hidden
      >
        {/* Solid segment — runs from node-1 center to node-5 center */}
        <line
          x1={0}
          y1={1}
          x2={length}
          y2={1}
          stroke="var(--copper-300)"
          strokeWidth="1"
          strokeDasharray={length}
          strokeDashoffset={solidDashoffset}
          style={{
            transition: "stroke-dashoffset 600ms var(--ease)",
          }}
        />
        {/* Dashed tail — appears only when dashedOn (AGI step). */}
        {dashedTailLength > 0 && (
          <line
            x1={length}
            y1={1}
            x2={length + dashedTailLength}
            y2={1}
            stroke="var(--copper-700)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={dashedOn ? 1 : 0}
            style={{
              transition: "opacity 500ms var(--ease)",
            }}
          />
        )}
      </svg>
    </div>
  );
}
