// C.1 — TOOL → BRIDGE (canonical dark surface, 2-step collapse)
//
// Section C is the deck's cognitive interior — five mindset slides happening
// "in the head," not in the physical world. Per spec §1.2 we render on the
// standard dark + dot-grid surface (the deck's parent <Slide> wrapper paints
// it). The Bridge slide alone breaks the photographic embargo as the singular
// "we've arrived" moment.
//
// Per Task 23 (v3), C.1 is now a true 2-step slide. Step 0 is the load pose
// (header only). Step 1 is the canonical pose — every other element reveals
// together on the single Space press, with an internal ~1.5s stagger that
// plays out the full declaration choreography. The strikethrough on `tool`
// (copper-700, 400ms easeOutExpo) remains the visual hinge of the section
// and is intentionally mirrored on C.5's `role`.
//
// Layout —
//   FIG label + slide title at top-left (canonical, via FigLabel + slide-headline-row).
//   Display headline anchored at top:280, centered.
//   Italic clarifier directly beneath at top:400, centered.
//   FromToBlock pinned to the lower-right (right:64, bottom:72).
//
// Ambient background —
//   A sparse field of drifting copper particles (C1ParticleField) sits above
//   the dot-grid and below all foreground text. ~44 small soft-glowing dots
//   loop left → right over 16–24s, with a slow vertical wobble for organic
//   motion — quietly implying "passage across" the bridge. Pure CSS keyframes;
//   honored by the deck-wide prefers-reduced-motion rule in globals.css.
//
// Motion —
//   load / stepIndex 0:   FIG + slide title render instantly; on mount the
//                         declaration cascade plays:
//     T+0ms:    "AI is not a tool." (bigHeadline) fades + lifts (300ms).
//     T+300ms:  Strikethrough draws across `tool` (400ms easeOutExpo).
//     T+700ms:  "It's a bridge." italic copper-400 fades + lifts (300ms).
//   stepIndex 1 (canon):  Space press reveals the From/To pair:
//     T+0ms:    FROM line slides up 12px (400ms).
//     T+250ms:  TO line slides up 12px (400ms) + 4s ambient copper pulse
//               begins on `standing capability`.
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { DisplayTitle } from "@/components/DisplayTitle";
import { AmbientPulse } from "@/components/AmbientPulse";
import { StrikethroughAnimator } from "@/components/StrikethroughAnimator";
import { highlight as KW } from "@/components/highlight";
import { FromToBlock } from "./components/FromToBlock";
import { C1ParticleField } from "./components/C1ParticleField";
import { c1Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function C1ToolToBridge() {
  const { stepIndex } = useDeck();

  // Step-0 cascade (mount-driven): declaration plays once when the slide
  // first appears. These latches persist for the slide's lifetime — there
  // is no "earlier" step than 0, so stepping back doesn't hide them.
  //
  //   T+0ms    headline fades + lifts (300ms)
  //   T+300ms  strikethrough draws across `tool` (400ms easeOutExpo)
  //   T+700ms  clarifier "It's a bridge." fades + lifts (300ms)
  //
  // Step-1 cascade (stepIndex-driven): FROM/TO reveal on Space press.
  //
  //   T+0ms    FROM line slides up 12px (400ms)
  //   T+250ms  TO line slides up 12px (400ms) + ambient pulse begins
  const STAGGER_HEADLINE_MS = 0;
  const STAGGER_STRIKE_MS = 300;
  const STAGGER_CLARIFIER_MS = 700;
  const STAGGER_FROM_MS = 0;
  const STAGGER_TO_MS = 250;

  const [headlineOn, setHeadlineOn] = useState(false);
  const [strikeOn, setStrikeOn] = useState(false);
  const [clarifierOn, setClarifierOn] = useState(false);
  const [fromOn, setFromOn] = useState(false);
  const [toOn, setToOn] = useState(false);
  const [pulseOn, setPulseOn] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setHeadlineOn(true), STAGGER_HEADLINE_MS));
    timers.push(window.setTimeout(() => setStrikeOn(true), STAGGER_STRIKE_MS));
    timers.push(window.setTimeout(() => setClarifierOn(true), STAGGER_CLARIFIER_MS));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    const timers: number[] = [];
    if (stepIndex >= 1) {
      timers.push(window.setTimeout(() => setFromOn(true), STAGGER_FROM_MS));
      timers.push(window.setTimeout(() => {
        setToOn(true);
        setPulseOn(true);
      }, STAGGER_TO_MS));
    } else {
      setFromOn(false);
      setToOn(false);
      setPulseOn(false);
    }
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [stepIndex]);

  // Reveal helper — shared easeOutExpo curve.
  const liftStyle = (on: boolean, lift = 12, duration = 400, delay = 0): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${lift}px)`,
    transition: `opacity ${duration}ms var(--ease) ${delay}ms, transform ${duration}ms var(--ease) ${delay}ms`,
    willChange: "opacity, transform",
  });

  return (
    <div
      data-testid="slide-c1"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Ambient copper particle field — above dot-grid, below all text. */}
      <C1ParticleField />

      {/* FIG label — canonical top-left position, via shared component. */}
      <FigLabel section="C" num={1} label={C.figLabel} />

      {/* Slide title — canonical .slide-headline.small at top:80 left:48. */}
      <div className="slide-headline-row">
        <h1 className="slide-headline small">{KW(C.headline, C.headlineKw)}</h1>
      </div>

      {/* Big headline — "AI is not a tool." centered horizontally at top:280. */}
      <div
        data-testid="c1-headline"
        style={{
          position: "absolute",
          top: 280,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          ...liftStyle(headlineOn, 14, 300),
        }}
      >
        <DisplayTitle
          size={88}
          style={{
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            color: "var(--neutral-50)",
            textAlign: "center",
          }}
        >
          {renderHeadline(C.bigHeadline, C.strikethroughWord, strikeOn)}
        </DisplayTitle>
      </div>

      {/* Clarifier — "It's a bridge." centered at top:400, italic copper-400. */}
      <div
        data-testid="c1-clarifier"
        style={{
          position: "absolute",
          top: 400,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          ...liftStyle(clarifierOn, 10, 400),
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 52,
            color: "var(--copper-400)",
            margin: 0,
            lineHeight: 1.1,
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          {renderClarifier(C.clarifier, "bridge")}
        </p>
      </div>

      {/* From/To pair — lower-right. The container is visible on step 1 so
          the FROM:/TO: labels appear with the cascade; the inner FROM and TO
          text spans are individually gated via fromOn/toOn (set by the
          stagger timers) so each line slides up at its scheduled offset. */}
      <div
        data-testid="c1-from-to"
        style={{
          position: "absolute",
          right: 64,
          bottom: 72,
          maxWidth: 540,
          zIndex: 20,
          opacity: stepIndex >= 1 ? 1 : 0,
          transition: "opacity 400ms var(--ease)",
          pointerEvents: stepIndex >= 1 ? "auto" : "none",
        }}
      >
        <FromToBlock
          fromLabel={C.fromLabel}
          fromText={
            <span style={{ ...liftStyle(fromOn, 12, 400) }}>
              {C.fromText}
            </span>
          }
          toLabel={C.toLabel}
          toText={
            <span
              style={{
                ...liftStyle(toOn, 12, 400),
                display: "inline-block",
              }}
            >
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

// Render the clarifier "It's a bridge." with the word `bridge` styled as
// the italic copper accent. No hover popover — the clarifier reads on its
// own as the section's headline pivot.
function renderClarifier(text: string, word: string): ReactNode {
  const idx = text.indexOf(word);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + word.length);
  return (
    <>
      {before}
      <em
        data-testid="c1-clarifier-keyword"
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          color: "var(--copper-400)",
          fontWeight: 400,
        }}
      >
        {word}
      </em>
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
        textDecorationLine: "underline",
        textDecorationColor: pulse ? "var(--copper-500)" : "transparent",
        textUnderlineOffset: "4px",
        textDecorationThickness: "1px",
        transition: "text-decoration-color 400ms var(--ease)",
      }}
    >
      {kw}
    </em>
  );

  const trigger = pulse ? (
    <AmbientPulse periodSeconds={4} keyword={kw}>
      {accent}
    </AmbientPulse>
  ) : (
    accent
  );

  return (
    <>
      {before}
      {trigger}
      {after}
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const c1Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C1ToolToBridge />,
};
