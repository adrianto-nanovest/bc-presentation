import { render, screen } from "@testing-library/react";
import { HorizontalFlow } from "@/slides/reveal-and-closing/components/HorizontalFlow";

const stages = [
  { num: 1, label: "Research", sub: "deep-dives" },
  { num: 2, label: "Brainstorm", sub: "structure" },
  { num: 3, label: "Design", sub: "tokens" },
];

test("HorizontalFlow renders one tile per stage with the connector count = stages.length - 1", () => {
  render(<HorizontalFlow stages={stages} revealed ambient />);
  expect(screen.getAllByTestId("flow-stage")).toHaveLength(3);
  expect(screen.getAllByTestId("flow-connector")).toHaveLength(2);
});

test("HorizontalFlow respects the revealed flag (hides everything when false)", () => {
  render(<HorizontalFlow stages={stages} revealed={false} ambient={false} />);
  // Stages still render in DOM for layout but are opacity-0.
  expect(screen.getAllByTestId("flow-stage")).toHaveLength(3);
  const wrapper = screen.getByTestId("flow-wrapper");
  expect(wrapper.getAttribute("data-revealed")).toBe("false");
});
