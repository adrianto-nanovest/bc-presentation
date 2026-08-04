// The client consumers of the variant table: the title-slide workshop chip,
// A.1's hook (brand-driven) and Practice-Lab inclusion (`practiceLab`-driven).
//
// `VARIANT` resolves once at module scope, so each case re-points
// `window.location` and then resets the module registry. Every module a case
// needs is imported AFTER that reset, in the same epoch, so identity
// comparisons between a deck list and a slide module hold.
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import type { VariantId } from "@/deck-variants";

const realLocation = window.location;

function useVariant(id: VariantId): void {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(`http://localhost:5173/?variant=${id}`),
  });
  vi.resetModules();
}

beforeEach(() => vi.resetModules());

afterEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: realLocation,
  });
});

// ── Title-slide workshop chip ────────────────────────────────────────────────

async function chipTextFor(id: VariantId): Promise<string> {
  useVariant(id);
  cleanup(); // several variants are checked inside one test case
  const { Title } = await import("@/slides/opening-section-a/title");
  const { container } = render(<Title />);
  const chip = container.querySelector('[data-testid="title-workshop-chip"]');
  expect(chip, `no workshop chip rendered for ${id}`).not.toBeNull();
  return chip?.textContent ?? "";
}

describe("title-slide workshop chip", () => {
  test("is the brand label, with the leader suffix only on leader deck sets", async () => {
    expect(await chipTextFor("berau-middle-mgmt")).toBe("Berau AI Catalyst Workshop");
    expect(await chipTextFor("berau-leader")).toBe(
      "Berau AI Catalyst Workshop · Leadership",
    );
    expect(await chipTextFor("gems-middle-mgmt")).toBe("GEMS AI Catalyst Workshop");
    expect(await chipTextFor("gems-leader")).toBe("GEMS AI Catalyst Workshop · Leadership");
    expect(await chipTextFor("general")).toBe("AI Catalyst Workshop");
  });

  test("berau no longer advertises 'Vol 2, Session 2' (accepted copy change, #6)", async () => {
    expect(await chipTextFor("berau-middle-mgmt")).not.toMatch(/Vol 2/);
  });
});

// ── A.1 hook, selected by brand ──────────────────────────────────────────────

// READ OFF THE COMPOSED DECK, not off a section index module. Until gh#40 the
// brand pick lived in `@/slides/opening-section-a`, which handed the deck the
// cover plus one A.1; the deck set now owns the order and `@/deck/slots.ts` the
// pick, so `deckSlides` is where the answer is. The assertions below are
// unchanged — `slides[1]` is still the A.1 this brand runs.
async function openingFor(id: VariantId) {
  useVariant(id);
  const [registry, berauA1, generalA1, gemsA1] = await Promise.all([
    import("@/deck/registry"),
    import("@/slides/opening-section-a/a1-what-youve-seen"),
    import("@/slides/opening-section-a/a1-general"),
    import("@/slides/opening-section-a/a1-gems"),
  ]);
  return {
    slides: registry.deckSlides,
    a1Slide: berauA1.a1Slide,
    a1GeneralSlide: generalA1.a1GeneralSlide,
    a1GemsSlide: gemsA1.a1GemsSlide,
  };
}

describe("A.1 hook selection", () => {
  test("each brand gets its own hook: berau the winners, gems the portfolio, general familiarity", async () => {
    for (const id of ["berau-middle-mgmt", "berau-leader"] as VariantId[]) {
      const { slides, a1Slide, a1GemsSlide } = await openingFor(id);
      expect(slides[1], id).toBe(a1Slide);
      expect(slides[1], id).not.toBe(a1GemsSlide);
    }
    // Both GEMS deck sets, since §5 ships every brand delta to `gems-leader`
    // too — leaders run the same practice lab (gh#25). The negative assertions
    // are not implied by the positives: were the three slide defs ever aliased
    // to one object, every positive here would still pass.
    for (const id of ["gems-middle-mgmt", "gems-leader"] as VariantId[]) {
      const { slides, a1GemsSlide, a1Slide, a1GeneralSlide } = await openingFor(id);
      expect(slides[1], id).toBe(a1GemsSlide);
      expect(slides[1], id).not.toBe(a1Slide);
      expect(slides[1], id).not.toBe(a1GeneralSlide);
    }
    const { slides, a1GeneralSlide, a1GemsSlide } = await openingFor("general");
    expect(slides[1]).toBe(a1GeneralSlide);
    expect(slides[1]).not.toBe(a1GemsSlide);
  });

  test("the opening is always the cover plus exactly one A.1", async () => {
    const { slides, a1Slide, a1GeneralSlide, a1GemsSlide } =
      await openingFor("gems-middle-mgmt");
    // Counted rather than length-checked, because the deck no longer ENDS after
    // the opening: the claim is that the three alternates share one slot, so
    // exactly one of them composes — the failure this guards is two A.1s, which
    // a `slides[1]` assertion would not see.
    const alternates = [a1Slide, a1GeneralSlide, a1GemsSlide];
    expect(slides.filter((s) => alternates.includes(s))).toHaveLength(1);
    expect(slides[0].numbered).toBe(false); // the cover, still first
  });
});

