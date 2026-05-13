// F.2 — GROUND TRUTH (RAG · Grounding in your facts)
//
// CANONICAL pattern for Section F facet slides (F.2–F.7). Two-step structure
// with hover-only details and an aligned right-pane bordered box.
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
// Hover behaviour:
//   activeFacet === null         → bordered box shows; content area empty
//   activeFacet === "<facet-id>" → matching illustration crossfades in (700ms)
//   Crossfade between facets is handled inside DetailCanvas.
//
// F.3–F.7 mirror this structure exactly: 2 steps, canonical pose 1, identical
// border alignment, hover-only DetailCanvas with NO defaultState.
import { Fragment, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { RAGTypesCarousel } from "./components/RAGTypesCarousel";
import { LucideIcon } from "./components/LucideIcon";
import { Typewriter } from "./components/Typewriter";
import { f2Content as C } from "./content";

// ───────────────────── shared layout constants (F-section canonical) ─────────────────────
//
// Mirror the FacetMenu's vertical rhythm so the right pane's content area
// top-aligns with the left's first facet card top-border.
//   header-line height ≈ 14px (mono 11px line-height 1.2-ish)
//   marginTop: 12       → space between header and copper rule
//   copper rule         → 1px
//   marginTop: 16       → space between rule and first facet card
// Total ≈ 43px. We bake the exact mirror in the right pane via an invisible
// header strip so the alignment is automatic (no hand-tuned magic number).

const PANE_TOP = 156;
const PANE_BOTTOM = 80;
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
  const effectiveFacet = hoverEnabled ? activeFacet : null;

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
        activeFacet={effectiveFacet}
        onHover={hoverEnabled ? setActiveFacet : () => {}}
        showCards={showCards}
        header={C.header}
        footer={C.footer}
        footerKw={[...C.footerKw]}
        showFooter={showFooter}
      />

      {/* RIGHT — bordered box. Top/bottom borders align with FacetMenu's
          top edge (PANE_TOP) and bottom edge (PANE_BOTTOM) exactly. */}
      <div
        data-testid="f2-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: PANE_TOP,
          width: RIGHT_W,
          bottom: PANE_BOTTOM,
          border: "1px solid var(--copper-700)",
          background: "rgba(10,10,10,0.5)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Invisible-visibility header strip — mirrors the left FacetMenu's
            mono header + 12px gap + 1px copper rule + 16px gap so the right
            pane's content area top aligns with the left's first facet card
            top border exactly. Padding 16px matches the bordered box's gutter. */}
        <div
          aria-hidden
          style={{
            visibility: "hidden",
            padding: "0 16px",
            paddingTop: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            {C.header}
          </span>
          <div style={{ marginTop: 12, height: 1 }} />
        </div>

        {/* Content area — DetailCanvas renders nothing until a facet hover. */}
        <div
          style={{
            position: "relative",
            flex: 1,
            margin: 16,
            marginTop: 16,
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

// ───────────────────── shared sub-section header ─────────────────────
//
// Used by every facet hover state to label the illustration. Mono uppercase
// label + italic serif caption underneath. Sits at the top of each state.

interface FacetHeaderProps {
  label: string;
  caption: string;
}

function FacetHeader({ label, caption }: FacetHeaderProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 13,
          color: "var(--copper-200)",
          lineHeight: 1.4,
        }}
      >
        {caption}
      </span>
    </div>
  );
}

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
  return (
    <div
      data-testid="f2-what-it-is"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="WHAT IT IS"
        caption="a fact-checker reading the actual manual"
      />

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 36px 1fr 36px 1fr",
          alignItems: "stretch",
          gap: 0,
          minHeight: 0,
        }}
      >
        <RagColumn
          title="UNSTRUCTURED SOURCES"
          subtitle="docs / PDFs / sheets"
        >
          <FilePile />
        </RagColumn>
        <FlowArrow testId="f2-arrow-1" />
        <RagColumn title="INDEXED KNOWLEDGE" subtitle="searchable corpus">
          <IndexBlock />
        </RagColumn>
        <FlowArrow testId="f2-arrow-2" />
        <RagColumn title="QUERY INTERFACE" subtitle="grounded answer">
          <QueryBlock />
        </RagColumn>
      </div>
    </div>
  );
}

interface RagColumnProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

