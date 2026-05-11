import { render } from "@testing-library/react";
import { FigLabel } from "@/components/FigLabel";

test("FigLabel renders the canonical FIG <section>.<num> · <label> format", () => {
  const { container } = render(<FigLabel section="I" num={2} label="THE JOURNEY" />);
  const el = container.querySelector(".fig-label") as HTMLElement;
  expect(el).not.toBeNull();
  // Combined text content across child spans should match the canonical format.
  expect(el.textContent).toMatch(/— FIG\. I\.2\s*·\s*THE JOURNEY/);
  // Must include the em-dash prefix per spec §3 row 2.
  expect(el.textContent).toMatch(/^— FIG\./);
});

test("FigLabel uses the .fig-label class for positioning", () => {
  const { container } = render(<FigLabel section="J" num={1} label="THE RECIPE" />);
  const el = container.querySelector(".fig-label") as HTMLElement;
  expect(el).not.toBeNull();
  // Positioning is delegated to the .fig-label CSS class (see globals.css).
  expect(el.className).toContain("fig-label");
});
