// Section THE MANDATE — every string its slides print, and the one axis one of
// them varies on.
//
// Spec §6.8 (content) · §6.5 (the ladder K.2 maps onto) · §4.4 slot 6 (K.2's
// brand axis) · §11 Phase 6 · §4.3's leader deck table. Named by SECTION KEY and
// not by letter: `mandate` is K in §4.3's finished leader deck and K in the deck
// these tickets compose, and it is STILL not written down anywhere here. The
// letter is derived per deck (§3.4 R2, §3.5) and no file under
// `src/slides/leader-mandate/` may hold one — `src/slides/leader-gap/index.ts`
// named this directory on that rule before it existed.
//
// ─────────────────────────────────────────────────────────────────────────────
// THE ONE THING TO READ BEFORE EDITING ANYTHING BELOW: THE TWO SLIDES IN THIS
// FILE DISAGREE ABOUT WHETHER THIS SECTION HAS A BRAND AXIS, AND THE DISAGREEMENT
// IS THE ARGUMENT, NOT AN INCONSISTENCY.
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
// WHAT DOES NOT VARY, ON EITHER SLIDE: the structure. K.1's pillars and tracks
// are generic, and K.2's phases, gates and rungs are generic — the brand supplies
// only the calendar, the citation and the ask. So the brand axis below is
// deliberately NARROW: it carries no phase name, no gate and no rung, and
// {@link PhasesGatesBrandBlock} is the whole of what an organisation may change.
// ─────────────────────────────────────────────────────────────────────────────
//
// Markup convention, as everywhere else in the deck: data carries plain strings
// plus a sibling `*Kw` array of substrings to highlight at render time. No inline
// `<em>` in data.
//
// THE KEYWORD RULE. `kw` goes on PROSE ONLY, on both slides. K.1's prose is the
// headline, the four pillar lines, the three track lines, the bottleneck's
// statement and the closer; K.2's is the headline, the four gate lines, the
// beyond-the-roadmap line, the band's statement and the closer. Everything else
// is the mono LABEL register: fig labels, headings, pillar and track names, PHASE
// LABELS AND STATES, rung names, calendar rows, the bands' eyebrows and both
// CITATIONS. A copper italic inside a mono label reads as a rendering fault, and
// inside a citation it reads as the deck emphasising a fragment of somebody
// else's sentence — so the two source lines are the sharpest case of the rule and
// both tests hold the registers apart as lists.
//
// WHAT IS DELIBERATELY NOT IN THIS FILE. §6.8 gives the `mandate` run three
// slides, and the third — `mandate-levers` (K.3, four levers: calendar ·
// champion · access and procurement · funding) — is Phase 7 and has no copy here.
// Two consequences are load-bearing rather than tidy:
//
//   · NO LEVER IS PRE-EMPTED. K.1's `access` and `support` pillars name two of
//     the same STRUCTURES, and they must keep naming structures: a pillar says
//     what has to exist, a lever says what the leader does on Monday. If a pillar
//     line ever starts with "You", it has become a lever and belongs two slides
//     later. K.2's Berau closer is the ONE deliberate exception and says so where
//     it is written.
//   · K.1 STILL NAMES NO GATE, NO PHASE AND NO DATE, and that is now a fact about
//     this file rather than a promise about a future one: the pillars stop at what
//     the programme is made of, and everything about when it is judged is under
//     K.2's heading below.
//
// Dead copy that reads as finished is how unreviewed copy ships — same reasoning
// as `GENERAL_BLOCK` in `src/slides/leader-gap/content.ts` and the top of
// `src/slides/leader-invest/content.ts`.
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
// `./phases-gates-geometry.ts` gave it up for its own import, which its header
// prices separately.
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
    // THE PILLAR MOST AT RISK OF BECOMING A LEVER. K.3's second lever is "name a
    // champion, protect them, put it in their objectives" — the leader's ACT.
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

  /** The citation, on the slide rather than in a footnote. Keyword-free. */
  source:
    "DigiTech's own brief: “outside DigiTech, AI adoption is not really adopted " +
    `well — even some DigiTech members still falling behind.” ${STATED_NOT_MEASURED}`,
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
 * DECK'S: §6.5 numbers the finished `gap` run of five, and with one of the five
 * built the composed leader decks derive B.1 for `gap-capability-ladder` today.
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
    // `gap-capability-ladder`'s Berau question already put to the room — "did it
    // stop at the certificate?" — and this is the same doubt written as a condition
    // instead of a question.
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
