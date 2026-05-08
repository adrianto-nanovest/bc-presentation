import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E9HarnessWhatWhy, e9Slide } from "@/slides/foundation-core-section-e/e9-harness-what-why";

test("E.9 declares 5 steps with canonicalPose=4", () => {
  expect(e9Slide.steps).toBe(5);
  expect(e9Slide.canonicalPose).toBe(4);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.9 at canonicalPose renders harness package + thesis panel + full ladder", () => {
  render(
    <DeckProvider stepCounts={[e9Slide.steps]}>
      <AdvanceTo step={e9Slide.canonicalPose} />
      <E9HarnessWhatWhy />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.9 · HARNESS/)).toBeInTheDocument();
  expect(screen.getByTestId("harness-package")).toBeInTheDocument();
  expect(screen.getAllByTestId(/^harness-include-/)).toHaveLength(6);
  expect(screen.getByTestId("thesis-equation").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("thesis-tagline").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("impact-rung-3").getAttribute("data-lit")).toBe("true");
});
