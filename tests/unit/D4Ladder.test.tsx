// D4Ladder — slide D.4 left-column decision-tree ladder smoke test.
import { render, screen } from "@testing-library/react";
import { D4Ladder } from "@/slides/foundation-core/components/D4Ladder";
import { d4Content } from "@/slides/foundation-core/content";

test("D4Ladder renders with data-testid + 5 rungs", () => {
  render(
    <D4Ladder
      questions={d4Content.questions}
      revealed={5}
      terminalHover={null}
    />,
  );
  expect(screen.getByTestId("d4-ladder")).toBeInTheDocument();
  const rungs = screen.getAllByTestId("d4-rung");
  expect(rungs).toHaveLength(5);
});

test("D4Ladder data-revealed attr reflects the revealed prop", () => {
  render(
    <D4Ladder
      questions={d4Content.questions}
      revealed={3}
      terminalHover={null}
    />,
  );
  const ladder = screen.getByTestId("d4-ladder");
  expect(ladder.getAttribute("data-revealed")).toBe("3");
});
