import { render, screen, fireEvent } from "@testing-library/react";
import { HoverReveal } from "@/slides/reveal-and-closing/components/HoverReveal";

test("HoverReveal renders trigger; payload is hidden until hover", () => {
  render(
    <HoverReveal
      trigger={<span data-testid="trig">date</span>}
      payload={<p data-testid="pay">extra info</p>}
    />,
  );
  expect(screen.getByTestId("trig")).toBeInTheDocument();
  // Payload exists in DOM (for layout) but data-revealed=false.
  const payload = screen.getByTestId("hover-payload");
  expect(payload.getAttribute("data-revealed")).toBe("false");
});

test("HoverReveal flips data-revealed on mouseEnter / mouseLeave", () => {
  render(
    <HoverReveal
      trigger={<span data-testid="trig">date</span>}
      payload={<p data-testid="pay">extra info</p>}
    />,
  );
  const root = screen.getByTestId("hover-root");
  fireEvent.mouseEnter(root);
  expect(screen.getByTestId("hover-payload").getAttribute("data-revealed")).toBe(
    "true",
  );
  fireEvent.mouseLeave(root);
  expect(screen.getByTestId("hover-payload").getAttribute("data-revealed")).toBe(
    "false",
  );
});
