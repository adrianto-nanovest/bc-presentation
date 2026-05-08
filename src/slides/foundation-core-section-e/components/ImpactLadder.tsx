import { motion } from "framer-motion";

interface ImpactLadderProps {
  rungs: 3;                  // locked at 3 per spec §3.2
  currentRung: 1 | 2 | 3;
  mode?: "number-free";      // locked per spec; placeholder for future variants
}

const RUNG_LABELS: readonly string[] = [
  "Layer 1 · prompt-only",
  "Layer 2 · prompt + context",
  "Layer 3 · prompt + context + harness",
];

export function ImpactLadder({ rungs, currentRung }: ImpactLadderProps) {
  return (
    <div
      data-testid="impact-ladder"
      className="flex w-full max-w-3xl items-center justify-center gap-3"
    >
      {Array.from({ length: rungs }).map((_, i) => {
        const n = i + 1;
        const lit = n <= currentRung;
        return (
          <motion.div
            key={n}
            data-testid={`impact-rung-${n}`}
            data-lit={String(lit)}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: lit ? 1 : 0.5 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-1 flex-col items-center gap-1 border-t-2 px-3 py-2 ${
              lit ? "border-copper-400 text-copper-300" : "border-copper-800 text-neutral-500"
            }`}
            style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.95rem)" }}
          >
            <span className="font-mono uppercase tracking-[0.18em]">{RUNG_LABELS[i]}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
