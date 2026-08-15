// K.3 · THE FOUR LEVERS — the four acts, the four heroes, and the one desk they arrive at.
//
// ═══ WHAT THIS FILE HOLDS AFTER THE 2026-08-15 RE-CUT, and why half of it is new. The slide
// this suite used to cover drew a four-column SIGN-OFF FORM with sixteen boxes in it and a
// bordered citation band under the levers. Both are gone (`../../src/slides/leader-mandate/
// levers-geometry.ts` records the four complaints), so every assertion about a cell, a mark, an
// authority column or a playbook quotation went with them. WHAT REPLACED THEM IS NOT A SMALLER
// SET OF THE SAME TESTS: the two things the re-cut was FOR are now the two things this file
// guards hardest —
//
//   · NOBODY THE ROOM CANNOT NAME APPEARS ON THIS STAGE. The retired form printed
//     `THE COMMITTEE`, `GROUP HR` and `A BUDGET CYCLE` as column heads and the band named an
//     outside playbook by organisation. `the re-cut removed a cast the room could not identify`
//     below asserts all of it absent, on every pose and in every authored string, and fires
//     each pattern against a control first so the rule cannot pass vacuously.
//   · THE SLIDE STANDS ON ITS SIBLINGS' SHELVES. The eyebrow was at 134 and the ask at 572 in
//     20px serif italic; both are K.1's now, so `the shelves` asserts the rendered numbers and
//     not only the constants.
//
// ═══ THE PROPERTY THE SLIDE IS ABOUT IS STILL A PROPERTY OF THE DATA. §6.8's levers are the
// ones a BU or Division Head can pull ALONE. The retired figure held that in a `needs` field
// the form read; the re-cut holds it in `Lever.scope` — the exact phrase in each act that ties
// it to something the leader already holds — and `../../src/slides/leader-mandate/content.ts`'s
// `ownedByTheRoom` throws at module load on any lever whose act has lost it. This file holds
// the same property from the other side, over the shipped copy, for the reason that module
// states: the two are not redundant, they fail at different moments and to different people.
//
// ═══ WHAT IS DELIBERATELY NOT HERE. jsdom computes no styles, no fonts and no layout, so
// nothing below asserts a COMPUTED colour, a wrapped line or a painted overlay. Colour tiers
// are held as authored inline values, keyframes are held by reading the stylesheet's bytes, and
// `.box-hover`'s ::before overlay is held as the CLASS being present — what it paints is a
// browser's to prove.
import { readFileSync } from "node:fs";
import path from "node:path";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { restoreLocation } from "../harvest/deck-numbering";
import { BRANDS, type VariantId } from "@/deck-variants";
import { MandateLevers, mandateLeversSlide } from "@/slides/leader-mandate/mandate-levers";
import { mandateLeversContent } from "@/slides/leader-mandate/content";
import {
  BODY_TOP,
  CONNECTOR_Y0,
  CONNECTOR_Y1,
  CONTENT_WIDTH,
  EYEBROW_TOP,
  GLYPH_VIEWBOX,
  HEADLINE_BOTTOM,
  HERO_ACT_BUDGET_CHARS,
  HERO_ACT_HEIGHT,
  HERO_ACT_SIZE,
  HERO_FLOOR,
  HERO_GLYPH_LEFT,
  HERO_GLYPH_SIZE,
  HERO_GLYPH_STROKE,
  HERO_GLYPH_TOP,
  HERO_NOTE_BUDGET_CHARS,
  HERO_NOTE_TOP,
  HERO_TEXT_LEFT,
  HERO_TEXT_TOP,
  HERO_TEXT_WIDTH,
  LABEL_HEIGHT,
  LABEL_SIZE,
  LABEL_TRACKING,
  LEVER_COUNT,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  POSE_COUNT,
  RECAP_CARD_HEIGHT,
  RECAP_CARD_TOP,
  RECAP_CARD_WIDTH,
  RECAP_FLOOR,
  RECAP_GLYPH_SIZE,
  RECAP_GLYPH_STROKE,
  RECAP_LINE_BUDGET_CHARS,
  RECAP_POSE,
  RULE_TOP,
  SCENE_FLOOR,
  SIDE_MARGIN,
  SIGN_BOX_HEIGHT,
  SIGN_BOX_LEFT,
  SIGN_BOX_TOP,
  SIGN_BOX_WIDTH,
  SIGN_NOTE_TOP,
  STAGE,
  THESIS_BUDGET_CHARS,
  THESIS_HEIGHT,
  THESIS_POSE,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  connectorPath,
  glyphStroke,
  recapCardCenterX,
  recapCardLeft,
} from "@/slides/leader-mandate/levers-geometry";
import { LEVER_GLYPH_IDS } from "@/slides/leader-mandate/components/LeverGlyphs";

const C = mandateLeversContent;

/** 0…5. Read from the geometry module rather than typed, so a fifth lever grows this list
 *  with the slide instead of leaving a pose untested. */
const POSES = Array.from({ length: POSE_COUNT }, (_, i) => i);

/** The four hero poses, and the two that are not. */
const HERO_POSES = POSES.slice(0, LEVER_COUNT);

/**
 * The composed position, as a harness INPUT and not a claim the slide makes.
 *
 * `SlideHarness` requires it for a leader-only slide and rejects it for one the general deck
 * composes; K.3 is leader-only. Nothing under `src/slides/leader-mandate/` may author this
 * letter or this number — see `no rendered string names a letter, a figure or a number`.
 */
const AT = { letter: "K", num: 3, sectionKey: "mandate" } as const;

const CSS_PATH = path.resolve(process.cwd(), "src/slides/leader-mandate/components/levers.css");

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
    <SlideHarness def={mandateLeversSlide} at={AT}>
      <Nav />
      <MandateLevers />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

const mounted = (id: string) => screen.queryByTestId(id) !== null;

const box = (id: string) => screen.getByTestId(id);

const px = (id: string, prop: "left" | "top" | "width" | "height"): number =>
  Number.parseFloat(box(id).style[prop]);

function delayOf(id: string): number {
  return Number.parseFloat(box(id).style.transitionDelay);
}

/** The stage's text with the FigLabel removed. Every "no digit" and "no letter" rule below is
 *  about what the SLIDE authors, and the fig label is the deck's, printed from the composed
 *  position the harness supplies. */
