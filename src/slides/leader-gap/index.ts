// Section THE GAP — the leader deck's first leader-only run (§4.3).
//
// NAMED BY SECTION KEY, NEVER BY LETTER. `gap` is the key; the letter is derived
// from where the run falls in each composed deck (§3.4 R2) and this run moves
// twice more inside Phase 6 — it is B with one slide today, still B once
// #55–#58 fill it, and the standard decks never see it at all. A directory called
// `leader-b-*` would be wrong the first time a section landed in front of it.
//
// The other three leader-only runs get their own directories on the same rule:
// `leader-shape`, `leader-invest`, `leader-mandate`.
//
// ORDER IS THE SECTION'S, NOT THE DECK'S. This array says what the section
// contains, in the order §4.3 gives it; `src/deck/deck-sets.ts` says which decks
// run it and where. The ladder is §4.3's B.5 — the LAST of five `gap` slides — so
// the four still to be built insert AHEAD of it here, and nothing about that edit
// touches the deck-set list.
import type { SlideDef } from "@/deck/types";
import { gapCapabilityLadderSlide } from "./gap-capability-ladder";

export const leaderGapSlides: SlideDef[] = [gapCapabilityLadderSlide];
