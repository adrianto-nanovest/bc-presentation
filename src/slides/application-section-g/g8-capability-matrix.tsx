// G.8 — CAPABILITY MATRIX
//
// Spec §2.G.8 — 6×6 capability matrix (6 use-case rows × 6 columns:
// Use Case + Claude + Google + OpenAI + Best fit + Start here?).
// Step-reveal: step 0 builds the 5-column core matrix cell-by-cell;
// step 1 reveals the Start here? column and the footer.
//
// Step structure:
//   0 — 5 column headers stagger L→R, then 6 rows reveal cell-by-cell L→R
//   1 — Start here? header + 2-bullet cells row-by-row + footer

import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "./components/Reveal";
import { g8Content as C } from "./content";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = `
.g8-grid {
  display: grid;
  grid-template-columns:
    minmax(140px, 1fr)
    minmax(180px, 1.3fr)
    minmax(180px, 1.3fr)
    minmax(170px, 1.25fr)
    minmax(170px, 1.2fr)
    minmax(180px, 1.35fr);
  column-gap: 20px;
  row-gap: 0;
  align-items: stretch;
}

.g8-header-cell {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--copper-300);
  padding: 8px 10px 10px;
  border-bottom: 1px solid var(--copper-700);
}

.matrix-row {
  display: contents;
}

.matrix-row > .g8-cell {
  transition: background 0.18s var(--ease), border-color 0.18s var(--ease);
  /* Override Reveal's inline transition-delay so hover responds instantly
     regardless of which row (row N has reveal delay 200 + N*200 ms). */
  transition-delay: 0s !important;
}

.g8-cell {
  padding: 14px 10px;
  border-bottom: 1px solid rgba(122, 70, 38, 0.35);
  display: flex;
  align-items: center;
  min-height: 52px;
  border-left: 1px solid transparent;
}

.matrix-row:hover > .g8-cell {
  background: rgba(184, 110, 61, 0.06);
}

.matrix-row:hover > .g8-cell:first-child {
  border-left: 1px solid var(--copper-200);
}

.g8-cell-usecase {
  font-family: var(--display);
  font-size: 15px;
  color: var(--neutral-50);
  letter-spacing: 0.005em;
}

.g8-cell-tool {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  width: 100%;
  white-space: nowrap;
}

.g8-cell-tool-label {
  font-family: var(--serif);
  font-size: 14px;
  color: var(--neutral-100);
  overflow: hidden;
  text-overflow: ellipsis;
}

.g8-cell-tool-na {
  font-family: var(--serif);
  font-size: 18px;
  color: var(--copper-700);
  width: 100%;
  text-align: center;
}

.g8-cell-bestfit {
  font-family: var(--serif);
  font-style: italic;
  font-size: 14px;
  color: var(--copper-200);
  line-height: 1.3;
}

.g8-dots {
  letter-spacing: 0.04em;
  font-size: 12px;
  white-space: nowrap;
}

.g8-dot {
  display: inline-block;
}

.g8-cell-starthere {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px 10px;
  gap: 4px;
}

.g8-cell-starthere ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.g8-cell-starthere li {
  font-family: var(--serif);
  font-style: italic;
  font-size: 11px;
  color: var(--neutral-300);
  line-height: 1.4;
  padding-left: 11px;
  position: relative;
  white-space: nowrap;
}

.g8-cell-starthere li::before {
  content: "·";
  position: absolute;
  left: 0;
  top: -3px;
  color: var(--copper-400);
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
}

.g8-cell-starthere-answer {
  color: var(--copper-200);
  font-weight: 500;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS — dot rendering with graded copper intensity
// ─────────────────────────────────────────────────────────────────────────────

// 4 dots = strongest (copper-200) → 1 dot = weakest (copper-700)
// The intensity is keyed off the *count*, so a 4-dot row reads strongest.
const DOT_COLORS: Record<number, string> = {
  4: "var(--copper-200)",
  3: "var(--copper-300)",
  2: "var(--copper-500)",
  1: "var(--copper-700)",
};

function Dots({ count }: { count: number }) {
  if (count <= 0) return null;
  const color = DOT_COLORS[count] ?? "var(--copper-500)";
  return (
    <span className="g8-dots" style={{ color }} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="g8-dot">
          ●
        </span>
      ))}
    </span>
  );
}

function ToolCell({ dots, label }: { dots: number; label: string }) {
  if (dots === 0) {
    return <span className="g8-cell-tool-na">{label}</span>;
  }
  return (
    <span className="g8-cell-tool">
      <span className="g8-cell-tool-label">{label}</span>
      <Dots count={dots} />
    </span>
  );
}

function StartHereContent({
  bullets,
}: {
  bullets: readonly [string, string];
}) {
  return (
    <ul>
      {bullets.map((b, i) => {
        const arrowIdx = b.indexOf("→");
        if (arrowIdx === -1) return <li key={i}>{b}</li>;
        const stem = b.slice(0, arrowIdx + 1);
        const answer = b.slice(arrowIdx + 1).trimStart();
        return (
          <li key={i}>
            {stem}{" "}
            <span className="g8-cell-starthere-answer">{answer}</span>
          </li>
        );
      })}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function G8CapabilityMatrix() {
  const { stepIndex } = useDeck();

  return (
    <>
      <style>{styles}</style>

      {/* STRUCTURAL — FigLabel + Headline (always present) */}
      <FigLabel section="G" num={8} label="CAPABILITY MATRIX" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      {/* CONTENT REGION — wrapped in data-no-advance so hover-highlight
          interactions don't double as click-to-advance gestures. */}
      <div data-no-advance>
        <div
          className="g8-grid"
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            top: 156,
            bottom: 80,
          }}
        >
          {/* Header row — step 0 staggered L→R for first 5 cells,
              step 1 for the 6th (Start here?) header. */}
          <Reveal on={stepIndex >= 0} delay={0} className="g8-header-cell">
            Use case
          </Reveal>
          <Reveal on={stepIndex >= 0} delay={40} className="g8-header-cell">
            Claude
          </Reveal>
          <Reveal on={stepIndex >= 0} delay={80} className="g8-header-cell">
            Google
          </Reveal>
          <Reveal on={stepIndex >= 0} delay={120} className="g8-header-cell">
            OpenAI
          </Reveal>
          <Reveal on={stepIndex >= 0} delay={160} className="g8-header-cell">
            Best fit
          </Reveal>
          <Reveal on={stepIndex >= 1} delay={0} className="g8-header-cell">
            Start here?
          </Reveal>

          {/* Data rows — first 5 cells stagger L→R within each row,
              row-by-row top-to-bottom; 6th cell (Start here?) reveals
              at step 1, row-by-row. */}
          {C.rows.map((row, r) => (
            <div key={row.useCase} className="matrix-row">
              <Reveal
                on={stepIndex >= 0}
                delay={200 + r * 200 + 0 * 40}
                className="g8-cell g8-cell-usecase"
              >
                {row.useCase}
              </Reveal>
              <Reveal
                on={stepIndex >= 0}
                delay={200 + r * 200 + 1 * 40}
                className="g8-cell"
              >
                <ToolCell dots={row.claude.dots} label={row.claude.label} />
              </Reveal>
              <Reveal
                on={stepIndex >= 0}
                delay={200 + r * 200 + 2 * 40}
                className="g8-cell"
              >
                <ToolCell dots={row.google.dots} label={row.google.label} />
              </Reveal>
              <Reveal
                on={stepIndex >= 0}
                delay={200 + r * 200 + 3 * 40}
                className="g8-cell"
              >
                <ToolCell dots={row.openai.dots} label={row.openai.label} />
              </Reveal>
              <Reveal
                on={stepIndex >= 0}
                delay={200 + r * 200 + 4 * 40}
                className="g8-cell g8-cell-bestfit"
              >
                {row.bestFit}
              </Reveal>
              <Reveal
                on={stepIndex >= 1}
                delay={120 + r * 100}
                className="g8-cell g8-cell-starthere"
              >
                <StartHereContent bullets={C.prompts[r].bullets} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER — step 1 reveal, after all Start here? cells appear */}
      <Reveal on={stepIndex >= 1} delay={920}>
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 48,
            right: 48,
            textAlign: "center",
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 18,
            color: "var(--copper-200)",
            letterSpacing: "-0.005em",
          }}
        >
          {highlight(C.footer, [...C.footerKw])}
        </div>
      </Reveal>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE DEF
// ─────────────────────────────────────────────────────────────────────────────

export const g8Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G8CapabilityMatrix />,
};
