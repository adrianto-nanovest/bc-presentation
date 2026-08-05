// THE DEADLOCK, AND WHO CAN SKIP IT · slide tests. Four beats, four poses, one mount.
//
// WHAT THIS FILE CAN AND CANNOT PROVE, stated first because half of #57's AC is a
// claim about a rendered page and jsdom renders no page. jsdom has no layout engine:
// it computes no text width, no line count, no colour and no transition. So nothing
// below measures a pixel a browser would place, and no assertion here reads a
// luminance. Every geometric claim is either (a) the ONE NUMBER both the renderer and
// the test read — `../../src/slides/leader-invest/chicken-egg-geometry.ts` — or (b) an
// ORDER over those numbers, which is falsifiable because a box may not overlap its
// neighbour or cross the NavBar's band. The other half — that the workaround sets on
// one line, that beat 3 is measurably the brightest run under the headline row, that a
// squashed transition rests on its FINISHED frame under `reduce` — belongs to this
// ticket's TASK 5, which measures the composed slide in Chromium at 1280×720 through
// `scripts/gh57-verify.mjs` (not on disk when this file was written, so it is named here
// as the owner of those claims and not as a run this file can point at). Neither half
// alone is the AC; both are owed.
//
// WHAT jsdom IS GOOD FOR IS THE FOUR THINGS THIS SLIDE IS ACTUALLY AT RISK OF:
//
//   1. A POSE THAT ENDS ON BEAT 2. The sharpest constraint in the ticket: without
//      beat 3 the left column is advice to breach somebody's terms of service. It is
//      not a copy failure — the copy reads correctly on paper — it is a REVEAL failure,
//      created at a pose boundary or by a stagger delay, and both of those are plain
//      DOM facts. Held below as an order over every pose and as a structural property
//      of the component, not as a comment.
//   2. A CLAIM THIS SLIDE MAY NOT MAKE. §6.7 keeps the vendor-leniency comparison
//      ("ChatGPT seems not strict") OFF the stage and in the presenter's mouth. Held
//      as a RULE over every rendered string and every string the copy block authors —
//      the way `./invest-own-proof.test.tsx` holds `NOT_AUDITED` — with the positive
//      control that keeps it from passing on an empty stage.
//   3. A SECOND PASS AT SHADOW AI THAT REPEATS THE FIRST (§6.2). Both other passes are
//      UNBUILT, so what is checkable here is a token guard, and its limits are stated
//      where it lives rather than glossed.
//   4. A COST OR A TERM THAT MOVED. Eight short labels quoted from §6.7 and from the
//      issue's AC. "no audit trail" losing its row, or the four costs re-sorted into an
//      order that stops escalating, is a review-proof edit and a string comparison here.
//
// ONE MOUNT, WALKED. Every claim about the poses is made inside ONE mounted tree —
// forward and back — because a beat that survives only a fresh mount, or a pose that
// clears something it should have kept, is exactly what a presenter stepping backwards
// finds and what a per-pose re-render never sees.
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  InvestChickenEgg,
  investChickenEggSlide,
} from "@/slides/leader-invest/invest-chicken-egg";
import { ChickenEggBeats } from "@/slides/leader-invest/components/ChickenEggBeats";
// D.3's own block, plus everything else the SECTION's copy module authors — AC 5's rule
// about leniency claims is scoped to "the rendered slide or its copy module", and the
// module is this whole file. See `moduleAuthoredStrings()`.
import {
  EPISTEMIC_MARKS,
  NOT_AUDITED,
  investChickenEggContent,
  investOwnProofContent,
  ownProofFor,
} from "@/slides/leader-invest/content";
import { BRANDS, type Brand } from "@/deck-variants";
import {
  CARD_EYEBROW_TOP,
  CARD_HEIGHT,
  CARD_MEASURE,
  CARD_PAD,
  CARD_TOP,
  CLAUSE_HEIGHT,
  COLUMN_GAP,
  COLUMN_TOP,
  CONSTRAINT_COUNT,
  CONSTRAINT_ROWS_TOP,
  CONSTRAINT_ROW_CAPACITY,
  CONTENT_WIDTH,
  COST_COUNT,
  COST_ROWS_BOTTOM,
  COST_ROWS_TOP,
  COST_ROW_CAPACITY,
  COSTS_EYEBROW_TOP,
  DEADLOCK_CLAUSE_COUNT,
  EYEBROW_HEIGHT,
  LIST_ROW_HEIGHT,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  OFFER_COL_LEFT,
  OFFER_COL_W,
  RULE_HEIGHT,
  RULE_TOP,
  SIDE_MARGIN,
  STAGE,
  STORY_COL_LEFT,
  STORY_COL_W,
  TURN_HEIGHT,
  TURN_TO_CARD,
  VERDICT_HEIGHT,
  VERDICT_TOP,
  WORKAROUND_HEIGHT,
  WORKAROUND_TOP,
  clauseTop,
  constraintRowTop,
  costRowTop,
} from "@/slides/leader-invest/chicken-egg-geometry";

const C = investChickenEggContent;
const POSES = [0, 1, 2, 3] as const;

/**
 * The position this slide holds in the deck it actually composes into.
 *
 * `at` IS required here, and it is the one case `SlideHarness` documents: unit tests
 * resolve the default `general` deck, `general` registers no leader variant, and this
 * slide reaches the two LEADER deck sets alone. So there is no derived position to look
 * up — and the harness itself refuses `at` for any slide the default deck does hold, so
 * this cannot rot into a hardcoded number for a slide that has a derived one.
 *
 * **D.2, and not §6.7's D.3** — measured rather than assumed. Composing both leader
 * decks in their own module epoch on 2026-08-05 derives `invest-own-proof` at D.1 and
 * this slide at D.2, 61 slides to a deck, closer M.3. §6.7 numbers it D.3 because §6.7
 * describes the FINISHED section and `invest-base-rates` (§6.7's D.1) is unbuilt —
 * §11's phase table puts that one in Phase 7. Neither the letter nor the number is
 * authored in the slide (§3.5), so this is a harness INPUT and not a claim the slide
 * makes; the day D.1 lands, both leader slides move one number and no file here opens.
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

function renderSlide(pose = 0) {
  const out = render(
    <SlideHarness def={investChickenEggSlide} at={AT}>
      <Nav />
      <InvestChickenEgg />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

// ── the boxes, by beat ───────────────────────────────────────────────────────
//
// §6.7'S FOUR BEATS, AS THE TESTIDS THAT CARRY THEM. This table is the spine of the
// order assertions below, and it is written per BEAT rather than per pose on purpose:
// the poses are 4 and the beats are 4 and they do NOT line up one to one — beats 2 and
// 3 share pose 1 and beat 4 takes two poses, which is the whole subject of AC 3.
//
// Derived from the content tuples wherever the renderer keys on a content `id`
// (`chicken-egg-cost-no-audit-trail`, `chicken-egg-term-seats`), so a reorder of the
// copy moves these hooks with it instead of leaving a test measuring a row that is no
// longer the one it names.

const CLAUSE_IDS = C.deadlockClauses.map((_, i) => `chicken-egg-clause-${i}`);
const COST_IDS = C.costs.map((cost) => `chicken-egg-cost-${cost.id}`);
const TERM_IDS = C.pilotConstraints.map((term) => `chicken-egg-term-${term.id}`);

/** Beat 1 — the deadlock. Two mono clauses, each the other with its nouns swapped. */
const BEAT_1 = CLAUSE_IDS;
/** Beat 2 — what we actually did, and the bill for it. */
const BEAT_2 = ["chicken-egg-workaround", "chicken-egg-costs-eyebrow", ...COST_IDS];
/** Beat 3 — the copper rule that closes the bill, and the verdict that licenses it. */
const BEAT_3 = ["chicken-egg-rule", "chicken-egg-verdict"];
/** Beat 4 — the turn, then the card, its label and its four terms. */
const BEAT_4 = [
  "chicken-egg-turn",
  "chicken-egg-card",
  "chicken-egg-pilot-eyebrow",
  ...TERM_IDS,
];

/** The four beats in §6.7's order — the order every assertion below is written over. */
const BEATS = [BEAT_1, BEAT_2, BEAT_3, BEAT_4] as const;
const EVERY_BOX = BEATS.flat();

/** The boxes that carry TYPE. The card is a hairline border and nothing else, so a
 *  rule over "every string on the stage" must not ask it for one. */
const TEXT_BOXES = EVERY_BOX.filter((id) => id !== "chicken-egg-card" && id !== "chicken-egg-rule");

/**
 * The element whose class and delay carry a box's reveal.
 *
 * TWO SHAPES, ONE READER. Every box but one IS a `Reveal` — `.fade`, plus `.on` once it
 * has arrived. Beat 3's rule is a `CopperRule` inside a plain positioned wrapper, because
 * `CopperRule` spreads no `data-*` props and widening a shared primitive — 30 modules
 * outside section E import that file, counted on 2026-08-05 — was out of this ticket's
 * blast radius (`ChickenEggBeats.tsx` records the decision). So the testid is on the
 * wrapper and the reveal is on the child, and a test that read the wrapper's own
 * classList would report beat 3 as never arriving at all.
 */
function fade(id: string): HTMLElement {
  const el = screen.getByTestId(id);
  if (el.classList.contains("fade")) return el;
  const inner = el.querySelector<HTMLElement>(".copper-rule");
  if (!inner) {
    throw new Error(
      `"${id}" is neither a .fade box nor a wrapper around a .copper-rule, so nothing ` +
        `in it carries a reveal — the renderer's hook or its primitive changed.`,
    );
  }
  return inner;
}

const revealed = (id: string) => fade(id).classList.contains("on");

/**
 * How many milliseconds into its pose a box arrives.
 *
 * `Reveal` and `CopperRule` both write the stagger into `transitionDelay` and drop it to
 * `0ms` while `on` is false, so an unrevealed box has no arrival to report and asking
 * for one is a bug in the test rather than a value worth comparing. Hence the throw.
 */
function arrival(id: string): number {
  const el = fade(id);
  if (!el.classList.contains("on")) {
    throw new Error(`"${id}" is not revealed at this pose, so it has no arrival`);
  }
  const ms = parseFloat(el.style.transitionDelay);
  if (!Number.isFinite(ms)) {
    throw new Error(`"${id}" carries no readable transitionDelay ("${el.style.transitionDelay}")`);
  }
  return ms;
}

