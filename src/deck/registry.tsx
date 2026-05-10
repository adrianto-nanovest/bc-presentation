import type { SlideDef } from "./types";
import { HexLadder } from "@/primitives/HexLadder";
import { revealAndClosingSlides } from "@/slides/reveal-and-closing";
import { foundationCoreSlides } from "@/slides/foundation-core";
import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";

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

// Final deck order per parent meta-spec: D → E → ... → I/J/K.
export const deckSlides: SlideDef[] = [
  ...foundationCoreSlides,
  ...foundationCoreSectionESlides,
  ...revealAndClosingSlides,
  hexLadderDevSlide,
];
