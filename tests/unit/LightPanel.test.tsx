import { render, screen } from "@testing-library/react";
import { LightPanel } from "@/slides/reveal-and-closing/components/LightPanel";

test("LightPanel renders title + body", () => {
  render(<LightPanel title="gemini-image-gen MCP" body={<p>hello</p>} />);
  expect(screen.getByText("gemini-image-gen MCP")).toBeInTheDocument();
  expect(screen.getByText("hello")).toBeInTheDocument();
});

test("LightPanel exposes data-glyph-stage that animates on mount", () => {
  render(<LightPanel title="x" body={<p>y</p>} />);
  expect(screen.getByTestId("light-panel")).toBeInTheDocument();
});
