// E.1 — THREE LAYERS · slide tests.
//
// Covers the new 4-step design (0=PROMPT, 1=CONTEXT, 2=HARNESS, 3=SUMMARY)
// ported from `claude-design-project/jsx/slides-a.jsx:36-184`.
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E1ThreeLayers,
  e1Slide,
} from "@/slides/foundation-core-section-e/e1-three-layers";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e1Slide.steps]}>
      <AdvanceTo step={step} />
      <E1ThreeLayers />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.1 declares 4 steps with canonicalPose=3", () => {
  expect(e1Slide.steps).toBe(4);
  expect(e1Slide.canonicalPose).toBe(3);
  expect(e1Slide.animationMode).toBe("step-reveal");
  expect(e1Slide.section).toBe("E");
});

test("E.1 renders without throwing under DeckProvider and shows the FigLabel", () => {
  renderAtStep(0);
  expect(screen.getByText(/FIG\. E\.1 · THE THREE LAYERS/)).toBeInTheDocument();
});

test("step 0 → PROMPT focal detail visible (titleA + titleB + blurb)", () => {
  renderAtStep(0);
  expect(screen.getByTestId("focal-detail-prompt")).toBeInTheDocument();
  // The headline `Prompt<br/>Engineering` lives inside the focal detail.
  const detail = screen.getByTestId("focal-detail-prompt");
  expect(detail.textContent).toMatch(/Prompt/);
  expect(detail.textContent).toMatch(/Engineering/);
  // The prompt blurb is unique to this layer.
  expect(screen.getByText(/How you instruct/)).toBeInTheDocument();
  // Other layers' detail panes should not be in the DOM.
  expect(screen.queryByTestId("focal-detail-context")).toBeNull();
  expect(screen.queryByTestId("focal-detail-harness")).toBeNull();
  expect(screen.queryByTestId("layer-summary")).toBeNull();
  expect(screen.queryByTestId("e1-footer-quote")).toBeNull();
});

test("step 1 → CONTEXT focal detail visible", () => {
  renderAtStep(1);
  expect(screen.getByTestId("focal-detail-context")).toBeInTheDocument();
  const detail = screen.getByTestId("focal-detail-context");
  expect(detail.textContent).toMatch(/Context/);
  expect(detail.textContent).toMatch(/Engineering/);
  expect(screen.getByText(/What the model sees/)).toBeInTheDocument();
  expect(screen.queryByTestId("focal-detail-prompt")).toBeNull();
  expect(screen.queryByTestId("focal-detail-harness")).toBeNull();
});

test("step 2 → HARNESS focal detail visible", () => {
  renderAtStep(2);
  expect(screen.getByTestId("focal-detail-harness")).toBeInTheDocument();
  const detail = screen.getByTestId("focal-detail-harness");
  expect(detail.textContent).toMatch(/Harness/);
  expect(detail.textContent).toMatch(/Engineering/);
  expect(screen.getByText(/system around the model/)).toBeInTheDocument();
  expect(screen.queryByTestId("focal-detail-prompt")).toBeNull();
  expect(screen.queryByTestId("focal-detail-context")).toBeNull();
});

test("step 3 → LayerSummary visible with all 3 rows + footer quote", () => {
  renderAtStep(3);
  expect(screen.getByTestId("layer-summary")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-prompt")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-context")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-harness")).toBeInTheDocument();
  expect(screen.getByTestId("e1-footer-quote")).toBeInTheDocument();
  expect(screen.getByText(/Anthropic/)).toBeInTheDocument();
});

test("hovering a tag chip updates its data-hover attribute", () => {
  renderAtStep(0);
  const chip = screen.getByTestId("tag-chip-role");
  expect(chip.getAttribute("data-hover")).toBe("false");
  fireEvent.mouseEnter(chip);
  expect(chip.getAttribute("data-hover")).toBe("true");
  fireEvent.mouseLeave(chip);
  expect(chip.getAttribute("data-hover")).toBe("false");
});
