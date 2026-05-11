// C.5 — ROLE → TRAJECTORY (photographic hero · Hook 2 detonator)
//
// Twin to C.1. Closes Section C with quiet empowerment. Lifts "I have a new
// role" → "I have a new trajectory" by mirroring C.1's strikethrough idiom
// (now on `role`) and planting the Hook 2 seed `wherever you need to be`
// with a 4s ambient copper-underline pulse. The pulse is a DELIBERATELY
// planted memory cue — when Section I.4 reveals "I'm a TPM, not an engineer,"
// it lands because the audience already absorbed this phrase 90 minutes prior.
//
// Background — photographic hero. Until `assets/heroes/c5-path.jpg` lands,
// HeroPhoto paints its built-in fallback (no console 404). DarkenOverlay 0.25.
//
// Layout —
//   • Photo full-bleed (echoes C.1 photographic moment).
//   • FIG label top-RIGHT.
//   • Display headline at ~32% from top (slightly higher than C.1 to leave
//     room for the 4 beats + closing line below).
//   • Italic clarifier directly beneath.
//   • 4 "why now" beats stacked lower-left (PERSONAL-level framing, NOT
//     org-level — see content.ts comment).
//   • Closing italic line bottom-right.
//
// Motion —
//   load (mount-driven):  Photo cross-fades in SLOWLY (1500ms — slowest in C,
//                         intentional gravity for the closing slide).
//                         FIG label fades in.
//   stepIndex 0:          (initial pose) frame ready, copy hidden
//   stepIndex 1:          Headline reveals; copper-700 strikethrough on `role`
//                         (400ms easeOutExpo — IDENTICAL to C.1's `tool`)
//   stepIndex 2:          Clarifier reveals: "It's a trajectory you build."
//   stepIndex 3:          4 beats stagger-fade in from below (4 × 120ms)
//   stepIndex 4 (canon):  Closing line fades in italic; copper underline
//                         pulse on `wherever you need to be` (4s ambient).
//                         THE HOOK 2 DETONATOR.
//
// Hover (presenter detail layer) — optional.
//   Hover any of the 4 beats → a small caption strip surfaces alongside.
//   Kept minimal: a single elaboration line per beat in this scaffold.
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { HeroPhoto } from "@/components/HeroPhoto";
import { DarkenOverlay } from "@/components/DarkenOverlay";
import { DisplayTitle } from "@/components/DisplayTitle";
import { AmbientPulse } from "@/components/AmbientPulse";
import { StrikethroughAnimator } from "@/components/StrikethroughAnimator";
import { highlight } from "@/components/highlight";
import { WhyNowBeat } from "./components/WhyNowBeat";
import { c5Content as C } from "./content";

