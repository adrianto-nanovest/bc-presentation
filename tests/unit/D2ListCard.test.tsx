// D2ListCard — slide D.2 left-column compact card smoke test.
import { render, screen } from "@testing-library/react";
import { D2ListCard } from "@/slides/foundation-core/components/D2ListCard";
import { d2Content } from "@/slides/foundation-core/content";

test("D2ListCard renders with data-testid + data-key", () => {
  const card = d2Content.cards.find((c) => c.key === "bpm")!;
  render(
    <D2ListCard data={card} hovered={null} onHover={() => {}} />,
  );
  const el = screen.getByTestId("d2-list-card");
  expect(el).toBeInTheDocument();
  expect(el.getAttribute("data-key")).toBe("bpm");
  // Title + tagline render.
  expect(el.textContent).toMatch(/BPM/);
  expect(el.textContent).toMatch(/GPS/);
});

test("D2ListCard reflects hovered state via data-hovered", () => {
  const card = d2Content.cards.find((c) => c.key === "ipa")!;
  render(<D2ListCard data={card} hovered="ipa" onHover={() => {}} />);
  const el = screen.getByTestId("d2-list-card");
  expect(el.getAttribute("data-hovered")).toBe("true");
});
