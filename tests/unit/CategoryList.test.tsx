import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryList, type ListEntry } from "@/slides/reveal-and-closing/components/CategoryList";

const items: ListEntry[] = [
  { kind: "header", label: "HARNESSES" },
  { kind: "subheader", label: "Workflows" },
  { kind: "item", id: "stocks-intel", label: "stocks intel", weight: "heavy" },
  { kind: "header", label: "TOOLS" },
  { kind: "item", id: "sonarqube", label: "Sonarqube", weight: "light" },
];

test("CategoryList renders all entries", () => {
  render(<CategoryList items={items} selectedId={null} onSelect={() => {}} revealedHeaders={2} />);
  expect(screen.getByText("HARNESSES")).toBeInTheDocument();
  expect(screen.getByText("Workflows")).toBeInTheDocument();
  expect(screen.getByText("stocks intel")).toBeInTheDocument();
  expect(screen.getByText("TOOLS")).toBeInTheDocument();
  expect(screen.getByText("Sonarqube")).toBeInTheDocument();
});

test("CategoryList fires onSelect with the item id", () => {
  const onSelect = vi.fn();
  render(<CategoryList items={items} selectedId={null} onSelect={onSelect} revealedHeaders={2} />);
  fireEvent.click(screen.getByText("stocks intel"));
  expect(onSelect).toHaveBeenCalledWith("stocks-intel");
});

test("CategoryList marks the selected id with data-active=true", () => {
  render(<CategoryList items={items} selectedId="sonarqube" onSelect={() => {}} revealedHeaders={2} />);
  const stocks = screen.getByText("stocks intel").closest("button")!;
  const sonar = screen.getByText("Sonarqube").closest("button")!;
  expect(stocks.getAttribute("data-active")).toBe("false");
  expect(sonar.getAttribute("data-active")).toBe("true");
});

test("CategoryList hides headers above the revealedHeaders threshold", () => {
  render(<CategoryList items={items} selectedId={null} onSelect={() => {}} revealedHeaders={1} />);
  // First HARNESSES header (index 0) is revealed; second TOOLS header (index 1) is not.
  const headers = screen.getAllByTestId("category-header");
  expect(headers[0].getAttribute("data-revealed")).toBe("true");
  expect(headers[1].getAttribute("data-revealed")).toBe("false");
});
