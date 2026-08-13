// The pre-refactor numbering record, and the gate that keeps it honest.
//
// Spec §3.7 item 1 (gh#32). Phase 3 replaces 64 hardcoded `<FigLabel section=…
// num=…>` call sites with letters and numbers DERIVED from deck position, and
// its gate is "behaviour-preserving no-op, proved by the snapshot diff". This
// file is the diff: it re-harvests every live deck from rendered output and
// compares it with `tests/fixtures/deck-numbering.json`, which was recorded
// before any of that landed.
//
// WHEN THIS FAILS, READ THE DIFF BEFORE REGENERATING. During Phase 3 a failure
// is the ticket failing — the refactor moved a number. Outside Phase 3, a copy
// change to a slide's label is a legitimate reason for the fixture to move, and
// then the fix is:
//
//     npm run harvest:numbering       # rewrites the fixture, then re-asserts it
//
// which is the same harvester, so the fixture can never be hand-edited into
// agreement with itself — and which REFUSES to absorb a moved figure number
// unless told to in as many words. See `recordFixture`.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import {
  harvestAllDecks,
  HARVEST_TARGETS,
  HARVESTED_BRANDS,
  restoreLocation,
  type DeckKey,
  type DeckNumbering,
  type NumberingRow,
} from "../harvest/deck-numbering";
import { BRANDS, VARIANTS, type VariantId } from "@/deck-variants";
import { SECTION_NAMES } from "@/deck/sections";

const FIXTURE = path.resolve(__dirname, "../fixtures/deck-numbering.json");

/**
 * The shape of a printed figure — `"E.11"`: one section letter, a dot, a number.
 *
 * THE LETTER BOUND IS DERIVED, NOT TYPED. `composeDeck` hands out one letter per
 * RUN in encounter order (§3.4 R2) and R4 caps a key at exactly one run, so a deck
 * cannot show more runs than there are registered section keys — which makes the
 * last registered key's ordinal the widest letter any deck could legally print.
 * (`composeDeck`'s own 17-section cap is the other bound and is looser today.)
 *
 * IT WAS A LITERAL `[A-K]` UNTIL gh#54, and it went stale for a reason that has
 * nothing to do with what this assertion is about: the leader deck gained a twelfth
 * section and started printing `L`. A range typed here has to be edited every time
 * a section is added, and each edit is a chance to widen it past a real regression.
 * gh#56 and gh#60 are the payoff — a thirteenth section and then a fourteenth, `M`
 * and then `N` on screen, no edit to this line for either. §4.3 stops at fourteen,
 * so the derivation has now outlived the whole run of section inserts it was
 * written for: gh#57 and gh#61 each added a slide and, as every leader ticket after
 * them will, no section at all.
 *
 * IT IS A SHAPE CHECK, NOT A RANGE GATE, which is why loosening the bound costs
 * nothing: what each deck actually prints, letter by letter, is pinned by the
 * fixture equality at the top of this file and by the per-deck closer below. This
 * row exists to refuse `"E11"`, `"11"`, or a re-typed `"SECTION E"` in a field that
 * must hold what the screen shows.
 */
const FIG_PATTERN = new RegExp(
  `^[A-${String.fromCharCode(
    "A".charCodeAt(0) + Object.keys(SECTION_NAMES).length - 1,
  )}]\\.\\d+$`,
);

/** Set by `npm run harvest:numbering`. Rewrites the fixture from the harvest
 *  before the assertions below run against it. */
const UPDATING = process.env.UPDATE_DECK_NUMBERING === "1";

/** Set by `ALLOW_MOVED_FIGURES=1 npm run harvest:numbering` — see `recordFixture`. */
const ALLOW_MOVED_FIGURES = process.env.ALLOW_MOVED_FIGURES === "1";

/** What one harvested deck must show, independently of the record on disk. */
interface ObservedDeck {
  slides: number;
  /** The figure the LAST slide prints. */
  closer: string;
}

