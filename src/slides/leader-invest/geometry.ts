// THE DOSSIER, AS NUMBERS — stage coordinates for D.2 on a 1280×720 stage.
//
// ═══ WHAT THIS FILE MEASURES, AFTER THE 2026-08-14 REWORK. The slide is one SOURCE PLATE on
// the left, a WIRING HARNESS out of its right edge, and one CARD per figure on the right —
// then a citation, a rule and the thesis on the floor of the stage. It used to be four lines
// of type on an empty stage; `./components/ProofLedger.tsx` carries the argument for the
// picture and this file carries every number in it.
//
//   ┌ SOURCE PLATE ─────┐        ┌ CARD 0 ──────────────────────────────────────────┐
//   │ WHOSE PROOF THIS  │    ┌───┤ +90%  · · · · · · · · · · · ·  [VENDOR-REPORTED] │
//   │ ─────────────     │    │   │ Executive decision speed                         │
//   │                   │    │   └──────────────────────────────────────────────────┘
//   │ GEMVIS · GEMS'    ●────┤   ┌ CARD 1 ──────────────────────────────────────────┐
//   │ OWN PLATFORM      │    ├───┤ 2 days → under 1 hour  · · ·   [VENDOR-REPORTED] │
//   │                   │    │   │ Multi-operational retrieval                      │
//   └───────────────────┘    │   └──────────────────────────────────────────────────┘
//    48            284      340  396                                             1232
//
// ═══ WHY THE SLIDE IS DRAWN AS A HARNESS AND NOT AS A TABLE, in one sentence, because every
// coordinate below follows from it: the whole argument of D.2 is PROVENANCE — these numbers
// are not an outsider's, they came from inside this company — and a harness is provenance
// drawn. One plate, one origin, one wire per figure, and every wire ends on a card that
// carries the figure's own epistemic mark at the far end of a leader. Nothing on the stage
// compares two figures with anything, which is the property the old ledger had and the one
// thing a redraw of this slide could most easily lose (see {@link CARD_HEIGHT}).
//
// ═══ THIS FILE STILL EXISTS FOR ITS ORIGINAL REASON: THE COLUMN IS NOT THE SAME HEIGHT IN
// BOTH DECKS. GEMS renders four figures and Berau three (§6.7), so the stack's height, the
// plate that spans it, where the wires leave and where the citation hangs are all functions
// of a count the CONTENT owns. A layout that hardcoded four would leave a card's worth of
// hole under Berau's plate; one that hardcoded three would push GEMS' fourth card into the
// citation. Neither failure is visible in the deck the author happened to be looking at.
//
// ═══ THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line `.slide-headline.small`
// (40px on 1.05) ends the headline row at y=122.
//
//   ─────────────── BAND 1 · THE DOSSIER (full width) ──────────────────────────────────
//   160  the plate and the stack it spans, centred in the band          → 484
//
//   ─────────────── BAND 2 · THE CITATION ──────────────────────────────────────────────
//   512  the source line · 10.5px mono, ONE line, full width            → 528
//
//   ─────────────── BAND 3 · THE THESIS, ANCHORED TO THE FLOOR ─────────────────────────
//   553  copper rule ···· spans the full width                          → 554
//   590  the thesis · 19px serif italic, full width, ONE line           → 616
//   ────────────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 616 · {@link NAV_ZONE_CLEARANCE} = 16
//
// ═══ BAND 1 STARTS AT 160 AND NOT AT 134, WHICH IS HALF OF THE 2026-08-14 FIX. The shipped
// stage hung a mono eyebrow at y=134 — 12px under a 40px display headline — so the room read
// a title, a second title and the first figure inside 60px of each other, and the owner's
// note on it was that the two lines looked like one wrapped one. The eyebrow is not a
// free-standing line any more (it is the source plate's own name) and nothing at all is
// painted between y=122 and y=160, which is the same 38px of air `leader-shape`'s C.4 cut
// for the same complaint.
//
// ═══ BAND 3 IS MEASURED UPWARD FROM THE FLOOR, exactly as D.1's `./base-rates-geometry.ts`
// measures its own, and the two stages now agree to the pixel: {@link NAV_ZONE_CLEARANCE} =
// 16, a 19px thesis in a 26px box, a 36px gap and a 1px rule. THE THESIS USED TO BE 26px AT
// y=556 — the loudest thing on the stage under the headline, and 76px clear of the NavBar
// band while the evidence above it ran out of room. It is 19px on the floor now: ranked
// UNDER the figures it prices and LAST, which is the whole of what a verdict's size has to
// say.
//
// ═══ THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the rule every geometry
// module in this directory keeps: `.nav-zone` is `bottom: 0; height: 88px`, so nothing on
// this stage may cross y=632.
//
// Pure data and pure functions. No React, no DOM, no work at module scope beyond the
// arithmetic below — and no imports at all, so it is importable from bare Node:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-invest/geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// THE SIBLING SLIDES PIN THEIR STAGE FACTS TO THIS FILE. `./base-rates-geometry.ts`,
// `./chicken-egg-geometry.ts`, `./security-geometry.ts` and `./subscription-geometry.ts`
// each keep their own budget and pin {@link STAGE} and {@link SIDE_MARGIN} to this module's
// LITERAL types through a type-only `import()`. Both must stay literal — `as const` on the
// first, an un-annotated numeric literal on the second — or four sibling modules stop
// compiling.

