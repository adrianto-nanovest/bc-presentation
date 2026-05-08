import { render, screen, fireEvent } from "@testing-library/react";
import { HoverPopover } from "@/slides/foundation-core-section-e/components/HoverPopover";

test("HoverPopover hides payload by default", () => {
  render(
    <HoverPopover
      trigger={<button>trigger</button>}
      payload={<p>popover-content</p>}
    />,
  );
  const payload = screen.getByTestId("hover-popover-payload");
  expect(payload.getAttribute("data-revealed")).toBe("false");
});

test("HoverPopover reveals payload on mouse enter", () => {
  render(
    <HoverPopover
      trigger={<button data-testid="trig">trigger</button>}
      payload={<p>popover-content</p>}
    />,
  );
  fireEvent.mouseEnter(screen.getByTestId("hover-popover-root"));
  expect(screen.getByTestId("hover-popover-payload").getAttribute("data-revealed")).toBe("true");
});

test("HoverPopover renders the explicit position class when provided", () => {
  render(
    <HoverPopover
      trigger={<span>x</span>}
      payload={<p>p</p>}
      position="right"
    />,
  );
  expect(screen.getByTestId("hover-popover-payload").getAttribute("data-position")).toBe("right");
});
