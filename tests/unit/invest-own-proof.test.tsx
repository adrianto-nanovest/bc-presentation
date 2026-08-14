// THEIR OWN PROOF · slide tests. Both poses, all three brands.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so nothing here
// measures a pixel a browser would place — every geometric claim is asserted as
// the ONE NUMBER both sides read (`../../src/slides/leader-invest/geometry.ts`),
// and the rendered composition is walked at 1280×720 in a real engine separately
// (`scripts/d2-figure-verify.mjs`). What jsdom is good for is the four things
// this slide is actually at risk of:
//
//   1. A FIGURE THAT MOVED. Seven numbers — GEMS' four and Berau's three — are
//      quoted from two outside records (§6.7). "+90%" becoming "+9%", or an en dash
//      becoming a hyphen, is a review-proof edit and a projector-proof one; it is a
//      string comparison here.
//   2. A FIGURE THAT LOST ITS EPISTEMIC MARK. The issue is explicit that the
//      label is COPY and not a footnote to be trimmed, and the failure this
//      slide can cause is a claim presented as audited in a room with
//      compliance obligations. Held below as a RULE over every rendered string
//      rather than as a spot check on the one line that carries the negation.
//   3. A FIGURE THAT LOST ITS WIRE. Since the 2026-08-14 redraw the slide's picture
//      IS its argument: one plate, one branch per figure, one node per branch. A card
//      that renders without the wire that says where it came from is a number on a
//      stage with no provenance drawn — so the harness is asserted per figure, by id.
//   4. THE THESIS DRIFTING. Three carriers print one sentence (§4.5). Two of
//      them are in another module, so the identity is asserted across all three
//      in one place — here — because that is the only place all three are
//      importable at once.
//
// ALL THREE BRANDS IN ONE EPOCH. The figure reads no `VARIANT` — the slide file
// resolves the block once at module scope and hands it down as a prop (§4.4 slot
// 3) — so three dossiers mount side by side in this one module registry. A test
// that had to re-point `window.location` per brand could not compare them, and
// comparing them is how "no brand inherits another organisation's evidence" is
// checked at all.
//
// WHAT THE REDRAW CHANGED ABOUT THIS FILE. The reveal primitive moved: the figure used
// to arrive one pose at a time through `.fade`/`.fade.on`, and now arrives on mount
// through the one-shot keyframes in
// `../../src/slides/leader-invest/components/own-proof.css`. So "has this beat arrived"
// is no longer a class list check — it is the ENTRANCE CLASS plus an `animationDelay`,
// and the one box still on `.fade` is the thesis, which is the only box with a real
// pose transition. {@link entered} and {@link revealed} are the two readers, and using
// the wrong one on the wrong box fails loudly rather than passing vacuously.
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  InvestOwnProof,
  investOwnProofSlide,
} from "@/slides/leader-invest/invest-own-proof";
import {
  EPISTEMIC_MARKS,
  NOT_AUDITED,
  investOwnProofContent,
  ownProofFor,
  type OwnProofBlock,
} from "@/slides/leader-invest/content";
import {
  ATTRIBUTION_HEIGHT,
  ATTRIBUTION_TOP,
  BAND_BOTTOM,
  BAND_HEIGHT,
  BAND_TOP,
  BRANCH_LENGTH,
  CARD_GAP,
  CARD_HEIGHT,
  CARD_LEFT,
  CARD_PAD_X,
  CARD_PITCH,
  CARD_WIDTH,
  CHAIN_GAP,
  CHAIN_ROW_WIDTH,
  CHAIN_Y,
  CONTENT_RIGHT,
  CONTENT_WIDTH,
  FIGURE_BUDGET_W,
  LEADER_MIN_W,
  MARK_COL_W,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  NO_PROOF_TOP,
  ORIGIN_Y,
  ROW_CAPACITY,
  RULE_HEIGHT,
  RULE_TOP,
  SIDE_MARGIN,
  SOURCE_BOTTOM_PAD,
  SOURCE_HEIGHT,
  SOURCE_LEFT,
  SOURCE_NAME_HEIGHT,
  SOURCE_NAME_TOP,
  SOURCE_PAD,
  SOURCE_RIGHT,
  SOURCE_TOP,
  SOURCE_WIDTH,
  SPINE_X,
  STAGE,
  THESIS_HEIGHT,
  THESIS_TOP,
  TRUNK_LENGTH,
  cardTop,
  chainY,
  spineHeight,
  spineTop,
  stackHeight,
  stackTop,
} from "@/slides/leader-invest/geometry";
import { POSE, STEP_COUNT, THESIS_POSE } from "@/slides/leader-invest/own-proof-walk";
// The other two carriers of the thesis (§4.5). Imported so the byte-identity is
// a comparison and not a comment: the cover authored the line, A.1 quotes it,
// and this slide prints it.
import {
  LEADER_THESIS_LINE,
  LEADER_THESIS_LINE_KW,
  LEADER_THESIS_OPENER,
  a1Content,
  a1ContentFor,
  titleContentFor,
} from "@/slides/opening-section-a/content";
import { BRANDS, type Brand } from "@/deck-variants";

const C = investOwnProofContent;
const POSES = [0, 1] as const;

/**
 * The position this slide holds in the deck it actually composes into.
 *
 * `at` IS required here, and it is the one case `SlideHarness` documents: unit
 * tests resolve the default `general` deck, `general` has no leader variant, and
 * this slide reaches the two leader deck sets ALONE. So there is no derived
 * position to look up — which is itself the fact `deck-numbering-fixture` and
 * `deck-registry` prove, from the decks that do run it.
 *
 * D.2 SINCE gh#70, AND §6.7's OWN D.2 AT LAST. This read D.1 from gh#56 until gh#70, and
 * the reason it read D.1 was stated here as "no slide sits in front of this one in the
 * `invest` run: §6.7's D.1, `invest-base-rates`, is unbuilt". It is built — #70 built it,
 * at the run's HEAD — so this slide is that run's SECOND row and derives D.2, the number
 * §6.7 gave it in the first place. NOT ONE LINE OF THIS SLIDE WAS OPENED to make that
 * happen; the composer moved the number, which is the whole of §3.5's point.
 *
 * Neither the letter nor the number is authored in the slide (§3.5), so this is a harness
 * input and not a claim the slide makes — and it is the number the two leader decks
 * actually derive, which `tests/fixtures/deck-numbering.json` records for both.
 */
const AT = { letter: "D", num: 2, sectionKey: "invest" } as const;

/** One button per pose, so a test can WALK the slide inside one mounted tree. */
function Nav() {
  const { goTo } = useDeck();
  return (
    <>
      {POSES.map((s) => (
        <button key={s} data-testid={`goto-${s}`} onClick={() => goTo(0, s)} />
      ))}
    </>
  );
}

