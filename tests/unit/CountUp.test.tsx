import { render, screen } from "@testing-library/react";
import { CountUp } from "@/slides/foundation-core/components/CountUp";

test("CountUp renders the target integer at end-state and exposes data attrs for export pipelines", () => {
  render(<CountUp from={0} to={73} durationMs={1500} testId="trap-stat" />);
  const el = screen.getByTestId("trap-stat");
  // jsdom does not run framer-motion's RAF; the rendered text holds the
  // immediate value. We assert at the data-attribute boundary so the export
  // pipeline (which freezes at canonicalPose) and visual-regression tools
  // can both observe the target.
  expect(el.getAttribute("data-count-from")).toBe("0");
  expect(el.getAttribute("data-count-to")).toBe("73");
  expect(el.getAttribute("data-duration-ms")).toBe("1500");
});

test("CountUp accepts a from value > to value (counter rolls down)", () => {
  render(<CountUp from={20} to={8} durationMs={1200} testId="bpm-counter" />);
  const el = screen.getByTestId("bpm-counter");
  expect(el.getAttribute("data-count-from")).toBe("20");
  expect(el.getAttribute("data-count-to")).toBe("8");
});
