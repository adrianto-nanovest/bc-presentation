// FROM INDIVIDUAL SEATS TO A LINE ITEM · slide tests. All four poses, both leader
// brands' anchors, and the rules gh#59's AC states — held over EVERY authored string.
//
// WHAT THIS FILE CAN AND CANNOT PROVE — its three siblings' preamble, inherited. jsdom
// has no layout and no media queries, so nothing here measures a pixel and
// `prefers-reduced-motion: reduce` cannot really be toggled. What a DOM-less runner is
// good for is what THIS slide is actually at risk of:
//
//   1. A PRICE ARRIVING WITHOUT ITS DATE. §12.2's gate shipped the RECORD branch here
//      (the opposite call from D.3's category branch, recorded in the slide file), so
//      the rule is not "no vendor string" but "every price carries currency, billing
//      period and date-read". That is a SWEEP over rendered text — a regex finds every
//      currency token and interrogates the string it sits in — not a hardcoded list,
//      so a price added next month without a date fails the day it exists.
//   2. A TOTAL ARRIVING AS THE ANSWER. The AC's "runnable, not answered" is held as an
//      absence: every currency amount on the slide must be one of the record's six
//      quoted figures, and no authored string computes anything (`=` is banned). A
//      hardcoded division total is exactly the number that fails both.
//   3. ONE ROOM SEEING THE OTHER ROOM'S FIGURE. Berau has an organizer-published
//      anchor and GEMS provably has none (record §8.2) — so the sharpest failure is
//      not a wrong number but a LEAKED one, and the §4.4 slot 7 check mounts both
//      brands in one epoch to prove neither carries a byte of the other's.
//
// WHAT IS LEFT TO THE BROWSER WALK: the reduce-mode half of the zero-SMIL AC (held
// here at every pose under the default preference, plus the structural fact that makes
// it true by construction — the figure mounts no `<svg>` at all); real wrap/overflow
// of the nowrap tier rows; and the painted colour ladder.
//
// BOTH BRANDS IN ONE EPOCH. The figure reads no `VARIANT` — the slide file resolves
// the anchor once at module scope and hands it down as a prop (§4.4 slot 7) — so both
// leader brands' anchors mount side by side in this one module registry. On this slide
// the failure that check exists for has two faces: showing a GEMS room a local figure
// §8.2 proved does not exist, and showing a Berau room its own anchor stripped of the
// attribution that keeps it honest.
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import {
  InvestSubscription,
  investSubscriptionSlide,
} from "@/slides/leader-invest/invest-subscription";
import {
  investSubscriptionContent,
  priceAnchorFor,
  type PriceAnchor,
} from "@/slides/leader-invest/content";
import {
  ANALYTICS_TOP,
  ANCHOR_SOURCE_TOP,
  CAPABILITY_COUNT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  GAP_COUNT,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  FORMULA_TOP,
  RULE_HEIGHT,
  SIDE_MARGIN,
  STAGE,
  TIER_COUNT,
} from "@/slides/leader-invest/subscription-geometry";
import { DECK_SET_COMPOSITION } from "@/deck/deck-sets";
import { BRANDS, VARIANTS, type Brand } from "@/deck-variants";

const C = investSubscriptionContent;
const POSES = [0, 1, 2, 3] as const;
const LEADER_BRANDS: readonly Brand[] = ["berau", "gems"];

/**
 * The position this slide holds in the decks that actually run it.
 *
 * `at` IS required here, the same case as all three siblings: unit tests resolve the
 * default `general` deck, `general` has no leader variant, and this slide reaches the
 * two leader deck sets alone. D.5, WHICH IS §6.7's D.5, since gh#70: this read D.4 from
 * gh#59 until then, "rather than §6.7's D.5 because `invest-base-rates` (§6.7's D.1) is
 * unbuilt and holds no ticket (§11's Phase 7 row)". #70 is the ticket, it built D.1 at
 * the run's HEAD, and R3 stepped this row along with the three in front of it — so the
 * `invest` run now prints D.1–D.5 and every slide in it derives its own §6.7 number. The
 * number the two leader decks actually derive, which `tests/fixtures/deck-numbering.json`
 * records for both. A harness INPUT, not a claim the slide makes (§3.5); the day D.1
 * landed, all four slides in this directory moved one number — exactly as predicted —
 * and no file here opened.
 */
const AT = { letter: "D", num: 5, sectionKey: "invest" } as const;

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

