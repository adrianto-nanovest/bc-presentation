import { useEffect } from "react";
import { DeckProvider, useDeck } from "./DeckContext";
import { useKeyboardNav } from "./useKeyboardNav";
import { Slide } from "./Slide";
import { deckSlides } from "./registry";

declare global {
  interface Window {
    __DECK_SLIDE_COUNT__: number;
  }
}

function ActiveSlide() {
  useKeyboardNav();
  const { slideIndex, stepCounts, goTo } = useDeck();

  useEffect(() => {
    window.__DECK_SLIDE_COUNT__ = stepCounts.length;
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("slide");
    if (requested != null) {
      const n = Math.max(0, Math.min(Number(requested), stepCounts.length - 1));
      goTo(n, 0);
    }
    // We only honor the query string on first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const def = deckSlides[slideIndex];
  return (
    <Slide
      index={slideIndex}
      animationMode={def.animationMode}
      canonicalPose={def.canonicalPose}
      surface={def.surface ?? "dark"}
      section={def.section}
    >
      {def.render()}
    </Slide>
  );
}

export function Deck() {
  return (
    <DeckProvider stepCounts={deckSlides.map((s) => s.steps)}>
      <ActiveSlide />
    </DeckProvider>
  );
}
