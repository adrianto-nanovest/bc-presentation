import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { D3OneProcessFourLevels, d3Slide } from "@/slides/foundation-core/d3-one-process-four-levels";

test("D.3 declares 5 steps with canonicalPose=4", () => {
  expect(d3Slide.steps).toBe(5);
  expect(d3Slide.canonicalPose).toBe(4);
});

test("D.3 at step 0 shows BPM in focal mode and the other 3 levels are absent", () => {
  render(
    <DeckProvider stepCounts={[d3Slide.steps]}>
      <D3OneProcessFourLevels />
    </DeckProvider>,
  );
  const cards = screen.getAllByTestId("level-card");
  expect(cards).toHaveLength(1);
  expect(cards[0].getAttribute("data-level")).toBe("bpm");
  expect(cards[0].getAttribute("data-mode")).toBe("focal");
});

test("D.3 renders the FIG label and headline", () => {
  render(
    <DeckProvider stepCounts={[d3Slide.steps]}>
      <D3OneProcessFourLevels />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. D\.3 · ONE PROCESS · FOUR LEVELS/)).toBeInTheDocument();
  expect(screen.getByText(/Monthly operations report/)).toBeInTheDocument();
});
