import { render, screen, fireEvent } from "@testing-library/react";
import { DeckProvider } from "@/deck/DeckContext";
import { I3Portfolio, i3Slide } from "@/slides/reveal-and-closing/i3-portfolio";

test("I.3 declares 5 steps with canonicalPose=4 and interactive mode", () => {
  expect(i3Slide.steps).toBe(5);
  expect(i3Slide.canonicalPose).toBe(4);
  expect(i3Slide.animationMode).toBe("interactive");
});

test("I.3 renders FIG label, headline, caption, and the categorized list", () => {
  render(
    <DeckProvider stepCounts={[i3Slide.steps]}>
      <I3Portfolio />
    </DeckProvider>,
  );
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*I\.3.*THE PORTFOLIO/i);
  expect(
    screen.getByText((_content, node) => node?.textContent === "Built. Taught. In production."),
  ).toBeInTheDocument();
  expect(screen.getByText(/Click any item/)).toBeInTheDocument();
  expect(screen.getByText("HARNESSES")).toBeInTheDocument();
});

test("I.3 swaps canvas content when a heavy item is clicked", () => {
  render(
    <DeckProvider stepCounts={[i3Slide.steps]}>
      <I3Portfolio />
    </DeckProvider>,
  );
  // Default canvas first.
  expect(screen.getByText(/MAIN AGENT/)).toBeInTheDocument();
  fireEvent.click(screen.getByText("stocks intel"));
  // Stocks-intel sim renders RSS feed labels.
  expect(screen.getByText("Investing.com")).toBeInTheDocument();
});

test("I.3 swaps canvas to a light panel when a light item is clicked", () => {
  render(
    <DeckProvider stepCounts={[i3Slide.steps]}>
      <I3Portfolio />
    </DeckProvider>,
  );
  fireEvent.click(screen.getByText("Sonarqube"));
  expect(screen.getByText(/Code-quality APIs/i)).toBeInTheDocument();
});

test("I.3 see-it-real toggle swaps the canvas to a screenshot grid", () => {
  render(
    <DeckProvider stepCounts={[i3Slide.steps]}>
      <I3Portfolio />
    </DeckProvider>,
  );
  fireEvent.click(screen.getByText("stocks intel"));
  fireEvent.click(screen.getByText(/see it real/));
  // Screenshot grid renders 3 image elements pointing at assets/n8n-workflows/.
  const imgs = screen.getAllByRole("img", { hidden: true });
  expect(imgs.some((i) => i.getAttribute("src")?.includes("n8n-stocks-news-sentiment"))).toBe(true);
});
