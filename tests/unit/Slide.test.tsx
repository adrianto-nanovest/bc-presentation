import { fireEvent, render, screen } from "@testing-library/react";
import { Slide } from "@/deck/Slide";
import { DeckProvider, useDeck } from "@/deck/DeckContext";

const wrap = (ui: React.ReactNode) => (
  <DeckProvider stepCounts={[2, 2]}>{ui}</DeckProvider>
);

test("Slide annotates animation mode and canonical pose as data attrs on the stage element", () => {
  render(
    wrap(
      <Slide
        animationMode="step-reveal"
        canonicalPose={2}
        index={0}
        section="E"
      >
        hi
      </Slide>,
    ),
  );
  const root = screen.getByTestId("slide");
  // The data attrs live on the inner `.stage` element so the export
  // pipeline (PDF/PPTX) can still find them via [data-testid="slide"].
  expect(root.classList.contains("stage")).toBe(true);
  expect(root.getAttribute("data-animation-mode")).toBe("step-reveal");
  expect(root.getAttribute("data-canonical-pose")).toBe("2");
  expect(root.getAttribute("data-slide-index")).toBe("0");
});

test("Slide stage has fixed 1280x720 dimensions (via CSS classes)", () => {
  // Stage dimensions are owned by globals.css (`.stage-wrap` = 1280×720,
  // `.stage` = absolute inset:0). We document the contract here by asserting
  // class membership; the actual layout is verified at the e2e level in
  // tests/e2e/viewport-fit.spec.ts.
  const { container } = render(
    wrap(
      <Slide animationMode="static" canonicalPose={0} index={0} section="E">
        hi
      </Slide>,
    ),
  );
  const stageWrap = container.querySelector(".stage-wrap");
  expect(stageWrap).not.toBeNull();
  const stage = screen.getByTestId("slide");
  expect(stage.classList.contains("stage")).toBe(true);
});

test("Slide stage has cursor: pointer", () => {
  render(
    wrap(
      <Slide animationMode="static" canonicalPose={0} index={0} section="E">
        hi
      </Slide>,
    ),
  );
  const root = screen.getByTestId("slide");
  const style = root.getAttribute("style") ?? "";
  expect(style).toMatch(/cursor:\s*pointer/);
});

// Tiny probe component that exposes the deck's slide+step indices to the DOM
// so tests can assert state changes after click-to-advance fires.
function StateProbe() {
  const { slideIndex, stepIndex } = useDeck();
  return (
    <div
      data-testid="probe"
      data-slide={slideIndex}
      data-step={stepIndex}
    />
  );
}

test("clicking the stage advances the deck (animationMode=static)", () => {
  render(
    <DeckProvider stepCounts={[2, 2]}>
      <Slide animationMode="static" canonicalPose={0} index={0} section="E">
        <span>body</span>
      </Slide>
      <StateProbe />
    </DeckProvider>,
  );
  expect(screen.getByTestId("probe").getAttribute("data-step")).toBe("0");
  fireEvent.click(screen.getByText("body"));
  expect(screen.getByTestId("probe").getAttribute("data-step")).toBe("1");
});

test("clicking the stage advances the deck (animationMode=step-reveal)", () => {
  render(
    <DeckProvider stepCounts={[2, 2]}>
      <Slide
        animationMode="step-reveal"
        canonicalPose={0}
        index={0}
        section="E"
      >
        <span>body</span>
      </Slide>
      <StateProbe />
    </DeckProvider>,
  );
  expect(screen.getByTestId("probe").getAttribute("data-step")).toBe("0");
  fireEvent.click(screen.getByText("body"));
  expect(screen.getByTestId("probe").getAttribute("data-step")).toBe("1");
});

test("clicking a <button> inside the stage does NOT advance", () => {
  render(
    <DeckProvider stepCounts={[2, 2]}>
      <Slide animationMode="static" canonicalPose={0} index={0} section="E">
        <button type="button">no-op</button>
      </Slide>
      <StateProbe />
    </DeckProvider>,
  );
  expect(screen.getByTestId("probe").getAttribute("data-step")).toBe("0");
  fireEvent.click(screen.getByRole("button", { name: "no-op" }));
  // Step did not advance — the button matched the closest() guard.
  // (NavBar buttons are also covered by this since they're <button> elements.)
  expect(screen.getByTestId("probe").getAttribute("data-step")).toBe("0");
});

test("clicking an element marked data-no-advance does NOT advance", () => {
  render(
    <DeckProvider stepCounts={[2, 2]}>
      <Slide animationMode="static" canonicalPose={0} index={0} section="E">
        <div data-no-advance data-testid="opt-out">
          shielded
        </div>
      </Slide>
      <StateProbe />
    </DeckProvider>,
  );
  expect(screen.getByTestId("probe").getAttribute("data-step")).toBe("0");
  fireEvent.click(screen.getByTestId("opt-out"));
  expect(screen.getByTestId("probe").getAttribute("data-step")).toBe("0");
});

test("Slide renders NavBar inside the stage with the section tag", () => {
  render(
    wrap(
      <Slide animationMode="static" canonicalPose={0} index={0} section="E">
        hi
      </Slide>,
    ),
  );
  // NavBar's section tag reads "Section E" and lives inside the stage.
  const tag = screen.getByText(/Section\s+E/);
  expect(tag).toBeInTheDocument();
  const stage = screen.getByTestId("slide");
  expect(stage.contains(tag)).toBe(true);
});
