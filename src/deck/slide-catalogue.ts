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
  // FIVE of §4.3's slides as of gh#67 — the first of the four leader-only runs to be
  // complete — in FOUR defs, because one of them carries two: gh#65's
  // `gap-hardest-part` (§6.1, the run's first), gh#66's `gap-no-sop` (§6.2, its
  // second), gh#67's `gap-failures-pattern` (§6.3 + §6.4 on one stage), and gh#53's
  // `gap-capability-ladder` (§6.5, the run's last). NOTHING IN THIS FILE CHANGED FOR
  // gh#65, gh#66 OR gh#67, INCLUDING WHEN gh#67'S TWO ROWS MERGED INTO ONE — the spread
  // reads the section's own array, exactly as the `leaderInvestSlides` line below records
  // for gh#57/#58/#59, and that holds whether the new row joins its section at the
  // end, at the FRONT, or in the MIDDLE, whether it arrives alone or in a pair, and
  // whether the section's array grows or shrinks.
  ...leaderGapSlides,
  // Leader-only too (§4.3), and it holds THREE defs as of gh#71 — gh#54's
  // `shape-agentic-org`, section C's centrepiece and the reason
  // `f8-your-agentic-os` finally sits at C.2 rather than inside the retained TOOLS
  // run, gh#71's `shape-tam-kotter` (§6.6's C.3), inserted mid-array, and gh#68's
  // `shape-middle-out`, appended at the tail of the section's own
  // array. THE POOL AND THE COMPOSED RUN DO NOT AGREE ON THE COUNT HERE, and this is
  // the one section where they never will: the run is FOUR rows on a leader deck
  // because f8 joins it through `./deck-sets.ts`'s single `sectionOverrides` entry,
  // and f8 is a standard-deck slide composed from its OWN section index, so it is
  // not in this array and must not be. Neighbours on the projector, strangers in the
  // pool — three defs here, four rows there, permanently.
  //
  // THE RUN IS COMPLETE AS OF gh#71, at §4.3's four, and it is the LAST of the four
  // leader-only runs to close: `gap` on gh#67, `mandate` on gh#69, `invest` on gh#70,
  // `shape` here. NO LEADER ROW IS OWED ANYWHERE, so this line said "one row still
  // unbuilt" for the last time.
  //
  // NOTHING IN THIS FILE CHANGED FOR gh#68 OR gh#71 — the spread reads the section's own
  // array, exactly as the `leaderGapSlides` line above records for gh#65/#66/#67 and
  // the `leaderInvestSlides` line below for gh#57/#58/#59/#70, and that holds whether the
  // new row joins its section at the END, at the front, or in the middle.
  ...leaderShapeSlides,
  // Leader-only too (§6.7), and the third run in front of the curriculum. It holds ALL
  // FIVE of its slides as of gh#70 — the THIRD of the four leader-only runs to be
  // complete, after `gap` (gh#67) and `mandate` (gh#69) — in §6.7's order: gh#70's
  // `invest-base-rates` (D.1, the run's first), gh#56's `invest-own-proof` (D.2),
  // gh#57's `invest-chicken-egg` (D.3), gh#58's `invest-security` (D.4) and gh#59's
  // `invest-subscription` (D.5). The
  // pool grows a row per ticket, and which decks run them stays `./deck-sets.ts`'s answer.
  // NOTHING IN THIS FILE CHANGES FOR A NEW SLIDE IN AN EXISTING RUN: the spread reads the
  // section's own array, so gh#57, gh#58, gh#59 and gh#70 each needed only the comment
  // above corrected — this line said ONE until gh#58, was wrong from gh#57 onward, and
  // said FOUR until gh#70 put a fifth row at the FRONT of the section's array, which this
  // spread absorbed exactly as the `leaderGapSlides` line above records for gh#65's head
  // insert and the `leaderShapeSlides` line records for gh#68's tail append.
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
  // leader deck's shape in it. It holds ALL THREE of its slides as of gh#69 — the
  // SECOND of the four leader-only runs to be complete, after `gap` (gh#67).
  // NOTHING IN THIS FILE CHANGED FOR gh#69 either: the spread reads the section's own
  // array, exactly as the three lines above record for gh#65/#66/#67 and
  // gh#57/#58/#59, and an append at a run's END is no different here from a head or a
  // mid-run insert — this line is the whole registration.
  ...leaderMandateSlides,
  ...revealAndClosingSlides,
];
