// THE FOUR LEVERS — stage coordinates for a 1280×720 stage, in five scenes.
//
// ═══ RE-CUT 2026-08-15 (owner's call), AND THE RE-CUT IS THIS FILE. What shipped was ONE
// STAGE HOLDING EVERYTHING: four lever rows down the left, a FOUR-COLUMN SIGN-OFF FORM
// down the right with sixteen boxes in it, a bordered citation band under both, and the ask
// under that. Four complaints retired it, and all four had already been answered on K.1 and
// K.2:
//
//   1. THE FORM NAMED PEOPLE THE ROOM COULD NOT IDENTIFY. Its four column heads were `YOU`,
//      `THE COMMITTEE`, `GROUP HR` and `A BUDGET CYCLE`. Only the first is a person in the
//      room. "The committee" is not any body a BU or Division Head could name, and a figure
//      whose argument is a COUNT of empty boxes fails the moment the room stops to ask
//      whose boxes they are. Sixteen boxes, twelve of them deliberately empty, is also a
//      lot of ink spent proving a negative.
//   2. THE CITATION BAND QUOTED A DOCUMENT THE ROOM HAS NEVER READ. It named an outside
//      Group HR playbook and its four labels, which is provenance for the deck's author and
//      noise for the audience. The provenance is now spoken, not printed — the same call
//      K.1 made about its own band earlier this week.
//
//      NOT K.2's CALL, AND THIS LINE USED TO SAY IT WAS (corrected 2026-08-15). K.2 still
//      PRINTS a citation, on its `phases` pose, and it is right to: it quotes the ROOM's own
//      programme and roadmap, which is evidence the audience can check. What this slide cut
//      was a THIRD PARTY's document the audience has never opened. Same object on the stage,
//      opposite argument — so "K.1 and K.2 each" was a claim about a sibling that had never
//      made it.
//   3. THE STAGE WAS FULL AND NOTHING ON IT WAS BIG. This is a top-management slide. Four
//      rows of 13.5px prose beside a 492px form is a slide that is read, not seen. Four of
//      the six poses are now HEROES with one large animated figure each, and the fifth
//      recaps all four.
//   4. THE SHELVES WERE THIS SLIDE'S OWN AND NOBODY ELSE'S. The headings hung at 134,
//      twelve pixels under a 40px display headline, so the room read the title and the first
//      mono line as one wrapped line; the ask stood at 572 in 20px serif ITALIC while K.1's
//      and K.2's stood at 590 in 19px UPRIGHT over a copper rule. Both are K.1's now.
//
// ═══ WHAT REPLACED THE FORM. The claim has not changed — every one of the four levers is
// inside one person's authority — but it is made by CONVERGENCE rather than by absence: on
// the recap, four curves leave the four levers and arrive at ONE box, and the box says
// `YOU`. Nothing on the stage has to name a committee to say that nobody else signs, which
// is the whole of complaint 1: a figure that draws only what it can name cannot be asked a
// question it has no answer for.
//
// ═══ THE VERTICAL BUDGET IS WORKED FROM THE FLOOR UPWARD, as both siblings' are, and for
// the same reason: the ask is fixed on its own shelf and every scene is measured against
// the rule above it, so a reworded lever cuts the figure and never the ask. The floor guard
// at the foot of this file throws at module load on a scene that crosses it.
//
//   ─── the shelves every pose shares ──────────────────────────────────────────
//   156  the scene eyebrow · 11px mono caps                              → 170
//   196  {@link BODY_TOP} · where a scene may start
//   553  {@link RULE_TOP} · the copper rule, LAST POSE ONLY
//   590  {@link THESIS_TOP} · one line of 19px serif                     → 616
//   ─────────────────────────────────────────────────────────────────────────────
//   floor y=632 · {@link NAV_ZONE_CLEARANCE} = 16
//
//   ─── a hero scene · one lever, centred in the body band ─────────────────────
//   245  the mark · 260 × 260, on the text margin                        → 505
//   300  the act · 34px display serif, two lines                         → 382
//   404  the note · 15px sans, two lines                                 → 449
//
//   ─── the recap · four levers, and the one desk they arrive at ───────────────
//   196  four cards · mark + name over two lines                         → 301
//   309  four connectors, curving in                                     → 416
//   424  the sign box · `YOU`                                            → 476
//   494  the note under it · 11px mono caps                              → 508
//   ─────────────────────────────────────────────────────────────────────────────
//
// Pure data and pure functions. No React, no DOM, and the only work at module scope is the
// arithmetic below plus the floor guard at the foot of the file.
//
// IT IS NOT BARE-NODE IMPORTABLE, AND THAT IS THE PRICE OF THE IMPORT BELOW — stated
// because most geometry modules in this tree claim the property and a reader will expect
// this one to. Bare Node ESM wants a file extension on `./geometry` and
// `allowImportingTsExtensions` is off in `tsconfig.json`, so the specifier cannot carry
// one. `./phases-gates-geometry.ts` pays the identical price for the identical import.
//
// FOUR CONSTANTS ARRIVE FROM `./geometry.ts` AND FOUR NO LONGER EXIST. `BAND_PADDING_X`,
// `BAND_PADDING_Y`, `CLOSER_TOP` and `CLOSER_HEIGHT` had this slide as their last reader,
// and this re-cut dropped all four — there is no band, and the ask stands on the 590 shelf
// its two neighbours already stood on. With no consumer left they were DELETED from
// `./geometry.ts` in the same edit rather than left describing an object no slide draws;
// that file's own note records what went and what the argument they carried resolved into.
import { CONTENT_WIDTH, NAV_ZONE_TOP, SIDE_MARGIN, STAGE } from "./geometry";

