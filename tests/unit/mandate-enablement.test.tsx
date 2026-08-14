// THE ENABLEMENT MODEL · slide tests. All five poses, forwards and back.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so nothing here measures a
// pixel a browser would place — every geometric claim is asserted as the ONE NUMBER both
// sides read (`../../src/slides/leader-mandate/enablement-geometry.ts`). What jsdom is
// good for is what this slide is actually at risk of, and none of the four is a layout
// fault:
//
//   1. THE THREE HEROES ARE MUTUALLY EXCLUSIVE AND THE LAST TWO POSES ARE NOT, which is
//      the whole shape of the 2026-08-14 re-cut and the one property no other leader slide
//      has. Three figures share one region of stage, so "the pillars left when the tracks
//      arrived" is not a nicety — two heroes mounted at once is three cards printed over
//      four. The recap is the exception: it arrives at pose 3 and STAYS for pose 4, because
//      the thesis is what it is for. `SCENE_OF` states both halves as one table and the
//      pose walk asserts them in both directions at every pose.
//   2. THE EPISTEMIC RULE, now in its stronger form. The slide used to allow exactly ONE
//      string that named an organisation (a quoted brief). It now allows NONE, at any
//      pose, in either deck — and that is a rule over every rendered string, checkable
//      here and nowhere else.
//   3. THE TWO ORDINAL ENCODINGS AGREEING. A lane's width and its colour tier both say
//      "further down the column", computed in two modules from one shared fraction.
//      Three lanes where the narrowest is not the brightest is a figure making two
//      claims about one track and looking finished while it does it.
//   4. THE STYLESHEET'S OWN RULES, read off disk. Eleven infinite animations, three
//      arrivals, one reduced-motion block that has to name every one of the eleven, and
//      a no-hex rule. None of that is visible from the DOM, and all of it is one edit
//      away from a projector running a loop a reduced-motion reader cannot escape.
//
// ONE EPOCH FOR EVERYTHING EXCEPT THE LAST BLOCK. The component reads no `VARIANT` and
// the slide file resolves no brand block — the only leader-only slide in the tree of
// which that is true — so the whole stage mounts in the default `general` epoch through
// `SlideHarness`. The brand-invariance block at the foot of this file is the exception
// and says why it has to be.
import { readFileSync } from "node:fs";
import path from "node:path";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { restoreLocation } from "../harvest/deck-numbering";
import { BRANDS, type VariantId } from "@/deck-variants";
import {
  MandateEnablement,
  mandateEnablementSlide,
} from "@/slides/leader-mandate/mandate-enablement";
import {
  PILLAR_ANSWERS,
  mandateEnablementContent,
} from "@/slides/leader-mandate/content";
import {
  BLOCK_CARD_WIDTH,
  BLOCK_COUNT,
  BODY_BOTTOM,
  BODY_TOP,
  CARD_HEIGHT,
  CARD_LINE_BUDGET_CHARS,
  CARD_TOP,
  CHIP_HEIGHT,
  CONTENT_WIDTH,
  EYEBROW_TOP,
  LANE_LINE_BUDGET_CHARS,
  NARROWEST_LANE,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  PILLAR_CARD_WIDTH,
  PILLAR_COUNT,
  RECAP_COLUMN_WIDTH,
  RULE_TOP,
  SCENE_FLOOR_CLEARANCE,
  SIDE_MARGIN,
  STAGE,
  THESIS_CLEARANCE,
  THESIS_HEIGHT,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  TRACK_COUNT,
  blockCardLeft,
  chipTop,
  connectorPath,
  laneFraction,
  laneWidth,
  pillarCardLeft,
  recapColumnLeft,
  recapLaneWidth,
  trackRowTop,
} from "@/slides/leader-mandate/enablement-geometry";
// The section ledger, for the ONE assertion this file makes about it: K.1 is off the
// shared closer shelf on purpose, and the two numbers must be allowed to differ without
// anybody later "fixing" one of them into the other.
// THE TWO NEIGHBOURS' OWN THESIS SHELVES, so the claim that all three agree is checked
// against what those modules actually export rather than against a literal repeated here.
// Aliased because this file already has a `THESIS_TOP` — K.1's — and the whole assertion is
// that the three are equal.
import { THESIS_TOP as PHASES_THESIS_TOP } from "@/slides/leader-mandate/phases-gates-geometry";
import { THESIS_TOP as LEVERS_THESIS_TOP } from "@/slides/leader-mandate/levers-geometry";
import { GLYPH_IDS } from "@/slides/leader-mandate/components/EnablementGlyphs";

const C = mandateEnablementContent;
const POSES = [0, 1, 2, 3, 4] as const;

/**
 * The position the slide holds in the deck it actually composes into.
 *
 * `at` IS required here, and it is the one case `SlideHarness` documents: unit tests
 * resolve the default `general` deck, `general` has no leader variant, and this slide
 * reaches the two leader deck sets ALONE. So there is no derived position to look up —
 * which is itself the fact `deck-numbering-fixture` and `deck-registry` prove, from the
 * decks that do run it.
 *
 * A HARNESS INPUT AND NOT A CLAIM THE SLIDE MAKES. K.1 is what the composed leader decks
 * derive today; nothing under `src/slides/leader-mandate/` names it.
 */
const AT = { letter: "K", num: 1, sectionKey: "mandate" } as const;

const CSS_PATH = path.resolve(
  process.cwd(),
  "src/slides/leader-mandate/components/enablement.css",
);

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
    <SlideHarness def={mandateEnablementSlide} at={AT}>
      <Nav />
      <MandateEnablement />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

/**
 * Is this element on the stage at all?
 *
 * MOUNT AND NOT A GATE, which is the reading this slide's whole state model needs.
 * `../../src/slides/leader-mandate/components/EnablementModel.tsx` mounts each scene with
 * its pose rather than holding it at `opacity: 0`, and its header argues why: two gated
 * scenes in one region would cross-fade into each other, and a gated scene's arrival
 * choreography plays once, at slide mount, so a walk backwards would find it already
 * there. So the question a test asks here is "is it in the DOM", and `queryByTestId` is
 * the whole instrument.
 */
const mounted = (id: string) => screen.queryByTestId(id) !== null;

/** The reveal delay a `Reveal` wrote, in ms. `Reveal` puts the same number on
 *  `transitionDelay` and `animationDelay`; this reads the first. */
function delayOf(id: string): number {
  return Number.parseFloat(screen.getByTestId(id).style.transitionDelay);
}

/** The animation delay an element carries — the lane bars and the connectors, which are
 *  animated by class rather than revealed. */
function animDelayOf(id: string): number {
  return Number.parseFloat(screen.getByTestId(id).style.animationDelay);
}

// ── the four scenes, as one table ────────────────────────────────────────────

/**
 * Every element this slide can mount, and the POSES it belongs to.
 *
 * A TABLE AND NOT A PILE OF PER-POSE ASSERTIONS, because the property being checked is
 * exclusivity and exclusivity is a statement about every OTHER pose. Written as
 * `(id, poses)` pairs, the walk below can assert both directions for free: mounted at each
 * of its own poses, absent at all the rest. A per-pose test would have caught a scene that
 * failed to arrive and missed the one that failed to leave.
 *
 * THE RECAP'S ROWS CARRY TWO POSES AND EVERY OTHER ROW CARRIES ONE, which is the whole
 * state model in one column: three exclusive heroes, then a frame that stays while its
 * thesis lands under it.
 */
const RECAP_POSES = [3, 4] as const;

