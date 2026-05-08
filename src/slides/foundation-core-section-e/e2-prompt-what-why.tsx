import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { NaiveVsProper } from "./components/NaiveVsProper";
import { ImpactLadder } from "./components/ImpactLadder";
import { e2Content as C } from "./content";

export function E2PromptWhatWhy() {
  const { stepIndex } = useDeck();
  // Spec §4.2 motion table: Space 1 left pane; 2 NAIVE prompt; 3 NAIVE result;
  // 4 PROPER prompt; 5 PROPER result + ladder rung lights.
  const showLeft = stepIndex >= 0;
  const showNaivePrompt = stepIndex >= 1;
  const showNaiveResult = stepIndex >= 2;
  const showProperPrompt = stepIndex >= 3;
  const showProperResult = stepIndex >= 4;

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
      <FigLabel section="E" num={2} label="PROMPT" />

      <div className="relative z-10 mx-auto grid h-full max-w-[88vw] grid-cols-[40fr_60fr] gap-12 px-12 py-20">
        {/* LEFT — definition + outcomes + bridge */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showLeft ? 1 : 0, y: showLeft ? 0 : 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2.25rem, 3.5vw, 3.75rem)", lineHeight: 1.1 }}
          >
            {highlight(C.headline, C.headlineKeywords)}
          </h1>
          <p
            className="font-serif text-neutral-100"
            style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)", lineHeight: 1.3 }}
          >
            {highlight(C.definition, C.definitionKeywords)}
          </p>
          <ul className="flex flex-col gap-2 font-serif italic text-neutral-300" style={{ fontSize: "clamp(1rem, 1.35vw, 1.4rem)", lineHeight: 1.4 }}>
            {C.outcomes.map((o, i) => (
              <li key={i} className="before:mr-2 before:content-['•'] before:text-copper-300">
                {highlight(o.text, o.keywords)}
              </li>
            ))}
          </ul>
          <p
            className="mt-4 font-serif italic text-neutral-300"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.25rem)", lineHeight: 1.4 }}
          >
            {highlight(C.bridge, C.bridgeKeywords)}
          </p>
        </motion.div>

        {/* RIGHT — NaiveVsProper */}
        <div className="flex flex-col justify-center">
          <NaiveVsProper
            naivePrompt={C.naivePrompt}
            naiveResult={C.naiveResult}
            properPrompt={C.properPrompt}
            properElementLabels={C.properElementLabels}
            properResult={C.properResult}
            revealNaive={showNaivePrompt}
            revealProper={showProperPrompt}
            revealResults={showNaiveResult || showProperResult}
          />
        </div>
      </div>

      {/* FOOTER — ImpactLadder */}
      <div className="absolute bottom-8 left-1/2 z-10 w-[80vw] -translate-x-1/2">
        <ImpactLadder rungs={3} currentRung={showProperResult ? 1 : 1} />
      </div>
    </div>
  );
}

export const e2Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <E2PromptWhatWhy />,
};