// Re-exported so this figure has ONE geometry import site, the call
// `./phases-gates-geometry.ts` makes and for the same reason: the component and the test
// read four shared constants and several dozen local ones, and a file that reached into
// both modules would make "which slide owns this number?" a question a reader answers per
// import rather than per module.
export { CONTENT_WIDTH, NAV_ZONE_TOP, SIDE_MARGIN, STAGE };

// ───────────────────── the shelves every pose shares ─────────────────────

/**
 * Where the headline stops.
 *
 * `.slide-headline-row` is `top: 80px` and `.slide-headline.small` is 40px on 1.05, so the
 * last descender lands at ≈122. NOT A STYLE THIS FILE SETS — it is a measurement of one the
 * stylesheet already made, recorded here because {@link EYEBROW_TOP} is derived from it and
 * the test asserts the clearance rather than trusting the shelf.
 */
export const HEADLINE_BOTTOM = 122;

/**
 * THE EYEBROW SHELF, and the whole of complaint 4 in the header.
 *
 * 156 is `.slide-content`'s own top (`src/styles/globals.css`), so the 34px of air under the
 * headline is the deck's own default rather than a number this slide invented. The shelf it
 * replaced was 134, which left 12px — and 12px under a 40px display line is not air, it is
 * leading, so the room read two lines of one title.
 */
export const EYEBROW_TOP = 156;

/** One line of 11px mono caps at 1.3 (14.30 painted). Every eyebrow on the slide. */
export const LABEL_HEIGHT = 14;
export const LABEL_SIZE = 11;
/** In em. K.1's and K.2's, and the three slides print the same labels one click apart. The
 *  0.20em this slide used to set was its own and nobody else's. */
export const LABEL_TRACKING = 0.16;

/** The air between an eyebrow and the scene it titles. Wider than any gap INSIDE a card, so
 *  the eyebrow reads as a title for the scene rather than as its first row. */
const EYEBROW_TO_BODY = 26;

/** Where a scene may start. Derived, so a re-cut eyebrow moves every scene with it. */
export const BODY_TOP = EYEBROW_TOP + LABEL_HEIGHT + EYEBROW_TO_BODY;

/** What is left under the ask before the NavBar's hover band starts. K.1's number, and
 *  `leader-invest`'s before that. */
