import { render, screen } from "@testing-library/react";
import { LevelCard } from "@/slides/foundation-core/components/LevelCard";

const baseProps = {
  level: "bpm" as const,
  ask: "Where's the waste?",
  askKeywords: ["waste"],
  doText: "Redesign report scope",
  doKeywords: [],
  outcome: "Fewer reports; clearer signal.",
  glyph: <div data-testid="bpm-glyph-stub" />,
  convergedTagline: "The GPS for operations",
  convergedTaglineKeywords: ["GPS"],
  convergedBullets: ["a", "b", "c"],
  convergedCopperStop: "copper-700" as const,
  convergedTitle: "BPM",
  convergedSubName: "Business Process Management",
};

test("LevelCard mode=focal renders full content + glyph", () => {
  render(<LevelCard {...baseProps} mode="focal" position="center" />);
  const root = screen.getByTestId("level-card");
  expect(root.getAttribute("data-mode")).toBe("focal");
  expect(root.getAttribute("data-level")).toBe("bpm");
  expect(screen.getByText(/Where's the/)).toBeInTheDocument();
  expect(screen.getByText(/Redesign report scope/)).toBeInTheDocument();
  expect(screen.getByText(/Fewer reports/)).toBeInTheDocument();
  expect(screen.getByTestId("bpm-glyph-stub")).toBeInTheDocument();
});

test("LevelCard mode=filed renders compact summary only (number + abbrev + outcome)", () => {
  render(<LevelCard {...baseProps} mode="filed" position="bpm-tl" />);
  const root = screen.getByTestId("level-card");
  expect(root.getAttribute("data-mode")).toBe("filed");
  expect(screen.getByText("BPM")).toBeInTheDocument();
  expect(screen.getByText(/Fewer reports/)).toBeInTheDocument();
  expect(screen.queryByText(/Redesign report scope/)).toBeNull();
});

test("LevelCard mode=converged renders same shape as ConvergenceCard via internal composition", () => {
  render(<LevelCard {...baseProps} mode="converged" position="bpm-tl" />);
  const root = screen.getByTestId("level-card");
  expect(root.getAttribute("data-mode")).toBe("converged");
  expect(root.getAttribute("data-position")).toBe("bpm-tl");
  expect(screen.getByText(/GPS/)).toBeInTheDocument();
  expect(screen.getByText("a")).toBeInTheDocument();
});
