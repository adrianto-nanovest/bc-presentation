// Spec §3.5 — the slide's own derived position, published to its chrome.
//
// `composeDeck` (./compose.ts) turns deck ORDER into a letter and a number.
// This context is how those two values reach the components that print them,
// so that no slide has to name either one. `<Slide>` publishes it for the
// index the deck is showing; `FigLabel` consumes it.
//
// WHY A CONTEXT AND NOT PROPS THREADED DOWN. `Deck.tsx` knows the number and the
// FigLabel prints it, but in between sits every slide's own `render()`, which
// takes no arguments — 63 of them. Threading a pair of props through that
// boundary would mean touching all 63 signatures to carry a value none of them
// has any business knowing.
import { createContext, useContext, type ReactNode } from "react";
import type { SectionKey } from "./sections";

/** One slide's composed position, as the chrome needs to print it. */
export interface SlideNumber {
  /** The DERIVED display letter for this slide's section run — "A" … "Q". */
  letter: string;
  /** Position within the run, or `null` when the slide claims no number
   *  (`numbered: false` — the cover). */
  num: number | null;
  /** The semantic section this slide belongs to. Carried for chrome that names
   *  the section rather than numbering it (§3.6, §3.7). */
  sectionKey: SectionKey;
}

// `null` is the "no provider" signal rather than a default object on purpose:
// a default would let a FigLabel mounted outside a `<Slide>` render a plausible
// wrong number instead of failing.
const SlideNumberContext = createContext<SlideNumber | null>(null);

export function SlideNumberProvider({
  value,
  children,
}: {
  value: SlideNumber;
  children: ReactNode;
}) {
  return <SlideNumberContext.Provider value={value}>{children}</SlideNumberContext.Provider>;
}

/**
 * This slide's composed letter and number.
 *
 * @throws if called outside a `<SlideNumberProvider>`. Rendering
 *         `FIG. undefined.undefined` on a projector is the failure this
 *         prevents, so the miss names the provider that is missing rather than
 *         returning a blank.
 */
export function useSlideNumber(): SlideNumber {
  const value = useContext(SlideNumberContext);
  if (value === null) {
    throw new Error(
      "useSlideNumber() was called outside a <SlideNumberProvider>. <Slide> " +
        "publishes one for every slide the deck shows; a component mounted on " +
        "its own in a test needs wrapping in <SlideNumberProvider> with the " +
        "composed position it stands for (tests/support/slide-harness.tsx).",
    );
  }
  return value;
}
