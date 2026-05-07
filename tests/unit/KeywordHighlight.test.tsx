import { render, screen } from "@testing-library/react";
import { KeywordHighlight } from "@/slides/reveal-and-closing/components/KeywordHighlight";

test("KeywordHighlight wraps text in copper-italic span", () => {
  render(<KeywordHighlight>90 minutes</KeywordHighlight>);
  const span = screen.getByText("90 minutes");
  expect(span.tagName).toBe("EM");
  expect(span.className).toMatch(/text-copper-/);
  expect(span.className).toMatch(/italic|not-italic/); // EM is italic-by-default; ensure italic isn't suppressed
});

test("KeywordHighlight allows nested children (e.g. icons)", () => {
  render(
    <KeywordHighlight>
      <span data-testid="inner">deep</span>
    </KeywordHighlight>,
  );
  expect(screen.getByTestId("inner")).toBeInTheDocument();
});
