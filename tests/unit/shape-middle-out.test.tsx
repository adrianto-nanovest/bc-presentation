// MIDDLE-OUT · slide tests. All FIVE poses, forward and backward, plus the three rules
// issue #68's AC states by name — held over EVERY authored string, over the RENDERED
// stage, and over the two COMPOSED leader decks rather than spot-checked.
//
// WHAT THIS FILE CAN AND CANNOT PROVE — the siblings' preamble, inherited. jsdom has no
// layout and no media queries, so nothing here measures a pixel and
// `prefers-reduced-motion: reduce` cannot really be toggled; the `matchMedia` stub below
// proves only that the MARKUP is preference-independent, which is the half a DOM runner
// owns. What a DOM-less runner IS good for is exactly what this slide is at risk of:
//
//   1. BECOMING A THIRD LADDER. §6.6 refuses "Learn → Experiment → Build → Integrate →
//      Own" in as many words — "it would be a THIRD ladder alongside L1–L5 and P0–P3" —
//      and three stacked bands are one keystroke from being one. A reviewer cannot tell
//      the difference by reading the copy, so the guardrail is held here three ways: no
//      digit anywhere, no scale vocabulary anywhere (with the regex fired against the
//      two slides that DO own L1–L5 and P0–P3, and against the words this slide's own
//      header records as cut), and equal geometry on all three bands.
//   2. RANKING THE MIDDLE IN THE WRONG CHANNEL. The middle band's brightness IS the
//      argument. Spent as opacity it would collide with the reveal sweep — opacity on
//      this stage means "has not arrived yet", i.e. TIME — and spent as size it would be
//      a scale. So rank is asserted as a CSS-var token on a known ramp, and the two
//      outer bands are compared BYTE FOR BYTE between pose 0 and pose 4.
//   3. THE ROOM BECOMING THE TARGET. The leader deck's room IS the middle band. A slide
//      that argued middle-out AT an absent middle would be flattering somebody who is
//      not there; this one has to keep the room as the subject of every act it names.
//   4. RE-SPENDING A NEIGHBOUR. C.1 (`shape-agentic-org`) is in the SAME run and opens
//      six beats on "You decide"; B.1 owns the 70/30 and "not the tools"; B.2 owns "no
//      rule to break". Each token list below is drawn from that slide's OWN strings and
//      fired against them, never transcribed from memory.
//
// WHAT IS LEFT TO THE BROWSER WALK: real wrap of the six one-line claim rows, the two
// two-line translations and the one-line headline under BOTH font faces (the numbers
// live in `middle-out-geometry.ts`'s copy budgets, which this file holds over the copy
// but cannot measure); the painted colour ranking at projection scale; and the
// squashed-duration half of reduce mode — every reached reveal resting on its FINISHED
// frame, which jsdom computes no transition for.
//
// WHERE THIS SLIDE SITS IN THE DECK **IS** ASSERTED HERE, and that is a departure from
// `gap-no-sop.test.tsx`, which hands the question to `deck-registry.test.ts`. #68's AC
// names the tail position out loud — "unit test covers … the slide's tail position in
// the run" — so the last two describes compose both leader decks for real. What they
// deliberately do NOT pin is the composed NUMBER: this slide prints C.3 today and C.4
// the day `shape-tam-kotter` lands (§4.3), so the stable facts are the LETTER, the run's
// membership and the fact that this row is LAST. `AT` below is only a harness input for
// the single-epoch tests, which resolve the default `general` deck — a deck that runs no
// leader slide at all.
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { restoreLocation } from "../harvest/deck-numbering";
import type { VariantId } from "@/deck-variants";
import {
  ShapeMiddleOut,
  shapeMiddleOutSlide,
} from "@/slides/leader-shape/shape-middle-out";
import { shapeMiddleOutContent } from "@/slides/leader-shape/content";
// THE NEIGHBOURS, AS MODULES. C.1 shares this slide's run and this slide's file; B.1 and
// B.2 are the two `gap` slides whose images the header's collision census names.
// Imported so the rule is checked against what those slides ACTUALLY say today rather
// than against a copy of their vocabulary kept here.
import { shapeOrgContent } from "@/slides/leader-shape/content";
import {
  gapHardestPartContent,
  gapLadderContent,
  gapNoSopContent,
} from "@/slides/leader-gap/content";
// THE TWO LADDERS THE GUARDRAIL PROTECTS, as live corpora — `gapLadderContent` owns
// L1–L5 and `mandatePhasesGatesContent` owns P0–P3. They are here to FIRE the scale
// regex, so a pattern that matched nothing could not pass for a rule.
import { mandatePhasesGatesContent } from "@/slides/leader-mandate/content";
import {
  BAND_HEIGHT,
  BAND_LEFT,
  BAND_PITCH,
  BAND_WIDTH,
  BOTTOM_BAND_INDEX,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  MIDDLE_BAND_INDEX,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  TOP_BAND_INDEX,
  bandTop,
} from "@/slides/leader-shape/middle-out-geometry";
import {
  CLAIM_BEATS,
  LAST_CLAIM_POSE,
  POSE,
  STEP_COUNT,
  TRANSLATION_POSE,
  isMiddleLit,
  showsBandClaims,
  showsCloser,
  showsTranslations,
} from "@/slides/leader-shape/middle-out-walk";
// The design system's own two ladders. Imported for their KEYS, never their hexes — the
// distinction `shape-agentic-org.test.tsx` argues at `rampOf`, and the reason the three
// colour helpers below are lifted from that file rather than re-invented here.
import { copper, neutral } from "@/design-system/colors";

const C = shapeMiddleOutContent;

/**
 * All five, DERIVED — `[0 … STEP_COUNT - 1]`.
 *
 * NOT A LITERAL `[0,1,2,3,4]`. A fourth band grows `STEP_COUNT` to six (see
 * `middle-out-walk.ts`), and a hand-written list would then leave the last pose — the
 * translations' — unwalked by every "at every pose" test in this file, which is exactly
 * the set of tests the AC asks for at EVERY pose.
 */
const POSES: readonly number[] = Array.from({ length: STEP_COUNT }, (_u, i) => i);

/** The three band indices, in SPATIAL order — the order the chart draws them, which is
 *  not the order the walk argues them. Read off the geometry rather than written as
 *  0/1/2, so "the band the argument is about" stays a derivation. */
const TOP = TOP_BAND_INDEX;
const MIDDLE = MIDDLE_BAND_INDEX;
const BOTTOM = BOTTOM_BAND_INDEX;

/**
 * The position this slide holds in the decks that will run it.
 *
 * `at` IS required here, the case `SlideHarness` documents and every leader-only sibling
 * repeats: unit tests resolve the default `general` deck, `general` has no leader variant,
 * and this slide reaches the leader deck sets alone. The PAIR itself is a harness INPUT
 * and not a claim — the composed describes at the bottom read the real value off the real
 * deck, and pin only the letter and the tail position, never the number.
 */
const AT = { letter: "C", num: 3, sectionKey: "shape" } as const;

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

// ── the boxes, by the gate that owns them ────────────────────────────────────
//
// EVERY ONE OF THESE IS DERIVED FROM `middle-out-walk.ts`, never listed against a pose
// number. A hand-written "pose 3 shows these four ids" table would be a second copy of
// the walk living in a test, and the day the teaching order in `content.ts` is re-sorted
// the table would go on asserting the old order — which is precisely the edit
// `isMiddleLit` warns would light the wrong band.

/** The seven boxes that stand at EVERY pose, gated by nothing: the kicker, the three
 *  band boxes and the three band names. Pose 0 IS the organisation, named and nothing
 *  else, so none of these is a `Reveal` and none of them has an arrival. */
const STANDING_IDS: readonly string[] = [
  "middle-out-kicker",
  ...C.bands.map((band) => `middle-out-band-${band.id}`),
  ...C.bands.map((band) => `middle-out-band-${band.id}-name`),
];

/** A gated box: its testid and the walk function that decides whether it is on stage. */
interface Gated {
  readonly id: string;
  readonly gate: (pose: number) => boolean;
}

/** The nineteen boxes that arrive: four per band, six on the rail and in the translation
 *  column, and the closer. Each carries the WALK FUNCTION that owns it, so every
 *  per-pose expectation below is computed rather than transcribed. */
const GATED: readonly Gated[] = [
  ...C.bands.flatMap((band, i) =>
    ["holds", "qualifier"].flatMap((slot) => [
      { id: `middle-out-${band.id}-${slot}-eyebrow`, gate: (p: number) => showsBandClaims(i, p) },
      { id: `middle-out-${band.id}-${slot}`, gate: (p: number) => showsBandClaims(i, p) },
    ]),
  ),
  ...[
    "middle-out-rule-downward",
    "middle-out-rule-upward",
    "middle-out-origin-bar",
    "middle-out-translation-eyebrow",
    "middle-out-upward",
    "middle-out-downward",
  ].map((id) => ({ id, gate: showsTranslations })),
  { id: "middle-out-closer", gate: showsCloser },
];

/** Every testid this figure can mount — the census both directions of the box count are
 *  held to. */
const EVERY_BOX: readonly string[] = [...STANDING_IDS, ...GATED.map((g) => g.id)];

/** The four boxes with no text of their own: the two direction rules and the origin bar
 *  are 2px-tall painted boxes, and each band's own rectangle is empty by construction —
 *  guardrail 1 in `content.ts` says a band carries its name and NOTHING beside it, so an
 *  empty box is that rule as a fact rather than as a sentence. */
const TEXTLESS_IDS: ReadonlySet<string> = new Set([
  "middle-out-rule-downward",
  "middle-out-rule-upward",
  "middle-out-origin-bar",
  ...C.bands.map((band) => `middle-out-band-${band.id}`),
]);

/** Which pose a gated box FIRST appears at — searched over the walk rather than typed, so
 *  it moves with the gate. */
function arrivalPose(gate: (pose: number) => boolean): number {
  const found = POSES.find((pose) => gate(pose));
  if (found === undefined) {
    throw new Error("a gated box that never arrives at any pose the deck can reach");
  }
  return found;
}

/** The boxes that arrive AT `pose` — nothing that was already up. */
const arrivingAt = (pose: number): readonly string[] =>
  GATED.filter((g) => arrivalPose(g.gate) === pose).map((g) => g.id);

