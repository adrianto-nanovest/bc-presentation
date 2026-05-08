import { render, screen } from "@testing-library/react";
import { NaiveVsProper } from "@/slides/foundation-core-section-e/components/NaiveVsProper";

const FIXTURE = {
  naivePrompt: "Write me this week's project report.",
  naiveResult: "Generic boilerplate line 1\nGeneric boilerplate line 2",
  properPrompt:
    "Role: You are a project lead.\nTask: Draft the weekly status.\nContext: Friday standup, 8 stakeholders.\nExamples: See last week's report.\nOutput: Markdown, ~250 words.",
  properElementLabels: ["Role:", "Task:", "Context:", "Examples:", "Output:"],
  properResult: "## At Risk: Module B\nThis week we...",
};

test("NaiveVsProper renders both NAIVE and PROPER headers", () => {
  render(<NaiveVsProper {...FIXTURE} revealNaive revealProper revealResults />);
  expect(screen.getByText("NAIVE")).toBeInTheDocument();
  expect(screen.getByText("PROPER")).toBeInTheDocument();
});

test("PROPER prompt highlights all 5 inline element labels", () => {
  render(<NaiveVsProper {...FIXTURE} revealNaive revealProper revealResults />);
  for (const label of FIXTURE.properElementLabels) {
    // Each label should appear in the rendered prompt as a copper-300 inline span.
    const matches = screen.getAllByText((_content, el) => el?.textContent === label);
    expect(matches.length).toBeGreaterThan(0);
  }
});

test("naive and proper result blocks gate on revealResults", () => {
  const { rerender } = render(<NaiveVsProper {...FIXTURE} revealNaive revealProper revealResults={false} />);
  expect(screen.getByTestId("naive-result").getAttribute("data-revealed")).toBe("false");
  rerender(<NaiveVsProper {...FIXTURE} revealNaive revealProper revealResults />);
  expect(screen.getByTestId("naive-result").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("proper-result").getAttribute("data-revealed")).toBe("true");
});
