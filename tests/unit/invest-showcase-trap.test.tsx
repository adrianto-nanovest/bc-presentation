// D.2 — THE SURFACE AND THE SOURCE.
//
// WHAT THIS FILE IS FOR. Six things jsdom can settle, and it settles only those:
//
//   1. THE COMPOSITION — that the slide reaches both leader decks, second in the `invest`
//      run, behind D.1 and in front of the row that used to be D.2, and no standard deck.
//   2. THE GEOMETRY — that the effort line's whole quantitative claim is arithmetic: six
//      whole pixels of four hundred and eighty, derived from the two figures the readings
//      print. A reworded reading that left the drawing alone fails here.
//   3. THE FLOOR — that every scene bottoms out on ONE line, which is the 2026-08-16
//      redraw's structural claim and the defect it was drawn to fix. A pose that holds less
//      than another may not open a hole above the NavBar.
//   4. THE POSE WALK — that the three acts, the recap and the floor build forward and
//      unbuild backward inside ONE mounted tree; that the plate, the four frames and the
//      left column's dimension line are ONE object across three poses rather than three;
//      and that pose 0 → 1 moves nothing.
//   5. THE COPY — the keyword rule, the boundary list, and the character budgets. This is
//      the block that enforces ASD-STE100 on the copy, where an author can act on it.
//   6. THE STYLESHEET — read off disk, because the tempo contrast IS the argument and a
//      retimed keyframe is a changed claim.
//
// WHAT IT DOES NOT DO. Widths, line counts, computed matrices and the hover overlay's own
// opacity belong to a browser; jsdom computes no text and no layout. Nothing below asserts
// a duration as EVIDENCE either — the ratio is the line, and only the line.

import { readFileSync } from "node:fs";
import path from "node:path";
import { act, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BRANDS, type Brand, type DeckSetId } from "@/deck-variants";
import { useDeck } from "@/deck/DeckContext";
import { composeDeck } from "@/deck/compose";
import { DECK_SET_COMPOSITION } from "@/deck/deck-sets";
import { slideCatalogue } from "@/deck/slide-catalogue";
import { resolveDeckSetSlides } from "@/deck/slots";
import { SlideHarness } from "../support/slide-harness";
import {
  InvestShowcaseTrap,
  investShowcaseTrapSlide,
} from "@/slides/leader-invest/invest-showcase-trap";
import {
  investShowcaseTrapContent as C,
  investBaseRatesContent,
  investChickenEggContent,
  investGovernanceContent,
} from "@/slides/leader-invest/content";
import {
  BAR_COUNT,
  BAR_WIDTH,
  BODY_TOP,
  BOX_FINDING_BUDGET_CHARS,
  BOX_HEIGHT,
  BOX_QUESTION_BUDGET_CHARS,
  BOX_TOP,
  BOX_WIDTH,
  COLUMN_GAP,
  COLUMN_WIDTH,
  CONTENT_RIGHT,
  CONTENT_WIDTH,
  DELIVERABLE_COUNT,
  EFFORT_RATIO,
  EYEBROW_TOP,
  FIGURE_BOTTOM,
  HEADLINE_BUDGET_CHARS,
  HERO_LEFT,
  HOLLOW_HEIGHT,
  HOLLOW_TOP,
  LAYER_COUNT,
  LAYER_LINE_BUDGET_CHARS,
  LAYER_STACK_BOTTOM,
  LAYER_TOP,
  MARK_BUDGET_CHARS,
  MARK_LEFT,
  MARK_WIDTH,
  METER_TOP,
  METER_UNIT,
  METER_WIDTH,
  NAV_ZONE_TOP,
  PLATE_PAD,
  PLATE_TOP,
  PLATE_WIDTH,
  PROMPT_BUILD_BUDGET_CHARS,
  PROMPT_FOOT_BUDGET_CHARS,
  PROMPT_HEIGHT,
  PROMPT_LEFT,
  PROMPT_LINE_BUDGET_CHARS,
  PROMPT_TOP,
  QUESTION_COUNT,
  READING_TOP,
  RIGHT_COL,
  RULE_TOP,
  SCENE_BOTTOM,
  SENTENCE_BUDGET_CHARS,
  SENTENCE_CLEARANCE,
  SENTENCE_HEIGHT,
  SENTENCE_SIZE,
  SENTENCE_TOP,
  SIDE_MARGIN,
  SOURCE_DAYS,
  SURFACE_FILL,
  SURFACE_MINUTES,
  THUMB_HEIGHT,
  THUMB_WIDTH,
  TWIN_LEFT,
  WORKDAY_HOURS,
  barLeft,
  boxLeft,
  layerTop,
  meterFootTick,
  meterHeadTick,
  promptBuildTop,
} from "@/slides/leader-invest/showcase-trap-geometry";
import { TRAP_GLYPH_IDS } from "@/slides/leader-invest/components/ShowcaseTrapGlyphs";

const AT = { letter: "D", num: 2, sectionKey: "invest" } as const;
const POSES = [0, 1, 2, 3, 4] as const;

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
    <SlideHarness def={investShowcaseTrapSlide} at={AT}>
      <Nav />
      <InvestShowcaseTrap />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

/** Mounted at all — the exclusive scenes are conditionally mounted, not gated. */
function mounted(testId: string): boolean {
  return screen.queryByTestId(testId) !== null;
}

/** `.fade` + `on` — for the Reveal-gated parts. */
function gateOpen(testId: string): boolean {
  const el = screen.queryByTestId(testId);
  return el !== null && el.classList.contains("on");
}

function delayOf(testId: string): number {
  return Number.parseFloat(screen.getByTestId(testId).style.transitionDelay);
}

function topOf(testId: string): string {
  return screen.getByTestId(testId).style.top;
}

function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) walkStrings(item, out);
  } else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  } else if (typeof value === "function") {
    throw new Error("a content block may hold no function — it is data, and only data.");
  }
  return out;
}

const authoredStrings = () => walkStrings(C);

