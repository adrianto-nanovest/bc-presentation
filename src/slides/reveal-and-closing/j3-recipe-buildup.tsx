// J.3 — BUILDING YOURSELF UP
//
// Mirrors J.2's structure. 2 reveal steps (Adri-indexed; code stepIndex in parens):
//   Step 1 (stepIndex 0) — Three habit cards stagger in on mount.
//     Same cadence as J.2: delay 120 + i*100ms via Reveal/.fade.on. A
//     `mounted` flag (flipped in useEffect) ensures the .fade → .fade.on
//     transition runs even though stepIndex starts at 0.
//   Step 2 (stepIndex 1) — Footer caption fades in.
//
// Card anatomy mirrors J.2:
//   icon + num · title + subtitle · rule · "In practice" list ·
//   "Earned from" list (italicized).
// All content lives inside the card — no hover popovers.
//
// Reveal.fade containing-block (memory feedback_reveal_absolute_positioning):
//   `.fade` applies a `transform`, so any Reveal becomes a containing block
//   for descendant `position: absolute`. Footer keeps `position: absolute`
//   directly on the Reveal — never on a child — mirroring J.2.
import { useEffect, useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "../foundation-techniques-section-f/components/Reveal";
import { LucideIcon } from "../foundation-techniques-section-f/components/LucideIcon";
import { j3Content as C } from "./content";

// ───────────────────── styles ─────────────────────
//
// Mirrors `.j2-card` from J.2. Title/practice min-heights are left to `auto`
// for now since only 3 cards span the canvas width — titles wrap less
// aggressively than J.2's 5-card layout. If cross-card Y drift appears,
// re-measure via Playwright getBoundingClientRect (memory:
// feedback_measure_layout_values).
const styles = `
  .j3-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 22px 20px 20px;
    border: 1px solid var(--copper-700);
    background: rgba(10, 10, 10, 0.5);
    transition: border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease);
    height: 100%;
    overflow: hidden;
  }
  .j3-card:hover {
    border-color: var(--copper-200);
    background: rgba(184, 110, 61, 0.06);
    box-shadow: 0 4px 12px rgba(184, 110, 61, 0.08);
  }
  .j3-card-icon {
    color: var(--copper-300);
    transition: color 0.2s var(--ease);
  }
  .j3-card:hover .j3-card-icon {
    color: var(--copper-100);
  }
  .j3-card-num {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.22em;
    color: var(--copper-500);
    text-transform: uppercase;
  }
  .j3-card-title-block {
    display: flex;
    flex-direction: column;
    gap: 6px;
    /* Floor = max natural height across all 3 cards (cards 1, 3 wrap to
       2-line titles at 121.22px; card 2 stays at 1 line). Locks the rule
       and "In practice" label to the same Y on every card. Measured via
       /tmp/screenshot-j3.mjs. See memory feedback_measure_layout_values. */
    min-height: 122px;
  }
  .j3-card-title {
    font-family: var(--display);
    font-size: 24px;
    color: var(--neutral-50);
    line-height: 1.18;
    letter-spacing: -0.005em;
    margin: 0;
  }
  .j3-card-subtitle {
    font-family: var(--serif);
    font-style: italic;
    font-size: 14px;
    color: var(--copper-200);
    line-height: 1.3;
    margin: 0;
  }
  .j3-card-rule {
    width: 100%;
    height: 1px;
    background: var(--copper-800);
    border: 0;
    margin: 4px 0;
  }
  .j3-card-section-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.22em;
    color: var(--copper-400);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .j3-card-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .j3-card-list li {
    font-family: var(--serif);
    font-size: 14px;
    color: var(--neutral-200);
    line-height: 1.4;
    padding-left: 12px;
    position: relative;
  }
  .j3-card-list li::before {
    content: "·";
    position: absolute;
    left: 0;
    top: -1px;
    color: var(--copper-300);
    font-weight: 700;
  }
  .j3-card-lesson-list li {
    color: var(--neutral-100);
    font-style: italic;
  }
`;

// ───────────────────── slide ─────────────────────

export function J3RecipeBuildup() {
  const { stepIndex } = useDeck();

  // Mount flag: flipped on the next tick so the .fade → .fade.on transition
  // runs on first paint (matches J.2).
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

      <FigLabel section="J" num={3} label="BUILDING YOURSELF UP" />

      {/* Slide headline at the canonical headline anchor (top:80 left:48). */}
      <p
        data-testid="j3-headline"
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

      {/* Subtitle / section line — same anchor as J.2. */}
      <p
        data-testid="j3-subtitle"
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
            <div className="j3-card" data-testid="j3-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="j3-card-icon">
                  <LucideIcon
                    name={card.icon}
                    size={34}
                    color="currentColor"
                    strokeWidth={1.6}
                  />
                </div>
                <div className="j3-card-num">0{card.num}</div>
              </div>

              <div className="j3-card-title-block" data-testid="j3-title-block">
                <h3 className="j3-card-title">
                  {highlight(card.title, [...card.titleKw])}
                </h3>
                <p className="j3-card-subtitle">{card.subtitle}</p>
              </div>

              <hr className="j3-card-rule" data-testid="j3-rule" />

              <div data-testid="j3-practice-block">
                <div className="j3-card-section-label" data-testid="j3-practice-label">
                  In practice
                </div>
                <ul className="j3-card-list">
                  {card.practice.map((b) => (
                    <li key={b.text}>{highlight(b.text, [...b.keywords])}</li>
                  ))}
                </ul>
              </div>

              <div data-testid="j3-lesson-block">
                <div className="j3-card-section-label" data-testid="j3-lesson-label">
                  Earned from
                </div>
                <ul className="j3-card-list j3-card-lesson-list">
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
        data-testid="j3-footer"
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

export const j3Slide: SlideDef = {
  steps: 2,
  animationMode: "step-reveal",
  canonicalPose: 1,
  surface: "dark",
  section: "J",
  render: () => <J3RecipeBuildup />,
};
