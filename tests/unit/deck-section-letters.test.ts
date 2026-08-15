// The one-way bridge from the composed deck to the slides (gh#37).
//
// A slide that prints a cross-reference needs `letterOf`, and cannot import
// `@/deck/registry` to get it — the registry imports every slide, so the import
// would close a cycle that deadlocks the module runner. `@/deck/section-letters`
// carries the lookup across that gap: the registry publishes, slides read.
//
// Two behaviours hold that bridge up and neither is visible from A.1's output,
// so they are pinned here: a read BEFORE any deck was composed must throw
// rather than answer, and a later publish must win.
//
// Loaded through `vi.resetModules()` + dynamic import in every case, because the
// module's whole state is one module-scope variable — a static import would
// carry one case's publication into the next.
import { describe, expect, test, vi } from "vitest";
import type { SectionKey } from "@/deck/sections";

type SectionLetters = typeof import("@/deck/section-letters");

/** What `publishSectionLetters` takes: the composed deck, of which these cases
 *  care about the letter lookup only. The jump keys are `sectionJumpKeys`'
 *  subject and are pinned in their own describe below. */
function deckOf(
  letterOf: (key: SectionKey) => string | undefined,
  sectionFirstIndex: ReadonlyMap<string, number> = new Map(),
) {
  return { letterOf, sectionFirstIndex };
}

/** A virgin copy of the module — nothing published into it yet. Every case goes
 *  through here (or resets explicitly), so no `beforeEach` is needed and none is
 *  wanted: a hook would reset a registry the case is about to reset anyway. */
async function freshModule(): Promise<SectionLetters> {
  vi.resetModules();
  return import("@/deck/section-letters");
}

describe("sectionLetterOf, before a deck is composed", () => {
  test("throws instead of answering", async () => {
    const { sectionLetterOf } = await freshModule();
    expect(() => sectionLetterOf("process")).toThrow();
  });

  test("names the key asked for and the module that should have published", async () => {
    // The miss is a test that mounted a slide without loading the registry, and
    // the message has to say so — `undefined` would have let that test pass with
    // the slide silently dropping the section it was pointing at.
    const { sectionLetterOf } = await freshModule();
    expect(() => sectionLetterOf("techniques")).toThrow(/techniques/);
    expect(() => sectionLetterOf("techniques")).toThrow(/registry/);
  });
});

describe("sectionLetterOf, once a deck has published", () => {
  const table: Partial<Record<SectionKey, string>> = { process: "D", tools: "G" };

  test("answers with that deck's letters", async () => {
    const { publishSectionLetters, sectionLetterOf } = await freshModule();
    publishSectionLetters(deckOf((key) => table[key]));
    expect(sectionLetterOf("process")).toBe("D");
    expect(sectionLetterOf("tools")).toBe("G");
  });

  test("returns undefined — not a throw — for a key that deck does not run", async () => {
    // A registered key owning no slides is ordinary (Phase 4's leader deck has
    // three), so it is an answer, not a fault. `sectionPointerLabel` drops it.
    const { publishSectionLetters, sectionLetterOf } = await freshModule();
    publishSectionLetters(deckOf((key) => table[key]));
    expect(sectionLetterOf("gap")).toBeUndefined();
  });

  test("a later publish replaces the earlier one", async () => {
    // The deck that is mounted is the deck that published last — a dev-server
    // hot update re-evaluates the registry, and the table must follow it rather
    // than stay pinned to a deck that is no longer on screen.
    const { publishSectionLetters, sectionLetterOf } = await freshModule();
    publishSectionLetters(deckOf((key) => table[key]));
    publishSectionLetters(deckOf((key) => (key === "process" ? "G" : undefined)));
    expect(sectionLetterOf("process")).toBe("G");
    expect(sectionLetterOf("tools")).toBeUndefined();
  });
});

describe("sectionJumpKeys", () => {
  test("is empty — not a throw — before a deck is composed", async () => {
    // The opposite answer to `sectionLetterOf`'s, and deliberately: this one is
    // read while rendering the COVER slide's help legend, and a throw there would
    // white-screen the deck a presenter is about to show. The legend drops its
    // row instead.
    const { sectionJumpKeys } = await freshModule();
    expect(sectionJumpKeys()).toEqual([]);
  });

  test("is the published deck's jump letters, in deck order", async () => {
    const { publishSectionLetters, sectionJumpKeys } = await freshModule();
    publishSectionLetters(
      deckOf(() => undefined, new Map([["A", 0], ["B", 4], ["C", 9]])),
    );
    expect(sectionJumpKeys()).toEqual(["A", "B", "C"]);
  });
});

describe("the live registry", () => {
  test("publishes its composed deck's own letters", async () => {
    // The edge itself: importing the registry — and nothing else — is what makes
    // `sectionLetterOf` answerable, which is the contract every slide relies on.
    vi.resetModules();
    const [{ composedDeck }, { sectionLetterOf }] = await Promise.all([
      import("@/deck/registry"),
      import("@/deck/section-letters"),
    ]);
    (["process", "fundamentals", "techniques", "tools", "pitfalls"] as SectionKey[]).forEach(
      (key) => {
        expect(sectionLetterOf(key)).toBe(composedDeck.letterOf(key));
        expect(sectionLetterOf(key)).toBeTruthy();
      },
    );
  });

  test("publishes the jump keys the keyboard actually answers", async () => {
    // `useKeyboardNav` looks a pressed letter up in `sectionFirstIndex`, and the
    // title slide's legend PRINTS `sectionJumpKeys()`. Same map, so the legend
    // cannot advertise a key that does nothing — the fault gh#72 fixed.
    vi.resetModules();
    const [{ composedDeck }, { sectionJumpKeys }] = await Promise.all([
      import("@/deck/registry"),
      import("@/deck/section-letters"),
    ]);
    expect(sectionJumpKeys()).toEqual([...composedDeck.sectionFirstIndex.keys()]);
  });
});
