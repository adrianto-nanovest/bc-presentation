// MIDDLE-OUT · slide tests — BOTH poses, forward and backward, plus the pointer.
//
// ════════════════════════════════════════════════════════════════════════════
// REWRITTEN 2026-08-14, WITH THE SLIDE IT COVERS. The figure was three full-width text
// bands walked over FIVE poses; it is now three tier plates, a double-headed arrow and
// three approach cards, built inside ONE pose with the thesis on a second. So the old
// file's spine — a five-pose walk, one band's claims per pose, `isMiddleLit(pose)` —
// describes nothing that exists, and the tests that matter are different ones:
//
//   1. STILL NOT A THIRD LADDER. §6.6 refuses "Learn → Experiment → Build → Integrate →
//      Own" in as many words, and three stacked plates are one keystroke from being one.
//      Held four ways: no digit in any rendered string, no scale vocabulary (with the
//      regexes FIRED against the two slides that do own L1–L5 and P0–P3), equal geometry
//      on the two outer plates, and the middle plate's extra height DERIVED from the one
//      row of copy that earns it.
//   2. RANK IN THE RIGHT CHANNEL, AND IT SURVIVES THE POINTER. The middle row's
//      brightness is the argument. Spent as opacity it would collide with the build —
//      opacity on this stage is TIME — and spent as size it would be a scale. So rank is
//      asserted as CSS-var tokens on a known ramp, and every hover state is checked to
//      be DIMMER than the middle plate's resting state: a pointer may not promote a row.
//   3. THE ROOM IS TOP MANAGEMENT. This is the correction that motivated the rework's
//      copy pass, so it is pinned: the THIS ROOM tag renders inside the TOP plate, the
//      second person means that room everywhere it appears, and the middle plate is
//      described in the third person. A slide that flatters the middle in front of the
//      top is a slide about somebody who is not in the chairs.
//   4. THE POINTER PAIRS A PLATE WITH ITS CARD. The claim that the two are one tier is
//      made by alignment, which only a hover can prove is intentional — so hovering
//      either lights BOTH and touches no other tier.
//   5. NOT RE-SPENDING A NEIGHBOUR. C.1 is in the same run and the same content file;
//      B.1 owns the 70/30 and "not the tools"; B.2 owns "no rule to break".
//
// WHAT THIS FILE CANNOT PROVE. jsdom has no layout and no media queries: nothing here
// measures a pixel, no `var()` resolves, no keyframe runs and
// `prefers-reduced-motion: reduce` cannot really be toggled. Every geometric claim is
// asserted as the ONE NUMBER both sides read (`middle-out-geometry.ts`) or as an ORDER
// over those numbers, and the browser half — real wrap under both font faces, the painted
// ranking, the build actually animating, the two pulses looping, the hover in a real
// engine — is walked separately with Playwright.
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { restoreLocation } from "../harvest/deck-numbering";
import type { VariantId } from "@/deck-variants";
import {
  ShapeMiddleOut,
  shapeMiddleOutSlide,
} from "@/slides/leader-shape/shape-middle-out";
import { shapeMiddleOutContent } from "@/slides/leader-shape/content";
// THE NEIGHBOURS, AS MODULES — imported so the collision rule is checked against what
// those slides ACTUALLY say today rather than against a copy of their vocabulary kept
// here.
import { shapeOrgContent } from "@/slides/leader-shape/content";
import {
  gapHardestPartContent,
  gapLadderContent,
  gapNoSopContent,
} from "@/slides/leader-gap/content";
// THE TWO LADDERS THE GUARDRAIL PROTECTS, as live corpora — `gapLadderContent` owns
// L1–L5 and `mandatePhasesGatesContent` owns P0–P3. They are here to FIRE the scale
// regexes, so a pattern that matched nothing could not pass for a rule.
import { mandatePhasesGatesContent } from "@/slides/leader-mandate/content";
import {
  ACT_TEXT_WIDTH,
  ARROW_SPAN,
  BOTTOM_TIER_INDEX,
  CARD_INNER_WIDTH,
  CARD_LEFT,
  CARD_WIDTH,
  CHIPS_BUDGET_CHARS,
  CHIPS_TOP,
  CLAIM_BUDGET_CHARS,
  CLAIM_ROWS,
  CLAIM_TEXT_WIDTH,
  DOWN_HEAD_TOP,
  DOWN_SHAFT_TOP,
  EYEBROW_BASELINE_DROP,
  EYEBROW_BUDGET_CHARS,
  EYEBROW_HEIGHT,
  FIGURE_TOP,
  FLOW_LENGTH,
  FLOW_TRAVEL,
  GLOSS_BUDGET_CHARS,
  HEADLINE_BOTTOM,
  HEADLINE_BUDGET_CHARS,
  HEAD_HEIGHT,
  MIDDLE_PLATE_HEIGHT,
  MIDDLE_TIER_INDEX,
  NAME_ROW_BUDGET_CHARS,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  ORIGIN_DOT_SIZE,
  ORIGIN_DOT_TOP,
  ORIGIN_Y,
  PLATE_HEIGHT,
  PLATE_LEFT,
  PLATE_WIDTH,
  RAIL_LEFT,
  ROW_HEIGHT,
  SHAFT_HEIGHT,
  STAGE,
  THESIS_BUDGET_CHARS,
  THESIS_HEIGHT,
  THESIS_TOP,
  TIER_COUNT,
  TOP_TIER_INDEX,
  UP_HEAD_TOP,
  UP_SHAFT_TOP,
  VERDICT_BUDGET_CHARS,
  cardLabelTop,
  claimEyebrowTop,
  claimRowTop,
  plateCentreY,
  plateHeight,
  plateTop,
} from "@/slides/leader-shape/middle-out-geometry";
import {
  POSE,
  STEP_COUNT,
  THESIS_POSE,
  showsFigure,
  showsThesis,
} from "@/slides/leader-shape/middle-out-walk";
// The design system's own two ramps. Imported for their KEYS, never their hexes — so
// "brighter" is an ordering over a published scale and no hex is ever compared.
import { copper, neutral } from "@/design-system/colors";

const C = shapeMiddleOutContent;

/** Both poses, DERIVED — `[0 … STEP_COUNT - 1]`. Never a literal `[0, 1]`: a third pose
 *  grows `STEP_COUNT` and every "at every pose" test below has to grow with it. */
const POSES: readonly number[] = Array.from({ length: STEP_COUNT }, (_u, i) => i);

/** The three tier indices, in SPATIAL order, read off the geometry rather than written as
 *  0/1/2 — so "the row the argument is about" stays a derivation. */
const TOP = TOP_TIER_INDEX;
const MIDDLE = MIDDLE_TIER_INDEX;
const BOTTOM = BOTTOM_TIER_INDEX;

/**
 * The position this slide holds in the decks that will run it — a harness INPUT and not a
 * claim. `at` is required because unit tests resolve the default `general` deck, which
 * runs no leader slide at all; the composed describes at the bottom read the real value
 * off the real deck and pin only the letter and the tail position, never the number.
 */
const AT = { letter: "C", num: 4, sectionKey: "shape" } as const;

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
    <SlideHarness def={shapeMiddleOutSlide} at={AT}>
      <Nav />
      <ShapeMiddleOut />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

// ── the boxes ────────────────────────────────────────────────────────────────

/** The three plates and the three cards — the six boxes the pointer can reach. */
const PLATE_IDS = C.tiers.map((t) => `middle-out-plate-${t.id}`);
const CARD_IDS = C.tiers.map((t) => `middle-out-card-${t.id}`);

/**
 * Every testid this figure mounts, and the whole of it is on the stage at pose 0 — which
 * is the rework in one list. Only the thesis is gated.
 */
const FIGURE_IDS: readonly string[] = [
  ...PLATE_IDS,
  ...C.tiers.map((t) => `middle-out-plate-${t.id}-name`),
  "middle-out-plate-tag",
  "middle-out-plate-chips",
  ...C.tiers.flatMap((t) => [
    `middle-out-${t.id}-holds-eyebrow`,
    `middle-out-${t.id}-holds`,
    `middle-out-${t.id}-qualifier-eyebrow`,
    `middle-out-${t.id}-qualifier`,
  ]),
  "middle-out-origin-dot",
  "middle-out-shaft-up",
  "middle-out-shaft-down",
  "middle-out-flow-up",
  "middle-out-flow-down",
  "middle-out-head-up",
  "middle-out-head-down",
  "middle-out-act-up-label",
  "middle-out-act-up-gloss",
  "middle-out-act-down-label",
  "middle-out-act-down-gloss",
  ...CARD_IDS,
  ...C.tiers.map((t) => `middle-out-card-${t.id}-label`),
  ...C.tiers.map((t) => `middle-out-card-${t.id}-verdict`),
];

const THESIS_ID = "middle-out-thesis";
const EVERY_BOX: readonly string[] = [...FIGURE_IDS, THESIS_ID];

/** The boxes that carry no text of their own: the two shafts, the two pulses, the two
 *  heads, the origin dot, and each plate's and card's own rectangle — guardrail 1 says a
 *  tier carries its name and nothing beside it, so an empty rectangle is that rule as a
 *  fact rather than as a sentence. */
const TEXTLESS: ReadonlySet<string> = new Set([
  "middle-out-origin-dot",
  "middle-out-shaft-up",
  "middle-out-shaft-down",
  "middle-out-flow-up",
  "middle-out-flow-down",
  "middle-out-head-up",
  "middle-out-head-down",
  ...PLATE_IDS,
  ...CARD_IDS,
]);

const box = (id: string): HTMLElement => screen.getByTestId(id);
const px = (value: string): number => parseFloat(value);

// ── the copy, as one set of strings ──────────────────────────────────────────

