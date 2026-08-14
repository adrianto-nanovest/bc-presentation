// PHASES AND GATES · slide tests. All five poses, both brands.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so nothing here measures a
// pixel a browser would place — every geometric claim is asserted as the ONE NUMBER both
// sides read (`../../src/slides/leader-mandate/phases-gates-geometry.ts`), and the
// composition itself is walked at 1280×720 in a browser. What jsdom is good for is what
// this slide is actually at risk of, and none of the five is a layout fault:
//
//   1. THE LADDER GOING OUT OF STEP WITH `gap-capability-ladder`. #61's second AC is that
//      this slide and that one are the SAME OBJECT — same rung names, same order, no
//      re-labelling. `./content.ts` holds that with an import rather than a copy, so the
//      assertion below is an IDENTITY check (`toBe`): it fails the moment somebody
//      "simplifies" the import into a local array, which is the only way the guarantee
//      can be lost quietly.
//   2. A THIRD LADDER GROWING BACK. §6.6 cut "Learn → Experiment → Build → Integrate →
//      Own" so the deck would carry one vocabulary. The four phase STATES are the shape a
//      second one would take if it ever did, so they are checked against the rungs
//      directly rather than by grepping for the cut phrase alone.
//   3. THE BRAND AXIS LEAKING. Two organisations' real published roadmaps sit on one
//      structure. The rules worth holding are that the STRUCTURE never varies (no phase,
//      gate, rung or scene line is on the axis) and that each brand's calendar names only
//      its own programme.
//   4. THE BERAU BLOCK DRIFTING BACK TO A FINISHED P0. The block asserted a complete P0,
//      a named gate day and a set of AI Ambassadors that do not exist; it was corrected on
//      2026-08-15 and the failure mode is somebody restoring the crisper, false version.
//      So the corrected facts are asserted BY NAME, and the forbidden words with them.
//   5. A MARK THE COPY NAMES AND NOTHING DRAWS. Eight glyphs, two per phase, pinned to
//      the copy by a module-load guard rather than by a type — because the content module
//      may not import a component. The guard is exercised here.
//
// ONE EPOCH FOR ALL OF IT. The figure reads no `VARIANT` and takes the resolved block as
// a prop, exactly as `CapabilityLadder` does, so both brands mount in the default
// `general` epoch through `SlideHarness` by passing their block in. No module-registry
// reset is needed anywhere in this file — which is the point of resolving the brand once
// in the slide def instead of inside the component.
import { readFileSync } from "node:fs";
import path from "node:path";
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { BRANDS, type Brand } from "@/deck-variants";
import { DECK_SET_COMPOSITION } from "@/deck/deck-sets";
import {
  MandatePhasesGates,
  mandatePhasesGatesSlide,
} from "@/slides/leader-mandate/mandate-phases-gates";
import {
  mandatePhasesGatesContent,
  phasesGatesFor,
  phasesOnRung,
  rungIndexOf,
  rungOf,
  type PhasesGatesBrandBlock,
} from "@/slides/leader-mandate/content";
// `gap-capability-ladder`'s own content module, imported for the identity assertion
// below. This is NOT the test standing in for a coupling that production declined to
// make — it is the test checking that production DID make it.
import { gapLadderContent } from "@/slides/leader-gap/content";
import { PHASE_GLYPH_IDS } from "@/slides/leader-mandate/components/PhaseGlyphs";
import {
  CALENDAR_ROWS,
  CALENDAR_ROW_BUDGET_CHARS,
  CARD_HEIGHT,
  CARD_TOP,
  CARD_WIDTH,
  CONTENT_WIDTH,
  EYEBROW_TOP,
  GATE_BUDGET_CHARS,
  HEADLINE_BOTTOM,
  HERO_LADDER_FLOOR,
  HERO_PATH_ABOVE,
  HERO_PATH_BELOW,
  HERO_PATH_PLAN,
  HERO_TREADS,
  HIGH_NOTE,
  LOW_NOTE,
  NOTE_HEIGHT,
  NOTE_LINE_BUDGET_CHARS,
  NOTE_WIDTH,
  PHASE_COUNT,
  PLAN_HIGH_RUNG,
  PLAN_LOW_RUNG,
  PROVENANCE_BUDGET_CHARS,
  PROVENANCE_HEIGHT,
  PROVENANCE_TOP,
  RECAP_COL_TOP,
  RECAP_FLOOR,
  RECAP_GATE_BUDGET_CHARS,
  RECAP_TREADS,
  RULE_TOP,
  RUNG_COUNT,
  RUNG_LABEL_BUDGET_CHARS,
  RUNG_SUB_BUDGET_CHARS,
  SCENE_FLOOR,
  SIDE_MARGIN,
  STAGE,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  cardLeft,
  chipTop,
  stairPath,
} from "@/slides/leader-mandate/phases-gates-geometry";

const C = mandatePhasesGatesContent;
const POSES = [0, 1, 2, 3, 4] as const;

/** Every registered brand, walked rather than listed — a fourth brand is covered by being
 *  registered, not by being added here. */
const ALL_BRANDS = Object.keys(BRANDS) as Brand[];

/**
 * The position the slide holds in the deck it actually composes into.
 *
 * `at` IS required here, and it is the case `SlideHarness` documents: unit tests resolve
 * the default `general` deck, `general` has no leader variant, and this slide reaches the
 * two leader deck sets ALONE.
 *
 * A HARNESS INPUT AND NOT A CLAIM THE SLIDE MAKES. K.2 is what the composed leader decks
 * derive today; nothing under `src/slides/leader-mandate/` names it. AND IT IS THE LETTER
 * THE PRACTICE LAB'S `k2-practice-lab-overview` ALSO ONCE HELD — that slide prints N.2 in
 * these decks and K.2 in a standard one. Two different slides, disambiguated by basename
 * and section key and never by the letter, which is why `sectionKey` is in this object.
 */
const AT = { letter: "K", num: 2, sectionKey: "mandate" } as const;

const CSS_PATH = path.resolve(process.cwd(), "src/slides/leader-mandate/components/phases.css");

const GEMS = phasesGatesFor("gems");
const BERAU = phasesGatesFor("berau");

/**
 * A month named in a sentence — the thing neither a gate nor an ask may contain.
 *
 * TWO THINGS THIS DELIBERATELY DOES NOT CATCH, because catching them costs more than it
 * buys. `\b` AND NOT `\w*`: the loose form matched "dec" inside "decision", which is the
 * first word of one of the four gates and exactly the kind of false positive that gets a
 * rule deleted rather than fixed. And "MAY" IS ABSENT FROM BOTH LISTS: it is an English
 * modal before it is a month, and a gate reading "no agent may run" is correct copy that
 * this rule would reject. A May that is really a date does not survive
 * {@link CALENDAR_SHAPE} beside it — every date-shaped string on this slide is a
 * calendar row, and calendar rows are held to a different rule.
 */
const MONTH =
  /\b(january|february|march|april|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)\b/i;

/** A quarter, a week number or a year. The other three shapes a date arrives in. */
const CALENDAR_SHAPE = /\bQ[1-4]\b|\bW\d\b|\b20\d\d\b/;

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