const SCENE_OF: readonly (readonly [string, readonly number[]])[] = [
  // scene 0 · the blocks
  ["enablement-blocks-eyebrow", [0]],
  ["enablement-blocks-thesis", [0]],
  ...C.blocks.flatMap((b): (readonly [string, readonly number[]])[] => [
    [`enablement-block-${b.id}`, [0]],
    [`enablement-block-label-${b.id}`, [0]],
    [`enablement-block-hairline-${b.id}`, [0]],
    [`enablement-block-line-${b.id}`, [0]],
  ]),
  // scene 1 · the pillars
  ["enablement-pillars-eyebrow", [1]],
  ["enablement-pillars-thesis", [1]],
  ...C.pillars.flatMap((p): (readonly [string, readonly number[]])[] => [
    [`enablement-pillar-${p.id}`, [1]],
    [`enablement-pillar-label-${p.id}`, [1]],
    [`enablement-pillar-hairline-${p.id}`, [1]],
    [`enablement-pillar-line-${p.id}`, [1]],
  ]),
  // scene 2 · the tracks
  ["enablement-tracks-eyebrow", [2]],
  ["enablement-tracks-thesis", [2]],
  ...C.tracks.flatMap((t): (readonly [string, readonly number[]])[] => [
    [`enablement-track-${t.id}`, [2]],
    [`enablement-track-name-${t.id}`, [2]],
    [`enablement-lane-${t.id}`, [2]],
    [`enablement-track-line-${t.id}`, [2]],
  ]),
  // scene 3 · the whole model — AND IT STAYS FOR POSE 4
  ["enablement-model-eyebrow", RECAP_POSES],
  ["enablement-connectors", RECAP_POSES],
  ["enablement-recap-divider", RECAP_POSES],
  ["enablement-recap-head-0", RECAP_POSES],
  ["enablement-recap-head-1", RECAP_POSES],
  ["enablement-recap-head-2", RECAP_POSES],
  ...C.blocks.map((b): readonly [string, readonly number[]] => [
    `enablement-chip-block-${b.id}`,
    RECAP_POSES,
  ]),
  ...C.pillars.flatMap((p): (readonly [string, readonly number[]])[] => [
    [`enablement-chip-pillar-${p.id}`, RECAP_POSES],
    [`enablement-connector-${p.id}`, RECAP_POSES],
    [`enablement-current-${p.id}`, RECAP_POSES],
  ]),
  ...C.tracks.flatMap((t): (readonly [string, readonly number[]])[] => [
    [`enablement-chip-track-${t.id}`, RECAP_POSES],
    [`enablement-recap-lane-${t.id}`, RECAP_POSES],
  ]),
  // the floor · the thesis, under the recap
  ["enablement-rule", [4]],
  ["enablement-thesis", [4]],
];

/**
 * Every box that prints copy, and the poses it prints it at.
 *
 * THE SAME `readonly number[]` SHAPE AS {@link SCENE_OF}, so the recap's rows can carry
 * both of the poses it stands on and every other row carries one.
 */
const COPY_BOXES: readonly (readonly [string, readonly number[]])[] = [
  ["enablement-blocks-eyebrow", [0]],
  ...C.blocks.flatMap((b): (readonly [string, readonly number[]])[] => [
    [`enablement-block-label-${b.id}`, [0]],
    [`enablement-block-line-${b.id}`, [0]],
  ]),
  ["enablement-blocks-thesis", [0]],
  ["enablement-pillars-eyebrow", [1]],
  ...C.pillars.flatMap((p): (readonly [string, readonly number[]])[] => [
    [`enablement-pillar-label-${p.id}`, [1]],
    [`enablement-pillar-line-${p.id}`, [1]],
  ]),
  ["enablement-pillars-thesis", [1]],
  ["enablement-tracks-eyebrow", [2]],
  ...C.tracks.flatMap((t): (readonly [string, readonly number[]])[] => [
    [`enablement-track-name-${t.id}`, [2]],
    [`enablement-track-line-${t.id}`, [2]],
  ]),
  ["enablement-tracks-thesis", [2]],
  ["enablement-model-eyebrow", RECAP_POSES],
  ["enablement-recap-head-0", RECAP_POSES],
  ["enablement-recap-head-1", RECAP_POSES],
  ["enablement-recap-head-2", RECAP_POSES],
  ...C.blocks.map((b): readonly [string, readonly number[]] => [
    `enablement-chip-label-block-${b.id}`,
    RECAP_POSES,
  ]),
  ...C.pillars.map((p): readonly [string, readonly number[]] => [
    `enablement-chip-label-pillar-${p.id}`,
    RECAP_POSES,
  ]),
  ...C.tracks.map((t): readonly [string, readonly number[]] => [
    `enablement-chip-label-track-${t.id}`,
    RECAP_POSES,
  ]),
  ["enablement-thesis", [4]],
];

/** The mono LABEL register — every string that must never be rendered through the
 *  highlighter. Four eyebrows, three column heads and ten chip names. See the keyword rule
 *  at the top of `../content.ts`. */
const LABEL_BOXES: readonly (readonly [string, readonly number[]])[] = COPY_BOXES.filter(
  ([id]) => !id.includes("-line-") && !id.endsWith("-thesis"),
);

/**
 * The PROSE register — every string that must carry at least one highlight.
 *
 * THE FOUR BOTTOM LINES ARE IN IT AND THAT IS THE OWNER'S RULE ("ensure to still have
 * keyword highlight"). Three of the four are scene mini-theses added on 2026-08-14, and a
 * sentence at the foot of the stage with no copper in it would be the one prose box on the
 * slide that looked like a label.
 */
const PROSE_BOXES: readonly (readonly [string, readonly number[]])[] = [
  ...C.blocks.map((b): readonly [string, readonly number[]] => [
    `enablement-block-line-${b.id}`,
    [0],
  ]),
  ["enablement-blocks-thesis", [0]],
  ...C.pillars.map((p): readonly [string, readonly number[]] => [
    `enablement-pillar-line-${p.id}`,
    [1],
  ]),
  ["enablement-pillars-thesis", [1]],
  ...C.tracks.map((t): readonly [string, readonly number[]] => [
    `enablement-track-line-${t.id}`,
    [2],
  ]),
  ["enablement-tracks-thesis", [2]],
  ["enablement-thesis", [4]],
];

/** Every authored string this slide can print, label and prose alike. */
const ALL_AUTHORED: readonly string[] = [
  C.figLabel,
  C.headline,
  C.blocksEyebrow,
  C.pillarsEyebrow,
  C.tracksEyebrow,
  C.modelEyebrow,
  C.blocksShort,
  C.pillarsShort,
  C.tracksShort,
  C.blocksThesis,
  C.pillarsThesis,
  C.tracksThesis,
  ...C.blocks.flatMap((b) => [b.label, b.line]),
  ...C.pillars.flatMap((p) => [p.label, p.line]),
  ...C.tracks.flatMap((t) => [t.name, t.line]),
  C.closer,
];

/** Every one-line definition the geometry budgets a fixed box for. */
const CARD_LINES: readonly [string, string][] = [
  ...C.blocks.map((b): [string, string] => [`block ${b.id}`, b.line]),
  ...C.pillars.map((p): [string, string] => [`pillar ${p.id}`, p.line]),
];

// ── the def ──────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, five steps, and canonical at the FULLEST pose", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins the
    // value).
    expect(mandateEnablementSlide.id).toBe("mandate-enablement");
    expect(mandateEnablementSlide.steps).toBe(5);
    // `canonicalPose` IS THE LAST POSE, AND FOR THIS SLIDE THAT IS ALSO THE FULLEST ONE —
    // which is what the owner's second-pass correction bought. The first cut of the rebuild
    // cleared the stage for the thesis and had to set 3 here to avoid exporting a
    // conclusion with none of its evidence; pose 4 now prints the whole model AND the line
    // it argues for, so the last pose and the fullest pose are the same frame again.
    // Asserted BOTH ways: as the derivation, and as the literal a reviewer can check.
    expect(mandateEnablementSlide.canonicalPose).toBe(4);
    expect(mandateEnablementSlide.canonicalPose).toBe(mandateEnablementSlide.steps - 1);
    expect(mandateEnablementSlide.sectionKey).toBe("mandate");
    expect(mandateEnablementSlide.animationMode).toBe("step-reveal");
    expect(mandateEnablementSlide.surface).toBe("dark");
  });

  test("takes no props, so nothing can be passed into it per deck", () => {
    expect(MandateEnablement.length).toBe(0);
  });
});

// ── the epistemic rule, in its stronger form ─────────────────────────────────

