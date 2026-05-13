// F.3 — PLUGINS · THE PACKAGE · slide tests.
//
// Mirrors the F.2 canonical Section F 2-step pattern:
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
  F3PluginsThePackage,
  f3Slide,
} from "@/slides/foundation-techniques-section-f/f3-plugins-the-package";
import { f3Content } from "@/slides/foundation-techniques-section-f/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[f3Slide.steps]}>
      <AdvanceTo step={step} />
      <F3PluginsThePackage />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("F.3 declares 2 steps with canonicalPose=1", () => {
  expect(f3Slide.steps).toBe(2);
  expect(f3Slide.canonicalPose).toBe(1);
  expect(f3Slide.animationMode).toBe("step-reveal");
  expect(f3Slide.section).toBe("F");
  expect(f3Slide.surface).toBe("dark");
});

test("F.3 renders the FIG label `FIG. F.3 · THE PACKAGE`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*F\.3.*THE\s*PACKAGE/i);
});

test("step 0 → headline + 5 facet cards visible; footer hidden; right pane empty", () => {
  renderAtStep(0);

  // Headline always present.
  const headline = document.querySelector("h1.slide-headline");
  expect(headline).not.toBeNull();
  expect(headline?.textContent).toMatch(/expertise package/i);

  // All 5 facet cards render and their Reveal wrappers are `on` at step 0.
  const items = screen.getAllByTestId(/^facet-item-/);
  expect(items).toHaveLength(5);
  for (const f of f3Content.facets) {
    const item = screen.getByTestId(`facet-item-${f.id}`);
    expect(item.className).toMatch(/\bon\b/);
    expect(item.textContent).toMatch(f.title);
  }

  // Footer not yet revealed at step 0.
  const footer = screen.getByTestId("f-facet-footer");
  expect(footer.className).not.toMatch(/\bon\b/);

  // Right pane bordered box is visible.
  expect(screen.getByTestId("f3-right-pane")).toBeInTheDocument();

  // No facet hovered → none of the 5 state layers are active.
  for (const f of f3Content.facets) {
    const state = screen.queryByTestId(`f-detail-state-${f.id}`);
    expect(state?.getAttribute("data-active")).toBe("false");
  }
});

test("step 1 → footer reveals; cards stay visible", () => {
  renderAtStep(1);

  const footer = screen.getByTestId("f-facet-footer");
  expect(footer.className).toMatch(/\bon\b/);
  expect(footer.textContent).toMatch(/packaged/);

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
    screen.getByTestId("f-detail-state-whats-inside").getAttribute("data-active"),
  ).toBe("false");
});

test("hover swap → canvas swaps to the new facet's state", () => {
  renderAtStep(0);

  const whatItIs = screen.getByTestId("facet-item-what-it-is");
  const whatsInside = screen.getByTestId("facet-item-whats-inside");

  fireEvent.mouseEnter(whatItIs.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-what-it-is").getAttribute("data-active"),
  ).toBe("true");

  fireEvent.mouseLeave(whatItIs.firstChild as HTMLElement);
  fireEvent.mouseEnter(whatsInside.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-what-it-is").getAttribute("data-active"),
  ).toBe("false");
  expect(
    screen.getByTestId("f-detail-state-whats-inside").getAttribute("data-active"),
  ).toBe("true");
});

test("mouse leave → all facet state layers return to inactive", () => {
  renderAtStep(0);

  const whyPackage = screen.getByTestId("facet-item-why-package");

  fireEvent.mouseEnter(whyPackage.firstChild as HTMLElement);
  expect(
    screen.getByTestId("f-detail-state-why-package").getAttribute("data-active"),
  ).toBe("true");

  fireEvent.mouseLeave(whyPackage.firstChild as HTMLElement);
  for (const f of f3Content.facets) {
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
  // F.3 explicitly drops `defaultState` so the canvas is empty until hover.
  expect(screen.queryByTestId("f-detail-state-default")).toBeNull();
});
