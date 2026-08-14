// Section THE MANDATE — every string its slides print, and the one axis one of
// them varies on.
//
// Spec §6.8 (content) · §6.5 (the ladder K.2 maps onto) · §4.4 slot 6 (K.2's
// brand axis) · §11 Phases 6 and 7 · §4.3's leader deck table. Named by SECTION KEY and
// not by letter: `mandate` is K in §4.3's finished leader deck and K in the deck
// these tickets compose, and it is STILL not written down anywhere here. The
// letter is derived per deck (§3.4 R2, §3.5) and no file under
// `src/slides/leader-mandate/` may hold one — `src/slides/leader-gap/index.ts`
// named this directory on that rule before it existed.
//
// ─────────────────────────────────────────────────────────────────────────────
// THE ONE THING TO READ BEFORE EDITING ANYTHING BELOW: THE THREE SLIDES IN THIS
// FILE DISAGREE ABOUT WHETHER THIS SECTION HAS A BRAND AXIS — TWO EXPORT NO
// BRAND PICK AND ONE DOES — AND THE DISAGREEMENT IS THE ARGUMENT, NOT AN
// INCONSISTENCY. THE TWO THAT AGREE DO NOT EVEN AGREE FOR THE SAME REASON.
//
// K.1 (`mandate-enablement`) EXPORTS NO BRAND PICK, AND SINCE 2026-08-14 IT PRINTS
// NO ORGANISATION'S NAME EITHER — WHICH IS A STRONGER PROPERTY THAN THE ONE IT
// SHIPPED WITH AND IS WORTH READING THE HISTORY OF. §6.8's model was "GENERIC
// PILLARS AND TRACKS, ONE SPECIFIC BOTTLENECK", and the slide drew that sentence:
// two columns of generic structure over a bordered band holding ONE organisation's
// quoted brief — DigiTech's (`docs/prompts/gems-catalyst.md`) — printed in BOTH
// leader decks, including the one the brief did not come from. There was no
// `Record<Brand, …>` for it because there was nothing to put in the other two slots:
// we hold no equivalent statement for the other brand, and inventing one is the
// speculation §6.8 exists to prevent, made to type-check.
//
// THE OWNER'S CALL REPLACED THE BAND RATHER THAN THE AXIS. The band was honest about
// its provenance and it was still the wrong object on a Berau stage: a leader read a
// diagnosis of somebody else and had to be told, in the closer, that naming their own
// was their job. What stands there now is THREE GENERIC BLOCKS ({@link BLOCKS}) —
// tools, literacy, resistance — which the owner reports meeting in BOTH rooms, under
// generic and naming nobody. So K.1 still exports no brand pick,
// and now for the reason K.3 has rather than the reason it used to have: every string
// on it is generic, at every pose, in either deck. `tests/unit/mandate-enablement.test.tsx`
// holds that as a RULE and not a spot check — NO rendered string on K.1 may name an
// organisation, and every string on every pose is checked against the brand
// vocabulary.
//
// K.2 (`mandate-phases-gates`) EXPORTS ONE, AND HAD TO. §4.4 lists it as slot 6
// for a reason K.1's argument does not reach: this slide's subject is WHEN each
// phase ends, and both organisations have published a real programme calendar
// with real gates on it. GEMS' ends at a W1 Nov post-assessment and hands over to
// AI Forge in January; Berau's is complete and its next stage begins after
// August. Those are not two fillings of one generic slot — they are two
// organisations' own roadmaps, each quoted from the document that states it. The
// axis exists here because the EVIDENCE exists here, which is exactly the test
// K.1 failed and this slide passes; neither answer is the house style.
//
// K.3 (`mandate-levers`) EXPORTS NONE EITHER, AND SINCE K.1's RE-CUT THE TWO NOW
// AGREE FOR ONE REASON RATHER THAN TWO — which is why the paragraph above records
// what K.1's reason USED to be. K.1's stage is generic at every pose; K.3's is
// generic because its subject is THE PERSON IN THE ROOM, and
// that person is the same person in both rooms: a BU or Division Head with a
// calendar, a headcount and a budget line they already hold. Every one of the
// four levers is an act inside that authority — it names no system, no
// department, no vendor and no date — so there is nothing an organisation could
// supply that would change one of them. A `Record<Brand, …>` here would be three
// byte-identical blocks, and three byte-identical blocks are what a deck looks
// like on the day somebody edits one of them and it starts asking two rooms for
// different things without anybody deciding to. §6.8 gives this slide no brand
// callback and §4.4 lists no slot for it; the section's variance is spent on K.2,
// where two organisations have two real calendars.
//
// WHAT DOES NOT VARY, ON ANY OF THE THREE: the structure. K.1's pillars and
// tracks are generic, K.2's phases, gates and rungs are generic, and K.3's four
// levers are generic — the brand supplies only K.2's calendar, citation and ask.
// So the brand axis below is deliberately NARROW: it carries no pillar, no track,
// no phase name, no gate, no rung and no lever, and
// {@link PhasesGatesBrandBlock} is the whole of what an organisation may change
// anywhere in this section.
// ─────────────────────────────────────────────────────────────────────────────
//
// Markup convention, as everywhere else in the deck: data carries plain strings
// plus a sibling `*Kw` array of substrings to highlight at render time. No inline
// `<em>` in data.
//
// THE KEYWORD RULE. `kw` goes on PROSE ONLY, on all three slides. K.1's prose is
// the headline, the three block lines, the four pillar lines, the three track lines, the
// three scene mini-theses and the closer; K.2's is the headline, the four gate lines, the
// beyond-the-roadmap line, its three scene mini-theses and the closer; K.3's is the
// headline, the four lever lines, the band's statement and the closer.
// Everything else is the mono LABEL register: fig labels, K.1's four eyebrows and
// three column heads, K.2's four eyebrows, its two ladder notes and its plan tag,
// BLOCK LABELS, pillar and track names, PHASE LABELS AND STATES,
// rung names, calendar rows, LEVER LABELS, AUTHORITY LABELS, K.3's band
// eyebrow and both CITATIONS. A copper italic inside a mono
// label reads as a rendering fault, and inside a citation it reads as the deck
// emphasising a fragment of somebody else's sentence — so the source lines are the
// sharpest case of the rule and the tests hold the registers apart as lists.
//
// K.2'S TWO LADDER NOTES ARE THE ONE PLACE THE RULE LOOKS WRONG AND IS NOT. Each is a
// mono label over a full SANS SENTENCE, which everywhere else in this file earns a
// `*Kw`; these carry none, because a note in the margin of a staircase that highlighted
// a fragment of itself would rank against the figure it exists to annotate. Prose MAY
// carry keywords; it is not obliged to, and `leader-gap`'s five rung `sub` lines make
// the identical call for the identical reason.

//
// THE LEVER / PILLAR BOUNDARY, NOW STATED FROM BOTH SIDES. Until Phase 7 this
// block reserved K.3 and warned the pillars off its territory in one direction
// only: "a pillar says what has to exist, a lever says what the leader does on
// Monday — if a pillar line ever starts with 'You', it has become a lever and
// belongs two slides later." K.3 is in this file now, so the rule has a second
// half and both halves are enforceable against real copy rather than against a
// plan:
//
//   · A PILLAR NAMES A STRUCTURE AND NEVER AN ACT. K.1's `access` and `support`
//     pillars name two of the same subjects K.3's first and third levers act on,
//     and they must keep naming structures. "Named champions, and people can still
//     ask them after the workshop ends" is a thing that has to exist; "Name your
//     champions, give them hours every week, and put the job into their targets"
//     is a thing a leader does. The
//     first is authored under {@link Pillar.line} and the second under
//     {@link Lever.line}, and the file boundary between them is one screen, which
//     is exactly why the rule is written down.
//   · AND NO K.1 STRING NAMES A DAY OF THE WEEK, OR USES A FIGURE OF SPEECH. The
//     `support` pillar's line held "on the Tuesday after the room empties" until
//     2026-08-14 and "after the room empties" until 2026-08-15. The first was a
//     schedule this deck does not commit to; the second was an idiom, and the
//     owner's objection to it is the objection this whole pass is made of — a room
//     reading English as a second language should never have to decode. K.3's
//     lever vocabulary is where a named cadence would be legitimate, and it does not
//     use one either.
//   · A LEVER NAMES AN ACT AND NEVER A STRUCTURE, WHICH IS THE HALF THAT IS NEW.
//     A lever line that stopped at what the programme is made of would be K.1's
//     pillar restated two slides later, and the room would have paid a click for
//     it. Every one of the four is therefore an IMPERATIVE — the second person
//     with the "you" left implicit — and {@link LEVERS} says so on the field.
//   · K.2's BERAU CLOSER IS THE ONE DELIBERATE EXCEPTION on the pillar side and
//     says so where it is written. It is an imperative on a slide of structures,
//     and it earns it by being a fact with an expiry date rather than a standing
//     practice.
//   · K.1 STILL NAMES NO GATE, NO PHASE AND NO DATE, and K.3 names none either.
//     The pillars stop at what the programme is made of, the levers stop at what
//     the leader authorizes, and everything about when the programme is judged is
//     under K.2's heading between them.
//
// WHAT IS STILL DELIBERATELY NOT IN THIS FILE, now that the run is complete at
// §6.8's three slides: NOTHING. There is no fourth block, no placeholder and no
// half-authored draft below — the section is finished, and the next slide to join
// it would be a spec change first. Dead copy that reads as finished is how
// unreviewed copy ships, which is the reasoning `GENERAL_BLOCK` in
// `src/slides/leader-gap/content.ts` and the top of
// `src/slides/leader-invest/content.ts` both record; the one dead block in this
// file is K.2's `general`, which is dead for a different reason (an unregistered
// variant) and is kept to the thinnest honest thing for exactly that reason.
//
// THIS FILE IS NO LONGER NODE-IMPORTABLE, and that is a price K.2 pays on
// purpose. It held "no imports at all, not even a type" while K.1 was alone here;
// K.2 needs `Brand` for its pick (type-only, stripped) and — the line that
// actually costs something — the Capability Ladder's own rungs as a RUNTIME
// value, through the `@/` bundler alias that bare Node does not resolve. See
// {@link LADDER_RUNGS} for why the import is the point of the slide rather than a
// convenience. `leader-invest/content.ts` pays the identical price for §4.5's
// thesis line and argues it at the same length. `./geometry.ts` is the module in
// this directory that still holds the property — measured, not assumed — and
// `./phases-gates-geometry.ts` and `./levers-geometry.ts` each gave it up for
// their own import of it, which their headers price separately.
import type { Brand } from "@/deck-variants";
import { gapLadderContent, type Rung } from "@/slides/leader-gap/content";

// ═════════════════════════════════════════════════════════════════════════════
// K.1 · `mandate-enablement` — the enablement model. No brand axis; see the
// header. Everything from here to `mandateEnablementContent` belongs to it.
// ═════════════════════════════════════════════════════════════════════════════

// ───────────────────── two tuple types, so a count is a type error ─────────────────────

