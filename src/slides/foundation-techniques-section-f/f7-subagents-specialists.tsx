// F.7 — SPECIALISTS (Sub-agents · Specialist departments)
//
// CANONICAL Section F facet slide. Two-step structure with hover-only details
// and an aligned right-pane bordered box. Mirrors F.2 exactly.
//
// Step axis (2 steps; canonical pose = 1):
//   0 — All 5 facet cards stagger-reveal on the left. Hover is always on.
//       Right pane shows the bordered box framing an empty content area.
//       Hovering any facet card crossfades the matching illustration into
//       the bordered box. Footer hidden.
//   1 — Footer (italic copper-200 caption) fades in below the facet cards.
//       Everything else stays revealed; hover continues to drive details.
//
// Border alignment (canonical):
//   The right-pane bordered box uses the same `top: 156 / bottom: 80` as the
//   left FacetMenu so the top and bottom borders align exactly with the
//   FacetMenu's top edge (header baseline) and bottom edge. An invisible
//   visibility section title inside the bordered box mirrors the left's
//   mono header + 12px gap + CopperRule, so when a facet hover illustration
//   crossfades in, its content top sits on the same baseline as the left's
//   first facet card.
//
// Facet → state map:
//   what-it-is    → WhatItIsState (1 generalist + 5 task bubbles vs 4
//                   specialists — generalist stress lines pulse via
//                   f-pointer-pulse; specialist task bubbles sequentially
//                   light via f-row-pulse-1..4)
//   how-it-works  → HowItWorksState (4-row anatomy with f-row-pulse-1..4)
//   patterns      → PatternsState (2×2 orchestration grid; each tile glows
//                   in turn via f-row-pulse-1..4)
//   when-to-use   → WhenToUseState (4×4 tradeoff matrix; static, no
//                   animation — renders fully visible immediately)
//   example       → ExampleState (multi-agent workflow with flowing dot
//                   travelling planner → workers → reviewer → output via
//                   f-flow-dot on each edge)
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import {
  OrchestrationPattern,
  type OrchestrationVariant,
} from "./components/OrchestrationPattern";
import { useFacetListBounds } from "./components/useFacetListBounds";
import { f7Content as C } from "./content";

// ───────────────────── shared layout constants (F-section canonical) ─────────────────────
//
// Right pane width — top / bottom are measured at runtime via
// `useFacetListBounds`.

const RIGHT_W = 660;

// ───────────────────── slide ─────────────────────

export function F7SubagentsSpecialists() {
  const { stepIndex } = useDeck();

  // CANONICAL Section F step-gate pattern (mirrors F.2):
  //   showCards     = stepIndex >= 0   → all 5 cards stagger-reveal at step 0
  //   hoverEnabled  = stepIndex >= 0   → hover always-on once cards are in
  //   showFooter    = stepIndex >= 1   → footer reveals at canonical pose
  const showCards = stepIndex >= 0;
  const hoverEnabled = stepIndex >= 0;
  const showFooter = stepIndex >= 1;

  const [activeFacet, setActiveFacet] = useState<string | null>(null);
  const [pinnedFacet, setPinnedFacet] = useState<string | null>(null);
  // Pin wins over hover so a pinned facet remains the right-pane illustration
  // even when the user mouses away (or onto another card pre-click).
  const effectiveFacet = hoverEnabled ? (pinnedFacet ?? activeFacet) : null;

  const { top: paneTop, bottom: paneBottom } = useFacetListBounds();

  return (
    <>
      <FigLabel section="F" num={7} label="SPECIALISTS" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      {/* LEFT — facet menu. All 5 cards reveal at stepIndex 0; footer at 1. */}
      <FacetMenu
        items={C.facets.map((f) => ({
          id: f.id,
          title: f.title,
          essence: f.essence,
          essenceKw: f.essenceKw,
          icon: f.icon,
        }))}
        activeFacet={hoverEnabled ? activeFacet : null}
        onHover={hoverEnabled ? setActiveFacet : () => {}}
        pinnedFacet={pinnedFacet}
        onPin={setPinnedFacet}
        showCards={showCards}
        header={C.header}
        footer={C.footer}
        footerKw={[...C.footerKw]}
        showFooter={showFooter}
      />

      {/* RIGHT — transparent popover anchor. Top / bottom match the left
          FacetMenu's card-stack extent exactly (measured at runtime). */}
      <div
        data-testid="f7-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: paneTop,
          width: RIGHT_W,
          bottom: paneBottom,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Content area — DetailCanvas renders nothing until a facet hover. */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxHeight: "100%",
            height: "100%",
            pointerEvents: "auto",
          }}
        >
          <DetailCanvas
            activeFacet={effectiveFacet}
            states={{
              "what-it-is": <WhatItIsState />,
              "how-it-works": <HowItWorksState />,
              patterns: <PatternsState />,
              "when-to-use": <WhenToUseState />,
              example: <ExampleState />,
            }}
          />
        </div>
      </div>
    </>
  );
}

