// THEIR OWN PROOF · slide tests. All three poses, all three brands.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so nothing here
// measures a pixel a browser would place — every geometric claim is asserted as
// the ONE NUMBER both sides read (`../../src/slides/leader-invest/geometry.ts`),
// and the rendered composition is walked at 1280×720 in a real engine separately.
// What jsdom is good for is the three things this slide is actually at risk of:
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
//   3. THE THESIS DRIFTING. Three carriers print one sentence (§4.5). Two of
//      them are in another module, so the identity is asserted across all three
//      in one place — here — because that is the only place all three are
//      importable at once.
//
// ALL THREE BRANDS IN ONE EPOCH. The figure reads no `VARIANT` — the slide file
// resolves the block once at module scope and hands it down as a prop (§4.4 slot
// 3) — so three ledgers mount side by side in this one module registry. A test
// that had to re-point `window.location` per brand could not compare them, and
// comparing them is how "no brand inherits another organisation's evidence" is
// checked at all.
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
  ATTRIBUTION_GAP,
  ATTRIBUTION_HEIGHT,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  COL_GAP,
  CONTENT_WIDTH,
  EYEBROW_TOP,
  FIGURE_COL_W,
  MARK_COL_W,
  METRIC_COL_W,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  ROW_CAPACITY,
  ROW_GAP,
  ROW_HEIGHT,
  ROW_PITCH,
  SIDE_MARGIN,
  SLOT_HEIGHT,
  SLOT_TOP,
  attributionOffset,
  columnHeight,
  rowOffset,
} from "@/slides/leader-invest/geometry";
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
const POSES = [0, 1, 2] as const;

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
 * THE OLD COMMENT'S OTHER HALF WAS RIGHT AND IS KEPT: it was not #57 that moved this
 * slide. That ticket is D.3 `invest-chicken-egg`, which APPENDED behind this one and
 * changed nothing here. What DID move it is the only shape that can — an insert in FRONT
 * of it INSIDE its own run (§3.4 R3). ("`invest-base-rates` holds no ticket at all" was
 * true when written and is now spent: #70 is the ticket, and §11's Phase 7 row was filed
 * as #65–#72.)
 *
 * Neither the letter nor the number is authored
 * in the slide (§3.5), so this is a harness input and not a claim the slide makes —
 * and it is the number the two leader decks actually derive, which
 * `tests/fixtures/deck-numbering.json` records for both.
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
  test("is the file's basename, three steps, closing on the fullest pose", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins
    // the value).
    expect(investOwnProofSlide.id).toBe("invest-own-proof");
    // THREE, one argument each: the premise, the figures with their marks, the
    // thesis. A fourth pose would have to be a fourth argument, and §6.7 gives
    // this slide three.
    expect(investOwnProofSlide.steps).toBe(3);
    // The exports print `canonicalPose` and nothing else, so a canonical pose
    // short of the last one would ship a PDF of a company's own figures with the
    // sentence they are evidence for missing.
    expect(investOwnProofSlide.canonicalPose).toBe(2);
    expect(investOwnProofSlide.canonicalPose).toBe(investOwnProofSlide.steps - 1);
    expect(investOwnProofSlide.sectionKey).toBe("invest");
    expect(investOwnProofSlide.animationMode).toBe("step-reveal");
    expect(investOwnProofSlide.surface).toBe("dark");
  });
});

// ── the shared half of the copy ──────────────────────────────────────────────

