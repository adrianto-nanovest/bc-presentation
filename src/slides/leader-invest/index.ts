// Section WHY INVEST — the leader deck's third leader-only run (§4.3).
//
// NAMED BY SECTION KEY, NEVER BY LETTER. `invest` is the key; the letter is
// derived from where the run falls in each composed deck (§3.4 R2). It is D today,
// behind `opening`, `gap` and `shape`, and stays D as the rest of Phase 6 fills it
// — but a directory called `leader-d-*` would be wrong the first time a section
// landed in front of it, which is exactly what happened to every curriculum letter
// when gh#53 put `gap` in front of `landscape` and again when gh#54 added `shape`.
// `src/slides/leader-shape/index.ts` named this directory before it existed, on
// that rule.
//
// ORDER IS THE SECTION'S, NOT THE DECK'S. This array says what the section
// contains, in the order §6.7 gives it; `src/deck/deck-sets.ts` says which decks
// run it and where. §6.7 gives `invest` five slides — `invest-base-rates` (D.1),
// `invest-own-proof` (D.2), `invest-chicken-egg` (D.3), `invest-security` (D.4) and
// `invest-subscription` (D.5) — and only the second exists today. THE ARRAY IS NOT
// PRE-SIZED FOR THE OTHER FOUR: a placeholder entry is an id a deck set can compose
// into a blank slide, and #57–#59 append their own rows here when they build them.
import type { SlideDef } from "@/deck/types";
import { investOwnProofSlide } from "./invest-own-proof";

export const leaderInvestSlides: SlideDef[] = [investOwnProofSlide];
