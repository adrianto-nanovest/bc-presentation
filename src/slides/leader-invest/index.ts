// Section WHY INVEST — the leader deck's third leader-only run (§4.3), and the THIRD of
// the four to be complete, after `gap` (gh#67) and `mandate` (gh#69). `shape` is the one
// still short.
//
// NAMED BY SECTION KEY, NEVER BY LETTER. `invest` is the key; the letter is derived from
// where the run falls in each composed deck (§3.4 R2). It has been D since gh#56 opened
// the run and it is D now that gh#70 has closed it — but a directory called `leader-d-*`
// would be wrong the first time a section landed in front of it, which is exactly what
// happened to every curriculum letter when gh#53 put `gap` in front of `landscape` and
// again when gh#54 added `shape`. `src/slides/leader-shape/index.ts` named this directory
// before it existed, on that rule.
//
// ORDER IS THE SECTION'S, NOT THE DECK'S. This array says what the section contains, in
// the order §6.7 gives it; `src/deck/deck-sets.ts` says which decks run it and where.
//
// THE RUN IS FOUR SLIDES LONG, adjacent and in argument order: `invest-base-rates` (D.1) ·
// `invest-own-proof` (D.2) · `invest-chicken-egg` (D.3) · `invest-governance` (D.4).
//
// IT WAS FIVE UNTIL THE MERGE, and the fifth is not missing — it is folded into the fourth.
// §6.7 asked for five and the last two of them, `invest-security` ("where the data goes, and
// what answers it") and `invest-subscription` ("from individual seats to a line item"), were
// one argument told from two desks: one described a personal account with nobody's name
// against it as a RISK, the other described the same account as a PROCUREMENT GAP, and both
// then offered a company-managed seat as the fix. `invest-governance` states the deficit once
// and wires the fix to it, on a stage that draws the claim rather than writing it out. Its own
// file header carries the whole argument and `./content.ts`'s D.4 block records, string by
// string, what the merge kept and what it dropped.
//
// NOTHING MORE INSERTS HERE. A fifth `invest` row would be a slide the run does not argue for.
//
// THE LAST EDIT THIS ARRAY TOOK WAS A HEAD-OF-RUN INSERT, and it is the shape this comment
// predicted rather than the one it had seen. Until gh#70 the four lines below were the
// whole array and this file recorded, in the future tense, that D.1 would insert AHEAD of
// all four and turn their derived figures from D.1 · D.2 · D.3 · D.4 into D.2 · D.3 · D.4
// · D.5. That is what happened, on 2026-08-08, and it cost exactly what gh#65's insert at
// the head of `gap` cost: this array, plus ONE id written into the leader list in
// `src/deck/deck-sets.ts` in front of the `invest-own-proof` row. It is the SECOND
// head-of-run insert this tree has taken (gh#65 was the first, at the head of `gap`) and
// no file behind it was opened to make it work — gh#66 and gh#67 landed MID-run, and
// gh#68 and gh#69 at a run's TAIL, so none of those four is this shape and the count is
// two.
//
// THE MERGE MOVED NO NUMBER AND NO LETTER, which is the one thing worth checking about it.
// The two slides it replaced were the LAST TWO rows of the run, so the row that replaced them
// took the first of their two numbers (D.4) and the second (D.5) simply stopped existing.
// Nothing behind the run moved either: `landscape` claims E because it is the next run, not
// because of how many rows `invest` holds. Both leader decks went from 72 rows to 71.
//
// FOUR NUMBERS MOVED AND NO LETTER DID, at the head-of-run insert before it — counted against the composed deck rather than
// asserted. `invest` already held D, so a row at the front of the run claims no letter
// (§3.4 R2) and nothing outside the run moved at all; inside it, R3 renumbers, so all four
// slides below stepped one number each. Both leader decks went from 71 rows to 72 — 71 and
// not 69, because gh#68 appended `shape-middle-out` at the tail of `shape` and gh#69
// `mandate-levers` at the tail of `mandate`, in the two tickets before this one. Only
// gh#68's row is in front of this one, which is why this run's first row composes at deck
// index 10 rather than 9; gh#69's sits seven runs behind and moves nothing here. Every
// one of those figures is derived per deck (§3.5) and none of them is written down here,
// in `src/deck/deck-sets.ts`, or in any of the five slide files.
//
// WHICH TICKET OWNS WHICH SLIDE, checked rather than assumed, because this comment named
// the wrong one twice before 2026-08-05. #57 is **`invest-chicken-egg`** (§6.7's D.3) —
// `gh issue view 57`: "Phase 6 · D.3 · invest-chicken-egg — four beats, and beat 3 is
// load-bearing". #58 and #59 built the two slides `invest-governance` replaced, so the merge
// is where both of those tickets now land. AND `invest-base-rates` HAS A TICKET: this file
// recorded for two months that it had "NO issue at all" and that §11's phase table put it in
// the Phase 7 row with no ticket behind it. That was true when it was written; **gh#70** —
// "Phase 7 · D.1 · invest-base-rates — 78% adopt, 6% implement properly" — is the issue that
// did not exist then, and it is the one that built the entry below.
import type { SlideDef } from "@/deck/types";
import { investBaseRatesSlide } from "./invest-base-rates";
import { investOwnProofSlide } from "./invest-own-proof";
import { investChickenEggSlide } from "./invest-chicken-egg";
import { investGovernanceSlide } from "./invest-governance";

export const leaderInvestSlides: SlideDef[] = [
  investBaseRatesSlide,
  investOwnProofSlide,
  investChickenEggSlide,
  investGovernanceSlide,
];
