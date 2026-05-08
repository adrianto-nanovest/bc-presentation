import { render, screen } from "@testing-library/react";
import { ThesisPanel } from "@/slides/foundation-core-section-e/components/ThesisPanel";

test("ThesisPanel renders equation tokens, Cursor quote, stanza, tagline", () => {
  render(
    <ThesisPanel
      revealEquation={true}
      revealStanza={true}
      revealTagline={true}
    />,
  );
  expect(screen.getByText("Agent")).toBeInTheDocument();
  expect(screen.getByText("Harness")).toBeInTheDocument();
  expect(screen.getByText(/Cursor engineering/)).toBeInTheDocument();
  expect(screen.getAllByTestId(/^thesis-stanza-\d+$/)).toHaveLength(4);
  expect(screen.getByText(/Build once/)).toBeInTheDocument();
  expect(screen.getByText(/Use forever/)).toBeInTheDocument();
});

test("ThesisPanel gates content on reveal flags", () => {
  render(
    <ThesisPanel
      revealEquation={false}
      revealStanza={false}
      revealTagline={false}
    />,
  );
  expect(screen.getByTestId("thesis-equation").getAttribute("data-revealed")).toBe("false");
  expect(screen.getByTestId("thesis-stanza-block").getAttribute("data-revealed")).toBe("false");
  expect(screen.getByTestId("thesis-tagline").getAttribute("data-revealed")).toBe("false");
});
