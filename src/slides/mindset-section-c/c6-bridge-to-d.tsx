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
//   • TOP-LEFT: canonical <FigLabel section="C" num={6} … /> (matches E.11).
//   • CENTER: 3 italic Instrument Serif sentence-lines vertically stacked,
//     each typed left-to-right via <TextStream> (typewriter effect).
//   • BENEATH QUOTE: right-aligned attribution chip (normal fade, no stream).
//   • LOWER-CENTER: small italic handoff line with copper ambient pulse
//     on `how` (4s loop — rhymes with C.1 / C.5 closing pulses).
//
// Motion —
//   load (mount-driven):  Photo cross-fades in SLOWLY (1500ms — slowest in
//                         the deck). FigLabel renders instantly top-left.
//   stepIndex 0:          Sentence 1 streams char-by-char, then sentence 2
//                         streams, then sentence 3 streams, then attribution
//                         fades in. ~25ms/char; delays chained so each line
//                         starts ~250ms after the previous finishes.
//   stepIndex 1 (canon):  Handoff line "From here, the how." fades in italic;
//                         4s AmbientPulse on `how` (no underline — the glow
//                         carries the emphasis on its own).
//
// Hover — NONE. This slide is reverent and still. Don't add hover handlers.
//
// Skip-tolerance — If a session runs short, the slide can be held at
// stepIndex 0 indefinitely. The handoff line simply never appears; the
// audience reads the quote and the presenter advances to D.1.
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HeroPhoto } from "@/components/HeroPhoto";
import { DarkenOverlay } from "@/components/DarkenOverlay";
import { AmbientPulse } from "@/components/AmbientPulse";
import { QuoteStack } from "./components/QuoteStack";
import { TextStream } from "./components/TextStream";
import { bridgeContent as C } from "./content";

// Hero photo path lives in content.ts; HeroPhoto cross-fades it over the
// fallback gradient on mount.
const HERO_SRC: string | undefined = C.heroSrc;

// Streaming calibration (~25ms per character):
//   Line 1 "Knowledge is power." (~19 chars) → ~475ms stream.
//   Line 2 "Information is liberating." (~26 chars) → ~650ms stream.
//   Line 3 "Education is the premise … every family." (~73 chars) → ~1825ms.
// Each next line starts ~250ms after the previous finishes (breath beat);
// attribution chip appears ~300ms after sentence 3 finishes — only after the
// audience has read the entire quote does Annan's name claim it.
const MS_PER_CHAR = 25;
const LINE1_DELAY = 200;
const LINE2_DELAY = 925;   // 200 + 475 + 250
const LINE3_DELAY = 1825;  // 925 + 650 + 250
const ATTRIBUTION_DELAY = 3950; // 1825 + 1825 + 300 (just after line 3 finishes)

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

  // Attribution stagger. CSS transitionDelay only fires on a state CHANGE,
  // so we hold `attributionShown` false on mount and flip it true at
  // ATTRIBUTION_DELAY — that gives the opacity 0→1 transition something to
  // actually transition through.
  const [attributionShown, setAttributionShown] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setAttributionShown(true), ATTRIBUTION_DELAY);
    return () => window.clearTimeout(t);
  }, []);

  // Step gates. stepIndex 0 reveals the quote (3 streamed lines + attribution).
  // stepIndex 1 reveals the handoff line.
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

      {/* Canonical top-left FIG label — matches E.11's BRIDGE label. */}
      <FigLabel section="C" num={6} label="BRIDGE · FROM MINDSET TO MECHANICS" />

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
          attributionVisible={attributionShown}
          attributionDelayMs={0}
          lines={[
            {
              content: (
                <TextStream
                  text={C.quoteLines[0].text}
                  keywords={C.quoteLines[0].kw}
                  on={quoteOn}
                  delayMs={LINE1_DELAY}
                  msPerChar={MS_PER_CHAR}
                />
              ),
              size: 52,
              visible: quoteOn,
              delayMs: 0,
            },
            {
              content: (
                <TextStream
                  text={C.quoteLines[1].text}
                  keywords={C.quoteLines[1].kw}
                  on={quoteOn}
                  delayMs={LINE2_DELAY}
                  msPerChar={MS_PER_CHAR}
                />
              ),
              size: 52,
              visible: quoteOn,
              delayMs: 0,
            },
            {
              content: (
                <TextStream
                  text={C.quoteLines[2].text}
                  keywords={C.quoteLines[2].kw}
                  on={quoteOn}
                  delayMs={LINE3_DELAY}
                  msPerChar={MS_PER_CHAR}
                />
              ),
              size: 44,
              visible: quoteOn,
              delayMs: 0,
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

// Handoff line — italic Source Serif 4 neutral-300. The keyword `how` gets
// copper-400 italic + 4s AmbientPulse on canonical pose.
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