/**
 * Exactly three, held by the TYPE — the idiom `leader-gap/content.ts` and
 * `leader-invest/content.ts` both argue at length: a fourth entry's error lands ON
 * the fourth entry, at the definition site, with no cast anywhere.
 *
 * IT IS ALSO WHAT LETS THE GEOMETRY PIN ITS COUNTS WITHOUT IMPORTING A VALUE.
 * `./enablement-geometry.ts` declares `BLOCK_COUNT: EnablementCopy["blocks"]["length"]
 * = 3`, so a re-cut list fails to compile in the module that tiles it rather than
 * rendering a fourth card off the right edge of the stage.
 */
type Three<T> = readonly [T, T, T];

/** Exactly four, the same way. */
type Four<T> = readonly [T, T, T, T];

// ───────────────────── what stops us ─────────────────────

/**
 * One thing that stops adoption before any programme starts.
 *
 * THE BLOCKS ARE NEW ON 2026-08-14 (owner's call) AND THEY ARE THE REASON THIS
 * SLIDE NO LONGER NAMES AN ORGANISATION. What stood here was a bordered band
 * holding ONE organisation's quoted brief — DigiTech's, printed in both leader
 * decks, including the one the brief did not come from. The band was honest about
 * its provenance and it was still the wrong object: a leader in the other room read
 * a diagnosis of somebody else and had to be told, in the closer, that naming their
 * own was their job.
 *
 * THREE BLOCKS REPLACE IT, AND THEY ARE GENERIC BY EVIDENCE RATHER THAN BY
 * CONSTRUCTION. The owner runs the same programme in both rooms and reports the same
 * three obstacles in both; the source slide the three are lifted from is a third
 * organisation's own enablement model, where they are stated as that organisation's
 * bottlenecks. So the set is what this workshop keeps meeting rather than what anybody
 * audited.
 *
 * AND THE STAGE NO LONGER SAYS SO, which is the owner's call (2026-08-14, third pass) and
 * is recorded here because it is the one place a reader would look for the hedge. A mono
 * line under the three cards read "Seen in the room. Measured nowhere." — the construction
 * `leader-invest`'s `NOT_AUDITED` uses — and it was cut as unnecessary: the three blocks
 * name no organisation, quote nobody and carry no number, so there is no measurement for a
 * room to mistake them for. The rule they were hedging against is still live everywhere it
 * has a subject; it simply has none here.
 *
 * WHICH IS WHAT MAKES THE WHOLE SLIDE GENERIC AND THE BRAND AXIS UNNECESSARY. See
 * the file header: K.1 exports no brand pick, and after this re-cut it prints no
 * organisation's name at any pose in either deck.
 */
export interface Block {
  id: string;
  /**
   * Mono, uppercase, ONE WORD. A LABEL, and keyword-free by the rule above.
   *
   * ONE WORD IS WHAT KEEPS A BLOCK FROM BECOMING A DEPARTMENT. "Tools",
   * "Literacy" and "Resistance" are true of a mine, a bank and a software company;
   * the moment a label needs a qualifier it has started describing somebody's org
   * chart, and the slide has stopped being generic.
   *
   * AND NO LABEL HERE MAY REPEAT A PILLAR'S. The two sets sit beside each other in
   * the recap pose with a connector drawn between them, so a block called ACCESS
   * pointing at a pillar called ACCESS would read as a rendering fault rather than
   * as a cause pointing at its answer. {@link PILLARS} carries the other half of
   * the rule and the test holds the two label sets disjoint.
   */
  label: string;
  /**
   * What the block actually is, in ONE SHORT SENTENCE — or two, where the block is
   * a contrast. Prose, so it carries keywords.
   *
   * ASD-STE100 AND ZINSSER, WHICH IS AN OWNER RULE FOR EVERY STRING ON THIS SLIDE
   * (2026-08-14): short sentences, plain words, one idea each, and nothing the room
   * has to decode. It is also why no line below names a weekday. The pillar that
   * used to say "on the Tuesday after the room empties" was reworded in the same
   * pass — a named day reads as a schedule the deck is committing to, and there is
   * no schedule.
   *
   * HELD TO `CARD_LINE_BUDGET_CHARS` (`./enablement-geometry.ts`). The card budgets
   * three lines and the narrower of the two card widths is the pillars'; a fourth
   * line does not overflow a box, it prints under the card's bottom edge.
   */
  line: string;
  lineKw: readonly string[];
}

/**
 * The three blocks, in the order the room meets them.
 *
 * THE ORDER IS THE ORDER A PERSON HITS THEM. You cannot use a tool you cannot
 * reach; once you can reach it you find out what you cannot yet do with it; and only
 * then does what you feel about it matter. Nothing on the stage ranks them — one
 * card size, one tier, one glyph size — because clearing one and leaving the other
 * two standing gets the programme nowhere, which is the same argument
 * {@link PILLARS} makes about pillars.
 *
 * NOT ONE OF THEM IS A TOOL, A VENDOR OR A SYSTEM. "Approval is slow" names a
 * process every organisation has; "chat with the tool" names a capability, not a
 * product. The source slide named a specific desktop client and a specific web app,
 * and both were cut here: a block that names a vendor is a block the other room
 * cannot recognise.
 */
const BLOCKS: Three<Block> = [
  {
    id: "tools",
    label: "TOOLS",
    // THE FIRST PILLAR'S REASON FOR EXISTING, stated as the problem. The source
    // said it as a mechanism — a desktop client that needs a ticket, so people fall
    // back to a browser tab with no plugins and no skills in it. Generalised here
    // to the only part that travels: the strong version waits, the weak version is
    // free, and people take the free one.
    line: "Approval is slow, so people settle for the weakest tool.",
    lineKw: ["settle for the weakest tool"],
  },
  {
    id: "literacy",
    label: "LITERACY",
    // THE CONTRAST IS THE WHOLE BLOCK, and both halves have to stay. "Teams cannot
    // build with it" alone reads as a training gap; the first clause is what makes
    // it a ceiling — they are already using it, daily, and have stopped climbing.
    line: "Teams can chat with the tool. They cannot build with it.",
    lineKw: ["cannot build with it"],
  },
  {
    id: "resistance",
    label: "RESISTANCE",
    // THREE FEARS AND NOT ONE, because a single named fear invites the room to
    // dismiss it. The source lists them as replacement fear, productivity letdown
    // and autonomy pride; they are put in plain words here because a leader should
    // not have to translate three abstract nouns to recognise their own people in
    // them. NO BLAME: the sentence names what people fear, not what they get wrong.
    line: "Three fears: lost jobs, small gains, and lost control.",
    lineKw: ["lost jobs, small gains, and lost control"],
  },
];

// ───────────────────── the pillars ─────────────────────

/** One of the standing parts an enablement programme is made of. */
export interface Pillar {
  id: string;
  /**
   * Mono, uppercase, one word. A LABEL, and keyword-free by the rule above.
   *
   * ONE WORD EACH, and that is what keeps them generic. "Access", "Curriculum",
   * "Practice", "Support" are true of a programme in a mine, a bank or a
   * software company; the moment a label needs a qualifier it has started
   * describing somebody's org chart.
   */
  label: string;
  /**
   * What that pillar means, in ONE SHORT SENTENCE. Prose, so it carries keywords.
   *
   * A DEFINITION AND NOT AN INSTRUCTION. See the header: a line that told the
   * leader what to do would be one of K.3's levers arriving a slide early.
   *
   * HELD TO `CARD_LINE_BUDGET_CHARS` (`./enablement-geometry.ts`), and the pillar
   * card is the NARROWER of the two the budget is cut against — four cards across
   * the stage against the blocks' three.
   */
  line: string;
  lineKw: readonly string[];
  /**
   * WHICH BLOCK THIS PILLAR ANSWERS — a {@link Block} id, and the one field on
   * either list that knows about the other.
   *
   * IT EXISTS BECAUSE THE RECAP POSE DRAWS IT. The fourth pose puts the blocks and
   * the pillars side by side and wires each pillar to the block it clears, which is
   * the one claim neither list makes alone: the programme is not four good ideas, it
   * is four answers to three observed problems. A figure that guessed the pairing
   * from list order would silently re-wire itself the day somebody re-orders either
   * list.
   *
   * TWO PILLARS ANSWER ONE BLOCK, ON PURPOSE, and that asymmetry is the reason this
   * is a field rather than a same-length pairing. `literacy` takes both
   * `curriculum` and `practice`: teaching somebody the concepts and giving them a
   * real problem are two different acts, and a room that has only had the first
   * still cannot build. A one-to-one map would have forced the two into one pillar
   * and lost the distinction.
   *
   * GUARDED AT MODULE SCOPE by {@link PILLAR_ANSWERS}, which throws on an id no
   * block has and on a block no pillar answers.
   */
  answers: string;
}

/**
 * The four pillars, in the order the room reads them.
 *
 * THE ORDER IS THE SEQUENCE OF A PROGRAMME, not a ranking: you clear access
 * before you teach, you teach before people practise, and support is what stands
 * once the teaching is finished. Nothing on the stage ranks them — one card size, one
 * colour tier, one glyph size — because a pillar that is missing takes the other
 * three down with it, which is the whole reason the word "pillar" is the right one
 * and "priority" is not.
 *
 * FOUR, AND WHY NOT FIVE. Measurement was the obvious fifth and is refused here:
 * `mandate-phases-gates` (K.2) is entirely about when the programme is judged and
 * on what, so a measurement pillar would announce that argument one slide before
 * it is made and leave K.2 restating it. The count is not sacred — a fifth pillar
 * re-tiles the row through `pillarCardLeft` and needs no other edit — but it needs
 * an argument, and "the list felt short" is not one.
 *
 * NO PILLAR LABEL MAY EQUAL A BLOCK LABEL. See {@link Block.label}: the recap draws
 * a connector between the two sets, and two identically named boxes at either end of
 * one line read as a fault. `ACCESS` is therefore the pillar and `TOOLS` the block,
 * even though the two are about the same obstacle.
 */
