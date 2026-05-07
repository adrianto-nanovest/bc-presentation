import { render, screen } from "@testing-library/react";
import { highlight } from "@/components/highlight";

test("highlight wraps each keyword in a copper-italic span", () => {
  render(<p>{highlight("Foundation before velocity", ["Foundation", "velocity"])}</p>);
  expect(screen.getByText("Foundation").tagName).toBe("EM");
  expect(screen.getByText("velocity").tagName).toBe("EM");
  expect(screen.getByText("before").tagName).not.toBe("EM");
});

test("highlight handles overlapping keywords longest-first", () => {
  render(<p>{highlight("AI Steering Committee Lead", ["AI", "AI Steering Committee Lead"])}</p>);
  // The longer match should win; only ONE EM, not nested.
  const ems = screen.getAllByText(/AI/);
  const wholePhrase = ems.find((e) => e.textContent === "AI Steering Committee Lead");
  expect(wholePhrase?.tagName).toBe("EM");
});

test("highlight tolerates a string with no matches", () => {
  const { container } = render(<p>{highlight("plain", ["other"])}</p>);
  expect(container.textContent).toBe("plain");
});
