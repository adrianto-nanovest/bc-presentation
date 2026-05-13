// HookColumn — Section F.6 canonical 3-column "Three hooks doing the unsexy
// work" canvas. Per spec §9.4, each column is ~200px wide and contains:
//   1. Header — mono uppercase "COL N · <type>" in copper-300, 11px
//   2. Sketch-style SVG illustration (~140px tall, 1.5px stroke neutral-200)
//   3. Italic serif copper-200 tagline (13px) beneath
//
// Three column types (per spec §9.4 default state):
//   - SessionStart: put PDF/DOCX/XLSX into a bucket → .md files
//     emerge below. "auto-convert to structured data"
//   - PostToolUse: a clipboard with audit log lines showing Edit/Write entries
//     in mono uppercase. "every action recorded"
//   - Stop: a stylized owl with a thought-bubble containing
//     "wait — did anyone ack the report?" rendered in serif italic.
//     "human gate at session end"
//
// All illustrations are pure SVG sketch-style line art with copper accents
// reserved for highlights only — matches deck-wide single-hue copper rule.
import type { JSX } from "react";
import { Reveal } from "./Reveal";

export interface HookColumnProps {
  type: "SessionStart" | "PostToolUse" | "Stop";
  /** Stagger reveal gate. */
  on: boolean;
  /** Reveal delay (ms). */
  delay?: number;
}

const STROKE = "var(--neutral-200)";
const COPPER_ACCENT = "var(--copper-200)";

const COLUMN_INDEX: Record<HookColumnProps["type"], number> = {
  SessionStart: 1,
  PostToolUse: 2,
  Stop: 3,
};

const TAGLINES: Record<HookColumnProps["type"], string> = {
  SessionStart: "auto-convert to structured data",
  PostToolUse: "every action recorded",
  Stop: "human gate at session end",
};

// ───────────────────── illustrations ─────────────────────
// Each illustration is rendered inside a 180×140 viewBox so the column's
// fixed 200px-wide footprint has small horizontal breathing room (10px each
// side after padding). Stroke is 1.5px neutral-200; copper accents are
// reserved for the highlight glyphs called out in spec §9.4.

