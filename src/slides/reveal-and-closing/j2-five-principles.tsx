// J.2 — FIVE PRINCIPLES
//
// 2 reveal steps (Adri-indexed; code stepIndex shown in parens):
//   Step 1 (stepIndex 0) — Five principle cards stagger in on mount.
//     Cards reveal via Reveal/.fade.on with delay 120 + i*100ms — same
//     cadence as I.1 step 3. A `mounted` flag (flipped in useEffect)
//     ensures the .fade → .fade.on transition runs even though stepIndex
//     stays at 0; without it, both renders would land at .on with no
//     animation.
//   Step 2 (stepIndex 1) — Footer caption fades in.
//
// Card anatomy mirrors I.1 step 3:
//   icon + num · title + subtitle · rule · "In practice" list ·
//   "Earned from" list (italicized — like I.1's RESULTS).
// All content lives inside the card — no hover popovers.
//
// Reveal.fade containing-block gotcha (memory feedback_reveal_absolute_positioning):
//   `.fade` applies a `transform`, so any Reveal becomes a containing block
//   for descendant `position: absolute`. Footer keeps `position: absolute`
//   directly on the Reveal — never on a child — mirroring I.1's pattern.
import { useEffect, useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "../foundation-techniques-section-f/components/Reveal";
import { LucideIcon } from "../foundation-techniques-section-f/components/LucideIcon";
import { j2Content as C } from "./content";

// ───────────────────── styles ─────────────────────
//
// Mirrors `.i1-card` from I.1 with bigger type to fill the available height.
// Two cross-card alignment floors:
//   • .j2-card-title-block has min-height = max natural title+subtitle
//     height across all 5 cards → keeps the rule, the "In practice" label,
//     and everything below it on the same Y line per card.
//   • .j2-card-practice-block has min-height = max natural practice height
//     across all 5 cards → keeps the "Earned from" label on the same Y.
// Both min-heights are measured-then-pinned (see scripts/j2-measure.mjs in
// commit history). See memory feedback_measure_layout_values.
const styles = `
  .j2-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 18px 16px 16px;
    border: 1px solid var(--copper-700);
    background: rgba(10, 10, 10, 0.5);
    transition: border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease);
    height: 100%;
    overflow: hidden;
  }
  .j2-card:hover {
    border-color: var(--copper-200);
    background: rgba(184, 110, 61, 0.06);
    box-shadow: 0 4px 12px rgba(184, 110, 61, 0.08);
  }
  .j2-card-icon {
    color: var(--copper-300);
    transition: color 0.2s var(--ease);
  }
  .j2-card:hover .j2-card-icon {
    color: var(--copper-100);
  }
  .j2-card-num {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.22em;
    color: var(--copper-500);
    text-transform: uppercase;
  }
  .j2-card-title-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
    /* Floor = max natural height across all 5 cards (cards 1, 4, 5 wrap to
       2 lines at 67px). Locks the rule and "In practice" label to the same
       Y on every card. Measured via scripts/j2-measure.mjs. */
    min-height: 67px;
  }
  .j2-card-practice-block {
    /* Floor = max natural height across all 5 cards (card 3 reaches 119px
       because of its longer bullet). Locks the "Earned from" label to the
       same Y on every card. */
    min-height: 119px;
  }
  .j2-card-title {
    font-family: var(--display);
    font-size: 20px;
    color: var(--neutral-50);
    line-height: 1.15;
    letter-spacing: -0.005em;
    margin: 0;
  }
  .j2-card-subtitle {
    font-family: var(--serif);
    font-style: italic;
    font-size: 13px;
    color: var(--copper-200);
    line-height: 1.3;
    margin: 0;
  }
  .j2-card-rule {
    width: 100%;
    height: 1px;
    background: var(--copper-800);
    border: 0;
    margin: 2px 0;
  }
  .j2-card-section-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.22em;
    color: var(--copper-400);
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .j2-card-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .j2-card-list li {
    font-family: var(--serif);
    font-size: 13px;
    color: var(--neutral-200);
    line-height: 1.35;
    padding-left: 10px;
    position: relative;
  }
  .j2-card-list li::before {
    content: "·";
    position: absolute;
    left: 0;
    top: -1px;
    color: var(--copper-300);
    font-weight: 700;
  }
  .j2-card-lesson-list li {
    color: var(--neutral-100);
    font-style: italic;
  }
`;

// ───────────────────── slide ─────────────────────

export function J2FivePrinciples() {
  const { stepIndex } = useDeck();

  // Mount flag: flipped on the next tick so the .fade → .fade.on transition
  // runs on first paint. Without it, Reveal would render directly into the
  // `on` state and skip the stagger.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  const cardsRevealed = mounted;
  const footerRevealed = stepIndex >= 1;

  return (
    <>
      <style>{styles}</style>

      <FigLabel section="J" num={2} label="FIVE PRINCIPLES" />

      {/* Slide headline at the canonical headline anchor (top:80 left:48). */}
      <p
        data-testid="j2-headline"
        style={{
          position: "absolute",
          top: 80,
          left: 48,
          margin: 0,
          fontFamily: "var(--display)",
          fontWeight: 400,
          fontSize: 40,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          color: "var(--neutral-50)",
        }}
      >
        {highlight(C.headline, [...C.headlineKeywords])}
      </p>

      {/* Subtitle / section line — same anchor as I.1's section-title row. */}
      <p
        data-testid="j2-subtitle"
        style={{
          position: "absolute",
          top: 178,
          left: 48,
          margin: 0,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 16,
          color: "var(--copper-200)",
          lineHeight: 1.3,
        }}
      >
        {highlight(C.subtitle, [...C.subtitleKeywords])}
      </p>

      {/* 5-card grid — same vertical bounds as I.1 (top:215 → bottom:110). */}
      <div
        data-cards-revealed={String(cardsRevealed)}
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 215,
          bottom: 110,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
        }}
      >
        {C.cards.map((card, i) => (
          <Reveal
            key={card.num}
            on={cardsRevealed}
            delay={120 + i * 100}
            style={{ height: "100%" }}
          >
            <div className="j2-card" data-testid="j2-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="j2-card-icon">
                  <LucideIcon
                    name={card.icon}
                    size={30}
                    color="currentColor"
                    strokeWidth={1.6}
                  />
                </div>
                <div className="j2-card-num">0{card.num}</div>
              </div>

              <div className="j2-card-title-block" data-testid="j2-title-block">
                <h3 className="j2-card-title">
                  {highlight(card.title, [...card.titleKw])}
                </h3>
                <p className="j2-card-subtitle">{card.subtitle}</p>
              </div>

              <hr className="j2-card-rule" data-testid="j2-rule" />

              <div className="j2-card-practice-block" data-testid="j2-practice-block">
                <div className="j2-card-section-label" data-testid="j2-practice-label">
                  In practice
                </div>
                <ul className="j2-card-list">
                  {card.practice.map((b) => (
                    <li key={b.text}>{highlight(b.text, [...b.keywords])}</li>
                  ))}
                </ul>
              </div>

              <div data-testid="j2-lesson-block">
                <div className="j2-card-section-label" data-testid="j2-lesson-label">
                  Earned from
                </div>
                <ul className="j2-card-list j2-card-lesson-list">
                  {card.lesson.map((b) => (
                    <li key={b.text}>{highlight(b.text, [...b.keywords])}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Footer (step 2) — absolute lives on Reveal, not on a child. */}
      <Reveal
        on={footerRevealed}
        delay={120}
        data-testid="j2-footer"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 56,
          textAlign: "center",
          fontFamily: "var(--mono)",
          fontStyle: "italic",
          fontSize: 14,
          letterSpacing: "0.12em",
          color: "var(--copper-200)",
          lineHeight: 1.4,
        }}
      >
        {highlight(C.footer, [...C.footerKw])}
      </Reveal>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const j2Slide: SlideDef = {
  steps: 2,
  animationMode: "step-reveal",
  canonicalPose: 1,
  surface: "dark",
  section: "J",
  render: () => <J2FivePrinciples />,
};
