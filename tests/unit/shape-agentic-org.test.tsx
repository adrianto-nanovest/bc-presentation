// THE AGENTIC ORGANIZATION · slide tests. All NINE poses, all three brands.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so nothing here
// measures a pixel a browser would place — every geometric claim is asserted as
// the ONE NUMBER both sides read (`../../src/slides/leader-shape/geometry.ts`),
// and the rendered composition is walked at 1280×720 in a real engine separately
// (`scripts/gh55-verify.mjs`). What jsdom is good for is the four things this
// slide is actually at risk of, and the issue's AC names the middle two out loud:
//
//   1. THE FLOOR. §7.1 recorded one open risk against variant A — the lowest
//      pillar sits close to the NavBar's hover band and GROWS on focus. The
//      prototype's numbers put it 26px inside the band, and 32.66px inside it at
//      the focused pose. That is arithmetic, and arithmetic is checkable here.
//   2. THE PILLAR → DECISION MAPPING. Nine poses, six of them beats, one pillar
//      and one decision block per beat. "Which box is lit" is published as
//      `data-active` and "which decision is open" as an inline opacity, so the
//      whole map is readable in the DOM — and it is read against
//      `focusedPillarIndex` rather than instead of it, because a test that only
//      reads the DOM proves the renderer agrees with itself.
//   3. THE NO-DIM RULE (§7.1 — attention is bought with added light, never
//      subtracted). At every beat the five pillars the beat is NOT about must be
//      byte-identical to their resting selves. Six style objects captured once and
//      compared field by field is exactly what jsdom can read, and the cheapest way
//      to break it is to port the prototype's three-tier walked/unvisited ranking.
//   4. PRE-DIMMING AT REST. The same rule at the pose that has no walk at all: six
//      identical borders, six identical label tiers, six identical spokes.
//
// WHAT IT CANNOT: a transition. jsdom runs none, so "the release of a beat
// animates" and "no delay lands on a focus property" are not claims this file can
// make — they are declarations in the renderer and measurements in the browser
// harness. Nor can it place the focused halo: a `box-shadow` spread is outside
// every layout measurement anyway (see `FOCUS_HALO_WIDTH`), which is why the
// focused pose is asserted here as numbers and in the browser as a screenshot.
//
// ALL THREE BRANDS IN ONE EPOCH. The component reads no `VARIANT` — the slide file
// resolves the hub's brand line once at module scope and hands it down as a prop
// (§4.4 slot 5) — so three hubs mount side by side in this one module registry. A
// test that had to re-point `window.location` per brand could not compare them.
import { act, render, screen } from "@testing-library/react";
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
// Imported for ONE describe — the figure takes its pose as a prop, so it can be
// asked about a pose the slide's own step count cannot reach. Everything else here
// goes through the slide, because that is what the deck renders.
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
  KICKER_TOP,
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
  CLOSER_POSE,
  DECISION_BEATS,
  NO_FOCUS,
  POSE,
  STEP_COUNT,
  focusedPillarIndex,
  showsCloser,
  showsPillars,
  showsWalkColumn,
} from "@/slides/leader-shape/walk";
import { BRANDS, type Brand } from "@/deck-variants";
// The design system's own two ladders. Imported for their KEYS, never their hexes —
// see `rampOf` below for why that distinction is the whole point.
import { copper, neutral } from "@/design-system/colors";

const C = shapeOrgContent;

/**
 * All nine, DERIVED — `[0 … STEP_COUNT - 1]`.
 *
 * NOT A LITERAL `[0,1,2,3,4,5,6,7,8]`. A seventh pillar grows `STEP_COUNT` to ten
 * (see `walk.ts`), and a hand-written list would then leave the last pose — the
 * closer's — unwalked by every "at every pose" test in this file, which is
 * precisely the set of tests the issue's AC asks for at EVERY pose.
 */
const POSES: readonly number[] = Array.from({ length: STEP_COUNT }, (_u, i) => i);

/** The six beat poses, 2…7 — one per pillar, in ring order. */
const BEAT_POSES: readonly number[] = C.pillars.map(
  (_p, i) => POSE.FIRST_DECISION + i,
);

/** `0…5` — pillar INDEXES, which are not poses and are kept in their own list so a
 *  geometry loop cannot borrow the pose list and read right by accident. */
const PILLAR_INDEXES: readonly number[] = Array.from(
  { length: PILLAR_COUNT },
  (_u, i) => i,
);

/**
 * The three poses that focus NOTHING: 0, 1 and the closer's.
 *
 * The issue's "no beat leaves a pillar stuck in its focused state" is a claim about
 * exactly this list — pose 8 is the one that could plausibly inherit the sixth
 * beat's lit pillar, and poses 0/1 are the ones a backwards walk lands on.
 */
const UNFOCUSED_POSES: readonly number[] = [POSE.HUB, POSE.RING, CLOSER_POSE];

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
 *  pillar may not use one: at rest there is no walk to have skipped it, and at a
 *  beat the five pillars the beat is not about are still at rest. */
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
  const copper = COPPER_RAMP.indexOf(token);
  if (copper >= 0) return { family: "copper", rung: copper };
  const neutral = NEUTRAL_RAMP.indexOf(token);
  if (neutral >= 0) return { family: "neutral", rung: neutral };
  throw new Error(
    `${what}: "--${token}" is on neither the copper nor the neutral ladder, so ` +
      `nothing here can say whether it is brighter or darker than the resting tier.`,
  );
}

// ── a pillar's whole resting signature, as one comparable object ──────────────

/**
 * Everything about one pillar that a beat could possibly change — the object the
 * no-dim rule is asserted over.
 *
 * NINE FIELDS AND NOT "the border", because §7.1's rule is not about borders: it
 * says the five pillars a beat is not about lose NOTHING, and there are nine ways
 * to lose something here. `border`, `background` and `boxShadow` are the box's three
 * paints; `opacity` and `transform` are the two channels the arrival sweep owns, and
 * they are in this list precisely because they are the two a "subtle de-emphasis"
 * reaches for first (drop the neighbours to 0.7, or scale them to 0.98); `labelColor`
 * and `iconColor` are the two type tiers inside the box; `spokeStroke` and
 * `spokeWidth` are the tether, which lives in a different DOM layer (SVG) and is
 * therefore the half a box-only check would miss.
 */
interface PillarSignature {
  readonly border: string;
  readonly background: string;
  readonly boxShadow: string;
  readonly opacity: string;
  readonly transform: string;
  readonly labelColor: string;
  readonly iconColor: string;
  readonly spokeStroke: string;
  readonly spokeWidth: string;
}

/** Named so a failure says WHICH field moved, on WHICH pillar, at WHICH pose — a
 *  bare object diff on six pillars × six beats is unreadable. */
const SIGNATURE_FIELDS: readonly (keyof PillarSignature)[] = [
  "border",
  "background",
  "boxShadow",
  "opacity",
  "transform",
  "labelColor",
  "iconColor",
  "spokeStroke",
  "spokeWidth",
];

function pillarSignature(id: string): PillarSignature {
  const box = screen.getByTestId(`shape-pillar-${id}`);
  return {
    border: box.style.border,
    background: box.style.background,
    boxShadow: box.style.boxShadow,
    opacity: box.style.opacity,
    transform: box.style.transform,
    labelColor: screen.getByTestId(`shape-pillar-${id}-label`).style.color,
    iconColor: screen.getByTestId(`shape-pillar-${id}-icon`).style.color,
    spokeStroke: screen.getByTestId(`shape-spoke-${id}`).style.stroke,
    spokeWidth: screen.getByTestId(`shape-spoke-${id}`).style.strokeWidth,
  };
}

/** All six pillars' signatures at the currently rendered pose. */
function allSignatures(): Map<string, PillarSignature> {
  return new Map(C.pillars.map((p) => [p.id, pillarSignature(p.id)]));
}

/** Which pillar ids the DOM says the walk is on — read off `data-active`, which is
 *  the fact the renderer publishes, rather than out of a parsed border colour. */
function activePillarIds(): string[] {
  return C.pillars
    .filter((p) => screen.getByTestId(`shape-pillar-${p.id}`).dataset.active === "true")
    .map((p) => p.id);
}

/** Which decision blocks are open — exactly one during a beat, none otherwise. */
function openDecisionIds(): string[] {
  return C.pillars
    .filter((p) => screen.getByTestId(`shape-decision-${p.id}`).style.opacity === "1")
    .map((p) => p.id);
}

/**
 * EVERY INVARIANT THE WALK HAS, AT ONE POSE — the helper the `0 → 8 → 0` test and
 * the mapping test both hold the figure to.
 *
 * IT ASKS `walk.ts` AND THE DOM SEPARATELY AND THEN HOLDS THEM EQUAL. Reading only
 * the DOM would prove the renderer agrees with itself; recomputing the expectation
 * from `focusedPillarIndex` alone would prove `walk.ts` agrees with itself. The
 * failure worth catching is the seam between them — a spoke thickened at a pose its
 * box is not lit at, a counter one beat ahead of the box.
 *
 * @param resting the pose-1 capture, when there is one. Passed in rather than
 *        recaptured, because the no-dim rule is a claim about a FIXED reference
 *        figure: a signature re-read at the current pose would compare each beat
 *        against itself and pass on a walk that dimmed everything by 1% per click.
 */