function renderSlide(content: PhasesGatesBrandBlock = GEMS, pose = 0) {
  const out = render(
    <SlideHarness def={mandatePhasesGatesSlide} at={AT}>
      <Nav />
      <MandatePhasesGates content={content} />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

function textOf(id: string): string {
  return screen.getByTestId(id).textContent ?? "";
}

/**
 * Every box the stage prints copy into, and the poses it is on.
 *
 * BUILT FROM THE CONTENT, so a fifth phase or a sixth rung is covered by the existing
 * rows rather than by somebody remembering to add four more.
 */
const COPY_BOXES: readonly (readonly [string, readonly number[]])[] = [
  ["phases-ladder-eyebrow", [0]],
  ...C.rungs.map(
    (r) => [`phases-hero-rung-name-${r.id}`, [0]] as readonly [string, readonly number[]],
  ),
  ...C.rungs.map(
    (r) => [`phases-hero-rung-sub-${r.id}`, [0]] as readonly [string, readonly number[]],
  ),
  ["phases-low-note-label", [0]],
  ["phases-low-note-line", [0]],
  ["phases-high-note-label", [0]],
  ["phases-high-note-line", [0]],
  ["phases-plan-tag", [0]],
  ["phases-ladder-thesis", [0]],

  ["phases-phases-eyebrow", [1]],
  ...C.phases.flatMap(
    (p) =>
      [
        [`phases-phase-label-${p.id}`, [1]],
        [`phases-phase-target-${p.id}`, [1]],
        [`phases-phase-body-${p.id}`, [1]],
      ] as readonly (readonly [string, readonly number[]])[],
  ),
  ["phases-provenance", [1]],
  ["phases-phases-thesis", [1]],

  ["phases-gates-eyebrow", [2]],
  ...C.phases.flatMap(
    (p) =>
      [
        [`phases-gate-label-${p.id}`, [2]],
        [`phases-gate-target-${p.id}`, [2]],
        [`phases-gate-body-${p.id}`, [2]],
      ] as readonly (readonly [string, readonly number[]])[],
  ),
  ["phases-gates-thesis", [2]],

  ["phases-plan-eyebrow", [3, 4]],
  ...C.rungs.map(
    (r) => [`phases-recap-rung-${r.id}`, [3, 4]] as readonly [string, readonly number[]],
  ),
  ...C.phases.flatMap(
    (p) =>
      [
        [`phases-recap-chip-${p.id}`, [3, 4]],
        [`phases-recap-head-${p.id}`, [3, 4]],
        [`phases-recap-calendar-${p.id}`, [3, 4]],
        [`phases-recap-gate-${p.id}`, [3, 4]],
      ] as readonly (readonly [string, readonly number[]])[],
  ),

  ["phases-thesis", [4]],
];

/** The mono/display LABEL register — every string that must never be rendered through the
 *  highlighter. See the keyword rule at the top of `../content.ts`. */
const LABEL_BOXES: readonly (readonly [string, number])[] = [
  ["phases-ladder-eyebrow", 0],
  ...C.rungs.map((r) => [`phases-hero-rung-name-${r.id}`, 0] as readonly [string, number]),
  ...C.rungs.map((r) => [`phases-hero-rung-sub-${r.id}`, 0] as readonly [string, number]),
  ["phases-low-note-label", 0],
  ["phases-low-note-line", 0],
  ["phases-high-note-label", 0],
  ["phases-high-note-line", 0],
  ["phases-plan-tag", 0],
  ["phases-phases-eyebrow", 1],
  ...C.phases.flatMap(
    (p) =>
      [
        [`phases-phase-label-${p.id}`, 1],
        [`phases-phase-target-${p.id}`, 1],
      ] as readonly (readonly [string, number])[],
  ),
  ["phases-provenance", 1],
  ["phases-gates-eyebrow", 2],
  ["phases-plan-eyebrow", 3],
  ...C.phases.flatMap(
    (p) =>
      [
        [`phases-recap-chip-${p.id}`, 3],
        [`phases-recap-head-${p.id}`, 3],
      ] as readonly (readonly [string, number])[],
  ),
];

/** Every string this slide can print, for one brand — label and prose alike. */
function authoredFor(block: PhasesGatesBrandBlock): readonly string[] {
  return [
    C.figLabel,
    C.headline,
    C.ladderEyebrow,
    C.phasesEyebrow,
    C.gatesEyebrow,
    C.planEyebrow,
    C.lowNote.label,
    C.lowNote.line,
    C.highNote.label,
    C.highNote.line,
    C.planTag,
    C.ladderThesis,
    C.phasesThesis,
    C.gatesThesis,
    C.beyondRoadmap,
    ...C.rungs.flatMap((r) => [r.level, r.title, r.sub]),
    ...C.phases.flatMap((p) => [p.label, p.state, p.gate]),
    ...Object.values(block.calendars).flatMap((cal) => (cal.kind === "theirs" ? [...cal.rows] : [])),
    block.provenance,
    block.closer,
  ];
}

// ── the def ──────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, five steps, closing on the fullest pose", () => {
    expect(mandatePhasesGatesSlide.id).toBe("mandate-phases-gates");
    expect(mandatePhasesGatesSlide.steps).toBe(5);
    // `canonicalPose` is the frame the PDF and PPTX exports print, and for this slide the
    // last pose IS the fullest one — the recap does not leave when the thesis lands. A
    // canonical pose short of it would export a plan with its ask missing.
    expect(mandatePhasesGatesSlide.canonicalPose).toBe(mandatePhasesGatesSlide.steps - 1);
    expect(mandatePhasesGatesSlide.animationMode).toBe("step-reveal");
    expect(mandatePhasesGatesSlide.surface).toBe("dark");
    expect(mandatePhasesGatesSlide.sectionKey).toBe("mandate");
  });

  test("names no letter and no number in any rendered string", () => {
    // §3.5: the letter and the page number are DERIVED from the composed deck, so a slide
    // that named its own would print one thing and be numbered another the first time a
    // row moved. `FigLabel` takes a label only.
    for (const block of [GEMS, BERAU]) {
      for (const line of authoredFor(block)) {
        expect(line, line).not.toMatch(/\bFIG\.?\s*[A-Z]\.\d/i);
        expect(line, line).not.toMatch(/\bslide\s+[A-Z]\.\d/i);
      }
    }
  });
});

// ── the ladder is `gap-capability-ladder`'s, not a copy of it ────────────────

