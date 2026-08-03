// Spec §3.3 — the deck's semantic section vocabulary.
//
// A section is a narrative block, identified by a stable semantic key. The
// key says WHAT the block is; the display letter says WHERE it currently sits
// and is derived per deck at compose time (see ./compose.ts). Nothing here
// knows a letter, because the same key takes different letters in different
// deck sets: `process` is D in the standard deck and G in the leader deck.
//
// Pure data. No React, no DOM, no side effects — importable from a node test.

export type SectionKey =
  // shared — present in every deck set
  | "opening" | "landscape" | "mindset" | "process" | "fundamentals"
  | "techniques" | "tools" | "pitfalls" | "meta" | "principles" | "lab"
  // leader-only
  | "gap" | "shape" | "invest" | "mandate";

// Display names. Five of these are ALREADY on screen, inside A.1's agenda
// pointers, and are lifted byte-identical from
// `src/slides/opening-section-a/content.ts`'s `sectionLabel` strings so A.1
// renders the same text once its letters are derived.
// `tests/unit/deck-sections.test.ts` asserts that identity against the real
// content module — do not edit these five by hand.
export const SECTION_NAMES: Record<SectionKey, string> = {
  opening:      "OPENING",                    // not rendered today
  landscape:    "THE LANDSCAPE",              // not rendered today
  mindset:      "MINDSET",                    // not rendered today
  process:      "PROCESS & METHODOLOGY",      // rendered in A.1
  fundamentals: "ENGINEERING FUNDAMENTALS",   // rendered in A.1
  techniques:   "TECHNIQUES",                 // rendered in A.1
  tools:        "TOOLS ECOSYSTEM",            // rendered in A.1
  pitfalls:     "PITFALLS & BEST PRACTICES",  // rendered in A.1
  meta:         "THE META-PROCESS",           // not rendered today
  principles:   "PRINCIPLES",                 // not rendered today
  lab:          "THE PRACTICE LAB",           // not rendered today
  gap:          "THE GAP",                    // leader A.1
  shape:        "THE SHAPE",                  // leader A.1
  invest:       "WHY INVEST",                 // leader A.1
  mandate:      "THE MANDATE",                // leader A.1
};
