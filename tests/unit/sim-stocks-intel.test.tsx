import { render, screen } from "@testing-library/react";
import { StocksIntel } from "@/slides/reveal-and-closing/simulations/StocksIntel";

test("StocksIntel renders all 10 RSS feed labels", () => {
  render(<StocksIntel />);
  ["Investing.com", "CNBC", "Seeking Alpha", "Nasdaq", "FT",
   "Yahoo Finance", "MarketWatch", "AlphaStreet", "The Economist", "Forbes"]
    .forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
});

test("StocksIntel labels the 4 Gemini agents in order", () => {
  render(<StocksIntel />);
  ["Filter Relevance", "News Analyzer", "Ticker Analyzer", "Summarizer"]
    .forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
});

test("StocksIntel marks the Hot Now branch as still-manual", () => {
  render(<StocksIntel />);
  expect(screen.getByText(/still manual/i)).toBeInTheDocument();
});
