import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { D5BridgeToE, d5Slide } from "@/slides/foundation-core/d5-bridge-to-e";

test("D.5 declares 3 steps with canonicalPose=2", () => {
  expect(d5Slide.steps).toBe(3);
  expect(d5Slide.canonicalPose).toBe(2);
});

test("D.5 renders the FIG label, the hero vignette, and all three editorial lines", () => {
  render(
    <DeckProvider stepCounts={[d5Slide.steps]}>
      <D5BridgeToE />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. D\.5 · THE NEXT QUESTION/)).toBeInTheDocument();
  expect(screen.getByTestId("hero-vignette")).toBeInTheDocument();
  expect(screen.getByText(/Process is the/)).toBeInTheDocument();
  expect(screen.getByText("spec")).toBeInTheDocument();
  expect(screen.getByText(/Engineering is the/)).toBeInTheDocument();
  expect(screen.getByText(/how that system gets built/)).toBeInTheDocument();
});