function stageText(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

/** Every string the copy block authors, in tree order. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

const authored = (): string[] => walkStrings(C);

/**
 * Every test id the figure hangs a scene on, and the poses it belongs to.
 *
 * DERIVED FROM THE COPY AND FROM `RECAP_POSE`, not typed, so a fifth lever adds a hero pose to
 * this table by existing. The four heroes are EXCLUSIVE and the last two ACCUMULATE, which is
 * the whole shape of the slide and the thing the pose walk below is for.
 */
const SCENE_OF: readonly [string, readonly number[]][] = [
  ...C.levers.flatMap((lever, i): [string, readonly number[]][] => [
    [`levers-hero-eyebrow-${lever.id}`, [i]],
    [`levers-hero-mark-${lever.id}`, [i]],
    [`levers-hero-act-${lever.id}`, [i]],
    [`levers-hero-note-${lever.id}`, [i]],
    [`levers-hero-thesis-${lever.id}`, [i]],
  ]),
  ["levers-recap-eyebrow", [RECAP_POSE, THESIS_POSE]],
  ["levers-connectors", [RECAP_POSE, THESIS_POSE]],
  ["levers-sign-box", [RECAP_POSE, THESIS_POSE]],
  ["levers-sign-note", [RECAP_POSE, THESIS_POSE]],
  // THE ONE THING THE LAST POSE TAKES AWAY. Every scene line and the ask stand on ONE shelf, so
  // the recap keeping its own line while the ask arrived would print two sentences on top of one
  // another. The FRAME above it does not move — that is asserted separately.
  ["levers-recap-thesis", [RECAP_POSE]],
  ["levers-rule", [THESIS_POSE]],
  ["levers-thesis", [THESIS_POSE]],
  ...C.levers.map((lever): [string, readonly number[]] => [
    `levers-recap-card-${lever.id}`,
    [RECAP_POSE, THESIS_POSE],
  ]),
];

/** Every box that must carry the hover chrome, by the pose that paints it. */
const HOVER_BOXES: readonly [number, readonly string[]][] = [
  [
    RECAP_POSE,
    [...C.levers.map((lever) => `levers-recap-card-${lever.id}`), "levers-sign-box"],
  ],
];

/** Everything that is NOT a box and therefore may not take a pointer. */
const INERT: readonly [number, readonly string[]][] = [
  [
    0,
    [
      `levers-hero-eyebrow-${C.levers[0].id}`,
      `levers-hero-mark-${C.levers[0].id}`,
      `levers-hero-act-${C.levers[0].id}`,
      `levers-hero-note-${C.levers[0].id}`,
      `levers-hero-thesis-${C.levers[0].id}`,
    ],
  ],
  [RECAP_POSE, ["levers-recap-eyebrow", "levers-sign-note", "levers-recap-thesis"]],
  [THESIS_POSE, ["levers-thesis"]],
];

/** Every PROSE string on the slide with its keywords, and the box that prints it. */
const PROSE_BOXES = (): readonly [string, string, readonly string[]][] => [
  ...C.levers.flatMap((lever): [string, string, readonly string[]][] => [
    [`levers-hero-act-${lever.id}`, lever.act, lever.actKw],
    [`levers-hero-note-${lever.id}`, lever.note, lever.noteKw],
    [`levers-hero-thesis-${lever.id}`, lever.thesis, lever.thesisKw],
    [`levers-recap-line-${lever.id}`, lever.short, lever.shortKw],
  ]),
  ["levers-recap-thesis", C.recapThesis, C.recapThesisKw],
  ["levers-thesis", C.closer, C.closerKw],
];

/** Every LABEL string — mono, keyword-free, and never wrapped in an `<em>`. */
const LABEL_BOXES = (): readonly [string, string][] => [
  ...C.levers.map((lever): [string, string] => [
    `levers-hero-eyebrow-${lever.id}`,
    lever.label,
  ]),
  ...C.levers.map((lever): [string, string] => [
    `levers-recap-label-${lever.id}`,
    lever.label,
  ]),
  ["levers-recap-eyebrow", C.recapEyebrow],
  ["levers-sign-label", C.signLabel],
  ["levers-sign-note", C.signNote],
];

/** Which pose prints a given box, for the two tables above. */
function poseOf(testId: string): number {
  const row = SCENE_OF.find(([id]) => id === testId);
  if (row) return row[1][0];
  // A card's inner boxes are not in SCENE_OF — they arrive with the card.
  if (testId.startsWith("levers-recap-") || testId.startsWith("levers-sign-")) return RECAP_POSE;
  throw new Error(`no pose recorded for ${testId}`);
}

afterEach(cleanup);
afterAll(restoreLocation);

// ── the slide def ────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, one pose per lever plus a recap and the ask", () => {
    expect(mandateLeversSlide.id).toBe("mandate-levers");
    expect(mandateLeversSlide.animationMode).toBe("step-reveal");
    expect(mandateLeversSlide.surface).toBe("dark");
    expect(mandateLeversSlide.sectionKey).toBe("mandate");
    // NEITHER NUMBER IS TYPED IN THE SLIDE FILE. Both are read from the geometry module,
    // which derives them from the content module's own lever tuple — so a fifth lever moves
    // the step count without an author remembering to.
    expect(mandateLeversSlide.steps).toBe(POSE_COUNT);
    expect(POSE_COUNT).toBe(LEVER_COUNT + 2);
    expect(RECAP_POSE).toBe(POSE_COUNT - 2);
    expect(THESIS_POSE).toBe(POSE_COUNT - 1);
  });

  test("exports the ask, because the canonical pose IS the last pose", () => {
    // The PDF and PPTX exports print `canonicalPose` and nothing else. On the slide that ENDS
    // the mandate, a canonical pose short of the last would export a room four things it can
    // do and stop before saying what happens if it does none of them.
    expect(mandateLeversSlide.canonicalPose).toBe(THESIS_POSE);
    expect(mandateLeversSlide.canonicalPose).toBe(mandateLeversSlide.steps - 1);

    const { container } = renderSlide(mandateLeversSlide.canonicalPose);
    expect(mounted("levers-thesis")).toBe(true);
    expect(stageText(container)).toContain(C.closer);
  });

  test("takes no props, so there is no brand block to hand it", () => {
    expect(MandateLevers.length).toBe(0);
  });
});

// ── the four levers ──────────────────────────────────────────────────────────

