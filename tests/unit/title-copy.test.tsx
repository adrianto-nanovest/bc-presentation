// The cover's copy, per deck set (spec §4.5, gh#42).
//
// The leader deck argues an INVESTMENT CASE, so its cover cannot promise
// individual capability. Two things can silently break that:
//
//   1. The pick resolving to the wrong block — a leader deck opening on "From AI
//      Curiosity to AI Capability" looks like a working cover and contradicts
//      every slide after it. So the leader copy is read back out of the DOM
//      through the real `Title` component under a real leader `?variant=`, not
//      asserted off the content object: reading the authored value would only
//      re-state it, and would still pass with `title.tsx` pointed at the
//      standard block.
//   2. A keyword that is not a substring of its copy. `highlight()` is a plain
//      `String.includes` match that NO-OPS SILENTLY (spec trap 5), so a typo or
//      a curly apostrophe drops a copper highlight with no error anywhere.
//
// The three standard variants must be BYTE-IDENTICAL to what they shipped
// before, so the two standard strings are quoted here as literals — the same
// discipline `a1-agenda-pointers.test.tsx` applies to the pointers it froze.
//
// WHY A FILE OF ITS OWN, next to `variant-composition.test.tsx`, which already
// renders `Title` for its workshop chip: that file's subject is which SLIDES a
// variant composes, and gh#41 is rewriting its leader block right now. Copy is a
// separate subject with a separate failure mode, and splitting it keeps the two
// tickets off one file.
//
// ONE EPOCH HOLDS ONE VARIANT. `src/variant.ts` resolves `VARIANT` at module
// scope and `title.tsx` reads it, so a deck set's cover only exists inside a
// module registry loaded with that variant's `?variant=` in place — the pattern
// `variant-composition.test.tsx` and `tests/harvest/deck-numbering.tsx` use.
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { DECK_SETS, type DeckSetId, type VariantId } from "@/deck-variants";
import {
  titleContent,
  titleContentFor,
  type TitleContent,
} from "@/slides/opening-section-a/content";

/** What the cover has always printed, quoted from `main` before gh#42. The
 *  three standard variants must not move by one byte. */
const STANDARD_AS_SHIPPED = {
  headline: "From AI Curiosity to AI Capability",
  tagline:
    "A working session on the AI stack, the mindset shift, and the new operator role — for everyone, not just engineers.",
} as const;

/**
 * The leader cover as the owner signed it off — headline authored in §4.5,
 * tagline authored on gh#42.
 *
 * QUOTED HERE, not read off `titleContentFor("leader")`. This copy is
 * OWNER-APPROVED and the thesis it carries is repeated verbatim by A.1 and
 * `invest-own-proof`; an assertion that read the content object would re-state
 * whatever it currently holds and pass through a silent rewording of all of it.
 * The cost is deliberate: changing the wording means changing it here too, which
 * is the point — a signed-off string should not move without someone noticing.
 */
const LEADER_AS_SIGNED_OFF = {
  // RE-AUTHORED ON OWNER REVIEW, 2026-08-05, and both halves for the same reason
  // — LENGTH. §4.5's headline ran 43 characters over two lines of 84px display
  // serif with no verb in it; the tagline ran 185 characters over THREE lines at
  // 24px, and the owner capped it at two. The replacement keeps all three §4.5
  // jobs (below) and drops the opener's restatement ("that proof at scale") and
  // the definition's second half ("not just using it").
  //
  // The spec text still quotes the old pair, so `content.ts` carries the deviation
  // note beside the strings; this constant is the pin, not the record.
  headline: "Scale What Already Works",
  tagline:
    "A few people proved it. Every team directing AI — that takes seats, protected hours, and a mandate only you can give.",
  /** In the order `highlight()` renders them — DOM order, i.e. copy order. */
  taglineKw: ["Every team directing AI", "only you can give"],
} as const;

const realLocation = window.location;

