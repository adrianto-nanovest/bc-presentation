// WHERE THE DATA GOES, AND WHAT ANSWERS IT · slide tests. All four poses, both leader
// brands' callbacks, and the rules gh#58's AC states — held over EVERY authored string.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. jsdom has no layout and no media queries, so
// nothing here measures a pixel a browser places, and `prefers-reduced-motion: reduce`
// cannot be toggled from here at all. What jsdom is good for is what this slide is
// actually at risk of:
//
//   1. A VENDOR POLICY STRING ARRIVING. §12.2's gate shipped the CATEGORY branch —
//      no vendor's current policy is asserted anywhere on this slide — and the AC asks
//      the test to prove the ABSENCE. That is a rule over a walked string set, which is
//      exactly what a DOM-less runner does best.
//   2. §6.2's THIRD PASS COLLIDING WITH THE OTHER TWO. D.3's own test file names the
//      mirror check this file owes ("`#58` MUST RUN THE MIRROR OF THIS CHECK FROM THE
//      OTHER SIDE") — none of D.3's reserved vocabulary here, none of B.2's, and beat 2
//      carrying ZERO digits so "no shared statistic" is an absence, not a list. SINCE
//      gh#66 THAT CHECK IS RENDERED ON BOTH SIDES: B.2 (`gap-no-sop`) is built, its copy
//      module is imported here, and the rule runs in both directions — B.2's image
//      tokens forbidden in beat 2, beat 2's forbidden in B.2, and no three-word phrase
//      shared either way.
//   3. A NUMBER THAT MOVED. Beat 1's two gaps are B.4's OWN, re-quoted (spec §6.7 as
//      amended 2026-08-05) — so they are cross-checked against `b4Content` itself, and
//      the day B.4 refreshes to a new capture this file fails until D.4 follows.
//
// WHAT IS LEFT TO THE BROWSER WALK: the reduce-mode half of the zero-SMIL AC (held here
// at every pose under the default preference, plus the structural fact that makes it
// true by construction — the figure mounts no `<svg>` at all); real wrap/overflow of the
// nowrap labels; and the painted colour ladder.
//
// BOTH BRANDS IN ONE EPOCH. The figure reads no `VARIANT` — the slide file resolves the
// callback once at module scope and hands it down as a prop (§4.4 slot 4) — so both
// leader brands' callbacks mount side by side in this one module registry, which is how
// "no brand inherits another organisation's hardware" is checked at all. On this slide
// that is the sharpest version of the check in the deck: the failure would be telling a
// room it runs private GPU servers it does not have.
import { act, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { InvestSecurity, investSecuritySlide } from "@/slides/leader-invest/invest-security";
import {
  EPISTEMIC_MARKS,
  NOT_AUDITED,
  investChickenEggContent,
  investSecurityContent,
  onPremCallbackFor,
  type OnPremCallback,
} from "@/slides/leader-invest/content";
import {
  CITATION_HEIGHT_WRAPPED,
  COL_COUNT,
  CONTENT_WIDTH,
  DESTINATION_COUNT,
  DOMAINS_HEIGHT,
  DOMAINS_TOP,
  DOMAIN_COUNT,
  EXPOSURE_COUNT,
  EXPOSURE_ROW_CAPACITY,
  FIGURE_COUNT,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  PROVENANCE_TOP,
  RULE_HEIGHT,
  SIDE_MARGIN,
  STAGE,
  VERDICT_TOP,
} from "@/slides/leader-invest/security-geometry";
// B.4's own copy — the source beat 1's two figures are re-quoted from. Imported so the
// identity is a comparison and not a comment (§6.7's amendment: "the pair above is
// v4.1's restricted-tier gap — the tier shipping B4 already uses").
import { b4Content } from "@/slides/landscape-section-b/content";
// B.2's own copy — §6.2's `condition` pass (`gap-no-sop`, gh#66). Imported for the same
// reason D.3's is: the escalation's disjointness is checked against what the other two
// passes actually print, not against a transcription that cannot go stale loudly.
import { gapNoSopContent } from "@/slides/leader-gap/content";
import { BRANDS, type Brand } from "@/deck-variants";

const C = investSecurityContent;
const POSES = [0, 1, 2, 3] as const;
const LEADER_BRANDS: readonly Brand[] = ["berau", "gems"];

/**
 * The position this slide holds in the decks that actually run it.
 *
 * `at` IS required here, the same case as both siblings: unit tests resolve the default
 * `general` deck, `general` has no leader variant, and this slide reaches the two leader
 * deck sets alone. D.4, WHICH IS §6.7's D.4, since gh#70: this read D.3 from gh#58 until
 * then, "rather than §6.7's D.4 because `invest-base-rates` (§6.7's D.1) is unbuilt and
 * holds no ticket (§11's Phase 7 row)". #70 is the ticket, it built D.1 at the run's
 * HEAD, and R3 stepped this row and the three others behind that insert — so the composed
 * number and §6.7's agree here for the first time. The number the two leader decks
 * actually derive, which `tests/fixtures/deck-numbering.json` records for both. A
 * harness INPUT, not a claim the slide makes (§3.5); the day D.1 landed, FOUR slides in
 * this directory moved one number each — the prediction said three, and gh#59 added the
 * fourth in between — and no file here opened.
 */
const AT = { letter: "D", num: 4, sectionKey: "invest" } as const;

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

function renderSlide(callback: OnPremCallback, pose = 0) {
  const out = render(
    <SlideHarness def={investSecuritySlide} at={AT}>
      <Nav />
      <InvestSecurity callback={callback} />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

// ── the boxes, by beat ───────────────────────────────────────────────────────
//
// Derived from the content tuples wherever the renderer keys on a content `id`, so a
// reorder of the copy moves these hooks with it. The callback source is NOT in any list:
// it exists for exactly one of the two brands (`runs-it`), which is its own test below.

const DESTINATION_IDS = C.destinations.flatMap((d) => [
  `security-destination-${d.id}`,
  `security-contract-${d.id}`,
]);
const PRICE_IDS = [
  ...C.priceFigures.flatMap((f) => [`security-figure-${f.id}`, `security-metric-${f.id}`]),
  "security-price-source",
  "security-callback",
  "security-verdict",
  "security-rule",
];
const EXPOSURE_IDS = [
  "security-exposure-eyebrow",
  "security-exposure-line",
  ...C.exposures.map((e) => `security-exposure-${e.id}`),
];
const SOP_IDS = [
  "security-sop-eyebrow",
  ...C.domains.map((d) => `security-domain-${d.id}`),
  "security-retrofit",
  "security-provenance",
];

/** Which pose reveals which boxes. Beat 1's table stands from pose 0; the pose map is
 *  the slide file's 4-poses-for-3-beats split (beat 1 takes poses 0 and 1). */
const REVEALED_AT: ReadonlyArray<readonly string[]> = [
  DESTINATION_IDS,
  PRICE_IDS,
  EXPOSURE_IDS,
  SOP_IDS,
];

/**
 * The element whose class carries a box's reveal — the sibling files' two-shape reader.
 * Every box but one IS a `Reveal`; `security-rule`'s testid is on a positioned wrapper
 * around a `CopperRule`, because that primitive spreads no `data-*` props.
 */
function fade(id: string): HTMLElement {
  const el = screen.getByTestId(id);
  if (el.classList.contains("fade")) return el;
  const inner = el.querySelector<HTMLElement>(".copper-rule");
  if (!inner) {
    throw new Error(
      `"${id}" is neither a .fade box nor a wrapper around a .copper-rule — the ` +
        `renderer's hook or its primitive changed.`,
    );
  }
  return inner;
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
  if (!Number.isFinite(ms)) {
    throw new Error(`"${id}" carries no readable transitionDelay`);
  }
  return ms;
}

// ── the copy, as one set of strings ──────────────────────────────────────────

/** Every string reachable from `value` — the walk, not a hand list, for the sibling
 *  files' reason: a field added next month is inside every rule below the day it
 *  exists. `id` fields are collected too; they reach the DOM as `data-testid`. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/** Every string D.4 can put on a stage in ANY brand: the shared block plus all three
 *  brands' callbacks — `general`'s too, because an unreachable arm is still authored
 *  copy and §12.2's rule is about what exists, not what composes today. */
function authoredStrings(): string[] {
  const out = walkStrings(C);
  for (const brand of Object.keys(BRANDS) as Brand[]) {
    walkStrings(onPremCallbackFor(brand), out);
  }
  return out;
}

/** BEAT 2's strings alone — the scope of the zero-digit, grammar and §6.2 image rules.
 *  Beat 2 IS this slide's shadow-AI pass; beats 1 and 3 are held to the whole-block
 *  token gate below but not to the image rules, which are about the pass. */
function beat2Strings(): string[] {
  return walkStrings({
    eyebrow: C.exposureEyebrow,
    line: C.exposureLine,
    lineKw: C.exposureLineKw,
    exposures: C.exposures,
  });
}

/** Every string B.2 authors. `gap-no-sop` has no brand axis and no `…For(brand)`
 *  resolver — the slide file imports no `VARIANT` at all — so its copy block IS its
 *  rendered string set, the same way this file's `authoredStrings()` is D.4's. */
function b2Strings(): string[] {
  return walkStrings(gapNoSopContent);
}

/**
 * The set of every N-word phrase in a string set, lowercased and stripped of
 * punctuation so "rule." and "rule" are the same word. The twin of the helper in
 * `invest-chicken-egg.test.tsx`; both files run the rule from their own side.
 *
 * THREE WORDS IS THE THRESHOLD THE COPY CHOSE, not a number picked to make the test
 * pass. Measured on 2026-08-08 against the shipped blocks: B.2 and beat 2 share exactly
 * one two-word phrase (`is not`) and ZERO three-word phrases. Two-word overlap of
 * function words is unavoidable in English and proves nothing; a shared three-word
 * phrase between two passes of the same escalation is copy that was lifted.
 */
function phrases(strings: readonly string[], n: number): Set<string> {
  const words = strings
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9'\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + n <= words.length; i += 1) out.add(words.slice(i, i + n).join(" "));
  return out;
}

// ── the slide def ────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("declares 4 poses with the fullest one canonical", () => {
    expect(investSecuritySlide.id).toBe("invest-security");
    expect(investSecuritySlide.steps).toBe(4);
    // The exported PDF has no presenter attached, so the exported frame must be the one
    // that is safe to read alone — and for this slide every lower pose is either an
    // infrastructure recommendation with no governance answer, or an exposure with
    // nothing that answers it (see the slide file's own argument).
    expect(investSecuritySlide.canonicalPose).toBe(investSecuritySlide.steps - 1);
    expect(investSecuritySlide.animationMode).toBe("step-reveal");
    expect(investSecuritySlide.surface).toBe("dark");
    expect(investSecuritySlide.sectionKey).toBe("invest");
  });
});

