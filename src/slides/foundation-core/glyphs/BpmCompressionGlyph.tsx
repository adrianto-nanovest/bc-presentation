import { motion } from "framer-motion";
import { CountUp } from "../components/CountUp";

interface BpmCompressionGlyphProps {
  play: boolean;
}

const TOP_COUNT = 20;
const BOTTOM_COUNT = 8;
const TOP_SIZE = 10;
const TOP_GAP = 4;
const BOTTOM_SIZE = 14;
const BOTTOM_GAP = 6;

export function BpmCompressionGlyph({ play }: BpmCompressionGlyphProps) {
  // Each top square aligns to a bottom merger point. We assign each top
  // square to a bottom slot by integer division.
  const totalTopWidth = TOP_COUNT * TOP_SIZE + (TOP_COUNT - 1) * TOP_GAP;
  const totalBottomWidth = BOTTOM_COUNT * BOTTOM_SIZE + (BOTTOM_COUNT - 1) * BOTTOM_GAP;

  return (
    <div
      data-testid="bpm-glyph"
      data-play={String(play)}
      className="relative flex flex-col items-center gap-6"
      style={{ width: 280, height: 140 }}
    >
      <div className="relative flex" style={{ gap: TOP_GAP, width: totalTopWidth }}>
        {Array.from({ length: TOP_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            data-testid="bpm-top-square"
            className="bg-copper-700"
            style={{ width: TOP_SIZE, height: TOP_SIZE }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              play
                ? {
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0.6],
                    y: [0, 0, 0, 60],
                  }
                : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: play ? 2.0 : 0,
              times: play ? [0, 0.3, 0.4, 1] : undefined,
              delay: play ? i * 0.03 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>
      <div className="relative flex" style={{ gap: BOTTOM_GAP, width: totalBottomWidth }}>
        {Array.from({ length: BOTTOM_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            data-testid="bpm-bottom-square"
            className="bg-copper-400"
            style={{ width: BOTTOM_SIZE, height: BOTTOM_SIZE }}
            initial={{ opacity: 0, scale: 0 }}
            animate={play ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: play ? 0.8 + i * 0.05 : 0,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
      <span
        data-testid="bpm-counter"
        className="font-mono uppercase tracking-[0.18em] text-copper-300"
        style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
      >
        STEPS · {play ? <CountUp from={20} to={8} durationMs={1200} /> : "8"}
      </span>
    </div>
  );
}
