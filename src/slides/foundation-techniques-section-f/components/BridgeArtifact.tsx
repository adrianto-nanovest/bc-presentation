// BridgeArtifact — Section F's "silver-platter" illustration.
//
// Reference: docs/examples/bridge-artifact.png. Three zones, left → right:
//   LEFT   chaotic raw data (.csv, .xlsx, .pdf, .docx) with squiggly noise lines
//   MIDDLE the silver platter — flat ellipse, copper rim. Content morphs by `mode`
//          (file = stack of .md files [default], vector = dot grid,
//           graph = node-edge network, hybrid = grid + .md overlays w/ keyword
//           underlines).
//   RIGHT  three agent consumers — search / bot / settings icons.
//
// Mode morph is implemented as four absolutely-positioned <g> elements layered
// inside the platter's <svg>; only one has `opacity:1` at a time, others fade
// out via `transition: opacity 700ms var(--ease)`. No layout shift.
//
// `dim` swaps copper for neutral grey and lowers overall opacity — F.1 uses
// this for the monochrome teaser pillar.
//
// Used by: F.1 (dim), F.2 (active mode driven by RAGTypesCarousel).
import type { CSSProperties } from "react";
import { LucideIcon } from "./LucideIcon";

export type BridgeMode = "default" | "vector" | "graph" | "file" | "hybrid";

export interface BridgeArtifactProps {
  /** Which platter content is foregrounded. "default" === "file". */
  mode?: BridgeMode;
  /** F.1 preview state — drop opacity, swap copper for neutral. */
  dim?: boolean;
  /** Override SVG width (default 580). Height scales to maintain ratio. */
  size?: number;
}

// Native viewBox; size prop scales via outer width. Height is ratio-locked.
const VB_W = 580;
const VB_H = 280;

// Resolve the foreground variant — "default" maps to "file" per spec.
function resolveMode(mode: BridgeMode): Exclude<BridgeMode, "default"> {
  return mode === "default" ? "file" : mode;
}

export function BridgeArtifact({
  mode = "default",
  dim = false,
  size = 580,
}: BridgeArtifactProps) {
  const active = resolveMode(mode);

  // Palette swap: dim mode falls back to a single neutral tone so the
  // illustration reads as a low-contrast preview (F.1 silhouette pillar).
  const c = {
    rim: dim ? "var(--neutral-500)" : "var(--copper-400)",
    rimSoft: dim ? "var(--neutral-700)" : "var(--copper-700)",
    accent: dim ? "var(--neutral-300)" : "var(--copper-300)",
    accentDeep: dim ? "var(--neutral-500)" : "var(--copper-600)",
    fg: dim ? "var(--neutral-300)" : "var(--copper-100)",
    muted: dim ? "var(--neutral-500)" : "var(--copper-200)",
    chaos: "var(--neutral-500)",
    chaosText: "var(--neutral-300)",
  };

  const wrapperStyle: CSSProperties = {
    opacity: dim ? 0.4 : 1,
    display: "block",
  };

  return (
    <svg
      data-testid="bridge-artifact"
      data-mode={active}
      width={size}
      height={(size * VB_H) / VB_W}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      style={wrapperStyle}
      role="img"
      aria-label="Bridge artifact: raw data files flow through the silver platter, agents consume distilled summaries."
    >
      {/* ───────────── LEFT: chaotic raw data ───────────── */}
      <g data-testid="bridge-left" transform="translate(40, 70)">
        {/* Squiggly noise lines around the file stack */}
        <g stroke={c.chaos} strokeWidth="1" fill="none" opacity="0.6">
          <path d="M -18 18 q 6 -6 12 0 t 12 0" />
          <path d="M -22 70 q 6 -6 12 0 t 12 0" />
          <path d="M 78 32 q 6 -6 12 0 t 12 0" />
          <path d="M 82 88 q 6 -6 12 0 t 12 0" />
          <path d="M -10 130 q 6 -6 12 0 t 12 0" />
        </g>
        {/* 4 chaotic source files — slight rotations for hand-drawn feel */}
        <FileIcon x={4} y={4} label=".csv" fill={c.chaosText} rotate={-4} />
        <FileIcon x={36} y={28} label=".xlsx" fill={c.chaosText} rotate={3} />
        <FileIcon x={6} y={62} label=".pdf" fill={c.chaosText} rotate={-2} />
        <FileIcon x={40} y={96} label=".docx" fill={c.chaosText} rotate={5} />
      </g>

      {/* Arrow: left → platter */}
      <Arrow x1={150} x2={195} y={140} color={c.accent} />

      {/* ───────────── MIDDLE: silver platter ───────────── */}
      <g data-testid="bridge-platter" transform={`translate(${VB_W / 2}, ${VB_H / 2})`}>
        {/* Platter rim — flat ellipse with subtle inner shadow */}
        <defs>
          <radialGradient
            id="platter-inner"
            cx="50%"
            cy="45%"
            r="65%"
          >
            <stop offset="0%" stopColor="rgba(244,228,210,0.06)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
          </radialGradient>
          {/* Clip platter content to the inner ellipse so it never spills the rim */}
          <clipPath id="platter-clip">
            <ellipse cx="0" cy="0" rx="115" ry="68" />
          </clipPath>
        </defs>
        {/* Outer rim ring */}
        <ellipse
          cx="0"
          cy="0"
          rx="124"
          ry="76"
          fill="none"
          stroke={c.rim}
          strokeWidth="2"
        />
        {/* Inner well */}
        <ellipse
          cx="0"
          cy="0"
          rx="115"
          ry="68"
          fill="url(#platter-inner)"
          stroke={c.rimSoft}
          strokeWidth="1"
        />
        {/* Thin highlight arc — silver-platter sheen */}
        <path
          d="M -90 -32 q 90 -28 180 0"
          stroke={c.muted}
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />

        {/* Platter content — all variants stacked, fade by `active` */}
        <g clipPath="url(#platter-clip)">
          <PlatterFile active={active === "file"} c={c} />
          <PlatterVector active={active === "vector"} c={c} />
          <PlatterGraph active={active === "graph"} c={c} />
          <PlatterHybrid active={active === "hybrid"} c={c} />
        </g>
      </g>

      {/* Arrow: platter → agents */}
      <Arrow x1={425} x2={470} y={140} color={c.accent} />

      {/* ───────────── RIGHT: agent consumers ───────────── */}
      <g data-testid="bridge-right" transform="translate(485, 60)">
        <AgentBadge y={0} icon="Search" c={c} />
        <AgentBadge y={70} icon="Bot" c={c} />
        <AgentBadge y={140} icon="Settings" c={c} />
      </g>
    </svg>
  );
}

