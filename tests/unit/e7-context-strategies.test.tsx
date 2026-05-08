import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E7ContextStrategies, e7Slide } from "@/slides/foundation-core-section-e/e7-context-strategies";

test("E.7 declares 5 steps with canonicalPose=4", () => {
  expect(e7Slide.steps).toBe(5);
  expect(e7Slide.canonicalPose).toBe(4);
  expect(e7Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.7 at canonicalPose renders 4 rings, footer caption, ambient on", () => {
  render(
    <DeckProvider stepCounts={[e7Slide.steps]}>
      <AdvanceTo step={e7Slide.canonicalPose} />
      <E7ContextStrategies />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.7 · STRATEGIES/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^strategy-ring-/)).toHaveLength(4);
  expect(screen.getByText(/keep it useful/)).toBeInTheDocument();
  expect(screen.getByTestId("strategy-ambient-layer")).toBeInTheDocument();
});

test("E.7 reveals rings progressively across Spaces 1-4", () => {
  render(
    <DeckProvider stepCounts={[e7Slide.steps]}>
      <AdvanceTo step={1} />
      <E7ContextStrategies />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByTestId("strategy-ring-write").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("strategy-ring-select").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("strategy-ring-compress").getAttribute("data-revealed")).toBe("false");
});
