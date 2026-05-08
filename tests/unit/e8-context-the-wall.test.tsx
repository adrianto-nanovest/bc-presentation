import { render, screen, fireEvent, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E8ContextTheWall, e8Slide } from "@/slides/foundation-core-section-e/e8-context-the-wall";

test("E.8 declares 4 steps with canonicalPose=3", () => {
  expect(e8Slide.steps).toBe(4);
  expect(e8Slide.canonicalPose).toBe(3);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.8 at canonicalPose renders 4 pitfalls + stamped network + footer", () => {
  render(
    <DeckProvider stepCounts={[e8Slide.steps]}>
      <AdvanceTo step={e8Slide.canonicalPose} />
      <E8ContextTheWall />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.8 · STILL MANUAL/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^pitfall-item-/)).toHaveLength(4);
  expect(screen.getByTestId("node-network-root").getAttribute("data-state")).toBe("stamped");
  expect(screen.getByText(/better way/)).toBeInTheDocument();
});

test("hover on a pitfall item morphs the canvas to that pitfall's illustration", () => {
  render(
    <DeckProvider stepCounts={[e8Slide.steps]}>
      <AdvanceTo step={e8Slide.canonicalPose} />
      <E8ContextTheWall />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  fireEvent.mouseEnter(screen.getByTestId("pitfall-item-conflict"));
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe("conflict");

  fireEvent.mouseLeave(screen.getByTestId("pitfall-item-conflict"));
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe("default");
});
