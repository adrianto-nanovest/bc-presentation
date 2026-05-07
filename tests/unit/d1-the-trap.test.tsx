import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { D1TheTrap, d1Slide } from "@/slides/foundation-core/d1-the-trap";

test("D.1 declares 4 steps with canonicalPose=3", () => {
  expect(d1Slide.steps).toBe(4);
  expect(d1Slide.canonicalPose).toBe(3);
  expect(d1Slide.animationMode).toBe("step-reveal");
});

// DeckProvider initializes stepIndex=0; D.1 conditionally mounts each beat by
// stepIndex (showBars at >=2, showPrescription at >=3). To assert the fully
// settled DOM we drive the deck to its canonicalPose via goTo, mirroring the
// pattern in tests/unit/i4-key-message-bridge.test.tsx.
function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

test("D.1 renders the FIG label, the 73% counter, and both amplification bars", () => {
  render(
    <DeckProvider stepCounts={[d1Slide.steps]}>
      <AdvanceTo step={d1Slide.canonicalPose} />
      <D1TheTrap />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());
  expect(screen.getByText(/FIG\. D\.1 · THE TRAP/)).toBeInTheDocument();
  expect(screen.getAllByTestId("amplification-bar")).toHaveLength(2);
  // The 73 counter has data-count-to=73.
  const counter = screen.getByTestId("d1-stat-counter");
  expect(counter.getAttribute("data-count-to")).toBe("73");
});

test("D.1 renders the prescription text with copper-italic 'spec' keyword", () => {
  render(
    <DeckProvider stepCounts={[d1Slide.steps]}>
      <AdvanceTo step={d1Slide.canonicalPose} />
      <D1TheTrap />
    </DeckProvider>,
  );
  act(() => screen.getByTestId("goto").click());
  expect(screen.getByText(/Fix the/)).toBeInTheDocument();
  expect(screen.getByText("spec")).toBeInTheDocument();
});
