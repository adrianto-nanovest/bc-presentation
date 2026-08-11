// THE RULE NOBODY WROTE · slide tests. All four poses, and the rules gh#66's AC states
// — held over EVERY authored string and over the RENDERED stage rather than spot-checked.
// REWRITTEN 2026-08-11 with the slide's boxes-and-fray redesign (owner call,
// productionized from the B.2 prototype's variant D; the two condition prose lines left
// the stage with it, and the chip and dot-caption labels arrived through content).
//
// WHAT THIS FILE CAN AND CANNOT PROVE — its siblings' preamble, inherited. jsdom has no
// layout and no media queries, so nothing here measures a pixel and `prefers-reduced-
// motion: reduce` cannot really be toggled. What a DOM-less runner is good for is what
// THIS slide is actually at risk of:
//
//   1. THE THIRD PASS SOUNDING LIKE THE OTHER TWO. §6.2 puts the escalation constraint
//      in the SPEC's voice — the deck's three shadow-AI passes may share no image and no
//      statistic — and both other passes exist as CODE, so the rule is a cross-module
//      sweep over `leader-invest/content.ts`'s real strings (D.3 `invest-chicken-egg` as
//      rational behaviour, D.4 `invest-security` beat 2 as exposure). Held two ways
//      below: a RESERVED-TOKEN list whose every pattern is fired against the string it
//      was read off, and a programmatic word sweep that needs no list at all.
//   2. THE STATISTIC HALF, WHICH IS AN ABSENCE. This stage prints no digit anywhere, at
//      any pose, which is the only form of "shares no statistic" a test can hold as a
//      fact rather than as a list of forbidden values. Both other passes DO carry
//      numbers (D.3's 30-day window, D.4's two index gaps and its dates), so the
//      positive control for the rule is that the other corpora fail it.
//   3. THE CONDITION TURNING INTO AN ACCUSATION. Four unanswered questions with the
//      closer missing — at a pose boundary, or in an export — is a list of findings
//      against a team. That is a REVEAL fact and a copy fact, and both are plain DOM.
//   4. RE-SPENDING THE SLIDE IN FRONT OF IT. B.1 (`gap-hardest-part`) opens the same run
//      on a quoted 70/30 figure. Nothing here may re-spend it or its vocabulary, and
//      that list is drawn from B.1's own strings rather than typed from memory.
//
// WHAT IS LEFT TO THE BROWSER WALK: the squashed-duration half of the reduce-mode AC
// (every reached mark resting on its FINISHED frame — the markup half, that nothing
// under this slide reads `matchMedia` and zero SMIL mounts under either preference, is
// held here); real wrap of the hero faces and the closer; the painted colour ladder;
// and the fray actually reading as a fray rather than as a wedge.
//
// DECK COMPOSITION IS NOT ASSERTED HERE. Where this slide sits in the two leader decks —
// the `gap` run, behind B.1 — belongs to `deck-registry.test.ts` and the numbering
// fixture. `AT` below is a harness INPUT, not a claim the slide makes: this module epoch
// resolves the default `general` deck, which runs no leader slide at all.
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { restoreLocation } from "../harvest/deck-numbering";
import { BRANDS, type Brand, type VariantId } from "@/deck-variants";
import { GapNoSop, gapNoSopSlide } from "@/slides/leader-gap/gap-no-sop";
import { gapHardestPartContent, gapNoSopContent } from "@/slides/leader-gap/content";
// THE OTHER TWO PASSES, AS MODULES. D.3 is `investChickenEggContent`; D.4 is
// `investSecurityContent` plus the brand-resolved callback its beat 1 prints. Imported
// so §6.2's disjointness is checked against what those slides ACTUALLY say today rather
// than against a copy of it kept here.
import {
  investChickenEggContent,
  investSecurityContent,
  onPremCallbackFor,
} from "@/slides/leader-invest/content";
import {
  FRAY_STRAND_COUNT,
  ISSUED_COUNT,
  NAV_ZONE_CLEARANCE,
  QUESTION_COUNT,
  VERDICT_CLEARANCE,
} from "@/slides/leader-gap/no-sop-geometry";

const C = gapNoSopContent;
const POSES = [0, 1, 2, 3] as const;

/**
 * The position this slide holds in the decks that will run it.
 *
 * `at` IS required here, the case every leader-only sibling documents: unit tests resolve
 * the default `general` deck, `general` has no leader variant, and this slide reaches the
 * leader deck sets alone. B.2 because the `gap` run is the leader decks' first (§4.3) and
 * this slide is its second — a harness INPUT, not a claim the slide makes (§3.5). No file
 * under `src/slides/leader-gap/` names either half of it, which is the rule the
 * figure-freedom block below holds.
 */
const AT = { letter: "B", num: 2, sectionKey: "gap" } as const;

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
    <SlideHarness def={gapNoSopSlide} at={AT}>
      <Nav />
      <GapNoSop />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

// ── the stage's state model, by pose ─────────────────────────────────────────
//
// THE REDESIGN CHANGES WHAT "REVEALED" MEANS, so this file holds a STATE MODEL rather
// than the accumulating band list its first cut held. The scene is persistent: every
// box exists from its beat on and never leaves, but the two hero bands CROSSFADE into
// chip receipts when the fray arrives — so an element is one of three kinds:
//
//   gate    — always in the DOM, visibility written as inline opacity ("1"/"0") by the
//             component's `gate` helper. Read the way `gap-hardest-part.test.tsx`
//             reads its own morphing scene.
//   mount   — in the DOM only from its beat on (the spine's second segment, the fray,
//             the marching line, the verdict), so the entry choreography replays on a
//             walk back and forth. Read as presence.
//   static  — in the DOM from pose 0 and never gated (the first band's title, the
//             seven boxes' shells, the first dot and its caption).
//
// `when` is a PREDICATE over the pose and not a band index, because the honest
// invariant of a crossfade is not monotone: the hero faces are on through poses 0–1
// and OFF after, while their chip faces are the reverse — the ITEM is on stage at
// every pose past its beat, in one form or the other.

type Kind = "gate" | "mount" | "static";
interface Expectation {
  id: string;
  kind: Kind;
  when: (pose: number) => boolean;
}

