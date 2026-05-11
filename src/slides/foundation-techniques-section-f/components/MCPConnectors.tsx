// MCPConnectors — Section F right-side adjunct to the layer cake.
//
// Renders a vertical column of small connector "dots" (24px circles with a
// copper-800 border + neutral-900 fill, each holding a LucideIcon) paired
// with a mono-uppercase label. Each connector also draws a thin sketchy line
// from its dot back toward the layer cake's right edge.
//
// Used as a cake adjunct in F.3 (spec §6.4 default canvas) and again in F.5
// to emphasise MCP-as-protocol. The whole group fan-in animates when `on`
// flips to true — each row revealed with a staggered delay of `i * 80ms`.
//
// Geometry intentionally lives inside the component (the parent just supplies
// `cakeRightEdge` so the connecting lines land in the right place). The SVG
// uses `stroke-dasharray` to keep the lines feeling sketched, matching the
// section's pen-and-paper aesthetic.
import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { LucideIcon } from "./LucideIcon";

export interface MCPConnectorItem {
  /** Display name. E.g. "Notion", "GitHub". */
  name: string;
  /** lucide-react icon name (resolved via LucideIcon component). */
  icon: string;
}

export interface MCPConnectorsProps {
  logos: readonly MCPConnectorItem[];
  /** Fan-in reveal gate. When true, rows cascade in with i*80ms stagger. */
  on: boolean;
  /**
   * X-coordinate (in this container's local space) where each connecting
   * line should terminate (i.e. the cake's right edge). Defaults to 0 —
   * the very left edge of this column. Negative values let the line bleed
   * leftward toward an adjacent cake panel.
   */
  cakeRightEdge?: number;
}

// Dot diameter + row spacing.
const DOT = 24;
const ROW_GAP = 18;
const ROW_H = 28; // visual row height (label + dot share the same vertical center)

export function MCPConnectors({
  logos,
  on,
  cakeRightEdge = 0,
}: MCPConnectorsProps) {
  // Container width: enough room for the dot (24) + 8px gap + label (~80).
  const containerWidth = 132;
  const totalHeight = logos.length * ROW_H + (logos.length - 1) * (ROW_GAP - 0);

  return (
    <div
      data-testid="f-mcp-connectors"
      style={{
        position: "relative",
        width: containerWidth,
        display: "flex",
        flexDirection: "column",
        gap: ROW_GAP,
      }}
    >
      {/* SVG layer for the sketchy connector lines. Absolutely positioned so
          it overlaps the row column; pointer-events none so it never traps
          hover. Width spans from `cakeRightEdge` (which may be negative) to
          the dot's left edge. */}
      <svg
        data-testid="f-mcp-connector-lines"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: cakeRightEdge,
          top: 0,
          width: -cakeRightEdge + DOT / 2,
          height: totalHeight,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        {logos.map((logo, i) => {
          const cy = i * (ROW_H + ROW_GAP) + ROW_H / 2;
          // Line goes from (0, cy) → (rightEnd, cy) where rightEnd is the
          // dot's horizontal center within this SVG's local coordinate space.
          const x2 = -cakeRightEdge + DOT / 2;
          return (
            <line
              key={logo.name}
              data-testid={`f-mcp-line-${logo.name}`}
              x1={0}
              y1={cy}
              x2={x2}
              y2={cy}
              stroke="var(--copper-500)"
              strokeWidth={1}
              strokeDasharray="3 3"
              opacity={on ? 0.7 : 0}
              style={{
                transition: `opacity 360ms var(--ease) ${i * 80}ms`,
              }}
            />
          );
        })}
      </svg>

      {logos.map((logo, i) => (
        <Reveal
          key={logo.name}
          on={on}
          delay={i * 80}
          data-testid={`f-mcp-connector-${logo.name}`}
        >
          <ConnectorRow item={logo} />
        </Reveal>
      ))}
    </div>
  );
}

// ───────────────────────── ConnectorRow ─────────────────────────

interface ConnectorRowProps {
  item: MCPConnectorItem;
}
function ConnectorRow({ item }: ConnectorRowProps) {
  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: ROW_H,
  };
  const dotStyle: CSSProperties = {
    width: DOT,
    height: DOT,
    borderRadius: "50%",
    border: "1px solid var(--copper-800)",
    background: "var(--neutral-900)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };
  const labelStyle: CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: 10,
    letterSpacing: "0.18em",
    color: "var(--neutral-200)",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  };
  return (
    <div style={rowStyle}>
      <div style={dotStyle}>
        <LucideIcon name={item.icon} size={14} color="var(--copper-200)" />
      </div>
      <span style={labelStyle}>{item.name}</span>
    </div>
  );
}
