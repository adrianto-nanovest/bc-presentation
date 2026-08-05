// PHASES AND GATES · slide tests. All five poses, both brands.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout, so nothing here
// measures a pixel a browser would place — every geometric claim is asserted as
// the ONE NUMBER both sides read
// (`../../src/slides/leader-mandate/phases-gates-geometry.ts`), and the
// composition itself was walked at 1280×720. What jsdom is good for is what this
// slide is actually at risk of, and none of the three is a layout fault:
//
//   1. THE LADDER GOING OUT OF STEP WITH `gap-capability-ladder`. #61's second AC
//      is that this slide and that one are the SAME OBJECT — same rung names, same
//      order, no re-labelling. `./content.ts` holds that with an import rather
//      than a copy, so the assertion below is an IDENTITY check (`toBe`): it
//      fails the moment somebody "simplifies" the import into a local array, which
//      is the only way the guarantee can be lost quietly.
//   2. A THIRD LADDER GROWING BACK. §6.6 cut "Learn → Experiment → Build →
//      Integrate → Own" so the deck would carry one vocabulary. The four phase
//      STATES are the shape a second one would take if it ever did, so they are
//      checked against the rungs directly rather than by grepping for the cut
//      phrase alone.
//   3. THE BRAND AXIS LEAKING. Two organisations' real published roadmaps sit on
//      one structure. The rules worth holding are that the STRUCTURE never varies
//      (no phase, gate or rung is on the axis) and that each brand's calendar
//      names only its own programme — both are rules over every brand, checkable
//      here and nowhere else.
//
// ONE EPOCH FOR ALL OF IT. The figure reads no `VARIANT` and takes the resolved
// block as a prop, exactly as `CapabilityLadder` does, so both brands mount in the
// default `general` epoch through `SlideHarness` by passing their block in. No
// module-registry reset is needed anywhere in this file — which is the point of
// resolving the brand once in the slide def instead of inside the component.
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { BRANDS, type Brand } from "@/deck-variants";
import { DECK_SET_COMPOSITION } from "@/deck/deck-sets";
import {
  MandatePhasesGates,
  mandatePhasesGatesSlide,
} from "@/slides/leader-mandate/mandate-phases-gates";
import {
  mandatePhasesGatesContent,
  phasesGatesFor,
  phasesOnRung,
  rungIndexOf,
  rungOf,
  type PhaseId,
  type PhasesGatesBrandBlock,
} from "@/slides/leader-mandate/content";
// `gap-capability-ladder`'s own content module, imported for the identity
// assertion below. This is NOT the test standing in for a coupling that production
// declined to make — it is the test checking that production DID make it, which is
// the opposite situation from `mandate-enablement.test.tsx`'s quotation check one
// slide earlier.
import { gapLadderContent } from "@/slides/leader-gap/content";
import {
  BAND_HEIGHT,
  BAND_TOP,
  CALENDAR_ROWS,
  CALENDAR_ROW_BUDGET_CHARS,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  GATE_BUDGET_CHARS,
  HEADLINE_BOTTOM,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  PHASE_COL_HEIGHT,
  PHASE_COL_TOP,
  PHASE_COL_WIDTH,
  PHASE_COUNT,
  PHASE_GAP_X,
  RUNG_LABEL_BUDGET_CHARS,
  SIDE_MARGIN,
  STAGE,
  chipTop,
  phaseColX,
  riserY,
  rungColumnWidth,
  rungX,
  treadY,
} from "@/slides/leader-mandate/phases-gates-geometry";

const C = mandatePhasesGatesContent;
const POSES = [0, 1, 2, 3, 4] as const;
const RUNG_COUNT = C.rungs.length;

/** Every registered brand, walked rather than listed — a fourth brand is covered
 *  by being registered, not by being added here. */
const ALL_BRANDS = Object.keys(BRANDS) as Brand[];

/**
 * The position the slide holds in the deck it actually composes into.
 *
 * `at` IS required here, and it is the case `SlideHarness` documents: unit tests
 * resolve the default `general` deck, `general` has no leader variant, and this
 * slide reaches the two leader deck sets ALONE.
 *
 * A HARNESS INPUT AND NOT A CLAIM THE SLIDE MAKES. K.2 is what the composed leader
 * decks derive today; nothing under `src/slides/leader-mandate/` names it. AND IT
 * IS THE LETTER THE PRACTICE LAB'S `k2-practice-lab-overview` ALSO ONCE HELD — that
 * slide prints N.2 in these decks and K.2 in a standard one. Two different slides,
 * disambiguated by basename and section key and never by the letter, which is why
 * `sectionKey` is in this object at all.
 */
const AT = { letter: "K", num: 2, sectionKey: "mandate" } as const;

const GEMS = phasesGatesFor("gems");
const BERAU = phasesGatesFor("berau");

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

