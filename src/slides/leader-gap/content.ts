// Section THE GAP — every string the section prints, and the one axis it varies on.
//
// TWO SLIDES LIVE IN THIS FILE AND THEY DISAGREE ABOUT WHETHER THIS SECTION HAS A
// BRAND AXIS. The Capability Ladder (§6.5) exports one, because it puts an
// organisation's own evidence in front of that organisation (§4.4 slot 2). THE
// HARDEST PART (§6.1, at the bottom of this file) exports NONE: §4.4's seven slots
// do not include it, the statistic it quotes is a third party's and the gap it names
// is nobody's local fact, so there is nothing for a brand to vary. Look for a
// `…For(brand)` resolver there and there is not one — `leader-mandate/content.ts`
// makes the same call for K.1 and argues it at greater length. Neither answer is the
// house style; the axis exists where the EVIDENCE varies and nowhere else.
//
// Spec §6.5 (content) · §7.2 (the visual contract #16 settled) · §4.4 slot 2 (the
// brand axis). Named by SECTION KEY and not by letter: `gap` is B in §4.3's
// finished leader deck and B again at this ticket's floor, but it was going to be
// B in a 14-section deck and is B in an 11-section one — the letter is derived per
// deck (§3.4 R2) and no file under `src/slides/leader-gap/` may hold one.
//
// Markup convention, as everywhere else in the deck: data carries plain strings
// plus a sibling `*Kw` array of substrings to highlight at render time. No inline
// `<em>` in data.
//
// THE KEYWORD RULE, stated once because this slide has more label-shaped copy
// than most: `kw` goes on PROSE ONLY. Rung names, rung definitions, mono marker
// labels, the provenance line and every source string are keyword-free — they are
// what the audience reads as a label, and a copper italic inside a mono label
// reads as a rendering fault. `tests/unit/gap-capability-ladder.test.tsx` holds
// that as a list, so a new string has to pick a side.
//
// Type-only import, so this module pulls in nothing at runtime and stays plain
// data — importable from a node test.
import type { Brand } from "@/deck-variants";

// ───────────────────── the ladder itself ─────────────────────

export interface Rung {
  id: string;
  /** `L1` … `L5`. A LABEL, not a number: it is printed verbatim and never
   *  computed from an index, because L5 is a name the deck uses in prose too. */
  level: string;
  title: string;
  /**
   * The one-line definition §6.5 gives each rung, verbatim.
   *
   * NO `subKw`, AND THAT IS A DECISION. The build rule is "`kw` on prose only",
   * which permits a highlight here and does not ask for one — and five highlighted
   * definitions would put five copper italics along the staircase, competing with
   * the two marks the slide is actually about. The rungs are the vocabulary; the
   * emphasis belongs to the argument laid over them. So this field is prose that
   * carries no keywords, and the test classifies it with the labels for that
   * reason rather than by accident.
   */
  sub: string;
}

/**
 * §6.5's five rungs, in order, indexed by rung index.
 *
 * The order IS the argument — each rung is the one before it plus one thing the
 * organisation had to earn — so this array is also what `geometry.ts` indexes by
 * and what the markers name. There is no second copy of "five".
 */
const RUNGS: readonly Rung[] = [
  { id: "l1", level: "L1", title: "Assisted", sub: "Ad-hoc individual use." },
  {
    id: "l2",
    level: "L2",
    title: "Copilot at scale",
    sub: "Org-wide, humans drive every task.",
  },
  {
    id: "l3",
    level: "L3",
    title: "Agentic, bounded",
    sub: "Decision contract · 70/30 split.",
  },
  {
    id: "l4",
    level: "L4",
    title: "Multi-agent mesh",
    sub: "Coordinated agents, escalation paths.",
  },
  {
    id: "l5",
    level: "L5",
    title: "Full agentic org",
    sub: "Declared only when earned.",
  },
];

// ───────────────────── the two epistemic statuses ─────────────────────
//
// The slide's whole job. §6.5: no AI-adoption assessment data exists for either
// brand (confirmed on #8), so the two markers on this ladder are NOT the same
// kind of statement, and §7.2 settled that the difference is carried by FORM —
// copper has no second hue to spend. Four encodings at once, no legend:
//
//   asserted → solid chip · SOLID leader · FILLED dot · mono-uppercase label
//              with its source printed underneath.        It looks measured.
//   open     → hairline DASHED chip · DASHED leader · OPEN RING · serif-italic
//              sentence ending in "?".                    It looks asked.
//
// The types below are separate for that reason: an asserted marker cannot be
// given a question and an open one cannot be given a source, so the four
// encodings cannot be mixed by editing content. Nothing in this file names the
// words "asserted" or "open" as COPY — those are field names, and a legend is
// exactly what printing one of them would be.

/** A placement we are willing to defend, and cite. */
export interface AssertedMarker {
  id: string;
  /** Which rung's tread the filled dot sits on. */
  rung: number;
  /** Mono, uppercase. Keyword-free. */
  label: string;
  /** The sourcing, printed ON the slide — §6.5 requires the citation to be
   *  visible, not footnoted. Keyword-free: it is a source, not a sentence we are
   *  making a point with. */
  source: string;
}

/** A question thrown to the room. The position is the question. */
export interface OpenMarker {
  id: string;
  /** The rung the evidence would put them on IF the answer were yes — so the ring
   *  lands on the rung UNDER EXAMINATION, not on a placement. */
  rung: number;
  /**
   * Mono, uppercase eyebrow. Keyword-free. MUST NAME `rung` AND END IN "?".
   *
   * WHY THE LABEL CARRIES THE RUNG. A ring sitting on L2's tread says "L2" whether
   * or not anything asserts it, and §6.5 is explicit that no adoption-assessment
   * data exists for either brand — so the position had to be either removed or
   * SAID OUT LOUD as a question. Removing it costs one of §7.2's four encodings
   * (the ring is on the ladder or it is not a mark on the ladder). Saying it costs
   * three characters, and it buys the two chips a directly comparable label
   * grammar: `DIGITECH · ≈ L3` against `OUTSIDE DIGITECH · L2?`. The `≈` proposes
   * and defends; the `?` proposes and asks. Nothing about where the ring sits is
   * left for the room to infer.
   */
  label: string;
  /** MUST END IN "?" — it is one of the four encodings, and the test enforces it
   *  over the copy rather than trusting the author. */
  question: string;
  questionKw: readonly string[];
  /** What makes the question fair to ask. Prose. */
  evidence: string;
  evidenceKw: readonly string[];
}

/**
 * The tech-function slot: a defended placement, or a stated absence.
 *
 * A UNION, so "never both, never neither" is a fact the compiler holds. §6.5 and
 * #16's finding 4 both say the same thing about Berau — MineTech has nothing
 * comparable to GEMVIS, and the absence must be STATED, because silence in that
 * slot reads as an unfinished slide. A nullable `asserted` beside an optional
 * `absence` would have let a brand ship neither, and the failure would have been
 * a blank rectangle on a projector.
 */
export type TechFunction =
  | { readonly kind: "asserted"; readonly marker: AssertedMarker }
  | {
      readonly kind: "absent";
      /** Real copy, in the same slot the chip would have used. Prose. */
      readonly line: string;
      readonly lineKw: readonly string[];
    };

/** Everything about this slide that varies with the organisation in front of it —
 *  §4.4 slot 2, and nothing else. */
export interface LadderBrandBlock {
  techFunction: TechFunction;
  open: OpenMarker;
  /** The closer names what is on the ladder, so it CANNOT be shared: a brand with
   *  no asserted marker has no "claim we will defend" to contrast the question
   *  with, and the shared line would be false on its own slide. */
  closer: string;
  closerKw: readonly string[];
}

// ───────────────────── shared copy ─────────────────────

export const gapLadderContent = {
  figLabel: "THE CAPABILITY LADDER",

  headline: "Five levels. L5 is declared only when earned.",
  headlineKw: ["only when earned"],

  /** ON THE SLIDE, not in a footnote (§6.5). Mono, keyword-free: it is a source
   *  line, and the two systems it names are the reason the rungs are not
   *  invented. */
  provenance:
    "Adapted from SAE J3016 automation levels and Anthropic's workflow-vs-agent boundary.",

  rungs: RUNGS,

  /**
   * The Nanovest marker — §6.5's third mark, at L1–L2 under BOTH brands.
   *
   * Deliberately self-deprecating, and therefore deliberately brand-invariant:
   * the joke only lands if it is the same admission in both rooms. It is the one
   * mark with NO chip and NO leader — a third leader style would be a fifth
   * encoding competing with the four that carry the argument, and a footnote is
   * what this is.
   */
  aside: {
    /** Mono. Keyword-free. The en dash matches every other range in the deck. */
    label: "NANOVEST · L1–L2",
    note: "The people recommending this ladder are standing on its second rung too.",
    noteKw: ["standing on its second rung too"],
  },
} as const;

// ───────────────────── the brand axis ─────────────────────

/**
 * GEMS — one asserted placement and one open question (§4.4 slot 2).
 *
 * The citation is Google Cloud's own published description of GEMVIS, which is
 * what makes L3 defensible rather than flattering: hierarchical multi-agent with
 * a dispatcher in front of specialists IS the bounded-agentic rung, and the
 * adoption numbers are theirs, not ours. §12.2 dates and sources it.
 */
