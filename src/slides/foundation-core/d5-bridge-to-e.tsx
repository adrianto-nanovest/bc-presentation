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
      <div className="absolute bottom-24 left-24 z-20 flex max-w-[60vw] flex-col gap-8">
        <StepReveal>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(3rem, 5vw, 5rem)", lineHeight: 1.18 }}
          >
            {highlight(C.beat1.text, C.beat1.keywords)}
          </p>
          <p
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.75rem, 4.5vw, 4.5rem)", lineHeight: 1.18 }}
          >
            {highlight(C.beat2.text, C.beat2.keywords)}
          </p>
          <p
            className="font-serif italic text-neutral-200"
            style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)", lineHeight: 1.4 }}
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
  render: () => <D5BridgeToE />,
};
