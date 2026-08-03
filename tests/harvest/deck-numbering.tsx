// Harvests the figure label every slide of every live deck ACTUALLY RENDERS.
//
// This is the instrument behind `tests/fixtures/deck-numbering.json` — the
// pre-refactor golden record Phase 3 (spec §3.7 item 1) is measured against.
// The whole point is that nothing here re-states an authored value: the deck is
// composed exactly as the app composes it, every slide is mounted, and the
// figure text is read back out of the DOM. Reading `<FigLabel>` props out of
// source would encode the same assumptions the refactor is being tested
// against, and would prove nothing.
//
// ONE EPOCH HOLDS ONE BRAND. `src/variant.ts` resolves `VARIANT` at module
// scope and `src/slides/reveal-and-closing` reads it to pick the K run, so a
// brand's deck only exists inside a module registry loaded with that brand's
// `?variant=` in place — the pattern `tests/unit/deck-registry.test.ts` uses.
// Consequence worth stating loudly: `DeckProvider` MUST be imported from the
// same epoch as the registry. A static import would hand the slides a React
// context object from the previous epoch and every `useDeck()` would throw.
import { cleanup, render } from "@testing-library/react";
import { vi } from "vitest";
import {
  BRANDS,
  VARIANTS,
  type Brand,
  type VariantId,
} from "@/deck-variants";
import type { SlideDef } from "@/deck/types";

/** `DeckProvider` as imported from a brand's own module epoch. */
type DeckProviderComponent = (typeof import("@/deck/DeckContext"))["DeckProvider"];

/** `SlideNumberProvider` from that same epoch. A React context is an object
 *  identity, so an epoch-crossing import here would hand the slides a DIFFERENT
 *  context than their `FigLabel` reads and every `useSlideNumber()` would throw
 *  "outside a provider" — the same trap the file header calls out for
 *  `DeckProvider`. */
type SlideNumberProviderComponent =
  (typeof import("@/deck/SlideNumberContext"))["SlideNumberProvider"];

/** The composed row a slide is mounted at — its DERIVED letter and number. */
type ComposedRow = (typeof import("@/deck/registry"))["composedDeck"]["slides"][number];

/** One slide's printed figure label. Keyed by deck INDEX, not by `SlideDef.id`
 *  (which gh#34 added): the fixture was recorded before ids existed, and re-keying
 *  it would rewrite the golden record this phase is measured against. Index is
 *  also what a figure number is derived from, so it is the honest key here. */
export interface NumberingRow {
  index: number;
  /** The letter and number exactly as printed — `"E.11"`. `null` when the
   *  slide renders no FigLabel (the cover). */
  fig: string | null;
  /** The FigLabel's label string — the human anchor that keeps a diff readable
   *  when an index shifts. `null` alongside a `null` fig. */
  label: string | null;
}

/** The fixture's shape: one row per slide, per brand. */
export type DeckNumbering = Record<Brand, NumberingRow[]>;

/** Brands in fixture order. Every brand composes a deck, so this is `BRANDS`
 *  itself rather than a hand-kept list — a fourth brand joins the fixture by
 *  being registered. */
export const HARVESTED_BRANDS = Object.keys(BRANDS) as Brand[];

/** The variant serving this brand's STANDARD deck. `berau-leader` / `gems-leader`
 *  are registered but still compose the standard deck (Phase 4 changes that), so
 *  they would add duplicate rows and are deliberately not harvested. */
export function standardVariantFor(brand: Brand): VariantId {
  const ids = Object.keys(VARIANTS) as VariantId[];
  const id = ids.find((v) => VARIANTS[v].brand === brand && VARIANTS[v].deckSet === "standard");
  if (!id) throw new Error(`no standard variant registered for brand "${brand}"`);
  return id;
}

// `— FIG. E.11·READING THE OUTPUT` — FigLabel renders the letter and number as
// text, a `·` span, then the label span, so `textContent` runs them together.
// A miss THROWS rather than recording `null`: `null` means "prints no figure
// label", and silently widening it to mean "prints something I could not parse"
// would let a FigLabel markup change land as a fixture full of nulls.
const FIG_LABEL_TEXT = /FIG\.\s*([A-Z]+\.\d+)\s*·\s*(.*)$/;

const realLocation = window.location;

function pointLocationAt(variant: VariantId): void {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(`http://localhost:5173/?variant=${variant}`),
  });
}

export function restoreLocation(): void {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: realLocation,
  });
}