function renderSlide(anchor: PriceAnchor, pose = 0) {
  const out = render(
    <SlideHarness def={investSubscriptionSlide} at={AT}>
      <Nav />
      <InvestSubscription anchor={anchor} />
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
// reorder of the copy moves these hooks with it. The anchor's citation is NOT in the
// static lists: it exists for exactly the two arms with something to attribute, which
// is its own test below.

const BEAT_1_IDS = [
  "subscription-gaps-eyebrow",
  ...C.gaps.map((g) => `subscription-gap-${g.id}`),
];
const BEAT_2_IDS = [
  "subscription-seats-eyebrow",
  ...C.capabilities.map((c) => `subscription-capability-${c.id}`),
  "subscription-analytics-eyebrow",
  "subscription-analytics-line",
];
const BEAT_3_IDS = [
  "subscription-rule",
  "subscription-formula-eyebrow",
  "subscription-formula",
  ...C.tiers.map((t) => `subscription-tier-${t.id}`),
  "subscription-lever",
];
/** Pose 3's boxes for a LEADER brand — both leader arms carry a citation. */
const ANCHOR_IDS = [
  "subscription-anchor-eyebrow",
  "subscription-anchor-line",
  "subscription-anchor-source",
  "subscription-closer",
];

/** Which pose reveals which boxes — the slide file's 4-poses-for-3-beats split
 *  (beat 3 takes poses 2 and 3; beat 1 stands from pose 0). */
const REVEALED_AT: ReadonlyArray<readonly string[]> = [
  BEAT_1_IDS,
  BEAT_2_IDS,
  BEAT_3_IDS,
  ANCHOR_IDS,
];

/**
 * The element whose class carries a box's reveal — the sibling files' two-shape
 * reader. Every box but one IS a `Reveal`; `subscription-rule`'s testid is on a
 * positioned wrapper around a `CopperRule`, because that primitive spreads no
 * `data-*` props.
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
 *  exists. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/** Every string D.4 can put on a stage in ANY brand: the shared block plus all three
 *  brands' anchors — `general`'s too, because an unreachable arm is still authored
 *  copy and the price gate is about what exists, not what composes today. */
function authoredStrings(): string[] {
  const out = walkStrings(C);
  for (const brand of Object.keys(BRANDS) as Brand[]) {
    walkStrings(priceAnchorFor(brand), out);
  }
  return out;
}

// ── the price gate, as regexes the whole file shares ─────────────────────────

/** A currency token with an amount behind it — what "a price" means to the sweep.
 *  Global, so one string can carry several prices and each is interrogated. */
const PRICE = /(?:USD|US\$|IDR|Rp|EUR|€|\$)\s?(\d[\d,.]*)/g;
/** A billing period, in every spelling this record quotes. */
const PERIOD =
  /(\/\s?seat\s?\/\s?mo\b|\/\s?(mo|month|yr|year)\b|per\s+(seat|month|year)\b|billed\s+(annually|monthly)|\bannual(ly)?\b|\bmonthly\b)/i;
/** The record's read date — §8's, and the one every price on this slide was read on. */
const DATE_READ = /2026-08-04/;

/**
 * The record's six quoted figures — §8.3's three tiers ($20/$100 annual, $25/$125
 * monthly) and §8.1's two anchor figures ($204 organizer, $200 vendor). A HAND LIST
 * ON PURPOSE, the one place this file keeps one: the set is the slide's licence to
 * print money at all, and a seventh amount must arrive HERE with its record row
 * before any test lets it render. Deriving it from the content would let the content
 * license itself.
 */
const QUOTED_AMOUNTS = new Set([20, 25, 100, 125, 200, 204]);

/**
 * The rendered stage as PRICED UNITS: one unit per `subscription-*` box, with ONE
 * measured join — the anchor line and its attribution are a single unit.
 *
 * THE JOIN IS THE BERAU ANCHOR'S OWN CONSTRUCTION, not a loophole: record §8.1's
 * correction 2 makes the attribution string carry the date for BOTH anchor figures
 * ("Both read 2026-08-04") because the figure's date and its denial-of-vendor-claim
 * are one sentence, printed 8px under the line it attributes and revealed in the same
 * pose. Splitting them into two units would fail the slide for the exact construction
 * §8.1 prescribes; joining them still fails any NEW box that prints a price with no
 * date, and fails THIS pair the day the attribution loses its date.
 */
function pricedUnits(container: HTMLElement): string[] {
  const boxes = [...container.querySelectorAll<HTMLElement>("[data-testid^='subscription-']")];
  const unit = (id: string) =>
    boxes.find((el) => el.dataset.testid === id)?.textContent ?? "";
  const joined = `${unit("subscription-anchor-line")} ${unit("subscription-anchor-source")}`;
  return [
    ...boxes
      .filter(
        (el) =>
          el.dataset.testid !== "subscription-anchor-line" &&
          el.dataset.testid !== "subscription-anchor-source" &&
          // the price span is INSIDE its tier row; counting both would double-count
          !(el.dataset.testid ?? "").startsWith("subscription-price-"),
      )
      .map((el) => el.textContent ?? ""),
    joined,
  ];
}

// ── the slide def ────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("declares 4 poses with the fullest one canonical", () => {
    expect(investSubscriptionSlide.id).toBe("invest-subscription");
    expect(investSubscriptionSlide.steps).toBe(4);
    // The exported PDF has no presenter attached, so the exported frame must be the
    // one that is safe to read alone — and for this slide a canonical pose of 2 would
    // export a page of vendor prices with no "measure value" boundary and no anchor
    // attribution: a procurement page, in an investment case (the slide file's own
    // argument).
    expect(investSubscriptionSlide.canonicalPose).toBe(3);
    expect(investSubscriptionSlide.canonicalPose).toBe(investSubscriptionSlide.steps - 1);
    expect(investSubscriptionSlide.animationMode).toBe("step-reveal");
    expect(investSubscriptionSlide.surface).toBe("dark");
    expect(investSubscriptionSlide.sectionKey).toBe("invest");
  });
});

