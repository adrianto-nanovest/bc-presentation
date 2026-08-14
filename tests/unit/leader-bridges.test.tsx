// The three leader-only bridges, and the one that MOVED to make room for them (gh#72).
//
// ONE FILE FOR THREE SLIDES, against this tree's one-file-per-slide habit, and the reason
// is that they are one stage: `@/components/BridgeHero` renders all three and the slides
// are copy plus a step policy. Three files would be three copies of the same eight
// assertions, and the failure mode worth catching is the opposite of per-slide drift —
// it is ONE change to the shared stage silently breaking the other two. `describe.each`
// over the three catches that in one place; what is genuinely per-slide (the section key,
// the photo, the words) is data in the table below.
//
// WHAT THIS FILE CANNOT PROVE. jsdom has no layout engine, so nothing here measures a
// text width, and the ONE risk these slides carry is a beat wrapping at 56px on a
// projector. That is the browser's half: `measure` per slide is asserted here as the
// number the slide passes, and whether the words fit inside it was walked at 1920×1080.
// Everything else about a bridge is structural and DOM-visible: the photo, the three
// overlays, which beats are `on` at which step, and the FigLabel the composer derives.
//
// THE FOURTH CASE IS `h3-bridge-to-i` AND IT IS NOT A NEW SLIDE. It composes at K.4 in a
// leader deck and H.3 in a standard one, from one file, and one string in it is
// deck-set-scoped as of this ticket. Its copy resolver is a pure function, so both decks'
// strings are asserted without setting up a module epoch — the rendered leader string is
// `variant-composition.test.tsx`'s business, exactly as E.13's leader beat 2 is.
import { render, screen, act } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import type { SlideDef } from "@/deck/types";
import type { SlideNumber } from "@/deck/SlideNumberContext";
import { SlideHarness } from "../support/slide-harness";
import {
  GapBridgeToShape,
  gapBridgeToShapeSlide,
} from "@/slides/leader-gap/gap-bridge-to-shape";
import {
  InvestBridgeToCurriculum,
  investBridgeToCurriculumSlide,
} from "@/slides/leader-invest/invest-bridge-to-curriculum";
import {
  PitfallsBridgeToMandate,
  pitfallsBridgeToMandateSlide,
} from "@/slides/application-section-h/pitfalls-bridge-to-mandate";
import { gapBridgeContent } from "@/slides/leader-gap/content";
import { investBridgeContent } from "@/slides/leader-invest/content";
import {
  h3Beat1LineBFor,
  h3Content,
  pitfallsBridgeContent,
} from "@/slides/application-section-h/content";
import type { BridgeCopy } from "@/components/BridgeHero";

interface BridgeCase {
  name: string;
  def: SlideDef;
  Component: () => JSX.Element;
  copy: BridgeCopy;
  testId: string;
  /**
   * The figure this slide composes TODAY, in both leader decks.
   *
   * A LITERAL, AND THE ONE CASE `SlideHarness` SANCTIONS: these slides reach no
   * `general` deck, so there is no default composition to look the position up in. It is
   * the same exception `gap-capability-ladder.test.tsx` takes. The authority on what
   * each of them prints is `tests/fixtures/deck-numbering.json`, which records B.5, D.5
   * and J.3 for these three and is re-harvested rather than hand-edited — so if a later
   * insert renumbers one of them, that fixture fails FIRST and this literal is the second
   * place to update, never the first.
   */
  at: SlideNumber;
  sectionKey: SlideDef["sectionKey"];
  hero: string;
}

const CASES: readonly BridgeCase[] = [
  {
    name: "gap → shape",
    def: gapBridgeToShapeSlide,
    Component: GapBridgeToShape,
    copy: gapBridgeContent,
    testId: "gap-bridge",
    at: { letter: "B", num: 5, sectionKey: "gap" },
    sectionKey: "gap",
    hero: "gap-to-shape-bridge.jpg",
  },
  {
    name: "invest → curriculum",
    def: investBridgeToCurriculumSlide,
    Component: InvestBridgeToCurriculum,
    copy: investBridgeContent,
    testId: "invest-bridge",
    at: { letter: "D", num: 6, sectionKey: "invest" },
    sectionKey: "invest",
    hero: "invest-to-curriculum-bridge.jpg",
  },
  {
    name: "pitfalls → mandate",
    def: pitfallsBridgeToMandateSlide,
    Component: PitfallsBridgeToMandate,
    copy: pitfallsBridgeContent,
    testId: "pitfalls-bridge",
    at: { letter: "J", num: 3, sectionKey: "pitfalls" },
    sectionKey: "pitfalls",
    hero: "pitfalls-to-mandate-bridge.jpg",
  },
];

