import { render, screen } from "@testing-library/react";
import { RpaAccelerationGlyph } from "@/slides/foundation-core/glyphs/RpaAccelerationGlyph";

test("RpaAccelerationGlyph renders 6 weekday tick-dots and a copper bolt path", () => {
  render(<RpaAccelerationGlyph play={false} />);
  expect(screen.getAllByTestId("rpa-tick")).toHaveLength(6);
  expect(screen.getByTestId("rpa-bolt")).toBeInTheDocument();
});

test("RpaAccelerationGlyph shows manual + bot counter labels", () => {
  render(<RpaAccelerationGlyph play={false} />);
  expect(screen.getByText(/MANUAL/)).toBeInTheDocument();
  expect(screen.getByText(/BOT/)).toBeInTheDocument();
});