/** A box's declared shelf and its box height, read off the DOM rather than off the
 *  module the renderer read. `height` is absent on beat 3's wrapper — `.copper-rule`
 *  takes its 1px from `globals.css`, which jsdom does not compute — so that one falls
 *  back to the geometry module's own `RULE_HEIGHT`, and the comment says so rather than
 *  letting a `NaN` pass as a number. */
function geometryOf(id: string) {
  const el = screen.getByTestId(id);
  const px = (value: string) => parseFloat(value);
  return {
    left: px(el.style.left),
    top: px(el.style.top),
    width: px(el.style.width),
    height: id === "chicken-egg-rule" ? RULE_HEIGHT : px(el.style.height),
  };
}

/**
 * (first pose, delay) for every box, walked ascending inside ONE mount.
 *
 * THE PAIR IS THE ARRIVAL ORDER, and both halves are needed: a pose is a resting state,
 * so a later pose always arrives later than an earlier one no matter what its delay
 * says, and within one pose the delay is the only thing that orders two boxes. Compared
 * lexicographically below, which is what makes "§6.7's order" one assertion instead of
 * seventeen independent presences.
 */
function arrivalRanks(): Map<string, [number, number]> {
  const ranks = new Map<string, [number, number]>();
  for (const pose of POSES) {
    goToPose(pose);
    for (const id of EVERY_BOX) {
      if (!ranks.has(id) && revealed(id)) ranks.set(id, [pose, arrival(id)]);
    }
  }
  return ranks;
}

const rankOf = (ranks: Map<string, [number, number]>, id: string): [number, number] => {
  const rank = ranks.get(id);
  if (!rank) throw new Error(`"${id}" never arrives at any pose the deck can reach`);
  return rank;
};

/** Strictly-increasing lexicographic order on (pose, delay). */
const before = (a: [number, number], b: [number, number]) =>
  a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);

// ── the copy, as one set of strings ──────────────────────────────────────────

/**
 * Every string reachable from `value` — through arrays, through tuples, through records.
 *
 * THE ONE WAY EITHER COPY SET IS BUILT, and the reason is that a hand-written list is a
 * list somebody has to remember to extend. A walk cannot forget: a field added to
 * `investChickenEggContent` next month, a fifth cost, a reworded term, a `*Kw` array that
 * gained an entry — all of them are inside every absence rule below the DAY THEY EXIST
 * rather than the day someone opens this file. `authoredStrings()` hand-listed eleven
 * fields until 2026-08-05, and a twelfth would have been covered by nothing.
 *
 * IT COLLECTS `id` FIELDS TOO, deliberately: those reach the DOM as `data-testid`, and a
 * vendor name or a leniency word written into a hook is the same defect written somewhere
 * less visible. Functions and non-strings are skipped, so `ownProofFor` is walked through
 * its RESULT (below) and not through its source.
 */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/**
 * Every string D.3's own copy block authors — the input to the rules scoped to THIS slide.
 *
 * D.3'S BLOCK, AND THE SCOPE IS NOW ARGUED ONE RULE AT A TIME rather than for both at
 * once. `content.ts` is the SECTION's module and also holds `invest-own-proof`'s copy,
 * whose GEMS attribution names Google Cloud as the publisher of a figure — legitimately,
 * and on a different slide. That citation forces the VENDOR-NAME rule to be scoped
 * (see {@link moduleAuthoredStrings} for the measured proof that it is the only thing that
 * does), and nothing forces the LENIENCY rule to be, so that one is held module-wide,
 * which is AC 5's literal scope: "the rendered slide or its copy module".
 */
function authoredStrings(): string[] {
  return walkStrings(C);
}

/**
 * Every string the SECTION's copy module authors — both slides' blocks, all three brand
 * blocks the sibling resolves, and the shared fragments.
 *
 * AC 5 SAYS "OR ITS COPY MODULE" AND THIS IS THAT SET. The leniency half of the rule runs
 * over it: no leniency or enforcement-weakness word occurs anywhere in this module today,
 * so the AC's own scope is available at zero cost, and a claim written into a sibling's
 * string — or into a brand block only one variant resolves — is caught the same day.
 *
 * `ownProofFor` IS CALLED PER REGISTERED BRAND, not read off its table: that table is
 * deliberately not exported (`content.ts` says why), and walking the keys of `BRANDS`
 * is what makes this "every brand that can reach a deck" instead of "every key this
 * module happens to have".
 */
function moduleAuthoredStrings(): string[] {
  return [
    ...walkStrings(NOT_AUDITED),
    ...walkStrings(EPISTEMIC_MARKS),
    ...walkStrings(investOwnProofContent),
    ...(Object.keys(BRANDS) as Brand[]).flatMap((brand) => walkStrings(ownProofFor(brand))),
    ...authoredStrings(),
  ];
}

/** The four prose lines, each with the `*Kw` sibling the copy module pairs it with.
 *  Everything else in `authoredStrings()` is a LABEL and may not gain one. */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ["workaround", C.workaround, C.workaroundKw],
  ["verdict", C.verdict, C.verdictKw],
  ["turn", C.turn, C.turnKw],
];

/** Everything the stage renders, minus the one element that legitimately prints a
 *  figure reference. Stripped from a CLONE: React owns those nodes and removing one
 *  behind its back throws on the next commit. */
function stageTextWithoutFigLabel(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

// ── the def (AC 9) ───────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, four poses, closing on the fullest one", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins the
    // value, which is also the string `deck-sets.ts` composes by).
    expect(investChickenEggSlide.id).toBe("invest-chicken-egg");

    // FOUR POSES FOR FOUR BEATS — and not one beat per pose, which is the point of
    // AC 3. A fifth pose would have to be a fifth beat and §6.7 gives this slide four.
    expect(investChickenEggSlide.steps).toBe(4);

    // `canonicalPose: 3`. The exports print this pose and nothing else, and an exported
    // PDF has no presenter attached to it: pose 1 would export a page whose last word
    // is the ban, and pose 2 an offer with no terms on it. So the canonical pose is the
    // last one, and the assertion is written both ways — the literal, so a silent
    // renumber fails, and the relation, so a fifth pose cannot leave it behind.
    expect(investChickenEggSlide.canonicalPose).toBe(3);
    expect(investChickenEggSlide.canonicalPose).toBe(investChickenEggSlide.steps - 1);

    expect(investChickenEggSlide.sectionKey).toBe("invest");
    expect(investChickenEggSlide.animationMode).toBe("step-reveal");
    expect(investChickenEggSlide.surface).toBe("dark");
  });
});

// ── AC 2 · the four beats, in §6.7's order ───────────────────────────────────

