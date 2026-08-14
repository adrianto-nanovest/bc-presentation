// D.2 — THE SURFACE AND THE SOURCE.
//
// WHAT THIS FILE IS FOR. Five things jsdom can settle, and it settles only those:
//
//   1. THE COMPOSITION — that the slide reaches both leader decks, second in the `invest`
//      run, behind D.1 and in front of the row that used to be D.2, and no standard deck.
//   2. THE GEOMETRY — that the effort column's whole quantitative claim is arithmetic:
//      three whole pixels of two hundred and forty, derived from the two figures the
//      headline prints. A reworded headline that left the drawing alone fails here.
//   3. THE POSE WALK — that the three acts, the recap and the floor build forward and
//      unbuild backward inside ONE mounted tree, and that the plate is one object across
//      three poses rather than three plates.
//   4. THE COPY — the keyword rule, the boundary list, and the character budgets. This is
//      the block that enforces ASD-STE100 on the copy, where an author can act on it.
//   5. THE STYLESHEET — read off disk, because the tempo contrast IS the argument and a
//      retimed keyframe is a changed claim.
//
// WHAT IT DOES NOT DO. Widths, line counts, computed matrices and the hover overlay's own
// opacity belong to a browser; jsdom computes no text and no layout. Nothing below asserts
// a duration as EVIDENCE either — the ratio is the column, and only the column.

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
  ACT_LINE_BUDGET_CHARS,
  ACT_LINE_HEIGHT,
  HEADLINE_BUDGET_CHARS,
  ACT_LINE_TOP,
  BAR_COUNT,
  BOX_FINDING_BUDGET_CHARS,
  BOX_FINDING_OFFSET,
  BOX_GLYPH_OFFSET,
  BOX_HAIRLINE_OFFSET,
  BOX_HEIGHT,
  BOX_QUESTION_BUDGET_CHARS,
  BOX_TOP,
  BOX_WIDTH,
  CONTENT_RIGHT,
  CONTENT_WIDTH,
  EFFORT_RATIO,
  EYEBROW_TOP,
  FIGURE_BOTTOM,
  GLYPH_SIZE,
  HERO_LEFT,
  HOLLOW_HEIGHT,
  HOLLOW_TOP,
  LAYER_COUNT,
  LAYER_LINE_BUDGET_CHARS,
  LAYER_STACK_BOTTOM,
  LAYER_TOP,
  MARK_BUDGET_CHARS,
  METER_HEIGHT,
  NAV_ZONE_TOP,
  PLATE_TOP,
  PLATE_WIDTH,
  QUESTION_COUNT,
  RULE_TOP,
  SIDE_MARGIN,
  SOURCE_DAYS,
  SURFACE_FILL,
  SURFACE_MINUTES,
  THESIS_BUDGET_CHARS,
  THESIS_CLEARANCE,
  THESIS_HEIGHT,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  TWIN_LEFT,
  WORKDAY_HOURS,
  barLeft,
  boxLeft,
  layerTop,
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
    // the one PDF and PPTX export. Any earlier pose exports the recap with no sentence
    // under it, which is this slide's argument with its conclusion missing.
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
  test("derives the effort ratio from the two figures the headline prints", () => {
    expect(SURFACE_MINUTES).toBe(30);
    expect(SOURCE_DAYS).toBe(5);
    expect(WORKDAY_HOURS).toBe(8);
    expect(EFFORT_RATIO).toBe((SOURCE_DAYS * WORKDAY_HOURS * 60) / SURFACE_MINUTES);
    expect(EFFORT_RATIO).toBe(80);

    // THE WELD, AND IT IS THE POINT OF THIS FILE. The two figures are printed BESIDE the
    // column that measures them and in the two eyebrows that title the acts — NOT in the
    // headline, which makes the claim. If any of these four strings is reworded without
    // moving the drawing, one of these assertions fails.
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

  test("cuts the column as a whole multiple of the ratio, so the sliver is 3 real pixels", () => {
    expect(METER_HEIGHT % EFFORT_RATIO).toBe(0);
    expect(SURFACE_FILL).toBe(METER_HEIGHT / EFFORT_RATIO);
    expect(Number.isInteger(SURFACE_FILL)).toBe(true);
    expect(SURFACE_FILL).toBe(3);
    expect(METER_HEIGHT).toBe(240);
  });

  test("puts the thesis on the deck's own shelf, derived up from the NavBar", () => {
    expect(NAV_ZONE_TOP).toBe(632);
    expect(THESIS_HEIGHT).toBe(26);
    expect(THESIS_TEXT_SIZE).toBe(19);
    expect(THESIS_TOP).toBe(590);
    expect(RULE_TOP).toBe(553);
    // A tautology today, and the point is that it stays one.
    expect(THESIS_CLEARANCE).toBe(16);
  });

  test("clears the headline by 34px, which is why no eyebrow reads as a wrapped line", () => {
    // The one number the owner's note on this register was about. `.slide-headline.small`
    // is 40px on 1.05 from `top: 80`, so the row ends at 122.
    expect(EYEBROW_TOP).toBe(156);
    expect(EYEBROW_TOP - 122).toBe(34);
  });

  test("keeps every scene clear of the thesis band, and says so at module load", () => {
    expect(FIGURE_BOTTOM).toBeLessThan(RULE_TOP);
    expect(ACT_LINE_TOP + ACT_LINE_HEIGHT).toBeLessThan(RULE_TOP);
    expect(LAYER_STACK_BOTTOM).toBeLessThan(RULE_TOP);
    expect(BOX_TOP + BOX_HEIGHT).toBeLessThan(RULE_TOP);
  });

  test("draws the hero and the twin at the same size, edge to edge", () => {
    // THE ONE THING ACT 3 MAY NOT ALLOW is a difference on the surface. Same width, same
    // top, and the twin's right edge is the content's own.
    expect(HERO_LEFT).toBe(SIDE_MARGIN);
    expect(TWIN_LEFT + PLATE_WIDTH).toBe(CONTENT_RIGHT);
    expect(2 * PLATE_WIDTH).toBeLessThanOrEqual(CONTENT_WIDTH);
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
  });

  test("tiles the three boxes across the full content width, and centres each mark", () => {
    expect(boxLeft(0)).toBe(SIDE_MARGIN);
    expect(boxLeft(QUESTION_COUNT - 1) + BOX_WIDTH).toBeLessThanOrEqual(CONTENT_RIGHT);
    // The mark is the midpoint of the band between the hairline and the finding — derived,
    // so a re-cut box or a third finding line moves it.
    expect(BOX_GLYPH_OFFSET).toBe(
      Math.round(BOX_HAIRLINE_OFFSET + (BOX_FINDING_OFFSET - BOX_HAIRLINE_OFFSET - GLYPH_SIZE) / 2),
    );
    expect(GLYPH_SIZE).toBe(88);
  });

  test("refuses an index it does not draw, rather than clamping it", () => {
    expect(() => layerTop(LAYER_COUNT)).toThrow(/no layer/);
    expect(() => boxLeft(QUESTION_COUNT)).toThrow(/no question/);
    expect(() => barLeft(HERO_LEFT, BAR_COUNT)).toThrow(/no bar/);
  });
});

