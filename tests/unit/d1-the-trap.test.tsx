// D.1 — THE TRAP · slide tests.
//
// Covers the rewritten 3-step design (0=stat full-bleed, 1=mechanism + bars +
// AutomationLoop, 2=prescription) ported from
// `claude-design-section-d/jsx/slides-d.jsx:143-257`.
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { D1TheTrap, d1Slide } from "@/slides/foundation-core/d1-the-trap";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  const result = render(
    <DeckProvider stepCounts={[d1Slide.steps]}>
      <AdvanceTo step={step} />
      <D1TheTrap />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  return result;
}

test("D.1 declares 3 steps with canonicalPose=2", () => {
  expect(d1Slide.steps).toBe(3);
  expect(d1Slide.canonicalPose).toBe(2);
  expect(d1Slide.animationMode).toBe("step-reveal");
  expect(d1Slide.section).toBe("D");
});

test("D.1 renders the FIG label", () => {
  const { container } = renderAtStep(0);
  const fig = container.querySelector(".fig-label") as HTMLElement;
  expect(fig).not.toBeNull();
  expect(fig.textContent).toMatch(/FIG\.\s*D\.1\s*·\s*THE TRAP/);
});

test("D.1 renders the 73 stat counter (data-count-to=73)", () => {
  renderAtStep(d1Slide.canonicalPose);
  const counter = screen.getByTestId("d1-stat-counter");
  expect(counter.getAttribute("data-count-to")).toBe("73");
});

test("D.1 at canonicalPose renders both amplification bars", () => {
  renderAtStep(d1Slide.canonicalPose);
  const bars = screen.getAllByTestId("amp-bar");
  expect(bars).toHaveLength(2);
});

test("D.1 prescription contains the 'spec' keyword at step 2 (canonicalPose)", () => {
  const { container } = renderAtStep(d1Slide.canonicalPose);
  // The whole slide DOM should include the prescription text + the keyword
  // 'spec' (rendered via highlight()).
  expect(container.textContent).toMatch(/Fix the/);
  expect(container.textContent).toMatch(/spec/);
});