/** Every string reachable from `value` — the walk, not a hand list, so a field added next
 *  month is inside every rule below the day it exists. It collects `id` fields too,
 *  deliberately: those reach the DOM as `data-testid`, and a borrowed image written into a
 *  hook is the same defect written somewhere less visible. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

const authoredStrings = (): string[] => walkStrings(C);
const c1Strings = (): string[] => walkStrings(shapeOrgContent);
const b1Strings = (): string[] => walkStrings(gapHardestPartContent);
const b2Strings = (): string[] => walkStrings(gapNoSopContent);

/**
 * THE TEN PROSE STRINGS, each with the `*Kw` sibling `content.ts` pairs it with: the
 * headline, the three tiers' `holds`, the three tiers' `qualifier`, the two glosses and
 * the thesis.
 */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ...C.tiers.flatMap(
    (tier) =>
      [
        [`${tier.id}.holds`, tier.holds, tier.holdsKw],
        [`${tier.id}.qualifier`, tier.qualifier, tier.qualifierKw],
      ] as const,
  ),
  ["upGloss", C.upGloss, C.upGlossKw],
  ["downGloss", C.downGloss, C.downGlossKw],
  ["thesis", C.thesis, C.thesisKw],
];

/** The MONO LABEL register — carries no `*Kw` and may not gain one. */
const LABELS: readonly string[] = [
  C.figLabel,
  C.roomTag,
  C.middleSubname,
  C.middleChips,
  C.upLabel,
  C.downLabel,
  ...C.tiers.map((t) => t.name),
  ...C.tiers.map((t) => t.approach),
  ...new Set(C.tiers.flatMap((t) => [t.holdsEyebrow, t.qualifierEyebrow])),
];

/** The CAPTION register — the three approach verdicts, which also carry no `*Kw`. */
const CAPTIONS: readonly string[] = C.tiers.map((t) => t.approachVerdict);

/** Everything the stage renders, minus the one element that legitimately prints a DERIVED
 *  figure reference. Stripped from a CLONE: React owns those nodes. */
function stageTextWithoutFigLabel(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

// ── the two ramps, so "brighter" is an ordering and not a vibe ────────────────
//
// `rampOf`, `tokenIn` and `brightnessOf` are lifted from `shape-agentic-org.test.tsx`,
// which argues all three at length: the ORDER comes from the scale (a higher key is a
// darker stop, so sorting the exported keys descending IS luminance order) while the
// TIERS come from `src/design-system/colors.ts`, so no hex is ever compared. `tokenIn`
// THROWS on a declaration with no `var(--…)` in it, which is how "CSS vars only, no hex
// and no rgba() literal" is enforced rather than described.

const rampOf = (scale: Record<number | string, string>, hue: string): readonly string[] =>
  Object.keys(scale)
    .map(Number)
    .sort((a, b) => b - a)
    .map((t) => `${hue}-${t}`);

const COPPER_RAMP: readonly string[] = rampOf(copper, "copper");
const NEUTRAL_RAMP: readonly string[] = rampOf(neutral, "neutral");

function tokenIn(declaration: string, what: string): string {
  const match = /var\(--([a-z]+-\d+)\)/.exec(declaration);
  if (!match) {
    throw new Error(
      `${what}: "${declaration}" names no var(--…) token — CSS vars only on this slide, ` +
        `so a hex or an rgba() literal here is the bug.`,
    );
  }
  return match[1];
}

/** A token's place on its own ramp — a higher `rung` is BRIGHTER. Used for the claims that
 *  stay inside one ramp; the cross-ramp ones go through {@link luminanceOf}. */
function brightnessOf(token: string, what: string): { family: string; rung: number } {
  const inCopper = COPPER_RAMP.indexOf(token);
  if (inCopper >= 0) return { family: "copper", rung: inCopper };
  const inNeutral = NEUTRAL_RAMP.indexOf(token);
  if (inNeutral >= 0) return { family: "neutral", rung: inNeutral };
  throw new Error(
    `${what}: "--${token}" is on neither the copper nor the neutral ladder, so nothing ` +
      `here can say whether it is brighter or darker than the resting tier.`,
  );
}

const rung = (declaration: string, what: string) =>
  brightnessOf(tokenIn(declaration, what), what);

/**
 * A token's WCAG relative luminance, computed from the hex the design system publishes for
 * it.
 *
 * IT EXISTS BECAUSE ONE OF THIS FIGURE'S RANK MOVES CROSSES THE TWO RAMPS. A resting plate
 * has the stage's own `--neutral-900` ground and the lit plate GAINS `--copper-900` — the
 * component argues for that in as many words (the fill channel is left unspent at rest so
 * the middle plate can gain a ground rather than change one) — and ramp order cannot compare
 * two different ramps. Ramp INDEX is still used wherever both sides are on one ramp, because
 * it is the stronger check there: it holds even if a hex is retuned.
 *
 * THE HEX IS READ, NEVER WRITTEN. `src/design-system/colors.ts` stays the single source of
 * truth, so a retuned token moves this number with it.
 */
function luminanceOf(token: string, what: string): number {
  const [family, stop] = token.split("-");
  // Indexed as a plain record: the two scales are `as const` objects with numeric keys, and
  // the token's stop arrives here as a string.
  const scale: Record<string, string> | null =
    family === "copper" ? copper : family === "neutral" ? neutral : null;
  const hex = scale?.[stop];
  if (typeof hex !== "string" || !/^#[0-9a-f]{6}$/i.test(hex)) {
    throw new Error(`${what}: no hex in the design system for "--${token}"`);
  }
  const channel = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const [r, g, bl] = [1, 3, 5].map((i) => channel(parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
}

const lumen = (declaration: string, what: string) =>
  luminanceOf(tokenIn(declaration, what), what);

/** One element's inline declarations, as a map — parsed out of `cssText` because the claim
 *  is about what the renderer WROTE: `border: 1px solid var(--copper-700)` is one
 *  declaration and jsdom reports no `borderColor` for it. */
function declarations(el: HTMLElement): Map<string, string> {
  const out = new Map<string, string>();
  for (const chunk of el.style.cssText.split(";")) {
    const at = chunk.indexOf(":");
    if (at < 0) continue;
    out.set(chunk.slice(0, at).trim(), chunk.slice(at + 1).trim());
  }
  return out;
}

/** A tier's whole visual signature — the plate, its name, its two rows, the card, its
 *  label and its verdict, as one comparable string. The unit both the no-subtraction and
 *  the pointer-pairing claims are made in. */
function tierSignature(tier: (typeof C.tiers)[number]): string {
  return [
    `middle-out-plate-${tier.id}`,
    `middle-out-plate-${tier.id}-name`,
    `middle-out-${tier.id}-holds`,
    `middle-out-${tier.id}-qualifier`,
    `middle-out-card-${tier.id}`,
    `middle-out-card-${tier.id}-label`,
    `middle-out-card-${tier.id}-verdict`,
  ]
    .map((id) => `${id}=${box(id).outerHTML}`)
    .join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// the slide def and the walk
// ─────────────────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, TWO derived steps, canonical on the thesis", () => {
    expect(shapeMiddleOutSlide.id).toBe("shape-middle-out");
    const basename = "src/slides/leader-shape/shape-middle-out.tsx"
      .split("/")
      .pop()!
      .replace(/\.tsx$/, "");
    expect(shapeMiddleOutSlide.id).toBe(basename);

    // TWO, AND NEVER AS A LITERAL. `steps` is asserted against the walk's own derivation
    // and that derivation is unfolded to its source: the figure, then the sentence. It was
    // FIVE before the rework, which is exactly why it stays imported.
    expect(shapeMiddleOutSlide.steps).toBe(STEP_COUNT);
    expect(STEP_COUNT).toBe(THESIS_POSE + 1);
    expect(THESIS_POSE).toBe(POSE.THESIS);
    expect(POSE.FIGURE).toBe(0);
    expect(shapeMiddleOutSlide.steps).toBe(2);

    // THE CANONICAL POSE IS THE THESIS'S — the exports print `canonicalPose` and nothing
    // else, and pose 0 would export a figure that argues the middle is the lever without
    // ever saying what the room is supposed to do about it.
    expect(shapeMiddleOutSlide.canonicalPose).toBe(THESIS_POSE);
    expect(shapeMiddleOutSlide.canonicalPose).toBe(shapeMiddleOutSlide.steps - 1);
    expect(showsThesis(shapeMiddleOutSlide.canonicalPose!)).toBe(true);
    expect(showsFigure()).toBe(true);

    expect(shapeMiddleOutSlide.animationMode).toBe("step-reveal");
    expect(shapeMiddleOutSlide.surface).toBe("dark");
    expect(shapeMiddleOutSlide.sectionKey).toBe("shape");
  });
});