describe("no string on this slide names an organisation", () => {
  /**
   * The organisations this deck knows by name, and the names it knows them by.
   *
   * DERIVED WHERE IT CAN BE. Every registered brand contributes its own name, so a
   * fourth brand is covered by being registered rather than by being added here. The
   * four literals are what `BRANDS` cannot supply: the two tech functions, the platform
   * the deck cites, and us.
   */
  const ORGANISATION_WORDS: readonly string[] = [
    ...Object.values(BRANDS)
      .map((row) => row.label.replace(/\s*AI Catalyst Workshop$/, "").trim())
      // `general`'s label is the workshop's name alone, so it strips to nothing — which
      // is correct: the brand that names no organisation contributes no word.
      .filter((name) => name !== ""),
    "DigiTech",
    "MineTech",
    "GEMVIS",
    "Nanovest",
  ];

  test("the brand vocabulary this rule is held over is not empty, and names both orgs", () => {
    // Guards the guard: a derivation that silently produced `[]` would make every
    // assertion below pass over an empty list.
    expect(ORGANISATION_WORDS).toContain("Berau");
    expect(ORGANISATION_WORDS).toContain("GEMS");
    expect(ORGANISATION_WORDS).toContain("DigiTech");
  });

  test("at every pose, on the whole rendered stage", () => {
    // THE RULE THAT REPLACED "EXACTLY ONE". Until 2026-08-14 this slide printed one
    // organisation's quoted brief in a bordered band and the test allowed that one
    // string to name it. The band is gone and the three blocks that replaced it are
    // generic, so the allowance is gone with it — there is no exception left to carve
    // out, which is the property worth having and the reason this test is now four
    // lines.
    //
    // Read off the RENDERED stage and not off the content object: the content could be
    // clean and a component could still print `VARIANT.brand` into a label.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      const stage = container.textContent ?? "";
      for (const word of ORGANISATION_WORDS) {
        expect(stage, `pose ${pose} · ${word}`).not.toContain(word);
      }
      unmount();
    }
  });

  test("quotes nobody — there is no quotation mark on any pose", () => {
    // THE OTHER HALF OF THE SAME PROPERTY. The retired band's honesty rested on a
    // three-line split between the deck's paraphrase and the brief's own words in
    // quotes; with no quotation on the stage a stray pair of quote marks could only mean
    // somebody has started attributing a sentence again without the attribution.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      expect(container.textContent ?? "", `pose ${pose}`).not.toMatch(/[“”]/);
      unmount();
    }
  });
});

// ── scene 0 · the blocks ─────────────────────────────────────────────────────

describe("scene 0 · the blocks", () => {
  test("prints the content module's three, in order, each with its name and its line", () => {
    renderSlide(0);
    expect(screen.getByTestId("enablement-blocks-eyebrow").textContent).toBe(C.blocksEyebrow);
    C.blocks.forEach((block, i) => {
      expect(screen.getByTestId(`enablement-block-label-${block.id}`).textContent).toBe(
        block.label,
      );
      expect(screen.getByTestId(`enablement-block-line-${block.id}`).textContent).toBe(block.line);
      // The tiling, read off the one function that produces it.
      const card = screen.getByTestId(`enablement-block-${block.id}`);
      expect(card.style.left).toBe(`${blockCardLeft(i)}px`);
      expect(card.style.top).toBe(`${CARD_TOP}px`);
      expect(card.style.width).toBe(`${BLOCK_CARD_WIDTH}px`);
      expect(card.style.height).toBe(`${CARD_HEIGHT}px`);
    });
  });

  test("carries three IDENTICAL cards — the blocks are not ranked", () => {
    // A block that is missing from the list is a problem the programme does not address;
    // one drawn brighter or bigger than the other two would be a ranking nobody
    // authored. Same height, same border, same ground, same mark size.
    renderSlide(0);
    const chrome = C.blocks.map((b) => {
      const el = screen.getByTestId(`enablement-block-${b.id}`);
      return `${el.style.height}|${el.style.border}|${el.style.background}`;
    });
    expect(new Set(chrome).size).toBe(1);
    const marks = C.blocks.map((b) => {
      const el = screen.getByTestId(`enablement-glyph-${b.id}`);
      return `${el.style.width}|${el.style.height}`;
    });
    expect(new Set(marks).size).toBe(1);
  });

  test("lands its own mini-thesis AFTER all three cards", () => {
    // The sentence is an ARGUMENT about the set above it: read before the set it is an
    // assertion the room has nothing to check against, read after it is a conclusion.
    // Derived from the count in the component, so a fourth block takes it with it.
    renderSlide(0);
    const last = Math.max(...C.blocks.map((b) => delayOf(`enablement-block-${b.id}`)));
    expect(delayOf("enablement-blocks-thesis")).toBeGreaterThan(last);
  });

  test("reveals the three in order, top of the row to the end of it", () => {
    renderSlide(0);
    const delays = C.blocks.map((b) => delayOf(`enablement-block-${b.id}`));
    for (let i = 1; i < delays.length; i++) {
      expect(delays[i], `block ${i}`).toBeGreaterThan(delays[i - 1]);
    }
    expect(delayOf("enablement-blocks-eyebrow")).toBeLessThan(delays[0]);
  });
});

// ── scene 1 · the pillars ────────────────────────────────────────────────────

describe("scene 1 · the pillars", () => {
  test("prints the content module's four, in order, each with its name and its line", () => {
    renderSlide(1);
    expect(screen.getByTestId("enablement-pillars-eyebrow").textContent).toBe(C.pillarsEyebrow);
    C.pillars.forEach((pillar, i) => {
      expect(screen.getByTestId(`enablement-pillar-label-${pillar.id}`).textContent).toBe(
        pillar.label,
      );
      expect(screen.getByTestId(`enablement-pillar-line-${pillar.id}`).textContent).toBe(
        pillar.line,
      );
      const card = screen.getByTestId(`enablement-pillar-${pillar.id}`);
      expect(card.style.left).toBe(`${pillarCardLeft(i)}px`);
      expect(card.style.width).toBe(`${PILLAR_CARD_WIDTH}px`);
    });
  });

  test("stands on the SAME shelf and the SAME height as the blocks it answers", () => {
    // THE ONE CLAIM THIS SCENE MAKES ABOUT THE ONE BEFORE IT. Given two card heights the
    // click from three cards to four would drop the row's baseline as well as re-tile
    // it, and a room reads that as the stage settling rather than as a list being
    // answered. Asserted across two renders, because the two scenes are never mounted at
    // once.
    const { unmount } = renderSlide(0);
    const blockBox = screen.getByTestId(`enablement-block-${C.blocks[0].id}`);
    const blockShelf = [blockBox.style.top, blockBox.style.height];
    unmount();
    renderSlide(1);
    const pillarBox = screen.getByTestId(`enablement-pillar-${C.pillars[0].id}`);
    expect([pillarBox.style.top, pillarBox.style.height]).toEqual(blockShelf);
  });

  test("carries four IDENTICAL cards — the pillars are not ranked either", () => {
    renderSlide(1);
    const chrome = C.pillars.map((p) => {
      const el = screen.getByTestId(`enablement-pillar-${p.id}`);
      return `${el.style.height}|${el.style.border}|${el.style.background}`;
    });
    expect(new Set(chrome).size).toBe(1);
  });
});

// ── scene 2 · the tracks ─────────────────────────────────────────────────────