function renderSlide(content: PhasesGatesBrandBlock = GEMS, pose = 0) {
  const out = render(
    <SlideHarness def={mandatePhasesGatesSlide} at={AT}>
      <Nav />
      <MandatePhasesGates content={content} />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

function textOf(id: string): string {
  return screen.getByTestId(id).textContent ?? "";
}

/** Every `data-testid` the stage prints copy into, at the fullest pose. Built from
 *  the content so a phase or a rung added later is covered by existing rows. */
const COPY_BOXES: readonly string[] = [
  "mandate-phases-ladder-heading",
  "mandate-phases-heading",
  ...C.rungs.map((r) => `mandate-phases-rung-name-${r.id}`),
  ...C.phases.flatMap((p) => [
    `mandate-phases-chip-${p.id}`,
    `mandate-phases-target-${p.id}`,
    `mandate-phases-calendar-${p.id}`,
    `mandate-phases-gate-${p.id}`,
  ]),
  "mandate-phases-band-eyebrow",
  "mandate-phases-band-statement",
  "mandate-phases-band-provenance",
  "mandate-phases-closer",
];

/** The mono/display LABEL register — every string that must never be rendered
 *  through the highlighter. See the keyword rule at the top of `../content.ts`. */
const LABEL_BOXES: readonly string[] = [
  "mandate-phases-ladder-heading",
  "mandate-phases-heading",
  ...C.rungs.map((r) => `mandate-phases-rung-name-${r.id}`),
  ...C.phases.flatMap((p) => [`mandate-phases-chip-${p.id}`, `mandate-phases-target-${p.id}`]),
  "mandate-phases-band-eyebrow",
  "mandate-phases-band-provenance",
];

/** Every string this slide can print, for one brand — label and prose alike. */
function authoredFor(block: PhasesGatesBrandBlock): readonly string[] {
  return [
    C.figLabel,
    C.headline,
    C.ladderHeading,
    C.phasesHeading,
    C.beyondRoadmap,
    ...C.phases.flatMap((p) => [p.label, p.state, p.gate]),
    ...Object.values(block.calendars).flatMap((cal) =>
      cal.kind === "theirs" ? [...cal.rows] : [],
    ),
    block.band.eyebrow,
    block.band.statement,
    block.band.provenance,
    block.closer,
  ];
}

// ── the def ──────────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("is the file's basename, five steps, closing on the fullest pose", () => {
    expect(mandatePhasesGatesSlide.id).toBe("mandate-phases-gates");
    expect(mandatePhasesGatesSlide.steps).toBe(5);
    // The exports print `canonicalPose` and nothing else, so a canonical pose
    // short of the last one would ship a PDF with the plan's gates showing and
    // the ask missing.
    expect(mandatePhasesGatesSlide.canonicalPose).toBe(mandatePhasesGatesSlide.steps - 1);
    expect(mandatePhasesGatesSlide.sectionKey).toBe("mandate");
    expect(mandatePhasesGatesSlide.animationMode).toBe("step-reveal");
    expect(mandatePhasesGatesSlide.surface).toBe("dark");
  });
});

// ── the shared ladder (#61's second AC) ──────────────────────────────────────

