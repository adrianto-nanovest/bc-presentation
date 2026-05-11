// D.4 — WHICH LEVEL · WHEN
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:921-1095`.
//
// 6 steps:
//   0..4 — reveal rungs 1..5 in sequence (each rung = one decision question)
//   5    — bottom-left footer caption appears ("Skip a level…")
//
// Layout:
//   - Left 700px column = D4Ladder (header label "Decision tree", copper rule,
//     vertical spine that scales 0→1 as rungs reveal, 5-row grid of rungs).
//   - Right column = header label "Outcomes", copper rule, 5-row grid of
//     D4TerminalCards (STOP / BPM / RPA / IPA / AGENTIC).
//   - Footer in bottom-left under the ladder column.
//
// Hover wiring:
//   - Slide owns `terminalHover` (D4TerminalKey | null).
//   - D4TerminalCard.onHoverEnter/onHoverLeave lifts that state up.
//   - D4Ladder receives `terminalHover` and heats the matching YES/NO branch
//     when a terminal is hovered.
//
// canonicalPose = 5 (final step shows everything including the footer).
import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { CopperRule, Reveal } from "../foundation-core-section-e/components/Reveal";
import { D4Ladder } from "./components/D4Ladder";
import { D4TerminalCard } from "./components/D4TerminalCard";
import { d4Content as C } from "./content";
import type { D4TerminalKey } from "./content";

export function D4DecisionPattern() {
  const { stepIndex } = useDeck();

  // stepIndex 0..4 reveals rungs 1..5; cap at 5. Step 5 only adds the footer.
  const revealed = Math.min(stepIndex + 1, 5);
  const showFooter = stepIndex >= 5;

  // Hover state lifted to slide so it can drive both the right-column
  // terminal-card highlight AND the matching YES/NO branch coloring on the
  // left-column ladder.
  const [terminalHover, setTerminalHover] = useState<D4TerminalKey | null>(
    null
  );

  return (
    <>
      <FigLabel section="D" num={4} label="WHICH LEVEL · WHEN" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {KW(C.headline, C.headlineKw)}
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 24,
            minHeight: 0,
          }}
        >
          {/* LEFT — ladder */}
          <D4Ladder
            questions={C.questions}
            revealed={revealed}
            terminalHover={terminalHover}
          />

          {/* RIGHT — terminal cards */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              position: "relative",
            }}
          >
            <Reveal on>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: "var(--copper-400)",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Outcomes
              </div>
              <CopperRule on width="40%" />
              <div style={{ height: 6 }} />
            </Reveal>

            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateRows: "repeat(5, 1fr)",
                minHeight: 0,
              }}
            >
              {(Object.entries(C.terminals) as Array<
                [D4TerminalKey, (typeof C.terminals)[D4TerminalKey]]
              >).map(([abbrev, t]) => {
                const fromYes = C.questions.find(
                  (q) => q.yesTerminal === abbrev
                );
                const fromNo = C.questions.find(
                  (q) => q.noTerminal === abbrev
                );
                const fromQ = fromYes ?? fromNo;
                const branch: "YES" | "NO" = fromYes ? "YES" : "NO";
                const stepReveal = fromQ ? fromQ.num : 1;
                const on = revealed >= stepReveal;
                const isHover = terminalHover === abbrev;

                return (
                  <D4TerminalCard
                    key={abbrev}
                    abbrev={abbrev}
                    terminal={t}
                    qNum={fromQ ? fromQ.num : null}
                    branch={branch}
                    isHover={isHover}
                    on={on}
                    onHoverEnter={() => setTerminalHover(abbrev)}
                    onHoverLeave={() =>
                      setTerminalHover((h) => (h === abbrev ? null : h))
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer — bottom-left under the ladder column. */}
        <div style={{ display: "flex" }}>
          <div style={{ flex: "0 0 700px" }}>
            <Reveal on={showFooter} data-testid="d4-footer">
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 16,
                  color: "var(--copper-200)",
                  margin: 0,
                }}
              >
                {KW(C.footer, C.footerKw)}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const d4Slide: SlideDef = {
  steps: 6,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "D",
  render: () => <D4DecisionPattern />,
};
