// C4LoopBackArrow — straight horizontal dotted "iterate" line that runs
// underneath the V-diagram from below VERIFY (right) to below SPECIFY
// (left), with a small filled triangular arrowhead at the SPECIFY end
// and a trio of staggered traveling copper pulses (right → left) that
// mirror the V-arrow pulse pattern in VWorkflowDiagram.
//
// Endpoint fractions are pinned to the v5 compact V-diagram fractions
// (SPECIFY 0.20 / GENERATE 0.42 / VERIFY 0.64 / SHIP 0.86); the iterate
// line runs from under VERIFY (64%) to under SPECIFY (20%) with the
// label centered above GENERATE (42%).
//
// `on` gates both the static line/label/arrow fade and the pulse SVG —
// when false, the pulses are not rendered so unmounted slides don't keep
// animations running.

import type { CSSProperties } from "react";
import { motion } from "framer-motion";

export interface C4LoopBackArrowProps {
  on: boolean;
  style?: CSSProperties;
}

// Layout — y as % of container height, x as % of container width. y=90
// puts the line well below GENERATE's bottom edge.
//
// v5 horizontal anchors (matching VWorkflowDiagram SPEC/GEN/VER fractions
// 0.20 / 0.42 / 0.64): the iterate line runs underneath the V from below
// VERIFY (right, 64%) to below SPECIFY (left, 20%); the LABEL centers
// above GENERATE (42%) so the word sits directly above the V trough.
const LINE_Y_PCT = 90;
const LINE_X_RIGHT_PCT = 64;
const LINE_X_LEFT_PCT = 20;
const LABEL_X_PCT = 42;

export function C4LoopBackArrow({ on, style }: C4LoopBackArrowProps) {
  const transition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div
      data-testid="c4-loopback-arrow"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      {/* Dotted horizontal line. Implemented as a thin div with a
          repeating dashed border-top. Width and position computed in % so
          it scales with the diagram container. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={transition}
        style={{
          position: "absolute",
          left: `${LINE_X_LEFT_PCT}%`,
          top: `${LINE_Y_PCT}%`,
          width: `${LINE_X_RIGHT_PCT - LINE_X_LEFT_PCT}%`,
          borderTop: "1.5px dashed var(--copper-700)",
          transform: "translateY(-50%)",
        }}
      />

      {/* Triangle arrowhead at SPECIFY (left) end — drawn via CSS borders */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={transition}
        style={{
          position: "absolute",
          left: `${LINE_X_LEFT_PCT}%`,
          top: `${LINE_Y_PCT}%`,
          width: 0,
          height: 0,
          transform: "translate(-100%, -50%)",
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderRight: "10px solid var(--copper-700)",
        }}
      />

      {/* Traveling copper pulses along the iterate line — right → left,
          same direction as the arrowhead. Three pulses staggered at
          0s / 0.8s / 1.6s with a 2.5s traverse so one is always in
          flight. Gated on `on` so unmounted slides don't keep animating. */}
      {on && (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "visible",
            pointerEvents: "none",
          }}
          aria-hidden
        >
          {[0, 0.8, 1.6].map((begin, i) => {
            const path = `M ${LINE_X_RIGHT_PCT} ${LINE_Y_PCT} L ${LINE_X_LEFT_PCT} ${LINE_Y_PCT}`;
            return (
              <circle
                key={`iterate-pulse-${i}`}
                r="0.5"
                fill="var(--copper-100)"
                opacity="0"
                style={{ filter: "drop-shadow(0 0 6px var(--copper-300))" }}
              >
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  begin={`${begin}s`}
                  path={path}
                />
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  begin={`${begin}s`}
                  dur="0.01s"
                  fill="freeze"
                />
              </circle>
            );
          })}
        </svg>
      )}

      {/* `iterate` label centered above the line at GENERATE's horizontal
          center (42%) — independent of the line endpoints. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={transition}
        style={{
          position: "absolute",
          left: `${LABEL_X_PCT}%`,
          top: `${LINE_Y_PCT}%`,
          transform: "translate(-50%, -150%)",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        ITERATE
      </motion.div>
    </div>
  );
}

export default C4LoopBackArrow;
