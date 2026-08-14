// THE AGENTIC ORGANIZATION · slide tests. BOTH poses, all three brands, and the
// pointer that replaced the other seven.
//
// ────────────────────────────────────────────────────────────────────────────
// WHAT CHANGED UNDER THIS FILE, because half of it is a rewrite rather than an
// edit. The slide used to be NINE poses — hub · ring · six decision beats · closer
// — and `focusedPillarIndex(pose)` was the whole interaction model, so every test
// here could ask one pure function what the stage should look like and then read the
// DOM back. That walk is retired (owner call, 2026-08-13). There are TWO poses now,
// the figure arrives complete inside the first of them, and WHICH DECISION IS OPEN is
// answered by the POINTER: `resolveFocus(pinned, hovered, focused)`.
//
// So the shape of the testing changes with it, in exactly one way that matters: the
// interesting states are no longer reachable by stepping, they are reachable by
// hovering, clicking and tabbing. `@testing-library/user-event` is therefore a
// first-class dependency of this file and not a convenience — a `fireEvent.mouseOver`
// would not produce the enter/leave PAIR that the fall-back-to-the-pin rule is made
// of, and it would not fire the focus/blur that the caret channel exists to keep
// separate from the pointer one.
// ────────────────────────────────────────────────────────────────────────────
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so nothing here measures
// a pixel a browser would place — every geometric claim is asserted as the ONE NUMBER
// both sides read (`../../src/slides/leader-shape/geometry.ts`), and the rendered
// composition is walked at 1280×720 in a real engine separately
// (`scripts/gh55-verify.mjs`). What jsdom is good for is the five things this slide
// is actually at risk of:
//
//   1. THE FLOOR. §7.1 recorded one open risk against variant A — the lowest pillar
//      sits close to the NavBar's hover band and GROWS when it is lit. The prototype's
//      numbers put it 26px inside the band, and 32.66px inside it once focused. That
//      is arithmetic, and arithmetic is checkable here. It is now a claim about ALL
//      SIX AT ONCE, because the recap lights all six.
//   2. THE PILLAR → DECISION MAPPING. Six boxes, six decision blocks, and a pointer
//      that must open exactly one of them and exactly the right one. "Which box is
//      lit" is published as `data-active`, "which is pinned" as `data-pinned`, and
//      "which block is open" as `data-open`, so the whole map is readable in the DOM.
//   3. THE NO-DIM RULE (§7.1 — attention is bought with added light, never
//      subtracted). At every hover the five pillars the hover is NOT about must be
//      byte-identical to their resting selves. Eleven style fields captured once and
//      compared field by field is exactly what jsdom can read, and the cheapest way to
//      break it is to port the prototype's three-tier walked/unvisited ranking.
//   4. PRE-DIMMING AT REST. The same rule with nothing hovered at all: six identical
//      borders, six identical label tiers, six identical spokes, six identical flows.
//   5. THE STATE MACHINE ITSELF. Hover beats pin, pin survives the pointer leaving,
//      a second click releases, a different click moves it, and the recap ignores all
//      of it. Those are pure functions in `walk.ts` and they are asserted there AND
//      through the rendered tree, because the failure worth catching is the seam.
//
// WHAT IT CANNOT: a transition, and now also a keyframe. jsdom runs neither, so "the
// figure builds itself out from the hub over 1.42s" and "no delay lands on a focus
// property" are not claims this file can make — they are declarations in the renderer
// and measurements in the browser harness. What IS checkable here is that every
// build-carrying element is in the tree from the first frame with its stagger on it,
// which is the half a missing element would break.
//
// ALL THREE BRANDS IN ONE EPOCH. The component reads no `VARIANT` — the slide file
// resolves the hub's brand line once at module scope and hands it down as a prop
// (§4.4 slot 5) — so three hubs mount side by side in this one module registry. A
// test that had to re-point `window.location` per brand could not compare them.
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  ShapeAgenticOrg,
  shapeAgenticOrgSlide,
} from "@/slides/leader-shape/shape-agentic-org";
import {
  decisionCounter,
  hubBrandLineFor,
  shapeOrgContent,
} from "@/slides/leader-shape/content";
// Imported for TWO describes — the figure takes its pose as a prop, so it can be
// asked about a pose the slide's own step count cannot reach, and it can be compared
// byte for byte without the harness's own chrome in the container. Everything else
// here goes through the slide, because that is what the deck renders.
import { PillarOrbit } from "@/slides/leader-shape/components/PillarOrbit";
import {
  FIGURE_CEILING,
  FOCUSED_LOWEST_PILLAR_BOTTOM,
  FOCUSED_MARGIN_INTRUSION,
  FOCUSED_NAV_ZONE_CLEARANCE,
  FOCUSED_OUTERMOST_LEFT,
  FOCUSED_OUTERMOST_RIGHT,
  FOCUSED_WALK_COLUMN_GAP,
  FOCUS_GROWTH_RESERVE,
  FOCUS_GROWTH_SPENT,
  FOCUS_HALO_WIDTH,
  FOCUS_SCALE,
  HUB,
  LOWEST_PILLAR_BOTTOM,
  LOWEST_PILLAR_INDEX,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  PILLAR_BOX,
  PILLAR_CENTRES,
  PILLAR_COUNT,
  RING,
  SIDE_MARGIN,
  SPOKE_STANDOFF,
  WALK_COLUMN,
  WALK_COLUMN_LEFT,
  focusedPillarBox,
  pillarBox,
  pillarCentre,
  spokeSegment,
} from "@/slides/leader-shape/geometry";
import {
  NO_FOCUS,
  POSE,
  PILLAR_COUNT as WALK_PILLAR_COUNT,
  STEP_COUNT,
  acceptsPointer,
  isLit,
  isPillarIndex,
  resolveFocus,
  showsRecap,
  togglePin,
} from "@/slides/leader-shape/walk";
import { BRANDS, type Brand } from "@/deck-variants";
// The design system's own two ladders. Imported for their KEYS, never their hexes —
// see `rampOf` below for why that distinction is the whole point.
import { copper, neutral } from "@/design-system/colors";

const C = shapeOrgContent;

/**
 * Both, DERIVED — `[0 … STEP_COUNT - 1]`.
 *
 * NOT A LITERAL `[0, 1]`, even at two. The derivation is what keeps every "at every
 * pose" test in this file walking the whole budget if the budget ever moves again;
 * a hand-written list is how a pose gets added and silently never checked. It is
 * also two lines shorter than the argument for it.
 */
const POSES: readonly number[] = Array.from({ length: STEP_COUNT }, (_u, i) => i);

/** `0…5` — pillar INDEXES, which are not poses and are kept in their own list so a
 *  geometry loop cannot borrow the pose list and read right by accident. */
const PILLAR_INDEXES: readonly number[] = Array.from(
  { length: PILLAR_COUNT },
  (_u, i) => i,
);

/**
 * The eight things the panel holds, in tree order — the idle block, six decisions,
 * the recap.
 *
 * ALL EIGHT ARE MOUNTED AT ALL TIMES and exactly one of them carries
 * `data-open="true"`. That pair of facts is the panel's whole contract, and it is
 * stated as ONE list here so a test can assert both halves in one comparison: the
 * list proves nothing is missing, `openBlockIds()` proves nothing is doubled.
 */
const PANEL_BLOCKS: readonly string[] = [
  "shape-idle",
  ...C.pillars.map((p) => `shape-decision-${p.id}`),
  "shape-recap",
];

/**
 * The position the slide holds in the deck it actually composes into.
 *
 * `at` IS required here, and it is the one case `SlideHarness` documents: unit
 * tests resolve the default `general` deck, `general` has no leader variant, and
 * this slide reaches the two leader deck sets ALONE. So there is no derived
 * position to look up — which is itself the fact the composed-pair test at the
 * bottom of this file proves, from a deck that does run it.
 */
const AT = { letter: "C", num: 1, sectionKey: "shape" } as const;

/**
 * One button per pose, so a test can STEP the slide inside one mounted tree.
 *
 * KEPT AT TWO POSES, and it is worth saying why it is kept at all now that the
 * interesting states are reached with the pointer instead. Everything this file
 * asserts about the pin surviving a step, and about the recap not inheriting a lit
 * pillar, is a claim about a tree that has ALREADY BEEN somewhere else — a per-pose
 * re-mount would prove only that each pose renders from cold, which the deck never
 * does and which is not where the bug lives.
 */
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

function renderOrg(brandLine: string | null, pose = 0) {
  const out = render(
    <SlideHarness def={shapeAgenticOrgSlide} at={AT}>
      <Nav />
      <ShapeAgenticOrg brandLine={brandLine} />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

/** A pose change as the DECK makes one. A plain `.click()` and not `user.click()`,
 *  deliberately: the deck's own step buttons must not move the caret or the pointer,
 *  because half the assertions below are about what the pointer was doing before the
 *  step and must still be doing after it. */
function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

const gems = hubBrandLineFor("gems");
const berau = hubBrandLineFor("berau");

/**
 * Every brand the app REGISTERS, from `BRANDS` and not from the slide's own
 * table — which is why that table is not exported. A rule held over the keys of
 * the thing being checked proves the thing equals itself; held over `BRANDS` it
 * proves the pick answers for every brand that can actually reach a deck.
 */
const REGISTERED_BRANDS = Object.keys(BRANDS) as Brand[];

/** The tiers that count as "full strength" for a label — everything at or above
 *  `--neutral-200`. gh#50's floor is `--neutral-300`, so a label resting ON the
 *  floor is not full strength: it is a label with nothing left to lose. */
const FULL_LABEL_TIERS = [
  "var(--neutral-0)",
  "var(--neutral-50)",
  "var(--neutral-100)",
  "var(--neutral-200)",
];

/** Copper tiers dark enough to read as "not yet" on a near-black stage. A resting
 *  pillar may not use one: at rest there is no history to have skipped it, and while
 *  one pillar is open the other five are still at rest. */
const DIM_COPPER_TIERS = ["copper-700", "copper-800", "copper-900", "copper-950"];

// ── the two ramps, so "brighter" is an ordering and not a vibe ────────────────

/**
 * The copper ladder DARKEST FIRST, and the neutral ladder the same way — the two
 * ramps `src/design-system/colors.ts` declares, re-ordered by luminance so an index
 * into them IS a brightness.
 *
 * WHY AN ORDERING AND NOT A SET OF ALLOWED VALUES. §7.1's rule is directional —
 * "the active one *gains*" — so the only honest assertion about a focus tier is
 * that it is at or above its resting counterpart ON THE SAME LADDER. A test that
 * merely asserted `focus !== rest` would pass on a focus tier that is DARKER, which
 * is the exact failure the rule exists to forbid and the exact thing the prototype
 * does to its two inactive tiers.
 *
 * THE TIERS COME FROM `colors.ts`, THE ORDER COMES FROM THE SCALE. Both ladders are
 * single-hue and monotonic by construction — a higher key is a darker stop — so
 * sorting the exported keys descending IS luminance order, and no hex is compared.
 * That split is the point: retyping the eleven copper stops here would let a token
 * added to or removed from the design system leave this ramp quietly stale, and
 * computing brightness from the hexes would be a second implementation of "which of
 * two coppers is brighter" living in a test.
 *
 * So `neutral-950` is on the ramp although nothing on this slide uses it, and any
 * tier a later edit adds arrives here on its own.
 */
const rampOf = (scale: Record<number | string, string>, hue: string): readonly string[] =>
  Object.keys(scale)
    .map(Number)
    .sort((a, b) => b - a)
    .map((t) => `${hue}-${t}`);

const COPPER_RAMP: readonly string[] = rampOf(copper, "copper");
const NEUTRAL_RAMP: readonly string[] = rampOf(neutral, "neutral");

/**
 * The one `var(--…)` token inside a CSS declaration — `"1px solid var(--copper-600)"`
 * → `"copper-600"`.
 *
 * @throws when there is none, which is the assertion that matters as much as the
 *         token: the renderer's own rule is CSS vars only, no hex and no `rgba()`
 *         (the prototype writes `rgba(184,110,61,0.22)` for its focused fill), so a
 *         declaration with no token in it is a value that has stopped moving with
 *         the design system.
 */
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

/** A token's ladder and its rung, so two tiers can be compared as numbers.
 *  @throws on a token that is on neither ladder. */
function brightnessOf(token: string, what: string): { family: string; rung: number } {
  const copperRung = COPPER_RAMP.indexOf(token);
  if (copperRung >= 0) return { family: "copper", rung: copperRung };
  const neutralRung = NEUTRAL_RAMP.indexOf(token);
  if (neutralRung >= 0) return { family: "neutral", rung: neutralRung };
  throw new Error(
    `${what}: "--${token}" is on neither the copper nor the neutral ladder, so ` +
      `nothing here can say whether it is brighter or darker than the resting tier.`,
  );
}

// ── a pillar's whole resting signature, as one comparable object ──────────────

/**
 * Everything about one pillar that opening ANOTHER pillar could possibly change —
 * the object the no-dim rule is asserted over.
 *
 * ELEVEN FIELDS AND NOT "the border", because §7.1's rule is not about borders: it
 * says the five pillars a hover is not about lose NOTHING, and there are eleven ways
 * to lose something here. `border`, `background` and `boxShadow` are the box's three
 * paints; `transform` is the scale channel, in this list precisely because it is what
 * a "subtle de-emphasis" reaches for first (scale the neighbours to 0.98);
 * `labelColor` and `iconColor` are the two type tiers inside the box; and the last
 * FIVE are the tether, which lives in a different DOM layer (SVG) and is therefore
 * the half a box-only check would miss.
 *
 * THE TETHER IS FIVE FIELDS AND NOT TWO, which is the extension this rewrite forced.
 * A spoke is now TWO elements — a drawn hairline that is the structure and a dashed
 * overlay that is the motion — so a de-emphasis could be spent on either, and the
 * cheapest one of all is not a colour at all: dropping `is-active` from five flows
 * while adding it to one reads on a projector as five spokes stopping. So the
 * overlay's CLASS is a signature field beside its two paints.
 *
 * `opacity` IS NOT IN THIS LIST ANY MORE, and its absence is the one deletion worth
 * stating. Under nine poses the boxes were revealed by an inline `opacity` the pose
 * wrote, so a rank hidden in that channel was a real risk and the field was the guard
 * against it. The build is a KEYFRAME now (`agentic-org.css`) and no inline opacity
 * is written at all, so the field would capture `""` on all six pillars for ever and
 * compare empty strings — a check that cannot fail is worse than no check, because it
 * reads as coverage. What replaced it is the assertion that the boxes carry no inline
 * opacity at all, in the resting describe, where a reader can see why.
 */
interface PillarSignature {
  readonly border: string;
  readonly background: string;
  readonly boxShadow: string;
  readonly transform: string;
  readonly labelColor: string;
  readonly iconColor: string;
  readonly spokeStroke: string;
  readonly spokeWidth: string;
  readonly flowStroke: string;
  readonly flowWidth: string;
  readonly flowClass: string;
}

/** Named so a failure says WHICH field moved, on WHICH pillar, in WHICH state — a
 *  bare object diff over six pillars × six hovers is unreadable. */
const SIGNATURE_FIELDS: readonly (keyof PillarSignature)[] = [
  "border",
  "background",
  "boxShadow",
  "transform",
  "labelColor",
  "iconColor",
  "spokeStroke",
  "spokeWidth",
  "flowStroke",
  "flowWidth",
  "flowClass",
];

function pillarBoxEl(id: string): HTMLElement {
  return screen.getByTestId(`shape-pillar-${id}`);
}

/**
 * The `div` that PLACES pillar `id` — two levels above the box, and the one element
 * on this slide whose identity a test has to go looking for.
 *
 * THREE ELEMENTS, ONE TRANSFORM EACH. The nine-pose version put the centring
 * translate, the arrival scale and the focus scale on the SAME element and had to,
 * because the arrival was a pose and the focus was a click and the two could not
 * overlap. They overlap constantly now — the build runs on mount and a presenter's
 * pointer is already on the stage — so they are three elements: this one places (and
 * carries the z-index), the middle one arrives, the button highlights. Which means
 * `translate(-50%, -50%)` is NO LONGER on the element that carries the testid, and
 * every assertion that used to parse it off there had to move up two parents.
 */
function placementOf(id: string): HTMLElement {
  const arrival = pillarBoxEl(id).parentElement;
  const placement = arrival?.parentElement;
  if (!arrival || !placement) {
    throw new Error(
      `placementOf(${id}): expected box → arrival wrapper → placement div, and the ` +
        `chain is shorter than that. The three-layer transform split in ` +
        `PillarOrbit.tsx has been collapsed.`,
    );
  }
  return placement;
}

function pillarSignature(id: string): PillarSignature {
  const box = pillarBoxEl(id);
  const spoke = screen.getByTestId(`shape-spoke-${id}`);
  const flow = screen.getByTestId(`shape-flow-${id}`);
  return {
    border: box.style.border,
    background: box.style.background,
    boxShadow: box.style.boxShadow,
    transform: box.style.transform,
    labelColor: screen.getByTestId(`shape-pillar-${id}-label`).style.color,
    iconColor: screen.getByTestId(`shape-pillar-${id}-icon`).style.color,
    spokeStroke: spoke.style.stroke,
    spokeWidth: spoke.style.strokeWidth,
    flowStroke: flow.style.stroke,
    flowWidth: flow.style.strokeWidth,
    // `getAttribute` AND NOT `.className`: on an SVG element `className` is an
    // `SVGAnimatedString`, which stringifies to `[object SVGAnimatedString]` and
    // would compare equal on every pillar in every state.
    flowClass: flow.getAttribute("class") ?? "",
  };
}

/** All six pillars' signatures in the currently rendered state. */
function allSignatures(): Map<string, PillarSignature> {
  return new Map(C.pillars.map((p) => [p.id, pillarSignature(p.id)]));
}

/** Which pillar ids the DOM says are lit — read off `data-active`, which is the fact
 *  the renderer publishes, rather than out of a parsed border colour. */
function activePillarIds(): string[] {
  return C.pillars.filter((p) => pillarBoxEl(p.id).dataset.active === "true").map((p) => p.id);
}

/** Which pillar the DOM says is pinned. A list rather than a value, so "two pinned
 *  at once" fails as a length rather than passing as whichever was found first. */
function pinnedPillarIds(): string[] {
  return C.pillars.filter((p) => pillarBoxEl(p.id).dataset.pinned === "true").map((p) => p.id);
}

/** Which of the panel's eight blocks are open. */
function openBlockIds(): string[] {
  return PANEL_BLOCKS.filter((id) => screen.getByTestId(id).dataset.open === "true");
}

/**
 * THE PANEL'S WHOLE CONTRACT, IN ONE CALL: all eight blocks mounted, exactly one of
 * them open, and it is the one named.
 *
 * IT IS NEVER EMPTY, which is the difference from the nine-pose version and the
 * reason the idle block exists at all. That version opened the column at the first
 * beat and showed nothing beside the ring before it; a figure reached by hovering has
 * no first beat, so a column that waited for one would be a blank third of the stage
 * for as long as nobody touched anything.
 */
function expectOnlyOpen(expected: string, where: string) {
  PANEL_BLOCKS.forEach((id) =>
    expect(screen.getByTestId(id), `${where} · ${id} mounted`).toBeInTheDocument(),
  );
  expect(openBlockIds(), `${where} · open blocks`).toEqual([expected]);
}

// ── the def ──────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, TWO steps, canonical on the recap", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins
    // the value).
    expect(shapeAgenticOrgSlide.id).toBe("shape-agentic-org");

    // TWO — pinned as a VALUE and as its RELATION, because the two catch different
    // edits. The value catches a pose quietly added or lost; the relation catches the
    // literal `2` the slide file must not contain, because a literal is how the recap
    // becomes a pose the deck can never reach (`DeckContext` clamps at `steps - 1`)
    // with no error, no blank slide and no failing test.
    //
    // AND IT IS NO LONGER DERIVED FROM THE PILLAR COUNT, which is the reversal this
    // ticket makes. Under nine poses a seventh pillar had to GROW the budget or
    // silently lose a beat. A seventh pillar now costs zero steps — the pointer
    // reaches it for free — so the budget is the figure plus the recap and it is two
    // whatever the ring holds.
    expect(shapeAgenticOrgSlide.steps).toBe(2);
    expect(shapeAgenticOrgSlide.steps).toBe(STEP_COUNT);
    expect(STEP_COUNT).toBe(POSE.RECAP + 1);
    expect(POSE.FIGURE).toBe(0);
    expect(POSE.RECAP).toBe(1);

    // `canonicalPose === 1`, AND IT IS NOW ALSO `steps - 1`, where under the nine-pose
    // walk it deliberately was not. The argument the number carries has changed even
    // though the number has not:
    //
    //   · The exports print `canonicalPose` and NOTHING ELSE (one frame per slide),
    //     so this is the pose the PDF and the PPTX are.
    //   · Pose 1 is the pose in which NO ONE of six pillars is singled out AND every
    //     decision is on the page: six recap fragments, the closer, and a ring with
    //     all six lit equally.
    //   · Pose 0 is the real alternative and it exports a figure whose panel is
    //     showing an idle prompt — because a PDF has no pointer, and every one of the
    //     six decisions on that pose is behind a hover.
    //   · #55's AC pins this at 1 "unless a different pose is argued for in a comment
    //     on this issue first". The number does not move, and what it prints is
    //     strictly more than it printed before.
    expect(shapeAgenticOrgSlide.canonicalPose).toBe(1);
    expect(shapeAgenticOrgSlide.canonicalPose).toBe(POSE.RECAP);
    // Still inside the budget — the half of `=== steps - 1` that was always
    // load-bearing: a canonical pose the deck cannot reach exports a clamped frame
    // that is not the frame anybody chose.
    expect(shapeAgenticOrgSlide.canonicalPose!).toBeLessThan(shapeAgenticOrgSlide.steps);
    // AND IT IS THE POSE THAT SINGLES OUT NOTHING, as arithmetic over `walk.ts`
    // rather than as prose: the recap is up, and the pointer is not consulted.
    expect(showsRecap(shapeAgenticOrgSlide.canonicalPose!)).toBe(true);
    expect(acceptsPointer(shapeAgenticOrgSlide.canonicalPose!)).toBe(false);

    expect(shapeAgenticOrgSlide.sectionKey).toBe("shape");
    expect(shapeAgenticOrgSlide.animationMode).toBe("step-reveal");
    expect(shapeAgenticOrgSlide.surface).toBe("dark");
  });
});

