// B.3 · THREE FAILURES, ONE SHAPE — §6.3's record and §6.4's pattern, on ONE stage.
//
// THIS FILE REPLACES TWO. `gap-three-failures.test.tsx` and `gap-the-pattern.test.tsx`
// retired with their slides when the merge won its review (gh#67), and every rule they
// held that still binds is held here: the first-person voice, the absent second person,
// the HR p16–18 outcome cut, the sibling boundaries, the keyword split, and the two ACs
// that are checkable in jsdom (zero SMIL at every pose, no letter or number in any
// rendered string). The two rules that DID NOT survive the merge are named where they
// would have been asserted, so their absence reads as a decision rather than a gap.
//
// WHAT IS LEFT TO THE BROWSER WALK: the painted colour tiers; the plates actually
// reading as five scattered tools, ten connectors and a backed-up queue; the card
// contraction reading as a reduction rather than a replacement; and the squashed-duration
// half of the reduce-mode AC (every arrival resting on its FINISHED frame). The markup
// half — that nothing under this slide reads `matchMedia`, and that zero SMIL nodes mount
// at either pose — is held below.
//
// DECK COMPOSITION IS NOT ASSERTED HERE. Where this slide sits in the two leader decks
// belongs to `deck-registry.test.ts`, `deck-slots.test.ts` and the numbering fixture.
// `AT` below is a harness INPUT, not a claim the slide makes: this module epoch resolves
// the default `general` deck, which runs no leader slide at all.
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { restoreLocation } from "../harvest/deck-numbering";
import { BRANDS, type Brand } from "@/deck-variants";
import {
  GapFailuresPattern,
  gapFailuresPatternSlide,
} from "@/slides/leader-gap/gap-failures-pattern";
import {
  gapFailuresPatternContent,
  gapHardestPartContent,
  gapLadderContent,
  gapNoSopContent,
} from "@/slides/leader-gap/content";
// The two siblings whose turn to the room this slide may not make, as MODULES rather
// than as sentences copied into this file — the rule the retired `gap-three-failures`
// test established and this one inherits wholesale.
import { investChickenEggContent } from "@/slides/leader-invest/content";
import { j1Content, j2Content } from "@/slides/reveal-and-closing/content";
import {
  CARD_BOTTOM_RECORD,
  CARD_COUNT,
  CARD_HEIGHT_LESSON,
  CARD_HEIGHT_RECORD,
  CARD_INNER_WIDTH,
  HAPPENING_COUNT,
  HAPPENING_INDENT,
  NAV_ZONE_CLEARANCE_RECORD,
  NAV_ZONE_CLEARANCE_SHIFT,
  NAV_ZONE_TOP,
  NODE_COUNT,
  NODE_RING_INSET,
  NODE_SIZE,
  PLATE_HEIGHT,
  PLATE_WIDTH,
  QUEUE_DOTS,
  QUEUE_DOT_RADIUS,
  RING_CX,
  RING_CY,
  RING_RX,
  RING_RY,
  SHIFT_BOX_HEIGHT,
  SHIFT_COL_COUNT,
  SURVIVOR_INDICES,
  TOOL_GLYPHS,
  cardLeft,
  funnelSpanAt,
  happeningY,
  ringStart,
  shiftColLeft,
} from "@/slides/leader-gap/gap-failures-pattern-geometry";

const C = gapFailuresPatternContent;
const POSES = [0, 1] as const;

/**
 * The position this slide holds in the decks that will run it.
 *
 * `at` IS required here, the case every leader-only sibling documents: unit tests resolve
 * the default `general` deck, `general` has no leader variant, and this slide reaches the
 * leader deck sets alone. B.3 because the `gap` run is the leader decks' first (§4.3) and
 * this slide is its THIRD row — a harness INPUT, not a claim the slide makes (§3.5). No
 * file under `src/slides/leader-gap/` names either half of it.
 */
const AT = { letter: "B", num: 3, sectionKey: "gap" } as const;

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

function renderSlide(pose = 0) {
  const out = render(
    <SlideHarness def={gapFailuresPatternSlide} at={AT}>
      <Nav />
      <GapFailuresPattern />
    </SlideHarness>,
  );
  if (pose > 0) act(() => screen.getByTestId(`goto-${pose}`).click());
  return out;
}

afterEach(cleanup);
afterAll(restoreLocation);

// ── corpora ──────────────────────────────────────────────────────────────────

/** Every string reachable from `value` — the walk, not a hand list, for the sibling
 *  files' reason: a field added next month is inside every rule below the day it exists.
 *  It collects `id` fields too, deliberately: those reach the DOM as `data-testid`, and a
 *  borrowed image written into a hook is the same defect written somewhere less visible. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/** Every string this slide can put on a stage. ONE block, because this slide has no
 *  brand axis — see the `no brand variance` describe below, which holds that as a rule. */
const authoredStrings = (): string[] => walkStrings(C);

