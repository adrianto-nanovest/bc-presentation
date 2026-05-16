// F.2 — GROUND TRUTH (RAG · Grounding in your facts)
//
// CANONICAL pattern for Section F facet slides (F.2–F.7). Two-step structure
// with hover-only details and an aligned right-pane popover anchor.
//
// Step axis (2 steps; canonical pose = 1):
//   0 — All 5 facet cards stagger-reveal on the left. Hover is always on.
//       Right pane is empty until the user hovers a facet card. On hover
//       the matching illustration crossfades in. Footer hidden.
//   1 — Footer (italic copper-200 caption) fades in below the facet cards.
//       Everything else stays revealed; hover continues to drive details.
//
// Right-pane geometry (Items 1-3 of the popover refactor):
//   The right-pane wrapper has NO border / background of its own — it is a
//   transparent popover anchor whose vertical extent matches the FacetMenu's
//   card stack exactly (top/bottom measured at runtime via
//   `useFacetListBounds`). Content is centered vertically inside that range
//   with `justifyContent: center` and `maxHeight: 100%` so it never spills
//   above the first card top or below the last card bottom.
//
// Hover behaviour:
//   activeFacet === null         → right pane is empty
//   activeFacet === "<facet-id>" → matching illustration crossfades in (700ms)
//   Crossfade between facets is handled inside DetailCanvas.
//
// F.3–F.7 mirror this structure exactly: 2 steps, canonical pose 1, identical
// runtime bounds measurement, hover-only DetailCanvas with NO defaultState.
import { Fragment, useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { RAGTypesCarousel } from "./components/RAGTypesCarousel";
import { LucideIcon } from "./components/LucideIcon";
import { Typewriter } from "./components/Typewriter";
import { useFacetListBounds } from "./components/useFacetListBounds";
import { f2Content as C } from "./content";

// ───────────────────── shared layout constants (F-section canonical) ─────────────────────
//
// Right pane width — kept stable across F.2–F.7. Top / bottom are measured at
// runtime via `useFacetListBounds` so the wrapper aligns with the FacetMenu's
// card stack exactly (independent of card count or footer visibility).

const RIGHT_W = 660;

// ───────────────────── slide ─────────────────────

export function F2RagGroundTruth() {
  const { stepIndex } = useDeck();

  // CANONICAL Section F step-gate pattern (F.3-F.7 must mirror):
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
      <FigLabel section="F" num={2} label="GROUND TRUTH" />

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
        showHint
        footer={C.footer}
        footerKw={[...C.footerKw]}
        showFooter={showFooter}
      />

      {/* RIGHT — transparent popover anchor. Top / bottom match the left
          FacetMenu's card-stack extent exactly (measured at runtime).
          Content centers vertically within that range. */}
      <div
        data-testid="f2-right-pane"
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
        {/* Content area — DetailCanvas renders nothing until a facet hover.
            `maxHeight: 100%` + relative positioning constrains the canvas to
            the FacetMenu's card-stack vertical bounds so popover content can
            never overflow above the first card or below the last card. */}
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
              "the-types": <TheTypesState />,
              "when-to-reach": <WhenToReachState />,
              example: <ExampleState active={effectiveFacet === "example"} />,
            }}
          />
        </div>
      </div>
    </>
  );
}

// ───────────────────── shared atoms ─────────────────────
//
// FacetHeader was removed in the popover refactor (Item 1) — facet states no
// longer carry their own label/caption strip; the left FacetMenu card already
// names the facet, so the popover focuses on the illustration alone.

// Mono uppercase column title — used at the top of each column in 3-column
// layouts (WHAT IT IS, THE TYPES). Per task spec: ~10–11px, copper-200,
// letter-spacing 0.12em.
function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--mono)",
        fontSize: 10.5,
        letterSpacing: "0.12em",
        color: "var(--copper-200)",
        textTransform: "uppercase",
        lineHeight: 1.2,
      }}
    >
      {children}
    </div>
  );
}

// ───────────────────── WHAT IT IS state ─────────────────────
//
// NEW dedicated 3-column illustration (replaces the BridgeArtifact default).
// Reference: user image #2 — three columns connected by arrows with a
// continuous flowing-dot animation. Column titles in mono uppercase.

