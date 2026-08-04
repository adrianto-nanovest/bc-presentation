// The section-E bridge — BRIDGE · BUILT · slide tests.
//
// Named for the slide, not for a number: the letter and number it prints are
// derived from its composed position (§3), so the FIG assertion below tracks
// what the deck composes TODAY (E.12) and not the `e13` in the id.
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
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  E13BridgeToF,
  e13Slide,
} from "@/slides/foundation-core-section-e/e13-bridge-to-f";
import { e13Beat2For, e13Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <SlideHarness def={e13Slide}>
      <AdvanceTo step={step} />
      <E13BridgeToF />
    </SlideHarness>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("the bridge declares 2 steps with canonicalPose=1", () => {
  expect(e13Slide.steps).toBe(2);
  expect(e13Slide.canonicalPose).toBe(1);
  expect(e13Slide.animationMode).toBe("step-reveal");
  expect(e13Slide.sectionKey).toBe("fundamentals");
  expect(e13Slide.surface).toBe("dark");
});

test("the bridge renders the FIG label the deck derives for it — today `E.12`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.12.*BRIDGE.*BUILT/i);
});

test("the bridge renders its hero photo + three layered overlays", () => {
  renderAtStep(0);

  const hero = screen.getByTestId("e13-hero");
  expect(hero).toBeInTheDocument();
  expect(hero.style.backgroundImage).toMatch(/e11-bridge\.jpg/);

  expect(screen.getByTestId("e13-overlay-bottom-left")).toBeInTheDocument();
  expect(screen.getByTestId("e13-overlay-top-left")).toBeInTheDocument();
  expect(screen.getByTestId("e13-overlay-top-gloom")).toBeInTheDocument();
});

test("step 0 → beat 1 visible, beat 2 hidden", () => {
  renderAtStep(0);

  const lineA = screen.getByTestId("e13-beat1-lineA");
  const lineB = screen.getByTestId("e13-beat1-lineB");
  expect(lineA.className).toMatch(/\bon\b/);
  expect(lineB.className).toMatch(/\bon\b/);
  expect(lineA.textContent).toMatch(e13Content.beat1.lineA.text);
  expect(lineB.textContent).toMatch(e13Content.beat1.lineB.text);

  const beat2 = screen.getByTestId("e13-beat2");
  expect(beat2.className).not.toMatch(/\bon\b/);
});

test("step 1 (canonicalPose) → both beats visible", () => {
  renderAtStep(1);

  const lineA = screen.getByTestId("e13-beat1-lineA");
  const lineB = screen.getByTestId("e13-beat1-lineB");
  expect(lineA.className).toMatch(/\bon\b/);
  expect(lineB.className).toMatch(/\bon\b/);
  expect(lineA.textContent).toMatch(e13Content.beat1.lineA.text);
  expect(lineB.textContent).toMatch(e13Content.beat1.lineB.text);

  const beat2 = screen.getByTestId("e13-beat2");
  expect(beat2.className).toMatch(/\bon\b/);
  // The STANDARD line: this file mounts the slide under the default variant
  // (`localhost` → `general` → deck set `standard`). Beat 2 is deck-set-scoped as
  // of gh#41 — the leader deck's line is asserted in
  // `variant-composition.test.tsx`, which is where a per-variant epoch is set up.
  expect(beat2.textContent).toMatch(e13Beat2For("standard").text);
});
