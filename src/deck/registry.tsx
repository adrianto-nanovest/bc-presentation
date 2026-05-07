import type { SlideDef } from "./types";
import { HexLadder } from "@/primitives/HexLadder";
import { revealAndClosingSlides } from "@/slides/reveal-and-closing";
import { foundationCoreSlides } from "@/slides/foundation-core";

// HexLadder is a developer-only slide retained for projection-test
// (see scripts/projection-test.mjs). Always last so projection-test
// can resolve it via slideCount - 1, regardless of how many real
// slides are appended ahead of it.
export const hexLadderDevSlide: SlideDef = {
  steps: 1,
  animationMode: "static",
  canonicalPose: 0,
  surface: "light",
  render: () => <HexLadder />,
};

// Section D (foundation-core) precedes the Reveal+Closing arc in the final
// deck order per the parent meta-spec; for now we register both so dev/
// projection-test can navigate the full sequence.
export const deckSlides: SlideDef[] = [
  ...foundationCoreSlides,
  ...revealAndClosingSlides,
  hexLadderDevSlide,
];
