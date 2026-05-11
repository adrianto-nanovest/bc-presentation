// D3LevelCard — slide D.3 column smoke test.
import { render, screen } from "@testing-library/react";
import { D3LevelCard } from "@/slides/foundation-core/components/D3LevelCard";
import { d3Content } from "@/slides/foundation-core/content";

test("D3LevelCard renders with data-testid + data-level", () => {
  const level = d3Content.levels[0]; // bpm
  render(
    <D3LevelCard
      level={level}
      index={0}
      focused={false}
      hovered={false}
      revealed={true}
    >
      <div data-testid="anim-slot" />
    </D3LevelCard>,
  );
  const el = screen.getByTestId("d3-level-card");
  expect(el).toBeInTheDocument();
  expect(el.getAttribute("data-level")).toBe("bpm");
  expect(el.getAttribute("data-revealed")).toBe("true");
  // Animation slot child renders inside the card.
  expect(screen.getByTestId("anim-slot")).toBeInTheDocument();
});

test("D3LevelCard reflects focused/hovered state via data-* attrs", () => {
  const level = d3Content.levels[2]; // ipa
  render(
    <D3LevelCard
      level={level}
      index={2}
      focused={true}
      hovered={false}
      revealed={true}
    >
      <span />
    </D3LevelCard>,
  );
  const el = screen.getByTestId("d3-level-card");
  expect(el.getAttribute("data-focused")).toBe("true");
  expect(el.getAttribute("data-hovered")).toBe("false");
  // ASK and OUTCOME copy renders.
  expect(el.textContent).toMatch(level.ask);
  expect(el.textContent).toMatch(/Insight/);
});
