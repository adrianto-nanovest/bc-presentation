// tests/unit/e5-prompt-the-wall.test.tsx
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { E5PromptTheWall, e5Slide } from "@/slides/foundation-core-section-e/e5-prompt-the-wall";

test("E.5 declares 4 steps with canonicalPose=3", () => {
  expect(e5Slide.steps).toBe(4);
  expect(e5Slide.canonicalPose).toBe(3);
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("E.5 at canonicalPose renders all 3 sections + closing caption", () => {
  render(
    <DeckProvider stepCounts={[e5Slide.steps]}>
      <AdvanceTo step={e5Slide.canonicalPose} />
      <E5PromptTheWall />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  expect(screen.getByText(/FIG\. E\.5 · THE WALL/)).toBeInTheDocument();
  expect(screen.getByText("BEST PRACTICES")).toBeInTheDocument();
  expect(screen.getByText("COMMON MISTAKES")).toBeInTheDocument();
  expect(screen.getByText("WHERE PROMPT ENDS")).toBeInTheDocument();
  expect(screen.getByText(/next layers begin/)).toBeInTheDocument();

  // 5 best practices + 5 mistakes + 6 constraints = 16 list items in the body.
  expect(screen.getAllByTestId(/^e5-bp-/)).toHaveLength(5);
  expect(screen.getAllByTestId(/^e5-cm-/)).toHaveLength(5);
  expect(screen.getAllByTestId(/^e5-constraint-/)).toHaveLength(6);
});