const EXPECTED: readonly Expectation[] = [
  { id: "no-sop-issued-eyebrow", kind: "static", when: () => true },
  ...C.issued.map<Expectation>((item) => ({
    id: `no-sop-issued-${item.id}`,
    kind: "static",
    when: () => true,
  })),
  ...C.issued.map<Expectation>((item) => ({
    id: `no-sop-issued-hero-${item.id}`,
    kind: "gate",
    when: (p) => p < 2,
  })),
  ...C.issued.map<Expectation>((item) => ({
    id: `no-sop-issued-chip-${item.id}`,
    kind: "gate",
    when: (p) => p >= 2,
  })),
  { id: "no-sop-dot-label-issued", kind: "static", when: () => true },
  { id: "no-sop-unwritten-eyebrow", kind: "gate", when: (p) => p >= 1 },
  ...C.questions.map<Expectation>((item) => ({
    id: `no-sop-question-${item.id}`,
    kind: "gate",
    when: (p) => p >= 1,
  })),
  ...C.questions.map<Expectation>((item) => ({
    id: `no-sop-question-hero-${item.id}`,
    kind: "gate",
    when: (p) => p < 2,
  })),
  ...C.questions.map<Expectation>((item) => ({
    id: `no-sop-question-chip-${item.id}`,
    kind: "gate",
    when: (p) => p >= 2,
  })),
  { id: "no-sop-spine-unwritten", kind: "mount", when: (p) => p >= 1 },
  { id: "no-sop-dot-unwritten", kind: "mount", when: (p) => p >= 1 },
  { id: "no-sop-dot-label-unwritten", kind: "mount", when: (p) => p >= 1 },
  { id: "no-sop-condition-eyebrow", kind: "gate", when: (p) => p >= 2 },
  { id: "no-sop-fray", kind: "mount", when: (p) => p >= 2 },
  { id: "no-sop-leader-line", kind: "mount", when: (p) => p >= 3 },
  { id: "no-sop-closer", kind: "mount", when: (p) => p >= 3 },
] as const;

/** A gate's state, read off the inline opacity the component always writes. */
function gateOpen(id: string): boolean {
  const opacity = screen.getByTestId(id).style.opacity;
  if (opacity !== "1" && opacity !== "0") {
    throw new Error(`"${id}" carries no inline gate opacity — the renderer's hook changed`);
  }
  return opacity === "1";
}

const mounted = (id: string) => screen.queryByTestId(id) !== null;

/** How many milliseconds into its pose a GATE opens — parsed off the delayed opacity
 *  entry in the element's own transition string (the component zeroes it while off). */
function gateDelay(id: string): number {
  const el = screen.getByTestId(id);
  const match = /opacity 450ms var\(--ease\) (\d+)ms/.exec(el.style.transition);
  if (!match) throw new Error(`"${id}" carries no delayed opacity transition`);
  return Number(match[1]);
}

// ── the copy, as one set of strings ──────────────────────────────────────────

/** Every string reachable from `value` — the walk, not a hand list, for the sibling
 *  files' reason: a field added next month is inside every rule below the day it
 *  exists. It collects `id` fields too, deliberately: those reach the DOM as
 *  `data-testid`, and a borrowed image written into a hook is the same defect written
 *  somewhere less visible. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/** Every string this slide can put on a stage. ONE block, because this slide has no
 *  brand axis — see the `no brand variance` describe below, which holds that as a rule. */
const authoredStrings = (): string[] => walkStrings(C);

/**
 * D.3's corpus — shadow AI as RATIONAL BEHAVIOUR (§6.7, gh#57).
 *
 * Read off the module rather than transcribed, so a reworded cost or a fifth pilot term
 * is inside every rule below the day it is written.
 */
const d3Strings = (): string[] => walkStrings(investChickenEggContent);

/**
 * D.4's corpus — shadow AI as EXPOSURE (§6.7 beat 2, gh#58), including every brand's
 * on-prem callback.
 *
 * WALKED OVER `BRANDS` AND NOT OVER A LIST OF TWO. The callback table is deliberately not
 * exported, so the only honest way to reach all three arms is to resolve each registered
 * brand — which is also what makes this "every string D.4 can print in any room".
 */
const d4Strings = (): string[] => [
  ...walkStrings(investSecurityContent),
  ...(Object.keys(BRANDS) as Brand[]).flatMap((brand) => walkStrings(onPremCallbackFor(brand))),
];

/** B.1's corpus — the slide one figure in front of this one, in the same run. */
const b1Strings = (): string[] => walkStrings(gapHardestPartContent);

/** The TWO PROSE strings, each with the `*Kw` sibling the copy module pairs it with.
 *  Two and not four: the 2026-08-11 redesign cut the two condition lines — the
 *  presenter says those sentences, and the fray draws them. */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ["closer", C.closer, C.closerKw],
];

/** The TWENTY LABEL strings, which carry no `*Kw` and may not gain one. Written out as
 *  a list on purpose: together with `PROSE` above it is checked against what the STAGE
 *  actually prints, so a twenty-third string has to pick a side before it can render. */
const LABELS: readonly string[] = [
  C.figLabel,
  C.issuedEyebrow,
  C.unwrittenEyebrow,
  C.conditionEyebrow,
  C.issuedDotLabel,
  C.unwrittenDotLabel,
  ...C.issued.map((item) => item.label),
  ...C.issued.map((item) => item.short),
  ...C.questions.map((item) => item.label),
  ...C.questions.map((item) => item.short),
];

/** Every string this slide PRINTS — the two sides of the keyword rule, together. */
const printedStrings = (): string[] => [...PROSE.map(([, copy]) => copy), ...LABELS];

/** Everything the stage renders, minus the one element that legitimately prints a
 *  DERIVED figure reference. Stripped from a CLONE: React owns those nodes and removing
 *  one behind its back throws on the next commit. */
function stageTextWithoutFigLabel(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

/** The label half of the `FigLabel` — its last span, which is the only part of that
 *  element this slide authors. The `B.2` in front of it is the composer's. */
function figLabelText(container: HTMLElement): string {
  const spans = container.querySelectorAll(".fig-label span");
  return spans[spans.length - 1]?.textContent ?? "";
}

/**
 * What the stage prints, read off the DOM — one entry per type-carrying element. Every
 * box holds BOTH its faces at every pose (the crossfade is opacity, not markup), so
 * the census reads the faces rather than the boxes: a box's own textContent would be
 * two strings concatenated.
 */
function stagePrintedStrings(container: HTMLElement): string[] {
  const heading = container.querySelector("h1")?.textContent ?? "";
  const faces = [
    "no-sop-issued-eyebrow",
    "no-sop-unwritten-eyebrow",
    "no-sop-condition-eyebrow",
    "no-sop-dot-label-issued",
    "no-sop-dot-label-unwritten",
    ...C.issued.flatMap((item) => [`no-sop-issued-hero-${item.id}`, `no-sop-issued-chip-${item.id}`]),
    ...C.questions.flatMap((item) => [
      `no-sop-question-hero-${item.id}`,
      `no-sop-question-chip-${item.id}`,
    ]),
    "no-sop-closer",
  ];
  return [
    heading,
    figLabelText(container),
    ...faces.map((id) => screen.getByTestId(id).textContent ?? ""),
  ];
}

// ── the slide def ────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("declares 4 poses with the fullest one canonical", () => {
    expect(gapNoSopSlide.id).toBe("gap-no-sop");
    expect(gapNoSopSlide.steps).toBe(4);
    // The exported PDF has no presenter attached, so the exported frame must be the one
    // that is safe to read alone. Anything lower would export a page of four unanswered
    // questions and a frayed line with no sentence saying that nobody broke anything — a
    // slide somebody else can re-caption as a list of findings against a team.
    expect(gapNoSopSlide.canonicalPose).toBe(3);
    expect(gapNoSopSlide.canonicalPose).toBe(gapNoSopSlide.steps - 1);
    expect(gapNoSopSlide.animationMode).toBe("step-reveal");
    expect(gapNoSopSlide.surface).toBe("dark");
    expect(gapNoSopSlide.sectionKey).toBe("gap");
  });

  test("the geometry still clears the NavBar band", () => {
    // 3px under the dot captions — the tightest floor in the leader tree, the
    // owner-approved prototype geometry on the real stage — and 6px under the closer's
    // SECOND line, the number this stage actually broke once (the prototype's verdict
    // shelf wrapped through the band). Both derived from both ends in the geometry
    // module, so an edit anywhere above moves the number before the stage crosses.
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);
    expect(VERDICT_CLEARANCE).toBeGreaterThan(0);
  });
});

