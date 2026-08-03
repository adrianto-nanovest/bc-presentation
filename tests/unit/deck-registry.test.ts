// The composed deck, asserted per brand.
//
// DIVISION OF LABOUR with variant-composition.test.tsx: that file owns *which
// slide* each brand gets (berau/gems/general A.1 hooks, the gems K.2, the leader
// deck sets still rendering the standard deck) by object identity. This file
// owns the *shape* of the composed deck — which sections run, in what order, at
// what size. Identity assertions do not belong here and counts do not belong
// there.
//
// `VARIANT` resolves once at module scope and `src/slides/reveal-and-closing`
// reads it to pick the K run, so one module epoch holds exactly ONE brand's
// deck. Each case therefore re-points `window.location` and resets the module
// registry before importing — once per case, in `beforeAll`, because reloading
// the whole slide registry is the expensive part of this file.
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import {
  BRANDS,
  VARIANTS,
  type Brand,
  type DeckSetId,
  type VariantId,
} from "@/deck-variants";
import type { SlideDef, SlideSection } from "@/deck/types";

/** One `[section, length]` pair. The deck is asserted as its run-length encoding,
 *  which is equivalent to comparing the full ordered section list but names the
 *  offending section on failure instead of an index. */
type SectionRun = readonly [SlideSection, number];

// Sections A–J are the standard deck's spine: every brand composes them
// identically, so only the K run is brand-dependent. A brand delta INSIDE a
// section (each brand's own A.1, gems' own K.2) swaps one slide for another and
// so moves no count — see variant-composition.test.tsx for those.
const SPINE: readonly SectionRun[] = [
  ["A", 2], // cover + A.1
  ["B", 5],
  ["C", 6], // C.1–C.5 + the C→D bridge
  ["D", 5],
  ["E", 12],
  ["F", 9],
  ["G", 11],
  ["H", 3],
  ["I", 4],
  ["J", 4],
];

// K IS the practice-lab difference: K.1 handoff + K.2 lab overview + K.3 closer
// where the lab runs; the closer alone where it does not, renumbering itself to
// K.1 (see k3-thank-you.tsx).
const K_RUN_WITH_LAB = 3;
const K_RUN_WITHOUT_LAB = 1;

/** The live slide count recorded on the ticket (gh#28) for a practice-lab brand.
 *  Anchors SPINE to an externally observed figure; asserted once, not per case. */
const OBSERVED_TOTAL_WITH_LAB = 64;

/** The runs a standard deck set composes, read off the brand's `practiceLab` flag. */
function standardRuns(brand: Brand): readonly SectionRun[] {
  return [
    ...SPINE,
    ["K", BRANDS[brand].practiceLab ? K_RUN_WITH_LAB : K_RUN_WITHOUT_LAB],
  ];
}

interface DeckCase {
  brand: Brand;
  deckSet: DeckSetId;
}

// One row per brand × deck set whose composition is pinned. Only `standard` is
// pinned today: Phase 4 builds the leader deck (spec §4.3 — 73 slides, sections
// A–N, a different letter map entirely), and until then the leader variants
// render the standard deck, a fact variant-composition.test.tsx already asserts.
// Repeating it here would duplicate that file and force Phase 4 to REWRITE these
// rows instead of appending to them.
const CASES: readonly DeckCase[] = [
  { brand: "berau", deckSet: "standard" },
  { brand: "gems", deckSet: "standard" },
  { brand: "general", deckSet: "standard" },
  // Phase 4 appends `{ brand: …, deckSet: "leader" }` rows here and adds the
  // matching arm to `expectedRuns` below. Two additive edits, no row rewritten.
];

function expectedRuns({ brand, deckSet }: DeckCase): readonly SectionRun[] {
  switch (deckSet) {
    case "standard":
      return standardRuns(brand);
    // Phase 4: `case "leader": return leaderRuns(brand);`
    default:
      throw new Error(`no composition recorded for deck set "${deckSet}"`);
  }
}

/** The registered variant serving this brand × deck set. Derived from `VARIANTS`
 *  rather than hardcoded, so a case cannot name a variant the app does not serve. */
function variantFor({ brand, deckSet }: DeckCase): VariantId {
  const ids = Object.keys(VARIANTS) as VariantId[];
  const id = ids.find((v) => VARIANTS[v].brand === brand && VARIANTS[v].deckSet === deckSet);
  if (!id) throw new Error(`no variant registered for ${brand} · ${deckSet}`);
  return id;
}

function runsOf(slides: readonly SlideDef[]): Array<[SlideSection, number]> {
  return slides.reduce<Array<[SlideSection, number]>>((runs, s) => {
    const last = runs.at(-1);
    if (last && last[0] === s.section) last[1] += 1;
    else runs.push([s.section, 1]);
    return runs;
  }, []);
}

function totalOf(runs: readonly SectionRun[]): number {
  return runs.reduce((n, [, length]) => n + length, 0);
}

const realLocation = window.location;

function restoreLocation(): void {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: realLocation,
  });
}

async function loadRegistry(variant: VariantId) {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(`http://localhost:5173/?variant=${variant}`),
  });
  vi.resetModules();
  return import("@/deck/registry");
}

test(`the spine plus a practice-lab K run is the ${OBSERVED_TOTAL_WITH_LAB} slides observed live`, () => {
  expect(totalOf(standardRuns("berau"))).toBe(OBSERVED_TOTAL_WITH_LAB);
});

describe.each(CASES)("deck composed for $brand · $deckSet", (deckCase) => {
  const variant = variantFor(deckCase);
  let deckSlides: SlideDef[];
  let hexLadderDevSlide: SlideDef;

  beforeAll(async () => {
    ({ deckSlides, hexLadderDevSlide } = await loadRegistry(variant));
  });
  afterAll(restoreLocation);

  test(`${variant} runs the spec'd sections, in order, at the spec'd sizes`, () => {
    expect(runsOf(deckSlides)).toEqual(expectedRuns(deckCase));
  });

  test("every slide is navigable: a step count and an in-range canonical pose", () => {
    deckSlides.forEach((s, i) => {
      const at = `${variant} slide ${i} (${s.section})`;
      expect(typeof s.render, at).toBe("function");
      expect(s.steps, at).toBeGreaterThan(0);
      expect(s.canonicalPose, at).toBeGreaterThanOrEqual(0);
      expect(s.canonicalPose, at).toBeLessThan(s.steps);
    });
  });

  test("excludes the dev-only hex-ladder slide, so the last authored section closes the deck", () => {
    expect(deckSlides).not.toContain(hexLadderDevSlide);
    expect(deckSlides.at(-1)?.section).toBe(expectedRuns(deckCase).at(-1)?.[0]);
  });
});

describe("the practice-lab difference", () => {
  afterEach(() => {
    vi.doUnmock("@/deck-variants");
    restoreLocation();
  });

  test("follows the brand's `practiceLab` flag, not the brand's identity", async () => {
    // `general` is the brand without a lab. Force ONLY its flag true: if the lab
    // slides then appear, composition branches on the flag — not on a brand or
    // variant string, which is what the ticket asks this file to prove.
    const real = await import("@/deck-variants");
    vi.doMock("@/deck-variants", () => ({
      ...real,
      BRANDS: {
        ...real.BRANDS,
        general: { ...real.BRANDS.general, practiceLab: true },
      },
    }));

    const { deckSlides } = await loadRegistry("general");
    expect(runsOf(deckSlides).at(-1)).toEqual(["K", K_RUN_WITH_LAB]);
  });
});
