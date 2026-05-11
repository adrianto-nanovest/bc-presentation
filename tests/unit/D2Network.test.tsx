// D2Network — slide D.2 right-column network illustration smoke test.
import { render, screen } from "@testing-library/react";
import { D2Network } from "@/slides/foundation-core/components/D2Network";
import { d2Content } from "@/slides/foundation-core/content";

test("D2Network renders with data-testid", () => {
  render(<D2Network on={false} hovered={null} cards={d2Content.cards} />);
  expect(screen.getByTestId("d2-network")).toBeInTheDocument();
});

test("D2Network renders a phase machine starting at 0 when on=false", () => {
  render(<D2Network on={false} hovered={null} cards={d2Content.cards} />);
  const net = screen.getByTestId("d2-network");
  expect(net.getAttribute("data-phase")).toBe("0");
});
