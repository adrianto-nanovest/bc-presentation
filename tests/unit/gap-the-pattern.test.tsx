// THE PATTERN · slide tests. All four poses, and the rules gh#67's AC states — held over
// EVERY authored string and over the RENDERED stage rather than spot-checked.
//
// WHAT THIS FILE CAN AND CANNOT PROVE — its siblings' preamble, inherited. jsdom has no
// layout and no media queries, so nothing here measures a pixel and `prefers-reduced-
// motion: reduce` cannot really be toggled. What a DOM-less runner is good for is what
// THIS slide is actually at risk of:
//
//   1. BEING A SECOND TELLING OF THE SLIDE IN FRONT OF IT. B.4 has no content of its own —
//      it is the SHAPE of B.3 — which makes "says nothing B.3 already said" the whole
//      quality bar. Held two ways: a reserved-token sweep, and a three-word-phrase
//      intersection that needs no list at all.
//   2. PRE-SPENDING B.5. This slide hands the argument to the Capability Ladder, and a
//      handoff only works if the receiving slide still owns its nouns. So the ladder's
//      whole vocabulary — `rung`, `ladder`, `level`, `L1`–`L5`, `decision contract` — is
//      swept out of this stage and every pattern is fired against `gapLadderContent`.
//   3. RE-SPENDING B.1 WHILE DELIBERATELY ECHOING IT. The capability line closes B.1's
//      loop ON PURPOSE — B.1 asserted "the hardest part is not the tools" about the
//      world, B.4 proves it on the presenter's own record — and the line between an echo
//      and a re-spend is B.1's actual vocabulary. That list is drawn from B.1's own
//      strings rather than typed from memory.
//   4. SMUGGLING BACK WHAT §6.3 CUT. HR p16–18's outcomes are cut from B.3 because
//      outcomes brag and failures transfer. A slide that GENERALISES those failures is
//      exactly where a performance multiple or a chatbot's name would come back in.
//   5. TURNING INTO A LECTURE. B.3 is a confession in the first person; B.4 stays there
//      for the pattern (`we added`, `without us`) and turns impersonal for the verdict
//      (`the organisation`). One `you` anywhere flips the pair from a confession into an
//      accusation, and that is a plain string property.
//
// WHAT IS LEFT TO THE BROWSER WALK: the reduce-mode half of the zero-SMIL AC (held here at
// every pose under both preferences, plus the structural fact that makes it true by
// construction — the figure mounts no `<svg>` at all); the real wrap of the three
// one-line reductions, the two-line statement, the one-line verdict and the closer; and
// the painted colour ladder, including the brace's single tier across its two boxes.
//
// DECK COMPOSITION IS NOT ASSERTED HERE. Where this slide sits in the two leader decks —
// the `gap` run, behind B.3 — belongs to `deck-registry.test.ts` and the numbering
// fixture. `AT` below is a harness INPUT, not a claim the slide makes: this module epoch
// resolves the default `general` deck, which runs no leader slide at all.
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { restoreLocation } from "../harvest/deck-numbering";
import type { VariantId } from "@/deck-variants";
import { GapThePattern, gapThePatternSlide } from "@/slides/leader-gap/gap-the-pattern";
import {
  gapHardestPartContent,
  gapLadderContent,
  gapNoSopContent,
  gapThePatternContent,
  gapThreeFailuresContent,
} from "@/slides/leader-gap/content";
// D.3's block, so the shadow-AI reserved list below is fired against the slide it was
// read off rather than against a sentence written here to make it fire.
import { investChickenEggContent } from "@/slides/leader-invest/content";
// L.3's portfolio panel, which ALREADY renders the HR original's own summary of these
// three failures. Imported so "do not repeat it" is checked against what that slide
// actually prints today.
import { i3Content } from "@/slides/reveal-and-closing/content";
import {
  BRACE_HEIGHT,
  BRACE_TOP,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  REDUCTION_COUNT,
  ROW_HEIGHT,
  STUB_HEIGHT,
  STUB_TOP,
  reductionRowTop,
} from "@/slides/leader-gap/the-pattern-geometry";

const C = gapThePatternContent;
const POSES = [0, 1, 2, 3] as const;

/**
 * The position this slide holds in the decks that will run it.
 *
 * `at` IS required here, the case every leader-only sibling documents: unit tests resolve
 * the default `general` deck, `general` has no leader variant, and this slide reaches the
 * leader deck sets alone. B.4 because the `gap` run is the leader decks' first (§4.3) and
 * this slide is its fourth — a harness INPUT, not a claim the slide makes (§3.5). No file
 * under `src/slides/leader-gap/` names either half of it, which is the rule the
 * figure-freedom block below holds.
 */
const AT = { letter: "B", num: 4, sectionKey: "gap" } as const;

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
    <SlideHarness def={gapThePatternSlide} at={AT}>
      <Nav />
      <GapThePattern />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

// ── the boxes, by pose ───────────────────────────────────────────────────────
//
// Derived from the content tuple wherever the renderer keys on a content `id`, so a
// reorder of the copy moves these hooks with it.

const POSE_0_IDS = [
  "the-pattern-reduction-eyebrow",
  ...C.reductions.map((item) => `the-pattern-reduction-${item.id}`),
];
const POSE_1_IDS = [
  "the-pattern-same-eyebrow",
  "the-pattern-brace-hairline",
  "the-pattern-brace-stub",
  "the-pattern-statement",
];
const POSE_2_IDS = ["the-pattern-rule", "the-pattern-capability-line"];
const POSE_3_IDS = ["the-pattern-closer"];

const REVEALED_AT: ReadonlyArray<readonly string[]> = [
  POSE_0_IDS,
  POSE_1_IDS,
  POSE_2_IDS,
  POSE_3_IDS,
];

const EVERY_BOX = REVEALED_AT.flat();

/** The three boxes with no text of their own — the copper rule's wrapper and the brace's
 *  two halves. Named once, so the "the copy is there, not merely the box" checks below
 *  cannot be quietly widened, and asserted EMPTY in its own test: a brace that acquired a
 *  caption would be a legend for an image that is supposed to be self-evident. */
const TEXTLESS_IDS = new Set([
  "the-pattern-rule",
  "the-pattern-brace-hairline",
  "the-pattern-brace-stub",
]);

/**
 * The element whose class carries a box's reveal — the sibling files' two-shape reader.
 * Every box but one IS a `Reveal`; `the-pattern-rule`'s testid is on a positioned wrapper
 * around a `CopperRule`, because that primitive spreads no `data-*` props.
 */
function fade(id: string): HTMLElement {
  const el = screen.getByTestId(id);
  if (el.classList.contains("fade")) return el;
  const inner = el.querySelector<HTMLElement>(".copper-rule");
  if (!inner) {
    throw new Error(
      `"${id}" is neither a .fade box nor a wrapper around a .copper-rule — the ` +
        `renderer's hook or its primitive changed.`,
    );
  }
  return inner;
}

const revealed = (id: string) => fade(id).classList.contains("on");

/** How many milliseconds into its pose a box arrives. Throws on an unrevealed box —
 *  `Reveal` zeroes `transitionDelay` while `on` is false, so there is no arrival. */
