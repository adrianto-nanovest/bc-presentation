import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { J4RecipeShip, j4Slide } from "@/slides/reveal-and-closing/j4-recipe-ship";

test("J.4 declares 4 steps with canonicalPose=3", () => {
  expect(j4Slide.steps).toBe(4);
  expect(j4Slide.canonicalPose).toBe(3);
});

test("J.4 renders 3 cards, 2 forward connectors, and 2 loop-back connectors", () => {
  render(
    <DeckProvider stepCounts={[j4Slide.steps]}>
      <J4RecipeShip />
    </DeckProvider>,
  );
  expect(screen.getAllByTestId("recipe-step-card")).toHaveLength(3);
  const conns = screen.getAllByTestId("step-connector");
  const directions = conns.map((c) => c.getAttribute("data-direction"));
  expect(directions.filter((d) => d === "forward")).toHaveLength(2);
  expect(directions.filter((d) => d === "loopBack")).toHaveLength(2);
});

test("J.4 loop-back connectors carry data-ambient=backward for the signature ambient", () => {
  render(
    <DeckProvider stepCounts={[j4Slide.steps]}>
      <J4RecipeShip />
    </DeckProvider>,
  );
  const loops = screen
    .getAllByTestId("step-connector")
    .filter((c) => c.getAttribute("data-direction") === "loopBack");
  loops.forEach((l) =>
    expect(l.getAttribute("data-ambient")).toBe("backward"),
  );
});
