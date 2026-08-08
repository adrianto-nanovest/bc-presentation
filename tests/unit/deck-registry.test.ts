// The composed deck, asserted per brand × deck set.
//
// DIVISION OF LABOUR with variant-composition.test.tsx: that file owns *which
// slide* a variant gets (berau/gems/general A.1 hooks, the gems K.2, the leader
// deck's F cut and its retained F.8) by object identity. This file owns the
// *shape* of the composed deck — which sections run, in what order, at what size.
// Identity assertions do not belong here and counts do not belong there.
//
// `VARIANT` resolves once at module scope and `src/deck/registry.tsx` reads it
// to resolve the deck set and the `lab` run (gh#40 moved that read there from
// `src/slides/reveal-and-closing`), so one module epoch holds exactly ONE
// VARIANT's deck — brand alone stopped naming a deck when gh#41 gave the leader
// set its own list. Each case therefore re-points `window.location` and resets the
// module registry before importing — once per case, in `beforeAll`, because
// reloading the whole slide registry is the expensive part of this file.
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import {
  BRANDS,
  VARIANTS,
  type Brand,
  type DeckSetId,
  type VariantId,
} from "@/deck-variants";
import type { SlideDef } from "@/deck/types";
import type { SectionKey } from "@/deck/sections";

/** One `[sectionKey, length]` pair. The deck is asserted as its run-length
 *  encoding, which is equivalent to comparing the full ordered section list but
 *  names the offending section on failure instead of an index.
 *
 *  Keyed by `sectionKey`, never by a display letter: as of gh#38 no slide states
 *  what letter it is, and the letter a run takes is a function of where the run
 *  sits (§3.4 R2). Asserting the keys asserts the letters — a run in the wrong
 *  place fails HERE, at the section that moved, rather than as a letter mismatch
 *  on every slide downstream of it. */
type SectionRun = readonly [SectionKey, number];

// This is the standard deck's spine: every brand composes it identically, so
// only the closing `lab` run is brand-dependent. A brand delta INSIDE a section
// (each brand's own A.1, gems' own lab slide) swaps one slide for another and so
// moves no count — see variant-composition.test.tsx for those.
//
// Composed in this order the runs take the letters A–J, which is what the deck
// prints today. The letters are NOT restated here; the order below is what
// produces them.
const SPINE: readonly SectionRun[] = [
  ["opening", 2], // cover + A.1
  ["landscape", 5],
  ["mindset", 6], // C.1–C.5 + the bridge into `process`
  ["process", 5],
  ["fundamentals", 13], // e1–e11, E.12 · LOOP ENGINEERING (gh#48), the bridge
  ["techniques", 9],
  ["tools", 11],
  ["pitfalls", 3],
  ["meta", 4],
  ["principles", 4],
];

// `lab` IS the practice-lab difference: handoff + lab overview + closer where
// the lab runs; the closer alone where it does not, which renumbers the closer
// to .1 of its run (see k3-thank-you.tsx).
const PRACTICE_LAB_RUN = 3;
const CLOSER_ONLY_RUN = 1;

/** The live slide count for a practice-lab brand: the 64 recorded on gh#28, plus
 *  E.12 · LOOP ENGINEERING (gh#48), which §8.2 ships to every deck with no cut
 *  anywhere. Anchors SPINE to an externally observed figure; asserted once, not
 *  per case. */
const OBSERVED_TOTAL_WITH_LAB = 65;

/** The runs a standard deck set composes, read off the brand's `practiceLab` flag. */
function standardRuns(brand: Brand): readonly SectionRun[] {
  return [
    ...SPINE,
    ["lab", BRANDS[brand].practiceLab ? PRACTICE_LAB_RUN : CLOSER_ONLY_RUN],
  ];
}

// ─ The leader deck, no longer the Phase 4 floor ─
// gh#41 · #53 · #54 · #56 · #57 · #60 · #61 · #58 · #59 · #65 · #66 · #67 · #68 · #69