describe("this slide and `gap-capability-ladder` draw the same ladder", () => {
  test("the rungs are the SAME ARRAY, by identity", () => {
    // #61's second AC. `toBe` and not `toEqual`: an equal-but-separate array is exactly
    // what a later "simplification" would leave behind, and it would pass a deep compare
    // on the day it was written and drift the day after.
    expect(C.rungs).toBe(gapLadderContent.rungs);
    expect(C.rungs).toHaveLength(RUNG_COUNT);
  });

  test("prints every rung's name verbatim, in ladder order, on the hero pose", () => {
    renderSlide(GEMS, 0);
    C.rungs.forEach((rung, i) => {
      const name = textOf(`phases-hero-rung-name-${rung.id}`);
      expect(name, rung.id).toContain(rung.level);
      expect(name, rung.id).toContain(rung.title);
      // The tread it hangs under is the one the geometry gives that index — a label on
      // the wrong step is a re-labelling, which is the thing the AC forbids.
      expect(HERO_TREADS[i].y).toBe(HERO_TREADS[0].y - i * (HERO_TREADS[0].y - HERO_TREADS[1].y));
    });
  });

  test("prints every rung's definition verbatim on the hero pose, and nowhere else", () => {
    // The definitions are `leader-gap`'s. They are printed HERE because pose 0 is the one
    // frame with room for them, and NOT on the recap, where five of them would cost 65px
    // of a pose that has four columns to show.
    renderSlide(GEMS, 0);
    C.rungs.forEach((rung) => {
      expect(textOf(`phases-hero-rung-sub-${rung.id}`)).toBe(rung.sub);
    });
    goToPose(3);
    C.rungs.forEach((rung) => {
      expect(textOf(`phases-recap-rung-${rung.id}`)).not.toContain(rung.sub);
    });
  });

  test("holds every borrowed string to this slide's own budgets", () => {
    // The rung names and definitions belong to another module. A reword there has to fail
    // HERE rather than silently run into a neighbour's column.
    C.rungs.forEach((rung) => {
      expect(`${rung.level} · ${rung.title}`.length, rung.id).toBeLessThanOrEqual(
        RUNG_LABEL_BUDGET_CHARS,
      );
      expect(rung.sub.length, rung.id).toBeLessThanOrEqual(RUNG_SUB_BUDGET_CHARS);
    });
  });
});

// ── no third ladder ──────────────────────────────────────────────────────────

describe("only one ladder is on this stage", () => {
  test("the four states are adjectives on rungs, and two of them share one", () => {
    // §6.6, #61's third AC. The one thing a ladder cannot do is put two of its own levels
    // on the same rung — so the fact that CLAIMED and SOLID are both L2 is what makes the
    // states provably NOT a second ladder. Asserted structurally, not by grepping for the
    // cut phrase.
    const byRung = C.phases.map((p) => rungIndexOf(p.rungId));
    expect(new Set(byRung).size).toBeLessThan(C.phases.length);
    // And the plan never descends: the rung index is monotonic across the four phases, so
    // the figure cannot draw a plan that climbs and falls inside one slide.
    expect([...byRung]).toEqual([...byRung].sort((a, b) => a - b));
  });

  test("no state is a rung name and no rung name is a state", () => {
    const rungWords = new Set(C.rungs.flatMap((r) => [r.level, r.title.toUpperCase()]));
    C.phases.forEach((p) => expect(rungWords.has(p.state), p.state).toBe(false));
  });

  test("the plan covers exactly three of the five rungs, and the geometry agrees", () => {
    // The scene-0 thesis says "three rungs of five". Two things have to hold or that
    // sentence is a caption over a different picture: the CONTENT has to put phases on
    // three rungs, and the GEOMETRY has to cut its lit path between the same two.
    const reached = C.rungs.filter((_, i) => phasesOnRung(i).length > 0);
    expect(reached).toHaveLength(3);
    expect(C.rungs.indexOf(reached[0])).toBe(PLAN_LOW_RUNG);
    expect(C.rungs.indexOf(reached[reached.length - 1])).toBe(PLAN_HIGH_RUNG);
    // L1 and L5 take no phase at all, which is what leaves both ends of the staircase
    // dashed without anybody maintaining a list of empty rungs.
    expect(phasesOnRung(0)).toHaveLength(0);
    expect(phasesOnRung(RUNG_COUNT - 1)).toHaveLength(0);
  });
});

// ── scene 0 · the ladder ─────────────────────────────────────────────────────

describe("scene 0 · the ladder", () => {
  test("draws three stretches that meet at the corners the plan is cut on", () => {
    renderSlide(GEMS, 0);
    const below = screen.getByTestId("phases-ladder-below").getAttribute("d");
    const plan = screen.getByTestId("phases-ladder-plan").getAttribute("d");
    const above = screen.getByTestId("phases-ladder-above").getAttribute("d");
    expect(below).toBe(HERO_PATH_BELOW);
    expect(plan).toBe(HERO_PATH_PLAN);
    expect(above).toBe(HERO_PATH_ABOVE);
    // THE JOINS ARE THE ASSERTION. Three paths that did not share their endpoints would
    // draw a staircase with two gaps in it, and at a 2px stroke nobody would call it a
    // bug — they would call it the design.
    const lastPoint = (d: string) => d.trim().split(/L\s*/).pop()?.trim();
    const firstPoint = (d: string) => d.replace(/^M\s*/, "").split(/L/)[0].trim();
    expect(firstPoint(plan!)).toBe(lastPoint(below!));
    expect(firstPoint(above!)).toBe(lastPoint(plan!));
  });

  test("the lit run is the only stretch that draws itself in", () => {
    renderSlide(GEMS, 0);
    // A path cannot both sweep and look dashed: the sweep IS a `stroke-dasharray`, and a
    // class setting it beats an attribute on the same element. Given the two, the dash is
    // the one carrying meaning, so the dead ends fade instead.
    expect(screen.getByTestId("phases-ladder-plan").getAttribute("class")).toContain("pg-draw");
    expect(screen.getByTestId("phases-ladder-plan").getAttribute("pathLength")).toBe("1");
    for (const id of ["phases-ladder-below", "phases-ladder-above"]) {
      expect(screen.getByTestId(id).getAttribute("class")).toContain("pg-arrive");
      expect(screen.getByTestId(id).getAttribute("class")).not.toContain("pg-draw");
      expect(screen.getByTestId(id).getAttribute("stroke-dasharray")).toBeTruthy();
    }
  });

  test("both notes point at a rung no phase reaches", () => {
    renderSlide(GEMS, 0);
    expect(textOf("phases-low-note-label")).toBe(C.lowNote.label);
    expect(textOf("phases-low-note-line")).toBe(C.lowNote.line);
    expect(textOf("phases-high-note-label")).toBe(C.highNote.label);
    expect(textOf("phases-high-note-line")).toBe(C.highNote.line);
    // Each names its own rung's level, so a note that drifted onto the wrong pocket would
    // be saying something false rather than merely sitting oddly.
    expect(C.lowNote.line).toContain(C.rungs[0].level);
    expect(C.highNote.line).toContain(C.rungs[RUNG_COUNT - 1].level);
    // Both leaders carry the arrowhead: these two POINT rather than tether, which is the
    // distinction `gap-capability-ladder` draws between its aside and its chips.
    for (const id of ["phases-low-leader", "phases-high-leader"]) {
      expect(screen.getByTestId(id).getAttribute("marker-end")).toContain("pg-note-arrow");
    }
  });

  test("the notes are dashed, which is the deck's mark for a rung nobody has earned", () => {
    renderSlide(GEMS, 0);
    for (const id of ["phases-low-note", "phases-high-note"]) {
      expect(screen.getByTestId(id).style.border).toContain("dashed");
      // TRANSPARENT AND NOT FILLED. A filled box is the register this deck spends on a
      // claim somebody made; these two describe an absence.
      expect(screen.getByTestId(id).style.background).toBe("transparent");
    }
  });

  test("holds both notes to their own budget", () => {
    for (const note of [C.lowNote, C.highNote]) {
      expect(note.line.length, note.label).toBeLessThanOrEqual(NOTE_LINE_BUDGET_CHARS);
    }
  });
});

