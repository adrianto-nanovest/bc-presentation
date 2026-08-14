// D.4 · WHERE THE DATA GOES, AND WHO ANSWERS FOR IT — the slide that replaced two.
//
// ═══ WHAT THIS FILE INHERITED. `invest-security` (§6.7's D.4) and `invest-subscription` (D.5)
// each had a unit test of their own — 972 and 896 lines — and between them they held four rule
// families that still matter and two that stopped existing with the copy they guarded:
//
//   KEPT · the pose walk, held inside ONE mounted tree, forward and back.
//   KEPT · the keyword rule: `kw` on prose only, every keyword a substring of its own sentence.
//   KEPT · no rendered string names a letter or a figure number (§3.4 R2 / §3.5).
//   KEPT · the composition: leader-only, in §6.7's order, absent from every standard deck.
//   GONE · §12.2's price gate. The old D.5 printed three seat prices, each carrying its
//          currency, its billing period and the date it was read, and its test swept every one
//          of them for that triple. This slide prints no price, so the gate has nothing to hold
//          — which is asserted below as an ABSENCE rather than deleted, because a price
//          reappearing here would need the gate back and would arrive with no test asking for it.
//   GONE · §4.4's two brand axes (slot 4's on-prem callback, slot 7's price anchor) and the
//          resolver tests over them. This slide has no brand axis: it names no organisation, so
//          both leader decks render the same bytes. Asserted, not assumed.
//
// ═══ WHAT ONLY A BROWSER CAN SEE, and it is stated here so this file is not read as a complete
// account of the figure. jsdom has no layout engine: it computes no text width, no line count, no
// colour, no transform and no animation. So five of this slide's claims are NOT here and belong to
// `scripts/d4-figure-verify.mjs`, which asserts all five —
//
//   1. zero SMIL at every pose under either motion preference;
//   2. the four completed leads resting at `stroke-dashoffset: 0`, including under
//      `prefers-reduced-motion: reduce`, where the animation that walks them there is removed;
//   3. the four knobs actually throwing 46px and the leaf actually shutting, as computed matrices;
//   4. every string that could wrap, on two channels (`scrollWidth` for the `nowrap` labels, a
//      rendered line count for everything else);
//   5. all eleven `box-hover` overlays lighting to `--copper-200` and returning to rest.
//
// This file holds the STRUCTURE those measurements are of: which elements exist, at which pose,
// in which order, carrying which strings and which classes.
//
// ═══ THE FOUR THINGS A REVIEW WOULD MISS, which is what the rules below are cut for:
//
//   1. A ROW THAT LOST ITS PARTNER. The figure's whole argument is that gap `i` and control `i`
//      are the SAME row, wired through one switch. Reordering either tuple in `content.ts`
//      silently rewires the picture — every box still renders, every test that counts boxes still
//      passes, and the slide starts claiming that an audit trail answers a spend question. The
//      pairing is asserted by name, pair by pair.
//   2. A DATE, A PRICE OR A DOCUMENT REFERENCE COMING BACK. This slide is a standalone
//      deliverable and the whole reason its two parents' figures were dropped is that they could
//      not survive one. Held as an absence of DIGITS, which is the only form of that rule a test
//      can hold as a fact instead of as a list of forbidden values.
//   3. THE DOOR LOSING ITS THREAD. One element is act 1's first glyph, act 2's token and the
//      thing that shuts at pose 2. Three `data-*` attributes carry those states and they are the
//      only handle jsdom has on the figure's continuity.
//   4. A POSE THAT RESTS ON EVIDENCE WITH ITS CONCLUSION MISSING. Pose 0's last arrival is the
//      verdict and pose 2's is the answer, both derived from a count so a re-cut list takes the
//      conclusion with it. Asserted as delays, which is what a reveal order IS in this tree.
//
// ONE MOUNT, WALKED. Every claim about the poses is made inside ONE mounted tree — forward and
// back — because a beat that survives only a fresh mount, or a pose that clears something it
// should have kept, is exactly what a presenter stepping backwards finds and what a per-pose
// re-render never sees.
import { readFileSync } from "node:fs";
import path from "node:path";
import { act, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  InvestGovernance,
  investGovernanceSlide,
} from "@/slides/leader-invest/invest-governance";
import { investGovernanceContent as C } from "@/slides/leader-invest/content";
import { DECK_SET_COMPOSITION } from "@/deck/deck-sets";
import {
  ANSWER_TOP,
  BAND_TOP,
  BEAT_HEIGHT,
  BEAT_TEXT_SIZE,
  CIRCUIT_LEFT,
  CIRCUIT_ROWS,
  CONTENT_RIGHT,
  CONTENT_WIDTH,
  CONTROL_COUNT,
  CONTROL_LEFT,
  CONTROL_W,
  DOOR_COUNT,
  DOOR_H,
  DOOR_TOP,
  DOOR_W,
  FIGURE_BOTTOM,
  GAP_LEFT,
  GAP_W,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  ROWS_BOTTOM,
  ROWS_TOP,
  ROW_COUNT,
  ROW_H,
  ROW_PITCH,
  RULE_TOP,
  SIDE_MARGIN,
  SWITCH_LEFT,
  SWITCH_THROW,
  SWITCH_W,
  THESIS_HEIGHT,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  TOKEN_CX,
  TOKEN_CY,
  TOKEN_LABEL_LEFT,
  TOKEN_LABEL_W,
  VERDICT_TOP,
  WIRE_W,
  doorCenterX,
  doorLeft,
  rowCenterY,
  rowTop,
} from "@/slides/leader-invest/governance-geometry";