/** Every gated box is a `Reveal`, so its class carries its reveal. The standing seven are
 *  plain positioned `div`s and are deliberately NOT readable through here. */
function fade(id: string): HTMLElement {
  const el = screen.getByTestId(id);
  if (!el.classList.contains("fade")) {
    throw new Error(
      `"${id}" is not a .fade box — it is either a standing element (which has no ` +
        `reveal to read) or the renderer's primitive changed.`,
    );
  }
  return el;
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
  if (!Number.isFinite(ms)) throw new Error(`"${id}" carries no readable transitionDelay`);
  return ms;
}

// ── the copy, as one set of strings ──────────────────────────────────────────

/** Every string reachable from `value` — the walk, not a hand list, for the sibling
 *  files' reason: a field added next month is inside every rule below the day it exists.
 *  It collects `id` fields too, deliberately: those reach the DOM as `data-testid`, and a
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
 *  axis — see the two `no brand axis` describes, which hold that as a rule. */
const authoredStrings = (): string[] => walkStrings(C);

/** C.1's corpus — the slide that OPENS this same run, out of this same file. */
const c1Strings = (): string[] => walkStrings(shapeOrgContent);
/** B.1's corpus — the 70/30 and "not the tools". */
const b1Strings = (): string[] => walkStrings(gapHardestPartContent);
/** B.2's corpus — "no rule to break" and `improvises`. */
const b2Strings = (): string[] => walkStrings(gapNoSopContent);

/** The TEN prose strings, each with the `*Kw` sibling `content.ts` pairs it with: the
 *  headline, the three bands' `holds`, the three bands' `qualifier`, the two translations
 *  and the closer. The content module's own keyword census counts nine and then says
 *  "ten with the closer counted" — this is that same list, closer included. */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ...C.bands.flatMap(
    (band) =>
      [
        [`${band.id}.holds`, band.holds, band.holdsKw],
        [`${band.id}.qualifier`, band.qualifier, band.qualifierKw],
      ] as const,
  ),
  ["downward", C.downward, C.downwardKw],
  ["upward", C.upward, C.upwardKw],
  ["closer", C.closer, C.closerKw],
];

/** The NINE distinct LABEL strings, which carry no `*Kw` and may not gain one: the fig
 *  label, the kicker, the three band names, the three eyebrow VALUES (HOLDS · CANNOT ·
 *  ALONE — three distinct strings across six rendered rows) and the translations' shared
 *  label. Written out on purpose: together with `PROSE` it is checked against what the
 *  STAGE actually prints, so a twentieth string has to pick a side before it can render. */
const LABELS: readonly string[] = [
  C.figLabel,
  C.kicker,
  ...C.bands.map((band) => band.label),
  ...new Set(C.bands.flatMap((band) => [band.holdsEyebrow, band.qualifierEyebrow])),
  C.translationEyebrow,
];

/**
 * Every string the stage prints, ONE ENTRY PER RENDERED BOX — so HOLDS appears three
 * times and CANNOT twice, exactly as the stage shows them.
 *
 * The eyebrows come before the claims because that is the order `MiddleOutBands.tsx`
 * declares them in; the comparison below sorts both sides, so the order is only here to
 * make the list readable.
 */
const printedStrings = (): string[] => [
  C.headline,
  C.figLabel,
  C.kicker,
  ...C.bands.map((band) => band.label),
  ...C.bands.flatMap((band) => [band.holdsEyebrow, band.qualifierEyebrow]),
  ...C.bands.flatMap((band) => [band.holds, band.qualifier]),
  C.translationEyebrow,
  C.upward,
  C.downward,
  C.closer,
];

/** Everything the stage renders, minus the one element that legitimately prints a DERIVED
 *  figure reference. Stripped from a CLONE: React owns those nodes and removing one behind
 *  its back throws on the next commit. */
function stageTextWithoutFigLabel(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

/** The label half of the `FigLabel` — its last span, which is the only part of that
 *  element this slide authors. The `C.3` in front of it is the composer's. */
function figLabelText(container: HTMLElement): string {
  const spans = container.querySelectorAll(".fig-label span");
  return spans[spans.length - 1]?.textContent ?? "";
}

/** What the stage prints, read off the DOM: the headline, the fig label's own half, and
 *  every box that carries type. */
function stagePrintedStrings(container: HTMLElement): string[] {
  const heading = container.querySelector("h1")?.textContent ?? "";
  const boxes = [...container.querySelectorAll<HTMLElement>("[data-testid^='middle-out-']")]
    .map((el) => el.textContent ?? "")
    .filter((text) => text !== "");
  return [heading, figLabelText(container), ...boxes];
}

// ── the two ramps, so "brighter" is an ordering and not a vibe ────────────────
//
// `rampOf`, `tokenIn` and `brightnessOf` are LIFTED VERBATIM from
// `shape-agentic-org.test.tsx`, which argues all three at length. The short version:
// the ladders' ORDER comes from the scale (a higher key is a darker stop, so sorting the
// exported keys descending IS luminance order) while the TIERS come from
// `src/design-system/colors.ts`, so no hex is ever compared and a token added to the
// design system arrives on the ramp by itself. `tokenIn` THROWS on a declaration with no
// `var(--…)` in it, which is how "CSS vars only, no hex and no rgba() literal" — the rule
// `MiddleOutBands.tsx` states at its head — is enforced rather than described.

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
      `${what}: "${declaration}" names no var(--…) token — CSS vars only on this ` +
        `slide, so a hex or an rgba() literal here is the bug.`,
    );
  }
  return match[1];
}

function brightnessOf(token: string, what: string): { family: string; rung: number } {
  const inCopper = COPPER_RAMP.indexOf(token);
  if (inCopper >= 0) return { family: "copper", rung: inCopper };
  const inNeutral = NEUTRAL_RAMP.indexOf(token);
  if (inNeutral >= 0) return { family: "neutral", rung: inNeutral };
  throw new Error(
    `${what}: "--${token}" is on neither the copper nor the neutral ladder, so ` +
      `nothing here can say whether it is brighter or darker than the resting tier.`,
  );
}

/**
 * One element's inline declarations, as a map — the unit the "byte-identical" claims are
 * made in.
 *
 * PARSED OUT OF `cssText` AND NOT READ PROPERTY BY PROPERTY, because the claim is about
 * what the renderer WROTE: `border: 1px solid var(--copper-700)` is one declaration on
 * this stage and jsdom reports no `borderColor` for it. Splitting on `;` is safe here and
 * only here — no value this figure sets contains one.
 */
function declarations(el: HTMLElement): Map<string, string> {
  const out = new Map<string, string>();
  for (const chunk of el.style.cssText.split(";")) {
    const at = chunk.indexOf(":");
    if (at < 0) continue;
    out.set(chunk.slice(0, at).trim(), chunk.slice(at + 1).trim());
  }
  return out;
}

/** Which declarations differ between two captures of the same element, as a sorted list of
 *  property names — so a failure says WHICH channel moved rather than printing two
 *  eighty-character style strings side by side. */
function movedBetween(before: Map<string, string>, after: Map<string, string>): string[] {
  const props = new Set([...before.keys(), ...after.keys()]);
  return [...props].filter((p) => before.get(p) !== after.get(p)).sort();
}

/** A band's two elements — the rectangle and the name inside it — as one comparable
 *  capture. These are the two the rank pair in `MiddleOutBands.tsx` paints, and they are
 *  the two the no-subtraction rule is asserted over. */