/** The leader deck's spine: the standard one with `techniques` GONE, and FOUR runs
 *  the standard deck does not have — `gap`, `shape`, `invest` in front of
 *  `landscape`, and `mandate` between `pitfalls` and `meta`.
 *
 *  `techniques` is the gh#41 cut. `f1`–`f7` and `f9` are dropped, which empties the
 *  key so it takes no letter at all; `f8-your-agentic-os` survives, carried
 *  elsewhere by the deck set's one `sectionOverrides` entry.
 *
 *  WHERE IT IS CARRIED TO IS THE gh#54 EDIT, and it is why `tools` is 11 here and
 *  not 12: f8 spent gh#41–gh#53 inside the `tools` run, making that run one LONGER
 *  than the standard deck's, and gh#54 moved it out to §4.3's C.2 — so `tools` is
 *  back to the standard 11 and the two extra slides now sit in `shape`.
 *
 *  `gap` (gh#53), `shape` (gh#54), `invest` (gh#56) and `mandate` (gh#60) are the
 *  runs no standard deck has. The first three sit in front of the curriculum, so
 *  every run behind them takes a letter three along from where gh#41 left it —
 *  which is why this file asserts KEYS and not letters (see `SectionRun`): each
 *  insert is ONE line here, where a letter-keyed table would have needed ten edits
 *  to say the same thing three times over.
 *
 *  gh#60 IS THE ONE THAT SHOWS WHY KEYS WERE THE RIGHT CHOICE FROM THE OTHER
 *  DIRECTION. `mandate` lands BEHIND `pitfalls`, so it moved only the three runs
 *  under it — a letter-keyed table would still have needed four edits (the new run
 *  plus `meta`/`principles`/`lab`) to record an insert that changed nothing a room
 *  had already been shown. Composed in this order the runs take A–N, so this is the
 *  LONGEST deck the app composes, three sections past the standard one, and §4.3's
 *  final section count is reached.
 *
 *  AND gh#57, gh#61, gh#58, gh#59, gh#65, gh#66, gh#67, gh#68 AND gh#69 ARE WHAT
 *  EVERY REMAINING
 *  LEADER
 *  TICKET
 *  NOW LOOKS LIKE. Each added one or more rows INSIDE a run that already existed —
 *  `invest-chicken-egg` behind `invest-own-proof`, `mandate-phases-gates` behind
 *  `mandate-enablement`, `invest-security` behind `invest-chicken-egg`,
 *  `invest-subscription` behind `invest-security`, `gap-hardest-part` in FRONT of
 *  `gap-capability-ladder`, `gap-no-sop` BETWEEN those two, `gap-three-failures` and
 *  `gap-the-pattern` BETWEEN `gap-no-sop` and the ladder, `shape-middle-out` behind
 *  the relocated f8, `mandate-levers` behind
 *  `mandate-phases-gates` — so none of the nine moved
 *  a letter anywhere in either
 *  deck, and each cost this table ONE
 *  character: the step on its own run's row below (`1 → 2`, then `2 → 3` for
 *  gh#58, then `3 → 4` for gh#59, and `gap`'s own `1 → 2` for gh#65, `2 → 3` for
 *  gh#66 and `3 → 5` for gh#67, `shape`'s own `2 → 3` for gh#68 and `mandate`'s own
 *  `2 → 3` for gh#69) is the whole of
 *  that ticket's diff here. A
 *  letter-keyed table would have been untouched by all nine — which is the honest
 *  reading, and the reason the gh#60 case above is the one that argues for keys
 *  rather than these nine.
 *
 *  gh#65, gh#66 AND gh#67 ARE THE ONES THAT MOVED A NUMBER, and that is the only
 *  distinction
 *  inside that
 *  group of nine. The other six APPENDED at a run's END, where R3 has nothing behind
 *  the new row to renumber — gh#57, gh#61, gh#58, gh#59, gh#68 and now gh#69; gh#65
 *  went in at
 *  the `gap` run's HEAD and gh#66 and gh#67
 *  into its
 *  MIDDLE, so R3 renumbered
 *  inside that run and `gap-capability-ladder` went B.1 → B.2, then B.2 → B.3, then
 *  B.3 → B.5.
 *  Still no letter, still
 *  one character here — but "no letter and no number" is gh#57's sentence, and
 *  gh#68's and gh#69's, not gh#65's, and the numbering fixture is where the
 *  difference is recorded.
 *
 *  §4.3 gives `gap` five slides, `shape` four and `mandate` three, and §6.7 gives
 *  `invest` five. TWO OF THE FOUR ROWS BELOW ARE NOW FINAL. `gap` IS FULL AS OF gh#67 —
 *  the first of the four leader-only runs to reach its §4.3 length — and `mandate` IS
 *  FULL AS OF gh#69, the second, so both rows are FINAL and any further `gap` or
 *  `mandate` slide is a slide the spec does not ask for. The unbuilt
 *  `shape-tam-kotter` raises `shape` to 4 and the unbuilt `invest-base-rates` raises
 *  `invest` to
 *  5; those are the only two lines below that may still move, and neither
 *  moves any other line. (The ticket numbers are checked, not guessed: #58 was
 *  D.4 and landed as this file's `2 → 3`, #59 was D.5 and landed as the `3 → 4`,
 *  #65 was §6.1's B.1 and landed as `gap`'s `1 → 2`, #66 was §6.2's B.2 and landed
 *  as `gap`'s `2 → 3`, #67 was §6.3's B.3 and §6.4's B.4 together and landed as
 *  `gap`'s `3 → 5`, #68 landed as `shape`'s `2 → 3`, and #69 was §6.8's K.3 and
 *  landed as `mandate`'s `2 → 3`, while
 *  `invest-base-rates` still sits in §11's PHASE 7
 *  row and holds no issue at all — the list ended at #63 and #52–#63 are Phase 6.) */
