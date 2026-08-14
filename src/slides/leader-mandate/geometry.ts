// THE MANDATE's ledger — the stage facts and the two objects more than one slide in
// this section places against, for a 1280×720 stage.
//
// ═══ IT USED TO BE K.1's OWN GEOMETRY AND IT IS NOT ANY MORE (2026-08-14). This file
// held the enablement model as numbers: two columns of unequal row counts derived from
// one body height so they bottomed out on the same line, a bordered band under both of
// them, three ordinal lane widths, and a one-line character budget for the rows. K.1 was
// re-cut into FOUR EXCLUSIVE SCENES and a thesis (`./mandate-enablement.tsx` records the
// three complaints that forced it), and not one of those numbers survived the change —
// there are no columns, there is no band, and the body height they shared has no reader.
// `./enablement-geometry.ts` is K.1's geometry now, and its header argues the split from
// the other side.
//
// ═══ SO WHY THIS FILE STILL EXISTS, rather than being deleted with the figure it
// described. `./phases-gates-geometry.ts` (K.2) and `./levers-geometry.ts` (K.3) both
// import from here and re-export, so their own figures have ONE geometry import site,
// and both headers argue why that import is worth the coupling.
//
// ═══ AND IT IS NOW FOUR STAGE FACTS AND NOTHING ELSE (2026-08-15). All three slides in
// this section have been re-cut into heroes, a recap and a thesis — K.1 on 2026-08-14, K.2
// and K.3 on 2026-08-15 — and the band and the closer shelf went with them. Everything this
// file held beyond the four constants below described objects no slide draws, so it was
// deleted rather than left; see the note under them for what went and why the argument it
// carried is settled rather than lost.
//
// What is here is therefore exactly what MORE THAN ONE slide in this section reads, and
// nothing else — the stage, the margin, the content width and the NavBar's floor. A number
// only one figure places against belongs in that figure's own geometry module; three of
// those now exist, and this one is by some distance the shortest file in the directory.
//
// Pure data. No React, no DOM, no work at module scope beyond the arithmetic below —
// importable from a node test, which is the property this directory's other three
// geometry modules each gave up for an import and this one still holds.

export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's standard side margin, and `.fig-label`'s own left edge — the reference
 *  every box in this section is measured from. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on a stage in this section gets. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`. Its top edge is the floor for slide
 *  content: a box under it is a box the presenter's own hover target covers. */
export const NAV_ZONE_TOP = STAGE.height - 88;

// ───────────────────── and nothing else ─────────────────────
//
// THE BAND AND THE CLOSER SHELF WERE DELETED FROM THIS FILE ON 2026-08-15, and the deletion
// is worth four lines because the constants were argued for at length and a reader may go
// looking for them. `BAND_PADDING_X`, `BAND_PADDING_Y`, `CLOSER_TOP`, `CLOSER_HEIGHT` and a
// `NAV_ZONE_CLEARANCE` derived from the last two described ONE OBJECT — a bordered citation
// band over a 20px serif italic ask at y=572 — that all three slides in this section used to
// print. None of them prints it now: K.1 retired its band on 2026-08-14, K.2 and K.3 on
// 2026-08-15, and all three asks stand at 590 in 19px UPRIGHT serif over a copper rule at
// 553, derived in each slide's own module from `NAV_ZONE_TOP` and a 16px clearance.
//
// A CONSTANT THAT DESCRIBES NOTHING IS WORSE THAN A MISPLACED ONE: it is a number a later
// figure can adopt without anybody deciding it should, and it carries an argument for a
// shape the deck no longer has. Two readers outside this directory went with it —
// `tests/unit/mandate-enablement.test.tsx` took `CLOSER_TOP` to assert K.1 was NOT on the
// retired shelf, which is a comparison against an orphan once the shelf has no owner, and
// `scripts/gh60-61-verify.mjs`, which had thrown at load since K.1's re-cut and measured a
// band and a closer that three slides had stopped drawing.
//
// WHAT SURVIVES IS THE PROPERTY, NOT THE NUMBER. The argument those constants carried was
// that adjacent slides' asks must not jump between two clicks; the answer turned out not to
// be a shared 572 but a shared shelf with the section BEFORE this one, so the deck's ask now
// does not move between consecutive SECTIONS either. The three modules each derive it, and
// each states that it is `leader-invest`'s. If a later ticket wants that lifted back here,
// the right object is a shared THESIS shelf — not the retired CLOSER one.