function arrival(id: string): number {
  const el = fade(id);
  if (!el.classList.contains("on")) {
    throw new Error(`"${id}" is not revealed at this pose, so it has no arrival`);
  }
  const ms = parseFloat(el.style.transitionDelay);
  if (!Number.isFinite(ms)) {
    throw new Error(`"${id}" carries no readable transitionDelay`);
  }
  return ms;
}

// ── the copy, as one set of strings ──────────────────────────────────────────

/** Every string reachable from `value` — the walk, not a hand list, for the sibling
 *  files' reason: a field added next month is inside every rule below the day it exists.
 *  It collects `id` fields too, deliberately: those reach the DOM as `data-testid`, and a
 *  borrowed image written into a hook is the same defect written somewhere less
 *  visible. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/** Every string this slide can put on a stage. ONE block, because this slide has no brand
 *  axis — see the `no brand variance` describe below, which holds that as a rule. */
const authoredStrings = (): string[] => walkStrings(C);

/** B.1's corpus — the slide that opens the same run, and the one this slide deliberately
 *  echoes without re-spending. */
const b1Strings = (): string[] => walkStrings(gapHardestPartContent);

/** B.2's corpus — the slide two figures in front of this one, in the same run. */
const b2Strings = (): string[] => walkStrings(gapNoSopContent);

/** B.5's corpus — the slide this one hands off to. Everything in it is vocabulary B.4
 *  must leave unspent. */
const b5Strings = (): string[] => walkStrings(gapLadderContent);

/**
 * B.3's corpus — the slide this one is the SHAPE of.
 *
 * READ OFF THE MODULE, NOT PINNED. B.3 and B.4 ship on one ticket and were built in
 * parallel, so `gapThreeFailuresContent` may or may not have existed when this file was
 * first drafted; it does now, and importing it is what keeps the rules below checked
 * against what B.3 ACTUALLY says rather than against a copy of it that rots the first time
 * that slide is reworded.
 */
const b3Strings = (): string[] => walkStrings(gapThreeFailuresContent);

/** The FOUR PROSE strings, each with the `*Kw` sibling the copy module pairs it with. */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ["pattern", C.pattern, C.patternKw],
  ["capabilityLine", C.capabilityLine, C.capabilityLineKw],
  ["closer", C.closer, C.closerKw],
];

/** The SIX LABEL strings, which carry no `*Kw` and may not gain one. Written out as a
 *  list on purpose: together with `PROSE` above it is checked against what the STAGE
 *  actually prints, so an eleventh string has to pick a side before it can render. */
const LABELS: readonly string[] = [
  C.figLabel,
  C.reductionEyebrow,
  C.sameEyebrow,
  ...C.reductions.map((item) => item.label),
];

/** Every string this slide PRINTS — the two sides of the keyword rule, together. */
const printedStrings = (): string[] => [...PROSE.map(([, copy]) => copy), ...LABELS];

/** Everything the stage renders, minus the one element that legitimately prints a DERIVED
 *  figure reference. Stripped from a CLONE: React owns those nodes and removing one behind
 *  its back throws on the next commit. */
function stageTextWithoutFigLabel(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

/** The label half of the `FigLabel` — its last span, which is the only part of that
 *  element this slide authors. The `B.4` in front of it is the composer's. */
function figLabelText(container: HTMLElement): string {
  const spans = container.querySelectorAll(".fig-label span");
  return spans[spans.length - 1]?.textContent ?? "";
}

/** What the stage prints, read off the DOM: the headline, the fig label's own half, and
 *  every box that carries type. */
function stagePrintedStrings(container: HTMLElement): string[] {
  const heading = container.querySelector("h1")?.textContent ?? "";
  const boxes = [...container.querySelectorAll<HTMLElement>("[data-testid^='the-pattern-']")]
    .map((el) => el.textContent ?? "")
    .filter((text) => text !== "");
  return [heading, figLabelText(container), ...boxes];
}

/**
 * The set of every N-word phrase in a string set, lowercased and stripped of punctuation
 * so "rule." and "rule" are the same word — `invest-chicken-egg.test.tsx`'s helper,
 * pointed at this slide's neighbours.
 *
 * THREE WORDS IS THE THRESHOLD THE COPY CHOSE. Two-word overlap of function words is
 * unavoidable in English and proves nothing; a shared three-word phrase between two
 * slides of the SAME RUN is the cheapest evidence that copy was lifted. Measured on
 * 2026-08-08 against all four shipped blocks: B.4 shares ZERO three-word phrases with B.1
 * and with B.5, exactly one with B.2 (`not one of`) and exactly one with B.3 (`in front
 * of`) — and no FOUR-word phrase with any of them.
 */
function phrases(strings: readonly string[], n: number): Set<string> {
  const words = strings
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9'\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + n <= words.length; i += 1) out.add(words.slice(i, i + n).join(" "));
  return out;
}

// ── the slide def ────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("declares 4 poses with the fullest one canonical", () => {
    expect(gapThePatternSlide.id).toBe("gap-the-pattern");
    expect(gapThePatternSlide.steps).toBe(4);
    // The exported PDF has no presenter attached, so the exported frame must be the one
    // that is safe to read alone. Anything lower would export a page reducing three of the
    // presenter's own failures to three phrases with no sentence saying what the absence
    // was — a confession somebody else can re-caption.
    expect(gapThePatternSlide.canonicalPose).toBe(3);
    expect(gapThePatternSlide.canonicalPose).toBe(gapThePatternSlide.steps - 1);
    expect(gapThePatternSlide.animationMode).toBe("step-reveal");
    expect(gapThePatternSlide.surface).toBe("dark");
    expect(gapThePatternSlide.sectionKey).toBe("gap");
  });
});

// ── AC · three reductions, in order, and they rhyme ──────────────────────────

describe("§6.4 · the three, reduced to one line each", () => {
  test("exactly three, in B.3's order, with stable ids", () => {
    expect(C.reductions).toHaveLength(3);
    expect(REDUCTION_COUNT).toBe(C.reductions.length);
    expect(C.reductions.map((item) => item.id)).toEqual(["no-method", "no-research", "no-owner"]);
    expect(C.reductions.map((item) => item.label)).toEqual([
      "Tools, with no method anyone could repeat.",
      "Builds, with no research in front of them.",
      "Delivery, with no owner behind it.",
    ]);
    // THE TUPLE IS FIXED-LENGTH, so a fourth reduction is a compile error at the copy
    // rather than a layout surprise. Held here as the runtime half of that claim.
    const lengthIsThree: 3 = C.reductions.length;
    expect(lengthIsThree).toBe(3);
    // ONE REDUCTION PER FAILURE B.3 RECORDS — this slide has no content of its own, it is
    // the shape of the one in front of it, so a fourth entry on either side without a
    // matching one on the other is the pair coming apart.
    expect(C.reductions).toHaveLength(gapThreeFailuresContent.failures.length);
  });

  test("the three are PARALLEL — the same construction, which is the image's argument", () => {
    // THE ROOM HAS TO SEE THE THREE RHYME BEFORE THE SLIDE SAYS SO. Each reduction is an
    // `X, with no Y` noun phrase: what we added, then the half that was missing. That
    // parallel is not decoration — it is why a brace over the three reads as one claim
    // rather than as three bullets that happen to be adjacent.
    for (const item of C.reductions) {
      expect(item.label, `${item.id} is not an "X, with no Y" phrase`).toMatch(
        /^[A-Z][a-z]+, with no \w/,
      );
      expect(item.label, `${item.id} does not end in a full stop`).toMatch(/\.$/);
      // A NOUN PHRASE AND NOT A SENTENCE: no finite verb opening the clause, and no
      // question. B.3 tells the stories; these are what is left after the story.
      expect(item.label, `${item.id} asks something`).not.toMatch(/\?/);
    }
    // The ids carry the same shape, so the DOM hooks say what the copy says.
    for (const item of C.reductions) expect(item.id).toMatch(/^no-/);
  });

  test("all three are on the stage at pose 0, and nothing else in band 1 is", () => {
    // A PATTERN ACROSS THREE THINGS CANNOT BE ARGUED FROM ONE OR TWO. A pose resting on a
    // partial list would be resting on evidence that does not yet support any
    // generalisation, so the whole list lands on one pose — and the brace, which is the
    // generalisation drawn, does not.
    const { unmount } = renderSlide(0);
    for (const item of C.reductions) {
      expect(revealed(`the-pattern-reduction-${item.id}`), item.id).toBe(true);
      expect(screen.getByTestId(`the-pattern-reduction-${item.id}`).textContent).toBe(item.label);
    }
    for (const id of POSE_1_IDS) expect(revealed(id), `${id} at pose 0`).toBe(false);
    // The heading opens the pose and the third reduction closes it.
    expect(arrival("the-pattern-reduction-eyebrow")).toBeLessThan(
      arrival(`the-pattern-reduction-${C.reductions[0].id}`),
    );
    const last = arrival(`the-pattern-reduction-${C.reductions[REDUCTION_COUNT - 1].id}`);
    for (const id of POSE_0_IDS) expect(arrival(id), id).toBeLessThanOrEqual(last);
    unmount();
  });
});