describe("all four beats render, in §6.7's order", () => {
  test("every beat's boxes are on the stage from the first frame", () => {
    // MOUNTED AT POSE 0, REVEALED LATER. Every box holds its place from the first frame
    // so nothing reflows when it arrives — which is also what makes the reveal order
    // below readable as an order rather than as a mount sequence.
    const { unmount } = renderSlide(0);
    for (const id of EVERY_BOX) {
      expect(screen.getByTestId(id), id).toBeInTheDocument();
    }
    // The census, so a beat cannot go missing by losing its whole list: 2 clauses,
    // 4 costs, 4 terms.
    expect(screen.getAllByTestId(/^chicken-egg-clause-/)).toHaveLength(DEADLOCK_CLAUSE_COUNT);
    expect(screen.getAllByTestId(/^chicken-egg-cost-/)).toHaveLength(COST_COUNT);
    expect(screen.getAllByTestId(/^chicken-egg-term-/)).toHaveLength(CONSTRAINT_COUNT);
    unmount();
  });

  test("the REVEAL order is beat 1 → 2 → 3 → 4, as one strictly increasing order", () => {
    // ASSERTED AS AN ORDER AND NOT AS FOUR PRESENCES, which is what AC 2 asks for. The
    // rank is (first pose, delay within that pose) — see `arrivalRanks` — so this one
    // walk holds every ordering claim the slide makes at once: the clauses open, the
    // confession lands before its label and its label before its bill, the rule closes
    // the bill, THE VERDICT IS LAST IN ITS POSE, and beat 4 arrives after all of it.
    const { unmount } = renderSlide(0);
    const ranks = arrivalRanks();

    const sequence = EVERY_BOX.map((id) => [id, rankOf(ranks, id)] as const);
    for (let i = 1; i < sequence.length; i++) {
      const [prevId, prev] = sequence[i - 1];
      const [id, rank] = sequence[i];
      expect(
        before(prev, rank),
        `${prevId} (pose ${prev[0]}, ${prev[1]}ms) must arrive before ${id} (pose ${rank[0]}, ${rank[1]}ms)`,
      ).toBe(true);
    }

    // AND THE POSES THEMSELVES, pinned — the split AC 3 is written about. Beat 1 opens
    // at pose 0; beats 2 AND 3 both land at pose 1; beat 4 takes poses 2 and 3.
    expect(BEAT_1.map((id) => rankOf(ranks, id)[0])).toEqual([0, 0]);
    expect(BEAT_2.map((id) => rankOf(ranks, id)[0])).toEqual(BEAT_2.map(() => 1));
    expect(BEAT_3.map((id) => rankOf(ranks, id)[0])).toEqual([1, 1]);
    expect(rankOf(ranks, "chicken-egg-turn")[0]).toBe(2);
    expect(BEAT_4.slice(1).map((id) => rankOf(ranks, id)[0])).toEqual(BEAT_4.slice(1).map(() => 3));
    unmount();
  });

  test("the READING order is the story column top to bottom, then the offer column", () => {
    // TWO COLUMNS, SO READING ORDER IS COLUMN-THEN-Y AND NOT Y ALONE. Beat 4's turn
    // sits on y=156, the SAME shelf as beat 1's first clause — `COLUMN_TOP`, which the
    // geometry module gives both columns on purpose, because a stage where the deadlock
    // started 20px above the offer would rank them. So the claim is: beats 1–3 are the
    // left column, strictly descending and never overlapping; beat 4 is the right
    // column, entirely clear of the left one, and descending inside itself.
    const { unmount } = renderSlide(3);

    const storyBoxes = [...BEAT_1, ...BEAT_2, ...BEAT_3];
    let storyRight = 0;
    let previous: { id: string; bottom: number } | null = null;
    for (const id of storyBoxes) {
      const geo = geometryOf(id);
      expect(geo.left, `${id} is in the story column`).toBe(STORY_COL_LEFT);
      expect(geo.width, `${id} takes the story column's measure`).toBe(STORY_COL_W);
      if (previous) {
        expect(
          geo.top,
          `${id} (top ${geo.top}) must sit clear of ${previous.id} (bottom ${previous.bottom})`,
        ).toBeGreaterThan(previous.bottom);
      }
      previous = { id, bottom: geo.top + geo.height };
      storyRight = Math.max(storyRight, geo.left + geo.width);
    }

    // BEAT 4 IS THE OTHER COLUMN, and the gutter between them is real. Asserted off the
    // RENDERED edges: over the constants alone this is an identity — `STORY_COL_W` is
    // defined as the remainder of `CONTENT_WIDTH` — and the last commit deleted two
    // checks of exactly that shape. What can fail is a box that took the wrong measure.
    expect(storyRight, "the story column stops one gutter short of the offer").toBe(
      OFFER_COL_LEFT - COLUMN_GAP,
    );
    for (const id of BEAT_4) {
      expect(geometryOf(id).left, `${id} is in the offer column`).toBeGreaterThanOrEqual(
        OFFER_COL_LEFT,
      );
    }

    // The turn, then the card; and inside the card, its label above its four terms.
    const turn = geometryOf("chicken-egg-turn");
    const card = geometryOf("chicken-egg-card");
    expect(turn.top).toBe(COLUMN_TOP);
    expect(card.top, "the card hangs below the turn").toBeGreaterThan(turn.top + turn.height);
    let inCard: { id: string; bottom: number } | null = null;
    for (const id of ["chicken-egg-pilot-eyebrow", ...TERM_IDS]) {
      const geo = geometryOf(id);
      // INSIDE the card's padding box, not merely below it: these boxes are the card's
      // SIBLINGS (every box on this slide is placed against the stage), so nothing but
      // the arithmetic keeps them in it.
      expect(geo.top, `${id} clears the card's top padding`).toBeGreaterThanOrEqual(
        card.top + CARD_PAD,
      );
      expect(geo.top + geo.height, `${id} clears the card's bottom padding`).toBeLessThanOrEqual(
        card.top + card.height - CARD_PAD,
      );
      if (inCard) {
        expect(geo.top, `${id} sits clear of ${inCard.id}`).toBeGreaterThan(inCard.bottom);
      }
      inCard = { id, bottom: geo.top + geo.height };
    }
    unmount();
  });

  test("each of the four prose lines carries a keyword, and every keyword lands", () => {
    // A KEYWORD THAT DOES NOT OCCUR IS A HIGHLIGHT THAT SILENTLY DOES NOTHING — the
    // copy still reads, so nothing on the stage says the emphasis was lost. The copy
    // module's own register rule is `kw` on PROSE ONLY: four prose lines with `*Kw`
    // siblings, and every label — both clauses, both eyebrows, the eight list rows —
    // keyword-free, because a copper italic inside a quoted rule or a name emphasises a
    // fragment of it.
    for (const [where, copy, kw] of PROSE) {
      expect(kw.length, where).toBeGreaterThan(0);
      for (const word of kw) expect(copy, `${where}: "${word}"`).toContain(word);
    }

    const { unmount } = renderSlide(3);
    // The rendered half: an `<em>` is what a highlight IS on the stage. `highlight()` wraps
    // every keyword in `KeywordHighlight`, which renders
    // `<em className="text-copper-400 italic …">` — so the TAG is the thing to count here,
    // and the `text-copper-400` on it is the copper tier `ChickenEggBeats.tsx`'s TIER table
    // names. (Not `globals.css`'s `em.kw` rule: that one resolves `--copper-300` and no
    // module under `src/` emits `class="kw"`, so it paints nothing on any stage.) Read off
    // the heading element rather than off `document`, so a stray mount could not lend
    // this assertion an `<em>` it did not render.
    const heading = screen.getByRole("heading");
    expect(heading.textContent).toBe(C.headline);
    expect(heading.querySelectorAll("em")).toHaveLength(C.headlineKw.length);
    for (const [id, kw] of [
      ["chicken-egg-workaround", C.workaroundKw],
      ["chicken-egg-verdict", C.verdictKw],
      ["chicken-egg-turn", C.turnKw],
    ] as const) {
      expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(kw.length);
    }
    // And no LABEL is rendered through the highlighter.
    for (const id of [
      ...CLAUSE_IDS,
      "chicken-egg-costs-eyebrow",
      "chicken-egg-pilot-eyebrow",
      ...COST_IDS,
      ...TERM_IDS,
    ]) {
      expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(0);
    }
    unmount();
  });
});

// ── AC 2 · beat 2's four costs ───────────────────────────────────────────────

describe("beat 2 names all four costs, verbatim and in §6.7's order", () => {
  test("the four labels are §6.7's own words, in §6.7's order", () => {
    // PINNED AS LITERALS. These are quoted from §6.7 ("work lost mid-stream, no audit
    // trail, data outside the boundary, usage invisible to the people who later have to
    // approve it"), so recomputing the expectation from the content module would assert
    // only that the module equals itself.
    expect(C.costs.map((cost) => cost.label)).toEqual([
      "Work lost mid-stream",
      "No audit trail",
      "Data outside the boundary",
      "Usage invisible to the people who later have to approve it",
    ]);

    // AND VERBATIM AGAINST §6.7 ITSELF, case aside — the initial capital is the copy
    // module's (a label that starts lower case reads as a sentence that lost its first
    // half), and every other byte is the spec's. Transcribed from §6.7's D.3 sentence,
    // which is the artefact the AC quotes.
    expect(C.costs.map((cost) => cost.label.toLowerCase())).toEqual([
      "work lost mid-stream",
      "no audit trail",
      "data outside the boundary",
      "usage invisible to the people who later have to approve it",
    ]);

    // THE ORDER IS AN ESCALATION OF WHOSE PROBLEM EACH COST IS — the person doing the
    // work → the company's records → the company's risk → the desk this slide is
    // addressed to. Sorted any other way the bill stops landing on the room, so the ids
    // are pinned too: they are what the renderer keys and what a test names.
    expect(C.costs.map((cost) => cost.id)).toEqual([
      "work-lost",
      "no-audit-trail",
      "data-outside-boundary",
      "usage-invisible",
    ]);
  });

  test("all four reach the stage, under their own eyebrow, in that order", () => {
    const { unmount } = renderSlide(1);

    expect(screen.getByTestId("chicken-egg-costs-eyebrow").textContent).toBe("WHAT IT COST");
    // PAST TENSE, AND IT IS DOING WORK: "WHAT IT COST" says the bill is closed and was
    // paid by us; "WHAT IT COSTS" would aim the same four rows at the room, which is
    // D.4 beat 2's job and not this slide's (§6.2 — see the disjointness block below).
    expect(C.costsEyebrow).not.toMatch(/COSTS/);

    C.costs.forEach((cost, i) => {
      const row = screen.getByTestId(`chicken-egg-cost-${cost.id}`);
      expect(row.textContent, cost.id).toBe(cost.label);
      expect(revealed(`chicken-egg-cost-${cost.id}`), cost.id).toBe(true);
      // The bill reads down the column in the same order it arrives in.
      expect(geometryOf(`chicken-egg-cost-${cost.id}`).top, cost.id).toBe(costRowTop(i));
    });

    // The eyebrow labels the list it belongs to: above the first row, and below the
    // confession the bill is the price of.
    expect(COSTS_EYEBROW_TOP).toBeLessThan(costRowTop(0));
    expect(screen.getByTestId("chicken-egg-workaround").textContent).toBe(C.workaround);
    unmount();
  });
});

// ── AC 3 · no pose ends on beat 2 ────────────────────────────────────────────