function assertPose(pose: number, resting?: ReadonlyMap<string, PillarSignature>) {
  const focus = focusedPillarIndex(pose);
  const expected = focus === NO_FOCUS ? [] : [C.pillars[focus].id];

  // ONE LIT BOX, OR NONE — and it is the one `walk.ts` names.
  expect(activePillarIds(), `pose ${pose} · active pillars`).toEqual(expected);
  // ONE OPEN DECISION, OR NONE — the same pillar, so the column and the ring can
  // never speak for two different pillars.
  expect(openDecisionIds(), `pose ${pose} · open decisions`).toEqual(expected);

  // ALL SIX BLOCKS MOUNTED AT EVERY POSE, cross-fading. Six blocks and not one
  // panel whose text swaps: a single panel has to render SOMETHING at the closer's
  // pose, and every available answer (nothing, `pillars[0]`, the last-focused
  // pillar held in state) is wrong in front of a room — see the comment on the
  // column in `PillarOrbit.tsx`.
  C.pillars.forEach((p) => {
    expect(
      screen.getByTestId(`shape-decision-${p.id}`),
      `pose ${pose} · ${p.id} block mounted`,
    ).toBeInTheDocument();
  });

  // The column, the closer and the ring's own reveal, each against the function
  // that decides it.
  expect(
    screen.getByTestId("shape-walk-column").style.opacity,
    `pose ${pose} · walk column`,
  ).toBe(showsWalkColumn(pose) ? "1" : "0");
  expect(screen.getByTestId("shape-closer").style.opacity, `pose ${pose} · closer`).toBe(
    showsCloser(pose) ? "1" : "0",
  );
  C.pillars.forEach((p) => {
    expect(
      screen.getByTestId(`shape-pillar-${p.id}`).style.opacity,
      `pose ${pose} · ${p.id} revealed`,
    ).toBe(showsPillars(pose) ? "1" : "0");
    expect(
      screen.getByTestId(`shape-spoke-${p.id}`).style.opacity,
      `pose ${pose} · ${p.id} spoke revealed`,
    ).toBe(showsPillars(pose) ? "1" : "0");
  });

  // THE NO-DIM RULE, at every pose the ring is up: the pillars this pose is not
  // about are byte-identical to the resting figure.
  if (resting && showsPillars(pose)) {
    C.pillars.forEach((p, j) => {
      if (j === focus) return;
      expect(pillarSignature(p.id), `pose ${pose} · ${p.id} unchanged`).toEqual(
        resting.get(p.id),
      );
    });
  }
}

// ── the def ──────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, NINE steps, canonical on the fullest resting pose", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins
    // the value).
    expect(shapeAgenticOrgSlide.id).toBe("shape-agentic-org");

    // NINE — §7.1's budget, pinned as a VALUE and as its DERIVATION, because the
    // two catch different edits. The value catches a walk that quietly grew or lost
    // a beat; the derivation catches the literal `9` the slide file must not
    // contain, because a literal is how a seventh pillar's decision becomes a pose
    // the deck can never reach (`DeckContext` clamps at `steps - 1`) with no error,
    // no blank slide and no failing test.
    expect(shapeAgenticOrgSlide.steps).toBe(9);
    expect(shapeAgenticOrgSlide.steps).toBe(STEP_COUNT);
    expect(shapeAgenticOrgSlide.steps).toBe(POSE.FIRST_DECISION + DECISION_BEATS + 1);
    // hub + ring + six beats + closer, read as the sum it is.
    expect(DECISION_BEATS).toBe(C.pillars.length);
    expect(CLOSER_POSE).toBe(POSE.FIRST_DECISION + DECISION_BEATS);
    expect(STEP_COUNT).toBe(CLOSER_POSE + 1);

    // `canonicalPose === 1`, AND IT IS NO LONGER `steps - 1`. This assertion
    // REPLACES that one, which was true only while the slide had two poses, and it
    // has to carry the argument the equality used to carry for free:
    //
    //   · The exports print `canonicalPose` and NOTHING ELSE (one frame per slide),
    //     so this is the pose the PDF and the PPTX are.
    //   · Pose 1 is the fullest pose that singles out NONE of the six pillars —
    //     asserted below rather than asserted in prose. A canonical pose inside the
    //     walk would print a centrepiece emphasising whichever pillar the export
    //     stopped on: "six pillars move together, or none of them move", with one
    //     lit for a reason the page cannot explain.
    //   · Pose 0 is the real alternative on the low side and exports a hub with no
    //     organisation around it; pose 8 is the real alternative on the high side
    //     (the ring is back at rest AND the closer is up), and #55's AC pins 1
    //     "unless a different pose is argued for in a comment on this issue first".
    //     No such comment exists, so 1 ships and this test is where that pin lives.
    expect(shapeAgenticOrgSlide.canonicalPose).toBe(1);
    expect(shapeAgenticOrgSlide.canonicalPose).toBe(POSE.RING);
    // Still inside the budget — the one half of `=== steps - 1` that survives, and
    // the half that was actually load-bearing: a canonical pose the deck cannot
    // reach exports a clamped frame that is not the frame anybody chose.
    expect(shapeAgenticOrgSlide.canonicalPose).toBeLessThan(shapeAgenticOrgSlide.steps);
    // FULLEST, AND SINGLING OUT NOTHING — the two properties the argument rests on,
    // as arithmetic over `walk.ts`.
    expect(showsPillars(shapeAgenticOrgSlide.canonicalPose!)).toBe(true);
    expect(focusedPillarIndex(shapeAgenticOrgSlide.canonicalPose!)).toBe(NO_FOCUS);

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

    renderOrg(hubBrandLineFor("general"), POSE.RING);
    expect(screen.queryByTestId("shape-hub-brand-line")).toBeNull();
    expect(screen.getByTestId("shape-hub-label").textContent).toBe("The Enabler");
    // And nothing invented one under another name: the disc holds exactly the
    // label.
    expect(screen.getByTestId("shape-hub").textContent).toBe("The Enabler");
  });

  test("is present from pose 0, because pose 0 IS the hub — and at all nine", () => {
    renderOrg(berau, POSE.HUB);
    // THE KICKER STANDS AT EVERY ONE OF THE NINE, which is a claim the renderer
    // makes explicitly against the prototype's cross-fading one
    // (`opacity: stepIndex === 0 ? 1 : 0`). "An operating model is not a
    // department" is true at pose 8 too, so it spends no pose — and a kicker that
    // faded at the first beat would be a string the room stops being able to check
    // the figure against exactly when the figure starts making claims.
    for (const pose of POSES) {
      goToPose(pose);
      expect(screen.getByTestId("shape-hub"), `pose ${pose}`).toBeInTheDocument();
      expect(
        screen.getByTestId("shape-hub-brand-line").textContent,
        `pose ${pose}`,
      ).toBe("MineTech");
      expect(screen.getByTestId("shape-kicker").textContent, `pose ${pose}`).toBe(
        C.kicker,
      );
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
  test("are HR p4's six, verbatim, in the walk's teaching order", () => {
    renderOrg(gems, POSE.RING);

    // SIX, from the geometry's own count rather than a literal here: the labels
    // and the ring centres are the same six, and a seventh pillar would have no
    // point to sit on (`pillarCentre` throws rather than wrapping it onto the
    // first — see the geometry tests below).
    expect(C.pillars).toHaveLength(PILLAR_COUNT);
    expect(new Set(C.pillars.map((p) => p.id)).size).toBe(PILLAR_COUNT);

    // THE ORDER IS THE WALK'S, NOT HR p4's PRINTED ORDER, and it is asserted so
    // that "the owner approved variant A including this order" survives a
    // reviewer who checks the labels against the HR deck and re-sorts them. The
    // six focus beats index this array, so re-sorting it re-orders the walk.
    expect(C.pillars.map((p) => p.label)).toEqual([
      "Governance & Policies",
      "Tools & Platform",
      "People & Mindset",
      "Strategy & Leadership",
      "Process & Methodology",
      "AI Companions",
    ]);

    // Read back out of the DOM: all six labels on the stage at pose 1, each in
    // its own box.
    C.pillars.forEach((pillar) => {
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}-label`).textContent,
        pillar.id,
      ).toBe(pillar.label);
    });
  });

  test("each renders an icon the shim actually has", () => {
    renderOrg(gems, POSE.RING);

    // THE HALF THE `PillarIcon` UNION CANNOT PROVE. A name can be spelled right,
    // pass the type, and still be missing from the shim's map — which renders
    // nothing at all and reads on a six-icon ring as a pillar that did not load.
    // So this counts the SVGs.
    C.pillars.forEach((pillar) => {
      const icon = screen.getByTestId(`shape-pillar-${pillar.id}-icon`);
      expect(icon.querySelectorAll("svg"), `${pillar.id} · ${pillar.icon}`).toHaveLength(1);
    });
  });

  test("sit on their own ring point, box centred on it", () => {
    renderOrg(gems, POSE.RING);

    // Structural, because jsdom places nothing: each box reads its own centre,
    // so a box and its spoke cannot disagree about where the pillar is.
    C.pillars.forEach((pillar, i) => {
      const box = screen.getByTestId(`shape-pillar-${pillar.id}`);
      expect(box.style.left, pillar.id).toBe(`${pillarCentre(i).x}px`);
      expect(box.style.top, pillar.id).toBe(`${pillarCentre(i).y}px`);
      expect(box.style.width, pillar.id).toBe(`${PILLAR_BOX.w}px`);
      expect(box.style.height, pillar.id).toBe(`${PILLAR_BOX.h}px`);
      // The centring translate is what makes `left`/`top` a CENTRE, and the
      // focus scale rides on the same transform.
      expect(box.style.transform, pillar.id).toContain("translate(-50%, -50%)");
    });
  });
});

// ── nothing is pre-dimmed (§7.1) ─────────────────────────────────────────────

describe("at rest, all six pillars carry full light", () => {
  // "Attention is bought with added light, never subtracted." At the resting pose
  // there is no walk, so there is nothing for a dim tier to mean — and the
  // cheapest way to break this is to port the prototype's three-tier ranking.
  beforeEach(() => renderOrg(berau, POSE.RING));

  test("with the same border, at the same opacity — no ranking of any kind", () => {
    const boxes = C.pillars.map((p) => screen.getByTestId(`shape-pillar-${p.id}`));

    const borders = new Set(boxes.map((b) => b.style.border));
    expect(borders.size, `borders: ${[...borders].join(" | ")}`).toBe(1);

    const [border] = [...borders];
    expect(border).toContain("solid");
    expect(border).toContain("var(--copper-");
    // NOT one of the dark tiers. A `--copper-800` border is the prototype's
    // "not visited yet", and at this pose nothing has been visited.
    DIM_COPPER_TIERS.forEach((tier) => expect(border, tier).not.toContain(tier));

    // FULLY OPAQUE, all six. Opacity on this slide means "not revealed yet",
    // which is time — so a pillar left at 0.6 would be a pillar ranked by the
    // one channel that must never carry rank.
    boxes.forEach((box, i) => expect(box.style.opacity, C.pillars[i].id).toBe("1"));

    // AND NOT ONE OF THEM IS FLAGGED ACTIVE. Pose 1 is the ring, not a beat, and
    // `data-active="true"` here would be a lit pillar in the export frame.
    expect(activePillarIds()).toEqual([]);
  });

  test("with the same label tier, and a full-strength one", () => {
    const colors = new Set(
      C.pillars.map((p) => screen.getByTestId(`shape-pillar-${p.id}-label`).style.color),
    );
    expect(colors.size, `label tiers: ${[...colors].join(" | ")}`).toBe(1);
    const [color] = [...colors];
    expect(FULL_LABEL_TIERS, `label tier ${color}`).toContain(color);
  });

  test("and the same spoke — one stroke, one width, no thickened one", () => {
    const spokes = C.pillars.map((p) => screen.getByTestId(`shape-spoke-${p.id}`));
    expect(new Set(spokes.map((s) => s.style.stroke)).size).toBe(1);
    expect(new Set(spokes.map((s) => s.style.strokeWidth)).size).toBe(1);
    expect(new Set(spokes.map((s) => s.style.opacity))).toEqual(new Set(["1"]));

    // THROUGH `style`, NOT THROUGH THE PRESENTATION ATTRIBUTE. `var()` only
    // resolves in CSS properties, so `stroke="var(--copper-600)"` as an attribute
    // is a black line on a black stage — the prototype's one hard-won line, and a
    // refactor that "tidies" it back into attributes loses all six spokes
    // silently. Now load-bearing twice, because the focus tier is a `var()` too.
    spokes.forEach((spoke, i) => {
      expect(spoke.style.stroke, C.pillars[i].id).toContain("var(--copper-");
      expect(spoke.hasAttribute("stroke"), C.pillars[i].id).toBe(false);
      expect(spoke.hasAttribute("stroke-width"), C.pillars[i].id).toBe(false);
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
      ] as const) {
        brightnessOf(tokenIn(value, `${p.id} · ${field}`), `${p.id} · ${field}`);
      }
      // The resting box has NO halo, written out as `none` rather than left off
      // the tier table — see `REST.boxHalo`. An absent key would make the two
      // tables different shapes, which is how a focus property ends up with no
      // release and the halo stays on the box the walk has left.
      expect(sig.boxShadow, `${p.id} · halo at rest`).toBe("none");
    });
  });
});

// ── THE PILLAR → DECISION MAPPING (the issue's AC, named) ─────────────────────

describe("the pillar → decision mapping", () => {
  test("each of the six beats lights one pillar and opens that pillar's decision", () => {
    // ONE MOUNTED TREE, WALKED. A per-pose re-mount would prove only that each
    // pose renders from cold; the deck never does that, and the bug class this
    // slide is at risk of — a pillar left lit, a counter one beat behind — only
    // exists in a tree that has already been at another pose.
    renderOrg(berau, POSE.HUB);
    goToPose(POSE.RING);
    const resting = allSignatures();

    const walked: string[] = [];
    C.pillars.forEach((pillar, i) => {
      const pose = POSE.FIRST_DECISION + i;
      goToPose(pose);

      // `walk.ts` FIRST, ON ITS OWN TERMS: beat `i` is pose `2 + i` and focuses
      // pillar `i`. Then the DOM, then the two held equal by `assertPose`.
      expect(focusedPillarIndex(pose), `pose ${pose} → pillar ${i}`).toBe(i);
      expect(BEAT_POSES[i], `beat ${i}`).toBe(pose);
      assertPose(pose, resting);

      // EXACTLY ONE LIT BOX, and it is THIS pillar. `assertPose` already holds the
      // list; this names the pillar in the failure message, which is the half a
      // reviewer reads.
      expect(activePillarIds(), `pose ${pose}`).toEqual([pillar.id]);
      walked.push(activePillarIds()[0]);

      // THE COLUMN SPEAKS FOR THE SAME PILLAR — its name in the display serif, its
      // decision in the serif body. Both read off the SAME content entry the ring's
      // box is labelled from, so a mapping that pointed the column at pillar `i+1`
      // fails here rather than looking like a copy edit.
      expect(
        screen.getByTestId(`shape-decision-${pillar.id}-label`).textContent,
        `pose ${pose} · label`,
      ).toBe(pillar.label);
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}-label`).textContent,
        `pose ${pose} · the ring says the same`,
      ).toBe(pillar.label);
      expect(
        screen.getByTestId(`shape-decision-${pillar.id}-text`).textContent,
        `pose ${pose} · decision`,
      ).toBe(pillar.decision);

      // THE COUNTER IS 1-BASED FOR THE ROOM AND 0-BASED IN THE CODE. Asserted
      // through `decisionCounter(i)` — the one function that does the `+ 1` — AND
      // as the literal string the room reads, because the two can disagree in
      // exactly one way that matters: a renderer that passed the POSE instead of
      // the pillar index would print "03 / 06" on the first beat and still agree
      // with a test that only compared it to `decisionCounter(pose)`.
      const eyebrow = screen.getByTestId(`shape-decision-${pillar.id}-eyebrow`);
      expect(eyebrow.textContent, `pose ${pose} · counter`).toBe(decisionCounter(i));
      expect(eyebrow.textContent, `pose ${pose} · 1-based`).toBe(
        `${C.decisionEyebrow} · 0${i + 1} / 0${DECISION_BEATS}`,
      );
    });

    // NO PILLAR SHARES A BEAT WITH ANOTHER (the AC, literally): six beats, six
    // distinct ids, in ring order. §7.1 refuses the pairing that would make this
    // three beats, so a walk that lit two pillars on one click — or the same pillar
    // twice — fails here.
    expect(walked).toEqual(C.pillars.map((p) => p.id));
    expect(new Set(walked).size).toBe(DECISION_BEATS);
    expect(walked).toHaveLength(BEAT_POSES.length);

    // The eyebrow counts UP TO the total and stops: "06 / 06" is the last thing
    // printed, and there is no "07 / 06" for the closer.
    expect(decisionCounter(DECISION_BEATS - 1)).toContain(
      `0${DECISION_BEATS} / 0${DECISION_BEATS}`,
    );
  });

  test("`focusedPillarIndex` and the DOM never disagree, at any of the nine", () => {
    // THE SAME SEAM, WALKED OVER EVERY POSE INCLUDING THE THREE THAT FOCUS
    // NOTHING. The beats above are where the map is interesting; poses 0, 1 and 8
    // are where it is at risk, because they are the poses a renderer reaches by
    // falling through rather than by deciding.
    renderOrg(gems, POSE.HUB);
    for (const pose of POSES) {
      goToPose(pose);
      const focus = focusedPillarIndex(pose);
      expect(activePillarIds(), `pose ${pose}`).toEqual(
        focus === NO_FOCUS ? [] : [C.pillars[focus].id],
      );
      expect(openDecisionIds(), `pose ${pose}`).toEqual(
        focus === NO_FOCUS ? [] : [C.pillars[focus].id],
      );
    }
  });
});