export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's standard side margin, and `.fig-label`'s own left edge — the reference every
 *  box on this slide is measured from. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on this stage gets: 1184. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** The right edge everything on this stage stops at: 1232. */
export const CONTENT_RIGHT = SIDE_MARGIN + CONTENT_WIDTH;

/** `.nav-zone` is `bottom: 0; height: 88px`. Its top edge is the floor for slide content: a
 *  box under it is a box the presenter's own hover target covers. */
export const NAV_ZONE_TOP = STAGE.height - 88;

// ───────────────────── band 3 · the thesis, measured up from the floor ─────────────────────
//
// Declared FIRST because band 1's own bottom edge is derived from it — the stage is cut from
// the floor upward, and a `const` read before its declaration is a temporal-dead-zone throw
// at module load, which for a geometry module means a blank stage at first paint.

/**
 * What is left between the thesis and the NavBar's hover band: 16px — CHOSEN, not left over.
 *
 * The same 16 D.1 keeps, and for the same reason: the thesis is the last thing the room reads
 * and the closest thing to the edge of the stage.
 */
export const NAV_ZONE_CLEARANCE = 16;

/** The thesis' box: 26, cut for ONE line of 19px serif on 1.3 (24.70 line box). NINETEEN AND
 *  NOT THE 26px THIS SLIDE SHIPPED WITH — see the header. */
export const THESIS_HEIGHT = 26;

/** The thesis' shelf: 590. Full width, alone, and as low as the NavBar band allows — DERIVED
 *  BACKWARDS from {@link NAV_ZONE_CLEARANCE}. */