// ── the hub, and the one axis it varies on (§4.4 slot 5) ─────────────────────

describe("the hub", () => {
  test("says “The Enabler” in that casing, and shouts it through CSS", () => {
    renderOrg(gems);

    // THE STRING IS TITLE CASE AND THE GLYPHS ARE NOT. The issue's AC, the spec
    // and this test all quote "The Enabler", so the data holds that and the mono
    // LABEL register uppercases it at render — which means `textContent` stays
    // quotable while the stage still reads THE ENABLER.
    const label = screen.getByTestId("shape-hub-label");
    expect(label.textContent).toBe("The Enabler");
    expect(C.hubLabel).toBe("The Enabler");
    expect(label.style.textTransform).toBe("uppercase");
    expect(label.style.fontFamily).toBe("var(--mono)");
  });

  test("names DigiTech under gems and MineTech under berau — in one epoch", () => {
    // THE ACTUAL CHECK behind "no component reads VARIANT", and the reason it
    // matters: if anything below the slide read `VARIANT` itself, both of these
    // renders would show the same brand, because one module epoch holds one
    // variant. The slide file resolves the line once and passes it down.
    expect(gems).toBe("DigiTech");
    expect(berau).toBe("MineTech");

    const first = renderOrg(gems);
    expect(screen.getByTestId("shape-hub-brand-line").textContent).toBe("DigiTech");
    expect(screen.getByTestId("shape-hub").textContent).toContain("The Enabler");
    first.unmount();

    renderOrg(berau);
    expect(screen.getByTestId("shape-hub-brand-line").textContent).toBe("MineTech");
    expect(screen.getByTestId("shape-hub").textContent).toContain("The Enabler");
  });

  test("prints NO second line where the deck names no organisation", () => {
    // `general` has no leader variant registered, so no composed deck asks for
    // this — and the honest answer is still not an empty string. An empty line
    // inside the disc reads as a slide that did not finish rendering; a
    // placeholder name would be an invented organisation at the centre of the
    // deck's centrepiece. So the element is ABSENT, and the hub prints its label
    // alone.
    expect(hubBrandLineFor("general")).toBeNull();

    renderOrg(hubBrandLineFor("general"), POSE.RECAP);
    expect(screen.queryByTestId("shape-hub-brand-line")).toBeNull();
    expect(screen.getByTestId("shape-hub-label").textContent).toBe("The Enabler");
    // And nothing invented one under another name: the disc holds exactly the
    // label.
    expect(screen.getByTestId("shape-hub").textContent).toBe("The Enabler");
  });

  test("stands at both poses, and carries the build's first frame", () => {
    // THE HUB IS WHAT EVERYTHING ELSE IS MEASURED FROM, so it is on the stage at
    // pose 0 and unchanged at pose 1 — there is no hub-alone pose any more, and no
    // pose it fades for. It also carries `shape-hub-in`, which is the first entry in
    // the build timetable: the disc settles, then six spokes leave it. jsdom runs no
    // keyframe, but a MISSING class is a missing arrival and that is checkable.
    renderOrg(berau, POSE.FIGURE);
    for (const pose of POSES) {
      goToPose(pose);
      const hub = screen.getByTestId("shape-hub");
      expect(hub, `pose ${pose}`).toBeInTheDocument();
      expect(hub.className, `pose ${pose} · arrival`).toContain("shape-hub-in");
      expect(
        screen.getByTestId("shape-hub-brand-line").textContent,
        `pose ${pose}`,
      ).toBe("MineTech");
      // NO FOCUS TIER ON THE HUB, at either pose. The hub is what the six pillars
      // are pillars OF, so a highlight that also lit the centre would be a figure
      // with seven subjects — and pose 1 lights all six, which is exactly where a
      // "light everything" edit would reach for it.
      expect(hub.dataset.active, `pose ${pose}`).toBeUndefined();
    }
  });

  test("resolves through a typed pick over every registered brand", () => {
    // A `Record<Brand, …>`, so a fourth brand fails to COMPILE rather than
    // silently showing one organisation another's name. Walked here as a value
    // too, so `general` — which reaches no deck — is held to the same rules.
    expect([...REGISTERED_BRANDS].sort()).toEqual(["berau", "gems", "general"]);
    for (const brand of REGISTERED_BRANDS) {
      const line = hubBrandLineFor(brand);
      expect(hubBrandLineFor(brand), brand).toBe(line);
      // Either a real name or a stated absence — never an empty or blank string,
      // which is the one value that renders as a fault.
      if (line !== null) expect(line.trim(), brand).not.toBe("");
    }
  });
});

// ── the six pillars ──────────────────────────────────────────────────────────

describe("the six pillars", () => {
  test("are HR p4's six, verbatim, in the ring's reading order", () => {
    renderOrg(gems);

    // SIX, from the geometry's own count rather than a literal here: the labels
    // and the ring centres are the same six, and a seventh pillar would have no
    // point to sit on (`pillarCentre` throws rather than wrapping it onto the
    // first — see the geometry tests below).
    expect(C.pillars).toHaveLength(PILLAR_COUNT);
    expect(new Set(C.pillars.map((p) => p.id)).size).toBe(PILLAR_COUNT);

    // THE ORDER IS THE RING'S, NOT HR p4's PRINTED ORDER, and it is asserted so
    // that "the owner approved variant A including this order" survives a
    // reviewer who checks the labels against the HR deck and re-sorts them.
    //
    // IT NO LONGER DECIDES WHAT IS SAID FIRST — the pointer does that, and a room
    // that asks about seats gets seats. It still decides what is READ first (index 0
    // is twelve o'clock and a ring is scanned clockwise from the top by everyone) and
    // it decides the RECAP's order, which is the one place on this slide where all
    // six are stated in sequence.
    expect(C.pillars.map((p) => p.label)).toEqual([
      "Governance & Policies",
      "Tools & Platform",
      "People & Mindset",
      "Strategy & Leadership",
      "Process & Methodology",
      "AI Companions",
    ]);

    // Read back out of the DOM: all six labels on the stage at pose 0, each in
    // its own box.
    C.pillars.forEach((pillar) => {
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}-label`).textContent,
        pillar.id,
      ).toBe(pillar.label);
    });
  });

  test("each renders an icon the shim actually has", () => {
    renderOrg(gems);

    // THE HALF THE `PillarIcon` UNION CANNOT PROVE. A name can be spelled right,
    // pass the type, and still be missing from the shim's map — which renders
    // nothing at all and reads on a six-icon ring as a pillar that did not load.
    // So this counts the SVGs.
    C.pillars.forEach((pillar) => {
      const icon = screen.getByTestId(`shape-pillar-${pillar.id}-icon`);
      expect(icon.querySelectorAll("svg"), `${pillar.id} · ${pillar.icon}`).toHaveLength(1);
    });
  });

  test("sit on their own ring point — placed by the PARENT, scaled by the button", () => {
    renderOrg(gems);

    // THE THREE-LAYER SPLIT, ASSERTED AS THREE LAYERS. This is the assertion that
    // changed shape in the rewrite: the box used to carry
    // `translate(-50%, -50%) scale(…)` on one element, and it now carries the scale
    // alone while the placement — and the z-index the halo needs — lives two parents
    // up. A refactor that collapsed them back would light a hovered box from two
    // directions at once, because the arrival keyframe owns `transform` on the middle
    // element for the first 1.1s of the slide.
    C.pillars.forEach((pillar, i) => {
      const box = pillarBoxEl(pillar.id);
      const placement = placementOf(pillar.id);
      const arrival = box.parentElement!;

      expect(placement.style.position, pillar.id).toBe("absolute");
      expect(placement.style.left, pillar.id).toBe(`${pillarCentre(i).x}px`);
      expect(placement.style.top, pillar.id).toBe(`${pillarCentre(i).y}px`);
      // The centring translate is what makes `left`/`top` a CENTRE, and it is the
      // ONLY transform on this element.
      expect(placement.style.transform, pillar.id).toBe("translate(-50%, -50%)");
      // Under its neighbours at rest, over them when lit — see the halo note in the
      // renderer. Pillars 1/2 and 4/5 are close enough that a flat z-index lets the
      // later box clip the earlier one's 4px ring.
      expect(placement.style.zIndex, pillar.id).toBe("2");

      // The middle element ARRIVES, and carries this pillar's place in the sweep.
      expect(arrival.className, pillar.id).toBe("shape-pillar-in");
      expect(arrival.style.animationDelay, pillar.id).toMatch(/^\d+ms$/);

      // And the button HIGHLIGHTS — one transform, the scale, at rest 1.
      expect(box.style.width, pillar.id).toBe(`${PILLAR_BOX.w}px`);
      expect(box.style.height, pillar.id).toBe(`${PILLAR_BOX.h}px`);
      expect(box.style.transform, pillar.id).toBe("scale(1)");
      expect(box.style.transform, pillar.id).not.toContain("translate");
    });

    // THE SWEEP IS A SWEEP: six arrivals, strictly increasing in ring order, so the
    // six land clockwise from twelve o'clock rather than all at once. Six
    // simultaneous arrivals is one event; six staggered ones are a shape being drawn.
    const delays = C.pillars.map((p) =>
      Number.parseFloat(pillarBoxEl(p.id).parentElement!.style.animationDelay),
    );
    delays.forEach((d, i) => {
      if (i === 0) return;
      expect(d, `${C.pillars[i].id} lands after ${C.pillars[i - 1].id}`).toBeGreaterThan(
        delays[i - 1],
      );
    });
  });

  test("are BUTTONS, with the pin published as an ARIA state", () => {
    renderOrg(gems);

    // A `<button>` AND NOT A `<div onMouseEnter>`. The six decisions are behind a
    // pointer gesture, so without a real control they are behind a gesture a keyboard
    // cannot make — and the pin is a toggle, which is a thing ARIA already has a word
    // for. A screen reader hears "Governance & Policies, toggle button, not pressed",
    // which is the whole interaction without seeing the ring.
    C.pillars.forEach((pillar) => {
      const box = pillarBoxEl(pillar.id);
      expect(box.tagName, pillar.id).toBe("BUTTON");
      expect(box.getAttribute("type"), pillar.id).toBe("button");
      expect(box.getAttribute("aria-pressed"), pillar.id).toBe("false");
      expect(box.tabIndex, pillar.id).toBe(0);
      // And the pin's own mark is ABSENT rather than transparent, so nothing is on
      // the box until something is pinned.
      expect(screen.queryByTestId(`shape-pillar-${pillar.id}-pin`), pillar.id).toBeNull();
    });
  });
});

// ── nothing is pre-dimmed (§7.1) ─────────────────────────────────────────────

describe("with nothing open, all six pillars carry full light", () => {
  // "Attention is bought with added light, never subtracted." With nothing hovered
  // there is nothing for a dim tier to mean — and the cheapest way to break this is
  // to port the prototype's three-tier walked/unvisited ranking.
  beforeEach(() => renderOrg(berau));

  test("with the same border, and no rank hidden in the opacity channel", () => {
    const boxes = C.pillars.map((p) => pillarBoxEl(p.id));

    const borders = new Set(boxes.map((b) => b.style.border));
    expect(borders.size, `borders: ${[...borders].join(" | ")}`).toBe(1);

    const [border] = [...borders];
    expect(border).toContain("solid");
    expect(border).toContain("var(--copper-");
    // NOT one of the dark tiers. A `--copper-800` border is the prototype's
    // "not visited yet", and nothing here has been visited.
    DIM_COPPER_TIERS.forEach((tier) => expect(border, tier).not.toContain(tier));

    // NO INLINE OPACITY AT ALL, on any of the six — and this is the assertion that
    // replaced the `opacity` signature field when the build became a keyframe. On
    // this slide opacity means "not revealed yet", i.e. TIME; the arrival owns it
    // (`shape-pillar-in`, on the wrapper) and no rank may ever be spent in the same
    // channel. An inline value here would be a pillar the renderer is holding back.
    boxes.forEach((box, i) => expect(box.style.opacity, C.pillars[i].id).toBe(""));

    // AND NOT ONE OF THEM IS FLAGGED ACTIVE OR PINNED. A fresh mount opens nothing.
    expect(activePillarIds()).toEqual([]);
    expect(pinnedPillarIds()).toEqual([]);
  });

  test("with the same label tier, and a full-strength one", () => {
    const colors = new Set(
      C.pillars.map((p) => screen.getByTestId(`shape-pillar-${p.id}-label`).style.color),
    );
    expect(colors.size, `label tiers: ${[...colors].join(" | ")}`).toBe(1);
    const [color] = [...colors];
    expect(FULL_LABEL_TIERS, `label tier ${color}`).toContain(color);
  });

  test("and the same tether — one stroke, one width, one flow, none of them surging", () => {
    const spokes = C.pillars.map((p) => screen.getByTestId(`shape-spoke-${p.id}`));
    const flows = C.pillars.map((p) => screen.getByTestId(`shape-flow-${p.id}`));

    expect(new Set(spokes.map((s) => s.style.stroke)).size).toBe(1);
    expect(new Set(spokes.map((s) => s.style.strokeWidth)).size).toBe(1);
    expect(new Set(flows.map((f) => f.style.stroke)).size).toBe(1);
    expect(new Set(flows.map((f) => f.style.strokeWidth)).size).toBe(1);
    // NOT ONE FLOW IS SURGING. `.is-active` reverses the bead travel and lengthens
    // the dash, so a stray one is a spoke firing outward beside a box nobody opened.
    expect(new Set(flows.map((f) => f.getAttribute("class")))).toEqual(
      new Set(["shape-spoke-flow"]),
    );

    // THROUGH `style`, NOT THROUGH THE PRESENTATION ATTRIBUTE. `var()` only
    // resolves in CSS properties, so `stroke="var(--copper-600)"` as an attribute
    // is a black line on a black stage — the prototype's one hard-won line, and a
    // refactor that "tidies" it back into attributes loses all twelve lines
    // silently.
    [...spokes, ...flows].forEach((line) => {
      expect(line.style.stroke, line.getAttribute("data-testid") ?? "").toContain(
        "var(--copper-",
      );
      expect(line.hasAttribute("stroke")).toBe(false);
      expect(line.hasAttribute("stroke-width")).toBe(false);
    });

    // THE DRAWN LINE IS NORMALISED AND THE OVERLAY IS NOT, which is the one place
    // the two lines of a spoke are DELIBERATELY different. `pathLength={1}` makes six
    // spokes of six different lengths draw in the same 520ms; the beads are `2 10` in
    // USER UNITS so every spoke carries the same-sized beads at the same pitch. Both
    // normalised, the short spokes would get tight beads; neither normalised, the six
    // would finish drawing at six different times.
    spokes.forEach((s) => expect(s.getAttribute("pathLength")).toBe("1"));
    flows.forEach((f) => expect(f.hasAttribute("pathLength")).toBe(false));
  });

  test("and a bead is BRIGHTER than the line it runs on, or it is a gap in it", () => {
    // THE ONE RELATION BETWEEN THE TWO LINES OF A SPOKE, and the only rule on this
    // slide that is about a pair of resting tiers rather than about the rest→lit
    // delta. Every other check here compares a pillar to its own resting self or to
    // its lit self, so both of them pass with the whole overlay moved DOWN the ramp
    // together — and a `--copper-700` bead on a `--copper-600` hairline is not a
    // quieter decoration, it is a dark mark laid over a lighter line: the beads stop
    // reading as beads travelling along the spoke and start reading as GAPS eaten out
    // of it. Six spokes that look broken, with no test failing.
    //
    // ONE TIER, NOT MORE, is the other half of `REST.flowStroke`'s argument, and it
    // is left to the eye rather than pinned here: the ceiling is real (at
    // `--copper-200` the resting ring reads as six animated arrows aimed at a disc,
    // which is a diagram of traffic rather than of an organisation) but "how much
    // brighter is too bright" is a projector judgement, and the hard floor below is
    // the part a test can hold. The lit tiers are held from the other side by the
    // gains-light describe, which requires the bead to out-rank its resting self.
    //
    // FIRED PER PILLAR rather than once, so a per-spoke override — the shape a later
    // "just this one" edit takes — cannot hide behind five correct siblings.
    C.pillars.forEach((p) => {
      const spoke = screen.getByTestId(`shape-spoke-${p.id}`);
      const flow = screen.getByTestId(`shape-flow-${p.id}`);
      const line = brightnessOf(
        tokenIn(spoke.style.stroke, `${p.id} · spoke`),
        `${p.id} · spoke`,
      );
      const bead = brightnessOf(
        tokenIn(flow.style.stroke, `${p.id} · bead`),
        `${p.id} · bead`,
      );
      expect(bead.family, `${p.id} · bead family`).toBe(line.family);
      expect(
        bead.rung,
        `${p.id} · bead ${flow.style.stroke} on spoke ${spoke.style.stroke}`,
      ).toBeGreaterThan(line.rung);
      // AND THE MARK HAS TO BE WIDER THAN THE HAIRLINE, for the same reason stated
      // in width rather than in colour: a 2px dash at the line's own weight is a
      // brighter section OF the line, not a bead ON it. `REST.flowWidth` is 2.4
      // against a 1.6 spoke, which with `stroke-linecap: round` draws a ~4.4px
      // lozenge — the smallest mark that survives a projector.
      expect(
        Number(flow.style.strokeWidth),
        `${p.id} · bead width against spoke width`,
      ).toBeGreaterThan(Number(spoke.style.strokeWidth));
    });
  });

  test("and every resting tier is a var on one of the two ladders", () => {
    // THE PRECONDITION FOR EVERY "BRIGHTER" CLAIM BELOW. The focus tiers are
    // compared to these by rung, so a resting value that is a hex, an `rgba()` or
    // a token off both ladders makes that comparison meaningless — and it is
    // exactly what the prototype ships (`rgba(184,110,61,0.14)` and friends).
    // `tokenIn` and `brightnessOf` throw rather than return, so this test is the
    // one that reports it.
    C.pillars.forEach((p) => {
      const sig = pillarSignature(p.id);
      for (const [field, value] of [
        ["border", sig.border],
        ["background", sig.background],
        ["labelColor", sig.labelColor],
        ["iconColor", sig.iconColor],
        ["spokeStroke", sig.spokeStroke],
        ["flowStroke", sig.flowStroke],
      ] as const) {
        brightnessOf(tokenIn(value, `${p.id} · ${field}`), `${p.id} · ${field}`);
      }
      // The resting box has NO halo, written out as `none` rather than left off
      // the tier table — see `REST.boxHalo`. An absent key would make the two
      // tables different shapes, which is how a focus property ends up with no
      // release and the halo stays on the box the pointer has left.
      expect(sig.boxShadow, `${p.id} · halo at rest`).toBe("none");
    });
  });
});

// ── pose 0: the whole figure, and nothing waiting for a click ────────────────

describe("pose 0 is the WHOLE figure", () => {
  test("hub, six spokes, six flows, six boxes and the panel — none of them waiting", () => {
    // THE CHANGE THIS REWRITE IS BUILT AROUND, asserted as an inventory. The old
    // pose 0 was a disc alone on a black stage and the room read a circle with no
    // organisation around it and waited; pose 1 brought the ring; the column arrived
    // at pose 2. Three arrivals, two of them presenter clicks. The figure is ONE
    // thing, so it arrives as one thing — the build is a keyframe timetable on mount
    // (`agentic-org.css`) and every element of it is in the tree from the first
    // frame.
    renderOrg(gems, POSE.FIGURE);

    expect(screen.getByTestId("shape-hub")).toBeInTheDocument();
    C.pillars.forEach((pillar) => {
      expect(pillarBoxEl(pillar.id), pillar.id).toBeInTheDocument();
      expect(screen.getByTestId(`shape-spoke-${pillar.id}`), pillar.id).toBeInTheDocument();
      expect(screen.getByTestId(`shape-flow-${pillar.id}`), pillar.id).toBeInTheDocument();
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}-label`).textContent,
        pillar.id,
      ).toBe(pillar.label);
    });

    // THE PANEL IS UP TOO, and it is up with COPY in it. Its hairline is the
    // column's own and is declared once on the column, so it cannot blink.
    const column = screen.getByTestId("shape-walk-column");
    expect(column).toBeInTheDocument();
    expect(column.className).toContain("shape-panel-in");
    expect(column.style.borderLeft).toContain("solid");
    expect(column.style.borderLeft).toContain("var(--copper-");
  });

  test("the panel shows the idle block, and nothing else, with the hint on it", () => {
    renderOrg(gems, POSE.FIGURE);

    // THE IDLE BLOCK IS NOT A PLACEHOLDER. `idleEyebrow` names the figure and
    // `idleLead` states the mechanism under the headline, so a presenter who talks
    // straight through this slide without touching it still delivers the argument —
    // the six decisions are the DEPTH, not the content. That is the test an idle
    // state on an interactive slide has to pass.
    expectOnlyOpen("shape-idle", "pose 0");
    expect(screen.getByTestId("shape-idle-eyebrow").textContent).toBe(C.idleEyebrow);
    expect(screen.getByTestId("shape-idle-lead").textContent).toBe(C.idleLead);

    // AND THE ONE LINE THAT EXPLAINS THE POINTER. Under nine poses the six decisions
    // arrived whether or not anyone touched the slide; under two they are reached by
    // hovering a box, and a figure that hides its content behind an ungestured
    // interaction is a figure that shows a room six labels and nothing else.
    expect(screen.getByTestId("shape-hint").textContent).toBe(C.hint);
    expect(C.hint, "both halves are named").toMatch(/HOVER/);
    expect(C.hint, "pin is the half nobody guesses").toMatch(/PIN/);
  });

  test("all six pillars are unlit, and nothing is pinned", () => {
    renderOrg(gems, POSE.FIGURE);
    expect(activePillarIds()).toEqual([]);
    expect(pinnedPillarIds()).toEqual([]);
    // The pointer is live here — that is what the pose IS — so the six boxes are in
    // the tab order.
    expect(acceptsPointer(POSE.FIGURE)).toBe(true);
    C.pillars.forEach((p) => expect(pillarBoxEl(p.id).tabIndex, p.id).toBe(0));
  });
});

