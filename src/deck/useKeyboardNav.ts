import { useEffect } from "react";
import { useDeck } from "./DeckContext";

// Spec §5.1 + plan §1.2 navigation contract:
//   Space / Enter / ArrowDown   advance() — next step, spill to next slide on last step
//   Backspace / Delete / ArrowUp retreat() — prev step, spill to previous slide's last step
//   ArrowRight                  goTo(slide+1, 0) — next slide, step 0
//   ArrowLeft                   goTo(slide-1, 0) — previous slide, step 0
//   r / R                       resetDeck() — only when no modifier held
//   u / U                       resetStep() — only when no modifier held
//
// PageDown/PageUp are intentionally NOT bound — clickers can be configured to
// emit Space/Backspace or arrows; binding PageDown invites surprises.
//
// Modifier gating on r/u protects Cmd+R (browser reload) and Cmd+U (view source)
// — without it, a presenter mid-rehearsal hitting Cmd+R would silently reset.
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
