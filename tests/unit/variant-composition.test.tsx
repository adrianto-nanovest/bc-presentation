// The client consumers of the variant table: the title-slide workshop chip,
// A.1's hook (brand-driven) and Practice-Lab inclusion (`practiceLab`-driven).
//
// `VARIANT` resolves once at module scope, so each case re-points
// `window.location` and then resets the module registry. Every module a case
// needs is imported AFTER that reset, in the same epoch, so identity
// comparisons between a deck list and a slide module hold.
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import type { VariantId } from "@/deck-variants";

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

// ── Title-slide workshop chip ────────────────────────────────────────────────

async function chipTextFor(id: VariantId): Promise<string> {
  useVariant(id);
  cleanup(); // several variants are checked inside one test case
  const { Title } = await import("@/slides/opening-section-a/title");
  const { container } = render(<Title />);
  const chip = container.querySelector('[data-testid="title-workshop-chip"]');
  expect(chip, `no workshop chip rendered for ${id}`).not.toBeNull();
  return chip?.textContent ?? "";
}

describe("title-slide workshop chip", () => {
  test("is the brand label, with the leader suffix only on leader deck sets", async () => {
    expect(await chipTextFor("berau-middle-mgmt")).toBe("Berau AI Catalyst Workshop");
    expect(await chipTextFor("berau-leader")).toBe(
      "Berau AI Catalyst Workshop · Leadership",
    );
    expect(await chipTextFor("gems-middle-mgmt")).toBe("GEMS AI Catalyst Workshop");
    expect(await chipTextFor("gems-leader")).toBe("GEMS AI Catalyst Workshop · Leadership");
    expect(await chipTextFor("general")).toBe("AI Catalyst Workshop");
  });

  test("berau no longer advertises 'Vol 2, Session 2' (accepted copy change, #6)", async () => {
    expect(await chipTextFor("berau-middle-mgmt")).not.toMatch(/Vol 2/);
  });
});

// ── A.1 hook, selected by brand ──────────────────────────────────────────────

// READ OFF THE COMPOSED DECK, not off a section index module. Until gh#40 the
// brand pick lived in `@/slides/opening-section-a`, which handed the deck the
// cover plus one A.1; the deck set now owns the order and `@/deck/slots.ts` the
// pick, so `deckSlides` is where the answer is. The assertions below are
// unchanged — `slides[1]` is still the A.1 this brand runs.
async function openingFor(id: VariantId) {
  useVariant(id);
  const [registry, berauA1, generalA1, gemsA1] = await Promise.all([
    import("@/deck/registry"),
    import("@/slides/opening-section-a/a1-what-youve-seen"),
    import("@/slides/opening-section-a/a1-general"),
    import("@/slides/opening-section-a/a1-gems"),
  ]);
  return {
    slides: registry.deckSlides,
    a1Slide: berauA1.a1Slide,
    a1GeneralSlide: generalA1.a1GeneralSlide,
    a1GemsSlide: gemsA1.a1GemsSlide,
  };
}

describe("A.1 hook selection", () => {
  test("each brand gets its own hook: berau the winners, gems the portfolio, general familiarity", async () => {
    for (const id of ["berau-middle-mgmt", "berau-leader"] as VariantId[]) {
      const { slides, a1Slide, a1GemsSlide } = await openingFor(id);
      expect(slides[1], id).toBe(a1Slide);
      expect(slides[1], id).not.toBe(a1GemsSlide);
    }
    // Both GEMS deck sets, since §5 ships every brand delta to `gems-leader`
    // too — leaders run the same practice lab (gh#25). The negative assertions
    // are not implied by the positives: were the three slide defs ever aliased
    // to one object, every positive here would still pass.
    for (const id of ["gems-middle-mgmt", "gems-leader"] as VariantId[]) {
      const { slides, a1GemsSlide, a1Slide, a1GeneralSlide } = await openingFor(id);
      expect(slides[1], id).toBe(a1GemsSlide);
      expect(slides[1], id).not.toBe(a1Slide);
      expect(slides[1], id).not.toBe(a1GeneralSlide);
    }
    const { slides, a1GeneralSlide, a1GemsSlide } = await openingFor("general");
    expect(slides[1]).toBe(a1GeneralSlide);
    expect(slides[1]).not.toBe(a1GemsSlide);
  });

  test("the opening is always the cover plus exactly one A.1", async () => {
    const { slides, a1Slide, a1GeneralSlide, a1GemsSlide } =
      await openingFor("gems-middle-mgmt");
    // Counted rather than length-checked, because the deck no longer ENDS after
    // the opening: the claim is that the three alternates share one slot, so
    // exactly one of them composes — the failure this guards is two A.1s, which
    // a `slides[1]` assertion would not see.
    const alternates = [a1Slide, a1GeneralSlide, a1GemsSlide];
    expect(slides.filter((s) => alternates.includes(s))).toHaveLength(1);
    expect(slides[0].numbered).toBe(false); // the cover, still first
  });
});