describe("beat 3 arrives with beat 2, and no pose ends on the confession", () => {
  // THE TICKET'S SHARPEST CONSTRAINT. A POSE IS A RESTING STATE — the presenter stops
  // on it and talks over it for as long as they like — so a pose whose last arrival is
  // the workaround plus its bill leaves a room looking at an account of breaching
  // somebody's terms of service with the sentence that licenses it not yet on the
  // stage. §6.7 calls beat 3 load-bearing for exactly that reason. Two halves are
  // needed and both are below: the WALK (no reachable pose has the bill without the
  // verdict, in either direction) and the STRUCTURE (the component cannot be configured
  // into such a pose at all).

  test("every reachable pose that shows the bill shows the verdict, walked both ways", () => {
    const { unmount } = renderSlide(0);
    // The ranks first, so "arrives IN this pose" is a fact and not a guess: a box already
    // standing from an earlier pose keeps its old delay in the DOM, and comparing that
    // number against this pose's stagger would be comparing two different clocks.
    const ranks = arrivalRanks();
    const walk = [...POSES, ...[...POSES].reverse()];

    for (const pose of walk) {
      goToPose(pose);
      const bill = BEAT_2.map(revealed);
      const verdictOn = revealed("chicken-egg-verdict");
      const ruleOn = revealed("chicken-egg-rule");

      // THE BILL IS ALL OR NOTHING. A half-revealed bill is a pose that ends on part of
      // beat 2, and it is what a per-row gate would produce.
      expect(new Set(bill).size, `pose ${pose}: the bill is one gate`).toBe(1);

      if (!bill[0]) continue;
      expect(verdictOn, `pose ${pose} shows the bill, so it must show the verdict`).toBe(true);
      expect(ruleOn, `pose ${pose} shows the bill, so it must show its total rule`).toBe(true);

      // AND IN THE POSE WHERE BEAT 3 ARRIVES, IT ARRIVES LAST — the half of the rule
      // that lives in the stagger rather than in the pose split. A verdict landing 90ms
      // before the fourth cost would leave the room's eye ending on the bill inside a
      // pose that technically contains both. Guarded on the verdict's own pose because a
      // verdict that had moved to a LATER pose is caught above (it would not be revealed
      // here at all) and by the pose-identity test below.
      if (rankOf(ranks, "chicken-egg-verdict")[0] !== pose) continue;
      const samePose = EVERY_BOX.filter(
        (id) => id !== "chicken-egg-verdict" && rankOf(ranks, id)[0] === pose,
      );
      expect(samePose.length, `pose ${pose} has other arrivals to be last after`).toBeGreaterThan(
        0,
      );
      expect(
        arrival("chicken-egg-verdict"),
        `pose ${pose}: the verdict must arrive after everything else that arrives here`,
      ).toBeGreaterThan(Math.max(...samePose.map(arrival)));
    }
    unmount();
  });

  test("the verdict is never one pose behind the bill, and never one line above it", () => {
    // "NEVER THE THING THAT ARRIVES AFTER THE LAST COST IN A LATER POSE" — the failure
    // this forbids is a slide that does show beat 3, one keypress later. Held as the
    // pose identity: the last cost and the verdict first arrive in the SAME pose.
    const { unmount } = renderSlide(0);
    const ranks = arrivalRanks();

    const lastCost = COST_IDS[COST_IDS.length - 1];
    expect(rankOf(ranks, "chicken-egg-verdict")[0], "same pose as the last cost").toBe(
      rankOf(ranks, lastCost)[0],
    );
    expect(before(rankOf(ranks, lastCost), rankOf(ranks, "chicken-egg-verdict"))).toBe(true);
    expect(before(rankOf(ranks, "chicken-egg-rule"), rankOf(ranks, "chicken-egg-verdict"))).toBe(
      true,
    );

    // AND BELOW IT IN THE READING ORDER, not above it: §6.7's beat order is kept on both
    // channels, so a room that reads the column top-down meets the bill before the
    // sentence that licenses it.
    goToPose(1);
    const lastRow = geometryOf(lastCost);
    expect(geometryOf("chicken-egg-verdict").top).toBeGreaterThan(lastRow.top + lastRow.height);
    unmount();
  });

  test("the component cannot be configured into a pose that bills without the verdict", () => {
    // THE STRUCTURAL HALF, and it is asserted over the FIGURE rather than the slide:
    // `pose` is a plain `number` prop, so this walks values the deck cannot even
    // produce — negatives, fractions and poses past the last — and requires beat 2 and
    // beat 3 to be one gate at every one of them. A per-beat gate (`pose >= 1` for the
    // bill, `pose >= 2` for the verdict) is the cheapest way to break AC 3 and this is
    // the assertion that refuses it, independently of what the deck happens to ask for.
    for (const pose of [-2, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 6]) {
      const { unmount } = render(<ChickenEggBeats pose={pose} />);
      const gate = [...BEAT_2, ...BEAT_3].map(revealed);
      expect(new Set(gate).size, `pose ${pose}: beats 2 and 3 are one gate`).toBe(1);
      unmount();
    }

    // AND NO FIFTH POSE HIDES BEHIND THE FOURTH. `steps: 4` clamps the deck at 3, so a
    // panel keyed on `pose >= 4` would be unreviewed copy with a trigger attached — and
    // the figure takes the number directly, so this is where it can be seen.
    const last = render(<ChickenEggBeats pose={3} />);
    const atThree = last.container.innerHTML;
    last.unmount();
    const beyond = render(<ChickenEggBeats pose={9} />);
    expect(beyond.container.innerHTML).toBe(atThree);
    beyond.unmount();
  });

  test("the four poses are four distinct frames, reached identically in both directions", () => {
    // A pose whose markup depends on how it was reached is a slide that looks different
    // when a presenter steps BACK into it — which happens in every real walkthrough and
    // in none of the tests that only step forward.
    const { container, unmount } = renderSlide(0);

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
    expect(backward).toEqual(forward);
    // And the four frames are actually four — a pose that changed nothing would pass
    // the comparison above trivially.
    expect(new Set(forward).size).toBe(POSES.length);
    unmount();
  });

  test("beat 3 is unmissable on four channels, none of them load-bearing alone", () => {
    // AC 3 says "present and unmissable", and the figure answers it four ways at once
    // (`ChickenEggBeats.tsx`'s `TIER.verdict`). jsdom can hold all four as long as it
    // claims nothing about brightness: a CSS variable is a token here, not a luminance.
    // The ladder `ChickenEggBeats.tsx` records — 23 text runs below the headline row,
    // brightest 0.7835, the verdict the only owner of it — was measured in Chromium by
    // that file's author, and re-measuring it belongs to this ticket's task 5.
    const { unmount } = renderSlide(3);
    const verdict = screen.getByTestId("chicken-egg-verdict");

    // 1 · THE ONLY BOX AT ITS TOKEN. `--neutral-100` is the brightest tier any text on
    // this stage takes under the headline row, and nothing else may share it or reach
    // over it to `--neutral-50` (which is the headline's, and the headline stays the
    // brightest type on the stage: it is the premise, and beat 3 is what came of it).
    expect(verdict.style.color).toBe("var(--neutral-100)");
    for (const id of TEXT_BOXES.filter((box) => box !== "chicken-egg-verdict")) {
      const color = screen.getByTestId(id).style.color;
      expect(color, `${id} may not take the verdict's tier`).not.toBe("var(--neutral-100)");
      expect(color, `${id} may not take the headline's tier`).not.toBe("var(--neutral-50)");
    }

    // 2 · THE BIGGEST PROSE ON THE SLIDE: 26 over the turn's 24 over the confession's 22.
    const fontSize = (id: string) => parseFloat(screen.getByTestId(id).style.fontSize);
    expect(fontSize("chicken-egg-verdict")).toBeGreaterThan(fontSize("chicken-egg-turn"));
    expect(fontSize("chicken-egg-turn")).toBeGreaterThan(fontSize("chicken-egg-workaround"));

    // 3 · ALONE BELOW THE COPPER RULE, in the wider of the two columns. Every other box
    // on the stage — both columns, all fifteen of them — sits above it; the rule itself
    // is beat 3's own and is the line being measured from, so it is not in the census.
    const above = EVERY_BOX.filter(
      (box) => box !== "chicken-egg-verdict" && box !== "chicken-egg-rule",
    );
    expect(above).toHaveLength(EVERY_BOX.length - 2);
    for (const id of above) {
      const geo = geometryOf(id);
      expect(geo.top + geo.height, `${id} sits above the rule`).toBeLessThanOrEqual(RULE_TOP);
    }
    expect(geometryOf("chicken-egg-verdict").top).toBeGreaterThan(RULE_TOP + RULE_HEIGHT);

    // 4 · LAST IN ITS POSE — asserted in full by the walk above; restated here as the
    // fourth channel so that removing any one of these four leaves three failing tests
    // rather than a slide that quietly ranks its load-bearing beat below its bill.
    goToPose(1);
    expect(arrival("chicken-egg-verdict")).toBeGreaterThan(arrival(COST_IDS[COST_IDS.length - 1]));

    // AND IT SAYS WHAT §6.7 SAYS IT SAYS. Three sentences, in the order they happened,
    // with the keyword on the release of the investment rather than on "It worked":
    // that is the clause a Div Head repeats upward.
    expect(C.verdict).toBe("It worked. Management was convinced. Full investment was released.");
    expect(screen.getByTestId("chicken-egg-verdict").textContent).toBe(C.verdict);
    expect(C.verdictKw).toEqual(["Full investment was released"]);
    unmount();
  });
});

// ── AC 4 · beat 4's four constraints and its clock ───────────────────────────

describe("beat 4 names the pilot's four constraints and the 30-day window", () => {
  test("seats, one named use case each, a kill criterion, a spend cap", () => {
    // THE ISSUE'S AC, WORD FOR WORD, in its order. Every one of the four is a LIMIT,
    // which is what makes the card an offer rather than an ask: seats bound the
    // headcount, one named use case each bounds the scope, a kill criterion says in
    // advance what stopping looks like, and a spend cap bounds the exposure.
    expect(C.pilotConstraints.map((term) => term.label)).toEqual([
      "A handful of seats",
      "One named use case each",
      "A kill criterion",
      "A spend cap",
    ]);
    expect(C.pilotConstraints.map((term) => term.id)).toEqual([
      "seats",
      "use-case",
      "kill-criterion",
      "spend-cap",
    ]);

    // AND EACH LABEL STILL NAMES ITS OWN CONSTRAINT, held as a pattern rather than as
    // the literal above, so a reword that keeps the shape and drops the substance —
    // "A short list of people" for the seats, "A review point" for the kill criterion —
    // fails here instead of passing a string comparison nobody re-read.
    const required = [/\bseats\b/i, /\bone named use case each\b/i, /\bkill criterion\b/i, /\bspend cap\b/i];
    C.pilotConstraints.forEach((term, i) => {
      expect(term.label, term.id).toMatch(required[i]);
    });
  });

  test("all four reach the stage inside the bordered card, at the closing pose", () => {
    const { unmount } = renderSlide(3);

    C.pilotConstraints.forEach((term, i) => {
      const row = screen.getByTestId(`chicken-egg-term-${term.id}`);
      expect(row.textContent, term.id).toBe(term.label);
      expect(revealed(`chicken-egg-term-${term.id}`), term.id).toBe(true);
      expect(geometryOf(`chicken-egg-term-${term.id}`).top, term.id).toBe(constraintRowTop(i));
    });

    // THE ONLY BORDERED BOX ON THE STAGE, which is what lets the offer read as an
    // object a division head writes down rather than as a fifth list. `border-box`
    // sizing is load-bearing and not boilerplate: this repo ships no global
    // `* { box-sizing: border-box }`, so a content-box card would put its right edge
    // 2px past the deck's own margin.
    const card = screen.getByTestId("chicken-egg-card");
    expect(card.style.border).toContain("solid");
    expect(card.style.border).toContain("var(--copper-");
    expect(card.style.boxSizing).toBe("border-box");
    expect(card.textContent).toBe("");

    // THE CANONICAL POSE IS THIS ONE, so the exported PDF is the frame that carries the
    // terms. An offer exported without its limits is the failure `canonicalPose: 3`
    // exists to prevent, and this is the two facts side by side.
    expect(investChickenEggSlide.canonicalPose).toBe(3);
    unmount();
  });

  test("the 30-day window is on the slide, in the card's own label", () => {
    const { unmount } = renderSlide(3);
    // "INSTEAD —" IS DOING REAL WORK: without it the card reads as one more thing the
    // slide is asking for; with it the card REPLACES the route the story just described,
    // which is the whole shape of beat 4.
    expect(C.pilotEyebrow).toBe("INSTEAD — A 30-DAY PROOF PILOT");
    expect(C.pilotEyebrow).toMatch(/\b30-DAY\b/);
    expect(screen.getByTestId("chicken-egg-pilot-eyebrow").textContent).toBe(C.pilotEyebrow);

    // Four limits AND a clock — the clock is in the label, so the terms stay four short
    // rows and the window is not repeated four times.
    expect(C.pilotConstraints).toHaveLength(4);
    for (const term of C.pilotConstraints) {
      expect(term.label, term.id).not.toMatch(/30/);
    }

    // The turn is the sentence this card is the terms for, and it is the one line on the
    // slide addressed to the room. It lands one pose EARLIER on purpose: a division
    // head hears the offer before being handed its limits.
    expect(C.turn).toBe("You are the person who can skip all three.");
    expect(screen.getByTestId("chicken-egg-turn").textContent).toBe(C.turn);
    unmount();
  });
});