// ─────────────────────────── Sub-components ───────────────────────────

interface PaletteColors {
  rim: string;
  rimSoft: string;
  accent: string;
  accentDeep: string;
  fg: string;
  muted: string;
  chaos: string;
  chaosText: string;
}

// Small dog-eared file icon used for the chaotic left zone.
interface FileIconProps {
  x: number;
  y: number;
  label: string;
  fill: string;
  rotate?: number;
}
function FileIcon({ x, y, label, fill, rotate = 0 }: FileIconProps) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
      <path
        d="M 0 0 L 24 0 L 32 8 L 32 38 L 0 38 Z"
        fill="rgba(38,38,38,0.55)"
        stroke={fill}
        strokeWidth="1"
      />
      <path d="M 24 0 L 24 8 L 32 8" fill="none" stroke={fill} strokeWidth="1" />
      <text
        x="16"
        y="26"
        textAnchor="middle"
        fill={fill}
        fontSize="8"
        fontFamily="var(--mono)"
        letterSpacing="0.04em"
      >
        {label}
      </text>
    </g>
  );
}

// Single .md card rendered inside the platter.
interface MdCardProps {
  x: number;
  y: number;
  label: string;
  c: PaletteColors;
  highlight?: boolean;
}
function MdCard({ x, y, label, c, highlight = false }: MdCardProps) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="0"
        y="0"
        width="58"
        height="40"
        rx="2"
        fill="rgba(38,38,38,0.65)"
        stroke={c.muted}
        strokeWidth="1"
      />
      <text
        x="6"
        y="13"
        fill={c.fg}
        fontSize="7"
        fontFamily="var(--mono)"
        letterSpacing="0.04em"
      >
        .md
      </text>
      <text
        x="6"
        y="25"
        fill={c.fg}
        fontSize="6"
        fontFamily="var(--mono)"
        opacity="0.85"
      >
        {label}
      </text>
      {/* Body lines */}
      <line x1="6" y1="30" x2="46" y2="30" stroke={c.muted} strokeWidth="0.6" opacity="0.7" />
      <line x1="6" y1="34" x2="38" y2="34" stroke={c.muted} strokeWidth="0.6" opacity="0.55" />
      {highlight && (
        // Keyword underline beneath body — hybrid mode signal
        <line x1="8" y1="36" x2="22" y2="36" stroke={c.accent} strokeWidth="1.4" />
      )}
    </g>
  );
}

// "file" mode — canonical .md stack (default).
interface PlatterVariantProps {
  active: boolean;
  c: PaletteColors;
}
function PlatterFile({ active, c }: PlatterVariantProps) {
  return (
    <g
      data-testid="platter-file"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 700ms var(--ease)",
      }}
    >
      <MdCard x={-64} y={-44} label="weekly_report" c={c} />
      <MdCard x={6} y={-44} label="meeting_notes" c={c} />
      <MdCard x={-64} y={4} label="inbox_summary" c={c} />
      <MdCard x={6} y={4} label="decisions" c={c} />
    </g>
  );
}

