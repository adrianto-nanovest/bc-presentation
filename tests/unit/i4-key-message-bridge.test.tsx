import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { I4KeyMessageBridge, i4Slide } from "@/slides/reveal-and-closing/i4-key-message-bridge";

test("I.4 declares 2 steps with canonicalPose=1", () => {
  expect(i4Slide.steps).toBe(2);
  expect(i4Slide.canonicalPose).toBe(1);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return (
    <button data-testid="goto" onClick={() => goTo(0, step)} />
  );
}

test("I.4 renders FigLabel, both beat-1 lines, and the recipe bridge line", () => {
  render(
    <DeckProvider stepCounts={[i4Slide.steps]}>
      <AdvanceTo step={i4Slide.canonicalPose} />
      <I4KeyMessageBridge />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*I\.4.*BRIDGE\s*·\s*RECIPE/i);
  // beat 1 — split across two display lines; keyword spans are siblings.
  expect(screen.getByText("Foundation")).toBeInTheDocument();
  expect(screen.getByText("velocity")).toBeInTheDocument();
  expect(screen.getByText("Project Manager")).toBeInTheDocument();
  expect(screen.getByText(/built this in a year/)).toBeInTheDocument();
  // beat 2 — bridge to Section J.
  expect(screen.getByText("the recipe")).toBeInTheDocument();
  expect(screen.getByText(/made it possible/)).toBeInTheDocument();
});
