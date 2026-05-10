import { motion } from "framer-motion";

interface Props {
  play: boolean;
}

// Bar widths chosen for visual heterogeneity per spec §4.3.1.
const BAR_WIDTHS = [40, 96, 56, 120, 72, 48, 104, 64];
const STRENGTHS = ["summarization", "analysis", "generation", "NLU"];

export function IpaSynthesisGlyph({ play }: Props) {
  return (
    <div
      data-testid="ipa-glyph"
      data-play={String(play)}
      className="flex items-center gap-6"
      style={{ width: 320, height: 160 }}
    >
      {/* Left: 8 raw bars */}
      <div className="flex flex-col gap-1.5">
        {BAR_WIDTHS.map((w, i) => (
          <motion.div
            key={i}
            data-testid="ipa-bar"
            className="h-1 bg-copper-700"
            initial={{ width: 0 }}
            animate={
              play
                ? { width: [0, w, w, 0] }
                : { width: w }
            }
            transition={{
              duration: play ? 2.4 : 0,
              times: play ? [0, 0.16, 0.6, 1] : undefined,
              delay: play ? i * 0.06 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "left center" }}
          />
        ))}
      </div>
      {/* Middle: 2x2 grid of core strengths */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-copper-300" style={{ fontSize: "0.7rem" }}>
        {STRENGTHS.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0 }}
            animate={play ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.3, delay: play ? 0.8 + i * 0.12 : 0, ease: "easeOut" }}
          >
            {s}
          </motion.span>
        ))}
      </div>
      {/* Right: insight pulse */}
      <motion.svg
        data-testid="ipa-insight"
        width={56}
        height={56}
        className="overflow-visible"
        initial={{ opacity: 0, scale: 0 }}
        animate={play ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: play ? 2.4 : 0, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <filter id="ipa-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <circle cx={28} cy={28} r={14} fill="#c98548" filter="url(#ipa-glow)" opacity={0.7} />
        <circle cx={28} cy={28} r={14} fill="#c98548" />
      </motion.svg>
    </div>
  );
}
