// E.7 — CONTEXT · STRATEGIES
//
// Ported from `claude-design-project/jsx/slides-b.jsx:384-448`.
//
// 6 steps:
//   0 — headline + funnel canvas (rings always visible from step 0)
//   1 — card 1 (WRITE) reveals
//   2 — card 2 (SELECT) reveals
//   3 — card 3 (COMPRESS) reveals
//   4 — card 4 (ISOLATE) reveals
//   5 — footer reveals
//
// Hover: hovering card N → ring N glows (via FunnelAnimation hoveredIndex prop).
// Layout uses absolute coordinates against the 1280×720 stage.
// `padding: 0 10%` on the card row aligns each card center with the
// corresponding ring center (0.20 / 0.40 / 0.60 / 0.80 of width).
//
// No Framer Motion — Reveal is the shared T10 reveal primitive.
import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "./components/Reveal";
import { FunnelAnimation } from "./components/FunnelAnimation";
import { e8Content as C } from "./content";

export function E8ContextStrategies() {
  const { stepIndex } = useDeck();
  const [hover, setHover] = useState<number | null>(null);

  const showFooter = stepIndex >= 5;

  // A card at index `i` is revealed once stepIndex >= i + 1. Clamp the value
  // we pass to FunnelAnimation so a stale `hover` (e.g. after stepping
  // backward) can't keep an unrevealed ring glowing.
  const effectiveHover =
    hover !== null && stepIndex >= hover + 1 ? hover : null;

  return (
    <>
      <FigLabel section="E" num={8} label="CONTEXT STRATEGIES" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* Animation band — full content width, ~230px tall.
          Sits between the headline (top:48 area) and the card row. */}
      <div
        data-testid="e8-funnel-band"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          height: 230,
          pointerEvents: "none",
        }}
      >
        <FunnelAnimation hoveredIndex={effectiveHover} />
      </div>

      {/* Card row — 4×1 grid, padded to 10% so card centers align with the
          funnel ring centers (0.20 / 0.40 / 0.60 / 0.80). */}
      <div
        data-testid="e8-card-row"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 400,
          bottom: 80,
          padding: "0 10%",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}
      >
        {C.rings.map((r, i) => {
          const revealed = stepIndex >= i + 1;
          const isHover = effectiveHover === i;
          return (
            <Reveal
              key={r.id}
              on={revealed}
              delay={i * 100}
              data-testid={`e8-card-${r.id}`}
              data-revealed={revealed ? "true" : "false"}
              data-hover={isHover ? "true" : "false"}
              style={{ display: "flex" }}
            >
              <div
                onMouseEnter={revealed ? () => setHover(i) : undefined}
                onMouseLeave={
                  revealed
                    ? () => setHover((h) => (h === i ? null : h))
                    : undefined
                }
                className="e8-card"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "14px 16px",
                  background: isHover
                    ? "rgba(20,12,6,0.95)"
                    : "rgba(10,10,10,0.7)",
                  border: "1px solid",
                  borderColor: isHover
                    ? "var(--copper-300)"
                    : revealed
                      ? `var(--${r.copper})`
                      : "var(--copper-800)",
                  boxShadow: isHover
                    ? "0 0 0 1px var(--copper-300) inset"
                    : "none",
                  pointerEvents: revealed ? "auto" : "none",
                  transition:
                    "background 0.2s var(--ease), border-color 0.2s var(--ease), box-shadow 0.2s var(--ease)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: "var(--copper-500)",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      height: 1,
                      background: isHover
                        ? "var(--copper-300)"
                        : "var(--copper-800)",
                      transition: "background 0.2s var(--ease)",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    letterSpacing: "0.22em",
                    color: `var(--${r.copper})`,
                    textTransform: "uppercase",
                  }}
                >
                  {r.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 13,
                    color: "var(--neutral-200)",
                    lineHeight: 1.35,
                  }}
                >
                  {r.sub}
                </span>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "4px 0 0 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  {r.list.map((li) => (
                    <li
                      key={li}
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 10.5,
                        color: isHover
                          ? "var(--copper-200)"
                          : "var(--copper-300)",
                        transition: "color 0.2s var(--ease)",
                      }}
                    >
                      · {li}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal
        on={showFooter}
        data-testid="e8-footer"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 30,
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--neutral-400)",
            margin: 0,
          }}
        >
          {highlight(C.footer, C.footerKw)}
        </p>
      </Reveal>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const e8Slide: SlideDef = {
  steps: 6,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E8ContextStrategies />,
};
