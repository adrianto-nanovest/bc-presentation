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

function fire(key: string, init: KeyboardEventInit = {}) {
  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key, ...init }));
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

test("Enter advances one step (alias of Space)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("Enter");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("ArrowDown advances one step (alias of Space)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowDown");
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

test("ArrowUp retreats one step within the current slide", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire(" "); // 0:0 -> 0:1
  fire(" "); // 0:1 -> 0:2
  expect(getByTestId("state").textContent).toBe("0:2");
  fire("ArrowUp");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("ArrowUp at slide start spills back to previous slide's last step", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight"); // → 1:0
  expect(getByTestId("state").textContent).toBe("1:0");
  fire("ArrowUp"); // spill back to slide 0 last step (stepCount 3 → step 2)
  expect(getByTestId("state").textContent).toBe("0:2");
});

test("Backspace retreats (alias of ArrowUp)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire(" ");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("0:2");
  fire("Backspace");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("Delete retreats (alias of Backspace)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire(" ");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("0:2");
  fire("Delete");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("r resets the entire deck to slide 0 step 0", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight"); // → 1:0
  fire(" "); // 1:1
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("r");
  expect(getByTestId("state").textContent).toBe("0:0");
});

test("R (uppercase) also resets the deck", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("R");
  expect(getByTestId("state").textContent).toBe("0:0");
});

test("u resets the current slide's step to 0 without changing slide", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight"); // → 1:0
  fire(" "); // → 1:1
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("u");
  expect(getByTestId("state").textContent).toBe("1:0");
});

test("U (uppercase) also resets the current step", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("U");
  expect(getByTestId("state").textContent).toBe("1:0");
});

test("Cmd+r does NOT reset the deck (browser reload protected)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("r", { metaKey: true });
  expect(getByTestId("state").textContent).toBe("1:1");
});

test("Ctrl+r does NOT reset the deck", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("r", { ctrlKey: true });
  expect(getByTestId("state").textContent).toBe("1:1");
});

test("Alt+r does NOT reset the deck", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("r", { altKey: true });
  expect(getByTestId("state").textContent).toBe("1:1");
});

test("Cmd+u does NOT reset the current step (view-source protected)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("u", { metaKey: true });
  expect(getByTestId("state").textContent).toBe("1:1");
});

test("keystrokes inside an input are ignored", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
      <input data-testid="input" />
    </DeckProvider>,
  );
  const input = getByTestId("input") as HTMLInputElement;
  input.focus();
  act(() => {
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", bubbles: true }),
    );
  });
  expect(getByTestId("state").textContent).toBe("0:0");
});

test("keystrokes inside a textarea are ignored", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
      <textarea data-testid="ta" />
    </DeckProvider>,
  );
  const ta = getByTestId("ta") as HTMLTextAreaElement;
  ta.focus();
  act(() => {
    ta.dispatchEvent(new KeyboardEvent("keydown", { key: "r", bubbles: true }));
  });
  expect(getByTestId("state").textContent).toBe("0:0");
});

test("keystrokes inside a contenteditable element are ignored", () => {
  function WithEditable() {
    useKeyboardNav();
    const { slideIndex, stepIndex } = useDeck();
    return (
      <>
        <span data-testid="state">
          {slideIndex}:{stepIndex}
        </span>
        <div data-testid="ce" contentEditable />
      </>
    );
  }
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <WithEditable />
    </DeckProvider>,
  );
  const ce = getByTestId("ce") as HTMLDivElement;
  ce.focus();
  act(() => {
    ce.dispatchEvent(new KeyboardEvent("keydown", { key: "r", bubbles: true }));
  });
  expect(getByTestId("state").textContent).toBe("0:0");
});
