// J.1 — THE RECIPE (Section J opener)
//
// Two-beat structure, anchored bottom-left to mirror I.4's typographic
// handoff but without the copper rule (only two lines — a separator would
// be visual noise). Hero photo is `j1-notebook-study.jpg` with HeroPhoto's
// bottom-left vignette protecting the text area.
//
// 2 steps:
//   0 — beat 1 reveals (display headline: humility setup).
//   1 — beat 2 reveals (italic copper-200 punchline: earned lessons + audience benefit).
//
// Reveal is the shared CSS-only primitive from Section E. No Framer Motion.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HeroPhoto } from "@/components/HeroPhoto";
import { highlight } from "@/components/highlight";
import { Reveal } from "../foundation-core-section-e/components/Reveal";
import { j1Content as C } from "./content";

export function J1HumilityIntro() {
  const { stepIndex } = useDeck();
  const showLine1 = stepIndex >= 0;
  const showLine2 = stepIndex >= 1;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <HeroPhoto src="/heroes/j1-notebook-study.jpg" alt="" vignetteSide="bottom-left" />
      <FigLabel section="J" num={1} label="THE RECIPE" />

      <div
        data-testid="j1-beats"
        style={{
          position: "absolute",
          left: 48,
          bottom: 110,
          maxWidth: 880,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 20,
        }}
      >
        <Reveal on={showLine1} delay={0} data-testid="j1-line1">
          <p
            style={{
              fontFamily: "var(--display)",
              fontSize: 56,
              color: "var(--neutral-50)",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {highlight(C.line1.text, [...C.line1.keywords])}
          </p>
        </Reveal>

        <Reveal on={showLine2} delay={150} data-testid="j1-line2">
          <p
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 36,
              color: "var(--copper-200)",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {highlight(C.line2.text, [...C.line2.keywords])}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export const j1Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "J",
  render: () => <J1HumilityIntro />,
};