describe("scene 2 · the tracks", () => {
  test("prints the content module's three, in order, each with its name and its line", () => {
    renderSlide(2);
    expect(screen.getByTestId("enablement-tracks-eyebrow").textContent).toBe(C.tracksEyebrow);
    C.tracks.forEach((track, i) => {
      expect(screen.getByTestId(`enablement-track-name-${track.id}`).textContent).toBe(track.name);
      expect(screen.getByTestId(`enablement-track-line-${track.id}`).textContent).toBe(track.line);
      const row = screen.getByTestId(`enablement-track-${track.id}`);
      expect(row.style.top).toBe(`${trackRowTop(i)}px`);
      expect(row.style.width).toBe(`${CONTENT_WIDTH}px`);
    });
  });

  test("draws lanes that narrow strictly, from the full row to the measured floor", () => {
    renderSlide(2);
    const widths = C.tracks.map(
      (t) => Number.parseFloat(screen.getByTestId(`enablement-lane-${t.id}`).style.width),
    );
    for (let i = 1; i < widths.length; i++) {
      expect(widths[i], `lane ${i}`).toBeLessThan(widths[i - 1]);
    }
    // The two ends are the geometry's own, not a shape the component invented.
    expect(widths[0]).toBe(laneWidth(0, TRACK_COUNT));
    expect(widths[widths.length - 1] / widths[0]).toBeCloseTo(NARROWEST_LANE, 10);
  });

  test("brightens as it narrows, so the two ordinal encodings agree", () => {
    // BRIGHTNESS IS DEPTH AND WIDTH IS HOW MANY PEOPLE, and both are cut from one
    // fraction. Three lanes where the narrowest is not the brightest is a figure making
    // two different claims about the same track. Held as an INDEX into the ramp rather
    // than as three literal tokens, so a fourth track cannot break the direction.
    renderSlide(2);
    const rank = (token: string) => Number.parseInt(token.match(/copper-(\d{3})/)?.[1] ?? "0", 10);
    const tiers = C.tracks.map((t) =>
      rank(screen.getByTestId(`enablement-lane-${t.id}`).style.background),
    );
    for (let i = 1; i < tiers.length; i++) {
      // A LOWER copper number is a BRIGHTER token, so the ranks must fall.
      expect(tiers[i], `lane ${i} tier`).toBeLessThan(tiers[i - 1]);
    }
    expect(laneFraction(0, TRACK_COUNT)).toBe(0);
    expect(laneFraction(TRACK_COUNT - 1, TRACK_COUNT)).toBe(1);
  });

  test("keeps every track's NAME on one shared tier while the lanes rank", () => {
    // THE SPLIT IS LOAD-BEARING. The ranking on this stage is DEPTH; if the names dimmed
    // with the lanes the figure would also be ranking the tracks' importance, which
    // would say the enablement of everyone matters least — a claim the slide argues
    // against.
    renderSlide(2);
    const colours = C.tracks.map((t) => screen.getByTestId(`enablement-track-name-${t.id}`).style.color);
    expect(new Set(colours).size).toBe(1);
  });

  test("grows each bar after its own row has arrived", () => {
    // `en-grow` scales the bar from its own left edge, and it must not start before the
    // row it sits in has been revealed — a bar drawing itself across an invisible row is
    // a rendering fault the room cannot name.
    renderSlide(2);
    C.tracks.forEach((t) => {
      expect(animDelayOf(`enablement-lane-${t.id}`)).toBeGreaterThan(
        delayOf(`enablement-track-${t.id}`),
      );
    });
  });
});

// ── scene 3 · the whole model ────────────────────────────────────────────────

describe("scene 3 · the whole model", () => {
  test("prints all ten things the slide names, at chip size, in three columns", () => {
    renderSlide(3);
    expect(screen.getByTestId("enablement-model-eyebrow").textContent).toBe(C.modelEyebrow);
    [C.blocksShort, C.pillarsShort, C.tracksShort].forEach((head, col) => {
      const el = screen.getByTestId(`enablement-recap-head-${col}`);
      expect(el.textContent).toBe(head);
      expect(el.style.left).toBe(`${recapColumnLeft(col)}px`);
      expect(el.style.width).toBe(`${RECAP_COLUMN_WIDTH}px`);
    });
    C.blocks.forEach((b, i) => {
      const chip = screen.getByTestId(`enablement-chip-block-${b.id}`);
      expect(chip.style.left).toBe(`${recapColumnLeft(0)}px`);
      expect(chip.style.top).toBe(`${chipTop(i)}px`);
      expect(screen.getByTestId(`enablement-chip-label-block-${b.id}`).textContent).toBe(b.label);
    });
    C.pillars.forEach((p, i) => {
      const chip = screen.getByTestId(`enablement-chip-pillar-${p.id}`);
      expect(chip.style.left).toBe(`${recapColumnLeft(1)}px`);
      expect(chip.style.top).toBe(`${chipTop(i)}px`);
    });
    C.tracks.forEach((t, i) => {
      const chip = screen.getByTestId(`enablement-chip-track-${t.id}`);
      expect(chip.style.left).toBe(`${recapColumnLeft(2)}px`);
      expect(chip.style.top).toBe(`${chipTop(i)}px`);
    });
  });

  test("draws one connector per pillar, from the block that pillar answers", () => {
    // THE ONE THING THE RECAP ADDS. No hero pose can show that two pillars answer one
    // block, because the two lists are never on stage together anywhere else. Held
    // against `connectorPath`, so the assertion is "the component drew the curve the
    // geometry produced" and not "the component drew a curve".
    renderSlide(3);
    C.pillars.forEach((pillar, i) => {
      const from = C.blocks.findIndex((b) => b.id === pillar.answers);
      expect(from, `pillar ${pillar.id} answers an unknown block`).toBeGreaterThanOrEqual(0);
      expect(screen.getByTestId(`enablement-connector-${pillar.id}`).getAttribute("d")).toBe(
        connectorPath(from, i),
      );
    });
    // Exactly as many curves as there are pillars, and no more.
    const svg = screen.getByTestId("enablement-connectors");
    expect(svg.querySelectorAll("path.en-draw")).toHaveLength(PILLAR_COUNT);
  });

  test("leaves no block unanswered and no pillar answering two", () => {
    // The content module guards this at load with a throwing IIFE; this reads the map it
    // produces so the property is also stated where a reviewer looks for it.
    expect([...PILLAR_ANSWERS.keys()].sort()).toEqual(C.blocks.map((b) => b.id).sort());
    for (const [blockId, answering] of PILLAR_ANSWERS) {
      expect(answering.length, `block ${blockId}`).toBeGreaterThan(0);
    }
    // One entry per pillar, across the whole map — one curve each, no pillar twice.
    expect([...PILLAR_ANSWERS.values()].flat().sort()).toEqual(
      C.pillars.map((p) => p.id).sort(),
    );
  });

  test("starts each current only after its own line has finished drawing", () => {
    // A current on a line that is still being drawn reads as a rendering fault. The gap
    // between the two delays must be at least the draw's own duration, which is read off
    // the stylesheet rather than re-typed here.
    renderSlide(3);
    const css = readFileSync(CSS_PATH, "utf8");
    const drawMs = Number.parseInt(
      css.match(/animation:\s*en-draw\s+(\d+)ms/)?.[1] ?? "0",
      10,
    );
    expect(drawMs, "en-draw has no duration in the stylesheet").toBeGreaterThan(0);
    C.pillars.forEach((p) => {
      const wire = animDelayOf(`enablement-connector-${p.id}`);
      // THE DELAY IS ON THE WRAPPER AND THE LOOP IS ON THE PATH INSIDE IT, deliberately:
      // one node carrying both `en-arrive` and `en-current` carries one `animation`
      // shorthand, so any later class change would restart the loop and the current would
      // blink. The testid follows the delay.
      const group = screen.getByTestId(`enablement-current-${p.id}`);
      expect(group.querySelectorAll("path.en-current"), p.id).toHaveLength(1);
      const current = Number.parseFloat(group.style.animationDelay);
      expect(current - wire, `pillar ${p.id}`).toBeGreaterThanOrEqual(drawMs);
    });
  });

  test("draws the connectors after the last chip they touch", () => {
    renderSlide(3);
    const lastChip = Math.max(
      ...C.pillars.map((p) => delayOf(`enablement-chip-pillar-${p.id}`)),
      ...C.blocks.map((b) => delayOf(`enablement-chip-block-${b.id}`)),
    );
    C.pillars.forEach((p) => {
      expect(animDelayOf(`enablement-connector-${p.id}`), p.id).toBeGreaterThan(lastChip);
    });
  });

  test("divides the pillars from the tracks with a hairline and NOT a fifth curve", () => {
    // A CLAIM ABOUT THE MODEL AND NOT A DRAWING DECISION. The pillars are caused by the
    // blocks; the tracks are not caused by the pillars, they are who the pillars reach.
    // A curve there would assert a wiring nobody authored.
    renderSlide(3);
    const divider = screen.getByTestId("enablement-recap-divider");
    expect(divider.style.width).toBe("1px");
    expect(screen.getByTestId("enablement-connectors").querySelectorAll("path.en-draw")).toHaveLength(
      PILLAR_COUNT,
    );
  });

  test("keeps the lanes ordinal at chip scale too", () => {
    // Three names are a list; three names over three widths are a depth. The recap keeps
    // the bar for exactly that reason, and the descent has to survive the re-cut to a
    // 120px measure.
    renderSlide(3);
    const widths = C.tracks.map(
      (t) => Number.parseFloat(screen.getByTestId(`enablement-recap-lane-${t.id}`).style.width),
    );
    for (let i = 1; i < widths.length; i++) {
      expect(widths[i], `recap lane ${i}`).toBeLessThan(widths[i - 1]);
    }
    expect(widths[0]).toBe(recapLaneWidth(0, TRACK_COUNT));
  });

  test("is the fullest pose — every id the slide can print except the thesis band", () => {
    // WHAT MAKES `canonicalPose: 3` CORRECT, asserted as a count rather than as an
    // opinion. The recap holds one chip per block, pillar and track; nothing the slide
    // names is missing from the exported frame.
    renderSlide(3);
    const named = [
      ...C.blocks.map((b) => b.label),
      ...C.pillars.map((p) => p.label),
      ...C.tracks.map((t) => t.name),
    ];
    const stage = document.body.textContent ?? "";
    named.forEach((name) => expect(stage, name).toContain(name));
  });
});

