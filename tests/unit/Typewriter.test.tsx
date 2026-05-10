import { act, render, screen } from "@testing-library/react";
import { Typewriter } from "@/slides/foundation-core-section-e/components/Typewriter";

// Stub requestAnimationFrame so we can drive the streaming animation
// deterministically. jsdom's default rAF schedules on a setTimeout that
// would compete with vi.useFakeTimers, so we manage frames ourselves.
let frameCallbacks: Array<(t: number) => void> = [];
let frameId = 0;

beforeEach(() => {
  frameCallbacks = [];
  frameId = 0;
  vi.spyOn(globalThis, "requestAnimationFrame").mockImplementation((cb) => {
    frameId++;
    frameCallbacks.push(cb);
    return frameId;
  });
  vi.spyOn(globalThis, "cancelAnimationFrame").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

function flushFrames(ms: number) {
  // Fire one frame at the requested timestamp; the component re-queues itself
  // on each tick, so we drain whatever is currently in the queue.
  const cbs = frameCallbacks;
  frameCallbacks = [];
  cbs.forEach((cb) => cb(ms));
}

test("eventually renders the full text after duration elapses", () => {
  render(<Typewriter text="hello" duration={100} play={true} />);
  // Initial render: zero chars yet, caret visible.
  expect(screen.getByTestId("typewriter").getAttribute("data-done")).toBe("false");

  // Drive the rAF clock. The first frame inside the effect captures
  // `start = performance.now()`; pushing time well past `duration` clamps
  // the frac to 1 and renders the full string.
  act(() => {
    flushFrames(performance.now() + 1);
    flushFrames(performance.now() + 10_000);
  });

  expect(screen.getByTestId("typewriter").textContent).toContain("hello");
  expect(screen.getByTestId("typewriter").getAttribute("data-done")).toBe("true");
});

test("renders a caret while streaming", () => {
  const { container } = render(<Typewriter text="hi" duration={500} play={true} />);
  expect(container.querySelector(".tw-caret")).not.toBeNull();
});

test("caret hidden once streaming completes", () => {
  const { container } = render(<Typewriter text="hi" duration={50} play={true} />);
  act(() => {
    flushFrames(performance.now() + 1);
    flushFrames(performance.now() + 10_000);
  });
  expect(container.querySelector(".tw-caret")).toBeNull();
});

test("caretStyle=block renders the block-class caret", () => {
  const { container } = render(
    <Typewriter text="hi" duration={500} play={true} caretStyle="block" />,
  );
  expect(container.querySelector(".tw-caret-block")).not.toBeNull();
});

test("play=false holds at zero chars", () => {
  render(<Typewriter text="hello" duration={100} play={false} />);
  expect(screen.getByTestId("typewriter").textContent).toBe("");
});