export const NAV_ZONE_CLEARANCE = 16;

/** One line of 19px serif at 1.3 (24.7 painted), in a 26px box. */
export const THESIS_HEIGHT = 26;
export const THESIS_TEXT_SIZE = 19;

/**
 * THE ASK'S SHELF, derived UPWARD FROM THE FLOOR, and now K.1's rather than this slide's
 * own.
 *
 * 632 − 16 − 26 = 590, which is `leader-invest`'s thesis register and the shelf K.1 and K.2
 * both stand on. This slide used to close at a shared `CLOSER_TOP` of 572, in 20px serif
 * ITALIC, with no rule over it — so the last three slides of the leader deck ended their
 * arguments in two registers on two shelves. THE ASK CANNOT STAND ON TWO SHELVES: a
 * room watching the deck's own ask jump between consecutive clicks has no way to name what
 * is wrong, and it is the ONE object all three of these slides print identically.
 */
export const THESIS_TOP = NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - THESIS_HEIGHT;

export const RULE_HEIGHT = 1;

/** The air between the copper rule and the ask under it. K.1's, to the pixel. Wider than any
 *  gap inside any scene, because the rule divides the SLIDE rather than two bands of one
 *  figure.
 *
 *  NOT EXPORTED: an input to {@link RULE_TOP} with no outside reader. Both sibling geometry
 *  modules make the same call. */
const RULE_TO_THESIS = 36;

/**
 * The rule over the ask — THE LAST POSE ONLY, and the one geometric mark that separates the
 * deck's closing ask from the five scene lines that stand on the same shelf before it. Rank
 * on this stage is a colour tier; the rule is the exception, and it is spent once.
 */
export const RULE_TOP = THESIS_TOP - RULE_TO_THESIS - RULE_HEIGHT;

/** The floor every scene has to clear. THE RULE'S SHELF AND NOT THE ASK'S — the recap shares
 *  the last pose with the rule, so a recap measured against 590 would collide with the one
 *  object that arrives over it. K.1's and K.2's floor guards make the same call. */
export const SCENE_FLOOR = RULE_TOP;

/** The middle of the band a scene gets. Every hero object is centred on it, so a re-cut mark
 *  or a third line of prose cannot leave the scene sitting high in its own stage. */
const BODY_CENTER = (BODY_TOP + SCENE_FLOOR) / 2;

// ───────────────────── the counts ─────────────────────

type LeversCopy = (typeof import("./content"))["mandateLeversContent"];

/**
 * Four levers, PINNED IN TYPE SPACE rather than typed as a number.
 *
 * The value reads the content module's own tuple length, so a fifth lever is a compile error
 * in the module that TILES the recap rather than a fifth card drawn off the right edge of
 * the stage. `./phases-gates-geometry.ts` pins its phase count the same way.
 *
 * A FIFTH LEVER IS ALSO A FIFTH HERO, which is the cost worth stating here: the slide runs
 * one pose per lever plus a recap plus the ask, so `steps` in `./mandate-levers.tsx` is
 * `LEVER_COUNT + 2` and nothing about that number is authored twice.
 */
export const LEVER_COUNT: LeversCopy["levers"]["length"] = 4;

/** How many poses the slide has: one hero per lever, then the recap, then the ask. */
export const POSE_COUNT = LEVER_COUNT + 2;

/** Which pose the recap is, and which the ask is. The recap is `POSE_COUNT - 2` — the
 *  next-to-last — and the ask lands ON TOP of it without moving it. */
export const RECAP_POSE = POSE_COUNT - 2;
export const THESIS_POSE = POSE_COUNT - 1;

// ───────────────────── a hero scene · one lever ─────────────────────
//
// THE MARK IS ON THE LEFT AND THE WORDS ARE ON THE RIGHT, which is the one composition
// decision on this stage and is worth the line. The eyebrow that names the lever hangs at
// x=48; putting the mark under it on the SAME margin makes the eyebrow read as the mark's
// own caption, and the room's eye then travels left-to-right from a picture to the sentence
// that explains it. Reversed — words left, mark right — the eyebrow would title the words
// and the mark would be an illustration parked in the corner.