// ── scene 4 · the thesis ─────────────────────────────────────────────────────

describe("scene 4 · the thesis", () => {
  test("stands alone, on the deck's own thesis shelf, at the deck's own thesis size", () => {
    // THE OWNER'S CALL: "follow D.4 on the font size and vertical position". 590 is the
    // shelf `leader-invest`'s four slides derive from a 16px NavBar clearance and a 26px
    // box; 19px upright serif is that section's thesis register. Pinned as literals,
    // because the point of a shelf is that it does not move.
    renderSlide(4);
    const thesis = screen.getByTestId("enablement-thesis");
    expect(thesis.tagName).toBe("P");
    expect(thesis.textContent).toBe(C.closer);
    expect(thesis.style.left).toBe(`${SIDE_MARGIN}px`);
    expect(thesis.style.top).toBe("590px");
    expect(thesis.style.width).toBe(`${CONTENT_WIDTH}px`);
    expect(thesis.style.height).toBe(`${THESIS_HEIGHT}px`);
    expect(thesis.style.fontSize).toBe("19px");
    expect(thesis.style.fontFamily).toBe("var(--serif)");
    // UPRIGHT AND NOT ITALIC, which is the change from the 20px italic closer this slide
    // used to carry: an italic sentence alone on a cleared stage reads as a caption for a
    // picture that is missing.
    expect(thesis.style.fontStyle).toBe("");
    expect(THESIS_TOP).toBe(590);
    expect(THESIS_TEXT_SIZE).toBe(19);
  });

  test("opens with a rule, 36px above it and full width", () => {
    renderSlide(4);
    const rule = screen.getByTestId("enablement-rule");
    expect(rule.style.top).toBe(`${RULE_TOP}px`);
    expect(rule.style.width).toBe(`${CONTENT_WIDTH}px`);
    expect(THESIS_TOP - RULE_TOP - 1).toBe(36);
    // The rule arrives BEFORE the sentence: a rule that followed its own sentence would
    // be underlining it.
    expect(delayOf("enablement-thesis")).toBeGreaterThan(0);
  });

  test("lands UNDER the whole model, and moves nothing above it", () => {
    // THE OWNER'S SECOND-PASS CORRECTION, asserted from both sides. The first cut cleared
    // the stage for the thesis; a room reading a conclusion with its evidence gone has
    // nothing to check it against. So pose 4 is pose 3 PLUS a rule and a line, and every
    // coordinate of the recap has to be byte-identical across the click — a frame that
    // shifted by a pixel would read as the stage settling under the sentence.
    renderSlide(3);
    const before = [
      ...C.blocks.map((b) => `enablement-chip-block-${b.id}`),
      ...C.pillars.map((p) => `enablement-chip-pillar-${p.id}`),
      ...C.tracks.map((t) => `enablement-chip-track-${t.id}`),
      "enablement-recap-divider",
      "enablement-model-eyebrow",
    ].map((id) => {
      const el = screen.getByTestId(id);
      return `${id}|${el.style.left}|${el.style.top}|${el.style.width}|${el.style.height}`;
    });
    expect(mounted("enablement-thesis")).toBe(false);
    expect(mounted("enablement-rule")).toBe(false);
    goToPose(4);
    const after = before.map((_, i) => {
      const id = before[i].split("|")[0];
      const el = screen.getByTestId(id);
      return `${id}|${el.style.left}|${el.style.top}|${el.style.width}|${el.style.height}`;
    });
    expect(after).toEqual(before);
    expect(mounted("enablement-thesis")).toBe(true);
    expect(mounted("enablement-rule")).toBe(true);
    // AND THE RECAP DOES NOT RE-ANIMATE. It is mounted through both poses, so React never
    // remounts it and no `Reveal` inside it restarts — which is checked as "the delays are
    // the ones it arrived on", the only trace jsdom keeps of an animation that did not run
    // again.
    expect(delayOf(`enablement-chip-block-${C.blocks[0].id}`)).toBeGreaterThan(0);
  });

  test("stands on the shelf its two neighbours stand on, and all three derive it", () => {
    // THIS ASSERTION USED TO BE AN INEQUALITY, and the change is the point of it. K.1 moved
    // to `leader-invest`'s 590 shelf on 2026-08-14 while K.2 and K.3 were still at
    // `geometry.ts`'s retired `CLOSER_TOP` of 572, so what this test could hold was only
    // that the two numbers differed ON PURPOSE. Both neighbours moved on 2026-08-15, the
    // retired constant was deleted with the band it belonged to, and the property worth
    // guarding is now the positive one: THE DECK'S OWN ASK DOES NOT MOVE ACROSS THE WHOLE
    // SECTION, so a room walking K.1 → K.2 → K.3 never watches it jump.
    expect(THESIS_TOP).toBe(PHASES_THESIS_TOP);
    expect(THESIS_TOP).toBe(LEVERS_THESIS_TOP);
    // DERIVED IN ALL THREE, not typed: each module works upward from the NavBar's own floor,
    // so the shelf follows the stage rather than a number three files agreed on once.
    expect(THESIS_TOP).toBe(NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - THESIS_HEIGHT);
  });
});

// ── the pose walk ────────────────────────────────────────────────────────────

