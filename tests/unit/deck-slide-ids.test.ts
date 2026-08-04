// Every slide def's `id` is its file's basename.
//
// Spec §3.3 (gh#34). The rule ties an id to the FILE it is declared in, and an
// imported def does not know its own path — so this reads the source tree
// through `tests/harvest/slide-defs.ts`, which parses it rather than grepping
// it. (Importing every def would otherwise be fine: `variant-composition.test.tsx`
// already loads the three A.1 alternates together in one epoch. Module
// isolation is not the reason this scans; the path is.)
//
// Pinning the RULE and not just its consequence is the point. A new slide gets
// a correct id by construction, and the brand-alternates — `a1-what-youve-seen`
// / `a1-general` / `a1-gems`, and `k2-practice-lab-overview` / `k2-gems` — are
// held apart even though no single composed deck contains more than one of each.
//
// TRAP 8 — an id is NOT a section reference. The letters inside
// `f8-your-agentic-os` are historical: that slide renders as F.11 in the leader
// deck, where section F is cut and it is carried into the TOOLS run (gh#41), and
// moves again to C.2 in Phase 6. Ids are stable and opaque; display text comes
// from the composer and
// nowhere else. This test is why ids are allowed to LOOK like section tags
// without becoming one.
import path from "node:path";
import { describe, expect, test } from "vitest";
import { findSlideDefs } from "../harvest/slide-defs";

/** The count recorded on gh#34: 67 files under `src/slides/` plus
 *  `hexLadderDevSlide` in the registry. A migration sentinel, not the
 *  completeness proof — see the note on `findSlideDefs`; the scan is proven
 *  complete against the live decks in `deck-composed-numbering.test.ts`. */
const EXPECTED_DEFS = 68;

/** `hexLadderDevSlide` is declared in `registry.tsx` beside `deckSlides`, so it
 *  has no file of its own to be named after. It is the ONLY def whose id is not
 *  a basename, and naming it here means a second exception cannot appear
 *  without editing this line. */
const NOT_FILE_NAMED = new Map([["src/deck/registry.tsx", "hex-ladder"]]);

const defs = findSlideDefs();

/** What a def's id must be: its basename, or the registry's stated exception. */
function expectedId(file: string): string {
  return NOT_FILE_NAMED.get(file) ?? path.basename(file).replace(/\.tsx?$/, "");
}

test(`the tree holds the ${EXPECTED_DEFS} slide defs the ticket counted`, () => {
  expect(defs).toHaveLength(EXPECTED_DEFS);
});

describe("every slide def", () => {
  test("declares an id, as a plain string literal", () => {
    // `null` is "absent, or not a literal this scan can read" — both are
    // failures, because an id that is computed is not a stable handle.
    expect(defs.filter((d) => d.id === null).map((d) => `${d.file} (${d.name})`)).toEqual([]);
  });

  test("names itself after its file", () => {
    const wrong = defs
      .filter((d) => d.id !== null && d.id !== expectedId(d.file))
      .map((d) => `${d.file}: id "${d.id}", expected "${expectedId(d.file)}"`);
    expect(wrong).toEqual([]);
  });

  test("holds an id no other def in the tree claims", () => {
    const seen = new Map<string, string>();
    const duplicates = defs.flatMap((d) => {
      if (d.id === null) return [];
      const first = seen.get(d.id);
      if (first === undefined) {
        seen.set(d.id, d.file);
        return [];
      }
      return [`"${d.id}" claimed by both ${first} and ${d.file}`];
    });
    expect(duplicates).toEqual([]);
  });
});

test("e12-bridge-to-f keeps its historical id — Phase 5 renames it, not this ticket", () => {
  // Spelled out because it is the one id a reader is most likely to "fix":
  // E.12 · LOOP ENGINEERING is inserted in Phase 5, and THEN this becomes e13.
  expect(defs.map((d) => d.id)).toContain("e12-bridge-to-f");
});
