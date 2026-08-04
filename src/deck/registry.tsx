import type { SlideDef } from "./types";
import { composeDeck, type ComposedDeck } from "./compose";
import { publishSectionLetters } from "./section-letters";
import { HexLadder } from "@/primitives/HexLadder";
import { openingSectionASlides } from "@/slides/opening-section-a";
import { landscapeSectionBSlides } from "@/slides/landscape-section-b";
import { mindsetSectionCSlides } from "@/slides/mindset-section-c";
import { revealAndClosingSlides } from "@/slides/reveal-and-closing";
import { foundationCoreSlides } from "@/slides/foundation-core";
import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";
import { foundationTechniquesSectionFSlides } from "@/slides/foundation-techniques-section-f";
import { applicationSectionGSlides } from "@/slides/application-section-g";
import { applicationSectionHSlides } from "@/slides/application-section-h";

// HexLadder is a developer-only slide retained for projection-test
// (see scripts/projection-test.mjs). It is NOT part of deckSlides so
// it never appears in audience navigation; reach it via ?dev=hexladder,
// which Deck.tsx renders standalone.
export const hexLadderDevSlide: SlideDef = {
  // The one slide whose id is not a file basename: it is declared here rather
  // than in a file of its own. `tests/unit/deck-slide-ids.test.ts` names it as
  // the single sanctioned exception.
  id: "hex-ladder",
  steps: 1,
  animationMode: "static",
  canonicalPose: 0,
  surface: "light",
  // Dev-only utility — tagged `lab` so the SlideDef type's non-optional
  // `sectionKey` is satisfied. Not navigated, and never composed with the
  // audience deck, so the key costs that deck nothing.
  sectionKey: "lab",
  render: () => <HexLadder />,
};

// Final deck order per parent meta-spec:
//   Opening (Title + A) → B → C (incl. C→D bridge) → D → E → F → G → H → I/J/K.
export const deckSlides: SlideDef[] = [
  ...openingSectionASlides,     // Title + A.1
  ...landscapeSectionBSlides,   // B.1–B.5
  ...mindsetSectionCSlides,     // C.1–C.5 + Bridge
  ...foundationCoreSlides,      // D (existing)
  ...foundationCoreSectionESlides, // E (existing)
  ...foundationTechniquesSectionFSlides, // F (existing)
  ...applicationSectionGSlides, // G.1–G.11
  ...applicationSectionHSlides, // H.1–H.3
  ...revealAndClosingSlides,    // I/J/K — K1 is the final audience slide
];

// The same deck, carrying the letter and page number DERIVED from each slide's
// position (§3.4). THIS IS WHAT THE SCREEN PRINTS as of §3.5: `Deck.tsx` reads
// the row for the showing index and publishes it through `SlideNumberContext`,
// and `FigLabel` renders from that and from nothing else. No slide names a
// letter or a number any more, so a cut, insert or reorder cannot leave a gap.
// `tests/unit/deck-composed-numbering.test.ts` holds these derived pairs against
// the pre-refactor record in `tests/fixtures/deck-numbering.json`.
//
// COMPOSED AT MODULE SCOPE, on purpose and exactly once, because `deckSlides`
// already resolves `VARIANT` at module scope — one module epoch holds exactly
// one brand's deck, so it can also hold exactly one composed deck. That also
// makes R4 (a section key may form only one run) a load-time error rather than
// a first-paint one.
export const composedDeck: ComposedDeck<SlideDef> = composeDeck(deckSlides);

// A slide that prints a cross-reference to another section (A.1's agenda
// pointers, §3.6) cannot import this module — it is already in it, through
// `deckSlides`. Push the lookup out to the leaf module it CAN import instead;
// see `./section-letters.ts` for why the edge has to run this way round.
// The hex-ladder deck below deliberately does NOT publish: it is one dev-only
// slide, not the deck the audience navigates.
publishSectionLetters(composedDeck.letterOf);

// The dev route renders the hex ladder ALONE, so that route is its own one-slide
// deck and composes as one. It prints no FigLabel, so these values never reach
// the screen — but `<Slide>` publishes a number for whatever it shows, and
// deriving this one keeps the audience-facing paths free of a hardcoded
// letter/number pair. (The five dev-only prototype routes still pass their own
// hardcoded figures in; they are deleted with their directories in Phases 5–8.)
export const hexLadderComposedDeck: ComposedDeck<SlideDef> = composeDeck([hexLadderDevSlide]);
