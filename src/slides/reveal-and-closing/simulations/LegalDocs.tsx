import { motion } from "framer-motion";

const node = (
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  sub?: string,
  dashed?: boolean,
  accent = "#7a4626"
) => (
  <g key={`${x}-${y}-${label}`}>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill="none"
      stroke={accent}
      strokeWidth="1.2"
      strokeDasharray={dashed ? "4 4" : undefined}
    />
    <text
      x={x + w / 2}
      y={y + h / 2 + 2}
      textAnchor="middle"
      fill="#f5f5f5"
      fontFamily="Source Serif 4"
      fontSize="13"
    >
      {label}
    </text>
    {sub && (
      <text
        x={x + w / 2}
        y={y + h / 2 + 18}
        textAnchor="middle"
        fill="#a3a3a3"
        fontFamily="Source Serif 4"
        fontStyle="italic"
        fontSize="11"
      >
        {sub}
      </text>
    )}
  </g>
);

export function LegalDocs() {
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1100 540" className="h-full w-full">
        <defs>
          <marker
            id="ld-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>

        {/* Dual entry */}
        {node(40, 30, 180, 50, "/nanoearn", "Slack Admin Portal")}
        {node(40, 110, 180, 50, "webhook", "external trigger")}
        <motion.path
          d="M 220 55 L 320 100 M 220 135 L 320 110"
          stroke="#7a4626"
          strokeWidth="1"
          fill="none"
          markerEnd="url(#ld-arrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Cache → folder structure → doc gen */}
        {node(320, 80, 130, 50, "cache")}
        {node(480, 80, 150, 50, "folder structure")}
        {node(660, 80, 140, 50, "doc gen", "Google Docs")}
        <motion.path
          d="M 450 105 L 480 105 M 630 105 L 660 105 M 800 105 L 850 220"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#ld-arrow)"
        />

        {/* Slack approval bubble */}
        {node(820, 200, 180, 60, "Slack approval", "interactive bubble")}
        <motion.path
          d="M 910 260 L 910 300"
          stroke="#7a4626"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#ld-arrow)"
        />

        {/* Finance gate */}
        {node(820, 300, 180, 60, "Finance gate", "approve / decline")}

        {/* Decline loop → AI Revision Agent */}
        {node(560, 320, 220, 60, "AI Revision Agent", "Gemini 2.5 Pro", true, "#9c5a30")}
        <motion.path
          d="M 820 340 C 700 360 700 360 780 350"
          stroke="#9c5a30"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="6 4"
          markerEnd="url(#ld-arrow)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <text
          x="700"
          y="310"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="11"
        >
          on decline
        </text>
        <motion.path
          d="M 670 320 C 700 280 800 280 820 300"
          stroke="#7a4626"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
          markerEnd="url(#ld-arrow)"
        />

        {/* Approve → Legal gate */}
        <motion.path
          d="M 910 360 L 910 410"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#ld-arrow)"
        />
        {node(820, 410, 180, 60, "Legal gate", "approve / decline")}

        {/* Legal decline loop also goes back to AI Revision (drawn as a faint backward arc) */}
        <motion.path
          d="M 820 440 C 600 470 500 420 670 380"
          stroke="#9c5a30"
          strokeWidth="0.8"
          fill="none"
          strokeDasharray="3 3"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Dropbox Sign + completion */}
        <motion.path
          d="M 910 470 L 910 510"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#ld-arrow)"
        />
        {node(820, 500, 180, 30, "Dropbox Sign")}
        <motion.path
          d="M 1000 515 L 1060 515"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#ld-arrow)"
        />
        <text
          x="1080"
          y="520"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="11"
        >
          webhook out
        </text>
      </svg>
    </div>
  );
}
