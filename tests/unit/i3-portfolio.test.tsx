import { render, screen, fireEvent } from "@testing-library/react";
import { SlideHarness } from "../support/slide-harness";
import { I3Portfolio, i3Slide } from "@/slides/reveal-and-closing/i3-portfolio";

function mount() {
  return render(
    <SlideHarness def={i3Slide}>
      <I3Portfolio />
    </SlideHarness>,
  );
}

test("I.3 declares 2 steps with canonicalPose=1 and step-reveal mode", () => {
  expect(i3Slide.steps).toBe(2);
  expect(i3Slide.canonicalPose).toBe(1);
  expect(i3Slide.animationMode).toBe("step-reveal");
});

test("I.3 renders FIG label, headline, caption, and the 4-entry nav rail", () => {
  mount();
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*I\.3.*THE PORTFOLIO/i);
  expect(screen.getByTestId("i3-headline").textContent).toBe(
    "Built. Taught. In production.",
  );
  expect(screen.getByTestId("i3-caption").textContent).toBe(
    "Click any tab to see how it works",
  );
  ["WORKFLOWS", "PLUGINS", "CONNECTORS", "WORKSHOPS"].forEach((label) =>
    expect(screen.getByText(label)).toBeInTheDocument(),
  );
});

test("I.3 opens on the workflows panel with the stocks-intel simulation", () => {
  mount();
  expect(screen.getByTestId("workflows-panel")).toBeInTheDocument();
  expect(screen.getByTestId("nav-workflows")).toHaveAttribute("data-active", "true");
  // Stocks-intel sim renders RSS feed labels.
  expect(screen.getByText("Investing.com")).toBeInTheDocument();
});

test("I.3 nav rail swaps the main panel", () => {
  mount();
  fireEvent.click(screen.getByTestId("nav-plugins"));
  expect(screen.getByTestId("plugins-panel")).toBeInTheDocument();
  expect(screen.queryByTestId("workflows-panel")).not.toBeInTheDocument();

  fireEvent.click(screen.getByTestId("nav-connectors"));
  expect(screen.getByTestId("connectors-panel")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("nav-workshops"));
  expect(screen.getByTestId("workshops-panel")).toBeInTheDocument();
});

test("I.3 workflows sub-tabs swap the simulation diagram", () => {
  mount();
  fireEvent.click(screen.getByTestId("workflows-subtab-legal-docs"));
  // LegalDocs sim renders the e-sign node; StocksIntel's feeds are gone.
  expect(screen.getByText(/Dropbox Sign/i)).toBeInTheDocument();
  expect(screen.queryByText("Investing.com")).not.toBeInTheDocument();
});

test("I.3 see-it-real opens a lightbox on the active workflow's screenshots", () => {
  mount();
  expect(screen.queryByTestId("screenshot-lightbox")).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId("workflows-mode-toggle"));
  expect(screen.getByTestId("screenshot-lightbox")).toBeInTheDocument();
  expect(screen.getByTestId("lightbox-image").getAttribute("src")).toContain(
    "n8n-stocks-news-sentiment",
  );
});

test("I.3 changing sub-tab closes the lightbox", () => {
  mount();
  fireEvent.click(screen.getByTestId("workflows-mode-toggle"));
  expect(screen.getByTestId("screenshot-lightbox")).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("workflows-subtab-exchange-alerts"));
  expect(screen.queryByTestId("screenshot-lightbox")).not.toBeInTheDocument();
});
