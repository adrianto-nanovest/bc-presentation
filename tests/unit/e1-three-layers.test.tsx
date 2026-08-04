// E.1 — THREE LAYERS · slide tests.
//
// Covers the 5-step design (0=PROMPT, 1=CONTEXT, 2=HARNESS, 3=THE LOOP,
// 4=SUMMARY). Steps 0–2 ported from `claude-design-project/jsx/slides-a.jsx:36-184`;
// the loop's own focal step and the four-row summary are owner direction
// (2026-08-04), replacing the step-3 quote pose and the §8.2 sweep arc.
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
  expect(detail.textContent).toMatch(/Layer 1/);
  // The prompt blurb is unique to this layer.
  expect(screen.getByText(/How you instruct/)).toBeInTheDocument();
  // Other layers' detail panes should not be in the DOM.
  expect(screen.queryByTestId("focal-detail-context")).toBeNull();
  expect(screen.queryByTestId("focal-detail-harness")).toBeNull();
  expect(screen.queryByTestId("focal-detail-loop")).toBeNull();
  expect(screen.queryByTestId("layer-summary")).toBeNull();
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

// ───────────────────── step 3 · THE LOOP ─────────────────────

test("steps 0–2 leave the loop ring off the figure", () => {
  for (const step of [0, 1, 2]) {
    renderAtStep(step);
    expect(screen.getByTestId("ring-stack").getAttribute("data-loop")).toBe("false");
    expect(screen.queryByTestId("ring-loop")).toBeNull();
    expect(screen.queryByTestId("e1-loop-footer")).toBeNull();
    cleanup();
  }
});

test("step 3 → Loop Engineering gets the same focal card as the three layers", () => {
  renderAtStep(3);
  const detail = screen.getByTestId("focal-detail-loop");
  expect(detail.textContent).toMatch(/Loop/);
  expect(detail.textContent).toMatch(/Engineering/);
  expect(detail.textContent).toMatch(/the repetition/);
  // Key-term chips, same as any layer.
  expect(screen.getByTestId("tag-chip-heartbeat")).toBeInTheDocument();
  expect(screen.getByTestId("tag-chip-spine")).toBeInTheDocument();
  // The summary is not up yet.
  expect(screen.queryByTestId("layer-summary")).toBeNull();
});

test("step 3 does NOT number the loop as a fourth layer", () => {
  renderAtStep(3);
  const detail = screen.getByTestId("focal-detail-loop");
  expect(detail.textContent).not.toMatch(/Layer 4/i);
  expect(detail.textContent).toMatch(/Around all three/i);
});

test("step 3 → outer loop ring is the highlighted one, and it carries the marker", () => {
  renderAtStep(3);
  expect(screen.getByTestId("ring-stack").getAttribute("data-loop")).toBe("true");
  expect(screen.getByTestId("ring-loop").getAttribute("data-focal")).toBe("true");
  expect(screen.getByTestId("ring-harness").getAttribute("data-focal")).toBe("false");
  expect(screen.getByTestId("ring-loop-marker")).toBeInTheDocument();
  // The three layers are still on stage underneath it.
  expect(screen.getByTestId("ring-prompt")).toBeInTheDocument();
  expect(screen.getByTestId("ring-context")).toBeInTheDocument();
  expect(screen.getByTestId("ring-harness")).toBeInTheDocument();
});

test("step 3 carries no footer line", () => {
  renderAtStep(3);
  expect(screen.queryByTestId("e1-loop-footer")).toBeNull();
  // The Anthropic harness quote is gone from this slide (it still lives on E.10).
  expect(screen.queryByText(/A decent model with a great harness/)).toBeNull();
});

// ───────────────────── step 4 · THE FULL STACK ─────────────────────

test("step 4 → summary lists the three layers plus the loop", () => {
  renderAtStep(4);
  expect(screen.getByTestId("layer-summary")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-prompt")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-context")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-harness")).toBeInTheDocument();
  expect(screen.getByTestId("summary-row-loop")).toBeInTheDocument();
  // The loop row is marked, not numbered — and the marker does not repeat the
  // title's own word.
  const loopRow = screen.getByTestId("summary-row-loop");
  expect(loopRow.textContent).toMatch(/Around/);
  expect(loopRow.textContent).not.toMatch(/Layer 4/i);
  expect(loopRow.textContent?.match(/Loop/g)).toHaveLength(1);
  // Fixed-width marker column: all four titles start at the same x.
  const markerWidths = ["prompt", "context", "harness", "loop"].map(
    (id) =>
      (screen.getByTestId(`summary-row-${id}`).firstElementChild as HTMLElement)
        .style.width,
  );
  expect(new Set(markerWidths).size).toBe(1);
  expect(screen.queryByTestId("focal-detail-loop")).toBeNull();
});

test("step 4 → whole figure revealed: four rings, no highlight, marker still running", () => {
  renderAtStep(4);
  const stack = screen.getByTestId("ring-stack");
  expect(stack.getAttribute("data-mode")).toBe("summary");
  expect(stack.getAttribute("data-loop")).toBe("true");
  for (const id of ["ring-prompt", "ring-context", "ring-harness", "ring-loop"]) {
    expect(screen.getByTestId(id).getAttribute("data-focal")).toBe("false");
  }
  expect(screen.getByTestId("ring-loop-marker")).toBeInTheDocument();
});

test("step 4 footer reads the loop line and rests on the nav counter row", () => {
  renderAtStep(4);
  const footer = screen.getByTestId("e1-loop-footer") as HTMLElement;
  expect(footer.textContent).toBe(
    "Three layers make one run. The loop makes it repeat.",
  );
  const bottom = parseInt(footer.style.bottom, 10);
  // The nav's `STEP nn / nn` text runs y≈660–672 (14px pad + 28px buttons + 6px
  // gap from the 720 floor). The footer's baseline row must END on the top of
  // it, i.e. at y≈660 — a 17px/1.4 line does that at bottom 60.
  expect(bottom).toBeGreaterThanOrEqual(54);
  expect(bottom).toBeLessThanOrEqual(66);
  // …and it still starts below the figure, whose outer ring ends at y=606.
  expect(720 - bottom - 24).toBeGreaterThan(606);
});

test("step 4 footer highlights prose keywords", () => {
  renderAtStep(4);
  const marks = screen
    .getByTestId("e1-loop-footer")
    .querySelectorAll("em.text-copper-400");
  expect(marks.length).toBeGreaterThan(0);
  // The mono ring label is not prose — it carries no keyword markup.
  expect(screen.getByText("LOOP").closest("em")).toBeNull();
});

test("prefers-reduced-motion: steps 3–4 mount zero SMIL nodes and still render", () => {
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
    for (const step of [3, 4]) {
      renderAtStep(step);
      // Motion is CSS-only, so the global reduce rule handles it.
      expect(
        document.querySelectorAll("animate, animateMotion, animateTransform, set, mpath")
          .length,
      ).toBe(0);
      expect(screen.getByTestId("ring-loop")).toBeInTheDocument();
      expect(screen.getByText("LOOP")).toBeInTheDocument();
      cleanup();
    }
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