// ── AC · one pattern, and the brace that draws it ────────────────────────────

describe("§6.4 · one pattern that all three instantiate", () => {
  test("band 1 holds exactly ONE statement, and it is the pattern", () => {
    const { unmount } = renderSlide(3);
    expect(screen.getByTestId("the-pattern-statement").textContent).toBe(C.pattern);
    expect(C.pattern).toBe(
      "Each time we added something. Not once did we add the ability to run it without us.",
    );
    expect(C.patternKw).toEqual(["the ability to run it without us"]);
    // ONE STATEMENT, NOT TWO. Every prose box in band 1, counted off the DOM rather than
    // assumed: a second sentence beside the first would be a second pattern, and three
    // failures do not have two shapes.
    const band1Prose = [...POSE_1_IDS].filter(
      (id) => !TEXTLESS_IDS.has(id) && id !== "the-pattern-same-eyebrow",
    );
    expect(band1Prose).toEqual(["the-pattern-statement"]);
    unmount();
  });

  test("the hairline spans EXACTLY the three reductions, and the stub is at its centre", () => {
    // THE IMAGE IS THE ARGUMENT, so its two coordinates are asserted rather than trusted:
    // a hairline that ran past the rows would bracket whitespace, one that stopped short
    // would bracket two of the three, and a stub leaving anywhere but the centre would
    // read as a branch off one row instead of a convergence of all three.
    const { unmount } = renderSlide(1);
    const hairline = screen.getByTestId("the-pattern-brace-hairline");
    const stub = screen.getByTestId("the-pattern-brace-stub");

    const firstTop = reductionRowTop(0);
    const lastBottom = reductionRowTop(REDUCTION_COUNT - 1) + ROW_HEIGHT;
    expect(parseFloat(hairline.style.top)).toBe(firstTop);
    expect(parseFloat(hairline.style.height)).toBe(lastBottom - firstTop);
    expect(BRACE_TOP).toBe(firstTop);
    expect(BRACE_HEIGHT).toBe(lastBottom - firstTop);

    // The stub's centre IS the hairline's centre, to the pixel.
    const stubCentre = parseFloat(stub.style.top) + STUB_HEIGHT / 2;
    expect(stubCentre).toBe(BRACE_TOP + BRACE_HEIGHT / 2);
    expect(parseFloat(stub.style.top)).toBe(STUB_TOP);
    // …and it is an INTEGER shelf, which is the reason the row register is odd: a 1px box
    // on a half pixel antialiases into two half-intensity rows while the vertical half of
    // the same graphic, on an integer x, stays crisp.
    expect(Number.isInteger(STUB_TOP)).toBe(true);
    // The stub leaves the hairline's right face with no seam.
    expect(parseFloat(stub.style.left)).toBe(
      parseFloat(hairline.style.left) + parseFloat(hairline.style.width),
    );

    // ONE GRAPHIC, ONE TIER, ONE WEIGHT, ONE STEP. Two tiers or two thicknesses would read
    // as a rule and a mark rather than as a brace. Pinned to the token as well as to each
    // other, so the equality cannot pass because both sides went empty.
    expect(hairline.style.background).toBe("var(--copper-700)");
    expect(stub.style.background).toBe(hairline.style.background);
    expect(parseFloat(stub.style.height)).toBe(parseFloat(hairline.style.width));
    expect(arrival("the-pattern-brace-stub")).toBe(arrival("the-pattern-brace-hairline"));
    // AND THE BRACE NEVER POINTS AT NOTHING: the statement arrives on the same step.
    expect(arrival("the-pattern-statement")).toBe(arrival("the-pattern-brace-stub"));
    unmount();
  });

  test("the brace carries no text at any pose", () => {
    // A CAPTION ON THE BRACE WOULD BE A LEGEND for an image the slide needs to be
    // self-evident. Checked at every stop, not only at the fullest one.
    const { unmount } = renderSlide();
    for (const pose of POSES) {
      goToPose(pose);
      for (const id of ["the-pattern-brace-hairline", "the-pattern-brace-stub"]) {
        const box = screen.getByTestId(id);
        expect(box.textContent, `${id} at pose ${pose}`).toBe("");
        expect(box.children.length, `${id} at pose ${pose}`).toBe(0);
      }
    }
    unmount();
  });
});

// ── AC · it points at capability, not at tools ───────────────────────────────

