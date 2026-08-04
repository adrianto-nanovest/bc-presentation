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
// (gh#40). `slice(-3)` still reads the K run, because K still closes the deck.
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

// ── Leader deck sets still render the standard deck ──────────────────────────
// Deliberate, and stated as such in gh#22: only the `· Leadership` suffix
// separates a leader variant from its middle-management sibling until Phase 4
// composes the real leader deck. Phase 4 is expected to change this test.
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

describe("leader deck sets, before Phase 4", () => {
  test("compose exactly the same slides as their brand's standard deck", async () => {
    expect(await deckShapeFor("berau-leader")).toEqual(
      await deckShapeFor("berau-middle-mgmt"),
    );
    expect(await deckShapeFor("gems-leader")).toEqual(
      await deckShapeFor("gems-middle-mgmt"),
    );
  });

  test("a practice-lab brand's deck is exactly K.1 + K.2 longer than general's", async () => {
    const gems = await deckShapeFor("gems-middle-mgmt");
    const general = await deckShapeFor("general");
    expect(gems.length - general.length).toBe(2);
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
  test("is K.3 where the practice lab runs, K.1 where it does not", async () => {
    expect(await closerFigLabelFor("gems-middle-mgmt")).toMatch(/FIG\.\s*K\.3/);
    expect(await closerFigLabelFor("berau-leader")).toMatch(/FIG\.\s*K\.3/);
    expect(await closerFigLabelFor("general")).toMatch(/FIG\.\s*K\.1/);
  });
});
