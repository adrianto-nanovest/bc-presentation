import { render, screen } from "@testing-library/react";
import { HarnessPattern } from "@/components/HarnessPattern";

test("HarnessPattern renders main agent + 2 sub-agents + 2 direct tools", () => {
  render(<HarnessPattern play={false} />);
  expect(screen.getByTestId("harness-main-agent").textContent).toMatch(/MAIN AGENT/);
  expect(screen.getAllByTestId(/^harness-subagent-[ab]$/)).toHaveLength(2);
  expect(screen.getAllByTestId(/^harness-direct-tool-/)).toHaveLength(2);
  expect(screen.getAllByTestId(/^harness-subagent-tool-/)).toHaveLength(2);
});

test("HarnessPattern renders branch labels delegate + tools", () => {
  render(<HarnessPattern play={false} />);
  expect(screen.getByText("delegate")).toBeInTheDocument();
  expect(screen.getByText("tools")).toBeInTheDocument();
});

test("HarnessPattern renders Pattern: centralized annotation", () => {
  render(<HarnessPattern play={false} />);
  expect(screen.getByText(/Pattern: centralized/)).toBeInTheDocument();
});

test("HarnessPattern data-play reflects play prop", () => {
  const { rerender } = render(<HarnessPattern play={false} />);
  expect(screen.getByTestId("harness-pattern-root").getAttribute("data-play")).toBe("false");
  rerender(<HarnessPattern play={true} />);
  expect(screen.getByTestId("harness-pattern-root").getAttribute("data-play")).toBe("true");
});
