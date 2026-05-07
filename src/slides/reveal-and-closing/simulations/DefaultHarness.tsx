import { motion } from "framer-motion";
import { highlight } from "@/components/highlight";

// Generic harness diagram: main agent (centered), 2 chains (sub-agents), 2 tools.
export function DefaultHarness() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-8 py-8">
      <svg width="640" height="360" viewBox="0 0 640 360" className="overflow-visible">
        <defs>
          <marker id="def-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        {/* Main agent box */}
        <motion.rect
          x="220"
          y="40"
          width="200"
          height="60"
          fill="none"
          stroke="#b86e3d"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <text x="320" y="65" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="18">MAIN AGENT</text>
        <text x="320" y="88" textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="14">orchestrator</text>
        {/* Connectors down to sub-agents and tools (4 outputs). */}
        {[200, 270, 370, 440].map((x, i) => (
          <motion.path
            key={i}
            d={`M 320 100 L ${x} 200`}
            stroke="#7a4626"
            strokeWidth="1.2"
            fill="none"
            markerEnd="url(#def-arrow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
          />
        ))}
        {/* Pulse traveling along all four connectors continuously. */}
        {[200, 270, 370, 440].map((x, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="3"
            fill="#d99e6c"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [320, x],
              cy: [100, 200],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* 2 sub-agents (left) */}
        {[180, 250].map((x, i) => (
          <g key={`sub-${i}`}>
            <rect x={x - 30} y="200" width="60" height="44" fill="none" stroke="#9c5a30" strokeWidth="1.2" />
            <text x={x} y="220" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">sub</text>
            <text x={x} y="236" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">agent</text>
          </g>
        ))}
        {/* 2 tools (right) — drawn as bracketed mono-style labels */}
        {[370, 440].map((x, i) => (
          <text key={`tool-${i}`} x={x} y="225" textAnchor="middle" fill="#d99e6c" fontFamily="JetBrains Mono" fontSize="14">[tool]</text>
        ))}
        {/* Labels */}
        <text x="220" y="160" fill="#a3a3a3" fontFamily="JetBrains Mono" fontSize="11">chains</text>
        <text x="400" y="160" fill="#a3a3a3" fontFamily="JetBrains Mono" fontSize="11">tools</text>
      </svg>
      <p
        className="font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.3rem)" }}
      >
        {highlight("The harness pattern / Five expressions follow", ["The harness pattern", "Five expressions follow"])}
      </p>
    </div>
  );
}
