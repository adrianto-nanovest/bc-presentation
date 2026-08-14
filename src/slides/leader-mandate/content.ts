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
// K.1 (`mandate-enablement`) EXPORTS NO BRAND PICK. §6.8's model is "GENERIC
// PILLARS AND TRACKS, ONE SPECIFIC BOTTLENECK". The pillars and the tracks are
// generic BY CONSTRUCTION — they describe how any organisation turns a workshop
// into a standing capability, they name no department, no system and no
// headcount, and there is therefore nothing for a brand to vary. The bottleneck
// is the single specific thing on that stage, and exactly ONE organisation has
// stated its own: DigiTech's brief to this workshop (`docs/prompts/gems-catalyst.md`).
// We hold no equivalent statement for the other brand, so a `Record<Brand, …>`
// there would be a slot with one real entry and two that could only be filled by
// writing a bottleneck nobody stated — the speculation §6.8 exists to prevent,
// made to type-check. `tests/unit/mandate-enablement.test.tsx` holds that as a
// RULE and not a spot check: exactly one rendered string on K.1 may name an
// organisation, it is {@link mandateEnablementContent.bottleneck.source}, and
// every other string on every pose is checked against the brand vocabulary.
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
// K.3 (`mandate-levers`) EXPORTS NONE EITHER, AND NOT FOR K.1'S REASON — which is
// why the two are argued separately rather than filed together as "the slides
// without an axis". K.1 has no axis because its SUBJECT is generic by
// construction and the one specific thing on its stage is somebody else's quoted
// sentence. K.3 has no axis because its subject is THE PERSON IN THE ROOM, and
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
// the headline, the four pillar lines, the three track lines, the bottleneck's
// statement and the closer; K.2's is the headline, the four gate lines, the
// beyond-the-roadmap line, the band's statement and the closer; K.3's is the
// headline, the four lever lines, the band's statement and the closer.
// Everything else is the mono LABEL register: fig labels, headings, pillar and
// track names, PHASE LABELS AND STATES, rung names, calendar rows, LEVER LABELS,
// AUTHORITY LABELS, the three bands' eyebrows and all three CITATIONS. A copper
// italic inside a mono label reads as a rendering fault, and inside a citation it
// reads as the deck emphasising a fragment of somebody else's sentence — so the
// three source lines are the sharpest case of the rule and the tests hold the
// registers apart as lists.
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
//     and they must keep naming structures. "Someone named to ask on the Tuesday
//     after the room empties" is a thing that has to exist; "Name one person,
//     protect their hours, and write it into their objectives" is a thing a
//     leader does. The first is authored under {@link Pillar.line} and the second
//     under {@link Lever.line}, and the file boundary between them is one screen,
//     which is exactly why the rule is written down.
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
   * What that pillar means, in ONE LINE. Prose, so it carries keywords.
   *
   * A DEFINITION AND NOT AN INSTRUCTION. See the header: a line that told the
   * leader what to do would be one of K.3's levers arriving a slide early.
   *
   * HELD TO `ONE_LINE_BUDGET_CHARS`. `./geometry.ts` budgets exactly one line per
   * row, so a wrapped line overlaps the row beneath it rather than overflowing a
   * box — and the test enforces the budget on the copy, where an author can act
   * on it.
   */
  line: string;
  lineKw: readonly string[];
}

/**
 * The four pillars, in the order the room reads them down the column.
 *
 * THE ORDER IS THE SEQUENCE OF A PROGRAMME, not a ranking: you clear access
 * before you teach, you teach before people practise, and support is what stands
 * after the room empties. Nothing on the stage ranks them — one colour tier for
 * all four, four identical marks (`./geometry.ts`) — because a pillar that is
 * missing takes the other three down with it, which is the whole reason the word
 * "pillar" is the right one and "priority" is not.
 *
 * FOUR, AND WHY NOT FIVE. Measurement was the obvious fifth and is refused here:
 * `mandate-phases-gates` (K.2) is entirely about when the programme is judged and
 * on what, so a measurement pillar would announce that argument one slide before
 * it is made and leave K.2 restating it. The count is not sacred — a fifth pillar
 * re-cuts the column through `rowPitch` and needs no other edit — but it needs
 * an argument, and "the list felt short" is not one.
 */