// ── AC · the condition framing ───────────────────────────────────────────────

describe("shadow AI as a CONDITION, argued over the copy rather than named", () => {
  // §6.2 assigns this slide `condition`, D.3 `rational behaviour` and D.4 beat 2
  // `exposure`. A pass cannot be checked by its own name — the stage never says "shadow
  // AI" at all — so what is held below is the SHAPE of the argument: an absence, what the
  // absence produced, nobody blamed for it, and no claim about what anybody did with the
  // tools or about what nobody can do afterwards.

  test("states an absence and what filled it, in that order, with no actor named", () => {
    // THE HEADLINE IS THE CONDITION IN ONE SENTENCE and its two clauses are the beat:
    // the absence, then what the absence produced. The keyword sits on the second half,
    // because the first is the half the room already agrees with.
    expect(C.headline).toBe("Nobody wrote the rule. So everybody wrote their own.");
    expect(C.headlineKw).toEqual(["everybody wrote their own"]);
    expect(C.headline.indexOf("Nobody wrote the rule")).toBeLessThan(
      C.headline.indexOf("everybody wrote their own"),
    );
    // "Nobody" AND "everybody", never a party. The moment either clause acquires a
    // subject the slide is §6.3's confession or an accusation aimed at the room.
    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage, "positive control: the stage is not empty").toContain(C.headline);
    for (const copy of [...authoredStrings(), stage]) {
      expect(copy, `a first-person-plural subject in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(we|we're|we've|our|ours|us)\b/i,
      );
    }
    unmount();
  });

  test("blames nobody — and says so in the sentence the export carries", () => {
    // THE CLOSER REFUSES THE READING THE ROOM ARRIVES AT ON ITS OWN. By the time a leader
    // has read four unanswered questions, the available conclusion is that somebody is
    // being careless — and that conclusion poisons the two passes behind this one. So the
    // last sentence says the opposite in the plainest words available, and then hands the
    // room the job.
    expect(C.closer).toBe(
      "Nobody broke a rule. There was no rule to break — and writing one is the leader's job.",
    );
    expect(C.closerKw).toEqual(["no rule to break"]);

    // AND NO BLAME VOCABULARY ANYWHERE, held as a sweep so a reword cannot reintroduce it
    // three strings away from the sentence that refuses it.
    const BLAME =
      /\b(careless|carelessness|negligen\w*|reckless\w*|violat\w*|misuse|misconduct|culprit|blame\w*|guilty|at fault|discipline|disciplinary|punish\w*|wrongdoing|offend\w*)\b/i;
    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    for (const copy of [...authoredStrings(), stage]) {
      expect(copy, `blame in ${JSON.stringify(copy)}`).not.toMatch(BLAME);
    }
    expect(stage, "the refusal is on the exported pose").toContain(C.closer);
    expect(gapNoSopSlide.canonicalPose).toBe(3);
    // POSITIVE CONTROL: the sweep is alive and catches the reading the closer refuses.
    expect(BLAME.test("Somebody was careless, and that is a discipline problem.")).toBe(true);
    unmount();
  });

  test("the issued band is three things done RIGHT, and the question band asks", () => {
    // A BAND OF FAILURES WOULD MAKE THE SLIDE AN ACCUSATION. Every issued box is a
    // thing a competent rollout does — a login, a demonstration, encouragement in writing
    // — so nobody in the room has to defend anything to agree with the stage. Held as a
    // shape rule over both bands rather than as a transcription of fourteen labels: the
    // issued faces state, the question faces ask, and no issued face is a negation.
    expect(C.issued.map((item) => item.id)).toEqual(["login", "demonstration", "encouragement"]);
    expect(C.questions.map((item) => item.id)).toEqual([
      "may-go-in",
      "may-never",
      "who-decides",
      "who-hears",
    ]);
    for (const item of C.issued) {
      for (const face of [item.label, item.short]) {
        expect(face, item.id).not.toMatch(/\?/);
        expect(face, `${item.id} is a thing done, not a thing missing`).not.toMatch(
          /\b(no|not|never|without|failed|missing)\b/i,
        );
      }
      expect(item.label.length, item.id).toBeGreaterThan(20);
    }
    // EVERY QUESTION ASKS ON BOTH FACES — the hero sentence in the first person singular
    // of the person at the desk, the chip as the same question compressed. That is the
    // one place "I" is allowed on this stage, and the sweep below proves it is the ONLY
    // place, so the slide never slips into §6.3's first-person story.
    for (const item of C.questions) {
      expect(item.label, item.id).toMatch(/\?$/);
      expect(item.short, `${item.id}'s chip still asks`).toMatch(/\?$/);
    }
    const questionLabels = new Set(C.questions.map((item) => item.label));
    for (const copy of authoredStrings()) {
      if (questionLabels.has(copy)) continue;
      expect(copy, `first person outside a question: ${JSON.stringify(copy)}`).not.toMatch(
        /\bI\b|\bmy\b|\bI'm\b|\bI've\b/,
      );
    }
    // The escalation down the grid — permission, prohibition, arbitration, disclosure —
    // is the ORDER, and it is the argument rather than a sort.
    expect(C.questions[0].label).toMatch(/\bmay I\b/);
    expect(C.questions[1].label).toMatch(/\bmay never\b/);
    expect(C.questions[2].label).toMatch(/\bWho decides\b/);
    expect(C.questions[3].label).toMatch(/\bWho do I tell\b/);
  });

  test("makes no claim about what anybody DID with the tools, and none about exposure", () => {
    // THE TWO NEIGHBOURING PASSES, REFUSED BY SHAPE RATHER THAN BY TOKEN. D.3 is a
    // first-person story of what was done (the token list below holds its vocabulary);
    // D.4 is what nobody can do about it afterwards. This slide's verbs stay in the
    // present, about the organisation: a question is asked, a line stops, and nothing
    // is audited, revoked, produced, leaked or breached.
    const EXPOSURE =
      /\b(exposure|exposed|audit\w*|revoke\w*|breach\w*|leak\w*|incident|regulator\w*|liabilit\w*|penalt\w*)\b/i;
    const DID_IT = /\b(we tried|we built|we did|we learned|what went wrong|workaround)\b/i;
    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    for (const copy of [...authoredStrings(), stage]) {
      expect(copy, `an exposure claim in ${JSON.stringify(copy)}`).not.toMatch(EXPOSURE);
      expect(copy, `a behaviour story in ${JSON.stringify(copy)}`).not.toMatch(DID_IT);
    }
    // POSITIVE CONTROLS, fired against the two passes' own sentences rather than against
    // strings edited to make them fire: D.4's exposure line and D.3's confession.
    expect(EXPOSURE.test(investSecurityContent.exposures[0].label)).toBe(true);
    expect(DID_IT.test(investChickenEggContent.workaround)).toBe(true);
    unmount();

    // AND THE CONDITION IS STILL STATED — DRAWN, SINCE THE REDESIGN, RATHER THAN SAID.
    // The two condition sentences left the stage with the 2026-08-11 rewrite (the
    // presenter carries them); what carries the beat on the stage is the fray under its
    // own heading. So the rendered claim is held over the marks: the heading is there,
    // and the fan it labels is two dozen strands leaving one stopped point.
    expect(C.conditionEyebrow).toBe("WHAT THE SILENCE LEAVES BEHIND");
    const second = renderSlide(2);
    expect(gateOpen("no-sop-condition-eyebrow")).toBe(true);
    expect(
      second.container.querySelectorAll('[data-testid="no-sop-fray"] > g').length,
    ).toBe(FRAY_STRAND_COUNT);
    // AND THE VERB STAYS UNSPELLED. `improvise` is §6.2's word; since the redesign no
    // rendered string spells any form of it — the fray is the improvisation. The
    // sibling files control the token against the spec sentence now (the same split
    // they run for `no guidance` and `no SOP`), and this is the other half: it cannot
    // quietly come back here without this line failing.
    for (const copy of authoredStrings()) {
      expect(copy, `a spelled improvisation in ${JSON.stringify(copy)}`).not.toMatch(
        /\bimprovis\w*\b/i,
      );
    }
    second.unmount();
  });
});