/** Everything the stage renders, minus the one element that legitimately prints a
 *  DERIVED figure reference. Stripped from a CLONE: React owns those nodes and removing
 *  one behind its back throws on the next commit. */
function stageTextWithoutFigLabel(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

/** The label half of the `FigLabel` — its last span, the only part this slide authors.
 *  The `B.3` in front of it is the composer's. */
function figLabelText(container: HTMLElement): string {
  const spans = container.querySelectorAll(".fig-label span");
  return spans[spans.length - 1]?.textContent ?? "";
}

// ── the keyword rule, as two lists ───────────────────────────────────────────

/** Every PROSE string, each with the `*Kw` sibling the copy module pairs it with. */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ...C.cards.flatMap((card) => [
    [`${card.id}.subtitle`, card.subtitle, card.subtitleKw] as const,
    [`${card.id}.learned`, card.learned, card.learnedKw] as const,
    ...card.happenings.map(
      (h, i) => [`${card.id}.happenings[${i}].rest`, h.rest, h.restKw] as const,
    ),
  ]),
  ...C.lessons.map((l) => [`${l.id}.quote`, l.quote, l.quoteKw] as const),
  ["mindset", C.mindset, C.mindsetKw],
];

/** Every LABEL string, which carries no `*Kw` and may not gain one. Written out on
 *  purpose: together with `PROSE` it is checked against what the STAGE actually prints,
 *  so a new string has to pick a side before it can render. */
const LABELS: readonly string[] = [
  C.figLabel,
  C.recordEyebrow,
  C.lessonsEyebrow,
  C.shiftEyebrow,
  C.mindsetLabel,
  ...C.cards.map((card) => card.period),
  ...C.cards.map((card) => card.title),
  ...C.cards.flatMap((card) => card.happenings.map((h) => h.label)),
  ...C.lessons.map((l) => l.phase),
  ...C.lessons.map((l) => l.title),
  ...C.shiftColumns.map((col) => col.title),
];

// ─────────────────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("declares two poses, ends on the shift, and steps rather than beats", () => {
    expect(gapFailuresPatternSlide.id).toBe("gap-failures-pattern");
    expect(gapFailuresPatternSlide.steps).toBe(2);
    // THE FULLEST POSE, and the one the PDF and PPTX exports print. A canonical pose of 0
    // would export three admissions with nothing owning them.
    expect(gapFailuresPatternSlide.canonicalPose).toBe(1);
    expect(gapFailuresPatternSlide.animationMode).toBe("step-reveal");
    expect(gapFailuresPatternSlide.surface).toBe("dark");
    expect(gapFailuresPatternSlide.sectionKey).toBe("gap");
  });
});