/**
 * The figures observed live, per fixture key (`DeckKey` — a brand means that
 * brand's standard deck). Repeated here as numbers the harvest must hit, so a
 * deck that silently loses a slide fails LOUDLY instead of quietly rewriting the
 * fixture one row shorter.
 *
 * The three standard rows were recorded on gh#32. `general` runs no Practice Lab,
 * so its K run is the closer alone and it renumbers itself to K.1 — that used to
 * be a `FIG_NUM` hack inside `k3-thank-you.tsx` reading `practiceLab`; gh#35
 * deleted it and the K.1 below is the composer's own output.
 *
 * EVERY ROW GREW BY ONE ON gh#48, which inserted `e12-loop-engineering` ahead of
 * the section-E bridge in both deck sets (§8.2 — no cut anywhere). That insert also
 * moved one recorded figure, the bridge's, from E.12 to E.13, so re-recording it
 * took `ALLOW_MOVED_FIGURES=1` — see `recordFixture`. No `fig` before the insert
 * changed, and the closers did not move: the insert is inside section E.
 *
 * THE LEADER ROWS MOVED ON gh#53, and the standard rows did not — which is the
 * split that ticket promised. `gap-capability-ladder` is the first slide to reach
 * the leader lists ALONE, so those two decks are one row longer (58) and every
 * letter behind the new `gap` run stepped along: the loop slide prints **F.12**
 * there rather than E.12, and the closer is back at **K.3** after gh#41's F cut
 * had taken it to J.3. Re-recording it therefore took `ALLOW_MOVED_FIGURES=1` —
 * 54 moved figures in each leader deck, every one of them a LETTER and not a
 * number, because an insert in front of a run cannot renumber inside one. Nothing
 * renumbered them; a letter is a function of position (§3.4 R2).
 *
 * THE LEADER ROWS MOVED AGAIN ON gh#54, AND FURTHER THAN gh#53's INSERT DID,
 * because that ticket did two things and only one of them was an insert:
 *
 *   1. `shape-agentic-org` reached the leader lists alone — the second slide ever
 *      to do so — taking both decks to **59** rows. `shape` claims C, so every
 *      letter behind it stepped along for the second time: the loop slide prints
 *      **G.12** in a leader deck now (E.12 → F.12 → G.12, with that file never
 *      opened), and the closer is **L.3**, a letter no standard deck has ever
 *      printed.
 *   2. `f8-your-agentic-os` was RELOCATED out of the retained TOOLS run to C.2, so
 *      its own figure went **G.11 → C.2** — a new letter and a new number, which is
 *      simply what moving a slide to another run does.
 *
 *      THE SIDE EFFECT IS THE ONE WORTH KNOWING, and it is the part an insert
 *      cannot cause: a slide leaving the MIDDLE of a run renumbers what follows it
 *      INSIDE that run (R3), so `g11-bridge-to-h` went **G.12 → H.11**. The `tools`
 *      run is 12 slides long no more; the bridge is its 11th, not its 12th.
 *
 * So the honest count for gh#54, per leader deck, is 55 moved figures: 53 pure
 * LETTER moves (same number, next letter along), plus those 2. gh#53's "every move
 * is a letter" held because that ticket ONLY inserted; do not carry that claim
 * forward without checking which kind of edit is in play. Two figures did not move
 * at all — A.1 and B.1, the rows in FRONT of the insert, which is R2 read from the
 * other end.
 *
 * THE LEADER ROWS MOVED A THIRD TIME ON gh#56, and this one is a PURE INSERT — the
 * gh#53 kind, not the gh#54 kind, so "every move is a letter" holds again and is
 * worth checking against the diff rather than assumed. `invest-own-proof` reached the
 * leader lists alone, the third slide ever to do so, taking both decks to **60** rows
 * and THIRTEEN sections. `invest` claims D, in front of NINE runs — `landscape`,
 * `mindset`, `process`, `fundamentals`, `tools`, `pitfalls`, `meta`, `principles`,
 * `lab` — so:
 *
 *   · 54 figures moved per leader deck, every one of them a LETTER and not a number.
 *     The loop slide prints **H.12** now (E.12 → F.12 → G.12 → H.12, four letters and
 *     its file never opened once), and the closer is **M.3**.
 *   · FOUR figures did not move: A.1, B.1, C.1 and C.2 — the rows in front of the
 *     insert, five rows counting the cover, which prints none. An insert cannot
 *     renumber what precedes it (R2 read from the other end), and f8 staying at C.2
 *     is the half of that worth naming, because gh#54 had just moved it there.
 *   · ONE row was added, and it is the only new label in the file:
 *     `D.1 · PROOF FROM INSIDE THE COMPANY`. §6.7 numbers that slide D.2; it composes
 *     D.1 while `invest-base-rates` (§6.7's D.1) is unbuilt, and both figures are
 *     derived (§3.5), which is why this record and not a comment is where the answer
 *     lives. (That slide was attributed to **#57** here until gh#57 shipped and turned
 *     out to be `invest-chicken-egg`; `invest-base-rates` holds no ticket at all.)
 *
 * THE LEADER ROWS MOVED A FOURTH TIME ON gh#57 — EXCEPT THAT NOT ONE FIGURE DID, and
 * that is the whole of what this paragraph is for. `invest-chicken-egg` reached the
 * leader lists alone, the fourth slide ever to do so, taking both decks to **61** rows.
 * It APPENDED to the `invest` run gh#56 opened rather than opening a run of its own, so
 * it claimed no letter, and:
 *
 *   · ZERO figures moved. Every letter and every number this file records is still
 *     gh#56's: `invest` claims D, the loop slide still prints **H.12**, f8 still prints
 *     **C.2**, `invest-own-proof` still prints **D.1**, and the closer is still **M.3**
 *     across THIRTEEN sections A–M. The three tickets before this one each pushed every
 *     letter behind their insert; this one pushed none, and re-using their sentence
 *     here would have described an event that did not happen.
 *   · ONE row was added, and it is the only new label in the file:
 *     `D.2 · THE DEADLOCK, AND WHO CAN SKIP IT`. §6.7 numbers that slide D.3; it
 *     composes D.2 for the same reason its sibling composes D.1 — `invest-base-rates`
 *     (§6.7's D.1) is unbuilt, a §11 Phase 7 slide with no ticket — and both figures
 *     are derived (§3.5), which is why this record and not a comment is where the
 *     answer lives.
 *   · RE-RECORDING STILL TOOK `ALLOW_MOVED_FIGURES=1`, AND THE REPORT IT PRINTED IS
 *     NOT A LIST OF MOVED FIGURES. `figureDrift` compares `before[i]` against
 *     `after[i]`, and the fixture is an INDEX-KEYED array, so a row inserted at index 6
 *     shifts all 54 numbered rows behind it by one index and every one of them is
 *     reported. The report read `slide 6: recorded E.1, renders D.2`, then `slide 7:
 *     recorded E.2, renders E.1`, and so on to `slide 59: recorded M.3, renders M.2` —
 *     110 lines in all, 54 per leader deck plus the two row-count lines. Read as pairs
 *     it is one statement: what index *i* recorded is now at index *i*+1, unchanged.
 *     THAT IS A DIFFERENT CASE FROM gh#53/gh#54/gh#56, where the reported moves were
 *     real figure changes on rows that did not move — letters throughout for gh#53 and
 *     gh#56, letters plus two renumbers for gh#54. Do not carry any of those three
 *     sentences forward. The flag is genuinely required — the guard cannot tell a
 *     shifted row from a moved figure, and widening it so that it could would blind it
 *     to a real regression that happened to arrive alongside an insert.
 *   · WHAT THE DIFF ITSELF SAYS, which is the check that settles it: `git diff` on the
 *     fixture removes not one `"fig"` and not one `"label"` line. Every removed line is
 *     an `"index"`, and the only added rows are the two `D.2` ones.
 *
 * THE LEADER ROWS MOVED A FIFTH TIME ON gh#60 — a pure insert again, and the
 * SMALLEST one this file has recorded, which is the whole reason it is worth
 * reading. `mandate-enablement` reached the leader lists alone, the fifth slide
 * ever to do so, taking both decks to **62** rows and FOURTEEN sections. But
 * `mandate` lands BEHIND `pitfalls` (§3.6) rather than in front of the curriculum,
 * so it claims K with only THREE runs behind it — `meta`, `principles`, `lab`:
 *
 *   · 11 figures moved per leader deck, every one of them a LETTER and not a
 *     number: `i1`…`i4` from K to L, `j1`…`j4` from L to M, `k1`…`k3` from M to N.
 *     The closer is **N.3**.
 *   · FORTY-NINE figures did not move, which is the number to check the diff
 *     against. The loop slide is still **H.12** — where gh#56 left it, four letters
 *     into a life in which its file has never been opened, and gh#57 did not touch
 *     it either — and every curriculum figure in front of the mandate is untouched.
 *     §4.3's fourteen sections A–N were reached by APPENDING N, not by pushing H,
 *     exactly as §3.6's placement predicted, and this record is where that stops
 *     being a claim.
 *   · ONE row was added, and it is the only new label in the file:
 *     `K.1 · THE ENABLEMENT MODEL`. §6.8 numbers that slide K.1 and it composes as
 *     K.1 — the first Phase 6 leader slide whose spec number and composed number
 *     agree, because `mandate` fills front-to-back and nothing inserts ahead of it.
 *     It is derived all the same (§3.5); the agreement is a coincidence of build
 *     order, not a licence to pin it.
 *
 * ON gh#61 NO FIGURE MOVED AT ALL — the second entry in this list of which that is
 * true, gh#57 being the first, and the two of them are what every leader ticket
 * from here looks like. `mandate-phases-gates` APPENDED to the run gh#60 opened
 * rather than opening one, so it took no letter (K was already claimed) and
 * renumbered nothing (R3 renumbers inside the run that changed, and this row is
 * that run's last). Both leader decks are one row longer at **63**, still FOURTEEN
 * sections, still closing on **N.3**:
 *
 *   · ONE row was added, and it is the only new label in the file:
 *     `K.2 · PHASES AND GATES`, at index 51, between `K.1 · THE ENABLEMENT MODEL`
 *     and `L.1 · THE PROCESS`. §6.8 numbers that slide K.2 and it composes as K.2 —
 *     the second Phase 6 leader slide whose spec number and composed number agree,
 *     for the same reason K.1's did: `mandate` fills front-to-back and nothing
 *     inserts ahead of it. Still derived (§3.5); still not a licence to pin it.
 *   · EVERY OTHER ROW PRINTS WHAT IT PRINTED BEFORE, in all five decks. The loop
 *     slide is still H.12, six tickets into a life in which its file has never been
 *     opened.
 *   · AND THE RE-RECORD STILL NEEDED `ALLOW_MOVED_FIGURES=1`, which is the part to
 *     know before the next ticket reads that override as a warning. gh#60 and gh#61
 *     ship in ONE commit, so the record steps once — from gh#57's 61 rows to these
 *     63 — and `figureDrift` compares the harvest with the record BY DECK INDEX, so
 *     a two-row INSERT reports rows behind it as moved even when none of them
 *     changed what it prints. The report was TWENTY lines: two row-count lines
 *     (`61 slides recorded, 63 rendered`) and nine per leader deck, running
 *     `slide 52: recorded K.3, renders L.1` down to `slide 60: recorded M.3,
 *     renders N.1`. Nine and not eleven, because indices 50 and 51 recorded K.1 and
 *     K.2 for `meta`'s first two rows and now render K.1 and K.2 for the two
 *     `mandate` rows — the same FIGURES on different slides, which the index-keyed
 *     detector cannot see at all. Index-keying is right for what this gate is FOR —
 *     a Phase 3 regression renumbers a row IN PLACE, and matching by label would
 *     wave through a slide that was renamed and renumbered in one edit — but it
 *     cannot tell an insert from a renumber, and only the diff can.
 *   · WHAT THE DIFF SAYS, matched BY LABEL and not by index, because an insert makes
 *     every later row look moved when it is not: three standard decks byte-identical
 *     per key; two leader decks each gaining exactly the two `mandate` rows and
 *     stepping exactly eleven figures, every one of them a LETTER — `K.n → L.n`,
 *     `L.n → M.n`, `M.n → N.n` — with NOT ONE number changed and not one row
 *     removed. gh#53's 54 moves, gh#54's 55 and gh#60's 11 were real; gh#57's and
 *     gh#61's were none at all. Read the diff, every time.
 *
 * ON gh#58 NO FIGURE MOVED EITHER — the third entry in that list, after gh#57 and
 * gh#61, and the same shape as both. `invest-security` APPENDED to the `invest`
 * run behind `invest-chicken-egg`, so it took no letter (D was already claimed)
 * and renumbered nothing. Both leader decks are one row longer at **64**, still
 * FOURTEEN sections, still closing on **N.3**:
 *
 *   · ONE row was added per leader deck, and it is the only new label in the file:
 *     `D.3 · WHERE THE DATA GOES, AND WHAT ANSWERS IT`, at index 7, between
 *     `D.2 · THE DEADLOCK, AND WHO CAN SKIP IT` and `E.1 · FROM RULES TO
 *     REASONING`. §6.7 numbers that slide D.4 and it composes as **D.3**, one
 *     behind — the same reason its two siblings compose one behind their spec
 *     numbers: `invest-base-rates` (§6.7's D.1) is unbuilt and inserts AHEAD of
 *     the whole run when it lands. Derived (§3.5); do not pin it.
 *   · EVERY OTHER ROW PRINTS WHAT IT PRINTED BEFORE, in all five decks. The loop
 *     slide is still H.12, seven tickets in.
 *   · The re-record still needed `ALLOW_MOVED_FIGURES=1`, for gh#57's reason
 *     exactly: `figureDrift` is index-keyed, so the one-row insert at index 7
 *     reports every later leader row as moved. The diff, matched by label, says
 *     none was: no removed row, no changed `fig` or `label` on any pre-existing
 *     row, only `"index"` lines shifting and the two new `D.3` rows arriving.
 *
 * ON gh#59 NO FIGURE MOVED EITHER — the fourth entry in that list, and the same
 * shape as gh#57, gh#61 and gh#58. `invest-subscription` APPENDED to the `invest`
 * run behind `invest-security`, closing it at §6.7's full built length, so it took
 * no letter (D was already claimed) and renumbered nothing. Both leader decks are
 * one row longer at **65** — §11's Phase 6 count, reached — still FOURTEEN
 * sections, still closing on **N.3**:
 *
 *   · ONE row was added per leader deck, and it is the only new label in the file:
 *     `D.4 · FROM INDIVIDUAL SEATS TO A LINE ITEM`, at index 8, between
 *     `D.3 · WHERE THE DATA GOES, AND WHAT ANSWERS IT` and `E.1 · FROM RULES TO
 *     REASONING`. §6.7 numbers that slide D.5 and it composes as **D.4**, one
 *     behind — the same reason all three of its siblings compose one behind their
 *     spec numbers: `invest-base-rates` (§6.7's D.1) is unbuilt and inserts AHEAD
 *     of the whole run when it lands. Derived (§3.5); do not pin it.
 *   · EVERY OTHER ROW PRINTS WHAT IT PRINTED BEFORE, in all five decks. The loop
 *     slide is still H.12, eight tickets in.
 *   · The re-record still needed `ALLOW_MOVED_FIGURES=1`, for gh#57's reason
 *     exactly: the one-row insert at index 8 reports all 114 later leader lines as
 *     moved (two row-count lines plus 56 per deck). The diff, matched by label,
 *     says none was: no removed row, no changed `fig` or `label` on any of the 128
 *     pre-existing leader rows, only `"index"` lines shifting and the two new
 *     `D.4` rows arriving.
 *
 * ON gh#65 ONE FIGURE MOVED, AND IT IS THE FIRST TICKET IN THIS LIST OF WHICH THAT IS
 * TRUE. `gap-hardest-part` reached the leader lists alone, the ninth slide ever to do
 * so, taking both decks to **66** rows — still FOURTEEN sections, still closing on
 * **N.3**. It is neither of the two shapes above it: it did not OPEN a run (gh#53,
 * gh#54, gh#56, gh#60 each did, and each pushed every letter behind it) and it did not
 * APPEND to a run's end (gh#57, gh#61, gh#58, gh#59 each did, and each moved nothing at
 * all). It went in at the HEAD of the `gap` run gh#53 opened, so `gap` kept **B** and
 * R3 renumbered inside that run — which is the one thing an end-append can never do:
 *
 *   · ONE row was added per leader deck, at index 2, between `A.1` and the ladder:
 *     `B.1 · THE HARDEST PART`. §4.3 and §6.1 both number that slide B.1 and it
 *     composes as B.1 — the `gap` run fills from the front, so a head insert lands on
 *     the run's first number. Derived all the same (§3.5); the agreement is a
 *     coincidence of where in the run this slide sits, not a licence to pin it.
 *   · ONE existing row changed, and it is the ONLY changed figure in the file:
 *     `THE CAPABILITY LADDER` went **B.1 → B.2**. It held B.1 while it was the run's
 *     only slide and gives it up the moment §6.1's slide stands in front of it. §6.5
 *     numbers the ladder B.5 and it will print that once Phase 7's three remaining
 *     `gap` slides land between the two — three more numbers this row has yet to hold,
 *     none of which any ticket may pin.
 *   · NO LETTER MOVED ANYWHERE, in any of the five decks, and no row was removed. The
 *     loop slide is still H.12 — nine tickets into a life in which its file has never
 *     been opened — f8 is still C.2, the four `invest` rows are still D.1–D.4, and
 *     `berau`, `gems` and `general` are byte-identical per key.
 *   · The re-record still needed `ALLOW_MOVED_FIGURES=1`, and the report it printed is
 *     the LARGEST in this file's history: **126 lines** — two row-count lines
 *     (`65 slides recorded, 66 rendered`) and 62 per leader deck, running
 *     `slide 3: recorded C.1, renders B.2` down to `slide 64: recorded N.3, renders
 *     N.2`. Read as pairs it is one statement, gh#57's: what index *i* recorded is now
 *     at index *i*+1. Index 2 is absent from it, because it recorded B.1 and renders
 *     B.1 — the same FIGURE on a different SLIDE, which an index-keyed detector cannot
 *     see — and the ladder's real B.1 → B.2 appears in it only as index 3's
 *     `C.1 → B.2`, which is not what happened to any slide. So the report both
 *     overstates and mis-states this ticket, and ONLY the diff matched BY LABEL says
 *     what moved: one label added (`THE HARDEST PART`), one figure changed on a
 *     pre-existing label (`THE CAPABILITY LADDER`), no label dropped, no letter
 *     touched. Read the diff, every time.
 *
 * ON gh#66 ONE FIGURE MOVED AGAIN, the second ticket in this list of which that is
 * true, and the first MID-RUN insert of any of them. `gap-no-sop` reached the leader
 * lists alone, the tenth slide ever to do so, taking both decks to **67** rows — still
 * FOURTEEN sections, still closing on **N.3**. It is a third shape again: it did not
 * OPEN a run, it did not APPEND to one's end, and unlike gh#65 it did not land at a
 * run's HEAD either — it went in BETWEEN `gap-hardest-part` and the ladder, so `gap`
 * kept **B** and R3 renumbered only behind the new row, inside that run:
 *
 *   · ONE row was added per leader deck, at index 3, between `B.1 · THE HARDEST PART`
 *     and the ladder: `B.2 · THE RULE NOBODY WROTE`. §4.3 and §6.2 both number that
 *     slide B.2 and it composes as B.2 — the `gap` run is filled from the front as far
 *     as this row, so the spec number and the composed number happen to agree. Derived
 *     all the same (§3.5); the agreement is a coincidence of where in the run this
 *     slide sits, not a licence to pin it, and the two unbuilt §6.3/§6.4 slides land
 *     BEHIND it, so it keeps B.2 when they do.
 *   · ONE existing row changed, and it is the ONLY changed figure in the file:
 *     `THE CAPABILITY LADDER` went **B.2 → B.3**. It held B.1 until gh#65 and B.2
 *     until this ticket. §6.5 numbers the ladder B.5 and it will print that once the
 *     two remaining `gap` slides land in front of it — two more numbers this row has
 *     yet to hold, neither of which any ticket may pin.
 *   · NO LETTER MOVED ANYWHERE, in any of the five decks, and no row was removed. The
 *     loop slide is still H.12 — ten tickets into a life in which its file has never
 *     been opened — f8 is still C.2, the four `invest` rows are still D.1–D.4, and
 *     `berau`, `gems` and `general` are byte-identical per key.
 *   · The re-record still needed `ALLOW_MOVED_FIGURES=1`, and the report it printed is
 *     the same size as gh#65's: **126 lines** — two row-count lines
 *     (`66 slides recorded, 67 rendered`) and 62 per leader deck, running
 *     `slide 4: recorded C.1, renders B.3` down to `slide 65: recorded N.3, renders
 *     N.2`. Read as pairs it is one statement, gh#57's: what index *i* recorded is now
 *     at index *i*+1. Index 3 is absent from it, because it recorded B.2 and renders
 *     B.2 — the same FIGURE on a different SLIDE, which an index-keyed detector cannot
 *     see — and the ladder's real B.2 → B.3 appears in it only as index 4's
 *     `C.1 → B.3`, which is not what happened to any slide. So the report both
 *     overstates and mis-states this ticket too, and ONLY the diff matched BY LABEL
 *     says what moved: one label added (`THE RULE NOBODY WROTE`), one figure changed
 *     on a pre-existing label (`THE CAPABILITY LADDER`), no label dropped, no letter
 *     touched. Read the diff, every time.
 *
 * ON gh#67 ONE FIGURE MOVED AGAIN, the third ticket in this list of which that is true
 * and the FIRST to add TWO rows at once. `gap-three-failures` and `gap-the-pattern`
 * reached the leader lists together — the eleventh and twelfth slides ever to reach
 * them alone — taking both decks to **69** rows and CLOSING the `gap` run at §4.3's
 * five. Still FOURTEEN sections, still closing on **N.3**. It is gh#66's shape at two
 * rows rather than one: both land BETWEEN `gap-no-sop` and the ladder, so `gap` kept
 * **B** and R3 renumbered only behind them, inside that run:
 *
 *   · TWO rows were added per leader deck, at indices 4 and 5, between
 *     `B.2 · THE RULE NOBODY WROTE` and the ladder: `B.3 · THREE THINGS WE GOT WRONG`
 *     and `B.4 · THE PATTERN`. §4.3/§6.3 number the first B.3 and §4.3/§6.4 number the
 *     second B.4, and they compose as B.3 and B.4 — the `gap` run is now filled
 *     front-to-back with no hole, so every spec number in it agrees with its composed
 *     number for the first time. Derived all the same (§3.5); the agreement is what a
 *     COMPLETE run looks like, not a licence to pin one.
 *   · ONE existing row changed, and it is the ONLY changed figure in the file:
 *     `THE CAPABILITY LADDER` went **B.3 → B.5**. It held B.1 until gh#65, B.2 until
 *     gh#66 and B.3 until this ticket, and B.5 is §6.5's own number — the LAST it will
 *     ever hold, because §4.3 asks for no sixth `gap` slide. TWO rows added and ONE
 *     figure changed is not a coincidence: the ladder is the only row behind the
 *     insert inside that run, so the row count of a mid-run insert and the count of
 *     figures it moves are independent.
 *   · NO LETTER MOVED ANYWHERE, in any of the five decks, and no row was removed. The
 *     loop slide is still H.12 — eleven tickets into a life in which its file has
 *     never been opened — f8 is still C.2, the four `invest` rows are still D.1–D.4,
 *     and `berau`, `gems` and `general` are byte-identical per key.
 *   · The re-record still needed `ALLOW_MOVED_FIGURES=1`, and the report is the same
 *     size as gh#65's and gh#66's — **126 lines**, which is the point worth taking
 *     from it: two row-count lines (`67 slides recorded, 69 rendered`) and 62 per
 *     leader deck, running `slide 5: recorded C.1, renders B.4` down to `slide 66:
 *     recorded N.3, renders N.1`. A TWO-row insert produced no more lines than a
 *     one-row insert did, because the report is index-keyed and saturates: every row
 *     behind the insert is listed once whatever the offset. Read as pairs it is one
 *     statement, gh#57's, with the offset now TWO: what index *i* recorded is at
 *     index *i*+2. Indices 2, 3 and 4 are absent from it — 2 and 3 recorded B.1/B.2
 *     and render B.1/B.2, and 4 recorded the ladder's B.3 and renders THREE THINGS WE
 *     GOT WRONG's B.3, the same FIGURE on a different SLIDE, which an index-keyed
 *     detector cannot see. The ladder's real B.3 → B.5 never appears in the report at
 *     all. So ONLY the diff matched BY LABEL says what moved: two labels added
 *     (`THREE THINGS WE GOT WRONG`, `THE PATTERN`), one figure changed on a
 *     pre-existing label (`THE CAPABILITY LADDER`), no label dropped, no letter
 *     touched. Read the diff, every time.
 *
 * ON gh#68 NO FIGURE MOVED AT ALL — the FIFTH entry in that list, after gh#57, gh#61,
 * gh#58 and gh#59, and the first of them to land in `shape`. `shape-middle-out`
 * reached the leader lists alone — the
 * thirteenth slide ever to do so — taking both decks to **70** rows. Still FOURTEEN
 * sections, still closing on **N.3**. It is gh#57's shape and not a fourth one, and
 * the cheapest edit there is: a TAIL APPEND, onto the end of the `shape` run gh#54
 * opened. It did not
 * open a run, so no letter moved; and unlike gh#65's head insert and gh#66's and
 * gh#67's mid-run ones it had no row BEHIND it inside its own run, so R3 had nothing
 * to renumber and no number moved either:
 *
 *   · ONE row was added per leader deck, at index 9, behind `C.2 · YOUR AGENTIC OS`:
 *     `C.3 · MIDDLE-OUT`. §4.3 numbers that slide C.4 and it composed as **C.3**,
 *     because `shape-tam-kotter` (§4.3's C.3) was unbuilt then and inserted AHEAD of it
 *     later —
 *     the same one-early arithmetic the four `invest` rows lived with from
 *     gh#56 until gh#70. Derived per deck (§3.5). NOTHING PINNED EITHER VALUE: this
 *     entry said the slide "will hold C.4 the day the missing row lands", and gh#71 is
 *     the day — see that entry below. It is the whole reason no ticket
 *     may write a `shape` figure into a source file.
 *   · ZERO existing rows changed. Not one figure in any of the five decks. gh#65,
 *     gh#66 and gh#67 each moved exactly one (`THE CAPABILITY LADDER`, three times);
 *     this ticket moved none, which is what "append to a run's tail" means arithmetically
 *     and is the reason this entry has no second bullet like theirs.
 *   · NO LETTER MOVED ANYWHERE, in any of the five decks, and no row was removed. The
 *     loop slide is still H.12 — twelve tickets into a life in which its file has
 *     never been opened — f8 is still C.2, the ladder is still B.5, the four `invest`
 *     rows are still D.1–D.4, and `berau`, `gems` and `general` are byte-identical
 *     per key (5588 / 5575 / 5404 bytes, unchanged).
 *   · THE RE-RECORD STILL NEEDED `ALLOW_MOVED_FIGURES=1` — ON A TICKET THAT MOVED NO
 *     FIGURE. That is the sharpest demonstration this file has of why the report is
 *     not the diff: the guard is INDEX-KEYED, so it read **122 figure number(s)
 *     moved** where the honest answer is zero. The report is 122 lines — two
 *     row-count lines (`69 slides recorded, 70 rendered`) and 60 per leader deck,
 *     running `slide 9: recorded D.1, renders C.3` down to `slide 68: recorded N.3,
 *     renders N.2`. It is SHORTER than gh#65's, gh#66's and gh#67's 126 lines only
 *     because this insert sits at index 9 rather than index 2–5, and every one of its
 *     122 lines is noise: read as pairs it is gh#57's one statement, that what index
 *     *i* recorded is at index *i*+1. Matched BY LABEL the diff is two lines total:
 *     one label added per leader deck (`MIDDLE-OUT`), no figure changed on any
 *     pre-existing label, no label dropped, no letter touched. Read the diff, every
 *     time — and on this ticket read it INSTEAD of the report, not after it.
 *
 * ON gh#69 NO FIGURE MOVED EITHER — the SIXTH entry in that list, after gh#57, gh#61,
 * gh#58, gh#59 and gh#68, and the same shape as all five: an APPEND at a run's END.
 * `mandate-levers` reached the leader lists alone, the fourteenth slide ever to do so,
 * taking both decks to **71** rows and CLOSING the `mandate` run at §6.8's three. It
 * took no letter (K has been claimed since gh#60) and renumbered nothing (R3 renumbers
 * only inside the run that changed, and this row is that run's LAST). Still FOURTEEN
 * sections, still closing on **N.3**:
 *
 *   · ONE row was added per leader deck, and it is the only new label in the file:
 *     `K.3 · THE FOUR LEVERS`, at index 59, between `K.2 · PHASES AND GATES` and
 *     `L.1 · THE PROCESS`. §6.8 numbers that slide K.3 and it composes as K.3 — the
 *     third `mandate` row whose spec number and composed number agree, for the reason
 *     K.1's and K.2's did: `mandate` fills front-to-back and nothing inserts ahead of
 *     it. The run being COMPLETE is what freezes that agreement, not a licence to pin
 *     it; it is still derived (§3.5).
 *   · EVERY OTHER ROW PRINTS WHAT IT PRINTED BEFORE, in all five decks — checked
 *     offset-aware, `head[i]` against `new[i]` up to index 58 and against `new[i+1]`
 *     from 59 on: 70 pre-existing rows per leader deck, ZERO with a changed `fig` or
 *     `label`, none removed. The loop slide is still H.12, thirteen tickets into a life
 *     in which its file has never been opened, f8 is still C.2, `C.3 · MIDDLE-OUT` is
 *     where gh#68 left it, the four `invest` rows
 *     are still D.1–D.4, the five `gap` rows still B.1–B.5, and `berau`, `gems` and
 *     `general` are byte-identical per key (4931 / 4919 / 4765 bytes of
 *     `JSON.stringify(deck, null, 2)`, unchanged since gh#67 — the entry above
 *     measures the same three decks with the file's own indentation, which is the
 *     whole of why its numbers are the larger ones).
 *   · The re-record still needed `ALLOW_MOVED_FIGURES=1`, for gh#57's reason exactly —
 *     and THE REPORT IS THE SMALLEST THIS FILE HAS RECORDED, which is the detail worth
 *     taking from it. **24 lines**: two row-count lines (`70 slides recorded, 71
 *     rendered`) and ELEVEN per leader deck, running `slide 59: recorded L.1, renders
 *     K.3` down to `slide 69: recorded N.3, renders N.2`. gh#65, gh#66 and gh#67 each
 *     printed 126 because their insert was at index 2–5 and every row behind it shifted,
 *     and gh#68 printed 122 from index 9;
 *     this one lands at index 59 with only `meta`, `principles` and `lab` behind it, so
 *     the index-keyed detector has just eleven rows to mis-report. The line count tracks
 *     WHERE the insert lands and nothing else — not the size of the change and not its
 *     risk.
 *   · WHAT THE DIFF SAYS, matched by LABEL and by ordered `(fig, label)` pair: all 70
 *     pre-existing pairs survive IN ORDER, exactly one new pair appears
 *     (`K.3 · THE FOUR LEVERS`), no pair is dropped and no `fig` changes. (A
 *     label-keyed check alone mis-reports `THE TRAP` as `J.1 → G.1`: that label is
 *     carried by TWO slides, `d1-the-trap` at G.1 and `h1-pitfall-wall` at J.1, and a
 *     label→fig map keeps whichever it saw last. Both rows are unchanged. Labels are
 *     not unique; match on the PAIR, in order.)
 *
 * ON gh#70 FOUR FIGURES MOVED, AND EVERY ONE OF THEM IS A NUMBER — the most this file
 * has ever recorded for one ticket, by four times. It is the FOURTH entry here to move
 * a figure without opening a run, after gh#65, gh#66 and gh#67; gh#68 and gh#69 sit
 * between them and moved none at all. It is also the SECOND HEAD-OF-RUN INSERT,
 * gh#65 being the first and there being no third. `invest-base-rates` reached the
 * leader lists alone, the FIFTEENTH slide ever to do so, taking both decks to **72**
 * rows and CLOSING the `invest` run at §6.7's five — the THIRD of the four leader-only
 * runs to be complete, after `gap` (gh#67) and `mandate` (gh#69). Still FOURTEEN
 * sections, still closing on **N.3**. It went in at the HEAD of the `invest` run gh#56
 * opened, so `invest` kept **D** and R3 renumbered every row behind it inside that run:
 *
 *   · ONE row was added per leader deck, at index 10, between `C.3 · MIDDLE-OUT` — the
 *     row gh#68 appended two tickets earlier, and NOT `C.2 · YOUR AGENTIC OS`, which is
 *     what sat there until that ticket landed — and `D.2 · PROOF FROM INSIDE THE
 *     COMPANY`: `D.1 · THE BASE RATE, AND THE DEFAULT IT PRICES`. §6.7 numbers that
 *     slide D.1 and it composes as D.1, and FOR THE FIRST TIME SINCE gh#56 OPENED THIS
 *     RUN every slide in it prints its own spec number — D.1 through D.5, filled
 *     front-to-back with no hole, exactly as gh#67 left `gap` and gh#69 left `mandate`.
 *     Derived all the same (§3.5); the agreement is what a COMPLETE run looks like, not
 *     a licence to pin one.
 *   · FOUR existing rows changed, and all four are NUMBERS: `PROOF FROM INSIDE THE
 *     COMPANY` **D.1 → D.2**, `THE DEADLOCK, AND WHO CAN SKIP IT` **D.2 → D.3**, `WHERE
 *     THE DATA GOES, AND WHAT ANSWERS IT` **D.3 → D.4**, and `FROM INDIVIDUAL SEATS TO A
 *     LINE ITEM` **D.4 → D.5**. Each had composed one number EARLIER than §6.7 gave it
 *     for as long as D.1 was unbuilt, which is what the entries above predicted in as
 *     many words; this is the record of that prediction coming due. THE COUNT IS
 *     STRUCTURAL AND NOT NOTABLE: a head insert moves every row behind it inside its own
 *     run, `gap` held ONE such row when gh#65 landed and `invest` held FOUR. Not one of
 *     those four files was opened to change a rendered string. (gh#53's 54 moves, gh#56's
 *     54 and gh#60's 11 were LETTERS; gh#54's two took a letter with them; gh#65, gh#66
 *     and gh#67 moved one number each, and gh#68 and gh#69 moved none. Four pure number
 *     moves has no precedent here.)
 *   · NO LETTER MOVED ANYWHERE, in any of the five decks, and no row was removed.
 *     `invest` has held D since gh#56, and a row at the FRONT of a run neither opens a
 *     run nor closes one. The loop slide is still H.12 at index 42 — fourteen tickets
 *     into a life in which its file has never been opened — f8 is still C.2 at index 8,
 *     the ladder is still B.5 at index 6, gh#68's `C.3 · MIDDLE-OUT` is still C.3 at
 *     index 9, gh#69's `K.3 · THE FOUR LEVERS` is still K.3 (index 59 → 60, its FIGURE
 *     untouched), the closer is still N.3 at index 71 across FOURTEEN sections, and
 *     `berau`, `gems` and `general` are byte-identical per key (4931 / 4919 / 4765
 *     bytes of `JSON.stringify(deck, null, 2)`, unchanged since gh#67).
 *   · The re-record still needed `ALLOW_MOVED_FIGURES=1`, and the report it printed is
 *     **116 lines** — SHORTER than the 126 this file records for gh#65, gh#66 and gh#67
 *     AND shorter than gh#68's 122, on the ticket that moved MORE figures than gh#65,
 *     gh#66, gh#67, gh#68 and gh#69 put together (four against three). That
 *     is the sharpest available proof of what the report's length actually measures: how
 *     DEEP in the deck the insert landed, and how many indices behind it happen to keep
 *     their recorded figure. It measures nothing about how many figures moved — gh#68
 *     printed SIX MORE LINES than this ticket for ZERO moved figures, one index
 *     shallower, and gh#69 printed 24 for zero from index 59. Two
 *     row-count lines (`71 slides recorded, 72 rendered`) and 57 per leader deck, running
 *     `slide 14: recorded E.1, renders D.5` down to `slide 70: recorded N.3, renders
 *     N.2`. Read as pairs it is one statement, gh#57's: what index *i* recorded is now at
 *     index *i*+1.
 *
 *     INDICES 10, 11, 12 AND 13 ARE ABSENT FROM IT, and so are 0–9 and 71. The four
 *     recorded D.1, D.2, D.3 and D.4 and still render D.1, D.2, D.3 and D.4 — the same
 *     FOUR FIGURES on four different SLIDES, which an index-keyed detector cannot see,
 *     and four is the most this file has ever had to say that about. Indices 0–9 are
 *     absent for R2's reason read from the other end: an insert cannot renumber what
 *     precedes it, and index 9 is gh#68's row, one slot in front of this one and
 *     untouched by it. Index 71 is absent for a third reason — the record held no row
 *     there when the comparison ran, the deck being one row longer than the record, so
 *     there was nothing to compare it with.
 *
 *     SO NOT ONE OF THIS TICKET'S FOUR REAL MOVES APPEARS IN THE REPORT AT ALL, which is
 *     gh#67's finding at four times the size: `D.1 → D.2` and its three siblings are
 *     nowhere in those 116 lines, and the nearest thing to any of them is index 14's
 *     `E.1 → D.5`, which is not what happened to any slide. The report OVERSTATES this
 *     ticket — 57 lines per deck for four moved figures — and MIS-STATES it, because not
 *     one of those 57 lines is one of the four. ONLY the diff matched BY LABEL and by
 *     ordered `(fig, label)` pair says what moved: one label added per leader deck
 *     (`THE BASE RATE, AND THE DEFAULT IT PRICES`, at index 10), FOUR figures
 *     changed on pre-existing labels, no label dropped, no letter touched, and the three
 *     standard decks byte-identical per key. Measured that way the whole diff is TEN
 *     lines: 2 added, 8 changed, 0 removed, 0 letters. (Match on the PAIR, in order, for
 *     gh#69's reason — `THE TRAP` is carried by two slides and index 0 carries a null
 *     label, so a label→fig map answers the wrong question.) Read the diff, every time.
 *
 * ON gh#71 ONE FIGURE MOVED, AND IT IS A NUMBER — the FIFTH entry here to move a figure
 * without opening a run, after gh#65, gh#66, gh#67 and gh#70, and the THIRD MID-RUN
 * insert, after gh#66's and gh#67's. `shape-tam-kotter` reached the leader lists alone,
 * the SIXTEENTH slide ever to do so, taking both decks to **73** rows and CLOSING the
 * `shape` run at §4.3's four — the FOURTH and LAST of the leader-only runs to be
 * complete, after `gap` (gh#67), `mandate` (gh#69) and `invest` (gh#70). §4.3's finished
 * leader deck, reached. Still FOURTEEN sections, still closing on **N.3**. It went in
 * BETWEEN the relocated f8 and the row gh#68 appended, so `shape` kept **C** and R3
 * renumbered only behind the new row, inside that run:
 *
 *   · ONE row was added per leader deck, at index 9, between `C.2 · YOUR AGENTIC OS` and
 *     the row gh#68 appended: `C.3 · ADOPTION FRAMEWORKS`. §4.3 and §6.6 both number that
 *     slide C.3 and it composes as C.3 — the `shape` run is now filled front-to-back with
 *     no hole, so every spec number in it agrees with its composed number, which is what a
 *     COMPLETE run looks like and not a licence to pin one. Derived (§3.5).
 *   · ONE existing row changed, and it is the ONLY changed figure in the file:
 *     `MIDDLE-OUT` went **C.3 → C.4**. It held C.3 from gh#68 until this ticket, and C.4
 *     is §4.3's own number for it — the LAST it will ever hold, because §4.3 asks for no
 *     fifth `shape` slide. NOT ONE BYTE of `shape-middle-out.tsx`, its geometry, its walk
 *     or its content module changed to make that happen; the only edits to that slide's
 *     files were comment lines this ticket made false. That is §3.5's whole claim,
 *     demonstrated on the one row it was written for.
 *   · NO LETTER MOVED ANYWHERE, in any of the five decks, and no row was removed. All
 *     fourteen letters A–N are the same set before and after. The loop slide is still
 *     H.12 — fifteen tickets into a life in which its file has never been opened, index
 *     42 → 43 — f8 is still C.2 at index 8, the ladder still B.5 at index 6, the five
 *     `invest` rows still D.1–D.5, gh#69's `K.3 · THE FOUR LEVERS` still K.3 (index
 *     60 → 61, its FIGURE untouched), the closer still N.3 at index 72, and `berau`,
 *     `gems` and `general` are byte-identical per key — 4914 / 4902 / 4749 bytes of
 *     `JSON.stringify(deck, null, 2)`, verified equal STRING-FOR-STRING and not merely
 *     equal in length. (Those three numbers are measured, and they are not the
 *     4931 / 4919 / 4765 the gh#69 and gh#70 entries above quote for the same three
 *     decks; that trio does not reproduce at any commit from gh#67 on. What this ticket
 *     verified is the comparison, which is the load-bearing half — the byte counts are
 *     a fingerprint printed beside it.)
 *   · The re-record still needed `ALLOW_MOVED_FIGURES=1`, and the report is **126 lines**
 *     — the same size as gh#65's, gh#66's and gh#67's, for the same reason and not for
 *     theirs: two row-count lines (`72 slides recorded, 73 rendered`) and 63 per leader
 *     deck, running `slide 10: recorded D.1, renders C.4` down to `slide 71: recorded
 *     N.3, renders N.2`. It SATURATES again — every row behind index 9 is listed once —
 *     and every one of those 126 lines is noise: read as pairs it is gh#57's one
 *     statement, that what index *i* recorded is at index *i*+1. Index 9 is absent from
 *     it, because it recorded gh#68's C.3 and renders this slide's C.3 — the same FIGURE
 *     on a different SLIDE, which an index-keyed detector cannot see — and the real
 *     C.3 → C.4 appears only as index 10's `D.1 → C.4`, which is not what happened to any
 *     slide. So ONLY the diff matched BY LABEL and by ordered `(fig, label)` pair says
 *     what moved: one label added per leader deck (`ADOPTION FRAMEWORKS`), ONE figure
 *     changed on a pre-existing label (`MIDDLE-OUT`), no label dropped, no letter
 *     touched, and all 72 pre-existing rows surviving IN ORDER offset-aware with that one
 *     exception. Read the diff, every time.
 *
 * `berau`, `gems` and `general` are byte-identical to the previous record, through
 * all fifteen tickets — sixteen leader-only slides now, since gh#67 brought two.
 * That
 * is the assertion worth reading twice: a leader-only
 * insert must not be able to touch a standard deck, and gh#54's relocation could
 * not either — f8 moved because a LEADER LIST moved it, and the standard list was
 * not edited. The fixture is where either failure would show.
 *
 * Keyed by `string` because the key set is not available as a type: which decks
 * exist is a VALUE (`VARIANTS[id].deckSet`), and deriving the non-standard subset
 * would take literal `deckSet` types in the Edge-shared variant table — see
 * `DeckKey`. The parity test below stands in for that exhaustiveness: an
 * unharvested deck, or an unrecorded one, fails there by name.
 */