// ── AC · §6.2 · no shared image, no shared statistic ─────────────────────────

/**
 * The tokens the other two passes own, each drawn from a string that pass ACTUALLY
 * prints today and each fired against that pass's own corpus below.
 *
 * WHY A LIST AT ALL, GIVEN THE WORD SWEEP BELOW IT. The sweep catches any long word the
 * three passes share; this list catches the PHRASES, which are the images — "kill
 * criterion" and "consumer account" are two ordinary words each and would pass a
 * word-by-word intersection. Neither half is sufficient and both are cheap.
 *
 * WHAT IT IS NOT: a proof about images. Two slides can share a picture without sharing a
 * word — "people route around a control" is one image however it is spelled — and no
 * grep will ever see that. §6.2's real check is a human reading all three passes; this is
 * the guard against the cheapest way to break it, which is lifting the other pass's
 * vocabulary.
 */
const RESERVED: ReadonlyArray<readonly [string, RegExp, "D.3" | "D.4"]> = [
  // D.3 — the deadlock, the workaround, its bill, and the pilot that replaces it.
  ["deadlock", /\bdeadlock\b/i, "D.3"],
  ["budget", /\bbudget\b/i, "D.3"],
  ["proof", /\bproof\b/i, "D.3"],
  ["shared accounts", /\bshared accounts?\b/i, "D.3"],
  ["banned", /\bbanned\b/i, "D.3"],
  ["what it cost", /\bcosts?\b/i, "D.3"],
  ["mid-stream", /\bmid-stream\b/i, "D.3"],
  ["the boundary", /\bboundary\b/i, "D.3"],
  ["invisible", /\binvisible\b/i, "D.3"],
  ["investment", /\binvestment\b/i, "D.3"],
  ["pilot", /\bpilot\b/i, "D.3"],
  ["seats", /\bseats?\b/i, "D.3"],
  ["use case", /\buse cases?\b/i, "D.3"],
  ["kill criterion", /\bkill criterion\b/i, "D.3"],
  ["spend cap", /\bspend cap\b/i, "D.3"],
  // D.4 — the three destinations, the exposure, and the SOP the section recommends.
  ["the contract", /\bcontracts?\b/i, "D.4"],
  ["consumer account", /\bconsumer accounts?\b/i, "D.4"],
  ["workspace", /\bworkspace\b/i, "D.4"],
  ["self-hosted", /\bself-host\w*\b/i, "D.4"],
  ["on-prem", /\bon-prem\w*\b/i, "D.4"],
  ["the frontier", /\bfrontier\b/i, "D.4"],
  ["hardware", /\bhardware\b/i, "D.4"],
  ["the vendor", /\bvendors?\b/i, "D.4"],
  ["shadow AI", /\bshadow\b/i, "D.4"],
  ["administers", /\badminister\w*\b/i, "D.4"],
  ["cannot produce", /\bproduce\b/i, "D.4"],
  ["the SOP", /\bSOPs?\b/i, "D.4"],
  ["governance", /\bgovernance\b/i, "D.4"],
  ["retrofit", /\bretrofit\b/i, "D.4"],
  ["Culture, Risk, Governance, Ethics", /\bethics\b/i, "D.4"],
  ["Sinar Mas", /\bSinar Mas\b/i, "D.4"],
];

/**
 * The long words the three passes DO share, and every one of them is an ordinary word
 * that carries no image.
 *
 * MEASURED, NOT CHOSEN. The sweep below intersects B.2's vocabulary with D.3's and D.4's
 * real strings and requires the result to be EXACTLY this list — so a padded entry fails
 * as loudly as a borrowed one, and a new B.2 string that reaches for one of the other
 * passes' words has to be argued here before it can render.
 *
 * REMEASURED 2026-08-11 with the fray redesign: `answers` and `where` left with the two
 * condition lines, and none of the new chip or dot-caption labels brought a shared word
 * in — the chips are the hero faces' own vocabulary compressed.
 */
const ORDINARY_SHARED: readonly string[] = [
  "already",
  "asked",
  "leaves",
  "nobody",
  "organisation",
  "there",
];

/** Every word of five letters or more in a corpus, lower-cased. Five, because below it
 *  the intersection is the language's own connective tissue ("what", "when", "work") and
 *  a rule about those is a rule about English rather than about two slides. The short
 *  images the threshold would miss — `SOP`, `seats`, `cost` — are in `RESERVED` above. */