const PILLARS: readonly Pillar[] = [
  {
    id: "access",
    label: "ACCESS",
    // Indexes §6.7's D.5 (`invest-subscription` — company-managed seats) without
    // naming it, on the same mechanism `leader-shape`'s decisions use: the room
    // hears "seats" again in the section this one closes over.
    line: "Seats and tools cleared before the first session, not after it.",
    lineKw: ["before the first session"],
  },
  {
    id: "curriculum",
    label: "CURRICULUM",
    // "taught the same way" is the generic form of A.1's own curriculum row —
    // the movement the leader agenda already calls THE CURRICULUM — and "kept
    // current" is what separates a programme from a slide deck somebody ran once.
    line: "One body of material, taught the same way, and kept current.",
    lineKw: ["kept current"],
  },
  {
    id: "practice",
    label: "PRACTICE",
    // The Practice Lab's own premise, generically stated: the lab hands every
    // participant a real case rather than a toy one. Names neither the lab nor
    // the competition — both are brand-and-programme facts and belong to K.2.
    line: "Real work, not exercises — a problem the team already owns.",
    lineKw: ["a problem the team already owns"],
  },
  {
    id: "support",
    label: "SUPPORT",
    // THE PILLAR MOST AT RISK OF BECOMING A LEVER, and the second lever is now in
    // this file to be read against ({@link LEVERS}, `champion`): "Name one person,
    // protect their hours, and write it into their objectives" — the leader's ACT.
    // This line says only that the role has to exist and has to be reachable
    // after the event, which is the structure the lever funds. "Someone named",
    // not "you name someone".
    line: "Someone named to ask on the Tuesday after the room empties.",
    lineKw: ["on the Tuesday after"],
  },
];

// ───────────────────── the tracks ─────────────────────

/** One depth of enablement, and who reaches it. */
export interface Track {
  id: string;
  /** Mono, uppercase, one word. A LABEL, keyword-free — and measured: the
   *  longest of the three is what `NARROWEST_LANE` in `./geometry.ts` is cut
   *  against, so a longer name is a layout change and not only a copy one. */
  name: string;
  /** What that track gets, in ONE LINE. Prose, keywords, and the same
   *  {@link Pillar.line} budget for the same reason. */
  line: string;
  lineKw: readonly string[];
}

/**
 * The three tracks, WIDEST FIRST — most people, least depth, at the top.
 *
 * READING DOWN THE COLUMN IS GOING DEEPER, which is why the order is not
 * reversible: the lane bars narrow as the reader descends (`laneWidth` in
 * `./geometry.ts`) and the colour tier brightens, so the two encodings agree with
 * the reading direction. Flipped, the figure would say the same thing and read
 * as a funnel standing on its point.
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
const TRACKS: readonly Track[] = [
  {
    id: "everyone",
    name: "EVERYONE",
    // "stop improvising" is `leader-shape`'s governance decision heard again —
    // C.1 says the leader writes the rule down "before someone improvises", and
    // this is the training half of that same sentence. The anchor word is
    // load-bearing, not decorative: reword it and this track stops indexing C.1.
    line: "Enough to stop improvising, and to know what may not go in.",
    lineKw: ["stop improvising"],
  },
  {
    id: "builders",
    name: "BUILDERS",
    // "their own team runs" is the difference between a prototype and a
    // capability, and it is the one thing this track has to buy with the hours it
    // costs. No count, no percentage — see `laneWidth`.
    line: "Depth, and the hours to build something their own team runs.",
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

// ───────────────────── the bottleneck ─────────────────────

/**
 * The epistemic qualifier the bottleneck's source line MUST end in.
 *
 * A CONSTANT, AND EXPORTED, for the same structural reason
 * `leader-invest`'s `NOT_AUDITED` is one. This deck holds NO adoption assessment
 * for either organisation (§6.5, confirmed on #8), so the bottleneck below is a
 * CLAIM ITS OWNER MADE and not a finding anybody measured — and the difference
 * has to survive a reword. The test asserts the source line ends in this value,
 * so a rewrite that drops the qualifier fails here rather than shipping a
 * projected sentence that reads as a measurement.
 *
 * "us" is the deck, not the room: the workshop measured nothing. Saying so is
 * what makes it fair to put another organisation's stated bottleneck on a stage
 * at all.
 */
export const STATED_NOT_MEASURED = "Stated by them, not measured by us.";

/**
 * DigiTech's own stated bottleneck — THE ONLY SPECIFIC CONTENT ON THIS SLIDE
 * (§6.8), and the only string on it that may name an organisation.
 *
 * THREE LINES, AND EACH ONE IS A DIFFERENT KIND OF SENTENCE. That separation is
 * the honesty of the band, and collapsing any two of them loses it:
 *
 *   · `eyebrow`  — says what the room is looking at, and says that it is the one
 *                  specific thing here. Mono label.
 *   · `statement`— THE DECK'S OWN COMPRESSION of the brief, in the deck's words.
 *                  §6.8 words it exactly this way. It carries NO quotation marks,
 *                  because it is not a quotation: presenting a paraphrase inside
 *                  quotes is the small lie this three-line split exists to make
 *                  impossible.
 *   · `source`   — the brief's OWN WORDS, in quotes, attributed, and closing on
 *                  {@link STATED_NOT_MEASURED}. Mono, sentence case, keyword-free
 *                  — a citation the deck emphasises a fragment of is a citation
 *                  the deck has started arguing with.
 *
 * THE QUOTED SENTENCE IS ALSO ON `gap-capability-ladder`, under GEMS, where it
 * licenses that slide's open question. DELIBERATE, and the two must stay
 * byte-identical inside the quotation marks: one source quoted two ways in one
 * deck is a source the room stops trusting. They are authored separately rather
 * than shared through an import — `leader-gap` reaches it through a brand pick
 * this slide does not have, and importing another section's brand table to
 * borrow one string would couple two runs for a sentence — so
 * `tests/unit/mandate-enablement.test.tsx` holds them equal instead, and names
 * that as the reason on failure.
 *
 * IN A BERAU LEADER DECK THIS BAND NAMES ANOTHER ORGANISATION, ON PURPOSE. It is
 * the only stated bottleneck the deck has; the alternative is to invent one, and
 * the closer is what makes the honest version work — the model is generic, this
 * is one organisation's specific, and naming your own is the room's job. See the
 * header for why that is a decision rather than a gap.
 */