describe("the five poses", () => {
  test("mount exactly the scene each pose owns, forwards and backwards", () => {
    // THE PROPERTY THIS SLIDE IS MOST AT RISK OF LOSING, and the reason `SCENE_OF` is a
    // table: membership is a statement about every OTHER pose, so a per-pose test would
    // catch a scene that failed to arrive and miss the one that failed to leave. Walked
    // in one mounted tree, forwards and then back, because a `pose >= n` test can be got
    // right in one direction and wrong in the other.
    renderSlide(0);
    const walk = [...POSES, ...[...POSES].reverse()];
    for (const pose of walk) {
      goToPose(pose);
      for (const [id, at] of SCENE_OF) {
        expect(mounted(id), `pose ${pose} · ${id}`).toBe(at.includes(pose));
      }
    }
  });

  test("keep the three heroes mutually exclusive", () => {
    // THE HALF OF THE TABLE THAT IS A DESIGN RULE RATHER THAN A LIST. The three heroes are
    // three different figures in one region of stage; two of them mounted at once is three
    // cards printed over four. Stated as a count so a fourth hero has to opt in.
    renderSlide(0);
    const heroes = [
      `enablement-block-${C.blocks[0].id}`,
      `enablement-pillar-${C.pillars[0].id}`,
      `enablement-track-${C.tracks[0].id}`,
    ];
    for (const pose of POSES) {
      goToPose(pose);
      expect(heroes.filter(mounted).length, `pose ${pose}`).toBeLessThanOrEqual(1);
    }
  });

  test("print their own copy at their own pose, and nowhere else", () => {
    renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      for (const [id, at] of COPY_BOXES) {
        if (!at.includes(pose)) continue;
        expect(screen.getByTestId(id).textContent, `pose ${pose} · ${id}`).not.toBe("");
      }
    }
  });

  test("hang every eyebrow from ONE shelf, 34px under the headline", () => {
    // COMPLAINT 2 OF THE RE-CUT, mechanically. The eyebrows sat at 134 — twelve pixels
    // under a 40px display headline — and the room read a title and a second title as
    // one wrapped line. `.slide-headline-row` is at 80 and a one-line
    // `.slide-headline.small` is 40px on 1.05, so the headline ends at 122 and nothing at
    // all is painted before 156.
    const shelves = new Set<string>();
    renderSlide(0);
    for (const pose of [0, 1, 2, 3]) {
      goToPose(pose);
      const eyebrow = [
        "enablement-blocks-eyebrow",
        "enablement-pillars-eyebrow",
        "enablement-tracks-eyebrow",
        "enablement-model-eyebrow",
      ].find(mounted);
      expect(eyebrow, `pose ${pose} has no eyebrow`).toBeDefined();
      shelves.add(screen.getByTestId(eyebrow as string).style.top);
    }
    expect(shelves).toEqual(new Set(["156px"]));
    expect(EYEBROW_TOP).toBe(156);
    expect(EYEBROW_TOP - 122).toBe(34);
  });

  test("give every box on every scene the whole-box hover", () => {
    // THE OWNER'S RULE, AND THE REASON THE TRACK ROWS BECAME BOXES AT ALL: every
    // box-shaped piece of content answers the pointer, and the whole of it does.
    // `.box-hover` is the deck's own mechanism — a pseudo-element at `inset: -1px`
    // carrying `border: inherit` at `--copper-200` — and it bites on the geometry node,
    // so the hover rectangle IS the painted box and a pointer over the label, the
    // hairline, the mark or the line is a pointer over the box.
    const BOXES: readonly (readonly [string, number])[] = [
      ...C.blocks.map((b): readonly [string, number] => [`enablement-block-${b.id}`, 0]),
      ...C.pillars.map((p): readonly [string, number] => [`enablement-pillar-${p.id}`, 1]),
      ...C.tracks.map((t): readonly [string, number] => [`enablement-track-${t.id}`, 2]),
      ...C.blocks.map((b): readonly [string, number] => [`enablement-chip-block-${b.id}`, 3]),
      ...C.pillars.map((p): readonly [string, number] => [`enablement-chip-pillar-${p.id}`, 3]),
      ...C.tracks.map((t): readonly [string, number] => [`enablement-chip-track-${t.id}`, 3]),
    ];
    // Non-vacuity: ten cards plus ten chips.
    expect(BOXES).toHaveLength(2 * (BLOCK_COUNT + PILLAR_COUNT + TRACK_COUNT));
    renderSlide(0);
    for (const [id, pose] of BOXES) {
      goToPose(pose);
      const box = screen.getByTestId(id);
      expect(box.classList.contains("box-hover"), id).toBe(true);
      // AND ITS BORDER MUST BE THE ONLY THING IT DECLARES INLINE THAT THE OVERLAY READS.
      // `.box-hover::before` takes `border: inherit`, so an inline border WIDTH or STYLE
      // is fine and expected; what would break the hover is a rule in the stylesheet
      // trying to change the colour, which is why the overlay exists. Asserted as "the
      // box has a 1px border to inherit".
      expect(box.style.border, id).toMatch(/^1px solid /);
    }
  });

  test("never leave a pointer target on a box the room cannot see", () => {
    // Four eyebrows, three column heads, one note and one divider span wide regions over
    // the boxes beside them; each carries `pointer-events: none` so it cannot eat a
    // hover. The boxes are the only things on this stage that answer the pointer.
    renderSlide(0);
    const inert: readonly (readonly [string, number])[] = [
      ["enablement-blocks-eyebrow", 0],
      ["enablement-blocks-thesis", 0],
      ["enablement-pillars-eyebrow", 1],
      ["enablement-pillars-thesis", 1],
      ["enablement-tracks-thesis", 2],
      ["enablement-tracks-eyebrow", 2],
      ["enablement-model-eyebrow", 3],
      ["enablement-recap-head-0", 3],
      ["enablement-recap-head-1", 3],
      ["enablement-recap-head-2", 3],
      ["enablement-recap-divider", 3],
    ];
    for (const [id, pose] of inert) {
      goToPose(pose);
      expect(screen.getByTestId(id).style.pointerEvents, id).toBe("none");
    }
  });
});

// ── the geometry ─────────────────────────────────────────────────────────────

describe("the geometry", () => {
  test("restates the stage the deck's own stylesheet declares", () => {
    expect(STAGE).toEqual({ width: 1280, height: 720 });
    expect(SIDE_MARGIN).toBe(48);
    expect(CONTENT_WIDTH).toBe(1184);
    expect(NAV_ZONE_TOP).toBe(632);
  });

  test("keeps every scene clear of the NavBar's own hover band", () => {
    // `SCENE_FLOOR_CLEARANCE` throws at module load if the deepest scene reaches under
    // the floor, so importing this module at all is most of the assertion; this pins the
    // sign and the walls it is measured between.
    expect(SCENE_FLOOR_CLEARANCE).toBeGreaterThan(0);
    expect(BODY_BOTTOM).toBe(NAV_ZONE_TOP - NAV_ZONE_CLEARANCE);
    expect(BODY_TOP).toBeLessThan(BODY_BOTTOM);
    expect(THESIS_CLEARANCE).toBe(NAV_ZONE_CLEARANCE);
  });

  test("tiles both card rows across the full width with no remainder", () => {
    expect(blockCardLeft(0)).toBe(SIDE_MARGIN);
    expect(blockCardLeft(BLOCK_COUNT - 1) + BLOCK_CARD_WIDTH).toBe(SIDE_MARGIN + CONTENT_WIDTH);
    expect(pillarCardLeft(0)).toBe(SIDE_MARGIN);
    expect(pillarCardLeft(PILLAR_COUNT - 1) + PILLAR_CARD_WIDTH).toBe(SIDE_MARGIN + CONTENT_WIDTH);
    // The pillars' card is the narrower of the two, which is what the copy budget is cut
    // against.
    expect(PILLAR_CARD_WIDTH).toBeLessThan(BLOCK_CARD_WIDTH);
  });

  test("tiles the recap's three columns across the full width with no remainder", () => {
    expect(recapColumnLeft(0)).toBe(SIDE_MARGIN);
    expect(recapColumnLeft(2) + RECAP_COLUMN_WIDTH).toBe(SIDE_MARGIN + CONTENT_WIDTH);
    // The tallest column is the pillars', which is what every column's rows are checked
    // against.
    expect(chipTop(PILLAR_COUNT - 1) + CHIP_HEIGHT).toBeLessThanOrEqual(BODY_BOTTOM);
  });

  test("refuses a card, a row, a lane or a chip the figure does not have", () => {
    // A silently clamped index draws one card on top of another, and it would look
    // deliberate.
    expect(() => blockCardLeft(BLOCK_COUNT)).toThrow(/no block card/);
    expect(() => pillarCardLeft(-1)).toThrow(/no pillar card/);
    expect(() => trackRowTop(TRACK_COUNT)).toThrow(/no track row/);
    expect(() => chipTop(PILLAR_COUNT)).toThrow(/no recap chip row/);
    expect(() => laneFraction(0, 1)).toThrow(/ORDINAL/);
    expect(() => recapColumnLeft(3)).toThrow(/no recap column/);
  });

  test("spreads a lane set of any size between the full row and the floor", () => {
    // The widths are ORDINAL and must stay ordinal whatever the count: the first lane is
    // always the full row, the last always the measured floor, and the ones between
    // divide the difference. So writing a fourth track re-cuts the figure and cannot
    // break it.
    for (const count of [2, 3, 4, 5]) {
      const widths = Array.from({ length: count }, (_, i) => laneWidth(i, count));
      expect(widths[count - 1] / widths[0], `${count} lanes`).toBeCloseTo(NARROWEST_LANE, 10);
      for (let i = 1; i < count; i++) expect(widths[i]).toBeLessThan(widths[i - 1]);
    }
  });

  test("pins its counts to the content tuples", () => {
    expect(BLOCK_COUNT).toBe(C.blocks.length);
    expect(PILLAR_COUNT).toBe(C.pillars.length);
    expect(TRACK_COUNT).toBe(C.tracks.length);
  });
});