// ───────────────────── the three acts ─────────────────────

describe("act 1 · the chart", () => {
  test("paints one plate, its ink, the column and nothing of act 2", () => {
    const { unmount } = renderSlide(0);

    expect(mounted("showcase-trap-hero")).toBe(true);
    expect(mounted("showcase-trap-hero-ink")).toBe(true);
    expect(mounted("showcase-trap-column")).toBe(true);
    expect(mounted("showcase-trap-surface-eyebrow")).toBe(true);
    expect(mounted("showcase-trap-mark")).toBe(true);
    expect(mounted("showcase-trap-surface-line")).toBe(true);

    // nothing of the later acts
    for (const id of LAYER_IDS) {
      expect(mounted(`showcase-trap-layer-${id}`), id).toBe(false);
    }
    expect(mounted("showcase-trap-twin")).toBe(false);
    expect(mounted("showcase-trap-hollow")).toBe(false);
    expect(mounted("showcase-trap-reading-head")).toBe(false);
    // and nothing of the recap or the floor
    for (const id of QUESTION_IDS) {
      expect(mounted(`showcase-trap-box-${id}`), id).toBe(false);
    }
    expect(mounted("showcase-trap-thesis")).toBe(false);

    unmount();
  });

  test("fills the column to its sliver and no further", () => {
    const { unmount } = renderSlide(0);
    const fill = screen.getByTestId("showcase-trap-column-fill");
    // A full-height rect scaled from its own foot: 3 of 240.
    expect(fill.style.transform).toBe(`scaleY(${SURFACE_FILL / METER_HEIGHT})`);
    // IT IS A TRANSITION AND NOT A KEYFRAME, so walking backwards is free and a reader
    // with motion turned off still lands on a measurable column.
    expect(fill.style.transition).toContain("transform");
    unmount();
  });

  test("arrives eyebrow → plate → column → reading → mark → line, and the line is LAST", () => {
    const { unmount } = renderSlide(0);
    const order = [
      "showcase-trap-surface-eyebrow",
      "showcase-trap-hero",
      "showcase-trap-column",
      "showcase-trap-reading-foot",
      "showcase-trap-mark",
      "showcase-trap-surface-line",
    ];
    const delays = order.map(delayOf);
    for (let i = 1; i < delays.length; i += 1) {
      expect(delays[i], order[i]).toBeGreaterThan(delays[i - 1] as number);
    }
    unmount();
  });
});