function renderProof(content: OwnProofBlock, pose = 0) {
  const out = render(
    <SlideHarness def={investOwnProofSlide} at={AT}>
      <Nav />
      <InvestOwnProof content={content} />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

const gems = ownProofFor("gems");
const berau = ownProofFor("berau");
const general = ownProofFor("general");

/**
 * Has a BUILT box arrived? — the reader for everything except the thesis.
 *
 * A built box carries one of `./own-proof.css`'s `op-` classes and an
 * `animationDelay`; the hidden branch carries neither and an inline `opacity: 0`. The
 * two are asserted TOGETHER because either one alone can be true by accident: a class
 * with no delay is a box that arrives on the same frame as everything else, and a delay
 * with no class is a box that never animates at all.
 */
function entered(id: string): boolean {
  const el = screen.getByTestId(id);
  return /\bop-[a-z-]+\b/.test(el.className) && el.style.animationDelay !== "";
}

/** Has the one `.fade` box — the thesis — been revealed? Its class list is the pose. */
function revealed(id: string): boolean {
  return screen.getByTestId(id).classList.contains("on");
}

/**
 * Every brand the app REGISTERS, from `BRANDS` and not from the slide's own
 * table — which is why that table is not exported. A rule held over the keys of
 * the thing being checked proves the thing equals itself; held over `BRANDS` it
 * proves the pick answers for every brand that can actually reach a deck.
 */
const REGISTERED_BRANDS = Object.keys(BRANDS) as Brand[];

/** Narrowed once, so every figures-only assertion below reads the rows without
 *  re-narrowing — and so a brand that lost its figures fails HERE, by name,
 *  rather than as a type error inside an unrelated test. */
function figuresOf(block: OwnProofBlock, brand: string) {
  if (block.kind !== "figures") {
    throw new Error(`${brand} was expected to carry figures, and carries "${block.kind}"`);
  }
  return block;
}

/**
 * The words this slide may never use about a figure.
 *
 * `\b`-anchored so "auditing" and "independently" are caught and "auditorium"
 * is not the point — nothing on this slide is close to a false positive, and the
 * cost of one is a failing test with the offending string in the message.
 */
const AUDIT_WORDS =
  /\b(audit|audits|audited|auditing|auditor|independent|independently|verified|verify|verifiable|validated|certified|assured)\b/i;

/**
 * The ONE construction those words are allowed to appear inside, removed before
 * the rule above is applied.
 *
 * Read off the content module rather than retyped, so the phrase the copy is
 * composed from is the phrase this rule exempts. A reword that drops the "not"
 * changes `NOT_AUDITED`, the strip stops matching, and the words are left
 * standing in a string the rule then fails on — which is the failure worth
 * catching.
 */
function stripAllowedNegation(text: string): string {
  return text.split(NOT_AUDITED).join(" · ");
}

/** Every string this slide's content module authors, for every brand — the input
 *  to the copy-wide rules. */
function authoredStrings(): string[] {
  return [
    C.figLabel,
    C.headline,
    C.sourceCaption,
    C.closer,
    ...REGISTERED_BRANDS.flatMap((brand) => {
      const block = ownProofFor(brand);
      return block.kind === "figures"
        ? [
            block.eyebrow,
            block.attribution,
            ...block.figures.flatMap((f) => [f.figure, f.metric, f.mark]),
          ]
        : [block.line];
    }),
  ];
}

// ── the def ──────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, two steps, closing on the fullest pose", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins
    // the value).
    expect(investOwnProofSlide.id).toBe("invest-own-proof");

    // TWO SINCE 2026-08-14, AND THE THIRD IS GONE ON PURPOSE. The shipped walk spent
    // pose 0 on a headline and an eyebrow — a click that showed nothing, in front of a
    // room, because the headline is already up before the first step. The evidence now
    // arrives whole at pose 0 and the thesis keeps a pose of its own.
    expect(investOwnProofSlide.steps).toBe(2);
    expect(investOwnProofSlide.steps).toBe(STEP_COUNT);
    expect(POSE).toEqual({ DOSSIER: 0, THESIS: 1 });

    // The exports print `canonicalPose` and nothing else, so a canonical pose
    // short of the last one would ship a PDF of a company's own figures with the
    // sentence they are evidence for missing.
    expect(investOwnProofSlide.canonicalPose).toBe(THESIS_POSE);
    expect(investOwnProofSlide.canonicalPose).toBe(investOwnProofSlide.steps - 1);
    expect(investOwnProofSlide.sectionKey).toBe("invest");
    expect(investOwnProofSlide.animationMode).toBe("step-reveal");
    expect(investOwnProofSlide.surface).toBe("dark");
  });
});

// ── the shared half of the copy ──────────────────────────────────────────────

describe("the argument the slide opens on", () => {
  test("states the premise, in words a room does not have to decode", () => {
    renderProof(gems, 0);

    // ONE HEADLINE FOR ALL THREE BRANDS, and it is the PREMISE rather than the
    // turn. A second clause naming their own company — "…this one is yours" —
    // would be false under `general`, which names no organisation, and the
    // shared line would then be a lie on its own slide. That is the same
    // reasoning that puts the ladder's closer on the brand axis in
    // `src/slides/leader-gap/content.ts`; the turn is made by the plate and
    // the cards, which ARE on the axis.
    //
    // REWORDED TWICE ON 2026-08-14. It read "An outsider's case study is easy to
    // discount." — "discount" as a verb meaning "treat as worth less", and three
    // abstractions before the sentence had a subject — and then "Someone else's
    // numbers are easy to ignore.", which fixed the vocabulary and kept the shape:
    // a negative about people who are not in the room, which the room has to invert
    // before the dossier means anything. It states the rule in the POSITIVE now, and
    // the plate is its answer. `../../src/slides/leader-invest/content.ts` carries the
    // argument. PINNED AS A LITERAL because it is signed-off copy: reading it off the
    // module would assert only that the module equals itself.
    expect(C.headline).toBe("The only numbers a leader trusts are their own.");
    expect(screen.getByRole("heading").textContent).toBe(C.headline);

    // AND IT STAYS SHORT. The display face sets this row at 40px on one line; the two
    // wordings it replaced were 44 and 42 characters and this is 47, which is still
    // inside the budget — `scripts/d2-figure-verify.mjs` measures the rendered row,
    // because a character count is not a width.
    expect(C.headline.length).toBeLessThanOrEqual(48);

    for (const name of ["GEMS", "GEMVIS", "Berau", "MineTech", "DigiTech"]) {
      expect(C.headline, name).not.toContain(name);
      expect(C.figLabel, name).not.toContain(name.toUpperCase());
    }
    expect(C.headline).not.toMatch(/\d/);
  });

  test("names whose proof it is, inside the source plate, from the first frame", () => {
    // POSE 0 IS THE WHOLE ARGUMENT, and the argument is incomplete without "whose".
    // The plate is the only place that answers it — and it answers it under its own
    // caption, which is what stops the name reading as a second headline.
    const first = renderProof(gems, 0);
    expect(screen.getByTestId("invest-eyebrow").textContent).toBe(
      "GEMVIS · GEMS' OWN PLATFORM",
    );
    expect(screen.getByTestId("invest-source-caption").textContent).toBe(
      "WHOSE PROOF THIS IS",
    );
    expect(screen.getByTestId("invest-source-plate")).toContainElement(
      screen.getByTestId("invest-eyebrow"),
    );
    first.unmount();

    renderProof(berau, 0);
    expect(screen.getByTestId("invest-eyebrow").textContent).toBe(
      "VOL-1 WINNERS · BERAU COAL'S OWN TEAMS",
    );
    // Mono, and shouted by the register rather than by a second casing of the
    // data — the same rule every label on the two sibling leader slides follows.
    const eyebrow = screen.getByTestId("invest-eyebrow");
    expect(eyebrow.style.fontFamily).toBe("var(--mono)");
    expect(eyebrow.style.textTransform).toBe("uppercase");
    // The caption keeps the 11px `--copper-400` mono caps LABEL tier the two sibling
    // figures in this directory cite this file for; the NAME is a tier above it now.
    expect(screen.getByTestId("invest-source-caption").style.color).toBe("var(--copper-400)");
    expect(eyebrow.style.color).toBe("var(--copper-200)");
  });

  test("puts every figure on the stage at pose 0, and only the thesis waits", () => {
    renderProof(gems, 0);
    const { figures } = figuresOf(gems, "gems");

    // THE WHOLE DOSSIER, BUILT — plate, harness, every card and the citation, each
    // with its own delay. A room reads a set of figures the way it reads a table.
    expect(entered("invest-source-plate")).toBe(true);
    expect(entered("invest-origin")).toBe(true);
    expect(entered("invest-trunk")).toBe(true);
    expect(entered("invest-spine")).toBe(true);
    for (const f of figures) {
      expect(entered(`invest-row-${f.id}`), f.id).toBe(true);
      expect(entered(`invest-figure-${f.id}`), f.id).toBe(true);
      expect(entered(`invest-mark-${f.id}`), f.id).toBe(true);
    }
    expect(entered("invest-attribution")).toBe(true);

    // AND THE ONE THING THAT HAS NOT ARRIVED is the sentence the evidence is evidence
    // FOR. It is the only box on the stage still on the deck's `.fade` primitive,
    // because it is the only one with a real pose transition.
    expect(revealed("invest-closer")).toBe(false);
  });

  test("builds in the order the argument runs — owner, wire, card, mark", () => {
    // THE DELAYS ARE THE ARGUMENT'S ORDER, and they are the one thing a still frame
    // cannot carry. The plate lands before the harness that leaves it, the harness
    // before the card it reaches, and the card before the mark stamped onto it.
    renderProof(berau, 0);
    const { figures } = figuresOf(berau, "berau");
    const at = (id: string) => parseFloat(screen.getByTestId(id).style.animationDelay);

    expect(at("invest-source-plate")).toBeLessThan(at("invest-eyebrow"));
    expect(at("invest-eyebrow")).toBeLessThan(at("invest-origin"));
    expect(at("invest-origin")).toBeLessThan(at("invest-trunk"));
    expect(at("invest-trunk")).toBeLessThan(at("invest-spine"));

    figures.forEach((f, i) => {
      expect(at(`invest-branch-${f.id}`), f.id).toBeLessThan(at(`invest-row-${f.id}`));
      expect(at(`invest-row-${f.id}`), f.id).toBeLessThan(at(`invest-figure-${f.id}`));
      expect(at(`invest-figure-${f.id}`), f.id).toBeLessThan(at(`invest-leader-${f.id}`));
      expect(at(`invest-leader-${f.id}`), f.id).toBeLessThan(at(`invest-mark-${f.id}`));
      // TOP TO BOTTOM, and never two cards on the same frame: a stack that arrived at
      // once is a table appearing, not a dossier being read.
      if (i > 0) {
        expect(at(`invest-row-${f.id}`), f.id).toBeGreaterThan(
          at(`invest-row-${figures[i - 1].id}`),
        );
      }
    });

    // THE CITATION IS LAST. A source line that appeared before the figures it sources
    // would answer a question the room had not asked yet.
    const lastRow = figures[figures.length - 1];
    expect(at("invest-attribution")).toBeGreaterThan(at(`invest-mark-${lastRow.id}`));
  });
});

