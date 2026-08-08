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
// `f8-your-agentic-os` are historical: that slide renders as F.8 in the standard
// deck and as C.2 in the leader deck, where section F is cut and gh#54 moved it
// behind `shape-agentic-org` — it had been carried inside the TOOLS run since
// gh#41, printing F.11 and then G.11, under an id that never changed. Ids are
// stable and opaque; display text comes from the composer and nowhere else. This
// test is why ids are allowed to LOOK like section tags without becoming one.
import path from "node:path";
import { describe, expect, test } from "vitest";
import { findSlideDefs } from "../harvest/slide-defs";

/** 83 files under `src/slides/` plus `hexLadderDevSlide` in the registry — gh#34's
 *  count of 67 files, `e12-loop-engineering` (gh#48), `gap-capability-ladder`
 *  (gh#53, the first leader-only file), `shape-agentic-org` (gh#54, the second),
 *  `invest-own-proof` (gh#56, the third), `invest-chicken-egg` (gh#57, the fourth),
 *  `mandate-enablement` (gh#60, the fifth), `mandate-phases-gates` (gh#61, the
 *  sixth), `invest-security` (gh#58, the seventh), `invest-subscription` (gh#59,
 *  the eighth), `gap-hardest-part` (gh#65, the ninth — and the first of them to
 *  land at the HEAD of a run that already existed), `gap-no-sop` (gh#66, the
 *  tenth, and the first to land in the MIDDLE of one), `gap-three-failures` and
 *  `gap-the-pattern` (gh#67, the eleventh and twelfth — the first ticket to add TWO
 *  files at once, and the one that closes the `gap` run at §4.3's five),
 *  `shape-middle-out` (gh#68, the thirteenth, at the TAIL of the `shape` run),
 *  `mandate-levers` (gh#69, the fourteenth, appended at the END of the `mandate` run
 *  and closing it at §6.8's three), and `invest-base-rates` (gh#70, the FIFTEENTH —
 *  the SECOND to land at the head of an existing run, and the one that closes
 *  `invest` at §6.7's five from its front). A migration
 *  sentinel, not the
 *  completeness proof — see the note on
 *  `findSlideDefs`; the scan is proven complete against the live decks in
 *  `deck-composed-numbering.test.ts`.
 *
 *  A FILE IS COUNTED HERE AND A FIGURE IS NOT, and the three tickets before this one
 *  make the point from every end available: gh#68 added ONE file and moved NO figure at
 *  all, gh#69 added ONE file and moved NO figure either, gh#70 added ONE file and moved
 *  FOUR composed figures — and this number went up by exactly one on each of the three.
 *  Only the file count reaches it. What the four moved to is derived (§3.5) and
 *  recorded in `tests/fixtures/deck-numbering.json`, which is the artifact that
 *  distinguishes the three; nothing here does or should. */
const EXPECTED_DEFS = 84;

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

test("the section-E bridge is e13, and e12 is left free for THE LOOP", () => {
  // gh#47 completed the Phase 5 rename this test used to hold OFF. The bridge is
  // `e13-bridge-to-f`; the `e12` slot belongs to E.12 · LOOP ENGINEERING, which
  // inserts AHEAD of it. Spelled out because it is the id a reader is most likely
  // to "fix" back — and TRAP 3 (Appendix B) is that same mix-up: #8's "E.12
  // override" is the BRIDGE's beat 2, never THE LOOP's.
  //
  // The old id cannot return quietly: "names itself after its file" above would
  // also have to move the file, and both deck-set lists name this id by hand.
  expect(defs.map((d) => d.id)).toContain("e13-bridge-to-f");
});
