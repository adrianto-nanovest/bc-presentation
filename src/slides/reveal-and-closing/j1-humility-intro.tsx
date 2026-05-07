import type { SlideDef } from "@/deck/types";
import { StepReveal } from "@/motion/StepReveal";
import { FigLabel } from "@/components/FigLabel";
import { HeroPhoto } from "@/components/HeroPhoto";
import { highlight } from "@/components/highlight";
import { j1Content as C } from "./content";

export function J1HumilityIntro() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <HeroPhoto src="/heroes/j1-notebook-study.jpg" alt="" vignetteSide="bottom-left" />
      <FigLabel section="J" num={1} label="THE RECIPE" />
      <div className="absolute bottom-24 left-24 z-20 flex max-w-[60vw] flex-col gap-8">
        <StepReveal>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.18 }}
          >
            {highlight(C.line1.text, C.line1.keywords)}
          </p>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.18 }}
          >
            {highlight(C.line2.text, C.line2.keywords)}
          </p>
          <p
            className="font-serif italic text-neutral-50"
            style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.75rem)", lineHeight: 1.4 }}
          >
            {highlight(C.line3.text, C.line3.keywords)}
          </p>
        </StepReveal>
      </div>
    </div>
  );
}

export const j1Slide: SlideDef = {
  steps: 4,                   // initial pose + 3 reveals
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <J1HumilityIntro />,
};