// ── the harness, which is what the redraw added ──────────────────────────────

describe("every figure is wired to the plate that owns it", () => {
  test("one branch and one node per figure, and no spare wire", () => {
    // THE PICTURE IS THE ARGUMENT (§6.7): these numbers are not an outsider's. A card
    // with no wire is a number with no provenance drawn, and a wire with no card is a
    // claim about a figure that is not on the stage.
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { figures } = figuresOf(block, name);
      const { unmount } = renderProof(block, 0);

      expect(screen.getAllByTestId(/^invest-branch-/), name).toHaveLength(figures.length);
      expect(screen.getAllByTestId(/^invest-node-/), name).toHaveLength(figures.length);
      figures.forEach((f, i) => {
        // EVERY PART OF ONE CARD'S CHAIN SITS ON ONE LINE — the branch, the node it
        // lands on and the card's own chain row. That shared y is what makes the
        // drawing readable as "this owner · this number · this is how we know it".
        const y = chainY(i, figures.length);
        expect(
          parseFloat(screen.getByTestId(`invest-branch-${f.id}`).style.top),
          `${name} · ${f.id} branch`,
        ).toBe(y);
        expect(
          parseFloat(screen.getByTestId(`invest-node-${f.id}`).style.top) +
            parseFloat(screen.getByTestId(`invest-node-${f.id}`).style.height) / 2,
          `${name} · ${f.id} node`,
        ).toBe(y);
        expect(
          parseFloat(screen.getByTestId(`invest-row-${f.id}`).style.top) + CHAIN_Y,
          `${name} · ${f.id} card`,
        ).toBe(y);
      });
      unmount();
    }
  });

  test("the harness leaves the plate on one line and the spine spans exactly the branches", () => {
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { figures } = figuresOf(block, name);
      const count = figures.length;
      const { unmount } = renderProof(block, 0);

      const trunk = screen.getByTestId("invest-trunk");
      expect(parseFloat(trunk.style.left), name).toBe(SOURCE_RIGHT);
      expect(parseFloat(trunk.style.top), name).toBe(ORIGIN_Y);
      expect(parseFloat(trunk.style.width), name).toBe(TRUNK_LENGTH);

      const spine = screen.getByTestId("invest-spine");
      expect(parseFloat(spine.style.left), name).toBe(SPINE_X);
      // A SPINE THAT OVERSHOT ITS OUTERMOST BRANCH would draw a wire going somewhere
      // the stage does not, which on a slide about provenance is the wrong suggestion.
      expect(parseFloat(spine.style.top), name).toBe(chainY(0, count));
      expect(
        parseFloat(spine.style.top) + parseFloat(spine.style.height),
        name,
      ).toBe(chainY(count - 1, count));

      unmount();
    }
  });

  test("the origin sits at the mean of the chain lines, under either count", () => {
    // THE ONE INVARIANT THE TWO DECKS SHARE. The stack is centred in the band, so the
    // mean of the chain lines is the same number whether there are three cards or
    // four — which is why the trunk is horizontal in both rooms and the plate can have
    // a fixed shelf. Asserted as the property, not by re-running the formula.
    for (let count = 1; count <= ROW_CAPACITY; count++) {
      const lines = Array.from({ length: count }, (_, i) => chainY(i, count));
      const mean = (lines[0] + lines[count - 1]) / 2;
      expect(mean, `${count} cards`).toBe(ORIGIN_Y);
    }
  });
});

// ── GEMS' four figures (§6.7, §4.4 slot 3) ───────────────────────────────────

describe("GEMS renders GEMVIS' four figures", () => {
  test("all four, verbatim, in order", () => {
    renderProof(gems, 0);
    const { figures } = figuresOf(gems, "gems");

    // VERBATIM AND PINNED AS LITERALS. These four numbers are quoted from an
    // outside record (§6.7) and are the AC of the issue; recomputing the
    // expectation from the content module would assert only that the module
    // equals itself, and "+90%" losing a zero is invisible in review.
    expect(figures.map((f) => f.figure)).toEqual([
      "+90%",
      "2 days → under 1 hour",
      "50+",
      "4,000+",
    ]);
    expect(figures.map((f) => f.metric)).toEqual([
      "Executive decision speed",
      "Multi-operational retrieval",
      "Application portfolios",
      "Users on the platform",
    ]);

    // Read back out of the DOM, both cells: a figure rendered without what it
    // measures is a number a leader cannot use.
    figures.forEach((f) => {
      expect(screen.getByTestId(`invest-figure-${f.id}`).textContent, f.id).toBe(f.figure);
      expect(screen.getByTestId(`invest-metric-${f.id}`).textContent, f.id).toBe(f.metric);
    });
    expect(screen.getAllByTestId(/^invest-row-/)).toHaveLength(4);
  });

  test("each one marked vendor-reported, on the card itself", () => {
    renderProof(gems, 0);
    const { figures } = figuresOf(gems, "gems");

    // PER CARD, not once per set. A leader reading one line out loud reads its
    // provenance with it, and a card that gets copied into a status deck takes
    // the mark along.
    figures.forEach((f) => {
      expect(f.mark, f.id).toBe("vendor-reported");
      expect(screen.getByTestId(`invest-mark-${f.id}`).textContent, f.id).toBe(
        "vendor-reported",
      );
    });
  });

  test("with an on-slide attribution naming the vendor-reported customer story", () => {
    renderProof(gems, 0);
    const { attribution } = figuresOf(gems, "gems");

    // THE ISSUE'S AC, ON THE SLIDE AND NOT IN A FOOTNOTE. Three things have to
    // be in it: who published the numbers, that it is a customer story, and that
    // it is the vendor's own report.
    expect(screen.getByTestId("invest-attribution").textContent).toBe(attribution);
    expect(attribution).toContain("Google Cloud");
    expect(attribution).toContain("customer story");
    expect(attribution).toContain("vendor-reported");
    expect(attribution).toContain(NOT_AUDITED);
  });
});

// ── Berau's three ranges (§6.7, §4.4 slot 3) ─────────────────────────────────

describe("Berau renders the Vol-1 winners' three ranges", () => {
  test("all three, verbatim, with the en dash and never a hyphen", () => {
    renderProof(berau, 0);
    const { figures } = figuresOf(berau, "berau");

    expect(figures.map((f) => f.figure)).toEqual([
      "IDR 135–155M",
      "IDR 35–38M",
      "IDR 200–700M",
    ]);
    expect(figures.map((f) => f.metric)).toEqual([
      "One-click production status",
      "Document and knowledge automation",
      "Geospatial safety evaluator",
    ]);

    figures.forEach((f) => {
      // THE EN DASH, U+2013, exactly as `RANGE_DASH` in `src/deck/sections.ts`
      // documents for every other range in the deck: a hyphen is
      // indistinguishable in a code review and obvious on a projector.
      expect(f.figure, f.id).toContain("–");
      expect(f.figure, f.id).not.toMatch(/\d-\d/);
    });

    expect(screen.getAllByTestId(/^invest-row-/)).toHaveLength(3);
    figures.forEach((f) => {
      expect(screen.getByTestId(`invest-figure-${f.id}`).textContent, f.id).toBe(f.figure);
    });
  });

  test("each of the three marked participant-claimed", () => {
    renderProof(berau, 0);
    const { figures, attribution } = figuresOf(berau, "berau");

    // THE ISSUE'S AC, word for word: EACH of the three ranges carries the mark.
    figures.forEach((f) => {
      expect(f.mark, f.id).toBe("participant-claimed");
      expect(screen.getByTestId(`invest-mark-${f.id}`).textContent, f.id).toBe(
        "participant-claimed",
      );
    });
    expect(attribution).toContain("participant-claimed");
    expect(attribution).toContain(NOT_AUDITED);
    // AND THE PERIOD IS ON THE SLIDE. The ranges are annual impact (§6.7) and
    // the figures themselves are quoted verbatim, so the one place that can say
    // so without editing a quoted number is the line under them.
    expect(attribution).toContain("annual");
  });
});

// ── the epistemic mark, as a type and as a chip ──────────────────────────────