/**
 * The mark, at hero size.
 *
 * 260 AND NOT K.1's 88, because K.1 draws four marks on one shelf and this draws ONE. That
 * is the whole licence a hero pose buys: a mark a room reads from the back row without being
 * told to look at it. The recap's is 30 — see {@link RECAP_GLYPH_SIZE} — and the marks are
 * authored once, in a 20-unit viewBox, so neither size is a second drawing.
 */
export const HERO_GLYPH_SIZE = 260;

// ───────────────────── the marks' one drawing, at two sizes ─────────────────────

/** The viewBox every mark is authored in, `./components/LeverGlyphs.tsx`'s and its siblings'. */
export const GLYPH_VIEWBOX = 20;

/**
 * How heavy a mark's line is ON THE STAGE, in stage pixels — and the reason this arithmetic
 * exists at all.
 *
 * K.1's AND K.2's MARKS SET `stroke-width: 1.6` IN THE 20-UNIT BOX AND SIZE IT BY SCALING.
 * That works at their sizes: at 88px the line paints 7px, at 26px it paints 2px. It does NOT
 * work at 260px, where the same declaration paints TWENTY-ONE, and the mark stops being a
 * drawing and becomes four copper bands. A hero mark is not a chip enlarged.
 *
 * SO THE OPTICAL WEIGHT IS THE CONSTANT AND THE UNIT WIDTH IS DERIVED. Both sizes are
 * authored here, in stage pixels, where a reviewer can compare them against each other and
 * against the 1px hairlines beside them; {@link glyphStroke} converts each into the viewBox
 * units the stylesheet needs. A re-cut {@link HERO_GLYPH_SIZE} therefore keeps its line
 * weight instead of silently thickening it.
 */
export const HERO_GLYPH_STROKE = 3;
export const RECAP_GLYPH_STROKE = 1.5;

/**
 * A mark's `stroke-width`, in viewBox units, for a mark drawn `sizePx` wide at `strokePx` of
 * optical weight.
 *
 * @throws on a size of zero or less. The division would hand back `Infinity`, which paints as
 *         a mark that has swallowed its own glyph rather than as an error.
 */
export function glyphStroke(sizePx: number, strokePx: number): number {
  if (!(sizePx > 0)) {
    throw new Error(`glyphStroke: a mark ${sizePx}px wide has no line weight to derive.`);
  }
  return (strokePx * GLYPH_VIEWBOX) / sizePx;
}

/** The mark's left edge — the deck's own text margin. */
export const HERO_GLYPH_LEFT = SIDE_MARGIN;

/** Centred in the body band, so the mark cannot drift when the words above it are re-cut. */
export const HERO_GLYPH_TOP = Math.round(BODY_CENTER - HERO_GLYPH_SIZE / 2);

/** The air between the mark and the words. Wider than any gap inside either, which is what
 *  makes them two objects rather than one captioned picture. */
const HERO_GAP_X = 72;

export const HERO_TEXT_LEFT = HERO_GLYPH_LEFT + HERO_GLYPH_SIZE + HERO_GAP_X;

/** What the words get. The residue — the mark is measured and this is what is left. */
export const HERO_TEXT_WIDTH = SIDE_MARGIN + CONTENT_WIDTH - HERO_TEXT_LEFT;

/**
 * THE ACT — what the leader actually does, and the largest type on the stage after the
 * headline.
 *
 * 34px DISPLAY SERIF AND NOT 15px SANS, which is the difference between this slide and the
 * one it replaces. The old stage set every lever's act in the same 13.5px prose it set
 * everything else in; a hero pose exists precisely so ONE sentence can be the size of its
 * own importance. It is the display face and not the serif because a lever is a TITLE for
 * the act — the serif register on this stage belongs to the deck's argument, which is the
 * ask at the foot of the page.
 */
