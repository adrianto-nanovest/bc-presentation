// AutomationLoop — slide D.1 right-column SVG racetrack smoke test.
import { render, screen } from "@testing-library/react";
import { AutomationLoop } from "@/slides/foundation-core/components/AutomationLoop";

test("AutomationLoop renders with data-testid and contains an SVG", () => {
  const { container } = render(<AutomationLoop on={true} />);
  const loop = screen.getByTestId("automation-loop");
  expect(loop).toBeInTheDocument();
  expect(container.querySelector("svg")).not.toBeNull();
});

test("AutomationLoop renders MANUAL/MACHINE rail labels", () => {
  const { container } = render(<AutomationLoop on={true} />);
  expect(container.textContent).toMatch(/MANUAL/);
  expect(container.textContent).toMatch(/MACHINE/);
});
