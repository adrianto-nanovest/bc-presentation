// E.4 — PROMPT METHODOLOGIES · slide tests.
//
// Covers the new 4-step design ported from
// `claude-design-project/jsx/slides-a.jsx:604-722`.
//   0 — BASIC tier reveals
//   1 — INTERMEDIATE tier reveals
//   2 — ADVANCED tier reveals
//   3 — footer caption reveals
// Hover-to-detail (NOT click-to-modal): hovering any card fills the bottom
// 190px region with a TechniqueDetail. Mouse-leave clears it.
import { render, screen, act, fireEvent, within } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E4PromptMethodologies,
  e4Slide,
} from "@/slides/foundation-core-section-e/e4-prompt-methodologies";
import { e4Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e4Slide.steps]}>
      <AdvanceTo step={step} />
      <E4PromptMethodologies />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.4 declares 4 steps with canonicalPose=3", () => {
  expect(e4Slide.steps).toBe(4);
  expect(e4Slide.canonicalPose).toBe(3);
  expect(e4Slide.animationMode).toBe("step-reveal");
  expect(e4Slide.section).toBe("E");
  expect(e4Slide.surface).toBe("dark");
});

test("E.4 renders without throwing under DeckProvider and shows the FigLabel", () => {
  renderAtStep(0);
  expect(
    screen.getByText(/FIG\. E\.4 · LAYER 1 · METHODOLOGIES/),
  ).toBeInTheDocument();
});

test("step 0 → BASIC tier visible; INTERMEDIATE + ADVANCED Reveal not yet on; footer hidden", () => {
  renderAtStep(0);

  const basic = screen.getByTestId("tier-basic");
  expect(basic.className).toMatch(/\bon\b/);

  const intermediate = screen.getByTestId("tier-intermediate");
  expect(intermediate.className).not.toMatch(/\bon\b/);

  const advanced = screen.getByTestId("tier-advanced");
  expect(advanced.className).not.toMatch(/\bon\b/);

  expect(screen.queryByTestId("e4-footer")).not.toBeInTheDocument();

  // No hover yet → detail strip shows the empty placeholder.
  expect(screen.getByTestId("technique-detail-empty")).toBeInTheDocument();
});

test("step 1 → INTERMEDIATE tier reveals (BASIC still on, ADVANCED still off)", () => {
  renderAtStep(1);

  expect(screen.getByTestId("tier-basic").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("tier-intermediate").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("tier-advanced").className).not.toMatch(/\bon\b/);
  expect(screen.queryByTestId("e4-footer")).not.toBeInTheDocument();
});

test("step 2 → ADVANCED tier reveals; footer still hidden", () => {
  renderAtStep(2);

  expect(screen.getByTestId("tier-basic").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("tier-intermediate").className).toMatch(/\bon\b/);
  expect(screen.getByTestId("tier-advanced").className).toMatch(/\bon\b/);
  expect(screen.queryByTestId("e4-footer")).not.toBeInTheDocument();

  // All 8 cards mount once the third tier is revealed.
  expect(screen.getAllByTestId(/^technique-card-/)).toHaveLength(8);
  expect(screen.getAllByTestId(/^tier-/)).toHaveLength(3);
});

test("step 3 → footer caption reveals beneath the tier rows", () => {
  renderAtStep(3);
  const footer = screen.getByTestId("e4-footer");
  expect(footer).toBeInTheDocument();
  // `highlight()` splits keywords into their own spans — span across with
  // textContent.
  expect(footer.textContent).toMatch(/Higher tiers/);
  expect(footer.textContent).toMatch(/Hover a card for details\./);
});

// Helper that flattens the readonly-tuple `tiers[].cards` into a plain array
// the `find()` calls below can drill into without TS choking on the union.
type FlatCard = { id: string; title: string; essence: string };
function allCards(): FlatCard[] {
  return e4Content.tiers.flatMap((t) => t.cards.map((c) => ({ ...c })));
}

test("hovering a card → TechniqueDetail renders that card's bestFor/tradeOff", () => {
  renderAtStep(2);

  // Pick the RAG card from the ADVANCED tier.
  const target = allCards().find((c) => c.id === "rag")!;
  const detail = e4Content.modal["rag"];

  // Empty placeholder before any hover.
  expect(screen.getByTestId("technique-detail-empty")).toBeInTheDocument();

  const card = screen.getByTestId(`technique-card-${target.id}`);
  fireEvent.mouseEnter(card);

  // Active flag flips on the hovered card.
  expect(card.getAttribute("data-active")).toBe("true");

  // Detail strip mounts with this card's content.
  const slot = screen.getByTestId(`technique-detail-${target.id}`);
  expect(slot).toBeInTheDocument();
  expect(within(slot).getByText(target.title)).toBeInTheDocument();
  expect(
    within(slot).getByTestId("technique-detail-best-for").textContent,
  ).toBe(detail.bestFor);
  expect(
    within(slot).getByTestId("technique-detail-trade-off").textContent,
  ).toBe(detail.tradeOff);
});

test("mouse-leave on the hovered card clears TechniqueDetail back to placeholder", () => {
  renderAtStep(2);

  const target = allCards().find((c) => c.id === "cot")!;

  const card = screen.getByTestId(`technique-card-${target.id}`);
  fireEvent.mouseEnter(card);
  expect(screen.getByTestId(`technique-detail-${target.id}`)).toBeInTheDocument();

  fireEvent.mouseLeave(card);
  expect(card.getAttribute("data-active")).toBe("false");
  expect(
    screen.queryByTestId(`technique-detail-${target.id}`),
  ).not.toBeInTheDocument();
  expect(screen.getByTestId("technique-detail-empty")).toBeInTheDocument();
});

test("hovering a different card swaps the detail content", () => {
  renderAtStep(2);

  const first = allCards().find((c) => c.id === "zero-shot")!;
  const second = allCards().find((c) => c.id === "react")!;

  const firstCard = screen.getByTestId(`technique-card-${first.id}`);
  const secondCard = screen.getByTestId(`technique-card-${second.id}`);

  fireEvent.mouseEnter(firstCard);
  expect(
    screen.getByTestId(`technique-detail-${first.id}`),
  ).toBeInTheDocument();

  // Hover a second card without leaving the first; the detail tracks the
  // most-recent enter target.
  fireEvent.mouseEnter(secondCard);
  expect(
    screen.getByTestId(`technique-detail-${second.id}`),
  ).toBeInTheDocument();
  expect(
    screen.queryByTestId(`technique-detail-${first.id}`),
  ).not.toBeInTheDocument();
});
