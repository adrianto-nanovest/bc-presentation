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
 * gh#56 is the payoff — a thirteenth section, `M` on screen, no edit to this line.
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
 * `berau`, `gems` and `general` are byte-identical to the previous record, through
 * all four tickets. That is the assertion worth reading twice: a leader-only insert
 * must not be able to touch a standard deck, and gh#54's relocation could not
 * either — f8 moved because a LEADER LIST moved it, and the standard list was not
 * edited. The fixture is where either failure would show.
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
  "berau-leader": { slides: 61, closer: "M.3" },
  "gems-leader": { slides: 61, closer: "M.3" },
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
