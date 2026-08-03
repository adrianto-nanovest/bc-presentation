// The two edge cases §3.5 asks to settle in code.
//
// Spec §3.5 (gh#35). Both are ways a MISSING number could reach the screen as
// text instead of as a failure, which on a projector is the worse of the two
// outcomes. That the context carries a value it was handed is React's own
// behaviour and is not restated here — the useful assertions are in
// `FigLabel.test.tsx` (what gets printed) and `Slide.test.tsx` (who publishes).
import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { SlideNumberProvider, useSlideNumber } from "@/deck/SlideNumberContext";

/** Renders whatever `useSlideNumber()` returns, so a test can read it back. */
function Probe() {
  const { letter, num } = useSlideNumber();
  return <span data-testid="probe" data-fig={`${letter}.${String(num)}`} />;
}

// EDGE CASE 1 — the failure this replaces is `FIG. undefined.undefined` rendering
// happily on a real slide, which no assertion in the suite would have caught. So
// the miss has to be loud, and it has to name what is missing.
test("useSlideNumber outside a provider throws, naming the hook and the provider", () => {
  // React logs the thrown render error; silence it so the failure output is the
  // assertion and not a wall of component stack.
  const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    expect(() => render(<Probe />)).toThrow(/useSlideNumber(.|\n)*SlideNumberProvider/);
  } finally {
    errorLog.mockRestore();
  }
});

// EDGE CASE 2, context half — R3 gives `numbered: false` slides `num: null`. The
// context passes that through untouched rather than defaulting it to something
// printable; refusing to PRINT it is FigLabel's job, asserted in its own file.
test("a null number is carried as null, not coerced to a printable value", () => {
  const { getByTestId } = render(
    <SlideNumberProvider value={{ letter: "A", num: null, sectionKey: "opening" }}>
      <Probe />
    </SlideNumberProvider>,
  );
  expect(getByTestId("probe").getAttribute("data-fig")).toBe("A.null");
});