describe("`gap-capability-ladder`'s ladder, and this slide, are the same object", () => {
  test("renders the very array `gap-capability-ladder` renders — not a copy of it", () => {
    // `toBe` AND NOT `toEqual`, and the difference is the whole point. An equal
    // copy passes `toEqual` forever while drifting one rename at a time; identity
    // can only hold while `./content.ts` keeps importing that slide's rungs, which
    // what makes "same object" a compile-time fact instead of a test's promise.
    expect(C.rungs).toBe(gapLadderContent.rungs);
  });

  test("borrows `gap-capability-ladder`'s own fig label for the staircase's heading", () => {
    // The room read those words under a staircase an hour ago. Composed from the
    // other slide's export, so a rename there cannot leave this heading quoting a
    // label nothing prints.
    renderSlide(GEMS, 0);
    expect(textOf("mandate-phases-ladder-heading")).toContain(gapLadderContent.figLabel);
  });

  test("prints every rung, in order, with no word changed", () => {
    // SAME NAMES, SAME ORDER, NO RE-LABELLING — the AC, read off the rendered
    // stage. The exact string is asserted rather than a `toContain`, because the
    // failure worth catching is not a missing rung, it is a rung that arrived with
    // an adjective attached to it.
    renderSlide(GEMS, 0);
    C.rungs.forEach((rung) => {
      expect(textOf(`mandate-phases-rung-name-${rung.id}`)).toBe(`${rung.level} · ${rung.title}`);
    });
    expect(screen.getAllByTestId(/^mandate-phases-rung-name-/).map((el) => el.textContent)).toEqual(
      C.rungs.map((r) => `${r.level} · ${r.title}`),
    );
  });

  test("maps the phases onto §6.5's rungs — P0–P1 → L2 · P2 → L3 · P3 → L4", () => {
    // BY RUNG ID, because that is how the content module names them: an index
    // would make this assertion agree with a reordered ladder that the slide had
    // silently followed.
    expect(C.phases.map((p) => p.rungId)).toEqual(["l2", "l2", "l3", "l4"]);
    // And the mapping never descends. A phase list whose rungs zig-zagged would
    // still render — as a plan that climbs and comes back down the same ladder
    // inside one slide.
    const indices = C.phases.map((p) => rungIndexOf(p.rungId));
    indices.forEach((n, i) => {
      if (i > 0) expect(n, `phase ${C.phases[i].id}`).toBeGreaterThanOrEqual(indices[i - 1]);
    });
  });

  test("lands two phases on one rung, and leaves the first and last bare", () => {
    // The two facts the geometry carries and no string states. `phasesOnRung` is
    // the single derivation four encodings read, so this is also the assertion
    // that keeps those four in agreement.
    expect(phasesOnRung(rungIndexOf("l2")).map((p) => p.id)).toEqual(["p0", "p1"]);
    expect(phasesOnRung(rungIndexOf("l1"))).toEqual([]);
    expect(phasesOnRung(rungIndexOf("l5"))).toEqual([]);
    // On the stage: a chip row exists only where a phase lands.
    renderSlide(GEMS, 1);
    expect(screen.queryByTestId("mandate-phases-chips-l1")).toBeNull();
    expect(screen.queryByTestId("mandate-phases-chips-l5")).toBeNull();
    expect(
      Array.from(screen.getByTestId("mandate-phases-chips-l2").querySelectorAll("[data-testid]")).map(
        (el) => el.textContent,
      ),
    ).toEqual(["P0", "P1"]);
  });

  test("lights the rungs the plan reaches and only those, by colour tier", () => {
    // RANK BY TIER, NEVER BY OPACITY. An unlit rung at 40% would read as a rung
    // the slide had not finished revealing, which on a step-reveal deck is a
    // specific and wrong meaning. Asserted as the copper TOKEN NUMBER — the ramp
    // runs 950 (darkest) to 50 (brightest) — so this file reads the value the
    // stage carries rather than importing the component's private table.
    renderSlide(GEMS, 0);
    const token = (id: string) => {
      const bg = (screen.getByTestId(id) as HTMLElement).style.background;
      const n = bg.match(/var\(--copper-(\d+)\)/)?.[1];
      expect(n, `${id} is not a copper CSS variable: ${bg}`).toBeDefined();
      return Number(n);
    };
    C.rungs.forEach((rung, i) => {
      const claimed = phasesOnRung(i).length > 0;
      const lit = token(`mandate-phases-tread-${rung.id}`);
      const other = token(`mandate-phases-tread-${C.rungs[claimed ? 0 : 1].id}`);
      // A claimed tread is strictly brighter than an unclaimed one, whichever
      // rungs those happen to be — derived, so a re-mapped phase re-cuts this.
      expect(claimed ? lit < other : lit > other, `tread ${rung.id}`).toBe(true);
    });
  });

  test("draws no riser out of the top rung", () => {
    // The step to L5 is not on this plan and the step OUT of L5 does not exist at
    // all. A staircase that drew one would be inventing a rung above the ladder.
    renderSlide(GEMS, 0);
    expect(screen.queryByTestId(`mandate-phases-riser-${C.rungs.at(-1)!.id}`)).toBeNull();
    expect(screen.getByTestId(`mandate-phases-riser-${C.rungs[0].id}`)).toBeInTheDocument();
  });

  test("refuses a rung the ladder does not have, at the content module and at the geometry", () => {
    // Both throws exist so a rung renamed in `gap-capability-ladder` fails LOUDLY —
    // the content one at module load, which is the whole payoff of importing rather
    // than re-declaring.
    expect(() => rungIndexOf("l9")).toThrow(/no rung "l9"/);
    expect(() => phasesOnRung(RUNG_COUNT)).toThrow(/no rung/);
    expect(() => treadY(RUNG_COUNT, RUNG_COUNT)).toThrow(/no rung/);
    expect(() => riserY(RUNG_COUNT - 1, RUNG_COUNT)).toThrow(/no riser/);
    expect(() => rungColumnWidth(1)).toThrow(/at least two/);
    expect(() => phaseColX(PHASE_COUNT)).toThrow(/no column/);
  });
});

// ── no third ladder (#61's third AC, §6.6) ───────────────────────────────────

