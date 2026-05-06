import { useEffect } from "react";
import { useDeck } from "./DeckContext";

// Spec §5.1 navigation contract:
//   ←  previous slide (goTo(slide-1, 0))
//   →  next slide     (goTo(slide+1, 0))
//   Space  next animation step within the current slide (advance)
export function useKeyboardNav() {
  const { slideIndex, stepCounts, advance, goTo } = useDeck();

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

      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(Math.min(slideIndex + 1, stepCounts.length - 1), 0);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(Math.max(slideIndex - 1, 0), 0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [slideIndex, stepCounts.length, advance, goTo]);
}
