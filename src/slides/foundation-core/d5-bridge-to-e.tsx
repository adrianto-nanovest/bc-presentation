// D.5 — BRIDGE TO E
//
// Ported line-by-line from `claude-design-section-d/jsx/slides-d.jsx:1103-1162`.
//
// 3 steps. Two big lines + a bridge cue. Bottom-left aligned.
// Subtle horizon glow rises behind the type as steps reveal.
//
//   step 0 — beat1 reveals + radial horizon glow fades in
//   step 1 — beat2 reveals + 1px copper horizon line fades in
//   step 2 — bridge cue reveals (italic + monospace attribution)
//
// Layout: full-bleed hero photo (`<HeroPhoto>` provides the photo + the
// bottom-left vignette), then on top of it the design's two horizon-glow
// layers (radial ellipse + 1px copper line), then the FigLabel, then the
// editorial stack anchored at `bottom: 100, left: 80, right: 80` with
// `justify-content: flex-end`.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HeroPhoto } from "@/components/HeroPhoto";
import { highlight } from "@/components/highlight";
import { Reveal } from "../foundation-core-section-e/components/Reveal";
import { d5Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function D5BridgeToE() {
  const { stepIndex } = useDeck();

  const showA = stepIndex >= 0;
  const showB = stepIndex >= 1;
  const showC = stepIndex >= 2;

  return (
    <div
      data-testid="d5-root"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Hero photo + bottom-left vignette (covers photo + dark overlay). */}
      <HeroPhoto src="/heroes/d5-bridge.jpg" alt="" vignetteSide="bottom-left" />

      {/* Horizon glow — radial ellipse, fades in on step 0. */}
      <div
        data-testid="d5-horizon-glow"
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "60%",
          background:
            "radial-gradient(ellipse at 30% 110%, rgba(184,110,61,0.45), rgba(10,10,10,0) 60%)",
          opacity: showA ? 1 : 0,
          transition: "opacity 1.2s var(--ease)",
          zIndex: 11,
          pointerEvents: "none",
        }}
      />

      {/* Horizon line — 1px copper, fades in on step 1. */}
      <div
        data-testid="d5-horizon-line"
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--copper-500), transparent)",
          opacity: showB ? 1 : 0,
          transition: "opacity 1s var(--ease) 200ms",
          zIndex: 12,
          pointerEvents: "none",
        }}
      />

      <FigLabel section="D" num={5} label="THE NEXT QUESTION" />

      {/* Editorial stack — anchored bottom-left via flex-end. */}
      <div
        data-testid="d5-stack"
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 130,
          bottom: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 22,
          zIndex: 20,
        }}
      >
        <Reveal on={showA} data-testid="d5-beat1">
          <p
            style={{
              fontFamily: "var(--display)",
              fontSize: 72,
              color: "var(--neutral-50)",
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {highlight(C.beat1.text, C.beat1.kw)}
          </p>
        </Reveal>

        <Reveal on={showB} delay={150} data-testid="d5-beat2">
          <p
            style={{
              fontFamily: "var(--display)",
              fontSize: 56,
              color: "var(--copper-200)",
              margin: 0,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {highlight(C.beat2.text, C.beat2.kw)}
          </p>
        </Reveal>

        <Reveal on={showC} delay={150} data-testid="d5-bridge">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              marginTop: 8,
              paddingLeft: 18,
              borderLeft: "2px solid var(--copper-500)",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 24,
                color: "var(--neutral-300)",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {highlight(C.bridge.text, C.bridge.kw)}
            </p>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--copper-300)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {C.attr}
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const d5Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "D",
  render: () => <D5BridgeToE />,
};
