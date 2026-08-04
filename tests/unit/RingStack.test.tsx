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

// ───────────────────── the loop ring ─────────────────────

test("loop is off by default — three rings, no loop ring, no marker", () => {
  render(<RingStack focusIndex={null} mode="summary" width={540} height={460} />);
  expect(screen.getByTestId("ring-stack").getAttribute("data-loop")).toBe("false");
  expect(screen.queryByTestId("ring-loop")).toBeNull();
  expect(screen.queryByTestId("ring-loop-marker")).toBeNull();
  expect(screen.queryByText("LOOP")).toBeNull();
});

test("loop off leaves every existing call site untouched (same diameters)", () => {
  const { rerender } = render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} />,
  );
  const before = screen.getByTestId("ring-stack").innerHTML;
  rerender(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} loop={false} />,
  );
  expect(screen.getByTestId("ring-stack").innerHTML).toBe(before);
  expect(screen.getByTestId("ring-harness").getAttribute("data-diameter")).toBe("380");
});

test("loop on draws a fourth ring labelled LOOP, outside the harness", () => {
  render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} loop />,
  );
  expect(screen.getByTestId("ring-stack").getAttribute("data-loop")).toBe("true");
  expect(screen.getByText("LOOP")).toBeInTheDocument();
  const loopD = Number(screen.getByTestId("ring-loop").getAttribute("data-diameter"));
  const harnessD = Number(
    screen.getByTestId("ring-harness").getAttribute("data-diameter"),
  );
  expect(loopD).toBeGreaterThan(harnessD);
});

test("the loop ring fits the canvas, and every gap clears the label block", () => {
  render(<RingStack focusIndex={3} mode="focal" width={540} height={460} />);
  const d = (id: string) =>
    Number(screen.getByTestId(id).getAttribute("data-diameter"));
  // Outermost ring fills the 460 canvas but does not exceed it. (The marker dot
  // straddles the stroke, so it overhangs by its 4px radius — the canvas does
  // not clip, and the slide budgets for that: ring y 154–606 on a 720 stage,
  // clear of the headline above and the footer below.)
  expect(d("ring-loop")).toBeLessThanOrEqual(460);
  // Strictly nested…
  expect(d("ring-loop")).toBeGreaterThan(d("ring-harness"));
  expect(d("ring-harness")).toBeGreaterThan(d("ring-context"));
  expect(d("ring-context")).toBeGreaterThan(d("ring-prompt"));
  // …and every gap holds a ~39px label block plus air. This is the regression
  // guard for `the repetition` / `the system` sitting on the ring below.
  const gaps = [
    (d("ring-loop") - d("ring-harness")) / 2,
    (d("ring-harness") - d("ring-context")) / 2,
    (d("ring-context") - d("ring-prompt")) / 2,
  ];
  for (const g of gaps) expect(g).toBeGreaterThanOrEqual(56);
  // Smaller than the three-ring pose, which is what buys the outer ring its room.
  expect(d("ring-harness")).toBeLessThan(380);
});

test("focusIndex=3 implies the loop ring and marks it focal", () => {
  render(<RingStack focusIndex={3} mode="focal" width={540} height={460} />);
  expect(screen.getByTestId("ring-stack").getAttribute("data-loop")).toBe("true");
  expect(screen.getByTestId("ring-stack").getAttribute("data-focus")).toBe("3");
  expect(screen.getByTestId("ring-loop").getAttribute("data-focal")).toBe("true");
  expect(screen.getByTestId("ring-harness").getAttribute("data-focal")).toBe("false");
  // The loop is focal, so its essence line prints; the layers below it do not.
  expect(screen.getByText("the repetition")).toBeInTheDocument();
  expect(screen.queryByText("the system")).toBeNull();
});

test("marker rides the loop ring: same box size, painted last", () => {
  render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} loop />,
  );
  const marker = screen.getByTestId("ring-loop-marker");
  const loopD = screen.getByTestId("ring-loop").getAttribute("data-diameter");
  expect((marker as HTMLElement).style.width).toBe(`${loopD}px`);
  expect((marker as HTMLElement).style.height).toBe(`${loopD}px`);
  // Last child = over every ring stroke it passes.
  expect(screen.getByTestId("ring-stack").lastElementChild).toBe(marker);
});

test("marker motion is CSS, so the global reduced-motion rule governs it", () => {
  render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} loop />,
  );
  // No SMIL to gate at mount — the class carries the animation.
  expect(document.querySelectorAll("animate, animateMotion, mpath").length).toBe(0);
  expect(screen.getByTestId("ring-loop-marker").className).toBe("e1-loop-marker");
});

test("summary mode still colors all four rings alike", () => {
  render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} loop />,
  );
  for (const id of ["ring-prompt", "ring-context", "ring-harness", "ring-loop"]) {
    const el = screen.getByTestId(id) as HTMLElement;
    expect(el.getAttribute("data-focal")).toBe("false");
    expect(el.style.border).toContain("rgb(232, 196, 160)");
  }
  // Every ring names itself in the full reveal.
  expect(screen.getByText("the instructions")).toBeInTheDocument();
  expect(screen.getByText("the information")).toBeInTheDocument();
  expect(screen.getByText("the system")).toBeInTheDocument();
  expect(screen.getByText("the repetition")).toBeInTheDocument();
});
