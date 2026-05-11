// D.2 — THE CONVERGENCE · slide tests.
//
// Covers the rewritten 3-step design (0=blank detail panel, 1=network reveals,
// 2=summary band) ported from
// `claude-design-section-d/jsx/slides-d.jsx:265-624`.
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  D2TheConvergence,
  d2Slide,
} from "@/slides/foundation-core/d2-the-convergence";
import { d2Content } from "@/slides/foundation-core/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  const result = render(
    <DeckProvider stepCounts={[d2Slide.steps]}>
      <AdvanceTo step={step} />
      <D2TheConvergence />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  return result;
}

test("D.2 declares 3 steps with canonicalPose=2", () => {
  expect(d2Slide.steps).toBe(3);
  expect(d2Slide.canonicalPose).toBe(2);
  expect(d2Slide.animationMode).toBe("step-reveal");
  expect(d2Slide.section).toBe("D");
});

test("D.2 renders the FIG label", () => {
  const { container } = renderAtStep(0);
  const fig = container.querySelector(".fig-label") as HTMLElement;
  expect(fig).not.toBeNull();
  expect(fig.textContent).toMatch(/FIG\.\s*D\.2\s*·\s*THE CONVERGENCE/);
});

test("D.2 renders 5 list cards on the left (any step)", () => {
  renderAtStep(0);
  const cards = screen.getAllByTestId("d2-list-card");
  expect(cards).toHaveLength(5);
  // Each card carries its key as data-key.
  const keys = cards.map((c) => c.getAttribute("data-key")).sort();
  expect(keys).toEqual(["agentic", "ai", "bpm", "ipa", "rpa"]);
});

test("D.2 renders the headline + summary text at canonicalPose", () => {
  const { container } = renderAtStep(d2Slide.canonicalPose);
  expect(container.textContent).toMatch(d2Content.headline);
  expect(container.textContent).toMatch(d2Content.summary);
});

test("D.2 renders the network at step >= 1", () => {
  renderAtStep(1);
  expect(screen.getByTestId("d2-network")).toBeInTheDocument();
});