// ── scenes 1 and 2 · the four cards ──────────────────────────────────────────

describe("scenes 1 and 2 · the same four cards, twice", () => {
  test("both scenes tile the same four boxes on the same shelf", () => {
    // THE DECISION THE WHOLE PAIR OF POSES RESTS ON. Given two cards the click from dates
    // to gates would re-layout, and a room reads that as the stage settling rather than as
    // one column answering its own question.
    renderSlide(GEMS, 1);
    const phaseGeom = C.phases.map((p) => {
      const el = screen.getByTestId(`phases-phase-${p.id}`);
      return [el.style.left, el.style.top, el.style.width, el.style.height].join("|");
    });
    goToPose(2);
    const gateGeom = C.phases.map((p) => {
      const el = screen.getByTestId(`phases-gate-${p.id}`);
      return [el.style.left, el.style.top, el.style.width, el.style.height].join("|");
    });
    expect(gateGeom).toEqual(phaseGeom);
    phaseGeom.forEach((g, i) =>
      expect(g).toBe([`${cardLeft(i)}px`, `${CARD_TOP}px`, `${CARD_WIDTH}px`, `${CARD_HEIGHT}px`].join("|")),
    );
  });

  test("both scenes print the same phase label and the same rung target", () => {
    // The two are what tie a column to itself across the click, and to the chip on the
    // staircase three clicks later.
    renderSlide(GEMS, 1);
    const phaseHeads = C.phases.map((p) => [
      textOf(`phases-phase-label-${p.id}`),
      textOf(`phases-phase-target-${p.id}`),
    ]);
    goToPose(2);
    const gateHeads = C.phases.map((p) => [
      textOf(`phases-gate-label-${p.id}`),
      textOf(`phases-gate-target-${p.id}`),
    ]);
    expect(gateHeads).toEqual(phaseHeads);
    C.phases.forEach((p, i) => {
      expect(phaseHeads[i][0]).toBe(p.label);
      // THREE TOKENS, TWO SEPARATORS. `L2 · CLAIMED` reads as two facts; `L2 CLAIMED`
      // would read as a rung called "L2 CLAIMED", which is the re-labelling this slide
      // must not do.
      expect(phaseHeads[i][1]).toBe(`${rungOf(p.rungId).level} · ${p.state}`);
    });
  });

  test("only the mark and the body differ between the two", () => {
    renderSlide(GEMS, 1);
    const stateGlyphs = C.phases.map((p) => ({
      cls: screen.getByTestId(`phases-glyph-phase-${p.id}`).className,
      body: textOf(`phases-phase-body-${p.id}`),
    }));
    goToPose(2);
    C.phases.forEach((p, i) => {
      const gate = {
        cls: screen.getByTestId(`phases-glyph-gate-${p.id}`).className,
        body: textOf(`phases-gate-body-${p.id}`),
      };
      expect(gate.cls, p.id).not.toBe(stateGlyphs[i].cls);
      expect(gate.cls, p.id).toContain(`pg-glyph-${p.gateGlyph}`);
      expect(stateGlyphs[i].cls, p.id).toContain(`pg-glyph-${p.stateGlyph}`);
      expect(gate.body, p.id).toBe(p.gate);
      expect(gate.body, p.id).not.toBe(stateGlyphs[i].body);
    });
  });

  test("every mark the copy names has actually been drawn", () => {
    // The pin between `../content.ts` (which types the two glyph fields as `string`,
    // because a content module may not import a component) and `./PhaseGlyphs.tsx` (which
    // owns the union). Production checks it at MODULE LOAD; this is the same check made
    // where an author reads it.
    const drawn = new Set<string>(PHASE_GLYPH_IDS);
    C.phases.forEach((p) => {
      expect(drawn.has(p.stateGlyph), `${p.id}.stateGlyph = ${p.stateGlyph}`).toBe(true);
      expect(drawn.has(p.gateGlyph), `${p.id}.gateGlyph = ${p.gateGlyph}`).toBe(true);
    });
    // EIGHT MARKS AND EIGHT USES — no mark is drawn twice and none is orphaned, which is
    // what keeps the two scenes' grammars from bleeding into each other.
    const used = C.phases.flatMap((p) => [p.stateGlyph, p.gateGlyph]);
    expect(new Set(used).size).toBe(used.length);
    expect([...used].sort()).toEqual([...PHASE_GLYPH_IDS].sort());
  });

  test("scene 1 prints the citation and scene 2 does not", () => {
    // The citation is evidence for the CALENDARS. On the gates pose there is no calendar
    // on the stage, so a citation there would be sourcing a claim nobody made.
    renderSlide(GEMS, 1);
    expect(textOf("phases-provenance")).toBe(GEMS.provenance);
    goToPose(2);
    expect(screen.queryByTestId("phases-provenance")).toBeNull();
  });

  test("holds every gate to the card's budget", () => {
    C.phases.forEach((p) => {
      expect(p.gate.length, p.id).toBeLessThanOrEqual(GATE_BUDGET_CHARS);
      // A CONDITION AND NEVER A DATE. A gate that named a month would be a date wearing a
      // gate's label, and the calendar beside it would be saying the same thing twice.
      expect(p.gate, p.id).not.toMatch(MONTH);
      expect(p.gate, p.id).not.toMatch(CALENDAR_SHAPE);
    });
  });
});

// ── scene 3 · the whole plan ─────────────────────────────────────────────────

describe("scene 3 · the whole plan", () => {
  test("puts a chip on every rung a phase reaches, and on no other", () => {
    renderSlide(GEMS, 3);
    C.rungs.forEach((rung, i) => {
      const landing = phasesOnRung(i);
      const chips = screen.queryByTestId(`phases-recap-chips-${rung.id}`);
      if (landing.length === 0) {
        // NO PLACEHOLDER EITHER. A bare tread is the figure saying the plan does not go
        // there; an empty box would be the figure saying it failed to load.
        expect(chips, rung.id).toBeNull();
        return;
      }
      expect(chips, rung.id).not.toBeNull();
      landing.forEach((p) => expect(textOf(`phases-recap-chip-${p.id}`)).toBe(p.label));
    });
  });

  test("the chip and the column print the same phase label", () => {
    // THE ONLY THING TYING THE TWO BANDS TOGETHER, and the whole reason this pose exists.
    renderSlide(GEMS, 3);
    C.phases.forEach((p) => {
      expect(textOf(`phases-recap-chip-${p.id}`)).toBe(p.label);
      expect(textOf(`phases-recap-head-${p.id}`)).toContain(p.label);
      expect(textOf(`phases-recap-head-${p.id}`)).toContain(rungOf(p.rungId).level);
      expect(textOf(`phases-recap-head-${p.id}`)).toContain(p.state);
    });
  });

  test("carries BOTH halves the two hero scenes showed", () => {
    // A recap that dropped one of the two would be a fourth scene rather than a summary.
    renderSlide(BERAU, 3);
    C.phases.forEach((p) => {
      expect(textOf(`phases-recap-gate-${p.id}`)).toBe(p.gate);
      const cal = BERAU.calendars[p.id];
      const printed = textOf(`phases-recap-calendar-${p.id}`);
      if (cal.kind === "theirs") cal.rows.forEach((row) => expect(printed).toContain(row));
      else expect(printed).toBe(C.beyondRoadmap);
    });
  });

  test("cuts its staircase on the same corners as the hero's", () => {
    // Both are `stairPath` over their own tread table, so the lit run is lit in the same
    // place at a fifth of the rise. Re-derived here from the geometry's own function
    // rather than compared to a literal, because a literal is the copy that drifts.
    renderSlide(GEMS, 3);
    expect(screen.getByTestId("phases-recap-plan").getAttribute("d")).toBe(
      stairPath(RECAP_TREADS, 2 * PLAN_LOW_RUNG - 1, 2 * PLAN_HIGH_RUNG + 1),
    );
    // AND IT DOES NOT DRAW ITSELF IN. The room watched this shape sweep three clicks ago;
    // doing it again would make the recap read as a new figure.
    expect(screen.getByTestId("phases-recap-plan").getAttribute("class") ?? "").not.toContain(
      "pg-draw",
    );
  });

  test("holds every recap gate to the narrower column's budget", () => {
    C.phases.forEach((p) =>
      expect(p.gate.length, p.id).toBeLessThanOrEqual(RECAP_GATE_BUDGET_CHARS),
    );
  });
});