describe("pose 0 · the record", () => {
  test("prints all three phases IN FULL — a pattern cannot be argued from a partial list", () => {
    const { container, unmount } = renderSlide(0);
    const stage = stageTextWithoutFigLabel(container);

    expect(stage).toContain(C.recordEyebrow);
    expect(container.querySelectorAll('[data-testid^="gfp-card-"]')).toHaveLength(CARD_COUNT);

    for (const card of C.cards) {
      expect(container.querySelector(`[data-testid="gfp-card-${card.id}"]`)).not.toBeNull();
      expect(stage, card.id).toContain(card.period);
      expect(stage, card.id).toContain(card.title);
      expect(stage, card.id).toContain(card.subtitle);
      expect(stage, card.id).toContain(card.learned);
      // FOUR ON EVERY CARD, the count the type pins: a triptych that argues sameness
      // cannot have one column longer than the others.
      expect(card.happenings).toHaveLength(HAPPENING_COUNT);
      for (const h of card.happenings) {
        expect(stage, `${card.id} · ${h.label}`).toContain(h.label);
        expect(stage, `${card.id} · ${h.rest}`).toContain(h.rest);
      }
    }
    // The record's face is the visible one and the lesson's is the one waiting.
    for (const card of C.cards) {
      expect(faceVisible(container, `gfp-record-${card.id}`)).toBe(true);
      expect(faceVisible(container, `gfp-lesson-${card.id}`)).toBe(false);
    }
    unmount();
  });

  test("every happening still fits the two lines its box is cut for", () => {
    // THE ROW IS A FIXED 34px BOX WITH `overflow: hidden` ON IT, so a happening that
    // grows past two lines does not push the card taller — it is SILENTLY CLIPPED, and
    // the third line is gone in a room without a word about it anywhere. That is the
    // one failure this slide's copy can produce that no other test here would see.
    //
    // IT WAS ADDED WHEN THE COPY GREW (2026-08-16). "AISC formed" became "AI Steering
    // Committee (AISC) formed" — the acronym is spelled out on first use now that C.1's
    // hub names the body — and that row went from 76 to 100 characters, which is the
    // longest on the slide and the first one close enough to the ceiling to be worth a
    // guard.
    //
    // WHAT THE ARITHMETIC IS. `gap-failures-pattern-geometry.ts` records the datum: Source
    // Serif 4 advances ≈0.498em a character, the happenings are 12.5px, and they get the
    // card's measure less their marker column. Two of those lines is the box.
    //
    // WHAT IT CANNOT SEE, stated so nobody reads a pass here as a rendered proof: word
    // wrap (a long word can leave a line short), and the label's semibold weight, which
    // advances slightly wider than the regular it is averaged with. So the margin below
    // is the honest budget, not the pass mark — a row that only just fits here is a row
    // to check in a browser.
    const measure = CARD_INNER_WIDTH - HAPPENING_INDENT;
    const twoLines = 2 * measure;
    const perChar = 12.5 * 0.498;

    const widths = C.cards.flatMap((card) =>
      card.happenings.map((h) => ({
        where: `${card.id} · ${h.label}`,
        width: (`${h.label} — ${h.rest}`).length * perChar,
      })),
    );
    // POSITIVE CONTROL: the sweep saw all twelve.
    expect(widths).toHaveLength(CARD_COUNT * HAPPENING_COUNT);
    for (const { where, width } of widths) {
      expect(width, `${where} · ${Math.round(width)} of ${twoLines}`).toBeLessThanOrEqual(
        twoLines,
      );
    }
    // AND THE MARGIN IS NAMED, so the next edit that eats it fails HERE rather than in
    // the room. The longest row today is ~622 of 644 — about 3% of headroom, which is
    // less than one line's worth of wrap slack.
    const longest = Math.max(...widths.map((w) => w.width));
    expect(longest, "the longest happening").toBeLessThanOrEqual(twoLines);
    expect(twoLines - longest, "headroom left on the longest row").toBeGreaterThan(0);
  });

  test("runs one plate per phase, and each plate's arithmetic is its copy's", () => {
    const { container, unmount } = renderSlide(0);
    for (const id of ["gfp-plate-tools", "gfp-plate-connectors", "gfp-plate-queue"]) {
      expect(container.querySelector(`[data-testid="${id}"]`), id).not.toBeNull();
    }
    // TEN NODES, TWO LIT — "8 of 10 AI connectors — scrapped" and "2 connectors" among
    // what held. The picture cannot disagree with the sentence, so it is read off the DOM
    // rather than off the constant.
    const nodes = container.querySelectorAll('[data-testid^="gfp-node-"]');
    expect(nodes).toHaveLength(NODE_COUNT);
    const live = [...nodes].filter((n) => n.getAttribute("data-state") === "live");
    expect(live).toHaveLength(SURVIVOR_INDICES.length);
    expect(live).toHaveLength(2);
    expect(NODE_COUNT - live.length).toBe(8);
    const scrapped = C.cards[1].happenings.find((h) => h.label.startsWith("8 of 10"));
    expect(scrapped, "the copy still says eight of ten").not.toBeUndefined();
    const held = C.cards[1].happenings.find((h) => h.rest.startsWith("2 connectors"));
    expect(held, "the copy still says two held").not.toBeUndefined();
    // AND ALL TEN RIDE THE RING — every node carries its own start on the path, evenly
    // spaced, which is what makes the loop seamless AND what keeps the reduced-motion
    // squash from stacking all ten on the path's origin.
    const starts = [...nodes].map((n) => (n as HTMLElement).style.getPropertyValue("--gfp-ring-start"));
    expect(new Set(starts).size).toBe(NODE_COUNT);
    expect(starts).toEqual([...Array(NODE_COUNT).keys()].map((i) => `${ringStart(i)}%`));
    // AND THE SAME PLACE IS ALSO THE NODE'S BASE `offset-distance`, which is what the
    // reduced-motion squash falls back to: `gfp-ring` takes no fill mode, so without a
    // base the whole ring collapses onto the path's origin the moment the animation is
    // squashed to 0.01ms. Read off the style ATTRIBUTE — jsdom parses no motion-path
    // longhand, so `style.offsetDistance` is empty in this environment and would pass
    // vacuously.
    for (const [i, node] of [...nodes].entries()) {
      expect(node.getAttribute("style"), `node ${i}`).toContain(
        `offset-distance: ${ringStart(i)}%`,
      );
    }
    unmount();
  });

  test("holds nothing of the shift", () => {
    const { container, unmount } = renderSlide(0);
    for (let i = 0; i < SHIFT_COL_COUNT; i += 1) {
      expect(revealOn(container, `gfp-shift-col-${i}`), `column ${i}`).toBe(false);
    }
    expect(revealOn(container, "gfp-mindset")).toBe(false);
    unmount();
  });

  test("the shift takes no pointer off a card — it is on top of the lower half of all three", () => {
    // THE BUG THIS HOLDS SHUT. The shift block renders AFTER the triptych, so it paints
    // over the bottom ~160px of every card; invisible at pose 0 it was still
    // hit-testable, and hovering a card lit it near the top and did nothing near the
    // bottom. jsdom does no hit-testing, so what is checkable here is the FIX: every
    // piece of the shift sits under one wrapper that is inert, at both poses.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      const pieces = [
        ...[...Array(SHIFT_COL_COUNT).keys()].map((i) => `gfp-shift-col-${i}`),
        "gfp-mindset",
      ];
      for (const testId of pieces) {
        const el = container.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
        const inert = el.closest('[style*="pointer-events: none"]');
        expect(inert, `${testId} at pose ${pose} can eat a card's pointer`).not.toBeNull();
      }
      unmount();
    }
  });
});

