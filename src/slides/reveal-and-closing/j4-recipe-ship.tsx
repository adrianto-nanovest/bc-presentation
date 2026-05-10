import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { RecipeStepCard } from "./components/RecipeStepCard";
import { StepConnector } from "./components/StepConnector";
import { highlight } from "@/components/highlight";
import { j4Content as C } from "./content";

export function J4RecipeShip() {
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
      <FigLabel section="J" num={4} label="BUILDING SOMETHING THAT SHIPS" />
      <div className="relative z-10 mx-auto flex h-full max-w-[92%] flex-col items-center justify-center gap-10 px-12 py-20">
        <h2
          className="font-display text-neutral-50"
          style={{ fontSize: "2.88rem", lineHeight: 1.15 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h2>
        {/* Forward row: card 04 → connector → card 05 → connector → card 06 */}
        <div className="flex w-full items-stretch justify-between gap-2">
          {C.cards.map((card, i) => {
            const cardRevealed = stepIndex >= i + 1;
            const arrowRevealed = stepIndex >= i + 1 && i < C.cards.length - 1;
            return (
              <div key={card.num} className="flex flex-1 items-center justify-center gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: cardRevealed ? 1 : 0, y: cardRevealed ? 0 : 8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1"
                >
                  <RecipeStepCard
                    num={card.num}
                    headline={highlight(card.headline, card.headlineKeywords)}
                    subText={card.sub}
                    hoverExample={card.hover}
                    orientation="horizontal"
                  />
                </motion.div>
                {i < C.cards.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: arrowRevealed ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <StepConnector direction="forward" width={80} height={40} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
        {/* Loop-back row underneath. 05 → 04 reveals at step 2; 06 → 04 at step 3. */}
        <div className="relative w-full" style={{ height: 64 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stepIndex >= 2 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute"
            style={{ left: "16%", top: 0, width: "34%", height: 64 }}
          >
            <StepConnector direction="loopBack" ambient="backward" label={C.loopBackLabels.five} width={500} height={64} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stepIndex >= 3 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute"
            style={{ left: "16%", top: 32, width: "68%", height: 64 }}
          >
            <StepConnector direction="loopBack" ambient="backward" label={C.loopBackLabels.six} width={1000} height={64} />
          </motion.div>
        </div>
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

export const j4Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  section: "J",
  render: () => <J4RecipeShip />,
};