function RagColumn({ title, subtitle, children }: RagColumnProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: "8px 6px",
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
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Continuous flowing-dot arrow between columns. The arrow itself is a static
// horizontal line + arrowhead; a small copper dot loops along the line every
// 2s via the `f-flow-dot` keyframe (CSS Motion Path).
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
// canonical layout template (header + horizontal flow) and add a sequential
// pulse loop highlighting each step in turn every ~2.5s.

interface PipeStep {
  id: string;
  label: string;
  caption: string;
  icon: string;
  pulseClass: "f-seq-pulse-1" | "f-seq-pulse-2" | "f-seq-pulse-3";
  body: ReactNode;
}

function HowItWorksState() {
  const steps: PipeStep[] = [
    {
      id: "retrieval",
      label: "Retrieval",
      caption: "search + top-K docs",
      icon: "Search",
      pulseClass: "f-seq-pulse-1",
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
      pulseClass: "f-seq-pulse-2",
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
      pulseClass: "f-seq-pulse-3",
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
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="HOW IT WORKS"
        caption="retrieve → augment → generate"
      />

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
            <PipeStepCard step={s} />
            {i < steps.length - 1 && <PipeArrow />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function PipeStepCard({ step }: { step: PipeStep }) {
  return (
    <div
      data-testid={`pipe-step-${step.id}`}
      className={step.pulseClass}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 12,
        border: "1px solid var(--copper-700)",
        background: "rgba(10,10,10,0.5)",
      }}
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
// hybrid (smooth crossfade between platter variants). Column titles below
// echo the three structural facets common to every type:
//   INPUT SOURCES · STORAGE STRATEGY · RETRIEVAL

function TheTypesState() {
  return (
    <div
      data-testid="f2-the-types"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 10,
      }}
    >
      <FacetHeader
        label="THE TYPES"
        caption="vector · graph · file · hybrid"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          paddingTop: 2,
        }}
      >
        <ColumnTitle>INPUT SOURCES</ColumnTitle>
        <div style={{ textAlign: "center" }}>
          <ColumnTitle>STORAGE STRATEGY</ColumnTitle>
        </div>
        <div style={{ textAlign: "right" }}>
          <ColumnTitle>RETRIEVAL</ColumnTitle>
        </div>
      </div>

      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <RAGTypesCarousel autoCycle />
      </div>
    </div>
  );
}

// ───────────────────── WHEN TO REACH state ─────────────────────
//
// CANONICAL layout template — F.3–F.7 model their default-content matrices on
// this composition: FacetHeader + 4×3 grid with row-by-row pulse loop
// (~4s, each row ~1s of emphasis).

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

const PULSE_CLASSES = [
  "f-row-pulse-1",
  "f-row-pulse-2",
  "f-row-pulse-3",
  "f-row-pulse-4",
] as const;

function WhenToReachState() {
  return (
    <div
      data-testid="f2-when-to-reach"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 14,
      }}
    >
      <FacetHeader
        label="WHEN TO REACH"
        caption="RAG vs long-context — pick the right tool."
      />

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
        {/* Body rows — each row gets its own pulse class so the highlight
            travels top → bottom across the 4s cycle. */}
        {MATRIX_ROWS.map((r, i) => {
          const pulse = PULSE_CLASSES[i];
          return (
            <Fragment key={r.scenario}>
              <MatrixCell pulseClass={pulse}>
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
              <MatrixCell center pulseClass={pulse}>
                <MatrixMark mark={r.rag} />
              </MatrixCell>
              <MatrixCell center pulseClass={pulse}>
                <MatrixMark mark={r.longCtx} />
              </MatrixCell>
              <MatrixCell center pulseClass={pulse}>
                <MatrixMark mark={r.either} />
              </MatrixCell>
            </Fragment>
          );
        })}
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
  pulseClass,
  children,
}: {
  center?: boolean;
  pulseClass?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={pulseClass}
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

  return (
    <div
      data-testid="f2-example"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 10,
      }}
    >
      <FacetHeader
        label="EXAMPLE · company handbook"
        caption="answer from the company handbook"
      />

      {/* Query bar */}
      <div
        data-testid="f2-example-query"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          border: "1px solid var(--copper-500)",
          background: "rgba(10,10,10,0.7)",
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

      {/* Retrieved snippets */}
      <div
        data-testid="f2-example-snippets"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          Retrieved
        </span>
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
                display: "flex",
                flexDirection: "column",
                gap: 4,
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

      {/* Grounded answer */}
      <div
        data-testid="f2-example-answer"
        style={{
          marginTop: "auto",
          border: "1px solid var(--copper-500)",
          background: "rgba(184,110,61,0.10)",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LucideIcon name="Bot" size={14} color="var(--copper-200)" />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "var(--copper-100)",
              textTransform: "uppercase",
            }}
          >
            CLAUDE &middot; grounded answer
          </span>
        </div>
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