const BOTTLENECK = {
  /** Mono label. Names the slide's own structure — generic everywhere else, one
   *  specific thing here — which is what stops the band reading as a diagnosis
   *  of the room in front of it. */
  eyebrow: "THE ONE SPECIFIC THING ON THIS SLIDE",

  /** §6.8's own wording. Prose, so it carries a keyword; NO quotation marks —
   *  see above. */
  statement: "Adoption is concentrated in one function.",
  statementKw: ["concentrated in one function"],

  /**
   * The citation, on the slide rather than in a footnote. Keyword-free.
   *
   * TRIMMED WITH THE LADDER'S, 2026-08-13. `gap-capability-ladder` prints the same
   * brief to license its open question and lost the trailing clause — "— even some
   * DigiTech members still falling behind" — when that slide's copy was cut back;
   * `mandate-enablement.test.tsx` holds the two quotations identical, because a
   * room that hears one source worded two ways stops trusting the source. The
   * dropped clause was the stronger half, so no claim here grew by losing it — and
   * this band's own statement is that adoption is concentrated in ONE function,
   * which that clause slightly argued against.
   */
  source:
    "DigiTech's own brief: “outside DigiTech, AI adoption is not really adopted " +
    `well.” ${STATED_NOT_MEASURED}`,
} as const;

// ───────────────────── the slide ─────────────────────

export const mandateEnablementContent = {
  figLabel: "THE ENABLEMENT MODEL",

  /**
   * The premise, and the refusal the rest of the slide depends on.
   *
   * A leader hears "enablement" as a line item. The headline names what is
   * actually being authorized — a structure that stands after the event — before
   * the columns show what it is made of, because a room that has already priced
   * the slide as training reads four pillars as four invoices.
   */
  headline: "Enablement is a structure, not a training budget.",
  headlineKw: ["a structure"],

  /** Mono headings, keyword-free. Each names its column's QUESTION rather than
   *  its contents, so the two columns read as two different questions about one
   *  programme instead of as two lists. */
  pillarsHeading: "THE PILLARS · WHAT IT IS MADE OF",
  tracksHeading: "THE TRACKS · WHO IT REACHES, AND HOW DEEP",

  pillars: PILLARS,
  tracks: TRACKS,
  bottleneck: BOTTLENECK,

  /**
   * The ask, and the sentence that makes the band above it fair.
   *
   * It says out loud what the slide's structure already claims: the pillars and
   * the tracks travel to any organisation, and the one thing that decides whether
   * the programme works cannot be handed over with them. That is also what turns
   * another organisation's quoted bottleneck from a comparison into an example —
   * the room is not being told what its bottleneck is, it is being told that
   * naming it is the part it owns.
   *
   * IT HANDS OVER TO K.2. The next slide is phases and gates; a room that has
   * just been asked to name its own bottleneck is a room ready to be shown what
   * gets measured and when.
   */
  closer: "The pillars and the tracks are generic. Naming the bottleneck is the part only you can do.",
  closerKw: ["generic", "only you can do"],
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
    gate: "The post-assessment moves, not just the attendance sheet.",
    gateKw: ["The post-assessment moves"],
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
   * The full-width band under the columns — THE SAME THREE-LINE SHAPE K.1's
   * bottleneck uses, deliberately: the two slides are adjacent, and a room that
   * has just learned to read `eyebrow / statement / citation` on K.1 should not
   * have to learn a second band one slide later.
   *
   *   · `eyebrow`    — what the room is looking at. Mono label.
   *   · `statement`  — THE DECK'S OWN sentence, in the deck's words, unquoted.
   *   · `provenance` — the organisation's OWN words, in quotes and attributed.
   *                    Mono, sentence case, keyword-free.
   */
  band: {
    eyebrow: string;
    statement: string;
    statementKw: readonly string[];
    provenance: string;
  };
  /** The ask. On this axis because the two organisations are being asked
   *  DIFFERENT things — one for a decision on a day that has already arrived, one
   *  for what has to be true before a date still months out — and a shared line
   *  would be false in one of the two rooms. */
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
 * hand out entry on a date. So the band quotes rather than argues, and the closer
 * asks only for what has to be true before January.
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
    // programme title is quoted once, in the band, where it has room to be quoted
    // whole rather than truncated into a label.
    p1: { kind: "theirs", rows: ["AI FORGE · FROM W1 JAN 2027", "5 MONTHS · 3 PHASES"] },
    p2: { kind: "ours" },
    p3: { kind: "ours" },
  },
  band: {
    eyebrow: "THE ROADMAP ALREADY NAMES THE DESTINATION",
    statement: "This is not a new direction. It is the operating model AI Forge is aimed at.",
    statementKw: ["not a new direction", "the operating model AI Forge is aimed at"],
    // Their words in quotes, ours around them, attributed to the programme
    // document — the same construction as K.1's bottleneck source and for the
    // same reason. TWO quoted fragments, because the two do different work: the
    // TITLE is the destination and "the post-assessment result" is the gate, and
    // a room that hears only one of them hears either an ambition with no test or
    // a test with no purpose.
    provenance:
      "GEMS' own programme: “AI Forge — Deep AI Skills to Build an Agentic " +
      "Organization”, starting W1 Jan 2027, with entry dependent on “the " +
      "post-assessment result”.",
  },
  closer: "January is already on the calendar. The gates above are what has to be true before it.",
  closerKw: ["what has to be true before it"],
};

