import { render, screen } from "@testing-library/react";
import { ImpactLadder } from "@/slides/foundation-core-section-e/components/ImpactLadder";

test("ImpactLadder renders 3 rungs", () => {
  render(<ImpactLadder rungs={3} currentRung={1} />);
  expect(screen.getAllByTestId(/^impact-rung-/)).toHaveLength(3);
});

test("rungs at or below currentRung are lit (data-lit=true)", () => {
  render(<ImpactLadder rungs={3} currentRung={2} />);
  expect(screen.getByTestId("impact-rung-1").getAttribute("data-lit")).toBe("true");
  expect(screen.getByTestId("impact-rung-2").getAttribute("data-lit")).toBe("true");
  expect(screen.getByTestId("impact-rung-3").getAttribute("data-lit")).toBe("false");
});

test("ImpactLadder defaults to mode=number-free (no numeric percentages)", () => {
  render(<ImpactLadder rungs={3} currentRung={3} />);
  // "60", "85", "95" must not appear anywhere — locked per spec.
  for (const banned of ["60%", "85%", "95%"]) {
    expect(screen.queryByText(new RegExp(banned))).toBeNull();
  }
});

test("rung labels match Layer 1 / 2 / 3 vocabulary", () => {
  render(<ImpactLadder rungs={3} currentRung={3} />);
  expect(screen.getByTestId("impact-rung-1").textContent).toMatch(/Layer 1/i);
  expect(screen.getByTestId("impact-rung-2").textContent).toMatch(/Layer 2/i);
  expect(screen.getByTestId("impact-rung-3").textContent).toMatch(/Layer 3/i);
});
