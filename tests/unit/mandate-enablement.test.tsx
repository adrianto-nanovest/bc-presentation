// THE ENABLEMENT MODEL · slide tests. All four poses.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so nothing here
// measures a pixel a browser would place — every geometric claim is asserted as
// the ONE NUMBER both sides read (`../../src/slides/leader-mandate/geometry.ts`),
// and the composition itself was walked at 1280×720. What jsdom is good for is
// what this slide is actually at risk of, and it is not a layout fault:
//
//   1. THE EPISTEMIC RULE. §6.8 allows this slide exactly one specific claim —
//      DigiTech's own stated bottleneck, quoted and attributed — and forbids
//      everything else about either organisation's adoption. That is a rule over
//      EVERY RENDERED STRING AT EVERY POSE, which is checkable here and nowhere
//      else. It is the first block below for that reason.
//   2. THE TWO ORDINAL ENCODINGS AGREEING. A lane's width and its colour tier
//      both say "further down the column", and they are computed in two different
//      modules from one shared fraction. Three lanes where the narrowest is not
//      the brightest is a figure making two claims about one track and looking
//      finished while it does it.
//   3. BRAND INVARIANCE, which this slide asserts by having no brand axis at all.
//      That is a claim about two module epochs and is proved by rendering both.
//
// ONE EPOCH FOR EVERYTHING EXCEPT THAT LAST BLOCK. The component reads no
// `VARIANT` and the slide file resolves no brand block — the only leader-only
// slide in the tree of which that is true — so the whole stage mounts in the
// default `general` epoch through `SlideHarness`. The brand-invariance block at
// the foot of this file is the exception and says why it has to be.
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
  STATED_NOT_MEASURED,
  mandateEnablementContent,
} from "@/slides/leader-mandate/content";
import {
  BAND_HEIGHT,
  BAND_TOP,
  BODY_HEIGHT,
  BODY_TOP,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  COLUMN_WIDTH,
  CONTENT_WIDTH,
  DIVIDER_X,
  NARROWEST_LANE,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  ONE_LINE_BUDGET_CHARS,
  PILLAR_ROW_HEIGHT,
  SIDE_MARGIN,
  STAGE,
  TRACK_ROW_HEIGHT,
  laneFraction,
  laneWidth,
  rowPitch,
  rowTop,
} from "@/slides/leader-mandate/geometry";
// The Capability Ladder's GEMS block, imported for ONE assertion — see
// "quotes the brief the same way the Capability Ladder does" below. Nothing in
// production couples these two sections; this is the test standing in for a
// coupling that would have cost more than it bought.
import { capabilityLadderFor } from "@/slides/leader-gap/content";

const C = mandateEnablementContent;
const POSES = [0, 1, 2, 3] as const;

/**
 * The position the slide holds in the deck it actually composes into.
 *
 * `at` IS required here, and it is the one case `SlideHarness` documents: unit
 * tests resolve the default `general` deck, `general` has no leader variant, and
 * this slide reaches the two leader deck sets ALONE. So there is no derived
 * position to look up — which is itself the fact `deck-numbering-fixture` and
 * `deck-registry` prove, from the decks that do run it.
 *
 * A HARNESS INPUT AND NOT A CLAIM THE SLIDE MAKES. K.1 is what the composed
 * leader decks derive today; nothing under `src/slides/leader-mandate/` names it,
 * and if a Phase 7 run ever landed in front of `mandate` this constant would move
 * while no source file did.
 */
const AT = { letter: "K", num: 1, sectionKey: "mandate" } as const;

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

/** Every `data-testid` the stage prints copy into, at the fullest pose. Built from
 *  the content so a pillar or track added later is covered by existing. */
