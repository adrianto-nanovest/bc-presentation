import { useEffect } from "react";
import { DeckProvider, useDeck } from "./DeckContext";
import { useKeyboardNav } from "./useKeyboardNav";
import { Slide } from "./Slide";
import {
  composedDeck,
  deckSlides,
  hexLadderComposedDeck,
  hexLadderDevSlide,
} from "./registry";

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
  // The letter and number this slide PRINTS come from its position in the
  // composed deck (§3.5), never from the slide itself. Same index, same array
  // order — `deck-composed-numbering.test.ts` holds the two decks aligned.
  const composed = composedDeck.slides[slideIndex];
  return (
    <Slide
      index={slideIndex}
      animationMode={def.animationMode}
      canonicalPose={def.canonicalPose}
      surface={def.surface ?? "dark"}
      letter={composed.letter}
      num={composed.num}
      sectionKey={composed.sectionKey}
    >
      {def.render()}
    </Slide>
  );
}

export function Deck() {
  // Dev-only escape hatch: ?dev=hexladder renders the color-calibration
  // swatch standalone for scripts/projection-test.mjs. Never reachable
  // via NavBar/keyboard.
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("dev") === "hexladder") {
      const composed = hexLadderComposedDeck.slides[0];
      // Its OWN provider, scoped to this one slide. `<Slide>` calls `useDeck` for
      // click-to-advance, so the bare `<Slide>` this branch used to return threw
      // and rendered nothing (gh#51). One step, so every nav call clamps in place
      // — which is what a standalone calibration swatch should do.
      return (
        <DeckProvider stepCounts={[hexLadderDevSlide.steps]}>
          <Slide
            index={0}
            animationMode={hexLadderDevSlide.animationMode}
            canonicalPose={hexLadderDevSlide.canonicalPose}
            surface={hexLadderDevSlide.surface ?? "dark"}
            letter={composed.letter}
            num={composed.num}
            sectionKey={composed.sectionKey}
          >
            {hexLadderDevSlide.render()}
          </Slide>
        </DeckProvider>
      );
    }
  }

  return (
    <DeckProvider stepCounts={deckSlides.map((s) => s.steps)}>
      <ActiveSlide />
    </DeckProvider>
  );
}
