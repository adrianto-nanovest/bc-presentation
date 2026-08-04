import { describe, expect, test } from "vitest";
import type { SlideDef } from "@/deck/types";
import type { JSX } from "react";

describe("SlideDef", () => {
  test("declares the fields the deck registry consumes", () => {
    const def: SlideDef = {
      id: "d1-the-trap",
      steps: 1,
      animationMode: "static",
      canonicalPose: 0,
      surface: "dark",
      sectionKey: "process",
      render: () => (null as unknown as JSX.Element),
    };
    expect(def.id).toBe("d1-the-trap");
    expect(def.steps).toBe(1);
    expect(def.animationMode).toBe("static");
    expect(def.canonicalPose).toBe(0);
    expect(def.surface).toBe("dark");
    expect(def.sectionKey).toBe("process");
    expect(typeof def.render).toBe("function");
  });

  test("numbered is optional — omitted means numbered, false is the opt-out", () => {
    // gh#34. The composer reads `numbered !== false`, so ABSENT and TRUE mean
    // the same thing and only an explicit `false` withholds a number. Both
    // literals must typecheck for that to be the contract.
    const base = {
      id: "d1-the-trap",
      steps: 1,
      animationMode: "static",
      canonicalPose: 0,
      sectionKey: "process",
      render: () => (null as unknown as JSX.Element),
    } satisfies SlideDef;

    const omitted: SlideDef = base;
    const optedOut: SlideDef = { ...base, id: "title", numbered: false };

    expect(omitted.numbered).toBeUndefined();
    expect(optedOut.numbered).toBe(false);
  });

  test("id is required (type-level assertion)", () => {
    // Type-level: a literal lacking `id` should NOT satisfy SlideDef. Every
    // OTHER required field is present, so the error this asserts can only be
    // the missing `id` — the deck-set lists reference slides by it, so a slide
    // cannot join the deck unnameable.
    function _typeCheck(): void {
      // @ts-expect-error — `id` is required, so this object literal must error.
      const _missing: SlideDef = {
        steps: 1,
        animationMode: "static",
        canonicalPose: 0,
        surface: "dark",
        sectionKey: "process",
        render: () => (null as unknown as JSX.Element),
      };
      void _missing;
    }
    void _typeCheck;
    expect(true).toBe(true);
  });

  test("sectionKey is required (type-level assertion)", () => {
    // The mirror of the check above: the other gh#34 field is not optional
    // either, so a slide cannot be added to the deck without saying what block
    // it is in — and the block is what the composer derives the letter from.
    function _typeCheck(): void {
      // @ts-expect-error — `sectionKey` is required, so this object literal must error.
      const _missing: SlideDef = {
        id: "d1-the-trap",
        steps: 1,
        animationMode: "static",
        canonicalPose: 0,
        surface: "dark",
        render: () => (null as unknown as JSX.Element),
      };
      void _missing;
    }
    void _typeCheck;
    expect(true).toBe(true);
  });

  test("a slide cannot state its own display letter (type-level assertion)", () => {
    // gh#38, and the property Phase 4 rests on. The `section` letter and the
    // A–K union that typed it are DELETED, not deprecated: excess-property checking
    // makes putting one back on a slide literal a compile error, so the leader
    // deck can re-letter its sections (§4.3) knowing no slide disagrees. The
    // letter comes from the composed deck (src/deck/compose.ts) and nowhere else.
    function _typeCheck(): void {
      const _relettered: SlideDef = {
        id: "f8-your-agentic-os",
        steps: 1,
        animationMode: "static",
        canonicalPose: 0,
        sectionKey: "techniques",
        // @ts-expect-error — `section` is not a field of SlideDef any more.
        section: "F",
        render: () => (null as unknown as JSX.Element),
      };
      void _relettered;
    }
    void _typeCheck;
    expect(true).toBe(true);
  });
});
