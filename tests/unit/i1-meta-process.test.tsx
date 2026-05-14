// tests/unit/i1-meta-process.test.tsx
import { render, screen } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { I1MetaProcess, i1Slide } from "@/slides/reveal-and-closing/i1-meta-process";

test("I.1 declares 4 steps with canonicalPose=3", () => {
  expect(i1Slide.steps).toBe(4);
  expect(i1Slide.canonicalPose).toBe(3);
});

test("I.1 renders the FIG label, two stagger lines, mid line, and four cards", () => {
  render(
    <DeckProvider stepCounts={[i1Slide.steps]}>
      <I1MetaProcess />
    </DeckProvider>,
  );
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*I\.1.*THE PROCESS/i);

  // Step-1 stagger lines (text is split across spans by highlight()).
  expect(screen.getByTestId("i1-line1")).toBeInTheDocument();
  expect(screen.getByTestId("i1-line2")).toBeInTheDocument();
  expect(screen.getByText("watching")).toBeInTheDocument();
  expect(screen.getByText("built")).toBeInTheDocument();
  expect(screen.getByText("AI")).toBeInTheDocument();

  // Step-2/3 mid line (rendered always; gated by opacity).
  expect(screen.getByTestId("i1-mid")).toBeInTheDocument();
  expect(screen.getByText("process")).toBeInTheDocument();

  // Four cards.
  expect(screen.getByText("Research & Preparation")).toBeInTheDocument();
  expect(screen.getByText("Brainstorm & Plan")).toBeInTheDocument();
  expect(screen.getByText("Prototype")).toBeInTheDocument();
  expect(screen.getByText("Implementation")).toBeInTheDocument();
});