const GEMS_BLOCK: LadderBrandBlock = {
  techFunction: {
    kind: "asserted",
    marker: {
      id: "digitech",
      rung: 2, // L3 — Agentic, bounded
      label: "DIGITECH · ≈ L3",
      source:
        "Google Cloud on GEMVIS: hierarchical multi-agent, dispatcher → specialists, " +
        "50 applications, 4,000+ users.",
    },
  },
  open: {
    id: "outside-digitech",
    // L2 is what the question is ASKING about — org-wide, humans driving every
    // task. The ring sits there and stays open, which is the honest shape of "we
    // do not know whether the other 90% got that far".
    rung: 1,
    label: "OUTSIDE DIGITECH · L2?",
    question: "So where does that put the other 90%?",
    questionKw: ["the other 90%"],
    // DigiTech's own words, quoted rather than paraphrased: the question is only
    // fair to ask in the room because the room said it first.
    evidence:
      "DigiTech's own words: “outside DigiTech, AI adoption is not really adopted " +
      "well — even some DigiTech members still falling behind.”",
    evidenceKw: [],
  },
  closer: "One of these is a claim we will defend. The other is a question for this room.",
  closerKw: ["a claim we will defend", "a question for this room"],
};

/**
 * Berau — NO tech-function marker, and the absence as copy (§6.5, #16 finding 4).
 *
 * MineTech has nothing comparable to GEMVIS. Inventing a placement is the worst
 * thing this slide could do, and leaving the slot empty is the second worst: a
 * leader reads a blank rectangle as a slide that did not finish rendering, not as
 * a finding. So the slot says what was looked for and not found.
 */
const BERAU_BLOCK: LadderBrandBlock = {
  techFunction: {
    kind: "absent",
    line: "MineTech has nothing comparable to place on this ladder. That is the finding, not an omission.",
    lineKw: ["nothing comparable to place on this ladder"],
  },
  open: {
    id: "berau-coal",
    rung: 1, // L2 — the rung 382 trained people would put them on IF it stuck
    label: "BERAU COAL · L2?",
    question: "Did it become daily use, or did it stop at the certificate?",
    questionKw: ["stop at the certificate"],
    // The three facts §6.5 lists, and the question is what they do not settle.
    // "382 trained" and NOT the prototype's "382 leaders trained": §6.5 says
    // trained, the extra word is the prototype's own, and a headcount is exactly
    // the kind of number a leader will check.
    evidence: "382 trained · the competition is complete · AI Ambassadors named.",
    evidenceKw: [],
  },
  // No asserted marker, so no claim to contrast with — the shared GEMS closer
  // would be false here, which is why the closer is on this axis at all.
  closer: "No rung is claimed here yet. What this ladder has is a question for this room.",
  closerKw: ["No rung is claimed here yet", "a question for this room"],
};

/**
 * `general` — UNREACHABLE TODAY, and kept to the shortest honest thing.
 *
 * No `general-leader` variant is registered (`VARIANTS` in `@/deck-variants`), so
 * no composed deck asks for this block. It exists for the reason A.1's leader
 * resolver is applied to `general` too: registering that variant should serve a
 * ladder that places NOBODY, rather than crash at first paint or — far worse —
 * fall through to another organisation's evidence.
 *
 * DELIBERATELY THE THINNEST BLOCK OF THE THREE. Every word here is copy no
 * audience has ever read, and dead copy that reads as finished is how invented
 * evidence gets shipped by a later edit that "just fills this in". `general` names
 * no organisation, so it has nothing to place and nothing to cite — the block says
 * only that, in one line each, and whoever registers `general-leader` will have to
 * write the real thing rather than inherit a plausible draft.
 */
const GENERAL_BLOCK: LadderBrandBlock = {
  techFunction: {
    kind: "absent",
    line: "This deck names no organisation, so nothing is placed on this ladder.",
    lineKw: ["nothing is placed on this ladder"],
  },
  open: {
    id: "this-room",
    rung: 1,
    label: "THIS ROOM · L2?",
    question: "So which rung is this room standing on?",
    questionKw: ["which rung"],
    evidence: "Nobody here has been assessed. That is what keeps it a question.",
    evidenceKw: [],
  },
  closer: "Nothing here is a claim about you. The one mark on this ladder is a question for this room.",
  closerKw: ["a question for this room"],
};

/**
 * The ladder's brand-varying half, brand by brand.
 *
 * A `Record` keyed by `Brand` and not a `brand === "gems"` ternary, for the same
 * reason `A1_BY_DECK_SET` and `TITLE_CONTENT_BY_DECK_SET` are records: a fourth
 * brand must FAIL TO COMPILE here rather than silently show one organisation the
 * evidence of another. This is §4.4's "a content block per brand, not a brand ×
 * deckSet matrix" — the deck-set axis does not reach this slide, because a slide
 * only the leader decks compose has nothing to vary against.
 *
 * NOT A GENERIC OVERRIDE BAG, and not read off `VARIANT` inside a component:
 * `sectionOverrides` stays composition-only (§4.1), the slide file resolves the
 * brand ONCE at module scope, and every component below it takes the resolved
 * block as a prop. That is what lets the test render both brands in one epoch.
 */
const LADDER_BY_BRAND: Record<Brand, LadderBrandBlock> = {
  berau: BERAU_BLOCK,
  gems: GEMS_BLOCK,
  general: GENERAL_BLOCK,
};

/**
 * This ladder's markers and closer for one brand. Pass `VARIANT.brand`.
 *
 * THE ONLY WAY IN. The table above is deliberately not exported: a caller that
 * could read it could also enumerate keys the brand table does not have, and the
 * tests that hold a rule over "every brand" then prove it over this file's own key
 * set instead of over `BRANDS`. They walk `Object.keys(BRANDS)` and come through
 * here, so a brand registered without a block fails at the type and a block
 * written for a brand that does not exist fails at the same place.
 */
export function capabilityLadderFor(brand: Brand): LadderBrandBlock {
  return LADDER_BY_BRAND[brand];
}

// ═════════════════════════════════════════════════════════════════════════════
// THE HARDEST PART — §6.1, the FIRST slide of this section's run.
// ═════════════════════════════════════════════════════════════════════════════
//
// §6.1 is one line: "The hardest part is not the tools (70%). Opens the gap between
// tool access and organizational capability." The statistic behind it is REUSED
// VERBATIM, on the research's own verdict (`docs/researches/internal-hr-group.md`
// §1.1 and §3.1: "Reuse quote verbatim"), and its attribution is printed ON the
// slide rather than footnoted — the same rule the ladder's `source` fields keep.
//
// ONE CONTENT BLOCK, NO BRAND AXIS, NO `…For(brand)` RESOLVER. See the top of this
// file: §4.4's seven slots do not list this slide, the statistic is BCG/McKinsey's
// and not either organisation's, and a `Record<Brand, …>` here would be three
// fillings of a slot with one honest occupant. The slide file imports no `VARIANT`
// at all, which is what lets its test compare two variant epochs byte for byte.
//
// THE KEYWORD RULE, as stated at the top of this file and applied here without an
// exception: `kw` on PROSE ONLY. The prose on this slide is the headline, the two
// gap lines and the closer — four strings, four `*Kw` siblings. THE STATISTIC AND
// ITS SOURCE ARE KEYWORD-FREE, and they are the sharpest case the rule has: a copper
// italic inside a quoted figure emphasises a fragment of somebody else's sentence,
// and inside an attribution it reads as the deck editing its own citation. The two
// half labels and all eight list rows are labels and carry none either.
//
// THE 70/30 COLLISION WITH THE LADDER, recorded once here and once in
// `./hardest-part-geometry.ts`, because this file is where a future editor would
// create it. §6.5's L3 rung is defined as "Decision contract · 70/30 split" — that
// 70/30 is how much of a bounded agentic DECISION the machine may take. THIS 70/30
// is the ADOPTION-FAILURE split: how many failures are people and process against
// how many are technology. The numbers agree by coincidence. So: nothing below
// prints the phrase "70/30" (it is the ladder's), nothing below says "decision
// contract", and `peopleItems`' first row says "Decision RIGHTS" — who owns a call —
// which is org design and not the ladder's rung definition. Do not merge them, do
// not cross-reference them on either stage, and do not "reuse" one number for the
// other.
//
// WHAT THIS SLIDE MAY NOT SAY, because three siblings own it (§6.2, §6.3, §6.4), and
// the first of the three is a constraint the SPEC states rather than a judgement
// this file makes:
//
//   · SHADOW AI, SOPs, MISSING GUIDANCE, IMPROVISATION → §6.2 (`gap-no-sop`) owns
//     the whole of it, and owns shadow AI as `condition`. §6.2 is explicit that the
//     deck's three shadow-AI passes must share no image and no statistic, and the
//     escalation "degenerates into repetition the moment two of the three passes
//     share an image or a statistic". This slide therefore names none of it — not as
//     tact, but because a first mention here would spend §6.2's `condition` beat
//     before that slide gets to make it.
//   · NANOVEST'S OWN FAILURES, first person → §6.3 (`gap-three-failures`). Nothing
//     below is in the first person and nothing below is a story.
//   · THE PATTERN ACROSS THOSE FAILURES → §6.4 (`gap-the-pattern`).
//   · L1–L5, THE RUNGS, THE DECISION CONTRACT → §6.5, above in this file.
//
// THE ONE DELIBERATE ECHO, so a reviewer sees it was chosen and not leaked: the
// capability line below says capability is "earned", and the ladder's L5 is
// "Declared only when earned". That rhyme is the section's thesis stated at both
// ends of its run — B.1 opens the gap, B.5 puts a ladder in it — and it is one
// ordinary English word rather than a borrowed label. Nothing else is shared.