/**
 * The composed position, as a harness INPUT and not a claim the slide makes.
 *
 * `at` IS REQUIRED HERE, the case every `leader-invest` sibling documents: unit tests resolve the
 * default `general` deck, `general` has no leader variant, and this slide reaches the two leader
 * deck sets alone. D.4 because `invest` is the leader decks' fourth run and this slide composes at
 * its tail — re-measured off `tests/fixtures/deck-numbering.json`, which records D.1–D.4 for the
 * FOUR `invest` rows in both leader decks since the merge.
 */
const AT = { letter: "D", num: 5, sectionKey: "invest" } as const;

const POSES = [0, 1, 2, 3] as const;

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
    <SlideHarness def={investGovernanceSlide} at={AT}>
      <Nav />
      <InvestGovernance />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

/**
 * Whether a `Reveal` has ARRIVED, and not merely whether it is in the tree.
 *
 * `.fade` boxes are mounted at every pose and gated by the `on` class — `opacity: 0` plus
 * `pointer-events: none` until they arrive. So `queryByTestId` answers "is it in the DOM", which
 * is true from pose 0 for every box on the slide, and this answers the question the poses are
 * actually about.
 */
function gateOpen(testId: string): boolean {
  const el = screen.queryByTestId(testId);
  return el !== null && el.classList.contains("on");
}

/** An SVG `Mark`'s own gate: opacity, written inline by the component. `Mark` exists because
 *  `.fade` owns `transform` and half this figure's marks carry one of their own. */
function markOpen(testId: string): boolean {
  const el = screen.queryByTestId(testId);
  return el !== null && el.style.opacity === "1";
}

/**
 * An element's class list as a STRING.
 *
 * `Element.className` is an `SVGAnimatedString` on an SVG node and a plain string on an HTML one,
 * so a `toContain` over the property passes silently on one and compares against an object on the
 * other. Half this figure's classed elements are SVG (the travelling door, its leaf, the four
 * knobs, the four completed leads), so the attribute is read instead of the property.
 */
function classOf(testId: string): string {
  return screen.getByTestId(testId).getAttribute("class") ?? "";
}

/** A `Reveal`'s or a `Mark`'s arrival delay in ms. The reveal ORDER inside a pose is a cascade of
 *  these, so an order assertion is an assertion about them. */
function delayOf(testId: string): number {
  const el = screen.getByTestId(testId);
  return Number.parseFloat(el.style.transitionDelay);
}

function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/** Every string this slide's copy block authors. */
function authoredStrings(): string[] {
  return walkStrings(C);
}

function stageTextWithoutFigLabel(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

const DOOR_IDS = C.destinations.map((d) => d.id);
const GAP_IDS = C.exposures.map((e) => e.id);
const CONTROL_IDS = C.controls.map((c) => c.id);

/** Every box that carries `box-hover`, by pose. Eleven, and the split is act 1's three against
 *  act 2's eight — see the hover block below for why that split is the assertion. */
const ACT1_BOXES = DOOR_IDS.map((id) => `governance-destination-${id}`);
const ACT2_BOXES = [
  ...GAP_IDS.map((id) => `governance-gap-${id}`),
  ...CONTROL_IDS.map((id) => `governance-control-${id}`),
];

// ── the def ──────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, four poses, closing on the fullest one", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins the value, which
    // is also the string `deck-sets.ts` composes by).
    expect(investGovernanceSlide.id).toBe("invest-governance");

    // FOUR POSES: the three doors, the dead circuit, the live circuit, the floor. A fifth would
    // have to be a fifth argument and this slide makes four.
    expect(investGovernanceSlide.steps).toBe(4);

    // `canonicalPose: 3`, written both ways — the literal, so a silent change is visible in the
    // diff, and the derivation, so a fifth pose cannot leave the exports on the fourth. An
    // exported PDF has no presenter attached to it: pose 1 would export an exposure with nothing
    // that answers it, and pose 2 the whole argument with the line that asks for a decision
    // missing.
    expect(investGovernanceSlide.canonicalPose).toBe(3);
    expect(investGovernanceSlide.canonicalPose).toBe(investGovernanceSlide.steps - 1);

    expect(investGovernanceSlide.animationMode).toBe("step-reveal");
    expect(investGovernanceSlide.surface).toBe("dark");
    expect(investGovernanceSlide.sectionKey).toBe("invest");
  });

  test("reaches both leader decks at the tail of the invest run, and no standard deck", () => {
    const { leader, standard } = DECK_SET_COMPOSITION;
    expect(leader.slides).toContain("invest-governance");
    // THE OTHER HALF IS NOT IMPLIED BY THE POSITIVE. The id written into `STANDARD_SLIDE_IDS`
    // would open a run between the agenda and the landscape for an audience with no leader in the
    // room, and renumber every letter behind it.
    expect(standard.slides).not.toContain("invest-governance");
    // AND NEITHER OF THE TWO SLIDES IT REPLACED IS ANYWHERE, which is the merge's own assertion.
    // A revert by re-adding a row would fail here rather than as a figure number three files away.
    expect(leader.slides).not.toContain("invest-security");
    expect(leader.slides).not.toContain("invest-subscription");

    // THE LAST ARGUMENT OF THE RUN, AND NO LONGER ITS LAST ROW (gh#72). This slide still
    // closes §6.7 — nothing argues after it — but `invest-bridge-to-curriculum` now sits
    // behind it and is what hands off to the curriculum. The bridge carries `shape` as well,
    // since that run ships none. This slide's own figure did not move: a tail append leaves
    // R3 nothing behind it to renumber, so it still prints D.4.
    const at = leader.slides.indexOf("invest-governance");
    expect(leader.slides[at - 1]).toBe("invest-chicken-egg");
    expect(leader.slides[at + 1]).toBe("invest-bridge-to-curriculum");
    expect(leader.slides[at + 2]).toBe("b1-evolution-journey");
    // The bridge is the run's last row, and it argues nothing — asserted here because "the
    // tail of the run" is what this case is named for and the answer changed.
    expect(standard.slides).not.toContain("invest-bridge-to-curriculum");
  });
});

