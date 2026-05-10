// E.10 — HARNESS · PRACTICES
//
// Ported from `claude-design-project/jsx/slides-c.jsx:103-164`.
//
// 2 steps:
//   0 — 8 practice cards stagger in (auto via double-rAF mount trick)
//   1 — footer caption visible
//
// Layout: 4-column × 2-row grid of 8 practice cards. Each card carries an
// icon, name, sequence number, pattern chip, and 3 bullets. The previous
// click-to-expand-shrink interaction has been dropped per the new design —
// these are static cards now (with optional `.pcard:hover` polish from
// globals.css).
//
// Reveal / CopperRule are the shared T10 reveal primitives — no Framer
// Motion. CSS vars only, no hex literals.
import { useEffect, useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { LucideIcon } from "./components/LucideIcon";
import { Reveal } from "./components/Reveal";
import { e10Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function E10HarnessPractices() {
  const { stepIndex } = useDeck();

  // Double-rAF mount trick (ported from slides-c.jsx:104-116).
  // Guarantees the browser paints the off-state first so the .fade
  // transition can play when we flip to on. We re-arm whenever step 0
  // becomes active so the stagger replays on backward navigation too.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (stepIndex >= 0) {
      setMounted(false);
      const r1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMounted(true));
      });
      return () => cancelAnimationFrame(r1);
    }
    setMounted(false);
    return undefined;
  }, [stepIndex >= 0]);

  const showCards = mounted && stepIndex >= 0;
  const showFooter = stepIndex >= 1;

  return (
    <>
      <FigLabel section="E" num={10} label="HARNESS · PRACTICES" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      <div
        data-testid="e10-content"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 158,
          bottom: 60,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          data-testid="e10-grid"
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "1fr 1fr",
            gap: 10,
            minHeight: 0,
          }}
        >
          {C.practices.map((p, i) => (
            <Reveal
              key={p.id}
              on={showCards}
              delay={120 + i * 180}
              data-testid={`practice-card-${p.id}`}
              style={{ display: "flex", minHeight: 0, minWidth: 0 }}
            >
              <div
                className="pcard"
                style={{
                  flex: 1,
                  gap: 8,
                  padding: "12px 14px",
                  minHeight: 0,
                  minWidth: 0,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <LucideIcon name={p.icon} size={18} />
                  <span
                    data-testid={`practice-card-${p.id}-name`}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11.5,
                      letterSpacing: "0.16em",
                      color: "var(--neutral-50)",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.name}
                  </span>
                  <span style={{ flex: 1 }} />
                  <span
                    data-testid={`practice-card-${p.id}-seq`}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      letterSpacing: "0.22em",
                      color: "var(--copper-700)",
                      textTransform: "uppercase",
                    }}
                  >
                    0{i + 1} / 08
                  </span>
                </div>
                <div
                  style={{
                    height: 1,
                    background: "var(--copper-800)",
                    width: "100%",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 12.5,
                    color: "var(--neutral-200)",
                    lineHeight: 1.3,
                  }}
                >
                  {p.essence}
                </span>
                <div
                  data-testid={`practice-card-${p.id}-pattern`}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: "var(--copper-200)",
                    padding: "6px 9px",
                    border: "1px solid var(--copper-800)",
                    background: "rgba(0,0,0,0.45)",
                    lineHeight: 1.3,
                    letterSpacing: "0.02em",
                  }}
                >
                  {p.pattern}
                </div>
                <ul
                  data-testid={`practice-card-${p.id}-bullets`}
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {p.bullets.map((b, j) => (
                    <li
                      key={j}
                      data-testid={`practice-card-${p.id}-bullet-${j}`}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                        fontFamily: "var(--serif)",
                        fontSize: 12,
                        color: "var(--neutral-300)",
                        lineHeight: 1.3,
                      }}
                    >
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          background: "var(--copper-500)",
                          flexShrink: 0,
                          transform: "translateY(-2px)",
                        }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div
          style={{
            minHeight: 20,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Reveal on={showFooter} data-testid="e10-footer">
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 13.5,
                color: "var(--neutral-400)",
                margin: 0,
              }}
            >
              {highlight(C.footer, C.footerKw)}
            </p>
          </Reveal>
        </div>
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const e10Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E10HarnessPractices />,
};
