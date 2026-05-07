import { render, screen } from "@testing-library/react";
import { LadderTerminal } from "@/slides/foundation-core/components/LadderTerminal";

test("LadderTerminal renders abbreviation + sub-line and exposes its altitude tier", () => {
  render(
    <LadderTerminal
      abbrev="BPM"
      subLine="Redesign + integrate. The foundation everything else stands on."
      altitudeTier={1}
      hoverExample="Example: cut a 20-step approval flow to 8 steps before automating any of it."
    />,
  );
  expect(screen.getByText("BPM")).toBeInTheDocument();
  expect(screen.getByText(/Redesign \+ integrate/)).toBeInTheDocument();
  const root = screen.getByTestId("ladder-terminal");
  expect(root.getAttribute("data-altitude-tier")).toBe("1");
});
