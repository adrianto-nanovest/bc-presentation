// THE HARDEST PART IS NOT THE TOOLS · slide tests. All four poses, and the rules
// gh#65's AC states — held over EVERY authored string rather than spot-checked.
//
// WHAT THIS FILE CAN AND CANNOT PROVE — its five predecessors' preamble, inherited.
// jsdom has no layout and no media queries, so nothing here measures a pixel and
// `prefers-reduced-motion: reduce` cannot really be toggled. What a DOM-less runner is
// good for is what THIS slide is actually at risk of:
//
//   1. THE QUOTATION DRIFTING. The statistic is reused VERBATIM on the research's own
//      verdict, and a verbatim quote is the one string in the deck that a tidy-up edit
//      breaks invisibly — "people and process" for "people & process" renders fine and
//      is no longer a quotation. So the string is pinned character for character, and
//      so is the fact that it renders unedited and unhighlighted.
//   2. THE FIGURE LOSING ITS SOURCE. §6.1's number is a third party's, and a slide
//      that prints it with the attribution dropped, moved off-slide or emphasised into
//      the deck's own voice is the failure this slide has that a room would catch and
//      a build would not. Held three ways: the string, its rendering, and the
//      keyword-freedom of both it and the figure it attributes.
//   3. THE BAR AND THE STATISTIC DISAGREEING. The split bar's ratio is DERIVED from
//      `PEOPLE_SHARE`, which is 0.70 because the quoted string says 70%. Nothing at
//      runtime reads the string, so the weld is held here as a cross-module assertion:
//      the copy's own percentages and the geometry's fraction are the same number.
//   4. POACHING A SIBLING'S ARGUMENT. §6.2 owns shadow AI as `condition` and says in
//      the SPEC's voice that the deck's three shadow-AI passes must share no image and
//      no statistic; §6.3 owns the first-person failures; §6.4 owns the pattern; §6.5
//      owns L1–L5 and the ladder's own 70/30. Those are boundaries over COPY, which is
//      exactly what a DOM-less test can hold as a sweep instead of as a review note.
//
// WHAT IS LEFT TO THE BROWSER WALK: the reduce-mode half of the zero-SMIL AC (held
// here at every pose under the default preference, plus the structural fact that makes
// it true by construction — the figure mounts no `<svg>` at all); real wrap of the
// one-line statistic, the eight one-line rows and the two-line gap lines; and the
// painted colour ladder, including the two bar masses' 3.7:1 separation.
//
// AND WHERE THE SLIDE SITS IS NOW ASSERTED TOO, at the bottom of this file: the AC's
// third clause is a composition fact — head of the `gap` run in BOTH leader decks, in
// NEITHER standard one — and it is held against the COMPOSED decks rather than against
// the authored id list, which is `deck-slots.test.ts`'s half. (This note said the
// opposite until composition landed, correctly: the slide reached no deck set while its
// own ticket was still two halves.) `AT` below stays a harness INPUT — this module epoch
// resolves the default `general` deck, which runs no leader slide at all.
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { BRANDS, type Brand, type DeckSetId } from "@/deck-variants";
import { useDeck } from "@/deck/DeckContext";
import { composeDeck } from "@/deck/compose";
import { DECK_SET_COMPOSITION } from "@/deck/deck-sets";
import { slideCatalogue } from "@/deck/slide-catalogue";
import { resolveDeckSetSlides } from "@/deck/slots";
import { SlideHarness } from "../support/slide-harness";
import { GapHardestPart, gapHardestPartSlide } from "@/slides/leader-gap/gap-hardest-part";
import { gapHardestPartContent } from "@/slides/leader-gap/content";
import {
  BAR_TOP,
  CLOSER_TOP,
  CONTENT_WIDTH,
  GAP_LINE_TOP,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  PEOPLE_ITEM_COUNT,
  PEOPLE_SHARE,
  PEOPLE_WIDTH,
  ROWS_TOP,
  RULE_HEIGHT,
  RULE_TOP,
  SIDE_MARGIN,
  SOURCE_TOP,
  STAGE,
  STATISTIC_TOP,
  SUB_COL_WIDTH,
  TECHNOLOGY_ITEM_COUNT,
  TECHNOLOGY_WIDTH,
  peopleItemLeft,
  peopleItemTop,
} from "@/slides/leader-gap/hardest-part-geometry";

const C = gapHardestPartContent;
const POSES = [0, 1, 2, 3] as const;

/**
 * The position this slide holds in the decks that will run it.
 *
 * `at` IS required here, the same case all five leader-only siblings document: unit
 * tests resolve the default `general` deck, `general` has no leader variant, and this
 * slide reaches the leader deck sets alone. B.1 because the `gap` run is the leader
 * decks' first (§4.3) and this slide is its first slide — a harness INPUT, not a claim
 * the slide makes (§3.5). No file under `src/slides/leader-gap/` names either half of
 * it, which is the rule the figure-freedom block below holds.
 */
const AT = { letter: "B", num: 1, sectionKey: "gap" } as const;

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
    <SlideHarness def={gapHardestPartSlide} at={AT}>
      <Nav />
      <GapHardestPart />
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
// Derived from the content tuples wherever the renderer keys on a content `id`, so a
// reorder of the copy moves these hooks with it.