// ── Practice Lab inclusion, driven by the brand's `practiceLab` flag ─────────

// The composed deck again, for the same reason: `practiceLab` inclusion and the
// K.2 pick moved out of `@/slides/reveal-and-closing` and into `@/deck/slots.ts`
// (gh#40). `slice(-3)` still reads the lab run, because the lab still closes every
// deck — at K in a standard deck, and in a leader deck at J at the gh#41 floor, at
// K after gh#53's `gap` run, at L after gh#54's `shape` run, at M after gh#56's
// `invest` run and at N as of gh#60's `mandate` run. FIVE letters for one run in
// one deck, which is why this helper names none of them and slices from the end
// instead — and gh#60 is the one that would have caught a helper written any other
// way, because it is the first insert that moved this run without touching a
// single letter in front of it.
async function closingFor(id: VariantId) {
  useVariant(id);
  const [registry, k1, k2, k2Gems, k3] = await Promise.all([
    import("@/deck/registry"),
    import("@/slides/reveal-and-closing/k1-challenge-handoff"),
    import("@/slides/reveal-and-closing/k2-practice-lab-overview"),
    import("@/slides/reveal-and-closing/k2-gems"),
    import("@/slides/reveal-and-closing/k3-thank-you"),
  ]);
  return {
    slides: registry.deckSlides,
    k1Slide: k1.k1Slide,
    k2Slide: k2.k2Slide,
    k2GemsSlide: k2Gems.k2GemsSlide,
    k3Slide: k3.k3Slide,
  };
}

describe("Practice Lab slides", () => {
  test("brands with a practice lab keep K.1 + K.2 before the closer", async () => {
    for (const id of ["berau-middle-mgmt", "berau-leader"] as VariantId[]) {
      const { slides, k1Slide, k2Slide, k3Slide } = await closingFor(id);
      expect(slides.slice(-3), id).toEqual([k1Slide, k2Slide, k3Slide]);
    }
    // GEMS runs one track, so its part 2 is THE ANALYST — a brand delta shipped
    // to `gems-leader` too, since leaders run the same lab (gh#26).
    for (const id of ["gems-middle-mgmt", "gems-leader"] as VariantId[]) {
      const { slides, k1Slide, k2GemsSlide, k3Slide } = await closingFor(id);
      expect(slides.slice(-3), id).toEqual([k1Slide, k2GemsSlide, k3Slide]);
    }
  });

  test("the GEMS K.2 reaches neither berau nor general", async () => {
    for (const id of ["berau-middle-mgmt", "berau-leader", "general"] as VariantId[]) {
      const { slides, k2GemsSlide } = await closingFor(id);
      expect(slides, id).not.toContain(k2GemsSlide);
    }
  });

  test("general drops K.1 + K.2 and closes on the thank-you", async () => {
    const { slides, k1Slide, k2Slide, k3Slide } = await closingFor("general");
    expect(slides).not.toContain(k1Slide);
    expect(slides).not.toContain(k2Slide);
    expect(slides.at(-1)).toBe(k3Slide);
  });
});

// ── The leader deck sets compose their OWN deck ───────────────────────────────
// gh#41. Until Phase 4 both leader variants pointed at the standard slide list
// and only the `· Leadership` suffix separated them, and the block here said so.
// The leader deck now exists: the standard curriculum minus section F, with THREE
// leader-only runs in front of it — `gap` (gh#53), `shape` (gh#54) and `invest`
// (gh#56) — a FOURTH behind it, `mandate` (gh#60, between `pitfalls` and `meta`),
// and `f8-your-agentic-os` kept, standing as of gh#54 at §4.3's C.2, the second
// slide of that `shape` run — and no longer its LAST, since gh#68 appended
// `shape-middle-out` behind it and gh#71 inserted `shape-tam-kotter` between the two.
// That is every run §4.3 asks for, at every length it asks for.
//
// IT SAT INSIDE THE RETAINED TOOLS RUN FROM gh#41 UNTIL THEN, which is what the
// neighbour assertions below used to state. They were REWRITTEN rather than
// dropped: the pair of ids around f8 is the only thing that says the relocation
// actually happened, and a test that merely checked `toContain` would pass with f8
// parked anywhere in the deck.
//
// WHAT IS ASSERTED WHERE. The composed SHAPE — which runs, in what order, at what
// size — belongs to `deck-registry.test.ts`, and the printed letters and numbers
// to the numbering fixture. This file owns WHICH SLIDE: the cut, the survivor and
// where it stands, each brand's own alternates inside a leader deck, and the one
// `sectionKey` the deck set rewrites.
//
// BY IDENTITY WHERE IT CAN BE, BY ID WHERE IT CANNOT. `resolveDeckSetSlides`
// returns `{ ...def, sectionKey }` for a slot named in `sectionOverrides`
// (`src/deck/slots.ts`), so on a LEADER deck f8's composed row is a COPY of the
// imported def and every identity comparison against `f8Slide` is false there by
// construction. f8 is therefore joined on `id` throughout, and identity is kept for
// the A.1 and K.2 alternates, which no deck set overrides.
//
// `render` closures are re-created by each module epoch, so identity cannot
// cross a `resetModules()`; this fingerprints the composition instead.
async function deckShapeFor(id: VariantId): Promise<string[]> {
  useVariant(id);
  const { deckSlides } = await import("@/deck/registry");
  return deckSlides.map(
    (s) => `${s.sectionKey}:${s.steps}:${s.canonicalPose}:${s.animationMode}:${s.surface}`,
  );
}

