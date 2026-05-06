import { render, screen } from "@testing-library/react";
import { LoopingAmbient } from "@/motion/LoopingAmbient";
import { Static } from "@/motion/Static";

test("LoopingAmbient marks itself with data-loop", () => {
  render(<LoopingAmbient>x</LoopingAmbient>);
  expect(screen.getByTestId("loop").getAttribute("data-loop")).toBe("true");
});

test("Static renders children with no animation wrapper", () => {
  render(<Static>x</Static>);
  expect(screen.getByTestId("static").textContent).toBe("x");
});
