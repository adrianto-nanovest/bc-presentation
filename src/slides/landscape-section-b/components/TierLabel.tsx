// TierLabel — small uppercase label hanging off a NestedRect's top-right
// corner with a thin copper rule connecting it to the corner. Used on B.2.
//
// Layout strategy:
//   • A wrapper positions itself anchored to the rect's top-right corner.
//   • A short horizontal copper rule (12px) extends right from the corner.
//   • The label sits to the right of the rule, vertically centered with
//     the corner.
//
// The label fades in alongside its rect (controlled by `on`).
import type { CSSProperties, ReactNode } from "react";

export interface TierLabelProps {
  label: string;
  /** Caption shown on hover (1-line popover). */
  caption?: ReactNode;
  /** Position of the rect's top-right corner relative to slide origin. */
  topRight: { x: number; y: number };
  on?: boolean;
  delay?: number;
  /** Tier 5 (innermost) gets brighter copper. */
  bright?: boolean;
}

const RULE_LEN = 14;
const RULE_GAP = 6;

export function TierLabel({
  label,
  caption,
  topRight,
  on = true,
  delay = 0,
  bright = false,
}: TierLabelProps) {
  const labelColor = bright ? "var(--copper-200)" : "var(--copper-300)";
  const ruleColor = bright ? "var(--copper-400)" : "var(--copper-600)";

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    left: topRight.x,
    top: topRight.y,
    display: "flex",
    alignItems: "center",
    gap: RULE_GAP,
    transform: "translateY(-50%)",
    opacity: on ? 1 : 0,
    transition: "opacity 380ms var(--ease)",
    transitionDelay: on ? `${delay}ms` : "0ms",
    pointerEvents: caption ? "auto" : "none",
  };

  return (
    <div data-testid="tier-label" data-on={on ? "1" : "0"} style={wrapperStyle}>
      {/* Thin copper rule connecting box corner → label */}
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: RULE_LEN,
          height: 1,
          background: ruleColor,
          flexShrink: 0,
          transform: on ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left center",
          transition: "transform 380ms var(--ease)",
          transitionDelay: on ? `${delay + 60}ms` : "0ms",
        }}
      />
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10.5,
          letterSpacing: "0.24em",
          color: labelColor,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          lineHeight: 1.1,
        }}
      >
        {label}
      </span>
    </div>
  );
}