/** One row of either half of the split. A LABEL, keyword-free by the rule above. */
export interface SplitItem {
  id: string;
  /** Cut for ONE line: 397px (people) or 353px (technology) of 15px sans, which is
   *  ≈50 and ≈44 characters. A reword past that wraps into the row under it. */
  label: string;
}

/**
 * §6.1's five structural contents of the people-&-process half.
 *
 * THE ORDER IS THE ARGUMENT and `./hardest-part-geometry.ts` lays it out
 * column-major, so it reads top-to-bottom then across: who decides, how the work is
 * shaped, who can do it, what they are rewarded for, and how anyone can tell. Each
 * row is a NOUN plus what it costs — the noun alone ("Skills") reads as a training
 * budget, which is the reading §6.1 exists to refuse.
 *
 * FIVE, and `./hardest-part-geometry.ts` pins the count: a sixth row deepens the
 * sub-columns by arithmetic and the stage's floor clearance is what reports it.
 */
const PEOPLE_ITEMS: readonly SplitItem[] = [
  { id: "decision-rights", label: "Decision rights — who owns the call." },
  { id: "workflow", label: "Workflow redesign — the process changes shape." },
  { id: "skills", label: "Skills — the habit, not the awareness." },
  { id: "incentives", label: "Incentives — what faster work is rewarded for." },
  { id: "measurement", label: "Measurement — what now counts as done." },
];

/**
 * The three things the 30% is, i.e. the three things money already buys.
 *
 * EACH ROW NAMES ITS OWN PROCUREMENT INSTRUMENT — a subscription, a purchase order,
 * an afternoon — because "Models · Licences · Tools" as three bare nouns is a list
 * the room reads as difficulty. The point of the 30% is that none of it is hard,
 * and the instrument is what says so in four words.
 */
const TECHNOLOGY_ITEMS: readonly SplitItem[] = [
  { id: "models", label: "Models — a subscription away." },
  { id: "licences", label: "Licences — a purchase order." },
  { id: "tools", label: "Tools — installed in an afternoon." },
];

export const gapHardestPartContent = {
  /** The `FigLabel`'s LABEL. The letter and number in front of it are DERIVED from
   *  the composed deck (§3.5) and are authored nowhere. */
  figLabel: "THE HARDEST PART",

  /** §6.1's own claim, as the slide's title phrase. It refuses the reading a leader
   *  arrives with — that this is a tooling decision — before any evidence lands. */
  headline: "The hardest part is not the tools.",
  headlineKw: ["not the tools"],

  /** Mono LABEL over the quotation. Keyword-free. Says "reported" and "split" so the
   *  room knows what kind of object it is about to read before it reads it. */
  statisticEyebrow: "THE REPORTED SPLIT",

  /**
   * THE STATISTIC, VERBATIM — the research's own verdict, quoted and not adapted
   * (`docs/researches/internal-hr-group.md` §3.1).
   *
   * KEYWORD-FREE, and this is the string the rule exists for: it is somebody else's
   * sentence, and a copper italic inside it would be the deck emphasising a fragment
   * of a quotation. It is also the number `./hardest-part-geometry.ts` cuts the split
   * bar from — `PEOPLE_SHARE` is 0.70 because this string says 70% — so a reword that
   * changed the figure and left the bar alone is a lie the test catches.
   *
   * "&" AND NOT "and", "people & process" AND NOT "people and process": verbatim
   * means verbatim, and the ampersand is in the source.
   */
  statistic: "70% of AI adoption failures are people & process, not technology",

  /**
   * The attribution, printed ON the slide (the ladder's rule, applied to a figure
   * this deck did not measure). Mono, keyword-free.
   *
   * WHAT IT CLAIMS AND WHAT IT DOES NOT. The research records the figure as
   * BCG/McKinsey's and cites it as an adoption benchmark; we hold no primary URL and
   * no read date for it, so this string says "reported by" and says that the deck
   * QUOTES rather than measures. It carries no date it cannot support and no study
   * title it cannot name — an invented citation is worse than a plain one, and this
   * slide is the one place in the section where a leader is most likely to ask.
   */
  statisticSource:
    "Reported by BCG / McKinsey — the adoption benchmark this deck quotes rather than measures.",

  /** The 70% segment's label. Mono, keyword-free. It carries its own percentage so
   *  the mass is never read against the wrong number, and NOT the phrase "70/30",
   *  which is the ladder's (see the header). */
  peopleLabel: "70% · PEOPLE & PROCESS",

  /** The 30% segment's label. Mono, keyword-free, same construction. */
  technologyLabel: "30% · TECHNOLOGY",

  peopleItems: PEOPLE_ITEMS,
  technologyItems: TECHNOLOGY_ITEMS,

  /** Mono LABEL over band 4, and the one string that calls the thing a GAP — §6.1's
   *  own word. Keyword-free. The two terms it abbreviates ("tool access",
   *  "organizational capability") are spelled out in the two lines under it. */
  gapEyebrow: "THE GAP · ACCESS AGAINST CAPABILITY",

  /**
   * The bought half of the gap. PROSE, so it carries keywords.
   *
   * Two properties in one sentence — it is PROCURED and it is INSTANT — because
   * either alone is a fact and the pair is the argument: what a signature buys
   * arrives complete, all at once, for everybody.
   */
  accessLine:
    "Tool access is procured. It arrives instantly, the day the invoice clears, for everyone at once.",
  accessLineKw: ["procured", "instantly"],

  /**
   * The built half. PROSE, and the mirror of the line above it: EARNED against
   * procured, SLOWLY against instantly. "Never on an invoice" is the sentence's
   * job — it is what makes the gap a gap rather than a delay, because no amount of
   * the 30% closes it.
   */
  capabilityLine:
    "Organizational capability is earned. It arrives slowly, one changed habit at a time, and never on an invoice.",
  capabilityLineKw: ["earned", "slowly"],

  /**
   * The closer, and the frame for everything behind this slide. PROSE.
   *
   * IT IS THE SLIDE'S LAST ARRIVAL, full width and alone in its band, because it is
   * the only sentence here addressed to the rest of the deck rather than to the
   * statistic. IT COUNTS NOTHING AND NAMES NO POSITION — "everything after this",
   * never "the next four slides" and never a letter — because the run this slide
   * opens is composed per deck set (§3.4) and a sentence that counted its own
   * successors would go stale the first time one was inserted or cut.
   */
  closer: "The tools are the 30%. Everything after this is the 70%.",
  closerKw: ["the 70%"],
} as const;

