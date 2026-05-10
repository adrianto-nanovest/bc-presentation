// E.9 — HARNESS · WHAT & WHY · slide tests.
//
// Covers the new 5-step design ported from
// `claude-design-project/jsx/slides-c.jsx:5-98`.
//   0 — left pane reveals (sub-kicker, definition, 4 why-points).
//   1 — Includes package reveals on left.
//   2 — equation + Cursor quote reveal on right.
//   3 — 4-line stanza reveals.
//   4 — tagline reveals.
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E9HarnessWhatWhy,
  e9Slide,
} from "@/slides/foundation-core-section-e/e9-harness-what-why";
import { e9Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e9Slide.steps]}>
      <AdvanceTo step={step} />
      <E9HarnessWhatWhy />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.9 declares 5 steps with canonicalPose=4", () => {
  expect(e9Slide.steps).toBe(5);
  expect(e9Slide.canonicalPose).toBe(4);
  expect(e9Slide.animationMode).toBe("step-reveal");
  expect(e9Slide.section).toBe("E");
  expect(e9Slide.surface).toBe("dark");
});

test("E.9 renders the FIG label `FIG. E.9 · LAYER 3 · HARNESS`", () => {
  renderAtStep(0);
  expect(
    screen.getByText(/FIG\. E\.9 · LAYER 3 · HARNESS/),
  ).toBeInTheDocument();
});

test("step 0 → left pane visible (definition + 4 why-points); right reveals hidden", () => {
  renderAtStep(0);

  // Headline always rendered.
  const headline = document.querySelector("h1.slide-headline");
  expect(headline).not.toBeNull();
  expect(headline?.textContent).toMatch(/Harness/);

  // Sub-kicker + definition revealed.
  expect(screen.getByTestId("e9-sub").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e9-sub").textContent).toMatch(e9Content.sub);

  const definition = screen.getByTestId("e9-definition");
  expect(definition.className).toMatch(/\bon\b/);
  expect(definition.textContent).toMatch(/software around the model/);

  // 4 why-points all revealed.
  const whyItems = screen.getAllByTestId(/^e9-why-\d+$/);
  expect(whyItems).toHaveLength(4);
  for (let i = 0; i < e9Content.whyPoints.length; i++) {
    const item = screen.getByTestId(`e9-why-${i}`);
    expect(item.className).toMatch(/\bon\b/);
  }

  // Includes package not revealed.
  expect(screen.getByTestId("e9-includes-package").className).not.toMatch(
    /\bon\b/,
  );

  // Right-side reveals all hidden.
  expect(screen.getByTestId("e9-equation").className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e9-quote").className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e9-tagline").className).not.toMatch(/\bon\b/);
});

test("step 1 → Includes package + 6 mitigation chips revealed", () => {
  renderAtStep(1);

  const pkg = screen.getByTestId("e9-includes-package");
  expect(pkg.className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e9-includes-kicker").textContent).toMatch(
    /six context mitigations/,
  );

  const includeChips = screen.getAllByTestId(/^e9-include-\d+$/);
  expect(includeChips).toHaveLength(6);
  for (let i = 0; i < e9Content.includes.length; i++) {
    const chip = screen.getByTestId(`e9-include-${i}`);
    expect(chip.className).toMatch(/\bon\b/);
    expect(chip.textContent).toMatch(e9Content.includes[i]);
  }

  // Right-side equation/quote/tagline still hidden.
  expect(screen.getByTestId("e9-equation").className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e9-quote").className).not.toMatch(/\bon\b/);
});

test("step 2 → equation + Cursor quote revealed", () => {
  renderAtStep(2);

  const eq = screen.getByTestId("e9-equation");
  expect(eq.className).toMatch(/\bon\b/);
  expect(eq.textContent).toMatch(/Agent/);
  expect(eq.textContent).toMatch(/Model/);
  expect(eq.textContent).toMatch(/Harness/);

  const quote = screen.getByTestId("e9-quote");
  expect(quote.className).toMatch(/\bon\b/);
  expect(quote.textContent).toMatch(/decent model with a great harness/);
  expect(quote.textContent).toMatch(/Cursor engineering/);

  // Stanza/tagline still hidden.
  const stanzaLine0 = screen.getByTestId("e9-stanza-0");
  expect(stanzaLine0.className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e9-tagline").className).not.toMatch(/\bon\b/);
});

test("step 3 → 4-line stanza revealed", () => {
  renderAtStep(3);

  const lines = screen.getAllByTestId(/^e9-stanza-\d+$/);
  expect(lines).toHaveLength(4);
  for (let i = 0; i < e9Content.stanza.length; i++) {
    const line = screen.getByTestId(`e9-stanza-${i}`);
    expect(line.className).toMatch(/\bon\b/);
    expect(line.textContent).toMatch(e9Content.stanza[i]);
  }

  // Tagline still hidden.
  expect(screen.getByTestId("e9-tagline").className).not.toMatch(/\bon\b/);
});

test("step 4 (canonicalPose) → tagline revealed; everything visible", () => {
  renderAtStep(4);

  const tagline = screen.getByTestId("e9-tagline");
  expect(tagline.className).toMatch(/\bon\b/);
  expect(tagline.textContent).toMatch(e9Content.tagline);

  // Sanity-check: all prior reveals still on.
  expect(screen.getByTestId("e9-definition").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e9-includes-package").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e9-equation").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e9-quote").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e9-stanza-3").className).toMatch(/\bon\b/);
});