// ── Practice Lab inclusion, driven by the brand's `practiceLab` flag ─────────

// The composed deck again, for the same reason: `practiceLab` inclusion and the
// K.2 pick moved out of `@/slides/reveal-and-closing` and into `@/deck/slots.ts`
// (gh#40). `slice(-3)` still reads the lab run, because the lab still closes every
// deck — at K in a standard deck and at J in a leader deck, which is why this
// helper names neither letter.
async function closingFor(id: VariantId) {
  useVariant(id);
  const [registry, k1, k2, k2Gems, k3] = await Promise.all([
    import("@/deck/registry"),
    import("@/slides/reveal-and-closing/k1-challenge-handoff"),
    import("@/slides/reveal-and-closing/k2-practice-lab-overview"),
    import("@/slides/reveal-and-closing/k2-gems"),
    import("@/slides/reveal-and-closing/k3-thank-you"),
  ]);
  return {
    slides: registry.deckSlides,
    k1Slide: k1.k1Slide,
    k2Slide: k2.k2Slide,
    k2GemsSlide: k2Gems.k2GemsSlide,
    k3Slide: k3.k3Slide,
  };
}

describe("Practice Lab slides", () => {
  test("brands with a practice lab keep K.1 + K.2 before the closer", async () => {
    for (const id of ["berau-middle-mgmt", "berau-leader"] as VariantId[]) {
      const { slides, k1Slide, k2Slide, k3Slide } = await closingFor(id);
      expect(slides.slice(-3), id).toEqual([k1Slide, k2Slide, k3Slide]);
    }
    // GEMS runs one track, so its part 2 is THE ANALYST — a brand delta shipped
    // to `gems-leader` too, since leaders run the same lab (gh#26).
    for (const id of ["gems-middle-mgmt", "gems-leader"] as VariantId[]) {
      const { slides, k1Slide, k2GemsSlide, k3Slide } = await closingFor(id);
      expect(slides.slice(-3), id).toEqual([k1Slide, k2GemsSlide, k3Slide]);
    }
  });

  test("the GEMS K.2 reaches neither berau nor general", async () => {
    for (const id of ["berau-middle-mgmt", "berau-leader", "general"] as VariantId[]) {
      const { slides, k2GemsSlide } = await closingFor(id);
      expect(slides, id).not.toContain(k2GemsSlide);
    }
  });

  test("general drops K.1 + K.2 and closes on the thank-you", async () => {
    const { slides, k1Slide, k2Slide, k3Slide } = await closingFor("general");
    expect(slides).not.toContain(k1Slide);
    expect(slides).not.toContain(k2Slide);
    expect(slides.at(-1)).toBe(k3Slide);
  });
});

// ── The leader deck sets compose their OWN deck ───────────────────────────────
// gh#41. Until Phase 4 both leader variants pointed at the standard slide list
// and only the `· Leadership` suffix separated them, and the block here said so.
// The leader deck now exists: the same curriculum, minus section F, with
// `f8-your-agentic-os` kept and relocated into the TOOLS run.
//
// WHAT IS ASSERTED WHERE. The composed SHAPE — which runs, in what order, at what
// size — belongs to `deck-registry.test.ts`, and the printed letters and numbers
// to the numbering fixture. This file owns WHICH SLIDE, by identity: the cut, the
// survivor, and each brand's own alternates inside a leader deck.
//
// `render` closures are re-created by each module epoch, so identity cannot
// cross a `resetModules()`; this fingerprints the composition instead.
async function deckShapeFor(id: VariantId): Promise<string[]> {
  useVariant(id);
  const { deckSlides } = await import("@/deck/registry");
  return deckSlides.map(
    (s) => `${s.sectionKey}:${s.steps}:${s.canonicalPose}:${s.animationMode}:${s.surface}`,
  );
}