// ── the geometry ─────────────────────────────────────────────────────────────

describe("the geometry", () => {
  test("puts the thesis on the deck's own shelf, derived up from the NavBar", () => {
    // THE SHELF IS D.1's, D.2's AND D.3's TO THE PIXEL, and the derivation is what makes that a
    // fact rather than a coincidence: 632 − 16 − 26 = 590. A room that reads four slides in a row
    // wants the last line in the same place every time.
    expect(NAV_ZONE_TOP).toBe(632);
    expect(NAV_ZONE_CLEARANCE).toBe(16);
    expect(THESIS_HEIGHT).toBe(26);
    expect(THESIS_TOP).toBe(590);
    expect(THESIS_TOP).toBe(NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - THESIS_HEIGHT);
    expect(THESIS_TEXT_SIZE).toBe(19);
    // The rule 36px above it, and both full width on the deck's own margin.
    expect(RULE_TOP).toBe(553);
    expect(THESIS_TOP - RULE_TOP - 1).toBe(36);
    expect(SIDE_MARGIN).toBe(48);
    expect(CONTENT_WIDTH).toBe(1184);
    expect(CONTENT_RIGHT).toBe(1232);
  });

  test("keeps both acts clear of the thesis band, and says so at module load", () => {
    // The guard is a throwing IIFE in the geometry module, so the value it returns is the proof it
    // did not throw. BOTH acts are measured, not just the taller one — a redraw is as likely to
    // grow the shorter.
    expect(FIGURE_BOTTOM).toBe(Math.max(VERDICT_TOP + BEAT_HEIGHT, ANSWER_TOP + BEAT_HEIGHT));
    expect(FIGURE_BOTTOM).toBeLessThanOrEqual(RULE_TOP);
    expect(BAND_TOP).toBe(156);
  });

  test("lays the three doors across the full content width, edge to edge", () => {
    expect(DOOR_COUNT).toBe(C.destinations.length);
    expect(doorLeft(0)).toBe(SIDE_MARGIN);
    expect(doorLeft(DOOR_COUNT - 1) + DOOR_W).toBe(CONTENT_RIGHT);
    // THE MIDDLE DOOR'S CENTRE IS THE STAGE'S OWN, which is what makes the bus symmetric.
    expect(doorCenterX(1)).toBe(640);
    expect(DOOR_TOP + DOOR_H).toBeLessThan(VERDICT_TOP);
    // …and a fourth door is a vendor, so it throws rather than painting off the stage.
    expect(() => doorLeft(DOOR_COUNT)).toThrow(/no door 3/);
    expect(() => doorLeft(-1)).toThrow();
  });

  test("gives both columns of the circuit one row grid, and one switch between them", () => {
    // THE FIGURE'S SHARPEST CLAIM, AS ARITHMETIC. Gap `i` and control `i` are the same row
    // because all three callers use `rowTop`, not because three lists were laid out alike.
    expect(CIRCUIT_ROWS).toBe(ROW_COUNT);
    expect(CIRCUIT_ROWS).toBe(CONTROL_COUNT);
    expect(ROW_COUNT).toBe(C.exposures.length);
    expect(CONTROL_COUNT).toBe(C.controls.length);
    for (let i = 0; i < CIRCUIT_ROWS; i += 1) {
      expect(rowTop(i)).toBe(ROWS_TOP + i * ROW_PITCH);
      expect(rowCenterY(i)).toBe(rowTop(i) + ROW_H / 2);
    }
    expect(rowTop(CIRCUIT_ROWS - 1) + ROW_H).toBe(ROWS_BOTTOM);
    expect(() => rowTop(CIRCUIT_ROWS)).toThrow(/no row 4/);

    // THE FIVE COLUMNS ADD UP TO THE CONTENT WIDTH EXACTLY, and the two leads are EQUAL — a
    // switch with a longer lead on one side reads as belonging to that side.
    expect(GAP_LEFT).toBe(CIRCUIT_LEFT);
    expect(GAP_LEFT + GAP_W + WIRE_W).toBe(SWITCH_LEFT);
    expect(SWITCH_LEFT + SWITCH_W + WIRE_W).toBe(CONTROL_LEFT);
    expect(CONTROL_LEFT + CONTROL_W).toBe(CONTENT_RIGHT);
    expect(CONTROL_W).toBe(GAP_W);
    expect(SWITCH_THROW).toBeGreaterThan(0);
  });

  test("centres the owner token's label on the token, between the margin and the circuit", () => {
    expect(TOKEN_CX).toBe(90);
    expect(TOKEN_CY).toBe((ROWS_TOP + ROWS_BOTTOM) / 2);
    // The two ends land on the two things that were already there: the deck's margin and the
    // column the circuit starts at. That is the whole of the room a token label has.
    expect(TOKEN_LABEL_LEFT).toBe(SIDE_MARGIN);
    expect(TOKEN_LABEL_LEFT + TOKEN_LABEL_W).toBe(CIRCUIT_LEFT);
  });
});

// ── act 1 · one screen, three doors ──────────────────────────────────────────

