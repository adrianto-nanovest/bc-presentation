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
// labels and every source string are keyword-free — they are what the audience
// reads as a label, and a copper italic inside a mono label reads as a rendering
// fault. `tests/unit/gap-capability-ladder.test.tsx` holds that as a list, so a
// new string has to pick a side.
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
   * What this rung is, in the plainest words that are still true.
   *
   * WHO DOES THE WORK, AND WHO DECIDES — one sentence each, in that order, because
   * that is the only axis the five rungs actually move along and a room cannot
   * place itself on a definition it has to decode first. §6.5's own wording was
   * shorter and two of the five were unreadable without the deck's back matter:
   * L3 said "Decision contract · 70/30 split" — a ratio this deck prints nowhere
   * else on this slide, and one that collides head-on with B.1's adoption-failure
   * 70/30 four slides earlier — and L4 said "Coordinated agents, escalation
   * paths", which names a mechanism without saying where it ends. Both terms of
   * art SURVIVE, because `mandate-phases-gates` turns each into a gate and quotes
   * the definition back; what changed is that the definition now defines them.
   *
   * NO `subKw`, AND THAT IS A DECISION. The build rule is "`kw` on prose only",
   * which permits a highlight here and does not ask for one — and five highlighted
   * definitions would put five copper italics along the staircase, competing with
   * the marks the slide is actually about. The rungs are the vocabulary; the
   * emphasis belongs to the argument laid over them. So this field is prose that
   * carries no keywords, and the test classifies it with the labels for that
   * reason rather than by accident.
   *
   * TWO LINES IS THE BUDGET at 11.5px sans in a 200px column — `./geometry.ts`
   * gives a rung label 78px of floor and the name takes the first 22 of it.
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
  {
    id: "l1",
    level: "L1",
    title: "Assisted",
    sub: "Some people use it, each in their own way.",
  },
  {
    id: "l2",
    level: "L2",
    title: "Copilot at scale",
    sub: "Everyone has the tool. People still do every step.",
  },
  {
    id: "l3",
    level: "L3",
    title: "Agentic, bounded",
    sub: "One agent does the task. A decision contract sets its limits.",
  },
  {
    id: "l4",
    level: "L4",
    title: "Multi-agent mesh",
    sub: "Agents split one job, with escalation paths back to people.",
  },
  {
    id: "l5",
    level: "L5",
    title: "Full agentic org",
    // The headline carries "declared only when earned", so this line does not
    // repeat it: a rung whose definition is its own caveat teaches nothing.
    sub: "Agents run the work by default.",
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
  /**
   * WHERE ALONG that tread the dot sits, 0…1. Omitted means the midpoint.
   *
   * LAYOUT, NOT A HEDGE — the dot's height is the claim and its `x` says nothing.
   * It exists because the chip does not move: the tech slot is fixed at x=456…740
   * (`./geometry.ts`'s `TECH_SLOT`) so that both brands' rooms look at the same
   * rectangle, while the tread under it moves 220px left per rung. L3's midpoint is
   * at 638 and sits inside that slot; L2's is at 418 and does not, so a mark on L2
   * with no `t` starts its leader in mid-air beside the chip it belongs to. The
   * test walks every brand's rendered leader against its rendered slot for exactly
   * this, and it is the one geometric assumption a content edit can break.
   */
  t?: number;
  /** Mono, uppercase. Keyword-free. */
  label: string;
  /**
   * WHY THIS RUNG — one point per line, each answering the rung's own definition.
   *
   * A PARAGRAPH BECAME POINTS on the owner's call of 2026-08-13, and the rewrite
   * was not a reformat: the retired string described GEMVIS ("a dispatcher agent
   * in front of specialists. 50 apps, 4,000+ users") and left the room to work out
   * what any of that had to do with L3. A description under a placement is a
   * caption; the placement has to be ARGUED, because `≈ L3` is the one claim on
   * this slide anybody could dispute.
   *
   * So each point maps onto one clause of L3's own definition, in its order — an
   * agent does the task, its limits are set, and it is real work rather than a
   * pilot. Read down, they are the reason the rung is L3 and not L2 (people still
   * do every step) or L4 (agents split one job between them).
   *
   * KEYWORD-FREE, like every other label on this stage, and cut for ONE LINE each
   * in the slot's mono register. A point that wraps stops being a point — see
   * {@link POINT_MAX}, which is the measured budget and not a style preference.
   */
  points: readonly string[];
  /** The sourcing, printed ON the slide — §6.5 requires the citation to be
   *  visible, not footnoted. Keyword-free: it is a source, not a sentence we are
   *  making a point with. */
  source: string;
}

/**
 * How long an {@link AssertedMarker} point may be before it wraps.
 *
 * MEASURED IN A BROWSER, not guessed: the tech slot is 284px, its chip spends 32 on
 * padding and 2 on borders, and the bullet rule and its gap take 16 more — so a
 * point has 234px of 10.5px mono, which is 32 characters at that face's advance
 * width. 36 wrapped; 33 is the first that did not fit on the walk of 2026-08-13.
 *
 * IT LIVES HERE AND NOT IN THE COMPONENT because it is a constraint on COPY. jsdom
 * measures nothing, so `gap-capability-ladder.test.tsx` cannot catch a wrap by
 * rendering one — it fires this number at every point instead, which is the only
 * check that runs before somebody projects the slide.
 */
