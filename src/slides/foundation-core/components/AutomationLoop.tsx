// Looping automation illustration for slide D.1 (right column).
//
// A continuous "racetrack" conveyor: tokens enter slowly along the top rail
// (manual feed), pass through the EXEC block on the right, and stream fast
// along the bottom rail (machine output) before looping back. Pure SVG +
// SMIL — no Framer Motion needed.
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:47-141`.
import type { CSSProperties } from "react";

export interface AutomationLoopProps {
  /** When true, the loop fades in. SMIL animations run regardless. */
  on: boolean;
}

// viewBox 400×400. Rounded-rect "racetrack" path, clockwise from top-left.
// Top rail (60→340 at y=80) is the "manual" side; bottom rail (340→60 at
// y=320) is the "machine" side after the EXEC block.
const TRACK_D =
  "M 80 80 L 320 80 Q 360 80 360 120 L 360 280 Q 360 320 320 320 L 80 320 Q 40 320 40 280 L 40 120 Q 40 80 80 80 Z";

// Slow tokens — only on the top rail (input side). 4 tokens, evenly spaced.
const SLOW_TOKENS = [0, 0.25, 0.5, 0.75] as const;
// Fast tokens — many, tightly packed on the bottom rail.
const FAST_COUNT = 14;
const FAST_TOKENS = Array.from({ length: FAST_COUNT }, (_, i) => i / FAST_COUNT);

const MONO_FONT = "var(--mono, ui-monospace)";

export function AutomationLoop({ on }: AutomationLoopProps) {
  const wrapStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(8px)",
    transition:
      "opacity 0.7s var(--ease) 400ms, transform 0.7s var(--ease) 400ms",
  };

  return (
    <div data-testid="automation-loop" style={wrapStyle}>
      <svg
        viewBox="0 0 400 400"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: 480,
          maxHeight: 480,
          overflow: "visible",
        }}
      >
        <defs>
          {/* Top rail = slow (1×) */}
          <path id="d1-rail-slow" d="M 60 80 L 340 80" />
          {/* Bottom rail = fast (1000×), runs right-to-left to form the loop */}
          <path id="d1-rail-fast" d="M 340 320 L 60 320" />
          <linearGradient id="d1-fast-glow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--copper-300)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--copper-200)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--copper-300)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer track (dashed, subtle) */}
        <path
          d={TRACK_D}
          fill="none"
          stroke="var(--copper-800)"
          strokeWidth="1"
          strokeDasharray="3,5"
        />

        {/* Top rail label — MANUAL */}
        <text
          x="200"
          y="56"
          textAnchor="middle"
          fill="var(--copper-500)"
          fontFamily={MONO_FONT}
          fontSize="10"
          letterSpacing="3"
        >
          MANUAL · 1×
        </text>
        {/* Bottom rail label — MACHINE */}
        <text
          x="200"
          y="356"
          textAnchor="middle"
          fill="var(--copper-300)"
          fontFamily={MONO_FONT}
          fontSize="10"
          letterSpacing="3"
        >
          MACHINE · 1,000×
        </text>

        {/* Subtle bottom-rail glow underline — the speed line */}
        <line
          x1="60"
          y1="320"
          x2="340"
          y2="320"
          stroke="url(#d1-fast-glow)"
          strokeWidth="6"
        />

        {/* Slow tokens (top rail) — square markers, 12s loop */}
        {SLOW_TOKENS.map((p, i) => (
          <rect
            key={`s${i}`}
            x="-4"
            y="-4"
            width="8"
            height="8"
            fill="var(--copper-700)"
            stroke="var(--copper-500)"
            strokeWidth="1"
          >
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              begin={`-${p * 12}s`}
            >
              <mpath href="#d1-rail-slow" />
            </animateMotion>
          </rect>
        ))}

        {/* EXEC block — right side, where manual meets machine */}
        <g>
          <rect
            x="332"
            y="148"
            width="56"
            height="104"
            fill="rgba(184,110,61,0.12)"
            stroke="var(--copper-300)"
            strokeWidth="1"
          />
          <text
            x="360"
            y="180"
            textAnchor="middle"
            fill="var(--copper-200)"
            fontFamily={MONO_FONT}
            fontSize="9"
            letterSpacing="2"
          >
            EXEC
          </text>
          {/* internal "gear" tick marks */}
          <line x1="340" y1="200" x2="380" y2="200" stroke="var(--copper-500)" strokeWidth="0.5" />
          <line x1="340" y1="212" x2="380" y2="212" stroke="var(--copper-500)" strokeWidth="0.5" />
          <line x1="340" y1="224" x2="380" y2="224" stroke="var(--copper-500)" strokeWidth="0.5" />
          {/* pulsing core */}
          <circle cx="360" cy="232" r="4" fill="var(--copper-200)">
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* INPUT label */}
        <g>
          <circle cx="40" cy="200" r="3" fill="var(--copper-500)" />
          <text
            x="22"
            y="204"
            textAnchor="end"
            fill="var(--copper-400)"
            fontFamily={MONO_FONT}
            fontSize="9"
            letterSpacing="2"
          >
            IN
          </text>
        </g>

        {/* Fast tokens (bottom rail) — thin streaks, 1.6s loop */}
        {FAST_TOKENS.map((p, i) => (
          <rect
            key={`f${i}`}
            x="-6"
            y="-1.5"
            width="12"
            height="3"
            fill="var(--copper-200)"
          >
            <animateMotion
              dur="1.6s"
              repeatCount="indefinite"
              begin={`-${p * 1.6}s`}
            >
              <mpath href="#d1-rail-fast" />
            </animateMotion>
          </rect>
        ))}

        {/* Connector arrows showing the loop direction */}
        {/* Top: left→right (manual feed) */}
        <path d="M 196 76 L 204 80 L 196 84 Z" fill="var(--copper-500)" />
        {/* Right: top→bottom into EXEC */}
        <path d="M 356 144 L 360 152 L 364 144 Z" fill="var(--copper-300)" />
        {/* Bottom: right→left (machine return) */}
        <path d="M 204 316 L 196 320 L 204 324 Z" fill="var(--copper-200)" />
        {/* Left: bottom→top (return to input) */}
        <path d="M 36 204 L 40 196 L 44 204 Z" fill="var(--copper-500)" />
      </svg>
    </div>
  );
}
