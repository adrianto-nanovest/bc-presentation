// G.2 — CLAUDE PLATFORMS
//
// Comparison table slide: 5 Claude platforms × 4 columns.
// Structural header + data rows stagger in, killer-feature column highlights
// at step 1, footer reveals at step 2. Row hover adds copper accent.
//
// 3 steps (spec §3.G.2):
//   0 — Header instant; 5 rows stagger in (120 + i*80 ms)
//   1 — Killer-feature column highlights (copper-100 + glow)
//   2 — Footer line reveals
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "./components/Reveal";
import { g2Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function G2ClaudePlatforms() {
  const { stepIndex } = useDeck();

  // Step reveals
  const highlightKillerFeature = stepIndex >= 1;
  const showFooter = stepIndex >= 2;

  return (
    <>
      <style>{`
        .g2-row {
          display: grid;
          grid-template-columns: 200px 200px 220px 1fr;
          transition: background 0.2s var(--ease);
        }
        .g2-row:hover {
          background: rgba(184, 110, 61, 0.06);
        }
        .g2-row:hover .g2-cell-platform {
          box-shadow: -3px 0 0 var(--copper-200);
        }
        .g2-cell {
          padding: 14px 0;
          vertical-align: top;
        }
        .g2-cell-platform {
          font-family: var(--mono);
          font-size: 14px;
          color: var(--copper-300);
          font-weight: 500;
          transition: box-shadow 0.2s var(--ease);
        }
        .g2-cell-surface,
        .g2-cell-audience {
          font-family: var(--serif);
          font-size: 14px;
          color: var(--neutral-100);
        }
        .g2-cell-killer {
          font-family: var(--serif);
          font-size: 14px;
          font-style: italic;
          color: var(--copper-200);
          transition: color 400ms var(--ease), text-shadow 400ms var(--ease);
        }
        .g2-cell-killer.highlight {
          color: var(--copper-100);
          text-shadow: 0 0 8px rgba(217, 158, 108, 0.35);
        }
        .g2-header-cell {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--copper-300);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding: 12px 0;
          border-bottom: 1px solid var(--copper-700);
        }
        .g2-data-row {
          border-bottom: 1px solid var(--copper-800);
        }
        .g2-data-row:last-of-type {
          border-bottom: none;
        }
      `}</style>

      <FigLabel section="G" num={2} label="CLAUDE PLATFORMS" />

      {/* ───────────── Headline (structural, always on) ───────────── */}
      <h1
        className="slide-headline small"
        style={{
          position: "absolute",
          top: 80,
          left: 48,
          right: 48,
          margin: 0,
        }}
      >
        {highlight(C.headline, [...C.headlineKw])}
      </h1>

      {/* ───────────── Table container (click-safe) ───────────── */}
      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header row — structural (no Reveal) */}
        <div className="g2-row">
          {C.columns.map((col) => (
            <div key={col} className="g2-header-cell">
              {col}
            </div>
          ))}
        </div>

        {/* Data rows — stagger in at step 0 */}
        {C.rows.map((row, i) => (
          <Reveal key={i} on={true} delay={120 + i * 80}>
            <div className="g2-row g2-data-row">
              <div className={`g2-cell g2-cell-platform`}>{row.platform}</div>
              <div className={`g2-cell g2-cell-surface`}>{row.surface}</div>
              <div className={`g2-cell g2-cell-audience`}>{row.audience}</div>
              <div
                className={`g2-cell g2-cell-killer ${highlightKillerFeature ? "highlight" : ""}`}
              >
                {row.killer}
              </div>
            </div>
          </Reveal>
        ))}

        {/* Footer line (step 2) */}
        <Reveal on={showFooter} delay={120}>
          <p
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 18,
              color: "var(--copper-200)",
              margin: "32px 0 0 0",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {highlight(C.footer, [...C.footerKw])}
          </p>
        </Reveal>
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const g2Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G2ClaudePlatforms />,
};
