import { render, screen } from "@testing-library/react";
import { RecipeStepCard } from "@/slides/reveal-and-closing/components/RecipeStepCard";

test("RecipeStepCard renders number, headline, and sub-text", () => {
  render(
    <RecipeStepCard
      num={1}
      headline={<>Foundation precedes velocity</>}
      subText="understand before you output"
    />,
  );
  expect(screen.getByText("01")).toBeInTheDocument();
  expect(screen.getByText("Foundation precedes velocity")).toBeInTheDocument();
  expect(screen.getByText("understand before you output")).toBeInTheDocument();
});

test("RecipeStepCard pads num to 2 digits", () => {
  render(<RecipeStepCard num={5} headline="x" subText="y" />);
  expect(screen.getByText("05")).toBeInTheDocument();
});

test("RecipeStepCard renders hoverExample wrapped in HoverReveal when provided", () => {
  render(
    <RecipeStepCard
      num={1}
      headline="x"
      subText="y"
      hoverExample="example anecdote"
    />,
  );
  // HoverReveal injects a hover-payload data-testid.
  expect(screen.getByTestId("hover-payload")).toBeInTheDocument();
});
