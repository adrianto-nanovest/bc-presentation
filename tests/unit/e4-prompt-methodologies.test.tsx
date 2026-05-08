// tests/unit/e4-prompt-methodologies.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E4PromptMethodologies, e4Slide } from "@/slides/foundation-core-section-e/e4-prompt-methodologies";

test("E.4 declares 4 steps with canonicalPose=3", () => {
  expect(e4Slide.steps).toBe(4);
  expect(e4Slide.canonicalPose).toBe(3);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.4 at canonicalPose renders 3 tiers + 8 cards + footer caption", () => {
  render(
    <DeckProvider stepCounts={[e4Slide.steps]}>
      <AdvanceTo step={e4Slide.canonicalPose} />
      <E4PromptMethodologies />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.4 · METHODOLOGIES/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^tier-/)).toHaveLength(3);
  expect(screen.getAllByTestId(/^technique-card-/)).toHaveLength(8);
  expect(screen.getByText(/Higher tiers/)).toBeInTheDocument();
});

test("clicking a technique card opens its modal; close button dismisses", () => {
  render(
    <DeckProvider stepCounts={[e4Slide.steps]}>
      <AdvanceTo step={e4Slide.canonicalPose} />
      <E4PromptMethodologies />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  fireEvent.click(screen.getByTestId("technique-card-rag"));
  expect(screen.getByTestId("technique-modal-rag")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("technique-modal-close"));
  expect(screen.queryByTestId("technique-modal-rag")).toBeNull();
});
