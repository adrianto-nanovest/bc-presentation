// Section THE SHAPE — the leader deck's second leader-only run (§4.3).
//
// NAMED BY SECTION KEY, NEVER BY LETTER. `shape` is the key; the letter is derived
// from where the run falls in each composed deck (§3.4 R2). It is C today, behind
// `opening` and `gap`, and stays C as the rest of Phase 6 fills it — but a
// directory called `leader-c-*` would be wrong the first time a section landed in
// front of it, which is exactly what happened to every curriculum letter when
// gh#53 put `gap` in front of `landscape`.
//
// The other two leader-only runs get their own directories on the same rule:
// `leader-invest`, `leader-mandate` (and `leader-gap` already has one).
//
// ORDER IS THE SECTION'S, NOT THE DECK'S. This array says what the section
// contains, in the order §4.3 gives it; `src/deck/deck-sets.ts` says which decks
// run it and where. §4.3 gives `shape` four slides — `shape-agentic-org`,
// `f8-your-agentic-os`, `shape-tam-kotter`, `shape-middle-out` — and THREE of them
// are leader-shape files: F.8 is a RELOCATED standard-deck slide that joins this
// run through `sectionOverrides` and is composed from its own directory, so it does
// not belong in this array and the array is one shorter than the run for that
// reason alone.
//
// THE RUN IS COMPLETE AS OF gh#71, at §4.3's four. It is the THIRD of the four
// leader-only runs to reach its spec'd length, after `gap` (gh#67) and `mandate`
// (gh#69); a fifth `shape` slide would be a slide §4.3 does not ask for, so nothing
// more is appended or inserted here.
//
// AND THE ORDER BELOW IS NOT THE ORDER THE FILES WERE WRITTEN IN, which is the
// whole point of saying it is the section's. `shape-tam-kotter` was built LAST
// (§11's Phase 7 puts it there, as the slide that becomes a spoken minute if the
// phase slips) and sits SECOND, because §4.3's C.3 falls between f8 and C.4. Its
// insert is what stepped `shape-middle-out` from C.3 to C.4 without that file being
// opened — R3 renumbering inside the run that changed, derived per composed deck
// (§3.5), written down in no file under this directory.
import type { SlideDef } from "@/deck/types";
import { shapeAgenticOrgSlide } from "./shape-agentic-org";
import { shapeTamKotterSlide } from "./shape-tam-kotter";
import { shapeMiddleOutSlide } from "./shape-middle-out";

export const leaderShapeSlides: SlideDef[] = [
  shapeAgenticOrgSlide,
  shapeTamKotterSlide,
  shapeMiddleOutSlide,
];
