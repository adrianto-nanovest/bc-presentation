// J.4 — BUILDING SOMETHING THAT SHIPS
//
// Mirrors J.2's anatomy: 3 horizontal cards with all content inside the card
// (no hover popovers). 2 reveal steps (Adri-indexed, code stepIndex in parens):
//   Step 1 (stepIndex 0) — Three step cards stagger in on mount.
//     Cards reveal via Reveal/.fade.on with delay 120 + i*100ms. A `mounted`
//     flag (flipped in useEffect) ensures the .fade → .fade.on transition
//     runs on first paint — without it both renders would land at .on with no
//     animation. Same pattern as J.2.
//   Step 2 (stepIndex 1) — Footer caption fades in.
//
// Card anatomy mirrors J.2 step:
//   icon + num · title + subtitle · rule · "In practice" list ·
//   "Earned from" list (italicized). Hover examples from the old
//   RecipeStepCard popover collapse into the "Earned from" line.
//
// Reveal.fade containing-block gotcha (memory feedback_reveal_absolute_positioning):
//   `.fade` applies a `transform`, so any Reveal becomes a containing block
//   for descendant `position: absolute`. Footer keeps `position: absolute`
//   directly on the Reveal — never on a child.
import { useEffect, useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "../foundation-techniques-section-f/components/Reveal";
import { LucideIcon } from "../foundation-techniques-section-f/components/LucideIcon";
import { j4Content as C } from "./content";

// ───────────────────── styles ─────────────────────
//
// Mirrors J.2's `.j2-card` but tuned for 3 (wider) cards. Cross-card
// alignment floors are sized for single-line titles — with only 3 columns
// titles do not wrap. If type shifts and titles do wrap, raise the floor.
const styles = `
  .j4-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 22px 22px;
    border: 1px solid var(--copper-700);
    background: rgba(10, 10, 10, 0.5);
    transition: border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease);
    height: 100%;
    overflow: hidden;
  }
  .j4-card:hover {
    border-color: var(--copper-200);
    background: rgba(184, 110, 61, 0.06);
    box-shadow: 0 4px 12px rgba(184, 110, 61, 0.08);
  }
  .j4-card-icon {
    color: var(--copper-300);
    transition: color 0.2s var(--ease);
  }
  .j4-card:hover .j4-card-icon {
    color: var(--copper-100);
  }
  .j4-card-num {
    font-family: var(--mono);
    font-size: 13px;
    letter-spacing: 0.22em;
    color: var(--copper-500);
    text-transform: uppercase;
  }
  .j4-card-title-block {
    display: flex;
    flex-direction: column;
    gap: 6px;
    /* Single-line floor for 3 wider cards. */
    min-height: 58px;
  }
  .j4-card-practice-block {
    /* 3 bullets per card — matched across all 3. */
    min-height: 118px;
  }
  .j4-card-title {
    font-family: var(--display);
    font-size: 24px;
    color: var(--neutral-50);
    line-height: 1.15;
    letter-spacing: -0.005em;
    margin: 0;
  }
  .j4-card-subtitle {
    font-family: var(--serif);
    font-style: italic;
    font-size: 15px;
    color: var(--copper-200);
    line-height: 1.3;
    margin: 0;
  }
  .j4-card-rule {
    width: 100%;
    height: 1px;
    background: var(--copper-800);
    border: 0;
    margin: 4px 0;
  }
  .j4-card-section-label {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.22em;
    color: var(--copper-400);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .j4-card-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .j4-card-list li {
    font-family: var(--serif);
    font-size: 15px;
    color: var(--neutral-200);
    line-height: 1.4;
    padding-left: 12px;
    position: relative;
  }
  .j4-card-list li::before {
    content: "·";
    position: absolute;
    left: 0;
    top: -1px;
    color: var(--copper-300);
    font-weight: 700;
  }
  .j4-card-lesson-list li {
    color: var(--neutral-100);
    font-style: italic;
  }
`;

// ───────────────────── slide ─────────────────────

export function J4RecipeShip() {
  const { stepIndex } = useDeck();

  // Mount flag: same trick as J.2 — flipped on next tick so .fade → .fade.on
  // transitions run on first paint.
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

      <FigLabel section="J" num={4} label="BUILDING SOMETHING THAT SHIPS" />

      {/* Slide headline — same anchor as J.2 (top:80 left:48). */}
      <p
        data-testid="j4-headline"
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

      {/* Subtitle — same anchor as J.2 (top:178 left:48). */}
      <p
        data-testid="j4-subtitle"
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

      {/* 3-card grid — same vertical bounds as J.2 (top:215 → bottom:110). */}
      <div
        data-cards-revealed={String(cardsRevealed)}
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 215,
          bottom: 110,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {C.cards.map((card, i) => (
          <Reveal
            key={card.num}
            on={cardsRevealed}
            delay={120 + i * 100}
            style={{ height: "100%" }}
          >
            <div className="j4-card" data-testid="j4-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="j4-card-icon">
                  <LucideIcon
                    name={card.icon}
                    size={34}
                    color="currentColor"
                    strokeWidth={1.6}
                  />
                </div>
                <div className="j4-card-num">0{card.num}</div>
              </div>

              <div className="j4-card-title-block" data-testid="j4-title-block">
                <h3 className="j4-card-title">
                  {highlight(card.title, [...card.titleKw])}
                </h3>
                <p className="j4-card-subtitle">{card.subtitle}</p>
              </div>

              <hr className="j4-card-rule" data-testid="j4-rule" />

              <div className="j4-card-practice-block" data-testid="j4-practice-block">
                <div className="j4-card-section-label" data-testid="j4-practice-label">
                  In practice
                </div>
                <ul className="j4-card-list">
                  {card.practice.map((b) => (
                    <li key={b.text}>{highlight(b.text, [...b.keywords])}</li>
                  ))}
                </ul>
              </div>

              <div data-testid="j4-lesson-block">
                <div className="j4-card-section-label" data-testid="j4-lesson-label">
                  Earned from
                </div>
                <ul className="j4-card-list j4-card-lesson-list">
                  {card.lesson.map((b) => (
                    <li key={b.text}>{highlight(b.text, [...b.keywords])}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Footer (step 2) — absolute on Reveal, not on a child. */}
      <Reveal
        on={footerRevealed}
        delay={120}
        data-testid="j4-footer"
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

export const j4Slide: SlideDef = {
  steps: 2,
  animationMode: "step-reveal",
  canonicalPose: 1,
  surface: "dark",
  section: "J",
  render: () => <J4RecipeShip />,
};
