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
// `f8-your-agentic-os`, `shape-tam-kotter`, `shape-middle-out` — and only the
// first is a leader-shape file: F.8 is a RELOCATED standard-deck slide that joins
// this run through `sectionOverrides` and is composed from its own directory, so
// it does not belong in this array. C.3 and C.4 append here when they are built.
import type { SlideDef } from "@/deck/types";
import { shapeAgenticOrgSlide } from "./shape-agentic-org";

export const leaderShapeSlides: SlideDef[] = [shapeAgenticOrgSlide];
