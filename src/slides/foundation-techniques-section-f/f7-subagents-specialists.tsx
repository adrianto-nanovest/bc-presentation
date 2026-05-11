// F.7 — SPECIALISTS (Sub-agents · Specialist departments)
//
// Spec §10. Plugin component · Sub-agents deep-dive.
// 5-facet menu (left) + 2×2 orchestration-pattern grid canvas (right).
// Hover-canvas-swap pattern (E.8 lineage); ORCHESTRATION PATTERNS state
// has its own internal per-pattern hover-to-zoom.
//
// 7 steps:
//   0       — title + facet header + dim 2×2 grid (0.5 opacity)
//   1 — 5   — facet items 1..5 cascade
//   6       — footer reveals; grid brightens to 1; pattern motion auto-plays
//
// After step 5, facet hover swaps the canvas to its matching state. The
// ORCHESTRATION PATTERNS facet keeps the default 2×2 grid as its state and
// adds an inner hover that swaps the canvas to a zoomed pattern.
import { useState } from "react";
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
import { f7Content as C } from "./content";

// ────────────────────────── canvas states ──────────────────────────

// 2×2 grid of all four orchestration patterns. Each tile is 280×180-ish
// plus a label strip below the SVG.
function PatternGrid({
  on,
  hoveredPattern,
  setHoveredPattern,
  brighten,
}: {
  on: boolean;
  hoveredPattern: OrchestrationVariant | null;
  setHoveredPattern: (v: OrchestrationVariant | null) => void;
  /** When true, all tiles glow at full opacity; otherwise 0.5. */
  brighten: boolean;
}) {
  return (
    <div
      data-testid="f7-pattern-grid"
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 16,
        padding: 8,
        opacity: on ? 1 : 0,
        transition: "opacity 400ms var(--ease)",
      }}
    >
      {C.patterns.map((p, i) => {
        const variant = p.variant as OrchestrationVariant;
        const isHover = hoveredPattern === variant;
        // Stagger the brightness/motion reveal across the 4 tiles.
        const staggerDelay = brighten ? i * 400 : 0;
        return (
          <div
            key={p.id}
            data-testid={`f7-pattern-tile-${p.id}`}
            data-active={isHover ? "true" : "false"}
            onMouseEnter={() => setHoveredPattern(variant)}
            onMouseLeave={() => setHoveredPattern(null)}
            style={{
              border: "1px solid",
              borderColor: isHover ? "var(--copper-200)" : "var(--copper-800)",
              background: isHover
                ? "rgba(184,110,61,0.06)"
                : "transparent",
              transition:
                "border-color 0.2s var(--ease), background 0.2s var(--ease), opacity 400ms var(--ease)",
              transitionDelay: `${staggerDelay}ms`,
              opacity: brighten ? 1 : 0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <OrchestrationPattern
                variant={variant}
                on={brighten}
                animateOnReveal
              />
            </div>
            <div
              style={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
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
                  fontSize: 12,
                  color: "var(--neutral-300)",
                }}
              >
                {highlight(p.essence, p.essenceKw)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// WHAT IT IS — sketch-style visual analogy. One overloaded generalist (5
// task bubbles + sweat lines) vs. team of 4 specialists each with 1 task.
function WhatItIsState() {
  return (
    <div
      data-testid="f7-state-what-it-is"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "24px 16px",
        gap: 24,
      }}
    >
      {/* Generalist (left) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--copper-300)",
          }}
        >
          One generalist
        </span>
        <svg viewBox="0 0 220 220" width={220} height={220}>
          {/* Sweat lines */}
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
          {/* 5 task bubbles around the figure */}
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
            fontSize: 14,
            color: "var(--neutral-300)",
            margin: 0,
            textAlign: "center",
            maxWidth: 240,
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
          fontSize: 18,
          color: "var(--copper-500)",
        }}
      >
        vs.
      </div>

      {/* 4 specialists (right) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--copper-300)",
          }}
        >
          Four specialists
        </span>
        <svg viewBox="0 0 240 220" width={240} height={220}>
          {[
            { x: 36, label: "A" },
            { x: 102, label: "B" },
            { x: 168, label: "C" },
            { x: 220, label: "D" },
          ].map((s, _i) => (
            <g key={s.label}>
              {/* Stick figure */}
              <circle
                cx={s.x}
                cy={70}
                r="12"
                fill="var(--neutral-900)"
                stroke="var(--copper-200)"
                strokeWidth="1.5"
              />
              <line
                x1={s.x}
                y1={82}
                x2={s.x}
                y2={130}
                stroke="var(--copper-200)"
                strokeWidth="1.5"
              />
              <line
                x1={s.x}
                y1={95}
                x2={s.x - 16}
                y2={112}
                stroke="var(--copper-200)"
                strokeWidth="1.5"
              />
              <line
                x1={s.x}
                y1={95}
                x2={s.x + 16}
                y2={112}
                stroke="var(--copper-200)"
                strokeWidth="1.5"
              />
              <line
                x1={s.x}
                y1={130}
                x2={s.x - 12}
                y2={160}
                stroke="var(--copper-200)"
                strokeWidth="1.5"
              />
              <line
                x1={s.x}
                y1={130}
                x2={s.x + 12}
                y2={160}
                stroke="var(--copper-200)"
                strokeWidth="1.5"
              />
              {/* Single task bubble */}
              <circle
                cx={s.x}
                cy={185}
                r="14"
                fill="var(--neutral-900)"
                stroke="var(--copper-500)"
                strokeWidth="1.4"
              />
              <text
                x={s.x}
                y={186}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--copper-200)"
                fontSize="11"
                fontFamily="var(--mono)"
              >
                {s.label}
              </text>
            </g>
          ))}
        </svg>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
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
  );
}

