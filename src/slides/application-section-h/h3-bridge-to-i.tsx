// H.3 — BRIDGE · DISCIPLINE (final slide of Section H)
//
// Mirrors `src/slides/application-section-g/g11-bridge-to-h.tsx` exactly —
// only the hero file path, beat text, attribution, and FIG label change.
//
// 2 steps:
//   0 — beat 1 reveals (display-size headline + copper rule).
//   1 — beat 2 reveals (italic copper subline) + mono attribution.
//
// Layout: full-bleed bridge hero photo with three layered gradients
// (bottom-left vignette, top-left ellipse, top-edge gloom) overlaying
// the image to create text-readable areas around the FigLabel and the
// bottom-left beats.
//
// Reveal / CopperRule are the shared T10 reveal primitives from Section E
// — no Framer Motion. CSS vars only, no hex literals.
//
// Hook 2 seeding (do not violate): this slide does NOT name the speaker
// or hint at the meta-frame. The phrase "the colleague who learned the
// discipline first" is the only setup — Section I answers the question.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "../foundation-core-section-e/components/Reveal";
import { h3Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function H3BridgeToI() {
  const { stepIndex } = useDeck();

  const showBeat1 = stepIndex >= 0;
  const showBeat2 = stepIndex >= 1;

  return (
    <div
      data-testid="h3-root"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Hero photo — full-bleed bridge. */}
      <div
        data-testid="h3-hero"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${C.heroSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Vignette: bottom-left — anchors the headline against a dark mass. */}
      <div
        data-testid="h3-overlay-bottom-left"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 35%, rgba(10,10,10,0.0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Vignette: top-left ellipse — protects FigLabel readability
          against the bright sky in the photo. */}
      <div
        data-testid="h3-overlay-top-left"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 520px 280px at top left, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 35%, rgba(10,10,10,0.15) 70%, rgba(10,10,10,0) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Soft top edge gloom — keeps the FigLabel band legible across
          the full top of the slide. */}
      <div
        data-testid="h3-overlay-top-gloom"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.18) 80px, rgba(10,10,10,0) 140px)",
          pointerEvents: "none",
        }}
      />

      <FigLabel section="H" num={3} label={C.figLabel} />

      {/* Bottom-left anchored beats. */}
      <div
        data-testid="h3-beats"
        style={{
          position: "absolute",
          left: 48,
          bottom: 110,
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 20,
        }}
      >
        <Reveal on={showBeat1} data-testid="h3-beat1">
          <p
            style={{
              fontFamily: "var(--display)",
              fontSize: 56,
              color: "var(--neutral-50)",
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            {highlight(C.beat1.text, [...C.beat1.kw])}
          </p>
        </Reveal>

        <CopperRule on={showBeat1} width="30%" delay={400} />

        <Reveal on={showBeat2} delay={150} data-testid="h3-beat2">
          <p
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 40,
              color: "var(--copper-200)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {highlight(C.beat2.text, [...C.beat2.kw])}
          </p>
        </Reveal>

        <Reveal on={showBeat2} delay={300} data-testid="h3-attribution">
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "var(--copper-400)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {C.attribution}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const h3Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "H",
  render: () => <H3BridgeToI />,
};