// ═════════════════════════════════════════════════════════════════════════════
// THE RULE NOBODY WROTE — §6.2, the SECOND slide of this section's run.
// ═════════════════════════════════════════════════════════════════════════════
//
// §6.2 is one line plus a constraint: "There is no guidance, so people improvise.
// Shadow AI appears three times in the deck with enforced escalation and no shared
// image or statistic: B.2 = condition · D.4 beat 2 = exposure · D.3 = rational
// behaviour. This constraint belongs in the spec, not in the implementer's judgement."
// THIS BLOCK IS THE `condition` PASS, and everything below is written to be the
// FIRST of the three the room meets: the organisation handed people tools and never
// wrote the rules, and shadow AI is what that vacuum produces. Not blame — nobody here
// broke anything. Not behaviour — what people then did is D.3's slide. Not exposure —
// what nobody can do about it afterwards is D.4 beat 2's.
//
// ONE CONTENT BLOCK, NO BRAND AXIS, NO `…For(brand)` RESOLVER — the same call the
// slide above it makes, for the same reason. §4.4's seven brand × deckSet slots do not
// list this slide, and an absence of written guidance is not an organisation's own
// evidence: we hold no SOP inventory for either brand and would be inventing one to
// fill a fork. `mandate-enablement` and `gapHardestPartContent` are the precedents.
// The slide file imports no `VARIANT` at all, which is what lets a test mount it under
// both leader brands and compare byte for byte.
//
// ═══ HOW THE THREE-PASS CONSTRAINT IS HELD, AND IT IS NOW CHECKABLE AGAINST RENDERED
// COPY ON BOTH SIDES. D.3 (`invest-chicken-egg`) and D.4 (`invest-security`) both
// shipped before this slide — `src/slides/leader-invest/content.ts` holds them — so the
// half of the check that both of those blocks had to run against §6.2's SPEC TEXT runs
// here against actual strings. What was compared, and what it found:
//
//   · NO SHARED IMAGE. D.3 draws a two-clause deadlock, a first-person past-tense
//     confession, an itemised bill and a bordered pilot card. D.4 draws a three-column
//     map of destinations, a price band and four governance chips. THIS SLIDE DRAWS
//     NEITHER: it is a lopsided diptych — three things that were handed out, against
//     four questions each followed by an EMPTY RULE where the answer was never written.
//     The blank line is this pass's image and it appears on no other slide in the deck.
//   · NO SHARED TOKEN. None of D.3's — `deadlock`, `no budget without proof`,
//     `shared accounts`, `banned repeatedly`, `WHAT IT COST`, `30-day`, `proof pilot`,
//     `kill criterion`, `spend cap` — appears in any string below. None of D.4's —
//     `revoke`, `produce`, `audit`, `self-hosted`, `on-prem`, `consumer account`,
//     `workspace`, `governance retrofit`, `Culture`, `Risk`, `Governance`, `Ethics`,
//     `4 pts`, `5.2 pts`, `Artificial Analysis` — appears either. `produce` is the one
//     worth naming twice: an eyebrow reading "THE CONDITION IT PRODUCES" was written
//     and rejected for that collision alone, and nothing below uses any form of the
//     word.
//   · NO SHARED STATISTIC, HELD AS AN ABSENCE. **THIS SLIDE CARRIES NO STATISTIC AND
//     NO DIGIT AT ALL** — not one numeral in any rendered string. That is the cheapest
//     way to hold the rule and the only way to make it testable as an absence rather
//     than as a list of forbidden values: D.3's only quantity is its 30-day window,
//     D.4's are its two index gaps, and a slide with no digit in it cannot collide with
//     either. It also keeps this pass the QUIETEST of the three, which is what the
//     escalation needs — a condition that arrived with a number would be making the
//     exposure argument early.
//   · THE ESCALATION READS condition → behaviour → exposure IN DECK ORDER, which is why
//     this slide stops where it does. It says the questions were never answered and
//     that everyone answers them privately. It does NOT say what any of those private
//     answers were (D.3), and it does NOT say what nobody can do about them afterwards
//     (D.4 beat 2). Each of those is a slide later in the same room.
//   · IT DOES NOT PRINT THE PHRASE "SHADOW AI", DELIBERATELY. D.4 beat 2 names it
//     ("It is not the vendor. It is shadow AI, and nobody administers it."), and naming
//     it here would spend the label two passes early on the pass that has the least
//     right to it: a CONDITION is described, not labelled, and a room that has been
//     handed the term at B.2 hears D.4's naming as a repetition rather than as the
//     escalation's last step. §6.2 requires the passes to share no image and no
//     statistic; keeping the NAME for the pass that acts on it is this file's own call,
//     and it costs nothing — the copy below describes the condition completely.
//
// THE ONE WORD THIS SLIDE IS SUPPOSED TO ECHO, so a reviewer sees it was chosen. C.1's
// governance decision (`leader-shape/content.ts`) says the leader writes it down
// "before someone improvises", and `leader-mandate/content.ts` says "enough to stop
// improvising" — both of those are indexes pointing AT this slide, recorded in their own
// files as such. So {@link gapNoSopContent.consequenceLine} says "improvises", once,
// which is the anchor being paid off rather than a borrowed phrase. §6.2's own sentence
// is "there is no guidance, so people improvise"; the word is B.2's, and the two slides
// that pre-spent it did so pointing here.
//
// WHAT THIS SLIDE MAY NOT SAY, beyond the three-pass constraint above:
//
//   · THE 70/30 SPLIT, "procured", "earned", "invoice", "tool access" → B.1's, one
//     slide earlier in the same run. Re-spending its statistic or its vocabulary in the
//     slide directly behind it is how a run starts sounding like one long slide, and
//     the two arguments are different: B.1 says the hard part is not the tools, this
//     one says nobody wrote the rules for them. Nothing below prints a percentage, and
//     nothing below re-uses B.1's verbs.
//   · NANOVEST'S OWN FAILURES, FIRST PERSON → §6.3 (`gap-three-failures`). Nothing
//     below is a story and nothing below is in the first person singular.
//   · THE PATTERN ACROSS THOSE FAILURES → §6.4 (`gap-the-pattern`).
//   · L1–L5 AND THE DECISION CONTRACT → §6.5, at the top of this file.
//   · WHAT THE RULE SHOULD SAY. The closer names writing one as the leader's job and
//     stops there. The four governance domains an SOP starts from are D.4 beat 3's, and
//     a starter list here would be that beat arriving four slides early.
//
// THE KEYWORD RULE, applied without an exception: `kw` on PROSE ONLY.
//
//   · PROSE, each with a `*Kw` sibling — FOUR strings: `headline`, `conditionLine`,
//     `consequenceLine`, `closer`.
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — ELEVEN strings:
//     `figLabel`, `issuedEyebrow`, `unwrittenEyebrow`, `conditionEyebrow`, the three
//     `issued` labels and the four `questions` labels.
//     THE FOUR QUESTIONS ARE THE SHARPEST CASE, because they are sentence-shaped and
//     the Capability Ladder's own `question` field at the top of this file DOES carry a
//     `questionKw`. The difference is arity: that ladder asks ONE question and the
//     emphasis inside it is the argument, while four highlighted questions would put
//     four copper italics down one column and rank four things the slide ranks by order
//     alone. D.4's three exposure rows are the shipped precedent — sentence-shaped,
//     label register, keyword-free — and these follow it.
//
// NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). This slide composes
// as the SECOND of the `gap` run, which is B.2 in today's leader decks and is derived
// per deck by the composer; `FigLabel` takes a LABEL only. Do not write either down.

/** One row of either column of the diptych. A LABEL, keyword-free by the rule above. */
export interface NoSopItem {
  id: string;
  /**
   * Cut for ONE line: 420px (what was handed out) or 696px (a question) of 15px sans,
   * which is ≈56 and ≈94 characters. A reword past that wraps into the row under it —
   * and in the right column it wraps onto the empty rule that belongs to it, which is
   * the one failure on this stage a reader would misread as a design.
   */
  label: string;
}

/** Exactly three, held by the TYPE — the fixed-length tuple idiom
 *  `leader-invest/content.ts` argues at length: a fourth entry's error lands ON the
 *  fourth entry, at the definition site, with no cast anywhere. */
type Three<T> = readonly [T, T, T];

/** Exactly four, the same way. */
type Four<T> = readonly [T, T, T, T];

/**
 * WHAT THE ORGANISATION HANDED OUT — three things, and every one of them is a thing it
 * did RIGHT.
 *
 * THAT IS THE WHOLE POINT OF THE COLUMN. A list of failures on the left would make the
 * slide an accusation, and §6.2's beat is a CONDITION: access, a demonstration and
 * encouragement are exactly what a competent organisation issues when it wants a tool
 * adopted. The vacuum on the right is what was left out of an otherwise good rollout,
 * which is why nobody in the room has to defend anything to agree with it.
 *
 * EACH ROW NAMES ITS OWN MOMENT — the day it was asked for, the room it was shown in,
 * the fact that the encouragement was written down. The last one is deliberate and it
 * is the column's sharpest row: the encouragement got written down and the rules did
 * not.
 */
const ISSUED: Three<NoSopItem> = [
  { id: "login", label: "A login, the first day someone asked for one." },
  { id: "demonstration", label: "A demonstration, and a room told to try it." },
  { id: "encouragement", label: "Encouragement from the top, in writing." },
];

/**
 * WHAT WAS NEVER WRITTEN DOWN — four questions, in an escalation, each one a clause an
 * SOP would have had.
 *
 * THE ORDER IS THE ARGUMENT and it is not re-sorted: permission (what may go in) →
 * prohibition (what may never) → arbitration (who settles the unclear case) →
 * disclosure (who hears about it afterwards). Read down, they are the four things a
 * person needs before they can use a new tool safely, and none of them has an answer
 * anybody could look up.
 *
 * FIRST PERSON SINGULAR, AND EVERY ONE ENDS IN "?". These are the questions as the
 * person at the desk asks them, not as a policy author would phrase them — "which work
 * may I put into it", not "permitted data classes" — because the condition is what it
 * feels like to be that person with nobody to ask. The question mark is what the empty
 * rule beneath each one answers with silence.
 *
 * FOUR, AND `./no-sop-geometry.ts` PINS THE COUNT: a fifth deepens the right column,
 * moves the rule, band 2 and the closer, and the stage's floor clearance is what
 * reports it.
 */
const QUESTIONS: Four<NoSopItem> = [
  { id: "may-go-in", label: "Which work may I put into it?" },
  { id: "may-never", label: "Which work may never go near it?" },
  { id: "who-decides", label: "Who decides when a case is not obvious?" },
  { id: "who-hears", label: "Who do I tell when I have already used it?" },
];

