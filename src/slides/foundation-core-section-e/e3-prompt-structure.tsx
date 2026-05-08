import { useState } from "react";
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import type { SpineElement } from "./components/StructureSpine";
import { FrameworkOrbit } from "./components/FrameworkOrbit";
import { e3Content as C, spinePopoverContent } from "./content";

export function E3PromptStructure() {
  const { stepIndex } = useDeck();
  // Spec §4.3: Space 1 spine ①②③ ; Space 2 spine ④⑤⑥ ; Space 3 framework cluster ; Space 4 footer caption.
  const revealedThrough =
    stepIndex >= 1 ? 6 : stepIndex >= 0 ? 3 : 0;
  const showFrameworks = stepIndex >= 2;
  const showFooter = stepIndex >= 3;

  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);

  // Spine hit-set for the currently hovered framework (used to pulse-glow elements).
  const hitSet = (() => {
    if (!hoveredFramework) return new Set<number>();
    const f = C.frameworks.find((x) => x.id === hoveredFramework);
    return new Set<number>(f ? [...f.spineHits] : []);
  })();

  const spineElements: SpineElement[] = C.spine.map((s) => ({
    id: s.id,
    num: s.num,
    name: s.name,
    essence: s.essence,
    popover: spinePopoverContent(s.popoverLines),
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
      <FigLabel section="E" num={3} label="STRUCTURE" />

      <div className="relative z-10 mx-auto flex h-full max-w-[80vw] flex-col items-center justify-center gap-8 px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.1 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        <div className="relative flex w-full max-w-[34vw] flex-col">
          {/* Spine — apply hit-set glow to elements whose num is in the set. */}
          <div className="flex flex-col gap-3">
            {spineElements.map((el, i) => {
              const lit = hitSet.has(el.num);
              const dimmed = hoveredFramework !== null && !lit;
              const revealed = i < revealedThrough;
              return (
                <motion.div
                  key={el.id}
                  data-testid={`spine-element-${el.num}`}
                  data-revealed={String(revealed)}
                  data-lit={String(lit)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: revealed ? (dimmed ? 0.5 : 1) : 0,
                    y: revealed ? 0 : 6,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center gap-4 border bg-neutral-950/60 px-4 py-3 ${
                    lit ? "border-copper-300" : "border-copper-800"
                  }`}
                >
                  <span className="font-mono text-copper-300" style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)" }}>
                    {["①", "②", "③", "④", "⑤", "⑥"][i]}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-neutral-50" style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)", lineHeight: 1.1 }}>
                      {el.name}
                    </span>
                    <span className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}>
                      {el.essence}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Note: the spec mentions an offscreen StructureSpine for "deep mode"
              hover popovers; that's deferred to a Plan B follow-up. Plan A renders
              the spine inline with the hit-set glow only. */}
        </div>

        <FrameworkOrbit
          tiles={C.frameworks}
          revealed={showFrameworks}
          onHoverChange={setHoveredFramework}
        />

        <motion.p
          className="font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showFooter ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight(C.footerCaption, C.footerCaptionKeywords)}
        </motion.p>
      </div>
    </div>
  );
}

export const e3Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <E3PromptStructure />,
};