const LEADER_SPINE: readonly SectionRun[] = [
  ["opening", 2], // cover + A.1
  // `gap-hardest-part` (gh#65, §4.3's B.1) + `gap-no-sop` (gh#66, §4.3's B.2) +
  // `gap-three-failures` (gh#67, §4.3's B.3) + `gap-the-pattern` (gh#67, §4.3's B.4) +
  // `gap-capability-ladder` (gh#53, §4.3's B.5, and composing B.5 at last) — all five
  // leader-only, and §4.3's full run: this number is FINAL.
  ["gap", 5],
  // `shape-agentic-org` (gh#54, leader-only) + the relocated f8 at C.2 +
  // `shape-middle-out` (gh#68, leader-only), appended at the run's TAIL. That append
  // is the only insert shape this table has recorded that moves NEITHER a letter nor
  // a number: `shape` has held C since gh#54, and R3 renumbers only inside the run
  // that changed, where this row has nothing behind it. Contrast `gap`'s row above,
  // which rose the same way three times and cost one number each time.
  ["shape", 3],
  // `invest-own-proof` (gh#56) + `invest-chicken-egg` (gh#57) + `invest-security`
  // (gh#58) + `invest-subscription` (gh#59), all leader-only — §6.7's D.2–D.5,
  // composed D.1–D.4 while D.1 is unbuilt.
  ["invest", 4],
  ["landscape", 5],
  ["mindset", 6],
  ["process", 5],
  ["fundamentals", 13], // e1–e11, E.12 · LOOP ENGINEERING (gh#48), the bridge
  ["tools", 11], // g1–g11, the standard length again since f8 left on gh#54
  ["pitfalls", 3],
  // K.1 `mandate-enablement` (gh#60) + K.2 `mandate-phases-gates` (gh#61) + K.3
  // `mandate-levers` (gh#69), all leader-only — §6.8's full run: this number is FINAL,
  // the second of the four to be.
  ["mandate", 3],
  ["meta", 4],
  ["principles", 4],
];

/** The runs a leader deck set composes. Same `practiceLab` read as the standard
 *  deck: leaders run the same lab (§4.4), so nothing here is deck-set-specific —
 *  and no leader variant is registered for the brand without one. */
function leaderRuns(brand: Brand): readonly SectionRun[] {
  return [
    ...LEADER_SPINE,
    ["lab", BRANDS[brand].practiceLab ? PRACTICE_LAB_RUN : CLOSER_ONLY_RUN],
  ];
}

