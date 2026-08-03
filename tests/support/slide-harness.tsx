// The two contexts an isolated slide render needs.
//
// Spec §3.5 (gh#35). A slide's figure number is no longer something the slide
// carries — `<Slide>` publishes the row the composer derived for its position
// and `FigLabel` reads it. A test that mounts a slide component on its own is
// therefore mounting it without the number it prints from, and every FigLabel
// inside it throws. This supplies that missing half, and only that:
// `DeckProvider` for the step state, plus the slide's composed position. It does
// NOT stand in for `<Slide>` — no stage, no NavBar, no click-to-advance. Tests
// that need those mount `<Slide>` itself (see `Slide.test.tsx`).
//
// WHY THE POSITION IS LOOKED UP AND NOT PASSED IN. Writing `letter="E" num={11}`
// in a test would put the hardcoded pair back — in 38 files instead of 63 — and
// Phase 5's insertion of E.12 renumbers the E run, so every one of them would
// need editing to stay green. Reading the live composed deck means a renumber
// moves the tests with it, and a test asserting `E.11` keeps asserting whatever
// the deck actually derives.
//
// ONE EPOCH. `composedDeck` is imported statically here, which is correct for
// the default `?variant=` every unit test runs under. A test that re-points
// `window.location` and calls `vi.resetModules()` to load another brand must NOT
// use this file — it would mix a fresh registry with this module's stale context
// object. `variant-composition.test.tsx` shows the same-epoch dynamic-import
// pattern such a test needs (and `tests/harvest/deck-numbering.tsx` uses it too).
import { type ReactNode } from "react";
import { DeckProvider } from "@/deck/DeckContext";
import { SlideNumberProvider, type SlideNumber } from "@/deck/SlideNumberContext";
import { composedDeck } from "@/deck/registry";
import type { SlideDef } from "@/deck/types";

/**
 * The letter and number the live composed deck gives this slide.
 *
 * @throws if the slide is not in that deck, naming the id. Unit tests resolve to
 *         the shared default variant — `general` — so the slides absent here are
 *         the ones `general` does not run: the two A.1 brand alternates, and
 *         K.1 / K.2, which only a `practiceLab` brand carries. Those tests pass
 *         `at` instead. The silent alternative would be a test asserting a
 *         figure number that nothing derives.
 */
export function composedPositionOf(def: SlideDef): SlideNumber {
  const row = composedDeck.slides.find((s) => s.def === def);
  if (!row) {
    throw new Error(
      `composedPositionOf: slide "${def.id}" is not in the composed deck, so it ` +
        `has no derived figure number. Unit tests run the default "general" ` +
        `deck; a slide only another brand carries must pass at={{…}} with the ` +
        `position it holds in the deck that does run it.`,
    );
  }
  return { letter: row.letter, num: row.num, sectionKey: row.sectionKey };
}

/**
 * A slide's step state plus the number it prints from.
 *
 * Replaces `<DeckProvider stepCounts={[xSlide.steps]}>` in a slide's own tests —
 * same step counts, plus the composed position.
 *
 * @param at the position to publish, for a slide the default `general` deck does
 *        not contain. REJECTED for a slide that IS in that deck: a literal there
 *        would be exactly the hardcoded pair this phase deleted, and it would
 *        keep asserting the old number through a renumber the deck itself
 *        followed. The guard is what stops `at` from becoming a way to write a
 *        figure number no composer agrees with.
 */
export function SlideHarness({
  def,
  at,
  children,
}: {
  def: SlideDef;
  at?: SlideNumber;
  children: ReactNode;
}) {
  if (at && composedDeck.slides.some((s) => s.def === def)) {
    throw new Error(
      `SlideHarness: slide "${def.id}" IS in the composed deck, so its position ` +
        `is derivable — drop at={…} and let it be looked up. at= is only for a ` +
        `slide the default "general" deck does not run.`,
    );
  }
  return (
    <DeckProvider stepCounts={[def.steps]}>
      <SlideNumberProvider value={at ?? composedPositionOf(def)}>{children}</SlideNumberProvider>
    </DeckProvider>
  );
}
