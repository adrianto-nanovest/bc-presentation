// MindsetCard — copper-700 left edge, Inter caps title, Source Serif body.
// Used on C.2 (Multiplier / Co-Pilot / Force-Multiplier) and C.5 beats.
import type { ReactNode } from "react";

export interface MindsetCardProps {
  title: string;
  body: ReactNode;
}

export function MindsetCard({ title, body }: MindsetCardProps) {
  return (
    <div
      data-testid="mindset-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "14px 16px",
        borderLeft: "2px solid var(--copper-700)",
        background: "rgba(10,10,10,0.5)",
        maxWidth: 320,
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--copper-200)",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontSize: 15,
          color: "var(--neutral-200)",
          lineHeight: 1.4,
        }}
      >
        {body}
      </span>
    </div>
  );
}