function bandCapture(index: number) {
  const band = C.bands[index];
  const box = screen.getByTestId(`middle-out-band-${band.id}`);
  const name = screen.getByTestId(`middle-out-band-${band.id}-name`);
  return {
    lit: box.dataset.lit,
    boxHtml: box.outerHTML,
    nameHtml: name.outerHTML,
    box: declarations(box),
    name: declarations(name),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// the slide def
// ─────────────────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, FIVE derived steps, canonical on the fullest pose", () => {
    // THE ID IS THE FILE'S BASENAME. `deck-slide-ids.test.ts` owns that rule over the
    // whole tree by parsing it; this pins the VALUE, and states the relationship in the
    // one form a single-slide test can — the id and the module path it is declared in.
    expect(shapeMiddleOutSlide.id).toBe("shape-middle-out");
    const basename = "src/slides/leader-shape/shape-middle-out.tsx"
      .split("/")
      .pop()!
      .replace(/\.tsx$/, "");
    expect(shapeMiddleOutSlide.id).toBe(basename);

    // FIVE, AND NEVER AS A LITERAL. `steps` is asserted against the walk module's own
    // derivation and that derivation is then unfolded to its source — the number of
    // BANDS — because the failure worth catching is a hand-typed `5` surviving a fourth
    // band: `DeckContext` clamps at `steps - 1`, so the fourth band's claims would become
    // a pose the deck can never reach, with no error, no blank slide and no failing test.
    expect(shapeMiddleOutSlide.steps).toBe(STEP_COUNT);
    expect(STEP_COUNT).toBe(TRANSLATION_POSE + 1);
    expect(TRANSLATION_POSE).toBe(POSE.FIRST_CLAIM + CLAIM_BEATS);
    expect(CLAIM_BEATS).toBe(C.bands.length);
    expect(LAST_CLAIM_POSE).toBe(POSE.FIRST_CLAIM + CLAIM_BEATS - 1);
    // chart + one beat per band + the translations, read as the sum it is.
    expect(shapeMiddleOutSlide.steps).toBe(1 + C.bands.length + 1);

    // THE CANONICAL POSE IS THE TRANSLATIONS', imported for the same reason. The exports
    // print `canonicalPose` and nothing else, and pose 3 would export a chart with a
    // brightly ranked middle row and no statement of what that row DOES — a page that
    // appears to rank a layer of management above the board, with the two translations
    // that justify it missing.
    expect(shapeMiddleOutSlide.canonicalPose).toBe(TRANSLATION_POSE);
    expect(shapeMiddleOutSlide.canonicalPose).toBe(shapeMiddleOutSlide.steps - 1);
    // …and it is a pose where the whole argument is up, stated as arithmetic over the
    // walk rather than as prose.
    expect(showsTranslations(shapeMiddleOutSlide.canonicalPose!)).toBe(true);
    expect(showsCloser(shapeMiddleOutSlide.canonicalPose!)).toBe(true);
    expect(isMiddleLit(shapeMiddleOutSlide.canonicalPose!)).toBe(true);
    C.bands.forEach((band, i) =>
      expect(showsBandClaims(i, shapeMiddleOutSlide.canonicalPose!), band.id).toBe(true),
    );

    expect(shapeMiddleOutSlide.animationMode).toBe("step-reveal");
    expect(shapeMiddleOutSlide.surface).toBe("dark");
    expect(shapeMiddleOutSlide.sectionKey).toBe("shape");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · THE MIDDLE-OUT CLAIM
// ─────────────────────────────────────────────────────────────────────────────

describe("the middle-out claim, argued over the whole figure", () => {
  // NOT A STRING MATCH ON ONE SENTENCE. The claim is a THREE-PART argument — the top is
  // given authority and denied visibility, the bottom is given the work and denied
  // authority, the middle is given both plus the one thing neither holds — and it is only
  // a claim if all three parts are on the stage together. So the shape is asserted over
  // `content.ts`'s own fields, and only the two sentences the whole slide turns on are
  // pinned as literals.

  test("the three bands are the organisation, named and never indexed", () => {
    // THE THREE LABELS ARE PINNED, and this is one of the four deliberate literals in
    // this file. `content.ts` records that the top band was drafted as "THE BOARD AND THE
    // C-LEVEL" and cut because `C-LEVEL` matches `\blevel\b` — the no-new-ladder rule's
    // one casualty — and asks the next author not to "restore" it. A pinned string is how
    // that request becomes a failing test instead of a comment nobody reads.
    expect(C.bands.map((band) => band.label)).toEqual([
      "THE BOARD AND THE C-SUITE",
      "BU AND DIVISION HEADS",
      "THE TEAMS",
    ]);
    expect(C.bands.map((band) => band.id)).toEqual(["board", "middle", "teams"]);
    // SPATIAL ORDER, and the middle band is the middle ROW — derived from the count in
    // `middle-out-geometry.ts`, so the band the argument is about cannot end up being a
    // different row from the band the chart draws in the middle.
    expect(MIDDLE).toBe(1);
    expect(Number.isInteger(MIDDLE), "an even band count has no middle row").toBe(true);
    expect(C.bands[MIDDLE].id).toBe("middle");
    expect([TOP, BOTTOM]).toEqual([0, C.bands.length - 1]);
  });

  test("the top is given authority and denied visibility", () => {
    const top = C.bands[TOP];
    // WHAT IT HOLDS is authority in its three ordinary forms, and the keyword is on the
    // one the downward translation later picks up by name.
    expect(top.holds).toMatch(/^Holds\b/);
    expect(top.holds).toContain("the mandate");
    expect(top.holdsKw).toEqual(["the mandate"]);
    // WHAT IT CANNOT DO is SEE — a structural fact about where people sit, not a
    // criticism. The eyebrow is the CANNOT one, i.e. the same one the bottom band takes.
    expect(top.qualifier).toMatch(/^Cannot see\b/);
    expect(top.qualifierEyebrow).toBe(C.bands[BOTTOM].qualifierEyebrow);
    expect(top.qualifierEyebrow).not.toBe(C.bands[MIDDLE].qualifierEyebrow);
    // AND IT IS NOT DENIED AUTHORITY — that is the bottom band's limit, and a top band
    // that lost both would leave the middle's "Holds both" with nothing to refer to.
    expect(top.qualifier).not.toMatch(/authoris|authoriz/i);
  });

  test("the bottom is given the work and denied authority", () => {
    const bottom = C.bands[BOTTOM];
    expect(bottom.holds).toMatch(/^Holds\b/);
    expect(bottom.holds).toContain("the work");
    expect(bottom.holds).toContain("workaround");
    // "Cannot authorise" — British spelling, matching the leader tree's own rendered
    // prose, and a CANNOT rather than a won't: the teams are not reluctant, they are
    // unauthorised, which is the exact symmetry with the top's "Cannot see".
    expect(bottom.qualifier).toMatch(/^Cannot authorise\b/);
    expect(bottom.qualifierEyebrow).toBe(C.bands[TOP].qualifierEyebrow);
    // AND IT IS NOT DENIED VISIBILITY — the two limits are different limits, which is
    // what makes the middle's claim a conjunction rather than a repetition.
    expect(bottom.qualifier).not.toMatch(/\bsee\b/i);
  });

  test("the middle is given BOTH, and is the only band credited with being copied", () => {
    const middle = C.bands[MIDDLE];
    // "Holds both" IS THE HINGE, and the two clauses after the dash are the two things
    // the outer bands were each missing, in the order they were missed: near enough to
    // SEE, senior enough to CHANGE.
    expect(middle.holds).toMatch(/^Holds both\b/);
    expect(middle.holdsKw).toEqual(["near enough", "senior enough"]);
    // TWO KEYWORDS, AND IT IS THE ONLY LINE ON THIS STAGE THAT TAKES TWO — the claim is a
    // conjunction, so an italic on one half would emphasise exactly the wrong thing.
    expect(middle.holdsKw).toHaveLength(2);
    for (const [name, , kws] of PROSE) {
      if (name === `${middle.id}.holds`) continue;
      expect(kws.length, `${name} takes more than one keyword`).toBe(1);
    }

    // ITS SECOND ROW IS NOT A LIMIT. Both outer bands open on "Cannot"; this one does
    // not, and its eyebrow is the one value neither of them takes.
    expect(middle.qualifier).not.toMatch(/^Cannot\b/);
    const eyebrows = C.bands.map((band) => band.qualifierEyebrow);
    expect(new Set(eyebrows).size, "the middle's second row is a different KIND").toBe(2);
    expect(eyebrows.filter((e) => e === middle.qualifierEyebrow)).toHaveLength(1);
    // …and every band shares ONE first eyebrow, which is the chart's spine: three answers
    // to one question before the room reads anything else.
    expect(new Set(C.bands.map((band) => band.holdsEyebrow)).size).toBe(1);

    // THE ONE THING NEITHER OTHER BAND HOLDS: people who copy what this one does.
    // Authority and proximity are POSITIONS and could be reorganised; being copied cannot.
    expect(middle.qualifier).toMatch(/\bcopy\b/);
    expect(middle.qualifierKw).toEqual(["will copy"]);
    // Everything the block authors EXCEPT that row and the keyword cut out of it — the
    // string walk collects `*Kw` entries too, and "will copy" is a fragment of the row
    // rather than a second claim.
    const elsewhere = authoredStrings().filter(
      (copy) => !middle.qualifier.includes(copy) && /\bcop(y|ies|ied)\b/i.test(copy),
    );
    expect(elsewhere, "only the middle band is credited with being copied").toEqual([]);
    // AND THE MECHANISM IS OBSERVATION, stated plainly — not influence, not authority.
    expect(middle.qualifier).toContain("watched you do it");
  });

  test("the middle arrives LAST and lights on the pose its own claim lands", () => {
    // THE TEACHING ORDER IS THE ARGUMENT: top, then bottom, then MIDDLE. The two bands
    // that are missing something are established first, so the middle's claim lands as a
    // conclusion the room has already assembled. This is also the weld `isMiddleLit`
    // names in as many words — it reads the LAST claim pose, so a re-sorted teaching
    // order would light the wrong band.
    expect(C.bands.map((band) => band.claimBeat)).toEqual([0, 2, 1]);
    expect([...C.bands.map((band) => band.claimBeat)].sort()).toEqual([0, 1, 2]);
    expect(C.bands[MIDDLE].claimBeat).toBe(CLAIM_BEATS - 1);
    expect(showsBandClaims(MIDDLE, LAST_CLAIM_POSE)).toBe(true);
    expect(showsBandClaims(MIDDLE, LAST_CLAIM_POSE - 1)).toBe(false);
    expect(isMiddleLit(LAST_CLAIM_POSE)).toBe(true);
    expect(isMiddleLit(LAST_CLAIM_POSE - 1)).toBe(false);
    // The light and the claim are ONE event — the band gets brighter BECAUSE of what has
    // just been said about it.
    expect(arrivalPose((p) => showsBandClaims(MIDDLE, p))).toBe(LAST_CLAIM_POSE);
  });

  test("the two translations are what the middle DOES — one down, one up, at once", () => {
    // THE CLOSE IS THE TWO TRANSLATIONS: a mandate downward into actual work, and actual
    // work upward into the next decision. Two directions, at once, from one place.
    expect(C.downward).toMatch(/^You turn\b/);
    expect(C.upward).toMatch(/^You turn\b/);
    // The downward one picks the TOP band's keyword back up by name — the room has
    // already been told the mandate exists and where it comes from, so the only new
    // information is the verb, and the verb is the job.
    expect(C.downward).toContain("a mandate");
    expect(C.bands[TOP].holdsKw[0]).toBe("the mandate");
    // The upward one carries an obstruction somebody ran into, not a report somebody
    // wrote — and it lands on a decision taken ABOVE this room, which is the inverted
    // referent `content.ts`'s collision census records.
    expect(C.upward).toContain("what they hit");
    expect(C.upwardKw).toEqual(["the next decision"]);
    expect(C.upward).toContain("made above you");
    // ONE LABEL FOR BOTH, spelled rather than numbered (nothing on this stage carries a
    // numeral), and it names no direction: two mono headings reading UPWARD and DOWNWARD
    // are the closest this stage could come to drawing a scale by accident.
    expect(C.translationEyebrow).toBe("THE TWO TRANSLATIONS");
    expect(C.translationEyebrow).not.toMatch(/\b(up|down|upward|downward)\b/i);
  });

  test("the closer hands the spreading to the room, not to the presenter", () => {
    // PINNED, DELIBERATELY — the second of this file's four literals. This is the
    // sentence the whole chart exists to earn and the one the AC turns on: the deck
    // disclaiming itself as the delivery mechanism. A copy change here has to be a
    // conscious one, because the refusal is the argument, not the wording around it.
    expect(C.closer).toBe(
      "Nothing in this room reaches your teams through me. It reaches them through you.",
    );
    // THE ORDER IS THE ARGUMENT: the refusal first, the handover second. Reversed, the
    // room would take away the presenter.
    expect(C.closer.indexOf("through me")).toBeLessThan(C.closer.indexOf("through you"));
    // AND THE ITALIC IS ON THE HANDOVER, never on the refusal — it is the last emphasis
    // the room takes away.
    expect(C.closerKw).toEqual(["through you"]);
  });

  test("and the whole argument is on the stage together at the last pose", () => {
    // THE PARTS ABOVE ARE ONLY A CLAIM IF THEY ARRIVE TOGETHER. This is the same three
    // parts, read back out of the DOM at `canonicalPose` — the one frame the PDF and the
    // PPTX print, and therefore the one that has to be readable with no presenter
    // attached.
    const { container, unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    const stage = stageTextWithoutFigLabel(container);

    // PINNED, the third literal: the headline is measured to ONE line under BOTH font
    // faces (`HEADLINE_BUDGET_CHARS`), and it is the only place the deck spends the
    // top-down / middle-out vocabulary. A reword is a re-measure, so it has to be
    // conscious.
    expect(C.headline).toBe("Adoption is not top-down. It spreads out from the middle.");
    expect(C.headlineKw).toEqual(["spreads out from the middle"]);
    expect(container.querySelector("h1")?.textContent).toBe(C.headline);

    // The kicker — the one piece of addressing, standing since pose 0 so the room reads
    // all three bands already knowing which one it is in. The fourth and last literal.
    expect(C.kicker).toBe("THE MIDDLE IS THIS ROOM");
    expect(screen.getByTestId("middle-out-kicker").textContent).toBe(C.kicker);

    for (const band of C.bands) {
      expect(screen.getByTestId(`middle-out-band-${band.id}-name`).textContent, band.id).toBe(
        band.label,
      );
      expect(screen.getByTestId(`middle-out-${band.id}-holds`).textContent, band.id).toBe(
        band.holds,
      );
      expect(screen.getByTestId(`middle-out-${band.id}-qualifier`).textContent, band.id).toBe(
        band.qualifier,
      );
      expect(
        screen.getByTestId(`middle-out-${band.id}-holds-eyebrow`).textContent,
        band.id,
      ).toBe(band.holdsEyebrow);
      expect(
        screen.getByTestId(`middle-out-${band.id}-qualifier-eyebrow`).textContent,
        band.id,
      ).toBe(band.qualifierEyebrow);
    }
    expect(screen.getByTestId("middle-out-translation-eyebrow").textContent).toBe(
      C.translationEyebrow,
    );
    expect(screen.getByTestId("middle-out-upward").textContent).toBe(C.upward);
    expect(screen.getByTestId("middle-out-downward").textContent).toBe(C.downward);
    expect(screen.getByTestId("middle-out-closer").textContent).toBe(C.closer);
    expect(figLabelText(container)).toBe(C.figLabel);
    expect(C.figLabel).toBe("MIDDLE-OUT");

    // AND THE CENSUS IS EXACT IN BOTH DIRECTIONS: what the stage prints IS the nineteen
    // strings the keyword rule partitions, no more and no fewer. A twentieth string
    // cannot render without landing in `PROSE` or in `LABELS` first.
    expect(stagePrintedStrings(container).sort()).toEqual(printedStrings().sort());
    expect(new Set(printedStrings()).size).toBe(PROSE.length + LABELS.length);
    expect(PROSE).toHaveLength(10);
    expect(LABELS).toHaveLength(9);
    // The boxes, counted: nothing on the stage is missing and nothing is drawn twice.
    const ids = [...container.querySelectorAll<HTMLElement>("[data-testid^='middle-out-']")].map(
      (el) => el.dataset.testid,
    );
    expect(ids.sort()).toEqual([...EVERY_BOX].sort());
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(400);
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the audience is the SPREADER, never the target
// ─────────────────────────────────────────────────────────────────────────────

describe("the room is the subject of this slide, never its object", () => {
  /** The vocabulary of being ROLLED OUT TO. Each pattern names a construction in which
   *  adoption happens TO the audience — which is the argument this slide is not making,
   *  and the one a diagram of three stacked bands slides into by default. Fired against
   *  sentences below so a pattern that matched nothing could not pass for a rule. */
  const DONE_TO_YOU: ReadonlyArray<readonly [string, RegExp]> = [
    ["a rollout", /\broll(ed|ing)?[- ]?outs?\b|\brollouts?\b/i],
    ["a cascade", /\bcascad\w*\b/i],
    ["being deployed to", /\bdeploy\w*\b/i],
    ["change management", /\bchange management\b/i],
    ["an adoption programme", /\badoption (programme|program)\b/i],
    ["being onboarded", /\bonboard\w*\b/i],
    ["being trained", /\b(trained|training)\b/i],
    ["being enabled", /\benabl\w*\b/i],
  ];

  test("the middle band's copy addresses the room, in the second person", () => {
    // THE KICKER SAYS IT FIRST AND STANDS AT EVERY POSE, so the room reads the chart
    // knowing which row it is in before any claim lands.
    expect(C.kicker).toMatch(/\bROOM\b/);
    // THE MIDDLE BAND'S SECOND ROW IS ADDRESSED, and it is the only band row that puts
    // the room in the second person as the thing being copied.
    const middle = C.bands[MIDDLE];
    expect(middle.qualifier).toMatch(/\byour\b/i);
    expect(middle.qualifier).toMatch(/\byou\b/i);
    // AND THE TWO TRANSLATIONS — what the middle DOES — put the room in the SUBJECT
    // position of an active verb, twice. That is a deliberate near-miss with C.1's six
    // "You decide" beats: a different verb, twice rather than six times.
    expect(C.downward).toMatch(/^You turn\b/);
    expect(C.upward).toMatch(/^You turn\b/);
    // …and the closer's italic is the only other phrase on the stage aimed at the person
    // in the chair.
    expect(C.closerKw).toEqual(["through you"]);
  });

  test("nothing on the stage is done TO the room", () => {
    const { container, unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage, "positive control: the stage is not empty").toContain(C.closer);
    for (const [name, pattern] of DONE_TO_YOU) {
      for (const copy of authoredStrings()) {
        expect(pattern.test(copy), `"${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `"${name}" reached the stage`).toBe(false);
    }
    // POSITIVE CONTROLS: every pattern fires on the sentence it was written to refuse, so
    // the eight rules above are alive rather than eight regexes that match nothing.
    const REFUSED = [
      "We will roll out to the divisions next quarter.",
      "A cascade down through the org.",
      "The platform is deployed to every team.",
      "A change management workstream owns it.",
      "An adoption programme, run centrally.",
      "Your people will be onboarded in March.",
      "Everybody gets trained first.",
      "The centre enables the divisions.",
    ];
    DONE_TO_YOU.forEach(([name, pattern], i) => {
      expect(pattern.test(REFUSED[i]), `"${name}" does not fire on its own control`).toBe(true);
    });
    unmount();
  });

  test("no first-person plural anywhere, and exactly one first-person word at all", () => {
    // "through me" IS THE ONLY FIRST-PERSON WORD ON THE STAGE, and it is a REFUSAL — the
    // presenter saying the deck is not the delivery mechanism. A "we" anywhere would make
    // the slide a plan somebody else is running; a second "I" would make it a story.
    const { container, unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    const stage = stageTextWithoutFigLabel(container);
    for (const copy of [...authoredStrings(), stage]) {
      expect(copy, `first person plural in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(we|we're|we've|our|ours|us)\b/i,
      );
      expect(copy, `first person singular in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(I|I'm|I've|my|mine)\b/,
      );
    }
    expect(stage.match(/\bme\b/g) ?? [], "exactly one `me`, in the closer").toHaveLength(1);
    expect(C.closer).toMatch(/\bme\b/);
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · §6.6 · NO NEW LADDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The scale vocabulary, refused BY WORD — guardrail 6 in `content.ts`, transcribed as one
 * regex because that guardrail is itself a list of words.
 *
 * `gap-capability-ladder` owns L1–L5 and `mandate-phases-gates` owns P0–P3, and a single
 * borrowed noun here would make the room start counting. `\bsteps?\b` is in the list on
 * the guardrail's own authority — bare "step" is ladder vocabulary on a stage of three
 * stacked boxes, and it covers "step N" without needing a numeral the digit rule already
 * forbids.
 */
const LADDER =
  /\b(levels?|maturity|stages?|rungs?|tiers?|ladders?|phases?|steps?|L[1-5]|P[0-3])\b/i;

describe("no new ladder — §6.6's third-ladder refusal, held by word and by geometry", () => {
  test("the regex bites, and it does not bite the shipped copy", () => {
    // NEGATIVE CONTROLS FIRST, so a future reader can see the rule is alive before
    // reading the absence it proves. Both are real: "THE BOARD AND THE C-LEVEL" is the
    // top band's DRAFTED label, cut for this exact match, and "one rung up" is the
    // sentence a reviewer reaches for when describing what this chart looks like.
    expect(LADDER.test("THE BOARD AND THE C-LEVEL")).toBe(true);
    expect(LADDER.test("one rung up")).toBe(true);
    expect(LADDER.test("a maturity model")).toBe(true);
    expect(LADDER.test("stage 2 of 4")).toBe(true);
    // AND IT FIRES ON THE TWO LADDERS IT EXISTS TO PROTECT, read off their live modules
    // rather than off a sentence written here to make it fire.
    expect(walkStrings(gapLadderContent).some((copy) => LADDER.test(copy))).toBe(true);
    expect(walkStrings(mandatePhasesGatesContent).some((copy) => LADDER.test(copy))).toBe(true);

    // …and it matches nothing this slide authors.
    for (const copy of authoredStrings()) {
      expect(copy, `scale vocabulary in ${JSON.stringify(copy)}`).not.toMatch(LADDER);
    }
  });

  test("prints NO DIGIT AT ALL, in the copy and on the stage", () => {
    // A STAGE WITH NO NUMERAL ON IT CANNOT BE READ AS A SCALE, and an absence is testable
    // in a way that a list of forbidden values is not. It also keeps this slide from
    // re-spending B.1's 70/30 — the one split the leader deck has already quantified —
    // and from carrying the unsourced "3.5×" figure `content.ts` refuses at length.
    for (const copy of authoredStrings()) {
      expect(copy, `a digit in ${JSON.stringify(copy)}`).not.toMatch(/\d/);
    }
    const { container, unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    expect(
      container.querySelector(".fig-label")?.textContent,
      "the derived reference is there to strip",
    ).toContain(`${AT.letter}.${AT.num}`);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(400);
    expect(stage).not.toMatch(/\d/);
    expect(stage).not.toMatch(LADDER);
    unmount();
  });

  test("no band carries an index, an ordinal or anything beside its name", () => {
    const { unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    const ORDINAL = /\b(first|second|third|fourth|fifth|1st|2nd|3rd|4th|5th)\b/i;
    for (const band of C.bands) {
      const name = screen.getByTestId(`middle-out-band-${band.id}-name`);
      expect(name.textContent, band.id).toBe(band.label);
      expect(name.textContent, `${band.id} · a numeral`).not.toMatch(/\d/);
      expect(name.textContent, `${band.id} · an ordinal`).not.toMatch(ORDINAL);
      // No leading enumeration either — "1.", "I)", "A —".
      expect(name.textContent, `${band.id} · a leading index`).not.toMatch(
        /^\s*([0-9]+|[IVX]+|[A-Z])\s*[.):—-]/,
      );
      // THE BAND'S OWN RECTANGLE CARRIES NOTHING. Guardrail 1 says the mono row label is a
      // band's whole identity and nothing is rendered beside it — an empty box is that
      // rule as a fact.
      const box = screen.getByTestId(`middle-out-band-${band.id}`);
      expect(box.textContent, band.id).toBe("");
      expect(box.children.length, band.id).toBe(0);
    }
    // AND NO ORDINAL ANYWHERE ELSE ON THE STAGE EITHER: an ordinal in a claim row would
    // number the bands just as effectively as one in a label.
    for (const copy of authoredStrings()) {
      expect(copy, `an ordinal in ${JSON.stringify(copy)}`).not.toMatch(ORDINAL);
    }
    unmount();
  });

  test("all three bands are the same box — equal geometry is the anti-ladder guarantee", () => {
    // THE GUARANTEE LIVES IN `middle-out-geometry.ts` PRECISELY SO A COPY EDIT CANNOT
    // UNDO IT: one height, one width, one left edge and one placement function, `i ×
    // pitch`. A chart whose rows differ only in what they say is an org chart; one whose
    // rows differ in SIZE is a scale.
    const { unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    const boxes = C.bands.map((band) => screen.getByTestId(`middle-out-band-${band.id}`));
    for (const [i, box] of boxes.entries()) {
      expect(box.style.left, C.bands[i].id).toBe(`${BAND_LEFT}px`);
      expect(box.style.width, C.bands[i].id).toBe(`${BAND_WIDTH}px`);
      expect(box.style.height, C.bands[i].id).toBe(`${BAND_HEIGHT}px`);
      expect(box.style.top, C.bands[i].id).toBe(`${bandTop(i)}px`);
    }
    // ONE PITCH, EVENLY — no staircase, no inset, no indent.
    expect(new Set(boxes.map((b) => b.style.left)).size).toBe(1);
    expect(new Set(boxes.map((b) => b.style.width)).size).toBe(1);
    expect(new Set(boxes.map((b) => b.style.height)).size).toBe(1);
    for (let i = 1; i < C.bands.length; i++) {
      expect(bandTop(i) - bandTop(i - 1), `pitch ${i}`).toBe(BAND_PITCH);
    }
    // AND NOTHING SCALES OR TRANSFORMS A BAND — rank as MAGNITUDE is what a scale does.
    for (const [i, box] of boxes.entries()) {
      expect(box.style.transform, C.bands[i].id).toBe("");
    }
    unmount();
  });

  test("the two direction rules are simultaneous, equal and never collinear", () => {
    // A SINGLE LINE WITH THREE STOPS ON IT WOULD BE A SCALE, and two collinear strokes
    // with a gap between them read as exactly that. So: same length, same arrival, and
    // different x — with ONE horizontal mark on the whole stage, at the middle band's own
    // centre line.
    const { container, unmount } = renderSlide(TRANSLATION_POSE);
    const down = screen.getByTestId("middle-out-rule-downward");
    const up = screen.getByTestId("middle-out-rule-upward");
    expect(down.style.height).toBe(up.style.height);
    expect(down.style.width).toBe(up.style.width);
    expect(down.style.left).not.toBe(up.style.left);
    expect(arrival("middle-out-rule-downward")).toBe(arrival("middle-out-rule-upward"));
    // ONE ORIGIN BAR, and it is the only horizontal mark: a second and third at the outer
    // bands' centre lines were drawn and cut, because three evenly spaced marks on a
    // vertical rail are a scale with three stops on it.
    const horizontal = [...container.querySelectorAll<HTMLElement>("[data-testid^='middle-out-']")]
      .filter((el) => el.style.height === "2px" && parseFloat(el.style.width) > 2)
      .map((el) => el.dataset.testid);
    expect(horizontal).toEqual(["middle-out-origin-bar"]);
    // NO ARROWHEAD AND NO SVG MARKER: the direction each rule means is said by which band
    // it reaches and by where its copy sits, and by nothing else.
    expect(container.querySelectorAll("svg, marker, polygon, path")).toHaveLength(0);
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the pose walk, forward and backward
// ─────────────────────────────────────────────────────────────────────────────

describe("the pose walk", () => {
  test("every gate is monotonic — nothing that has arrived can ever leave", () => {
    // THE PROPERTY, NOT AN EXAMPLE OF IT. Every gate in `middle-out-walk.ts` is a `>=`
    // against a pose, so a pose is everything argued so far and there is no state for a
    // later pose to undo. Asserted one pose PAST the end too, because the last pose of a
    // slide should be the pose that survives being over-shot — a `===` gate would make the
    // whole close vanish there.
    for (const { id, gate } of GATED) {
      for (const pose of [...POSES, STEP_COUNT, STEP_COUNT + 7]) {
        if (gate(pose)) {
          expect(gate(pose + 1), `${id} left the stage after pose ${pose}`).toBe(true);
        }
      }
    }
    expect(showsTranslations(STEP_COUNT + 7)).toBe(true);
    expect(isMiddleLit(STEP_COUNT + 7)).toBe(true);
  });

  test("every pose is complete at every stop, in both directions", () => {
    const { container, unmount } = renderSlide();
    const walk = [...POSES, ...[...POSES].reverse()];
    for (const pose of walk) {
      goToPose(pose);

      // THE SEVEN STANDING BOXES ARE UP AT EVERY STOP. Pose 0 IS the organisation, named
      // and nothing else, so the kicker, the three rectangles and the three names are
      // never gated and never removed.
      for (const id of STANDING_IDS) {
        expect(screen.getByTestId(id), `${id} at pose ${pose}`).toBeInTheDocument();
        if (!TEXTLESS_IDS.has(id)) {
          expect(screen.getByTestId(id).textContent, `${id} at pose ${pose}`).not.toBe("");
        }
      }

      for (const { id, gate } of GATED) {
        // A pose is everything argued so far: revealed iff its gate says so, at every
        // stop in BOTH directions — `on` is derived from the pose and not accumulated,
        // so walking back to 0 must un-reveal 1–4.
        expect(revealed(id), `${id} at pose ${pose}`).toBe(gate(pose));
        // AND THE COPY IS THERE, not merely the box: a path that dropped children would
        // still pass a class check.
        if (gate(pose) && !TEXTLESS_IDS.has(id)) {
          expect(screen.getByTestId(id).textContent, `${id} at pose ${pose}`).not.toBe("");
        }
      }

      // ZERO SMIL NODES AND NO `<svg>` AT EVERY STOP — the AC's jsdom half, under the
      // default motion preference. The `reduce` half is below.
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
          .length,
        `SMIL at pose ${pose}`,
      ).toBe(0);
      expect(container.querySelectorAll("svg").length, `svg at pose ${pose}`).toBe(0);
    }
    unmount();
  });

  test("each pose reveals exactly the set the walk says it does", () => {
    // THE PER-POSE SETS, DERIVED. Pose 0 arrives nothing (the chart is standing), poses
    // 1…3 each arrive one WHOLE band, and pose 4 arrives the rail, the label, the two
    // translations and the closer.
    expect(POSES.map((pose) => arrivingAt(pose).length)).toEqual([0, 4, 4, 4, 7]);
    // …and the band each claim pose arrives is the one `claimBeat` names, in the teaching
    // order top → bottom → MIDDLE.
    const bandOf = (pose: number) =>
      C.bands.find((band) => POSE.FIRST_CLAIM + band.claimBeat === pose)?.id;
    expect([1, 2, 3].map(bandOf)).toEqual(["board", "teams", "middle"]);
    for (const pose of [1, 2, 3]) {
      expect([...arrivingAt(pose)].sort()).toEqual(
        [
          `middle-out-${bandOf(pose)}-holds-eyebrow`,
          `middle-out-${bandOf(pose)}-holds`,
          `middle-out-${bandOf(pose)}-qualifier-eyebrow`,
          `middle-out-${bandOf(pose)}-qualifier`,
        ].sort(),
      );
    }
    expect([...arrivingAt(TRANSLATION_POSE)].sort()).toEqual(
      [
        "middle-out-rule-downward",
        "middle-out-rule-upward",
        "middle-out-origin-bar",
        "middle-out-translation-eyebrow",
        "middle-out-upward",
        "middle-out-downward",
        "middle-out-closer",
      ].sort(),
    );
  });

  test("no pose rests on evidence with its conclusion missing", () => {
    const { unmount } = renderSlide();

    // POSES 1–3 · EACH FINISHES A WHOLE BAND — what it holds AND the one further thing
    // that is true of it — rather than laying out three `holds` rows and then three
    // qualifiers, which would leave pose 1 resting on a stage that says only that
    // everybody has something.
    for (const pose of [1, 2, 3]) {
      goToPose(pose);
      const band = C.bands.find((b) => POSE.FIRST_CLAIM + b.claimBeat === pose)!;
      expect(revealed(`middle-out-${band.id}-holds`), `${band.id} holds`).toBe(true);
      expect(revealed(`middle-out-${band.id}-qualifier`), `${band.id} qualifier`).toBe(true);
      // THE EYEBROW AND ITS CLAIM ARRIVE ON THE SAME STEP, always: a HOLDS standing alone
      // over an empty measure for 90ms is a row that looks like it failed to load.
      for (const slot of ["holds", "qualifier"]) {
        expect(arrival(`middle-out-${band.id}-${slot}-eyebrow`), `${band.id} ${slot}`).toBe(
          arrival(`middle-out-${band.id}-${slot}`),
        );
      }
      // …and the pose RESTS on the second row, which is the one that costs something.
      expect(arrival(`middle-out-${band.id}-holds`)).toBeLessThan(
        arrival(`middle-out-${band.id}-qualifier`),
      );
      const last = arrival(`middle-out-${band.id}-qualifier`);
      for (const id of arrivingAt(pose)) {
        expect(arrival(id), `${id} must not outlast the pose's own conclusion`)
          .toBeLessThanOrEqual(last);
      }
      // AND NO BAND IS EVER HALF-ARGUED: at every pose a band's two rows agree.
      for (const other of C.bands) {
        expect(
          revealed(`middle-out-${other.id}-holds`),
          `${other.id} at pose ${pose}`,
        ).toBe(revealed(`middle-out-${other.id}-qualifier`));
      }
    }

    // POSE 4 · THE TWO TRANSLATIONS ARE ONE ARRIVAL, and the closer is LAST within the
    // pose. Staggering the two lines against each other by even 90ms would say "first
    // this, then that" about the one pair of marks the no-new-ladder guardrail protects;
    // the closer landing last is the separation the walk buys instead of spending a sixth
    // pose on it.
    goToPose(TRANSLATION_POSE);
    expect(arrival("middle-out-upward")).toBe(arrival("middle-out-downward"));
    const closer = arrival("middle-out-closer");
    for (const id of arrivingAt(TRANSLATION_POSE)) {
      if (id === "middle-out-closer") continue;
      expect(arrival(id), `${id} must not outlast the closer`).toBeLessThan(closer);
    }
    // …and the closer's own subject is on the stage with it, never behind it.
    expect(revealed("middle-out-upward")).toBe(true);
    expect(revealed("middle-out-downward")).toBe(true);
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · rank is a COLOUR TIER, never opacity and never size
// ─────────────────────────────────────────────────────────────────────────────

describe("the middle band is ranked in colour and in nothing else", () => {
  test("`data-lit` names exactly one band, and only from the pose it earns it", () => {
    // THE RANK IS PUBLISHED IN THE DOM rather than parsed back out of a border colour:
    // "which row is the argument about" is a fact about the figure, and reading it out of
    // a style string would make every check a check of the tier table's spelling.
    const { unmount } = renderSlide();
    for (const pose of [...POSES, ...[...POSES].reverse()]) {
      goToPose(pose);
      const lit = C.bands
        .filter((band) => screen.getByTestId(`middle-out-band-${band.id}`).dataset.lit === "true")
        .map((band) => band.id);
      expect(lit, `pose ${pose}`).toEqual(isMiddleLit(pose) ? [C.bands[MIDDLE].id] : []);
    }
    unmount();
  });

  test("at rest all three bands are identical — nothing is ranked before it is earned", () => {
    // POSE 0 IS THE ORGANISATION AND NOTHING ELSE. Three identical boxes are what makes
    // the ranking, when it lands, unmistakably the ARGUMENT rather than a decoration.
    const { unmount } = renderSlide(POSE.CHART);
    const captures = C.bands.map((_b, i) => bandCapture(i));
    for (const key of ["box", "name"] as const) {
      const styles = captures.map((c) =>
        [...c[key]].filter(([prop]) => prop !== "top").map(([p, v]) => `${p}:${v}`).join(";"),
      );
      expect(new Set(styles).size, `three ${key} styles at rest`).toBe(1);
    }
    expect(captures.map((c) => c.lit)).toEqual(["false", "false", "false"]);
    unmount();
  });

  test("from LAST_CLAIM_POSE the middle sits on a BRIGHTER rung of the same ramp", () => {
    const { unmount } = renderSlide(LAST_CLAIM_POSE);
    const middle = bandCapture(MIDDLE);
    for (const outer of [TOP, BOTTOM]) {
      const rest = bandCapture(outer);
      const where = `${C.bands[outer].id} → ${C.bands[MIDDLE].id}`;

      // THE BORDER AND THE NAME MOVE UP THE COPPER LADDER. Same family, higher rung —
      // `!==` would pass on a DARKER tier, which is the exact failure the rule forbids.
      for (const [key, prop] of [
        ["box", "border"],
        ["name", "color"],
      ] as const) {
        const was = brightnessOf(tokenIn(rest[key].get(prop)!, where), `${where} · ${prop}`);
        const now = brightnessOf(tokenIn(middle[key].get(prop)!, where), `${where} · ${prop}`);
        expect(now.family, `${where} · ${prop} · ladder`).toBe(was.family);
        expect(now.rung, `${where} · ${prop}`).toBeGreaterThan(was.rung);
      }

      // THE GROUND CHANGES FAMILY, deliberately and uniquely: a resting band is the
      // STAGE's own colour, so it is defined by its border alone and the fill channel is
      // left unspent — which lets the middle band GAIN a ground rather than change one.
      // Brightness across two ladders is not an ordering anyone can assert, so the claim
      // is stated as what it is.
      expect(rest.box.get("background-color"), `${where} · resting fill`).toContain(
        "var(--neutral-",
      );
      expect(middle.box.get("background-color"), `${where} · lit fill`).toContain("var(--copper-");
    }
    // AND THE ORIGIN BAR IS PAINTED IN THE MIDDLE BAND'S OWN TIER, which is the second
    // time the argument is made in colour rather than in size — one origin, two
    // directions, and the origin is the room.
    goToPose(TRANSLATION_POSE);
    const bar = screen.getByTestId("middle-out-origin-bar");
    expect(tokenIn(bar.style.backgroundColor, "origin bar")).toBe(
      tokenIn(bandCapture(MIDDLE).box.get("border")!, "lit border"),
    );
    unmount();
  });

  test("the two outer bands are BYTE-IDENTICAL between pose 0 and pose 4", () => {
    // "ATTENTION IS BOUGHT WITH ADDED LIGHT, NEVER SUBTRACTED" (§7.1). The other half of
    // the rank rule: the two outer bands lose NOTHING when the middle lights. Compared as
    // `outerHTML`, so a moved delay, a changed token, an added class or a dropped
    // attribute all fail — and the middle band is compared the same way as a positive
    // control, so this cannot pass because the capture stopped seeing anything.
    const { unmount } = renderSlide(POSE.CHART);
    const before = C.bands.map((_b, i) => bandCapture(i));
    goToPose(TRANSLATION_POSE);
    const after = C.bands.map((_b, i) => bandCapture(i));

    for (const outer of [TOP, BOTTOM]) {
      const id = C.bands[outer].id;
      expect(movedBetween(before[outer].box, after[outer].box), `${id} · box`).toEqual([]);
      expect(movedBetween(before[outer].name, after[outer].name), `${id} · name`).toEqual([]);
      expect(after[outer].boxHtml, `${id} · box markup`).toBe(before[outer].boxHtml);
      expect(after[outer].nameHtml, `${id} · name markup`).toBe(before[outer].nameHtml);
    }
    // POSITIVE CONTROL — the middle band DID move, and it moved in exactly three
    // declarations: the border, the ground and the name's colour. Not in a fourth.
    expect(movedBetween(before[MIDDLE].box, after[MIDDLE].box)).toEqual([
      "background-color",
      "border",
    ]);
    expect(movedBetween(before[MIDDLE].name, after[MIDDLE].name)).toEqual(["color"]);
    unmount();
  });

  test("no rank is carried in the opacity channel, at any pose", () => {
    // OPACITY ON THIS STAGE MEANS "HAS NOT ARRIVED YET", i.e. TIME — it is the channel
    // `Reveal` spends. The middle band has been on the stage since pose 0, so its
    // prominence cannot be spent there, and a reader who could read rank out of the
    // opacity channel would be reading a reveal as a ranking.
    const { unmount } = renderSlide();
    for (const pose of POSES) {
      goToPose(pose);
      for (const band of C.bands) {
        for (const id of [`middle-out-band-${band.id}`, `middle-out-band-${band.id}-name`]) {
          const el = screen.getByTestId(id);
          expect(el.style.opacity, `${id} at pose ${pose}`).toBe("");
          expect(el.classList.contains("fade"), `${id} at pose ${pose}`).toBe(false);
          // NO SIZE RANK EITHER — no transform, no scale, no halo outside the rectangle
          // `middle-out-geometry.ts` cut.
          expect(el.style.transform, `${id} at pose ${pose}`).toBe("");
          expect(el.style.boxShadow, `${id} at pose ${pose}`).toBe("");
        }
      }
    }
    unmount();
  });

  test("every colour this figure sets is a var on the copper or neutral ramp", () => {
    // THE PRECONDITION FOR EVERY "BRIGHTER" CLAIM ABOVE, and the enforcement of the
    // renderer's own rule: CSS vars only, no hex and no `rgba()` literal, anywhere —
    // including the two graphic tiers and the band grounds. `tokenIn` and `brightnessOf`
    // THROW rather than return, so this test is the one that reports a stray literal.
    const { container, unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    let seen = 0;
    for (const el of container.querySelectorAll<HTMLElement>("[data-testid^='middle-out-']")) {
      const id = el.dataset.testid!;
      for (const prop of ["color", "background-color", "border"]) {
        const value = declarations(el).get(prop);
        if (!value) continue;
        brightnessOf(tokenIn(value, `${id} · ${prop}`), `${id} · ${prop}`);
        seen++;
      }
    }
    // Non-vacuity: every one of the twenty-six boxes paints at least one colour, and the
    // three band rectangles paint two.
    expect(seen).toBeGreaterThanOrEqual(EVERY_BOX.length);
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · zero SMIL, no <svg>, under either motion preference
// ─────────────────────────────────────────────────────────────────────────────

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

  test("mounts zero SMIL nodes and no <svg> at every pose, and every pose is complete", () => {
    // SMIL IS INVISIBLE TO THE GLOBAL `prefers-reduced-motion` RULE — it squashes CSS
    // durations only — so a SMIL node would have to be gated at mount. This figure has
    // nothing to gate, and THAT is the claim: the census is identical under either
    // preference because nothing under this slide reads `matchMedia` at all. The mock
    // proves the markup is preference-independent, which is the half a DOM test owns; the
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

      // COMPLETE, NOT MERELY UNANIMATED: every string the pose has reached is on the
      // stage, and nothing the pose has not reached is.
      for (const id of STANDING_IDS) {
        if (!TEXTLESS_IDS.has(id)) {
          expect(screen.getByTestId(id).textContent, `reduce · pose ${pose} · ${id}`).not.toBe("");
        }
      }
      for (const { id, gate } of GATED) {
        expect(revealed(id), `reduce · pose ${pose} · ${id}`).toBe(gate(pose));
        if (gate(pose) && !TEXTLESS_IDS.has(id)) {
          expect(
            screen.getByTestId(id).textContent,
            `reduce · pose ${pose} · ${id} is empty`,
          ).not.toBe("");
        }
      }
    }
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the keyword register split — kw on PROSE only
// ─────────────────────────────────────────────────────────────────────────────

describe("the keyword rule", () => {
  test("exactly the ten prose strings carry a *Kw sibling, every keyword real", () => {
    // THE DIRECTORY'S RULE, stated at the top of `../../src/slides/leader-shape/content.ts`
    // and applied here without an exception. The BAND LABELS are the sharpest case: they
    // are the only mono strings on this stage a reader might mistake for prose, they are
    // what stands in place of an index (guardrail 1), and a copper italic inside one would
    // emphasise a fragment of somebody's job title.
    const blockKw = Object.keys(C).filter((k) => k.endsWith("Kw"));
    expect(blockKw.sort()).toEqual(["closerKw", "downwardKw", "headlineKw", "upwardKw"]);
    for (const band of C.bands) {
      expect(
        Object.keys(band).filter((k) => k.endsWith("Kw")).sort(),
        band.id,
      ).toEqual(["holdsKw", "qualifierKw"]);
      // The band's OWN keys, pinned — so a `labelKw` or a `holdsEyebrowKw` cannot be added
      // without this line failing first.
      expect(Object.keys(band).sort(), band.id).toEqual([
        "claimBeat",
        "holds",
        "holdsEyebrow",
        "holdsKw",
        "id",
        "label",
        "qualifier",
        "qualifierEyebrow",
        "qualifierKw",
      ]);
    }
    // EVERY `*Kw` ENTRY IS AN EXACT SUBSTRING OF ITS PARTNER. A keyword that does not
    // occur is a highlight that silently does nothing — the copy still reads, so nothing
    // on the stage says the emphasis was lost.
    for (const [name, copy, kws] of PROSE) {
      expect(Array.isArray(kws), name).toBe(true);
      expect(kws.length, `${name} carries no keyword`).toBeGreaterThan(0);
      for (const kw of kws) {
        expect(copy, `${name}Kw: "${kw}" is not in its prose`).toContain(kw);
      }
    }
    // THE NINE LABELS CARRY NO SIBLING AT ALL.
    for (const forbidden of ["figLabelKw", "kickerKw", "translationEyebrowKw", "bandsKw"]) {
      expect(Object.keys(C), forbidden).not.toContain(forbidden);
    }
    // A LABEL AND A PROSE STRING MAY NOT BE THE SAME STRING, which is what makes the
    // partition a partition rather than two overlapping lists.
    expect(new Set([...PROSE.map(([, copy]) => copy), ...LABELS]).size).toBe(
      PROSE.length + LABELS.length,
    );
  });

  test("no mono LABEL renders an <em>, while every prose box carries its own", () => {
    const { container, unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    const labelIds = [
      "middle-out-kicker",
      ...C.bands.map((band) => `middle-out-band-${band.id}-name`),
      ...C.bands.flatMap((band) => [
        `middle-out-${band.id}-holds-eyebrow`,
        `middle-out-${band.id}-qualifier-eyebrow`,
      ]),
      "middle-out-translation-eyebrow",
    ];
    for (const id of labelIds) {
      expect(screen.getByTestId(id).querySelectorAll("em").length, `<em> inside label ${id}`).toBe(
        0,
      );
    }
    // The fig label is a label too — the only copper text on the stage that is not a mono
    // heading — and it takes no emphasis either.
    expect(container.querySelector(".fig-label")?.querySelectorAll("em").length).toBe(0);
    // …and no label string carries stray markup of its own.
    LABELS.forEach((label) => expect(label).not.toContain("<em"));

    // …WHILE EVERY PROSE BOX DOES CARRY ITS OWN, one `<em>` per keyword — so the absence
    // above cannot pass because emphasis stopped rendering everywhere.
    const proseBoxes: ReadonlyArray<readonly [string, readonly string[]]> = [
      ...C.bands.flatMap(
        (band) =>
          [
            [`middle-out-${band.id}-holds`, band.holdsKw],
            [`middle-out-${band.id}-qualifier`, band.qualifierKw],
          ] as const,
      ),
      ["middle-out-upward", C.upwardKw],
      ["middle-out-downward", C.downwardKw],
      ["middle-out-closer", C.closerKw],
    ];
    for (const [id, kws] of proseBoxes) {
      const ems = [...screen.getByTestId(id).querySelectorAll("em")].map((em) => em.textContent);
      expect(ems, id).toHaveLength(kws.length);
      for (const kw of kws) expect(ems, `${id} · ${kw}`).toContain(kw);
    }
    // The headline is the tenth prose string, and it lives on the slide file rather than
    // inside the figure.
    expect(
      [...(container.querySelector("h1")?.querySelectorAll("em") ?? [])].map((em) => em.textContent),
    ).toEqual([...C.headlineKw]);
    expect(proseBoxes.length + 1).toBe(PROSE.length);
    unmount();
  });

  test("no authored string names a letter or a figure", () => {
    // §3.4 R2 / §3.5. This slide composes as the THIRD `shape` row today and becomes the
    // fourth once `shape-tam-kotter` inserts ahead of it, so a literal "C.3" or "SECTION
    // C" in this copy would be a lie on a projector within the week. The digit rule above
    // already forbids every numeral; these hold the SHAPES, so a failure says which kind
    // of reference was written.
    const FIGURE = /\b[A-N]\.\d+\b/;
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(FIGURE);
      expect(copy, copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      expect(copy, copy).not.toMatch(/\bnext (two|three|four|five)\b/i);
      expect(copy, copy).not.toMatch(/\b(slide|figure|deck)\b/i);
    }
    const { container, unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length).toBeGreaterThan(400);
    expect(stage).not.toMatch(FIGURE);
    unmount();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the nav floor
// ─────────────────────────────────────────────────────────────────────────────

describe("the whole figure clears the NavBar hover band", () => {
  test("the lowest painted box ends above y=632, with a positive clearance", () => {
    // THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM: `.nav-zone` is
    // `bottom: 0; height: 88px`, so its top edge is y=632 and the band is a hover target
    // whether or not the bar inside it is currently at opacity 0. Content under it is
    // content the presenter's own pointer makes the NavBar fade up over.
    expect(NAV_ZONE_TOP).toBe(632);
    expect(CLOSER_TOP + CLOSER_HEIGHT).toBe(600);
    expect(NAV_ZONE_CLEARANCE).toBe(NAV_ZONE_TOP - (CLOSER_TOP + CLOSER_HEIGHT));
    // DERIVED FROM BOTH ENDS, so an edit anywhere above — a taller register, a looser band
    // gap, a fourth band — moves it and this fails before the stage crosses the band. The
    // only thing worth asserting about it is that it stays positive.
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);

    // AND READ BACK OFF THE RENDERED STAGE, so a box the geometry does not know about
    // cannot sneak under the band: the lowest bottom edge of everything this figure
    // mounts is the closer's, and it is above the floor.
    const { container, unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    const bottoms = [...container.querySelectorAll<HTMLElement>("[data-testid^='middle-out-']")]
      .map((el) => ({
        id: el.dataset.testid!,
        bottom: parseFloat(el.style.top) + parseFloat(el.style.height),
      }))
      .filter((b) => Number.isFinite(b.bottom));
    expect(bottoms.length, "every box declares a top and a height").toBe(EVERY_BOX.length);
    const lowest = bottoms.reduce((a, b) => (b.bottom > a.bottom ? b : a));
    expect(lowest.id).toBe("middle-out-closer");
    expect(lowest.bottom).toBe(CLOSER_TOP + CLOSER_HEIGHT);
    expect(lowest.bottom).toBeLessThan(NAV_ZONE_TOP);
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
 * WHAT THIS IS NOT: a proof about images. Two slides can share a picture without sharing
 * a word, and no grep will ever see that — §6.2's real check is a human reading both.
 * This is the guard against the cheapest way to break it, which is lifting the other
 * slide's vocabulary.
 */
const RESERVED: ReadonlyArray<readonly [string, RegExp, "C.1" | "B.1" | "B.2"]> = [
  // C.1 — the same run, the same content file. Its six-beat stem and its closer.
  ["You decide", /\bYou decide\b/i, "C.1"],
  ["a decision on your desk", /\bon your desk\b/i, "C.1"],
  ["a tool purchase", /\bpurchase\b/i, "C.1"],
  ["an operating model", /\boperating model\b/i, "C.1"],
  ["the enabler", /\benabler\b/i, "C.1"],
  ["pillars", /\bpillars?\b/i, "C.1"],
  ["governance", /\bgovernance\b/i, "C.1"],
  ["companions", /\bcompanions?\b/i, "C.1"],
  ["a seat", /\bseats?\b/i, "C.1"],
  ["the pilot", /\bpilots?\b/i, "C.1"],
  ["culture", /\bculture\b/i, "C.1"],
  ["an agent", /\bagents?\b/i, "C.1"],
  // B.1 — the 70/30 and the sentence it opens on.
  ["not the tools", /\btools?\b/i, "B.1"],
  ["technology", /\btechnolog\w*\b/i, "B.1"],
  ["people & process", /people\s*&\s*process/i, "B.1"],
  ["procured", /\bprocure\w*\b/i, "B.1"],
  ["capability", /\bcapabilit\w*\b/i, "B.1"],
  ["BCG / McKinsey", /\b(BCG|McKinsey)\b/i, "B.1"],
  // B.2 — the unwritten rule and the improvisation it produced.
  ["no rule to break", /\brules?\b/i, "B.2"],
  ["improvises", /\bimprovis\w*\b/i, "B.2"],
  // "wrote" AND NOT "SOP". B.2 never prints the letters S-O-P — the absence of written
  // guidance is its whole subject and it names the artefact nowhere — so a pattern for it
  // could not be fired against B.2's own strings, which is the bar every entry in this
  // table has to clear. "Nobody wrote the rule. So everybody wrote their own." is the
  // sentence B.2 actually owns.
  ["wrote their own", /\bwrote\b/i, "B.2"],
  ["handed out", /\bhanded out\b/i, "B.2"],
];

describe("nothing here is re-spent from a neighbouring slide", () => {
  test("uses none of C.1's, B.1's or B.2's images — and every pattern fires", () => {
    const authored = authoredStrings();
    expect(authored.length, "a rule over an empty set proves nothing").toBeGreaterThan(20);

    const { container, unmount } = renderSlide(shapeMiddleOutSlide.canonicalPose!);
    const stage = stageTextWithoutFigLabel(container);
    for (const [name, pattern, owner] of RESERVED) {
      for (const copy of authored) {
        expect(pattern.test(copy), `${owner}'s "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `${owner}'s "${name}" reached the stage`).toBe(false);
    }
    // THE BARE `70/30`, refused separately and for the reason B.2's own test records: B.1
    // never prints that spelling either — §6.5's ladder owns it — so a pattern for it
    // cannot be fired against B.1's strings without a false claim about where it came
    // from. It is still refused, because B.1's split IS 70 against 30.
    expect(stage).not.toMatch(/\b70\s*\/\s*30\b/);
    unmount();

    // EVERY PATTERN FIRED AGAINST THE SLIDE IT WAS READ OFF. Twenty-two regexes that
    // matched nothing would make the rule above pass on copy lifted verbatim from any of
    // the three — so each one is checked against that slide's REAL strings, not against a
    // sentence written here to make it fire.
    const corpora = { "C.1": c1Strings(), "B.1": b1Strings(), "B.2": b2Strings() } as const;
    for (const [name, pattern, owner] of RESERVED) {
      expect(
        corpora[owner].some((copy) => pattern.test(copy)),
        `"${name}" is supposed to be ${owner}'s, but ${owner} does not print it`,
      ).toBe(true);
    }
  });

  test("the one word it does share with C.1 is shared with its referent INVERTED", () => {
    // `decision` APPEARS ON BOTH SLIDES AND THAT IS DELIBERATE. C.1 spends six beats on
    // decisions that are ON this room's desk; this line is about the ones that are NOT,
    // and the room's hold over those is exactly the upward translation. Same noun,
    // inverted referent — recorded in `content.ts`'s collision census, and pinned here so
    // the near-miss stays deliberate rather than becoming an echo.
    const mine = authoredStrings().filter((copy) => /\bdecisions?\b/i.test(copy));
    expect(mine).toEqual([C.upward, "the next decision"]);
    expect(C.upward).toContain("made above you");
    expect(C.upward).not.toMatch(/\byour decision\b/i);
    // C.1's own use of the word is the one being inverted.
    expect(shapeOrgContent.closer).toMatch(/\bdecision\b/);
    expect(shapeOrgContent.closer).toContain("on your desk");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · no brand axis — issue #68 refuses one in as many words
// ─────────────────────────────────────────────────────────────────────────────

describe("no brand axis", () => {
  test("the component reads no variant and the block hides no resolver", () => {
    // §4.4's seven brand × deckSet slots do not list this slide, so there is no
    // `…For(brand)` resolver to call and the slide component takes no props. An ORG CHART
    // is not an organisation's own evidence: every organisation in this group has a board,
    // division heads and teams, and naming one of them would be inventing a fact to fill a
    // fork.
    expect(ShapeMiddleOut.length).toBe(0);
    for (const copy of authoredStrings()) {
      expect(copy, `an organisation in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(GEMS|GEMVIS|Berau|DigiTech|MineTech|Nanovest|Sinar Mas)\b/i,
      );
    }
    // A `Record<Brand, …>` reachable from this block would be a brand axis nobody
    // declared. Every value is a string, a number, or a readonly array/tuple of those —
    // and no value is a function.
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

describe("both leader decks print the same stage", () => {
  // BRAND INVARIANCE IS A CLAIM ABOUT MODULE EPOCHS — `VARIANT` resolves once at module
  // scope — so it cannot be checked inside the one epoch every test above runs in. Two
  // epochs, byte for byte, at EVERY pose, following `gap-no-sop.test.tsx`, which is the
  // shipped precedent for a leader slide with no brand axis at all.
  //
  // NOT `SlideHarness`, deliberately: it imports `composedDeck` statically and would hand
  // a freshly loaded slide a stale context object. This is the same-epoch dynamic-import
  // pattern `variant-composition.test.tsx` documents.
  const LEADER_VARIANTS: readonly VariantId[] = ["berau-leader", "gems-leader"];

  /** One epoch's stage, captured at every pose. The slide is rendered inside a wrapper so
   *  the comparison sees the FIGURE and not the walk buttons beside it. */
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

    // THE POSITION IS READ OFF THE COMPOSED DECK WHEN THERE IS ONE, and falls back to the
    // harness input otherwise — so this test says nothing about WHERE the slide composes.
    // That is the next describe's claim; what is asserted here is that the two leader
    // rooms read the same bytes.
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
    // interleave, two stages share one DOM, and every query finds two elements.
    const berau = await stagesFor(LEADER_VARIANTS[0]);
    const gems = await stagesFor(LEADER_VARIANTS[1]);
    expect(berau).toHaveLength(STEP_COUNT);
    expect(gems).toHaveLength(berau.length);
    for (let pose = 0; pose < berau.length; pose++) {
      // MARKUP AND TEXT BOTH: a brand axis could move a colour token or a delay without
      // changing a word, and `textContent` alone would not see it.
      expect(berau[pose].html, `pose ${pose} · markup`).toBe(gems[pose].html);
      expect(berau[pose].text, `pose ${pose} · text`).toBe(gems[pose].text);
    }
    // Not vacuously: a stage that rendered nothing would also be equal.
    const last = berau[berau.length - 1];
    expect(last.text).toContain(C.headline);
    expect(last.text).toContain(C.bands[MIDDLE].label);
    expect(last.text).toContain(C.bands[MIDDLE].qualifier);
    expect(last.text).toContain(C.closer);
    // AND THE CAPTURE IS POSE-SENSITIVE, which `textContent` alone cannot show: every box
    // is MOUNTED at every pose and gated by a class, so the text is identical at all five
    // and only the markup moves. A capture that read text alone would compare two decks
    // agreeing about a string neither of them had revealed.
    expect(berau[0].text, "text is pose-invariant here, by construction").toBe(last.text);
    expect(berau[0].html, "markup is not").not.toBe(last.html);
    expect(new Set(berau.map((s) => s.html)).size, "five distinct poses").toBe(STEP_COUNT);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC · the TAIL POSITION in the `shape` run
// ─────────────────────────────────────────────────────────────────────────────

describe("the composed leader decks", () => {
  // A LEADER EPOCH, loaded dynamically. `VARIANT` resolves at module scope, so reading a
  // leader deck means re-pointing `window.location` and resetting the registry — which is
  // why this describe uses no `SlideHarness` (see that file's "ONE EPOCH" note) and
  // compares slides by id rather than by identity.
  const LEADER: readonly VariantId[] = ["berau-leader", "gems-leader"];
  /** The three decks §4.3 leaves this slide OUT of — every variant whose deck set is
   *  `standard`. Named by VARIANT ID, which is what the composer reads. */
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

  test("this slide is the LAST `shape` row, immediately behind f8-your-agentic-os", async () => {
    for (const variant of LEADER) {
      const deck = await deckFor(variant);
      const run = deck.slides.filter((s) => s.sectionKey === "shape");

      // THE WHOLE RUN, ENUMERATED. Kept as a whole-run comparison rather than narrowed to
      // "the last one is mine", because the failure worth catching is a fourth row
      // arriving in the WRONG place — between C.1 and f8, where `shape-tam-kotter` is due
      // — and a narrowed assertion would stay green through exactly that.
      expect(run.map((s) => s.def.id), variant).toEqual([
        "shape-agentic-org",
        "f8-your-agentic-os",
        "shape-middle-out",
      ]);
      expect(run[run.length - 1].def.id, variant).toBe("shape-middle-out");

      // IMMEDIATELY BEHIND f8, in the DECK's order and not merely in the run's — the two
      // are the same thing only while the run is contiguous, which is what R4 requires and
      // what a `sectionOverrides` edit could break without touching the list above.
      const at = deck.slides.findIndex((s) => s.def.id === "shape-middle-out");
      const f8 = deck.slides.findIndex((s) => s.def.id === "f8-your-agentic-os");
      expect(at, `${variant} composes shape-middle-out`).toBeGreaterThan(-1);
      expect(at, variant).toBe(f8 + 1);
      expect(deck.slides[at].sectionKey, variant).toBe("shape");

      // THE LETTER IS PINNED AND THE NUMBER IS NOT. `shape` is C in both leader decks and
      // §4.3 keeps it there — the runs in front of it are settled — so C is a stable fact
      // worth pinning as a literal, exactly as C.1's own test pins it. The NUMBER is not:
      // this row prints C.3 today and C.4 the day `shape-tam-kotter` inserts ahead of it,
      // so it is asserted only as "however long the run is", which is true under both.
      expect(deck.letterOf("shape"), variant).toBe("C");
      expect(deck.slides[at].letter, variant).toBe("C");
      expect(deck.slides[at].num, variant).toBe(run.length);
      // …and it is the highest number in its own run, which is what "tail" means.
      // `num` is `number | null` on a deck row — the cover is unnumbered — so the run is
      // narrowed rather than cast, which also asserts that every `shape` row IS numbered.
      const nums = run.map((s) => s.num).filter((n): n is number => n !== null);
      expect(nums, `${variant} · every shape row is numbered`).toHaveLength(run.length);
      expect(Math.max(...nums), variant).toBe(deck.slides[at].num);
    }
  });

  test("and no standard deck runs it at all", async () => {
    for (const variant of STANDARD) {
      const deck = await deckFor(variant);
      expect(deck.slides.some((s) => s.def.id === "shape-middle-out"), variant).toBe(false);
      // There is no `shape` run in a standard deck at all — the section is the leader
      // decks' own, and f8 is back where it was authored, inside `techniques`.
      expect(deck.letterOf("shape"), variant).toBeUndefined();
      expect(
        deck.slides.find((s) => s.def.id === "f8-your-agentic-os")?.sectionKey,
        variant,
      ).toBe("techniques");
    }
  });
});