describe("act 2 · what is under it", () => {
  test("keeps the SAME plate and adds four rows under it", () => {
    const { unmount } = renderSlide(0);
    const heroAtZero = screen.getByTestId("showcase-trap-hero");

    goToPose(1);
    // THE PLATE IS ONE OBJECT ACROSS THREE POSES. If it remounted, this identity fails and
    // the room would watch three charts assemble instead of one.
    expect(screen.getByTestId("showcase-trap-hero")).toBe(heroAtZero);

    for (const id of LAYER_IDS) {
      expect(gateOpen(`showcase-trap-layer-${id}`), id).toBe(true);
    }
    expect(mounted("showcase-trap-reading-head")).toBe(true);
    expect(mounted("showcase-trap-source-line")).toBe(true);
    expect(mounted("showcase-trap-surface-line")).toBe(false);
    unmount();
  });

  test("fills the column to its top", () => {
    const { unmount } = renderSlide(1);
    expect(screen.getByTestId("showcase-trap-column-fill").style.transform).toBe("scaleY(1)");
    unmount();
  });

  test("lands the four rows on a WIDER pitch than the deck's, which is the tempo claim", () => {
    const { unmount } = renderSlide(1);
    const delays = LAYER_IDS.map((id) => delayOf(`showcase-trap-layer-${id}`));
    for (let i = 1; i < delays.length; i += 1) {
      expect(delays[i], LAYER_IDS[i]).toBeGreaterThan(delays[i - 1] as number);
    }
    // The pitch between rows is the same for every pair, and it is wider than the deck's
    // own 90ms stagger. Act 1's chart is complete before act 2's second row has arrived.
    const pitch = (delays[1] as number) - (delays[0] as number);
    expect(pitch).toBe(260);
    expect(pitch).toBeGreaterThan(90);
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
  test("draws a second plate with an empty frame, and takes the column off the stage", () => {
    const { unmount } = renderSlide(2);

    expect(mounted("showcase-trap-hero")).toBe(true);
    expect(mounted("showcase-trap-twin")).toBe(true);
    expect(mounted("showcase-trap-twin-ink")).toBe(true);
    expect(mounted("showcase-trap-hollow")).toBe(true);
    expect(mounted("showcase-trap-scan")).toBe(true);

    // The four rows are still there, in the same tier: nothing is dimmed to promote the
    // twin (§7.1), and the only thing that changed is what appears BESIDE them.
    for (const id of LAYER_IDS) {
      expect(gateOpen(`showcase-trap-layer-${id}`), id).toBe(true);
    }

    // TWO TENANTS, ONE RECTANGLE. The column occupied the twin's rectangle and is gone.
    expect(mounted("showcase-trap-column")).toBe(false);
    expect(mounted("showcase-trap-mark")).toBe(false);
    expect(mounted("showcase-trap-reading-foot")).toBe(false);
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
  test("replaces all three acts with three boxes, each carrying a mark", () => {
    const { unmount } = renderSlide(3);

    expect(mounted("showcase-trap-hero")).toBe(false);
    expect(mounted("showcase-trap-twin")).toBe(false);
    expect(mounted("showcase-trap-column")).toBe(false);
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

    // the floor has NOT arrived yet — that is what pose 4 is for
    expect(mounted("showcase-trap-thesis")).toBe(false);
    expect(mounted("showcase-trap-rule")).toBe(false);
    unmount();
  });

  test("hands every box a hover overlay over its whole painted area", () => {
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
    zero.unmount();

    const two = renderSlide(2);
    for (const id of LAYER_IDS) {
      const row = screen.getByTestId(`showcase-trap-layer-${id}`);
      expect(row.classList.contains("box-hover"), id).toBe(true);
      // DASHED IS THE ENCODING, and `border: inherit` keeps it dashed under the pointer.
      expect(row.style.border, id).toMatch(/^1px dashed /);
    }
    expect(screen.getByTestId("showcase-trap-twin").classList.contains("box-hover")).toBe(true);
    expect(screen.getByTestId("showcase-trap-hollow").classList.contains("box-hover")).toBe(true);
    two.unmount();
  });

  test("lets no shelf take a pointer, so nothing eats a box's hover", () => {
    const { unmount } = renderSlide(4);
    for (const id of [
      "showcase-trap-recap-eyebrow",
      "showcase-trap-thesis",
    ]) {
      expect(screen.getByTestId(id).style.pointerEvents, id).toBe("none");
    }
    unmount();

    const acts = renderSlide(0);
    for (const id of [
      "showcase-trap-surface-eyebrow",
      "showcase-trap-surface-line",
      "showcase-trap-mark",
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

    // POSE 4 IS POSE 3 PLUS A RULE AND A LINE. The recap does not move, does not
    // re-animate and does not re-tile — the thesis is what the recap is FOR.
    expect(screen.getByTestId(`showcase-trap-box-${QUESTION_IDS[0]}`)).toBe(boxAtThree);
    expect(boxAtThree.style.top).toBe(topAtThree);

    expect(mounted("showcase-trap-rule")).toBe(true);
    expect(topOf("showcase-trap-rule")).toBe(`${RULE_TOP}px`);
    expect(topOf("showcase-trap-thesis")).toBe(`${THESIS_TOP}px`);

    const thesis = screen.getByTestId("showcase-trap-thesis");
    expect(thesis.style.fontSize).toBe(`${THESIS_TEXT_SIZE}px`);
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
        ["showcase-trap-hero", "showcase-trap-column", "showcase-trap-surface-line"],
        ["showcase-trap-twin", "showcase-trap-thesis", `showcase-trap-layer-${LAYER_IDS[0]}`],
      ],
      [
        1,
        ["showcase-trap-hero", `showcase-trap-layer-${LAYER_IDS[0]}`, "showcase-trap-reading-head"],
        ["showcase-trap-twin", "showcase-trap-thesis", "showcase-trap-surface-line"],
      ],
      [
        2,
        ["showcase-trap-hero", "showcase-trap-twin", "showcase-trap-hollow", "showcase-trap-scan"],
        ["showcase-trap-column", "showcase-trap-mark", "showcase-trap-thesis"],
      ],
      [
        3,
        [`showcase-trap-box-${QUESTION_IDS[0]}`, "showcase-trap-recap-eyebrow"],
        ["showcase-trap-hero", "showcase-trap-twin", "showcase-trap-thesis", "showcase-trap-rule"],
      ],
      [
        4,
        [`showcase-trap-box-${QUESTION_IDS[0]}`, "showcase-trap-rule", "showcase-trap-thesis"],
        ["showcase-trap-hero", "showcase-trap-twin", "showcase-trap-column"],
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

  test("prints exactly one sentence on the act shelf at every act pose", () => {
    const { unmount } = renderSlide(0);
    const LINES = [
      "showcase-trap-surface-line",
      "showcase-trap-source-line",
      "showcase-trap-twin-line",
    ];
    for (const pose of [0, 1, 2]) {
      goToPose(pose);
      const present = LINES.filter(mounted);
      expect(present, `pose ${pose}`).toHaveLength(1);
      expect(topOf(present[0] as string)).toBe(`${ACT_LINE_TOP}px`);
    }
    // and none of them survives into the recap
    for (const pose of [3, 4]) {
      goToPose(pose);
      expect(LINES.filter(mounted), `pose ${pose}`).toHaveLength(0);
    }
    unmount();
  });

  test("prints exactly one eyebrow on one shelf at every pose", () => {
    const { unmount } = renderSlide(0);
    const EYEBROWS = [
      "showcase-trap-surface-eyebrow",
      "showcase-trap-source-eyebrow",
      "showcase-trap-twin-eyebrow",
      "showcase-trap-recap-eyebrow",
    ];
    for (const pose of POSES) {
      goToPose(pose);
      const present = EYEBROWS.filter(mounted);
      expect(present, `pose ${pose}`).toHaveLength(1);
      expect(topOf(present[0] as string), `pose ${pose}`).toBe(`${EYEBROW_TOP}px`);
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
      "closerKw",
    ]);
    for (const key of Object.keys(C)) {
      if (!key.endsWith("Kw")) continue;
      expect(proseKeys.has(key), `${key} is a keyword list on something that is not prose`).toBe(
        true,
      );
    }

    // and the labels are forbidden from gaining one
    for (const key of ["figLabel", "chartTitle", "mark", "hollowLabel", "recapEyebrow"]) {
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
    const SENTENCES: ReadonlyArray<readonly [string, string, number]> = [
      // THE HEADLINE HAS ITS OWN, TIGHTER CEILING, and it is the one budget on this stage
      // that is a hard floor: a two-line headline ends at y=164 and prints through the
      // eyebrow shelf at 156. jsdom computes no text, so it is held here.
      ["headline", C.headline, HEADLINE_BUDGET_CHARS],
      ["surfaceLine", C.surfaceLine, ACT_LINE_BUDGET_CHARS],
      ["sourceLine", C.sourceLine, ACT_LINE_BUDGET_CHARS],
      ["twinLine", C.twinLine, ACT_LINE_BUDGET_CHARS],
      ["closer", C.closer, THESIS_BUDGET_CHARS],
      ["mark", C.mark, MARK_BUDGET_CHARS],
      ...C.layers.map((l) => [`layer ${l.id}`, l.line, LAYER_LINE_BUDGET_CHARS] as const),
      ...C.questions.map((q) => [`finding ${q.id}`, q.finding, BOX_FINDING_BUDGET_CHARS] as const),
      ...C.questions.map(
        (q) => [`question ${q.id}`, q.question, BOX_QUESTION_BUDGET_CHARS] as const,
      ),
    ];

    for (const [name, sentence, budget] of SENTENCES) {
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
      C.closer,
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

    // Every authored string EXCEPT the figLabel (stripped above) and the glyph selectors
    // (which are ids, not copy) reaches a pose.
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
    // out-specified it, so every filled bar of the `chart` mark gained a 1.6-unit stroke on
    // its own edge — about seven pixels of growth per side at 88px. Both halves of the fix
    // are asserted, because either one alone would be specificity arithmetic a future edit
    // could tip.
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

    // 3 · the `chart` mark is the only one that draws a filled shape, which is why it was the
    //     only one that grew — a second filled mark would need this test to keep holding.
    const glyphs = readFileSync(
      path.resolve(
        process.cwd(),
        "src/slides/leader-invest/components/ShowcaseTrapGlyphs.tsx",
      ),
      "utf8",
    );
    expect(glyphs).toContain("st-solid");
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
