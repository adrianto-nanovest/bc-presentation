import { act, render, screen } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { j3Content } from "@/slides/reveal-and-closing/content";
import {
  J3RecipeBuildup,
  j3Slide,
} from "@/slides/reveal-and-closing/j3-recipe-buildup";

// Mirrors the J.2 test pattern: a tiny child that exposes goTo so the test
// can flip to a specific stepIndex inside the same DeckProvider.
function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderJ3(advanceToStep = j3Slide.canonicalPose) {
  return render(
    <DeckProvider stepCounts={[j3Slide.steps]}>
      <AdvanceTo step={advanceToStep} />
      <J3RecipeBuildup />
    </DeckProvider>,
  );
}

test("J.3 slide def — 2 steps, canonicalPose=1, step-reveal, section J", () => {
  expect(j3Slide.steps).toBe(2);
  expect(j3Slide.canonicalPose).toBe(1);
  expect(j3Slide.animationMode).toBe("step-reveal");
  expect(j3Slide.section).toBe("J");
});

test("J.3 renders FIG label, headline, subtitle, footer caption, and 3 cards", () => {
  renderJ3();
  act(() => screen.getByTestId("goto").click());
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*J\.3.*BUILDING YOURSELF UP/i);
  expect(screen.getByTestId("j3-headline").textContent).toMatch(
    /Habits before output/,
  );
  expect(screen.getByTestId("j3-subtitle").textContent).toMatch(
    /Three habits/,
  );
  expect(screen.getByTestId("j3-footer").textContent).toMatch(
    /Quiet habits now\. Loud output later\./,
  );
  expect(screen.getAllByTestId("j3-card")).toHaveLength(3);
});

test("J.3 every card surfaces its full content inline — no hover required", () => {
  // Both section labels appear on every card (3 cards × 2 sections = 6).
  // This guards the rule that all detail lives inside the card — no
  // HoverReveal popovers (the old J.3 used a hover example block).
  const { container } = renderJ3();
  act(() => screen.getByTestId("goto").click());
  const labels = Array.from(
    container.querySelectorAll(".j3-card-section-label"),
  ).map((el) => el.textContent);
  expect(labels.filter((l) => l === "In practice")).toHaveLength(3);
  expect(labels.filter((l) => l === "Earned from")).toHaveLength(3);
});

test("J.3 each card renders its title, subtitle, num, and every bullet from content.ts", () => {
  renderJ3();
  act(() => screen.getByTestId("goto").click());
  const cards = screen.getAllByTestId("j3-card");
  expect(cards).toHaveLength(j3Content.cards.length);

  j3Content.cards.forEach((card, i) => {
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

test("J.3 cross-card alignment wrapper (title-block) present on every card", () => {
  // .j3-card-title-block carries the measured min-height floor (122px) that
  // aligns the rule, "In practice" label, and "Earned from" label across all
  // 3 cards. jsdom has no layout engine, so we verify by structure: every
  // card contains exactly one title-block wrapper. (Unlike J.2, J.3 only
  // needs the title-block floor — practice heights matched naturally.)
  const { container } = renderJ3();
  act(() => screen.getByTestId("goto").click());
  const cards = screen.getAllByTestId("j3-card");
  cards.forEach((card) => {
    expect(card.querySelectorAll(".j3-card-title-block")).toHaveLength(1);
  });
});

test("J.3 footer is gated to step 2 (stepIndex 1)", () => {
  const { container } = renderJ3(1);
  const footer = container.querySelector('[data-testid="j3-footer"]');
  // At initial render (stepIndex 0) the footer Reveal carries `.fade`
  // without `.on`.
  expect(footer?.className).toMatch(/\bfade\b/);
  expect(footer?.className).not.toMatch(/\bon\b/);

  // Advance to step 2 (stepIndex 1) — Reveal flips to `.fade on`.
  act(() => screen.getByTestId("goto").click());
  expect(footer?.className).toMatch(/\bfade\b/);
  expect(footer?.className).toMatch(/\bon\b/);
});
