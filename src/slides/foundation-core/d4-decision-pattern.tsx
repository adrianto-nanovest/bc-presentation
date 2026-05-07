import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { LadderRise } from "./components/LadderRise";
import { d4Content as C } from "./content";

export function D4DecisionPattern() {
  const { stepIndex } = useDeck();
  // stepIndex 0..4 maps directly to revealedSteps 1..5.
  const revealedSteps = stepIndex + 1;
  const showFooter = stepIndex >= 4;
  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="D" num={4} label="WHICH LEVEL, WHEN" />
      <h1
        className="absolute left-12 right-12 top-12 z-10 font-display text-neutral-50"
        style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.2 }}
      >
        {highlight(C.headline, C.headlineKeywords)}
      </h1>
      <div className="relative h-full w-full pt-32">
        <LadderRise content={C.ladder} revealedSteps={revealedSteps} />
      </div>
      <motion.p
        className="absolute bottom-8 right-12 z-10 font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(1.25rem, 1.6vw, 1.75rem)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showFooter ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {highlight(C.footerCaption, C.footerCaptionKeywords)}
      </motion.p>
    </div>
  );
}

export const d4Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <D4DecisionPattern />,
};
