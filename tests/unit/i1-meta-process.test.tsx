// tests/unit/i1-meta-process.test.tsx
import { render, screen } from "@testing-library/react";
import { SlideHarness } from "../support/slide-harness";
import { I1MetaProcess, i1Slide } from "@/slides/reveal-and-closing/i1-meta-process";
import { I1Backdrop } from "@/slides/reveal-and-closing/components/I1Backdrop";

test("I.1 declares 4 steps with canonicalPose=3", () => {
  expect(i1Slide.steps).toBe(4);
  expect(i1Slide.canonicalPose).toBe(3);
});

test("I.1 renders the FIG label, two stagger lines, mid line, and four cards", () => {
  render(
    <SlideHarness def={i1Slide}>
      <I1MetaProcess />
    </SlideHarness>,
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

test("I.1 mounts the grid-pulse backdrop, visible at step 0 and hidden once the cards land", () => {
  const { rerender } = render(
    <SlideHarness def={i1Slide}>
      <I1MetaProcess />
    </SlideHarness>,
  );
  const backdrop = screen.getByTestId("i1-backdrop");
  expect(backdrop).toHaveAttribute("data-sim", "C");
  expect(backdrop).toHaveStyle({ opacity: "1" });

  // DeckProvider starts at step 0; drive the fade through the component's own
  // prop rather than the deck, which has no test-facing step setter.
  rerender(
    <SlideHarness def={i1Slide}>
      <I1Backdrop stepIndex={2} />
    </SlideHarness>,
  );
  expect(screen.getByTestId("i1-backdrop")).toHaveStyle({ opacity: "0" });
});