describe("the epistemic mark", () => {
  test("is a closed union, and both of its members are in use", () => {
    // A CLOSED UNION AND NOT A `string`. A free-text mark is a mark an author can
    // spell "vendor reported", which then renders as a chip nobody greps for and
    // matches no rule in this file. Both members are asserted in use, so the
    // union cannot quietly grow a member no card carries.
    expect([...EPISTEMIC_MARKS]).toEqual(["vendor-reported", "participant-claimed"]);

    const used = new Set(
      REGISTERED_BRANDS.flatMap((brand) => {
        const block = ownProofFor(brand);
        return block.kind === "figures" ? block.figures.map((f) => f.mark) : [];
      }),
    );
    expect([...used].sort()).toEqual([...EPISTEMIC_MARKS].sort());
  });

  test("rides on EVERY figure, under every brand that has figures", () => {
    // THE STRUCTURAL HALF of "the label is part of the copy". Held over every
    // brand rather than over the two the decks compose, because the rule is a
    // property of the type and not of today's two blocks.
    for (const brand of REGISTERED_BRANDS) {
      const block = ownProofFor(brand);
      if (block.kind !== "figures") continue;
      const { unmount } = renderProof(block, 0);

      expect(screen.getAllByTestId(/^invest-mark-/), brand).toHaveLength(
        block.figures.length,
      );
      block.figures.forEach((f) => {
        const chip = screen.getByTestId(`invest-mark-${f.id}`);
        expect(chip.textContent, `${brand} · ${f.id}`).toBe(f.mark);
        expect([...EPISTEMIC_MARKS], `${brand} · ${f.id}`).toContain(f.mark);
      });
      unmount();
    }
  });

  test("prints the union's own value, in the mono label register, at the end of a leader", () => {
    renderProof(gems, 0);
    const { figures } = figuresOf(gems, "gems");
    const chip = screen.getByTestId(`invest-mark-${figures[0].id}`);

    // THE CHIP'S COPY IS THE UNION'S VALUE, stored in the lower case the issue
    // and §6.7 write it in and shouted by the register — so a new mark cannot be
    // added without its own copy arriving with it, and every quotation of the
    // mark in the issue, the spec and this file stays greppable.
    expect(chip.style.fontFamily).toBe("var(--mono)");
    expect(chip.style.textTransform).toBe("uppercase");
    expect(chip.textContent).toBe(chip.textContent?.toLowerCase());
    // A CHIP AND NOT A WORD: it carries its own border, which is what makes it
    // read as an attached label rather than as part of the sentence.
    expect(chip.style.border).toContain("solid");
    expect(chip.style.border).toContain("var(--copper-");

    // AND IT IS THE FAR END OF THE CHAIN. The leader runs from the figure to this
    // box, which is the redraw's whole claim about provenance: the join is drawn,
    // not left to the reader.
    const row = screen.getByTestId(`invest-row-${figures[0].id}`);
    const chain = chip.parentElement as HTMLElement;
    expect(row).toContainElement(chain);
    expect(chain).toContainElement(screen.getByTestId(`invest-figure-${figures[0].id}`));
    expect(chain).toContainElement(screen.getByTestId(`invest-leader-${figures[0].id}`));
    expect([...chain.children].indexOf(chip)).toBe(chain.children.length - 1);
  });

  test("and the attribution names every mark its own cards carry", () => {
    // THE CONSISTENCY THE TWO HALVES CANNOT ENFORCE ON THEIR OWN. The cards are
    // marked one by one and the attribution is one sentence, so a set of
    // participant-claimed cards under an attribution that says "vendor-reported"
    // is authorable. It is not shippable: this walks the marks actually present
    // and requires each to appear in the line under them.
    for (const brand of REGISTERED_BRANDS) {
      const block = ownProofFor(brand);
      if (block.kind !== "figures") continue;
      for (const mark of new Set(block.figures.map((f) => f.mark))) {
        expect(block.attribution, `${brand} · ${mark}`).toContain(mark);
      }
    }
  });
});

// ── the one AC that is a rule, not a string ──────────────────────────────────

describe("no figure is stated or styled as audited, independent or verified", () => {
  test("in any string this module authors, once the one negation is removed", () => {
    // THE RULE, over the copy. `NOT_AUDITED` is the only construction those
    // words may appear inside; strip it and the vocabulary must be gone. Held
    // over every authored string of every brand, so a fifth figure added under
    // any brand is inside the rule the moment it exists.
    for (const copy of authoredStrings()) {
      expect(stripAllowedNegation(copy), copy).not.toMatch(AUDIT_WORDS);
    }
  });

  test("in anything the stage actually renders, at every pose and every brand", () => {
    // THE RENDERED HALF, which is the half the AC is written against: a word can
    // reach the stage from a component instead of from the content module, and
    // then no assertion over authored copy sees it.
    for (const block of [gems, berau, general]) {
      for (const pose of POSES) {
        const { unmount } = renderProof(block, pose);
        const text = document.body.textContent ?? "";
        // POSITIVE CONTROL FIRST, so an empty stage cannot pass this.
        expect(text, `pose ${pose}`).toContain(C.headline);
        expect(stripAllowedNegation(text), `pose ${pose}`).not.toMatch(AUDIT_WORDS);
        unmount();
      }
    }
  });

  test("and the negation itself is on the slide, which is why the rule has teeth", () => {
    // THE OTHER DIRECTION. A rule that forbids a vocabulary passes trivially on
    // a slide that says nothing about provenance at all — which is the failure
    // §6.7 actually warns about. So: before the strip, the words ARE there,
    // inside the negation, in both brands' attributions.
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { attribution } = figuresOf(block, name);
      expect(attribution, name).toMatch(AUDIT_WORDS);
      expect(attribution, name).toContain(NOT_AUDITED);
      expect(stripAllowedNegation(attribution), name).not.toMatch(AUDIT_WORDS);
    }
    // And the phrase is a NEGATION, not the bare adjectives.
    expect(NOT_AUDITED.startsWith("not ")).toBe(true);
  });

  test("nor in a title or aria label, where text rules do not look", () => {
    // The quiet way a word reaches a room: a tooltip. Nothing on this slide has
    // one, and this is the assertion that keeps it that way.
    for (const block of [gems, berau]) {
      const { container, unmount } = renderProof(block, THESIS_POSE);
      const attributes = [...container.querySelectorAll("[title], [aria-label]")].flatMap(
        (el) => [el.getAttribute("title") ?? "", el.getAttribute("aria-label") ?? ""],
      );
      for (const value of attributes) {
        expect(stripAllowedNegation(value), value).not.toMatch(AUDIT_WORDS);
      }
      unmount();
    }
  });
});

describe("no card is ranked above another", () => {
  // A figure STYLED as the confirmed one is the same failure as a figure stated
  // to be audited: seven numbers of equal standing across the two brands — four on
  // a GEMS stage, three on a Berau one — and any visual promotion of one is a claim
  // nobody authored. Rank on this slide is a COLOUR TIER between ROLES (the figure's
  // copper, the metric's neutral, the chip on the floor) and never between cards.
  test("one figure tier, one metric tier, one chip, one card, across all of them", () => {
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { figures } = figuresOf(block, name);
      const { unmount } = renderProof(block, 0);

      const cell = (prefix: string) =>
        figures.map((f) => screen.getByTestId(`invest-${prefix}-${f.id}`));
      const distinct = (els: HTMLElement[], read: (el: HTMLElement) => string) =>
        new Set(els.map(read));

      const figureTiers = distinct(cell("figure"), (el) => el.style.color);
      expect(figureTiers.size, `${name} figure tiers: ${[...figureTiers].join(" | ")}`).toBe(1);
      const metricTiers = distinct(cell("metric"), (el) => el.style.color);
      expect(metricTiers.size, `${name} metric tiers: ${[...metricTiers].join(" | ")}`).toBe(1);
      const chipBorders = distinct(cell("mark"), (el) => el.style.border);
      expect(chipBorders.size, `${name} chips: ${[...chipBorders].join(" | ")}`).toBe(1);
      const chipTiers = distinct(cell("mark"), (el) => el.style.color);
      expect(chipTiers.size, `${name} chip tiers: ${[...chipTiers].join(" | ")}`).toBe(1);

      // THE BOXES TOO, which is new with the redraw: a card drawn in a warmer border
      // or on its own ground would rank a figure without printing a word.
      const cardBorders = distinct(cell("row"), (el) => el.style.border);
      expect(cardBorders.size, `${name} card borders`).toBe(1);
      const cardGrounds = distinct(cell("row"), (el) => el.style.background);
      expect(cardGrounds.size, `${name} card grounds`).toBe(1);
      const cardSizes = distinct(
        cell("row"),
        (el) => `${el.style.width}×${el.style.height}`,
      );
      expect(cardSizes.size, `${name} card sizes`).toBe(1);

      // AND THE ROLES DO differ, which is what makes the paragraph above a rank
      // and not an absence of one.
      const [figureTier] = [...figureTiers];
      const [metricTier] = [...metricTiers];
      const [chipTier] = [...chipTiers];
      expect(new Set([figureTier, metricTier, chipTier]).size, name).toBe(3);

      unmount();
    }
  });

  test("and no arrived box carries an opacity of its own — opacity is time here, not rank", () => {
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { figures } = figuresOf(block, name);
      const { unmount } = renderProof(block, 0);
      figures.forEach((f) => {
        const row = screen.getByTestId(`invest-row-${f.id}`);
        expect(entered(`invest-row-${f.id}`), `${name} · ${f.id}`).toBe(true);
        // No inline opacity: the entrance keyframe owns the channel and lands on 1.
        // A card left at 0.6 would be a card ranked by the one channel that must
        // never carry rank.
        expect(row.style.opacity, `${name} · ${f.id}`).toBe("");
      });
      unmount();
    }
  });

  test("and no card carries a colour tier below gh#50's floor", () => {
    // The floor is `--neutral-300`. The chip is the quietest text on the slide
    // and therefore the one at risk of being pushed under it to "calm it down" —
    // which would make the caveat the least readable thing in the room.
    const BELOW_FLOOR = ["neutral-400", "neutral-500", "neutral-700", "neutral-800", "neutral-950"];
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { figures } = figuresOf(block, name);
      const { unmount } = renderProof(block, THESIS_POSE);
      const ids = [
        "invest-source-caption",
        "invest-eyebrow",
        "invest-attribution",
        "invest-closer",
        ...figures.flatMap((f) => [
          `invest-figure-${f.id}`,
          `invest-metric-${f.id}`,
          `invest-mark-${f.id}`,
        ]),
      ];
      for (const id of ids) {
        const color = screen.getByTestId(id).style.color;
        expect(color, `${name} · ${id}`).not.toBe("");
        for (const tier of BELOW_FLOOR) {
          expect(color, `${name} · ${id} · ${tier}`).not.toContain(tier);
        }
      }
      unmount();
    }
  });
});

