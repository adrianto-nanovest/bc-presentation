import { describe, expect, test } from "vitest";
import { deckSlides, hexLadderDevSlide } from "@/deck/registry";
import type { SlideSection } from "@/deck/types";

describe("deck registry", () => {
  test("exports a non-empty ordered array of SlideDef", () => {
    expect(Array.isArray(deckSlides)).toBe(true);
    expect(deckSlides.length).toBeGreaterThan(0);
    deckSlides.forEach((s, i) => {
      expect(typeof s.steps).toBe("number");
      expect(typeof s.canonicalPose).toBe("number");
      expect(typeof s.render).toBe("function");
      expect(s.canonicalPose).toBeLessThan(s.steps);
      expect(s.canonicalPose).toBeGreaterThanOrEqual(0);
      expect(i).toBeGreaterThanOrEqual(0);
    });
  });

  test("hexLadderDevSlide is excluded from deckSlides so K1 remains the final audience slide", () => {
    expect(deckSlides).not.toContain(hexLadderDevSlide);
  });

  test("every slide carries a valid section tag", () => {
    const valid: ReadonlyArray<SlideSection> = [
      "A", "B", "C", "D", "E", "F", "I", "J", "K",
    ];
    deckSlides.forEach((s, i) => {
      expect(valid, `slide ${i} has invalid section ${String(s.section)}`).toContain(s.section);
    });
  });

  test("section progression matches deck order: A x2, B x5, C x6, D x5, E x12, F x9, I x4, J x4, K x1, K x1 (hexLadder)", () => {
    // Title slide is grouped under section "A" (see opening-section-a/index.ts).
    const expected: SlideSection[] = [
      ...Array<SlideSection>(2).fill("A"),  // Title + A.1
      ...Array<SlideSection>(5).fill("B"),
      ...Array<SlideSection>(6).fill("C"),  // C.1–C.5 + bridge
      ...Array<SlideSection>(5).fill("D"),
      ...Array<SlideSection>(12).fill("E"),
      ...Array<SlideSection>(9).fill("F"),
      ...Array<SlideSection>(4).fill("I"),
      ...Array<SlideSection>(4).fill("J"),
      ...Array<SlideSection>(1).fill("K"),
      ...Array<SlideSection>(1).fill("K"), // hexLadderDevSlide
    ];
    expect(deckSlides.map((s) => s.section)).toEqual(expected);
  });
});
