import { render } from "@testing-library/react";
import { LucideIcon } from "@/slides/foundation-core-section-e/components/LucideIcon";

test("renders an svg for a known icon name", () => {
  const { container } = render(<LucideIcon name="GitMerge" />);
  expect(container.querySelector("svg")).not.toBeNull();
});

test("renders nothing for an unknown icon name", () => {
  const { container } = render(<LucideIcon name="DoesNotExist" />);
  expect(container.firstChild).toBeNull();
});

test("applies size and className props", () => {
  const { container } = render(
    <LucideIcon name="Network" size={32} className="custom-icon" />,
  );
  const svg = container.querySelector("svg");
  expect(svg).not.toBeNull();
  expect(svg?.getAttribute("width")).toBe("32");
  expect(svg?.classList.contains("custom-icon")).toBe(true);
});
