// I.1 — META PROCESS
//
// Section I opener. Reveals (across 4 steps) the answer to the meta-question
// "how was this deck made?" through a controlled motion choreography that
// borrows from three other slides:
//   • Step 1 — C1-style two-line stagger (center-of-stage, liftStyle helper).
//   • Step 2 — F1-style middle→header motion (line 2 of step 1 translates to
//              the canonical slide-headline anchor; a new mid-slide line
//              fades up below it).
//   • Step 3 — F1-style middle→section-title motion (the mid-slide line
//              translates to the section-title row above a 4-card grid;
//              cards stagger in G10-hover style).
//   • Step 4 — Footer caption fade.
//
// 4 reveal steps (Adri-indexed; code stepIndex shown in parens):
//   Step 1 (stepIndex 0) — Two-line stagger at center.
//     T+0ms    Line 1 lifts (400ms): "What you've been watching so far."
//     T+250ms  Line 2 lifts (400ms): "It was built entirely by AI."
//   Step 2 (stepIndex 1) — Header collapse + new mid-slide reveal.
//     • Line 1 fades out (300ms).
//     • Line 2 translates from (top:420, left:50%, translateX(-50%)) to
//       (top:80, left:48px, translateX(0)) and shrinks 56→40px display.
//       Typography family/style snap immediately (excluded from transition
//       list) per F1's pattern, since the text is already display-family in
//       both states.
//     • Mid-slide line fades up at top:330: "And here's the process that
//       made it possible." (no underline — plain serif copper.)
//   Step 3 (stepIndex 2) — Mid-slide line translates to section title + cards.
//     • Mid-slide line moves from (top:330, left:50%, translateX(-50%),
//       28px serif copper-300 italic) to (top:172, left:48, translateX(0),
//       14px mono copper-400 uppercase letter-spaced) — F1-style transition,
//       typography family/case snap.
//     • Four cards stagger in (120 + i*100ms delay) at top:212 → bottom:120.
//       Each card: icon + title + subtitle + "TO DO" section + "RESULTS"
//       section. Hover-highlight follows G10 (.fade border + warm bg + soft
//       shadow on hover).
//   Step 4 (stepIndex 3) — Footer caption fades in.
//
// Note on the Reveal.fade containing-block gotcha (memory):
//   `.fade` applies a `transform`, which makes any Reveal element a
//   containing block for descendant `position: absolute`. That means the
//   footer's `position: absolute` MUST live on the Reveal itself, not on a
//   child — mirrors G6/G10's footer pattern.
import { useEffect, useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "../foundation-techniques-section-f/components/Reveal";
import { LucideIcon } from "../foundation-core-section-e/components/LucideIcon";
import { i1Content as C } from "./content";

// ───────────────────── styles ─────────────────────

const styles = `
  .i1-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 18px 18px 16px;
    border: 1px solid var(--copper-700);
    background: rgba(10, 10, 10, 0.5);
    transition: border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease);
    height: 100%;
    overflow: hidden;
  }
  .i1-card:hover {
    border-color: var(--copper-200);
    background: rgba(184, 110, 61, 0.06);
    box-shadow: 0 4px 12px rgba(184, 110, 61, 0.08);
  }
  .i1-card-icon {
    color: var(--copper-300);
    transition: color 0.2s var(--ease);
  }
  .i1-card:hover .i1-card-icon {
    color: var(--copper-100);
  }
  .i1-card-num {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    color: var(--copper-500);
    text-transform: uppercase;
  }
  .i1-card-title {
    font-family: var(--display);
    font-size: 19px;
    color: var(--neutral-50);
    line-height: 1.1;
    letter-spacing: -0.005em;
    margin: 0;
  }
  .i1-card-subtitle {
    font-family: var(--serif);
    font-style: italic;
    font-size: 12px;
    color: var(--copper-200);
    line-height: 1.3;
    margin: 0;
  }
  .i1-card-rule {
    width: 100%;
    height: 1px;
    background: var(--copper-800);
    border: 0;
    margin: 2px 0;
  }
  .i1-card-section-label {
    font-family: var(--mono);
    font-size: 9.5px;
    letter-spacing: 0.22em;
    color: var(--copper-400);
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .i1-card-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .i1-card-list li {
    font-family: var(--serif);
    font-size: 11.5px;
    color: var(--neutral-200);
    line-height: 1.35;
    padding-left: 9px;
    position: relative;
  }
  .i1-card-list li::before {
    content: "·";
    position: absolute;
    left: 0;
    top: -1px;
    color: var(--copper-300);
    font-weight: 700;
  }
  .i1-card-results-list li {
    color: var(--neutral-100);
    font-style: italic;
  }
`;

// ───────────────────── slide ─────────────────────

export function I1MetaProcess() {
  const { stepIndex } = useDeck();

  // Step-1 mount stagger (C1 pattern).
  // line1 lifts at T+0ms, line2 at T+250ms; both 400ms ease.
  const STAGGER_LINE1_MS = 0;
  const STAGGER_LINE2_MS = 250;
  const [line1On, setLine1On] = useState(false);
  const [line2On, setLine2On] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setLine1On(true), STAGGER_LINE1_MS));
    timers.push(window.setTimeout(() => setLine2On(true), STAGGER_LINE2_MS));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Step gates.
  const headerCollapsed = stepIndex >= 1; // line2 morphs to header
  const midRevealed = stepIndex >= 1; // mid line fades up (same trigger)
  const sectionCollapsed = stepIndex >= 2; // mid line morphs to section title
  const cardsRevealed = stepIndex >= 2;
  const footerRevealed = stepIndex >= 3;

  return (
    <>
      <style>{styles}</style>

      <FigLabel section="I" num={1} label="THE PROCESS" />

      {/* ───────────── Line 1 (step 1 only — fades out on step 2) ─────────────
          Centered display headline. Fades out as soon as headerCollapsed
          flips so the eye is led to line 2 (which is morphing upward). */}
      <div
        data-testid="i1-line1"
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: headerCollapsed ? 0 : line1On ? 1 : 0,
          transform: line1On ? "translateY(0)" : "translateY(12px)",
          transition:
            "opacity 400ms var(--ease), transform 400ms var(--ease)",
          pointerEvents: headerCollapsed ? "none" : "auto",
          willChange: "opacity, transform",
        }}
      >
        <p
          style={{
            fontFamily: "var(--display)",
            fontSize: 52,
            color: "var(--neutral-50)",
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            textAlign: "center",
            fontWeight: 400,
          }}
        >
          {highlight(C.line1.text, [...C.line1.keywords])}
        </p>
      </div>

      {/* ───────────── Line 2 (step 1 center → step 2 header) ─────────────
          F1's motion: top/left/transform/font-size all transition, but
          font-family/font-style snap (text is already display in both
          states). Lands at the canonical slide-headline anchor:
          top:80, left:48, 40px (.slide-headline.small equivalent). */}
      <div
        data-testid="i1-line2-wrap"
        data-collapsed={headerCollapsed ? "1" : "0"}
        style={{
          position: "absolute",
          top: headerCollapsed ? 80 : 400,
          left: headerCollapsed ? "48px" : "50%",
          transform: headerCollapsed
            ? "translateX(0)"
            : "translateX(-50%)",
          transition:
            "top 0.7s var(--ease), left 0.7s var(--ease), transform 0.7s var(--ease)",
          willChange: "top, left, transform",
        }}
      >
        <p
          data-testid="i1-line2"
          style={{
            margin: 0,
            whiteSpace: "nowrap",
            fontFamily: "var(--display)",
            fontWeight: 400,
            fontSize: headerCollapsed ? 40 : 52,
            lineHeight: headerCollapsed ? 1.05 : 1.05,
            letterSpacing: "-0.01em",
            color: "var(--neutral-50)",
            textAlign: headerCollapsed ? "left" : "center",
            // Step-1 mount cascade gate: until line2On flips, lifts 12px
            // up and stays at opacity 0. Lift lives on the inner <p>
            // because the outer wrap already owns the F1 morph
            // translateX(-50%) ↔ translateX(0). The two transforms compose
            // on different elements without conflict.
            opacity: line2On ? 1 : 0,
            transform: line2On ? "translateY(0)" : "translateY(12px)",
            transition: [
              "font-size 0.7s var(--ease)",
              "opacity 400ms var(--ease)",
              "transform 400ms var(--ease)",
            ].join(", "),
          }}
        >
          {highlight(C.line2.text, [...C.line2.keywords])}
        </p>
      </div>

      {/* ───────────── Mid line (step 2 center → step 3 section title) ─────────────
          Reveal at step 2 with a soft lift, then on step 3 translates to
          section-title position above the card grid. Same F1 motion model
          as line 2 — but a different destination (top:172 left:48, smaller
          serif italic copper-200, no caps conversion; we just shrink). */}
      <div
        data-testid="i1-mid-wrap"
        data-section={sectionCollapsed ? "1" : "0"}
        style={{
          position: "absolute",
          top: sectionCollapsed ? 178 : 330,
          left: sectionCollapsed ? "48px" : "50%",
          transform: sectionCollapsed
            ? "translateX(0)"
            : "translateX(-50%)",
          transition:
            "top 0.7s var(--ease), left 0.7s var(--ease), transform 0.7s var(--ease)",
          willChange: "top, left, transform",
        }}
      >
        <p
          data-testid="i1-mid"
          style={{
            margin: 0,
            whiteSpace: "nowrap",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: sectionCollapsed ? 16 : 28,
            lineHeight: 1.3,
            color: sectionCollapsed
              ? "var(--copper-200)"
              : "var(--copper-300)",
            textAlign: sectionCollapsed ? "left" : "center",
            // Step-2 reveal: opacity lift from 0; thereafter held at 1 while
            // the F1 morph carries it to section-title position.
            opacity: midRevealed ? 1 : 0,
            transform: midRevealed ? "translateY(0)" : "translateY(12px)",
            transition: [
              "font-size 0.7s var(--ease)",
              "color 0.7s var(--ease)",
              "opacity 400ms var(--ease)",
              "transform 400ms var(--ease)",
            ].join(", "),
          }}
        >
          {highlight(C.midLine.text, [...C.midLine.keywords])}
        </p>
      </div>

      {/* ───────────── Card grid (step 3) ─────────────
          4 cards stagger via Reveal (120 + i*100ms). Hover highlight is
          pure CSS (.i1-card:hover) — G10 pattern. Each card stacks two
          vertical sections inside: "TO DO" then "RESULTS". */}
      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 215,
          bottom: 110,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          // Cards container fades in once we're at step 3. Reveals inside
          // also stagger, but we gate the whole grid on cardsRevealed so it
          // doesn't render mid-air during step 2 (when the mid line is
          // still at center).
          opacity: cardsRevealed ? 1 : 0,
          pointerEvents: cardsRevealed ? "auto" : "none",
          transition: "opacity 0.4s var(--ease)",
        }}
      >
        {C.cards.map((card, i) => (
          <Reveal
            key={card.title}
            on={cardsRevealed}
            delay={120 + i * 100}
            style={{ height: "100%" }}
          >
            <div className="i1-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="i1-card-icon">
                  <LucideIcon name={card.icon} size={28} color="currentColor" strokeWidth={1.6} />
                </div>
                <div className="i1-card-num">0{card.num}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <h3 className="i1-card-title">{card.title}</h3>
                <p className="i1-card-subtitle">{card.subtitle}</p>
              </div>

              <hr className="i1-card-rule" />

              {/* TO DO wrapper has a min-height that exactly matches the
                  natural rendered height of Cards 1 & 4 (the tallest, at
                  ~136.86px in the 1280×720 stage). The floor is a no-op
                  for C1/C4 — their natural content already exceeds it, so
                  they keep their original RESULTS Y position. C2 (~129px
                  natural) and C3 (~106px natural) gain blank space below
                  their TO DO list, dropping their RESULTS heading down
                  to match C1/C4's Y. */}
              <div style={{ minHeight: 137 }}>
                <div className="i1-card-section-label">To do</div>
                <ul className="i1-card-list">
                  {card.todo.map((b) => (
                    <li key={b.text}>{highlight(b.text, [...b.keywords])}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 2 }}>
                <div className="i1-card-section-label">Results</div>
                <ul className="i1-card-list i1-card-results-list">
                  {card.results.map((b) => (
                    <li key={b.text}>{highlight(b.text, [...b.keywords])}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ───────────── Footer (step 4) ─────────────
          Italic copper-200 mono with copper-accent + italic highlight on
          1–3 keywords (deck-wide rule). `position: absolute` lives on
          the Reveal — `.fade`'s transform creates a containing block, so
          an absolutely-positioned child would resolve to Reveal (zero
          height). Mirrors G10's footer. */}
      <Reveal
        on={footerRevealed}
        delay={120}
        data-testid="i1-footer"
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

export const i1Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  section: "I",
  render: () => <I1MetaProcess />,
};
