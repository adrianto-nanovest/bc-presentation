// Spec §3.4 R6 — the one place a SLIDE may ask what letter a section owns.
//
// A slide that prints a cross-reference ("SECTION D · PROCESS & METHODOLOGY")
// needs `letterOf`, which only the composed deck can answer. It cannot reach it
// the obvious way: `@/deck/registry` imports every slide module, so a slide
// importing the registry back closes a cycle. That cycle is not merely untidy —
// under `vi.resetModules()` with concurrent dynamic imports it DEADLOCKS the
// module runner, because each side waits on the other's in-flight import
// (observed on gh#37: `variant-composition.test.tsx` hung past 30s on a single
// epoch that otherwise loads in about two seconds).
//
// So the edge runs one way. This module imports nothing at runtime — nothing at
// all that could reach a slide — and the registry PUBLISHES into it once it has
// composed. Slides read.
//
// ONE EPOCH, ONE DECK, exactly as `registry.tsx` documents for `composedDeck`:
// `VARIANT` resolves at module scope, so a module registry holds one brand's
// deck and therefore one letter table. A `vi.resetModules()` gives the next
// brand a FRESH copy of this module alongside its fresh registry, so the two
// always describe the same deck.
//
// What that does NOT do is invalidate references already held — a component
// captured from the previous epoch keeps that epoch's imports and would read
// the previous letter table. That is the same cross-epoch rule
// `tests/harvest/deck-numbering.tsx` states for `DeckProvider`, and it holds
// here for the same reason: do not mount an old epoch's slide against a new
// epoch's deck.
import type { ComposedDeck } from "./compose";
import type { SectionKey } from "./sections";

/** The composer's own lookup, not a re-declaration of it: a signature typed by
 *  hand here could drift from `composeDeck`'s and hide the drift behind a cast.
 *  Type-only, so this module still pulls in nothing at runtime. */
type LetterOf = ComposedDeck["letterOf"];

let published: LetterOf | null = null;

/**
 * Hand this epoch's composed deck its letter lookup.
 *
 * Called by `@/deck/registry` at module scope, immediately after composing, and
 * expected exactly once per epoch. A LATER CALL WINS, deliberately and
 * silently: `registry` re-evaluating (a dev-server hot update) must leave the
 * table describing the deck that is actually mounted, and refusing the second
 * publish would strand it on a deck that no longer exists. The cost of that
 * choice is that a second, unrelated publisher would go unnoticed — which is
 * why there is exactly one caller, and why `deck-section-letters.test.ts`
 * pins both the replacement and the cold read below.
 */
export function publishSectionLetters(letterOf: LetterOf): void {
  published = letterOf;
}

/**
 * The display letter this deck gives `key`, or `undefined` when the key owns no
 * slides in it — a real case, not a defensive one: the leader deck registers
 * sections Phase 4 has not filled yet. Callers must handle `undefined` rather
 * than print it.
 *
 * @throws if no deck has been composed yet. A slide only renders inside a deck,
 *         and the deck is what publishes, so this can only fire in a test that
 *         mounted a slide without loading `@/deck/registry`. Returning
 *         `undefined` there would let that test pass while the slide silently
 *         dropped the section it was pointing at.
 */
export function sectionLetterOf(key: SectionKey): string | undefined {
  if (published === null) {
    throw new Error(
      `sectionLetterOf("${key}") was called before any deck was composed. ` +
        "`@/deck/registry` publishes the letter table when it loads, so a " +
        "component that renders a section cross-reference needs that module in " +
        "the same epoch — `tests/support/slide-harness.tsx` already imports it.",
    );
  }
  return published(key);
}
