import { describe, expect, test } from "vitest";
import { SECTION_NAMES, type SectionKey } from "@/deck/sections";
import { a1Content } from "@/slides/opening-section-a/content";

// Spec §3.3. The section vocabulary is plain data: 15 keys, 11 shared plus 4
// leader-only, each with the display name the deck may render for it.
//
// Five of those names are ALREADY on screen today, inside A.1's agenda pointers
// ("SECTION D · PROCESS & METHODOLOGY"). What this file pins is which KEYS those
// five rows name — the vocabulary end of the contract. That the pointers still
// PRINT those five strings byte for byte is asserted from rendered output, in
// all three brand decks, by `a1-agenda-pointers.test.tsx`; asserting it from
// authored data here would only re-state the assumption.

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
  // A.1's five pointers read "SECTION <letter> · <name>". Before gh#37 both
  // halves were literals here and this block asserted the name half against
  // them. Now the row names a KEY and the whole pointer is derived, so what is
  // left to pin is which keys those five rows point at — the names themselves
  // are asserted against the strings A.1 actually shipped, from rendered output
  // and in all three brand decks, by `a1-agenda-pointers.test.tsx`.
  const agendaKeys = a1Content.questions.map((q) => q.sectionRef.keys);

  // One assertion, not three: the exact list below already fixes the count, the
  // membership and the non-emptiness — and `SectionRefKeys` makes an empty row
  // a compile error, so a runtime check for it could never fire.
  test("point at process→fundamentals→techniques→tools→pitfalls, in agenda order", () => {
    expect(agendaKeys).toEqual([
      ["process"],
      ["fundamentals"],
      ["techniques"],
      ["tools"],
      ["pitfalls"],
    ]);
  });
});
