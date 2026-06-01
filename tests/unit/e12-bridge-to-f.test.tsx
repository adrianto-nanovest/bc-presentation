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
  E12BridgeToF,
  e12Slide,
} from "@/slides/foundation-core-section-e/e12-bridge-to-f";
import { e12Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e12Slide.steps]}>
      <AdvanceTo step={step} />
      <E12BridgeToF />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.11 declares 2 steps with canonicalPose=1", () => {
  expect(e12Slide.steps).toBe(2);
  expect(e12Slide.canonicalPose).toBe(1);
  expect(e12Slide.animationMode).toBe("step-reveal");
  expect(e12Slide.section).toBe("E");
  expect(e12Slide.surface).toBe("dark");
});

test("E.11 renders the FIG label `FIG. E.11 · BRIDGE · BUILT`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.12.*BRIDGE.*BUILT/i);
});

test("E.11 renders the bridge hero photo + three layered overlays", () => {
  renderAtStep(0);

  const hero = screen.getByTestId("e12-hero");
  expect(hero).toBeInTheDocument();
  expect(hero.style.backgroundImage).toMatch(/e11-bridge\.jpg/);

  expect(screen.getByTestId("e12-overlay-bottom-left")).toBeInTheDocument();
  expect(screen.getByTestId("e12-overlay-top-left")).toBeInTheDocument();
  expect(screen.getByTestId("e12-overlay-top-gloom")).toBeInTheDocument();
});

test("step 0 → beat 1 visible, beat 2 hidden", () => {
  renderAtStep(0);

  const lineA = screen.getByTestId("e12-beat1-lineA");
  const lineB = screen.getByTestId("e12-beat1-lineB");
  expect(lineA.className).toMatch(/\bon\b/);
  expect(lineB.className).toMatch(/\bon\b/);
  expect(lineA.textContent).toMatch(e12Content.beat1.lineA.text);
  expect(lineB.textContent).toMatch(e12Content.beat1.lineB.text);

  const beat2 = screen.getByTestId("e12-beat2");
  expect(beat2.className).not.toMatch(/\bon\b/);
});

test("step 1 (canonicalPose) → both beats visible", () => {
  renderAtStep(1);

  const lineA = screen.getByTestId("e12-beat1-lineA");
  const lineB = screen.getByTestId("e12-beat1-lineB");
  expect(lineA.className).toMatch(/\bon\b/);
  expect(lineB.className).toMatch(/\bon\b/);
  expect(lineA.textContent).toMatch(e12Content.beat1.lineA.text);
  expect(lineB.textContent).toMatch(e12Content.beat1.lineB.text);

  const beat2 = screen.getByTestId("e12-beat2");
  expect(beat2.className).toMatch(/\bon\b/);
  expect(beat2.textContent).toMatch(e12Content.beat2.text);
});