describe("only one ladder is on this stage", () => {
  test("nothing on the slide or in its copy is §6.6's cut sequence", () => {
    // Asserted with flexible separators, because the way this comes back is
    // somebody re-typing it with hyphens or commas rather than the arrows §6.6
    // wrote it with.
    //
    // WALKED OVER `BRANDS` AND NOT OVER THE TWO WITH A ROADMAP, which is the idiom
    // the brand-axis rules above use and is what pulls `general` in: the block
    // table is keyed by `Brand`, so a cut ladder typed into the entry nobody
    // rehearses is a cut ladder this rule would otherwise never see.
    const CUT = /Learn\s*[→>,·-]+\s*Experiment/i;
    for (const brand of ALL_BRANDS) {
      const block = phasesGatesFor(brand);
      const { container, unmount } = renderSlide(block, 4);
      expect(container.textContent ?? "", brand).not.toMatch(CUT);
      authoredFor(block).forEach((copy) => expect(copy, brand).not.toMatch(CUT));
      unmount();
    }
  });

  test("no phase state is a rung name, and two of them name one rung", () => {
    // THE STRUCTURAL FORM OF THE RULE, and the half a grep cannot do. The four
    // states can only become a second ladder if they read as a sequence of
    // levels; they cannot, because CLAIMED and SOLID are both L2. A fifth phase
    // that broke that would fail here rather than at a rehearsal.
    const titles = new Set(C.rungs.flatMap((r) => [r.title, r.level]));
    C.phases.forEach((p) => expect(titles.has(p.state), `${p.id}: ${p.state}`).toBe(false));
    const byState = new Map(C.phases.map((p) => [p.state, p.rungId]));
    expect(byState.size, "two phases share a state").toBe(C.phases.length);
    expect(new Set(C.phases.map((p) => p.rungId)).size).toBeLessThan(C.phases.length);
  });

  test("prints the phase, the rung and the state as three separated tokens", () => {
    // `P0 · L2 · CLAIMED` and never `P0 · L2 CLAIMED`, which would read as a rung
    // called "L2 CLAIMED" — the re-labelling AC 2 forbids, arriving through
    // punctuation rather than through the rung table.
    renderSlide(GEMS, 1);
    C.phases.forEach((phase) => {
      expect(textOf(`mandate-phases-target-${phase.id}`)).toBe(
        `${phase.label} · ${rungOf(phase.rungId).level} · ${phase.state}`,
      );
    });
  });

  test("carries the ladder's rung definitions in the gates rather than reprinting them", () => {
    // The staircase prints rung NAMES only — the definitions were taught on
    // `gap-capability-ladder` — so the two gates that need L3's and L4's vocabulary
    // quote it. Held as a rule, so a reworded `sub` in `leader-gap` fails here
    // instead of leaving two gates arguing from a definition the deck no longer
    // gives.
    const gateOf = (id: PhaseId) => C.phases.find((p) => p.id === id)!.gate.toLowerCase();
    expect(rungOf("l3").sub.toLowerCase()).toContain("decision contract");
    expect(gateOf("p2")).toContain("decision contract");
    expect(rungOf("l4").sub.toLowerCase()).toContain("escalation path");
    expect(gateOf("p3")).toContain("escalation path");
  });
});

// ── the brand axis (§4.4 slot 6) ─────────────────────────────────────────────

describe("every brand", () => {
  test("has a calendar for every phase, and no more than the column budgets", () => {
    // Walked over `BRANDS` and not over the content module's own key set, for the
    // reason `capabilityLadderFor` is the only way into that table: a rule about
    // "every brand" proved over a slide's own keys proves nothing about a brand
    // the slide forgot.
    for (const brand of ALL_BRANDS) {
      const block = phasesGatesFor(brand);
      C.phases.forEach((phase) => {
        const cal = block.calendars[phase.id];
        expect(cal, `${brand}/${phase.id}`).toBeDefined();
        if (cal.kind === "theirs") {
          expect(cal.rows.length, `${brand}/${phase.id}`).toBeGreaterThan(0);
          expect(cal.rows.length, `${brand}/${phase.id}`).toBeLessThanOrEqual(CALENDAR_ROWS);
        }
      });
    }
  });

  test("varies only the calendar, the citation and the ask", () => {
    // THE AXIS IS NARROW ON PURPOSE, and this is what "narrow" means mechanically:
    // no phase, gate or rung is reachable from a brand block. The type already
    // says so; this asserts it over the VALUES, so a later edit that widened
    // `PhasesGatesBrandBlock` would have to come through here.
    for (const brand of ALL_BRANDS) {
      expect(Object.keys(phasesGatesFor(brand)).sort()).toEqual([
        "band",
        "calendars",
        "closer",
        "closerKw",
      ]);
    }
  });

  test("names no other organisation in its own block", () => {
    // The failure this slide could cause is showing one room another
    // organisation's roadmap. Every brand's copy is checked against the OTHER
    // brands' names, derived from `BRANDS` so a fourth is covered by registration.
    const nameOf = (brand: Brand) =>
      BRANDS[brand].label.replace(/\s*AI Catalyst Workshop$/, "").trim();
    for (const brand of ALL_BRANDS) {
      const own = nameOf(brand);
      const foreign = ALL_BRANDS.map(nameOf).filter((n) => n !== "" && n !== own);
      const copy = authoredFor(phasesGatesFor(brand)).join(" ");
      foreign.forEach((other) => expect(copy, `${brand} names ${other}`).not.toContain(other));
    }
  });

  test("puts two different stages in the two leader rooms", () => {
    // Not vacuous, and the positive half of the rule above: this slide HAS an
    // axis, unlike K.1 one slide earlier, and a block resolved to the wrong brand
    // — or a component that quietly stopped reading the prop — would render two
    // identical stages and pass every assertion in this file except this one.
    const { unmount } = renderSlide(GEMS, 4);
    const gems = document.body.textContent ?? "";
    unmount();
    renderSlide(BERAU, 4);
    expect(document.body.textContent ?? "").not.toBe(gems);
  });

  test("prints the deck's own sentence where a roadmap runs out", () => {
    // The `ours` arm, which is SHARED across brands on purpose: three copies of
    // one true sentence is how one of them ends up saying an organisation is
    // further along than another on the strength of a copy-edit.
    renderSlide(GEMS, 1);
    expect(textOf("mandate-phases-calendar-p2")).toBe(C.beyondRoadmap);
    expect(textOf("mandate-phases-calendar-p3")).toBe(C.beyondRoadmap);
  });
});

