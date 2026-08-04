// E.1 — THREE LAYERS · slide tests.
//
// Covers the 5-step design (0=PROMPT, 1=CONTEXT, 2=HARNESS, 3=SUMMARY,
// 4=THE LOOP) — steps 0–3 ported from
// `claude-design-project/jsx/slides-a.jsx:36-184`, step 4 added by spec §8.2
// (gh#45).
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  E1ThreeLayers,
  e1Slide,
} from "@/slides/foundation-core-section-e/e1-three-layers";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

/** Both step buttons at once, for tests that must advance within one mount. */
function StepButtons() {
  const { goTo } = useDeck();
  return (
    <>
      <button data-testid="goto-3" onClick={() => goTo(0, 3)} />
      <button data-testid="goto-4" onClick={() => goTo(0, 4)} />
    </>
  );
}

function renderAtStep(step: number) {
  render(
    <SlideHarness def={e1Slide}>
      <AdvanceTo step={step} />
      <E1ThreeLayers />
    </SlideHarness>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.1 declares 5 steps with canonicalPose=4", () => {
  expect(e1Slide.steps).toBe(5);
  expect(e1Slide.canonicalPose).toBe(4);
  expect(e1Slide.animationMode).toBe("step-reveal");
  expect(e1Slide.sectionKey).toBe("fundamentals");
});

test("E.1 renders without throwing under DeckProvider and shows the FigLabel", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.1.*THE THREE LAYERS/i);
});

test("step 0 → PROMPT focal detail visible (titleA + titleB + blurb)", () => {
  renderAtStep(0);
  expect(screen.getByTestId("focal-detail-prompt")).toBeInTheDocument();
  // The headline `Prompt<br/>Engineering` lives inside the focal detail.
  const detail = screen.getByTestId("focal-detail-prompt");
  expect(detail.textContent).toMatch(/Prompt/);
  expect(detail.textContent).toMatch(/Engineering/);
  // The prompt blurb is unique to this layer.
  expect(screen.getByText(/How you instruct/)).toBeInTheDocument();
  // Other layers' detail panes should not be in the DOM.
  expect(screen.queryByTestId("focal-detail-context")).toBeNull();
  expect(screen.queryByTestId("focal-detail-harness")).toBeNull();
  expect(screen.queryByTestId("layer-summary")).toBeNull();
  expect(screen.queryByTestId("e1-footer-quote")).toBeNull();
});

test("step 1 → CONTEXT focal detail visible", () => {
  renderAtStep(1);
  expect(screen.getByTestId("focal-detail-context")).toBeInTheDocument();
  const detail = screen.getByTestId("focal-detail-context");
  expect(detail.textContent).toMatch(/Context/);
  expect(detail.textContent).toMatch(/Engineering/);
  expect(screen.getByText(/What the model sees/)).toBeInTheDocument();
  expect(screen.queryByTestId("focal-detail-prompt")).toBeNull();
  expect(screen.queryByTestId("focal-detail-harness")).toBeNull();
});

test("step 2 → HARNESS focal detail visible", () => {
  renderAtStep(2);
  expect(screen.getByTestId("focal-detail-harness")).toBeInTheDocument();
  const detail = screen.getByTestId("focal-detail-harness");
  expect(detail.textContent).toMatch(/Harness/);
  expect(detail.textContent).toMatch(/Engineering/);
  expect(screen.getByText(/system around the model/)).toBeInTheDocument();
  expect(screen.queryByTestId("focal-detail-prompt")).toBeNull();
  expect(screen.queryByTestId("focal-detail-context")).toBeNull();
});

test("step 3 → LayerSummary visible with all 3 rows + footer quote", () => {
  renderAtStep(3);
  expect(screen.getByTestId("layer-summary")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-prompt")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-context")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-harness")).toBeInTheDocument();
  expect(screen.getByTestId("e1-footer-quote")).toBeInTheDocument();
  expect(screen.getByText(/Anthropic/)).toBeInTheDocument();
});

