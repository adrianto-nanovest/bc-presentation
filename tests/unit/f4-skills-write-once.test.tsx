// F.4 — SKILLS · WRITE ONCE · slide tests.
//
// Mirrors the canonical Section F 2-step pattern established by F.2:
//   0 — all 5 facet cards stagger-reveal; hover always-on; right-pane
//       bordered box visible but content area empty; footer hidden.
//   1 — italic footer caption fades in. Cards stay; hover continues to
//       drive the right pane.
//
// Hover behavior: hovering facet card N sets `activeFacet = N.id`, which
// crossfades the matching illustration into the bordered box. Mouse-leave
// clears activeFacet; the bordered box renders empty again.
//
// Additionally verifies that all five facet hover states are wired into
// DetailCanvas (per the canonical F.2 hover-only pattern with NO defaultState).
import { fireEvent, render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  F4SkillsWriteOnce,
  f4Slide,
} from "@/slides/foundation-techniques-section-f/f4-skills-write-once";
import { f4Content } from "@/slides/foundation-techniques-section-f/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[f4Slide.steps]}>
      <AdvanceTo step={step} />
      <F4SkillsWriteOnce />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("F.4 declares 2 steps with canonicalPose=1", () => {
  expect(f4Slide.steps).toBe(2);
  expect(f4Slide.canonicalPose).toBe(1);
  expect(f4Slide.animationMode).toBe("step-reveal");
  expect(f4Slide.section).toBe("F");
  expect(f4Slide.surface).toBe("dark");
});

test("F.4 renders the FIG label `FIG. F.4 · WRITE ONCE`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*F\.4.*WRITE\s*ONCE/i);
});

test("step 0 → headline + 5 facet cards visible; footer hidden; right pane empty", () => {
  renderAtStep(0);

  // Headline always present.
  const headline = document.querySelector("h1.slide-headline");
  expect(headline).not.toBeNull();
  expect(headline?.textContent).toMatch(/Write expertise once/i);

  // All 5 facet cards render and their Reveal wrappers are `on` at step 0.
  const items = screen.getAllByTestId(/^facet-item-/);
  expect(items).toHaveLength(5);
  for (const f of f4Content.facets) {
    const item = screen.getByTestId(`facet-item-${f.id}`);
    expect(item.className).toMatch(/\bon\b/);
    expect(item.textContent).toMatch(f.title);
  }

  // Footer not yet revealed at step 0.
  const footer = screen.getByTestId("f-facet-footer");
  expect(footer.className).not.toMatch(/\bon\b/);

  // Right pane bordered box is visible.
  expect(screen.getByTestId("f4-right-pane")).toBeInTheDocument();

  // No facet hovered → none of the 5 state layers are active.
  for (const f of f4Content.facets) {
    const state = screen.queryByTestId(`f-detail-state-${f.id}`);
    expect(state?.getAttribute("data-active")).toBe("false");
  }
});

test("step 1 → footer reveals; cards stay visible", () => {
  renderAtStep(1);

  const footer = screen.getByTestId("f-facet-footer");
  expect(footer.className).toMatch(/\bon\b/);
  expect(footer.textContent).toMatch(/write once|everyone gets/i);

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
    screen
      .getByTestId("f-detail-state-progressive-disclosure")
      .getAttribute("data-active"),
  ).toBe("false");
});

test("hover swap → canvas swaps to the new facet's state", () => {
  renderAtStep(0);

  const whatItIs = screen.getByTestId("facet-item-what-it-is");
  const progressive = screen.getByTestId("facet-item-progressive-disclosure");

  fireEvent.mouseEnter(whatItIs.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-what-it-is").getAttribute("data-active"),
  ).toBe("true");

  fireEvent.mouseLeave(whatItIs.firstChild as HTMLElement);
  fireEvent.mouseEnter(progressive.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-what-it-is").getAttribute("data-active"),
  ).toBe("false");
  expect(
    screen
      .getByTestId("f-detail-state-progressive-disclosure")
      .getAttribute("data-active"),
  ).toBe("true");
});