const PILLARS: Four<Pillar> = [
  {
    id: "access",
    label: "ACCESS",
    // Indexes §6.7's D.5 (`invest-subscription` — company-managed seats) without
    // naming it, on the same mechanism `leader-shape`'s decisions use: the room
    // hears "seats" again in the section this one closes over. TRIMMED in the
    // 2026-08-14 pass — it used to end "…, not after it", which spent five words
    // restating the clause before it.
    line: "Seats and tools cleared before the first session.",
    lineKw: ["before the first session"],
    answers: "tools",
  },
  {
    id: "curriculum",
    label: "CURRICULUM",
    // "taught the same way" is the generic form of A.1's own curriculum row —
    // the movement the leader agenda already calls THE CURRICULUM — and "kept
    // current" is what separates a programme from a slide deck somebody ran once.
    line: "One body of material, taught the same way, and kept current.",
    lineKw: ["kept current"],
    answers: "literacy",
  },
  {
    id: "practice",
    label: "PRACTICE",
    // The Practice Lab's own premise, generically stated: the lab hands every
    // participant a real case rather than a toy one. Names neither the lab nor
    // the competition — both are brand-and-programme facts and belong to K.2.
    line: "Real work, not exercises — a problem the team already owns.",
    lineKw: ["a problem the team already owns"],
    answers: "literacy",
  },
  {
    id: "support",
    label: "SUPPORT",
    // THE PILLAR MOST AT RISK OF BECOMING A LEVER, and the second lever is in this
    // file to be read against ({@link LEVERS}, `champion`): "Name your champions,
    // give them hours every week, and put the job into their targets" — the
    // leader's ACT. This line says only that the role has to exist and has to be
    // reachable once the teaching is finished, which is the structure the lever
    // funds. "Named champions", not "you name your champions".
    //
    // PLURAL, AS OF 2026-08-15 (owner's call). It read "One person named to ask" and
    // that was a count this deck has no reason to make: a company runs several
    // champions, one per department or better, and a pillar that says ONE is a
    // structure the room would have to argue with before it could agree.
    //
    // NO WEEKDAY, AS OF 2026-08-14, AND NO IDIOM AS OF THE SAME OWNER PASS. It read
    // "Someone named to ask on the Tuesday after the room empties" — a named day is
    // a schedule this deck does not commit to, and "after the room empties" is a
    // figure of speech a second-language room has to stop and decode. "After the
    // workshop ends" is the same fact in words nobody has to translate.
    line: "Named champions, and people can still ask them after the workshop ends.",
    lineKw: ["still ask them"],
    answers: "resistance",
  },
];

/**
 * The block each pillar answers, checked once at module load.
 *
 * A THROWING IIFE AND NOT A TEST, which is the call `leader-invest`'s
 * `governance-geometry.ts` makes for the same class of defect. The failure this
 * guards is a connector drawn to nowhere — a pillar pointing at a block id that does
 * not exist, or a block with no pillar under it — and both render as a figure that
 * looks finished with one line missing. A module that throws at load paints a blank
 * stage, which is the loudest failure available and the one nobody ships.
 *
 * @throws if a pillar answers an id no block has, or if a block is answered by no
 *         pillar. The second half matters as much as the first: an unanswered block
 *         is the slide claiming a problem the programme does not address.
 */
export const PILLAR_ANSWERS: ReadonlyMap<string, readonly string[]> = (() => {
  const byBlock = new Map<string, string[]>(BLOCKS.map((block) => [block.id, []]));
  for (const pillar of PILLARS) {
    const bucket = byBlock.get(pillar.answers);
    if (!bucket) {
      throw new Error(
        `mandate content: pillar "${pillar.id}" answers "${pillar.answers}", which is ` +
          `not one of the ${BLOCKS.length} blocks (${BLOCKS.map((b) => b.id).join(", ")}). ` +
          "The recap pose draws one connector per pillar, so this would be a line to nowhere.",
      );
    }
    bucket.push(pillar.id);
  }
  for (const [blockId, answering] of byBlock) {
    if (answering.length === 0) {
      throw new Error(
        `mandate content: nothing answers block "${blockId}". A block with no pillar under ` +
          "it is the slide naming a problem the programme does not address — add a pillar or " +
          "cut the block.",
      );
    }
  }
  return byBlock;
})();

// ───────────────────── the tracks ─────────────────────

/** One depth of enablement, and who reaches it. */
export interface Track {
  id: string;
  /** Mono, uppercase, one word. A LABEL, keyword-free — and measured: the
   *  longest of the three is what `NARROWEST_LANE` in `./enablement-geometry.ts`
   *  is cut against, so a longer name is a layout change and not only a copy one. */
  name: string;
  /** What that track gets, in ONE LINE. Prose, keywords, and held to
   *  `LANE_LINE_BUDGET_CHARS` — a track row is full stage width, so its budget is
   *  the loosest on the slide. */
  line: string;
  lineKw: readonly string[];
}

/**
 * The three tracks, WIDEST FIRST — most people, least depth, at the top.
 *
 * READING DOWN THE COLUMN IS GOING DEEPER, which is why the order is not
 * reversible: the lane bars narrow as the reader descends (`laneWidth` in
 * `./enablement-geometry.ts`) and the colour tier brightens, so the two encodings
 * agree with the reading direction. Flipped, the figure would say the same thing and
 * read as a funnel standing on its point.
 *
 * THIS IS THE SLIDE'S ANSWER TO "SO WE BUY EVERYONE A SEAT?", and it answers it
 * without arithmetic: enablement is not one depth applied to a headcount, it is
 * three depths applied to three populations. §6.7's D.5 makes the same point
 * about seats and tiering; this makes it about people, one section later, which
 * is why neither needs the other's numbers.
 *
 * THREE, AND NONE OF THEM IS A DEPARTMENT. "Everyone", "Builders" and "Stewards"
 * are roles a person takes in the programme, not boxes on an org chart — which is
 * what makes the set generic and what stops it from asserting anything about
 * either organisation's internal structure.
 */
const TRACKS: Three<Track> = [
  {
    id: "everyone",
    name: "EVERYONE",
    // "stop improvising" is `leader-shape`'s governance decision heard again —
    // C.1 says the leader writes the rule down "before someone improvises", and
    // this is the training half of that same sentence. The anchor word is
    // load-bearing, not decorative: reword it and this track stops indexing C.1.
    line: "Enough to stop improvising, and to know what stays out.",
    lineKw: ["stop improvising"],
  },
  {
    id: "builders",
    name: "BUILDERS",
    // "their own team runs" is the difference between a prototype and a
    // capability, and it is the one thing this track has to buy with the hours it
    // costs. No count, no percentage — see `laneWidth`.
    line: "Depth, and the hours to build what their own team runs.",
    lineKw: ["their own team runs"],
  },
  {
    id: "stewards",
    name: "STEWARDS",
    // The track a workshop cannot create and only a mandate can: someone whose
    // job continues after the programme's last day. It is deliberately the
    // narrowest lane AND the brightest tier — the fewest people at the greatest
    // depth is the shape of the claim.
    line: "The few who keep it running after the programme ends.",
    lineKw: ["after the programme ends"],
  },
];

// ───────────────────── the slide ─────────────────────

export const mandateEnablementContent = {
  figLabel: "THE ENABLEMENT MODEL",

  /**
   * The premise, and the refusal the rest of the slide depends on.
   *
   * A leader hears "enablement" as a line item. The headline names what is
   * actually being authorized — a structure that stands after the event — before
   * the cards show what it is made of, because a room that has already priced the
   * slide as training reads four pillars as four invoices.
   */
  headline: "Enablement is a structure, not a training budget.",
  headlineKw: ["a structure"],

  /**
   * FOUR EYEBROWS ON ONE SHELF, one per scene, and never two at once.
   *
   * Each names its scene's QUESTION rather than its contents, so four consecutive
   * frames read as one argument being walked rather than as four lists. Mono
   * labels, keyword-free.
   *
   * THE SHELF IS y=156 AND THAT IS THE 2026-08-14 FIX. The eyebrows hung at y=134,
   * twelve pixels under a 40px display headline, and the owner's note on it was that
   * the two lines looked like one wrapped one. `leader-invest`'s D.1–D.4 cut the same
   * 34px of air for the same complaint and `./enablement-geometry.ts` derives it the
   * same way.
   */
  blocksEyebrow: "WHAT STOPS US TODAY",
  pillarsEyebrow: "WHAT THE PROGRAMME IS MADE OF",
  tracksEyebrow: "WHO IT REACHES, AND HOW DEEP",
  modelEyebrow: "THE WHOLE MODEL, IN ONE FRAME",

  /**
   * The recap pose's three column heads — the same three scenes, named in three
   * words each because they are now captions over columns rather than the title of
   * a stage.
   *
   * SHORTER THAN THE EYEBROWS THEY COMPRESS, and deliberately not equal to them. A
   * column head that repeated its scene's full eyebrow would be the longest string
   * in the narrowest box on the slide; and the room has already read the long form
   * one click earlier, so the short form is a reminder rather than a first
   * introduction.
   */
  blocksShort: "WHAT STOPS US",
  pillarsShort: "WHAT WE BUILD",
  tracksShort: "WHO IT REACHES",

  blocks: BLOCKS,
  pillars: PILLARS,
  tracks: TRACKS,

  /**
   * ONE MINI-THESIS PER HERO SCENE — the owner's third-pass addition (2026-08-14).
   *
   * WHY THEY EXIST. Each of the first three poses shows a SET and says nothing about what
   * the set means; a leader looking at three cards has to supply the argument themselves,
   * and half a room will supply a different one. So every hero scene now closes on the
   * bottom line of the slide, in the same place and the same register as {@link closer} —
   * which is the point of putting them on one shelf: the room learns after one click that
   * the sentence at the foot of the stage is the takeaway, and it is there every time.
   *
   * ONE TIER DOWN FROM THE CLOSER AND NOT ONE SIZE DOWN. `--neutral-200` against the
   * closer's `--neutral-100`, same 19px serif, same shelf. Rank on this stage is a colour
   * tier, and three scene-scoped lines set smaller than the one that closes the slide
   * would read as captions rather than as arguments. The other half of the separation is
   * geometric and is the closer's alone: it gets a copper rule over it, because it is the
   * only one of the four that is about the WHOLE model rather than about the frame above
   * it.
   *
   * EACH ONE ANSWERS THE QUESTION ITS SCENE PROVOKES, which is what keeps them from being
   * summaries. Three blocks provoke "so we need better tools"; four pillars provoke "so
   * which one do we fund"; three tracks provoke "so we buy everyone a seat". Prose, so all
   * three carry keywords, and all three are held to the closer's own word budget.
   */
  blocksThesis: "No new tool clears any of these three. A decision does.",
  blocksThesisKw: ["A decision does"],

  pillarsThesis: "Four pillars, and a missing one takes the other three down with it.",
  pillarsThesisKw: ["takes the other three down with it"],

  tracksThesis: "Nobody gets the same depth. That is the design, not a gap.",
  tracksThesisKw: ["That is the design"],

  /**
   * The thesis — the last pose, and the only thing on it.
   *
   * IT MOVED WHEN THE BAND DID. The line used to say "The pillars and the tracks are
   * generic. Naming the bottleneck is the part only you can do." — which was fair
   * when one organisation's bottleneck was quoted on the stage and the room's own was
   * missing. The slide now names three blocks every room recognises, so "naming
   * yours" is no longer the ask: the ask is which one gets cleared first, and that is
   * a decision no consultant, no playbook and no other organisation's roadmap can
   * make for a leader with a calendar and a budget line.
   *
   * IT HANDS OVER TO K.2. The next slide is phases and gates; a room that has just
   * been asked which block it clears first is a room ready to be shown what gets
   * measured and when.
   */
  closer: "The model is generic. Which block you clear first is the part only you can decide.",
  closerKw: ["generic", "only you can decide"],
} as const;

// ═════════════════════════════════════════════════════════════════════════════
// K.2 · `mandate-phases-gates` — the phases, their gates, and the ladder they
// land on. Brand-varying (§4.4 slot 6). Everything below belongs to it.
// ═════════════════════════════════════════════════════════════════════════════