// ───────────────────── shared atoms ─────────────────────
//
// FacetHeader was removed in the popover refactor (Item 1).

// ───────────────────── WHAT IT IS state ─────────────────────
//
// 1 overloaded generalist (sweat lines + 5 task bubbles) vs 4 calm specialists
// each with a single task. Animation: generalist's sweat lines pulse
// continuously via `f-pointer-pulse`; the 4 specialist sub-cards cycle their
// border/background highlight in left→right reading order via the deck-wide
// `f-card-cycle` keyframe (4s cycle, 1s stagger between cards).

function WhatItIsState() {
  return (
    <div
      data-testid="f7-state-what-it-is"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 28px 1fr",
          alignItems: "center",
          gap: 0,
          minHeight: 0,
        }}
      >
        {/* LEFT — generalist */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--copper-300)",
            }}
          >
            One generalist
          </span>
          <svg
            viewBox="0 0 220 220"
            width={200}
            height={200}
            aria-hidden="true"
          >
            {/* Sweat lines — pulse via f-pointer-pulse on a wrapping g */}
            <g className="f-pointer-pulse">
              <path
                d="M 70 30 q 4 6 0 12"
                stroke="var(--copper-500)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 150 32 q -4 6 0 12"
                stroke="var(--copper-500)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 56 50 q 2 4 -2 8"
                stroke="var(--copper-500)"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 164 50 q -2 4 2 8"
                stroke="var(--copper-500)"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
            </g>
            {/* Stick figure */}
            <circle
              cx="110"
              cy="80"
              r="18"
              fill="var(--neutral-900)"
              stroke="var(--copper-200)"
              strokeWidth="1.5"
            />
            <line
              x1="110"
              y1="98"
              x2="110"
              y2="160"
              stroke="var(--copper-200)"
              strokeWidth="1.5"
            />
            <line
              x1="110"
              y1="115"
              x2="78"
              y2="135"
              stroke="var(--copper-200)"
              strokeWidth="1.5"
            />
            <line
              x1="110"
              y1="115"
              x2="142"
              y2="135"
              stroke="var(--copper-200)"
              strokeWidth="1.5"
            />
            <line
              x1="110"
              y1="160"
              x2="86"
              y2="200"
              stroke="var(--copper-200)"
              strokeWidth="1.5"
            />
            <line
              x1="110"
              y1="160"
              x2="134"
              y2="200"
              stroke="var(--copper-200)"
              strokeWidth="1.5"
            />
            {/* 5 task bubbles around the figure (static dashed) */}
            {[
              { cx: 36, cy: 60, label: "A" },
              { cx: 184, cy: 60, label: "B" },
              { cx: 22, cy: 130, label: "C" },
              { cx: 198, cy: 130, label: "D" },
              { cx: 110, cy: 38, label: "E" },
            ].map((b) => (
              <g key={b.label}>
                <circle
                  cx={b.cx}
                  cy={b.cy}
                  r="13"
                  fill="var(--neutral-900)"
                  stroke="var(--copper-700)"
                  strokeWidth="1.2"
                  strokeDasharray="3 2"
                />
                <text
                  x={b.cx}
                  y={b.cy + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--copper-200)"
                  fontSize="10"
                  fontFamily="var(--mono)"
                >
                  {b.label}
                </text>
              </g>
            ))}
          </svg>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 12.5,
              color: "var(--neutral-300)",
              margin: 0,
              textAlign: "center",
              maxWidth: 220,
              lineHeight: 1.4,
            }}
          >
            {highlight("five jobs, no focus — drops the ball", [
              "no focus",
            ])}
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 16,
            color: "var(--copper-500)",
            textAlign: "center",
          }}
        >
          vs.
        </div>

        {/* RIGHT — 4 specialists with sequentially-pulsing task bubbles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--copper-300)",
            }}
          >
            Four specialists
          </span>
          <div
            data-testid="f7-specialists-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 6,
              width: "100%",
            }}
          >
            {[
              { label: "A", role: "finance" },
              { label: "B", role: "milestones" },
              { label: "C", role: "risks" },
              { label: "D", role: "summary" },
            ].map((s, i) => (
              <div
                key={s.label}
                data-testid={`f7-specialist-${i}`}
                className="f-card-cycle"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: "8px 4px",
                  "--cycle-duration": "4s",
                  "--cycle-delay": `${i}s`,
                } as CSSProperties}
              >
                <svg
                  viewBox="0 0 60 96"
                  width={48}
                  height={76}
                  aria-hidden="true"
                >
                  {/* Stick figure */}
                  <circle
                    cx={30}
                    cy={16}
                    r="10"
                    fill="var(--neutral-900)"
                    stroke="var(--copper-200)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={30}
                    y1={26}
                    x2={30}
                    y2={58}
                    stroke="var(--copper-200)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={30}
                    y1={36}
                    x2={16}
                    y2={50}
                    stroke="var(--copper-200)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={30}
                    y1={36}
                    x2={44}
                    y2={50}
                    stroke="var(--copper-200)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={30}
                    y1={58}
                    x2={18}
                    y2={78}
                    stroke="var(--copper-200)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={30}
                    y1={58}
                    x2={42}
                    y2={78}
                    stroke="var(--copper-200)"
                    strokeWidth="1.5"
                  />
                  {/* Single task bubble */}
                  <circle
                    cx={30}
                    cy={90}
                    r="6"
                    fill="var(--neutral-900)"
                    stroke="var(--copper-500)"
                    strokeWidth="1.2"
                  />
                  <text
                    x={30}
                    y={91}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--copper-200)"
                    fontSize="8"
                    fontFamily="var(--mono)"
                  >
                    {s.label}
                  </text>
                </svg>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 9,
                    letterSpacing: "0.10em",
                    color: "var(--copper-200)",
                    textTransform: "uppercase",
                  }}
                >
                  {s.role}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 12.5,
              color: "var(--neutral-300)",
              margin: 0,
              textAlign: "center",
              maxWidth: 240,
              lineHeight: 1.4,
            }}
          >
            {highlight("one job each — calm, accurate, fast", [
              "one job each",
            ])}
          </p>
        </div>
      </div>
    </div>
  );
}

