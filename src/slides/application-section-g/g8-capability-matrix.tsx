// G.8 — CAPABILITY MATRIX
//
// Spec §2.G.8 — 6×5 capability matrix (6 use-case rows × 5 columns:
// Use Case + Claude + Google + OpenAI + Best fit) plus a right gutter
// of "Start here?" decision prompts. Step-reveal builds the matrix
// row by row.
//
// Step structure:
//   0 — header row + gutter header
//   1 — row 0 (Chat Q&A) + its prompt
//   2 — row 1 (Document analysis) + its prompt
//   3 — row 2 (Code generation) + its prompt
//   4 — row 3 (Prototype/Design) + its prompt
//   5 — rows 4 + 5 (Agentic + Real-time dashboards) + prompts + footer

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
    minmax(170px, 1.05fr)
    minmax(170px, 1.25fr)
    minmax(170px, 1.25fr)
    minmax(170px, 1.25fr)
    minmax(170px, 1.4fr);
  column-gap: 16px;
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
  font-family: var(--serif);
  font-size: 14px;
  color: var(--neutral-100);
  display: flex;
  align-items: baseline;
  gap: 8px;
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

.g8-prompt-row {
  font-family: var(--serif);
  font-style: italic;
  font-size: 14px;
  color: var(--copper-200);
  line-height: 1.35;
  padding: 14px 0;
  border-bottom: 1px solid rgba(122, 70, 38, 0.2);
  min-height: 52px;
  display: flex;
  align-items: center;
}

.g8-gutter-header {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--copper-300);
  padding: 8px 0 10px;
  border-bottom: 1px solid var(--copper-700);
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
      <Dots count={dots} />
      <span>{label}</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

// Each data row reveals at a specific step. Spec maps:
//   row 0 → step 1, row 1 → step 2, row 2 → step 3, row 3 → step 4,
//   rows 4 + 5 → step 5 (together)
const ROW_REVEAL_STEP = [1, 2, 3, 4, 5, 5] as const;

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
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            top: 156,
            bottom: 80,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 280px",
            columnGap: 32,
          }}
        >
          {/* MAIN — 6×5 matrix */}
          <div className="g8-grid">
            {/* Header row — step 0 */}
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

            {/* Data rows */}
            {C.rows.map((row, i) => {
              const showAt = ROW_REVEAL_STEP[i];
              const visible = stepIndex >= showAt;
              return (
                <Reveal
                  key={row.useCase}
                  on={visible}
                  delay={120}
                  className="matrix-row"
                >
                  <div className="g8-cell g8-cell-usecase">{row.useCase}</div>
                  <div className="g8-cell">
                    <ToolCell dots={row.claude.dots} label={row.claude.label} />
                  </div>
                  <div className="g8-cell">
                    <ToolCell dots={row.google.dots} label={row.google.label} />
                  </div>
                  <div className="g8-cell">
                    <ToolCell dots={row.openai.dots} label={row.openai.label} />
                  </div>
                  <div className="g8-cell g8-cell-bestfit">{row.bestFit}</div>
                </Reveal>
              );
            })}
          </div>

          {/* RIGHT GUTTER — "Start here?" prompts, vertically aligned with rows */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto repeat(6, 1fr)",
              alignItems: "stretch",
            }}
          >
            <Reveal on={stepIndex >= 0} delay={200} className="g8-gutter-header">
              Start here?
            </Reveal>

            {C.prompts.map((prompt, i) => {
              const showAt = ROW_REVEAL_STEP[i];
              const visible = stepIndex >= showAt;
              return (
                <Reveal
                  key={i}
                  on={visible}
                  delay={120}
                  className="g8-prompt-row"
                >
                  {prompt}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER — step 5 reveal */}
      <Reveal on={stepIndex >= 5} delay={240}>
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
  steps: 6,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G8CapabilityMatrix />,
};
