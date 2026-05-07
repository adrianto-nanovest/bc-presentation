import { render, screen } from "@testing-library/react";
import { Timeline } from "@/slides/reveal-and-closing/components/Timeline";

const anchors = [
  { id: "a", label: "Mar 2025", caption: "start" },
  { id: "b", label: "Sep 2025", caption: "first deliverables" },
  { id: "c", label: "Today", caption: "still beginner" },
];

test("Timeline renders an anchor per entry plus an axis", () => {
  render(<Timeline anchors={anchors} segmentLabel="6mo foundation + experiment" anchorsRevealed={3} ambient />);
  expect(screen.getAllByTestId("timeline-anchor")).toHaveLength(3);
  expect(screen.getByTestId("timeline-axis")).toBeInTheDocument();
});

test("Timeline respects anchorsRevealed (only first N anchors are opacity-1)", () => {
  render(<Timeline anchors={anchors} segmentLabel="x" anchorsRevealed={1} ambient={false} />);
  const all = screen.getAllByTestId("timeline-anchor");
  expect(all[0].getAttribute("data-revealed")).toBe("true");
  expect(all[1].getAttribute("data-revealed")).toBe("false");
  expect(all[2].getAttribute("data-revealed")).toBe("false");
});
