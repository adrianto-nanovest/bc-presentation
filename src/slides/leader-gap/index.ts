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
// §4.3 GIVES THIS RUN FIVE SLIDES AND THREE OF THEM NOW EXIST. In order:
// `gap-hardest-part` (§6.1, gh#65 — the run's FIRST) · `gap-no-sop` (§6.2, gh#66) ·
// `gap-three-failures` (§6.3) · `gap-the-pattern` (§6.4) ·
// `gap-capability-ladder` (§6.5, gh#53 — the run's LAST). The two still to be
// built insert BETWEEN `gap-no-sop` and `gap-capability-ladder` below, and each of
// those edits costs exactly what gh#65's and gh#66's did: this array, plus ONE id
// written into the leader list in `src/deck/deck-sets.ts` between the surrounding
// `gap` rows. No letter moves for any of them
// — `gap` already holds one — and the only figures that move are the ones inside this
// run, which the composer derives (§3.4 R3).
//
// gh#66 IS A MID-RUN INSERT, which is the third shape this array has taken: gh#53
// opened the run, gh#65 went in at its HEAD, and this row lands BETWEEN two existing
// ones. All three cost the same two edits, and none of them moves a LETTER — what
// gh#66 moved is one number, `gap-capability-ladder` B.2 → B.3, derived per deck
// (§3.5) and pinned nowhere.
//
// (An earlier revision of this comment credited "#55–#58" with filling the run.
// Those issue numbers were wrong: §11's Phase 7 row is what holds the four
// second-tier `gap` slides, and this ticket — gh#65 — delivers the first of them.)
import type { SlideDef } from "@/deck/types";
import { gapHardestPartSlide } from "./gap-hardest-part";
import { gapNoSopSlide } from "./gap-no-sop";
import { gapCapabilityLadderSlide } from "./gap-capability-ladder";

export const leaderGapSlides: SlideDef[] = [
  gapHardestPartSlide,
  gapNoSopSlide,
  gapCapabilityLadderSlide,
];
