// E.3 — PROMPT STRUCTURE · slide tests.
//
// Covers the new 3-step design ported from
// `claude-design-project/jsx/slides-a.jsx:426-600`.
//   0 — spine cards on the left; SpinePopover on the right when a card is
//        hovered, otherwise the right column stays blank
//   1 — framework 5×2 grid mounts on the right (popover gone). Hovering a
//        framework tile lights up the spine entries listed in `f.hits`
//   2 — footer caption reveals beneath the framework grid
import { render, screen, act, fireEvent, within } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E3PromptStructure,
  e3Slide,
} from "@/slides/foundation-core-section-e/e3-prompt-structure";
import { e3Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e3Slide.steps]}>
      <AdvanceTo step={step} />
      <E3PromptStructure />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.3 declares 3 steps with canonicalPose=2", () => {
  expect(e3Slide.steps).toBe(3);
  expect(e3Slide.canonicalPose).toBe(2);
  expect(e3Slide.animationMode).toBe("step-reveal");
  expect(e3Slide.section).toBe("E");
  expect(e3Slide.surface).toBe("dark");
});

test("E.3 renders without throwing under DeckProvider and shows the FigLabel", () => {
  renderAtStep(0);
  expect(
    screen.getByText(/FIG\. E\.3 · LAYER 1 · STRUCTURE/),
  ).toBeInTheDocument();
});

test("step 0 → 6 spine cards visible; framework grid + footer hidden; right column blank by default", () => {
  renderAtStep(0);

  // All six spine cards mount; the Reveal wrapper around each one reaches
  // its visible state (`on` class).
  const cards = screen.getAllByTestId(/^spine-card-/);
  expect(cards).toHaveLength(6);
  for (const c of cards) {
    // Each card lives inside a `Reveal` wrapper that gains the `on` class.
    const wrapper = c.parentElement;
    expect(wrapper?.className).toMatch(/\bon\b/);
  }

  // Framework grid not rendered yet, footer not rendered yet.
  expect(screen.queryByTestId("e3-framework-grid")).not.toBeInTheDocument();
  expect(screen.queryByTestId("e3-footer")).not.toBeInTheDocument();

  // No hover yet → no popover on the right.
  expect(screen.queryByTestId(/^spine-popover-/)).not.toBeInTheDocument();
});

test("step 0 + hover spine entry → SpinePopover renders that entry's content", () => {
  renderAtStep(0);

  // Hover the third spine card ("Output Format").
  const target = e3Content.spine[2];
  const card = screen.getByTestId(`spine-card-${target.id}`);
  fireEvent.mouseEnter(card);

  // Active flag flips on the hovered card.
  expect(card.getAttribute("data-active")).toBe("true");

  // Popover for THIS entry mounts; its content reflects the data payload.
  const popover = screen.getByTestId(`spine-popover-${target.id}`);
  expect(popover).toBeInTheDocument();
  expect(within(popover).getByText(target.pop.desc)).toBeInTheDocument();
  // Each row label + items should be in the popover.
  for (const row of target.pop.rows) {
    expect(within(popover).getByText(row.label)).toBeInTheDocument();
    for (const item of row.items) {
      expect(within(popover).getByText(item)).toBeInTheDocument();
    }
  }

  // Move off → popover unmounts (right column blank again).
  fireEvent.mouseLeave(card);
  expect(
    screen.queryByTestId(`spine-popover-${target.id}`),
  ).not.toBeInTheDocument();
});

test("step 0 + hover spine entry with `pattern` → pattern text rendered", () => {
  renderAtStep(0);
  // The "role" entry has a `pattern` line ("You are ... with N years exp...").
  const target = e3Content.spine[0];
  expect(target.id).toBe("role");
  expect(target.pop.pattern).toBeTruthy();

  fireEvent.mouseEnter(screen.getByTestId(`spine-card-${target.id}`));
  const popover = screen.getByTestId(`spine-popover-${target.id}`);
  expect(within(popover).getByText(target.pop.pattern!)).toBeInTheDocument();
});

test("step 0 + hover spine entry with `note` → note text rendered", () => {
  renderAtStep(0);
  // The "input" entry has a `note` footer.
  const target = e3Content.spine[5];
  expect(target.id).toBe("input");
  expect(target.pop.note).toBeTruthy();

  fireEvent.mouseEnter(screen.getByTestId(`spine-card-${target.id}`));
  const popover = screen.getByTestId(`spine-popover-${target.id}`);
  expect(within(popover).getByText(target.pop.note!)).toBeInTheDocument();
});

test("step 1 → framework 5×2 grid renders 10 tiles; popover gone; footer still hidden", () => {
  renderAtStep(1);

  expect(screen.getByTestId("e3-framework-grid")).toBeInTheDocument();

  const tiles = screen.getAllByTestId(/^framework-tile-/);
  expect(tiles).toHaveLength(10);

  // Right column is now owned by the grid — no popover even if a spine card
  // is mouse-entered (popover only renders on step 0).
  fireEvent.mouseEnter(screen.getByTestId("spine-card-role"));
  expect(screen.queryByTestId(/^spine-popover-/)).not.toBeInTheDocument();

  // Footer still hidden.
  expect(screen.queryByTestId("e3-footer")).not.toBeInTheDocument();
});

test("step 1 + hover framework → spine entries listed in `hits` activate", () => {
  renderAtStep(1);

  // Pick the CARE framework — hits = [4, 2, 3, 5] → context, instruction,
  // output, examples.
  const fw = e3Content.frameworks.find((f) => f.id === "care")!;
  const tile = screen.getByTestId(`framework-tile-${fw.id}`);
  fireEvent.mouseEnter(tile);

  expect(tile.getAttribute("data-hovered")).toBe("true");

  // Each spine entry whose `num` is in `fw.hits` should be active; others not.
  // Widen the readonly tuple to `readonly number[]` so .includes() accepts
  // the broader spine `num` union.
  const hits: readonly number[] = fw.hits;
  for (const s of e3Content.spine) {
    const card = screen.getByTestId(`spine-card-${s.id}`);
    const expected = hits.includes(s.num) ? "true" : "false";
    expect(card.getAttribute("data-active")).toBe(expected);
  }

  // Move off → all spine cards drop back to inactive.
  fireEvent.mouseLeave(tile);
  for (const s of e3Content.spine) {
    expect(
      screen.getByTestId(`spine-card-${s.id}`).getAttribute("data-active"),
    ).toBe("false");
  }
});

test("step 2 → footer caption reveals beneath the framework grid", () => {
  renderAtStep(2);
  const footer = screen.getByTestId("e3-footer");
  expect(footer).toBeInTheDocument();
  // `highlight()` splits keywords into their own spans — span across with
  // textContent.
  expect(footer.textContent).toMatch(/Same six ingredients/);
  // Framework grid still rendered alongside the footer.
  expect(screen.getByTestId("e3-framework-grid")).toBeInTheDocument();
});
