// Every slide def a deck set may compose — the pool, not a deck.
//
// Spec §4.1. The nine section index modules used to be spread straight into
// `deckSlides`, which made "what exists" and "what the deck runs, in what order"
// the same statement. They are now two: this file is the POOL and
// `./deck-sets.ts` is the ORDER, with `./slots.ts` joining them by id.
//
// So the order below carries no meaning beyond readability, and the list holds
// EVERY brand alternate side by side — `a1-what-youve-seen`, `a1-general` and
// `a1-gems` are all here, though no composed deck contains more than one of
// them. Which one a deck takes is `./slots.ts`'s answer, not this file's.
//
// The dev-only `hexLadderDevSlide` is deliberately absent: it is declared in
// `./registry.tsx`, is reachable only through `?dev=hexladder`, and no deck-set
// list names it.

import type { SlideDef } from "./types";
import { openingSectionASlides } from "@/slides/opening-section-a";
import { leaderGapSlides } from "@/slides/leader-gap";
import { leaderShapeSlides } from "@/slides/leader-shape";
import { landscapeSectionBSlides } from "@/slides/landscape-section-b";
import { mindsetSectionCSlides } from "@/slides/mindset-section-c";
import { foundationCoreSlides } from "@/slides/foundation-core";
import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";
import { foundationTechniquesSectionFSlides } from "@/slides/foundation-techniques-section-f";
import { applicationSectionGSlides } from "@/slides/application-section-g";
import { applicationSectionHSlides } from "@/slides/application-section-h";
import { revealAndClosingSlides } from "@/slides/reveal-and-closing";

export const slideCatalogue: readonly SlideDef[] = [
  ...openingSectionASlides,
  // Leader-only (§4.3). In the POOL like everything else — "which decks run it"
  // is `./deck-sets.ts`'s answer, and only the two leader lists name it.
  ...leaderGapSlides,
  // Section C's centrepiece, and the reason `f8-your-agentic-os` finally sits at
  // C.2 rather than inside the retained TOOLS run — see `./deck-sets.ts`. The two
  // are neighbours in the composed leader deck and NOT here: one is a leader-only
  // file and the other a standard-deck slide the leader list relocates, so the
  // pool keeps each under its own section index.
  ...leaderShapeSlides,
  ...landscapeSectionBSlides,
  ...mindsetSectionCSlides,
  ...foundationCoreSlides,
  ...foundationCoreSectionESlides,
  ...foundationTechniquesSectionFSlides,
  ...applicationSectionGSlides,
  ...applicationSectionHSlides,
  ...revealAndClosingSlides,
];
