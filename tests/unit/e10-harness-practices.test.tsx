import { render, screen, fireEvent, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E10HarnessPractices, e10Slide } from "@/slides/foundation-core-section-e/e10-harness-practices";

test("E.10 declares 3 steps with canonicalPose=2", () => {
  expect(e10Slide.steps).toBe(3);
  expect(e10Slide.canonicalPose).toBe(2);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.10 at canonicalPose renders 2×4 grid of 8 practices", () => {
  render(
    <DeckProvider stepCounts={[e10Slide.steps]}>
      <AdvanceTo step={e10Slide.canonicalPose} />
      <E10HarnessPractices />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.10 · PRACTICES/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^practice-card-/)).toHaveLength(8);
});

test("clicking Orchestration practice reveals the embedded HarnessPattern", () => {
  render(
    <DeckProvider stepCounts={[e10Slide.steps]}>
      <AdvanceTo step={e10Slide.canonicalPose} />
      <E10HarnessPractices />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  fireEvent.click(screen.getByTestId("practice-card-orchestration"));
  expect(screen.getByTestId("harness-pattern-root")).toBeInTheDocument();
});
