import { render, screen } from "@testing-library/react";
import { LadderLoopBack } from "@/slides/foundation-core/components/LadderLoopBack";

test("LadderLoopBack renders STOP, the ↻ glyph, and the redesign-first sub-line", () => {
  render(<LadderLoopBack />);
  expect(screen.getByText(/STOP/)).toBeInTheDocument();
  expect(screen.getByText(/↻/)).toBeInTheDocument();
  expect(screen.getByText(/redesign first/i)).toBeInTheDocument();
});

test("LadderLoopBack wraps its glyph in a PulseGlow with the spec'd 4s period", () => {
  render(<LadderLoopBack />);
  const pulse = screen.getByTestId("pulse-glow");
  expect(pulse.getAttribute("data-period")).toBe("4");
});
