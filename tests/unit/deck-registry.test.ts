// The composed deck, asserted per brand × deck set.
//
// DIVISION OF LABOUR with variant-composition.test.tsx: that file owns *which
// slide* a variant gets (berau/gems/general A.1 hooks, the gems K.2, the leader
// deck's F cut and its retained F.8) by object identity. This file owns the
// *shape* of the composed deck — which sections run, in what order, at what size.
// Identity assertions do not belong here and counts do not belong there.
//
// `VARIANT` resolves once at module scope and `src/deck/registry.tsx` reads it
// to resolve the deck set and the `lab` run (gh#40 moved that read there from
// `src/slides/reveal-and-closing`), so one module epoch holds exactly ONE
// VARIANT's deck — brand alone stopped naming a deck when gh#41 gave the leader
// set its own list. Each case therefore re-points `window.location` and resets the
// module registry before importing — once per case, in `beforeAll`, because
// reloading the whole slide registry is the expensive part of this file.
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import {
  BRANDS,
  VARIANTS,
  type Brand,
  type DeckSetId,
  type VariantId,
} from "@/deck-variants";
import type { SlideDef } from "@/deck/types";
import type { SectionKey } from "@/deck/sections";

/** One `[sectionKey, length]` pair. The deck is asserted as its run-length
 *  encoding, which is equivalent to comparing the full ordered section list but
 *  names the offending section on failure instead of an index.
 *
 *  Keyed by `sectionKey`, never by a display letter: as of gh#38 no slide states
 *  what letter it is, and the letter a run takes is a function of where the run
 *  sits (§3.4 R2). Asserting the keys asserts the letters — a run in the wrong
 *  place fails HERE, at the section that moved, rather than as a letter mismatch
 *  on every slide downstream of it. */
type SectionRun = readonly [SectionKey, number];

// This is the standard deck's spine: every brand composes it identically, so
// only the closing `lab` run is brand-dependent. A brand delta INSIDE a section
// (each brand's own A.1, gems' own lab slide) swaps one slide for another and so
// moves no count — see variant-composition.test.tsx for those.
//
// Composed in this order the runs take the letters A–J, which is what the deck
// prints today. The letters are NOT restated here; the order below is what
// produces them.
const SPINE: readonly SectionRun[] = [
  ["opening", 2], // cover + A.1
  ["landscape", 5],
  ["mindset", 6], // C.1–C.5 + the bridge into `process`
  ["process", 5],
  ["fundamentals", 13], // e1–e11, E.12 · LOOP ENGINEERING (gh#48), the bridge
  ["techniques", 9],
  ["tools", 11],
  ["pitfalls", 3],
  ["meta", 4],
  ["principles", 4],
];

// `lab` IS the practice-lab difference: handoff + lab overview + closer where
// the lab runs; the closer alone where it does not, which renumbers the closer
// to .1 of its run (see k3-thank-you.tsx).
const PRACTICE_LAB_RUN = 3;
const CLOSER_ONLY_RUN = 1;

/** The live slide count for a practice-lab brand: the 64 recorded on gh#28, plus
 *  E.12 · LOOP ENGINEERING (gh#48), which §8.2 ships to every deck with no cut
 *  anywhere. Anchors SPINE to an externally observed figure; asserted once, not
 *  per case. */
const OBSERVED_TOTAL_WITH_LAB = 65;

/** The runs a standard deck set composes, read off the brand's `practiceLab` flag. */
function standardRuns(brand: Brand): readonly SectionRun[] {
  return [
    ...SPINE,
    ["lab", BRANDS[brand].practiceLab ? PRACTICE_LAB_RUN : CLOSER_ONLY_RUN],
  ];
}

// ── The leader deck, which is no longer the Phase 4 floor (gh#41, gh#53) ──────

/** The leader deck's spine: the standard one with `techniques` GONE, `tools` one
 *  longer, and a `gap` run in front of `landscape`.
 *
 *  The first two facts are one edit. `f1`–`f7` and `f9` are cut, which empties
 *  `techniques` so it takes no letter at all; `f8-your-agentic-os` survives
 *  inside the `tools` run, carried there by the deck set's one
 *  `sectionOverrides` entry.
 *
 *  `gap` is gh#53's, and it is the first run the standard deck does not have. It
 *  sits SECOND, so every run behind it takes the next letter along — which is
 *  why this file asserts KEYS and not letters (see `SectionRun`): the one-line
 *  insert below is the whole diff, and a letter-keyed table would have needed ten
 *  edits to say the same thing. Composed in this order the runs take A–K.
 *  §4.3 gives `gap` five slides; #55–#58 raise this 1 and move nothing else. */
const LEADER_SPINE: readonly SectionRun[] = [
  ["opening", 2], // cover + A.1
  ["gap", 1], // `gap-capability-ladder` (gh#53) — leader-only, §4.3's B.5
  ["landscape", 5],
  ["mindset", 6],
  ["process", 5],
  ["fundamentals", 13], // e1–e11, E.12 · LOOP ENGINEERING (gh#48), the bridge
  ["tools", 12], // g1–g10 + the relocated f8 + g11-bridge-to-h
  ["pitfalls", 3],
  ["meta", 4],
  ["principles", 4],
];

