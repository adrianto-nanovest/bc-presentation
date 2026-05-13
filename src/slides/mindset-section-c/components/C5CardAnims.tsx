// C5CardAnims — four small looping animations for C.5's WHY-NOW card stack.
//
// Modeled on `C2CardAnims.tsx`. Each component fills the right-side 90×56
// animation slot of a beat card and loops indefinitely via SVG `<animate>`
// primitives (independent of React state — no re-renders). Primary motion
// uses `--copper-700`; highlight/secondary uses `--copper-300`. Neutrals
// are used for "obsolete" / "fading" visuals.
//
// Components:
//   - CompetitiveAnim   2 stacked horizontal bars: top copper-300 grows
//                       longer while bottom neutral-600 shrinks (capability
//                       shifting away from the obsolete role).
//   - CapacityAnim      One copper-300 figure dot at left fans into 3
//                       figure dots to the right (copper-700/500/300),
//                       staggered 0.8s apart — one person multiplied.
//   - CulturalAnim      3 circles in a triangle joined by copper-700
//                       hairlines; circles pulse in unison — network of
//                       teams.
//   - PersonalAnim      Copper-700 "?" glyph at left fades out as a
//                       copper-300 check glyph fades in at right —
//                       choosing the question.

import type { CSSProperties } from "react";

const SHELL_STYLE: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const DUR = "2.4s";