/** The leader deck's own total: 56 when gh#41 recorded it against a 64-slide
 *  standard deck, 57 once gh#48 inserted E.12 into both sets, 58 once gh#53's
 *  ladder reached this deck and no other, 59 once gh#54's `shape-agentic-org` did
 *  the same, 60 once gh#56's `invest-own-proof` had too, 61 once gh#57's
 *  `invest-chicken-egg` joined that run, 62 once gh#60's `mandate-enablement`
 *  opened a new one, 63 once gh#61's `mandate-phases-gates` joined it, 64 once
 *  gh#58's `invest-security` joined the `invest` run, 65 once gh#59's
 *  `invest-subscription` closed that run at §6.7's full length, 66 once
 *  gh#65's `gap-hardest-part` had opened the `gap` run from the front, 67 once
 *  gh#66's `gap-no-sop` sat behind it, 69 once gh#67's `gap-three-failures`
 *  and `gap-the-pattern` had closed that run at §4.3's five, 70 once gh#68's
 *  `shape-middle-out` sat at the tail of the `shape` run, and 71 now that gh#69's
 *  `mandate-levers` has closed the `mandate` run at §6.8's three.
 *
 *  NINE OF THOSE FOURTEEN MOVED NO LETTER — gh#57 first, gh#61 second, gh#58 third,
 *  gh#59 fourth, gh#65 fifth, gh#66 sixth, gh#67 seventh, gh#68 eighth, gh#69
 *  ninth — which is
 *  worth naming next
 *  to a count:
 *  each lengthened
 *  a run instead of opening one, so the run TABLE above gained no row for any of them,
 *  and A–N is gh#60's. A leader-only slide changes this number every time; what it
 *  does not always change is the letters.
 *
 *  AND gh#65, gh#66 AND gh#67 ARE STILL THE ONLY THREE OF THE NINE TO MOVE A NUMBER,
 *  which
 *  is the
 *  distinction a
 *  count cannot carry: they landed at the HEAD of the `gap` run and in its MIDDLE
 *  rather than at the end
 *  of one, so R3 renumbered inside that run and `gap-capability-ladder` went from B.1
 *  to B.2, then to B.3, then to B.5. No letter, one number, one run, per ticket — and
 *  gh#67 shows the row count of the insert does not change that arithmetic, because
 *  the ladder is the only row behind it inside the run. NEITHER gh#68 NOR gh#69
 *  JOINED THEM: each appended at the TAIL of a run — `shape` for gh#68, `mandate`
 *  for gh#69 — where R3 has nothing behind the new row to renumber, so each moved no
 *  letter AND no number, the cheapest edit any of the fourteen has been. The
 *  numbering
 *  fixture is where that is
 *  recorded, and this constant only says the deck is one row longer.
 *
 *  SO THE DIFFERENCE gh#41 PINNED HAS CHANGED, and that is the point of Phase 6
 *  rather than a regression: the leader deck is no longer "the standard deck minus
 *  eight", it is that minus eight PLUS its own slides — and since gh#65 it is the
 *  LONGER of the two decks, 71 against 65 as of gh#69. The assertion below
 *  states both halves separately so the next `shape` or `invest`
 *  slide moves one number, not a sentence. (`gap` and `mandate` will move it no
 *  further: gh#67 and gh#69 closed those two runs at their spec'd lengths. TWO ROWS
 *  ARE STILL OWED, one per short run: `shape-tam-kotter` and `invest-base-rates`.) */
const LEADER_TOTAL_WITH_LAB = 71;

/** The eight cut F slides — `f1`–`f7` and `f9`, with `f8-your-agentic-os` kept
 *  and relocated. Held apart from the total above so a leader-only ADDITION can
 *  never be mistaken for a retained F slide, or vice versa. */
const LEADER_CUT_F_SLIDES = 8;