export const HERO_ACT_SIZE = 34;
export const HERO_ACT_LEADING = 1.2;
const HERO_ACT_ROWS = 2;
export const HERO_ACT_HEIGHT = Math.round(HERO_ACT_SIZE * HERO_ACT_LEADING * HERO_ACT_ROWS);

/** The air between the act and the note under it. */
const HERO_ACT_TO_NOTE = 22;

/** THE NOTE — why the act is the act, in the sans register every explanation in this section
 *  is set in. gh#50's floor for prose is 10.5px and this is 15px, K.1's card register. */
export const HERO_NOTE_SIZE = 15;
export const HERO_NOTE_LEADING = 1.5;
const HERO_NOTE_ROWS = 2;
export const HERO_NOTE_HEIGHT = Math.round(
  HERO_NOTE_SIZE * HERO_NOTE_LEADING * HERO_NOTE_ROWS,
);

/** The note is set NARROWER than the act it explains, so the two read as a statement and a
 *  footnote rather than as one paragraph that changed size halfway down. */
export const HERO_NOTE_WIDTH = 620;

const HERO_TEXT_HEIGHT = HERO_ACT_HEIGHT + HERO_ACT_TO_NOTE + HERO_NOTE_HEIGHT;

/** Centred in the body band on the same centre line as the mark, so the two objects share a
 *  middle rather than a top edge. Derived from both heights, so a third line of either does
 *  not need this number re-typed. */
export const HERO_TEXT_TOP = Math.round(BODY_CENTER - HERO_TEXT_HEIGHT / 2);

export const HERO_NOTE_TOP = HERO_TEXT_TOP + HERO_ACT_HEIGHT + HERO_ACT_TO_NOTE;

/** The lowest ink a hero pose paints. */
export const HERO_FLOOR = Math.max(
  HERO_GLYPH_TOP + HERO_GLYPH_SIZE,
  HERO_NOTE_TOP + HERO_NOTE_HEIGHT,
);

// ───────────────────── the recap · four levers, one desk ─────────────────────

/** The air between two recap cards. */
const RECAP_GUTTER = 24;

/** One recap card. Derived from the count, so a fifth lever re-cuts the row instead of
 *  needing a width re-typed. */
export const RECAP_CARD_WIDTH =
  (CONTENT_WIDTH - (LEVER_COUNT - 1) * RECAP_GUTTER) / LEVER_COUNT;

/** Recap card `index`'s left edge.
 *
 *  @throws on a card the row does not have. A silently clamped card is one lever drawn on
 *          top of another, and it would look deliberate. */
export function recapCardLeft(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= LEVER_COUNT) {
    throw new Error(
      `recapCardLeft: no card ${index} — this row holds ${LEVER_COUNT} (0…${LEVER_COUNT - 1}).`,
    );
  }
  return SIDE_MARGIN + index * (RECAP_CARD_WIDTH + RECAP_GUTTER);
}

/** The middle of recap card `index`, which is where its connector leaves from. */
export function recapCardCenterX(index: number): number {
  return recapCardLeft(index) + RECAP_CARD_WIDTH / 2;
}

export const RECAP_CARD_TOP = BODY_TOP;

export const RECAP_PAD_X = 16;
export const RECAP_PAD_Y = 14;

/** The mark at recap scale, on the card's own first line beside its name — K.2's recap
 *  idiom, and the reason the four marks are drawn once at 20 units and sized by the caller. */
export const RECAP_GLYPH_SIZE = 30;
export const RECAP_GLYPH_GAP = 10;

/** The lever's name, in the mono LABEL register. */
export const RECAP_LABEL_SIZE = 11;

/** The air between the card's head and the hairline under it. */
const RECAP_HEAD_TO_HAIRLINE = 10;

/** THE HAIRLINE — what the lever is CALLED, above; what it IS, below. The same element K.1's
 *  and K.2's cards carry, and it is here for the same second reason: it is one of the two
 *  things `.box-hover`'s overlay cannot reach, so it is declared in this figure's own
 *  stylesheet where `:hover` can win it. */