describe("act 1 · the three contracts", () => {
  test("paints one screen, three doors and their contracts, and nothing of act 2", () => {
    const { unmount } = renderSlide(0);
    expect(gateOpen("governance-screen-eyebrow")).toBe(true);
    expect(markOpen("governance-screen")).toBe(true);
    expect(markOpen("governance-bus")).toBe(true);
    for (const d of C.destinations) {
      expect(gateOpen(`governance-destination-${d.id}`)).toBe(true);
      expect(screen.getByTestId(`governance-destination-label-${d.id}`).textContent).toBe(d.label);
      expect(screen.getByTestId(`governance-destination-contract-${d.id}`).textContent).toBe(
        d.contract,
      );
    }
    expect(gateOpen("governance-verdict")).toBe(true);

    // NOTHING OF ACT 2. A pose is a resting state, and this one rests on a comparison that
    // recommends nothing except where own hardware fits.
    expect(gateOpen("governance-exposure")).toBe(false);
    expect(markOpen("governance-token")).toBe(false);
    for (const id of ACT2_BOXES) expect(gateOpen(id)).toBe(false);
    expect(gateOpen("governance-rule")).toBe(false);
    expect(gateOpen("governance-thesis")).toBe(false);
    unmount();
  });

  test("draws the first destination's door OPEN and LEAKING, and the other two as themselves", () => {
    const { unmount } = renderSlide(0);
    // THE THREAD OF THE WHOLE FIGURE. One element is act 1's first glyph, act 2's token and the
    // thing that shuts — and these three attributes are the only handle jsdom has on it.
    const door = screen.getByTestId("governance-door");
    expect(door.dataset.parked).toBe("false");
    expect(door.dataset.shut).toBe("false");
    expect(classOf("governance-door")).toContain("gv-travel");
    expect(classOf("governance-door")).not.toContain("gv-travel-parked");
    // Something is leaving through it, and no badge is on it yet.
    expect(screen.queryByTestId("governance-leak")).not.toBeNull();
    expect(screen.queryByTestId("governance-badge")).toBeNull();
    expect(classOf("governance-door-leaf")).not.toContain("gv-leaf-shut");

    // The other two glyphs are their own marks and leave with the act; the first is NOT among
    // them, which is what lets it travel.
    expect(screen.queryByTestId("governance-glyph-personal")).toBeNull();
    expect(markOpen("governance-glyph-company-managed")).toBe(true);
    expect(markOpen("governance-glyph-onsite")).toBe(true);
    unmount();
  });

  test("arrives label → screen → bus → doors → verdict, and the verdict is LAST", () => {
    const { unmount } = renderSlide(0);
    // THE CLAIM BEFORE THE DRAWING BEFORE THE DESTINATIONS. A bus out of nothing is a line to
    // nowhere, and a destination that arrived first would tell the room the answer before it had
    // seen the question.
    const order = [
      "governance-screen-eyebrow",
      "governance-screen",
      "governance-bus",
      ...DOOR_IDS.map((id) => `governance-destination-${id}`),
      "governance-verdict",
    ];
    const delays = order.map(delayOf);
    for (let i = 1; i < delays.length; i += 1) {
      expect(delays[i], `${order[i]} arrives before ${order[i - 1]}`).toBeGreaterThan(
        delays[i - 1],
      );
    }
    // AND THE VERDICT IS DERIVED FROM THE COUNT, not a literal — a fourth door would take the
    // conclusion with it rather than being overtaken by it.
    expect(delayOf("governance-verdict")).toBe(
      delayOf(`governance-destination-${DOOR_IDS[DOOR_COUNT - 1]}`) + 90,
    );
    unmount();
  });
});

// ── act 2 · the circuit ──────────────────────────────────────────────────────