// ── `general` refuses, by type ───────────────────────────────────────────────

describe("general shows no proof, because it has none", () => {
  test("cannot carry a figure at all — the absence is the type, not an empty array", () => {
    // AN EMPTY `figures: []` WOULD HAVE BEEN THE WRONG MODEL. It renders a blank
    // band (a slide that looks like it failed to load), it type-checks with an
    // attribution that names a source for nothing, and it is one edit away from
    // holding an invented number "just to fill it in". A union with no figures
    // ARM cannot express any of those.
    expect(general.kind).toBe("no-organisation");
    expect("figures" in general).toBe(false);
    expect("attribution" in general).toBe(false);
    expect("eyebrow" in general).toBe(false);
  });

  test("states the absence as one honest line, where the dossier would have been", () => {
    renderProof(general, 0);
    if (general.kind !== "no-organisation") throw new Error("unreachable");

    const line = screen.getByTestId("invest-no-proof");
    expect(line.textContent).toBe(general.line);
    expect(entered("invest-no-proof")).toBe(true);
    // NO PLATE, NO WIRE, NO CARD, under any name — the three things that would make
    // this look like a dossier with one entry.
    expect(screen.queryAllByTestId(/^invest-row-/)).toHaveLength(0);
    expect(screen.queryAllByTestId(/^invest-mark-/)).toHaveLength(0);
    expect(screen.queryAllByTestId(/^invest-branch-/)).toHaveLength(0);
    expect(screen.queryByTestId("invest-attribution")).toBeNull();
    expect(screen.queryByTestId("invest-eyebrow")).toBeNull();
    expect(screen.queryByTestId("invest-source-plate")).toBeNull();
    expect(screen.queryByTestId("invest-trunk")).toBeNull();

    // AND IT STARTS WHERE THE DOSSIER STARTS, so a leader walking either deck looks
    // at the same place on the stage.
    expect(line.style.top).toBe(`${NO_PROOF_TOP}px`);
    expect(NO_PROOF_TOP).toBe(BAND_TOP);
  });

  test("and cannot print a number or another organisation's evidence", () => {
    // THE FAILURE THIS BLOCK EXISTS TO PREVENT (see `GENERAL_BLOCK` in
    // `src/slides/leader-gap/content.ts` for the same argument): registering
    // `general-leader` must not fall through to a company's figures. Read as a
    // property of the copy — no digits, no organisation named — so it holds
    // against a future edit as well as against today's string.
    if (general.kind !== "no-organisation") throw new Error("unreachable");
    expect(general.line).not.toMatch(/\d/);
    for (const name of ["GEMS", "GEMVIS", "Berau", "MineTech", "DigiTech", "IDR", "Google"]) {
      expect(general.line, name).not.toContain(name);
    }

    // And nothing of the other brands reaches the stage under `general`, at any
    // pose, including the figures themselves.
    const foreign = [gems, berau].flatMap((block) =>
      block.kind === "figures" ? block.figures.map((f) => f.figure) : [],
    );
    for (const pose of POSES) {
      const { unmount } = renderProof(general, pose);
      const text = document.body.textContent ?? "";
      for (const figure of foreign) {
        expect(text, `pose ${pose} · ${figure}`).not.toContain(figure);
      }
      unmount();
    }
  });
});

// ── the brand pick itself (§4.4 slot 3) ──────────────────────────────────────

describe("brand variance resolves through a typed pick over Brand", () => {
  test("every registered brand has a block, and every block is internally consistent", () => {
    // A `Record<Brand, …>`, so a fourth brand fails to COMPILE rather than
    // silently showing one organisation another's evidence. Walked here as a
    // value too, so `general` — which has no leader variant registered and so
    // reaches no deck — is still held to the same rules.
    expect([...REGISTERED_BRANDS].sort()).toEqual(["berau", "gems", "general"]);

    for (const brand of REGISTERED_BRANDS) {
      const block = ownProofFor(brand);
      // The same object every call: a pick that rebuilt its block would give two
      // callers two identities and break the prop-passing this slide depends on.
      expect(ownProofFor(brand), brand).toBe(block);
      expect(["figures", "no-organisation"], brand).toContain(block.kind);

      if (block.kind === "no-organisation") {
        expect(block.line.trim(), brand).not.toBe("");
        continue;
      }
      expect(block.eyebrow.trim(), brand).not.toBe("");
      expect(block.attribution.trim(), brand).not.toBe("");
      // NON-EMPTY, and inside the band the layout can actually hold: a fifth card
      // under either brand would end below the citation's own shelf, and the
      // geometry refuses it rather than drawing it there.
      expect(block.figures.length, brand).toBeGreaterThan(0);
      expect(block.figures.length, brand).toBeLessThanOrEqual(ROW_CAPACITY);
      expect(new Set(block.figures.map((f) => f.id)).size, brand).toBe(block.figures.length);
      block.figures.forEach((f) => {
        expect(f.figure.trim(), `${brand} · ${f.id}`).not.toBe("");
        expect(f.metric.trim(), `${brand} · ${f.id}`).not.toBe("");
      });
    }
  });

  test("neither brand carries a byte of the other's evidence", () => {
    // §4.4 slot 3 exists so a Div Head is shown their OWN company. The failure it
    // guards against is not a crash — it is a GEMS figure on a Berau slide, which
    // renders perfectly.
    const gemsFigures = figuresOf(gems, "gems");
    const berauFigures = figuresOf(berau, "berau");

    for (const f of gemsFigures.figures) {
      expect(berauFigures.figures.map((b) => b.figure)).not.toContain(f.figure);
      expect(berauFigures.attribution).not.toContain(f.figure);
    }
    expect(gemsFigures.eyebrow).not.toBe(berauFigures.eyebrow);
    expect(gemsFigures.attribution).not.toBe(berauFigures.attribution);
    expect(gemsFigures.attribution).not.toContain("Vol-1");
    expect(berauFigures.attribution).not.toContain("Google Cloud");
  });

  test("no component reads VARIANT — the same tree renders either brand", () => {
    // THE ACTUAL CHECK behind that rule, and the reason it matters: if any
    // component below the slide read `VARIANT` itself, both of these renders
    // would show the same brand, because one module epoch holds one variant. The
    // slide file resolves the block once and passes it down.
    const first = renderProof(gems, 0);
    expect(screen.getByTestId("invest-figure-decision-speed").textContent).toBe("+90%");
    expect(screen.queryByTestId("invest-figure-production-status")).toBeNull();
    first.unmount();

    renderProof(berau, 0);
    expect(screen.getByTestId("invest-figure-production-status").textContent).toBe(
      "IDR 135–155M",
    );
    expect(screen.queryByTestId("invest-figure-decision-speed")).toBeNull();
  });
});

// ── the thesis, across all three carriers (§4.5) ─────────────────────────────

