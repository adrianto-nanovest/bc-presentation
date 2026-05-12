// G.7 — HEAD-TO-HEAD
//
// Spec §2 G.7 — Five comparison-pair cards on the left; right side renders a
// shared <DetailPanel> driven by hovered/pinned card index.
//
// Step structure:
//   0 (entry) — left cards stagger in (120 + i*80); DetailPanel blank
//   1         — footer line reveals beneath left column; DetailPanel default
//                becomes 5 PICK-WHEN summary tiles. Hover/pin still wins.

import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { DetailPanel, type ComparisonDef } from "@/components/DetailPanel";
import { Reveal } from "./components/Reveal";
import { g7Content as C } from "./content";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = `
.g7-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 14px 16px;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid var(--copper-700);
  background: rgba(10, 10, 10, 0.5);
  cursor: pointer;
  transition: border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease);
}

.g7-card:hover {
  border-color: var(--copper-200);
  background: rgba(184, 110, 61, 0.06);
  box-shadow: 0 4px 12px rgba(184, 110, 61, 0.08);
}

.g7-card.pinned {
  border-color: var(--copper-300);
  background: rgba(184, 110, 61, 0.08);
  box-shadow: inset 0 0 0 1px rgba(217, 158, 108, 0.3);
}

.g7-card-title {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--copper-300);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  line-height: 1.2;
}

.g7-card-items {
  font-family: var(--display);
  font-size: 16px;
  color: var(--neutral-50);
  line-height: 1.25;
  letter-spacing: -0.005em;
}

.g7-card-pinned-tag {
  position: absolute;
  top: 8px;
  right: 12px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--copper-300);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.g7-summary-tile {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid var(--copper-800);
  background: rgba(10, 10, 10, 0.5);
}

.g7-summary-title {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--copper-300);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  line-height: 1.2;
}

.g7-summary-text {
  font-family: var(--serif);
  font-style: italic;
  font-size: 14px;
  color: var(--neutral-200);
  line-height: 1.4;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function G7HeadToHead() {
  const { stepIndex } = useDeck();
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);

  const activeIndex = pinned ?? hovered;
  const activeComparison: ComparisonDef | null =
    activeIndex !== null ? (C.comparisons[activeIndex] ?? null) : null;

  // Step-1 fallback: 5 summary tiles in a 2-column grid
  const summaryFallback = (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        width: "100%",
        height: "100%",
        alignContent: "start",
      }}
    >
      {C.cards.map((card, i) => (
        <div key={card.title} className="g7-summary-tile">
          <div className="g7-summary-title">{card.title}</div>
          <div className="g7-summary-text">{C.pickWhenSummaries[i]}</div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <style>{styles}</style>

      {/* STRUCTURAL — FigLabel + Headline (always present) */}
      <FigLabel section="G" num={7} label="HEAD-TO-HEAD" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      {/* CONTENT REGION — wrapped in data-no-advance */}
      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 80,
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          columnGap: 24,
        }}
      >
        {/* LEFT — 5 stacked cards + footer line beneath at step 1 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            minWidth: 0,
          }}
        >
          {C.cards.map((card, i) => {
            const isPinned = pinned === i;
            return (
              <Reveal key={card.title} on={true} delay={120 + i * 80}>
                <div
                  className={`g7-card${isPinned ? " pinned" : ""}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setPinned((cur) => (cur === i ? null : i))}
                >
                  {isPinned && (
                    <div className="g7-card-pinned-tag">⊙ pinned</div>
                  )}
                  <div className="g7-card-title">{card.title}</div>
                  <div className="g7-card-items">{card.items.join(" · ")}</div>
                </div>
              </Reveal>
            );
          })}

          {/* Footer line — step 1 reveal, beneath the left column */}
          <Reveal on={stepIndex >= 1} delay={120}>
            <div
              style={{
                marginTop: 12,
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 16,
                color: "var(--copper-200)",
                lineHeight: 1.4,
              }}
            >
              Pick by shape, not vendor.
            </div>
          </Reveal>
        </div>

        {/* RIGHT — DetailPanel (fixed-width grid cell forces sizing) */}
        <div style={{ minWidth: 0, height: "100%" }}>
          <DetailPanel
            comparison={activeComparison}
            fallback={stepIndex >= 1 ? summaryFallback : null}
          />
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE DEF
// ─────────────────────────────────────────────────────────────────────────────

export const g7Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G7HeadToHead />,
};
