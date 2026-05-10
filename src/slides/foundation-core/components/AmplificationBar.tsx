import { motion } from "framer-motion";
import { CountUp } from "./CountUp";

interface AmplificationBarProps {
  fromPct: number;          // starting width as percent of slot
  toPct: number;            // target width (>100% intentional for "machine")
  counterTo: number;        // integer endpoint for the inline counter (e.g. 1, 1000)
  offFrame: boolean;        // copper-glow gradient at right edge during final 300ms
  label: string;            // e.g. "manual pace", "machine pace"
  durationMs?: number;
  delayMs?: number;
}

export function AmplificationBar({
  fromPct,
  toPct,
  counterTo,
  offFrame,
  label,
  durationMs = 1200,
  delayMs = 0,
}: AmplificationBarProps) {
  // The "machine" bar visually exceeds the slot; we render it inside an
  // overflow-visible track so the off-frame glow can extend past the edge.
  return (
    <div
      data-testid="amplification-bar"
      className="relative flex w-full flex-col gap-2"
    >
      <div className="flex items-baseline justify-between font-mono text-copper-300" style={{ fontSize: "1rem" }}>
        <span className="font-sans uppercase tracking-[0.18em] text-copper-400" style={{ fontSize: "0.75rem" }}>{label}</span>
        <span data-testid="amplification-bar-counter">
          <CountUp from={0} to={counterTo} durationMs={durationMs} />
          <span className="ml-0.5">×</span>
        </span>
      </div>
      <div className="relative h-2 w-full overflow-visible bg-neutral-800">
        <motion.div
          data-testid="amplification-bar-fill"
          data-from-pct={fromPct}
          data-to-pct={toPct}
          className={offFrame ? "h-full bg-copper-500" : "h-full bg-copper-700"}
          initial={{ width: `${fromPct}%` }}
          animate={{ width: `${toPct}%` }}
          transition={{
            duration: durationMs / 1000,
            delay: delayMs / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: "left center" }}
        />
        {offFrame && (
          <motion.div
            data-testid="amplification-offframe-glow"
            className="pointer-events-none absolute right-0 top-1/2 h-8 w-32 -translate-y-1/2"
            style={{
              background:
                "linear-gradient(90deg, rgba(217,158,108,0) 0%, rgba(217,158,108,0.55) 60%, rgba(217,158,108,0.95) 100%)",
              filter: "blur(8px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: (delayMs + durationMs - 300) / 1000,
              ease: "easeOut",
            }}
          />
        )}
      </div>
    </div>
  );
}
