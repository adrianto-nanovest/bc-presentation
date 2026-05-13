// C2CardAnims — three small looping animations for C.2's parameter tiles.
//
// Modeled on `src/slides/landscape-section-b/components/B3ParamAnims.tsx`.
// Each component fills the parent tile's animation slot and loops indefinitely
// via SVG `<animate>` primitives (independent of React state — no re-renders).
// Primary motion uses `--copper-700`; highlight/secondary uses `--copper-300`.
//
// Components:
//   - LeverageAnim   One short bar grows into a row of 10 progressively taller bars.
//   - VelocityAnim   5 small filled squares appear sequentially, then pulse together.
//   - JudgmentAnim   3 diamonds + a magnifier glide; 2 fade, middle gets a check.
//   - ReachAnim      Copper-700 source dot at left emits 3 concentric copper-300
//                    rings that expand rightward in staggered pulses (radar-like).

import type { CSSProperties } from "react";

const SHELL_STYLE: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// ── LEVERAGE ──────────────────────────────────────────────────────────────
// One short bar at the left grows into a row of 10 progressively taller bars
// filling rightward. 2.4s loop. Copper-700 primary; copper-300 highlight on
// the rightmost (tallest) bar.
export function LeverageAnim() {
  // 10 bars, baseline aligned. Heights rise from short → tall in a modest
  // exponential curve so the rightmost bar reads as the multiplied output.
  const BAR_COUNT = 10;
  const BAR_W = 7;
  const GAP = 3;
  const START_X = 12;
  const BASELINE_Y = 64;
  // Heights: short on the left (~8), tall on the right (~54). Slight curve.
  const heights = Array.from({ length: BAR_COUNT }, (_, i) => {
    const t = i / (BAR_COUNT - 1);
    // Quadratic ease for a gentle rising curve.
    return 8 + Math.pow(t, 1.5) * 46;
  });
  // Each bar's "begin" staggers so they grow in left→right sequence.
  // Total cycle 2.4s: 1.4s growth (140ms per bar stagger), 1.0s hold-and-reset.
  return (
    <div data-testid="c2-anim-leverage" style={SHELL_STYLE}>
      <svg
        width={100}
        height={60}
        viewBox="0 0 120 80"
        style={{ overflow: "visible" }}
      >
        {/* Baseline tick. */}
        <line
          x1={START_X - 3}
          x2={START_X + BAR_COUNT * (BAR_W + GAP)}
          y1={BASELINE_Y + 2}
          y2={BASELINE_Y + 2}
          stroke="var(--copper-800)"
          strokeWidth={0.6}
        />
        {heights.map((h, i) => {
          const x = START_X + i * (BAR_W + GAP);
          const isHighlight = i === BAR_COUNT - 1;
          const beginDelay = (i / BAR_COUNT) * 1.4;
          return (
            <rect
              key={i}
              x={x}
              y={BASELINE_Y - h}
              width={BAR_W}
              height={h}
              fill={isHighlight ? "var(--copper-300)" : "var(--copper-700)"}
            >
              {/* Grow from 0 → full height, hold, then reset. */}
              <animate
                attributeName="height"
                values={`0;0;${h};${h};0`}
                keyTimes={`0;${beginDelay / 2.4};${(beginDelay + 0.25) / 2.4};0.95;1`}
                dur="2.4s"
                repeatCount="indefinite"
              />
              {/* y stays anchored to baseline as the bar grows. */}
              <animate
                attributeName="y"
                values={`${BASELINE_Y};${BASELINE_Y};${BASELINE_Y - h};${BASELINE_Y - h};${BASELINE_Y}`}
                keyTimes={`0;${beginDelay / 2.4};${(beginDelay + 0.25) / 2.4};0.95;1`}
                dur="2.4s"
                repeatCount="indefinite"
              />
            </rect>
          );
        })}
      </svg>
    </div>
  );
}

