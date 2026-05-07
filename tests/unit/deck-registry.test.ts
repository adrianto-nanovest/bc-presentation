import { describe, expect, test } from "vitest";
import { deckSlides, hexLadderDevSlide } from "@/deck/registry";

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
});
