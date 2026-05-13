// CopperArrow — animated arrow with pathLength. Used on C.2 between
// FearPanel → LeveragePanel and on C.4 between VWorkflowDiagram → Ship.
//
// Scaffolded as a simple SVG arrow with stroke-dash growth. Later tasks
// will tune timing / curvature.

export interface CopperArrowProps {
  /** "→" direction. Default horizontal-right. */
  direction?: "right" | "down";
  /** Whether the arrow has drawn in. */
  on?: boolean;
  length?: number;
  duration?: number;
  /** Optional delay (ms) before the stroke begins drawing — used on C.2
   *  to stagger the arrow inside a combined step (T+300 after strike). */
  delay?: number;
}

export function CopperArrow({
  direction = "right",
  on = true,
  length = 60,
  duration = 520,
  delay = 0,
}: CopperArrowProps) {
  const isHorizontal = direction === "right";
  const w = isHorizontal ? length : 12;
  const h = isHorizontal ? 12 : length;
  const path = isHorizontal
    ? `M0 6 L${length - 8} 6 M${length - 12} 2 L${length - 4} 6 L${length - 12} 10`
    : `M6 0 L6 ${length - 8} M2 ${length - 12} L6 ${length - 4} L10 ${length - 12}`;
  return (
    <svg
      data-testid="copper-arrow"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      <path
        d={path}
        stroke="var(--copper-400)"
        strokeWidth="1.4"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={on ? 0 : 1}
        style={{
          transition: `stroke-dashoffset ${duration}ms var(--ease) ${delay}ms`,
        }}
      />
    </svg>
  );
}