const POSE_0_IDS = [
  "hardest-part-statistic-eyebrow",
  "hardest-part-statistic",
  "hardest-part-source",
  "hardest-part-bar-people",
  "hardest-part-bar-technology",
  "hardest-part-people-label",
  "hardest-part-technology-label",
];
const POSE_1_IDS = [
  ...C.peopleItems.map((item) => `hardest-part-people-${item.id}`),
  ...C.technologyItems.map((item) => `hardest-part-technology-${item.id}`),
];
const POSE_2_IDS = [
  "hardest-part-rule",
  "hardest-part-gap-eyebrow",
  "hardest-part-access",
  "hardest-part-capability",
];
const POSE_3_IDS = ["hardest-part-closer"];

const REVEALED_AT: ReadonlyArray<readonly string[]> = [
  POSE_0_IDS,
  POSE_1_IDS,
  POSE_2_IDS,
  POSE_3_IDS,
];

/** The three boxes with no text of their own — the copper rule's wrapper and the two
 *  bar masses. Named once, so the "the copy is there, not merely the box" checks below
 *  cannot be quietly widened. */
const TEXTLESS_IDS = new Set([
  "hardest-part-rule",
  "hardest-part-bar-people",
  "hardest-part-bar-technology",
]);

/**
 * The element whose class carries a box's reveal — the sibling files' two-shape
 * reader. Every box but one IS a `Reveal`; `hardest-part-rule`'s testid is on a
 * positioned wrapper around a `CopperRule`, because that primitive spreads no `data-*`
 * props.
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
 *  files' reason: a field added next month is inside every rule below the day it
 *  exists. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/** Every string this slide can put on a stage. ONE block, because this slide has no
 *  brand axis — see the `no brand axis` describe below, which holds that as a rule. */
const authoredStrings = (): string[] => walkStrings(C);

/** The rendered text of this slide's own boxes, one string per box. Scoped to the
 *  `hardest-part-` prefix so the harness's `FigLabel` — which prints the DERIVED
 *  figure, the composer's to print and not this slide's to author — stays out. */
function stageUnits(container: HTMLElement): string[] {
  return [...container.querySelectorAll<HTMLElement>("[data-testid^='hardest-part-']")].map(
    (el) => el.textContent ?? "",
  );
}

// ── the slide def ────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("declares 4 poses with the fullest one canonical", () => {
    expect(gapHardestPartSlide.id).toBe("gap-hardest-part");
    expect(gapHardestPartSlide.steps).toBe(4);
    // The exported PDF has no presenter attached, so the exported frame must be the
    // one that is safe to read alone. Anything lower would export a page whose largest
    // object is a third party's statistic with no sentence saying what this deck
    // concludes from it — a slide somebody else can re-caption.
    expect(gapHardestPartSlide.canonicalPose).toBe(3);
    expect(gapHardestPartSlide.canonicalPose).toBe(gapHardestPartSlide.steps - 1);
    expect(gapHardestPartSlide.animationMode).toBe("step-reveal");
    expect(gapHardestPartSlide.surface).toBe("dark");
    expect(gapHardestPartSlide.sectionKey).toBe("gap");
  });
});

// ── AC · the statistic, verbatim ─────────────────────────────────────────────

describe("the statistic", () => {
  test("is the research's sentence, character for character", () => {
    // PINNED WHOLE, not by `toContain`. The research verdict is "reuse quote verbatim"
    // (`docs/researches/internal-hr-group.md` §3.1), and the edits that break a
    // verbatim quote are the invisible ones: "and" for "&", "AI adoption failures" for
    // "AI failures", a full stop the source does not have.
    expect(C.statistic).toBe(
      "70% of AI adoption failures are people & process, not technology",
    );
    // The three halves the sentence has to keep, spelled out so a failure above says
    // WHICH half moved.
    expect(C.statistic).toContain("70%");
    expect(C.statistic).toContain("people & process");
    expect(C.statistic).toContain("not technology");
  });

  test("renders unedited and unhighlighted at pose 0", () => {
    const { unmount } = renderSlide(0);
    const box = screen.getByTestId("hardest-part-statistic");
    expect(box.textContent).toBe(C.statistic);
    expect(revealed("hardest-part-statistic")).toBe(true);
    // NOT A COPPER ITALIC INSIDE A QUOTATION. The keyword rule's sharpest case: an
    // `<em>` here would be the deck emphasising a fragment of somebody else's
    // sentence.
    expect(box.querySelector("em")).toBeNull();
    unmount();
  });
});

// ── AC · the source is on the slide ──────────────────────────────────────────

