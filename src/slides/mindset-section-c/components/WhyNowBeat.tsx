// WhyNowBeat — Inter caps label + Source Serif caption. Used on C.5 for the
// 4 trajectory beats (Competitive / Capacity / Cultural / Personal).
import type { ReactNode } from "react";

export interface WhyNowBeatProps {
  label: string;
  caption: ReactNode;
}

export function WhyNowBeat({ label, caption }: WhyNowBeatProps) {
  return (
    <div
      data-testid="why-now-beat"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "8px 0",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.28em",
          color: "var(--copper-200)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontSize: 16,
          color: "var(--neutral-200)",
          lineHeight: 1.4,
        }}
      >
        {caption}
      </span>
    </div>
  );
}
