import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

interface HoverRevealProps {
  trigger: ReactNode;
  payload: ReactNode;
  // Where to position the payload relative to the trigger.
  position?: "below" | "above" | "right";
}

export function HoverReveal({
  trigger,
  payload,
  position = "below",
}: HoverRevealProps) {
  const [hover, setHover] = useState(false);
  const offset =
    position === "above"
      ? "-top-4 -translate-y-full"
      : position === "right"
        ? "left-full ml-4 top-0"
        : "top-full mt-4 left-0";
  return (
    <span
      data-testid="hover-root"
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {trigger}
      <motion.span
        data-testid="hover-payload"
        data-revealed={String(hover)}
        className={`pointer-events-none absolute z-30 block ${offset}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {payload}
      </motion.span>
    </span>
  );
}
