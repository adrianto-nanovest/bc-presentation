import { motion } from "framer-motion";

type Direction = "down" | "forward" | "loopBack";

interface StepConnectorProps {
  direction: Direction;
  label?: string;
  ambient?: "forward" | "backward"; // optional traveling-pulse ambient (J.4)
  width?: number;
  height?: number;
}

export function StepConnector({
  direction,
  label,
  ambient,
  width = 120,
  height = 60,
}: StepConnectorProps) {
  // Path data per direction. Coordinates kept simple — slides can scale via container width.
  const paths: Record<Direction, string> = {
    down: `M ${width / 2} 4 L ${width / 2} ${height - 8}`,
    forward: `M 4 ${height / 2} L ${width - 8} ${height / 2}`,
    // Loop-back: from right-side card down/under and back to the left-side card.
    loopBack: `M ${width - 8} 4 C ${width - 8} ${height - 4} 8 ${height - 4} 8 4`,
  };
  const arrowMark =
    direction === "loopBack" ? "url(#arrowhead-back)" : "url(#arrowhead)";
  return (
    <div
      data-testid="step-connector"
      data-direction={direction}
      data-ambient={ambient ?? ""}
      className="relative flex items-center justify-center"
      style={{ width, height }}
    >
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
          <marker
            id="arrowhead-back"
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 10 0 L 0 5 L 10 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        <motion.path
          d={paths[direction]}
          fill="none"
          stroke="#b86e3d"
          strokeWidth={1.5}
          markerEnd={arrowMark}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
        {ambient === "backward" && (
          // Traveling pulse: a short bright segment that loops along the
          // path in the BACKWARD direction. Animates strokeDashoffset.
          <motion.path
            d={paths[direction]}
            fill="none"
            stroke="#d99e6c"
            strokeWidth={2.5}
            strokeDasharray="14 200"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 214 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
      {label && (
        <span
          className="absolute font-sans italic text-copper-300"
          style={{
            fontSize: "clamp(0.85rem, 1vw, 1.1rem)",
            top: direction === "down" ? "50%" : `${height + 4}px`,
            left: direction === "down" ? `${width / 2 + 12}px` : "50%",
            transform:
              direction === "down" ? "translateY(-50%)" : "translateX(-50%)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
