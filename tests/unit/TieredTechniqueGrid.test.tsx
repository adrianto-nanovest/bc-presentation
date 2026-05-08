// tests/unit/TieredTechniqueGrid.test.tsx
import { render, screen } from "@testing-library/react";
import { TieredTechniqueGrid } from "@/slides/foundation-core-section-e/components/TieredTechniqueGrid";

const TIERS = [
  { id: "basic", label: "BASIC", copper: "copper-700" as const, cards: [
    { id: "zero-shot", title: "Zero-Shot", essence: "Ask once, no examples" },
    { id: "few-shot", title: "Few-Shot", essence: "Show 2–3 examples" },
    { id: "cot", title: "Chain-of-Thought", essence: "Think step by step" },
  ]},
  { id: "inter", label: "INTERMEDIATE", copper: "copper-500" as const, cards: [
    { id: "self-cons", title: "Self-Consistency", essence: "Multiple paths, consensus" },
    { id: "tot", title: "Tree of Thoughts", essence: "Branch decision paths" },
  ]},
  { id: "adv", label: "ADVANCED", copper: "copper-300" as const, cards: [
    { id: "rag", title: "RAG", essence: "Retrieve + ground in docs" },
    { id: "art", title: "ART", essence: "Reason + use tools" },
    { id: "react", title: "ReAct", essence: "Think → Act → Observe → repeat" },
  ]},
];

test("TieredTechniqueGrid renders all 3 tiers with their copper-stop attribute", () => {
  render(
    <TieredTechniqueGrid
      tiers={TIERS}
      revealedTier={3}
      renderCard={(c) => <div data-testid={`card-${c.id}`}>{c.title}</div>}
    />,
  );
  expect(screen.getByTestId("tier-basic").getAttribute("data-copper-stop")).toBe("copper-700");
  expect(screen.getByTestId("tier-inter").getAttribute("data-copper-stop")).toBe("copper-500");
  expect(screen.getByTestId("tier-adv").getAttribute("data-copper-stop")).toBe("copper-300");
});

test("revealedTier gates which tiers are shown", () => {
  render(
    <TieredTechniqueGrid
      tiers={TIERS}
      revealedTier={2}
      renderCard={(c) => <div data-testid={`card-${c.id}`}>{c.title}</div>}
    />,
  );
  expect(screen.getByTestId("tier-basic").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("tier-inter").getAttribute("data-revealed")).toBe("true");
  expect(screen.getByTestId("tier-adv").getAttribute("data-revealed")).toBe("false");
});

test("each tier renders its label + cards via renderCard", () => {
  render(
    <TieredTechniqueGrid
      tiers={TIERS}
      revealedTier={3}
      renderCard={(c) => <div data-testid={`card-${c.id}`}>{c.title}</div>}
    />,
  );
  expect(screen.getByText("BASIC")).toBeInTheDocument();
  expect(screen.getByText("ADVANCED")).toBeInTheDocument();
  expect(screen.getByTestId("card-zero-shot")).toBeInTheDocument();
  expect(screen.getByTestId("card-react")).toBeInTheDocument();
});