// ───────────────────── the ladder, borrowed rather than re-cut ─────────────────────

/**
 * §6.5's five rungs — THE SAME ARRAY OBJECT `gap-capability-ladder` renders, not
 * a copy of it and not a re-typing of its strings.
 *
 * THIS IMPORT IS THE SLIDE'S SECOND ACCEPTANCE CRITERION, EXPRESSED AS CODE.
 * §6.5 ends by saying its B.5 and K.2 are "the same object seen twice", and #61
 * requires the relationship to read that way on screen — same rung names, same
 * order, no re-labelling. B.5 IS THE SPEC'S DESIGNATION FOR THAT SLIDE AND NOT THE
 * DECK'S: §6.5 numbers the finished `gap` run of five, and with two of the five
 * built the composed leader decks derive B.2 for `gap-capability-ladder` today — B.1
 * until gh#65 put `gap-hardest-part` in front of it, which is the second value that
 * sentence has held and the reason it is not a number anything here reads.
 * Every line below that is about the slide rather than about the spec therefore
 * names the basename (`./mandate-phases-gates.tsx` states the rule). There were two
 * ways to hold the criterion:
 *
 *   · RE-DECLARE THE RUNGS HERE and keep the two in step with a test. That is the
 *     route gh#60 took for the sentence K.1 and `gap-capability-ladder` both
 *     quote, and it was right THERE for a reason that does not carry across. A
 *     quotation is a fixed historical string owned by neither slide; both sides are
 *     authored independently, the failure is "somebody reworded one of them", and a
 *     test that compares them is exactly the instrument for it. A VOCABULARY is the
 *     opposite: it is owned by `gap-capability-ladder`, this slide is a consumer of
 *     it, and the failure is "L3 was renamed there and K.2 still says the old
 *     thing". A test catches that at CI, one commit later, with two files to
 *     reconcile and a reviewer who has to decide which name is now correct.
 *   · IMPORT IT, so a rename in `leader-gap/content.ts` re-letters this slide in
 *     the same edit and there is nothing left to drift. "Same object" stops being
 *     a claim a test defends and becomes a fact the compiler holds. That is what
 *     this line does, and `tests/unit/mandate-phases-gates.test.tsx` asserts the
 *     IDENTITY (`toBe`, not `toEqual`) so the guarantee cannot be quietly
 *     downgraded to a copy later.
 *
 * WHAT IT COSTS, stated plainly: two section modules are now coupled. The
 * coupling is one-directional (`leader-gap` imports nothing from here, so there
 * is no cycle), data-only, and NARROW — it is the rungs and
 * `gap-capability-ladder`'s own fig label, and specifically NOT
 * `capabilityLadderFor`. This slide has its own brand table; borrowing that one's
 * would have tied two DIFFERENT axes together (§4.4 lists them as separate slots,
 * 2 and 6) to save one import. It also costs this file its bare-Node
 * importability, which the header prices.
 *
 * `readonly Rung[]`, because that is what `gap-capability-ladder` exports and
 * re-widening it here would let this module hand out a mutable view of another
 * section's data.
 */
export const LADDER_RUNGS: readonly Rung[] = gapLadderContent.rungs;

/**
 * Where a rung sits on the ladder, by ID.
 *
 * BY ID AND NOT BY INDEX, which is the half the import alone does not buy.
 * `gap-capability-ladder`'s own markers carry `rung: 2` because their rung table is
 * in the same file, where a reorder is visible in the diff; from here a numeric
 * index is a silent dependency on another module's array order, and a reordered
 * ladder would move every phase to the wrong rung while everything still rendered.
 *
 * @throws naming the ids the ladder does have. It is called at module scope by
 *         {@link PHASES_BY_RUNG}, so a rung renamed or removed in
 *         `gap-capability-ladder` fails this module AT LOAD, in every deck that
 *         composes it — which is the whole payoff of importing rather than
 *         re-declaring, and would be thrown away by a lookup that returned `-1`.
 */
export function rungIndexOf(rungId: string): number {
  const index = LADDER_RUNGS.findIndex((rung) => rung.id === rungId);
  if (index < 0) {
    throw new Error(
      `rungIndexOf: the Capability Ladder has no rung "${rungId}" — it has ` +
        `${LADDER_RUNGS.map((rung) => rung.id).join(", ")}. This slide maps phases ` +
        `onto \`gap-capability-ladder\`'s rungs (§6.5), so a rung renamed there has ` +
        `to be renamed here too.`,
    );
  }
  return index;
}

/** The rung a phase lands on. Same lookup, same failure. */
export function rungOf(rungId: string): Rung {
  return LADDER_RUNGS[rungIndexOf(rungId)];
}

// ───────────────────── the phases ─────────────────────

/**
 * The four phases, as a closed set of ids.
 *
 * A `const` TUPLE AND NOT A BARE STRING, so {@link PhasesGatesBrandBlock}'s
 * calendar table is keyed by a union: a brand that forgets a phase, or invents
 * one, fails to compile. Same reasoning as `Record<Brand, …>` one screen down —
 * the two tables are the only places this slide could silently show a room a
 * blank column.
 */
const PHASE_IDS = ["p0", "p1", "p2", "p3"] as const;
export type PhaseId = (typeof PHASE_IDS)[number];

/** One phase of the programme, and the rung it leaves the organisation on. */
export interface Phase {
  id: PhaseId;
  /**
   * Mono. `P0` … `P3`. A LABEL, keyword-free, and printed verbatim in TWO places
   * — as a chip on the rung this phase lands on, and as the head of its own
   * column — because those two printings are the only thing tying the staircase
   * to the columns below it.
   */
  label: string;
  /**
   * Mono. What is TRUE OF THE RUNG once this phase is over: `CLAIMED`, `SOLID`,
   * `BOUNDED`, `GOVERNED`. A LABEL, keyword-free.
   *
   * THESE ARE NOT A LADDER, AND THAT IS THE POINT (#61's third AC, §6.6). §6.6
   * cut "Learn → Experiment → Build → Integrate → Own" because a second ladder
   * beside `gap-capability-ladder`'s is a second vocabulary the room has to hold,
   * and the deck has one. These four words cannot become one: they are ADJECTIVES
   * ON THAT SLIDE'S RUNGS, meaningless on their own, and TWO OF THEM NAME THE SAME
   * RUNG — `CLAIMED` and `SOLID` are both L2, which is precisely the thing a ladder
   * cannot do. Read down the column they do not form a sequence of levels; read
   * across to the staircase they resolve.
   *
   * `CLAIMED` before `SOLID` is `gap-capability-ladder`'s own distinction reused,
   * not a new one: that slide's headline is "L5 is declared only when earned" and
   * its Berau closer is "No rung is claimed here yet". A rung claimed is not a rung
   * earned, and P1 is where the difference is paid for.
   */
  state: string;
  /** Which rung of {@link LADDER_RUNGS}, by id. See {@link rungIndexOf}. */
  rungId: string;
  /**
   * What has to be TRUE to leave this phase. Prose, so it carries keywords.
   *
   * A CONDITION AND NEVER A DATE. The slide's headline is the whole rule and
   * these four lines are where it is either kept or quietly broken: a gate that
   * named a month would be a date wearing a gate's label, and the brand calendar
   * beside it would then be saying the same thing twice. Every date on this slide
   * lives in {@link PhaseCalendar}, which is the organisation's, not ours.
   *
   * HELD TO `GATE_BUDGET_CHARS` (`./phases-gates-geometry.ts`) — the column
   * budgets three lines and the budget keeps every gate inside two, leaving the
   * third for a fallback face.
   */
  gate: string;
  gateKw: readonly string[];
  /**
   * The mark on this phase's card in SCENE 1, drawn small — its STATE as a verb.
   *
   * TWO MARKS PER PHASE AND NOT ONE, which is the whole reason the two scenes are
   * two clicks (`./components/PhaseGlyphs.tsx`). Scene 1's marks all perform A
   * CALENDAR ADVANCING: something moves, repeats, and arrives nowhere it has not
   * already been. Scene 2's all perform A MEASUREMENT THAT LANDS. That pair IS
   * the headline — a date passes on its own, a gate does not — said in the one
   * channel a printed plan does not have, and a room that reads nothing but the
   * movement still gets it.
   *
   * TYPED `string` AND NOT THE GLYPH UNION, deliberately, exactly as K.1's
   * `Block.id` is: this module must not import a component, so the union lives in
   * the drawing file and the pin between the two is a module-load guard in
   * `./components/PhaseLadder.tsx`. A mark this deck has not drawn therefore
   * throws at load, in every deck that composes the slide, rather than rendering
   * an 88px hole in the middle of a card.
   */
  stateGlyph: string;
  /** The mark on this phase's card in SCENE 2 — its GATE as a verb. Same pin,
   *  same guard, same file. */
  gateGlyph: string;
}

/**
 * §6.5's mapping, in order: P0–P1 → L2 · P2 → L3 · P3 → L4.
 *
 * THE ORDER IS THE PROGRAMME'S AND THE RUNGS ARE THE LADDER'S, and the two agree
 * — the rung index never goes down as the phases advance, which the test asserts
 * rather than assumes. That is what makes the figure legible as one object: a
 * phase list whose rungs zig-zagged would still render, and would be a plan that
 * climbs and descends the same ladder inside one slide.
 *
 * FOUR PHASES ONTO THREE RUNGS, and the doubling is the mapping's only surprise,
 * so it is worth naming here as well as on the stage: L2 carries TWO phases. §6.5
 * says "P0–P1 → solid L2" and means it — getting an organisation onto the rung
 * and keeping it there without the programme pushing are different pieces of
 * work, and collapsing them into one phase is how "we ran the workshop" becomes
 * "we are at L2".
 *
 * L1 AND L5 TAKE NO PHASE, WHICH IS ALSO CONTENT. L1 is behind the start line and
 * L5 is `gap-capability-ladder`'s "declared only when earned" — so the plan on this
 * stage deliberately stops one rung short of the top of the ladder it is drawn on.
 * Nothing states that in a sentence; the two bare treads state it, and
 * `phasesOnRung` is what keeps them bare without anybody typing a list of which
 * rungs are empty.
 */
