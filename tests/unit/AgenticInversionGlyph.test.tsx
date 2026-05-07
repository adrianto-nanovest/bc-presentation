import { render, screen } from "@testing-library/react";
import { AgenticInversionGlyph } from "@/slides/foundation-core/glyphs/AgenticInversionGlyph";

test("AgenticInversionGlyph renders YOU + REPORT labels, arrow path, and ↻ loopback", () => {
  render(<AgenticInversionGlyph play={false} />);
  expect(screen.getByText("YOU")).toBeInTheDocument();
  expect(screen.getByText("REPORT")).toBeInTheDocument();
  expect(screen.getByTestId("agentic-arrow")).toBeInTheDocument();
  expect(screen.getByTestId("agentic-loopback")).toBeInTheDocument();
});

test("AgenticInversionGlyph caption reads reactive → proactive", () => {
  render(<AgenticInversionGlyph play={false} />);
  expect(screen.getByText(/reactive/)).toBeInTheDocument();
  expect(screen.getByText(/proactive/)).toBeInTheDocument();
});
