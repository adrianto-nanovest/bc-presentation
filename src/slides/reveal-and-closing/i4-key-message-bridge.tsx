import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "./components/FigLabel";
import { HeroPhoto } from "./components/HeroPhoto";
import { DisplayPhrase } from "./components/DisplayPhrase";
import { KeywordHighlight } from "./components/KeywordHighlight";
import { PulseGlow } from "./components/PulseGlow";
import { highlight } from "./components/highlight";
import { i4Content as C } from "./content";

export function I4KeyMessageBridge() {
  const { stepIndex } = useDeck();
  const firstBeatRevealed = stepIndex >= 1;
  const beatARevealed = stepIndex >= 2;
  const beatBRevealed = stepIndex >= 3;
  return (
    <div className="relative h-full w-full">
      <HeroPhoto src="/heroes/i4-dusk-horizon.jpg" alt="" vignetteSide="bottom" />
      <FigLabel section="I" num={4} label="THE BRIDGE" />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-12 px-16 text-center">
        {firstBeatRevealed && (
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(4rem, 7.5vw, 7.5rem)", lineHeight: 1.05 }}
          >
            <DisplayPhrase
              staggerType="word"
              words={C.firstBeat.map((w) => ({
                text: w.keyword ? <KeywordHighlight>{w.text}</KeywordHighlight> : w.text,
                durationMs: w.durationMs,
              }))}
            />
          </h1>
        )}
        {firstBeatRevealed && (
          <motion.hr
            className="w-[30%] border-0 border-t border-copper-700"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{ transformOrigin: "center" }}
          />
        )}
        <div className="flex flex-col gap-4">
          {beatARevealed && (
            <motion.p
              className="font-serif italic text-neutral-50"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.25 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {highlight(C.secondBeatA, C.secondBeatAKeywords)}
            </motion.p>
          )}
          {beatBRevealed && (
            <motion.p
              className="font-serif italic text-neutral-50"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.25 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              — In a year, what could{" "}
              <PulseGlow periodSeconds={4.5}>
                <em className="text-copper-400 italic">you</em>
              </PulseGlow>{" "}
              build?
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

export const i4Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <I4KeyMessageBridge />,
};