/** Slide ids in composed order — the granularity the cut is stated at, since two
 *  slides can share a shape fingerprint but never an id. */
async function deckIdsFor(id: VariantId): Promise<string[]> {
  useVariant(id);
  const { deckSlides } = await import("@/deck/registry");
  return deckSlides.map((s) => s.id);
}

/** `id → sectionKey`, in composed order (a `Map` keeps insertion order, and ids
 *  are unique). Read off `deckSlides`, which is `resolveDeckSetSlides`' output, so
 *  this is the OVERRIDDEN key — the same value `composeDeck` groups into runs and
 *  derives letters from, not the key the slide's own file authors. */
async function sectionKeysFor(id: VariantId): Promise<Map<string, string>> {
  useVariant(id);
  const { deckSlides } = await import("@/deck/registry");
  return new Map(deckSlides.map((s): [string, string] => [s.id, s.sectionKey]));
}

/** The eight section-F slides the leader deck cuts. `f8-your-agentic-os` is NOT
 *  among them — it is the one that survives, which is the whole reason this list
 *  is spelled out rather than derived from an `f`-prefix. */
const CUT_F_IDS = [
  "f1-two-pillars",
  "f2-rag-ground-truth",
  "f3-plugins-the-package",
  "f4-skills-write-once",
  "f5-mcp-the-adapter",
  "f6-hooks-unsexy-work",
  "f7-subagents-specialists",
  "f9-bridge-to-g",
] as const;

const LEADER_IDS: VariantId[] = ["berau-leader", "gems-leader"];

/** The three variants whose deck set carries no `sectionOverrides` at all. Named
 *  rather than derived from `VARIANTS`, because what makes them the control group
 *  is the deck set's empty override table, not the count of standard variants. */
const STANDARD_IDS: VariantId[] = ["berau-middle-mgmt", "gems-middle-mgmt", "general"];