// ── AC 2 · beat 1: the four gaps of an individual subscription ───────────────

describe("beat 1 · today, individual", () => {
  test("names ALL FOUR gaps, in §6.7's order, standing from pose 0", () => {
    expect(C.gaps.map((g) => g.label)).toEqual([
      "No admin",
      "No visibility",
      "Nothing revoked on exit",
      "No volume leverage",
    ]);
    const { unmount } = renderSlide(priceAnchorFor("berau"), 0);
    expect(screen.getByTestId("subscription-gaps-eyebrow").textContent).toBe(C.gapsEyebrow);
    for (const g of C.gaps) {
      expect(screen.getByTestId(`subscription-gap-${g.id}`).textContent).toBe(g.label);
      expect(revealed(`subscription-gap-${g.id}`)).toBe(true);
    }
    // The deficit column rests ALONE at pose 0 — nothing from any later beat.
    for (const id of [...BEAT_2_IDS, ...BEAT_3_IDS, ...ANCHOR_IDS]) {
      expect(revealed(id), `${id} leaked into pose 0`).toBe(false);
    }
    unmount();
  });
});

// ── AC 2 · beat 2: the four capabilities, and the November tie ───────────────

describe("beat 2 · company-managed seats", () => {
  test("names ALL FOUR capabilities, in §6.7's order", () => {
    expect(C.capabilities.map((c) => c.label)).toEqual([
      "Admin control",
      "SSO",
      "Central billing",
      "Usage analytics",
    ]);
    const { unmount } = renderSlide(priceAnchorFor("gems"), 1);
    for (const c of C.capabilities) {
      expect(screen.getByTestId(`subscription-capability-${c.id}`).textContent).toBe(c.label);
      expect(revealed(`subscription-capability-${c.id}`)).toBe(true);
    }
    unmount();
  });

  test("ties the analytics to the November post-assessment, and reveals that line LAST", () => {
    // Without this sentence "usage analytics" is a feature; with it, the managed seat
    // is the instrument the mandate's own measurement runs on. The AC requires the
    // tie, so the tie is pinned — and it is the POSE'S last arrival, so the beat
    // never rests on a feature list.
    expect(C.analyticsLine).toBe(
      "Usage analytics are what make the November post-assessment mean anything.",
    );
    expect(C.analyticsLineKw).toContain("November post-assessment");

    const { unmount } = renderSlide(priceAnchorFor("berau"), 1);
    expect(screen.getByTestId("subscription-analytics-line").textContent).toBe(C.analyticsLine);
    const lineAt = arrival("subscription-analytics-line");
    for (const id of BEAT_2_IDS.filter((x) => x !== "subscription-analytics-line")) {
      expect(arrival(id), `${id} must not overtake the November line`).toBeLessThan(lineAt);
    }
    unmount();
  });
});

// ── AC 3 · beat 3: a formula with named inputs, tiered — and NO total ────────