// ── the five poses ───────────────────────────────────────────────────────────

describe("the five poses", () => {
  test("the three heroes are exclusive and the last two accumulate", () => {
    const heroes = [
      ["phases-ladder-eyebrow", "phases-phases-eyebrow", "phases-gates-eyebrow"],
    ].flat();
    for (const pose of POSES) {
      const { unmount } = renderSlide(GEMS, pose);
      // NEVER TWO SCENES AT ONCE. Each hero replaces the one before it by being unmounted,
      // not by being gated — a gated scene plays its stagger once at slide mount, so
      // walking backwards would find it already assembled.
      const showing = heroes.filter((id) => screen.queryByTestId(id) !== null);
      expect(showing.length, `pose ${pose}`).toBeLessThanOrEqual(1);
      // The recap arrives at 3 and stays for 4.
      expect(screen.queryByTestId("phases-plan-eyebrow") !== null, `pose ${pose} · recap`).toBe(
        pose >= 3,
      );
      // The thesis and its rule are the last pose alone.
      expect(screen.queryByTestId("phases-thesis") !== null, `pose ${pose} · thesis`).toBe(
        pose === 4,
      );
      expect(screen.queryByTestId("phases-rule") !== null, `pose ${pose} · rule`).toBe(pose === 4);
      unmount();
    }
  });

  test("pose 4 adds to pose 3 and moves nothing", () => {
    // The thesis is what the recap is FOR. Cleared to one sentence the room reads an
    // assertion with its evidence gone; printed under the frame it summarises, it reads as
    // that frame's conclusion.
    renderSlide(GEMS, 3);
    const before = C.phases.map((p) => {
      const el = screen.getByTestId(`phases-recap-col-${p.id}`);
      return [el.style.left, el.style.top, el.style.width, el.style.height].join("|");
    });
    goToPose(4);
    const after = C.phases.map((p) => {
      const el = screen.getByTestId(`phases-recap-col-${p.id}`);
      return [el.style.left, el.style.top, el.style.width, el.style.height].join("|");
    });
    expect(after).toEqual(before);
  });

  test("exactly one sentence stands on the thesis shelf at every pose", () => {
    // ONE SHELF, ONE REGISTER, FOUR SENTENCES. The room learns after one click that the
    // line at the foot of the stage is the takeaway — which only works if there is never
    // more than one of them.
    const shelfIds = [
      "phases-ladder-thesis",
      "phases-phases-thesis",
      "phases-gates-thesis",
      "phases-thesis",
    ];
    for (const pose of POSES) {
      const { unmount } = renderSlide(GEMS, pose);
      const standing = shelfIds.filter((id) => screen.queryByTestId(id) !== null);
      // Pose 3 is the one frame with no line of its own: it is the recap, and its
      // conclusion arrives on the next click.
      expect(standing.length, `pose ${pose}`).toBe(pose === 3 ? 0 : 1);
      standing.forEach((id) => {
        const el = screen.getByTestId(id);
        expect(el.style.top, id).toBe(`${THESIS_TOP}px`);
        expect(el.style.fontSize, id).toBe(`${THESIS_TEXT_SIZE}px`);
        // UPRIGHT AND NOT ITALIC — K.1's register, and the whole of the owner's
        // instruction about this shelf.
        expect(el.style.fontStyle, id).toBe("");
        expect(el.tagName, id).toBe("P");
      });
      unmount();
    }
  });
});

// ── the brand axis ───────────────────────────────────────────────────────────

describe("every brand", () => {
  test("resolves a block, and the structure is not on the axis", () => {
    // §4.4 slot 6. The calendars, the citation and the ask vary; nothing else may. That is
    // what lets one structure carry two organisations' real roadmaps without either room
    // being shown a plan built around the other's dates.
    const blocks = ALL_BRANDS.map((b) => phasesGatesFor(b));
    blocks.forEach((block, i) => {
      expect(block, ALL_BRANDS[i]).toBeDefined();
      expect(Object.keys(block.calendars).sort()).toEqual(C.phases.map((p) => p.id).sort());
    });
    // Three distinct asks and three distinct citations — a brand that fell through to
    // another's block would show up here as a duplicate.
    expect(new Set(blocks.map((b) => b.closer)).size).toBe(ALL_BRANDS.length);
    expect(new Set(blocks.map((b) => b.provenance)).size).toBe(ALL_BRANDS.length);
  });

  test("holds every calendar row and every citation to its budget", () => {
    for (const brand of ALL_BRANDS) {
      const block = phasesGatesFor(brand);
      Object.entries(block.calendars).forEach(([id, cal]) => {
        if (cal.kind !== "theirs") return;
        expect(cal.rows.length, `${brand}/${id}`).toBeLessThanOrEqual(CALENDAR_ROWS);
        cal.rows.forEach((row) =>
          expect(row.length, `${brand}/${id}: ${row}`).toBeLessThanOrEqual(
            CALENDAR_ROW_BUDGET_CHARS,
          ),
        );
      });
      expect(block.provenance.length, brand).toBeLessThanOrEqual(PROVENANCE_BUDGET_CHARS);
    }
  });

  test("no ask names a month, a quarter or a year", () => {
    // OWNER'S RULE, 2026-08-15, and it is a rule about what a thesis IS. The GEMS deck
    // used to close on "January is already on the calendar" and the Berau deck on a named
    // day. A sentence that turns on a date expires; a sentence that turns on a decision
    // does not, and this slide's whole argument is that the second kind is the one that
    // matters. The dates are all in the columns, where they are somebody else's.
    for (const brand of ALL_BRANDS) {
      const { closer } = phasesGatesFor(brand);
      expect(closer, brand).not.toMatch(MONTH);
      expect(closer, brand).not.toMatch(CALENDAR_SHAPE);
    }
  });

  test("each brand's calendar names only its own programme", () => {
    const rowsOf = (b: Brand) =>
      Object.values(phasesGatesFor(b).calendars)
        .flatMap((cal) => (cal.kind === "theirs" ? cal.rows : []))
        .join(" ")
        .toUpperCase();
    expect(rowsOf("gems")).not.toContain("BERAU");
    expect(rowsOf("berau")).not.toContain("AI FORGE");
    expect(rowsOf("berau")).not.toContain("GEMS");
    // `general` names no organisation at all, so it publishes no rows.
    expect(rowsOf("general")).toBe("");
  });
});

