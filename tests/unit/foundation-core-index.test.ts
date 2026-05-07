import { describe, expect, test } from "vitest";
import { foundationCoreSlides } from "@/slides/foundation-core";

describe("foundationCoreSlides", () => {
  test("exports the 5 Section D slides in the spec'd order", () => {
    expect(foundationCoreSlides).toHaveLength(5);
    expect(foundationCoreSlides[0].steps).toBe(4);   // D.1
    expect(foundationCoreSlides[1].steps).toBe(5);   // D.2
    expect(foundationCoreSlides[2].steps).toBe(5);   // D.3
    expect(foundationCoreSlides[3].steps).toBe(5);   // D.4
    expect(foundationCoreSlides[4].steps).toBe(3);   // D.5
  });

  test("total advances per spec §6 = 22", () => {
    const total = foundationCoreSlides.reduce((s, x) => s + x.steps, 0);
    expect(total).toBe(22);
  });
});
