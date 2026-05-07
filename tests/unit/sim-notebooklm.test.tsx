import { render, screen } from "@testing-library/react";
import { NotebookLM } from "@/slides/reveal-and-closing/simulations/NotebookLM";

test("NotebookLM renders the 6 perimeter sub-agents", () => {
  render(<NotebookLM />);
  ["deep-researcher", "cross-notebook-query", "youtube-curator",
   "drive-scout", "url-crawler", "brain-compiler"]
    .forEach((label) => expect(screen.getByText(new RegExp(label))).toBeInTheDocument());
});

test("NotebookLM names the central main agent + the MCP tool pool", () => {
  render(<NotebookLM />);
  expect(screen.getByText(/NotebookLM agent/i)).toBeInTheDocument();
  expect(screen.getByText(/50\+ MCP tools/i)).toBeInTheDocument();
});