function SessionStartSketch() {
  return (
    <svg
      viewBox="0 0 180 140"
      width="150"
      height="100"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke={STROKE}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >

      {/* falling document icons — PDF / DOCX / XLSX */}
      <g>
        {/* PDF */}
        <rect x="60" y="20" width="22" height="26" rx="1" />
        <path d="M60 26 L82 26" />
        <text
          x="71"
          y="40"
          textAnchor="middle"
          fontSize="6"
          fill={STROKE}
          stroke="none"
          fontFamily="var(--mono)"
          letterSpacing="0.05em"
        >
          PDF
        </text>
      </g>
      <g>
        {/* DOCX — angled mid-fall */}
        <g transform="rotate(-8 95 38)">
          <rect x="84" y="28" width="22" height="26" rx="1" />
          <path d="M84 34 L106 34" />
          <text
            x="95"
            y="48"
            textAnchor="middle"
            fontSize="6"
            fill={STROKE}
            stroke="none"
            fontFamily="var(--mono)"
            letterSpacing="0.05em"
          >
            DOCX
          </text>
        </g>
      </g>
      <g>
        {/* XLSX — tilted other way */}
        <g transform="rotate(6 117 36)">
          <rect x="106" y="26" width="22" height="26" rx="1" />
          <path d="M106 32 L128 32" />
          <text
            x="117"
            y="46"
            textAnchor="middle"
            fontSize="6"
            fill={STROKE}
            stroke="none"
            fontFamily="var(--mono)"
            letterSpacing="0.05em"
          >
            XLSX
          </text>
        </g>
      </g>

      {/* bucket */}
      <g>
        <path d="M52 70 L60 102 L120 102 L128 70 Z" />
        <path d="M50 70 L130 70" />
        {/* small handle stub */}
        <path d="M58 70 Q90 64 122 70" strokeDasharray="2 3" opacity="0.6" />
      </g>

      {/* downward arrow */}
      <g stroke={COPPER_ACCENT}>
        <path d="M90 106 L90 116" />
        <path d="M86 113 L90 117 L94 113" />
      </g>

      {/* .md outputs — three small cards */}
      <g>
        {[
          { x: 40 },
          { x: 78 },
          { x: 116 },
        ].map((cfg, i) => (
          <g key={i} transform={`translate(${cfg.x}, 120)`}>
            <rect width="24" height="14" rx="1" />
            <text
              x="12"
              y="10"
              textAnchor="middle"
              fontSize="6"
              fill={COPPER_ACCENT}
              stroke="none"
              fontFamily="var(--mono)"
              letterSpacing="0.05em"
            >
              .md
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function PostToolUseSketch() {
  return (
    <svg
      viewBox="0 0 180 140"
      width="150"
      height="100"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke={STROKE}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* clipboard outer */}
      <g>
        <rect x="32" y="14" width="116" height="116" rx="3" />
        {/* clip at top */}
        <rect x="74" y="6" width="32" height="14" rx="2" />
        <path d="M82 6 L82 2 L98 2 L98 6" />
      </g>

      {/* header rule */}
      <path
        d="M42 32 L138 32"
        stroke={COPPER_ACCENT}
        strokeWidth={1}
      />

      {/* audit log lines: 4 horizontal stripes with mono labels */}
      <g>
        {[
          { y: 44, label: "EDIT" },
          { y: 62, label: "WRITE" },
          { y: 80, label: "EDIT" },
          { y: 98, label: "WRITE" },
        ].map((row, i) => (
          <g key={i}>
            {/* tick / bullet */}
            <circle
              cx="44"
              cy={row.y + 4}
              r="1.5"
              fill={COPPER_ACCENT}
              stroke="none"
            />
            {/* label */}
            <text
              x="52"
              y={row.y + 7}
              fontSize="7"
              fill={STROKE}
              stroke="none"
              fontFamily="var(--mono)"
              letterSpacing="0.18em"
            >
              {row.label}
            </text>
            {/* underline scratch */}
            <path
              d={`M82 ${row.y + 6} L134 ${row.y + 6}`}
              strokeWidth={1}
              opacity={0.55}
            />
          </g>
        ))}
      </g>

      {/* footer subtle line */}
      <path d="M42 118 L138 118" strokeWidth={1} opacity={0.45} />
    </svg>
  );
}

function StopSketch() {
  return (
    <svg
      viewBox="0 0 180 140"
      width="150"
      height="100"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke={STROKE}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* thought bubble */}
      <g>
        <path d="M62 12 Q70 4 84 6 Q96 2 108 8 Q124 6 132 18 Q142 26 138 38 Q142 50 130 54 L70 54 Q58 52 56 40 Q50 32 56 22 Z" />
        {/* thought text — serif italic */}
        <text
          x="98"
          y="26"
          textAnchor="middle"
          fontSize="8"
          fill={STROKE}
          stroke="none"
          fontFamily="var(--serif)"
          fontStyle="italic"
        >
          wait — did anyone
        </text>
        <text
          x="98"
          y="40"
          textAnchor="middle"
          fontSize="8"
          fill={COPPER_ACCENT}
          stroke="none"
          fontFamily="var(--serif)"
          fontStyle="italic"
        >
          ack the report?
        </text>
        {/* thought-bubble trailing puffs */}
        <circle cx="64" cy="62" r="3" />
        <circle cx="58" cy="70" r="2" />
        <circle cx="54" cy="76" r="1.4" />
      </g>

      {/* owl — body */}
      <g transform="translate(70, 78)">
        {/* head */}
        <path d="M5 18 Q0 6 14 2 Q22 -2 30 2 Q44 6 39 18 Q44 30 30 34 L14 34 Q0 30 5 18 Z" />
        {/* ear tufts */}
        <path d="M8 4 L4 -2" />
        <path d="M36 4 L40 -2" />
        {/* eyes (large circles, copper accent pupils) */}
        <circle cx="16" cy="16" r="5" />
        <circle cx="28" cy="16" r="5" />
        <circle cx="16" cy="16" r="1.6" fill={COPPER_ACCENT} stroke="none" />
        <circle cx="28" cy="16" r="1.6" fill={COPPER_ACCENT} stroke="none" />
        {/* beak */}
        <path d="M22 22 L20 26 L24 26 Z" />
        {/* body / wing */}
        <path d="M8 34 Q4 48 12 56 L32 56 Q40 48 36 34" />
        <path d="M14 38 Q18 50 22 52" opacity={0.6} />
        <path d="M30 38 Q26 50 22 52" opacity={0.6} />
        {/* feet */}
        <path d="M16 56 L16 60 M14 60 L18 60" />
        <path d="M28 56 L28 60 M26 60 L30 60" />
      </g>
    </svg>
  );
}

const SKETCHES: Record<HookColumnProps["type"], () => JSX.Element> = {
  SessionStart: SessionStartSketch,
  PostToolUse: PostToolUseSketch,
  Stop: StopSketch,
};

// ───────────────────── column ─────────────────────

export function HookColumn({ type, on, delay = 0 }: HookColumnProps) {
  const Sketch = SKETCHES[type];
  const tagline = TAGLINES[type];
  const colIndex = COLUMN_INDEX[type];

  return (
    <Reveal
      on={on}
      delay={delay}
      data-testid={`hook-column-${type}`}
      style={{
        width: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      {/* header — mono uppercase "COL N · <type>" */}
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.16em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        COL {colIndex} · {type}
      </div>

      {/* sketch */}
      <div
        style={{
          width: 150,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sketch />
      </div>

      {/* tagline */}
      <div
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 11,
          color: "var(--copper-200)",
          textAlign: "center",
          lineHeight: 1.35,
          maxWidth: 168,
        }}
      >
        {tagline}
      </div>
    </Reveal>
  );
}