/**
 * Berau — P0 is COMPLETE, and the gate out of it is the day this deck is shown.
 *
 * SOURCE: `docs/references/berau-presentation-plan.pdf` p3, the "Berau Coal AI
 * Journey" row — pre-assessment 27 Apr–17 May, workshop W3 May & W2 Jun,
 * competition Jun–Jul, post-assessment Jul–Aug, then "Post Program AI
 * Development · After Aug". §6.8 compresses the three delivered stages to
 * May–Jun / Jun–Jul / Jul–Aug and this block follows it.
 *
 * AUG 18 IS NOT A DATE ON THIS SLIDE, IT IS THE GATE. Every other date here
 * belongs to a phase that is over. The leader session lands exactly on the
 * boundary their own roadmap draws, which means the room is not being asked to
 * plan a programme — it is being asked to decide, that morning, whether the one
 * that finished has a next stage. That is the single hardest thing this deck
 * says, and it is why the band and the closer are on the brand axis at all.
 */
const BERAU_BLOCK: PhasesGatesBrandBlock = {
  calendars: {
    // §6.8's three ranges, each under the stage that produced it, so "complete"
    // is legible as three delivered things rather than as a claim.
    p0: {
      kind: "theirs",
      rows: ["WORKSHOP · MAY–JUN", "COMPETITION · JUN–JUL", "POST-ASSESSMENT · JUL–AUG"],
    },
    // Their own label for the next stage, and their own window. Split across two
    // rows because it is a programme name and a date, not one string — and
    // because the whole title on one row overruns the column.
    p1: { kind: "theirs", rows: ["POST PROGRAM AI DEVELOPMENT", "AFTER AUG"] },
    p2: { kind: "ours" },
    p3: { kind: "ours" },
  },
  band: {
    eyebrow: "AUG 18 IS THE GATE",
    statement: "P0 is complete. What is funded on Aug 18 decides whether there is a P1.",
    statementKw: ["decides whether there is a P1"],
    provenance:
      "Berau Coal's own journey: workshop, competition and post-assessment are done, " +
      "and the stage their roadmap puts after them is “Post Program AI Development — " +
      "After Aug”.",
  },
  // THE ONE PLACE IN THIS SECTION WHERE AN IMPERATIVE IS CORRECT, and it is worth
  // naming because K.1's header forbids exactly this shape one slide earlier: a
  // pillar that starts with a verb aimed at the leader has become one of K.3's
  // levers. This is not a lever. K.3's fourth is "fund the rhythm and review
  // quarterly" — a standing practice. This is a fact with an expiry date on it:
  // people were named AI Ambassadors, the programme that named them has ended,
  // and the deck's own honesty requires saying what happens to them if nothing is
  // decided. §6.8 words it this way, and softening it would be the deck declining
  // to make the ask it flew there to make.
  closer: "The AI Ambassadors already exist. Fund them, or lose them.",
  closerKw: ["Fund them, or lose them"],
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
 * band cites nothing. Whoever registers `general-leader` will have to write the
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
  band: {
    eyebrow: "NO PROGRAMME IS NAMED IN THIS DECK",
    statement: "This deck names no organisation, so no phase here has a date.",
    statementKw: ["no phase here has a date"],
    provenance: "No organisation is named in this deck, so there is no programme to quote.",
  },
  closer: "Nothing above is dated, because nothing here is anybody's programme yet.",
  closerKw: ["nothing here is anybody's programme yet"],
};

