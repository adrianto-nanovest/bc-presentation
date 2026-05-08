// tests/unit/LayerCard.test.tsx
import { render, screen } from "@testing-library/react";
import { LayerCard } from "@/slides/foundation-core-section-e/components/LayerCard";

test("LayerCard renders label + essence", () => {
  render(
    <LayerCard
      layer="prompt"
      mode="focal"
      label="PROMPT"
      essence="the instructions"
      essenceKeywords={["instructions"]}
    />,
  );
  expect(screen.getByText("PROMPT")).toBeInTheDocument();
  expect(screen.getByText(/instructions/)).toBeInTheDocument();
});

test("LayerCard data attributes reflect mode + layer", () => {
  render(
    <LayerCard
      layer="context"
      mode="nested"
      label="CONTEXT"
      essence="the information"
      essenceKeywords={["information"]}
    />,
  );
  expect(screen.getByTestId("layer-card-context").getAttribute("data-mode")).toBe("nested");
  expect(screen.getByTestId("layer-card-context").getAttribute("data-layer")).toBe("context");
});

test("LayerCard accepts a focal-mode child slot for the demo content", () => {
  render(
    <LayerCard
      layer="harness"
      mode="focal"
      label="HARNESS"
      essence="the system"
      essenceKeywords={["system"]}
    >
      <div data-testid="layer-demo-host">demo</div>
    </LayerCard>,
  );
  expect(screen.getByTestId("layer-demo-host")).toBeInTheDocument();
});
