// Network illustration for slide D.2 (step 1+).
//
// Five satellites (BPM, RPA, AI, IPA, AGENTIC) sit in a fixed 760×320
// coordinate space. A phase machine reveals them in sequence:
//   phase 0  idle
//   phase 1  +BPM            (200ms)
//   phase 2  +RPA            (800ms)
//   phase 3  +AI             (1400ms)
//   phase 4  +IPA + 3 feeder arrows pulsing toward IPA   (2200ms)
//   phase 5  +AGENTIC + dashed arrow IPA → AGENTIC       (3100ms)
//
// Hovering a left list card "heats" the matching satellite/arrow:
//   feeder arrow (k → IPA) heats when hovered === k OR hovered === 'ipa'
//   IPA → AGENTIC heats when hovered === 'ipa' OR hovered === 'agentic'
//
// The D2Satellite sub-component and d2Seg(a, b) helper live in this file.
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:366-547`.
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { LucideIcon } from "../../foundation-core-section-e/components/LucideIcon";
import type { D2Card, D2CardKey, D2Content } from "../content";
import type { D2HoverKey } from "./D2ListCard";

// ─── Geometry constants ───────────────────────────────────────────────────
export const D2_NET_W = 760;
export const D2_NET_H = 320;
export const D2_SAT_W = 156;
export const D2_SAT_H = 64;

const D2_NET: Record<D2CardKey, { x: number; y: number }> = {
  bpm: { x: 90, y: 60 },
  rpa: { x: 90, y: 160 },
  ai: { x: 90, y: 260 },
  ipa: { x: 380, y: 160 },
  agentic: { x: 660, y: 160 },
};

// Connector segment from box-A border to ~3px before box-B border, so the
// arrow tip lands on B's border (not floating in space, not penetrating).
export function d2Seg(
  a: { x: number; y: number },
  b: { x: number; y: number },
): { x1: number; y1: number; x2: number; y2: number } {
  const halfW = D2_SAT_W / 2;
  const halfH = D2_SAT_H / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const tBox = Math.min(
    halfW / Math.max(Math.abs(ux), 1e-6),
    halfH / Math.max(Math.abs(uy), 1e-6),
  );
  return {
    x1: a.x + ux * tBox,
    y1: a.y + uy * tBox,
    x2: b.x - ux * (tBox + 3),
    y2: b.y - uy * (tBox + 3),
  };
}

// ─── Satellite box ────────────────────────────────────────────────────────
function toPascal(name: string): string {
  if (!name) return name;
  return name
    .split(/[-_ ]/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

interface D2SatelliteProps {
  data: D2Card;
  x: number;
  y: number;
  visible: boolean;
  active: boolean;
  /** Full CSS variable name including the leading `--`. */
  accentVar: string;
}

function D2Satellite({
  data,
  x,
  y,
  visible,
  active,
  accentVar,
}: D2SatelliteProps) {
  const accent = `var(${accentVar})`;
  const wrapStyle: CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: D2_SAT_W,
    height: D2_SAT_H,
    transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.92})`,
    opacity: visible ? 1 : 0,
    transition:
      "opacity 0.5s var(--ease), transform 0.5s var(--ease), border-color 0.2s var(--ease), box-shadow 0.2s var(--ease), background 0.2s var(--ease)",
    border: `1px solid ${active ? "var(--copper-200)" : accent}`,
    background: active ? "rgba(184,110,61,0.10)" : "rgba(10,10,10,0.92)",
    boxShadow: active
      ? `0 0 0 1px ${accent} inset, 0 0 28px -10px ${accent}`
      : "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "8px 14px",
  };
  return (
    <div
      data-testid="d2-satellite"
      data-key={data.key}
      data-active={active ? "true" : "false"}
      style={wrapStyle}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: active ? "var(--copper-100)" : "var(--copper-300)",
          transition: "color 0.2s var(--ease)",
        }}
      >
        <LucideIcon name={toPascal(data.icon)} size={22} color="currentColor" />
      </span>
      <span
        style={{
          fontFamily: "var(--display)",
          fontSize: 18,
          color: "var(--neutral-50)",
          lineHeight: 1,
          letterSpacing: "0.04em",
        }}
      >
        {data.title}
      </span>
    </div>
  );
}

// ─── Network ──────────────────────────────────────────────────────────────
export interface D2NetworkProps {
  on: boolean;
  hovered: D2HoverKey;
  /** All five cards, keyed by their abbreviations. */
  cards: D2Content["cards"];
}

