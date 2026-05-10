import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { StrategyRings } from "./components/StrategyRings";
import { e7Content as C } from "./content";

export function E7ContextStrategies() {
  const { stepIndex } = useDeck();
  // Spec §4.7: Space 1 WRITE; Space 2 SELECT; Space 3 COMPRESS; Space 4 ISOLATE; Space 5 footer caption + ambient ramp-up.
  const revealedThrough =
    stepIndex >= 3 ? 4 : stepIndex >= 2 ? 3 : stepIndex >= 1 ? 2 : 1;
  const showFooter = stepIndex >= 4;
  const ambientOn = stepIndex >= 4;

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="E" num={7} label="STRATEGIES" />

      <div className="relative z-10 mx-auto flex h-full max-w-[92vw] flex-col items-stretch justify-center gap-12 px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.1 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        <StrategyRings
          rings={C.rings.map(({ popoverLines: _p, ...rest }) => rest)}
          revealedThrough={revealedThrough}
          ambientOn={ambientOn}
        />

        <motion.p
          className="text-center font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showFooter ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight(C.footerCaption, C.footerCaptionKeywords)}
        </motion.p>
      </div>
    </div>
  );
}

export const e7Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  section: "E",
  render: () => <E7ContextStrategies />,
};
