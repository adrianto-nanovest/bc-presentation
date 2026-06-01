import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";

test("Plan B — section E exports all 12 slides E.1..E.12 in order", () => {
  expect(foundationCoreSectionESlides).toHaveLength(12);
  const stepCounts = foundationCoreSectionESlides.map((s) => s.steps);
  expect(stepCounts).toEqual([4, 6, 3, 4, 2, 4, 3, 6, 2, 5, 2, 2]);
});

test("every Section E slide is dark-surface step-reveal", () => {
  for (const s of foundationCoreSectionESlides) {
    expect(s.surface ?? "dark").toBe("dark");
    expect(s.animationMode).toBe("step-reveal");
  }
});

test("Section E total advances = 43 (post E5-examples insert)", () => {
  const total = foundationCoreSectionESlides.reduce((acc, s) => acc + s.steps, 0);
  expect(total).toBe(43);
});
