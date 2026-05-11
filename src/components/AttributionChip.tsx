// AttributionChip — small uppercase Inter chip pinned to the bottom-right
// corner of a slide. Used by the Title slide to credit "Adri · Nanovest".
//
// Scaffolded; later tasks may add a copper hairline / icon.
import type { CSSProperties } from "react";

export interface AttributionChipProps {
  text: string;
  /** Override default bottom-right placement. */
  style?: CSSProperties;
}

export function AttributionChip({ text, style }: AttributionChipProps) {
  const base: CSSProperties = {
    position: "absolute",
    right: 48,
    bottom: 28,
    fontFamily: "var(--mono)",
    fontSize: 12,
    letterSpacing: "0.22em",
    color: "var(--copper-400)",
    textTransform: "uppercase",
    zIndex: 25,
    ...style,
  };
  return (
    <div data-testid="attribution-chip" style={base}>
      {text}
    </div>
  );
}
