import type { SlideDef } from "@/deck/types";
import { StepReveal } from "@/motion/StepReveal";
import { FigLabel } from "@/components/FigLabel";
import { HeroPhoto } from "@/components/HeroPhoto";
import { highlight } from "@/components/highlight";
import { d5Content as C } from "./content";

export function D5BridgeToE() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <HeroPhoto src="/heroes/d5-bridge.jpg" alt="" vignetteSide="bottom-left" />
      <FigLabel section="D" num={5} label="THE NEXT QUESTION" />
      <div className="absolute bottom-24 left-24 z-20 flex max-w-[60%] flex-col gap-8">
        <StepReveal>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "4rem", lineHeight: 1.18 }}
          >
            {highlight(C.beat1.text, C.beat1.keywords)}
          </p>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "3.6rem", lineHeight: 1.18 }}
          >
            {highlight(C.beat2.text, C.beat2.keywords)}
          </p>
          <p
            className="font-serif italic text-neutral-200"
            style={{ fontSize: "2rem", lineHeight: 1.4 }}
          >
            {highlight(C.bridge.text, C.bridge.keywords)}
          </p>
        </StepReveal>
      </div>
    </div>
  );
}

export const d5Slide: SlideDef = {
  steps: 3,
  animationMode: "step-reveal",
  canonicalPose: 2,
  surface: "dark",
  section: "D",
  render: () => <D5BridgeToE />,
};
