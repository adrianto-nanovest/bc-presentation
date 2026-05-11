// Right-side detail panel for slide D.2 step 0 — renders the hovered card's
// details (chip → big subName headline → italic tagline → copper rule →
// bullets → analogy footer). When `data` is null the panel renders nothing
// so the right column reads as blank by default.
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:316-364`.
import type { CSSProperties } from "react";
import { highlight as KW } from "../../../components/highlight";
import { CopperRule } from "../../foundation-core-section-e/components/Reveal";
import type { D2Card } from "../content";

export interface D2DetailPanelProps {
  data: D2Card | null;
}

export function D2DetailPanel({ data }: D2DetailPanelProps) {
  if (!data) return null;
  const accent = `var(--${data.copper})`;

  const panelStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${accent}`,
    background: "rgba(20,12,6,0.72)",
    boxShadow: `0 0 0 1px ${accent} inset, 0 0 40px -16px ${accent}`,
    padding: "24px 28px",
  };

  return (
    <div data-testid="d2-detail-panel" data-key={data.key} style={panelStyle}>
      {/* Abbreviation chip */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.26em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          {data.title}
        </span>
        <span
          style={{
            flex: "0 0 auto",
            width: 22,
            height: 1,
            background: "var(--copper-700)",
          }}
        />
      </div>

      <div style={{ height: 8 }} />

      {/* Full term — dominant headline */}
      <h2
        style={{
          fontFamily: "var(--display)",
          fontSize: 36,
          color: "var(--neutral-50)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        {data.subName}
      </h2>

      <div style={{ height: 8 }} />

      {/* Tagline — italic subtitle below the abbreviation+full-term lockup */}
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 17,
          color: "var(--copper-200)",
          lineHeight: 1.4,
        }}
      >
        {KW(data.tagline, data.taglineKw)}
      </span>

      <div style={{ height: 16 }} />
      <CopperRule on width="30%" />
      <div style={{ height: 18 }} />

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {data.bullets.map((b) => (
          <li
            key={b}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              fontFamily: "var(--serif)",
              fontSize: 16,
              color: "var(--neutral-100)",
              lineHeight: 1.45,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: accent,
                flexShrink: 0,
                transform: "translateY(-1px)",
              }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div style={{ flex: 1 }} />

      <div
        style={{
          borderTop: "1px solid var(--copper-800)",
          paddingTop: 14,
          marginTop: 14,
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            color: "var(--copper-400)",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Analogy
        </div>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 15,
            color: "var(--copper-200)",
            margin: 0,
            lineHeight: 1.45,
          }}
        >
          “{data.analogy}”
        </p>
      </div>
    </div>
  );
}