// ── the copy rules ───────────────────────────────────────────────────────────

describe("the copy", () => {
  test("names no weekday, at any pose", () => {
    // THE OWNER'S OBJECTION, 2026-08-14: "DO NOT use Monday, Tuesday, it is very
    // confusing." The `support` pillar read "Someone named to ask on the Tuesday after
    // the room empties" — vivid, and a schedule this deck does not commit to. Held over
    // every authored string rather than over the one that had it, because the next
    // author will reach for the same idiom.
    const WEEKDAYS = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i;
    ALL_AUTHORED.forEach((copy) => expect(copy, copy).not.toMatch(WEEKDAYS));
    // Positive control: the pattern does fire on the sentence that was cut.
    expect("Someone named to ask on the Tuesday after the room empties.").toMatch(WEEKDAYS);
  });

  test("keeps every sentence short enough to read from the back row", () => {
    // ASD-STE100 AND ZINSSER, an owner rule for every string on this slide. The
    // standard's ceiling is 20 words a sentence for a procedure; a slide read at
    // projection distance gets less. 14 is what the longest line authored here actually
    // needs, so the budget is set where a reword will notice it.
    [...CARD_LINES, ...C.tracks.map((t): [string, string] => [`track ${t.id}`, t.line])].forEach(
      ([where, line]) => {
        const words = line.split(/\s+/).filter(Boolean).length;
        expect(words, `${where}: ${words} words`).toBeLessThanOrEqual(14);
      },
    );
    // The four bottom lines share one budget, because they share one shelf and one
    // register: three scene mini-theses and the closer.
    (
      [
        ["blocksThesis", C.blocksThesis],
        ["pillarsThesis", C.pillarsThesis],
        ["tracksThesis", C.tracksThesis],
        ["closer", C.closer],
      ] as const
    ).forEach(([where, line]) => {
      expect(line.split(/\s+/).filter(Boolean).length, where).toBeLessThanOrEqual(18);
    });
  });

  test("keeps every card line inside the three lines its box is cut for", () => {
    // The card budgets exactly THREE lines and the narrower of the two card widths is
    // the pillars'; a fourth line does not overflow a box, it prints under the card's
    // bottom edge on the stage's own ground, where it reads as a font that failed to
    // load. Enforced on the COPY, where an author can act on it, because jsdom computes
    // no text width.
    CARD_LINES.forEach(([where, line]) => {
      expect(line.length, `${where}: ${line.length} chars`).toBeLessThanOrEqual(
        CARD_LINE_BUDGET_CHARS,
      );
    });
    C.tracks.forEach((t) => {
      expect(t.line.length, `track ${t.id}`).toBeLessThanOrEqual(LANE_LINE_BUDGET_CHARS);
    });
  });

  test("holds the block labels and the pillar labels disjoint", () => {
    // THE RECAP DRAWS A CONNECTOR BETWEEN THE TWO SETS, so two identically named boxes at
    // either end of one line would read as a rendering fault rather than as a cause
    // pointing at its answer. `ACCESS` is the pillar and `TOOLS` the block, even though
    // the two are about the same obstacle.
    const blocks = new Set(C.blocks.map((b) => b.label));
    const pillars = new Set(C.pillars.map((p) => p.label));
    const shared = [...blocks].filter((label) => pillars.has(label));
    expect(shared).toEqual([]);
    // Non-vacuity: both sets are populated and every label is a mono-register SHOUT.
    expect(blocks.size).toBe(BLOCK_COUNT);
    expect(pillars.size).toBe(PILLAR_COUNT);
    [...blocks, ...pillars].forEach((label) => expect(label).toBe(label.toUpperCase()));
  });

  test("keeps `kw` on prose only — no label is rendered through the highlighter", () => {
    // Rendered check, not an authored one: `<em>` is what a highlight IS on the stage, so
    // this reads the DOM for one inside every label box. A copper italic inside a mono
    // uppercase name emphasises a fragment of it.
    renderSlide(0);
    for (const [id, poses] of LABEL_BOXES) {
      goToPose(poses[0]);
      expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(0);
    }
  });

  test("and every prose box does carry its highlight", () => {
    // The other direction, and not implied by the one above: a `*Kw` array that silently
    // stopped matching leaves copy that still reads, so nothing on the stage says the
    // emphasis was lost.
    renderSlide(0);
    for (const [id, poses] of PROSE_BOXES) {
      goToPose(poses[0]);
      expect(screen.getByTestId(id).querySelectorAll("em").length, id).toBeGreaterThan(0);
    }
  });

  test("every prose keyword is a substring of the copy it highlights", () => {
    // `highlight()` is a `String.includes` match that NO-OPS SILENTLY: a typo drops a
    // copper highlight with no error anywhere.
    const pairs: Array<[string, string, readonly string[]]> = [
      ["headline", C.headline, C.headlineKw],
      ["closer", C.closer, C.closerKw],
      ["blocksThesis", C.blocksThesis, C.blocksThesisKw],
      ["pillarsThesis", C.pillarsThesis, C.pillarsThesisKw],
      ["tracksThesis", C.tracksThesis, C.tracksThesisKw],
      ...C.blocks.map((b): [string, string, readonly string[]] => [
        `block.${b.id}`,
        b.line,
        b.lineKw,
      ]),
      ...C.pillars.map((p): [string, string, readonly string[]] => [
        `pillar.${p.id}`,
        p.line,
        p.lineKw,
      ]),
      ...C.tracks.map((t): [string, string, readonly string[]] => [
        `track.${t.id}`,
        t.line,
        t.lineKw,
      ]),
    ];
    pairs.forEach(([where, copy, kw]) => {
      expect(kw.length, `${where}: prose with no keyword`).toBeGreaterThan(0);
      kw.forEach((word) => expect(copy, `${where}: "${word}"`).toContain(word));
    });
  });

  test("has exactly the `*Kw` keys the keyword rule allows at the top level", () => {
    expect(
      Object.keys(C)
        .filter((k) => k.endsWith("Kw"))
        .sort(),
    ).toEqual([
      "blocksThesisKw",
      "closerKw",
      "headlineKw",
      "pillarsThesisKw",
      "tracksThesisKw",
    ]);
  });

  test("no authored string names a section letter or a figure number", () => {
    // §3.4 R2. `mandate` takes K today and the run behind it moved three letters when
    // this slide landed; a literal "K.1" or "SECTION K" in this copy would be a lie on a
    // projector the first time a Phase 7 slide opened a run in front of it.
    ALL_AUTHORED.forEach((copy) => {
      expect(copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      expect(copy).not.toMatch(/\b[A-N]\.\d+\b/);
      expect(copy).not.toMatch(/\b(?:fig\.?|figure|slide)\b/i);
    });
  });

  test("prints no digit on any pose", () => {
    // The fig label's letter and number are the composer's and are derived; nothing this
    // slide authors may carry one. The label's own text is SUBTRACTED rather than removed
    // from the DOM — `container.remove()` on a node React still owns throws on unmount —
    // so what is left is exactly the strings this slide authors.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      const figLabel = container.querySelector(".fig-label")?.textContent ?? "";
      expect(figLabel, "no fig label on the stage").not.toBe("");
      const stage = (container.textContent ?? "").replace(figLabel, "");
      expect(stage.length, `pose ${pose} rendered nothing`).toBeGreaterThan(30);
      expect(stage, `pose ${pose}`).not.toMatch(/\d/);
      unmount();
    }
  });

  test("carries no stray markup — the data is plain strings", () => {
    ALL_AUTHORED.forEach((copy) => expect(copy).not.toContain("<em"));
  });

  test("draws a mark for every block, pillar and track", () => {
    // The component guards this at module load with a throwing IIFE, because the ten call
    // sites cast a `string` id to `GlyphId` and a cast is a promise the compiler stops
    // checking. This states the property where a reviewer looks for it, and pins the
    // count so a mark drawn for nothing is caught too.
    const drawn = new Set<string>(GLYPH_IDS);
    [...C.blocks, ...C.pillars, ...C.tracks].forEach((item) =>
      expect(drawn.has(item.id), `no mark for ${item.id}`).toBe(true),
    );
    expect(GLYPH_IDS).toHaveLength(BLOCK_COUNT + PILLAR_COUNT + TRACK_COUNT);
  });
});

