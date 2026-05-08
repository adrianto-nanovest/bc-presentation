import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";

test("Plan B — section E exports all 11 slides E.1..E.11 in order", () => {
  expect(foundationCoreSectionESlides).toHaveLength(11);
  const stepCounts = foundationCoreSectionESlides.map((s) => s.steps);
  expect(stepCounts).toEqual([7, 5, 4, 4, 4, 4, 5, 4, 5, 3, 2]);
});

test("every Section E slide is dark-surface step-reveal", () => {
  for (const s of foundationCoreSectionESlides) {
    expect(s.surface ?? "dark").toBe("dark");
    expect(s.animationMode).toBe("step-reveal");
  }
});

test("Section E total advances = 47 (per spec §6)", () => {
  const total = foundationCoreSectionESlides.reduce((acc, s) => acc + s.steps, 0);
  expect(total).toBe(47);
});