describe("the thesis line", () => {
  test("is byte-identical to A.1's, and both are composed from one constant", () => {
    // §4.5: a leader hearing three phrasings of one thesis hears three claims.
    // PINNED AS A LITERAL, because this is signed-off copy — reading it off the
    // constant would assert only that the constant equals itself and would pass
    // through a silent rewording of all three carriers at once.
    expect(LEADER_THESIS_LINE).toBe("A few people proved it. Now imagine it across the whole org.");
    expect(LEADER_THESIS_OPENER).toBe("A few people proved it.");
    expect(LEADER_THESIS_LINE.startsWith(LEADER_THESIS_OPENER)).toBe(true);

    // CARRIER 2 — A.1's leader tagline. Byte-identical, and by construction:
    // it IS the constant, not a copy of it.
    const leaderA1 = a1ContentFor(a1Content, "leader");
    expect(leaderA1.tagline).toBe(LEADER_THESIS_LINE);
    expect(leaderA1.taglineKw).toBe(LEADER_THESIS_LINE_KW);

    // CARRIER 3 — this slide's closer.
    expect(C.closer).toBe(LEADER_THESIS_LINE);
    expect(C.closerKw).toBe(LEADER_THESIS_LINE_KW);
  });

  test("opens the leader cover's tagline too, which then elaborates past it", () => {
    // CARRIER 1 — the cover, which AUTHORED the line and says more after it
    // (§4.5: what an agentic organization is, what it costs, what only a leader
    // can authorise). So the cover is held to the OPENER and not to the whole
    // sentence, and the two are deliberately not the same string.
    const cover = titleContentFor("leader");
    expect(cover.tagline.startsWith(LEADER_THESIS_OPENER)).toBe(true);
    expect(cover.tagline).not.toBe(LEADER_THESIS_LINE);
    expect(cover.tagline.length).toBeGreaterThan(LEADER_THESIS_LINE.length);
    // And the standard cover carries none of it — the thesis is the leader
    // deck's, and the middle-management cover is untouched by §4.5.
    expect(titleContentFor("standard").tagline).not.toContain(LEADER_THESIS_OPENER);
  });

  test("is what the closer actually prints, under every brand, with its keywords", () => {
    // BRAND-INVARIANT ON PURPOSE. The cards above it are the brand's own
    // evidence; the sentence they are evidence FOR is the deck's, and a brand
    // axis here would be three phrasings again.
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
      ["general", general],
    ] as const) {
      const { unmount } = renderProof(block, THESIS_POSE);
      const closer = screen.getByTestId("invest-closer");
      expect(closer.textContent, name).toBe(LEADER_THESIS_LINE);
      expect(revealed("invest-closer"), name).toBe(true);
      // The thesis is PROSE, so it is one of the two places on this slide an
      // `<em>` belongs — and both keywords land.
      expect(closer.querySelectorAll("em"), name).toHaveLength(LEADER_THESIS_LINE_KW.length);
      unmount();
    }
    LEADER_THESIS_LINE_KW.forEach((word) => expect(LEADER_THESIS_LINE).toContain(word));
  });

  test("is set at 19px and lands on the floor of the stage, not over the evidence", () => {
    // THE OWNER'S FOURTH FAULT, AS TWO NUMBERS. It shipped at 26px on a shelf at
    // y=556 — the loudest type under the headline, and closer to the cards than to
    // the edge of the stage. It is D.1's own size and D.1's own clearance now, so the
    // two `invest` stages rank their verdicts the same way: under the figures they
    // price, and last.
    renderProof(gems, THESIS_POSE);
    const closer = screen.getByTestId("invest-closer");
    expect(closer.style.fontSize).toBe("19px");
    expect(closer.style.fontStyle).toBe("italic");
    expect(closer.style.top).toBe(`${THESIS_TOP}px`);
    expect(THESIS_TOP).toBeGreaterThan(556);
    expect(THESIS_TOP + THESIS_HEIGHT + NAV_ZONE_CLEARANCE).toBe(NAV_ZONE_TOP);
  });
});

// ── the two poses ────────────────────────────────────────────────────────────

describe("the two poses", () => {
  test("pose 0 is the whole dossier and pose 1 adds the thesis and its rule", () => {
    renderProof(gems, 0);
    const { figures } = figuresOf(gems, "gems");

    // Walked inside ONE mounted tree, so a beat that survives only a fresh mount
    // — or a pose that clears one it should have kept — fails here.
    expect(entered("invest-source-plate")).toBe(true);
    expect(figures.every((f) => entered(`invest-row-${f.id}`))).toBe(true);
    expect(entered("invest-attribution")).toBe(true);
    expect(revealed("invest-closer")).toBe(false);
    // THE RULE IS THE THESIS' OWN BAND and arrives with it: a rule drawn under the
    // evidence at pose 0 would divide a stage with nothing under the line.
    expect(
      screen.getByTestId("invest-rule").querySelector(".copper-rule")?.classList.contains("on"),
    ).toBe(false);

    goToPose(THESIS_POSE);
    expect(figures.every((f) => entered(`invest-row-${f.id}`))).toBe(true);
    expect(entered("invest-attribution")).toBe(true);
    expect(revealed("invest-closer")).toBe(true);
    expect(
      screen.getByTestId("invest-rule").querySelector(".copper-rule")?.classList.contains("on"),
    ).toBe(true);
    expect(screen.getByTestId("invest-closer").textContent).toBe(C.closer);
  });

  test("walks 0 → 1 and 1 → 0 to the same two frames", () => {
    // THE AC's "re-renders in both directions", as a comparison rather than as a
    // spot check. A pose whose markup depends on how it was reached is a slide
    // that looks different when a presenter steps BACK into it — which happens
    // in every real walkthrough and in none of the tests that only step forward.
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
      ["general", general],
    ] as const) {
      const { container, unmount } = renderProof(block, 0);

      const forward: string[] = [];
      for (const pose of POSES) {
        goToPose(pose);
        forward.push(container.innerHTML);
      }
      const backward: string[] = [];
      for (const pose of [...POSES].reverse()) {
        goToPose(pose);
        backward[pose] = container.innerHTML;
      }
      expect(backward, name).toEqual(forward);
      // And the two frames are actually two — a pose that changed nothing
      // would pass the comparison above trivially.
      expect(new Set(forward).size, name).toBe(POSES.length);
      unmount();
    }
  });

  test("and there is no third pose hiding in the render", () => {
    // Nothing here may react to a pose the deck cannot produce (`steps: 2` clamps
    // at 1). A panel keyed on `pose >= 2` is unreviewed copy with a trigger
    // attached.
    renderProof(gems, THESIS_POSE);
    const atLast = document.body.innerHTML;
    // Asked through the slide rather than the figure, because the slide is what
    // the deck renders; `goTo` clamps, so this is the strongest pose the deck can
    // ask for and the assertion is that nothing beyond it exists to reach.
    goToPose(THESIS_POSE);
    expect(document.body.innerHTML).toBe(atLast);
  });
});

// ── reduced motion ───────────────────────────────────────────────────────────

describe("prefers-reduced-motion: reduce", () => {
  const realMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = realMatchMedia;
  });

  test("mounts zero SMIL nodes at every pose, under every brand", () => {
    // ZERO BY CONSTRUCTION, and that is the decision this asserts rather than a
    // happy accident. SMIL is invisible to the global `prefers-reduced-motion`
    // rule in `globals.css` — it squashes CSS animations and transitions only —
    // so a SMIL node has to be gated at mount, as E.12 gates its
    // `<animateMotion>`. This slide's whole motion budget is `./own-proof.css`'s
    // keyframes plus one `.fade` transition, and that file's own media block
    // removes the two infinite ones outright.
    for (const block of [gems, berau, general]) {
      for (const pose of POSES) {
        const { container, unmount } = renderProof(block, pose);
        for (const tag of ["animate", "animateMotion", "animateTransform", "set"]) {
          expect(document.querySelectorAll(tag), `pose ${pose} · <${tag}>`).toHaveLength(0);
        }
        // AND NO SVG AT ALL. The harness is four kinds of `div` — there is no path,
        // no ring drawn as a `<circle>` and no marker on this slide — so this line
        // is the reminder that an edit which adds an `<svg>` has re-opened the
        // question above.
        expect(container.querySelectorAll("svg"), `pose ${pose}`).toHaveLength(0);
        unmount();
      }
    }
  });

  test("every pose still mounts every beat it has reached, with its copy", () => {
    // WHAT THIS CAN AND CANNOT SAY. jsdom runs no keyframe, so "the cards rest on
    // their finished frame" is not checkable here — a computed opacity mid
    // animation is nothing jsdom computes. This test therefore claims only the
    // DOM half: at each pose every element that pose has reached is mounted with
    // its copy. The computed half is checked in a real engine.
    const { figures, attribution } = figuresOf(berau, "berau");
    renderProof(berau, 0);
    expect(screen.getByTestId("invest-eyebrow").textContent).not.toBe("");
    figures.forEach((f) => {
      expect(screen.getByTestId(`invest-figure-${f.id}`).textContent, f.id).toBe(f.figure);
      expect(screen.getByTestId(`invest-mark-${f.id}`).textContent, f.id).toBe(f.mark);
    });
    expect(screen.getByTestId("invest-attribution").textContent).toBe(attribution);

    goToPose(THESIS_POSE);
    expect(screen.getByTestId("invest-closer").textContent).toBe(LEADER_THESIS_LINE);
  });

  test("the two loops are the only infinite marks, and each says something", () => {
    // `./own-proof.css` removes both under the preference — an ambient repeat is
    // precisely what that preference is about — so what this holds is the OTHER half:
    // that there are exactly two of them and that they belong to the argument. The
    // ring says the plate is a source; each pulse carries a figure to the mark that
    // says how it is known.
    const { figures } = figuresOf(gems, "gems");
    renderProof(gems, 0);
    expect(screen.getByTestId("invest-origin-ring").className).toContain("op-ring");
    figures.forEach((f) => {
      const pulse = screen.getByTestId(`invest-pulse-${f.id}`);
      expect(pulse.className, f.id).toContain("op-pulse");
      // The travel is written by the component in the leader's OWN width, so the
      // stylesheet never holds a coordinate.
      expect(pulse.style.getPropertyValue("--op-travel"), f.id).toMatch(/^calc\(100% - \d+px\)$/);
      expect(screen.getByTestId(`invest-leader-${f.id}`), f.id).toContainElement(pulse);
    });
    // And nothing else on the stage loops.
    const looping = [...document.querySelectorAll<HTMLElement>("[class*='op-']")].filter((el) =>
      /op-(ring|pulse)/.test(el.className),
    );
    expect(looping).toHaveLength(1 + figures.length);
  });
});