describe("§6.4 · the verdict names a capability and refuses the tooling reading", () => {
  test("says what it was NOT before it says what it was", () => {
    expect(C.capabilityLine).toBe(
      "Not one of the three was a tooling problem. Each one was a capability the " +
        "organisation did not have yet.",
    );
    expect(C.capabilityLineKw).toEqual(["a capability the organisation did not have yet"]);
    // THE ORDER IS THE ARGUMENT: the refusal first, because the tooling reading is the one
    // a leader arrives at on their own after three stories about tools, builds and
    // delivery — and then the naming, which is what the next slide is a ladder for.
    expect(C.capabilityLine.indexOf("was a tooling problem")).toBeLessThan(
      C.capabilityLine.indexOf("was a capability"),
    );
    // IMPERSONAL, DELIBERATELY. The pattern above it is `we`; the verdict is about the
    // ORGANISATION, because a capability is a property of the org and not of the people
    // who admitted the failures.
    expect(C.capabilityLine).toContain("the organisation");
    expect(C.capabilityLine).not.toMatch(/\b(we|our|us)\b/i);
    // …while the pattern statement IS first person plural, which is what keeps the pair a
    // confession rather than a lecture.
    expect(C.pattern).toMatch(/\bwe\b/i);
    expect(C.pattern).toMatch(/\bus\b/i);
  });

  test("spends none of B.5's vocabulary — the ladder still owns its own nouns", () => {
    // A HANDOFF ONLY WORKS IF THE RECEIVING SLIDE GETS TO INTRODUCE ITSELF. Every pattern
    // below is fired against `gapLadderContent` after it is fired against this stage, so
    // the list cannot rot into regexes that match nothing.
    const LADDER_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
      ["rung", /\brungs?\b/i],
      ["ladder", /\bladders?\b/i],
      ["level", /\blevels?\b/i],
      ["L1–L5", /\bL[1-5]\b/],
      ["decision contract", /\bdecision contract\b/i],
    ];
    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(300);
    for (const [name, pattern] of LADDER_TOKENS) {
      for (const copy of authoredStrings()) {
        expect(pattern.test(copy), `B.5's "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `B.5's "${name}" reached the stage`).toBe(false);
    }
    unmount();

    const b5 = b5Strings();
    for (const [name, pattern] of LADDER_TOKENS) {
      expect(
        b5.some((copy) => pattern.test(copy)),
        `"${name}" is supposed to be B.5's, but B.5 does not print it`,
      ).toBe(true);
    }
  });
});

// ── AC · the voice ───────────────────────────────────────────────────────────

describe("the voice", () => {
  test("there is no second person anywhere on this slide", () => {
    // THE HARD PROPERTY B.3 AND B.4 SHARE, and it is what keeps the pair a confession
    // rather than a lecture. One `you` turns three admitted failures into an accusation
    // aimed at the room, and the room stops hearing the pattern.
    const SECOND_PERSON = /\b(you|your|yours|you're|you've|yourself|yourselves)\b/i;
    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    for (const copy of [...authoredStrings(), stage]) {
      expect(copy, `a second person in ${JSON.stringify(copy)}`).not.toMatch(SECOND_PERSON);
    }
    unmount();
    // POSITIVE CONTROL: the sweep is alive and catches the reading the slide refuses.
    expect(SECOND_PERSON.test("Your organisation did not have it either.")).toBe(true);
  });

  test("first person for the pattern, impersonal for the verdict and the closer", () => {
    // THE SWITCH IS THE STRUCTURE. `we added` / `without us` is the presenter's own
    // record; `the organisation` is the general claim it licenses. A closer in the first
    // person would make the absence a personal failing rather than an organisational one.
    expect(C.pattern).toMatch(/\bwe added\b/);
    expect(C.pattern).toMatch(/\bwithout us\b/);
    expect(C.closer).not.toMatch(/\b(we|our|us|I|my)\b/);
    expect(C.capabilityLine).not.toMatch(/\b(we|our|us|I|my)\b/);
    expect(C.headline).not.toMatch(/\b(we|our|us|I|my)\b/);
    // …and no first person SINGULAR anywhere. B.3 ends on "Every one of these calls was
    // mine"; this slide does not repeat that move, because a generalisation delivered in
    // the first person singular is a second confession rather than a pattern.
    for (const copy of authoredStrings()) {
      expect(copy, `first person singular in ${JSON.stringify(copy)}`).not.toMatch(
        /\bI\b|\bmy\b|\bmine\b|\bI'm\b|\bI've\b/,
      );
    }
  });
});

// ── AC · reserved tokens ─────────────────────────────────────────────────────

/**
 * D.3's reserved vocabulary, copied from the list `invest-chicken-egg.test.tsx` holds and
 * fired against `investChickenEggContent` below.
 */
const D3_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["deadlock", /\bdeadlock\w*\b/i],
  ["no budget without proof", /\bno budget without proof\b/i],
  ["shared accounts", /\bshared account\w*\b/i],
  ["banned", /\bbann?ed\b/i],
  ["what it cost", /\bwhat it cost\b/i],
  ["30-day", /\b30[-\s]day\b/i],
  ["proof pilot", /\bproof pilot\b/i],
  ["kill criterion", /\bkill criteri\w*\b/i],
  ["spend cap", /\bspend cap\b/i],
];

/** B.2's RENDERED image, the list `invest-chicken-egg.test.tsx` reads off
 *  `gapNoSopContent`. Fired against B.2's own strings below. REMEASURED 2026-08-11 with
 *  B.2's fray redesign: `still gets answered` left B.2's stage with its condition
 *  sentences, and the spine's `never written` caption arrived. */
const B2_IMAGE_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["the rule nobody wrote", /\brule nobody wrote\b/i],
  ["wrote their own", /\bwrote their own\b/i],
  ["never wrote down", /\bnever wrote down\b/i],
  ["never written", /\bnever written\b/i],
  ["handed out", /\bhanded out\b/i],
  ["a login", /\blogin\w*\b/i],
  ["a demonstration", /\bdemonstrat\w*\b/i],
  ["encouragement", /\bencourag\w*\b/i],
  ["which work may", /\bwhich work may\b/i],
  ["the silence", /\bsilence\b/i],
  ["no rule to break", /\bno rule to break\b/i],
  ["the leader's job", /\bleader['’]s job\b/i],
];

/** B.2's SPEC vocabulary — the two phrasings §6.2 uses that B.2 chose not to print, plus
 *  its slide id. Fired against those sources below, exactly as
 *  `invest-chicken-egg.test.tsx` fires them. */
const B2_SPEC_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["no SOP", /\bno[-\s]SOP\b/i],
  ["no guidance", /\bno guidance\b/i],
  ["improvise", /\bimprovis\w*\b/i],
];

/**
 * B.1's own tokens — its quoted figure, its two halves and its verbs. REMEASURED
 * 2026-08-10 against the two-speeds redesign: "instantly" left B.1's copy (the
 * instant arrival is now the access lane's 850ms fill, not a word) and "signature"
 * arrived (its eyebrow starts two clocks with one, and its race line ends on it).
 *
 * `capability` IS DELIBERATELY ABSENT FROM THIS LIST, and it is the one entry worth
 * arguing. B.1 names its slow lane "Organizational capability" and this slide's
 * verdict names a capability on purpose — that is the ECHO §6.4 exists to make, B.1
 * asserting it about the world and B.4 proving it on the presenter's record. What
 * separates an echo from a re-spend is B.1's ACTUAL WORDS, which are all below.
 */
const B1_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["70%", /\b70\s*%/],
  ["30%", /\b30\s*%/],
  ["people & process", /people\s*&\s*process/i],
  ["technology", /\btechnolog\w*\b/i],
  ["procured", /\bprocure\w*\b/i],
  ["earned", /\bearn\w*\b/i],
  ["invoice", /\binvoice\b/i],
  ["signature", /\bsignature\b/i],
  ["tool access", /\btool access\b/i],
  ["BCG", /\bBCG\b/],
  ["McKinsey", /\bMcKinsey\b/i],
];

/**
 * THE HR p16–18 OUTCOMES §6.3 CUTS — and the one list here with no SLIDE to fire it
 * against, by construction: these are the numbers no slide in this deck prints.
 *
 * They are fired against the RESEARCH lines they were read off instead
 * (`docs/researches/2026-07-31-hr-group-agentic-org-analysis.md` and
 * `docs/researches/internal-hr-group.md`), which is the honest source. §6.3's reasoning is
 * that outcomes brag and failures transfer; a slide that GENERALISES those failures is
 * exactly where a performance multiple or a chatbot's name would come back in through the
 * back door.
 */
