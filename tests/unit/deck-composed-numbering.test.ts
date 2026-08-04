// The no-op proof: what the composer DERIVES is what the deck already PRINTS.
//
// Spec §3.3 + §3.7 item 1 (gh#34). The previous two tickets recorded what every
// live deck renders (`tests/fixtures/deck-numbering.json`, gh#32) and built the
// composer that turns an ordered slide list into letters and numbers (gh#33).
// This file puts them face to face: compose each brand's real deck through the
// real composer and require the derived `letter.num` to equal the recorded `fig`
// at every index. An empty diff is the whole claim of Phase 3's first half —
// the semantic model is a faithful re-description of the deck that exists.
//
// DIVISION OF LABOUR. `deck-numbering-fixture.test.tsx` asserts the fixture is
// still what the decks RENDER (it mounts them). This file asserts the fixture is
// what the composer DERIVES (it mounts nothing). Both must hold, and they fail
// for opposite reasons: the first when a slide's chrome changes, the second when
// a `sectionKey` changes or a slide crosses a section boundary. Note what this
// file therefore does NOT catch — reordering two slides WITHIN one section
// leaves the section's `{index, fig}` sequence identical, and only the label
// column of the rendered fixture moves. That case belongs to the other file.
//
// ONE EPOCH HOLDS ONE BRAND — `src/variant.ts` resolves `VARIANT` at module
// scope and `src/slides/reveal-and-closing` reads it to pick the `lab` run, so each
// brand's deck only exists inside a module registry loaded with that brand's
// `?variant=` in place. Same pattern as `deck-registry.test.ts`.
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import {
  HARVESTED_BRANDS,
  standardVariantFor,
  restoreLocation,
  type DeckNumbering,
} from "../harvest/deck-numbering";
import { findSlideDefs } from "../harvest/slide-defs";
import type { Brand, VariantId } from "@/deck-variants";

const FIXTURE = path.resolve(__dirname, "../fixtures/deck-numbering.json");

function readFixture(): DeckNumbering {
  return JSON.parse(readFileSync(FIXTURE, "utf8")) as DeckNumbering;
}

/** `"A.1"`, or `null` for a slide that claims no number (the cover). The one
 *  place this file spells out how a figure is printed from its parts. */
function figOf(letter: string, num: number | null): string | null {
  return num === null ? null : `${letter}.${num}`;
}

function pointLocationAt(variant: VariantId): void {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(`http://localhost:5173/?variant=${variant}`),
  });
}

/** The registry as loaded — inferred from the module, never restated, so a
 *  changed export type surfaces here as a type error rather than a cast. */
type LoadedRegistry = typeof import("@/deck/registry");

/** Loads one brand's registry in its own module epoch. The import itself is an
 *  assertion: the registry composes at module scope, so a deck whose section
 *  keys form two runs (R4) throws HERE rather than at first paint. */
async function loadRegistry(brand: Brand): Promise<LoadedRegistry> {
  pointLocationAt(standardVariantFor(brand));
  vi.resetModules();
  return import("@/deck/registry");
}

afterAll(restoreLocation);

describe.each(HARVESTED_BRANDS)("%s's composed deck", (brand) => {
  let registry: LoadedRegistry;

  beforeAll(async () => {
    registry = await loadRegistry(brand);
  });

  // ── The ticket, in one assertion ───────────────────────────────────────────

  test("derives the figure the fixture recorded, at every index", () => {
    const derived = registry.composedDeck.slides.map((s) => ({
      index: s.index,
      fig: figOf(s.letter, s.num),
    }));
    const recorded = readFixture()[brand].map((r) => ({ index: r.index, fig: r.fig }));

    // Compared whole rather than row-by-row so a length change reports as a
    // length change instead of as a missing row at the first index past the end.
    expect(derived).toEqual(recorded);
  });

  // ── What a failure above narrows to ────────────────────────────────────────

  test("composes exactly the slides the registry navigates, in deck order", () => {
    expect(registry.composedDeck.slides.map((s) => s.def)).toEqual(registry.deckSlides);
    expect(registry.composedDeck.slides.map((s) => s.index)).toEqual(
      registry.deckSlides.map((_, i) => i),
    );
  });

  test("gives the cover no number, so section A still opens on A.1", () => {
    const [cover, ...rest] = registry.composedDeck.slides;
    expect(cover.def.numbered).toBe(false);
    expect(cover.num).toBeNull();
    expect(figOf(rest[0].letter, rest[0].num)).toBe("A.1");
    // R5 — the jump target is the run's first NUMBERED slide, not the cover.
    expect(registry.composedDeck.sectionFirstIndex.get("A")).toBe(1);
  });

  // The ticket asks for this per COMPOSED deck specifically. `deck-slide-ids.test.ts`
  // proves the stronger tree-wide property, but from source; this is the one that
  // holds for the object the app actually navigates.
  test("gives every slide a unique id", () => {
    const ids = registry.composedDeck.slides.map((s) => s.def.id);
    expect(ids.every((id) => typeof id === "string" && id.length > 0)).toBe(true);

    const seen = new Map<string, number>();
    const duplicates = ids.flatMap((id, i) => {
      const first = seen.get(id);
      if (first === undefined) {
        seen.set(id, i);
        return [];
      }
      return [`"${id}" at index ${i} repeats index ${first}`];
    });
    expect(duplicates).toEqual([]);
  });

  // Closes the loop `deck-slide-ids.test.ts` cannot close from its own side: a
  // def the source scan fails to recognise is invisible to every assertion
  // taken from that scan, INCLUDING its count. A live deck cannot be fooled
  // that way, so requiring each composed id to appear in the scan proves the
  // scan saw everything that actually ships.
  test("is composed only of slides the source scan found", () => {
    const scanned = new Set(findSlideDefs().map((d) => d.id));
    const missing = registry.composedDeck.slides
      .map((s) => s.def.id)
      .filter((id) => !scanned.has(id));
    expect(missing).toEqual([]);
  });

  test("gives every section key exactly one letter, in encounter order", () => {
    // R4 is enforced by the composer at import time; this states the resulting
    // shape for a REAL deck, where composeDeck's own tests use synthetic lists.
    const letters = registry.composedDeck.slides.map((s) => s.letter);
    const runs = letters.filter((l, i) => l !== letters[i - 1]);
    expect([...new Set(runs)]).toEqual(runs);
  });
});

describe("the dev-only hex ladder", () => {
  let registry: LoadedRegistry;

  beforeAll(async () => {
    registry = await loadRegistry("berau");
  });

  test("is a lab slide that no composed deck contains", () => {
    expect(registry.hexLadderDevSlide.id).toBe("hex-ladder");
    expect(registry.hexLadderDevSlide.sectionKey).toBe("lab");
    expect(registry.deckSlides).not.toContain(registry.hexLadderDevSlide);
    expect(registry.composedDeck.slides.map((s) => s.def)).not.toContain(
      registry.hexLadderDevSlide,
    );
  });
});