describe("act 2 · the four switches", () => {
  test("at pose 1 the door has travelled, the switches are OFF and the slots are EMPTY", () => {
    const { unmount } = renderSlide(1);
    const door = screen.getByTestId("governance-door");
    expect(door.dataset.parked).toBe("true");
    expect(door.dataset.shut).toBe("false");
    expect(classOf("governance-door")).toContain("gv-travel-parked");
    // It is still leaking and still has no owner — which is the pose's whole claim.
    expect(screen.queryByTestId("governance-leak")).not.toBeNull();
    expect(screen.queryByTestId("governance-badge")).toBeNull();
    expect(gateOpen("governance-token-nobody")).toBe(true);
    expect(gateOpen("governance-token-owner")).toBe(false);
    expect(screen.getByTestId("governance-token-nobody").textContent).toBe(C.nobodyToken);

    // Act 1 has left. The three doors are a SET, not superseded information — see the component.
    for (const id of ACT1_BOXES) expect(gateOpen(id)).toBe(false);
    expect(markOpen("governance-screen")).toBe(false);
    expect(markOpen("governance-bus")).toBe(false);
    expect(gateOpen("governance-verdict")).toBe(false);

    // The deficit is on the stage, the offer is not, and every switch reports itself off.
    expect(gateOpen("governance-exposure")).toBe(true);
    expect(gateOpen("governance-exposure-eyebrow")).toBe(true);
    expect(gateOpen("governance-controls-eyebrow")).toBe(false);
    for (const e of C.exposures) {
      expect(gateOpen(`governance-gap-${e.id}`)).toBe(true);
      expect(screen.getByTestId(`governance-gap-${e.id}`).textContent).toBe(e.label);
    }
    for (const c of C.controls) {
      const box = screen.getByTestId(`governance-control-${c.id}`);
      expect(gateOpen(`governance-control-${c.id}`)).toBe(true);
      expect(box.dataset.filled).toBe("false");
      // AN EMPTY SLOT AND NOT A LABEL. The control's own words are not on the stage yet, and the
      // mark that stands in for them is the drawing of an absence.
      expect(box.textContent).toBe("");
      expect(screen.queryByTestId(`governance-empty-${c.id}`)).not.toBeNull();
    }
    for (let i = 0; i < CIRCUIT_ROWS; i += 1) {
      expect(screen.getByTestId(`governance-knob-${i}`).dataset.on).toBe("false");
      expect(screen.queryByTestId(`governance-wire-${i}`)).toBeNull();
    }
    expect(gateOpen("governance-answer")).toBe(false);
    unmount();
  });

  test("at pose 2 the switches throw, the leads complete, and the door SHUTS", () => {
    const { unmount } = renderSlide(2);
    for (let i = 0; i < CIRCUIT_ROWS; i += 1) {
      expect(screen.getByTestId(`governance-knob-${i}`).dataset.on).toBe("true");
      expect(classOf(`governance-knob-${i}`)).toContain("gv-knob-on");
      // THE CIRCUIT COMPLETES, and the completed lead is a SECOND element over the broken one
      // rather than the same one recoloured — §7.1: attention is bought with added light.
      expect(classOf(`governance-wire-${i}`)).toContain("gv-draw");
    }
    for (const c of C.controls) {
      const box = screen.getByTestId(`governance-control-${c.id}`);
      expect(box.dataset.filled).toBe("true");
      expect(box.textContent).toBe(c.label);
      expect(screen.queryByTestId(`governance-empty-${c.id}`)).toBeNull();
    }
    expect(gateOpen("governance-controls-eyebrow")).toBe(true);
    expect(gateOpen("governance-answer")).toBe(true);

    // AND THE CONSEQUENCE OF ALL FOUR. The door shuts, the packet stops, a badge lands, and the
    // token's label names who it belongs to.
    const door = screen.getByTestId("governance-door");
    expect(door.dataset.shut).toBe("true");
    expect(classOf("governance-door-leaf")).toContain("gv-leaf-shut");
    expect(screen.queryByTestId("governance-leak")).toBeNull();
    expect(screen.queryByTestId("governance-badge")).not.toBeNull();
    expect(gateOpen("governance-token-owner")).toBe(true);
    expect(gateOpen("governance-token-nobody")).toBe(false);
    expect(screen.getByTestId("governance-token-owner").textContent).toBe(C.ownerToken);
    unmount();
  });

  test("flips the four switches in sequence, and the door shuts AFTER the last of them", () => {
    const { unmount } = renderSlide(2);
    // ONE HAND GOING DOWN A PANEL. Four switches that flipped together would read as a state
    // that was always true; a sequence reads as a decision being taken.
    const throws = Array.from({ length: CIRCUIT_ROWS }, (_, i) =>
      Number.parseFloat(screen.getByTestId(`governance-control-${CONTROL_IDS[i]}`).style
        .transitionDelay),
    );
    for (let i = 1; i < throws.length; i += 1) {
      expect(throws[i], `row ${i} flips before row ${i - 1}`).toBeGreaterThan(throws[i - 1]);
    }
    // THE CAUSE BEFORE THE CONSEQUENCE. The owner label rides the door's own step, so it is the
    // cheapest handle on "the door shut after the switches".
    expect(delayOf("governance-token-owner")).toBeGreaterThan(throws[throws.length - 1]);
    // …and the sentence that names what changed is last of all.
    expect(delayOf("governance-answer")).toBeGreaterThan(delayOf("governance-token-owner"));
    unmount();
  });

  test("wires gap i to control i — the pairing, by name", () => {
    // THE ONE EDIT A REVIEW WOULD MISS. Reordering either tuple in `content.ts` renders eleven
    // correct boxes and starts claiming that an audit trail answers a spend question.
    expect(C.exposures.map((e) => e.id)).toEqual([
      "cannot-audit",
      "cannot-revoke",
      "cannot-produce",
      "cannot-price",
    ]);
    expect(C.controls.map((c) => c.id)).toEqual([
      "audit-trail",
      "one-sign-in",
      "export",
      "one-bill",
    ]);
    // Each pair, in words, so a failure says which row stopped answering its own question.
    const PAIRS: ReadonlyArray<readonly [RegExp, RegExp]> = [
      [/\baudit\b/i, /\baudit trail\b/i],
      [/\brevoke\b/i, /\boff switch\b/i],
      [/\bauditor\b/i, /\bexport\b/i],
      [/\bspends?\b/i, /\bbill\b/i],
    ];
    PAIRS.forEach(([gap, control], i) => {
      expect(C.exposures[i].label, `row ${i}'s gap`).toMatch(gap);
      expect(C.controls[i].label, `row ${i}'s control`).toMatch(control);
    });
  });

  test("places every row's box, switch and lead on ONE centre line", () => {
    const { unmount } = renderSlide(2);
    for (let i = 0; i < CIRCUIT_ROWS; i += 1) {
      const gap = screen.getByTestId(`governance-gap-${GAP_IDS[i]}`);
      const control = screen.getByTestId(`governance-control-${CONTROL_IDS[i]}`);
      expect(gap.style.top).toBe(`${rowTop(i)}px`);
      expect(control.style.top).toBe(`${rowTop(i)}px`);
      expect(gap.style.left).toBe(`${GAP_LEFT}px`);
      expect(control.style.left).toBe(`${CONTROL_LEFT}px`);
      expect(gap.style.height).toBe(`${ROW_H}px`);
      expect(control.style.height).toBe(`${ROW_H}px`);
      // The switch and the lead are drawn at the row's own centre, off the same function.
      expect(screen.getByTestId(`governance-knob-${i}`).getAttribute("cy")).toBe(
        String(rowCenterY(i)),
      );
      expect(screen.getByTestId(`governance-track-${i}`).getAttribute("y")).toBe(
        String(rowCenterY(i) - 13),
      );
      expect(screen.getByTestId(`governance-wire-${i}`).getAttribute("y1")).toBe(
        String(rowCenterY(i)),
      );
    }
    unmount();
  });
});

