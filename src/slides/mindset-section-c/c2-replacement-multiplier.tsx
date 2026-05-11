// C.2 — REPLACEMENT → MULTIPLIER
//
// Diagrammatic mid-section slide. Sits between the photographic bookends C.1
// and C.5, and is the empathetic "permission slip" of Section C. The
// recognition line at the top is the audience-respect linchpin of the deck:
//
//     "Most of us start with AI the way we started with Google —
//      type, read, move on. *That's a reasonable place to start.*"
//
// The word `reasonable` is doing ALL the work. We acknowledge a common
// starting pattern WITHOUT diagnosing the audience as stuck. The italic
// copper-300 clause at the end is what makes it land — keep verbatim.
//
// Background — plain dark + dot-grid (NOT photo). C.2 + C.3 are the
// diagrammatic interior of Section C.
//
// Layout —
//   TOP:    Recognition line, centered (~24px italic Source Serif).
//   MIDDLE: Fear panel ⨯ → arrow → Leverage panel (horizontal flow).
//   BOTTOM: 3 MindsetCards (Multiplier · Co-Pilot · Force-Multiplier).
//
// Motion (5 steps, canonicalPose: 4) —
//   mount:               FIG + recognition line fade in (400ms)
//   stepIndex 0:         Fear panel TEXT reveals only — "AI will replace me."
//                        (no strikethrough yet; the line just appears).
//   stepIndex 1:         Strikethrough draws across the fear panel — copper-700,
//                        500ms easeOutExpo. SLOWER than C.1's 400ms — emotional
//                        pause; the presenter should be able to dwell on it.
//   stepIndex 2:         Copper arrow pathLength 0 → 1 (400ms).
//   stepIndex 3:         Leverage panel reveals — line 1 ("Someone using AI
//                        will."), then line 2 italic ("So I learn to use it.")
//                        with a brief stagger.
//   stepIndex 4 (canon): 3 MindsetCards fade in from below with 120ms stagger;
//                        faint copper glow settles on each.
//
// Hover (presenter detail layer) — Cards lift 2px on hover; the copper-700
// left edge brightens to copper-400. CSS-only.
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { StrikethroughAnimator } from "@/components/StrikethroughAnimator";
import { CopperArrow } from "./components/CopperArrow";
import { MindsetCard } from "./components/MindsetCard";
import { c2Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function C2ReplacementMultiplier() {
  const { stepIndex } = useDeck();

  // FIG + recognition line fade in on mount (no Space needed).
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates. stepIndex 0 = first Space press (fear text reveals).
  const fearTextOn = stepIndex >= 0;
  const strikeOn = stepIndex >= 1;
  const arrowOn = stepIndex >= 2;
  const leverageOn = stepIndex >= 3;
  const cardsOn = stepIndex >= 4;

  const liftStyle = (on: boolean, lift = 12, duration = 500): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${lift}px)`,
    transition: `opacity ${duration}ms var(--ease), transform ${duration}ms var(--ease)`,
    willChange: "opacity, transform",
  });

  return (
    <div
      data-testid="slide-c2"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background — plain neutral-950 + subtle dot-grid (matches B.3 / C.3). */}
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

      <FigLabel section="C" num={2} label={C.figLabel} />

      {/* ───────────── TOP: Recognition line (centered) ───────────── */}
      <div
        data-testid="c2-recognition"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 116,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
          ...liftStyle(loaded, 8, 600),
        }}
      >
        <RecognitionLineInline
          text={C.recognition}
          italicClause={C.recognitionItalicClause}
        />
      </div>

      {/* ───────────── MIDDLE: Fear ⨯ → Leverage ───────────── */}
      <div
        data-testid="c2-flow"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          zIndex: 5,
        }}
      >
        {/* FEAR panel */}
        <div
          data-testid="c2-fear"
          style={{
            ...liftStyle(fearTextOn, 6, 500),
            fontFamily: "var(--display)",
            fontWeight: 400,
            fontSize: 44,
            color: "var(--neutral-400)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}
        >
          <StrikethroughAnimator
            active={strikeOn}
            duration={500}
            thickness={4}
          >
            {C.fearPanel}
          </StrikethroughAnimator>
        </div>

        {/* ARROW */}
        <div
          data-testid="c2-arrow"
          style={{
            opacity: arrowOn ? 1 : 0,
            transition: "opacity 220ms var(--ease)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CopperArrow direction="right" on={arrowOn} length={64} duration={400} />
        </div>

        {/* LEVERAGE panel */}
        <div
          data-testid="c2-leverage"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            minWidth: 0,
          }}
        >
          <div
            style={{
              ...liftStyle(leverageOn, 6, 600),
              fontFamily: "var(--display)",
              fontWeight: 400,
              fontSize: 44,
              color: "var(--neutral-100)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            {C.leveragePanel}
          </div>
          <div
            style={{
              ...liftStyle(leverageOn, 6, 600),
              transitionDelay: leverageOn ? "200ms" : "0ms",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 32,
              color: "var(--copper-400)",
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            {C.leverageSub}
          </div>
        </div>
      </div>

      {/* ───────────── BOTTOM: 3 MindsetCards ───────────── */}
      <div
        data-testid="c2-cards"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 72,
          display: "flex",
          justifyContent: "center",
          gap: 28,
          zIndex: 5,
        }}
      >
        {C.cards.map((card, i) => {
          const style: CSSProperties = {
            opacity: cardsOn ? 1 : 0,
            transform: cardsOn ? "translateY(0)" : "translateY(14px)",
            transition:
              "opacity 600ms var(--ease), transform 600ms var(--ease)",
            transitionDelay: cardsOn ? `${i * 120}ms` : "0ms",
            flex: "0 1 320px",
          };
          return (
            <div
              key={card.title}
              data-testid={`c2-card-${i}`}
              className="c2-card-hover"
              style={style}
            >
              <MindsetCard title={card.title} body={card.body} />
            </div>
          );
        })}
      </div>

      {/* Scoped CSS — hover lift + copper edge brighten. CSS-only so the
          behavior survives StrictMode re-renders and stays cheap. */}
      <style>{`
        [data-testid="slide-c2"] .c2-card-hover [data-testid="mindset-card"] {
          transition:
            transform 200ms var(--ease),
            border-color 200ms var(--ease),
            background 200ms var(--ease);
        }
        [data-testid="slide-c2"] .c2-card-hover:hover [data-testid="mindset-card"] {
          transform: translateY(-2px);
          border-left-color: var(--copper-400);
          background: rgba(20,12,8,0.55);
        }
      `}</style>
    </div>
  );
}

// ───────────────────── helpers ─────────────────────

// Inline recognition line — centered, italic Source Serif, with the final
// `That's a reasonable place to start.` clause in italic copper-300. This is
// the audience-respect linchpin of the deck — render the clause verbatim.
function RecognitionLineInline({
  text,
  italicClause,
}: {
  text: string;
  italicClause: string;
}): ReactNode {
  const idx = text.indexOf(italicClause);
  const head = idx >= 0 ? text.slice(0, idx) : text;
  const tail = idx >= 0 ? italicClause : "";
  return (
    <p
      data-testid="c2-recognition-line"
      style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        fontSize: 24,
        color: "var(--neutral-300)",
        margin: 0,
        lineHeight: 1.4,
        maxWidth: 980,
        textAlign: "center",
        fontWeight: 400,
      }}
    >
      {head}
      {tail && (
        <span
          data-testid="c2-recognition-clause"
          style={{ color: "var(--copper-300)", fontStyle: "italic" }}
        >
          {tail}
        </span>
      )}
    </p>
  );
}

// ───────────────────── slide def ─────────────────────

export const c2Slide: SlideDef = {
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C2ReplacementMultiplier />,
};
