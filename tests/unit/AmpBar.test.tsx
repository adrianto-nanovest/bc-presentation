// AmpBar — slide D.1 amplification bar smoke test.
import { render, screen } from "@testing-library/react";
import { AmpBar } from "@/slides/foundation-core/components/AmpBar";

test("AmpBar renders with data-testid and shows label + value", () => {
  render(
    <AmpBar
      label="manual pace"
      value="1×"
      widthPct={1.5}
      on={true}
      accent="copper-700"
    />,
  );
  const bar = screen.getByTestId("amp-bar");
  expect(bar).toBeInTheDocument();
  expect(bar.textContent).toMatch(/manual pace/);
  expect(bar.textContent).toMatch(/1×/);
  expect(bar.getAttribute("data-accent")).toBe("copper-700");
});

test("AmpBar exposes data-tall when tall=true (machine pace bar)", () => {
  render(
    <AmpBar
      label="machine pace"
      value="1,000×"
      widthPct={140}
      on={true}
      accent="copper-300"
      tall
    />,
  );
  const bar = screen.getByTestId("amp-bar");
  expect(bar.getAttribute("data-tall")).toBe("true");
});
