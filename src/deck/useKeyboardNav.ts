import { useEffect } from "react";
import { useDeck } from "./DeckContext";
import { deckSlides } from "./registry";

// Spec §5.1 + plan §1.2 navigation contract:
//   Space / Enter / ArrowDown   advance() — next step, spill to next slide on last step
//   Backspace / Delete / ArrowUp retreat() — prev step, spill to previous slide's last step
//   ArrowRight                  goTo(slide+1, 0) — next slide, step 0
//   ArrowLeft                   goTo(slide-1, 0) — previous slide, step 0
//   r / R                       resetDeck() — only when no modifier held
//   u / U                       resetStep() — only when no modifier held
//   a-k / A-K                   goTo(firstSlideOf(section), 0) — section jump; r/u are
//                                handled above and never reach this branch
//
// PageDown/PageUp are intentionally NOT bound — clickers can be configured to
// emit Space/Backspace or arrows; binding PageDown invites surprises.
//
// Modifier gating on r/u/section-keys protects Cmd+R (browser reload), Cmd+U
// (view source), and Cmd+letter shortcuts — without it, a presenter mid-rehearsal
// hitting Cmd+R would silently reset.

// Section → first-slide-index map. Built once at module load from the static
// deck registry. Letters that don't have a section in the deck are absent
// from the map (their key press is a no-op).
//
// Index 0 is the title slide — also tagged section "A" but acting as the
// opening cover. It is excluded from the section map so pressing `A` jumps
// to A.1 (the first body slide of section A), not the cover. Use `R` to
// return to the cover.
const SECTION_FIRST_INDEX: ReadonlyMap<string, number> = (() => {
  const m = new Map<string, number>();
  deckSlides.forEach((slide, i) => {
    if (i === 0) return;
    if (!m.has(slide.section)) m.set(slide.section, i);
  });
  return m;
})();

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
      } else if (/^[A-Ka-k]$/.test(e.key)) {
        // Section jump (A–K). Cmd/Ctrl/Alt combinations remain bound to
        // their browser/OS shortcuts.
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        const target = SECTION_FIRST_INDEX.get(e.key.toUpperCase());
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