export const THESIS_TOP = NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - THESIS_HEIGHT;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css` — restated, because jsdom
 *  computes no stylesheet and a test that read this box's height off the DOM would read
 *  `NaN`. */
export const RULE_HEIGHT = 1;

/** The air between the rule and the sentence it opens for: 36. Wider than a band gap, because
 *  the rule divides the SLIDE and not two bands of it. Not exported. */
const RULE_TO_THESIS = 36;

/** The copper rule's shelf: 553. Above it is the evidence and where it came from; below it is
 *  the one line this deck asks the room to leave with. */
export const RULE_TOP = THESIS_TOP - RULE_TO_THESIS - RULE_HEIGHT;

// ───────────────────── band 2 · the citation ─────────────────────

/** The source line's box: 16, cut for ONE line of 10.5px mono on 1.4 (14.70 painted). Above
 *  gh#50's 9.5px mono floor.
 *
 *  ONE LINE, WHICH IS A BUDGET AND NOT AN OBSERVATION: both attributions in `./content.ts`
 *  run ≈110 characters, and 10.5px mono at 0.02em tracking sets ≈6.4px per character, so the
 *  line is ≈700px of the 1184 available. A reword past ≈180 characters wraps into a second
 *  line, which a browser check sees and jsdom cannot. */
export const ATTRIBUTION_HEIGHT = 16;

/** The air between the citation and the rule under it: 25. Not exported. */
const ATTRIBUTION_TO_RULE = 25;

/**
 * The citation's shelf: 512 — FULL WIDTH, under the whole dossier rather than under one
 * column of it.
 *
 * IT IS ON THE SLIDE AND NOT IN A FOOTNOTE (§6.7 "cite attributed"), and it is FIXED rather
 * than hung off the row count, which is the one thing that changed about it in the rework.
 * The shipped ledger slid its source line up under Berau's shorter column; the dossier
 * centres its stack instead, so the citation has a shelf of its own and the two decks print
 * it in the same place. What it attributes is the plate above it — the OWNER — and a line
 * that moved 84px between two rooms was attributing a column that no longer exists.
 */
export const ATTRIBUTION_TOP = RULE_TOP - ATTRIBUTION_TO_RULE - ATTRIBUTION_HEIGHT;

// ───────────────────── band 1 · the dossier ─────────────────────

/** The air between the dossier and the citation under it: 28 — a beat change. Not exported. */
const BAND_TO_ATTRIBUTION = 28;

/**
 * Band 1's top edge: 160 — and the 38px of air above it is the point. See the header.
 *
 * NOT 156, which is `.slide-content`'s own top and what D.1 uses. Four more pixels, taken so
 * that the number below divides: the band is 324 tall, which is exactly four cards and three
 * gaps, so GEMS' stack fills it edge to edge with no rounding anywhere.
 */
export const BAND_TOP = 160;

/** Where the dossier ends: 484. Derived from the citation's shelf, so the stage is cut from
 *  the floor upward and band 1 takes what is left. */
export const BAND_BOTTOM = ATTRIBUTION_TOP - BAND_TO_ATTRIBUTION;

/** The height band 1 has to spend: 324. */
export const BAND_HEIGHT = BAND_BOTTOM - BAND_TOP;

// ───────────────────── the cards ─────────────────────

/**
 * One card: 72 tall.
 *
 * CUT FOR TWO LINES AND ONE CHAIN. A card is a 26px mono figure on its own line with a
 * dotted leader running out of it to the epistemic chip, and a 15px sans metric name under
 * both — 34 + 20 of type inside 13 + 5 of padding. Nothing else fits and nothing else
 * belongs: a third line is where somebody would put a comparison.
 *
 * EVERY CARD IS THE SAME HEIGHT AND THE SAME WIDTH, WHICH IS THE FIGURE'S ONE NON-NEGOTIABLE.
 * These are three or four claims of EQUAL standing by one organisation, and a card sized to
 * its own number — or tinted, or ordered by size — would be a ranking nobody authored. The
 * old ledger held the same rule with equal rows; the redraw keeps it with equal boxes.
 */
export const CARD_HEIGHT = 72;

/** The air between two cards: 12. Enough that four boxes read as four claims rather than as
 *  one table, and little enough that the stack reads as one dossier. */
export const CARD_GAP = 12;

/** How far apart two cards sit: 84. Derived, so re-cutting either number above moves the
 *  capacity below with it. */
export const CARD_PITCH = CARD_HEIGHT + CARD_GAP;

/**
 * How many cards band 1 can hold: 4 — DERIVED from the band, so raising the citation lowers
 * the capacity in the same edit.
 *
 * `n` cards occupy `(n - 1) * CARD_PITCH + CARD_HEIGHT`, so the band allows
 * `floor((BAND_HEIGHT - CARD_HEIGHT) / CARD_PITCH) + 1`. It comes out at 4, which is GEMS'
 * count — the band is measured against the TALLER of the two decks — and 324 = 4 × 72 + 3 ×
 * 12 exactly, so GEMS' stack fills band 1 to the pixel and Berau's three are centred in it.
 */
export const ROW_CAPACITY = Math.floor((BAND_HEIGHT - CARD_HEIGHT) / CARD_PITCH) + 1;

/** Every count function in this file shares one guard, so a count one of them accepts is a
 *  count the others place. Not exported. */
function assertCount(fn: string, count: number): void {
  if (!Number.isInteger(count) || count < 1 || count > ROW_CAPACITY) {
    throw new Error(
      `${fn}: ${count} cards — band 1 holds 1…${ROW_CAPACITY} (y=${BAND_TOP}…${BAND_BOTTOM}, ` +
        `${CARD_HEIGHT}px cards on a ${CARD_PITCH}px pitch). A fifth card would end at ` +
        `y=${BAND_TOP + 4 * CARD_PITCH + CARD_HEIGHT}, which is inside the citation's own ` +
        `shelf at y=${ATTRIBUTION_TOP} — the source line printed over by the figures it ` +
        `sources. Cut the copy, not the band.`,
    );
  }
}