const COPY_BOXES: readonly string[] = [
  "mandate-pillars-heading",
  "mandate-tracks-heading",
  ...C.pillars.flatMap((p) => [`mandate-pillar-label-${p.id}`, `mandate-pillar-line-${p.id}`]),
  ...C.tracks.flatMap((t) => [`mandate-track-name-${t.id}`, `mandate-track-line-${t.id}`]),
  "mandate-bottleneck-eyebrow",
  "mandate-bottleneck-statement",
  "mandate-bottleneck-source",
  "mandate-closer",
];

/** The mono LABEL register — every string that must never be rendered through the
 *  highlighter. The two column headings, the seven names, the band's eyebrow and
 *  its citation. See the keyword rule at the top of `../content.ts`. */
const LABEL_BOXES: readonly string[] = [
  "mandate-pillars-heading",
  "mandate-tracks-heading",
  ...C.pillars.map((p) => `mandate-pillar-label-${p.id}`),
  ...C.tracks.map((t) => `mandate-track-name-${t.id}`),
  "mandate-bottleneck-eyebrow",
  "mandate-bottleneck-source",
];

/** Every authored string this slide can print, label and prose alike. */
const ALL_AUTHORED: readonly string[] = [
  C.figLabel,
  C.headline,
  C.pillarsHeading,
  C.tracksHeading,
  ...C.pillars.flatMap((p) => [p.label, p.line]),
  ...C.tracks.flatMap((t) => [t.name, t.line]),
  C.bottleneck.eyebrow,
  C.bottleneck.statement,
  C.bottleneck.source,
  C.closer,
];

/** The one line of prose per row that `../geometry.ts` budgets space for. */
const BODY_LINES: readonly [string, string][] = [
  ...C.pillars.map((p): [string, string] => [`pillar ${p.id}`, p.line]),
  ...C.tracks.map((t): [string, string] => [`track ${t.id}`, t.line]),
];

// ── the def ──────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, four steps, closing on the fullest pose", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins
    // the value).
    expect(mandateEnablementSlide.id).toBe("mandate-enablement");
    expect(mandateEnablementSlide.steps).toBe(4);
    // The exports print `canonicalPose` and nothing else, so a canonical pose
    // short of the last one would ship a PDF in which another organisation's
    // quoted bottleneck stands with the sentence that frames it missing.
    expect(mandateEnablementSlide.canonicalPose).toBe(mandateEnablementSlide.steps - 1);
    expect(mandateEnablementSlide.sectionKey).toBe("mandate");
    expect(mandateEnablementSlide.animationMode).toBe("step-reveal");
    expect(mandateEnablementSlide.surface).toBe("dark");
  });
});

// ── the epistemic rule (§6.8, and the issue's third AC) ──────────────────────

