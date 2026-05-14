// H.1 — THE TRAP
//
// Spec §H.1 (docs/specs/2026-05-12-slides-application-H-discipline.md, lines 56–116).
//
// 4×2 grid of 8 pitfall cards rendered via <TrapWall>. Hover lights an
// individual card (presenter-controlled detail layer); no composition-level
// auto-flare.
//
// Step structure:
//   0 (entry) — 8 pitfall cards stagger in (120 + i*80ms)
//   1         — closing line reveals beneath grid
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "../foundation-core-section-e/components/Reveal";
import { TrapWall } from "./components/TrapWall";
import { h1Content as C } from "./content";

export function H1PitfallWall() {
  const { stepIndex } = useDeck();

  return (
    <div data-testid="h1-root" style={{ position: "absolute", inset: 0 }}>
      {/* FigLabel — auto-positioned by component (top-left) */}
      <FigLabel section="H" num={1} label={C.figLabel} />

      {/* Headline — uses shared .slide-headline-row (top:80px) */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      {/* Card grid — interactive region, no advance on click.
          Layout mirrors G6: top 148, bottom 112 to clear the footer at 56. */}
      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 148,
          bottom: 112,
        }}
      >
        <TrapWall pitfalls={C.cards} />
      </div>

      {/* Closing line — bottom strip, step 1 reveal.
          NOTE: position: absolute lives on Reveal itself, not on a child —
          .fade's transform creates a containing block, so an absolutely-
          positioned child would resolve to Reveal (zero height) instead of
          .stage-wrap and render above the canvas. Mirrors G6. */}
      <Reveal
        on={stepIndex >= 1}
        delay={200}
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 56,
          fontFamily: "var(--display)",
          fontStyle: "italic",
          fontSize: 22,
          color: "var(--copper-200)",
          lineHeight: 1.25,
          textAlign: "center",
          margin: 0,
        }}
      >
        {highlight(C.closingLine, [...C.closingLineKw])}
      </Reveal>
    </div>
  );
}

export const h1Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "H",
  render: () => <H1PitfallWall />,
};
