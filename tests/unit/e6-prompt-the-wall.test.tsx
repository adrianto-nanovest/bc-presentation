// E.5 — PROMPT · THE WALL · slide tests.
//
// Covers the new 4-step design ported from
// `claude-design-project/jsx/slides-b.jsx:5-74`.
//   0 — BP card reveals
//   1 — CM card reveals
//   2 — "WHERE PROMPT ENDS" wall section + 3-col constraint grid reveals
//   3 — italic closing line reveals
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E6PromptTheWall,
  e6Slide,
} from "@/slides/foundation-core-section-e/e6-prompt-the-wall";
import { e6Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e6Slide.steps]}>
      <AdvanceTo step={step} />
      <E6PromptTheWall />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.5 declares 4 steps with canonicalPose=3", () => {
  expect(e6Slide.steps).toBe(4);
  expect(e6Slide.canonicalPose).toBe(3);
  expect(e6Slide.animationMode).toBe("step-reveal");
  expect(e6Slide.section).toBe("E");
  expect(e6Slide.surface).toBe("dark");
});

test("E.5 renders without throwing under DeckProvider and shows the FigLabel", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.6.*LIMITS OF PROMPTING/i);
});

test("step 0 → BP card visible; CM card, wall section, and closing not yet revealed", () => {
  renderAtStep(0);

  const bp = screen.getByTestId("e6-bp-card");
  expect(bp.className).toMatch(/\bon\b/);

  const cm = screen.getByTestId("e6-cm-card");
  expect(cm.className).not.toMatch(/\bon\b/);

  const wall = screen.getByTestId("e6-wall");
  expect(wall.className).not.toMatch(/\bon\b/);

  // Closing reveal mounts but is not in the `on` state yet.
  const closing = screen.getByTestId("e6-closing");
  expect(closing.className).not.toMatch(/\bon\b/);

  // BP list items render the data from content.tsx.
  expect(screen.getAllByTestId(/^e6-bp-\d+$/)).toHaveLength(
    e6Content.bp.length,
  );
});

test("step 1 → CM card reveals (BP still on, wall + closing still off)", () => {
  renderAtStep(1);

  expect(screen.getByTestId("e6-bp-card").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e6-cm-card").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e6-wall").className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e6-closing").className).not.toMatch(/\bon\b/);

  expect(screen.getAllByTestId(/^e6-cm-\d+$/)).toHaveLength(
    e6Content.cm.length,
  );
});

test("step 2 → wall section + 3-column constraint grid reveal", () => {
  renderAtStep(2);

  expect(screen.getByTestId("e6-bp-card").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e6-cm-card").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e6-wall").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e6-closing").className).not.toMatch(/\bon\b/);

  // The wall subtitle and the 3-col constraint grid mount.
  expect(screen.getByText(/Where prompt ends/i)).toBeInTheDocument();
  expect(screen.getByTestId("e6-constraint-grid")).toBeInTheDocument();
  expect(screen.getAllByTestId(/^e6-constraint-\d+$/)).toHaveLength(
    e6Content.constraints.length,
  );
});

test("step 3 → italic closing line reveals at the bottom", () => {
  renderAtStep(3);

  const closing = screen.getByTestId("e6-closing");
  expect(closing.className).toMatch(/\bon\b/);
  // `highlight()` splits keywords into their own spans — span across with
  // textContent.
  expect(closing.textContent).toMatch(/next layers begin/);
});