describe("leader deck sets", () => {
  test("cut section F but keep the relocated F.8 — at C.2 as of gh#54", async () => {
    for (const id of LEADER_IDS) {
      const ids = await deckIdsFor(id);
      expect(ids.filter((slide) => CUT_F_IDS.includes(slide as never)), id).toEqual([]);
      expect(ids, id).toContain("f8-your-agentic-os");
      // Its neighbours are the composition fact the `sectionOverrides` entry
      // exists to produce, and they have now moved twice: gh#54 took f8 out from
      // between `g10-beyond-big-three` and the bridge out of TOOLS and put it
      // behind `shape-agentic-org` — §4.3's C.1, the abstraction it is the
      // concrete answer to — in front of the retained curriculum's first slide,
      // and gh#56 opened the `invest` run in that gap, so the slide BEHIND f8 is
      // now the first row of section D rather than of section E. The line moved
      // with the deck instead of being dropped: which pair surrounds f8 is the
      // only thing that says the relocation still holds.
      //
      // NONE OF gh#57, gh#58, gh#59, gh#65, gh#66, gh#67, gh#69 OR gh#70 MOVED F8 AGAIN.
      // `invest-chicken-egg`
      // joined
      // the END of that `invest` run, `invest-security` joined behind it and
      // `invest-subscription` behind that, so f8's own neighbours are unchanged
      // and only the row that hands back to the curriculum moved along by one each
      // time. The two lines are asserted separately for that reason: the pair
      // around f8 is the RELOCATION, and the row before `b1-evolution-journey` is
      // the LENGTH of the run behind it.
      //
      // gh#68 IS THE FIRST TICKET SINCE gh#56 TO CHANGE WHAT FOLLOWS F8, and it did
      // not move f8: `shape-middle-out` appended at the TAIL of the `shape` run, so
      // the slide BEHIND f8 became the run's own third row rather than the first row
      // of section D. The relocation is untouched — `shape-agentic-org` is still in
      // front — which is why the line above this block did not move and every line
      // below it slid by one. A tail append is the only insert shape that can do
      // that: it lands between two runs without joining the second.
      //
      // AND gh#71 IS THE SECOND, AND IT TOOK THAT SLOT BACK OFF gh#68. `shape-tam-kotter`
      // inserted BETWEEN f8 and gh#68's row — the one place in this deck where a new row
      // lands directly against the relocated slide — so `ids[at + 1]` names it now and
      // every line below slid by one again. f8 itself did not move: its own INDEX is
      // unchanged (nothing was inserted in front of it) and its `at - 1` neighbour is
      // still gh#54's, which is the whole of what "the relocation still holds" means.
      // This is the only ticket that could have broken the relocation assertion by
      // landing one slot earlier, and the pair around f8 is what would have caught it.
      //
      // gh#69 DID NOT TOUCH f8's INDEX EITHER, let alone its neighbours:
      // `mandate-levers` appended behind the whole curriculum (§3.6), so it is
      // entirely downstream of this assertion — the one tail append of the six that
      // this block never sees.
      //
      // gh#70 DID NOT TOUCH F8'S PAIR EITHER, AND TWO TICKETS EARLIER IT WOULD HAVE.
      // `invest-base-rates` went in at the HEAD of the `invest` run, and that head no
      // longer sits at `at + 1`: gh#68 took that offset for `shape` two tickets before,
      // so the new row landed at `at + 2` and BOTH of f8's neighbours are still gh#54's
      // and gh#68's. The two rows are adjacent and neither ticket can see the other — a
      // TAIL append to `shape` and a HEAD insert into `invest` land on the same JOIN
      // from opposite sides of it, renumber inside different runs, and neither moves f8.
      //
      // gh#65 IS THE ONE THAT PROVES THE OFFSETS ARE RELATIVE AND NOT ABSOLUTE. It
      // inserted `gap-hardest-part` two rows IN FRONT of f8, so f8's own index moved
      // and not one assertion below did: every offset is taken from `at`, which is
      // looked up. A test that had written the indices out would have failed here on a
      // ticket that changed nothing it is about. gh#66 proved it a second time, with
      // `gap-no-sop` in the MIDDLE of that same run, and gh#67 a third — TWO rows in
      // the middle of it, pushing f8 two further along for no edit here at all.
      //
      // AND gh#68, gh#70 AND gh#71 PROVE THE SAME POINT FROM THE OTHER DIRECTION, which
      // is
      // worth having both halves of. An insert IN FRONT of f8 moves f8's index and no
      // offset here; an insert BEHIND it moves no index at all and rewrites the tail of
      // this ladder, because every row after the insert point is one offset later than
      // it was. Absolute indices would have failed on gh#65, gh#66 and gh#67, which
      // changed nothing this test is about, and would have passed gh#68, gh#70 and gh#71
      // at
      // the top of the block while every line below silently named the wrong
      // neighbour. Relative offsets fail on exactly the lines that moved.
      const at = ids.indexOf("f8-your-agentic-os");
      expect(ids[at - 1], id).toBe("shape-agentic-org");
      expect(ids[at + 1], id).toBe("shape-tam-kotter");
      expect(ids[at + 2], id).toBe("shape-middle-out");
      // And the run gh#56 opened still hands straight to the curriculum, FIVE
      // rows long since gh#70 closed it at §6.7's length — `invest-base-rates` at its
      // head, `invest-subscription` still between `invest-security`
      // and `b1-evolution-journey` — so `shape-middle-out` is still the last slide before
      // section D and
      // section D the last before the landscape — the whole insert, stated as the
      // joins it makes. gh#71 moved every offset below by one WITHOUT moving that join:
      // it landed in front of the run's last row, not behind it. Both runs are FINAL now
      // — §4.3 asks for no fifth `shape` slide and §6.7 for no sixth `invest` one — so
      // this ladder of offsets stops growing at `at + 8`.
      // ONE OFFSET SHORTER SINCE THE `invest` MERGE, which retired that run's last two rows
      // into `invest-governance`: the ladder now stops at `at + 7`.
      expect(ids[at + 3], id).toBe("invest-base-rates");
      // ONE OFFSET LONGER AGAIN AS OF 2026-08-15, and this time the added row IS an
      // argument — a mid-run insert at the run's second position, so every offset below
      // it steps by one and the ladder stops at `at + 9`.
      expect(ids[at + 4], id).toBe("invest-showcase-trap");
      expect(ids[at + 5], id).toBe("invest-own-proof");
      expect(ids[at + 6], id).toBe("invest-chicken-egg");
      expect(ids[at + 7], id).toBe("invest-governance");
      // ONE OFFSET LONGER AGAIN AS OF gh#72, and the added row is the `invest` run's
      // BRIDGE rather than a sixth argument: the ladder stops at `at + 8`, and the slide
      // that now hands to the curriculum is the bridge that says so out loud. The joins
      // this case exists to pin are unchanged in meaning — `shape` still ends on
      // `shape-middle-out`, `invest` still hands straight to `b1-evolution-journey`.
      expect(ids[at + 8], id).toBe("invest-bridge-to-curriculum");
      expect(ids[at + 9], id).toBe("b1-evolution-journey");
      // And the run it left has closed up behind it: `g10` now hands straight to
      // the bridge, with no hole where f8 stood.
      expect(ids[ids.indexOf("g10-beyond-big-three") + 1], id).toBe("g11-bridge-to-h");
    }
  });

  test("give f8 the `shape` key, so the C run is one four-slide run and nothing splits it", async () => {
    // WHAT THE OVERRIDE BUYS, read off the COMPOSED DECK. `deck-slots.ts`'s test
    // owns the deck-set table — that the entry exists and says `shape`; this owns
    // the consequence, which is the only half the projector shows.
    //
    // Joined on `id`, never on identity: the overridden row is a copy of the def
    // (see the block comment above), so `row.def === f8Slide` is false here by
    // construction and would make an identity assertion silently vacuous.
    for (const id of LEADER_IDS) {
      const keys = await sectionKeysFor(id);
      expect(keys.get("shape-agentic-org"), id).toBe("shape");
      expect(keys.get("f8-your-agentic-os"), id).toBe("shape");
      expect(keys.get("shape-tam-kotter"), id).toBe("shape");
      expect(keys.get("shape-middle-out"), id).toBe("shape");
      // THE WHOLE RUN, IN ORDER — which is the part that cannot be inferred from
      // the four lookups above. A fifth `shape` row, or any of these four
      // carrying another key, splits C: non-adjacently it throws as R4 at module
      // load, adjacently it just prints the wrong letter from here to the closer.
      // (`deck-registry.test.ts` owns the run's SIZE; this is which slides fill it.)
      //
      // THREE OF THE FOUR AUTHOR `shape` THEMSELVES — no override, unlike the row at
      // C.2. That is the asymmetry this list makes visible: three of these ids reach the
      // run from their own files and one reaches it from `deck-sets.ts`, and only a
      // comparison of the WHOLE run can say so.
      //
      // THE ORDER IS THE HALF gh#71 ADDED. Until that ticket the run's ids were in the
      // order they were written; now C.3 sits between the relocated C.2 and the row
      // gh#68 wrote first, so this comparison is also the only place that says the
      // deck-set list, and not the file history, decides where a `shape` row lands.
      const shapeRun = [...keys].filter(([, key]) => key === "shape").map(([slide]) => slide);
      expect(shapeRun, id).toEqual([
        "shape-agentic-org",
        "f8-your-agentic-os",
        "shape-tam-kotter",
        "shape-middle-out",
      ]);
    }
  });

  test("compose the mandate run between the pitfalls run and the meta run", async () => {
    // gh#60, gh#61 and gh#69, read off the COMPOSED deck rather than the authored
    // list —
    // which is the half `deck-slots.test.ts` cannot see. Two things have to hold at
    // once and only one of them is about position:
    //
    //   · the slide still carries `mandate` after resolution. The leader deck set
    //     has a `sectionOverrides` table, and a slide re-keyed there would compose
    //     into whatever run it was pointed at while the LIST still read correctly.
    //   · the run holds exactly §6.8's slides, in §6.8's order, and sits between
    //     the last `pitfalls` row and the first `meta` one. §3.6 puts the mandate
    //     there and nowhere else: in front of `pitfalls` it would ask a leader to
    //     authorize a programme before hearing what goes wrong with one, and
    //     behind `meta` it would arrive after the deck has stopped making its
    //     case.
    //
    // ORDER INSIDE THE RUN STARTED MATTERING ON gh#61, which is why the whole run
    // is compared rather than counted. K.1 asks the room to name its own
    // bottleneck, K.2 answers "and here is when any of it gets judged", and gh#69's
    // K.3 closes with what the person in the room can authorize alone; any two of
    // the three
    // reversed compose perfectly well and argue backwards, and nothing but this
    // line would notice.
    //
    // THE RUN IS COMPLETE AS OF gh#69, so the comparison below is now §6.8's whole
    // list and not a prefix of it — the SECOND leader-only run to reach its spec'd
    // length, after `gap` (gh#67). A fourth `mandate` row would fail here by name.
    //
    // NO LETTER IS ASSERTED. `mandate` takes K and pushes `meta`/`principles`/`lab`
    // along, all derived (§3.5); the numbering fixture records what that prints.
    // gh#69 moved neither: K was already claimed, and an END append leaves R3
    // nothing behind the new row to renumber inside the run.
    for (const id of LEADER_IDS) {
      const keys = await sectionKeysFor(id);
      const composed = [...keys];
      const at = composed.findIndex(([slide]) => slide === "mandate-enablement");
      expect(at, id).toBeGreaterThan(-1);
      expect(composed[at][1], id).toBe("mandate");
      expect(composed[at - 1]?.[1], id).toBe("pitfalls");
      // FOUR ROWS AS OF gh#72, so `meta` starts one offset later — and the fourth row is
      // `h3-bridge-to-i`, RELOCATED here out of `pitfalls` by the deck set's second
      // override. §6.8 still asks for three and holds three; what the fourth row buys is
      // that the run hands off to `meta` from the slide that bridges INTO `meta`, which is
      // the defect this ticket fixed (before it, that bridge sat in front of `mandate` and
      // pointed one section too far).
      expect(composed[at + 3]?.[1], id).toBe("mandate");
      expect(composed[at + 4]?.[1], id).toBe("meta");
      // THE WHOLE RUN, for the same reason the `shape` case above asserts one: a
      // second `mandate` row elsewhere in the deck throws as R4 where it is
      // non-adjacent and silently lengthens the run where it is not. THE RELOCATED ROW IS
      // WHAT MAKES THIS THE SHARPEST VERSION OF THAT CHECK — `h3-bridge-to-i` authors
      // `pitfalls` in its own file, so its presence in THIS list is the override working,
      // and its absence from the `pitfalls` run below is the other half.
      expect(
        composed.filter(([, key]) => key === "mandate").map(([slide]) => slide),
        id,
      ).toEqual([
        "mandate-enablement",
        "mandate-phases-gates",
        "mandate-levers",
        "h3-bridge-to-i",
      ]);
      // And `pitfalls` is the leader deck's own three, ending on the leader-only bridge:
      // one run, not two, with the relocated row absent from it.
      expect(
        composed.filter(([, key]) => key === "pitfalls").map(([slide]) => slide),
        id,
      ).toEqual(["h1-pitfall-wall", "h2-discipline-wall", "pitfalls-bridge-to-mandate"]);
    }
  });

  test("leave f8 in `techniques` on every standard deck, and compose no leader-only slide there", async () => {
    // The negative half, and it is not implied by the positives: the override is a
    // DECK-SET property, and f8's own file still authors `techniques`. Were the
    // key ever moved in the file instead of in the table, the leader assertions
    // above would all still pass and F.8 would quietly leave section F for
    // 65 slides' worth of standard deck.
    for (const id of STANDARD_IDS) {
      const keys = await sectionKeysFor(id);
      expect(keys.get("f8-your-agentic-os"), id).toBe("techniques");
      // The OTHER direction of the same deck-set property, and the failure mode
      // every leader-only ticket since gh#53 has had to stay clear of: one of these
      // SIXTEEN ids written into `STANDARD_SLIDE_IDS` by accident would insert a run
      // into a deck that has no leader in the room. Thirteen of them would do it in
      // FRONT of the curriculum and renumber all 65 slides behind them; the three
      // `mandate` rows would do it between `pitfalls` and `meta` and renumber only
      // the last eleven — quieter, and therefore the ones most likely to reach a
      // projector.
      //
      // SIXTEEN IDS AND FOUR KEYS, AND THE LEAK IS PER-ID RATHER THAN PER-KEY. That
      // is gh#57's finding and gh#61, gh#58, gh#59, gh#65, gh#66, gh#67, gh#68, gh#69,
      // gh#70 and gh#71
      // inherit it
      // whole:
      // `invest-chicken-egg`, `mandate-phases-gates`, `invest-security`,
      // `invest-subscription`, `shape-middle-out` and `mandate-levers` each append to
      // the END of a run that ALREADY EXISTS in
      // the leader list, `gap-hardest-part` and `invest-base-rates` went in at the HEAD
      // of one, and
      // `gap-no-sop`, `gap-failures-pattern` and `shape-tam-kotter`
      // into the MIDDLE of one — a third and a fourth
      // category, and the leak is identical for all of them. WHAT AN INSERT COSTS THE
      // LEADER DECK AND WHAT IT WOULD COST A STANDARD ONE ARE UNRELATED, which gh#68
      // and gh#70 bracket: gh#68's and gh#69's are the cheapest edits the leader list
      // has taken — no letter, no number — gh#71's moved one number and gh#70's moved
      // four, and leaked
      // into `STANDARD_SLIDE_IDS` any of the four would be exactly as
      // expensive as any of the other twelve. The standard list holds no
      // `gap` row, no `shape` row, no `invest` row and no `mandate`
      // row at all — so on a standard deck any one of them would arrive alone and
      // claim a letter exactly as the four run-openers would.
      //
      // AND `mandate-phases-gates` IS THE ONE WITH A SECOND FAILURE BEHIND THE
      // FIRST. §5.3 keeps #7's programme framing — the competition, the rewards,
      // AI Forge, the post-assessment — out of the middle-management decks and
      // reverses that for the leader decks only, in that slide. Composition is the
      // whole of what scopes the reversal, so this line is also the mechanical form
      // of "the standard decks keep the exclusion". Read off the COMPOSED deck, in
      // the same epoch as the f8 lookup above, so it costs nothing to say.
      expect(
        [
          "gap-hardest-part",
          "gap-no-sop",
          // §6.3 + §6.4 on one stage (gh#67). It replaced `gap-three-failures` and
          // `gap-the-pattern`, and the leak it would cost a standard deck is the same
          // one either of those would have cost: one row, one letter claimed.
          "gap-failures-pattern",
          "gap-capability-ladder",
          "shape-agentic-org",
          "shape-tam-kotter",
          "shape-middle-out",
          "invest-base-rates",
          "invest-showcase-trap",
          "invest-own-proof",
          "invest-chicken-egg",
          "invest-governance",
          "mandate-enablement",
          "mandate-phases-gates",
          "mandate-levers",
        ].filter((slide) => keys.has(slide)),
        id,
      ).toEqual([]);
    }
  });

  // NOT ASSERTED HERE: how long a leader deck is against a standard one. It was
  // eight slides shorter at the gh#41 floor, level after gh#59, a slide LONGER
  // since gh#65, two longer after gh#66, four longer after gh#67, five longer after
  // gh#68, six longer after gh#69, seven longer after gh#70 and EIGHT longer
  // since gh#71 — which is exactly
  // why the number is not
  // restated in this file. That
  // is a
  // count, `deck-registry.test.ts` owns counts, and it already holds both leader
  // decks against their run-length encoding and the standard deck against the
  // same eight cut F slides. Restating it here would load two more module epochs — the
  // expensive part of this file — to re-prove another file's claim.

  test("still take their own brand's A.1 and K.2, by identity", async () => {
    // The brand axis and the deck-set axis are independent (§4.4), and this is
    // the assertion that says so: a leader deck is not "the general deck with a
    // suffix". Object identity, not copy — an alternate aliased to the canonical
    // slide would satisfy any text-level check.
    const berau = await openingFor("berau-leader");
    expect(berau.slides[1]).toBe(berau.a1Slide);

    const gems = await openingFor("gems-leader");
    expect(gems.slides[1]).toBe(gems.a1GemsSlide);
    expect(gems.slides[1]).not.toBe(gems.a1Slide);

    const gemsClosing = await closingFor("gems-leader");
    expect(gemsClosing.slides.slice(-3)).toEqual([
      gemsClosing.k1Slide,
      gemsClosing.k2GemsSlide,
      gemsClosing.k3Slide,
    ]);
  });

  test("a practice-lab brand's deck is exactly K.1 + K.2 longer than general's", async () => {
    const gems = await deckShapeFor("gems-middle-mgmt");
    const general = await deckShapeFor("general");
    expect(gems.length - general.length).toBe(2);
  });
});

