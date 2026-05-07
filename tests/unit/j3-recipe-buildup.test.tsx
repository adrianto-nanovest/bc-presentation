import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { J3RecipeBuildup, j3Slide } from "@/slides/reveal-and-closing/j3-recipe-buildup";

test("J.3 declares 4 steps with canonicalPose=3", () => {
  expect(j3Slide.steps).toBe(4);
  expect(j3Slide.canonicalPose).toBe(3);
});

test("J.3 renders FIG label, headline, 3 cards, and 2 down connectors", () => {
  render(
    <DeckProvider stepCounts={[j3Slide.steps]}>
      <J3RecipeBuildup />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. J\.3 · BUILDING YOURSELF UP/)).toBeInTheDocument();
  expect(screen.getByText(/Habits before output/)).toBeInTheDocument();
  expect(screen.getAllByTestId("recipe-step-card")).toHaveLength(3);
  const conns = screen.getAllByTestId("step-connector");
  expect(conns).toHaveLength(2);
  conns.forEach((c) => expect(c.getAttribute("data-direction")).toBe("down"));
});
