// src/slides/foundation-core-section-e/components/TieredTechniqueGrid.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type CopperStop = "copper-300" | "copper-500" | "copper-700";

export interface TechniqueCardData {
  id: string;
  title: string;
  essence: string;
}

export interface Tier {
  id: string;
  label: string;
  copper: CopperStop;
  cards: readonly TechniqueCardData[];
}

interface TieredTechniqueGridProps {
  tiers: readonly Tier[];
  // 0..3 — 0 hides all, 3 shows all three tiers.
  revealedTier: number;
  renderCard: (card: TechniqueCardData, copper: CopperStop) => ReactNode;
}

const TIER_LABEL_COLOR: Record<CopperStop, string> = {
  "copper-300": "text-copper-300",
  "copper-500": "text-copper-500",
  "copper-700": "text-copper-700",
};

export function TieredTechniqueGrid({
  tiers,
  revealedTier,
  renderCard,
}: TieredTechniqueGridProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      {tiers.map((tier, i) => {
        const revealed = i < revealedTier;
        return (
          <motion.div
            key={tier.id}
            data-testid={`tier-${tier.id}`}
            data-revealed={String(revealed)}
            data-copper-stop={tier.copper}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <span
              className={`flex w-32 shrink-0 font-mono uppercase tracking-[0.18em] ${TIER_LABEL_COLOR[tier.copper]}`}
              style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)" }}
            >
              {tier.label}
            </span>
            <div className="flex flex-1 gap-4">
              {tier.cards.map((c) => (
                <div key={c.id} className="flex-1">
                  {renderCard(c, tier.copper)}
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
