import { render, act } from "@testing-library/react";
import { DeckProvider, useDeck } from "@/deck/DeckContext";
import { useKeyboardNav } from "@/deck/useKeyboardNav";
import { composedDeck, deckSlides } from "@/deck/registry";

function Mount() {
  useKeyboardNav();
  const { slideIndex, stepIndex } = useDeck();
  return (
    <span data-testid="state">
      {slideIndex}:{stepIndex}
    </span>
  );
}

function fire(key: string, init: KeyboardEventInit = {}) {
  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key, ...init }));
  });
}

// The section-jump tests below drive the REAL deck, not a two-slide toy: the
// hook's jump map is the live composed deck's, so a `[3, 2]` provider would
// clamp every target to slide 1 (DeckContext.goTo) and the assertions would all
// pass for the wrong reason.
const REAL_STEP_COUNTS = deckSlides.map((s) => s.steps);

function mountRealDeck() {
  return render(
    <DeckProvider stepCounts={REAL_STEP_COUNTS}>
      <Mount />
    </DeckProvider>,
  );
}

test("Space advances one step within a slide", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  expect(getByTestId("state").textContent).toBe("0:0");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("Enter advances one step (alias of Space)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("Enter");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("ArrowDown advances one step (alias of Space)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowDown");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("ArrowRight skips to the next slide regardless of remaining steps", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  expect(getByTestId("state").textContent).toBe("1:0");
});

test("ArrowLeft jumps to step 0 of the previous slide", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight"); // → slide 1
  fire("ArrowLeft"); // ← slide 0, step 0
  expect(getByTestId("state").textContent).toBe("0:0");
});

test("ArrowUp retreats one step within the current slide", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire(" "); // 0:0 -> 0:1
  fire(" "); // 0:1 -> 0:2
  expect(getByTestId("state").textContent).toBe("0:2");
  fire("ArrowUp");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("ArrowUp at slide start spills back to previous slide's last step", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight"); // → 1:0
  expect(getByTestId("state").textContent).toBe("1:0");
  fire("ArrowUp"); // spill back to slide 0 last step (stepCount 3 → step 2)
  expect(getByTestId("state").textContent).toBe("0:2");
});

test("Backspace retreats (alias of ArrowUp)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire(" ");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("0:2");
  fire("Backspace");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("Delete retreats (alias of Backspace)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire(" ");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("0:2");
  fire("Delete");
  expect(getByTestId("state").textContent).toBe("0:1");
});

test("r resets the entire deck to slide 0 step 0", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight"); // → 1:0
  fire(" "); // 1:1
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("r");
  expect(getByTestId("state").textContent).toBe("0:0");
});

test("R (uppercase) also resets the deck", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("R");
  expect(getByTestId("state").textContent).toBe("0:0");
});

test("u resets the current slide's step to 0 without changing slide", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight"); // → 1:0
  fire(" "); // → 1:1
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("u");
  expect(getByTestId("state").textContent).toBe("1:0");
});

test("U (uppercase) also resets the current step", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("U");
  expect(getByTestId("state").textContent).toBe("1:0");
});

test("Cmd+r does NOT reset the deck (browser reload protected)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("r", { metaKey: true });
  expect(getByTestId("state").textContent).toBe("1:1");
});

test("Ctrl+r does NOT reset the deck", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("r", { ctrlKey: true });
  expect(getByTestId("state").textContent).toBe("1:1");
});

test("Alt+r does NOT reset the deck", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("r", { altKey: true });
  expect(getByTestId("state").textContent).toBe("1:1");
});

test("Cmd+u does NOT reset the current step (view-source protected)", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
    </DeckProvider>,
  );
  fire("ArrowRight");
  fire(" ");
  expect(getByTestId("state").textContent).toBe("1:1");
  fire("u", { metaKey: true });
  expect(getByTestId("state").textContent).toBe("1:1");
});

