// E.11 — BRIDGE · BUILT · slide tests.
//
// Covers the new 2-step design ported from
// `claude-design-project/jsx/slides-c.jsx:167-196`.
//   0 — beat 1 reveals (first message + keyword highlight + copper rule).
//   1 — beat 2 reveals (second message + keyword highlight).
//
// Hero treatment is now the design's three layered gradients (bottom-left
// vignette, top-left ellipse, top-edge gloom) on top of the e11-bridge
// photo — no <HeroPhoto>.
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E11BridgeToF,
  e11Slide,
} from "@/slides/foundation-core-section-e/e11-bridge-to-f";
import { e11Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e11Slide.steps]}>
      <AdvanceTo step={step} />
      <E11BridgeToF />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.11 declares 2 steps with canonicalPose=1", () => {
  expect(e11Slide.steps).toBe(2);
  expect(e11Slide.canonicalPose).toBe(1);
  expect(e11Slide.animationMode).toBe("step-reveal");
  expect(e11Slide.section).toBe("E");
  expect(e11Slide.surface).toBe("dark");
});

test("E.11 renders the FIG label `FIG. E.11 · BRIDGE · BUILT`", () => {
  renderAtStep(0);
  expect(
    screen.getByText(/FIG\. E\.11 · BRIDGE · BUILT/),
  ).toBeInTheDocument();
});

test("E.11 renders the bridge hero photo + three layered overlays", () => {
  renderAtStep(0);

  const hero = screen.getByTestId("e11-hero");
  expect(hero).toBeInTheDocument();
  expect(hero.style.backgroundImage).toMatch(/e11-bridge\.jpg/);

  expect(screen.getByTestId("e11-overlay-bottom-left")).toBeInTheDocument();
  expect(screen.getByTestId("e11-overlay-top-left")).toBeInTheDocument();
  expect(screen.getByTestId("e11-overlay-top-gloom")).toBeInTheDocument();
});

test("step 0 → beat 1 visible, beat 2 hidden", () => {
  renderAtStep(0);

  const beat1 = screen.getByTestId("e11-beat1");
  expect(beat1.className).toMatch(/\bon\b/);
  expect(beat1.textContent).toMatch(e11Content.beat1.text);

  const beat2 = screen.getByTestId("e11-beat2");
  expect(beat2.className).not.toMatch(/\bon\b/);
});

test("step 1 (canonicalPose) → both beats visible", () => {
  renderAtStep(1);

  const beat1 = screen.getByTestId("e11-beat1");
  expect(beat1.className).toMatch(/\bon\b/);
  expect(beat1.textContent).toMatch(e11Content.beat1.text);

  const beat2 = screen.getByTestId("e11-beat2");
  expect(beat2.className).toMatch(/\bon\b/);
  expect(beat2.textContent).toMatch(e11Content.beat2.text);
});
