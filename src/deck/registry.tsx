import type { SlideDef } from "./types";
import { HexLadder } from "@/primitives/HexLadder";
import { openingSectionASlides } from "@/slides/opening-section-a";
import { landscapeSectionBSlides } from "@/slides/landscape-section-b";
import { mindsetSectionCSlides } from "@/slides/mindset-section-c";
import { revealAndClosingSlides } from "@/slides/reveal-and-closing";
import { foundationCoreSlides } from "@/slides/foundation-core";
import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";
import { foundationTechniquesSectionFSlides } from "@/slides/foundation-techniques-section-f";

// HexLadder is a developer-only slide retained for projection-test
// (see scripts/projection-test.mjs). Always last so projection-test
// can resolve it via slideCount - 1, regardless of how many real
// slides are appended ahead of it.
export const hexLadderDevSlide: SlideDef = {
  steps: 1,
  animationMode: "static",
  canonicalPose: 0,
  surface: "light",
  // Dev-only utility — tagged "K" so the NavBar can rely on `section`
  // being non-optional. NavBar treats it like any K-section slide.
  section: "K",
  render: () => <HexLadder />,
};

// Final deck order per parent meta-spec:
//   Opening (Title + A) → B → C (incl. C→D bridge) → D → E → F → I/J/K.
export const deckSlides: SlideDef[] = [
  ...openingSectionASlides,     // Title + A.1
  ...landscapeSectionBSlides,   // B.1–B.5
  ...mindsetSectionCSlides,     // C.1–C.5 + Bridge
  ...foundationCoreSlides,      // D (existing)
  ...foundationCoreSectionESlides, // E (existing)
  ...foundationTechniquesSectionFSlides, // F (existing)
  ...revealAndClosingSlides,    // I/J/K (existing)
  hexLadderDevSlide,
];
