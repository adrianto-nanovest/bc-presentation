import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { PitfallIllustration, type PitfallKind } from "./PitfallIllustration";

interface PitfallCanvasProps {
  activeKind: PitfallKind | null;
  defaultIllustration: ReactNode;
}

export function PitfallCanvas({ activeKind, defaultIllustration }: PitfallCanvasProps) {
  const showDefault = activeKind === null;
  return (
    <div
      data-testid="pitfall-canvas"
      data-active={activeKind ?? "default"}
      className="relative h-full w-full"
    >
      <AnimatePresence mode="wait">
        {showDefault ? (
          <motion.div
            key="default"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            {defaultIllustration}
          </motion.div>
        ) : (
          <motion.div
            key={activeKind}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <PitfallIllustration kind={activeKind} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
