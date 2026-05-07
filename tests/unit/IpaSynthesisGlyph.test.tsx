import { render, screen } from "@testing-library/react";
import { IpaSynthesisGlyph } from "@/slides/foundation-core/glyphs/IpaSynthesisGlyph";

test("IpaSynthesisGlyph renders 8 raw data bars, 4 core-strength labels, and the insight glyph", () => {
  render(<IpaSynthesisGlyph play={false} />);
  expect(screen.getAllByTestId("ipa-bar")).toHaveLength(8);
  expect(screen.getByText(/summarization/)).toBeInTheDocument();
  expect(screen.getByText(/analysis/)).toBeInTheDocument();
  expect(screen.getByText(/generation/)).toBeInTheDocument();
  expect(screen.getByText(/NLU/)).toBeInTheDocument();
  expect(screen.getByTestId("ipa-insight")).toBeInTheDocument();
});