function longWords(strings: readonly string[]): Set<string> {
  const out = new Set<string>();
  for (const copy of strings) {
    for (const word of copy.toLowerCase().match(/[a-z][a-z'-]*/g) ?? []) {
      if (word.length >= 5) out.add(word);
    }
  }
  return out;
}

describe("§6.2 · the third pass shares no image and no statistic with the other two", () => {
  test("prints NO DIGIT AT ALL — the statistic half, held as an absence", () => {
    // THE CHEAPEST WAY TO SHARE NO STATISTIC IS TO CARRY NONE, and it is the only way a
    // test can hold the rule as a fact instead of as a list of forbidden values. Held
    // over the authored copy AND over the rendered stage, with the composer's own
    // `B.2` stripped — that digit is derived per deck (§3.5) and is not this slide's.
    // The step diagram's SVG paths carry coordinates, not text: `textContent` is blind
    // to attributes, which is exactly the boundary the rule wants — a NUMBER READ BY
    // THE ROOM is what a shared statistic is.
    for (const copy of authoredStrings()) {
      expect(copy, `a digit in ${JSON.stringify(copy)}`).not.toMatch(/\d/);
    }
    const { container, unmount } = renderSlide(3);
    expect(
      container.querySelector(".fig-label")?.textContent,
      "the derived reference is there to strip",
    ).toContain(`${AT.letter}.${AT.num}`);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(400);
    expect(stage).not.toMatch(/\d/);
    unmount();

    // POSITIVE CONTROL, AND IT IS THE POINT OF THE RULE: both other passes DO carry
    // numbers — D.3's 30-day window, D.4's two index gaps and its dated sources — so
    // "no digit here" is a real disjointness rather than a property every slide has.
    expect(d3Strings().some((copy) => /\d/.test(copy))).toBe(true);
    expect(d4Strings().some((copy) => /\d/.test(copy))).toBe(true);
  });

  test("uses none of D.3's or D.4's reserved images — and every pattern fires", () => {
    const authored = authoredStrings();
    expect(authored.length, "a rule over an empty set proves nothing").toBeGreaterThan(15);

    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    for (const [name, pattern, owner] of RESERVED) {
      for (const copy of authored) {
        expect(pattern.test(copy), `${owner}'s "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `${owner}'s "${name}" reached the stage`).toBe(false);
    }
    unmount();

    // EVERY PATTERN FIRED AGAINST THE SLIDE IT WAS READ OFF. Thirty-one regexes that
    // matched nothing would make the rule above pass on copy lifted verbatim from either
    // pass — so each one is checked against that pass's REAL strings, not against a
    // sentence written here to make it fire.
    const d3 = d3Strings();
    const d4 = d4Strings();
    for (const [name, pattern, owner] of RESERVED) {
      const corpus = owner === "D.3" ? d3 : d4;
      expect(
        corpus.some((copy) => pattern.test(copy)),
        `"${name}" is supposed to be ${owner}'s, but ${owner} does not print it`,
      ).toBe(true);
    }
  });

  test("shares no distinctive vocabulary either — swept over the other passes' strings", () => {
    // THE HALF THAT NEEDS NO LIST. Every long word B.2 prints, intersected with every
    // long word D.3 and D.4 print, must be exactly the ordinary-word set above — so a
    // borrowed image is caught even when nobody thought to reserve the word for it.
    const mine = longWords(authoredStrings());
    const theirs = longWords([...d3Strings(), ...d4Strings()]);
    const shared = [...mine].filter((word) => theirs.has(word)).sort();
    expect(shared).toEqual([...ORDINARY_SHARED].sort());

    // NON-VACUITY, both ends: the two vocabularies are real and the intersection is a
    // small tail of them rather than an artefact of an empty set. The floor is 25 and
    // not the first cut's 40 — the redesign moved two sentences from the stage to the
    // presenter, and the honest response is a smaller corpus, not padded copy.
    expect(mine.size).toBeGreaterThan(25);
    expect(theirs.size).toBeGreaterThan(100);
    expect(shared.length).toBeLessThan(mine.size / 4);
    // AND THE SWEEP CATCHES A BORROWED IMAGE — fired with D.4's own exposure line, which
    // is the sentence this slide is closest to and furthest from.
    const poached = longWords([investSecurityContent.exposureLine]);
    expect([...poached].filter((word) => theirs.has(word)).length).toBeGreaterThan(0);
    expect([...poached].some((word) => !ORDINARY_SHARED.includes(word))).toBe(true);
  });
});

// ── AC · nothing of B.1's is re-spent ────────────────────────────────────────

describe("the slide in front of it keeps its statistic and its vocabulary", () => {
  /** B.1's own tokens — its quoted figure, its two halves and its four verbs. Each is
   *  fired against `gapHardestPartContent`'s real strings below, so the list cannot rot
   *  into a set of patterns that match nothing. */
  const B1_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
    ["70%", /\b70\s*%/],
    ["30%", /\b30\s*%/],
    ["people & process", /people\s*&\s*process/i],
    ["not technology", /\bnot technology\b/i],
    ["technology", /\btechnolog\w*\b/i],
    ["procured", /\bprocure\w*\b/i],
    ["earned", /\bearn\w*\b/i],
    ["invoice", /\binvoice\b/i],
    ["tool access", /\btool access\b/i],
    ["capability", /\bcapabilit\w*\b/i],
    ["BCG", /\bBCG\b/],
    ["McKinsey", /\bMcKinsey\b/i],
  ];

  test("re-spends neither the 70/30 figure nor B.1's words", () => {
    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    // THE BARE PHRASE `70/30` IS NOT IN THE FIRED LIST BELOW, and the reason is worth
    // recording: B.1 never prints it either — §6.5's Capability Ladder owns that spelling
    // and B.1's own tests forbid it — so a pattern for it could not be fired against B.1's
    // strings without a false claim about where it came from. It is still refused here,
    // because B.1's split IS 70 against 30 and the shorthand for it would read as B.1's
    // sentence arriving one slide late.
    expect(stage).not.toMatch(/\b70\s*\/\s*30\b/);
    for (const copy of authoredStrings()) expect(copy).not.toMatch(/\b70\s*\/\s*30\b/);
    for (const [name, pattern] of B1_TOKENS) {
      for (const copy of authoredStrings()) {
        expect(pattern.test(copy), `B.1's "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `B.1's "${name}" reached the stage`).toBe(false);
    }
    unmount();

    // AND EVERY PATTERN IS B.1'S, checked against B.1's own block: a token list drawn
    // from the neighbouring slide rather than from memory.
    const b1 = b1Strings();
    for (const [name, pattern] of B1_TOKENS) {
      expect(
        b1.some((copy) => pattern.test(copy)),
        `"${name}" is supposed to be B.1's, but B.1 does not print it`,
      ).toBe(true);
    }
    // The two slides also share no long word beyond the ordinary — the same sweep as
    // §6.2's, pointed one slide forward instead of one section back, and pinned as an
    // EQUALITY for the same reason: a padded entry fails as loudly as a borrowed one.
    const shared = [...longWords(authoredStrings())]
      .filter((word) => longWords(b1).has(word))
      .sort();
    // One word, and it is ordinary: the two slides run back to back and read as one
    // run without sharing an argument. REMEASURED 2026-08-11 after this slide's fray
    // redesign: "everyone" and "still" left with the two condition lines, and "never"
    // — B.1's "never on an invoice" against this slide's "never wrote down" — is a
    // shared adverb, not a shared image.
    expect(shared).toEqual(["never"]);
  });
});

// ── AC · every string reaches the stage, and every pose is complete ──────────

describe("the stage prints exactly what the copy block authors", () => {
  test("all twenty-two strings are in the DOM at the canonical pose", () => {
    const { container, unmount } = renderSlide(gapNoSopSlide.canonicalPose);

    // THE HEADLINE AND THE FIG LABEL, which are the slide file's rather than the
    // figure's — a census scoped to `no-sop-` testids would miss both.
    expect(container.querySelector("h1")?.textContent).toBe(C.headline);
    expect(figLabelText(container)).toBe(C.figLabel);
    expect(C.figLabel).toBe("THE RULE NOBODY WROTE");

    // …then every face that carries type, compared against the string it was given.
    // Both faces of every box are in the DOM at every pose — the crossfade is opacity,
    // not markup — so the hero sentences are checked at the CHIP pose deliberately.
    for (const item of C.issued) {
      expect(screen.getByTestId(`no-sop-issued-hero-${item.id}`).textContent, item.id).toBe(
        item.label,
      );
      expect(screen.getByTestId(`no-sop-issued-chip-${item.id}`).textContent, item.id).toBe(
        item.short,
      );
    }
    for (const item of C.questions) {
      expect(screen.getByTestId(`no-sop-question-hero-${item.id}`).textContent, item.id).toBe(
        item.label,
      );
      expect(screen.getByTestId(`no-sop-question-chip-${item.id}`).textContent, item.id).toBe(
        item.short,
      );
    }
    for (const [id, copy] of [
      ["no-sop-issued-eyebrow", C.issuedEyebrow],
      ["no-sop-unwritten-eyebrow", C.unwrittenEyebrow],
      ["no-sop-condition-eyebrow", C.conditionEyebrow],
      ["no-sop-dot-label-issued", C.issuedDotLabel],
      ["no-sop-dot-label-unwritten", C.unwrittenDotLabel],
      ["no-sop-closer", C.closer],
    ] as const) {
      expect(screen.getByTestId(id).textContent, id).toBe(copy);
    }

    // AND THE CENSUS IS EXACT IN BOTH DIRECTIONS: what the stage prints IS the
    // twenty-two strings the keyword rule below partitions, no more and no fewer. A
    // twenty-third string cannot render without landing in `PROSE` or in `LABELS` first.
    expect(stagePrintedStrings(container).sort()).toEqual(printedStrings().sort());
    expect(printedStrings()).toHaveLength(PROSE.length + LABELS.length);
    expect(LABELS).toHaveLength(20);
    expect(ISSUED_COUNT).toBe(C.issued.length);
    expect(QUESTION_COUNT).toBe(C.questions.length);
    unmount();
  });

  test("the four answer rules are EMPTY at every pose — the image, never filled", () => {
    // THE SURVIVING HALF OF THE FIRST CUT'S IMAGE. A blank that gained content at any
    // pose would be the stage answering the question the slide exists to say nobody
    // answered — and it is part of the image §6.2 reserves to this pass, so it is
    // checked at every stop and not only at the fullest one. THE PAIR IS ONE FACE now,
    // by construction: the blank is a child of its question's hero face, so a question
    // cannot arrive without its blank — what the first cut asserted as equal delays is
    // an ancestry fact here.
    const { unmount } = renderSlide();
    for (const pose of POSES) {
      goToPose(pose);
      for (const item of C.questions) {
        const blank = screen.getByTestId(`no-sop-answer-blank-${item.id}`);
        expect(blank.textContent, `${item.id} at pose ${pose}`).toBe("");
        expect(blank.children.length, `${item.id} at pose ${pose}`).toBe(0);
        expect(
          screen.getByTestId(`no-sop-question-hero-${item.id}`).contains(blank),
          `${item.id}'s blank belongs to its own question face`,
        ).toBe(true);
        // One emphatic hairline in the blank tier, never anything brighter: the empty
        // rule must stay the dimmest mark inside the box that holds it.
        expect(blank.style.background).toBe("var(--copper-700)");
      }
    }
    unmount();
  });
});

describe("the pose walk", () => {
  test("every pose matches the state model, in both directions", () => {
    const { container, unmount } = renderSlide();
    const walk = [...POSES, ...[...POSES].reverse()];
    for (const pose of walk) {
      goToPose(pose);
      for (const { id, kind, when } of EXPECTED) {
        const wanted = when(pose);
        if (kind === "mount") {
          expect(mounted(id), `${id} mounted at pose ${pose}`).toBe(wanted);
        } else if (kind === "gate") {
          expect(gateOpen(id), `${id} at pose ${pose}`).toBe(wanted);
        } else {
          expect(mounted(id), `${id} (static) at pose ${pose}`).toBe(true);
        }
        // AND THE COPY IS THERE, not merely the box: a path that dropped children would
        // still pass a visibility check. Held for every type-carrying element the model
        // expects on stage.
        if (wanted && kind !== "mount" && !/blank|spine|dot-issued$|fray|leader-line/.test(id)) {
          const el = screen.getByTestId(id);
          if (!(el instanceof SVGElement) && !/no-sop-(issued|question)-[a-z-]+$/.test(id)) {
            expect(el.textContent, `${id} at pose ${pose}`).not.toBe("");
          }
        }
      }
      // THE FRAY DIMS AT THE CLOSER AND ONLY THERE — argued past, still true. Opacity
      // as TIME, the deck's rule.
      if (pose >= 2) {
        expect(screen.getByTestId("no-sop-fray").style.opacity).toBe(pose >= 3 ? "0.16" : "1");
        expect(
          container.querySelectorAll('[data-testid="no-sop-fray"] > g').length,
          `strands at pose ${pose}`,
        ).toBe(FRAY_STRAND_COUNT);
      }
      // ZERO SMIL NODES AT EVERY STOP — the AC's jsdom half, under the default motion
      // preference. The `reduce` half is below and in the browser walk.
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
          .length,
        `SMIL at pose ${pose}`,
      ).toBe(0);
    }
    unmount();
  });

  test("no pose rests on evidence with its conclusion missing", () => {
    // THE PROPERTY THE POSE MAP IS CHECKED AGAINST, rather than the pose count.
    const { unmount } = renderSlide();

    // POSE 0 — a COMPLETE inventory: the heading, all three boxes with their hero faces
    // open, the spine's first segment and its labelled dot. Nothing of pose 1 is open.
    goToPose(0);
    expect(mounted("no-sop-issued-eyebrow")).toBe(true);
    for (const item of C.issued) expect(gateOpen(`no-sop-issued-hero-${item.id}`)).toBe(true);
    expect(mounted("no-sop-dot-label-issued")).toBe(true);
    expect(mounted("no-sop-spine-unwritten")).toBe(false);

    // POSE 1 — THE HEADING LEADS AND THE QUESTIONS FOLLOW IN THEIR ESCALATION ORDER:
    // the gate delays are strictly increasing down the grid, so the pose's last arrival
    // is the fourth question — disclosure, the escalation's own end — WITH its blank
    // (ancestry, held above). The spine's second segment mounts with the beat: the line
    // visibly STOPS where the writing stopped, evidence and verdict in one mark.
    goToPose(1);
    expect(gateDelay("no-sop-unwritten-eyebrow")).toBeLessThan(
      gateDelay(`no-sop-question-${C.questions[0].id}`),
    );
    for (let i = 1; i < QUESTION_COUNT; i++) {
      expect(
        gateDelay(`no-sop-question-${C.questions[i].id}`),
        `question ${i} arrives after question ${i - 1}`,
      ).toBeGreaterThan(gateDelay(`no-sop-question-${C.questions[i - 1].id}`));
    }
    expect(mounted("no-sop-spine-unwritten")).toBe(true);
    expect(mounted("no-sop-dot-label-unwritten")).toBe(true);

    // POSE 2 — THE FAN IS THE POSE: the only new mount, two dozen strands off the
    // stopped dot, under its own heading. The boxes compact to receipts on the same
    // beat (both bands' chip faces open), so the pose never rests on a stage where the
    // evidence has left before the receipt has landed.
    goToPose(2);
    expect(mounted("no-sop-fray")).toBe(true);
    expect(gateOpen("no-sop-condition-eyebrow")).toBe(true);
    for (const item of C.issued) expect(gateOpen(`no-sop-issued-chip-${item.id}`)).toBe(true);
    for (const item of C.questions) expect(gateOpen(`no-sop-question-chip-${item.id}`)).toBe(true);
    expect(mounted("no-sop-leader-line")).toBe(false);

    // POSE 3 — THE CLOSER IS THE LAST ARRIVAL: the marching line lands at 250ms, the
    // verdict at 650ms, and nothing else is new. That order is the argument — the room
    // sees the one line only the leader can write before being told whose job it is.
    goToPose(3);
    const line = screen.getByTestId("no-sop-leader-line");
    expect(line.style.animation).toContain("250ms");
    const closer = screen.getByTestId("no-sop-closer");
    expect(closer.classList.contains("on")).toBe(true);
    expect(parseFloat(closer.style.transitionDelay)).toBe(650);
    unmount();
  });

  test("mounts SVG for the diagram — and still zero SMIL, by construction", () => {
    // THE REDESIGN'S ONE STRUCTURAL TRADE: the first cut mounted no `<svg>` at all;
    // this stage draws a step diagram and a fray, so it mounts one diagram svg plus one
    // pictogram per box face — and closes the SMIL census the way the Capability Ladder
    // next door closes it: every vector motion is a CSS animation (`no-sop-draw` is
    // `gap-ladder-draw`'s idiom), which the global reduced-motion rule can squash, so
    // there is no `<animate>` to gate at mount and nothing here reads matchMedia.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      const svgs = container.querySelectorAll("svg");
      // 1 diagram + 2 faces × (3 issued + 4 questions) — every face keeps its icon at
      // every pose, because the crossfade is opacity and not markup.
      expect(svgs.length, `pose ${pose}`).toBe(1 + 2 * (ISSUED_COUNT + QUESTION_COUNT));
      for (const svg of svgs) {
        expect(svg.getAttribute("aria-hidden"), "decorative, never read aloud").toBe("true");
        expect(
          svg.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
            .length,
          `SMIL inside an svg at pose ${pose}`,
        ).toBe(0);
      }
      unmount();
    }
  });
});

// ── AC · prefers-reduced-motion: reduce ──────────────────────────────────────

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

  test("mounts zero SMIL nodes at every pose, and every pose still renders complete", () => {
    // SMIL is invisible to the global `prefers-reduced-motion` rule — it squashes CSS
    // durations only — so a SMIL node would have to be gated at mount. This slide has
    // nothing to gate, and that is the claim: the census is identical under either
    // preference because NOTHING under this slide reads `matchMedia` at all. The mock
    // proves the markup is preference-independent, which is the half a DOM test owns;
    // the squashed-duration half (every draw parked on its FINISHED frame, the two
    // infinite decorations run once) is the browser walk's.
    const { container, unmount } = renderSlide();
    for (const pose of POSES) {
      goToPose(pose);
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set, animateColor")
          .length,
        `reduce · pose ${pose}`,
      ).toBe(0);
      expect(container.querySelectorAll("svg").length, `reduce · pose ${pose}`).toBe(
        1 + 2 * (ISSUED_COUNT + QUESTION_COUNT),
      );
      // The state model holds unchanged: everything the pose has reached is there, in
      // the form the pose gives it, and nothing it has not reached is.
      for (const { id, kind, when } of EXPECTED) {
        if (kind === "mount") {
          expect(mounted(id), `reduce · pose ${pose} · ${id}`).toBe(when(pose));
        } else if (kind === "gate") {
          expect(gateOpen(id), `reduce · pose ${pose} · ${id}`).toBe(when(pose));
        } else {
          expect(mounted(id), `reduce · pose ${pose} · ${id}`).toBe(true);
        }
      }
    }
    unmount();
  });
});