describe("GEMS", () => {
  test("ends P0 at the W1 Nov post-assessment", () => {
    renderSlide(GEMS, 1);
    const p0 = textOf("mandate-phases-calendar-p0");
    expect(p0).toContain("POST-ASSESSMENT");
    expect(p0).toContain("W1 NOV");
    // The post-assessment is LAST — their own programme gates on it, and a
    // calendar that ended on the competition would put the reward where the
    // measurement belongs.
    expect(p0.indexOf("POST-ASSESSMENT")).toBeGreaterThan(p0.indexOf("COMPETITION"));
  });

  test("puts AI Forge in P1, not in a fifth phase bolted on the end", () => {
    renderSlide(GEMS, 1);
    expect(textOf("mandate-phases-calendar-p1")).toContain("AI FORGE");
    expect(textOf("mandate-phases-target-p1")).toContain("P1");
  });

  test("quotes their own programme title and its post-assessment gate", () => {
    // BOTH FRAGMENTS, because they do different work: the title is the
    // destination, "the post-assessment result" is the gate, and a room that hears
    // one without the other hears an ambition with no test or a test with no
    // purpose.
    renderSlide(GEMS, 3);
    const provenance = textOf("mandate-phases-band-provenance");
    expect(provenance).toContain("“AI Forge — Deep AI Skills to Build an Agentic Organization”");
    expect(provenance).toContain("“the post-assessment result”");
  });

  test("says outright that this is the operating model AI Forge is aimed at", () => {
    renderSlide(GEMS, 3);
    const statement = textOf("mandate-phases-band-statement");
    expect(statement).toContain("not a new direction");
    expect(statement).toContain("the operating model AI Forge is aimed at");
    // The deck's OWN sentence, so it carries no quotation marks — a paraphrase
    // inside quotes is the small lie the band's three-line split exists to make
    // impossible. Same rule as K.1's bottleneck one slide earlier.
    expect(statement).not.toMatch(/[“”"]/);
  });

  test("asks only for what has to be true before January", () => {
    renderSlide(GEMS, 4);
    expect(textOf("mandate-phases-closer")).toContain("January");
  });
});

describe("Berau", () => {
  test("shows P0 complete, with its three date ranges", () => {
    renderSlide(BERAU, 1);
    const p0 = textOf("mandate-phases-calendar-p0");
    ["MAY–JUN", "JUN–JUL", "JUL–AUG"].forEach((range) => expect(p0).toContain(range));
    // Each under the stage that produced it, so "complete" is legible as three
    // delivered things rather than as a claim.
    ["WORKSHOP", "COMPETITION", "POST-ASSESSMENT"].forEach((stage) => expect(p0).toContain(stage));
  });

  test("names Aug 18 as the gate, and quotes the stage on the far side of it", () => {
    // THE HARDEST THING THIS DECK SAYS. The leader session lands exactly on the
    // boundary their own roadmap draws, so Aug 18 is not one more date on this
    // slide — it is the gate, and it is asserted in the eyebrow where the room
    // reads it first.
    renderSlide(BERAU, 3);
    expect(textOf("mandate-phases-band-eyebrow")).toContain("AUG 18");
    expect(textOf("mandate-phases-band-statement")).toContain("Aug 18");
    expect(textOf("mandate-phases-band-provenance")).toContain(
      "“Post Program AI Development — After Aug”",
    );
    expect(textOf("mandate-phases-calendar-p1")).toContain("POST PROGRAM AI DEVELOPMENT");
  });

  test("carries the AI Ambassadors line", () => {
    renderSlide(BERAU, 4);
    const closer = textOf("mandate-phases-closer");
    expect(closer).toContain("AI Ambassadors");
    expect(closer).toContain("Fund them, or lose them");
  });
});

// ── #7's exclusion, reversed for the leader decks only ───────────────────────

describe("the programme framing reaches the leader decks and no other", () => {
  test("this slide is the reversal, and composition is the whole of its scope", () => {
    // §5.3 keeps the competition, the rewards, AI Forge and the post-assessment
    // out of the standard decks — organiser's announcement, handled verbally —
    // and reverses that for the leader deck only, HERE. #7's exclusion was never
    // written as a test to narrow: it is expressed by the copy simply not existing
    // in any shared slide, and by §5.3. So this is the positive form of it,
    // asserted beside the copy that depends on it — the words below are on this
    // stage and this stage is in exactly one deck set.
    const { leader, standard } = DECK_SET_COMPOSITION;
    expect(leader.slides).toContain("mandate-phases-gates");
    expect(standard.slides).not.toContain("mandate-phases-gates");
    // And immediately after K.1, so the run stays contiguous — R4 would throw at
    // module load if it did not, but "adjacent" is stronger than "in the same run"
    // and is what §6.8's ordering asks for.
    const at = leader.slides.indexOf("mandate-phases-gates");
    expect(leader.slides[at - 1]).toBe("mandate-enablement");
  });

  test("prints the words the standard decks do not get", () => {
    // Not vacuous: if this copy ever drained out of the slide, the assertion above
    // would still pass over an id that composes nothing worth scoping.
    renderSlide(GEMS, 4);
    const gems = document.body.textContent ?? "";
    ["AI Forge", "COMPETITION", "POST-ASSESSMENT"].forEach((word) => expect(gems).toContain(word));
  });
});

// ── the poses ────────────────────────────────────────────────────────────────

describe("the five poses", () => {
  test("arrive in order and nothing that arrived ever leaves", () => {
    const { unmount } = renderSlide(GEMS, 0);
    const on = (id: string) => screen.getByTestId(id).classList.contains("on");
    const every = (ids: string[]) => ids.every(on);
    const phaseBits = C.phases.map((p) => `mandate-phases-target-${p.id}`);
    const gateBits = C.phases.map((p) => `mandate-phases-gate-${p.id}`);

    // Pose 0: the ladder alone. The rungs never gate on a pose — they are the
    // figure the other four are laid over, and a reveal written per-pose is one
    // keystroke from making them vanish when the phases arrive.
    expect(every(C.rungs.map((r) => `mandate-phases-rung-${r.id}`))).toBe(true);
    expect(every(phaseBits)).toBe(false);
    expect(on("mandate-phases-band")).toBe(false);

    goToPose(1);
    expect(every(phaseBits)).toBe(true);
    expect(every(gateBits)).toBe(false);

    goToPose(2);
    expect(every(gateBits)).toBe(true);
    expect(on("mandate-phases-band")).toBe(false);

    goToPose(3);
    expect(on("mandate-phases-band")).toBe(true);
    expect(on("mandate-phases-closer")).toBe(false);

    goToPose(4);
    expect(on("mandate-phases-closer")).toBe(true);
    expect(every(gateBits)).toBe(true);
    unmount();
  });

  test("walks backwards to the same poses it walked forwards through", () => {
    // Every gate is a function of the pose alone — no state, no "previously
    // shown" — so stepping back is arithmetic rather than cleanup. Asserted
    // because `ArrowLeft` is a key a presenter actually presses.
    const { unmount } = renderSlide(GEMS, 4);
    goToPose(0);
    expect(screen.getByTestId("mandate-phases-closer")).not.toHaveClass("on");
    expect(screen.getByTestId("mandate-phases-band")).not.toHaveClass("on");
    C.phases.forEach((p) => {
      expect(screen.getByTestId(`mandate-phases-gate-${p.id}`)).not.toHaveClass("on");
      expect(screen.getByTestId(`mandate-phases-target-${p.id}`)).not.toHaveClass("on");
    });
    C.rungs.forEach((r) => expect(screen.getByTestId(`mandate-phases-rung-${r.id}`)).toHaveClass("on"));
    unmount();
  });

  test("prints the fig label from the composed position, and no letter of its own", () => {
    renderSlide(GEMS, 0);
    const fig = document.querySelector(".fig-label")?.textContent ?? "";
    expect(fig).toContain(C.figLabel);
    // The letter and number come from `SlideNumberContext`, which the harness
    // supplied — see `AT`. Nothing under `src/slides/leader-mandate/` names one.
    expect(fig).toContain(`${AT.letter}.${AT.num}`);
  });
});

// ── motion (#61's eighth AC) ─────────────────────────────────────────────────

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
    // `E12LoopAnatomy` gates its `<animateMotion>`. THIS SLIDE DRAWS A STAIRCASE
    // AND STILL HAS NO SVG LAYER, which is the case worth pinning:
    // `gap-capability-ladder` draws the identical shape as a `<path>` because its
    // treads draw themselves in, and the cheapest way to break this slide's motion
    // contract is to reach for one `<rect>` "to match". The rect is not what would
    // go wrong — it is the `<animate>` somebody adds to it next.
    //
    // SCOPED TO WHAT THIS DIRECTORY RENDERS, and not to `document`, because that is
    // the claim: `src/slides/leader-mandate/` mounts no SVG. `container` drops
    // anything jsdom holds outside this render, and `.fig-label` — the deck's own
    // caption, which this slide only calls — is dropped with it. `SlideHarness`
    // mounts no NavBar at all, so there is nothing else shared inside the tree. A
    // marker added to either shared component later would then be a failure of ITS
    // suite rather than of both of this section's.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(GEMS, pose);
      const figLabel = container.querySelector(".fig-label");
      for (const tag of ["animate", "animateMotion", "animateTransform", "set", "svg"]) {
        const ours = [...container.querySelectorAll(tag)].filter((el) => !figLabel?.contains(el));
        expect(ours, `pose ${pose} · <${tag}>`).toHaveLength(0);
      }
      unmount();
    }
  });

  test("still mounts every band the pose has reached, with its copy", () => {
    // WHAT THIS CAN AND CANNOT SAY. jsdom runs no animation, so "the pose rests on
    // its finished frame" is not checkable here — the global rule squashes a
    // duration jsdom never computes. This claims the DOM half: every band the pose
    // has reached is mounted, revealed, and carrying its text.
    renderSlide(GEMS, 4);
    for (const id of COPY_BOXES) {
      expect(textOf(id), id).not.toBe("");
    }
    expect(textOf("mandate-phases-closer")).toBe(GEMS.closer);
  });
});

