// Title — "From AI Curiosity to AI Capability"
//
// Opening slide. Sets editorial register (dignity + forward motion). Names
// the workshop and facilitator without spectacle. Background is a photographic
// hero — until `title-data-topology.jpg` lands in `assets/heroes/`, HeroPhoto
// falls back to its built-in deep-near-black + copper-glow radial gradient
// (no 404 in console). DarkenOverlay at strength=0.10 modulates contrast.
//
// Layout —
//   • Headline centered, vertically anchored at ~38–40% from top (slight lift,
//     NOT pure center).
//   • Workshop subtitle directly below.
//   • Attribution chip bottom-right via <AttributionChip>.
//
// Motion (load only — NO step-advances) —
//   • Photo cross-fades in (800ms easeOut)
//   • Headline reveals 200ms later (translate-y 16→0, 600ms)
//   • Subtitle 200ms after the headline
//   • Attribution chip 300ms after the subtitle
// Total: ~1.5s load. Static after load.
//
// Spec slot:
//   - 1 step (canonical-only — `steps:1` per registry convention)
//   - canonicalPose: 0
//   - animationMode: static (Slide.tsx still allows click-to-advance into A.1)
//   - section: A (Title is grouped under the opening section for nav)
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { HeroPhoto } from "@/components/HeroPhoto";
import { DarkenOverlay } from "@/components/DarkenOverlay";
import { DisplayTitle } from "@/components/DisplayTitle";
import { AttributionChip } from "@/components/AttributionChip";
import { titleContent as C } from "./content";

// Asset hasn't landed yet — pass empty src so HeroPhoto paints only the
// fallback gradient (no console 404). When the real photo lands, swap in
// `C.heroSrc` and HeroPhoto will cross-fade it on top.
const HERO_SRC: string | undefined = undefined;

// ───────────────────── slide ─────────────────────

export function Title() {
  // Stage all four reveal layers on mount with a single timer so they
  // chain deterministically. The values mirror the timings in the file
  // header: 0=photo, 1=headline, 2=subtitle, 3=attribution.
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = window.setTimeout(() => setStage(1), 50);   // photo in
    const t2 = window.setTimeout(() => setStage(2), 850);  // headline
    const t3 = window.setTimeout(() => setStage(3), 1050); // subtitle
    const t4 = window.setTimeout(() => setStage(4), 1350); // attribution
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, []);

  const photoOn = stage >= 1;
  const headlineOn = stage >= 2;
  const subtitleOn = stage >= 3;
  const attrOn = stage >= 4;

  // Reveal styles — share the same easeOutExpo curve used across the deck.
  const liftStyle = (on: boolean, lift = 16): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${lift}px)`,
    transition: "opacity 600ms var(--ease), transform 600ms var(--ease)",
    willChange: "opacity, transform",
  });

  return (
    <div
      data-testid="slide-title"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background — hero photo or fallback gradient. Cross-fades in. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: photoOn ? 1 : 0,
          transition: "opacity 800ms ease-out",
        }}
      >
        <HeroPhoto src={HERO_SRC} alt={C.heroAlt} vignetteSide="none" />
      </div>

      {/* Dark wash — background is already dark, this just modulates
          contrast against the centered display headline. */}
      <DarkenOverlay strength={C.darkenStrength} zIndex={15} />

      {/* Centered headline + subtitle, vertically anchored at ~38% from
          top via an inner absolute block. The slight lift (vs. true
          center) keeps the composition from feeling top-heavy once the
          attribution chip lands in the bottom-right. */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: "38%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          zIndex: 20,
        }}
      >
        <div style={liftStyle(headlineOn)}>
          <DisplayTitle
            size={92}
            style={{
              textAlign: "center",
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              color: "var(--neutral-100)",
            }}
          >
            {C.displayHeadline}
          </DisplayTitle>
        </div>

        <p
          style={{
            ...liftStyle(subtitleOn, 12),
            fontFamily: "var(--serif)",
            fontSize: 28,
            color: "var(--neutral-300)",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          {C.subtitle}
        </p>
      </div>

      {/* Attribution chip — bottom-right, copper-400 caps. */}
      <div
        style={{
          ...liftStyle(attrOn, 8),
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 25,
        }}
      >
        <AttributionChip text={C.attribution} />
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const titleSlide: SlideDef = {
  steps: 1, // 0 step-advances; "steps" is total slots — 1 = canonical-only.
  canonicalPose: 0,
  animationMode: "static",
  surface: "dark",
  section: "A",
  render: () => <Title />,
};