describe("the four levers", () => {
  test("are the content module's four, in deck order, one hero pose each", () => {
    expect(C.levers).toHaveLength(LEVER_COUNT);
    C.levers.forEach((lever, i) => {
      const { container } = renderSlide(i);
      const text = stageText(container);
      expect(text, lever.id).toContain(lever.label);
      expect(text, lever.id).toContain(lever.act);
      expect(text, lever.id).toContain(lever.note);
      expect(text, lever.id).toContain(lever.thesis);
      cleanup();
    });
  });

  test("every act keeps the phrase that puts it inside one person's authority", () => {
    // §6.8's levers are the ones a BU or Division Head can pull ALONE, and `ownedByTheRoom` in
    // the content module throws at load on a lever that fails it — the two are not redundant,
    // they fail at different moments and to different people. Held here over the SHIPPED copy,
    // which is the form a reviewer reading a diff can check.
    for (const lever of C.levers) {
      expect(lever.scope.trim().length, lever.id).toBeGreaterThan(0);
      expect(lever.act, lever.id).toContain(lever.scope);
    }
    // NOT VACUOUS: the four phrases are four different phrases, so no lever is claiming a
    // scoping so generic that every act would contain it.
    expect(new Set(C.levers.map((l) => l.scope)).size).toBe(LEVER_COUNT);
  });

  test("every act is an instruction and never a definition", () => {
    // An imperative addressed to the person in front of it — which is the whole difference
    // between this slide's four levers and the playbook's four nouns. No act may open with an
    // article or with "the programme".
    for (const lever of C.levers) {
      expect(lever.act, lever.id).not.toMatch(/^(?:A |An |The |Our |This )/);
      expect(lever.act.trim().endsWith("."), lever.id).toBe(true);
    }
  });

  test("has a drawn mark for every lever, and draws no mark nothing names", () => {
    const named = C.levers.map((lever) => lever.glyph);
    for (const id of named) {
      expect(LEVER_GLYPH_IDS as readonly string[], id).toContain(id);
    }
    // One mark per lever and no spares: a drawn mark nothing names is a shape nobody decided
    // to keep, and the exhaustive switch in `LeverGlyphs.tsx` cannot report it.
    expect(new Set(named).size).toBe(LEVER_COUNT);
    expect([...LEVER_GLYPH_IDS].sort()).toEqual([...named].sort());
  });

  test("prints each mark at hero size once, and at chip size on the recap", () => {
    const first = C.levers[0];
    renderSlide(0);
    const heroGlyph = box(`levers-hero-glyph-${first.id}`);
    expect(heroGlyph.style.width).toBe(`${HERO_GLYPH_SIZE}px`);
    expect(heroGlyph.style.height).toBe(`${HERO_GLYPH_SIZE}px`);
    goToPose(RECAP_POSE);
    for (const lever of C.levers) {
      const chip = box(`levers-recap-glyph-${lever.id}`);
      expect(chip.style.width, lever.id).toBe(`${RECAP_GLYPH_SIZE}px`);
    }
  });
});

// ── the six poses ────────────────────────────────────────────────────────────

describe("the six poses", () => {
  test("four heroes are exclusive and the last two accumulate", () => {
    renderSlide(0);
    // AND BACK. A pose that clears something it should have kept is exactly what a presenter
    // stepping backwards finds and what a per-pose re-render never sees.
    const walk = [...POSES, ...[...POSES].reverse()];
    for (const pose of walk) {
      goToPose(pose);
      for (const [id, at] of SCENE_OF) {
        expect(mounted(id), `pose ${pose} · ${id}`).toBe(at.includes(pose));
      }
      // Never two heroes at once — the property the mount-per-scene split exists for.
      const heroesUp = C.levers.filter((lever) => mounted(`levers-hero-mark-${lever.id}`));
      expect(heroesUp.length, `pose ${pose}`).toBeLessThanOrEqual(1);
    }
  });

  test("the last pose adds to the recap's FRAME and moves nothing in it", () => {
    renderSlide(RECAP_POSE);
    const read = () =>
      [
        ...C.levers.map((lever) => `levers-recap-card-${lever.id}`),
        "levers-sign-box",
        "levers-sign-note",
      ].map((id) => [id, box(id).style.left, box(id).style.top, box(id).style.width].join("|"));
    const before = read();
    goToPose(THESIS_POSE);
    expect(read()).toEqual(before);
  });

  test("the ask REPLACES the recap's own line rather than landing on top of it", () => {
    // THE ONE SUBTRACTION ON THE SLIDE, and it is forced by the shelf: five scene lines and the
    // ask share y=590, which is what makes the sentence at the foot of the stage read as one
    // object the room learns to look at. Two of them at once is two sentences overprinted at
    // the one moment the deck cannot afford it.
    renderSlide(RECAP_POSE);
    expect(mounted("levers-recap-thesis")).toBe(true);
    expect(mounted("levers-thesis")).toBe(false);
    goToPose(THESIS_POSE);
    expect(mounted("levers-recap-thesis")).toBe(false);
    expect(mounted("levers-thesis")).toBe(true);
    // Never two sentences on the shelf, at any pose, walking either way.
    for (const pose of [...POSES, ...[...POSES].reverse()]) {
      goToPose(pose);
      const onShelf = screen
        .queryAllByTestId(/^levers-(?:hero-thesis-|recap-thesis|thesis)/)
        .filter((el) => el.style.top === `${THESIS_TOP}px`);
      expect(onShelf.length, `pose ${pose}`).toBe(1);
    }
  });

  test("hangs every eyebrow from ONE shelf, 34px under the headline", () => {
    const shelves = new Set<string>();
    renderSlide(0);
    for (const pose of POSES.slice(0, POSE_COUNT - 1)) {
      goToPose(pose);
      const id =
        pose < RECAP_POSE ? `levers-hero-eyebrow-${C.levers[pose].id}` : "levers-recap-eyebrow";
      expect(mounted(id), `pose ${pose} has no eyebrow`).toBe(true);
      shelves.add(box(id).style.top);
      expect(box(id).style.height).toBe(`${LABEL_HEIGHT}px`);
      expect(box(id).style.fontSize).toBe(`${LABEL_SIZE}px`);
      expect(box(id).style.letterSpacing).toBe(`${LABEL_TRACKING}em`);
    }
    expect(shelves).toEqual(new Set(["156px"]));
    // THE WHOLE OF COMPLAINT 4. The shelf it replaced was 134, which left 12px under a 40px
    // display line — that is leading, not air, so the room read two lines of one title.
    expect(EYEBROW_TOP).toBe(156);
    expect(HEADLINE_BOTTOM).toBe(122);
    expect(EYEBROW_TOP - HEADLINE_BOTTOM).toBe(34);
  });

  test("reveals each scene on ONE lead-in and ONE stagger", () => {
    renderSlide(0);
    const first = C.levers[0];
    const lead = delayOf(`levers-hero-eyebrow-${first.id}`);
    expect(lead).toBe(120);
    expect(delayOf(`levers-hero-act-${first.id}`)).toBe(lead + 90);
    expect(delayOf(`levers-hero-note-${first.id}`)).toBe(lead + 180);
    expect(delayOf(`levers-hero-thesis-${first.id}`)).toBe(lead + 270);

    goToPose(RECAP_POSE);
    // The cards, then the curves, then the box: a curve arriving before the card at its far
    // end would point at nothing, and a box before the curves would answer a question nobody
    // had drawn.
    const lastCard = delayOf(`levers-recap-card-${C.levers[LEVER_COUNT - 1].id}`);
    const firstCurve = Number.parseFloat(
      box(`levers-connector-${C.levers[0].id}`).style.animationDelay,
    );
    expect(firstCurve).toBeGreaterThan(lastCard - 90);
    expect(delayOf("levers-sign-box")).toBeGreaterThan(
      Number.parseFloat(box(`levers-connector-${C.levers[LEVER_COUNT - 1].id}`).style.animationDelay),
    );
    expect(delayOf("levers-recap-thesis")).toBeGreaterThan(delayOf("levers-sign-note"));
  });
});

