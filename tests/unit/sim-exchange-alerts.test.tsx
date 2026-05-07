import { render, screen } from "@testing-library/react";
import { ExchangeAlerts } from "@/slides/reveal-and-closing/simulations/ExchangeAlerts";

test("ExchangeAlerts renders 6 exchange feed labels", () => {
  render(<ExchangeAlerts />);
  ["Binance", "OKX", "Tokocrypto", "BitMart", "Indodax", "Alpaca"]
    .forEach((label) => expect(screen.getByText(label)).toBeInTheDocument());
});

test("ExchangeAlerts renders the 3-layer dedup ladder", () => {
  render(<ExchangeAlerts />);
  expect(screen.getByText(/hash/i)).toBeInTheDocument();
  expect(screen.getByText(/fuzzy/i)).toBeInTheDocument();
  expect(screen.getByText(/AI-semantic/i)).toBeInTheDocument();
});

test("ExchangeAlerts mentions Opsgenie", () => {
  render(<ExchangeAlerts />);
  expect(screen.getByText(/Opsgenie/i)).toBeInTheDocument();
});
