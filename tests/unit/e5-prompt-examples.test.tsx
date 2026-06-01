// E.5 — PROMPT · EXAMPLES · slide tests.
//
// Covers the interactive two-column design:
//   0 — six use-case cards on the left; the right panel starts EMPTY. Hovering
//        a card live-previews it; clicking pins it (persists after mouse-leave);
//        clicking again unpins and empties the panel. Footer hidden.
//   1 — footer caption reveals.
import { render, screen, act, fireEvent, within } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E5PromptExamples,
  e5Slide,
} from "@/slides/foundation-core-section-e/e5-prompt-examples";
import { e5Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e5Slide.steps]}>
      <AdvanceTo step={step} />
      <E5PromptExamples />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.5 declares 2 steps in section E (dark, step-reveal)", () => {
  expect(e5Slide.steps).toBe(2);
  expect(e5Slide.section).toBe("E");
  expect(e5Slide.canonicalPose).toBe(1);
  expect(e5Slide.animationMode).toBe("step-reveal");
  expect(e5Slide.surface).toBe("dark");
});

test("E.5 renders without throwing and shows the EXAMPLES FigLabel", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.5.*EXAMPLES/i);
});

test("step 0 → all six use-case cards render", () => {
  renderAtStep(0);
  for (const uc of e5Content.useCases) {
    expect(screen.getByTestId(`e5-usecase-${uc.id}`)).toBeInTheDocument();
  }
  expect(screen.getAllByTestId(/^e5-usecase-/)).toHaveLength(6);
});

test("step 0 → arrival shows an EMPTY right panel (nothing pre-pinned)", () => {
  renderAtStep(0);
  const first = e5Content.useCases[0];
  expect(first.id).toBe("email");

  // No card is active on arrival.
  expect(
    screen.getByTestId(`e5-usecase-${first.id}`).getAttribute("data-active"),
  ).toBe("false");

  // The popover is absent: no goal / prompt / detail in the DOM.
  expect(screen.queryByTestId("e5-goal")).not.toBeInTheDocument();
  expect(screen.queryByTestId("e5-prompt")).not.toBeInTheDocument();
  expect(
    screen.queryByTestId(`e5-detail-${first.id}`),
  ).not.toBeInTheDocument();
});

test("step 0 → hovering a card live-previews it; moving to another switches it", () => {
  renderAtStep(0);
  const compare = e5Content.useCases.find((u) => u.id === "compare")!;
  const timeline = e5Content.useCases.find((u) => u.id === "timeline")!;

  // Hover "compare" → its popover appears on the right.
  fireEvent.mouseEnter(screen.getByTestId("e5-usecase-compare"));
  expect(screen.getByTestId(`e5-detail-${compare.id}`)).toBeInTheDocument();
  expect(screen.getByTestId("e5-goal").textContent).toBe(compare.goal);
  // Its structure + technique pills render.
  for (const s of compare.structures) {
    expect(screen.getByTestId(`e5-structure-${s}`)).toBeInTheDocument();
  }
  for (const t of compare.techniques) {
    expect(screen.getByTestId(`e5-technique-${t.id}`)).toBeInTheDocument();
  }

  // Move to "timeline" → the right immediately switches.
  fireEvent.mouseLeave(screen.getByTestId("e5-usecase-compare"));
  fireEvent.mouseEnter(screen.getByTestId("e5-usecase-timeline"));
  expect(screen.getByTestId("e5-goal").textContent).toBe(timeline.goal);
});

test("step 0 → mouse-leave with nothing pinned empties the right panel again", () => {
  renderAtStep(0);
  const card = screen.getByTestId("e5-usecase-compare");
  fireEvent.mouseEnter(card);
  expect(screen.getByTestId("e5-goal")).toBeInTheDocument();
  fireEvent.mouseLeave(card);
  expect(screen.queryByTestId("e5-goal")).not.toBeInTheDocument();
});

test("step 0 → clicking a card pins it (active persists after mouse leave)", () => {
  renderAtStep(0);
  const timeline = e5Content.useCases.find((u) => u.id === "timeline")!;
  const card = screen.getByTestId("e5-usecase-timeline");

  fireEvent.click(card);
  fireEvent.mouseLeave(card);

  // Pinned → still active and its popover persists.
  expect(card.getAttribute("data-active")).toBe("true");
  expect(screen.getByTestId(`e5-detail-${timeline.id}`)).toBeInTheDocument();
  expect(screen.getByTestId("e5-goal").textContent).toBe(timeline.goal);
});

test("step 0 → once pinned, hovering other cards does NOT change the right panel (pin wins)", () => {
  renderAtStep(0);
  const timeline = e5Content.useCases.find((u) => u.id === "timeline")!;

  // Pin timeline.
  const timelineCard = screen.getByTestId("e5-usecase-timeline");
  fireEvent.click(timelineCard);
  fireEvent.mouseLeave(timelineCard);
  expect(screen.getByTestId("e5-goal").textContent).toBe(timeline.goal);

  // Hover email → the pin RETAINS; the right panel stays on timeline.
  const emailCard = screen.getByTestId("e5-usecase-email");
  fireEvent.mouseEnter(emailCard);
  expect(screen.getByTestId("e5-goal").textContent).toBe(timeline.goal);

  // Leave email → still the pinned timeline.
  fireEvent.mouseLeave(emailCard);
  expect(screen.getByTestId("e5-goal").textContent).toBe(timeline.goal);
});

