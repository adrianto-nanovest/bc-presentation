import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E6ContextWhatWhy, e6Slide } from "@/slides/foundation-core-section-e/e6-context-what-why";

test("E.6 declares 4 steps with canonicalPose=3", () => {
  expect(e6Slide.steps).toBe(4);
  expect(e6Slide.canonicalPose).toBe(3);
  expect(e6Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.6 at canonicalPose renders FIG label, hub, 6 satellites, definition, ladder rung 2 lit", () => {
  render(
    <DeckProvider stepCounts={[e6Slide.steps]}>
      <AdvanceTo step={e6Slide.canonicalPose} />
      <E6ContextWhatWhy />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.6 · CONTEXT/)).toBeInTheDocument();
  expect(screen.getByTestId("node-hub")).toBeInTheDocument();
  expect(screen.getAllByTestId(/^node-satellite-/)).toHaveLength(6);
  expect(screen.getByText(/right information/)).toBeInTheDocument();
  expect(screen.getByText(/amnesia/)).toBeInTheDocument();
  expect(screen.getByTestId("impact-rung-1").getAttribute("data-lit")).toBe("true");
  expect(screen.getByTestId("impact-rung-2").getAttribute("data-lit")).toBe("true");
  expect(screen.getByTestId("impact-rung-3").getAttribute("data-lit")).toBe("false");
});
