// Elliptical hub-and-spoke network (slide E.6).
//
// Ported from `claude-design-project/jsx/slides-b.jsx:152-274`. Six
// satellites sit on an ellipse around a central CONTEXT hub; arrows are
// drawn satellite → hub; during the `flow` phase, pulse circles travel
// inward along each arrow via SVG `<animateMotion>`.
//
// The phase machine is owned by the parent (so step-reveal in the slide can
// drive `idle` → `hub` → `reveal` → `flow` deterministically). Hover state
// is also lifted: `hoveredIndex` toggles the active satellite styling and
// arrow weight.
import type { CSSProperties } from "react";
import { LucideIcon } from "./LucideIcon";

export interface SatelliteSpec {
  id: string;
  label: string;
  icon: string;
}

export type ContextNetworkPhase = "idle" | "hub" | "reveal" | "flow";

export interface ContextNetworkProps {
  satellites: readonly SatelliteSpec[];
  hubX: number;
  hubY: number;
  /** Ellipse semi-major axis (horizontal). */
  rx: number;
  /** Ellipse semi-minor axis (vertical). */
  ry: number;
  phase: ContextNetworkPhase;
  hoveredIndex?: number | null;
  onHover?: (index: number | null) => void;
  /** Override the default "CONTEXT" hub label. */
  hubLabel?: string;
}

const E6_SAT_W = 184;
const E6_SAT_H = 88;
const E6_HUB_R = 60;
const E6_REVEAL_DELAY_MS = 200;
const E6_REVEAL_START_MS = 280;

export function ContextNetwork({
  satellites,
  hubX,
  hubY,
  rx,
  ry,
  phase,
  hoveredIndex = null,
  onHover,
  hubLabel = "CONTEXT",
}: ContextNetworkProps) {
  const N = satellites.length;
  const positions = satellites.map((s, i) => {
    const theta = (i * 2 * Math.PI) / N - Math.PI / 2;
    return {
      ...s,
      x: hubX + Math.cos(theta) * rx,
      y: hubY + Math.sin(theta) * ry,
      theta,
    };
  });

  const arrowSeg = (p: { x: number; y: number }) => {
    const dx = hubX - p.x;
    const dy = hubY - p.y;
    const angle = Math.atan2(dy, dx);
    const halfW = E6_SAT_W / 2;
    const halfH = E6_SAT_H / 2;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const tx = halfW / Math.abs(cosA || 0.0001);
    const ty = halfH / Math.abs(sinA || 0.0001);
    const tBox = Math.min(tx, ty) + 4;
    const x1 = p.x + cosA * tBox;
    const y1 = p.y + sinA * tBox;
    const tHub = E6_HUB_R + 4;
    const x2 = hubX - cosA * tHub;
    const y2 = hubY - sinA * tHub;
    return { x1, y1, x2, y2 };
  };

  const hubVisible = phase !== "idle";
  const visible = phase === "reveal" || phase === "flow";
  const flowing = phase === "flow";

  const hubStyle: CSSProperties = {
    left: hubX,
    top: hubY,
    width: E6_HUB_R * 2,
    height: E6_HUB_R * 2,
    opacity: hubVisible ? 1 : 0,
    transform: `translate(-50%, -50%) scale(${hubVisible ? 1 : 0.7})`,
    transition: "opacity 0.45s var(--ease), transform 0.45s var(--ease)",
  };

  return (
    <div
      data-testid="context-network"
      data-phase={phase}
      style={{ position: "absolute", inset: 0 }}
    >
      <svg className="svg-layer" data-testid="context-network-svg">
        <defs>
          <marker
            id="e6-arrow-base"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="10"
            markerHeight="10"
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#c98a64" />
          </marker>
          <marker
            id="e6-arrow-active"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="12"
            markerHeight="12"
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#e8b893" />
          </marker>
        </defs>
        {positions.map((p, i) => {
          const seg = arrowSeg(p);
          const isActive = hoveredIndex === i;
          const delay = E6_REVEAL_START_MS + i * E6_REVEAL_DELAY_MS;
          return (
            <g key={p.id}>
              <line
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke={isActive ? "#e8b893" : "#c98a64"}
                strokeWidth={isActive ? 2.4 : 1.8}
                strokeLinecap="round"
                markerEnd={`url(#${isActive ? "e6-arrow-active" : "e6-arrow-base"})`}
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.55s var(--ease) ${delay}ms, stroke 0.25s var(--ease), stroke-width 0.25s var(--ease)`,
                }}
              />
              {flowing && (
                <circle
                  r={isActive ? 4.5 : 3.6}
                  fill={isActive ? "#fff1e3" : "#e8b893"}
                  style={{ filter: "drop-shadow(0 0 6px #c98a64)" }}
                >
                  <animateMotion
                    dur={`${1.6 + (i % 2) * 0.2}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.18}s`}
                    path={`M ${seg.x1} ${seg.y1} L ${seg.x2} ${seg.y2}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      <div
        data-testid="context-network-hub"
        className="hub e6-hub"
        style={hubStyle}
      >
        {hubLabel}
      </div>

      {positions.map((p, i) => {
        const isActive = hoveredIndex === i;
        const delay = E6_REVEAL_START_MS + i * E6_REVEAL_DELAY_MS;
        return (
          <div
            key={p.id}
            data-testid={`context-network-sat-${p.id}`}
            className={`satellite e6-sat${isActive ? " active" : ""}`}
            onMouseEnter={() => onHover && onHover(i)}
            onMouseLeave={() => onHover && onHover(null)}
            style={{
              left: p.x,
              top: p.y,
              width: E6_SAT_W,
              height: E6_SAT_H,
              opacity: visible ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.85})`,
              transition: `opacity 0.45s var(--ease) ${delay}ms, transform 0.45s var(--ease) ${delay}ms, border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease)`,
              cursor: "pointer",
            }}
          >
            <span className="e6-sat-icon-wrap">
              <LucideIcon name={p.icon} size={28} />
            </span>
            <span className="label">{p.label}</span>
          </div>
        );
      })}
    </div>
  );
}
