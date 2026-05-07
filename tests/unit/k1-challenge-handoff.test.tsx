// tests/unit/k1-challenge-handoff.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { K1ChallengeHandoff, k1Slide } from "@/slides/reveal-and-closing/k1-challenge-handoff";

test("K.1 declares 4 steps with canonicalPose=3", () => {
  expect(k1Slide.steps).toBe(4);
  expect(k1Slide.canonicalPose).toBe(3);
  expect(k1Slide.animationMode).toBe("step-reveal");
});

test("K.1 renders FIG label, headline pieces, body lines, and tagline", () => {
  render(
    <DeckProvider stepCounts={[k1Slide.steps]}>
      <K1ChallengeHandoff />
    </DeckProvider>,
  );
  expect(screen.getByText(/FIG\. K\.1 · NOW FEEL IT/)).toBeInTheDocument();
  expect(screen.getByText(/Theory ends/)).toBeInTheDocument();
  expect(screen.getByText(/Hands begin/)).toBeInTheDocument();
  expect(screen.getByText(/Tools loaded/)).toBeInTheDocument();
  expect(screen.getByText(/Open your/)).toBeInTheDocument();
  expect(screen.getByText(/I'll be here/)).toBeInTheDocument();
  expect(screen.getByText(/recipe is no longer theory/)).toBeInTheDocument();
});

test("K.1 wraps the tagline in PulseGlow for foreground-only ambient", () => {
  render(
    <DeckProvider stepCounts={[k1Slide.steps]}>
      <K1ChallengeHandoff />
    </DeckProvider>,
  );
  expect(screen.getByTestId("pulse-glow")).toBeInTheDocument();
});