// ── GEMS ─────────────────────────────────────────────────────────────────────

describe("GEMS", () => {
  test("quotes its own programme, by name and by gate", () => {
    // TWO quoted fragments, because the two do different work: the TITLE is the
    // destination and "the post-assessment result" is the gate. A room that hears only one
    // hears either an ambition with no test or a test with no purpose.
    expect(GEMS.provenance).toContain("AI Forge");
    expect(GEMS.provenance).toContain("post-assessment result");
    expect(GEMS.provenance).toContain("GEMS");
  });

  test("puts AI Forge in P1 rather than in a fifth phase", () => {
    const p1 = GEMS.calendars.p1;
    expect(p1.kind).toBe("theirs");
    if (p1.kind !== "theirs") return;
    expect(p1.rows.join(" ")).toContain("AI FORGE");
    expect(C.phases).toHaveLength(PHASE_COUNT);
  });

  test("closes on what earns the destination their own roadmap already names", () => {
    expect(GEMS.closer.toLowerCase()).toContain("roadmap");
    expect(GEMS.closer.toLowerCase()).toContain("gates");
    expect(GEMS.closerKw.every((kw) => GEMS.closer.includes(kw))).toBe(true);
  });
});

// ── Berau, and the correction that made this block ───────────────────────────

describe("Berau", () => {
  test("does not claim P0 is complete", () => {
    // ═══ THE CORRECTION THIS DESCRIBE BLOCK EXISTS FOR (owner, 2026-08-15). The block
    // asserted "P0 is complete", headed its band "AUG 18 IS THE GATE", and closed on "The
    // AI Ambassadors already exist. Fund them, or lose them." The plan has slipped: the
    // workshop is delivered, THE COMPETITION IS STILL RUNNING, the post-assessment has not
    // been taken, and NO AMBASSADOR HAS BEEN NAMED. The failure mode is somebody restoring
    // the crisper, false version, so the forbidden claims are named here.
    const everything = [BERAU.provenance, BERAU.closer].join(" ").toLowerCase();
    expect(everything).not.toContain("p0 is complete");
    expect(everything).not.toContain("ambassador");
    expect(everything).not.toContain("aug 18");
  });

  test("prints the three P0 stages with their true status", () => {
    const p0 = BERAU.calendars.p0;
    expect(p0.kind).toBe("theirs");
    if (p0.kind !== "theirs") return;
    const rows = p0.rows.join(" | ").toUpperCase();
    expect(rows).toContain("WORKSHOP");
    expect(rows).toContain("COMPETITION");
    expect(rows).toContain("POST-ASSESSMENT");
    // THE STATUS WORD IS THE SECOND HALF OF EVERY ROW, and it is the row's whole reason
    // for existing after the correction: a window on its own reads as a promise kept.
    expect(rows).toContain("DONE");
    expect(rows).toContain("RUNNING");
    expect(rows).toContain("TO COME");
  });

  test("says the same three things in its citation as `gap-capability-ladder` does", () => {
    // The two slides describe one programme an hour apart. They are not wired together —
    // one is an evidence line on a ladder, one is a citation under a calendar — so the
    // agreement is asserted rather than shared, and it is asserted on the two facts that
    // moved.
    const cited = BERAU.provenance.toLowerCase();
    expect(cited).toContain("competition still runs");
    expect(cited).toContain("post-assessment is not in");
    expect(cited).toContain("post program ai development");
  });

  test("closes on a decision rather than on a date", () => {
    expect(BERAU.closer.toLowerCase()).toContain("decision");
    expect(BERAU.closerKw.every((kw) => BERAU.closer.includes(kw))).toBe(true);
  });

  test("renders its own calendar on the stage, and not the other brand's", () => {
    renderSlide(BERAU, 1);
    const p0 = BERAU.calendars.p0;
    if (p0.kind === "theirs") {
      p0.rows.forEach((row) => expect(textOf("phases-phase-body-p0")).toContain(row));
    }
    expect(textOf("phases-phase-body-p0")).not.toContain("W1");
    goToPose(4);
    expect(textOf("phases-thesis")).toContain("decision");
  });
});

// ── the exclusion this slide reverses ────────────────────────────────────────

describe("the programme framing reaches the leader decks and no other", () => {
  test("the slide is composed by both leader deck sets and by nothing else", () => {
    // §5.3 keeps the competition, the rewards, AI Forge and the post-assessment out of the
    // standard decks; it is the organiser's announcement and is handled verbally there.
    // Leaders are asked to SPONSOR, and "gates, not dates" needs real gates, so this slide
    // names all of it. THE REVERSAL IS SCOPED BY COMPOSITION AND BY NOTHING ELSE.
    const carrying = Object.entries(DECK_SET_COMPOSITION)
      .filter(([, set]) => set.slides.includes("mandate-phases-gates"))
      .map(([name]) => name);
    expect(carrying.length).toBeGreaterThan(0);
    carrying.forEach((name) => expect(name, name).toMatch(/leader/i));
  });
});

// ── the keyword rule ─────────────────────────────────────────────────────────

describe("keywords go on prose only", () => {
  test("no label box renders a highlight", () => {
    // A copper italic inside a mono uppercase name reads as a rendering fault, and inside
    // a citation it reads as the deck emphasising a fragment of somebody else's sentence.
    for (const pose of POSES) {
      const { unmount } = renderSlide(GEMS, pose);
      LABEL_BOXES.filter(([, at]) => at === pose).forEach(([id]) => {
        expect(screen.getByTestId(id).querySelector("em"), id).toBeNull();
      });
      unmount();
    }
  });

  test("every prose box renders exactly its authored keywords", () => {
    const prose: readonly (readonly [string, number, string, readonly string[]])[] = [
      ["phases-ladder-thesis", 0, C.ladderThesis, C.ladderThesisKw],
      ["phases-phases-thesis", 1, C.phasesThesis, C.phasesThesisKw],
      ["phases-gates-thesis", 2, C.gatesThesis, C.gatesThesisKw],
      ["phases-thesis", 4, GEMS.closer, GEMS.closerKw],
      ...C.phases.map(
        (p) =>
          [`phases-gate-body-${p.id}`, 2, p.gate, p.gateKw] as readonly [
            string,
            number,
            string,
            readonly string[],
          ],
      ),
    ];
    for (const [id, pose, text, kw] of prose) {
      const { unmount } = renderSlide(GEMS, pose);
      const el = screen.getByTestId(id);
      expect(el.textContent, id).toBe(text);
      const marks = [...el.querySelectorAll("em")].map((e) => e.textContent);
      expect(marks, id).toEqual([...kw]);
      // Every keyword is an exact substring of its own sentence, or the highlighter
      // silently renders none.
      kw.forEach((k) => expect(text, `${id}: ${k}`).toContain(k));
      unmount();
    }
  });
});

