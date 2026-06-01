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
  E10HarnessWhatWhy,
  e10Slide,
} from "@/slides/foundation-core-section-e/e10-harness-what-why";
import { e10Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e10Slide.steps]}>
      <AdvanceTo step={step} />
      <E10HarnessWhatWhy />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.9 declares 5 steps with canonicalPose=4", () => {
  expect(e10Slide.steps).toBe(5);
  expect(e10Slide.canonicalPose).toBe(4);
  expect(e10Slide.animationMode).toBe("step-reveal");
  expect(e10Slide.section).toBe("E");
  expect(e10Slide.surface).toBe("dark");
});

test("E.9 renders the FIG label `FIG. E.9 · LAYER 3 · HARNESS`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.10.*LAYER 3.*HARNESS/i);
});

test("step 0 → left pane visible (definition + 4 why-points); right reveals hidden", () => {
  renderAtStep(0);

  // Headline always rendered.
  const headline = document.querySelector("h1.slide-headline");
  expect(headline).not.toBeNull();
  expect(headline?.textContent).toMatch(/Harness/);

  // Definition revealed.
  const definition = screen.getByTestId("e10-definition");
  expect(definition.className).toMatch(/\bon\b/);
  expect(definition.textContent).toMatch(/software around the model/);

  // 4 why-points all revealed.
  const whyItems = screen.getAllByTestId(/^e10-why-\d+$/);
  expect(whyItems).toHaveLength(4);
  for (let i = 0; i < e10Content.whyPoints.length; i++) {
    const item = screen.getByTestId(`e10-why-${i}`);
    expect(item.className).toMatch(/\bon\b/);
  }

  // Includes package not revealed.
  expect(screen.getByTestId("e10-includes-package").className).not.toMatch(
    /\bon\b/,
  );

  // Right-side reveals all hidden.
  expect(screen.getByTestId("e10-equation").className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e10-quote").className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e10-tagline").className).not.toMatch(/\bon\b/);
});

test("step 1 → Includes package + 6 mitigation chips revealed", () => {
  renderAtStep(1);

  const pkg = screen.getByTestId("e10-includes-package");
  expect(pkg.className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e10-includes-kicker").textContent).toMatch(
    /six context mitigations/,
  );

  const includeChips = screen.getAllByTestId(/^e10-include-\d+$/);
  expect(includeChips).toHaveLength(6);
  for (let i = 0; i < e10Content.includes.length; i++) {
    const chip = screen.getByTestId(`e10-include-${i}`);
    expect(chip.className).toMatch(/\bon\b/);
    expect(chip.textContent).toMatch(e10Content.includes[i]);
  }

  // Right-side equation/quote/tagline still hidden.
  expect(screen.getByTestId("e10-equation").className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e10-quote").className).not.toMatch(/\bon\b/);
});

test("step 2 → equation + Cursor quote revealed", () => {
  renderAtStep(2);

  const eq = screen.getByTestId("e10-equation");
  expect(eq.className).toMatch(/\bon\b/);
  expect(eq.textContent).toMatch(/Agent/);
  expect(eq.textContent).toMatch(/Model/);
  expect(eq.textContent).toMatch(/Harness/);

  const quote = screen.getByTestId("e10-quote");
  expect(quote.className).toMatch(/\bon\b/);
  expect(quote.textContent).toMatch(/decent model with a great harness/);
  expect(quote.textContent).toMatch(/Cursor engineering/);

  // Stanza/tagline still hidden.
  const stanzaLine0 = screen.getByTestId("e10-stanza-0");
  expect(stanzaLine0.className).not.toMatch(/\bon\b/);
  expect(screen.getByTestId("e10-tagline").className).not.toMatch(/\bon\b/);
});

test("step 3 → 4-line stanza revealed", () => {
  renderAtStep(3);

  const lines = screen.getAllByTestId(/^e10-stanza-\d+$/);
  expect(lines).toHaveLength(4);
  for (let i = 0; i < e10Content.stanza.length; i++) {
    const line = screen.getByTestId(`e10-stanza-${i}`);
    expect(line.className).toMatch(/\bon\b/);
    expect(line.textContent).toMatch(e10Content.stanza[i]);
  }

  // Tagline still hidden.
  expect(screen.getByTestId("e10-tagline").className).not.toMatch(/\bon\b/);
});

test("step 4 (canonicalPose) → tagline revealed; everything visible", () => {
  renderAtStep(4);

  const tagline = screen.getByTestId("e10-tagline");
  expect(tagline.className).toMatch(/\bon\b/);
  expect(tagline.textContent).toMatch(e10Content.tagline);

  // Sanity-check: all prior reveals still on.
  expect(screen.getByTestId("e10-definition").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e10-includes-package").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e10-equation").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e10-quote").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("e10-stanza-3").className).toMatch(/\bon\b/);
});
