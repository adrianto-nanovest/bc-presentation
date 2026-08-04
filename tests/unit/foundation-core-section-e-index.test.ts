import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";

test("Plan B — section E exports all 12 slides E.1..E.12 in order", () => {
  expect(foundationCoreSectionESlides).toHaveLength(12);
  const stepCounts = foundationCoreSectionESlides.map((s) => s.steps);
  // E.1 is 5, not 4: spec §8.2 (gh#45) added the orbit pose that names THE LOOP.
  expect(stepCounts).toEqual([5, 6, 3, 4, 2, 4, 3, 6, 2, 5, 2, 2]);
});

test("every Section E slide is dark-surface step-reveal", () => {
  for (const s of foundationCoreSectionESlides) {
    expect(s.surface ?? "dark").toBe("dark");
    expect(s.animationMode).toBe("step-reveal");
  }
});

test("Section E total advances = 44 (post E.1 orbit pose)", () => {
  const total = foundationCoreSectionESlides.reduce((acc, s) => acc + s.steps, 0);
  expect(total).toBe(44);
});
