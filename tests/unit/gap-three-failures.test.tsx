// THREE THINGS WE GOT WRONG · slide tests. All four poses, and the rules gh#67's AC
// states — held over EVERY authored string and over the RENDERED stage rather than
// spot-checked.
//
// WHAT THIS FILE CAN AND CANNOT PROVE — its siblings' preamble, inherited. jsdom has no
// layout and no media queries, so nothing here measures a pixel and `prefers-reduced-
// motion: reduce` cannot really be toggled. What a DOM-less runner is good for is what
// THIS slide is actually at risk of:
//
//   1. THE VOICE SLIPPING. The three failures are first person PLURAL and the closer is
//      first person SINGULAR, and there is no second person anywhere. That is not a style
//      note: three slides later in the same deck are allowed to make the turn this one
//      may not — D.3 (`invest-chicken-egg`) ends its fourth beat on "You are the person
//      who can skip all three", and M.1/M.2 hand the room "so you skip my mistakes" and
//      "each one yours to skip past". A single "you" here converts a confession into the
//      favour it is trying not to be, and it is one regex to catch. Both halves are held
//      below, with the neighbours' own strings as the positive control.
//   2. AN OUTCOME LEAKING BACK IN. §6.3 CUTS HR p16–18 — the app-performance multiple,
//      the chatbot's deflection rate and the preparation/implementation split — and the
//      cheapest way for them to come back is an editor "strengthening" a failure with the
//      win that followed it. Held as a forbidden-token list whose every pattern is fired
//      against the research sentence it was read off.
//   3. RE-SPENDING THE TWO SLIDES IN FRONT OF IT. B.1 (`gap-hardest-part`) and B.2
//      (`gap-no-sop`) run immediately before this one. Their token lists are drawn from
//      their own strings rather than typed from memory, and a phrase rule that needs no
//      list at all runs beside them.
//   4. A POSE RESTING ON A BOAST. Every entry's cost must land inside the same pose as
//      its admission, and last. That is a REVEAL fact and it is plain DOM.
//
// WHAT IS LEFT TO THE BROWSER WALK: the reduce-mode half of the zero-SMIL AC (held here
// at every pose under both preferences, plus the structural fact that makes it true by
// construction — the figure mounts no `<svg>` at all); the real wrap of the six prose
// rows against the measure `three-failures-geometry.ts` budgets; and the painted colour
// ladder, including the spine and the three marks.
//
// DECK COMPOSITION IS NOT ASSERTED HERE. Where this slide sits in the two leader decks
// belongs to `deck-registry.test.ts` and the numbering fixture. `AT` below is a harness
// INPUT, not a claim the slide makes: this module epoch resolves the default `general`
// deck, which runs no leader slide at all.
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { restoreLocation } from "../harvest/deck-numbering";
import type { VariantId } from "@/deck-variants";
import { GapThreeFailures, gapThreeFailuresSlide } from "@/slides/leader-gap/gap-three-failures";
import {
  gapHardestPartContent,
  gapNoSopContent,
  gapThreeFailuresContent,
} from "@/slides/leader-gap/content";
// THE NEIGHBOURS WHOSE TURN THIS SLIDE MAY NOT MAKE, as modules. D.3 is
// `investChickenEggContent`; M.1 and M.2 are `j1Content` and `j2Content`. Imported so the
// second-person rule below is controlled against what those slides ACTUALLY say today
// rather than against a copy of it kept here.
import { investChickenEggContent } from "@/slides/leader-invest/content";
import { j1Content, j2Content } from "@/slides/reveal-and-closing/content";
import {
  CLOSER_HEIGHT,
  CLOSER_TOP,
  COST_HEIGHT,
  DID_HEIGHT,
  ENTRY_LEFT,
  ENTRY_WIDTH,
  FAILURE_COUNT,
  MARK_HEIGHT,
  MARK_LEFT,
  MARK_WIDTH,
  MONO_ROW_HEIGHT,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  RAIL_LEFT,
  RAIL_WIDTH,
  RULE_HEIGHT,
  RULE_TOP,
  SPINE_HEIGHT,
  SPINE_LEFT,
  SPINE_TOP,
  SPINE_WIDTH,
  costTop,
  didTop,
  entryTop,
  markTop,
} from "@/slides/leader-gap/three-failures-geometry";

const C = gapThreeFailuresContent;
const POSES = [0, 1, 2, 3] as const;

/**
 * The position this slide holds in the decks that will run it.
 *
 * `at` IS required here, the case every leader-only sibling documents: unit tests resolve
 * the default `general` deck, `general` has no leader variant, and this slide reaches the
 * leader deck sets alone. The third of the `gap` run, which is the leader decks' first
 * (§4.3) — a harness INPUT, not a claim the slide makes (§3.5). No file under
 * `src/slides/leader-gap/` authors either half of it, which is the rule the figure-freedom
 * block below holds.
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
    <SlideHarness def={gapThreeFailuresSlide} at={AT}>
      <Nav />
      <GapThreeFailures />
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

/** The five boxes one entry is drawn from: its date, its mark on the spine, its name, the
 *  admission and the consequence. ONE POSE HOLDS ALL FIVE — see the pose walk. */
const entryIds = (index: number): string[] => {
  const { id } = C.failures[index];
  return [
    `three-failures-period-${id}`,
    `three-failures-mark-${id}`,
    `three-failures-title-${id}`,
    `three-failures-did-${id}`,
    `three-failures-cost-${id}`,
  ];
};

const POSE_0_IDS = ["three-failures-ledger-eyebrow", "three-failures-spine", ...entryIds(0)];
const POSE_1_IDS = entryIds(1);
const POSE_2_IDS = entryIds(2);
const POSE_3_IDS = ["three-failures-rule", "three-failures-closer"];

const REVEALED_AT: ReadonlyArray<readonly string[]> = [
  POSE_0_IDS,
  POSE_1_IDS,
  POSE_2_IDS,
  POSE_3_IDS,
];

const EVERY_BOX = REVEALED_AT.flat();

/** The five boxes with no text of their own — the spine, the three marks and the copper
 *  rule's wrapper. Named once, so the "the copy is there, not merely the box" checks below
 *  cannot be quietly widened. */
const TEXTLESS_IDS = new Set([
  "three-failures-spine",
  "three-failures-rule",
  ...C.failures.map((failure) => `three-failures-mark-${failure.id}`),
]);

/**
 * The element whose class carries a box's reveal — the sibling files' two-shape reader.
 * Every box but one IS a `Reveal`; `three-failures-rule`'s testid is on a positioned
 * wrapper around a `CopperRule`, because that primitive spreads no `data-*` props.
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

/** Every string reachable from `value` — the walk, not a hand list, for the sibling files'
 *  reason: a field added next month is inside every rule below the day it exists. It
 *  collects `id` fields too, deliberately: those reach the DOM as `data-testid`, and a
 *  borrowed image written into a hook is the same defect written somewhere less visible. */
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

/** B.1's corpus — two figures in front of this one, in the same run. */
const b1Strings = (): string[] => walkStrings(gapHardestPartContent);

