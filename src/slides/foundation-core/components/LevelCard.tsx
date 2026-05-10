import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { highlight } from "@/components/highlight";
import {
  ConvergenceCard,
  type ConvergenceSlot,
  type CopperStop,
} from "./ConvergenceCard";

export type LevelAbbrev = "bpm" | "rpa" | "ipa" | "agentic";
export type LevelMode = "focal" | "filed" | "converged";
export type LevelPosition = "center" | ConvergenceSlot;

const LEVEL_NUM: Record<LevelAbbrev, string> = {
  bpm: "01",
  rpa: "02",
  ipa: "03",
  agentic: "04",
};

interface LevelCardProps {
  level: LevelAbbrev;
  mode: LevelMode;
  position: LevelPosition;
  // Focal-mode content:
  ask: string;
  askKeywords: readonly string[];
  doText: string;
  doKeywords: readonly string[];
  outcome: string;
  glyph: ReactNode;            // accepts a glyph component pre-bound to its play state
  // Converged-mode content (matches ConvergenceCard shape):
  convergedTitle: string;       // e.g. "BPM"
  convergedSubName: string;     // e.g. "Business Process Management"
  convergedTagline: string;
  convergedTaglineKeywords: readonly string[];
  convergedBullets: readonly string[];
  convergedCopperStop: CopperStop;
  children?: ReactNode;         // for HoverReveal hookup in converged mode
}

export function LevelCard(props: LevelCardProps) {
  const { level, mode, position } = props;
  const layoutId = `level-${level}`;

  if (mode === "converged") {
    return (
      <motion.div
        layoutId={layoutId}
        data-testid="level-card"
        data-level={level}
        data-mode={mode}
        data-position={position}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <ConvergenceCard
          title={props.convergedTitle}
          subName={props.convergedSubName}
          tagline={props.convergedTagline}
          taglineKeywords={props.convergedTaglineKeywords}
          bullets={props.convergedBullets}
          copperStop={props.convergedCopperStop}
          position={position as ConvergenceSlot}
        >
          {props.children}
        </ConvergenceCard>
      </motion.div>
    );
  }

  if (mode === "filed") {
    return (
      <motion.div
        layoutId={layoutId}
        data-testid="level-card"
        data-level={level}
        data-mode={mode}
        data-position={position}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-[230px] flex-col gap-2 border-l-2 border-l-copper-700 bg-neutral-950/60 p-4 shadow"
      >
        <span className="font-mono text-copper-400" style={{ fontSize: "0.85rem" }}>
          {LEVEL_NUM[level]}
        </span>
        <h4 className="font-display text-neutral-50" style={{ fontSize: "1.2rem", lineHeight: 1.15 }}>
          {props.convergedTitle}
        </h4>
        <p className="font-serif italic text-neutral-300" style={{ fontSize: "0.85rem", lineHeight: 1.4 }}>
          {props.outcome}
        </p>
      </motion.div>
    );
  }

  // mode === "focal"
  return (
    <motion.div
      layoutId={layoutId}
      data-testid="level-card"
      data-level={level}
      data-mode={mode}
      data-position={position}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-[896px] flex-col gap-6 border-l-4 border-l-copper-500 bg-neutral-950/60 p-10 shadow"
    >
      <div className="flex items-baseline gap-6">
        <span className="font-mono text-copper-400" style={{ fontSize: "1rem" }}>
          {LEVEL_NUM[level]}
        </span>
        <h2 className="font-display text-neutral-50" style={{ fontSize: "2.8rem", lineHeight: 1.1 }}>
          {props.convergedTitle}
        </h2>
        <span className="font-serif italic text-neutral-300" style={{ fontSize: "1.28rem", lineHeight: 1.3 }}>
          {props.convergedSubName}
        </span>
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-x-6 gap-y-3 font-serif text-neutral-50" style={{ fontSize: "1.12rem", lineHeight: 1.45 }}>
        <span className="font-sans uppercase tracking-[0.18em] text-copper-400" style={{ fontSize: "0.85rem" }}>Ask</span>
        <span><em className="italic">{highlight(props.ask, props.askKeywords)}</em></span>
        <span className="font-sans uppercase tracking-[0.18em] text-copper-400" style={{ fontSize: "0.85rem" }}>Do</span>
        <span>{highlight(props.doText, props.doKeywords)}</span>
        <span className="font-sans uppercase tracking-[0.18em] text-copper-400" style={{ fontSize: "0.85rem" }}>Outcome</span>
        <span><em className="italic">{props.outcome}</em></span>
      </div>
      <div className="self-center">{props.glyph}</div>
    </motion.div>
  );
}