test("mouse leave → all facet state layers return to inactive", () => {
  renderAtStep(0);

  const lean = screen.getByTestId("facet-item-lean-context");

  fireEvent.mouseEnter(lean.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-lean-context").getAttribute("data-active"),
  ).toBe("true");

  fireEvent.mouseLeave(lean.firstChild as HTMLElement);
  for (const f of f4Content.facets) {
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
  // F.4 explicitly drops `defaultState` so the canvas is empty until hover.
  expect(screen.queryByTestId("f-detail-state-default")).toBeNull();
});

test("all five facet hover states are wired into DetailCanvas", () => {
  renderAtStep(0);
  // The canonical pattern requires one state per facet id, registered on
  // the DetailCanvas `states` map. We assert each layer is mounted (even if
  // inactive) so the hover targets exist.
  for (const f of f4Content.facets) {
    expect(screen.getByTestId(`f-detail-state-${f.id}`)).toBeInTheDocument();
  }
});

test("WHAT IT IS hover renders the SKILL.md preview frame without an Expand button", () => {
  renderAtStep(0);

  const whatItIs = screen.getByTestId("facet-item-what-it-is");
  fireEvent.mouseEnter(whatItIs.firstChild as HTMLElement);

  expect(screen.getByTestId("f4-skill-md-preview")).toBeInTheDocument();
  // Expand button + modal have been removed in favor of a looping
  // typewriter stream as the steady-state visualization.
  expect(screen.queryByTestId("f4-skill-md-expand")).toBeNull();
  expect(screen.queryByTestId("f4-skill-modal")).toBeNull();
});

test("PROGRESSIVE DISCLOSURE hover shows the 3-level ladder + LEAN CONTEXT callout", () => {
  renderAtStep(0);

  const facet = screen.getByTestId("facet-item-progressive-disclosure");
  fireEvent.mouseEnter(facet.firstChild as HTMLElement);

  expect(screen.getByTestId("f4-disclosure-level-1")).toBeInTheDocument();
  expect(screen.getByTestId("f4-disclosure-level-2")).toBeInTheDocument();
  expect(screen.getByTestId("f4-disclosure-level-3")).toBeInTheDocument();
  expect(screen.getByTestId("f4-disclosure-callout")).toBeInTheDocument();
});

test("HOW CLAUDE PICKS hover shows three match-skill rows", () => {
  renderAtStep(0);

  const facet = screen.getByTestId("facet-item-how-claude-picks");
  fireEvent.mouseEnter(facet.firstChild as HTMLElement);

  expect(
    screen.getByTestId("match-skill-weekly-report-author"),
  ).toBeInTheDocument();
  expect(screen.getByTestId("match-skill-doc-author")).toBeInTheDocument();
  expect(screen.getByTestId("match-skill-email-drafter")).toBeInTheDocument();
});

test("LEAN CONTEXT hover shows the 3-segment token-budget bar", () => {
  renderAtStep(0);

  const facet = screen.getByTestId("facet-item-lean-context");
  fireEvent.mouseEnter(facet.firstChild as HTMLElement);

  expect(screen.getByTestId("token-seg-metadata")).toBeInTheDocument();
  expect(screen.getByTestId("token-seg-active")).toBeInTheDocument();
  expect(screen.getByTestId("token-seg-rest")).toBeInTheDocument();
});

test("EXAMPLE hover shows the L1/L2/L3 breakdown cards", () => {
  renderAtStep(0);

  const facet = screen.getByTestId("facet-item-example");
  fireEvent.mouseEnter(facet.firstChild as HTMLElement);

  expect(screen.getByTestId("example-card-l1")).toBeInTheDocument();
  expect(screen.getByTestId("example-card-l2")).toBeInTheDocument();
  expect(screen.getByTestId("example-card-l3")).toBeInTheDocument();
});
