import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { RecipeStepCard } from "./components/RecipeStepCard";
import { highlight } from "@/components/highlight";
import { j2Content as C } from "./content";

export function J2FivePrinciples() {
  const { stepIndex } = useDeck();
  const revealed = stepIndex >= 1;
  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      {/* Dot-grid texture per memory rule (feedback_slide_visual_conventions.md). */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="J" num={2} label="FIVE PRINCIPLES" />
      <div className="relative z-10 mx-auto flex h-full max-w-[92vw] flex-col items-center justify-center gap-12 px-16 py-24">
        <h2
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: 1.15 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h2>
        <div
          data-cards-revealed={String(revealed)}
          className="grid w-full grid-cols-5 gap-6"
        >
          {C.cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: revealed ? 1 : 0,
                y: revealed ? 0 : 8,
              }}
              transition={{
                duration: 0.25,
                delay: revealed ? i * 0.1 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <RecipeStepCard
                num={card.num}
                headline={highlight(card.headline, card.headlineKeywords)}
                subText={card.sub}
                hoverExample={card.hover}
              />
            </motion.div>
          ))}
        </div>
        <p
          className="font-serif italic text-copper-300"
          style={{ fontSize: "clamp(1rem, 1.2vw, 1.4rem)" }}
        >
          {highlight(C.caption, ["Hover any card"])}
        </p>
      </div>
    </div>
  );
}

export const j2Slide: SlideDef = {
  steps: 2,
  animationMode: "step-reveal",
  canonicalPose: 1,
  surface: "dark",
  section: "J",
  render: () => <J2FivePrinciples />,
};
