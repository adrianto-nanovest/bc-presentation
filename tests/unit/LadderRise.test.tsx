import { render, screen } from "@testing-library/react";
import { LadderRise } from "@/slides/foundation-core/components/LadderRise";
import { d4Content } from "@/slides/foundation-core/content";

test("LadderRise renders 5 questions, 4 terminals, 1 loopback, and the start node", () => {
  render(<LadderRise content={d4Content.ladder} revealedSteps={5} />);
  expect(screen.getAllByTestId("ladder-question")).toHaveLength(5);
  expect(screen.getAllByTestId("ladder-terminal")).toHaveLength(4);
  expect(screen.getByTestId("ladder-loopback")).toBeInTheDocument();
  expect(screen.getByTestId("ladder-start")).toBeInTheDocument();
});

test("LadderRise reveals progressively: at revealedSteps=1, only Q1 + STOP↻ are visible", () => {
  render(<LadderRise content={d4Content.ladder} revealedSteps={1} />);
  const root = screen.getByTestId("ladder-rise");
  expect(root.getAttribute("data-revealed-steps")).toBe("1");
});