const HR_CUT_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  // `x?` because the research spells the multiple as "6.9x", where the trailing `x` eats
  // the word boundary a bare `\b6\.9\b` would need.
  ["6.9x", /\b6\.9x?\b/],
  ["Naura", /\bNaura\b/i],
  ["14,000", /\b14[,.]?000\b/],
  ["75.08", /\b75\.08\b/],
  ["deflection", /\bdeflect\w*\b/i],
  ["Pluang", /\bPluang\b/i],
  ["Pintu", /\bPintu\b/i],
  ["Tokocrypto", /\bTokocrypto\b/i],
  ["Indodax", /\bIndodax\b/i],
  ["same codebase", /\bsame codebase\b/i],
  ["one large prompt", /\bone large prompt\b/i],
];

/** The research sentences `HR_CUT_TOKENS` was read off, quoted verbatim so every pattern
 *  can be fired against its real source rather than against a string edited here to make
 *  it fire. */
const HR_SOURCE_LINES: readonly string[] = [
  "Reported results: 14,000+ conversations, 75.08% deflection in December 2025, and 10% monthly usage growth.",
  "Benchmarked homepage, navbar, and asset-page performance against Pluang, Pintu, Tokocrypto, and Indodax.",
  "Core message: the same codebase and team produced different results after adopting more disciplined research and execution practices.",
  "Building the deck—harder than expected: one large prompt produced poor slides.",
  "Shows scale (6.9x improvement) is about methodology, not magic.",
  "Naura—AI Chatbot",
];

