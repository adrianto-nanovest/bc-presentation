import { useEffect } from "react";
import { DeckProvider, useDeck } from "./DeckContext";
import { useKeyboardNav } from "./useKeyboardNav";
import { Slide } from "./Slide";
import { smokeDeck } from "./smoke-deck";

declare global {
  interface Window {
    __DECK_SLIDE_COUNT__: number;
  }
}

function ActiveSlide() {
  useKeyboardNav();
  const { slideIndex, stepCounts } = useDeck();
  useEffect(() => {
    window.__DECK_SLIDE_COUNT__ = stepCounts.length;
  }, [stepCounts.length]);
  const def = smokeDeck[slideIndex];
  return (
    <Slide
      index={slideIndex}
      animationMode={def.animationMode}
      canonicalPose={def.canonicalPose}
      surface={def.surface ?? "dark"}
    >
      {def.render()}
    </Slide>
  );
}

export function Deck() {
  return (
    <DeckProvider stepCounts={smokeDeck.map((s) => s.steps)}>
      <ActiveSlide />
    </DeckProvider>
  );
}
