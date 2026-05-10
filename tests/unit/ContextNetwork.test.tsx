import { render, screen } from "@testing-library/react";
import {
  ContextNetwork,
  type SatelliteSpec,
} from "@/slides/foundation-core-section-e/components/ContextNetwork";

const SATS: SatelliteSpec[] = [
  { id: "user-prompt", label: "User Prompt", icon: "MessageSquare" },
  { id: "conv-mem", label: "Conversation Memory", icon: "History" },
  { id: "rag", label: "RAG Knowledge", icon: "BookOpen" },
  { id: "tools", label: "Tools & APIs", icon: "Wrench" },
  { id: "persist", label: "Persistent Memory", icon: "Archive" },
  { id: "system", label: "System Instructions", icon: "Shield" },
];

test("renders six satellites and one hub during reveal phase", () => {
  render(
    <ContextNetwork
      satellites={SATS}
      hubX={382}
      hubY={222}
      rx={300}
      ry={170}
      phase="reveal"
    />,
  );
  expect(screen.getAllByTestId(/^context-network-sat-/)).toHaveLength(6);
  expect(screen.getByTestId("context-network-hub")).toBeInTheDocument();
  expect(screen.getByTestId("context-network-svg")).toBeInTheDocument();
});

test("phase data attribute updates with prop", () => {
  const { rerender } = render(
    <ContextNetwork
      satellites={SATS}
      hubX={382}
      hubY={222}
      rx={300}
      ry={170}
      phase="idle"
    />,
  );
  expect(screen.getByTestId("context-network").getAttribute("data-phase")).toBe("idle");
  rerender(
    <ContextNetwork
      satellites={SATS}
      hubX={382}
      hubY={222}
      rx={300}
      ry={170}
      phase="flow"
    />,
  );
  expect(screen.getByTestId("context-network").getAttribute("data-phase")).toBe("flow");
});

test("hub label defaults to CONTEXT and is overrideable", () => {
  const { rerender } = render(
    <ContextNetwork
      satellites={SATS}
      hubX={382}
      hubY={222}
      rx={300}
      ry={170}
      phase="hub"
    />,
  );
  expect(screen.getByTestId("context-network-hub").textContent).toBe("CONTEXT");
  rerender(
    <ContextNetwork
      satellites={SATS}
      hubX={382}
      hubY={222}
      rx={300}
      ry={170}
      phase="hub"
      hubLabel="HUB"
    />,
  );
  expect(screen.getByTestId("context-network-hub").textContent).toBe("HUB");
});

test("hovered satellite gains active class via hoveredIndex", () => {
  render(
    <ContextNetwork
      satellites={SATS}
      hubX={382}
      hubY={222}
      rx={300}
      ry={170}
      phase="reveal"
      hoveredIndex={2}
    />,
  );
  expect(
    screen.getByTestId("context-network-sat-rag").className,
  ).toContain("active");
  expect(
    screen.getByTestId("context-network-sat-tools").className,
  ).not.toContain("active");
});