// §3.5 (gh#36) — the jump map is the composed deck's `sectionFirstIndex`, not a
// letter range written into the hook. These tests read the live map rather than
// naming letters, so the `a`–`k` → `a`–`n` extension moves them with it.
describe("section jumps come from the composed deck", () => {
  test("every letter the composed deck owns jumps to that section's first numbered slide", () => {
    const { getByTestId } = mountRealDeck();
    const live = [...composedDeck.sectionFirstIndex.entries()];
    // Guard the loop: an empty map would make every assertion below vacuous.
    expect(live.length).toBeGreaterThanOrEqual(11);

    for (const [letter, index] of live) {
      fire(letter.toLowerCase());
      expect(getByTestId("state").textContent).toBe(`${index}:0`);
      fire(letter); // uppercase is the same jump
      expect(getByTestId("state").textContent).toBe(`${index}:0`);
    }
  });

  test("A lands on A.1, not on the cover", () => {
    const { getByTestId } = mountRealDeck();
    fire("ArrowRight");
    fire("ArrowRight"); // somewhere other than the target
    fire("a");
    // R5 gives the run its first NUMBERED slide, so the `numbered: false` cover
    // at index 0 is skipped without the hook holding an exception for it.
    expect(getByTestId("state").textContent).toBe("1:0");
    expect(composedDeck.sectionFirstIndex.get("A")).toBe(1);
  });

  test("a letter that owns no section is a silent no-op", () => {
    const { getByTestId } = mountRealDeck();
    fire("ArrowRight");
    fire("ArrowRight");
    expect(getByTestId("state").textContent).toBe("2:0");
    // `z` is inside the /^[A-Za-z]$/ test but absent from the map. An absent
    // letter must do nothing — not throw, and not fall through to slide 0.
    expect(composedDeck.sectionFirstIndex.has("Z")).toBe(false);
    fire("z");
    expect(getByTestId("state").textContent).toBe("2:0");
    fire("Z");
    expect(getByTestId("state").textContent).toBe("2:0");
  });

  test("Cmd/Ctrl/Alt + a live section letter does not jump", () => {
    const { getByTestId } = mountRealDeck();
    fire("ArrowRight");
    expect(getByTestId("state").textContent).toBe("1:0");
    fire("b", { metaKey: true });
    fire("b", { ctrlKey: true });
    fire("b", { altKey: true });
    expect(getByTestId("state").textContent).toBe("1:0");
  });

  test("r and u are reserved: they reset and never reach the letter branch", () => {
    const { getByTestId } = mountRealDeck();
    // The composer caps sections at 17 so neither letter can ever be handed to
    // a section — assert the reservation holds for the live deck too.
    expect(composedDeck.sectionFirstIndex.has("R")).toBe(false);
    expect(composedDeck.sectionFirstIndex.has("U")).toBe(false);

    fire("b"); // → section B's first numbered slide
    const b = composedDeck.sectionFirstIndex.get("B")!;
    fire(" "); // → step 1, so `u` has something to reset
    expect(getByTestId("state").textContent).toBe(`${b}:1`);
    fire("u");
    expect(getByTestId("state").textContent).toBe(`${b}:0`);
    fire("r");
    expect(getByTestId("state").textContent).toBe("0:0");
  });
});

// The reason the letter test stopped naming a range. The leader deck reaches 14
// sections once Phases 5–7 land (§11), so `l`, `m` and `n` become live jump keys
// — and this is the assertion that says adding them costs no edit to the hook.
describe("a deck whose letters run past K needs no edit here", () => {
  afterEach(() => {
    vi.doUnmock("@/deck/registry");
    vi.resetModules();
  });

  test("a section that composes to N is reachable by pressing n", async () => {
    const real = await import("@/deck/registry");
    // Rather than stand up a 14-section deck, hand the live map the letter such
    // a deck would hand out. `n` sits outside the old `/^[A-Ka-k]$/` literal, so
    // this fails on a hook that names a range and passes on one that looks up.
    const withN = new Map(real.composedDeck.sectionFirstIndex);
    withN.set("N", 3);
    vi.doMock("@/deck/registry", () => ({
      ...real,
      composedDeck: { ...real.composedDeck, sectionFirstIndex: withN },
    }));

    // One epoch: the hook and the provider it reads must be the SAME module
    // instances, so both are re-imported after the reset.
    vi.resetModules();
    const { DeckProvider, useDeck } = await import("@/deck/DeckContext");
    const { useKeyboardNav } = await import("@/deck/useKeyboardNav");

    function Probe() {
      useKeyboardNav();
      const { slideIndex, stepIndex } = useDeck();
      return (
        <span data-testid="state">
          {slideIndex}:{stepIndex}
        </span>
      );
    }

    const { getByTestId } = render(
      <DeckProvider stepCounts={REAL_STEP_COUNTS}>
        <Probe />
      </DeckProvider>,
    );
    fire("n");
    expect(getByTestId("state").textContent).toBe("3:0");
  });
});

test("keystrokes inside an input are ignored", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
      <input data-testid="input" />
    </DeckProvider>,
  );
  const input = getByTestId("input") as HTMLInputElement;
  input.focus();
  act(() => {
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", bubbles: true }),
    );
  });
  expect(getByTestId("state").textContent).toBe("0:0");
});

test("keystrokes inside a textarea are ignored", () => {
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <Mount />
      <textarea data-testid="ta" />
    </DeckProvider>,
  );
  const ta = getByTestId("ta") as HTMLTextAreaElement;
  ta.focus();
  act(() => {
    ta.dispatchEvent(new KeyboardEvent("keydown", { key: "r", bubbles: true }));
  });
  expect(getByTestId("state").textContent).toBe("0:0");
});

test("keystrokes inside a contenteditable element are ignored", () => {
  function WithEditable() {
    useKeyboardNav();
    const { slideIndex, stepIndex } = useDeck();
    return (
      <>
        <span data-testid="state">
          {slideIndex}:{stepIndex}
        </span>
        <div data-testid="ce" contentEditable />
      </>
    );
  }
  const { getByTestId } = render(
    <DeckProvider stepCounts={[3, 2]}>
      <WithEditable />
    </DeckProvider>,
  );
  const ce = getByTestId("ce") as HTMLDivElement;
  ce.focus();
  act(() => {
    ce.dispatchEvent(new KeyboardEvent("keydown", { key: "r", bubbles: true }));
  });
  expect(getByTestId("state").textContent).toBe("0:0");
});
