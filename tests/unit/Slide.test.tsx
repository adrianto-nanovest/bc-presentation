import { render, screen } from "@testing-library/react";
import { Slide } from "@/deck/Slide";
import { DeckProvider } from "@/deck/DeckContext";

const wrap = (ui: React.ReactNode) => (
  <DeckProvider stepCounts={[1]}>{ui}</DeckProvider>
);

test("Slide root has viewport-fitting inline style", () => {
  render(
    wrap(
      <Slide animationMode="static" canonicalPose={0} index={0}>
        hi
      </Slide>,
    ),
  );
  const root = screen.getByTestId("slide");
  const style = root.getAttribute("style") ?? "";
  expect(style).toMatch(/height:\s*100vh/);
  expect(style).toMatch(/overflow:\s*hidden/);
});

test("Slide annotates animation mode and canonical pose as data attrs", () => {
  render(
    wrap(
      <Slide animationMode="step-reveal" canonicalPose={2} index={0}>
        hi
      </Slide>,
    ),
  );
  const root = screen.getByTestId("slide");
  expect(root.getAttribute("data-animation-mode")).toBe("step-reveal");
  expect(root.getAttribute("data-canonical-pose")).toBe("2");
});

test("Slide ignores click events when animationMode is not 'interactive'", () => {
  const onClick = vi.fn();
  render(
    wrap(
      <Slide
        animationMode="static"
        canonicalPose={0}
        index={0}
        onClick={onClick}
      >
        hi
      </Slide>,
    ),
  );
  screen.getByTestId("slide").click();
  expect(onClick).not.toHaveBeenCalled();
});

test("Slide forwards click events when animationMode is 'interactive'", () => {
  const onClick = vi.fn();
  render(
    wrap(
      <Slide
        animationMode="interactive"
        canonicalPose={0}
        index={0}
        onClick={onClick}
      >
        hi
      </Slide>,
    ),
  );
  screen.getByTestId("slide").click();
  expect(onClick).toHaveBeenCalledTimes(1);
});
