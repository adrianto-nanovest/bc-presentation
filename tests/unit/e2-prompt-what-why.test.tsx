import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E2PromptWhatWhy, e2Slide } from "@/slides/foundation-core-section-e/e2-prompt-what-why";

test("E.2 declares 5 steps with canonicalPose=4", () => {
  expect(e2Slide.steps).toBe(5);
  expect(e2Slide.canonicalPose).toBe(4);
  expect(e2Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.2 at canonicalPose renders FIG label, NAIVE+PROPER blocks, and impact rung 1 lit", () => {
  render(
    <DeckProvider stepCounts={[e2Slide.steps]}>
      <AdvanceTo step={e2Slide.canonicalPose} />
      <E2PromptWhatWhy />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.2 · PROMPT/)).toBeInTheDocument();
  expect(screen.getByTestId("naive-block")).toBeInTheDocument();
  expect(screen.getByTestId("proper-block")).toBeInTheDocument();
  // Footer ImpactLadder rung 1 must be lit at canonical pose (Space 5).
  expect(screen.getByTestId("impact-rung-1").getAttribute("data-lit")).toBe("true");
  expect(screen.getByTestId("impact-rung-2").getAttribute("data-lit")).toBe("false");
});