// ── pose 1: the recap ────────────────────────────────────────────────────────

describe("pose 1 lights all six at once and hands the panel to the recap", () => {
  test("ALL SIX are active simultaneously — no one of six is singled out", () => {
    renderOrg(berau, POSE.RECAP);

    // THE RING AND THE PANEL SAY THE SAME THING IN TWO REGISTERS, at the same
    // moment. Six lit boxes is not "the walk ended on all six"; it is a different
    // claim from any single-pillar pose, and it is the claim the headline makes.
    expect(activePillarIds()).toEqual(C.pillars.map((p) => p.id));
    expect(showsRecap(POSE.RECAP)).toBe(true);

    // EVERY LIT PILLAR IS FULLY LIT, not "flagged". The z-index, the scale, the halo
    // and the surging flow are the four things that were only ever true of one box at
    // a time before this pose existed.
    C.pillars.forEach((pillar) => {
      expect(pillarBoxEl(pillar.id).style.transform, pillar.id).toBe(
        `scale(${FOCUS_SCALE})`,
      );
      expect(pillarBoxEl(pillar.id).style.boxShadow, pillar.id).toContain(
        `${FOCUS_HALO_WIDTH}px`,
      );
      expect(placementOf(pillar.id).style.zIndex, pillar.id).toBe("4");
      expect(
        screen.getByTestId(`shape-flow-${pillar.id}`).getAttribute("class"),
        pillar.id,
      ).toContain("is-active");
    });
  });

  test("the recap is the only open block, and it prints six fragments and the closer", () => {
    renderOrg(berau, POSE.RECAP);

    expectOnlyOpen("shape-recap", "pose 1");
    expect(screen.getByTestId("shape-recap-eyebrow").textContent).toBe(C.recapEyebrow);

    // THE STEM IS SAID ONCE. Every decision opens "You decide"; six full sentences
    // here would be a paragraph, and a room reads a paragraph by skimming it. So the
    // eyebrow carries the stem and the six fragments complete it.
    expect(C.recapEyebrow).toContain("YOU DECIDE");
    C.pillars.forEach((pillar) => {
      expect(pillar.decision, `${pillar.id} · the stem`).toMatch(/^You decide /);
      expect(
        screen.getByTestId(`shape-recap-${pillar.id}-label`).textContent,
        pillar.id,
      ).toBe(pillar.label);
      expect(
        screen.getByTestId(`shape-recap-${pillar.id}-text`).textContent,
        pillar.id,
      ).toBe(pillar.recap);
      // A FRAGMENT AND NOT A SENTENCE: it completes the stem, so it starts lower
      // case and ends without a stop. A recap line that reads as a sentence of its
      // own would leave the eyebrow above it dangling.
      expect(pillar.recap[0], `${pillar.id} · lower case`).toBe(
        pillar.recap[0].toLowerCase(),
      );
      expect(pillar.recap, `${pillar.id} · no full stop`).not.toMatch(/[.]$/);
    });

    // AND THE CLAIM THE SIX ARE EVIDENCE FOR, under the hairline. It is no longer a
    // pose of its own — the nine-pose version gave the closer an EMPTY column with
    // its evidence already off the stage.
    const closer = screen.getByTestId("shape-closer");
    expect(closer.textContent).toBe(C.closer);
    expect(C.closer).toContain("None of them is a tool purchase.");
    expect(screen.getByTestId("shape-recap").contains(closer)).toBe(true);
    expect(screen.getByTestId("shape-recap-rows")).toBeInTheDocument();
  });

  test("the pointer is INERT there — hovering a pillar changes nothing", async () => {
    // A CORRECTNESS RULE RATHER THAN A TIDY-UP. The recap lights all six and gives
    // the panel to a six-row summary; a hover that could still open ONE pillar would
    // have to either overwrite the summary the room is reading or un-light the other
    // five — and un-lighting five pillars to emphasise a sixth is precisely the
    // subtraction §7.1 forbids.
    const user = userEvent.setup();
    renderOrg(berau, POSE.RECAP);
    expect(acceptsPointer(POSE.RECAP)).toBe(false);

    const before = allSignatures();
    await user.hover(pillarBoxEl("people"));

    expect(activePillarIds()).toEqual(C.pillars.map((p) => p.id));
    expectOnlyOpen("shape-recap", "pose 1 · after hover");
    C.pillars.forEach((p) =>
      expect(pillarSignature(p.id), `${p.id} · unmoved by the pointer`).toEqual(
        before.get(p.id),
      ),
    );

    // AND THE SIX BOXES LEAVE THE TAB ORDER. Six controls that cannot change
    // anything are six stops that answer nothing, and the panel already holds every
    // word they would have opened.
    C.pillars.forEach((p) => expect(pillarBoxEl(p.id).tabIndex, p.id).toBe(-1));
  });
});

// ── hover, and the caret that does the same thing ────────────────────────────

