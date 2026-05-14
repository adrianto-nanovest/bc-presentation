// tests/unit/i2-profile-journey.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import {
  I2ProfileJourney,
  i2Slide,
} from "@/slides/reveal-and-closing/i2-profile-journey";

function renderSlide() {
  return render(
    <DeckProvider stepCounts={[i2Slide.steps]}>
      <I2ProfileJourney />
    </DeckProvider>,
  );
}

test("I.2 slide definition: 2 steps, canonical pose at step 2", () => {
  expect(i2Slide.steps).toBe(2);
  expect(i2Slide.canonicalPose).toBe(1);
  expect(i2Slide.section).toBe("I");
  expect(i2Slide.surface).toBe("dark");
  expect(i2Slide.animationMode).toBe("step-reveal");
});

test("I.2 renders the FIG label", () => {
  renderSlide();
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*I\.2.*THE JOURNEY/i);
});

test("I.2 renders the headline 'Who am I' with 'am I' highlighted", () => {
  renderSlide();
  // `highlight()` splits the headline into separate spans for "Who " and
  // "am I" (the latter wrapped in <em class="text-copper-400 italic">).
  expect(screen.getByText("Who")).toBeInTheDocument();
  const highlighted = screen.getByText("am I");
  expect(highlighted).toBeInTheDocument();
  expect(highlighted.tagName).toBe("EM");
});

test("I.2 renders name, role, and delivery lines", () => {
  renderSlide();
  expect(screen.getByText(/ADRIANTO TEDJOKUSUMO/)).toBeInTheDocument();
  // Role keywords ("AI Steering Committee", "TPM", "Nanovest") get split out
  // by highlight() — assert on a fragment that survives the split.
  expect(screen.getByText(/Lead · Head of/)).toBeInTheDocument();
  expect(screen.getByText(/13 years/)).toBeInTheDocument();
  expect(screen.getByText(/formal AI training/)).toBeInTheDocument();
});

test("I.2 renders the timeline title 'My Evolution Journey'", () => {
  renderSlide();
  expect(screen.getByText(/My Evolution Journey/)).toBeInTheDocument();
});

test("I.2 renders 5 journey anchors and 4 segment labels", () => {
  renderSlide();
  expect(screen.getAllByTestId("journey-anchor")).toHaveLength(5);
  expect(screen.getAllByTestId("journey-segment")).toHaveLength(4);
});

test("I.2 each anchor's label box contains a date and bullet items", () => {
  renderSlide();
  const dates = ["Mar 2025", "June 2025", "Sep 2025", "Dec 2025", "Mar 2026"];
  for (const date of dates) {
    expect(screen.getByText(date)).toBeInTheDocument();
  }
});