// ── E.12 · LOOP ENGINEERING reaches every deck ────────────────────────────────
// §8.2, gh#48: one new slide, all brands, both deck sets, NO CUT ANYWHERE — the
// first slide since gh#41 that had to be written into both lists deliberately, and
// the one thing that could go wrong is exactly that: one list edited, one not.
//
// ASSERTED AS A NEIGHBOUR PAIR, not as an index. E.12 is only correct where it is
// — immediately before the bridge, so the bridge stays the last slide of section E
// — and the two decks put that pair at different indices. `deck-registry.test.ts`
// owns the run's new size (`fundamentals` 12 → 13) and the numbering fixture owns
// the printed E.12 / E.13; this file owns which slide, and where.
const ALL_VARIANTS: VariantId[] = [
  "berau-middle-mgmt",
  "gems-middle-mgmt",
  "general",
  "berau-leader",
  "gems-leader",
];

describe("E.12 · LOOP ENGINEERING", () => {
  test("composes into every deck, immediately before the section-E bridge", async () => {
    for (const id of ALL_VARIANTS) {
      const ids = await deckIdsFor(id);
      const at = ids.indexOf("e12-loop-engineering");
      expect(at, `${id} does not compose e12-loop-engineering`).toBeGreaterThan(-1);
      expect(ids[at - 1], id).toBe("e11-harness-practices");
      expect(ids[at + 1], id).toBe("e13-bridge-to-f");
    }
  });
});

