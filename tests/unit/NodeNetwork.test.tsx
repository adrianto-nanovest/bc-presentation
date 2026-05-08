import { render, screen } from "@testing-library/react";
import { NodeNetwork } from "@/slides/foundation-core-section-e/components/NodeNetwork";

const SATS = [
  { id: "user-prompt", label: "User Prompt", icon: "MessageSquare" as const },
  { id: "system", label: "System Instructions", icon: "Shield" as const },
  { id: "conv-mem", label: "Conversation Memory", icon: "History" as const },
  { id: "rag", label: "RAG Knowledge Base", icon: "BookOpen" as const },
  { id: "tools", label: "Tools & APIs", icon: "Wrench" as const },
  { id: "persist", label: "Persistent Memory", icon: "Archive" as const },
];

test("NodeNetwork renders 6 satellites + 1 center hub", () => {
  render(<NodeNetwork variant="context-hub" state="activated" centerNode="CONTEXT" satellites={SATS} play={false} />);
  expect(screen.getAllByTestId(/^node-satellite-/)).toHaveLength(6);
  expect(screen.getByTestId("node-hub")).toBeInTheDocument();
});

test("hub label reflects centerNode prop", () => {
  render(<NodeNetwork variant="context-hub" state="activated" centerNode="CONTEXT" satellites={SATS} play={false} />);
  expect(screen.getByTestId("node-hub").textContent).toMatch(/CONTEXT/);
});

test("state=stamped exposes data-state and renders the STILL MANUAL stamp", () => {
  render(<NodeNetwork variant="context-hub" state="stamped" centerNode="CONTEXT" satellites={SATS} play={false} />);
  expect(screen.getByTestId("node-network-root").getAttribute("data-state")).toBe("stamped");
  expect(screen.getByTestId("node-still-manual-stamp")).toBeInTheDocument();
});

test("state=compressed hides individual satellites and renders harness silhouette", () => {
  render(<NodeNetwork variant="context-hub" state="compressed" centerNode="CONTEXT" satellites={SATS} play={false} />);
  expect(screen.getByTestId("node-network-root").getAttribute("data-state")).toBe("compressed");
  for (const s of SATS) {
    expect(screen.getByTestId(`node-satellite-${s.id}`).getAttribute("data-compressed")).toBe("true");
  }
});

test("each satellite renders its label", () => {
  render(<NodeNetwork variant="context-hub" state="activated" centerNode="CONTEXT" satellites={SATS} play={false} />);
  expect(screen.getByText("User Prompt")).toBeInTheDocument();
  expect(screen.getByText("Tools & APIs")).toBeInTheDocument();
});
