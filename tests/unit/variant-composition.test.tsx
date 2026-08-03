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

async function openingFor(id: VariantId) {
  useVariant(id);
  const [opening, berauA1, generalA1] = await Promise.all([
    import("@/slides/opening-section-a"),
    import("@/slides/opening-section-a/a1-what-youve-seen"),
    import("@/slides/opening-section-a/a1-general"),
  ]);
  return {
    slides: opening.openingSectionASlides,
    a1Slide: berauA1.a1Slide,
    a1GeneralSlide: generalA1.a1GeneralSlide,
  };
}

describe("A.1 hook selection", () => {
  test("general gets the familiarity hook; berau and gems get the winners hook", async () => {
    for (const id of ["berau-middle-mgmt", "berau-leader"] as VariantId[]) {
      const { slides, a1Slide } = await openingFor(id);
      expect(slides[1], id).toBe(a1Slide);
    }
    for (const id of ["gems-middle-mgmt", "gems-leader"] as VariantId[]) {
      const { slides, a1Slide } = await openingFor(id);
      expect(slides[1], id).toBe(a1Slide);
    }
    const { slides, a1GeneralSlide } = await openingFor("general");
    expect(slides[1]).toBe(a1GeneralSlide);
  });

  test("the opening is always the cover plus exactly one A.1", async () => {
    const { slides } = await openingFor("gems-middle-mgmt");
    expect(slides).toHaveLength(2);
  });
});

// ── Practice Lab inclusion, driven by the brand's `practiceLab` flag ─────────

async function closingFor(id: VariantId) {
  useVariant(id);
  const [closing, k1, k2, k3] = await Promise.all([
    import("@/slides/reveal-and-closing"),
    import("@/slides/reveal-and-closing/k1-challenge-handoff"),
    import("@/slides/reveal-and-closing/k2-practice-lab-overview"),
    import("@/slides/reveal-and-closing/k3-thank-you"),
  ]);
  return {
    slides: closing.revealAndClosingSlides,
    k1Slide: k1.k1Slide,
    k2Slide: k2.k2Slide,
    k3Slide: k3.k3Slide,
  };
}

describe("Practice Lab slides", () => {
  test("brands with a practice lab keep K.1 + K.2 before the closer", async () => {
    for (const id of [
      "berau-middle-mgmt",
      "berau-leader",
      "gems-middle-mgmt",
      "gems-leader",
    ] as VariantId[]) {
      const { slides, k1Slide, k2Slide, k3Slide } = await closingFor(id);
      expect(slides.slice(-3), id).toEqual([k1Slide, k2Slide, k3Slide]);
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
    (s) => `${s.section}:${s.steps}:${s.canonicalPose}:${s.animationMode}:${s.surface}`,
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

async function closerFigLabelFor(id: VariantId): Promise<string> {
  useVariant(id);
  const [{ DeckProvider }, { K3ThankYou, k3Slide }] = await Promise.all([
    import("@/deck/DeckContext"),
    import("@/slides/reveal-and-closing/k3-thank-you"),
  ]);
  const { container } = render(
    <DeckProvider stepCounts={[k3Slide.steps]}>
      <K3ThankYou />
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
