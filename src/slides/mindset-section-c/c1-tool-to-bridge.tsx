// C.1 — TOOL → BRIDGE (photographic hero)
//
// Twin to C.5. Establishes the central metaphor of Section C: AI is not a
// tool you reach for occasionally — it's a bridge crossed daily. The
// strikethrough on `tool` (copper-700, 400ms easeOutExpo) is the visual
// hinge of the section and is *intentionally* mirrored on C.5's `role`.
// The closing copper-italic keyword pulse on `standing capability`
// (4s ambient) rhymes with C.5's `wherever you need to be` — both planted
// memory cues that Hook 2 (Section I.4) detonates 90 minutes later.
//
// Background — photographic hero. Until `assets/heroes/c1-bridge.jpg`
// lands, HeroPhoto paints its built-in deep-near-black + copper-glow
// radial fallback (no console 404). DarkenOverlay at strength=0.20.
//
// Layout —
//   • Photo full-bleed. Left third blank for breathing.
//   • FIG label top-RIGHT (rhymes with C.5; mirrors title strip convention).
//   • Display headline anchored at ~45% from top, right two-thirds.
//   • Italic clarifier directly beneath.
//   • FromToBlock pinned to the lower-right.
//
// Motion —
//   load (mount-driven):  Photo cross-fades in SLOWLY (1200ms) — slower than
//                         other backgrounds; this is C's quiet moment.
//                         FIG label fades in.
//   stepIndex 0:          (initial pose) headline frame ready — copy hidden
//   stepIndex 1:          Headline reveals; copper-700 strikethrough draws
//                         across `tool` (400ms easeOutExpo)
//   stepIndex 2:          Clarifier reveals: "It's a bridge." italic copper
//   stepIndex 3:          "From: ..." line slides in from the right
//   stepIndex 4 (canon):  "To: ..." line slides in; ambient copper pulse on
//                         `standing capability` (4s loop)
//
// Hover (presenter detail layer) —
//   `standing capability` italic → micro popover:
//     "Something you carry daily, not something you reach for occasionally."
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { HeroPhoto } from "@/components/HeroPhoto";
import { DarkenOverlay } from "@/components/DarkenOverlay";
import { DisplayTitle } from "@/components/DisplayTitle";
import { AmbientPulse } from "@/components/AmbientPulse";
import { StrikethroughAnimator } from "@/components/StrikethroughAnimator";
import { HoverReveal } from "@/components/HoverReveal";
import { FromToBlock } from "./components/FromToBlock";
import { c1Content as C } from "./content";

// Asset hasn't landed yet — pass `undefined` so HeroPhoto paints only the
// fallback gradient (no console 404). When the real photo lands, swap in
// `C.heroSrc` and HeroPhoto will cross-fade it on top.
const HERO_SRC: string | undefined = undefined;

// ───────────────────── slide ─────────────────────

