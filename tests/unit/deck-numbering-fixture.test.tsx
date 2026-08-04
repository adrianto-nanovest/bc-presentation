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

const FIXTURE = path.resolve(__dirname, "../fixtures/deck-numbering.json");

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
 * The leader decks (gh#41) are 8 slides shorter — `f1`–`f7` and `f9` cut,
 * `f8-your-agentic-os` kept — and close on **J.3**, not K.3: the same three lab
 * slides, one letter earlier because section F is gone. Nothing renumbered them;
 * a letter is a function of position (§3.4 R2).
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
  "berau-leader": { slides: 57, closer: "J.3" },
  "gems-leader": { slides: 57, closer: "J.3" },
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
      // section tag or a bare number.
      expect(row.fig, at).toMatch(/^[A-K]\.\d+$/);
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