/**
 * This slide's calendars, band and closer, brand by brand.
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
   * The whole slide in one sentence, and the refusal the columns then have to
   * keep.
   *
   * A leader reads a phased plan as a timeline and asks when each phase ends. The
   * headline answers before the question is asked, so the calendar rows below can
   * be exactly what they are — the organisation's own published dates — without
   * the room mistaking them for what actually ends a phase.
   */
  headline: "Four phases. Each one ends on a gate, not on a date.",
  headlineKw: ["a gate, not on a date"],

  /**
   * The staircase's own heading — `gap-capability-ladder`'s FIG LABEL, imported,
   * plus four words.
   *
   * COMPOSED FROM `gapLadderContent.figLabel` RATHER THAN RE-TYPED. The room read
   * those three words under a staircase an hour ago; printing the identical
   * string over the identical shape is the cheapest and loudest way to say "this
   * is the same object", and taking it from the other slide's own export means a
   * rename there cannot leave this heading quoting a label nothing prints. Mono,
   * keyword-free.
   */
  ladderHeading: `${gapLadderContent.figLabel} · READ AS A PLAN`,

  /** The phase band's heading. Mono, keyword-free, and it names the column's
   *  QUESTION rather than its contents — the same construction K.1's two headings
   *  use, one slide earlier. */
  phasesHeading: "THE PHASES · WHAT HAS TO BE TRUE TO LEAVE EACH ONE",

  rungs: LADDER_RUNGS,
  phases: PHASES,

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
  beyondRoadmap: "No roadmap reaches this far yet. The gate is what would decide it.",
  beyondRoadmapKw: ["No roadmap reaches this far yet"],
} as const;

// ═════════════════════════════════════════════════════════════════════════════
// K.3 · `mandate-levers` — the four levers, and the form beside them. No brand
// axis; see the header for why this slide's reason is not K.1's. Everything
// below belongs to it.
// ═════════════════════════════════════════════════════════════════════════════

// ───────────────────── who a lever could have to wait on ─────────────────────

/**
 * The four things a leader's act could be blocked by, as a closed set of ids.
 *
 * A `const` TUPLE AND NOT A BARE STRING, for the reason {@link PhaseId} is one:
 * {@link Lever.needs} is keyed by this union, so a lever that names an authority
 * this deck never drew a column for fails to compile rather than pointing at a
 * cell the form does not have.
 *
 * THREE OF THE FOUR ARE HERE ONLY TO BE EMPTY, and that is the point rather than
 * an oversight. §6.8's levers are the ones a BU or Division Head can pull ALONE —
 * "nothing that needs the committee, Group-HR or a budget cycle they do not own" —
 * and a slide that only ever drew the column it fills would be asserting that
 * property in prose while the figure said nothing. Naming the three refusals is
 * what turns the claim into something the room can check by counting.
 */
export const AUTHORITY_IDS = ["you", "committee", "groupHr", "budget"] as const;
export type AuthorityId = (typeof AUTHORITY_IDS)[number];

/** One column of the form — somebody or something a lever could have to wait on. */
export interface Authority {
  id: AuthorityId;
  /**
   * Mono, uppercase. A LABEL, and keyword-free by the rule at the top of this
   * file.
   *
   * HELD TO `AUTHORITY_LABEL_BUDGET_CHARS` (`./levers-geometry.ts`). This is the
   * narrowest box on the stage — one of four columns in a 492px form — and a head
   * that wraps does not overflow its column, it pushes the form's head rule down
   * into the first lever row.
   */
  label: string;
}

/**
 * The one authority every lever on this slide needs, and the only one.
 *
 * EXPORTED AND NAMED, rather than written as the string `"you"` in the three
 * places that care, for the same structural reason `STATED_NOT_MEASURED` above is
 * a constant: it is the slide's whole claim, it is read by the guard below, by
 * the figure that fills the cells and by the test that holds the property, and a
 * claim spelled out three times is a claim two of the three can stop making.
 */
export const SOLE_AUTHORITY: AuthorityId = "you";

/**
 * The four columns, in the order the room reads them left to right.
 *
 * THE ORDER IS THE ANSWER FIRST. `YOU` is the leftmost column because the room
 * reads left to right and the slide's answer is the first thing it should reach;
 * the three refusals follow, and they follow in ascending order of how long each
 * one would take — a committee meets, a group function has a queue, a budget cycle
 * takes a year. Reversed, the figure would build suspense the deck has no reason
 * to build: this is the section's ask, not its reveal.
 *
 * NONE OF THE THREE REFUSALS NAMES AN ORGANISATION, which is what keeps the form
 * generic and what stops it asserting anything about either room's internal
 * structure. `GROUP HR` is a function every group has and is deliberately not
 * `NANOVEST GROUP HR` — the column asks whether the leader in this room needs
 * THEIR group's HR to sign, and the answer is no. The band below cites a specific
 * Group HR playbook by name, and it is a DIFFERENT organisation's; see
 * {@link PLAYBOOK} on why the two must not be collapsed.
 */
