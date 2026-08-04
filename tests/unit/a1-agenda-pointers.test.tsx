// A.1's agenda pointers, as every brand deck actually prints them (gh#37).
//
// Spec §3.6. The five pointers used to be five literal strings in
// `content.ts` — "SECTION D · PROCESS & METHODOLOGY" and four more. They now
// name a section KEY and let the composed deck supply the letter, because in
// the leader deck `process` resolves to G and a hardcoded D would be a lie the
// moment Phase 4 composes.
//
// The refactor is therefore only correct if the standard decks print EXACTLY
// what they printed before, so this file asserts against those five literals —
// a wrong key or a wrong name then fails here rather than shipping a
// plausible-looking pointer onto a projector. Read back out of the DOM, byte
// for byte, not off the content object: reading the authored value would
// re-state the assumption instead of testing it.
//
// The formatter itself lives in `@/deck/sections` and is exercised below
// against synthetic decks, so a Phase 4 shape can be proved before Phase 4.
//
// ONE EPOCH HOLDS ONE BRAND. `src/variant.ts` resolves `VARIANT` at module
// scope, so a brand's A.1 and its composed deck only exist inside a module
// registry loaded with that brand's `?variant=` in place. `DeckProvider` and
// `SlideNumberProvider` MUST come from that same epoch — a React context is an
// object identity, and an epoch-crossing import would make every `useDeck()`
// throw. Same rule, same reason, as `tests/harvest/deck-numbering.tsx`.
import { afterAll, afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen, act } from "@testing-library/react";
import { HARVESTED_BRANDS, restoreLocation, standardVariantFor } from "../harvest/deck-numbering";
import { composeDeck } from "@/deck/compose";
import { sectionPointerLabel, type SectionKey } from "@/deck/sections";

/** What A.1 printed before its letters were derived — quoted from gh#37, and
 *  the whole point of the ticket is that this list does not move. */
const POINTERS_AS_SHIPPED = [
  "SECTION D · PROCESS & METHODOLOGY",
  "SECTION E · ENGINEERING FUNDAMENTALS",
  "SECTION F · TECHNIQUES",
  "SECTION G · TOOLS ECOSYSTEM",
  "SECTION H · PITFALLS & BEST PRACTICES",
] as const;

/** The card renders the arrow, so the arrow is part of what must not move. */
const ARROW = "→ ";

// ── Rendered, brand by brand ─────────────────────────────────────────────────

interface RenderedA1 {
  /** Raw `textContent`, unnormalized: "byte-identical" has to mean it. */
  pointers: string[];
  /** The questions column's inline opacity — it is MOUNTED at step 0 too, so
   *  text alone reads the same with the reveal fully broken. */
  columnOpacity: string;
  /** `Reveal`'s per-card gate. The column can be at opacity 1 with every card
   *  still held back, which would put the pointers in the DOM and nowhere else. */
  cardsRevealed: boolean[];
}