// ───────────────────── HOW IT WORKS state ─────────────────────
//
// Anatomy of a sub-agent: 4 labeled rows (isolated context · role ·
// permissions · returns). Each row cycles its border/background highlight in
// top→bottom reading order via the deck-wide `f-card-cycle` keyframe
// (4s cycle, 1s stagger between rows).

interface AnatomyRow {
  label: string;
  value: string;
  valueKw?: string[];
}

function HowItWorksState() {
  const rows: AnatomyRow[] = [
    {
      label: "isolated context",
      value: "its own scratchpad — no spillover from other agents",
      valueKw: ["own scratchpad"],
    },
    {
      label: "role",
      value: "financials-agent",
      valueKw: ["financials-agent"],
    },
    {
      label: "permissions",
      value: "read: finance/* · write: drafts/*",
      valueKw: ["read", "write"],
    },
    {
      label: "returns",
      value: "a structured summary block (≤500 tokens)",
      valueKw: ["structured summary block"],
    },
  ];

  return (
    <div
      data-testid="f7-state-how-it-works"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <div
          style={{
            border: "1px solid var(--copper-700)",
            background: "rgba(184,110,61,0.04)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {rows.map((r, i) => (
            <div
              key={r.label}
              data-testid={`f7-anatomy-row-${i}`}
              className="f-card-cycle"
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: 12,
                alignItems: "baseline",
                padding: "10px 12px",
                "--cycle-duration": "4s",
                "--cycle-delay": `${i}s`,
              } as CSSProperties}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--copper-300)",
                }}
              >
                {r.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 13.5,
                  color: "var(--neutral-100)",
                  lineHeight: 1.4,
                }}
              >
                {r.valueKw && r.valueKw.length > 0
                  ? highlight(r.value, r.valueKw)
                  : r.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────── ORCHESTRATION PATTERNS state ─────────────────────
//
// 2×2 grid of the four canonical patterns (centralized · decentralized · chain ·
// parallel). Each tile cycles its border/background highlight in 2×2 reading
// order (top-left → top-right → bottom-left → bottom-right) via the deck-wide
// `f-card-cycle` keyframe (4s cycle, 1s stagger between tiles). The interior
// OrchestrationPattern micro-diagram still drives its own SMIL pulse-flow on
// edges/nodes — those are content, not card highlight.

function PatternsState() {
  return (
    <div
      data-testid="f7-state-patterns"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "6px 10px",
        gap: 8,
      }}
    >
      <div
        data-testid="f7-pattern-grid"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          columnGap: 8,
          rowGap: 6,
          minHeight: 0,
        }}
      >
        {C.patterns.map((p, i) => {
          const variant = p.variant as OrchestrationVariant;
          return (
            <div
              key={p.id}
              data-testid={`f7-pattern-tile-${p.id}`}
              className="f-card-cycle"
              style={{
                padding: "6px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                "--cycle-duration": "4s",
                "--cycle-delay": `${i}s`,
              } as CSSProperties}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 0,
                }}
              >
                <OrchestrationPattern variant={variant} on animateOnReveal />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 9.5,
                    letterSpacing: "0.16em",
                    color: "var(--copper-100)",
                    textTransform: "uppercase",
                  }}
                >
                  {p.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 11,
                    color: "var(--neutral-300)",
                    lineHeight: 1.3,
                  }}
                >
                  {highlight(p.essence, [...p.essenceKw])}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────── WHEN TO USE state ─────────────────────
