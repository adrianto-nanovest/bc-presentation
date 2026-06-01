// K.3 — THANK YOU (final slide of the deck)
//
// The closing beat. Same hero-photo construction as K.1 (full-bleed image +
// three protective gradient overlays + bottom-left beats), but a single step:
// all three beats reveal on entry, staggered by delay rather than by clicks.
// The "open horizon" image bookends K.1's "ready & empty" workspace — the
// door now thrown open onto what comes next.
//
// Reveal / CopperRule are the shared T10 reveal primitives from Section E —
// no Framer Motion. CSS vars only, no hex literals.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "../foundation-core-section-e/components/Reveal";
import { k3Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function K3ThankYou() {
  const { stepIndex } = useDeck();

  // Single step: everything reveals on entry; stagger comes from `delay`.
  const show = stepIndex >= 0;

  return (
    <div
      data-testid="k3-root"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Hero photo — full-bleed open-horizon threshold. */}
      <div
        data-testid="k3-hero"
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
        data-testid="k3-overlay-bottom-left"
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
          against the bright horizon region in the photo. */}
      <div
        data-testid="k3-overlay-top-left"
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
        data-testid="k3-overlay-top-gloom"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.18) 80px, rgba(10,10,10,0) 140px)",
          pointerEvents: "none",
        }}
      />

      <FigLabel section="K" num={3} label={C.figLabel} />

      {/* Bottom-left anchored beats. */}
      <div
        data-testid="k3-beats"
        style={{
          position: "absolute",
          left: 48,
          bottom: 110,
          maxWidth: 1120,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 20,
        }}
      >
        <div
          data-testid="k3-beat1"
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <Reveal on={show} delay={0} data-testid="k3-beat1-lineA">
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
              {highlight(C.beat1.lineA.text, [...C.beat1.lineA.kw])}
            </p>
          </Reveal>
          <Reveal on={show} delay={250} data-testid="k3-beat1-lineB">
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
              {highlight(C.beat1.lineB.text, [...C.beat1.lineB.kw])}
            </p>
          </Reveal>
        </div>

        <CopperRule on={show} width="30%" delay={400} />

        <Reveal on={show} delay={650} data-testid="k3-beat2">
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
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const k3Slide: SlideDef = {
  steps: 1,
  canonicalPose: 0,
  animationMode: "step-reveal",
  surface: "dark",
  section: "K",
  render: () => <K3ThankYou />,
};
