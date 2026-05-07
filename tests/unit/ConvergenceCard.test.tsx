import { render, screen } from "@testing-library/react";
import { ConvergenceCard } from "@/slides/foundation-core/components/ConvergenceCard";

test("ConvergenceCard renders title, sub-name, tagline, and bullet list", () => {
  render(
    <ConvergenceCard
      title="BPM"
      subName="Business Process Management"
      tagline="The GPS for operations"
      taglineKeywords={["GPS"]}
      bullets={["Holistic workflow optimization", "Identifies bottlenecks", "Redesigns end-to-end flow"]}
      copperStop="copper-700"
      position="bpm-tl"
    />,
  );
  expect(screen.getByText("BPM")).toBeInTheDocument();
  expect(screen.getByText(/Business Process Management/)).toBeInTheDocument();
  expect(screen.getByText(/GPS/)).toBeInTheDocument();
  expect(screen.getByText("Holistic workflow optimization")).toBeInTheDocument();
});

test("ConvergenceCard exposes its position and stop via data attributes", () => {
  render(
    <ConvergenceCard
      title="IPA"
      subName="Intelligent Process Automation"
      tagline="End-to-end intelligent workflow"
      taglineKeywords={["intelligent"]}
      bullets={["a", "b", "c"]}
      copperStop="copper-300"
      position="ipa-c"
    />,
  );
  const root = screen.getByTestId("convergence-card");
  expect(root.getAttribute("data-position")).toBe("ipa-c");
  expect(root.getAttribute("data-copper-stop")).toBe("copper-300");
});