const AUTHORITIES: readonly Authority[] = [
  { id: "you", label: "YOU" },
  { id: "committee", label: "THE COMMITTEE" },
  { id: "groupHr", label: "GROUP HR" },
  { id: "budget", label: "A BUDGET CYCLE" },
];

// ───────────────────── the levers ─────────────────────

/** One thing the leader in the room does, and what it waits on. */
export interface Lever {
  id: string;
  /**
   * Mono, uppercase. A LABEL, keyword-free.
   *
   * A VERB PHRASE, NOT A NOUN, AND THAT IS THE REWORDING. The playbook these four
   * come from labels them `Convene · Champion · Unblock access · Sustain the
   * rhythm` — nouns, because they name what a group function OWNS. Printed here
   * those labels would be the deck asking the room to authorize somebody else's
   * job description. Every label below is an imperative addressed to the person
   * sitting in front of it, which is the whole difference between the source and
   * this slide and the reason {@link PLAYBOOK} quotes the source rather than
   * repeating it.
   */
  label: string;
  /**
   * What that act actually is, in ONE LINE. Prose, so it carries keywords.
   *
   * AN INSTRUCTION AND NEVER A DEFINITION — the exact inverse of
   * {@link Pillar.line}, and the second half of the lever/pillar boundary the
   * header states. A line that described a structure would be K.1's pillar
   * restated two slides later, and the room would have paid a click for it. Every
   * one is an IMPERATIVE with the "you" left implicit, and each one names the
   * thing the leader signs rather than the thing that then exists.
   *
   * HELD TO `LEVER_LINE_BUDGET_CHARS` (`./levers-geometry.ts`). The board budgets
   * exactly one line per row, so a wrapped line does not overflow a box — it
   * overlaps the row beneath it, which reads on a projector as a font that failed
   * to load.
   */
  line: string;
  lineKw: readonly string[];
  /**
   * Whose sign-off this lever waits on — the row's cells in the form.
   *
   * AN ARRAY, THOUGH IT ONLY EVER HOLDS ONE ENTRY, and the generality is what the
   * figure runs on rather than slack left for a future that will not come. The
   * form draws SIXTEEN cells and fills them from this field alone: filled where
   * the row needs that column, a hairline frame where it does not. The rejected
   * shape was a per-lever boolean beside a hand-written list of which cells stay
   * empty — two lists that agree today and are one edit from a form with a filled
   * cell nobody authored, which reads as a rendering fault rather than as a
   * mistake.
   *
   * AND IT IS GUARDED AT MODULE LOAD. See {@link authorizableAlone}: a lever that
   * needs anything but {@link SOLE_AUTHORITY} takes this module down in every deck
   * that composes it, rather than drawing a second filled column under a headline
   * that denies one exists.
   */
  needs: readonly AuthorityId[];
}

/**
 * The guard that makes this slide's headline a property of the data.
 *
 * §6.8's levers are the ones a BU or Division Head can pull ALONE. That is not a
 * tone this copy happens to take — it is the criterion that decides whether a
 * sentence belongs on this stage at all, and the one thing about the slide a
 * later author is most likely to relax by writing a fifth lever that is merely
 * good advice. So it fails HERE, at load, in every deck that composes the slide,
 * naming the lever and the authority it smuggled in.
 *
 * WHY NOT LEAVE IT TO THE TEST. A test reports the failure at CI, one commit
 * later, by which time the offending lever reads as finished copy and the
 * reviewer's question becomes "should we relax the rule?". A throw at load makes
 * the answer visible in the same edit: the slide does not render, and the message
 * says which criterion it failed. The test still holds the same property — the two
 * are not redundant, they fail at different moments and to different people.
 *
 * @throws naming the lever, the authorities it named, and the criterion.
 */
function authorizableAlone(levers: readonly Lever[]): readonly Lever[] {
  for (const lever of levers) {
    if (lever.needs.length === 1 && lever.needs[0] === SOLE_AUTHORITY) continue;
    throw new Error(
      `authorizableAlone: lever "${lever.id}" waits on ` +
        `${lever.needs.length === 0 ? "nobody at all" : lever.needs.join(", ")}, and every ` +
        `lever on this slide must wait on "${SOLE_AUTHORITY}" and on nothing else ` +
        `(§6.8). A lever a BU or Division Head cannot authorize alone is not a lever ` +
        `this slide can print — it is an ask for somebody who is not in the room.`,
    );
  }
  return levers;
}