export const RECAP_HAIRLINE_HEIGHT = 1;
export const RECAP_HAIRLINE_TOP = RECAP_PAD_Y + RECAP_GLYPH_SIZE + RECAP_HEAD_TO_HAIRLINE;

/** The air between the hairline and the line under it. */
const RECAP_HAIRLINE_TO_LINE = 12;

/** What the card actually says, compressed. Two lines at 12.5px — the register K.2's recap
 *  columns use, because both are one sentence in a 278px card. */
export const RECAP_LINE_SIZE = 12.5;
export const RECAP_LINE_LEADING = 1.4;
const RECAP_LINE_ROWS = 2;
export const RECAP_LINE_HEIGHT = Math.round(
  RECAP_LINE_SIZE * RECAP_LINE_LEADING * RECAP_LINE_ROWS,
);

export const RECAP_LINE_TOP =
  RECAP_HAIRLINE_TOP + RECAP_HAIRLINE_HEIGHT + RECAP_HAIRLINE_TO_LINE;

/** Derived from what is inside it, so a reworded card cannot silently overflow its border. */
export const RECAP_CARD_HEIGHT = RECAP_LINE_TOP + RECAP_LINE_HEIGHT + RECAP_PAD_Y;

/**
 * THE SIGN BOX — where all four connectors arrive, and the object that replaced a
 * four-column form.
 *
 * ONE BOX AND NOT FOUR, which is complaint 1 answered in geometry: the retired form drew a
 * column for every authority a lever COULD have waited on and left three of the four empty,
 * so the figure's argument was a count of absences and the room's first question was whose
 * absences they were. A single box that every curve arrives at makes the same claim by
 * arithmetic the room does not have to be told — four out, one in.
 *
 * IT IS CENTRED AND THE CARDS ARE NOT. Every other box on this stage is tiled from the text
 * margin; this one is centred under the middle of the row, because it is what the row
 * CONVERGES ON and a convergence that landed under the first card would read as belonging
 * to that card.
 */
export const SIGN_BOX_WIDTH = 168;
export const SIGN_BOX_HEIGHT = 52;
export const SIGN_BOX_LEFT = SIDE_MARGIN + (CONTENT_WIDTH - SIGN_BOX_WIDTH) / 2;
export const SIGN_BOX_TOP = 424;

/** The one word inside it. Larger than any other mono label on the stage, and the only one
 *  that is: it is the answer, and every other label is a name. */
export const SIGN_LABEL_SIZE = 20;

/** Where the four curves start and stop — clear of both boxes at both ends, so a connector
 *  never touches a border it is not attached to. */
const CONNECTOR_GAP = 8;

export const CONNECTOR_Y0 = RECAP_CARD_TOP + RECAP_CARD_HEIGHT + CONNECTOR_GAP;
export const CONNECTOR_Y1 = SIGN_BOX_TOP - CONNECTOR_GAP;

/**
 * One connector — recap card `index`'s curve into the sign box.
 *
 * A CUBIC WITH VERTICAL TANGENTS AT BOTH ENDS, which is what makes four curves from four
 * different left edges arrive at one point without any of them looking like a corner. The
 * control points sit directly above and below the two endpoints, so every curve leaves its
 * card straight down and enters the box straight down; only the middle bends. K.1's
 * `connectorPath` is the same construction rotated ninety degrees — that one runs between
 * two columns, so its tangents are horizontal.
 *
 * THE BEND IS A FRACTION OF THE DROP AND NOT A CONSTANT, so a sign box moved up or down
 * re-cuts all four curves and none of them has to be re-authored.
 */
const CONNECTOR_BEND = 0.55;

export function connectorPath(index: number): string {
  const x0 = recapCardCenterX(index);
  const x1 = SIGN_BOX_LEFT + SIGN_BOX_WIDTH / 2;
  const bend = (CONNECTOR_Y1 - CONNECTOR_Y0) * CONNECTOR_BEND;
  return (
    `M ${x0} ${CONNECTOR_Y0} ` +
    `C ${x0} ${CONNECTOR_Y0 + bend}, ${x1} ${CONNECTOR_Y1 - bend}, ${x1} ${CONNECTOR_Y1}`
  );
}

