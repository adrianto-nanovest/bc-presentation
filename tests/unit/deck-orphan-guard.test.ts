// Every slide def reaches a deck — or says, in the composition, why it does not.
//
// Spec §4.1, verification §10.1 check 7 (gh#44). The hole this closes opened
// when the deck sets took ownership of the order: a slide file can exist,
// compile, be imported by its section index, pass its own unit test, and reach
// NO deck. Nothing on screen says so, because the slide was never on screen.
//
// So this file walks the two directions that hole runs in:
//
//   FORWARD  — a def no list names. Caught here and nowhere else.
//   REVERSE  — an id no def answers. `resolveDeckSetSlides` already throws on
//              it at compose time (gh#40), which in production means at module
//              load, in a stack trace at first paint. Asserted again here so it
//              surfaces as a NAMED test with the offending ids in the message.
//
// WHY THE SOURCE SCAN AND NOT `slideCatalogue`. The catalogue is the pool a deck
// set draws from, and a slide file that was never added to it is exactly the
// silent orphan this guard is for — invisible to any check that starts from the
// pool. `tests/harvest/slide-defs.ts` parses the tree instead, and it is already
// the instrument behind `deck-slide-ids.test.ts`. It also sees
// `hexLadderDevSlide`, which is declared in `registry.tsx` and is in no
// catalogue at all — the one def the whole `orphaned` mechanism exists for.
//
// DIVISION OF LABOUR. `deck-slots.test.ts` owns the resolution RULE against
// synthetic defs; this file owns the CENSUS over the real tree and the real
// lists. Neither renders anything.
import { describe, expect, test } from "vitest";
import { DECK_SET_COMPOSITION, ORPHANED_SLIDES } from "@/deck/deck-sets";
import { slideCatalogue } from "@/deck/slide-catalogue";
import { BRAND_ALTERNATE_IDS } from "@/deck/slots";
import { findSlideDefs } from "../harvest/slide-defs";

/** Every def the tree declares, by id. A `null` id is not this file's failure to
 *  report — `deck-slide-ids.test.ts` owns that — so it drops out here. */
const declaredIds: readonly string[] = findSlideDefs()
  .map((def) => def.id)
  .filter((id): id is string => id !== null);

/**
 * Every id that at least one deck set composes, across all deck sets.
 *
 * A slot's BRAND ALTERNATES count as reached. `a1-gems` appears in no list by
 * design: the lists name the canonical slot `a1-what-youve-seen` and the
 * alternate resolves behind it (`@/deck/slots`), so a guard that read the lists
 * literally would report three false orphans and teach everyone to ignore it.
 *
 * The alternates table is walked by ENTRY rather than looked up per slot:
 * `constructor` is a legal file basename, and a lookup keyed by an id would
 * answer with an inherited `Object.prototype` member instead of "no entry".
 */
const composedIds: ReadonlySet<string> = (() => {
  const ids = new Set(Object.values(DECK_SET_COMPOSITION).flatMap((set) => [...set.slides]));
  for (const [slot, alternates] of Object.entries(BRAND_ALTERNATE_IDS)) {
    if (!ids.has(slot)) continue;
    for (const alternate of Object.values(alternates)) {
      if (alternate !== undefined) ids.add(alternate);
    }
  }
  return ids;
})();

const isDeclaredOrphan = (id: string): boolean =>
  Object.prototype.hasOwnProperty.call(ORPHANED_SLIDES, id);

// ── Forward: a def that reaches no deck ──────────────────────────────────────

