// H.1 — THE TRAP
//
// Spec §H.1 (docs/specs/2026-05-12-slides-application-H-discipline.md, lines 56–116).
//
// 4×2 grid of 8 pitfall cards rendered via <TrapWall>, which also runs the
// composition-level "warning pulse" loop (irregular flares, 1–2 cards at a
// time). Hover overrides the loop; loop runs continuously regardless of step.
//
// Step structure:
//   0 (entry) — 8 pitfall cards stagger in (120 + i*80ms), subhead present
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

      {/* Subhead — mono 11px copper-400, uppercase, sits beneath the headline */}
      <Reveal
        on={true}
        delay={120}
        style={{
          position: "absolute",
          top: 128,
          left: 48,
          right: 48,
          fontFamily: "var(--mono)",
          fontSize: 11,
          color: "var(--copper-400)",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
        }}
      >
        {C.subhead}
      </Reveal>

      {/* Card grid — interactive region, no advance on click */}
      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 80,
        }}
      >
        <TrapWall pitfalls={C.cards} />
      </div>

      {/* Closing line — bottom strip, step 1 reveal */}
      <Reveal
        on={stepIndex >= 1}
        delay={200}
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 30,
          minHeight: 30,
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