// ── AC 2 · beat 1: the three destinations, B.4's two numbers, the conclusion ─

describe("beat 1 · where the data goes", () => {
  test("renders the three destinations, each as a category and not a product", () => {
    expect(C.destinations.map((d) => d.label)).toEqual([
      "PERSONAL CONSUMER ACCOUNT",
      "COMPANY-MANAGED WORKSPACE",
      "SELF-HOSTED / ON-PREM",
    ]);
    const { unmount } = renderSlide(onPremCallbackFor("berau"), 0);
    for (const d of C.destinations) {
      expect(screen.getByTestId(`security-destination-${d.id}`).textContent).toBe(d.label);
      expect(screen.getByTestId(`security-contract-${d.id}`).textContent).toBe(d.contract);
      expect(d.contract.length, `contract for ${d.id} is real copy`).toBeGreaterThan(10);
    }
    unmount();
  });

  test("lands B.4's own two numbers — the same strings B.4 prints, same tier, same capture", () => {
    // THE CROSS-CHECK IS THE POINT. Spec §6.7 (amended 2026-08-05, this ticket) replaced
    // the stale v4.0 pair 6.7/9.2 with B.4's restricted-tier v4.1 pair, and the risk the
    // amendment names is DRIFT — two slides quoting the same gap from different
    // captures. So the figures here are compared against `b4Content` itself: B.4's
    // write-reason tagline opens with the same "4 pts" and its agentic tagline with the
    // same "5.2 pts", and both slides name the same capture date.
    expect(C.priceFigures.map((f) => f.figure)).toEqual(["4 pts", "5.2 pts"]);
    expect(b4Content.benchmarks["write-reason"].openWeight.tagline).toBe(
      `${C.priceFigures[0].figure} off the lead`,
    );
    expect(b4Content.benchmarks.agentic.openWeight.tagline).toBe(
      `${C.priceFigures[1].figure} off the lead`,
    );
    expect(b4Content.freshness).toContain("2 August 2026");
    expect(C.priceSource).toContain("2 August 2026");
    // The tier is DISCLOSED, not implied — research §9.4's "pick one tier; do not mix"
    // is only checkable if the slide says which one it picked.
    expect(C.priceSource).toContain("restricted");
    // And the stale pair cannot come back silently.
    for (const copy of authoredStrings()) {
      expect(copy, `stale v4.0 figure in ${JSON.stringify(copy)}`).not.toMatch(/\b6\.7\b/);
      expect(copy, `stale v4.0 figure in ${JSON.stringify(copy)}`).not.toMatch(/\b9\.2\b/);
    }
  });

  test("states the conclusion, both halves, and reveals it LAST in its pose", () => {
    expect(C.verdict).toBe(
      "Self-hosting is right for the sensitive workloads, and wrong for everything else.",
    );
    // Both halves of the trade carry the keyword — a verdict that emphasised only
    // "right" would send a division head off to price hardware for everything.
    expect(C.verdictKw).toContain("the sensitive workloads");
    expect(C.verdictKw).toContain("everything else");

    const { unmount } = renderSlide(onPremCallbackFor("gems"), 1);
    expect(revealed("security-verdict")).toBe(true);
    // LAST ARRIVAL. The verdict's delay beats every other box in pose 1 — including the
    // callback citation, which only the `runs-it` brand mounts, which is why this walk
    // renders GEMS.
    const verdictAt = arrival("security-verdict");
    for (const id of PRICE_IDS.filter((x) => x !== "security-verdict" && x !== "security-rule")) {
      expect(arrival(id), `${id} must not overtake the verdict`).toBeLessThan(verdictAt);
    }
    expect(arrival("security-callback-source")).toBeLessThan(verdictAt);
    unmount();
  });
});

