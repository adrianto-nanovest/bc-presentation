import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";

function Probe() {
  const { slideIndex, stepIndex, advance, retreat } = useDeck();
  return (
    <div>
      <span data-testid="slide">{slideIndex}</span>
      <span data-testid="step">{stepIndex}</span>
      <button data-testid="adv" onClick={advance}>
        adv
      </button>
      <button data-testid="ret" onClick={retreat}>
        ret
      </button>
    </div>
  );
}

function setup(stepCounts: number[]) {
  return render(
    <DeckProvider stepCounts={stepCounts}>
      <Probe />
    </DeckProvider>,
  );
}

test("advance walks step-by-step then crosses slide boundaries", () => {
  setup([3, 2]); // slide 0 has 3 steps, slide 1 has 2
  expect(screen.getByTestId("slide").textContent).toBe("0");
  expect(screen.getByTestId("step").textContent).toBe("0");

  act(() => screen.getByTestId("adv").click()); // step 1
  expect(screen.getByTestId("step").textContent).toBe("1");

  act(() => screen.getByTestId("adv").click()); // step 2 (last on slide 0)
  expect(screen.getByTestId("step").textContent).toBe("2");

  act(() => screen.getByTestId("adv").click()); // crosses to slide 1, step 0
  expect(screen.getByTestId("slide").textContent).toBe("1");
  expect(screen.getByTestId("step").textContent).toBe("0");
});

test("retreat from step 0 of slide N+1 lands on last step of slide N", () => {
  setup([3, 2]);
  for (let i = 0; i < 3; i++) act(() => screen.getByTestId("adv").click());
  expect(screen.getByTestId("slide").textContent).toBe("1");
  act(() => screen.getByTestId("ret").click());
  expect(screen.getByTestId("slide").textContent).toBe("0");
  expect(screen.getByTestId("step").textContent).toBe("2");
});

test("advance past the final step is a no-op", () => {
  setup([1, 1]);
  for (let i = 0; i < 5; i++) act(() => screen.getByTestId("adv").click());
  expect(screen.getByTestId("slide").textContent).toBe("1");
  expect(screen.getByTestId("step").textContent).toBe("0");
});

test("retreat before the first step is a no-op", () => {
  setup([2, 2]);
  act(() => screen.getByTestId("ret").click());
  expect(screen.getByTestId("slide").textContent).toBe("0");
  expect(screen.getByTestId("step").textContent).toBe("0");
});
