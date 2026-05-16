import { act, render, screen } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { j2Content } from "@/slides/reveal-and-closing/content";
import {
  J2FivePrinciples,
  j2Slide,
} from "@/slides/reveal-and-closing/j2-five-principles";

// Mirrors the J.1 test pattern: a tiny child that exposes goTo so the test
// can flip to a specific stepIndex inside the same DeckProvider.
function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderJ2(advanceToStep = j2Slide.canonicalPose) {
  return render(
    <DeckProvider stepCounts={[j2Slide.steps]}>
      <AdvanceTo step={advanceToStep} />
      <J2FivePrinciples />
    </DeckProvider>,
  );
}

test("J.2 slide def — 2 steps, canonicalPose=1, step-reveal, section J", () => {
  expect(j2Slide.steps).toBe(2);
  expect(j2Slide.canonicalPose).toBe(1);
  expect(j2Slide.animationMode).toBe("step-reveal");
  expect(j2Slide.section).toBe("J");
});

test("J.2 renders FIG label, headline, subtitle, footer caption, and 5 cards", () => {
  renderJ2();
  act(() => screen.getByTestId("goto").click());
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*J\.2.*FIVE PRINCIPLES/i);
  expect(screen.getByTestId("j2-headline").textContent).toMatch(
    /Mindset before tools/,
  );
  expect(screen.getByTestId("j2-subtitle").textContent).toMatch(
    /Five mindsets/,
  );
  expect(screen.getByTestId("j2-footer").textContent).toMatch(
    /Each one earned/,
  );
  expect(screen.getAllByTestId("j2-card")).toHaveLength(5);
});

test("J.2 every card surfaces its full content inline — no hover required", () => {
  // Both section labels appear on every card (5 cards × 2 sections = 10).
  // This guards the rule that all detail lives inside the card.
  const { container } = renderJ2();
  act(() => screen.getByTestId("goto").click());
  const labels = Array.from(
    container.querySelectorAll(".j2-card-section-label"),
  ).map((el) => el.textContent);
  expect(labels.filter((l) => l === "In practice")).toHaveLength(5);
  expect(labels.filter((l) => l === "Earned from")).toHaveLength(5);
});

test("J.2 each card renders its title, subtitle, num, and every bullet from content.ts", () => {
  renderJ2();
  act(() => screen.getByTestId("goto").click());
  const cards = screen.getAllByTestId("j2-card");
  expect(cards).toHaveLength(j2Content.cards.length);

  j2Content.cards.forEach((card, i) => {
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

test("J.2 cross-card alignment wrappers (title-block + practice-block) present on every card", () => {
  // The two CSS classes carry the measured min-height floors that align the
  // rule, "In practice" label, and "Earned from" label across all 5 cards.
  // jsdom has no layout engine, so we verify by structure: every card
  // contains exactly one of each wrapper.
  renderJ2();
  act(() => screen.getByTestId("goto").click());
  const cards = screen.getAllByTestId("j2-card");
  cards.forEach((card) => {
    expect(card.querySelectorAll(".j2-card-title-block")).toHaveLength(1);
    expect(card.querySelectorAll(".j2-card-practice-block")).toHaveLength(1);
  });
});

test("J.2 footer is gated to step 2 (stepIndex 1)", () => {
  const { container } = renderJ2(1);
  const footer = container.querySelector('[data-testid="j2-footer"]');
  // At initial render (stepIndex 0) the footer Reveal carries `.fade`
  // without `.on`.
  expect(footer?.className).toMatch(/\bfade\b/);
  expect(footer?.className).not.toMatch(/\bon\b/);

  // Advance to step 2 (stepIndex 1) — Reveal flips to `.fade on`.
  act(() => screen.getByTestId("goto").click());
  expect(footer?.className).toMatch(/\bfade\b/);
  expect(footer?.className).toMatch(/\bon\b/);
});
