// tests/unit/TechniqueCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { TechniqueCard } from "@/slides/foundation-core-section-e/components/TechniqueCard";

test("TechniqueCard renders title + essence", () => {
  render(
    <TechniqueCard
      id="rag"
      title="RAG"
      essence="Retrieve + ground in docs"
      copper="copper-300"
      onClick={() => {}}
    />,
  );
  expect(screen.getByText("RAG")).toBeInTheDocument();
  expect(screen.getByText("Retrieve + ground in docs")).toBeInTheDocument();
});

test("TechniqueCard fires onClick with id", () => {
  const calls: string[] = [];
  render(
    <TechniqueCard
      id="rag"
      title="RAG"
      essence="Retrieve + ground in docs"
      copper="copper-300"
      onClick={(id) => calls.push(id)}
    />,
  );
  fireEvent.click(screen.getByTestId("technique-card-rag"));
  expect(calls).toEqual(["rag"]);
});

test("TechniqueCard data-copper-stop reflects the tier color", () => {
  render(
    <TechniqueCard
      id="zero-shot"
      title="Zero-Shot"
      essence="Ask once, no examples"
      copper="copper-700"
      onClick={() => {}}
    />,
  );
  expect(screen.getByTestId("technique-card-zero-shot").getAttribute("data-copper-stop")).toBe("copper-700");
});
