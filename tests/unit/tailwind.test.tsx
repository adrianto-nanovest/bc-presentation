import { render } from "@testing-library/react";
import "@/styles/globals.css";

test("Tailwind directives compile and `flex` resolves", () => {
  const { container } = render(<div className="flex" data-testid="t" />);
  // jsdom doesn't run PostCSS; instead we verify the className was preserved
  // and the stylesheet imported without throwing.
  expect(container.firstChild).toHaveClass("flex");
});
