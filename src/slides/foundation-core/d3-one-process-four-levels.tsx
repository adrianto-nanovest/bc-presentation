import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HoverReveal } from "@/components/HoverReveal";
import { highlight } from "@/components/highlight";
import { LevelCard, type LevelMode, type LevelPosition } from "./components/LevelCard";
import { ConvergenceCard } from "./components/ConvergenceCard";
import { BpmCompressionGlyph } from "./glyphs/BpmCompressionGlyph";
import { RpaAccelerationGlyph } from "./glyphs/RpaAccelerationGlyph";
import { IpaSynthesisGlyph } from "./glyphs/IpaSynthesisGlyph";
import { AgenticInversionGlyph } from "./glyphs/AgenticInversionGlyph";
import { d2Content } from "./content";
import { d3Content as C } from "./content";

// Re-use D.2's 5 slot positions for converged cards (geometry rhyme — spec §5.3).
const SLOT_STYLE: Record<string, CSSProperties> = {
  "bpm-tl":    { top: "18%", left: "8%", position: "absolute" },
  "rpa-tr":    { top: "18%", right: "8%", position: "absolute" },
  "ai-bc":     { bottom: "10%", left: "50%", transform: "translateX(-50%)", position: "absolute" },
  "ipa-c":     { top: "45%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute" },
  "agentic-r": { top: "45%", right: "8%", transform: "translateY(-50%)", position: "absolute" },
  "center":    { top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute" },
};

type LevelKey = "bpm" | "rpa" | "ipa" | "agentic";

interface LevelLayout {
  mode: LevelMode | "hidden";
  position: LevelPosition;
}

// Mode-progression matrix per spec §4.3 motion table.
function levelLayoutAtStep(level: LevelKey, step: number): LevelLayout {
  if (level === "bpm") {
    if (step === 0) return { mode: "focal", position: "center" };
    if (step <= 3) return { mode: "filed", position: "bpm-tl" };
    return { mode: "converged", position: "bpm-tl" };
  }
  if (level === "rpa") {
    if (step <= 0) return { mode: "hidden", position: "center" };
    if (step === 1) return { mode: "focal", position: "center" };
    if (step <= 3) return { mode: "filed", position: "rpa-tr" };
    return { mode: "converged", position: "rpa-tr" };
  }
  if (level === "ipa") {
    if (step <= 1) return { mode: "hidden", position: "center" };
    if (step === 2) return { mode: "focal", position: "center" };
    return { mode: "converged", position: "ipa-c" };
  }
  // agentic
  if (step <= 2) return { mode: "hidden", position: "center" };
  if (step === 3) return { mode: "focal", position: "center" };
  return { mode: "converged", position: "agentic-r" };
}

const GLYPHS = {
  bpm: BpmCompressionGlyph,
  rpa: RpaAccelerationGlyph,
  ipa: IpaSynthesisGlyph,
  agentic: AgenticInversionGlyph,
} as const;

export function D3OneProcessFourLevels() {
  const { stepIndex } = useDeck();
  // AI feeder card appears at Space 3 (stepIndex >= 2).
  const showAiFeeder = stepIndex >= 2;
  // Result capstone appears at Space 5 (stepIndex >= 4).
  const showCapstone = stepIndex >= 4;

  // The D.2 source-of-truth for AI card content.
  const aiCard = d2Content.cards.find((c) => c.key === "ai")!;

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="D" num={3} label="ONE PROCESS · FOUR LEVELS" />
      <h1
        className="absolute left-12 right-12 top-12 z-10 font-display text-neutral-50"
        style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)", lineHeight: 1.2 }}
      >
        {highlight(C.headline, C.headlineKeywords)}
      </h1>

      {/* The four morphing level cards, with HoverReveal wrap at canonical pose */}
      {C.levels.map((level) => {
        const layout = levelLayoutAtStep(level.key, stepIndex);
        if (layout.mode === "hidden") return null;
        const Glyph = GLYPHS[level.key];
        const cardD2 = d2Content.cards.find((c) => c.key === level.key)!;

        const card = (
          <LevelCard
            level={level.key}
            mode={layout.mode}
            position={layout.position}
            ask={level.ask}
            askKeywords={level.askKeywords}
            doText={level.doText}
            doKeywords={level.doKeywords}
            outcome={level.outcome}
            glyph={<Glyph play={layout.mode === "focal"} />}
            convergedTitle={cardD2.title}
            convergedSubName={cardD2.subName}
            convergedTagline={cardD2.tagline}
            convergedTaglineKeywords={cardD2.taglineKeywords}
            convergedBullets={level.convergedBullets}
            convergedCopperStop={cardD2.copperStop}
          />
        );

        // Hover only attaches at canonical pose, on converged cards (spec §4.3).
        const wrapHover = layout.mode === "converged" && stepIndex >= 4;
        return (
          <div key={level.key} style={SLOT_STYLE[layout.position]}>
            {wrapHover ? (
              <HoverReveal
                position="below"
                trigger={card}
                payload={
                  <span className="block max-w-[420px] border border-copper-500 bg-neutral-900 p-4 font-serif italic text-neutral-100 shadow" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.45 }}>
                    <strong className="not-italic text-copper-300">Ask:</strong> {level.ask}<br />
                    <strong className="not-italic text-copper-300">Outcome:</strong> {level.outcome}
                  </span>
                }
              />
            ) : (
              card
            )}
          </div>
        );
      })}

      {/* AI feeder card — never has a focal scene; HoverReveal at canonical pose */}
      {showAiFeeder && (
        <motion.div
          style={SLOT_STYLE["ai-bc"]}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {stepIndex >= 4 ? (
            <HoverReveal
              position="below"
              trigger={
                <ConvergenceCard
                  title={aiCard.title}
                  subName={aiCard.subName}
                  tagline={aiCard.tagline}
                  taglineKeywords={aiCard.taglineKeywords}
                  bullets={C.aiFeederBullets}
                  copperStop={aiCard.copperStop}
                  position="ai-bc"
                />
              }
              payload={
                <span className="block max-w-[420px] border border-copper-500 bg-neutral-900 p-4 font-serif italic text-neutral-100 shadow" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.45 }}>
                  {aiCard.hoverAnalogy}
                </span>
              }
            />
          ) : (
            <ConvergenceCard
              title={aiCard.title}
              subName={aiCard.subName}
              tagline={aiCard.tagline}
              taglineKeywords={aiCard.taglineKeywords}
              bullets={C.aiFeederBullets}
              copperStop={aiCard.copperStop}
              position="ai-bc"
            />
          )}
        </motion.div>
      )}

      {/* Result capstone footer */}
      {showCapstone && (
        <motion.p
          className="absolute bottom-6 left-12 right-12 z-10 text-center font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1.25rem, 1.6vw, 1.75rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {highlight(C.resultCapstone, C.resultCapstoneKeywords)}
        </motion.p>
      )}
    </div>
  );
}

export const d3Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <D3OneProcessFourLevels />,
};
