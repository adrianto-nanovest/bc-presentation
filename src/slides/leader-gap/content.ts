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