export const POINT_MAX = 32;

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
 * A UNION, so "never both, never neither" is a fact the compiler holds. Whatever a
 * brand has in this slot, the absence must be STATED rather than left out, because
 * silence in that slot reads as an unfinished slide (#16's finding 4). A nullable
 * `asserted` beside an optional `absence` would have let a brand ship neither, and
 * the failure would have been a blank rectangle on a projector.
 *
 * NO REGISTERED BRAND TAKES THE `absent` ARM TODAY. It was written for Berau, on
 * §6.5's reading that MineTech has nothing comparable to GEMVIS, and the owner's
 * correction of 2026-08-14 moved that fact into the Berau chip's source line — what
 * MineTech has no equivalent of is a published output, not a rung. The arm stays,
 * because `general` uses it and because the next organisation this deck is cut for
 * may genuinely have nothing to place; deleting it would mean inventing a placement
 * for that brand or shipping the blank rectangle.
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

  rungs: RUNGS,

  /**
   * The lit stretch's name — two words, mono, keyword-free.
   *
   * IT LABELS A DRAWING AND NOT A SENTENCE. The stretch of staircase between the
   * question and the claim is drawn on the last pose (`./geometry.ts`'s
   * `stairPathBetween`), and a lit line with no name is a decoration. Two words
   * is the whole budget: the closer says what the distance MEANS, and the figure
   * is already showing how far it is.
   *
   * THE COUNT IS NOT IN THE STRING. "Two rungs" is true of the GEMS ladder and of
   * no other, because the span is the distance between one brand's own two marks —
   * so it lives in that brand's closer, where a second brand cannot inherit it.
   */
  gapLabel: "THE GAP",

  /**
   * The Nanovest marker — the third mark, at L3–L4 under BOTH brands.
   *
   * MOVED UP TWO RUNGS FROM §6.5's L1–L2, on the owner's placement (2026-08-13),
   * and the copy had to move with it. The old note was a joke about standing on
   * the second rung; a mark at L3–L4 cannot make that joke, and a mark at L3–L4
   * that says nothing at all reads as a boast — it sits level with or above the
   * one placement on this ladder that carries an outside citation. So the note
   * spends its one sentence on the only thing that makes the position useful to
   * the room: it is where we speak FROM, not a position we are speaking down from.
   *
   * STILL BRAND-INVARIANT, and now for a stronger reason than the joke: it is a
   * fact about us, and a fact about us that changed per audience would be a sales
   * pitch.
   *
   * STILL NO CHIP AND NO LEADER. A third leader style would be a fifth encoding
   * competing with the four that carry the argument. What tethers it is position:
   * the two lines STAND ON L4's step, and the bead sits on the riser 10px off the
   * corner they start at (`./geometry.ts`'s `ASIDE_SLOT`).
   *
   * WHAT THIS SLIDE DOES NOT CLAIM. There is no outside source for L3–L4 — it is
   * our own account of our own work, which is exactly why it stays in the aside's
   * lighter register instead of becoming a second cited chip. The register IS the
   * epistemic status.
   */
  aside: {
    /** Mono. Keyword-free. The en dash matches every other range in the deck. */
    label: "NANOVEST · L3–L4",
    note: "We speak from this rung, not above it.",
    noteKw: ["not above it"],
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
      // THREE POINTS, AND EACH ONE ANSWERS ONE CLAUSE OF L3. The rung reads "One
      // agent does the task. A decision contract sets its limits.", so:
      //
      //   1 · the request reaches an AGENT, not a person — that is the L2 line
      //       crossed, and the dispatcher is how Google Cloud's own story explains
      //       it. "Hierarchical multi-agent" is still out: it made the claim
      //       defensible to an architect and opaque to the room.
      //   2 · each agent works INSIDE a scope it was given — the specialist
      //       structure IS the bound, which is the half of L3 a room otherwise
      //       hears as "so they have chatbots".
      //   3 · it is in production. A rung is a description of how work is done
      //       today, so a placement with no scale behind it is a pilot, and a
      //       pilot is not a rung.
      //
      // NOT A FOURTH POINT ABOUT WHAT IT IS NOT. "Not a mesh yet" would be this
      // deck's reading rather than the source's — Google Cloud calls GEMVIS
      // multi-agent — and the `≈` already carries the hedge.
      points: [
        "A dispatcher routes each request",
        "Each specialist owns one scope",
        // "In production: 50 apps, 4,000+ users" was the first cut and it WRAPPED —
        // 36 characters against the slot's 32 — which put "users" alone on a fourth
        // line and made three points look like four. `POINT_MAX` below is that
        // measurement, and the test fires it at every point.
        "Live in 50 apps, 4,000+ users",
      ],
      // WHO SAYS SO, and nothing else — the points carry the facts now, so the
      // citation only has to license them. It stays on the slide because §6.5
      // requires an asserted mark's source to be visible rather than footnoted.
      source: "Google Cloud, on GEMVIS",
    },
  },
  open: {
    id: "outside-digitech",
    // L1 — ad-hoc individual use — on the owner's placement (2026-08-13), and it
    // is the rung DigiTech's own brief describes: "not really adopted well" is not
    // an org-wide rollout that people drive, it is a few people working in their
    // own way. The ring sits there and stays OPEN, because nobody has measured it.
    rung: 0,
    label: "OUTSIDE DIGITECH · L1?",
    // NO NUMBER IN THE QUESTION ANY MORE. It used to ask about "the other 90%" —
    // a share of headcount this deck never sourced and the research file records
    // as unverified internal context. The question is just as sharp without a
    // figure a leader in the room could correct, and the figure was the only part
    // of it we could not defend.
    question: "So what about everyone else?",
    questionKw: ["everyone else"],
    // DigiTech's own brief, quoted rather than paraphrased: the question is only
    // fair to ask in the room because the room said it first. "Brief" and not
    // "words" — it is an internal brief, which is what K.1 also calls it.
    //
    // TRIMMED TO THE CLAUSE THAT CARRIES THE FINDING, and the dropped half is
    // "— even some DigiTech members still falling behind". Cutting it cannot
    // overstate the source, because it was the STRONGER half: it says adoption is
    // thin even inside the division this slide credits at L3. What it cost the room
    // was a third line of 11px serif.
    //
    // THIS IS NOW THE DECK'S ONLY PRINTING OF THIS BRIEF (2026-08-14).
    // `mandate-enablement` quoted the same sentence in a bordered band, and
    // `mandate-enablement.test.tsx` held the two identical on the rule that one source
    // worded two ways in one deck is how a room stops trusting the source. That band
    // was retired when K.1 was re-cut — it named another organisation in a room the
    // brief did not come from — so there is no second copy to keep in step and no test
    // pinning this one any more. WHICH MAKES THIS STRING SOLELY THIS SLIDE'S, and it
    // reaches only a GEMS leader deck, because it lives in that brand's block.
    evidence:
      "DigiTech's own brief: “outside DigiTech, AI adoption is not really adopted well.”",
    evidenceKw: [],
  },
  // THE REFRAME, NOT A SUMMARY. The room's instinct at this figure is to look up —
  // to L5, and to what it would take to get there. The lit stretch says the
  // distance that matters is behind them and inside the same company: two rungs,
  // between a placement one division can defend and a question nobody outside it
  // can answer. Two sentences, and the second one is the whole ask of section C.
  closer: "The gap is not at the top of this ladder. It is two rungs, inside one company.",
  closerKw: ["two rungs, inside one company"],
};

/**
 * Berau — MineTech placed at ≥ L2, and the rest of the company asked about.
 *
 * THIS BLOCK USED TO PLACE NOBODY (owner's correction, 2026-08-14). It said
 * "MineTech has nothing comparable to place here. That is the finding, not an
 * omission." — §6.5 and #16's finding 4 both read the missing GEMVIS equivalent as
 * a missing PLACEMENT, and that was the wrong reading of the same fact. MineTech
 * stands at L2 or above; what it has no equivalent of is a PUBLISHED output. So the
 * absence moved out of the slot and into the source line, where it belongs: the
 * rung is placed, and what cannot be cited is named as what cannot be cited.
 *
 * WHY THE CHIP IS SOLID WITH NO OUTSIDE CITATION, which is the one thing on this
 * slide that bends §7.2's rule. The four encodings split marks by whether the deck
 * will DEFEND a placement, and the owner will defend this floor — so a dashed chip
 * ending in "?" would misreport their own position, and a Berau slide carrying two
 * questions and no claim reads as a deck that would not commit. The epistemic
 * distance from DigiTech's chip is carried in words instead, by a source line that
 * says self-reported and unpublished where the GEMS chip names Google Cloud. A room
 * that reads both decks sees one cited claim and one owned claim, which is the
 * truth about the two organisations.
 *
 * `≥` AND NOT `≈`: "L2 at minimum" is a floor, not an approximation, and the two
 * operators say different things about what is unknown. The GEMS chip does not know
 * exactly WHICH rung; this one does not know HOW FAR ABOVE.
 */
