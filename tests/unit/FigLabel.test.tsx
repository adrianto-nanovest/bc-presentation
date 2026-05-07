import { render, screen } from "@testing-library/react";
import { FigLabel } from "@/slides/reveal-and-closing/components/FigLabel";

test("FigLabel renders the canonical FIG <section>.<num> · <label> format", () => {
  render(<FigLabel section="I" num={2} label="THE JOURNEY" />);
  const el = screen.getByText(/FIG\. I\.2 · THE JOURNEY/);
  expect(el).toBeInTheDocument();
  // Must include the em-dash prefix per spec §3 row 2.
  expect(el.textContent).toMatch(/^— FIG\./);
});

test("FigLabel sits at the top-left of its host", () => {
  render(<FigLabel section="J" num={1} label="THE RECIPE" />);
  const el = screen.getByText(/FIG\. J\.1/);
  // Container has absolute top-left positioning classes.
  expect(el.className).toMatch(/absolute/);
  expect(el.className).toMatch(/top-/);
  expect(el.className).toMatch(/left-/);
});