// Asset hasn't landed yet — pass `undefined` so HeroPhoto paints only the
// fallback gradient (no console 404).
const HERO_SRC: string | undefined = undefined;

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

  // Photo + FIG label fade in on mount. Photo fade is 1500ms — slower than
  // C.1's 1200ms, intentional gravity for the closing slide.
  const [loadStage, setLoadStage] = useState(0);
  useEffect(() => {
    const t1 = window.setTimeout(() => setLoadStage(1), 80);   // photo
    const t2 = window.setTimeout(() => setLoadStage(2), 1500); // fig label
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const photoOn = loadStage >= 1;
  const figOn = loadStage >= 2;

  // Step gates.
  const headlineOn = stepIndex >= 1;
  const strikeOn = stepIndex >= 1;
  const clarifierOn = stepIndex >= 2;
  const beatsOn = stepIndex >= 3;
  const closingOn = stepIndex >= 4;
  const pulseOn = stepIndex >= 4;

  const liftStyle = (on: boolean, lift = 16, duration = 600): CSSProperties => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${lift}px)`,
    transition: `opacity ${duration}ms var(--ease), transform ${duration}ms var(--ease)`,
    willChange: "opacity, transform",
  });

  return (
    <div
      data-testid="slide-c5"
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
          transition: "opacity 1500ms ease-out",
        }}
      >
        <HeroPhoto src={HERO_SRC} alt={C.heroAlt} vignetteSide="bottom" />
      </div>

      {/* Dark wash. */}
      <DarkenOverlay strength={C.darkenStrength} zIndex={15} />

      {/* FIG label top-RIGHT (mirrors C.1). */}
      <div
        data-testid="c5-fig-label"
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
        — FIG. C.5
        <span style={{ color: "var(--copper-700)", margin: "0 8px" }}>·</span>
        <span style={{ color: "var(--copper-200)" }}>{C.figLabel}</span>
      </div>

      {/* Headline + clarifier — center-left at ~32% from top. */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: "32%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 20,
        }}
      >
        <div data-testid="c5-headline" style={liftStyle(headlineOn, 14, 700)}>
          <DisplayTitle
            size={84}
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

        <p
          data-testid="c5-clarifier"
          style={{
            ...liftStyle(clarifierOn, 10, 600),
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 44,
            color: "var(--copper-400)",
            margin: 0,
            lineHeight: 1.15,
            fontWeight: 400,
          }}
        >
          {C.clarifier}
        </p>
      </div>

      {/* 4 trajectory beats — lower-left vertical stack. Stagger 120ms. */}
      <div
        data-testid="c5-beats"
        style={{
          position: "absolute",
          left: 80,
          bottom: 96,
          width: 520,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          zIndex: 20,
        }}
      >
        {C.beats.map((beat, i) => {
          const onAt = beatsOn;
          const style: CSSProperties = {
            opacity: onAt ? 1 : 0,
            transform: onAt ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 450ms var(--ease), transform 450ms var(--ease)",
            transitionDelay: onAt ? `${i * 120}ms` : "0ms",
          };
          return (
            <div
              key={beat.label}
              data-testid={`c5-beat-${beat.label.toLowerCase()}`}
              style={style}
            >
              <BeatWithHover
                label={beat.label}
                captionText={beat.caption}
                captionKw={beat.captionKw}
                hoverText={BEAT_HOVER[beat.label]}
              />
            </div>
          );
        })}
      </div>

      {/* Closing italic line — bottom-right. THE HOOK 2 DETONATOR. */}
      <div
        data-testid="c5-closing"
        style={{
          position: "absolute",
          right: 80,
          bottom: 64,
          maxWidth: 560,
          textAlign: "right",
          zIndex: 20,
          ...liftStyle(closingOn, 12, 800),
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 28,
            color: "var(--neutral-100)",
            margin: 0,
            lineHeight: 1.35,
            fontWeight: 400,
          }}
        >
          {renderClosingLine(C.closing, C.closingKw, pulseOn)}
        </p>
      </div>
    </div>
  );
}

// ───────────────────── helpers ─────────────────────

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

// Closing line — italic with copper-400 accent on `wherever you need to be`.
// On canonical pose, the accent gets the 4s AmbientPulse + a copper-500
// underline. This is the Hook 2 detonator phrase.
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

// ───────────────────── beat + hover ─────────────────────

interface BeatWithHoverProps {
  label: string;
  captionText: string;
  captionKw: readonly string[];
  hoverText?: string;
}

// Small wrapper around WhyNowBeat that adds an optional hover elaboration
// strip to the right. Implemented inline (vs. HoverReveal) because the
// payload needs to sit inline-flow rather than absolutely positioned —
// reads cleaner on the row.
function BeatWithHover({
  label,
  captionText,
  captionKw,
  hoverText,
}: BeatWithHoverProps) {
  const [hover, setHover] = useState(false);
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  const caption: ReactNode = captionKw.length
    ? highlight(captionText, captionKw)
    : captionText;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        cursor: hoverText ? "default" : undefined,
      }}
    >
      <div style={{ flex: "0 0 auto", minWidth: 0 }}>
        <WhyNowBeat label={label} caption={caption} />
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
