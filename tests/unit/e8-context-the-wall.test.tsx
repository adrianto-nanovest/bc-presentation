// E.8 — CONTEXT · PITFALLS · slide tests.
//
// Covers the new 2-step design ported from
// `claude-design-project/jsx/slides-b.jsx:460-636`.
//   0 — 4 pitfall cards visible; right canvas is empty until hover.
//   1 — italic footer caption reveals.
//
// Hover behavior: hovering pitfall card N sets activeKind = N.id, which mounts
// the matching anim inside <PitfallCanvas>. Mouse leave clears activeKind, and
// the canvas reverts to rendering nothing (per T9 — no `defaultIllustration`).
import { fireEvent, render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E8ContextTheWall,
  e8Slide,
} from "@/slides/foundation-core-section-e/e8-context-the-wall";
import { e8Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e8Slide.steps]}>
      <AdvanceTo step={step} />
      <E8ContextTheWall />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.8 declares 2 steps with canonicalPose=1", () => {
  expect(e8Slide.steps).toBe(2);
  expect(e8Slide.canonicalPose).toBe(1);
  expect(e8Slide.animationMode).toBe("step-reveal");
  expect(e8Slide.section).toBe("E");
  expect(e8Slide.surface).toBe("dark");
});

test("E.8 renders the FIG label `FIG. E.8 · CONTEXT · PITFALLS`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.8.*CONTEXT.*PITFALLS/i);
});

test("step 0 → headline + 4 pitfall cards visible; footer hidden; canvas empty", () => {
  renderAtStep(0);

  // Headline is always present (h1 contains the headline text).
  const headline = document.querySelector("h1.slide-headline");
  expect(headline).not.toBeNull();
  expect(headline?.textContent).toMatch(/orchestrating it/);

  // All 4 pitfall items render and their Reveal wrappers are `on` at step 0.
  const items = screen.getAllByTestId(/^pitfall-item-/);
  expect(items).toHaveLength(4);
  for (const p of e8Content.pitfalls) {
    const item = screen.getByTestId(`pitfall-item-${p.id}`);
    expect(item.className).toMatch(/\bon\b/);
    expect(item.textContent).toMatch(p.title);
    expect(item.textContent).toMatch(p.essence);
  }

  // Footer not yet revealed.
  expect(screen.getByTestId("e8-footer").className).not.toMatch(/\bon\b/);

  // Right canvas empty (no card hovered yet).
  expect(screen.queryByTestId("pitfall-canvas")).toBeNull();
});

test("step 1 → footer reveals; cards stay visible", () => {
  renderAtStep(1);

  const footer = screen.getByTestId("e8-footer");
  expect(footer.className).toMatch(/\bon\b/);
  expect(footer.textContent).toMatch(/better way/);

  // Cards still shown.
  expect(screen.getAllByTestId(/^pitfall-item-/)).toHaveLength(4);
});

test("hover pitfall item → PitfallCanvas mounts the matching anim", () => {
  renderAtStep(1);

  // Canvas not present until hover.
  expect(screen.queryByTestId("pitfall-canvas")).toBeNull();

  // Hover CONFLICT card.
  const conflictItem = screen.getByTestId("pitfall-item-conflict");
  fireEvent.mouseEnter(conflictItem.firstChild as HTMLElement);

  const canvas = screen.getByTestId("pitfall-canvas");
  expect(canvas.getAttribute("data-active")).toBe("conflict");
  expect(screen.getByTestId("pit-anim-conflict")).toBeInTheDocument();
  expect(screen.getByTestId("pit-caption-conflict")).toBeInTheDocument();
});

test("hover swap → canvas swaps to the new pitfall's anim", () => {
  renderAtStep(1);

  const conflictItem = screen.getByTestId("pitfall-item-conflict");
  const poisoningItem = screen.getByTestId("pitfall-item-poisoning");

  fireEvent.mouseEnter(conflictItem.firstChild as HTMLElement);
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe(
    "conflict",
  );
  expect(screen.getByTestId("pit-anim-conflict")).toBeInTheDocument();

  fireEvent.mouseLeave(conflictItem.firstChild as HTMLElement);
  fireEvent.mouseEnter(poisoningItem.firstChild as HTMLElement);
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe(
    "poisoning",
  );
  expect(screen.getByTestId("pit-anim-poisoning")).toBeInTheDocument();
  expect(screen.queryByTestId("pit-anim-conflict")).toBeNull();
});

test("mouse leave → PitfallCanvas reverts to null (renders nothing)", () => {
  renderAtStep(1);

  const distractionItem = screen.getByTestId("pitfall-item-distraction");

  fireEvent.mouseEnter(distractionItem.firstChild as HTMLElement);
  expect(screen.getByTestId("pitfall-canvas")).toBeInTheDocument();
  expect(screen.getByTestId("pit-anim-distraction")).toBeInTheDocument();

  fireEvent.mouseLeave(distractionItem.firstChild as HTMLElement);
  expect(screen.queryByTestId("pitfall-canvas")).toBeNull();
  expect(screen.queryByTestId("pit-anim-distraction")).toBeNull();
});

test("hover applies data-active on the hovered Reveal wrapper", () => {
  renderAtStep(1);

  const confusionItem = screen.getByTestId("pitfall-item-confusion");
  expect(confusionItem.getAttribute("data-active")).toBe("false");

  fireEvent.mouseEnter(confusionItem.firstChild as HTMLElement);
  expect(confusionItem.getAttribute("data-active")).toBe("true");

  fireEvent.mouseLeave(confusionItem.firstChild as HTMLElement);
  expect(confusionItem.getAttribute("data-active")).toBe("false");
});
