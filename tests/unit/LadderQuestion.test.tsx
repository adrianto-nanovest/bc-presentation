import { render, screen } from "@testing-library/react";
import { LadderQuestion } from "@/slides/foundation-core/components/LadderQuestion";

test("LadderQuestion renders the Q# label, question text with keyword highlight, and YES/NO branch labels", () => {
  render(
    <LadderQuestion
      number={2}
      question="Have you removed waste + bottlenecks?"
      keywords={["waste"]}
      yesLabel="continue"
      noLabel="apply BPM first"
    />,
  );
  expect(screen.getByText(/Q2/)).toBeInTheDocument();
  expect(screen.getByText(/Have you removed/)).toBeInTheDocument();
  expect(screen.getByText("waste")).toBeInTheDocument();
  expect(screen.getByText(/continue/)).toBeInTheDocument();
  expect(screen.getByText(/apply BPM first/)).toBeInTheDocument();
});