const BERAU_BLOCK: LadderBrandBlock = {
  techFunction: {
    kind: "asserted",
    marker: {
      id: "minetech",
      rung: 1, // L2 — Copilot at scale
      // THREE QUARTERS ALONG L2'S TREAD (x=473) — layout, and the layout was
      // walked before this number was settled. The band it has to land in is narrow:
      // the tech slot starts at x=456 and the leader must drop inside it, while the
      // L2–L3 riser stands at x=528. The first cut was `0.95` (x=517) because the
      // gap tag's pocket then ran to x=506, and on the render the dot sat ON the
      // corner where L2 meets that riser — reading as "nearly L3", which is the one
      // thing `≥ L2` must not say, with the leader and the riser 11px apart and
      // looking like one line through it. The pocket narrowed to 120 instead
      // (`GAP_TAG_SLOT`), which is what the two words in it actually need, and the
      // mark moved back onto the middle of its own tread where a placement belongs.
      t: 0.75,
      label: "MINETECH · ≥ L2",
      // THREE POINTS, EACH ANSWERING ONE CLAUSE OF L2 — the same discipline the
      // DigiTech chip follows against L3, and for the same reason: `≥ L2` is a claim
      // the room can dispute, so it is argued rather than captioned. L2 reads
      // "Everyone has the tool. People still do every step.", so:
      //
      //   1 · the tools are THERE and in use — that is the L1 line crossed, because
      //       L1 is a few people working in their own way.
      //   2 · people still drive — the half of L2 that keeps it under L3.
      //   3 · and the ceiling, stated: no agent owns a task, which is L3's own first
      //       clause and the reason this is a floor rather than a range.
      //
      // GENERIC BY NECESSITY AND FLAGGED AS SUCH. These argue the rung definition
      // rather than MineTech's own work, because the deck holds no sourced fact
      // about what MineTech runs. Two or three concrete facts — which tools, how
      // many people, what is built — would be strictly better here and would need no
      // other change on this slide.
      points: [
        "The tools are in daily hands",
        "People still drive every step",
        "No agent owns a task end to end",
      ],
      // THE ABSENCE, RELOCATED. The GEMS chip cites Google Cloud; this one cites
      // Berau. Saying so in the citation slot is what stops a solid chip from
      // borrowing the other brand's authority, and it keeps §6.5's finding — there
      // is no GEMVIS-equivalent output to point at — on the slide as a fact about
      // EVIDENCE rather than as a fact about capability.
      source: "MineTech's own account · unpublished",
    },
  },
  open: {
    id: "outside-minetech",
    // L1 — and it MOVED DOWN from L2 with the owner's correction, because the ring
    // no longer has to carry the tech function too. The programme is still running,
    // so nothing yet says the wider company left the rung it started on: L1 is what
    // the evidence describes today, exactly as it is on the GEMS ladder, and the
    // question asks whether that is still true after the programme lands.
    rung: 0,
    label: "OUTSIDE MINETECH · L1?",
    // "THE CERTIFICATE" IS GONE, and it had to go: it assumed a finished programme.
    // The competition is still running, so a question about what people kept AFTER the
    // certificate asks about an event that has not happened. The desk and the room are
    // the two places the training can end up in while it is still in flight, which is
    // the honest version of the same question. (This note also said "no Ambassador is
    // named" until 2026-08-16; five are — see the evidence line below. The question is
    // unaffected either way, because a roster is not an outcome.)
    question: "Did the training reach the desk, or did it stay in the room?",
    questionKw: ["stay in the room"],
    // THREE FACTS, TWO OF THEM CORRECTED (owner, 2026-08-14): §6.5 was written
    // against a plan and the plan has not finished. The competition RUNS — and a
    // programme still in flight is a better reason for an open ring than a finished
    // one was, because the room does not know the answer either.
    //
    // THE THIRD FACT WAS CORRECTED TWICE, AND THE SECOND CORRECTION UNDID THE FIRST
    // (owner, 2026-08-16). The 08-14 pass wrote "Ambassadors not yet named", which was
    // an over-correction: the Culture department's AI Ambassador framework carries a
    // footnote under its business-unit target table reading "Berau Coal already have 5
    // AI Ambassador". So this line asserted the opposite of the programme's own sheet.
    // `leader-mandate`'s K.2 held the identical claim and was fixed in the same edit —
    // one wrong fact, two slides, because the 08-14 pass propagated a single source
    // without asking a second.
    //
    // IT STILL DOES NOT CLOSE THE RING, WHICH IS WHY THE FIX IS SAFE HERE. Five named
    // Ambassadors is a roster, not an outcome: the question above asks whether the
    // training reached the desk, and a name on a list answers it no better than a
    // certificate did. The count against the framework's target of fourteen is NOT
    // printed — see K.2's `provenance` for why that number stays off the stage.
    //
    // "382 trained" and NOT the prototype's "382 leaders trained": §6.5 says
    // trained, the extra word is the prototype's own, and a headcount is exactly
    // the kind of number a leader will check.
    evidence: "382 trained · the competition still runs · 5 Ambassadors named.",
    evidenceKw: [],
  },
  // TWO MARKS NOW, SO THERE IS A DISTANCE — and the closer had to stop saying
  // "Nothing is claimed on this ladder yet", which the chip above makes false.
  //
  // IT READS THE LIT LINE, THEN LOOKS UP. Sentence one names what the stretch
  // between the ring and the chip actually measures: one rung, which is a smaller
  // internal gap than the GEMS deck's two. Sentence two is why that is not good
  // news — both Berau marks sit UNDER L3, and L3 is the rung where an agent starts
  // doing the task rather than helping with it. So the reframe still lands (the
  // distance that matters is not the climb to L5) and it hands off to section C,
  // which is about the rung directly above.
  //
  // NOT THE GEMS SENTENCE WITH A NUMBER SWAPPED. "It is one rung, inside one
  // company" was available and reads as a filled-in template — and "one rung"
  // alone sounds like good news, which is the opposite of the finding.
  closer: "The gap here is one rung. The rung above it is where the work changes.",
  closerKw: ["where the work changes"],
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
  closer: "Nothing here is a claim about you. Naming the rung you stand on comes first.",
  closerKw: ["Naming the rung you stand on"],
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
// tool access and organizational capability."
//
// REDESIGNED 2026-08-10 BY OWNER CALL, productionized from the B.1 prototype's
// variant B ("TWO SPEEDS", `?dev=protob1`, deleted with this change). The first cut
// printed the argument as five bands of prose and accumulated all of them onto one
// screen by its last pose — a wall of text in front of top management. The redesign
// makes the gap a difference in SPEED and lets motion carry it: one signature starts
// two progress lanes, tool access finishes in under a second, organizational
// capability crawls and is still running when the presenter moves on. Three poses,
// one visual argument each, the presenter carrying the connective prose verbally:
//
//   0 — THE RACE. Two lanes off one signature. Access fills instantly and stamps
//       DAY 1; capability crawls behind a live day counter. The race line lands
//       last: only one of these arrives by signature.
//   1 — THE ANATOMY. The access lane thins in place; the capability lane grows,
//       and the unrun distance names the five structural things that fill it —
//       one word on the lane, one clause under it.
//   2 — THE SUMMARY. Both lanes park as a two-line scoreboard, and the evidence
//       lands beneath: the verbatim statistic with its attribution, the split bar
//       in the statistic's own ratio, and the closer.
//
// THE STATISTIC IS REUSED VERBATIM AND CARRIES ITS SOURCE ON-SLIDE — the research
// verdict behind it is explicit (`docs/researches/internal-hr-group.md` §1.1, §3.1,
// and the slide-by-slide table: "Reuse quote verbatim"). It now lands at pose 2, the
// canonical pose, so the PDF and PPTX exports print the number WITH its attribution
// and the deck's own conclusion under it. `statisticSource` records what the
// attribution may and may not claim: no read date and no study title, because we
// hold neither.
//
// ONE CONTENT BLOCK, NO BRAND AXIS, NO `…For(brand)` RESOLVER — unchanged from the
// first cut and argued at its length there: §4.4's seven slots do not list this
// slide, the statistic is a third party's and the gap between procurement and
// capability is nobody's local fact. The slide file imports no `VARIANT` at all.
//
// THE KEYWORD RULE: `kw` on PROSE ONLY. The prose on this slide is the headline,
// the race line, the footnote, the anatomy line and the closer — five strings, five
// `*Kw` siblings. THE STATISTIC AND ITS SOURCE ARE KEYWORD-FREE, the rule's
// sharpest case: a copper italic inside a quoted figure emphasises a fragment of
// somebody else's sentence. Lane names, tags, the in-bar items, the five segment
// words and their notes are labels and carry none either.
//
// THE 70/30 COLLISION WITH THE LADDER, kept from the first cut because this file is
// where a future editor would create it: §6.5's L3 rung is "Decision contract ·
// 70/30 split" — how much of a bounded agentic DECISION the machine may take. THIS
// slide's 70/30 is the ADOPTION-FAILURE split. The numbers agree by coincidence;
// nothing below prints the phrase "70/30", and the segment word "DECISION RIGHTS"
// — who owns a call — is org design, not the ladder's rung definition.
//
// WHAT THIS SLIDE MAY NOT SAY, because three siblings own it (§6.2, §6.3, §6.4):
// no shadow AI, SOPs, missing guidance or improvisation (§6.2's `condition` beat —
// a first mention here would spend it); no first-person Nanovest failures (§6.3);
// no pattern across them (§6.4); no L1–L5 and no ladder (§6.5, above in this file).
// `tests/unit/gap-hardest-part.test.tsx` sweeps every authored string for all four.
//
// THE ONE DELIBERATE ECHO, unchanged: the capability tag says EARNED, and the
// ladder's L5 is "Declared only when earned" — the section's thesis stated at both
// ends of its run, one ordinary English word, nothing else shared.

/** How far the capability lane gets while the room watches: a fraction of the lane,
 *  not a measurement — the point is that it is small and still moving. The geometry
 *  derives the segment slices from it. */
export type LaneSegment = {
  id: string;
  /** Mono caps, ON the lane — one or two words, projector-read. Keyword-free. */
  word: string;
  /** What it costs, one clause, under the lane. Keyword-free. */
  note: string;
};

/** Exactly five, held by the TYPE — the fixed-length tuple idiom this file already
 *  uses for §6.2's lists: a sixth entry's error lands ON the sixth entry. */
type Five<T> = readonly [T, T, T, T, T];

/**
 * §6.1's five structural contents of the people-&-process half, as lane segments.
 *
 * THE ORDER IS THE ARGUMENT and the lane draws it left to right: who decides, how
 * the work is shaped, who can do it, what they are rewarded for, and how anyone can
 * tell. Each is a WORD the back row reads off the lane plus the NOTE that stops the
 * word reading as a training budget — "SKILLS / the habit, not the awareness".
 *
 * FIVE, and `./hardest-part-geometry.ts` pins the count: a sixth would re-cut every
 * slice and the weld there is what reports it.
 */
const SEGMENTS: Five<LaneSegment> = [
  { id: "decision-rights", word: "DECISION RIGHTS", note: "who owns the call" },
  { id: "workflow", word: "WORKFLOW", note: "the process changes shape" },
  { id: "skills", word: "SKILLS", note: "the habit, not the awareness" },
  { id: "incentives", word: "INCENTIVES", note: "what faster work is rewarded for" },
  { id: "measurement", word: "MEASUREMENT", note: "what now counts as done" },
];

/** Exactly three — the three things money already buys, as in-bar items. Named
 *  `Trio` and not `Three` only because §6.2's block further down this file
 *  already owns that identifier at module scope. */
type Trio<T> = readonly [T, T, T];

/**
 * What fills the ACCESS lane the moment it fills: three bare nouns, because the
 * lane arriving complete in under a second IS the sentence the first cut spelled
 * out as "a subscription away / a purchase order / an afternoon". The instrument
 * is now carried by the motion; the nouns just name what arrived.
 */
const ACCESS_ITEMS: Trio<string> = ["MODELS", "LICENCES", "TOOLS"];

export const gapHardestPartContent = {
  /** The `FigLabel`'s LABEL. The letter and number in front of it are DERIVED from
   *  the composed deck (§3.5) and are authored nowhere. */
  figLabel: "THE HARDEST PART",

  /** §6.1's own claim, as the slide's title phrase. It refuses the reading a leader
   *  arrives with — that this is a tooling decision — before any evidence lands. */
  headline: "The hardest part is not the tools.",
  headlineKw: ["not the tools"],

  // ── pose 0 · the race ──────────────────────────────────────────────────────

  /** Mono LABEL over the race. Keyword-free. "Two clocks" is the pose's whole
   *  claim: the same signature starts both, and only one of them stops today. */
  raceEyebrow: "ONE SIGNATURE STARTS TWO CLOCKS",

  /** The two lane names. Labels — §6.1's own two terms, verbatim. */
  accessLane: "Tool access",
  capabilityLane: "Organizational capability",

  /** The access lane's tag, and what it becomes once the lane thins: the fact the
   *  scoreboard keeps. Labels. */
  accessTag: "PROCURED",
  accessTagDone: "PROCURED · DONE DAY 1",

  accessItems: ACCESS_ITEMS,

  /** The access lane's finish flag. A label; "everyone at once" is the half of the
   *  first cut's access line that survives, because the fill arriving all at once
   *  is the other half drawn. */
  accessDone: "DAY 1 · DONE — EVERYONE AT ONCE",

  /** The capability lane's tag, and the scoreboard form it takes at pose 2. The
   *  EARNED echo is the section's chosen rhyme — see the header. */
  capabilityTag: "EARNED",
  capabilityTagRunning: "EARNED · STILL RUNNING",

  /** The live counter's two halves: `DAY ${n} · STILL RUNNING`. Labels. The digits
   *  are runtime state, not authored copy — no authored string here carries the
   *  day number, so the no-invented-figures sweep stays clean. */
  dayLabel: "DAY",
  stillRunning: "STILL RUNNING",

  /** Inside the capability lane's filled sliver from pose 1 on. A label. */
  soFar: "SO FAR",

  /**
   * Under the capability lane, pose 0 ONLY (owner call 2026-08-10: it leaves the
   * stage when the anatomy arrives). PROSE — the surviving clause of the first
   * cut's capability line, and "never on an invoice" is still the argument: no
   * amount of the 30% closes the gap.
   */
  footnote: "one changed habit at a time — and never on an invoice",
  footnoteKw: ["never on an invoice"],

  /** Pose 0's last arrival, full width. PROSE. The pose's verdict: the room just
   *  watched one lane finish and one lane crawl, and this names why. */
  raceLine: "Only one of these arrives by signature.",
  raceLineKw: ["signature"],

  // ── pose 1 · the anatomy ───────────────────────────────────────────────────

  /** Mono LABEL over the anatomy. Keyword-free. */
  anatomyEyebrow: "WHAT FILLS THE REST OF THE LANE",

  segments: SEGMENTS,

  /** Pose 1's verdict. PROSE. Five things just landed on the lane and this is the
   *  one sentence about all of them. */
  anatomyLine: "None of it can be procured.",
  anatomyLineKw: ["procured"],

  // ── pose 2 · the summary ───────────────────────────────────────────────────

  /** Mono LABEL over the quotation. Keyword-free. Says "reported" and "split" so
   *  the room knows what kind of object it is about to read. */
  statisticEyebrow: "THE REPORTED SPLIT",

  /**
   * THE STATISTIC, VERBATIM — the research's own verdict, quoted and not adapted
   * (`docs/researches/internal-hr-group.md` §3.1).
   *
   * KEYWORD-FREE, and this is the string the rule exists for. It is also the number
   * `./hardest-part-geometry.ts` cuts the summary bar from — `PEOPLE_SHARE` is 0.70
   * because this string says 70% — so a reword that changed the figure and left the
   * bar alone is a lie the test catches.
   *
   * "&" AND NOT "and", "people & process" AND NOT "people and process": verbatim
   * means verbatim, and the ampersand is in the source.
   */
  statistic: "70% of AI adoption failures are people & process, not technology",

  /**
   * The attribution, printed ON the slide, in the same pose as the figure it
   * attributes. Mono, keyword-free. It says "reported by" and says that the deck
   * QUOTES rather than measures; it carries no date and no study title it cannot
   * support — an invented citation is worse than a plain one.
   */
  statisticSource:
    "Reported by BCG / McKinsey — the adoption benchmark this deck quotes rather than measures.",

  /** The summary bar's two labels. Mono, keyword-free. Each carries its own
   *  percentage so a mass is never read against the wrong number — and NOT the
   *  phrase "70/30", which is the ladder's (see the header). */
  peopleLabel: "70% · PEOPLE & PROCESS",
  technologyLabel: "30% · TECHNOLOGY",

  /**
   * The closer, and the frame for everything behind this slide. PROSE, the slide's
   * last arrival. IT COUNTS NOTHING AND NAMES NO POSITION — "everything after
   * this", never "the next four slides" — because the run this slide opens is
   * composed per deck set (§3.4).
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
//     NEITHER: one rollout spine that stops dead at the dot where the rule should have
//     been written and FRAYS into two dozen swaying private hairlines — over three
//     issued boxes and four question boxes whose answer rules stay EMPTY at every pose.
//     The stopped-and-frayed line and the unfilled blanks are this pass's image and
//     appear on no other slide in the deck.
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
// THE ONE WORD THIS SLIDE WAS SUPPOSED TO ECHO, AND NO LONGER PRINTS. C.1's governance
// decision (`leader-shape/content.ts`) says the leader writes it down "before someone
// improvises", and `leader-mandate/content.ts` says "enough to stop improvising" — both
// of those are indexes pointing AT this slide, recorded in their own files as such.
// Until the 2026-08-11 redesign the anchor was paid off in words ("Everyone improvises
// a rule that works for them"); the redesign cut that band — the presenter says the
// sentence, and the FRAY is the improvisation, one swaying hairline per private rule.
// So the two pointers now index the CONDITION rather than a rendered string, §6.2's own
// sentence ("there is no guidance, so people improvise") stays the only spelled source
// of the verb, and the sibling tests that once controlled `improvise` against this
// block's rendered copy control it against that spec sentence — the same split they
// already ran for `no guidance` and `no SOP`.
//
// WHAT THIS SLIDE MAY NOT SAY, beyond the three-pass constraint above:
//
//   · THE 70/30 SPLIT, "procured", "earned", "invoice", "tool access" → B.1's, one
//     slide earlier in the same run. Re-spending its statistic or its vocabulary in the
//     slide directly behind it is how a run starts sounding like one long slide, and
//     the two arguments are different: B.1 says the hard part is not the tools, this
//     one says nobody wrote the rules for them. Nothing below prints a percentage, and
//     nothing below re-uses B.1's verbs.
//   · NANOVEST'S OWN FAILURES, FIRST PERSON, AND THE PATTERN ACROSS THEM → §6.3 + §6.4
//     (`gap-failures-pattern`, one stage for both). Nothing below is a story, nothing
//     below is in the first person singular, and nothing below generalises.
//   · L1–L5 AND THE DECISION CONTRACT → §6.5, at the top of this file.
//   · WHAT THE RULE SHOULD SAY. The closer names writing one as the leader's job and
//     stops there. The four governance domains an SOP starts from are D.4 beat 3's, and
//     a starter list here would be that beat arriving four slides early.
//
// ═══ THE 2026-08-14 RE-CUT, AND THE THREE COMPLAINTS IT ANSWERS. The owner walked the
// shipped stage against `gap-failures-pattern` and the Capability Ladder next door and
// found three things wrong with it, all three of them copy problems as much as drawing
// problems:
//
//   1. THE BOXES DID NOT LOOK LIKE THE SECTION'S. One sentence in a grey panel, against
//      two neighbours whose cards carry a picture, a rule, a mono title and a line of
//      prose. So the issued boxes are now CARDS in that same grammar — see
//      `./components/NoSopBeats.tsx` for the three live plates — and this block splits
//      each of them into a `title` and a `line` to fill it.
//   2. POSE 0 WAS HALF EMPTY STAGE. That is geometry (`./no-sop-geometry.ts` records the
//      new heights) but it is copy too: three one-line boxes cannot fill a stage, and
//      three cards each holding a picture, a name and a fact can.
//   3. THE FOUR QUESTIONS READ AS RIDDLES, and the hairline under each one said nothing
//      about itself. Both are fixed here rather than in the figure:
//      · EVERY QUESTION NAMES WHAT IT IS ASKING ABOUT. "Which work may I put into it?"
//        never said what `it` was. `the AI` is now spelled, once, on the first question,
//        and the other three inherit it.
//      · EVERY QUESTION CARRIES ITS DOMAIN. `PERMISSION · PROHIBITION · ARBITRATION ·
//        DISCLOSURE` — the escalation this block has always documented, printed as four
//        mono labels instead of left for the reader to infer from the order. They are
//        the one Latinate row on the stage and they earn it: each names the CLAUSE an
//        SOP would have had, which is the fact the question alone cannot carry.
//      · AND THE BLANK SAYS WHAT IT IS. `blankNote` — one dim mono line, the same on all
//        four cards, beside a caret parked on a dashed rule. A bare hairline is a design
//        flourish; a form field with a cursor in it and NO RULE WRITTEN next to the
//        cursor is a fact about the organisation.
//
// THE PROSE IS CUT TO ASD-STE100 AND TO ZINSSER'S FOUR (clarity, brevity, simplicity,
// humanity), which for this block means: one idea per line, active voice, no word longer
// than the job, and no sentence that needs the one before it. Nothing below runs past ten
// words.
//
// THE KEYWORD RULE, applied without an exception: `kw` on PROSE ONLY.
//
//   · PROSE, each with a `*Kw` sibling — FIVE strings: `headline`, `closer`, and the
//     three issued cards' `line`s. THREE MORE THAN BEFORE THE RE-CUT, and the rule that
//     let them in is the one that kept the old condition band out: prose is allowed
//     UNDER a mono title inside a card, where it is one fact about one thing, and
//     refused as a BAND of sentences across the stage, which is the wall of text the
//     2026-08-11 redesign cut. The presenter still carries every connective sentence.
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — TWENTY-TWO strings:
//     `figLabel`, `issuedEyebrow`, `unwrittenEyebrow`, `conditionEyebrow`, the two
//     spine dot captions, `blankNote`, the three `issued` titles, and the four
//     `questions` `domain`s, `ask`s and `short`s.
//     THE FOUR ASKS ARE THE SHARPEST CASE, because they are sentence-shaped and the
//     Capability Ladder's own `question` field at the top of this file DOES carry a
//     `questionKw`. The difference is arity: that ladder asks ONE question and the
//     emphasis inside it is the argument, while four highlighted questions would put
//     four copper italics down one grid and rank four things the slide ranks by order
//     alone. D.4's three exposure rows are the shipped precedent — sentence-shaped,
//     label register, keyword-free — and these follow it.
//
// NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). This slide composes
// as the SECOND of the `gap` run, which is B.2 in today's leader decks and is derived
// per deck by the composer; `FigLabel` takes a LABEL only. Do not write either down.

/**
 * One thing the organisation handed out — a card at pose 0, a chip receipt after.
 *
 * TWO REGISTERS, AND THE SPLIT IS THE KEYWORD RULE DRAWN IN THE TYPE (the shape
 * `FailureCard` keeps further down this file): `title` is the card's NAME and its own
 * receipt, a mono LABEL that carries no emphasis; `line` is one fact about it, PROSE,
 * with the one keyword the fact turns on.
 */
export interface NoSopIssued {
  id: string;
  /**
   * The card's name, in mono caps — and the chip's whole content once the row compacts
   * at pose 1. ONE STRING FOR BOTH FACES, deliberately: a receipt that reworded the
   * card would be new copy arriving at the beat that exists to say the copy is already
   * argued. Cut for one 36px chip line beside a 14px icon.
   */
  title: string;
  /**
   * What was actually handed out, in one line under the card's own hairline. PROSE, cut
   * for TWO lines of 14px serif in a 328px measure (≈40 characters a line) — the third
   * card uses both, and all three type blocks start on the same shelf so the row reads
   * as one row.
   *
   * IT NAMES THE MOMENT AND NOT THE INTENT: the day the login was asked for, the room
   * the demonstration was shown in, the fact that the encouragement got written down.
   * No line here says anything went wrong, because none of them did.
   */
  line: string;
  lineKw: readonly string[];
}

/**
 * One question nobody wrote the answer to — a card at pose 1, a chip receipt after.
 *
 * ALL FOUR FIELDS ARE LABELS and none may gain a `*Kw` sibling (the keyword rule above
 * says why four highlighted questions would rank four things this slide ranks by order
 * alone).
 */
export interface NoSopQuestion {
  id: string;
  /**
   * The clause an SOP would have had, in one mono caps word. It is what the question is
   * ABOUT, printed rather than inferred from the grid's order — the re-cut's answer to
   * four questions that read as riddles.
   */
  domain: string;
  /**
   * The question as the person at the desk asks it. FIRST PERSON SINGULAR where the
   * asker is in it, present tense, and cut for ONE line of 17px serif in a 517px
   * measure (≈48 characters). A reword past that wraps onto the answer field below it,
   * which is the one failure on this stage a reader would misread as a design.
   */
  ask: string;
  /**
   * The chip face — mono caps, cut for a 36px chip at a 273px width. STILL A QUESTION:
   * the receipts have to keep asking, or the compacted row reads as a list of topics
   * that were covered rather than as four things still unanswered.
   */
  short: string;
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
const ISSUED: Three<NoSopIssued> = [
  {
    id: "login",
    title: "A LOGIN",
    line: "Given on the first day someone asked for one.",
    lineKw: ["the first day"],
  },
  {
    id: "demonstration",
    title: "A DEMONSTRATION",
    line: "One session, and a room told to try it.",
    lineKw: ["told to try it"],
  },
  {
    // THE ROW'S SHARPEST CARD, and the pivot into the band beside it: the encouragement
    // is the one thing on this stage that somebody sat down and WROTE. The rules did
    // not get that. The line says so without saying anything is missing — the second
    // eyebrow says that.
    id: "encouragement",
    title: "ENCOURAGEMENT",
    line: "From the top, and the one thing that got written down.",
    lineKw: ["the one thing that got written down"],
  },
];

/**
 * WHAT WAS NEVER WRITTEN DOWN — four questions, in an escalation, each one a clause an
 * SOP would have had.
 *
 * THE ORDER IS THE ARGUMENT and it is not re-sorted: permission (what may go in) →
 * prohibition (what must stay out) → arbitration (who settles the unclear case) →
 * disclosure (who hears about it). Read down, they are the four things a person needs
 * before they can use a new tool safely, and none of them has an answer anybody could
 * look up. SINCE THE 2026-08-14 RE-CUT THE ORDER IS ALSO PRINTED: each card carries its
 * own domain, so the escalation is a fact on the stage rather than a pattern the reader
 * has to find.
 *
 * FIRST PERSON SINGULAR, AND EVERY ASK ENDS IN "?". These are the questions as the
 * person at the desk asks them, not as a policy author would phrase them — "which work
 * can I put into the AI", not "permitted data classes" — because the condition is what
 * it feels like to be that person with nobody to ask. The question mark is what the
 * empty field beneath each one answers with silence.
 *
 * `the AI` IS SPELLED ONCE, ON THE FIRST CARD. The first cut said `it` four times and
 * never once said what `it` was, which is the single biggest reason the band read as a
 * riddle. Naming it on card one and pronouncing `it` afterwards is how the row stays
 * short — Zinsser's brevity paid for out of the reader's certainty, not into it.
 *
 * FOUR, AND `./no-sop-geometry.ts` PINS THE COUNT: a fifth deepens the grid, moves the
 * fray's heading and the closer, and the stage's floor clearance is what reports it.
 */
const QUESTIONS: Four<NoSopQuestion> = [
  {
    id: "may-go-in",
    domain: "PERMISSION",
    ask: "Which work can I put into the AI?",
    short: "WHAT GOES IN?",
  },
  {
    id: "may-never",
    domain: "PROHIBITION",
    ask: "Which work must stay out of it?",
    short: "WHAT STAYS OUT?",
  },
  {
    id: "who-decides",
    domain: "ARBITRATION",
    ask: "Who decides when the case is not clear?",
    short: "WHO DECIDES?",
  },
  {
    id: "who-hears",
    domain: "DISCLOSURE",
    ask: "Who do I tell that I used it?",
    short: "WHO IS TOLD?",
  },
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

  /**
   * The step diagram's two captions — one under each labelled dot on the spine. Mono,
   * keyword-free, and each is its band's eyebrow compressed to the diagram's own
   * grammar: the first dot is where the rollout delivered, the second is where it
   * stopped. NO VERB PHRASE AND NO SENTENCE — a dot caption that argued anything would
   * be a fourth band on a stage that holds three.
   */
  issuedDotLabel: "HANDED OUT",
  unwrittenDotLabel: "NEVER WRITTEN",

  /**
   * THE ANSWER FIELD'S NOTE — one dim mono line inside every question card, beside a
   * caret parked on a dashed rule that is never written on.
   *
   * ONE STRING, PRINTED FOUR TIMES, AND THE SAMENESS IS THE POINT: four cards, four
   * fields, the same note in all four. A per-card wording would read as four different
   * gaps; one repeated line reads as a form nobody filled in.
   *
   * IT SAYS `RULE` AND NOT `ANSWER`, which is the headline's word and the closer's — the
   * field is not waiting for somebody's opinion, it is waiting for a rule. Three words,
   * mono caps, dimmer than the question above it: a note about an absence may never be
   * brighter than the sentence it is attached to.
   */
  blankNote: "NO RULE WRITTEN",

  /** Band 3's heading — the fray's. Mono, keyword-free. NAMES NO ACTOR — it is the
   *  condition that follows, not somebody's decision — and it is the string that would
   *  have read "THE CONDITION IT PRODUCES" if `produce` were not D.4 beat 2's word (see
   *  the header). WHAT the silence leaves behind is DRAWN rather than said: the
   *  2026-08-11 redesign cut the two sentences that used to sit under this heading, and
   *  the fan of private hairlines is now the whole band — the presenter says the
   *  sentences, the stage shows the condition. */
  conditionEyebrow: "WHAT THE SILENCE LEAVES BEHIND",

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
// THREE FAILURES, ONE SHAPE — §6.3 AND §6.4 ON ONE STAGE, the THIRD row of this run.
// ═════════════════════════════════════════════════════════════════════════════
//
// §6.3 is two sentences: "Nanovest failures, first person. HR p16–18 outcomes are cut —
// outcomes brag, failures transfer, and the confession pays the credibility debt before
// L.2/L.3 arrive." §6.4 is one line: "The pattern across the three failures". THEY SHIP
// AS ONE SLIDE because §6.4 has no content of its own — it is the SHAPE of §6.3, and
// played as two stages the pair said one thing twice while the second re-read the first
// from memory. Pose 0 is the record; pose 1 is what all three of it were the same.
//
// THIS BLOCK IS THE SECTION'S RECORD FOR BOTH SPEC SECTIONS. It replaces
// `gapThreeFailuresContent` and `gapThePatternContent`, which retired with their slides
// when the merge won its review; every rule those two blocks recorded and that still
// binds is restated below rather than referred to, because a rule that lives only in a
// deleted file is not a rule.
//
// ═══ PROVENANCE — TWICE DOCUMENTED, NOTHING INVENTED. Every fact below is Nanovest's
// own record, written down twice before this deck existed:
//
//   · `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md`, slides 5, 6, 7 and
//     8 (≈ lines 126–170): "Tools Without Direction" (Q1 2025 — five-plus tools with no
//     standard, vibe coding, knowledge trapped with individuals), "Building Without
//     Strategy" (Q2–Q4 2025 — a custom knowledge base, an internal document crawler and
//     six of ten connectors scrapped or displaced; four company-specific ones survived),
//     "Enabling Without Empowering" (mid-2025 through Q1 2026 — departments became
//     consumers, representatives acted as product owners, and the central committee
//     became the delivery bottleneck), and "The Pattern Emerges", which is the source of
//     the three lessons and the two halves of the shift.
//   · `docs/researches/internal-hr-group.md` §1.3 (≈ lines 33–41), §1.4 (the pattern
//     slide as "the core teaching moment") and the slide-by-slide reuse table (≈ lines
//     193–195), which grade all four ESSENTIAL for exactly the reason this slide exists:
//     "the presentation admits failure, which makes Nanovest credible as a guide, not a
//     sales pitch."
//
// Every quantity below — five-plus tools, three quarters, ten connectors — comes from
// those two documents and from nowhere else. Nothing here is rounded up and nothing here
// is a number this deck measured.
//
// ONE QUANTITY IS THE OWNER'S AND NOT THE RESEARCH'S, and it is the only one: THE
// CONNECTOR SPLIT IS 8 SCRAPPED AND 2 HELD. Both research documents say six of ten were
// scrapped and four company-specific ones survived; the owner's recount of 2026-08-13
// cut the survivors to two, and the owner is the primary source for their own record —
// the research is a transcription of it. It is written here in ONE place, and the
// picture on `gap-failures-pattern`'s second plate derives its arithmetic from a single
// list of survivors in `./gap-failures-pattern-geometry.ts`, so the ring and the sentence
// can only ever agree. ANYONE RECONCILING THIS DECK AGAINST THE RESEARCH FILES WILL FIND
// THE OLDER SPLIT THERE: this note is the reconciliation.
//
// THE TITLES, SUBTITLES, LESSONS AND SHIFT ARE THE RESEARCH'S OWN HEADINGS, and that is
// a 2026-08-13 decision that reversed an earlier one. The retired §6.3 block re-cut the
// three phase names as decisions in the first person ("WE BOUGHT BEFORE WE AGREED") to
// keep them clear of L.3's rendered paraphrase, and the retired §6.4 block refused HR's
// enablement vocabulary outright in favour of a capability reframe. The merged slide
// takes the research's headings back, because a triptych argues SAMENESS and the three
// research headings are one series ("X Without Y" three times) where three first-person
// sentences are three sentences.
//
// THE COST OF THAT REVERSAL IS REAL AND IT IS RECORDED HERE RATHER THAN DISCOVERED
// LATER: `methodology`, `enable` and `mindset` are now rendered on THIS stage and again
// on L.3's (`reveal-and-closing/content.ts`, `i3-portfolio`: "three honest failures —
// methodology, strategy, empowerment" and "mindset flip — 'how to build?' → 'how to
// enable?'"). Both slides ship in both leader decks, forty-odd slides apart. The retired
// §6.4 block held a test against exactly this collision; the merge chose the research's
// words anyway, on the owner's instruction. WHOEVER EDITS EITHER SLIDE NEXT OWNS THE
// CHOICE OF WHICH ONE KEEPS THE WORDS.
//
// ═══ HR p16–18 OUTCOMES ARE STILL CUT, AND THE CUT IS §6.3's, NOT A PREFERENCE. A PDF
// page N is source slide N−1, so p16–18 are HR slides 15, 16 and 17: the app-performance
// benchmark, the support chatbot and the capability-calibration pair. NONE of their
// vocabulary appears in any string below — not the multiples, not the competitor names,
// not the deflection figure, not the ownership chain, not the preparation/implementation
// split. `tests/unit/gap-failures-pattern.test.tsx` holds that as a regex list fired
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
// ═══ THE VOICE, AND IT IS TESTABLE. The record is FIRST PERSON PLURAL throughout — "we
// gave", "we kept building", "we built … FOR departments" — and so are the lessons and the
// shift ("we use", "what is ours", "we stopped asking").
//
// TWO OF THE THREE LESSON QUOTES ARE REWORDED FROM THE RESEARCH FOR EXACTLY THAT REASON,
// and it is the one place the merge did not take HR's words verbatim. HR slide 8 prints
// "It's not WHAT tools you use, it's HOW" and "Research first. Build only what's yours";
// both carry a SECOND PERSON, which this stage may not. `we use` and `what is ours` keep
// the claim and keep the rule, and the rule is the one worth keeping — a room that has
// been addressed as the party who got this wrong stops hearing the pattern. THERE IS NO SECOND PERSON ANYWHERE ON THIS STAGE: not one "you",
// "your" or "yours", held word-boundary and case-insensitive over every rendered string.
// That single property is what separates this slide from three others that are allowed
// to make the turn it may not:
//
//   · D.3 (`leader-invest/content.ts`, `invest-chicken-egg`) ends its fourth beat on
//     "You are the person who can skip the deadlock entirely." — the route we took,
//     handed to the room as a shortcut. (It read "skip all three" until 2026-08-14; the
//     count pointed at nothing on its own stage, so the noun replaced it.)
//   · M.1 (`reveal-and-closing/content.ts`, `j1-humility-intro`) prints "— Hard-earned
//     lessons. So you skip my mistakes."
//   · M.2 (`j2-five-principles`) prints "Each one earned. Each one yours to skip past."
//
// All three were read before this block was written. THIS SLIDE MAY NOT MAKE THE "SO YOU
// CAN SKIP IT" MOVE: it is D.3's beat and M.1/M.2's whole register, and a confession that
// arrives already converted into a favour for the listener is a sales pitch with a humble
// first paragraph. There is no first person SINGULAR either. The retired §6.3 block ended
// on "Every one of these calls was mine", and the merge dropped that line for space — the
// stage has no room for a signature once the four happenings are on each card, and the
// presenter says it out loud. If it ever comes back it comes back as the last line of
// pose 0 and nowhere else.
//
// ═══ TOKENS THE NEIGHBOURS OWN, CHECKED AGAINST THEIR REAL STRINGS RATHER THAN FROM
// MEMORY. Nothing below re-spends any of:
//
//   · D.3's — `deadlock`, `no budget without proof`, `shared accounts`, `banned`,
//     `what it cost`, `30-day`, `proof pilot`, `kill criterion`, `spend cap`.
//   · B.2's, one row up in this same run — `the rule nobody wrote`, `wrote their own`,
//     `never wrote down`, `never written`, `no rule written`, `handed out`, `login`,
//     `demonstration`, `encouragement`, `which work`, `silence`, `no rule to break`,
//     `permission`, `prohibition`, `arbitration`, `disclosure`, `the leader's
//     job`, and §6.2's own `no guidance` / `improvise` / `no-SOP`.
//   · B.1's, two rows up — `procured`, `instantly`, `invoice`, `tool access`, `70%`,
//     `30%`, `70/30`, `people & process`, `earned`, `capability`, `technology`.
//
// THE DELIBERATE ECHO OF B.1, RECORDED SO A REVIEWER SEES IT WAS CHOSEN.
// `gapHardestPartContent` headlines "The hardest part is not the tools." and labels its
// own band "THE GAP · ACCESS AGAINST CAPABILITY". Pose 1 closes that loop ON PURPOSE —
// the section's thesis stated once as an assertion about the world and once as a finding
// about ourselves, which is the pair §6.1 and §6.4 exist to make. An echo is a second
// stage reaching the same conclusion by its own route; a re-spend is the first stage's
// sentence arriving late, and none of B.1's actual words are below.
//
// ═══ WHAT THIS SLIDE MAY NOT SAY, because two siblings own it:
//
//   · L1–L5, THE RUNGS, `rung`, `ladder`, `level`, `decision contract` → §6.5, at the top
//     of this file. This slide HANDS OFF to that one, and the point of a handoff is that
//     the receiving slide introduces its own vocabulary. Checked against the shipped
//     `gapLadderContent` rather than against §6.5's text.
//   · SHADOW AI, IN ANY OF ITS THREE PASSES → §6.2 (`gap-no-sop`, condition), §6.7 (D.3
//     rational behaviour, D.4 beat 2 exposure). Nothing below is about anybody using a
//     tool they were not given; all three phases are about tools the organisation chose
//     deliberately and got wrong.
//   · A SUCCESSOR, OR A COUNT OF ITS SUCCESSORS. No "the next slide", no letter.
//     `gapHardestPartContent.closer` and `gapNoSopContent.closer` both record this rule:
//     the run is composed per deck set (§3.4) and a sentence that pointed at its own
//     successors goes stale the first time one is inserted or cut.
//
// ═══ ONE CONTENT BLOCK, NO BRAND AXIS, NO `…For(brand)` RESOLVER — the third block in
// this file to make that call, and the plainest case of the three. §4.4's seven brand ×
// deckSet slots do not list this slide, and these failures are NANOVEST'S OWN: they are
// the same admissions in a Berau room and in a GEMS room, because the organisation that
// made them is the one presenting. Varying them by audience would mean either inventing
// a second organisation's failures or editing our own to flatter a room, and both are
// worse than the shared block. The slide file imports no `VARIANT` at all, which is what
// lets its test mount it under both leader brands and compare byte for byte.
//
// ═══ THE KEYWORD RULE, applied without an exception: `kw` on PROSE ONLY.
//
//   · PROSE, each with a `*Kw` sibling: `headline`, each card's `subtitle`, each
//     happening's `rest`, each card's `learned`, each lesson's `quote`, each shift
//     column's `bullets`, and `mindset`.
//   · LABELS, carrying no `*Kw` and forbidden from gaining one: `figLabel`, the two
//     eyebrows, `shiftEyebrow`, `mindsetLabel`, the three `period`s, the three card
//     `title`s, every happening `label`, the three lesson `phase`s and `title`s, and the
//     two shift column `title`s. THE THREE LESSON TITLES ARE THE SHARPEST CASE: they are
//     the most quotable copy on the stage and would take emphasis happily — but three
//     copper italics down one row would RANK three things this slide exists to say are
//     the same, which is the one claim the figure must not make. `gapNoSopContent`'s four
//     questions are the shipped precedent for sentence-shaped copy held in the label
//     register.
//
// ═══ NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). This slide
// composes as the THIRD row of the `gap` run today; the figure reference in front of the
// label is DERIVED by the composer, and `FigLabel` takes a LABEL only. The four-digit
// years and the `PHASE n` labels below are the phases' own names, not deck figures, and
// they are the only numerals on the stage.

/**
 * One entry on the record: when it happened, what the phase was called, what we told
 * ourselves, the four things that actually happened inside it, and the one line it
 * taught.
 *
 * TWO REGISTERS, AND THE SPLIT IS THE KEYWORD RULE DRAWN IN THE TYPE. `period` and
 * `title` are LABELS and carry no `*Kw` sibling — they are the phase's rail and its name.
 * `subtitle`, every happening's `rest` and `learned` are PROSE and each carries one.
 *
 * THE TITLES ARE THE PHASE NAMES AND NOT THE CONFESSIONS — see the header on the
 * 2026-08-13 reversal and what it costs against L.3. The confession lives in the
 * SUBTITLE, which is where the "we" went.
 */
export interface FailureCard {
  id: string;
  /**
   * Which phase, and when. Mono LABEL, keyword-free.
   *
   * EN DASH FOR A RANGE — "Q2–Q4 2025", "MID 2025 – Q1 2026" — matching every other
   * range in this deck (the Capability Ladder's "NANOVEST · L1–L2" at the top of this
   * file). A hyphen here is a typographic bug, not an abbreviation.
   *
   * IT OPENS ON `PHASE n` SO POSE 1 CAN TAKE THE SAME SHELF. The lesson face prints
   * {@link PhaseLesson.phase} exactly where this string's first two words were, which is
   * what makes the contraction read as the same card reducing rather than as a second
   * card arriving.
   */
  period: string;
  /** What the phase is called — the research's own heading. Mono caps LABEL,
   *  keyword-free. All three are `X WITHOUT Y`, one series. */
  title: string;
  /**
   * The phase's confession, under its name. PROSE, first person plural.
   *
   * IT CARRIES THE "WE" THE TITLE GAVE UP, and it is the only line on the card that
   * admits an intent — "and hoped for the best", "while the industry kept shipping".
   * Cut for two lines at 13px in a 340px measure (≈52 characters a line).
   */
  subtitle: string;
  subtitleKw: readonly string[];
  /** What happened inside the phase — FOUR, the same count on all three cards, because
   *  a triptych that argues sameness cannot have one column longer than the others. */
  happenings: Four<FailureHappening>;
  /**
   * What the phase taught, in one line. PROSE.
   *
   * ONE LINE AND NEVER TWO — 48 characters at 13.5px is the whole measure, and the
   * three of them are read as a column down the foot of the triptych. A card whose
   * lesson wrapped would break the row the other two are standing on.
   */
  learned: string;
  learnedKw: readonly string[];
}

/** One thing that happened: a LABEL that names it and a clause that says what it cost.
 *  The em dash between them is drawn by the component, not stored here. */
export interface FailureHappening {
  /** The lead-in. LABEL — keyword-free, because it is already the brightest tier. */
  label: string;
  /** What that meant. PROSE, lower case after the dash — it continues the label. */
  rest: string;
  restKw: readonly string[];
}

const FAILURE_CARDS: Three<FailureCard> = [
  {
    id: "tools-before-method",
    period: "PHASE 1 · Q1 2025",
    title: "TOOLS WITHOUT DIRECTION",
    subtitle: "We gave engineers AI tools and hoped for the best.",
    subtitleKw: ["hoped for the best"],
    happenings: [
      {
        label: "Multiple tools, no standard",
        rest: "5+ AI coding tools explored, no unified approach",
        restKw: ["no unified approach"],
      },
      {
        label: "“Vibe coding” everywhere",
        rest: "trusted AI blindly, even for architecture",
        restKw: ["trusted AI blindly"],
      },
      {
        label: "Ambitious without foundation",
        rest: "built complex solutions before the fundamentals",
        restKw: ["before the fundamentals"],
      },
      {
        label: "Limited sharing and docs",
        rest: "knowledge stayed with individuals, nothing scaled",
        restKw: ["nothing scaled"],
      },
    ],
    learned: "Tools without methodology is just noise.",
    learnedKw: ["just noise"],
  },
  {
    id: "built-what-existed",
    period: "PHASE 2 · Q2–Q4 2025",
    title: "BUILDING WITHOUT STRATEGY",
    subtitle: "We kept building — while the industry kept shipping.",
    subtitleKw: ["while the industry kept shipping"],
    happenings: [
      {
        label: "Custom knowledge base",
        rest: "scrapped — too ambitious, an architectural mess",
        restKw: ["an architectural mess"],
      },
      {
        label: "Internal docs crawler",
        rest: "scrapped — it worked, better solutions shipped later",
        restKw: ["better solutions shipped later"],
      },
      {
        label: "8 of 10 AI connectors",
        rest: "scrapped — official versions replaced them in months",
        restKw: ["official versions replaced them"],
      },
      {
        label: "Only the company-specific held",
        rest: "2 connectors, the business workflows, our AI strategy",
        restKw: ["2 connectors"],
      },
    ],
    learned: "Research first. Build only what is uniquely ours.",
    learnedKw: ["what is uniquely ours"],
  },
  {
    id: "owned-their-work",
    period: "PHASE 3 · MID 2025 – Q1 2026",
    title: "ENABLING WITHOUT EMPOWERING",
    subtitle: "We built AI solutions FOR departments — they became consumers.",
    subtitleKw: ["they became consumers"],
    happenings: [
      {
        label: "AI Steering Committee (AISC) formed",
        rest: "a small team, to bridge engineering and every other department",
        restKw: ["to bridge engineering"],
      },
      {
        label: "Departments became consumers",
        rest: "they wanted to use the solutions, not to learn them",
        restKw: ["not to learn them"],
      },
      {
        label: "Representatives, not ambassadors",
        rest: "product owners on paper — no ownership, no handover",
        restKw: ["no ownership, no handover"],
      },
      {
        label: "AISC became the bottleneck",
        rest: "small team, growing demand, nothing past a few projects",
        restKw: ["nothing past a few projects"],
      },
    ],
    learned: "Build with people, not for them.",
    learnedKw: ["not for them"],
  },
];

/** One lesson, in the shape §6.4's own deck drew it: the phase it came out of, the
 *  trade it names, and the sentence a room repeats afterwards. */
export interface PhaseLesson {
  /** Which failure above it belongs to — the pin between the two poses. */
  id: FailureCard["id"];
  /** The phase's number. LABEL. */
  phase: string;
  /**
   * `X OVER Y`. LABEL, mono caps, keyword-free.
   *
   * ALL THREE ARE THE SAME GRAMMAR, and that is the argument: three failures that
   * reduce to three trades of the same shape is what makes the fourth thing — the
   * shift below — look like a consequence rather than an opinion.
   */
  title: string;
  /** What the lesson sounds like when it is said out loud. PROSE, in quotes. */
  quote: string;
  quoteKw: readonly string[];
}

const PHASE_LESSONS: Three<PhaseLesson> = [
  {
    id: "tools-before-method",
    phase: "PHASE 1",
    title: "METHODOLOGY OVER TOOLS",
    quote: "“It is not WHAT tools we use, it is HOW.”",
    quoteKw: ["HOW"],
  },
  {
    id: "built-what-existed",
    phase: "PHASE 2",
    title: "RESEARCH OVER BUILDING",
    quote: "“Research first. Build only what is ours.”",
    quoteKw: ["what is ours"],
  },
  {
    id: "owned-their-work",
    phase: "PHASE 3",
    title: "AMBASSADORS OVER LABOR",
    quote: "“Build WITH people, not FOR them.”",
    quoteKw: ["WITH"],
  },
];

export const gapFailuresPatternContent = {
  /** The `FigLabel`'s LABEL. Letter and number are derived, as everywhere. */
  figLabel: "THREE FAILURES, ONE SHAPE",

  /** Both parent headlines in one sentence: the confession, then the claim. The
   *  keyword sits on the claim — the count is the given. */
  headline: "We failed three times — the same shape every time.",
  headlineKw: ["the same shape every time"],

  /** The cards' band heading. Mono LABEL, keyword-free. */
  recordEyebrow: "THE RECORD, IN ORDER",

  cards: FAILURE_CARDS,

  /** The heading the record's eyebrow becomes at pose 1. Mono LABEL, keyword-free. */
  lessonsEyebrow: "THREE FAILURES, THREE LESSONS",

  lessons: PHASE_LESSONS,

  /** The conclusion block's heading. Mono LABEL, keyword-free. */
  shiftEyebrow: "THE SHIFT",

  /**
   * What actually changed, in two boxes. LABEL headings, PROSE bullets.
   *
   * TWO COLUMNS AND NOT ONE LIST, because the two are the SAME move seen from two
   * ends — what we made changed, and so did what we were for. Stacked, the second
   * heading reads as the next thing that happened; side by side it reads as the other
   * half of the first.
   *
   * AND THEY ARE DRAWN AS TWO BOXES (owner call, 2026-08-13). A rail down the left of
   * each half drew the pair as two lists that happen to be adjacent; a border closes
   * each half into a thing with an inside, which is what makes them read as two objects
   * being COMPARED. The bullets take the record's own copper marker for the same reason
   * — two lists on one stage are marked the same way or they are not the same kind of
   * list. `../gap-failures-pattern-geometry.ts` pays for the box in the gaps above it.
   *
   * NO SECOND PERSON, and none of §6.5's vocabulary: the shift is still a report on
   * what we did, and the ladder that follows has to arrive un-pre-spent.
   */
  shiftColumns: [
    {
      title: "From Code to Knowledge",
      bullets: [
        "Stopped building code-based solutions",
        "Created knowledge-based tools — AI skills and plugins",
        "Departments define their domain expertise in their own words",
        "They can own it, maintain it, and create their own",
      ],
      bulletsKw: ["knowledge-based tools", "in their own words", "create their own"],
    },
    {
      title: "From Implementors to Enablers",
      bullets: [
        "AISC changed from building to coaching",
        "From writing code to writing playbooks",
        "Departments equipped to build their own",
      ],
      bulletsKw: ["from building to coaching", "writing playbooks", "build their own"],
    },
  ],

  /** The mindset row's LABEL, printed to the left of the sentence — one row, because
   *  the band below the columns has 27px of clearance and no second shelf in it. */
  mindsetLabel: "THE MINDSET SHIFT",

  /**
   * The slide's last arrival: one question traded for another. PROSE.
   *
   * BOTH QUESTIONS ARE KEYWORDS, and that is a 2026-08-13 owner call reversing a
   * one-keyword cut. The sentence is a TRADE — this one for that one — and lighting only
   * the second half made it read as a single claim with a run-up, so the room heard the
   * new question without hearing what it replaced. Two keywords is inside the deck's
   * 1–3 rule (`feedback_keyword_highlighting.md`), and the words between them —
   * "stopped asking" and "started asking" — are what still separates them.
   */
  mindset:
    "We stopped asking “how do we build this?” and started asking “how do we enable this?”",
  mindsetKw: ["“how do we build this?”", "“how do we enable this?”"],

} as const;

// FOUR STRINGS RETIRED WITH THE PROTOTYPE AND ARE RECORDED HERE RATHER THAN KEPT AS DEAD
// KEYS, because an unrendered string in a content module is a sentence a later author will
// reintroduce without knowing why it left:
//
//   · `owning` — "None of this is borrowed. Every one of these calls was mine." The
//     retired §6.3 slide's closer, and the only first person SINGULAR line the section
//     ever had. It left for SPACE: pose 0 spends its whole budget on the three cards, and
//     there is no shelf under them. The presenter still says it.
//   · `patternEyebrow` / `pattern` — "WHAT WAS THE SAME" and "Each time we added
//     something. Not once did we add the ability to run it without us." Pose 1 makes the
//     same claim as three lessons and a shift, which is the research's own shape.
//   · `capabilityLine` — "Not one of the three was a tooling problem. Each one was a
//     capability the organisation did not have yet." The retired §6.4 block's CAPABILITY
//     REFRAME, and the one real loss in the merge: it was the sentence that turned three
//     failures into a property an organisation can be measured on, which is what made
//     §6.5's ladder the obvious next thing to want. The handoff now rests on the shift's
//     closing question instead. `capabilit*` is therefore B.1's and B.5's alone again —
//     `tests/unit/invest-base-rates.test.tsx` records the same fact from the other side.
//   · `closer` — "Three failures, one absence — and no amount of buying would have closed
//     it." Replaced by `mindset` as the slide's last arrival.

// ─────────────────── THE GAP · BRIDGE OUT (gh#72) ───────────────────

/**
 * The bridge that closes this run — leader decks only, and the run's LAST slide.
 *
 * WHY THE `gap` RUN GETS A BRIDGE AND `shape` DOES NOT. Every section from `mindset`
 * onward ends on one (`c6`, `d5`, `e13`, `g11`, `h3`), and the three leader-only runs
 * in front of the curriculum ended on a content slide — so the deck's biggest turn,
 * diagnosis into prescription, happened between two figures with no beat of silence
 * between them. `shape` still ends without one, deliberately: C.4 closes on "I build
 * the foundation. You empower them. They drive the adoption.", which IS the handoff
 * into WHY INVEST, and a bridge behind it would be two closers in a row.
 *
 * BEAT 1 IS THIS RUN'S FOUR SLIDES IN TWO LINES, and it restates rather than adds,
 * which is what a bridge is for. "A tool problem" is B.1's 30/70 split said as a
 * verdict — and it is NOT "none of it was the tools", which the room would hear
 * against B.1's own number: the tools are the 30%, not zero.
 *
 * BEAT 2 NAMES THE NEXT SECTION IN PROSE AND NOT BY LETTER (§3.5). "The shape" is
 * `SECTION_NAMES.shape` in the room's words; the letter it takes is derived per
 * composed deck and appears nowhere in this file.
 */
export const gapBridgeContent = {
  heroSrc: "/heroes/gap-to-shape-bridge.jpg",
  figLabel: "BRIDGE · SHAPE",
  beat1: {
    lineA: { text: "The gap is named.", kw: ["named"] },
    lineB: { text: "None of it was a tool problem.", kw: ["a tool problem"] },
  },
  beat2: { text: "Next: the shape that closes it.", kw: ["the shape"] },
} as const;