/**
 * SLIDES no standard deck runs: `gap-capability-ladder` (gh#53),
 * `shape-agentic-org` (gh#54), `invest-own-proof` (gh#56), `invest-chicken-egg`
 * (gh#57), `mandate-enablement` (gh#60), `mandate-phases-gates` (gh#61),
 * `invest-security` (gh#58), `invest-subscription` (gh#59), `gap-hardest-part`
 * (gh#65), `gap-no-sop` (gh#66), `gap-three-failures` and `gap-the-pattern`
 * (gh#67, the only ticket to bring two at once), `shape-middle-out` (gh#68) and
 * `mandate-levers` (gh#69).
 * Fourteen files that
 * exist for this deck alone, spread across FOUR runs — the count of leader-only
 * SLIDES and the count of leader-only RUNS stopped agreeing on gh#57.
 *
 * THIS IS NOT THE SAME NUMBER AS "SLIDES IN THE LEADER-ONLY RUNS", and gh#54 is
 * where the two stopped agreeing — read both assertions below before changing
 * either. The `shape` RUN holds three slides and only TWO of them are leader-only:
 * the third is `f8-your-agentic-os`, a standard-deck slide the leader list
 * RELOCATES into that run, so it counts toward the run's length and not toward
 * this constant. None of gh#56, gh#57, gh#60, gh#61, gh#58, gh#59, gh#65, gh#66,
 * gh#67, gh#68 or gh#69
 * changed
 * that: `gap`, `invest` and `mandate` are whole new runs and every slide in them is
 * leader-only — including the ones gh#57, gh#61, gh#58, gh#59, gh#68 and gh#69
 * appended to
 * runs that
 * already existed, gh#65's, which went in at the FRONT of one, and gh#66's and gh#67's,
 * which went
 * into the MIDDLE — so this constant
 * and the run table rose together each time. gh#68 IS THE ONE THAT RAISED BOTH INSIDE
 * `shape`, the run where they have differed by one since gh#54: `shape` went 2 → 3 in
 * the table above and this constant went 12 → 13, and the gap of one is f8, unchanged.
 * gh#69 raised both inside `mandate`, where they have never differed at all, 2 → 3
 * and 13 → 14.
 * What gh#57,
 * gh#61, gh#58, gh#59, gh#65, gh#66, gh#67, gh#68 and gh#69 did NOT raise is the
 * count of
 * leader-only RUNS, which
 * is four and is not this number.
 *
 * The split matters because the two constants answer different questions: this one
 * is the deck's slide-count arithmetic (a relocated slide is present in both decks
 * and cancels out of it), and {@link RELOCATED_INTO_LEADER_ONLY_RUNS} is what
 * reconciles that with the run TABLE, where a relocated slide is indistinguishable
 * from a new one.
 */
const LEADER_ONLY_SLIDES = 14;

/** Standard-deck slides the leader list relocates INTO one of those leader-only
 *  runs: `f8-your-agentic-os` alone, moved to `shape` by the deck set's single
 *  `sectionOverrides` entry. Zero until gh#54, which is why one constant used to
 *  serve both assertions below, and still one after gh#56, gh#57, gh#60, gh#61,
 *  gh#58, gh#59, gh#65, gh#66, gh#67, gh#68 and gh#69 — a new RUN relocates nothing,
 *  and
 *  neither
 *  does a row written into an existing one, at its end, at its head or in its
 *  middle, alone or in a pair. gh#68 is the sharpest case: it added a row to the very
 *  run f8 was relocated INTO and this constant still reads one, because relocating is
 *  something a deck set does to an existing slide and gh#68 wrote a new one. */
const RELOCATED_INTO_LEADER_ONLY_RUNS = 1;

interface DeckCase {
  brand: Brand;
  deckSet: DeckSetId;
}