// ── AC · the keyword rule: kw on prose only ──────────────────────────────────

describe("the keyword rule", () => {
  test("exactly the two prose strings carry a *Kw sibling, every keyword real", () => {
    // The directory's rule, stated at the top of `../../src/slides/leader-gap/content.ts`
    // and applied here without an exception. PROSE is the headline and the closer —
    // the redesign moved the two condition sentences to the presenter — and everything
    // else is a LABEL. The four QUESTIONS are still the sharpest case (sentence-shaped,
    // they would take emphasis happily) and they are labels, because four copper
    // italics down one grid would rank four things the slide ranks by order alone.
    const kwKeys = Object.keys(C).filter((k) => k.endsWith("Kw"));
    expect(kwKeys.sort()).toEqual(["closerKw", "headlineKw"]);
    expect(kwKeys.sort()).toEqual(PROSE.map(([name]) => `${name}Kw`).sort());
    for (const [name, copy, kws] of PROSE) {
      expect(Array.isArray(kws), name).toBe(true);
      expect(kws.length, `${name} carries no keyword`).toBeGreaterThan(0);
      for (const kw of kws) {
        expect(copy, `${name}Kw: "${kw}" is not in its prose`).toContain(kw);
      }
    }
    // THE TWENTY LABELS CARRY NO SIBLING AT ALL, and the rule is held over the block's
    // own keys rather than over a list of names: any `*Kw` key whose prose sibling is
    // not one of the two above fails the census at the top of this test.
    for (const forbidden of [
      "figLabelKw",
      "issuedEyebrowKw",
      "unwrittenEyebrowKw",
      "conditionEyebrowKw",
      "issuedDotLabelKw",
      "unwrittenDotLabelKw",
      "issuedKw",
      "questionsKw",
      "conditionLineKw",
      "consequenceLineKw",
    ]) {
      expect(Object.keys(C), forbidden).not.toContain(forbidden);
    }
    // A LABEL AND A PROSE STRING MAY NOT BE THE SAME STRING, which is what makes the
    // partition below a partition rather than two overlapping lists.
    expect(new Set(printedStrings()).size).toBe(printedStrings().length);
  });

  test("every label renders with no emphasis, while the prose boxes do carry theirs", () => {
    const { container, unmount } = renderSlide(3);
    const labelIds = [
      "no-sop-issued-eyebrow",
      "no-sop-unwritten-eyebrow",
      "no-sop-condition-eyebrow",
      "no-sop-dot-label-issued",
      "no-sop-dot-label-unwritten",
      ...C.issued.flatMap((item) => [
        `no-sop-issued-hero-${item.id}`,
        `no-sop-issued-chip-${item.id}`,
      ]),
      ...C.questions.flatMap((item) => [
        `no-sop-question-hero-${item.id}`,
        `no-sop-question-chip-${item.id}`,
      ]),
    ];
    for (const id of labelIds) {
      expect(screen.getByTestId(id).querySelectorAll("em").length, `<em> inside label ${id}`).toBe(
        0,
      );
    }
    // The fig label is a label too, and the only copper text on the stage that is not a
    // mono heading — it takes no emphasis either.
    expect(container.querySelector(".fig-label")?.querySelectorAll("em").length).toBe(0);

    // …while the prose boxes DO carry theirs, one `<em>` per keyword, so the absence above
    // cannot pass because emphasis stopped rendering everywhere.
    const closerEms = [...screen.getByTestId("no-sop-closer").querySelectorAll("em")].map(
      (em) => em.textContent,
    );
    expect(closerEms).toHaveLength(C.closerKw.length);
    for (const kw of C.closerKw) expect(closerEms, `closer · ${kw}`).toContain(kw);
    const heading = container.querySelector("h1");
    expect([...(heading?.querySelectorAll("em") ?? [])].map((em) => em.textContent)).toEqual([
      ...C.headlineKw,
    ]);
    unmount();
  });
});

