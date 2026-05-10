// src/slides/reveal-and-closing/i1-meta-process.tsx
import { motion } from "framer-motion";
import { Fragment } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HorizontalFlow, type FlowStage } from "./components/HorizontalFlow";
import { KeywordHighlight } from "@/components/KeywordHighlight";
import { highlight } from "@/components/highlight";
import { i1Content as C } from "./content";

function Headline() {
  // Headline is a sequence of literal segments + KeywordHighlight wrappers
  // because the highlight() helper is text-only and the headline mixes
  // multiple keywords with literal connective text.
  return (
    <h1
      className="font-display text-neutral-50"
      style={{ fontSize: "clamp(2.75rem, 4.5vw, 4.5rem)", lineHeight: 1.15 }}
    >
      {C.headlineParts.map((part, i) =>
        // Even indices are literals; odd indices are keywords (per content.ts shape).
        i % 2 === 0 ? <Fragment key={i}>{part}</Fragment> : <KeywordHighlight key={i}>{part}</KeywordHighlight>,
      )}
    </h1>
  );
}

export function I1MetaProcess() {
  const { stepIndex } = useDeck();
  const subRevealed = stepIndex >= 1;
  const stagesRevealed = stepIndex >= 2;
  const taglineRevealed = stepIndex >= 3;
  const stages: FlowStage[] = C.stages.map((s) => ({
    num: s.num,
    label: s.label,
    sub: highlight(s.sub, s.keywords),
  }));
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
      <FigLabel section="I" num={1} label="THE PROCESS" />
      <div className="relative z-10 mx-auto flex h-full max-w-[92vw] flex-col justify-center gap-12 px-12 py-20">
        <Headline />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: subRevealed ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-3"
        >
          <p
            className="font-serif text-copper-300"
            style={{ fontSize: "clamp(1.5rem, 2vw, 2.25rem)", lineHeight: 1.35 }}
          >
            {highlight(C.subLine, C.subLineKeywords)}
          </p>
          <motion.hr
            className="w-[40%] border-0 border-t border-copper-700"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: subRevealed ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ transformOrigin: "left center" }}
          />
        </motion.div>
        <HorizontalFlow stages={stages} revealed={stagesRevealed} ambient={stagesRevealed} />
        <motion.p
          className="font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.6rem)", lineHeight: 1.45 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: taglineRevealed ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {highlight(C.tagline, C.taglineKeywords)}
        </motion.p>
      </div>
    </div>
  );
}

export const i1Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  section: "I",
  render: () => <I1MetaProcess />,
};
