import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { I4KeyMessageBridge, i4Slide } from "@/slides/reveal-and-closing/i4-key-message-bridge";

test("I.4 declares 4 steps with canonicalPose=3", () => {
  expect(i4Slide.steps).toBe(4);
  expect(i4Slide.canonicalPose).toBe(3);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return (
    <button data-testid="goto" onClick={() => goTo(0, step)} />
  );
}

test("I.4 renders Foundation, before, velocity tokens and the rhetorical question", () => {
  render(
    <DeckProvider stepCounts={[i4Slide.steps]}>
      <AdvanceTo step={i4Slide.canonicalPose} />
      <I4KeyMessageBridge />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());
  expect(screen.getByText(/FIG\. I\.4 · THE BRIDGE/)).toBeInTheDocument();
  expect(screen.getByText("Foundation")).toBeInTheDocument();
  expect(screen.getByText("velocity")).toBeInTheDocument();
  // "Project Manager" is wrapped in <KeywordHighlight>; match the sibling text node
  expect(screen.getByText(/built this/)).toBeInTheDocument();
  expect(screen.getByText(/what could/)).toBeInTheDocument();
  expect(screen.getByTestId("pulse-glow")).toBeInTheDocument();
});
