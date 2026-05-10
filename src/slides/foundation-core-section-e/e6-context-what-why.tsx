import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { NodeNetwork } from "./components/NodeNetwork";
import type { SatelliteSpec } from "./components/NodeNetwork";
import { ImpactLadder } from "./components/ImpactLadder";
import { e6Content as C } from "./content";

export function E6ContextWhatWhy() {
  const { stepIndex } = useDeck();
  // Spec §4.6 motion table:
  // Space 1 — hub + first satellite (User Prompt) + connector
  // Space 2 — remaining 5 satellites stagger in
  // Space 3 — left gutter definition + analogy
  // Space 4 — ladder rung 2 lights + ambient begins
  const showHub = stepIndex >= 0;
  const showAllSats = stepIndex >= 1;
  const showGutter = stepIndex >= 2;
  const ambientOn = stepIndex >= 3;
  const rung2Lit = stepIndex >= 3;

  // Reveal one or six satellites depending on step.
  const revealedSats: readonly SatelliteSpec[] = showAllSats
    ? C.satellites.map(({ id, label, icon }) => ({ id, label, icon }))
    : C.satellites.slice(0, 1).map(({ id, label, icon }) => ({ id, label, icon }));

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
      <FigLabel section="E" num={6} label="CONTEXT" />

      <div className="relative z-10 mx-auto grid h-full max-w-[92vw] grid-cols-[25fr_75fr] gap-10 px-12 py-20">
        {/* LEFT GUTTER — definition + analogy (Space 3) */}
        <motion.div
          className="flex flex-col justify-center gap-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showGutter ? 1 : 0, y: showGutter ? 0 : 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2rem, 3vw, 3.25rem)", lineHeight: 1.1 }}
          >
            {highlight(C.headline, C.headlineKeywords)}
          </h1>
          <p
            className="font-serif text-neutral-100"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.3 }}
          >
            {highlight(C.subHeadline, C.subHeadlineKeywords)}
          </p>
          <p
            className="font-serif text-neutral-100"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.25rem)", lineHeight: 1.4 }}
          >
            {highlight(C.definition, C.definitionKeywords)}
          </p>
          <p
            className="font-serif italic text-neutral-300"
            style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.1rem)", lineHeight: 1.4 }}
          >
            {highlight(C.analogy, C.analogyKeywords)}
          </p>
        </motion.div>

        {/* RIGHT — NodeNetwork */}
        <div className="relative">
          {showHub && (
            <NodeNetwork
              variant="context-hub"
              state="activated"
              centerNode="CONTEXT"
              satellites={revealedSats}
              play={ambientOn}
            />
          )}
        </div>
      </div>

      {/* FOOTER — ImpactLadder */}
      <div className="absolute bottom-8 left-1/2 z-10 w-[80vw] -translate-x-1/2">
        <ImpactLadder rungs={3} currentRung={rung2Lit ? 2 : 1} />
      </div>
    </div>
  );
}

export const e6Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  section: "E",
  render: () => <E6ContextWhatWhy />,
};