const PHASES: readonly Phase[] = [
  {
    id: "p0",
    label: "P0",
    state: "CLAIMED",
    rungId: "l2",
    // The phase both organisations are actually IN or have just left, and the
    // gate is the one number either of them will already have: a post-assessment
    // exists in both programmes. "Attendance sheet" is the failure
    // `gap-capability-ladder`'s Berau question already put to the room — did the
    // training reach the desk, or did it stay in the room? — and this is the same
    // doubt written as a condition instead of a question. (That question used to
    // ask whether it "stopped at the certificate"; it was reworded on 2026-08-14
    // because the programme it asks about has not finished. The doubt is the same
    // one, which is why this gate did not move.)
    gate: "The post-assessment score moves, not just the attendance sheet.",
    gateKw: ["The post-assessment score moves"],
    // A FLAG ON A STEP THE ROOM CANNOT SEE UNDER IT. "Claimed" is the one state
    // of the four that can be true while nothing is: the flag flies, the tread
    // beneath it is dashed. And a NEEDLE for the gate, because the only way to
    // find out is to measure the same people twice.
    stateGlyph: "claimed",
    gateGlyph: "measure",
  },
  {
    id: "p1",
    label: "P1",
    state: "SOLID",
    rungId: "l2",
    // WHY A SECOND PHASE ON ONE RUNG EARNS ITS COLUMN. Everything up to here can
    // be produced by a programme that is still running; this gate can only be
    // passed by one that has stopped. It is K.1's SUPPORT pillar and STEWARDS
    // track cashed out as a test — "the few who keep it running after the
    // programme ends" is a structure, this is how you find out whether it worked.
    gate: "Daily use holds when the programme stops pushing it.",
    gateKw: ["when the programme stops pushing it"],
    // A LOAD THAT PRESSES AND A STACK THAT DOES NOT MOVE — "solid" is the only
    // state of the four that is proved by an absence. The gate takes the hand
    // AWAY and the wheel keeps turning, which is the same claim with the
    // programme removed from it.
    stateGlyph: "solid",
    gateGlyph: "unpushed",
  },
  {
    id: "p2",
    label: "P2",
    state: "BOUNDED",
    rungId: "l3",
    // QUOTES L3's OWN DEFINITION BACK — `gap-capability-ladder` defines that rung
    // as "Decision contract · 70/30 split", and this gate is that definition turned
    // into a thing somebody either did or did not do. The staircase above prints
    // rung NAMES only, so these two words are how the definition reaches this
    // slide; the test holds the gate and that slide's `sub` in step for exactly
    // that reason.
    gate: "The decision contract is written down before the first agent runs.",
    gateKw: ["written down"],
    // A DOT THAT TRAVELS AND TURNS AT A DRAWN WALL. The bound is the subject,
    // so the wall is drawn and the agent is what moves inside it. The gate is
    // the same wall being WRITTEN — a line, then a seal.
    stateGlyph: "bounded",
    gateGlyph: "contract",
  },
  {
    id: "p3",
    label: "P3",
    state: "GOVERNED",
    rungId: "l4",
    // Same device, L4's definition: "Coordinated agents, escalation paths." An
    // escalation path with nobody at the end of it is the failure mode that makes
    // a mesh look governed while it is not, which is why the gate is the PERSON
    // and not the path. "GOVERNED" as the state, rather than L4's own "mesh", is
    // the only adjective on this slide that is not already `gap-capability-ladder`'s
    // word — and it is an adjective, not a rung name; the rung is printed verbatim
    // beside it.
    gate: "Every escalation path ends at a person who answers it.",
    gateKw: ["a person who answers it"],
    // TWO BRANCHES CONVERGING ON ONE FILLED MARK. Governance is the shape, not
    // the traffic. The gate lights the person at the end of it, because an
    // escalation path with nobody on it is the failure this gate is for.
    stateGlyph: "governed",
    gateGlyph: "answered",
  },
];

/**
 * Which phases land on rung `i`, built once at module load.
 *
 * DERIVED, SO NOBODY MAINTAINS A LIST OF EMPTY RUNGS. Four encodings on the
 * staircase read this one table — the tread's colour tier, the riser's, the rung
 * label's, and whether any chip is drawn at all — so a rung stops being "on the
 * plan" in all four places at once or in none. Two lists that agree today are one
 * edit from a bright tread with no phase on it, which reads as a rendering fault
 * rather than as a mistake (`../leader-mandate/components/EnablementModel.tsx`
 * makes the same call about its lane ramp).
 *
 * AND IT IS WHERE {@link rungIndexOf} FIRES. This runs at module scope, so a rung
 * id this slide names and `gap-capability-ladder` no longer has takes the whole
 * module down in every deck that composes it, at load, rather than rendering a
 * phase attached to nothing.
 */
const PHASES_BY_RUNG: readonly (readonly Phase[])[] = LADDER_RUNGS.map((_, index) =>
  PHASES.filter((phase) => rungIndexOf(phase.rungId) === index),
);

/**
 * The phases that land on rung `index` — empty for a rung no phase reaches.
 *
 * @throws on a rung the ladder does not have. A silently empty array for rung 9
 *         would draw a staircase with a step missing its chips and look
 *         deliberate.
 */
export function phasesOnRung(index: number): readonly Phase[] {
  const row = PHASES_BY_RUNG[index];
  if (!row) {
    throw new Error(
      `phasesOnRung: no rung ${index} — the Capability Ladder has ` +
        `${LADDER_RUNGS.length} (0…${LADDER_RUNGS.length - 1}).`,
    );
  }
  return row;
}

// ───────────────────── the brand axis (§4.4 slot 6) ─────────────────────

/**
 * What an organisation has published about one phase — or the fact that it has
 * published nothing.
 *
 * A UNION, FOR THE REASON `TechFunction` IS ONE in `leader-gap/content.ts`:
 * "never both, never neither" becomes a fact the compiler holds. Neither
 * organisation's roadmap reaches P2 or P3, and the two ways of expressing that
 * are both wrong — an empty `rows: []` renders as a column that failed to load,
 * and a hand-written "TBD" per brand is two copies of one sentence waiting to
 * drift into three.
 *
 * THE TWO ARMS ALSO RENDER IN DIFFERENT REGISTERS, which is what stops the second
 * from reading as a missing date rather than as a stated one. `theirs` is mono
 * label rows, because they are the organisation's own calendar entries; `ours` is
 * prose ({@link mandatePhasesGatesContent.beyondRoadmap}), because it is the
 * deck's sentence about the absence. Same split, same reason, as
 * `gap-capability-ladder`'s asserted chip against its absence line.
 */
export type PhaseCalendar =
  | {
      readonly kind: "theirs";
      /**
       * The organisation's OWN calendar rows for this phase, in its own labels.
       * Mono, uppercase, keyword-free — they are dates and programme names, and a
       * copper italic inside one would be the deck emphasising part of somebody
       * else's schedule.
       *
       * Held to `CALENDAR_ROW_BUDGET_CHARS` and `CALENDAR_ROWS`
       * (`./phases-gates-geometry.ts`): the column budgets a fixed number of rows
       * so that four columns of different lengths still bottom out together.
       */
      readonly rows: readonly string[];
    }
  | { readonly kind: "ours" };

/** Everything about this slide that varies with the organisation in front of it —
 *  §4.4 slot 6, and nothing else. No phase, no gate and no rung is on this axis. */
export interface PhasesGatesBrandBlock {
  /** One entry per phase. `Record<PhaseId, …>` and not an array, so a calendar
   *  cannot silently pair with the wrong column when a phase is inserted. */
  calendars: Record<PhaseId, PhaseCalendar>;
  /**
   * The organisation's OWN words about its OWN roadmap — in quotes, attributed, and
   * printed as ONE mono line under the four calendars it is the source for.
   *
   * ═══ IT USED TO BE A THREE-LINE BORDERED BAND AND IT IS NOT ONE ANY MORE
   * (2026-08-15). The band carried a mono eyebrow, the deck's own serif statement and
   * this citation, inside a border, across the full width of a stage that already held
   * a staircase and four columns. Two things retired it. K.1 retired its own band a
   * week earlier for the first: on a top-management slide, ten objects at once means
   * nothing gets more than a tenth of the room. The second is this slide's own: the
   * band's STATEMENT was the deck speaking, and the deck now speaks in exactly one
   * place on this stage — the bottom line — so a second, bordered, brighter sentence
   * two inches above it was the slide arguing with itself.
   *
   * WHAT SURVIVED IS THE ONLY PART A ROOM CANNOT GET ANYWHERE ELSE, and it is printed
   * where the dates it sources are printed rather than a band away from them. Mono,
   * sentence case, keyword-free: it is somebody else's document, and a copper italic
   * inside a quotation would be the deck emphasising a fragment of it.
   *
   * IT IS THE ONE STRING ON THIS SLIDE ALLOWED TO BE LONG. A citation trimmed to fit
   * has stopped being one, so `./phases-gates-geometry.ts` budgets it two lines.
   */
  provenance: string;
  /**
   * The thesis — the last pose, and the one thing on the stage that is an ASK.
   *
   * ON THE BRAND AXIS BECAUSE THE TWO ROOMS ARE BEING ASKED DIFFERENT THINGS. One
   * organisation's own roadmap already names the destination and the deck's job is to
   * say what earns it; the other's programme is still running and the deck's job is to
   * say who decides what follows it. A shared line would be false in one of the two
   * rooms.
   *
   * NO DATE, NO MONTH, NO DEADLINE — owner's rule, 2026-08-15, and it is a rule about
   * what a thesis IS. The line the GEMS deck closed on used to open "January is already
   * on the calendar", and the Berau deck's named a day and a group of people the
   * programme has not yet named. A sentence that turns on a date expires; a sentence
   * that turns on a decision does not, and this slide's whole argument is that the
   * second kind is the one that matters. The dates are all above, in the columns, where
   * they belong and where they are somebody else's.
   */
  closer: string;
  closerKw: readonly string[];
}

/**
 * GEMS — their roadmap already names the destination, and already gates on
 * measurement rather than on the calendar.
 *
 * SOURCE: `docs/references/202607-ai-catalyst-gems-brief.pdf` p2, the "GEMS AI
 * Journey" row. AI Catalyst runs pre-assessment → workshop → competition →
 * AI Adoption Post-Assessment at W1 Nov; phase 3 of the journey is titled "AI
 * Forge — Deep AI Skills to Build an Agentic Organization", starts W1 Jan 2027,
 * and says participants will be "dependent on the post-assessment result".
 *
 * WHY THAT IS THE WHOLE ARGUMENT FOR THIS ROOM. The strongest thing this deck can
 * say to GEMS is that it is not proposing a new direction — the destination is on
 * their own slide, in their own words, and their own programme already refuses to
 * hand out entry on a date. So the citation quotes rather than argues, and the
 * thesis asks only for what earns the destination they have already named.
 */
const GEMS_BLOCK: PhasesGatesBrandBlock = {
  calendars: {
    // The three AI Catalyst milestones a leader will recognise, in their own
    // week-numbering. P0 ENDS AT THE POST-ASSESSMENT and not at the competition:
    // that is the gate their own programme gates on, and printing the competition
    // last would put the reward where the measurement belongs.
    p0: {
      kind: "theirs",
      rows: ["WORKSHOP · W1–W4 AUG", "COMPETITION · W1 SEP–W4 OCT", "POST-ASSESSMENT · W1 NOV"],
    },
    // AI Forge IS P1 (§6.8), not a fifth phase bolted on the end. The full
    // programme title is quoted once, in the provenance line, where it has room to
    // be quoted whole rather than truncated into a label.
    p1: { kind: "theirs", rows: ["AI FORGE · FROM W1 JAN 2027", "5 MONTHS · 3 PHASES"] },
    p2: { kind: "ours" },
    p3: { kind: "ours" },
  },
  // TWO quoted fragments, because the two do different work: the TITLE is the
  // destination and "the post-assessment result" is the gate, and a room that hears
  // only one of them hears either an ambition with no test or a test with no purpose.
  provenance:
    "GEMS' own programme: “AI Forge — Deep AI Skills to Build an Agentic " +
    "Organization”, starting W1 Jan 2027, with entry dependent on “the " +
    "post-assessment result”.",
  // THE ROOM IS NOT BEING SOLD A DIRECTION, and this line's only job is to say so
  // without saying it. "Already" concedes the destination to them; "earn" is the
  // gate, and it is the deck's word rather than theirs.
  closer: "Your roadmap already names the destination. The gates are what earn it.",
  closerKw: ["what earn it"],
};

