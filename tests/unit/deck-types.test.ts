import { describe, expect, test } from "vitest";
import type { SlideDef, SlideSection } from "@/deck/types";
import type { JSX } from "react";

describe("SlideDef", () => {
  test("declares the fields the deck registry consumes", () => {
    const def: SlideDef = {
      id: "d1-the-trap",
      steps: 1,
      animationMode: "static",
      canonicalPose: 0,
      surface: "dark",
      section: "D",
      sectionKey: "process",
      render: () => (null as unknown as JSX.Element),
    };
    expect(def.id).toBe("d1-the-trap");
    expect(def.steps).toBe(1);
    expect(def.animationMode).toBe("static");
    expect(def.canonicalPose).toBe(0);
    expect(def.surface).toBe("dark");
    expect(def.section).toBe("D");
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
      section: "D",
      sectionKey: "process",
      render: () => (null as unknown as JSX.Element),
    } satisfies SlideDef;

    const omitted: SlideDef = base;
    const optedOut: SlideDef = { ...base, id: "title", numbered: false };

    expect(omitted.numbered).toBeUndefined();
    expect(optedOut.numbered).toBe(false);
  });

  test("section is required (type-level assertion)", () => {
    // Type-level: a literal lacking `section` should NOT satisfy SlideDef.
    // Every OTHER required field is present, so the error this asserts can only
    // be the missing `section` — gh#34 added `id` and `sectionKey` BESIDE it and
    // `section` stays required until the phase's last ticket removes it.
    function _typeCheck(): void {
      // @ts-expect-error — `section` is required, so this object literal must error.
      const _missing: SlideDef = {
        id: "d1-the-trap",
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
    // The mirror of the check above: the new field is not optional either, so
    // a slide cannot be added to the deck without saying what block it is in.
    function _typeCheck(): void {
      // @ts-expect-error — `sectionKey` is required, so this object literal must error.
      const _missing: SlideDef = {
        id: "d1-the-trap",
        steps: 1,
        animationMode: "static",
        canonicalPose: 0,
        surface: "dark",
        section: "D",
        render: () => (null as unknown as JSX.Element),
      };
      void _missing;
    }
    void _typeCheck;
    expect(true).toBe(true);
  });

  test("SlideSection enumerates the five known section codes", () => {
    const sections: SlideSection[] = ["D", "E", "I", "J", "K"];
    expect(sections).toHaveLength(5);
    // Round-trip: every value typechecks back into the union.
    sections.forEach((s) => {
      const echoed: SlideSection = s;
      expect(["D", "E", "I", "J", "K"]).toContain(echoed);
    });
  });
});