// ── AC 5 · the claim this slide may never make ───────────────────────────────

/**
 * The vendors this slide may not name.
 *
 * §6.7 keeps the vendor-leniency comparison OFF the stage and in the presenter's mouth:
 * choosing a vendor by weakness of enforcement, printed three slides from the
 * governance recommendation, is indefensible in a Sinar Mas context. The list is the
 * issue's own; `\b`-anchored so it is a word check and not a substring one.
 */
const VENDOR_NAMES = [
  "ChatGPT",
  "OpenAI",
  "Claude",
  "Anthropic",
  "Gemini",
  "Google",
  "Copilot",
  "Microsoft",
] as const;

/**
 * The enforcement-weakness vocabulary, from the issue's AC.
 *
 * `\b`-anchored, which is what keeps `strict` from firing on "restrict" and `strict`
 * itself from firing on "strictly" — neither word is anywhere near this copy, and the
 * anchoring is what makes the rule safe to hold over every string rather than over a
 * chosen few.
 */
const LENIENCY_WORDS =
  /\b(lenient|leniency|not strict|less strict|strict|unenforced|enforcement|blind eye|looks the other way|tolerated|got away)\b/i;

/** Does any forbidden vendor name appear in `text`? */
function namesAVendor(text: string): string | null {
  for (const vendor of VENDOR_NAMES) {
    if (new RegExp(`\\b${vendor}\\b`, "i").test(text)) return vendor;
  }
  return null;
}

describe("no vendor-leniency or enforcement-weakness claim, anywhere", () => {
  test("the rule's input is non-empty and covers all four beats", () => {
    // A RULE OVER AN EMPTY SET PASSES. This is the assertion that stops every absence
    // rule in this file from being satisfied vacuously — by a copy block that lost its
    // costs, by a `walkStrings` that silently stopped descending, or by a rule pointed at
    // nothing at all. So: the set is non-empty, every string in it is non-empty, and at
    // least one string of each of §6.7's four beats is in it.
    const strings = authoredStrings();
    expect(strings.length).toBeGreaterThan(0);
    for (const copy of strings) expect(copy.trim(), JSON.stringify(copy)).not.toBe("");

    const perBeat: ReadonlyArray<readonly [string, readonly string[]]> = [
      ["beat 1", C.deadlockClauses],
      ["beat 2", [C.workaround, C.costsEyebrow, ...C.costs.map((cost) => cost.label)]],
      ["beat 3", [C.verdict]],
      ["beat 4", [C.turn, C.pilotEyebrow, ...C.pilotConstraints.map((term) => term.label)]],
    ];
    for (const [beat, members] of perBeat) {
      expect(members.length, beat).toBeGreaterThan(0);
      for (const member of members) expect(strings, `${beat}: ${member}`).toContain(member);
    }

    // AND THE WALK ACTUALLY DESCENDS, which is the half a flat list never had to prove.
    // A `walkStrings` that only read top-level string fields would pass every assertion
    // above except these: a cost label lives two levels down (tuple → record → field), a
    // clause one level down (tuple), and a keyword one level down (array). All three are
    // reached, and the `id` hooks come with them.
    expect(strings, "a label two levels down").toContain(C.costs[3].label);
    expect(strings, "the id beside it").toContain(C.costs[3].id);
    expect(strings, "a term two levels down").toContain(C.pilotConstraints[3].label);
    expect(strings, "a clause one level down").toContain(C.deadlockClauses[1]);
    expect(strings, "a keyword one level down").toContain(C.verdictKw[0]);
    // Non-vacuity of the count itself: the walk finds MORE than the eleven fields the
    // hand-written list carried, so a field added to the copy block is inside the rules.
    expect(strings.length).toBeGreaterThan(11);
  });

  test("no leniency or enforcement-weakness word in ANY string the copy module authors", () => {
    // AC 5's LITERAL SCOPE — "the rendered slide or its copy module" — and the module is
    // the whole of `content.ts`, `invest-own-proof`'s copy and all three brand blocks
    // included. It costs nothing: no leniency word occurs anywhere in this module today,
    // so there is no reason to narrow this half to D.3's block, and a claim written into a
    // sibling's string or into a brand block that only one variant resolves is caught the
    // same day it is written.
    const strings = moduleAuthoredStrings();
    expect(strings.length, "a rule over an empty set proves nothing").toBeGreaterThan(
      authoredStrings().length,
    );
    for (const copy of strings) expect(copy, copy).not.toMatch(LENIENCY_WORDS);
  });

  test("no vendor name in D.3's own copy, and the scope of THAT rule is measured", () => {
    // THE VENDOR RULE IS D.3-SCOPED, AND IT HAS TO BE. It is a proxy the test invented —
    // stricter than the AC, which forbids the leniency CLAIM rather than the name — and
    // §6.7's reason for it is that a vendor named on THIS stage reads as the leniency
    // comparison whether the sentence makes it or not.
    for (const copy of authoredStrings()) expect(namesAVendor(copy), copy).toBeNull();

    // THE ALLOWLIST, WHICH IS ONE STRING AND IS MEASURED RATHER THAN ASSUMED. `content.ts`
    // holds `invest-own-proof`'s copy too, and D.2's GEMS attribution cites the publisher
    // of a figure by name — "Source: Google Cloud's published GEMVIS customer story …",
    // which §6.7 requires ("cite attributed") and which is legitimate copy on a different
    // slide. So the module-wide set is asserted to trip the vendor proxy EXACTLY there and
    // nowhere else: that is the whole reason this half is scoped and the leniency half
    // above is not, and if a second module-wide hit ever appears this fails and the
    // decision gets re-made instead of quietly widening.
    const moduleHits = moduleAuthoredStrings().filter((copy) => namesAVendor(copy) !== null);
    expect(moduleHits.map((copy) => namesAVendor(copy))).toEqual(["Google"]);
    expect(moduleHits[0]).toContain("Source: Google Cloud's published GEMVIS customer story");
    expect(authoredStrings()).not.toContain(moduleHits[0]);
  });

  test("in anything the stage renders, at every pose", () => {
    // THE RENDERED HALF, which is the half the AC is written against: a word can reach
    // the stage from a component instead of from the copy module, and then no rule over
    // authored strings sees it. Walked at every pose in one mount, with a positive
    // control first so an empty stage cannot pass.
    const { container, unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      const text = container.textContent ?? "";
      expect(text, `pose ${pose}`).toContain(C.headline);
      expect(namesAVendor(text), `pose ${pose}`).toBeNull();
      expect(text, `pose ${pose}`).not.toMatch(LENIENCY_WORDS);
    }
    unmount();
  });

  test("nor in a title or aria label, where text rules do not look", () => {
    // The quiet way a word reaches a room: a tooltip. Nothing on this slide has one,
    // and this is the assertion that keeps it that way.
    const { container, unmount } = renderSlide(3);
    const attributes = [...container.querySelectorAll("[title], [aria-label]")].flatMap((el) => [
      el.getAttribute("title") ?? "",
      el.getAttribute("aria-label") ?? "",
    ]);
    for (const value of attributes) {
      expect(namesAVendor(value), value).toBeNull();
      expect(value, value).not.toMatch(LENIENCY_WORDS);
    }
    unmount();
  });

  test("and 'banned repeatedly' STAYS — the rule forbids the opposite claim, not this one", () => {
    // THE POSITIVE CONTROL, AND IT IS THE POINT OF THE WHOLE BLOCK. §6.7 requires the
    // ban: enforcement happened, to us, more than once, and it is why beat 2 cannot be
    // softened — a workaround nobody ever caught would have cost nothing, and the bill
    // is the argument. A rule that swept "banned repeatedly" off the stage along with
    // the leniency claim would have inverted the AC while passing every test above.
    expect(C.workaround).toBe("So we did it on shared accounts, and we were banned repeatedly.");
    expect(C.workaround).toContain("banned repeatedly");
    expect(C.workaroundKw).toEqual(["shared accounts", "banned repeatedly"]);
    expect(namesAVendor(C.workaround)).toBeNull();
    expect(C.workaround).not.toMatch(LENIENCY_WORDS);

    const { unmount } = renderSlide(1);
    expect(screen.getByTestId("chicken-egg-workaround").textContent).toContain("banned repeatedly");
    unmount();

    // AND THE RULE ITSELF BITES, checked against §6.7's own example of the sentence that
    // must not be printed. A regex that matched nothing would make every assertion in
    // this block pass on any copy at all.
    expect(LENIENCY_WORDS.test("ChatGPT seems not strict")).toBe(true);
    expect(namesAVendor("ChatGPT seems not strict")).toBe("ChatGPT");
    expect(LENIENCY_WORDS.test("nobody enforced it, so we kept going")).toBe(false);
    expect(LENIENCY_WORDS.test("enforcement was inconsistent")).toBe(true);
  });
});

// ── AC 6 · §6.2's three shadow-AI passes stay disjoint ───────────────────────

/**
 * B.2's vocabulary — shadow AI as CONDITION (§6.2: "There is no guidance, so people
 * improvise"). `improvis\w*` rather than the bare stem, because "improvised" and
 * "improvises" are the same IMAGE and a rule that let them through would be a rule
 * about spelling.
 *
 * TWO OF THE THREE ARE §6.2's WORDS AND THE THIRD IS ITS SLIDE ID, which is why `no SOP`
 * takes `[-\s]`: the literal string "no SOP" appears nowhere in the spec (checked by grep on
 * 2026-08-05) — what §6.2 owns is the id `gap-no-sop`, and the hyphen is how that name is
 * spelled everywhere it appears. So the pattern matches both spellings, D.3 may print
 * neither, and the positive control below can fire it against a real source instead of
 * against a sentence edited to make it fire.
 */
