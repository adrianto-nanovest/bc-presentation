import { DeckProvider, useDeck } from "./DeckContext";
import { useKeyboardNav } from "./useKeyboardNav";
import { Slide } from "./Slide";
import { smokeDeck } from "./smoke-deck";

function ActiveSlide() {
  useKeyboardNav();
  const { slideIndex } = useDeck();
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
