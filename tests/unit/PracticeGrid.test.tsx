import { render, screen, fireEvent } from "@testing-library/react";
import { PracticeGrid } from "@/slides/foundation-core-section-e/components/PracticeGrid";

const PRACTICES = [
  { id: "orchestration", icon: "Network" as const, name: "Orchestration", essence: "pattern + agents + tools", bullets: ["a", "b", "c"] },
  { id: "plugins", icon: "Package" as const, name: "Plugins", essence: "packaged: subagents, skills, hooks, MCP", bullets: ["a", "b"] },
  { id: "memory", icon: "Brain" as const, name: "Memory", essence: "self-learning — gotchas stay", bullets: ["a", "b"] },
  { id: "observability", icon: "Activity" as const, name: "Observability", essence: "every decision auditable", bullets: ["a", "b"] },
  { id: "triggers", icon: "Zap" as const, name: "Triggers", essence: "manual, schedule, or event", bullets: ["a", "b"] },
  { id: "spec-driven", icon: "FileText" as const, name: "Spec-driven", essence: "spec = source of truth", bullets: ["a", "b"] },
  { id: "hitl", icon: "Users" as const, name: "HITL", essence: "approval at key steps", bullets: ["a", "b"] },
  { id: "ralph", icon: "Repeat" as const, name: "Ralph Wiggum", essence: "autonomous loop until done", bullets: ["a", "b"] },
];

test("PracticeGrid renders 8 cards in default state", () => {
  render(<PracticeGrid practices={PRACTICES} />);
  expect(screen.getAllByTestId(/^practice-card-/)).toHaveLength(8);
  for (const p of PRACTICES) {
    expect(screen.getByTestId(`practice-card-${p.id}`).getAttribute("data-expanded")).toBe("false");
  }
});

test("clicking a card expands it; click × restores grid", () => {
  render(<PracticeGrid practices={PRACTICES} />);
  fireEvent.click(screen.getByTestId("practice-card-memory"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("true");

  fireEvent.click(screen.getByTestId("practice-card-close"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("false");
});

test("clicking a different card swaps expansion (single transition)", () => {
  render(<PracticeGrid practices={PRACTICES} />);
  fireEvent.click(screen.getByTestId("practice-card-memory"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("true");
  fireEvent.click(screen.getByTestId("practice-card-triggers"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("false");
  expect(screen.getByTestId("practice-card-triggers").getAttribute("data-expanded")).toBe("true");
});

test("clicking outside the expanded card closes it", () => {
  render(<PracticeGrid practices={PRACTICES} />);
  fireEvent.click(screen.getByTestId("practice-card-memory"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("true");
  fireEvent.click(screen.getByTestId("practice-grid-outside"));
  expect(screen.getByTestId("practice-card-memory").getAttribute("data-expanded")).toBe("false");
});