// ── the copy rules §6.8's build rules state, checked over the copy ───────────

describe("keywords go on prose only", () => {
  test("no heading, rung name, chip, eyebrow or citation is rendered through the highlighter", () => {
    // Rendered check, not an authored one: `<em>` is what a highlight IS on the
    // stage. The CITATION and the RUNG NAMES are the sharpest cases — a copper
    // italic inside somebody else's quoted sentence is the deck emphasising a
    // fragment of a source it is reporting, and one inside a rung name is this
    // slide editing another slide's vocabulary.
    renderSlide(BERAU, 4);
    for (const id of LABEL_BOXES) {
      expect(screen.getByTestId(id).querySelectorAll("em"), id).toHaveLength(0);
    }
    // The calendar rows too, which are labels for every brand that authors them.
    C.phases.forEach((phase) => {
      if (BERAU.calendars[phase.id].kind !== "theirs") return;
      expect(
        screen.getByTestId(`mandate-phases-calendar-${phase.id}`).querySelectorAll("em"),
        phase.id,
      ).toHaveLength(0);
    });
  });

  test("every prose box does carry its highlight", () => {
    // The other direction, and not implied by the one above: a `*Kw` array that
    // silently stopped matching leaves copy that still reads, so nothing on the
    // stage says the emphasis was lost.
    renderSlide(GEMS, 4);
    const prose = [
      ...C.phases.map((p) => `mandate-phases-gate-${p.id}`),
      "mandate-phases-calendar-p2", // the `ours` arm — prose, so it highlights
      "mandate-phases-band-statement",
      "mandate-phases-closer",
    ];
    for (const id of prose) {
      expect(screen.getByTestId(id).querySelectorAll("em").length, id).toBeGreaterThan(0);
    }
  });

  test("every prose keyword is a substring of the copy it highlights, for every brand", () => {
    // `highlight()` is a `String.includes` match that NO-OPS SILENTLY: a typo
    // drops a copper highlight with no error anywhere.
    const pairs: Array<[string, string, readonly string[]]> = [
      ["headline", C.headline, C.headlineKw],
      ["beyondRoadmap", C.beyondRoadmap, C.beyondRoadmapKw],
      ...C.phases.map((p): [string, string, readonly string[]] => [
        `phase.${p.id}`,
        p.gate,
        p.gateKw,
      ]),
      ...ALL_BRANDS.flatMap((brand): Array<[string, string, readonly string[]]> => {
        const block = phasesGatesFor(brand);
        return [
          [`${brand}.statement`, block.band.statement, block.band.statementKw],
          [`${brand}.closer`, block.closer, block.closerKw],
        ];
      }),
    ];
    pairs.forEach(([where, copy, kw]) => {
      expect(kw.length, `${where}: prose with no keyword`).toBeGreaterThan(0);
      kw.forEach((word) => expect(copy, `${where}: "${word}"`).toContain(word));
    });
  });

  test("gives no phase label or state a keyword sibling", () => {
    // #61 states this directly: phase names are LABELS. A `*Kw` on one would put a
    // copper italic inside `P0 · L2 · CLAIMED`, which reads as a rendering fault.
    C.phases.forEach((phase) => {
      expect(Object.keys(phase).sort()).toEqual(["gate", "gateKw", "id", "label", "rungId", "state"]);
    });
  });

  test("no authored string names a section letter or a figure number", () => {
    // §3.4 R2. `mandate` takes K today; a literal "K.2" or "SECTION K" in this
    // copy would be a lie on a projector the first time a slide opened a run in
    // front of it — and this file's own `AT` is a harness input for exactly that
    // reason.
    ALL_BRANDS.forEach((brand) => {
      authoredFor(phasesGatesFor(brand)).forEach((copy) => {
        expect(copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
        expect(copy).not.toMatch(/\b[A-N]\.\d+\b/);
      });
    });
  });

  test("carries no stray markup — the data is plain strings", () => {
    ALL_BRANDS.forEach((brand) =>
      authoredFor(phasesGatesFor(brand)).forEach((copy) => expect(copy).not.toContain("<em")),
    );
  });

  test("keeps every gate, calendar row and rung name inside its budget", () => {
    // `../phases-gates-geometry.ts` budgets a fixed number of lines per slot, so a
    // line that wraps past its budget does not overflow a box — it pushes the row
    // beneath it into the band, which reads on a projector as a slide that failed
    // to lay out. Enforced on the COPY, where an author can act on it, because
    // jsdom computes no text width.
    C.phases.forEach((p) =>
      expect(p.gate.length, `gate ${p.id}: ${p.gate.length} chars`).toBeLessThanOrEqual(
        GATE_BUDGET_CHARS,
      ),
    );
    expect(C.beyondRoadmap.length).toBeLessThanOrEqual(GATE_BUDGET_CHARS);
    ALL_BRANDS.forEach((brand) =>
      Object.entries(phasesGatesFor(brand).calendars).forEach(([id, cal]) => {
        if (cal.kind !== "theirs") return;
        cal.rows.forEach((row) =>
          expect(row.length, `${brand}/${id}: "${row}"`).toBeLessThanOrEqual(
            CALENDAR_ROW_BUDGET_CHARS,
          ),
        );
      }),
    );
    // THE RUNG NAMES ARE THE ONE BUDGET THIS SLIDE DOES NOT OWN THE COPY FOR.
    // They come from `leader-gap/content.ts`, so a rung retitled there has to fail
    // a test HERE rather than silently run into its neighbour's column.
    C.rungs.forEach((rung) =>
      expect(
        `${rung.level} · ${rung.title}`.length,
        `rung ${rung.id} is too long for a fifth of the stage`,
      ).toBeLessThanOrEqual(RUNG_LABEL_BUDGET_CHARS),
    );
  });
});

// ── the geometry, as the two sides agree on it ───────────────────────────────

describe("geometry", () => {
  test("stacks staircase, columns, band and closer without overlap, clear of the NavBar", () => {
    // The vertical budget, worked from the floor upward. `.nav-zone` is
    // `bottom: 0; height: 88px`, so anything under y=632 sits behind the
    // presenter's own hover target.
    const lowestRungInk = treadY(0, RUNG_COUNT);
    expect(lowestRungInk).toBeLessThan(PHASE_COL_TOP);
    expect(PHASE_COL_TOP + PHASE_COL_HEIGHT).toBeLessThan(BAND_TOP);
    expect(BAND_TOP + BAND_HEIGHT).toBeLessThan(CLOSER_TOP);
    expect(CLOSER_TOP + CLOSER_HEIGHT).toBeLessThanOrEqual(NAV_ZONE_TOP);
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);
  });

  test("keeps every chipped rung clear of the headline", () => {
    // THE ONE CLEARANCE THE RISE COULD BREAK, and it is asserted over the rungs
    // that actually carry a chip rather than over all five: L5 carries none, so
    // its tread may legitimately sit higher than any chip could. A larger `RISE`
    // fails here first.
    C.rungs.forEach((rung, i) => {
      if (phasesOnRung(i).length === 0) return;
      expect(chipTop(i, RUNG_COUNT), `chips on ${rung.id}`).toBeGreaterThan(HEADLINE_BOTTOM);
    });
  });

  test("climbs strictly, one rung per column, across the full content width", () => {
    // The staircase is `gap-capability-ladder`'s shape re-cut: L1 lowest and
    // leftmost, L5 highest and rightmost, every tread the same width. Derived from
    // the rung COUNT, so a ladder of another length re-cuts the figure instead of
    // needing a width re-typed.
    const treads = C.rungs.map((_, i) => treadY(i, RUNG_COUNT));
    treads.forEach((y, i) => {
      if (i > 0) expect(y, `rung ${i}`).toBeLessThan(treads[i - 1]);
    });
    expect(rungX(0, RUNG_COUNT)).toBe(SIDE_MARGIN);
    expect(rungX(RUNG_COUNT - 1, RUNG_COUNT) + rungColumnWidth(RUNG_COUNT)).toBeCloseTo(
      SIDE_MARGIN + CONTENT_WIDTH,
      6,
    );
    // Every riser joins the tread above it, so the drawn path is continuous.
    for (let i = 0; i < RUNG_COUNT - 1; i += 1) {
      const riser = riserY(i, RUNG_COUNT);
      expect(riser.top).toBe(treadY(i + 1, RUNG_COUNT));
      expect(riser.top + riser.height).toBe(treadY(i, RUNG_COUNT));
    }
  });

  test("splits the phase band into four equal columns inside the margins", () => {
    // EQUAL WIDTH IS AN ARGUMENT: P0 is months and P3 may be years, and a width
    // that tracked duration would turn a plan into a Gantt chart the deck has no
    // data to draw.
    expect(phaseColX(0)).toBe(SIDE_MARGIN);
    expect(phaseColX(PHASE_COUNT - 1) + PHASE_COL_WIDTH).toBeCloseTo(SIDE_MARGIN + CONTENT_WIDTH, 6);
    for (let i = 1; i < PHASE_COUNT; i += 1) {
      expect(phaseColX(i) - (phaseColX(i - 1) + PHASE_COL_WIDTH)).toBeCloseTo(PHASE_GAP_X, 6);
    }
    expect(SIDE_MARGIN + CONTENT_WIDTH).toBe(STAGE.width - SIDE_MARGIN);
    // One column per phase — the band and the content module cannot disagree
    // about how many there are.
    expect(C.phases).toHaveLength(PHASE_COUNT);
  });

  test("puts the closer on K.1's shelf, not on one of its own", () => {
    // THE LOAD-BEARING SHARED CONSTANT. The two mandate slides are adjacent in the
    // only decks that compose them and both end on a serif-italic ask; two shelves
    // that agreed today would be one edit from showing the room the deck's own ask
    // jumping between two consecutive clicks.
    renderSlide(GEMS, 4);
    expect((screen.getByTestId("mandate-phases-closer") as HTMLElement).style.top).toBe(
      `${CLOSER_TOP}px`,
    );
  });
});
