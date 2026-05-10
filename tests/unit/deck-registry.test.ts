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

  test("hexLadderDevSlide is the last entry so projection-test can target it via the slide-count tail", () => {
    expect(deckSlides[deckSlides.length - 1]).toBe(hexLadderDevSlide);
  });

  test("every slide carries a valid section tag", () => {
    const valid: ReadonlyArray<SlideSection> = ["D", "E", "I", "J", "K"];
    deckSlides.forEach((s, i) => {
      expect(valid, `slide ${i} has invalid section ${String(s.section)}`).toContain(s.section);
    });
  });

  test("section progression matches deck order: D x5, E x11, I x4, J x4, K x1, K x1 (hexLadder)", () => {
    const expected: SlideSection[] = [
      ...Array<SlideSection>(5).fill("D"),
      ...Array<SlideSection>(11).fill("E"),
      ...Array<SlideSection>(4).fill("I"),
      ...Array<SlideSection>(4).fill("J"),
      ...Array<SlideSection>(1).fill("K"),
      ...Array<SlideSection>(1).fill("K"), // hexLadderDevSlide
    ];
    expect(deckSlides.map((s) => s.section)).toEqual(expected);
  });
});
