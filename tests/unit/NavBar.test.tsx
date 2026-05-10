import { fireEvent, render, screen, act } from "@testing-library/react";
import { NavBar } from "@/deck/NavBar";
import { DeckProvider, useDeck } from "@/deck/DeckContext";

// Test driver that renders the NavBar plus a small probe so we can both
// drive the deck (via goTo/advance) and read its state back from the DOM.
function Harness({
  stepCounts,
  initialSlide = 0,
  initialStep = 0,
}: {
  stepCounts: number[];
  initialSlide?: number;
  initialStep?: number;
}) {
  return (
    <DeckProvider stepCounts={stepCounts}>
      <Probe initialSlide={initialSlide} initialStep={initialStep} />
      <NavBar section="E" />
    </DeckProvider>
  );
}

function Probe({
  initialSlide,
  initialStep,
}: {
  initialSlide: number;
  initialStep: number;
}) {
  const { slideIndex, stepIndex, goTo } = useDeck();
  // Seed the deck once via goTo so the test's "starting position" is
  // explicit. We use a button rather than useEffect so React's act() rules
  // are honoured cleanly.
  return (
    <div>
      <span data-testid="slide">{slideIndex}</span>
      <span data-testid="step">{stepIndex}</span>
      <button
        data-testid="seed"
        onClick={() => goTo(initialSlide, initialStep)}
      >
        seed
      </button>
    </div>
  );
}

function setup(opts: {
  stepCounts: number[];
  initialSlide?: number;
  initialStep?: number;
}) {
  render(<Harness {...opts} />);
  if (opts.initialSlide || opts.initialStep) {
    act(() => screen.getByTestId("seed").click());
  }
}

function getButton(title: string): HTMLButtonElement {
  return screen.getByTitle(title) as HTMLButtonElement;
}

test("renders the section tag with the supplied letter", () => {
  setup({ stepCounts: [3, 4, 2] });
  expect(screen.getByText("Section E")).toBeInTheDocument();
});

test("renders zero-padded step and slide counters", () => {
  // Use distinct shapes so the counters don't collide: 3 slides, first
  // slide has 5 steps. The step counter shows "01 / 05", the slide
  // counter shows "01 / 03".
  setup({ stepCounts: [5, 4, 2] });
  expect(screen.getByText("01 / 05")).toBeInTheDocument();
  expect(screen.getByText("01 / 03")).toBeInTheDocument();
});

test("step prev button is disabled at stepIndex 0", () => {
  setup({ stepCounts: [3, 4, 2] });
  expect(getButton("Previous step (Backspace)").disabled).toBe(true);
  expect(getButton("Next step").disabled).toBe(false);
});

test("step next button is disabled at the last step of the slide", () => {
  setup({ stepCounts: [3, 4, 2], initialSlide: 0, initialStep: 2 });
  expect(getButton("Next step").disabled).toBe(true);
  expect(getButton("Previous step (Backspace)").disabled).toBe(false);
});

test("slide prev button is disabled at slideIndex 0", () => {
  setup({ stepCounts: [3, 4, 2] });
  expect(getButton("Previous slide (←)").disabled).toBe(true);
  expect(getButton("Next slide (→)").disabled).toBe(false);
});

test("slide next button is disabled at the last slide", () => {
  setup({ stepCounts: [3, 4, 2], initialSlide: 2, initialStep: 0 });
  expect(getButton("Next slide (→)").disabled).toBe(true);
  expect(getButton("Previous slide (←)").disabled).toBe(false);
});

test("nav-bar click does not bubble to the parent (stopPropagation)", () => {
  const parentClick = vi.fn();
  render(
    <div onClick={parentClick}>
      <DeckProvider stepCounts={[3, 4, 2]}>
        <NavBar section="E" />
      </DeckProvider>
    </div>,
  );
  // HTMLElement.click() / fireEvent.click only synthesizes a click — it
  // does NOT fire a preceding mousedown — so this test isolates the click
  // path. The mousedown stop guard is exercised separately below.
  act(() => getButton("Next step").click());
  expect(parentClick).not.toHaveBeenCalled();
});

test("nav-bar mousedown does not bubble to the parent (stopPropagation)", () => {
  const parentMouseDown = vi.fn();
  render(
    <div onMouseDown={parentMouseDown}>
      <DeckProvider stepCounts={[3, 4, 2]}>
        <NavBar section="E" />
      </DeckProvider>
    </div>,
  );
  // Explicitly fire a mousedown so the .nav-bar onMouseDown={stop} guard
  // is actually exercised. Slide.tsx (T6) listens to mousedown for its
  // click-to-advance logic, so the bubble guard is load-bearing.
  fireEvent.mouseDown(getButton("Next step"));
  expect(parentMouseDown).not.toHaveBeenCalled();
});

test("clicking next step advances stepIndex", () => {
  setup({ stepCounts: [3, 4, 2] });
  expect(screen.getByTestId("step").textContent).toBe("0");
  act(() => getButton("Next step").click());
  expect(screen.getByTestId("step").textContent).toBe("1");
});

test("clicking prev step decrements stepIndex", () => {
  setup({ stepCounts: [3, 4, 2], initialSlide: 0, initialStep: 2 });
  expect(screen.getByTestId("step").textContent).toBe("2");
  act(() => getButton("Previous step (Backspace)").click());
  expect(screen.getByTestId("step").textContent).toBe("1");
});

test("clicking reset-step sends step to 0 without changing slide", () => {
  setup({ stepCounts: [3, 4, 2], initialSlide: 1, initialStep: 3 });
  expect(screen.getByTestId("slide").textContent).toBe("1");
  expect(screen.getByTestId("step").textContent).toBe("3");
  act(() => getButton("Reset step (U)").click());
  expect(screen.getByTestId("slide").textContent).toBe("1");
  expect(screen.getByTestId("step").textContent).toBe("0");
});

test("clicking next slide jumps to the next slide at step 0", () => {
  setup({ stepCounts: [3, 4, 2], initialSlide: 0, initialStep: 2 });
  act(() => getButton("Next slide (→)").click());
  expect(screen.getByTestId("slide").textContent).toBe("1");
  expect(screen.getByTestId("step").textContent).toBe("0");
});

test("clicking prev slide jumps to the previous slide at step 0", () => {
  setup({ stepCounts: [3, 4, 2], initialSlide: 2, initialStep: 1 });
  act(() => getButton("Previous slide (←)").click());
  expect(screen.getByTestId("slide").textContent).toBe("1");
  expect(screen.getByTestId("step").textContent).toBe("0");
});

test("clicking reset deck sends both slide and step to 0", () => {
  setup({ stepCounts: [3, 4, 2], initialSlide: 2, initialStep: 1 });
  expect(screen.getByTestId("slide").textContent).toBe("2");
  act(() => getButton("Reset deck (R)").click());
  expect(screen.getByTestId("slide").textContent).toBe("0");
  expect(screen.getByTestId("step").textContent).toBe("0");
});

test("nav-zone wrapper carries the data-no-advance attribute", () => {
  const { container } = render(
    <DeckProvider stepCounts={[1]}>
      <NavBar section="E" />
    </DeckProvider>,
  );
  const zone = container.querySelector(".nav-zone");
  expect(zone).not.toBeNull();
  expect(zone?.getAttribute("data-no-advance")).not.toBeNull();
});