/** B.2's corpus — one figure in front of this one, in the same run. */
const b2Strings = (): string[] => walkStrings(gapNoSopContent);

/** D.3's corpus — the slide that is allowed to hand these three failures to the room. */
const d3Strings = (): string[] => walkStrings(investChickenEggContent);

/**
 * The EIGHT PROSE strings, each with the `*Kw` sibling the copy module pairs it with.
 *
 * Eight and not four: the headline and the closer are the block's own, and each of the
 * three failures carries an admission and a consequence. The label half below is also
 * eight, which is a coincidence of this stage rather than a rule.
 */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ...C.failures.flatMap(
    (failure) =>
      [
        [`${failure.id}.did`, failure.did, failure.didKw],
        [`${failure.id}.cost`, failure.cost, failure.costKw],
      ] as const,
  ),
  ["closer", C.closer, C.closerKw],
];

/** The EIGHT LABEL strings, which carry no `*Kw` and may not gain one. Written out as a
 *  list on purpose: together with `PROSE` above it is checked against what the STAGE
 *  actually prints, so a seventeenth string has to pick a side before it can render. */
const LABELS: readonly string[] = [
  C.figLabel,
  C.ledgerEyebrow,
  ...C.failures.map((failure) => failure.period),
  ...C.failures.map((failure) => failure.title),
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

/** The label half of the `FigLabel` — its last span, which is the only part of that element
 *  this slide authors. The reference in front of it is the composer's. */
function figLabelText(container: HTMLElement): string {
  const spans = container.querySelectorAll(".fig-label span");
  return spans[spans.length - 1]?.textContent ?? "";
}

/** What the stage prints, read off the DOM: the headline, the fig label's own half, and
 *  every box that carries type. */
function stagePrintedStrings(container: HTMLElement): string[] {
  const heading = container.querySelector("h1")?.textContent ?? "";
  const boxes = [...container.querySelectorAll<HTMLElement>("[data-testid^='three-failures-']")]
    .map((el) => el.textContent ?? "")
    .filter((text) => text !== "");
  return [heading, figLabelText(container), ...boxes];
}

/** The set of every N-word phrase in a string set, lowercased and stripped of punctuation
 *  so "own." and "own" are the same word. The idiom is
 *  `tests/unit/invest-chicken-egg.test.tsx`'s, restated here because this slide runs the
 *  same rule against three neighbours instead of one. */
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

/** Every word of five letters or more in a corpus, lower-cased. Five, because below it the
 *  intersection is the language's own connective tissue and a rule about those is a rule
 *  about English rather than about two slides. */
function longWords(strings: readonly string[]): Set<string> {
  const out = new Set<string>();
  for (const copy of strings) {
    for (const word of copy.toLowerCase().match(/[a-z][a-z'-]*/g) ?? []) {
      if (word.length >= 5) out.add(word);
    }
  }
  return out;
}

// ── the slide def ────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("declares 4 poses with the fullest one canonical", () => {
    expect(gapThreeFailuresSlide.id).toBe("gap-three-failures");
    expect(gapThreeFailuresSlide.steps).toBe(4);
    // The exported PDF has no presenter attached, so the exported frame must be the one
    // that is safe to read alone. Anything lower would export a page of three dated
    // failures with nobody's name attached — a document somebody else can re-caption as a
    // finding against a team.
    expect(gapThreeFailuresSlide.canonicalPose).toBe(3);
    expect(gapThreeFailuresSlide.canonicalPose).toBe(gapThreeFailuresSlide.steps - 1);
    expect(gapThreeFailuresSlide.animationMode).toBe("step-reveal");
    expect(gapThreeFailuresSlide.surface).toBe("dark");
    expect(gapThreeFailuresSlide.sectionKey).toBe("gap");
  });
});

// ── AC · three failures, in order ────────────────────────────────────────────