const OBSERVED: Record<string, ObservedDeck> = {
  berau: { slides: 65, closer: "K.3" },
  gems: { slides: 65, closer: "K.3" },
  general: { slides: 63, closer: "K.1" },
  // 73 → 74 → 72: `gap-failures-pattern` composed behind its two parents for the merge
  // review (74, ladder B.5 → B.6), then REPLACED both when the triptych won (72, ladder
  // B.6 → B.4). §6.4 has no content of its own — it is the SHAPE of §6.3 — so `gap` now
  // carries §4.3's five sections in four rows. ONE figure moved per leader deck on each
  // of those two re-records, so both took `ALLOW_MOVED_FIGURES=1`; the standard rows did
  // not move, as ever, and the CLOSER did not move either — a `gap` edit renumbers inside
  // `gap` and nothing else (§3.5 R3), which is the whole reason this file is the artifact
  // that proves it.
  "berau-leader": { slides: 72, closer: "N.3" },
  "gems-leader": { slides: 72, closer: "N.3" },
};

/** The expectations for one deck, or a failure naming the deck that has none. */
function observed(key: DeckKey): ObservedDeck {
  const row = OBSERVED[key];
  if (!row) throw new Error(`no observed slide count or closer recorded for deck "${key}"`);
  return row;
}

