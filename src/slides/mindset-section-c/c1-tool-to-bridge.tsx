// C.1 — TOOL → BRIDGE (canonical dark surface, 2-step collapse)
//
// Section C is the deck's cognitive interior — five mindset slides happening
// "in the head," not in the physical world. Per spec §1.2 we render on the
// standard dark + dot-grid surface (the deck's parent <Slide> wrapper paints
// it). The Bridge slide alone breaks the photographic embargo as the singular
// "we've arrived" moment.
//
// Per spec §3.1, C.1 collapses to 2 steps. Its narrative is two declarations,
// not five — one Space press per declaration. The strikethrough on `tool`
// (copper-700, 400ms easeOutExpo) remains the visual hinge of the section
// and is intentionally mirrored on C.5's `role`.
//
// Layout —
//   FIG label + slide title at top-left (canonical, via FigLabel + slide-headline-row).
//   Display headline anchored at top:280, centered.
//   Italic clarifier directly beneath at top:400, centered.
//   FromToBlock pinned to the lower-right (right:64, bottom:72).
//
// Motion —
//   load (mount-driven):  FIG label + slide title fade in together (400ms).
//   stepIndex 0:          Load pose — headline/clarifier/FromTo all hidden.
//   stepIndex 1:          Declaration 1. Headline "AI is not a tool." fades
//                         (300ms) → 300ms later strikethrough draws across
//                         `tool` (400ms easeOutExpo) → 200ms after strike
//                         completes the clarifier "It's a bridge." italic
//                         copper-400 fades in.
//   stepIndex 2 (canon):  Declaration 2. "From: ..." slides up from 12px
//                         offset (400ms); 250ms later "To: ..." slides up
//                         (400ms). 4s ambient copper-glow pulse begins on
//                         `standing capability`.
//
// Hover (presenter detail layer) —
//   `bridge` (clarifier word)      → "Something you cross daily, not
//                                     something you reach for occasionally."
//   `standing capability` (To text) → "Fluency that travels with you across
//                                      contexts."
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { DisplayTitle } from "@/components/DisplayTitle";
import { AmbientPulse } from "@/components/AmbientPulse";
import { StrikethroughAnimator } from "@/components/StrikethroughAnimator";
import { HoverReveal } from "@/components/HoverReveal";
import { FromToBlock } from "./components/FromToBlock";
import { c1Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function C1ToolToBridge() {
  const { stepIndex } = useDeck();

  // Mount-driven load: FIG label + slide title fade in together over 400ms.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Step 1's internal stagger: headline reveals, then 300ms later the strike
  // draws, then 200ms after the strike completes (~900ms after step 1 entered)
  // the clarifier reveals. We chain these via local timers so the presenter
  // advances on a single Space press and lets the choreography play.
  const [headlineOn, setHeadlineOn] = useState(false);
  const [strikeOn, setStrikeOn] = useState(false);
  const [clarifierOn, setClarifierOn] = useState(false);

  useEffect(() => {
    // Reset all internal step-1 latches on every stepIndex change.
    const timers: number[] = [];
    if (stepIndex >= 1) {
      // Step 1: chained internal stagger.
      timers.push(window.setTimeout(() => setHeadlineOn(true), 0));
      timers.push(window.setTimeout(() => setStrikeOn(true), 300));
      // Strike duration 400ms + 200ms wait = clarifier @ 900ms after step 1.
      timers.push(window.setTimeout(() => setClarifierOn(true), 900));
    } else {
      setHeadlineOn(false);
      setStrikeOn(false);
      setClarifierOn(false);
    }
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [stepIndex]);

  // Step 2 gates: From slides up immediately, To slides up 250ms later.
  const fromOn = stepIndex >= 2;
  const toOn = stepIndex >= 2;
  const pulseOn = stepIndex >= 2;

  // Reveal helper — shared easeOutExpo curve.
  const liftStyle = (on: boolean, lift = 12, duration = 400, delay = 0): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${lift}px)`,
    transition: `opacity ${duration}ms var(--ease) ${delay}ms, transform ${duration}ms var(--ease) ${delay}ms`,
    willChange: "opacity, transform",
  });

  // FIG + slide title fade-in (no lift, just opacity over 400ms).
  const headerFade: CSSProperties = {
    opacity: loaded ? 1 : 0,
    transition: "opacity 400ms var(--ease)",
    willChange: "opacity",
  };

  return (
    <div
      data-testid="slide-c1"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* FIG label — canonical top-left position, via shared component. */}
      <div style={headerFade}>
        <FigLabel section="C" num={1} label={C.figLabel} />
      </div>

      {/* Slide title — canonical .slide-headline.small at top:80 left:48. */}
      <div className="slide-headline-row" style={headerFade}>
        <h1 className="slide-headline small">{C.headline}</h1>
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

      {/* From/To pair — lower-right, slides up on stepIndex 2. */}
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
            <span style={{ ...liftStyle(fromOn, 12, 400) }}>
              {C.fromText}
            </span>
          }
          toLabel={C.toLabel}
          toText={
            <span
              style={{
                ...liftStyle(toOn, 12, 400, 250),
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

// Shared popover style block — reused for both `bridge` and `standing
// capability` hovers so the visual treatment matches verbatim.
function popoverSpan(text: string): ReactNode {
  return (
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
      {text}
    </span>
  );
}

// Render the clarifier "It's a bridge." with the word `bridge` wrapped in
// a HoverReveal. The popover surfaces the "cross daily" framing that used
// to live on the `standing capability` keyword; in the rework each popover
// matches its keyword's meaning.
function renderClarifier(text: string, word: string): ReactNode {
  const idx = text.indexOf(word);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + word.length);
  const trigger = (
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
  );
  const popover = popoverSpan(
    "Something you cross daily, not something you reach for occasionally.",
  );
  return (
    <>
      {before}
      <HoverReveal trigger={trigger} payload={popover} position="below" />
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

  const trigger = pulse ? (
    <AmbientPulse periodSeconds={4} keyword={kw}>
      {accent}
    </AmbientPulse>
  ) : (
    accent
  );

  const popover = popoverSpan(
    "Fluency that travels with you across contexts.",
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
  steps: 2,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C1ToolToBridge />,
};