export function C1ToolToBridge() {
  const { stepIndex } = useDeck();

  // Photo + FIG label fade in on mount as part of the load animation
  // (no Space needed). The photo fade is slower than other slides (1200ms)
  // — the spec explicitly calls for C.1 to be the "quiet moment".
  const [loadStage, setLoadStage] = useState(0);
  useEffect(() => {
    const t1 = window.setTimeout(() => setLoadStage(1), 80);   // photo
    const t2 = window.setTimeout(() => setLoadStage(2), 1200); // fig label
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const photoOn = loadStage >= 1;
  const figOn = loadStage >= 2;

  // Step gates — stepIndex 0 is the initial canonical-after-load pose.
  // The headline + strikethrough land on stepIndex 1.
  const headlineOn = stepIndex >= 1;
  const strikeOn = stepIndex >= 1;
  const clarifierOn = stepIndex >= 2;
  const fromOn = stepIndex >= 3;
  const toOn = stepIndex >= 4;
  const pulseOn = stepIndex >= 4;

  // Reveal helper — shared easeOutExpo curve.
  const liftStyle = (on: boolean, lift = 16, duration = 600): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${lift}px)`,
    transition: `opacity ${duration}ms var(--ease), transform ${duration}ms var(--ease)`,
    willChange: "opacity, transform",
  });

  return (
    <div
      data-testid="slide-c1"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background — hero photo or fallback gradient. SLOW cross-fade. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: photoOn ? 1 : 0,
          transition: "opacity 1200ms ease-out",
        }}
      >
        <HeroPhoto src={HERO_SRC} alt={C.heroAlt} vignetteSide="bottom-left" />
      </div>

      {/* Dark wash for contrast. */}
      <DarkenOverlay strength={C.darkenStrength} zIndex={15} />

      {/* FIG label top-RIGHT (twin convention with C.5 — not the default
          .fig-label class, which is top-left and spans full width). */}
      <div
        data-testid="c1-fig-label"
        style={{
          position: "absolute",
          top: 36,
          right: 48,
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.22em",
          color: "var(--neutral-400)",
          textTransform: "uppercase",
          zIndex: 20,
          ...liftStyle(figOn, 0, 400),
        }}
      >
        — FIG. C.1
        <span style={{ color: "var(--copper-700)", margin: "0 8px" }}>·</span>
        <span style={{ color: "var(--copper-200)" }}>{C.figLabel}</span>
      </div>

      {/* Right two-thirds composition. Left third stays blank for breathing. */}
      <div
        style={{
          position: "absolute",
          left: "33%",
          right: 64,
          top: "45%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 20,
        }}
      >
        {/* Headline — "AI is not a tool." with strikethrough on `tool`. */}
        <div data-testid="c1-headline" style={liftStyle(headlineOn, 14, 700)}>
          <DisplayTitle
            size={88}
            style={{
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              color: "var(--neutral-100)",
              textAlign: "left",
            }}
          >
            {renderHeadline(C.headline, C.strikethroughWord, strikeOn)}
          </DisplayTitle>
        </div>

        {/* Clarifier — "It's a bridge." italic copper-400. */}
        <p
          data-testid="c1-clarifier"
          style={{
            ...liftStyle(clarifierOn, 10, 600),
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 52,
            color: "var(--copper-400)",
            margin: 0,
            lineHeight: 1.1,
            fontWeight: 400,
          }}
        >
          {C.clarifier}
        </p>
      </div>

      {/* From/To pair — lower-right, slides in on stepIndex 3 / 4. */}
      <div
        data-testid="c1-from-to"
        style={{
          position: "absolute",
          right: 64,
          bottom: 72,
          maxWidth: 540,
          zIndex: 20,
        }}
      >
        <FromToBlock
          fromLabel={C.fromLabel}
          fromText={
            <span style={{ ...liftStyle(fromOn, 8, 500) }}>
              {C.fromText}
            </span>
          }
          toLabel={C.toLabel}
          toText={
            <span style={{ ...liftStyle(toOn, 8, 500), display: "inline-block" }}>
              {renderToText(C.toText, C.toTextKw, pulseOn)}
            </span>
          }
        />
      </div>
    </div>
  );
}

// ───────────────────── helpers ─────────────────────

// Render the headline with the `strikethroughWord` wrapped in a
// StrikethroughAnimator. The match is whitespace-aware so we don't
// strikethrough trailing punctuation (e.g. the period after "tool").
function renderHeadline(text: string, word: string, active: boolean): ReactNode {
  // Find the word as a discrete token. We accept it as-is (word boundaries
  // are not language-sensitive for the simple "tool" / "role" cases).
  const idx = text.indexOf(word);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + word.length);
  return (
    <>
      {before}
      <StrikethroughAnimator active={active} duration={400} thickness={4}>
        {word}
      </StrikethroughAnimator>
      {after}
    </>
  );
}

// Render the "To: ..." copy with the italic copper accent on
// `standing capability`. When `pulse` is true (canonical pose), wrap the
// accent in AmbientPulse for the 4s copper-glow loop. We also paint a
// subtle copper-500 underline that fades in on canonical pose so the
// rhyme with C.5's underline-pulse reads.
function renderToText(text: string, keywords: readonly string[], pulse: boolean): ReactNode {
  // Single keyword expected for C.1's `standing capability`.
  const kw = keywords[0];
  if (!kw) return text;
  const idx = text.indexOf(kw);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + kw.length);

  const accent = (
    <em
      data-testid="c1-keyword-accent"
      style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        color: "var(--copper-400)",
        fontWeight: 400,
        textDecoration: pulse ? "underline" : "none",
        textDecorationColor: pulse ? "var(--copper-500)" : "transparent",
        textUnderlineOffset: "4px",
        textDecorationThickness: "1px",
        transition: "text-decoration-color 400ms var(--ease)",
      }}
    >
      {kw}
    </em>
  );

  // Hover popover — presenter detail layer.
  const trigger = pulse ? (
    <AmbientPulse periodSeconds={4} keyword={kw}>
      {accent}
    </AmbientPulse>
  ) : (
    accent
  );

  const popover = (
    <span
      style={{
        display: "inline-block",
        background: "rgba(10,10,10,0.92)",
        border: "1px solid var(--copper-700)",
        padding: "10px 14px",
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        fontSize: 14,
        color: "var(--neutral-200)",
        lineHeight: 1.35,
        maxWidth: 260,
        whiteSpace: "normal",
      }}
    >
      Something you carry daily, not something you reach for occasionally.
    </span>
  );

  return (
    <>
      {before}
      <HoverReveal trigger={trigger} payload={popover} position="below" />
      {after}
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const c1Slide: SlideDef = {
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C1ToolToBridge />,
};
