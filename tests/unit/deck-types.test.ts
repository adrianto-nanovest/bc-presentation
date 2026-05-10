import { describe, expect, test } from "vitest";
import type { SlideDef, SlideSection } from "@/deck/types";
import type { JSX } from "react";

describe("SlideDef", () => {
  test("declares the six fields the deck registry consumes", () => {
    const def: SlideDef = {
      steps: 1,
      animationMode: "static",
      canonicalPose: 0,
      surface: "dark",
      section: "D",
      render: () => (null as unknown as JSX.Element),
    };
    expect(def.steps).toBe(1);
    expect(def.animationMode).toBe("static");
    expect(def.canonicalPose).toBe(0);
    expect(def.surface).toBe("dark");
    expect(def.section).toBe("D");
    expect(typeof def.render).toBe("function");
  });

  test("section is required (type-level assertion)", () => {
    // Type-level: a literal lacking `section` should NOT satisfy SlideDef.
    // The `satisfies` line below would fail to compile if `section` were
    // optional or missing; we wrap it in a function so unused-var lints
    // don't fire but the type check still runs at compile time.
    function _typeCheck(): void {
      // @ts-expect-error — `section` is required, so this object literal must error.
      const _missing: SlideDef = {
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
