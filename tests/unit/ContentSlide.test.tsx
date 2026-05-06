import { render, screen } from "@testing-library/react";
import { ContentSlide } from "@/primitives/ContentSlide";
import { QuoteSlide } from "@/primitives/QuoteSlide";

test("ContentSlide renders heading and bullets", () => {
  render(
    <ContentSlide
      heading="Three layers"
      bullets={["Prompt", "Context", "Harness"]}
    />,
  );
  expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
    "Three layers",
  );
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("ContentSlide enforces spec density limit of 6 bullets max", () => {
  expect(() =>
    render(
      <ContentSlide
        heading="x"
        bullets={["1", "2", "3", "4", "5", "6", "7"]}
      />,
    ),
  ).toThrow(/max 6 bullets/i);
});

test("QuoteSlide renders quote and attribution", () => {
  render(
    <QuoteSlide
      quote="AI is the bridge from where you are to wherever you need to be."
      attribution="The throughline"
    />,
  );
  expect(screen.getByText(/AI is the bridge/)).toBeInTheDocument();
  expect(screen.getByText("The throughline")).toBeInTheDocument();
});
