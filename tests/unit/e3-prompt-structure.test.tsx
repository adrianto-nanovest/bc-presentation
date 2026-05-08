import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E3PromptStructure, e3Slide } from "@/slides/foundation-core-section-e/e3-prompt-structure";

test("E.3 declares 4 steps with canonicalPose=3", () => {
  expect(e3Slide.steps).toBe(4);
  expect(e3Slide.canonicalPose).toBe(3);
  expect(e3Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.3 at canonicalPose renders all 6 spine elements + 10 frameworks + footer caption", () => {
  render(
    <DeckProvider stepCounts={[e3Slide.steps]}>
      <AdvanceTo step={e3Slide.canonicalPose} />
      <E3PromptStructure />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.3 · STRUCTURE/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^spine-element-/)).toHaveLength(6);
  expect(screen.getAllByTestId(/^framework-tile-/)).toHaveLength(10);
  expect(screen.getByText(/Same six ingredients/)).toBeInTheDocument();
});
