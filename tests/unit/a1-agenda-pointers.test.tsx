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
// AS OF gh#43 THE LEADER DECKS ARE REAL AND ARE ASSERTED HERE TOO. A.1's right
// column is deck-set-scoped: a leader deck prints the five MOVEMENTS (§3.6), and
// a movement that owns no slides prints a name with NO LETTER — the true output,
// and the reason no row may carry a literal letter. Those rows are read out of the
// REAL composed leader deck, not a synthetic one, because a synthetic deck cannot
// show that the deck's own composition is what collapses them.
//
// AS OF gh#53 ONE OF THEM RESOLVES, AND AS OF gh#54 TWO DO. `gap` owns a slide and
// `shape` owns two, so THE GAP and THE SHAPE print their letters and the curriculum
// range behind them shifted one along each time — with no edit to A.1 either time,
// which is the whole claim. So this file holds both halves of the rule against the
// same real decks: a movement with slides prints the letter the composer derived,
// one without prints its name alone.
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
import { VARIANTS, type Brand, type VariantId } from "@/deck-variants";
import { composeDeck } from "@/deck/compose";
import { sectionPointerLabel, type SectionKey } from "@/deck/sections";
import {
  a1Content,
  a1ContentFor,
  a1GemsContent,
  a1GeneralContent,
  type A1Content,
} from "@/slides/opening-section-a/content";

/** What A.1 printed before its letters were derived — quoted from gh#37, and
 *  the whole point of the ticket is that this list does not move. */
const POINTERS_AS_SHIPPED = [
  "SECTION D · PROCESS & METHODOLOGY",
  "SECTION E · ENGINEERING FUNDAMENTALS",
  "SECTION F · TECHNIQUES",
  "SECTION G · TOOLS ECOSYSTEM",
  "SECTION H · PITFALLS & BEST PRACTICES",
] as const;

/**
 * What a leader deck prints TODAY — two movements in, two still to come.
 *
 * IT HAPPENED A SECOND TIME. gh#53 wrote ONE id into one deck-set list and A.1 —
 * which nobody opened — started printing `SECTION B · THE GAP`, because `gap` now
 * owned a slide. gh#54 did exactly the same thing for `shape`, and A.1 started
 * printing `SECTION C · THE SHAPE`. That is gh#43's core claim being paid off for
 * the second time rather than a fixture being maintained: no literal letter exists
 * anywhere in A.1 for either edit to have contradicted, so neither edit could have
 * left this slide behind.
 *
 * Two rows are still a bare name: `invest` and `mandate` own no slides until
 * #55–#58, and a name alone is the honest output. Their letters arrive with their
 * slides, the same way, and this list will shrink again.
 *
 * The curriculum row moved WITH each insert — `SECTIONS B–G` before gh#53, `C–H`
 * after it, `D–I` now. `gap` claims B and `shape` claims C, so the retained
 * standard run `landscape`…`pitfalls` starts two letters later than gh#41 left it.
 * The run itself is unchanged: section F is still cut, and f8 no longer sits inside
 * the TOOLS run but at C.2, inside the `shape` run this row does not span (gh#54).
 * It is also the one row with a `SectionRef.name` — the letters are the deck's, the
 * NAME is the movement's, because no section is called THE CURRICULUM.
 */
const LEADER_POINTERS_TODAY = [
  "SECTION B · THE GAP",
  "SECTION C · THE SHAPE",
  "WHY INVEST",
  "SECTIONS D–I · THE CURRICULUM",
  "THE MANDATE",
] as const;

/** The rows whose movement owns no slide yet, by index — the ones that must print
 *  a name and nothing else. `gap` left this list on gh#53 and `shape` on gh#54. */
const UNRESOLVED_ROWS = [2, 4] as const;

/** §3.6's five movement questions, in order. Read back out of the DOM below. */
const LEADER_QUESTIONS_AS_AUTHORED = [
  "What if your people already use AI where you can't see it?",
  "What if agentic were an operating model, not a project?",
  "What if one team's win became the whole org's baseline?",
  'What if "using AI properly" had an actual curriculum?',
  "What if you knew exactly what to fund first?",
] as const;

/** The card renders the arrow, so the arrow is part of what must not move. */
const ARROW = "→ ";