function stageTextWithoutFigLabel(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

const LAYER_IDS = C.layers.map((l) => l.id);
const QUESTION_IDS = C.questions.map((q) => q.id);

/** One sentence tenant per pose, in pose order — the shelf's whole tenancy. */
const SENTENCES = [
  "showcase-trap-surface-line",
  "showcase-trap-source-line",
  "showcase-trap-twin-line",
  "showcase-trap-recap-line",
  "showcase-trap-thesis",
] as const;

const EYEBROWS = [
  "showcase-trap-surface-eyebrow",
  "showcase-trap-source-eyebrow",
  "showcase-trap-twin-eyebrow",
  "showcase-trap-recap-eyebrow",
] as const;

const STYLESHEET = readFileSync(
  path.resolve(process.cwd(), "src/slides/leader-invest/components/showcase-trap.css"),
  "utf8",
);

// ───────────────────── the slide def ─────────────────────

describe("the slide def", () => {
  test("is the file's basename, five poses, closing on the fullest one", () => {
    expect(investShowcaseTrapSlide.id).toBe("invest-showcase-trap");
    expect(investShowcaseTrapSlide.steps).toBe(5);
    // BOTH AS A LITERAL AND AS A DERIVATION: the fullest pose is the last one, and it is
    // the one PDF and PPTX export. Any earlier pose exports the recap with no ask under it,
    // which is this slide's argument with its conclusion missing.
    expect(investShowcaseTrapSlide.canonicalPose).toBe(4);
    expect(investShowcaseTrapSlide.canonicalPose).toBe(investShowcaseTrapSlide.steps - 1);
    expect(investShowcaseTrapSlide.animationMode).toBe("step-reveal");
    expect(investShowcaseTrapSlide.surface).toBe("dark");
    expect(investShowcaseTrapSlide.sectionKey).toBe("invest");
  });

  test("reaches both leader decks second in the invest run, and no standard deck", () => {
    // TWO KEYS, and `general` is a BRAND rather than a deck set — it runs the standard
    // composition, so "not in `standard`" is the whole of "not in a deck a leader is not in".
    const { leader, standard } = DECK_SET_COMPOSITION;
    expect(Object.keys(DECK_SET_COMPOSITION).sort()).toEqual(["leader", "standard"]);
    expect(leader.slides).toContain("invest-showcase-trap");
    expect(standard.slides).not.toContain("invest-showcase-trap");

    const at = leader.slides.indexOf("invest-showcase-trap");
    // THE ROW IN FRONT IS D.1 AND THE ROW BEHIND IS THE ONE THAT USED TO BE D.2. That is
    // the whole placement argument, asserted as adjacency rather than as a figure: this
    // slide is the MECHANISM of D.1's number, and it arms the marks on the slide behind it.
    expect(leader.slides[at - 1]).toBe("invest-base-rates");
    expect(leader.slides[at + 1]).toBe("invest-own-proof");
    expect(leader.slides[at + 2]).toBe("invest-chicken-egg");
  });

  test("composes as the invest run's second row in both leader brands", () => {
    function composedFor(deckSet: DeckSetId, brand: Brand) {
      return composeDeck(
        resolveDeckSetSlides(DECK_SET_COMPOSITION[deckSet], {
          defs: slideCatalogue,
          brand,
          practiceLab: BRANDS[brand].practiceLab,
        }),
      );
    }

    for (const brand of ["berau", "gems"] as const) {
      const { slides } = composedFor("leader", brand);
      const row = slides.find((s) => s.def.id === investShowcaseTrapSlide.id);
      expect(row, brand).toBeDefined();
      expect(row?.letter, brand).toBe("D");
      expect(row?.num, brand).toBe(2);
      // AND THE RUN IS SIX LONG, which is what the mid-run insert did to it.
      expect(slides.filter((s) => s.def.sectionKey === "invest"), brand).toHaveLength(6);
    }
  });

  test("renders byte for byte the same under both leader brands — no brand axis", () => {
    // The specimen is ours and the questions are generic, so this block imports no
    // `Brand` and neither leader deck may get a different string.
    const first = renderSlide(4);
    const berau = first.container.innerHTML;
    first.unmount();

    const second = renderSlide(4);
    expect(second.container.innerHTML).toBe(berau);
    second.unmount();
  });
});

// ───────────────────── the geometry ─────────────────────

describe("the geometry", () => {
  test("derives the effort ratio from the two figures the readings print", () => {
    expect(SURFACE_MINUTES).toBe(30);
    expect(SOURCE_DAYS).toBe(5);
    expect(WORKDAY_HOURS).toBe(8);
    expect(EFFORT_RATIO).toBe((SOURCE_DAYS * WORKDAY_HOURS * 60) / SURFACE_MINUTES);
    expect(EFFORT_RATIO).toBe(80);

    // THE WELD, AND IT IS THE POINT OF THIS FILE. The two figures are printed at the two
    // ENDS of the line that measures them, and in the two eyebrows that title the acts —
    // NOT in the headline, which makes the claim. If any of these four strings is reworded
    // without moving the drawing, one of these assertions fails.
    expect(C.surfaceReading.toLowerCase()).toContain("thirty minutes");
    expect(C.sourceReading.toLowerCase()).toContain("five days");
    expect(C.surfaceEyebrow.toLowerCase()).toContain("thirty minutes");
    expect(C.sourceEyebrow.toLowerCase()).toContain("five days");

    // AND THE TITLE CARRIES NO MEASUREMENT. §3's rule is that the label names the figure and
    // the title makes the claim; a headline reporting a stopwatch is evidence in the largest
    // type on the stage, which is what this slide shipped once and no longer does.
    expect(C.headline.toLowerCase()).not.toContain("thirty");
    expect(C.headline.toLowerCase()).not.toContain("five days");
    expect(C.headline.toLowerCase()).not.toMatch(
      /\b(minute|hour|day|week)s?\b|\bhow long\b|\btook\b/,
    );
  });

  test("cuts the line as a whole multiple of the ratio, so the sliver is 7 real pixels", () => {
    expect(METER_WIDTH % EFFORT_RATIO).toBe(0);
    expect(SURFACE_FILL).toBe(METER_WIDTH / EFFORT_RATIO);
    expect(SURFACE_FILL).toBe(METER_UNIT);
    expect(Number.isInteger(SURFACE_FILL)).toBe(true);
    expect(SURFACE_FILL).toBe(7);
    expect(METER_WIDTH).toBe(560);

    // IT RUNS ACROSS THE STAGE AND NOT UP IT. A 16:9 stage has 1184 usable pixels across
    // and 476 down from `BODY_TOP` to the rule, so the long axis is the only one that can
    // carry 1:80 at a unit a room can see.
    expect(meterHeadTick(HERO_LEFT)).toBe(HERO_LEFT + SURFACE_FILL);
    expect(meterFootTick(HERO_LEFT)).toBe(HERO_LEFT + METER_WIDTH);
  });

  test("spans the line across its whole column, edge for edge with the plate above it", () => {
    // THE LINE MEASURES THE COLUMN, SO IT HAS TO BE THE COLUMN. It shipped once at 480
    // inside a 528 column and read as a bar that had stalled short of the end — and it
    // stopped short of the plate and the four rows it is a reading for.
    expect(METER_WIDTH).toBe(COLUMN_WIDTH);
    expect(COLUMN_WIDTH % EFFORT_RATIO).toBe(0);
    for (const colLeft of [HERO_LEFT, RIGHT_COL]) {
      expect(meterFootTick(colLeft)).toBe(colLeft + COLUMN_WIDTH);
    }
    // and the twin's line stops exactly where the content does
    expect(meterFootTick(RIGHT_COL)).toBe(CONTENT_RIGHT);
  });

  test("centres the seven bars in their own plate, whatever the column is cut to", () => {
    // A RE-CUT COLUMN MUST NOT LEAVE THE CHART LOPSIDED — the bars' slot is derived from the
    // plate, so the margin is the same on both ends. It was two literals cut for a narrower
    // plate, and widening the column left 64px of air on the right and 26 on the left.
    const first = barLeft(HERO_LEFT, 0);
    const last = barLeft(HERO_LEFT, BAR_COUNT - 1) + BAR_WIDTH;
    const leftMargin = first - HERO_LEFT;
    const rightMargin = HERO_LEFT + COLUMN_WIDTH - last;
    expect(Math.abs(leftMargin - rightMargin), `${leftMargin} vs ${rightMargin}`).toBeLessThanOrEqual(1);
    expect(leftMargin).toBeGreaterThanOrEqual(PLATE_PAD);
  });

  test("puts the sentence shelf on the deck's own floor, derived up from the NavBar", () => {
    expect(NAV_ZONE_TOP).toBe(632);
    expect(SENTENCE_HEIGHT).toBe(26);
    expect(SENTENCE_SIZE).toBe(19);
    expect(SENTENCE_TOP).toBe(590);
    expect(RULE_TOP).toBe(553);
    // A tautology today, and the point is that it stays one.
    expect(SENTENCE_CLEARANCE).toBe(16);
  });

  test("clears the headline by 34px, which is why no eyebrow reads as a wrapped line", () => {
    // The one number the owner's note on this register was about. `.slide-headline.small`
    // is 40px on 1.05 from `top: 80`, so the row ends at 122.
    expect(EYEBROW_TOP).toBe(156);
    expect(EYEBROW_TOP - 122).toBe(34);
  });

  test("bottoms EVERY scene out on one line, which is what closed the hole in the stage", () => {
    // THE REDRAW'S STRUCTURAL CLAIM, and the defect it was drawn to fix: the figure used to
    // end at y=486 and leave 104 pixels of black above the NavBar on three poses and 174 on
    // a fourth. Every scene now ends on `SCENE_BOTTOM`, and the module says so at load.
    expect(FIGURE_BOTTOM).toBe(SCENE_BOTTOM);
    expect(FIGURE_BOTTOM).toBeLessThan(RULE_TOP);

    for (const [name, bottom] of [
      ["the four rows", LAYER_STACK_BOTTOM],
      ["the hollow frame", HOLLOW_TOP + HOLLOW_HEIGHT],
      ["the prompt card", PROMPT_TOP + PROMPT_HEIGHT],
      ["the recap", BOX_TOP + BOX_HEIGHT],
    ] as const) {
      expect(bottom, name).toBeLessThanOrEqual(SCENE_BOTTOM);
    }

    // and the three scenes that CAN reach it, do — a column that stopped short is the same
    // hole in a smaller size.
    expect(PROMPT_TOP + PROMPT_HEIGHT).toBe(SCENE_BOTTOM);
    expect(BOX_TOP + BOX_HEIGHT).toBe(SCENE_BOTTOM);

    // every scene also starts on one line
    expect(PLATE_TOP).toBe(BODY_TOP);
    expect(PROMPT_TOP).toBe(BODY_TOP);
    expect(BOX_TOP).toBe(BODY_TOP);
  });

  test("draws the hero and the twin at the same size, edge to edge", () => {
    // THE ONE THING ACT 3 MAY NOT ALLOW is a difference on the surface. Same width, same
    // top, and the twin's right edge is the content's own.
    expect(HERO_LEFT).toBe(SIDE_MARGIN);
    expect(TWIN_LEFT).toBe(RIGHT_COL);
    expect(TWIN_LEFT + PLATE_WIDTH).toBe(CONTENT_RIGHT);
    expect(2 * COLUMN_WIDTH + COLUMN_GAP).toBe(CONTENT_WIDTH);
    // and the two charts' bars are the same bars, offset by nothing but a left edge
    for (let i = 0; i < BAR_COUNT; i += 1) {
      expect(barLeft(TWIN_LEFT, i) - barLeft(HERO_LEFT, i)).toBe(TWIN_LEFT - HERO_LEFT);
    }
  });

  test("hangs the four rows off the plate, and the hollow frame over the same band", () => {
    expect(LAYER_TOP).toBeGreaterThan(PLATE_TOP);
    for (let i = 1; i < LAYER_COUNT; i += 1) {
      expect(layerTop(i)).toBeGreaterThan(layerTop(i - 1));
    }
    // The twin's empty frame occupies EXACTLY the band the four rows occupy, so pose 2
    // compares two equal rectangles rather than a tall thing against a short one.
    expect(HOLLOW_TOP).toBe(LAYER_TOP);
    expect(HOLLOW_TOP + HOLLOW_HEIGHT).toBe(LAYER_STACK_BOTTOM);
    // and the readings sit under both, over the line they name
    expect(READING_TOP).toBeGreaterThan(LAYER_STACK_BOTTOM);
    expect(METER_TOP).toBeGreaterThan(READING_TOP);
  });

  test("gives the prompt card the rectangle the twin column later takes", () => {
    // TWO TENANTS, ONE REGION. Pose 2 does not add an object beside the argument — it
    // replaces the thing that made the picture with a second picture made the same way.
    expect(PROMPT_LEFT).toBe(RIGHT_COL);
    expect(PROMPT_TOP).toBe(PLATE_TOP);
    expect(promptBuildTop(0)).toBeLessThan(promptBuildTop(DELIVERABLE_COUNT - 1));
    expect(DELIVERABLE_COUNT).toBe(C.promptBuilds.length);
  });

  test("tiles the three cards across the full content width, at the thumbnail's own ratio", () => {
    expect(boxLeft(0)).toBe(SIDE_MARGIN);
    expect(boxLeft(QUESTION_COUNT - 1) + BOX_WIDTH).toBeLessThanOrEqual(CONTENT_RIGHT);
    // THE THUMBNAIL IS 2:1, which is the user space `ShowcaseTrapGlyphs` authors all three
    // marks in (164×70 ≈ 2.34:1 painted into 328×140). A card that changed the ratio would
    // scale one mark differently from the next and put three line weights on one shelf.
    expect(THUMB_WIDTH).toBe(BOX_WIDTH - 2 * 20);
    expect(THUMB_WIDTH / THUMB_HEIGHT).toBeCloseTo(328 / 140, 5);
  });

  test("keeps the mark on the eyebrow's shelf, right of every eyebrow", () => {
    expect(MARK_LEFT + MARK_WIDTH).toBe(CONTENT_RIGHT);
    expect(MARK_LEFT).toBeGreaterThan(SIDE_MARGIN);
  });

  test("refuses an index it does not draw, rather than clamping it", () => {
    expect(() => layerTop(LAYER_COUNT)).toThrow(/no layer/);
    expect(() => boxLeft(QUESTION_COUNT)).toThrow(/no question/);
    expect(() => barLeft(HERO_LEFT, BAR_COUNT)).toThrow(/no bar/);
    expect(() => promptBuildTop(DELIVERABLE_COUNT)).toThrow(/no deliverable/);
  });
});

// ───────────────────── the three acts ─────────────────────

describe("act 1 · the picture", () => {
  test("paints one plate, its ink, the prompt card, the line, and four EMPTY frames", () => {
    const { unmount } = renderSlide(0);

    expect(mounted("showcase-trap-hero")).toBe(true);
    expect(mounted("showcase-trap-hero-ink")).toBe(true);
    expect(mounted("showcase-trap-meter")).toBe(true);
    expect(mounted("showcase-trap-prompt")).toBe(true);
    expect(mounted("showcase-trap-surface-eyebrow")).toBe(true);
    expect(mounted("showcase-trap-mark")).toBe(true);
    expect(mounted("showcase-trap-surface-line")).toBe(true);
    expect(mounted("showcase-trap-reading-head")).toBe(true);

    // THE FOUR FRAMES ARE ALREADY ON THE STAGE and their text is not. That is the pose's
    // second claim: there is something under this and the room is looking straight past it.
    for (const id of LAYER_IDS) {
      expect(gateOpen(`showcase-trap-layer-${id}`), id).toBe(true);
      expect(gateOpen(`showcase-trap-layer-label-${id}`), id).toBe(false);
      expect(gateOpen(`showcase-trap-layer-line-${id}`), id).toBe(false);
      // and nothing is drawing across a row that has not been named
      expect(mounted(`showcase-trap-wipe-${id}`), id).toBe(false);
    }

    // the foot reading has not arrived — the bar has not reached it
    expect(gateOpen("showcase-trap-reading-foot")).toBe(false);

    // nothing of the later acts
    expect(mounted("showcase-trap-twin")).toBe(false);
    expect(mounted("showcase-trap-hollow")).toBe(false);
    expect(mounted("showcase-trap-twin-meter")).toBe(false);
    // and nothing of the recap or the floor
    for (const id of QUESTION_IDS) {
      expect(mounted(`showcase-trap-box-${id}`), id).toBe(false);
    }
    expect(mounted("showcase-trap-thesis")).toBe(false);
    expect(mounted("showcase-trap-rule")).toBe(false);

    unmount();
  });

  test("fills the line to its sliver and no further", () => {
    const { unmount } = renderSlide(0);
    const fill = screen.getByTestId("showcase-trap-meter-fill");
    // A full-length rect scaled from its own left edge: 6 of 480.
    expect(fill.style.transform).toBe(`scaleX(${SURFACE_FILL / METER_WIDTH})`);
    // IT IS A TRANSITION AND NOT A KEYFRAME, so walking backwards is free and a reader
    // with motion turned off still lands on a measurable bar.
    expect(fill.style.transition).toContain("transform");
    unmount();
  });

  test("quotes the prompt, and three more things the same prompt makes", () => {
    const { unmount } = renderSlide(0);
    expect(screen.getByTestId("showcase-trap-prompt-label").textContent).toBe(C.promptLabel);
    expect(screen.getByTestId("showcase-trap-prompt-line").textContent).toBe(C.promptLine);
    expect(screen.getByTestId("showcase-trap-prompt-builds-label").textContent).toBe(
      C.promptBuildsLabel,
    );
    C.promptBuilds.forEach((line, i) => {
      expect(screen.getByTestId(`showcase-trap-prompt-build-${i}`).textContent).toBe(line);
    });
    expect(screen.getByTestId("showcase-trap-prompt-foot").textContent).toBe(C.promptFoot);
    unmount();
  });

  test("arrives eyebrow → plate → card → line → reading → mark → sentence", () => {
    const { unmount } = renderSlide(0);
    const order = [
      "showcase-trap-surface-eyebrow",
      "showcase-trap-hero",
      "showcase-trap-prompt",
      "showcase-trap-meter",
      "showcase-trap-reading-head",
      "showcase-trap-mark",
      "showcase-trap-surface-line",
    ];
    const delays = order.map(delayOf);
    for (let i = 1; i < delays.length; i += 1) {
      expect(delays[i], order[i]).toBeGreaterThan(delays[i - 1] as number);
    }
    // and the first frame lands AFTER the chart it stands under, never in front of it
    expect(delayOf(`showcase-trap-layer-${LAYER_IDS[0]}`)).toBeGreaterThan(
      delayOf("showcase-trap-hero"),
    );
    unmount();
  });
});

describe("act 2 · what is under it", () => {
  test("moves nothing at all — the same plate, the same frames, in the same place", () => {
    const { unmount } = renderSlide(0);
    const heroAtZero = screen.getByTestId("showcase-trap-hero");
    const frameAtZero = screen.getByTestId(`showcase-trap-layer-${LAYER_IDS[0]}`);
    const frameTop = frameAtZero.style.top;
    const cardAtZero = screen.getByTestId("showcase-trap-prompt");

    goToPose(1);

    // POSE 0 → 1 IS THE SMOOTHEST STEP ON THIS STAGE, and that is asserted as IDENTITY
    // rather than as coordinates: if any of these three remounted, the room would watch an
    // object leave and another arrive where the figure means "you were already looking at
    // it".
    expect(screen.getByTestId("showcase-trap-hero")).toBe(heroAtZero);
    expect(screen.getByTestId(`showcase-trap-layer-${LAYER_IDS[0]}`)).toBe(frameAtZero);
    expect(screen.getByTestId("showcase-trap-prompt")).toBe(cardAtZero);
    expect(frameAtZero.style.top).toBe(frameTop);

    for (const id of LAYER_IDS) {
      expect(gateOpen(`showcase-trap-layer-label-${id}`), id).toBe(true);
      expect(gateOpen(`showcase-trap-layer-line-${id}`), id).toBe(true);
      expect(mounted(`showcase-trap-wipe-${id}`), id).toBe(true);
    }
    expect(gateOpen("showcase-trap-reading-foot")).toBe(true);
    expect(mounted("showcase-trap-source-line")).toBe(true);
    expect(mounted("showcase-trap-surface-line")).toBe(false);
    unmount();
  });

  test("lights the four frames rather than replacing them", () => {
    const { unmount } = renderSlide(0);
    // READ OFF THE `border` SHORTHAND AND NOT OFF `borderColor`. jsdom keeps a shorthand
    // whose colour is a `var()` as the string it was written as and resolves no longhand
    // from it, so `borderColor` is empty on both sides of the step and would compare equal
    // whatever the figure did.
    const dormant = LAYER_IDS.map(
      (id) => screen.getByTestId(`showcase-trap-layer-${id}`).style.border,
    );
    goToPose(1);
    const lit = LAYER_IDS.map(
      (id) => screen.getByTestId(`showcase-trap-layer-${id}`).style.border,
    );

    // §7.1 — ATTENTION IS BOUGHT WITH ADDED LIGHT. The border changes tier and the border
    // STYLE does not: dashed is the encoding, and a frame that went solid would be saying
    // the room can now see the thing it is about to be told it cannot.
    for (let i = 0; i < LAYER_IDS.length; i += 1) {
      expect(lit[i], LAYER_IDS[i]).not.toBe(dormant[i]);
      expect(
        screen.getByTestId(`showcase-trap-layer-${LAYER_IDS[i]}`).style.border,
      ).toMatch(/^1px dashed /);
    }
    unmount();
  });

  test("fills the line to its far end", () => {
    const { unmount } = renderSlide(1);
    expect(screen.getByTestId("showcase-trap-meter-fill").style.transform).toBe("scaleX(1)");
    unmount();
  });

  test("lands the four rows on a WIDER pitch than the deck's, which is the tempo claim", () => {
    const { unmount } = renderSlide(1);
    const delays = LAYER_IDS.map((id) => delayOf(`showcase-trap-layer-label-${id}`));
    for (let i = 1; i < delays.length; i += 1) {
      expect(delays[i], LAYER_IDS[i]).toBeGreaterThan(delays[i - 1] as number);
    }
    // The pitch between rows is the same for every pair, and it is wider than the deck's
    // own 90ms stagger. Act 1's chart is complete before act 2's second row has arrived.
    const pitch = (delays[1] as number) - (delays[0] as number);
    expect(pitch).toBe(260);
    expect(pitch).toBeGreaterThan(90);

    // AND THE SENTENCE WAITS FOR ALL FOUR. It is the longest wait on this stage and it is
    // the point of the pose: the room finishes reading before the figure finishes drawing.
    expect(delayOf("showcase-trap-source-line")).toBeGreaterThan(delays[3] as number);
    unmount();
  });

  test("names all four rows and what each one took", () => {
    const { unmount } = renderSlide(1);
    for (const layer of C.layers) {
      expect(screen.getByTestId(`showcase-trap-layer-label-${layer.id}`).textContent).toBe(
        layer.label,
      );
      expect(screen.getByTestId(`showcase-trap-layer-line-${layer.id}`).textContent).toBe(
        layer.line,
      );
    }
    unmount();
  });
});

describe("act 3 · two charts", () => {
  test("draws a second column with an empty frame and a bill of its own", () => {
    const { unmount } = renderSlide(2);

    expect(mounted("showcase-trap-hero")).toBe(true);
    expect(mounted("showcase-trap-twin")).toBe(true);
    expect(mounted("showcase-trap-twin-ink")).toBe(true);
    expect(mounted("showcase-trap-hollow")).toBe(true);
    expect(mounted("showcase-trap-scan")).toBe(true);
    expect(mounted("showcase-trap-twin-meter")).toBe(true);
    expect(mounted("showcase-trap-twin-reading")).toBe(true);

    // The four rows are still there, still lit, in the same tier: nothing is dimmed to
    // promote the twin (§7.1), and the only thing that changed is what appears BESIDE them.
    for (const id of LAYER_IDS) {
      expect(gateOpen(`showcase-trap-layer-label-${id}`), id).toBe(true);
    }
    expect(gateOpen("showcase-trap-reading-foot")).toBe(true);

    // TWO TENANTS, ONE RECTANGLE. The prompt card occupied the twin's rectangle and is gone.
    expect(mounted("showcase-trap-prompt")).toBe(false);
    unmount();
  });

  test("bills the two charts differently and draws both bills at ONE scale", () => {
    const { unmount } = renderSlide(2);
    // THE PAYOFF FRAME. Two surfaces the room has just failed to tell apart, over two
    // dimension lines that are not close — and the two lines are the same object at the
    // same length, so the comparison is a reading and not an illustration.
    expect(screen.getByTestId("showcase-trap-meter-fill").style.transform).toBe("scaleX(1)");
    expect(screen.getByTestId("showcase-trap-twin-meter-fill").style.transform).toBe(
      `scaleX(${SURFACE_FILL / METER_WIDTH})`,
    );
    expect(screen.getByTestId("showcase-trap-twin-reading").textContent).toBe(
      C.surfaceReading,
    );
    expect(screen.getByTestId("showcase-trap-reading-foot").textContent).toBe(
      C.sourceReading,
    );
    unmount();
  });

  test("names the absence, because a drawing cannot", () => {
    const { unmount } = renderSlide(2);
    expect(screen.getByTestId("showcase-trap-hollow-label").textContent).toBe(C.hollowLabel);
    unmount();
  });

  test("puts both plates on one top, at one width", () => {
    const { unmount } = renderSlide(2);
    const hero = screen.getByTestId("showcase-trap-hero");
    const twin = screen.getByTestId("showcase-trap-twin");
    expect(twin.style.top).toBe(hero.style.top);
    expect(twin.style.width).toBe(hero.style.width);
    expect(twin.style.height).toBe(hero.style.height);
    unmount();
  });
});

// ───────────────────── the recap and the floor ─────────────────────

describe("the recap", () => {
  test("replaces all three acts with three cards, each carrying a thumbnail", () => {
    const { unmount } = renderSlide(3);

    expect(mounted("showcase-trap-hero")).toBe(false);
    expect(mounted("showcase-trap-twin")).toBe(false);
    expect(mounted("showcase-trap-prompt")).toBe(false);
    expect(mounted("showcase-trap-meter")).toBe(false);
    expect(mounted("showcase-trap-mark")).toBe(false);
    expect(mounted("showcase-trap-recap-eyebrow")).toBe(true);

    for (const q of C.questions) {
      expect(gateOpen(`showcase-trap-box-${q.id}`), q.id).toBe(true);
      expect(mounted(`showcase-trap-glyph-${q.id}`), q.id).toBe(true);
      expect(screen.getByTestId(`showcase-trap-box-label-${q.id}`).textContent).toBe(q.label);
      expect(screen.getByTestId(`showcase-trap-box-finding-${q.id}`).textContent).toBe(
        q.finding,
      );
      expect(screen.getByTestId(`showcase-trap-box-question-${q.id}`).textContent).toBe(
        q.question,
      );
    }

    // the pose has its OWN sentence — the shelf is never empty, which is what stops the
    // stage opening a hole above the NavBar on the one pose that used to have none
    expect(mounted("showcase-trap-recap-line")).toBe(true);

    // the floor has NOT arrived yet — that is what pose 4 is for
    expect(mounted("showcase-trap-thesis")).toBe(false);
    expect(mounted("showcase-trap-rule")).toBe(false);
    unmount();
  });

  test("draws each thumbnail at the card's own measured box", () => {
    const { unmount } = renderSlide(3);
    for (const q of C.questions) {
      const thumb = screen.getByTestId(`showcase-trap-glyph-${q.id}`);
      expect(thumb.style.width, q.id).toBe(`${THUMB_WIDTH}px`);
      expect(thumb.style.height, q.id).toBe(`${THUMB_HEIGHT}px`);
      // ONE USER SPACE FOR ALL THREE, so a bar in the first card and a bar in the third are
      // the same bar at the same weight.
      expect(thumb.querySelector("svg")?.getAttribute("viewBox"), q.id).toBe("0 0 164 70");
    }
    unmount();
  });

  test("hands every card a hover overlay over its whole painted area", () => {
    const { unmount } = renderSlide(3);
    for (const q of C.questions) {
      const box = screen.getByTestId(`showcase-trap-box-${q.id}`);
      // `.box-hover` on the geometry node itself — so the hover rectangle IS the painted
      // box, not the text inside it. `border: inherit` on the overlay needs a real border.
      expect(box.classList.contains("box-hover"), q.id).toBe(true);
      expect(box.classList.contains("st-card"), q.id).toBe(true);
      expect(box.style.border, q.id).toMatch(/^1px solid /);
      expect(box.style.position, q.id).toBe("absolute");
      expect(box.style.width, q.id).toBe(`${BOX_WIDTH}px`);
      expect(box.style.height, q.id).toBe(`${BOX_HEIGHT}px`);
    }
    unmount();
  });

  test("hands every box on the ACTS a hover overlay too", () => {
    const zero = renderSlide(0);
    expect(screen.getByTestId("showcase-trap-hero").classList.contains("box-hover")).toBe(true);
    expect(screen.getByTestId("showcase-trap-prompt").classList.contains("box-hover")).toBe(
      true,
    );
    for (const id of LAYER_IDS) {
      const row = screen.getByTestId(`showcase-trap-layer-${id}`);
      expect(row.classList.contains("box-hover"), id).toBe(true);
      // DASHED IS THE ENCODING, and `border: inherit` keeps it dashed under the pointer.
      expect(row.style.border, id).toMatch(/^1px dashed /);
    }
    zero.unmount();

    const two = renderSlide(2);
    expect(screen.getByTestId("showcase-trap-twin").classList.contains("box-hover")).toBe(true);
    expect(screen.getByTestId("showcase-trap-hollow").classList.contains("box-hover")).toBe(true);
    two.unmount();
  });

  test("lets no shelf take a pointer, so nothing eats a box's hover", () => {
    const { unmount } = renderSlide(4);
    for (const id of ["showcase-trap-recap-eyebrow", "showcase-trap-thesis"]) {
      expect(screen.getByTestId(id).style.pointerEvents, id).toBe("none");
    }
    unmount();

    const acts = renderSlide(0);
    for (const id of [
      "showcase-trap-surface-eyebrow",
      "showcase-trap-surface-line",
      "showcase-trap-mark",
      "showcase-trap-reading-head",
      "showcase-trap-reading-foot",
    ]) {
      expect(screen.getByTestId(id).style.pointerEvents, id).toBe("none");
    }
    acts.unmount();
  });

  test("draws a mark this tree actually holds, for every question", () => {
    for (const q of C.questions) {
      expect(TRAP_GLYPH_IDS).toContain(q.glyph);
    }
    expect(new Set(C.questions.map((q) => q.glyph)).size).toBe(QUESTION_COUNT);
  });
});

describe("the floor", () => {
  test("arrives last, alone, on the shelf its five siblings use — and the recap does not move", () => {
    const { unmount } = renderSlide(3);
    const boxAtThree = screen.getByTestId(`showcase-trap-box-${QUESTION_IDS[0]}`);
    const topAtThree = boxAtThree.style.top;

    goToPose(4);

    // POSE 4 IS POSE 3 PLUS A RULE AND A NEW SENTENCE. The recap does not move, does not
    // re-animate and does not re-tile — the ask is what the recap is FOR.
    expect(screen.getByTestId(`showcase-trap-box-${QUESTION_IDS[0]}`)).toBe(boxAtThree);
    expect(boxAtThree.style.top).toBe(topAtThree);

    expect(mounted("showcase-trap-rule")).toBe(true);
    expect(mounted("showcase-trap-recap-line")).toBe(false);
    expect(topOf("showcase-trap-rule")).toBe(`${RULE_TOP}px`);
    expect(topOf("showcase-trap-thesis")).toBe(`${SENTENCE_TOP}px`);

    const thesis = screen.getByTestId("showcase-trap-thesis");
    expect(thesis.style.fontSize).toBe(`${SENTENCE_SIZE}px`);
    // UPRIGHT, not italic — an italic sentence alone on a cleared stage reads as a caption
    // for a picture that is missing. The only italic on the shelf is a keyword.
    expect(thesis.style.fontStyle).toBe("");
    expect(thesis.querySelectorAll("em").length).toBeGreaterThan(0);

    // THE RULE ARRIVES BEFORE THE SENTENCE — a rule that followed it would underline it.
    // Its delay is on the `.copper-rule` inside the positioned wrapper, because `CopperRule`
    // spreads no `data-*` and the wrapper is what carries the testid.
    const rule = screen.getByTestId("showcase-trap-rule").querySelector(".copper-rule");
    expect(rule, "the rule wrapper holds no CopperRule").not.toBeNull();
    const ruleDelay = Number.parseFloat((rule as HTMLElement).style.transitionDelay);
    expect(ruleDelay).toBeLessThan(delayOf("showcase-trap-thesis"));
    unmount();
  });
});

// ───────────────────── the pose walk ─────────────────────

describe("the pose walk", () => {
  test("builds forward and unbuilds backward inside ONE mounted tree", () => {
    const EXPECT: ReadonlyArray<readonly [number, readonly string[], readonly string[]]> = [
      [
        0,
        ["showcase-trap-hero", "showcase-trap-meter", "showcase-trap-prompt", "showcase-trap-surface-line"],
        ["showcase-trap-twin", "showcase-trap-thesis", "showcase-trap-twin-meter", `showcase-trap-wipe-${LAYER_IDS[0]}`],
      ],
      [
        1,
        ["showcase-trap-hero", "showcase-trap-prompt", `showcase-trap-wipe-${LAYER_IDS[0]}`, "showcase-trap-source-line"],
        ["showcase-trap-twin", "showcase-trap-thesis", "showcase-trap-surface-line"],
      ],
      [
        2,
        ["showcase-trap-hero", "showcase-trap-twin", "showcase-trap-hollow", "showcase-trap-scan", "showcase-trap-twin-meter"],
        ["showcase-trap-prompt", "showcase-trap-thesis", "showcase-trap-recap-line"],
      ],
      [
        3,
        [`showcase-trap-box-${QUESTION_IDS[0]}`, "showcase-trap-recap-eyebrow", "showcase-trap-recap-line"],
        ["showcase-trap-hero", "showcase-trap-twin", "showcase-trap-thesis", "showcase-trap-rule", "showcase-trap-mark"],
      ],
      [
        4,
        [`showcase-trap-box-${QUESTION_IDS[0]}`, "showcase-trap-rule", "showcase-trap-thesis"],
        ["showcase-trap-hero", "showcase-trap-twin", "showcase-trap-meter", "showcase-trap-recap-line"],
      ],
    ];

    const { unmount } = renderSlide(0);

    const check = (label: string) => {
      for (const [pose, present, absent] of EXPECT) {
        goToPose(pose);
        for (const id of present) expect(mounted(id), `${label} pose ${pose}: ${id}`).toBe(true);
        for (const id of absent) expect(mounted(id), `${label} pose ${pose}: ${id}`).toBe(false);
      }
    };

    check("forward");
    // and backward, in the same tree — which is what catches a scene that was gated when
    // it should have been mounted: a gated scene plays its stagger once, at slide mount.
    const reversed = [...EXPECT].reverse();
    for (const [pose, present, absent] of reversed) {
      goToPose(pose);
      for (const id of present) expect(mounted(id), `backward pose ${pose}: ${id}`).toBe(true);
      for (const id of absent) expect(mounted(id), `backward pose ${pose}: ${id}`).toBe(false);
    }

    unmount();
  });

  test("prints exactly one sentence on ONE shelf at EVERY pose", () => {
    // THE STRUCTURAL FIX, ASSERTED. Five poses, five tenants, one rectangle — a pose with
    // no sentence is a pose with a hole between the figure and the NavBar, and that is the
    // defect the 2026-08-16 redraw was drawn to close.
    const { unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      const present = SENTENCES.filter(mounted);
      expect(present, `pose ${pose}`).toHaveLength(1);
      expect(present[0], `pose ${pose}`).toBe(SENTENCES[pose]);
      expect(topOf(present[0] as string)).toBe(`${SENTENCE_TOP}px`);
    }
    unmount();
  });

  test("prints exactly one eyebrow on one shelf at every pose", () => {
    const { unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      const present = EYEBROWS.filter(mounted);
      expect(present, `pose ${pose}`).toHaveLength(1);
      expect(topOf(present[0] as string), `pose ${pose}`).toBe(`${EYEBROW_TOP}px`);
    }
    unmount();
  });

  test("shows the provenance mark exactly while our specimen is on the stage", () => {
    const { unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      expect(mounted("showcase-trap-mark"), `pose ${pose}`).toBe(pose <= 2);
    }
    unmount();
  });
});

// ───────────────────── the copy ─────────────────────

describe("the copy", () => {
  test("names no letter and no figure number, anywhere", () => {
    for (const s of authoredStrings()) {
      expect(s, s).not.toMatch(/\b[A-N]\.\d\b/);
      expect(s, s).not.toMatch(/\bfig(ure)?\s*\d/i);
    }
  });

  test("prints no digit at all — no date, no price, no percentage", () => {
    // THE TWO FIGURES ARE WORDS. "thirty minutes" and "five days" are the whole
    // quantitative content of this slide, and a digit anywhere would be a second one.
    for (const s of authoredStrings()) {
      expect(s, s).not.toMatch(/\d/);
    }
  });

  test("references no organisation, no vendor and no repository path", () => {
    const FORBIDDEN: ReadonlyArray<readonly [string, RegExp]> = [
      ["an organisation", /\b(gems|berau|nanovest|minetech|digitech|sinar\s*mas)\b/i],
      ["a vendor", /\b(openai|anthropic|google|chatgpt|claude|gemini|copilot)\b/i],
      ["a path", /\b(src\/|docs\/|tests\/|\.tsx?\b)/],
      ["a publisher", /\b(mckinsey|bcg|gartner|deloitte)\b/i],
    ];
    for (const s of authoredStrings()) {
      for (const [what, pattern] of FORBIDDEN) {
        expect(pattern.test(s), `${what} in: ${s}`).toBe(false);
      }
    }
  });

  test("repeats no token a sibling in this run owns", () => {
    // THE WHOLE REASON THIS SLIDE CAN SIT BETWEEN D.1 AND D.3. Each pattern below is a
    // live string somewhere else in the composed leader deck; the owner is resolved from
    // the sibling MODULE rather than transcribed, so a reworded sibling moves this test.
    const SIBLING_TOKENS: ReadonlyArray<readonly [string, RegExp, readonly string[]]> = [
      // D.1's figures are DIGITS, and the "no digit at all" test above refuses every one of
      // them absolutely. What D.1 owns in WORDS is its reading, and that is what this row
      // keeps this slide off.
      ["the base rate's reading", /\b(high performers?|the common position|base rate)\b/i, walkStrings(investBaseRatesContent)],
      ["the deadlock's vocabulary", /\b(kill criterion|spend cap|shared accounts?|proof pilot)\b/i, walkStrings(investChickenEggContent)],
      ["governance's vocabulary", /\b(managed seat|revoke|audit|the account)\b/i, walkStrings(investGovernanceContent)],
      ["the traps' vocabulary", /\b(vibe coding|prompt-and-pray|confidently wrong|hallucinat|stale data|context rot)\b/i, []],
      ["shadow AI", /\bshadow\s*ai\b/i, []],
      ["the mandate's levers", /\b(block the time|name a champion|a gate, not a date)\b/i, []],
      ["D.3's epistemic marks", /\b(vendor-reported|participant-claimed|not independently audited)\b/i, []],
    ];

    for (const [what, pattern] of SIBLING_TOKENS) {
      for (const s of authoredStrings()) {
        expect(pattern.test(s), `${what} in: ${s}`).toBe(false);
      }
    }

    // NON-VACUITY: a pattern that fires on nothing proves nothing. Each sibling corpus
    // that names an owner must actually contain the token this slide is refusing.
    for (const [what, pattern, corpus] of SIBLING_TOKENS) {
      if (corpus.length === 0) continue;
      expect(corpus.some((s) => pattern.test(s)), `${what}: the owner no longer prints it`).toBe(
        true,
      );
    }
  });

  test("keeps `kw` on prose only, and every keyword inside its own sentence", () => {
    const PROSE: ReadonlyArray<readonly [string, readonly string[]]> = [
      [C.headline, C.headlineKw],
      [C.surfaceLine, C.surfaceLineKw],
      [C.sourceLine, C.sourceLineKw],
      [C.twinLine, C.twinLineKw],
      [C.recapLine, C.recapLineKw],
      [C.closer, C.closerKw],
      ...C.questions.map((q) => [q.question, q.questionKw] as const),
    ];

    for (const [sentence, keywords] of PROSE) {
      expect(keywords.length, sentence).toBeGreaterThan(0);
      // 1–3 keywords per chunk, which is the highlight primitive's own budget
      expect(keywords.length, sentence).toBeLessThanOrEqual(3);
      for (const kw of keywords) {
        expect(sentence, `"${kw}" is not inside "${sentence}"`).toContain(kw);
      }
    }

    // STRUCTURAL: no key ending in `Kw` may belong to anything that is not on that list.
    const proseKeys = new Set([
      "headlineKw",
      "surfaceLineKw",
      "sourceLineKw",
      "twinLineKw",
      "recapLineKw",
      "closerKw",
    ]);
    for (const key of Object.keys(C)) {
      if (!key.endsWith("Kw")) continue;
      expect(proseKeys.has(key), `${key} is a keyword list on something that is not prose`).toBe(
        true,
      );
    }

    // and the labels are forbidden from gaining one — INCLUDING every string on the prompt
    // card, which is the room's own position quoted without comment. A copper italic there
    // would rank a concession against the claim on the shelf under it.
    for (const key of [
      "figLabel",
      "chartTitle",
      "mark",
      "hollowLabel",
      "recapEyebrow",
      "promptLabel",
      "promptLine",
      "promptBuildsLabel",
      "promptFoot",
    ]) {
      expect(Object.keys(C)).not.toContain(`${key}Kw`);
    }
    for (const layer of C.layers) {
      expect(Object.keys(layer)).not.toContain("lineKw");
    }
    for (const q of C.questions) {
      expect(Object.keys(q)).not.toContain("findingKw");
      expect(Object.keys(q)).not.toContain("labelKw");
    }
  });

  test("holds every sentence to its own box, and to ASD-STE100's ten words", () => {
    const SENTENCE_BUDGETS: ReadonlyArray<readonly [string, string, number]> = [
      // THE HEADLINE HAS ITS OWN, TIGHTER CEILING, and it is the one budget on this stage
      // that is a hard floor: a two-line headline ends at y=164 and prints through the
      // eyebrow shelf at 156. jsdom computes no text, so it is held here.
      ["headline", C.headline, HEADLINE_BUDGET_CHARS],
      ["surfaceLine", C.surfaceLine, SENTENCE_BUDGET_CHARS],
      ["sourceLine", C.sourceLine, SENTENCE_BUDGET_CHARS],
      ["twinLine", C.twinLine, SENTENCE_BUDGET_CHARS],
      ["recapLine", C.recapLine, SENTENCE_BUDGET_CHARS],
      ["closer", C.closer, SENTENCE_BUDGET_CHARS],
      ["mark", C.mark, MARK_BUDGET_CHARS],
      ["promptLine", C.promptLine, PROMPT_LINE_BUDGET_CHARS],
      ["promptFoot", C.promptFoot, PROMPT_FOOT_BUDGET_CHARS],
      ...C.promptBuilds.map((l, i) => [`build ${i}`, l, PROMPT_BUILD_BUDGET_CHARS] as const),
      ...C.layers.map((l) => [`layer ${l.id}`, l.line, LAYER_LINE_BUDGET_CHARS] as const),
      ...C.questions.map((q) => [`finding ${q.id}`, q.finding, BOX_FINDING_BUDGET_CHARS] as const),
      ...C.questions.map(
        (q) => [`question ${q.id}`, q.question, BOX_QUESTION_BUDGET_CHARS] as const,
      ),
    ];

    for (const [name, sentence, budget] of SENTENCE_BUDGETS) {
      expect(sentence.length, `${name}: "${sentence}"`).toBeLessThanOrEqual(budget);
    }

    // ONE IDEA PER LINE AND NO SENTENCE PAST TEN WORDS — the copy rule this block's own
    // header states as the measurable form of ASD-STE100 for a board read to in a second
    // language. The mark is three tokens rather than a sentence, so it is exempt.
    const PROSE = [
      C.headline,
      C.surfaceLine,
      C.sourceLine,
      C.twinLine,
      C.recapLine,
      C.closer,
      C.promptLine,
      C.promptFoot,
      ...C.promptBuilds,
      ...C.layers.map((l) => l.line),
      ...C.questions.map((q) => q.finding),
      ...C.questions.map((q) => q.question),
    ];
    for (const sentence of PROSE) {
      for (const clause of sentence.split(/(?<=[.?])\s+/)) {
        const words = clause.trim().split(/\s+/).filter(Boolean);
        expect(words.length, `"${clause}" in "${sentence}"`).toBeLessThanOrEqual(10);
      }
    }
  });

  test("shares no word between the label and the title", () => {
    // THE LABEL NAMES THE FIGURE AND THE TITLE MAKES THE CLAIM, and never in each other's
    // words — a title in its label's vocabulary is a caption for the drawing rather than an
    // argument about it.
    const words = (s: string) =>
      new Set(
        s
          .toLowerCase()
          .replace(/[^a-z\s]/g, " ")
          .split(/\s+/)
          .filter((w) => w.length > 3),
      );
    const shared = [...words(C.figLabel)].filter((w) => words(C.headline).has(w));
    expect(shared, `the label and the title share: ${shared.join(", ")}`).toEqual([]);
  });

  test("ends every question in a question mark, and every finding in a full stop", () => {
    for (const q of C.questions) {
      expect(q.question, q.id).toMatch(/\?$/);
      expect(q.question, q.id).toMatch(/^(How|Where|Who|What|When|Which|Why)\b/);
      expect(q.finding, q.id).toMatch(/\.$/);
    }
  });

  test("keeps the four names inside the column that prints them", () => {
    // 112px at 11px mono on 0.16em is ≈16 characters. A name that overflowed would print
    // over its own sentence.
    for (const layer of C.layers) {
      expect(layer.label.length, layer.label).toBeLessThanOrEqual(16);
      expect(layer.label, layer.label).toBe(layer.label.toUpperCase());
    }
  });

  test("concedes before it argues, and concedes without a hedge", () => {
    // THE SLIDE'S WHOLE RISK is a room that has to give something up before it can agree.
    // The prompt card is the concession and it may not be written as a complaint: no
    // "only", no "just", no "merely", and nothing on it may be a question.
    const CARD = [C.promptLabel, C.promptLine, C.promptBuildsLabel, ...C.promptBuilds, C.promptFoot];
    for (const s of CARD) {
      expect(s, s).not.toMatch(/\b(only|just|merely|but|however|although)\b/i);
      expect(s, s).not.toContain("?");
    }
    // and it is on the stage BEFORE the argument is — pose 0, not pose 1.
    const { unmount } = renderSlide(0);
    expect(mounted("showcase-trap-prompt")).toBe(true);
    unmount();
  });

  test("renders every authored string it is supposed to, and nothing it is not", () => {
    const WALKED = new Set(authoredStrings());
    const seen = new Set<string>();

    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      const text = stageTextWithoutFigLabel(container);
      for (const s of WALKED) {
        if (text.includes(s)) seen.add(s);
      }
      // non-vacuity: a stage with no text on it proves nothing
      expect(text.length, `pose ${pose}`).toBeGreaterThan(80);
      unmount();
    }

    // AN ID IS A SELECTOR AND NOT COPY. `figLabel` is stripped above; the layer and question
    // ids and the glyph names are keys this figure indexes by, and none of them is printed.
    const SELECTORS = new Set<string>([
      C.figLabel,
      ...C.questions.map((q) => q.glyph),
      ...C.questions.map((q) => q.id),
      ...C.layers.map((l) => l.id),
    ]);
    const orphans = [...WALKED].filter((s) => !seen.has(s) && !SELECTORS.has(s));
    expect(orphans).toEqual([]);
  });
});