/**
 * Berau — the programme is STILL RUNNING, and what follows it has no owner yet.
 *
 * SOURCE: `docs/references/berau-presentation-plan.pdf` p3, the "Berau Coal AI
 * Journey" row — pre-assessment 27 Apr–17 May, workshop W3 May & W2 Jun,
 * competition Jun–Jul, post-assessment Jul–Aug, then "Post Program AI
 * Development · After Aug".
 *
 * ═══ CORRECTED 2026-08-15 (owner), AND THE CORRECTION IS THE POINT OF THIS BLOCK.
 * What stood here said P0 WAS COMPLETE — three delivered stages, a band headed "AUG 18
 * IS THE GATE", and a thesis that the AI Ambassadors "already exist". None of the three
 * is true today. The plan has slipped: the workshop is delivered, THE COMPETITION IS
 * STILL RUNNING, the post-assessment has not been taken, and NO AMBASSADOR HAS BEEN
 * NAMED. `leader-gap/content.ts` was corrected on the same evidence a day earlier and
 * its ladder now prints "382 trained · the competition still runs · Ambassadors not yet
 * named"; this block is that correction reaching the plan.
 *
 * IT MAKES THE SLIDE STRONGER RATHER THAN WEAKER, which is worth writing down so that
 * nobody restores the old copy the day the programme finishes. A finished P0 lets a
 * room say "good, that worked" and move on. A P0 still in flight puts the room inside
 * the phase the whole slide is about, and the gate stops being a report on the past and
 * becomes the thing they are being asked to set.
 *
 * NO DATE IS INVENTED. Every row below is either the organisation's own published
 * window or a status word — DONE, RUNNING, TO COME — and the deck owns the status words
 * because the deck is the thing that looked.
 */
const BERAU_BLOCK: PhasesGatesBrandBlock = {
  calendars: {
    // THE STATUS WORD IS THE SECOND HALF OF EVERY ROW, and it is the row's whole
    // reason for existing after the correction: a window on its own reads as a
    // promise kept. Three stages, three different states, one column — which is
    // what "the programme is still running" looks like without a sentence.
    p0: {
      kind: "theirs",
      rows: ["WORKSHOP · MAY–JUN · DONE", "COMPETITION · FROM JUN · RUNNING", "POST-ASSESSMENT · TO COME"],
    },
    // Their own label for the next stage, and their own window. Split across two
    // rows because it is a programme name and a date, not one string — and
    // because the whole title on one row overruns the column.
    p1: { kind: "theirs", rows: ["POST PROGRAM AI DEVELOPMENT", "AFTER AUG"] },
    p2: { kind: "ours" },
    p3: { kind: "ours" },
  },
  // THREE VERBS IN THREE TENSES, and they are the citation's whole content: what is
  // delivered, what is running, what has not happened. Then their own name for the
  // stage that comes next, quoted, because "After Aug" is the only thing their roadmap
  // says about it and the room should hear how little that is.
  provenance:
    "Berau Coal's own journey: the workshop is delivered, the competition still runs, " +
    "the post-assessment is not in. Their roadmap calls the next stage “Post Program " +
    "AI Development — After Aug”.",
  // ═══ THE OLD LINE WAS "The AI Ambassadors already exist. Fund them, or lose them."
  // and it had to go on the facts alone: nobody has been named an Ambassador, so the
  // deck would have been asking the room to fund a group that does not exist. The
  // replacement keeps what was RIGHT about it — this is an ask, made to the one person
  // who can answer it — and drops the two things that were wrong: a named day, and a
  // named group.
  //
  // THE SHAPE IS THE HEADLINE'S. "Ends on a date" is what the programme does by
  // itself; "your decision" is the gate. The slide has spent four poses earning the
  // right to put those two in one sentence, and the second clause is the only
  // imperative on the stage.
  closer: "The programme ends on a date. Whether anything holds after it is your decision.",
  closerKw: ["your decision"],
};

/**
 * `general` — UNREACHABLE TODAY, and kept to the shortest honest thing.
 *
 * No `general-leader` variant is registered (`VARIANTS` in `@/deck-variants`), so
 * no composed deck asks for this block. It exists for the reason `GENERAL_BLOCK`
 * in `leader-gap/content.ts` exists, and follows that comment's reasoning
 * exactly: registering the variant should serve a slide that dates NOTHING,
 * rather than crash at first paint or — far worse — fall through to another
 * organisation's roadmap.
 *
 * DELIBERATELY THE THINNEST BLOCK OF THE THREE, AND DELIBERATELY NOT
 * INHERITABLE. Every word here is copy no audience has ever read, and dead copy
 * that reads as finished is how invented evidence gets shipped by a later edit
 * that "just fills this in". `general` names no organisation, so it has no
 * published roadmap at all — which is why all four calendars are `ours` and the
 * citation cites nothing. Whoever registers `general-leader` will have to write the
 * real thing rather than adapt a plausible draft, because there is no draft here
 * to adapt.
 */
const GENERAL_BLOCK: PhasesGatesBrandBlock = {
  calendars: {
    p0: { kind: "ours" },
    p1: { kind: "ours" },
    p2: { kind: "ours" },
    p3: { kind: "ours" },
  },
  provenance: "No organisation is named in this deck, so there is no programme to quote.",
  closer: "Nothing above is dated, because nothing here is anybody's programme yet.",
  closerKw: ["anybody's programme yet"],
};

/**
 * This slide's calendars, citation and thesis, brand by brand.
 *
 * A `Record` keyed by `Brand` and not a `brand === "gems"` ternary, and not a
 * `VARIANT` read inside a component: a fourth brand must FAIL TO COMPILE here
 * rather than silently show one organisation another's roadmap. §4.4's "a content
 * block per brand, not a brand × deckSet matrix" — the deck-set axis does not
 * reach this slide, because a slide only the leader decks compose has nothing to
 * vary against. `sectionOverrides` stays composition-only (§4.1), the slide file
 * resolves the brand ONCE at module scope, and the figure below it takes the
 * resolved block as a prop, which is what lets one test render both brands in one
 * module epoch.
 */
const PHASES_GATES_BY_BRAND: Record<Brand, PhasesGatesBrandBlock> = {
  berau: BERAU_BLOCK,
  gems: GEMS_BLOCK,
  general: GENERAL_BLOCK,
};

/**
 * This slide's brand-varying half for one brand. Pass `VARIANT.brand`.
 *
 * THE ONLY WAY IN, for the reason `capabilityLadderFor` is: the table above is
 * deliberately not exported, so a rule held over "every brand" is proved over
 * `BRANDS` and not over this file's own key set.
 */
export function phasesGatesFor(brand: Brand): PhasesGatesBrandBlock {
  return PHASES_GATES_BY_BRAND[brand];
}

// ───────────────────── the slide ─────────────────────

export const mandatePhasesGatesContent = {
  figLabel: "PHASES AND GATES",

  /**
   * The whole slide in one sentence, and the refusal the rest of it keeps.
   *
   * A leader reads a phased plan as a timeline and asks when each phase ends. The
   * headline answers before the question is asked, so the calendar rows below can
   * be exactly what they are — the organisation's own published dates — without
   * the room mistaking them for what actually ends a phase.
   */
  headline: "Four phases. Each one ends on a gate, not on a date.",
  headlineKw: ["a gate, not on a date"],

  /**
   * FOUR EYEBROWS ON ONE SHELF, one per scene, and never two at once.
   *
   * THE SHELF IS y=156, WHICH IS THE 2026-08-15 FIX. They hung at 134 — twelve pixels
   * under a 40px display headline — and the owner's note was that the room read a title
   * and a second title as one wrapped line. K.1 cut the same 34px of air for the
   * identical complaint a day earlier, `leader-invest`'s D.1…D.4 before that, and
   * `./phases-gates-geometry.ts` now derives it the same way all three do.
   *
   * EACH ONE NAMES ITS SCENE'S QUESTION rather than its contents, so four consecutive
   * frames read as one argument being walked rather than as four lists. Mono labels,
   * keyword-free.
   */
  ladderEyebrow: "THE LADDER THIS PLAN CLIMBS",
  phasesEyebrow: "THE FOUR PHASES, AND WHERE EACH ONE LANDS",
  gatesEyebrow: "WHAT HAS TO BE TRUE TO LEAVE EACH PHASE",
  planEyebrow: "THE WHOLE PLAN, IN ONE FRAME",

  rungs: LADDER_RUNGS,
  phases: PHASES,

  /**
   * The two notes on the ladder scene — the two rungs no phase reaches.
   *
   * THEY ARE THE SCENE'S ONLY COPY, and they exist because the geometry alone cannot
   * be trusted to say it. Five rungs are drawn and three are lit; a room that reads
   * the dim ends as "not drawn yet" on a step-reveal deck has read the opposite of
   * what the figure means. Two dashed boxes — the deck's own mark for "not claimed",
   * borrowed from `gap-capability-ladder`'s open marker — say which and why.
   *
   * NEITHER NAMES A PHASE, which is what keeps them notes rather than a fifth and
   * sixth column. Mono labels, and a sans line each; keyword-free, because a copper
   * italic in a marginal note would rank it against the staircase it annotates.
   */
  lowNote: {
    label: "BELOW THE PLAN",
    line: "No phase starts on L1. It is where a company sits before a programme.",
  },
  highNote: {
    label: "ABOVE THE PLAN",
    line: "No phase claims L5. That rung is declared only when it is earned.",
  },

  /** The tag over the lit stretch. Mono, keyword-free, and the shortest string on the
   *  slide: it names what the bright run of staircase IS, and nothing else. */
  planTag: "THE PLAN · THREE RUNGS",

  /**
   * ONE BOTTOM LINE PER SCENE, on one shelf, in one register — K.1's construction one
   * click earlier and the reason it is worth repeating: the room learns after a single
   * click that the sentence at the foot of the stage is the takeaway, and it is there
   * every time.
   *
   * THE FIRST THREE ARE THE DECK'S AND ARE NOT ON THE BRAND AXIS. A ladder with three
   * rungs on it, a calendar that cannot prove anything, and a gate that has to be
   * passed are true of every organisation this deck is shown to; only the ASK differs,
   * and the ask is {@link PhasesGatesBrandBlock.closer}. They sit one tier under it —
   * `--neutral-200` against `--neutral-100`, same size, same shelf — because rank on
   * this stage is a colour tier and never a size.
   *
   * EACH ANSWERS THE QUESTION ITS SCENE PROVOKES. A staircase provokes "so we are
   * going to the top"; a published calendar provokes "so the plan is on track"; four
   * gates provoke "so when does each one happen". Prose, so all three carry keywords.
   */
  ladderThesis: "The plan covers three rungs of five. The top one is earned, not scheduled.",
  ladderThesisKw: ["earned, not scheduled"],

  phasesThesis: "A calendar says when the work happens. It cannot say whether it worked.",
  phasesThesisKw: ["whether it worked"],

  gatesThesis: "A date arrives on its own. A gate does not.",
  gatesThesisKw: ["A gate does not"],

  /**
   * What a column says when the organisation's roadmap does not reach that far —
   * the `ours` arm of {@link PhaseCalendar}.
   *
   * SHARED ACROSS BRANDS, AND THAT IS THE ARGUMENT. Neither published roadmap
   * reaches L3 or L4; a per-brand version of this line would be three copies of
   * one true sentence, and the first edit to one of them would make the deck say
   * that one organisation is further along than another on the strength of a
   * copy-edit. Prose, so it carries a keyword — it is the deck speaking, not a
   * calendar entry.
   */
  beyondRoadmap: "No roadmap reaches this far yet. The gate is what will decide it.",
  beyondRoadmapKw: ["No roadmap reaches this far yet"],
} as const;