/** Every leader variant the app serves, derived — a third one is covered by
 *  being registered, not by being added here. */
const LEADER_VARIANTS = (Object.keys(VARIANTS) as VariantId[]).filter(
  (id) => VARIANTS[id].deckSet === "leader",
);

/** The A.1 content block each brand authors — i.e. which A.1 def each brand's
 *  deck resolves to (`BRAND_ALTERNATE_IDS`). The left column of a LEADER deck
 *  must still be this brand's own, which is what the render tests read back. */
const BRAND_CONTENT: Record<Brand, A1Content> = {
  berau: a1Content,
  gems: a1GemsContent,
  general: a1GeneralContent,
};

// ── Rendered, variant by variant ─────────────────────────────────────────────

interface RenderedA1 {
  /** Raw `textContent`, unnormalized: "byte-identical" has to mean it. */
  pointers: string[];
  /** Each card's question line, without its pointer. */
  questions: string[];
  /** The left column's heading and its capability labels — the BRAND half of the
   *  slide, read back to prove a leader deck did not swap it too. */
  leftHeading: string;
  capabilityLabels: string[];
  /** The questions column's inline opacity — it is MOUNTED at step 0 too, so
   *  text alone reads the same with the reveal fully broken. */
  columnOpacity: string;
  /** `Reveal`'s per-card gate. The column can be at opacity 1 with every card
   *  still held back, which would put the pointers in the DOM and nowhere else. */
  cardsRevealed: boolean[];
  /** The letter THIS EPOCH's composed deck gave the `gap` run, or `undefined`
   *  where the deck runs no `gap` slide. Read off the same `composedDeck` the
   *  render used, so the rendered pointer can be compared against the derivation
   *  itself rather than against a letter this file also believes in. */
  gapLetter: string | undefined;
  /** The same, for `shape` — which became a resolving row on gh#54 and so needs
   *  the same treatment. Two rows read this way, not one, because the rule is
   *  "whatever the composer derived" and a single example can be satisfied by a
   *  coincidence. */
  shapeLetter: string | undefined;
}

/** Mounts the A.1 one VARIANT composes, out of that variant's own deck, at step
 *  1. Keyed by variant and not by brand since gh#41: one brand serves two decks,
 *  and since gh#43 the two print different right columns. */
