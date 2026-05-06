import { render, screen, fireEvent } from "@testing-library/react";
import { Interactive } from "@/motion/Interactive";

test("Interactive forwards onClick from inner content", () => {
  const onClick = vi.fn();
  render(
    <Interactive>
      <button data-testid="btn" onClick={onClick}>
        click me
      </button>
    </Interactive>,
  );
  fireEvent.click(screen.getByTestId("btn"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("Interactive stops propagation so the host Slide does not also see the click", () => {
  const slideHandler = vi.fn();
  render(
    <div data-testid="host" onClick={slideHandler}>
      <Interactive>
        <button data-testid="btn">x</button>
      </Interactive>
    </div>,
  );
  fireEvent.click(screen.getByTestId("btn"));
  expect(slideHandler).not.toHaveBeenCalled();
});