// ── THE NO-DIM RULE (the issue's AC, named) ──────────────────────────────────

describe("no inactive pillar loses anything, at any beat", () => {
  // §7.1: "Inactive pillars keep full border and label; the active one *gains*
  // copper fill, a thickened spoke and a halo. Attention is bought with added
  // light, never subtracted." The issue's AC says it as a negative — "**no**
  // inactive pillar loses border, label or luminance at any beat" — and a negative
  // over nine ways of losing something is only checkable as an identity: capture
  // the resting figure once, then demand it back, field by field, at all six beats.

  test("the five pillars a beat is not about are byte-identical to their resting selves", () => {
    renderOrg(berau, POSE.RING);
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

    for (const pose of BEAT_POSES) {
      goToPose(pose);
      const focus = focusedPillarIndex(pose);
      expect(focus, `pose ${pose} focuses somebody`).not.toBe(NO_FOCUS);

      C.pillars.forEach((pillar, j) => {
        if (j === focus) return;
        const now = pillarSignature(pillar.id);
        const was = resting.get(pillar.id)!;
        // FIELD BY FIELD FIRST, so the failure names the property and the pillar.
        // A whole-object diff over 5 pillars × 9 fields × 6 beats is unreadable,
        // and the message is what tells the next author whether a border moved or
        // a spoke did.
        for (const field of SIGNATURE_FIELDS) {
          expect(now[field], `pose ${pose} · ${pillar.id} · ${field}`).toBe(was[field]);
        }
        // THEN THE WHOLE OBJECT, which is not redundant: it is what catches a
        // TENTH field added to `PillarSignature` and forgotten in
        // `SIGNATURE_FIELDS`.
        expect(now, `pose ${pose} · ${pillar.id}`).toEqual(was);
      });

      // THE VACUITY GUARD, and it belongs in this test rather than beside it. Every
      // assertion above is an EQUALITY, so a signature that read the wrong element,
      // or a renderer that stopped distinguishing the poses at all, would satisfy
      // all thirty of them. So: the ONE pillar the beat IS about must NOT match its
      // resting self. That is what says the capture discriminates, and it is the
      // same fact §7.1 states from the other side — the difference between the two
      // tiers is the whole emphasis.
      expect(
        pillarSignature(C.pillars[focus].id),
        `pose ${pose} · ${C.pillars[focus].id} is the one that changed`,
      ).not.toEqual(resting.get(C.pillars[focus].id));
    }
  });

  test("and no inactive pillar's border or spoke ever reaches a dim copper tier", () => {
    // THE POSITIVE FORM OF THE SAME RULE, and the one that catches the specific
    // regression: the prototype ranks its inactive pillars TWICE MORE —
    // `--copper-800` for "not visited yet" and `--copper-600` for "already walked"
    // — so the arrival of beat 4 also re-colours pillars 1–3 and five boxes change
    // on a beat that is about the sixth. That ranking is deleted in the renderer,
    // not ported, and this is the assertion that says so out loud.
    //
    // IT IS NOT THE SAME TEST AS THE IDENTITY ABOVE. Identity would also hold if
    // all six pillars rested at `--copper-800` together; this says the resting tier
    // itself is not a "not yet" tier, at every beat, so the walk has room to add
    // light without taking any.
    renderOrg(berau, POSE.RING);
    for (const pose of BEAT_POSES) {
      goToPose(pose);
      const focus = focusedPillarIndex(pose);
      C.pillars.forEach((pillar, j) => {
        if (j === focus) return;
        const sig = pillarSignature(pillar.id);
        // POSITIVE CONTROL, per pillar: there IS a copper token to be wrong.
        expect(sig.border, `pose ${pose} · ${pillar.id}`).toContain("var(--copper-");
        expect(sig.spokeStroke, `pose ${pose} · ${pillar.id}`).toContain("var(--copper-");
        for (const tier of DIM_COPPER_TIERS) {
          expect(sig.border, `pose ${pose} · ${pillar.id} · border ${tier}`).not.toContain(
            tier,
          );
          expect(
            sig.spokeStroke,
            `pose ${pose} · ${pillar.id} · spoke ${tier}`,
          ).not.toContain(tier);
        }
        // And the label stays full strength — the other half of §7.1's "keep full
        // border and label".
        expect(FULL_LABEL_TIERS, `pose ${pose} · ${pillar.id} · label`).toContain(
          sig.labelColor,
        );
        // And rank is never carried in the opacity channel, which on this slide
        // means "not revealed yet".
        expect(sig.opacity, `pose ${pose} · ${pillar.id} · opacity`).toBe("1");
      });
    }
  });
});