let harvested: DeckNumbering;

beforeAll(async () => {
  harvested = await harvestAllDecks();
  if (UPDATING) recordFixture(harvested);
}, 300_000);

afterAll(restoreLocation);

function readFixture(): DeckNumbering {
  try {
    return JSON.parse(readFileSync(FIXTURE, "utf8")) as DeckNumbering;
  } catch (err) {
    throw new Error(
      `could not read ${FIXTURE} — record it with \`npm run harvest:numbering\`. Cause: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
}

/** Every figure number, or row count, this harvest changes against the record.
 *  Empty when there is no record yet — the first harvest IS the record. */
function figureDrift(decks: DeckNumbering): string[] {
  let recorded: DeckNumbering;
  try {
    recorded = JSON.parse(readFileSync(FIXTURE, "utf8")) as DeckNumbering;
  } catch {
    return [];
  }

  // A recorded deck that is no longer harvested IS drift, and the worst kind: its
  // rows leave the file, so every figure it recorded stops being checked and
  // nothing else here would notice. A re-key — `berau` becoming
  // `berau-middle-mgmt` — looks exactly like this plus one "new" deck.
  const dropped = Object.keys(recorded)
    .filter((key) => !(key in decks))
    .map((key) => `${key}: ${recorded[key].length} slides recorded, deck no longer harvested`);

  return dropped.concat(
    Object.keys(decks).flatMap((key) => {
      const before = recorded[key];
    // A deck the record does not hold yet is NEW, not drifted — gh#41 added the
    // two leader decks this way. There is no recorded figure for it to have
    // moved, and refusing to record it would force `ALLOW_MOVED_FIGURES=1`, which
    // would also wave through a real regression in the decks that ARE recorded.
      // Safe only because a dropped key is caught above: "new" cannot be how a
      // moved figure sneaks in, because the row it moved from cannot vanish
      // unnoticed.
      if (!before) return [];

      const after = decks[key];
      const drift =
        before.length === after.length
          ? []
          : [`${key}: ${before.length} slides recorded, ${after.length} rendered`];
      return after.reduce((found, row, i) => {
        const was = before[i];
        if (was && was.fig !== row.fig) {
          found.push(`${key} slide ${i}: recorded ${was.fig}, renders ${row.fig}`);
        }
        return found;
      }, drift);
    }),
  );
}

/**
 * Re-records the fixture — refusing, by default, to absorb a MOVED FIGURE NUMBER.
 *
 * Re-recording is the remedy this file points at when the gate fails, which
 * makes it also the way a genuine Phase 3 regression could be laundered into a
 * green suite: overwrite the record and every assertion below passes against
 * the very output that broke it. Labels are copy and drift legitimately; the
 * figure numbers ARE what Phase 3 has to prove it did not move, so moving one
 * takes a person saying so out loud:
 *
 *     ALLOW_MOVED_FIGURES=1 npm run harvest:numbering
 */
function recordFixture(decks: DeckNumbering): void {
  const drift = figureDrift(decks);
  if (drift.length > 0 && !ALLOW_MOVED_FIGURES) {
    throw new Error(
      [
        `refusing to re-record: ${drift.length} figure number(s) moved.`,
        ...drift.map((d) => `  · ${d}`),
        "This is what Phase 3 must NOT do — fix the deck. If the move is genuinely",
        "intended, re-record with ALLOW_MOVED_FIGURES=1 npm run harvest:numbering.",
      ].join("\n"),
    );
  }
  writeFileSync(FIXTURE, `${JSON.stringify(decks, null, 2)}\n`, "utf8");
}

// ── The gate ─────────────────────────────────────────────────────────────────

/** Printed with the diff, because the diff alone does not say which of the two
 *  causes is in play — and they call for opposite responses. */
const STALE = [
  "the committed numbering record no longer matches what the decks render.",
  "  · a MOVED FIGURE NUMBER is a Phase 3 regression — fix the deck, not the fixture.",
  "  · a CHANGED LABEL from an intentional copy rewrite is legitimate —",
  "    re-record it with `npm run harvest:numbering`.",
].join("\n");

test("the committed fixture is what the decks render today", () => {
  // The whole ticket in one assertion. Every check below it narrows a failure
  // here to a cause; none of them can pass while this one fails.
  expect(harvested, STALE).toEqual(readFixture());
});

// ── Every deck the app serves is in the record, once ─────────────────────────

// THE KEYING RULE (see `DeckKey`): a brand name means that brand's standard deck,
// a variant id means a non-standard one. Asserted against `VARIANTS` rather than
// against a list, so a sixth variant is harvested — or reported unharvested —
// without anyone remembering to update this file.
const EXPECTED_KEYS = (Object.keys(VARIANTS) as VariantId[])
  .map((id) => (VARIANTS[id].deckSet === "standard" ? VARIANTS[id].brand : id))
  .sort();

test("the fixture records every deck the app serves, and nothing else", () => {
  expect(Object.keys(readFixture()).sort()).toEqual(EXPECTED_KEYS);
  expect(HARVEST_TARGETS.map((t) => t.key).sort()).toEqual(EXPECTED_KEYS);
  // Every brand still composes a standard deck, so the brand keys are `BRANDS`
  // itself — the leader keys are the addition, not a re-keying.
  expect([...HARVESTED_BRANDS].sort()).toEqual(Object.keys(BRANDS).sort());
});

test("every recorded deck has an observed slide count and closer to hit", () => {
  expect(Object.keys(OBSERVED).sort()).toEqual(EXPECTED_KEYS);
});

// ── What the record has to say, deck by deck ─────────────────────────────────

describe.each(HARVEST_TARGETS)("$key's recorded deck", ({ key }) => {
  let rows: NumberingRow[];

  beforeAll(() => {
    rows = harvested[key];
  });

  test(`holds one row per slide — ${observed(key).slides} of them`, () => {
    expect(rows).toHaveLength(observed(key).slides);
  });

  test("keys rows by deck index, in deck order, with no gaps", () => {
    expect(rows.map((r) => r.index)).toEqual(rows.map((_, i) => i));
  });

  test("carries a printed figure and a label on every row, or null on both", () => {
    rows.forEach((row) => {
      const at = `${key} slide ${row.index}`;
      if (row.fig === null) {
        expect(row.label, at).toBeNull();
        return;
      }
      // `"E.11"` — the letter and number exactly as printed, never a re-typed
      // section tag or a bare number. See `FIG_PATTERN` for why the letter bound
      // is derived rather than typed.
      expect(row.fig, at).toMatch(FIG_PATTERN);
      expect(typeof row.label, at).toBe("string");
      expect(row.label, at).not.toBe("");
    });
  });

  test("records the cover as printing no figure label", () => {
    expect(rows[0]).toEqual({ index: 0, fig: null, label: null });
  });

  test(`closes on ${observed(key).closer}`, () => {
    expect(rows.at(-1)?.fig).toBe(observed(key).closer);
  });

  test("prints each figure number once — no two slides claim the same one", () => {
    const printed = rows.map((r) => r.fig).filter((fig): fig is string => fig !== null);
    expect([...new Set(printed)]).toEqual(printed);
  });
});
