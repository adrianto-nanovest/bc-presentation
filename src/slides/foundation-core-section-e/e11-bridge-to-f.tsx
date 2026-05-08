import type { SlideDef } from "@/deck/types";
import { StepReveal } from "@/motion/StepReveal";
import { FigLabel } from "@/components/FigLabel";
import { HeroPhoto } from "@/components/HeroPhoto";
import { highlight } from "@/components/highlight";
import { e11Content as C } from "./content";

export function E11BridgeToF() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <HeroPhoto src="/heroes/e11-bridge.jpg" alt="" vignetteSide="right" />
      <FigLabel section="E" num={11} label="BUILT" />
      <div className="absolute right-24 top-24 z-20 flex max-w-[55vw] flex-col items-end gap-8 text-right">
        <StepReveal>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(3rem, 5vw, 5rem)", lineHeight: 1.18 }}
          >
            {highlight(C.beat1.text, C.beat1.keywords)}
          </p>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.18 }}
          >
            {highlight(C.beat2.text, C.beat2.keywords)}
          </p>
        </StepReveal>
      </div>
    </div>
  );
}

export const e11Slide: SlideDef = {
  steps: 2,
  animationMode: "step-reveal",
  canonicalPose: 1,
  surface: "dark",
  render: () => <E11BridgeToF />,
};