// ── the floor ────────────────────────────────────────────────────────────────

describe("the floor", () => {
  test("arrives last, alone, on the shelf its three siblings use", () => {
    const { unmount } = renderSlide(3);
    expect(gateOpen("governance-rule")).toBe(false); // `CopperRule` is not a `Reveal`
    expect(screen.getByTestId("governance-rule").style.top).toBe(`${RULE_TOP}px`);
    expect(gateOpen("governance-thesis")).toBe(true);

    const thesis = screen.getByTestId("governance-thesis");
    expect(thesis.tagName).toBe("P");
    expect(thesis.style.left).toBe(`${SIDE_MARGIN}px`);
    expect(thesis.style.top).toBe(`${THESIS_TOP}px`);
    expect(thesis.style.width).toBe(`${CONTENT_WIDTH}px`);
    expect(thesis.style.height).toBe(`${THESIS_HEIGHT}px`);
    expect(thesis.style.fontSize).toBe(`${THESIS_TEXT_SIZE}px`);
    expect(thesis.style.fontFamily).toBe("var(--serif)");
    expect(thesis.style.lineHeight).toBe("1.3");
    expect(thesis.textContent).toBe(C.closer);

    // THE RULE OPENS THE BAND BEFORE THE SENTENCE LANDS IN IT — the same order D.1 uses.
    expect(delayOf("governance-thesis")).toBeGreaterThan(120);

    // AND THE FIGURE ABOVE IT DOES NOT MOVE. The room has read the whole picture by the time the
    // deck asks it for anything.
    expect(gateOpen("governance-exposure")).toBe(true);
    expect(gateOpen("governance-answer")).toBe(true);
    for (const id of ACT2_BOXES) expect(gateOpen(id)).toBe(true);
    unmount();
  });

  test("ranks the three prose lines below the thesis, and all four in one register", () => {
    const { unmount } = renderSlide(3);
    for (const id of ["governance-exposure", "governance-answer"]) {
      const el = screen.getByTestId(id);
      expect(el.tagName).toBe("P");
      expect(el.style.fontSize).toBe(`${BEAT_TEXT_SIZE}px`);
      expect(el.style.height).toBe(`${BEAT_HEIGHT}px`);
      expect(el.style.width).toBe(`${CONTENT_WIDTH}px`);
    }
    // The thesis is the only line above the beat register, which is what a shelf is for.
    expect(THESIS_TEXT_SIZE).toBeGreaterThan(BEAT_TEXT_SIZE);
    unmount();
  });
});

// ── the pose walk ────────────────────────────────────────────────────────────

describe("the pose walk", () => {
  test("builds forward and unbuilds backward inside ONE mounted tree", () => {
    const { unmount } = renderSlide(0);

    /** What must be open at each pose, and what must not. */
    const EXPECT: ReadonlyArray<readonly [number, readonly string[], readonly string[]]> = [
      [
        0,
        ["governance-screen-eyebrow", ...ACT1_BOXES, "governance-verdict"],
        ["governance-exposure", ...ACT2_BOXES, "governance-thesis"],
      ],
      [
        1,
        ["governance-exposure", "governance-exposure-eyebrow", ...ACT2_BOXES],
        [...ACT1_BOXES, "governance-verdict", "governance-controls-eyebrow", "governance-answer"],
      ],
      [
        2,
        ["governance-controls-eyebrow", "governance-answer", ...ACT2_BOXES],
        [...ACT1_BOXES, "governance-thesis"],
      ],
      [3, ["governance-thesis", "governance-answer", ...ACT2_BOXES], [...ACT1_BOXES]],
    ];

    const assertPose = (pose: number) => {
      const row = EXPECT.find(([p]) => p === pose);
      if (!row) throw new Error(`no expectation recorded for pose ${pose}`);
      const [, open, shut] = row;
      for (const id of open) expect(gateOpen(id), `pose ${pose}: ${id} is not open`).toBe(true);
      for (const id of shut) expect(gateOpen(id), `pose ${pose}: ${id} is open`).toBe(false);
    };

    for (const pose of POSES) {
      goToPose(pose);
      assertPose(pose);
    }
    // AND BACK. A pose that clears something it should have kept is exactly what a presenter
    // stepping backwards finds and what a per-pose re-render never sees.
    for (const pose of [...POSES].reverse()) {
      goToPose(pose);
      assertPose(pose);
    }
    unmount();
  });

  test("hands every box a hover overlay, at the pose that paints it", () => {
    // ELEVEN BOXES, ALL ELEVEN CARRYING `box-hover`. What that class paints is a `::before`
    // overlay jsdom cannot compute, so what is held here is the CLASS; the overlay's opacity, its
    // colour and its return to rest are `scripts/d4-figure-verify.mjs`'s.
    const { unmount } = renderSlide(0);
    for (const id of ACT1_BOXES) {
      expect(screen.getByTestId(id).className, id).toContain("box-hover");
    }
    goToPose(2);
    for (const id of ACT2_BOXES) {
      expect(screen.getByTestId(id).className, id).toContain("box-hover");
    }
    expect(ACT1_BOXES.length + ACT2_BOXES.length).toBe(11);
    unmount();
  });
});

// ── the copy ─────────────────────────────────────────────────────────────────

