// src/slides/foundation-core-section-e/e4-prompt-methodologies.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { TieredTechniqueGrid } from "./components/TieredTechniqueGrid";
import { TechniqueCard } from "./components/TechniqueCard";
import { TechniqueModal } from "./components/TechniqueModal";
import { e4Content as C } from "./content";

type ModalContent = (typeof C.modalContent)[keyof typeof C.modalContent];

export function E4PromptMethodologies() {
  const { stepIndex } = useDeck();
  // Spec §4.4: Space 1 BASIC tier; Space 2 INTERMEDIATE; Space 3 ADVANCED + tier annotation; Space 4 footer caption + foreshadow pulse.
  const revealedTier = stepIndex >= 2 ? 3 : stepIndex >= 1 ? 2 : 1;
  const showFooter = stepIndex >= 3;

  const [activeId, setActiveId] = useState<string | null>(null);
  const activeContent: ModalContent | null = activeId
    ? (C.modalContent as Record<string, ModalContent>)[activeId] ?? null
    : null;

  // Title is derived from the matching card title.
  const cardLookup: Record<string, { title: string; essence: string }> = {};
  for (const tier of C.tiers) {
    for (const c of tier.cards) cardLookup[c.id] = { title: c.title, essence: c.essence };
  }

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
      <FigLabel section="E" num={4} label="METHODOLOGIES" />

      <div className="relative z-10 mx-auto flex h-full max-w-[88vw] flex-col items-stretch justify-center gap-10 px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.1 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        <TieredTechniqueGrid
          tiers={C.tiers}
          revealedTier={revealedTier}
          renderCard={(card, copper) => (
            <TechniqueCard
              id={card.id}
              title={card.title}
              essence={card.essence}
              copper={copper}
              onClick={(id) => setActiveId(id)}
            />
          )}
        />

        <motion.p
          className="font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(1rem, 1.35vw, 1.4rem)", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showFooter ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight(C.footerCaption, C.footerCaptionKeywords)}
        </motion.p>
      </div>

      {activeId && activeContent && (
        <TechniqueModal
          id={activeId}
          title={cardLookup[activeId]?.title ?? activeId}
          layerAnnotation={"layerAnnotation" in activeContent ? (activeContent.layerAnnotation as string) : undefined}
          bullets={activeContent.bullets}
          open
          onClose={() => setActiveId(null)}
        />
      )}
    </div>
  );
}

export const e4Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  section: "E",
  render: () => <E4PromptMethodologies />,
};