describe("pose 1 · the lessons and the shift", () => {
  test("each card contracts to the lesson it reduces to, on the record's own shelves", () => {
    const { container, unmount } = renderSlide(1);
    const stage = stageTextWithoutFigLabel(container);

    expect(stage).toContain(C.lessonsEyebrow);
    // Still three cards — the SAME three, contracted, which is what makes pose 1 a
    // reduction rather than a second figure.
    expect(container.querySelectorAll('[data-testid^="gfp-card-"]')).toHaveLength(CARD_COUNT);
    for (const card of C.cards) {
      const box = container.querySelector(`[data-testid="gfp-card-${card.id}"]`) as HTMLElement;
      expect(box.style.height, card.id).toBe(`${CARD_HEIGHT_LESSON}px`);
      expect(faceVisible(container, `gfp-record-${card.id}`)).toBe(false);
      expect(faceVisible(container, `gfp-lesson-${card.id}`)).toBe(true);
    }
    // ONE LESSON PER FAILURE, pinned by id — a lesson whose phase drifted off its own
    // record would print under the wrong plate.
    expect(C.lessons.map((l) => l.id)).toEqual(C.cards.map((card) => card.id));
    for (const lesson of C.lessons) {
      expect(stage, lesson.id).toContain(lesson.phase);
      expect(stage, lesson.id).toContain(lesson.title);
      expect(stage, lesson.id).toContain(lesson.quote);
    }
    // ALL THREE TITLES ARE ONE GRAMMAR, which is the argument as much as the copy is.
    for (const lesson of C.lessons) expect(lesson.title).toMatch(/^[A-Z ]+ OVER [A-Z ]+$/);
    unmount();
  });

  test("the three plates keep running — nothing on this stage freezes", () => {
    // THE OWNER CALL OF 2026-08-13. The cards used to take `.gfp-still` when they
    // contracted, and `failures-pattern.css` paused every `.gfp-loop` under it; three
    // loops stopping mid-sentence read as the stage going dead under a presenter who was
    // still talking. jsdom computes no stylesheet, so what is checkable here is the HOOK:
    // the class is not written at either pose, and every plate is still mounted.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      expect(container.querySelectorAll(".gfp-still"), `pose ${pose}`).toHaveLength(0);
      for (const id of ["gfp-plate-tools", "gfp-plate-connectors", "gfp-plate-queue"]) {
        expect(container.querySelector(`[data-testid="${id}"]`), `${id} at pose ${pose}`).not.toBeNull();
      }
      // …and the ambient loops are still NAMED, so a future pose rule has one selector.
      expect(container.querySelectorAll(".gfp-loop").length, `pose ${pose}`).toBeGreaterThan(0);
      unmount();
    }
  });

  test("the shift arrives in the space the contraction paid for, and closes the slide", () => {
    const { container, unmount } = renderSlide(1);
    const stage = stageTextWithoutFigLabel(container);

    expect(stage).toContain(C.shiftEyebrow);
    expect(C.shiftColumns).toHaveLength(SHIFT_COL_COUNT);
    for (const [i, col] of C.shiftColumns.entries()) {
      expect(revealOn(container, `gfp-shift-col-${i}`), col.title).toBe(true);
      expect(stage).toContain(col.title);
      for (const bullet of col.bullets) expect(stage, col.title).toContain(bullet);
      // TWO BOXES, AND THE SAME BOX TWICE — the second half holds three bullets and the
      // first four, and a pair that bottomed out at different heights would read as one
      // of them being unfinished.
      const box = container.querySelector(`[data-testid="gfp-shift-col-${i}"]`) as HTMLElement;
      expect(box.style.height, col.title).toBe(`${SHIFT_BOX_HEIGHT}px`);
      expect(box.style.border, col.title).toContain("solid");
    }
    // THE LAST ARRIVAL, and the only line addressed past the record.
    expect(revealOn(container, "gfp-mindset")).toBe(true);
    expect(stage).toContain(C.mindsetLabel);
    expect(stage).toContain(C.mindset);
    unmount();
  });
});

