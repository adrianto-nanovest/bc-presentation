// Slot resolution — an ordered list of ids becomes an ordered list of defs.
//
// Spec §4.1 (gh#40).
//
// DIVISION OF LABOUR. `deck-registry.test.ts` owns the shape of the COMPOSED
// deck and `variant-composition.test.tsx` owns which slide each brand gets;
// both read real decks. This file owns the RULE — exercised against synthetic
// defs, so the cases that must never occur in a shipped deck (a typo'd id above
// all) can be written down at all — and the deck-set LISTS as authored data,
// which is a statement about the source those two files never see.
//
// No React and no module-registry games: `resolveDeckSetSlides` takes its defs
// as a parameter, so a "slide" here is `{ id, sectionKey }` and nothing more.
import { describe, expect, test } from "vitest";
import { DECK_SET_COMPOSITION, type DeckSet } from "@/deck/deck-sets";
import {
  BRAND_ALTERNATE_IDS,
  PRACTICE_LAB_ONLY_IDS,
  resolveDeckSetSlides,
  type ResolvableSlideDef,
} from "@/deck/slots";

const defs: ResolvableSlideDef[] = [
  { id: "title", sectionKey: "opening" },
  { id: "a1-what-youve-seen", sectionKey: "opening" },
  { id: "a1-gems", sectionKey: "opening" },
  { id: "a1-general", sectionKey: "opening" },
  { id: "f8-your-agentic-os", sectionKey: "techniques" },
  { id: "k1-challenge-handoff", sectionKey: "lab" },
  { id: "k2-practice-lab-overview", sectionKey: "lab" },
  { id: "k2-gems", sectionKey: "lab" },
  { id: "k3-thank-you", sectionKey: "lab" },
];

const byId = (id: string): ResolvableSlideDef => {
  const def = defs.find((d) => d.id === id);
  if (!def) throw new Error(`test setup: no synthetic def "${id}"`);
  return def;
};

/** A deck set over the synthetic defs. `id` is a real `DeckSetId` because the
 *  type demands one; nothing here reads it except the error message. */
function deckSet(slides: string[], overrides?: DeckSet["sectionOverrides"]): DeckSet {
  return { id: "standard", slides, sectionOverrides: overrides };
}

const LAB_SLOTS = ["k1-challenge-handoff", "k2-practice-lab-overview", "k3-thank-you"];