describe("the source", () => {
  test("attributes the figure to BCG / McKinsey and claims nothing it cannot", () => {
    expect(C.statisticSource).toBe(
      "Reported by BCG / McKinsey — the adoption benchmark this deck quotes rather " +
        "than measures.",
    );
    expect(C.statisticSource).toContain("BCG");
    expect(C.statisticSource).toContain("McKinsey");
    // It says the deck QUOTES the figure rather than measured it — the honest half,
    // and the half a leader is most likely to ask about.
    expect(C.statisticSource).toMatch(/quotes rather than measures/);
    // AND IT INVENTS NO PROVENANCE. We hold no primary URL and no read date for this
    // figure, so no authored string on this slide may carry a date, a year or a URL:
    // a plain attribution is worse than a sourced one and far better than a fabricated
    // one.
    for (const copy of authoredStrings()) {
      expect(copy, `a date in ${JSON.stringify(copy)}`).not.toMatch(/\b(19|20)\d{2}\b/);
      expect(copy, `a URL in ${JSON.stringify(copy)}`).not.toMatch(/https?:|www\./);
    }
  });

  test("renders ON the slide, in the same pose as the figure it attributes", () => {
    const { unmount } = renderSlide(0);
    expect(screen.getByTestId("hardest-part-source").textContent).toBe(C.statisticSource);
    expect(revealed("hardest-part-source")).toBe(true);
    // A CITATION IS NOT A QUOTATION: it carries no emphasis either, so the deck cannot
    // be read as editing its own attribution.
    expect(screen.getByTestId("hardest-part-source").querySelector("em")).toBeNull();
    // AND IT IS BOUND TO THE FIGURE IN TIME, not just in space: it arrives immediately
    // after the statistic and BEFORE the bar, so the room never reads the number
    // unattributed.
    expect(arrival("hardest-part-source")).toBeGreaterThan(arrival("hardest-part-statistic"));
    expect(arrival("hardest-part-source")).toBeLessThan(arrival("hardest-part-bar-people"));
    unmount();
  });
});

// ── AC · the split bar draws the statistic's own number ──────────────────────

