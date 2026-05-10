import { render, screen } from "@testing-library/react";
import { RingStack } from "@/slides/foundation-core-section-e/components/RingStack";

test("renders all three rings in summary mode", () => {
  render(<RingStack focusIndex={null} mode="summary" width={540} height={460} />);
  expect(screen.getByTestId("ring-prompt")).toBeInTheDocument();
  expect(screen.getByTestId("ring-context")).toBeInTheDocument();
  expect(screen.getByTestId("ring-harness")).toBeInTheDocument();
});

test("focal mode marks the focused ring via data-focal", () => {
  render(<RingStack focusIndex={1} mode="focal" width={540} height={460} />);
  expect(screen.getByTestId("ring-prompt").getAttribute("data-focal")).toBe("false");
  expect(screen.getByTestId("ring-context").getAttribute("data-focal")).toBe("true");
});

test("focusIndex=0 renders prompt only (other rings collapsed)", () => {
  render(<RingStack focusIndex={0} mode="focal" width={540} height={460} />);
  expect(screen.getByTestId("ring-prompt")).toBeInTheDocument();
  expect(screen.queryByTestId("ring-context")).toBeNull();
  expect(screen.queryByTestId("ring-harness")).toBeNull();
});

test("data-focus attribute reflects focusIndex", () => {
  const { rerender } = render(
    <RingStack focusIndex={2} mode="focal" width={540} height={460} />,
  );
  expect(screen.getByTestId("ring-stack").getAttribute("data-focus")).toBe("2");
  rerender(<RingStack focusIndex={null} mode="summary" width={540} height={460} />);
  expect(screen.getByTestId("ring-stack").getAttribute("data-focus")).toBe("summary");
});
