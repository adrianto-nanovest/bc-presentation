import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface LightPanelProps {
  title: string;
  body: ReactNode;
}

// Glyph-choreographed entry per huashu-design-demos-ideation.md §3:
// stagger 4 ornament glyphs in over ~640ms (4 × 80ms), then title (delay 400ms),
// then body (delay 550ms). Total entry choreography ~950ms.
const GLYPHS = ["▢", "◇", "─", "·"];

export function LightPanel({ title, body }: LightPanelProps) {
  return (
    <div data-testid="light-panel" className="relative flex h-full flex-col items-start justify-center gap-6 px-12 py-12">
      <div className="absolute right-12 top-12 flex gap-3">
        {GLYPHS.map((g, i) => (
          <motion.span
            key={i}
            className="font-mono text-copper-700"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.5rem)" }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.08 }}
          >
            {g}
          </motion.span>
        ))}
      </div>
      <motion.h3
        className="font-display text-neutral-50"
        style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.75rem)", lineHeight: 1.2 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        {title}
      </motion.h3>
      <motion.div
        className="font-serif text-neutral-300"
        style={{ fontSize: "clamp(1.05rem, 1.35vw, 1.5rem)", lineHeight: 1.5 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
      >
        {body}
      </motion.div>
    </div>
  );
}
