// F.7 — SUB-AGENTS · SPECIALISTS · slide tests.
//
// Covers the canonical Section F 2-step pattern (mirrors F.2):
//   0 — all 5 facet cards stagger-reveal; hover always-on; right-pane
//       bordered box visible but content area empty; footer hidden.
//   1 — italic footer caption fades in. Cards stay; hover continues to
//       drive the right pane.
//
// Hover behavior: hovering facet card N sets `activeFacet = N.id`, which
// crossfades the matching illustration into the bordered box. Mouse-leave
// clears activeFacet; the bordered box renders empty again.
import { fireEvent, render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  F7SubagentsSpecialists,
  f7Slide,
} from "@/slides/foundation-techniques-section-f/f7-subagents-specialists";
import { f7Content } from "@/slides/foundation-techniques-section-f/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[f7Slide.steps]}>
      <AdvanceTo step={step} />
      <F7SubagentsSpecialists />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("F.7 declares 2 steps with canonicalPose=1", () => {
  expect(f7Slide.steps).toBe(2);
  expect(f7Slide.canonicalPose).toBe(1);
  expect(f7Slide.animationMode).toBe("step-reveal");
  expect(f7Slide.section).toBe("F");
  expect(f7Slide.surface).toBe("dark");
});

test("F.7 renders the FIG label `FIG. F.7 · SPECIALISTS`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*F\.7.*SPECIALISTS/i);
});

test("step 0 → headline + 5 facet cards visible; footer hidden; right pane empty", () => {
  renderAtStep(0);

  // Headline always present.
  const headline = document.querySelector("h1.slide-headline");
  expect(headline).not.toBeNull();
  expect(headline?.textContent).toMatch(/Specialist departments/i);

  // All 5 facet cards render and their Reveal wrappers are `on` at step 0.
  const items = screen.getAllByTestId(/^facet-item-/);
  expect(items).toHaveLength(5);
  for (const f of f7Content.facets) {
    const item = screen.getByTestId(`facet-item-${f.id}`);
    expect(item.className).toMatch(/\bon\b/);
    expect(item.textContent).toMatch(f.title);
  }

  // Footer not yet revealed at step 0.
  const footer = screen.getByTestId("f-facet-footer");
  expect(footer.className).not.toMatch(/\bon\b/);

  // Right pane bordered box is visible.
  expect(screen.getByTestId("f7-right-pane")).toBeInTheDocument();

  // No facet hovered → none of the 5 state layers are active.
  for (const f of f7Content.facets) {
    const state = screen.queryByTestId(`f-detail-state-${f.id}`);
    expect(state?.getAttribute("data-active")).toBe("false");
  }
});

test("step 1 → footer reveals; cards stay visible", () => {
  renderAtStep(1);

  const footer = screen.getByTestId("f-facet-footer");
  expect(footer.className).toMatch(/\bon\b/);
  expect(footer.textContent).toMatch(/planner picks the pattern/i);

  // Cards still shown.
  expect(screen.getAllByTestId(/^facet-item-/)).toHaveLength(5);
});

test("hover at step 0 → DetailCanvas state activates for that facet", () => {
  renderAtStep(0);

  // Initially no state is active.
  const initial = screen.getByTestId("f-detail-state-what-it-is");
  expect(initial.getAttribute("data-active")).toBe("false");

  // Hover WHAT IT IS facet.
  const whatItIs = screen.getByTestId("facet-item-what-it-is");
  fireEvent.mouseEnter(whatItIs.firstChild as HTMLElement);

  expect(
    screen.getByTestId("f-detail-state-what-it-is").getAttribute("data-active"),
  ).toBe("true");
  // Other facets remain inactive.
  expect(
    screen.getByTestId("f-detail-state-how-it-works").getAttribute("data-active"),
  ).toBe("false");
});

test("hover swap → canvas swaps to the new facet's state", () => {
  renderAtStep(0);

  const whatItIs = screen.getByTestId("facet-item-what-it-is");
  const patterns = screen.getByTestId("facet-item-patterns");

  fireEvent.mouseEnter(whatItIs.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-what-it-is").getAttribute("data-active"),
  ).toBe("true");

  fireEvent.mouseLeave(whatItIs.firstChild as HTMLElement);
  fireEvent.mouseEnter(patterns.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-what-it-is").getAttribute("data-active"),
  ).toBe("false");
  expect(
    screen.getByTestId("f-detail-state-patterns").getAttribute("data-active"),
  ).toBe("true");
});

test("mouse leave → all facet state layers return to inactive", () => {
  renderAtStep(0);

  const whenToUse = screen.getByTestId("facet-item-when-to-use");

  fireEvent.mouseEnter(whenToUse.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-when-to-use").getAttribute("data-active"),
  ).toBe("true");

  fireEvent.mouseLeave(whenToUse.firstChild as HTMLElement);
  for (const f of f7Content.facets) {
    expect(
      screen.getByTestId(`f-detail-state-${f.id}`).getAttribute("data-active"),
    ).toBe("false");
  }
});

test("hover applies data-active on the hovered Reveal wrapper", () => {
  renderAtStep(0);

  const example = screen.getByTestId("facet-item-example");
  expect(example.getAttribute("data-active")).toBe("false");

  fireEvent.mouseEnter(example.firstChild as HTMLElement);
  expect(example.getAttribute("data-active")).toBe("true");

  fireEvent.mouseLeave(example.firstChild as HTMLElement);
  expect(example.getAttribute("data-active")).toBe("false");
});

test("DetailCanvas omits the default state layer when no defaultState prop is provided", () => {
  renderAtStep(0);
  // F.7 explicitly drops `defaultState` so the canvas is empty until hover.
  expect(screen.queryByTestId("f-detail-state-default")).toBeNull();
});

test("all 5 facet hover states are wired into DetailCanvas", () => {
  renderAtStep(0);
  // Each facet id from content must have a corresponding state layer.
  for (const f of f7Content.facets) {
    expect(screen.getByTestId(`f-detail-state-${f.id}`)).toBeInTheDocument();
  }
});

test("ORCHESTRATION PATTERNS state renders the 2×2 pattern grid on hover", () => {
  renderAtStep(0);
  const patterns = screen.getByTestId("facet-item-patterns");
  fireEvent.mouseEnter(patterns.firstChild as HTMLElement);

  // The 2×2 grid container is present inside the patterns state.
  expect(screen.getByTestId("f7-pattern-grid")).toBeInTheDocument();
  // All 4 pattern tiles render.
  for (const p of f7Content.patterns) {
    expect(screen.getByTestId(`f7-pattern-tile-${p.id}`)).toBeInTheDocument();
  }
});