/** Reads the one figure label a mounted slide prints. */
function readFigLabel(container: HTMLElement, at: string): Pick<NumberingRow, "fig" | "label"> {
  const found = container.querySelectorAll(".fig-label");
  if (found.length === 0) return { fig: null, label: null };
  if (found.length > 1) {
    throw new Error(`${at}: ${found.length} .fig-label elements rendered, expected at most 1`);
  }

  const text = (found[0].textContent ?? "").replace(/\s+/g, " ").trim();
  const parsed = FIG_LABEL_TEXT.exec(text);
  if (!parsed) throw new Error(`${at}: could not read a figure label out of ${JSON.stringify(text)}`);
  return { fig: parsed[1], label: parsed[2].trim() };
}

/**
 * Mounts one slide at its first step and reads its figure label.
 *
 * First step, not `canonicalPose`: the figure label is slide chrome and is
 * mounted from step 0 in every slide that has one (step gates in this deck
 * change opacity, they do not unmount), and step 0 is the cheapest pose that
 * does not run a slide's step-1+ canvas work.
 */
function harvestSlide(
  def: SlideDef,
  composed: ComposedRow,
  DeckProvider: DeckProviderComponent,
  SlideNumberProvider: SlideNumberProviderComponent,
  at: string,
): NumberingRow {
  const { index, letter, num, sectionKey } = composed;
  try {
    const { container } = render(
      <DeckProvider stepCounts={[def.steps]}>
        {/* `<Slide>` publishes this in the app (§3.5); the harvest stands in for
            it with the SAME composed row `Deck.tsx` would read, and nothing
            else. What is read back out of the DOM is still whatever the slide
            actually printed. */}
        <SlideNumberProvider value={{ letter, num, sectionKey }}>
          {def.render()}
        </SlideNumberProvider>
      </DeckProvider>,
    );
    return { index, ...readFigLabel(container, at) };
  } finally {
    // Tear down before the next slide so a leftover interval or rAF loop cannot
    // keep running — about 190 mounts run in this one file, 64 per practice-lab
    // brand. `cleanup()` rather than the `unmount` handle, because a slide that
    // THROWS during render never yields one and its root would stay mounted for
    // the rest of the harvest.
    cleanup();
  }
}

/**
 * The composed deck for one brand, as rendered.
 *
 * Mounts every slide and collects EVERY mount failure before throwing, so a
 * broken slide reports itself by index instead of hiding behind the first one.
 * §3.7's pre-approved escape hatch (harvest a deck through Playwright instead)
 * is only reachable on evidence, and this is the evidence.
 */
export async function harvestDeck(brand: Brand): Promise<NumberingRow[]> {
  const variant = standardVariantFor(brand);
  pointLocationAt(variant);
  vi.resetModules();
  // Same epoch, all three. See the file header.
  const [{ composedDeck }, { DeckProvider }, { SlideNumberProvider }] = await Promise.all([
    import("@/deck/registry"),
    import("@/deck/DeckContext"),
    import("@/deck/SlideNumberContext"),
  ]);

  const rows: NumberingRow[] = [];
  const failures: string[] = [];
  // Walked as the COMPOSED deck rather than as `deckSlides`, because the figure
  // a slide prints is now a function of its composed row (§3.5). The two are the
  // same slides in the same order — `deck-composed-numbering.test.ts` asserts
  // exactly that, so reading the composed list loses nothing.
  composedDeck.slides.forEach((composed) => {
    const { def, index } = composed;
    const at = `${variant} slide ${index} (${def.section})`;
    try {
      rows.push(harvestSlide(def, composed, DeckProvider, SlideNumberProvider, at));
    } catch (err) {
      failures.push(`${at}: ${err instanceof Error ? err.message : String(err)}`);
    }
  });

  if (failures.length > 0) {
    throw new Error(`${failures.length} slide(s) could not be harvested:\n- ${failures.join("\n- ")}`);
  }
  return rows;
}

/** Every live deck, harvested one brand per module epoch. */
export async function harvestAllDecks(): Promise<DeckNumbering> {
  const decks = {} as DeckNumbering;
  try {
    for (const brand of HARVESTED_BRANDS) {
      decks[brand] = await harvestDeck(brand);
    }
  } finally {
    // A failed harvest must not leave the last brand's `?variant=` pointing at
    // `window.location` for whatever runs next in this file.
    restoreLocation();
  }
  return decks;
}
