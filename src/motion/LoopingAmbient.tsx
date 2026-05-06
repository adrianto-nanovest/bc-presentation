import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface LoopingAmbientProps {
  children: ReactNode;
  // Animate one or more transformable properties on a continuous loop.
  // Default: gentle vertical drift suitable for hero-photography overlays.
  durationSeconds?: number;
}

export function LoopingAmbient({
  children,
  durationSeconds = 12,
}: LoopingAmbientProps) {
  return (
    <motion.div
      data-testid="loop"
      data-loop="true"
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: durationSeconds,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
