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
const VB_H = 248;

// Shared vertical band for all three zones — files, platter, and agents are
// each repositioned so their bounding boxes align inside [ZONE_TOP, ZONE_BOTTOM].
// The platter keeps its flat aspect ratio and centers within the band; the file
// stack and agent stack span the full band so all three columns read as equal
// height. Title row sits ~15px above the band so titles read as labels on top
// of each column rather than as a separate header strip.
const TITLE_Y = 22;
const ZONE_TOP = 38;
const ZONE_BOTTOM = 218;
const ZONE_CENTER_Y = (ZONE_TOP + ZONE_BOTTOM) / 2; // 128

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
      {/* ───────────── Zone titles ───────────── */}
      <g data-testid="bridge-titles">
        <ZoneTitle x={80} label="SOURCES" c={c} />
        <ZoneTitle x={290} label="STORAGE" c={c} />
        <ZoneTitle x={515} label="RETRIEVAL" c={c} />
      </g>

      {/* ───────────── LEFT: chaotic raw data ───────────── */}
      <g data-testid="bridge-left" transform={`translate(40, ${ZONE_TOP})`}>
        {/* Squiggly noise lines around the file stack */}
        <g stroke={c.chaos} strokeWidth="1" fill="none" opacity="0.6">
          <path d="M -18 24 q 6 -6 12 0 t 12 0" />
          <path d="M 78 40 q 6 -6 12 0 t 12 0" />
          <path d="M -22 78 q 6 -6 12 0 t 12 0" />
          <path d="M 82 122 q 6 -6 12 0 t 12 0" />
          <path d="M -10 170 q 6 -6 12 0 t 12 0" />
        </g>
        {/* 4 chaotic source files — slight rotations for hand-drawn feel.
            Y offsets stride 48px so the stack spans the full zone height. */}
        <FileIcon x={4} y={0} label=".csv" fill={c.chaosText} rotate={-4} />
        <FileIcon x={36} y={48} label=".xlsx" fill={c.chaosText} rotate={3} />
        <FileIcon x={4} y={96} label=".pdf" fill={c.chaosText} rotate={-2} />
        <FileIcon x={40} y={144} label=".docx" fill={c.chaosText} rotate={4} />
      </g>

      {/* Arrow: left → platter (ends at x=162, just outside platter rim at x=166) */}
      <Arrow x1={128} x2={162} y={ZONE_CENTER_Y} color={c.accent} />

      {/* ───────────── MIDDLE: silver platter ───────────── */}
      <g data-testid="bridge-platter" transform={`translate(${VB_W / 2}, ${ZONE_CENTER_Y})`}>
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

      {/* Arrow: platter → agents (starts at x=418, just past platter rim at x=414) */}
      <Arrow x1={418} x2={485} y={ZONE_CENTER_Y} color={c.accent} />

      {/* ───────────── RIGHT: agent consumers ─────────────
          Translate.y = ZONE_TOP − 8 so AgentBadge cy = y_prop + 30 puts the
          first badge top at ZONE_TOP (badge r=22 → first cy = ZONE_TOP + 22).
          With y_prop = 0 / 68 / 136 the three centers land at
          (ZONE_TOP + 22), ZONE_CENTER_Y, (ZONE_BOTTOM − 22). */}
      <g data-testid="bridge-right" transform={`translate(485, ${ZONE_TOP - 8})`}>
        <AgentBadge y={0} icon="Search" c={c} />
        <AgentBadge y={68} icon="Bot" c={c} />
        <AgentBadge y={136} icon="Settings" c={c} />
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

