import { render, screen } from "@testing-library/react";
import { PitfallCanvas } from "@/slides/foundation-core-section-e/components/PitfallCanvas";

test("PitfallCanvas renders nothing when activeKind is null", () => {
  const { container } = render(<PitfallCanvas activeKind={null} />);
  expect(container.firstChild).toBeNull();
});

test("PitfallCanvas renders the conflict anim + caption when activeKind=conflict", () => {
  render(<PitfallCanvas activeKind="conflict" />);
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe("conflict");
  expect(screen.getByTestId("pit-anim-conflict")).toBeInTheDocument();
  expect(screen.getByTestId("pit-caption-conflict")).toBeInTheDocument();
});

test("PitfallCanvas renders the poisoning anim + caption when activeKind=poisoning", () => {
  render(<PitfallCanvas activeKind="poisoning" />);
  expect(screen.getByTestId("pitfall-canvas").getAttribute("data-active")).toBe("poisoning");
  expect(screen.getByTestId("pit-anim-poisoning")).toBeInTheDocument();
});
