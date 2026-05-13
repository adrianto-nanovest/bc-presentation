// E.9 — HARNESS · WHAT & WHY
//
// Ported from `claude-design-project/jsx/slides-c.jsx:5-98`.
//
// 5 steps:
//   0 — left pane reveals (sub-kicker, copper rule, definition, 4 why-points)
//   1 — "Includes" package (the 6 context mitigations) reveals on left
//   2 — equation `Agent = Model + Harness` + Cursor quote reveal on right
//   3 — 4-line stanza reveals
//   4 — italic tagline reveals
//
// Layout uses absolute coordinates against the 1280×720 stage. Reveal /
// CopperRule are the shared T10 reveal primitives — no Framer Motion. The
// legacy NodeNetwork compression sequence has been dropped per the new
// design (claude-design-revamp.md §2.4).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "./components/Reveal";
import { e9Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function E9HarnessWhatWhy() {
  const { stepIndex } = useDeck();

  const showLeft = stepIndex >= 0;
  const showIncludes = stepIndex >= 1;
  const showEq = stepIndex >= 2;
  const showStanza = stepIndex >= 3;
  const showTagline = stepIndex >= 4;

  return (
    <>
      <FigLabel section="E" num={9} label="LAYER 3 · HARNESS" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* LEFT — sub + definition + 4 why-points + Includes package.
          Top:156 / bottom:80 aligns with the codebase's `.slide-content`
          rule (the design source uses 170/80 — we follow the codebase
          convention as established in T14–T17). */}
      <div
        data-testid="e9-left-pane"
        style={{
          position: "absolute",
          left: 48,
          top: 156,
          width: 500,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <Reveal on={showLeft} data-testid="e9-definition">
          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: 19,
              color: "var(--neutral-100)",
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            {highlight(C.definition, C.definitionKw)}
          </p>
        </Reveal>

        <CopperRule on={showLeft} width="40%" delay={250} />

        <div style={{ height: 4 }} />

        <ul
          data-testid="e9-why-list"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {C.whyPoints.map((b, i) => (
            <Reveal
              key={i}
              on={showLeft}
              delay={350 + i * 130}
              as="li"
              data-testid={`e9-why-${i}`}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                fontFamily: "var(--serif)",
                fontSize: 15,
                color: "var(--neutral-300)",
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "var(--copper-400)",
                  flexShrink: 0,
                  transform: "translateY(-1px)",
                }}
              />
              <span>{highlight(b.text, b.kw)}</span>
            </Reveal>
          ))}
        </ul>

        <div style={{ flex: 1 }} />

        {/* HARNESS package — the six context mitigations. */}
        <Reveal
          on={showIncludes}
          delay={150}
          data-testid="e9-includes-package"
        >
          <div
            style={{
              border: "1px solid var(--copper-700)",
              padding: "14px 16px",
              background: "rgba(184,110,61,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <span
                data-testid="e9-includes-kicker"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  color: "var(--copper-200)",
                  textTransform: "uppercase",
                }}
              >
                {C.includesKicker}
              </span>
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: "var(--copper-800)",
                }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 6,
              }}
            >
              {C.includes.map((item, i) => (
                <Reveal
                  key={item}
                  on={showIncludes}
                  delay={250 + i * 60}
                  data-testid={`e9-include-${i}`}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--copper-300)",
                      padding: "5px 10px",
                      border: "1px solid var(--copper-800)",
                      display: "inline-block",
                      width: "100%",
                    }}
                  >
                    {item}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* RIGHT — equation + Cursor quote + 4-line stanza + tagline. */}
      <div
        data-testid="e9-right-pane"
        style={{
          position: "absolute",
          right: 48,
          top: 156,
          width: 540,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Reveal on={showEq} data-testid="e9-equation">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              fontFamily: "var(--display)",
              fontSize: 56,
              color: "var(--neutral-50)",
              lineHeight: 1,
            }}
          >
            <span
              style={{
                color: "var(--copper-300)",
                fontStyle: "italic",
              }}
            >
              Agent
            </span>
            <span>=</span>
            <span>Model</span>
            <span>+</span>
            <span
              style={{
                color: "var(--copper-300)",
                fontStyle: "italic",
              }}
            >
              Harness
            </span>
          </div>
        </Reveal>

        <CopperRule on={showEq} width="60%" delay={400} />

        <Reveal on={showEq} delay={650} data-testid="e9-quote">
          <div>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 18,
                color: "var(--neutral-200)",
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              {"“"}
              {highlight(C.quote, C.quoteKw)}
              {"”"}
            </p>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                color: "var(--neutral-500)",
                textTransform: "uppercase",
                textAlign: "right",
                margin: "6px 0 0 0",
              }}
            >
              — Cursor engineering
            </p>
          </div>
        </Reveal>

        <CopperRule on={showStanza} width="40%" />

        <div
          data-testid="e9-stanza"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {C.stanza.map((line, i) => (
            <Reveal
              key={line}
              on={showStanza}
              delay={i * 200}
              data-testid={`e9-stanza-${i}`}
            >
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 17,
                  color: "var(--neutral-100)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {line}
              </p>
            </Reveal>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <Reveal on={showTagline} data-testid="e9-tagline">
          <p
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 32,
              color: "var(--copper-200)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {C.tagline}
          </p>
        </Reveal>
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const e9Slide: SlideDef = {
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E9HarnessWhatWhy />,
};
