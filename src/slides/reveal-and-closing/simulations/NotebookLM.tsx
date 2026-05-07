import { motion } from "framer-motion";

const SUB_AGENTS = [
  "deep-researcher",
  "cross-notebook-query",
  "youtube-curator",
  "drive-scout",
  "url-crawler",
  "brain-compiler",
];

export function NotebookLM() {
  const cx = 550;
  const cy = 280;
  const r = 200;
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1100 560" className="h-full w-full">
        <defs>
          <marker id="nl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        {/* User intent — top */}
        <rect x={cx - 80} y={20} width={160} height={40} fill="none" stroke="#7a4626" strokeWidth="1" />
        <text x={cx} y={45} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">user intent</text>
        <motion.path d={`M ${cx} 60 L ${cx} ${cy - 50}`} stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#nl-arrow)" />
        {/* Center: main NotebookLM agent */}
        {/* Single flat text "NotebookLM agent" so getByText(/NotebookLM agent/i) matches —
            tspan approach collapsed to "NotebookLMagent" in JSDOM without the space. */}
        <motion.circle
          cx={cx} cy={cy} r={50}
          fill="none" stroke="#b86e3d" strokeWidth="1.5"
          animate={{ r: [48, 52, 48] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="14">
          {"NotebookLM agent"}
        </text>
        {/* 6 perimeter sub-agents */}
        {SUB_AGENTS.map((agent, i) => {
          const angle = (i / SUB_AGENTS.length) * Math.PI * 2 - Math.PI / 2;
          const ax = cx + r * Math.cos(angle);
          const ay = cy + r * Math.sin(angle);
          return (
            <g key={agent}>
              <rect x={ax - 90} y={ay - 18} width="180" height="36" fill="none" stroke="#9c5a30" strokeWidth="1" />
              <text x={ax} y={ay + 5} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="12">{agent}</text>
              <motion.path
                d={`M ${cx + 50 * Math.cos(angle)} ${cy + 50 * Math.sin(angle)} L ${ax - 90 * Math.cos(angle) * 0} ${ay}`}
                stroke="#7a4626" strokeWidth="1" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
              {/* Pulse from center to sub-agent */}
              <motion.circle
                r={3} fill="#d99e6c"
                animate={{
                  cx: [cx, ax],
                  cy: [cy, ay],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
              {/* Each sub-agent triggers an MCP-tool subset (drawn as small rect cluster) */}
              <g opacity="0.6">
                {Array.from({ length: 4 }).map((_, j) => (
                  <rect
                    key={j}
                    x={ax - 30 + j * 16}
                    y={ay + (Math.sin(angle) > 0 ? 26 : -36)}
                    width={12} height={6}
                    fill="#9c5a30"
                  />
                ))}
              </g>
            </g>
          );
        })}
        {/* Bottom legend: tool pool */}
        <text x={cx} y={540} textAnchor="middle" fill="#a3a3a3" fontFamily="JetBrains Mono" fontStyle="italic" fontSize="11">
          50+ MCP tools shared across sub-agents
        </text>
      </svg>
    </div>
  );
}
