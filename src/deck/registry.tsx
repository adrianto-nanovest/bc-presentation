import type { SlideDef } from "./types";
import { composeDeck, type ComposedDeck } from "./compose";
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
  // Dev-only utility — tagged "K" / `lab` so the SlideDef type's non-optional
  // `section` and `sectionKey` are satisfied. Not navigated, and never composed,
  // so the key costs the composed deck nothing.
  section: "K",
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
// position (§3.4). Nothing renders from it yet — the chrome still prints the
// hardcoded `<FigLabel section= num=>` props, and `tests/unit/deck-composed-numbering.test.ts`
// holds the two side by side and requires them to agree. Later tickets in this
// phase move the chrome onto these values and delete the hardcoded pairs.
//
// COMPOSED AT MODULE SCOPE, on purpose and exactly once, because `deckSlides`
// already resolves `VARIANT` at module scope — one module epoch holds exactly
// one brand's deck, so it can also hold exactly one composed deck. That also
// makes R4 (a section key may form only one run) a load-time error rather than
// a first-paint one.
export const composedDeck: ComposedDeck<SlideDef> = composeDeck(deckSlides);