/**
 * How tall a stack of `count` cards is: 240 for Berau's three, 324 for GEMS' four.
 *
 * @throws on a count band 1 cannot hold — and on zero, which is not a layout problem but a
 *         content one: a `figures` block with no figures is refused by the type in
 *         `./content.ts`, and this is the second lock.
 */
export function stackHeight(count: number): number {
  assertCount("stackHeight", count);
  return (count - 1) * CARD_PITCH + CARD_HEIGHT;
}

/**
 * Where a stack of `count` cards starts: 160 for four, 202 for three.
 *
 * CENTRED IN THE BAND, WHICH IS THE ANSWER TO THE SHIPPED SLIDE'S WORST FRAME. The ledger
 * grew downward from a fixed top, so Berau's three rows left an empty row's worth of stage
 * under them and the deck looked like it had failed to load its fourth number. A centred
 * stack has no hole in it: the shorter deck simply has more air, split evenly, and the plate
 * beside it is the same height as the stack it spans.
 *
 * `Math.floor` KEEPS EVERY COORDINATE ON A WHOLE PIXEL. `(324 - 240) / 2` is 42 and needs no
 * rounding; a count whose stack is an odd number of pixels shorter than the band would put a
 * card on a half pixel, which on a projector is a soft edge on one side of every box.
 *
 * @throws on a count band 1 cannot hold — see {@link stackHeight}.
 */
export function stackTop(count: number): number {
  return BAND_TOP + Math.floor((BAND_HEIGHT - stackHeight(count)) / 2);
}

/**
 * Card `index`'s top edge, in stage coordinates, in a stack of `count`.
 *
 * ABSOLUTE AND NOT SLOT-RELATIVE: there is no wrapper box on this stage for a card to be
 * measured inside, because the plate, the harness and the cards are three columns of one
 * figure and all three are placed against the stage.
 *
 * @throws on a card the stack does not have.
 */
export function cardTop(index: number, count: number): number {
  assertCount("cardTop", count);
  if (!Number.isInteger(index) || index < 0 || index >= count) {
    throw new Error(
      `cardTop: no card ${index} in a stack of ${count} (0…${count - 1}).`,
    );
  }
  return stackTop(count) + index * CARD_PITCH;
}

/** The cards' left edge: 396 — and the 112px between it and the plate is the harness. */
export const CARD_LEFT = 396;

/** One card's width: 836. The remainder of the stage's width, and the widest single box on
 *  it. */
export const CARD_WIDTH = CONTENT_RIGHT - CARD_LEFT;

/**
 * Every hairline on this stage — the wires, the card borders, the plate's border and its
 * header rule, the chip's border: 1px.
 *
 * Restated here because jsdom computes no stylesheet; the colour is
 * `./components/ProofLedger.tsx`'s tier table, not this module's. It is ALSO a coordinate,
 * which is the reason it is declared before the chain rather than beside the harness — see
 * {@link FIGURE_TOP}.
 */
export const WIRE_WEIGHT = 1;

// ───────────────────── the chain, and the three cells it runs through ─────────────────────
//
// A card is ONE HORIZONTAL LINE with three things on it — the figure, a dotted leader, the
// chip — plus the metric name under them. The line is the slide's argument drawn: the number
// and how it is known are the same statement, so they are wired together and the wire comes
// in from the plate that owns them.