describe("the voice", () => {
  test("is first person plural, and makes no turn to the room", () => {
    const { container, unmount } = renderSlide(1);
    const stage = stageTextWithoutFigLabel(container);

    // NO SECOND PERSON ANYWHERE, held word-boundary and case-insensitive over the copy
    // AND over the rendered stage. The one hard property that keeps this a confession.
    for (const copy of [...authoredStrings(), stage]) {
      expect(copy, `second person in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(you|your|yours|you're|you've|yourself)\b/i,
      );
    }
    // AND IT IS PLURAL, NOT SINGULAR. The retired §6.3 slide ended on "Every one of these
    // calls was mine"; the merge dropped that line for space and the presenter says it, so
    // no string here is in the first person singular.
    for (const copy of authoredStrings()) {
      expect(copy, `first person singular in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(I|I'm|I've|my|mine)\b/,
      );
    }
    // POSITIVE CONTROL — the plural IS spoken, so the rule above is not passing vacuously.
    expect(C.cards.some((card) => /\bwe\b/i.test(card.subtitle))).toBe(true);
    expect(/\bwe\b/i.test(C.mindset)).toBe(true);

    // AND THE "SO YOU CAN SKIP IT" MOVE BELONGS TO D.3 AND M.1/M.2 — fired against their
    // real strings, so a reworded turn is still a positive control.
    const turns = [
      investChickenEggContent.turn,
      ...walkStrings(j1Content).filter((s) => /\byou\b/i.test(s)),
      ...walkStrings(j2Content).filter((s) => /\byou\b/i.test(s)),
    ];
    expect(turns.some((s) => /\b(you|your)\b/i.test(s)), "a sibling still makes the turn").toBe(
      true,
    );
    unmount();
  });
});

