import type { SlideDef } from "./types";
import { composeDeck, type ComposedDeck } from "./compose";
import { publishSectionLetters } from "./section-letters";
import { DECK_SET_COMPOSITION } from "./deck-sets";
import { slideCatalogue } from "./slide-catalogue";
import { resolveDeckSetSlides } from "./slots";
import { BRANDS } from "@/deck-variants";
import { VARIANT } from "@/variant";
import { HexLadder } from "@/primitives/HexLadder";

// HexLadder is a developer-only slide retained for projection-test
// (see scripts/projection-test.mjs). It is NOT part of deckSlides so
// it never appears in audience navigation; reach it via ?dev=hexladder,
// which Deck.tsx renders standalone.
export const hexLadderDevSlide: SlideDef = {
  // The one slide whose id is not a file basename: it is declared here rather
  // than in a file of its own. `tests/unit/deck-slide-ids.test.ts` names it as
  // the single sanctioned exception.
  id: "hex-ladder",
  steps: 1,
  animationMode: "static",
  canonicalPose: 0,
  surface: "light",
  // Dev-only utility — tagged `lab` so the SlideDef type's non-optional
  // `sectionKey` is satisfied. Not navigated, and never composed with the
  // audience deck, so the key costs that deck nothing.
  sectionKey: "lab",
  render: () => <HexLadder />,
};

// THE DECK THIS REQUEST RUNS, resolved from ONE ordered list of slide ids
// (§4.1, gh#40). It used to be nine section arrays spread together, each module
// resolving its own brand alternates; the deck set now owns the order
// (./deck-sets.ts) and this file owns the slot resolution (./slots.ts, against
// ./slide-catalogue.ts).
//
// NOT A NO-OP BY COINCIDENCE: the `standard` list IS today's order, so berau
// composes the same 64 slides it always did and `tests/fixtures/deck-numbering.json`
// reproduces without an edit. That reproduction is the whole proof of this step.
//
// RESOLVED AT MODULE SCOPE, like `composedDeck` below, because `VARIANT` is —
// one module epoch holds exactly one brand's deck. A listed id that names no
// def therefore throws HERE, at load, rather than dropping a slide silently.
export const deckSlides: SlideDef[] = resolveDeckSetSlides(
  DECK_SET_COMPOSITION[VARIANT.deckSet],
  {
    defs: slideCatalogue,
    brand: VARIANT.brand,
    practiceLab: BRANDS[VARIANT.brand].practiceLab,
  },
);

// The same deck, carrying the letter and page number DERIVED from each slide's
// position (§3.4). THIS IS WHAT THE SCREEN PRINTS as of §3.5: `Deck.tsx` reads
// the row for the showing index and publishes it through `SlideNumberContext`,
// and `FigLabel` renders from that and from nothing else. No slide names a
// letter or a number any more, so a cut, insert or reorder cannot leave a gap.
// `tests/unit/deck-composed-numbering.test.ts` holds these derived pairs against
// the pre-refactor record in `tests/fixtures/deck-numbering.json`.
//
// COMPOSED AT MODULE SCOPE, on purpose and exactly once, because `deckSlides`
// already resolves `VARIANT` at module scope — one module epoch holds exactly
// one brand's deck, so it can also hold exactly one composed deck. That also
// makes R4 (a section key may form only one run) a load-time error rather than
// a first-paint one.
export const composedDeck: ComposedDeck<SlideDef> = composeDeck(deckSlides);

// A slide that prints a cross-reference to another section (A.1's agenda
// pointers, §3.6) cannot import this module — it is already in it, through
// `deckSlides`. Push the lookup out to the leaf module it CAN import instead;
// see `./section-letters.ts` for why the edge has to run this way round.
// The hex-ladder deck below deliberately does NOT publish: it is one dev-only
// slide, not the deck the audience navigates.
publishSectionLetters(composedDeck.letterOf);

// The dev route renders the hex ladder ALONE, so that route is its own one-slide
// deck and composes as one. It prints no FigLabel, so these values never reach
// the screen — but `<Slide>` publishes a number for whatever it shows, and
// deriving this one keeps the audience-facing paths free of a hardcoded
// letter/number pair. (The five dev-only prototype routes still pass their own
// hardcoded figures in; they are deleted with their directories in Phases 5–8.)
export const hexLadderComposedDeck: ComposedDeck<SlideDef> = composeDeck([hexLadderDevSlide]);