function WhatItIsState() {
  // R2-1: outer wrapper centers content vertically inside the popover anchor;
  // the inner grid uses an explicit row template so the title block and the
  // illustration row are independent rows. The connector arrows sit on the
  // *illustration row* with vertical-center alignment, which lands their
  // midpoint at the vertical midpoint of the illustration (not below the
  // title block as before).
  return (
    <div
      data-testid="f2-what-it-is"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4px 12px",
        gap: 0,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 36px 1fr 36px 1fr",
          gridTemplateRows: "auto auto",
          // alignItems defaults to "stretch" — each cell fills its row's
          // vertical extent. Row 1 cells (titles) hug top naturally via their
          // own flex layout; row 2 cells (illustrations + arrows) use
          // alignItems: center internally so the arrow lands at the
          // illustration's vertical midpoint.
          columnGap: 0,
          rowGap: 20,
          minHeight: 0,
        }}
      >
        {/* Row 1 — title blocks (each horizontally centered inside its column). */}
        <RagTitle
          title="UNSTRUCTURED SOURCES"
          subtitle="docs / PDFs / sheets"
        />
        <div aria-hidden="true" />
        <RagTitle title="INDEXED KNOWLEDGE" subtitle="searchable corpus" />
        <div aria-hidden="true" />
        <RagTitle title="QUERY INTERFACE" subtitle="grounded answer" />

        {/* Row 2 — illustrations + connector arrows, all vertically centered
            within the row so the arrow sits at the illustration's midpoint. */}
        <RagIllustration>
          <FilePile />
        </RagIllustration>
        <FlowArrow testId="f2-arrow-1" />
        <RagIllustration>
          <IndexBlock />
        </RagIllustration>
        <FlowArrow testId="f2-arrow-2" />
        <RagIllustration>
          <QueryBlock />
        </RagIllustration>
      </div>
    </div>
  );
}

interface RagTitleProps {
  title: string;
  subtitle: string;
}

// Title block (mono uppercase label + italic caption) — horizontally centered
// inside its grid column so it shares a vertical center axis with the
// illustration below it (R2-1 fix).
function RagTitle({ title, subtitle }: RagTitleProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 4,
        padding: "0 6px",
        minWidth: 0,
      }}
    >
      <ColumnTitle>{title}</ColumnTitle>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 11,
          color: "var(--neutral-400)",
          lineHeight: 1.3,
        }}
      >
        {subtitle}
      </span>
    </div>
  );
}

// Illustration cell — horizontally centered inside its grid column so its
// midpoint sits directly under the title block's midpoint.
function RagIllustration({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 6px",
        minWidth: 0,
      }}
    >
      {children}
    </div>
  );
}

// Continuous flowing-dot arrow between columns. The arrow itself is a static
// horizontal line + arrowhead; a small copper dot loops along the line every
// 2s via the `f-flow-dot` keyframe (CSS Motion Path).
//
// R2-1: arrow now lives on the illustration row (row 2 of the parent grid)
// and aligns vertically to row center, so it lands at the illustration's
// vertical midpoint rather than below it.
interface FlowArrowProps {
  testId?: string;
}
function FlowArrow({ testId }: FlowArrowProps) {
  return (
    <div
      data-testid={testId}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: "100%",
      }}
      aria-hidden="true"
    >
      <svg
        width="36"
        height="20"
        viewBox="0 0 36 20"
        style={{ overflow: "visible" }}
      >
        <line
          x1="2"
          y1="10"
          x2="28"
          y2="10"
          stroke="var(--copper-500)"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <polygon
          points="34,10 26,6 26,14"
          fill="var(--copper-300)"
          opacity="0.9"
        />
        {/* Flowing dot — loops left→right every 2s, used by the parent
            `f-flow-dot` class on a wrapping <g>. We attach the keyframe to a
            CSS-driven <circle> via offset-path. */}
        <circle
          className="f-flow-dot"
          r="2"
          fill="var(--copper-200)"
          style={{
            offsetPath: "path('M 2 10 L 28 10')",
          }}
        />
      </svg>
    </div>
  );
}

