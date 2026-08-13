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
// §4.3 GIVES THIS RUN FIVE SLIDES AND IT COMPOSES AS FOUR ROWS, because ONE ROW CARRIES
// TWO OF THEM. In §4.3's order: `gap-hardest-part` (§6.1, gh#65 — the run's FIRST) ·
// `gap-no-sop` (§6.2, gh#66) · `gap-failures-pattern` (§6.3 + §6.4, gh#67, ONE stage for
// both) · `gap-capability-ladder` (§6.5, gh#53 — the run's LAST). NOTHING MORE INSERTS
// HERE: a fifth row would be a slide §4.3 does not ask for.
//
// WHY FOUR ROWS FOR FIVE SPEC SECTIONS, and it is the one thing to read before counting
// against §4.3. gh#67 first landed §6.3 and §6.4 as two rows — `gap-three-failures` and
// `gap-the-pattern` — because that is how the spec numbers them. §6.4 has no content of
// its own (it is the SHAPE of §6.3), so the pair spent two stages saying one thing and
// the second re-read the first from memory. The merge was reviewed as three visual
// candidates behind a temporary sixth row and `?proto=a|b|c`; the triptych won, the two
// parents retired, and both losing candidates were deleted with them. The run's LENGTH is
// therefore 4 and its CONTENT is still §4.3's five — see `../../deck/deck-sets.ts`, which
// records the same fact from the composed side.
//
// gh#67 WAS A MID-RUN INSERT AND ITS RETIREMENT IS A MID-RUN CONTRACTION, and both cost
// the same two edits: this array, plus the id(s) written into the leader list in
// `src/deck/deck-sets.ts` between the surrounding `gap` rows. Neither moved a LETTER,
// because `gap` has held one since gh#53. What each moved is ONE number:
// `gap-capability-ladder` B.3 → B.5 when the pair landed, B.5 → B.6 when the prototype
// row joined them, and B.6 → B.4 when all three retired into one row. Derived per deck
// (§3.5) and pinned nowhere.
//
// (An earlier revision of this comment credited "#55–#58" with filling the run.
// Those issue numbers were wrong: §11's Phase 7 row is what holds the four
// second-tier `gap` slides — gh#65 delivered the first, gh#66 the second, and gh#67
// the last two, now merged into one row.)
import type { SlideDef } from "@/deck/types";
import { gapHardestPartSlide } from "./gap-hardest-part";
import { gapNoSopSlide } from "./gap-no-sop";
import { gapFailuresPatternSlide } from "./gap-failures-pattern";
import { gapCapabilityLadderSlide } from "./gap-capability-ladder";

export const leaderGapSlides: SlideDef[] = [
  gapHardestPartSlide,
  gapNoSopSlide,
  gapFailuresPatternSlide,
  gapCapabilityLadderSlide,
];