describe("beat 3 · the arithmetic, runnable and not answered", () => {
  test("renders the formula with its three named inputs, tier-aware, computing nothing", () => {
    // The inputs are the room's own seat count, the table's price, and the twelve
    // months that make it an annual line item — named, so a Div Head can run it, and
    // "tier by tier" is IN the formula so the tiering is an input, not a footnote.
    expect(C.formula).toBe("your seats × price / seat / month × 12, tier by tier");
    expect(C.formula).toContain("your seats");
    expect(C.formula).toContain("price / seat / month");
    expect(C.formula).toContain("12");
    expect(C.formula).toContain("tier by tier");
    // Runnable, NOT answered: the formula holds no `=` and no currency amount.
    expect(C.formula).not.toMatch(/=/);
    expect(C.formula).not.toMatch(PRICE);

    const { unmount } = renderSlide(priceAnchorFor("berau"), 2);
    expect(screen.getByTestId("subscription-formula").textContent).toBe(C.formula);
    unmount();
  });

  test("prices three tiers whose labels ARE the tiering, with the lever line last", () => {
    // The tier labels answer "so we buy everyone a seat?" — most of the division on
    // the cheap tier, a few heavy builders on the expensive one, a threshold where
    // the plan changes shape.
    expect(C.tiers.map((t) => t.id)).toEqual(["team-standard", "team-premium", "enterprise"]);
    expect(C.tiers[0].tier).toContain("Most of the division");
    expect(C.tiers[1].tier).toContain("A few heavy builders");
    expect(C.tiers[2].tier).toContain("Above 150 seats");

    const { unmount } = renderSlide(priceAnchorFor("gems"), 2);
    for (const t of C.tiers) {
      const row = screen.getByTestId(`subscription-tier-${t.id}`);
      expect(row.textContent).toContain(t.tier);
      // The price renders WHOLE, from the content module — never recomposed.
      expect(screen.getByTestId(`subscription-price-${t.id}`).textContent).toBe(t.price);
    }
    expect(screen.getByTestId("subscription-lever").textContent).toBe(C.leverLine);
    // The lever is pose 2's LAST arrival — the table's own footnote closes the band.
    const leverAt = arrival("subscription-lever");
    for (const id of BEAT_3_IDS.filter(
      (x) => x !== "subscription-lever" && x !== "subscription-rule",
    )) {
      expect(arrival(id), `${id} must not overtake the lever`).toBeLessThan(leverAt);
    }
    unmount();
  });

  test("presents NO single total as the audience's answer — every amount is a quoted figure", () => {
    // THE ABSENCE IS THE AC. A grand total (any product of the formula's inputs)
    // would be a currency amount outside the record's six quoted figures, so the rule
    // is: every amount behind a currency token, in every authored string of every
    // brand, is in QUOTED_AMOUNTS — and nothing anywhere computes (`=` is banned
    // outright; the formula is the only arithmetic and it uses words and ×).
    const seen: number[] = [];
    for (const copy of authoredStrings()) {
      expect(copy, `an equals sign computes an answer: ${JSON.stringify(copy)}`).not.toMatch(/=/);
      expect(copy, `a "total" in ${JSON.stringify(copy)}`).not.toMatch(/\btotals?\b/i);
      for (const match of copy.matchAll(PRICE)) {
        const amount = parseFloat(match[1].replace(/,/g, ""));
        expect(
          QUOTED_AMOUNTS.has(amount),
          `unquoted amount ${amount} in ${JSON.stringify(copy)} — not one of record ` +
            `§8's six figures; a computed total is exactly what this catches`,
        ).toBe(true);
        seen.push(amount);
      }
    }
    // POSITIVE CONTROLS: exactly the amounts the copy actually quotes passed
    // through the rule — the three tier rows, the lever's two monthly figures, and
    // the Berau anchor's pair, whose 204 the walk sees TWICE because the `lineKw`
    // sibling quotes the same figure — and the regex DOES catch a smuggled total.
    expect([...seen].sort((a, b) => a - b)).toEqual([20, 20, 25, 100, 125, 200, 204, 204]);
    const smuggled = "the division's line item: USD 24,480 / year";
    const caught = [...smuggled.matchAll(PRICE)];
    expect(caught).toHaveLength(1);
    expect(QUOTED_AMOUNTS.has(parseFloat(caught[0][1].replace(/,/g, "")))).toBe(false);
  });
});

// ── AC 4 · the closer: measure value, not activity ───────────────────────────

describe("the closer", () => {
  test('says "Measure value, not activity" AND that a seat count is not adoption', () => {
    expect(C.closer).toContain("Measure value, not activity");
    expect(C.closer).toContain("a seat count is not adoption");
    expect(C.closerKw).toEqual(["Measure value, not activity", "not adoption"]);

    const { unmount } = renderSlide(priceAnchorFor("berau"), 3);
    const closer = screen.getByTestId("subscription-closer");
    expect(closer.textContent).toBe(C.closer);
    // The keywords are RENDERED as emphasis, not just present in data.
    const ems = [...closer.querySelectorAll("em")].map((em) => em.textContent);
    expect(ems).toContain("Measure value, not activity");
    expect(ems).toContain("not adoption");
    unmount();
  });

  test("is the slide's LAST arrival — nothing rests on a price", () => {
    // The closer bounds every number above it: a reveal that ended on the anchor
    // would end the slide on a price, in front of a compliance-obligated reader.
    const { unmount } = renderSlide(priceAnchorFor("gems"), 3);
    const closerAt = arrival("subscription-closer");
    for (const id of ANCHOR_IDS.filter((x) => x !== "subscription-closer")) {
      expect(arrival(id), `${id} must not overtake the closer`).toBeLessThan(closerAt);
    }
    unmount();
  });
});