describe("exactly one string on this slide is specific", () => {
  /**
   * The organisations this deck knows by name, and the names it knows them by.
   *
   * DERIVED WHERE IT CAN BE. Every registered brand contributes its own name, so
   * a fourth brand is covered by being registered rather than by being added
   * here — the same reason `gap-capability-ladder.test.tsx` walks `BRANDS`
   * instead of a slide's own key set. The four literals are what `BRANDS` cannot
   * supply: the two tech functions, the platform the deck cites, and us.
   *
   * THE FIVE GEMS PRODUCT NAMES ARE DELIBERATELY ABSENT (`GEMVIS` aside, which
   * this deck cites twice). They are A.1's content and A.1's rule to hold, and
   * one of them — `FAMOUS` — is an ordinary English word, so it would fire on
   * prose that names no organisation at all. A list that cries wolf is a list
   * everybody learns to widen.
   */
  const ORGANISATION_WORDS: readonly string[] = [
    ...Object.values(BRANDS)
      .map((row) => row.label.replace(/\s*AI Catalyst Workshop$/, "").trim())
      // `general`'s label is the workshop's name alone, so it strips to nothing —
      // which is correct: the brand that names no organisation contributes no word.
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

  test("names an organisation in the bottleneck's source line and nowhere else", () => {
    // THE ISSUE'S THIRD AC, mechanically. §6.8 gives this slide one specific
    // claim and generic everything else, and the only way to hold that over copy
    // is to allow exactly one string to name an organisation and forbid it in the
    // rest — at every pose, because a pose is what a room actually sees.
    //
    // Read off the RENDERED stage, not off the content object: the content could
    // be clean and a component could still print `VARIANT.brand` into a label.
    renderSlide(3);
    for (const id of COPY_BOXES) {
      const text = screen.getByTestId(id).textContent ?? "";
      const named = ORGANISATION_WORDS.filter((word) => text.includes(word));
      if (id === "mandate-bottleneck-source") {
        // The one exception, asserted as a POSITIVE: the attribution must name
        // the organisation whose brief this is, or the quote is unattributed.
        expect(named, id).toContain("DigiTech");
        continue;
      }
      expect(named, `${id}: ${JSON.stringify(text)}`).toEqual([]);
    }
  });

  test("keeps that true at every pose, including the ones before the band arrives", () => {
    // The pillars and the tracks are the generic half of §6.8 and are on screen
    // for three poses before the specific half arrives. A brand word in a pillar
    // line would be an assertion about an organisation made while the slide was
    // still claiming to be generic.
    for (const pose of POSES) {
      const { unmount } = renderSlide(pose);
      const stage = document.body.textContent ?? "";
      const source = screen.queryByTestId("mandate-bottleneck-source")?.textContent ?? "";
      const rest = stage.replace(source, "");
      for (const word of ORGANISATION_WORDS) {
        expect(rest, `pose ${pose} · ${word}`).not.toContain(word);
      }
      unmount();
    }
  });

  test("marks the bottleneck as stated rather than measured, in the source line itself", () => {
    // The deck holds NO adoption assessment for either organisation (§6.5,
    // confirmed on #8), so the band is a CLAIM ITS OWNER MADE. The qualifier is
    // copy and travels with the citation — a row copied into a status deck takes
    // it along — and it is asserted here rather than trusted because it is the
    // first thing a reword drops for space.
    renderSlide(2);
    const source = screen.getByTestId("mandate-bottleneck-source").textContent ?? "";
    expect(source.endsWith(STATED_NOT_MEASURED)).toBe(true);
  });

  test("prints the deck's compression unquoted and the brief's words quoted", () => {
    // THE THREE-LINE SPLIT IS THE HONESTY OF THE BAND. The statement is §6.8's
    // wording — ours — and must carry no quotation marks, because a paraphrase
    // inside quotes is a small lie that reads as a citation. The source is the
    // brief's own sentence and must carry them.
    renderSlide(2);
    const statement = screen.getByTestId("mandate-bottleneck-statement").textContent ?? "";
    const source = screen.getByTestId("mandate-bottleneck-source").textContent ?? "";
    expect(statement).not.toMatch(/[“”"]/);
    expect(source).toMatch(/“[^”]+”/);
  });

  test("quotes the brief the same way the Capability Ladder does", () => {
    // ONE SOURCE, QUOTED TWICE IN ONE DECK, and it has to be the same sentence
    // both times: `gap-capability-ladder` prints it under GEMS to license that
    // slide's open question, and this band prints it to name the bottleneck. A
    // room that hears one source worded two ways stops trusting the source.
    //
    // HELD HERE RATHER THAN SHARED IN PRODUCTION, deliberately. `leader-gap`
    // reaches its copy through a brand pick this slide does not have, so sharing
    // the string would mean importing another section's brand table for one
    // sentence — a coupling between two runs, to save a duplicated quotation. The
    // test is the cheaper half of that trade, and this comment is why it exists.
    const ladder = capabilityLadderFor("gems");
    const quoted = (s: string) => s.match(/“([^”]+)”/)?.[1];
    expect(quoted(ladder.open.evidence)).toBeDefined();
    expect(
      quoted(C.bottleneck.source),
      "the two quotations of DigiTech's brief have drifted apart — reword both or neither",
    ).toBe(quoted(ladder.open.evidence));
  });
});

// ── the pillars (generic, and unranked) ──────────────────────────────────────

describe("the four pillars", () => {
  test("are the content module's four, in order, each with its name and its line", () => {
    renderSlide(0);
    // FOUR, from the content module's own array rather than a literal here: the
    // rows, the pitch and the reveal stagger all index the same array, and a
    // literal would let this file disagree with the figure it is checking.
    expect(C.pillars).toHaveLength(4);
    C.pillars.forEach((pillar) => {
      expect(screen.getByTestId(`mandate-pillar-label-${pillar.id}`).textContent).toBe(
        pillar.label,
      );
      expect(screen.getByTestId(`mandate-pillar-line-${pillar.id}`).textContent).toBe(pillar.line);
    });
    // In DECK ORDER on the stage, not merely all present: the four are a
    // sequence — access, then teaching, then practice, then what stands after —
    // and a shuffled column still renders four correct rows.
    const rendered = screen
      .getAllByTestId(/^mandate-pillar-label-/)
      .map((el) => el.textContent);
    expect(rendered).toEqual(C.pillars.map((p) => p.label));
  });

  test("carry four IDENTICAL marks — the left column is not ranked", () => {
    // THE GEOMETRIC HALF OF THE ARGUMENT, and the half no string on the stage
    // says. A pillar that is missing takes the other three down with it, so a
    // brighter or larger mark on any one of them would be a claim nobody
    // authored — and the contrast with the deliberately UNEQUAL lanes opposite is
    // what a leader reads before reading a word.
    renderSlide(0);
    const marks = C.pillars.map(
      (p) => (screen.getByTestId(`mandate-pillar-mark-${p.id}`) as HTMLElement).style,
    );
    const shape = (s: CSSStyleDeclaration) => `${s.width}|${s.height}|${s.background}`;
    expect(new Set(marks.map(shape)).size).toBe(1);
    // And the mark is actually drawn, rather than identically absent.
    expect(marks[0].background).not.toBe("");
  });

  test("stand from pose 0 and never leave", () => {
    // The pillars are the figure the other three poses are laid over; a reveal
    // written per-pose is one keystroke from making them vanish when the tracks
    // arrive. Same failure `leader-shape`'s `showsPillars` exists to prevent.
    const { unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      C.pillars.forEach((p) => {
        expect(screen.getByTestId(`mandate-pillar-${p.id}`), `pose ${pose}`).toHaveClass("on");
      });
    }
    unmount();
  });
});

// ── the tracks (generic, and deliberately unequal) ───────────────────────────

describe("the three tracks", () => {
  test("are the content module's three, in order, each with its name and its line", () => {
    renderSlide(1);
    expect(C.tracks).toHaveLength(3);
    C.tracks.forEach((track) => {
      expect(screen.getByTestId(`mandate-track-name-${track.id}`).textContent).toBe(track.name);
      expect(screen.getByTestId(`mandate-track-line-${track.id}`).textContent).toBe(track.line);
    });
    expect(screen.getAllByTestId(/^mandate-track-name-/).map((el) => el.textContent)).toEqual(
      C.tracks.map((t) => t.name),
    );
  });

  test("draw lanes that narrow strictly, from the full column to the measured floor", () => {
    // ORDINAL AND ONLY ORDINAL. The widths say "fewer people than the lane above"
    // and nothing else; the first lane is the whole column and the last is
    // `NARROWEST_LANE`, which was cut against the longest track name rather than
    // chosen. Two lanes the same width would say two tracks reach the same number
    // of people, which is a claim nobody made.
    renderSlide(1);
    const widths = C.tracks.map((t) =>
      parseFloat((screen.getByTestId(`mandate-lane-${t.id}`) as HTMLElement).style.width),
    );
    expect(widths[0]).toBeCloseTo(COLUMN_WIDTH, 5);
    expect(widths.at(-1)).toBeCloseTo(COLUMN_WIDTH * NARROWEST_LANE, 5);
    widths.forEach((w, i) => {
      if (i > 0) expect(w, `lane ${i}`).toBeLessThan(widths[i - 1]);
    });
  });

  test("brighten as they narrow, so the two ordinal encodings agree", () => {
    // WIDTH IS HOW MANY, TIER IS HOW DEEP, and both are cut from the same
    // fraction (`laneFraction`). Asserted as the copper TOKEN NUMBER falling —
    // the ramp runs 950 (darkest) to 50 (brightest), so a lower token is a
    // brighter colour, and this file reads the number rather than importing the
    // component's private ramp. The failure this catches is the one that looks
    // finished: a tier table stepped by its own rule, so the widest lane ends up
    // the brightest and the figure ranks importance instead of depth.
    renderSlide(1);
    const tokens = C.tracks.map((t) => {
      const bg = (screen.getByTestId(`mandate-lane-${t.id}`) as HTMLElement).style.background;
      const token = bg.match(/var\(--copper-(\d+)\)/)?.[1];
      expect(token, `lane ${t.id} is not a copper CSS variable: ${bg}`).toBeDefined();
      return Number(token);
    });
    tokens.forEach((n, i) => {
      if (i > 0) expect(n, `lane ${i}`).toBeLessThan(tokens[i - 1]);
    });
  });

  test("keep every track's NAME and LINE on one shared tier", () => {
    // The other half of the tier decision, and the one that stops the ranking
    // from reading as importance: only the BAR is ranked. If the names dimmed
    // with the lanes, the figure would say the enablement of everyone matters
    // least — which is the claim the slide is arguing against.
    renderSlide(1);
    const colours = (suffix: string) =>
      new Set(
        C.tracks.map(
          (t) => (screen.getByTestId(`mandate-${suffix}-${t.id}`) as HTMLElement).style.color,
        ),
      );
    expect(colours("track-name").size).toBe(1);
    expect(colours("track-line").size).toBe(1);
  });
});

// ── the poses ────────────────────────────────────────────────────────────────

describe("the four poses", () => {
  test("arrive in order and nothing that arrived ever leaves", () => {
    // The whole reveal contract in one walk. Each pose adds one band; the slide
    // never subtracts, which is the same rule §7.1 settled for the sibling ring —
    // attention is bought with added light, never taken away.
    const { unmount } = renderSlide(0);
    const on = (id: string) => screen.getByTestId(id).classList.contains("on");
    const tracksOn = () => C.tracks.every((t) => on(`mandate-track-${t.id}`));

    expect(tracksOn()).toBe(false);
    expect(on("mandate-bottleneck")).toBe(false);
    expect(on("mandate-closer")).toBe(false);

    goToPose(1);
    expect(tracksOn()).toBe(true);
    expect(on("mandate-bottleneck")).toBe(false);
    expect(on("mandate-closer")).toBe(false);

    goToPose(2);
    expect(tracksOn()).toBe(true);
    expect(on("mandate-bottleneck")).toBe(true);
    expect(on("mandate-closer")).toBe(false);

    goToPose(3);
    expect(tracksOn()).toBe(true);
    expect(on("mandate-bottleneck")).toBe(true);
    expect(on("mandate-closer")).toBe(true);
    unmount();
  });

  test("walks backwards to the same poses it walked forwards through", () => {
    // Every gate is a function of the pose alone — no state, no "previously
    // shown" — so stepping back is arithmetic rather than cleanup. Asserted
    // because `ArrowLeft` is a key a presenter actually presses.
    const { unmount } = renderSlide(3);
    goToPose(0);
    expect(screen.getByTestId("mandate-closer")).not.toHaveClass("on");
    expect(screen.getByTestId("mandate-bottleneck")).not.toHaveClass("on");
    C.tracks.forEach((t) =>
      expect(screen.getByTestId(`mandate-track-${t.id}`)).not.toHaveClass("on"),
    );
    // And the pillars, which pose 0 owns, are exactly as they were.
    C.pillars.forEach((p) => expect(screen.getByTestId(`mandate-pillar-${p.id}`)).toHaveClass("on"));
    unmount();
  });

  test("declares both columns from pose 0, including the one still empty", () => {
    // A stage whose right half is blank AND unlabelled reads as a slide that
    // failed to finish. Under its own heading it reads as a promise — so the two
    // headings and the divider stand from the first pose, before either answer.
    renderSlide(0);
    expect(screen.getByTestId("mandate-pillars-heading").textContent).toBe(C.pillarsHeading);
    expect(screen.getByTestId("mandate-tracks-heading").textContent).toBe(C.tracksHeading);
    expect(screen.getByTestId("mandate-divider")).toBeInTheDocument();
  });

  test("prints the fig label from the composed position, and no letter of its own", () => {
    renderSlide(0);
    const fig = document.querySelector(".fig-label")?.textContent ?? "";
    expect(fig).toContain(C.figLabel);
    // The letter and number come from `SlideNumberContext`, which the harness
    // supplied — see `AT`. Nothing under `src/slides/leader-mandate/` names one.
    expect(fig).toContain(`${AT.letter}.${AT.num}`);
  });
});

// ── motion (the issue's sixth AC) ────────────────────────────────────────────

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

  test("mounts zero SMIL nodes at every pose — and no <svg> at all", () => {
    // ZERO BY CONSTRUCTION, WHICH IS WHY THE SECOND ASSERTION IS HERE. SMIL is
    // invisible to the global reduced-motion rule in globals.css — that rule
    // squashes CSS durations only — so a SMIL node has to be gated at mount, as
    // `E12LoopAnatomy` gates its `<animateMotion>`. This slide has no SVG layer,
    // so there is nothing to gate and nothing a later edit can forget. Asserting
    // the absence of `<svg>` as well as of the four SMIL tags is what keeps that
    // TRUE BY CONSTRUCTION rather than true today: the cheapest way to break this
    // slide's motion contract is to reach for one `<rect>`, and the rect is not
    // what would go wrong — it is the `<animate>` somebody adds to it next.
    //
    // SCOPED TO WHAT THIS DIRECTORY RENDERS, and not to `document`, because that is
    // the claim: `src/slides/leader-mandate/` mounts no SVG. `container` drops
    // anything jsdom holds outside this render, and `.fig-label` — the deck's own
    // caption, which this slide only calls — is dropped with it. `SlideHarness`
    // mounts no NavBar at all, so there is nothing else shared inside the tree. A
    // marker added to either shared component later would then be a failure of ITS
    // suite rather than of both of this section's.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      const figLabel = container.querySelector(".fig-label");
      for (const tag of ["animate", "animateMotion", "animateTransform", "set", "svg"]) {
        const ours = [...container.querySelectorAll(tag)].filter((el) => !figLabel?.contains(el));
        expect(ours, `pose ${pose} · <${tag}>`).toHaveLength(0);
      }
      unmount();
    }
  });

  test("still mounts every band the pose has reached, with its copy", () => {
    // WHAT THIS CAN AND CANNOT SAY. jsdom runs no animation, so "the pose rests
    // on its finished frame" is not checkable here — the global rule squashes a
    // duration jsdom never computes. This claims the DOM half: every band the
    // pose has reached is mounted, revealed, and carrying its text.
    renderSlide(3);
    for (const id of COPY_BOXES) {
      expect(screen.getByTestId(id).textContent, id).not.toBe("");
    }
    expect(screen.getByTestId("mandate-closer").textContent).toBe(C.closer);
  });
});

