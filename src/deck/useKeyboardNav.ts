import { useEffect } from "react";
import { useDeck } from "./DeckContext";
import { composedDeck } from "./registry";

// Spec §5.1 + plan §1.2 navigation contract:
//   Space / Enter / ArrowDown   advance() — next step, spill to next slide on last step
//   Backspace / Delete / ArrowUp retreat() — prev step, spill to previous slide's last step
//   ArrowRight                  goTo(slide+1, 0) — next slide, step 0
//   ArrowLeft                   goTo(slide-1, 0) — previous slide, step 0
//   r / R                       resetDeck() — only when no modifier held
//   u / U                       resetStep() — only when no modifier held
//   any other letter            goTo(firstNumberedSlideOf(section), 0) — section jump,
//                                IF the composed deck gave that letter to a section.
//                                An unclaimed letter does nothing. r/u are handled
//                                above and never reach this branch.
//
// WHICH LETTERS ARE LIVE IS THE DECK'S ANSWER, NOT THIS FILE'S (§3.5). The branch
// tests `/^[A-Za-z]$/` and then LOOKS THE LETTER UP in the composed deck's
// `sectionFirstIndex` (compose.ts R5). The standard deck claims A–K, the leader
// deck A–J at the Phase 4 floor — where `k` therefore does nothing at all — and
// A–N once Phases 5–7 land (§11). None of the three needs an edit here, and an
// unclaimed letter is a no-op for the same reason an unused one already was — it
// is absent from the map. `r` and `u` are why the composer caps a deck at 17
// sections: section 18 would claim "R" and shadow the reset key.
//
// PageDown/PageUp are intentionally NOT bound — clickers can be configured to
// emit Space/Backspace or arrows; binding PageDown invites surprises.
//
// Modifier gating on r/u/section-keys protects Cmd+R (browser reload), Cmd+U
// (view source), and Cmd+letter shortcuts — without it, a presenter mid-rehearsal
// hitting Cmd+R would silently reset.

export function useKeyboardNav() {
  const {
    slideIndex,
    stepCounts,
    advance,
    retreat,
    goTo,
    resetStep,
    resetDeck,
  } = useDeck();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't swallow keystrokes inside form inputs / contenteditable areas.
      const target = e.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (
        e.key === " " ||
        e.key === "Spacebar" ||
        e.key === "Enter" ||
        e.key === "ArrowDown"
      ) {
        e.preventDefault();
        advance();
      } else if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowUp"
      ) {
        e.preventDefault();
        retreat();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(Math.min(slideIndex + 1, stepCounts.length - 1), 0);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(Math.max(slideIndex - 1, 0), 0);
      } else if (e.key === "r" || e.key === "R") {
        // Protect Cmd+R (reload) / Ctrl+R / Alt+R — let the browser handle them.
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        resetDeck();
      } else if (e.key === "u" || e.key === "U") {
        // Protect Cmd+U (view source) / Ctrl+U / Alt+U.
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        resetStep();
      } else if (/^[A-Za-z]$/.test(e.key)) {
        // Section jump. The target is the run's first NUMBERED slide (R5), so
        // `A` lands on A.1 rather than on the cover without this file holding an
        // exception for index 0. Cmd/Ctrl/Alt combinations remain bound to their
        // browser/OS shortcuts.
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        const target = composedDeck.sectionFirstIndex.get(e.key.toUpperCase());
        if (target !== undefined) {
          e.preventDefault();
          goTo(target, 0);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    slideIndex,
    stepCounts.length,
    advance,
    retreat,
    goTo,
    resetStep,
    resetDeck,
  ]);
}
