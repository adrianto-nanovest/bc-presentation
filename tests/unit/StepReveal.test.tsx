import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { StepReveal } from "@/motion/StepReveal";

function Adv() {
  const { advance } = useDeck();
  return <button data-testid="adv" onClick={advance} />;
}

test("children with stepIndex <= currentStep are revealed", () => {
  render(
    <DeckProvider stepCounts={[3]}>
      <StepReveal>
        <div data-testid="a">A</div>
        <div data-testid="b">B</div>
        <div data-testid="c">C</div>
      </StepReveal>
      <Adv />
    </DeckProvider>,
  );

  expect(screen.getByTestId("a").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("b").getAttribute("data-revealed")).toBe("false");
  expect(screen.getByTestId("c").getAttribute("data-revealed")).toBe("false");

  act(() => screen.getByTestId("adv").click());
  expect(screen.getByTestId("b").getAttribute("data-revealed")).toBe("true");

  act(() => screen.getByTestId("adv").click());
  expect(screen.getByTestId("c").getAttribute("data-revealed")).toBe("true");
});
