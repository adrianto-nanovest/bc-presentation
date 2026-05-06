import { render, screen } from "@testing-library/react";
import App from "@/App";

test("App mounts the deck", () => {
  render(<App />);
  // Post-Task-18: App now boots the smoke deck, so a Slide must render.
  expect(screen.getByTestId("slide")).toBeInTheDocument();
});