describe("the split bar", () => {
  test("is cut from the statistic's fraction, and the copy prints the same two numbers", () => {
    // A CROSS-MODULE WELD, so neither side can be a self-comparison: the geometry's
    // fraction against the copy's own percentages. Nothing at runtime reads the string,
    // so this is the only place the two can be held together — and a reworded statistic
    // that changed the figure and left the bar alone is the one failure on this slide
    // that nobody would see on a projector.
    expect(PEOPLE_SHARE).toBe(0.7);
    const peoplePct = `${Math.round(PEOPLE_SHARE * 100)}%`;
    const technologyPct = `${100 - Math.round(PEOPLE_SHARE * 100)}%`;
    expect(peoplePct).toBe("70%");
    expect(C.statistic).toContain(peoplePct);
    expect(C.peopleLabel).toContain(peoplePct);
    expect(C.technologyLabel).toContain(technologyPct);
    expect(C.closer).toContain(peoplePct);
    expect(C.closer).toContain(technologyPct);
    // The drawn ratio IS the fraction, to within the one whole pixel the rounding
    // costs: 823 / 1176.
    const drawn = PEOPLE_WIDTH / (PEOPLE_WIDTH + TECHNOLOGY_WIDTH);
    expect(drawn).toBeCloseTo(PEOPLE_SHARE, 3);
    // And the two segments plus their seam tile the content width exactly, so the bar
    // ends on the right margin rather than near it.
    expect(PEOPLE_WIDTH + TECHNOLOGY_WIDTH).toBeLessThan(CONTENT_WIDTH);
    expect(SIDE_MARGIN + PEOPLE_WIDTH).toBeLessThan(STAGE.width - SIDE_MARGIN);
  });

  test("renders two masses of the geometry's widths, on one shelf", () => {
    const { unmount } = renderSlide(0);
    const people = screen.getByTestId("hardest-part-bar-people");
    const technology = screen.getByTestId("hardest-part-bar-technology");
    expect(parseFloat(people.style.width)).toBe(PEOPLE_WIDTH);
    expect(parseFloat(technology.style.width)).toBe(TECHNOLOGY_WIDTH);
    expect(parseFloat(people.style.top)).toBe(BAR_TOP);
    expect(parseFloat(technology.style.top)).toBe(BAR_TOP);
    // The wide mass is the 70% one — the direction of the claim, not just its size.
    expect(parseFloat(people.style.width)).toBeGreaterThan(parseFloat(technology.style.width));
    // RANK IS COLOUR, NEVER OPACITY: neither mass carries an inline opacity, so a
    // "30% drawn at 30% opacity" edit fails here. Opacity on this stage belongs to
    // `.fade`, i.e. to time.
    expect(people.style.opacity).toBe("");
    expect(technology.style.opacity).toBe("");
    expect(people.style.background).not.toBe(technology.style.background);
    unmount();
  });

  test("uses CSS vars for both masses — no hex, no rgba", () => {
    const { container, unmount } = renderSlide(3);
    for (const el of container.querySelectorAll<HTMLElement>(
      "[data-testid^='hardest-part-']",
    )) {
      const inline = el.getAttribute("style") ?? "";
      expect(inline, `hex literal in ${el.dataset.testid}`).not.toMatch(/#[0-9a-f]{3,8}\b/i);
      expect(inline, `rgba() in ${el.dataset.testid}`).not.toMatch(/rgba?\(/i);
    }
    unmount();
  });
});

// ── AC · pose 1: what each half is made of ───────────────────────────────────

describe("pose 1 · what each half is", () => {
  test("names five structural things in the 70% and three purchases in the 30%", () => {
    expect(C.peopleItems.map((i) => i.id)).toEqual([
      "decision-rights",
      "workflow",
      "skills",
      "incentives",
      "measurement",
    ]);
    expect(C.technologyItems.map((i) => i.id)).toEqual(["models", "licences", "tools"]);
    // Every row is a NOUN plus what it costs — the noun alone reads as a training
    // budget, which is the reading §6.1 exists to refuse. Held as a shape rule, so a
    // row reduced to one word fails.
    for (const item of [...C.peopleItems, ...C.technologyItems]) {
      expect(item.label, item.id).toMatch(/ — /);
      expect(item.label.length, item.id).toBeGreaterThan(20);
    }

    const { unmount } = renderSlide(1);
    for (const item of C.peopleItems) {
      const box = screen.getByTestId(`hardest-part-people-${item.id}`);
      expect(box.textContent).toBe(item.label);
      expect(revealed(`hardest-part-people-${item.id}`)).toBe(true);
    }
    for (const item of C.technologyItems) {
      const box = screen.getByTestId(`hardest-part-technology-${item.id}`);
      expect(box.textContent).toBe(item.label);
      expect(revealed(`hardest-part-technology-${item.id}`)).toBe(true);
    }
    unmount();
  });

  test("fills both halves in parallel, and the WIDE half finishes last", () => {
    // The two lists share a step index, so the halves are read as one comparison
    // rather than as two lists in sequence — and the consequence is the claim
    // happening inside the reveal: the narrow half finishes at step 2 while the wide
    // one keeps arriving. A pose that ended on a purchase order would end on the easy
    // half.
    const { unmount } = renderSlide(1);
    const lastPeople = arrival(
      `hardest-part-people-${C.peopleItems[C.peopleItems.length - 1].id}`,
    );
    for (const item of C.technologyItems) {
      expect(
        arrival(`hardest-part-technology-${item.id}`),
        `${item.id} must not outlast the 70% column`,
      ).toBeLessThan(lastPeople);
    }
    for (const item of C.peopleItems.slice(0, -1)) {
      expect(arrival(`hardest-part-people-${item.id}`)).toBeLessThan(lastPeople);
    }
    // The two columns' first rows land on the SAME step — that is what "in parallel"
    // means, and it is the one thing a stagger edit would silently break.
    expect(arrival(`hardest-part-people-${C.peopleItems[0].id}`)).toBe(
      arrival(`hardest-part-technology-${C.technologyItems[0].id}`),
    );
    unmount();
  });

  test("lays the 70% half column-major, so the five rows read in order", () => {
    // Cross-module: the DOM's placement against the geometry's own functions. A
    // row-major fill would make the list read 0,3,1,4,2 and no label on the stage
    // would say so.
    const { unmount } = renderSlide(1);
    C.peopleItems.forEach((item, i) => {
      const box = screen.getByTestId(`hardest-part-people-${item.id}`);
      expect(parseFloat(box.style.left), item.id).toBe(peopleItemLeft(i));
      expect(parseFloat(box.style.top), item.id).toBe(peopleItemTop(i));
      expect(parseFloat(box.style.width), item.id).toBe(SUB_COL_WIDTH);
    });
    // Items 0–2 share sub-column 0 and descend; items 3–4 restart at the top of
    // sub-column 1.
    expect(peopleItemLeft(0)).toBe(peopleItemLeft(2));
    expect(peopleItemLeft(3)).toBeGreaterThan(peopleItemLeft(0));
    expect(peopleItemTop(3)).toBe(ROWS_TOP);
    unmount();
  });
});

// ── AC · pose 2: the gap, named ──────────────────────────────────────────────

describe("pose 2 · the gap", () => {
  test("names it a gap, and names both of its terms", () => {
    // §6.1: "Opens the gap between tool access and organizational capability." The
    // eyebrow is the string that calls it a gap; the two lines spell out the terms it
    // abbreviates.
    expect(C.gapEyebrow).toContain("GAP");
    expect(C.accessLine).toContain("Tool access");
    expect(C.capabilityLine).toContain("Organizational capability");
    // PROCURED AND INSTANT against EARNED AND SLOW — two properties each, because
    // either alone is a fact and the pair is the argument.
    expect(C.accessLine).toMatch(/procured/);
    expect(C.accessLine).toMatch(/instantly/);
    expect(C.capabilityLine).toMatch(/earned/);
    expect(C.capabilityLine).toMatch(/slowly/);
    // The sentence that makes it a gap rather than a delay: no amount of the 30%
    // closes it.
    expect(C.capabilityLine).toContain("never on an invoice");
  });

  test("closes the split with one rule and rests on the BUILT half", () => {
    const { unmount } = renderSlide(2);
    expect(screen.getByTestId("hardest-part-gap-eyebrow").textContent).toBe(C.gapEyebrow);
    expect(screen.getByTestId("hardest-part-access").textContent).toBe(C.accessLine);
    expect(screen.getByTestId("hardest-part-capability").textContent).toBe(C.capabilityLine);
    expect(revealed("hardest-part-rule")).toBe(true);
    // The capability line is the pose's LAST arrival — access first because it is what
    // the room already has, capability last because it is what the rest of the deck is
    // for.
    const capabilityAt = arrival("hardest-part-capability");
    for (const id of POSE_2_IDS.filter((x) => x !== "hardest-part-capability")) {
      expect(arrival(id), `${id} must not overtake the capability line`).toBeLessThan(
        capabilityAt,
      );
    }
    // Both keyword pairs are RENDERED as emphasis, not merely present in data.
    for (const [id, kws] of [
      ["hardest-part-access", C.accessLineKw],
      ["hardest-part-capability", C.capabilityLineKw],
    ] as const) {
      const ems = [...screen.getByTestId(id).querySelectorAll("em")].map((em) => em.textContent);
      for (const kw of kws) expect(ems, `${id} · ${kw}`).toContain(kw);
    }
    unmount();
  });
});

// ── AC · pose 3: the frame ───────────────────────────────────────────────────

describe("pose 3 · the frame", () => {
  test("closes on the 70%, full width, as the slide's last arrival", () => {
    expect(C.closer).toBe("The tools are the 30%. Everything after this is the 70%.");
    expect(C.closerKw).toEqual(["the 70%"]);

    const { container, unmount } = renderSlide(3);
    const closer = screen.getByTestId("hardest-part-closer");
    expect(closer.textContent).toBe(C.closer);
    expect(parseFloat(closer.style.left)).toBe(SIDE_MARGIN);
    expect(parseFloat(closer.style.width)).toBe(CONTENT_WIDTH);
    expect(parseFloat(closer.style.top)).toBe(CLOSER_TOP);
    expect([...closer.querySelectorAll("em")].map((em) => em.textContent)).toContain("the 70%");
    expect(revealed("hardest-part-closer")).toBe(true);
    // IT IS ALONE IN ITS POSE, which is what "last arrival" means on a step-reveal
    // slide: arrivals are delays WITHIN a pose, so the only way to prove nothing
    // outlasts the closer is to prove nothing else arrives with it. Every other box on
    // the stage belongs to an earlier band, so pose 3 adds exactly one — the frame, on
    // its own, after the room has read everything it frames.
    expect(POSE_3_IDS).toEqual(["hardest-part-closer"]);
    const stageIds = [
      ...container.querySelectorAll<HTMLElement>("[data-testid^='hardest-part-']"),
    ].map((el) => el.dataset.testid);
    expect(stageIds.sort()).toEqual(
      [...POSE_0_IDS, ...POSE_1_IDS, ...POSE_2_IDS, ...POSE_3_IDS].sort(),
    );
    unmount();
  });
});

// ── AC · every pose renders complete, forward and backward ───────────────────

describe("the pose walk", () => {
  test("every pose is complete at every stop, in both directions", () => {
    const { container, unmount } = renderSlide();
    const walk = [...POSES, ...[...POSES].reverse()];
    for (const pose of walk) {
      goToPose(pose);
      for (let band = 0; band < REVEALED_AT.length; band++) {
        for (const id of REVEALED_AT[band]) {
          // A pose is everything argued so far: revealed iff its band's pose has been
          // reached, at every stop in BOTH directions — `on` is derived from the pose
          // and not accumulated, so walking back to 0 must un-reveal 1–3.
          expect(revealed(id), `${id} at pose ${pose}`).toBe(band <= pose);
          // AND THE COPY IS THERE, not merely the box: a path that dropped children
          // would still pass a class check. The rule wrapper and the two bar masses
          // are the three boxes with no text of their own.
          if (band <= pose && !TEXTLESS_IDS.has(id)) {
            expect(screen.getByTestId(id).textContent, `${id} at pose ${pose}`).not.toBe("");
          }
        }
      }
      // ZERO SMIL NODES AT EVERY STOP — the AC's jsdom half, under the default motion
      // preference. The `reduce` half is below and in the browser walk.
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set").length,
        `SMIL at pose ${pose}`,
      ).toBe(0);
    }
    unmount();
  });

  test("pose 0 rests on the sourced statistic and its picture, and nothing later", () => {
    const { unmount } = renderSlide(0);
    for (const id of POSE_0_IDS) expect(revealed(id), id).toBe(true);
    for (const id of [...POSE_1_IDS, ...POSE_2_IDS, ...POSE_3_IDS]) {
      expect(revealed(id), `${id} leaked into pose 0`).toBe(false);
    }
    // The two half labels are pose 0's last arrival — the same number, drawn, closes
    // the pose. They share one step, because staggering them would imply the 70% is
    // named before the 30% exists.
    expect(arrival("hardest-part-people-label")).toBe(arrival("hardest-part-technology-label"));
    const labelAt = arrival("hardest-part-people-label");
    for (const id of POSE_0_IDS.filter((x) => !x.endsWith("-label"))) {
      expect(arrival(id), `${id} must not outlast the half labels`).toBeLessThan(labelAt);
    }
    unmount();
  });

  test("mounts no <svg> at all — zero SMIL by construction, not by discipline", () => {
    // The figure's own doc comment stakes the claim: the split bar is two plain boxes,
    // the rule is a `div`, the rows are placed text, and a SMIL node cannot appear
    // without an author adding a whole element class. This structural fact is what
    // makes the reduce-mode zero a construction rather than a promise — and it is the
    // one property this slide's own directory does NOT share, since
    // `./CapabilityLadder.tsx` next door legitimately draws vector marks.
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
    // proves the markup is preference-independent, which is the half a DOM test owns;
    // the squashed-duration half is the browser walk's.
    const { container, unmount } = renderSlide();
    for (const pose of POSES) {
      goToPose(pose);
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set").length,
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
    }
    unmount();
  });
});

// ── AC · the keyword rule: kw on prose only ──────────────────────────────────

describe("the keyword rule", () => {
  test("exactly the four prose strings carry a *Kw sibling, every keyword real", () => {
    // The directory's rule, stated at the top of `../../src/slides/leader-gap/content.ts`
    // and applied here without an exception. PROSE is the headline, the two gap lines
    // and the closer. Everything else is a label — and the two labels that matter most
    // are the STATISTIC and its SOURCE, which may never gain a `*Kw` without landing
    // here first.
    const kwKeys = Object.keys(C).filter((k) => k.endsWith("Kw"));
    expect(kwKeys.sort()).toEqual([
      "accessLineKw",
      "capabilityLineKw",
      "closerKw",
      "headlineKw",
    ]);
    for (const kwKey of kwKeys) {
      const proseKey = kwKey.slice(0, -2) as keyof typeof C;
      const prose = C[proseKey];
      const kws = C[kwKey as keyof typeof C];
      expect(typeof prose, `${kwKey} has no prose sibling`).toBe("string");
      expect(Array.isArray(kws)).toBe(true);
      for (const kw of kws as readonly string[]) {
        expect(prose as string, `${kwKey}: "${kw}" is not in its prose`).toContain(kw);
      }
    }
    // The two figure-bearing strings carry NO sibling at all — named, so the list
    // above cannot be widened by accident.
    expect(Object.keys(C)).not.toContain("statisticKw");
    expect(Object.keys(C)).not.toContain("statisticSourceKw");
    expect(Object.keys(C)).not.toContain("peopleLabelKw");
    expect(Object.keys(C)).not.toContain("technologyLabelKw");
  });

  test("every label renders with no emphasis, while the prose boxes do carry theirs", () => {
    const { unmount } = renderSlide(3);
    const labelIds = [
      "hardest-part-statistic-eyebrow",
      "hardest-part-statistic",
      "hardest-part-source",
      "hardest-part-people-label",
      "hardest-part-technology-label",
      ...C.peopleItems.map((i) => `hardest-part-people-${i.id}`),
      ...C.technologyItems.map((i) => `hardest-part-technology-${i.id}`),
      "hardest-part-gap-eyebrow",
    ];
    for (const id of labelIds) {
      expect(screen.getByTestId(id).querySelector("em"), `<em> inside label ${id}`).toBeNull();
    }
    // …while the prose boxes DO carry theirs, so the absence above cannot pass because
    // emphasis stopped rendering everywhere.
    for (const id of [
      "hardest-part-access",
      "hardest-part-capability",
      "hardest-part-closer",
    ]) {
      expect(screen.getByTestId(id).querySelectorAll("em").length, id).toBeGreaterThan(0);
    }
    unmount();
  });
});

// ── AC · figures and letters are derived, never authored ─────────────────────

describe("no rendered string names a letter or a figure", () => {
  test("authored copy and the rendered stage both stay figure-free", () => {
    const FIGURE = /\b[A-N]\.\d+\b/;
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(FIGURE);
      expect(copy, copy).not.toMatch(/\bsection\s+[A-N]\b/i);
      // No count of its own successors either — the run this slide opens is composed
      // per deck set (§3.4), so a sentence that numbered the slides behind it would go
      // stale the first time one was inserted or cut.
      expect(copy, copy).not.toMatch(/\bnext (two|three|four|five)\b/i);
    }
    // The rendered half is scoped to this slide's own boxes: the harness's FigLabel
    // prints the DERIVED figure, which is the composer's to print and not this slide's
    // to author.
    const { container, unmount } = renderSlide(3);
    const stageText = stageUnits(container).join(" | ");
    expect(stageText.length).toBeGreaterThan(200);
    expect(stageText).not.toMatch(FIGURE);
    unmount();
  });
});

