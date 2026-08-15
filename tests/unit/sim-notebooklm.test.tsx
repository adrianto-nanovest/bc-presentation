import { render, screen } from "@testing-library/react";
import { NotebookLM } from "@/slides/reveal-and-closing/simulations/NotebookLM";

test("NotebookLM renders the 6 perimeter sub-agents", () => {
  render(<NotebookLM />);
  ["deep-researcher", "cross-notebook-query", "youtube-curator",
   "drive-scout", "url-crawler", "brain-compiler"]
    // "deep-researcher" also appears in the router's intent map, so allow >= 1
    .forEach((label) => expect(screen.getAllByText(new RegExp(label)).length)
      .toBeGreaterThanOrEqual(1));
});

test("NotebookLM names the central intent classifier and its routing table", () => {
  render(<NotebookLM />);
  expect(screen.getByText(/NLM INTENT CLASSIFIER/i)).toBeInTheDocument();
  expect(screen.getByText("nlm")).toBeInTheDocument();
  expect(screen.getByText(/intent → agent/i)).toBeInTheDocument();
});
