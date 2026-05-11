// TierRow — single rung in B.4's tier ladder. Renders model + price + caption
// in a horizontal row.
import type { ReactNode } from "react";

export interface TierRowProps {
  position: "top" | "mid" | "apex";
  model: string;
  price: string;
  caption: ReactNode;
}

const positionTone: Record<TierRowProps["position"], string> = {
  top: "copper-700",
  mid: "copper-500",
  apex: "copper-300",
};

export function TierRow({ position, model, price, caption }: TierRowProps) {
  return (
    <div
      data-testid={`tier-row-${position}`}
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 16,
        padding: "10px 14px",
        borderLeft: `2px solid var(--${positionTone[position]})`,
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--copper-200)",
          textTransform: "uppercase",
          minWidth: 60,
        }}
      >
        {position}
      </span>
      <span
        style={{
          fontFamily: "var(--display)",
          fontSize: 18,
          color: "var(--neutral-50)",
        }}
      >
        {model}
      </span>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          color: "var(--copper-300)",
        }}
      >
        {price}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--neutral-300)",
        }}
      >
        {caption}
      </span>
    </div>
  );
}
