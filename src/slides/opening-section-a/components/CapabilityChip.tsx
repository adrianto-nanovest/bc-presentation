// CapabilityChip — uppercase chip with a copper-700 1px left-edge stop.
// Used on A.1 to mark each "capability you've already seen". The label
// is deliberately generic (e.g. AI CHATBOT, GEOSPATIAL AI) — never a
// winner's project name (audience-respect rule, see user memory).
//
// Visual register: Inter ~14px caps, 0.18em tracking, neutral-300; the
// left-edge stop is the only ornament. No fill, no hover lift — the chip
// is a passive marker, not interactive.
import type { CSSProperties } from "react";

export interface CapabilityChipProps {
  label: string;
  /** Optional extra style overrides. */
  style?: CSSProperties;
}

export function CapabilityChip({ label, style }: CapabilityChipProps) {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--sans)",
    fontWeight: 500,
    fontSize: 12,
    letterSpacing: "0.18em",
    color: "var(--neutral-300)",
    textTransform: "uppercase",
    padding: "6px 0 6px 12px",
    borderLeft: "1px solid var(--copper-700)",
    lineHeight: 1,
    whiteSpace: "nowrap",
    ...style,
  };
  return (
    <span data-testid="capability-chip" style={base}>
      {label}
    </span>
  );
}
