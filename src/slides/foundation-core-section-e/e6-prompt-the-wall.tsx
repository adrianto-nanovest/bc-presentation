// E.5 — PROMPT · THE WALL
//
// Ported from `claude-design-project/jsx/slides-b.jsx:5-74`.
//
// 4 steps:
//   0 — BP card reveals (Best Practices, left)
//   1 — CM card reveals (Common Mistakes, right)
//   2 — "WHERE PROMPT ENDS" wall section + 3-column constraint grid
//   3 — italic closing line at the bottom
//
// Layout uses absolute coordinates against the 1280×720 stage. Reveal is the
// shared T10 reveal primitive — no Framer Motion here. Card hover transitions
// are handled by the `.e6-card` / `.e6-constraint` rules in globals.css (T3).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "./components/Reveal";
import { e6Content as C } from "./content";

export function E6PromptTheWall() {
  const { stepIndex } = useDeck();

  const showBP = stepIndex >= 0;
  const showCM = stepIndex >= 1;
  const showWall = stepIndex >= 2;
  const showClosing = stepIndex >= 3;

  return (
    <>
      <FigLabel section="E" num={6} label="LIMITS OF PROMPTING" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* Slide content area — matches the .slide-content rule
          (left:48, right:48, top:156, bottom:80). The design source uses
          top:170 but we align to the codebase's existing slide-content rule
          per the T14 task notes. */}
      <div
        data-testid="e6-content"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {/* Top 2-column row: BP + CM cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <Reveal
            on={showBP}
            data-testid="e6-bp-card"
            className="card e6-card"
            style={{ borderColor: "var(--copper-300)" }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--copper-300)",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Best Practices
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {C.bp.map((b, i) => (
                <li
                  key={b}
                  data-testid={`e6-bp-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                    fontFamily: "var(--serif)",
                    fontSize: 16,
                    color: "var(--neutral-100)",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      background: "var(--copper-300)",
                      flexShrink: 0,
                      transform: "translateY(-1px)",
                    }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            on={showCM}
            delay={120}
            data-testid="e6-cm-card"
            className="card e6-card"
            style={{ borderColor: "var(--copper-700)" }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--copper-500)",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Common Mistakes
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {C.cm.map((b, i) => (
                <li
                  key={b}
                  data-testid={`e6-cm-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                    fontFamily: "var(--serif)",
                    fontSize: 16,
                    color: "var(--neutral-300)",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      background: "var(--copper-700)",
                      flexShrink: 0,
                      transform: "translateY(-1px)",
                    }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Wall section — full-width, with 3-col constraint grid */}
        <Reveal
          on={showWall}
          delay={150}
          data-testid="e6-wall"
          style={{ flex: 1, display: "flex", minHeight: 0 }}
        >
          <div
            style={{
              borderTop: "1px solid var(--copper-700)",
              paddingTop: 18,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  color: "var(--copper-200)",
                  textTransform: "uppercase",
                }}
              >
                Where prompt ends
              </span>
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 16,
                  color: "var(--neutral-300)",
                }}
              >
                {highlight(C.wallSub, C.wallSubKw)}
              </span>
            </div>
            <div
              data-testid="e6-constraint-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                flex: 1,
                minHeight: 0,
              }}
            >
              {C.constraints.map((c, i) => (
                <div
                  key={c}
                  data-testid={`e6-constraint-${i}`}
                  className="e6-constraint"
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    fontFamily: "var(--serif)",
                    fontSize: 14,
                    color: "var(--neutral-200)",
                    padding: "14px 16px",
                    border: "1px solid var(--copper-800)",
                    background: "rgba(10,10,10,0.5)",
                    lineHeight: 1.35,
                  }}
                >
                  <span
                    className="e6-constraint-num"
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--copper-500)",
                      minWidth: 18,
                    }}
                  >
                    0{i + 1}
                  </span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Closing line */}
        <Reveal on={showClosing} data-testid="e6-closing">
          <p
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 22,
              color: "var(--copper-200)",
              margin: 0,
            }}
          >
            {highlight(C.closing, C.closingKw)}
          </p>
        </Reveal>
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const e6Slide: SlideDef = {
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E6PromptTheWall />,
};
