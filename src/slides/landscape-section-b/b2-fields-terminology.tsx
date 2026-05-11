// B.2 — AI FIELDS & TERMINOLOGY (THE MAP)
//
// 5 nested rectangles (sharp corners) centered on stage. Outermost = AI;
// innermost = LLMs. Each tier draws in on its step via SVG strokeDashoffset.
// Stroke brightness grades inward — eye is pulled to the LLM core.
//
// Step map (load animation is mount-driven; stepIndex 0 = first Space press):
//   load (on mount): FIG label + bottom italic anchor fade in
//   stepIndex 0:     Tier 1 (ARTIFICIAL INTELLIGENCE) rect draws + label
//   stepIndex 1:     Tier 2 (MACHINE LEARNING) rect + label
//   stepIndex 2:     Tier 3 (DEEP LEARNING) rect + label
//   stepIndex 3:     Tier 4 (GENERATIVE AI) rect + label
//   stepIndex 4:     Tier 5 (LARGE LANGUAGE MODELS) — brightest stroke + glow
//
// Geometry: rectangles (sharp 0px corners), NOT circles. Circles are
// reserved for E.1's Russian-doll metaphor.
import { useEffect, useState, type CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { NestedRect } from "./components/NestedRect";
import { TierLabel } from "./components/TierLabel";
import { b2Content as C } from "./content";

// Stage: 1280×720. Center on (640, 360) but bias UP a bit so the bottom
// italic anchor sits comfortably below the outermost rectangle.
const STAGE_W = 1280;
const STAGE_H = 720;
const CENTER_X = STAGE_W / 2;
const CENTER_Y = 350; // pulled up ~10px from geometric center to free the anchor row

// Tier-by-tier rect dimensions. Spec starter values were 920/760/600/440/280
// wide; reduced to 860/720/580/440/280 so the tier label hanging off each
// top-right corner stays inside the 1280px stage. Verified: longest label
// (`ARTIFICIAL INTELLIGENCE`, ~220px @ 10.5px / 0.24em uppercase mono +
// rule/gap ~20px = ~240px) fits in the ~210-220px right margin.
const TIER_SIZE: Record<1 | 2 | 3 | 4 | 5, { w: number; h: number }> = {
  1: { w: 820, h: 440 },
  2: { w: 700, h: 360 },
  3: { w: 560, h: 280 },
  4: { w: 420, h: 210 },
  5: { w: 280, h: 130 },
};

// Compute the absolute top-right corner of a tier rect in stage coords.
function tierTopRight(tier: 1 | 2 | 3 | 4 | 5): { x: number; y: number } {
  const { w, h } = TIER_SIZE[tier];
  return { x: CENTER_X + w / 2, y: CENTER_Y - h / 2 };
}

// ───────────────────── slide ─────────────────────

export function B2FieldsTerminology() {
  const { stepIndex } = useDeck();

  // Mount-driven load animation — anchor line fades in shortly after mount.
  const [anchorOn, setAnchorOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setAnchorOn(true), 200);
    return () => window.clearTimeout(t);
  }, []);

  // Step gate — each tier reveals at its own stepIndex.
  const tierOn = (i: number) => stepIndex >= i; // tiers[0] is tier 1, etc.

  return (
    <div data-testid="slide-b2" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Background — plain neutral-950 + subtle dot-grid texture. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--neutral-950)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 1,
        }}
      />

      <FigLabel section="B" num={2} label={C.figLabel} />

      {/* Stage layer — nested rects + tier labels. */}
      <div
        data-testid="b2-stage"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
        }}
      >
        {C.tiers.map((t) => {
          const size = TIER_SIZE[t.tier];
          const tr = tierTopRight(t.tier);
          const idx = t.tier - 1;
          const on = tierOn(idx);
          return (
            <Tier
              key={t.tier}
              tier={t.tier}
              label={t.label}
              w={size.w}
              h={size.h}
              topRight={tr}
              on={on}
            />
          );
        })}
      </div>

      {/* Bottom italic anchor — serif italic, centered. Sits below tier-1 rect. */}
      <div
        data-testid="b2-anchor"
        style={anchorStyle(anchorOn)}
      >
        {highlight(C.anchor, C.anchorKw)}
      </div>

      {/* Inline keyframe — slow copper glow halo for the innermost LLM rect. */}
      <style>{`
        @keyframes b2-llm-glow {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(201,133,72,0.30));
          }
          50% {
            filter: drop-shadow(0 0 14px rgba(201,133,72,0.60));
          }
        }
      `}</style>
    </div>
  );
}

// ───────────────────── Tier — rect + label as a unit ─────────────────────

function Tier({
  tier,
  label,
  w,
  h,
  topRight,
  on,
}: {
  tier: 1 | 2 | 3 | 4 | 5;
  label: string;
  w: number;
  h: number;
  topRight: { x: number; y: number };
  on: boolean;
}) {
  const isInnermost = tier === 5;
  return (
    <>
      <NestedRect
        tier={tier}
        width={w}
        height={h}
        on={on}
        glow={isInnermost}
      />
      <TierLabel
        label={label}
        topRight={topRight}
        on={on}
        delay={120}
        bright={tier >= 4}
      />
    </>
  );
}

// ───────────────────── styling helpers ─────────────────────

function anchorStyle(on: boolean): CSSProperties {
  // Sits below tier-1 rect: tier 1 bottom = CENTER_Y + 230 = 580. Leave ~50px.
  const top = CENTER_Y + TIER_SIZE[1].h / 2 + 40;
  return {
    position: "absolute",
    left: 0,
    right: 0,
    top,
    textAlign: "center",
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontSize: 22,
    color: "var(--neutral-300)",
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(6px)",
    transition: "opacity 500ms var(--ease), transform 500ms var(--ease)",
    zIndex: 6,
    padding: "0 80px",
    lineHeight: 1.35,
    // Hide overflow defensively — stage is 720 tall and anchor sits at ~620.
    maxHeight: STAGE_H - top - 36,
  };
}

// ───────────────────── slide def ─────────────────────

export const b2Slide: SlideDef = {
  // 5 stepIndex values (0..4): one per tier reveal.
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "B",
  render: () => <B2FieldsTerminology />,
};
