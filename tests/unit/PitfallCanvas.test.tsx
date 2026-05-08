import { render, screen } from "@testing-library/react";
import { PitfallCanvas } from "@/slides/foundation-core-section-e/components/PitfallCanvas";

test("PitfallCanvas defaults to rendering the slide-provided default illustration", () => {
  render(<PitfallCanvas activeKind={null} defaultIllustration={<div data-testid="net-fallback" />} />);
  expect(screen.getByTestId("net-fallback")).toBeInTheDocument();
});

test("PitfallCanvas renders the activeKind illustration when set", () => {
  render(<PitfallCanvas activeKind="conflict" defaultIllustration={<div data-testid="net-fallback" />} />);
  expect(screen.getByTestId("pitfall-illustration").getAttribute("data-kind")).toBe("conflict");
});

test("PitfallCanvas exposes data-active for testing", () => {
  const { rerender } = render(<PitfallCanvas activeKind={null} defaultIllustration={<div />} />);
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe("default");
  rerender(<PitfallCanvas activeKind="poisoning" defaultIllustration={<div />} />);
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe("poisoning");
});
