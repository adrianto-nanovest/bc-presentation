// C.5 — ROLE → TRAJECTORY (canonical dark surface · Hook 2 detonator)
//
// Section C closer. Lifts "I have a new role" → "I have a new trajectory" by
// mirroring C.1's strikethrough idiom (now on `role`) and planting the Hook 2
// seed `wherever you need to be` with a 4s ambient copper-underline pulse.
// The pulse is a DELIBERATELY planted memory cue — when Section I.4 reveals
// "I'm a TPM, not an engineer," it lands because the audience already
// absorbed this phrase 90 minutes prior.
//
// Per spec §3.5: standard dark + dot-grid surface (no hero photo), canonical
// FigLabel + .slide-headline.small header, E9-derived two-pane layout. The
// LEFT pane carries the 4 trajectory beats under a "WHY NOW" section title;
// the RIGHT pane carries the strikethrough declaration, italic clarifier, and
// the closing line at the bottom. The implicit divider between panes IS the
// bridge — the layout enacts the closing metaphor.
//
// Layout —
//   FIG label + slide title at top-left (canonical, via FigLabel + .slide-headline-row).
//   LEFT pane (left:48 top:156 width:500 bottom:80):
//     "WHY NOW" mono caps + 40% copper-700 rule + 4 stacked beats.
//   RIGHT pane (right:48 top:156 width:540 bottom:80):
//     72px display "It's not a role you take." (strikethrough on `role`)
//     44px italic copper-400 "It's a trajectory you build."
//     60% copper-700 rule
//     (flex spacer)
//     32px italic closing line at bottom with pulse on `wherever you need to be`.
//
// Motion (5 steps; canonicalPose: 4) —
//   load (mount-driven):  FIG label + slide title + LEFT "WHY NOW" + 40% rule
//                         fade in together (400ms).
//   stepIndex 1:          LEFT 4 beats stagger-fade (130ms apart, matches E9's
//                         whyPoints stagger).
//   stepIndex 2:          RIGHT bigHeadline reveals → copper-700 strikethrough
//                         draws on `role` (400ms easeOutExpo, mirrors C.1).
//   stepIndex 3:          RIGHT "It's a trajectory you build." italic copper
//                         reveals 300ms after strike completes; 60% copper rule
//                         draws.
//   stepIndex 4 (canon):  RIGHT closing line fades in italic + 4s ambient
//                         copper pulse on `wherever you need to be`.
//                         THE HOOK 2 DETONATOR.
//
// Hover (presenter detail layer) —
//   Hover any of the 4 beats → a small caption strip surfaces alongside.
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { AmbientPulse } from "@/components/AmbientPulse";
import { StrikethroughAnimator } from "@/components/StrikethroughAnimator";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "../foundation-core-section-e/components/Reveal";
import C5TwoPaneLayout from "./components/C5TwoPaneLayout";
import { c5Content as C } from "./content";

// Optional hover elaborations — kept short, presenter-detail-only. Keys
// match `C.beats[i].label`. Empty string means "no popover for this beat."
const BEAT_HOVER: Record<string, string> = {
  COMPETITIVE: "Adjacent peers already compound. The gap widens quietly.",
  CAPACITY: "One person's reach now matches what a small team used to do.",
  CULTURAL: "AI-augmented work is the new floor, not the ceiling.",
  PERSONAL: "Repetition shrinks. What's left is the judgement only you can bring.",
};

// ───────────────────── slide ─────────────────────

export function C5RoleTrajectory() {
  const { stepIndex } = useDeck();

  // Mount-driven load: FIG label + slide title + LEFT "WHY NOW" + 40% rule
  // fade in together over 400ms.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates.
  const showLeftHeader = loaded;          // step 0 (load)
  const beatsOn = stepIndex >= 1;         // step 1
  const bigHeadlineOn = stepIndex >= 2;   // step 2 (headline + strikethrough)
  const clarifierOn = stepIndex >= 3;     // step 3 (italic + 60% rule)
  const closingOn = stepIndex >= 4;       // step 4 (canonical)
  const pulseOn = stepIndex >= 4;

  // Step 2 strikethrough has an internal short delay so the headline fades
  // in first, then the line draws (matches C.1's choreography). Local timer
  // gate so the strikethrough plays on a single Space press.
  const [strikeOn, setStrikeOn] = useState(false);
  useEffect(() => {
    let t: number | undefined;
    if (stepIndex >= 2) {
      t = window.setTimeout(() => setStrikeOn(true), 300);
    } else {
      setStrikeOn(false);
    }
    return () => {
      if (t !== undefined) window.clearTimeout(t);
    };
  }, [stepIndex]);

  // Header fade — no lift, opacity only, 400ms.
  const headerFade: CSSProperties = {
    opacity: loaded ? 1 : 0,
    transition: "opacity 400ms var(--ease)",
    willChange: "opacity",
  };

  return (
    <div
      data-testid="slide-c5"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* FIG label — canonical top-left position, via shared component. */}
      <div style={headerFade}>
        <FigLabel section="C" num={5} label={C.figLabel} />
      </div>

      {/* Slide title — canonical .slide-headline.small at top:80 left:48. */}
      <div className="slide-headline-row" style={headerFade}>
        <h1 className="slide-headline small">{C.headline}</h1>
      </div>

      <C5TwoPaneLayout
        left={<LeftPaneContent showHeader={showLeftHeader} beatsOn={beatsOn} />}
        right={
          <RightPaneContent
            bigHeadlineOn={bigHeadlineOn}
            strikeOn={strikeOn}
            clarifierOn={clarifierOn}
            closingOn={closingOn}
            pulseOn={pulseOn}
          />
        }
      />
    </div>
  );
}