// "vector" mode — dot grid (10×6).
function PlatterVector({ active, c }: PlatterVariantProps) {
  const cols = 10;
  const rows = 6;
  const stepX = 18;
  const stepY = 14;
  const offsetX = -((cols - 1) * stepX) / 2;
  const offsetY = -((rows - 1) * stepY) / 2;
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      // Mask corners to fit the ellipse
      const x = offsetX + col * stepX;
      const y = offsetY + r * stepY;
      const dx = x / 100;
      const dy = y / 56;
      if (dx * dx + dy * dy > 1) continue;
      dots.push(
        <circle
          key={`${r}-${col}`}
          cx={x}
          cy={y}
          r="1.6"
          fill={c.accent}
          opacity={0.55 + ((r + col) % 3) * 0.15}
        />,
      );
    }
  }
  return (
    <g
      data-testid="platter-vector"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 700ms var(--ease)",
      }}
    >
      {dots}
    </g>
  );
}

// "graph" mode — 6 nodes with edges.
function PlatterGraph({ active, c }: PlatterVariantProps) {
  const nodes = [
    { x: -70, y: -20 },
    { x: -30, y: -40 },
    { x: 22, y: -30 },
    { x: 60, y: 0 },
    { x: 10, y: 30 },
    { x: -50, y: 24 },
  ];
  const edges: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
    [1, 4],
    [2, 5],
  ];
  return (
    <g
      data-testid="platter-graph"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 700ms var(--ease)",
      }}
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={c.accentDeep}
          strokeWidth="0.8"
          opacity="0.7"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r="5"
            fill="rgba(38,38,38,0.85)"
            stroke={c.accent}
            strokeWidth="1.2"
          />
          <circle cx={n.x} cy={n.y} r="1.6" fill={c.fg} />
        </g>
      ))}
    </g>
  );
}

// "hybrid" mode — dot grid background with 2–3 .md overlays + keyword underlines.
function PlatterHybrid({ active, c }: PlatterVariantProps) {
  const cols = 10;
  const rows = 6;
  const stepX = 18;
  const stepY = 14;
  const offsetX = -((cols - 1) * stepX) / 2;
  const offsetY = -((rows - 1) * stepY) / 2;
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const x = offsetX + col * stepX;
      const y = offsetY + r * stepY;
      const dx = x / 100;
      const dy = y / 56;
      if (dx * dx + dy * dy > 1) continue;
      dots.push(
        <circle
          key={`${r}-${col}`}
          cx={x}
          cy={y}
          r="1.2"
          fill={c.accent}
          opacity="0.35"
        />,
      );
    }
  }
  return (
    <g
      data-testid="platter-hybrid"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 700ms var(--ease)",
      }}
    >
      {dots}
      <MdCard x={-58} y={-22} label="notes" c={c} highlight />
      <MdCard x={4} y={-12} label="report" c={c} highlight />
      <MdCard x={-32} y={28} label="decisions" c={c} highlight />
    </g>
  );
}

// Right-side arrow connector between zones.
interface ArrowProps {
  x1: number;
  x2: number;
  y: number;
  color: string;
}
function Arrow({ x1, x2, y, color }: ArrowProps) {
  return (
    <g>
      <line
        x1={x1}
        y1={y}
        x2={x2 - 6}
        y2={y}
        stroke={color}
        strokeWidth="1.2"
        opacity="0.8"
      />
      <polygon
        points={`${x2},${y} ${x2 - 8},${y - 4} ${x2 - 8},${y + 4}`}
        fill={color}
        opacity="0.9"
      />
    </g>
  );
}

// Agent badge — circle with lucide icon centered.
interface AgentBadgeProps {
  y: number;
  icon: "Search" | "Bot" | "Settings";
  c: PaletteColors;
}
function AgentBadge({ y, icon, c }: AgentBadgeProps) {
  // The lucide icon is rendered as a foreignObject so we can reuse LucideIcon
  // (which yields a real <svg>). Anchor inside the badge circle.
  const cx = 30;
  const cy = y + 30;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r="22"
        fill="rgba(38,38,38,0.7)"
        stroke={c.accent}
        strokeWidth="1.2"
      />
      <foreignObject x={cx - 12} y={cy - 12} width="24" height="24">
        <div
          style={{
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: c.fg,
          }}
        >
          <LucideIcon name={icon} size={20} strokeWidth={1.4} />
        </div>
      </foreignObject>
    </g>
  );
}
