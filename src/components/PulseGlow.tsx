import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PulseGlowProps {
  children: ReactNode;
  periodSeconds?: number; // full cycle duration (60 → 100 → 60)
  intensity?: "subtle" | "strong";
}

export function PulseGlow({
  children,
  periodSeconds = 5,
  intensity = "subtle",
}: PulseGlowProps) {
  const minOpacity = intensity === "subtle" ? 0.6 : 0.45;
  const shadowMax =
    intensity === "subtle"
      ? "0 0 18px rgba(184,110,61,0.55)"
      : "0 0 32px rgba(184,110,61,0.85)";
  return (
    <motion.span
      data-testid="pulse-glow"
      data-period={periodSeconds}
      className="inline-block"
      animate={{
        opacity: [minOpacity, 1, minOpacity],
        textShadow: ["none", shadowMax, "none"],
      }}
      transition={{
        duration: periodSeconds,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
}