// ── the bridge's beat 2 names the section E hands off to ──────────────────────
// §4.3, gh#41. The standard deck runs F · TECHNIQUES next; the leader deck cuts F,
// so its next section is TOOLS ECOSYSTEM and beat 2 says so. Deck-set-scoped copy,
// resolved by a typed pick in section E's own content module — `sectionOverrides`
// carries composition facts only (§4.1).
//
// TRAP 3 (Appendix B) — this override belongs to the BRIDGE, which gh#47 renamed
// to `e13-bridge-to-f`. E.12 is THE LOOP, and THE LOOP never gets this pick.
//
// Read off the RENDERED slide, in the variant's own epoch: the content module is
// data, and asserting the data against itself would pass even if the slide
// printed the other line.
async function bridgeBeat2For(id: VariantId): Promise<string> {
  useVariant(id);
  cleanup();
  const [{ DeckProvider }, { SlideNumberProvider }, { composedDeck }, bridge] = await Promise.all([
    import("@/deck/DeckContext"),
    import("@/deck/SlideNumberContext"),
    import("@/deck/registry"),
    import("@/slides/foundation-core-section-e/e13-bridge-to-f"),
  ]);
  const row = composedDeck.slides.find((s) => s.def.id === "e13-bridge-to-f");
  if (!row) throw new Error(`the section-E bridge is not in ${id}'s composed deck`);
  const { container } = render(
    <DeckProvider stepCounts={[bridge.e13Slide.steps]}>
      <SlideNumberProvider
        value={{ letter: row.letter, num: row.num, sectionKey: row.sectionKey }}
      >
        <bridge.E13BridgeToF />
      </SlideNumberProvider>
    </DeckProvider>,
  );
  return container.querySelector('[data-testid="e13-beat2"]')?.textContent ?? "";
}

