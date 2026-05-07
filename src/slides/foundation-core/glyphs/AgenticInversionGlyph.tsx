import { motion } from "framer-motion";

interface Props {
  play: boolean;
}

export function AgenticInversionGlyph({ play }: Props) {
  return (
    <div
      data-testid="agentic-glyph"
      data-play={String(play)}
      className="flex flex-col items-center gap-3"
      style={{ width: 280, height: 120 }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="font-mono text-neutral-50"
          style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
          initial={{ opacity: 0 }}
          animate={play ? { opacity: [0, 1, 1, 1, 1] } : { opacity: 1 }}
          transition={{ duration: 2.4, times: [0, 0.25, 0.5, 0.7, 1], delay: 0 }}
        >
          YOU
        </motion.span>
        <motion.svg
          data-testid="agentic-arrow"
          width={120}
          height={24}
          className="overflow-visible"
          animate={play ? { rotate: [0, 0, 180, 180, 180] } : { rotate: 180 }}
          transition={{ duration: 2.4, times: [0, 0.4, 0.7, 0.9, 1], ease: "easeInOut" }}
          style={{ transformOrigin: "60px 12px" }}
        >
          <motion.path
            d="M 4 12 L 108 12 M 100 6 L 108 12 L 100 18"
            stroke="#c98548"
            strokeWidth={1.5}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={play ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 0.4, delay: play ? 0.2 : 0 }}
          />
        </motion.svg>
        <motion.span
          className="font-mono text-neutral-50"
          style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.4, delay: play ? 0.6 : 0 }}
        >
          REPORT
        </motion.span>
      </div>
      <motion.span
        data-testid="agentic-loopback"
        className="font-mono text-copper-400"
        style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.3, delay: play ? 2.1 : 0 }}
      >
        ↻
      </motion.span>
      <motion.span
        className="font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)" }}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.3, delay: play ? 2.1 : 0 }}
      >
        <em className="text-copper-400 italic">reactive</em>
        {" → "}
        <em className="text-copper-400 italic">proactive</em>
      </motion.span>
    </div>
  );
}
