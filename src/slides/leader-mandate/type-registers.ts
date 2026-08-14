// What the figures in THE MANDATE print identically — the one type register they all
// share, the colour tiers of the one object two of them draw, and the lead-in they all
// reveal on.
//
// WHY THIS IS A MODULE AND NOT THREE PRIVATE COPIES. `components/EnablementModel.tsx`,
// `components/PhaseLadder.tsx` and `components/LeverBoard.tsx` draw three different
// figures, and almost everything about them is properly local: three tier tables, three
// sans registers at three sizes, three sets of stagger constants. THREE THINGS ARE NOT.
// The slides print the SAME mono LABEL register, reveal after the SAME 120ms of lead-in,
// and — two of the three — print the SAME bordered band one click apart. A re-typed copy
// of any of the three is a copy that can disagree without anybody ever rendering the
// slides in a row.
//
// ═══ ALL THREE SLIDES HAVE NOW STOPPED PRINTING THE BAND — K.1 on 2026-08-14, K.2 and
// K.3 on 2026-08-15 — and all three still take the other two. Each band held one
// organisation's quoted words inside a border, and each was retired for the same reason:
// on a top-management slide the largest object on the stage should be the argument, not
// its footnote. K.1 replaced its with three generic blocks; K.2 kept only the citation
// and prints it as one mono line under the calendars it sources; K.3's cited an outside
// playbook the room has never read, so its provenance is spoken and nothing replaced it
// (`./content.ts`).
//
// SO THE FOUR `bandBorder`/`bandBackground`/`bandEyebrow`/`bandStatement` TOKENS ARE
// GONE, and this is the ticket that had standing to remove them. The previous revision of
// this comment said they had ONE consumer left — K.3 — and that "the next hand to touch
// `./mandate-levers.tsx` should take them into it"; that hand re-cut K.3, which stopped
// printing a band altogether, so there was nothing to take them INTO. A token with no
// consumer is worse than a misplaced one: it is a colour a later figure can adopt without
// anybody deciding it should. All three figures deliberately do NOT spread this object in
// — each names the entries it shares — so none of them can silently re-adopt a colour it
// no longer prints.
//
// THAT IS NOT HYPOTHETICAL, WHICH IS WHY THE FILE EXISTS AT ALL. The band's own
// inner padding was re-typed rather than shared and had already drifted 1px in y,
// under a comment claiming the bands matched "to the pixel";
// K.3's geometry still imports it from `./geometry.ts` for exactly the reason this module
// is here. One rule covers both cases: what two slides print AS ONE OBJECT is declared
// once, and what each prints as its own is declared where it is used.
//
// WHAT DELIBERATELY STAYS LOCAL, so nobody "finishes" this file later:
//
//   · THE SANS REGISTER. K.1 sets its card lines at 15px in a 296px card, K.2 sets its
//     gates at 15px in a 278px card and 12.5px in a recap column, K.3 its lever lines in
//     a half-stage column. Different widths, different sizes; a shared register would
//     have to pick a loser.
//   · EVERY TIER THAT NAMES A PART OF ONE FIGURE — K.1's card frames, lane ramp,
//     connectors and current; K.2's staircase pairs, dashed notes, leaders and chips.
//   · `TIER.line`. Its VALUE is the same on every stage (gh#50's floor for text) and its
//     ROLE is not: K.1's is a DEFINITION under a card's name, K.2's is a GATE, and the
//     two are set in two different sans registers. Sharing it would tie two roles
//     together on the strength of a colour they happen to agree on.
//   · THE STAGGERS. Per figure by design — though K.1 and K.2 have converged on 90ms
//     independently, which is `leader-invest`'s step, and neither reads the other's.
//
// Pure data and one pure function. No React beyond a type, no DOM, no work at
// module scope. Importable from a node test, as `./geometry.ts` is.
import type { CSSProperties } from "react";

/**
 * The tiers MORE THAN ONE of the three figures uses — the parts of the three stages that
 * are one object seen more than once.
 *
 * TWO, AND BOTH ARE UNIVERSAL, which is the state this table is in after all three band
 * retirements. `heading` and `closer` are printed by K.1, K.2 and K.3 alike; nothing here
 * belongs to one slide any more, which is the shape a shared module is supposed to have.
 *
 * CSS VARS ONLY, no hex and no rgba() literals, which is the rule every component states
 * at its head. Each figure NAMES the entries it takes rather than spreading this object,
 * so a reader still finds ONE table per file and no figure can silently re-adopt a colour
 * it no longer prints.
 */
export const SHARED_TIER = {
  /** The mono line under the headline — K.1's four scene eyebrows and three column
   *  heads, K.2's four scene eyebrows, K.3's five, and the copper label tier the sibling
   *  leader slides give the same line. */
  heading: "var(--copper-400)",

  /** The ask. One tier over the definitions and one under the headline, and THE ONE
   *  THING ALL THREE SLIDES NOW AGREE ON TWICE OVER — the tier AND the shelf. All three
   *  print it at 19px upright serif on the 590 shelf over a copper rule; K.3 was the last
   *  to stand anywhere else (20px italic on `./geometry.ts`'s 572) and moved on
   *  2026-08-15. A room reads a colour as rank and a position as sequence, and the deck's
   *  own ask may not change either between consecutive clicks. */
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
