// src/slides/foundation-core-section-e/components/MultiAgentOrchestration.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Pattern = "centralized" | "decentralized" | "chain" | "parallel";

const PATTERN_LABELS: Record<Pattern, string> = {
  centralized: "Pattern: centralized",
  decentralized: "Pattern: decentralized (A2A)",
  chain: "Pattern: chain",
  parallel: "Pattern: parallel",
};

const PATTERN_ORDER: readonly Pattern[] = [
  "centralized",
  "decentralized",
  "chain",
  "parallel",
];

// Geometry — viewBox is centered at (0,0).
const MAIN_POS = { x: 0, y: -55 };
const AGENT_POS: Record<"A" | "B" | "C", { x: number; y: number }> = {
  A: { x: -55, y: 30 },
  B: { x: 0, y: 50 },
  C: { x: 55, y: 30 },
};

// Each pattern stays on screen for ~1500ms, with ~300ms morph between patterns.
const PATTERN_INTERVAL_MS = 1500;

interface MultiAgentOrchestrationProps {
  play: boolean;
}

export function MultiAgentOrchestration({ play }: MultiAgentOrchestrationProps) {
  const [patternIdx, setPatternIdx] = useState(0);

  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => {
      setPatternIdx((i) => (i + 1) % PATTERN_ORDER.length);
    }, PATTERN_INTERVAL_MS);
    return () => clearInterval(id);
  }, [play]);

  const pattern = PATTERN_ORDER[patternIdx];
  const mainDimmed = pattern === "decentralized" || pattern === "chain";

  return (
    <div
      data-testid="orchestration-root"
      data-play={String(play)}
      className="relative flex h-[60vmin] w-[60vmin] flex-col items-center justify-center"
    >
      <svg viewBox="-80 -80 160 160" className="h-full w-full">
        {/* Main → A/B/C lines (used by centralized + parallel) */}
        {(["A", "B", "C"] as const).map((id) => {
          const a = AGENT_POS[id];
          return (
            <line
              key={`spoke-${id}`}
              x1={MAIN_POS.x}
              y1={MAIN_POS.y}
              x2={a.x}
              y2={a.y}
              strokeWidth={0.8}
              className="stroke-copper-700"
              opacity={pattern === "chain" ? 0 : pattern === "decentralized" ? 0.2 : 0.7}
            />
          );
        })}

        {/* Peer lines (used by decentralized) */}
        {([["A", "B"], ["B", "C"], ["A", "C"]] as const).map(([p, q]) => {
          const a = AGENT_POS[p];
          const b = AGENT_POS[q];
          return (
            <line
              key={`peer-${p}-${q}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              strokeWidth={0.8}
              className="stroke-copper-700"
              opacity={pattern === "decentralized" ? 0.7 : 0.2}
            />
          );
        })}

        {/* Sequential chain segments (visible only on `chain`) */}
        {pattern === "chain" && (
          <>
            <line
              x1={AGENT_POS.A.x}
              y1={AGENT_POS.A.y}
              x2={AGENT_POS.B.x}
              y2={AGENT_POS.B.y}
              strokeWidth={1}
              className="stroke-copper-300"
            />
            <line
              x1={AGENT_POS.B.x}
              y1={AGENT_POS.B.y}
              x2={AGENT_POS.C.x}
              y2={AGENT_POS.C.y}
              strokeWidth={1}
              className="stroke-copper-300"
            />
          </>
        )}

        {/* Pulses — implemented per-pattern for the distinct motion signatures.
            Each <Pulse> is a copper-300 dot animating along an SVG line. */}
        {pattern === "centralized" &&
          (["A", "B", "C"] as const).map((id, i) => (
            <Pulse
              key={`c-out-${id}-${patternIdx}`}
              from={MAIN_POS}
              to={AGENT_POS[id]}
              durationMs={400}
              delayMs={i * 80}
            />
          ))}
        {pattern === "centralized" &&
          (["A", "B", "C"] as const).map((id, i) => (
            <Pulse
              key={`c-ret-${id}-${patternIdx}`}
              from={AGENT_POS[id]}
              to={MAIN_POS}
              durationMs={400}
              delayMs={500 + i * 80}
            />
          ))}
        {pattern === "parallel" &&
          (["A", "B", "C"] as const).map((id) => (
            <Pulse
              key={`p-out-${id}-${patternIdx}`}
              from={MAIN_POS}
              to={AGENT_POS[id]}
              durationMs={400}
              delayMs={0}
            />
          ))}
        {pattern === "parallel" &&
          (["A", "B", "C"] as const).map((id) => (
            <Pulse
              key={`p-ret-${id}-${patternIdx}`}
              from={AGENT_POS[id]}
              to={MAIN_POS}
              durationMs={400}
              delayMs={650}
            />
          ))}
        {pattern === "decentralized" &&
          ([["A", "B"], ["B", "C"], ["A", "C"]] as const).flatMap(([p, q]) => [
            <Pulse
              key={`d-${p}-${q}-fwd-${patternIdx}`}
              from={AGENT_POS[p]}
              to={AGENT_POS[q]}
              durationMs={600}
              delayMs={0}
              easing="linear"
            />,
            <Pulse
              key={`d-${p}-${q}-rev-${patternIdx}`}
              from={AGENT_POS[q]}
              to={AGENT_POS[p]}
              durationMs={600}
              delayMs={0}
              easing="linear"
            />,
          ])}
        {pattern === "chain" && (
          <>
            <Pulse
              key={`chain-1-${patternIdx}`}
              from={AGENT_POS.A}
              to={AGENT_POS.B}
              durationMs={400}
              delayMs={0}
            />
            <Pulse
              key={`chain-2-${patternIdx}`}
              from={AGENT_POS.B}
              to={AGENT_POS.C}
              durationMs={400}
              delayMs={500}
            />
          </>
        )}

        {/* Agent boxes — drawn last so pulses sit underneath. */}
        <AgentBox label="MAIN AGENT" x={MAIN_POS.x} y={MAIN_POS.y} dim={mainDimmed} />
        <AgentBox label="AGENT A" x={AGENT_POS.A.x} y={AGENT_POS.A.y} />
        <AgentBox label="AGENT B" x={AGENT_POS.B.x} y={AGENT_POS.B.y} />
        <AgentBox label="AGENT C" x={AGENT_POS.C.x} y={AGENT_POS.C.y} />
      </svg>

      <span
        data-testid="orchestration-pattern-label"
        className="absolute bottom-2 font-mono uppercase tracking-[0.18em] text-copper-300"
        style={{ fontSize: "clamp(0.75rem, 0.95vw, 1rem)" }}
      >
        {PATTERN_LABELS[pattern]}
      </span>
    </div>
  );
}

function AgentBox({
  label,
  x,
  y,
  dim,
}: {
  label: string;
  x: number;
  y: number;
  dim?: boolean;
}) {
  const isMain = label === "MAIN AGENT";
  const w = isMain ? 38 : 26;
  const h = 14;
  return (
    <g opacity={dim ? 0.3 : 1}>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        className={isMain ? "fill-neutral-950 stroke-copper-200" : "fill-neutral-950 stroke-copper-300"}
        strokeWidth={0.6}
      />
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        className="fill-neutral-100 font-mono"
        style={{ fontSize: 4.5, letterSpacing: 0.5 }}
      >
        {label}
      </text>
    </g>
  );
}

function Pulse({
  from,
  to,
  durationMs,
  delayMs,
  easing = "easeOut",
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  durationMs: number;
  delayMs: number;
  easing?: "easeOut" | "easeIn" | "linear";
}) {
  return (
    <motion.circle
      r={2}
      className="fill-copper-300"
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{
        cx: to.x,
        cy: to.y,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: durationMs / 1000,
        delay: delayMs / 1000,
        ease: easing,
        times: [0, 0.1, 0.9, 1],
      }}
    />
  );
}
