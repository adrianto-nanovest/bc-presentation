// TrapWall — 4×2 grid of 8 pitfall cards.
// Spec §1 + §H.1 (docs/specs/2026-05-12-slides-application-H-discipline.md).
//
// Visual:
//   ┌────┬────┬────┬────┐
//   │ A  │ B  │ C  │ D  │   ← 4×2 pitfall grid (gap 18px)
//   ├────┼────┼────┼────┤
//   │ E  │ F  │ G  │ H  │
//   └────┴────┴────┴────┘
//
// Behaviour:
//   • No auto-flare loop — the presenter drives attention manually.
//   • Hover lights a single card (copper-200 border + soft glow); leaving
//     it returns to the calm copper-700 baseline.
import { useState } from "react";
import { AnimatedGlyph } from "@/components/AnimatedGlyph";
import { Reveal } from "../../foundation-core-section-e/components/Reveal";
import type { h1Content } from "../content";

type Pitfall = (typeof h1Content.cards)[number];

interface TrapWallProps {
  pitfalls: readonly Pitfall[];
}

export function TrapWall({ pitfalls }: TrapWallProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: 18,
        height: "100%",
        width: "100%",
      }}
    >
      {pitfalls.map((p, i) => (
        <PitfallCard key={p.id} pitfall={p} index={i} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PitfallCard — single card. Co-located: it has no use outside TrapWall.
// ─────────────────────────────────────────────────────────────────────────────

interface PitfallCardProps {
  pitfall: Pitfall;
  index: number;
}

function PitfallCard({ pitfall, index }: PitfallCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <Reveal
      on={true}
      delay={120 + index * 80}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          height: "100%",
          width: "100%",
          boxSizing: "border-box",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 8,
          border: `1px solid ${hover ? "var(--copper-200)" : "var(--copper-700)"}`,
          background: "rgba(10, 10, 10, 0.5)",
          transition:
            "border-color 0.2s var(--ease), box-shadow 0.2s var(--ease)",
          boxShadow: hover ? "0 0 12px rgba(184, 110, 61, 0.18)" : "none",
          position: "relative",
        }}
      >
        {/* ID pill — mono 11px copper-300 */}
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--copper-300)",
          }}
        >
          {pitfall.id}
        </div>

        {/* Glyph — 48×48 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <AnimatedGlyph kind={pitfall.glyphKind} size={48} />
        </div>

        {/* Name — display 18px, neutral-50, uppercase */}
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 18,
            color: "var(--neutral-50)",
            lineHeight: 1.1,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {pitfall.name}
        </div>

        {/* Symptom — mono 11px copper-100 */}
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "var(--copper-100)",
            lineHeight: 1.35,
          }}
        >
          {pitfall.symptom}
        </div>

        {/* Cost — serif italic 13px neutral-300 */}
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--neutral-300)",
            lineHeight: 1.3,
            marginTop: "auto",
          }}
        >
          {pitfall.cost}
        </div>
      </div>
    </Reveal>
  );
}