// Column 1 — stack of source files (.pdf / .docx / .xlsx / .csv).
function FilePile() {
  const items = [
    { ext: ".pdf", y: 0 },
    { ext: ".docx", y: 32 },
    { ext: ".xlsx", y: 64 },
    { ext: ".csv", y: 96 },
  ];
  return (
    <svg
      width="120"
      height="140"
      viewBox="0 0 120 140"
      style={{ overflow: "visible" }}
    >
      {items.map((it, i) => (
        <g
          key={it.ext}
          transform={`translate(${10 + i * 4}, ${it.y}) rotate(${(i % 2 === 0 ? -2 : 3)})`}
        >
          <rect
            x="0"
            y="0"
            width="80"
            height="28"
            fill="rgba(38,38,38,0.7)"
            stroke="var(--copper-600)"
            strokeWidth="1"
          />
          <text
            x="10"
            y="18"
            fontFamily="var(--mono)"
            fontSize="10"
            fill="var(--copper-200)"
            letterSpacing="0.10em"
          >
            {it.ext}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Column 2 — indexed knowledge: dot-grid block representing the vector store
// with three "tags" floating above to suggest semantic chunks.
function IndexBlock() {
  const cols = 8;
  const rows = 6;
  const dots: ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      dots.push(
        <circle
          key={`${r}-${col}`}
          cx={8 + col * 12}
          cy={28 + r * 12}
          r="1.5"
          fill="var(--copper-400)"
          opacity={0.4 + ((r + col) % 3) * 0.15}
        />,
      );
    }
  }
  return (
    <svg
      width="120"
      height="140"
      viewBox="0 0 120 140"
      style={{ overflow: "visible" }}
    >
      {/* Outer frame */}
      <rect
        x="2"
        y="20"
        width="108"
        height="88"
        fill="rgba(10,10,10,0.6)"
        stroke="var(--copper-700)"
        strokeWidth="1"
      />
      {dots}
      {/* Two chunk tags */}
      <rect
        x="14"
        y="116"
        width="36"
        height="14"
        fill="rgba(184,110,61,0.10)"
        stroke="var(--copper-500)"
        strokeWidth="0.8"
      />
      <text
        x="32"
        y="126"
        textAnchor="middle"
        fontFamily="var(--mono)"
        fontSize="7"
        fill="var(--copper-200)"
        letterSpacing="0.08em"
      >
        chunk
      </text>
      <rect
        x="60"
        y="116"
        width="36"
        height="14"
        fill="rgba(184,110,61,0.10)"
        stroke="var(--copper-500)"
        strokeWidth="0.8"
      />
      <text
        x="78"
        y="126"
        textAnchor="middle"
        fontFamily="var(--mono)"
        fontSize="7"
        fill="var(--copper-200)"
        letterSpacing="0.08em"
      >
        chunk
      </text>
    </svg>
  );
}

// Column 3 — query interface: search bar + Claude response.
function QueryBlock() {
  return (
    <svg
      width="120"
      height="140"
      viewBox="0 0 120 140"
      style={{ overflow: "visible" }}
    >
      {/* Search bar */}
      <rect
        x="4"
        y="14"
        width="112"
        height="22"
        fill="rgba(10,10,10,0.7)"
        stroke="var(--copper-500)"
        strokeWidth="1"
      />
      <circle cx="14" cy="25" r="3" stroke="var(--copper-200)" strokeWidth="1" fill="none" />
      <line
        x1="16.5"
        y1="27.5"
        x2="20"
        y2="31"
        stroke="var(--copper-200)"
        strokeWidth="1"
      />
      <text
        x="26"
        y="29"
        fontFamily="var(--serif)"
        fontStyle="italic"
        fontSize="9"
        fill="var(--neutral-200)"
      >
        ask…
      </text>
      {/* Claude response panel */}
      <rect
        x="4"
        y="48"
        width="112"
        height="80"
        fill="rgba(184,110,61,0.08)"
        stroke="var(--copper-600)"
        strokeWidth="1"
      />
      <text
        x="10"
        y="60"
        fontFamily="var(--mono)"
        fontSize="7"
        fill="var(--copper-100)"
        letterSpacing="0.16em"
      >
        CLAUDE
      </text>
      <line
        x1="10"
        y1="68"
        x2="100"
        y2="68"
        stroke="var(--copper-300)"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <line x1="10" y1="78" x2="106" y2="78" stroke="var(--neutral-400)" strokeWidth="0.6" />
      <line x1="10" y1="86" x2="98" y2="86" stroke="var(--neutral-400)" strokeWidth="0.6" />
      <line x1="10" y1="94" x2="102" y2="94" stroke="var(--neutral-400)" strokeWidth="0.6" />
      <line x1="10" y1="102" x2="88" y2="102" stroke="var(--neutral-400)" strokeWidth="0.6" />
      {/* Citation chips */}
      <rect
        x="10"
        y="110"
        width="14"
        height="10"
        fill="none"
        stroke="var(--copper-500)"
        strokeWidth="0.8"
      />
      <text
        x="17"
        y="118"
        textAnchor="middle"
        fontFamily="var(--mono)"
        fontSize="6"
        fill="var(--copper-200)"
      >
        [1]
      </text>
      <rect
        x="28"
        y="110"
        width="14"
        height="10"
        fill="none"
        stroke="var(--copper-500)"
        strokeWidth="0.8"
      />
      <text
        x="35"
        y="118"
        textAnchor="middle"
        fontFamily="var(--mono)"
        fontSize="6"
        fill="var(--copper-200)"
      >
        [2]
      </text>
    </svg>
  );
}

// ───────────────────── HOW IT WORKS state ─────────────────────
//
// 3-step pipe diagram: Retrieval → Augmentation → Generation. Apply the
// canonical layout template (header + horizontal flow) and use the deck-wide
// `f-card-cycle` highlight cycle (left→right) to sequence the three steps.

interface PipeStep {
  id: string;
  label: string;
  caption: string;
  icon: string;
  body: ReactNode;
}

function HowItWorksState() {
  const steps: PipeStep[] = [
    {
      id: "retrieval",
      label: "Retrieval",
      caption: "search + top-K docs",
      icon: "Search",
      body: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            width: "100%",
          }}
        >
          <div
            style={{
              border: "1px solid var(--copper-700)",
              padding: "4px 8px",
              fontFamily: "var(--mono)",
              fontSize: 9.5,
              color: "var(--neutral-200)",
              background: "rgba(10,10,10,0.6)",
              letterSpacing: "0.04em",
            }}
          >
            &ldquo;Q2 budget policy&rdquo;
          </div>
          {["doc · 1", "doc · 2", "doc · 3"].map((d) => (
            <div
              key={d}
              style={{
                border: "1px solid var(--copper-800)",
                padding: "3px 8px",
                fontFamily: "var(--mono)",
                fontSize: 9,
                letterSpacing: "0.08em",
                color: "var(--copper-200)",
                background: "rgba(184,110,61,0.05)",
              }}
            >
              {d}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "augmentation",
      label: "Augmentation",
      caption: "docs into context",
      icon: "Layers",
      body: (
        <div
          style={{
            border: "1px solid var(--copper-700)",
            padding: 8,
            width: "100%",
            background: "rgba(184,110,61,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: "0.18em",
              color: "var(--copper-300)",
              textTransform: "uppercase",
            }}
          >
            Context
          </span>
          {[
            "system prompt",
            "+ doc · 1",
            "+ doc · 2",
            "+ doc · 3",
            "+ user query",
          ].map((line) => (
            <span
              key={line}
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9,
                color: "var(--neutral-200)",
                letterSpacing: "0.02em",
              }}
            >
              {line}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "generation",
      label: "Generation",
      caption: "Claude composes",
      icon: "Bot",
      body: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 8px",
              border: "1px solid var(--copper-500)",
              background: "rgba(184,110,61,0.10)",
            }}
          >
            <LucideIcon name="Bot" size={14} color="var(--copper-200)" />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.12em",
                color: "var(--copper-100)",
              }}
            >
              CLAUDE
            </span>
          </div>
          <div
            style={{
              padding: 8,
              border: "1px solid var(--copper-800)",
              background: "rgba(10,10,10,0.65)",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 11,
              color: "var(--neutral-100)",
              lineHeight: 1.4,
            }}
          >
            grounded answer with citations
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      data-testid="f2-how-it-works"
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
          display: "flex",
          alignItems: "stretch",
          gap: 10,
          flex: 1,
          minHeight: 0,
        }}
      >
        {steps.map((s, i) => (
          <Fragment key={s.id}>
            <PipeStepCard step={s} index={i} total={steps.length} />
            {i < steps.length - 1 && <PipeArrow />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function PipeStepCard({
  step,
  index,
  total,
}: {
  step: PipeStep;
  index: number;
  total: number;
}) {
  return (
    <div
      data-testid={`pipe-step-${step.id}`}
      className="f-card-cycle"
      style={
        {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: 12,
          "--cycle-duration": `${total}s`,
          "--cycle-delay": `${index}s`,
        } as CSSProperties
      }
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <LucideIcon name={step.icon} size={16} color="var(--copper-200)" />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: "0.20em",
            color: "var(--copper-100)",
            textTransform: "uppercase",
          }}
        >
          {step.label}
        </span>
      </div>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 11,
          color: "var(--neutral-300)",
          lineHeight: 1.4,
        }}
      >
        {step.caption}
      </span>
      <div style={{ flex: 1, display: "flex" }}>{step.body}</div>
    </div>
  );
}

function PipeArrow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        color: "var(--copper-300)",
        fontFamily: "var(--mono)",
        fontSize: 18,
      }}
      aria-hidden="true"
    >
      &rarr;
    </div>
  );
}