describe("resolveDeckSetSlides", () => {
  test("walks the deck set's order, not the catalogue's", () => {
    const resolved = resolveDeckSetSlides(deckSet(["k3-thank-you", "title"]), {
      defs,
      brand: "berau",
      practiceLab: true,
    });
    expect(resolved.map((s) => s.id)).toEqual(["k3-thank-you", "title"]);
  });

  test("hands a def back by identity when no override touches it", () => {
    // Only the override path clones (see `sectionOverrides` below). Everything
    // else must pass through, because `variant-composition.test.tsx` compares
    // composed slides against the slide modules by identity.
    const [resolved] = resolveDeckSetSlides(deckSet(["title"]), {
      defs,
      brand: "berau",
      practiceLab: true,
    });
    expect(resolved).toBe(byId("title"));
  });

  // ── Axis 2: the brand alternate behind a slot ──────────────────────────────

  describe("brand alternates", () => {
    test("fill their slot for the brand that has one, and only that brand", () => {
      const slot = ["a1-what-youve-seen"];
      const idFor = (brand: "berau" | "gems" | "general"): string =>
        resolveDeckSetSlides(deckSet(slot), { defs, brand, practiceLab: true })[0].id;

      expect(idFor("berau")).toBe("a1-what-youve-seen"); // no alternate: the slot's own id
      expect(idFor("gems")).toBe("a1-gems");
      expect(idFor("general")).toBe("a1-general");
    });

    test("are refused as slots — a list names the canonical id, and only that", () => {
      // ENFORCED, not merely conventional: naming an alternate directly would
      // compose it BESIDE whatever the canonical slot resolves to — two A.1s,
      // each printing a different number, with only the slide count to say so.
      expect(() =>
        resolveDeckSetSlides(deckSet(["title", "a1-gems"]), {
          defs,
          brand: "gems",
          practiceLab: true,
        }),
      ).toThrow(/"a1-gems" is a brand alternate, not a slot.*"a1-what-youve-seen"/s);
    });

    test("hide behind exactly two slots today, and the standard list names both", () => {
      const canonical = Object.keys(BRAND_ALTERNATE_IDS);
      expect(canonical).toEqual(["a1-what-youve-seen", "k2-practice-lab-overview"]);
      for (const slot of canonical) {
        expect(DECK_SET_COMPOSITION.standard.slides, slot).toContain(slot);
      }
    });
  });

  // ── Axis 3: the practice-lab flag ──────────────────────────────────────────

  describe("practice-lab slots", () => {
    test("compose where the brand runs the lab", () => {
      const resolved = resolveDeckSetSlides(deckSet(LAB_SLOTS), {
        defs,
        brand: "gems",
        practiceLab: true,
      });
      expect(resolved.map((s) => s.id)).toEqual([
        "k1-challenge-handoff",
        "k2-gems",
        "k3-thank-you",
      ]);
    });

    test("drop where it does not, leaving the closer alone", () => {
      const resolved = resolveDeckSetSlides(deckSet(LAB_SLOTS), {
        defs,
        brand: "general",
        practiceLab: false,
      });
      expect(resolved.map((s) => s.id)).toEqual(["k3-thank-you"]);
    });

    test("drop on the FLAG, not on the brand — the same brand keeps them when it is set", () => {
      const resolved = resolveDeckSetSlides(deckSet(LAB_SLOTS), {
        defs,
        brand: "general",
        practiceLab: true,
      });
      expect(resolved.map((s) => s.id)).toHaveLength(3);
    });

    test("are declared in one place, which the standard deck lists unconditionally", () => {
      // The failure mode this forbids: a second, per-deck-set list of "what
      // general does not get", free to fall out of step with this one.
      expect([...PRACTICE_LAB_ONLY_IDS]).toEqual([
        "k1-challenge-handoff",
        "k2-practice-lab-overview",
      ]);
      for (const id of PRACTICE_LAB_ONLY_IDS) {
        expect(DECK_SET_COMPOSITION.standard.slides, id).toContain(id);
      }
    });
  });

  // ── Section overrides ──────────────────────────────────────────────────────

  describe("sectionOverrides", () => {
    test("re-key the named slide and leave every other one untouched", () => {
      // Synthetic keys, deliberately: this asserts the MECHANISM, not the live
      // entry. The leader deck's real one is `f8-your-agentic-os` → `tools`
      // (pinned in `DECK_SET_COMPOSITION` below); Phase 6 changes the value to
      // `shape` and this test must not need editing when it does.
      const resolved = resolveDeckSetSlides(
        deckSet(["title", "f8-your-agentic-os"], { "f8-your-agentic-os": "shape" }),
        { defs, brand: "berau", practiceLab: true },
      );
      expect(resolved.map((s) => s.sectionKey)).toEqual(["opening", "shape"]);
      expect(resolved[0]).toBe(byId("title"));
      // The override cannot reach back into the catalogue: the same def resolves
      // unchanged in a deck set that does not override it.
      expect(byId("f8-your-agentic-os").sectionKey).toBe("techniques");
    });

    test("are keyed by the SLOT id, so they hold whichever alternate fills it", () => {
      const resolved = resolveDeckSetSlides(
        deckSet(["k2-practice-lab-overview"], { "k2-practice-lab-overview": "mandate" }),
        { defs, brand: "gems", practiceLab: true },
      );
      expect(resolved.map((s) => [s.id, s.sectionKey])).toEqual([["k2-gems", "mandate"]]);
    });

    test("throw when they name a slot the deck set does not run", () => {
      // An override that applies to nothing is a typo in the key, and staying
      // silent would surface it as an R4 "second run" error three files away —
      // the section it meant to move never moved.
      expect(() =>
        resolveDeckSetSlides(deckSet(["title"], { "f8-your-agentic-os": "shape" }), {
          defs,
          brand: "berau",
          practiceLab: true,
        }),
      ).toThrow(/sectionOverrides names "f8-your-agentic-os"/);
    });
  });

  // ── The failure mode this model introduces ────────────────────────────────

  describe("an id no slot resolves", () => {
    test("throws at compose time, naming the id", () => {
      expect(() =>
        resolveDeckSetSlides(deckSet(["title", "a1-what-youve-scene"]), {
          defs,
          brand: "berau",
          practiceLab: true,
        }),
      ).toThrow(/a1-what-youve-scene/);
    });

    test("throws even though every OTHER id in the list is good", () => {
      // The point of throwing: a typo'd id would otherwise drop one slide from a
      // 64-slide deck, and nothing on screen would say so.
      expect(() =>
        resolveDeckSetSlides(deckSet(["title", "k9-not-a-slide", "k3-thank-you"]), {
          defs,
          brand: "berau",
          practiceLab: true,
        }),
      ).toThrow(/"k9-not-a-slide"/);
    });

    test("names the alternate AND the slot it came from", () => {
      expect(() =>
        resolveDeckSetSlides(deckSet(["a1-what-youve-seen"]), {
          defs: defs.filter((d) => d.id !== "a1-gems"),
          brand: "gems",
          practiceLab: true,
        }),
      ).toThrow(/"a1-gems" \(the gems alternate of "a1-what-youve-seen"\)/);
    });

    test("does not fire for an inherited Object member used as a slot id", () => {
      // `constructor` is a legal file basename, and a bare table lookup would
      // hand back `Object.prototype.constructor` instead of falling through.
      const resolved = resolveDeckSetSlides(deckSet(["constructor"]), {
        defs: [...defs, { id: "constructor", sectionKey: "opening" }],
        brand: "gems",
        practiceLab: true,
      });
      expect(resolved.map((s) => s.id)).toEqual(["constructor"]);
    });
  });
});

