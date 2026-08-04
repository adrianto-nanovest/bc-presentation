import type { SlideDef } from "@/deck/types";
import { titleSlide } from "./title";
import { a1Slide } from "./a1-what-youve-seen";
import { a1GeneralSlide } from "./a1-general";
import { a1GemsSlide } from "./a1-gems";

// Opening — every def authored for Section A, brand alternates included.
//
// A CATALOGUE, NOT A DECK FRAGMENT (§4.1, gh#40). This module used to pick the
// brand's A.1 and hand the deck exactly two slides. Deck order now lives in
// `src/deck/deck-sets.ts` and the brand pick in `src/deck/slots.ts`, so all
// three A.1 alternates sit here side by side and exactly one of them reaches
// any composed deck — behind the canonical slot id `a1-what-youve-seen`.
//
// The Title is grouped here because it belongs to the `opening` run, and it
// carries `numbered: false`: it prints no figure, and pressing `A` skips past it
// to A.1 (compose.ts R5).
export const openingSectionASlides: SlideDef[] = [
  titleSlide,
  a1Slide,
  a1GeneralSlide,
  a1GemsSlide,
];
