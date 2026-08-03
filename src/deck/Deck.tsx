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
// PROTOTYPE gh#16 — throwaway import; goes away with the prototype directory.
import { Proto16Route } from "@/slides/prototype-gh16-leader-slides";
// PROTOTYPE gh#17 — throwaway import; goes away with the prototype directory.
import { Proto17Route } from "@/slides/prototype-gh17-e12-loop-canvas";
// PROTOTYPE gh#18 — throwaway import; goes away with the prototype directory.
import { Proto18Route } from "@/slides/prototype-gh18-e12-open-form";
// PROTOTYPE gh#19 — throwaway import; goes away with the prototype directory.
import { Proto19Route } from "@/slides/prototype-gh19-e12-the-loop";
// PROTOTYPE gh#19b — throwaway import; goes away with the prototype directory.
import { Proto19bRoute } from "@/slides/prototype-gh19b-e12-loop-engineering";

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
      section={def.section}
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
    // PROTOTYPE gh#16 — throwaway. Remove with the prototype directory.
    if (import.meta.env.DEV && params.get("dev") === "proto16") {
      return <Proto16Route />;
    }
    // PROTOTYPE gh#17 — throwaway. Remove with the prototype directory.
    if (import.meta.env.DEV && params.get("dev") === "proto17") {
      return <Proto17Route />;
    }
    // PROTOTYPE gh#18 — throwaway. Remove with the prototype directory.
    if (import.meta.env.DEV && params.get("dev") === "proto18") {
      return <Proto18Route />;
    }
    // PROTOTYPE gh#19 — throwaway. Remove with the prototype directory.
    if (import.meta.env.DEV && params.get("dev") === "proto19") {
      return <Proto19Route />;
    }
    // PROTOTYPE gh#19b — throwaway. Remove with the prototype directory.
    if (import.meta.env.DEV && params.get("dev") === "proto19b") {
      return <Proto19bRoute />;
    }
    if (params.get("dev") === "hexladder") {
      const composed = hexLadderComposedDeck.slides[0];
      return (
        <Slide
          index={0}
          animationMode={hexLadderDevSlide.animationMode}
          canonicalPose={hexLadderDevSlide.canonicalPose}
          surface={hexLadderDevSlide.surface ?? "dark"}
          section={hexLadderDevSlide.section}
          letter={composed.letter}
          num={composed.num}
          sectionKey={composed.sectionKey}
        >
          {hexLadderDevSlide.render()}
        </Slide>
      );
    }
  }

  return (
    <DeckProvider stepCounts={deckSlides.map((s) => s.steps)}>
      <ActiveSlide />
    </DeckProvider>
  );
}