//
// 4×4 tradeoff matrix. Renders fully visible/static immediately — no row
// stagger, no shimmer, no column pulse. Per the item-18 fix, all animation
// hooks were removed so the comparison reads as a stable reference table.

interface TradeoffCell {
  value: "Low" | "Medium" | "High";
}
interface TradeoffRow {
  pattern: string;
  cells: TradeoffCell[];
}

const TRADEOFF_COLS = [
  "Latency",
  "Accountability",
  "Parallelism",
  "Complexity",
] as const;

const TRADEOFF_ROWS: TradeoffRow[] = [
  {
    pattern: "Centralized",
    cells: [
      { value: "Medium" },
      { value: "High" },
      { value: "Medium" },
      { value: "Low" },
    ],
  },
  {
    pattern: "Decentralized",
    cells: [
      { value: "Low" },
      { value: "Low" },
      { value: "High" },
      { value: "High" },
    ],
  },
  {
    pattern: "Chain",
    cells: [
      { value: "High" },
      { value: "High" },
      { value: "Low" },
      { value: "Low" },
    ],
  },
  {
    pattern: "Parallel",
    cells: [
      { value: "Low" },
      { value: "Medium" },
      { value: "High" },
      { value: "Medium" },
    ],
  },
];

function WhenToUseState() {
  return (
    <div
      data-testid="f7-state-when-to-use"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <div
        role="table"
        style={{
          display: "grid",
          // PATTERN | LATENCY | ACCOUNTABILITY (wider) | PARALLELISM | COMPLEXITY
          gridTemplateColumns:
            "minmax(0, 1.2fr) minmax(0, 0.9fr) minmax(0, 1.3fr) minmax(0, 1.05fr) minmax(0, 0.95fr)",
          rowGap: 1,
          columnGap: 1,
          background: "var(--copper-800)",
          border: "1px solid var(--copper-800)",
        }}
      >
        {/* Header row */}
        <MatrixHeader label="PATTERN" align="left" />
        {TRADEOFF_COLS.map((c, ci) => (
          <MatrixHeader
            key={c}
            label={c}
            testId={`f7-tradeoff-col-header-${ci}`}
          />
        ))}
        {/* Body rows */}
        {TRADEOFF_ROWS.map((r, ri) => (
          <ColumnFragment key={r.pattern}>
            <MatrixCell>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--copper-100)",
                }}
              >
                {r.pattern}
              </span>
            </MatrixCell>
            {r.cells.map((cell, ci) => (
              <MatrixCell
                key={ci}
                center
                testId={`f7-tradeoff-cell-${ri}-${ci}`}
              >
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 13,
                    color:
                      cell.value === "High"
                        ? "var(--copper-200)"
                        : "var(--neutral-200)",
                    lineHeight: 1.3,
                  }}
                >
                  {cell.value}
                </span>
              </MatrixCell>
            ))}
          </ColumnFragment>
        ))}
      </div>
    </div>
  );
}

