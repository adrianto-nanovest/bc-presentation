// A.1 — WHAT YOU'VE ALREADY SEEN
//
// Section A opener. Acknowledges the capability classes Session 1 covered
// (without redescribing individual winners' work — audience-respect rule)
// and poses 4 open questions that point into later sections. Functions as
// Hook 1 AND a curiosity-driven table-of-contents.
//
// Layout —
//   • TOP STRIP: FIG label (top-left, owned by FigLabel.css), horizontal row
//     of 5 capability chips just below.
//   • MIDDLE: single italic bridging line, centered.
//   • BOTTOM TWO-THIRDS: vertical stack of 4 questions, generous spacing.
//   • Background: plain neutral-950 + subtle dot-grid texture.
//
// Motion (4 step-reveals + load animation) —
//   step 0 (load): FIG label + capability chips (left-to-right stagger) +
//     bridge line all reveal as part of the load animation (no Space needed).
//   step 0 (= same step): Q1 reveals as Space is pressed the first time.
//   step 1: Q2 reveals.
//   step 2: Q3 reveals.
//   step 3: Q4 reveals + faint copper underline pulse on `questions` in the
//     bridge line (4s ambient loop).
//
// Step indexing note —
//   The spec describes 5 logical reveal beats (load + 4 questions), but the
//   deck's stepCounts is indexed from 0, and the load animation is
//   load-on-mount (no Space needed). So steps:4 with canonicalPose:3 maps to:
//     stepIndex 0 → Q1 visible
//     stepIndex 1 → Q1+Q2 visible
//     stepIndex 2 → Q1+Q2+Q3 visible
//     stepIndex 3 → all 4 visible + pulse on `questions`
//   This matches the registered `steps:4, canonicalPose:3` shape.
//
// Hover (presenter-controlled detail layer) —
//   Hover any question → "→ Section X" chip slides in (~150ms). Mouse-leave
//   reverses. CSS-only via QuestionRow.
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { AmbientPulse } from "@/components/AmbientPulse";
import { CapabilityChip } from "./components/CapabilityChip";
import { QuestionRow } from "./components/QuestionRow";
import { a1Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function A1WhatYouveSeen() {
  const { stepIndex } = useDeck();

  // Load animation state — staged via setTimeout so the chip row and the
  // bridge line settle BEFORE the first Space-driven question reveal.
  // Stage gates: 0 → nothing; 1 → chips; 2 → bridge line.
  const [loadStage, setLoadStage] = useState(0);
  useEffect(() => {
    const t1 = window.setTimeout(() => setLoadStage(1), 200); // chips begin
    const t2 = window.setTimeout(() => setLoadStage(2), 1000); // bridge line
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const chipsOn = loadStage >= 1;
  const bridgeOn = loadStage >= 2;

  // Reusable lift+fade helper for question rows.
  const liftStyle = (on: boolean): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 400ms var(--ease), transform 400ms var(--ease)",
    willChange: "opacity, transform",
  });

  return (
    <div data-testid="slide-a1" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Background — plain neutral-950 + subtle dot-grid texture. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--neutral-950)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 1,
        }}
      />

      <FigLabel section="A" num={1} label={C.figLabel} />

      {/* Capability chip strip — sits just below FigLabel's reserved band. */}
      <div
        data-testid="a1-chip-strip"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 88,
          display: "flex",
          alignItems: "center",
          gap: 28,
          zIndex: 10,
          flexWrap: "nowrap",
        }}
      >
        {C.capabilityChips.map((label, i) => {
          // Left-to-right stagger: 80ms per chip after `chipsOn` triggers.
          const onAt = chipsOn;
          const style: CSSProperties = {
            opacity: onAt ? 1 : 0,
            transform: onAt ? "translateX(0)" : "translateX(-8px)",
            transition:
              "opacity 350ms var(--ease), transform 350ms var(--ease)",
            transitionDelay: onAt ? `${i * 80}ms` : "0ms",
          };
          return (
            <div key={label} style={style}>
              <CapabilityChip label={label} />
            </div>
          );
        })}
      </div>

      {/* Bridge line — centered italic, sits between the chip strip and
          the question stack. `questions` keyword is wrapped in
          AmbientPulse once the canonical pose (step 3) is reached. */}
      <div
        data-testid="a1-bridge-line"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 168,
          textAlign: "center",
          opacity: bridgeOn ? 1 : 0,
          transform: bridgeOn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 500ms var(--ease), transform 500ms var(--ease)",
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 32,
            color: "var(--neutral-200)",
            margin: 0,
            lineHeight: 1.3,
            fontWeight: 400,
          }}
        >
          {renderBridgeLine(C.bridgeLine, stepIndex >= 3)}
        </p>
      </div>

      {/* Question stack — bottom two-thirds, generous spacing. */}
      <div
        data-testid="a1-question-stack"
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 280,
          bottom: 56,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          zIndex: 10,
        }}
      >
        {C.questions.map((q, i) => {
          const on = stepIndex >= i;
          return (
            <div
              key={q.pointer}
              data-testid={`a1-question-${i + 1}`}
              style={liftStyle(on)}
            >
              <QuestionRow pointer={q.pointer}>
                {highlight(q.text, q.kw)}
              </QuestionRow>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────── helpers ─────────────────────

// Render the bridge line with `questions` as a copper-400 italic accent.
// When `pulse` is true (final reveal), wrap it in AmbientPulse for the 4s
// loop described in the sub-spec.
function renderBridgeLine(text: string, pulse: boolean) {
  // Split on the literal substring "questions" so we can replace it with
  // a styled span. (We don't reuse `highlight` here because that emits
  // KeywordHighlight, which uses the default italic copper — we want to
  // optionally wrap it in AmbientPulse on the canonical step.)
  const parts = text.split("questions");
  if (parts.length === 1) return text;
  const accent = (
    <em
      style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        color: "var(--copper-400)",
        fontWeight: 400,
        textDecoration: pulse ? "underline" : "none",
        textDecorationColor: pulse ? "var(--copper-500)" : "transparent",
        textUnderlineOffset: "4px",
        textDecorationThickness: "1px",
        transition: "text-decoration-color 400ms var(--ease)",
      }}
    >
      questions
    </em>
  );
  return (
    <>
      {parts[0]}
      {pulse ? (
        <AmbientPulse periodSeconds={4} keyword="questions">
          {accent}
        </AmbientPulse>
      ) : (
        accent
      )}
      {parts[1]}
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const a1Slide: SlideDef = {
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  section: "A",
  render: () => <A1WhatYouveSeen />,
};