// ── AC 6 · slot 4: the brand callbacks ───────────────────────────────────────

describe("§4.4 slot 4 · the on-prem callback", () => {
  test("GEMS renders the DigiTech on-prem GPU / sensitive-data RAG callback, cited", () => {
    const gems = onPremCallbackFor("gems");
    expect(gems.kind).toBe("runs-it");
    if (gems.kind !== "runs-it") throw new Error("unreachable — narrowed above");
    expect(gems.line).toBe(
      "DigiTech already runs private on-prem GPU servers for sensitive-data RAG.",
    );
    // The mark is a member of the closed union the section shares, and the citation is
    // composed FROM it, so the chip's word and the citation's word cannot disagree.
    expect(EPISTEMIC_MARKS).toContain(gems.mark);
    expect(gems.source).toContain("Google Cloud's published GEMVIS customer story");
    expect(gems.source).toContain(gems.mark);
    expect(gems.source).toContain(NOT_AUDITED);

    const { unmount } = renderSlide(gems, 1);
    expect(screen.getByTestId("security-callback").textContent).toBe(gems.line);
    expect(screen.getByTestId("security-callback-source").textContent).toBe(gems.source);
    unmount();
  });

  test("Berau states the absence as copy — never an empty space, never a citation", () => {
    const berau = onPremCallbackFor("berau");
    expect(berau.kind).toBe("runs-none");
    expect(berau.line).toBe(
      "MineTech runs none of this today. There is no on-prem server to point at.",
    );

    const { unmount } = renderSlide(berau, 1);
    // #16 finding 4: the slot renders a real sentence…
    expect(screen.getByTestId("security-callback").textContent).toBe(berau.line);
    // …and no citation element, because there is nothing to cite — the union has no
    // `source` field on this arm, so an empty box is unrepresentable, and this asserts
    // the renderer kept that property.
    expect(screen.queryByTestId("security-callback-source")).toBeNull();
    unmount();
  });

  test("no brand inherits another organisation's hardware — both mounted in one epoch", () => {
    const a = renderSlide(onPremCallbackFor("berau"), 3);
    const berauText = a.container.textContent ?? "";
    a.unmount();
    const b = renderSlide(onPremCallbackFor("gems"), 3);
    const gemsText = b.container.textContent ?? "";
    b.unmount();

    expect(berauText).toContain("MineTech");
    expect(berauText).not.toContain("DigiTech");
    expect(gemsText).toContain("DigiTech");
    expect(gemsText).not.toContain("MineTech");
    // Beat 3's provenance is deliberately NOT on the brand axis — the same fact in both
    // rooms, byte-identical (§4.4 gives this slide exactly one slot).
    expect(berauText).toContain(C.domainsProvenance);
    expect(gemsText).toContain(C.domainsProvenance);
  });

  test("every registered brand resolves a callback whose line is real copy", () => {
    // Walked over `BRANDS`, not over this file's idea of the brand list — a fourth
    // brand would fail to compile in the content module's Record, and this holds the
    // runtime half: no arm's line is empty, so no composed deck can render a blank slot.
    for (const brand of Object.keys(BRANDS) as Brand[]) {
      const cb = onPremCallbackFor(brand);
      expect(cb.line.length, brand).toBeGreaterThan(20);
      expect(cb.lineKw.length, brand).toBeGreaterThan(0);
      for (const kw of cb.lineKw) expect(cb.line, brand).toContain(kw);
    }
  });
});

