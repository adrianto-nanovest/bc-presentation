import { render, screen } from "@testing-library/react";
import { NanovestProduct } from "@/slides/reveal-and-closing/simulations/NanovestProduct";

test("NanovestProduct renders the named sub-agents and the parallel flowchart fan-out", () => {
  render(<NanovestProduct />);
  // "draft-agent" (anchored) avoids collision with "draft-reviewer"
  [
    { pattern: /brainstorm/i },
    { pattern: /research/i },
    { pattern: /plan-reviewer/i },
    { pattern: /^draft-agent$/i },
    { pattern: /draft-reviewer/i },
    { pattern: /validate/i },
    { pattern: /Figma/i },
  ].forEach(({ pattern }) =>
    expect(screen.getByText(pattern)).toBeInTheDocument(),
  );
  ["Mermaid", "Excalidraw", "Draw.io"].forEach((tool) =>
    expect(screen.getByText(tool)).toBeInTheDocument(),
  );
});

test("NanovestProduct names the three publish targets", () => {
  render(<NanovestProduct />);
  ["Confluence", "Jira", "GDrive"].forEach((target) =>
    expect(screen.getByText(target)).toBeInTheDocument(),
  );
});