describe("the copy", () => {
  test("names no letter and no figure number, anywhere", () => {
    // §3.4 R2 / §3.5. The composer derives the pair and `FigLabel` prints it; a rendered string
    // that named either would go stale the day a run is inserted in front of this one.
    const FIGURE_LIKE = /\b(?:fig\.?|figure|slide)\b|\b[A-N]\.\d+\b/i;
    for (const copy of authoredStrings()) {
      expect(copy, `a figure reference in ${JSON.stringify(copy)}`).not.toMatch(FIGURE_LIKE);
    }
    const { container, unmount } = renderSlide(3);
    // The derived reference IS on the stage — it is there to strip, which is what makes the rule
    // over the rest of the stage non-vacuous.
    expect(container.querySelector(".fig-label")?.textContent).toContain(`${AT.letter}.${AT.num}`);
    expect(stageTextWithoutFigLabel(container)).not.toMatch(FIGURE_LIKE);
    unmount();
  });

  test("prints NO DIGIT AT ALL — no date, no price, no benchmark", () => {
    // THE STANDALONE-DELIVERABLE RULE, AND THE CHEAPEST FORM OF IT. This slide is read in rooms
    // and months this repo cannot know, so nothing on it may carry a date; and this deck's own
    // gate requires a price to carry the date it was read, so no date means no price. Both parent
    // slides failed that test — one printed two benchmark figures from a dated capture, the other
    // three seat prices with ISO read-dates — and the merge dropped every one of them.
    //
    // HELD AS AN ABSENCE OF DIGITS rather than as a list of forbidden values, because that is the
    // only version a test can hold as a fact. A number reappearing here means the slide has
    // gained a source, and a source needs a provenance line this stage has no room for.
    for (const copy of authoredStrings()) {
      expect(copy, `a digit in ${JSON.stringify(copy)}`).not.toMatch(/\d/);
    }
    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(300);
    expect(stage).not.toMatch(/\d/);
    unmount();
  });

  test("references no document, no repository path and no organisation", () => {
    // THE OTHER HALF OF STANDALONE. A slide that cited an internal deck, a research file or a
    // group function would be unreadable outside the week it was written — and both parent slides
    // did all three between them.
    const FORBIDDEN: ReadonlyArray<readonly [string, RegExp]> = [
      ["a repository path", /\bdocs?\//i],
      ["a file name", /\.(?:md|pdf|pptx?|xlsx?|tsx?)\b/i],
      ["a spec section", /§\s*\d/],
      ["a month", /\b(?:january|february|march|april|may|june|july|august|september|october|november|december)\b/i],
      ["a quarter", /\bQ[1-4]\b/],
      ["a currency", /\b(?:USD|IDR|EUR|Rp)\b|[$€]/],
      ["a named vendor", /\b(?:Claude|ChatGPT|OpenAI|Anthropic|Gemini|Google|Microsoft|Copilot)\b/i],
      ["a named organisation", /\b(?:Sinar Mas|GEMS|GEMVIS|DigiTech|MineTech|Berau|Nanovest)\b/i],
      ["a source attribution", /\b(?:source|reported|according to|vendor-reported|audited)\b/i],
    ];
    const { container, unmount } = renderSlide(3);
    const corpus = [...authoredStrings(), stageTextWithoutFigLabel(container)];
    for (const [name, pattern] of FORBIDDEN) {
      for (const copy of corpus) {
        expect(pattern.test(copy), `${name} in ${JSON.stringify(copy)}`).toBe(false);
      }
    }
    unmount();

    // NON-VACUITY: every pattern above fires on the copy the two parent slides really shipped,
    // transcribed here because the modules that held it are gone. A guard that matched nothing
    // would pass on any of these sentences coming back.
    const RETIRED: readonly string[] = [
      "Best open weights against the frontier — Artificial Analysis, 2 August 2026, commercial use restricted.",
      "USD 20 /seat/mo · billed annually · read 2026-08-04",
      "Source: Google Cloud's published GEMVIS customer story — vendor-reported, not independently audited.",
      "The four domains we proposed to Sinar Mas Group HR, April 2026 — not a Group requirement.",
      "docs/researches/2026-08-04-vendor-pricing-and-data-handling.md §8.3",
      "Most of the division — Claude Team Standard",
      "Usage analytics are what make the November post-assessment mean anything.",
      "Reported for Q3 in Rp and €.",
    ];
    for (const [name, pattern] of FORBIDDEN) {
      expect(
        RETIRED.some((line) => pattern.test(line)),
        `"${name}" fires on nothing at all — it cannot be guarding anything`,
      ).toBe(true);
    }
  });

  test("keeps `kw` on prose only, and every keyword inside its own sentence", () => {
    // THE KEYWORD RULE, this file's own version of a rule every block in `content.ts` states. A
    // copper italic inside a LABEL emphasises a fragment of a name; inside a sentence it is the
    // clause the room is meant to leave with.
    const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
      ["headline", C.headline, C.headlineKw],
      ["verdict", C.verdict, C.verdictKw],
      ["exposureLine", C.exposureLine, C.exposureLineKw],
      ["answerLine", C.answerLine, C.answerLineKw],
      ["closer", C.closer, C.closerKw],
    ];
    for (const [name, sentence, keywords] of PROSE) {
      expect(keywords.length, `${name} carries no keyword`).toBeGreaterThan(0);
      for (const kw of keywords) {
        expect(sentence, `${name}'s keyword "${kw}" is not in it`).toContain(kw);
      }
    }
    // AND THE LABELS CARRY NONE. Checked structurally rather than by name, so a `*Kw` added
    // beside a label fails here the day it is written.
    const proseKeys = new Set([
      "headline",
      "headlineKw",
      "verdict",
      "verdictKw",
      "exposureLine",
      "exposureLineKw",
      "answerLine",
      "answerLineKw",
      "closer",
      "closerKw",
    ]);
    for (const key of Object.keys(C)) {
      if (!key.endsWith("Kw")) continue;
      expect(proseKeys.has(key), `"${key}" is a keyword list on a label`).toBe(true);
    }
  });

  test("renders every authored string it is supposed to, and nothing it is not", () => {
    // The full-stage census: walk the poses and require every string in the block to have
    // appeared, so a box that silently stopped rendering fails here rather than on a projector.
    // `glyph` names are the exception and are named: they are a drawing selector, not copy.
    const GLYPH_NAMES = new Set(C.destinations.map((d) => d.glyph));
    const IDS = new Set([...DOOR_IDS, ...GAP_IDS, ...CONTROL_IDS]);
    const { container, unmount } = renderSlide(0);
    let seen = "";
    for (const pose of POSES) {
      goToPose(pose);
      seen += stageTextWithoutFigLabel(container);
    }
    const unrendered = authoredStrings().filter(
      (copy) => !GLYPH_NAMES.has(copy as never) && !IDS.has(copy) && !seen.includes(copy),
    );
    // `figLabel` is inside the stripped `.fig-label`, and every `*Kw` fragment is a substring of
    // its own sentence, so both are already covered.
    expect(unrendered.filter((s) => s !== C.figLabel)).toEqual([]);
    unmount();
  });
});

