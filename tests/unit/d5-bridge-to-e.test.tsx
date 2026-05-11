// D.5 — BRIDGE TO E · slide tests.
//
// Covers the rewritten 3-step design (0=beat1 + horizon glow, 1=beat2 +
// horizon line, 2=bridge cue) ported from
// `claude-design-section-d/jsx/slides-d.jsx:1103-1162`.
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  D5BridgeToE,
  d5Slide,
} from "@/slides/foundation-core/d5-bridge-to-e";
import { d5Content } from "@/slides/foundation-core/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  const result = render(
    <DeckProvider stepCounts={[d5Slide.steps]}>
      <AdvanceTo step={step} />
      <D5BridgeToE />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  return result;
}

test("D.5 declares 3 steps with canonicalPose=2", () => {
  expect(d5Slide.steps).toBe(3);
  expect(d5Slide.canonicalPose).toBe(2);
  expect(d5Slide.animationMode).toBe("step-reveal");
  expect(d5Slide.section).toBe("D");
});

test("D.5 renders the FIG label", () => {
  const { container } = renderAtStep(0);
  const fig = container.querySelector(".fig-label") as HTMLElement;
  expect(fig).not.toBeNull();
  expect(fig.textContent).toMatch(/FIG\.\s*D\.5\s*·\s*THE NEXT QUESTION/);
});

test("D.5 renders the hero photo + bottom-left vignette", () => {
  renderAtStep(0);
  // HeroPhoto renders an <img> + a data-testid="hero-vignette" div.
  expect(screen.getByTestId("hero-vignette")).toBeInTheDocument();
  expect(screen.getByTestId("d5-root")).toBeInTheDocument();
});

test("D.5 at canonicalPose renders all three editorial lines", () => {
  renderAtStep(d5Slide.canonicalPose);
  const beat1 = screen.getByTestId("d5-beat1");
  const beat2 = screen.getByTestId("d5-beat2");
  const bridge = screen.getByTestId("d5-bridge");
  expect(beat1.textContent).toMatch(d5Content.beat1.text);
  expect(beat2.textContent).toMatch(d5Content.beat2.text);
  expect(bridge.textContent).toMatch(d5Content.bridge.text);
  // Attribution mono caption is part of the bridge stack.
  expect(bridge.textContent).toMatch(/Foundation Core/);
});
