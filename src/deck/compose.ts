// Spec §3.4 — the deck composer.
//
// Turns an ordered slide list into display letters and page numbers. Once the
// chrome reads them (§3.5, a later ticket) no slide needs to hardcode
// `section="E" num={11}`, and a cut, insert or reorder can no longer leave a
// visible gap. `src/deck/registry.tsx` composes the live deck through this
// (gh#34), but NOTHING RENDERS FROM IT YET — the chrome still prints its own
// hardcoded props, and the two are held equal by
// `tests/unit/deck-composed-numbering.test.ts`.
//
// Pure: a function over plain data. No React, no DOM, no work at module scope.

import type { SectionKey } from "./sections";

// `useKeyboardNav` binds a bare letter press to a section jump, and reserves
// `r` (reset deck) and `u` (reset step). Section letters are handed out A, B,
// C, …, so the 18th section would be assigned "R" and shadow the reset key.
// The cap is that collision, not an arbitrary limit. The leader deck has 14.
const RESERVED_NAV_KEYS = ["r", "u"] as const;
const MAX_SECTIONS = 17;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// The narrow structural shape the composer actually reads. `SlideDef` carries
// both fields as of gh#34 and satisfies this as-is; keeping the parameter
// narrow lets tests compose synthetic lists without standing up a renderable
// slide.
export interface ComposableSlideDef {
  sectionKey: SectionKey;
  /** Default true. `false` means the slide renders no FigLabel (e.g. covers). */
  numbered?: boolean;
}

export interface ComposedSlide<T extends ComposableSlideDef = ComposableSlideDef> {
  def: T;
  index: number;          // position in the composed deck
  sectionKey: SectionKey;
  letter: string;         // "A" … "Q"
  num: number | null;     // null when numbered === false
}

export interface ComposedDeck<T extends ComposableSlideDef = ComposableSlideDef> {
  slides: ComposedSlide<T>[];
  /** R6 — the only sanctioned way to render a cross-reference to a section. */
  letterOf: (key: SectionKey) => string | undefined;
  /** R5 — letter → jump target. Letters with no numbered slide are absent, so
   *  pressing their key is a no-op. */
  sectionFirstIndex: ReadonlyMap<string, number>;
}

function letterForRun(runOrdinal: number): string {
  if (runOrdinal >= MAX_SECTIONS) {
    const [reset, step] = RESERVED_NAV_KEYS;
    throw new Error(
      `composeDeck: deck has more than ${MAX_SECTIONS} sections. Section ` +
        `letters double as jump keys in useKeyboardNav, where "${reset}" ` +
        `(reset deck) and "${step}" (reset step) are reserved, so section ` +
        `${MAX_SECTIONS + 1} would claim "${LETTERS[MAX_SECTIONS]}" and ` +
        `shadow a reserved key. Merge or drop a section.`,
    );
  }
  return LETTERS[runOrdinal];
}

/**
 * Compose an ordered slide list into letters and numbers (§3.4 R1–R6).
 *
 * Generic in the slide type so the composed rows keep the caller's own def
 * type — pass real `SlideDef`s and `slides[i].def` stays a `SlideDef`.
 *
 * @throws if a section key forms a second, non-adjacent run (R4), or if the
 *         deck exceeds {@link MAX_SECTIONS} sections.
 */
export function composeDeck<T extends ComposableSlideDef>(
  defs: readonly T[],
): ComposedDeck<T> {
  const slides: ComposedSlide<T>[] = [];
  const letterByKey = new Map<SectionKey, string>();
  const sectionFirstIndex = new Map<string, number>();

  let letter = "";
  let numInRun = 0;
  let prevKey: SectionKey | null = null;

  defs.forEach((def, index) => {
    const { sectionKey } = def;

    // R1 — a new run starts wherever the key differs from the previous slide's.
    if (sectionKey !== prevKey) {
      // R4 — a key may form exactly one run. A second run would give one key
      // two letters and make letterOf ambiguous, so it is a hard error.
      const owned = letterByKey.get(sectionKey);
      if (owned !== undefined) {
        // Name the letter this run would have claimed WITHOUT going through
        // letterForRun: on an over-long deck that would throw the cap error and
        // hide the duplicate, which is the more actionable of the two faults.
        const wouldClaim = LETTERS[letterByKey.size] ?? "(past Z)";
        throw new Error(
          `composeDeck: section key "${sectionKey}" forms a second run at ` +
            `index ${index}. It already owns letter "${owned}"; this run ` +
            `would claim "${wouldClaim}". A key must be ` +
            `one contiguous block — move these slides next to the first run.`,
        );
      }
      letter = letterForRun(letterByKey.size); // R2 — encounter order
      letterByKey.set(sectionKey, letter);
      numInRun = 0;
      prevKey = sectionKey;
    }

    // R3 — only numbered slides consume a number; the rest report null.
    const numbered = def.numbered !== false;
    const num = numbered ? ++numInRun : null;

    // R5 — the jump target is the run's first NUMBERED slide, so pressing `A`
    // lands on A.1 and not on the cover.
    if (numbered && !sectionFirstIndex.has(letter)) {
      sectionFirstIndex.set(letter, index);
    }

    slides.push({ def, index, sectionKey, letter, num });
  });

  return {
    slides,
    letterOf: (key) => letterByKey.get(key),
    sectionFirstIndex,
  };
}
