import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

type TooltipPosition = "right" | "below" | "above" | "left";

export interface HintIconProps {
  text?: string;
  position?: TooltipPosition;
}

const DEFAULT_TEXT = "Hover each card for details, click to pin/unpin.";

export function HintIcon({
  text = DEFAULT_TEXT,
  position = "right",
}: HintIconProps) {
  const [hover, setHover] = useState(false);
  return (
    <span
      data-testid="hint-icon"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        paddingTop: 7,
        paddingBottom: 5,
        cursor: "help",
        color: "var(--copper-400)",
      }}
    >
      <motion.span
        animate={
          hover
            ? { scale: 1.1, opacity: 1 }
            : { scale: [1, 1.18, 1], opacity: [0.65, 1, 0.65] }
        }
        transition={
          hover
            ? { duration: 0.18, ease: "easeOut" }
            : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ display: "inline-flex" }}
      >
        <Info size={14} strokeWidth={2} aria-hidden />
      </motion.span>
      <div style={tooltipAnchor(position)}>
        <motion.span
          data-testid="hint-tooltip"
          data-revealed={String(hover)}
          initial={false}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 11,
            lineHeight: 1.4,
            color: "white",
            background: "rgba(15, 15, 15, 0.96)",
            border: "1px solid var(--copper-700)",
            padding: "5px 9px",
            borderRadius: 2,
          }}
        >
          {text}
        </motion.span>
      </div>
    </span>
  );
}

function tooltipAnchor(position: TooltipPosition) {
  const base = {
    position: "absolute" as const,
    pointerEvents: "none" as const,
    zIndex: 100,
  };
  switch (position) {
    case "right":
      return {
        ...base,
        left: "calc(100% + 8px)",
        top: "50%",
        transform: "translateY(-50%)",
      };
    case "left":
      return {
        ...base,
        right: "calc(100% + 8px)",
        top: "50%",
        transform: "translateY(-50%)",
      };
    case "below":
      return {
        ...base,
        top: "calc(100% + 8px)",
        left: 0,
      };
    case "above":
      return {
        ...base,
        bottom: "calc(100% + 8px)",
        left: 0,
      };
  }
}