// ── AC 5 · §4.4 slot 7: the brand anchors, via the typed pick ────────────────

describe("§4.4 slot 7 · the price anchor", () => {
  test("Berau prints the $204/yr figure attributed to the ORGANIZER — never as the vendor's price", () => {
    const berau = priceAnchorFor("berau");
    expect(berau.kind).toBe("organizer-prize");
    if (berau.kind !== "organizer-prize") throw new Error("unreachable — narrowed above");
    // Record §8.1's three corrections, all held: a VOL-2 prize, attributed to the
    // organizer in the same sentence as the figure…
    expect(berau.line).toContain("Vol-2");
    expect(berau.line).toContain("valued by the organizer at USD 204 / year");
    expect(berau.lineKw).toContain("USD 204 / year");
    // …the attribution DENIES the vendor-price reading and prints the vendor's own
    // published charge beside it, dated…
    expect(berau.source).toContain("The organizer's stated prize value, not the vendor's price");
    expect(berau.source).toContain("USD 200 / year");
    expect(berau.source).toContain("2026-08-04");
    // …and no competition-window date anywhere in any authored string (§8.1
    // correction 3: Jun–Jul vs Sep–Oct is unresolved, so neither prints).
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(/\b(Jun|Jul|Sep|Oct)[a-z]*\b/);
    }
    // 204 exists NOWHERE outside the organizer-attributed pair, so no other string
    // can re-assert it as anyone else's number.
    for (const copy of authoredStrings()) {
      if (/204/.test(copy)) {
        expect([berau.line, ...berau.lineKw]).toContain(copy);
      }
    }

    const { unmount } = renderSlide(berau, 3);
    expect(screen.getByTestId("subscription-anchor-eyebrow").textContent).toBe(berau.eyebrow);
    expect(screen.getByTestId("subscription-anchor-line").textContent).toBe(berau.line);
    expect(screen.getByTestId("subscription-anchor-source").textContent).toBe(berau.source);
    unmount();
  });

  test("GEMS prints list price only, and states that no internal figure was official", () => {
    const gems = priceAnchorFor("gems");
    expect(gems.kind).toBe("list-price-only");
    if (gems.kind !== "list-price-only") throw new Error("unreachable — narrowed above");
    // The absence is a FINDING, dated with the issue's own "as of", pointing at the
    // tier table as the only honest anchor…
    expect(gems.line).toContain("No internal GEMS figure was official as of 2026-08-03");
    expect(gems.line).toContain("list prices");
    // …and the arm carries NO price of its own: §8.2 forbids repurposing any
    // adjacent figure, and the union's arm has no field a number could ride in on.
    for (const copy of walkStrings(gems)) {
      expect(copy, `a price on the GEMS arm: ${JSON.stringify(copy)}`).not.toMatch(PRICE);
    }
    expect(gems.source).toContain("2026-08-04");
    expect(gems.source).toContain("no seat price, budget, or prize exists to quote");

    const { unmount } = renderSlide(gems, 3);
    expect(screen.getByTestId("subscription-anchor-line").textContent).toBe(gems.line);
    expect(screen.getByTestId("subscription-anchor-source").textContent).toBe(gems.source);
    unmount();
  });

  test("neither branch leaks a byte of the other's — both mounted in one epoch", () => {
    const a = renderSlide(priceAnchorFor("berau"), 3);
    const berauText = a.container.textContent ?? "";
    a.unmount();
    const b = renderSlide(priceAnchorFor("gems"), 3);
    const gemsText = b.container.textContent ?? "";
    b.unmount();

    // Berau's room sees its prize; GEMS' room sees the stated absence — and NOT the
    // other way round, byte by byte: no 204, no organizer, no prize reaches GEMS,
    // and no "GEMS" and no stated absence reaches Berau.
    expect(berauText).toContain("USD 204 / year");
    expect(berauText).toContain("organizer");
    expect(berauText).not.toContain("GEMS");
    expect(berauText).not.toContain("No internal");
    expect(gemsText).toContain("No internal GEMS figure was official");
    expect(gemsText).not.toContain("204");
    expect(gemsText).not.toContain("organizer");
    // NOT `not.toContain("prize")`: the GEMS attribution DENIES one exists ("no seat
    // price, budget, or prize exists to quote"), and the denial is §8.2's finding.
    // What may never reach GEMS is the Berau prize itself:
    expect(gemsText).not.toContain("Vol-2");
    expect(gemsText).not.toContain("competition");
    // The formula, the tiers and the closer are brand-INVARIANT — list prices are
    // the vendor's and the boundary is the deck's, identical in both rooms.
    for (const shared of [C.formula, ...C.tiers.map((t) => t.price), C.closer]) {
      expect(berauText).toContain(shared);
      expect(gemsText).toContain(shared);
    }
  });

  test("every registered brand resolves an anchor whose line is real copy", () => {
    // Walked over `BRANDS`, not this file's idea of the brand list — a fourth brand
    // fails to compile in the content module's Record; this holds the runtime half:
    // no arm's line is empty, so no composed deck can render a blank slot.
    for (const brand of Object.keys(BRANDS) as Brand[]) {
      const anchor = priceAnchorFor(brand);
      expect(anchor.line.length, brand).toBeGreaterThan(20);
      expect(anchor.lineKw.length, brand).toBeGreaterThan(0);
      for (const kw of anchor.lineKw) expect(anchor.line, brand).toContain(kw);
    }
  });
});