describe("hover opens exactly one decision", () => {
  test("each pillar in turn: its box lights, its block opens, and only that one", async () => {
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    // ONE MOUNTED TREE, SWEPT. A per-pillar re-mount would prove only that each
    // pillar opens from cold; the bug class this figure is at risk of — a box left
    // lit behind a pointer that has moved on, a panel one pillar behind the ring —
    // only exists in a tree that has already had something else open.
    for (const [i, pillar] of C.pillars.entries()) {
      const box = pillarBoxEl(pillar.id);
      await user.hover(box);

      // `walk.ts` FIRST, ON ITS OWN TERMS, then the DOM. Reading only the DOM would
      // prove the renderer agrees with itself; recomputing from `resolveFocus` alone
      // would prove `walk.ts` agrees with itself. The seam is where the bug is.
      expect(resolveFocus(NO_FOCUS, i, NO_FOCUS), `${pillar.id} · walk.ts`).toBe(i);
      expect(activePillarIds(), pillar.id).toEqual([pillar.id]);
      expectOnlyOpen(`shape-decision-${pillar.id}`, pillar.id);

      // THE COLUMN SPEAKS FOR THE SAME PILLAR — its name in the display serif, its
      // decision in the serif body. Both read off the SAME content entry the ring's
      // box is labelled from, so a mapping that pointed the column at pillar `i+1`
      // fails here rather than looking like a copy edit.
      expect(
        screen.getByTestId(`shape-decision-${pillar.id}-label`).textContent,
        `${pillar.id} · label`,
      ).toBe(pillar.label);
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}-label`).textContent,
        `${pillar.id} · the ring says the same`,
      ).toBe(pillar.label);
      expect(
        screen.getByTestId(`shape-decision-${pillar.id}-text`).textContent,
        `${pillar.id} · decision`,
      ).toBe(pillar.decision);

      // THE COUNTER IS 1-BASED FOR THE ROOM AND 0-BASED IN THE CODE, and it
      // survived the walk it was written for. Under nine poses "03 / 06" told the
      // presenter where they were in a fixed sequence; there is no sequence now, and
      // it tells the room something better — that what they are reading is one of
      // exactly six, so a pillar opened out of order still arrives with its
      // denominator.
      const eyebrow = screen.getByTestId(`shape-decision-${pillar.id}-eyebrow`);
      expect(eyebrow.textContent, `${pillar.id} · counter`).toBe(decisionCounter(i));
      expect(eyebrow.textContent, `${pillar.id} · 1-based`).toBe(
        `${C.decisionEyebrow} · 0${i + 1} / 0${PILLAR_COUNT}`,
      );

      await user.unhover(box);
      // AND IT CLOSES. Leaving the box hands `NO_FOCUS` back in, and there is no
      // history for the next call to contradict — which is what makes "no
      // interaction leaves a pillar stuck open" arithmetic rather than cleanup.
      expect(activePillarIds(), `${pillar.id} · released`).toEqual([]);
      expectOnlyOpen("shape-idle", `${pillar.id} · released`);
    }

    // THE COUNTER STOPS AT THE TOTAL: "06 / 06" is the last thing printed, and there
    // is no "07 / 06" for anything.
    expect(decisionCounter(PILLAR_COUNT - 1)).toContain(
      `0${PILLAR_COUNT} / 0${PILLAR_COUNT}`,
    );
  });

  test("the hint leaves the tree the first time a pillar is touched, and never returns", async () => {
    // DROPPED RATHER THAN FADED. An element that is still there is still a stop for
    // a screen reader and still a row in the panel's measure — and the pulse it
    // carries would go on breathing behind an opacity of 0. It is a ONE-WAY LATCH:
    // an instruction that reappeared when the pointer left would be an instruction
    // the reader has already followed, arriving again.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);
    expect(screen.getByTestId("shape-hint").className).toContain("shape-hint");

    const box = pillarBoxEl("strategy");
    await user.hover(box);
    expect(screen.queryByTestId("shape-hint")).toBeNull();

    await user.unhover(box);
    expectOnlyOpen("shape-idle", "back to idle");
    // The idle block is back and its two lines are back with it — the hint is not.
    expect(screen.getByTestId("shape-idle-eyebrow").textContent).toBe(C.idleEyebrow);
    expect(screen.queryByTestId("shape-hint")).toBeNull();
  });

  test("the CARET opens a pillar exactly as the pointer does", async () => {
    // WITHOUT THIS, `Tab` MOVES A FOCUS RING AROUND SIX BOXES THAT NEVER OPEN. The
    // caret is its own channel and not a second writer of `hovered` — see the blur in
    // the click handler for why the two cannot share a lifetime.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    // TABBED INTO FROM THE POSE BUTTONS, because `<Nav>` renders one control per
    // pose AHEAD of the slide and a bare `user.tab()` from a cold document would land
    // on `goto-0`. Starting the caret on the last of them and stepping once is the
    // honest version of "the next stop after the deck's own chrome is the ring", and
    // it is the claim worth making: the six boxes are the first controls in the
    // FIGURE's own DOM order, so Tab reaches the ring in ring order.
    act(() => screen.getByTestId(`goto-${STEP_COUNT - 1}`).focus());
    await user.tab();
    const first = C.pillars[0];
    expect(document.activeElement).toBe(pillarBoxEl(first.id));
    expect(activePillarIds()).toEqual([first.id]);
    expectOnlyOpen(`shape-decision-${first.id}`, "tabbed to the first pillar");

    // And a direct `.focus()` on any of them does the same, which is the half that
    // has to work for a deck driven from a screen reader rather than from Tab.
    act(() => pillarBoxEl("process").focus());
    expect(activePillarIds()).toEqual(["process"]);
    expectOnlyOpen("shape-decision-process", "focused by the caret");

    act(() => pillarBoxEl("process").blur());
    expect(activePillarIds()).toEqual([]);
    expectOnlyOpen("shape-idle", "caret left");
  });

  test("the pointer beats the caret where they disagree", async () => {
    // HOVER OVER FOCUS, in the one case they can disagree: the pointer moved last.
    // Tabbing to a pillar and then sweeping the mouse elsewhere should follow the
    // mouse; the caret has not moved and will still be there when the pointer leaves.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    act(() => pillarBoxEl("governance").focus());
    expect(activePillarIds()).toEqual(["governance"]);

    const tools = pillarBoxEl("tools");
    await user.hover(tools);
    expect(resolveFocus(NO_FOCUS, 1, 0), "walk.ts").toBe(1);
    expect(activePillarIds()).toEqual(["tools"]);
    expectOnlyOpen("shape-decision-tools", "pointer wins");

    // The caret is still where it was, so the pointer leaving falls back to it.
    expect(document.activeElement).toBe(pillarBoxEl("governance"));
    await user.unhover(tools);
    expect(activePillarIds()).toEqual(["governance"]);
    expectOnlyOpen("shape-decision-governance", "back to the caret");
  });
});

// ── the pin ──────────────────────────────────────────────────────────────────

describe("a click pins, a second click releases, and a third pillar moves it", () => {
  test("the pin survives the pointer leaving — which is the whole point of it", async () => {
    // A HOME RATHER THAN A LOCK. What a presenter wants from a pin on a slide they
    // are talking over is somewhere to RETURN to: sweep across the ring and each
    // pillar answers in turn, take the pointer off the figure — to the panel, to the
    // clicker, off the screen entirely — and it settles back on the one they chose to
    // stand on.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    const box = pillarBoxEl("people");
    await user.click(box);

    // NOTE ON `user.click`: it dispatches a pointer-originated click, so
    // `e.detail > 0` and the handler BLURS the button. That is intended and is the
    // one line that keeps a mouse click from painting a keyboard focus ring the next
    // time the presenter presses Space to advance. So the caret channel is empty
    // here, and what holds the pillar open is the pin alone.
    expect(document.activeElement).not.toBe(box);
    expect(pinnedPillarIds()).toEqual(["people"]);
    expect(box.getAttribute("aria-pressed")).toBe("true");
    // THE DOT ON THE BOX, and the word in the panel. Six pillars can be hovered and
    // only one can be pinned, so the two states have to be separable without moving
    // the pointer.
    expect(screen.getByTestId("shape-pillar-people-pin")).toBeInTheDocument();
    expect(screen.getByTestId("shape-decision-people-pin").textContent).toBe("· pinned");

    await user.unhover(box);
    expect(resolveFocus(2, NO_FOCUS, NO_FOCUS), "walk.ts").toBe(2);
    expect(activePillarIds(), "still lit with the pointer gone").toEqual(["people"]);
    expectOnlyOpen("shape-decision-people", "pinned, pointer away");
  });

  test("a second click on the same pillar releases it, and the panel returns to idle", async () => {
    // NOT A CLOSE BUTTON, NOT Esc, AND NOT A CLICK ON THE BACKGROUND: the background
    // is the deck's own click-to-advance target, so a "click away to unpin" rule
    // would unpin and step the slide with one press. The pillar that took the pin is
    // the only element that can give it back without arguing with the deck.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    const box = pillarBoxEl("companions");
    await user.click(box);
    expect(pinnedPillarIds()).toEqual(["companions"]);

    await user.click(box);
    expect(togglePin(5, 5), "walk.ts").toBe(NO_FOCUS);
    expect(pinnedPillarIds()).toEqual([]);
    expect(box.getAttribute("aria-pressed")).toBe("false");
    expect(screen.queryByTestId("shape-pillar-companions-pin")).toBeNull();
    expect(screen.queryByTestId("shape-decision-companions-pin")).toBeNull();

    // The pointer is still on the box, so the decision is still open — released is
    // not the same as closed. Take the pointer off and the panel goes idle.
    expectOnlyOpen("shape-decision-companions", "released but still hovered");
    await user.unhover(box);
    expectOnlyOpen("shape-idle", "released and left");
    expect(activePillarIds()).toEqual([]);
  });

  test("clicking a DIFFERENT pillar moves the pin rather than clearing it", async () => {
    // A rule that required an unpin first would make moving the pin cost two clicks
    // and would be the "pin is a mode" failure `resolveFocus` exists to avoid.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    await user.click(pillarBoxEl("governance"));
    expect(pinnedPillarIds()).toEqual(["governance"]);

    const strategy = pillarBoxEl("strategy");
    await user.click(strategy);
    expect(togglePin(0, 3), "walk.ts").toBe(3);
    // ONE PIN, and it is a list precisely so "two pinned at once" fails as a length.
    expect(pinnedPillarIds()).toEqual(["strategy"]);
    expect(screen.queryByTestId("shape-pillar-governance-pin")).toBeNull();
    expect(screen.getByTestId("shape-pillar-strategy-pin")).toBeInTheDocument();

    await user.unhover(strategy);
    expectOnlyOpen("shape-decision-strategy", "the pin moved");
  });

  test("the pin HOLDS THE COLUMN, and a hover elsewhere lights a box without moving the words", async () => {
    // THE ONE RULE THIS SLIDE'S PIN IS FOR (owner call, 2026-08-14). A presenter pins
    // Governance to talk over it; under the old hover-wins order their hand could not
    // then cross the figure — reaching for the clicker over Tools swapped the panel
    // out from under the sentence they were saying. A pin that only holds while
    // nothing else is touched is not a pin.
    //
    // AND THE RING IS NOT DEAD, which is the objection pin-wins invites and the reason
    // `isLit` exists: the hovered box still lights. Two boxes, one column.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    const governance = pillarBoxEl("governance");
    await user.click(governance);
    await user.unhover(governance);
    expect(activePillarIds()).toEqual(["governance"]);

    const tools = pillarBoxEl("tools");
    await user.hover(tools);
    expect(resolveFocus(0, 1, NO_FOCUS), "walk.ts · the column").toBe(0);
    expect(isLit(1, 0, 1, NO_FOCUS), "walk.ts · the ring").toBe(true);
    // BOTH LIT — the pinned pillar and the one under the hand — in ring order.
    expect(activePillarIds(), "the ring answers the hand").toEqual(["governance", "tools"]);
    // AND THE COLUMN HAS NOT MOVED. This is the assertion the change is for.
    expectOnlyOpen("shape-decision-governance", "the pin holds the column");
    // The pin is still where it was, and it is still the only one.
    expect(pinnedPillarIds()).toEqual(["governance"]);
    // WHICH OF THE TWO LIT BOXES OWNS THE COLUMN IS NOT LEFT TO THE EYE: the pin mark
    // is on one of them, and the panel says the word.
    expect(screen.getByTestId("shape-pillar-governance-pin")).toBeInTheDocument();
    expect(screen.queryByTestId("shape-pillar-tools-pin")).toBeNull();
    expect(screen.getByTestId("shape-decision-governance-pin").textContent).toBe("· pinned");

    // The hand leaves and the figure is back to the pin alone — nothing to reset.
    await user.unhover(tools);
    expect(activePillarIds(), "the pin alone").toEqual(["governance"]);
    expectOnlyOpen("shape-decision-governance", "the pin alone");

    // AND RELEASING IT HANDS THE COLUMN BACK TO THE POINTER. A pin that could not be
    // given back would be the "pin is a mode" failure, which is the real cost of this
    // order and is paid by the second click.
    await user.click(governance);
    expect(pinnedPillarIds()).toEqual([]);
    await user.hover(tools);
    expect(activePillarIds(), "released").toEqual(["tools"]);
    expectOnlyOpen("shape-decision-tools", "released, the pointer has the column back");
  });
});

// ── THE NO-DIM RULE (§7.1) ───────────────────────────────────────────────────

describe("no inactive pillar loses anything, at any hover", () => {
  // §7.1: "Inactive pillars keep full border and label; the active one *gains*
  // copper fill, a thickened spoke and a halo. Attention is bought with added
  // light, never subtracted." Said as a negative — no inactive pillar loses border,
  // label or luminance — over eleven ways of losing something, it is only checkable
  // as an identity: capture the resting figure once, then demand it back, field by
  // field, at all six hovers.

  test("the five pillars a hover is not about are byte-identical to their resting selves", async () => {
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);
    const resting = allSignatures();

    // POSITIVE CONTROL. If the capture were empty — six pillars that render no
    // inline style at all — every comparison below would pass vacuously.
    expect(resting.size).toBe(PILLAR_COUNT);
    C.pillars.forEach((p) => {
      const sig = resting.get(p.id)!;
      SIGNATURE_FIELDS.forEach((field) =>
        expect(sig[field], `${p.id} · ${field} captured`).not.toBe(""),
      );
    });

    for (const [i, pillar] of C.pillars.entries()) {
      const box = pillarBoxEl(pillar.id);
      await user.hover(box);

      C.pillars.forEach((other, j) => {
        if (j === i) return;
        const now = pillarSignature(other.id);
        const was = resting.get(other.id)!;
        // FIELD BY FIELD FIRST, so the failure names the property and the pillar.
        // A whole-object diff over 5 pillars × 11 fields × 6 hovers is unreadable,
        // and the message is what tells the next author whether a border moved or a
        // flow stopped surging.
        for (const field of SIGNATURE_FIELDS) {
          expect(now[field], `${pillar.id} open · ${other.id} · ${field}`).toBe(
            was[field],
          );
        }
        // THEN THE WHOLE OBJECT, which is not redundant: it is what catches a
        // TWELFTH field added to `PillarSignature` and forgotten in
        // `SIGNATURE_FIELDS`.
        expect(now, `${pillar.id} open · ${other.id}`).toEqual(was);
      });

      // THE VACUITY GUARD, and it belongs in this test rather than beside it. Every
      // assertion above is an EQUALITY, so a signature that read the wrong element,
      // or a renderer that stopped distinguishing the states at all, would satisfy
      // all of them. So: the ONE pillar the hover IS about must NOT match its
      // resting self. That is what says the capture discriminates, and it is the
      // same fact §7.1 states from the other side.
      expect(
        pillarSignature(pillar.id),
        `${pillar.id} is the one that changed`,
      ).not.toEqual(resting.get(pillar.id));

      await user.unhover(box);
      // AND THE RELEASE RESTORES ALL SIX, which is the claim that makes the sweep
      // repeatable: the next hover's reference figure is the same figure.
      C.pillars.forEach((p) =>
        expect(pillarSignature(p.id), `${pillar.id} released · ${p.id}`).toEqual(
          resting.get(p.id),
        ),
      );
    }
  });

  test("and no inactive pillar's border or spoke ever reaches a dim copper tier", async () => {
    // THE POSITIVE FORM OF THE SAME RULE, and the one that catches the specific
    // regression: the prototype ranks its inactive pillars TWICE MORE —
    // `--copper-800` for "not visited yet" and `--copper-600` for "already walked"
    // — so opening the fourth pillar also re-colours the three before it and five
    // boxes change on a gesture that is about the sixth. That ranking is deleted in
    // the renderer, not ported, and this is the assertion that says so out loud.
    //
    // IT IS NOT THE SAME TEST AS THE IDENTITY ABOVE. Identity would also hold if all
    // six pillars rested at `--copper-800` together; this says the resting tier
    // itself is not a "not yet" tier, at every hover, so the highlight has room to
    // add light without taking any.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    for (const [i, pillar] of C.pillars.entries()) {
      const box = pillarBoxEl(pillar.id);
      await user.hover(box);
      C.pillars.forEach((other, j) => {
        if (j === i) return;
        const sig = pillarSignature(other.id);
        // POSITIVE CONTROL, per pillar: there IS a copper token to be wrong.
        expect(sig.border, `${pillar.id} open · ${other.id}`).toContain("var(--copper-");
        expect(sig.spokeStroke, `${pillar.id} open · ${other.id}`).toContain(
          "var(--copper-",
        );
        for (const tier of DIM_COPPER_TIERS) {
          expect(
            sig.border,
            `${pillar.id} open · ${other.id} · border ${tier}`,
          ).not.toContain(tier);
          expect(
            sig.spokeStroke,
            `${pillar.id} open · ${other.id} · spoke ${tier}`,
          ).not.toContain(tier);
        }
        // The label stays full strength — the other half of §7.1's "keep full
        // border and label".
        expect(FULL_LABEL_TIERS, `${pillar.id} open · ${other.id} · label`).toContain(
          sig.labelColor,
        );
        // And rank is never carried in the opacity channel, which on this slide
        // means "not revealed yet".
        expect(
          pillarBoxEl(other.id).style.opacity,
          `${pillar.id} open · ${other.id} · opacity`,
        ).toBe("");
        // And its bead flow is still drifting inward, not surging out.
        expect(sig.flowClass, `${pillar.id} open · ${other.id} · flow`).not.toContain(
          "is-active",
        );
      });
      await user.unhover(box);
    }
  });
});

// ── what the ACTIVE pillar gains ─────────────────────────────────────────────

describe("the open pillar gains light and nothing else", () => {
  /** The five colour properties whose focus tier must sit at or ABOVE its resting
   *  one on the same ladder. Not the box fill — that one crosses ladders on
   *  purpose (neutral → copper) and is asserted separately below. */
  const RAMPED: readonly (keyof PillarSignature)[] = [
    "border",
    "iconColor",
    "labelColor",
    "spokeStroke",
    "flowStroke",
  ];

  test("a brighter tier on the border, icon, label, spoke and beads — never a darker one", async () => {
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);
    const resting = allSignatures();

    for (const pillar of C.pillars) {
      const box = pillarBoxEl(pillar.id);
      await user.hover(box);
      const now = pillarSignature(pillar.id);
      const was = resting.get(pillar.id)!;

      for (const field of RAMPED) {
        const where = `${pillar.id} · ${field}`;
        const before = brightnessOf(tokenIn(was[field], where), where);
        const after = brightnessOf(tokenIn(now[field], where), where);
        // SAME LADDER. A copper border that became a neutral one would be a hue
        // change dressed as an emphasis, and the two ladders have no shared
        // luminance order to compare across.
        expect(after.family, `${where} · ladder`).toBe(before.family);
        // AT OR BRIGHTER — the whole claim, as an ordering. `!==` would pass on a
        // DARKER tier, which is the failure §7.1 exists to forbid.
        expect(
          after.rung,
          `${where} · ${was[field]} → ${now[field]}`,
        ).toBeGreaterThanOrEqual(before.rung);
      }

      // BOTH LINES THICKEN, not merely re-colour (§7.1 names the spoke): 2.6 over
      // 1.6 on the drawn hairline and 3 over 2.4 on the bead, and the comparisons
      // are numeric so "2.6" vs "10" cannot pass as string order.
      expect(Number(now.spokeWidth), `${pillar.id} · spoke width`).toBeGreaterThan(
        Number(was.spokeWidth),
      );
      expect(Number(now.flowWidth), `${pillar.id} · bead width`).toBeGreaterThan(
        Number(was.flowWidth),
      );
      // AND THE FLOW REVERSES. This is the half of the highlight that is legible
      // from the back of a room where a 2px bead is not: the enabler answering the
      // pillar you asked about, one long stroke fired back out.
      expect(was.flowClass, `${pillar.id} · resting flow`).toBe("shape-spoke-flow");
      expect(now.flowClass, `${pillar.id} · surging flow`).toContain("is-active");

      await user.unhover(box);
    }
  });

  test("a copper fill where the resting box is the stage's own neutral", async () => {
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);
    const resting = allSignatures();

    for (const pillar of C.pillars) {
      const box = pillarBoxEl(pillar.id);
      await user.hover(box);
      const now = pillarSignature(pillar.id);
      const was = resting.get(pillar.id)!;

      // §7.1's "gains copper fill". THE LADDER CHANGES HERE, deliberately and
      // uniquely: the resting box is the STAGE's own colour (`--neutral-900`) so
      // that it is defined by its border alone, and the focused box is filled with
      // copper (`--copper-900`, #3d2413 against #0a0a0a). Brightness across two
      // ladders is not an ordering anyone can assert, so the claim is stated as
      // what it is — the fill changes family, from the stage to the accent.
      expect(was.background, `${pillar.id} · resting fill`).toContain("var(--neutral-");
      expect(now.background, `${pillar.id} · open fill`).toContain("var(--copper-");
      expect(now.background, `${pillar.id} · fill moved`).not.toBe(was.background);
      await user.unhover(box);
    }
  });

  test("a halo of exactly FOCUS_HALO_WIDTH, where the resting box has none", async () => {
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);
    const resting = allSignatures();

    for (const pillar of C.pillars) {
      const box = pillarBoxEl(pillar.id);
      await user.hover(box);

      // `none` → a hard copper ring. A SPREAD AND NOT A BLUR, which is why the
      // width is asserted as a number: `0 0 0 4px` paints exactly 4px outside the
      // box's own edge on every side, and that 4 is the number
      // `FOCUS_GROWTH_SPENT` adds to the floor budget by hand — because a
      // `box-shadow` is outside every layout measurement a browser can make.
      const now = pillarSignature(pillar.id);
      expect(resting.get(pillar.id)!.boxShadow, `${pillar.id} · resting halo`).toBe(
        "none",
      );
      expect(now.boxShadow, `${pillar.id} · halo`).toContain(`${FOCUS_HALO_WIDTH}px`);
      expect(now.boxShadow, `${pillar.id} · halo tier`).toContain("var(--copper-");
      // No offset and no blur, so the three leading lengths are zeroes.
      expect(now.boxShadow, `${pillar.id} · hard ring`).toMatch(/^0 0 0 /);
      // AND IT IS PAINTED OVER ITS NEIGHBOURS. At a flat z-index the ring's own
      // paint order decides, and pillars 1/2 and 4/5 are close enough that the later
      // box clips the earlier one's ring — a halo with a bite out of one side.
      expect(placementOf(pillar.id).style.zIndex, `${pillar.id} · over`).toBe("4");

      await user.unhover(box);
      expect(placementOf(pillar.id).style.zIndex, `${pillar.id} · back under`).toBe("2");
    }
  });

  test("FOCUS_SCALE on the button alone, and no opacity anywhere in the gesture", async () => {
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    for (const pillar of C.pillars) {
      const box = pillarBoxEl(pillar.id);
      await user.hover(box);

      // ONE TRANSFORM PER ELEMENT. The scale lives on the BUTTON, the centring
      // translate two parents up, and the arrival scale on the element between them
      // — so a pointer that lands on a box mid-build composes three matrices instead
      // of two keyframes fighting over one property.
      expect(box.style.transform, `${pillar.id} · grown`).toBe(`scale(${FOCUS_SCALE})`);
      expect(box.style.transform, `${pillar.id} · not re-placed`).not.toContain(
        "translate",
      );
      expect(placementOf(pillar.id).style.transform, `${pillar.id} · still centred`).toBe(
        "translate(-50%, -50%)",
      );

      // AND NO OPACITY CHANGE, WHICH IS THE POINT. On this slide opacity means
      // "not revealed yet" — it is the channel the build uses — so a highlight
      // expressed as an alpha (the prototype fills with `rgba(184,110,61,0.22)`)
      // would be a RANK in the one channel that carries TIME. Rank is a colour tier
      // here, always.
      expect(box.style.opacity, `${pillar.id} · open opacity`).toBe("");
      await user.unhover(box);
      expect(box.style.transform, `${pillar.id} · released`).toBe("scale(1)");
    }
  });
});

// ── the point lists ──────────────────────────────────────────────────────────

describe("every decision carries HR p4's own scope under it", () => {
  test("three or four points each, in order, rendered one per row", async () => {
    // THE DECISION IS THE ARGUMENT; THE POINTS ARE THE EVIDENCE FOR IT. "You decide
    // where the data may go" is a claim about the leader's desk, and a Div Head's
    // next question is always the same one — *what does that actually cover?* Four
    // nouns answer it in the time it takes to read them.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    for (const pillar of C.pillars) {
      const box = pillarBoxEl(pillar.id);
      await user.hover(box);

      const list = screen.getByTestId(`shape-decision-${pillar.id}-points`);
      expect(list.tagName, pillar.id).toBe("UL");
      const rows = [...list.querySelectorAll("li")].map((li) => li.textContent);
      // IN ORDER, and every one of them: a list that rendered a Set, or sliced to
      // three "so the six lists match", would pass a length check and lose a scope
      // nobody could see was missing.
      expect(rows, pillar.id).toEqual([...pillar.points]);

      await user.unhover(box);
    }
  });

  test("THREE OR FOUR, NEVER MORE — the panel is measured for four", () => {
    // HR p4 gives Governance four and the other five three, and the asymmetry is
    // KEPT rather than padded: a fourth line invented for Tools so the six lists
    // match would be a scope nobody wrote. Four is the ceiling because the column is
    // measured for four; a fifth would run the list into the figure's own floor.
    C.pillars.forEach((pillar) => {
      expect(pillar.points.length, `${pillar.id} · at least three`).toBeGreaterThanOrEqual(
        3,
      );
      expect(pillar.points.length, `${pillar.id} · at most four`).toBeLessThanOrEqual(4);
      expect(new Set(pillar.points).size, `${pillar.id} · no repeat`).toBe(
        pillar.points.length,
      );
      pillar.points.forEach((point) =>
        expect(point.trim(), `${pillar.id} · "${point}"`).not.toBe(""),
      );
    });
    // The asymmetry itself, pinned: exactly one pillar has four.
    expect(C.pillars.filter((p) => p.points.length === 4).map((p) => p.id)).toEqual([
      "governance",
    ]);
  });

  test("and NO VENDOR IS NAMED in any of them", () => {
    // A DEVIATION FROM HR p4 RATHER THAN A TRANSCRIPTION SLIP. HR p4's Tools list
    // opens "Claude + Gemini ecosystem"; §6.7's security block refuses every vendor
    // token by name for a Sinar Mas audience, and a centrepiece that printed two of
    // them four slides ahead of that refusal would make the refusal look like an
    // oversight. The scope survives without the brands.
    const vendors = [
      /\bclaude\b/i,
      /\banthropic\b/i,
      /\bgemini\b/i,
      /\bgoogle\b/i,
      /\bcopilot\b/i,
      /\bmicrosoft\b/i,
      /\bopenai\b/i,
      /\bchatgpt\b/i,
    ];
    const everyPoint = C.pillars.flatMap((p) => p.points);
    // POSITIVE CONTROL: the de-branded line is the one that carried them.
    expect(everyPoint).toContain("One approved model ecosystem");
    everyPoint.forEach((point) =>
      vendors.forEach((v) => expect(point, `"${point}" · ${v}`).not.toMatch(v)),
    );
  });
});

// ── the panel, as one slot holding eight things ──────────────────────────────

describe("the panel", () => {
  test("is ONE element, so the hairline cannot blink", () => {
    // THE PROTOTYPE'S BUG, asserted away. It drew its beats in one bordered panel
    // and its closer in a SECOND bordered block at the same left edge, each with its
    // own `opacity: … ? 1 : 0` — so at the closer the left hairline faded out and
    // back in in the same place. Two elements pretending to be one column, and the
    // blink is what gives it away on a projector.
    //
    // ASSERTED THREE WAYS, because "one element" has three failure modes. One node
    // in the tree, the SAME node across the pose the blink would happen on (React
    // remounting it is the same blink without the duplicate), and the border declared
    // on the COLUMN rather than on the things inside it.
    renderOrg(gems, POSE.FIGURE);
    expect(document.querySelectorAll('[data-testid="shape-walk-column"]')).toHaveLength(1);
    const atFigure = screen.getByTestId("shape-walk-column");
    expect(atFigure.style.borderLeft).toContain("solid");
    expect(atFigure.style.borderLeft).toContain("var(--copper-");

    goToPose(POSE.RECAP);
    // IDENTITY, not equality: the same DOM node, so nothing unmounted and remounted
    // between the figure and the recap.
    expect(screen.getByTestId("shape-walk-column")).toBe(atFigure);
    expect(screen.getByTestId("shape-walk-column").style.borderLeft).toBe(
      atFigure.style.borderLeft,
    );
    // And no child of it carries a border of its own to blink instead.
    PANEL_BLOCKS.forEach((id) =>
      expect(screen.getByTestId(id).style.borderLeft, id).toBe(""),
    );
  });

  test("mounts all eight blocks in the same rectangle, at both poses", () => {
    renderOrg(berau, POSE.FIGURE);
    const column = screen.getByTestId("shape-walk-column");

    for (const pose of POSES) {
      goToPose(pose);
      PANEL_BLOCKS.forEach((id) => {
        const block = screen.getByTestId(id);
        expect(block, `pose ${pose} · ${id}`).toBeInTheDocument();
        expect(column.contains(block), `pose ${pose} · ${id} inside the column`).toBe(
          true,
        );
        // THE SAME RECTANGLE for all eight, which is what makes the cross-fade a
        // cross-fade rather than a re-layout: the eyebrow does not move by the
        // difference between two label lengths.
        expect(block.style.left, `pose ${pose} · ${id}`).toBe(`${WALK_COLUMN.rulePad}px`);
        expect(block.style.top, `pose ${pose} · ${id}`).toBe("50%");
        expect(block.style.transform, `pose ${pose} · ${id}`).toBe("translateY(-50%)");
      });
      // NEVER EMPTY AND NEVER DOUBLED, at either pose.
      expect(openBlockIds(), `pose ${pose}`).toHaveLength(1);
      // And the seven that are shut cannot take a click from the one underneath.
      PANEL_BLOCKS.filter((id) => !openBlockIds().includes(id)).forEach((id) =>
        expect(screen.getByTestId(id).style.pointerEvents, `pose ${pose} · ${id}`).toBe(
          "none",
        ),
      );
    }
  });

  test("takes its rectangle off the ring, so re-cutting the ellipse moves it", () => {
    // The prototype's panel was `top: 196, bottom: 116` — hand-picked beside a
    // ring whose top box started at 202 (6px of misalignment nobody could see) and
    // whose floor was at 658 while the panel stopped at 604, 54px short of it for
    // no stated reason. These four are derived instead.
    expect(WALK_COLUMN.top).toBe(pillarBox(0).top);
    expect(WALK_COLUMN.bottom).toBe(LOWEST_PILLAR_BOTTOM);
    expect(WALK_COLUMN.left).toBe(WALK_COLUMN_LEFT);
    expect(WALK_COLUMN.right).toBe(SIDE_MARGIN);
    // And there is no `width`: one was carried here, read by nothing but this
    // assertion, and named for the column's outer edge rather than the measure the
    // type gets. `scripts/gh55-verify.mjs` measures the content box off the element.
    expect("width" in WALK_COLUMN).toBe(false);
    // Symmetric about the hub's own eye level, which is why the eight blocks inside
    // share one `top: 50%` instead of stacking from the top: the panel is a REPLY to
    // the hub, and a reply set 190px above it makes the room's eye travel up and back
    // down on every hover.
    expect((WALK_COLUMN.top + WALK_COLUMN.bottom) / 2).toBe(HUB.y);
    // Left of the column is the figure, right of it is the margin: the whole
    // horizontal budget, read from both ends.
    expect(WALK_COLUMN.left).toBeGreaterThan(FOCUSED_OUTERMOST_RIGHT);

    // `bottom` IS A CSS OFFSET AND `WALK_COLUMN.bottom` IS A STAGE Y, hence the
    // subtraction in the renderer.
    renderOrg(gems);
    const column = screen.getByTestId("shape-walk-column");
    expect(column.style.left).toBe(`${WALK_COLUMN.left}px`);
    expect(column.style.right).toBe(`${WALK_COLUMN.right}px`);
    expect(column.style.top).toBe(`${WALK_COLUMN.top}px`);
    expect(column.style.bottom).toBe(`${720 - WALK_COLUMN.bottom}px`);
    expect(column.style.paddingLeft).toBe(`${WALK_COLUMN.rulePad}px`);
  });

  test("the closer is NOT in the bottom strip — there is no bottom strip left", () => {
    // §7.1's ONE RECORDED LAYOUT RISK, as the reason for a layout decision rather
    // than as prose. The lowest pillar's box already reaches 610 of a 632 floor and
    // GROWS to 616.52 when it is lit — which, at the recap, is ALWAYS — so a closer
    // set under the figure would sit either inside the NavBar's hover band or under a
    // lit pillar's own halo.
    expect(FOCUSED_LOWEST_PILLAR_BOTTOM).toBeGreaterThan(WALK_COLUMN.bottom);
    expect(NAV_ZONE_TOP - FOCUSED_LOWEST_PILLAR_BOTTOM).toBeLessThan(24);

    // And structurally: the closer's box is the recap block's, inside the column,
    // not a second one at the stage's foot.
    renderOrg(berau, POSE.RECAP);
    const closer = screen.getByTestId("shape-closer");
    expect(screen.getByTestId("shape-walk-column").contains(closer)).toBe(true);
    expect(closer.style.position).toBe("");
    expect(closer.style.bottom).toBe("");
  });
});

// ── section D's words — the index claim (§6.6) ────────────────────────────────

describe("the decisions index the section behind them", () => {
  /**
   * THE CONTRACT, AS A TABLE. §6.6: the centrepiece is the index for section D —
   * "security and no-SOP land on *Governance & Policies*, subscriptions on *Tools &
   * Platform*, 'Leading AI Culture' on *People & Mindset* + *Strategy & Leadership*".
   * The mechanism is the WORDS: a leader hears the same vocabulary again two sections
   * later, with no pointer line announcing it.
   *
   * WHAT THIS TEST CAN AND CANNOT PROVE, and it is the whole reason the table cites
   * a spec section per row. Section D's three slides that these words point at —
   * `invest-security` (D.4), `invest-subscription` (D.5) and `invest-chicken-egg`
   * (D.3) — **DO NOT EXIST YET**. Only `invest-own-proof` (D.2) is built. So this
   * table is held against the SPEC's words and NOT against a rendered slide: it
   * proves C.1 says what §6.6/§6.7 say it must, and it cannot prove that D.4 says it
   * back. When those three slides land, THIS TABLE IS THE CONTRACT THEY MUST MATCH —
   * and the failure it is here to prevent is the one §6.6 names: if the wording
   * drifts, C.1 stops indexing anything and becomes six nice sentences.
   *
   * `people` AND `strategy` BOTH CARRY `culture`, ON PURPOSE. §6.6 lands "Leading AI
   * Culture" on the pair, so the anchor is shared and neither row may drop it.
   */
  const INDEX_WORDS: readonly {
    readonly id: string;
    readonly why: string;
    readonly words: readonly RegExp[];
  }[] = [
    {
      id: "governance",
      why: "§6.7 D.4 beat 1 “where your data actually goes” · §6.2/B.2 “there is no guidance, so people improvise”",
      words: [/\bdata\b/i, /improvis/i],
    },
    {
      id: "tools",
      why: "§6.7 D.5 “company-managed seats”",
      words: [/company-managed seat/i],
    },
    {
      id: "people",
      why: "§6.6 “Leading AI Culture” on People & Mindset",
      words: [/\bculture\b/i],
    },
    {
      id: "strategy",
      why: "§6.7 D.3’s 30-day proof pilot · §6.6 “Leading AI Culture” on Strategy & Leadership",
      words: [/\bpilot\b/i, /\blead/i, /\bculture\b/i],
    },
  ];

  test("each decision carries the vocabulary its section D pass uses", () => {
    for (const row of INDEX_WORDS) {
      const pillar = C.pillars.find((p) => p.id === row.id);
      // POSITIVE CONTROL: the pillar the row names exists, so a renamed id fails
      // here rather than making every `toMatch` below unreachable.
      expect(pillar, `${row.id} is a pillar`).toBeDefined();
      for (const word of row.words) {
        expect(pillar!.decision, `${row.id} · ${word} · ${row.why}`).toMatch(word);
      }
    }
  });

  /**
   * THE RECAP CARRIES THE SAME ANCHORS, AND IT IS THE LAST PLACE THEY ARE SAID.
   *
   * ONE ANCHOR PER PILLAR, AND ALL SIX, where the table above only covers the four
   * §6.6 names outright. The recap is where the index is HANDED OVER — it is the
   * frame the room leaves with, and a fragment polished free of its anchor would
   * leave the slide indexing nothing at exactly that moment.
   *
   * NOT DERIVED FROM `decisionKw`, though four of the six would survive the
   * derivation. The keyword is chosen for what should go copper INSIDE a full
   * sentence, and the fragment for what reads alone in a list. Two jobs, two fields,
   * held to the same anchors rather than to each other — which is why this table
   * checks BOTH strings against the same word.
   */
  const RECAP_ANCHORS: readonly { readonly id: string; readonly anchor: RegExp }[] = [
    { id: "governance", anchor: /\bdata\b/i },
    { id: "tools", anchor: /company-managed seat/i },
    { id: "people", anchor: /\bculture\b/i },
    { id: "strategy", anchor: /\bpilot\b/i },
    { id: "process", anchor: /\bsigns\b/i },
    { id: "companions", anchor: /\bagent\b/i },
  ];

  test("and every recap fragment carries its decision's anchor word", () => {
    expect(RECAP_ANCHORS.map((r) => r.id), "all six, not four").toEqual(
      C.pillars.map((p) => p.id),
    );
    for (const row of RECAP_ANCHORS) {
      const pillar = C.pillars.find((p) => p.id === row.id)!;
      expect(pillar.recap, `${row.id} · recap · ${row.anchor}`).toMatch(row.anchor);
      // THE SAME WORD IN BOTH, which is the assertion that keeps the two fields
      // from drifting apart one copy edit at a time.
      expect(pillar.decision, `${row.id} · decision · ${row.anchor}`).toMatch(row.anchor);
    }
    // Six distinct fragments — a copy-paste that left two pillars sharing one would
    // otherwise pass every mapping assertion in this file.
    expect(new Set(C.pillars.map((p) => p.recap)).size).toBe(PILLAR_COUNT);
  });

  test("and every decision is a leader's DECISION, not a description of a pillar", () => {
    // §6.6's actual failure mode. "Governance & Policies" is a box on an org chart
    // and every leader in the room already agrees with it; six descriptions make
    // this slide a taxonomy nobody argues with. All six open on the same stem, and
    // THE REPETITION IS THE ARGUMENT — one sentence answered six ways, so by the
    // fourth the room hears the stem rather than reading a new sentence, and the stem
    // is the claim the closer then states outright.
    C.pillars.forEach((pillar) => {
      expect(pillar.decision, pillar.id).toMatch(/^You decide /);
      expect(pillar.decision, pillar.id).toMatch(/[.]$/);
      // And it is not the pillar's own name restated.
      expect(pillar.decision, pillar.id).not.toContain(pillar.label);
    });
    expect(new Set(C.pillars.map((p) => p.decision)).size).toBe(PILLAR_COUNT);
  });

  test("and the `→ ACT III ·` pointer line #16 wrote is NOT ported", async () => {
    // The prototype prints a mono `→ ACT III · …` pointer under each decision.
    // Refused, and stated in `content.ts` as a deviation rather than left to be
    // discovered by diffing: one of its six lines IS `Specify · Generate · Verify`
    // (the panel §6.6 drops), and the `ACT III` prefix names a movement THIS deck
    // never tells the audience exists. §6.6's requirement is that the slide INDEXES
    // section D, and the anchor words above are the index — a line of mono chrome
    // would announce the cross-reference instead of making it.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);
    // Every decision block is mounted at every state, so one open pillar is enough
    // to have all six point lists in `document.body`.
    await user.hover(pillarBoxEl("process"));

    const text = document.body.textContent ?? "";
    expect(text, "positive control").toContain(C.pillars[4].decision);
    expect(text).not.toMatch(/\bact\s+(i{1,3}|1|2|3)\b/i);

    // THE ARROW IS NOT REFUSED — ONE STRING IS ALLOWED TO HOLD IT, and saying which
    // is more useful than a blanket ban that a later author would have to break.
    // "Tool → Companion → Agent" is HR p4's own third sub-bullet on the companions
    // pillar and it is B.5's ladder in three words: a THRESHOLD, printed as a
    // sequence. The refused panel is Specify → Generate → Verify, which is a METHOD.
    // The arrows are the same and nothing else is.
    const ALLOWED_ARROWS = "Tool → Companion → Agent";
    expect(text, "positive control").toContain(ALLOWED_ARROWS);
    expect(
      text.split(ALLOWED_ARROWS).join(""),
      "no other arrow reaches the stage",
    ).not.toContain("→");
  });
});

// ── the panel §6.6 refuses ───────────────────────────────────────────────────

describe("Specify → Generate → Verify appears nowhere", () => {
  test("at both poses, under any brand, with every pillar open in turn", async () => {
    // §6.6 DROPS the HR original's panel — C.4 (leader F.4) already does it
    // better — and the freed space is what the six decisions and their point lists
    // are spent on. It is REFUSED, NOT PENDING, and this is the assertion that says
    // so out loud so nobody re-adds it as "the bit that's missing".
    //
    // EXTENDED TO THE POINT LISTS, which is why this test now hovers. Eighteen new
    // strings landed under the six decisions with this rewrite, and the PROCESS
    // pillar is exactly where a paraphrase would go: the prototype pointed that
    // pillar at Specify · Generate · Verify, and HR p4's own three sub-bullets
    // ("Adoption framework", "Change management", "Structured pilots") are what say
    // the process thing without them. All six blocks are mounted at all times, so one
    // hover per pass would do — the sweep is kept because a block that only rendered
    // its points when open would otherwise hide half the new copy from this check.
    const user = userEvent.setup();
    const FORBIDDEN = [/\bspecify\b/i, /\bgenerate\b/i, /\bverify\b/i];

    for (const brandLine of [gems, berau, hubBrandLineFor("general")]) {
      for (const pose of POSES) {
        const { unmount } = renderOrg(brandLine, pose);

        for (const pillar of [null, ...C.pillars]) {
          if (pillar && acceptsPointer(pose)) await user.hover(pillarBoxEl(pillar.id));
          const text = document.body.textContent ?? "";
          const where = `pose ${pose} · ${pillar?.id ?? "idle"}`;
          // POSITIVE CONTROL FIRST. Every assertion below is a `not.toMatch` over
          // this one string, so an empty stage would pass all of them.
          expect(text, where).toContain(C.headline);
          expect(text, where).toContain("The Enabler");
          expect(text, where).toContain(C.pillars[0].decision);
          expect(text, where).toContain(C.pillars[4].points[0]);

          for (const word of FORBIDDEN) {
            expect(text, `${where} · ${word}`).not.toMatch(word);
          }
        }
        unmount();
      }
    }
  });

  test("and no authored string on this slide contains one of the three words", () => {
    // THE AUTHORED HALF, so a string written into `content.ts` but not yet rendered
    // anywhere still fails. The rendered check above cannot see copy that has no
    // element yet; this one can.
    const authored = [
      C.figLabel,
      C.headline,
      C.hubLabel,
      C.idleEyebrow,
      C.idleLead,
      C.hint,
      C.decisionEyebrow,
      C.recapEyebrow,
      C.closer,
      ...C.pillars.flatMap((p) => [p.label, p.decision, p.recap, ...p.points]),
    ];
    authored.forEach((copy) => {
      for (const word of [/\bspecify\b/i, /\bgenerate\b/i, /\bverify\b/i]) {
        expect(copy, `"${copy}" · ${word}`).not.toMatch(word);
      }
    });
  });
});

// ── the subtitle that was cut ────────────────────────────────────────────────

describe("the standing kicker is GONE", () => {
  // A mono line — "AN OPERATING MODEL — NOT A DEPARTMENT, NOT A COMMITTEE" — used to
  // print under the headline at every one of the nine poses, in the band at y = 134.
  // It is cut, owner call (2026-08-13), and CUT RATHER THAN MOVED: the same words
  // re-set in the panel would be the same slot spent in a quieter place, and the
  // panel's idle lead already says what shape this is.
  //
  // ASSERTED AS AN ABSENCE FROM THE STAGE, not merely as an unrendered field. A
  // field left in the content module "for later" is how deleted copy comes back — so
  // this checks both the key and the glyphs.

  const CUT_PHRASES = ["AN OPERATING MODEL", "NOT A DEPARTMENT", "NOT A COMMITTEE"];

  test("`shapeOrgContent` has no `kicker` key", () => {
    expect("kicker" in C).toBe(false);
    // POSITIVE CONTROL on the same object, so a typo'd property name in the check
    // above cannot make it pass by accident.
    expect("headline" in C).toBe(true);
    expect("idleLead" in C).toBe(true);
  });

  test("no `shape-kicker` element, and none of its words, at either pose under any brand", () => {
    for (const brandLine of [gems, berau, hubBrandLineFor("general")]) {
      for (const pose of POSES) {
        const { unmount } = renderOrg(brandLine, pose);
        expect(screen.queryByTestId("shape-kicker"), `pose ${pose}`).toBeNull();

        const text = (document.body.textContent ?? "").toUpperCase();
        // POSITIVE CONTROL: the headline that now stands alone over the figure IS
        // there, so the absences below are absences from a populated stage.
        expect(text, `pose ${pose}`).toContain(C.headline.toUpperCase());
        CUT_PHRASES.forEach((phrase) =>
          expect(text, `pose ${pose} · ${phrase}`).not.toContain(phrase),
        );
        unmount();
      }
    }
  });

  test("and the idle lead did not quietly become the kicker in another face", () => {
    // THE MOVE THAT WAS REFUSED. `idleLead` sits where a reader would most expect
    // the cut line to reappear, so it is held to the words: it describes the SHAPE
    // ("one enabling function", "only work together") and it does not re-state the
    // negation the kicker carried.
    const lead = C.idleLead.toUpperCase();
    CUT_PHRASES.forEach((phrase) => expect(lead, phrase).not.toContain(phrase));
    expect(C.idleLead).toContain("One enabling function");
    // AND IT DOES NOT SPEND THE CLOSER EITHER. "None of them is a tool purchase" is
    // the recap's last line and the sentence the whole figure exists to earn; an
    // idle lead that previewed it would make the recap a repeat.
    expect(C.idleLead).not.toContain("tool purchase");
  });
});

// ── the geometry, on its own terms ───────────────────────────────────────────

describe("the ring geometry", () => {
  // ASSERTED AS INDEPENDENT INVARIANTS, not by calling the thing being checked.
  // The renderer reads `PILLAR_CENTRES` and `spokeSegment`, so a test that
  // expects `spokeSegment(i)` and renders `spokeSegment(i)` passes on any return
  // value at all — including a coordinate off the figure, which is precisely the
  // class of bug this module was rewritten to fix. These are properties a ring
  // has.

  test("six points, evenly spaced on the ellipse, starting at twelve o'clock", () => {
    expect(PILLAR_CENTRES).toHaveLength(PILLAR_COUNT);

    PILLAR_CENTRES.forEach((p, i) => {
      // ON the ellipse: the normalised radius is 1 for every point.
      const r = ((p.x - HUB.x) / RING.rx) ** 2 + ((p.y - HUB.y) / RING.ry) ** 2;
      expect(r, `pillar ${i} is on the ellipse`).toBeCloseTo(1, 10);
    });

    // Index 0 is the top of the ring, which is what makes the ring's array order a
    // READING order — a ring is scanned clockwise from twelve o'clock by everyone.
    expect(PILLAR_CENTRES[0].x).toBe(HUB.x);
    expect(PILLAR_CENTRES[0].y).toBeLessThan(HUB.y);

    // Evenly spaced, read as the symmetry that spacing produces: the ring
    // mirrors about the hub's vertical axis, and the two pairs share a y.
    expect(PILLAR_CENTRES[3].x).toBe(HUB.x);
    expect(PILLAR_CENTRES[3].y).toBeGreaterThan(HUB.y);
    expect(PILLAR_CENTRES[1].x - HUB.x).toBeCloseTo(HUB.x - PILLAR_CENTRES[5].x, 10);
    expect(PILLAR_CENTRES[2].x - HUB.x).toBeCloseTo(HUB.x - PILLAR_CENTRES[4].x, 10);
    expect(PILLAR_CENTRES[1].y).toBeCloseTo(PILLAR_CENTRES[5].y, 10);
    expect(PILLAR_CENTRES[2].y).toBeCloseTo(PILLAR_CENTRES[4].y, 10);
  });

  test("every box clears the header band and stays out of the panel's column", () => {
    // The horizontal budget and the ceiling half of the vertical one, held as
    // numbers rather than prose. AT REST — the lit pose is measured in the describe
    // below, and it does NOT clear the side margin, deliberately.
    //
    // THE CEILING NUMBER DID NOT MOVE WHEN THE KICKER WENT. `FIGURE_CEILING` was
    // never the kicker's floor, it was the FIGURE's, and the figure's relationship to
    // the headline is unchanged — the band between them is simply empty now. `KICKER_TOP`
    // is deleted from `geometry.ts` rather than kept at 134 "in case", because a
    // coordinate that nothing places anything at is a coordinate the next author will
    // place something at, and there is no assertion here to replace the one that
    // compared the two.
    expect(FIGURE_CEILING).toBe(152);
    for (let i = 0; i < PILLAR_COUNT; i++) {
      const box = pillarBox(i);
      expect(box.left, `pillar ${i} left margin`).toBeGreaterThanOrEqual(SIDE_MARGIN);
      // The figure has to fit between the margin and the column the panel writes
      // into, and this is the assertion that stops a "let's widen the ring" edit
      // from taking the column's space.
      expect(box.right, `pillar ${i} clears the panel column`).toBeLessThanOrEqual(
        WALK_COLUMN_LEFT,
      );
      expect(box.top, `pillar ${i} clears the headline`).toBeGreaterThanOrEqual(
        FIGURE_CEILING,
      );
    }
  });

  test("the lowest pillar clears the NavBar hover band, with the growth paid for", () => {
    // §7.1's ONE RECORDED RISK, as arithmetic. The band's top edge is 632 —
    // `.nav-zone` is `bottom: 0; height: 88px` — and the prototype's numbers put
    // the lowest box bottom at 658, i.e. 26px inside it.
    expect(NAV_ZONE_TOP).toBe(720 - 88);

    // WHICH pillar is lowest is derived, not assumed, so re-cutting the ring
    // moves the budget with it.
    const lowest = PILLAR_CENTRES.reduce(
      (acc, p, i) => (p.y > PILLAR_CENTRES[acc].y ? i : acc),
      0,
    );
    expect(LOWEST_PILLAR_INDEX).toBe(lowest);
    expect(LOWEST_PILLAR_BOTTOM).toBe(PILLAR_CENTRES[lowest].y + PILLAR_BOX.h / 2);

    // The clearance is asserted against the CONSTANT and its derivation, so a
    // later edit that lowers the ellipse fails here instead of silently
    // re-entering the band.
    expect(NAV_ZONE_CLEARANCE).toBe(NAV_ZONE_TOP - LOWEST_PILLAR_BOTTOM);
    expect(LOWEST_PILLAR_BOTTOM).toBeLessThan(NAV_ZONE_TOP);

    // AND THE HEADROOM THE HIGHLIGHT WAS RESERVED, which is spent — see the lit-pose
    // describe for what it actually cost.
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(FOCUS_GROWTH_RESERVE);
    expect(LOWEST_PILLAR_BOTTOM + FOCUS_GROWTH_RESERVE).toBeLessThanOrEqual(NAV_ZONE_TOP);
  });

  test("refuses a pillar the ring does not have, rather than wrapping it", () => {
    // A seventh pillar folded onto the first renders as five pillars and one that
    // looks emphasised — the state §7.1 forbids at rest, arriving by accident.
    expect(() => pillarCentre(PILLAR_COUNT)).toThrow(/no pillar/);
    expect(() => pillarCentre(-1)).toThrow(/no pillar/);
    expect(() => spokeSegment(PILLAR_COUNT)).toThrow(/no pillar/);
  });

  test("every spoke runs box edge → disc edge, and none of them is NaN", () => {
    for (let i = 0; i < PILLAR_COUNT; i++) {
      const spoke = spokeSegment(i);
      const box = pillarBox(i);
      const centre = pillarCentre(i);

      // NO NaN. Pillars 0 and 3 sit exactly above and below the hub, where the
      // horizontal box crossing is at infinity — two of six spokes, and the
      // guard that keeps that term out of the `min` is the only thing between
      // this figure and two missing lines.
      for (const v of [spoke.x1, spoke.y1, spoke.x2, spoke.y2]) {
        expect(Number.isFinite(v), `spoke ${i} is finite`).toBe(true);
      }

      // The pillar end is OUTSIDE its own box, by the standoff, measured along
      // the ray — so the spoke is not drawn under the box that hides it.
      const insideBox =
        spoke.x1 > box.left &&
        spoke.x1 < box.right &&
        spoke.y1 > box.top &&
        spoke.y1 < box.bottom;
      expect(insideBox, `spoke ${i} starts outside its box`).toBe(false);

      // The hub end is OUTSIDE the disc, by the same standoff — exactly, because
      // that end is measured on a circle and not on a rectangle.
      const fromHub = Math.hypot(spoke.x2 - HUB.x, spoke.y2 - HUB.y);
      expect(fromHub, `spoke ${i} stops clear of the disc`).toBeCloseTo(
        HUB.r + SPOKE_STANDOFF,
        10,
      );

      // And it points AT the hub: the pillar end is farther from the hub than the
      // hub end is, and both ends lie on the segment between them.
      expect(
        Math.hypot(spoke.x1 - HUB.x, spoke.y1 - HUB.y),
        `spoke ${i} runs inward`,
      ).toBeGreaterThan(fromHub);
      expect(
        Math.hypot(spoke.x1 - centre.x, spoke.y1 - centre.y),
        `spoke ${i} leaves its own pillar`,
      ).toBeGreaterThan(0);
    }
  });

  test("and both of a spoke's lines are drawn on the SAME segment", () => {
    // TWO ELEMENTS, ONE GEOMETRY. The drawn hairline and the bead overlay are
    // separate facts — the structure has to survive `prefers-reduced-motion: reduce`,
    // where the overlay is removed outright, and a single line cannot be both solid
    // and travelling — but they are the same LINE, and a bead track that had drifted
    // off its own spoke would read as a rendering fault nobody could name.
    renderOrg(gems);
    C.pillars.forEach((pillar, i) => {
      const seg = spokeSegment(i);
      const spoke = screen.getByTestId(`shape-spoke-${pillar.id}`);
      const flow = screen.getByTestId(`shape-flow-${pillar.id}`);
      for (const end of ["x1", "y1", "x2", "y2"] as const) {
        expect(spoke.getAttribute(end), `${pillar.id} · ${end}`).toBe(String(seg[end]));
        expect(flow.getAttribute(end), `${pillar.id} · flow ${end}`).toBe(
          String(seg[end]),
        );
      }
    });
  });
});

// ── the LIT pose, measured (§7.1's re-check) ─────────────────────────────────

describe("the lit pose's geometry", () => {
  // §7.1 asked ONE question about this figure — "the lowest satellite … grows on
  // focus. Re-check clearance when rebuilt." — and it is answered at the LIT pose
  // rather than the resting one, because the lit pose is reached in front of a room.
  //
  // AND IT IS NOW REACHED BY ALL SIX AT ONCE. Under nine poses the lowest pillar
  // grew for exactly one beat of nine; at the recap every pillar is grown
  // simultaneously, which is the same arithmetic applied six times rather than a new
  // risk — but it is worth asserting as the whole figure, because "the lowest one
  // fits" and "all six fit" are different sentences and only the second one is true
  // of this slide.
  //
  // FLOAT CAUTION, ALL THE WAY THROUGH. `1.07 - 1` is `0.07000000000000006`, so
  // `FOCUS_GROWTH_SPENT` is 6.520000000000002, `FOCUSED_NAV_ZONE_CLEARANCE` is
  // 15.480000000000018, `FOCUSED_MARGIN_INTRUSION` is 9.347113059642808 and
  // `FOCUSED_WALK_COLUMN_GAP` is 22.65288694035712. `toBe(6.52)` FAILS. What holds
  // to the bit is the RELATIONS, so the relations are what is asserted and
  // `toBeCloseTo` only pins the human-readable value beside them.

  test("the highlight spends less than gh#54 reserved for it", () => {
    // `72 × 0.07 ÷ 2 + 4` — HALF the scale's growth, because the box scales about
    // its own centre and only the downward half travels toward the floor, plus the
    // WHOLE halo, because the ring is painted outside the scaled edge and is
    // invisible to every layout measurement.
    expect(FOCUS_GROWTH_SPENT).toBe(
      (PILLAR_BOX.h * (FOCUS_SCALE - 1)) / 2 + FOCUS_HALO_WIDTH,
    );
    expect(FOCUS_GROWTH_SPENT).toBeCloseTo(6.52, 10);
    // THE ESTIMATE WAS NOT EXCEEDED. gh#54 reserved 8 one ticket before the
    // highlight existed; this is the assertion that it fitted inside, and the one
    // that fails if a later edit reaches for a heavier halo or a 1.2 scale.
    expect(FOCUS_GROWTH_SPENT).toBeLessThanOrEqual(FOCUS_GROWTH_RESERVE);
    // 1.15 would cost 9.4 and not fit — pinned so the scale is not read as taste.
    expect((PILLAR_BOX.h * 0.15) / 2 + FOCUS_HALO_WIDTH).toBeGreaterThan(
      FOCUS_GROWTH_RESERVE,
    );
  });

  test("the LIT lowest pillar still clears the NavBar hover band", () => {
    // THE AC'S OWN CLAIM: "the focused bottom pillar — at its grown size — clears
    // the NavBar hover zone at 1280×720". The rendered half of that is measured by
    // `scripts/gh55-verify.mjs`; this is the arithmetic it is measured against, and
    // it is the half that can see the halo at all.
    expect(FOCUSED_LOWEST_PILLAR_BOTTOM).toBe(LOWEST_PILLAR_BOTTOM + FOCUS_GROWTH_SPENT);
    expect(FOCUSED_LOWEST_PILLAR_BOTTOM).toBeLessThan(NAV_ZONE_TOP);
    expect(FOCUSED_NAV_ZONE_CLEARANCE).toBeGreaterThan(0);
    expect(FOCUSED_NAV_ZONE_CLEARANCE).toBe(NAV_ZONE_TOP - FOCUSED_LOWEST_PILLAR_BOTTOM);
    expect(FOCUSED_NAV_ZONE_CLEARANCE).toBeCloseTo(15.48, 10);
    // The prototype's equivalent is −26 at rest and −32.66 once its own 76px box is
    // focused, and nothing in the prototype said so.
    expect(
      NAV_ZONE_TOP - (658 + (76 * (FOCUS_SCALE - 1)) / 2 + FOCUS_HALO_WIDTH),
    ).toBeLessThan(0);
  });

  test("and at the recap ALL SIX are grown at once, and the whole figure still fits", () => {
    // THE BUDGET, RE-SPENT SIX TIMES SIMULTANEOUSLY. Every box is at
    // `scale(FOCUS_SCALE)` under a 4px halo at pose 1, so the two edges the budget is
    // about — the floor and the column — are under the whole ring at the same moment
    // rather than under one pillar at a time.
    renderOrg(berau, POSE.RECAP);
    expect(activePillarIds(), "all six lit").toEqual(C.pillars.map((p) => p.id));

    for (const i of PILLAR_INDEXES) {
      const grown = focusedPillarBox(i);
      expect(grown.bottom, `pillar ${i} clears the NavBar band`).toBeLessThan(
        NAV_ZONE_TOP,
      );
      expect(grown.right, `pillar ${i} clears the panel column`).toBeLessThan(
        WALK_COLUMN_LEFT,
      );
      expect(grown.left, `pillar ${i} is on the stage`).toBeGreaterThan(0);
      expect(grown.top, `pillar ${i} clears the headline`).toBeGreaterThan(FIGURE_CEILING);
    }
    // And the two extremes, read off the scan rather than off a hand-picked index.
    expect(FOCUSED_OUTERMOST_RIGHT).toBeLessThan(WALK_COLUMN_LEFT);
    expect(FOCUSED_LOWEST_PILLAR_BOTTOM).toBeLessThan(NAV_ZONE_TOP);
  });

  test("`focusedPillarBox` and the constants agree, and it refuses a pillar the ring lacks", () => {
    // THE FUNCTION AND THE CONSTANT ARE THE SAME EDGE, reached two ways — the
    // constant adds the growth to the resting bottom, the function grows the box
    // about its centre. They must be the SAME number to the bit, because the
    // horizontal budget below is derived from the function while the vertical one
    // is derived from the constant.
    expect(focusedPillarBox(LOWEST_PILLAR_INDEX).bottom).toBe(
      FOCUSED_LOWEST_PILLAR_BOTTOM,
    );

    for (let i = 0; i < PILLAR_COUNT; i++) {
      const rest = pillarBox(i);
      const grown = focusedPillarBox(i);
      const centre = pillarCentre(i);
      // Bigger on all four sides, and STILL CENTRED on the same point: the growth
      // is a scale about the centre plus a halo, not a re-anchor.
      expect(grown.left, `pillar ${i}`).toBeLessThan(rest.left);
      expect(grown.right, `pillar ${i}`).toBeGreaterThan(rest.right);
      expect(grown.top, `pillar ${i}`).toBeLessThan(rest.top);
      expect(grown.bottom, `pillar ${i}`).toBeGreaterThan(rest.bottom);
      expect((grown.left + grown.right) / 2, `pillar ${i} · x`).toBeCloseTo(centre.x, 10);
      expect((grown.top + grown.bottom) / 2, `pillar ${i} · y`).toBeCloseTo(centre.y, 10);
      // The halo is INSIDE this box, which is what makes it the honest outer edge
      // rather than the measurable one.
      expect(grown.bottom - rest.bottom, `pillar ${i} · halo counted`).toBeGreaterThan(
        FOCUS_HALO_WIDTH,
      );
    }

    // Same refusal as `pillarCentre`, through the same lookup — a seventh pillar
    // must not fold onto the first.
    expect(() => focusedPillarBox(PILLAR_COUNT)).toThrow(/no pillar/);
    expect(() => focusedPillarBox(-1)).toThrow(/no pillar/);
  });

  test("the lit halo never touches the column the decision is printed in", () => {
    // THE CONSTRAINT THAT IS REAL, as opposed to the side margin below. The column
    // holds the decision the lit pillar is being read against, and a halo that
    // touched it would put the two things the room is comparing into one mark.
    expect(FOCUSED_WALK_COLUMN_GAP).toBeGreaterThan(0);
    expect(FOCUSED_WALK_COLUMN_GAP).toBe(WALK_COLUMN_LEFT - FOCUSED_OUTERMOST_RIGHT);
    expect(FOCUSED_WALK_COLUMN_GAP).toBeCloseTo(22.65, 2);
    expect(FOCUSED_OUTERMOST_RIGHT).toBeLessThan(WALK_COLUMN_LEFT);
    // The resting gap is ≈33.5 and the highlight spends ≈10.86 of it — the
    // horizontal twin of the floor budget: same growth, other axis.
    //
    // TWO DECIMAL PLACES, NOT TEN, and that is a fact about the ring rather than
    // sloppiness: the outermost pillars sit at `cos(±π/6) × 280`, so their box edges
    // are 49.513 and 730.487 — the 49.5 / 730.5 / 33.5 in `geometry.ts`'s horizontal
    // budget are ROUNDED. The relations above hold to the bit; only these
    // human-readable figures need the tolerance.
    const restingGap =
      WALK_COLUMN_LEFT - Math.max(...PILLAR_INDEXES.map((i) => pillarBox(i).right));
    expect(restingGap).toBeCloseTo(33.5, 1);
    expect(FOCUSED_WALK_COLUMN_GAP).toBeLessThan(restingGap);
  });

  test("the DELIBERATE DEVIATION: the lit outermost pillar DOES enter the side margin", () => {
    // THIS IS NOT A BUG AND IT IS NOT AN OVERSIGHT — it is a rule collision that
    // was resolved, and the resolution is asserted rather than tolerated.
    //
    // THE ARITHMETIC THAT MAKES IT FORCED. The resting box of the two outermost
    // pillars starts at 49.5, so the figure has 1.5px of margin slack. §7.1 settles
    // that the lit pillar GAINS a halo, and the halo is 4px — so AT ANY SCALE ≥ 1,
    // INCLUDING 1.0, the halo alone crosses that slack. §7.1's halo and the deck's
    // 48px type margin therefore cannot both hold. §7.1 is the stronger rule — a
    // figure that could not emphasise two of six pillars would not be an index — so
    // THE MARGIN GIVES WAY AND NO GLYPH DOES.
    const restingSlack =
      Math.min(...PILLAR_INDEXES.map((i) => pillarBox(i).left)) - SIDE_MARGIN;
    // ≈1.51: the outermost box edge is `390 − cos(π/6) × 280 − 98` = 49.513, which
    // `geometry.ts` rounds to 49.5 in prose. The comparison against the halo below
    // is the load-bearing one and it holds to the bit.
    expect(restingSlack).toBeCloseTo(1.5, 1);
    expect(FOCUS_HALO_WIDTH, "the halo alone crosses the slack").toBeGreaterThan(
      restingSlack,
    );

    // IT HAPPENS: positive, so the deviation has a number and a test rather than
    // being discovered on a projector.
    expect(FOCUSED_MARGIN_INTRUSION).toBeGreaterThan(0);
    expect(FOCUSED_MARGIN_INTRUSION).toBe(SIDE_MARGIN - FOCUSED_OUTERMOST_LEFT);
    expect(FOCUSED_MARGIN_INTRUSION).toBeCloseTo(9.35, 2);

    // AND IT IS BOUNDED: under ONE FULL MARGIN, so an edit that doubles the halo
    // or reaches for a 1.2 scale fails here instead of pushing the ring off the
    // stage in silence.
    expect(FOCUSED_MARGIN_INTRUSION).toBeLessThan(SIDE_MARGIN);
    // NOTHING IS CLIPPED. The leftmost pixel the figure ever paints is still ON
    // the stage — that is the half that matters on a projector, and it is the half
    // the margin cannot buy back.
    expect(FOCUSED_OUTERMOST_LEFT).toBeGreaterThan(0);
    expect(FOCUSED_OUTERMOST_LEFT).toBeCloseTo(38.65, 2);
    // NO GLYPH LEAVES THE MARGIN: the box's own 10px horizontal padding scales
    // with it, so the label's content edge sits at `left + 10 × FOCUS_SCALE`. The
    // sum is checked here; the RENDERED label rect is measured by
    // `scripts/gh55-verify.mjs`, because the padding lives in the renderer and
    // jsdom places nothing.
    expect(
      FOCUSED_OUTERMOST_LEFT + FOCUS_HALO_WIDTH + 10 * FOCUS_SCALE,
      "the leftmost glyph stays inside the type margin",
    ).toBeGreaterThan(SIDE_MARGIN);
  });
});

// ── `walk.ts` as a unit ──────────────────────────────────────────────────────

describe("the walk, as arithmetic", () => {
  /** Every value the three channels can plausibly hold — six real indexes, the
   *  idle sentinel, and the four kinds of nonsense an event handler can produce.
   *  `2.5` is the sharp one: a bare range check passes it. */
  const CHANNEL_VALUES: readonly number[] = [
    NO_FOCUS,
    0,
    1,
    5,
    PILLAR_COUNT,
    -2,
    2.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
  ];

  test("`isPillarIndex` is the one guard both pointer channels go through", () => {
    // `Number.isInteger` IS THE SHARP HALF. An index of 2.5 would otherwise pass a
    // bare range check and hand a caller `pillars[2.5]` — `undefined` — from a value
    // that had already been checked against `NO_FOCUS`, which renders as a surging
    // spoke beside an empty panel rather than as an error.
    for (const i of PILLAR_INDEXES) expect(isPillarIndex(i), `${i}`).toBe(true);
    for (const bad of [NO_FOCUS, -2, PILLAR_COUNT, 2.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(isPillarIndex(bad), `${bad}`).toBe(false);
    }
    // COUNTED FROM THE COPY, not from the geometry — a decision is copy, so the
    // array the copy lives in is the honest source. The two are held equal here so
    // the ring and the panel cannot disagree about how many pillars there are.
    expect(WALK_PILLAR_COUNT).toBe(C.pillars.length);
    expect(WALK_PILLAR_COUNT).toBe(PILLAR_COUNT);
  });

  test("`resolveFocus` is pinned → hovered → focused, over every combination", () => {
    // THREE CHANNELS, ONE ANSWER, AND THE ORDER IS THE ARGUMENT. THE PIN WINS (owner
    // call, 2026-08-14): the column is what a pin holds, so hovering a second pillar
    // does not move the words. Under the old hover-wins order the pointer had to be
    // parked off the figure for as long as the presenter talked, because crossing any
    // other box on the way to the clicker swapped the panel out mid-sentence. The
    // caret sits LAST because a mouse click blurs the button it just pinned, and a
    // blur that also cleared `hovered` would close the pillar the pointer is still
    // sitting on.
    //
    // WHAT THE POINTER KEPT IS THE RING, not the column — see the `isLit` test below,
    // which is the other half of this one and the reason a pinned figure does not read
    // as dead.
    //
    // WALKED EXHAUSTIVELY — 9³ = 729 combinations — rather than sampled, because the
    // interesting cases are the DISAGREEMENTS and there are only nine of those per
    // pair. The expectation is spelled out independently of the implementation so
    // this is a comparison and not an echo.
    for (const pinned of CHANNEL_VALUES) {
      for (const hovered of CHANNEL_VALUES) {
        for (const focused of CHANNEL_VALUES) {
          const expected = isPillarIndex(pinned)
            ? pinned
            : isPillarIndex(hovered)
              ? hovered
              : isPillarIndex(focused)
                ? focused
                : NO_FOCUS;
          expect(
            resolveFocus(pinned, hovered, focused),
            `pinned ${pinned} · hovered ${hovered} · focused ${focused}`,
          ).toBe(expected);
        }
      }
    }

    // The four precedences, named, so a failure above has a readable neighbour.
    expect(resolveFocus(NO_FOCUS, NO_FOCUS, NO_FOCUS)).toBe(NO_FOCUS);
    expect(resolveFocus(3, NO_FOCUS, NO_FOCUS), "pin alone").toBe(3);
    expect(resolveFocus(NO_FOCUS, NO_FOCUS, 4), "caret with no pointer").toBe(4);
    expect(resolveFocus(NO_FOCUS, 5, 4), "pointer beats caret").toBe(5);
    expect(resolveFocus(3, 5, 4), "the pin beats both").toBe(3);
    // AND IT DOES NOT THROW — the opposite of `pillarCentre` and `decisionCounter`.
    // An out-of-range PILLAR index in the CONTENT is an authoring bug the author must
    // be shown; an out-of-range index arriving HERE is a pointer event, and a slide
    // that crashes on a stray pointer value is worse in front of a room than a slide
    // with nothing open.
    expect(resolveFocus(2.5, 2.5, 2.5)).toBe(NO_FOCUS);
    expect(resolveFocus(Number.NaN, Number.NaN, Number.NaN)).toBe(NO_FOCUS);
  });

  test("`isLit` lights the pin AND the pointer, and never a third box", () => {
    // THE OTHER HALF OF THE SPLIT. `resolveFocus` says what the COLUMN answers for;
    // this says which BOXES are lit, and the pointer never lost that. With a pin down
    // there are two — the pinned pillar and whatever the hand is on — which is what
    // keeps the ring from reading as dead while the words stay put.
    //
    // AT MOST TWO, EVER. `hovered` and `focused` collapse first (the pointer moved
    // last, exactly as in `resolveFocus`), because three lit boxes with a mark on only
    // one of them would leave the other two indistinguishable.
    for (const pinned of CHANNEL_VALUES) {
      for (const hovered of CHANNEL_VALUES) {
        for (const focused of CHANNEL_VALUES) {
          const pointer = isPillarIndex(hovered) ? hovered : focused;
          const tag = `pinned ${pinned} · hovered ${hovered} · focused ${focused}`;
          const lit = PILLAR_INDEXES.filter((i) => isLit(i, pinned, hovered, focused));
          const expected = PILLAR_INDEXES.filter((i) => i === pinned || i === pointer);
          expect(lit, tag).toEqual(expected);
          expect(lit.length, `${tag} · at most two`).toBeLessThanOrEqual(2);
        }
      }
    }

    // The cases, named.
    expect(PILLAR_INDEXES.filter((i) => isLit(i, NO_FOCUS, NO_FOCUS, NO_FOCUS))).toEqual([]);
    expect(PILLAR_INDEXES.filter((i) => isLit(i, 3, NO_FOCUS, NO_FOCUS)), "pin alone").toEqual([3]);
    expect(PILLAR_INDEXES.filter((i) => isLit(i, 3, 5, NO_FOCUS)), "pin + hover").toEqual([3, 5]);
    expect(PILLAR_INDEXES.filter((i) => isLit(i, 3, 3, NO_FOCUS)), "hovering the pin").toEqual([3]);
    // The caret does NOT add a third: the pointer moved last.
    expect(PILLAR_INDEXES.filter((i) => isLit(i, 3, 5, 4)), "pointer beats caret").toEqual([3, 5]);
    expect(PILLAR_INDEXES.filter((i) => isLit(i, 3, NO_FOCUS, 4)), "pin + caret").toEqual([3, 4]);
    // And a stray value lights nothing, for the same reason `resolveFocus` opens
    // nothing on one: a pointer value is UI state, not an authoring bug.
    expect(PILLAR_INDEXES.filter((i) => isLit(i, 2.5, 2.5, 2.5))).toEqual([]);
    expect(isLit(2.5, 0, 0, 0), "a non-index is never lit").toBe(false);
  });

  test("`togglePin` toggles, moves, and clears on anything that is not a pillar", () => {
    // A SECOND CLICK ON THE PINNED PILLAR RELEASES IT — not a close button, not Esc,
    // and not a click on the background, because the background is the deck's own
    // click-to-advance target and a "click away to unpin" rule would unpin and step
    // the slide with one press.
    for (const i of PILLAR_INDEXES) {
      expect(togglePin(NO_FOCUS, i), `pin ${i}`).toBe(i);
      expect(togglePin(i, i), `unpin ${i}`).toBe(NO_FOCUS);
    }
    // CLICKING A DIFFERENT PILLAR MOVES THE PIN rather than clearing it: the pointer
    // is already there, and a rule that required an unpin first would make moving the
    // pin cost two clicks.
    expect(togglePin(0, 5)).toBe(5);
    expect(togglePin(5, 0)).toBe(0);
    // A NON-INDEX ARGUMENT CLEARS THE PIN, which is the only safe answer: it can only
    // arrive from a handler bound to something that is not a pillar, and leaving the
    // previous pin fixed would strand it with no element left to release it.
    for (const bad of [NO_FOCUS, -2, PILLAR_COUNT, 2.5, Number.NaN]) {
      expect(togglePin(3, bad), `${bad}`).toBe(NO_FOCUS);
    }
  });

  test("`showsRecap` and `acceptsPointer` are exact complements, past the end too", () => {
    // `>=` AND NOT `===` on the recap, even though `POSE.RECAP` is the last pose the
    // deck can reach. A `===` would make the recap VANISH at any pose past the end,
    // and the last pose of a slide should be the pose that survives an over-shoot.
    // The over-shoot is not a production path today (`DeckProvider` clamps `goTo` at
    // `steps - 1`); it is a direct call — the render below — plus whatever a later
    // edit to `steps` strands in an export or a deep link.
    expect(showsRecap(POSE.FIGURE)).toBe(false);
    expect(showsRecap(POSE.RECAP)).toBe(true);
    expect(showsRecap(POSE.RECAP + 1)).toBe(true);
    expect(showsRecap(7)).toBe(true);
    expect(showsRecap(-1)).toBe(false);

    // AND THE POINTER IS LIVE EXACTLY WHERE THE RECAP IS NOT. Two predicates rather
    // than one negation, because they answer different questions and could
    // legitimately come apart later; held complementary here so that TODAY they
    // cannot, and a pose that both lit all six and answered the pointer would fail
    // as a contradiction rather than render as one.
    for (let pose = -2; pose <= 12; pose++) {
      expect(acceptsPointer(pose), `pose ${pose}`).toBe(!showsRecap(pose));
    }
  });

  test("the budget is two, and the recap is the last of them", () => {
    // NOT LITERALS IN THE SLIDE FILE. A `steps: 2` typed by hand is how a pose the
    // deck can never reach gets added — `DeckContext` clamps at `steps - 1`, so there
    // is no error, no blank slide and no failing test.
    expect(STEP_COUNT).toBe(2);
    expect(STEP_COUNT).toBe(POSE.RECAP + 1);
    expect(POSES).toEqual([0, 1]);
    // `Object.keys(POSE).length` WAS CONSIDERED AND REFUSED as the derivation: it is
    // true today by coincidence rather than by rule, and it would break the moment a
    // pose was named that is not a step. Asserted as a coincidence, so the next
    // author reads it as one.
    expect(Object.keys(POSE)).toEqual(["FIGURE", "RECAP"]);
  });

  test("NO_FOCUS is a value, and one no array on this slide can index", () => {
    // −1 and not `null`: pillar 0 — Governance, at twelve o'clock — is falsy, so a
    // `number | null` would put a truthiness bug one keystroke away. And out of
    // range for every array here, which is the second half of the choice: a caller
    // that forgets to check gets `undefined` and renders a visibly empty panel,
    // rather than the LAST pillar — which is what `pillars.at(-1)` hands back, and
    // which would open AI Companions under the idle copy for no reason anyone could
    // see.
    expect(NO_FOCUS).toBe(-1);
    expect(C.pillars[NO_FOCUS]).toBeUndefined();
    expect(PILLAR_CENTRES[NO_FOCUS]).toBeUndefined();
    // And the counter refuses it rather than clamping to "01 / 06", which is what
    // the prototype's `Math.max(focus, 0) + 1` prints where nothing is open.
    expect(() => decisionCounter(NO_FOCUS)).toThrow(/no pillar/);
    expect(() => decisionCounter(PILLAR_COUNT)).toThrow(/no pillar/);
  });

  test("and pose 7 renders BYTE-IDENTICALLY to pose 1", () => {
    // THE `>=` MADE VISIBLE. Asserted by handing the figure a pose THE DECK CANNOT
    // PRODUCE (`steps: 2` clamps at 1), which is why this render goes to the
    // component directly instead of through the harness — the harness's `goTo` would
    // clamp it back to 1 and prove nothing.
    const recap = render(<PillarOrbit brandLine={gems} pose={POSE.RECAP} />);
    const atRecap = recap.container.innerHTML;
    recap.unmount();

    for (const over of [POSE.RECAP + 1, 7, 12]) {
      const beyond = render(<PillarOrbit brandLine={gems} pose={over} />);
      expect(beyond.container.innerHTML, `pose ${over}`).toBe(atRecap);
      beyond.unmount();
    }

    // POSITIVE CONTROL: the comparison is only worth anything because pose 1 is NOT
    // identical to pose 0 — six pillars light and the panel turns over.
    const figure = render(<PillarOrbit brandLine={gems} pose={POSE.FIGURE} />);
    expect(figure.container.innerHTML).not.toBe(atRecap);
    figure.unmount();
  });
});

// ── 0 → 1 → 0, in one mounted tree ───────────────────────────────────────────

describe("the two poses re-render cleanly in both directions", () => {
  test("0 → 1 → 0 leaves no pillar stuck lit and the panel back on idle", () => {
    // TRUE BY CONSTRUCTION — the recap reads no state at all, and pose 0 reads three
    // numbers nothing in the pose change writes — and this is the test that says the
    // renderer did not add a fourth. A component that cached "the pillars were all
    // lit a moment ago" would pass the step up and fail here.
    renderOrg(berau, POSE.FIGURE);
    const resting = allSignatures();
    expect(activePillarIds()).toEqual([]);

    goToPose(POSE.RECAP);
    expect(activePillarIds()).toEqual(C.pillars.map((p) => p.id));
    expectOnlyOpen("shape-recap", "pose 1");

    goToPose(POSE.FIGURE);
    expect(activePillarIds(), "nothing stuck").toEqual([]);
    expectOnlyOpen("shape-idle", "back at pose 0");
    // BYTE-IDENTICAL TO THE FIGURE IT LEFT, all six, which is the strongest form of
    // "nothing stuck": not just "no box is flagged" but "every paint, every stroke
    // and every bead track is the one it started with".
    C.pillars.forEach((p) =>
      expect(pillarSignature(p.id), `${p.id} · back to rest`).toEqual(resting.get(p.id)),
    );
  });

  test("but a PIN survives the round trip, deliberately", async () => {
    // THE ONE PIECE OF STATE THAT IS NOT RESET, and it is documented in
    // `acceptsPointer`: a pin is the presenter's place in the argument, and losing it
    // on a step to the recap and back would be the one piece of history a backwards
    // step could contradict. `resolveFocus` is not even consulted at pose 1 — the
    // state simply sits there, unread — which is why nothing needs resetting for this
    // to be true.
    const user = userEvent.setup();
    renderOrg(berau, POSE.FIGURE);

    const box = pillarBoxEl("people");
    await user.click(box);
    await user.unhover(box);
    expect(pinnedPillarIds()).toEqual(["people"]);

    goToPose(POSE.RECAP);
    // The pin is still recorded — and it is NOT what is lighting the ring, because
    // all six are lit and the panel is the recap's.
    expect(pinnedPillarIds()).toEqual(["people"]);
    expect(activePillarIds()).toEqual(C.pillars.map((p) => p.id));
    expectOnlyOpen("shape-recap", "pinned at the recap");

    goToPose(POSE.FIGURE);
    expect(pinnedPillarIds(), "the pin came back").toEqual(["people"]);
    expect(activePillarIds(), "and it is what is lit").toEqual(["people"]);
    expectOnlyOpen("shape-decision-people", "back at pose 0");
    expect(screen.getByTestId("shape-decision-people-pin").textContent).toBe("· pinned");

    // And it is still releasable from the same gesture after the round trip — a pin
    // that survived a step but could no longer be undone would be a mode.
    await user.click(box);
    await user.unhover(box);
    expect(pinnedPillarIds()).toEqual([]);
    expectOnlyOpen("shape-idle", "released after the round trip");
  });
});

// ── reduced motion ───────────────────────────────────────────────────────────

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

  test("mounts zero SMIL nodes at both poses, under every brand", () => {
    // ZERO BY CONSTRUCTION, and that is the decision this asserts rather than a
    // happy accident. SMIL is invisible to the global reduced-motion rule in
    // `globals.css` — it squashes CSS animations and transitions only — so a SMIL
    // node has to be gated at mount, as E.12 gates its `<animateMotion>`.
    //
    // AND IT IS LOAD-BEARING IN A PLACE IT WAS NOT. The old motion budget was CSS
    // transitions on a pose change, which that rule already handled; it is now
    // transitions PLUS the keyframes in `agentic-org.css`, because the figure builds
    // itself inside one pose (nothing to transition FROM) and its spokes carry motion
    // at rest (a loop, not a change). Both are CSS animations, both are reachable by
    // the squash and by this file's own media block, and neither is an `<animate>`
    // element. A spoke draw written as SMIL would look identical in a browser and
    // ignore the reader's preference entirely.
    for (const brandLine of [gems, berau, hubBrandLineFor("general")]) {
      for (const pose of POSES) {
        const { unmount } = renderOrg(brandLine, pose);
        for (const tag of ["animate", "animateTransform", "animateMotion", "set"]) {
          expect(
            document.querySelectorAll(tag),
            `pose ${pose} · <${tag}>`,
          ).toHaveLength(0);
        }
        unmount();
      }
    }
  });

  test("both poses render complete — every string the pose holds is there", () => {
    // WHAT THIS CAN AND CANNOT SAY. jsdom runs no keyframe and no transition, so
    // "the build ends on its resting frame" is not checkable here. This test
    // therefore claims only the DOM half: at each pose every element that pose shows
    // is mounted with its copy. The computed half is checked in a real engine.
    renderOrg(berau, POSE.FIGURE);

    for (const pose of POSES) {
      goToPose(pose);
      // Standing at both.
      expect(screen.getByTestId("shape-hub-label").textContent, `pose ${pose}`).toBe(
        "The Enabler",
      );
      expect(screen.getByTestId("shape-hub-brand-line").textContent, `pose ${pose}`).toBe(
        "MineTech",
      );
      C.pillars.forEach((pillar) => {
        expect(
          screen.getByTestId(`shape-pillar-${pillar.id}-label`).textContent,
          `pose ${pose} · ${pillar.id}`,
        ).toBe(pillar.label);
        // The decision blocks are all mounted at both poses, with their copy, which
        // is what makes the cross-fade possible at all.
        expect(
          screen.getByTestId(`shape-decision-${pillar.id}-text`).textContent,
          `pose ${pose} · ${pillar.id} decision`,
        ).toBe(pillar.decision);
        expect(
          screen.getByTestId(`shape-decision-${pillar.id}-eyebrow`).textContent,
          `pose ${pose} · ${pillar.id} counter`,
        ).toBe(decisionCounter(C.pillars.indexOf(pillar)));
      });

      // Pose 0's idle copy and pose 1's recap, each in its own pose.
      if (showsRecap(pose)) {
        expect(screen.getByTestId("shape-recap-eyebrow").textContent, `pose ${pose}`).toBe(
          C.recapEyebrow,
        );
        expect(screen.getByTestId("shape-closer").textContent, `pose ${pose}`).toBe(
          C.closer,
        );
        C.pillars.forEach((pillar) =>
          expect(
            screen.getByTestId(`shape-recap-${pillar.id}-text`).textContent,
            `pose ${pose} · ${pillar.id}`,
          ).toBe(pillar.recap),
        );
      } else {
        expect(screen.getByTestId("shape-idle-lead").textContent, `pose ${pose}`).toBe(
          C.idleLead,
        );
        expect(screen.getByTestId("shape-hint").textContent, `pose ${pose}`).toBe(C.hint);
      }
    }
  });
});

// ── the copy rules, checked over the copy ────────────────────────────────────

describe("keywords go on prose only", () => {
  /**
   * THE MONO LABEL REGISTER — every string on this slide that a `*Kw` may never
   * touch, and it is where most of this rewrite's new copy landed.
   *
   * A copper italic inside any of these reads as a rendering fault. Inside the
   * counter it would be an emphasis on ARITHMETIC, which is the sharpest case
   * because the counter is GENERATED rather than authored. The six RECAP FRAGMENTS
   * are the second-sharpest and the one worth stating: they are set in the reading
   * face, not in mono, because a sentence fragment in mono reads as a filename — but
   * they are label register all the same, because a fragment IS the emphasis and an
   * italic inside one would be emphasis on emphasis.
   */
  const LABELS: readonly string[] = [
    C.figLabel,
    C.hubLabel,
    C.idleEyebrow,
    C.hint,
    C.decisionEyebrow,
    C.recapEyebrow,
    ...C.pillars.map((p) => p.label),
    ...C.pillars.map((p) => p.recap),
    ...C.pillars.flatMap((p) => [...p.points]),
    ...C.pillars.map((_p, i) => decisionCounter(i)),
  ];

  /** The FOUR prose registers, which are the only strings a `*Kw` may touch: the
   *  headline, the six decisions, the panel's idle lead and the closer. Three
   *  before this rewrite; the idle lead is the one it added. */
  const PROSE: readonly { readonly text: string; readonly kw: readonly string[] }[] = [
    { text: C.headline, kw: C.headlineKw },
    ...C.pillars.map((p) => ({ text: p.decision, kw: p.decisionKw })),
    { text: C.idleLead, kw: C.idleLeadKw },
    { text: C.closer, kw: C.closerKw },
  ];

  test("no label, eyebrow, point, recap fragment or counter is rendered through the highlighter", async () => {
    // RENDERED CHECK, NOT AN AUTHORED ONE: `<em class="kw">` is what a highlight IS
    // on the stage, so this reads the DOM for one inside any of those runs. Done with
    // a pillar OPEN and then at the RECAP, so both halves of the label register — the
    // point list and the six fragments — are on the stage to be checked.
    const user = userEvent.setup();
    renderOrg(gems, POSE.FIGURE);
    await user.hover(pillarBoxEl("governance"));

    const labelBoxes = [
      "shape-hub-label",
      "shape-hub-brand-line",
      "shape-idle-eyebrow",
      ...C.pillars.map((p) => `shape-pillar-${p.id}-label`),
      // The eyebrow IS the counter — `decisionCounter(i)` is what it prints — so one
      // element answers for both.
      ...C.pillars.map((p) => `shape-decision-${p.id}-eyebrow`),
      // The pillar's name inside the decision block: the same words the ring's box
      // carries, in 29px serif instead of 11px mono. Repetition is the point; an
      // italic in it would be an emphasis on a fragment of a name.
      ...C.pillars.map((p) => `shape-decision-${p.id}-label`),
      // HR p4's own sub-bullets — eighteen strings, all of them names of things
      // rather than sentences about them.
      ...C.pillars.map((p) => `shape-decision-${p.id}-points`),
    ];
    for (const id of labelBoxes) {
      expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(0);
    }

    goToPose(POSE.RECAP);
    for (const id of [
      "shape-recap-eyebrow",
      ...C.pillars.map((p) => `shape-recap-${p.id}-label`),
      ...C.pillars.map((p) => `shape-recap-${p.id}-text`),
    ]) {
      expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(0);
    }

    // And the labels carry no stray markup of their own.
    LABELS.forEach((label) => expect(label).not.toContain("<em"));
    // POSITIVE CONTROL on the register split itself: nothing is in both lists.
    const proseText = new Set(PROSE.map((p) => p.text));
    LABELS.forEach((label) =>
      expect(proseText.has(label), `"${label}" is in both registers`).toBe(false),
    );
  });

  test("every keyword is a substring of the string it highlights", () => {
    // A keyword that does not occur is a highlight that silently does nothing —
    // the copy still reads, so nothing on the stage says the emphasis was lost.
    // Held over ALL FOUR registers.
    PROSE.forEach(({ text, kw }) => {
      expect(kw.length, `"${text}" has a keyword`).toBeGreaterThan(0);
      kw.forEach((word) => expect(text, `"${word}"`).toContain(word));
    });
    expect(PROSE).toHaveLength(3 + PILLAR_COUNT);
  });

  test("and each of the four prose registers lands its highlight on the stage", async () => {
    const user = userEvent.setup();
    renderOrg(gems, POSE.FIGURE);

    // 1. The headline — this slide's one line of prose at both poses.
    expect(document.querySelectorAll("h1 em").length).toBeGreaterThan(0);

    // 2. The idle lead, which is up before anything is touched. ONE KEYWORD, on the
    // dependency — the claim the ring makes and the only part of the sentence the
    // diagram cannot draw on its own.
    const leadEms = [...screen.getByTestId("shape-idle-lead").querySelectorAll("em")].map(
      (e) => e.textContent,
    );
    expect(leadEms).toEqual([...C.idleLeadKw]);
    expect(C.idleLeadKw).toContain("only work together");

    // 3. The six decisions: ONE PHRASE EACH, on the decision's object rather than on
    // the "You decide" stem, which is the same in all six and would be a highlight on
    // the boilerplate. All six blocks are mounted at every state, so all six are
    // checkable from one hover.
    await user.hover(pillarBoxEl("tools"));
    C.pillars.forEach((pillar) => {
      const ems = [
        ...screen.getByTestId(`shape-decision-${pillar.id}-text`).querySelectorAll("em"),
      ].map((e) => e.textContent);
      expect(ems.length, pillar.id).toBeGreaterThan(0);
      expect(ems, pillar.id).toEqual([...pillar.decisionKw]);
      expect(pillar.decisionKw, `${pillar.id} · one phrase`).toHaveLength(1);
      expect(pillar.decisionKw[0], `${pillar.id} · not the stem`).not.toContain(
        "You decide",
      );
    });

    // 4. And the closer, at the recap. THE HIGHLIGHT IS ON THE CLAIM AND NOT ON THE
    // REFUSAL: the italic is the last emphasis the room takes away, and emphasising
    // the refusal would leave the closing image a purchase.
    goToPose(POSE.RECAP);
    const closerEms = [
      ...screen.getByTestId("shape-closer").querySelectorAll("em"),
    ].map((e) => e.textContent);
    expect(closerEms).toEqual([...C.closerKw]);
    expect(C.closerKw).toContain("a decision on your desk");
  });

  test("no authored string names a section letter", () => {
    // §3.4 R2. This slide is C.1 today and the letter is DERIVED anyway — what the
    // rest of Phase 6 renumbers is every run BEHIND this one — so a literal "C.1" or
    // "SECTION C" in this copy would be a letter authored in the one place that must
    // never hold one, and would survive the day the composer disagrees with it.
    // EXTENDED to everything this rewrite authored: the point lists, the recap
    // fragments, the idle block and the hint.
    const authored = [
      ...LABELS,
      C.headline,
      C.idleLead,
      C.closer,
      ...C.pillars.map((p) => p.decision),
      ...C.pillars.flatMap((p) => [...p.decisionKw]),
      ...C.idleLeadKw,
      ...C.closerKw,
      ...C.headlineKw,
      ...REGISTERED_BRANDS.map((brand) => hubBrandLineFor(brand) ?? ""),
    ];

    authored.forEach((copy) => {
      expect(copy, copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      // A bare figure reference — `C.1`, `G.12`.
      expect(copy, copy).not.toMatch(/\b[A-N]\.\d+\b/);
    });
  });

  test("and no figure-shaped literal reaches the DOM except the derived one", async () => {
    // THE RENDERED HALF of the same rule. `FigLabel` prints one figure reference
    // and it comes from the composed deck through `SlideNumberContext` — the
    // harness's `at` supplies it here. So: strip that one element and nothing of
    // that shape may be left, which is what catches a letter written into a
    // component rather than into the content module.
    //
    // AT THREE STATES: idle, one pillar open — which adds the counter, "THE DECISION
    // · 01 / 06", the one string on this slide that could plausibly read as a figure
    // reference — and the recap. The counter is CHECKED rather than assumed innocent.
    const user = userEvent.setup();
    const { container } = renderOrg(gems, POSE.FIGURE);
    expect(
      container.querySelector(".fig-label")?.textContent,
      "the derived reference is there to strip",
    ).toContain(`${AT.letter}.${AT.num}`);

    const states: readonly [string, () => Promise<void>][] = [
      ["idle", async () => {}],
      ["governance open", async () => user.hover(pillarBoxEl("governance"))],
      ["recap", async () => goToPose(POSE.RECAP)],
    ];
    for (const [where, enter] of states) {
      await enter();
      // Stripped from a CLONE, not from the live tree: React owns those nodes and
      // removing one behind its back throws on the next commit.
      const stripped = container.cloneNode(true) as HTMLElement;
      stripped.querySelector(".fig-label")?.remove();
      expect(stripped.textContent ?? "", where).not.toMatch(/\b[A-N]\.\d+\b/);
      expect(stripped.textContent ?? "", where).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
    }

    // POSITIVE CONTROL on the counter specifically: it IS on the stage while a
    // pillar is open, and it does NOT read as a figure reference.
    goToPose(POSE.FIGURE);
    await user.hover(pillarBoxEl("governance"));
    expect(document.body.textContent).toContain("01 / 06");
    expect("01 / 06").not.toMatch(/\b[A-N]\.\d+\b/);

    // The label itself is still authored, and still letter-free.
    expect(C.figLabel).toBe("THE AGENTIC ORGANIZATION");
  });
});

// ── the composed pair (§4.3 C.1 → C.2) ───────────────────────────────────────

describe("the composed leader deck", () => {
  // A LEADER EPOCH, loaded dynamically. `VARIANT` resolves at module scope, so
  // reading the leader deck means re-pointing `window.location` and resetting the
  // registry — which is why this describe uses no `SlideHarness` (see that file's
  // "ONE EPOCH" note) and compares slides by id rather than by identity.
  const realLocation = window.location;

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: realLocation,
    });
  });

  async function leaderDeck(variant: string) {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: new URL(`http://localhost:5173/?variant=${variant}`),
    });
    vi.resetModules();
    const { composedDeck } = await import("@/deck/registry");
    return composedDeck;
  }

  test("puts f8-your-agentic-os immediately behind this slide, both in `shape`", async () => {
    for (const variant of ["berau-leader", "gems-leader"]) {
      const deck = await leaderDeck(variant);
      const i = deck.slides.findIndex((s) => s.def.id === "shape-agentic-org");
      expect(i, `${variant} composes shape-agentic-org`).toBeGreaterThan(-1);

      const c1 = deck.slides[i];
      const c2 = deck.slides[i + 1];
      // §4.3's C.2, relocated out of the cut F section by the deck set's single
      // `sectionOverrides` entry. ADJACENT AND IN THE SAME RUN: the move and the
      // override are one edit, because either half alone gives one key two runs
      // and throws (R4).
      expect(c2?.def.id, variant).toBe("f8-your-agentic-os");
      expect(c1.sectionKey, variant).toBe("shape");
      expect(c2.sectionKey, variant).toBe("shape");

      // And the run gets letter C. The COMPOSER derives that, from `opening` and
      // `gap` being the two runs in front of it; no slide file authors it. These
      // four lines PIN what the composer produces, deliberately as literals —
      // recomputing the expectation from `composeDeck` would assert only that the
      // composer agrees with itself, and the failure worth catching here is the
      // composer quietly producing a different letter after a list edit.
      expect(c1.letter, variant).toBe("C");
      expect(c2.letter, variant).toBe("C");
      expect(c1.num, variant).toBe(1);
      expect(c2.num, variant).toBe(2);
      expect(deck.letterOf("shape"), variant).toBe("C");

      // ONE `shape` RUN, not two: the whole reason the override value had to flip
      // in the same edit that moved the row.
      //
      // THIS SLIDE'S TEST ENUMERATES THE WHOLE RUN, WHICH MAKES IT A FILE EVERY
      // `shape` TICKET HAS TO OPEN — gh#68 was the first to find that out and gh#71 the
      // second and last. The four
      // assertions above are about C.1 and C.2 and NONE of them moved on either ticket:
      // this slide is still C.1 and f8 still
      // C.2, because neither a tail append nor an insert BEHIND f8 renumbers anything in
      // front of it. Only this line
      // moved, twice. Kept as a whole-run comparison rather than narrowed back to the
      // pair,
      // because the failure worth catching is a row arriving in the WRONG
      // place — between C.1 and f8, which is one slot ahead of where gh#71's C.3 landed
      // — and a narrowed
      // assertion would stay green through exactly that.
      //
      // THE RUN IS COMPLETE at §4.3's four as of gh#71, so this is now the whole list
      // and a fifth row would fail here by name.
      const shapeRun = deck.slides.filter((s) => s.sectionKey === "shape");
      expect(shapeRun.map((s) => s.def.id), variant).toEqual([
        "shape-agentic-org",
        "f8-your-agentic-os",
        "shape-tam-kotter",
        "shape-middle-out",
      ]);
    }
  });

  test("leaves the standard deck untouched — no `shape` run at all", async () => {
    for (const variant of ["berau-middle-mgmt", "gems-middle-mgmt", "general"]) {
      const deck = await leaderDeck(variant);
      expect(deck.slides.some((s) => s.def.id === "shape-agentic-org"), variant).toBe(
        false,
      );
      expect(deck.letterOf("shape"), variant).toBeUndefined();
      // f8 is back where it was authored, inside `techniques`.
      const f8 = deck.slides.find((s) => s.def.id === "f8-your-agentic-os");
      expect(f8?.sectionKey, variant).toBe("techniques");
    }
  });
});
