import { describe, expect, test } from "vitest";
import { foundationCoreSlides } from "@/slides/foundation-core";

describe("foundationCoreSlides", () => {
  test("exports the 5 Section D slides in the spec'd order", () => {
    expect(foundationCoreSlides).toHaveLength(5);
    expect(foundationCoreSlides[0].steps).toBe(3);   // D.1 — trap (3 steps)
    expect(foundationCoreSlides[1].steps).toBe(3);   // D.2 — convergence (3 steps)
    expect(foundationCoreSlides[2].steps).toBe(5);   // D.3 — one process · four levels (5 steps)
    expect(foundationCoreSlides[3].steps).toBe(6);   // D.4 — which level · when (6 steps)
    expect(foundationCoreSlides[4].steps).toBe(3);   // D.5 — bridge to E (3 steps)
  });

  test("total advances after revamp = 20", () => {
    const total = foundationCoreSlides.reduce((s, x) => s + x.steps, 0);
    expect(total).toBe(20);
  });
});
