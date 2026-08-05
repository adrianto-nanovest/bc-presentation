// What BOTH figures in THE MANDATE print identically — the one type register they
// share, the colour tiers of the one object they both draw, and the lead-in they
// both reveal on.
//
// WHY THIS IS A MODULE AND NOT TWO PRIVATE COPIES. `components/EnablementModel.tsx`
// and `components/PhaseLadder.tsx` draw two different figures, and almost
// everything about them is properly local: two tier tables, two sans registers at
// two sizes, two sets of stagger constants. THREE THINGS ARE NOT. The two slides
// print the SAME bordered band one click apart, in the SAME mono LABEL register,
// after the SAME 120ms of lead-in — and a re-typed copy of any of the three is a
// copy that can disagree without anybody ever rendering the two slides in a row.
//
// THAT IS NOT HYPOTHETICAL, WHICH IS WHY THE FILE EXISTS AT ALL. The band's own
// inner padding was re-typed rather than shared and had already drifted 1px in y,
// under a comment claiming the two bands matched "to the pixel";
// `./phases-gates-geometry.ts` now imports it from `./geometry.ts` for exactly the
// reason this module is here. One rule covers both cases: what the two slides print
// AS ONE OBJECT is declared once, and what each prints as its own is declared where
// it is used.
//
// WHAT DELIBERATELY STAYS LOCAL, so nobody "finishes" this file later:
//
//   · THE SANS REGISTER. K.1 sets its definitions at 13.5px in a half-stage column
//     and K.2 its gates at 12.5px in a quarter-stage one. Two widths, two sizes; a
//     shared register would have to pick a loser.
//   · EVERY TIER THAT NAMES A PART OF ONE FIGURE — the pillar marks and the lane
//     ramp, the staircase's lit and unlit pairs, the phase chips.
//   · `TIER.line`. Its VALUE is the same on both stages (gh#50's floor for text)
//     and its ROLE is not: K.1's is a DEFINITION under a name, K.2's is a SENTENCE
//     where a roadmap runs out, and the two are set in the two different sans
//     registers above. Sharing it would tie two roles together on the strength of a
//     colour they happen to agree on.
//   · THE STAGGERS. Per figure by design — each component argues its own.
//
// Pure data and one pure function. No React beyond a type, no DOM, no work at
// module scope. Importable from a node test, as `./geometry.ts` is.
import type { CSSProperties } from "react";

/**
 * The tiers BOTH figures use — the parts of the two stages that are one object
 * seen twice.
 *
 * CSS VARS ONLY, no hex and no rgba() literals, which is the rule both components
 * state at their heads. Each spreads this into its own `TIER` and adds the tokens
 * that name its own figure, so a reader still finds ONE table per file while these
 * six have only one place they can be changed.
 */
export const SHARED_TIER = {
  /** The mono line under the headline — two column headings on K.1, two band
   *  headings on K.2, and the copper label tier the sibling leader slides give the
   *  same line. */
  heading: "var(--copper-400)",

  /** THE BAND. A SOLID hairline and a filled ground, because the band holds an
   *  attributed claim somebody actually made — the one bordered object on either
   *  stage, and the only place a border would not be decoration. Not
   *  `--copper-300`: that is the tier `leader-gap` gives a claim THIS DECK defends,
   *  and both of these are quoted rather than defended. A second border style one
   *  slide later would make the room read the two as two kinds of evidence. */
  bandBorder: "1px solid var(--copper-600)",
  bandBackground: "var(--copper-950)",
  bandEyebrow: "var(--copper-400)",
  /** The deck's own compression of somebody else's document — the brightest type
   *  under the headline, because it is the one thing either band is there to say. */
  bandStatement: "var(--neutral-50)",

  /** The ask. One tier over the definitions and one under the headline, on the
   *  fixed shelf both closers stand on (`./geometry.ts`). */
  closer: "var(--neutral-100)",
} as const;

/**
 * The mono LABEL register — anything either room reads as a LABEL rather than as
 * prose.
 *
 * `upper` IS THE DEFAULT because every mono label in this deck is uppercase. The
 * bands' CITATIONS are the one exception on either slide — K.1's `source` and K.2's
 * `provenance` — and take it off, because 160 characters of uppercase mono is a
 * wall nobody in the back row reads. They stay in this register all the same: that
 * is what keeps a citation reading as a citation rather than as a sentence the
 * slide is making a point with.
 *
 * THE SIZE IS THE CALLER'S AND THE FLOOR IS NOT ENFORCED HERE. jsdom computes no
 * font size, so gh#50's floors — 9.5px for a mono label, 10.5px for prose — are
 * checked by a reviewer rather than by a test, which is why each component lists
 * its own sizes in one block above its call sites.
 */
export function mono(size: number, color: string, ls = 0.16, upper = true): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    ...(upper ? { textTransform: "uppercase" as const } : null),
    color,
  };
}

/**
 * How long the first item of a pose waits before it arrives.
 *
 * SHARED BECAUSE THE CLICK IS SHARED. Both slides are step-reveal and adjacent, so
 * a lead-in that differed between them would read as one of the two responding
 * more slowly to the same key. 120ms is what keeps the first item off the same
 * frame as the click; every stagger ON TOP of it is per figure, and each component
 * argues its own.
 */
export const REVEAL_LEAD_MS = 120;