// ───────────────────── THE TYPES state ─────────────────────
//
// Existing RAGTypesCarousel wrapped with the canonical header strip. The
// carousel itself auto-cycles every 2.5s through vector → graph → file →
// hybrid (smooth crossfade between platter variants). Zone titles
// (SOURCES · STORAGE · RETRIEVAL) live inside <BridgeArtifact> itself, so we
// don't repeat them here.

function TheTypesState() {
  return (
    <div
      data-testid="f2-the-types"
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
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <RAGTypesCarousel autoCycle />
      </div>
    </div>
  );
}

// ───────────────────── WHEN TO REACH state ─────────────────────
//
// Static 4×3 decision matrix. Previously the rows used a `f-row-pulse-*`
// highlight loop, but the moving emphasis was reported as confusing during
// hover, so the table now renders fully static (no reveal stagger, no row
// pulse, no shimmer). Keep styling only.

interface MatrixRow {
  scenario: string;
  rag: "check" | "dash";
  longCtx: "check" | "dash";
  either: "check" | "dash";
}

const MATRIX_ROWS: readonly MatrixRow[] = [
  {
    scenario: "large knowledge base, narrow Q&A",
    rag: "check",
    longCtx: "dash",
    either: "dash",
  },
  {
    scenario: "small set of docs, deep cross-reference",
    rag: "dash",
    longCtx: "check",
    either: "dash",
  },
  {
    scenario: "fact-sensitive, must cite source",
    rag: "check",
    longCtx: "dash",
    either: "dash",
  },
  {
    scenario: "fresh data, updated daily",
    rag: "check",
    longCtx: "dash",
    either: "check",
  },
];

