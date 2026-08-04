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

  test("gives the leader deck its own 57 slots — the F cut, F.8 kept", () => {
    // Its own LIST, not the standard one: the two were the same constant until
    // gh#41. The cut is eight slides (`f1`–`f7`, `f9`) because
    // `f8-your-agentic-os` survives, relocated.
    const { leader, standard } = DECK_SET_COMPOSITION;
    expect(leader.slides).toHaveLength(57);
    expect(standard.slides.length - leader.slides.length).toBe(8);
    expect(leader.slides).toContain("f8-your-agentic-os");
  });

  test("relocates F.8 with the one override that names the run it lands in", () => {
    // The VALUE is what matters and is easy to get wrong: `f8-your-agentic-os`
    // sits inside the leader deck's `tools` block, so the override must say
    // `tools`. §4.3's `shape` would make it a second, one-slide run in the middle
    // of `tools`, splitting `tools` in two — R4, thrown at module load. Phase 6
    // flips the value and moves the list entry in one edit.
    expect(DECK_SET_COMPOSITION.leader.sectionOverrides).toEqual({
      "f8-your-agentic-os": "tools",
    });
  });

  test("carries no section override on the standard deck, which needs none", () => {
    expect(DECK_SET_COMPOSITION.standard.sectionOverrides).toBeUndefined();
  });
});
