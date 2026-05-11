// D2DetailPanel — slide D.2 step-0 right-column detail panel smoke test.
import { render, screen } from "@testing-library/react";
import { D2DetailPanel } from "@/slides/foundation-core/components/D2DetailPanel";
import { d2Content } from "@/slides/foundation-core/content";

test("D2DetailPanel renders nothing when data is null (blank-by-default)", () => {
  const { container } = render(<D2DetailPanel data={null} />);
  expect(container.firstChild).toBeNull();
});

test("D2DetailPanel shows tagline + bullets + analogy when given a card", () => {
  const card = d2Content.cards.find((c) => c.key === "ipa")!;
  render(<D2DetailPanel data={card} />);
  const panel = screen.getByTestId("d2-detail-panel");
  expect(panel).toBeInTheDocument();
  expect(panel.getAttribute("data-key")).toBe("ipa");
  // Tagline + first bullet should appear.
  expect(panel.textContent).toMatch(card.tagline);
  expect(panel.textContent).toMatch(card.bullets[0]);
  // Analogy block (from data) renders.
  expect(panel.textContent).toMatch(/Analogy/i);
});
