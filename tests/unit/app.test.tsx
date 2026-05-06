import { render, screen } from "@testing-library/react";
import App from "@/App";

test("App mounts", () => {
  render(<App />);
  expect(screen.getByTestId("app-root")).toBeInTheDocument();
});
