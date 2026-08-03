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
  HARVESTED_BRANDS,
  restoreLocation,
  type DeckNumbering,
  type NumberingRow,
} from "../harvest/deck-numbering";
import { BRANDS, type Brand } from "@/deck-variants";

const FIXTURE = path.resolve(__dirname, "../fixtures/deck-numbering.json");

/** Set by `npm run harvest:numbering`. Rewrites the fixture from the harvest
 *  before the assertions below run against it. */
const UPDATING = process.env.UPDATE_DECK_NUMBERING === "1";

/** Set by `ALLOW_MOVED_FIGURES=1 npm run harvest:numbering` — see `recordFixture`. */
const ALLOW_MOVED_FIGURES = process.env.ALLOW_MOVED_FIGURES === "1";

/** The slide counts observed live and recorded on gh#32 — the same figures
 *  `tests/unit/deck-registry.test.ts` composes to. Repeated here as a number
 *  the harvest must hit, so a deck that silently loses a slide fails LOUDLY
 *  instead of quietly rewriting the fixture one row shorter. */
const OBSERVED_SLIDES: Record<Brand, number> = {
  berau: 64,
  gems: 64,
  general: 62,
};

/** The closer each brand prints today. `general` runs no Practice Lab, so its
 *  K run is the closer alone and it renumbers itself to K.1. That used to be a
 *  `FIG_NUM` hack inside `k3-thank-you.tsx`, reading the brand's `practiceLab`
 *  flag; gh#35 deleted it and the K.1 below is now the composer's own output. */
const OBSERVED_CLOSER: Record<Brand, string> = {
  berau: "K.3",
  gems: "K.3",
  general: "K.1",
};

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

  return (Object.keys(decks) as Brand[]).flatMap((brand) => {
    const before = recorded[brand] ?? [];
    const after = decks[brand];
    const drift =
      before.length === after.length
        ? []
        : [`${brand}: ${before.length} slides recorded, ${after.length} rendered`];
    return after.reduce((found, row, i) => {
      const was = before[i];
      if (was && was.fig !== row.fig) {
        found.push(`${brand} slide ${i}: recorded ${was.fig}, renders ${row.fig}`);
      }
      return found;
    }, drift);
  });
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

test("the fixture records every brand that composes a deck", () => {
  expect(Object.keys(readFixture()).sort()).toEqual([...HARVESTED_BRANDS].sort());
  expect([...HARVESTED_BRANDS].sort()).toEqual(Object.keys(BRANDS).sort());
});

// ── What the record has to say, brand by brand ───────────────────────────────

describe.each(HARVESTED_BRANDS)("%s's recorded deck", (brand) => {
  let rows: NumberingRow[];

  beforeAll(() => {
    rows = harvested[brand];
  });

  test(`holds one row per slide — ${OBSERVED_SLIDES[brand]} of them`, () => {
    expect(rows).toHaveLength(OBSERVED_SLIDES[brand]);
  });

  test("keys rows by deck index, in deck order, with no gaps", () => {
    expect(rows.map((r) => r.index)).toEqual(rows.map((_, i) => i));
  });

  test("carries a printed figure and a label on every row, or null on both", () => {
    rows.forEach((row) => {
      const at = `${brand} slide ${row.index}`;
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

  test(`closes on ${OBSERVED_CLOSER[brand]}`, () => {
    expect(rows.at(-1)?.fig).toBe(OBSERVED_CLOSER[brand]);
  });

  test("prints each figure number once — no two slides claim the same one", () => {
    const printed = rows.map((r) => r.fig).filter((fig): fig is string => fig !== null);
    expect([...new Set(printed)]).toEqual(printed);
  });
});
