// tests/unit/e1-three-layers.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E1ThreeLayers, e1Slide } from "@/slides/foundation-core-section-e/e1-three-layers";

test("E.1 declares 7 steps with canonicalPose=6", () => {
  expect(e1Slide.steps).toBe(7);
  expect(e1Slide.canonicalPose).toBe(6);
  expect(e1Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.1 at canonicalPose renders all 3 layer cards in nested mode + Anthropic quote", () => {
  render(
    <DeckProvider stepCounts={[e1Slide.steps]}>
      <AdvanceTo step={e1Slide.canonicalPose} />
      <E1ThreeLayers />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.1 · THE THREE LAYERS/)).toBeInTheDocument();
  expect(screen.getByTestId("layer-card-prompt").getAttribute("data-mode")).toBe("nested");
  expect(screen.getByTestId("layer-card-context").getAttribute("data-mode")).toBe("nested");
  expect(screen.getByTestId("layer-card-harness").getAttribute("data-mode")).toBe("nested");
  expect(screen.getByText(/Anthropic/)).toBeInTheDocument();
});

test("E.1 Space 1 has only PROMPT visible in focal mode", () => {
  render(
    <DeckProvider stepCounts={[e1Slide.steps]}>
      <AdvanceTo step={0} />
      <E1ThreeLayers />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByTestId("layer-card-prompt").getAttribute("data-mode")).toBe("focal");
  expect(screen.queryByTestId("layer-card-context")).toBeNull();
  expect(screen.queryByTestId("layer-card-harness")).toBeNull();
});
