// E.6 — CONTEXT · WHAT & WHY · slide tests.
//
// Covers the new 3-step design ported from
// `claude-design-project/jsx/slides-b.jsx:283-379`.
//   0 — left panel reveals (definition + 3 why-points)
//   1 — context network reveals + flow animation runs
//   2 — next-pointer footer reveals
//
// Hover behavior: hovering a satellite surfaces its rich `hover` payload in
// the left panel's hover details box.
import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E6ContextWhatWhy,
  e6Slide,
} from "@/slides/foundation-core-section-e/e6-context-what-why";
import { e6Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e6Slide.steps]}>
      <AdvanceTo step={step} />
      <E6ContextWhatWhy />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.6 declares 3 steps with canonicalPose=2", () => {
  expect(e6Slide.steps).toBe(3);
  expect(e6Slide.canonicalPose).toBe(2);
  expect(e6Slide.animationMode).toBe("step-reveal");
  expect(e6Slide.section).toBe("E");
  expect(e6Slide.surface).toBe("dark");
});

test("E.6 renders the FIG label `FIG. E.6 · LAYER 2 · CONTEXT`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.6.*LAYER 2.*CONTEXT/i);
});

test("step 0 → definition + 3 why-points reveal; network not rendered yet", () => {
  renderAtStep(0);

  // Definition + each why-point reveal mount in the `on` state.
  expect(screen.getByTestId("e6-definition").className).toMatch(/\bon\b/);
  for (let i = 0; i < e6Content.whyPoints.length; i++) {
    expect(screen.getByTestId(`e6-why-${i}`).className).toMatch(/\bon\b/);
  }
  expect(screen.getAllByTestId(/^e6-why-\d+$/)).toHaveLength(
    e6Content.whyPoints.length,
  );

  // The right-side reveal kicker hasn't entered the `on` state yet, and the
  // network is not rendered (we gate the entire <ContextNetwork> on
  // showNetwork → step >= 1).
  expect(screen.getByTestId("e6-reveal-kicker").className).not.toMatch(
    /\bon\b/,
  );
  expect(screen.queryByTestId("context-network")).toBeNull();

  // Next-pointer not yet revealed.
  expect(screen.getByTestId("e6-next").className).not.toMatch(/\bon\b/);
});

test("step 1 → ContextNetwork mounts; phase progresses to flow; 6 satellites render", async () => {
  renderAtStep(1);

  const network = await screen.findByTestId("context-network");
  expect(network).toBeInTheDocument();

  // 6 satellites — one per content entry.
  const sats = screen.getAllByTestId(/^context-network-sat-/);
  expect(sats).toHaveLength(6);
  expect(sats).toHaveLength(e6Content.satellites.length);

  // Phase machine eventually reaches `flow` (idle → hub → reveal → flow).
  await waitFor(
    () => {
      const phase = network.getAttribute("data-phase");
      expect(phase === "reveal" || phase === "flow").toBe(true);
    },
    { timeout: 2500 },
  );

  // Next-pointer still off until step 2.
  expect(screen.getByTestId("e6-next").className).not.toMatch(/\bon\b/);
});

test("step 2 → next-pointer footer reveals", async () => {
  renderAtStep(2);

  const next = screen.getByTestId("e6-next");
  expect(next.className).toMatch(/\bon\b/);
  // `highlight()` splits keywords into separate spans — check via textContent.
  expect(next.textContent).toMatch(/4 strategies/);

  // Network still rendered.
  expect(await screen.findByTestId("context-network")).toBeInTheDocument();
});

test("hover satellite → hover details box surfaces that satellite's rich payload", () => {
  renderAtStep(2);

  // Box starts inactive (data-active=false, opacity 0).
  const box = screen.getByTestId("e6-hover-box");
  expect(box.getAttribute("data-active")).toBe("false");

  // Pick a satellite by id (first one — "user-prompt") and fire mouseenter.
  const target = e6Content.satellites[0];
  const sat = screen.getByTestId(`context-network-sat-${target.id}`);
  fireEvent.mouseEnter(sat);

  // Box becomes active and shows the satellite's hover payload.
  expect(box.getAttribute("data-active")).toBe("true");
  expect(box.textContent).toContain(target.label);
  expect(box.textContent).toContain(target.hover.kicker);
  expect(box.textContent).toContain(target.hover.body);
  expect(box.textContent).toContain(target.hover.tag);

  // Mouse-leave clears the active state.
  fireEvent.mouseLeave(sat);
  expect(box.getAttribute("data-active")).toBe("false");
});
