// D.3 — ONE PROCESS · FOUR LEVELS
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:626-910`.
// 5 steps: 0..3 walk the focus through BPM → RPA → IPA → AGENTIC; step 4
// reveals the capstone caption and unlocks hover (hover overrides the
// step-driven focus from step 4 onward).
//
// Layout:
//   FigLabel + Headline (slide-headline-row, .small)
//   Sub-line (mono uppercase, copper-300) under the headline
//   4-column grid (1fr each) of `D3LevelCard`s — each carrying its own
//   looping motion glyph (`D3*Anim`) as `children`.
//   Capstone caption row at the bottom (height reserved so the grid
//   doesn't shift when it appears).
//
// Step gating logic per card (index `i` in 0..3):
//   focused  = stepIndex === i
//   revealed = stepIndex >= i              (lit but not highlighted)
//   hovered  = canHover && hoverKey === key (overrides focus visually
//              via D3LevelCard's `highlight = focused || hovered`)
//   canHover = stepIndex >= 4              (hover only unlocks at capstone)
//
// canonicalPose = 4 — the capstone step where hover is unlocked.
import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { D3LevelCard } from "./components/D3LevelCard";
import {
  D3BpmAnim,
  D3RpaAnim,
  D3IpaAnim,
  D3AgenticAnim,
} from "./components/D3Anims";
import { d3Content as C, type D3LevelKey } from "./content";

// Map: which animation belongs to which level key (mirrors the design
// source's `D3LevelAnim` switch).
function D3LevelAnim({ levelKey, copper }: { levelKey: D3LevelKey; copper: string }) {
  if (levelKey === "bpm") return <D3BpmAnim copper={copper} />;
  if (levelKey === "rpa") return <D3RpaAnim copper={copper} />;
  if (levelKey === "ipa") return <D3IpaAnim copper={copper} />;
  if (levelKey === "agentic") return <D3AgenticAnim copper={copper} />;
  return null;
}

export function D3OneProcessFourLevels() {
  const { stepIndex } = useDeck();
  const showCap = stepIndex >= 4;
  // Hover only unlocks once the auto-focus walk has finished (step >= 4).
  // Until then, the focused card is driven by the step pointer.
  const canHover = stepIndex >= 4;
  const [hovered, setHovered] = useState<D3LevelKey | null>(null);

  return (
    <>
      <FigLabel section="D" num={3} label="ONE PROCESS · FOUR LEVELS" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {KW(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* Stage block — sub-line + 4-column grid + capstone slot. */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 152,
          bottom: 56,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Sub-line — always visible (mono caps, copper-300). */}
        <Reveal on style={{ marginTop: 4 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--copper-300)",
              textTransform: "uppercase",
            }}
          >
            {KW(C.sub, C.subKw)}
          </span>
        </Reveal>

        {/* 4-column grid — one D3LevelCard per level. */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            minHeight: 0,
          }}
        >
          {C.levels.map((lv, i) => {
            const focused = stepIndex === i;
            const isHovered = canHover && hovered === lv.key;
            const revealed = stepIndex >= i;
            return (
              <D3LevelCard
                key={lv.key}
                level={lv}
                index={i}
                focused={focused}
                hovered={isHovered}
                revealed={revealed}
                canHover={canHover}
                onMouseEnter={
                  canHover ? () => setHovered(lv.key) : undefined
                }
                onMouseLeave={
                  canHover
                    ? () =>
                        setHovered((h) => (h === lv.key ? null : h))
                    : undefined
                }
              >
                <D3LevelAnim levelKey={lv.key} copper={lv.copper} />
              </D3LevelCard>
            );
          })}
        </div>

        {/* Capstone — left-aligned, serif italic, copper-200. Height
            reserved so the grid above doesn't shift when it appears. */}
        <div style={{ minHeight: 22 }}>
          <Reveal on={showCap}>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 15,
                color: "var(--copper-200)",
                margin: 0,
                textAlign: "left",
                lineHeight: 1.3,
              }}
            >
              {KW(C.capstone, C.capstoneKw)}
            </p>
          </Reveal>
        </div>
      </div>
    </>
  );
}

export const d3Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  section: "D",
  render: () => <D3OneProcessFourLevels />,
};
