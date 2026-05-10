// src/slides/foundation-core-section-e/e5-prompt-the-wall.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { e5Content as C } from "./content";

function StaggeredList({
  items,
  prefix,
  bulletColor,
  visible,
  testIdPrefix,
}: {
  items: readonly string[];
  prefix: string;
  bulletColor: string;
  visible: boolean;
  testIdPrefix: string;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <motion.li
          key={item}
          data-testid={`${testIdPrefix}-${i}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 4 }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
            delay: visible ? i * 0.08 : 0,
          }}
          className="font-serif text-neutral-100"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}
        >
          <span className={`mr-2 ${bulletColor}`}>{prefix}</span>
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

export function E5PromptTheWall() {
  const { stepIndex } = useDeck();
  // Spec §4.5 motion table: Space 1 BEST PRACTICES; Space 2 COMMON MISTAKES;
  // Space 3 WHERE PROMPT ENDS section; Space 4 closing caption.
  const showBP = stepIndex >= 0;
  const showCM = stepIndex >= 1;
  const showWall = stepIndex >= 2;
  const showClosing = stepIndex >= 3;

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
      <FigLabel section="E" num={5} label="THE WALL" />

      <div className="relative z-10 mx-auto flex h-full max-w-[88vw] flex-col gap-10 px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.1 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        {/* TOP: BP + CM side-by-side */}
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-3">
            <motion.h3
              className="font-mono uppercase tracking-[0.18em] text-copper-300"
              style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.15rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showBP ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {C.bestPracticesHeader}
            </motion.h3>
            <StaggeredList
              items={C.bestPractices}
              prefix="•"
              bulletColor="text-copper-300"
              visible={showBP}
              testIdPrefix="e5-bp"
            />
          </div>
          <div className="flex flex-col gap-3">
            <motion.h3
              className="font-mono uppercase tracking-[0.18em] text-copper-400"
              style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.15rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showCM ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {C.commonMistakesHeader}
            </motion.h3>
            <StaggeredList
              items={C.commonMistakes}
              prefix="•"
              bulletColor="text-copper-400"
              visible={showCM}
              testIdPrefix="e5-cm"
            />
          </div>
        </div>

        {/* BOTTOM: WHERE PROMPT ENDS — full-width, weighted */}
        <motion.div
          className="flex flex-col gap-4 border-t border-copper-700 pt-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showWall ? 1 : 0, y: showWall ? 0 : 12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-display uppercase text-neutral-50"
            style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.5rem)", lineHeight: 1 }}
          >
            <em className="not-italic text-copper-400 italic">{C.wallHeader}</em>
          </h2>
          <p
            className="font-serif italic text-neutral-50"
            style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.6rem)", lineHeight: 1.3 }}
          >
            {highlight(C.wallSubLine, C.wallSubLineKeywords)}
          </p>
          <ul className="flex flex-col gap-1">
            {C.constraints.map((c, i) => (
              <motion.li
                key={c}
                data-testid={`e5-constraint-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: showWall ? 1 : 0, y: showWall ? 0 : 4 }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: showWall ? 0.3 + i * 0.1 : 0,
                }}
                className="font-serif text-neutral-100"
                style={{ fontSize: "clamp(1rem, 1.35vw, 1.35rem)", lineHeight: 1.4 }}
              >
                <span className="mr-2 text-copper-300">▸</span>
                {c}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Closing caption */}
        <motion.p
          className="text-center font-serif italic text-neutral-200"
          style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.6rem)", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showClosing ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight(C.closingCaption, C.closingCaptionKeywords)}
        </motion.p>
      </div>
    </div>
  );
}

export const e5Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  section: "E",
  render: () => <E5PromptTheWall />,
};