async function renderA1For(variant: VariantId): Promise<RenderedA1> {
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
  // and the one this variant composes is the one under test.
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

  const cards = screen.getAllByTestId(/^a1-question-card-/);
  const leftColumn = screen.getByTestId("a1-capabilities-column");

  return {
    pointers: screen.getAllByTestId("a1-question-pointer").map((el) => el.textContent ?? ""),
    // The question line is the card's `<p>`; the pointer is a sibling `<div>`, so
    // reading the card's whole `textContent` would run the two together.
    questions: cards.map((card) => card.querySelector("p")?.textContent ?? ""),
    // `ColumnHeading` renders the label first, then the copper rule.
    leftHeading: leftColumn.firstElementChild?.textContent ?? "",
    // A capability card is [icon, text block]; the text block's first child is
    // the label and its second (when present) the description.
    capabilityLabels: screen
      .getAllByTestId(/^a1-cap-card-/)
      .map((el) => el.children[1]?.firstElementChild?.textContent ?? ""),
    columnOpacity: (screen.getByTestId("a1-questions-column") as HTMLElement).style.opacity,
    cardsRevealed: cards.map((el) => el.classList.contains("on")),
    gapLetter: composedDeck.letterOf("gap"),
    shapeLetter: composedDeck.letterOf("shape"),
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
    const { pointers, columnOpacity, cardsRevealed } = await renderA1For(
      standardVariantFor(brand),
    );

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

// ── The real leader decks, with two movements filled in (gh#43, gh#53, gh#54) ──

describe.each(LEADER_VARIANTS)("%s's A.1 right column", (variant) => {
  test("prints the five movement questions, in order", async () => {
    const { questions, columnOpacity, cardsRevealed } = await renderA1For(variant);

    expect(questions).toEqual([...LEADER_QUESTIONS_AS_AUTHORED]);
    // Same two gates as the standard decks: mounted is not shown.
    expect(columnOpacity).toBe("1");
    expect(cardsRevealed).toEqual([true, true, true, true, true]);
  });

  test("prints THE GAP's and THE SHAPE's letters, the curriculum range, and two bare names, with no undefined", async () => {
    const { pointers, gapLetter, shapeLetter } = await renderA1For(variant);

    expect(pointers).toEqual(LEADER_POINTERS_TODAY.map((p) => `${ARROW}${p}`));
    pointers.forEach((p) => {
      expect(p).not.toContain("undefined");
      expect(p).not.toContain("SECTION undefined");
    });
    // The unresolved rows print a name and NOTHING else. Asserted separately from
    // the equality above because this is the rule — a row whose section owns no
    // slides may not invent a letter — and the strings are only today's instance
    // of it.
    for (const row of UNRESOLVED_ROWS) {
      expect(pointers[row]).not.toContain("SECTION");
      expect(pointers[row]).not.toContain("·");
    }
    // And the other half of the same rule, which became checkable against a REAL
    // deck on gh#53 for `gap` and on gh#54 for `shape`: a row whose section owns
    // slides prints the letter the composed deck derived for that run. Compared
    // against `letterOf` and not against "B" or "C", so these two assertions
    // survive Phase 6 moving either run, and fail if A.1 ever starts printing a
    // letter of its own invention.
    expect(gapLetter).toBeDefined();
    expect(pointers[0]).toBe(`${ARROW}SECTION ${gapLetter} · THE GAP`);
    expect(shapeLetter).toBeDefined();
    expect(pointers[1]).toBe(`${ARROW}SECTION ${shapeLetter} · THE SHAPE`);
    // The two are adjacent runs and must not collapse onto one letter — which is
    // what a `shape` row wrongly keyed `gap` would look like from here.
    expect(shapeLetter).not.toBe(gapLetter);
    expect(pointers[3]).toContain("SECTIONS");
  });

  test("keeps this brand's own left column", async () => {
    const brand = VARIANTS[variant].brand;
    const { leftHeading, capabilityLabels } = await renderA1For(variant);

    // The BRAND half of a brand × deck-set slide: a leader deck swaps the right
    // column, and swapping the left one with it would show a leader the wrong
    // organisation's proof.
    expect(leftHeading).toBe(BRAND_CONTENT[brand].leftHeading);
    expect(capabilityLabels).toEqual(BRAND_CONTENT[brand].capabilities.map((c) => c.label));
  });
});

// ── The letters fill themselves in — through the RENDERER ─────────────────────
//
// The floor tests above pin one composition, and the formatter tests below pin
// the letters with no renderer in the loop. Neither one alone would catch a
// renderer that stopped asking the deck: today's floor output could be faked by
// a component that printed the names and never a letter, and that fake would
// only be exposed by a deck where the rows DO carry letters.
//
// So this mounts the SAME leader content against the deck Phases 6–7 compose
// (§4.3's order) and expects §3.6's published table, byte for byte. It is the
// ticket's core claim under test: the rows finish themselves when the slides
// land, WITHOUT AN EDIT TO A.1.
//
// The letter table is published directly rather than by loading
// `@/deck/registry` — the registry composes THIS request's deck and would
// overwrite it (`@/deck/section-letters` documents that a later publish wins).

/** §3.6's leader right column, once every movement owns slides. */
const LEADER_POINTERS_WHEN_THE_MOVEMENTS_LAND = [
  "SECTION B · THE GAP",
  "SECTION C · THE SHAPE",
  "SECTION D · WHY INVEST",
  "SECTIONS E–J · THE CURRICULUM",
  "SECTION K · THE MANDATE",
] as const;

test("A.1's leader rows take their letters from the deck that is composed", async () => {
  vi.resetModules();
  const [
    { composeDeck: compose },
    { publishSectionLetters },
    { DeckProvider, useDeck },
    { SlideNumberProvider },
    { A1WhatYouveSeen },
    { a1Content: content, a1ContentFor: contentFor },
  ] = await Promise.all([
    import("@/deck/compose"),
    import("@/deck/section-letters"),
    import("@/deck/DeckContext"),
    import("@/deck/SlideNumberContext"),
    import("@/slides/opening-section-a/a1-what-youve-seen"),
    import("@/slides/opening-section-a/content"),
  ]);

  // §4.3's leader deck: the four movements in front of the curriculum, THE
  // MANDATE at K, `meta`/`principles`/`lab` behind it. Composed by the real
  // composer, so it is a shape `composeDeck` could actually produce.
  publishSectionLetters(
    compose(
      (
        [
          "opening",
          "gap",
          "shape",
          "invest",
          "landscape",
          "mindset",
          "process",
          "fundamentals",
          "tools",
          "pitfalls",
          "mandate",
          "meta",
          "principles",
          "lab",
        ] as SectionKey[]
      ).map((sectionKey) => ({ sectionKey })),
    ).letterOf,
  );

  function AdvanceTo({ step }: { step: number }) {
    const { goTo } = useDeck();
    return <button data-testid="goto" onClick={() => goTo(0, step)} />;
  }

  render(
    <DeckProvider stepCounts={[3]}>
      <SlideNumberProvider value={{ letter: "A", num: 1, sectionKey: "opening" }}>
        <AdvanceTo step={1} />
        <A1WhatYouveSeen content={contentFor(content, "leader")} />
      </SlideNumberProvider>
    </DeckProvider>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
  act(() => {
    vi.advanceTimersByTime(1200);
  });

  expect(screen.getAllByTestId("a1-question-pointer").map((el) => el.textContent)).toEqual(
    LEADER_POINTERS_WHEN_THE_MOVEMENTS_LAND.map((p) => `${ARROW}${p}`),
  );
});

// ── The deck-set delta, as authored (§4.4 slot 1) ────────────────────────────

describe("a1ContentFor", () => {
  test("hands a standard deck set the brand's own block, by identity", () => {
    // Not merely equal: the three middle-management A.1s must be the SAME objects
    // they were before gh#43, so nothing downstream can drift from them.
    for (const content of Object.values(BRAND_CONTENT)) {
      expect(a1ContentFor(content, "standard")).toBe(content);
    }
  });

  test("keeps every brand's left column by identity on a leader deck set", () => {
    for (const content of Object.values(BRAND_CONTENT)) {
      const leader = a1ContentFor(content, "leader");
      expect(leader.capabilities).toBe(content.capabilities);
      expect(leader.leftHeading).toBe(content.leftHeading);
      expect(leader.figLabel).toBe(content.figLabel);
      expect(leader.slideTitle).toBe(content.slideTitle);
    }
  });

  test("gives the leader agenda its OWN array and does not mutate the shared one", () => {
    // TRAP 4: `questions` is shared BY REFERENCE across all three brands, so an
    // in-place edit would ship the leader agenda to both middle-management decks.
    const leader = a1ContentFor(a1Content, "leader");
    expect(leader.questions).not.toBe(a1Content.questions);
    expect(a1Content.questions).toBe(a1GemsContent.questions);
    expect(a1Content.questions).toBe(a1GeneralContent.questions);
    expect(a1Content.questions.map((q) => q.sectionRef.keys)).toEqual([
      ["process"],
      ["fundamentals"],
      ["techniques"],
      ["tools"],
      ["pitfalls"],
    ]);
  });

  test("shares one leader agenda, tagline and footer across every brand", () => {
    // Deck-set-scoped, not brand-scoped: berau-leader and gems-leader read the
    // same three, so a reword cannot reach one leader deck and miss the other.
    // `general` is included even though it has no leader variant registered — if
    // one is ever registered it must take the same three, not a fourth wording.
    const [first, ...rest] = Object.values(BRAND_CONTENT).map((c) => a1ContentFor(c, "leader"));
    for (const other of rest) {
      expect(other.questions).toBe(first.questions);
      expect(other.tagline).toBe(first.tagline);
      expect(other.footerCaption).toBe(first.footerCaption);
    }
  });

  test("points the five leader rows at the five movements, the fourth at the curriculum run", () => {
    expect(a1ContentFor(a1Content, "leader").questions.map((q) => q.sectionRef)).toEqual([
      { keys: ["gap"] },
      { keys: ["shape"] },
      { keys: ["invest"] },
      {
        keys: ["landscape", "mindset", "process", "fundamentals", "tools", "pitfalls"],
        name: "THE CURRICULUM",
      },
      { keys: ["mandate"] },
    ]);
  });

  test("hardcodes no section letter, in any authored leader string", () => {
    // The whole argument of §3.6: a letter in authored copy is a lie the moment a
    // phase moves a section. Covers the `name` override too — it may name a
    // MOVEMENT and must not name a position.
    const leader = a1ContentFor(a1Content, "leader");
    const authored = [
      leader.tagline,
      leader.footerCaption,
      ...leader.questions.flatMap((q) => [q.text, q.sectionRef.name ?? ""]),
    ];
    for (const s of authored) {
      expect(s, s).not.toMatch(/\bSECTIONS?\s+[A-Z]\b/);
    }
  });

  test("every leader keyword is a substring of the copy it highlights", () => {
    // `highlight()` is a `String.includes` match that NO-OPS SILENTLY (trap 5):
    // a typo drops a copper highlight with no error anywhere.
    const leader = a1ContentFor(a1Content, "leader");
    const pairs: [string, string, readonly string[]][] = [
      ["tagline", leader.tagline, leader.taglineKw],
      ["footerCaption", leader.footerCaption, leader.footerCaptionKw],
      ...leader.questions.map(
        (q, i) => [`question ${i + 1}`, q.text, q.kw] as [string, string, readonly string[]],
      ),
    ];
    for (const [where, text, keywords] of pairs) {
      for (const k of keywords) {
        expect(text.includes(k), `${where}: ${JSON.stringify(k)} not in ${JSON.stringify(text)}`).toBe(
          true,
        );
      }
    }
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
    expect(sectionPointerLabel({ keys: ["process"] }, standard)).toBe(
      "SECTION D · PROCESS & METHODOLOGY",
    );
  });

  test("takes the letter from the deck, so the same pointer moves with it", () => {
    // The row that reads SECTION D in the standard deck reads SECTION G in the
    // leader deck. This is the lie the ticket exists to remove.
    expect(sectionPointerLabel({ keys: ["process"] }, leader)).toBe(
      "SECTION G · PROCESS & METHODOLOGY",
    );
  });

  test("formats a run as a range, first letter to last, named after the first key", () => {
    expect(
      sectionPointerLabel(
        { keys: ["fundamentals", "techniques", "process", "tools", "pitfalls", "meta"] },
        leader,
      ),
    ).toBe("SECTIONS E–J · ENGINEERING FUNDAMENTALS");
  });

  test("drops a key the deck gives no letter, rather than printing undefined", () => {
    // `gap` and `mandate` are real section keys the standard deck does not run.
    const label = sectionPointerLabel(
      { keys: ["gap", "fundamentals", "pitfalls", "mandate"] },
      standard,
    );
    expect(label).toBe("SECTIONS E–H · THE GAP");
    expect(label).not.toContain("undefined");
  });

  test("prints SECTION, singular, when the drop leaves one letter", () => {
    expect(sectionPointerLabel({ keys: ["invest", "tools"] }, standard)).toBe(
      "SECTION G · WHY INVEST",
    );
  });

  test("collapses to the name alone when no key resolves at all", () => {
    // Phase 4's floor composes a leader deck where `gap`, `invest` and `mandate`
    // own no slides yet. A pointer at those must still print something true.
    const label = sectionPointerLabel({ keys: ["gap", "invest"] }, standard);
    expect(label).toBe("THE GAP");
    expect(label).not.toContain("SECTION");
    expect(label).not.toContain("undefined");
  });

  // ── The display-name override (gh#43) ──────────────────────────────────────

  test("prefers an authored name over the first key's, and keeps the range", () => {
    // The leader curriculum row: the letters are the deck's, the name is the
    // MOVEMENT's — no section is called THE CURRICULUM.
    expect(
      sectionPointerLabel(
        {
          keys: ["fundamentals", "techniques", "process", "tools", "pitfalls", "meta"],
          name: "THE CURRICULUM",
        },
        leader,
      ),
    ).toBe("SECTIONS E–J · THE CURRICULUM");
  });

  test("overrides the name even where the pointer collapses to it", () => {
    expect(sectionPointerLabel({ keys: ["gap"], name: "THE CURRICULUM" }, standard)).toBe(
      "THE CURRICULUM",
    );
  });

  test("overrides nothing but the name — a single key still reads SECTION X", () => {
    expect(sectionPointerLabel({ keys: ["process"], name: "THE CURRICULUM" }, standard)).toBe(
      "SECTION D · THE CURRICULUM",
    );
  });
});
