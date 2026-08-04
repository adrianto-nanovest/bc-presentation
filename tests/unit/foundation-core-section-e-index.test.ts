import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";

test("Plan B — section E exports all 13 slides E.1..E.13 in order", () => {
  expect(foundationCoreSectionESlides).toHaveLength(13);
  const stepCounts = foundationCoreSectionESlides.map((s) => s.steps);
  // E.1 is 5, not 4: spec §8.2 (gh#45) added the orbit pose that names THE LOOP.
  // The 1 in twelfth place is E.12 · LOOP ENGINEERING at gh#48's slice — pose 0,
  // the mindset diptych, alone. gh#49 raises it to 3 as poses 1 and 2 land.
  expect(stepCounts).toEqual([5, 6, 3, 4, 2, 4, 3, 6, 2, 5, 2, 1, 2]);
});

test("every Section E slide is dark-surface step-reveal", () => {
  for (const s of foundationCoreSectionESlides) {
    expect(s.surface ?? "dark").toBe("dark");
    expect(s.animationMode).toBe("step-reveal");
  }
});

test("Section E total advances = 45 (post E.12 pose 0)", () => {
  const total = foundationCoreSectionESlides.reduce((acc, s) => acc + s.steps, 0);
  expect(total).toBe(45);
});
