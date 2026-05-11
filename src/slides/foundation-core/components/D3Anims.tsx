// Slide D.3 motion glyphs — one per level, always looping. Each glyph
// renders into the shared `.d3-anim` shell (uniform 108px height + 26/22px
// padding so the first motion element sits at the same y-offset across
// columns) with a bottom-anchored `.d3-anim-caption`.
//
// - D3BpmAnim     — 20 manual blocks compress into 8 streamlined blocks.
//                   CSS keyframes (.d3-bpm-row + .d3-bpm-block).
// - D3RpaAnim     — manual fill creeps to full while bot fill snaps to 8.3%.
//                   CSS keyframes (.d3-rpa-track + .d3-rpa-fill {.manual,.bot}).
// - D3IpaAnim     — 4 source dots emit particles converging on a pulsing
//                   insight node. SVG SMIL.
// - D3AgenticAnim — center "agent" radiates pulse rings + 3 orbital
//                   satellites + scanning ring + goal ping. SVG SMIL.
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:642-794`.
import type { CSSProperties } from "react";

export interface D3AnimProps {
  /** CSS variable suffix for accent color (e.g. "copper-700"). */
  copper: string;
}

// Inline `--accent` custom property; TS doesn't model arbitrary CSS vars.
function shellStyle(copper: string): CSSProperties {
  return { ["--accent" as never]: `var(--${copper})` } as CSSProperties;
}

// — BPM: compression motion (20 → 8). Pure CSS keyframe loop.
export function D3BpmAnim({ copper }: D3AnimProps) {
  return (
    <div
      data-testid="d3-bpm-anim"
      className="d3-anim"
      style={shellStyle(copper)}
    >
      <div className="d3-bpm-row top">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="d3-bpm-block top"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
      <div className="d3-bpm-row bottom">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="d3-bpm-block bottom"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
      <div className="d3-anim-caption">20 → 8 STEPS</div>
    </div>
  );
}

// — RPA: 6 hrs manual vs 30 min bot. Two stacked fills on equal-width tracks.
export function D3RpaAnim({ copper }: D3AnimProps) {
  return (
    <div
      data-testid="d3-rpa-anim"
      className="d3-anim"
      style={shellStyle(copper)}
    >
      <div className="d3-rpa-row">
        <span className="d3-rpa-tag">Manual</span>
        <div className="d3-rpa-track">
          <div className="d3-rpa-fill manual" />
        </div>
      </div>
      <div className="d3-rpa-row">
        <span className="d3-rpa-tag">Bot</span>
        <div className="d3-rpa-track">
          <div className="d3-rpa-fill bot" />
        </div>
      </div>
      <div className="d3-anim-caption">6 HR → 30 MIN</div>
    </div>
  );
}

// — IPA: 4 source dots emit particles converging on a pulsing insight node.
export function D3IpaAnim({ copper }: D3AnimProps) {
  const accent = `var(--${copper})`;
  const sources = [{ y: 6 }, { y: 22 }, { y: 38 }, { y: 54 }];
  const target = { x: 158, y: 30 };
  return (
    <div data-testid="d3-ipa-anim" className="d3-anim">
      <svg
        width="180"
        height="60"
        viewBox="0 0 180 60"
        style={{ overflow: "visible" }}
      >
        <defs>
          {sources.map((s, i) => (
            <path
              key={i}
              id={`d3-ipa-path-${i}`}
              d={`M 22 ${s.y} L ${target.x} ${target.y}`}
            />
          ))}
          <radialGradient id="d3-ipa-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={accent} stopOpacity="0.7" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint connector lines (always visible) */}
        {sources.map((s, i) => (
          <line
            key={`l-${i}`}
            x1="22"
            y1={s.y}
            x2={target.x}
            y2={target.y}
            stroke="var(--copper-800)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
        ))}

        {/* Source dots */}
        {sources.map((s, i) => (
          <circle
            key={`s-${i}`}
            cx="22"
            cy={s.y}
            r="2.6"
            fill={accent}
            opacity="0.85"
          />
        ))}

        {/* Particles flowing along each path, staggered */}
        {sources.map((_, i) => (
          <circle
            key={`p-${i}`}
            r="2.2"
            fill="var(--copper-100)"
            style={{ filter: `drop-shadow(0 0 4px ${accent})` }}
          >
            <animateMotion
              dur="2.2s"
              repeatCount="indefinite"
              begin={`${i * 0.18}s`}
            >
              <mpath href={`#d3-ipa-path-${i}`} />
            </animateMotion>
          </circle>
        ))}

        {/* Target glow halo */}
        <circle cx={target.x} cy={target.y} r="13" fill="url(#d3-ipa-glow)">
          <animate
            attributeName="r"
            values="9;15;9"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Target core */}
        <circle cx={target.x} cy={target.y} r="4.5" fill={accent}>
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div className="d3-anim-caption">4 → 1 INSIGHT</div>
    </div>
  );
}

// — AGENTIC: center "agent" radiates pulse rings + 3 orbital satellites.
export function D3AgenticAnim({ copper }: D3AnimProps) {
  const accent = `var(--${copper})`;
  return (
    <div data-testid="d3-agentic-anim" className="d3-anim">
      <svg
        width="180"
        height="60"
        viewBox="0 0 180 60"
        style={{ overflow: "visible" }}
      >
        {/* Staggered double pulse — 'monitoring' feeling */}
        <circle cx="90" cy="30" r="6" fill="none" stroke={accent} strokeWidth="1">
          <animate
            attributeName="r"
            values="6;26"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.55;0"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="90" cy="30" r="6" fill="none" stroke={accent} strokeWidth="1">
          <animate
            attributeName="r"
            values="6;26"
            dur="2.4s"
            begin="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.55;0"
            dur="2.4s"
            begin="1.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Static dashed orbit ring */}
        <circle
          cx="90"
          cy="30"
          r="20"
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="0.8"
          strokeDasharray="2 4"
        />

        {/* Three orbital satellites — group rotates around (90, 30) */}
        <g>
          <circle cx="110" cy="30" r="2" fill="var(--copper-200)" />
          <circle cx="80" cy="47" r="2" fill="var(--copper-200)" />
          <circle cx="80" cy="13" r="2" fill="var(--copper-200)" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 90 30"
            to="360 90 30"
            dur="7s"
            repeatCount="indefinite"
          />
        </g>

        {/* Goal ping — small chevron above the core flashing every cycle */}
        <g>
          <path
            d="M 86 6 L 90 2 L 94 6"
            fill="none"
            stroke="var(--copper-300)"
            strokeWidth="1"
            strokeLinecap="round"
          >
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* Central core — pulsing brightness */}
        <circle cx="90" cy="30" r="4.5" fill={accent}>
          <animate
            attributeName="opacity"
            values="0.55;1;0.55"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="90" cy="30" r="1.8" fill="var(--neutral-50)">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div className="d3-anim-caption">GOAL · MONITOR · ACT</div>
    </div>
  );
}