function WhenToReachState() {
  return (
    <div
      data-testid="f2-when-to-reach"
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
          gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
          rowGap: 1,
          columnGap: 1,
          background: "var(--copper-800)",
          border: "1px solid var(--copper-800)",
        }}
      >
        {/* Header row */}
        <MatrixHeader label="SCENARIO" align="left" />
        <MatrixHeader label="RAG FITS" />
        <MatrixHeader label="LONG-CTX FITS" />
        <MatrixHeader label="EITHER" />
        {/* Body rows — fully static, no pulse class / reveal animation. */}
        {MATRIX_ROWS.map((r) => (
          <Fragment key={r.scenario}>
            <MatrixCell>
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 12,
                  color: "var(--neutral-100)",
                  lineHeight: 1.4,
                }}
              >
                {r.scenario}
              </span>
            </MatrixCell>
            <MatrixCell center>
              <MatrixMark mark={r.rag} />
            </MatrixCell>
            <MatrixCell center>
              <MatrixMark mark={r.longCtx} />
            </MatrixCell>
            <MatrixCell center>
              <MatrixMark mark={r.either} />
            </MatrixCell>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function MatrixHeader({
  label,
  align = "center",
}: {
  label: string;
  align?: "left" | "center";
}) {
  return (
    <div
      style={{
        background: "rgba(122,70,38,0.18)",
        padding: "8px 10px",
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.20em",
        color: "var(--copper-200)",
        textTransform: "uppercase",
        textAlign: align,
      }}
    >
      {label}
    </div>
  );
}

function MatrixCell({
  center = false,
  children,
}: {
  center?: boolean;
  children: ReactNode;
}) {
  return (
    <div
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

function MatrixMark({ mark }: { mark: "check" | "dash" }) {
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        fontSize: 18,
        color: mark === "check" ? "var(--copper-200)" : "var(--copper-700)",
        lineHeight: 1,
      }}
      aria-label={mark === "check" ? "yes" : "no"}
    >
      {mark === "check" ? "✓" : "—"}
    </span>
  );
}