// ── AC 4 · beat 2: exposure, and §6.2's escalation constraint ────────────────

describe("beat 2 · shadow AI as EXPOSURE", () => {
  test("renders the exposure as the three things nobody can do: audit, revoke, produce", () => {
    expect(C.exposures.map((e) => e.id)).toEqual([
      "cannot-audit",
      "cannot-revoke",
      "cannot-produce",
    ]);
    // §6.7's order — audit, revoke, produce — and the two tokens gh#57 deliberately
    // left to this slide are both spent here.
    expect(C.exposures[0].label).toMatch(/\baudit\b/);
    expect(C.exposures[1].label).toMatch(/\brevoke\b/);
    expect(C.exposures[2].label).toMatch(/\bproduce\b/);

    const { unmount } = renderSlide(onPremCallbackFor("berau"), 2);
    for (const e of C.exposures) {
      expect(screen.getByTestId(`security-exposure-${e.id}`).textContent).toBe(e.label);
    }
    expect(screen.getByTestId("security-exposure-line").textContent).toBe(C.exposureLine);
    // The pose ends on the exposure itself: the last row an auditor would ask about is
    // the pose's last arrival.
    const lastRow = arrival(`security-exposure-${C.exposures[EXPOSURE_COUNT - 1].id}`);
    for (const id of EXPOSURE_IDS.slice(0, -1)) {
      expect(arrival(id), `${id} must not overtake the last exposure row`).toBeLessThan(lastRow);
    }
    unmount();
  });

  test("carries ZERO digits — the no-shared-statistic guarantee held as an absence", () => {
    // §6.2 forbids sharing a statistic with B.2 or D.3. D.3's only quantity is its
    // 30-day window and B.2 — BUILT SINCE gh#66 — prints no digit in any rendered
    // string, which is asserted below rather than read off its spec paragraph. A list of
    // forbidden values would go stale the day either slide gained a number; a beat with
    // no digit at all cannot collide with anything.
    const strings = beat2Strings();
    expect(strings.length, "a rule over an empty set proves nothing").toBeGreaterThan(5);
    for (const copy of strings) {
      expect(copy, `digit in beat 2: ${JSON.stringify(copy)}`).not.toMatch(/\d/);
    }
    // THE OTHER SIDE OF THE SAME GUARANTEE, now that there is copy to check it against.
    const b2 = b2Strings();
    expect(b2.length, "a rule over an empty set proves nothing").toBeGreaterThan(10);
    for (const copy of b2) {
      expect(copy, `digit in B.2: ${JSON.stringify(copy)}`).not.toMatch(/\d/);
    }
  });

  test("beat 2 is second-person present — no first-person, no past-tense confession", () => {
    // D.3's image is a first-person past-tense confession; this beat may not redraw it.
    // Scoped to BEAT 2, not the whole block: `domainsProvenance` is first-person past
    // on purpose (it names who authored the four domains, and draws no shadow-AI image
    // — the content block records the same scope).
    //
    // THE CONFESSION IS FIRST-PERSON BY DEFINITION, so the person ban is the load-
    // bearing half. A bare past-tense regex is NOT used: "You cannot audit what was
    // asked" carries a passive subordinate clause whose tense is the exposure's own
    // grammar ("what was asked" is the data that already left), and a rule that
    // forbade it would be a rule about auxiliaries, not about images. What is held
    // instead is the main clause of every beat-2 sentence: second person or the
    // impersonal thesis, present tense, checked by its opening words.
    for (const copy of beat2Strings()) {
      expect(copy, copy).not.toMatch(/\b(we|our|us)\b/i);
    }
    for (const exposure of C.exposures) {
      expect(exposure.label.startsWith("You cannot "), exposure.label).toBe(true);
    }
    // And the thesis line names what the exposure is NOT, first — the frame beat 1
    // built is taken away before another is offered.
    expect(C.exposureLine.startsWith("It is not the vendor.")).toBe(true);
  });

  test("shares no reserved vocabulary with D.3 — the mirror of gh#57's own token gate", () => {
    // THE DEBT NAMED IN `invest-chicken-egg.test.tsx`: "its own unit test owes the
    // symmetric rule" — none of D.3's vocabulary in D.4's copy. Transcribed from that
    // file's list, plus `improvise`/`no guidance`/`no SOP` for B.2.
    //
    // THE B.2 HALF IS NO LONGER A CLAIM ABOUT SPEC TEXT. gh#66 shipped `gap-no-sop` on
    // 2026-08-08, so B.2's copy module is imported at the top of this file and the
    // IMAGE tokens below are read off its rendered strings. The three SPEC tokens stay,
    // and since B.2's 2026-08-11 fray redesign ALL THREE have no rendered source: the
    // redesign cut the sentence that spelled `improvises` (the fray draws the verb, the
    // presenter says it), so `improvise` joined `no guidance` and `no SOP` in being
    // controlled against §6.2's own sentence and slide id — which is now the only
    // place any of them exists, stated rather than implied.
    //
    // `audit` is deliberately NOT forbidden: §6.7 prescribes "no audit trail" as one of
    // D.3's costs AND "cannot audit" as this beat's first row. The words touch, the
    // images do not — a closed past-tense bill against an open present-tense exposure —
    // and both files record the adjacency instead of hiding it.
    const D3_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
      ["deadlock", /\bdeadlock\w*\b/i],
      ["no budget without proof", /\bno budget without proof\b/i],
      ["shared accounts", /\bshared account\w*\b/i],
      ["banned", /\bbann?ed\b/i],
      ["what it cost", /\bwhat it cost\b/i],
      ["30-day", /\b30[-\s]day\b/i],
      ["proof pilot", /\bproof pilot\b/i],
      ["kill criterion", /\bkill criteri\w*\b/i],
      ["spend cap", /\bspend cap\b/i],
    ];
    const B2_SPEC_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
      ["no SOP", /\bno[-\s]SOP\b/i],
      ["no guidance", /\bno guidance\b/i],
      ["improvise", /\bimprovis\w*\b/i],
    ];
    // B.2's RENDERED image, read off `gapNoSopContent`: three issued boxes against four
    // question boxes with empty answer rules, over a rollout line that stops at NEVER
    // WRITTEN and frays — and the silence behind them. Each pattern is fired against
    // B.2's own strings below, so a list that drifted fails loudly instead of passing
    // vacuously. REMEASURED 2026-08-11 with that redesign: `still gets answered` left
    // B.2's stage with its condition sentences, and the spine's `never written` caption
    // arrived.
    const B2_IMAGE_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
      ["the rule nobody wrote", /\brule nobody wrote\b/i],
      ["wrote their own", /\bwrote their own\b/i],
      ["never wrote down", /\bnever wrote down\b/i],
      ["never written", /\bnever written\b/i],
      ["handed out", /\bhanded out\b/i],
      ["a login", /\blogin\w*\b/i],
      ["a demonstration", /\bdemonstrat\w*\b/i],
      ["encouragement", /\bencourag\w*\b/i],
      ["which work may", /\bwhich work may\b/i],
      ["the silence", /\bsilence\b/i],
      ["no rule to break", /\bno rule to break\b/i],
      ["the leader's job", /\bleader['’]s job\b/i],
    ];

    const forbidden = [...D3_TOKENS, ...B2_SPEC_TOKENS, ...B2_IMAGE_TOKENS];
    const strings = authoredStrings();
    expect(strings.length).toBeGreaterThan(30);
    for (const copy of strings) {
      for (const [name, pattern] of forbidden) {
        expect(pattern.test(copy), `${name} in ${JSON.stringify(copy)}`).toBe(false);
      }
    }
    // The rendered half, fullest pose, both brands — a token can arrive from a component.
    for (const brand of LEADER_BRANDS) {
      const { container, unmount } = renderSlide(onPremCallbackFor(brand), 3);
      const text = container.textContent ?? "";
      expect(text, "positive control: the stage is not empty").toContain(C.verdict);
      for (const [name, pattern] of forbidden) {
        expect(pattern.test(text), `${name} reached the ${brand} stage`).toBe(false);
      }
      unmount();
    }

    // POSITIVE CONTROLS — every regex fired against the source it was read off, so a
    // pattern that matched nothing cannot make the rules above pass on any copy at all.
    // BOTH OTHER PASSES' COPY IS IMPORTED, NOT TRANSCRIBED: the controls fire against
    // what D.3 and B.2 actually print today.
    const d3 = walkStrings(investChickenEggContent).join(" \n ");
    for (const [name, pattern] of D3_TOKENS) {
      expect(pattern.test(d3), `${name} no longer fires on D.3's own copy`).toBe(true);
    }
    const b2 = b2Strings();
    for (const [name, pattern] of B2_IMAGE_TOKENS) {
      expect(
        b2.some((line) => pattern.test(line)),
        `${name} no longer fires on B.2's own copy`,
      ).toBe(true);
    }
    // All three SPEC tokens fall back to §6.2's sentence and slide id — B.2 renders
    // none of them since its 2026-08-11 fray redesign (the header above records why).
    const b2Sources = [...b2, "There is no guidance, so people improvise.", "gap-no-sop"];
    for (const [name, pattern] of B2_SPEC_TOKENS) {
      expect(
        b2Sources.some((line) => pattern.test(line)),
        name,
      ).toBe(true);
    }
    expect(b2.some((line) => /\bimprovis\w*\b/i.test(line))).toBe(false);
    expect(b2.some((line) => /\bno guidance\b/i.test(line))).toBe(false);
    expect(b2.some((line) => /\bno[-\s]SOP\b/i.test(line))).toBe(false);
  });

  test("and B.2 carries none of beat 2's exposure vocabulary — the rule read back", () => {
    // THE DIRECTION THAT ONLY BECAME CHECKABLE WITH gh#66. Until B.2 shipped, this file
    // could forbid arrivals into D.4 and nothing else; a token migrating the other way
    // would have been invisible from here. Scoped to BEAT 2's vocabulary, because beat 2
    // is this slide's §6.2 pass — beats 1 and 3 are a hardware recommendation and a
    // governance starting point, and neither is a shadow-AI pass B.2 could collide with.
    //
    // `audit` IS IN THE LIST HERE AND NOT IN D.3's. The adjacency §6.7 forces is between
    // D.3's closed bill ("No audit trail") and this beat's open exposure ("You cannot
    // audit what was asked"); B.2 is not party to it and prints no audit word at all.
    const BEAT2_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
      ["shadow AI", /\bshadow ai\b/i],
      ["administers", /\badminister\w*\b/i],
      ["the vendor", /\bvendors?\b/i],
      ["exposure", /\bexposure\w*\b/i],
      ["audit", /\baudit\w*\b/i],
      ["revoke", /\brevoke\w*\b/i],
      ["produce", /\bproduce\b/i],
      ["you cannot", /\byou cannot\b/i],
    ];
    const b2 = b2Strings();
    expect(b2.length, "a rule over an empty set proves nothing").toBeGreaterThan(10);
    for (const copy of b2) {
      for (const [name, pattern] of BEAT2_TOKENS) {
        expect(pattern.test(copy), `beat 2's ${name} in B.2's ${JSON.stringify(copy)}`).toBe(false);
      }
    }
    // POSITIVE CONTROL: every pattern fires on beat 2's own copy, so eight dead regexes
    // cannot make the rule above pass on any copy.
    const beat2 = beat2Strings();
    for (const [name, pattern] of BEAT2_TOKENS) {
      expect(
        beat2.some((line) => pattern.test(line)),
        `${name} no longer fires on beat 2's own copy`,
      ).toBe(true);
    }
    // AND THE NAME ITSELF: D.4 beat 2 is the pass that says "shadow AI" out loud and B.2
    // is the pass that describes the condition without labelling it. Both halves are
    // asserted, because the escalation's last step is the naming.
    expect(C.exposureLine).toContain("shadow AI");
    expect(b2.some((line) => /\bshadow\b/i.test(line))).toBe(false);
  });

  test("beat 2 shares no three-word phrase with B.2, in either direction", () => {
    // THE RULE THAT DOES NOT DEPEND ON A HAND-WRITTEN LIST, and the twin of the one in
    // `invest-chicken-egg.test.tsx`. Set intersection over every three-word phrase either
    // pass prints — symmetric by construction, so it is asserted once — which catches the
    // failure a token list cannot see: a sentence lifted across using words nobody
    // thought to reserve.
    const b2 = phrases(b2Strings(), 3);
    const beat2 = phrases(beat2Strings(), 3);
    expect(b2.size, "positive control: B.2 has phrases to share").toBeGreaterThan(50);
    expect(beat2.size, "positive control: beat 2 has phrases to share").toBeGreaterThan(10);
    expect([...beat2].filter((p) => b2.has(p))).toEqual([]);

    // The control that keeps the rule honest: one of B.2's own sentences, run through as
    // if this beat had lifted it, IS caught — across punctuation and capitals.
    const lifted = phrases(["Nobody wrote the rule; so EVERYBODY wrote their own!"], 3);
    expect([...lifted].filter((p) => b2.has(p)).length).toBeGreaterThan(3);

    // AND THE WHOLE SLIDE, not only its shadow-AI beat: beat 1's hardware map and beat
    // 3's governance domains have no reason to touch B.2 either, and this is free.
    const whole = phrases(authoredStrings(), 3);
    expect([...whole].filter((p) => b2.has(p))).toEqual([]);
  });
});

