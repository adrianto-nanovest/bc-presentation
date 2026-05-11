// E.2 — PROMPT WHAT/WHY · slide tests.
//
// Covers the new 6-step design ported from
// `claude-design-project/jsx/slides-a.jsx:317-418`.
//   0 — left pane (definition + outcomes)
//   1 — Naive prompt streams in
//   2 — Naive result streams in
//   3 — Proper prompt streams in
//   4 — Proper result streams in
//   5 — Bridge text reveals
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E2PromptWhatWhy,
  e2Slide,
} from "@/slides/foundation-core-section-e/e2-prompt-what-why";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e2Slide.steps]}>
      <AdvanceTo step={step} />
      <E2PromptWhatWhy />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.2 declares 6 steps with canonicalPose=5", () => {
  expect(e2Slide.steps).toBe(6);
  expect(e2Slide.canonicalPose).toBe(5);
  expect(e2Slide.animationMode).toBe("step-reveal");
  expect(e2Slide.section).toBe("E");
});

test("E.2 renders without throwing under DeckProvider and shows the FigLabel", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.2.*LAYER 1.*PROMPT/i);
});

test("step 0 → left pane (definition + outcomes) visible; bridge hidden", () => {
  renderAtStep(0);
  // Definition + outcomes mount on step 0 (Reveal `on={stepIndex >= 0}`).
  const definition = screen.getByTestId("e2-definition");
  expect(definition).toBeInTheDocument();
  // Highlight wraps the keyword in its own <span>, so use textContent to span
  // across the split.
  expect(definition.textContent).toMatch(/instructions you give the model/);
  expect(screen.getByTestId("e2-outcome-0")).toBeInTheDocument();
  expect(screen.getByTestId("e2-outcome-1")).toBeInTheDocument();
  expect(screen.getByTestId("e2-outcome-2")).toBeInTheDocument();

  // Right pane cards mount as Reveal wrappers but their `on` is false at
  // step 0 → they are still in the DOM but without the `.on` class. The
  // bridge Reveal mounts too; we verify the on/off state via classList.
  expect(screen.getByTestId("e2-naive-card").className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e2-proper-card").className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e2-bridge").className).not.toMatch(/\bon\b/);
});

test("step 1 → Naive card switches to its visible (.on) state", () => {
  renderAtStep(1);
  const naive = screen.getByTestId("e2-naive-card");
  expect(naive.className).toMatch(/\bon\b/);
  // Proper card still hidden.
  expect(screen.getByTestId("e2-proper-card").className).not.toMatch(/\bon\b/);
  // Bridge still hidden.
  expect(screen.getByTestId("e2-bridge").className).not.toMatch(/\bon\b/);
});

test("step 2 → Naive result wrapper expands (height auto, opacity 1)", () => {
  renderAtStep(2);
  const wrap = screen.getByTestId("e2-naive-result-wrap");
  expect(wrap.style.opacity).toBe("1");
  expect(wrap.style.height).toBe("auto");
  // Proper card still hidden.
  expect(screen.getByTestId("e2-proper-card").className).not.toMatch(/\bon\b/);
});

test("step 3 → Proper card switches to its visible (.on) state", () => {
  renderAtStep(3);
  expect(screen.getByTestId("e2-proper-card").className).toMatch(/\bon\b/);
  // Proper result still hidden until step 4.
  const wrap = screen.getByTestId("e2-proper-result-wrap");
  expect(wrap.style.opacity).toBe("0");
});

test("step 4 → Proper result wrapper expands", () => {
  renderAtStep(4);
  const wrap = screen.getByTestId("e2-proper-result-wrap");
  expect(wrap.style.opacity).toBe("1");
  expect(wrap.style.height).toBe("auto");
  // Bridge not yet revealed.
  expect(screen.getByTestId("e2-bridge").className).not.toMatch(/\bon\b/);
});

test("step 5 → bridge text revealed at bottom of left pane", () => {
  renderAtStep(5);
  const bridge = screen.getByTestId("e2-bridge");
  expect(bridge.className).toMatch(/\bon\b/);
  // Highlight splits the kw into its own span — use textContent to span it.
  expect(bridge.textContent).toMatch(/canonical structure/);
});
