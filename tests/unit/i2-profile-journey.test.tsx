// tests/unit/i2-profile-journey.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { I2ProfileJourney, i2Slide } from "@/slides/reveal-and-closing/i2-profile-journey";

test("I.2 declares 5 steps with canonicalPose=4", () => {
  expect(i2Slide.steps).toBe(5);
  expect(i2Slide.canonicalPose).toBe(4);
});

test("I.2 renders FIG label, name, role, delivery line, credentials, and 3 timeline anchors", () => {
  render(
    <DeckProvider stepCounts={[i2Slide.steps]}>
      <I2ProfileJourney />
    </DeckProvider>,
  );
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*I\.2.*THE JOURNEY/i);
  expect(screen.getByText(/ADRIANTO TEDJOKUSUMO/)).toBeInTheDocument();
  expect(screen.getByText(/13 years tech delivery/)).toBeInTheDocument();
  expect(screen.getByText(/ITB Electrical Eng/)).toBeInTheDocument();
  expect(screen.getAllByTestId("timeline-anchor")).toHaveLength(3);
});
