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
// `invest-subscription` (D.5) — and the MIDDLE THREE exist today, adjacent and in
// §6.7's order. THE ARRAY IS NOT PRE-SIZED FOR THE OTHER TWO: a placeholder entry
// is an id a deck set can compose into a blank slide. `invest-base-rates` INSERTS
// AHEAD of all three lines below — the same shape as `src/slides/leader-gap/index.ts`,
// where the one slide built is §4.3's last — and #59 appends D.5 behind them.
// That insert is what turns the three derived figures below from D.1 · D.2 · D.3 into
// D.2 · D.3 · D.4, and no file here changes for it.
//
// WHICH TICKET OWNS WHICH SLIDE, checked rather than assumed, because this comment
// named the wrong one twice before 2026-08-05. #57 is **`invest-chicken-egg`** (§6.7's
// D.3, the second entry below) — `gh issue view 57`: "Phase 6 · D.3 ·
// invest-chicken-egg — four beats, and beat 3 is load-bearing". #58 is
// **`invest-security`** (§6.7's D.4, the third entry) — `gh issue view 58`: "Phase 6 ·
// D.4 · invest-security — where the data goes, and what SOP answers it". BOTH APPENDED
// BEHIND THE ENTRY IN FRONT OF THEM and inserted ahead of nothing, which is the opposite
// of what this comment used to claim of #57 and of what it used to say #58 would do.
// `invest-base-rates` has NO issue at all: §11's phase table puts it in the **Phase 7**
// row ("Leader new slides, second tier", line 1408), beside `gap-no-sop`, so it is not
// waiting on a Phase 6 ticket — it is not in this phase. #59 is D.5.
import type { SlideDef } from "@/deck/types";
import { investOwnProofSlide } from "./invest-own-proof";
import { investChickenEggSlide } from "./invest-chicken-egg";
import { investSecuritySlide } from "./invest-security";

export const leaderInvestSlides: SlideDef[] = [
  investOwnProofSlide,
  investChickenEggSlide,
  investSecuritySlide,
];
