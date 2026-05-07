import { render, screen } from "@testing-library/react";
import { BpmCompressionGlyph } from "@/slides/foundation-core/glyphs/BpmCompressionGlyph";

test("BpmCompressionGlyph renders 20 top squares, 8 bottom squares, and the counter", () => {
  render(<BpmCompressionGlyph play={false} />);
  expect(screen.getAllByTestId("bpm-top-square")).toHaveLength(20);
  expect(screen.getAllByTestId("bpm-bottom-square")).toHaveLength(8);
  expect(screen.getByTestId("bpm-counter")).toBeInTheDocument();
});

test("BpmCompressionGlyph exposes play state via data attribute", () => {
  const { rerender } = render(<BpmCompressionGlyph play={false} />);
  expect(screen.getByTestId("bpm-glyph").getAttribute("data-play")).toBe("false");
  rerender(<BpmCompressionGlyph play={true} />);
  expect(screen.getByTestId("bpm-glyph").getAttribute("data-play")).toBe("true");
});