describe("nothing reserved to another slide reaches this stage", () => {
  test("none of D.3's, B.2's or B.1's vocabulary, authored or rendered", () => {
    const authored = authoredStrings();
    expect(authored.length, "a rule over an empty set proves nothing").toBeGreaterThan(12);

    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    const forbidden = [
      ...D3_TOKENS.map(([n, p]) => [`D.3's ${n}`, p] as const),
      ...B2_IMAGE_TOKENS.map(([n, p]) => [`B.2's ${n}`, p] as const),
      ...B2_SPEC_TOKENS.map(([n, p]) => [`§6.2's ${n}`, p] as const),
      ...B1_TOKENS.map(([n, p]) => [`B.1's ${n}`, p] as const),
      ...HR_CUT_TOKENS.map(([n, p]) => [`HR p16–18's ${n}`, p] as const),
    ];
    for (const [name, pattern] of forbidden) {
      for (const copy of authored) {
        expect(pattern.test(copy), `${name} in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `${name} reached the stage`).toBe(false);
    }
    // THE BARE PHRASE `70/30` IS NOT IN THE FIRED LIST, and the reason is B.2's file's:
    // B.1 never prints it either — §6.5 owns that spelling — so a pattern for it could not
    // be fired against B.1's strings without a false claim about where it came from. It is
    // still refused, because B.1's split IS 70 against 30.
    expect(stage).not.toMatch(/\b70\s*\/\s*30\b/);
    for (const copy of authored) expect(copy).not.toMatch(/\b70\s*\/\s*30\b/);
    unmount();
  });

  test("and every pattern fires against the source it was read off", () => {
    // FIFTY-ODD REGEXES THAT MATCHED NOTHING would make the rule above pass on copy lifted
    // verbatim from any of them, so each one is checked against its real source.
    const d3 = walkStrings(investChickenEggContent);
    for (const [name, pattern] of D3_TOKENS) {
      expect(d3.some((copy) => pattern.test(copy)), `D.3 no longer prints "${name}"`).toBe(true);
    }
    const b2 = b2Strings();
    for (const [name, pattern] of B2_IMAGE_TOKENS) {
      expect(b2.some((copy) => pattern.test(copy)), `B.2 no longer prints "${name}"`).toBe(true);
    }
    // §6.2's two unprinted phrasings fall back to the spec sentence and the slide id, the
    // same split `invest-chicken-egg.test.tsx` documents.
    const b2Sources = [...b2, "There is no guidance, so people improvise.", "gap-no-sop"];
    for (const [name, pattern] of B2_SPEC_TOKENS) {
      expect(b2Sources.some((copy) => pattern.test(copy)), name).toBe(true);
    }
    const b1 = b1Strings();
    for (const [name, pattern] of B1_TOKENS) {
      expect(b1.some((copy) => pattern.test(copy)), `B.1 no longer prints "${name}"`).toBe(true);
    }
    for (const [name, pattern] of HR_CUT_TOKENS) {
      expect(
        HR_SOURCE_LINES.some((copy) => pattern.test(copy)),
        `"${name}" is not in the research lines it was read off`,
      ).toBe(true);
    }
  });

  test("does not repeat L.3's already-rendered summary of the same three failures", () => {
    // THE ONE SLIDE IN THE DECK THAT ALREADY SAYS THIS OUT LOUD. L.3's portfolio panel
    // prints the HR original's own summary — "three honest failures — methodology,
    // strategy, empowerment" and the "mindset flip" — and a leader deck that ran both
    // would say the same thing twice, forty slides apart, in two different voices.
    const l3 = walkStrings(i3Content);
    const HONEST = "three honest failures — methodology, strategy, empowerment";
    const FLIP = "mindset flip — 'how to build?' → 'how to enable?'";
    expect(l3, "L.3 no longer prints the line this rule is about").toContain(HONEST);
    expect(l3, "L.3 no longer prints the mindset flip").toContain(FLIP);

    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    for (const copy of [...authoredStrings(), stage]) {
      expect(copy).not.toContain(HONEST);
      expect(copy).not.toContain(FLIP);
      // …and none of the four nouns L.3 reduces the same three failures to, either. This
      // slide reduces them its own way — to what each one was missing — which is what
      // makes it a bridge to a capability claim rather than a second summary.
      expect(copy, `L.3's vocabulary in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(methodolog\w*|empower\w*|enabler?s?|enablement|mindset)\b/i,
      );
    }
    unmount();
  });
});

// ── AC · shares no three-word phrase with its neighbours ─────────────────────

describe("the run in front of it keeps its sentences", () => {
  /**
   * The three-word phrases this slide shares with each neighbour — MEASURED, NOT CHOSEN,
   * and asserted as an EQUALITY so a padded entry fails as loudly as a borrowed one.
   *
   * The one survivor is a pure function word run: `in front of` is a preposition; a
   * rule that forbade it would be a rule about English rather than about two slides,
   * and a rule that is off catches nothing. What matters is what is NOT here: no shared
   * phrase carries an image, and no FOUR-word phrase is shared with anything (asserted
   * below). REMEASURED 2026-08-11: `not one of` left with B.2's consequence sentence
   * when its fray redesign cut the two condition lines.
   */
  const SHARED_3: Record<string, readonly string[]> = {
    "B.1": [],
    "B.2": [],
    "B.3": ["in front of"],
    "B.5": [],
  };

  test("shares no three-word phrase beyond the measured function words", () => {
    const mine3 = phrases(authoredStrings(), 3);
    expect(mine3.size, "positive control: this slide has phrases to share").toBeGreaterThan(50);

    for (const [name, corpus] of [
      ["B.1", b1Strings()],
      ["B.2", b2Strings()],
      ["B.3", b3Strings()],
      ["B.5", b5Strings()],
    ] as const) {
      const theirs3 = phrases(corpus, 3);
      expect(theirs3.size, `positive control: ${name} has phrases to share`).toBeGreaterThan(30);
      const shared = [...mine3].filter((p) => theirs3.has(p)).sort();
      expect(shared, `three-word overlap with ${name}`).toEqual([...SHARED_3[name]].sort());
      // AND NOTHING LONGER, which is the half no function word survives.
      const shared4 = [...phrases(authoredStrings(), 4)].filter((p) =>
        phrases(corpus, 4).has(p),
      );
      expect(shared4, `four-word overlap with ${name}`).toEqual([]);
    }
  });

  test("and the rule catches a lifted sentence", () => {
    // THE CONTROL THAT KEEPS THE RULE HONEST: the intersections above are small because
    // the copy is disjoint, not because `phrases()` never matches anything. B.2's own
    // headline, put through the rule as if this slide had lifted it, is caught across the
    // punctuation and the capitals.
    const b2 = phrases(b2Strings(), 3);
    const lifted = phrases(["Nobody wrote the rule; so EVERYBODY wrote their own!"], 3);
    expect([...lifted].filter((p) => b2.has(p)).length).toBeGreaterThan(3);
  });
});

// ── AC · every string reaches the stage, and every pose is complete ──────────

describe("the stage prints exactly what the copy block authors", () => {
  test("all ten strings are in the DOM at the canonical pose", () => {
    const { container, unmount } = renderSlide(gapThePatternSlide.canonicalPose);

    // THE HEADLINE AND THE FIG LABEL, which are the slide file's rather than the figure's
    // — a census scoped to `the-pattern-` testids would miss both.
    expect(container.querySelector("h1")?.textContent).toBe(C.headline);
    expect(figLabelText(container)).toBe(C.figLabel);
    expect(C.figLabel).toBe("THE PATTERN");
    expect(C.headline).toBe("Three failures. The same shape every time.");
    expect(C.headlineKw).toEqual(["The same shape every time"]);

    for (const item of C.reductions) {
      expect(screen.getByTestId(`the-pattern-reduction-${item.id}`).textContent, item.id).toBe(
        item.label,
      );
    }
    for (const [id, copy] of [
      ["the-pattern-reduction-eyebrow", C.reductionEyebrow],
      ["the-pattern-same-eyebrow", C.sameEyebrow],
      ["the-pattern-statement", C.pattern],
      ["the-pattern-capability-line", C.capabilityLine],
      ["the-pattern-closer", C.closer],
    ] as const) {
      expect(screen.getByTestId(id).textContent, id).toBe(copy);
    }
    expect(C.reductionEyebrow).toBe("THE THREE, IN ONE LINE EACH");
    expect(C.sameEyebrow).toBe("WHAT WAS THE SAME");
    expect(C.closer).toBe(
      "Three failures, one absence — and no amount of buying would have closed it.",
    );
    expect(C.closerKw).toEqual(["no amount of buying would have closed it"]);

    // AND THE CENSUS IS EXACT IN BOTH DIRECTIONS: what the stage prints IS the ten strings
    // the keyword rule below partitions, no more and no fewer. An eleventh string cannot
    // render without landing in `PROSE` or in `LABELS` first.
    expect(stagePrintedStrings(container).sort()).toEqual(printedStrings().sort());
    expect(printedStrings()).toHaveLength(PROSE.length + LABELS.length);
    expect(LABELS).toHaveLength(6);
    // The boxes, counted: nothing on the stage is missing and nothing is drawn twice.
    const ids = [...container.querySelectorAll<HTMLElement>("[data-testid^='the-pattern-']")].map(
      (el) => el.dataset.testid,
    );
    expect(ids.sort()).toEqual([...EVERY_BOX].sort());
    unmount();
  });
});

describe("the pose walk", () => {
  test("every pose is complete at every stop, in both directions", () => {
    const { container, unmount } = renderSlide();
    const walk = [...POSES, ...[...POSES].reverse()];
    for (const pose of walk) {
      goToPose(pose);
      for (let band = 0; band < REVEALED_AT.length; band++) {
        for (const id of REVEALED_AT[band]) {
          // A pose is everything argued so far: revealed iff its band's pose has been
          // reached, at every stop in BOTH directions — `on` is derived from the pose and
          // not accumulated, so walking back to 0 must un-reveal 1–3.
          expect(revealed(id), `${id} at pose ${pose}`).toBe(band <= pose);
          // AND THE COPY IS THERE, not merely the box: a path that dropped children would
          // still pass a class check. The rule and the brace's two halves are the three
          // boxes with no text of their own.
          if (band <= pose && !TEXTLESS_IDS.has(id)) {
            expect(screen.getByTestId(id).textContent, `${id} at pose ${pose}`).not.toBe("");
          }
        }
      }
      // ZERO SMIL NODES AT EVERY STOP — the AC's jsdom half, under the default motion
      // preference. The `reduce` half is below and in the browser walk.
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
          .length,
        `SMIL at pose ${pose}`,
      ).toBe(0);
      expect(container.querySelectorAll("svg").length, `svg at pose ${pose}`).toBe(0);
    }
    unmount();
  });

  test("no pose rests on evidence with its conclusion missing", () => {
    // THE PROPERTY THE POSE MAP IS CHECKED AGAINST, rather than the pose count.
    const { unmount } = renderSlide();

    // POSE 1 — THE BRACE AND THE STATEMENT ARE ONE ARRIVAL, so the pose never rests on a
    // pointer aimed at empty space; the heading is the only thing ahead of them.
    goToPose(1);
    expect(arrival("the-pattern-same-eyebrow")).toBeLessThan(arrival("the-pattern-statement"));
    const braceArrival = arrival("the-pattern-statement");
    for (const id of POSE_1_IDS) expect(arrival(id), id).toBeLessThanOrEqual(braceArrival);

    // POSE 2 — ENDS ON THE VERDICT, never on the rule that divides the bands.
    goToPose(2);
    const capability = arrival("the-pattern-capability-line");
    expect(arrival("the-pattern-rule")).toBeLessThan(capability);
    for (const id of POSE_2_IDS) expect(arrival(id), id).toBeLessThanOrEqual(capability);

    // POSE 3 — THE CLOSER, ALONE IN ITS BAND. That is what "last arrival" means on a
    // step-reveal slide: arrivals are delays WITHIN a pose, so the only way to prove
    // nothing outlasts the closer is to prove nothing else arrives with it.
    expect(POSE_3_IDS).toEqual(["the-pattern-closer"]);
    goToPose(3);
    expect(revealed("the-pattern-closer")).toBe(true);
    unmount();
  });

  test("mounts no <svg> at all — zero SMIL by construction, not by discipline", () => {
    // The figure's own doc comment stakes the claim: the brace's two halves are plain
    // boxes, the copper rule is a `div`, and a SMIL node cannot appear without an author
    // adding a whole element class. This structural fact is what makes the reduce-mode
    // zero a construction rather than a promise.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      expect(container.querySelectorAll("svg").length, `pose ${pose}`).toBe(0);
      unmount();
    }
  });
});

