// THE HARDEST PART IS NOT THE TOOLS · slide tests — for the TWO-SPEEDS redesign
// (owner call 2026-08-10, productionized from the B.1 prototype's variant B).
//
// WHAT THIS FILE CAN AND CANNOT PROVE — the leader tree's preamble, inherited.
// jsdom has no layout and no media queries, so nothing here measures a pixel and
// `prefers-reduced-motion: reduce` cannot really be toggled. What a DOM-less runner
// is good for is what THIS slide is actually at risk of:
//
//   1. THE QUOTATION DRIFTING. The statistic is reused VERBATIM on the research's
//      own verdict, and a verbatim quote is the one string a tidy-up edit breaks
//      invisibly. Pinned character for character, rendered unedited and
//      unhighlighted, at the canonical pose.
//   2. THE FIGURE LOSING ITS SOURCE. The attribution must land in the SAME pose as
//      the statistic it attributes — the redesign puts both on pose 2's summary
//      shelf, and this file holds them together there.
//   3. THE BAR AND THE STATISTIC DISAGREEING. The summary bar's ratio is DERIVED
//      from `PEOPLE_SHARE`, which is 0.70 because the quoted string says 70%.
//      Nothing at runtime reads the string, so the weld is a cross-module assertion.
//   4. THE MORPH LYING. The redesign's grammar is one persistent scene whose
//      elements keep identity and GATE on inline opacity — so visibility is read
//      off `style.opacity` here the way the step-reveal siblings read `.fade.on`,
//      at every pose, in both directions. The owner's three review notes are each
//      held as a regression: the kw on "signature", the footnote leaving at pose 1,
//      and the two lanes sharing one thin height on the pose-2 scoreboard.
//   5. POACHING A SIBLING'S ARGUMENT. §6.2 owns shadow AI as `condition`; §6.3 owns
//      the first-person failures; §6.4 owns the pattern; §6.5 owns L1–L5 and the
//      ladder's own 70/30. Boundaries over COPY, held as a sweep.
//
// WHAT IS LEFT TO THE BROWSER WALK: the race actually running (the two fills are
// mount keyframes jsdom never plays), the 650ms morphs, the day counter ticking,
// and the painted colour ladder.
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
  ACCESS_TRACK_HEIGHT,
  ACCESS_TRACK_HEIGHT_THIN,
  ACCESS_TRACK_TOP,
  EARNED_PROGRESS,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  PEOPLE_SHARE,
  POSE_COUNT,
  SEGMENT_COUNT,
  SUMMARY_BAR_TOP,
  SUMMARY_CLOSER_HEIGHT,
  SUMMARY_CLOSER_TOP,
  SUMMARY_PEOPLE_WIDTH,
  SUMMARY_SOURCE_TOP,
  SUMMARY_STATISTIC_TOP,
  SUMMARY_TECHNOLOGY_WIDTH,
  capabilityGeometry,
  segmentSlice,
} from "@/slides/leader-gap/hardest-part-geometry";

const C = gapHardestPartContent;
const POSES = [0, 1, 2] as const;

/**
 * The position this slide holds in the decks that will run it.
 *
 * `at` IS required here, the same case all five leader-only siblings document: unit
 * tests resolve the default `general` deck, `general` has no leader variant, and this
 * slide reaches the leader deck sets alone. B.1 because the `gap` run is the leader
 * decks' first (§4.3) and this slide is its first slide — a harness INPUT, not a claim
 * the slide makes (§3.5).
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

// ── the visibility hooks ─────────────────────────────────────────────────────
//
// The scene is PERSISTENT: every element is in the DOM at every pose, and a pose
// gates it through inline opacity ("1" / "0" — the component's `gate` helper always
// writes it). The two bar masses gate through `scaleX` instead, because their
// draw-in IS the transform; they get their own reader.

const visible = (id: string) => screen.getByTestId(id).style.opacity === "1";
const drawn = (id: string) => screen.getByTestId(id).style.transform === "scaleX(1)";

/**
 * Which poses each GATED element is visible at — the redesign's pose map, as data.
 * Ungated structural boxes (the lane labels and the two tracks) are absent: they
 * never hide, they morph.
 */
