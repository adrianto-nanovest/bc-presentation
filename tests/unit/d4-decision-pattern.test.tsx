import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { D4DecisionPattern, d4Slide } from "@/slides/foundation-core/d4-decision-pattern";

test("D.4 declares 5 steps with canonicalPose=4", () => {
  expect(d4Slide.steps).toBe(5);
  expect(d4Slide.canonicalPose).toBe(4);
});

test("D.4 renders the FIG label, headline, the LadderRise diagram, and the footer caption", () => {
  render(
    <DeckProvider stepCounts={[d4Slide.steps]}>
      <D4DecisionPattern />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. D\.4 · WHICH LEVEL, WHEN/)).toBeInTheDocument();
  expect(screen.getByText(/Each level builds/)).toBeInTheDocument();
  expect(screen.getByTestId("ladder-rise")).toBeInTheDocument();
  expect(screen.getByText(/fails harder/)).toBeInTheDocument();
});
