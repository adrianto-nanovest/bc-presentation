import { describe, expect, test } from "vitest";
import { composeDeck, type ComposableSlideDef } from "@/deck/compose";
import { SECTION_NAMES, type SectionKey } from "@/deck/sections";

// Spec §3.4 rules R1–R6. Every case here runs against a synthetic slide list:
// the composer is a pure function over `{ sectionKey, numbered }`, so proving
// it must not require booting 64 real slides. Importing the real registry
// would also make these tests fail whenever the deck's content changes, which
// is exactly the coupling the derived-numbering refactor exists to remove.

/** Minimal composer input. `numbered` omitted means numbered (R3 default). */
function slide(sectionKey: SectionKey, numbered?: boolean): ComposableSlideDef {
  return numbered === undefined ? { sectionKey } : { sectionKey, numbered };
}

/** The shape of today's standard deck head: cover + agenda, both section A. */
const OPENING_RUN = [slide("opening", false), slide("opening")];

describe("R1 · run detection", () => {
  test("a run continues while sectionKey repeats and breaks when it changes", () => {
    const { slides } = composeDeck([
      slide("opening"),
      slide("opening"),
      slide("landscape"),
      slide("mindset"),
      slide("mindset"),
    ]);
    expect(slides.map((s) => s.letter)).toEqual(["A", "A", "B", "C", "C"]);
  });

  test("each composed slide reports its own index and carries its def through", () => {
    const defs = [slide("opening"), slide("landscape")];
    const { slides } = composeDeck(defs);
    expect(slides.map((s) => s.index)).toEqual([0, 1]);
    expect(slides[0].def).toBe(defs[0]);
    expect(slides[1].def).toBe(defs[1]);
    expect(slides.map((s) => s.sectionKey)).toEqual(["opening", "landscape"]);
  });

  test("an empty deck composes to an empty deck", () => {
    const { slides, sectionFirstIndex, letterOf } = composeDeck([]);
    expect(slides).toEqual([]);
    expect(sectionFirstIndex.size).toBe(0);
    expect(letterOf("opening")).toBeUndefined();
  });
});

describe("R2 · letters follow encounter order, not key declaration order", () => {
  test("the first run is A even when its key is declared last", () => {
    const { letterOf } = composeDeck([
      slide("mandate"),
      slide("opening"),
      slide("lab"),
    ]);
    expect(letterOf("mandate")).toBe("A");
    expect(letterOf("opening")).toBe("B");
    expect(letterOf("lab")).toBe("C");
  });

  test("the leader-deck ordering puts gap/shape/invest at B/C/D and process at G", () => {
    // Spec §3.2: "THE GAP is section B, not ACT I", and the retained
    // curriculum shifts down the alphabet.
    const { letterOf } = composeDeck([
      slide("opening", false),
      slide("opening"),
      slide("gap"),
      slide("shape"),
      slide("invest"),
      slide("landscape"),
      slide("mindset"),
      slide("process"),
    ]);
    expect(letterOf("gap")).toBe("B");
    expect(letterOf("shape")).toBe("C");
    expect(letterOf("invest")).toBe("D");
    expect(letterOf("process")).toBe("G");
  });
});

describe("R3 · numbering within a run", () => {
  test("num increments from 1 inside each run and restarts on the next", () => {
    const { slides } = composeDeck([
      slide("opening"),
      slide("opening"),
      slide("landscape"),
      slide("landscape"),
      slide("landscape"),
    ]);
    expect(slides.map((s) => `${s.letter}.${s.num}`)).toEqual([
      "A.1",
      "A.2",
      "B.1",
      "B.2",
      "B.3",
    ]);
  });

  test("numbered: false yields num null and does not consume a number", () => {
    const { slides } = composeDeck([
      slide("opening", false),
      slide("opening"),
      slide("opening"),
    ]);
    expect(slides.map((s) => s.num)).toEqual([null, 1, 2]);
  });

  test("numbered: true is the same as omitting it", () => {
    const explicit = composeDeck([slide("opening", true), slide("opening", true)]);
    const implicit = composeDeck([slide("opening"), slide("opening")]);
    expect(explicit.slides.map((s) => s.num)).toEqual(implicit.slides.map((s) => s.num));
    expect(implicit.slides.map((s) => s.num)).toEqual([1, 2]);
  });

  test("an unnumbered slide mid-run does not break the count around it", () => {
    const { slides } = composeDeck([
      slide("lab"),
      slide("lab", false),
      slide("lab"),
    ]);
    expect(slides.map((s) => s.num)).toEqual([1, null, 2]);
  });

  test("a shorter run numbers its own members, no hardcoded number needed", () => {
    // Spec §3.5: k3-thank-you's per-variant FIG_NUM hack disappears because a
    // run's last slide gets whatever number that run's own length gives it —
    // 3 in the practice-lab brands, 1 in general. The letters here are A/B
    // because the synthetic deck is short; only the numbers are the point.
    const long = composeDeck([...OPENING_RUN, slide("lab"), slide("lab"), slide("lab")]);
    const short = composeDeck([...OPENING_RUN, slide("lab")]);
    expect(long.slides.at(-1)?.num).toBe(3);
    expect(short.slides.at(-1)?.num).toBe(1);
    expect(short.slides.at(-1)?.letter).toBe("B");
  });
});

