// Title — "From AI Curiosity to AI Capability"
//
// Opening slide. Headline + serif tagline + workshop meta line stack at
// left:80; speaker info chip sits bottom-left to share that left edge. A
// left-side darken gradient lifts the title text off the hero photo.
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Mic } from "lucide-react";
import type { SlideDef } from "@/deck/types";
import { HeroPhoto } from "@/components/HeroPhoto";
import { DarkenOverlay } from "@/components/DarkenOverlay";
import { DisplayTitle } from "@/components/DisplayTitle";
import { highlight as KW } from "@/components/highlight";
import { titleContent as C } from "./content";

// ───────────────────── slide ─────────────────────

export function Title() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = window.setTimeout(() => setStage(1), 50);   // photo in
    const t2 = window.setTimeout(() => setStage(2), 850);  // headline
    const t3 = window.setTimeout(() => setStage(3), 1100); // tagline
    const t4 = window.setTimeout(() => setStage(4), 1300); // workshop chip (under tagline)
    const t5 = window.setTimeout(() => setStage(5), 1500); // speaker info chip (bottom-left)
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
    };
  }, []);

  const photoOn = stage >= 1;
  const headlineOn = stage >= 2;
  const taglineOn = stage >= 3;
  const workshopOn = stage >= 4;
  const speakerOn = stage >= 5;

  const lift = (on: boolean, dist = 16): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${dist}px)`,
    transition: "opacity 600ms var(--ease), transform 600ms var(--ease)",
    willChange: "opacity, transform",
  });

  return (
    <div
      data-testid="slide-title"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Hero photo — cross-fades in on mount. */}
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
        <HeroPhoto src={C.heroSrc} alt={C.heroAlt} vignetteSide="none" />
      </div>

      <DarkenOverlay strength={C.darkenStrength} zIndex={15} />

      {/* Left-side readability gradient — sits above the hero/darken layer
          but below the title text. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 17,
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.35) 25%, rgba(5,5,5,0) 55%)",
        }}
      />

      {/* Title block — headline, tagline, workshop meta line, left-aligned
          at left:80, anchored at ~32% from top. Max width keeps the tagline
          from running into the right-side luminous focal point. */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: "32%",
          transform: "translateY(-50%)",
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 24,
          zIndex: 20,
        }}
      >
        <div style={lift(headlineOn)}>
          <DisplayTitle
            size={84}
            style={{
              textAlign: "left",
              lineHeight: 1.0,
              letterSpacing: "-0.015em",
              color: "var(--neutral-50)",
            }}
          >
            {C.displayHeadline}
          </DisplayTitle>
        </div>

        <p
          style={{
            ...lift(taglineOn, 12),
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 24,
            color: "var(--neutral-200)",
            margin: 0,
            textAlign: "left",
            lineHeight: 1.35,
            maxWidth: 680,
            fontWeight: 400,
          }}
        >
          {KW(C.tagline, C.taglineKw)}
        </p>

        <div
          data-testid="title-workshop-chip"
          style={{
            ...lift(workshopOn, 8),
            marginTop: 2,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-400)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {C.workshopChip}
        </div>
      </div>

      {/* Bottom-left credit — mic glyph + facilitator, single line.
          Shares the title block's left edge (left:80). */}
      <div
        data-testid="title-facilitator-chip"
        style={{
          ...lift(speakerOn, 8),
          position: "absolute",
          left: 80,
          bottom: 80,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.22em",
          color: "var(--copper-400)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          zIndex: 25,
        }}
      >
        <Mic
          size={14}
          strokeWidth={1.6}
          aria-hidden
          style={{ flexShrink: 0 }}
        />
        <span>{C.facilitator}</span>
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const titleSlide: SlideDef = {
  steps: 1,
  canonicalPose: 0,
  animationMode: "static",
  surface: "dark",
  section: "A",
  render: () => <Title />,
};