// ═════════════════════════════════════════════════════════════════════════════
// K.3 · `mandate-levers` — four levers, one hero each, and the one desk all four
// arrive at. No brand axis; see the header of `./mandate-levers.tsx` for why this
// slide's reason is not K.1's. Everything below belongs to it.
//
// ═══ RE-CUT 2026-08-15 (owner's call), AND TWO THINGS WERE CUT OUTRIGHT.
//
//   · THE SIGN-OFF FORM. The retired stage drew four authority columns — `YOU`,
//     `THE COMMITTEE`, `GROUP HR`, `A BUDGET CYCLE` — and sixteen boxes, of which
//     twelve stayed empty, so the figure's argument was a COUNT OF ABSENCES. Only
//     one of the four columns is a person in the room. "The committee" is not a
//     body a BU or Division Head can name, and a room that stops to ask whose
//     boxes those are has stopped reading the levers. The claim is unchanged and
//     it is now made by CONVERGENCE: four curves leave four levers and arrive at
//     one box, and the box says `YOU`. A figure that draws only what it can name
//     cannot be asked a question it has no answer for.
//   · THE PROVENANCE BAND. It named an outside Group HR playbook and quoted its
//     four labels. That is provenance for the deck's author and noise for the
//     audience — the room has never read the document — so it is SPOKEN now and
//     not printed. K.1 retired its own band earlier in the same week and for the
//     same reason: on a top-management slide the largest object on the stage
//     should be the argument, not its footnote.
//
//     K.2 DID NOT, AND THIS BLOCK CLAIMED IT HAD UNTIL 2026-08-15. K.2's band is
//     live — {@link mandatePhasesGatesContent}'s `provenance`, drawn on the
//     `phases` pose by `./components/PhaseLadder.tsx` — and the distinction the
//     retired sentence lost is the whole point of the rule. THE TEST IS WHOSE
//     DOCUMENT IS BEING QUOTED. K.2 quotes the ROOM's own programme and roadmap
//     back to it, by name and with its own dates, and its closer then argues
//     against what that roadmap does not say; take the citation away and the
//     closer is an assertion. This slide quoted a THIRD PARTY's playbook at a room
//     that has never opened it, which cites nothing the audience can check. A
//     citation of the audience's own paper is evidence. A citation of somebody
//     else's is a footnote. Only the second one had to go.
//
// WHAT THE REWORDING STILL IS, AND WHERE IT IS NOW GUARDED. The four levers are
// not this deck's invention — they are an enablement playbook's, where they name
// what a GROUP FUNCTION owns. Printed unchanged in front of a Division Head they
// would be somebody else's job description, and the room's honest answer would be
// "then take it to them". So every one is restated as an act inside ONE person's
// authority, and the scoping is where the work is rather than in the verbs: "pay
// for it from the budget you already hold" is a different ask from "pay for it",
// and only one of the two can be signed in the room. {@link ownedByTheRoom} holds
// that as a RULE and not as a tone — every lever names the exact phrase in its own
// act that ties it to something the leader already holds, and the guard checks the
// assertion against the sentence at module load.
// ═════════════════════════════════════════════════════════════════════════════

/** One thing the leader in the room does, and the one hero pose it gets. */
export interface Lever {
  id: string;
  /**
   * Mono, uppercase. A LABEL, and keyword-free by the rule at the top of this
   * file. It is printed TWICE — as its hero pose's eyebrow and as its recap
   * card's name — and it is one string for exactly that reason: the room has to
   * recognise the card as the scene it already saw.
   *
   * A VERB PHRASE, NOT A NOUN, AND THAT IS THE REWORDING. The playbook these four
   * come from labels them as nouns, because a noun names what a group function
   * OWNS. Every label below is an imperative addressed to the person sitting in
   * front of it, which is the whole difference between the source and this slide.
   */
  label: string;
  /**
   * THE ACT — what the leader actually does, at hero size. Prose, so it carries
   * keywords.
   *
   * AN INSTRUCTION AND NEVER A DEFINITION, and every one names the thing the
   * leader signs rather than the thing that then exists. Held to
   * `HERO_ACT_BUDGET_CHARS` (`./levers-geometry.ts`): the hero budgets exactly two
   * lines, and a third does not overflow a box — it prints over the note under it.
   */
  act: string;
  actKw: readonly string[];
  /**
   * THE NOTE — why the act is the act, in one or two lines under it. Prose.
   *
   * IT ARGUES, IT DOES NOT ELABORATE. Each one names what happens WITHOUT the act,
   * because a room that already agrees needs no instruction and a room that does
   * not needs a reason. Held to `HERO_NOTE_BUDGET_CHARS`.
   */
  note: string;
  noteKw: readonly string[];
  /**
   * THE SAME ACT IN ONE LINE, for the recap card. Prose.
   *
   * A SEPARATE STRING AND NOT A TRUNCATION, because the recap is not a smaller
   * copy of the hero — it is the four acts in the PAST tense of a decision already
   * taken, which is what makes the convergence under them read as a signature and
   * not as four more asks. Held to `RECAP_LINE_BUDGET_CHARS`, the narrowest box on
   * the stage.
   */
  short: string;
  shortKw: readonly string[];
  /**
   * The bottom line of this lever's own hero pose — one tier under the closing
   * ask, on the same shelf, at the same size. Prose.
   *
   * IT IS A CONSEQUENCE AND NOT A SUMMARY. The act is above it; this says what the
   * organisation gets, or loses, and it is the sentence the room should be able to
   * repeat an hour later. Held to `THESIS_BUDGET_CHARS`.
   */
  thesis: string;
  thesisKw: readonly string[];
  /**
   * Which mark this lever's verb is drawn as.
   *
   * TYPED AS `string` AND NOT AS THE GLYPH UNION, because a content module may not
   * import a component. `components/LeverGlyphs.tsx` owns the set of ids a mark
   * exists for and `components/LeverBoard.tsx` checks this field against it at
   * module load — without that check, a lever naming an undrawn mark would compile
   * and render a 260px hole no bounding test reports.
   */
  glyph: string;
  /**
   * THE EXACT PHRASE IN {@link Lever.act} THAT PUTS THE ACT INSIDE THIS PERSON'S
   * AUTHORITY — and the whole of {@link ownedByTheRoom}.
   *
   * A SUBSTRING AND NOT A FLAG, which is the difference between a guard and a
   * comment. A boolean would be four `true`s the guard could never fail: a check
   * of the module against itself. A verbatim phrase makes each lever ASSERT which
   * words are doing the scoping, and the guard checks the assertion against the
   * sentence — so an author who rewords "from the budget you already hold" down to
   * "fund it" finds out at load that this slide can no longer print the lever.
   */
  scope: string;
}

/**
 * The guard that makes this slide's headline a property of the data.
 *
 * §6.8's levers are the ones a BU or Division Head can pull ALONE. That is not a
 * tone this copy happens to take — it is the criterion that decides whether a
 * sentence belongs on this stage at all, and the one thing about the slide a later
 * author is most likely to relax by writing a fifth lever that is merely good
 * advice. So it fails HERE, at load, in every deck that composes the slide, naming
 * the lever and the phrase it lost.
 *
 * IT REPLACES A GUARD OVER A FIELD THAT NO LONGER EXISTS. The retired form gave
 * every lever a `needs: readonly AuthorityId[]`, and `authorizableAlone` threw on
 * any lever that named an authority other than `"you"`. That field was the FORM's
 * data — it decided which of sixteen boxes were filled — and it went out with the
 * form. What survived is the property it protected, so the property is now held
 * over the copy directly: the scoping lives in the sentence the room reads, which
 * is where it was always doing the work.
 *
 * WHY NOT LEAVE IT TO THE TEST. A test reports the failure at CI, one commit later,
 * by which time the offending lever reads as finished copy and the reviewer's
 * question becomes "should we relax the rule?". A throw at load makes the answer
 * visible in the same edit: the slide does not render, and the message says which
 * criterion it failed. The test still holds the same property — the two are not
 * redundant, they fail at different moments and to different people.
 *
 * @throws naming the lever, the phrase it claims, and the criterion.
 */
function ownedByTheRoom(levers: readonly Lever[]): readonly Lever[] {
  for (const lever of levers) {
    if (lever.scope.trim().length === 0) {
      throw new Error(
        `ownedByTheRoom: lever "${lever.id}" claims no scoping phrase at all. Every lever ` +
          `on this slide has to name the words in its own act that put it inside one ` +
          `person's authority (§6.8) — an act with nothing holding it there is an ask for ` +
          `somebody who is not in the room.`,
      );
    }
    if (!lever.act.includes(lever.scope)) {
      throw new Error(
        `ownedByTheRoom: lever "${lever.id}" claims the scoping phrase “${lever.scope}”, ` +
          `which is not in its act — “${lever.act}”. Either the act was reworded and lost ` +
          `what made it authorizable alone, or the claim is stale. Both are the same bug: ` +
          `this slide cannot print a lever a Division Head has to take somewhere else.`,
      );
    }
  }
  return levers;
}

