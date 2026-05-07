import { render, screen } from "@testing-library/react";
import { LegalDocs } from "@/slides/reveal-and-closing/simulations/LegalDocs";

test("LegalDocs renders the dual-entry, two approval gates, and Dropbox Sign nodes", () => {
  render(<LegalDocs />);
  expect(screen.getByText(/\/nanoearn/i)).toBeInTheDocument();
  expect(screen.getAllByText(/webhook/i).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText(/Finance/)).toBeInTheDocument();
  expect(screen.getByText(/Legal/)).toBeInTheDocument();
  expect(screen.getByText(/Dropbox Sign/i)).toBeInTheDocument();
  expect(screen.getByText(/AI Revision/i)).toBeInTheDocument();
});