// ── AC · figures and letters are derived, never authored ─────────────────────

describe("no rendered string names a letter or a figure", () => {
  test("authored copy and the rendered stage both stay figure-free", () => {
    // §3.4 R2 / §3.5. This slide composes as B.2 today and every figure behind it in the
    // run steps by one the day another slide lands in front of it, so a literal "B.2" or
    // "SECTION B" in this copy would be a lie on a projector within the week. The digit
    // rule above already forbids every numeral; these hold the SHAPES, so a failure says
    // which kind of reference was written.
    const FIGURE = /\b[A-N]\.\d+\b/;
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(FIGURE);
      expect(copy, copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      // No count of its own successors either — the run this slide sits in is composed
      // per deck set (§3.4), so a sentence that numbered the slides behind it would go
      // stale the first time one was inserted or cut.
      expect(copy, copy).not.toMatch(/\bnext (two|three|four|five)\b/i);
      expect(copy, copy).not.toMatch(/\b(slide|figure)\b/i);
    }
    // The rendered half is scoped past the harness's FigLabel, which prints the DERIVED
    // figure — the composer's to print and not this slide's to author.
    const { container, unmount } = renderSlide(3);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length).toBeGreaterThan(400);
    expect(stage).not.toMatch(FIGURE);
    unmount();
  });
});

