import { act, render, screen } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { j4Content } from "@/slides/reveal-and-closing/content";
import {
  J4RecipeShip,
  j4Slide,
} from "@/slides/reveal-and-closing/j4-recipe-ship";

// Mirrors J.2's test pattern: a tiny child that exposes goTo so the test
// can flip to a specific stepIndex inside the same DeckProvider.
function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderJ4(advanceToStep = j4Slide.canonicalPose) {
  return render(
    <DeckProvider stepCounts={[j4Slide.steps]}>
      <AdvanceTo step={advanceToStep} />
      <J4RecipeShip />
    </DeckProvider>,
  );
}

test("J.4 slide def — 2 steps, canonicalPose=1, step-reveal, section J", () => {
  expect(j4Slide.steps).toBe(2);
  expect(j4Slide.canonicalPose).toBe(1);
  expect(j4Slide.animationMode).toBe("step-reveal");
  expect(j4Slide.section).toBe("J");
});

test("J.4 renders FIG label, headline, subtitle, footer caption, and 3 cards", () => {
  renderJ4();
  act(() => screen.getByTestId("goto").click());
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(
    /FIG\.\s*J\.4.*BUILDING SOMETHING THAT SHIPS/i,
  );
  expect(screen.getByTestId("j4-headline").textContent).toMatch(
    /Build before broadcast/,
  );
  expect(screen.getByTestId("j4-subtitle").textContent).toMatch(/Three moves/);
  expect(screen.getByTestId("j4-footer").textContent).toMatch(/Build for one/);
  expect(screen.getAllByTestId("j4-card")).toHaveLength(3);
});

test("J.4 every card surfaces its full content inline — no hover required", () => {
  // Both section labels appear on every card (3 cards × 2 sections = 6).
  // Guards the rule that all detail lives inside the card (no hover popovers).
  const { container } = renderJ4();
  act(() => screen.getByTestId("goto").click());
  const labels = Array.from(
    container.querySelectorAll(".j4-card-section-label"),
  ).map((el) => el.textContent);
  expect(labels.filter((l) => l === "In practice")).toHaveLength(3);
  expect(labels.filter((l) => l === "Earned from")).toHaveLength(3);
});

test("J.4 each card renders its title, subtitle, num (01/02/03), and every bullet from content.ts", () => {
  renderJ4();
  act(() => screen.getByTestId("goto").click());
  const cards = screen.getAllByTestId("j4-card");
  expect(cards).toHaveLength(j4Content.cards.length);

  j4Content.cards.forEach((card, i) => {
    // textContent is the flat concatenation of all child text, so highlight()
    // splitting the title across spans does not break the substring match.
    const cardText = cards[i].textContent ?? "";
    expect(cardText).toContain(card.title);
    expect(cardText).toContain(card.subtitle);
    expect(cardText).toContain(`0${card.num}`);
    card.practice.forEach((b) => expect(cardText).toContain(b.text));
    card.lesson.forEach((b) => expect(cardText).toContain(b.text));
  });
});

test("J.4 cards are numbered 01, 02, 03 (not 04/05/06)", () => {
  renderJ4();
  act(() => screen.getByTestId("goto").click());
  const cards = screen.getAllByTestId("j4-card");
  expect(cards[0].textContent).toContain("01");
  expect(cards[1].textContent).toContain("02");
  expect(cards[2].textContent).toContain("03");
});

test("J.4 cross-card alignment wrappers (title-block + practice-block) present on every card", () => {
  // The two CSS classes carry the min-height floors that align the rule,
  // "In practice" label, and "Earned from" label across all 3 cards.
  // jsdom has no layout engine, so we verify by structure: every card
  // contains exactly one of each wrapper.
  renderJ4();
  act(() => screen.getByTestId("goto").click());
  const cards = screen.getAllByTestId("j4-card");
  cards.forEach((card) => {
    expect(card.querySelectorAll(".j4-card-title-block")).toHaveLength(1);
    expect(card.querySelectorAll(".j4-card-practice-block")).toHaveLength(1);
  });
});

test("J.4 footer is gated to step 2 (stepIndex 1)", () => {
  const { container } = renderJ4(0);
  const footer = container.querySelector('[data-testid="j4-footer"]');
  // At initial render (stepIndex 0) the footer Reveal carries `.fade`
  // without `.on`.
  expect(footer?.className).toMatch(/\bfade\b/);
  expect(footer?.className).not.toMatch(/\bon\b/);

  // Advance to step 2 (stepIndex 1) — Reveal flips to `.fade on`.
  act(() => screen.getByTestId("goto").click());
  // After goTo(0, 0) the click bumps us to stepIndex 0; re-click target was
  // already 0. We need a second helper for step 1, but the simpler path is
  // to rerender at advanceToStep=1 from the start (see next test).
});

test("J.4 footer reveals at stepIndex 1 (Adri step 2)", () => {
  const { container } = renderJ4(1);
  // AdvanceTo button click flips us from initial stepIndex 0 → 1.
  act(() => screen.getByTestId("goto").click());
  const footer = container.querySelector('[data-testid="j4-footer"]');
  expect(footer?.className).toMatch(/\bfade\b/);
  expect(footer?.className).toMatch(/\bon\b/);
});
