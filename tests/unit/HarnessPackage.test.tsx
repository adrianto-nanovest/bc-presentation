import { render, screen } from "@testing-library/react";
import { HarnessPackage } from "@/slides/foundation-core-section-e/components/HarnessPackage";

const INCLUDES = [
  "Context Isolation",
  "Tool Loadout",
  "Subagent Verification",
  "Pruning",
  "Summarization",
  "Offloading",
];

test("HarnessPackage renders HARNESS label + sub-label", () => {
  render(<HarnessPackage includes={INCLUDES} revealIncludes={false} revealArrows={false} />);
  expect(screen.getByText("HARNESS")).toBeInTheDocument();
  expect(screen.getByText(/Automates context engineering/)).toBeInTheDocument();
});

test("Includes row gates on revealIncludes", () => {
  const { rerender } = render(<HarnessPackage includes={INCLUDES} revealIncludes={false} revealArrows={false} />);
  expect(screen.getByTestId("harness-includes").getAttribute("data-revealed")).toBe("false");
  rerender(<HarnessPackage includes={INCLUDES} revealIncludes={true} revealArrows={false} />);
  expect(screen.getByTestId("harness-includes").getAttribute("data-revealed")).toBe("true");
  expect(screen.getAllByTestId(/^harness-include-/)).toHaveLength(6);
});

test("arrows gate on revealArrows", () => {
  render(<HarnessPackage includes={INCLUDES} revealIncludes={true} revealArrows={true} />);
  expect(screen.getByTestId("harness-arrow-input").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("harness-arrow-output").getAttribute("data-revealed")).toBe("true");
});