/** Where a card's copy starts, and stops: 22 either side. */
export const CARD_PAD_X = 22;

/**
 * The card-local y the chain runs on: 30.
 *
 * NOT the card's own centre (36). The card carries two lines and only the FIRST is on the
 * chain, so the line sits on the figure's optical centre rather than the box's — which is
 * what makes the wire, the figure, the leader and the chip read as one horizontal statement
 * with a caption under it, instead of as a line drawn through the middle of a paragraph.
 */
export const CHAIN_Y = 30;

/**
 * Where the chain sits for card `index`, in STAGE coordinates: the y every wire, node, leader
 * and chip on that card shares.
 *
 * @throws on a card the stack does not have — {@link cardTop} guards it.
 */
export function chainY(index: number, count: number): number {
  return cardTop(index, count) + CHAIN_Y;
}

/** The chain row: 792 wide and 34 tall, cut for one line of 26px mono on 1.15 (29.90
 *  painted), centred on {@link CHAIN_Y}. It holds the figure, the leader and the chip. */
export const FIGURE_HEIGHT = 34;

/**
 * Where the chain row sits INSIDE the card: 12, and the missing pixel is the point.
 *
 * A CARD IS A BORDERED BOX, SO ITS CHILDREN ARE PLACED FROM ITS PADDING BOX — one border
 * width below its own top edge — while the branch and the node outside it are placed against
 * the STAGE. Cutting the row at `CHAIN_Y - FIGURE_HEIGHT / 2` therefore lands the figure, the
 * leader and the chip ONE PIXEL below the wire that arrives at them, which is invisible in a
 * screenshot, invisible to jsdom, and exactly the kind of drift that makes a drawn chain stop
 * reading as one line. {@link WIRE_WEIGHT} is subtracted here so the row's rendered centre is
 * {@link CHAIN_Y} in stage coordinates; `scripts/d2-figure-verify.mjs` measures all five marks
 * against that one number in a real engine.
 */
export const FIGURE_TOP = CHAIN_Y - FIGURE_HEIGHT / 2 - WIRE_WEIGHT;
export const CHAIN_ROW_WIDTH = CARD_WIDTH - 2 * CARD_PAD_X;

/** The air between the chain's three parts: 16 — figure to leader, leader to chip. */
export const CHAIN_GAP = 16;

/**
 * The chip cell: 160px, and the chip FILLS it rather than hugging its own text.
 *
 * A FIXED FIELD, WHICH IS THE ONE THING THE REDRAW CHANGED ABOUT THE CHIP. It used to be a
 * box the width of its own string, right-aligned to the margin; now every chip on the stage
 * is the same rectangle with its mark centred in it, so every leader ends at one x and the
 * marks form a column with a straight left edge. 160 holds the longer of the two marks —
 * "PARTICIPANT-CLAIMED", 19 characters of 10px mono at 0.14em tracking ≈ 141px — inside its
 * own border without wrapping. A wrapped chip reads as damage rather than as a caveat, so
 * this is measured in a real engine too.
 */
export const MARK_COL_W = 160;

/** The chip's box: 20 tall, centred on {@link CHAIN_Y}. */
export const MARK_HEIGHT = 20;
export const MARK_TOP = CHAIN_Y - MARK_HEIGHT / 2;

/**
 * What a figure may take before the leader stops reading as one: 350px — A BUDGET, AND NOT A
 * BOX, which is the one thing about this row that is not a coordinate.
 *
 * THE FIGURE IS SET TO ITS OWN WIDTH AND THE LEADER TAKES WHAT IS LEFT, exactly as a printed
 * index sets an entry: the dots start where the words stop. A fixed 350px figure cell was
 * tried first and is the worse drawing — Berau's three ranges are ≈180–205px wide, so every
 * leader started 150px after its own number and each card had a hole punched in the middle
 * of it. Ragged leader starts are what a reader expects; a ragged GAP is not.
 *
 * So this number is the width past which the row is over-set rather than a width anything is
 * measured to. The longest figure either brand quotes — "2 days → under 1 hour", 21 characters
 * of 26px mono at ≈0.6em advance ≈ 328px — sits inside it with slack for a fallback face, and
 * `scripts/d2-figure-verify.mjs` measures the rendered runs against it in a real engine.
 * jsdom computes no text, so this cannot be checked in the unit tests.
 */
