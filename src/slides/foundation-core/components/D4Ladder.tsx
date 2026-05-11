// Left column of slide D.4 — header label "Decision tree" + copper rule +
// vertical spine + 5-row grid of question rungs (number circle, question
// text, YES/NO branch labels).
//
// The spine extends as questions reveal: `transform: scaleY((revealed-1)/4)`.
// The slide owns the `revealed` count (1..5, capped). Hover state on the
// number circles is owned locally; hover state on terminals is owned by the
// slide and passed down via `terminalHover` so YES/NO branches that lead to
// the hovered terminal heat up.
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:940-1031`.
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { highlight as KW } from "../../../components/highlight";
import { CopperRule, Reveal } from "../../foundation-core-section-e/components/Reveal";
import type { D4Question, D4TerminalKey } from "../content";

export interface D4LadderProps {
  questions: readonly D4Question[];
  /** Number of rungs revealed (1..5), driven by deck step. */
  revealed: number;
  /** Currently-hovered terminal abbrev, or null. Drives YES/NO branch heat-up. */
  terminalHover: D4TerminalKey | null;
}

export function D4Ladder({
  questions,
  revealed,
  terminalHover,
}: D4LadderProps) {
  const [circleHover, setCircleHover] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const spineScaleY = (revealed - 1) / 4;
  const spineStyle: CSSProperties = {
    position: "absolute",
    left: 18,
    top: "10%",
    bottom: "10%",
    width: 2,
    background: "linear-gradient(180deg, var(--copper-300), var(--copper-700))",
    zIndex: 0,
    transform: `scaleY(${spineScaleY})`,
    transformOrigin: "top",
    transition: "transform 0.6s var(--ease)",
  };

  return (
    <div
      data-testid="d4-ladder"
      data-revealed={revealed}
      style={{
        flex: "0 0 700px",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
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
          Decision tree
        </div>
        <CopperRule on width="40%" />
        <div style={{ height: 6 }} />
      </Reveal>

      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <div data-testid="d4-ladder-spine" style={spineStyle} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateRows: "repeat(5, 1fr)",
          }}
        >
          {questions.map((q, i) => {
            const on = mounted && i < revealed;
            const yesT = q.yesTerminal;
            const noT = q.noTerminal;
            const yesActive = !!(terminalHover && yesT && terminalHover === yesT);
            const noActive = !!(terminalHover && noT && terminalHover === noT);
            const cHover = circleHover === q.num;

            const rungStyle: CSSProperties = {
              position: "relative",
              zIndex: 2,
              opacity: on ? 1 : 0,
              transform: on ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 0.5s var(--ease) ${i * 110}ms, transform 0.5s var(--ease) ${i * 110}ms`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            };

            const circleStyle: CSSProperties = {
              flex: "0 0 32px",
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1px solid ${cHover ? "var(--copper-100)" : "var(--copper-300)"}`,
              background: "var(--neutral-900)",
              backgroundImage: cHover
                ? "linear-gradient(rgba(184,110,61,0.35), rgba(184,110,61,0.35))"
                : "linear-gradient(rgba(184,110,61,0.18), rgba(184,110,61,0.18))",
              boxShadow: cHover ? "0 0 0 1px var(--copper-200) inset" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--mono)",
              fontSize: 13,
              color: cHover ? "var(--copper-50)" : "var(--copper-100)",
              marginLeft: 2,
              cursor: "default",
              transition:
                "border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease), color 0.2s var(--ease)",
            };

            return (
              <div
                key={q.num}
                data-testid="d4-rung"
                data-num={q.num}
                data-on={on ? "true" : "false"}
                style={rungStyle}
              >
                <div
                  onMouseEnter={() => setCircleHover(q.num)}
                  onMouseLeave={() => setCircleHover(null)}
                  style={circleStyle}
                >
                  {q.num}
                </div>

                <div style={{ flex: "0 0 360px" }}>
                  <p
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: 19,
                      color: "var(--neutral-100)",
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {KW(q.q, q.kw)}
                  </p>
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    paddingLeft: 12,
                    borderLeft: "1px dashed var(--copper-800)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      color: yesActive
                        ? "var(--copper-100)"
                        : yesT
                        ? "var(--copper-200)"
                        : "var(--neutral-400)",
                      transition: "color 0.2s var(--ease)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 9,
                        letterSpacing: "0.22em",
                        color: yesActive
                          ? "var(--copper-100)"
                          : "var(--copper-300)",
                      }}
                    >
                      YES →
                    </span>
                    <span
                      style={{
                        fontFamily: yesT ? "var(--display)" : "var(--serif)",
                        fontStyle: yesT ? "normal" : "italic",
                        fontSize: yesT ? 16 : 13,
                      }}
                    >
                      {q.yes}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      color: noActive
                        ? "var(--copper-100)"
                        : noT
                        ? "var(--copper-300)"
                        : "var(--neutral-500)",
                      transition: "color 0.2s var(--ease)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 9,
                        letterSpacing: "0.22em",
                        color: noActive
                          ? "var(--copper-100)"
                          : "var(--copper-500)",
                      }}
                    >
                      NO  →
                    </span>
                    <span
                      style={{
                        fontFamily: noT ? "var(--display)" : "var(--serif)",
                        fontStyle: noT ? "normal" : "italic",
                        fontSize: noT ? 16 : 13,
                      }}
                    >
                      {q.no}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
