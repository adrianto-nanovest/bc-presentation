import { render, screen } from "@testing-library/react";
import { StepConnector } from "@/slides/reveal-and-closing/components/StepConnector";

test("StepConnector renders an SVG path with the requested direction attribute", () => {
  render(<StepConnector direction="down" />);
  const c = screen.getByTestId("step-connector");
  expect(c.getAttribute("data-direction")).toBe("down");
  expect(c.querySelector("path")).not.toBeNull();
});

test("StepConnector renders a label when provided", () => {
  render(<StepConnector direction="loopBack" label="refine, iterate" />);
  expect(screen.getByText("refine, iterate")).toBeInTheDocument();
});

test("StepConnector flags ambient when explicitly opted in", () => {
  render(<StepConnector direction="loopBack" ambient="backward" />);
  expect(screen.getByTestId("step-connector").getAttribute("data-ambient")).toBe(
    "backward",
  );
});