// ── AC · prefers-reduced-motion: reduce ──────────────────────────────────────

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

  test("mounts zero SMIL nodes at every pose, and every pose still renders complete", () => {
    // SMIL is invisible to the global `prefers-reduced-motion` rule — it squashes CSS
    // durations only — so a SMIL node would have to be gated at mount. This slide has
    // nothing to gate, and that is the claim: the census is identical under either
    // preference because NOTHING under this slide reads `matchMedia` at all. The mock
    // proves the markup is preference-independent, which is the half a DOM test owns; the
    // squashed-duration half (every reached reveal resting on its FINISHED frame) is the
    // browser walk's.
    const { container, unmount } = renderSlide();
    for (const pose of POSES) {
      goToPose(pose);
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
          .length,
        `reduce · pose ${pose}`,
      ).toBe(0);
      expect(container.querySelectorAll("svg").length, `reduce · pose ${pose}`).toBe(0);
      for (let band = 0; band <= pose; band++) {
        for (const id of REVEALED_AT[band]) {
          expect(revealed(id), `reduce · pose ${pose} · ${id}`).toBe(true);
          if (!TEXTLESS_IDS.has(id)) {
            expect(
              screen.getByTestId(id).textContent,
              `reduce · pose ${pose} · ${id} is empty`,
            ).not.toBe("");
          }
        }
      }
      // Nothing the pose has not reached is revealed — completeness is a claim about THIS
      // pose, not about the last one.
      for (let band = pose + 1; band < REVEALED_AT.length; band++) {
        for (const id of REVEALED_AT[band]) {
          expect(revealed(id), `reduce · pose ${pose} · ${id} is not reached yet`).toBe(false);
        }
      }
    }
    unmount();
  });
});

// ── AC · the keyword rule: kw on prose only ──────────────────────────────────

describe("the keyword rule", () => {
  test("exactly the four prose strings carry a *Kw sibling, every keyword real", () => {
    // The directory's rule, stated at the top of `../../src/slides/leader-gap/content.ts`
    // and applied here without an exception. PROSE is the headline, the pattern statement,
    // the capability verdict and the closer; everything else is a LABEL. THE THREE
    // REDUCTIONS ARE THE SHARPEST CASE — they are the slide's most quotable copy and they
    // would take emphasis happily — and they are labels, because three copper italics down
    // one column would rank three things the slide exists to say are the same.
    const kwKeys = Object.keys(C).filter((k) => k.endsWith("Kw"));
    expect(kwKeys.sort()).toEqual(["capabilityLineKw", "closerKw", "headlineKw", "patternKw"]);
    expect(kwKeys.sort()).toEqual(PROSE.map(([name]) => `${name}Kw`).sort());
    for (const [name, copy, kws] of PROSE) {
      expect(Array.isArray(kws), name).toBe(true);
      expect(kws.length, `${name} carries no keyword`).toBeGreaterThan(0);
      for (const kw of kws) {
        expect(copy, `${name}Kw: "${kw}" is not in its prose`).toContain(kw);
      }
    }
    // THE SIX LABELS CARRY NO SIBLING AT ALL, and the rule is held over the block's own
    // keys rather than over a list of four names: any `*Kw` key whose prose sibling is not
    // one of the four above fails the census at the top of this test.
    for (const forbidden of [
      "figLabelKw",
      "reductionEyebrowKw",
      "sameEyebrowKw",
      "reductionsKw",
    ]) {
      expect(Object.keys(C), forbidden).not.toContain(forbidden);
    }
    // A LABEL AND A PROSE STRING MAY NOT BE THE SAME STRING, which is what makes the
    // partition a partition rather than two overlapping lists.
    expect(new Set(printedStrings()).size).toBe(printedStrings().length);
  });

  test("every label renders with no emphasis, while the prose boxes do carry theirs", () => {
    const { container, unmount } = renderSlide(3);
    const labelIds = [
      "the-pattern-reduction-eyebrow",
      "the-pattern-same-eyebrow",
      ...C.reductions.map((item) => `the-pattern-reduction-${item.id}`),
    ];
    for (const id of labelIds) {
      expect(screen.getByTestId(id).querySelectorAll("em").length, `<em> inside label ${id}`).toBe(
        0,
      );
    }
    // The fig label is a label too, and the only copper text on the stage that is not a
    // mono heading — it takes no emphasis either.
    expect(container.querySelector(".fig-label")?.querySelectorAll("em").length).toBe(0);

    // …while the prose boxes DO carry theirs, one `<em>` per keyword, so the absence above
    // cannot pass because emphasis stopped rendering everywhere.
    for (const [id, kws] of [
      ["the-pattern-statement", C.patternKw],
      ["the-pattern-capability-line", C.capabilityLineKw],
      ["the-pattern-closer", C.closerKw],
    ] as const) {
      const ems = [...screen.getByTestId(id).querySelectorAll("em")].map((em) => em.textContent);
      expect(ems, id).toHaveLength(kws.length);
      for (const kw of kws) expect(ems, `${id} · ${kw}`).toContain(kw);
    }
    const heading = container.querySelector("h1");
    expect([...(heading?.querySelectorAll("em") ?? [])].map((em) => em.textContent)).toEqual([
      ...C.headlineKw,
    ]);
    unmount();
  });
});

// ── AC · figures and letters are derived, never authored ─────────────────────

describe("no rendered string names a letter or a figure", () => {
  test("authored copy and the rendered stage both stay figure-free", () => {
    // §3.4 R2 / §3.5. This slide composes as B.4 today and every figure behind it in the
    // run steps by one the day another slide lands in front of it, so a literal "B.4" or
    // "SECTION B" in this copy would be a lie on a projector within the week.
    const FIGURE = /\b[A-N]\.\d+\b/;
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(FIGURE);
      expect(copy, copy).not.toMatch(/\bB\.\d\b/);
      expect(copy, copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      // No count of its own successors either — the run this slide sits in is composed per
      // deck set (§3.4), so a sentence that numbered the slides behind it would go stale
      // the first time one was inserted or cut.
      expect(copy, copy).not.toMatch(/\bnext (one|two|three|four|five|slide)\b/i);
      expect(copy, copy).not.toMatch(/\b(slide|figure)\b/i);
    }
    // The rendered half is scoped past the harness's FigLabel, which prints the DERIVED
    // figure — the composer's to print and not this slide's to author.
    const { container, unmount } = renderSlide(3);
    expect(
      container.querySelector(".fig-label")?.textContent,
      "the derived reference is there to strip",
    ).toContain(`${AT.letter}.${AT.num}`);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length).toBeGreaterThan(300);
    expect(stage).not.toMatch(FIGURE);
    expect(stage).not.toMatch(/\bB\.\d\b/);
    unmount();
  });
});

// ── AC · the geometry holds the stage ────────────────────────────────────────

