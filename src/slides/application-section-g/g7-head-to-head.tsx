// G.7 — HEAD-TO-HEAD
//
// Step structure:
//   0 (entry) — left cards stagger in (120 + i*80); right column shows
//               "The Comparison" header + a hover/pin-driven DetailPanel
//               (blank by default — fills when a left card is hovered/pinned).
//   1         — right column header swaps to "The Recap"; right body becomes
//               a fixed bullet-recap grid that does NOT change on hover.
//               Left cards still respond to hover visually. Footer
//               "Pick by shape, not vendor." reveals beneath the left column.

import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { DetailPanel, type ComparisonDef } from "@/components/DetailPanel";
import { Reveal, CopperRule } from "../foundation-core-section-e/components/Reveal";
import { LucideIcon } from "../foundation-core-section-e/components/LucideIcon";
import { g7Content as C } from "./content";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = `
.g7-card {
  position: relative;
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  box-sizing: border-box;
  border: 1px solid var(--copper-800);
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

.g7-card-icon {
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--copper-300);
  transition: color 0.2s var(--ease);
}

.g7-card:hover .g7-card-icon,
.g7-card.pinned .g7-card-icon {
  color: var(--copper-100);
}

.g7-card-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  font-size: 14px;
  color: var(--neutral-50);
  line-height: 1.25;
  letter-spacing: -0.005em;
}

.g7-card-desc {
  font-family: var(--serif);
  font-style: italic;
  font-size: 11.5px;
  color: var(--neutral-400);
  line-height: 1.3;
  margin-top: 1px;
}

.g7-card-pinned-tag {
  position: absolute;
  top: 6px;
  right: 8px;
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--copper-200);
}

.g7-recap-tile {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;
  border: 1px solid var(--copper-800);
  background: rgba(10, 10, 10, 0.5);
  min-height: 0;
}

.g7-recap-title {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--copper-300);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  line-height: 1.2;
}

.g7-recap-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.g7-recap-list li {
  font-family: var(--serif);
  font-style: italic;
  font-size: 12px;
  color: var(--neutral-200);
  line-height: 1.35;
  padding-left: 10px;
  position: relative;
}

.g7-recap-list li::before {
  content: "·";
  position: absolute;
  left: 0;
  color: var(--copper-300);
  font-style: normal;
  font-weight: 700;
}

.g7-col-header-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.22em;
  color: var(--copper-400);
  text-transform: uppercase;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function G7HeadToHead() {
  const { stepIndex } = useDeck();
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);

  // Step 1 (stepIndex 0): right column is driven by hover/pin → shows comparison.
  // Step 2 (stepIndex >= 1): right column is LOCKED to the recap. Hover still
  // recolors left cards (purely local card state) but does NOT mutate the right.
  const showRecap = stepIndex >= 1;
  const activeIndex = pinned ?? hovered;
  const activeComparison: ComparisonDef | null =
    !showRecap && activeIndex !== null
      ? (C.comparisons[activeIndex] ?? null)
      : null;
  const showRightHeader = showRecap || (!showRecap && activeIndex !== null);

  // Step-2 fallback: bullet-recap grid (3 cols × 2 rows so all 5 fit cleanly).
  const recapGrid = (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        width: "100%",
        height: "100%",
        alignContent: "start",
      }}
    >
      {C.cards.map((card, i) => (
        <div key={card.title} className="g7-recap-tile">
          <div className="g7-recap-title">{card.title}</div>
          <ul className="g7-recap-list">
            {C.pickWhenSummaries[i].bullets.map((b) => (
              <li key={b}>
                {highlight(b, [...C.pickWhenSummaries[i].bulletsKw])}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <style>{styles}</style>

      {/* STRUCTURAL — FigLabel + Headline */}
      <FigLabel section="G" num={7} label="HEAD-TO-HEAD" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      {/* CONTENT REGION — click-to-advance enabled everywhere EXCEPT inside
          the left cards on step 1 (so pinning works there but clicks elsewhere
          still advance the deck). */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 80,
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gridTemplateRows: "auto 1fr auto",
          columnGap: 24,
          rowGap: 12,
        }}
      >
        {/* ROW 1 — Left column header */}
        <div style={{ gridColumn: 1, gridRow: 1, position: "relative", zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
            <div style={{ width: "fit-content" }}>
              <div className="g7-col-header-label">{C.leftHeader}</div>
              <div style={{ height: 6 }} />
              <CopperRule on width="100%" />
            </div>
            {stepIndex === 0 && <HintIcon />}
          </div>
        </div>

        {/* ROW 1 — Right column header (swaps text by step; hover-gated on step 1) */}
        <div style={{ gridColumn: 2, gridRow: 1 }}>
          <div
            style={{
              visibility: showRightHeader ? "visible" : "hidden",
            }}
          >
            <div className="g7-col-header-label">
              {showRecap ? C.rightHeaderRecap : C.rightHeaderCompare}
            </div>
            <div style={{ height: 6 }} />
          </div>
          <CopperRule on={showRightHeader} width="40%" />
        </div>

        {/* ROW 2 — Left cards (flex-distributed so they always fit).
            `data-no-advance` is applied ONLY on step 1, where card clicks
            mean "pin". On step 2 it's removed so clicking a card advances
            the deck normally (the recap is static, no pin needed). */}
        <div
          {...(showRecap ? {} : { "data-no-advance": "" })}
          style={{
            gridColumn: 1,
            gridRow: 2,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            minHeight: 0,
            minWidth: 0,
          }}
        >
          {C.cards.map((card, i) => {
            const isPinned = !showRecap && pinned === i;
            return (
              <Reveal
                key={card.title}
                on={true}
                delay={120 + i * 80}
                style={{ flex: "1 1 0", minHeight: 0, display: "flex" }}
              >
                <div
                  className={`g7-card${isPinned ? " pinned" : ""}`}
                  style={{ width: "100%" }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={
                    showRecap
                      ? undefined
                      : () => setPinned((cur) => (cur === i ? null : i))
                  }
                >
                  {isPinned && (
                    <div className="g7-card-pinned-tag" aria-label="pinned">
                      <LucideIcon name="Pin" size={12} color="currentColor" />
                    </div>
                  )}
                  <div className="g7-card-icon">
                    <LucideIcon name={card.icon} size={22} color="currentColor" />
                  </div>
                  <div className="g7-card-body">
                    <div className="g7-card-title">{card.title}</div>
                    <div className="g7-card-items">{card.items.join(" · ")}</div>
                    <div className="g7-card-desc">
                      {highlight(card.description, [...card.descriptionKw])}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ROW 2 — Right column body (DetailPanel OR locked recap grid) */}
        <div
          style={{
            gridColumn: 2,
            gridRow: 2,
            minWidth: 0,
            minHeight: 0,
            display: "flex",
          }}
        >
          <DetailPanel
            comparison={activeComparison}
            fallback={showRecap ? recapGrid : null}
          />
        </div>

        {/* ROW 3 — Footer (reveals at step 2, spans both columns) */}
        <Reveal
          on={stepIndex >= 1}
          delay={120}
          style={{ gridColumn: "1 / -1", gridRow: 3 }}
        >
          <div
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 15,
              color: "var(--copper-200)",
              lineHeight: 1.4,
            }}
          >
            {highlight(C.footer, [...C.footerKw])}
          </div>
        </Reveal>
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
