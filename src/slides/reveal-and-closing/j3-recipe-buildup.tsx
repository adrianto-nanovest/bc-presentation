import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { RecipeStepCard } from "./components/RecipeStepCard";
import { StepConnector } from "./components/StepConnector";
import { highlight } from "@/components/highlight";
import { j3Content as C } from "./content";

export function J3RecipeBuildup() {
  const { stepIndex } = useDeck();
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
      <FigLabel section="J" num={3} label="BUILDING YOURSELF UP" />
      <div className="relative z-10 mx-auto flex h-full max-w-[80%] flex-col items-center justify-center gap-8 py-20">
        <h2
          className="font-display text-neutral-50"
          style={{ fontSize: "2.88rem", lineHeight: 1.15 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h2>
        {C.cards.map((card, i) => {
          const cardRevealed = stepIndex >= i + 1;
          const connectorRevealed = stepIndex >= i + 1 && i < C.cards.length - 1;
          return (
            <div key={card.num} className="flex w-full flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: cardRevealed ? 1 : 0,
                  y: cardRevealed ? 0 : 8,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <RecipeStepCard
                  num={card.num}
                  headline={highlight(card.headline, card.headlineKeywords)}
                  subText={card.sub}
                  hoverExample={card.hover}
                />
              </motion.div>
              {i < C.cards.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: connectorRevealed ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="my-2"
                >
                  <StepConnector direction="down" />
                </motion.div>
              )}
            </div>
          );
        })}
        <p
          className="font-serif italic text-copper-300"
          style={{ fontSize: "1rem" }}
        >
          {highlight(C.caption, ["Hover any step"])}
        </p>
      </div>
    </div>
  );
}

export const j3Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  section: "J",
  render: () => <J3RecipeBuildup />,
};