// ── what the ACTIVE pillar gains ─────────────────────────────────────────────

describe("the active pillar gains light and nothing else", () => {
  /** The four colour properties whose focus tier must sit at or ABOVE its resting
   *  one on the same ladder. Not the box fill — that one crosses ladders on
   *  purpose (neutral → copper) and is asserted separately below. */
  const RAMPED: readonly (keyof PillarSignature)[] = [
    "border",
    "iconColor",
    "labelColor",
    "spokeStroke",
  ];

  test("a brighter tier on the border, icon, label and spoke — never a darker one", () => {
    renderOrg(berau, POSE.RING);
    const resting = allSignatures();

    for (const pose of BEAT_POSES) {
      goToPose(pose);
      const pillar = C.pillars[focusedPillarIndex(pose)];
      const now = pillarSignature(pillar.id);
      const was = resting.get(pillar.id)!;

      for (const field of RAMPED) {
        const where = `pose ${pose} · ${pillar.id} · ${field}`;
        const before = brightnessOf(tokenIn(was[field], where), where);
        const after = brightnessOf(tokenIn(now[field], where), where);
        // SAME LADDER. A copper border that became a neutral one would be a hue
        // change dressed as an emphasis, and the two ladders have no shared
        // luminance order to compare across.
        expect(after.family, `${where} · ladder`).toBe(before.family);
        // AT OR BRIGHTER — the whole claim, as an ordering. `!==` would pass on a
        // DARKER tier, which is the failure §7.1 exists to forbid.
        expect(after.rung, `${where} · ${was[field]} → ${now[field]}`).toBeGreaterThanOrEqual(
          before.rung,
        );
      }

      // THE SPOKE IS THICKENED, not merely re-coloured (§7.1 names it): 2.6 over
      // 1.6, and the comparison is numeric so "2.6" vs "10" cannot pass as string
      // order.
      expect(Number(now.spokeWidth), `pose ${pose} · spoke width`).toBeGreaterThan(
        Number(was.spokeWidth),
      );
    }
  });

  test("a copper fill where the resting box is the stage's own neutral", () => {
    renderOrg(berau, POSE.RING);
    const resting = allSignatures();

    for (const pose of BEAT_POSES) {
      goToPose(pose);
      const pillar = C.pillars[focusedPillarIndex(pose)];
      const now = pillarSignature(pillar.id);
      const was = resting.get(pillar.id)!;

      // §7.1's "gains copper fill". THE LADDER CHANGES HERE, deliberately and
      // uniquely: the resting box is the STAGE's own colour (`--neutral-900`) so
      // that it is defined by its border alone, and the focused box is filled with
      // copper (`--copper-900`, #3d2413 against #0a0a0a). Brightness across two
      // ladders is not an ordering anyone can assert, so the claim is stated as
      // what it is — the fill changes family, from the stage to the accent.
      expect(was.background, `pose ${pose} · resting fill`).toContain("var(--neutral-");
      expect(now.background, `pose ${pose} · focused fill`).toContain("var(--copper-");
      expect(now.background, `pose ${pose} · fill moved`).not.toBe(was.background);
    }
  });

  test("a halo of exactly FOCUS_HALO_WIDTH, where the resting box has none", () => {
    renderOrg(berau, POSE.RING);
    const resting = allSignatures();

    for (const pose of BEAT_POSES) {
      goToPose(pose);
      const pillar = C.pillars[focusedPillarIndex(pose)];
      const now = pillarSignature(pillar.id);

      // `none` → a hard copper ring. A SPREAD AND NOT A BLUR, which is why the
      // width is asserted as a number: `0 0 0 4px` paints exactly 4px outside the
      // box's own edge on every side, and that 4 is the number
      // `FOCUS_GROWTH_SPENT` adds to the floor budget by hand — because a
      // `box-shadow` is outside every layout measurement a browser can make.
      expect(resting.get(pillar.id)!.boxShadow, `pose ${pose} · resting halo`).toBe("none");
      expect(now.boxShadow, `pose ${pose} · halo`).toContain(`${FOCUS_HALO_WIDTH}px`);
      expect(now.boxShadow, `pose ${pose} · halo tier`).toContain("var(--copper-");
      // No offset and no blur, so the three leading lengths are zeroes.
      expect(now.boxShadow, `pose ${pose} · hard ring`).toMatch(/^0 0 0 /);
    }
  });

  test("FOCUS_SCALE on the same transform that centres the box, and no opacity change", () => {
    renderOrg(berau, POSE.RING);
    const resting = allSignatures();

    for (const pose of BEAT_POSES) {
      goToPose(pose);
      const pillar = C.pillars[focusedPillarIndex(pose)];
      const now = pillarSignature(pillar.id);

      // ONE TRANSFORM CARRYING BOTH. The scale has to compose onto the
      // `translate(-50%, -50%)` that makes `left`/`top` a CENTRE — a wrapper
      // element per effect would give the arrival and the beat separate timelines,
      // and a scale that REPLACED the translate would drop the box half its own
      // size down and right at the moment the room is looking at it.
      expect(now.transform, `pose ${pose} · centred`).toContain("translate(-50%, -50%)");
      expect(now.transform, `pose ${pose} · grown`).toBe(
        `translate(-50%, -50%) scale(${FOCUS_SCALE})`,
      );
      expect(resting.get(pillar.id)!.transform, `pose ${pose} · resting scale`).toBe(
        "translate(-50%, -50%) scale(1)",
      );

      // AND NO OPACITY CHANGE, WHICH IS THE POINT. On this slide opacity means
      // "not revealed yet" — it is the channel the arrival sweep uses — so a focus
      // expressed as an alpha (the prototype fills with `rgba(184,110,61,0.22)`)
      // would be a RANK in the one channel that carries TIME. Rank is a colour
      // tier here, always.
      expect(now.opacity, `pose ${pose} · focused opacity`).toBe("1");
      expect(now.opacity, `pose ${pose} · unchanged`).toBe(
        resting.get(pillar.id)!.opacity,
      );
    }
  });
});

// ── 8 → 0, in both directions, in one mounted tree (the AC) ──────────────────

describe("the walk re-renders cleanly in both directions", () => {
  test("0 → 8 then 8 → 0, pose by pose, with the same invariants on the way down", () => {
    // THE AC'S OWN WORDS: "`8 → 0` re-renders cleanly in both directions; no beat
    // leaves a pillar stuck in its focused state." It is true BY CONSTRUCTION —
    // every function in `walk.ts` is a function of the pose alone, so there is no
    // history for a backwards step to contradict — and this is the test that says
    // the renderer did not add one. A component that cached "the previously focused
    // pillar" would pass the upward walk and fail here.
    renderOrg(berau, POSE.HUB);

    let resting: Map<string, PillarSignature> | undefined;
    for (const pose of POSES) {
      goToPose(pose);
      if (pose === POSE.RING) resting = allSignatures();
      assertPose(pose, resting);
    }

    // AND BACK DOWN, one pose at a time through the same tree. `[...POSES]` is
    // reversed rather than counted down, so the two walks visit exactly the same
    // set.
    for (const pose of [...POSES].reverse()) {
      goToPose(pose);
      assertPose(pose, resting);
    }

    // Ending where it started: pose 0 is the hub alone again.
    expect(activePillarIds()).toEqual([]);
    C.pillars.forEach((p) => {
      expect(screen.getByTestId(`shape-pillar-${p.id}`).style.opacity, p.id).toBe("0");
      expect(
        screen.getByTestId(`shape-pillar-${p.id}`).style.transform,
        `${p.id} · un-arrived`,
      ).toBe("translate(-50%, -50%) scale(0.86)");
    });
  });

  test("poses 0, 1 and 8 focus nothing and hold every decision shut", () => {
    // THE THREE POSES THE WALK IS NOT ON. Pose 8 is the one that matters: the
    // sixth beat is the pose immediately before it, so a renderer that kept the
    // last-focused index — or clamped `NO_FOCUS` to 0, which is what
    // `pillars.at(focus)` and the prototype's `Math.max(focus, 0)` both do — leaves
    // AI Companions lit under the closer's own copy, or flashes GOVERNANCE up
    // beneath it with a "01 / 06" counter for a beat that is not running.
    renderOrg(gems, POSE.HUB);
    for (const pose of UNFOCUSED_POSES) {
      goToPose(pose);
      expect(focusedPillarIndex(pose), `pose ${pose} · walk.ts`).toBe(NO_FOCUS);
      expect(activePillarIds(), `pose ${pose} · lit boxes`).toEqual([]);
      C.pillars.forEach((p) => {
        expect(
          screen.getByTestId(`shape-decision-${p.id}`).style.opacity,
          `pose ${pose} · ${p.id}`,
        ).toBe("0");
      });
    }
  });

  test("and at pose 8 the ring is exactly the resting figure, with only the closer added", () => {
    // THE STRONGEST FORM OF "nothing stuck": not just "no pillar is flagged
    // active" but "all six pillars are byte-identical to pose 1". Reached by
    // WALKING there through all six beats, so the comparison is against a figure
    // that has been lit and released six times.
    renderOrg(berau, POSE.HUB);
    goToPose(POSE.RING);
    const resting = allSignatures();

    for (const pose of POSES) goToPose(pose);
    expect(focusedPillarIndex(CLOSER_POSE)).toBe(NO_FOCUS);

    C.pillars.forEach((pillar) => {
      expect(pillarSignature(pillar.id), `pose ${CLOSER_POSE} · ${pillar.id}`).toEqual(
        resting.get(pillar.id),
      );
    });

    // ONLY THE CLOSER ADDED — and the column it is in, which opened at the first
    // beat and never closed.
    expect(screen.getByTestId("shape-closer").style.opacity).toBe("1");
    expect(screen.getByTestId("shape-walk-column").style.opacity).toBe("1");
  });
});

