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
import { leaderInvestSlides } from "@/slides/leader-invest";
import { leaderMandateSlides } from "@/slides/leader-mandate";
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
  // is `./deck-sets.ts`'s answer, and only the two leader lists name it. It holds ALL
  // FIVE of its slides as of gh#67 — the first of the four leader-only runs to be
  // complete: gh#65's `gap-hardest-part` (§6.1, the run's first), gh#66's
  // `gap-no-sop` (§6.2, its second), gh#67's `gap-three-failures` (§6.3) and
  // `gap-the-pattern` (§6.4), and gh#53's `gap-capability-ladder` (§6.5, the run's
  // last). NOTHING IN THIS FILE CHANGED FOR gh#65, gh#66 OR gh#67 — the spread reads
  // the section's own array, exactly as the `leaderInvestSlides` line below records
  // for gh#57/#58/#59, and that holds whether the new row joins its section at the
  // end, at the FRONT, or in the MIDDLE, and whether it arrives alone or in a pair.
  ...leaderGapSlides,
  // Leader-only too (§4.3), and it holds TWO defs as of gh#68 — gh#54's
  // `shape-agentic-org`, section C's centrepiece and the reason
  // `f8-your-agentic-os` finally sits at C.2 rather than inside the retained TOOLS
  // run, and gh#68's `shape-middle-out`, appended at the tail of the section's own
  // array. THE POOL AND THE COMPOSED RUN DO NOT AGREE ON THE COUNT HERE, and this is
  // the one section where they never will: the run is THREE rows on a leader deck
  // because f8 joins it through `./deck-sets.ts`'s single `sectionOverrides` entry,
  // and f8 is a standard-deck slide composed from its OWN section index, so it is
  // not in this array and must not be. Neighbours on the projector, strangers in the
  // pool. One row of §4.3's four is still unbuilt (`shape-tam-kotter`), and it will
  // arrive the same way: inside `@/slides/leader-shape`, not here.
  //
  // NOTHING IN THIS FILE CHANGED FOR gh#68 — the spread reads the section's own
  // array, exactly as the `leaderGapSlides` line above records for gh#65/#66/#67 and
  // the `leaderInvestSlides` line below for gh#57/#58/#59, and that holds whether the
  // new row joins its section at the END, at the front, or in the middle.
  ...leaderShapeSlides,
  // Leader-only too (§6.7), and the third run in front of the curriculum. It holds
  // FOUR of its five slides today — gh#56's, gh#57's, gh#58's and gh#59's, in §6.7's
  // order — and the one it does not is `invest-base-rates` (§6.7's D.1, no ticket,
  // §11's Phase 7 row). The pool grows a row per
  // ticket, and which decks run them stays `./deck-sets.ts`'s answer. NOTHING IN THIS
  // FILE CHANGES FOR A NEW SLIDE IN AN EXISTING RUN: the spread reads the section's own
  // array, so gh#57, gh#58 and gh#59 each needed only the comment above corrected —
  // this line
  // said ONE until gh#58 and was wrong from gh#57 onward.
  ...leaderInvestSlides,
  ...landscapeSectionBSlides,
  ...mindsetSectionCSlides,
  ...foundationCoreSlides,
  ...foundationCoreSectionESlides,
  ...foundationTechniquesSectionFSlides,
  ...applicationSectionGSlides,
  ...applicationSectionHSlides,
  // The fourth and last leader-only run (§6.8), and the only one that does NOT
  // sit in front of the curriculum: `mandate` lands between `pitfalls` and `meta`
  // (§3.6), which is why this line is HERE and not up with the other three. The
  // order in this file carries no meaning — `./deck-sets.ts` owns it — so the
  // placement buys nothing but a reader's ability to skim the pool and see the
  // leader deck's shape in it. It holds TWO of its three slides today.
  ...leaderMandateSlides,
  ...revealAndClosingSlides,
];
