import type { SlideDef } from "./types";
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
  steps: 1,
  animationMode: "static",
  canonicalPose: 0,
  surface: "light",
  // Dev-only utility — tagged "K" so the SlideDef type's non-optional
  // `section` is satisfied. Not navigated.
  section: "K",
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
