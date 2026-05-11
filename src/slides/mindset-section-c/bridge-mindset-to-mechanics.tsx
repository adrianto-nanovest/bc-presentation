// Bridge — FROM MINDSET TO MECHANICS (Section C → Section D)
//
// The deck's deepest reflective breath. Photographic hero (or fallback
// gradient until `/heroes/bridge-foundation.jpg` lands) with the STRONGEST
// darken overlay in the opener (0.30) so the long Kofi Annan epigraph has
// enough legibility space.
//
// Per spec §3.5:
//   "The Kofi Annan quote was chosen over Aristotle because it carries
//    family-level resonance — for a BCE audience who are parents thinking
//    about their kids' generation, this lands with unusual weight."
//
// The italic copper-400 accent on `family` (sentence 3) is the emotional
// payload. The handoff line "From here, the how." is intentionally small —
// a whispered transition, not an announcement.
//
// Layout —
//   • Photo full-bleed (or fallback gradient if image missing).
//   • TOP-RIGHT: hand-rolled BRIDGE label (not standard FIG. X.N).
//   • CENTER: 3 italic Instrument Serif sentence-lines vertically stacked.
//   • BENEATH QUOTE: right-aligned attribution chip.
//   • LOWER-CENTER: small italic handoff line with copper ambient pulse
//     on `how` (4s loop — rhymes with C.1 / C.5 closing pulses).
//
// Motion —
//   load (mount-driven):  Photo cross-fades in SLOWLY (1500ms — slowest in
//                         the deck). BRIDGE label fades in around the same
//                         time so the slide settles before the user advances.
//   stepIndex 0:          FIG label → sentence 1 → sentence 2 → sentence 3 →
//                         attribution all fade in on a continuous ~2.4s
//                         stagger (sentences ~400ms apart).
//   stepIndex 1 (canon):  Handoff line "From here, the how." fades in italic;
//                         copper underline + 4s AmbientPulse on `how`.
//
// Hover — NONE. This slide is reverent and still. Don't add hover handlers.
//
// Skip-tolerance — If a session runs short, the slide can be held at
// stepIndex 0 indefinitely. The handoff line simply never appears; the
// audience reads the quote and the presenter advances to D.1.
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { HeroPhoto } from "@/components/HeroPhoto";
import { DarkenOverlay } from "@/components/DarkenOverlay";
import { AmbientPulse } from "@/components/AmbientPulse";
import { QuoteStack } from "./components/QuoteStack";
import { bridgeContent as C } from "./content";

// Asset hasn't landed yet — pass `undefined` so HeroPhoto paints only the
// fallback gradient (no console 404). When the real photo lands, swap in
// `C.heroSrc` and HeroPhoto will render it on top.
const HERO_SRC: string | undefined = undefined;

// Quote stagger calibration (per spec §3.5):
//   FIG label   →   0ms after step 0 fires
//   Sentence 1  → 200ms after
//   Sentence 2  → 600ms after (sentence 1 + ~400ms)
//   Sentence 3  → 1000ms after (sentence 2 + ~400ms)
//   Attribution → 1400ms after (sentence 3 + ~400ms; chip arrives last)
// Total stagger window: ~1.4s of staggered starts + ~600ms fade = ~2.0–2.4s.
const FIG_DELAY = 0;
const LINE1_DELAY = 200;
const LINE2_DELAY = 600;
const LINE3_DELAY = 1000;
const ATTRIBUTION_DELAY = 1400;

// ───────────────────── slide ─────────────────────