// ── geometry ─────────────────────────────────────────────────────────────────

describe("geometry", () => {
  test("the eyebrow clears the headline by the deck's own 34px", () => {
    // Complaint 2 of the re-cut, and the number is `.slide-content`'s own top rather than
    // one this slide invented. The shelf it replaced was 134 — 12px under a 40px display
    // line, which is leading and not air, so the room read two lines of one title.
    expect(EYEBROW_TOP).toBe(156);
    expect(EYEBROW_TOP - HEADLINE_BOTTOM).toBe(34);
  });

  test("every scene clears the copper rule", () => {
    // FOUR FLOORS, ONE CEILING. The rule's shelf and not the thesis' — the recap shares
    // pose 4 with the rule, so a scene measured against 590 would collide with the one
    // object that arrives over it.
    expect(SCENE_FLOOR).toBe(RULE_TOP);
    expect(HERO_LADDER_FLOOR, "the ladder's lowest definition").toBeLessThan(SCENE_FLOOR);
    expect(PROVENANCE_TOP + PROVENANCE_HEIGHT, "the citation").toBeLessThan(SCENE_FLOOR);
    expect(CARD_TOP + CARD_HEIGHT, "the cards").toBeLessThan(PROVENANCE_TOP);
    expect(RECAP_FLOOR, "the recap").toBeLessThan(SCENE_FLOOR);
  });

  test("the thesis stands on K.1's shelf, clear of the NavBar", () => {
    // 632 − 16 − 26. `leader-invest`'s register, K.1's since 2026-08-14, and this slide's
    // since the re-cut. `./geometry.ts`'s 572 is K.3's alone now, and that module records
    // what it costs.
    expect(THESIS_TOP).toBe(590);
    expect(THESIS_TEXT_SIZE).toBe(19);
    expect(RULE_TOP).toBeLessThan(THESIS_TOP);
    expect(THESIS_TOP + 26).toBeLessThanOrEqual(STAGE.height - 88);
  });

  test("the four cards tile the content width exactly", () => {
    const last = cardLeft(PHASE_COUNT - 1) + CARD_WIDTH;
    expect(last).toBe(SIDE_MARGIN + CONTENT_WIDTH);
    // And a column the row does not have throws rather than drawing two phases on top of
    // each other.
    expect(() => cardLeft(PHASE_COUNT)).toThrow(/no phase card/);
    expect(() => cardLeft(-1)).toThrow();
  });

  test("the hero staircase climbs left to right and ends on the left margin's mirror", () => {
    expect(HERO_TREADS).toHaveLength(RUNG_COUNT);
    HERO_TREADS.forEach((tread, i) => {
      if (i === 0) return;
      expect(tread.y, `rung ${i}`).toBeLessThan(HERO_TREADS[i - 1].y);
      // Every tread starts where the one below it finished, which is what makes the
      // risers fall out of the corner list rather than needing a table of their own.
      expect(tread.x1, `rung ${i}`).toBe(HERO_TREADS[i - 1].x2);
    });
    expect(STAGE.width - HERO_TREADS[RUNG_COUNT - 1].x2).toBe(HERO_TREADS[0].x1);
  });

  test("the recap's chips clear the eyebrow", () => {
    // The binding clearance is the chip row above the HIGHEST rung a phase actually lands
    // on — not the top tread, because L5 takes no phase and so may sit higher than any
    // chip could.
    const chipped = C.rungs.map((_, i) => i).filter((i) => phasesOnRung(i).length > 0);
    chipped.forEach((i) => expect(chipTop(i), `rung ${i}`).toBeGreaterThan(EYEBROW_TOP + 14));
    expect(() => chipTop(RUNG_COUNT)).toThrow(/no rung/);
  });

  test("both notes sit clear of every tread and of each other", () => {
    // The two pockets the staircase leaves. Asserted rather than eyeballed, because a note
    // 4px into a riser reads as a drawing fault and nobody can name it from the back row.
    const boxes = [
      { left: LOW_NOTE.left, top: LOW_NOTE.top },
      { left: HIGH_NOTE.left, top: HIGH_NOTE.top },
    ];
    boxes.forEach((box, i) => {
      expect(box.top, `note ${i} under the eyebrow`).toBeGreaterThan(EYEBROW_TOP + 14);
      HERO_TREADS.forEach((tread, r) => {
        const overlapsX = box.left < tread.x2 && box.left + NOTE_WIDTH > tread.x1;
        const overlapsY = box.top < tread.y && box.top + NOTE_HEIGHT > tread.y;
        expect(overlapsX && overlapsY, `note ${i} crosses rung ${r}`).toBe(false);
      });
    });
    // And they do not overlap each other in x.
    expect(boxes[0].left + NOTE_WIDTH).toBeLessThan(boxes[1].left);
  });

  test("the recap columns stand on the hero cards' own grid", () => {
    // Three clicks apart, the room's eye does not have to find a new column.
    renderSlide(GEMS, 3);
    C.phases.forEach((p, i) => {
      expect(screen.getByTestId(`phases-recap-col-${p.id}`).style.left).toBe(`${cardLeft(i)}px`);
      expect(screen.getByTestId(`phases-recap-col-${p.id}`).style.top).toBe(`${RECAP_COL_TOP}px`);
    });
  });

  test("`stairPath` refuses a stretch it cannot draw", () => {
    expect(() => stairPath(HERO_TREADS, 3, 3)).toThrow(/does not climb/);
    expect(() => stairPath(HERO_TREADS, 0, 99)).toThrow(/no corner/);
  });
});

// ── the stylesheet ───────────────────────────────────────────────────────────