// ── The lists themselves ─────────────────────────────────────────────────────

describe("DECK_SET_COMPOSITION", () => {
  test("gives the standard deck the 65 slots it runs today", () => {
    // 65 SLOTS, not 65 files: a practice-lab brand composes all 65 and `general`
    // composes 63. The figure is gh#28's live 64 plus E.12 · LOOP ENGINEERING
    // (gh#48), and it is held by `tests/unit/deck-numbering-fixture.test.tsx`.
    expect(DECK_SET_COMPOSITION.standard.slides).toHaveLength(65);
  });

  test("names each slot once — no deck set composes a slide twice", () => {
    for (const set of Object.values(DECK_SET_COMPOSITION)) {
      expect([...new Set(set.slides)], set.id).toHaveLength(set.slides.length);
    }
  });

  test("keys every row by its own id", () => {
    for (const [id, set] of Object.entries(DECK_SET_COMPOSITION)) {
      expect(set.id).toBe(id);
    }
  });

  test("gives the leader deck its own 72 slots — the F cut, F.8 kept, plus its own", () => {
    // Its own LIST, not the standard one: the two were the same constant until
    // gh#41. The cut is eight slides (`f1`–`f7`, `f9`) because
    // `f8-your-agentic-os` survives, relocated.
    const { leader, standard } = DECK_SET_COMPOSITION;
    expect(leader.slides).toHaveLength(72);
    expect(leader.slides).toContain("f8-your-agentic-os");

    // The two lists no longer differ by the cut alone, and gh#53 is why: the
    // leader deck now holds slides no standard deck does — FIFTEEN of them as of
    // gh#70, in FOUR runs, because gh#57, gh#61, gh#58, gh#59, gh#68 and gh#69 each
    // lengthened
    // a
    // run at its end, gh#65 and gh#70 lengthened one at its head, and gh#66 and gh#67
    // lengthened
    // one in its middle — gh#67 by TWO rows, the only ticket so far to add more than
    // one. Asserted as the two
    // directions SEPARATELY rather
    // than as one net number, so the next leader-only slide cannot mask a cut F
    // slide creeping back in. The net has been eight, seven, six, five, four,
    // three, two, one, zero, minus one, minus two, minus four, minus five, minus six
    // and now
    // MINUS SEVEN — gh#59 made the
    // two decks
    // the same
    // length for the first time and gh#65 made the leader deck the LONGER one, so a
    // net read in one direction would now read as a missing slide.
    //
    // THE ORDER OF THE SECOND LIST IS THE LEADER DECK'S OWN, which is why the three
    // `mandate` rows are last and in that order, and why `gap-hardest-part` is
    // FIRST: they are the only leader-only
    // slides that sit BEHIND the curriculum rather than in front of it, and
    // `filter` preserves both facts. A `mandate` row that had drifted up among the
    // other twelve, any pair swapped, the five `invest` rows out of §6.7's
    // order, the two `shape` rows reversed, or the five `gap` rows out of §4.3's
    // order, would fail here as an
    // ordering mismatch
    // before it ever reached the
    // letter assertions.
    const standardIds = new Set(standard.slides);
    const leaderIds = new Set(leader.slides);
    expect(standard.slides.filter((id) => !leaderIds.has(id))).toEqual([
      "f1-two-pillars",
      "f2-rag-ground-truth",
      "f3-plugins-the-package",
      "f4-skills-write-once",
      "f5-mcp-the-adapter",
      "f6-hooks-unsexy-work",
      "f7-subagents-specialists",
      "f9-bridge-to-g",
    ]);
    expect(leader.slides.filter((id) => !standardIds.has(id))).toEqual([
      "gap-hardest-part",
      "gap-no-sop",
      "gap-three-failures",
      "gap-the-pattern",
      "gap-capability-ladder",
      "shape-agentic-org",
      // gh#68, and NOT adjacent to the row above it in the leader LIST: f8 stands
      // between them there. It is adjacent HERE because this array is the leader list
      // MINUS every id the standard deck also holds, and f8 is exactly such an id —
      // relocated, not leader-only. So the gap in this sequence is the proof the
      // filter is doing its job, and a `shape-middle-out` that had drifted in front
      // of `shape-agentic-org` would fail here as an ordering mismatch.
      "shape-middle-out",
      // gh#70, and adjacent to gh#68's row in BOTH the leader list and this filtered
      // one — nothing stands between them, because `shape` ends and `invest` begins on
      // that join. It is the head of the `invest` run, so the four rows below it are
      // the ones R3 stepped when it landed; their ORDER here is unchanged by that, and
      // that is the point of asserting ids rather than figures.
      "invest-base-rates",
      "invest-own-proof",
      "invest-chicken-egg",
      "invest-security",
      "invest-subscription",
      "mandate-enablement",
      "mandate-phases-gates",
      "mandate-levers",
    ]);
  });

  test("relocates F.8 with the one override that names the run it lands in", () => {
    // The VALUE is what matters and is easy to get wrong: as of gh#54
    // `f8-your-agentic-os` sits at §4.3's C.2, directly behind
    // `shape-agentic-org`, so the override must say `shape`. `tools` — the value
    // it carried while f8 sat inside the retained TOOLS run — would now make
    // `tools` a second run at `g1`, and R4 throws at module load. The row moved
    // and the value flipped in ONE edit, because either half alone throws.
    expect(DECK_SET_COMPOSITION.leader.sectionOverrides).toEqual({
      "f8-your-agentic-os": "shape",
    });
  });

  test("runs the gap between the agenda and the shape run, hardest part first", () => {
    // gh#53 opened this run with its LAST slide, gh#65 put its FIRST one in front of
    // that, gh#66 landed a third BETWEEN them and gh#67 landed the remaining TWO behind
    // gh#66's. Every leader-only
    // ticket before gh#65 either opened a run or appended to the end of one, so between
    // them these four are THREE of the four shapes this list now knows — and gh#70 added
    // the SECOND instance of the third, putting `invest-base-rates` at the HEAD of
    // `invest` (the `invest` case below). FOUR SHAPES IN ALL: OPEN a run (gh#53, gh#54,
    // gh#56, gh#60), APPEND to its end (gh#57, gh#61, gh#58, gh#59, gh#68, gh#69),
    // insert at its HEAD (gh#65, gh#70) and insert MID-RUN (gh#66, gh#67). So the run
    // is
    // asserted AS A WHOLE, in order, exactly as the `invest` and `mandate` cases below
    // are — and here the order is the half that carries the argument. §6.1 opens the
    // gap between tool access and organizational capability; §6.3 and §6.4 pay the
    // credibility debt with Nanovest's own failures and the pattern across them; §6.5
    // puts a ladder in that
    // gap. Any of them reversed composes perfectly well and argues backwards — a
    // measuring instrument handed to a room that has not been shown the gap yet, or a
    // pattern named before the failures it is drawn from — and nothing but this line
    // would notice.
    //
    // THE TWO JOINS ARE WHAT §4.3 CONSTRAINS: the run follows the agenda — it is the
    // first argument a leader deck makes — and it hands to `shape-agentic-org`. A row
    // slipped in front of it would put a leader-only argument ahead of the deck's own
    // agenda; one slipped behind the ladder would split the run and throw at module
    // load (R4).
    //
    // THE LADDER IS STILL LAST, and that is not implied by the slice. That sentence
    // used to end "§11's Phase 7 inserts two more `gap` slides BETWEEN `gap-no-sop`
    // and the ladder, so this run grows in the middle" — SPENT: gh#67 landed both of
    // them, and §4.3 asks for no sixth `gap` slide, so THIS RUN IS COMPLETE at five
    // and stops growing. The `at(-1)` assertion kept saying "the ladder closes the
    // gap" through gh#65's head insert, gh#66's one-row mid-run insert and gh#67's
    // two-row one, and it is now a guard against a row being ADDED to a finished run
    // rather than a hedge against a length nobody knows yet.
    //
    // NO LETTER AND NO NUMBER IS NAMED HERE. `gap` takes the letter its position gives
    // it and the rows inside it are numbered by R3 — gh#65's arrival moved the ladder's
    // own number, gh#66's moved it again and gh#67's moved it to its §6.5 B.5, all
    // derived per deck (§3.5) and recorded in the numbering fixture, not here.
    const { slides } = DECK_SET_COMPOSITION.leader;
    const at = slides.indexOf("gap-hardest-part");
    const handsTo = slides.indexOf("shape-agentic-org");
    expect(at).toBeGreaterThan(-1);
    expect(handsTo).toBeGreaterThan(at);
    // THE RUN IS READ OFF THE LIST, between the row it follows and the row it hands
    // to, so its contents and its LENGTH are both derived — a row slipped behind the
    // ladder lands inside this slice and fails the comparison instead of hiding
    // outside a fixed-width window.
    expect(slides[at - 1]).toBe("a1-what-youve-seen");
    const run = slides.slice(at, handsTo);
    expect(run).toEqual([
      "gap-hardest-part",
      "gap-no-sop",
      "gap-three-failures",
      "gap-the-pattern",
      "gap-capability-ladder",
    ]);
    expect(run.at(-1)).toBe("gap-capability-ladder");

    // And they reach the leader list ALONE — the half every leader-only ticket has to
    // keep true. Either id written into `STANDARD_SLIDE_IDS` by accident would open a
    // section between the agenda and the landscape in a deck with no leader in the
    // room, and renumber every slide behind it.
    const { slides: std } = DECK_SET_COMPOSITION.standard;
    for (const id of run) expect(std, id).not.toContain(id);
    expect(std[std.indexOf("a1-what-youve-seen") + 1]).toBe("b1-evolution-journey");
  });

  test("runs the shape as C.1, the relocated C.2 and gh#68's tail row, in that order", () => {
    // ADJACENCY IS THE COMPOSITION FACT the override serves, and it is separate
    // from the value: `shape` on a row parked elsewhere in the list is still one
    // key forming two runs. Asserted on the LIST, so the failure names the edit
    // that broke it rather than surfacing as an R4 throw two files away.
    //
    // THE THIRD ROW IS gh#68'S AND IT APPENDED, which is why the pair above it is
    // untouched: `shape-middle-out` went on the TAIL of this run, so it opened
    // nothing, split nothing and had no row behind it to renumber. It is asserted as
    // part of the run rather than on its own, for the reason the `gap`, `invest` and
    // `mandate` cases in this file give: a row slipped BETWEEN f8 and it — which is
    // exactly where the unbuilt `shape-tam-kotter` goes — has to fail by name here,
    // not two files away.
    //
    // NO LETTER AND NO NUMBER IS NAMED HERE. `shape` takes the letter its position
    // gives it, and R3 numbers the rows inside it — all derived per deck (§3.5) and
    // recorded in the numbering fixture.
    const { slides } = DECK_SET_COMPOSITION.leader;
    const c1 = slides.indexOf("shape-agentic-org");
    expect(c1).toBeGreaterThan(-1);
    expect(slides.slice(c1, c1 + 3)).toEqual([
      "shape-agentic-org",
      "f8-your-agentic-os",
      "shape-middle-out",
    ]);
    // And it comes straight after the `gap` run — §4.3's C follows B. Still the
    // LADDER on the other side of that join after gh#65, gh#66 and gh#67: those tickets
    // lengthened `gap` at its HEAD and in its MIDDLE, so the run's last row is the one
    // it always was — and, `gap` being complete, the one it stays.
    expect(slides[c1 - 1]).toBe("gap-capability-ladder");
  });

  test("opens the invest run right behind the shape run, base rates first", () => {
    // gh#56 opened it, gh#57 gave it a second row, gh#58 a third, gh#59 a
    // fourth and gh#70 put its FIRST one in front of all four, and the assertion is the
    // two JOINS rather than an index: the run has
    // to start immediately after the LAST ROW OF `shape` and
    // end immediately before `b1-evolution-journey`, the first row of the retained
    // curriculum. Anywhere else and the letters land somewhere else, which is the
    // only way this deck renumbers (§3.4 R2).
    //
    // THAT LAST ROW IS NO LONGER f8, and gh#68 is why — the one line in this test
    // that ticket touched. `shape-middle-out` appended behind f8, so the join moved
    // one row along while every `invest` assertion below it stayed exactly as gh#59
    // left it. The name in this expectation is the whole of what says which slide
    // `shape` now ends on: a tail append is invisible to every other line here. gh#70
    // is the mirror image — it moved the OTHER side of the same join, and touched
    // nothing gh#68 wrote. gh#69, the ticket between them, touched neither side: its
    // row lands seven runs downstream, in `mandate`.
    //
    // THE WHOLE RUN, IN ORDER, is what says gh#57, gh#58 AND gh#59 APPENDED and gh#70
    // did NOT: `invest-chicken-egg` behind `invest-own-proof`,
    // `invest-security` behind that, `invest-subscription` behind that — §6.7's order,
    // and why no letter below this run moved any of the three times — and then
    // `invest-base-rates` at the run's HEAD, which is gh#65's shape rather than any of
    // theirs. The five ids read as one sequence, so a row slipped between
    // them or ahead of them fails here by name.
    //
    // THE ANCHOR IS THE RUN'S HEAD AND IT IS LOOKED UP, NOT COUNTED. This case used to
    // key `at` on `invest-own-proof`, which was the run's first row until gh#70 and is
    // now its second; keying on the row that has to sit against `shape-middle-out` is
    // what makes the join assertion say what it means. A `slice(at, at + 5)` from the
    // OLD anchor would have run one row past the curriculum boundary and failed for the
    // wrong reason.
    //
    // NO LETTER AND NO NUMBER IS NAMED HERE. §6.7 numbers these five slides D.1–D.5 and
    // they compose as D.1–D.5 — which they had not done since gh#56, because
    // `invest-base-rates` (§6.7's D.1) inserted AHEAD of the four built rows and stepped
    // every one of them. The sentence this replaced predicted exactly that and called
    // D.1 "a §11 PHASE 7 slide with no ticket"; #70 is the ticket, and the one slide
    // still owed is C.3 `shape-tam-kotter` on #71 — #69 shipped K.3 the ticket before
    // this one and #68 shipped C.4 the ticket before that. All the
    // composed figures are
    // derived per deck (§3.5), and the numbering fixture is where the composed
    // sequence is recorded.
    //
    // THIS RUN IS COMPLETE at §6.7's five, the THIRD leader-only run to be so — after
    // `gap` (gh#67) and `mandate` (gh#69), not the second — so the slice below is FINAL:
    // a sixth `invest` row is a slide the spec does not ask for, and it fails here
    // rather than as a letter three files away.
    const { slides } = DECK_SET_COMPOSITION.leader;
    const at = slides.indexOf("invest-base-rates");
    expect(at).toBeGreaterThan(-1);
    expect(slides[at - 1]).toBe("shape-middle-out");
    expect(slides.slice(at, at + 5)).toEqual([
      "invest-base-rates",
      "invest-own-proof",
      "invest-chicken-egg",
      "invest-security",
      "invest-subscription",
    ]);
    expect(slides[at + 5]).toBe("b1-evolution-journey");
  });

  test("runs the mandate between the pitfalls bridge and the meta run", () => {
    // gh#60 opened this run, gh#61 filled its second row and gh#69 its third and
    // LAST. The insert point is
    // the WHOLE of what those tickets did to the composition — stated as the two
    // joins it makes, exactly as the `invest` case above is. `mandate` is the one
    // leader-only run §3.6 puts BEHIND the curriculum, so the pair that surrounds
    // it is the only thing distinguishing "the deck grew a fourteenth section
    // between J and L" from "a slide was appended somewhere and happened to
    // compose".
    //
    // BOTH NEIGHBOURS MATTER, and they fail differently. A row that slipped
    // AFTER `i1-meta-process` would split `meta` into two runs and throw at
    // module load (R4) — loud, and caught anywhere. A row that slipped BEFORE
    // `h3-bridge-to-i` would compose cleanly and put the mandate in the middle of
    // PITFALLS, which nothing but this assertion would notice.
    //
    // NO LETTER IS NAMED HERE. `mandate` takes K and pushes `meta`/`principles`/
    // `lab` to L/M/N, and all four are derived per deck (§3.5); the numbering
    // fixture is where they are recorded.
    //
    // THE RUN IS ASSERTED AS A WHOLE, not as one row with two neighbours, and
    // gh#61 is why: it appended a second slide INSIDE the run, so the join that
    // used to be `mandate-enablement` → `i1-meta-process` moved one row along, and
    // gh#69's third row moved it one further. Written as a slice, that growth is one
    // line here and the two joins
    // §3.6 actually constrains — what the run follows and what it hands to — stay
    // asserted whatever its length becomes. gh#69's K.3 proved that: it appended to
    // the array below and to nothing else, and this test's two `slides[…]` joins did
    // not move a character — only the slice's width and its last id.
    //
    // THE RUN IS COMPLETE, so the slice is now FINAL as well as derived. §6.8 asks
    // for three `mandate` slides and all three are here, in §6.8's order, so a fourth
    // id inside this window is a slide the spec does not ask for and fails as an
    // ordering mismatch rather than composing quietly at the tail. That makes this
    // the SECOND leader-only run to be closed, after `gap` (gh#67) — and it stayed the
    // last word for exactly one ticket, because gh#70 closed `invest` at §6.7's five
    // and made it the THIRD. `shape` is the only run whose slice may still widen.
    //
    // K.3 IS ASSERTED AS THE RUN'S LAST ROW SEPARATELY, because the slice alone does
    // not say it: a slice compares ids in order, and "this id is the one the run
    // hands to `meta` from" is the fact §6.8 pins on this slide and the reason gh#69
    // moved no number (R3 renumbers only behind the changed row, and there is nothing
    // behind this one inside the run).
    const { slides } = DECK_SET_COMPOSITION.leader;
    const at = slides.indexOf("mandate-enablement");
    expect(at).toBeGreaterThan(-1);
    expect(slides[at - 1]).toBe("h3-bridge-to-i");
    const run = slides.slice(at, at + 3);
    expect(run).toEqual(["mandate-enablement", "mandate-phases-gates", "mandate-levers"]);
    expect(run.at(-1)).toBe("mandate-levers");
    expect(slides[at + 3]).toBe("i1-meta-process");
    // And they reach the leader list ALONE. The standard deck hands `h3` straight
    // to `i1`, which is the half a leader-only ticket has to keep true: one id
    // written into the wrong constant would insert a section in front of `meta`
    // in a deck with no leader in the room.
    const { slides: std } = DECK_SET_COMPOSITION.standard;
    for (const id of run) expect(std, id).not.toContain(id);
    expect(std[std.indexOf("h3-bridge-to-i") + 1]).toBe("i1-meta-process");
  });

  test("carries no section override on the standard deck, which needs none", () => {
    expect(DECK_SET_COMPOSITION.standard.sectionOverrides).toBeUndefined();
  });
});
