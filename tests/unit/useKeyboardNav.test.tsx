import { render, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { useKeyboardNav } from "@/deck/useKeyboardNav";

function Mount() {
  useKeyboardNav();
  const { slideIndex, stepIndex } = useDeck();
  return (
    <span data-testid="state">
      {slideIndex}:{stepIndex}
    </span>
  );
}

function fire(key: string) {
  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key }));
  });
}

test("Space advances one step within a slide", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  expect(getByTestId("state").textContent).toBe("0:0");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("ArrowRight skips to the next slide regardless of remaining steps", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  expect(getByTestId("state").textContent).toBe("1:0");
});

test("ArrowLeft jumps to step 0 of the previous slide", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight"); // → slide 1
  fire("ArrowLeft"); // ← slide 0, step 0
  expect(getByTestId("state").textContent).toBe("0:0");
});