describe("the geometry", () => {
  test("nothing crosses the NavBar's hover band", () => {
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);
    expect(CLOSER_TOP + CLOSER_HEIGHT).toBe(NAV_ZONE_TOP - NAV_ZONE_CLEARANCE);
    // Held over the RENDERED boxes as well as over the module: every positioned box's
    // bottom edge, read off the DOM at the fullest pose.
    const { container, unmount } = renderSlide(3);
    const boxes = [...container.querySelectorAll<HTMLElement>("[data-testid^='the-pattern-']")];
    expect(boxes.length).toBe(EVERY_BOX.length);
    for (const box of boxes) {
      const top = parseFloat(box.style.top);
      const height = parseFloat(box.style.height);
      expect(Number.isFinite(top), `${box.dataset.testid} has no top`).toBe(true);
      // The rule's wrapper carries no height of its own — its `CopperRule` child is 1px in
      // the stylesheet, which jsdom does not compute.
      const bottom = top + (Number.isFinite(height) ? height : 1);
      expect(bottom, `${box.dataset.testid} crosses the NavBar band`).toBeLessThanOrEqual(
        NAV_ZONE_TOP,
      );
    }
    unmount();
  });

  test("every painted colour is a CSS var — no hex and no rgba() literal", () => {
    // THE BUILD RULE, held over what the renderer actually writes into the DOM rather than
    // over the source. Two properties carry colour on this stage: `color` on the seven
    // type boxes and `background` on the brace's two halves. jsdom keeps `var(--…)`
    // verbatim (it does not resolve custom properties), so a hex or an `rgba()` literal
    // shows up here as itself.
    const { container, unmount } = renderSlide(3);
    const boxes = [...container.querySelectorAll<HTMLElement>("[data-testid^='the-pattern-']")];
    let painted = 0;
    for (const box of boxes) {
      for (const prop of ["color", "background", "backgroundColor", "borderColor"] as const) {
        const value = box.style[prop];
        if (!value) continue;
        painted += 1;
        expect(value, `${box.dataset.testid} · ${prop}`).toMatch(/^var\(--[a-z0-9-]+\)$/);
      }
    }
    // Not vacuously: the rule above would also pass on a stage that painted nothing.
    expect(painted, "no colour reached the DOM at all").toBeGreaterThanOrEqual(9);
    unmount();
  });

  test("the row guard refuses a fourth reduction and any non-integer index", () => {
    expect(() => reductionRowTop(REDUCTION_COUNT)).toThrow(/no reduction 3/);
    // The message has to say what a fourth would MOVE, because that is the decision it is
    // refusing on behalf of: the brace re-centres, so the pointer and the statement it
    // points at both land on new shelves, and the lower stage crosses the NavBar band.
    expect(() => reductionRowTop(3)).toThrow(/NAV_ZONE_CLEARANCE/);
    expect(() => reductionRowTop(3)).toThrow(/re-centre/);
    expect(() => reductionRowTop(-1)).toThrow(/no reduction -1/);
    expect(() => reductionRowTop(1.5)).toThrow(/no reduction 1\.5/);
    expect(() => reductionRowTop(Number.NaN)).toThrow();
    // …and the three it does place are the three the copy holds.
    expect([0, 1, 2].map(reductionRowTop)).toEqual([184, 249, 314]);
  });
});

// ── AC · no brand variance ───────────────────────────────────────────────────

describe("no brand variance", () => {
  test("takes no brand block and names no organisation", () => {
    // §4.4's seven brand × deckSet slots do not list this slide, so there is no
    // `…For(brand)` resolver to call and the component takes no props. The three failures
    // it generalises are the PRESENTER'S, so there is nothing for a brand to vary: neither
    // leader room owns this record and neither is being shown its own evidence.
    expect(GapThePattern.length).toBe(0);
    for (const copy of authoredStrings()) {
      expect(copy, `an organisation in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(GEMS|GEMVIS|Berau|DigiTech|MineTech|Nanovest|Sinar Mas)\b/i,
      );
    }
  });

  test("the content block is plain data — no resolver hiding in it", () => {
    // A `Record<Brand, …>` reachable from this block would be a brand axis nobody
    // declared. Every value is a string, a readonly array of strings, or a tuple of
    // `{ id, label }` — and no value is a function.
    const walk = (value: unknown, path: string): void => {
      if (typeof value === "function") throw new Error(`a function at ${path}`);
      if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`));
      else if (value !== null && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
      }
    };
    expect(() => walk(C, "gapThePatternContent")).not.toThrow();
    // POSITIVE CONTROL — the walk is alive and would find a resolver one level down.
    expect(() => walk({ nested: { patternFor: () => C } }, "control")).toThrow(
      /a function at control\.nested\.patternFor/,
    );
  });
});

describe("both leader decks print the same stage", () => {
  // BRAND INVARIANCE IS A CLAIM ABOUT MODULE EPOCHS — `VARIANT` resolves once at module
  // scope — so it cannot be checked inside the one epoch every test above runs in. Two
  // epochs, byte for byte, following `mandate-enablement.test.tsx` and `gap-no-sop.test.tsx`.
  //
  // NOT `SlideHarness`, deliberately: it imports `composedDeck` statically and would hand a
  // freshly loaded slide a stale context object. This is the same-epoch dynamic-import
  // pattern `variant-composition.test.tsx` documents.
  const LEADER_VARIANTS: VariantId[] = ["berau-leader", "gems-leader"];

  async function stageFor(variant: VariantId): Promise<{ html: string; text: string }> {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: new URL(`http://localhost:5173/?variant=${variant}`),
    });
    vi.resetModules();
    cleanup();

    const [{ composedDeck }, { DeckProvider, useDeck: useDeckIn }, { SlideNumberProvider }, slide] =
      await Promise.all([
        import("@/deck/registry"),
        import("@/deck/DeckContext"),
        import("@/deck/SlideNumberContext"),
        import("@/slides/leader-gap/gap-the-pattern"),
      ]);

    // THE POSITION IS READ OFF THE COMPOSED DECK WHEN THERE IS ONE, and falls back to the
    // harness input otherwise. WHERE this slide composes is `deck-registry.test.ts`'s claim
    // and not this file's (see the header); what is asserted here is that the two leader
    // rooms read the same bytes, which is true of a slide that composes nowhere as well as
    // of one that composes at B.4.
    const row = composedDeck.slides.find((s) => s.def.id === "gap-the-pattern");
    const at = row ? { letter: row.letter, num: row.num, sectionKey: row.sectionKey } : AT;

    function AdvanceTo({ step }: { step: number }) {
      const { goTo } = useDeckIn();
      return <button data-testid="goto-epoch" onClick={() => goTo(0, step)} />;
    }

    const { container } = render(
      <DeckProvider stepCounts={[slide.gapThePatternSlide.steps]}>
        <SlideNumberProvider value={at}>
          <AdvanceTo step={slide.gapThePatternSlide.canonicalPose} />
          <slide.GapThePattern />
        </SlideNumberProvider>
      </DeckProvider>,
    );
    act(() => screen.getByTestId("goto-epoch").click());
    return { html: container.innerHTML, text: container.textContent ?? "" };
  }

  afterAll(restoreLocation);

  test("byte for byte, at the fullest pose", async () => {
    // SEQUENTIALLY, not `Promise.all`. Each call re-points `window.location`, resets the
    // module registry and renders into the SAME document — run concurrently they
    // interleave, two stages share one DOM, and every query finds two elements.
    const berau = await stageFor(LEADER_VARIANTS[0]);
    const gems = await stageFor(LEADER_VARIANTS[1]);
    // MARKUP AND TEXT BOTH: a brand axis could move a colour token or a delay without
    // changing a word, and `textContent` alone would not see it.
    expect(berau.html).toBe(gems.html);
    expect(berau.text).toBe(gems.text);
    // Not vacuously: a stage that rendered nothing would also be equal.
    expect(berau.text).toContain(C.headline);
    expect(berau.text).toContain(C.reductions[0].label);
    expect(berau.text).toContain(C.pattern);
    expect(berau.text).toContain(C.closer);
  });
});
