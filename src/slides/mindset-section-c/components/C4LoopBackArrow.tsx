// C4LoopBackArrow — dotted recursive arrow that loops from VERIFY's
// bottom-right back to SPECIFY's bottom-left on C.4's V-diagram. Animates
// `pathLength` 0 → 1 on `on=true`. After the path completes, the `iterate`
// label fades in. Reverses cleanly when `on=false`.
//
// Coordinate system: the SVG fills its container at 100% × 100% and uses the
// SAME 1000×400 viewBox as VWorkflowDiagram so its path coordinates align
// directly with the diagram's internal node positions. The wrapper element
// is positioned with `inset: 0` over the same flex item that holds the
// VWorkflowDiagram's main SVG, so meet-fit aspect resolves identically.
//
// VWorkflowDiagram nodes (in 1000×400 viewBox units):
//   SPECIFY  center=(230, 90)  bottom-left=(130, 122)
//   VERIFY   center=(770, 90)  bottom-right=(870, 122)
//   GENERATE center=(500, 280) bottom-center=(500, 312)
//
// The arc starts at VERIFY's bottom-right corner, dips below GENERATE (apex
// near y=360) and lands at SPECIFY's bottom-left corner with an arrowhead.
// `overflow: visible` keeps the arc visible if its apex extends slightly
// beyond the nominal 400-tall viewBox bottom edge.

import type { CSSProperties } from "react";
import { motion } from "framer-motion";

export interface C4LoopBackArrowProps {
  on: boolean;
  style?: CSSProperties;
}

// Path: VERIFY bottom-right (870, 122) → control (500, 720) → SPECIFY
// bottom-left (130, 122). Quadratic apex at (500, 421) — sits well below
// GENERATE's bottom edge (y=312) so the arc clearly clears the trough
// node. The diagram SVG has `overflow: visible` so apex y values beyond
// the nominal 400-tall viewBox bottom render correctly.
const PATH_D = "M 870 122 Q 500 720 130 122";

// Arrowhead at SPECIFY end (pointing down-left, tangent of curve at t=1).
// Tangent direction at t=1 for Q(P0,P1,P2): 2*(P2-P1) → pointing up-and-
// left toward control. So the arrowhead tip sits at (130, 122) with its
// base offset back along the curve's incoming tangent so it reads as an
// arrowhead pointing into SPECIFY's corner.
const ARROW_HEAD_POINTS = "130,122 146,114 144,132";

// `iterate` label sits below the apex (y≈421). Place it at y=448 so the
// dotted curve passes above the text without overlap.
const LABEL_X = 500;
const LABEL_Y = 448;

export function C4LoopBackArrow({ on, style }: C4LoopBackArrowProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 400"
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "visible",
        ...style,
      }}
      data-testid="c4-loopback-arrow"
    >
      {/* Dotted curve. Reveal via pathLength 0→1 on `on`. */}
      <motion.path
        d={PATH_D}
        stroke="var(--copper-700)"
        strokeWidth={1.5}
        strokeDasharray="4 6"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: on ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Arrowhead at SPECIFY side. Fades in alongside the path. */}
      <motion.polygon
        points={ARROW_HEAD_POINTS}
        fill="var(--copper-700)"
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ delay: on ? 0.45 : 0, duration: 0.2 }}
      />

      {/* `iterate` label at curve midpoint — appears 200ms after path
          completes. */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ delay: on ? 0.7 : 0, duration: 0.3 }}
      >
        <text
          x={LABEL_X}
          y={LABEL_Y}
          fill="var(--copper-300)"
          fontFamily="var(--mono)"
          fontSize={11}
          letterSpacing="0.22em"
          textAnchor="middle"
          style={{ textTransform: "uppercase" }}
        >
          ITERATE
        </text>
      </motion.g>
    </svg>
  );
}

export default C4LoopBackArrow;
