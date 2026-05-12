// G.10 — BEYOND THE BIG THREE
//
// Spec §2 G.10 — 3 horizontal cards introducing complementary tools that
// occupy moats the Big Three (Anthropic / Google / OpenAI) haven't filled:
// OpenClaw (open-source), Hermes Agent (self-improving memory), n8n
// (LLM-native automation). Unlike G.5/G.6, these cards have NO video and
// NO compare buttons — they're complementary, not benchmarked against
// the Big Three.
//
// Step structure:
//   0 (entry) — 3 cards stagger in (120ms + i*100ms), subhead reveals
//   1         — footer line reveals

import type { SlideDef } from "../../deck/types";
import { useDeck } from "../../deck/DeckContext";
import { FigLabel } from "../../components/FigLabel";
import { highlight } from "../../components/highlight";
import { AnimatedGlyph } from "../../components/AnimatedGlyph";
import { Reveal } from "./components/Reveal";
import { g10Content as C } from "./content";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = `
  .g10-subhead {
    position: absolute;
    top: 128px;
    left: 48px;
    right: 48px;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--copper-400);
  }

  .g10-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    border: 1px solid var(--copper-700);
    background: rgba(10, 10, 10, 0.5);
    transition: border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease);
    height: 100%;
    overflow: hidden;
  }

  .g10-card:hover {
    border-color: var(--copper-200);
    background: rgba(184, 110, 61, 0.06);
    box-shadow: 0 4px 12px rgba(184, 110, 61, 0.08);
  }

  .g10-card-name {
    font-family: var(--display);
    font-size: 28px;
    color: var(--neutral-50);
    line-height: 1.1;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .g10-card-desc {
    font-family: var(--serif);
    font-size: 16px;
    color: var(--neutral-100);
    line-height: 1.4;
  }

  .g10-card-rule {
    width: 100%;
    height: 1px;
    background: var(--copper-700);
    border: 0;
    margin: 0;
  }

  .g10-card-for-label {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--copper-400);
  }

  .g10-card-usecase {
    font-family: var(--serif);
    font-size: 14px;
    color: var(--neutral-300);
    line-height: 1.4;
    margin-top: -8px;
  }

  .g10-card-spacer {
    flex: 1;
  }

  .g10-card-footnote {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--copper-500);
  }

  .g10-footer {
    position: absolute;
    bottom: 40px;
    left: 48px;
    right: 48px;
    text-align: center;
    font-family: var(--serif);
    font-style: italic;
    font-size: 16px;
    color: var(--copper-200);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function G10BeyondBigThree() {
  const { stepIndex } = useDeck();

  return (
    <>
      <style>{styles}</style>

      {/* FigLabel — always visible */}
      <FigLabel section="G" num={10} label="BEYOND THE BIG THREE" />

      {/* Headline — always visible, structural */}
      <h1
        className="slide-headline small"
        style={{ position: "absolute", top: 80, left: 48, right: 48 }}
      >
        {highlight(C.headline, [...C.headlineKw])}
      </h1>

      {/* Subhead — mono 11px copper-400 uppercase */}
      <Reveal on={true} delay={80} className="g10-subhead">
        {C.subhead}
      </Reveal>

      {/* Cards region — 3 horizontal cards */}
      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 80,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {C.cards.map((card, i) => (
          <Reveal key={card.tool} on={true} delay={120 + i * 100}>
            <div className="g10-card">
              <AnimatedGlyph kind={card.glyphKind as any} size={64} />
              <div className="g10-card-name">{card.tool}</div>
              <div className="g10-card-desc">
                {card.differentiator}. {card.description}
              </div>
              <hr className="g10-card-rule" />
              <div className="g10-card-for-label">FOR</div>
              <div className="g10-card-usecase">{card.useCase}</div>
              <div className="g10-card-spacer" />
              <div className="g10-card-footnote">{card.footnote}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Footer — revealed at step 1 */}
      <Reveal on={stepIndex >= 1} delay={120} className="g10-footer">
        {highlight(C.footer, [...C.footerKw])}
      </Reveal>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE DEF
// ─────────────────────────────────────────────────────────────────────────────

export const g10Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G10BeyondBigThree />,
};