export function D2Network({ on, hovered, cards }: D2NetworkProps) {
  // Phase machine: feeders reveal first (one by one), then IPA + 3 feeder
  // arrows arrive together, then AGENTIC + the dashed arrow.
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!on) {
      setPhase(0);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [on]);

  const showBPM = phase >= 1;
  const showRPA = phase >= 2;
  const showAI = phase >= 3;
  const showIPA = phase >= 4;
  const showFeederArrows = phase >= 4;
  const showAgentic = phase >= 5;
  const showAgenticArrow = phase >= 5;

  const segIPA = (k: D2CardKey) => d2Seg(D2_NET[k], D2_NET.ipa);
  const segAgentic = d2Seg(D2_NET.ipa, D2_NET.agentic);

  const cardByKey = useMemo(
    () =>
      Object.fromEntries(cards.map((c) => [c.key, c])) as Record<
        D2CardKey,
        D2Card
      >,
    [cards],
  );

  // An arrow heats up if either endpoint's discipline is hovered.
  const feederHot = (k: D2CardKey) => hovered === k || hovered === "ipa";
  const agenticHot = hovered === "ipa" || hovered === "agentic";

  return (
    <div
      data-testid="d2-network"
      data-phase={phase}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      {/* Illustration title */}
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "var(--copper-400)",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        <em style={{ fontStyle: "italic", color: "var(--copper-200)" }}>
          4 Components
        </em>
        <span style={{ color: "var(--copper-700)", margin: "0 8px" }}>—</span>
        <span>The Automation Spectrum</span>
      </div>

      {/* Network canvas */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            width: D2_NET_W,
            height: D2_NET_H,
            maxWidth: "100%",
          }}
        >
          {/* SVG arrows */}
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${D2_NET_W} ${D2_NET_H}`}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            <defs>
              <marker
                id="d2net-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
                markerUnits="strokeWidth"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--copper-300)" />
              </marker>
              <marker
                id="d2net-arrow-hot"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
                markerUnits="strokeWidth"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--copper-100)" />
              </marker>
            </defs>

            {/* Feeders → IPA */}
            {(["bpm", "rpa", "ai"] as const).map((k, i) => {
              const seg = segIPA(k);
              const hot = feederHot(k);
              return (
                <g key={k}>
                  <line
                    x1={seg.x1}
                    y1={seg.y1}
                    x2={seg.x2}
                    y2={seg.y2}
                    stroke={hot ? "var(--copper-200)" : "var(--copper-500)"}
                    strokeWidth={hot ? 1.6 : 1.2}
                    strokeLinecap="round"
                    markerEnd={`url(#${hot ? "d2net-arrow-hot" : "d2net-arrow"})`}
                    style={{
                      opacity: showFeederArrows ? 1 : 0,
                      transition:
                        "opacity 0.5s var(--ease), stroke 0.2s var(--ease), stroke-width 0.2s var(--ease)",
                    }}
                  />
                  {showFeederArrows && (
                    <circle
                      r="3"
                      fill="var(--copper-100)"
                      style={{
                        filter: "drop-shadow(0 0 6px var(--copper-300))",
                      }}
                    >
                      <animateMotion
                        dur={`${1.6 + (i % 2) * 0.2}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                        path={`M ${seg.x1} ${seg.y1} L ${seg.x2} ${seg.y2}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* IPA → AGENTIC — DASHED line with continuing motion pulse */}
            <g>
              <line
                x1={segAgentic.x1}
                y1={segAgentic.y1}
                x2={segAgentic.x2}
                y2={segAgentic.y2}
                stroke={agenticHot ? "var(--copper-200)" : "var(--copper-300)"}
                strokeWidth={agenticHot ? 1.8 : 1.4}
                strokeLinecap="round"
                strokeDasharray="6 5"
                markerEnd={`url(#${agenticHot ? "d2net-arrow-hot" : "d2net-arrow"})`}
                style={{
                  opacity: showAgenticArrow ? 1 : 0,
                  transition:
                    "opacity 0.5s var(--ease), stroke 0.2s var(--ease), stroke-width 0.2s var(--ease)",
                }}
              />
              {showAgenticArrow && (
                <circle
                  r="3.5"
                  fill="var(--copper-100)"
                  style={{
                    filter: "drop-shadow(0 0 8px var(--copper-200))",
                  }}
                >
                  <animateMotion
                    dur="1.4s"
                    repeatCount="indefinite"
                    path={`M ${segAgentic.x1} ${segAgentic.y1} L ${segAgentic.x2} ${segAgentic.y2}`}
                  />
                </circle>
              )}
            </g>
          </svg>

          {/* Satellites — share the canvas coordinate system */}
          <D2Satellite
            data={cardByKey.bpm}
            x={D2_NET.bpm.x}
            y={D2_NET.bpm.y}
            visible={showBPM}
            active={hovered === "bpm"}
            accentVar={`--${cardByKey.bpm.copper}`}
          />
          <D2Satellite
            data={cardByKey.rpa}
            x={D2_NET.rpa.x}
            y={D2_NET.rpa.y}
            visible={showRPA}
            active={hovered === "rpa"}
            accentVar={`--${cardByKey.rpa.copper}`}
          />
          <D2Satellite
            data={cardByKey.ai}
            x={D2_NET.ai.x}
            y={D2_NET.ai.y}
            visible={showAI}
            active={hovered === "ai"}
            accentVar={`--${cardByKey.ai.copper}`}
          />
          <D2Satellite
            data={cardByKey.ipa}
            x={D2_NET.ipa.x}
            y={D2_NET.ipa.y}
            visible={showIPA}
            active={hovered === "ipa"}
            accentVar={`--${cardByKey.ipa.copper}`}
          />
          <D2Satellite
            data={cardByKey.agentic}
            x={D2_NET.agentic.x}
            y={D2_NET.agentic.y}
            visible={showAgentic}
            active={hovered === "agentic"}
            accentVar={`--${cardByKey.agentic.copper}`}
          />
        </div>
      </div>
    </div>
  );
}