// ── AC 5 · beat 3: the four domains, the failure mode, the provenance ───────

describe("beat 3 · where the SOP starts", () => {
  test("renders all four governance domains, in §6.7's order", () => {
    expect(C.domains.map((d) => d.name)).toEqual(["Culture", "Risk", "Governance", "Ethics"]);
    const { unmount } = renderSlide(onPremCallbackFor("gems"), 3);
    for (const d of C.domains) {
      expect(screen.getByTestId(`security-domain-${d.id}`).textContent).toBe(d.name);
      expect(revealed(`security-domain-${d.id}`)).toBe(true);
    }
    unmount();
  });

  test('names "governance retrofit" verbatim, as the keyword of its own sentence', () => {
    expect(C.retrofitLine).toContain("governance retrofit");
    expect(C.retrofitLineKw).toEqual(["a governance retrofit"]);

    const { unmount } = renderSlide(onPremCallbackFor("berau"), 3);
    const retrofit = screen.getByTestId("security-retrofit");
    expect(retrofit.textContent).toBe(C.retrofitLine);
    // The keyword is RENDERED as emphasis, not just present in data.
    expect(retrofit.querySelector("em")?.textContent).toBe("a governance retrofit");
    unmount();
  });

  test("the provenance says who proposed the four AND what the line is not", () => {
    // Research §10.2's framing 2, negation included — never "Group requires", never
    // "sourced to". Both halves asserted, because a line that merely omitted the
    // requirement claim would still be read as making it.
    expect(C.domainsProvenance).toContain("we proposed to Sinar Mas Group HR");
    expect(C.domainsProvenance).toContain("not a Group requirement");
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(/\bGroup requires\b/i);
      expect(copy, copy).not.toMatch(/\bsourced to\b/i);
    }
    // And it is the pose's LAST arrival — the string that keeps beat 3 from
    // overclaiming closes the slide.
    const { unmount } = renderSlide(onPremCallbackFor("gems"), 3);
    const provenanceAt = arrival("security-provenance");
    for (const id of SOP_IDS.filter((x) => x !== "security-provenance")) {
      expect(arrival(id), `${id} must not overtake the provenance`).toBeLessThan(provenanceAt);
    }
    unmount();
  });
});