describe("the section-E bridge's beat 2", () => {
  test("names the techniques in every standard deck", async () => {
    for (const id of [
      "berau-middle-mgmt",
      "gems-middle-mgmt",
      "general",
    ] as VariantId[]) {
      expect(await bridgeBeat2For(id), id).toBe("Next: the techniques that matter most.");
    }
  });

  test("names the platforms in both leader decks, where section F is cut", async () => {
    for (const id of LEADER_IDS) {
      expect(await bridgeBeat2For(id), id).toBe(
        "Next: the platforms that bring them to life.",
      );
    }
  });
});

// ── The closer's figure number follows that same flag ────────────────────────

// The closer's number is DERIVED as of §3.5 (gh#35) — `k3-thank-you.tsx` used to
// compute it from `BRANDS[VARIANT.brand].practiceLab`, and now prints whatever
// its position in that brand's composed deck gives it. So this reads the number
// out of the same brand-specific composed deck the app would, and the K.3/K.1
// split below is the composer's own output rather than a restated flag.
//
// FOUR MODULES, ONE EPOCH — including `SlideNumberContext`. A React context is
// an object identity, so importing the provider from outside this epoch would
// hand `K3ThankYou` a different context than its `FigLabel` reads, and the
// render would throw "outside a provider".
async function closerFigLabelFor(id: VariantId): Promise<string> {
  useVariant(id);
  const [{ DeckProvider }, { SlideNumberProvider }, { composedDeck }, { K3ThankYou, k3Slide }] =
    await Promise.all([
      import("@/deck/DeckContext"),
      import("@/deck/SlideNumberContext"),
      import("@/deck/registry"),
      import("@/slides/reveal-and-closing/k3-thank-you"),
    ]);
  const row = composedDeck.slides.find((s) => s.def === k3Slide);
  if (!row) throw new Error(`the closer is not in ${id}'s composed deck`);
  const { container } = render(
    <DeckProvider stepCounts={[k3Slide.steps]}>
      <SlideNumberProvider
        value={{ letter: row.letter, num: row.num, sectionKey: row.sectionKey }}
      >
        <K3ThankYou />
      </SlideNumberProvider>
    </DeckProvider>,
  );
  return container.querySelector(".fig-label")?.textContent ?? "";
}

