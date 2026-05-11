// D.3 — ONE PROCESS · FOUR LEVELS · slide tests.
//
// Covers the rewritten 5-step design (0..3 walks BPM→RPA→IPA→AGENTIC, 4
// reveals capstone + unlocks hover) ported from
// `claude-design-section-d/jsx/slides-d.jsx:626-910`.
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  D3OneProcessFourLevels,
  d3Slide,
} from "@/slides/foundation-core/d3-one-process-four-levels";
import { d3Content } from "@/slides/foundation-core/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  const result = render(
    <DeckProvider stepCounts={[d3Slide.steps]}>
      <AdvanceTo step={step} />
      <D3OneProcessFourLevels />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  return result;
}

test("D.3 declares 5 steps with canonicalPose=4", () => {
  expect(d3Slide.steps).toBe(5);
  expect(d3Slide.canonicalPose).toBe(4);
  expect(d3Slide.animationMode).toBe("step-reveal");
  expect(d3Slide.section).toBe("D");
});

test("D.3 renders the FIG label", () => {
  const { container } = renderAtStep(0);
  const fig = container.querySelector(".fig-label") as HTMLElement;
  expect(fig).not.toBeNull();
  expect(fig.textContent).toMatch(/FIG\.\s*D\.3\s*·\s*ONE PROCESS\s*·\s*FOUR LEVELS/);
});

test("D.3 renders 4 level cards spanning {bpm, rpa, ipa, agentic}", () => {
  renderAtStep(0);
  const cards = screen.getAllByTestId("d3-level-card");
  expect(cards).toHaveLength(4);
  const levels = cards.map((c) => c.getAttribute("data-level")).sort();
  expect(levels).toEqual(["agentic", "bpm", "ipa", "rpa"]);
});

test("D.3 at canonicalPose shows headline + capstone caption", () => {
  const { container } = renderAtStep(d3Slide.canonicalPose);
  expect(container.textContent).toMatch(d3Content.headline);
  // Capstone string contains the "80%" keyword (highlighted via KW).
  expect(container.textContent).toMatch(/80%/);
  expect(container.textContent).toMatch(/risks surfaced earlier/);
});