// ── AC 3 · the §12.2 gate: the CATEGORY branch, held as an absence ───────────

describe("§12.2 · no vendor policy string exists", () => {
  // The slide shipped the CATEGORY branch (the slide file records the decision and the
  // issue comment states it): every claim is true of the category at all three vendors
  // per the record's §6, and no vendor is named. ONE measured carve-out: the GEMS
  // callback's citation names "Google Cloud's published GEMVIS customer story" — a
  // published claim about the room's own company's ARCHITECTURE, not any vendor's
  // terms, the same citation `invest-own-proof` prints two slides earlier. So `Google`
  // is allowed in exactly that one string and nowhere else, and every other vendor
  // token is banned outright — the same allowlist shape as gh#57's D.2 exception.
  const VENDOR_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
    ["Anthropic", /anthropic/i],
    ["OpenAI", /openai/i],
    ["ChatGPT", /chatgpt/i],
    ["Claude", /\bclaude\b/i],
    ["Gemini", /gemini/i],
    ["Bedrock", /bedrock/i],
    ["Vertex", /vertex/i],
    ["Azure", /azure/i],
    ["gpt-oss", /gpt[-\s]?oss/i],
    ["GEAP", /\bGEAP\b/],
    ["GDC", /\bGDC\b/],
    ["Copilot", /copilot/i],
    ["Microsoft", /microsoft/i],
  ];
  const GEMS_CITATION = (() => {
    const gems = onPremCallbackFor("gems");
    if (gems.kind !== "runs-it") throw new Error("GEMS callback lost its citation");
    return gems.source;
  })();

  test("no vendor name in any authored string, with the one measured allowlist", () => {
    for (const copy of authoredStrings()) {
      for (const [name, pattern] of VENDOR_TOKENS) {
        expect(pattern.test(copy), `${name} in ${JSON.stringify(copy)}`).toBe(false);
      }
      if (/google/i.test(copy)) {
        expect(copy, "Google outside the GEMS architecture citation").toBe(GEMS_CITATION);
      }
    }
    // The carve-out is REAL — an allowlist over a string that no longer says Google
    // would be an allowlist guarding nothing.
    expect(GEMS_CITATION).toMatch(/Google Cloud/);
    // And the patterns fire: a control per token, against the vendor list §12.2's
    // record covers, so a dead regex cannot hollow the rule.
    const control =
      "Anthropic OpenAI ChatGPT Claude Gemini Bedrock Vertex Azure gpt-oss GEAP GDC " +
      "Copilot Microsoft";
    for (const [name, pattern] of VENDOR_TOKENS) {
      expect(pattern.test(control), `${name} pattern is dead`).toBe(true);
    }
  });

  test("no leniency or enforcement-posture vocabulary — the record's §2 / F12, honoured", () => {
    // F12 has no replacement sentence: the claim is off-slide entirely, and §6.7 keeps
    // the "ChatGPT seems not strict" comparison verbal. `\bstrict\b` is word-bounded so
    // it cannot fire on the tier disclosure's "restricted" — checked by the control.
    const LENIENCY = /\b(lenient|leniency|lax|laxity|strict|strictness|enforc\w*|tolerat\w*)\b/i;
    for (const copy of authoredStrings()) {
      expect(LENIENCY.test(copy), `leniency vocabulary in ${JSON.stringify(copy)}`).toBe(false);
    }
    expect(LENIENCY.test("this vendor is lenient and that one is not strict")).toBe(true);
    expect(LENIENCY.test("commercial use restricted.")).toBe(false);
  });

  test("no retention window, price, or seat count — a category branch quotes no vendor quantity", () => {
    // The only digits on this slide are beat 1's two benchmark gaps and their capture
    // date. A "30 d" or "$25/seat" arriving in any string would be a vendor policy
    // quantity wearing a category costume — the exact failure §12.2 exists to stop.
    const QUANTITY = /(\$\s?\d|\bIDR\b|\bRp\b|\/\s?(seat|month|year)\b|\b\d+\s?(d|days|y|years)\b)/i;
    for (const copy of authoredStrings()) {
      expect(QUANTITY.test(copy), `vendor-shaped quantity in ${JSON.stringify(copy)}`).toBe(false);
    }
    expect(QUANTITY.test("retained 30 days on the $25/seat plan")).toBe(true);
  });
});

