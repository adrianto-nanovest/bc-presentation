import { render, screen } from "@testing-library/react";
import { StrategyRings } from "@/slides/foundation-core-section-e/components/StrategyRings";

const RINGS = [
  { id: "write", label: "WRITE", subHeadline: "Store data for future use", subList: ["Long-term memory", "Scratchpad", "Session state"], copper: "copper-700" as const, kinetic: "pause" as const },
  { id: "select", label: "SELECT", subHeadline: "Choose data needed for the task", subList: ["Retrieve tools", "Retrieve scratchpad", "Retrieve memory", "Retrieve knowledge"], copper: "copper-600" as const, kinetic: "filter" as const },
  { id: "compress", label: "COMPRESS", subHeadline: "Summarize past events efficiently", subList: ["Summarize", "Trim irrelevant tokens"], copper: "copper-500" as const, kinetic: "merge" as const },
  { id: "isolate", label: "ISOLATE", subHeadline: "Separate tasks to avoid interference", subList: ["Partition state", "Sandbox", "Multi-agent"], copper: "copper-400" as const, kinetic: "split" as const },
];

test("StrategyRings renders 4 rings", () => {
  render(<StrategyRings rings={RINGS} revealedThrough={4} ambientOn={false} />);
  expect(screen.getAllByTestId(/^strategy-ring-/)).toHaveLength(4);
});

test("revealedThrough gates which rings are visible", () => {
  render(<StrategyRings rings={RINGS} revealedThrough={2} ambientOn={false} />);
  expect(screen.getByTestId("strategy-ring-write").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("strategy-ring-select").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("strategy-ring-compress").getAttribute("data-revealed")).toBe("false");
  expect(screen.getByTestId("strategy-ring-isolate").getAttribute("data-revealed")).toBe("false");
});

test("each ring exposes its kinetic behavior via data-kinetic", () => {
  render(<StrategyRings rings={RINGS} revealedThrough={4} ambientOn={false} />);
  expect(screen.getByTestId("strategy-ring-write").getAttribute("data-kinetic")).toBe("pause");
  expect(screen.getByTestId("strategy-ring-select").getAttribute("data-kinetic")).toBe("filter");
  expect(screen.getByTestId("strategy-ring-compress").getAttribute("data-kinetic")).toBe("merge");
  expect(screen.getByTestId("strategy-ring-isolate").getAttribute("data-kinetic")).toBe("split");
});

test("ambient layer mounts only when ambientOn=true", () => {
  const { rerender } = render(<StrategyRings rings={RINGS} revealedThrough={4} ambientOn={false} />);
  expect(screen.queryByTestId("strategy-ambient-layer")).toBeNull();
  rerender(<StrategyRings rings={RINGS} revealedThrough={4} ambientOn={true} />);
  expect(screen.getByTestId("strategy-ambient-layer")).toBeInTheDocument();
});