describe("the record — three, in the order they happened", () => {
  test("the tuple is pinned at three and the ids are stable", () => {
    // THE COUNT IS PINNED IN TWO PLACES AND THIS IS THE JOINT. `./content.ts` holds it as
    // a fixed-length tuple; `three-failures-geometry.ts` types `FAILURE_COUNT` off that
    // tuple's `length`; the stage is cut for exactly three entries. A fourth fails to
    // compile in both files before it can push the closer through the NavBar band.
    expect(C.failures).toHaveLength(3);
    expect(FAILURE_COUNT).toBe(C.failures.length);
    expect(C.failures.map((failure) => failure.id)).toEqual([
      "tools-before-method",
      "built-what-existed",
      "owned-their-work",
    ]);
  });

  test("the order is chronological, and the rail says so", () => {
    // A LEDGER IS KEPT IN ORDER, which is the whole reason the figure is a dated rail with
    // a spine rather than three cards. The periods are read off the copy rather than
    // re-typed as a claim: what is asserted is that they ARE dates, that they run forwards,
    // and that every range uses an EN DASH — a hyphen there is a typographic bug the deck
    // catches nowhere else.
    expect(C.failures.map((failure) => failure.period)).toEqual([
      "Q1 2025",
      "Q2–Q4 2025",
      "2025–2026",
    ]);
    for (const failure of C.failures) {
      expect(failure.period, failure.id).toMatch(/\d{4}/);
      expect(failure.period, `${failure.id} uses a hyphen where an en dash belongs`).not.toMatch(
        /-/,
      );
    }
    const firstYear = (period: string) => Number(period.match(/\d{4}/)?.[0]);
    expect(firstYear(C.failures[0].period)).toBeLessThanOrEqual(firstYear(C.failures[1].period));
    expect(firstYear(C.failures[1].period)).toBeLessThanOrEqual(firstYear(C.failures[2].period));
  });

  test("every entry names a decision and pairs it with a consequence", () => {
    // THE PAIR IS WHAT MAKES IT A RECORD. An entry that named a decision with no cost is a
    // boast in the shape of an admission; an entry that named a cost with no decision is a
    // complaint about the weather. Held over the tuple rather than over three transcribed
    // sentences, so a fourth entry written next month is inside the rule the day it exists.
    for (const failure of C.failures) {
      expect(failure.title, failure.id).toBe(failure.title.toUpperCase());
      expect(failure.title, `${failure.id} names a decision, in the first person`).toMatch(
        /^WE\b/,
      );
      expect(failure.did.length, `${failure.id}.did`).toBeGreaterThan(60);
      expect(failure.cost.length, `${failure.id}.cost`).toBeGreaterThan(60);
      expect(failure.did, failure.id).toMatch(/\.$/);
      expect(failure.cost, failure.id).toMatch(/\.$/);
    }
    // AND THE THREE TITLES ARE NOT L.3's SUMMARY OF THE SAME THREE FAILURES.
    // `reveal-and-closing/content.ts` renders "three honest failures — methodology,
    // strategy, empowerment" in the same deck, so that triple is already spent.
    for (const copy of authoredStrings()) {
      expect(copy, `L.3's paraphrase in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(methodolog\w*|empowerment|strategy)\b/i,
      );
    }
  });
});

// ── AC · the voice ───────────────────────────────────────────────────────────

describe("the first person, and only the first person", () => {
  test("no second person anywhere — not one you, your or yours", () => {
    // THE HARD, TESTABLE PROPERTY, and the one that separates this slide from three others
    // in the same deck. Held over the authored copy AND over the rendered stage at the
    // exported pose, because a turn to the room could arrive from a component as easily as
    // from the copy block.
    const SECOND_PERSON = /\b(you|your|yours|you're|you've)\b/i;
    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage, "positive control: the stage is not empty").toContain(C.closer);
    for (const copy of [...authoredStrings(), stage]) {
      expect(copy, `a second person in ${JSON.stringify(copy)}`).not.toMatch(SECOND_PERSON);
    }
    unmount();

    // POSITIVE CONTROLS, fired against the three slides that ARE allowed to make the turn —
    // their own strings, not sentences written here to make the regex fire. D.3 hands these
    // same three failures to the room as a shortcut; M.1 and M.2 build a whole register on
    // it. THIS SLIDE CONFESSES AND STOPS.
    expect(SECOND_PERSON.test(investChickenEggContent.turn)).toBe(true);
    expect(investChickenEggContent.turn).toBe("You are the person who can skip all three.");
    expect(SECOND_PERSON.test(j1Content.line2.text)).toBe(true);
    expect(SECOND_PERSON.test(j2Content.footer)).toBe(true);
    // AND THE MOVE ITSELF IS REFUSED, not merely the pronoun: no "skip", no "so you can
    // learn", no lesson handed over. B.3 lays down three entries and stops.
    for (const copy of authoredStrings()) {
      expect(copy, `the "so you can skip it" move in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(skip|lesson|lessons|learn|takeaway)\b/i,
      );
    }
    expect(/\bskip\b/i.test(j2Content.footer)).toBe(true);
  });

  test("every failure is first person PLURAL, and the closer turns to SINGULAR", () => {
    // THE TWO HALVES OF THE VOICE. The failures are the organisation's — we bought, we
    // built, we owned — and the closer is the presenter's, because the person standing in
    // front of the room is the person who made the calls. A confession delivered in the
    // passive is not a confession.
    const FIRST_PLURAL = /\b(we|we're|we've|our|ours|us)\b/i;
    const FIRST_SINGULAR = /\b(I|I'm|I've|my|mine|me)\b/;
    for (const failure of C.failures) {
      const entry = [failure.title, failure.did, failure.cost].join(" ");
      expect(FIRST_PLURAL.test(entry), `${failure.id} is not in the first person plural`).toBe(
        true,
      );
    }
    expect(FIRST_SINGULAR.test(C.closer), "the closer carries no first person singular").toBe(
      true,
    );
    expect(C.closer).toBe("None of this is borrowed. Every one of these calls was mine.");
    expect(C.closerKw).toEqual(["Every one of these calls was mine"]);

    // AND THE SINGULAR IS THE CLOSER'S ALONE. An entry that said "I" would make one of the
    // three a personal mistake rather than the organisation's record, which is the reading
    // that makes the other two sound like somebody else's fault.
    for (const failure of C.failures) {
      for (const copy of [failure.title, failure.did, failure.cost]) {
        expect(copy, `first person singular in ${JSON.stringify(copy)}`).not.toMatch(
          FIRST_SINGULAR,
        );
      }
    }
    // The headline is plural too — it is the room being walked in, not the presenter.
    expect(FIRST_PLURAL.test(C.headline)).toBe(true);
    expect(C.headline).toBe("We got here by failing three times first.");
    expect(C.headlineKw).toEqual(["failing three times"]);
  });
});

// ── AC · §6.3 · HR p16–18 outcomes are cut ───────────────────────────────────

/**
 * The outcomes §6.3 cuts, one regex each.
 *
 * PDF PAGE N IS SOURCE SLIDE N−1, so p16–18 are HR slides 15, 16 and 17: the
 * app-performance benchmark, the Naura chatbot and the capability-calibration pair. Every
 * pattern below is fired in the control test against the research sentence it was read
 * off, so a list that drifted out of date fails loudly instead of passing vacuously.
 *
 * WHY THE CUT IS A RULE AND NOT A PREFERENCE: outcomes brag, failures transfer. A leader
 * shown a performance multiple learns that somebody else's team is good; a leader shown
 * three decisions that cost real quarters can check them against their own.
 */
const HR_OUTCOME_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["6.90× overall", /\b6\.90?\b/],
  ["3.49× H1", /\b3\.49\b/],
  ["90% of the competitor gap", /\b90\s*%\s*of the competitor gap\b/i],
  ["10× faster", /\b10\s*[×x]\s*faster\b/i],
  ["4 of 6 metrics", /\b4 of 6 metrics\b/i],
  ["Pluang", /\bPluang\b/i],
  ["Pintu", /\bPintu\b/i],
  ["Tokocrypto", /\bTokocrypto\b/i],
  ["Indodax", /\bIndodax\b/i],
  ["same codebase", /\bsame codebase\b/i],
  ["Naura", /\bNaura\b/i],
  ["14,000 conversations", /\b14,?000\b/],
  ["75.08", /\b75\.08\b/],
  ["deflection", /\bdeflect\w*\b/i],
  ["10% monthly", /\b10\s*%\s*monthly\b/i],
  ["Operations owner → AISC enabler → Engineering builder", /\bAISC enabler\b/i],
  ["finance tracker", /\bfinance tracker\b/i],
  ["one large prompt", /\bone large prompt\b/i],
  ["70% preparation", /\b70\s*%\s*prep\w*\b/i],
  ["30% implementation", /\b30\s*%\s*implementation\b/i],
  ["three days / one day", /\bthree days\s*\/\s*70\b/i],
];

/**
 * The research's own sentences for the three cut slides, transcribed from
 * `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md` (slides 15–17, ≈ lines
 * 258–287) on 2026-08-08.
 *
 * THE CONTROL CORPUS IS THE SOURCE AND NOT A SET OF SENTENCES WRITTEN TO MAKE THE REGEXES
 * FIRE, which is the same call `invest-chicken-egg.test.tsx` records for §6.2's spec line:
 * a control that edits its own input proves the edit and not the pattern.
 */
const HR_OUTCOME_SOURCES: readonly string[] = [
  "Benchmarked homepage, navbar, and asset-page performance against Pluang, Pintu, Tokocrypto, and Indodax.",
  "H1 2025: 3.49× improvement from a concentrated iOS finding.",
  "H2 2025: 6.90× distributed, Android-led improvement.",
  "Reported results: 6.90× overall, about 90% of the competitor gap closed, 10× faster Android homepage, and 4 of 6 metrics matching or beating competitors.",
  "Core message: the same codebase and team produced different results after adopting more disciplined research and execution practices.",
  "Slide 16 — Naura, Nanovest AI Chatbot",
  "Ownership flow: Operations owner → AISC enabler → Engineering builder.",
  "Reported results: 14,000+ conversations, 75.08% deflection in December 2025, and 10% monthly usage growth.",
  "Finance tracker—easier than expected: a single prompt generated an executive dashboard with formulas and finance practices.",
  "Building the deck—harder than expected: one large prompt produced poor slides.",
  "Deck-production split: approximately three days/70% preparation and one day/30% implementation.",
];