const B2_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["no SOP", /\bno[-\s]SOP\b/i],
  ["no guidance", /\bno guidance\b/i],
  ["improvise", /\bimprovis\w*\b/i],
];

/**
 * D.4's vocabulary — shadow AI as EXPOSURE, plus the two statistics and the three data
 * destinations §6.7 reserves for that slide (`invest-security`, #58).
 *
 * `produce` IS ANCHORED ON BOTH SIDES so it cannot fire on "production", which is a word
 * this deck uses freely — `invest-own-proof`, the slide immediately in front of this one,
 * prints "One-click production status" in a Berau leader deck. A token guard that
 * produced a false positive there would be turned off, and a rule that is off catches
 * nothing.
 */
const D4_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["revoke", /\brevoke\w*\b/i],
  ["produce", /\bproduce\b/i],
  ["6.7 points", /\b6\.7\b/],
  ["9.2 back", /\b9\.2\b/],
  ["self-hosted", /\bself-hosted\b/i],
  ["on-prem", /\bon-prem\w*\b/i],
  ["consumer account", /\bconsumer account\b/i],
  ["workspace", /\bworkspace\b/i],
  ["governance retrofit", /\bgovernance retrofit\b/i],
  ["Culture, Risk, Governance, Ethics", /\bCulture,\s*Risk,\s*Governance,\s*Ethics\b/i],
];

describe("§6.2 · shadow AI is RATIONAL BEHAVIOUR here, and nothing else's pass", () => {
  // WHAT THIS BLOCK IS AND IS NOT. §6.2 forbids any two of the deck's three shadow-AI
  // passes from sharing an image or a statistic — B.2 as CONDITION, D.4 beat 2 as
  // EXPOSURE, D.3 (this slide) as RATIONAL BEHAVIOUR. BOTH OTHER PASSES ARE UNBUILT as
  // of 2026-08-05: `gap-no-sop` sits in §11's Phase 7 row and `src/slides/leader-gap/`
  // holds only the Capability Ladder; `invest-security` is #58. So there is no rendered
  // copy to diff against, and what is checkable here is a rule over the TOKENS THE SPEC
  // RESERVES for those two passes, transcribed from §6.2 and §6.7's D.4 paragraph.
  //
  // A TOKEN LIST IS NOT A PROOF ABOUT IMAGES. Two slides can share a picture without
  // sharing a word — "people route around a control" is one image whether it is spelled
  // with "improvise" or not — and no grep will ever see that. This block is a guard
  // against the CHEAPEST way to break §6.2 (lifting the other pass's vocabulary), and
  // the issue's AC is explicit that the real check is a human reading all three passes
  // and recording the result in a comment on #57. Nothing here discharges that.
  //
  // #58 MUST RUN THE MIRROR OF THIS CHECK FROM THE OTHER SIDE. When `invest-security`
  // ships, its own unit test owes the symmetric rule: none of D.3's vocabulary in D.4's
  // copy — `deadlock`, `no budget without proof`, `shared accounts`, `banned
  // repeatedly`, `WHAT IT COST`, `30-day`, `proof pilot`, `kill criterion`, `spend cap`
  // — and the same for `gap-no-sop` when Phase 7 builds B.2. Held from one side only,
  // this rule stops the day the other slide is written, because a token can migrate in
  // either direction and only the receiving file's tests would notice.
  //
  // THE ONE ADJACENCY THAT CANNOT BE REMOVED, stated rather than hidden: §6.7 prescribes
  // "no audit trail" and "data outside the boundary" as two of THIS slide's four costs,
  // while D.4 beat 2 is "data you cannot audit, revoke, or produce". The words touch, so
  // `audit` is deliberately NOT in the token list below — forbidding it would forbid the
  // AC. The images do not touch: D.3's costs are a PAST-TENSE BILL in the first person
  // (what our workaround cost us) and D.4's is a PRESENT-TENSE EXPOSURE in the second
  // person (what you cannot do today), and D.3 draws no data-destination picture at all.

  test("carries none of B.2's condition vocabulary and none of D.4's exposure vocabulary", () => {
    const strings = authoredStrings();
    expect(strings.length, "a rule over an empty set proves nothing").toBeGreaterThan(0);

    for (const copy of strings) {
      for (const [name, pattern] of [...B2_TOKENS, ...D4_TOKENS]) {
        expect(pattern.test(copy), `${name} in ${JSON.stringify(copy)}`).toBe(false);
      }
    }

    // The rendered half, at the fullest pose — a token can arrive from a component.
    const { container, unmount } = renderSlide(3);
    const text = container.textContent ?? "";
    expect(text, "positive control: the stage is not empty").toContain(C.verdict);
    for (const [name, pattern] of [...B2_TOKENS, ...D4_TOKENS]) {
      expect(pattern.test(text), `${name} reached the stage`).toBe(false);
    }
    unmount();
  });

  test("and the token patterns actually fire, including the word-boundary case", () => {
    // POSITIVE CONTROLS FOR THE RULE ITSELF. Thirteen regexes that matched nothing would
    // make the test above pass on any copy at all — including copy lifted verbatim from
    // D.4 — so every one of them is fired here against the SOURCE IT WAS READ OFF.
    //
    // §6.2's OWN SENTENCE IS QUOTED VERBATIM, and it does not contain all three tokens.
    // Spec line 773 reads "There is no guidance, so people improvise." — `no guidance` and
    // `improvise` come from there; `no SOP` comes from the SLIDE ID §6.2 gives that pass,
    // `gap-no-sop`. Both sources are listed, and the assertion is `.some()` over them the
    // way D.4's is, because a control that edits the spec's words to make itself fire is a
    // control that proves the edit and not the regex. (This line read
    // "There is no guidance and no SOP, so people improvise." until 2026-08-05, which was
    // exactly that.)
    const b2Sources = [
      "There is no guidance, so people improvise.", // §6.2, spec line 773
      "gap-no-sop", // §6.2's slide id, where `no SOP` is spelled
    ];
    for (const [name, pattern] of B2_TOKENS) {
      expect(
        b2Sources.some((line) => pattern.test(line)),
        name,
      ).toBe(true);
    }
    const d4Lines = [
      "data you cannot audit, revoke, or produce",
      "open-weight is 6.7 points off the lead and 9.2 back on tool-calling",
      "personal consumer account, company-managed workspace, or self-hosted on-prem",
      "governance retrofit, across Culture, Risk, Governance, Ethics",
    ];
    for (const [name, pattern] of D4_TOKENS) {
      expect(
        d4Lines.some((line) => pattern.test(line)),
        name,
      ).toBe(true);
    }

    // THE BOUNDARY CASE THE TICKET NAMES: `produce` must not match "production", which
    // is a word `invest-own-proof` prints one figure in front of this slide in a Berau
    // leader deck.
    expect(/\bproduce\b/.test("One-click production status")).toBe(false);
    expect(/\bproduce\b/i.test("cannot produce it on request")).toBe(true);
  });

  test("this slide's own pass is carried by grammar, not by an adjective", () => {
    // D.3's PASS IS SHADOW AI AS RATIONAL BEHAVIOUR, and the only part of that a DOM
    // test can hold is where the claim is made from. The confession opens on the
    // CONSEQUENCE of beat 1 — "So we did it …" — so the deadlock above is the reason and
    // the sentence is the behaviour it produced. Nothing on the slide CALLS the
    // workaround reasonable, which is the only way a slide can say it without appearing
    // to recommend it; the causal "So" is what carries the pass.
    expect(C.workaround.startsWith("So we did it")).toBe(true);
    for (const pattern of [/\breasonable\b/i, /\brational\b/i, /\bunderstandable\b/i, /\bjustified\b/i]) {
      for (const copy of authoredStrings()) expect(copy, copy).not.toMatch(pattern);
    }
    // And beat 1 is the reason it is a consequence OF: a two-clause cycle, each clause
    // the other with its two nouns swapped.
    expect([...C.deadlockClauses]).toEqual(["NO BUDGET WITHOUT PROOF", "NO PROOF WITHOUT BUDGET"]);
  });

  test("the ONLY quantity the slide prints is the 30-day window", () => {
    // §6.2's forbidden overlap is an image OR A STATISTIC, so the safest form of this
    // slide's half of the rule is that it carries exactly one number. §6.7's D.4
    // paragraph carries two statistics (6.7 points, 9.2 back) and §6.2's B.2 paragraph
    // carries none, so neither of the other passes can be the one this slide shares with:
    // `grep -rn "30-day\|30 day\|30-DAY" docs/specs/` returns exactly one line — §6.7's
    // D.3 sentence, line 862 — re-run on 2026-08-05 rather than taken from the copy
    // module's own note.
    const WINDOW = "30-DAY";
    for (const copy of authoredStrings()) {
      expect(copy.split(WINDOW).join(" · "), copy).not.toMatch(/\d/);
    }
    // POSITIVE CONTROL: the window IS there, so the rule above is not passing because
    // the strip removed a string nothing prints.
    expect(C.pilotEyebrow).toContain(WINDOW);
    expect(authoredStrings().filter((copy) => copy.includes(WINDOW))).toHaveLength(1);

    // AND ON THE STAGE, with the derived figure reference stripped — `FigLabel` prints
    // `D.2` off the slide-number context (here the harness's `at`, in a real deck the
    // composed row), which is a number the COMPOSER owns and the one digit on the stage
    // that is not the slide's own.
    const { container, unmount } = renderSlide(3);
    const text = stageTextWithoutFigLabel(container);
    expect(text, "positive control").toContain(C.pilotEyebrow);
    expect(text.split(WINDOW).join(" · ")).not.toMatch(/\d/);
    unmount();
  });
});

// ── AC 9 · the letter and the number are the composer's ──────────────────────

