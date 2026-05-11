// tests/unit/i1-meta-process.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { I1MetaProcess, i1Slide } from "@/slides/reveal-and-closing/i1-meta-process";

test("I.1 declares 4 steps with canonicalPose=3", () => {
  expect(i1Slide.steps).toBe(4);
  expect(i1Slide.canonicalPose).toBe(3);
});

test("I.1 renders the FIG label, headline keywords, 6 stages, and tagline", () => {
  render(
    <DeckProvider stepCounts={[i1Slide.steps]}>
      <I1MetaProcess />
    </DeckProvider>,
  );
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*I\.1.*THE PROCESS/i);
  expect(screen.getByText(/facilitated with AI/)).toBeInTheDocument();
  expect(screen.getByText("90 minutes")).toBeInTheDocument();
  expect(screen.getAllByTestId("flow-stage")).toHaveLength(6);
  expect(screen.getAllByTestId("flow-connector")).toHaveLength(5);
});