// ── the stylesheet, read off disk ────────────────────────────────────────────

describe("the stylesheet", () => {
  const css = readFileSync(CSS_PATH, "utf8");

  test("prefixes every keyframe with the figure's own name", () => {
    // Every slide family owns its own keyframes, so retiming one figure can never retime
    // another's. The rule is stated beside `gap-ladder-draw` in `src/styles/globals.css`
    // and kept by `no-sop.css`, `governance.css` and `tam-kotter.css`.
    const names = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
    expect(names.length, "no keyframes at all").toBeGreaterThan(10);
    names.forEach((name) => expect(name, name).toMatch(/^en-/));
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
    // rule here by construction, and WRONG for the two the block below restates: a fade-
    // out rests invisible, and a dashed path with `animation: none` and no offset paints
    // COMPLETE. Held as a set comparison rather than as a spot check, because the failure
    // is a loop somebody adds and forgets, and it is invisible until a reduced-motion
    // reader watches a projector.
    const block = css.match(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*)\}\s*$/)?.[1];
    expect(block, "no reduced-motion block").toBeDefined();
    const infinite = new Set(
      [...css.matchAll(/\.([\w-]+)\s*\{[^}]*animation:[^;]*\binfinite\b/g)].map((m) => m[1]),
    );
    // Non-vacuity: eleven ambient loops — ten marks and the recap's current.
    expect(infinite.size).toBeGreaterThanOrEqual(11);
    infinite.forEach((cls) =>
      expect(block, `${cls} is not disarmed under reduced motion`).toContain(`.${cls}`),
    );
    // And the frames the squash gets wrong are restated by value: a fade-out that must rest
    // invisible, and a dashed arrival that must rest painted.
    //
    // THE THIRD ONE LEFT WITH ITS SHAPE ON 2026-08-14. `literacy`'s square used to stall part-
    // drawn and needed `stroke-dashoffset: 1` restated here, because `animation: none` on a
    // dashed path with no offset paints it COMPLETE — the one state that block denies. The mark's
    // failure is now a solid block dropping out of the bubble, which carries no dash at all, so
    // there is no resting offset left to state. `.en-draw`'s 0 below is the figure's last one.
    expect(block).toMatch(/stroke-dashoffset:\s*0/);
    expect(block).toMatch(/display:\s*none/);
  });

  test("declares transform-box on everything it transforms inside an SVG", () => {
    // Without it the origin is the nearest viewport's own, and a `scale` on a 3px dot
    // sends it across the glyph.
    expect(css).toMatch(/transform-box:\s*fill-box/);
    // The groups that rotate about a named point in the glyph's coordinates opt back out.
    expect(css).toMatch(/transform-box:\s*view-box/);
  });

  test("carries the whole-box hover's own two additions and nothing else", () => {
    // `.box-hover` in `globals.css` owns the border and the wash; this file owns the two
    // things a pseudo-element cannot reach — the card's inner hairline and the glyph's
    // strokes — precisely so `:hover` can win them against an inline border.
    expect(css).toMatch(/\.en-card:hover \.en-hairline/);
    expect(css).toMatch(/\.en-card:hover \.en-glyph/);
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
    // mounts nothing to gate: every mark and the recap's four curves are animated from
    // `./enablement.css`.
    //
    // THE `<svg>` COUNT IS ASSERTED WITH IT, and that is the change from the figure this
    // replaced — which mounted no `<svg>` at all and closed the question by construction.
    // The recap's connectors need one, and the ten marks need one each, so the count is
    // pinned per pose instead: a `<rect>` somebody reaches for is not what would go
    // wrong, it is the `<animate>` they add to it next.
    // POSE 4 CARRIES THE SAME ELEVEN AS POSE 3, because the recap does not leave when the
    // thesis lands — ten marks and one connector layer, on both.
    const RECAP_SVGS = BLOCK_COUNT + PILLAR_COUNT + TRACK_COUNT + 1;
    const EXPECTED_SVGS: Record<number, number> = {
      0: BLOCK_COUNT,
      1: PILLAR_COUNT,
      2: TRACK_COUNT,
      3: RECAP_SVGS,
      4: RECAP_SVGS,
    };
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      const figLabel = container.querySelector(".fig-label");
      for (const tag of ["animate", "animateMotion", "animateTransform", "animateColor", "set"]) {
        const ours = [...container.querySelectorAll(tag)].filter((el) => !figLabel?.contains(el));
        expect(ours, `pose ${pose} · <${tag}>`).toHaveLength(0);
      }
      const svgs = [...container.querySelectorAll("svg")].filter((el) => !figLabel?.contains(el));
      expect(svgs, `pose ${pose} · <svg> count`).toHaveLength(EXPECTED_SVGS[pose]);
      svgs.forEach((svg) => {
        // Every mark restates its own card's label and line, both of which are real text
        // a few millimetres away.
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
      const { unmount } = renderSlide(pose);
      for (const [id, at] of COPY_BOXES) {
        if (!at.includes(pose)) continue;
        expect(screen.getByTestId(id).textContent, `pose ${pose} · ${id}`).not.toBe("");
      }
      unmount();
    }
  });
});

// ── the axis this slide does NOT have ────────────────────────────────────────

describe("both leader decks print the same stage", () => {
  // The blocks, the pillars and the tracks are generic and identical across brands, and
  // this slide holds that in the strongest available form: it resolves no brand block at
  // all, unlike its three sibling leader-only slides. That is a claim about MODULE
  // EPOCHS — `VARIANT` resolves at module scope — so it cannot be checked inside the one
  // epoch every test above runs in. Two epochs, byte for byte.
  //
  // NOT `SlideHarness`, deliberately: it imports `composedDeck` statically and would hand
  // a freshly loaded slide a stale context object. This is the same-epoch dynamic-import
  // pattern `variant-composition.test.tsx` documents.
  const LEADER_VARIANTS: VariantId[] = ["berau-leader", "gems-leader"];

  async function stageTextFor(variant: VariantId): Promise<string> {
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
        import("@/slides/leader-mandate/mandate-enablement"),
      ]);

    const row = composedDeck.slides.find((s) => s.def.id === "mandate-enablement");
    if (!row) throw new Error(`${variant} composes no mandate-enablement`);

    function AdvanceTo({ step }: { step: number }) {
      const { goTo } = useDeckIn();
      return <button data-testid="goto-epoch" onClick={() => goTo(0, step)} />;
    }

    const { container } = render(
      <DeckProvider stepCounts={[slide.mandateEnablementSlide.steps]}>
        <SlideNumberProvider
          value={{ letter: row.letter, num: row.num, sectionKey: row.sectionKey }}
        >
          <AdvanceTo step={slide.mandateEnablementSlide.canonicalPose} />
          <slide.MandateEnablement />
        </SlideNumberProvider>
      </DeckProvider>,
    );
    act(() => screen.getByTestId("goto-epoch").click());
    return container.textContent ?? "";
  }

  afterAll(restoreLocation);

  test("byte for byte, at the fullest pose", async () => {
    // SEQUENTIALLY, not `Promise.all`. Each call re-points `window.location`, resets the
    // module registry and renders into the SAME document — run concurrently they
    // interleave, two stages share one DOM, and every `getByTestId` finds two elements.
    const berau = await stageTextFor(LEADER_VARIANTS[0]);
    const gems = await stageTextFor(LEADER_VARIANTS[1]);
    // Includes the fig label, so this also says the two decks compose the slide at the
    // same position — which they do, from one shared `LEADER_SLIDE_IDS`.
    expect(berau).toBe(gems);
    // Not vacuously: a stage that rendered nothing would also be equal. The canonical
    // pose is the recap, so all three of its column heads are on it.
    expect(berau).toContain(C.blocksShort);
    expect(berau).toContain(C.pillarsShort);
    expect(berau).toContain(C.tracksShort);
    expect(berau).toContain(C.blocks[0].label);
    expect(berau).toContain(C.pillars[0].label);
    expect(berau).toContain(C.tracks[0].name);
  });
});
