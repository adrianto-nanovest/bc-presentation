// E.7 — CONTEXT · STRATEGIES · slide tests.
//
// Covers the new 6-step design ported from
// `claude-design-project/jsx/slides-b.jsx:384-448`.
//   0 — headline + funnel canvas (rings always visible)
//   1 — card 1 (WRITE) reveals
//   2 — card 2 (SELECT) reveals
//   3 — card 3 (COMPRESS) reveals
//   4 — card 4 (ISOLATE) reveals
//   5 — footer reveals
//
// Hover behavior: hovering card N captures hover=N (via data-hover).
import { fireEvent, render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E8ContextStrategies,
  e8Slide,
} from "@/slides/foundation-core-section-e/e8-context-strategies";
import { e8Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e8Slide.steps]}>
      <AdvanceTo step={step} />
      <E8ContextStrategies />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.7 declares 6 steps with canonicalPose=5", () => {
  expect(e8Slide.steps).toBe(6);
  expect(e8Slide.canonicalPose).toBe(5);
  expect(e8Slide.animationMode).toBe("step-reveal");
  expect(e8Slide.section).toBe("E");
  expect(e8Slide.surface).toBe("dark");
});

test("E.7 renders the FIG label `FIG. E.7 · CONTEXT STRATEGIES`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.8.*CONTEXT STRATEGIES/i);
});

test("step 0 → headline + funnel canvas visible; cards not yet revealed", () => {
  renderAtStep(0);

  // Headline is always present (h1 contains the headline text).
  const headline = document.querySelector("h1.slide-headline");
  expect(headline).not.toBeNull();
  expect(headline?.textContent).toMatch(/Each one solves a context problem/);

  // Funnel band & canvas are mounted from step 0.
  expect(screen.getByTestId("e8-funnel-band")).toBeInTheDocument();
  expect(screen.getByTestId("funnel-animation")).toBeInTheDocument();
  expect(screen.getByTestId("funnel-animation-canvas")).toBeInTheDocument();

  // None of the cards has revealed yet — Reveal wrapper is not in `on`.
  for (const r of e8Content.rings) {
    const card = screen.getByTestId(`e8-card-${r.id}`);
    expect(card.getAttribute("data-revealed")).toBe("false");
    expect(card.className).not.toMatch(/\bon\b/);
  }

  // Footer not yet revealed.
  expect(screen.getByTestId("e8-footer").className).not.toMatch(/\bon\b/);
});

test("step 1 → card 1 (WRITE) revealed; later cards still hidden", () => {
  renderAtStep(1);

  expect(
    screen.getByTestId("e8-card-write").getAttribute("data-revealed"),
  ).toBe("true");
  expect(screen.getByTestId("e8-card-write").className).toMatch(/\bon\b/);

  expect(
    screen.getByTestId("e8-card-select").getAttribute("data-revealed"),
  ).toBe("false");
  expect(
    screen.getByTestId("e8-card-compress").getAttribute("data-revealed"),
  ).toBe("false");
  expect(
    screen.getByTestId("e8-card-isolate").getAttribute("data-revealed"),
  ).toBe("false");

  // Footer still off.
  expect(screen.getByTestId("e8-footer").className).not.toMatch(/\bon\b/);
});

test("step 2 → cards 1+2 revealed", () => {
  renderAtStep(2);

  expect(
    screen.getByTestId("e8-card-write").getAttribute("data-revealed"),
  ).toBe("true");
  expect(
    screen.getByTestId("e8-card-select").getAttribute("data-revealed"),
  ).toBe("true");
  expect(
    screen.getByTestId("e8-card-compress").getAttribute("data-revealed"),
  ).toBe("false");
  expect(
    screen.getByTestId("e8-card-isolate").getAttribute("data-revealed"),
  ).toBe("false");
});

test("step 3 → cards 1-3 revealed", () => {
  renderAtStep(3);

  expect(
    screen.getByTestId("e8-card-write").getAttribute("data-revealed"),
  ).toBe("true");
  expect(
    screen.getByTestId("e8-card-select").getAttribute("data-revealed"),
  ).toBe("true");
  expect(
    screen.getByTestId("e8-card-compress").getAttribute("data-revealed"),
  ).toBe("true");
  expect(
    screen.getByTestId("e8-card-isolate").getAttribute("data-revealed"),
  ).toBe("false");
});

test("step 4 → all 4 cards revealed; footer still hidden", () => {
  renderAtStep(4);

  for (const r of e8Content.rings) {
    expect(
      screen.getByTestId(`e8-card-${r.id}`).getAttribute("data-revealed"),
    ).toBe("true");
  }
  expect(screen.getByTestId("e8-footer").className).not.toMatch(/\bon\b/);
});

test("step 5 → footer reveals", () => {
  renderAtStep(5);

  const footer = screen.getByTestId("e8-footer");
  expect(footer.className).toMatch(/\bon\b/);
  expect(footer.textContent).toMatch(/keep it useful/);

  // All four cards still revealed.
  for (const r of e8Content.rings) {
    expect(
      screen.getByTestId(`e8-card-${r.id}`).getAttribute("data-revealed"),
    ).toBe("true");
  }
});

test("hovering an unrevealed card at step 1 must not capture hover", () => {
  renderAtStep(1);

  const writeCard = screen.getByTestId("e8-card-write");
  // SELECT (i=1) is not revealed yet at step 1 (only WRITE has revealed).
  const selectCard = screen.getByTestId("e8-card-select");
  expect(selectCard.getAttribute("data-revealed")).toBe("false");

  fireEvent.mouseEnter(selectCard.firstChild as HTMLElement);
  expect(selectCard.getAttribute("data-hover")).toBe("false");

  // Hovering the revealed card still works.
  fireEvent.mouseEnter(writeCard.firstChild as HTMLElement);
  expect(writeCard.getAttribute("data-hover")).toBe("true");
});

test("hover card N → card captures hover state via data-hover", () => {
  renderAtStep(5);

  const writeCard = screen.getByTestId("e8-card-write");
  const selectCard = screen.getByTestId("e8-card-select");

  // No hover yet.
  expect(writeCard.getAttribute("data-hover")).toBe("false");
  expect(selectCard.getAttribute("data-hover")).toBe("false");

  // Hover the WRITE card — its inner div is the mouse target. The data-hover
  // attribute lives on the Reveal wrapper.
  fireEvent.mouseEnter(writeCard.firstChild as HTMLElement);
  expect(writeCard.getAttribute("data-hover")).toBe("true");
  expect(selectCard.getAttribute("data-hover")).toBe("false");

  // Switch hover to SELECT.
  fireEvent.mouseLeave(writeCard.firstChild as HTMLElement);
  fireEvent.mouseEnter(selectCard.firstChild as HTMLElement);
  expect(writeCard.getAttribute("data-hover")).toBe("false");
  expect(selectCard.getAttribute("data-hover")).toBe("true");

  // Mouse leave clears hover.
  fireEvent.mouseLeave(selectCard.firstChild as HTMLElement);
  expect(selectCard.getAttribute("data-hover")).toBe("false");
});
