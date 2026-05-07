import { describe, expect, test } from "vitest";
import type { SlideDef } from "@/deck/types";
import type { JSX } from "react";

describe("SlideDef", () => {
  test("declares the five fields the deck registry consumes", () => {
    const def: SlideDef = {
      steps: 1,
      animationMode: "static",
      canonicalPose: 0,
      surface: "dark",
      render: () => (null as unknown as JSX.Element),
    };
    expect(def.steps).toBe(1);
    expect(def.animationMode).toBe("static");
    expect(def.canonicalPose).toBe(0);
    expect(def.surface).toBe("dark");
    expect(typeof def.render).toBe("function");
  });
});