// ───────────────────── EXAMPLE state ─────────────────────
//
// All text blocks stream in with staggered Typewriter animations. Stagger
// (~500ms between blocks):
//   query        → starts at 0ms     (duration 900ms)
//   snippet [1]  → starts at 500ms   (duration 1200ms)
//   snippet [2]  → starts at 1100ms  (duration 1200ms)
//   answer       → starts at 1900ms  (duration 1500ms)
//
// `active` gates the entire stream so each fresh hover restarts the typing
// from zero (re-mounting the layer via React's key would be heavier — we let
// the Typewriter `play` prop drive the reset).

interface ExampleSnippet {
  id: number;
  source: string;
  quote: string;
}

const EXAMPLE_QUERY = "what's our policy on remote work?";
const EXAMPLE_SNIPPETS: readonly ExampleSnippet[] = [
  {
    id: 1,
    source: "handbook/remote-work.md · §2",
    quote:
      "All full-time staff may work remotely up to 3 days per week, subject to manager approval.",
  },
  {
    id: 2,
    source: "handbook/remote-work.md · §4",
    quote:
      "Core hours 10:00–15:00 local time apply regardless of work location.",
  },
];
const EXAMPLE_ANSWER =
  "Up to 3 remote days per week with manager approval [1], and you must be online during core hours 10:00–15:00 [2].";

interface ExampleStateProps {
  /** When true, kicks off the staggered typewriter stream. */
  active: boolean;
}