// One row per brand × deck set whose composition is pinned. The two leader rows
// were APPENDED by gh#41, exactly as the previous ticket planned for, and no
// standard row moved. `general` has no leader variant — leaders are addressed per
// organisation — so there are five rows, not six.
//
// This is not §4.3's finished leader deck. Today's floor is 71 slides across A–N,
// and what is still missing is TWO ROWS, one each in `shape` and `invest` — `gap`
// and `mandate` are both COMPLETE:
//
//   · `gap` IS COMPLETE — struck from this list rather than left standing, and the
//     FIRST of the four leader-only runs to be finished. It holds all 5 of §4.3's
//     slides: gh#65's `gap-hardest-part` at the front, gh#66's `gap-no-sop` behind
//     it, gh#67's `gap-three-failures` and `gap-the-pattern` behind that, and gh#53's
//     ladder at the back. (This list said the last two held no ticket, which was true
//     until gh#67 took both; before gh#57 it said "#55–#58", which was never right —
//     #55 is C.1's focus walk and #56–#58 are D.2–D.4.) The ladder is the LAST of the
//     five, so it prints B.5 at last — it printed B.1 until gh#65, B.2 until gh#66 and
//     B.3 until gh#67.
//   · `shape` holds 3 of its 4 — gh#68's `shape-middle-out` APPENDED at the tail,
//     behind f8, and only `shape-tam-kotter` is left. This line said both were
//     unbuilt and that both "append after f8"; the second half was never going to
//     survive the first landing, because the survivor no longer appends — it
//     INSERTS, between f8 and gh#68's row, and moves that row one number when it
//     does (R3, inside `shape` alone). No ticket yet.
//   · `invest` holds 4 of its 5 (§6.7) — only `invest-base-rates` is missing, and
//     it inserts AHEAD of the four built rows (Phase 7, no ticket), which is why
//     each built slide composes one number earlier than §6.7's table gives it.
//   · `mandate` IS COMPLETE — struck from this list rather than left standing, and
//     the SECOND of the four leader-only runs to be finished, after `gap`. It holds
//     all 3 of §6.8's slides: gh#60's `mandate-enablement`, gh#61's
//     `mandate-phases-gates` and gh#69's `mandate-levers` at the tail. This line
//     predicted that gh#69 would APPEND behind `mandate-phases-gates` and move no
//     letter, and that is what it did — no letter and no NUMBER, because an end
//     append has nothing behind it inside its run for R3 to renumber. (This was the
//     LAST letterless row in A.1, and gh#60 emptied that list —
//     `a1-agenda-pointers.test.tsx`.)
//   · NO LONGER MISSING, struck from this list rather than left standing:
//     `shape-agentic-org`'s 9-step focus walk, which landed on gh#55. It moved step
//     counts and not this table, exactly as this line used to predict.
//
// EVERY RUN §4.3 ASKS FOR NOW EXISTS — gh#60's `mandate` was the last one owed, so
// §11's Phase 6 gate of 65 slides across A–N is now a COUNT and not a letter, and
// gh#65 was the first Phase 7 slide to land, gh#66 the second, gh#67 the third and
// fourth, gh#68 the fifth and gh#69 the sixth, which is why the
// total above reads 71 and
// not that gate. Phases
// 6–7 grow the deck to 73 slides by lengthening runs that are already here, so the
// SECTION COUNT is final at fourteen: from here on those tickets move one number in
// `LEADER_SPINE` each and leave these rows, and every letter, alone.
const CASES: readonly DeckCase[] = [
  { brand: "berau", deckSet: "standard" },
  { brand: "gems", deckSet: "standard" },
  { brand: "general", deckSet: "standard" },
  { brand: "berau", deckSet: "leader" },
  { brand: "gems", deckSet: "leader" },
];

function expectedRuns({ brand, deckSet }: DeckCase): readonly SectionRun[] {
  switch (deckSet) {
    case "standard":
      return standardRuns(brand);
    case "leader":
      return leaderRuns(brand);
    default:
      throw new Error(`no composition recorded for deck set "${deckSet}"`);
  }
}

/** The registered variant serving this brand × deck set. Derived from `VARIANTS`
 *  rather than hardcoded, so a case cannot name a variant the app does not serve. */
function variantFor({ brand, deckSet }: DeckCase): VariantId {
  const ids = Object.keys(VARIANTS) as VariantId[];
  const id = ids.find((v) => VARIANTS[v].brand === brand && VARIANTS[v].deckSet === deckSet);
  if (!id) throw new Error(`no variant registered for ${brand} · ${deckSet}`);
  return id;
}

function runsOf(slides: readonly SlideDef[]): Array<[SectionKey, number]> {
  return slides.reduce<Array<[SectionKey, number]>>((runs, s) => {
    const last = runs.at(-1);
    if (last && last[0] === s.sectionKey) last[1] += 1;
    else runs.push([s.sectionKey, 1]);
    return runs;
  }, []);
}

function totalOf(runs: readonly SectionRun[]): number {
  return runs.reduce((n, [, length]) => n + length, 0);
}

const realLocation = window.location;

function restoreLocation(): void {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: realLocation,
  });
}

async function loadRegistry(variant: VariantId) {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(`http://localhost:5173/?variant=${variant}`),
  });
  vi.resetModules();
  return import("@/deck/registry");
}

test(`the spine plus a practice-lab run is the ${OBSERVED_TOTAL_WITH_LAB} slides observed live`, () => {
  expect(totalOf(standardRuns("berau"))).toBe(OBSERVED_TOTAL_WITH_LAB);
});

