// E.10 — HARNESS · PRACTICES · slide tests.
//
// Covers the new 2-step design ported from
// `claude-design-project/jsx/slides-c.jsx:103-164`.
//   0 — 8 practice cards stagger in (auto via double-rAF mount trick).
//   1 — footer caption visible.
//
// The previous click-to-expand-shrink interaction has been dropped — these
// are static cards now.
import { render, screen, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import {
  E11HarnessPractices,
  e11Slide,
} from "@/slides/foundation-core-section-e/e11-harness-practices";
import { e11Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e11Slide.steps]}>
      <AdvanceTo step={step} />
      <E11HarnessPractices />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.10 declares 2 steps with canonicalPose=1", () => {
  expect(e11Slide.steps).toBe(2);
  expect(e11Slide.canonicalPose).toBe(1);
  expect(e11Slide.animationMode).toBe("step-reveal");
  expect(e11Slide.section).toBe("E");
  expect(e11Slide.surface).toBe("dark");
});

test("E.10 renders the FIG label `FIG. E.10 · HARNESS · PRACTICES`", () => {
  renderAtStep(0);
  const fig = document.querySelector(".fig-label");
  expect(fig?.textContent).toMatch(/FIG\.\s*E\.11.*HARNESS.*PRACTICES/i);
});

test("step 0 → 8 practice cards rendered (each with name, pattern chip, 3 bullets); footer hidden", () => {
  renderAtStep(0);

  // Headline always rendered.
  const headline = document.querySelector("h1.slide-headline");
  expect(headline).not.toBeNull();
  expect(headline?.textContent).toMatch(/eight practices/);

  // 4×2 grid → 8 cards. Match each card id directly (excludes nested
  // sub-testids like `-name`, `-pattern`, `-bullet-N`).
  const cards = e11Content.practices.map((p) =>
    screen.getByTestId(`practice-card-${p.id}`),
  );
  expect(cards).toHaveLength(8);
  expect(cards).toHaveLength(e11Content.practices.length);

  for (const p of e11Content.practices) {
    // Card root + name + pattern chip + 3 bullets all rendered.
    expect(screen.getByTestId(`practice-card-${p.id}`)).toBeInTheDocument();

    const name = screen.getByTestId(`practice-card-${p.id}-name`);
    expect(name.textContent).toBe(p.name);

    const pattern = screen.getByTestId(`practice-card-${p.id}-pattern`);
    expect(pattern.textContent).toBe(p.pattern);

    const bullets = screen.getAllByTestId(
      new RegExp(`^practice-card-${p.id}-bullet-\\d+$`),
    );
    expect(bullets).toHaveLength(3);
    p.bullets.forEach((b, j) => {
      const bullet = screen.getByTestId(`practice-card-${p.id}-bullet-${j}`);
      expect(bullet.textContent).toMatch(b);
    });

    // Each card must contain an SVG icon (rendered by LucideIcon).
    expect(
      screen
        .getByTestId(`practice-card-${p.id}`)
        .querySelector("svg"),
    ).not.toBeNull();
  }

  // Sequence labels are 01/08, 02/08, … 08/08 in order.
  e11Content.practices.forEach((p, i) => {
    const seq = screen.getByTestId(`practice-card-${p.id}-seq`);
    expect(seq.textContent).toBe(`0${i + 1} / 08`);
  });

  // Footer not yet revealed.
  expect(screen.getByTestId("e11-footer").className).not.toMatch(/\bon\b/);
});

test("step 1 (canonicalPose) → footer caption revealed", () => {
  renderAtStep(1);

  const footer = screen.getByTestId("e11-footer");
  expect(footer.className).toMatch(/\bon\b/);
  expect(footer.textContent).toMatch(e11Content.footer);

  // All 8 cards still present at canonicalPose.
  for (const p of e11Content.practices) {
    expect(screen.getByTestId(`practice-card-${p.id}`)).toBeInTheDocument();
  }
});

test("backward navigation 0 → 1 → 0 re-arms the card stagger", () => {
  // Stub rAF so we can drive the double-rAF mount trick deterministically.
  // Without this, jsdom's native rAF runs on a setTimeout and the .fade.on
  // class flip would be racy under act().
  let frameCallbacks: Array<(t: number) => void> = [];
  let frameId = 0;
  const rafSpy = vi
    .spyOn(globalThis, "requestAnimationFrame")
    .mockImplementation((cb) => {
      frameId++;
      frameCallbacks.push(cb);
      return frameId;
    });
  const cafSpy = vi
    .spyOn(globalThis, "cancelAnimationFrame")
    .mockImplementation(() => {});

  const flushFrames = () => {
    // Drain the current queue. Each call may enqueue more (the double-rAF
    // pattern queues a second frame from inside the first), so loop.
    while (frameCallbacks.length > 0) {
      const cbs = frameCallbacks;
      frameCallbacks = [];
      cbs.forEach((cb) => cb(performance.now()));
    }
  };

  function GoTo({ slide, step }: { slide: number; step: number }) {
    const { goTo } = useDeck();
    return (
      <button
        data-testid={`goto-${slide}-${step}`}
        onClick={() => goTo(slide, step)}
      />
    );
  }

  try {
    render(
      <DeckProvider stepCounts={[e11Slide.steps]}>
        <GoTo slide={0} step={0} />
        <GoTo slide={0} step={1} />
        <E11HarnessPractices />
      </DeckProvider>,
    );

    const firstCardId = `practice-card-${e11Content.practices[0].id}`;

    // Initial mount is at step 0. Flush rAF so the double-rAF resolves and
    // the cards transition to the .on state.
    act(() => {
      flushFrames();
    });
    expect(screen.getByTestId(firstCardId).className).toMatch(/\bon\b/);

    // Forward: 0 → 1. Cards stay mounted (we set mounted=true synchronously
    // for non-zero steps), so .on is preserved — no flicker on advance.
    act(() => {
      screen.getByTestId("goto-0-1").click();
    });
    expect(screen.getByTestId(firstCardId).className).toMatch(/\bon\b/);

    // Backward: 1 → 0. The effect must run setMounted(false) synchronously,
    // dropping .on from every card before the next rAF re-flips it.
    act(() => {
      screen.getByTestId("goto-0-0").click();
    });
    // At this point the rAF callbacks are queued but not yet flushed →
    // cards are in the off state, ready to replay the stagger.
    expect(screen.getByTestId(firstCardId).className).not.toMatch(/\bon\b/);

    // Flush the double-rAF → cards transition back to .on. This is the
    // re-armed stagger replaying on backward navigation.
    act(() => {
      flushFrames();
    });
    expect(screen.getByTestId(firstCardId).className).toMatch(/\bon\b/);
  } finally {
    rafSpy.mockRestore();
    cafSpy.mockRestore();
  }
});
