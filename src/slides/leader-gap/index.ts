// Section THE GAP — the leader deck's first leader-only run (§4.3).
//
// NAMED BY SECTION KEY, NEVER BY LETTER. `gap` is the key; the letter is derived
// from where the run falls in each composed deck (§3.4 R2), and the standard decks
// never see this run at all. A directory called `leader-b-*` would be wrong the
// first time a section landed in front of it.
//
// The other three leader-only runs get their own directories on the same rule:
// `leader-shape`, `leader-invest`, `leader-mandate`.
//
// ORDER IS THE SECTION'S, NOT THE DECK'S. This array says what the section
// contains, in the order §4.3 gives it; `src/deck/deck-sets.ts` says which decks
// run it and where.
//
// §4.3 GIVES THIS RUN FIVE SLIDES AND TWO OF THEM NOW EXIST. In order:
// `gap-hardest-part` (§6.1, gh#65 — the slide below, the run's FIRST) ·
// `gap-no-sop` (§6.2) · `gap-three-failures` (§6.3) · `gap-the-pattern` (§6.4) ·
// `gap-capability-ladder` (§6.5, gh#53 — the run's LAST). The three still to be
// built insert BETWEEN the two below, and each of those edits costs exactly what
// gh#65's did: this array, plus ONE id written into the leader list in
// `src/deck/deck-sets.ts` between the two `gap` rows. No letter moves for any of them
// — `gap` already holds one — and the only figures that move are the ones inside this
// run, which the composer derives (§3.4 R3).
//
// (An earlier revision of this comment credited "#55–#58" with filling the run.
// Those issue numbers were wrong: §11's Phase 7 row is what holds the four
// second-tier `gap` slides, and this ticket — gh#65 — delivers the first of them.)
import type { SlideDef } from "@/deck/types";
import { gapHardestPartSlide } from "./gap-hardest-part";
import { gapCapabilityLadderSlide } from "./gap-capability-ladder";

export const leaderGapSlides: SlideDef[] = [gapHardestPartSlide, gapCapabilityLadderSlide];
