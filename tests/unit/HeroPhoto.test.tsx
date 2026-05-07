import { render, screen } from "@testing-library/react";
import { HeroPhoto } from "@/components/HeroPhoto";

test("HeroPhoto renders an image and a vignette overlay", () => {
  render(<HeroPhoto src="/heroes/test.jpg" vignetteSide="bottom-left" alt="" />);
  const img = screen.getByRole("img", { hidden: true });
  expect(img.getAttribute("src")).toBe("/heroes/test.jpg");
  expect(screen.getByTestId("hero-vignette")).toBeInTheDocument();
});

test("HeroPhoto vignetteSide controls the gradient direction", () => {
  const { rerender } = render(
    <HeroPhoto src="/x.jpg" vignetteSide="bottom-left" alt="" />,
  );
  const vig = screen.getByTestId("hero-vignette");
  const styleA = vig.getAttribute("style") ?? "";
  // "bottom-left" uses a radial vignette; accept either gradient family.
  expect(styleA).toMatch(/linear-gradient|radial-gradient/);
  expect(styleA).toMatch(/at bottom left|to top right/);

  rerender(<HeroPhoto src="/x.jpg" vignetteSide="bottom" alt="" />);
  const styleB = vig.getAttribute("style") ?? "";
  expect(styleB).toMatch(/180deg|to top/);
});