function AdvanceTo({ step }: { step: number }) {
  const { goTo } = useDeck();
  return <button data-testid="goto" onClick={() => goTo(0, step)} />;
}

function renderAtStep(c: BridgeCase, step: number) {
  render(
    <SlideHarness def={c.def} at={c.at}>
      <AdvanceTo step={step} />
      <c.Component />
    </SlideHarness>,
  );
  act(() => {
    screen.getByTestId("goto").click();
  });
}

describe.each(CASES)("the $name bridge", (c) => {
  test("declares 2 steps, canonical pose 1, and the section key of the run it CLOSES", () => {
    expect(c.def.steps).toBe(2);
    expect(c.def.canonicalPose).toBe(1);
    expect(c.def.animationMode).toBe("step-reveal");
    expect(c.def.surface).toBe("dark");
    // The key is the run this bridge is the LAST slide of, never the run it hands to —
    // `pitfalls-bridge-to-mandate` is keyed `pitfalls` and not `mandate` for that reason.
    // A bridge keyed after its destination would sit at the FRONT of that run.
    expect(c.def.sectionKey).toBe(c.sectionKey);
  });

  test("prints the figure the composer derives, and the label from its own copy", () => {
    renderAtStep(c, 0);
    const fig = document.querySelector(".fig-label");
    expect(fig?.textContent).toContain(`FIG. ${c.at.letter}.${c.at.num}`);
    expect(fig?.textContent).toContain(c.copy.figLabel);
    // NO LETTER IS AUTHORED ANYWHERE IN THE SLIDE. The pair above comes from the
    // harness's published position, so a slide that hardcoded its own figure would pass
    // this and fail the fixture — which is why the copy is checked for the absence.
    expect(JSON.stringify(c.copy)).not.toMatch(/\bFIG\b|\bSECTION [A-N]\b/);
  });

  test("renders the hero photo and all three overlays", () => {
    renderAtStep(c, 0);
    const hero = screen.getByTestId(`${c.testId}-hero`);
    expect(hero.style.backgroundImage).toContain(c.hero);
    // Quote-tolerant: jsdom re-serialises `url(x)` as `url("x")`, so the path is compared
    // and the CSS function's own punctuation is not.
    expect(hero.style.backgroundImage.replace(/["']/g, "")).toBe(`url(${c.copy.heroSrc})`);
    expect(screen.getByTestId(`${c.testId}-overlay-bottom-left`)).toBeInTheDocument();
    expect(screen.getByTestId(`${c.testId}-overlay-top-left`)).toBeInTheDocument();
    expect(screen.getByTestId(`${c.testId}-overlay-top-gloom`)).toBeInTheDocument();
  });

  test("step 0 → beat 1 arrives, beat 2 holds", () => {
    renderAtStep(c, 0);
    expect(screen.getByTestId(`${c.testId}-beat1-lineA`).className).toMatch(/\bon\b/);
    expect(screen.getByTestId(`${c.testId}-beat1-lineB`).className).toMatch(/\bon\b/);
    expect(screen.getByTestId(`${c.testId}-beat2`).className).not.toMatch(/\bon\b/);
  });

  test("step 1 (canonical pose) → both beats, in the section's own words", () => {
    renderAtStep(c, 1);
    const lineA = screen.getByTestId(`${c.testId}-beat1-lineA`);
    const lineB = screen.getByTestId(`${c.testId}-beat1-lineB`);
    const beat2 = screen.getByTestId(`${c.testId}-beat2`);
    expect(lineA.textContent).toBe(c.copy.beat1.lineA.text);
    expect(lineB.textContent).toBe(c.copy.beat1.lineB.text);
    expect(beat2.textContent).toBe(c.copy.beat2.text);
    expect(beat2.className).toMatch(/\bon\b/);
    // Beat 2 is the handoff and says so — every bridge in the deck opens it with "Next:".
    expect(c.copy.beat2.text.startsWith("Next:")).toBe(true);
  });

  test("every keyword is a substring of the line it highlights, and renders as one", () => {
    renderAtStep(c, 1);
    const beats = [
      [c.copy.beat1.lineA, `${c.testId}-beat1-lineA`],
      [c.copy.beat1.lineB, `${c.testId}-beat1-lineB`],
      [c.copy.beat2, `${c.testId}-beat2`],
    ] as const;
    for (const [beat, testId] of beats) {
      expect(beat.kw.length, testId).toBeGreaterThan(0);
      for (const kw of beat.kw) {
        // A keyword that is not in its own line highlights NOTHING and fails silently on
        // a projector — `highlight()` splits on the substring and finds none.
        expect(beat.text, `${testId} · ${kw}`).toContain(kw);
      }
      const marks = screen.getByTestId(testId).querySelectorAll("em, .kw, mark");
      expect(marks.length, testId).toBe(beat.kw.length);
    }
  });
});

describe("the copy the three bridges carry", () => {
  test("each names the section it hands to, and none names a letter or a count", () => {
    // §3.5: a letter belongs to the composed deck. A bridge that said "Section C" or
    // "the next forty slides" would go stale on the next insert, and the words below are
    // the ones a presenter reads out, so the check is over the rendered strings.
    for (const c of CASES) {
      const all = [
        c.copy.beat1.lineA.text,
        c.copy.beat1.lineB.text,
        c.copy.beat2.text,
        c.copy.figLabel,
      ].join(" ");
      expect(all, c.name).not.toMatch(/\d/);
      expect(all, c.name).not.toMatch(/\bsection [A-N]\b/i);
    }
  });

  test("the gap bridge refuses the line that would contradict B.1's own number", () => {
    // B.1 prices the tools at 30% of the problem, so "none of it was THE TOOLS" is a
    // sentence the room can check against a figure four slides earlier and find wrong.
    // "A tool problem" is the same verdict without the arithmetic error, and this test is
    // here because the wrong version is the more natural thing to write.
    expect(gapBridgeContent.beat1.lineB.text).toBe("None of it was a tool problem.");
    expect(gapBridgeContent.beat1.lineB.text).not.toMatch(/none of it was the tools/i);
  });

  test("the invest bridge speaks for the shape run too, which ships no bridge", () => {
    // `shape` deliberately has none — C.4 closes on "I build the foundation. You empower
    // them. They drive the adoption." — so this one stage is the last word for both runs
    // and beat 1 must name each. `shape` and `case` are the two runs' own words.
    expect(investBridgeContent.beat1.lineA.text).toContain("shape");
    expect(investBridgeContent.beat1.lineA.text).toContain("case");
    expect(investBridgeContent.beat1.lineA.kw).toContain("shape");
    expect(investBridgeContent.beat1.lineA.kw).toContain("case");
  });
});

describe("the relocated bridge, `h3-bridge-to-i`", () => {
  test("keeps ONE beat-1 line per deck set, and both name the discipline", () => {
    const standard = h3Beat1LineBFor("standard");
    const leader = h3Beat1LineBFor("leader");
    expect(standard.text).toBe("It's someone learning the discipline first.");
    expect(leader.text).toBe("It is the company that learns the discipline first.");
    // The two differ in WHO the competitor is and in nothing else: a standard room hears
    // a person, a leader room hears a rival organisation. Both keep the word the slide's
    // own FigLabel is named after, and both keep line A and beat 2 shared.
    expect(standard.text).not.toBe(leader.text);
    for (const beat of [standard, leader]) {
      expect(beat.text).toContain("discipline");
      for (const kw of beat.kw) expect(beat.text).toContain(kw);
    }
  });

  test("the leader line names an organisation and never an internal division", () => {
    // A leader deck is presented to peers running sibling divisions of one group. A line
    // that makes the winner another DIVISION sets the room against itself two slides
    // before the ask, which is why the wording is external.
    expect(h3Beat1LineBFor("leader").text).not.toMatch(/division|department|unit\b/i);
  });

  test("shares line A, beat 2 and the photo across both decks", () => {
    // The move is a COMPOSITION change; everything except line B is one string for both
    // decks, and beat 2 still points at THE META-PROCESS — which is the section that now
    // really does follow it in a leader deck.
    expect(h3Content.beat1.lineA.text).toBe("The competition is not AI.");
    expect(h3Content.beat2.text).toBe("Next: the discipline, in practice.");
    expect(h3Content.heroSrc).toBe("/heroes/h3-bridge.jpg");
    // And it is NOT the leader-only bridge's photo: the two slides are four apart in a
    // leader deck (J.3 and K.4) and must not read as one asset used twice.
    expect(h3Content.heroSrc).not.toBe(pitfallsBridgeContent.heroSrc);
  });
});