test(`the leader spine is ${LEADER_TOTAL_WITH_LAB} slides — the cut F section, plus its own`, () => {
  expect(totalOf(leaderRuns("berau"))).toBe(LEADER_TOTAL_WITH_LAB);
  // The two tables have to disagree by exactly the cut MINUS the leader-only
  // slides. Eight cut and not nine: `f8-your-agentic-os` is kept, so the cut is
  // `f1`–`f7` plus `f9`. FOURTEEN additions in FOUR runs — `gap-capability-ladder`
  // (gh#53), `shape-agentic-org` (gh#54), `invest-own-proof` (gh#56),
  // `invest-chicken-egg` (gh#57, the second row of that same `invest` run),
  // `mandate-enablement` (gh#60), `mandate-phases-gates` (gh#61, the second row of
  // that `mandate` run), `invest-security` (gh#58) and `invest-subscription` (gh#59,
  // the third and fourth rows of `invest`), `gap-hardest-part` (gh#65, the FIRST
  // row of `gap`), `gap-no-sop` (gh#66, its second), `gap-three-failures` plus
  // `gap-the-pattern` (gh#67, its third and fourth, closing that run at §4.3's five)
  // `shape-middle-out` (gh#68, the LAST row of `shape`)
  // and `mandate-levers` (gh#69, the THIRD row of `mandate`, closing THAT run at
  // §6.8's three)
  // — and the relocated f8 is in NEITHER number, because it is
  // present in both decks and cancels out of a difference. Fourteen additions against
  // eight cuts is why the difference below is NEGATIVE: the leader deck is six
  // slides longer than the standard one, which it had never been at all before gh#65.
  expect(OBSERVED_TOTAL_WITH_LAB - LEADER_TOTAL_WITH_LAB).toBe(
    LEADER_CUT_F_SLIDES - LEADER_ONLY_SLIDES,
  );
  // Asserted from the run table too, so the arithmetic above cannot be satisfied
  // by a cut F slide quietly coming back while a leader-only slide quietly leaves.
  //
  // THE TABLE COUNTS THE RELOCATED SLIDE AND THE ARITHMETIC DOES NOT, which is the
  // one thing to hold in mind here: a run keyed `shape` is three slides long whether
  // its members were written for this deck or moved into it, so this sum is the
  // leader-only slides PLUS whatever the deck set relocates into a leader-only run.
  // Adding f8's row to the total above instead would claim the leader deck is a
  // slide longer than it is.
  const standardKeys = standardRuns("berau").map(([key]) => key);
  expect(
    leaderRuns("berau")
      .filter(([key]) => !standardKeys.includes(key))
      .reduce((n, [, length]) => n + length, 0),
  ).toBe(LEADER_ONLY_SLIDES + RELOCATED_INTO_LEADER_ONLY_RUNS);
});

describe.each(CASES)("deck composed for $brand · $deckSet", (deckCase) => {
  const variant = variantFor(deckCase);
  let deckSlides: SlideDef[];
  let hexLadderDevSlide: SlideDef;

  beforeAll(async () => {
    ({ deckSlides, hexLadderDevSlide } = await loadRegistry(variant));
  });
  afterAll(restoreLocation);

  test(`${variant} runs the spec'd sections, in order, at the spec'd sizes`, () => {
    expect(runsOf(deckSlides)).toEqual(expectedRuns(deckCase));
  });

  test("every slide is navigable: a step count and an in-range canonical pose", () => {
    deckSlides.forEach((s, i) => {
      const at = `${variant} slide ${i} (${s.id})`;
      expect(typeof s.render, at).toBe("function");
      expect(s.steps, at).toBeGreaterThan(0);
      expect(s.canonicalPose, at).toBeGreaterThanOrEqual(0);
      expect(s.canonicalPose, at).toBeLessThan(s.steps);
    });
  });

  test("excludes the dev-only hex-ladder slide, so the last authored section closes the deck", () => {
    expect(deckSlides).not.toContain(hexLadderDevSlide);
    expect(deckSlides.at(-1)?.sectionKey).toBe(expectedRuns(deckCase).at(-1)?.[0]);
  });
});

describe("the practice-lab difference", () => {
  afterEach(() => {
    vi.doUnmock("@/deck-variants");
    restoreLocation();
  });

  test("follows the brand's `practiceLab` flag, not the brand's identity", async () => {
    // `general` is the brand without a lab. Force ONLY its flag true: if the lab
    // slides then appear, composition branches on the flag — not on a brand or
    // variant string, which is what the ticket asks this file to prove.
    const real = await import("@/deck-variants");
    vi.doMock("@/deck-variants", () => ({
      ...real,
      BRANDS: {
        ...real.BRANDS,
        general: { ...real.BRANDS.general, practiceLab: true },
      },
    }));

    const { deckSlides } = await loadRegistry("general");
    expect(runsOf(deckSlides).at(-1)).toEqual(["lab", PRACTICE_LAB_RUN]);
  });
});
