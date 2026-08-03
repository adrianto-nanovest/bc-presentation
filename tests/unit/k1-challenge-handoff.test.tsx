import { render, screen, act } from "@testing-library/react";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
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

// K.1 exists only where the Practice Lab runs, and `general` — the variant unit
// tests resolve to — drops it, so there is no composed row to look up. That a
// practiceLab deck really prints K.1 here is proved from rendered output by
// `deck-numbering-fixture.test.tsx`.
const K1_IN_PRACTICE_LAB_DECK = { letter: "K", num: 1, sectionKey: "lab" } as const;

test("K.1 renders FigLabel, both beat-1 lines, and the Practice Lab bridge line", () => {
  render(
    <SlideHarness def={k1Slide} at={K1_IN_PRACTICE_LAB_DECK}>
      <AdvanceTo step={k1Slide.canonicalPose} />
      <K1ChallengeHandoff />
    </SlideHarness>,
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
    <SlideHarness def={k1Slide} at={K1_IN_PRACTICE_LAB_DECK}>
      <K1ChallengeHandoff />
    </SlideHarness>,
  );
  expect(screen.getByTestId("k1-overlay-bottom-left")).toBeInTheDocument();
  expect(screen.getByTestId("k1-overlay-top-left")).toBeInTheDocument();
  expect(screen.getByTestId("k1-overlay-top-gloom")).toBeInTheDocument();
});
