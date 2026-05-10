import { motion } from "framer-motion";
import { LadderQuestion } from "./LadderQuestion";
import { LadderTerminal } from "./LadderTerminal";
import { LadderLoopBack } from "./LadderLoopBack";

export interface LadderQuestionSpec {
  number: number;
  question: string;
  keywords: readonly string[];
  yesLabel?: string;
  noLabel?: string;
}

export interface LadderTerminalSpec {
  abbrev: string;
  subLine: string;
  altitudeTier: 1 | 2 | 3 | 4;
  hoverExample?: string;
  // q-number this terminal rises from
  fromQ: number;
  // which branch — "yes" rises, "no" goes to BPM (Q2's NO)
  branch: "yes" | "no";
}

export interface LadderRiseContent {
  questions: readonly LadderQuestionSpec[];        // 5 entries
  terminals: readonly LadderTerminalSpec[];        // 4 entries (BPM, RPA, IPA, AGENTIC)
}

interface LadderRiseProps {
  content: LadderRiseContent;
  // 0..5: at 1 only Q1 + loopback are visible; at 5 the full diagram is.
  revealedSteps: number;
}

export function LadderRise({ content, revealedSteps }: LadderRiseProps) {
  return (
    <div
      data-testid="ladder-rise"
      data-revealed-steps={revealedSteps}
      className="relative w-full"
      style={{ minHeight: "27rem" }}
    >
      {/* Bottom rail: start + 5 questions */}
      <div className="absolute bottom-[20%] left-0 right-0 flex items-center justify-between gap-4 px-12">
        <motion.div
          data-testid="ladder-start"
          className="border border-copper-700 bg-neutral-950/60 px-4 py-3 font-mono text-copper-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealedSteps >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: "0.85rem" }}
        >
          Start
        </motion.div>
        {content.questions.map((q, i) => (
          <motion.div
            key={q.number}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: revealedSteps >= i + 1 ? 1 : 0,
              y: revealedSteps >= i + 1 ? 0 : 8,
            }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <LadderQuestion {...q} />
          </motion.div>
        ))}
      </div>
      {/* STOP↻ loopback under Q1 */}
      <motion.div
        className="absolute left-[14%] top-[calc(80%+12px)]"
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: revealedSteps >= 1 ? 1 : 0,
          y: revealedSteps >= 1 ? 0 : -8,
        }}
        transition={{ duration: 0.5 }}
      >
        <LadderLoopBack />
      </motion.div>
      {/* Staircase of 4 terminal-level cards rising at increasing altitudes */}
      {content.terminals.map((t) => {
        // Altitude tier 1 → ~50% from top; 4 → ~10%; equal spacing.
        const topPct = 60 - t.altitudeTier * 12;
        // Horizontal x: align under each terminal's source Q number.
        const leftPct = 14 + t.fromQ * 14;
        // The terminal becomes visible when revealedSteps >= the space that introduced it.
        // BPM rises at Space 2; RPA at Space 3; IPA at Space 4; AGENTIC at Space 5.
        const introducedAtSpace = t.altitudeTier + 1;
        return (
          <motion.div
            key={t.abbrev}
            className="absolute"
            style={{ top: `${topPct}%`, left: `${leftPct}%` }}
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: revealedSteps >= introducedAtSpace ? 1 : 0,
              y: revealedSteps >= introducedAtSpace ? 0 : 16,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <LadderTerminal
              abbrev={t.abbrev}
              subLine={t.subLine}
              altitudeTier={t.altitudeTier}
              hoverExample={t.hoverExample}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
