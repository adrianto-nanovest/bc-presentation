import { render, screen } from "@testing-library/react";
import { HexLadder } from "@/primitives/HexLadder";

test("HexLadder renders a swatch for every copper stop and grayscale stop", () => {
  render(<HexLadder />);
  // 11 copper + 12 grayscale (0..950) = 23 swatches
  expect(screen.getAllByTestId("swatch")).toHaveLength(23);
});

test("each swatch displays its hex value as a label so projection comparisons are unambiguous", () => {
  render(<HexLadder />);
  expect(screen.getByText("#b86e3d")).toBeInTheDocument();
  expect(screen.getByText("#0a0a0a")).toBeInTheDocument();
});
