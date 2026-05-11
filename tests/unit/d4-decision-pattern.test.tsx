// D.4 — WHICH LEVEL · WHEN · slide tests.
//
// Covers the rewritten 6-step design (0..4 reveals rungs 1..5, 5 adds the
// footer caption) ported from
// `claude-design-section-d/jsx/slides-d.jsx:921-1095`.
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  D4DecisionPattern,
  d4Slide,
} from "@/slides/foundation-core/d4-decision-pattern";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  const result = render(
    <DeckProvider stepCounts={[d4Slide.steps]}>
      <AdvanceTo step={step} />
      <D4DecisionPattern />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  return result;
}

test("D.4 declares 6 steps with canonicalPose=5", () => {
  expect(d4Slide.steps).toBe(6);
  expect(d4Slide.canonicalPose).toBe(5);
  expect(d4Slide.animationMode).toBe("step-reveal");
  expect(d4Slide.section).toBe("D");
});

test("D.4 renders the FIG label", () => {
  const { container } = renderAtStep(0);
  const fig = container.querySelector(".fig-label") as HTMLElement;
  expect(fig).not.toBeNull();
  expect(fig.textContent).toMatch(/FIG\.\s*D\.4\s*·\s*WHICH LEVEL\s*·\s*WHEN/);
});

test("D.4 renders 5 ladder rungs at canonicalPose", () => {
  renderAtStep(d4Slide.canonicalPose);
  const rungs = screen.getAllByTestId("d4-rung");
  expect(rungs).toHaveLength(5);
});

test("D.4 renders 5 terminal cards (any step — they always mount)", () => {
  renderAtStep(0);
  const terminals = screen.getAllByTestId("d4-terminal-card");
  expect(terminals).toHaveLength(5);
  const keys = terminals
    .map((t) => t.getAttribute("data-terminal-key"))
    .sort();
  expect(keys).toEqual(["AGENTIC", "BPM", "IPA", "RPA", "STOP"]);
});

test("D.4 footer 'fails harder' is visible at step 5 (canonicalPose)", () => {
  const { container } = renderAtStep(d4Slide.canonicalPose);
  expect(container.textContent).toMatch(/fails harder/);
});