export const FIGURE_BUDGET_W = 350;

/**
 * What is left for the leader when a figure spends its whole budget: 250px.
 *
 * DERIVED, so re-cutting the chip field or the figure budget re-cuts this in the same edit —
 * and it is the number that says the leader is still a leader. Under 40px a run of dots reads
 * as a typo; at 250 it reads as the join it is.
 */
export const LEADER_MIN_W =
  CHAIN_ROW_WIDTH - FIGURE_BUDGET_W - MARK_COL_W - 2 * CHAIN_GAP;

/** The metric name's box: 20 tall at y=47, cut for one line of 15px sans on 1.3 (19.50
 *  painted), 5px clear of the card's own bottom edge. It gets the card's whole measure, so
 *  the most reworded string on the slide is the one that cannot run out of room. */
export const METRIC_TOP = FIGURE_TOP + FIGURE_HEIGHT;
export const METRIC_HEIGHT = 20;

// ───────────────────── the source plate, and the harness ─────────────────────

/** The plate's left edge: 48 — the stage's own margin, so the dossier starts where the
 *  headline does. */
export const SOURCE_LEFT = SIDE_MARGIN;

/**
 * The plate: 236 wide.
 *
 * WIDE ENOUGH FOR THE OWNER'S NAME AT 13px AND NO WIDER. Both eyebrows are ≈27–38 characters
 * of mono caps at 0.16em tracking, which sets 2–3 lines inside the 200px this width leaves
 * after its padding — a name that wraps is fine, a name that hyphenates is not, and 236 is
 * the width at which neither brand's longest word ("BERAU COAL'S") has to break.
 */
export const SOURCE_WIDTH = 236;

/** Where the plate ends, and where the harness starts: 284. */
export const SOURCE_RIGHT = SOURCE_LEFT + SOURCE_WIDTH;

/** The plate's own padding: 18. */
export const SOURCE_PAD = 18;

/** The plate's caption shelf, and the hairline under it — 16 and 40, plate-local. The caption
 *  is 10px mono caps; the rule separates it from the name the way a file's header separates
 *  from its subject. */
export const SOURCE_CAPTION_TOP = 16;
export const SOURCE_CAPTION_HEIGHT = 14;
export const SOURCE_RULE_TOP = 40;

/**
 * Where the owner's name sits inside the plate, and how tall its box is: 58, and 66 — cut for
 * THREE lines of 13px mono caps on 1.6 (62.40 painted).
 *
 * ONE BOX FOR BOTH BRANDS AND FOR EITHER WRAP. "GEMVIS · GEMS' OWN PLATFORM" sets two lines in
 * the 200px the plate's padding leaves and "VOL-1 WINNERS · BERAU COAL'S OWN TEAMS" sets
 * three; the box is cut for the longer and the copy is CENTRED in it, so the shorter name is
 * not left hanging off the top of a box measured for somebody else's.
 */
export const SOURCE_NAME_TOP = 58;
export const SOURCE_NAME_HEIGHT = 66;

/**
 * The plate: 142 tall — the SAME BOX IN BOTH ROOMS, and it hugs its own content.
 *
 * IT SPANNED THE WHOLE STACK FIRST, AND THAT IS THE VERSION THIS ONE REPLACED. A plate as tall
 * as the cards beside it makes the structural claim better — everything to the right of this
 * belongs to it — and on the stage it is 30–40% ink and 60% empty ground, which does not read
 * as a bracket. It reads as a panel somebody forgot to finish, and the emptier of the two
 * decks (GEMS' four cards make it 324 tall) was the worse one.
 *
 * So the plate is a NODE now: caption, rule, name, and nothing else, centred on the line the
 * harness leaves on. The structural claim did not go anywhere — it is made by the wires, which
 * is what wires are for, and by the fact that every card has one.
 *
 * 142 = 18 of padding + a 14px caption at 16 + the rule at 40 + a 66px name box at 58, and 18
 * under it. {@link SOURCE_BOTTOM_PAD} is the one that is checked rather than stated.
 */