// ── the re-cut's own subject ─────────────────────────────────────────────────

describe("the re-cut removed a cast the room could not identify", () => {
  /**
   * What the retired stage printed and what nothing on this one may.
   *
   * EACH PATTERN IS FIRED AGAINST A CONTROL FIRST. A rule that no longer matches anything is a
   * rule that passes whatever the copy says, and these four were read off the slide's own
   * previous revision — so the controls are what that revision actually printed.
   */
  const BANNED: readonly [string, RegExp, string][] = [
    ["the committee", /\bcommittee\b/i, "THE COMMITTEE"],
    ["group HR", /\bgroup[\s-]?hr\b/i, "GROUP HR"],
    ["a budget cycle", /\bbudget cycle\b/i, "A BUDGET CYCLE"],
    [
      "the playbook",
      /\bplaybook\b/i,
      "Nanovest's own Group HR playbook lists four levers — “Convene · Champion”",
    ],
  ];

  test("every pattern still fires on the copy it was read off", () => {
    for (const [name, pattern, control] of BANNED) {
      expect(pattern.test(control), `${name} no longer matches its own control`).toBe(true);
    }
  });

  test("names none of them, in any authored string", () => {
    for (const [name, pattern] of BANNED) {
      for (const copy of authored()) {
        expect(pattern.test(copy), `"${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
    }
  });

  test("names none of them, at any pose", () => {
    for (const pose of POSES) {
      const { container } = renderSlide(pose);
      const text = stageText(container);
      for (const [name, pattern] of BANNED) {
        expect(pattern.test(text), `"${name}" reached pose ${pose}`).toBe(false);
      }
      cleanup();
    }
  });

  test("quotes nobody — no quotation mark survives on any pose", () => {
    // The retired band printed an outside document's own labels inside curly quotes. The
    // provenance is spoken now, so no pose has anything to quote.
    for (const pose of POSES) {
      const { container } = renderSlide(pose);
      expect(stageText(container)).not.toMatch(/["“”]/);
      cleanup();
    }
  });

  test("names no organisation", () => {
    // Derived from the registered brands rather than typed, so a fourth brand tightens this
    // rule instead of slipping past it. This slide's subject is the person in the room, and
    // that person is the same person in both rooms.
    const orgs = [
      ...Object.values(BRANDS).map((b) => b.label),
      "Nanovest",
      "Berau",
      "GEMS",
    ];
    for (const pose of POSES) {
      const { container } = renderSlide(pose);
      const text = stageText(container);
      for (const org of orgs) {
        expect(text.includes(org), `"${org}" reached pose ${pose}`).toBe(false);
      }
      cleanup();
    }
  });

  test("says who signs, in shape and once in words", () => {
    // The claim the form used to make by counting empty boxes: four curves, one box.
    renderSlide(RECAP_POSE);
    for (const lever of C.levers) {
      expect(mounted(`levers-connector-${lever.id}`), lever.id).toBe(true);
    }
    expect(screen.getAllByTestId(/^levers-connector-/)).toHaveLength(LEVER_COUNT);
    expect(box("levers-sign-label").textContent).toBe(C.signLabel);
    expect(box("levers-sign-note").textContent).toBe(C.signNote);
  });

  test("runs a current down every connector, toward the box and not away from it", () => {
    // FOUR CURVES THAT MERELY MEET SAY THE LEVERS ARE RELATED; four with something running down
    // them say WHICH WAY. The direction is a property of two things together — the path's own
    // start point and the SIGN of the dash offset — so both are held here.
    renderSlide(RECAP_POSE);
    for (const lever of C.levers) {
      const current = box(`levers-current-${lever.id}`);
      expect(current.getAttribute("class"), lever.id).toContain("kl-arrive");
      const path = current.querySelector("path");
      expect(path?.getAttribute("class"), lever.id).toBe("kl-current");
      // Brighter than the route it rides: the curve is the road, this is the traffic.
      expect(path?.getAttribute("stroke"), lever.id).toBe("var(--copper-300)");
      // It arrives only after the route beneath it has finished drawing — a current on a line
      // that is still drawing runs off the end of its own road.
      const drawn = Number.parseFloat(box(`levers-connector-${lever.id}`).style.animationDelay);
      expect(Number.parseFloat(current.style.animationDelay), lever.id).toBeGreaterThan(drawn);
    }
    const css = readFileSync(CSS_PATH, "utf8");
    // NEGATIVE, because `connectorPath` starts at the LEVER: a negative offset travels in the
    // +path direction, which is card → `YOU`. A positive one would run all four backwards, out
    // of the signature and up into the levers.
    const period = css.match(/@keyframes kl-current \{[\s\S]*?stroke-dashoffset:\s*(-?[\d.]+)/);
    expect(period, "no kl-current keyframe").not.toBeNull();
    expect(Number.parseFloat(period?.[1] ?? "0")).toBeLessThan(0);
    // And one whole dash period, so the loop closes on itself with no seam.
    const dash = css.match(/\.kl-current \{[\s\S]*?stroke-dasharray:\s*([\d.]+)\s+([\d.]+)/);
    const on = Number.parseFloat(dash?.[1] ?? "0");
    const off = Number.parseFloat(dash?.[2] ?? "0");
    expect(Math.abs(Number.parseFloat(period?.[1] ?? "0"))).toBe(on + off);
  });
});

// ── §6.6 · the four levers are not a third ladder ────────────────────────────

describe("§6.6 · the four levers are not a third ladder", () => {
  const LADDER_WORDS: readonly [string, RegExp][] = [
    ["a level", /\blevels?\b/i],
    ["a rung", /\brungs?\b/i],
    ["a phase", /\bphases?\b/i],
    ["a stage", /\bstages?\b/i],
    ["a maturity", /\bmaturity\b/i],
  ];

  test("every pattern still fires on the vocabulary it was read off", () => {
    const control = "Level three is the rung this phase reaches at that stage of maturity.";
    for (const [name, pattern] of LADDER_WORDS) {
      expect(pattern.test(control), `${name} no longer matches`).toBe(true);
    }
  });

  test("no authored string and no rendered string names one", () => {
    for (const [name, pattern] of LADDER_WORDS) {
      for (const copy of authored()) {
        expect(pattern.test(copy), `"${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
    }
    for (const pose of POSES) {
      const { container } = renderSlide(pose);
      for (const [name, pattern] of LADDER_WORDS) {
        expect(pattern.test(stageText(container)), `"${name}" at pose ${pose}`).toBe(false);
      }
      cleanup();
    }
  });

  test("gives the levers no ordinal of any kind — the trap four hero poses set", () => {
    // FOUR HERO POSES INVITE AN EYEBROW READING "LEVER ONE", and an ordinal on an eyebrow is
    // how a list of four acts becomes a ladder by accident. Every hero's eyebrow is the
    // lever's own name and nothing else.
    const ORDINAL = /\b(?:first|second|third|fourth|one|two|three|step|no\.)\b/i;
    for (const lever of C.levers) {
      expect(ORDINAL.test(lever.label), lever.label).toBe(false);
      expect(/\d/.test(lever.id), lever.id).toBe(false);
    }
    for (const pose of HERO_POSES) {
      renderSlide(pose);
      const eyebrow = box(`levers-hero-eyebrow-${C.levers[pose].id}`);
      expect(eyebrow.textContent).toBe(C.levers[pose].label);
      cleanup();
    }
    // No `order`, `index`, `rank` or `level` field anywhere in the data.
    for (const lever of C.levers) {
      for (const key of Object.keys(lever)) {
        expect(key, `${lever.id}.${key}`).not.toMatch(/^(?:order|index|rank|level|step)$/);
      }
    }
  });

  test("ranks none of the four — one colour tier per role, at both scales", () => {
    for (const pose of HERO_POSES) {
      renderSlide(pose);
      const lever = C.levers[pose];
      expect(box(`levers-hero-act-${lever.id}`).style.color).toBe("var(--neutral-50)");
      expect(box(`levers-hero-note-${lever.id}`).style.color).toBe("var(--neutral-300)");
      expect(box(`levers-hero-act-${lever.id}`).style.fontSize).toBe(`${HERO_ACT_SIZE}px`);
      cleanup();
    }
    renderSlide(RECAP_POSE);
    const labelTiers = new Set(
      C.levers.map((lever) => box(`levers-recap-label-${lever.id}`).style.color),
    );
    const lineTiers = new Set(
      C.levers.map((lever) => box(`levers-recap-line-${lever.id}`).style.color),
    );
    expect(labelTiers.size).toBe(1);
    expect(lineTiers.size).toBe(1);
    // AND THE ONE RANK THAT IS ALLOWED: the box the four arrive at, against the four cards.
    const cardFrame = box(`levers-recap-card-${C.levers[0].id}`).style.border;
    expect(box("levers-sign-box").style.border).not.toBe(cardFrame);
  });
});

// ── the shelves ──────────────────────────────────────────────────────────────

describe("the shelves this slide moved onto", () => {
  test("stands its ask where K.1 and K.2 stand theirs — 590, 19px, upright", () => {
    renderSlide(THESIS_POSE);
    const thesis = box("levers-thesis");
    expect(thesis.tagName).toBe("P");
    expect(thesis.textContent).toBe(C.closer);
    expect(thesis.style.left).toBe(`${SIDE_MARGIN}px`);
    expect(thesis.style.top).toBe("590px");
    expect(thesis.style.width).toBe(`${CONTENT_WIDTH}px`);
    expect(thesis.style.height).toBe(`${THESIS_HEIGHT}px`);
    expect(thesis.style.fontSize).toBe("19px");
    expect(thesis.style.fontFamily).toBe("var(--serif)");
    // NOT ITALIC ANY MORE. The retired ask was 20px serif italic on 572, which made the last
    // three slides of the deck end their arguments in two registers on two shelves.
    expect(thesis.style.fontStyle).toBe("");
    expect(THESIS_TOP).toBe(590);
    expect(THESIS_TEXT_SIZE).toBe(19);
  });

  test("puts a copper rule over the ask, and only over the ask", () => {
    renderSlide(RECAP_POSE);
    expect(mounted("levers-rule")).toBe(false);
    goToPose(THESIS_POSE);
    const rule = box("levers-rule");
    expect(rule.style.top).toBe(`${RULE_TOP}px`);
    expect(rule.style.width).toBe(`${CONTENT_WIDTH}px`);
    expect(RULE_TOP).toBe(553);
    expect(THESIS_TOP - RULE_TOP - 1).toBe(36);
    expect(rule.querySelector(".copper-rule")).not.toBeNull();
  });

  test("prints the five scene lines on the ask's own shelf, one tier down", () => {
    for (const pose of HERO_POSES) {
      renderSlide(pose);
      const line = box(`levers-hero-thesis-${C.levers[pose].id}`);
      expect(line.style.top).toBe(`${THESIS_TOP}px`);
      expect(line.style.fontSize).toBe(`${THESIS_TEXT_SIZE}px`);
      expect(line.style.color).toBe("var(--neutral-200)");
      cleanup();
    }
    renderSlide(RECAP_POSE);
    expect(box("levers-recap-thesis").style.top).toBe(`${THESIS_TOP}px`);
    expect(box("levers-recap-thesis").style.color).toBe("var(--neutral-200)");
    goToPose(THESIS_POSE);
    expect(box("levers-thesis").style.color).toBe("var(--neutral-100)");
  });
});

// ── the geometry ─────────────────────────────────────────────────────────────

describe("geometry", () => {
  test("keeps every scene clear of the rule the ask stands over", () => {
    expect(BODY_TOP).toBe(EYEBROW_TOP + LABEL_HEIGHT + 26);
    expect(SCENE_FLOOR).toBe(RULE_TOP);
    expect(HERO_FLOOR).toBeLessThanOrEqual(SCENE_FLOOR);
    expect(RECAP_FLOOR).toBeLessThanOrEqual(SCENE_FLOOR);
    expect(THESIS_TOP + THESIS_HEIGHT).toBe(NAV_ZONE_TOP - NAV_ZONE_CLEARANCE);
    expect(NAV_ZONE_TOP).toBe(STAGE.height - 88);
  });

  test("centres the hero's mark and its words on one middle line", () => {
    const centre = (BODY_TOP + SCENE_FLOOR) / 2;
    expect(Math.abs(HERO_GLYPH_TOP + HERO_GLYPH_SIZE / 2 - centre)).toBeLessThanOrEqual(1);
    renderSlide(0);
    const first = C.levers[0];
    expect(px(`levers-hero-mark-${first.id}`, "left")).toBe(HERO_GLYPH_LEFT);
    expect(px(`levers-hero-mark-${first.id}`, "top")).toBe(HERO_GLYPH_TOP);
    expect(px(`levers-hero-act-${first.id}`, "left")).toBe(HERO_TEXT_LEFT);
    expect(px(`levers-hero-act-${first.id}`, "top")).toBe(HERO_TEXT_TOP);
    expect(px(`levers-hero-note-${first.id}`, "top")).toBe(HERO_NOTE_TOP);
    // The words start clear of the mark and end on the content edge.
    expect(HERO_TEXT_LEFT).toBeGreaterThan(HERO_GLYPH_LEFT + HERO_GLYPH_SIZE);
    expect(HERO_TEXT_LEFT + HERO_TEXT_WIDTH).toBe(SIDE_MARGIN + CONTENT_WIDTH);
    expect(HERO_NOTE_TOP).toBe(HERO_TEXT_TOP + HERO_ACT_HEIGHT + 22);
  });

  test("tiles the recap into equal cards with no remainder", () => {
    renderSlide(RECAP_POSE);
    C.levers.forEach((lever, i) => {
      const card = box(`levers-recap-card-${lever.id}`);
      expect(card.style.left, lever.id).toBe(`${recapCardLeft(i)}px`);
      expect(card.style.top, lever.id).toBe(`${RECAP_CARD_TOP}px`);
      expect(card.style.width, lever.id).toBe(`${RECAP_CARD_WIDTH}px`);
      expect(card.style.height, lever.id).toBe(`${RECAP_CARD_HEIGHT}px`);
    });
    expect(recapCardLeft(0)).toBe(SIDE_MARGIN);
    expect(recapCardLeft(LEVER_COUNT - 1) + RECAP_CARD_WIDTH).toBe(SIDE_MARGIN + CONTENT_WIDTH);
    expect(() => recapCardLeft(LEVER_COUNT)).toThrow(/no card 4/);
    expect(() => recapCardLeft(-1)).toThrow(/no card -1/);
  });

  test("runs every connector from its own card to the one box", () => {
    const boxCentre = SIGN_BOX_LEFT + SIGN_BOX_WIDTH / 2;
    expect(SIGN_BOX_LEFT + SIGN_BOX_WIDTH / 2).toBe(SIDE_MARGIN + CONTENT_WIDTH / 2);
    expect(CONNECTOR_Y0).toBeGreaterThan(RECAP_CARD_TOP + RECAP_CARD_HEIGHT);
    expect(CONNECTOR_Y1).toBeLessThan(SIGN_BOX_TOP);
    for (let i = 0; i < LEVER_COUNT; i += 1) {
      const d = connectorPath(i);
      // Leaves its own card's middle, arrives at the box's.
      expect(d.startsWith(`M ${recapCardCenterX(i)} ${CONNECTOR_Y0} `), `curve ${i}`).toBe(true);
      expect(d.endsWith(`${boxCentre} ${CONNECTOR_Y1}`), `curve ${i}`).toBe(true);
    }
    // Four different curves, so nothing is drawn twice on top of itself.
    expect(new Set(POSES.slice(0, LEVER_COUNT).map(connectorPath)).size).toBe(LEVER_COUNT);
  });

  test("keeps the sign box centred, and its note under it", () => {
    renderSlide(RECAP_POSE);
    const sign = box("levers-sign-box");
    expect(sign.style.left).toBe(`${SIGN_BOX_LEFT}px`);
    expect(sign.style.top).toBe(`${SIGN_BOX_TOP}px`);
    expect(sign.style.height).toBe(`${SIGN_BOX_HEIGHT}px`);
    expect(SIGN_NOTE_TOP).toBeGreaterThan(SIGN_BOX_TOP + SIGN_BOX_HEIGHT);
    expect(box("levers-sign-note").style.textAlign).toBe("center");
  });

  test("derives a mark's line weight from its size, so a hero is not a chip enlarged", () => {
    // The rule this slide had to break with its siblings: at 260px a `stroke-width: 1.6` in a
    // 20-unit box paints twenty-one pixels. The optical weight is the constant instead.
    expect(glyphStroke(HERO_GLYPH_SIZE, HERO_GLYPH_STROKE)).toBeCloseTo(
      (HERO_GLYPH_STROKE * GLYPH_VIEWBOX) / HERO_GLYPH_SIZE,
      6,
    );
    expect(glyphStroke(HERO_GLYPH_SIZE, HERO_GLYPH_STROKE) * (HERO_GLYPH_SIZE / GLYPH_VIEWBOX)).toBe(
      HERO_GLYPH_STROKE,
    );
    expect(
      glyphStroke(RECAP_GLYPH_SIZE, RECAP_GLYPH_STROKE) * (RECAP_GLYPH_SIZE / GLYPH_VIEWBOX),
    ).toBe(RECAP_GLYPH_STROKE);
    // The hero's line is heavier than the chip's IN STAGE PIXELS and lighter IN UNITS, which
    // is exactly the inversion the naive shared constant gets wrong.
    expect(HERO_GLYPH_STROKE).toBeGreaterThan(RECAP_GLYPH_STROKE);
    expect(glyphStroke(HERO_GLYPH_SIZE, HERO_GLYPH_STROKE)).toBeLessThan(
      glyphStroke(RECAP_GLYPH_SIZE, RECAP_GLYPH_STROKE),
    );
    expect(() => glyphStroke(0, HERO_GLYPH_STROKE)).toThrow(/no line weight/);
  });

  test("writes the derived weight onto the mark the figure renders", () => {
    renderSlide(0);
    const hero = box(`levers-hero-glyph-${C.levers[0].id}`);
    expect(hero.style.getPropertyValue("--kl-stroke")).toBe(
      String(glyphStroke(HERO_GLYPH_SIZE, HERO_GLYPH_STROKE)),
    );
    goToPose(RECAP_POSE);
    const chip = box(`levers-recap-glyph-${C.levers[0].id}`);
    expect(chip.style.getPropertyValue("--kl-stroke")).toBe(
      String(glyphStroke(RECAP_GLYPH_SIZE, RECAP_GLYPH_STROKE)),
    );
  });
});

// ── the pointer ──────────────────────────────────────────────────────────────

describe("the pointer", () => {
  test("hands every box the hover chrome, and the whole box is the target", () => {
    // WHAT `.box-hover` PAINTS IS A ::before OVERLAY jsdom cannot compute, so what is held
    // here is the CLASS and WHERE IT SITS: on the node that carries the geometry, so the hover
    // rectangle is the painted box and not the text inside it.
    for (const [pose, ids] of HOVER_BOXES) {
      renderSlide(pose);
      for (const id of ids) {
        const el = box(id);
        expect(el.className, id).toContain("box-hover");
        expect(el.className, id).toContain("kl-card");
        // The geometry is on the SAME node — that is what makes the whole rectangle hoverable.
        expect(el.style.position, id).toBe("absolute");
        expect(el.style.width, id).not.toBe("");
        expect(el.style.height, id).not.toBe("");
        // And the border is inline, which is why the hover is a pseudo-element and not a
        // `:hover { border-color }` the stylesheet could never win.
        expect(el.style.border, id).toMatch(/^1px solid var\(--copper-\d{3}\)$/);
      }
      cleanup();
    }
  });

  test("gives every box's inner content no pointer of its own", () => {
    // ITEM 6, HELD STRUCTURALLY: nothing inside a card carries `pointer-events`, so a pointer
    // over the label, the mark, the hairline, the line or the padding is a pointer over the
    // card. An inner element that opted out of hit-testing would leave a hole in the box.
    renderSlide(RECAP_POSE);
    for (const lever of C.levers) {
      const card = box(`levers-recap-card-${lever.id}`);
      for (const child of Array.from(card.querySelectorAll("*"))) {
        expect(
          (child as HTMLElement).style.pointerEvents,
          `${lever.id} · ${child.getAttribute("data-testid") ?? child.tagName}`,
        ).toBe("");
      }
    }
  });

  test("keeps every sentence and every eyebrow off the pointer", () => {
    for (const [pose, ids] of INERT) {
      renderSlide(pose);
      for (const id of ids) {
        expect(box(id).style.pointerEvents, id).toBe("none");
      }
      cleanup();
    }
  });

  test("draws the connectors on a layer that cannot swallow a hover", () => {
    renderSlide(RECAP_POSE);
    expect(box("levers-connectors").getAttribute("class")).toContain("svg-layer");
  });
});

// ── the copy ─────────────────────────────────────────────────────────────────

describe("the copy", () => {
  test("names no day of the week", () => {
    // The retired headings read "THE LEVERS · WHAT YOU DO ON MONDAY". A weekday is a date the
    // deck cannot keep and a room cannot check, and it reads as an instruction about a
    // calendar rather than about a decision.
    const DAYS = /\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i;
    expect(DAYS.test("Put it in the calendar on Monday")).toBe(true);
    for (const copy of authored()) {
      expect(DAYS.test(copy), JSON.stringify(copy)).toBe(false);
    }
    for (const pose of POSES) {
      const { container } = renderSlide(pose);
      expect(DAYS.test(stageText(container)), `pose ${pose}`).toBe(false);
      cleanup();
    }
  });

  test("prints no digit and no figure reference on any pose", () => {
    for (const pose of POSES) {
      const { container } = renderSlide(pose);
      const text = stageText(container);
      expect(/\d/.test(text), `a digit at pose ${pose}: ${text}`).toBe(false);
      expect(/\b[A-Z]\.\d\b/.test(text), `a figure reference at pose ${pose}`).toBe(false);
      cleanup();
    }
    for (const copy of authored()) {
      expect(/\b[A-Z]\.\d\b/.test(copy), JSON.stringify(copy)).toBe(false);
    }
  });

  test("keeps every string inside its box's budget", () => {
    for (const lever of C.levers) {
      expect(lever.act.length, `${lever.id} act`).toBeLessThanOrEqual(HERO_ACT_BUDGET_CHARS);
      expect(lever.note.length, `${lever.id} note`).toBeLessThanOrEqual(HERO_NOTE_BUDGET_CHARS);
      expect(lever.short.length, `${lever.id} short`).toBeLessThanOrEqual(
        RECAP_LINE_BUDGET_CHARS,
      );
      expect(lever.thesis.length, `${lever.id} thesis`).toBeLessThanOrEqual(
        THESIS_BUDGET_CHARS,
      );
    }
    expect(C.recapThesis.length).toBeLessThanOrEqual(THESIS_BUDGET_CHARS);
    expect(C.closer.length).toBeLessThanOrEqual(THESIS_BUDGET_CHARS);
    // The labels are the narrowest boxes on the recap and are set on one line.
    for (const lever of C.levers) {
      expect(lever.label.length, lever.label).toBeLessThanOrEqual(20);
    }
  });

  test("exactly the prose strings carry a *Kw sibling, and every keyword is real", () => {
    const withKw = new Set<string>();
    for (const [, text, kw] of PROSE_BOXES()) {
      withKw.add(text);
      expect(kw.length, JSON.stringify(text)).toBeGreaterThan(0);
      for (const k of kw) {
        expect(text.includes(k), `"${k}" is not in ${JSON.stringify(text)}`).toBe(true);
      }
    }
    // AND NO LABEL DOES. A copper italic inside an uppercase name would emphasise a fragment
    // of it and read as a rendering fault.
    for (const [, label] of LABEL_BOXES()) {
      expect(withKw.has(label), JSON.stringify(label)).toBe(false);
    }
    expect(C.headlineKw.every((k) => C.headline.includes(k))).toBe(true);
  });

  test("renders one <em> per keyword in every prose box, and none in a label", () => {
    for (const [id, text, kw] of PROSE_BOXES()) {
      renderSlide(poseOf(id));
      const el = box(id);
      expect(el.textContent, id).toBe(text);
      expect(el.querySelectorAll("em"), id).toHaveLength(kw.length);
      cleanup();
    }
    for (const [id, label] of LABEL_BOXES()) {
      renderSlide(poseOf(id));
      const el = box(id);
      expect(el.textContent, id).toBe(label);
      expect(el.querySelectorAll("em"), id).toHaveLength(0);
      expect(el.style.fontFamily, id).toBe("var(--mono)");
      cleanup();
    }
  });

  test("carries no stray markup — the data is plain strings", () => {
    for (const copy of authored()) {
      expect(copy, JSON.stringify(copy)).not.toMatch(/[<>]/);
    }
  });

  test("has no brand axis in it at all", () => {
    expect(Object.keys(C)).not.toContain("byBrand");
    for (const key of Object.keys(C)) {
      expect(key).not.toMatch(/brand/i);
    }
  });
});

// ── motion ───────────────────────────────────────────────────────────────────

describe("motion", () => {
  test("mounts zero SMIL nodes at every pose, under either preference", () => {
    for (const reduce of [false, true]) {
      const mql = vi.fn().mockImplementation((query: string) => ({
        matches: reduce && query.includes("reduce"),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      vi.stubGlobal("matchMedia", mql);
      for (const pose of POSES) {
        const { container, unmount } = renderSlide(pose);
        expect(
          container.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
            .length,
          `SMIL at pose ${pose}, reduce=${reduce}`,
        ).toBe(0);
        // NOTHING READS `matchMedia` AT MOUNT, which is the property that makes the global
        // reduced-motion squash the whole answer: every mark here is a CSS animation.
        expect(mql, `matchMedia read at pose ${pose}`).not.toHaveBeenCalled();
        unmount();
      }
      vi.unstubAllGlobals();
    }
  });

  test("ranks nothing by opacity — no inline opacity anywhere on the stage", () => {
    // Opacity on a step-reveal deck means "not revealed yet", i.e. TIME. Rank is a colour
    // tier and never an alpha.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      for (const el of Array.from(container.querySelectorAll<HTMLElement>("[style]"))) {
        expect(el.style.opacity, `pose ${pose} · ${el.getAttribute("data-testid")}`).toBe("");
      }
      unmount();
    }
  });
});

// ── the stylesheet ───────────────────────────────────────────────────────────

describe("the stylesheet", () => {
  // READ OFF DISK AND NOT IMPORTED. Vite resolves a `.css` import to an injected stylesheet
  // and jsdom computes no stylesheet at all, so the only way to hold a rule over this file's
  // CONTENT in a jsdom suite is to read the bytes.
  const css = readFileSync(CSS_PATH, "utf8");

  test("prefixes every keyframe with the figure's own name", () => {
    const names = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
    expect(names.length, "a rule over no keyframes proves nothing").toBeGreaterThan(5);
    names.forEach((name) => expect(name, name).toMatch(/^kl-/));
  });

  test("uses tokens only — no hex, no rgb(), no bare colour", () => {
    const declarations = css.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(declarations).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(declarations).not.toMatch(/\brgba?\(/);
    const tokens = [...declarations.matchAll(/var\(--([\w-]+)\)/g)].map((m) => m[1]);
    expect(tokens.length).toBeGreaterThan(5);
    // `kl-stroke` is this figure's own custom property and not a colour — it carries the line
    // weight the geometry module derives, which is the one thing this stylesheet cannot know.
    tokens.forEach((token) =>
      expect(token, token).toMatch(/^(?:ease|kl-stroke|copper-\d{3}|neutral-\d{1,3})$/),
    );
  });

  test("names every infinite animation in its reduced-motion block", () => {
    const block = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
    expect(block.length, "there is no reduced-motion block at all").toBeGreaterThan(200);
    const infinite = new Set(
      [...css.matchAll(/\.([\w-]+)\s*\{[^}]*animation:[^;]*\binfinite\b/g)].map((m) => m[1]),
    );
    // THE FLOOR IS A REGEX GUARD AND NOT A BUDGET. It exists so that a pattern which silently
    // stops matching cannot turn the `forEach` below into a loop over nothing — the real
    // assertion is the one inside it. So the number tracks reality rather than constraining it,
    // and lowering it is legitimate exactly when a rule is REMOVED.
    //
    // IT WAS 8 UNTIL 2026-08-16 AND IS 7 NOW, and the arithmetic is worth writing down because
    // "the floor went down" is otherwise indistinguishable from "somebody silenced a failure".
    // `kl-churn` ran on FOUR delayed classes and went out with the week glyph when this slide's
    // first lever stopped being about booking time; `kl-walk` replaced all four with ONE. So the
    // set is `kl-current` plus `walk`, `guard`, `lift`, `pass`, `drop`, `review` — seven, and
    // every one of them is named in the block below.
    expect(infinite.size).toBeGreaterThanOrEqual(7);
    infinite.forEach((cls) =>
      expect(block, `${cls} is not disarmed under reduced motion`).toContain(`.${cls}`),
    );
    // A draw rule left with its dasharray and no offset flashes an undrawn frame.
    expect(block).toMatch(/stroke-dashoffset:\s*0/);
  });

  test("declares transform-box, so an origin resolves against the mark and not the stage", () => {
    expect(css).toMatch(/\[class\*="kl-anim"\][\s\S]*?transform-box:\s*fill-box/);
  });

  test("reaches the two things the hover overlay cannot — the hairline and the strokes", () => {
    expect(css).toMatch(/\.kl-card:hover \.kl-hairline\s*\{/);
    expect(css).toMatch(/\.kl-card:hover \.kl-glyph :is\(/);
    expect(css).toMatch(/\.kl-card:hover \.kl-glyph \.kl-solid\s*\{/);
    // AND IT ADDS LIGHT RATHER THAN SUBTRACTING IT (§7.1): no rule under `:hover` dims a
    // sibling, so the boxes beside the pointer are byte for byte unchanged.
    expect(css).not.toMatch(/:hover[^{]*\{[^}]*opacity:\s*0?\.\d/);
  });

  test("takes its line weight from the caller and states it once", () => {
    expect(css).toMatch(/stroke-width:\s*var\(--kl-stroke\)/);
    expect(css).toMatch(/stroke-width:\s*calc\(var\(--kl-stroke\)/);
    // No literal stroke width survives: a number here would be the constant the re-cut removed.
    expect(css.replace(/\/\*[\s\S]*?\*\//g, "")).not.toMatch(/stroke-width:\s*[\d.]+\s*;/);
  });
});

// ── the axis this slide does NOT have ────────────────────────────────────────

describe("both leader decks print the same stage", () => {
  // The four levers are generic and identical across brands, and this slide holds that in the
  // strongest available form: it resolves no brand block at all. That is a claim about MODULE
  // EPOCHS — `VARIANT` resolves at module scope — so it cannot be checked inside the one epoch
  // every test above runs in. Two epochs, byte for byte.
  //
  // NOT `SlideHarness`, deliberately: it imports `composedDeck` statically and would hand a
  // freshly loaded slide a stale context object.
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
        import("@/slides/leader-mandate/mandate-levers"),
      ]);

    const row = composedDeck.slides.find((s) => s.def.id === "mandate-levers");
    if (!row) throw new Error(`${variant} composes no mandate-levers`);

    function AdvanceTo({ step }: { step: number }) {
      const { goTo } = useDeckIn();
      return <button data-testid="goto-epoch" onClick={() => goTo(0, step)} />;
    }

    const { container } = render(
      <DeckProvider stepCounts={[slide.mandateLeversSlide.steps]}>
        <SlideNumberProvider
          value={{ letter: row.letter, num: row.num, sectionKey: row.sectionKey }}
        >
          <AdvanceTo step={slide.mandateLeversSlide.canonicalPose} />
          <slide.MandateLevers />
        </SlideNumberProvider>
      </DeckProvider>,
    );
    act(() => screen.getByTestId("goto-epoch").click());
    return container.textContent ?? "";
  }

  test("byte for byte, at the fullest pose", async () => {
    // SEQUENTIALLY, not `Promise.all`. Each call re-points `window.location`, resets the module
    // registry and renders into the SAME document — run concurrently they interleave, two
    // stages share one DOM, and every `getByTestId` finds two elements.
    const berau = await stageTextFor(LEADER_VARIANTS[0]);
    const gems = await stageTextFor(LEADER_VARIANTS[1]);
    // Includes the fig label, so this also says the two decks compose the slide at the same
    // position — which they do, from one shared `LEADER_SLIDE_IDS`.
    expect(berau).toBe(gems);
    // Not vacuously: a stage that rendered nothing would also be equal. The canonical pose is
    // the recap under the ask, so all four cards and the closer are on it.
    for (const lever of C.levers) {
      expect(berau).toContain(lever.label);
      expect(berau).toContain(lever.short);
    }
    expect(berau).toContain(C.signLabel);
    expect(berau).toContain(C.closer);
  });
});