// ── COMPETITIVE ───────────────────────────────────────────────────────────
// Two stacked horizontal bars on a shared origin. The top bar (copper-300,
// the new capability) grows longer; the bottom bar (neutral-600, the
// obsolete role) shrinks. The crossover reads as "capability shifting."
// 2.4s loop.
export function CompetitiveAnim() {
  const TOP_Y = 18;
  const BOT_Y = 34;
  const BAR_H = 6;
  const X0 = 8;
  const MAX_W = 70;
  const TOP_START = 14;
  const TOP_END = MAX_W;
  const BOT_START = MAX_W;
  const BOT_END = 14;
  return (
    <div data-testid="c5-anim-competitive" style={SHELL_STYLE}>
      <svg
        width={90}
        height={56}
        viewBox="0 0 90 56"
        style={{ overflow: "visible" }}
      >
        {/* Baseline tick — anchors the eye horizontally. */}
        <line
          x1={X0}
          x2={X0 + MAX_W}
          y1={BOT_Y + BAR_H + 4}
          y2={BOT_Y + BAR_H + 4}
          stroke="var(--copper-800)"
          strokeWidth={0.6}
        />

        {/* Top bar — copper-300, grows from TOP_START → TOP_END, holds, resets. */}
        <rect
          x={X0}
          y={TOP_Y}
          width={TOP_START}
          height={BAR_H}
          fill="var(--copper-300)"
        >
          <animate
            attributeName="width"
            values={`${TOP_START};${TOP_END};${TOP_END};${TOP_START}`}
            keyTimes="0;0.5;0.9;1"
            dur={DUR}
            repeatCount="indefinite"
          />
        </rect>

        {/* Bottom bar — neutral-600, shrinks from BOT_START → BOT_END, holds, resets. */}
        <rect
          x={X0}
          y={BOT_Y}
          width={BOT_START}
          height={BAR_H}
          fill="var(--neutral-600)"
        >
          <animate
            attributeName="width"
            values={`${BOT_START};${BOT_END};${BOT_END};${BOT_START}`}
            keyTimes="0;0.5;0.9;1"
            dur={DUR}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.6;0.6;1"
            keyTimes="0;0.5;0.9;1"
            dur={DUR}
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
}

// ── CAPACITY ──────────────────────────────────────────────────────────────
// One copper-300 figure dot at the left. After a moment, 3 figure dots
// appear staggered to the right (copper-700 → copper-500 → copper-300) at
// 0.4s intervals. All fade together near the end, then restart.
// "One person's reach multiplied."
export function CapacityAnim() {
  // Source figure at left; three "multiplied" figures fanning right.
  const SOURCE_X = 12;
  const SOURCE_Y = 28;
  const DOT_R = 4;
  // Three target dots fanning out — y offsets give a subtle fan.
  const TARGETS: Array<{ x: number; y: number; fill: string }> = [
    { x: 38, y: 14, fill: "var(--copper-700)" },
    { x: 56, y: 28, fill: "var(--copper-500)" },
    { x: 74, y: 42, fill: "var(--copper-300)" },
  ];
  return (
    <div data-testid="c5-anim-capacity" style={SHELL_STYLE}>
      <svg
        width={90}
        height={56}
        viewBox="0 0 90 56"
        style={{ overflow: "visible" }}
      >
        {/* Source figure — copper-300, always visible (the "one person"). */}
        <circle
          cx={SOURCE_X}
          cy={SOURCE_Y}
          r={DOT_R}
          fill="var(--copper-300)"
        />
        {/* Small "stick figure" body line below the dot for figure-ness. */}
        <line
          x1={SOURCE_X}
          x2={SOURCE_X}
          y1={SOURCE_Y + DOT_R}
          y2={SOURCE_Y + DOT_R + 6}
          stroke="var(--copper-300)"
          strokeWidth={1.2}
          strokeLinecap="round"
        />

        {TARGETS.map((t, i) => {
          // Each target appears in sequence. Total 2.4s loop:
          //   appear at i * 0.25 normalized (0.0, 0.25, 0.5)
          //   all hold through 0.85, fade out 0.85→0.95, hidden until 1.0.
          const tAppear = i * 0.25;
          return (
            <g key={i}>
              {/* Connector hairline from source to target — fades in with the dot. */}
              <line
                x1={SOURCE_X + DOT_R}
                y1={SOURCE_Y}
                x2={t.x - DOT_R}
                y2={t.y}
                stroke="var(--copper-700)"
                strokeWidth={0.6}
                opacity={0}
              >
                <animate
                  attributeName="opacity"
                  values="0;0;0.5;0.5;0;0"
                  keyTimes={`0;${Math.max(0, tAppear - 0.001).toFixed(4)};${tAppear.toFixed(4)};0.85;0.95;1`}
                  dur={DUR}
                  repeatCount="indefinite"
                />
              </line>
              <circle
                cx={t.x}
                cy={t.y}
                r={DOT_R}
                fill={t.fill}
                opacity={0}
              >
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0;0"
                  keyTimes={`0;${Math.max(0, tAppear - 0.001).toFixed(4)};${tAppear.toFixed(4)};0.85;0.95;1`}
                  dur={DUR}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Stick body for figure-ness. */}
              <line
                x1={t.x}
                x2={t.x}
                y1={t.y + DOT_R}
                y2={t.y + DOT_R + 5}
                stroke={t.fill}
                strokeWidth={1.2}
                strokeLinecap="round"
                opacity={0}
              >
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0;0"
                  keyTimes={`0;${Math.max(0, tAppear - 0.001).toFixed(4)};${tAppear.toFixed(4)};0.85;0.95;1`}
                  dur={DUR}
                  repeatCount="indefinite"
                />
              </line>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── CULTURAL ──────────────────────────────────────────────────────────────
// 3 copper-300 circles in a triangle, joined by copper-700 hairlines. All
// pulse opacity in unison (1.0 → 0.5 → 1.0) on a single 2.4s rhythm.
// Reads as "network of teams" — modern teams default.
export function CulturalAnim() {
  // Triangle vertices (90 × 56 viewBox).
  const VERTS = [
    { x: 22, y: 42 },
    { x: 68, y: 42 },
    { x: 45, y: 14 },
  ];
  const R = 5;
  return (
    <div data-testid="c5-anim-cultural" style={SHELL_STYLE}>
      <svg
        width={90}
        height={56}
        viewBox="0 0 90 56"
        style={{ overflow: "visible" }}
      >
        {/* Three connecting hairlines (copper-700). Pulse in unison. */}
        {[
          { a: 0, b: 1 },
          { a: 1, b: 2 },
          { a: 2, b: 0 },
        ].map((edge, i) => (
          <line
            key={i}
            x1={VERTS[edge.a].x}
            y1={VERTS[edge.a].y}
            x2={VERTS[edge.b].x}
            y2={VERTS[edge.b].y}
            stroke="var(--copper-700)"
            strokeWidth={0.8}
            opacity={0.6}
          >
            <animate
              attributeName="opacity"
              values="0.6;0.3;0.6"
              keyTimes="0;0.5;1"
              dur={DUR}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Three copper-300 circles, pulsing opacity in unison. */}
        {VERTS.map((v, i) => (
          <circle
            key={i}
            cx={v.x}
            cy={v.y}
            r={R}
            fill="var(--copper-300)"
          >
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              keyTimes="0;0.5;1"
              dur={DUR}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}

// ── PERSONAL ──────────────────────────────────────────────────────────────
// A copper-700 question-mark glyph (left) cross-fades with a copper-300
// checkmark glyph (right). Loop: ? → ✓ → ? over 2.4s.
// "From writing the answer to choosing the question."
export function PersonalAnim() {
  // Position the glyphs.
  const Q_X = 22;
  const Q_Y = 36;
  const CHECK_CX = 68;
  const CHECK_CY = 28;
  return (
    <div data-testid="c5-anim-personal" style={SHELL_STYLE}>
      <svg
        width={90}
        height={56}
        viewBox="0 0 90 56"
        style={{ overflow: "visible" }}
      >
        {/* Question mark — copper-700, fades 1 → 0 → 1 over the loop. */}
        <text
          x={Q_X}
          y={Q_Y}
          fontFamily="var(--display, serif)"
          fontSize={28}
          fontWeight={400}
          fill="var(--copper-700)"
          textAnchor="middle"
          opacity={1}
        >
          ?
          <animate
            attributeName="opacity"
            values="1;1;0;0;1"
            keyTimes="0;0.35;0.5;0.85;1"
            dur={DUR}
            repeatCount="indefinite"
          />
        </text>

        {/* Checkmark — copper-300 polyline, fades in as the question fades out. */}
        <polyline
          points={`${CHECK_CX - 8},${CHECK_CY} ${CHECK_CX - 2},${CHECK_CY + 6} ${CHECK_CX + 8},${CHECK_CY - 8}`}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0}
        >
          <animate
            attributeName="opacity"
            values="0;0;1;1;0"
            keyTimes="0;0.35;0.5;0.85;1"
            dur={DUR}
            repeatCount="indefinite"
          />
        </polyline>
      </svg>
    </div>
  );
}
