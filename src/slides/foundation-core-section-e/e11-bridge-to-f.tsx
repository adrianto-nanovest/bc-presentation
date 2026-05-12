// E.11 — BRIDGE · BUILT (final slide of Section E)
//
// Ported from `claude-design-project/jsx/slides-c.jsx:167-196`.
//
// 2 steps:
//   0 — beat 1 reveals (display-size headline + copper rule).
//   1 — beat 2 reveals (italic copper subline).
//
// Layout: full-bleed bridge hero photo with three layered gradients
// (bottom-left vignette, top-left ellipse, top-edge gloom) overlaying
// the image to create text-readable areas around the FigLabel and the
// bottom-left beats.
//
// Reveal / CopperRule are the shared T10 reveal primitives — no Framer
// Motion. CSS vars only, no hex literals.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "./components/Reveal";
import { e11Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function E11BridgeToF() {
  const { stepIndex } = useDeck();

  const showBeat1 = stepIndex >= 0;
  const showBeat2 = stepIndex >= 1;

  return (
    <div
      data-testid="e11-root"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Hero photo — full-bleed bridge. */}
      <div
        data-testid="e11-hero"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/heroes/e11-bridge.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Vignette: bottom-left — anchors the headline against a dark mass. */}
      <div
        data-testid="e11-overlay-bottom-left"
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
        data-testid="e11-overlay-top-left"
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
        data-testid="e11-overlay-top-gloom"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.18) 80px, rgba(10,10,10,0) 140px)",
          pointerEvents: "none",
        }}
      />

      <FigLabel section="E" num={11} label="BRIDGE · BUILT" />

      {/* Bottom-left anchored beats. */}
      <div
        data-testid="e11-beats"
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
        <div
          data-testid="e11-beat1"
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <Reveal on={showBeat1} delay={0} data-testid="e11-beat1-lineA">
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
              {highlight(C.beat1.lineA.text, C.beat1.lineA.kw)}
            </p>
          </Reveal>
          <Reveal on={showBeat1} delay={250} data-testid="e11-beat1-lineB">
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
              {highlight(C.beat1.lineB.text, C.beat1.lineB.kw)}
            </p>
          </Reveal>
        </div>

        <CopperRule on={showBeat1} width="30%" delay={400} />

        <Reveal on={showBeat2} delay={150} data-testid="e11-beat2">
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
            {highlight(C.beat2.text, C.beat2.kw)}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const e11Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E11BridgeToF />,
};