const VISIBLE_AT: ReadonlyArray<readonly [string, ReadonlyArray<number>]> = [
  ["hardest-part-eyebrow-race", [0]],
  ["hardest-part-eyebrow-anatomy", [1]],
  ["hardest-part-eyebrow-summary", [2]],
  ["hardest-part-access-tag", [0]],
  ["hardest-part-access-tag-done", [1, 2]],
  ["hardest-part-access-items", [0]],
  ["hardest-part-capability-tag", [0, 1]],
  ["hardest-part-capability-tag-running", [2]],
  ["hardest-part-capability-ticks", [0]],
  ["hardest-part-capability-live", [0]],
  ["hardest-part-capability-sofar", [1]],
  ["hardest-part-footnote", [0]],
  ["hardest-part-race-line", [0]],
  ["hardest-part-anatomy-line", [1]],
  ...C.segments.map(
    (seg) => [`hardest-part-segment-${seg.id}`, [1]] as const,
  ),
  ...C.segments.map(
    (seg) => [`hardest-part-caption-${seg.id}`, [1]] as const,
  ),
  ["hardest-part-statistic", [2]],
  ["hardest-part-source", [2]],
  ["hardest-part-people-label", [2]],
  ["hardest-part-technology-label", [2]],
  ["hardest-part-closer", [2]],
];

/** The one gated box with no text of its own — the capability lane's milestone
 *  ticks, which are texture, not data. Named once, so the "the copy is there,
 *  not merely the box" checks below cannot be quietly widened. */
const TEXTLESS_IDS = new Set(["hardest-part-capability-ticks"]);

// ── the copy, as one set of strings ──────────────────────────────────────────

/** Every string reachable from `value` — the walk, not a hand list, so a field
 *  added next month is inside every rule below the day it exists. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/** Every string this slide can put on a stage. ONE block — no brand axis. */
const authoredStrings = (): string[] => walkStrings(C);

// ── the slide def ────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("declares 3 poses with the summary canonical", () => {
    expect(gapHardestPartSlide.id).toBe("gap-hardest-part");
    expect(gapHardestPartSlide.steps).toBe(3);
    // ONE COUNT, TWO HOLDERS: the geometry's pose table is what the capability
    // lane morphs through, so the def and the table may never disagree.
    expect(gapHardestPartSlide.steps).toBe(POSE_COUNT);
    // The exported PDF has no presenter attached, so the exported frame must be
    // the one that is safe to read alone: the statistic WITH its attribution and
    // the deck's own conclusion. Anything lower exports a race with no number.
    expect(gapHardestPartSlide.canonicalPose).toBe(2);
    expect(gapHardestPartSlide.canonicalPose).toBe(gapHardestPartSlide.steps - 1);
    expect(gapHardestPartSlide.animationMode).toBe("step-reveal");
    expect(gapHardestPartSlide.surface).toBe("dark");
    expect(gapHardestPartSlide.sectionKey).toBe("gap");
  });
});

// ── AC · the statistic, verbatim ─────────────────────────────────────────────

describe("the statistic", () => {
  test("is the research's sentence, character for character", () => {
    // PINNED WHOLE, not by `toContain`: the edits that break a verbatim quote are
    // the invisible ones — "and" for "&", a full stop the source does not have.
    expect(C.statistic).toBe(
      "70% of AI adoption failures are people & process, not technology",
    );
    expect(C.statistic).toContain("70%");
    expect(C.statistic).toContain("people & process");
    expect(C.statistic).toContain("not technology");
  });

  test("renders unedited and unhighlighted at the canonical pose", () => {
    const { unmount } = renderSlide(2);
    const box = screen.getByTestId("hardest-part-statistic");
    expect(box.textContent).toBe(C.statistic);
    expect(visible("hardest-part-statistic")).toBe(true);
    // NOT A COPPER ITALIC INSIDE A QUOTATION — the keyword rule's sharpest case.
    expect(box.querySelector("em")).toBeNull();
    unmount();
  });
});

