import { useState } from "react";
import { motion } from "framer-motion";
import { GitMerge, Triangle, Droplets, TrendingDown, type LucideIcon } from "lucide-react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { NodeNetwork } from "./components/NodeNetwork";
import { PitfallCanvas } from "./components/PitfallCanvas";
import { type PitfallKind } from "./components/PitfallAnims";
import { e8Content as C } from "./content";

const PITFALL_ICONS: Record<string, LucideIcon> = {
  GitMerge,
  Triangle,
  Droplets,
  TrendingDown,
};

export function E8ContextTheWall() {
  const { stepIndex } = useDeck();
  // Spec §4.8 motion table:
  // Space 1 — network returns from E.6 (carry-over), STILL MANUAL stamp lands, chaos arrows ambient begins
  // Space 2 — pitfalls 1–2 reveal (Conflict + Confusion)
  // Space 3 — pitfalls 3–4 reveal (Poisoning + Distraction)
  // Space 4 — footer caption fades in
  const showCanvas = stepIndex >= 0;
  const ambientOn = stepIndex >= 0;
  const pitfallsRevealedThrough = stepIndex >= 2 ? 4 : stepIndex >= 1 ? 2 : 0;
  const showFooter = stepIndex >= 3;

  const [hoveredKind, setHoveredKind] = useState<PitfallKind | null>(null);

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
      <FigLabel section="E" num={8} label="STILL MANUAL" />

      <div className="relative z-10 mx-auto grid h-full max-w-[92vw] grid-cols-[30fr_70fr] gap-10 px-12 py-20">
        <div className="flex flex-col gap-6">
          <h1
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.4rem)", lineHeight: 1.15 }}
          >
            {highlight(C.headline, C.headlineKeywords)}
          </h1>

          <ul className="flex flex-col gap-3">
            {C.pitfalls.map((p, i) => {
              const Icon = PITFALL_ICONS[p.icon];
              const revealed = i < pitfallsRevealedThrough;
              return (
                <motion.li
                  key={p.id}
                  data-testid={`pitfall-item-${p.id}`}
                  data-revealed={String(revealed)}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 4 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ pointerEvents: revealed ? "auto" : "none" }}
                  onMouseEnter={() => setHoveredKind(p.id as PitfallKind)}
                  onMouseLeave={() => setHoveredKind(null)}
                  className="flex items-start gap-3 border border-copper-800 bg-neutral-950/60 px-4 py-3 hover:border-copper-300"
                >
                  {Icon && (
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-copper-300"
                      aria-hidden
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-mono uppercase tracking-[0.18em] text-copper-300"
                      style={{ fontSize: "clamp(0.75rem, 0.95vw, 0.95rem)" }}
                    >
                      {p.title}
                    </span>
                    <span
                      className="font-serif italic text-neutral-300"
                      style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.05rem)" }}
                    >
                      {p.essence}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <motion.p
            className="font-serif italic text-neutral-200"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.2rem)", lineHeight: 1.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showFooter ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {highlight(C.footerCaption, C.footerCaptionKeywords)}
          </motion.p>
        </div>

        <div className="relative">
          {showCanvas && (
            <PitfallCanvas
              activeKind={hoveredKind}
              defaultIllustration={
                <NodeNetwork
                  variant="context-hub"
                  state="stamped"
                  centerNode="CONTEXT"
                  satellites={C.satellites}
                  play={ambientOn}
                />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const e8Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  section: "E",
  render: () => <E8ContextTheWall />,
};