export const SOURCE_HEIGHT = SOURCE_NAME_TOP + SOURCE_NAME_HEIGHT + SOURCE_PAD;

/** What is left under the name inside the plate: 18, the plate's own padding, and equal to
 *  the air above the caption. Exported so the symmetry is a number a test can hold rather
 *  than a claim a comment makes. */
export const SOURCE_BOTTOM_PAD = SOURCE_HEIGHT - SOURCE_NAME_TOP - SOURCE_NAME_HEIGHT;

/**
 * The harness' vertical run: x=340, half way between the plate and the cards.
 *
 * ONE SPINE AND N BRANCHES, WHICH IS AN ORTHOGONAL HARNESS AND NOT A FAN OF CURVES. Curves
 * would need an `<svg>` on a stage that has never mounted one, and they would say something
 * this slide does not mean: a fan reads as flow, and nothing is flowing here — the figures
 * are not produced by the plate, they are ATTRIBUTED to it. Right angles read as wiring, and
 * wiring is what a chain of custody looks like.
 */
export const TRUNK_LENGTH = 56;
export const SPINE_X = SOURCE_RIGHT + TRUNK_LENGTH;
export const BRANCH_LENGTH = CARD_LEFT - SPINE_X;

/** The origin dot, and the node where a branch lands: 10px and 8px. Both are centred on their
 *  own line, so both are placed by subtracting half of themselves. */
export const ORIGIN_DOT_SIZE = 10;
export const NODE_DOT_SIZE = 8;

/**
 * Where the harness leaves the plate: y=316, and it is the SAME NUMBER UNDER BOTH BRANDS.
 *
 * The mean of the chain lines, which for a stack centred in the band is
 * `BAND_TOP + BAND_HEIGHT / 2 - (CARD_HEIGHT / 2 - CHAIN_Y)` — 322 − 6 — for ANY count. So
 * the trunk is horizontal, the spine is centred on it, and the one thing that differs between
 * the two decks is how many branches leave it and how far apart they are.
 *
 * It is 6px above the plate's own centre, which is the price of putting the chain on the
 * figure's optical centre rather than the card's box centre ({@link CHAIN_Y}). Stated rather
 * than hidden: the alternative is a wire that enters every card through the middle of its
 * caption.
 */
export const ORIGIN_Y = BAND_TOP + BAND_HEIGHT / 2 - (CARD_HEIGHT / 2 - CHAIN_Y);

/**
 * The plate's top edge: 245 — centred on {@link ORIGIN_Y}, and therefore the same shelf under
 * both brands even though the stack beside it is not.
 *
 * Declared HERE and not up with the plate's other measures, because it is derived from the
 * harness rather than from the plate: the wire leaves the middle of the box, so the box is
 * placed by where the wire leaves. `const` initialisation order is the reason it cannot be
 * written earlier — {@link ORIGIN_Y} is read at module load and a read before its declaration
 * is a temporal-dead-zone throw, which for a geometry module means a blank stage at first
 * paint.
 */
export const SOURCE_TOP = ORIGIN_Y - SOURCE_HEIGHT / 2;

/**
 * The spine's top edge and height, for a stack of `count` — it spans the first chain line to
 * the last, and no further.
 *
 * A SPINE THAT OVERSHOT ITS OUTERMOST BRANCH would read as a wire going somewhere the stage
 * does not draw, which on a slide about provenance is precisely the wrong suggestion.
 *
 * @throws on a count band 1 cannot hold — {@link chainY} guards it.
 */
export function spineTop(count: number): number {
  return chainY(0, count);
}

export function spineHeight(count: number): number {
  return chainY(count - 1, count) - chainY(0, count);
}

// ───────────────────── the fill that has no figures ─────────────────────

/** Where the `no-organisation` line sits: the band's own top-left, full width. A deck that
 *  names no organisation draws no plate, no harness and no card — see `./content.ts` on why
 *  the absence is the TYPE and not an empty array — so it needs one shelf and not a slot. */
export const NO_PROOF_TOP = BAND_TOP;
