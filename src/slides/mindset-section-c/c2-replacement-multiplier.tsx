// C.2 — REPLACEMENT → MULTIPLIER (canonical dark surface, B3-tile cards)
//
// Section C's empathetic "permission slip" slide. Per spec §3.2 the slide now:
//
//   1. Adopts the canonical header pattern — FigLabel + .slide-headline.small
//      "From Fear to Leverage." at top-left (replaces the prior FIG-only
//      header).
//   2. Moves the recognition line from a mount-driven fade to a step-0 reveal
//      that fires alongside the FIG + slide title. Visually it still reads as
//      ambient, but it's now tied to the canonical 5-step rhythm.
//   3. Replaces the deprecated MindsetCard with B3ParamTile from Section B.
//      Each tile holds a 75px looping SVG slot (LeverageAnim / VelocityAnim
//      / JudgmentAnim) plus three mono-→ + serif bullets.
//
// Layout (1280×720 stage, absolute coordinates) —
//   FIG + slide title : top:36 / top:80, left:48 (canonical header).
//   Recognition line  : y≈156, centered. Three visual lines, Source Serif
//                       italic 22px neutral-300; final clause copper-300.
//   Fear → Leverage   : y≈300–380, three-column horizontal flow.
//   Three B3 tiles    : y≈500–705, centered, three columns.
//
// Motion (5 steps, canonicalPose: 4) —
//   stepIndex 0 (load):   FIG + slide title + recognition line fade in
//                         together (400ms).
//   stepIndex 1:          Fear panel reveals — "AI will replace me."
//                         (strikethrough NOT yet active).
//   stepIndex 2:          Strikethrough draws across the fear panel —
//                         copper-700, 500ms easeOutExpo. Emotional beat —
//                         slower than C.1's 400ms to let the audience dwell.
//   stepIndex 3:          Copper arrow pathLength 0 → 1, then leverage panel
//                         two-line reveal ("Someone using AI will." then
//                         italic "So I learn to use it." 250ms after).
//   stepIndex 4 (canon):  Three B3 tiles fade-in-from-below with 120ms
//                         stagger; SVG card animations begin looping
//                         immediately on mount of each tile.
import type { ComponentType, CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { StrikethroughAnimator } from "@/components/StrikethroughAnimator";
import { CopperArrow } from "./components/CopperArrow";
import { B3ParamTile } from "@/slides/landscape-section-b/components/B3ParamTile";
import {
  LeverageAnim,
  VelocityAnim,
  JudgmentAnim,
} from "./components/C2CardAnims";
import { c2Content as C } from "./content";

// ───────────────────── slide ─────────────────────

// Map content.ts `animKey` → matching SVG animation component. Centralised so
// the iteration over `c2Content.cards` stays declarative.
const animByKey: Record<string, ComponentType> = {
  leverage: LeverageAnim,
  velocity: VelocityAnim,
  judgment: JudgmentAnim,
};

export function C2ReplacementMultiplier() {
  const { stepIndex } = useDeck();

  // Step gates. stepIndex 0 = load pose (FIG + title + recognition line).
  // No mount-driven latches: the recognition line now belongs to step 0,
  // not "fades in 80ms after mount" — matches the canonical 5-step rhythm.
  const loaded = stepIndex >= 0;
  const fearOn = stepIndex >= 1;
  const strikeOn = stepIndex >= 2;
  const arrowOn = stepIndex >= 3;
  const leverageOn = stepIndex >= 3;
  const cardsOn = stepIndex >= 4;

  // Shared reveal helper. easeOutExpo curve comes from --ease.
  const liftStyle = (
    on: boolean,
    lift = 12,
    duration = 500,
    delay = 0,
  ): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${lift}px)`,
    transition: `opacity ${duration}ms var(--ease) ${delay}ms, transform ${duration}ms var(--ease) ${delay}ms`,
    willChange: "opacity, transform",
  });

  // FIG + slide title fade — opacity only, no lift. Mirrors C.1.
  const headerFade: CSSProperties = {
    opacity: loaded ? 1 : 0,
    transition: "opacity 400ms var(--ease)",
    willChange: "opacity",
  };

  return (
    <div
      data-testid="slide-c2"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background — neutral-950 base + subtle 24px dot grid. Matches B.3
          / C.1 / C.3 / C.4 / C.5 — the standard dark surface used everywhere
          in Section C except the Bridge. */}
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

      {/* Canonical FIG label — `<FigLabel>` defaults to top:36 left:48. */}
      <div style={headerFade}>
        <FigLabel section="C" num={2} label={C.figLabel} />
      </div>

      {/* Canonical slide title — `.slide-headline.small` at top:80 left:48. */}
      <div className="slide-headline-row" style={headerFade}>
        <h1 className="slide-headline small">{C.headline}</h1>
      </div>

      {/* ───────────── Recognition line (y≈156, centered) ─────────────
          Three visual lines, Source Serif italic 22px neutral-300. Final
          clause "That's a reasonable place to start." in copper-300, still
          italic. Fades in on step 0 alongside FIG + slide title. */}
      <div
        data-testid="c2-recognition"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
          ...liftStyle(loaded, 6, 400),
        }}
      >
        <RecognitionLineInline italicClause={C.recognitionItalicClause} />
      </div>

      {/* ───────────── MIDDLE: Fear → Arrow → Leverage (y≈300–380) ─────
          Three-column horizontal flow. Fear panel left, copper arrow middle,
          leverage two-line stack right. Centered on the slide. */}
      <div
        data-testid="c2-flow"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 300,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          zIndex: 5,
        }}
      >
        {/* FEAR panel — "AI will replace me." Source Serif italic 28px,
            neutral-100. Reveals on step 1; strikethrough draws on step 2. */}
        <div
          data-testid="c2-fear"
          style={{
            ...liftStyle(fearOn, 6, 400),
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 28,
            color: "var(--neutral-100)",
            lineHeight: 1.15,
            fontWeight: 400,
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

        {/* ARROW — copper-400, pathLength 0 → 1 on step 3 (500ms). */}
        <div
          data-testid="c2-arrow"
          style={{
            display: "flex",
            alignItems: "center",
            opacity: arrowOn ? 1 : 0,
            transition: "opacity 220ms var(--ease)",
          }}
        >
          <CopperArrow
            direction="right"
            on={arrowOn}
            length={64}
            duration={500}
          />
        </div>

        {/* LEVERAGE panel — two-line stack. Line 1 Source Serif 24px
            neutral-100; line 2 Source Serif italic 22px copper-300. Line 2
            fades in 250ms after line 1. Both gates fire on step 3. */}
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
              ...liftStyle(leverageOn, 6, 400),
              fontFamily: "var(--serif)",
              fontSize: 24,
              color: "var(--neutral-100)",
              lineHeight: 1.15,
              fontWeight: 400,
            }}
          >
            {C.leveragePanel}
          </div>
          <div
            style={{
              ...liftStyle(leverageOn, 6, 400, 250),
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 22,
              color: "var(--copper-300)",
              lineHeight: 1.15,
              fontWeight: 400,
            }}
          >
            {C.leverageSub}
          </div>
        </div>
      </div>

      {/* ───────────── BOTTOM: 3 B3ParamTile cards (y≈500–705) ────────
          Three tiles, each 180×205, centered with 32px gap (3×180 + 2×32
          = 604 < 1280-96 envelope). Each tile loops its SVG animation on
          mount. Step 4 staggers the tiles 120ms apart fading in from
          below. */}
      <div
        data-testid="c2-cards"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 500,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          zIndex: 5,
        }}
      >
        {C.cards.map((card, i) => {
          const Anim = animByKey[card.animKey];
          const wrapStyle: CSSProperties = {
            opacity: cardsOn ? 1 : 0,
            transform: cardsOn ? "translateY(0)" : "translateY(14px)",
            transition:
              "opacity 600ms var(--ease), transform 600ms var(--ease)",
            transitionDelay: cardsOn ? `${i * 120}ms` : "0ms",
            willChange: "opacity, transform",
          };
          // Adapt content.ts bullet shape (`kw`) to B3ParamTile's prop shape
          // (`keywords`).
          const tileBullets = card.bullets.map((b) => ({
            text: b.text,
            keywords: b.kw,
          }));
          return (
            <div
              key={card.label}
              data-testid={`c2-card-${i}`}
              style={wrapStyle}
            >
              <B3ParamTile label={card.label} bullets={tileBullets}>
                {Anim ? <Anim /> : null}
              </B3ParamTile>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────── helpers ─────────────────────

// Inline recognition line — three visual lines, centered. Final clause
// "That's a reasonable place to start." renders in copper-300 italic; the
// other two lines are neutral-300 italic. Per spec §3.2 the body splits as:
//   "Most of us start with AI the way we started"
//   "with Google — type, read, move on."
//   "*That's a reasonable place to start.*"
function RecognitionLineInline({
  italicClause,
}: {
  italicClause: string;
}): ReactNode {
  return (
    <p
      data-testid="c2-recognition-line"
      style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        fontSize: 22,
        color: "var(--neutral-300)",
        margin: 0,
        lineHeight: 1.4,
        maxWidth: 980,
        textAlign: "center",
        fontWeight: 400,
      }}
    >
      <span style={{ display: "block" }}>
        Most of us start with AI the way we started
      </span>
      <span style={{ display: "block" }}>
        with Google — type, read, move on.
      </span>
      <span
        data-testid="c2-recognition-clause"
        style={{
          display: "block",
          color: "var(--copper-300)",
          fontStyle: "italic",
        }}
      >
        {italicClause}
      </span>
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
