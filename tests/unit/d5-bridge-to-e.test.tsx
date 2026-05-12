// D.5 — BRIDGE TO E · slide tests.
//
// Covers the 2-step design mirroring E.11:
//   step 0 — beat1 (two display lines) + copper rule
//   step 1 — beat2 (italic copper subline)
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

test("D.5 declares 2 steps with canonicalPose=1", () => {
  expect(d5Slide.steps).toBe(2);
  expect(d5Slide.canonicalPose).toBe(1);
  expect(d5Slide.animationMode).toBe("step-reveal");
  expect(d5Slide.section).toBe("D");
});

test("D.5 renders the FIG label", () => {
  const { container } = renderAtStep(0);
  const fig = container.querySelector(".fig-label") as HTMLElement;
  expect(fig).not.toBeNull();
  expect(fig.textContent).toMatch(/FIG\.\s*D\.5\s*·\s*THE NEXT QUESTION/);
});

test("D.5 renders the hero photo + overlays", () => {
  renderAtStep(0);
  expect(screen.getByTestId("d5-hero")).toBeInTheDocument();
  expect(screen.getByTestId("d5-overlay-bottom-left")).toBeInTheDocument();
  expect(screen.getByTestId("d5-overlay-top-left")).toBeInTheDocument();
  expect(screen.getByTestId("d5-overlay-top-gloom")).toBeInTheDocument();
  expect(screen.getByTestId("d5-root")).toBeInTheDocument();
});

test("D.5 at canonicalPose renders beat1 (both lines) and beat2", () => {
  renderAtStep(d5Slide.canonicalPose);
  const beat1 = screen.getByTestId("d5-beat1");
  const beat2 = screen.getByTestId("d5-beat2");
  expect(beat1.textContent).toMatch(d5Content.beat1.lineA.text);
  expect(beat1.textContent).toMatch(d5Content.beat1.lineB.text);
  expect(beat2.textContent).toMatch(d5Content.beat2.text);
});
