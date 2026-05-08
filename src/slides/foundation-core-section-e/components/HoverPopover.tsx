import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

type Position = "auto" | "below" | "above" | "right" | "left";

interface HoverPopoverProps {
  trigger: ReactNode;
  payload: ReactNode;
  position?: Position; // "auto" picks below by default; explicit positions override.
}

const offsetClass: Record<Exclude<Position, "auto">, string> = {
  below: "top-full mt-3 left-1/2 -translate-x-1/2",
  above: "bottom-full mb-3 left-1/2 -translate-x-1/2",
  right: "left-full ml-3 top-1/2 -translate-y-1/2",
  left: "right-full mr-3 top-1/2 -translate-y-1/2",
};

export function HoverPopover({
  trigger,
  payload,
  position = "auto",
}: HoverPopoverProps) {
  const [hover, setHover] = useState(false);
  const resolved: Exclude<Position, "auto"> = position === "auto" ? "below" : position;
  return (
    <span
      data-testid="hover-popover-root"
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {trigger}
      <motion.span
        data-testid="hover-popover-payload"
        data-revealed={String(hover)}
        data-position={resolved}
        className={`pointer-events-none absolute z-30 block min-w-[18rem] max-w-[28rem] border border-copper-700 bg-neutral-950/95 p-4 shadow ${offsetClass[resolved]}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {payload}
      </motion.span>
    </span>
  );
}
