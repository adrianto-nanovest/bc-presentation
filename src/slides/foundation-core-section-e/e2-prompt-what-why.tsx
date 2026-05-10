// E.2 — PROMPT · WHAT & WHY
//
// Ported from `claude-design-project/jsx/slides-a.jsx:317-418`.
// 6 steps:
//   0 — left pane reveals (definition, rule, 3 outcomes)
//   1 — Naive prompt streams in
//   2 — Naive result streams in
//   3 — Proper prompt streams in (with highlighted Role:/Task:/… labels)
//   4 — Proper result streams in
//   5 — Bridge text reveals at bottom of left pane
//
// Layout uses absolute coordinates against the 1280×720 stage. The reveal
// primitive is `<Reveal>` / `<CopperRule>` (CSS-class based, T10 pattern); we
// reach for Framer Motion only for true interactive motion (none here).
import type { CSSProperties, JSX, ReactNode } from "react";
import { Fragment } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Typewriter } from "./components/Typewriter";
import { Reveal, CopperRule } from "./components/Reveal";
import { e2Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function E2PromptWhatWhy() {
  const { stepIndex } = useDeck();

  return (
    <>
      <FigLabel section="E" num={2} label="LAYER 1 · PROMPT" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* LEFT: definition + outcomes + bridge */}
      <div
        data-testid="e2-left-pane"
        style={{
          position: "absolute",
          left: 48,
          top: 170,
          width: 460,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <Reveal on={stepIndex >= 0} data-testid="e2-definition">
          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: 22,
              color: "var(--neutral-100)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {highlight(C.definition, C.definitionKw)}
          </p>
        </Reveal>

        <CopperRule on={stepIndex >= 0} width="30%" delay={300} />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {C.outcomes.map((o, i) => (
            <Reveal
              key={i}
              on={stepIndex >= 0}
              delay={400 + i * 150}
              data-testid={`e2-outcome-${i}`}
            >
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 17,
                  color: "var(--neutral-300)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {highlight(o.text, o.kw)}
              </p>
            </Reveal>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <Reveal
          on={stepIndex >= 5}
          delay={150}
          data-testid="e2-bridge"
        >
          <div
            style={{
              borderLeft: "2px solid var(--copper-500)",
              paddingLeft: 14,
            }}
          >
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 16,
                color: "var(--copper-200)",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {highlight(C.bridge, C.bridgeKw)}
            </p>
          </div>
        </Reveal>
      </div>

      {/* RIGHT: Naive card + Proper card */}
      <div
        style={{
          position: "absolute",
          right: 48,
          top: 170,
          width: 680,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <NaiveCard stepIndex={stepIndex} />
        <ProperCard stepIndex={stepIndex} />
      </div>
    </>
  );
}

// ───────────────────── NaiveCard (steps 1–2) ─────────────────────

interface CardProps {
  stepIndex: number;
}

function NaiveCard({ stepIndex }: CardProps) {
  const showPrompt = stepIndex >= 1;
  const showResult = stepIndex >= 2;

  return (
    <Reveal
      on={showPrompt}
      className="card"
      data-testid="e2-naive-card"
      style={{ borderColor: "var(--copper-700)", flex: "0 0 auto" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            color: "var(--copper-400)",
            textTransform: "uppercase",
          }}
        >
          Naive
        </span>
      </div>

      <Typewriter
        play={showPrompt}
        text={C.naivePrompt}
        duration={400}
        caretStyle="block"
        caretWhen={stepIndex === 1}
        style={{
          fontFamily: "var(--mono)",
          fontSize: 14,
          color: "var(--neutral-100)",
          whiteSpace: "pre-wrap",
          margin: 0,
          lineHeight: 1.4,
        }}
      />

      <div
        data-testid="e2-naive-result-wrap"
        style={{
          height: showResult ? "auto" : 0,
          overflow: "hidden",
          transition: "opacity 0.5s var(--ease)",
          opacity: showResult ? 1 : 0,
          marginTop: showResult ? 10 : 0,
        }}
      >
        <Typewriter
          play={showResult}
          text={C.naiveResult}
          duration={900}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "var(--neutral-300)",
            fontStyle: "italic",
            whiteSpace: "pre-wrap",
            margin: 0,
            lineHeight: 1.5,
          }}
        />
      </div>
    </Reveal>
  );
}

// ───────────────────── ProperCard (steps 3–4) ─────────────────────

function ProperCard({ stepIndex }: CardProps) {
  const showPrompt = stepIndex >= 3;
  const showResult = stepIndex >= 4;

  return (
    <Reveal
      on={showPrompt}
      className="card active"
      data-testid="e2-proper-card"
      style={{ flex: "1 1 auto", overflow: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          Proper
        </span>
      </div>

      <Typewriter
        play={showPrompt}
        text={C.properPrompt}
        duration={1000}
        caretStyle="block"
        caretWhen={stepIndex === 3}
        render={(visible) => highlightLabels(visible, C.properLabels)}
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          color: "var(--neutral-100)",
          whiteSpace: "pre-wrap",
          margin: 0,
          lineHeight: 1.5,
        }}
      />

      <div
        data-testid="e2-proper-result-wrap"
        style={{
          height: showResult ? "auto" : 0,
          overflow: "hidden",
          transition: "opacity 0.5s var(--ease)",
          opacity: showResult ? 1 : 0,
          marginTop: showResult ? 10 : 0,
          borderTop: showResult ? "1px solid var(--copper-800)" : "none",
          paddingTop: showResult ? 10 : 0,
        }}
      >
        <Typewriter
          play={showResult}
          text={C.properResult}
          duration={1000}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--neutral-200)",
            whiteSpace: "pre-wrap",
            margin: 0,
            lineHeight: 1.5,
          }}
        />
      </div>
    </Reveal>
  );
}

// ───────────────────── highlightLabels (E.2 only) ─────────────────────
//
// Wraps any occurrence of the known structural labels (Role:, Task:, …) with
// a copper-300 span. Sub-helper: only E.2 uses this, so it lives inline here
// rather than being promoted to a shared component.
//
// This is the per-Typewriter `render` prop hook — it runs on each visible
// substring during streaming, so the labels light up as soon as the colon
// after each keyword has streamed in.
function highlightLabels(
  text: string,
  labels: readonly string[],
): ReactNode {
  // Sort longest-first so e.g. "Constraints:" wins before "Context:" if both
  // appear (avoids partial substring stomp). Mirrors `highlight()` strategy.
  const sorted = [...labels].sort((a, b) => b.length - a.length);
  let parts: (string | JSX.Element)[] = [text];

  sorted.forEach((label, idx) => {
    parts = parts.flatMap((p, i) => {
      if (typeof p !== "string" || !p.includes(label)) return [p];
      const split = p.split(label);
      const out: (string | JSX.Element)[] = [];
      const labelStyle: CSSProperties = {
        color: "var(--copper-300)",
        fontWeight: 600,
      };
      split.forEach((s, j) => {
        if (j > 0) {
          out.push(
            <span key={`${idx}-${i}-${j}`} style={labelStyle}>
              {label}
            </span>,
          );
        }
        if (s) out.push(s);
      });
      return out;
    });
  });

  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const e2Slide: SlideDef = {
  steps: 6,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E2PromptWhatWhy />,
};
