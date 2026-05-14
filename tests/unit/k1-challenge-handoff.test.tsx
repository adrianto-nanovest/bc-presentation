import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { K1ChallengeHandoff, k1Slide } from "@/slides/reveal-and-closing/k1-challenge-handoff";

test("K.1 declares 2 steps with canonicalPose=1", () => {
  expect(k1Slide.steps).toBe(2);
  expect(k1Slide.canonicalPose).toBe(1);
  expect(k1Slide.animationMode).toBe("step-reveal");
});

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("K.1 renders FigLabel, both beat-1 lines, and the Practice Lab bridge line", () => {
  render(
    <DeckProvider stepCounts={[k1Slide.steps]}>
      <AdvanceTo step={k1Slide.canonicalPose} />
      <K1ChallengeHandoff />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());

  // FigLabel reads "FIG. K.1 · PRACTICE · LAB".
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*K\.1.*PRACTICE\s*·\s*LAB/i);

  // beat 1 — two display lines, keyword spans are DOM siblings.
  expect(screen.getByText(/From watching to/)).toBeInTheDocument();
  expect(screen.getByText("building")).toBeInTheDocument();
  expect(screen.getByText(/The recipe is/)).toBeInTheDocument();
  expect(screen.getByText("yours now")).toBeInTheDocument();

  // beat 2 — bridge to the Practice Lab.
  expect(screen.getByText("Practice Lab")).toBeInTheDocument();
  expect(screen.getByText(/I'll be with you/)).toBeInTheDocument();
});

test("K.1 renders the three protective overlays so the FigLabel stays legible", () => {
  render(
    <DeckProvider stepCounts={[k1Slide.steps]}>
      <K1ChallengeHandoff />
    </DeckProvider>,
  );
  expect(screen.getByTestId("k1-overlay-bottom-left")).toBeInTheDocument();
  expect(screen.getByTestId("k1-overlay-top-left")).toBeInTheDocument();
  expect(screen.getByTestId("k1-overlay-top-gloom")).toBeInTheDocument();
});