/** Mounts one brand's own A.1 out of that brand's composed deck, at step 1. */
async function renderA1For(brand: (typeof HARVESTED_BRANDS)[number]): Promise<RenderedA1> {
  const variant = standardVariantFor(brand);
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(`http://localhost:5173/?variant=${variant}`),
  });
  vi.resetModules();

  const [{ composedDeck }, { DeckProvider, useDeck }, { SlideNumberProvider }] = await Promise.all([
    import("@/deck/registry"),
    import("@/deck/DeckContext"),
    import("@/deck/SlideNumberContext"),
  ]);

  // Found in the composed deck rather than imported by name: each brand runs its
  // OWN A.1 module (berau's winners, gems' portfolio, general's familiarity),
  // and the one this brand composes is the one under test.
  const row = composedDeck.slides.find((s) => s.def.id.startsWith("a1"));
  if (!row) throw new Error(`${variant}: no A.1 slide in the composed deck`);

  function AdvanceTo({ step }: { step: number }) {
    const { goTo } = useDeck();
    return <button data-testid="goto" onClick={() => goTo(0, step)} />;
  }

  const { def, letter, num, sectionKey } = row;
  render(
    <DeckProvider stepCounts={[def.steps]}>
      <SlideNumberProvider value={{ letter, num, sectionKey }}>
        <AdvanceTo step={1} />
        {def.render()}
      </SlideNumberProvider>
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  // Mount stagger (220/460/680ms) plus the right column's 650ms gate.
  act(() => {
    vi.advanceTimersByTime(1200);
  });

  return {
    pointers: screen.getAllByTestId("a1-question-pointer").map((el) => el.textContent ?? ""),
    columnOpacity: (screen.getByTestId("a1-questions-column") as HTMLElement).style.opacity,
    cardsRevealed: screen
      .getAllByTestId(/^a1-question-card-/)
      .map((el) => el.classList.contains("on")),
  };
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
afterAll(restoreLocation);

describe.each(HARVESTED_BRANDS)("%s's A.1 agenda pointers", (brand) => {
  test("print byte-identical to the five strings A.1 shipped, and are on screen", async () => {
    const { pointers, columnOpacity, cardsRevealed } = await renderA1For(brand);

    expect(pointers).toEqual(POINTERS_AS_SHIPPED.map((p) => `${ARROW}${p}`));
    // Redundant against the line above only while it passes; it is what names
    // the fault when a key stops resolving.
    pointers.forEach((p) => expect(p).not.toContain("undefined"));

    // Present in the DOM is not the same as visible: the column and every card
    // carry their own gate, and either one can hold the pointers back alone.
    expect(columnOpacity).toBe("1");
    expect(cardsRevealed).toEqual([true, true, true, true, true]);
  });
});

// ── The formatter, against decks that do not exist yet ───────────────────────
//
// Composed with the REAL composer rather than hand-written letter maps: a
// hand-written map can express a deck no `composeDeck` could ever produce — two
// keys on one letter, say — and then prove nothing about the renderer that will
// meet Phase 4.

/** `letterOf` for a deck made of one slide per key, in the order given. */
const letterOfDeckOf = (...keys: SectionKey[]) =>
  composeDeck(keys.map((sectionKey) => ({ sectionKey }))).letterOf;

/** Today's live shape: `process` → D … `pitfalls` → H. `gap`, `invest` and
 *  `mandate` are registered keys this deck does not run. */
const standard = letterOfDeckOf(
  "opening",
  "landscape",
  "mindset",
  "process",
  "fundamentals",
  "techniques",
  "tools",
  "pitfalls",
  "meta",
  "principles",
  "lab",
);

/** A leader-SHAPED deck (§3.6): B/C/D are the leader's own movements, E–J is the
 *  curriculum, K is the mandate — and `process` lands on G, exactly the move
 *  that makes a hardcoded "SECTION D" a lie. Phase 4 picks the real order; what
 *  is proved here is that the renderer follows whatever it picks. */
const leader = letterOfDeckOf(
  "opening",
  "gap",
  "shape",
  "invest",
  "fundamentals",
  "techniques",
  "process",
  "tools",
  "pitfalls",
  "meta",
  "mandate",
);

describe("sectionPointerLabel", () => {
  test("formats one key as SECTION X · NAME", () => {
    expect(sectionPointerLabel(["process"], standard)).toBe("SECTION D · PROCESS & METHODOLOGY");
  });

  test("takes the letter from the deck, so the same pointer moves with it", () => {
    // The row that reads SECTION D in the standard deck reads SECTION G in the
    // leader deck. This is the lie the ticket exists to remove.
    expect(sectionPointerLabel(["process"], leader)).toBe("SECTION G · PROCESS & METHODOLOGY");
  });

  test("formats a run as a range, first letter to last, named after the first key", () => {
    // Phase 4's fourth leader row spans six sections. Its display name is a
    // movement name and stays a literal there; the RANGE is what this proves.
    expect(
      sectionPointerLabel(
        ["fundamentals", "techniques", "process", "tools", "pitfalls", "meta"],
        leader,
      ),
    ).toBe("SECTIONS E–J · ENGINEERING FUNDAMENTALS");
  });

  test("drops a key the deck gives no letter, rather than printing undefined", () => {
    // `gap` and `mandate` are real section keys the standard deck does not run.
    const label = sectionPointerLabel(["gap", "fundamentals", "pitfalls", "mandate"], standard);
    expect(label).toBe("SECTIONS E–H · THE GAP");
    expect(label).not.toContain("undefined");
  });

  test("prints SECTION, singular, when the drop leaves one letter", () => {
    expect(sectionPointerLabel(["invest", "tools"], standard)).toBe("SECTION G · WHY INVEST");
  });

  test("collapses to the name alone when no key resolves at all", () => {
    // Phase 4's floor composes a leader deck where `gap`, `invest` and `mandate`
    // own no slides yet. A pointer at those must still print something true.
    const label = sectionPointerLabel(["gap", "invest"], standard);
    expect(label).toBe("THE GAP");
    expect(label).not.toContain("SECTION");
    expect(label).not.toContain("undefined");
  });
});
