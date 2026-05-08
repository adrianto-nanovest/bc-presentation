import { motion } from "framer-motion";

interface HarnessPatternProps {
  play: boolean;
}

const ENTRY_DURATION = 0.4;
const PHASE_A_END = 0.4;
const PHASE_B_END = 0.9;
const PHASE_C_END = 1.4;
const PHASE_D_START = 1.6;

function delaysFor(play: boolean) {
  if (!play)
    return { mainAgent: 0, branches: 0, subAgents: 0, directTools: 0, subTools: 0, annotation: 0 };
  return {
    mainAgent: 0,
    branches: PHASE_A_END,
    subAgents: PHASE_B_END,
    directTools: PHASE_B_END + 0.1,
    subTools: PHASE_C_END,
    annotation: PHASE_D_START,
  };
}

export function HarnessPattern({ play }: HarnessPatternProps) {
  const d = delaysFor(play);

  return (
    <div
      data-testid="harness-pattern-root"
      data-play={String(play)}
      className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-4"
    >
      <motion.div
        data-testid="harness-main-agent"
        initial={play ? { opacity: 0, scale: 0.9 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ENTRY_DURATION, ease: [0.16, 1, 0.3, 1], delay: d.mainAgent }}
        className="border border-copper-300 bg-neutral-950/80 px-4 py-2"
      >
        <span
          className="font-mono uppercase tracking-[0.18em] text-neutral-100"
          style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
        >
          MAIN AGENT
        </span>
      </motion.div>

      <svg viewBox="-50 -10 100 50" className="h-32 w-full">
        <motion.line
          x1={0}
          y1={0}
          x2={-25}
          y2={20}
          stroke="rgb(212 153 102 / 0.7)"
          strokeWidth={0.6}
          initial={play ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: ENTRY_DURATION, delay: d.branches }}
        />
        <text x={-30} y={5} fill="rgb(212 153 102)" fontSize={3} fontFamily="JetBrains Mono">
          delegate
        </text>

        <motion.line
          x1={0}
          y1={0}
          x2={25}
          y2={20}
          stroke="rgb(212 153 102 / 0.7)"
          strokeWidth={0.6}
          initial={play ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: ENTRY_DURATION, delay: d.branches }}
        />
        <text x={20} y={5} fill="rgb(212 153 102)" fontSize={3} fontFamily="JetBrains Mono">
          tools
        </text>
      </svg>

      <div className="flex w-full items-start justify-around gap-6">
        <div className="flex flex-col items-center gap-3">
          {(["a", "b"] as const).map((letter, i) => (
            <motion.div
              key={letter}
              data-testid={`harness-subagent-${letter}`}
              initial={play ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: d.subAgents + i * 0.15 }}
              className="flex flex-col items-center gap-1 border border-copper-700 bg-neutral-950/70 px-3 py-2"
            >
              <span
                className="font-mono uppercase tracking-[0.18em] text-neutral-100"
                style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)" }}
              >
                AGENT {letter.toUpperCase()}
              </span>
              <motion.span
                data-testid={`harness-subagent-tool-${letter}`}
                initial={play ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: d.subTools + i * 0.1 }}
                className="font-mono text-copper-300"
                style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.8rem)" }}
              >
                [tool]
              </motion.span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          {(["search", "fetch"] as const).map((tool, i) => (
            <motion.span
              key={tool}
              data-testid={`harness-direct-tool-${i}`}
              initial={play ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: d.directTools + i * 0.15 }}
              className="border border-copper-700 bg-neutral-950/70 px-3 py-2 font-mono text-copper-300"
              style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)" }}
            >
              [{tool}]
            </motion.span>
          ))}
        </div>
      </div>

      <motion.span
        data-testid="harness-annotation"
        initial={play ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: d.annotation }}
        className="font-mono uppercase tracking-[0.18em] text-copper-300"
        style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.9rem)" }}
      >
        Pattern: centralized
      </motion.span>
    </div>
  );
}
