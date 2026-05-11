// F.2 — GROUND TRUTH (RAG · Grounding in your facts)
//
// Spec §5. E.8-style 480/660 split — FacetMenu on the left, DetailCanvas on
// the right. Five facets (WHAT IT IS · HOW IT WORKS · THE TYPES · WHEN TO
// REACH · EXAMPLE) reveal one-by-one tied to stepIndex. The default canvas
// is the LLM-Wiki-canonical `<BridgeArtifact mode="file">` (silver platter
// with 4 .md cards); each facet hover crossfades the right pane via
// `<DetailCanvas>`.
//
// Step axis (7 steps — spec §5.6):
//   0 — title + facet header + copper rule visible; facet items hidden;
//       canvas at 0.5 opacity (dim default)
//   1 — facet 1 (WHAT IT IS)        reveals
//   2 — facet 2 (HOW IT WORKS)      reveals
//   3 — facet 3 (THE TYPES)         reveals
//   4 — facet 4 (WHEN TO REACH)     reveals
//   5 — facet 5 (EXAMPLE)           reveals; canvas brightens to opacity 1
//   6 — footer italic reveals
//
// Per-step facet gating is achieved by passing `revealUntilIndex={stepIndex - 1}`
// to FacetMenu (additive prop — falls back to single-boolean cascade when
// omitted). The internal `Reveal delay={120 + i * 90}` keeps the cascade
// staircase visual on each step.
//
// Hover behaviour (spec §5.7): after step 5, hovering any facet item swaps
// the right canvas (700ms crossfade in DetailCanvas). Mouse-leave returns
// to the default LLM-Wiki state.
//
// Canonical pose: 5 — all facets revealed, canvas in default file/LLM-Wiki state.
import { Fragment, useState } from "react";
import type { ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { FacetMenu } from "./components/FacetMenu";
import { DetailCanvas } from "./components/DetailCanvas";
import { BridgeArtifact } from "./components/BridgeArtifact";
import { RAGTypesCarousel } from "./components/RAGTypesCarousel";
import { LucideIcon } from "./components/LucideIcon";
import { f2Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function F2RagGroundTruth() {
  const { stepIndex } = useDeck();

  const [activeFacet, setActiveFacet] = useState<string | null>(null);

  // Per-step facet reveal: steps 1..5 each reveal one facet item.
  // (revealUntilIndex = -1 at step 0 keeps all items hidden.)
  const revealUntilIndex = stepIndex - 1;
  const showFooter = stepIndex >= 6;
  const canvasBright = stepIndex >= 5;

  // Hover-enabled only after all 5 facets are revealed (spec §5.7).
  const hoverEnabled = stepIndex >= 5;
  const effectiveFacet = hoverEnabled ? activeFacet : null;

  return (
    <>
      <FigLabel section="F" num={2} label="GROUND TRUTH" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      {/* LEFT — facet menu (per-step gated reveal) */}
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
        // showCards retained for backwards-compat — revealUntilIndex takes
        // precedence inside FacetMenu when provided.
        showCards={stepIndex >= 1}
        revealUntilIndex={revealUntilIndex}
        header={C.header}
        footer={C.footer}
        footerKw={[...C.footerKw]}
        showFooter={showFooter}
      />

      {/* RIGHT — bridge-artifact canvas (default = file/LLM Wiki) */}
      <div
        data-testid="f2-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: 156,
          width: 660,
          bottom: 80,
        }}
      >
        <DetailCanvas
          activeFacet={effectiveFacet}
          defaultState={<BridgeDefaultState bright={canvasBright} />}
          states={{
            "what-it-is": <BridgeDefaultState bright />,
            "how-it-works": <HowItWorksState />,
            "the-types": <RAGTypesCarousel autoCycle />,
            "when-to-reach": <WhenToReachState />,
            example: <ExampleState />,
          }}
        />
      </div>
    </>
  );
}

// ───────────────────── default / WHAT IT IS state ─────────────────────
//
// Bridge-artifact in file/.md state (LLM Wiki canonical). Dim at 0.5
// opacity until step ≥ 5 (spec §5.6 — canvas brightens at step 5).

function BridgeDefaultState({ bright }: { bright: boolean }) {
  return (
    <div
      data-testid="f2-default-canvas"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: bright ? 1 : 0.5,
        transition: "opacity 700ms var(--ease)",
      }}
    >
      <BridgeArtifact mode="file" size={580} />
    </div>
  );
}

// ───────────────────── HOW IT WORKS state ─────────────────────
//
// 3-step pipe diagram: Retrieval (search bar + top-K docs) →
// Augmentation (docs into context box) → Generation (Claude composes
// answer). Horizontal flow with arrows.

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
        padding: "8px 12px",
        gap: 18,
      }}
    >
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
          HOW IT WORKS
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--copper-200)",
            lineHeight: 1.4,
          }}
        >
          Retrieval &rarr; Augmentation &rarr; Generation
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: 10,
          flex: 1,
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

// ───────────────────── WHEN TO REACH state ─────────────────────
//
// 4-row × 3-column matrix. Columns: Scenario / RAG fits / Long-context
// fits / Either. Cells show ✓ or — in copper.

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
        padding: "8px 12px",
        gap: 14,
      }}
    >
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
          WHEN TO REACH
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--copper-200)",
            lineHeight: 1.4,
          }}
        >
          RAG vs long-context &mdash; pick the right tool.
        </span>
      </div>

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
        {/* Body rows */}
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
// "answer from the company handbook" — query bar at top, 2-3 retrieved
// snippets in middle, Claude's grounded answer at bottom with small
// citation links ([1], [2]).

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

function ExampleState() {
  return (
    <div
      data-testid="f2-example"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
        gap: 12,
      }}
    >
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
          EXAMPLE &middot; company handbook
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
          answer from the company handbook
        </span>
      </div>

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
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--neutral-100)",
            lineHeight: 1.4,
          }}
        >
          &ldquo;{EXAMPLE_QUERY}&rdquo;
        </span>
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
        {EXAMPLE_SNIPPETS.map((s) => (
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
            <span
              style={{
                fontFamily: "var(--serif)",
                fontSize: 12.5,
                color: "var(--neutral-100)",
                lineHeight: 1.45,
              }}
            >
              &ldquo;{s.quote}&rdquo;
            </span>
          </div>
        ))}
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
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: 13.5,
            color: "var(--neutral-50)",
            lineHeight: 1.5,
          }}
        >
          {EXAMPLE_ANSWER}
        </span>
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const f2Slide: SlideDef = {
  steps: 7,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F2RagGroundTruth />,
};