test("step 0 → while pinned, hovering another card ALSO highlights it (E3-style: pin + hover coexist)", () => {
  renderAtStep(0);
  const timeline = e5Content.useCases.find((u) => u.id === "timeline")!;
  // Pin the first card.
  const pinned = screen.getByTestId("e5-usecase-email");
  fireEvent.click(pinned);
  // Hover a DIFFERENT card.
  const other = screen.getByTestId("e5-usecase-summary");
  fireEvent.mouseEnter(other);
  // Both glow: the pinned card stays lit AND the hovered card lights up.
  expect(pinned.getAttribute("data-highlighted")).toBe("true");
  expect(other.getAttribute("data-highlighted")).toBe("true");
  // ...but the right PANEL stays locked to the pinned card (pin-wins).
  fireEvent.click(screen.getByTestId("e5-usecase-timeline")); // re-pin timeline
  fireEvent.mouseEnter(screen.getByTestId("e5-usecase-email"));
  expect(screen.getByTestId("e5-goal").textContent).toBe(timeline.goal);
  fireEvent.mouseLeave(other);
});

test("step 0 → with nothing pinned, hovering a card highlights it (preview)", () => {
  renderAtStep(0);
  const card = screen.getByTestId("e5-usecase-compare");
  expect(card.getAttribute("data-highlighted")).toBe("false");
  fireEvent.mouseEnter(card);
  expect(card.getAttribute("data-highlighted")).toBe("true");
  fireEvent.mouseLeave(card);
  expect(card.getAttribute("data-highlighted")).toBe("false");
});

test("step 0 → clicking the pinned card again unpins it and empties the panel", () => {
  renderAtStep(0);
  const card = screen.getByTestId("e5-usecase-timeline");

  // Pin, then click again to unpin.
  fireEvent.click(card);
  fireEvent.click(card);
  fireEvent.mouseLeave(card);

  expect(card.getAttribute("data-active")).toBe("false");
  expect(screen.queryByTestId("e5-goal")).not.toBeInTheDocument();
});

test("step 0 → hovering a structure pill lights it (bidirectional cross-highlight)", () => {
  renderAtStep(0);
  // Activate email (its structures include "instruction").
  fireEvent.mouseEnter(screen.getByTestId("e5-usecase-email"));
  const pill = screen.getByTestId("e5-structure-instruction");
  expect(pill.getAttribute("data-lit")).toBe("false");
  fireEvent.mouseEnter(pill);
  expect(pill.getAttribute("data-lit")).toBe("true");
  fireEvent.mouseLeave(pill);
  expect(pill.getAttribute("data-lit")).toBe("false");
});

test("step 0 → hovering a technique pill lights its ref'd structure pills", () => {
  renderAtStep(0);
  // Switch to the timeline case (CoT → instruction, Few-Shot → examples).
  fireEvent.click(screen.getByTestId("e5-usecase-timeline"));

  const cot = screen.getByTestId("e5-technique-cot");
  const instruction = screen.getByTestId("e5-structure-instruction");
  const examples = screen.getByTestId("e5-structure-examples");

  fireEvent.mouseEnter(cot);
  expect(instruction.getAttribute("data-lit")).toBe("true");
  // Few-Shot's ref (examples) is NOT lit by hovering CoT.
  expect(examples.getAttribute("data-lit")).toBe("false");
  fireEvent.mouseLeave(cot);

  const fewShot = screen.getByTestId("e5-technique-few-shot");
  fireEvent.mouseEnter(fewShot);
  expect(examples.getAttribute("data-lit")).toBe("true");
  expect(instruction.getAttribute("data-lit")).toBe("false");
});

test("step 0 → Zero-Shot technique (empty refs) lights nothing", () => {
  renderAtStep(0);
  // email is Zero-Shot (refs []) — activate it first.
  fireEvent.mouseEnter(screen.getByTestId("e5-usecase-email"));
  const zeroShot = screen.getByTestId("e5-technique-zero-shot");
  fireEvent.mouseEnter(zeroShot);
  // No structure pill becomes lit.
  for (const s of e5Content.useCases[0].structures) {
    expect(screen.getByTestId(`e5-structure-${s}`).getAttribute("data-lit")).toBe(
      "false",
    );
  }
  // The Zero-Shot pill itself is informational — not lit.
  expect(zeroShot.getAttribute("data-lit")).toBe("false");
});

test("footer hidden at step 0, revealed at step 1", () => {
  renderAtStep(0);
  expect(screen.queryByTestId("e5-footer")).not.toBeInTheDocument();
});

test("step 1 → footer caption reveals", () => {
  renderAtStep(1);
  const footer = screen.getByTestId("e5-footer");
  expect(footer).toBeInTheDocument();
  expect(footer.textContent).toMatch(/assembled/);
  // Popover still present (interactive content persists across steps).
  expect(within(footer).queryByText(/assembled/)).toBeTruthy();
});