describe("the slide authors no letter and no number", () => {
  test("no string in the copy block names a section or a figure", () => {
    // §3.4 R2 / §3.5. This slide composes as D.2 today and becomes D.3 the moment
    // `invest-base-rates` lands in front of it, and everything behind the `invest` run
    // renumbers as the rest of Phase 6 lands — so a literal "D.2" or "SECTION D"
    // anywhere in this copy would be a lie on a projector within the week.
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      expect(copy, copy).not.toMatch(/\b[A-N]\.\d+\b/);
    }
  });

  test("and the only figure reference on the stage is the derived one", () => {
    // THE RENDERED HALF, which is what catches a letter written into a component rather
    // than into the copy module. The harness supplies the position the two leader decks
    // derive; strip that one element and nothing of that shape may be left.
    const { container, unmount } = renderSlide(3);
    expect(
      container.querySelector(".fig-label")?.textContent,
      "the derived reference is there to strip",
    ).toContain(`${AT.letter}.${AT.num}`);
    expect(stageTextWithoutFigLabel(container)).not.toMatch(/\b[A-N]\.\d+\b/);
    expect(C.figLabel).toBe("THE DEADLOCK, AND WHO CAN SKIP IT");
    unmount();
  });
});

// ── AC 8 · zero SMIL, at every pose ─────────────────────────────────────────

/**
 * Every element SMIL can animate with. `animateColor` is deprecated and still honoured by
 * engines, which is exactly why it is here: the sibling slide tests census FOUR tags
 * (`animate`, `animateMotion`, `animateTransform`, `set`), and a census copied from them
 * is a census that misses the fifth.
 */
const SMIL_TAGS = ["animate", "animateTransform", "animateMotion", "set", "animateColor"] as const;

/** The node census, at one pose. */
function expectNoSmil(container: HTMLElement, where: string) {
  for (const tag of SMIL_TAGS) {
    expect(document.querySelectorAll(tag), `${where} · <${tag}>`).toHaveLength(0);
  }
  // AND NO `<svg>` AT ALL, which is the stronger claim this figure actually makes: it
  // mounts none, so a SMIL node cannot appear here without an author adding a whole
  // element class that is not currently on the stage. (`ChickenEggBeats.tsx` records six
  // `<svg>` nodes on the composed stage, all six the NavBar's chevrons inside
  // `.nav-zone` — which no unit mount renders, so this census sees a bare figure and
  // says nothing about the deck's chrome.)
  expect(container.querySelectorAll("svg"), where).toHaveLength(0);
}

describe("zero SMIL nodes, by construction", () => {
  test("at every pose, under the deck's normal motion", () => {
    // THE WHOLE MOTION BUDGET IS CSS: the shared `.fade` transition-plus-keyframe pair
    // and `.copper-rule`'s `scaleX`, both in `globals.css`. Neither is a SMIL node, and
    // the loop in beat 1 is drawn in WORDS rather than as a ring, which is what keeps
    // this a fact about the markup instead of a promise about future edits.
    const { container, unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      expectNoSmil(container, `pose ${pose}`);
    }
    unmount();
  });
});

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

  test("mounts zero SMIL nodes at every pose", () => {
    // SMIL IS INVISIBLE TO THE GLOBAL `prefers-reduced-motion` RULE — it squashes CSS
    // animation and transition durations only — so a SMIL node has to be gated at
    // mount, as E.12 gates its `<animateMotion>`. This slide has nothing to gate, and
    // that is the claim: the census is identical under either preference because
    // NOTHING under this slide reads `matchMedia` at all. The mock above therefore
    // proves the markup is preference-independent, which is the half a DOM test owns.
    const { container, unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      expectNoSmil(container, `reduce · pose ${pose}`);
    }
    unmount();
  });

  test("every pose is still structurally complete, with its copy", () => {
    // WHAT THIS CAN AND CANNOT SAY. jsdom runs no transition, so "a squashed transition
    // rests on its FINISHED frame" is NOT checkable here — the class is present and the
    // computed opacity is nothing jsdom computes. This test claims the DOM half only: at
    // each pose, every box that pose has reached is mounted, carries `on`, and prints
    // its own copy. The computed half — every reached reveal at opacity 1 and the rule's
    // transform at scaleX(1) at all four poses, in both leader decks and both motion
    // modes — is TASK 5's, in a real engine, and it is not on disk yet. Neither half
    // alone is AC 8; this file owes the DOM one and says so rather than implying both.
    const { unmount } = renderSlide(0);
    const expected: ReadonlyArray<readonly string[]> = [
      BEAT_1,
      [...BEAT_1, ...BEAT_2, ...BEAT_3],
      [...BEAT_1, ...BEAT_2, ...BEAT_3, "chicken-egg-turn"],
      EVERY_BOX,
    ];

    POSES.forEach((pose) => {
      goToPose(pose);
      const reached = expected[pose];
      for (const id of reached) {
        expect(revealed(id), `reduce · pose ${pose} · ${id}`).toBe(true);
      }
      // AND THE COPY IS THERE, not merely the box: a reduced-motion path that dropped
      // children to "avoid animating them" would still pass a class check.
      for (const id of reached.filter((box) => TEXT_BOXES.includes(box))) {
        expect(screen.getByTestId(id).textContent, `reduce · pose ${pose} · ${id}`).not.toBe("");
      }
      // Nothing the pose has not reached is revealed — completeness is a claim about
      // THIS pose, not about the last one.
      for (const id of EVERY_BOX.filter((box) => !reached.includes(box))) {
        expect(revealed(id), `reduce · pose ${pose} · ${id} is not reached yet`).toBe(false);
      }
    });
    unmount();
  });
});

// ── AC 7 · the geometry, on its own terms ────────────────────────────────────

