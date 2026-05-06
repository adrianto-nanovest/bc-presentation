import { render, screen, act } from "@testing-library/react";
import App from "@/App";

test("smoke deck mounts, advances through all slides via keyboard", () => {
  render(<App />);
  // Slide 0 is rendered initially.
  expect(screen.getByTestId("slide").getAttribute("data-slide-index")).toBe("0");

  // 7 slides total. Hit ArrowRight 6 times to reach the last slide.
  for (let i = 0; i < 6; i++) {
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });
  }

  expect(screen.getByTestId("slide").getAttribute("data-slide-index")).toBe("6");
});

test("smoke deck declares one slide per supported animation mode", () => {
  render(<App />);
  // Walk all 7 slides and collect their declared modes.
  const seen = new Set<string>();
  for (let i = 0; i < 7; i++) {
    seen.add(screen.getByTestId("slide").getAttribute("data-animation-mode")!);
    if (i < 6) {
      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowRight" }),
        );
      });
    }
  }
  expect(seen.has("static")).toBe(true);
  expect(seen.has("step-reveal")).toBe(true);
  expect(seen.has("looping-ambient")).toBe(true);
  expect(seen.has("interactive")).toBe(true);
});
