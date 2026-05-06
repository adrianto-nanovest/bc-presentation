import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeck } from "@/deck/DeckContext";

interface StepRevealProps {
  // 0-based: child[0] is visible at stepIndex >= 0, child[1] at >= 1, etc.
  children: ReactNode;
}

export function StepReveal({ children }: StepRevealProps) {
  const { stepIndex } = useDeck();
  return (
    <AnimatePresence initial={false}>
      {Children.map(children, (child, i) => {
        const revealed = i <= stepIndex;
        const node = isValidElement(child) ? (
          cloneElement(
            child as React.ReactElement<{ "data-revealed"?: string }>,
            { "data-revealed": String(revealed) },
          )
        ) : (
          child
        );
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: revealed ? "block" : "block" }}
          >
            {node}
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