// ── AC 8 · poses: complete at every stop, forward and backward ───────────────

describe("the pose walk", () => {
  test.each(LEADER_BRANDS)("%s · every pose is complete, forward and backward", (brand) => {
    const { container, unmount } = renderSlide(onPremCallbackFor(brand));
    const walk = [...POSES, ...[...POSES].reverse()];
    for (const pose of walk) {
      goToPose(pose);
      for (let beat = 0; beat < REVEALED_AT.length; beat++) {
        for (const id of REVEALED_AT[beat]) {
          // A pose is everything argued so far: revealed iff its beat's pose has been
          // reached, at every stop in BOTH directions — `on` is derived from the pose,
          // not accumulated, so walking back to 0 must un-reveal beats 1–3.
          expect(revealed(id), `${id} at pose ${pose}`).toBe(beat <= pose);
        }
      }
      // The callback citation follows its beat for the brand that has one.
      if (brand === "gems") {
        expect(revealed("security-callback-source"), `citation at pose ${pose}`).toBe(pose >= 1);
      }
      // ZERO SMIL NODES AT EVERY STOP — the AC's jsdom half, under the default motion
      // preference. The `reduce` half is the browser walk's; what holds it there is
      // asserted structurally below.
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set").length,
        `SMIL at pose ${pose}`,
      ).toBe(0);
    }
    unmount();
  });

  test("the figure mounts no <svg> at all — zero SMIL by construction, not by discipline", () => {
    // The component's own doc comment stakes the claim: the rule is a `div`, the chips
    // are bordered `span`s, and a SMIL node cannot appear without an author adding a
    // whole element class. This is the structural fact that makes the reduce-mode zero
    // a construction rather than a promise, and it is what the browser walk's media
    // query cannot change.
    for (const brand of LEADER_BRANDS) {
      const { container, unmount } = renderSlide(onPremCallbackFor(brand), 3);
      expect(container.querySelectorAll("svg").length, brand).toBe(0);
      unmount();
    }
  });
});

// ── figures and letters are derived, never authored ─────────────────────────

describe("no rendered string names a letter or a figure", () => {
  test("authored copy and the rendered stage both stay figure-free", () => {
    const FIGURE = /\b[A-N]\.\d+\b/;
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(FIGURE);
      expect(copy, copy).not.toMatch(/\bsection\s+[A-N]\b/i);
    }
    // The rendered half is scoped to this slide's own boxes: the harness's FigLabel
    // prints the DERIVED figure (D.3 today), which is the composer's to print and not
    // this slide's to author — asserting over the whole container would forbid the
    // mechanism the rule exists to protect.
    const { container, unmount } = renderSlide(onPremCallbackFor("gems"), 3);
    const stageText = [...container.querySelectorAll<HTMLElement>("[data-testid^='security-']")]
      .map((el) => el.textContent ?? "")
      .join(" | ");
    expect(stageText.length).toBeGreaterThan(100);
    expect(stageText).not.toMatch(FIGURE);
    unmount();
  });
});

// ── the keyword rule: kw on prose only ───────────────────────────────────────