// ── AC · no brand variance ───────────────────────────────────────────────────

describe("no brand variance", () => {
  test("takes no brand block and names no organisation", () => {
    // §4.4's seven brand × deckSet slots do not list this slide, so there is no
    // `…For(brand)` resolver to call and the component takes no props. Held two ways: the
    // component's arity, and the copy's vocabulary. An absence of written guidance is
    // nobody's local evidence — we hold no SOP inventory for either brand — so a
    // `Record<Brand, …>` here would be three blocks with two of them invented.
    expect(GapNoSop.length).toBe(0);
    for (const copy of authoredStrings()) {
      expect(copy, `an organisation in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(GEMS|GEMVIS|Berau|DigiTech|MineTech|Nanovest|Sinar Mas)\b/i,
      );
    }
  });

  test("the content block is plain data — no resolver hiding in it", () => {
    // A `Record<Brand, …>` reachable from this block would be a brand axis nobody
    // declared. Every value is a string, a readonly array of strings, or a tuple of
    // `{ id, label, short }` — and no value is a function.
    const walk = (value: unknown, path: string): void => {
      if (typeof value === "function") throw new Error(`a function at ${path}`);
      if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`));
      else if (value !== null && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
      }
    };
    expect(() => walk(C, "gapNoSopContent")).not.toThrow();
    // POSITIVE CONTROL — the walk is alive and would find a resolver one level down.
    expect(() => walk({ nested: { noSopFor: () => C } }, "control")).toThrow(
      /a function at control\.nested\.noSopFor/,
    );
  });
});

describe("both leader decks print the same stage", () => {
  // BRAND INVARIANCE IS A CLAIM ABOUT MODULE EPOCHS — `VARIANT` resolves once at module
  // scope — so it cannot be checked inside the one epoch every test above runs in. Two
  // epochs, byte for byte, following `mandate-enablement.test.tsx`, which is the shipped
  // precedent for the other leader slide with no brand axis at all.
  //
  // NOT `SlideHarness`, deliberately: it imports `composedDeck` statically and would hand
  // a freshly loaded slide a stale context object. This is the same-epoch dynamic-import
  // pattern `variant-composition.test.tsx` documents.
  const LEADER_VARIANTS: VariantId[] = ["berau-leader", "gems-leader"];

  async function stageFor(variant: VariantId): Promise<{ html: string; text: string }> {
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
        import("@/slides/leader-gap/gap-no-sop"),
      ]);

    // THE POSITION IS READ OFF THE COMPOSED DECK WHEN THERE IS ONE, and falls back to the
    // harness input otherwise. WHERE this slide composes is `deck-registry.test.ts`'s
    // claim and not this file's (see the header); what is asserted here is that the two
    // leader rooms read the same bytes, which is true of a slide that composes nowhere as
    // well as of one that composes at B.2.
    const row = composedDeck.slides.find((s) => s.def.id === "gap-no-sop");
    const at = row ? { letter: row.letter, num: row.num, sectionKey: row.sectionKey } : AT;

    function AdvanceTo({ step }: { step: number }) {
      const { goTo } = useDeckIn();
      return <button data-testid="goto-epoch" onClick={() => goTo(0, step)} />;
    }

    const { container } = render(
      <DeckProvider stepCounts={[slide.gapNoSopSlide.steps]}>
        <SlideNumberProvider value={at}>
          <AdvanceTo step={slide.gapNoSopSlide.canonicalPose} />
          <slide.GapNoSop />
        </SlideNumberProvider>
      </DeckProvider>,
    );
    act(() => screen.getByTestId("goto-epoch").click());
    return { html: container.innerHTML, text: container.textContent ?? "" };
  }

  afterAll(restoreLocation);

  test("byte for byte, at the fullest pose", async () => {
    // SEQUENTIALLY, not `Promise.all`. Each call re-points `window.location`, resets the
    // module registry and renders into the SAME document — run concurrently they
    // interleave, two stages share one DOM, and every query finds two elements.
    const berau = await stageFor(LEADER_VARIANTS[0]);
    const gems = await stageFor(LEADER_VARIANTS[1]);
    // MARKUP AND TEXT BOTH: a brand axis could move a colour token or a delay without
    // changing a word, and `textContent` alone would not see it. Markup equality also
    // covers the FRAY: the strands are deterministic (a seeded PRNG in the geometry
    // module), so both rooms see the same twenty-four private rules.
    expect(berau.html).toBe(gems.html);
    expect(berau.text).toBe(gems.text);
    // Not vacuously: a stage that rendered nothing would also be equal.
    expect(berau.text).toContain(C.headline);
    expect(berau.text).toContain(C.issued[0].label);
    expect(berau.text).toContain(C.questions[QUESTION_COUNT - 1].label);
    expect(berau.text).toContain(C.unwrittenDotLabel);
    expect(berau.text).toContain(C.closer);
  });
});