// ── the copy rules, checked over the copy ────────────────────────────────────

describe("keywords go on prose only", () => {
  /** Labels and figures, never sentences. A copper italic inside a mono figure
   *  or a source line reads as a rendering fault, so none of these has a `*Kw`
   *  sibling to begin with — this holds that they never gain one by carrying a
   *  highlight-shaped string. */
  const LABELS: readonly string[] = [
    C.figLabel,
    C.sourceCaption,
    ...REGISTERED_BRANDS.flatMap((brand) => {
      const block = ownProofFor(brand);
      return block.kind === "figures"
        ? [
            block.eyebrow,
            block.attribution,
            ...block.figures.flatMap((f) => [f.figure, f.metric, f.mark]),
          ]
        : [];
    }),
  ];

  test("no figure, chip, caption, name or source line is rendered through the highlighter", () => {
    // Rendered check, not an authored one: `<em class="kw">` is what a highlight
    // IS on the stage, so this reads the DOM for one inside any of those runs.
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { figures } = figuresOf(block, name);
      const { unmount } = renderProof(block, THESIS_POSE);
      const labelBoxes = [
        "invest-source-caption",
        "invest-eyebrow",
        "invest-attribution",
        ...figures.flatMap((f) => [
          `invest-figure-${f.id}`,
          `invest-metric-${f.id}`,
          `invest-mark-${f.id}`,
        ]),
      ];
      for (const id of labelBoxes) {
        expect(screen.getByTestId(id).querySelectorAll("em"), `${name} · ${id}`).toHaveLength(0);
      }
      unmount();
    }
    LABELS.forEach((label) => expect(label).not.toContain("<em"));
  });

  test("the two lines of prose carry their keywords, and both land", () => {
    // A keyword that does not occur is a highlight that silently does nothing —
    // the copy still reads, so nothing on the stage says the emphasis was lost.
    const pairs: Array<[string, string, readonly string[]]> = [
      ["headline", C.headline, C.headlineKw],
      ["closer", C.closer, C.closerKw],
      ...(general.kind === "no-organisation"
        ? ([["general.line", general.line, general.lineKw]] as Array<
            [string, string, readonly string[]]
          >)
        : []),
    ];
    pairs.forEach(([where, copy, kw]) => {
      expect(kw.length, where).toBeGreaterThan(0);
      kw.forEach((word) => expect(copy, `${where}: "${word}"`).toContain(word));
    });

    // And they land on the stage: the headline at every pose, the closer at the
    // pose that argues it.
    renderProof(gems, THESIS_POSE);
    expect(document.querySelectorAll("h1 em").length).toBeGreaterThan(0);
    expect(screen.getByTestId("invest-closer").querySelectorAll("em").length).toBeGreaterThan(0);
  });

  test("no authored string names a section letter", () => {
    // §3.4 R2. This slide composed as D.1 from gh#56 until gh#70 and composes as D.2
    // today, because `invest-base-rates` (§6.7's D.1, built by #70) landed in front of
    // it and R3 stepped every row behind the insert inside the run. A literal "D.1" or
    // "SECTION D" anywhere in this copy WOULD have become a lie on a projector, and it
    // would have done so on 2026-08-08.
    for (const copy of authoredStrings()) {
      expect(copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      // A bare figure reference — `D.1`, `G.12`.
      expect(copy).not.toMatch(/\b[A-N]\.\d+\b/);
    }
  });

  test("and no figure-shaped literal reaches the DOM except the derived one", () => {
    // THE RENDERED HALF of the same rule. `FigLabel` prints one figure reference
    // and it comes from the composed deck through `SlideNumberContext` — the
    // harness's `at` supplies it here. So: strip that one element and nothing of
    // that shape may be left, which is what catches a letter written into a
    // component rather than into the content module.
    const { container } = renderProof(gems, THESIS_POSE);
    expect(
      container.querySelector(".fig-label")?.textContent,
      "the derived reference is there to strip",
    ).toContain(`${AT.letter}.${AT.num}`);

    // Stripped from a CLONE, not from the live tree: React owns those nodes and
    // removing one behind its back throws on the next commit.
    const stripped = container.cloneNode(true) as HTMLElement;
    stripped.querySelector(".fig-label")?.remove();
    expect(stripped.textContent ?? "").not.toMatch(/\b[A-N]\.\d+\b/);
    expect(C.figLabel).toBe("PROOF FROM INSIDE THE COMPANY");
  });

  test("and no range in the deck's own copy uses a hyphen between digits", () => {
    // `RANGE_DASH` in `src/deck/sections.ts` says why the repo cares: an en dash
    // and a hyphen are indistinguishable in a code review and obvious on a
    // projector. Held over every authored string, not only over the three ranges,
    // so a fourth figure is inside the rule the moment it is written.
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(/\d-\d/);
    }
  });
});

// ── the geometry, on its own terms ───────────────────────────────────────────