/**
 * The four levers, in the order the room reads them — one hero pose each, then all
 * four together.
 *
 * THE ORDER IS THE ORDER THEY GET PULLED IN, not a ranking: the time goes in the
 * calendar before anybody is named to fill it, the champion is named before there
 * is anybody to clear a seat for, access is cleared before there is anything to
 * fund, and the funding is the one that has to survive the quarter. Nothing on the
 * stage ranks them — one colour tier for all four names, one for all four lines,
 * one mark size per scene — because a lever nobody pulls takes the other three down
 * with it, exactly as K.1's pillars do.
 *
 * NO LEVER CARRIES A NUMBER OR AN ORDINAL, AND NONE MAY (§6.6). The deck carries
 * exactly two ordered vocabularies — `gap-capability-ladder`'s and K.2's — and
 * "Learn → Experiment → Build → Integrate → Own" was cut precisely so the room
 * would hold one set and not three. These four are not levels, not stages, and
 * nothing about them is ordered by maturity. An eyebrow reading "LEVER ONE" would
 * turn a list of four acts into a ladder by accident, which is why every hero's
 * eyebrow is the lever's own name and nothing else.
 *
 * EVERY ONE OF THEM IS SCOPED TO WHAT THE ROOM ALREADY OWNS, and {@link Lever.scope}
 * names the words that do it. That scoping is where the rewording actually happens
 * — not in the verbs.
 */
const LEVERS: readonly Lever[] = ownedByTheRoom([
  {
    id: "time",
    label: "MAKE IT OFFICIAL",
    glyph: "week",
    // The playbook's `Convene` — "create attendance, visibility, and mandate" — as
    // the two acts that actually create all three. The COMPANY calendar is what
    // makes attendance real; opening the first day is the visibility and the
    // mandate, and it is the half a leader delegates first.
    //
    // THE COMPANY CALENDAR AND NOT THE LEADER'S OWN, AS OF 2026-08-15 (owner's
    // call). It read "Put the sessions in the calendar as work, and be in the room
    // for the first one" and the owner's objection is exactly right: a Division
    // Head does not book their own training, and a lever that asks them to has
    // shrunk an act of authority into an act of admin. What only they can do is
    // declare the workshop part of the job and stand up at the start of it — their
    // team runs the rest. "BLOCK THE TIME" was the label that came with the old
    // reading, and it went with it.
    act: "Put the workshop in the company calendar as part of the job, and open the first day yourself.",
    actKw: ["as part of the job", "open the first day yourself"],
    note: "Your people watch what you do. If you skip the first day, they will treat it as extra work.",
    noteKw: ["watch what you do"],
    short: "The workshop is in the company calendar, and you open it.",
    shortKw: ["and you open it"],
    thesis: "People give time to what their leader gives time to.",
    thesisKw: ["what their leader gives time to"],
    scope: "in the company calendar as part of the job",
  },
  {
    id: "person",
    label: "NAME THE CHAMPIONS",
    glyph: "champion",
    // The playbook's `Champion` — "protect and recognize the champion role through
    // performance criteria". THE HOURS ARE THE PROTECTION AND THE TARGETS ARE THE
    // RECOGNITION, and both are inside a Division Head's own authority: a target
    // line is theirs to write. K.1's SUPPORT pillar says the role has to exist;
    // this says who signs for it.
    //
    // PLURAL, AS OF 2026-08-15 (owner's call), AND K.1'S PILLAR MOVED WITH IT. It
    // read "Name one person" — a count neither deck has a reason to make. A company
    // this size runs several champions, one per department or better, and a lever
    // that asks for ONE is a lever the room has to argue with before it can agree.
    // The mark moved too: `components/LeverGlyphs.tsx` raises TWO figures now, not
    // one, because a mark that shows a single person contradicts the sentence
    // beside it.
    act: "Name your champions, give them hours every week, and put the job into their targets.",
    actKw: ["hours every week", "into their targets"],
    note: "A champion with no hours is a volunteer. Volunteers stop when the day gets busy.",
    noteKw: ["is a volunteer"],
    short: "Champions named, hours given, the job in their targets.",
    shortKw: ["hours given"],
    thesis: "Work with no name on it belongs to nobody.",
    thesisKw: ["belongs to nobody"],
    scope: "put the job into their targets",
  },
  {
    id: "access",
    label: "OPEN THE ACCESS",
    glyph: "gate",
    // The playbook's `Unblock access` — "accelerate IT provisioning". THE ACT IS AN
    // INSTRUCTION TO TWO FUNCTIONS AND NOT A TICKET, which is the 2026-08-15
    // re-reading (owner's call). It read "Raise the request for seats and tools in
    // your own name, and put a date on it", and a request — however well signed —
    // is still somebody queueing. The person in this chair does not queue: they
    // tell IT and Finance, and the spend cap and the end date are what make that
    // instruction one those two functions can act on without a longer argument.
    //
    // THE THREE BOUNDS ARE §6.7's D.4, WORD FOR WORD WHERE THE DIGIT RULE ALLOWS.
    // That figure hands the room "a handful of seats · one named use case each · a
    // kill criterion · a spend cap" as the proof pilot that skips the deadlock, so
    // the cap and the end date arrive here as vocabulary the room already has. The
    // pilot's own length cannot be printed — this slide rejects every digit — and
    // "an end date" is the digit-free form of it.
    //
    // NO SHARED ACCOUNTS IN THE COPY. D.4 tells that story ("we did it on shared
    // accounts, and we were banned repeatedly") and telling it twice would spend
    // the room's attention on a failure they have already agreed about. The note
    // concedes the pilot instead — a handful IS enough — and spends its argument on
    // the one thing a leader might still get wrong: thinking a free account counts.
    act: "Tell IT and Finance to give every department accounts, with a spend cap and an end date.",
    actKw: ["Tell IT and Finance", "a spend cap and an end date"],
    note: "A handful of accounts is enough to start. A free account is not enough: it stops at chat.",
    noteKw: ["it stops at chat"],
    short: "Every department gets accounts, with a cap and an end date.",
    shortKw: ["with a cap and an end date"],
    // NOT "the tool is not for them" ANY MORE. That line argued the SIGNAL a blocked
    // person reads, which is true and is the smaller loss. The larger one is B.5's:
    // a browser chat is where L1 lives, and no amount of it ever becomes L3. Says so
    // without importing B.5's vocabulary, which this slide may not print (§6.6) —
    // "agentic" is the one word of it the room can carry alone.
    thesis:
      "Chat in a browser is less than half of the tool capability. Without company accounts, agentic work never starts.",
    thesisKw: ["less than half of the tool capability", "never starts"],
    scope: "Tell IT and Finance",
  },
  {
    id: "money",
    label: "KEEP IT FUNDED",
    glyph: "funding",
    // The playbook's `Sustain the rhythm` — "preserve calendars, funding, and
    // visibility" — plus the source's own review cadence. "THE BUDGET YOU ALREADY
    // HOLD" IS THE WHOLE REWORDING: it is what keeps the fourth lever off a budget
    // nobody in the room owns, and without it this is the one of the four that
    // would fail {@link ownedByTheRoom}. "Check the results yourself" rather than
    // "check the results", because a check somebody else runs arrives as a report,
    // and a report is what the programme already produces.
    //
    // "FUND THE RHYTHM" WAS THE LABEL UNTIL 2026-08-15, and a rhythm is not a thing
    // a room can picture. "KEEP IT FUNDED" is the same instruction with nothing to
    // decode, and the mini-thesis carries the argument the old label was reaching
    // for: a pilot has an end date and a budget line does not.
    act: "Pay for it from the budget you already hold, and check the results yourself each quarter.",
    actKw: ["the budget you already hold", "check the results yourself"],
    note: "A report tells you what happened. Your own check tells you what to do next.",
    noteKw: ["what to do next"],
    short: "Your own budget line, checked by you each quarter.",
    shortKw: ["checked by you"],
    thesis: "A pilot has an end date. A budget line does not.",
    thesisKw: ["A budget line does not"],
    scope: "from the budget you already hold",
  },
]);

// ───────────────────── the slide ─────────────────────

export const mandateLeversContent = {
  figLabel: "THE FOUR LEVERS",

  /**
   * The whole slide in one sentence, and the claim the recap has to keep.
   *
   * A leader hears a list of asks and starts sorting it into what they can do and
   * what they will have to take somewhere else. The headline answers that before
   * the sorting starts, so the four acts can be read as four acts rather than as
   * four requisitions.
   *
   * IT NO LONGER MENTIONS A SIGNATURE ANYBODY ELSE MIGHT WITHHOLD. The retired
   * version — "Not one of them needs a signature but yours" — was cut with the
   * form it belonged to: it answers a question by denying three answers, and a
   * room that has not been told who the three are hears a defence rather than a
   * claim. "You can start all four yourself" says the same thing forwards.
   *
   * "YOU ALREADY HOLD ALL FOUR" WAS THE 2026-08-15 MORNING VERSION and it lasted
   * one owner pass: you HOLD a lever is a figure of speech, and this deck now owes
   * the room a headline it can read at first sight. "Start" is also the truer verb
   * — none of the four is a thing the leader holds, all four are things they begin.
   */
  headline: "Four levers. You can start all four yourself.",
  headlineKw: ["start all four yourself"],

  levers: LEVERS,

  /** The recap's eyebrow. It names what the pose ADDS to the four scenes behind it
   *  — not the levers again, but where all four of them end. */
  recapEyebrow: "ALL FOUR, AND WHO SIGNS THEM",

  /**
   * The one word inside the sign box, and the only string on this slide set larger
   * than a label.
   *
   * SECOND PERSON, DELIBERATELY, ON THE ONE SLIDE IN THE LEADER DECK THAT ASKS FOR
   * SOMETHING. Everywhere else this section speaks about a programme; here the
   * figure points at the person in the chair, because the whole re-cut exists to
   * stop the slide pointing at bodies the room cannot name.
   */
  signLabel: "YOU",

  /** The mono line under the sign box — what the convergence says in shape, said
   *  once in words for the room that reads rather than looks. Keyword-free: it is a
   *  label on the figure, not a sentence the deck is arguing. */
  signNote: "NOBODY ELSE HAS TO AGREE",

  /**
   * The recap's own bottom line — one tier under the closing ask, same shelf, same
   * size.
   *
   * IT NAMES THE SIGNATURE AND NOT THE ABSENTEES, which is the whole difference
   * between this pose and the form it replaced. Four actions, one signature, and
   * the room can check that by counting the curves.
   *
   * "END AT THE SAME DESK" WAS THE 2026-08-15 MORNING VERSION. A desk is a place
   * and the claim is not about a place — the box under the curves says `YOU` and
   * the word for what `YOU` supplies is a signature. It also stops the recap and
   * the sign note saying the same thing twice from two directions.
   */
  recapThesis: "Four actions, and all four need the same signature.",
  recapThesisKw: ["the same signature"],

  /**
   * The ask, and the last thing THE MANDATE says before the deck moves on.
   *
   * IT DOES NOT RESTATE THE HEADLINE, which is the temptation on a slide whose
   * headline is already its claim. The headline says the four are theirs; this says
   * what follows — that with nobody to wait for, the absence of a decision is
   * itself the decision, and it is one the room takes rather than one that happens
   * to it. That is the whole difference between a slide that describes an
   * enablement model and a slide that asks for one.
   *
   * IT CLOSES THE SECTION. K.1 asked the room which block it clears first, K.2
   * handed it a gate, and there is no fourth slide to hand this to: the next thing
   * the deck does is stop asking.
   */
  closer: "Not deciding is also a decision. And there is nobody else to wait for.",
  closerKw: ["Not deciding is also a decision"],
} as const;
