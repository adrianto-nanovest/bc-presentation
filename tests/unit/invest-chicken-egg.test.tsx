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
// ticket's TASK 5, which measures the composed slide in Chromium at 1280×720. That work
// landed as `scripts/d3-figure-verify.mjs` and NOT as the `scripts/gh57-verify.mjs` this
// paragraph used to name: the 2026-08-14 redraw retired #57's contract entirely, that
// harness stopped even loading, and it was deleted on 2026-08-15. Neither half alone is the
// AC; both are owed, and `d3-figure-verify.mjs` is where the browser half now lives.
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
//   3. A SECOND PASS AT SHADOW AI THAT REPEATS THE FIRST (§6.2). ALL THREE PASSES ARE
//      NOW BUILT — #58 shipped D.4 and gh#66 shipped B.2 (`gap-no-sop`) — so this is no
//      longer a token guard held against spec text on one side. B.2's copy module is
//      IMPORTED here and the rule is run over its rendered strings in BOTH directions:
//      none of B.2's image tokens in D.3's copy, none of D.3's in B.2's, no phrase of
//      three words shared either way, and no statistic shared because B.2 prints no
//      digit at all. The limits of a token rule are still stated where it lives.
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
// B.2's OWN COPY — §6.2's `condition` pass (`gap-no-sop`, gh#66). Imported rather than
// transcribed so the disjointness rules below run against what that slide actually
// prints today and fail the day either side's copy moves toward the other.
import { gapNoSopContent } from "@/slides/leader-gap/content";
import { BRANDS, type Brand } from "@/deck-variants";
import {
  ACT_TOP,
  BAND_TOP,
  BEAT_W,
  BEAT_HEIGHT,
  CLAUSE_HEIGHT,
  CLAUSE_LEFT,
  CLAUSE_W,
  CONSTRAINT_COUNT,
  CONTENT_RIGHT,
  CONTENT_WIDTH,
  COST_COUNT,
  COST_HEIGHT,
  COST_TOP,
  DEADLOCK_CLAUSE_COUNT,
  DEST_BOTTOM,
  DEST_H,
  DEST_LEFT,
  DEST_TOP,
  DEST_W,
  DEST_WORD_HEIGHT,
  FIGURE_BOTTOM,
  ITEM_COUNT,
  ITEM_GAP,
  ITEM_PITCH,
  ITEM_W,
  LANE_LEFT,
  LOCK_TOKEN_SCALE,
  LOCK_TRAVEL_X,
  LOCK_TRAVEL_Y,
  LONG_LABEL_TOP,
  LONG_LANE_Y,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  POLE_GLYPH_SIZE,
  POLE_H,
  POLE_W,
  POLE_WORD_TOP,
  PROOF_HERO_LEFT,
  RING_CX,
  RING_CY,
  ROAD_LABEL_HEIGHT,
  ROAD_LABEL_W,
  RULE_HEIGHT,
  RULE_TOP,
  SHORT_LABEL_TOP,
  SHORT_LANE_Y,
  SIDE_MARGIN,
  STAGE,
  TERM_HEIGHT,
  TERM_TOP,
  THESIS_HEIGHT,
  THESIS_TOP,
  TOKEN_CX,
  TOKEN_LABEL_HEIGHT,
  TOKEN_LABEL_LEFT,
  TOKEN_LABEL_W,
  TURN_TOP,
  VERDICT_TOP,
  clauseTop,
  itemCenterX,
  itemLeft,
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
 * **D.3, which is §6.7's D.3 at last** — measured rather than assumed, and re-measured on
 * gh#70. This read D.2 from gh#57 until then, on a measurement recorded here: composing
 * both leader decks in their own module epoch on 2026-08-05 derived `invest-own-proof` at
 * D.1 and this slide at D.2, 61 slides to a deck, closer M.3. THAT MEASUREMENT IS HISTORY
 * ON EVERY AXIS — the leader decks are 70 rows and close on N.3 — and the gap it explained
 * is closed: §6.7 numbered this slide D.3 because §6.7 describes the FINISHED section, and
 * gh#70 built `invest-base-rates` (§6.7's D.1) at the run's HEAD, so the section IS
 * finished and every row in it derives its own spec number. Re-measured off
 * `tests/fixtures/deck-numbering.json`, which records D.1–D.5 for the five `invest` rows
 * in both leader decks.
 *
 * THE DAY THIS COMMENT PREDICTED HAS COME, AND IT COST THIS FILE ONE DIGIT — with one
 * correction. It said "the day D.1 lands, both leader slides move one number"; FOUR moved,
 * not two, because gh#58 and gh#59 had lengthened the run behind this slide in the
 * meantime. What R3 renumbers is every row behind the insert inside its run, and no file
 * under `src/slides/leader-invest/` was opened for any of the four. Neither the letter nor
 * the number is authored in the slide (§3.5), so this is a harness INPUT and not a claim
 * the slide makes.
 */
const AT = { letter: "D", num: 4, sectionKey: "invest" } as const;

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

/** Beat 1 — the deadlock, drawn as a closed cycle: the BUDGET pole, then the two clauses that
 *  label its two arcs. (The PROOF pole is not here: it is the one box that survives into act 2,
 *  so it is never revealed and never hidden — see {@link PLATE_BOXES}.) */
const BEAT_1 = ["chicken-egg-pole-budget", ...CLAUSE_IDS];
/** Beat 2 — the long road, what we did on it, and the bill for it. */
const BEAT_2 = [
  "chicken-egg-lock-label",
  "chicken-egg-workaround",
  "chicken-egg-costs-eyebrow",
  ...COST_IDS,
];
/** Beat 3 — the verdict that licenses beat 2, alone, and LAST in its pose. */
const BEAT_3 = ["chicken-egg-verdict"];
/** Beat 4 — the turn, the road it names, and the four limits on it. */
const BEAT_4 = [
  "chicken-egg-turn",
  "chicken-egg-key-label",
  "chicken-egg-pilot-eyebrow",
  ...TERM_IDS,
];
/**
 * NOT A BEAT — the deck's own floor (§4.5).
 *
 * §6.7 gives this slide four beats and the 2026-08-14 rework added a fifth object under them:
 * a copper rule and a one-line thesis at the shelf D.1 and D.2 use. It is listed separately
 * BECAUSE it is not §6.7's, so the beat assertions below stay assertions about §6.7 — and it
 * is still inside every order, presence and margin rule, because it is on the stage.
 */
const CLOSER = ["chicken-egg-rule", "chicken-egg-thesis"];

/** The four beats in §6.7's order, then the floor — the order every assertion below is written
 *  over. */
const BEATS = [BEAT_1, BEAT_2, BEAT_3, BEAT_4, CLOSER] as const;
const EVERY_BOX = BEATS.flat();

/**
 * The destination plate and the two boxes inside it.
 *
 * THEY ARE NOT `Reveal`s AND THEY ARE NOT STAGE-RELATIVE, which is why they are held apart from
 * {@link EVERY_BOX} rather than added to it:
 *   · `chicken-egg-proof-plate` is on the stage at EVERY pose. It does not arrive — it MOVES,
 *     from the ring's right pole to the destination both roads end on, through a CSS transition
 *     on five layout properties. A reveal check on it would be a check on a box that has no
 *     reveal.
 *   · The eyebrow and its hairline are positioned INSIDE the plate, so their `left` and `top`
 *     are plate-local. Feeding them to a stage-margin rule would compare 16 against 48 and fail
 *     for a reason that is not about the stage.
 */
const PLATE_BOXES = [
  "chicken-egg-proof-plate",
  "chicken-egg-destination-eyebrow",
  "chicken-egg-destination-rule",
] as const;

/**
 * The marks in the SVG layer, by the pose each one belongs to.
 *
 * A SEPARATE CENSUS BECAUSE THEY ARE A SEPARATE PRIMITIVE. Every `<g>` in the figure is the
 * component's own `Mark` — opacity and a delay, no transform — because `.fade` owns `transform`
 * and half of these marks carry one of their own (the lock's travel, the heads' pop, the key's
 * turn, the ticks' drop). So they carry no `.fade` class, `revealed()` cannot read them, and
 * they have no `style.left`. What a DOM test CAN hold is that each one is mounted, and that its
 * inline opacity follows the pose it belongs to — which is the assertion `the drawn layer`
 * block below makes.
 */
const MARKS_BY_POSE: ReadonlyArray<readonly string[]> = [
  ["chicken-egg-arcs", "chicken-egg-arc-heads"],
  [
    "chicken-egg-long-road",
    "chicken-egg-ban",
    ...C.costs.map((cost) => `chicken-egg-toll-${cost.id}`),
  ],
  ["chicken-egg-short-road", "chicken-egg-key-mark", "chicken-egg-short-head"],
  C.pilotConstraints.map((term) => `chicken-egg-termnode-${term.id}`),
];
const EVERY_MARK = MARKS_BY_POSE.flat();

/** The boxes that carry TYPE. The rule is a hairline and nothing else, so a rule over "every
 *  string on the stage" must not ask it for one. */
const TEXT_BOXES = EVERY_BOX.filter((id) => id !== "chicken-egg-rule");

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

/** The FIVE prose lines, each with the `*Kw` sibling the copy module pairs it with — §6.7's
 *  four beats plus the closer the 2026-08-14 rework put on §4.5's thesis shelf. Everything else
 *  in `authoredStrings()` is a LABEL and may not gain one, including the five figure labels that
 *  arrived with the redraw. */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ["workaround", C.workaround, C.workaroundKw],
  ["verdict", C.verdict, C.verdictKw],
  ["turn", C.turn, C.turnKw],
  ["closer", C.closer, C.closerKw],
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

    // AND THE DRAWN LAYER, which is mounted whole from pose 0 for the same reason: one `<svg>`
    // and every mark inside it, so nothing reflows and the poses only change opacity.
    for (const id of EVERY_MARK) {
      expect(screen.getByTestId(id), id).toBeInTheDocument();
    }
    for (const id of PLATE_BOXES) {
      expect(screen.getByTestId(id), id).toBeInTheDocument();
    }
    expect(screen.getByTestId("chicken-egg-svg")).toBeInTheDocument();
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

    // AND THE POSES THEMSELVES, pinned — the split AC 3 is written about. Beat 1 opens at pose
    // 0; beats 2 AND 3 both land at pose 1; beat 4 is the WHOLE of pose 2; the floor closes on 3.
    //
    // BEAT 4 TOOK TWO POSES UNTIL 2026-08-14 (the turn, then its four limits) and takes one now,
    // which is the owner's call and the reason this line is written as "every box of beat 4 at
    // pose 2" rather than as two halves: a pose is a resting state, and a state that offered a
    // pilot with no terms on it was a stage a room could not question until the next keypress.
    // What the join freed is the FLOOR — pose 3 is the rule and the thesis, alone.
    expect(BEAT_1.map((id) => rankOf(ranks, id)[0])).toEqual(BEAT_1.map(() => 0));
    expect(BEAT_2.map((id) => rankOf(ranks, id)[0])).toEqual(BEAT_2.map(() => 1));
    expect(BEAT_3.map((id) => rankOf(ranks, id)[0])).toEqual([1]);
    expect(BEAT_4.map((id) => rankOf(ranks, id)[0])).toEqual(BEAT_4.map(() => 2));
    expect(CLOSER.map((id) => rankOf(ranks, id)[0])).toEqual([3, 3]);

    // AND NOTHING BUT THE FLOOR IS LEFT FOR THE LAST POSE, which is the other half of that call
    // and the half a presence check cannot see: every §6.7 beat has landed by pose 2.
    expect(EVERY_BOX.filter((id) => rankOf(ranks, id)[0] === 3)).toEqual([...CLOSER]);

    // THE THESIS IS THE LAST ARRIVAL ON THE SLIDE — the owner's instruction, held as a fact
    // about the whole stage rather than about its own pose. Nothing may be added after it.
    const last = EVERY_BOX.reduce((a, b) => (before(rankOf(ranks, a), rankOf(ranks, b)) ? b : a));
    expect(last).toBe("chicken-egg-thesis");
    unmount();
  });

  test("the READING order is two lanes, each with its label over it and its boxes under it", () => {
    // TWO LANES AND NOT TWO COLUMNS, which is what the redraw changed about this assertion.
    // The stage no longer splits left/right; it splits into a SHORT ROAD and a LONG ROAD 170px
    // apart, and every box belongs to one of them. So the claim is: each lane's own boxes
    // descend in the order they are read — the label over the road, the road's marks on it, the
    // item boxes under it — the two lanes never overlap each other, and the whole figure sits
    // above the floor the thesis owns.
    const { unmount } = renderSlide(3);

    // LANE 1 · THE OFFER, top to bottom.
    expect(geometryOf("chicken-egg-turn").top).toBe(TURN_TOP);
    expect(SHORT_LABEL_TOP + ROAD_LABEL_HEIGHT).toBeLessThan(SHORT_LANE_Y);
    expect(SHORT_LANE_Y).toBeLessThan(TERM_TOP);
    expect(TERM_TOP + TERM_HEIGHT).toBeLessThan(ACT_TOP);

    // LANE 2 · THE STORY WE TELL AGAINST IT, in the same grammar.
    expect(ACT_TOP + BEAT_HEIGHT).toBeLessThan(LONG_LABEL_TOP);
    expect(LONG_LABEL_TOP + ROAD_LABEL_HEIGHT).toBeLessThan(LONG_LANE_Y);
    expect(LONG_LANE_Y).toBeLessThan(COST_TOP);
    expect(COST_TOP + COST_HEIGHT).toBeLessThan(VERDICT_TOP);

    // THE TWO LANES DO NOT TOUCH: everything the offer owns ends above everything the story
    // owns. This is the property the 170px between the roads exists to buy, and it is the one
    // that fails first if any box grows.
    expect(TERM_TOP + TERM_HEIGHT).toBeLessThan(LONG_LABEL_TOP);

    // AND THE FLOOR IS CLEAR OF BOTH. `FIGURE_BOTTOM` is the module's own assertion of this
    // (it throws at load if the figure reaches the rule); this is the value-level half.
    expect(FIGURE_BOTTOM).toBe(VERDICT_TOP + BEAT_HEIGHT);
    expect(FIGURE_BOTTOM).toBeLessThan(RULE_TOP);
    expect(RULE_TOP + RULE_HEIGHT).toBeLessThan(THESIS_TOP);

    // ONE COLUMN GRID FOR BOTH ROWS — the figure's sharpest claim, and the reason the bill and
    // the offer can be read as a comparison. Term `i` sits directly over cost `i`, at the same
    // left edge and the same width, because both call `itemLeft`.
    for (let i = 0; i < ITEM_COUNT; i++) {
      const term = geometryOf(TERM_IDS[i]);
      const cost = geometryOf(COST_IDS[i]);
      expect(term.left, `term ${i} is on the grid`).toBe(itemLeft(i));
      expect(cost.left, `cost ${i} is on the grid`).toBe(itemLeft(i));
      expect(term.width).toBe(ITEM_W);
      expect(cost.width).toBe(ITEM_W);
      if (i > 0) {
        expect(itemLeft(i) - itemLeft(i - 1), "one pitch").toBe(ITEM_PITCH);
        expect(itemLeft(i) - (itemLeft(i - 1) + ITEM_W), "one gap").toBe(ITEM_GAP);
      }
    }

    // THE GRID STOPS SHORT OF THE PLATE BOTH ROADS END ON, by exactly one gap — so the last
    // box in either row cannot run under the destination.
    expect(itemLeft(ITEM_COUNT - 1) + ITEM_W).toBeLessThanOrEqual(DEST_LEFT - ITEM_GAP);

    // BOTH ROADS END ON ONE PLATE, and the plate spans both lanes. This is the whole picture in
    // three numbers: it starts above the short road and finishes below the long one.
    const plate = geometryOf("chicken-egg-proof-plate");
    expect(plate.left).toBe(DEST_LEFT);
    expect(plate.top).toBe(DEST_TOP);
    expect(plate.width).toBe(DEST_W);
    expect(plate.height).toBe(DEST_H);
    expect(DEST_TOP).toBeLessThan(SHORT_LANE_Y);
    expect(DEST_BOTTOM).toBeGreaterThan(LONG_LANE_Y);
    expect(plate.left + plate.width).toBe(CONTENT_RIGHT);
    unmount();
  });

  test("the PROOF plate is one box in two placements, and act 1 is the only pose that sets", () => {
    // THE ONE OBJECT ON THE STAGE THAT MOVES INSTEAD OF ARRIVING. At pose 0 it is the ring's
    // right-hand pole; from pose 1 it is the destination. The claim a DOM test can hold is that
    // the SAME element carries both placements — not two boxes swapping — which is what makes
    // the room's "the thing I could not have is the thing both roads reach" free of a caption.
    const { unmount } = renderSlide(0);
    const at0 = geometryOf("chicken-egg-proof-plate");
    expect(at0.left).toBe(PROOF_HERO_LEFT);
    expect(at0.width).toBe(POLE_W);
    expect(at0.height).toBe(POLE_H);
    expect(screen.getByTestId("chicken-egg-proof-plate").dataset.placement).toBe("pole");

    goToPose(1);
    const at1 = geometryOf("chicken-egg-proof-plate");
    expect(at1.left).toBe(DEST_LEFT);
    expect(at1.width).toBe(DEST_W);
    expect(screen.getByTestId("chicken-egg-proof-plate").dataset.placement).toBe("destination");
    expect(screen.getByTestId("chicken-egg-proof-plate").className).toContain("ce-morph");

    // AND IT PRINTS ONE STRING IN BOTH PLACES, because it is one thing.
    expect(screen.getByTestId("chicken-egg-proof-word").textContent).toBe(C.proofLabel);
    expect(C.proofLabel).toBe("PROOF");

    // ACT 1 IS A SET, NOT A SUPERSESSION, and this is the `===` gate stated as a fact: the ring,
    // the BUDGET pole and the two clauses are on the stage at pose 0 and at no other pose. Every
    // other box on this slide is `>=` — once revealed it stays — so the exception is asserted
    // here rather than left to a comment.
    for (const pose of POSES) {
      goToPose(pose);
      for (const id of BEAT_1) {
        expect(revealed(id), `${id} at pose ${pose}`).toBe(pose === 0);
      }
      expect(
        screen.getByTestId("chicken-egg-ring").dataset.gone,
        `the ring at pose ${pose}`,
      ).toBe(pose === 0 ? "false" : "true");
    }
    unmount();
  });

  test("both poles centre their word, and each one carries its own glyph", () => {
    // THE 2026-08-14 OWNER REVIEW, HELD AS TWO FACTS ABOUT ACT 1 — the defect it found and the
    // thing it asked for.
    const { unmount } = renderSlide(0);

    // 1 · THE WORD SITS IN THE MIDDLE OF THE BOX IT IS IN. PROOF is one absolutely-placed box in
    // two placements, 50px tall in both, and it was pinned to `top: 0` at the pole — so a 50px
    // line box sat at the top of a 72px pole and the word rode 11px HIGH of the middle its
    // counterpart BUDGET is flex-centred in. Both placements are arithmetic now, and each is
    // centred in the box it is centred IN.
    const word = screen.getByTestId("chicken-egg-proof-word");
    expect(POLE_WORD_TOP).toBe((POLE_H - DEST_WORD_HEIGHT) / 2);
    expect(parseFloat(word.style.top)).toBe(POLE_WORD_TOP);
    expect(parseFloat(word.style.height)).toBe(DEST_WORD_HEIGHT);
    expect(parseFloat(word.style.top) + DEST_WORD_HEIGHT / 2, "centred in the pole").toBe(
      POLE_H / 2,
    );
    goToPose(1);
    const atPlate = screen.getByTestId("chicken-egg-proof-word");
    expect(parseFloat(atPlate.style.top) + DEST_WORD_HEIGHT / 2, "centred on the plate").toBe(
      DEST_H / 2,
    );

    // 2 · EACH POLE CARRIES A GLYPH, TO THE LEFT OF ITS WORD. A banknote for BUDGET and a signed
    // sheet for PROOF: act 1 used to be two words and a padlock, and a room had to READ all three
    // to learn what the figure claimed. Held as the DOM facts a layout engine is not needed for —
    // the element, its side of the word, its class (which is what `chicken-egg.css` hangs the
    // reach on) and the tier it is drawn at. That it LEANS is a computed-style claim and belongs
    // to `scripts/d3-figure-verify.mjs`.
    goToPose(0);
    const budgetGlyph = screen.getByTestId("chicken-egg-glyph-budget");
    const proofGlyph = screen.getByTestId("chicken-egg-glyph-proof");
    for (const glyph of [budgetGlyph, proofGlyph]) {
      expect(glyph.tagName.toLowerCase()).toBe("svg");
      expect(glyph.classList.contains("ce-glyph")).toBe(true);
      expect(glyph.getAttribute("stroke")).toBe("var(--copper-200)");
      expect(glyph.getAttribute("width")).toBe(String(POLE_GLYPH_SIZE));
      expect(glyph.getAttribute("viewBox")).toBe("0 0 24 24");
      // NO TEXT IN EITHER, which is what keeps every copy rule in this file whole: a glyph that
      // printed a currency sign would be a quantity this slide's own copy rule forbids.
      expect(glyph.textContent).toBe("");
    }
    // The direction each one leans is carried by its own class, so the two cannot both reach the
    // same way — which would be a heartbeat, and a heartbeat says nothing about a deadlock.
    expect(budgetGlyph.classList.contains("ce-glyph-budget")).toBe(true);
    expect(proofGlyph.classList.contains("ce-glyph-proof")).toBe(true);

    // ON THE LEFT OF THE TYPE, in both poles — asserted as first-child rather than as a
    // coordinate, because the pair is centred as one block by flexbox and neither has a `left`.
    expect(screen.getByTestId("chicken-egg-pole-budget").firstElementChild).toBe(budgetGlyph);
    expect(screen.getByTestId("chicken-egg-proof-word").firstElementChild).toBe(proofGlyph);

    // AND PROOF'S GLYPH LEAVES WITH THE POLE — unmounted, not faded, because the word's row is
    // `justify-content: center` and a glyph held at opacity 0 would go on holding its 26px and
    // push PROOF off the destination plate's own centre for every pose after the first.
    for (const pose of [1, 2, 3]) {
      goToPose(pose);
      expect(screen.queryByTestId("chicken-egg-glyph-proof"), `pose ${pose}`).toBeNull();
    }
    unmount();
  });

  test("every box on the item grid centres its own type, both rows", () => {
    // THE OTHER HALF OF THE 2026-08-14 REVIEW, and the reason is the VERTICAL each box hangs on.
    // All eight boxes drop from a mark on a road — a toll or a term node — placed on the column's
    // own centre line by `itemCenterX`, and flush-left type breaks that line for every box whose
    // string is shorter than the measure. Centred, the node, the tick and the words are one
    // vertical down the stage.
    const { unmount } = renderSlide(3);
    for (const id of [...TERM_IDS, ...COST_IDS]) {
      const box = screen.getByTestId(id);
      expect(box.style.display, id).toBe("flex");
      expect(box.style.alignItems, id).toBe("center");
      expect(box.style.justifyContent, id).toBe("center");
      // `text-align` IS THE HALF `justify-content` CANNOT DO: the flex rule centres the span in
      // the box, and this centres the LINES inside the span — which is the only one of the two
      // that is visible on the fourth cost, the one string on the grid that sets two lines.
      expect(box.querySelector("span")?.style.textAlign, id).toBe("center");
    }
    unmount();
  });

  test("the padlock travels rather than leaving, and the arithmetic lands it in its token", () => {
    // THE MARK THAT CARRIES THE CLAIM ACROSS THE ACT CHANGE. Everything else in act 1 is set;
    // the lock is not, and if it were the token at the long road's head would be an unexplained
    // 33px glyph. Held three ways, none of which needs a layout engine.
    const { unmount } = renderSlide(0);
    const lock = screen.getByTestId("chicken-egg-lock");
    expect(lock.dataset.parked).toBe("false");
    expect(lock.classList.contains("ce-lock")).toBe(true);
    expect(lock.classList.contains("ce-lock-parked")).toBe(false);

    goToPose(1);
    expect(screen.getByTestId("chicken-egg-lock").dataset.parked).toBe("true");
    expect(screen.getByTestId("chicken-egg-lock").classList.contains("ce-lock-parked")).toBe(true);

    // THE TRAVEL IS DERIVED, NOT TYPED. Both offsets are DIFFERENCES between two placements the
    // geometry module already declares, so a redraw of the ring re-cuts the journey — which is
    // exactly what a hard-coded `-546px` in the stylesheet would not do.
    expect(LOCK_TRAVEL_X).toBe(90 - RING_CX);
    expect(LOCK_TRAVEL_Y).toBe(LONG_LANE_Y - RING_CY);
    expect(RING_CX + LOCK_TRAVEL_X, "the lock lands on the long road's token").toBe(90);
    expect(RING_CY + LOCK_TRAVEL_Y).toBe(LONG_LANE_Y);
    expect(LOCK_TOKEN_SCALE).toBeGreaterThan(0);
    expect(LOCK_TOKEN_SCALE).toBeLessThan(1);
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
      ["chicken-egg-thesis", C.closerKw],
    ] as const) {
      expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(kw.length);
    }
    // And no LABEL is rendered through the highlighter.
    for (const id of [
      ...CLAUSE_IDS,
      "chicken-egg-costs-eyebrow",
      "chicken-egg-pilot-eyebrow",
      "chicken-egg-lock-label",
      "chicken-egg-key-label",
      "chicken-egg-destination-eyebrow",
      "chicken-egg-pole-budget",
      "chicken-egg-proof-word",
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
      // The bill reads ACROSS the road in the same order it arrives in — one row of four
      // boxes on one shelf, not a column, because each box hangs off its own toll.
      const box = geometryOf(`chicken-egg-cost-${cost.id}`);
      expect(box.top, cost.id).toBe(COST_TOP);
      expect(box.left, cost.id).toBe(itemLeft(i));
      // And its toll sits on the road directly above it, which is what binds a mark on a road
      // to the words that price it.
      expect(itemCenterX(i), cost.id).toBe(box.left + ITEM_W / 2);
      expect(LONG_LANE_Y, cost.id).toBeLessThan(box.top);
    });

    // The eyebrow labels the row it belongs to: over the road, above the boxes, and below the
    // confession the bill is the price of.
    expect(LONG_LABEL_TOP).toBeLessThan(LONG_LANE_Y);
    expect(ACT_TOP).toBeLessThan(LONG_LABEL_TOP);
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

      // THE BILL IS ALL OR NOTHING. A half-revealed bill is a pose that ends on part of
      // beat 2, and it is what a per-row gate would produce.
      expect(new Set(bill).size, `pose ${pose}: the bill is one gate`).toBe(1);

      if (!bill[0]) continue;
      expect(verdictOn, `pose ${pose} shows the bill, so it must show the verdict`).toBe(true);

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

    // THE COPPER RULE IS NO LONGER BEAT 3'S — it moved to the floor in the 2026-08-14 rework,
    // where it opens the thesis band the way D.1's does. So it arrives AFTER the verdict, not
    // before it, and the check is written that way round rather than deleted: a rule that
    // drifted back above the verdict would put a divider in the middle of the story.
    expect(before(rankOf(ranks, "chicken-egg-verdict"), rankOf(ranks, "chicken-egg-rule"))).toBe(
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
    // (`ChickenEggBeats.tsx`'s `TIER`). jsdom can hold all four as long as it claims nothing
    // about brightness: a CSS variable is a token here, not a luminance. The ladder that file
    // records was measured in Chromium; re-measuring it belongs to `scripts/d3-figure-verify.mjs`.
    //
    // WHAT CHANGED IN THE REWORK, AND WHY THIS TEST DID NOT GET WEAKER. Beat 3 used to be the
    // BIGGEST prose on the stage — 26px over two lines — and it is now 17px, ranked with the
    // other beats, because the floor belongs to the thesis. So channel 2 is no longer "the
    // biggest" and is written as what it actually is: beat 3 out-ranks the confession it
    // licenses, in COLOUR, which is the relation that matters and the one a resize cannot fake.
    const { unmount } = renderSlide(3);
    const verdict = screen.getByTestId("chicken-egg-verdict");

    // 1 · THE BRIGHTEST TIER, AND SHARED ONLY WITH THE SENTENCES THAT SUPERSEDE IT. Four boxes
    // take `--neutral-100`: the verdict, the turn, the thesis and the four terms. Nothing may
    // reach over them to `--neutral-50`, which is the headline's — the headline is the premise
    // and stays the brightest type on the stage.
    expect(verdict.style.color).toBe("var(--neutral-100)");
    const bright = TEXT_BOXES.filter(
      (id) => screen.getByTestId(id).style.color === "var(--neutral-100)",
    );
    expect(bright).toContain("chicken-egg-verdict");
    expect(bright).toContain("chicken-egg-turn");
    expect(bright).toContain("chicken-egg-thesis");
    for (const id of TEXT_BOXES) {
      expect(screen.getByTestId(id).style.color, `${id} may not take the headline's tier`).not.toBe(
        "var(--neutral-50)",
      );
    }

    // 2 · IT OUT-RANKS THE CONFESSION IT LICENSES. Beat 2 is the ONLY sentence on this stage a
    // tier below the rest, and that is the slide refusing to give its account of a workaround
    // the same weight as the verdict that closed it. If this ever inverts, the slide is
    // recommending the workaround.
    expect(screen.getByTestId("chicken-egg-workaround").style.color).toBe("var(--neutral-200)");
    expect(screen.getByTestId("chicken-egg-workaround").style.color).not.toBe(verdict.style.color);

    // 3 · IT IS THE LAST THING ACT 2 PAINTS, and the only box between the bill and the deck's
    // own floor. Scoped to ACT 2 and not to the whole stage, deliberately: act 1's lower clause
    // sits at y=490…514, which is BELOW this shelf and would fail a stage-wide version of this
    // check — correctly, and for a reason that is not about the verdict. The two never share a
    // pose (act 1 is the `===` gate), so the claim that can be made is the one that is made.
    const act2Boxes = EVERY_BOX.filter(
      (box) => !CLOSER.includes(box) && !BEAT_1.includes(box) && box !== "chicken-egg-verdict",
    );
    expect(act2Boxes.length, "there are act-2 boxes to be last after").toBeGreaterThan(0);
    for (const id of act2Boxes) {
      const geo = geometryOf(id);
      expect(geo.top + geo.height, `${id} sits above the verdict`).toBeLessThanOrEqual(VERDICT_TOP);
    }
    expect(VERDICT_TOP + BEAT_HEIGHT).toBeLessThanOrEqual(RULE_TOP);

    // 4 · LAST IN ITS POSE — asserted in full by the walk above; restated here as the fourth
    // channel so that removing any one of these four leaves three failing tests rather than a
    // slide that quietly ranks its load-bearing beat below its bill.
    goToPose(1);
    expect(arrival("chicken-egg-verdict")).toBeGreaterThan(arrival(COST_IDS[COST_IDS.length - 1]));

    // AND IT SAYS WHAT §6.7 SAYS IT SAYS — WITH THE 2026-08-14 EDIT PINNED AS A LITERAL, because
    // this is the one string on the slide whose wording was a defect in the room it is shown in.
    // "Management was convinced" named the audience in the third person; this deck is presented
    // TO top management. The replacement keeps the event and drops the party.
    expect(C.verdict).toBe(
      "It worked. The proof did the convincing, and the full investment was released.",
    );
    expect(C.verdict, "the audience is not narrated at").not.toMatch(/\bmanagement\b/i);
    expect(screen.getByTestId("chicken-egg-verdict").textContent).toBe(C.verdict);
    expect(C.verdictKw).toEqual(["the full investment was released"]);
    unmount();
  });

  test("the thesis closes the slide on §4.5's shelf, in one line, after everything else", () => {
    // THE OWNER'S OTHER INSTRUCTION, held as four facts. Beat 3 used to own the floor at 26px
    // over two lines; the floor now belongs to a CLOSER — smaller, one line, full width, last.
    const { unmount } = renderSlide(3);
    const thesis = geometryOf("chicken-egg-thesis");

    // 1 · IT IS AT D.1's AND D.2's SHELF, to the pixel. §4.5 gives the leader deck ONE thesis
    // position and a room that reads three slides in a row wants the last line in one place.
    expect(thesis.left).toBe(SIDE_MARGIN);
    expect(thesis.width).toBe(CONTENT_WIDTH);
    expect(thesis.top).toBe(THESIS_TOP);
    expect(thesis.height).toBe(THESIS_HEIGHT);
    expect(NAV_ZONE_TOP - (thesis.top + thesis.height)).toBe(NAV_ZONE_CLEARANCE);
    expect(NAV_ZONE_CLEARANCE).toBe(16);

    // 2 · ONE LINE, WHICH IS WHAT THE BOX IS CUT FOR. 26px holds one line of 19px serif on 1.3
    // (24.70) and not two; the rendered line count is a browser fact and belongs to
    // `scripts/d3-figure-verify.mjs`, so what is held here is the budget.
    expect(THESIS_HEIGHT).toBe(26);
    expect(parseFloat(screen.getByTestId("chicken-egg-thesis").style.fontSize)).toBe(19);

    // 3 · SMALLER THAN IT WAS AND SMALLER THAN THE HEADLINE, but the largest prose on the stage
    // — every beat is 17px and the closer is 19. It is the last thing said, not the loudest
    // thing shown.
    const fontSize = (id: string) => parseFloat(screen.getByTestId(id).style.fontSize);
    expect(fontSize("chicken-egg-thesis")).toBeGreaterThan(fontSize("chicken-egg-verdict"));
    expect(fontSize("chicken-egg-verdict")).toBe(fontSize("chicken-egg-turn"));
    expect(fontSize("chicken-egg-turn")).toBe(fontSize("chicken-egg-workaround"));

    // 4 · IT IS THE ASK, NOT A SUMMARY. First person past, then second person present — the
    // same single turn beat 4 makes — and it names no signature, because B.1 and K.3 own that
    // word in this deck and three slides reaching for it would make three asks sound like one.
    expect(C.closer).toBe("We had to earn that proof the long way. You can simply authorise it.");
    expect(C.closer).toMatch(/\bYou can\b/);
    expect(C.closer, "B.1 and K.3 own 'signature'").not.toMatch(/\bsignatures?\b/i);
    expect(screen.getByTestId("chicken-egg-thesis").textContent).toBe(C.closer);
    expect(C.closerKw).toEqual(["simply authorise it"]);

    // AND THE RULE OPENS THE BAND BEFORE THE SENTENCE LANDS IN IT — D.1's order, so the closer
    // arrives into a band that already exists rather than opening one.
    goToPose(3);
    expect(arrival("chicken-egg-thesis")).toBeGreaterThan(arrival("chicken-egg-rule"));
    expect(geometryOf("chicken-egg-rule").top).toBe(RULE_TOP);
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

  test("all four reach the stage on the short road's own grid, at the closing pose", () => {
    const { unmount } = renderSlide(3);

    C.pilotConstraints.forEach((term, i) => {
      const row = screen.getByTestId(`chicken-egg-term-${term.id}`);
      expect(row.textContent, term.id).toBe(term.label);
      expect(revealed(`chicken-egg-term-${term.id}`), term.id).toBe(true);
      const box = geometryOf(`chicken-egg-term-${term.id}`);
      expect(box.top, term.id).toBe(TERM_TOP);
      expect(box.left, term.id).toBe(itemLeft(i));
      // Each limit hangs off its own node on the road it bounds — the same binding the bill has.
      expect(itemCenterX(i), term.id).toBe(box.left + ITEM_W / 2);
      expect(SHORT_LANE_Y, term.id).toBeLessThan(box.top);
    });

    // FOUR SOLID BOXES AGAINST FOUR DASHED ONES, WHICH IS THE COMPARISON THE FIGURE MAKES. The
    // bordered card is gone; what carries "these are terms, those were costs" now is the border
    // STYLE and the text tier, on boxes that are otherwise identical. `border-box` sizing is
    // load-bearing and not boilerplate: this repo ships no global `* { box-sizing: border-box }`,
    // so a content-box row would put its right edge 2px past the grid.
    for (const id of TERM_IDS) {
      const el = screen.getByTestId(id);
      expect(el.style.border, id).toContain("solid");
      expect(el.style.border, id).toContain("var(--copper-");
      expect(el.style.boxSizing, id).toBe("border-box");
    }
    for (const id of COST_IDS) {
      const el = screen.getByTestId(id);
      expect(el.style.border, id).toContain("dashed");
      expect(el.style.boxSizing, id).toBe("border-box");
    }
    // A LIMIT OUT-RANKS A COST BY TWO TIERS, and that is the epistemics in the small type: the
    // costs are a bill already paid, the terms are what the room is handed.
    const tierOf = (id: string) =>
      screen.getByTestId(id).querySelector("span")?.style.color ?? "";
    expect(new Set(TERM_IDS.map(tierOf))).toEqual(new Set(["var(--neutral-100)"]));
    expect(new Set(COST_IDS.map(tierOf))).toEqual(new Set(["var(--neutral-300)"]));

    // THE CANONICAL POSE IS THIS ONE, so the exported PDF is the frame that carries the terms —
    // and, since the rework, the only frame that carries the thesis.
    expect(investChickenEggSlide.canonicalPose).toBe(3);
    expect(revealed("chicken-egg-thesis")).toBe(true);
    unmount();
  });

  test("the 30-day window is on the slide, in the short road's own label", () => {
    const { unmount } = renderSlide(3);
    // "INSTEAD —" IS DOING REAL WORK: without it the offer reads as one more thing the slide is
    // asking for; with it it REPLACES the route the story just described, which is the whole
    // shape of beat 4 — and since the redraw the stage says it twice, because the label sits
    // over a road that runs to the same destination as the one below it.
    expect(C.pilotEyebrow).toBe("INSTEAD — A 30-DAY PROOF PILOT");
    expect(C.pilotEyebrow).toMatch(/\b30-DAY\b/);
    expect(screen.getByTestId("chicken-egg-pilot-eyebrow").textContent).toBe(C.pilotEyebrow);

    // Four limits AND a clock — the clock is in the label, so the terms stay four short
    // rows and the window is not repeated four times.
    expect(C.pilotConstraints).toHaveLength(4);
    for (const term of C.pilotConstraints) {
      expect(term.label, term.id).not.toMatch(/30/);
    }

    // The turn is the sentence these limits are the terms for, and it is the one beat addressed
    // to the room.
    //
    // IT NAMES WHAT IS SKIPPED, AND UNTIL 2026-08-14 IT COUNTED IT ("skip all three" — the
    // deadlock, the workaround and the bill). Nothing on this pose enumerates three of anything;
    // the only list under the sentence is the FOUR terms asserted above, so the count read as a
    // miscount of them. Both halves are pinned: the noun is on the stage, and no numeral or
    // number-word stands in for it.
    expect(C.turn).toBe("You are the person who can skip the deadlock entirely.");
    expect(C.turn).toMatch(/\bdeadlock\b/i);
    expect(C.turn).not.toMatch(/\b(one|two|three|four|1|2|3|4)\b/i);
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
 * B.2's SPEC vocabulary — shadow AI as CONDITION (§6.2: "There is no guidance, so people
 * improvise"). `improvis\w*` rather than the bare stem, because "improvised" and
 * "improvises" are the same IMAGE and a rule that let them through would be a rule
 * about spelling.
 *
 * TWO OF THE THREE ARE §6.2's WORDS AND THE THIRD IS ITS SLIDE ID, which is why `no SOP`
 * takes `[-\s]`: the literal string "no SOP" appears nowhere in the spec (checked by grep on
 * 2026-08-05) — what §6.2 owns is the id `gap-no-sop`, and the hyphen is how that name is
 * spelled everywhere it appears. So the pattern matches both spellings and D.3 may print
 * neither.
 *
 * THIS LIST SURVIVES B.2 SHIPPING — AND ITS 2026-08-11 REDESIGN, after which all three
 * tokens are controlled the same way. gh#66's first cut spent §6.2's verb in a rendered
 * sentence ("Everyone improvises a rule …"); the fray redesign cut that sentence (the
 * fan of private hairlines is the improvisation now, and the presenter says the verb),
 * so `improvise` re-joined `no guidance` and `no SOP` in having NO rendered source —
 * every control fires against §6.2's own sentence and slide id, which is again the only
 * place any of the three is spelled. Deleting them would drop the guard against a later
 * author lifting the SPEC's phrasing into this slide, which costs nothing to keep and
 * is a different failure from lifting B.2's rendered copy — that second failure is what
 * {@link B2_IMAGE_TOKENS} and the phrase rule below hold.
 */
const B2_SPEC_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["no SOP", /\bno[-\s]SOP\b/i],
  ["no guidance", /\bno guidance\b/i],
  ["improvise", /\bimprovis\w*\b/i],
];

/**
 * B.2's RENDERED image, read off `gapNoSopContent` (gh#66) rather than off §6.2.
 *
 * WHAT AN "IMAGE TOKEN" IS HERE: the words that carry the picture B.2 draws — three
 * issued boxes against four question boxes with empty answer rules, over a rollout
 * line that stops at NEVER WRITTEN and frays into private hairlines, and the silence
 * behind them. Every pattern below is fired against B.2's own strings in the control
 * test, so a list that drifted out of date fails loudly instead of passing vacuously.
 * REMEASURED 2026-08-11 with B.2's fray redesign: `still gets answered` left B.2's
 * stage with its two condition sentences, and `never written` arrived with the spine's
 * second dot caption.
 *
 * REMEASURED AGAIN 2026-08-14 with B.2's card re-cut, which moved one token and added
 * five. `which work may` became `which work`: B.2's four questions were re-worded for
 * comprehension ("Which work CAN I put into the AI?", "Which work MUST stay out of it?"),
 * so the old three-word pattern fired on nothing and would have made this whole list
 * pass vacuously — which is precisely what the control test below exists to catch, and
 * did. The five arrivals are the re-cut's own copy: the four DOMAIN labels each question
 * card now prints, and the note in every empty answer field.
 *
 * WHAT IS DELIBERATELY NOT IN IT. B.2 and this slide share only ordinary short words —
 * `what`, `work`, `case` and their kind (measured, not assumed; see the phrase rule's
 * note) — and not one of them is an image. A rule that forbade ordinary English would be
 * turned off inside a week, and a rule that is off catches nothing.
 */
const B2_IMAGE_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["the rule nobody wrote", /\brule nobody wrote\b/i],
  ["wrote their own", /\bwrote their own\b/i],
  ["never wrote down", /\bnever wrote down\b/i],
  ["handed out", /\bhanded out\b/i],
  ["a login", /\blogin\w*\b/i],
  ["a demonstration", /\bdemonstrat\w*\b/i],
  ["encouragement", /\bencourag\w*\b/i],
  ["which work", /\bwhich work\b/i],
  ["the silence", /\bsilence\b/i],
  ["never written", /\bnever written\b/i],
  ["no rule written", /\bno rule written\b/i],
  ["permission", /\bpermission\b/i],
  ["prohibition", /\bprohibition\b/i],
  ["arbitration", /\barbitration\b/i],
  ["disclosure", /\bdisclosure\b/i],
  ["no rule to break", /\bno rule to break\b/i],
  ["the leader's job", /\bleader['’]s job\b/i],
];

/**
 * D.3's OWN reserved vocabulary — the list `invest-security.test.tsx` already holds this
 * slide's copy to, restated here so the SAME rule can be run in the other direction
 * against B.2. A token can migrate either way and only the receiving file notices.
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

/** Every string B.2 authors — `gap-no-sop` has no brand axis and no `…For(brand)`
 *  resolver, so its whole copy block is its whole rendered string set. */
function b2Strings(): string[] {
  return walkStrings(gapNoSopContent);
}

/**
 * The set of every N-word phrase in a string set, lowercased and stripped of
 * punctuation so "rule." and "rule" are the same word.
 *
 * THREE WORDS IS THE THRESHOLD THE COPY CHOSE, not a number picked to make the test
 * pass. Measured on 2026-08-08 against the shipped blocks: B.2 and D.3 share exactly two
 * two-word phrases (`what it`, `is not`) and ZERO three-word phrases; B.2 and D.4 beat 2
 * share one two-word phrase (`is not`) and zero three-word ones. Two-word overlap of
 * function words is unavoidable in English and proves nothing; a shared three-word
 * phrase between two passes of the same escalation is copy that was lifted.
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
  // EXPOSURE, D.3 (this slide) as RATIONAL BEHAVIOUR. ALL THREE ARE NOW BUILT: #58
  // shipped `invest-security` on 2026-08-05 and gh#66 shipped `gap-no-sop` on
  // 2026-08-08. So the half of this block that ran against §6.2's SPEC TEXT until gh#66
  // now runs against B.2's RENDERED COPY, imported from `@/slides/leader-gap/content`,
  // and it runs in BOTH DIRECTIONS: B.2's image tokens are forbidden here, D.3's are
  // forbidden in B.2's strings, no three-word phrase is shared either way, and B.2's
  // zero-digit guarantee is asserted rather than quoted from its comment.
  //
  // A TOKEN LIST IS STILL NOT A PROOF ABOUT IMAGES. Two slides can share a picture
  // without sharing a word — "people route around a control" is one image whether it is
  // spelled with "improvise" or not — and no grep will ever see that. What changed with
  // gh#66 is the SOURCE of the tokens (B.2's actual strings, not a spec paragraph) and
  // the DIRECTION (both), not the kind of claim. The issue's AC is still explicit that
  // the real check is a human reading all three passes in deck order and recording the
  // result; `src/slides/leader-invest/content.ts` holds that record for gh#66 and
  // nothing here discharges it.
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

    const forbidden = [...B2_SPEC_TOKENS, ...B2_IMAGE_TOKENS, ...D4_TOKENS];
    for (const copy of strings) {
      for (const [name, pattern] of forbidden) {
        expect(pattern.test(copy), `${name} in ${JSON.stringify(copy)}`).toBe(false);
      }
    }

    // The rendered half, at the fullest pose — a token can arrive from a component.
    const { container, unmount } = renderSlide(3);
    const text = container.textContent ?? "";
    expect(text, "positive control: the stage is not empty").toContain(C.verdict);
    for (const [name, pattern] of forbidden) {
      expect(pattern.test(text), `${name} reached the stage`).toBe(false);
    }
    unmount();
  });

  test("and B.2 carries none of D.3's — the same rule read from the other side", () => {
    // THE OTHER DIRECTION, WHICH ONLY BECAME CHECKABLE WHEN gh#66 SHIPPED B.2. A token
    // can migrate either way, and until B.2 existed this file could only forbid arrivals.
    // `gap-no-sop` has no brand axis, so its copy block IS its rendered string set.
    const b2 = b2Strings();
    expect(b2.length, "a rule over an empty set proves nothing").toBeGreaterThan(10);
    for (const copy of b2) {
      for (const [name, pattern] of D3_TOKENS) {
        expect(pattern.test(copy), `D.3's ${name} in B.2's ${JSON.stringify(copy)}`).toBe(false);
      }
    }
    // POSITIVE CONTROL for the list itself: every one of D.3's nine patterns fires on
    // D.3's OWN copy, so nine dead regexes cannot make the rule above pass on any copy.
    const d3 = authoredStrings().join(" \n ");
    for (const [name, pattern] of D3_TOKENS) {
      expect(pattern.test(d3), `${name} no longer fires on D.3's own copy`).toBe(true);
    }
  });

  test("shares no three-word phrase with B.2, in either direction", () => {
    // THE RULE THAT DOES NOT DEPEND ON A HAND-WRITTEN LIST. Both token lists are
    // judgement calls about which words carry an image; this one is not. It is set
    // intersection over every three-word phrase either slide prints, and it catches the
    // failure a token list cannot see by construction — a sentence lifted from one pass
    // into the other using words nobody thought to reserve.
    //
    // SYMMETRIC BY CONSTRUCTION: phrase overlap is the same set from both sides, and it
    // is asserted as one empty intersection rather than twice.
    const b2 = phrases(b2Strings(), 3);
    const d3 = phrases(authoredStrings(), 3);
    expect(b2.size, "positive control: B.2 has phrases to share").toBeGreaterThan(50);
    expect(d3.size, "positive control: D.3 has phrases to share").toBeGreaterThan(50);
    expect([...d3].filter((p) => b2.has(p))).toEqual([]);

    // AND THE CONTROL THAT KEEPS THE RULE HONEST: the intersection is empty because the
    // copy is disjoint, not because `phrases()` never matches anything. One of B.2's own
    // sentences, put through the rule as if this slide had lifted it, is caught — and it
    // is caught across the punctuation and the capitals, which is what the normalisation
    // is for.
    const lifted = phrases(["Nobody wrote the rule; so EVERYBODY wrote their own!"], 3);
    expect([...lifted].filter((p) => b2.has(p)).length).toBeGreaterThan(3);
  });

  test("cannot share a statistic with B.2, because B.2 prints no digit at all", () => {
    // §6.2's second half — no shared STATISTIC — held as an absence on B.2's side and as
    // a single quantity on this one. Asserted over B.2's imported copy rather than
    // trusted from its comment: the day `gap-no-sop` gains a number, this fails here and
    // in `invest-security.test.tsx`, which is exactly when the rule needs re-arguing.
    for (const copy of b2Strings()) {
      expect(copy, `digit in B.2: ${JSON.stringify(copy)}`).not.toMatch(/\d/);
    }
    // D.3's side of it: exactly one quantity, the 30-day window (see the test below).
    expect(authoredStrings().filter((copy) => /\d/.test(copy))).toEqual([
      "INSTEAD — A 30-DAY PROOF PILOT",
    ]);
  });

  test("and the token patterns actually fire, including the word-boundary case", () => {
    // POSITIVE CONTROLS FOR THE RULE ITSELF. Regexes that matched nothing would make the
    // test above pass on any copy at all — including copy lifted verbatim from D.4 — so
    // every one of them is fired here against the SOURCE IT WAS READ OFF.
    //
    // B.2's IMAGE TOKENS FIRE AGAINST B.2's RENDERED COPY, which is what gh#66 changed:
    // until B.2 shipped there was nothing to fire them against but a spec paragraph.
    const b2 = b2Strings();
    for (const [name, pattern] of B2_IMAGE_TOKENS) {
      expect(
        b2.some((line) => pattern.test(line)),
        `${name} no longer fires on B.2's own copy`,
      ).toBe(true);
    }

    // §6.2's OWN SENTENCE IS STILL QUOTED VERBATIM, for the three SPEC tokens B.2 does
    // not print. Spec line 773 reads "There is no guidance, so people improvise." — `no
    // guidance` and `improvise` come from there; `no SOP` comes from the SLIDE ID §6.2
    // gives that pass, `gap-no-sop`. Since B.2's 2026-08-11 fray redesign none of the
    // three has a rendered source (the header above records why), so every control
    // falls back to the spec. A control that edits the spec's words to make itself fire
    // is a control that proves the edit and not the regex. (This line read "There is no
    // guidance and no SOP, so people improvise." until 2026-08-05, which was exactly
    // that.)
    const b2Sources = [
      ...b2, // B.2's rendered copy — none of the three is spelled here today
      "There is no guidance, so people improvise.", // §6.2, spec line 773
      "gap-no-sop", // §6.2's slide id, where `no SOP` is spelled
    ];
    for (const [name, pattern] of B2_SPEC_TOKENS) {
      expect(
        b2Sources.some((line) => pattern.test(line)),
        name,
      ).toBe(true);
    }
    // AND THE HALF OF THAT WHICH IS A FACT ABOUT RENDERED COPY: B.2 spells none of
    // §6.2's three phrasings since the redesign, so the fallback above is not a guess.
    expect(b2.some((line) => /\bimprovis\w*\b/i.test(line))).toBe(false);
    expect(b2.some((line) => /\bno guidance\b/i.test(line))).toBe(false);
    expect(b2.some((line) => /\bno[-\s]SOP\b/i.test(line))).toBe(false);
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
    // §3.4 R2 / §3.5. This slide composed as D.2 from gh#57 until gh#70 and composes as
    // D.3 today, because `invest-base-rates` landed in front of it at the run's head and
    // R3 stepped every row behind the insert. This comment predicted that exact move; a
    // literal "D.2" or "SECTION D" anywhere in this copy WOULD have become a lie on a
    // projector, and it did, on 2026-08-08.
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

/**
 * The node census, at one pose.
 *
 * THE CLAIM CHANGED SHAPE IN THE 2026-08-14 REDRAW AND GOT NO WEAKER. Until then this figure
 * mounted NO `<svg>` at all, so "zero SMIL" was closed by construction — there was no element
 * class for a SMIL node to live in. The redraw mounts one `<svg>` (the ring, the two roads, the
 * lock, the key, the tolls and the ticks), so the guarantee is now the one `leader-shape`'s
 * three figures make: the layer exists, everything in it that moves is a CSS animation or a CSS
 * transition declared in `chicken-egg.css`, and the SMIL tag census is zero.
 *
 * SO THE DRAWN LAYER IS ASSERTED AS EXACTLY ONE rather than dropped. A second 1:1 layer would mean
 * a second copy of the stage's coordinate system on a figure whose geometry module is written for
 * one, and it is also the shape a copy-pasted figure arrives in.
 *
 * IT IS `svg.svg-layer` AND NOT `svg`, WHICH IS A 2026-08-14 CHANGE AND NOT A LOOSENING. Act 1's
 * two poles each carry a 26px glyph — a banknote beside BUDGET, a signed sheet beside PROOF — and
 * those are `<svg>` elements too, deliberately: they are centred WITH their word by flexbox,
 * because the width of a word in the display face is not a number a geometry module can know. So
 * the class is what distinguishes "the drawn layer" from "a glyph", the layer is still exactly
 * one, and the SMIL census is unchanged — it runs over the whole document and therefore over the
 * glyphs as well.
 */
function expectNoSmil(container: HTMLElement, where: string) {
  for (const tag of SMIL_TAGS) {
    expect(document.querySelectorAll(tag), `${where} · <${tag}>`).toHaveLength(0);
  }
  expect(container.querySelectorAll("svg.svg-layer"), `${where} · one drawn layer`).toHaveLength(1);
  expect(container.querySelector("svg.svg-layer")?.getAttribute("viewBox"), where).toBe(
    "0 0 1280 720",
  );
  // AND EVERY OTHER `<svg>` ON THE STAGE IS A POLE GLYPH — the rule that keeps "one layer" from
  // becoming "one layer and whatever else". Two at act 1, one after it (PROOF's leaves with the
  // pole; see the figure), and never anything that is not one of those two.
  for (const svg of container.querySelectorAll("svg:not(.svg-layer)")) {
    expect(svg.classList.contains("ce-glyph"), `${where} · a stray <svg>`).toBe(true);
  }
}

describe("zero SMIL nodes, by construction", () => {
  test("at every pose, under the deck's normal motion", () => {
    // THE WHOLE MOTION BUDGET IS CSS: `.fade`'s transition-plus-keyframe pair and
    // `.copper-rule`'s `scaleX` from `globals.css`, plus the nine rules in
    // `chicken-egg.css` — two dash flows, a stamp echo, a draw, a head pop, a key turn, a
    // node pop, a tick drop, and the two act-change transitions. Not one of them is a SMIL
    // node, which is what keeps this a fact about the markup rather than a promise.
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
    // ACT 1 IS A SET: `BEAT_1` is reached at pose 0 and at no other pose, so it appears in the
    // first row alone and the completeness check below reads it as "not reached" everywhere else
    // — which is exactly what the stage does.
    const act2 = [...BEAT_2, ...BEAT_3];
    const expected: ReadonlyArray<readonly string[]> = [
      BEAT_1,
      act2,
      [...act2, ...BEAT_4],
      [...act2, ...BEAT_4, ...CLOSER],
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
  // ASSERTED AS PROPERTIES, NOT AS IDENTITIES, and the distinction is a rule in this tree rather
  // than a preference. This file's history records two checks deleted for being unfalsifiable —
  // three column widths "tiling" the content width, where the third is DEFINED as the remainder
  // — so an assertion that holds for every value of every constant in it is worse than no
  // assertion: it reads as coverage. What is asserted below is what can fail: the counts against
  // the copy's own tuples, the ORDER of the shelves, the two module-level guards WITH their
  // messages, and the shelf each rendered box actually declares.

  test("the three counts are pinned to the copy's own tuples", () => {
    // THE HONEST DIRECTION FOR THE LOCK: the counts are facts about the ARGUMENT — a two-clause
    // cycle is what a deadlock is, §6.7 names four costs, the AC names four pilot terms — and
    // the geometry is the borrower. The module holds these as type-level pins through a
    // type-only `import()`; this is the value-level half, because a pin that goes vacuous (a
    // tuple widened to `string[]`) says nothing silently.
    expect(DEADLOCK_CLAUSE_COUNT).toBe(C.deadlockClauses.length);
    expect(COST_COUNT).toBe(C.costs.length);
    expect(CONSTRAINT_COUNT).toBe(C.pilotConstraints.length);
    expect(DEADLOCK_CLAUSE_COUNT).toBe(2);
    expect(COST_COUNT).toBe(4);
    expect(CONSTRAINT_COUNT).toBe(4);

    // AND THE BILL AND THE OFFER SHARE ONE GRID, which is the redraw's own structural claim and
    // the module's only module-load guard on the copy: `ITEM_COUNT` throws if the two counts
    // ever diverge, because four boxes over five has no grid.
    expect(ITEM_COUNT).toBe(COST_COUNT);
    expect(ITEM_COUNT).toBe(CONSTRAINT_COUNT);
  });

  test("nothing on the stage crosses the NavBar's hover band or the deck's margins", () => {
    // THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM: `bottom: 80px` would put a
    // floor at y=640, 8px INSIDE `.nav-zone` (`bottom: 0; height: 88px`), and a box there is a
    // box the presenter's own pointer makes the chrome fade up over. `NAV_ZONE_TOP` re-derives
    // the CSS rule, so this pins the rule and the stage.
    expect(STAGE).toEqual({ width: 1280, height: 720 });
    expect(SIDE_MARGIN).toBe(48);
    expect(CONTENT_WIDTH).toBe(1280 - 2 * 48);
    expect(CONTENT_RIGHT).toBe(1232);
    expect(NAV_ZONE_TOP).toBe(720 - 88);
    expect(NAV_ZONE_CLEARANCE).toBe(16);

    // Held over the RENDERED boxes, because over the constants the horizontal half is an
    // identity. What can fail is a box that hardcoded a width or took the wrong lane's — the
    // two road labels did exactly that in the first render of this figure (they took
    // `CONTENT_WIDTH` at x=132 and ran 84px past the stage), which is why this loop exists.
    const { unmount } = renderSlide(3);
    let lowest = { id: "", bottom: 0 };
    for (const id of [...EVERY_BOX, "chicken-egg-proof-plate", "chicken-egg-pole-budget"]) {
      const geo = geometryOf(id);
      expect(geo.left, `${id} clears the left margin`).toBeGreaterThanOrEqual(SIDE_MARGIN);
      expect(geo.left + geo.width, `${id} clears the right margin`).toBeLessThanOrEqual(
        CONTENT_RIGHT,
      );
      expect(geo.top, `${id} starts on or below the content shelf`).toBeGreaterThanOrEqual(
        BAND_TOP,
      );
      expect(geo.top + geo.height, `${id} stays above the NavBar band`).toBeLessThanOrEqual(
        NAV_ZONE_TOP,
      );
      if (geo.top + geo.height > lowest.bottom) lowest = { id, bottom: geo.top + geo.height };
    }

    // AND THE LOWEST BOX ON THE STAGE IS THE THESIS — which is the whole of what the owner's
    // "make the thesis show last" instruction means in coordinates, and the number
    // `NAV_ZONE_CLEARANCE` is measured from.
    expect(lowest.id).toBe("chicken-egg-thesis");
    expect(NAV_ZONE_TOP - lowest.bottom).toBe(NAV_ZONE_CLEARANCE);
    unmount();
  });

  test("every box declares the shelf the geometry module places it on", () => {
    // STRUCTURAL, because jsdom places nothing: each box reads its own coordinate from the
    // module, so a box and the budget it is supposed to sit in cannot disagree.
    const { unmount } = renderSlide(3);
    const shelves: ReadonlyArray<readonly [string, number, number]> = [
      ...CLAUSE_IDS.map((id, i) => [id, clauseTop(i), CLAUSE_HEIGHT] as const),
      ["chicken-egg-turn", TURN_TOP, BEAT_HEIGHT],
      ["chicken-egg-pilot-eyebrow", SHORT_LABEL_TOP, ROAD_LABEL_HEIGHT],
      ...TERM_IDS.map((id) => [id, TERM_TOP, TERM_HEIGHT] as const),
      ["chicken-egg-workaround", ACT_TOP, BEAT_HEIGHT],
      ["chicken-egg-costs-eyebrow", LONG_LABEL_TOP, ROAD_LABEL_HEIGHT],
      ...COST_IDS.map((id) => [id, COST_TOP, COST_HEIGHT] as const),
      ["chicken-egg-verdict", VERDICT_TOP, BEAT_HEIGHT],
      ["chicken-egg-rule", RULE_TOP, RULE_HEIGHT],
      ["chicken-egg-thesis", THESIS_TOP, THESIS_HEIGHT],
    ];
    for (const [id, top, height] of shelves) {
      const geo = geometryOf(id);
      expect(geo.top, `${id} shelf`).toBe(top);
      expect(geo.height, `${id} box height`).toBe(height);
    }

    // BOTH BEATS THAT REACH THE PLATE'S BAND STOP SHORT OF IT rather than running under it. A
    // sentence that passed behind the destination would read as two fragments — and its BOX,
    // ink or no ink, would take every pointer in its own 26px stripe of the plate, which is a
    // plate that lights everywhere except one band. That is not hypothetical: it is what the ACT
    // did until 2026-08-14, when it was full width and crossing the plate at y=318.
    //
    // THE ACT IS THE ONE THAT ACTUALLY CROSSES, and the count is asserted rather than trusted:
    // the plate's band is DEST_TOP…DEST_TOP + DEST_H, the act sits inside it, the verdict starts
    // below it, and the turn ends above it — so a later edit that drops a fourth beat into the
    // band fails here instead of on a stage.
    for (const id of ["chicken-egg-workaround", "chicken-egg-verdict"] as const) {
      const box = geometryOf(id);
      expect(box.width, `${id} measure`).toBe(BEAT_W);
      expect(box.left + box.width, `${id} clears the plate`).toBeLessThanOrEqual(DEST_LEFT);
    }
    const band = (top: number, height: number) => top < DEST_TOP + DEST_H && top + height > DEST_TOP;
    expect(band(ACT_TOP, BEAT_HEIGHT), "the act is in the plate's band").toBe(true);
    expect(band(VERDICT_TOP, BEAT_HEIGHT), "the verdict is below it").toBe(false);
    expect(band(TURN_TOP, BEAT_HEIGHT), "the turn is above it").toBe(false);

    // THE TWO TOKEN LABELS HANG OFF THEIR OWN LANE, CENTRED ON THE TOKEN THEY NAME, and each one
    // stops short of the grid beside it. That clearance is the reason they are the only 9.5px type
    // on the stage — at the tier every other mono label takes, "THE DEADLOCK" crossed the first
    // cost box, which is what the first render of this figure did.
    //
    // THE CENTRING IS THE 2026-08-14 FIX AND IT IS TWO FACTS, not one: the box is SYMMETRIC ABOUT
    // ITS TOKEN (which is why `TOKEN_CX` moved from 94 to 90 — see the geometry module, where the
    // 84px between the stage margin and the item grid is only symmetric about 90), and the type is
    // centred INSIDE it. Either alone leaves the caption belonging to something else: without the
    // second, "YOU" sits flush against x=48, thirty-three pixels left of the circle it names;
    // without the first, it centres on x=90 while the token sits at 94.
    for (const [id, lane] of [
      ["chicken-egg-key-label", SHORT_LANE_Y],
      ["chicken-egg-lock-label", LONG_LANE_Y],
    ] as const) {
      const geo = geometryOf(id);
      expect(geo.left, id).toBe(TOKEN_LABEL_LEFT);
      expect(geo.width, id).toBe(TOKEN_LABEL_W);
      expect(geo.height, id).toBe(TOKEN_LABEL_HEIGHT);
      expect(geo.left + geo.width / 2, `${id} is centred on its own token`).toBe(TOKEN_CX);
      expect(screen.getByTestId(id).style.textAlign, `${id} centres its type`).toBe("center");
      expect(geo.top, `${id} hangs under its own road`).toBeGreaterThan(lane);
      expect(geo.left, `${id} clears the stage margin`).toBeGreaterThanOrEqual(SIDE_MARGIN);
      expect(geo.left + geo.width, `${id} stops short of the item grid`).toBeLessThanOrEqual(
        LANE_LEFT,
      );
      expect(parseFloat(screen.getByTestId(id).style.fontSize), id).toBe(9.5);
    }

    // THE TWO ROAD LABELS TAKE THE ROAD'S MEASURE AND NOT THE STAGE'S — the failure that
    // produced this assertion. Both start at the lane's left edge and stop at the plate.
    for (const id of ["chicken-egg-pilot-eyebrow", "chicken-egg-costs-eyebrow"]) {
      const geo = geometryOf(id);
      expect(geo.left, id).toBe(LANE_LEFT);
      expect(geo.width, id).toBe(ROAD_LABEL_W);
      expect(geo.left + geo.width, id).toBe(DEST_LEFT);
    }

    // THE CLAUSES ARE CENTRED ON THE RING, outside its two apexes — one above the arc it labels
    // and one below the other, which is the only placement that lets each caption belong to the
    // direction its arrow travels.
    for (const id of CLAUSE_IDS) {
      const geo = geometryOf(id);
      expect(geo.left, id).toBe(CLAUSE_LEFT);
      expect(geo.width, id).toBe(CLAUSE_W);
      expect(geo.left + geo.width / 2, `${id} is centred on the ring`).toBe(RING_CX);
    }
    expect(clauseTop(0)).toBeLessThan(RING_CY);
    expect(clauseTop(1)).toBeGreaterThan(RING_CY);
    unmount();
  });

  test("and it refuses at module load, and at every index the figure does not have", () => {
    // THE MESSAGE IS PART OF THE CONTRACT, not decoration. gh#56 shipped a row cap whose message
    // blamed the NavBar band 80px away when the real collision was a fixed shelf, and the cost
    // was two comments, two throw messages and two tests all pointing a later author at the
    // wrong number — who would then have measured the band, found room, and widened the guard.

    // BEAT 1 · a third clause is not a deadlock — refused on the argument, not the room.
    expect(() => clauseTop(DEADLOCK_CLAUSE_COUNT)).toThrow(/no clause 2/);
    expect(() => clauseTop(DEADLOCK_CLAUSE_COUNT)).toThrow(/A third clause is a queue/);
    expect(() => clauseTop(-1)).toThrow(/no clause -1/);
    expect(() => clauseTop(0.5)).toThrow(/no clause 0\.5/);

    // THE GRID · a fifth column of either row is refused by the grid the two rows SHARE, and the
    // message says so rather than blaming a shelf: the failure is that four-against-four stops
    // being a comparison, not that a box ran out of room.
    expect(() => itemLeft(ITEM_COUNT)).toThrow(/no column 4/);
    expect(() => itemLeft(ITEM_COUNT)).toThrow(/a fifth of either needs a fifth of both/);
    expect(() => itemLeft(-1)).toThrow(/no column -1/);
    expect(() => itemLeft(1.5)).toThrow(/no column 1\.5/);

    // AND EVERY INDEX THE COPY ACTUALLY USES IS ACCEPTED, so a guard cannot be made "safe" by
    // refusing everything.
    for (let i = 0; i < DEADLOCK_CLAUSE_COUNT; i++) expect(clauseTop(i)).toBeGreaterThan(0);
    for (let i = 0; i < ITEM_COUNT; i++) {
      expect(itemLeft(i)).toBeGreaterThanOrEqual(LANE_LEFT);
      expect(itemCenterX(i)).toBeGreaterThan(itemLeft(i));
    }

    // THE MODULE'S OWN LOAD-TIME GUARD is the one thing a test cannot provoke without a second
    // copy of the module, so what is held here is that it RAN and produced a usable number: a
    // figure whose bottom is past the rule would have thrown at import and this file would not
    // have loaded at all.
    expect(FIGURE_BOTTOM).toBeLessThanOrEqual(RULE_TOP);
    expect(FIGURE_BOTTOM).toBeGreaterThan(BAND_TOP);
  });
});
