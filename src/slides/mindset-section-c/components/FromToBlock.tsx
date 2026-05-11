// FromToBlock — From: + To: pair. Used on C.1 (lower-right) to set up the
// tool → bridge mindset shift. Scaffolded; later tasks will animate.
import type { ReactNode } from "react";

export interface FromToBlockProps {
  fromLabel: string;
  fromText: ReactNode;
  toLabel: string;
  toText: ReactNode;
}

export function FromToBlock({
  fromLabel,
  fromText,
  toLabel,
  toText,
}: FromToBlockProps) {
  return (
    <div
      data-testid="from-to-block"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 480,
      }}
    >
      <Row label={fromLabel} body={fromText} tone="neutral" />
      <Row label={toLabel} body={toText} tone="copper" />
    </div>
  );
}

function Row({ label, body, tone }: { label: string; body: ReactNode; tone: "neutral" | "copper" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.28em",
          color: tone === "copper" ? "var(--copper-200)" : "var(--neutral-400)",
          textTransform: "uppercase",
        }}
      >
        {label}:
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontSize: 18,
          color: tone === "copper" ? "var(--copper-100)" : "var(--neutral-200)",
          lineHeight: 1.4,
        }}
      >
        {body}
      </span>
    </div>
  );
}