describe("the argument the slide opens on", () => {
  test("states the premise, and states it without naming an organisation", () => {
    renderProof(gems, 0);

    // ONE HEADLINE FOR ALL THREE BRANDS, and it is the PREMISE rather than the
    // turn. A second clause naming their own company — "…this one is yours" —
    // would be false under `general`, which names no organisation, and the
    // shared line would then be a lie on its own slide. That is the same
    // reasoning that puts the ladder's closer on the brand axis in
    // `src/slides/leader-gap/content.ts`; the turn is made by the eyebrow and
    // the rows, which ARE on the axis.
    expect(C.headline).toBe("An outsider's case study is easy to discount.");
    expect(screen.getByRole("heading").textContent).toBe(C.headline);

    for (const name of ["GEMS", "GEMVIS", "Berau", "MineTech", "DigiTech"]) {
      expect(C.headline, name).not.toContain(name);
      expect(C.figLabel, name).not.toContain(name.toUpperCase());
    }
  });

  test("names whose proof it is, in the mono eyebrow, at pose 0", () => {
    // POSE 0 IS THE ARGUMENT, and the argument is incomplete without "whose".
    // The eyebrow is the only string at this pose that answers it.
    const first = renderProof(gems, 0);
    expect(screen.getByTestId("invest-eyebrow").textContent).toBe(
      "GEMVIS · GEMS' OWN PLATFORM",
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
  });

  test("shows no figure and no thesis until the poses that argue them", () => {
    renderProof(gems, 0);

    const { figures } = figuresOf(gems, "gems");
    for (const f of figures) {
      // MOUNTED BUT NOT REVEALED — the rows hold their place from the first
      // frame so nothing reflows when they arrive, and the `on` class is what
      // says "yet".
      expect(screen.getByTestId(`invest-row-${f.id}`).classList.contains("on"), f.id).toBe(
        false,
      );
    }
    expect(screen.getByTestId("invest-attribution").classList.contains("on")).toBe(false);
    expect(screen.getByTestId("invest-closer").classList.contains("on")).toBe(false);
  });
});

// ── GEMS' four figures (§6.7, §4.4 slot 3) ───────────────────────────────────

describe("GEMS renders GEMVIS' four figures", () => {
  test("all four, verbatim, in order", () => {
    renderProof(gems, 1);
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

  test("each one marked vendor-reported, on the row itself", () => {
    renderProof(gems, 1);
    const { figures } = figuresOf(gems, "gems");

    // PER ROW, not once per column. A leader reading one line out loud reads its
    // provenance with it, and a row that gets copied into a status deck takes
    // the mark along.
    figures.forEach((f) => {
      expect(f.mark, f.id).toBe("vendor-reported");
      expect(screen.getByTestId(`invest-mark-${f.id}`).textContent, f.id).toBe(
        "vendor-reported",
      );
    });
  });

  test("with an on-slide attribution naming the vendor-reported customer story", () => {
    renderProof(gems, 1);
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
    renderProof(berau, 1);
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
    renderProof(berau, 1);
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
    // so without editing a quoted number is the line directly under them.
    expect(attribution).toContain("annual");
  });
});

// ── the epistemic mark, as a type and as a chip ──────────────────────────────

describe("the epistemic mark", () => {
  test("is a closed union, and both of its members are in use", () => {
    // A CLOSED UNION AND NOT A `string`. A free-text mark is a mark an author can
    // spell "vendor reported", which then renders as a chip nobody greps for and
    // matches no rule in this file. Both members are asserted in use, so the
    // union cannot quietly grow a member no row carries.
    expect([...EPISTEMIC_MARKS]).toEqual(["vendor-reported", "participant-claimed"]);

    const used = new Set(
      REGISTERED_BRANDS.flatMap((brand) => {
        const block = ownProofFor(brand);
        return block.kind === "figures" ? block.figures.map((f) => f.mark) : [];
      }),
    );
    expect([...used].sort()).toEqual([...EPISTEMIC_MARKS].sort());
  });

  test("rides on EVERY figure row, under every brand that has figures", () => {
    // THE STRUCTURAL HALF of "the label is part of the copy". Held over every
    // brand rather than over the two the decks compose, because the rule is a
    // property of the type and not of today's two blocks.
    for (const brand of REGISTERED_BRANDS) {
      const block = ownProofFor(brand);
      if (block.kind !== "figures") continue;
      const { unmount } = renderProof(block, 1);

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

  test("prints the union's own value, in the mono label register", () => {
    renderProof(gems, 1);
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
  });

  test("and the attribution names every mark its own rows carry", () => {
    // THE CONSISTENCY THE TWO HALVES CANNOT ENFORCE ON THEIR OWN. The rows are
    // marked one by one and the attribution is one sentence, so a column of
    // participant-claimed rows under an attribution that says "vendor-reported"
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
    // over every authored string of every brand, so a fourth figure added under
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
      const { container, unmount } = renderProof(block, 2);
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

describe("no row is ranked above another", () => {
  // A figure STYLED as the confirmed one is the same failure as a figure stated
  // to be audited: seven numbers of equal standing across the two brands — four on
  // a GEMS stage, three on a Berau one — and any visual promotion of one is a claim
  // nobody authored. Rank on this slide is a COLOUR TIER between ROLES (the figure's
  // copper, the metric's neutral, the chip on the floor) and never between rows.
  test("one figure tier, one metric tier, one chip, across all rows", () => {
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { figures } = figuresOf(block, name);
      const { unmount } = renderProof(block, 1);

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

      // AND THE ROLES DO differ, which is what makes the paragraph above a rank
      // and not an absence of one.
      const [figureTier] = [...figureTiers];
      const [metricTier] = [...metricTiers];
      const [chipTier] = [...chipTiers];
      expect(new Set([figureTier, metricTier, chipTier]).size, name).toBe(3);

      unmount();
    }
  });

  test("and every revealed row is fully opaque — opacity is time here, not rank", () => {
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { figures } = figuresOf(block, name);
      const { unmount } = renderProof(block, 1);
      figures.forEach((f) => {
        const row = screen.getByTestId(`invest-row-${f.id}`);
        expect(row.classList.contains("on"), `${name} · ${f.id}`).toBe(true);
        // No inline opacity of its own: `.fade.on` is 1, and a row left at 0.6
        // would be a row ranked by the one channel that must never carry rank.
        expect(row.style.opacity, `${name} · ${f.id}`).toBe("");
      });
      unmount();
    }
  });

  test("and no row carries a colour tier below gh#50's floor", () => {
    // The floor is `--neutral-300`. The chip is the quietest text on the slide
    // and therefore the one at risk of being pushed under it to "calm it down" —
    // which would make the caveat the least readable thing in the room.
    const BELOW_FLOOR = ["neutral-400", "neutral-500", "neutral-700", "neutral-800", "neutral-950"];
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { figures } = figuresOf(block, name);
      const { unmount } = renderProof(block, 2);
      const ids = [
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

  test("states the absence as one honest line, in the slot the rows would use", () => {
    renderProof(general, 1);
    if (general.kind !== "no-organisation") throw new Error("unreachable");

    const line = screen.getByTestId("invest-no-proof");
    expect(line.textContent).toBe(general.line);
    expect(line.classList.contains("on")).toBe(true);
    // NO ROWS AND NO ATTRIBUTION, under any name.
    expect(screen.queryAllByTestId(/^invest-row-/)).toHaveLength(0);
    expect(screen.queryAllByTestId(/^invest-mark-/)).toHaveLength(0);
    expect(screen.queryByTestId("invest-attribution")).toBeNull();
    expect(screen.queryByTestId("invest-eyebrow")).toBeNull();

    // THE SAME SLOT the rows fill under the other two brands, so the band is
    // never a blank rectangle and a leader walking either deck looks at the same
    // place.
    const slot = screen.getByTestId("invest-proof-slot");
    expect(slot).toContainElement(line);
    expect(slot.style.top).toBe(`${SLOT_TOP}px`);
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
      // NON-EMPTY, and inside the band the layout can actually hold: a fifth row
      // under either brand would hang its source line inside the closer's fixed
      // shelf — on top of the deck's own thesis — and the geometry refuses it
      // rather than drawing it there.
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
    const first = renderProof(gems, 1);
    expect(screen.getByTestId("invest-figure-decision-speed").textContent).toBe("+90%");
    expect(screen.queryByTestId("invest-figure-production-status")).toBeNull();
    first.unmount();

    renderProof(berau, 1);
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
    // BRAND-INVARIANT ON PURPOSE. The rows above it are the brand's own
    // evidence; the sentence they are evidence FOR is the deck's, and a brand
    // axis here would be three phrasings again.
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
      ["general", general],
    ] as const) {
      const { unmount } = renderProof(block, 2);
      const closer = screen.getByTestId("invest-closer");
      expect(closer.textContent, name).toBe(LEADER_THESIS_LINE);
      expect(closer.classList.contains("on"), name).toBe(true);
      // The thesis is PROSE, so it is one of the two places on this slide an
      // `<em>` belongs — and both keywords land.
      expect(closer.querySelectorAll("em"), name).toHaveLength(LEADER_THESIS_LINE_KW.length);
      unmount();
    }
    LEADER_THESIS_LINE_KW.forEach((word) => expect(LEADER_THESIS_LINE).toContain(word));
  });
});

// ── the three poses ──────────────────────────────────────────────────────────

describe("the three poses build the argument once each", () => {
  test("each pose adds its own beat and keeps the ones before it", () => {
    renderProof(gems, 0);
    const { figures } = figuresOf(gems, "gems");
    const revealed = (id: string) => screen.getByTestId(id).classList.contains("on");
    const rowsRevealed = () => figures.map((f) => revealed(`invest-row-${f.id}`));

    // Walked inside ONE mounted tree, so a beat that survives only a fresh mount
    // — or a pose that clears one it should have kept — fails here.
    expect(screen.getByTestId("invest-eyebrow")).toBeInTheDocument();
    expect(rowsRevealed()).toEqual([false, false, false, false]);
    expect(revealed("invest-attribution")).toBe(false);
    expect(revealed("invest-closer")).toBe(false);

    goToPose(1);
    expect(rowsRevealed()).toEqual([true, true, true, true]);
    expect(revealed("invest-attribution")).toBe(true);
    expect(revealed("invest-closer")).toBe(false);

    goToPose(2);
    expect(rowsRevealed()).toEqual([true, true, true, true]);
    expect(revealed("invest-attribution")).toBe(true);
    expect(revealed("invest-closer")).toBe(true);
    expect(screen.getByTestId("invest-closer").textContent).toBe(C.closer);
  });

  test("walks 0 → 2 and 2 → 0 to the same three frames", () => {
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
      // And the three frames are actually three — a pose that changed nothing
      // would pass the comparison above trivially.
      expect(new Set(forward).size, name).toBe(POSES.length);
      unmount();
    }
  });

  test("and there is no fourth pose hiding in the render", () => {
    // Nothing here may react to a pose the deck cannot produce (`steps: 3` clamps
    // at 2). A panel keyed on `pose >= 3` is unreviewed copy with a trigger
    // attached.
    renderProof(gems, 2);
    const atLast = document.body.innerHTML;
    // Asked through the slide rather than the figure, because the slide is what
    // the deck renders; `goTo` clamps, so this is the strongest pose the deck can
    // ask for and the assertion is that nothing beyond it exists to reach.
    goToPose(2);
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
    // `<animateMotion>`. This slide's whole motion budget is the `.fade`
    // transition on a pose change, which that rule already handles, so there is
    // nothing to gate.
    for (const block of [gems, berau, general]) {
      for (const pose of POSES) {
        const { container, unmount } = renderProof(block, pose);
        for (const tag of ["animate", "animateMotion", "animateTransform", "set"]) {
          expect(document.querySelectorAll(tag), `pose ${pose} · <${tag}>`).toHaveLength(0);
        }
        // AND NO SVG AT ALL. The ledger is type on a stage — there is no path, no
        // ring and no tether on this slide — so this line is the reminder that an
        // edit which adds an `<svg>` has re-opened the question above.
        expect(container.querySelectorAll("svg"), `pose ${pose}`).toHaveLength(0);
        unmount();
      }
    }
  });

  test("every pose still mounts every beat it has reached, with its copy", () => {
    // WHAT THIS CAN AND CANNOT SAY. jsdom runs no transition, so "the rows rest
    // on their finished frame" is not checkable here — a computed opacity mid
    // transition is nothing jsdom computes. This test therefore claims only the
    // DOM half: at each pose every element that pose has reached is mounted with
    // its copy. The computed half is checked in a real engine.
    const { figures, attribution } = figuresOf(berau, "berau");
    renderProof(berau, 0);
    expect(screen.getByTestId("invest-eyebrow").textContent).not.toBe("");

    goToPose(1);
    figures.forEach((f) => {
      expect(screen.getByTestId(`invest-figure-${f.id}`).textContent, f.id).toBe(f.figure);
      expect(screen.getByTestId(`invest-mark-${f.id}`).textContent, f.id).toBe(f.mark);
    });
    expect(screen.getByTestId("invest-attribution").textContent).toBe(attribution);

    goToPose(2);
    expect(screen.getByTestId("invest-closer").textContent).toBe(LEADER_THESIS_LINE);
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

  test("no figure, chip, eyebrow or source line is rendered through the highlighter", () => {
    // Rendered check, not an authored one: `<em class="kw">` is what a highlight
    // IS on the stage, so this reads the DOM for one inside any of those runs.
    for (const [name, block] of [
      ["gems", gems],
      ["berau", berau],
    ] as const) {
      const { figures } = figuresOf(block, name);
      const { unmount } = renderProof(block, 2);
      const labelBoxes = [
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
    renderProof(gems, 2);
    expect(document.querySelectorAll("h1 em").length).toBeGreaterThan(0);
    expect(screen.getByTestId("invest-closer").querySelectorAll("em").length).toBeGreaterThan(0);
  });

  test("no authored string names a section letter", () => {
    // §3.4 R2. This slide composed as D.1 from gh#56 until gh#70 and composes as D.2
    // today, because `invest-base-rates` (§6.7's D.1, built by #70) landed in front of
    // it and R3 stepped every row behind the insert inside the run. This comment
    // predicted exactly that move and named the wrong absence — it said D.1 held "no
    // ticket" — which is the reason the prediction is worth keeping and the ticket
    // number is not: a literal "D.1" or "SECTION D" anywhere in this copy WOULD have
    // become a lie on a projector, and it did, on 2026-08-08.
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
    const { container } = renderProof(gems, 2);
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

describe("the ledger geometry", () => {
  // ASSERTED AS INDEPENDENT INVARIANTS, not by calling the thing being checked.
  // The renderer reads `rowOffset` and `attributionOffset`, so a test that
  // expects `rowOffset(i)` and renders `rowOffset(i)` passes on any return value
  // at all — including one inside the NavBar's hover band. These are properties
  // the layout has to have.

  test("the rows are evenly pitched and none of them overlaps the next", () => {
    // The pitch IS the row plus the air, so a tighter column is one number and
    // the two cannot disagree about how much space is between two figures.
    expect(ROW_PITCH).toBe(ROW_HEIGHT + ROW_GAP);
    expect(ROW_GAP).toBeGreaterThan(0);

    for (let i = 0; i < ROW_CAPACITY; i++) {
      expect(rowOffset(i), `row ${i}`).toBe(i * ROW_PITCH);
      if (i === 0) continue;
      expect(rowOffset(i) - rowOffset(i - 1), `row ${i} pitch`).toBe(ROW_PITCH);
      expect(rowOffset(i), `row ${i} clears row ${i - 1}`).toBe(
        rowOffset(i - 1) + ROW_HEIGHT + ROW_GAP,
      );
    }
  });

  test("the band is sized for the TALLER brand, and refuses a row it cannot hold", () => {
    // GEMS renders four rows and Berau three (§6.7), so the band is measured
    // against four — and the capacity is DERIVED from the band rather than
    // written down, so moving the closer up moves the capacity with it.
    expect(ROW_CAPACITY).toBe(4);

    // WHAT THE TWO HEIGHTS OWE THE ROWS, held against `rowOffset` — which the test
    // above pins to `i * ROW_PITCH` on its own — and NOT re-typed from their own
    // formulas. The column has to END at the last row's bottom edge, and the source
    // line has to hang exactly `ATTRIBUTION_GAP` under that edge. Writing
    // `(count - 1) * ROW_PITCH + ROW_HEIGHT` on the right-hand side here would
    // compare the arithmetic with a copy of itself and pass on any value both
    // returned, which is the failure the paragraph at the top of this block is about.
    for (let count = 1; count <= ROW_CAPACITY; count++) {
      const lastRowBottom = rowOffset(count - 1) + ROW_HEIGHT;
      expect(columnHeight(count), `${count} rows`).toBe(lastRowBottom);
      expect(attributionOffset(count) - lastRowBottom, `${count} rows`).toBe(ATTRIBUTION_GAP);
      // AND THE WHOLE STACK FITS THE SLOT at every count the band accepts, not only
      // at the tallest one — this is what fails if the closer is ever moved up.
      expect(
        attributionOffset(count) + ATTRIBUTION_HEIGHT,
        `${count} rows`,
      ).toBeLessThanOrEqual(SLOT_HEIGHT);
    }

    // AND FOUR IS THE MOST THE SHELF ALLOWS, which is what makes it a capacity and
    // not a preference. A fifth row would hang its source line at stage y=566…582 —
    // inside the closer's fixed 556…590, printed over the deck's own thesis — while
    // the NavBar's hover band at y=632 is still 50px clear of it. THE CLOSER IS THE
    // CONSTRAINT; the band is not, and the numbers say so.
    const fifthAttributionTop =
      SLOT_TOP + ROW_CAPACITY * ROW_PITCH + ROW_HEIGHT + ATTRIBUTION_GAP;
    expect(fifthAttributionTop).toBeGreaterThan(CLOSER_TOP);
    expect(fifthAttributionTop).toBeLessThan(CLOSER_TOP + CLOSER_HEIGHT);
    expect(fifthAttributionTop + ATTRIBUTION_HEIGHT).toBeLessThan(NAV_ZONE_TOP);

    // SO IT THROWS instead of drawing it there. A silently placed fifth row is a
    // figure sitting on the sentence it is evidence for.
    expect(() => rowOffset(ROW_CAPACITY)).toThrow(/no row/);
    expect(() => rowOffset(-1)).toThrow(/no row/);
    expect(() => columnHeight(ROW_CAPACITY + 1)).toThrow(/rows/);
    expect(() => columnHeight(0)).toThrow(/rows/);
  });

  test("everything stays inside the margins and above the NavBar band", () => {
    // The two budgets `geometry.ts` documents, held as numbers rather than prose.
    // `.nav-zone` is `bottom: 0; height: 88px`, so the band's top edge is 632.
    expect(NAV_ZONE_TOP).toBe(720 - 88);
    expect(SIDE_MARGIN).toBe(48);
    expect(CONTENT_WIDTH).toBe(1280 - 2 * SIDE_MARGIN);

    // THE THREE COLUMNS TILE THE CONTENT WIDTH — asserted on the ROW THE RENDERER
    // AUTHORS, not on the constants. Summing the three back up proves nothing:
    // `METRIC_COL_W` is DEFINED as `CONTENT_WIDTH - FIGURE_COL_W - MARK_COL_W -
    // 2 * COL_GAP`, so that sum equals `CONTENT_WIDTH` for every value of every term
    // in it. What CAN fail is the render — a cell that hardcodes a width, or drops
    // the `marginLeft` standing in for a gap — and the chip is right-aligned to the
    // margin, so it is the thing that leaves the stage when the tiling breaks.
    const { figures: tiling } = figuresOf(gems, "gems");
    renderProof(gems, 1);
    const tiledRow = screen.getByTestId(`invest-row-${tiling[0].id}`);
    const cells = [...tiledRow.children] as HTMLElement[];
    expect(cells.length, "figure · metric · chip cell").toBe(3);
    const spanned = cells.reduce(
      (sum, cell) => sum + parseFloat(cell.style.width) + (parseFloat(cell.style.marginLeft) || 0),
      0,
    );
    expect(parseFloat(tiledRow.style.width)).toBe(CONTENT_WIDTH);
    expect(spanned, `${cells.map((c) => c.style.width).join(" + ")} + the two gaps`).toBe(
      CONTENT_WIDTH,
    );

    // And the residue is the METRIC's, not the chip's: the two cells a real engine
    // measured are the fixed ones, so they have to leave room over. Widen either and
    // this fails, where summing all three constants would not.
    for (const w of [FIGURE_COL_W, METRIC_COL_W, MARK_COL_W]) {
      expect(w).toBeGreaterThan(0);
    }
    expect(FIGURE_COL_W + MARK_COL_W + 2 * COL_GAP).toBeLessThan(CONTENT_WIDTH);

    // The vertical stack, top to bottom, with nothing in the band.
    expect(EYEBROW_TOP).toBeLessThan(SLOT_TOP);
    expect(SLOT_TOP + SLOT_HEIGHT).toBeLessThanOrEqual(CLOSER_TOP);
    expect(CLOSER_TOP + CLOSER_HEIGHT).toBeLessThan(NAV_ZONE_TOP);
    expect(NAV_ZONE_CLEARANCE).toBe(NAV_ZONE_TOP - (CLOSER_TOP + CLOSER_HEIGHT));
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);
  });

  test("and the render reads those numbers rather than its own", () => {
    // Structural, because jsdom places nothing: each row reads its own offset, so
    // a row and the band it is supposed to sit in cannot disagree.
    const { figures } = figuresOf(gems, "gems");
    renderProof(gems, 1);

    const slot = screen.getByTestId("invest-proof-slot");
    expect(slot.style.left).toBe(`${SIDE_MARGIN}px`);
    expect(slot.style.top).toBe(`${SLOT_TOP}px`);
    expect(slot.style.width).toBe(`${CONTENT_WIDTH}px`);
    expect(slot.style.height).toBe(`${SLOT_HEIGHT}px`);

    figures.forEach((f, i) => {
      const row = screen.getByTestId(`invest-row-${f.id}`);
      expect(row.style.top, f.id).toBe(`${rowOffset(i)}px`);
      expect(row.style.height, f.id).toBe(`${ROW_HEIGHT}px`);
      expect(screen.getByTestId(`invest-figure-${f.id}`).style.width, f.id).toBe(
        `${FIGURE_COL_W}px`,
      );
      expect(screen.getByTestId(`invest-metric-${f.id}`).style.width, f.id).toBe(
        `${METRIC_COL_W}px`,
      );
    });

    // THE ATTRIBUTION HANGS OFF THE COUNT, which is the whole reason the band is
    // derived: it sits under the last row, and the last row is a different row
    // in each of the two decks.
    expect(screen.getByTestId("invest-attribution").style.top).toBe(
      `${attributionOffset(figures.length)}px`,
    );
    expect(screen.getByTestId("invest-closer").style.top).toBe(`${CLOSER_TOP}px`);
  });

  test("the attribution moves with the brand's row count, and the closer does not", () => {
    const gemsFigures = figuresOf(gems, "gems").figures;
    const berauFigures = figuresOf(berau, "berau").figures;
    expect(gemsFigures.length).toBe(4);
    expect(berauFigures.length).toBe(3);

    const first = renderProof(gems, 2);
    const gemsAttribution = screen.getByTestId("invest-attribution").style.top;
    const gemsCloser = screen.getByTestId("invest-closer").style.top;
    first.unmount();

    renderProof(berau, 2);
    const berauAttribution = screen.getByTestId("invest-attribution").style.top;
    const berauCloser = screen.getByTestId("invest-closer").style.top;

    // DERIVED, so the shorter column's source line rides up with it instead of
    // floating a row's worth of empty space above the closer.
    expect(gemsAttribution).not.toBe(berauAttribution);
    expect(parseFloat(berauAttribution)).toBeLessThan(parseFloat(gemsAttribution));
    expect(parseFloat(gemsAttribution) - parseFloat(berauAttribution)).toBe(ROW_PITCH);

    // THE CLOSER IS PINNED. It is the one line both decks print byte for byte
    // (§4.5), and a thesis that landed 82px higher in one room than the other
    // would be the deck's own argument arriving in a different place each time.
    expect(berauCloser).toBe(gemsCloser);
  });
});
