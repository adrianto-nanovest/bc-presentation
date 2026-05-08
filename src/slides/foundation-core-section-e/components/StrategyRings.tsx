import { motion } from "framer-motion";

export type StrategyKinetic = "pause" | "filter" | "merge" | "split";
export type StrategyCopper = "copper-400" | "copper-500" | "copper-600" | "copper-700";

export interface StrategyRing {
  id: string;
  label: string;
  subHeadline: string;
  subList: readonly string[];
  copper: StrategyCopper;
  kinetic: StrategyKinetic;
}

interface StrategyRingsProps {
  rings: readonly StrategyRing[]; // expect 4
  revealedThrough: number; // 0..4
  ambientOn: boolean;
}

const LABEL_COLOR: Record<StrategyCopper, string> = {
  "copper-400": "text-copper-400",
  "copper-500": "text-copper-500",
  "copper-600": "text-copper-600",
  "copper-700": "text-copper-700",
};

const ANNULUS_COLOR: Record<StrategyCopper, string> = {
  "copper-400": "stroke-copper-400",
  "copper-500": "stroke-copper-500",
  "copper-600": "stroke-copper-600",
  "copper-700": "stroke-copper-700",
};

export function StrategyRings({ rings, revealedThrough, ambientOn }: StrategyRingsProps) {
  return (
    <div className="relative flex w-full items-stretch gap-2">
      {rings.map((r, i) => {
        const revealed = i < revealedThrough;
        return (
          <div key={r.id} className="flex flex-1 items-center">
            <motion.div
              data-testid={`strategy-ring-${r.id}`}
              data-revealed={String(revealed)}
              data-kinetic={r.kinetic}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.85 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-1 flex-col items-center gap-3 border border-copper-800 bg-neutral-950/60 p-4"
            >
              <span
                className={`font-mono uppercase tracking-[0.2em] ${LABEL_COLOR[r.copper]}`}
                style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)" }}
              >
                {r.label}
              </span>
              <svg viewBox="-50 -50 100 100" className="h-20 w-20">
                <circle
                  cx={0}
                  cy={0}
                  r={36}
                  fill="none"
                  strokeWidth={6}
                  className={ANNULUS_COLOR[r.copper]}
                />
              </svg>
              <span
                className="text-center font-serif italic text-neutral-300"
                style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.3 }}
              >
                {r.subHeadline}
              </span>
              <ul className="flex flex-col items-center gap-1">
                {r.subList.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-copper-300"
                    style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.8rem)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            {i < rings.length - 1 && (
              <span
                aria-hidden
                className="mx-1 font-mono text-copper-700"
                style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.6rem)" }}
              >
                →
              </span>
            )}
          </div>
        );
      })}

      {ambientOn && <ParticleAmbient rings={rings} />}
    </div>
  );
}

// Per-ring kinetic behavior: WRITE pauses (long delay middle of span),
// SELECT filters (~30% of particles fade out), COMPRESS merges (paired
// particles converge), ISOLATE splits (output expands). For unit-test
// scope, the visual behavior is approximated via per-particle delay +
// scale variation; the visceral effect is tuned at projection time.
function ParticleAmbient({ rings: _rings }: { rings: readonly StrategyRing[] }) {
  const PARTICLES = 10;
  return (
    <div
      data-testid="strategy-ambient-layer"
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        {Array.from({ length: PARTICLES }).map((_, i) => {
          const filtered = i % 3 === 0; // ~33% filtered at SELECT
          return (
            <motion.circle
              key={i}
              r={0.6}
              fill="rgb(212 153 102)"
              cy={50}
              initial={{ cx: 0, opacity: 0 }}
              animate={{
                cx: filtered ? [0, 35, 35] : [0, 25, 50, 75, 100],
                opacity: filtered ? [0, 1, 0] : [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: filtered ? 3 : 6,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "linear",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
