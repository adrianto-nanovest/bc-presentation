import { render, screen } from "@testing-library/react";
import { StocksIntel } from "@/slides/reveal-and-closing/simulations/StocksIntel";

test("StocksIntel renders all 10 RSS feed labels", () => {
  render(<StocksIntel />);
  ["Investing.com", "CNBC", "Seeking Alpha", "Nasdaq", "Financial Times",
   "Yahoo Finance", "MarketWatch", "AlphaStreet", "The Economist", "Forbes"]
    .forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
});

test("StocksIntel labels the 4 agent groups in order", () => {
  render(<StocksIntel />);
  ["AI AGENT 1 · SOURCE AGGREGATOR", "AI AGENT 2 · BATCH PROCESSING",
   "AI AGENT 3 · TICKER GENERATOR", "AI AGENT 4 · SUMMARY GENERATOR"]
    .forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
});

test("StocksIntel labels the 4 LLM calls, one per agent", () => {
  render(<StocksIntel />);
  [/LLM · Filter Relevance/, /LLM · gemini-flash/, /LLM · Score & Outlook/, /LLM · Brief/]
    .forEach((pattern) => expect(screen.getByText(pattern)).toBeInTheDocument());
});
