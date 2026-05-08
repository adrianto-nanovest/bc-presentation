import { render, screen } from "@testing-library/react";
import { StructureSpine } from "@/slides/foundation-core-section-e/components/StructureSpine";

const ELEMENTS = [
  { id: "role", num: 1, name: "Role", essence: "Who AI should be", popover: <span>p1</span> },
  { id: "instruction", num: 2, name: "Instruction", essence: "Action to perform + how", popover: <span>p2</span> },
  { id: "output", num: 3, name: "Output Format", essence: "Shape of the result", popover: <span>p3</span> },
  { id: "context", num: 4, name: "Context", essence: "Background + audience", popover: <span>p4</span> },
  { id: "examples", num: 5, name: "Examples", essence: "Show good output", popover: <span>p5</span> },
  { id: "input", num: 6, name: "Input", essence: "Specific data", popover: <span>p6</span> },
] as const;

test("StructureSpine renders 6 element slots", () => {
  render(<StructureSpine elements={ELEMENTS} revealedThrough={6} />);
  expect(screen.getAllByTestId(/^spine-element-/)).toHaveLength(6);
});

test("revealedThrough gates which elements are visible", () => {
  render(<StructureSpine elements={ELEMENTS} revealedThrough={3} />);
  expect(screen.getByTestId("spine-element-1").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("spine-element-3").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("spine-element-4").getAttribute("data-revealed")).toBe("false");
  expect(screen.getByTestId("spine-element-6").getAttribute("data-revealed")).toBe("false");
});

test("each element renders its name + essence", () => {
  render(<StructureSpine elements={ELEMENTS} revealedThrough={6} />);
  expect(screen.getByText("Role")).toBeInTheDocument();
  expect(screen.getByText("Who AI should be")).toBeInTheDocument();
  expect(screen.getByText("Input")).toBeInTheDocument();
});
