import { motion } from "framer-motion";

const Box = ({
  x,
  y,
  w,
  h,
  label,
  sub,
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  dashed?: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill="none"
      stroke="#7a4626"
      strokeWidth={dashed ? 1 : 1.2}
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
        y={y + h / 2 + 16}
        textAnchor="middle"
        fill="#a3a3a3"
        fontFamily="Source Serif 4"
        fontStyle="italic"
        fontSize="10"
      >
        {sub}
      </text>
    )}
  </g>
);

export function NanovestProduct() {
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1100 560" className="h-full w-full">
        <defs>
          <marker
            id="np-arrow"
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

        {/* User input */}
        <Box x={40} y={250} w={120} h={50} label="user input" />
        <motion.path
          d="M 160 275 L 220 275"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#np-arrow)"
        />

        {/* Main orchestrator */}
        <Box x={220} y={250} w={160} h={60} label="orchestrator" sub="main agent" />

        {/* Sequential chain: brainstorm → research */}
        <motion.path
          d="M 380 280 L 420 280"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#np-arrow)"
        />
        <Box x={420} y={250} w={130} h={50} label="brainstorm" />
        <motion.path
          d="M 550 275 L 590 275"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#np-arrow)"
        />
        <Box x={590} y={250} w={130} h={50} label="research" />

        {/* Plan reviewer + loop */}
        <motion.path
          d="M 720 275 L 760 275"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#np-arrow)"
        />
        <Box x={760} y={250} w={150} h={50} label="plan-reviewer" sub="loop or proceed" />
        <motion.path
          d="M 835 250 C 800 200 600 200 500 250"
          stroke="#9c5a30"
          strokeWidth="0.9"
          fill="none"
          strokeDasharray="4 4"
          markerEnd="url(#np-arrow)"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* draft-agent + draft-reviewer */}
        <motion.path
          d="M 910 275 L 950 275"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#np-arrow)"
        />
        {/* Label is "draft-agent" (not bare "draft") per spec — avoids regex clash with draft-reviewer */}
        <Box x={950} y={250} w={120} h={50} label="draft-agent" />
        <motion.path
          d="M 1010 300 L 1010 340"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#np-arrow)"
        />
        <Box x={950} y={340} w={120} h={50} label="draft-reviewer" />

        {/* Optional parallel branch (dashed) */}
        <Box x={420} y={400} w={120} h={50} label="Figma" dashed />
        <Box x={560} y={400} w={170} h={50} label="screen-analyzer × N" dashed />
        <Box
          x={750}
          y={400}
          w={170}
          h={50}
          label="flowchart-generator"
          sub="parallel"
          dashed
        />

        {/* Three flowchart tools fanning out */}
        {(["Mermaid", "Excalidraw", "Draw.io"] as const).map((tool, i) => (
          <g key={tool}>
            <rect
              x={760 + i * 100}
              y={470}
              width="90"
              height="32"
              fill="none"
              stroke="#9c5a30"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={805 + i * 100}
              y={490}
              textAnchor="middle"
              fill="#d99e6c"
              fontFamily="JetBrains Mono"
              fontSize="11"
            >
              {tool}
            </text>
            <motion.path
              d={`M 835 450 L ${805 + i * 100} 470`}
              stroke="#7a4626"
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="3 3"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
            />
          </g>
        ))}

        {/* Enrich → validate → publish */}
        <motion.path
          d="M 950 365 L 880 510 L 700 510"
          stroke="#7a4626"
          strokeWidth="0.9"
          fill="none"
        />
        <Box x={550} y={510} w={120} h={36} label="enrich" />
        <motion.path
          d="M 550 528 L 510 528"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#np-arrow)"
        />
        <Box x={390} y={510} w={120} h={36} label="validate" />
        <motion.path
          d="M 390 528 L 350 528"
          stroke="#b86e3d"
          strokeWidth="1.2"
          fill="none"
          markerEnd="url(#np-arrow)"
        />

        {/* Publish targets */}
        {(["Confluence", "Jira", "GDrive"] as const).map((target, i) => (
          <g key={target}>
            <rect
              x={50 + i * 110}
              y={510}
              width="100"
              height="36"
              fill="none"
              stroke="#b86e3d"
              strokeWidth="1.2"
            />
            <text
              x={100 + i * 110}
              y={533}
              textAnchor="middle"
              fill="#f5f5f5"
              fontFamily="Source Serif 4"
              fontSize="13"
            >
              {target}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
