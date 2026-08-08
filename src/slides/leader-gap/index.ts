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
// §4.3 GIVES THIS RUN FIVE SLIDES AND ALL FIVE NOW EXIST. THE ARRAY IS CLOSED. In
// order: `gap-hardest-part` (§6.1, gh#65 — the run's FIRST) · `gap-no-sop` (§6.2,
// gh#66) · `gap-three-failures` (§6.3, gh#67) · `gap-the-pattern` (§6.4, gh#67) ·
// `gap-capability-ladder` (§6.5, gh#53 — the run's LAST). §4.3 ASKS FOR NOTHING MORE
// IN `gap`: this is the FIRST of the four leader-only runs to be finished, so the next
// reader should treat the array below as complete rather than mid-build. `shape`,
// `invest` and `mandate` are all still short of their §4.3 lengths; this one is not,
// and a sixth row here would be a slide §4.3 does not ask for.
//
// gh#67 IS A MID-RUN INSERT OF TWO ROWS, and mid-run inserts are the shape this array
// settled into: gh#53 opened the run, gh#65 went in at its HEAD, gh#66 was the FIRST
// mid-run insert (of ONE row) and gh#67 is the second (of TWO, adjacent, in §4.3's
// order). Every one of those tickets cost the same two edits — this array, plus the
// id(s) written into the leader list in `src/deck/deck-sets.ts` between the
// surrounding `gap` rows — and none of them moved a LETTER, because `gap` has held one
// since gh#53. What gh#67 moved is ONE number, `gap-capability-ladder` B.3 → B.5,
// derived per deck (§3.5) and pinned nowhere.
//
// (An earlier revision of this comment credited "#55–#58" with filling the run.
// Those issue numbers were wrong: §11's Phase 7 row is what holds the four
// second-tier `gap` slides — gh#65 delivered the first, gh#66 the second, and gh#67
// the last two.)
import type { SlideDef } from "@/deck/types";
import { gapHardestPartSlide } from "./gap-hardest-part";
import { gapNoSopSlide } from "./gap-no-sop";
import { gapThreeFailuresSlide } from "./gap-three-failures";
import { gapThePatternSlide } from "./gap-the-pattern";
import { gapCapabilityLadderSlide } from "./gap-capability-ladder";

export const leaderGapSlides: SlideDef[] = [
  gapHardestPartSlide,
  gapNoSopSlide,
  gapThreeFailuresSlide,
  gapThePatternSlide,
  gapCapabilityLadderSlide,
];