describe("the pose walk", () => {
  test("the figure stands at every pose and the thesis lands on the last", () => {
    expect(showsThesis(POSE.FIGURE)).toBe(false);
    expect(showsThesis(POSE.THESIS)).toBe(true);
    // TOTAL, AND MONOTONE. A pose past the end keeps the thesis up — the last pose of a
    // slide should be the pose that survives being over-shot — and a negative one has
    // nothing on it.
    expect(showsThesis(STEP_COUNT)).toBe(true);
    expect(showsThesis(99)).toBe(true);
    expect(showsThesis(-1)).toBe(false);
    expect(showsThesis(0.5)).toBe(false);
    expect(() => showsThesis(NaN)).not.toThrow();
  });

  test("nothing that has arrived ever leaves — walked forward, then back", () => {
    const { unmount } = renderSlide();
    // Forward: the figure is complete at pose 0, the thesis joins it at pose 1.
    for (const id of FIGURE_IDS) expect(box(id), `${id} · pose 0`).toBeInTheDocument();
    expect(box(THESIS_ID).classList.contains("on"), "thesis · pose 0").toBe(false);
    goToPose(THESIS_POSE);
    for (const id of FIGURE_IDS) expect(box(id), `${id} · pose 1`).toBeInTheDocument();
    expect(box(THESIS_ID).classList.contains("on"), "thesis · pose 1").toBe(true);
    // …and back, which asks the same question of a smaller number.
    goToPose(POSE.FIGURE);
    for (const id of FIGURE_IDS) expect(box(id), `${id} · back at 0`).toBeInTheDocument();
    expect(box(THESIS_ID).classList.contains("on"), "thesis · back at 0").toBe(false);
    unmount();
  });

  test("every box is mounted at both poses — nothing is swapped", () => {
    for (const pose of POSES) {
      const { unmount } = renderSlide(pose);
      for (const id of EVERY_BOX) {
        expect(box(id), `${id} at pose ${pose}`).toBeInTheDocument();
      }
      // …and the census is exhaustive in the other direction: no box the list does not
      // name, so a new element has to be declared here before it can render.
      const mounted = [...document.querySelectorAll("[data-testid^='middle-out-']")].map(
        (el) => (el as HTMLElement).dataset.testid!,
      );
      expect(new Set(mounted)).toEqual(new Set(EVERY_BOX));
      unmount();
    }
  });

  test("the figure carries a BUILD, not a walk: one keyframe and one delay per box", () => {
    const { unmount } = renderSlide();
    const seen: number[] = [];
    for (const id of FIGURE_IDS) {
      const el = box(id);
      // EVERY FIGURE BOX ANIMATES ON MOUNT, through `middle-out.css` and not `.fade` —
      // which is the whole reason the slide needs two poses instead of five.
      expect(el.className, `${id} · entrance class`).toMatch(/\bmo-[a-z-]+\b/);
      expect(el.classList.contains("fade"), `${id} is not a .fade box`).toBe(false);
      const delay = px(el.style.animationDelay);
      expect(Number.isFinite(delay), `${id} · animationDelay`).toBe(true);
      expect(delay, `${id} · delay is positive`).toBeGreaterThan(0);
      seen.push(delay);
    }
    // THE BUILD IS ORDERED AND FINITE: the plates open it and the arrowheads close it,
    // and nothing waits longer than a second and a half for its own arrival.
    expect(Math.min(...seen)).toBe(px(box(PLATE_IDS[TOP]).style.animationDelay));
    expect(Math.max(...seen)).toBe(px(box("middle-out-head-up").style.animationDelay));
    expect(Math.max(...seen)).toBeLessThanOrEqual(1500);

    // THE TWO SHAFTS ARE ONE ARRIVAL. Staggering them would say "first this, then that"
    // about the one pair of marks the no-new-ladder guardrail exists to protect.
    expect(box("middle-out-shaft-up").style.animationDelay).toBe(
      box("middle-out-shaft-down").style.animationDelay,
    );
    expect(box("middle-out-flow-up").style.animationDelay).toBe(
      box("middle-out-flow-down").style.animationDelay,
    );
    // …and each head lands after its own shaft has finished drawing.
    expect(px(box("middle-out-head-up").style.animationDelay)).toBeGreaterThan(
      px(box("middle-out-shaft-up").style.animationDelay),
    );

    // THE THESIS IS THE ONE `Reveal`, because it is the one box with a real pose
    // transition to make.
    expect(box(THESIS_ID).classList.contains("fade")).toBe(true);
    unmount();
  });

  test("the two pulses are the only looping marks, and they run outward", () => {
    const { unmount } = renderSlide();
    expect(box("middle-out-flow-up").className).toContain("mo-flow-up");
    expect(box("middle-out-flow-down").className).toContain("mo-flow-down");
    // THE TRAVEL IS A COORDINATE AND COMES FROM THE GEOMETRY, never from the stylesheet:
    // `FLOW_TRAVEL` is `SHAFT_HEIGHT − FLOW_LENGTH`, so a pulse starts flush with the
    // origin dot and stops flush against the arrowhead.
    for (const id of ["middle-out-flow-up", "middle-out-flow-down"]) {
      expect(box(id).style.getPropertyValue("--mo-travel"), id).toBe(`${FLOW_TRAVEL}px`);
      expect(px(box(id).style.height), id).toBe(FLOW_LENGTH);
    }
    expect(FLOW_TRAVEL).toBe(SHAFT_HEIGHT - FLOW_LENGTH);
    expect(FLOW_TRAVEL).toBeGreaterThan(0);
    // NO OTHER BOX LOOPS. Every other class in the figure is a one-shot entrance.
    const looping = FIGURE_IDS.filter((id) => /mo-flow-/.test(box(id).className));
    expect(looping).toEqual(["middle-out-flow-up", "middle-out-flow-down"]);
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the middle-out claim
// ─────────────────────────────────────────────────────────────────────────────

describe("the middle-out claim, argued over the whole figure", () => {
  test("the three tiers are the organisation, named in the room's own words", () => {
    expect(C.tiers.map((t) => t.name)).toEqual([
      "TOP MANAGEMENT",
      "MIDDLE MANAGEMENT",
      "THE TEAMS",
    ]);
    // NAMED AND NEVER INDEXED — guardrail 1. No tier carries a number, an ordinal or a
    // letter, and the name is its whole identity.
    for (const tier of C.tiers) {
      expect(tier.name, tier.id).not.toMatch(/\d/);
      expect(tier.name, tier.id).not.toMatch(/\b(first|second|third|one|two|three)\b/i);
    }
  });

  test("the outer tiers each have a CANNOT and the middle has none", () => {
    const eyebrows = C.tiers.map((t) => t.qualifierEyebrow);
    expect(eyebrows[TOP]).toBe("CANNOT");
    expect(eyebrows[BOTTOM]).toBe("CANNOT");
    expect(eyebrows[MIDDLE]).toBe("ALONE");
    // THE ARGUMENT DRAWN IN CHROME: by the time the room reaches the middle plate it has
    // learned that every tier has a CANNOT, and the middle's never arrives.
    expect(eyebrows.filter((e) => e === "CANNOT")).toHaveLength(2);
    // …and all three open on the same word, which is the chart's spine.
    expect(new Set(C.tiers.map((t) => t.holdsEyebrow)).size).toBe(1);
  });

  test("the top plate's CANNOT names the method gap, not only the visibility one", () => {
    const top = C.tiers[TOP];
    expect(top.qualifier).toBe("See your teams at work — or say how AI should change it.");
    // TWO LIMITS IN ONE LINE. The room concedes the first before it is said; the second is
    // the one the rest of the figure is about — a mandate can ask for AI and fund it, and
    // cannot supply the method.
    expect(top.qualifier).toMatch(/\bSee your teams at work\b/);
    expect(top.qualifier).toMatch(/\bhow AI should change it\b/);
    expect(top.qualifierKw).toEqual(["how AI should change it"]);
    // AND IT IS A STRUCTURAL FACT, NOT A GRIEVANCE: no word here blames the room.
    expect(top.qualifier).not.toMatch(/\b(fail|ignor|out of touch|never|refus)\w*/i);
  });

  test("the middle tier holds BOTH of the things the outer tiers are missing", () => {
    const middle = C.tiers[MIDDLE];
    expect(middle.holds).toMatch(/^Both\b/);
    expect(middle.holdsKw).toEqual(["near enough", "senior enough"]);
    // The two halves answer the two outer limits, in the order the plates state them:
    // near enough to SEE (the top's), senior enough to CHANGE (the teams').
    expect(C.tiers[TOP].qualifier).toMatch(/\bSee\b/);
    expect(C.tiers[BOTTOM].qualifier).toMatch(/\bAuthorise\b/);
    // …and "change it" lands on the same words the top plate uses for what it cannot say,
    // which is the answer arriving in the objection's own vocabulary.
    expect(C.tiers[TOP].qualifier).toMatch(/\bchange it\b/);
    expect(middle.holds).toMatch(/\bchange it\b/);
    expect(middle.holds.indexOf("near enough")).toBeLessThan(
      middle.holds.indexOf("senior enough"),
    );
    // AND ONE CLAIM NEITHER OTHER TIER CAN MAKE — being copied, which is not a position
    // and cannot be delegated.
    expect(middle.qualifier).toMatch(/\bcopy\b/);
  });

  test("the three approaches are this slide's own vocabulary, one per tier", () => {
    expect(C.tiers.map((t) => t.approach)).toEqual([
      "TOP-DOWN",
      "MIDDLE-OUT",
      "BOTTOM-UP",
    ]);
    // THE HEADLINE REFUSES ONE OF THEM BY NAME and the figure convicts it in four words.
    expect(C.headline).toContain("top-down");
    expect(C.tiers[TOP].approachVerdict).toBe("Generic support. No depth.");
    expect(C.tiers[BOTTOM].approachVerdict).toBe("Deep knowledge. No authority.");
    // THE MIDDLE'S IS THE ONLY VERDICT THAT NAMES NO ABSENCE — the two outer ones are
    // "one thing it has, one thing it lacks", and the shape of the sentence is what marks
    // the middle out.
    expect(C.tiers[MIDDLE].approachVerdict).not.toMatch(/\bNo\b/);
    expect(C.tiers[TOP].approachVerdict).toMatch(/\bNo\b/);
    expect(C.tiers[BOTTOM].approachVerdict).toMatch(/\bNo\b/);
    // AND THE TRIO IS COMPLETE: middle-out is only the answer if its two alternatives are
    // both on the stage.
    expect(new Set(C.tiers.map((t) => t.approach)).size).toBe(TIER_COUNT);
  });

  test("the two acts leave the middle in both directions, and say so in words", () => {
    expect(C.upLabel).toBe("INFLUENCE UP");
    expect(C.downLabel).toBe("DRIVE DOWN");
    // A VERB PHRASE AND NOT A COMPASS BEARING: "UPWARD" as a heading is a scale's axis
    // label, and the arrow beside it is what says which way it runs.
    for (const label of [C.upLabel, C.downLabel]) {
      expect(label).not.toMatch(/^(UPWARD|DOWNWARD)$/);
    }
    // The downward act picks the top plate's own keyword back up by name.
    expect(C.tiers[TOP].holdsKw).toEqual(["The mandate"]);
    expect(C.downGloss).toMatch(/\byour mandate\b/i);
    // …and the upward act ends where the room sits.
    expect(C.upGloss).toMatch(/\bthis room\b/);
    // BOTH ACTS TAKE THE MIDDLE AS THEIR SUBJECT, in the same word — which is the figure's
    // claim as a sentence, and what the shipped "X becomes Y" pair hid behind a copula. The
    // arrow says which way; the line says what the act consists of.
    for (const gloss of [C.upGloss, C.downGloss]) {
      expect(gloss, gloss).toMatch(/^They\b/);
      expect(gloss, gloss).not.toMatch(/\bbecomes\b/);
    }
    // AND THE WEEKDAY MOTIF IS GONE FROM THE WHOLE STAGE. It stood in three places for one
    // idea — an ordinary working day — and a room had to decode it before it could read any
    // of them. `leader-mandate` keeps its own named day.
    for (const copy of authoredStrings()) {
      expect(copy, `a weekday in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(Monday|Tuesday|Wednesday|Thursday|Friday)\b/,
      );
    }
  });

  test("the thesis is one clause per party, in the order they act", () => {
    expect(C.thesis).toBe(
      "I build the foundation. You empower them. They drive the adoption.",
    );
    // THREE CLAUSES, AND EACH ONE IS A PLATE — the presenter, the top plate's single act,
    // the middle plate doing the one thing the teams cannot authorise.
    expect(C.thesis.split(". ")).toHaveLength(3);
    // THE FIRST PERSON IS THE PRESENTER'S AND IT APPEARS NOWHERE ELSE ON THE STAGE.
    const firstPerson = authoredStrings().filter((s) => /\b(I|me|my)\b/.test(s));
    expect(firstPerson).toEqual([C.thesis]);
    // "the foundation" CARRIES THE REFUSAL. The shipped line spent a whole sentence — "I
    // cannot make them use it" — on a limit one noun states: a foundation is what somebody
    // else builds ON, and the two clauses after it say who does the rest.
    expect(C.thesis).toMatch(/^I build the foundation\b/);
    // AND THE LAST CLAUSE IS THE RAIL'S OWN DOWNWARD VERB, so the sentence and the figure
    // name the same act.
    expect(C.downLabel).toMatch(/\bDRIVE\b/);
    expect(C.thesis).toMatch(/\bdrive\b/);
    // AND IT MAY NOT CONTRADICT THE HEADLINE OVER IT. "reaches them through you", said to
    // a room of top management, claims adoption travels through the people holding the
    // mandate — which is top-down, which is what the headline refuses. So the handover is
    // pointed at the act this room can actually perform.
    expect(C.thesis).not.toMatch(/through you\b/);
    expect(C.thesisKw).toEqual(["You empower them"]);
    expect(C.thesis).toContain(C.thesisKw[0]);
    // …and it names no slide, no section and nothing after it.
    expect(C.thesis).not.toMatch(/\b(next|following|slide|section|deck)\b/i);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the room is TOP MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

describe("the addressing sits on the tier the room is actually in", () => {
  test("THIS ROOM prints inside the TOP plate, level with its name", () => {
    const { unmount } = renderSlide();
    const tag = box("middle-out-plate-tag");
    expect(tag.textContent).toBe(C.roomTag);
    expect(C.roomTag).toBe("THIS ROOM");
    // LEVEL WITH THE TOP PLATE'S NAME ROW, and right-aligned inside that plate's own
    // measure — the position IS the addressing.
    expect(px(tag.style.top)).toBe(px(box(`middle-out-plate-${C.tiers[TOP].id}-name`).style.top));
    expect(tag.style.textAlign).toBe("right");
    expect(px(tag.style.top)).toBeGreaterThan(plateTop(TOP));
    expect(px(tag.style.top)).toBeLessThan(plateTop(TOP) + plateHeight(TOP));
    // AND NOT INSIDE THE MIDDLE PLATE, which is where it was drafted and where it would
    // flatter people who are not in the chairs.
    expect(px(tag.style.top)).toBeLessThan(plateTop(MIDDLE));
    unmount();
  });

  test("the standing kicker is gone — no second title under the headline", () => {
    const { container, unmount } = renderSlide();
    // The shipped stage put a mono line at y=134, 12px under a 40px display face. Nothing
    // renders between the headline row and the figure now.
    expect(stageTextWithoutFigLabel(container)).not.toMatch(/THE MIDDLE IS THIS ROOM/i);
    expect(walkStrings(C).some((s) => /THE MIDDLE IS/i.test(s))).toBe(false);
    const tops = EVERY_BOX.map((id) => px(box(id).style.top)).filter(Number.isFinite);
    expect(Math.min(...tops)).toBeGreaterThanOrEqual(FIGURE_TOP);
    // …and the figure starts a clear 38px under the headline row.
    expect(FIGURE_TOP - HEADLINE_BOTTOM).toBe(38);
    unmount();
  });

  test("the second person means the ROOM, and the middle tier is third person", () => {
    // `your` ON THE TOP AND MIDDLE PLATES AND IN THE DOWNWARD ACT: the room's teams, the
    // room's people, the room's mandate, the room's ambassadors.
    expect(C.tiers[TOP].qualifier).toMatch(/\byour teams\b/);
    expect(C.tiers[MIDDLE].qualifier).toMatch(/\byour people\b/);
    expect(C.downGloss).toMatch(/\byour mandate\b/i);
    expect(C.middleSubname).toBe("YOUR AI AMBASSADORS");
    // AND THE MIDDLE PLATE MAY NOT SAY THE ROOM IS THE ONE BEING COPIED. "they watched
    // YOU do it" was the drafted line and it addresses the wrong chair.
    expect(C.tiers[MIDDLE].qualifier).not.toMatch(/\byou\b/);
    expect(C.tiers[MIDDLE].qualifier).toMatch(/\bthey watch it work\b/);
    // NOR MAY THE UPWARD ACT SEND ANYTHING "ABOVE" THE ROOM, which is what it said while
    // the audience was assumed to be the middle.
    expect(C.upGloss).not.toMatch(/above you/i);
  });

  test("the champions are named beside the middle plate, inside its name row", () => {
    const { unmount } = renderSlide();
    const name = box(`middle-out-plate-${C.tiers[MIDDLE].id}-name`);
    expect(name.textContent).toContain(C.tiers[MIDDLE].name);
    expect(name.textContent).toContain(C.middleSubname);
    // The two outer plates carry their name and nothing else.
    for (const i of [TOP, BOTTOM]) {
      const el = box(`middle-out-plate-${C.tiers[i].id}-name`);
      expect(el.textContent).toBe(C.tiers[i].name);
    }
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · no new ladder
// ─────────────────────────────────────────────────────────────────────────────

/** The scale vocabulary §6.6 refuses, and the two slides that own the two ladders it is
 *  protecting. Each pattern is fired against its owner's corpus below, so a regex that
 *  matched nothing could not pass for a rule. */
const SCALE_WORDS: ReadonlyArray<readonly [string, RegExp]> = [
  ["level", /\blevels?\b/i],
  ["maturity", /\bmaturit\w*\b/i],
  ["rung", /\brungs?\b/i],
  ["tier", /\btiers?\b/i],
  ["ladder", /\bladders?\b/i],
  ["phase", /\bphases?\b/i],
  ["stage", /\bstages?\b/i],
  ["step", /\bsteps?\b/i],
  ["L1–L5", /\bL[1-5]\b/],
  ["P0–P3", /\bP[0-3]\b/],
];

describe("no new ladder — §6.6's third-ladder refusal, held by word and by geometry", () => {
  test("no digit reaches the stage, in any rendered string", () => {
    for (const copy of authoredStrings()) {
      expect(copy, `a digit in ${JSON.stringify(copy)}`).not.toMatch(/\d/);
    }
    const { container, unmount } = renderSlide(THESIS_POSE);
    // The fig label is stripped: the letter and number in front of it are the COMPOSER's
    // (§3.5) and are authored nowhere under this directory.
    expect(stageTextWithoutFigLabel(container)).not.toMatch(/\d/);
    unmount();
  });

  test("no scale vocabulary reaches the stage — and every pattern fires elsewhere", () => {
    const { container, unmount } = renderSlide(THESIS_POSE);
    const stage = stageTextWithoutFigLabel(container);
    for (const [name, pattern] of SCALE_WORDS) {
      for (const copy of authoredStrings()) {
        expect(pattern.test(copy), `"${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `"${name}" reached the stage`).toBe(false);
    }
    unmount();

    // THE POSITIVE CONTROL, and it is what makes the rule above non-vacuous: the words
    // exist in this deck, on the two slides that are allowed them.
    const ladders = [
      ...walkStrings(gapLadderContent),
      ...walkStrings(mandatePhasesGatesContent),
    ];
    for (const [name, pattern] of [
      SCALE_WORDS[0], // level    → B.4's L1–L5
      SCALE_WORDS[5], // phase    → K.2's P0–P3
      SCALE_WORDS[8], // L1–L5
      SCALE_WORDS[9], // P0–P3
    ]) {
      expect(
        ladders.some((copy) => pattern.test(copy)),
        `"${name}" is supposed to be another slide's, but no ladder slide prints it`,
      ).toBe(true);
    }
    // AND THE WORD `tier` IS FORBIDDEN IN COPY WHILE THE CODE USES IT FREELY — what the
    // room reads is the rule, and an identifier is not read out loud.
    expect(C.tiers.length).toBe(TIER_COUNT);
  });

  test("the two outer plates are identical to the pixel, and share one left edge", () => {
    // ONE LEFT EDGE, ONE WIDTH, ONE INTERNAL LAYOUT. A plate cannot be indented, inset or
    // narrowed to rank it.
    expect(plateHeight(TOP)).toBe(plateHeight(BOTTOM));
    expect(plateHeight(TOP)).toBe(PLATE_HEIGHT);
    for (const i of [TOP, MIDDLE, BOTTOM]) {
      expect(claimRowTop(i, 0) - plateTop(i), `plate ${i} · first row inset`).toBe(42);
      expect(claimRowTop(i, 1) - claimRowTop(i, 0), `plate ${i} · row pitch`).toBe(32);
    }
    const { unmount } = renderSlide();
    for (const id of [...PLATE_IDS, ...CARD_IDS]) {
      const el = box(id);
      expect(px(el.style.left) + px(el.style.width), `${id} · right edge`).toBeLessThanOrEqual(
        STAGE.width,
      );
    }
    for (const i of [TOP, MIDDLE, BOTTOM]) {
      expect(px(box(PLATE_IDS[i]).style.left), `plate ${i}`).toBe(PLATE_LEFT);
      expect(px(box(PLATE_IDS[i]).style.width), `plate ${i}`).toBe(PLATE_WIDTH);
      expect(px(box(CARD_IDS[i]).style.left), `card ${i}`).toBe(CARD_LEFT);
      expect(px(box(CARD_IDS[i]).style.width), `card ${i}`).toBe(CARD_WIDTH);
    }
    unmount();
  });

  test("the middle plate's extra height is EARNED by the row only it has", () => {
    // NOT MONOTONIC, SO NOT A SCALE: `top < middle > bottom`.
    expect(MIDDLE_PLATE_HEIGHT).toBeGreaterThan(PLATE_HEIGHT);
    expect(plateHeight(MIDDLE)).toBe(MIDDLE_PLATE_HEIGHT);
    expect(plateHeight(TOP)).toBe(plateHeight(BOTTOM));
    // AND IT IS EXACTLY ONE MONO ROW PLUS ITS GAP — derived from the chips row's own
    // registers, so deleting the string re-cuts all three plates to one height.
    expect(MIDDLE_PLATE_HEIGHT - PLATE_HEIGHT).toBe(28);
    const { unmount } = renderSlide();
    const chips = box("middle-out-plate-chips");
    expect(chips.textContent).toBe(C.middleChips);
    // The row lives INSIDE the plate it grew, under that plate's last claim row.
    expect(px(chips.style.top)).toBe(CHIPS_TOP);
    expect(CHIPS_TOP).toBeGreaterThan(claimRowTop(MIDDLE, CLAIM_ROWS - 1));
    expect(CHIPS_TOP + px(chips.style.height)).toBeLessThan(
      plateTop(MIDDLE) + plateHeight(MIDDLE),
    );
    // …and no other plate has one.
    expect(document.querySelectorAll("[data-testid='middle-out-plate-chips']")).toHaveLength(1);
    unmount();
  });

  test("the rail is one double-headed axis with no stops on it", () => {
    // THE MIDDLE INDEX IS DERIVED AND MUST STAY A WHOLE NUMBER: with four tiers it is 1.5,
    // which is not a row.
    expect(Number.isInteger(MIDDLE_TIER_INDEX)).toBe(true);
    expect(MIDDLE_TIER_INDEX).toBe((TIER_COUNT - 1) / 2);
    // BOTH HALVES ARE THE SAME LENGTH, and they meet on the middle plate's centre line.
    expect(ORIGIN_Y).toBe(plateCentreY(MIDDLE));
    expect(ARROW_SPAN).toBe(ORIGIN_Y - plateCentreY(TOP));
    expect(plateCentreY(BOTTOM) - ORIGIN_Y).toBe(ARROW_SPAN);
    expect(UP_SHAFT_TOP + SHAFT_HEIGHT).toBe(ORIGIN_Y);
    expect(DOWN_SHAFT_TOP).toBe(ORIGIN_Y);
    // EACH HEAD'S TIP LANDS ON THE PLATE IT REACHES.
    expect(UP_HEAD_TOP).toBe(plateCentreY(TOP));
    expect(DOWN_HEAD_TOP + HEAD_HEIGHT).toBe(plateCentreY(BOTTOM));

    const { unmount } = renderSlide();
    // ONE x FOR EVERY MARK ON THE RAIL — the shafts, the pulses, the heads and the dot are
    // centred on one axis, so the eye reads one line and not two.
    const centres = [
      "middle-out-shaft-up",
      "middle-out-shaft-down",
      "middle-out-flow-up",
      "middle-out-flow-down",
      "middle-out-head-up",
      "middle-out-head-down",
      "middle-out-origin-dot",
    ].map((id) => {
      const el = box(id);
      return px(el.style.left) + px(el.style.width) / 2;
    });
    expect(new Set(centres).size, "every rail mark on one axis").toBe(1);
    // …and the whole rail sits clear of the plates, between them and the cards.
    for (const c of centres) {
      expect(c).toBeGreaterThan(PLATE_LEFT + PLATE_WIDTH);
      expect(c).toBeLessThan(CARD_LEFT);
    }
    expect(RAIL_LEFT).toBe(PLATE_LEFT + PLATE_WIDTH);

    // THE ONLY MARK BETWEEN THE TWO HEADS IS THE ORIGIN — one dot, on the middle plate's
    // centre line. A second and third would be a scale with three stops on it.
    const dot = box("middle-out-origin-dot");
    expect(px(dot.style.top) + px(dot.style.height) / 2).toBe(ORIGIN_Y);
    expect(ORIGIN_DOT_TOP).toBe(ORIGIN_Y - ORIGIN_DOT_SIZE / 2);
    expect(dot.style.borderRadius).toBe("50%");
    // NO HORIZONTAL BAR — the elbow that joined two offset shafts was this figure's first
    // cut and it read as a dimension line, which says "these two are one measurement"
    // rather than "two acts leave one place". It was 16×4; the marks that remain are two
    // 4×132 shafts, two 4×48 pulses, a 10×10 dot and two 16×12 heads. A HEAD is wider than
    // it is tall on purpose (16×16 reads as a play button), so the test is not "nothing is
    // wider than tall" — it is that no mark is wide AND thin, which is the only shape a bar
    // can have.
    const bars = FIGURE_IDS.filter((id) => {
      if (!TEXTLESS.has(id) || PLATE_IDS.includes(id) || CARD_IDS.includes(id)) return false;
      const el = box(id);
      return px(el.style.width) >= 3 * px(el.style.height);
    });
    expect(bars, "no wide, thin mark on the rail").toEqual([]);
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the rank, and the pointer
// ─────────────────────────────────────────────────────────────────────────────

describe("the middle row is ranked in colour, and the pointer cannot promote another", () => {
  test("the middle plate and its card are the lit pair, and they are the only ones", () => {
    const { unmount } = renderSlide();
    for (const [i, tier] of C.tiers.entries()) {
      const lit = i === MIDDLE ? "true" : "false";
      expect(box(`middle-out-plate-${tier.id}`).dataset.lit, tier.id).toBe(lit);
      expect(box(`middle-out-card-${tier.id}`).dataset.lit, tier.id).toBe(lit);
    }
    expect(
      document.querySelectorAll("[data-lit='true']").length,
      "exactly one plate and one card",
    ).toBe(2);
    unmount();
  });

  test("every lit value is BRIGHTER than the resting one, and none is a subtraction", () => {
    const { unmount } = renderSlide();
    const plate = (i: number) => declarations(box(PLATE_IDS[i]));
    const name = (i: number) => declarations(box(`middle-out-plate-${C.tiers[i].id}-name`));
    const card = (i: number) => declarations(box(CARD_IDS[i]));
    const verdict = (i: number) =>
      declarations(box(`middle-out-card-${C.tiers[i].id}-verdict`));

    // BRIGHTER IS ASSERTED TWO WAYS, and which one applies is a property of the channel:
    // border and text stay on one ramp, so ramp INDEX is used (it survives a retuned hex);
    // the GROUND crosses ramps by design — a resting plate has the stage's own neutral and
    // the lit one GAINS a copper — so that one is compared by computed luminance.
    const brighter = (litDecl: string, restDecl: string, what: string) => {
      const a = rung(litDecl, `${what} · lit`);
      const b = rung(restDecl, `${what} · rest`);
      expect(a.family, `${what} · same ramp`).toBe(b.family);
      expect(a.rung, `${what} · lit is brighter`).toBeGreaterThan(b.rung);
    };
    const brighterAcrossRamps = (litDecl: string, restDecl: string, what: string) => {
      expect(
        lumen(litDecl, `${what} · lit`),
        `${what} · lit is brighter`,
      ).toBeGreaterThan(lumen(restDecl, `${what} · rest`));
    };

    brighter(plate(MIDDLE).get("border")!, plate(TOP).get("border")!, "plate border");
    brighterAcrossRamps(
      plate(MIDDLE).get("background-color")!,
      plate(TOP).get("background-color")!,
      "plate ground",
    );
    brighter(name(MIDDLE).get("color")!, name(TOP).get("color")!, "plate name");
    brighter(card(MIDDLE).get("border")!, card(TOP).get("border")!, "card border");
    brighter(verdict(MIDDLE).get("color")!, verdict(TOP).get("color")!, "card verdict");

    // THE TWO OUTER TIERS ARE IDENTICAL TO EACH OTHER: the rank is about the middle row,
    // not about the top of the chart against the bottom of it.
    expect(plate(TOP).get("border")).toBe(plate(BOTTOM).get("border"));
    expect(plate(TOP).get("background-color")).toBe(plate(BOTTOM).get("background-color"));
    expect(name(TOP).get("color")).toBe(name(BOTTOM).get("color"));

    // AND RANK IS NEVER SPENT IN THE OPACITY CHANNEL — opacity on this stage is TIME, and
    // every plate arrives in one build.
    for (const id of [...PLATE_IDS, ...CARD_IDS]) {
      expect(declarations(box(id)).has("opacity"), `${id} · no inline opacity`).toBe(false);
    }
    unmount();
  });

  test("the two outer tiers are byte-identical at both poses", () => {
    const { unmount } = renderSlide();
    const before = [TOP, BOTTOM].map((i) => tierSignature(C.tiers[i]));
    goToPose(THESIS_POSE);
    const after = [TOP, BOTTOM].map((i) => tierSignature(C.tiers[i]));
    expect(after).toEqual(before);
    unmount();
  });

  test("hovering a plate lights its card too, and no other tier moves", async () => {
    const user = userEvent.setup();
    const { unmount } = renderSlide();
    for (const [i, tier] of C.tiers.entries()) {
      const others = C.tiers.filter((t) => t.id !== tier.id);
      const restingOthers = others.map((t) => tierSignature(t));
      const restingSelf = tierSignature(tier);

      await user.hover(box(PLATE_IDS[i]));

      // THE PAIR LIGHTS TOGETHER — that is the whole point of the interaction: the plate
      // and the card are one tier, and alignment alone cannot prove it.
      expect(box(PLATE_IDS[i]).dataset.hover, tier.id).toBe("true");
      expect(box(CARD_IDS[i]).dataset.hover, tier.id).toBe("true");
      expect(tierSignature(tier), `${tier.id} · something changed`).not.toBe(restingSelf);

      // AND NOTHING ELSE ON THE STAGE MOVES — no dim, no desaturation (§7.1).
      expect(others.map((t) => tierSignature(t)), `${tier.id} · others unmoved`).toEqual(
        restingOthers,
      );

      await user.unhover(box(PLATE_IDS[i]));
      expect(box(PLATE_IDS[i]).dataset.hover, `${tier.id} · released`).toBe("false");
      expect(box(CARD_IDS[i]).dataset.hover, `${tier.id} · released`).toBe("false");
      expect(tierSignature(tier), `${tier.id} · returns to rest`).toBe(restingSelf);
    }
    unmount();
  });

  test("hovering a CARD lights the plate — the pairing runs both ways", async () => {
    const user = userEvent.setup();
    const { unmount } = renderSlide();
    await user.hover(box(CARD_IDS[BOTTOM]));
    expect(box(PLATE_IDS[BOTTOM]).dataset.hover).toBe("true");
    expect(box(CARD_IDS[BOTTOM]).dataset.hover).toBe("true");
    expect(box(PLATE_IDS[TOP]).dataset.hover).toBe("false");
    expect(box(PLATE_IDS[MIDDLE]).dataset.hover).toBe("false");
    unmount();
  });

  test("a hovered resting tier never out-shines the middle tier at rest", async () => {
    const user = userEvent.setup();
    const { unmount } = renderSlide();
    const litPlate = declarations(box(PLATE_IDS[MIDDLE]));
    const litName = declarations(box(`middle-out-plate-${C.tiers[MIDDLE].id}-name`));

    await user.hover(box(PLATE_IDS[TOP]));
    const hoveredPlate = declarations(box(PLATE_IDS[TOP]));
    const hoveredName = declarations(box(`middle-out-plate-${C.tiers[TOP].id}-name`));

    // THE RANKING HAS TO SURVIVE THE POINTER. A hover that promoted an outer plate past
    // the middle one would be arguing the opposite of the headline for as long as the
    // presenter's cursor sat still.
    const dimmer = (hover: string, lit: string, what: string) => {
      const a = rung(hover, `${what} · hovered`);
      const b = rung(lit, `${what} · lit at rest`);
      expect(a.family, `${what} · same ramp`).toBe(b.family);
      expect(a.rung, `${what} · hover stays under the lit tier`).toBeLessThan(b.rung);
    };
    dimmer(hoveredPlate.get("border")!, litPlate.get("border")!, "border");
    // The ground is the cross-ramp channel again — a hovered resting plate gains
    // `--copper-950` and the middle plate rests on `--copper-900`, which is brighter.
    expect(
      lumen(hoveredPlate.get("background-color")!, "hovered ground"),
      "hovered ground stays under the lit ground",
    ).toBeLessThan(lumen(litPlate.get("background-color")!, "lit ground"));
    dimmer(hoveredName.get("color")!, litName.get("color")!, "name");

    // …and the middle plate itself is untouched by a hover on its neighbour.
    expect(declarations(box(PLATE_IDS[MIDDLE]))).toEqual(litPlate);
    unmount();
  });

  test("only the six boxes are hover targets — the type is transparent to the pointer", () => {
    const { unmount } = renderSlide(THESIS_POSE);
    const targets = [...PLATE_IDS, ...CARD_IDS];
    for (const id of EVERY_BOX) {
      const declared = declarations(box(id)).get("pointer-events");
      if (targets.includes(id)) {
        expect(declared, `${id} · is a hover target`).toBeUndefined();
      } else {
        // A text box that accepted pointer events would swallow every `mouseenter` aimed
        // at the rectangle underneath it, and the highlight would flicker off wherever a
        // claim row happens to be.
        expect(declared, `${id} · must not eat the pointer`).toBe("none");
      }
    }
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the stage fits, and clears the NavBar
// ─────────────────────────────────────────────────────────────────────────────

describe("the whole figure fits the stage and clears the NavBar hover band", () => {
  test("the thesis is the lowest box, directly above the band, with clearance to spare", () => {
    // THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM: `.nav-zone` is
    // `bottom: 0; height: 88px`, so its top edge is y=632 and the band is a hover target
    // whether or not the bar inside it is currently at opacity 0.
    expect(NAV_ZONE_TOP).toBe(632);
    expect(THESIS_TOP + THESIS_HEIGHT).toBe(614);
    expect(NAV_ZONE_CLEARANCE).toBe(NAV_ZONE_TOP - (THESIS_TOP + THESIS_HEIGHT));
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);

    const { unmount } = renderSlide(THESIS_POSE);
    const bottoms = EVERY_BOX.map((id) => {
      const el = box(id);
      return { id, bottom: px(el.style.top) + px(el.style.height) };
    }).filter((b) => Number.isFinite(b.bottom));
    expect(bottoms.length, "every box declares a top and a height").toBe(EVERY_BOX.length);
    const lowest = bottoms.reduce((a, b) => (b.bottom > a.bottom ? b : a));
    expect(lowest.id).toBe(THESIS_ID);
    expect(lowest.bottom).toBeLessThan(NAV_ZONE_TOP);
    unmount();
  });

  test("every eyebrow sits on its own claim row's baseline, not on its top edge", () => {
    // TWO BOXES THAT SHARE A `top` DO NOT SHARE A BASELINE when one is 11px mono and the
    // other 15px sans: the smaller line box is shorter, so its type rides about four pixels
    // high and a floating HOLDS reads as the label of the row above it. The drop is the
    // difference of the two boxes, which is the difference of the two baselines to within a
    // rounding — see `EYEBROW_BASELINE_DROP` in `../../src/slides/leader-shape/middle-out-geometry.ts`.
    expect(EYEBROW_BASELINE_DROP).toBe(ROW_HEIGHT - EYEBROW_HEIGHT);
    expect(EYEBROW_BASELINE_DROP).toBeGreaterThan(0);

    const { unmount } = renderSlide();
    for (const [i, tier] of C.tiers.entries()) {
      for (const [row, slot] of (["holds", "qualifier"] as const).entries()) {
        const eyebrow = box(`middle-out-${tier.id}-${slot}-eyebrow`);
        const claim = box(`middle-out-${tier.id}-${slot}`);
        expect(px(eyebrow.style.top), `${tier.id}.${slot}`).toBe(claimEyebrowTop(i, row));
        expect(px(eyebrow.style.top), `${tier.id}.${slot}`).toBe(
          px(claim.style.top) + EYEBROW_BASELINE_DROP,
        );
        // …and the drop lands the eyebrow's box bottom flush with its claim's, so an
        // eyebrow is BOTTOM-SET inside the row it labels and cannot spill into the next.
        expect(
          px(eyebrow.style.top) + px(eyebrow.style.height),
          `${tier.id}.${slot} · bottom`,
        ).toBe(px(claim.style.top) + px(claim.style.height));
      }
    }
    unmount();
  });

  test("each card is its plate's own box, seen again", () => {
    const { unmount } = renderSlide();
    for (const [i, tier] of C.tiers.entries()) {
      const plate = box(`middle-out-plate-${tier.id}`);
      const card = box(`middle-out-card-${tier.id}`);
      // SAME TOP EDGE, SAME HEIGHT, SAME CENTRE LINE — the alignment IS the claim that an
      // approach is a consequence of where you sit.
      expect(px(card.style.top), tier.id).toBe(px(plate.style.top));
      expect(px(card.style.height), tier.id).toBe(px(plate.style.height));
      // …and the card's copy is centred on that shared centre line.
      const label = box(`middle-out-card-${tier.id}-label`);
      expect(px(label.style.top), tier.id).toBe(cardLabelTop(i));
      expect(cardLabelTop(i), tier.id).toBeGreaterThan(plateTop(i));
    }
    unmount();
  });

  test("nothing overflows the stage and the three columns tile it", () => {
    expect(PLATE_LEFT + PLATE_WIDTH).toBe(RAIL_LEFT);
    expect(CARD_LEFT + CARD_WIDTH).toBe(STAGE.width - PLATE_LEFT);
    const { unmount } = renderSlide(THESIS_POSE);
    for (const id of EVERY_BOX) {
      const el = box(id);
      const left = px(el.style.left);
      const right = left + px(el.style.width);
      const top = px(el.style.top);
      expect(left, `${id} · left`).toBeGreaterThanOrEqual(0);
      expect(right, `${id} · right`).toBeLessThanOrEqual(STAGE.width);
      expect(top, `${id} · top`).toBeGreaterThanOrEqual(FIGURE_TOP - 1);
    }
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the keyword rule and the copy budgets
// ─────────────────────────────────────────────────────────────────────────────

describe("the keyword rule — kw on PROSE only, in three registers", () => {
  test("every prose string has between one and two keywords, each a real substring", () => {
    expect(PROSE).toHaveLength(10);
    for (const [name, text, kw] of PROSE) {
      expect(kw.length, `${name} · keyword count`).toBeGreaterThan(0);
      expect(kw.length, `${name} · keyword count`).toBeLessThanOrEqual(2);
      for (const k of kw) {
        expect(text, `${name} · "${k}" is not in the sentence`).toContain(k);
      }
    }
    // TWO KEYWORDS ONLY WHERE THE CLAIM IS A CONJUNCTION — the middle tier's `holds`, and
    // nowhere else.
    const doubles = PROSE.filter(([, , kw]) => kw.length === 2).map(([name]) => name);
    expect(doubles).toEqual([`${C.tiers[MIDDLE].id}.holds`]);
  });

  test("labels and captions carry no keywords, and the stage prints no italic in mono", () => {
    // A `*Kw` sibling for a label would be a copper italic inside an 11px uppercase mono
    // string, which reads as a rendering fault.
    for (const label of LABELS) {
      expect(
        PROSE.some(([, text]) => text === label),
        `${JSON.stringify(label)} is a LABEL and must not be prose`,
      ).toBe(false);
    }
    for (const caption of CAPTIONS) {
      expect(
        PROSE.some(([, text]) => text === caption),
        `${JSON.stringify(caption)} is a CAPTION and must not be prose`,
      ).toBe(false);
    }
    const { unmount } = renderSlide(THESIS_POSE);
    // NOTHING IN THE MONO REGISTER IS HIGHLIGHTED, read off the DOM rather than trusted.
    const monoIds = [
      ...C.tiers.map((t) => `middle-out-plate-${t.id}-name`),
      "middle-out-plate-tag",
      "middle-out-plate-chips",
      "middle-out-act-up-label",
      "middle-out-act-down-label",
      ...C.tiers.map((t) => `middle-out-card-${t.id}-label`),
      ...C.tiers.flatMap((t) => [
        `middle-out-${t.id}-holds-eyebrow`,
        `middle-out-${t.id}-qualifier-eyebrow`,
      ]),
    ];
    for (const id of monoIds) {
      expect(box(id).querySelector("em"), `${id} · italic in a mono label`).toBeNull();
      expect(box(id).style.fontFamily, id).toBe("var(--mono)");
    }
    // …and the three verdicts are captions: no `em` in them either.
    for (const tier of C.tiers) {
      expect(box(`middle-out-card-${tier.id}-verdict`).querySelector("em")).toBeNull();
    }
    // WHILE THE PROSE BOXES DO CARRY ONE, which is what makes the check above meaningful.
    expect(box(`middle-out-${C.tiers[TOP].id}-holds`).querySelector("em")).not.toBeNull();
    expect(box(THESIS_ID).querySelector("em")).not.toBeNull();
    unmount();
  });
});

describe("the copy budgets — every string inside the box it is measured for", () => {
  test("each register is within the budget its geometry records", () => {
    const within = (name: string, text: string, budget: number) =>
      expect(text.length, `${name} · ${text.length} chars against ${budget}`).toBeLessThanOrEqual(
        budget,
      );
    within("headline", C.headline, HEADLINE_BUDGET_CHARS);
    within("thesis", C.thesis, THESIS_BUDGET_CHARS);
    within("chips", C.middleChips, CHIPS_BUDGET_CHARS);
    within("upGloss", C.upGloss, GLOSS_BUDGET_CHARS);
    within("downGloss", C.downGloss, GLOSS_BUDGET_CHARS);
    for (const tier of C.tiers) {
      within(`${tier.id}.holds`, tier.holds, CLAIM_BUDGET_CHARS);
      within(`${tier.id}.qualifier`, tier.qualifier, CLAIM_BUDGET_CHARS);
      within(`${tier.id}.verdict`, tier.approachVerdict, VERDICT_BUDGET_CHARS);
      within(`${tier.id}.holdsEyebrow`, tier.holdsEyebrow, EYEBROW_BUDGET_CHARS);
      within(`${tier.id}.qualifierEyebrow`, tier.qualifierEyebrow, EYEBROW_BUDGET_CHARS);
    }
    // THE NAME ROW IS A SUM: the longest is the middle plate's, which carries a name and a
    // subname; the top plate's shares its row with the tag.
    within(
      "middle name row",
      C.tiers[MIDDLE].name + C.middleSubname,
      NAME_ROW_BUDGET_CHARS,
    );
    within("top name row", C.tiers[TOP].name + C.roomTag, NAME_ROW_BUDGET_CHARS);
  });

  test("the boxes the budgets are cut against are the boxes the figure renders", () => {
    const { unmount } = renderSlide(THESIS_POSE);
    expect(px(box(`middle-out-${C.tiers[TOP].id}-holds`).style.width)).toBe(CLAIM_TEXT_WIDTH);
    expect(px(box("middle-out-act-up-gloss").style.width)).toBe(ACT_TEXT_WIDTH);
    expect(px(box(`middle-out-card-${C.tiers[TOP].id}-verdict`).style.width)).toBe(
      CARD_INNER_WIDTH,
    );
    // THE FIVE BOXES CUT FOR MORE LINES THAN THEIR SHORTEST COPY NEEDS CENTRE IT, so a
    // one-line verdict sits on its card's centre line instead of at the top of a two-line
    // box — and a face that wraps differently degrades into the same box.
    for (const id of [
      "middle-out-act-up-gloss",
      "middle-out-act-down-gloss",
      ...C.tiers.map((t) => `middle-out-card-${t.id}-verdict`),
    ]) {
      expect(box(id).style.display, `${id} · centred`).toBe("flex");
      expect(box(id).style.alignItems, id).toBe("center");
      // ONE BLOCK-LEVEL CHILD, which is what keeps `highlight()`'s spans from each becoming
      // a flex item and wrapping in their own column.
      expect(box(id).children).toHaveLength(1);
      expect((box(id).firstElementChild as HTMLElement).style.display, id).toBe("block");
    }
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · no copy collision with the siblings
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The images the three neighbouring slides own, each drawn from a string that slide
 * ACTUALLY prints today and each fired against that slide's own corpus below.
 *
 * WHAT THIS IS NOT: a proof about images. Two slides can share a picture without sharing a
 * word, and no grep will ever see that. This is the guard against the cheapest way to
 * break it, which is lifting the other slide's vocabulary.
 */
const RESERVED: ReadonlyArray<readonly [string, RegExp, "C.1" | "B.1" | "B.2"]> = [
  // C.1 — the same run, the same content file.
  ["You decide", /\bYou decide\b/i, "C.1"],
  ["a decision on your desk", /\bon your desk\b/i, "C.1"],
  ["a tool purchase", /\bpurchase\b/i, "C.1"],
  ["the enabler", /\benabler\b/i, "C.1"],
  ["pillars", /\bpillars?\b/i, "C.1"],
  ["governance", /\bgovernance\b/i, "C.1"],
  ["companions", /\bcompanions?\b/i, "C.1"],
  ["a seat", /\bseats?\b/i, "C.1"],
  ["the pilot", /\bpilots?\b/i, "C.1"],
  ["culture", /\bculture\b/i, "C.1"],
  ["an agent", /\bagents?\b/i, "C.1"],
  ["improvises", /\bimprovis\w*\b/i, "C.1"],
  // B.1 — the 70/30 and the sentence it opens on.
  ["not the tools", /\btools?\b/i, "B.1"],
  ["technology", /\btechnolog\w*\b/i, "B.1"],
  ["people & process", /people\s*&\s*process/i, "B.1"],
  ["procured", /\bprocure\w*\b/i, "B.1"],
  ["capability", /\bcapabilit\w*\b/i, "B.1"],
  ["BCG / McKinsey", /\b(BCG|McKinsey)\b/i, "B.1"],
  // B.2 — the unwritten rule.
  ["no rule to break", /\brules?\b/i, "B.2"],
  ["wrote their own", /\bwrote\b/i, "B.2"],
  ["handed out", /\bhanded out\b/i, "B.2"],
];

describe("nothing here is re-spent from a neighbouring slide", () => {
  test("uses none of C.1's, B.1's or B.2's images — and every pattern fires", () => {
    const authored = authoredStrings();
    expect(authored.length, "a rule over an empty set proves nothing").toBeGreaterThan(20);

    const { container, unmount } = renderSlide(THESIS_POSE);
    const stage = stageTextWithoutFigLabel(container);
    for (const [name, pattern, owner] of RESERVED) {
      for (const copy of authored) {
        expect(pattern.test(copy), `${owner}'s "${name}" in ${JSON.stringify(copy)}`).toBe(
          false,
        );
      }
      expect(pattern.test(stage), `${owner}'s "${name}" reached the stage`).toBe(false);
    }
    // THE BARE `70/30`, refused separately: B.1 never prints that spelling either, so a
    // pattern for it cannot be fired against B.1's strings without a false claim about
    // where it came from. It is still refused, because B.1's split IS 70 against 30.
    expect(stage).not.toMatch(/\b70\s*\/\s*30\b/);
    unmount();

    // EVERY PATTERN FIRED AGAINST THE SLIDE IT WAS READ OFF. Twenty-one regexes that
    // matched nothing would make the rule above pass on copy lifted verbatim from any of
    // the three.
    const corpora = { "C.1": c1Strings(), "B.1": b1Strings(), "B.2": b2Strings() } as const;
    for (const [name, pattern, owner] of RESERVED) {
      expect(
        corpora[owner].some((copy) => pattern.test(copy)),
        `"${name}" is supposed to be ${owner}'s, but ${owner} does not print it`,
      ).toBe(true);
    }
  });

  test("the one word it does share is shared deliberately", () => {
    // `decision` USED TO BE THE SECOND SHARED NOUN and is not spent here at all any more.
    // The upward act said "the next decision this room makes" until the 2026-08-14 rewrite
    // put the act in the middle's own hands — "They tell this room what works" — which
    // leaves C.1's figure the only owner of the word in this run.
    const mine = authoredStrings().filter((copy) => /\bdecisions?\b/i.test(copy));
    expect(mine).toEqual([]);
    // `ambassador` IS SHARED WITH K.3, WHICH ASKS THE ROOM TO BACK THEM six sections
    // later. C.4 names the people; K.3 names the act. A term the room has already met is
    // what makes that ask land, so the order is the argument.
    //
    // IT WAS `champion` UNTIL 2026-08-15 ON BOTH SLIDES. The Culture department's AI
    // Ambassador framework fixes `Champion` to mean a top level leader/CxO, which is this
    // room — so the word on the MIDDLE plate said the opposite of what the plate means.
    expect(C.middleSubname).toMatch(/\bAMBASSADORS\b/);
    const ambassadors = authoredStrings().filter((copy) => /\bambassador/i.test(copy));
    expect(ambassadors, "only the middle plate's subname says it").toEqual([C.middleSubname]);
    // AND `champion` IS NOW SPENT NOWHERE ON THIS STAGE. The framework's meaning of the
    // word puts it in the top plate's chairs, so a stray one here would reopen exactly the
    // contradiction the reterming closed.
    expect(authoredStrings().filter((copy) => /\bchampion/i.test(copy))).toEqual([]);
    // NOR MAY THIS STAGE SAY `agent` OF A PERSON. The framework's other role is the AI
    // Agent, and `agent` is the deck's word for a class of SOFTWARE (§B, and C.1's
    // companions pillar two slides back). The two must never meet on one stage.
    expect(authoredStrings().filter((copy) => /\bagents?\b/i.test(copy))).toEqual([]);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · no brand axis, and reduced motion
// ─────────────────────────────────────────────────────────────────────────────

describe("no brand axis", () => {
  test("the slide component reads no variant and the block hides no resolver", () => {
    // §4.4's brand × deckSet slots do not list this slide, so there is no `…For(brand)`
    // resolver to call and the slide component takes no props. An ORG CHART is not an
    // organisation's own evidence: every organisation in this group has a top, a middle
    // and teams, and naming one would be inventing a fact to fill a fork.
    expect(ShapeMiddleOut.length).toBe(0);
    for (const copy of authoredStrings()) {
      expect(copy, `an organisation in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(GEMS|GEMVIS|Berau|DigiTech|MineTech|Nanovest|Sinar Mas)\b/i,
      );
    }
    const walk = (value: unknown, path: string): void => {
      if (typeof value === "function") throw new Error(`a function at ${path}`);
      if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`));
      else if (value !== null && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
      }
    };
    expect(() => walk(C, "shapeMiddleOutContent")).not.toThrow();
    // POSITIVE CONTROL — the walk is alive and would find a resolver one level down.
    expect(() => walk({ nested: { middleOutFor: () => C } }, "control")).toThrow(
      /a function at control\.nested\.middleOutFor/,
    );
  });
});

describe("prefers-reduced-motion: reduce", () => {
  test("the markup is preference-independent — the squash is the stylesheet's job", () => {
    // WHAT THIS CAN AND CANNOT SHOW. jsdom has no media queries, so this proves only that
    // the figure mounts no `matchMedia` gate and writes the same classes and delays under
    // either preference; that the durations actually collapse is `globals.css`'s global
    // rule plus `middle-out.css`'s own media block, and it is checked in a real engine.
    const original = window.matchMedia;
    const stub = (matches: boolean) =>
      vi.fn().mockImplementation((query: string) => ({
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

    const capture = () => {
      const { container, unmount } = renderSlide(THESIS_POSE);
      const html = container.innerHTML;
      unmount();
      return html;
    };

    window.matchMedia = stub(false) as unknown as typeof window.matchMedia;
    const moving = capture();
    window.matchMedia = stub(true) as unknown as typeof window.matchMedia;
    const reduced = capture();
    window.matchMedia = original;

    expect(reduced).toBe(moving);
    // AND NO SMIL AT ALL, which is what makes the squash sufficient: SMIL is invisible to
    // it. This figure mounts no `<svg>`, so there is nothing to gate.
    const { container, unmount } = renderSlide(THESIS_POSE);
    expect(container.querySelectorAll("svg")).toHaveLength(0);
    expect(
      container.querySelectorAll("animate, animateTransform, animateMotion, set"),
    ).toHaveLength(0);
    unmount();
  });
});

describe("both leader decks print the same stage", () => {
  // BRAND INVARIANCE IS A CLAIM ABOUT MODULE EPOCHS — `VARIANT` resolves once at module
  // scope — so it cannot be checked inside the one epoch every test above runs in. Two
  // epochs, byte for byte, at EVERY pose.
  const LEADER_VARIANTS: readonly VariantId[] = ["berau-leader", "gems-leader"];

  async function stagesFor(variant: VariantId): Promise<{ html: string; text: string }[]> {
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
        import("@/slides/leader-shape/shape-middle-out"),
      ]);

    const row = composedDeck.slides.find((s) => s.def.id === "shape-middle-out");
    const at = row ? { letter: row.letter, num: row.num, sectionKey: row.sectionKey } : AT;
    const poses = Array.from({ length: slide.shapeMiddleOutSlide.steps }, (_u, i) => i);

    function EpochNav() {
      const { goTo } = useDeckIn();
      return (
        <>
          {poses.map((s) => (
            <button key={s} data-testid={`epoch-goto-${s}`} onClick={() => goTo(0, s)} />
          ))}
        </>
      );
    }

    render(
      <DeckProvider stepCounts={[slide.shapeMiddleOutSlide.steps]}>
        <SlideNumberProvider value={at}>
          <EpochNav />
          <div data-testid="epoch-stage">
            <slide.ShapeMiddleOut />
          </div>
        </SlideNumberProvider>
      </DeckProvider>,
    );

    const out: { html: string; text: string }[] = [];
    for (const pose of poses) {
      act(() => screen.getByTestId(`epoch-goto-${pose}`).click());
      const stage = screen.getByTestId("epoch-stage");
      out.push({ html: stage.innerHTML, text: stage.textContent ?? "" });
    }
    return out;
  }

  afterAll(restoreLocation);

  test("byte for byte, at every pose", async () => {
    // SEQUENTIALLY, not `Promise.all`. Each call re-points `window.location`, resets the
    // module registry and renders into the SAME document — run concurrently they
    // interleave and every query finds two elements.
    const berau = await stagesFor(LEADER_VARIANTS[0]);
    const gems = await stagesFor(LEADER_VARIANTS[1]);
    expect(berau).toHaveLength(STEP_COUNT);
    expect(gems).toHaveLength(berau.length);
    for (let pose = 0; pose < berau.length; pose++) {
      expect(berau[pose].html, `pose ${pose} · markup`).toBe(gems[pose].html);
      expect(berau[pose].text, `pose ${pose} · text`).toBe(gems[pose].text);
    }
    // Not vacuously: a stage that rendered nothing would also be equal.
    const last = berau[berau.length - 1];
    expect(last.text).toContain(C.headline);
    expect(last.text).toContain(C.tiers[MIDDLE].name);
    expect(last.text).toContain(C.middleSubname);
    expect(last.text).toContain(C.thesis);
    // AND THE CAPTURE IS POSE-SENSITIVE: every box is mounted at both poses and gated by a
    // class, so the text is identical and only the markup moves.
    expect(berau[0].text, "text is pose-invariant here, by construction").toBe(last.text);
    expect(berau[0].html, "markup is not").not.toBe(last.html);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the TAIL POSITION in the `shape` run
// ─────────────────────────────────────────────────────────────────────────────

describe("the composed leader decks", () => {
  const LEADER: readonly VariantId[] = ["berau-leader", "gems-leader"];
  /** Every variant whose deck set is `standard` — the decks §4.3 leaves this slide out
   *  of. */
  const STANDARD: readonly VariantId[] = ["berau-middle-mgmt", "gems-middle-mgmt", "general"];

  async function deckFor(variant: VariantId) {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: new URL(`http://localhost:5173/?variant=${variant}`),
    });
    vi.resetModules();
    const { composedDeck } = await import("@/deck/registry");
    return composedDeck;
  }

  afterAll(restoreLocation);

  test("this slide is the LAST `shape` row", async () => {
    for (const variant of LEADER) {
      const deck = await deckFor(variant);
      const run = deck.slides.filter((s) => s.sectionKey === "shape");
      expect(run[run.length - 1].def.id, variant).toBe("shape-middle-out");

      // IMMEDIATELY BEHIND ITS PREDECESSOR, in the DECK's order and not merely in the
      // run's — the two are the same thing only while the run is contiguous.
      const at = deck.slides.findIndex((s) => s.def.id === "shape-middle-out");
      const before = deck.slides.findIndex((s) => s.def.id === run.at(-2)?.def.id);
      expect(at, `${variant} composes shape-middle-out`).toBeGreaterThan(-1);
      expect(at, variant).toBe(before + 1);
      expect(deck.slides[at].sectionKey, variant).toBe("shape");

      // THE LETTER IS PINNED AND THE NUMBER IS NOT: `shape` is C in both leader decks, and
      // the number is asserted only as "however long the run is".
      expect(deck.letterOf("shape"), variant).toBe("C");
      expect(deck.slides[at].letter, variant).toBe("C");
      expect(deck.slides[at].num, variant).toBe(run.length);
      const nums = run.map((s) => s.num).filter((n): n is number => n !== null);
      expect(nums, `${variant} · every shape row is numbered`).toHaveLength(run.length);
      expect(Math.max(...nums), variant).toBe(deck.slides[at].num);
    }
  });

  test("and no standard deck runs it at all", async () => {
    for (const variant of STANDARD) {
      const deck = await deckFor(variant);
      expect(deck.slides.some((s) => s.def.id === "shape-middle-out"), variant).toBe(false);
      expect(deck.letterOf("shape"), variant).toBeUndefined();
    }
  });
});