// ── the stylesheet, as a text ────────────────────────────────────────────────

describe("the stylesheet", () => {
  // READ OFF DISK AND NOT IMPORTED. Vite resolves a `.css` import to an injected stylesheet, and
  // jsdom computes no stylesheet at all — so the only way to hold a rule over this file's CONTENT
  // in a jsdom suite is to read the bytes. `import.meta.url` is not a `file:` URL under this
  // vitest transform, so the path is resolved off the repo root instead.
  const css = readFileSync(
    path.resolve(process.cwd(), "src/slides/leader-invest/components/governance.css"),
    "utf8",
  );

  test("prefixes every keyframe with `gv-`, so retiming this figure retimes no other", () => {
    const names = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
    expect(names.length, "a rule over no keyframes proves nothing").toBeGreaterThan(3);
    for (const name of names) expect(name, `"${name}" is not gv- prefixed`).toMatch(/^gv-/);
  });

  test("answers `prefers-reduced-motion` for every infinite rule, and un-hides the drawn leads", () => {
    const block = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
    expect(block.length, "there is no reduced-motion block at all").toBeGreaterThan(200);
    // THE FOUR LOOPS ARE REMOVED, NOT PARKED. A squashed 0.01ms infinite animation restarts 41
    // times a second, which for the caret and the empty marks is a strobe.
    for (const cls of [".gv-caret", ".gv-lane-flow", ".gv-empty", ".gv-leak"]) {
      expect(block, `${cls} is not answered under reduce`).toContain(cls);
    }
    // AND THE ONE FAILURE THAT WOULD DELETE AN ARGUMENT. `gv-draw` leaves a dash pattern behind
    // when its animation is removed, so `animation: none` alone would make every completed lead
    // invisible — which is the whole of what pose 2 claims. The offset is zeroed by hand, and the
    // browser harness reads the computed value back.
    expect(block).toMatch(/\.gv-draw\s*\{[^}]*stroke-dashoffset:\s*0/);
  });

  test("declares the two travelling transforms as transitions, so the walk backwards is free", () => {
    // A keyframe would need a second, reversed copy of itself and would still jump on a fast walk.
    expect(css).toMatch(/\.gv-travel\s*\{[^}]*transition:\s*transform/);
    expect(css).toMatch(/\.gv-leaf\s*\{[^}]*transition:\s*transform/);
    expect(css).toMatch(/\.gv-knob\s*\{[^}]*transition:/);
    // `transform-box: fill-box` is LOAD-BEARING on an animated SVG group: without it the origin
    // is the viewport's own (0 0) and a scale drags the mark across the stage.
    for (const cls of [".gv-travel", ".gv-leaf", ".gv-knob", ".gv-pop", ".gv-leak"]) {
      const rule = css.slice(css.indexOf(`${cls} {`));
      expect(rule.slice(0, rule.indexOf("}")), `${cls} has no transform-box`).toContain(
        "transform-box: fill-box",
      );
    }
  });

  test("holds every colour as a variable — no hex, no rgb(), no named colour", () => {
    // CSS VARIABLES ONLY. The one `rgba()` in this tree lives in `globals.css`'s hover wash and is
    // not this file's; a literal here would be a tier nothing else in the deck could follow.
    //
    // ZERO SMIL IS NOT ASSERTED HERE. A stylesheet cannot contain an `<animate>` element, and the
    // only mentions of the word in this file are the header's own statement of the rule — so a
    // pattern over the text would fire on the documentation and never on a defect. The rule is
    // real and it is held at every pose, under both motion preferences, by
    // `scripts/d4-figure-verify.mjs`, which counts the nodes in a live document.
    const declarations = css.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(declarations, "a rule over no declarations proves nothing").toContain("--ease");
    expect(declarations).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(declarations).not.toMatch(/\brgba?\(/);
    // Every colour this file names is a token, and the only ones it names are the two the two
    // parts of the switch need.
    const tokens = [...declarations.matchAll(/var\(--([\w-]+)\)/g)].map((m) => m[1]);
    expect(tokens.length).toBeGreaterThan(0);
    for (const token of tokens) {
      expect(token, `"${token}" is not a deck token`).toMatch(/^(?:ease|copper-\d{3}|neutral-\d{1,3}|gv-[\w-]+)$/);
    }
  });
});