/**
 * The two spellings with NO source sentence to fire against, kept anyway and said out loud
 * rather than quietly padded into the list above.
 *
 * `budget tracker` is how the finance-dashboard case gets misremembered — the research says
 * "finance tracker" — and `75% deflection` is the rounded form of a figure that is only
 * ever printed to two decimals. Both are refused here; neither can be controlled against a
 * source that does not spell them, and a regex that fires on nothing would make the rule
 * above pass on copy lifted verbatim.
 */
const HR_UNSOURCED_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["budget tracker", /\bbudget tracker\b/i],
  ["75% deflection", /\b75\s*%\s*deflect\w*\b/i],
];

describe("§6.3 · the outcomes are cut, and none of them leaked back in", () => {
  test("no HR p16–18 outcome reaches the copy or the stage", () => {
    const authored = authoredStrings();
    expect(authored.length, "a rule over an empty set proves nothing").toBeGreaterThan(20);

    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(600);
    for (const [name, pattern] of [...HR_OUTCOME_TOKENS, ...HR_UNSOURCED_TOKENS]) {
      for (const copy of authored) {
        expect(pattern.test(copy), `the cut "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `the cut "${name}" reached the stage`).toBe(false);
    }
    // AND THE ONE FORM OF NUMBER THIS SLIDE DOES PRINT IS A DATE. Every digit on the stage
    // belongs to the ledger's rail, which is what makes "no outcome figures" checkable as a
    // shape rather than as a list: a quantity here would have to be a year.
    const digits = authored.filter((copy) => /\d/.test(copy));
    expect(digits.sort()).toEqual([...C.failures.map((failure) => failure.period)].sort());
    unmount();
  });

  test("every cut pattern still fires on the research sentence it was read off", () => {
    // TWENTY-ONE REGEXES THAT MATCHED NOTHING would make the rule above pass on copy lifted
    // verbatim from the source deck, so each one is checked against the research's own
    // words. The two unsourced spellings are excluded by construction and argued at their
    // declaration.
    for (const [name, pattern] of HR_OUTCOME_TOKENS) {
      expect(
        HR_OUTCOME_SOURCES.some((line) => pattern.test(line)),
        `"${name}" no longer fires on the research sentence it came from`,
      ).toBe(true);
    }
    for (const [name, pattern] of HR_UNSOURCED_TOKENS) {
      expect(
        HR_OUTCOME_SOURCES.some((line) => pattern.test(line)),
        `"${name}" is documented as having no source sentence`,
      ).toBe(false);
    }
  });
});

// ── AC · the neighbours keep their vocabulary ────────────────────────────────

/**
 * D.3's reserved vocabulary — the list `invest-chicken-egg.test.tsx` holds its own copy to,
 * restated here so the SAME rule runs in the other direction. A token can migrate either
 * way and only the receiving file notices.
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

/** B.2's RENDERED image, and §6.2's own three phrasings — the two lists
 *  `invest-chicken-egg.test.tsx` keeps, pointed at the slide that runs directly after B.2
 *  instead of the one four sections later. */
const B2_IMAGE_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["the rule nobody wrote", /\brule nobody wrote\b/i],
  ["wrote their own", /\bwrote their own\b/i],
  ["never wrote down", /\bnever wrote down\b/i],
  ["handed out", /\bhanded out\b/i],
  ["a login", /\blogin\w*\b/i],
  ["a demonstration", /\bdemonstrat\w*\b/i],
  ["encouragement", /\bencourag\w*\b/i],
  ["which work may", /\bwhich work may\b/i],
  ["the silence", /\bsilence\b/i],
  ["still gets answered", /\bstill gets answered\b/i],
  ["no rule to break", /\bno rule to break\b/i],
  ["the leader's job", /\bleader['’]s job\b/i],
  ["improvise", /\bimprovis\w*\b/i],
];

/** §6.2's two spellings B.2 chose NOT to print, kept for the reason
 *  `invest-chicken-egg.test.tsx` keeps them: they guard against a later author lifting the
 *  SPEC's phrasing rather than the neighbour's rendered copy. Controlled against §6.2's own
 *  sentence and the slide id it names, which is where they are still the only source. */
const B2_SPEC_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["no SOP", /\bno[-\s]SOP\b/i],
  ["no guidance", /\bno guidance\b/i],
];

/** B.1's own tokens — its quoted figure, its two halves and its four verbs. */
const B1_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["70%", /\b70\s*%/],
  ["30%", /\b30\s*%/],
  ["people & process", /people\s*&\s*process/i],
  ["not technology", /\bnot technology\b/i],
  ["technology", /\btechnolog\w*\b/i],
  ["procured", /\bprocure\w*\b/i],
  ["instantly", /\binstant\w*\b/i],
  ["earned", /\bearn\w*\b/i],
  ["invoice", /\binvoice\b/i],
  ["tool access", /\btool access\b/i],
  ["capability", /\bcapabilit\w*\b/i],
  ["BCG", /\bBCG\b/],
  ["McKinsey", /\bMcKinsey\b/i],
];

describe("the two slides in front of it keep their vocabulary, and D.3 keeps its own", () => {
  test("uses none of B.1's, B.2's or D.3's reserved images — and every pattern fires", () => {
    const authored = authoredStrings();
    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);

    const forbidden = [
      ...B1_TOKENS.map(([n, p]) => [n, p, "B.1"] as const),
      ...B2_IMAGE_TOKENS.map(([n, p]) => [n, p, "B.2"] as const),
      ...B2_SPEC_TOKENS.map(([n, p]) => [n, p, "§6.2"] as const),
      ...D3_TOKENS.map(([n, p]) => [n, p, "D.3"] as const),
    ];
    for (const [name, pattern, owner] of forbidden) {
      for (const copy of authored) {
        expect(pattern.test(copy), `${owner}'s "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `${owner}'s "${name}" reached the stage`).toBe(false);
    }
    // THE BARE PHRASE `70/30` IS NOT IN THE FIRED LIST, and the reason is B.2's file's:
    // B.1 never prints it either — §6.5's Capability Ladder owns that spelling — so a
    // pattern for it could not be fired against B.1's strings without a false claim about
    // where it came from. It is still refused, because B.1's split IS 70 against 30.
    expect(stage).not.toMatch(/\b70\s*\/\s*30\b/);
    for (const copy of authored) expect(copy).not.toMatch(/\b70\s*\/\s*30\b/);
    unmount();

    // EVERY PATTERN FIRED AGAINST THE SLIDE IT WAS READ OFF. Thirty-four regexes that
    // matched nothing would make the rule above pass on copy lifted verbatim from any of
    // the three, so each one is checked against that slide's REAL strings.
    const b1 = b1Strings();
    const b2 = b2Strings();
    const d3 = d3Strings();
    for (const [name, pattern] of B1_TOKENS) {
      expect(b1.some((copy) => pattern.test(copy)), `"${name}" is not B.1's`).toBe(true);
    }
    for (const [name, pattern] of B2_IMAGE_TOKENS) {
      expect(b2.some((copy) => pattern.test(copy)), `"${name}" is not B.2's`).toBe(true);
    }
    for (const [name, pattern] of D3_TOKENS) {
      expect(d3.some((copy) => pattern.test(copy)), `"${name}" is not D.3's`).toBe(true);
    }
    // §6.2's two unrendered spellings, controlled against the spec sentence and the slide
    // id — the split `invest-chicken-egg.test.tsx` documents, restated rather than assumed.
    const specSources = ["There is no guidance, so people improvise.", "gap-no-sop"];
    for (const [name, pattern] of B2_SPEC_TOKENS) {
      expect(specSources.some((line) => pattern.test(line)), name).toBe(true);
      expect(b2.some((line) => pattern.test(line)), `${name} is not rendered by B.2`).toBe(false);
    }
  });

  test("shares no three-word phrase with B.1, B.2 or D.3, in either direction", () => {
    // THE RULE THAT DOES NOT DEPEND ON A HAND-WRITTEN LIST. Every token list above is a
    // judgement call about which words carry an image; this one is not. It is set
    // intersection over every three-word phrase either slide prints, and it catches the
    // failure a token list cannot see by construction — a sentence lifted from a neighbour
    // using words nobody thought to reserve.
    //
    // THREE WORDS IS THE THRESHOLD THE COPY CHOSE, not a number picked to make the test
    // pass, and it is the same measurement `invest-chicken-egg.test.tsx` records for its own
    // pair. MEASURED ON 2026-08-08 against the shipped blocks: this slide shares exactly ONE
    // two-word phrase with B.1 ("this is") and exactly ONE with B.2 ("one of"), and ZERO
    // three-word phrases with either. Two-word overlap of function words is unavoidable in
    // English and proves nothing; a shared three-word phrase between two slides in the same
    // run is copy that was lifted.
    //
    // D.3 IS THE ONE EXCEPTION AND IT IS PINNED AS AN EQUALITY RATHER THAN HIDDEN, because a
    // rule that was relaxed to a subset check would stop catching the next one. The shared
    // phrase is "and we were" — D.3's "So we did it on shared accounts, and we were banned
    // repeatedly" against this slide's "…that asked, and we were proud of how fast we
    // delivered". Both slides are first-person confessions in the past tense, so a
    // conjunction plus a plural pronoun plus a copula is the language's own connective
    // tissue between two sentences of that shape, not a borrowed image. The FOUR-word
    // intersection below is what proves it stops there: "and we were banned" and "and we
    // were proud" are different sentences the moment the fourth word lands.
    const mine = phrases(authoredStrings(), 3);
    expect(mine.size, "positive control: this slide has phrases to share").toBeGreaterThan(50);
    const SHARED_3: Readonly<Record<string, readonly string[]>> = {
      "B.1": [],
      "B.2": [],
      "D.3": ["and we were"],
    };
    for (const [name, corpus] of [
      ["B.1", b1Strings()],
      ["B.2", b2Strings()],
      ["D.3", d3Strings()],
    ] as const) {
      const theirs = phrases(corpus, 3);
      expect(theirs.size, `positive control: ${name} has phrases to share`).toBeGreaterThan(50);
      expect(
        [...mine].filter((p) => theirs.has(p)).sort(),
        `three-word phrases shared with ${name}`,
      ).toEqual([...SHARED_3[name]].sort());
      // AND NOTHING LONGER, with any of the three. Four words is where a shared phrase stops
      // being English and starts being a sentence somebody moved.
      const mine4 = phrases(authoredStrings(), 4);
      expect(
        [...mine4].filter((p) => phrases(corpus, 4).has(p)),
        `four-word phrases shared with ${name}`,
      ).toEqual([]);
    }

    // AND THE CONTROL THAT KEEPS THE RULE HONEST: the intersections are empty because the
    // copy is disjoint, not because `phrases()` never matches anything. One of B.2's own
    // sentences, put through the rule as if this slide had lifted it, is caught — across the
    // punctuation and the capitals, which is what the normalisation is for.
    const lifted = phrases(["Nobody wrote the rule; so EVERYBODY wrote their own!"], 3);
    const b2Phrases = phrases(b2Strings(), 3);
    expect([...lifted].filter((p) => b2Phrases.has(p)).length).toBeGreaterThan(3);
  });

  test("and shares no distinctive vocabulary with either slide in its own run", () => {
    // THE HALF THAT NEEDS NO LIST, pointed at the two slides a leak is most likely between:
    // the ones the room reads immediately before this one. MEASURED, NOT CHOSEN — the
    // intersection is pinned as an EQUALITY, so a padded entry fails as loudly as a borrowed
    // one and a new string reaching for a neighbour's word has to be argued here first.
    const mine = longWords(authoredStrings());
    expect(mine.size, "a rule over an empty vocabulary proves nothing").toBeGreaterThan(60);

    // B.1: "order" (a purchase order against a record kept in order) and "tools" (its
    // headline's noun, and the plainest English word for the thing this slide's first
    // failure bought). Neither carries B.1's argument, which is a statistic about where
    // adoption fails.
    expect([...mine].filter((word) => longWords(b1Strings()).has(word)).sort()).toEqual([
      "order",
      "tools",
    ]);
    // B.2: six ordinary words, not one of which is an image. B.2's picture is a diptych of
    // things handed out against questions never written down; nothing below is any of it.
    expect([...mine].filter((word) => longWords(b2Strings()).has(word)).sort()).toEqual([
      "already",
      "asked",
      "first",
      "nobody",
      "whoever",
      "written",
    ]);
  });
});

// ── AC · every string reaches the stage, and every pose is complete ──────────

describe("the stage prints exactly what the copy block authors", () => {
  test("all sixteen strings are in the DOM at the canonical pose", () => {
    const { container, unmount } = renderSlide(gapThreeFailuresSlide.canonicalPose);

    // THE HEADLINE AND THE FIG LABEL, which are the slide file's rather than the figure's —
    // a census scoped to `three-failures-` testids would miss both.
    expect(container.querySelector("h1")?.textContent).toBe(C.headline);
    expect(figLabelText(container)).toBe(C.figLabel);
    expect(C.figLabel).toBe("THREE THINGS WE GOT WRONG");

    // …then every box that carries type, compared against the string it was given.
    expect(screen.getByTestId("three-failures-ledger-eyebrow").textContent).toBe(C.ledgerEyebrow);
    expect(screen.getByTestId("three-failures-closer").textContent).toBe(C.closer);
    for (const failure of C.failures) {
      expect(
        screen.getByTestId(`three-failures-period-${failure.id}`).textContent,
        failure.id,
      ).toBe(failure.period);
      expect(screen.getByTestId(`three-failures-title-${failure.id}`).textContent, failure.id).toBe(
        failure.title,
      );
      expect(screen.getByTestId(`three-failures-did-${failure.id}`).textContent, failure.id).toBe(
        failure.did,
      );
      expect(screen.getByTestId(`three-failures-cost-${failure.id}`).textContent, failure.id).toBe(
        failure.cost,
      );
    }

    // AND THE CENSUS IS EXACT IN BOTH DIRECTIONS: what the stage prints IS the sixteen
    // strings the keyword rule below partitions, no more and no fewer. A seventeenth string
    // cannot render without landing in `PROSE` or in `LABELS` first.
    expect(stagePrintedStrings(container).sort()).toEqual(printedStrings().sort());
    expect(printedStrings()).toHaveLength(PROSE.length + LABELS.length);
    expect(PROSE).toHaveLength(8);
    expect(LABELS).toHaveLength(8);
    // The boxes, counted: nothing on the stage is missing and nothing is drawn twice.
    const ids = [...container.querySelectorAll<HTMLElement>("[data-testid^='three-failures-']")].map(
      (el) => el.dataset.testid,
    );
    expect(ids.sort()).toEqual([...EVERY_BOX].sort());
    expect(ids).toHaveLength(19);
    unmount();
  });

  test("the spine and the three marks carry no text at any pose", () => {
    // THE FIGURE'S TWO GRAPHIC TIERS ARE GRAPHIC. A mark that gained a label would be a
    // legend, and a spine with type in it is a fifth column nobody asked for.
    const { unmount } = renderSlide();
    for (const pose of POSES) {
      goToPose(pose);
      for (const id of TEXTLESS_IDS) {
        const box = screen.getByTestId(id);
        expect(box.textContent, `${id} at pose ${pose}`).toBe("");
      }
    }
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
          // still pass a class check.
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
    }
    unmount();
  });

  test("no pose rests on a confession whose cost has not landed", () => {
    // THE PROPERTY THE POSE MAP IS CHECKED AGAINST, rather than the pose count. Every
    // entry's five boxes arrive inside ONE pose, in three steps — the shelf, the admission,
    // the consequence — and the consequence is always last. A pose ending on "we were proud
    // of how fast we delivered" would rest on a sentence a room hears as competence.
    const { unmount } = renderSlide();
    for (let i = 0; i < FAILURE_COUNT; i += 1) {
      goToPose(i);
      const { id } = C.failures[i];
      const shelf = arrival(`three-failures-period-${id}`);
      // The date, the mark and the name are ONE beat: a date with no name is a stray label,
      // a name with no date is not a record, and a mark on a hairline with nothing beside it
      // is a smudge.
      expect(arrival(`three-failures-mark-${id}`), id).toBe(shelf);
      expect(arrival(`three-failures-title-${id}`), id).toBe(shelf);
      const did = arrival(`three-failures-did-${id}`);
      const cost = arrival(`three-failures-cost-${id}`);
      expect(shelf, id).toBeLessThan(did);
      expect(did, id).toBeLessThan(cost);
      // NOTHING IN THE POSE OUTLASTS THE COST.
      for (const boxId of REVEALED_AT[i]) {
        expect(arrival(boxId), `${boxId} must not outlast the cost`).toBeLessThanOrEqual(cost);
      }
      // AND THE ENTRY IS WHOLE INSIDE ITS OWN POSE — no half of a confession is ever left on
      // the stage at a pose boundary.
      for (const boxId of entryIds(i)) expect(revealed(boxId), boxId).toBe(true);
    }

    // POSE 0 ALSO OPENS THE RECORD: the heading and the full-height spine arrive with the
    // first entry's shelf, because they are one gesture rather than three beats.
    goToPose(0);
    expect(arrival("three-failures-ledger-eyebrow")).toBe(
      arrival(`three-failures-period-${C.failures[0].id}`),
    );
    expect(arrival("three-failures-spine")).toBe(arrival("three-failures-ledger-eyebrow"));

    // POSE 3 — THE RULE CLOSES THE RECORD, THEN THE LINE THAT OWNS IT. The closer is the
    // last arrival on the stage, which is what makes the canonical pose safe to export.
    goToPose(3);
    expect(arrival("three-failures-rule")).toBeLessThan(arrival("three-failures-closer"));
    expect(revealed("three-failures-closer")).toBe(true);
    unmount();
  });

  test("mounts no <svg> at all — zero SMIL by construction, not by discipline", () => {
    // The figure's own doc comment stakes the claim: the spine and the marks are plain
    // boxes, the copper rule is a `div`, and a SMIL node cannot appear without an author
    // adding a whole element class. This structural fact is what makes the reduce-mode zero
    // a construction rather than a promise.
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
    // preference because NOTHING under this slide reads `matchMedia` at all. The mock proves
    // the markup is preference-independent, which is the half a DOM test owns; the
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
  test("exactly the eight prose strings carry a *Kw sibling, every keyword real", () => {
    // The directory's rule, stated at the top of `../../src/slides/leader-gap/content.ts`
    // and applied here without an exception. PROSE is the headline, the closer and each
    // failure's two lines; everything else is a LABEL. The three TITLES are the sharpest
    // case — they are sentence-shaped and would take emphasis happily — and they are labels,
    // because a copper italic inside a mono label reads as a rendering fault everywhere else
    // in this deck.
    //
    // HELD OVER THE BLOCK'S OWN KEYS IN BOTH LAYERS, so a `periodKw` cannot be added at
    // either level without failing here first.
    expect(Object.keys(C).sort()).toEqual([
      "closer",
      "closerKw",
      "failures",
      "figLabel",
      "headline",
      "headlineKw",
      "ledgerEyebrow",
    ]);
    for (const failure of C.failures) {
      expect(Object.keys(failure).sort(), failure.id).toEqual([
        "cost",
        "costKw",
        "did",
        "didKw",
        "id",
        "period",
        "title",
      ]);
    }
    for (const [name, copy, kws] of PROSE) {
      expect(Array.isArray(kws), name).toBe(true);
      expect(kws.length, `${name} carries no keyword`).toBeGreaterThan(0);
      for (const kw of kws) {
        expect(copy, `${name}Kw: "${kw}" is not in its prose`).toContain(kw);
      }
    }
    // A LABEL AND A PROSE STRING MAY NOT BE THE SAME STRING, which is what makes the
    // partition above a partition rather than two overlapping lists.
    expect(new Set(printedStrings()).size).toBe(printedStrings().length);
  });

  test("every label renders with no emphasis, while the prose boxes do carry theirs", () => {
    const { container, unmount } = renderSlide(3);
    const labelIds = [
      "three-failures-ledger-eyebrow",
      ...C.failures.map((failure) => `three-failures-period-${failure.id}`),
      ...C.failures.map((failure) => `three-failures-title-${failure.id}`),
    ];
    for (const id of labelIds) {
      expect(screen.getByTestId(id).querySelectorAll("em").length, `<em> inside label ${id}`).toBe(
        0,
      );
    }
    // The fig label is a label too, and the only copper text on the stage that is not a mono
    // heading — it takes no emphasis either.
    expect(container.querySelector(".fig-label")?.querySelectorAll("em").length).toBe(0);

    // …while the prose boxes DO carry theirs, one `<em>` per keyword, so the absence above
    // cannot pass because emphasis stopped rendering everywhere.
    const proseBoxes: ReadonlyArray<readonly [string, readonly string[]]> = [
      ...C.failures.flatMap(
        (failure) =>
          [
            [`three-failures-did-${failure.id}`, failure.didKw],
            [`three-failures-cost-${failure.id}`, failure.costKw],
          ] as const,
      ),
      ["three-failures-closer", C.closerKw],
    ];
    for (const [id, kws] of proseBoxes) {
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
    // §3.4 R2 / §3.5. This slide composes as the third of the `gap` run today and every
    // figure behind it steps by one the day another slide lands in front of it, so a literal
    // section reference in this copy would be a lie on a projector within the week.
    //
    // HELD OVER AUTHORED VALUES AND THE RENDERED STAGE, which is the checkable form of the
    // rule: the doc comments in `../../src/slides/leader-gap/` DO name sections, because
    // that is how a spec reference is written, and a rule over comments would forbid the
    // provenance this slide is required to record.
    const FIGURE = /\b[A-N]\.\d+\b/;
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(FIGURE);
      expect(copy, copy).not.toMatch(/\bB\.\d\b/);
      expect(copy, copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      // No count of its own successors either — the run this slide sits in is composed per
      // deck set (§3.4), so a sentence that numbered the slides behind it would go stale the
      // first time one was inserted or cut.
      expect(copy, copy).not.toMatch(/\bnext (two|three|four|five)\b/i);
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
    expect(stage.length).toBeGreaterThan(600);
    expect(stage).not.toMatch(FIGURE);
    expect(stage).not.toMatch(/\bB\.\d\b/);
    unmount();
  });
});

// ── AC · no brand variance ───────────────────────────────────────────────────

describe("no brand variance", () => {
  test("takes no brand block and names no organisation", () => {
    // §4.4's seven brand × deckSet slots do not list this slide, so there is no
    // `…For(brand)` resolver to call and the component takes no props. These failures are
    // Nanovest's own: they are the same three admissions in both leader rooms, because the
    // organisation that made them is the one presenting.
    expect(GapThreeFailures.length).toBe(0);
    for (const copy of authoredStrings()) {
      expect(copy, `an organisation in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(GEMS|GEMVIS|Berau|DigiTech|MineTech|Nanovest|Sinar Mas)\b/i,
      );
    }
  });

  test("the content block is plain data — no resolver hiding in it", () => {
    // A `Record<Brand, …>` reachable from this block would be a brand axis nobody declared.
    // Every value is a string, a readonly array of strings, or a tuple of failure records —
    // and no value is a function.
    const walk = (value: unknown, path: string): void => {
      if (typeof value === "function") throw new Error(`a function at ${path}`);
      if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`));
      else if (value !== null && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
      }
    };
    expect(() => walk(C, "gapThreeFailuresContent")).not.toThrow();
    // POSITIVE CONTROL — the walk is alive and would find a resolver one level down.
    expect(() => walk({ nested: { threeFailuresFor: () => C } }, "control")).toThrow(
      /a function at control\.nested\.threeFailuresFor/,
    );
  });
});

describe("both leader decks print the same stage", () => {
  // BRAND INVARIANCE IS A CLAIM ABOUT MODULE EPOCHS — `VARIANT` resolves once at module
  // scope — so it cannot be checked inside the one epoch every test above runs in. Two
  // epochs, byte for byte, following `gap-no-sop.test.tsx` and `mandate-enablement.test.tsx`,
  // which are the shipped precedents for the leader slides with no brand axis at all.
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
        import("@/slides/leader-gap/gap-three-failures"),
      ]);

    // THE POSITION IS READ OFF THE COMPOSED DECK WHEN THERE IS ONE, and falls back to the
    // harness input otherwise. WHERE this slide composes is `deck-registry.test.ts`'s claim
    // and not this file's (see the header); what is asserted here is that the two leader
    // rooms read the same bytes, which is true of a slide that composes nowhere as well as
    // of one that composes third in its run.
    const row = composedDeck.slides.find((s) => s.def.id === "gap-three-failures");
    const at = row ? { letter: row.letter, num: row.num, sectionKey: row.sectionKey } : AT;

    function AdvanceTo({ step }: { step: number }) {
      const { goTo } = useDeckIn();
      return <button data-testid="goto-epoch" onClick={() => goTo(0, step)} />;
    }

    const { container } = render(
      <DeckProvider stepCounts={[slide.gapThreeFailuresSlide.steps]}>
        <SlideNumberProvider value={at}>
          <AdvanceTo step={slide.gapThreeFailuresSlide.canonicalPose} />
          <slide.GapThreeFailures />
        </SlideNumberProvider>
      </DeckProvider>,
    );
    act(() => screen.getByTestId("goto-epoch").click());
    return { html: container.innerHTML, text: container.textContent ?? "" };
  }

  afterAll(restoreLocation);

  test("byte for byte, at the fullest pose", async () => {
    // SEQUENTIALLY, not `Promise.all`. Each call re-points `window.location`, resets the
    // module registry and renders into the SAME document — run concurrently they interleave,
    // two stages share one DOM, and every query finds two elements.
    const berau = await stageFor(LEADER_VARIANTS[0]);
    const gems = await stageFor(LEADER_VARIANTS[1]);
    // MARKUP AND TEXT BOTH: a brand axis could move a colour token or a delay without
    // changing a word, and `textContent` alone would not see it.
    expect(berau.html).toBe(gems.html);
    expect(berau.text).toBe(gems.text);
    // Not vacuously: a stage that rendered nothing would also be equal.
    expect(berau.text).toContain(C.headline);
    expect(berau.text).toContain(C.failures[0].did);
    expect(berau.text).toContain(C.failures[FAILURE_COUNT - 1].cost);
    expect(berau.text).toContain(C.closer);
  });
});

// ── AC · the geometry ────────────────────────────────────────────────────────

describe("the stage's own arithmetic", () => {
  test("nothing crosses the NavBar's hover band, and the clearance is derived", () => {
    // THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM. Held over every box the
    // figure actually paints — read off the DOM, so a box placed with a literal instead of a
    // geometry export is inside the rule too.
    const { container, unmount } = renderSlide(3);
    const boxes = [...container.querySelectorAll<HTMLElement>("[data-testid^='three-failures-']")];
    expect(boxes.length).toBe(19);
    for (const box of boxes) {
      const top = parseFloat(box.style.top);
      // The rule's testid sits on a wrapper with no height of its own — its one painted
      // child is `.copper-rule`, whose 1px is restated by the geometry module because jsdom
      // computes no stylesheet.
      const height = Number.isFinite(parseFloat(box.style.height))
        ? parseFloat(box.style.height)
        : RULE_HEIGHT;
      expect(Number.isFinite(top), `${box.dataset.testid} has no top`).toBe(true);
      expect(top + height, `${box.dataset.testid} crosses the NavBar band`).toBeLessThanOrEqual(
        NAV_ZONE_TOP,
      );
    }
    unmount();

    // AND THE CLEARANCE IS DERIVED FROM BOTH ENDS, so an edit anywhere above moves it and
    // this fails before the stage crosses the band.
    expect(NAV_ZONE_CLEARANCE).toBe(NAV_ZONE_TOP - (CLOSER_TOP + CLOSER_HEIGHT));
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);
    expect(NAV_ZONE_CLEARANCE).toBe(17);
  });

  test("the ledger stacks without overlap, and the rule and closer sit under it", () => {
    for (let i = 0; i < FAILURE_COUNT; i += 1) {
      expect(didTop(i), `entry ${i}`).toBe(entryTop(i) + MONO_ROW_HEIGHT + 8);
      expect(costTop(i), `entry ${i}`).toBe(didTop(i) + DID_HEIGHT + 6);
      if (i > 0) {
        expect(entryTop(i), `entry ${i} overlaps the one above it`).toBeGreaterThan(
          costTop(i - 1) + COST_HEIGHT,
        );
      }
    }
    const ledgerBottom = costTop(FAILURE_COUNT - 1) + COST_HEIGHT;
    expect(RULE_TOP).toBeGreaterThan(ledgerBottom);
    expect(CLOSER_TOP).toBeGreaterThan(RULE_TOP + RULE_HEIGHT);
  });

  test("the spine spans exactly the entries it claims to, and the marks sit on it", () => {
    // A SPINE THAT STOPPED SHORT OF THE LAST ENTRY WOULD BE A DIFFERENT ARGUMENT — the
    // record would look partially kept. It runs from the first entry's shelf to the last
    // entry's bottom edge, and it is drawn at full height from pose 0 because it is the
    // ledger's margin rather than evidence.
    expect(SPINE_TOP).toBe(entryTop(0));
    expect(SPINE_TOP + SPINE_HEIGHT).toBe(costTop(FAILURE_COUNT - 1) + COST_HEIGHT);
    expect(SPINE_WIDTH).toBe(1);

    // EVERY MARK IS CENTRED ON THE SPINE AND ON ITS OWN TITLE ROW, derived rather than
    // typed, so it cannot drift off either.
    expect(MARK_LEFT + MARK_WIDTH / 2).toBe(SPINE_LEFT + SPINE_WIDTH / 2);
    expect(Number.isInteger(MARK_LEFT), "a half-pixel mark on a hairline is a smudge").toBe(true);
    for (let i = 0; i < FAILURE_COUNT; i += 1) {
      expect(markTop(i) + MARK_HEIGHT / 2, `mark ${i}`).toBe(entryTop(i) + MONO_ROW_HEIGHT / 2);
      expect(Number.isInteger(markTop(i)), `mark ${i} lands off the pixel grid`).toBe(true);
      expect(markTop(i), `mark ${i} is not on the spine`).toBeGreaterThanOrEqual(SPINE_TOP);
      expect(markTop(i) + MARK_HEIGHT).toBeLessThanOrEqual(SPINE_TOP + SPINE_HEIGHT);
    }
    // The period rail ends left of the spine, and every entry's text starts right of it.
    expect(RAIL_LEFT + RAIL_WIDTH).toBeLessThan(SPINE_LEFT);
    expect(ENTRY_LEFT).toBeGreaterThan(SPINE_LEFT + SPINE_WIDTH);
    expect(ENTRY_LEFT + ENTRY_WIDTH).toBe(1280 - RAIL_LEFT);
  });

  test("the placement guards refuse a fourth entry and every non-index", () => {
    // THE GUARD IS SHARED BY ALL FOUR PLACEMENT FUNCTIONS, so an index one of them accepts
    // is always an index the others place. Its message names what a fourth entry would MOVE,
    // because that is the failure a caller cannot see.
    const placers = [
      ["entryTop", entryTop],
      ["markTop", markTop],
      ["didTop", didTop],
      ["costTop", costTop],
    ] as const;
    for (const [name, fn] of placers) {
      expect(() => fn(FAILURE_COUNT), name).toThrow(/no failure 3/);
      expect(() => fn(FAILURE_COUNT), name).toThrow(new RegExp(name));
      expect(() => fn(FAILURE_COUNT), name).toThrow(/NavBar band/);
      expect(() => fn(-1), name).toThrow(/no failure -1/);
      expect(() => fn(1.5), name).toThrow(/no failure 1\.5/);
      expect(() => fn(Number.NaN), name).toThrow(/no failure NaN/);
      // …and every real index is placed by all four.
      for (let i = 0; i < FAILURE_COUNT; i += 1) {
        expect(Number.isFinite(fn(i)), `${name}(${i})`).toBe(true);
      }
    }
  });

  test("the rendered boxes sit where the geometry module puts them", () => {
    // THE WELD BETWEEN THE FIGURE AND ITS ARITHMETIC. A box placed with a literal would pass
    // every rule above and land in the wrong place on a projector.
    const { unmount } = renderSlide(3);
    C.failures.forEach((failure, i) => {
      const box = (kind: string) => screen.getByTestId(`three-failures-${kind}-${failure.id}`);
      expect(parseFloat(box("period").style.top), failure.id).toBe(entryTop(i));
      expect(parseFloat(box("period").style.left), failure.id).toBe(RAIL_LEFT);
      expect(parseFloat(box("period").style.width), failure.id).toBe(RAIL_WIDTH);
      expect(box("period").style.textAlign, failure.id).toBe("right");
      expect(parseFloat(box("mark").style.top), failure.id).toBe(markTop(i));
      expect(parseFloat(box("mark").style.left), failure.id).toBe(MARK_LEFT);
      expect(parseFloat(box("title").style.top), failure.id).toBe(entryTop(i));
      expect(parseFloat(box("title").style.left), failure.id).toBe(ENTRY_LEFT);
      expect(parseFloat(box("did").style.top), failure.id).toBe(didTop(i));
      expect(parseFloat(box("did").style.height), failure.id).toBe(DID_HEIGHT);
      expect(parseFloat(box("cost").style.top), failure.id).toBe(costTop(i));
      expect(parseFloat(box("cost").style.height), failure.id).toBe(COST_HEIGHT);
      expect(parseFloat(box("cost").style.width), failure.id).toBe(ENTRY_WIDTH);
    });
    const spine = screen.getByTestId("three-failures-spine");
    expect(parseFloat(spine.style.top)).toBe(SPINE_TOP);
    expect(parseFloat(spine.style.left)).toBe(SPINE_LEFT);
    expect(parseFloat(spine.style.height)).toBe(SPINE_HEIGHT);
    expect(parseFloat(spine.style.width)).toBe(SPINE_WIDTH);
    expect(parseFloat(screen.getByTestId("three-failures-rule").style.top)).toBe(RULE_TOP);
    expect(parseFloat(screen.getByTestId("three-failures-closer").style.top)).toBe(CLOSER_TOP);
    unmount();
  });

  test("no hex literal and no rgba() anywhere the figure paints", () => {
    // CSS VARS ONLY. Held over the rendered inline styles rather than over the source, so a
    // colour arriving from a helper is inside the rule too.
    const { container, unmount } = renderSlide(3);
    const styles = [...container.querySelectorAll<HTMLElement>("[data-testid^='three-failures-']")]
      .map((el) => el.getAttribute("style") ?? "")
      .join(" ");
    expect(styles.length, "a rule over empty styles proves nothing").toBeGreaterThan(400);
    expect(styles).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(styles).not.toMatch(/rgba?\(/i);
    expect(styles).toMatch(/var\(--copper-700\)/);
    expect(styles).toMatch(/var\(--copper-500\)/);
    unmount();
  });
});
