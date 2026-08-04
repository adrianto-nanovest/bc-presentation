import { render, screen } from "@testing-library/react";
import { RingStack } from "@/slides/foundation-core-section-e/components/RingStack";

// SMIL = the SVG animation elements. The global prefers-reduced-motion rule in
// globals.css squashes CSS animations only, so SMIL needs an explicit mount gate
// (spec §8.2 / gh#45).
const SMIL = "animate, animateMotion, animateTransform, set, mpath";

function withReducedMotion(fn: () => void) {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
  try {
    fn();
  } finally {
    window.matchMedia = original;
  }
}

test("renders all three rings in summary mode", () => {
  render(<RingStack focusIndex={null} mode="summary" width={540} height={460} />);
  expect(screen.getByTestId("ring-prompt")).toBeInTheDocument();
  expect(screen.getByTestId("ring-context")).toBeInTheDocument();
  expect(screen.getByTestId("ring-harness")).toBeInTheDocument();
});

test("focal mode marks the focused ring via data-focal", () => {
  render(<RingStack focusIndex={1} mode="focal" width={540} height={460} />);
  expect(screen.getByTestId("ring-prompt").getAttribute("data-focal")).toBe("false");
  expect(screen.getByTestId("ring-context").getAttribute("data-focal")).toBe("true");
});

test("focusIndex=0 renders prompt only (other rings collapsed)", () => {
  render(<RingStack focusIndex={0} mode="focal" width={540} height={460} />);
  expect(screen.getByTestId("ring-prompt")).toBeInTheDocument();
  expect(screen.queryByTestId("ring-context")).toBeNull();
  expect(screen.queryByTestId("ring-harness")).toBeNull();
});

test("data-focus attribute reflects focusIndex", () => {
  const { rerender } = render(
    <RingStack focusIndex={2} mode="focal" width={540} height={460} />,
  );
  expect(screen.getByTestId("ring-stack").getAttribute("data-focus")).toBe("2");
  rerender(<RingStack focusIndex={null} mode="summary" width={540} height={460} />);
  expect(screen.getByTestId("ring-stack").getAttribute("data-focus")).toBe("summary");
});

// ───────────────────── orbit (gh#45) ─────────────────────

test("orbit is off by default — no arc, no THE LOOP label, no SMIL", () => {
  render(<RingStack focusIndex={null} mode="summary" width={540} height={460} />);
  expect(screen.getByTestId("ring-stack").getAttribute("data-orbit")).toBe("false");
  expect(screen.queryByTestId("ring-orbit")).toBeNull();
  expect(screen.queryByText("THE LOOP")).toBeNull();
  expect(document.querySelectorAll(SMIL).length).toBe(0);
});

test("orbit off leaves every existing call site untouched (three rings, same diameters)", () => {
  const { rerender } = render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} />,
  );
  const before = screen.getByTestId("ring-stack").innerHTML;
  rerender(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} orbit={false} />,
  );
  expect(screen.getByTestId("ring-stack").innerHTML).toBe(before);
  expect(screen.getByTestId("ring-harness").getAttribute("data-diameter")).toBe("380");
});

test("orbit on draws a copper arc carrying the mono label THE LOOP", () => {
  render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} orbit />,
  );
  expect(screen.getByTestId("ring-stack").getAttribute("data-orbit")).toBe("true");
  expect(screen.getByTestId("ring-orbit")).toBeInTheDocument();
  expect(screen.getByText("THE LOOP")).toBeInTheDocument();
  const arc = screen.getByTestId("ring-orbit-arc");
  expect(arc.getAttribute("d")).toMatch(/^M .* A /);
  expect(arc.getAttribute("stroke")).toMatch(/^var\(--copper-/);
});

test("orbit sweeps all three rings — long axis clears the harness, short axis runs through the interior", () => {
  render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} orbit />,
  );
  const orbit = screen.getByTestId("ring-orbit");
  const rx = Number(orbit.getAttribute("data-orbit-rx"));
  const ry = Number(orbit.getAttribute("data-orbit-ry"));
  // Harness is the outermost ring: diameter 380 → radius 190. Context is the
  // middle one: diameter 240 → radius 120. Reaching past the first while both
  // passes run inside the second is what makes the track cross their strokes
  // instead of enclosing them.
  expect(rx).toBeGreaterThan(190);
  expect(ry).toBeLessThan(120);
  // …and the long axis stays inside the 540-wide canvas.
  expect(rx).toBeLessThan(270);
});

