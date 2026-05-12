// CapabilityChip — bordered uppercase chip used on A.1 step 0 in the
// horizontal row. Hover lifts border + tints background, matching the E.1
// tag-chip register. The label is deliberately generic (e.g. AI CHATBOT,
// GEOSPATIAL AI) — never a winner's project name (audience-respect rule).
import { useState, type CSSProperties } from "react";

export interface CapabilityChipProps {
  label: string;
  style?: CSSProperties;
}

export function CapabilityChip({ label, style }: CapabilityChipProps) {
  const [hovered, setHovered] = useState(false);

  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--mono)",
    fontWeight: 500,
    fontSize: 12,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    padding: "10px 16px",
    border: `1px solid ${hovered ? "var(--copper-200)" : "var(--copper-700)"}`,
    background: hovered ? "rgba(217,158,108,0.08)" : "rgba(10,10,10,0.4)",
    color: hovered ? "var(--copper-100)" : "var(--neutral-200)",
    lineHeight: 1,
    whiteSpace: "nowrap",
    cursor: "default",
    transition: "all 200ms var(--ease)",
    ...style,
  };

  return (
    <span
      data-testid="capability-chip"
      data-hovered={hovered ? "true" : "false"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={base}
    >
      {label}
    </span>
  );
}