// Display-contents fragment so grid children flow normally.
function ColumnFragment({ children }: { children: ReactNode }) {
  return <div style={{ display: "contents" }}>{children}</div>;
}

function MatrixHeader({
  label,
  align = "center",
  testId,
}: {
  label: string;
  align?: "left" | "center";
  testId?: string;
}) {
  return (
    <div
      data-testid={testId}
      style={{
        background: "rgba(122,70,38,0.18)",
        padding: "8px 8px",
        fontFamily: "var(--mono)",
        fontSize: 9.5,
        letterSpacing: "0.10em",
        color: "var(--copper-200)",
        textTransform: "uppercase",
        textAlign: align,
        whiteSpace: "normal",
        lineHeight: 1.2,
      }}
    >
      {label}
    </div>
  );
}

function MatrixCell({
  center = false,
  testId,
  children,
}: {
  center?: boolean;
  testId?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-testid={testId}
      style={{
        background: "rgba(10,10,10,0.6)",
        padding: "10px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      {children}
    </div>
  );
}

// ───────────────────── EXAMPLE state ─────────────────────
//
// "monthly board pack" multi-agent workflow. Planner → 4 worker agents
// (parallel) → planner-merge → reviewer → output PDF. A copper dot streams
// along each edge via the shared `f-flow-dot` keyframe (~2s loop per edge)
// to illustrate the data trajectory.

function ExampleState() {
  // Geometry — 600 × 380 mental canvas.
  const planX = 300;
  const planY = 36;
  const workersY = 130;
  const wxs = [80, 220, 380, 520];
  const wLabels = ["financials", "milestones", "risks", "summary"];
  const mergeX = 300;
  const mergeY = 230;
  const reviewerX = 300;
  const reviewerY = 305;
  const outputY = 358;

  return (
    <div
      data-testid="f7-state-example"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
        gap: 10,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <svg
          viewBox="0 0 600 380"
          width="100%"
          height="100%"
          style={{ maxHeight: 360 }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Edges: planner → 4 workers (with flowing dots) */}
          {wxs.map((wx, i) => (
            <g key={`out-${i}`}>
              <line
                x1={planX}
                y1={planY + 22}
                x2={wx}
                y2={workersY - 18}
                stroke="var(--copper-500)"
                strokeWidth="1.5"
              />
              <circle
                data-testid={`f7-flow-out-${i}`}
                className="f-flow-dot"
                r="3"
                fill="var(--copper-200)"
                style={{
                  offsetPath: `path('M ${planX} ${planY + 22} L ${wx} ${workersY - 18}')`,
                }}
              />
            </g>
          ))}
          {/* Edges: 4 workers → merge */}
          {wxs.map((wx, i) => (
            <g key={`in-${i}`}>
              <line
                x1={wx}
                y1={workersY + 18}
                x2={mergeX}
                y2={mergeY - 18}
                stroke="var(--copper-500)"
                strokeWidth="1.5"
              />
              <circle
                data-testid={`f7-flow-in-${i}`}
                className="f-flow-dot"
                r="3"
                fill="var(--copper-200)"
                style={{
                  offsetPath: `path('M ${wx} ${workersY + 18} L ${mergeX} ${mergeY - 18}')`,
                }}
              />
            </g>
          ))}
          {/* Edge: merge → reviewer */}
          <g>
            <line
              x1={mergeX}
              y1={mergeY + 18}
              x2={reviewerX}
              y2={reviewerY - 18}
              stroke="var(--copper-500)"
              strokeWidth="1.5"
            />
            <circle
              data-testid="f7-flow-merge-reviewer"
              className="f-flow-dot"
              r="3"
              fill="var(--copper-200)"
              style={{
                offsetPath: `path('M ${mergeX} ${mergeY + 18} L ${reviewerX} ${reviewerY - 18}')`,
              }}
            />
          </g>
          {/* Edge: reviewer → output */}
          <g>
            <line
              x1={reviewerX}
              y1={reviewerY + 18}
              x2={reviewerX}
              y2={outputY - 12}
              stroke="var(--copper-500)"
              strokeWidth="1.5"
            />
            <circle
              data-testid="f7-flow-reviewer-output"
              className="f-flow-dot"
              r="3"
              fill="var(--copper-200)"
              style={{
                offsetPath: `path('M ${reviewerX} ${reviewerY + 18} L ${reviewerX} ${outputY - 12}')`,
              }}
            />
          </g>

          {/* Planner */}
          <g>
            <rect
              x={planX - 70}
              y={planY - 18}
              width={140}
              height={40}
              fill="var(--neutral-900)"
              stroke="var(--copper-200)"
              strokeWidth="1.5"
            />
            <text
              x={planX}
              y={planY + 5}
              textAnchor="middle"
              fill="var(--copper-200)"
              fontSize="12"
              fontFamily="var(--mono)"
              letterSpacing="0.12em"
            >
              PLANNER
            </text>
          </g>

          {/* 4 worker agents */}
          {wxs.map((wx, i) => (
            <g key={`w-${i}`}>
              <rect
                x={wx - 56}
                y={workersY - 18}
                width={112}
                height={36}
                fill="var(--neutral-900)"
                stroke="var(--copper-700)"
                strokeWidth="1.2"
              />
              <text
                x={wx}
                y={workersY + 4}
                textAnchor="middle"
                fill="var(--copper-200)"
                fontSize="11"
                fontFamily="var(--mono)"
              >
                {wLabels[i]}
              </text>
            </g>
          ))}

          {/* Merge planner */}
          <g>
            <rect
              x={mergeX - 70}
              y={mergeY - 18}
              width={140}
              height={36}
              fill="var(--neutral-900)"
              stroke="var(--copper-200)"
              strokeWidth="1.4"
            />
            <text
              x={mergeX}
              y={mergeY + 4}
              textAnchor="middle"
              fill="var(--copper-200)"
              fontSize="12"
              fontFamily="var(--mono)"
              letterSpacing="0.12em"
            >
              PLANNER · merge
            </text>
          </g>

          {/* Reviewer */}
          <g>
            <rect
              x={reviewerX - 60}
              y={reviewerY - 18}
              width={120}
              height={36}
              fill="var(--neutral-900)"
              stroke="var(--copper-500)"
              strokeWidth="1.4"
            />
            <text
              x={reviewerX}
              y={reviewerY + 4}
              textAnchor="middle"
              fill="var(--copper-200)"
              fontSize="11"
              fontFamily="var(--mono)"
            >
              reviewer
            </text>
          </g>

          {/* Output label */}
          <text
            x={reviewerX}
            y={outputY + 4}
            textAnchor="middle"
            fill="var(--copper-300)"
            fontSize="11"
            fontFamily="var(--mono)"
            letterSpacing="0.18em"
          >
            → BOARD PACK.PDF
          </text>
        </svg>
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const f7Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F7SubagentsSpecialists />,
};