// ── the closer ───────────────────────────────────────────────────────────────

describe("the closer", () => {
  test("is mounted at every pose and open at pose 8 alone", () => {
    // MOUNTED THROUGHOUT, revealed once. It shares the column's slot with the six
    // beats, so it cannot be conditionally rendered: an element that mounted at
    // pose 8 would arrive with no frame to transition from, and the column's own
    // hairline would have nothing to hold while the sixth decision faded out.
    renderOrg(berau, POSE.HUB);
    for (const pose of POSES) {
      goToPose(pose);
      const closer = screen.getByTestId("shape-closer");
      expect(closer, `pose ${pose}`).toBeInTheDocument();
      expect(closer.style.opacity, `pose ${pose}`).toBe(pose === CLOSER_POSE ? "1" : "0");
      expect(showsCloser(pose), `pose ${pose} · walk.ts`).toBe(pose === CLOSER_POSE);
    }
  });

  test("prints §6.6's refusal, with the claim highlighted and not the refusal", () => {
    renderOrg(berau, CLOSER_POSE);
    const closer = screen.getByTestId("shape-closer");
    expect(closer.textContent).toBe(C.closer);
    // TWO SENTENCES, AND THE SECOND IS THE LOAD-BEARING ONE — the refusal the
    // whole figure exists to earn. Pinned as a substring so a copy edit that
    // softened it fails here.
    expect(C.closer).toContain("None of them is a tool purchase.");

    // THE HIGHLIGHT IS ON THE CLAIM. Prose, so it carries `*Kw`; the italic is the
    // last emphasis the room takes away, and emphasising the refusal would leave
    // the closing image a purchase.
    const ems = [...closer.querySelectorAll("em")].map((e) => e.textContent);
    expect(ems.length).toBeGreaterThan(0);
    expect(ems).toEqual([...C.closerKw]);
    expect(C.closerKw).toContain("a decision on your desk");
  });

  test("renders INSIDE the walk column, which is the right column", () => {
    // THE DOM HALF OF "the closer renders in the right column" (the AC). jsdom
    // places nothing, so containment is the strongest structural claim available:
    // the closer is a CHILD of the column, so it inherits the column's rectangle
    // and cannot drift to a second left edge the way the prototype's separate
    // closer block did.
    renderOrg(berau, CLOSER_POSE);
    const column = screen.getByTestId("shape-walk-column");
    expect(column.contains(screen.getByTestId("shape-closer"))).toBe(true);
    // And so are all six beats — one slot, seven things in turn.
    C.pillars.forEach((p) => {
      expect(
        column.contains(screen.getByTestId(`shape-decision-${p.id}`)),
        p.id,
      ).toBe(true);
    });

    // THE COLUMN IS THE RIGHT COLUMN, by the numbers both sides read. `right` is a
    // CSS OFFSET and not an x, so the column's type wraps against the deck's own
    // side margin instead of overhanging it.
    expect(column.style.left).toBe(`${WALK_COLUMN.left}px`);
    expect(column.style.right).toBe(`${WALK_COLUMN.right}px`);
    expect(WALK_COLUMN.left).toBe(WALK_COLUMN_LEFT);
    expect(WALK_COLUMN.right).toBe(SIDE_MARGIN);
    // Left of the column is the figure, right of it is the margin: the whole
    // horizontal budget, read from both ends.
    expect(WALK_COLUMN.left).toBeGreaterThan(FOCUSED_OUTERMOST_RIGHT);

    // WHAT THIS CANNOT SAY. Whether the closer's own glyphs clear the focused
    // sixth pillar's halo, and whether the lowest pillar clears the NavBar band at
    // its grown size, are RENDERED clearances — jsdom lays nothing out and a
    // `box-shadow` spread is outside `getBoundingClientRect` even in a real
    // engine. `scripts/gh55-verify.mjs` measures them at 1280×720; the arithmetic
    // they are measured against is in the geometry describes below.
  });

  test("is NOT in the bottom strip — there is no bottom strip left", () => {
    // §7.1's ONE RECORDED LAYOUT RISK, as the reason for a layout decision rather
    // than as prose. The lowest pillar's box already reaches 610 of a 632 floor and
    // GROWS to 616.52 at the beat that focuses it, so a closer set under the figure
    // would sit either inside the NavBar's hover band or under the sixth beat's own
    // halo. The column the walk has just finished with is empty at exactly the pose
    // the closer needs it.
    expect(FOCUSED_LOWEST_PILLAR_BOTTOM).toBeGreaterThan(WALK_COLUMN.bottom);
    expect(NAV_ZONE_TOP - FOCUSED_LOWEST_PILLAR_BOTTOM).toBeLessThan(24);

    // And structurally: the closer's box is the column's, not a second one at the
    // stage's foot.
    renderOrg(berau, CLOSER_POSE);
    const closer = screen.getByTestId("shape-closer");
    expect(closer.style.left).toBe(`${WALK_COLUMN.rulePad}px`);
    expect(closer.style.top).toBe("50%");
    expect(closer.style.bottom).toBe("");
  });
});

// ── the walk column ──────────────────────────────────────────────────────────

