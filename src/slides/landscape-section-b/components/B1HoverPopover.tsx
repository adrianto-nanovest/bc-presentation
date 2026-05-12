// B1HoverPopover — compact hover detail strip for B.1's evolution timeline.
//
// Always-mounted placeholder (opacity 0 + pointer-events:none) so the layout
// never jumps; fades in with full content when an era is hovered.
//
// Three-column grid (240px · 1fr · 1fr) with explicit subheadings on every
// field so the audience can tell what each chunk of text represents:
//   COLUMN 1  ERA              → label + title + year range
//   COLUMN 2  WHAT IT DOES     → concise verb-led caption
//   COLUMN 3  SIGNATURE ARTIFACT (top) + REAL-WORLD EQUIVALENT (bottom)
import type { CSSProperties, ReactNode } from "react";

export interface B1HoverPopoverEra {
  label: string;
  title: string;
  years: string;
  caption: ReactNode;
  signatureArtifact: string;
  realWorldEquivalent: string;
  /** Slight dim tint for AGI variant (still copper-keyed, just softer). */
  dim?: boolean;
}

export interface B1HoverPopoverProps {
  era: B1HoverPopoverEra | null;
}

export function B1HoverPopover({ era }: B1HoverPopoverProps) {
  const accent = era?.dim ? "var(--copper-700)" : "var(--copper-400)";
  const accentSoft = era?.dim ? "var(--copper-700)" : "var(--copper-300)";

  const containerStyle: CSSProperties = {
    position: "relative",
    height: "100%",
    border: era ? `1px solid ${accent}` : "1px solid transparent",
    background: era
      ? "linear-gradient(180deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 100%)"
      : "transparent",
    padding: "12px 18px",
    display: "grid",
    gridTemplateColumns: "240px 1fr 1fr",
    columnGap: 22,
    alignItems: "center",
    opacity: era ? 1 : 0,
    transform: era ? "translateY(0)" : "translateY(6px)",
    transition:
      "opacity 200ms var(--ease), transform 220ms var(--ease), border-color 200ms var(--ease), background 200ms var(--ease)",
  };

  const subheadingStyle: CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: 10,
    letterSpacing: "0.22em",
    color: accentSoft,
    textTransform: "uppercase",
  };

  return (
    <div
      data-testid={era ? "b1-popover-active" : "b1-popover-empty"}
      style={containerStyle}
    >
      {/* COLUMN 1 — ERA */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderLeft: `1px solid ${accent}`,
          paddingLeft: 12,
        }}
      >
        <span style={subheadingStyle}>{era ? "Era" : " "}</span>
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 18,
            color: "var(--neutral-50)",
            lineHeight: 1.1,
          }}
        >
          {era ? era.title : " "}
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "var(--neutral-400)",
            textTransform: "uppercase",
          }}
        >
          {era ? era.years : " "}
        </span>
      </div>

      {/* COLUMN 2 — WHAT IT DOES */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          borderLeft: `1px solid ${accent}`,
          paddingLeft: 16,
        }}
      >
        <span style={subheadingStyle}>{era ? "What it does" : " "}</span>
        <span
          data-testid="b1-popover-caption"
          style={{
            fontFamily: "var(--serif)",
            fontSize: 13,
            color: "var(--neutral-100)",
            lineHeight: 1.4,
          }}
        >
          {era ? era.caption : " "}
        </span>
      </div>

      {/* COLUMN 3 — SIGNATURE ARTIFACT + REAL-WORLD EQUIVALENT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          borderLeft: `1px solid ${accent}`,
          paddingLeft: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={subheadingStyle}>
            {era ? "Signature artifact" : " "}
          </span>
          <span
            data-testid="b1-popover-artifact"
            style={{
              fontFamily: "var(--serif)",
              fontSize: 12,
              color: "var(--neutral-100)",
              lineHeight: 1.35,
            }}
          >
            {era ? era.signatureArtifact : " "}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={subheadingStyle}>
            {era ? "Real-world equivalent" : " "}
          </span>
          <span
            data-testid="b1-popover-equivalent"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 12,
              color: "var(--neutral-300)",
              lineHeight: 1.35,
            }}
          >
            {era ? era.realWorldEquivalent : " "}
          </span>
        </div>
      </div>
    </div>
  );
}