// Zone label rendered above each column — mono uppercase, copper-200, dims with
// the artifact in `dim` mode via the shared palette's `muted` channel.
interface ZoneTitleProps {
  x: number;
  label: string;
  c: PaletteColors;
}
function ZoneTitle({ x, label, c }: ZoneTitleProps) {
  return (
    <text
      x={x}
      y={TITLE_Y}
      textAnchor="middle"
      fill={c.muted}
      fontSize="10"
      fontFamily="var(--mono)"
      letterSpacing="2.4"
      opacity="0.82"
    >
      {label}
    </text>
  );
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

// "hybrid" mode — ALL FOUR retrieval primitives co-existing inside one
// platter (R2-2):
//   1. vector — subtle dot-grid pattern as the background wash
//   2. graph  — compact node-edge cluster (top-left)
//   3. file   — single .md card (bottom-center)
//   4. BM25   — small search box + ranked text-line results (top-right)
// The mix reads as "vector + graph + keyword + file" — the visual cue that
// hybrid RAG blends multiple retrieval modalities. All four are sized to fit
// within the platter's inner ellipse clip (rx≈115, ry≈68).
function PlatterHybrid({ active, c }: PlatterVariantProps) {
  // ─── Top-left cluster: graph nodes + edges (compact) ───
  const graphNodes = [
    { x: -92, y: -42 },
    { x: -66, y: -52 },
    { x: -54, y: -28 },
    { x: -82, y: -18 },
  ];
  const graphEdges: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [0, 2],
  ];

  // ─── Top-right cluster: BM25 search box + 3 ranked result rows ───
  // Reduced from 4 to 3 result rows so the panel fits alongside the graph
  // cluster within the inner ellipse clip.
  const bm25X = 32; // left edge of the BM25 panel inside the platter
  const bm25Y = -52;
  const resultRows = [
    { w: 52, opacity: 1 },
    { w: 44, opacity: 0.72 },
    { w: 36, opacity: 0.5 },
  ];

  // ─── Background layer: vector dot grid (subtle) ───
  // R2-2: re-added in round 2. Small dots + low opacity so it reads as a
  // background wash behind graph/BM25/md, not as a focal element. Same 10×6
  // lattice as PlatterVector, masked to the inner ellipse via the platter clip.
  const vCols = 10;
  const vRows = 6;
  const vStepX = 18;
  const vStepY = 14;
  const vOffsetX = -((vCols - 1) * vStepX) / 2;
  const vOffsetY = -((vRows - 1) * vStepY) / 2;
  const vDots: React.ReactNode[] = [];
  for (let r = 0; r < vRows; r++) {
    for (let col = 0; col < vCols; col++) {
      const x = vOffsetX + col * vStepX;
      const y = vOffsetY + r * vStepY;
      const dx = x / 100;
      const dy = y / 56;
      if (dx * dx + dy * dy > 1) continue;
      vDots.push(
        <circle
          key={`v-${r}-${col}`}
          cx={x}
          cy={y}
          r="1"
          fill={c.accent}
          opacity={0.18 + ((r + col) % 3) * 0.04}
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
      {/* BACKGROUND — vector dot grid (subtle wash) */}
      <g data-testid="platter-hybrid-vector">{vDots}</g>

      {/* TOP-LEFT — graph nodes + edges */}
      <g data-testid="platter-hybrid-graph">
        {graphEdges.map(([a, b], i) => (
          <line
            key={i}
            x1={graphNodes[a].x}
            y1={graphNodes[a].y}
            x2={graphNodes[b].x}
            y2={graphNodes[b].y}
            stroke={c.accentDeep}
            strokeWidth="0.7"
            opacity="0.85"
          />
        ))}
        {graphNodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r="3"
              fill="rgba(38,38,38,0.92)"
              stroke={c.accent}
              strokeWidth="1"
            />
            <circle cx={n.x} cy={n.y} r="1" fill={c.fg} />
          </g>
        ))}
      </g>

      {/* BOTTOM-CENTER — single .md card (compact, sized to fit alongside
          the graph/BM25 panels within the inner ellipse clip). */}
      <g data-testid="platter-hybrid-md" transform="translate(-26, 14)">
        <rect
          x="0"
          y="0"
          width="52"
          height="34"
          rx="2"
          fill="rgba(38,38,38,0.92)"
          stroke={c.muted}
          strokeWidth="1"
        />
        <text
          x="5"
          y="11"
          fill={c.fg}
          fontSize="6.5"
          fontFamily="var(--mono)"
          letterSpacing="0.04em"
        >
          .md
        </text>
        <text
          x="5"
          y="20"
          fill={c.fg}
          fontSize="5.5"
          fontFamily="var(--mono)"
          opacity="0.85"
        >
          notes
        </text>
        <line
          x1="5"
          y1="25"
          x2="42"
          y2="25"
          stroke={c.muted}
          strokeWidth="0.6"
          opacity="0.7"
        />
        <line
          x1="5"
          y1="30"
          x2="32"
          y2="30"
          stroke={c.accent}
          strokeWidth="1.2"
        />
      </g>

      {/* TOP-RIGHT — BM25 keyword-search box with ranked results */}
      <g data-testid="platter-hybrid-bm25" transform={`translate(${bm25X}, ${bm25Y})`}>
        {/* Search box */}
        <rect
          x="0"
          y="0"
          width="72"
          height="14"
          rx="1"
          fill="rgba(38,38,38,0.7)"
          stroke={c.muted}
          strokeWidth="0.8"
        />
        {/* Magnifier icon */}
        <circle
          cx="6"
          cy="7"
          r="2.4"
          fill="none"
          stroke={c.accent}
          strokeWidth="0.8"
        />
        <line
          x1="8"
          y1="9"
          x2="10.5"
          y2="11.5"
          stroke={c.accent}
          strokeWidth="0.8"
        />
        <text
          x="14"
          y="10"
          fill={c.fg}
          fontSize="6.5"
          fontFamily="var(--mono)"
          letterSpacing="0.06em"
          opacity="0.85"
        >
          BM25
        </text>
        {/* Ranked result rows */}
        {resultRows.map((row, i) => (
          <g key={i} transform={`translate(0, ${20 + i * 9})`}>
            {/* Rank pill */}
            <rect
              x="0"
              y="0"
              width="8"
              height="6"
              fill="none"
              stroke={c.muted}
              strokeWidth="0.6"
              opacity={row.opacity}
            />
            <text
              x="4"
              y="4.8"
              textAnchor="middle"
              fill={c.muted}
              fontSize="5"
              fontFamily="var(--mono)"
              opacity={row.opacity}
            >
              {i + 1}
            </text>
            {/* Result line */}
            <line
              x1="12"
              y1="3"
              x2={12 + row.w}
              y2="3"
              stroke={c.accent}
              strokeWidth="1.2"
              opacity={row.opacity}
            />
          </g>
        ))}
      </g>
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