/** The runs a leader deck set composes. Same `practiceLab` read as the standard
 *  deck: leaders run the same lab (§4.4), so nothing here is deck-set-specific —
 *  and no leader variant is registered for the brand without one. */
function leaderRuns(brand: Brand): readonly SectionRun[] {
  return [
    ...LEADER_SPINE,
    ["lab", BRANDS[brand].practiceLab ? PRACTICE_LAB_RUN : CLOSER_ONLY_RUN],
  ];
}

/** The leader deck's own total: 56 when gh#41 recorded it against a 64-slide
 *  standard deck, 57 once gh#48 inserted E.12 into both sets, 58 now that gh#53's
 *  ladder has reached this deck and no other.
 *
 *  SO THE DIFFERENCE gh#41 PINNED HAS CHANGED, and that is the point of Phase 6
 *  rather than a regression: the leader deck is no longer "the standard deck minus
 *  eight", it is that minus eight PLUS its own slides. The assertion below states
 *  both halves separately so the next `gap` slide moves one number, not a
 *  sentence. */
const LEADER_TOTAL_WITH_LAB = 58;

/** The eight cut F slides — `f1`–`f7` and `f9`, with `f8-your-agentic-os` kept
 *  and relocated. Held apart from the total above so a leader-only ADDITION can
 *  never be mistaken for a retained F slide, or vice versa. */
const LEADER_CUT_F_SLIDES = 8;

/** What the leader deck holds that no standard deck does: `gap`, so far. */
const LEADER_ONLY_SLIDES = 1;

interface DeckCase {
  brand: Brand;
  deckSet: DeckSetId;
}

// One row per brand × deck set whose composition is pinned. The two leader rows
// were APPENDED by gh#41, exactly as the previous ticket planned for, and no
// standard row moved. `general` has no leader variant — leaders are addressed per
// organisation — so there are five rows, not six.
//
// This is not §4.3's finished leader deck: 58 slides across A–K. The rest of
// Phase 6 grows it to 73 across A–N by filling `gap` and inserting `shape`,
// `invest` and `mandate`, which lengthens `LEADER_SPINE` and leaves these rows
// alone.
const CASES: readonly DeckCase[] = [
  { brand: "berau", deckSet: "standard" },
  { brand: "gems", deckSet: "standard" },
  { brand: "general", deckSet: "standard" },
  { brand: "berau", deckSet: "leader" },
  { brand: "gems", deckSet: "leader" },
];

function expectedRuns({ brand, deckSet }: DeckCase): readonly SectionRun[] {
  switch (deckSet) {
    case "standard":
      return standardRuns(brand);
    case "leader":
      return leaderRuns(brand);
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

function runsOf(slides: readonly SlideDef[]): Array<[SectionKey, number]> {
  return slides.reduce<Array<[SectionKey, number]>>((runs, s) => {
    const last = runs.at(-1);
    if (last && last[0] === s.sectionKey) last[1] += 1;
    else runs.push([s.sectionKey, 1]);
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

test(`the spine plus a practice-lab run is the ${OBSERVED_TOTAL_WITH_LAB} slides observed live`, () => {
  expect(totalOf(standardRuns("berau"))).toBe(OBSERVED_TOTAL_WITH_LAB);
});

test(`the leader spine is ${LEADER_TOTAL_WITH_LAB} slides — the cut F section, plus its own`, () => {
  expect(totalOf(leaderRuns("berau"))).toBe(LEADER_TOTAL_WITH_LAB);
  // The two tables have to disagree by exactly the cut MINUS the additions. Eight
  // cut and not nine: `f8-your-agentic-os` is kept and relocated, so the cut is
  // `f1`–`f7` plus `f9`. One addition, and it is `gap` (gh#53).
  expect(OBSERVED_TOTAL_WITH_LAB - LEADER_TOTAL_WITH_LAB).toBe(
    LEADER_CUT_F_SLIDES - LEADER_ONLY_SLIDES,
  );
  // Asserted from the run table too, so the arithmetic above cannot be satisfied
  // by a cut F slide quietly coming back while a `gap` slide quietly leaves.
  const standardKeys = standardRuns("berau").map(([key]) => key);
  expect(
    leaderRuns("berau")
      .filter(([key]) => !standardKeys.includes(key))
      .reduce((n, [, length]) => n + length, 0),
  ).toBe(LEADER_ONLY_SLIDES);
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
      const at = `${variant} slide ${i} (${s.id})`;
      expect(typeof s.render, at).toBe("function");
      expect(s.steps, at).toBeGreaterThan(0);
      expect(s.canonicalPose, at).toBeGreaterThanOrEqual(0);
      expect(s.canonicalPose, at).toBeLessThan(s.steps);
    });
  });

  test("excludes the dev-only hex-ladder slide, so the last authored section closes the deck", () => {
    expect(deckSlides).not.toContain(hexLadderDevSlide);
    expect(deckSlides.at(-1)?.sectionKey).toBe(expectedRuns(deckCase).at(-1)?.[0]);
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
    expect(runsOf(deckSlides).at(-1)).toEqual(["lab", PRACTICE_LAB_RUN]);
  });
});
