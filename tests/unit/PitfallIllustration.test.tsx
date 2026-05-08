import { render, screen } from "@testing-library/react";
import { PitfallIllustration } from "@/slides/foundation-core-section-e/components/PitfallIllustration";

test("PitfallIllustration default kind renders the default canvas wrapper", () => {
  render(<PitfallIllustration kind="default" />);
  expect(screen.getByTestId("pitfall-illustration").getAttribute("data-kind")).toBe("default");
});

test("conflict variant exposes the Venn frozen-overlap caption", () => {
  render(<PitfallIllustration kind="conflict" />);
  expect(screen.getByTestId("pitfall-illustration").getAttribute("data-kind")).toBe("conflict");
  expect(screen.getByText(/commits early/)).toBeInTheDocument();
});

test("confusion variant exposes the iceberg caption", () => {
  render(<PitfallIllustration kind="confusion" />);
  expect(screen.getByText(/what you wanted/i)).toBeInTheDocument();
});

test("poisoning variant exposes the compounds caption", () => {
  render(<PitfallIllustration kind="poisoning" />);
  expect(screen.getByText(/compounds/)).toBeInTheDocument();
});

test("distraction variant exposes the dumb-zone caption", () => {
  render(<PitfallIllustration kind="distraction" />);
  expect(screen.getByText(/dumb zone/i)).toBeInTheDocument();
});
