import { render, screen, fireEvent } from "@testing-library/react";
import { PracticeCard } from "@/slides/foundation-core-section-e/components/PracticeCard";

const FIXTURE = {
  id: "memory",
  icon: "Brain" as const,
  name: "Memory",
  essence: "self-learning — gotchas stay",
  bullets: ["Captures gotchas during work", "Records what broke, what worked"],
};

test("PracticeCard compact renders icon + name + essence + onSelect", () => {
  const calls: string[] = [];
  render(
    <PracticeCard
      {...FIXTURE}
      expanded={false}
      onSelect={(id) => calls.push(id)}
      onClose={() => {}}
    />,
  );
  expect(screen.getByText("Memory")).toBeInTheDocument();
  expect(screen.getByText(/self-learning/)).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("practice-card-memory"));
  expect(calls).toEqual(["memory"]);
});

test("PracticeCard expanded shows bullets + close button", () => {
  const calls: string[] = [];
  render(
    <PracticeCard
      {...FIXTURE}
      expanded={true}
      onSelect={() => {}}
      onClose={() => calls.push("close")}
    />,
  );
  expect(screen.getAllByTestId(/^practice-bullet-/)).toHaveLength(2);
  fireEvent.click(screen.getByTestId("practice-card-close"));
  expect(calls).toEqual(["close"]);
});

test("PracticeCard kind=orchestration renders HarnessPattern instead of bullets when expanded", () => {
  render(
    <PracticeCard
      id="orchestration"
      icon="Network"
      name="Orchestration"
      essence="pattern + agents + tools"
      bullets={[
        "Main Agent dispatches",
        "Delegate to sub-agents OR call tools direct",
        "Pattern: centralized",
      ]}
      expanded={true}
      onSelect={() => {}}
      onClose={() => {}}
    />,
  );
  expect(screen.getByTestId("harness-pattern-root")).toBeInTheDocument();
});