describe("the chicken-egg geometry", () => {
  // ASSERTED AS PROPERTIES, NOT AS IDENTITIES, and the distinction is a rule in this
  // tree rather than a preference. `HEAD` records two checks deleted for being
  // unfalsifiable — three column widths "tiling" the content width, where the third is
  // DEFINED as the remainder — so an assertion that holds for every value of every
  // constant in it is worse than no assertion: it reads as coverage. What is asserted
  // below is what can fail: the counts against the copy's own tuples, the ORDER of the
  // shelves, the two capacities against their two different neighbours, the throw
  // guards WITH their messages, and the shelf each rendered box actually declares.
  //
  // MUTATION-TESTED, AND THE MEASUREMENT IS WORTH RECORDING: the geometry module is
  // fully derived from top to bottom, so editing ONE constant cascades through every
  // shelf under it. Done one at a time on 2026-08-05 and restored each time —
  // `CLAUSE_HEIGHT` 28→48, `WORKAROUND_TO_EYEBROW` 24→0, `VERDICT_HEIGHT` 72→100,
  // `ROWS_TO_RULE_GAP` 30→4, `CARD_PAD` 32→8, and the cost-row throw message losing the
  // words "hover band" — every one of the six turned this file red. The first three fire
  // through a capacity the copy then overruns (the renderer THROWS, which is the
  // module's own refusal working); the last three fire on the assertions in this block by
  // name. What is NOT mutation-tested is the three CSS facts this block pins — the stage,
  // the side margin and the band's 88px — because they are transcriptions of
  // `src/styles/globals.css` and a mutation there is the thing they exist to catch.

  test("the three counts are pinned to the copy's own tuples", () => {
    // THE HONEST DIRECTION FOR THE LOCK: the counts are facts about the ARGUMENT — a
    // two-clause cycle is what a deadlock is, §6.7 names four costs, the AC names four
    // pilot terms — and the geometry is the borrower. The module holds these as
    // type-level pins through a type-only `import()`; this is the value-level half,
    // because a pin that goes vacuous (a tuple widened to `string[]`) says nothing
    // silently.
    expect(DEADLOCK_CLAUSE_COUNT).toBe(C.deadlockClauses.length);
    expect(COST_COUNT).toBe(C.costs.length);
    expect(CONSTRAINT_COUNT).toBe(C.pilotConstraints.length);
    expect(DEADLOCK_CLAUSE_COUNT).toBe(2);
    expect(COST_COUNT).toBe(4);
    expect(CONSTRAINT_COUNT).toBe(4);
  });

  test("both lists fit the budget they are cut for — and a fifth row of either does not", () => {
    // THE RELATION THE MODULE CANNOT EXPRESS AT THE TYPE LEVEL, and says so: the
    // capacities are computed `number`s, so `COST_COUNT <= COST_ROW_CAPACITY` belongs
    // here. Both capacities are DERIVED from their budgets, so lowering the verdict or
    // widening a gap lowers a capacity in the same edit.
    expect(COST_ROW_CAPACITY).toBe(4);
    expect(CONSTRAINT_ROW_CAPACITY).toBe(4);
    expect(COST_COUNT).toBeLessThanOrEqual(COST_ROW_CAPACITY);
    expect(CONSTRAINT_COUNT).toBeLessThanOrEqual(CONSTRAINT_ROW_CAPACITY);

    // TWO CAPACITIES, TWO DIFFERENT NEIGHBOURS, and the arithmetic says which — the
    // pitch is private to the module, so it is measured off the two derivations rather
    // than re-typed from a constant this file cannot see.
    const billPitch = costRowTop(1) - costRowTop(0);
    const cardPitch = constraintRowTop(1) - constraintRowTop(0);
    expect(billPitch).toBeGreaterThan(LIST_ROW_HEIGHT);
    expect(cardPitch).toBeGreaterThan(LIST_ROW_HEIGHT);

    // A FIFTH COST ROW HITS THE FLOOR. Everything under the bill hangs off the row
    // count, so the rule and the verdict TRAVEL with a fifth row instead of being hit by
    // it — and the verdict's box then ends inside the NavBar's hover band.
    expect(VERDICT_TOP + VERDICT_HEIGHT).toBeLessThanOrEqual(NAV_ZONE_TOP);
    expect(
      VERDICT_TOP + billPitch + VERDICT_HEIGHT,
      "a fifth cost row puts the verdict inside the NavBar band",
    ).toBeGreaterThan(NAV_ZONE_TOP);

    // A FIFTH PILOT TERM HITS THE TURN LINE. The card's bottom is pinned to the bill's
    // floor, so it grows UPWARD, away from the band and into the sentence above it.
    expect(TURN_TO_CARD, "the card's top border clears the turn's box today").toBeGreaterThanOrEqual(
      16,
    );
    expect(
      CARD_TOP - cardPitch,
      "a fifth pilot term puts the card's top border inside the turn's box",
    ).toBeLessThan(COLUMN_TOP + TURN_HEIGHT);
    // AND THE BAND TAKES NO PART IN IT — the card's bottom edge is 150px above it, which
    // is why the throw message below may not blame it.
    expect(COST_ROWS_BOTTOM).toBeLessThan(NAV_ZONE_TOP);
  });

  test("nothing on the stage crosses the NavBar's hover band or the deck's margins", () => {
    // THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM: `bottom: 80px`
    // would put a floor at y=640, 8px INSIDE `.nav-zone` (`bottom: 0; height: 88px`),
    // and a box there is a box the presenter's own pointer makes the chrome fade up
    // over. `NAV_ZONE_TOP` re-derives the CSS rule, so this pins the rule and the stage.
    expect(STAGE).toEqual({ width: 1280, height: 720 });
    expect(SIDE_MARGIN).toBe(48);
    expect(CONTENT_WIDTH).toBe(1280 - 2 * 48);
    expect(NAV_ZONE_TOP).toBe(720 - 88);
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);

    // Held over the RENDERED boxes, because over the constants the horizontal half is
    // an identity (`STORY_COL_W` is the remainder of `CONTENT_WIDTH`) and the last
    // commit deleted a check of exactly that shape. What can fail is a box that
    // hardcoded a width or took the wrong column's.
    const { unmount } = renderSlide(3);
    let lowest = { id: "", bottom: 0 };
    for (const id of EVERY_BOX) {
      const geo = geometryOf(id);
      expect(geo.left, `${id} clears the left margin`).toBeGreaterThanOrEqual(SIDE_MARGIN);
      expect(geo.left + geo.width, `${id} clears the right margin`).toBeLessThanOrEqual(
        STAGE.width - SIDE_MARGIN,
      );
      expect(geo.top, `${id} starts on or below the content shelf`).toBeGreaterThanOrEqual(
        COLUMN_TOP,
      );
      expect(geo.top + geo.height, `${id} stays above the NavBar band`).toBeLessThanOrEqual(
        NAV_ZONE_TOP,
      );
      if (geo.top + geo.height > lowest.bottom) lowest = { id, bottom: geo.top + geo.height };
    }

    // AND THE LOWEST BOX ON THE STAGE IS BEAT 3 — the claim `NAV_ZONE_CLEARANCE` is
    // measured from, and the one a browser check reads back off the element.
    expect(lowest.id).toBe("chicken-egg-verdict");
    expect(NAV_ZONE_TOP - lowest.bottom).toBe(NAV_ZONE_CLEARANCE);
    unmount();
  });

  test("every box declares the shelf the geometry module places it on", () => {
    // STRUCTURAL, because jsdom places nothing: each box reads its own coordinate from
    // the module, so a box and the budget it is supposed to sit in cannot disagree. The
    // two lists' rows also share ONE row height, which is the copy module's claim about
    // them — the bill and the terms are the same object twice, and what differs is the
    // budget each has, not the shape of a row.
    const { unmount } = renderSlide(3);
    const shelves: ReadonlyArray<readonly [string, number, number]> = [
      ...CLAUSE_IDS.map((id, i) => [id, clauseTop(i), CLAUSE_HEIGHT] as const),
      ["chicken-egg-workaround", WORKAROUND_TOP, WORKAROUND_HEIGHT],
      ["chicken-egg-costs-eyebrow", COSTS_EYEBROW_TOP, EYEBROW_HEIGHT],
      ...COST_IDS.map((id, i) => [id, costRowTop(i), LIST_ROW_HEIGHT] as const),
      ["chicken-egg-rule", RULE_TOP, RULE_HEIGHT],
      ["chicken-egg-verdict", VERDICT_TOP, VERDICT_HEIGHT],
      ["chicken-egg-turn", COLUMN_TOP, TURN_HEIGHT],
      ["chicken-egg-card", CARD_TOP, CARD_HEIGHT],
      ["chicken-egg-pilot-eyebrow", CARD_EYEBROW_TOP, EYEBROW_HEIGHT],
      ...TERM_IDS.map((id, i) => [id, constraintRowTop(i), LIST_ROW_HEIGHT] as const),
    ];
    for (const [id, top, height] of shelves) {
      const geo = geometryOf(id);
      expect(geo.top, `${id} shelf`).toBe(top);
      expect(geo.height, `${id} box height`).toBe(height);
    }

    // THE GAP LADDER, WHICH IS THE PART OF THESE SHELVES THAT CAN FAIL.
    // `expect(COST_ROWS_TOP).toBe(costRowTop(0))` and its `CONSTRAINT_ROWS_TOP` twin stood
    // here until 2026-08-05 and were IDENTITIES: `costRowTop(index)` returns
    // `COST_ROWS_TOP + index * pitch`, so at index 0 both sides are the same expression and
    // the check held for every value of every constant in it — the shape this file condemns
    // 140 lines above and `HEAD` records deleting twice.
    //
    // What the geometry module actually CLAIMS about these shelves is an ORDER over its four
    // private gaps, and that is falsifiable by any one of them: an eyebrow binds tighter to
    // its own list (12) than two rows of that list bind to each other (16), which binds
    // tighter than the confession binds to the label over its bill (24), which binds tighter
    // than the beat change between beat 1 and beat 2 (40, "the largest in either column").
    // Both lists take the SAME eyebrow gap, which is the module's "used by both lists" and
    // the reason there is one `EYEBROW_HEIGHT` — and that one is a structural equality across
    // two independently written derivations, so a second gap constant introduced for the card
    // fails here.
    const eyebrowToBill = COST_ROWS_TOP - (COSTS_EYEBROW_TOP + EYEBROW_HEIGHT);
    const eyebrowToTerms = CONSTRAINT_ROWS_TOP - (CARD_EYEBROW_TOP + EYEBROW_HEIGHT);
    const betweenRows = costRowTop(1) - (costRowTop(0) + LIST_ROW_HEIGHT);
    const confessionToLabel = COSTS_EYEBROW_TOP - (WORKAROUND_TOP + WORKAROUND_HEIGHT);
    const beatChange =
      WORKAROUND_TOP - (clauseTop(DEADLOCK_CLAUSE_COUNT - 1) + CLAUSE_HEIGHT);
    expect(eyebrowToTerms, "one eyebrow-to-list gap for both lists").toBe(eyebrowToBill);
    expect(eyebrowToBill, "an eyebrow binds tighter to its list than its rows do to each other")
      .toBeLessThan(betweenRows);
    expect(betweenRows, "two rows of one list bind tighter than the confession to its label")
      .toBeLessThan(confessionToLabel);
    expect(confessionToLabel, "the beat change is the largest gap in the column").toBeLessThan(
      beatChange,
    );
    // The terms also take the CARD's measure rather than shrink-wrapping against the stage —
    // an absolutely-positioned box with no width would let an over-long term run past the
    // border to x=1280 with `scrollWidth === clientWidth` the whole way. Read `CARD_MEASURE`
    // from the geometry module rather than recomputing `OFFER_COL_W − 2 × CARD_PAD` here, and
    // then check it against the RENDERED card's own edges, which is the half that can fail.
    const cardBox = geometryOf("chicken-egg-card");
    expect(cardBox.width, "the card takes the offer column's measure").toBe(OFFER_COL_W);
    for (const id of ["chicken-egg-pilot-eyebrow", ...TERM_IDS]) {
      const geo = geometryOf(id);
      expect(geo.left, `${id}`).toBe(OFFER_COL_LEFT + CARD_PAD);
      expect(geo.width, `${id}`).toBe(CARD_MEASURE);
      expect(
        geo.left + geo.width,
        `${id} stops one padding short of the card's own right edge`,
      ).toBe(cardBox.left + cardBox.width - CARD_PAD);
    }
    unmount();
  });

  test("and it refuses a row it cannot hold, with a message that names the real collision", () => {
    // THE MESSAGE IS PART OF THE CONTRACT, not decoration. gh#56 shipped a row cap whose
    // message blamed the NavBar band 80px away when the real collision was a fixed
    // shelf, and the cost was two comments, two throw messages and two tests all
    // pointing a later author at the wrong number — who would then have measured the
    // band, found room, and widened the guard. So each guard is asserted to name the
    // neighbour that actually refuses the row, and to disclaim the one that does not.

    // BEAT 1 · a third clause is not a deadlock — refused on the argument, not the room.
    expect(() => clauseTop(DEADLOCK_CLAUSE_COUNT)).toThrow(/no clause 2/);
    expect(() => clauseTop(DEADLOCK_CLAUSE_COUNT)).toThrow(/a third clause is not a deadlock/);
    expect(() => clauseTop(-1)).toThrow(/no clause -1/);
    expect(() => clauseTop(0.5)).toThrow(/no clause 0\.5/);

    // THE BILL · the FLOOR refuses a fifth row, and the message says the rule and the
    // verdict are not what it collides with — they travel with the row count.
    expect(() => costRowTop(COST_ROW_CAPACITY)).toThrow(/no cost row 4/);
    expect(() => costRowTop(COST_ROW_CAPACITY)).toThrow(/hover band/);
    expect(() => costRowTop(COST_ROW_CAPACITY)).toThrow(
      /rule and the verdict are not what it collides with/,
    );
    expect(() => costRowTop(-1)).toThrow(/no cost row -1/);
    expect(() => costRowTop(1.5)).toThrow(/no cost row 1\.5/);

    // THE CARD · the TURN LINE refuses a fifth term, and the message disclaims the band
    // explicitly, because the card's bottom is pinned and it grows the other way.
    expect(() => constraintRowTop(CONSTRAINT_ROW_CAPACITY)).toThrow(/no pilot term 4/);
    expect(() => constraintRowTop(CONSTRAINT_ROW_CAPACITY)).toThrow(/grows the card UPWARD/);
    expect(() => constraintRowTop(CONSTRAINT_ROW_CAPACITY)).toThrow(
      /NavBar's band is not the constraint here/,
    );
    expect(() => constraintRowTop(-1)).toThrow(/no pilot term -1/);
    expect(() => constraintRowTop(2.5)).toThrow(/no pilot term 2\.5/);

    // AND EVERY INDEX THE COPY ACTUALLY USES IS ACCEPTED, so a guard cannot be made
    // "safe" by refusing everything.
    for (let i = 0; i < DEADLOCK_CLAUSE_COUNT; i++) expect(clauseTop(i)).toBeGreaterThan(0);
    for (let i = 0; i < COST_COUNT; i++) expect(costRowTop(i)).toBeGreaterThan(0);
    for (let i = 0; i < CONSTRAINT_COUNT; i++) expect(constraintRowTop(i)).toBeGreaterThan(0);
  });
});
