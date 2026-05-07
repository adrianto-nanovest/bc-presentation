import { render, screen } from "@testing-library/react";
import { PulseGlow } from "@/components/PulseGlow";

test("PulseGlow renders its child and applies a looping animate prop", () => {
  render(
    <PulseGlow periodSeconds={5}>
      <span data-testid="target">you</span>
    </PulseGlow>,
  );
  expect(screen.getByTestId("target").textContent).toBe("you");
  // The motion.div wrapper carries data-testid for the loop.
  expect(screen.getByTestId("pulse-glow")).toBeInTheDocument();
  expect(screen.getByTestId("pulse-glow").getAttribute("data-period")).toBe("5");
});
