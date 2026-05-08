// src/slides/foundation-core-section-e/components/LayerDemo.tsx
import { motion } from "framer-motion";
import { MultiAgentOrchestration } from "./MultiAgentOrchestration";

interface LayerDemoProps {
  kind: "prompt-typing" | "context-network" | "multi-agent-orchestration";
  play: boolean;
}

const PROMPT_LINES = [
  { label: "Role:", body: " You are a project lead." },
  { label: "Task:", body: " Draft the weekly status." },
  { label: "Context:", body: " Friday standup, 8 stakeholders." },
  { label: "Examples:", body: " See last week's report." },
  { label: "Output:", body: " Markdown, ~250 words." },
] as const;

// 6 satellite labels (E.1 Space 4) — names match E.6 satellites for cross-slide rhyme.
const SATELLITES = [
  "system instructions",
  "user memory",
  "RAG knowledge",
  "tools & APIs",
  "state",
  "output",
] as const;

export function LayerDemo({ kind, play }: LayerDemoProps) {
  if (kind === "prompt-typing") {
    return (
      <div
        data-testid="layer-demo-prompt-typing"
        className="flex w-[24vmin] flex-col gap-1 font-mono text-neutral-100"
        style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.95rem)", lineHeight: 1.35 }}
      >
        {PROMPT_LINES.map((l, i) => (
          <motion.span
            key={l.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: play ? 1 : 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: play ? i * 0.9 : 0, // ~6s total typing across 5 lines
            }}
          >
            <span className="text-copper-300 font-semibold">{l.label}</span>
            <span>{l.body}</span>
          </motion.span>
        ))}
      </div>
    );
  }

  if (kind === "context-network") {
    return (
      <svg
        data-testid="layer-demo-context-network"
        viewBox="-100 -100 200 200"
        className="h-[44vmin] w-[44vmin]"
      >
        {/* Center node — placeholder for prompt at the core. */}
        <circle cx={0} cy={0} r={6} className="fill-copper-400" />
        {/* 6 satellites at 60° intervals, radius 70. */}
        {SATELLITES.map((label, i) => {
          const theta = (i * Math.PI) / 3 - Math.PI / 2;
          const x = Math.cos(theta) * 70;
          const y = Math.sin(theta) * 70;
          return (
            <g key={label} data-testid={`context-satellite-${i}`}>
              <motion.line
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                strokeWidth={1}
                className="stroke-copper-700"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: play ? 1 : 0 }}
                transition={{ duration: 0.4, delay: play ? 0.2 + i * 0.18 : 0, ease: "easeOut" }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r={4}
                className="fill-copper-300"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: play ? 1 : 0, opacity: play ? 1 : 0 }}
                transition={{ duration: 0.3, delay: play ? 0.4 + i * 0.18 : 0 }}
              />
              <motion.text
                x={x}
                y={y + (y >= 0 ? 14 : -8)}
                textAnchor="middle"
                className="fill-neutral-200 font-mono"
                style={{ fontSize: 6 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: play ? 1 : 0 }}
                transition={{ duration: 0.3, delay: play ? 0.55 + i * 0.18 : 0 }}
              >
                {label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    );
  }

  // multi-agent-orchestration
  return (
    <div data-testid="layer-demo-multi-agent" className="flex h-full w-full items-center justify-center">
      <MultiAgentOrchestration play={play} />
    </div>
  );
}