function useVariant(id: VariantId): void {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: new URL(`http://localhost:5173/?variant=${id}`),
  });
  vi.resetModules();
}

beforeEach(() => vi.resetModules());

afterEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: realLocation,
  });
});

// ── As rendered, variant by variant ──────────────────────────────────────────

interface RenderedCover {
  /** Raw `textContent`: "byte-identical" has to mean it. */
  headline: string;
  tagline: string;
  /** The keywords `highlight()` actually rendered, in DOM order — an empty
   *  array means every one of them missed. `KeywordHighlight` renders an `<em>`,
   *  and the tagline has no other emphasis, so the tag IS the selector. */
  taglineHighlights: string[];
  /** Present iff a FigLabel rendered. The cover is `numbered: false`. */
  figLabels: number;
}

async function coverFor(id: VariantId): Promise<RenderedCover> {
  useVariant(id);
  cleanup(); // several variants are rendered inside one test case
  const { Title } = await import("@/slides/opening-section-a/title");
  const { container } = render(<Title />);
  const headline = container.querySelector('[data-testid="display-title"]');
  // The tagline is the one <p> in the title block; it has no testid of its own
  // and adding one to production markup for a test would be the wrong trade.
  const tagline = container.querySelector("p");
  expect(headline, `no headline rendered for ${id}`).not.toBeNull();
  expect(tagline, `no tagline rendered for ${id}`).not.toBeNull();
  return {
    headline: headline?.textContent ?? "",
    tagline: tagline?.textContent ?? "",
    taglineHighlights: Array.from(tagline?.querySelectorAll("em") ?? []).map(
      (el) => el.textContent ?? "",
    ),
    figLabels: container.querySelectorAll(".fig-label").length,
  };
}

describe("the cover, as each variant renders it", () => {
  test("the three standard variants print exactly what they shipped", async () => {
    for (const id of ["berau-middle-mgmt", "gems-middle-mgmt", "general"] as VariantId[]) {
      const cover = await coverFor(id);
      expect(cover.headline, id).toBe(STANDARD_AS_SHIPPED.headline);
      expect(cover.tagline, id).toBe(STANDARD_AS_SHIPPED.tagline);
    }
  });

  test("both leader variants print the leader headline and tagline", async () => {
    for (const id of ["berau-leader", "gems-leader"] as VariantId[]) {
      const cover = await coverFor(id);
      expect(cover.headline, id).toBe(LEADER_AS_SIGNED_OFF.headline);
      expect(cover.tagline, id).toBe(LEADER_AS_SIGNED_OFF.tagline);
      // Not the standard copy — the negative is not implied by the positives,
      // since both would still pass if the two blocks were ever aliased.
      expect(cover.tagline, id).not.toBe(STANDARD_AS_SHIPPED.tagline);
    }
  });

  test("the leader tagline highlights land — every keyword renders", async () => {
    const { taglineHighlights } = await coverFor("berau-leader");
    expect(taglineHighlights).toEqual([...LEADER_AS_SIGNED_OFF.taglineKw]);
  });

  test("the cover prints no figure label, on either deck set", async () => {
    // §4.5's watch item: the title carries `numbered: false`, and nothing in this
    // ticket touches numbering.
    expect((await coverFor("berau-middle-mgmt")).figLabels).toBe(0);
    expect((await coverFor("berau-leader")).figLabels).toBe(0);
  });

  test("the workshop chip still names the brand, suffixed on the leader deck", async () => {
    // The chip is the ONLY brand signal on the leader cover — both brands share
    // the leader copy — so this ticket's claim depends on it still being there.
    useVariant("gems-leader");
    cleanup();
    const { Title } = await import("@/slides/opening-section-a/title");
    const { container } = render(<Title />);
    expect(
      container.querySelector('[data-testid="title-workshop-chip"]')?.textContent,
    ).toBe("GEMS AI Catalyst Workshop · Leadership");
  });
});

// ── The pick itself ──────────────────────────────────────────────────────────