/**
 * The four levers, in the order the room reads them down the board.
 *
 * THE ORDER IS THE ORDER THEY GET PULLED IN, not a ranking: the time goes in the
 * calendar before anybody is named to fill it, the champion is named before there
 * is anybody to clear a seat for, access is cleared before there is anything to
 * fund, and the funding is the one that has to survive the quarter. Nothing on
 * the stage ranks them — one colour tier for all four labels, one for all four
 * lines, one filled cell each — because a lever nobody pulls takes the other
 * three down with it, exactly as K.1's pillars do.
 *
 * FOUR, AND THEY ARE THE PLAYBOOK'S FOUR, REWORDED. §6.8 names them and
 * {@link PLAYBOOK} cites where they come from. A fifth would have to be a fifth
 * lever in the source too, or the band under them stops being true — which is the
 * cheapest guard this list has against growing by whatever felt missing on the
 * day.
 *
 * EVERY ONE OF THEM IS SCOPED TO WHAT THE ROOM ALREADY OWNS, and that scoping is
 * where the rewording actually happens — not in the verbs. "Fund it from the line
 * you already hold" is a different ask from "fund it", and only one of the two
 * survives {@link authorizableAlone}. Same for "under your own name" on the third:
 * the leader sponsors the request, which is theirs to do, rather than approving a
 * purchase, which may not be.
 *
 * `needs` IS WRITTEN AS A LITERAL ON EVERY ROW AND NOT AS `[SOLE_AUTHORITY]`, and
 * the difference is the whole value of the guard. Spelled with the constant, all
 * four rows would be boilerplate the guard could never fail — a check of the
 * module against itself. Spelled as a literal, each lever ASSERTS whose signature
 * it waits on and {@link authorizableAlone} CHECKS that assertion against the
 * criterion, which is also the shape a fifth lever will be written in: an author
 * adding one types what it needs, and finds out at load whether this slide can
 * print it.
 */
const LEVERS: readonly Lever[] = authorizableAlone([
  {
    id: "calendar",
    label: "BLOCK THE TIME",
    // The playbook's `Convene` — "create attendance, visibility, and mandate" —
    // as the two acts that actually create all three. "As work" is what makes
    // attendance real; being in the room for the first session is the visibility
    // and the mandate, and it is the half a leader delegates first.
    line: "Put the sessions in the calendar as work, and be in the room for the first one.",
    lineKw: ["as work", "be in the room"],
    needs: ["you"],
  },
  {
    id: "champion",
    label: "NAME A CHAMPION",
    // The playbook's `Champion` — "protect and recognize the champion role through
    // performance criteria". THE HOURS ARE THE PROTECTION AND THE OBJECTIVES ARE
    // THE RECOGNITION, and both are inside a Division Head's own authority: an
    // objective line is theirs to write. K.1's SUPPORT pillar says the role has to
    // exist; this says who signs for it.
    line: "Name one person, protect their hours, and write it into their objectives.",
    lineKw: ["protect their hours", "into their objectives"],
    needs: ["you"],
  },
  {
    id: "access",
    label: "CLEAR ACCESS AND PROCUREMENT",
    // The playbook's `Unblock access` — "accelerate IT provisioning". THE ACT IS
    // THE SPONSORSHIP, NOT THE APPROVAL, which is the distinction that keeps this
    // lever inside one person's authority: raising the request under your own name
    // and dating it is what a Division Head does, and it is what turns a ticket
    // nobody owns into one somebody answers. Indexes §6.7's D.5 without naming it
    // — the room heard "seats" there.
    line: "Raise the seat and tooling request under your own name, and put a date on it.",
    lineKw: ["under your own name", "put a date on it"],
    needs: ["you"],
  },
  {
    id: "rhythm",
    label: "FUND THE RHYTHM",
    // The playbook's `Sustain the rhythm` — "preserve calendars, funding, and
    // visibility" — plus the source's own review cadence, "adoption dashboards and
    // quarterly reviews". "THE LINE YOU ALREADY HOLD" IS THE WHOLE REWORDING: it
    // is what keeps the fourth lever off a budget cycle nobody in the room owns,
    // and without it this is the one of the four that would fail
    // {@link authorizableAlone}. "Review it yourself" rather than "review it",
    // because a review somebody else runs is a report, and a report is what the
    // programme already produces.
    line: "Fund it from the line you already hold, and review it yourself every quarter.",
    lineKw: ["the line you already hold", "every quarter"],
    needs: ["you"],
  },
]);

// ───────────────────── where the four came from ─────────────────────

