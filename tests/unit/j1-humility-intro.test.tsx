import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { J1HumilityIntro, j1Slide } from "@/slides/reveal-and-closing/j1-humility-intro";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("J.1 declares 2 steps with canonicalPose=1", () => {
  expect(j1Slide.steps).toBe(2);
  expect(j1Slide.canonicalPose).toBe(1);
  expect(j1Slide.animationMode).toBe("step-reveal");
});

test("J.1 renders the FIG label, headline humility line, and the brief earned-lessons punchline", () => {
  render(
    <DeckProvider stepCounts={[j1Slide.steps]}>
      <AdvanceTo step={j1Slide.canonicalPose} />
      <J1HumilityIntro />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*J\.1.*THE RECIPE/i);
  // line 1 — keyword "Still a beginner" + sibling tail text
  expect(screen.getByText("Still a beginner")).toBeInTheDocument();
  expect(screen.getByText(/A lot left to learn/)).toBeInTheDocument();
  // line 2 — brief punchline with "skip my mistakes" as the highlighted keyword
  expect(screen.getByText(/Hard-earned lessons/)).toBeInTheDocument();
  expect(screen.getByText("skip my mistakes")).toBeInTheDocument();
});
