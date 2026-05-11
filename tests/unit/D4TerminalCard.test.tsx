// D4TerminalCard — slide D.4 right-column terminal card smoke test.
import { render, screen } from "@testing-library/react";
import { D4TerminalCard } from "@/slides/foundation-core/components/D4TerminalCard";
import { d4Content } from "@/slides/foundation-core/content";

test("D4TerminalCard renders with abbrev + data-terminal-key", () => {
  render(
    <D4TerminalCard
      abbrev="RPA"
      terminal={d4Content.terminals.RPA}
      qNum={3}
      branch="YES"
      isHover={false}
      on={true}
      onHoverEnter={() => {}}
      onHoverLeave={() => {}}
    />,
  );
  const card = screen.getByTestId("d4-terminal-card");
  expect(card).toBeInTheDocument();
  expect(card.getAttribute("data-terminal-key")).toBe("RPA");
  // Abbrev text + sub copy render.
  expect(card.textContent).toMatch(/RPA/);
  expect(card.textContent).toMatch(d4Content.terminals.RPA.sub);
  // Q number + branch render.
  expect(card.textContent).toMatch(/Q3/);
  expect(card.textContent).toMatch(/YES/);
});

test("D4TerminalCard reflects on=false via data-on", () => {
  render(
    <D4TerminalCard
      abbrev="STOP"
      terminal={d4Content.terminals.STOP}
      qNum={1}
      branch="NO"
      isHover={false}
      on={false}
      onHoverEnter={() => {}}
      onHoverLeave={() => {}}
    />,
  );
  const card = screen.getByTestId("d4-terminal-card");
  expect(card.getAttribute("data-on")).toBe("false");
});
