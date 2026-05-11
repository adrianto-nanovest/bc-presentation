import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { J1HumilityIntro, j1Slide } from "@/slides/reveal-and-closing/j1-humility-intro";

function harness() {
  return render(
    <DeckProvider stepCounts={[j1Slide.steps]}>
      <J1HumilityIntro />
    </DeckProvider>,
  );
}

test("J.1 declares 4 steps with canonicalPose=3", () => {
  expect(j1Slide.steps).toBe(4);
  expect(j1Slide.canonicalPose).toBe(3);
  expect(j1Slide.animationMode).toBe("step-reveal");
});

test("J.1 renders the FIG label, hero photo, and the three lines", () => {
  harness();
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*J\.1.*THE RECIPE/i);
  expect(screen.getByText(/Still a beginner/)).toBeInTheDocument();
  expect(screen.getByText(/I've earned a few lessons/)).toBeInTheDocument();
  expect(screen.getByText(/Here's some advice/)).toBeInTheDocument();
});
