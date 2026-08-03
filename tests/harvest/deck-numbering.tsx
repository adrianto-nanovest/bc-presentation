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

/** One slide's printed figure label. Keyed by deck index, because `SlideDef`
 *  has no `id` yet (it arrives with the composer) and index is what `deckSlides`
 *  is addressed by today. */
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
  index: number,
  DeckProvider: DeckProviderComponent,
  at: string,
): NumberingRow {
  try {
    const { container } = render(
      <DeckProvider stepCounts={[def.steps]}>{def.render()}</DeckProvider>,
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
  // Same epoch, both of them. See the file header.
  const [{ deckSlides }, { DeckProvider }] = await Promise.all([
    import("@/deck/registry"),
    import("@/deck/DeckContext"),
  ]);

  const rows: NumberingRow[] = [];
  const failures: string[] = [];
  deckSlides.forEach((def, index) => {
    const at = `${variant} slide ${index} (${def.section})`;
    try {
      rows.push(harvestSlide(def, index, DeckProvider, at));
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
