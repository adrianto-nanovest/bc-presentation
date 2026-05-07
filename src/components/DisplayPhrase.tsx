import { motion } from "framer-motion";
import type { ReactNode } from "react";

type WordSpec =
  | string
  | { text: ReactNode; durationMs?: number; pauseAfterMs?: number };

interface DisplayPhraseProps {
  // "word": inline-stagger word-by-word with single-space joiners.
  // "phrase": block-stagger, each entry on its own line/visual.
  staggerType: "word" | "phrase";
  words: WordSpec[];
  baseDurationMs?: number; // default per-word reveal duration
  delayBetweenMs?: number; // gap between successive reveals
}

export function DisplayPhrase({
  staggerType,
  words,
  baseDurationMs = 250,
  delayBetweenMs = 60,
}: DisplayPhraseProps) {
  let cumulativeDelay = 0;
  return (
    <span className={staggerType === "phrase" ? "block" : "inline"}>
      {words.map((w, i) => {
        const text = typeof w === "string" ? w : w.text;
        const duration =
          (typeof w === "object" && w.durationMs) || baseDurationMs;
        const pauseAfter =
          (typeof w === "object" && w.pauseAfterMs) || 0;
        const delay = cumulativeDelay;
        cumulativeDelay += duration + delayBetweenMs + pauseAfter;
        const variant =
          staggerType === "phrase" ? "block mb-2" : "inline-block";
        return (
          <motion.span
            key={i}
            data-testid="phrase-word"
            data-duration-ms={duration}
            className={variant}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: duration / 1000,
              delay: delay / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {text}
            {staggerType === "word" && i < words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </span>
  );
}
