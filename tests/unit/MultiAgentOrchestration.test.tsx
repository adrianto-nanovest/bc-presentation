// tests/unit/MultiAgentOrchestration.test.tsx
import { render, screen } from "@testing-library/react";
import { MultiAgentOrchestration } from "@/slides/foundation-core-section-e/components/MultiAgentOrchestration";

test("MultiAgentOrchestration renders MAIN AGENT + 3 sub-agents", () => {
  render(<MultiAgentOrchestration play={false} />);
  expect(screen.getByText("MAIN AGENT")).toBeInTheDocument();
  expect(screen.getByText("AGENT A")).toBeInTheDocument();
  expect(screen.getByText("AGENT B")).toBeInTheDocument();
  expect(screen.getByText("AGENT C")).toBeInTheDocument();
});

test("renders the active pattern label inline", () => {
  render(<MultiAgentOrchestration play />);
  // Label must say one of the 4 patterns.
  const label = screen.getByTestId("orchestration-pattern-label");
  expect(label.textContent).toMatch(/Pattern: (centralized|decentralized \(A2A\)|chain|parallel)/);
});

test("when play=false, ambient is suspended (data-play=false)", () => {
  render(<MultiAgentOrchestration play={false} />);
  expect(screen.getByTestId("orchestration-root").getAttribute("data-play")).toBe("false");
});