// ───────────────────── LEFT pane ─────────────────────

interface LeftPaneContentProps {
  showHeader: boolean;
  beatsOn: boolean;
}

function LeftPaneContent({ showHeader, beatsOn }: LeftPaneContentProps) {
  return (
    <>
      <Reveal on={showHeader} data-testid="c5-why-now">
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          WHY NOW
        </span>
      </Reveal>

      <div style={{ height: 10 }} />
      <CopperRule on={showHeader} width="40%" delay={120} />
      <div style={{ height: 12 }} />

      <ul
        data-testid="c5-beats"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {C.beats.map((beat, i) => (
          <Reveal
            key={beat.label}
            on={beatsOn}
            delay={i * 130}
            as="li"
            data-testid={`c5-beat-${beat.label.toLowerCase()}`}
          >
            <BeatRow
              label={beat.label}
              caption={beat.caption}
              captionKw={beat.captionKw}
              hoverText={BEAT_HOVER[beat.label]}
            />
          </Reveal>
        ))}
      </ul>
    </>
  );
}

// ───────────────────── RIGHT pane ─────────────────────

interface RightPaneContentProps {
  bigHeadlineOn: boolean;
  strikeOn: boolean;
  clarifierOn: boolean;
  closingOn: boolean;
  pulseOn: boolean;
}

function RightPaneContent({
  bigHeadlineOn,
  strikeOn,
  clarifierOn,
  closingOn,
  pulseOn,
}: RightPaneContentProps) {
  return (
    <>
      {/* Big headline — "It's not a role you take." (72px, strikethrough on `role`). */}
      <Reveal on={bigHeadlineOn} data-testid="c5-bigheadline">
        <h2
          style={{
            fontFamily: "var(--display)",
            fontWeight: 400,
            fontSize: 72,
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            color: "var(--neutral-50)",
            margin: 0,
          }}
        >
          {renderBigHeadline(C.bigHeadline, C.strikethroughWord, strikeOn)}
        </h2>
      </Reveal>

      <div style={{ height: 18 }} />

      {/* Clarifier — "It's a trajectory you build." (44px italic copper-400). */}
      <Reveal on={clarifierOn} data-testid="c5-clarifier">
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 44,
            color: "var(--copper-400)",
            margin: 0,
            lineHeight: 1.1,
            fontWeight: 400,
          }}
        >
          {C.clarifier}
        </p>
      </Reveal>

      <div style={{ height: 18 }} />

      {/* 60% copper-700 rule. Draws in at step 3, after italic reveal. */}
      <CopperRule on={clarifierOn} width="60%" delay={150} />

      {/* Flex spacer pushes the closing line to the bottom of the pane. */}
      <div style={{ flex: 1 }} />

      {/* Closing line — italic 32px with pulse on `wherever you need to be`.
          THE HOOK 2 DETONATOR. */}
      <Reveal on={closingOn} data-testid="c5-closing">
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 32,
            color: "var(--neutral-100)",
            margin: 0,
            lineHeight: 1.3,
            fontWeight: 400,
          }}
        >
          {renderClosingLine(C.closing, C.closingKw, pulseOn)}
        </p>
      </Reveal>
    </>
  );
}

// ───────────────────── helpers ─────────────────────

// Big headline with strikethrough on `role`. Match is whitespace-aware so
// trailing punctuation isn't struck.
function renderBigHeadline(text: string, word: string, active: boolean): ReactNode {
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

// Closing line — italic with copper-400 accent on the Hook 2 phrase.
// On canonical pose, the accent gets the 4s AmbientPulse + a copper-500
// underline. Mirrors C.1's `standing capability` treatment.
function renderClosingLine(text: string, keywords: readonly string[], pulse: boolean): ReactNode {
  const kw = keywords[0];
  if (!kw) return text;
  const idx = text.indexOf(kw);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + kw.length);

  const accent = (
    <em
      data-testid="c5-keyword-accent"
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

  return (
    <>
      {before}
      {pulse ? (
        <AmbientPulse periodSeconds={4} keyword={kw}>
          {accent}
        </AmbientPulse>
      ) : (
        accent
      )}
      {after}
    </>
  );
}

// ───────────────────── beat row + hover ─────────────────────

interface BeatRowProps {
  label: string;
  caption: string;
  captionKw: readonly string[];
  hoverText?: string;
}

// One beat: 6×6 copper-400 square glyph + mono caps label + Source Serif
// caption with italic-copper highlight on keyword. Optional hover-right
// elaboration strip surfaces on mouse-enter (presenter detail layer).
function BeatRow({ label, caption, captionKw, hoverText }: BeatRowProps) {
  const [hover, setHover] = useState(false);
  const captionNode: ReactNode = captionKw.length
    ? highlight(caption, captionKw)
    : caption;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        cursor: hoverText ? "default" : undefined,
      }}
    >
      {/* 6×6 copper-400 filled square bullet glyph. */}
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          background: "var(--copper-400)",
          flexShrink: 0,
          marginTop: 8,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: 16,
            color: "var(--neutral-300)",
            lineHeight: 1.45,
          }}
        >
          {captionNode}
        </span>
      </div>

      {hoverText && (
        <span
          aria-hidden={!hover}
          style={{
            flex: "1 1 auto",
            alignSelf: "center",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--neutral-300)",
            lineHeight: 1.35,
            opacity: hover ? 1 : 0,
            transform: hover ? "translateX(0)" : "translateX(-4px)",
            transition:
              "opacity 200ms var(--ease), transform 200ms var(--ease)",
            pointerEvents: "none",
          }}
        >
          {hoverText}
        </span>
      )}
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const c5Slide: SlideDef = {
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <C5RoleTrajectory />,
};
