import { render, screen } from "@testing-library/react";
import { FunnelAnimation } from "@/slides/foundation-core-section-e/components/FunnelAnimation";

test("FunnelAnimation mounts without throwing", () => {
  render(<FunnelAnimation hoveredIndex={null} />);
  expect(screen.getByTestId("funnel-animation")).toBeInTheDocument();
  expect(screen.getByTestId("funnel-animation-canvas")).toBeInTheDocument();
});

test("FunnelAnimation accepts a numeric hoveredIndex without throwing", () => {
  // Smoke test only — jsdom doesn't actually paint to the canvas, so we can't
  // assert pixel data. Just confirm props pass through cleanly.
  render(<FunnelAnimation hoveredIndex={2} />);
  expect(screen.getByTestId("funnel-animation")).toBeInTheDocument();
});

test("re-rendering with a new hoveredIndex doesn't tear down the canvas", () => {
  const { rerender } = render(<FunnelAnimation hoveredIndex={null} />);
  const canvas = screen.getByTestId("funnel-animation-canvas");
  rerender(<FunnelAnimation hoveredIndex={1} />);
  rerender(<FunnelAnimation hoveredIndex={3} />);
  expect(screen.getByTestId("funnel-animation-canvas")).toBe(canvas);
});