// ── the copy rules §6.8's build rules state, checked over the copy ───────────

describe("keywords go on prose only", () => {
  test("no heading, name, eyebrow or citation is rendered through the highlighter", () => {
    // Rendered check, not an authored one: `<em>` is what a highlight IS on the
    // stage, so this reads the DOM for one inside every label box. The CITATION
    // is the sharpest case — a copper italic inside somebody else's quoted
    // sentence is the deck emphasising a fragment of a source it is supposed to
    // be reporting.
    renderSlide(3);
    for (const id of LABEL_BOXES) {
      expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(0);
    }
  });

  test("every prose box does carry its highlight", () => {
    // The other direction, and not implied by the one above: a `*Kw` array that
    // silently stopped matching leaves copy that still reads, so nothing on the
    // stage says the emphasis was lost.
    renderSlide(3);
    const prose = [
      ...C.pillars.map((p) => `mandate-pillar-line-${p.id}`),
      ...C.tracks.map((t) => `mandate-track-line-${t.id}`),
      "mandate-bottleneck-statement",
      "mandate-closer",
    ];
    for (const id of prose) {
      expect(screen.getByTestId(id).querySelectorAll("em").length, id).toBeGreaterThan(0);
    }
  });

  test("every prose keyword is a substring of the copy it highlights", () => {
    // `highlight()` is a `String.includes` match that NO-OPS SILENTLY: a typo
    // drops a copper highlight with no error anywhere.
    const pairs: Array<[string, string, readonly string[]]> = [
      ["headline", C.headline, C.headlineKw],
      ["closer", C.closer, C.closerKw],
      ["bottleneck.statement", C.bottleneck.statement, C.bottleneck.statementKw],
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

  test("no authored string names a section letter or a figure number", () => {
    // §3.4 R2. `mandate` takes K today and the run behind it moved three letters
    // when this slide landed; a literal "K.1" or "SECTION K" in this copy would
    // be a lie on a projector the first time a Phase 7 slide opened a run in
    // front of it.
    ALL_AUTHORED.forEach((copy) => {
      expect(copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      expect(copy).not.toMatch(/\b[A-N]\.\d+\b/);
    });
  });

  test("carries no stray markup — the data is plain strings", () => {
    ALL_AUTHORED.forEach((copy) => expect(copy).not.toContain("<em"));
  });

  test("keeps every body line inside the one-line budget", () => {
    // `../geometry.ts` budgets exactly ONE line per row, so a line that wraps
    // does not overflow a box — it overlaps the row beneath it, and reads on a
    // projector as a font that failed to load. Enforced on the COPY, where an
    // author can act on it, because jsdom computes no text width.
    BODY_LINES.forEach(([where, line]) => {
      expect(line.length, `${where}: ${line.length} chars`).toBeLessThanOrEqual(
        ONE_LINE_BUDGET_CHARS,
      );
    });
  });
});

// ── the geometry, as the two sides agree on it ───────────────────────────────

describe("geometry", () => {
  test("bottoms both columns out on the same line, whatever their row counts", () => {
    // THE REASON `../geometry.ts` EXISTS. Four pillar rows and three track rows
    // share one body height, and the band under them spans both columns — so a
    // column that ended short would leave a visible ledge under one half of a
    // full-width border. Derived, not typed: this holds for any pair of counts.
    const pillarsEnd = rowTop(C.pillars.length - 1, PILLAR_ROW_HEIGHT, C.pillars.length) +
      PILLAR_ROW_HEIGHT;
    const tracksEnd = rowTop(C.tracks.length - 1, TRACK_ROW_HEIGHT, C.tracks.length) +
      TRACK_ROW_HEIGHT;
    expect(pillarsEnd).toBeCloseTo(BODY_HEIGHT, 6);
    expect(tracksEnd).toBeCloseTo(BODY_HEIGHT, 6);
  });

  test("stacks body, band and closer without overlap, clear of the NavBar's hover band", () => {
    // The vertical budget, worked from the floor upward. `.nav-zone` is
    // `bottom: 0; height: 88px`, so anything under y=632 sits behind the
    // presenter's own hover target.
    expect(BODY_TOP + BODY_HEIGHT).toBeLessThan(BAND_TOP);
    expect(BAND_TOP + BAND_HEIGHT).toBeLessThan(CLOSER_TOP);
    expect(CLOSER_TOP + CLOSER_HEIGHT).toBeLessThanOrEqual(NAV_ZONE_TOP);
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);
  });

  test("splits the stage evenly, so the divider falls on its centre", () => {
    // The equal split is an argument — neither column is the other's caption —
    // and the centred divider is its consequence rather than a number typed in.
    expect(SIDE_MARGIN + 2 * COLUMN_WIDTH + (CONTENT_WIDTH - 2 * COLUMN_WIDTH)).toBe(
      SIDE_MARGIN + CONTENT_WIDTH,
    );
    expect(DIVIDER_X).toBe(STAGE.width / 2);
  });

  test("refuses a row or a lane the figure does not have", () => {
    // A silently clamped row is a pillar drawn on top of another pillar, and a
    // clamped lane is a comparison the figure did not make — both look
    // deliberate on a stage, which is why these throw rather than saturate.
    expect(() => rowTop(4, PILLAR_ROW_HEIGHT, 4)).toThrow(/no row 4/);
    expect(() => rowTop(-1, PILLAR_ROW_HEIGHT, 4)).toThrow(/no row -1/);
    expect(() => rowTop(1.5, PILLAR_ROW_HEIGHT, 4)).toThrow(/no row 1.5/);
    expect(() => laneWidth(3, 3)).toThrow(/no lane 3/);
    expect(() => laneFraction(0, 1)).toThrow(/ORDINAL/);
    expect(() => rowPitch(PILLAR_ROW_HEIGHT, 1)).toThrow(/at least two/);
  });

  test("spreads a lane set of any size between the full column and the floor", () => {
    // The derivation, exercised past today's three: a fourth track must re-cut
    // the figure rather than run past `NARROWEST_LANE` or need a width re-typed.
    for (const count of [2, 3, 4, 6]) {
      expect(laneWidth(0, count), `${count} lanes`).toBeCloseTo(COLUMN_WIDTH, 6);
      expect(laneWidth(count - 1, count), `${count} lanes`).toBeCloseTo(
        COLUMN_WIDTH * NARROWEST_LANE,
        6,
      );
    }
  });
});

// ── the axis this slide does NOT have (the issue's second AC) ────────────────

describe("both leader decks print the same stage", () => {
  // §6.8's pillars and tracks are generic and identical across brands, and this
  // slide holds that in the strongest available form: it resolves no brand block
  // at all, unlike its three sibling leader-only slides. That is a claim about
  // MODULE EPOCHS — `VARIANT` resolves at module scope — so it cannot be checked
  // inside the one epoch every test above runs in. Two epochs, byte for byte.
  //
  // NOT `SlideHarness`, deliberately: it imports `composedDeck` statically and
  // would hand a freshly loaded slide a stale context object. This is the
  // same-epoch dynamic-import pattern `variant-composition.test.tsx` documents.
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
    // SEQUENTIALLY, not `Promise.all`. Each call re-points `window.location`,
    // resets the module registry and renders into the SAME document — run
    // concurrently they interleave, two stages share one DOM, and every
    // `getByTestId` finds two elements. The epochs are the point of this test and
    // they are strictly serial by nature.
    const berau = await stageTextFor(LEADER_VARIANTS[0]);
    const gems = await stageTextFor(LEADER_VARIANTS[1]);
    // Includes the fig label, so this also says the two decks compose the slide
    // at the same position — which they do, from one shared `LEADER_SLIDE_IDS`.
    expect(berau).toBe(gems);
    // Not vacuously: a stage that rendered nothing would also be equal.
    expect(berau).toContain(C.bottleneck.statement);
    expect(berau).toContain(C.pillars[0].label);
    expect(berau).toContain(C.tracks[0].name);
  });
});