describe("every slide def in the tree", () => {
  test("is composed by at least one deck set, or is declared orphaned", () => {
    // THE CHECK. A new slide fails here until someone states where it goes: an
    // id in `STANDARD_SLIDE_IDS`, in `LEADER_SLIDE_IDS`, or in both. The fourth
    // answer — an entry in `ORPHANED_SLIDES` — does not silence this test on its
    // own: the orphan list is pinned below, so exempting a slide costs a second,
    // deliberate edit. That asymmetry is the point.
    const unaccounted = declaredIds.filter((id) => !composedIds.has(id) && !isDeclaredOrphan(id));
    expect(unaccounted).toEqual([]);
  });

  test("is seen by this census at all — the scan finds what the catalogue holds", () => {
    // Guards the guard. `findSlideDefs` cannot prove its own completeness — it
    // reads object literals, so `const x: SlideDef = makeSlide(…)` is invisible
    // to it and to any count taken from it. This closes that from the other
    // side: a def the scan cannot see is a def the check above silently stops
    // policing, and every def a deck can actually reach is in the catalogue.
    //
    // WHAT IS LEFT OPEN, stated rather than implied: a factory-built def that is
    // in NO catalogue and NO list is invisible to both halves. It is also
    // unreachable by any code path — dead, not drifted — and closing it means
    // teaching `tests/harvest/slide-defs.ts` to recognise non-literal
    // construction, which is its own decision and not this ticket's.
    const unseen = slideCatalogue.map((def) => def.id).filter((id) => !declaredIds.includes(id));
    expect(unseen).toEqual([]);
  });
});

// ── The exception list itself ────────────────────────────────────────────────

describe("ORPHANED_SLIDES", () => {
  test("names today's one legitimate orphan and no other", () => {
    // Spelled out rather than counted, because the identity is the point: the
    // dev-only hex ladder is the ONLY def in this repo that is allowed to reach
    // no audience. A second entry is a decision, and it edits this line.
    expect(Object.keys(ORPHANED_SLIDES)).toEqual(["hex-ladder"]);
  });

  test("carries the reason each orphan is one, not merely its id", () => {
    for (const [id, reason] of Object.entries(ORPHANED_SLIDES)) {
      expect(reason.trim(), id).not.toBe("");
    }
    // The hex ladder's reason has to survive contact with a reader who does not
    // already know what it is: the route that reaches it, and the fact that no
    // deck-set list holds it.
    expect(ORPHANED_SLIDES["hex-ladder"]).toMatch(/\?dev=hexladder/);
  });

  test("names no id that a deck set actually composes", () => {
    // The stale half. An orphan that has since been written into a list is a
    // declaration that has stopped being true, and it would suppress the forward
    // check for a slide that no longer needs suppressing.
    expect(Object.keys(ORPHANED_SLIDES).filter((id) => composedIds.has(id))).toEqual([]);
  });

  test("names no id the tree no longer declares", () => {
    // The other stale half: a deleted slide leaving its exemption behind.
    expect(Object.keys(ORPHANED_SLIDES).filter((id) => !declaredIds.includes(id))).toEqual([]);
  });
});

// ── Reverse: an id that resolves to no def ───────────────────────────────────

describe("every id in every deck-set list", () => {
  const catalogueIds = new Set(slideCatalogue.map((def) => def.id));

  test("names a def in the slide catalogue", () => {
    // `resolveDeckSetSlides` throws on this at module load. Asserting it here
    // too costs one comparison and turns "the app is blank and the console has a
    // stack trace" into a failing test that prints the typo'd id.
    for (const set of Object.values(DECK_SET_COMPOSITION)) {
      expect(
        set.slides.filter((id) => !catalogueIds.has(id)),
        `deck set "${set.id}"`,
      ).toEqual([]);
    }
  });

  test("names a def for every brand alternate hiding behind it", () => {
    // The same drift on the brand axis, and quieter: a missing alternate breaks
    // only the brands that take it, so the deck the author was looking at when
    // they made the edit still composes.
    const missing = Object.entries(BRAND_ALTERNATE_IDS).flatMap(([slot, alternates]) =>
      Object.entries(alternates)
        .filter(([, id]) => id !== undefined && !catalogueIds.has(id))
        .map(([brand, id]) => `${slot}: the ${brand} alternate "${id}"`),
    );
    expect(missing).toEqual([]);
  });
});