function ExampleState({ active }: ExampleStateProps) {
  // Per-block play gates. Each block becomes "playing" after its stagger
  // delay elapses from the moment `active` flips true. When `active` flips
  // false (hover out), reset everything immediately.
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!active) {
      setStage(0);
      return;
    }
    // Stagger: stage 0 → query, 1 → snippet 1, 2 → snippet 2, 3 → answer.
    const t1 = window.setTimeout(() => setStage(1), 0);
    const t2 = window.setTimeout(() => setStage(2), 500);
    const t3 = window.setTimeout(() => setStage(3), 1100);
    const t4 = window.setTimeout(() => setStage(4), 1900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [active]);

  // R2-3 + follow-up: boxes are sized absolutely from the start so that the
  // Typewriter text streams INTO a fixed-size container rather than growing it.
  // Sections are absolutely positioned inside a height-reserved inner wrapper;
  // the wrapper is vertically centered by the outer flex. This eliminates the
  // reflow/shift the user was seeing as content streams in.
  const SECTION_QUESTION_TOP = 0;
  const SECTION_QUESTION_HEIGHT = 60; // label(14) + gap(6) + box(40)
  const SECTION_RETRIEVED_TOP = 72; // 60 + 12 gap
  const SECTION_RETRIEVED_HEIGHT = 170; // label(14) + gap(6) + 2 × box(72) + gap(6)
  const SECTION_ANSWER_TOP = 254; // 72 + 170 + 12 gap
  const SECTION_ANSWER_HEIGHT = 88; // label(20) + gap(6) + box(62)
  const INNER_TOTAL_HEIGHT = SECTION_ANSWER_TOP + SECTION_ANSWER_HEIGHT; // 342
  const QUERY_BOX_HEIGHT = 40;
  const SNIPPET_BOX_HEIGHT = 72;
  const ANSWER_BOX_HEIGHT = 62;

  return (
    <div
      data-testid="f2-example"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8px 12px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: INNER_TOTAL_HEIGHT,
        }}
      >
        {/* Question section — absolute top */}
        <div
          data-testid="f2-example-question-section"
          style={{
            position: "absolute",
            top: SECTION_QUESTION_TOP,
            left: 0,
            right: 0,
            height: SECTION_QUESTION_HEIGHT,
          }}
        >
          <span
            data-testid="f2-example-question-label"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9.5,
              letterSpacing: "0.22em",
              color: "var(--copper-300)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Question
          </span>
          <div
            data-testid="f2-example-query"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 14px",
              height: QUERY_BOX_HEIGHT,
              border: "1px solid var(--copper-500)",
              background: "rgba(10,10,10,0.7)",
              boxSizing: "border-box",
            }}
          >
            <LucideIcon name="Search" size={16} color="var(--copper-200)" />
            <Typewriter
              text={`“${EXAMPLE_QUERY}”`}
              play={stage >= 1}
              duration={900}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--neutral-100)",
                lineHeight: 1.4,
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            />
          </div>
        </div>

        {/* Retrieved section — absolute middle */}
        <div
          data-testid="f2-example-snippets"
          style={{
            position: "absolute",
            top: SECTION_RETRIEVED_TOP,
            left: 0,
            right: 0,
            height: SECTION_RETRIEVED_HEIGHT,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9.5,
              letterSpacing: "0.22em",
              color: "var(--copper-300)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
            }}
          >
            Retrieved
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {EXAMPLE_SNIPPETS.map((s) => {
              const snippetStage = s.id === 1 ? 2 : 3;
              return (
                <div
                  key={s.id}
                  data-testid={`f2-example-snippet-${s.id}`}
                  style={{
                    border: "1px solid var(--copper-800)",
                    background: "rgba(184,110,61,0.05)",
                    padding: "10px 14px",
                    height: SNIPPET_BOX_HEIGHT,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    boxSizing: "border-box",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                        letterSpacing: "0.10em",
                        color: "var(--copper-200)",
                        border: "1px solid var(--copper-700)",
                        padding: "1px 5px",
                        lineHeight: 1,
                      }}
                    >
                      [{s.id}]
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                        letterSpacing: "0.10em",
                        color: "var(--neutral-400)",
                      }}
                    >
                      {s.source}
                    </span>
                  </div>
                  <Typewriter
                    text={`“${s.quote}”`}
                    play={stage >= snippetStage}
                    duration={1200}
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 12.5,
                      color: "var(--neutral-100)",
                      lineHeight: 1.45,
                      margin: 0,
                      whiteSpace: "pre-wrap",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Grounded answer section — absolute bottom */}
        <div
          data-testid="f2-example-answer-section"
          style={{
            position: "absolute",
            top: SECTION_ANSWER_TOP,
            left: 0,
            right: 0,
            height: SECTION_ANSWER_HEIGHT,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
              height: 14,
            }}
          >
            <LucideIcon name="Bot" size={14} color="var(--copper-300)" />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.22em",
                color: "var(--copper-300)",
                textTransform: "uppercase",
              }}
            >
              Claude &middot; grounded answer
            </span>
          </div>
          <div
            data-testid="f2-example-answer"
            style={{
              border: "1px solid var(--copper-500)",
              background: "rgba(184,110,61,0.10)",
              padding: "12px 14px",
              height: ANSWER_BOX_HEIGHT,
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <Typewriter
              text={EXAMPLE_ANSWER}
              play={stage >= 4}
              duration={1500}
              style={{
                fontFamily: "var(--serif)",
                fontSize: 13.5,
                color: "var(--neutral-50)",
                lineHeight: 1.5,
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const f2Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F2RagGroundTruth />,
};