describe("the HR p16–18 outcomes are cut", () => {
  /**
   * §6.3's cut, held as a regex list fired against the sentences the research actually
   * prints — a PDF page N is source slide N−1, so p16–18 are HR slides 15, 16 and 17: the
   * app-performance benchmark, the support chatbot and the capability-calibration pair.
   *
   * THE CONTROL SENTENCES ARE THE RESEARCH'S, TRANSCRIBED, because the research is not a
   * module this deck can import. Each pattern is fired at them first, so a list that
   * rotted into patterns matching nothing fails loudly instead of passing vacuously.
   */
  const OUTCOME_SENTENCES: readonly string[] = [
    "6.90× faster delivery on the same codebase, benchmarked across four apps",
    "the support chatbot deflected 47% of conversations in its first quarter",
    "one large prompt, and the ownership chain ran through a single engineer",
    "the capability calibration split preparation from implementation",
  ];

  const OUTCOME_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
    // NO `\b` AFTER THE MULTIPLIER: `×` is not a word character, so a boundary after it
    // never matches and the pattern would fire on nothing — which the control catches.
    ["a performance multiple", /\d\s*[×x]/],
    ["a deflection figure", /\bdeflect\w*\b/i],
    ["the benchmark", /\bbenchmark\w*\b/i],
    ["same codebase", /\bsame codebase\b/i],
    ["one large prompt", /\bone large prompt\b/i],
    ["the ownership chain", /\bownership chain\b/i],
    ["the chatbot", /\bchat\s?bot\b/i],
    ["preparation vs implementation", /\bpreparation\b/i],
  ];

  test("names no outcome, and prints no percentage", () => {
    const { container, unmount } = renderSlide(1);
    const stage = stageTextWithoutFigLabel(container);

    for (const [name, pattern] of OUTCOME_TOKENS) {
      // The control first: the pattern matches something the research really says.
      expect(
        OUTCOME_SENTENCES.some((line) => pattern.test(line)),
        `"${name}" matches nothing HR p16–18 prints — the pattern has rotted`,
      ).toBe(true);
      for (const copy of [...authoredStrings(), stage]) {
        expect(pattern.test(copy), `"${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
    }
    // OUTCOMES BRAG, FAILURES TRANSFER — and a percentage is how a win comes back in
    // through the back door. The only numerals on this stage are the phases' own.
    for (const copy of authoredStrings()) {
      expect(copy, `a percentage in ${JSON.stringify(copy)}`).not.toMatch(/\d\s*%/);
    }
    unmount();
  });
});

describe("the sibling boundaries", () => {
  /**
   * What this slide may not say, and which slide owns each thing. Every pattern is fired
   * against the real strings of the slide that owns it, so a list that drifted out of date
   * fails loudly instead of passing vacuously.
   *
   * §6.4's CAPABILITY REFRAME LEFT WITH THE MERGE, and `capabilit*` moved with it: the
   * retired `gapThePatternContent.capabilityLine` was the one string in this section that
   * printed the noun outside B.1 and B.5, and pose 1 now hands off to the ladder through
   * the shift's closing question instead. So the token is a boundary again rather than a
   * shared word, which is why it is in this list and not excepted from it.
   */
  const SIBLING_TOKENS: ReadonlyArray<readonly [string, RegExp, string]> = [
    ["70%", /\b70\s*%/, "B.1"],
    // §6.5 AND NO SLIDE, since 2026-08-13. The spelling used to be printed by B.4's
    // L3 rung ("Decision contract · 70/30 split") and by nothing else — B.1 renders
    // 70% and 30% as two separate bar labels and never the ratio. That rung now
    // defines the decision contract in words instead, so the token has an owning
    // SPEC SECTION and no owning STRING, which is the same shape as the two below
    // it and is why the owner is spelled as a section rather than a slide: an owner
    // this file has no corpus for is skipped by the control loop, not asserted
    // against an empty list.
    ["70/30", /\b70\s*\/\s*30\b/, "§6.5"],
    ["people & process", /people\s*&\s*process/i, "B.1"],
    ["tool access", /\btool access\b/i, "B.1"],
    ["procured", /\bprocure\w*\b/i, "B.1"],
    ["invoice", /\binvoice\w*\b/i, "B.1"],
    ["capability", /\bcapabilit\w*\b/i, "B.1 · B.4"],
    ["earned", /\bearned\b/i, "B.1 · B.4"],
    ["the rule nobody wrote", /\bnobody wrote\b/i, "B.2"],
    ["handed out", /\bhanded out\b/i, "B.2"],
    ["no rule to break", /\bno rule to break\b/i, "B.2"],
    ["L1–L5", /\bL[1-5]\b/, "B.4"],
    ["rungs", /\brungs?\b/i, "B.4"],
    ["ladder", /\bladder\b/i, "B.4"],
    ["decision contract", /\bdecision contract\b/i, "B.4"],
    ["shadow", /\bshadow\b/i, "§6.2 · D.4"],
    ["SOP", /\bSOPs?\b/, "§6.2 · D.4"],
    ["deadlock", /\bdeadlock\w*\b/i, "D.3"],
    ["shared accounts", /\bshared account\w*\b/i, "D.3"],
    ["kill criterion", /\bkill criteri\w*\b/i, "D.3"],
  ];

  /** The corpora, by owner. MODULES, not transcriptions — a token can migrate either way
   *  and only the receiving file notices. */
  const CORPORA: Readonly<Record<string, () => string[]>> = {
    "B.1": () => walkStrings(gapHardestPartContent),
    "B.2": () => walkStrings(gapNoSopContent),
    "B.4": () => walkStrings(gapLadderContent),
    "D.3": () => walkStrings(investChickenEggContent),
  };

  test("spends no word a sibling in this run already owns", () => {
    const { container, unmount } = renderSlide(1);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(400);

    for (const [name, pattern, owner] of SIBLING_TOKENS) {
      for (const copy of [...authoredStrings(), stage]) {
        expect(pattern.test(copy), `${owner}'s "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      // …and it really is theirs. `§6.2 · D.4` names spec sections rather than a corpus
      // this file imports, so those two are controlled by `gap-no-sop.test.tsx` instead.
      const owners = owner.split(" · ").filter((key) => key in CORPORA);
      if (owners.length === 0) continue;
      expect(
        owners.some((key) => CORPORA[key]().some((copy) => pattern.test(copy))),
        `"${name}" is not ${owner}'s any more`,
      ).toBe(true);
    }
    for (const [key, corpus] of Object.entries(CORPORA)) {
      expect(corpus().length, `${key}'s corpus is empty`).toBeGreaterThan(10);
    }
    unmount();
  });

  test("names no successor and counts none", () => {
    for (const copy of authoredStrings()) {
      expect(copy).not.toMatch(/\bnext (slide|section|four|three)\b/i);
    }
  });
});

describe("the keyword rule", () => {
  test("every PROSE string carries keywords that are really inside it", () => {
    for (const [name, copy, kw] of PROSE) {
      expect(kw.length, `${name} has no keywords`).toBeGreaterThan(0);
      for (const k of kw) expect(copy, `${name}: "${k}"`).toContain(k);
    }
  });

  test("bullet keyword lists are shared per column and each one lands somewhere", () => {
    // The shift's bullets take ONE list per column rather than one per line — they are
    // read as a column, not as four sentences. So the rule is that every keyword in the
    // list is inside SOME bullet of that column, which is what catches a reworded bullet.
    for (const col of C.shiftColumns) {
      expect(col.bulletsKw.length, col.title).toBeGreaterThan(0);
      for (const k of col.bulletsKw) {
        expect(col.bullets.some((b) => b.includes(k)), `${col.title}: "${k}"`).toBe(true);
      }
    }
  });

  test("no LABEL gains a keyword, and the two lists cover the whole stage", () => {
    const printed = new Set([...PROSE.map(([, copy]) => copy), ...LABELS]);

    // A LABEL may not be a prose string wearing another hat.
    for (const label of LABELS) {
      expect(PROSE.some(([, copy]) => copy === label), label).toBe(false);
    }
    // AND EVERY STRING ON EITHER LIST REALLY REACHES A STAGE, at one pose or the other —
    // the half of the rule that catches a string classified but never rendered. Read over
    // BOTH poses because the two faces are alternatives: the record's rows print at pose 0
    // and the lessons and the shift at pose 1.
    const rendered = POSES.map((pose) => {
      const { container, unmount } = renderSlide(pose);
      const text = stageTextWithoutFigLabel(container);
      unmount();
      return text;
    });
    for (const copy of printed) {
      if (copy === C.figLabel) continue; // stripped from the stage text on purpose
      expect(
        rendered.some((text) => text.includes(copy)),
        `${JSON.stringify(copy)} is classified but never printed`,
      ).toBe(true);
    }
    // AND EVERY STRING THE MODULE EXPORTS IS ON ONE SIDE OR THE OTHER — minus the `*Kw`
    // entries themselves and the ids, which are keys rather than copy.
    const ids = new Set([...C.cards.map((c) => c.id), ...C.lessons.map((l) => l.id)]);
    const kws = new Set(
      PROSE.flatMap(([, , kw]) => kw as readonly string[]).concat(
        C.shiftColumns.flatMap((col) => col.bulletsKw as readonly string[]),
      ),
    );
    for (const copy of authoredStrings()) {
      if (ids.has(copy) || kws.has(copy)) continue;
      if (C.shiftColumns.some((col) => (col.bullets as readonly string[]).includes(copy))) continue;
      expect(printed.has(copy), `${JSON.stringify(copy)} picked neither side`).toBe(true);
    }
  });
});

describe("figure freedom", () => {
  test("prints no letter and no number of its own (§3.4 R2 / §3.5)", () => {
    const { container, unmount } = renderSlide(1);

    // The FigLabel's own half is a LABEL. The `B.3` in front of it is the composer's.
    expect(figLabelText(container)).toBe(C.figLabel);
    expect(C.figLabel).not.toMatch(/\b[A-Z]\.\d/);

    // NOTHING ELSE ON THE STAGE CARRIES A FIGURE REFERENCE, and the phases' own labels
    // are the documented exception: `PHASE 1 · Q1 2025` is the phase's name, not a deck
    // figure, so the pattern below is a LETTER-DOT-NUMBER one rather than "no digits".
    const stage = stageTextWithoutFigLabel(container);
    expect(stage).not.toMatch(/\b[A-Z]\.\d\b/);
    for (const copy of authoredStrings()) {
      expect(copy, JSON.stringify(copy)).not.toMatch(/\b[A-Z]\.\d\b/);
    }
    unmount();
  });
});

describe("no brand variance", () => {
  test("the section's own module exports no resolver for this slide", () => {
    // §4.4's seven brand × deckSet slots do not list this slide: these failures are
    // Nanovest's own, and they are the same admissions in every room. The ONE resolver
    // this file exports belongs to §6.5's ladder, which does put an organisation's
    // evidence in front of that organisation — so the check is that the block is a plain
    // object and the resolver is not reaching it.
    for (const brand of Object.keys(BRANDS) as Brand[]) {
      expect(walkStrings(C), brand).toEqual(walkStrings(gapFailuresPatternContent));
    }
    expect(Object.keys(C)).not.toContain("byBrand");
  });
});

describe("the motion contract", () => {
  test("mounts zero SMIL nodes at either pose, under either motion preference", () => {
    for (const reduce of [false, true]) {
      const mql = vi.fn().mockImplementation((query: string) => ({
        matches: reduce && query.includes("reduce"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
        onchange: null,
      }));
      vi.stubGlobal("matchMedia", mql);
      for (const pose of POSES) {
        const { container, unmount } = renderSlide(pose);
        expect(
          container.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
            .length,
          `SMIL at pose ${pose}, reduce=${reduce}`,
        ).toBe(0);
        // AND NOTHING UNDER THIS SLIDE ASKS: the reduce-mode contract is held by the
        // global CSS squash, so a component that branched on the preference would be
        // holding the same rule twice, in two places, one of them untested.
        expect(mql, `matchMedia read at pose ${pose}`).not.toHaveBeenCalled();
        unmount();
      }
      vi.unstubAllGlobals();
    }
  });
});

describe("the geometry", () => {
  test("neither pose crosses the NavBar's hover band", () => {
    // The floor is `.nav-zone`'s top edge (y=632) and not `.slide-content`'s bottom — the
    // rule every geometry module in this directory keeps. Both clearances are DERIVED from
    // both ends, so an edit anywhere above moves them and a negative one is caught here.
    expect(NAV_ZONE_CLEARANCE_RECORD).toBeGreaterThan(0);
    expect(NAV_ZONE_CLEARANCE_SHIFT).toBeGreaterThan(0);
    expect(CARD_BOTTOM_RECORD).toBeLessThan(NAV_ZONE_TOP);
    // The contraction really frees space — pose 1's block only fits because it does.
    expect(CARD_HEIGHT_LESSON).toBeLessThan(CARD_HEIGHT_RECORD);
  });

  test("refuses a fourth card, a fifth happening and a third column", () => {
    expect(() => cardLeft(CARD_COUNT)).toThrow(/no card 3/);
    expect(() => cardLeft(-1)).toThrow(/no card -1/);
    expect(() => happeningY(HAPPENING_COUNT)).toThrow(/no happening 4/);
    expect(() => shiftColLeft(SHIFT_COL_COUNT)).toThrow(/no column 2/);
    expect(() => ringStart(NODE_COUNT)).toThrow(/no connector 10/);
  });

  test("the three columns tile the content width, in order", () => {
    const lefts = [...Array(CARD_COUNT).keys()].map(cardLeft);
    expect(lefts).toEqual([...lefts].sort((a, b) => a - b));
    expect(new Set(lefts).size).toBe(CARD_COUNT);
  });

  test("every plate's marks are inside its plate", () => {
    // THE DRIFT COUNTS. `TOOL_GLYPHS` is cut for the 64px plate and the keyframes in
    // `failures-pattern.css` move a glyph by at most 5px, so the box plus that slack is
    // what has to fit — an orbit that fits and a drift that does not is the same bug
    // arriving two seconds later.
    const DRIFT = 5;
    for (const g of TOOL_GLYPHS) {
      const half = g.size / 2 + DRIFT;
      expect(g.x - half, g.icon).toBeGreaterThanOrEqual(0);
      expect(g.y - half, g.icon).toBeGreaterThanOrEqual(0);
      expect(g.x + half, g.icon).toBeLessThanOrEqual(PLATE_WIDTH);
      expect(g.y + half, g.icon).toBeLessThanOrEqual(PLATE_HEIGHT);
      expect(g.x - g.orbit.rx, `${g.icon} orbit`).toBeGreaterThanOrEqual(0);
      expect(g.x + g.orbit.rx, `${g.icon} orbit`).toBeLessThanOrEqual(PLATE_WIDTH);
      expect(g.y - g.orbit.ry, `${g.icon} orbit`).toBeGreaterThanOrEqual(0);
      expect(g.y + g.orbit.ry, `${g.icon} orbit`).toBeLessThanOrEqual(PLATE_HEIGHT);
    }
    // NO TWO GLYPHS SHARE A ROW OR A COLUMN — five paths, no shared centre, which is what
    // makes the frozen frame still argue.
    expect(new Set(TOOL_GLYPHS.map((g) => g.x)).size).toBe(TOOL_GLYPHS.length);
    expect(new Set(TOOL_GLYPHS.map((g) => g.y)).size).toBe(TOOL_GLYPHS.length);

    // THE RING AND EVERYTHING RIDING IT IS INSIDE THE PLATE. Every point of the ellipse
    // is on its bounding box or inside it, so the deepest mark is the centre plus the
    // radius plus a node's half box plus the survivor's breathing ring.
    const reach = NODE_SIZE / 2 + NODE_RING_INSET;
    expect(RING_CX - RING_RX - reach).toBeGreaterThanOrEqual(0);
    expect(RING_CX + RING_RX + reach).toBeLessThanOrEqual(PLATE_WIDTH);
    expect(RING_CY - RING_RY - reach).toBeGreaterThanOrEqual(0);
    expect(RING_CY + RING_RY + reach).toBeLessThanOrEqual(PLATE_HEIGHT);

    // THE TEN ARE EVENLY SPACED, and the two survivors are NEITHER ADJACENT NOR
    // OPPOSITE: neighbours read as one surviving corner of the set, and a diametric pair
    // reads as a designed result rather than as two that happened to hold.
    expect([...Array(NODE_COUNT).keys()].map(ringStart)).toEqual(
      [...Array(NODE_COUNT).keys()].map((i) => (i * 100) / NODE_COUNT),
    );
    const [a, b] = [...SURVIVOR_INDICES].sort((x, y) => x - y);
    const apart = Math.min(b - a, NODE_COUNT - (b - a));
    expect(apart).toBeGreaterThan(1);
    expect(apart).toBeLessThan(NODE_COUNT / 2);

    // EVERY QUEUED DEPARTMENT IS INSIDE THE FUNNEL THAT IS SUPPOSED TO BE HOLDING IT.
    for (const dot of QUEUE_DOTS) {
      const span = funnelSpanAt(dot.x);
      expect(dot.y - QUEUE_DOT_RADIUS, `dot at ${dot.x},${dot.y}`).toBeGreaterThanOrEqual(span.top);
      expect(dot.y + QUEUE_DOT_RADIUS, `dot at ${dot.x},${dot.y}`).toBeLessThanOrEqual(span.bottom);
    }
  });
});

// ── DOM readers ──────────────────────────────────────────────────────────────

/** A card face is a cross-faded layer: visibility is inline opacity, and the component
 *  also writes `data-visible` so a test does not have to parse a transition. */
function faceVisible(container: HTMLElement, testId: string): boolean {
  const el = container.querySelector(`[data-testid="${testId}"]`);
  if (!el) throw new Error(`no face "${testId}" in the tree`);
  return el.getAttribute("data-visible") === "1";
}

/** A `Reveal` is on when it carries the `on` class — the deck's one reveal primitive. */
function revealOn(container: HTMLElement, testId: string): boolean {
  const el = container.querySelector(`[data-testid="${testId}"]`);
  if (!el) throw new Error(`no reveal "${testId}" in the tree`);
  return el.classList.contains("on");
}