// ── AC 6 · §12.2's gate: every rendered price carries period and date ────────

describe("§12.2 · the price gate, held as a sweep", () => {
  test.each(LEADER_BRANDS)(
    "%s · every price on the rendered stage carries a billing period and its read date",
    (brand) => {
      // A SWEEP, NOT A LIST: the regex finds every currency token in every rendered
      // unit and interrogates the unit it sits in — so a price added later, anywhere
      // on this stage, without "billed …"/"/mo"/"/year" and "2026-08-04" beside it,
      // fails the day it renders. (The anchor line + attribution are ONE unit — see
      // `pricedUnits` for why that is §8.1's construction and not a loophole.)
      const { container, unmount } = renderSlide(priceAnchorFor(brand), 3);
      let found = 0;
      for (const unitText of pricedUnits(container)) {
        for (const match of unitText.matchAll(PRICE)) {
          found += 1;
          expect(
            PERIOD.test(unitText),
            `price "${match[0]}" carries no billing period in ${JSON.stringify(unitText)}`,
          ).toBe(true);
          expect(
            DATE_READ.test(unitText),
            `price "${match[0]}" carries no read date in ${JSON.stringify(unitText)}`,
          ).toBe(true);
        }
      }
      // POSITIVE CONTROL — the sweep saw the prices that are actually there: three
      // tier rows + the lever's two, plus Berau's two anchor figures.
      expect(found).toBe(brand === "berau" ? 7 : 5);
      // And the regexes are alive: a dated, perioded control passes; a bare one fails.
      expect(PERIOD.test("USD 30 /seat/mo · read 2026-08-04")).toBe(true);
      expect(PERIOD.test("a bare USD 30 with no period")).toBe(false);
      expect(DATE_READ.test("a bare USD 30 with no date")).toBe(false);
      unmount();
    },
  );

  test("the same gate holds over the authored strings, brand arms included", () => {
    // The rendered sweep proves today's composition; this proves the COPY — including
    // the `general` arm nothing composes — so a priced string cannot even exist
    // undated. Same one-unit join for each anchor arm, for `pricedUnits`' reason.
    const units: string[] = walkStrings(C);
    for (const brand of Object.keys(BRANDS) as Brand[]) {
      units.push(walkStrings(priceAnchorFor(brand)).join(" "));
    }
    for (const unitText of units) {
      for (const match of unitText.matchAll(PRICE)) {
        expect(
          PERIOD.test(unitText) && DATE_READ.test(unitText),
          `price "${match[0]}" is missing its period or read date in ${JSON.stringify(unitText)}`,
        ).toBe(true);
      }
    }
  });
});

// ── AC 8 · poses: complete at every stop, forward and backward ───────────────

describe("the pose walk", () => {
  test.each(LEADER_BRANDS)("%s · every pose is complete, forward and backward", (brand) => {
    const { container, unmount } = renderSlide(priceAnchorFor(brand));
    const walk = [...POSES, ...[...POSES].reverse()];
    for (const pose of walk) {
      goToPose(pose);
      for (let beat = 0; beat < REVEALED_AT.length; beat++) {
        for (const id of REVEALED_AT[beat]) {
          // A pose is everything argued so far: revealed iff its beat's pose has
          // been reached, at every stop in BOTH directions — `on` is derived from
          // the pose, not accumulated, so walking back to 0 must un-reveal 1–3.
          expect(revealed(id), `${id} at pose ${pose}`).toBe(beat <= pose);
        }
      }
      // ZERO SMIL NODES AT EVERY STOP — the AC's jsdom half, under the default
      // motion preference. The `reduce` half is below and in the browser walk.
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set").length,
        `SMIL at pose ${pose}`,
      ).toBe(0);
    }
    unmount();
  });

  test("the figure mounts no <svg> at all — zero SMIL by construction, not by discipline", () => {
    // The figure's own doc comment stakes the claim: the rule is a `div`, the rows
    // are placed text, and a SMIL node cannot appear without an author adding a
    // whole element class. This structural fact is what makes the reduce-mode zero a
    // construction rather than a promise.
    for (const brand of LEADER_BRANDS) {
      const { container, unmount } = renderSlide(priceAnchorFor(brand), 3);
      expect(container.querySelectorAll("svg").length, brand).toBe(0);
      unmount();
    }
  });
});