/** Slide ids in composed order — the granularity the cut is stated at, since two
 *  slides can share a shape fingerprint but never an id. */
async function deckIdsFor(id: VariantId): Promise<string[]> {
  useVariant(id);
  const { deckSlides } = await import("@/deck/registry");
  return deckSlides.map((s) => s.id);
}

/** The eight section-F slides the leader deck cuts. `f8-your-agentic-os` is NOT
 *  among them — it is the one that survives, which is the whole reason this list
 *  is spelled out rather than derived from an `f`-prefix. */
const CUT_F_IDS = [
  "f1-two-pillars",
  "f2-rag-ground-truth",
  "f3-plugins-the-package",
  "f4-skills-write-once",
  "f5-mcp-the-adapter",
  "f6-hooks-unsexy-work",
  "f7-subagents-specialists",
  "f9-bridge-to-g",
] as const;

const LEADER_IDS: VariantId[] = ["berau-leader", "gems-leader"];

describe("leader deck sets", () => {
  test("cut section F but keep the relocated F.8", async () => {
    for (const id of LEADER_IDS) {
      const ids = await deckIdsFor(id);
      expect(ids.filter((slide) => CUT_F_IDS.includes(slide as never)), id).toEqual([]);
      expect(ids, id).toContain("f8-your-agentic-os");
      // Its neighbours are the composition fact the `sectionOverrides` entry
      // exists to produce: f8 sits between the last TOOLS slide and the bridge
      // out of TOOLS, not back in a section of its own.
      const at = ids.indexOf("f8-your-agentic-os");
      expect(ids[at - 1], id).toBe("g10-beyond-big-three");
      expect(ids[at + 1], id).toBe("g11-bridge-to-h");
    }
  });

  // NOT ASSERTED HERE: that a leader deck is eight slides shorter. That is a
  // count, `deck-registry.test.ts` owns counts, and it already holds both leader
  // decks against their run-length encoding and the standard deck against the
  // same eight. Restating it here would load two more module epochs — the
  // expensive part of this file — to re-prove another file's claim.

  test("still take their own brand's A.1 and K.2, by identity", async () => {
    // The brand axis and the deck-set axis are independent (§4.4), and this is
    // the assertion that says so: a leader deck is not "the general deck with a
    // suffix". Object identity, not copy — an alternate aliased to the canonical
    // slide would satisfy any text-level check.
    const berau = await openingFor("berau-leader");
    expect(berau.slides[1]).toBe(berau.a1Slide);

    const gems = await openingFor("gems-leader");
    expect(gems.slides[1]).toBe(gems.a1GemsSlide);
    expect(gems.slides[1]).not.toBe(gems.a1Slide);

    const gemsClosing = await closingFor("gems-leader");
    expect(gemsClosing.slides.slice(-3)).toEqual([
      gemsClosing.k1Slide,
      gemsClosing.k2GemsSlide,
      gemsClosing.k3Slide,
    ]);
  });

  test("a practice-lab brand's deck is exactly K.1 + K.2 longer than general's", async () => {
    const gems = await deckShapeFor("gems-middle-mgmt");
    const general = await deckShapeFor("general");
    expect(gems.length - general.length).toBe(2);
  });
});