// ── VELOCITY ──────────────────────────────────────────────────────────────
// 5 small filled copper-700 squares appear sequentially at 120ms intervals.
// After all visible, they pulse copper-300 (opacity 1→0.5→1 over 300ms),
// then hold 200ms, then sequence restarts. 2.4s total loop.
export function VelocityAnim() {
  const SQUARE_COUNT = 5;
  const SQUARE_SIZE = 14;
  const GAP = 6;
  const TOTAL_W = SQUARE_COUNT * SQUARE_SIZE + (SQUARE_COUNT - 1) * GAP;
  const START_X = (120 - TOTAL_W) / 2;
  const CY = 40;
  // Timing layout (2.4s loop):
  //   0 – 600ms: 5 squares appear sequentially (120ms apart)
  //   600 – 900ms: all pulse copper-300 (opacity 1→0.5→1)
  //   900 – 1100ms: hold all visible
  //   1100 – 2400ms: held (or fade out before restart). We restart cleanly at 2.4s.
  return (
    <div data-testid="c2-anim-velocity" style={SHELL_STYLE}>
      <svg
        width={100}
        height={60}
        viewBox="0 0 120 80"
        style={{ overflow: "visible" }}
      >
        {Array.from({ length: SQUARE_COUNT }, (_, i) => {
          const x = START_X + i * (SQUARE_SIZE + GAP);
          // Appear time (s), relative to loop start.
          const appearAt = i * 0.12;
          // keyTimes are normalized to dur=2.4s.
          const tAppear = appearAt / 2.4;
          // All squares present at t = 0.6/2.4 ≈ 0.25.
          // Pulse window: 0.6 – 0.9s (0.25 – 0.375 normalized).
          // We model fill via fill-opacity since fill color animation is heavier.
          return (
            <g key={i}>
              <rect
                x={x}
                y={CY - SQUARE_SIZE / 2}
                width={SQUARE_SIZE}
                height={SQUARE_SIZE}
                fill="var(--copper-700)"
              >
                {/* opacity: 0 → appear instantly at tAppear → 1, then pulse
                    (1 → 0.5 → 1) during 0.25–0.375, hold visible to ~0.95,
                    then snap back to 0 to restart. */}
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0.5;1;1;0"
                  keyTimes={`0;${Math.max(0, tAppear - 0.001).toFixed(4)};${tAppear.toFixed(4)};0.25;0.3125;0.375;0.95;1`}
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </rect>
              {/* Copper-300 pulse overlay — only fades in during the pulse
                  window so the squares briefly read as highlighted. */}
              <rect
                x={x}
                y={CY - SQUARE_SIZE / 2}
                width={SQUARE_SIZE}
                height={SQUARE_SIZE}
                fill="var(--copper-300)"
                opacity={0}
              >
                <animate
                  attributeName="opacity"
                  values="0;0;0.7;0;0"
                  keyTimes="0;0.25;0.3125;0.375;1"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── JUDGMENT ──────────────────────────────────────────────────────────────
// 3 small rotated-square (diamond) shapes in a row. A copper-300 magnifier
// glyph (circle + handle) glides left → right across them over 1.4s. After
// the glide, 2 diamonds fade to neutral-700; the middle gets a small
// copper-300 checkmark overlay. Hold 600ms, then reset. 2.4s total loop.
export function JudgmentAnim() {
  // Diamond positions (centers).
  const DIAMOND_CX = [30, 60, 90];
  const DIAMOND_CY = 40;
  const DIAMOND_SIZE = 10; // half-diagonal
  // Magnifier travels from x=18 → x=102 over 1.4s, then disappears.
  // After 1.4s, diamonds 0 and 2 fade to neutral-700; check appears on diamond 1.
  // Cycle: 0 – 1.4s glide, 1.4 – 2.0s judgment shown, 2.0 – 2.4s reset/hold.
  const dur = "2.4s";
  return (
    <div data-testid="c2-anim-judgment" style={SHELL_STYLE}>
      <svg
        width={100}
        height={60}
        viewBox="0 0 120 80"
        style={{ overflow: "visible" }}
      >
        {/* Three diamonds (rotated squares). */}
        {DIAMOND_CX.map((cx, i) => {
          const isMiddle = i === 1;
          // Diamond fill: copper-700 always; for non-middle, fade to neutral-700 after 1.4s.
          return (
            <g key={i}>
              <polygon
                points={`${cx},${DIAMOND_CY - DIAMOND_SIZE} ${cx + DIAMOND_SIZE},${DIAMOND_CY} ${cx},${DIAMOND_CY + DIAMOND_SIZE} ${cx - DIAMOND_SIZE},${DIAMOND_CY}`}
                fill="var(--copper-700)"
              >
                {!isMiddle && (
                  <animate
                    attributeName="fill"
                    values="var(--copper-700);var(--copper-700);var(--neutral-700);var(--neutral-700);var(--copper-700)"
                    keyTimes="0;0.5833;0.625;0.95;1"
                    dur={dur}
                    repeatCount="indefinite"
                  />
                )}
              </polygon>
            </g>
          );
        })}

        {/* Magnifier glyph (circle + diagonal handle). Glides L→R then hides. */}
        <g>
          {/* circle */}
          <circle
            cx={18}
            cy={DIAMOND_CY - 4}
            r={5}
            fill="none"
            stroke="var(--copper-300)"
            strokeWidth={1.2}
          >
            <animate
              attributeName="cx"
              values="18;102;102;18"
              keyTimes="0;0.5833;0.625;1"
              dur={dur}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;1;0;0;1"
              keyTimes="0;0.5833;0.5834;0.95;1"
              dur={dur}
              repeatCount="indefinite"
            />
          </circle>
          {/* handle */}
          <line
            x1={22}
            y1={DIAMOND_CY}
            x2={26}
            y2={DIAMOND_CY + 4}
            stroke="var(--copper-300)"
            strokeWidth={1.2}
            strokeLinecap="round"
          >
            <animate
              attributeName="x1"
              values="22;106;106;22"
              keyTimes="0;0.5833;0.625;1"
              dur={dur}
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="26;110;110;26"
              keyTimes="0;0.5833;0.625;1"
              dur={dur}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;1;0;0;1"
              keyTimes="0;0.5833;0.5834;0.95;1"
              dur={dur}
              repeatCount="indefinite"
            />
          </line>
        </g>

        {/* Checkmark on the middle diamond, appears after the glide. */}
        <polyline
          points={`${DIAMOND_CX[1] - 4},${DIAMOND_CY} ${DIAMOND_CX[1] - 1},${DIAMOND_CY + 3} ${DIAMOND_CX[1] + 4},${DIAMOND_CY - 3}`}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0}
        >
          <animate
            attributeName="opacity"
            values="0;0;1;1;0"
            keyTimes="0;0.5833;0.625;0.95;1"
            dur={dur}
            repeatCount="indefinite"
          />
        </polyline>
      </svg>
    </div>
  );
}

// ── REACH ─────────────────────────────────────────────────────────────────
// A copper-700 source dot at the left (x=15) emits three copper-300 rings
// that expand rightward in staggered pulses. Each ring's radius animates
// from 6 → 32 while opacity decays from 0.9 → 0, mimicking a radar/sonar
// signal radiating outward from a single source. Staggered begin offsets
// (0s, 0.8s, 1.6s) keep one ring always visible across the 2.4s loop.
//
// Viewbox matches the other three C2 anims (120 × 80), rendered at 100 × 60
// inside SHELL_STYLE so it slots cleanly into B3ParamTile's 75px d3-anim
// shell. SHELL_STYLE shared with Leverage/Velocity/Judgment for parity.
export function ReachAnim() {
  const SOURCE_X = 15;
  const SOURCE_Y = 40;
  const dur = "2.4s";
  // Three rings, each begins at a different point in the loop.
  const RING_BEGINS = ["0s", "0.8s", "1.6s"];
  return (
    <div data-testid="c2-anim-reach" style={SHELL_STYLE}>
      <svg
        width={100}
        height={60}
        viewBox="0 0 120 80"
        style={{ overflow: "visible" }}
      >
        {/* Faint baseline guide — same copper-800 tick used by LeverageAnim
            to anchor the eye horizontally without competing with the rings. */}
        <line
          x1={SOURCE_X}
          x2={110}
          y1={SOURCE_Y + 28}
          y2={SOURCE_Y + 28}
          stroke="var(--copper-800)"
          strokeWidth={0.6}
        />

        {/* Source dot — copper-700, anchored at the left. */}
        <circle
          cx={SOURCE_X}
          cy={SOURCE_Y}
          r={4}
          fill="var(--copper-700)"
        />

        {/* Three expanding rings, copper-300, radiating from the source. */}
        {RING_BEGINS.map((begin, i) => (
          <circle
            key={i}
            cx={SOURCE_X}
            cy={SOURCE_Y}
            r={6}
            fill="none"
            stroke="var(--copper-300)"
            strokeWidth={1.2}
            opacity={0}
          >
            <animate
              attributeName="r"
              values="6;32"
              dur={dur}
              begin={begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.9;0"
              dur={dur}
              begin={begin}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
