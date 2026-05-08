// tests/unit/TechniqueModal.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { TechniqueModal } from "@/slides/foundation-core-section-e/components/TechniqueModal";

const FIXTURE = {
  id: "rag",
  title: "RAG",
  layerAnnotation: "Layer 2",
  bullets: [
    { label: "Best for", body: "questions about your data · recent events" },
    { label: "Example", body: "Using our knowledge base: search for 'remote work policy'." },
    { label: "Trade-off", body: "needs retrieval setup; grounds answers in real sources" },
  ],
};

test("TechniqueModal hidden when open=false", () => {
  render(<TechniqueModal {...FIXTURE} open={false} onClose={() => {}} />);
  expect(screen.queryByTestId(`technique-modal-${FIXTURE.id}`)).toBeNull();
});

test("TechniqueModal renders title + layer annotation + bullets when open", () => {
  render(<TechniqueModal {...FIXTURE} open onClose={() => {}} />);
  expect(screen.getByText("RAG")).toBeInTheDocument();
  expect(screen.getByText(/Layer 2/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^technique-bullet-/)).toHaveLength(3);
});

test("TechniqueModal close button fires onClose", () => {
  const calls: number[] = [];
  render(<TechniqueModal {...FIXTURE} open onClose={() => calls.push(1)} />);
  fireEvent.click(screen.getByTestId("technique-modal-close"));
  expect(calls).toEqual([1]);
});

test("TechniqueModal backdrop click fires onClose", () => {
  const calls: number[] = [];
  render(<TechniqueModal {...FIXTURE} open onClose={() => calls.push(1)} />);
  fireEvent.click(screen.getByTestId("technique-modal-backdrop"));
  expect(calls).toEqual([1]);
});
