// F.2 — RAG · GROUND TRUTH · slide tests.
//
// Covers the canonical Section F 2-step pattern:
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
  F2RagGroundTruth,
  f2Slide,
} from "@/slides/foundation-techniques-section-f/f2-rag-ground-truth";
import { f2Content } from "@/slides/foundation-techniques-section-f/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[f2Slide.steps]}>
      <AdvanceTo step={step} />
      <F2RagGroundTruth />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("F.2 declares 2 steps with canonicalPose=1", () => {
  expect(f2Slide.steps).toBe(2);
  expect(f2Slide.canonicalPose).toBe(1);
  expect(f2Slide.animationMode).toBe("step-reveal");
  expect(f2Slide.section).toBe("F");
  expect(f2Slide.surface).toBe("dark");
});

test("F.2 renders the FIG label `FIG. F.2 · GROUND TRUTH`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*F\.2.*GROUND\s*TRUTH/i);
});

test("step 0 → headline + 5 facet cards visible; footer hidden; right pane empty", () => {
  renderAtStep(0);

  // Headline always present.
  const headline = document.querySelector("h1.slide-headline");
  expect(headline).not.toBeNull();
  expect(headline?.textContent).toMatch(/Grounding/);

  // All 5 facet cards render and their Reveal wrappers are `on` at step 0.
  const items = screen.getAllByTestId(/^facet-item-/);
  expect(items).toHaveLength(5);
  for (const f of f2Content.facets) {
    const item = screen.getByTestId(`facet-item-${f.id}`);
    expect(item.className).toMatch(/\bon\b/);
    expect(item.textContent).toMatch(f.title);
  }

  // Footer not yet revealed at step 0.
  const footer = screen.getByTestId("f-facet-footer");
  expect(footer.className).not.toMatch(/\bon\b/);

  // Right pane bordered box is visible.
  expect(screen.getByTestId("f2-right-pane")).toBeInTheDocument();

  // No facet hovered → none of the 5 state layers are active.
  for (const f of f2Content.facets) {
    const state = screen.queryByTestId(`f-detail-state-${f.id}`);
    expect(state?.getAttribute("data-active")).toBe("false");
  }
});

test("step 1 → footer reveals; cards stay visible", () => {
  renderAtStep(1);

  const footer = screen.getByTestId("f-facet-footer");
  expect(footer.className).toMatch(/\bon\b/);
  expect(footer.textContent).toMatch(/summaries|chaos/);

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
  const howItWorks = screen.getByTestId("facet-item-how-it-works");

  fireEvent.mouseEnter(whatItIs.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-what-it-is").getAttribute("data-active"),
  ).toBe("true");

  fireEvent.mouseLeave(whatItIs.firstChild as HTMLElement);
  fireEvent.mouseEnter(howItWorks.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-what-it-is").getAttribute("data-active"),
  ).toBe("false");
  expect(
    screen.getByTestId("f-detail-state-how-it-works").getAttribute("data-active"),
  ).toBe("true");
});

test("mouse leave → all facet state layers return to inactive", () => {
  renderAtStep(0);

  const types = screen.getByTestId("facet-item-the-types");

  fireEvent.mouseEnter(types.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-the-types").getAttribute("data-active"),
  ).toBe("true");

  fireEvent.mouseLeave(types.firstChild as HTMLElement);
  for (const f of f2Content.facets) {
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
  // F.2 explicitly drops `defaultState` so the canvas is empty until hover.
  expect(screen.queryByTestId("f-detail-state-default")).toBeNull();
});
