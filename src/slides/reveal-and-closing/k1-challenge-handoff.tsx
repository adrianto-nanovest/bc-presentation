import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { StepReveal } from "@/motion/StepReveal";
import { FigLabel } from "@/components/FigLabel";
import { HeroPhoto } from "@/components/HeroPhoto";
import { PulseGlow } from "@/components/PulseGlow";
import { highlight } from "@/components/highlight";
import { k1Content as C } from "./content";

export function K1ChallengeHandoff() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <HeroPhoto src="/heroes/k1-morning-workspace.jpg" alt="" vignetteSide="bottom-left" />
      <FigLabel section="K" num={1} label="NOW FEEL IT" />
      <div className="absolute bottom-24 left-24 z-20 flex max-w-[68vw] flex-col gap-10">
        <StepReveal>
          {/* Space 1 — headline (two beats) */}
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(3.5rem, 5.5vw, 5.5rem)", lineHeight: 1.1 }}
          >
            {highlight(`${C.headline[0]} ${C.headline[1]}`, C.headlineKeywords)}
          </h1>
          {/* Space 2 — three body lines (revealed together as one step group) */}
          <div className="flex flex-col gap-6">
            <p
              className="font-serif text-neutral-50"
              style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.75rem)", lineHeight: 1.5 }}
            >
              {C.body1}
            </p>
            <p
              className="font-serif text-neutral-50"
              style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.75rem)", lineHeight: 1.5 }}
            >
              {highlight(C.body2.text, C.body2.keywords)}
            </p>
            <p
              className="font-serif italic text-neutral-50"
              style={{ fontSize: "clamp(1.5rem, 2vw, 2.25rem)", lineHeight: 1.4 }}
            >
              {C.body3}
            </p>
          </div>
          {/* Space 3 — copper rule + tagline (with PulseGlow) */}
          <div className="flex flex-col gap-6">
            <motion.hr
              className="w-[30%] border-0 border-t border-copper-700"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: "left center" }}
            />
            <PulseGlow periodSeconds={4.5}>
              <p
                className="font-serif italic text-neutral-50"
                style={{ fontSize: "clamp(1.6rem, 2.2vw, 2.5rem)", lineHeight: 1.4 }}
              >
                {highlight(C.tagline, C.taglineKeywords)}
              </p>
            </PulseGlow>
          </div>
        </StepReveal>
      </div>
    </div>
  );
}

export const k1Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <K1ChallengeHandoff />,
};
