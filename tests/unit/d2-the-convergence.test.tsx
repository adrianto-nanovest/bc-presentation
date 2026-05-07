import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { D2TheConvergence, d2Slide } from "@/slides/foundation-core/d2-the-convergence";

test("D.2 declares 5 steps with canonicalPose=4", () => {
  expect(d2Slide.steps).toBe(5);
  expect(d2Slide.canonicalPose).toBe(4);
  expect(d2Slide.animationMode).toBe("step-reveal");
});

test("D.2 renders the FIG label, headline, and 5 convergence cards", () => {
  render(
    <DeckProvider stepCounts={[d2Slide.steps]}>
      <D2TheConvergence />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. D\.2 · THE CONVERGENCE/)).toBeInTheDocument();
  expect(screen.getByText(/Three disciplines/)).toBeInTheDocument();
  expect(screen.getAllByTestId("convergence-card")).toHaveLength(5);
});

test("D.2 cards span all 5 expected positions", () => {
  render(
    <DeckProvider stepCounts={[d2Slide.steps]}>
      <D2TheConvergence />
    </DeckProvider>,
  );
  const positions = screen
    .getAllByTestId("convergence-card")
    .map((c) => c.getAttribute("data-position"))
    .sort();
  expect(positions).toEqual(["agentic-r", "ai-bc", "bpm-tl", "ipa-c", "rpa-tr"]);
});