describe("R4 · a key may form exactly one run", () => {
  test("a non-adjacent second run of the same key throws, naming the key", () => {
    expect(() =>
      composeDeck([slide("opening"), slide("landscape"), slide("opening")]),
    ).toThrow(/opening/);
  });

  test("the message explains that one key cannot own two letters", () => {
    let message = "";
    try {
      composeDeck([slide("lab"), slide("mandate"), slide("lab")]);
    } catch (err) {
      message = (err as Error).message;
    }
    expect(message).toMatch(/"lab"/);
    expect(message).toMatch(/"A"/); // the letter it already owns
    expect(message).toMatch(/"C"/); // the letter the second run would claim
  });

  test("adjacent repeats are one run and are fine", () => {
    expect(() =>
      composeDeck([slide("opening"), slide("opening"), slide("opening")]),
    ).not.toThrow();
  });
});

describe("R5 · sectionFirstIndex is the first numbered slide of the run", () => {
  test("the cover is skipped, so A lands on A.1 rather than the title slide", () => {
    // Preserves today's useKeyboardNav behaviour, which special-cased index 0.
    const { sectionFirstIndex } = composeDeck([...OPENING_RUN, slide("landscape")]);
    expect(sectionFirstIndex.get("A")).toBe(1);
    expect(sectionFirstIndex.get("B")).toBe(2);
  });

  test("it is keyed by letter and covers every run that has a numbered slide", () => {
    const { sectionFirstIndex } = composeDeck([
      slide("opening", false),
      slide("opening"),
      slide("gap", false),
      slide("gap", false),
      slide("gap"),
      slide("shape"),
    ]);
    expect([...sectionFirstIndex.keys()]).toEqual(["A", "B", "C"]);
    expect(sectionFirstIndex.get("B")).toBe(4);
    expect(sectionFirstIndex.get("C")).toBe(5);
  });

  test("a run with no numbered slide has no jump target, so its key is a no-op", () => {
    const { sectionFirstIndex, letterOf } = composeDeck([
      slide("opening", false),
      slide("landscape"),
    ]);
    expect(letterOf("opening")).toBe("A");
    expect(sectionFirstIndex.has("A")).toBe(false);
    expect(sectionFirstIndex.get("B")).toBe(1);
  });
});

describe("R6 · letterOf is the sanctioned cross-reference", () => {
  test("returns the letter of a key the deck contains", () => {
    const { letterOf } = composeDeck([...OPENING_RUN, slide("process")]);
    expect(letterOf("process")).toBe("B");
  });

  test("returns undefined for a key that owns no slide in this deck", () => {
    const { letterOf } = composeDeck([...OPENING_RUN]);
    expect(letterOf("mandate")).toBeUndefined();
    expect(letterOf("process")).toBeUndefined();
  });

  test("pairs with SECTION_NAMES to build an A.1 agenda pointer", () => {
    const { letterOf } = composeDeck([...OPENING_RUN, slide("process")]);
    expect(`SECTION ${letterOf("process")} · ${SECTION_NAMES.process}`).toBe(
      "SECTION B · PROCESS & METHODOLOGY",
    );
  });
});

describe("the ≤17-section cap is a keyboard fact", () => {
  const ALL_KEYS = Object.keys(SECTION_NAMES) as SectionKey[];

  /** n single-slide runs, i.e. a deck of exactly n sections. Only 15 real keys
   *  exist and R4 forbids reusing one, so runs 16+ use cast placeholder keys —
   *  the cap is a property of the run COUNT, not of which keys are involved,
   *  and this is the shape a deck set that grew past 15 sections would have. */
  function runsOf(n: number): ComposableSlideDef[] {
    return Array.from({ length: n }, (_, i) =>
      slide((ALL_KEYS[i] ?? `synthetic-${i}`) as SectionKey),
    );
  }

  test("14 sections — the leader deck's count — composes", () => {
    const { slides } = composeDeck(runsOf(14));
    expect(slides.at(-1)?.letter).toBe("N");
  });

  test("17 sections composes, ending at Q", () => {
    const { slides } = composeDeck(runsOf(17));
    expect(slides).toHaveLength(17);
    expect(slides.at(-1)?.letter).toBe("Q");
  });

  test("18 sections throws, blaming the reserved r/u keys", () => {
    let message = "";
    try {
      composeDeck(runsOf(18));
    } catch (err) {
      message = (err as Error).message;
    }
    expect(message).toMatch(/\br\b/);
    expect(message).toMatch(/\bu\b/);
    expect(message).toMatch(/17/);
  });
});