// ── AC · the §6.2 / §6.3 / §6.4 / §6.5 boundaries ────────────────────────────

describe("the sibling boundaries", () => {
  /**
   * What this slide may not say, and which slide owns each thing.
   *
   * THE FIRST ENTRY IS A SPEC CONSTRAINT, NOT A STYLE RULE. §6.2 owns shadow AI as
   * `condition` and states in the spec's own voice that the deck's three shadow-AI
   * passes must share no image and no statistic, because "the escalation degenerates
   * into repetition the moment two of the three passes share an image or a statistic".
   * A first mention on THIS slide would spend that beat before `gap-no-sop` exists to
   * make it — which is why the check is a sweep over every authored string rather than
   * a note in a review.
   */
  const FORBIDDEN: ReadonlyArray<readonly [RegExp, string]> = [
    [/shadow/i, "§6.2 owns shadow AI as `condition`"],
    [/\bSOPs?\b/, "§6.2 owns the missing-SOP argument"],
    [/standard operating/i, "§6.2 owns the missing-SOP argument"],
    [/\bimprovis/i, "§6.2 owns improvisation-for-lack-of-guidance"],
    [/\bguidance\b/i, "§6.2 owns the absence of guidance"],
    [/\bunsanctioned\b/i, "§6.2 owns unsanctioned tool use"],
    [/\bpattern\b/i, "§6.4 owns the pattern across the failures"],
    [/\bL[1-5]\b/, "§6.5 owns the rungs"],
    [/\brungs?\b/i, "§6.5 owns the rungs"],
    [/\bladder\b/i, "§6.5 owns the ladder"],
    [/decision contract/i, "§6.5 owns the L3 decision contract"],
    [/70\s*\/\s*30/, "§6.5 owns the phrase `70/30`; this slide's split is a different one"],
  ];

  test("names nothing a sibling slide owns", () => {
    for (const copy of authoredStrings()) {
      for (const [pattern, owner] of FORBIDDEN) {
        expect(copy, `${owner} — found in ${JSON.stringify(copy)}`).not.toMatch(pattern);
      }
    }
    // POSITIVE CONTROL: the sweep is alive, and it catches the sentence §6.2 owns.
    const poached = "There is no SOP, so people improvise — and that is shadow AI.";
    expect(FORBIDDEN.filter(([p]) => p.test(poached)).length).toBeGreaterThanOrEqual(3);
  });

  test("tells no first-person story, so §6.3's confession stays §6.3's", () => {
    // §6.3 owns Nanovest's failures, first person. Nothing here is in the first person
    // and nothing here is a story: the statistic is a third party's and the gap is
    // structural.
    for (const copy of authoredStrings()) {
      expect(copy, `first person in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(we|we're|our|ours|us|I|I'm|my)\b/i,
      );
      expect(copy, `a failure story in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(we tried|we built|we learned|what went wrong)\b/i,
      );
    }
  });

  test("prints its OWN split, and never welds it to the ladder's", () => {
    // Both slides print a 70 and a 30 and they mean different things: the ladder's is
    // how much of a bounded agentic decision a machine may take, this one's is how many
    // adoption failures are people and process. So this slide's percentages always
    // arrive with their own subject attached, and the bare phrase `70/30` — the
    // ladder's — appears nowhere (asserted above).
    expect(C.peopleLabel).toMatch(/70%/);
    expect(C.peopleLabel).toMatch(/PEOPLE & PROCESS/);
    expect(C.technologyLabel).toMatch(/30%/);
    expect(C.technologyLabel).toMatch(/TECHNOLOGY/);
  });
});

