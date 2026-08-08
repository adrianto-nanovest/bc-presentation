// Section THE MANDATE — the leader deck's fourth and last leader-only run (§4.3).
//
// NAMED BY SECTION KEY, NEVER BY LETTER. `mandate` is the key; the letter is
// derived from where the run falls in each composed deck (§3.4 R2). It is K today
// and K in §4.3's finished leader deck, and a directory called `leader-k-*` would
// still be wrong — the three runs in front of it have each moved every letter
// behind them once already (gh#53, gh#54, gh#56), and any Phase 7 slide that
// opened a run ahead of this one would move this one too. `leader-gap/index.ts`
// named this directory before it existed, on exactly that rule.
//
// THIS RUN IS THE ONE THAT MOVES NO CURRICULUM LETTER. It lands BEHIND `pitfalls`
// (§3.6), so `meta`, `principles` and `lab` step one along to L/M/N and everything
// in front of them is untouched — the loop slide stays at H.12, where gh#56 left
// it. §4.3's fourteen sections A–N are reached by APPENDING N, not by pushing H.
//
// ORDER IS THE SECTION'S, NOT THE DECK'S. This array says what the section
// contains, in the order §6.8 gives it; `src/deck/deck-sets.ts` says which decks
// run it and where. §6.8 gives `mandate` three slides — `mandate-enablement`
// (K.1), `mandate-phases-gates` (K.2, brand-varying on slot 6) and
// `mandate-levers` (K.3) — AND ALL THREE NOW EXIST. The run is complete at
// §4.3's count, so the next entry in this array would be a spec change first and
// an edit here second.
//
// gh#61 WAS THE FIRST INSERT IN THIS DECK THAT MOVED NOTHING AT ALL, which is the
// prediction gh#60 made from the other side and is worth recording where it came
// true. Appending INSIDE an existing run touches no letter (the run already had
// one) and no number outside it (R3 renumbers only within a run, and this is the
// run's last row), so both leader decks grew by one slide with every figure in
// front of and behind the mandate unchanged. gh#69's K.3 appends on exactly those
// terms and is the second slide to prove them: same run, same tail, one more row.
// THE ARRAY WAS NEVER PRE-SIZED FOR IT, and that was the right call — a
// placeholder entry is an id a deck set can compose into a blank slide.
import type { SlideDef } from "@/deck/types";
import { mandateEnablementSlide } from "./mandate-enablement";
import { mandatePhasesGatesSlide } from "./mandate-phases-gates";
import { mandateLeversSlide } from "./mandate-levers";

export const leaderMandateSlides: SlideDef[] = [
  mandateEnablementSlide,
  mandatePhasesGatesSlide,
  mandateLeversSlide,
];