describe("the dossier geometry", () => {
  // ASSERTED AS INDEPENDENT INVARIANTS, not by calling the thing being checked.
  // The renderer reads `cardTop` and `chainY`, so a test that expects `cardTop(i)`
  // and renders `cardTop(i)` passes on any return value at all — including one
  // inside the NavBar's hover band. These are properties the layout has to have.

  test("the stage, the margins and the floor", () => {
    expect(STAGE).toEqual({ width: 1280, height: 720 });
    expect(SIDE_MARGIN).toBe(48);
    expect(CONTENT_WIDTH).toBe(1280 - 2 * SIDE_MARGIN);
    expect(CONTENT_RIGHT).toBe(1232);
    // `.nav-zone` is `bottom: 0; height: 88px`, so the band's top edge is 632.
    expect(NAV_ZONE_TOP).toBe(720 - 88);
  });

  test("the stage is cut from the floor upward, and nothing crosses the NavBar band", () => {
    // BAND 3 IS MEASURED UP FROM y=632 — the thesis' distance from the hover band is
    // the requirement, and the rule, the citation and the dossier are all derived
    // backwards from it. A band that grows cannot push the thesis down; it collides
    // with the rule instead, which is a failure the numbers below make visible.
    expect(NAV_ZONE_CLEARANCE).toBe(16);
    expect(THESIS_TOP + THESIS_HEIGHT + NAV_ZONE_CLEARANCE).toBe(NAV_ZONE_TOP);
    expect(RULE_TOP + RULE_HEIGHT).toBeLessThan(THESIS_TOP);
    expect(ATTRIBUTION_TOP + ATTRIBUTION_HEIGHT).toBeLessThan(RULE_TOP);
    expect(BAND_BOTTOM).toBeLessThan(ATTRIBUTION_TOP);

    // AND BAND 1 OPENS 38px UNDER THE HEADLINE ROW, which ends at y=122 for a
    // one-line 40px `.slide-headline.small`. The shipped stage hung a mono eyebrow at
    // y=134 — 12px under the display face — and the two read as one wrapped line.
    expect(BAND_TOP).toBe(160);
    expect(BAND_TOP - 122).toBe(38);
    expect(BAND_HEIGHT).toBe(BAND_BOTTOM - BAND_TOP);
  });

  test("four cards fill the band exactly, and a fifth is refused rather than drawn", () => {
    // GEMS renders four cards and Berau three (§6.7), so the band is measured against
    // four — and the capacity is DERIVED from the band rather than written down, so
    // moving the citation up moves the capacity with it.
    expect(ROW_CAPACITY).toBe(4);
    expect(CARD_PITCH).toBe(CARD_HEIGHT + CARD_GAP);
    expect(stackHeight(ROW_CAPACITY)).toBe(BAND_HEIGHT);

    for (let count = 1; count <= ROW_CAPACITY; count++) {
      // The stack is inside the band at every count the band accepts, not only at the
      // tallest one — this is what fails if the citation is ever moved up.
      expect(stackTop(count), `${count} cards`).toBeGreaterThanOrEqual(BAND_TOP);
      expect(
        stackTop(count) + stackHeight(count),
        `${count} cards`,
      ).toBeLessThanOrEqual(BAND_BOTTOM);
      // CENTRED, which is the answer to the shipped slide's worst frame: Berau's
      // three rows used to leave a row's worth of hole under them.
      expect(
        stackTop(count) - BAND_TOP - (BAND_BOTTOM - stackTop(count) - stackHeight(count)),
        `${count} cards centred`,
      ).toBeLessThanOrEqual(1);

      for (let i = 0; i < count; i++) {
        expect(cardTop(i, count), `card ${i} of ${count}`).toBe(
          stackTop(count) + i * CARD_PITCH,
        );
        if (i === 0) continue;
        // No card overlaps the one above it, and the air between two is CARD_GAP.
        expect(
          cardTop(i, count) - (cardTop(i - 1, count) + CARD_HEIGHT),
          `card ${i} of ${count} clears card ${i - 1}`,
        ).toBe(CARD_GAP);
      }
    }

    // SO IT THROWS instead of drawing a card the band cannot hold. A silently placed
    // fifth card would end at y=496 — past the band, and into the citation's shelf.
    expect(BAND_TOP + ROW_CAPACITY * CARD_PITCH + CARD_HEIGHT).toBeGreaterThan(BAND_BOTTOM);
    expect(() => stackHeight(ROW_CAPACITY + 1)).toThrow(/band 1 holds/);
    expect(() => stackHeight(0)).toThrow(/band 1 holds/);
    expect(() => cardTop(ROW_CAPACITY, ROW_CAPACITY)).toThrow(/no card/);
    expect(() => cardTop(-1, 3)).toThrow(/no card/);
  });

  test("the plate, the harness and the cards tile the stage's width", () => {
    // ONE ROW OF THREE COLUMNS, and they meet exactly: the plate ends where the trunk
    // starts, the trunk ends where the spine is, the branch ends where the cards
    // start, and the cards end at the margin. A gap anywhere here is a wire that stops
    // short of the thing it is supposed to join.
    expect(SOURCE_LEFT).toBe(SIDE_MARGIN);
    expect(SOURCE_RIGHT).toBe(SOURCE_LEFT + SOURCE_WIDTH);
    expect(SPINE_X).toBe(SOURCE_RIGHT + TRUNK_LENGTH);
    expect(SPINE_X + BRANCH_LENGTH).toBe(CARD_LEFT);
    expect(CARD_LEFT + CARD_WIDTH).toBe(CONTENT_RIGHT);
    expect(BRANCH_LENGTH).toBeGreaterThan(0);

    // THE PLATE IS THE SAME BOX IN BOTH ROOMS, centred on the line the harness leaves
    // on, and its own padding is symmetric — the number that fails if the name box is
    // re-cut without the plate around it.
    expect(SOURCE_TOP + SOURCE_HEIGHT / 2).toBe(ORIGIN_Y);
    expect(SOURCE_HEIGHT).toBe(SOURCE_NAME_TOP + SOURCE_NAME_HEIGHT + SOURCE_PAD);
    expect(SOURCE_BOTTOM_PAD).toBe(SOURCE_PAD);
    expect(SOURCE_TOP).toBeGreaterThanOrEqual(BAND_TOP);
    expect(SOURCE_TOP + SOURCE_HEIGHT).toBeLessThanOrEqual(BAND_BOTTOM);
  });

  test("the chain row leaves the leader a leader's worth of room", () => {
    // THE FIGURE IS SET TO ITS OWN WIDTH AND THE LEADER TAKES WHAT IS LEFT, so what
    // can be checked here is the BUDGET: if a figure spends all of it, the leader is
    // still 250px of dots rather than a typo. The rendered widths are measured in a
    // real engine — jsdom computes no text.
    expect(CHAIN_ROW_WIDTH).toBe(CARD_WIDTH - 2 * CARD_PAD_X);
    expect(FIGURE_BUDGET_W + MARK_COL_W + 2 * CHAIN_GAP + LEADER_MIN_W).toBe(CHAIN_ROW_WIDTH);
    expect(LEADER_MIN_W).toBeGreaterThan(40);
    // The chain sits on the figure's optical centre and not the card's box centre, so
    // the wire enters above the caption rather than through it.
    expect(CHAIN_Y).toBeLessThan(CARD_HEIGHT / 2);
  });

  test("the spine spans the branches and stops there, at every count", () => {
    // A SPINE THAT OVERSHOT ITS OUTERMOST BRANCH would draw a wire going somewhere the
    // stage does not — which on a slide about provenance is the wrong suggestion. Held
    // against the CHAIN LINES rather than against the spine's own formula.
    for (let count = 1; count <= ROW_CAPACITY; count++) {
      expect(spineTop(count), `${count} cards`).toBe(chainY(0, count));
      expect(spineTop(count) + spineHeight(count), `${count} cards`).toBe(
        chainY(count - 1, count),
      );
    }
    // One card needs no spine at all, which is why the component does not draw one.
    expect(spineHeight(1)).toBe(0);
  });

  test("and the render reads those numbers rather than its own", () => {
    // Structural, because jsdom places nothing: every box reads its own coordinate,
    // so a card and the band it is supposed to sit in cannot disagree.
    const { figures } = figuresOf(gems, "gems");
    renderProof(gems, THESIS_POSE);

    const plate = screen.getByTestId("invest-source-plate");
    expect(plate.style.left).toBe(`${SOURCE_LEFT}px`);
    expect(plate.style.top).toBe(`${SOURCE_TOP}px`);
    expect(plate.style.width).toBe(`${SOURCE_WIDTH}px`);
    expect(plate.style.height).toBe(`${SOURCE_HEIGHT}px`);

    figures.forEach((f, i) => {
      const row = screen.getByTestId(`invest-row-${f.id}`);
      expect(row.style.top, f.id).toBe(`${cardTop(i, figures.length)}px`);
      expect(row.style.left, f.id).toBe(`${CARD_LEFT}px`);
      expect(row.style.width, f.id).toBe(`${CARD_WIDTH}px`);
      expect(row.style.height, f.id).toBe(`${CARD_HEIGHT}px`);
      expect(screen.getByTestId(`invest-mark-${f.id}`).style.width, f.id).toBe(
        `${MARK_COL_W}px`,
      );
    });

    expect(screen.getByTestId("invest-attribution").style.top).toBe(`${ATTRIBUTION_TOP}px`);
    expect(screen.getByTestId("invest-rule").style.top).toBe(`${RULE_TOP}px`);
    expect(screen.getByTestId("invest-closer").style.top).toBe(`${THESIS_TOP}px`);
  });

  test("both decks print the citation and the thesis on one shelf, and centre the stack", () => {
    const gemsFigures = figuresOf(gems, "gems").figures;
    const berauFigures = figuresOf(berau, "berau").figures;
    expect(gemsFigures.length).toBe(4);
    expect(berauFigures.length).toBe(3);

    const first = renderProof(gems, THESIS_POSE);
    const gemsFirstCard = screen.getByTestId(`invest-row-${gemsFigures[0].id}`).style.top;
    const gemsAttribution = screen.getByTestId("invest-attribution").style.top;
    const gemsCloser = screen.getByTestId("invest-closer").style.top;
    const gemsPlate = screen.getByTestId("invest-source-plate").style.top;
    first.unmount();

    renderProof(berau, THESIS_POSE);
    const berauFirstCard = screen.getByTestId(`invest-row-${berauFigures[0].id}`).style.top;
    const berauAttribution = screen.getByTestId("invest-attribution").style.top;
    const berauCloser = screen.getByTestId("invest-closer").style.top;
    const berauPlate = screen.getByTestId("invest-source-plate").style.top;

    // THE SHORTER DECK'S STACK MOVES DOWN, by half a card pitch and a half gap, so its
    // three cards are centred in the band instead of leaving a hole under them.
    expect(parseFloat(berauFirstCard)).toBeGreaterThan(parseFloat(gemsFirstCard));
    expect(parseFloat(berauFirstCard) - parseFloat(gemsFirstCard)).toBe(CARD_PITCH / 2);

    // AND NOTHING ELSE MOVES. The citation and the thesis are the two lines both decks
    // print in the same place — the thesis because it is the one sentence both rooms
    // share byte for byte (§4.5), the citation because it attributes the PLATE, which
    // is now the same box in both rooms.
    expect(berauAttribution).toBe(gemsAttribution);
    expect(berauCloser).toBe(gemsCloser);
    expect(berauPlate).toBe(gemsPlate);
  });
});
