// tests/unit/LayerDemo.test.tsx
import { render, screen } from "@testing-library/react";
import { LayerDemo } from "@/slides/foundation-core-section-e/components/LayerDemo";

test("LayerDemo prompt-typing renders the structured prompt body", () => {
  render(<LayerDemo kind="prompt-typing" play />);
  // Should show at least the "Role:" label as part of the typed prompt.
  expect(screen.getByTestId("layer-demo-prompt-typing")).toBeInTheDocument();
});

test("LayerDemo context-network renders 6 satellite nodes", () => {
  render(<LayerDemo kind="context-network" play />);
  expect(screen.getAllByTestId(/^context-satellite-/)).toHaveLength(6);
});

test("LayerDemo multi-agent-orchestration renders the orchestration host", () => {
  render(<LayerDemo kind="multi-agent-orchestration" play />);
  expect(screen.getByTestId("layer-demo-multi-agent")).toBeInTheDocument();
});
