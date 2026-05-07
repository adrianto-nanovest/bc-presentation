import { render, screen } from "@testing-library/react";
import { HarnessCanvas } from "@/slides/reveal-and-closing/components/HarnessCanvas";

test("HarnessCanvas renders default state when no selectedId", () => {
  render(<HarnessCanvas selectedId={null} mode="simulation" onToggleMode={() => {}} />);
  expect(screen.getByTestId("harness-canvas")).toBeInTheDocument();
  expect(screen.getByText(/MAIN AGENT/)).toBeInTheDocument();
  expect(screen.getByText(/The harness pattern/)).toBeInTheDocument();
});

test("HarnessCanvas exposes data-selected attribute", () => {
  const { rerender } = render(<HarnessCanvas selectedId="stocks-intel" mode="simulation" onToggleMode={() => {}} />);
  expect(screen.getByTestId("harness-canvas").getAttribute("data-selected")).toBe("stocks-intel");
  rerender(<HarnessCanvas selectedId={null} mode="simulation" onToggleMode={() => {}} />);
  expect(screen.getByTestId("harness-canvas").getAttribute("data-selected")).toBe("");
});

test("HarnessCanvas renders the see-it-real toggle only for heavy items", () => {
  render(<HarnessCanvas selectedId="stocks-intel" mode="simulation" onToggleMode={() => {}} />);
  expect(screen.getByText(/see it real/)).toBeInTheDocument();
});

test("HarnessCanvas hides the see-it-real toggle for light items", () => {
  render(<HarnessCanvas selectedId="sonarqube" mode="simulation" onToggleMode={() => {}} />);
  expect(screen.queryByText(/see it real/)).toBeNull();
});
