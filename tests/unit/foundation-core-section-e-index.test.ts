import { foundationCoreSectionESlides } from "@/slides/foundation-core-section-e";

test("Plan A — section E exports E.1..E.5 in order", () => {
  expect(foundationCoreSectionESlides).toHaveLength(5);
  // Expected canonical step counts per spec §6 / §1.1.
  expect(foundationCoreSectionESlides[0].steps).toBe(7); // E.1
  expect(foundationCoreSectionESlides[1].steps).toBe(5); // E.2
  expect(foundationCoreSectionESlides[2].steps).toBe(4); // E.3
  expect(foundationCoreSectionESlides[3].steps).toBe(4); // E.4
  expect(foundationCoreSectionESlides[4].steps).toBe(4); // E.5
});

test("every Plan A slide is dark-surface step-reveal", () => {
  for (const s of foundationCoreSectionESlides) {
    expect(s.surface ?? "dark").toBe("dark");
    expect(s.animationMode).toBe("step-reveal");
  }
});
