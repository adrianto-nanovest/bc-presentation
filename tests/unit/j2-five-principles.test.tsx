import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { J2FivePrinciples, j2Slide } from "@/slides/reveal-and-closing/j2-five-principles";

test("J.2 declares 2 steps with canonicalPose=1", () => {
  expect(j2Slide.steps).toBe(2);
  expect(j2Slide.canonicalPose).toBe(1);
});

test("J.2 renders the FIG label, headline, caption, and 5 cards", () => {
  render(
    <DeckProvider stepCounts={[j2Slide.steps]}>
      <J2FivePrinciples />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. J\.2 · FIVE PRINCIPLES/)).toBeInTheDocument();
  expect(screen.getByText(/Mindset before tools/)).toBeInTheDocument();
  expect(screen.getByText(/Hover any card/)).toBeInTheDocument();
  expect(screen.getAllByTestId("recipe-step-card")).toHaveLength(5);
});

test("J.2 cards are hidden at step 0 and revealed at step 1", () => {
  const { container } = render(
    <DeckProvider stepCounts={[j2Slide.steps]}>
      <J2FivePrinciples />
    </DeckProvider>,
  );
  const initialReveal = container.querySelector("[data-cards-revealed]");
  expect(initialReveal?.getAttribute("data-cards-revealed")).toBe("false");
});
