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

  test("gives the leader deck its own 64 slots — the F cut, F.8 kept, plus its own", () => {
    // Its own LIST, not the standard one: the two were the same constant until
    // gh#41. The cut is eight slides (`f1`–`f7`, `f9`) because
    // `f8-your-agentic-os` survives, relocated.
    const { leader, standard } = DECK_SET_COMPOSITION;
    expect(leader.slides).toHaveLength(64);
    expect(leader.slides).toContain("f8-your-agentic-os");

    // The two lists no longer differ by the cut alone, and gh#53 is why: the
    // leader deck now holds slides no standard deck does — seven of them as of
    // gh#58, in FOUR runs, because gh#57, gh#61 and gh#58 each lengthened a run
    // instead of opening one. Asserted as the two directions SEPARATELY rather
    // than as one net number, so the next leader-only slide cannot mask a cut F
    // slide creeping back in. The net has been eight, seven, six, five, four,
    // three, two and now one; only these two lists say why.
    //
    // THE ORDER OF THE SECOND LIST IS THE LEADER DECK'S OWN, which is why the two
    // `mandate` rows are last and in that order: they are the only leader-only
    // slides that sit BEHIND the curriculum rather than in front of it, and
    // `filter` preserves both facts. A `mandate` row that had drifted up among the
    // other five, either pair swapped, or the three `invest` rows out of §6.7's
    // order, would fail here as an ordering mismatch before it ever reached the
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
      "gap-capability-ladder",
      "shape-agentic-org",
      "invest-own-proof",
      "invest-chicken-egg",
      "invest-security",
      "mandate-enablement",
      "mandate-phases-gates",
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

  test("puts C.1 and C.2 next to each other, in that order", () => {
    // ADJACENCY IS THE COMPOSITION FACT the override serves, and it is separate
    // from the value: `shape` on a row parked elsewhere in the list is still one
    // key forming two runs. Asserted on the LIST, so the failure names the edit
    // that broke it rather than surfacing as an R4 throw two files away.
    const { slides } = DECK_SET_COMPOSITION.leader;
    const c1 = slides.indexOf("shape-agentic-org");
    expect(c1).toBeGreaterThan(-1);
    expect(slides[c1 + 1]).toBe("f8-your-agentic-os");
    // And it comes straight after the `gap` run — §4.3's C follows B.
    expect(slides[c1 - 1]).toBe("gap-capability-ladder");
  });

  test("opens the invest run right behind the shape run, in front of the curriculum", () => {
    // gh#56 opened it, gh#57 gave it a second row and gh#58 a third, and the
    // assertion is the two JOINS rather than an index: the run has to start
    // immediately after the relocated f8 — the last row of `shape` — and end
    // immediately before `b1-evolution-journey`, the first row of the retained
    // curriculum. Anywhere else and the letters land somewhere else, which is the
    // only way this deck renumbers (§3.4 R2).
    //
    // THE WHOLE RUN, IN ORDER, is what says gh#57 AND gh#58 APPENDED rather than
    // inserted: `invest-chicken-egg` behind `invest-own-proof` and
    // `invest-security` behind that, which is §6.7's order and is also why no
    // letter below this run moved either time. The three ids read as a triple, so
    // a row slipped between them or ahead of them fails here by name.
    //
    // NO LETTER AND NO NUMBER IS NAMED HERE. §6.7 numbers these three slides D.2,
    // D.3 and D.4 and they compose as D.1, D.2 and D.3 while `invest-base-rates`
    // (§6.7's D.1) is unbuilt — a §11 PHASE 7 slide with no ticket, not #57 or
    // #58, which are this run's second and third rows. All the composed figures
    // are derived per deck (§3.5), and the numbering fixture is where the composed
    // triple is recorded.
    const { slides } = DECK_SET_COMPOSITION.leader;
    const at = slides.indexOf("invest-own-proof");
    expect(at).toBeGreaterThan(-1);
    expect(slides[at - 1]).toBe("f8-your-agentic-os");
    expect(slides.slice(at, at + 3)).toEqual([
      "invest-own-proof",
      "invest-chicken-egg",
      "invest-security",
    ]);
    expect(slides[at + 3]).toBe("b1-evolution-journey");
  });

  test("runs the mandate between the pitfalls bridge and the meta run", () => {
    // gh#60 opened this run and gh#61 filled its second row. The insert point is
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
    // used to be `mandate-enablement` → `i1-meta-process` is now one row further
    // along. Written as a slice, that growth is one line here and the two joins
    // §3.6 actually constrains — what the run follows and what it hands to — stay
    // asserted whatever its length becomes. Phase 7's K.3 appends to the array
    // below and to nothing else.
    const { slides } = DECK_SET_COMPOSITION.leader;
    const at = slides.indexOf("mandate-enablement");
    expect(at).toBeGreaterThan(-1);
    expect(slides[at - 1]).toBe("h3-bridge-to-i");
    expect(slides.slice(at, at + 2)).toEqual(["mandate-enablement", "mandate-phases-gates"]);
    expect(slides[at + 2]).toBe("i1-meta-process");
    // And they reach the leader list ALONE. The standard deck hands `h3` straight
    // to `i1`, which is the half a leader-only ticket has to keep true: one id
    // written into the wrong constant would insert a section in front of `meta`
    // in a deck with no leader in the room.
    const { slides: std } = DECK_SET_COMPOSITION.standard;
    expect(std).not.toContain("mandate-enablement");
    expect(std).not.toContain("mandate-phases-gates");
    expect(std[std.indexOf("h3-bridge-to-i") + 1]).toBe("i1-meta-process");
  });

  test("carries no section override on the standard deck, which needs none", () => {
    expect(DECK_SET_COMPOSITION.standard.sectionOverrides).toBeUndefined();
  });
});