// ── AC · no brand axis ───────────────────────────────────────────────────────

describe("no brand axis", () => {
  test("takes no brand block and names no organisation", () => {
    // §4.4's seven brand × deckSet slots do not list this slide, so there is no
    // `…For(brand)` resolver to call and the component takes no props. Held two ways:
    // the component's arity, and the copy's vocabulary.
    expect(GapHardestPart.length).toBe(0);
    for (const copy of authoredStrings()) {
      expect(copy, `an organisation in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(GEMS|GEMVIS|Berau|DigiTech|MineTech|Nanovest)\b/i,
      );
    }
    // The one third party the slide DOES name is the source of the figure, which is
    // the point of it — so the rule above is about the two rooms, not about proper
    // nouns.
    expect(C.statisticSource).toMatch(/BCG \/ McKinsey/);
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
    expect(() => walk(C, "gapHardestPartContent")).not.toThrow();
    // POSITIVE CONTROL — the walk is alive and would find a resolver one level down.
    expect(() => walk({ nested: { hardestPartFor: () => C } }, "control")).toThrow(
      /a function at control\.nested\.hardestPartFor/,
    );
  });
});

// ── AC · it composes at the head of the gap run, and only for leaders ────────

describe("the composed decks", () => {
  /**
   * The deck a brand × deck set actually runs, composed the way the app composes it.
   *
   * BUILT FROM THE TABLES, NOT FROM `@/deck/registry`. The registry resolves `VARIANT`
   * once at module scope and this epoch's variant is the default `general`, which has no
   * leader deck at all — so reading the registry here would answer about the wrong deck,
   * and re-pointing `window.location` per brand would need `vi.resetModules()` and cost
   * this file the module identity every other assertion in it depends on. The three
   * inputs are pure data (§4.1): the deck-set list, the slide pool, and the brand's own
   * `practiceLab` flag.
   */
  function composedFor(deckSet: DeckSetId, brand: Brand) {
    return composeDeck(
      resolveDeckSetSlides(DECK_SET_COMPOSITION[deckSet], {
        defs: slideCatalogue,
        brand,
        practiceLab: BRANDS[brand].practiceLab,
      }),
    );
  }

  const LEADER_BRANDS: readonly Brand[] = ["berau", "gems"];
  const ALL_BRANDS = Object.keys(BRANDS) as Brand[];

  test("opens the gap run in both leader decks — ahead of the rest, and it is the jump target", () => {
    // WHAT IS CHECKED HERE AND NOT IN `deck-slots.test.ts`: that one is about the
    // authored list, this is about what `composeDeck` derives from it — the run this
    // slide belongs to, the row behind it, and the fact that a section jump now lands
    // HERE (R5's first NUMBERED slide of the run) rather than on the ladder that held
    // that position while it was the run's only member.
    //
    // NO LETTER AND NO NUMBER IS NAMED. Both are derived per deck (§3.5); the numbering
    // fixture records what they print, and `AT` above is a harness input, not this.
    for (const brand of LEADER_BRANDS) {
      const { slides, sectionFirstIndex } = composedFor("leader", brand);
      const at = slides.findIndex((s) => s.def.id === gapHardestPartSlide.id);
      expect(at, brand).toBeGreaterThan(-1);

      const row = slides[at];
      expect(row.sectionKey, brand).toBe("gap");
      // THE HEAD OF THE RUN, stated as the two facts that make it one: the row in front
      // carries another key, so this slide starts the run, and the row behind it is the
      // run's second slide — `gap-no-sop` since gh#66, the ladder before that. A slide
      // that had landed at the run's END would pass a `toContain` check
      // and fail both of these.
      //
      // AND THE WHOLE RUN, which is now §4.3's five and FINAL: gh#67 landed
      // `gap-three-failures` and `gap-the-pattern` between `gap-no-sop` and the ladder,
      // completing the first of the four leader-only runs. This line grew with the run
      // through gh#66 and gh#67 and stops growing here — a sixth `gap` id would be a
      // slide §4.3 does not ask for, and this is where it fails.
      expect(slides[at - 1].sectionKey, brand).not.toBe("gap");
      expect(slides[at + 1].def.id, brand).toBe("gap-no-sop");
      expect(
        slides.filter((s) => s.sectionKey === "gap").map((s) => s.def.id),
        brand,
      ).toEqual([
        "gap-hardest-part",
        "gap-no-sop",
        "gap-three-failures",
        "gap-the-pattern",
        "gap-capability-ladder",
      ]);
      // R5 — the run's jump target is its first numbered slide, and this slide is
      // numbered, so pressing the `gap` run's letter lands on this stage. The letter is
      // read off the composed row rather than typed.
      expect(sectionFirstIndex.get(row.letter), brand).toBe(at);
    }
  });

  test("reaches no standard deck — not the two that run a lab, and not general", () => {
    // The other half of a leader-only slide, and it is not implied by the positive: the
    // id written into `STANDARD_SLIDE_IDS` would compose a section between the agenda and
    // the landscape for an audience with no leader in the room.
    for (const brand of ALL_BRANDS) {
      const { slides } = composedFor("standard", brand);
      expect(
        slides.some((s) => s.def.id === gapHardestPartSlide.id),
        brand,
      ).toBe(false);
      expect(slides.some((s) => s.sectionKey === "gap"), brand).toBe(false);
    }
    // Both brands that run a leader deck ARE among the brands checked above, so the two
    // clauses are about the deck set and never about the brand.
    expect(ALL_BRANDS).toEqual(expect.arrayContaining([...LEADER_BRANDS]));
  });
});

// ── the geometry: one number, both sides ─────────────────────────────────────

describe("the geometry", () => {
  test("the counts are welded to the content tuples they draw", () => {
    // Cross-MODULE comparisons — a geometry constant against the content tuple it
    // claims to pin — so none of these can be a self-comparison.
    expect(PEOPLE_ITEM_COUNT).toBe(C.peopleItems.length);
    expect(TECHNOLOGY_ITEM_COUNT).toBe(C.technologyItems.length);
    // The floor still has room: this is the number that goes negative first when
    // anything above it grows.
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThanOrEqual(0);
  });

  test("every placed box sits inside the stage and above the nav band, at the fullest pose", () => {
    const { container, unmount } = renderSlide(3);
    const boxes = [
      ...container.querySelectorAll<HTMLElement>("[data-testid^='hardest-part-']"),
    ];
    expect(boxes.length).toBeGreaterThan(16);
    for (const el of boxes) {
      const id = el.dataset.testid;
      const left = parseFloat(el.style.left);
      const top = parseFloat(el.style.top);
      const width = parseFloat(el.style.width);
      // `hardest-part-rule` declares no height — `.copper-rule` takes its 1px from the
      // stylesheet, which jsdom does not compute — so it falls back to the geometry
      // module's own constant rather than letting NaN pass as a number.
      const height = id === "hardest-part-rule" ? RULE_HEIGHT : parseFloat(el.style.height);
      expect(Number.isFinite(left), `${id} left`).toBe(true);
      expect(Number.isFinite(top), `${id} top`).toBe(true);
      expect(Number.isFinite(height), `${id} height`).toBe(true);
      expect(left, `${id} left edge`).toBeGreaterThanOrEqual(SIDE_MARGIN);
      expect(left + width, `${id} right edge`).toBeLessThanOrEqual(STAGE.width - SIDE_MARGIN);
      expect(top + height, `${id} vs nav zone`).toBeLessThanOrEqual(NAV_ZONE_TOP);
    }
    unmount();
  });

  test("the renderer reads the module's shelves, not private copies", () => {
    // Spot-welds between DOM style and geometry export — one per band, so a renderer
    // that re-derived a shelf locally fails here by name.
    const { unmount } = renderSlide(3);
    expect(parseFloat(screen.getByTestId("hardest-part-statistic").style.top)).toBe(
      STATISTIC_TOP,
    );
    expect(parseFloat(screen.getByTestId("hardest-part-source").style.top)).toBe(SOURCE_TOP);
    expect(parseFloat(screen.getByTestId("hardest-part-bar-people").style.top)).toBe(BAR_TOP);
    expect(parseFloat(screen.getByTestId("hardest-part-rule").style.top)).toBe(RULE_TOP);
    expect(parseFloat(screen.getByTestId("hardest-part-rule").style.width)).toBe(CONTENT_WIDTH);
    expect(parseFloat(screen.getByTestId("hardest-part-access").style.top)).toBe(GAP_LINE_TOP);
    expect(parseFloat(screen.getByTestId("hardest-part-capability").style.top)).toBe(
      GAP_LINE_TOP,
    );
    expect(parseFloat(screen.getByTestId("hardest-part-closer").style.top)).toBe(CLOSER_TOP);
    unmount();
  });
});
