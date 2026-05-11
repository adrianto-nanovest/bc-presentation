// InverseBar — horizontal bar with growth animation, used on B.5's "and
// yet..." reveals (79% adopted / 11% in production / 40% will be cancelled).
import type { CSSProperties, ReactNode } from "react";

export interface InverseBarProps {
  pct: number;            // counter value (visual label)
  label: ReactNode;
  source: string;
  /** Visual bar width in pct (0–100). */
  widthPct: number;
  variant: "primary" | "dim" | "dashed";
  on?: boolean;
}

const variantColor: Record<InverseBarProps["variant"], string> = {
  primary: "var(--copper-400)",
  dim: "var(--copper-300)",
  dashed: "transparent",
};

const variantBorder: Record<InverseBarProps["variant"], string> = {
  primary: "none",
  dim: "none",
  dashed: "1px dashed var(--copper-200)",
};

export function InverseBar({ pct, label, source, widthPct, variant, on = true }: InverseBarProps) {
  const bar: CSSProperties = {
    height: 22,
    width: on ? `${widthPct}%` : "0%",
    background: variantColor[variant],
    border: variantBorder[variant],
    opacity: variant === "dim" ? 0.55 : 1,
    transition: "width 700ms var(--ease)",
  };
  return (
    <div data-testid="inverse-bar" data-variant={variant} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 28,
            color: "var(--copper-200)",
            minWidth: 64,
          }}
        >
          {pct}%
        </span>
        <span style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--neutral-200)" }}>
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "var(--neutral-500)",
            textTransform: "uppercase",
          }}
        >
          {source}
        </span>
      </div>
      <div style={bar} />
    </div>
  );
}
