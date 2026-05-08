import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { NodeNetwork } from "./components/NodeNetwork";
import { HarnessPackage } from "./components/HarnessPackage";
import { ThesisPanel } from "./components/ThesisPanel";
import { ImpactLadder } from "./components/ImpactLadder";
import { e9Content as C } from "./content";

export function E9HarnessWhatWhy() {
  const { stepIndex } = useDeck();
  // Spec §4.9 motion table:
  // Space 1 — network from E.8 returns; STILL MANUAL stamp dissolves; nodes brighten
  // Space 2 — compression sequence; satellites pull inward; harness package box appears
  // Space 3 — Includes row + arrows reveal
  // Space 4 — thesis (equation + Cursor quote + stanza)
  // Space 5 — tagline + ladder rung 3 lights
  const showStampedNetwork = stepIndex >= 0 && stepIndex < 1;
  const showCompressedNetwork = stepIndex >= 1;
  const showHarnessPackage = stepIndex >= 1;
  const showIncludes = stepIndex >= 2;
  const showArrows = stepIndex >= 2;
  const revealEquation = stepIndex >= 3;
  const revealStanza = stepIndex >= 3;
  const revealTagline = stepIndex >= 4;
  const rung3Lit = stepIndex >= 4;

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
      <FigLabel section="E" num={9} label="HARNESS" />

      <div className="relative z-10 mx-auto grid h-full max-w-[92vw] grid-cols-[55fr_45fr] gap-10 px-12 py-20">
        <div className="relative flex flex-col items-center justify-center gap-6">
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.1 }}
          >
            {highlight(C.headline, C.headlineKeywords)}
          </h1>

          <div className="relative flex h-[36vh] w-full items-center justify-center">
            {showStampedNetwork && (
              <NodeNetwork
                variant="context-hub"
                state="activated"
                centerNode="CONTEXT"
                satellites={C.satellites}
                play={false}
              />
            )}
            {showCompressedNetwork && (
              <NodeNetwork
                variant="context-hub"
                state="compressed"
                centerNode="CONTEXT"
                satellites={C.satellites}
                play={false}
              />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: showHarnessPackage ? 1 : 0,
              y: showHarnessPackage ? 0 : 12,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: showHarnessPackage ? 0.8 : 0,
            }}
            className="flex w-full justify-center"
          >
            <HarnessPackage
              includes={C.includes}
              revealIncludes={showIncludes}
              revealArrows={showArrows}
            />
          </motion.div>
        </div>

        <div className="flex flex-col justify-center">
          <ThesisPanel
            revealEquation={revealEquation}
            revealStanza={revealStanza}
            revealTagline={revealTagline}
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 w-[80vw] -translate-x-1/2">
        <ImpactLadder rungs={3} currentRung={rung3Lit ? 3 : 2} />
      </div>
    </div>
  );
}

export const e9Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <E9HarnessWhatWhy />,
};