export function BridgeMindsetToMechanics() {
  const { stepIndex } = useDeck();

  // Photo fades in on mount over 1500ms — the slowest single fade in the
  // entire deck. This is the "deepest reflective breath" — honor it.
  const [photoOn, setPhotoOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setPhotoOn(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates. stepIndex 0 reveals the quote (FIG + 3 lines + attribution
  // on a continuous stagger). stepIndex 1 reveals the handoff line.
  const quoteOn = stepIndex >= 0;
  const handoffOn = stepIndex >= 1;
  const pulseOn = stepIndex >= 1;

  return (
    <div
      data-testid="slide-bridge-c-to-d"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background — hero photo or fallback gradient. SLOWEST FADE IN DECK. */}
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

      {/* Strongest darken in the opener — long quote needs the legibility. */}
      <DarkenOverlay strength={C.darkenStrength} zIndex={15} />

      {/* BRIDGE label — top-RIGHT, hand-rolled (not standard FIG. X.N). */}
      <div
        data-testid="bridge-fig-label"
        className="fig-label"
        style={{
          position: "absolute",
          top: 36,
          right: 48,
          left: "auto",
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.22em",
          color: "var(--neutral-400)",
          textTransform: "uppercase",
          zIndex: 20,
          opacity: quoteOn ? 1 : 0,
          transform: quoteOn ? "translateY(0)" : "translateY(-4px)",
          transition:
            "opacity 400ms var(--ease), transform 400ms var(--ease)",
          transitionDelay: quoteOn ? `${FIG_DELAY}ms` : "0ms",
        }}
      >
        — BRIDGE
        <span
          className="dot"
          style={{ color: "var(--copper-700)", margin: "0 8px" }}
        >
          ·
        </span>
        <span style={{ color: "var(--copper-200)" }}>{C.figLabel}</span>
      </div>

      {/* CENTER — Kofi Annan epigraph. Vertically centered ~40–55% from top. */}
      <div
        data-testid="bridge-quote-region"
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          top: "47%",
          transform: "translateY(-50%)",
          zIndex: 20,
        }}
      >
        <QuoteStack
          testId="bridge-quote"
          size={52}
          gap={22}
          duration={600}
          attribution={C.attribution}
          attributionVisible={quoteOn}
          attributionDelayMs={ATTRIBUTION_DELAY}
          lines={[
            {
              content: renderLine(
                C.quoteLines[0].text,
                C.quoteLines[0].kw,
              ),
              size: 52,
              visible: quoteOn,
              delayMs: LINE1_DELAY,
            },
            {
              content: renderLine(
                C.quoteLines[1].text,
                C.quoteLines[1].kw,
              ),
              size: 52,
              visible: quoteOn,
              delayMs: LINE2_DELAY,
            },
            {
              content: renderLine(
                C.quoteLines[2].text,
                C.quoteLines[2].kw,
              ),
              size: 44,
              visible: quoteOn,
              delayMs: LINE3_DELAY,
            },
          ]}
        />
      </div>

      {/* LOWER-CENTER — handoff line. Whispered, not announced. */}
      <div
        data-testid="bridge-handoff"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 80,
          textAlign: "center",
          zIndex: 20,
          opacity: handoffOn ? 1 : 0,
          transform: handoffOn ? "translateY(0)" : "translateY(8px)",
          transition:
            "opacity 600ms var(--ease), transform 600ms var(--ease)",
          willChange: "opacity, transform",
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 24,
            color: "var(--neutral-300)",
            margin: 0,
            lineHeight: 1.4,
            fontWeight: 400,
          }}
        >
          {renderHandoff(C.handoff, C.handoffKw, pulseOn)}
        </p>
      </div>
    </div>
  );
}

// ───────────────────── helpers ─────────────────────

// Inline italic-keyword highlighter for the quote lines. The line itself is
// already italic Instrument Serif neutral-100 (set by QuoteStack). Per
// deck-wide keyword rule, the highlighted keyword becomes copper-400 italic
// at the same weight — visually a color-only emphasis on a single word.
function renderLine(text: string, keywords: readonly string[]): ReactNode {
  if (!keywords.length) return text;
  // Single-keyword case (all 3 Bridge lines have exactly 1 keyword).
  const kw = keywords[0];
  const idx = text.indexOf(kw);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + kw.length);
  const accentStyle: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    color: "var(--copper-400)",
    fontWeight: 400,
  };
  return (
    <>
      {before}
      <em data-testid={`bridge-kw-${kw}`} style={accentStyle}>
        {kw}
      </em>
      {after}
    </>
  );
}

// Handoff line — italic Source Serif 4 neutral-300. The keyword `how` gets
// copper-400 italic + copper-500 underline + 4s AmbientPulse on canonical pose.
function renderHandoff(text: string, keywords: readonly string[], pulse: boolean): ReactNode {
  const kw = keywords[0];
  if (!kw) return text;
  const idx = text.indexOf(kw);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + kw.length);

  const accent = (
    <em
      data-testid="bridge-handoff-kw"
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

// ───────────────────── slide def ─────────────────────

export const bridgeMindsetToMechanicsSlide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "C",
  render: () => <BridgeMindsetToMechanics />,
};
