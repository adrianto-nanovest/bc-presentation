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
  E10HarnessPractices,
  e10Slide,
} from "@/slides/foundation-core-section-e/e10-harness-practices";
import { e10Content } from "@/slides/foundation-core-section-e/content";

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(step: number) {
  render(
    <DeckProvider stepCounts={[e10Slide.steps]}>
      <AdvanceTo step={step} />
      <E10HarnessPractices />
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.10 declares 2 steps with canonicalPose=1", () => {
  expect(e10Slide.steps).toBe(2);
  expect(e10Slide.canonicalPose).toBe(1);
  expect(e10Slide.animationMode).toBe("step-reveal");
  expect(e10Slide.section).toBe("E");
  expect(e10Slide.surface).toBe("dark");
});

test("E.10 renders the FIG label `FIG. E.10 · HARNESS · PRACTICES`", () => {
  renderAtStep(0);
  expect(
    screen.getByText(/FIG\. E\.10 · HARNESS · PRACTICES/),
  ).toBeInTheDocument();
});

test("step 0 → 8 practice cards rendered (each with name, pattern chip, 3 bullets); footer hidden", () => {
  renderAtStep(0);

  // Headline always rendered.
  const headline = document.querySelector("h1.slide-headline");
  expect(headline).not.toBeNull();
  expect(headline?.textContent).toMatch(/eight practices/);

  // 4×2 grid → 8 cards. Match each card id directly (excludes nested
  // sub-testids like `-name`, `-pattern`, `-bullet-N`).
  const cards = e10Content.practices.map((p) =>
    screen.getByTestId(`practice-card-${p.id}`),
  );
  expect(cards).toHaveLength(8);
  expect(cards).toHaveLength(e10Content.practices.length);

  for (const p of e10Content.practices) {
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
  e10Content.practices.forEach((p, i) => {
    const seq = screen.getByTestId(`practice-card-${p.id}-seq`);
    expect(seq.textContent).toBe(`0${i + 1} / 08`);
  });

  // Footer not yet revealed.
  expect(screen.getByTestId("e10-footer").className).not.toMatch(/\bon\b/);
});

test("step 1 (canonicalPose) → footer caption revealed", () => {
  renderAtStep(1);

  const footer = screen.getByTestId("e10-footer");
  expect(footer.className).toMatch(/\bon\b/);
  expect(footer.textContent).toMatch(e10Content.footer);

  // All 8 cards still present at canonicalPose.
  for (const p of e10Content.practices) {
    expect(screen.getByTestId(`practice-card-${p.id}`)).toBeInTheDocument();
  }
});