/**
 * The Group HR playbook these four levers are reworded FROM — the section's third
 * printing of the same three-line band, and the one that makes "reworded" honest
 * rather than asserted.
 *
 * WHY THIS SLIDE HAS A BAND AT ALL, argued once here because a third band in
 * three consecutive slides is the decision a reader will question first. The four
 * levers are not the deck's invention. They are `Convene · Champion · Unblock
 * access · Sustain the rhythm`, and printing them without their source would be
 * this deck taking credit for somebody else's frame on the one slide where it asks
 * the room for something. The band is also what lets the four rows above stay pure
 * imperatives: the original wording lives here, once, instead of trailing every
 * row as a parenthesis in a second register.
 *
 * THREE LINES, SAME SHAPE AND SAME REASONS AS K.1's BOTTLENECK AND K.2's BAND —
 * see {@link BOTTLENECK} for the full argument, which this band inherits rather
 * than restates:
 *
 *   · `eyebrow`    — what the room is looking at. Mono label.
 *   · `statement`  — THE DECK'S OWN sentence, in the deck's words, unquoted.
 *   · `provenance` — the playbook's OWN labels, in quotes and attributed. Mono,
 *                    sentence case, keyword-free.
 *
 * THE TWO "GROUP HR"s ON THIS STAGE ARE DIFFERENT ORGANISATIONS, AND NOTHING MAY
 * COLLAPSE THEM. The form's third column is the ROOM's group HR — the function a
 * BU or Division Head would otherwise have to ask, and the column that stays
 * empty. This citation is the DECK's own: Nanovest's, named, because it is the
 * document the four levers were lifted from. That is why the column head is bare
 * and this line carries the organisation's name; swapping either would make the
 * slide say that the room's own HR wrote its levers, or that a deck's internal
 * playbook has authority over somebody else's division.
 *
 * SOURCE: `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md`, the
 * Group-Wide Enablement Playbook — "Four HR Group levers: Convene · Champion ·
 * Unblock access · Sustain the rhythm", with `Convene` as "create attendance,
 * visibility, and mandate", `Champion` as "protect and recognize the champion role
 * through performance criteria", `Unblock access` as "accelerate IT provisioning",
 * `Sustain the rhythm` as "preserve calendars, funding, and visibility", and the
 * deck's core message that "Group HR supplies institutional leverage".
 * Cross-checked against `docs/researches/internal-hr-group.md`, which records the
 * same playbook and the review cadence the fourth lever borrows.
 */
const PLAYBOOK = {
  /** Mono label. Names what the band is — a provenance, not a further ask — so a
   *  room three clicks into being asked for things does not read the citation as
   *  a fifth lever. */
  eyebrow: "WHERE THE FOUR CAME FROM",

  /** The deck's own compression, in the deck's words. Prose, so it carries a
   *  keyword; NO quotation marks, because it is not a quotation. */
  statement: "The same four levers, written for the group and reworded for the room.",
  statementKw: ["reworded for the room"],

  /** The citation, on the slide rather than in a footnote. Keyword-free. The four
   *  source labels are quoted verbatim and in the source's own order, which is
   *  also the order of the four rows above — so a room that wants to check the
   *  rewording can read straight across. */
  provenance:
    "Nanovest's own Group HR playbook lists four levers — “Convene · Champion · " +
    "Unblock access · Sustain the rhythm” — as the institutional leverage Group HR supplies.",
} as const;

// ───────────────────── the slide ─────────────────────

export const mandateLeversContent = {
  figLabel: "THE FOUR LEVERS",

  /**
   * The whole slide in one sentence, and the claim the form below has to keep.
   *
   * A leader hears a list of asks and starts sorting it into what they can do and
   * what they will have to take somewhere else. The headline answers that before
   * the sorting starts, so the four rows can be read as four acts rather than as
   * four requisitions — and the form is what stops the claim being a claim.
   */
  headline: "Four levers. Not one of them needs a signature but yours.",
  headlineKw: ["a signature but yours"],

  /** Mono headings, keyword-free. Each names its half's QUESTION rather than its
   *  contents — the construction K.1's two headings use, two slides earlier, and
   *  the reason this stage can also hang two of them on one shelf. */
  leversHeading: "THE LEVERS · WHAT YOU DO ON MONDAY",
  authorityHeading: "WHAT EACH ONE NEEDS BEFORE IT CAN HAPPEN",

  levers: LEVERS,
  authorities: AUTHORITIES,
  playbook: PLAYBOOK,

  /**
   * The ask, and the last thing the mandate says before the deck moves on.
   *
   * IT DOES NOT RESTATE THE HEADLINE, which is the temptation on a slide whose
   * headline is already its claim. The headline says the levers need nobody else;
   * this says what follows from that and nothing more — that with nobody to wait
   * for, the absence of a decision is itself the decision, and it is one the room
   * takes rather than one that happens to it. That is the whole difference between
   * a slide that describes an enablement model and a slide that asks for one.
   *
   * IT CLOSES THE SECTION. K.1 handed the room its own bottleneck to name, K.2
   * handed it a gate, and there is no fourth slide to hand this to: the next thing
   * the deck does is stop asking.
   */
  closer: "Not deciding is also a decision — and with nobody else to wait for, it is the one you take.",
  closerKw: ["Not deciding is also a decision"],
} as const;
