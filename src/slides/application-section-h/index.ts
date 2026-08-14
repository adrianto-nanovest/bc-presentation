import type { SlideDef } from "@/deck/types";
import { h1Slide } from "./h1-pitfall-wall";
import { h2Slide } from "./h2-discipline-wall";
import { h3Slide } from "./h3-bridge-to-i";
import { pitfallsBridgeToMandateSlide } from "./pitfalls-bridge-to-mandate";

// The PITFALLS section — the pitfall wall, the discipline wall, and the bridge out.
// Spec: docs/specs/2026-05-12-slides-application-H-discipline.md
//   The Trap (pitfall wall) · The Discipline (practice wall) · the bridge.
//
// FOUR ENTRIES, AND NO DECK COMPOSES ALL FOUR (gh#72). This array is what the section
// CONTAINS, per deck-set list; `src/deck/deck-sets.ts` says which decks run what:
//
//   · standard — `h1`, `h2`, `h3`. Unchanged since Phase 2.
//   · leader   — `h1`, `h2`, `pitfallsBridgeToMandateSlide`. `h3` is still composed,
//                but behind `mandate-levers` under a `mandate` override, because it
//                bridges into THE META-PROCESS and the leader deck puts THE MANDATE in
//                between (§3.6).
//
// So `h3Slide` and `pitfallsBridgeToMandateSlide` are two bridges out of one section
// and never both in one deck's PITFALLS run. Neither file names a letter: `h3` prints
// H.3 or K.4 depending on the deck, and the leader-only one prints J.3 today.
export const applicationSectionHSlides: SlideDef[] = [
  h1Slide,
  h2Slide,
  h3Slide,
  pitfallsBridgeToMandateSlide,
];