const DECK_SET_IDS = Object.keys(DECK_SETS) as DeckSetId[];

describe("titleContentFor", () => {
  test("every registered deck set has non-empty copy", () => {
    // Read off `DECK_SETS` rather than a hand-kept pair, so a third deck set
    // arrives here by being registered. NOT a `toBeDefined()` check — the
    // `Record<DeckSetId, …>` already makes a missing deck set a compile error;
    // an EMPTY string is what the compiler cannot see, and a blank cover is the
    // failure that would reach a projector.
    for (const deckSet of DECK_SET_IDS) {
      expect(titleContentFor(deckSet).displayHeadline, deckSet).not.toBe("");
      expect(titleContentFor(deckSet).tagline, deckSet).not.toBe("");
    }
  });

  test("standard is the shared block itself, by identity", () => {
    expect(titleContentFor("standard")).toBe(titleContent);
  });

  test("the leader tagline does the three jobs §4.5 gives it", () => {
    const { tagline } = titleContentFor("leader");
    // Phrases, not a vibe check: each fragment is the one this deck uses for that
    // job, and rewording one here means rewording it in A.1 and
    // `invest-own-proof` too (§4.5's thesis line runs through all three).
    //
    // THE JOBS ARE THE ASSERTION; the phrases are only how this cover currently
    // does them, and they moved with the 2026-08-05 shortening — the term "agentic
    // organization" left the cover (A.1's second movement question names it one
    // slide later) and the definition kept its concrete half.
    expect(tagline).toContain("proved it"); // a few people already did it
    expect(tagline).toContain("Every team directing AI"); // what it IS, concretely
    expect(tagline).toContain("seats, protected hours"); // what it COSTS
    expect(tagline).toContain("only you can give"); // what only a leader authorizes
  });

  test("the leader tagline stays inside the cover's two-line budget", () => {
    // The owner's cap, held as the one number a reword can be checked against
    // WITHOUT a browser: `title.tsx` renders the tagline at 24px italic serif
    // inside `maxWidth: 680`, which runs ~60 characters to the line. jsdom has no
    // layout and cannot measure the real wrap, so this is a proxy — the rendered
    // line count is verified in a real engine, and this is what fails first when a
    // future edit pushes the string back to the three lines it had.
    expect(titleContentFor("leader").tagline.length).toBeLessThanOrEqual(120);
  });

  test("every keyword is a substring of the copy it highlights", () => {
    // `highlight()` is a silent `String.includes`, so a keyword that misses costs
    // a copper highlight and reports nothing. Checked for BOTH blocks, since the
    // leader block spreads the standard one and a future edit could break either.
    for (const deckSet of DECK_SET_IDS) {
      const c: TitleContent = titleContentFor(deckSet);
      for (const kw of c.displayHeadlineKw) {
        expect(c.displayHeadline, `${deckSet}: headline kw`).toContain(kw);
      }
      for (const kw of c.taglineKw) {
        expect(c.tagline, `${deckSet}: tagline kw`).toContain(kw);
      }
      expect(c.taglineKw.length, `${deckSet}: 1–3 keywords per chunk`).toBeLessThanOrEqual(3);
    }
  });

  test("the hero, the credit and the darken strength do NOT vary by deck set", () => {
    // §4.5's second watch item: the hero is `/heroes/title-data-topology.jpg` for
    // all five variants, and no per-deck-set hero field exists. The leader block
    // SPREADS the standard one, so this holds by construction — and this test is
    // what fails if someone forks those values instead.
    const standard = titleContentFor("standard");
    for (const deckSet of DECK_SET_IDS) {
      const c = titleContentFor(deckSet);
      expect(c.heroSrc, deckSet).toBe(standard.heroSrc);
      expect(c.heroAlt, deckSet).toBe(standard.heroAlt);
      expect(c.facilitator, deckSet).toBe(standard.facilitator);
      expect(c.darkenStrength, deckSet).toBe(standard.darkenStrength);
    }
  });
});