export const gapNoSopContent = {
  /** The `FigLabel`'s LABEL. The letter and number in front of it are DERIVED from the
   *  composed deck (§3.5) and are authored nowhere. */
  figLabel: "THE RULE NOBODY WROTE",

  /**
   * §6.2's condition, as one sentence with its consequence attached.
   *
   * TWO CLAUSES, AND THE SECOND IS THE SLIDE. "Nobody wrote the rule" is the absence;
   * "so everybody wrote their own" is what an absence of guidance PRODUCES, which is
   * the beat this slide owns. The keyword sits on the second half for that reason — the
   * room already agrees with the first.
   *
   * "Nobody" AND "everybody", NOT "we" AND "they". No party is named and no party is
   * blamed: an organisation that did not write something down is not a group of people
   * who did something wrong, and the moment this line acquires a subject it becomes
   * §6.3's confession or an accusation aimed at the room.
   */
  headline: "Nobody wrote the rule. So everybody wrote their own.",
  headlineKw: ["everybody wrote their own"],

  /** The left column's heading. Mono, keyword-free. Says HANDED OUT rather than
   *  "provided" or "rolled out" — it is the plainest verb for the act, and the column
   *  under it is a list of good decisions. */
  issuedEyebrow: "WHAT THE ORGANISATION HANDED OUT",

  /** The right column's heading. Mono, keyword-free, and it OPENS ON "AND" so the two
   *  headings are read as one sentence across the gutter: what it handed out, and what
   *  it never wrote down. Neither column argues anything on its own. */
  unwrittenEyebrow: "AND WHAT IT NEVER WROTE DOWN",

  issued: ISSUED,
  questions: QUESTIONS,

  /** Band 2's heading. Mono, keyword-free. NAMES NO ACTOR — it is the condition that
   *  follows, not somebody's decision — and it is the string that would have read "THE
   *  CONDITION IT PRODUCES" if `produce` were not D.4 beat 2's word (see the header). */
  conditionEyebrow: "WHAT THE SILENCE LEAVES BEHIND",

  /**
   * The condition itself. PROSE.
   *
   * "still gets answered" IS THE KEYWORD AND THE WHOLE ARGUMENT: an unanswered question
   * does not stay unanswered, it gets answered somewhere nobody can see. The three
   * qualifiers after the dash are what make it a condition rather than a fault —
   * privately, at one desk, under time pressure, by someone doing their job.
   *
   * "that afternoon" AND NOT A DURATION. No digit appears anywhere in this block (see
   * the header); the pressure is carried by the ordinary word for it.
   */
  conditionLine:
    "A question nobody answers still gets answered — privately, at one desk, by whoever " +
    "needed to finish something that afternoon.",
  conditionLineKw: ["still gets answered"],

  /**
   * What the condition leaves behind. PROSE.
   *
   * "improvises" IS THE ONE DELIBERATE ECHO in this block — §6.2's own verb, and the
   * word C.1 and K.1 both point here with (see the header). It appears exactly once.
   *
   * THE SECOND HALF IS THE COST AND IT IS NOT AN ACCUSATION: the rules are not wrong,
   * they are unreadable. That distinction is what keeps this slide a condition and
   * leaves the consequences to the two passes behind it.
   */
  consequenceLine:
    "Everyone improvises a rule that works for them, and not one of those rules is written " +
    "where anybody else can read it.",
  consequenceLineKw: ["improvises a rule", "written where anybody else can read it"],

  /**
   * The closer, and the slide's last arrival. PROSE.
   *
   * IT REFUSES THE READING THE ROOM ARRIVES AT ON ITS OWN. By the time a leader has read
   * four unanswered questions, the available conclusion is that somebody is being
   * careless — and that conclusion, reached here, poisons the two slides that come after
   * it, because a room that has decided this is a discipline problem hears the next
   * slide's story as a confession of misconduct and the one after that as a threat. So
   * the last sentence on the stage says the opposite in the plainest words available,
   * and then hands the room the job: the rule is missing, and writing it is theirs.
   *
   * IT NAMES NO SLIDE AND COUNTS NOTHING. "the leader's job" and never "the next four
   * slides" — the run is composed per deck set (§3.4) and a sentence that pointed at its
   * own successors would go stale the first time one was inserted or cut.
   */
  closer: "Nobody broke a rule. There was no rule to break — and writing one is the leader's job.",
  closerKw: ["no rule to break"],
} as const;

// ═════════════════════════════════════════════════════════════════════════════
// THREE THINGS WE GOT WRONG — §6.3, the THIRD slide of this section's run.
// ═════════════════════════════════════════════════════════════════════════════
//
// §6.3 is two sentences: "Nanovest failures, first person. HR p16–18 outcomes are cut —
// outcomes brag, failures transfer, and the confession pays the credibility debt before
// L.2/L.3 arrive." Everything below is that confession: three dated entries, in the
// order they happened, each one a decision that was ours and a consequence that was
// ours too. The slide lays them down and stops — it does not generalise them, which is
// the slide directly behind this one (§6.4).
//
// ═══ PROVENANCE — TWICE DOCUMENTED, NOTHING INVENTED. Every fact below is Nanovest's
// own record, written down twice before this deck existed:
//
//   · `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md`, slides 5, 6 and 7
//     (≈ lines 126–158): "Tools Without Direction" (Q1 2025 — five-plus tools with no
//     standard, knowledge trapped with individuals), "Building Without Strategy"
//     (Q2–Q4 2025 — a custom knowledge base, an internal document crawler and six of
//     ten connectors scrapped or displaced; four company-specific ones survived) and
//     "Enabling Without Empowering" (mid-2025 through Q1 2026 — departments became
//     consumers, and the central committee became the delivery bottleneck).
//   · `docs/researches/internal-hr-group.md` §1.3 (≈ lines 33–41) and its slide-by-slide
//     reuse table (≈ lines 193–195), which grade all three ESSENTIAL for exactly the
//     reason this slide exists: "the presentation admits failure, which makes Nanovest
//     credible as a guide, not a sales pitch."
//
// The three quantities below — five tools, three quarters, six of ten connectors and
// the four company-specific survivors — come from those two documents and from nowhere
// else. Nothing here is rounded up, and nothing here is a number this deck measured.
//
// ═══ HR p16–18 OUTCOMES ARE CUT, AND THE CUT IS §6.3's, NOT A PREFERENCE. A PDF page N
// is source slide N−1, so p16–18 are HR slides 15, 16 and 17: the app-performance
// benchmark, the support chatbot and the capability-calibration pair. NONE of their
// vocabulary appears in any string below — not the multiples, not the competitor names,
// not the deflection figure, not the ownership chain, not the preparation/implementation
// split. `tests/unit/gap-three-failures.test.tsx` holds that as a regex list fired
// against the sentences the research actually prints, so the list cannot rot into a set
// of patterns that match nothing.
//
// The reason is one line of §6.3 and it is worth keeping in front of whoever edits this
// block next: OUTCOMES BRAG, FAILURES TRANSFER. A leader who is shown a 6.90× multiple
// learns that somebody else's team is good; a leader who is shown three decisions that
// cost real quarters can check them against their own. The confession is also what pays
// for the two later sections that ask this room for money and authority — a deck that
// arrives with only its wins has spent nothing before it asks.
//
// ═══ THE VOICE, AND IT IS TESTABLE. The three failures are FIRST PERSON PLURAL: "we
// bought", "we built", "we owned". The closer turns to FIRST PERSON SINGULAR — "Every
// one of these calls was mine" — because the person standing in front of the room is the
// person who made them, and a confession delivered in the passive is not a confession.
//
// THERE IS NO SECOND PERSON ANYWHERE ON THIS STAGE. Not one "you", "your" or "yours",
// and the test holds it word-boundary and case-insensitive over every rendered string.
// That single property is what separates this slide from three others that are allowed
// to make the turn it may not:
//
//   · D.3 (`leader-invest/content.ts`, `invest-chicken-egg`) ends its fourth beat on
//     "You are the person who can skip all three." — the same three failures, handed to
//     the room as a shortcut.
//   · M.1 (`reveal-and-closing/content.ts`, `j1-humility-intro`) prints "— Hard-earned
//     lessons. So you skip my mistakes."
//   · M.2 (`j2-five-principles`) prints "Each one earned. Each one yours to skip past."
//
// All three were read before this block was written. THIS SLIDE MAY NOT MAKE THE "SO YOU
// CAN SKIP IT" MOVE: it is D.3's beat and M.1/M.2's whole register, and a confession that
// arrives already converted into a favour for the listener is a sales pitch with a
// humble first paragraph. B.3 admits three things and stops.
//
// ═══ TOKENS THE NEIGHBOURS OWN, CHECKED AGAINST THEIR REAL STRINGS RATHER THAN FROM
// MEMORY. Nothing below re-spends any of:
//
//   · D.3's — `deadlock`, `no budget without proof`, `shared accounts`, `banned`,
//     `what it cost`, `30-day`, `proof pilot`, `kill criterion`, `spend cap`.
//   · B.2's, one slide up in this same run — `the rule nobody wrote`, `wrote their own`,
//     `never wrote down`, `handed out`, `login`, `demonstration`, `encouragement`,
//     `which work may`, `silence`, `still gets answered`, `no rule to break`, `the
//     leader's job`, and §6.2's own `no guidance` / `improvise` / `no-SOP`.
//   · B.1's, two slides up — `procured`, `instantly`, `invoice`, `tool access`, `70%`,
//     `30%`, `70/30`, `people & process`, `earned`, `capability`, `technology`.
//   · L.3's summary of these same three failures (`reveal-and-closing/content.ts`,
//     `i3-portfolio`): "three honest failures — methodology, strategy, empowerment".
//     THAT TRIPLE IS THE ONE PARAPHRASE THIS SLIDE MAY NOT USE, and the reason is that
//     it is already rendered somewhere else in the same deck. The three titles below name
//     the DECISION instead of the discipline — what was bought, what was built, what was
//     owned — which is also the register a confession is written in.
//
// THE DELIBERATE ECHO: NONE. B.1 and B.2 sit directly in front of this slide in the same
// run, and this block shares no vocabulary with either by design — the three arguments
// are different (the hard part is not the tools · nobody wrote the rules · here is what
// we got wrong), and a run that rhymes across three consecutive stages reads as one long
// slide. Said out loud here so a reviewer can see the absence was chosen.
//
// ═══ WHAT THIS SLIDE MAY NOT SAY, because three siblings own it:
//
//   · THE PATTERN ACROSS THE THREE FAILURES → §6.4 (`gap-the-pattern`), the slide
//     directly behind this one. Nothing below generalises, summarises or counts a lesson;
//     three entries are laid down and the closer owns them rather than explaining them.
//   · L1–L5, THE RUNGS AND THE DECISION CONTRACT → §6.5, at the top of this file.
//   · SHADOW AI, IN ANY OF ITS THREE PASSES → §6.2 (`gap-no-sop`, condition), §6.7 (D.3
//     rational behaviour, D.4 beat 2 exposure). Nothing below is about anybody using a
//     tool they were not given.
//
// ═══ ONE CONTENT BLOCK, NO BRAND AXIS, NO `…For(brand)` RESOLVER — the third block in
// this file to make that call, and the plainest case of the three. §4.4's seven brand ×
// deckSet slots do not list this slide, and these failures are NANOVEST'S OWN: they are
// the same three admissions in a Berau room and in a GEMS room, because the organisation
// that made them is the one presenting. Varying them by audience would mean either
// inventing a second organisation's failures or editing our own to flatter a room, and
// both are worse than the shared block. The slide file imports no `VARIANT` at all,
// which is what lets its test mount it under both leader brands and compare byte for
// byte.
//
// ═══ THE KEYWORD RULE, applied without an exception: `kw` on PROSE ONLY.
//
//   · PROSE, each with a `*Kw` sibling — EIGHT strings: `headline`, `closer`, and each
//     failure's `did` and `cost`.
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — EIGHT strings:
//     `figLabel`, `ledgerEyebrow`, the three `period`s and the three `title`s. The three
//     TITLES are the sharpest case here: they are sentence-shaped ("WE BOUGHT BEFORE WE
//     AGREED") and would take emphasis happily. They are labels because they are the
//     ledger's entry names — set in mono caps, read as a column down the stage — and a
//     copper italic inside a mono label reads as a rendering fault everywhere else in
//     this deck.
//
// ═══ NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). This slide
// composes as the THIRD of the `gap` run today; the figure reference in front of the
// label is DERIVED by the composer, and `FigLabel` takes a LABEL only. The four-digit
// years below are dates in the ledger's own rail and are the only figures on the stage.