// ── AC 8 · prefers-reduced-motion: reduce ────────────────────────────────────

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

  test.each(LEADER_BRANDS)("%s · mounts zero SMIL nodes at every pose", (brand) => {
    // SMIL is invisible to the global `prefers-reduced-motion` rule — it squashes
    // CSS durations only — so a SMIL node would have to be gated at mount. This
    // slide has nothing to gate, and that is the claim: the census is identical
    // under either preference because NOTHING under this slide reads `matchMedia`
    // at all. The mock proves the markup is preference-independent, which is the
    // half a DOM test owns; the squashed-duration half is the browser walk's.
    const { container, unmount } = renderSlide(priceAnchorFor(brand));
    for (const pose of POSES) {
      goToPose(pose);
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set").length,
        `reduce · ${brand} · pose ${pose}`,
      ).toBe(0);
    }
    unmount();
  });

  test.each(LEADER_BRANDS)("%s · every pose still renders complete, with its copy", (brand) => {
    const { unmount } = renderSlide(priceAnchorFor(brand));
    for (const pose of POSES) {
      goToPose(pose);
      for (let beat = 0; beat <= pose; beat++) {
        for (const id of REVEALED_AT[beat]) {
          expect(revealed(id), `reduce · pose ${pose} · ${id}`).toBe(true);
          // AND THE COPY IS THERE, not merely the box: a reduced-motion path that
          // dropped children to "avoid animating them" would still pass a class
          // check. The rule wrapper is the one box with no text of its own.
          if (id !== "subscription-rule") {
            expect(
              screen.getByTestId(id).textContent,
              `reduce · pose ${pose} · ${id} is empty`,
            ).not.toBe("");
          }
        }
      }
    }
    unmount();
  });
});

// ── AC 1 · composition: last of the invest run, leader decks only ────────────

describe("composition", () => {
  test("closes the invest run — FIFTH and last, behind its four siblings", () => {
    // The whole run, in order, off the leader deck set's own list: gh#59 APPENDED,
    // so the ids read as one sequence and the hand back to the curriculum
    // moved along by exactly one. Both leader deck sets (`berau-leader`,
    // `gems-leader`) compose from THIS list — asserted against `VARIANTS` below —
    // so one assertion covers both rooms.
    //
    // FOURTH UNTIL gh#70 AND FIFTH SINCE, with this file's own slide never moving. That
    // ticket inserted `invest-base-rates` at the run's HEAD, which lengthened the run in
    // front of this row rather than behind it: this slide is still the run's LAST, still
    // hands to `b1-evolution-journey`, and derives D.5 rather than D.4 (see `AT`). The
    // ANCHOR moved with it — `at` keys on the run's first row, which is no longer
    // `invest-own-proof` — because a slice taken from the old anchor would have run one
    // row past the curriculum boundary and said nothing about the join this test is for.
    // §6.7 asks for no sixth `invest` slide, so five is FINAL.
    const { slides } = DECK_SET_COMPOSITION.leader;
    const at = slides.indexOf("invest-base-rates");
    expect(at).toBeGreaterThan(-1);
    expect(slides.slice(at, at + 5)).toEqual([
      "invest-base-rates",
      "invest-own-proof",
      "invest-chicken-egg",
      "invest-security",
      "invest-subscription",
    ]);
    expect(slides[at + 5]).toBe("b1-evolution-journey");
    // Exactly the two leader variants ride the leader set — the "both leader deck
    // sets" half, held against the variant table rather than assumed.
    const leaderVariants = Object.values(VARIANTS)
      .filter((v) => v.deckSet === "leader")
      .map((v) => v.id)
      .sort();
    expect(leaderVariants).toEqual(["berau-leader", "gems-leader"]);
  });

  test("appears in NO standard deck", () => {
    // The per-id leak gh#57 named: the standard list holds no `invest` row at all,
    // so this id arriving there would open a run in front of the curriculum and
    // renumber everything behind it.
    expect(DECK_SET_COMPOSITION.standard.slides).not.toContain("invest-subscription");
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
    // prints the DERIVED figure (D.4 today), which is the composer's to print and
    // not this slide's to author.
    const { container, unmount } = renderSlide(priceAnchorFor("gems"), 3);
    const stageText = [
      ...container.querySelectorAll<HTMLElement>("[data-testid^='subscription-']"),
    ]
      .map((el) => el.textContent ?? "")
      .join(" | ");
    expect(stageText.length).toBeGreaterThan(100);
    expect(stageText).not.toMatch(FIGURE);
    unmount();
  });
});

