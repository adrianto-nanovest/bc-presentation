// src/slides/foundation-core-section-e/e1-three-layers.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { LayerCard, type LayerMode } from "./components/LayerCard";
import { LayerDemo } from "./components/LayerDemo";
import { e1Content as C } from "./content";

type LayerName = "prompt" | "context" | "harness";

interface LayerState {
  visible: boolean;
  mode: LayerMode;
}

// Spec §4.1 step → state table.
function layerStatesFor(step: number): Record<LayerName, LayerState> {
  // 0,1 → PROMPT focal alone
  // 2,3 → CONTEXT focal, PROMPT nested
  // 4,5 → HARNESS focal, both inner nested
  // 6   → all nested + quote
  const promptVisible = step >= 0;
  const contextVisible = step >= 2;
  const harnessVisible = step >= 4;
  return {
    prompt: {
      visible: promptVisible,
      mode: step >= 2 ? "nested" : "focal",
    },
    context: {
      visible: contextVisible,
      mode: step >= 4 ? "nested" : "focal",
    },
    harness: {
      visible: harnessVisible,
      mode: step >= 6 ? "nested" : "focal",
    },
  };
}

function demoForStep(step: number): "prompt-typing" | "context-network" | "multi-agent-orchestration" | null {
  if (step === 1) return "prompt-typing";
  if (step === 3) return "context-network";
  if (step === 5) return "multi-agent-orchestration";
  return null;
}

export function E1ThreeLayers() {
  const { stepIndex } = useDeck();
  const states = layerStatesFor(stepIndex);
  const demo = demoForStep(stepIndex);
  const showQuote = stepIndex >= 6;

  // Demo always renders inside whichever layer is currently focal.
  const focalLayer: LayerName | null =
    states.harness.visible && states.harness.mode === "focal"
      ? "harness"
      : states.context.visible && states.context.mode === "focal"
        ? "context"
        : states.prompt.visible && states.prompt.mode === "focal"
          ? "prompt"
          : null;

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
      <FigLabel section="E" num={1} label="THE THREE LAYERS" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.5rem)", lineHeight: 1.1, textAlign: "center" }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        {/* Concentric stage — fills the rest of the slide. */}
        <div className="relative mt-8 flex flex-1 w-full items-center justify-center">
          {/* Render outermost first so SVG/HTML painter order has innermost on top.
              But layoutId tweens still match by id so render order is mostly cosmetic. */}
          {(["harness", "context", "prompt"] as const).map((layer) => {
            const s = states[layer];
            if (!s.visible) return null;
            const meta = C.layers.find((l) => l.layer === layer)!;
            return (
              <LayerCard
                key={layer}
                layer={layer}
                mode={s.mode}
                label={meta.label}
                essence={meta.essence}
                essenceKeywords={meta.essenceKeywords}
              >
                {focalLayer === layer && demo ? <LayerDemo kind={demo} play /> : null}
              </LayerCard>
            );
          })}
        </div>

        <motion.p
          className="mb-2 mt-6 max-w-3xl text-center font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showQuote ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight(C.quote, C.quoteKeywords)}
        </motion.p>
      </div>
    </div>
  );
}

export const e1Slide: SlideDef = {
  steps: 7,
  animationMode: "step-reveal",
  canonicalPose: 6,
  surface: "dark",
  render: () => <E1ThreeLayers />,
};