/** The mono line under the sign box — the one string on the stage that says out loud what
 *  the convergence says in shape. */
export const SIGN_NOTE_TOP = SIGN_BOX_TOP + SIGN_BOX_HEIGHT + 18;
export const SIGN_NOTE_HEIGHT = LABEL_HEIGHT;

/** The lowest ink the recap paints. */
export const RECAP_FLOOR = SIGN_NOTE_TOP + SIGN_NOTE_HEIGHT;

// ───────────────────── the floor guard ─────────────────────

/**
 * NO SCENE MAY CROSS {@link SCENE_FLOOR}, checked ONCE, AT MODULE LOAD.
 *
 * The two scene shapes are budgeted independently — a hero from a centred mark, the recap
 * from four cards and a box under them — and each is one re-cut away from reaching the
 * shelf the copper rule stands on. A collision there is not a clipped box: it is a rule
 * drawn THROUGH a figure on the one pose that carries the deck's ask, which reads as a
 * rendering fault rather than as a layout mistake.
 *
 * AT LOAD AND NOT IN A TEST, for the reason `./content.ts`'s own guard gives: a test reports
 * the failure at CI one commit later, by which time the offending scene reads as finished
 * work. K.1's geometry module holds the identical guard over its own three scenes.
 *
 * @throws naming the scene, its floor and the shelf it passed.
 */
(() => {
  const scenes: readonly [string, number][] = [
    ["a hero scene", HERO_FLOOR],
    ["the recap", RECAP_FLOOR],
  ];
  for (const [name, floor] of scenes) {
    if (floor > SCENE_FLOOR) {
      throw new Error(
        `levers-geometry: ${name} paints down to y=${floor}, past the ${SCENE_FLOOR} shelf ` +
          `the copper rule stands on. Cut the scene — the ask does not move.`,
      );
    }
  }
})();

// ───────────────────── the copy budgets ─────────────────────
//
// jsdom computes no text, so nothing measures these at render time. Each is a width divided
// by an estimated advance, taken down for slack, and meant to be held over the COPY — where
// an author can act on it — rather than discovered on a projector. Same construction, and
// the same admission, as `ONE_LINE_BUDGET_CHARS` in `./geometry.ts`.

/**
 * How long a lever's act may be before it wraps into a third line.
 *
 * {@link HERO_ACT_HEIGHT} budgets exactly {@link HERO_ACT_ROWS}, and a third line does not
 * overflow a box — it overlaps the note under it, which renders as two sentences printed on
 * top of one another. {@link HERO_TEXT_WIDTH} is 852px over ≈16px per character — 34px
 * display serif at ≈0.47em — giving ≈53 per line and ≈106 over two, taken down to 100.
 */
export const HERO_ACT_BUDGET_CHARS = 100;

/** How long the note under it may be. 620px over ≈7.5px per character — 15px sans at
 *  ≈0.50em, widened for a system fallback, which is the rate `./geometry.ts` measured for
 *  the identical register — giving ≈82 per line and ≈164 over two, taken down to 150. */
export const HERO_NOTE_BUDGET_CHARS = 150;

/**
 * How long a recap card's line may be.
 *
 * THE BINDING BUDGET ON THIS STAGE, because it is the only box that is narrow. The card's
 * inner width is 246px over ≈6.3px per character — 12.5px sans at ≈0.50em — giving ≈39 per
 * line and ≈78 over two, taken down to 74. A card that wraps to a third line does not
 * overflow its border; it prints under it, over a connector.
 */
export const RECAP_LINE_BUDGET_CHARS = 74;

/** How long a bottom line may be — the four scene lines and the ask, which stand on one
 *  shelf in one register and are held to one budget for that reason. 1184px over ≈8.9px per
 *  character — 19px serif at ≈0.47em — giving ≈133, taken down to 128. */
export const THESIS_BUDGET_CHARS = 128;