/**
 * One entry in the ledger: when it happened, what it was called, what we did, what it
 * cost.
 *
 * FOUR FIELDS AND TWO REGISTERS, and the split is the keyword rule drawn in the type.
 * `period` and `title` are LABELS and carry no `*Kw` sibling — they are the ledger's rail
 * and its entry names. `did` and `cost` are PROSE and each carries one.
 *
 * `did` THEN `cost`, ALWAYS IN THAT ORDER, and never one without the other: an entry
 * that named a decision with no consequence is a boast in the shape of an admission, and
 * an entry that named a consequence with no decision is a complaint about the weather.
 * The pair is what makes it a record.
 */
export interface RecordedFailure {
  id: string;
  /**
   * When it happened. Mono LABEL, keyword-free, right-aligned to the spine.
   *
   * EN DASH FOR A RANGE — "Q2–Q4 2025", "2025–2026" — matching every other range in this
   * deck (the Capability Ladder's "NANOVEST · L1–L2" at the top of this file). A hyphen
   * here is a typographic bug, not an abbreviation.
   */
  period: string;
  /**
   * What the entry is called. Mono caps LABEL, keyword-free.
   *
   * EVERY TITLE NAMES A DECISION AND OPENS ON "WE", which is what keeps this a confession
   * rather than a lesson: "WE BOUGHT BEFORE WE AGREED" is a thing somebody chose, while
   * "TOOLS WITHOUT METHODOLOGY" — the research's own heading — is a category. It also
   * keeps the three titles clear of L.3's rendered summary of these same failures
   * ("methodology, strategy, empowerment"; see the header).
   */
  title: string;
  /** What we did. PROSE. First person plural, past tense, no qualifier. */
  did: string;
  didKw: readonly string[];
  /** What it cost. PROSE. The consequence, stated as flatly as the decision. */
  cost: string;
  costKw: readonly string[];
}

/**
 * The three, IN THE ORDER THEY HAPPENED — and the order is not a ranking.
 *
 * A LEDGER IS KEPT IN ORDER, which is the whole reason `./three-failures-geometry.ts`
 * draws a dated rail and a spine rather than three cards. Read down, the three are also
 * an escalation in what was at stake: a quarter of inconsistent output, then three
 * quarters of work the market shipped anyway, then a whole organisation's ability to
 * build for itself. Nothing below says that out loud — saying it is §6.4's slide.
 *
 * EXACTLY THREE, HELD BY THE TYPE, using the fixed-length tuple idiom already declared
 * in this file for `gapNoSopContent`'s issued column: a fourth entry's error lands ON the
 * fourth entry, at the definition site, with no cast anywhere. `./three-failures-geometry.ts`
 * pins its own count to this tuple's `length`, so a fourth entry fails to compile there
 * too rather than silently pushing the closer through the NavBar's hover band.
 */
const FAILURES: Three<RecordedFailure> = [
  {
    id: "tools-before-method",
    period: "Q1 2025",
    title: "WE BOUGHT BEFORE WE AGREED",
    /** HR slide 5: five-plus tools explored with no standard between them. The sentence
     *  puts the ORDER of the two acts in the keyword, because the tools were not the
     *  mistake — buying them before agreeing how to use them was. */
    did: "We put five tools in front of the team before we had agreed on one method for using any of them.",
    didKw: ["before we had agreed on one method"],
    /** HR slide 5's second half: inconsistent, non-scalable output, and knowledge trapped
     *  with the individuals who found it. The keyword is the durable half — a result
     *  nobody else can reuse is a result the organisation did not get. */
    cost: "Every result looked different, none of it was reusable, and whatever worked stayed inside whoever found it.",
    costKw: ["stayed inside whoever found it"],
  },
  {
    id: "built-what-existed",
    period: "Q2–Q4 2025",
    title: "WE BUILT WHAT ALREADY EXISTED",
    /** HR slide 6: a custom knowledge base and an internal document crawler, built over
     *  three quarters while the external ecosystem shipped both. "three quarters" is the
     *  cost of the decision stated as time, which is the only currency this slide spends. */
    did: "We spent three quarters building our own knowledge base and our own document crawler, while the market shipped both.",
    didKw: ["while the market shipped both"],
    /** HR slide 6's scrapped-against-survived column, verbatim in its arithmetic: six of
     *  ten connectors scrapped or displaced, four company-specific ones retained. The
     *  keyword is the finding rather than the loss — what survived is exactly what nobody
     *  outside could have written, and that is the reusable half of this entry. */
    cost: "Six of our ten connectors were scrapped or overtaken. The four that survived were the four nobody else could have written for us.",
    costKw: ["nobody else could have written for us"],
  },
  {
    id: "owned-their-work",
    period: "2025–2026",
    title: "WE OWNED WHAT THEY SHOULD HAVE",
    /** HR slide 7: the committee ran pilots for Operations, Data, Product and Legal, and
     *  showcased the wins. THE PRIDE IS IN THE SENTENCE ON PURPOSE — the failure is not
     *  that the work was bad, it is that the work was ours, and an admission that leaves
     *  out why it felt right at the time is an admission nobody learns anything from. */
    did: "We built the solution for every department that asked, and we were proud of how fast we delivered.",
    didKw: ["proud of how fast we delivered"],
    /** HR slide 7's core message: departments became consumers rather than owners, and the
     *  central team became the delivery bottleneck. "the queue" and NOT "the bottleneck" —
     *  `leader-mandate/content.ts` renders "Naming the bottleneck is the part only you can
     *  do" in K.1, and a word this deck has already given to another slide's closer is a
     *  word this one does not get to spend. */
    cost: "They became consumers of what we made, and we became the queue that every change had to pass through.",
    costKw: ["the queue that every change had to pass through"],
  },
];