describe("the keyword rule", () => {
  test("exactly the five prose strings carry a *Kw sibling, and every keyword is real", () => {
    // The content block's own two lists, held as lists: PROSE is `headline`, `verdict`,
    // `exposureLine`, `retrofitLine` (plus the callbacks' `line`, asserted in the slot-4
    // block); everything else is a label and may not gain a `*Kw` without landing here.
    const kwKeys = Object.keys(C).filter((k) => k.endsWith("Kw"));
    expect(kwKeys.sort()).toEqual(["exposureLineKw", "headlineKw", "retrofitLineKw", "verdictKw"]);
    for (const kwKey of kwKeys) {
      const proseKey = kwKey.slice(0, -2) as keyof typeof C;
      const prose = C[proseKey];
      const kws = C[kwKey as keyof typeof C];
      expect(typeof prose, `${kwKey} has no prose sibling`).toBe("string");
      expect(Array.isArray(kws)).toBe(true);
      for (const kw of kws as readonly string[]) {
        expect(prose as string, `${kwKey}: "${kw}" is not in its prose`).toContain(kw);
      }
    }
  });

  test("labels render with no emphasis — a copper italic in a heading is a fault", () => {
    const { unmount } = renderSlide(onPremCallbackFor("gems"), 3);
    const labelIds = [
      ...C.destinations.map((d) => `security-destination-${d.id}`),
      ...C.domains.map((d) => `security-domain-${d.id}`),
      "security-price-source",
      "security-exposure-eyebrow",
      "security-sop-eyebrow",
      "security-provenance",
      "security-callback-source",
    ];
    for (const id of labelIds) {
      expect(screen.getByTestId(id).querySelector("em"), `<em> inside label ${id}`).toBeNull();
    }
    // …while the prose boxes DO carry theirs, so the absence above cannot pass because
    // emphasis stopped rendering everywhere.
    expect(screen.getByTestId("security-verdict").querySelectorAll("em").length).toBeGreaterThan(0);
    unmount();
  });
});

// ── geometry: one number, both sides ─────────────────────────────────────────

describe("the geometry", () => {
  test("the counts are welded to the content tuples they draw", () => {
    // Cross-MODULE comparisons — a geometry constant against the content tuple it
    // claims to pin — so none of these can be the self-comparison shape gh#56 deleted.
    expect(DESTINATION_COUNT).toBe(C.destinations.length);
    expect(COL_COUNT).toBe(C.destinations.length);
    expect(FIGURE_COUNT).toBe(C.priceFigures.length);
    expect(EXPOSURE_COUNT).toBe(C.exposures.length);
    expect(DOMAIN_COUNT).toBe(C.domains.length);
    expect(EXPOSURE_ROW_CAPACITY).toBeGreaterThanOrEqual(C.exposures.length);
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThanOrEqual(0);
  });

  test("every placed box sits inside the stage and above the nav band, at the fullest pose", () => {
    const { container, unmount } = renderSlide(onPremCallbackFor("gems"), 3);
    const boxes = [...container.querySelectorAll<HTMLElement>("[data-testid^='security-']")]
      // The four chips are the documented flow-layout exception: they carry no
      // left/top of their own, and their container (`security-domains`) is measured
      // instead.
      .filter((el) => !(el.dataset.testid ?? "").startsWith("security-domain-"));
    expect(boxes.length).toBeGreaterThan(12);
    for (const el of boxes) {
      const id = el.dataset.testid;
      const left = parseFloat(el.style.left);
      const top = parseFloat(el.style.top);
      const width = parseFloat(el.style.width);
      // `security-rule` declares no height — `.copper-rule` takes its 1px from the
      // stylesheet, which jsdom does not compute — so it falls back to the geometry
      // module's own constant rather than letting NaN pass as a number.
      const height =
        id === "security-rule" ? RULE_HEIGHT : parseFloat(el.style.height);
      expect(Number.isFinite(left), `${id} left`).toBe(true);
      expect(Number.isFinite(height), `${id} height`).toBe(true);
      expect(left, `${id} left edge`).toBeGreaterThanOrEqual(SIDE_MARGIN);
      expect(left + width, `${id} right edge`).toBeLessThanOrEqual(STAGE.width - SIDE_MARGIN);
      expect(top + height, `${id} vs nav zone`).toBeLessThanOrEqual(NAV_ZONE_TOP);
    }
    unmount();
  });

  test("the renderer reads the module's shelves, not private copies", () => {
    // Spot-welds between DOM style and geometry export — one per band, so a renderer
    // that re-derived a shelf locally fails here by name.
    const { unmount } = renderSlide(onPremCallbackFor("gems"), 3);
    expect(parseFloat(screen.getByTestId("security-verdict").style.top)).toBe(VERDICT_TOP);
    expect(parseFloat(screen.getByTestId("security-domains").style.top)).toBe(DOMAINS_TOP);
    expect(parseFloat(screen.getByTestId("security-domains").style.height)).toBe(DOMAINS_HEIGHT);
    expect(parseFloat(screen.getByTestId("security-provenance").style.top)).toBe(PROVENANCE_TOP);
    expect(parseFloat(screen.getByTestId("security-provenance").style.height)).toBe(
      CITATION_HEIGHT_WRAPPED,
    );
    expect(parseFloat(screen.getByTestId("security-rule").style.width)).toBe(CONTENT_WIDTH);
    unmount();
  });
});

// ── the epistemic negation stays a construction ──────────────────────────────

describe("the NOT_AUDITED idiom", () => {
  test('"independently" and "audited" appear in the negation and nowhere else', () => {
    // `invest-own-proof`'s rule, inherited: strip the one construction in which the
    // words are allowed, then forbid the words — so a claim of having audited anything
    // cannot arrive anywhere in this slide's copy.
    for (const copy of authoredStrings()) {
      const stripped = copy.split(NOT_AUDITED).join("");
      expect(stripped, copy).not.toMatch(/independent/i);
      expect(stripped, copy).not.toMatch(/audited/i);
    }
    // Non-vacuous: the GEMS citation really does carry the negation.
    const gems = onPremCallbackFor("gems");
    if (gems.kind !== "runs-it") throw new Error("GEMS callback lost its citation");
    expect(gems.source).toContain(NOT_AUDITED);
  });
});
