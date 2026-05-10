import { motion } from "framer-motion";

interface Props {
  play: boolean;
}

const DAYS = ["M", "T", "W", "T", "F", "S"];

export function RpaAccelerationGlyph({ play }: Props) {
  // Tick-dot positions across the time-bar: evenly spaced over the 260px width.
  const tickXs = DAYS.map((_, i) => 12 + i * (236 / (DAYS.length - 1)));

  return (
    <div
      data-testid="rpa-glyph"
      data-play={String(play)}
      className="flex flex-col items-center gap-4"
      style={{ width: 280, height: 140 }}
    >
      <div className="relative" style={{ width: 260, height: 32 }}>
        <motion.svg width={260} height={32} className="overflow-visible">
          <motion.line
            data-testid="rpa-timebar"
            x1={4}
            y1={16}
            x2={256}
            y2={16}
            stroke="#7a4626"
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            animate={play ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: play ? 0.3 : 0, ease: "easeOut" }}
          />
          {tickXs.map((x, i) => (
            <motion.circle
              key={i}
              data-testid="rpa-tick"
              cx={x}
              cy={16}
              r={4}
              fill="#c98548"
              initial={{ opacity: 0 }}
              animate={
                play
                  ? { opacity: [0, 1, 1, 0], cx: [x, x, x, 130] }
                  : { opacity: 1 }
              }
              transition={{
                duration: play ? 2.0 : 0,
                times: play ? [0, 0.3, 0.6, 1] : undefined,
                delay: play ? 0.3 + i * 0.08 : 0,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.svg>
      </div>
      <span className="font-mono uppercase tracking-[0.18em] text-copper-300" style={{ fontSize: "0.85rem" }}>
        MANUAL · 6 hours / week
      </span>
      <motion.svg
        data-testid="rpa-bolt"
        width={48}
        height={64}
        className="overflow-visible"
        initial={{ opacity: 0, scale: 0 }}
        animate={play ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: play ? 2.0 : 0, ease: [0.7, 0, 0.3, 1] }}
      >
        <motion.path
          d="M 24 4 L 12 32 L 22 32 L 16 60 L 36 28 L 26 28 Z"
          fill="#c98548"
          stroke="#d99e6c"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : { pathLength: 1 }}
          transition={{ duration: 0.2, delay: play ? 2.0 : 0 }}
        />
      </motion.svg>
      <span className="font-mono uppercase tracking-[0.18em] text-copper-300" style={{ fontSize: "0.85rem" }}>
        BOT · instant
      </span>
    </div>
  );
}
