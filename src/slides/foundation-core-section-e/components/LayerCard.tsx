// src/slides/foundation-core-section-e/components/LayerCard.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { highlight } from "@/components/highlight";

export type LayerName = "prompt" | "context" | "harness";
export type LayerMode = "focal" | "nested";

interface LayerCardProps {
  layer: LayerName;
  mode: LayerMode;
  label: string;       // "PROMPT" | "CONTEXT" | "HARNESS"
  essence: string;     // "the instructions" | etc
  essenceKeywords: readonly string[];
  children?: ReactNode; // focal-mode demo content
}

// Concentric ring sizes — spec §4.1: inner ~25% area, middle ~55%, outer ~85%.
// We map area-percent to vmin (square viewport) and use a circular border.
const NESTED_DIAMETER_VMIN: Record<LayerName, number> = {
  prompt: 28,
  context: 50,
  harness: 78,
};
const FOCAL_DIAMETER_VMIN = 78; // focal mode fills the stage

const RING_BORDER: Record<LayerName, string> = {
  prompt: "border-copper-700",
  context: "border-copper-300",
  harness: "border-copper-200",
};

const LABEL_COLOR: Record<LayerName, string> = {
  prompt: "text-copper-400",
  context: "text-copper-300",
  harness: "text-copper-200",
};

export function LayerCard({
  layer,
  mode,
  label,
  essence,
  essenceKeywords,
  children,
}: LayerCardProps) {
  const diameter = mode === "focal" ? FOCAL_DIAMETER_VMIN : NESTED_DIAMETER_VMIN[layer];
  return (
    <motion.div
      data-testid={`layer-card-${layer}`}
      data-mode={mode}
      data-layer={layer}
      layoutId={`layer-${layer}`}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${RING_BORDER[layer]} flex items-center justify-center`}
      style={{ width: `${diameter}vmin`, height: `${diameter}vmin` }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start gap-1 pt-6">
        <span
          className={`font-mono uppercase tracking-[0.18em] ${LABEL_COLOR[layer]}`}
          style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.25rem)" }}
        >
          {label}
        </span>
        <span
          className="font-serif italic text-neutral-100"
          style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.7rem)" }}
        >
          {highlight(essence, essenceKeywords)}
        </span>
      </div>
      {mode === "focal" && children && (
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {children}
        </div>
      )}
    </motion.div>
  );
}