describe("thank-you closer figure number", () => {
  // TWO INDEPENDENT DERIVATIONS, and the cases below separate them: the brand's
  // `practiceLab` flag decides the NUMBER (a lab run of 3 closes on .3, a run of
  // 1 on .1), and the run's position decides the LETTER.
  test("is .3 where the practice lab runs and .1 where it does not", async () => {
    expect(await closerFigLabelFor("gems-middle-mgmt")).toMatch(/FIG\.\s*K\.3/);
    expect(await closerFigLabelFor("general")).toMatch(/FIG\.\s*K\.1/);
  });

  test("lands on the letter the leader deck's own section count produces", async () => {
    // Same three lab slides — leaders run the same lab — so the NUMBER is .3 here
    // for the standard deck's reason. The LETTER is on its fifth value: gh#41's F
    // cut took the leader deck to ten sections and the closer to J.3, gh#53's
    // `gap` run took it to eleven and back to K.3 (two edits cancelling, which is
    // what this test read at the time), gh#54's `shape` run took it to twelve and
    // to L.3 — a letter no standard deck prints at all, which is when the two deck
    // sets' closers first disagreed — gh#56's `invest` run took it to thirteen and
    // to M.3, and gh#60's `mandate` run takes it to fourteen and to N.3.
    //
    // gh#60 IS THE CLEANEST INSTANCE OF THE PROPERTY, and worth reading as such:
    // the four earlier moves all edited something in front of this run, so a
    // sceptic could argue the closer moved because the deck around it did. This
    // one inserted ONE slide between `pitfalls` and `meta` — nothing in front of
    // the mandate changed at all — and the closer still stepped a letter, because
    // a letter is a function of position (§3.4 R2). This line moving while
    // `k3-thank-you.tsx` stayed shut IS the property under test.
    //
    // ONE leader deck, not both: this asserts the letter a POSITION produces, and
    // the two leader decks share the position. That the other one records N.3 too
    // is in the numbering fixture, which pays no epoch cost to say so.
    expect(await closerFigLabelFor("berau-leader")).toMatch(/FIG\.\s*N\.3/);
  });
});
