// B3ParamAnims — six small looping animations for B.3's parameter tiles.
//
// Co-located like `src/slides/foundation-core/components/D3Anims.tsx`. Each
// component fits inside the 64px `.d3-anim` shell provided by the parent
// `B3ParamTile` (down from 80px in an earlier iteration). Inner SVGs use
// height ~60 so they slot cleanly without `overflow: visible` clipping at
// the shell edge. Primary motion uses `--copper-700`; highlight/secondary
// uses `--copper-300`. None of these components render a `.d3-anim-caption`
// — the tile parent provides the bulleted description below the shell.
//
// Components:
//   - EffortAnim         Three pulse rings of increasing intensity (low→med→high)
//   - MaxTokensAnim      A horizontal bar fills L→R, then snaps short, then long
//   - ContextWindowAnim  Stacked bar (input + output) where input grows/shrinks
//   - TemperatureAnim    Bell curve sharpens (low temp) and flattens (high temp)
//   - TopPAnim           Row of probability bars + moving threshold line
//   - SystemPromptAnim   Persistent box at top with cycling user messages below

import type { CSSProperties } from "react";

const SHELL_STYLE: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// ── EFFORT ────────────────────────────────────────────────────────────────
// Three concentric pulse rings; outer rings emit later → "more effort, more
// reach." Always-on loop.
export function EffortAnim() {
  return (
    <div data-testid="b3-anim-effort" style={SHELL_STYLE}>
      <svg width="100" height="60" viewBox="0 0 120 80" style={{ overflow: "visible" }}>
        {/* Three rings staggered. */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={60}
            cy={40}
            r={6}
            fill="none"
            stroke={i === 2 ? "var(--copper-300)" : "var(--copper-700)"}
            strokeWidth={1}
          >
            <animate
              attributeName="r"
              values="6;30"
              dur="2.4s"
              begin={`${i * 0.45}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;0"
              dur="2.4s"
              begin={`${i * 0.45}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {/* Core dot */}
        <circle cx={60} cy={40} r={3.5} fill="var(--copper-700)">
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

// ── MAX TOKENS ────────────────────────────────────────────────────────────
// Single bar fills L→R, snaps short, snaps long.
export function MaxTokensAnim() {
  return (
    <div data-testid="b3-anim-max-tokens" style={SHELL_STYLE}>
      <div
        style={{
          width: 150,
          height: 16,
          border: "1px solid var(--copper-800)",
          position: "relative",
          background: "rgba(184,110,61,0.06)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            background: "var(--copper-700)",
            animation: "b3-maxtok-fill 4s var(--ease) infinite both",
          }}
        />
        {/* "Ceiling" tick (right side). */}
        <span
          style={{
            position: "absolute",
            right: -6,
            top: -4,
            width: 2,
            height: 22,
            background: "var(--copper-300)",
            opacity: 0.85,
          }}
        />
      </div>
      <style>{`
        @keyframes b3-maxtok-fill {
          0%   { width: 0%; }
          22%  { width: 100%; }
          30%  { width: 28%; }
          50%  { width: 28%; }
          58%  { width: 88%; }
          90%  { width: 88%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
}

// ── CONTEXT WINDOW ────────────────────────────────────────────────────────
// Stacked bar: total stays fixed, input segment grows/shrinks, output fills the
// remainder. The total bar reads as the "window" — a fixed budget.
export function ContextWindowAnim() {
  return (
    <div data-testid="b3-anim-context-window" style={SHELL_STYLE}>
      <div
        style={{
          width: 160,
          height: 16,
          border: "1px solid var(--copper-800)",
          position: "relative",
          background: "rgba(184,110,61,0.04)",
          display: "flex",
        }}
      >
        <div
          style={{
            background: "var(--copper-700)",
            height: "100%",
            animation: "b3-ctx-input 4s var(--ease) infinite both",
          }}
        />
        <div
          style={{
            background: "var(--copper-300)",
            height: "100%",
            opacity: 0.55,
            animation: "b3-ctx-output 4s var(--ease) infinite both",
          }}
        />
      </div>
      <style>{`
        @keyframes b3-ctx-input  {
          0%   { width: 30%; }
          50%  { width: 78%; }
          100% { width: 30%; }
        }
        @keyframes b3-ctx-output {
          0%   { width: 70%; }
          50%  { width: 22%; }
          100% { width: 70%; }
        }
      `}</style>
    </div>
  );
}

// ── TEMPERATURE ───────────────────────────────────────────────────────────
// Bell-curve path-morph: tall narrow → low wide → tall narrow. Two-keyframe
// SMIL `animate attributeName="d"`.
export function TemperatureAnim() {
  // Two bell-shaped Bezier paths sharing same start/end on the baseline.
  // Sharp (low temp): tall peak around centre.
  const sharp = "M 10 60 C 40 60, 50 5, 65 5 C 80 5, 90 60, 120 60";
  // Flat (high temp): low rolling hill.
  const flat  = "M 10 60 C 40 60, 50 30, 65 30 C 80 30, 90 60, 120 60";
  return (
    <div data-testid="b3-anim-temperature" style={SHELL_STYLE}>
      <svg width="120" height="60" viewBox="0 0 130 70" style={{ overflow: "visible" }}>
        {/* Baseline tick marks. */}
        <line
          x1={10}
          x2={120}
          y1={61}
          y2={61}
          stroke="var(--copper-800)"
          strokeWidth={0.6}
        />
        {/* Filled curve (faint). */}
        <path
          d={sharp}
          fill="var(--copper-700)"
          fillOpacity={0.12}
        >
          <animate
            attributeName="d"
            values={`${sharp};${flat};${sharp}`}
            dur="3.6s"
            repeatCount="indefinite"
          />
        </path>
        {/* Stroked curve (primary motion). */}
        <path
          d={sharp}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth={1.4}
        >
          <animate
            attributeName="d"
            values={`${sharp};${flat};${sharp}`}
            dur="3.6s"
            repeatCount="indefinite"
          />
        </path>
        {/* Peak dot — moves with the curve. */}
        <circle cx={65} cy={5} r={2.2} fill="var(--copper-300)">
          <animate
            attributeName="cy"
            values="5;30;5"
            dur="3.6s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

// ── TOP-P ─────────────────────────────────────────────────────────────────
// Row of probability bars descending in height; a moving threshold line
// slides left/right and the bars beyond it dim → "keeps the likely ones."
export function TopPAnim() {
  const bars = [1, 0.85, 0.65, 0.5, 0.38, 0.28, 0.2, 0.14];
  const barW = 10;
  const gap = 4;
  const startX = 12;
  const baseY = 60;
  const maxH = 50;
  // Threshold sweeps between bar indices 4 → 7 → 4.
  return (
    <div data-testid="b3-anim-top-p" style={SHELL_STYLE}>
      <svg width="130" height="60" viewBox="0 0 140 70" style={{ overflow: "visible" }}>
        {/* Baseline. */}
        <line
          x1={startX - 4}
          x2={startX + bars.length * (barW + gap)}
          y1={baseY + 2}
          y2={baseY + 2}
          stroke="var(--copper-800)"
          strokeWidth={0.6}
        />
        {bars.map((p, i) => {
          const x = startX + i * (barW + gap);
          const h = p * maxH;
          // Each bar dims when the threshold sits to its left.
          return (
            <g key={i}>
              <rect
                x={x}
                y={baseY - h}
                width={barW}
                height={h}
                fill="var(--copper-700)"
              >
                <animate
                  attributeName="opacity"
                  values={
                    // Opacity sequence: bars >=5 get cut off in the "narrow"
                    // phase, all visible in the "wide" phase. We approximate
                    // with a per-bar opacity loop.
                    i < 4
                      ? "1;1;1"
                      : i < 5
                        ? "1;0.9;1"
                        : i < 6
                          ? "1;0.4;1"
                          : "1;0.15;1"
                  }
                  keyTimes="0;0.5;1"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          );
        })}
        {/* Threshold line — sweeps left/right. */}
        <line
          y1={6}
          y2={baseY + 2}
          stroke="var(--copper-300)"
          strokeWidth={1}
          strokeDasharray="2 3"
        >
          <animate
            attributeName="x1"
            values={`${startX + 4 * (barW + gap) + 2};${startX + 7 * (barW + gap) + 2};${
              startX + 4 * (barW + gap) + 2
            }`}
            dur="3.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values={`${startX + 4 * (barW + gap) + 2};${startX + 7 * (barW + gap) + 2};${
              startX + 4 * (barW + gap) + 2
            }`}
            dur="3.2s"
            repeatCount="indefinite"
          />
        </line>
      </svg>
    </div>
  );
}

// ── SYSTEM PROMPT ─────────────────────────────────────────────────────────
// A small persistent box at top stays put. Below it, user messages cycle.
export function SystemPromptAnim() {
  return (
    <div data-testid="b3-anim-system-prompt" style={SHELL_STYLE}>
      <div
        style={{
          width: 140,
          height: 56,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          position: "relative",
        }}
      >
        {/* Persistent system box. */}
        <div
          style={{
            height: 18,
            border: "1px solid var(--copper-300)",
            background: "rgba(217,158,108,0.08)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 6,
            fontFamily: "var(--mono)",
            fontSize: 8,
            letterSpacing: "0.18em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          system
        </div>
        {/* Cycling user-message lines. The container is fixed; one of three
           "messages" is visible per ~1.2s phase via opacity keyframes. */}
        <div style={{ position: "relative", flex: 1 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 16,
                display: "flex",
                gap: 4,
                opacity: 0,
                animation: `b3-sys-msg 3.6s ${i * 1.2}s infinite both var(--ease)`,
              }}
            >
              {/* "you" tag */}
              <span
                style={{
                  width: 22,
                  height: 16,
                  border: "1px solid var(--copper-800)",
                  fontFamily: "var(--mono)",
                  fontSize: 7,
                  color: "var(--copper-500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                you
              </span>
              <span
                style={{
                  flex: 1,
                  height: 16,
                  background: "var(--copper-700)",
                  opacity: 0.45,
                }}
              />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes b3-sys-msg {
            0%, 4%    { opacity: 0; transform: translateY(4px); }
            14%, 30%  { opacity: 1; transform: translateY(0); }
            40%, 100% { opacity: 0; transform: translateY(-4px); }
          }
        `}</style>
      </div>
    </div>
  );
}
