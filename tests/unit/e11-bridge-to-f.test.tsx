import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E11BridgeToF, e11Slide } from "@/slides/foundation-core-section-e/e11-bridge-to-f";

test("E.11 declares 2 steps with canonicalPose=1", () => {
  expect(e11Slide.steps).toBe(2);
  expect(e11Slide.canonicalPose).toBe(1);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.11 at canonicalPose renders both beats over hero photo", () => {
  render(
    <DeckProvider stepCounts={[e11Slide.steps]}>
      <AdvanceTo step={e11Slide.canonicalPose} />
      <E11BridgeToF />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.11 · BUILT/)).toBeInTheDocument();
  expect(screen.getByText(/Three layers/)).toBeInTheDocument();
  expect(screen.getByText(/techniques that matter most/)).toBeInTheDocument();
  expect(screen.getByTestId("hero-vignette")).toBeInTheDocument();
});