describe("the walk column", () => {
  test("opens at the first beat and never closes", () => {
    // 0 at poses 0 and 1, then 1 from the first beat through the closer.
    //
    // IT NEVER OPENS AT POSE 1: the ring's own reveal is a six-box sweep, and a
    // hairline arriving beside it would compete with the thing the room is
    // watching.
    renderOrg(gems, POSE.HUB);
    for (const pose of POSES) {
      goToPose(pose);
      const expected = pose >= POSE.FIRST_DECISION ? "1" : "0";
      expect(
        screen.getByTestId("shape-walk-column").style.opacity,
        `pose ${pose}`,
      ).toBe(expected);
      expect(showsWalkColumn(pose), `pose ${pose} · walk.ts`).toBe(expected === "1");
    }
  });

  test("is ONE element, so the hairline cannot blink at the closer", () => {
    // THE PROTOTYPE'S BUG, asserted away. It drew the beats in one bordered panel
    // and the closer in a SECOND bordered block at the same left edge, each with
    // its own `opacity: … ? 1 : 0` — so at pose 8 the left hairline faded out and
    // back in in the same place. Two elements pretending to be one column, and the
    // blink is what gives it away on a projector.
    //
    // ASSERTED THREE WAYS, because "one element" has three failure modes. One node
    // in the tree (a second column would be a second node), the SAME node across
    // the pose the blink would happen on (React remounting it is the same blink
    // without the duplicate), and the border declared on the COLUMN rather than on
    // the things inside it.
    renderOrg(gems, POSE.FIRST_DECISION);
    expect(document.querySelectorAll('[data-testid="shape-walk-column"]')).toHaveLength(1);
    const atFirstBeat = screen.getByTestId("shape-walk-column");
    expect(atFirstBeat.style.borderLeft).toContain("solid");
    expect(atFirstBeat.style.borderLeft).toContain("var(--copper-");

    goToPose(CLOSER_POSE);
    // IDENTITY, not equality: the same DOM node, so nothing unmounted and
    // remounted between the last beat and the closer.
    expect(screen.getByTestId("shape-walk-column")).toBe(atFirstBeat);
    expect(screen.getByTestId("shape-walk-column").style.borderLeft).toBe(
      atFirstBeat.style.borderLeft,
    );
    // And no child of it carries a border of its own to blink instead.
    C.pillars.forEach((p) => {
      expect(
        screen.getByTestId(`shape-decision-${p.id}`).style.borderLeft,
        p.id,
      ).toBe("");
    });
    expect(screen.getByTestId("shape-closer").style.borderLeft).toBe("");
  });

  test("mounts all six decision blocks at every pose, exactly one open per beat", () => {
    renderOrg(berau, POSE.HUB);
    for (const pose of POSES) {
      goToPose(pose);
      // SIX MOUNTED, ALWAYS — see `assertPose` for why a single swapping panel
      // cannot be correct at the closer's pose.
      C.pillars.forEach((p) => {
        const block = screen.getByTestId(`shape-decision-${p.id}`);
        expect(block, `pose ${pose} · ${p.id}`).toBeInTheDocument();
        // THE SAME RECTANGLE for all six, which is what makes the cross-fade a
        // cross-fade rather than a re-layout: the eyebrow does not move by the
        // difference between two label lengths.
        expect(block.style.left, `pose ${pose} · ${p.id}`).toBe(
          `${WALK_COLUMN.rulePad}px`,
        );
        expect(block.style.top, `pose ${pose} · ${p.id}`).toBe("50%");
      });
      const open = openDecisionIds();
      expect(open.length, `pose ${pose} · open blocks`).toBe(
        BEAT_POSES.includes(pose) ? 1 : 0,
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
    // And there is no `width`: one was carried here, read by nothing but this
    // assertion, and named for the column's outer edge rather than the measure the
    // type gets. `scripts/gh55-verify.mjs` measures the content box off the element.
    expect("width" in WALK_COLUMN).toBe(false);
    // Symmetric about the hub's own eye level, which is why the seven blocks
    // inside share one `top: 50%` instead of stacking from the top.
    expect((WALK_COLUMN.top + WALK_COLUMN.bottom) / 2).toBe(HUB.y);

    // `bottom` IS A CSS OFFSET AND `WALK_COLUMN.bottom` IS A STAGE Y, hence the
    // subtraction in the renderer.
    renderOrg(gems, POSE.FIRST_DECISION);
    const column = screen.getByTestId("shape-walk-column");
    expect(column.style.top).toBe(`${WALK_COLUMN.top}px`);
    expect(column.style.bottom).toBe(`${720 - WALK_COLUMN.bottom}px`);
    expect(column.style.paddingLeft).toBe(`${WALK_COLUMN.rulePad}px`);
  });
});

// ── section D's words — the index claim (§6.6) ────────────────────────────────

describe("the walk indexes the section behind it", () => {
  /**
   * THE CONTRACT, AS A TABLE. §6.6: the walk turns the centrepiece into the index
   * for section D — "security and no-SOP land on *Governance & Policies*,
   * subscriptions on *Tools & Platform*, 'Leading AI Culture' on *People & Mindset*
   * + *Strategy & Leadership*". The mechanism is the WORDS: a leader hears the same
   * vocabulary again two sections later, with no pointer line announcing it.
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

  test("and every decision is a leader's DECISION, not a description of a pillar", () => {
    // §6.6's actual failure mode. "Governance & Policies" is a box on an org chart
    // and every leader in the room already agrees with it; six descriptions make
    // this slide a taxonomy nobody argues with. All six open on the same stem, and
    // THE REPETITION IS THE ARGUMENT — one sentence answered six ways, so by the
    // fourth beat the room hears the stem rather than reading a new sentence, and
    // the stem is the claim the closer then states outright.
    C.pillars.forEach((pillar) => {
      expect(pillar.decision, pillar.id).toMatch(/^You decide /);
      expect(pillar.decision, pillar.id).toMatch(/[.]$/);
      // And it is not the pillar's own name restated.
      expect(pillar.decision, pillar.id).not.toContain(pillar.label);
    });
    // Six distinct decisions — a copy-paste that left two pillars sharing a line
    // would otherwise pass every mapping assertion in this file.
    expect(new Set(C.pillars.map((p) => p.decision)).size).toBe(PILLAR_COUNT);
  });

  test("and the pointer line #16 wrote is NOT ported", () => {
    // The prototype prints a mono `→ ACT III · …` pointer under each decision.
    // Refused, and stated in `content.ts` as a deviation rather than left to be
    // discovered by diffing: one of its six lines IS `Specify · Generate · Verify`
    // (the panel §6.6 drops), and the `ACT III` prefix names a movement THIS deck
    // never tells the audience exists. §6.6's requirement is that the walk INDEXES
    // section D, and the words above are the index — a sixth line of mono chrome
    // would announce the cross-reference instead of making it, and would spend the
    // one line of the column the closer needs.
    renderOrg(berau, CLOSER_POSE);
    const text = document.body.textContent ?? "";
    expect(text, "positive control").toContain(C.closer);
    expect(text).not.toMatch(/\bact\s+(i{1,3}|1|2|3)\b/i);
    expect(text).not.toContain("→");
  });
});

// ── the panel §6.6 refuses ───────────────────────────────────────────────────

describe("Specify → Generate → Verify appears nowhere", () => {
  test("at every one of the nine poses, under any brand", () => {
    // §6.6 DROPS the HR original's panel — C.4 (leader F.4) already does it
    // better — and the freed space is what the six decision beats are spent on. It
    // is REFUSED, NOT PENDING, and this is the assertion that says so out loud so
    // nobody re-adds it as "the bit that's missing".
    //
    // NINE POSES NOW, NOT TWO. The six decisions and the closer are new copy in a
    // new column, and the process pillar is exactly where a paraphrase would land:
    // the prototype pointed that pillar at Specify · Generate · Verify. All six
    // decisions are MOUNTED at every pose, so each pass reads all of them — but the
    // walk is still stepped, because the check is over `document.body` and a pose
    // that mounted a seventh block would only show up at the pose that mounts it.
    for (const brandLine of [gems, berau, hubBrandLineFor("general")]) {
      for (const pose of POSES) {
        const { unmount } = renderOrg(brandLine, pose);
        const text = document.body.textContent ?? "";
        // POSITIVE CONTROL FIRST. Every assertion below is a `not.toMatch` over
        // this one string, so an empty stage would pass all of them.
        expect(text, `pose ${pose}`).toContain(C.headline);
        expect(text, `pose ${pose}`).toContain("The Enabler");
        expect(text, `pose ${pose}`).toContain(C.pillars[0].decision);

        for (const word of [/\bspecify\b/i, /\bgenerate\b/i, /\bverify\b/i]) {
          expect(text, `pose ${pose} · ${word}`).not.toMatch(word);
        }
        unmount();
      }
    }
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

    // Index 0 is the top of the ring, which is what makes the walk step AROUND
    // the ring rather than jump across it.
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

  test("every box clears the header and stays out of the walk's column", () => {
    // The horizontal budget and the ceiling half of the vertical one, held as
    // numbers rather than prose. AT REST — the focused pose is measured in the
    // describe below, and it does NOT clear the side margin, deliberately.
    for (let i = 0; i < PILLAR_COUNT; i++) {
      const box = pillarBox(i);
      expect(box.left, `pillar ${i} left margin`).toBeGreaterThanOrEqual(SIDE_MARGIN);
      // The figure has to fit between the margin and the column the walk writes
      // into, and this is the assertion that stops a "let's widen the ring" edit
      // from taking the column's space.
      expect(box.right, `pillar ${i} clears the walk column`).toBeLessThanOrEqual(
        WALK_COLUMN_LEFT,
      );
      expect(box.top, `pillar ${i} clears the kicker`).toBeGreaterThanOrEqual(
        FIGURE_CEILING,
      );
      expect(FIGURE_CEILING).toBeGreaterThan(KICKER_TOP);
    }
  });

  test("the lowest pillar clears the NavBar hover band, with the walk's growth paid for", () => {
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

    // AND THE HEADROOM THE WALK WAS RESERVED, which is now spent — see the
    // focused-pose describe for what it actually cost.
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
});

// ── the FOCUSED pose, measured (§7.1's re-check) ──────────────────────────────

describe("the focused pose's geometry", () => {
  // §7.1 asked ONE question about this figure — "the lowest satellite … grows on
  // focus. Re-check clearance when rebuilt." — and it is answered at the FOCUSED
  // pose rather than the resting one, because the focused pose is reached in front
  // of a room: the walk visits all six pillars, one beat each, and the lowest one
  // is pillar 3.
  //
  // FLOAT CAUTION, ALL THE WAY THROUGH. `1.07 - 1` is `0.07000000000000006`, so
  // `FOCUS_GROWTH_SPENT` is 6.520000000000002, `FOCUSED_NAV_ZONE_CLEARANCE` is
  // 15.480000000000018, `FOCUSED_MARGIN_INTRUSION` is 9.347113059642808 and
  // `FOCUSED_WALK_COLUMN_GAP` is 22.65288694035712. `toBe(6.52)` FAILS. What holds
  // to the bit is the RELATIONS, so the relations are what is asserted and
  // `toBeCloseTo` only pins the human-readable value beside them.

  test("the focus spends less than gh#54 reserved for it", () => {
    // `72 × 0.07 ÷ 2 + 4` — HALF the scale's growth, because the box scales about
    // its own centre and only the downward half travels toward the floor, plus the
    // WHOLE halo, because the ring is painted outside the scaled edge and is
    // invisible to every layout measurement.
    expect(FOCUS_GROWTH_SPENT).toBe((PILLAR_BOX.h * (FOCUS_SCALE - 1)) / 2 + FOCUS_HALO_WIDTH);
    expect(FOCUS_GROWTH_SPENT).toBeCloseTo(6.52, 10);
    // THE ESTIMATE WAS NOT EXCEEDED. gh#54 reserved 8 one ticket before the walk
    // existed; this is the assertion that the walk fitted inside it, and the one
    // that fails if a later edit reaches for a heavier halo or a 1.2 scale.
    expect(FOCUS_GROWTH_SPENT).toBeLessThanOrEqual(FOCUS_GROWTH_RESERVE);
    // 1.15 would cost 9.4 and not fit — pinned so the scale is not read as taste.
    expect((PILLAR_BOX.h * 0.15) / 2 + FOCUS_HALO_WIDTH).toBeGreaterThan(
      FOCUS_GROWTH_RESERVE,
    );
  });

  test("the FOCUSED lowest pillar still clears the NavBar hover band", () => {
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
    expect(NAV_ZONE_TOP - (658 + (76 * (FOCUS_SCALE - 1)) / 2 + FOCUS_HALO_WIDTH)).toBeLessThan(
      0,
    );
  });

  test("`focusedPillarBox` and the constants agree, and it refuses a pillar the ring lacks", () => {
    // THE FUNCTION AND THE CONSTANT ARE THE SAME EDGE, reached two ways — the
    // constant adds the growth to the resting bottom, the function grows the box
    // about its centre. They must be the SAME number to the bit, because the
    // horizontal budget below is derived from the function while the vertical one
    // is derived from the constant.
    expect(focusedPillarBox(LOWEST_PILLAR_INDEX).bottom).toBe(FOCUSED_LOWEST_PILLAR_BOTTOM);

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

  test("the focused halo never touches the column the decision is printed in", () => {
    // THE CONSTRAINT THAT IS REAL, as opposed to the side margin below. The column
    // holds the decision the focused pillar is being read against, and a halo that
    // touched it would put the two things the room is comparing into one mark.
    expect(FOCUSED_WALK_COLUMN_GAP).toBeGreaterThan(0);
    expect(FOCUSED_WALK_COLUMN_GAP).toBe(WALK_COLUMN_LEFT - FOCUSED_OUTERMOST_RIGHT);
    expect(FOCUSED_WALK_COLUMN_GAP).toBeCloseTo(22.65, 2);
    expect(FOCUSED_OUTERMOST_RIGHT).toBeLessThan(WALK_COLUMN_LEFT);
    // The resting gap is ≈33.5 and the focus spends ≈10.86 of it — the horizontal
    // twin of the floor budget: same pose, same growth, other axis.
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

  test("the DELIBERATE DEVIATION: the focused outermost pillar DOES enter the side margin", () => {
    // THIS IS NOT A BUG AND IT IS NOT AN OVERSIGHT — it is a rule collision that
    // was resolved, and the resolution is asserted rather than tolerated.
    //
    // THE ARITHMETIC THAT MAKES IT FORCED. The resting box of the two outermost
    // pillars starts at 49.5, so the figure has 1.5px of margin slack. §7.1 settles
    // that the focused pillar GAINS a halo, and the halo is 4px — so AT ANY SCALE
    // ≥ 1, INCLUDING 1.0, the halo alone crosses that slack. §7.1's halo and the
    // deck's 48px type margin therefore cannot both hold. §7.1 is the stronger
    // rule — a walk that could not emphasise two of six pillars would not be an
    // index — so THE MARGIN GIVES WAY AND NO GLYPH DOES.
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
  test("`focusedPillarIndex` maps 2…7 → 0…5 and everything else to NO_FOCUS", () => {
    // TOTAL AND NON-THROWING, deliberately, and the opposite of `pillarCentre` and
    // `decisionCounter`, which throw: an out-of-range PILLAR index is an authoring
    // bug the author must be shown, while a pose is UI state, and a slide that
    // crashes on a pose is worse in front of a room than a slide with nothing
    // focused.
    for (let pose = -2; pose <= 12; pose++) {
      const expected =
        pose >= POSE.FIRST_DECISION && pose < POSE.FIRST_DECISION + DECISION_BEATS
          ? pose - POSE.FIRST_DECISION
          : NO_FOCUS;
      expect(focusedPillarIndex(pose), `pose ${pose}`).toBe(expected);
    }
    // The six beats, named: 2 → 0 … 7 → 5.
    expect(BEAT_POSES.map((p) => focusedPillarIndex(p))).toEqual([0, 1, 2, 3, 4, 5]);
    // And the three that focus nothing.
    UNFOCUSED_POSES.forEach((p) =>
      expect(focusedPillarIndex(p), `pose ${p}`).toBe(NO_FOCUS),
    );

    // `Number.isInteger` IS LOAD-BEARING. Pose 2.5 would otherwise pass the range
    // check as 0.5 and hand a caller `pillars[0.5]` — `undefined` — from a value
    // that had already been checked against `NO_FOCUS`: a lit spoke beside an empty
    // column. A caller mid-transition is exactly where a fractional pose comes
    // from.
    expect(focusedPillarIndex(2.5)).toBe(NO_FOCUS);
    expect(focusedPillarIndex(Number.NaN)).toBe(NO_FOCUS);
    expect(focusedPillarIndex(Number.POSITIVE_INFINITY)).toBe(NO_FOCUS);
  });

  test("NO_FOCUS is a value, and one no array on this slide can index", () => {
    // −1 and not `null`: pillar 0 — Governance, the first beat — is falsy, so a
    // `number | null` would put a truthiness bug one keystroke away. And out of
    // range for every array here, which is the second half of the choice: a caller
    // that forgets to check gets `undefined` and renders a visibly empty column,
    // rather than the LAST pillar — which is what `pillars.at(-1)` hands back, and
    // which would light AI Companions under the closer's own copy.
    expect(NO_FOCUS).toBe(-1);
    expect(C.pillars[NO_FOCUS]).toBeUndefined();
    expect(PILLAR_CENTRES[NO_FOCUS]).toBeUndefined();
    // And the counter refuses it rather than clamping to "01 / 06", which is what
    // the prototype's `Math.max(focus, 0) + 1` prints at the closer's pose.
    expect(() => decisionCounter(NO_FOCUS)).toThrow(/no pillar/);
    expect(() => decisionCounter(DECISION_BEATS)).toThrow(/no pillar/);
  });

  test("`showsPillars` is true from the ring onward and never false again", () => {
    // A `pose === 1` here would be the bug this function exists to prevent, and it
    // is the kind a reveal written per-pose invites: the pillars would vanish the
    // moment the first decision arrived.
    expect(showsPillars(POSE.HUB)).toBe(false);
    expect(showsPillars(-1)).toBe(false);
    for (let pose = POSE.RING; pose <= STEP_COUNT + 3; pose++) {
      expect(showsPillars(pose), `pose ${pose}`).toBe(true);
    }
  });

  test("`showsWalkColumn` opens at the first beat and stays open through the closer", () => {
    // A SEPARATE QUESTION FROM `focusedPillarIndex(pose) !== NO_FOCUS`, and that is
    // the whole point: the column is ONE object holding two things in turn — six
    // decisions, then the closer — so it must be up at pose 8, where no pillar is
    // focused. The prototype treated them as two and its left hairline blinked off
    // and on in the same place.
    expect(showsWalkColumn(POSE.HUB)).toBe(false);
    expect(showsWalkColumn(POSE.RING)).toBe(false);
    expect(showsWalkColumn(POSE.FIRST_DECISION)).toBe(true);
    expect(showsWalkColumn(CLOSER_POSE)).toBe(true);
    BEAT_POSES.forEach((p) => expect(showsWalkColumn(p), `pose ${p}`).toBe(true));
  });

  test("`showsCloser` is true AT the closer's pose and stays true past the end", () => {
    // `>=` AND NOT `===`, even though `CLOSER_POSE` is the last pose this slide
    // has. The poses past the end are reachable in exactly the places that matter:
    // a test handing the figure pose 9 to prove nothing extra appears, and an
    // export or a deep link asking for a step index a later edit to `steps` has
    // invalidated. The last pose of a slide should be the pose that survives an
    // over-shoot — so pose 9 is asserted true here, and the "no extra pose" test
    // below is what that `>=` makes possible.
    for (let pose = 0; pose < CLOSER_POSE; pose++) {
      expect(showsCloser(pose), `pose ${pose}`).toBe(false);
    }
    expect(showsCloser(CLOSER_POSE)).toBe(true);
    expect(showsCloser(CLOSER_POSE + 1)).toBe(true);
    expect(showsCloser(STEP_COUNT)).toBe(true);
    expect(showsCloser(12)).toBe(true);
  });

  test("the budget is DERIVED from the pillar count, so a seventh pillar grows it", () => {
    // NOT LITERALS. A `steps: 9` typed by hand is how the seventh pillar's decision
    // becomes a pose the deck can never reach — `DeckContext` clamps at
    // `steps - 1`, so there is no error, no blank slide and no failing test, just
    // one pillar whose decision is never spoken and a closer that arrives while a
    // pillar is still lit.
    expect(DECISION_BEATS).toBe(C.pillars.length);
    // Taken from the COPY's array and not from the geometry's count — a beat prints
    // a pillar's copy — and the two are held equal here so the ring and the walk
    // cannot disagree about how many pillars there are.
    expect(DECISION_BEATS).toBe(PILLAR_COUNT);
    expect(CLOSER_POSE).toBe(POSE.FIRST_DECISION + DECISION_BEATS);
    expect(STEP_COUNT).toBe(CLOSER_POSE + 1);
    // The three named poses, pinned — everything else in `walk.ts` derives from
    // `FIRST_DECISION`, so moving the walk one pose later is one edit there.
    expect(POSE.HUB).toBe(0);
    expect(POSE.RING).toBe(1);
    expect(POSE.FIRST_DECISION).toBe(2);
    // Six beats, no grouping (§7.1). Pairing the pillars would fit #16's old ~4
    // step budget and cost the one-decision-per-pillar clarity that is the only
    // reason this slide can be an index.
    expect(BEAT_POSES).toEqual([2, 3, 4, 5, 6, 7]);
    expect(CLOSER_POSE).toBe(8);
    expect(STEP_COUNT).toBe(9);
  });
});

// ── the nine poses ───────────────────────────────────────────────────────────

describe("the nine poses build the argument once each", () => {
  test("pose 0 is the hub alone — the six have not arrived", () => {
    renderOrg(gems, POSE.HUB);

    // Mounted but not revealed: the boxes and spokes hold the ring's geometry
    // from the first frame so nothing reflows when they arrive, and opacity is
    // what says "not yet".
    C.pillars.forEach((pillar) => {
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}`).style.opacity,
        pillar.id,
      ).toBe("0");
      expect(
        screen.getByTestId(`shape-spoke-${pillar.id}`).style.opacity,
        pillar.id,
      ).toBe("0");
    });
    // And the column the walk writes into is not up yet either.
    expect(screen.getByTestId("shape-walk-column").style.opacity).toBe("0");
  });

  test("pose 1 brings all six in, inside one mounted tree", () => {
    renderOrg(gems, POSE.HUB);
    goToPose(POSE.RING);

    // Walked rather than re-mounted, so a pose that only works from a fresh
    // mount fails here.
    C.pillars.forEach((pillar) => {
      expect(
        screen.getByTestId(`shape-pillar-${pillar.id}`).style.opacity,
        pillar.id,
      ).toBe("1");
      expect(
        screen.getByTestId(`shape-spoke-${pillar.id}`).style.opacity,
        pillar.id,
      ).toBe("1");
    });
  });

  test("and pose 9 and pose 12 render byte-identically to pose 8", () => {
    // THIS TEST WAS REWRITTEN. It used to compare pose 1 against poses 2 and 9 to
    // prove there was no third pose hiding in a two-step slide — and it is FALSE BY
    // CONSTRUCTION now, because pose 2 IS the first beat. What survives is the
    // question underneath it: does over-shooting the last pose add or remove
    // anything?
    //
    // IT MUST NOT, and the poses past the end are reachable: an export or a deep
    // link can ask for a step index a later edit to `steps` has invalidated, and
    // `showsCloser` is `>=` rather than `===` precisely so the last pose is the one
    // that survives an over-shoot. Asserted by handing the figure a pose THE DECK
    // CANNOT PRODUCE (`steps: 9` clamps at 8), which is why this render goes to the
    // component directly instead of through the harness.
    const eight = render(<PillarOrbit brandLine={gems} pose={CLOSER_POSE} />);
    const atCloser = eight.container.innerHTML;
    eight.unmount();

    for (const over of [CLOSER_POSE + 1, 12]) {
      const beyond = render(<PillarOrbit brandLine={gems} pose={over} />);
      expect(beyond.container.innerHTML, `pose ${over}`).toBe(atCloser);
      beyond.unmount();
    }

    // POSITIVE CONTROL: the comparison is only worth anything because pose 8 is
    // NOT identical to pose 7 — the sixth beat releases and the closer arrives.
    const seven = render(<PillarOrbit brandLine={gems} pose={CLOSER_POSE - 1} />);
    expect(seven.container.innerHTML).not.toBe(atCloser);
    seven.unmount();
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

  test("mounts zero SMIL nodes at every one of the nine poses, under every brand", () => {
    // ZERO BY CONSTRUCTION, and that is the decision this asserts rather than a
    // happy accident. SMIL is invisible to the global reduced-motion rule in
    // `globals.css` — it squashes CSS animations and transitions only — so a SMIL
    // node has to be gated at mount, as E.12 gates its `<animateMotion>`. This
    // slide's whole motion budget is CSS transitions on a pose change, which that
    // rule already handles, so there is nothing to gate. Asserted at EVERY pose
    // (the AC's word) and under every brand, because the cheapest way to break it
    // is to reach for `<animate>` on one spoke at one beat.
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

  test("all nine poses render complete — every string the pose has reached is there", () => {
    // WHAT THIS CAN AND CANNOT SAY. jsdom runs no transition, so "every pose rests
    // on its finished frame" is not checkable here — a computed opacity mid
    // transition is nothing jsdom computes. This test therefore claims only the DOM
    // half: at each pose every element that pose has reached is mounted with its
    // copy. The computed half is checked in a real engine.
    renderOrg(berau, POSE.HUB);

    for (const pose of POSES) {
      goToPose(pose);
      // Standing at all nine.
      expect(screen.getByTestId("shape-kicker").textContent, `pose ${pose}`).toBe(C.kicker);
      expect(screen.getByTestId("shape-hub-label").textContent, `pose ${pose}`).toBe(
        "The Enabler",
      );
      expect(screen.getByTestId("shape-hub-brand-line").textContent, `pose ${pose}`).toBe(
        "MineTech",
      );

      // From the ring onward: six labels, with their copy.
      if (showsPillars(pose)) {
        C.pillars.forEach((pillar) => {
          expect(
            screen.getByTestId(`shape-pillar-${pillar.id}-label`).textContent,
            `pose ${pose} · ${pillar.id}`,
          ).toBe(pillar.label);
        });
      }

      // At a beat: the counter, the pillar's name and its decision, all three.
      const focus = focusedPillarIndex(pose);
      if (focus !== NO_FOCUS) {
        const pillar = C.pillars[focus];
        expect(
          screen.getByTestId(`shape-decision-${pillar.id}-eyebrow`).textContent,
          `pose ${pose} · counter`,
        ).toBe(decisionCounter(focus));
        expect(
          screen.getByTestId(`shape-decision-${pillar.id}-label`).textContent,
          `pose ${pose} · label`,
        ).toBe(pillar.label);
        expect(
          screen.getByTestId(`shape-decision-${pillar.id}-text`).textContent,
          `pose ${pose} · decision`,
        ).toBe(pillar.decision);
      }

      // At the closer's pose: the closer.
      if (showsCloser(pose)) {
        expect(screen.getByTestId("shape-closer").textContent, `pose ${pose}`).toBe(
          C.closer,
        );
      }
    }
  });
});

// ── the copy rules, checked over the copy ────────────────────────────────────

describe("keywords go on prose only", () => {
  /** Labels, never sentences — now including the walk column's eyebrow and the
   *  counter it composes. A copper italic inside any of these reads as a rendering
   *  fault, and inside the counter it would be an emphasis on ARITHMETIC, so none
   *  of them has a `*Kw` sibling to begin with — this holds that they never gain
   *  one by carrying a highlight-shaped string. */
  const LABELS: readonly string[] = [
    C.figLabel,
    C.kicker,
    C.hubLabel,
    C.decisionEyebrow,
    ...C.pillars.map((p) => p.label),
    ...C.pillars.map((_p, i) => decisionCounter(i)),
  ];

  /** The three prose registers, which are the only strings a `*Kw` may touch: the
   *  headline, the six decisions and the closer. */
  const PROSE: readonly { readonly text: string; readonly kw: readonly string[] }[] = [
    { text: C.headline, kw: C.headlineKw },
    ...C.pillars.map((p) => ({ text: p.decision, kw: p.decisionKw })),
    { text: C.closer, kw: C.closerKw },
  ];

  test("no label, kicker, pillar name, eyebrow or counter is rendered through the highlighter", () => {
    // Rendered check, not an authored one: `<em class="kw">` is what a highlight
    // IS on the stage, so this reads the DOM for one inside any of those runs. At a
    // BEAT pose, so the column's own label register is on the stage to be checked.
    renderOrg(gems, POSE.FIRST_DECISION);
    const labelBoxes = [
      "shape-kicker",
      "shape-hub-label",
      "shape-hub-brand-line",
      ...C.pillars.map((p) => `shape-pillar-${p.id}-label`),
      // The eyebrow IS the counter — `decisionCounter(i)` is what it prints — so one
      // element answers for both.
      ...C.pillars.map((p) => `shape-decision-${p.id}-eyebrow`),
      // The pillar's name inside the decision block: the same words the ring's box
      // carries, in 30px serif instead of 11px mono. Repetition is the point; an
      // italic in it would be an emphasis on a fragment of a name.
      ...C.pillars.map((p) => `shape-decision-${p.id}-label`),
    ];
    for (const id of labelBoxes) {
      expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(0);
    }
    // And the labels carry no stray markup of their own.
    LABELS.forEach((label) => expect(label).not.toContain("<em"));
  });

  test("every keyword is a substring of the string it highlights", () => {
    // A keyword that does not occur is a highlight that silently does nothing —
    // the copy still reads, so nothing on the stage says the emphasis was lost.
    // Held over ALL THREE registers: the headline, the six decisions, the closer.
    PROSE.forEach(({ text, kw }) => {
      expect(kw.length, `"${text}" has a keyword`).toBeGreaterThan(0);
      kw.forEach((word) => expect(text, `"${word}"`).toContain(word));
    });
    expect(PROSE).toHaveLength(2 + PILLAR_COUNT);
  });

  test("and each of the three prose registers lands its highlight on the stage", () => {
    renderOrg(gems, POSE.FIRST_DECISION);
    // The headline — this slide's one line of prose at every pose.
    expect(document.querySelectorAll("h1 em").length).toBeGreaterThan(0);
    // The six decisions: ONE PHRASE EACH, on the decision's object rather than on
    // the "You decide" stem, which is the same in all six and would be a highlight
    // on the boilerplate. All six blocks are mounted at every pose, so all six are
    // checkable from one render.
    C.pillars.forEach((pillar) => {
      const ems = [...
        screen.getByTestId(`shape-decision-${pillar.id}-text`).querySelectorAll("em")
      ].map((e) => e.textContent);
      expect(ems.length, pillar.id).toBeGreaterThan(0);
      expect(ems, pillar.id).toEqual([...pillar.decisionKw]);
      expect(pillar.decisionKw, `${pillar.id} · one phrase`).toHaveLength(1);
      expect(pillar.decisionKw[0], `${pillar.id} · not the stem`).not.toContain(
        "You decide",
      );
    });
    // And the closer.
    expect(
      screen.getByTestId("shape-closer").querySelectorAll("em").length,
    ).toBeGreaterThan(0);
  });

  test("no authored string names a section letter", () => {
    // §3.4 R2. This slide is C.1 today and the letter is DERIVED anyway — what the
    // rest of Phase 6 renumbers is every run BEHIND this one, exactly as gh#56's
    // `invest` run just did — so a literal "C.1" or "SECTION C" in this copy would be
    // a letter authored in the one place that must never hold one, and would survive
    // the day the composer disagrees with it. EXTENDED to everything this
    // ticket authored: the six decisions, the closer, the eyebrow and the six
    // generated counters — the counter is the sharpest case, because "01 / 06" is
    // figure-shaped copy that nobody wrote by hand.
    const authored = [
      ...LABELS,
      C.headline,
      C.closer,
      ...C.pillars.map((p) => p.decision),
      ...C.pillars.flatMap((p) => [...p.decisionKw]),
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

  test("and no figure-shaped literal reaches the DOM except the derived one", () => {
    // THE RENDERED HALF of the same rule. `FigLabel` prints one figure reference
    // and it comes from the composed deck through `SlideNumberContext` — the
    // harness's `at` supplies it here. So: strip that one element and nothing of
    // that shape may be left, which is what catches a letter written into a
    // component rather than into the content module.
    //
    // AT THREE POSES NOW, not just the ring: pose 1 has no column, a BEAT pose adds
    // the counter — "THE DECISION · 01 / 06", which is the one string on this slide
    // that could plausibly read as a figure reference — and pose 8 adds the closer.
    // The counter is CHECKED rather than assumed innocent.
    const { container } = renderOrg(gems, POSE.RING);
    expect(
      container.querySelector(".fig-label")?.textContent,
      "the derived reference is there to strip",
    ).toContain(`${AT.letter}.${AT.num}`);

    for (const pose of [POSE.RING, POSE.FIRST_DECISION + 2, CLOSER_POSE]) {
      goToPose(pose);
      // Stripped from a CLONE, not from the live tree: React owns those nodes and
      // removing one behind its back throws on the next commit.
      const stripped = container.cloneNode(true) as HTMLElement;
      stripped.querySelector(".fig-label")?.remove();
      expect(stripped.textContent ?? "", `pose ${pose}`).not.toMatch(/\b[A-N]\.\d+\b/);
      expect(stripped.textContent ?? "", `pose ${pose}`).not.toMatch(
        /\bSECTIONS?\s+[A-N]\b/i,
      );
    }

    // POSITIVE CONTROL on the counter specifically: it IS on the stage at a beat,
    // and it does NOT read as a figure reference.
    goToPose(POSE.FIRST_DECISION);
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
      const shapeRun = deck.slides.filter((s) => s.sectionKey === "shape");
      expect(shapeRun.map((s) => s.def.id), variant).toEqual([
        "shape-agentic-org",
        "f8-your-agentic-os",
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
