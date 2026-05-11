// F.9 — NEXT · BRIDGE TO G (final slide of Section F)
//
// Photographic exhale closing Section F. Mirrors E.11 structurally —
// hero photo + three layered gradients (bottom-left vignette, top-left
// ellipse, top-edge gloom), FigLabel top-left, bottom-left anchored
// beats: headline → copper rule → italic copper subline.
//
// 4 reveal steps (spec §12.4):
//   0 — photo + vignettes only.
//   1 — headline reveals "Techniques covered."
//   2 — copper rule animates 0 → 30% (delay 400, follows headline).
//   3 — subline reveals "Tools next." (italic, copper-200, large display).
//
// Hero photo (per spec §12.3): pre-dawn light over a cinematic landscape,
// copper sun catching distant horizon, no people, wide angle, single
// light source from horizon. Generated via gemini-3-pro-image with the
// "dawn of new tools" mood prompt; stored at /assets/heroes/f9-bridge.jpg
// (Vite publicDir=assets serves it at /heroes/f9-bridge.jpg).
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "./components/Reveal";
import { f9Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function F9BridgeToG() {
  const { stepIndex } = useDeck();

  const showHeadline = stepIndex >= 1;
  const showRule = stepIndex >= 2;
  const showSubline = stepIndex >= 3;

  return (
    <div
      data-testid="f9-root"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Hero photo — full-bleed pre-dawn horizon. */}
      <div
        data-testid="f9-hero"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/heroes/f9-bridge.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Vignette: bottom-left — anchors the headline against a dark mass. */}
      <div
        data-testid="f9-overlay-bottom-left"
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
          against the bright horizon in the photo. */}
      <div
        data-testid="f9-overlay-top-left"
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
        data-testid="f9-overlay-top-gloom"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.18) 80px, rgba(10,10,10,0) 140px)",
          pointerEvents: "none",
        }}
      />

      <FigLabel section="F" num={9} label="NEXT" />

      {/* Bottom-left anchored beats. */}
      <div
        data-testid="f9-beats"
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
        <Reveal on={showHeadline} data-testid="f9-beat1">
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
            {highlight(C.beat1.text, C.beat1.kw)}
          </p>
        </Reveal>

        <CopperRule on={showRule} width="30%" delay={400} />

        <Reveal on={showSubline} delay={150} data-testid="f9-beat2">
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

export const f9Slide: SlideDef = {
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F9BridgeToG />,
};