test("orbit track stays on canvas, crosses all three rings, and reaches past the outermost", () => {
  render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} orbit />,
  );
  const orbit = screen.getByTestId("ring-orbit");
  const rx = Number(orbit.getAttribute("data-orbit-rx"));
  const ry = Number(orbit.getAttribute("data-orbit-ry"));
  const ocy = Number(orbit.getAttribute("data-orbit-cy"));
  const tilt = Number(orbit.getAttribute("data-orbit-tilt"));
  // Sample the whole track, applying the same ellipse + rotation the component
  // renders, and measure it against the rings it has to sweep.
  const [cx, cy] = [540 / 2, 460 / 2];
  const a = (tilt * Math.PI) / 180;
  let minDist = Infinity;
  let maxDist = 0;
  for (let t = 0; t < 360; t += 1) {
    const rad = (t * Math.PI) / 180;
    const ex = rx * Math.cos(rad);
    const ey = ry * Math.sin(rad);
    const x = cx + ex * Math.cos(a) - ey * Math.sin(a);
    const y = ocy + ex * Math.sin(a) + ey * Math.cos(a);
    // Never leaves the 540×460 canvas.
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThanOrEqual(540);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThanOrEqual(460);
    const dist = Math.hypot(x - cx, y - cy);
    minDist = Math.min(minDist, dist);
    maxDist = Math.max(maxDist, dist);
  }
  // Ring radii: prompt 55, context 120, harness 190. Passing inside the smallest
  // and outside the largest means the track crosses all three strokes — a sweep,
  // not an enclosure.
  expect(minDist).toBeLessThan(55);
  expect(maxDist).toBeGreaterThan(190);
});

test("orbit is NOT a concentric ring — it is a tilted ellipse (§8.2)", () => {
  render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} orbit />,
  );
  const orbit = screen.getByTestId("ring-orbit");
  const rx = Number(orbit.getAttribute("data-orbit-rx"));
  const ry = Number(orbit.getAttribute("data-orbit-ry"));
  // A circle would be rx === ry, and a fourth containment boundary.
  expect(rx).not.toBe(ry);
  const arc = screen.getByTestId("ring-orbit-arc");
  expect(arc.closest("g")?.getAttribute("transform")).toMatch(/^rotate\(-?\d/);
});

test("two orbit stacks get distinct motion-path ids", () => {
  render(
    <>
      <RingStack focusIndex={null} mode="summary" width={540} height={460} orbit />
      <RingStack focusIndex={null} mode="summary" width={540} height={460} orbit />
    </>,
  );
  const ids = Array.from(document.querySelectorAll("defs > path")).map((p) => p.id);
  expect(ids).toHaveLength(2);
  expect(new Set(ids).size).toBe(2);
  // Each mpath must point at an id that exists.
  for (const m of Array.from(document.querySelectorAll("mpath"))) {
    const href = m.getAttribute("href") ?? "";
    expect(ids).toContain(href.slice(1));
  }
});

test("orbit on still renders the three rings underneath — never a fourth ring", () => {
  render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} orbit />,
  );
  expect(screen.getByTestId("ring-prompt")).toBeInTheDocument();
  expect(screen.getByTestId("ring-context")).toBeInTheDocument();
  expect(screen.getByTestId("ring-harness")).toBeInTheDocument();
  expect(screen.getByTestId("ring-orbit-arc").getAttribute("fill")).toBe("none");
  // The orbit paints last so it crosses OVER the ring strokes.
  const stack = screen.getByTestId("ring-stack");
  expect(stack.lastElementChild?.querySelector("[data-testid=ring-orbit]")).not.toBeNull();
});

test("orbit on mounts SMIL motion when motion is allowed", () => {
  render(
    <RingStack focusIndex={null} mode="summary" width={540} height={460} orbit />,
  );
  expect(document.querySelectorAll(SMIL).length).toBeGreaterThan(0);
});

test("prefers-reduced-motion: orbit mounts zero SMIL nodes yet renders complete", () => {
  withReducedMotion(() => {
    render(
      <RingStack focusIndex={null} mode="summary" width={540} height={460} orbit />,
    );
    expect(document.querySelectorAll(SMIL).length).toBe(0);
    // The pose still carries its whole meaning: arc, label, and the marker.
    expect(screen.getByTestId("ring-orbit")).toBeInTheDocument();
    expect(screen.getByTestId("ring-orbit-arc")).toBeInTheDocument();
    expect(screen.getByText("THE LOOP")).toBeInTheDocument();
    const marker = screen.getByTestId("ring-orbit-marker");
    // A static marker must be placed, not left at the SVG origin.
    expect(Number(marker.getAttribute("cx"))).toBeGreaterThan(0);
    expect(Number(marker.getAttribute("cy"))).toBeGreaterThan(0);
  });
});
