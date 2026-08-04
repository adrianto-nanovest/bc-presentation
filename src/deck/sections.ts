// Spec §3.3 — the deck's semantic section vocabulary.
//
// A section is a narrative block, identified by a stable semantic key. The
// key says WHAT the block is; the display letter says WHERE it currently sits
// and is derived per deck at compose time (see ./compose.ts). Nothing here
// knows a letter, because the same key takes different letters in different
// deck sets — and the same key takes different letters in the SAME deck set over
// time. `tools` is the worked example: G in the standard deck, then in the LEADER
// deck F once gh#41 cut `techniques`, G again once gh#53 put a `gap` run in front
// of the curriculum, and H as of gh#54's `shape` run. It reaches I when the rest of
// Phase 6 lands (§4.3). FOUR MOVES SO FAR, no edit to this file for any of them —
// which is the point of it, and the reason the chain is extended rather than
// replaced each time: one entry would read as a coincidence.
//
// Pure data. No React, no DOM, no side effects — importable from a node test.

export type SectionKey =
  // shared — present in every deck set
  | "opening" | "landscape" | "mindset" | "process" | "fundamentals"
  | "techniques" | "tools" | "pitfalls" | "meta" | "principles" | "lab"
  // leader-only
  | "gap" | "shape" | "invest" | "mandate";

// Display names. Five of these are ALREADY on screen, inside A.1's agenda
// pointers, and were lifted byte-identical from the `sectionLabel` strings
// `src/slides/opening-section-a/content.ts` used to hold. As of gh#37 those
// strings are gone and THIS TABLE is what A.1 prints, so editing one of the five
// changes the slide. `tests/unit/a1-agenda-pointers.test.tsx` holds the rendered
// pointers against the literals A.1 shipped, in all three brand decks — do not
// edit these five by hand.
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

// ─── Cross-references ──────────────────────────────────────────────────────

/** One or more keys, and never zero. A pointer at nothing has no name to print
 *  and no stable React key to sit on, so the emptiness is refused by the type
 *  rather than guarded for at every read. */
export type SectionRefKeys = readonly [SectionKey, ...SectionKey[]];

/**
 * WHAT a slide points at — the keys, and optionally the name to print for them.
 *
 * `name` exists for one shape §3.6 asks for and keys alone cannot express: a row
 * that spans a RUN of sections which the deck calls something the sections are
 * not each called. The leader A.1's fourth row spans the whole retained
 * curriculum and is named `THE CURRICULUM`, which is a MOVEMENT name — no
 * section owns it, and inventing a `SectionKey` for it would register a key that
 * owns no slides, forever, to serve one string in one row.
 *
 * SO IT OVERRIDES THE NAME AND NOTHING ELSE. The letters still come from the
 * composed deck, so an overridden row moves with the deck exactly as every other
 * row does — this is not a hatch for writing `"SECTION C · …"` by hand.
 */
export interface SectionRef {
  keys: SectionRefKeys;
  /** Printed instead of `SECTION_NAMES[keys[0]]`. Omit it unless the row's name
   *  really is not the first key's — see above. */
  name?: string;
}

// An en dash, matching the deck's other ranges. NOT a hyphen — the two are
// indistinguishable in a code review and obvious on a projector.
const RANGE_DASH = "–";

/**
 * The label a slide prints when it points at another section —
 * `"SECTION D · PROCESS & METHODOLOGY"`, or `"SECTIONS E–J · …"` for a run.
 *
 * Spec §3.6, and the only formatter for R6's cross-reference: the letters come
 * from the composed deck and the name from the table above, so one authored
 * `tools` pointer reads `SECTION G` in the standard deck and `SECTION H` in the
 * leader deck without being re-authored — see the chain at the top of this file for
 * the two other letters that same pointer has printed. A.1's agenda column is its
 * one caller today, and in a leader deck its `techniques` pointer takes the
 * no-letter path below, because that deck cuts the section (gh#41) and the one slide
 * it keeps out of it is composed under another key.
 *
 * `letterOf` is a parameter rather than a closed-over import for two reasons:
 * this module composes no deck and must not import one, and the formatting can
 * then be exercised against decks that do not exist yet.
 *
 * A key the deck gives NO letter is dropped from the range — it names a section
 * that deck does not run, and `SECTION undefined` on a projector is the failure
 * this prevents. A pointer whose keys all drop prints its name alone.
 */
export function sectionPointerLabel(
  { keys, name: nameOverride }: SectionRef,
  letterOf: (key: SectionKey) => string | undefined,
): string {
  // The name is the FIRST key's, whether or not that key kept a letter: it is
  // what the pointer is about, and the range is only where it currently sits.
  // An authored `name` wins, because a row can be named after something no
  // single section is called (see `SectionRef`).
  const name = nameOverride ?? SECTION_NAMES[keys[0]];
  const letters = keys.map(letterOf).filter((l): l is string => Boolean(l));
  if (letters.length === 0) return name;
  const range =
    letters.length > 1
      ? `SECTIONS ${letters[0]}${RANGE_DASH}${letters[letters.length - 1]}`
      : `SECTION ${letters[0]}`;
  return `${range} · ${name}`;
}