describe("the stylesheet", () => {
  const css = readFileSync(CSS_PATH, "utf8");

  test("prefixes every keyframe with the figure's own name", () => {
    // Every slide family owns its own keyframes, so retiming one figure can never retime
    // another's. The rule is stated beside `gap-ladder-draw` in `src/styles/globals.css`
    // and kept by `enablement.css`, `no-sop.css`, `governance.css` and `tam-kotter.css`.
    const names = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
    expect(names.length, "no keyframes at all").toBeGreaterThan(9);
    names.forEach((name) => expect(name, name).toMatch(/^pg-/));
  });

  test("uses tokens only — no hex, no rgb(), no bare colour", () => {
    const declarations = css.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(declarations).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(declarations).not.toMatch(/\brgba?\(/);
    const tokens = [...declarations.matchAll(/var\(--([\w-]+)\)/g)].map((m) => m[1]);
    expect(tokens.length).toBeGreaterThan(5);
    tokens.forEach((token) =>
      expect(token, token).toMatch(/^(?:ease|copper-\d{3}|neutral-\d{1,3})$/),
    );
  });

  test("names every infinite animation in its reduced-motion block", () => {
    // THE HALF THE GLOBAL SQUASH CANNOT FINISH. `globals.css` sets every duration to
    // 0.01ms and one iteration, which parks a loop on its 100% frame — right for every
    // rule here by construction. Held as a set comparison rather than as a spot check,
    // because the failure is a loop somebody adds and forgets, and it is invisible until a
    // reduced-motion reader watches a projector.
    const block = css.match(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*)\}\s*$/)?.[1];
    expect(block, "no reduced-motion block").toBeDefined();
    const infinite = new Set(
      [...css.matchAll(/\.([\w-]+)\s*\{[^}]*animation:[^;]*\binfinite\b/g)].map((m) => m[1]),
    );
    // Non-vacuity: ten ambient loops across eight marks.
    expect(infinite.size).toBeGreaterThanOrEqual(10);
    infinite.forEach((cls) =>
      expect(block, `${cls} is not disarmed under reduced motion`).toContain(`.${cls}`),
    );
    // And the one frame the squash gets wrong is restated by value: a dashed ARRIVAL with
    // `animation: none` and no offset paints its `from` frame, which for `pg-draw` is an
    // empty staircase.
    expect(block).toMatch(/stroke-dashoffset:\s*0/);
  });

  test("declares transform-box on everything it transforms inside an SVG", () => {
    // Without it the origin is the nearest viewport's own, and a `scale` on a 3px dot
    // sends it across the glyph.
    expect(css).toMatch(/transform-box:\s*fill-box/);
    // The groups that rotate or scale about a named point in the glyph's coordinates opt
    // back out.
    expect(css).toMatch(/transform-box:\s*view-box/);
  });

  test("carries the whole-box hover's own two additions and nothing else", () => {
    // `.box-hover` in `globals.css` owns the border and the wash; this file owns the two
    // things a pseudo-element cannot reach — the box's inner hairline and the mark's
    // strokes — precisely so `:hover` can win them against an inline border.
    expect(css).toMatch(/\.pg-card:hover \.pg-hairline/);
    expect(css).toMatch(/\.pg-card:hover \.pg-glyph/);
  });
});

// ── the hover, on the stage ──────────────────────────────────────────────────

describe("every box on every scene answers the pointer", () => {
  test("carries `.box-hover` on the node that owns its own geometry", () => {
    // THE WHOLE BOX IS THE TARGET, and that is a property of WHERE THE CLASS SITS: the
    // classed node IS the `left/top/width/height` box, so its hover rectangle is the
    // painted box and not the text inside it. A pointer anywhere in it — over a label, a
    // rung target, a hairline, a mark, a calendar row or a gate line — is a pointer over
    // the box.
    const boxesAt: Record<number, readonly string[]> = {
      0: ["phases-low-note", "phases-high-note"],
      1: C.phases.map((p) => `phases-phase-${p.id}`),
      2: C.phases.map((p) => `phases-gate-${p.id}`),
      3: C.phases.map((p) => `phases-recap-col-${p.id}`),
      4: C.phases.map((p) => `phases-recap-col-${p.id}`),
    };
    for (const pose of POSES) {
      const { unmount } = renderSlide(GEMS, pose);
      const boxes = boxesAt[pose];
      expect(boxes.length, `pose ${pose} has no hoverable box`).toBeGreaterThan(0);
      boxes.forEach((id) => {
        const el = screen.getByTestId(id);
        expect(el.className, id).toContain("box-hover");
        expect(el.className, id).toContain("pg-card");
        // The border is declared INLINE and the wash is not: `.box-hover::before` carries
        // `border: inherit` at one tier up, which is the only mechanism that can beat an
        // inline declaration.
        expect(el.style.border, id).not.toBe("");
      });
      unmount();
    }
  });

  test("nothing that is not a box can take the pointer", () => {
    // A wide invisible line over a row of boxes would eat the hover of whatever it
    // overlapped the day a scene's shelf moved.
    const notBoxes: Record<number, readonly string[]> = {
      0: ["phases-ladder-eyebrow", "phases-plan-tag", "phases-ladder-thesis"],
      1: ["phases-phases-eyebrow", "phases-provenance", "phases-phases-thesis"],
      2: ["phases-gates-eyebrow", "phases-gates-thesis"],
      3: ["phases-plan-eyebrow", ...C.rungs.map((r) => `phases-recap-rung-${r.id}`)],
      4: ["phases-thesis"],
    };
    for (const pose of POSES) {
      const { unmount } = renderSlide(GEMS, pose);
      notBoxes[pose].forEach((id) =>
        expect(screen.getByTestId(id).style.pointerEvents, `pose ${pose} · ${id}`).toBe("none"),
      );
      unmount();
    }
  });
});

// ── under prefers-reduced-motion ─────────────────────────────────────────────

describe("under prefers-reduced-motion: reduce", () => {
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
    // SMIL is invisible to the global reduced-motion rule in `globals.css` — that rule
    // squashes CSS durations only — so a SMIL node would have to be gated at mount, as
    // `E12LoopAnatomy` gates its `<animateMotion>`. This slide gates nothing because it
    // mounts nothing to gate: the staircase, the eight marks and the two leaders are all
    // animated from `./phases.css`.
    //
    // THE `<svg>` COUNT IS PINNED WITH IT. This directory used to close the question by
    // holding no `<svg>` at all; K.1's recap connectors ended that, and a staircase that
    // sweeps itself in needs a `<path>`. So the count is asserted per pose instead: a
    // `<rect>` somebody reaches for is not what would go wrong — it is the `<animate>`
    // they add to it next.
    const EXPECTED_SVGS: Record<number, number> = {
      0: 1,
      1: PHASE_COUNT,
      2: PHASE_COUNT,
      3: 1 + PHASE_COUNT,
      4: 1 + PHASE_COUNT,
    };
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(GEMS, pose);
      const figLabel = container.querySelector(".fig-label");
      for (const tag of ["animate", "animateMotion", "animateTransform", "animateColor", "set"]) {
        const ours = [...container.querySelectorAll(tag)].filter((el) => !figLabel?.contains(el));
        expect(ours, `pose ${pose} · <${tag}>`).toHaveLength(0);
      }
      const svgs = [...container.querySelectorAll("svg")].filter((el) => !figLabel?.contains(el));
      expect(svgs, `pose ${pose} · <svg> count`).toHaveLength(EXPECTED_SVGS[pose]);
      svgs.forEach((svg) => {
        // Every mark restates its own box's label and body, both of which are real text a
        // few millimetres away; a screen reader that announced the mark as well would read
        // every card twice.
        const hidden = svg.getAttribute("aria-hidden") ?? svg.closest("[aria-hidden]") !== null;
        expect(hidden, `pose ${pose} · an svg the reader will hear twice`).toBeTruthy();
      });
      unmount();
    }
  });

  test("still mounts every scene it reaches, with its copy", () => {
    // WHAT THIS CAN AND CANNOT SAY. jsdom runs no animation, so "the pose rests on its
    // finished frame" is not checkable here — the global rule squashes a duration jsdom
    // never computes. This claims the DOM half: nothing about the markup reads
    // `matchMedia`, so every scene is byte-identical under either preference.
    for (const pose of POSES) {
      const { unmount } = renderSlide(BERAU, pose);
      for (const [id, at] of COPY_BOXES) {
        if (!at.includes(pose)) continue;
        expect(screen.getByTestId(id).textContent, `pose ${pose} · ${id}`).not.toBe("");
      }
      unmount();
    }
  });
});
