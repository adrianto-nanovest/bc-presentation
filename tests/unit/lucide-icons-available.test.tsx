import { render } from "@testing-library/react";
import { MessageSquare, Network, Repeat } from "lucide-react";

test("lucide-react renders the 3 icons we depend on most heavily", () => {
  // Smoke-tests E.6 satellite (MessageSquare), E.10 Orchestration (Network),
  // E.10 Ralph Wiggum (Repeat). If lucide-react is missing, the import fails.
  const { container } = render(
    <div>
      <MessageSquare data-testid="i-message-square" />
      <Network data-testid="i-network" />
      <Repeat data-testid="i-repeat" />
    </div>,
  );
  expect(container.querySelectorAll("svg")).toHaveLength(3);
});