export const gapThreeFailuresContent = {
  /** The `FigLabel`'s LABEL. The letter and number in front of it are DERIVED from the
   *  composed deck (§3.5) and are authored nowhere. */
  figLabel: "THREE THINGS WE GOT WRONG",

  /**
   * §6.3's confession as one sentence. PROSE.
   *
   * "We got here" IS THE FIRST HALF AND IT IS LOAD-BEARING. Without it the line is an
   * apology; with it, the three failures below are the route to whatever this deck is
   * about to recommend, which is the only honest reason to put them on a stage in front
   * of people being asked for money. The keyword sits on the failing rather than on the
   * arriving, because the room already believes the arriving.
   */
  headline: "We got here by failing three times first.",
  headlineKw: ["failing three times"],

  /**
   * Band 1's one heading. Mono LABEL, keyword-free.
   *
   * "IN ORDER" IS THE INSTRUCTION FOR READING THE FIGURE — the stage is a dated rail with
   * a spine down it, and the eyebrow is what says the sequence is chronological rather
   * than a ranking of how bad each one was. It says RECORD and not "lessons": a lesson is
   * a thing extracted from a failure, and extracting them is §6.4's slide.
   */
  ledgerEyebrow: "THE RECORD, IN ORDER",

  failures: FAILURES,

  /**
   * The closer, and the slide's last arrival. PROSE, and the one line in first person
   * SINGULAR.
   *
   * TWO SENTENCES, AND THE SECOND IS THE SLIDE. "None of this is borrowed" refuses the
   * reading a room reaches for by default — that these are case studies, or somebody
   * else's cautionary tales — and the second sentence puts a name behind them. It is the
   * reason `../gap-three-failures.tsx` exports it as the canonical pose: three admissions
   * with no line owning them is a page that travels badly.
   *
   * IT DOES NOT TURN TO THE ROOM. No "so you can skip them", no "learn from us" — that
   * turn belongs to D.3's fourth beat and to M.1/M.2 (see the header), and made here it
   * would convert the confession into the favour it is trying not to be.
   */
  closer: "None of this is borrowed. Every one of these calls was mine.",
  closerKw: ["Every one of these calls was mine"],
} as const;

// ═════════════════════════════════════════════════════════════════════════════
// THE PATTERN — §6.4, the FOURTH slide of this section's run.
// ═════════════════════════════════════════════════════════════════════════════
//
// §6.4 IS ONE LINE — "The pattern across the three failures" — AND THAT IS NOT AN
// OVERSIGHT IN THE SPEC. B.4 HAS NO CONTENT OF ITS OWN: it is the SHAPE of B.3, which is
// why the two ship on one ticket and why this block sits directly under
// `gapThreeFailuresContent` above. B.3 lays down three first-person Nanovest failures;
// this block says what all three were the same. Every string below is derivable from the
// three entries above it, and nothing below introduces a fourth fact.
//
// WHAT THE GENERALISATION IS FOR. It hands the argument to §6.5's Capability Ladder by
// proving §6.1's claim on the presenter's own record: B.1 asserts that the hardest part
// is not the tools — about the world, on somebody else's statistic — and B.4 says the
// same thing about three failures the presenter owns, then names what was missing as a
// CAPABILITY. Without that last move B.4 is a second telling of B.3 with a lesson
// attached, and the ladder behind it arrives as the next thing the deck has rather than
// as the next thing the room wants.
//
// ═══ PROVENANCE, AND WHERE THIS DECK DEPARTS FROM IT.
//
//   · THE HR ORIGINAL DREW THIS PATTERN ITSELF.
//     `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md` slide 8 ("The Pattern
//     Emerges") reduces the same three failures to three lessons — methodology over
//     tools · research over building · champions over labour — and to three shifts: code
//     → knowledge, implementors → enablers, build it → enable it.
//     `docs/researches/internal-hr-group.md` §1.4 records the same slide as "the core
//     teaching moment", and §3.3 keeps its one-line root cause: "Tools Without Direction +
//     Tools Without Strategy + Tools Without Empowerment = Noise" — i.e. the original had
//     already noticed that three failures were one.
//   · §6.4's REFRAME IS THE DECK'S OWN, AND IT IS THE WHOLE VALUE THIS BLOCK ADDS. HR's
//     pattern points at ENABLEMENT; this one points at CAPABILITY. Enablement describes
//     what the team changed about itself, and it is a true description — but it is a story
//     about a team, and the next slide is a ladder an ORGANISATION is placed on. Capability
//     is a property the organisation either has or does not, which is the only one of the
//     two a ladder can measure. So the three reductions below name what each failure was
//     MISSING rather than what the team learned, and the verdict says "a capability the
//     organisation did not have yet".
//   · NONE OF THE HR VOCABULARY SURVIVES THE REFRAME, and that is deliberate rather than
//     incidental: no `methodology`, no `empowerment`, no `enable`/`enabler`/`enablement`,
//     no `mindset`. Two of those are already RENDERED elsewhere in this deck — L.3's
//     portfolio panel (`reveal-and-closing/content.ts`) prints "three honest failures —
//     methodology, strategy, empowerment" and "mindset flip — 'how to build?' → 'how to
//     enable?'" — so a leader deck running both would say the same thing twice, forty
//     slides apart, in two different voices. `tests/unit/gap-the-pattern.test.tsx` holds
//     that against L.3's real strings.
//
// ═══ THE DELIBERATE ECHO OF B.1, RECORDED SO A REVIEWER SEES IT WAS CHOSEN.
//
// `gapHardestPartContent` headlines "The hardest part is not the tools." and labels its
// own band "THE GAP · ACCESS AGAINST CAPABILITY". {@link gapThePatternContent.capabilityLine}
// closes that loop ON PURPOSE — it is the section's thesis stated once as an assertion
// about the world and once as a finding about ourselves, which is the pair §6.1 and §6.4
// exist to make. This is the same kind of note `gapHardestPartContent` keeps about its own
// "earned" rhyme with the ladder: an echo is a second slide reaching the same conclusion
// by its own route, and a re-spend is the first slide's sentence arriving late.
//
// SO NONE OF B.1'S ACTUAL VOCABULARY IS RE-SPENT: not `procured`, `instantly`, `invoice`,
// `tool access`, `70%`, `30%`, `70/30`, `people & process`, `earned` — and not
// `technology`, which is the other half of B.1's quoted split. The closer below says
// "buying" rather than "procured" for exactly that reason, and it is the better word here
// anyway: B.1 is about what a signature BUYS, and this slide is about what no signature
// could have bought.
//
// ═══ WHAT THIS SLIDE MAY NOT SAY.
//
//   · L1–L5, `rung`, `ladder`, `level`, `decision contract` → §6.5, at the top of this
//     file. This slide HANDS OFF to that one, and the point of a handoff is that the
//     receiving slide gets to introduce its own vocabulary. Checked against the shipped
//     `gapLadderContent` rather than against §6.5's text.
//   · SHADOW AI, in any of its three passes → §6.2 (`condition`, above in this file) and
//     §6.7 (D.3 `rational behaviour`, D.4 beat 2 `exposure`). Nothing below is about tools
//     anybody reached for unasked; all three reductions are about tools the organisation
//     chose deliberately and got wrong.
//   · THE HR p16–18 OUTCOMES §6.3 CUTS — the performance multiple, the chatbot's name and
//     its conversation and deflection figures, the four benchmarked apps, "same codebase",
//     "one large prompt". Outcomes brag and failures transfer; a slide that GENERALISES the
//     failures is exactly where a win would come back in through the back door, so nothing
//     below carries a number at all.
//   · A SUCCESSOR, OR A COUNT OF ITS SUCCESSORS. No "the next slide", no "the next four",
//     no letter. `gapHardestPartContent.closer` and `gapNoSopContent.closer` both record
//     this rule: the run is composed per deck set (§3.4) and a sentence that pointed at its
//     own successors goes stale the first time one is inserted or cut.
//
// ═══ THE VOICE, WHICH IS THE PROPERTY THIS PAIR OF SLIDES LIVES OR DIES ON.
//
// B.3 is first person — `we`, then `I`. B.4 STAYS first person plural for the pattern
// (`we added`, `without us`) and turns IMPERSONAL for the verdict (`the organisation`).
// The switch is the structure: the record is ours, the claim it licenses is general.
// THERE IS NO SECOND PERSON ANYWHERE ON THIS SLIDE — the same hard property B.3 keeps, and
// it is what holds the pair as a confession rather than a lecture. One `you` turns three
// admitted failures into an accusation aimed at the room, and a room that has been accused
// stops hearing the pattern. There is no first person SINGULAR either: B.3 ends on "Every
// one of these calls was mine", and repeating that move here would make the generalisation
// a second confession instead of a claim.
//
// ═══ NO NUMBER, ANYWHERE. Not one numeral in any string below. B.2 above holds the same
// absence for §6.2's no-shared-statistic rule; here it is doing a different job. A pattern
// stated with a figure in it invites the room to check the figure instead of the pattern,
// and B.3 next door already spends every quantity this history has (five tools, three
// quarters, six of ten connectors). The one thing B.4 adds is the shape, and a shape has
// no magnitude.
//
// ONE CONTENT BLOCK, NO BRAND AXIS, NO `…For(brand)` RESOLVER — the third such call in
// this file. §4.4's seven brand × deckSet slots do not list this slide, and the failures it
// generalises are the PRESENTER'S: neither leader room owns this record and neither is
// being shown its own evidence, so there is nothing for a brand to vary. The slide file
// imports no `VARIANT` at all, which is what lets a test mount it under both leader brands
// and compare byte for byte.
//
// THE KEYWORD RULE, applied without an exception: `kw` on PROSE ONLY.
//
//   · PROSE, each with a `*Kw` sibling — FOUR strings: `headline`, `pattern`,
//     `capabilityLine`, `closer`.
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — SIX strings: `figLabel`,
//     `reductionEyebrow`, `sameEyebrow` and the three `reductions` labels.
//     THE THREE REDUCTIONS ARE THE SHARPEST CASE. They are the most quotable copy on the
//     stage and they would take emphasis happily — but three copper italics down one
//     column would RANK three things this slide exists to say are the same, which is the
//     one claim the figure must not make. `gapNoSopContent`'s four questions are the
//     shipped precedent for sentence-shaped copy held in the label register.
//
// NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). This slide composes as
// the FOURTH of the `gap` run, which is B.4 in today's leader decks and is derived per deck
// by the composer; `FigLabel` takes a LABEL only. Do not write either down.

