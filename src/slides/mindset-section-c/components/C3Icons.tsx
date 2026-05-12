// C3Icons — 14×14 SVG line glyphs used as per-bullet iconography on C.3
// (Executor → Orchestrator). Each glyph uses `currentColor` so the slide
// consumer can tint per side (copper-300 on the Executor side, copper-400
// on the Orchestrator side) via the wrapping element's CSS color.
//
// Common attributes: 1.4px stroke, fill="none", round caps/joins, viewBox
// "0 0 14 14". Keep paths minimal — these are 14px glyphs, not detailed
// icons.

import type { JSX } from "react";

const ICON_PROPS = {
  width: 14,
  height: 14,
  viewBox: "0 0 14 14",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const c3Icons: Record<string, JSX.Element> = {
  // ── EXECUTOR SIDE ───────────────────────────────────────────────────────

  // keyboard — rounded rectangle outline with 3 small key squares inside
  keyboard: (
    <svg {...ICON_PROPS}>
      <rect x={1.5} y={4} width={11} height={6} rx={1} />
      <line x1={3.5} y1={6.5} x2={4.5} y2={6.5} />
      <line x1={6.5} y1={6.5} x2={7.5} y2={6.5} />
      <line x1={9.5} y1={6.5} x2={10.5} y2={6.5} />
    </svg>
  ),

  // magnifier — circle + diagonal line handle
  magnifier: (
    <svg {...ICON_PROPS}>
      <circle cx={5.75} cy={5.75} r={3.5} />
      <line x1={8.5} y1={8.5} x2={12} y2={12} />
    </svg>
  ),

  // paperStack — 3 overlapping small rectangles offset diagonally
  paperStack: (
    <svg {...ICON_PROPS}>
      <rect x={1.5} y={4} width={7} height={8.5} />
      <rect x={3.5} y={2.5} width={7} height={8.5} />
      <rect x={5.5} y={1} width={7} height={8.5} />
    </svg>
  ),

  // repeatArrows — circular arrow loop (open-ended ring with arrowhead)
  repeatArrows: (
    <svg {...ICON_PROPS}>
      <path d="M 11.5 5 A 4.5 4.5 0 1 0 12 8" />
      <polyline points="9.5,3 11.5,5 13,3.5" />
    </svg>
  ),

  // clock — circle + 2 hand lines pointing 12 and 3
  clock: (
    <svg {...ICON_PROPS}>
      <circle cx={7} cy={7} r={5.25} />
      <line x1={7} y1={7} x2={7} y2={3.5} />
      <line x1={7} y1={7} x2={10} y2={7} />
    </svg>
  ),

  // ── ORCHESTRATOR SIDE ───────────────────────────────────────────────────

  // compass — circle + N-arrow + small center dot
  compass: (
    <svg {...ICON_PROPS}>
      <circle cx={7} cy={7} r={5.25} />
      <polyline points="5.5,8 7,3.5 8.5,8 7,7" />
      <circle cx={7} cy={7} r={0.4} fill="currentColor" stroke="none" />
    </svg>
  ),

  // penBrief — rectangle (paper) with a pen line crossing top-right corner
  penBrief: (
    <svg {...ICON_PROPS}>
      <rect x={1.5} y={2.5} width={8} height={9.5} />
      <line x1={4} y1={6} x2={7} y2={6} />
      <line x1={4} y1={8.5} x2={7} y2={8.5} />
      <line x1={8.5} y1={1.5} x2={12.5} y2={5.5} />
      <line x1={11.5} y1={2.5} x2={12.5} y2={3.5} />
    </svg>
  ),

  // shieldCheck — shield outline + checkmark inside
  shieldCheck: (
    <svg {...ICON_PROPS}>
      <path d="M 7 1.5 L 12 3 L 12 7.5 C 12 10 9.5 12 7 12.5 C 4.5 12 2 10 2 7.5 L 2 3 Z" />
      <polyline points="4.75,7 6.25,8.5 9.25,5.5" />
    </svg>
  ),

  // flag — vertical pole + triangular flag
  flag: (
    <svg {...ICON_PROPS}>
      <line x1={3.5} y1={1.5} x2={3.5} y2={12.5} />
      <path d="M 3.5 2 L 11 4 L 3.5 6 Z" />
    </svg>
  ),

  // lightbulb — bulb outline + 2 base lines
  lightbulb: (
    <svg {...ICON_PROPS}>
      <path d="M 7 1.5 C 4.5 1.5 3 3.25 3 5.25 C 3 6.75 4 7.75 4.75 8.75 L 4.75 10 L 9.25 10 L 9.25 8.75 C 10 7.75 11 6.75 11 5.25 C 11 3.25 9.5 1.5 7 1.5 Z" />
      <line x1={5} y1={11.25} x2={9} y2={11.25} />
      <line x1={5.75} y1={12.5} x2={8.25} y2={12.5} />
    </svg>
  ),
};
