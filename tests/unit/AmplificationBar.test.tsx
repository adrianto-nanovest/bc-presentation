import { render, screen } from "@testing-library/react";
import { AmplificationBar } from "@/slides/foundation-core/components/AmplificationBar";

test("AmplificationBar renders the label, counter, and bar element", () => {
  render(
    <AmplificationBar
      fromPct={0}
      toPct={18}
      counterTo={1}
      offFrame={false}
      label="manual pace"
    />,
  );
  expect(screen.getByText(/manual pace/)).toBeInTheDocument();
  expect(screen.getByTestId("amplification-bar-fill")).toBeInTheDocument();
  expect(screen.getByTestId("amplification-bar-counter")).toBeInTheDocument();
});

test("AmplificationBar marks the off-frame glow region only when offFrame=true", () => {
  const { rerender } = render(
    <AmplificationBar fromPct={0} toPct={18} counterTo={1} offFrame={false} label="manual pace" />,
  );
  expect(screen.queryByTestId("amplification-offframe-glow")).toBeNull();

  rerender(
    <AmplificationBar fromPct={0} toPct={140} counterTo={1000} offFrame label="machine pace" />,
  );
  expect(screen.getByTestId("amplification-offframe-glow")).toBeInTheDocument();
});

test("AmplificationBar exposes target widths via data attributes", () => {
  render(<AmplificationBar fromPct={0} toPct={140} counterTo={1000} offFrame label="machine pace" />);
  const fill = screen.getByTestId("amplification-bar-fill");
  expect(fill.getAttribute("data-from-pct")).toBe("0");
  expect(fill.getAttribute("data-to-pct")).toBe("140");
});