// ── the keyword rule: kw on prose only ───────────────────────────────────────

describe("the keyword rule", () => {
  test("exactly the three shared prose strings carry a *Kw sibling, every keyword real", () => {
    // The content block's own two lists, held as lists: PROSE is `headline`,
    // `analyticsLine`, `closer` (plus each anchor's `line`, asserted in the slot-7
    // block); everything else is a label and may not gain a `*Kw` without landing
    // here — the sharpest cases are the price strings, where a copper italic would
    // emphasise a fragment of a quantity.
    const kwKeys = Object.keys(C).filter((k) => k.endsWith("Kw"));
    expect(kwKeys.sort()).toEqual(["analyticsLineKw", "closerKw", "headlineKw"]);
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

  test("labels render with no emphasis — a copper italic in a price is a fault", () => {
    const { unmount } = renderSlide(priceAnchorFor("berau"), 3);
    const labelIds = [
      "subscription-gaps-eyebrow",
      ...C.gaps.map((g) => `subscription-gap-${g.id}`),
      "subscription-seats-eyebrow",
      "subscription-analytics-eyebrow",
      "subscription-formula-eyebrow",
      "subscription-formula",
      ...C.tiers.map((t) => `subscription-tier-${t.id}`),
      "subscription-lever",
      "subscription-anchor-eyebrow",
      "subscription-anchor-source",
    ];
    for (const id of labelIds) {
      expect(screen.getByTestId(id).querySelector("em"), `<em> inside label ${id}`).toBeNull();
    }
    // …while the prose boxes DO carry theirs, so the absence above cannot pass
    // because emphasis stopped rendering everywhere.
    expect(
      screen.getByTestId("subscription-analytics-line").querySelectorAll("em").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByTestId("subscription-anchor-line").querySelectorAll("em").length,
    ).toBeGreaterThan(0);
    unmount();
  });
});

// ── geometry: one number, both sides ─────────────────────────────────────────

describe("the geometry", () => {
  test("the counts are welded to the content tuples they draw", () => {
    // Cross-MODULE comparisons — a geometry constant against the content tuple it
    // claims to pin — so none of these can be a self-comparison. The gap/capability
    // weld is the ledger property: a fifth gap with four capabilities would render a
    // comparison with a hole in it.
    expect(GAP_COUNT).toBe(C.gaps.length);
    expect(CAPABILITY_COUNT).toBe(C.capabilities.length);
    expect(CAPABILITY_COUNT).toBe(GAP_COUNT);
    expect(TIER_COUNT).toBe(C.tiers.length);
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThanOrEqual(0);
  });

  test("every placed box sits inside the stage and above the nav band, at the fullest pose", () => {
    const { container, unmount } = renderSlide(priceAnchorFor("berau"), 3);
    const boxes = [...container.querySelectorAll<HTMLElement>("[data-testid^='subscription-']")]
      // The price spans are the documented flow-layout exception: they sit inside
      // their tier row's flex box and carry no left/top of their own.
      .filter((el) => !(el.dataset.testid ?? "").startsWith("subscription-price-"));
    expect(boxes.length).toBeGreaterThan(12);
    for (const el of boxes) {
      const id = el.dataset.testid;
      const left = parseFloat(el.style.left);
      const top = parseFloat(el.style.top);
      const width = parseFloat(el.style.width);
      // `subscription-rule` declares no height — `.copper-rule` takes its 1px from
      // the stylesheet, which jsdom does not compute — so it falls back to the
      // geometry module's own constant rather than letting NaN pass as a number.
      const height = id === "subscription-rule" ? RULE_HEIGHT : parseFloat(el.style.height);
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
    const { unmount } = renderSlide(priceAnchorFor("berau"), 3);
    expect(parseFloat(screen.getByTestId("subscription-analytics-line").style.top)).toBe(
      ANALYTICS_TOP,
    );
    expect(parseFloat(screen.getByTestId("subscription-formula").style.top)).toBe(FORMULA_TOP);
    expect(parseFloat(screen.getByTestId("subscription-anchor-source").style.top)).toBe(
      ANCHOR_SOURCE_TOP,
    );
    expect(parseFloat(screen.getByTestId("subscription-closer").style.top)).toBe(CLOSER_TOP);
    expect(parseFloat(screen.getByTestId("subscription-rule").style.width)).toBe(CONTENT_WIDTH);
    unmount();
  });
});