/**
 * One failure, reduced to the half that was missing. A LABEL, keyword-free by the rule
 * above.
 *
 * Cut for ONE line: 480px of 15px sans, which is ≈64 characters. The longest below is 42.
 * A reword past the measure wraps into the air under it and the brace beside the column
 * stops bracketing three rows — see `./the-pattern-geometry.ts`, which derives the
 * hairline's span from the row placement function for exactly that reason.
 */
export interface PatternReduction {
  id: string;
  label: string;
}

/**
 * THE THREE, IN B.3's ORDER, EACH REDUCED TO WHAT IT WAS MISSING.
 *
 * THE PARALLEL CONSTRUCTION IS THE IMAGE'S ARGUMENT, and it is the reason these are not
 * restatements of `FAILURES`' sentences above. Every one is an `X, with no Y` noun phrase:
 * what we added, then the half that was absent. Read down the column, the three RHYME —
 * and the room sees them rhyme before the slide says so, which is what makes the brace
 * beside them a description rather than an assertion. A row rewritten as a sentence, or
 * one of the three given a different shape, silently deletes that.
 *
 * WHAT EACH ONE REDUCES, entry by entry, so the mapping back to B.3 is checkable:
 *   · `no-method`   ← "WE BOUGHT BEFORE WE AGREED". Five tools, no agreed method — and the
 *                     missing half is not the agreement, it is that nothing was REPEATABLE
 *                     by anybody who was not in the room.
 *   · `no-research` ← "WE BUILT WHAT ALREADY EXISTED". Three quarters of building, and the
 *                     missing half is the looking that would have come first.
 *   · `no-owner`    ← "WE OWNED WHAT THEY SHOULD HAVE". Solutions delivered fast, and the
 *                     missing half is anybody on the other side who owned what arrived.
 *
 * NO ROW NAMES A LESSON. "Research first" and "build with people, not for them" are the HR
 * original's phrasings (§3.2, §3.3 of `docs/researches/internal-hr-group.md`) and they are
 * INSTRUCTIONS — a slide of instructions is a slide the room can agree with and forget.
 * These are diagnoses, and a diagnosis is what a capability claim can be built on.
 *
 * ORDER IS B.3's, NEVER RE-SORTED. The room has just read the three in that sequence; a
 * reordering here would cost the reader a lookup on the one slide whose whole job is to be
 * instantaneous.
 *
 * EXACTLY THREE, HELD BY THE TYPE, using the fixed-length tuple idiom already declared in
 * this file. `./the-pattern-geometry.ts` pins its own count to this tuple's `length`, so a
 * fourth entry fails to compile there too — and a fourth would do more than deepen a
 * column: the brace re-centres on the taller span, so the stub and the whole statement
 * block move with it.
 */
const REDUCTIONS: Three<PatternReduction> = [
  { id: "no-method", label: "Tools, with no method anyone could repeat." },
  { id: "no-research", label: "Builds, with no research in front of them." },
  { id: "no-owner", label: "Delivery, with no owner behind it." },
];

export const gapThePatternContent = {
  /** The `FigLabel`'s LABEL. The letter and number in front of it are DERIVED from the
   *  composed deck (§3.5) and are authored nowhere. */
  figLabel: "THE PATTERN",

  /**
   * §6.4 in one sentence, and the second half is the only new thing on the stage. PROSE.
   *
   * "Three failures" is a count the room has just watched being laid down, so it carries
   * no keyword — it is the given. "The same shape every time" is the claim, and SHAPE is
   * the deliberate word: not "the same mistake" (which would be an apology for one error
   * repeated), not "the same lesson" (which would be the HR original's frame), but the
   * form the three share. The stage draws that form as a brace, so the headline and the
   * figure are saying one thing in two media.
   */
  headline: "Three failures. The same shape every time.",
  headlineKw: ["The same shape every time"],

  /** The left column's heading. Mono, keyword-free. It says what the column IS — three
   *  things already told, compressed — so nobody reads three short phrases as three new
   *  claims arriving without evidence. */
  reductionEyebrow: "THE THREE, IN ONE LINE EACH",

  reductions: REDUCTIONS,

  /** The right block's heading. Mono, keyword-free, and PAST TENSE: the pattern is a
   *  finding about a record that is closed, not a diagnosis of how things stand today.
   *  The present tense would make it a claim about the organisation now, which is the
   *  verdict's job one band lower and not this block's. */
  sameEyebrow: "WHAT WAS THE SAME",

  /**
   * THE PATTERN ITSELF — the one statement the three reductions instantiate. PROSE, and
   * the brightest thing in its band.
   *
   * TWO SENTENCES, AND THE SECOND IS THE SLIDE. "Each time we added something" is the half
   * the room already believes and the half that sounds like competence — tools, builds,
   * delivery, all of it real work. "Not once did we add the ability to run it without us"
   * is what all three were missing, and the keyword sits there for that reason.
   *
   * "without us" IS THE HINGE AND IT IS FIRST PERSON ON PURPOSE. The absence is not that a
   * capability was missing in the abstract; it is that everything built kept needing the
   * people who built it. That is what makes the verdict below a claim about the
   * ORGANISATION rather than a complaint about resourcing — and it is the sentence the
   * Capability Ladder is a ladder FOR.
   *
   * "the ability to run it" AND NOT "ownership", "adoption" or "enablement": the first is
   * K.1's word, the second is the deck's most over-used noun, and the third is the HR
   * original's frame this block deliberately leaves behind (see the header).
   */
  pattern:
    "Each time we added something. Not once did we add the ability to run it without us.",
  patternKw: ["the ability to run it without us"],

  /**
   * THE VERDICT — band 2, full width, alone. PROSE.
   *
   * IT REFUSES BEFORE IT NAMES, and the order is the argument. After three entries about
   * tools, builds and delivery, the conclusion a leader arrives at unaided is that this was
   * a tooling problem — the wrong tools, or too many, or the wrong sequence of buying them.
   * That reading is available, it is wrong, and it is fatal to everything behind this
   * slide, so the first sentence spends itself refusing it and the second says what was
   * actually missing.
   *
   * THIS IS THE ECHO OF B.1, AND IT IS CHOSEN — see the header. B.1 asserts the same thing
   * about the world with a third party's statistic; this line proves it on the presenter's
   * own record, which is the only form of the claim a room can check. None of B.1's
   * vocabulary is re-spent: "a tooling problem" and not "tool access", "not one of the
   * three" and not a percentage.
   *
   * "did not have YET" is the last word and it is load-bearing. Without it the sentence is
   * a verdict on an organisation; with it, it is a description of a position — which is
   * what makes the next slide's staircase the obvious thing to want.
   *
   * IMPERSONAL, DELIBERATELY. The pattern above it is `we`; this is `the organisation`,
   * because a capability is a property of an org and not of the people who admitted the
   * failures. Cut for ONE line: 104 characters, ≈881px in a 1184px box.
   */
  capabilityLine:
    "Not one of the three was a tooling problem. Each one was a capability the " +
    "organisation did not have yet.",
  capabilityLineKw: ["a capability the organisation did not have yet"],

  /**
   * The closer, and the slide's last arrival. PROSE.
   *
   * THE WHOLE SECTION'S ARGUMENT IN ONE LINE, which is what earns it its own band. "Three
   * failures, one absence" is the reduction the stage has just drawn, restated as
   * arithmetic; "no amount of buying would have closed it" is what that arithmetic means
   * for the person in the room who controls a budget — and it is the sentence that makes
   * the Capability Ladder a request for something other than money.
   *
   * "buying" AND NOT "procurement" OR "procured": B.1 owns that verb (see the header), and
   * the plain word is the better one here anyway — B.1 is about what a signature BUYS, and
   * this is about what no signature could have bought.
   *
   * IT NAMES NO SUCCESSOR AND COUNTS NOTHING. "no amount of buying" and never "the next
   * slide" — the run is composed per deck set (§3.4) and a sentence that pointed at its own
   * successors would go stale the first time one was inserted or cut.
   */
  closer: "Three failures, one absence — and no amount of buying would have closed it.",
  closerKw: ["no amount of buying would have closed it"],
} as const;