// HOW SUB-AGENTS WORK — anatomy of a sub-agent labeled rectangle.
function HowItWorksState() {
  const rows: Array<{ label: string; value: string; valueKw?: string[] }> = [
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
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--copper-300)",
          marginBottom: 16,
        }}
      >
        Anatomy of a sub-agent
      </span>
      <div
        style={{
          width: 520,
          border: "1px solid var(--copper-700)",
          background: "rgba(184,110,61,0.04)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {rows.map((r) => (
          <div
            key={r.label}
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr",
              gap: 16,
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
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
                fontSize: 15,
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
  );
}

// WHEN TO USE WHICH — 4-row tradeoff matrix.
function WhenToUseState() {
  const cols = ["Latency", "Accountability", "Parallelism", "Complexity"];
  const rows: Array<{
    pattern: string;
    cells: Array<{ value: "Low" | "Medium" | "High"; isGood?: boolean }>;
  }> = [
    {
      pattern: "Centralized",
      cells: [
        { value: "Medium" },
        { value: "High", isGood: true },
        { value: "Medium" },
        { value: "Low", isGood: true },
      ],
    },
    {
      pattern: "Decentralized",
      cells: [
        { value: "Low", isGood: true },
        { value: "Low" },
        { value: "High", isGood: true },
        { value: "High" },
      ],
    },
    {
      pattern: "Chain",
      cells: [
        { value: "High" },
        { value: "High", isGood: true },
        { value: "Low" },
        { value: "Low", isGood: true },
      ],
    },
    {
      pattern: "Parallel",
      cells: [
        { value: "Low", isGood: true },
        { value: "Medium" },
        { value: "High", isGood: true },
        { value: "Medium" },
      ],
    },
  ];

  return (
    <div
      data-testid="f7-state-when-to-use"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--copper-300)",
          marginBottom: 16,
        }}
      >
        Tradeoff matrix
      </span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "140px repeat(4, 1fr)",
          rowGap: 0,
          columnGap: 0,
          width: "100%",
          maxWidth: 580,
          border: "1px solid var(--copper-800)",
        }}
      >
        {/* Header row */}
        <div style={{ padding: "10px 12px" }} />
        {cols.map((c) => (
          <div
            key={c}
            style={{
              padding: "10px 12px",
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--copper-300)",
              borderBottom: "1px solid var(--copper-800)",
              textAlign: "center",
            }}
          >
            {c}
          </div>
        ))}
        {/* Data rows */}
        {rows.map((r, ri) => (
          <div key={r.pattern} style={{ display: "contents" }}>
            <div
              style={{
                padding: "12px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--copper-100)",
                borderTop: ri === 0 ? "none" : "1px solid var(--copper-800)",
                borderRight: "1px solid var(--copper-800)",
              }}
            >
              {r.pattern}
            </div>
            {r.cells.map((cell, ci) => (
              <div
                key={ci}
                style={{
                  padding: "12px",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 14,
                  color:
                    cell.value === "High"
                      ? "var(--copper-200)"
                      : "var(--neutral-300)",
                  textAlign: "center",
                  borderTop:
                    ri === 0 ? "none" : "1px solid var(--copper-800)",
                  borderRight:
                    ci < r.cells.length - 1
                      ? "1px solid var(--copper-800)"
                      : "none",
                }}
              >
                {cell.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// EXAMPLE — "monthly board pack" multi-agent workflow.
function ExampleState() {
  // Layout (640×440 mental canvas):
  //   planner → 4 workers (parallel) → planner → reviewer → output
  return (
    <div
      data-testid="f7-state-example"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--copper-300)",
          marginBottom: 12,
        }}
      >
        Monthly board pack · multi-agent workflow
      </span>

      <svg viewBox="0 0 600 380" width={600} height={380}>
        {/* Coords */}
        {(() => {
          const planX = 300;
          const planY = 36;
          const workersY = 130;
          const wxs = [80, 220, 380, 520];
          const wLabels = [
            "financials",
            "milestones",
            "risks",
            "summary",
          ];
          const mergeX = 300;
          const mergeY = 230;
          const reviewerX = 300;
          const reviewerY = 305;
          const outputX = 300;
          const outputY = 358;

          return (
            <>
              {/* Edges: planner → 4 workers */}
              {wxs.map((wx, i) => (
                <line
                  key={`out-${i}`}
                  x1={planX}
                  y1={planY + 22}
                  x2={wx}
                  y2={workersY - 18}
                  stroke="var(--copper-500)"
                  strokeWidth="1.5"
                />
              ))}
              {/* Edges: 4 workers → merge */}
              {wxs.map((wx, i) => (
                <line
                  key={`in-${i}`}
                  x1={wx}
                  y1={workersY + 18}
                  x2={mergeX}
                  y2={mergeY - 18}
                  stroke="var(--copper-500)"
                  strokeWidth="1.5"
                />
              ))}
              {/* Edge: merge → reviewer */}
              <line
                x1={mergeX}
                y1={mergeY + 18}
                x2={reviewerX}
                y2={reviewerY - 18}
                stroke="var(--copper-500)"
                strokeWidth="1.5"
              />
              {/* Edge: reviewer → output */}
              <line
                x1={reviewerX}
                y1={reviewerY + 18}
                x2={outputX}
                y2={outputY - 12}
                stroke="var(--copper-500)"
                strokeWidth="1.5"
              />

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
                    x={wx - 60}
                    y={workersY - 18}
                    width={120}
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
                x={outputX}
                y={outputY + 4}
                textAnchor="middle"
                fill="var(--copper-300)"
                fontSize="11"
                fontFamily="var(--mono)"
                letterSpacing="0.18em"
              >
                → BOARD PACK.PDF
              </text>
            </>
          );
        })()}
      </svg>

      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--copper-200)",
          margin: "8px 0 0",
          textAlign: "center",
          maxWidth: 560,
          lineHeight: 1.4,
        }}
      >
        {highlight("parallel pattern · planner merges · reviewer checks", [
          "parallel pattern",
        ])}
      </p>
    </div>
  );
}

// Patterns state — wraps the default 2×2 OR a zoomed single pattern, depending
// on the inner hover state passed from the slide.
function PatternsState({
  hoveredPattern,
  setHoveredPattern,
}: {
  hoveredPattern: OrchestrationVariant | null;
  setHoveredPattern: (v: OrchestrationVariant | null) => void;
}) {
  if (hoveredPattern) {
    return (
      <div
        data-testid="f7-state-patterns-zoomed"
        onMouseLeave={() => setHoveredPattern(null)}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <OrchestrationPattern variant={hoveredPattern} on zoomed />
      </div>
    );
  }
  return (
    <PatternGrid
      on
      hoveredPattern={hoveredPattern}
      setHoveredPattern={setHoveredPattern}
      brighten
    />
  );
}

// ────────────────────────── slide ──────────────────────────

export function F7SubagentsSpecialists() {
  const { stepIndex } = useDeck();

  const showCards = stepIndex >= 0;
  const lastFacetRevealed = stepIndex >= 5;
  const showFooter = stepIndex >= 6;
  const brightGrid = stepIndex >= 6;

  // Facet hover (gated until lastFacetRevealed per spec §10.6)
  const [activeFacet, setActiveFacet] = useState<string | null>(null);
  // Inner per-pattern hover for ORCHESTRATION PATTERNS state
  const [hoveredPattern, setHoveredPattern] =
    useState<OrchestrationVariant | null>(null);

  const handleFacetHover = (id: string | null) => {
    if (!lastFacetRevealed) return; // disabled before all facets are revealed
    setActiveFacet(id);
    // Reset inner zoom whenever facet changes
    if (id !== "patterns") setHoveredPattern(null);
  };

  // Default canvas — dim 2×2 grid until step 6
  const defaultState = (
    <PatternGrid
      on
      hoveredPattern={hoveredPattern}
      setHoveredPattern={(v) => {
        if (lastFacetRevealed) setHoveredPattern(v);
      }}
      brighten={brightGrid}
    />
  );

  const states: Record<string, React.ReactNode> = {
    "what-it-is": <WhatItIsState />,
    "how-it-works": <HowItWorksState />,
    patterns: (
      <PatternsState
        hoveredPattern={hoveredPattern}
        setHoveredPattern={setHoveredPattern}
      />
    ),
    "when-to-use": <WhenToUseState />,
    example: <ExampleState />,
  };

  return (
    <>
      <FigLabel section="F" num={7} label="SPECIALISTS" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* LEFT — facet menu */}
      <FacetMenu
        items={C.facets}
        activeFacet={activeFacet}
        onHover={handleFacetHover}
        showCards={showCards}
        header={C.header}
        footer={C.footer}
        footerKw={C.footerKw}
        showFooter={showFooter}
      />

      {/* RIGHT — detail canvas */}
      <div
        data-testid="f7-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: 156,
          width: 660,
          bottom: 80,
        }}
      >
        <DetailCanvas
          activeFacet={activeFacet}
          defaultState={defaultState}
          states={states}
        />
      </div>
    </>
  );
}

// ────────────────────────── slide def ──────────────────────────

export const f7Slide: SlideDef = {
  steps: 7,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F7SubagentsSpecialists />,
};