// ───────────────────── the stylesheet ─────────────────────

describe("the stylesheet", () => {
  test("prefixes every keyframe with `st-`, so retiming this figure retimes no other", () => {
    const names = [...STYLESHEET.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
    expect(names.length).toBeGreaterThan(4);
    for (const name of names) {
      expect(name, name).toMatch(/^st-/);
    }
  });

  test("runs the four rows slower than the chart, which is the figure's second encoding", () => {
    // ACT 1's BARS AGAINST ACT 2's ROWS, read off the stylesheet. If these two ever cross,
    // the slide says the opposite of what it means.
    const bar = /animation:\s*st-bar-rise\s+(\d+)ms/.exec(STYLESHEET);
    const row = /animation:\s*st-row-wipe\s+(\d+)ms/.exec(STYLESHEET);
    expect(bar, "st-bar-rise has no duration").not.toBeNull();
    expect(row, "st-row-wipe has no duration").not.toBeNull();
    expect(Number(row?.[1])).toBeGreaterThan(Number(bar?.[1]));
  });

  test("restates the two properties `.fade` owns, so a frame's light can ramp", () => {
    // THE ONE SHORTHAND TRAP IN THE FIGURE. `.fade` declares `transition: opacity,
    // transform`; a frame that only carried that class would snap its border colour in one
    // frame at pose 1, which is the moment the whole slide turns on. The rule has to be more
    // specific than `.fade` so it does not depend on which sheet the bundler emits last.
    const rule = /\.fade\.st-row\s*\{([^}]*)\}/.exec(STYLESHEET);
    expect(rule, "no `.fade.st-row` transition rule").not.toBeNull();
    const body = rule?.[1] ?? "";
    for (const property of ["opacity", "transform", "border-color"]) {
      expect(body, property).toContain(property);
    }
  });

  test("answers `prefers-reduced-motion` for every infinite rule, and finishes the draws", () => {
    const at = STYLESHEET.indexOf("@media (prefers-reduced-motion: reduce)");
    expect(at, "no reduced-motion block").toBeGreaterThan(0);
    const squash = STYLESHEET.slice(at);

    // every selector that declares an infinite animation must be named in the squash
    const infinite = [...STYLESHEET.matchAll(/([^{}]+)\{[^{}]*animation:[^;}]*infinite[^;}]*;/g)]
      .map((m) => (m[1] ?? "").trim())
      .filter(Boolean);
    expect(infinite.length).toBeGreaterThan(4);
    for (const selector of infinite) {
      const leaf = selector.split(/\s+/).pop() ?? selector;
      expect(squash, `${selector} is not answered under reduced motion`).toContain(leaf);
    }

    // and a squashed DRAW must be told where to land — `stroke-dasharray: 1` survives the
    // global squash, so an unrestated offset leaves the line invisible.
    expect(squash).toContain("stroke-dashoffset: 0");
    // the typed line's rest width IS the whole string, so killing its animation is the fix
    expect(squash).toContain(".st-type");
  });

  test("holds every colour as a variable — no hex, no rgb(), no named colour", () => {
    // COMMENTS ARE STRIPPED FIRST, which is D.4's own precedent: this file's header states
    // the rule in prose ("no hex, no rgb()"), so a pattern over the raw text would fire on
    // the documentation and never on a defect. The one `rgba()` in this tree is
    // `globals.css`'s hover wash and is not this file's.
    const declarations = STYLESHEET.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(declarations.length, "a rule over no declarations proves nothing").toBeGreaterThan(600);
    expect(declarations).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(declarations).not.toMatch(/\brgba?\(/i);
    const tokens = [...declarations.matchAll(/var\(--([\w-]+)\)/g)].map((m) => m[1]);
    expect(tokens.length).toBeGreaterThan(0);
    for (const token of tokens) {
      expect(token, `"${token}" is not a deck token`).toMatch(
        /^(?:ease|copper-\d{3}|neutral-\d{1,3}|st-[\w-]+)$/,
      );
    }
  });

  test("draws the thumbnails at the plates' own hairline weight", () => {
    // THE MARKS ARE NO LONGER EMBLEMS, so they may not be drawn at an emblem's weight. The
    // shared user space is 164×70 painted into 328×140 — a scale of two — so a stroke over
    // one unit lands heavier than every hairline on the full-size stage.
    const base = /\.st-glyph :is\([^)]*\)\s*\{([^}]*)\}/.exec(STYLESHEET);
    expect(base, "no base stroke rule for the marks").not.toBeNull();
    const width = /stroke-width:\s*([\d.]+)/.exec(base?.[1] ?? "");
    expect(width, "the base stroke rule declares no width").not.toBeNull();
    expect(Number(width?.[1])).toBeLessThanOrEqual(1);
  });

  test("brightens the box under the pointer and dims nothing beside it", () => {
    expect(STYLESHEET).toContain(".st-card:hover .st-hairline");
    expect(STYLESHEET).toContain(".st-card:hover .st-glyph");
    // §7.1 — attention is bought with added light. Nothing on this stage may reduce
    // opacity or move on hover.
    const hoverRules = [...STYLESHEET.matchAll(/\.st-card:hover[^{]*\{([^}]*)\}/g)].map(
      (m) => m[1] ?? "",
    );
    expect(hoverRules.length).toBeGreaterThan(1);
    for (const body of hoverRules) {
      expect(body, body).not.toMatch(/\bopacity\b/);
      expect(body, body).not.toMatch(/\btransform\b/);
      expect(body, body).not.toMatch(/\bbox-shadow\b/);
      // NOTHING MAY CHANGE SIZE UNDER THE POINTER. A width here would grow the mark and
      // move the finding printed under it.
      expect(body, body).not.toMatch(/\bstroke-width\b/);
      expect(body, body).not.toMatch(/\b(width|height|font-size|padding|inset)\b/);
    }
  });

  test("never puts a stroke on a FILLED shape under the pointer — the mark may not grow", () => {
    // THE ONE SPECIFICITY TRAP IN THIS REGISTER, and it shipped once.
    // `.st-glyph .st-solid { stroke: none }` is (0,2,0); the hover stroke rule is (0,3,1) and
    // out-specified it, so every filled bar of a thumbnail gained a stroke on its own edge.
    // Both halves of the fix are asserted, because either one alone would be specificity
    // arithmetic a future edit could tip.
    const declarations = STYLESHEET.replace(/\/\*[\s\S]*?\*\//g, "");

    // 1 · the hover stroke rule excludes filled shapes by name
    const strokeRule = /\.st-card:hover\s+\.st-glyph\s+:is\([^)]*\)([^{]*)\{/.exec(declarations);
    expect(strokeRule, "no hover stroke rule found").not.toBeNull();
    expect(strokeRule?.[1] ?? "", "the hover stroke rule does not exclude `.st-solid`").toContain(
      ":not(.st-solid)",
    );

    // 2 · and the filled-shape rule restates `stroke: none` itself
    const solidRule = /\.st-card:hover\s+\.st-glyph\s+\.st-solid\s*\{([^}]*)\}/.exec(declarations);
    expect(solidRule, "no hover rule for filled shapes found").not.toBeNull();
    expect(solidRule?.[1] ?? "").toMatch(/stroke:\s*none/);
    expect(solidRule?.[1] ?? "").toMatch(/fill:\s*var\(--copper-200\)/);

    // 3 · every filled shape in the marks carries the class the two rules above key off —
    //     the scan head is filled too, and it shipped as the second one.
    const glyphs = readFileSync(
      path.resolve(
        process.cwd(),
        "src/slides/leader-invest/components/ShowcaseTrapGlyphs.tsx",
      ),
      "utf8",
    );
    expect(glyphs).toContain("st-solid");
    expect(glyphs).toContain("st-solid st-scan-head");
  });

  test("declares no SMIL anywhere in the figure", () => {
    const figure = readFileSync(
      path.resolve(
        process.cwd(),
        "src/slides/leader-invest/components/ShowcaseTrapBeats.tsx",
      ),
      "utf8",
    );
    const glyphs = readFileSync(
      path.resolve(
        process.cwd(),
        "src/slides/leader-invest/components/ShowcaseTrapGlyphs.tsx",
      ),
      "utf8",
    );
    // COMMENTS ARE STRIPPED FIRST. Both files' headers state these rules in prose, so a
    // pattern over the raw text fires on the documentation and never on a defect.
    const strip = (src: string) =>
      src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

    for (const [name, source] of [
      ["ShowcaseTrapBeats", strip(figure)],
      ["ShowcaseTrapGlyphs", strip(glyphs)],
    ] as const) {
      expect(source.length, name).toBeGreaterThan(600);
      expect(source, name).not.toMatch(/<animate(Transform|Motion)?\b/);
      expect(source, name).not.toMatch(/\buseState\b|\buseEffect\b|requestAnimationFrame/);
    }
  });
});