// ── AC · the source is on the slide, in the statistic's own pose ─────────────

describe("the source", () => {
  test("attributes the figure to BCG / McKinsey and claims nothing it cannot", () => {
    expect(C.statisticSource).toBe(
      "Reported by BCG / McKinsey — the adoption benchmark this deck quotes rather " +
        "than measures.",
    );
    expect(C.statisticSource).toContain("BCG");
    expect(C.statisticSource).toContain("McKinsey");
    expect(C.statisticSource).toMatch(/quotes rather than measures/);
    // AND IT INVENTS NO PROVENANCE: no authored string may carry a year or a URL —
    // we hold neither for this figure, and a fabricated citation is worse than a
    // plain one.
    for (const copy of authoredStrings()) {
      expect(copy, `a date in ${JSON.stringify(copy)}`).not.toMatch(/\b(19|20)\d{2}\b/);
      expect(copy, `a URL in ${JSON.stringify(copy)}`).not.toMatch(/https?:|www\./);
    }
  });

  test("lands WITH the statistic — same pose, no emphasis", () => {
    const { unmount } = renderSlide(2);
    expect(screen.getByTestId("hardest-part-source").textContent).toBe(C.statisticSource);
    expect(visible("hardest-part-source")).toBe(true);
    expect(visible("hardest-part-statistic")).toBe(true);
    expect(screen.getByTestId("hardest-part-source").querySelector("em")).toBeNull();
    // And at the poses before the summary, the number is not on stage at all — so
    // there is no frame anywhere in the walk where it reads unattributed.
    for (const pose of [0, 1]) {
      goToPose(pose);
      expect(visible("hardest-part-statistic"), `pose ${pose}`).toBe(false);
      expect(visible("hardest-part-source"), `pose ${pose}`).toBe(false);
    }
    unmount();
  });
});

// ── AC · the summary bar draws the statistic's own number ────────────────────

