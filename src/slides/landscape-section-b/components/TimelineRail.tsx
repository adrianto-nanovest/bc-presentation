// TimelineRail — horizontal copper rail spanning all 6 era nodes.
//
// Renders as:
//   1. A dim base rail (always present once the slide mounts) spanning the
//      full distance from node-1 to node-5. This grounds the layout so the
//      audience reads the journey as continuous even before reveals fire.
//   2. Bright copper segments brightened one-by-one as `progress` advances.
//      `progress` is the fraction of solid segments revealed (0..1, in steps
//      of 1/4 for the 4 segments between nodes 1→5).
//   3. A dashed AGI tail from node-5 → node-6, drawn only when `dashedOn`.
//
// Geometry is pixel-space; the host slide positions us at (left, top).
import type { CSSProperties } from "react";

export interface TimelineRailProps {
  /** Pixel length of the solid portion (node-1 center → node-5 center). */
  length: number;
  /** Pixel length of the dashed AGI tail (node-5 → node-6). */
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

  // Bright copper segment: a moving dash-offset reveals length × progress.
  const solidVisible = length * Math.max(0, Math.min(1, progress));

  return (
    <div data-testid="timeline-rail" style={containerStyle}>
      <svg
        width={totalWidth}
        height={2}
        viewBox={`0 0 ${totalWidth} 2`}
        style={{ display: "block", overflow: "visible" }}
        aria-hidden
      >
        {/* Dim base rail — always visible, full solid span. Carries the eye. */}
        <line
          x1={0}
          y1={1}
          x2={length}
          y2={1}
          stroke="var(--copper-700)"
          strokeWidth="1"
          opacity={0.55}
        />
        {/* Bright segment — grows in proportion to `progress`. */}
        <line
          x1={0}
          y1={1}
          x2={length}
          y2={1}
          stroke="var(--copper-300)"
          strokeWidth="1"
          strokeDasharray={`${solidVisible} ${length}`}
          style={{
            transition: "stroke-dasharray 600ms var(--ease)",
          }}
        />
        {/* Dashed AGI tail — appears only when dashedOn. */}
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
