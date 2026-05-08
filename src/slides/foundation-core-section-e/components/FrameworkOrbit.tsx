import { motion } from "framer-motion";

export interface FrameworkTile {
  id: string;
  acronym: string;
  breakdown: string;
  spineHits: readonly number[]; // 1..6 — which spine elements glow on hover
}

interface FrameworkOrbitProps {
  tiles: readonly FrameworkTile[]; // expect 10
  revealed: boolean;
  onHoverChange: (id: string | null) => void;
}

// Loose 5+5 orbit — left column at -1 cluster, right column at +1.
// Vertical offsets are deterministic but staggered to feel organic.
const POSITIONS: { side: "left" | "right"; xPct: number; yPct: number }[] = [
  { side: "left", xPct: -34, yPct: -28 },
  { side: "left", xPct: -42, yPct: -8 },
  { side: "left", xPct: -38, yPct: 18 },
  { side: "left", xPct: -30, yPct: 36 },
  { side: "left", xPct: -22, yPct: -42 },
  { side: "right", xPct: 30, yPct: -36 },
  { side: "right", xPct: 38, yPct: -12 },
  { side: "right", xPct: 42, yPct: 14 },
  { side: "right", xPct: 34, yPct: 32 },
  { side: "right", xPct: 24, yPct: -2 },
];

export function FrameworkOrbit({
  tiles,
  revealed,
  onHoverChange,
}: FrameworkOrbitProps) {
  return (
    <div
      data-testid="framework-orbit"
      data-revealed={String(revealed)}
      className="pointer-events-none absolute inset-0"
    >
      {tiles.map((t, i) => {
        const pos = POSITIONS[i] ?? { xPct: 0, yPct: 0 };
        return (
          <motion.button
            key={t.id}
            type="button"
            data-testid={`framework-tile-${t.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: revealed ? i * 0.03 : 0 }}
            onMouseEnter={() => onHoverChange(t.id)}
            onMouseLeave={() => onHoverChange(null)}
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 border border-copper-800 bg-neutral-950/70 px-4 py-2 font-mono text-neutral-200 hover:border-copper-300 hover:text-copper-200"
            style={{
              left: `calc(50% + ${pos.xPct}vw)`,
              top: `calc(50% + ${pos.yPct}vh)`,
              fontSize: "clamp(0.85rem, 1vw, 1.05rem)",
              letterSpacing: "0.18em",
            }}
            title={t.breakdown}
          >
            {t.acronym}
          </motion.button>
        );
      })}
    </div>
  );
}
