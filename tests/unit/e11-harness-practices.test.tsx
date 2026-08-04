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
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
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
    <SlideHarness def={e11Slide}>
      <AdvanceTo step={step} />
      <E11HarnessPractices />
    </SlideHarness>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

test("E.10 declares 2 steps with canonicalPose=1", () => {
  expect(e11Slide.steps).toBe(2);
  expect(e11Slide.canonicalPose).toBe(1);
  expect(e11Slide.animationMode).toBe("step-reveal");
  expect(e11Slide.sectionKey).toBe("fundamentals");
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

// ───────────── gh#46 · the Ralph card becomes run-until-done ─────────────
//
// Spec §8.2 splits the two loop slides by essence, with no cross-reference
// either way: the Ralph card is `/goal` (run-until-done — starts the next turn
// when the previous finishes, stops when a check passes) and E.12 is `/loop` +
// Routines (run-again-and-again). These assertions pin E.11's side of that
// distinction — the copy that has to carry it, since no slide names the other.
//
// Content-only: the Ralph card keeps the same markup as the other seven, so
// there is no `kw` channel on a card — `essence`, `pattern` and `bullets` are
// plain strings rendered in serif (prose) and mono (`pattern`) exactly as
// before. Only the slide footer carries `kw`.

test("Ralph card renders the run-until-done essence, pattern and 3 bullets", () => {
  renderAtStep(0);

  const ralph = e11Content.practices[7];
  expect(ralph.id).toBe("ralph");
  expect(ralph.name).toBe("Ralph Wiggum");

  // The essence is the boundary against E.12 — one job, retried until a check
  // passes. NOT a vague "keep going" loop.
  expect(ralph.essence).toBe(
    "You start one job; it retries until a check passes.",
  );
  expect(ralph.pattern).toBe("Spec → attempt → check → fix → until done");
  expect(ralph.bullets).toEqual([
    "Errors feed back — it re-diagnoses and retries",
    "Runs past one context window via checkpoints",
    "Success criteria / goal defined as the check — /goal on Claude Code & Codex CLI",
  ]);

  // …and each string reaches the DOM through the shared card markup.
  const card = screen.getByTestId("practice-card-ralph");
  expect(card.textContent).toMatch(ralph.essence);

  const pattern = screen.getByTestId("practice-card-ralph-pattern");
  expect(pattern.textContent).toBe(ralph.pattern);

  ralph.bullets.forEach((b, j) => {
    expect(
      screen.getByTestId(`practice-card-ralph-bullet-${j}`).textContent,
    ).toBe(b);
  });
});

test("the Ralph card's pattern chip stays mono and keyword-free", () => {
  renderAtStep(0);

  const pattern = screen.getByTestId("practice-card-ralph-pattern");
  expect(pattern).toHaveStyle({ fontFamily: "var(--mono)" });
  // `highlight()` emits <em> — the mono chip must carry none.
  expect(pattern.querySelector("em")).toBeNull();

  // The tool strings live in a bullet, and bullets carry no keywords either.
  const bullets = screen.getByTestId("practice-card-ralph-bullets");
  expect(bullets.querySelector("em")).toBeNull();
  expect(bullets.textContent).toMatch("/goal on Claude Code & Codex CLI");
});

test("the slide footer hands the deck to what runs the eight parts", () => {
  renderAtStep(1);

  expect(e11Content.footer).toBe(
    "Eight parts. Now — what runs them, without you.",
  );

  const footer = screen.getByTestId("e11-footer");
  expect(footer.className).toMatch(/\bon\b/);
  expect(footer.textContent).toBe(e11Content.footer);

  // Prose carries `kw`, and the copper <em>s are EXACTLY the declared
  // keywords — a typo'd `kw` highlights nothing and would otherwise pass.
  const marks = footer.querySelectorAll("em");
  expect(Array.from(marks, (m) => m.textContent)).toEqual([
    ...e11Content.footerKw,
  ]);
});

test("the other seven cards keep the essence and pattern they shipped with", () => {
  renderAtStep(0);

  // gh#46 re-cuts ONE card. This pins the other seven so the re-cut cannot
  // spill sideways.
  const untouched: ReadonlyArray<readonly [string, string, string]> = [
    ["orchestration", "The agentic loop that makes the model act.", "ReAct: prompt → infer → tool → observe → loop"],
    ["plugins", "Pluggable capability layered onto the harness.", "Skills · MCP · Subagents · Hooks"],
    ["memory", "Self-learning state that survives the session.", "Spec · PROGRESS.md · AGENTS.md · Git"],
    ["observability", "Every decision auditable, every token counted.", "Log · trace · checkpoint"],
    ["triggers", "Lifecycle hooks that fire at the right moment.", "Manual · Schedule · Event"],
    ["spec-driven", "An immutable spec is the source of truth.", "Spec → code → verify → repeat"],
    ["hitl", "A human approves at the right moments.", "NEVER · TERMINATE · ALWAYS"],
  ];

  expect(untouched).toHaveLength(e11Content.practices.length - 1);

  for (const [id, essence, pattern] of untouched) {
    const p = e11Content.practices.find((x) => x.id === id);
    expect(p, `card ${id} is missing`).toBeDefined();
    expect(p!.essence).toBe(essence);
    expect(p!.pattern).toBe(pattern);
    expect(
      screen.getByTestId(`practice-card-${id}-pattern`).textContent,
    ).toBe(pattern);
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
      <SlideHarness def={e11Slide}>
        <GoTo slide={0} step={0} />
        <GoTo slide={0} step={1} />
        <E11HarnessPractices />
      </SlideHarness>,
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