// ───────────────────── step 4 · THE LOOP (gh#45) ─────────────────────

const SMIL = "animate, animateMotion, animateTransform, set, mpath";

test("steps 0–3 leave the orbit off", () => {
  for (const step of [0, 1, 2, 3]) {
    renderAtStep(step);
    expect(screen.getByTestId("ring-stack").getAttribute("data-orbit")).toBe("false");
    expect(screen.queryByTestId("ring-orbit")).toBeNull();
    expect(screen.queryByTestId("e1-loop-footer")).toBeNull();
    cleanup();
  }
});

test("step 4 → orbit sweeps the rings and names THE LOOP", () => {
  renderAtStep(4);
  expect(screen.getByTestId("ring-stack").getAttribute("data-orbit")).toBe("true");
  expect(screen.getByTestId("ring-orbit")).toBeInTheDocument();
  expect(screen.getByText("THE LOOP")).toBeInTheDocument();
  // Space, not a fourth ring: the same three rings are still the figure.
  expect(screen.getByTestId("ring-prompt")).toBeInTheDocument();
  expect(screen.getByTestId("ring-context")).toBeInTheDocument();
  expect(screen.getByTestId("ring-harness")).toBeInTheDocument();
});

test("step 4 keeps LayerSummary mounted, unchanged", () => {
  renderAtStep(4);
  expect(screen.getByTestId("layer-summary")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-prompt")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-context")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-harness")).toBeInTheDocument();
});

test("advancing 3 → 4 does not remount LayerSummary (its reveals must not replay)", () => {
  render(
    <SlideHarness def={e1Slide}>
      <StepButtons />
      <E1ThreeLayers />
    </SlideHarness>,
  );
  act(() => {
    screen.getByTestId("goto-3").click();
  });
  const atStep3 = screen.getByTestId("layer-summary");
  const htmlAtStep3 = atStep3.innerHTML;
  act(() => {
    screen.getByTestId("goto-4").click();
  });
  // Same DOM node, same content — the summary is carried, not rebuilt.
  expect(screen.getByTestId("layer-summary")).toBe(atStep3);
  expect(screen.getByTestId("layer-summary").innerHTML).toBe(htmlAtStep3);
});

test("step 4 footer reads the loop line and replaces the step-3 quote", () => {
  renderAtStep(4);
  const footer = screen.getByTestId("e1-loop-footer");
  expect(footer.textContent).toBe(
    "Three layers make one run. The loop makes it repeat.",
  );
  expect(screen.queryByTestId("e1-footer-quote")).toBeNull();
});

test("step 4 footer highlights prose keywords", () => {
  renderAtStep(4);
  const marks = screen
    .getByTestId("e1-loop-footer")
    .querySelectorAll("em.text-copper-400");
  expect(marks.length).toBeGreaterThan(0);
  // The mono orbit label is not prose — it carries no keyword markup.
  expect(screen.getByText("THE LOOP").closest("em")).toBeNull();
});

test("prefers-reduced-motion: step 4 mounts zero SMIL nodes and still renders", () => {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
  try {
    renderAtStep(4);
    expect(document.querySelectorAll(SMIL).length).toBe(0);
    expect(screen.getByTestId("ring-orbit")).toBeInTheDocument();
    expect(screen.getByText("THE LOOP")).toBeInTheDocument();
    expect(screen.getByTestId("layer-summary")).toBeInTheDocument();
    expect(screen.getByTestId("e1-loop-footer")).toBeInTheDocument();
  } finally {
    window.matchMedia = original;
  }
});

test("hovering a tag chip updates its data-hover attribute", () => {
  renderAtStep(0);
  const chip = screen.getByTestId("tag-chip-role");
  expect(chip.getAttribute("data-hover")).toBe("false");
  fireEvent.mouseEnter(chip);
  expect(chip.getAttribute("data-hover")).toBe("true");
  fireEvent.mouseLeave(chip);
  expect(chip.getAttribute("data-hover")).toBe("false");
});