// ── E.12's beat 2 names the section E hands off to ────────────────────────────
// §4.3, gh#41. The standard deck runs F · TECHNIQUES next; the leader deck cuts F,
// so its next section is TOOLS ECOSYSTEM and beat 2 says so. Deck-set-scoped copy,
// resolved by a typed pick in section E's own content module — `sectionOverrides`
// carries composition facts only (§4.1).
//
// Read off the RENDERED slide, in the variant's own epoch: `e12Content` is data,
// and asserting the data against itself would pass even if the slide printed the
// other line.
async function bridgeBeat2For(id: VariantId): Promise<string> {
  useVariant(id);
  cleanup();
  const [{ DeckProvider }, { SlideNumberProvider }, { composedDeck }, e12] = await Promise.all([
    import("@/deck/DeckContext"),
    import("@/deck/SlideNumberContext"),
    import("@/deck/registry"),
    import("@/slides/foundation-core-section-e/e12-bridge-to-f"),
  ]);
  const row = composedDeck.slides.find((s) => s.def.id === "e12-bridge-to-f");
  if (!row) throw new Error(`the section-E bridge is not in ${id}'s composed deck`);
  const { container } = render(
    <DeckProvider stepCounts={[e12.e12Slide.steps]}>
      <SlideNumberProvider
        value={{ letter: row.letter, num: row.num, sectionKey: row.sectionKey }}
      >
        <e12.E12BridgeToF />
      </SlideNumberProvider>
    </DeckProvider>,
  );
  return container.querySelector('[data-testid="e12-beat2"]')?.textContent ?? "";
}

describe("the section-E bridge's beat 2", () => {
  test("names the techniques in every standard deck", async () => {
    for (const id of [
      "berau-middle-mgmt",
      "gems-middle-mgmt",
      "general",
    ] as VariantId[]) {
      expect(await bridgeBeat2For(id), id).toBe("Next: the techniques that matter most.");
    }
  });

  test("names the platforms in both leader decks, where section F is cut", async () => {
    for (const id of LEADER_IDS) {
      expect(await bridgeBeat2For(id), id).toBe(
        "Next: the platforms that bring them to life.",
      );
    }
  });
});

// ── The closer's figure number follows that same flag ────────────────────────

// The closer's number is DERIVED as of §3.5 (gh#35) — `k3-thank-you.tsx` used to
// compute it from `BRANDS[VARIANT.brand].practiceLab`, and now prints whatever
// its position in that brand's composed deck gives it. So this reads the number
// out of the same brand-specific composed deck the app would, and the K.3/K.1
// split below is the composer's own output rather than a restated flag.
//
// FOUR MODULES, ONE EPOCH — including `SlideNumberContext`. A React context is
// an object identity, so importing the provider from outside this epoch would
// hand `K3ThankYou` a different context than its `FigLabel` reads, and the
// render would throw "outside a provider".
async function closerFigLabelFor(id: VariantId): Promise<string> {
  useVariant(id);
  const [{ DeckProvider }, { SlideNumberProvider }, { composedDeck }, { K3ThankYou, k3Slide }] =
    await Promise.all([
      import("@/deck/DeckContext"),
      import("@/deck/SlideNumberContext"),
      import("@/deck/registry"),
      import("@/slides/reveal-and-closing/k3-thank-you"),
    ]);
  const row = composedDeck.slides.find((s) => s.def === k3Slide);
  if (!row) throw new Error(`the closer is not in ${id}'s composed deck`);
  const { container } = render(
    <DeckProvider stepCounts={[k3Slide.steps]}>
      <SlideNumberProvider
        value={{ letter: row.letter, num: row.num, sectionKey: row.sectionKey }}
      >
        <K3ThankYou />
      </SlideNumberProvider>
    </DeckProvider>,
  );
  return container.querySelector(".fig-label")?.textContent ?? "";
}

describe("thank-you closer figure number", () => {
  // TWO INDEPENDENT DERIVATIONS, and the cases below separate them: the brand's
  // `practiceLab` flag decides the NUMBER (a lab run of 3 closes on .3, a run of
  // 1 on .1), and the run's position decides the LETTER.
  test("is .3 where the practice lab runs and .1 where it does not", async () => {
    expect(await closerFigLabelFor("gems-middle-mgmt")).toMatch(/FIG\.\s*K\.3/);
    expect(await closerFigLabelFor("general")).toMatch(/FIG\.\s*K\.1/);
  });

  test("sits one letter earlier in a leader deck, which cuts section F", async () => {
    // Same three lab slides — leaders run the same lab — at J instead of K,
    // because gh#41's cut leaves the leader deck ten sections. Nothing renumbered
    // the closer; the letter is a function of position (§3.4 R2).
    //
    // ONE leader deck, not both: this asserts the letter a POSITION produces, and
    // the two leader decks share the position. That the other one records J.3 too
    // is in the numbering fixture, which pays no epoch cost to say so.
    expect(await closerFigLabelFor("berau-leader")).toMatch(/FIG\.\s*J\.3/);
  });
});
