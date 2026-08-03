import { describe, expect, test } from "vitest";
import { SECTION_NAMES, type SectionKey } from "@/deck/sections";
import { a1Content } from "@/slides/opening-section-a/content";

// Spec §3.3. The section vocabulary is plain data: 15 keys, 11 shared plus 4
// leader-only, each with the display name the deck may render for it.
//
// Five of those names are ALREADY on screen today, inside A.1's agenda
// pointers ("SECTION D · PROCESS & METHODOLOGY"). Phase 3 replaces the
// hardcoded letter with a derived one but must leave the name untouched, so
// this file asserts byte-identity against `content.ts` rather than trusting a
// re-typed table — a re-typed table would encode the same assumption it tests.

const EXPECTED_KEYS: readonly SectionKey[] = [
  // shared
  "opening",
  "landscape",
  "mindset",
  "process",
  "fundamentals",
  "techniques",
  "tools",
  "pitfalls",
  "meta",
  "principles",
  "lab",
  // leader-only
  "gap",
  "shape",
  "invest",
  "mandate",
];

describe("SECTION_NAMES", () => {
  test("covers exactly the 15 section keys", () => {
    // Compared as sets: coverage is the contract, key order is not part of a
    // Record's API and no consumer may depend on it.
    expect(Object.keys(SECTION_NAMES).sort()).toEqual([...EXPECTED_KEYS].sort());
  });

  test("gives every key a non-empty display name", () => {
    EXPECTED_KEYS.forEach((key) => {
      expect(SECTION_NAMES[key]).toBeTruthy();
      expect(SECTION_NAMES[key]).toBe(SECTION_NAMES[key].trim());
    });
  });

  test("names are unique, so a rendered name identifies one section", () => {
    const names = Object.values(SECTION_NAMES);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe("names already rendered in A.1", () => {
  // A.1's five pointers read "SECTION <letter> · <name>". The letter is the
  // part Phase 3 derives; the name after the middot is the part that must not
  // move. Split on the middot separator the component renders verbatim.
  const SEPARATOR = " · ";
  const pointerParts = a1Content.questions.map((q) => q.sectionLabel.split(SEPARATOR));
  const renderedNames = pointerParts.map((parts) => parts[1]);

  test("A.1 still carries five agenda pointers, each a letter + a name", () => {
    expect(pointerParts).toHaveLength(5);
    pointerParts.forEach((parts) => {
      expect(parts).toHaveLength(2);
      expect(parts[0]).toMatch(/^SECTION [A-Z]$/);
    });
  });

  test("are byte-identical to SECTION_NAMES, in agenda order D→E→F→G→H", () => {
    expect(renderedNames).toEqual([
      SECTION_NAMES.process,
      SECTION_NAMES.fundamentals,
      SECTION_NAMES.techniques,
      SECTION_NAMES.tools,
      SECTION_NAMES.pitfalls,
    ]);
  });
});