describe("the summary bar", () => {
  test("is cut from the statistic's fraction, and the copy prints the same numbers", () => {
    // A CROSS-MODULE WELD: the geometry's fraction against the copy's own
    // percentages. A reworded statistic that changed the figure and left the bar
    // alone is the one failure nobody would see on a projector.
    expect(PEOPLE_SHARE).toBe(0.7);
    const peoplePct = `${Math.round(PEOPLE_SHARE * 100)}%`;
    const technologyPct = `${100 - Math.round(PEOPLE_SHARE * 100)}%`;
    expect(peoplePct).toBe("70%");
    expect(C.statistic).toContain(peoplePct);
    expect(C.peopleLabel).toContain(peoplePct);
    expect(C.technologyLabel).toContain(technologyPct);
    expect(C.closer).toContain(peoplePct);
    expect(C.closer).toContain(technologyPct);
    const drawnRatio =
      SUMMARY_PEOPLE_WIDTH / (SUMMARY_PEOPLE_WIDTH + SUMMARY_TECHNOLOGY_WIDTH);
    expect(drawnRatio).toBeCloseTo(PEOPLE_SHARE, 2);
  });

  test("renders two masses of the geometry's widths, drawn only at the summary", () => {
    const { unmount } = renderSlide(2);
    const people = screen.getByTestId("hardest-part-bar-people");
    const technology = screen.getByTestId("hardest-part-bar-technology");
    expect(parseFloat(people.style.width)).toBe(SUMMARY_PEOPLE_WIDTH);
    expect(parseFloat(technology.style.width)).toBe(SUMMARY_TECHNOLOGY_WIDTH);
    expect(parseFloat(people.style.top)).toBe(SUMMARY_BAR_TOP);
    expect(parseFloat(technology.style.top)).toBe(SUMMARY_BAR_TOP);
    expect(parseFloat(people.style.width)).toBeGreaterThan(parseFloat(technology.style.width));
    expect(drawn("hardest-part-bar-people")).toBe(true);
    expect(drawn("hardest-part-bar-technology")).toBe(true);
    // RANK IS COLOUR, NEVER OPACITY: the masses gate on scaleX (their draw-in),
    // and neither carries an inline opacity a "30% at 30% opacity" edit would need.
    expect(people.style.opacity).toBe("");
    expect(technology.style.opacity).toBe("");
    expect(people.style.background).not.toBe(technology.style.background);
    // Undrawn before the summary — in both directions.
    goToPose(0);
    expect(drawn("hardest-part-bar-people")).toBe(false);
    expect(drawn("hardest-part-bar-technology")).toBe(false);
    unmount();
  });

  test("uses CSS vars everywhere — no hex, no rgba", () => {
    const { container, unmount } = renderSlide(2);
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

// ── AC · pose 0: the race ────────────────────────────────────────────────────

describe("pose 0 · the race", () => {
  test("names §6.1's two terms as the two lanes, and money's three items in the fast one", () => {
    expect(C.accessLane).toBe("Tool access");
    expect(C.capabilityLane).toBe("Organizational capability");
    expect([...C.accessItems]).toEqual(["MODELS", "LICENCES", "TOOLS"]);

    const { unmount } = renderSlide(0);
    expect(screen.getByTestId("hardest-part-access-lane").textContent).toBe(C.accessLane);
    expect(screen.getByTestId("hardest-part-capability-lane").textContent).toBe(
      C.capabilityLane,
    );
    const items = screen.getByTestId("hardest-part-access-items");
    for (const item of C.accessItems) expect(items.textContent).toContain(item);
    expect(screen.getByTestId("hardest-part-access-done").textContent).toBe(C.accessDone);
    // The two tags read PROCURED against EARNED — the deliberate echo of the
    // ladder's "declared only when earned" lives in the second one.
    expect(visible("hardest-part-access-tag")).toBe(true);
    expect(screen.getByTestId("hardest-part-access-tag").textContent).toBe(C.accessTag);
    expect(screen.getByTestId("hardest-part-capability-tag").textContent).toBe(
      C.capabilityTag,
    );
    unmount();
  });

  test("the race line closes the pose, with `signature` as its rendered keyword", () => {
    // Owner note 1 (2026-08-10), held as a regression: the kw is RENDERED emphasis,
    // not merely present in data.
    expect(C.raceLine).toBe("Only one of these arrives by signature.");
    expect(C.raceLineKw).toEqual(["signature"]);
    const { unmount } = renderSlide(0);
    const line = screen.getByTestId("hardest-part-race-line");
    expect(visible("hardest-part-race-line")).toBe(true);
    expect([...line.querySelectorAll("em")].map((em) => em.textContent)).toContain(
      "signature",
    );
    unmount();
  });

  test("the footnote is pose 0's — present at the race, GONE at the anatomy", () => {
    // Owner note (2026-08-10): "one changed habit at a time…" leaves the stage when
    // the anatomy arrives. This is the regression that would un-decide it.
    expect(C.footnote).toBe("one changed habit at a time — and never on an invoice");
    const { unmount } = renderSlide(0);
    expect(visible("hardest-part-footnote")).toBe(true);
    expect(
      [...screen.getByTestId("hardest-part-footnote").querySelectorAll("em")].map(
        (em) => em.textContent,
      ),
    ).toContain("never on an invoice");
    goToPose(1);
    expect(visible("hardest-part-footnote")).toBe(false);
    goToPose(2);
    expect(visible("hardest-part-footnote")).toBe(false);
    unmount();
  });
});

// ── AC · pose 1: the anatomy ─────────────────────────────────────────────────

describe("pose 1 · the anatomy", () => {
  test("the five segments are the content tuple, word on the lane and note under it", () => {
    expect(C.segments.map((s) => s.id)).toEqual([
      "decision-rights",
      "workflow",
      "skills",
      "incentives",
      "measurement",
    ]);
    const { unmount } = renderSlide(1);
    for (const seg of C.segments) {
      const segment = screen.getByTestId(`hardest-part-segment-${seg.id}`);
      const caption = screen.getByTestId(`hardest-part-caption-${seg.id}`);
      expect(segment.textContent, seg.id).toBe(seg.word);
      expect(caption.textContent, seg.id).toBe(seg.note);
      expect(visible(`hardest-part-segment-${seg.id}`), seg.id).toBe(true);
      expect(visible(`hardest-part-caption-${seg.id}`), seg.id).toBe(true);
    }
    // The captions took the owner's brightness call: `--neutral-200`, not the
    // `--neutral-400` that died at the back of the room.
    expect(
      screen.getByTestId(`hardest-part-caption-${C.segments[0].id}`).style.color,
    ).toBe("var(--neutral-200)");
    unmount();
  });

  test("the access lane THINS IN PLACE — same top, scoreboard height", () => {
    // Owner note 2, as geometry: the lane gives up height, never position.
    const { unmount } = renderSlide(0);
    const track = () => screen.getByTestId("hardest-part-access-track");
    expect(parseFloat(track().style.top)).toBe(ACCESS_TRACK_TOP);
    expect(parseFloat(track().style.height)).toBe(ACCESS_TRACK_HEIGHT);
    goToPose(1);
    expect(parseFloat(track().style.top)).toBe(ACCESS_TRACK_TOP);
    expect(parseFloat(track().style.height)).toBe(ACCESS_TRACK_HEIGHT_THIN);
    // …and its tag now carries the finished fact.
    expect(visible("hardest-part-access-tag")).toBe(false);
    expect(visible("hardest-part-access-tag-done")).toBe(true);
    expect(screen.getByTestId("hardest-part-access-tag-done").textContent).toBe(
      C.accessTagDone,
    );
    unmount();
  });

  test("the capability lane reads the geometry's pose table at every stop", () => {
    const { unmount } = renderSlide(0);
    const track = () => screen.getByTestId("hardest-part-capability-track");
    for (const pose of POSES) {
      goToPose(pose);
      const g = capabilityGeometry(pose);
      expect(parseFloat(track().style.top), `pose ${pose}`).toBe(g.trackTop);
      expect(parseFloat(track().style.height), `pose ${pose}`).toBe(g.trackHeight);
    }
    unmount();
  });

  test("the verdict is rendered emphasis on `procured`, and only at this pose", () => {
    expect(C.anatomyLine).toBe("None of it can be procured.");
    const { unmount } = renderSlide(1);
    expect(visible("hardest-part-anatomy-line")).toBe(true);
    expect(
      [...screen.getByTestId("hardest-part-anatomy-line").querySelectorAll("em")].map(
        (em) => em.textContent,
      ),
    ).toContain("procured");
    goToPose(0);
    expect(visible("hardest-part-anatomy-line")).toBe(false);
    unmount();
  });
});

// ── AC · pose 2: the scoreboard and the summary ──────────────────────────────

describe("pose 2 · the summary", () => {
  test("the two lanes park at ONE thin height — the scoreboard the owner asked for", () => {
    // Owner note 3, as a cross-module weld: the capability lane's pose-2 height IS
    // the access lane's thin height, so "similar height" cannot drift apart.
    expect(capabilityGeometry(2).trackHeight).toBe(ACCESS_TRACK_HEIGHT_THIN);
    const { unmount } = renderSlide(2);
    expect(visible("hardest-part-capability-tag")).toBe(false);
    expect(visible("hardest-part-capability-tag-running")).toBe(true);
    expect(screen.getByTestId("hardest-part-capability-tag-running").textContent).toBe(
      C.capabilityTagRunning,
    );
    expect(visible("hardest-part-access-tag-done")).toBe(true);
    unmount();
  });

  test("closes on the 70%, centered, as the slide's last arrival", () => {
    expect(C.closer).toBe("The tools are the 30%. Everything after this is the 70%.");
    expect(C.closerKw).toEqual(["the 70%"]);
    const { unmount } = renderSlide(2);
    const closer = screen.getByTestId("hardest-part-closer");
    expect(closer.textContent).toBe(C.closer);
    expect(visible("hardest-part-closer")).toBe(true);
    expect(parseFloat(closer.style.top)).toBe(SUMMARY_CLOSER_TOP);
    expect([...closer.querySelectorAll("em")].map((em) => em.textContent)).toContain(
      "the 70%",
    );
    unmount();
  });
});

// ── AC · every pose renders complete, forward and backward ───────────────────

describe("the pose walk", () => {
  test("every gated element is visible exactly at its poses, in both directions", () => {
    const { container, unmount } = renderSlide();
    const walk = [...POSES, ...[...POSES].reverse()];
    for (const pose of walk) {
      goToPose(pose);
      for (const [id, at] of VISIBLE_AT) {
        // The scene is persistent, so `on` is DERIVED from the pose and never
        // accumulated — walking back to 0 must re-hide the anatomy and the summary.
        expect(visible(id), `${id} at pose ${pose}`).toBe(at.includes(pose));
        // And the copy is THERE, not merely the box: a persistent scene that
        // dropped children would still pass an opacity check.
        if (!TEXTLESS_IDS.has(id)) {
          expect(screen.getByTestId(id).textContent, `${id} is empty`).not.toBe("");
        }
      }
      // ZERO SMIL NODES AT EVERY STOP — and zero `<svg>`, by construction: the
      // figure mounts no vector element at all, so the reduce-mode census cannot
      // differ from this one.
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set").length,
        `SMIL at pose ${pose}`,
      ).toBe(0);
      expect(container.querySelectorAll("svg").length, `svg at pose ${pose}`).toBe(0);
    }
    unmount();
  });

  test("pose 0 is the race alone — nothing from later poses on stage", () => {
    const { unmount } = renderSlide(0);
    for (const [id, at] of VISIBLE_AT) {
      expect(visible(id), id).toBe(at.includes(0));
    }
    expect(drawn("hardest-part-bar-people")).toBe(false);
    unmount();
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

  test("the markup is preference-independent, and every pose still renders complete", () => {
    // The global CSS rule squashes the keyframes and transitions; the one JS motion
    // source — the day counter's interval — gates itself on this same query, which
    // the mock flips on. The census below proves the MARKUP does not fork on the
    // preference; the squashed-duration half is the browser walk's.
    const { container, unmount } = renderSlide();
    for (const pose of POSES) {
      goToPose(pose);
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set").length,
        `reduce · pose ${pose}`,
      ).toBe(0);
      expect(container.querySelectorAll("svg").length, `reduce · pose ${pose}`).toBe(0);
      for (const [id, at] of VISIBLE_AT) {
        if (at.includes(pose)) {
          expect(visible(id), `reduce · pose ${pose} · ${id}`).toBe(true);
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
  test("exactly the five prose strings carry a *Kw sibling, every keyword real", () => {
    // PROSE is the headline, the race line, the footnote, the anatomy line and the
    // closer. Everything else is a label — and the two that matter most are the
    // STATISTIC and its SOURCE, which may never gain a `*Kw` without landing here.
    const kwKeys = Object.keys(C).filter((k) => k.endsWith("Kw"));
    expect(kwKeys.sort()).toEqual([
      "anatomyLineKw",
      "closerKw",
      "footnoteKw",
      "headlineKw",
      "raceLineKw",
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
    expect(Object.keys(C)).not.toContain("statisticKw");
    expect(Object.keys(C)).not.toContain("statisticSourceKw");
    expect(Object.keys(C)).not.toContain("peopleLabelKw");
    expect(Object.keys(C)).not.toContain("technologyLabelKw");
  });

  test("every label renders with no emphasis, while the prose boxes carry theirs", () => {
    const { unmount } = renderSlide(0);
    const labelIds = [
      "hardest-part-eyebrow-race",
      "hardest-part-eyebrow-anatomy",
      "hardest-part-eyebrow-summary",
      "hardest-part-access-lane",
      "hardest-part-access-tag",
      "hardest-part-access-tag-done",
      "hardest-part-access-items",
      "hardest-part-capability-lane",
      "hardest-part-capability-tag",
      "hardest-part-capability-tag-running",
      "hardest-part-capability-sofar",
      ...C.segments.map((s) => `hardest-part-segment-${s.id}`),
      ...C.segments.map((s) => `hardest-part-caption-${s.id}`),
      "hardest-part-statistic",
      "hardest-part-source",
      "hardest-part-people-label",
      "hardest-part-technology-label",
    ];
    for (const id of labelIds) {
      expect(screen.getByTestId(id).querySelector("em"), `<em> inside label ${id}`).toBeNull();
    }
    // …while every prose box DOES carry its keyword, so the absence above cannot
    // pass because emphasis stopped rendering everywhere.
    for (const id of [
      "hardest-part-race-line",
      "hardest-part-footnote",
      "hardest-part-anatomy-line",
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
      expect(copy, copy).not.toMatch(/\bnext (two|three|four|five)\b/i);
    }
    // The rendered half is scoped to this slide's own boxes: the harness's FigLabel
    // prints the DERIVED figure, the composer's to print and not this slide's to
    // author. The persistent scene keeps every string in the DOM at every pose, so
    // one stop covers the whole stage.
    const { container, unmount } = renderSlide(2);
    const stageText = [
      ...container.querySelectorAll<HTMLElement>("[data-testid^='hardest-part-']"),
    ]
      .map((el) => el.textContent ?? "")
      .join(" | ");
    expect(stageText.length).toBeGreaterThan(200);
    expect(stageText).not.toMatch(FIGURE);
    unmount();
  });
});

// ── AC · the §6.2 / §6.3 / §6.4 / §6.5 boundaries ────────────────────────────

describe("the sibling boundaries", () => {
  /**
   * What this slide may not say, and which slide owns each thing. THE FIRST ENTRY
   * IS A SPEC CONSTRAINT: §6.2 owns shadow AI as `condition`, and the deck's three
   * shadow-AI passes must share no image and no statistic — a first mention HERE
   * would spend that beat before `gap-no-sop` exists to make it.
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
    // Both slides print a 70 and a 30 and they mean different things. This slide's
    // percentages always arrive with their own subject attached, and the bare
    // phrase `70/30` — the ladder's — appears nowhere (asserted above).
    expect(C.peopleLabel).toMatch(/70%/);
    expect(C.peopleLabel).toMatch(/PEOPLE & PROCESS/);
    expect(C.technologyLabel).toMatch(/30%/);
    expect(C.technologyLabel).toMatch(/TECHNOLOGY/);
  });
});

// ── AC · no brand axis ───────────────────────────────────────────────────────

describe("no brand axis", () => {
  test("takes no brand block and names no organisation", () => {
    expect(GapHardestPart.length).toBe(0);
    for (const copy of authoredStrings()) {
      expect(copy, `an organisation in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(GEMS|GEMVIS|Berau|DigiTech|MineTech|Nanovest)\b/i,
      );
    }
    // The one third party the slide DOES name is the source of the figure.
    expect(C.statisticSource).toMatch(/BCG \/ McKinsey/);
  });

  test("the content block is plain data — no resolver hiding in it", () => {
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
   * BUILT FROM THE TABLES, NOT FROM `@/deck/registry` — the registry resolves
   * `VARIANT` once at module scope and this epoch's variant is the default
   * `general`, which has no leader deck at all.
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
    for (const brand of LEADER_BRANDS) {
      const { slides, sectionFirstIndex } = composedFor("leader", brand);
      const at = slides.findIndex((s) => s.def.id === gapHardestPartSlide.id);
      expect(at, brand).toBeGreaterThan(-1);

      const row = slides[at];
      expect(row.sectionKey, brand).toBe("gap");
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
      expect(sectionFirstIndex.get(row.letter), brand).toBe(at);
    }
  });

  test("reaches no standard deck — not the two that run a lab, and not general", () => {
    for (const brand of ALL_BRANDS) {
      const { slides } = composedFor("standard", brand);
      expect(
        slides.some((s) => s.def.id === gapHardestPartSlide.id),
        brand,
      ).toBe(false);
      expect(slides.some((s) => s.sectionKey === "gap"), brand).toBe(false);
    }
    expect(ALL_BRANDS).toEqual(expect.arrayContaining([...LEADER_BRANDS]));
  });
});

// ── the geometry: one number, both sides ─────────────────────────────────────

describe("the geometry", () => {
  test("the counts are welded to the content and the def", () => {
    expect(SEGMENT_COUNT).toBe(C.segments.length);
    expect(POSE_COUNT).toBe(gapHardestPartSlide.steps);
    // The floor still has room: this is the number that goes negative first when
    // anything on the summary shelf grows.
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThanOrEqual(0);
    expect(SUMMARY_CLOSER_TOP + SUMMARY_CLOSER_HEIGHT).toBeLessThanOrEqual(NAV_ZONE_TOP);
  });

  test("the anatomy's slices start where the fill ends and tile the lane exactly", () => {
    expect(EARNED_PROGRESS).toBeLessThan(PEOPLE_SHARE);
    expect(segmentSlice(0).left).toBe(EARNED_PROGRESS);
    const last = segmentSlice(SEGMENT_COUNT - 1);
    expect(last.left + last.width).toBeCloseTo(1, 10);
    for (let i = 1; i < SEGMENT_COUNT; i++) {
      const prev = segmentSlice(i - 1);
      expect(segmentSlice(i).left).toBeCloseTo(prev.left + prev.width, 10);
    }
  });

  test("the guards refuse what the slide does not have", () => {
    expect(() => capabilityGeometry(POSE_COUNT)).toThrow(/no pose/);
    expect(() => capabilityGeometry(-1)).toThrow(/no pose/);
    expect(() => capabilityGeometry(1.5)).toThrow(/no pose/);
    expect(() => segmentSlice(SEGMENT_COUNT)).toThrow(/no segment/);
    expect(() => segmentSlice(-1)).toThrow(/no segment/);
  });

  test("the renderer reads the module's shelves, not private copies", () => {
    const { unmount } = renderSlide(2);
    expect(parseFloat(screen.getByTestId("hardest-part-statistic").style.top)).toBe(
      SUMMARY_STATISTIC_TOP,
    );
    expect(parseFloat(screen.getByTestId("hardest-part-source").style.top)).toBe(
      SUMMARY_SOURCE_TOP,
    );
    expect(parseFloat(screen.getByTestId("hardest-part-bar-people").style.top)).toBe(
      SUMMARY_BAR_TOP,
    );
    expect(parseFloat(screen.getByTestId("hardest-part-closer").style.top)).toBe(
      SUMMARY_CLOSER_TOP,
    );
    expect(parseFloat(screen.getByTestId("hardest-part-access-track").style.top)).toBe(
      ACCESS_TRACK_TOP,
    );
    unmount();
  });
});
