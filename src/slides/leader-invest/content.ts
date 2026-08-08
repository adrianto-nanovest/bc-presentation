// Section WHY INVEST — every string its five slides print, and the three axes three of
// them vary on.
//
// FIVE SLIDES, ONE MODULE, AND THE SECTION IS COMPLETE: `invest-own-proof` (§6.7's D.2)
// above, `invest-chicken-egg` (§6.7's D.3) in the second block, `invest-security`
// (§6.7's D.4) in the third, `invest-subscription` (§6.7's D.5, #59) in the fourth, and
// `invest-base-rates` (§6.7's D.1, gh#70) in the block at the very bottom — FILED LAST
// BECAUSE IT WAS BUILT LAST, not where §6.7 orders it, on the precedent
// `src/slides/leader-gap/content.ts` sets (that file opens on §6.5 and appends in build
// order). That block's own header carries the argument. The
// module is the SECTION's — as in `leader-gap` and `leader-shape`, which are named
// the same way — so a second slide's copy belongs IN it rather than beside it, and
// §6.2's rule that the deck's three shadow-AI passes may share no image and no
// statistic is easier to keep in one file than across two. THAT REASON IS NOW PAID
// OFF RATHER THAN PREDICTED: two of the three passes are in this file, D.3's block
// and D.4's, and the words each of them may not use are stated over the other.
//
// AND THE THIRD PASS IS NOW BUILT TOO — gh#66 shipped B.2 (`gap-no-sop`) into
// `src/slides/leader-gap/content.ts` on 2026-08-08, which changes what the two blocks
// below can honestly claim. Until that day the B.2 half of every disjointness note in
// this file was a claim about §6.2's SPEC TEXT, said so, and could be nothing more.
// It is now a claim about RENDERED COPY on both sides: `tests/unit/invest-chicken-
// egg.test.tsx` and `tests/unit/invest-security.test.tsx` both IMPORT `gapNoSopContent`
// and run the rule in both directions. What changed in the comments below is exactly
// that — the source of the check and its direction — and nothing about the copy itself
// moved. No string in this file was edited by gh#66; the record around it was.
//
// Spec §6.7 (content for all five) · §6.2 (the three shadow-AI passes, which bound
// D.3's and D.4's copy) · §4.4 slot 3 (D.2's brand axis), slot 4 (D.4's) and slot 7
// (D.5's) — and the reason D.1 and D.3 have none · §4.5 (the thesis line) · §12.2 (the
// vendor-claim gate D.4 and D.5 are held to) · §12.3 item 2 (the GEMVIS figures are
// vendor-reported).
// Named by SECTION KEY and
// not by letter: `invest` is D in §4.3's finished leader deck and D at this
// ticket's floor, but the letter is derived per deck (§3.4 R2) and no file under
// `src/slides/leader-invest/` may hold one. `src/slides/leader-shape/index.ts`
// predicted this directory's name for exactly that reason.
//
// WHY THIS SLIDE EXISTS, in one sentence, because every decision below follows
// from it: a Div Head discounts an outsider's case study and cannot discount
// their own company's. So the numbers on this slide are always the numbers of the
// organisation in the room — which is what makes §4.4 slot 3 a hard axis and not
// a nicety.
//
// AND WHY EVERY NUMBER CARRIES ITS PROVENANCE. Both columns are claims made by
// someone with an interest, in front of an audience with compliance obligations:
// GEMS' four figures come from a Google Cloud CUSTOMER STORY (a vendor writing
// about its own customer) and Berau's three ranges are what the Vol-1 winners
// SAID their work was worth. A figure presented as audited that is not is the
// failure this slide can cause, so the epistemic label is COPY — a mono chip on
// every row plus an attribution line under the column — and never a footnote to
// be trimmed for space. `NOT_AUDITED` below is the only construction in which the
// words "independently" and "audited" may appear on this slide at all, and
// `tests/unit/invest-own-proof.test.tsx` holds that as a rule over every rendered
// string rather than as a spot check.
//
// Markup convention, as everywhere else in the deck: data carries plain strings
// plus a sibling `*Kw` array of substrings to highlight at render time. No inline
// `<em>` in data.
//
// THE KEYWORD RULE. `kw` goes on PROSE ONLY, and `invest-own-proof` has exactly two
// lines of prose — the headline and the closer (plus `general`'s one-line refusal, which
// no composed deck reaches). The eyebrow, all seven figures — GEMS' four and Berau's
// three — their metric names, the epistemic chips and the attribution line are LABELS
// in the mono or sans register, where a copper italic reads as a rendering fault, so
// none of them has a `*Kw` sibling. The test holds that as a list, so a new string
// has to pick a side. The rule is the same for D.3 and its two lists are different —
// they are stated over that slide's own block below.
//
// NOTHING IS DELIBERATELY NOT IN THIS FILE ANY MORE, AND THAT IS NEW. This paragraph
// carried a WAITING LIST from #56 until gh#70: the slides §6.7 names whose copy was not
// to be written here early, because dead copy that reads as finished is how unreviewed
// copy ships — the next edit "just fills it in", and the argument nobody agreed to is on
// a projector. The list is now EMPTY. D.3 came off it when #57 rendered it (the second
// block of this file), D.4 when #58 rendered it, D.5 when #59 rendered the fourth block,
// and D.1 (`invest-base-rates`, 78% → 6%) when gh#70 rendered the block at the bottom.
// §6.7's five slides all exist and `invest` is the SECOND leader-only run to be complete,
// after `gap` (gh#67).
//
// AND THE LIST NAMED THE WRONG TICKET FOR D.1 FOR TWO MONTHS — kept here rather than
// quietly deleted, because the correction is the record of how the mistake was found. The
// old text said D.1 through D.5 "are #57–#59". Checked on 2026-08-05 with
// `gh issue view 57` and `gh issue list`: #57 is D.3, #58 is D.4, #59 is D.5, and no
// issue covered `invest-base-rates` at all — §11's phase table put it in the PHASE 7 row
// ("Leader new slides, second tier"), next to `gap-no-sop`. Both of that row's names have
// since been built: `gap-no-sop` as gh#66 on 2026-08-08, and D.1 as **gh#70**, which is
// the ticket this comment could not name because it did not exist when the comment was
// written.
//
// Type-only import for `Brand`, so nothing but the thesis constants below arrives at
// runtime and this file stays plain data.
import type { Brand } from "@/deck-variants";
// THE THESIS, IMPORTED AND NOT RE-AUTHORED (§4.5). The leader cover authored the
// sentence, A.1 quotes it, and this slide closes on it; the constants live in the
// cover's own content module and the doc comment there says why. Three carriers,
// one value, so they cannot drift apart one edit at a time.
//
// AND THIS IS THE ONE MODULE IN THE FAMILY THAT IS NOT NODE-IMPORTABLE, which is a
// price paid on purpose. `leader-gap/content.ts`, `leader-shape/content.ts`,
// `leader-gap/geometry.ts`, `leader-shape/geometry.ts` and `./geometry.ts` all claim
// "importable from a node test" and all hold it, because every import they have is
// type-only and gets stripped. The line below is a RUNTIME import through the `@/`
// bundler alias, which bare Node does not resolve, so
// `node --experimental-strip-types -e 'import("./src/slides/leader-invest/content.ts")'`
// fails on it — and neither alternative is better. Writing the specifier relative does
// NOT fix it (bare Node ESM wants the file extension, and `allowImportingTsExtensions`
// is off in `tsconfig.json`), and re-typing the thesis here to keep the import list
// empty is exactly the drift §4.5 exists to prevent. Nothing needs this module in bare
// Node anyway: `scripts/gh56-verify.mjs` imports `./geometry.ts` — which keeps the
// property — and transcribes every string from the issue's AC on purpose.
import {
  LEADER_THESIS_LINE,
  LEADER_THESIS_LINE_KW,
} from "@/slides/opening-section-a/content";

// ───────────────────── the epistemic label ─────────────────────

/**
 * Both kinds of claim this slide can make, as VALUES — and the single source of the
 * type below.
 *
 * A union cannot be enumerated at run time, and the rules this slide is held to are
 * rules over "every mark", so the members have to exist as a value somewhere. THE
 * ARRAY IS THAT SOMEWHERE AND THE TYPE IS DERIVED FROM IT. Written the other way
 * round — a hand-typed union beside a hand-typed array — a third member compiles
 * with no array entry and is then invisible to every rule that walks the array,
 * which is the one failure mode a closed set is supposed to remove.
 *
 * `tests/unit/invest-own-proof.test.tsx` walks this array and asserts every member is
 * IN USE on some brand's rows, which is the half a list cannot prove on its own: a
 * mark nobody carries is copy nobody reviewed.
 */
export const EPISTEMIC_MARKS = ["vendor-reported", "participant-claimed"] as const;

/**
 * How a figure on this slide is KNOWN — a closed union, and the chip's own copy.
 *
 * DERIVED FROM {@link EPISTEMIC_MARKS}, so the members cannot disagree with the list
 * the tests walk. Adding a third kind of claim is one edit, to the array.
 *
 * TWO REASONS IT IS A UNION AND NOT A `string`. First, a free-text mark is a mark
 * an author can spell "vendor reported" or "Vendor-reported", which renders as a
 * chip nobody greps for and matches no rule in the test file. Second, the value
 * IS the copy — the chip prints this string and the mono register uppercases it —
 * so a third kind of claim cannot be added without its own words arriving with
 * it. There is deliberately NO `MARK_LABELS` lookup: a table between the union and
 * the chip would be a place for a member to exist with no label, which renders as
 * a bordered empty box.
 *
 * Stored lower case because that is how §6.7, the issue and every quotation of
 * these two terms writes them; the LABEL register shouts them on the stage. Same
 * decision as `hubLabel` in `src/slides/leader-shape/content.ts`.
 */
export type EpistemicMark = (typeof EPISTEMIC_MARKS)[number];

/**
 * The ONE phrase on this slide that may contain the words a figure must never be
 * described with.
 *
 * A CONSTANT, AND EXPORTED, so the rule is structural. The AC is "no figure
 * anywhere is stated or styled as audited, independent or verified", and the only
 * honest way to hold that over the copy is to allow exactly one negated phrase
 * and forbid the vocabulary everywhere else. The test strips THIS value and then
 * forbids the words; a reword that drops the "not" changes this string, the strip
 * stops matching, and the vocabulary is left standing in a sentence the rule then
 * fails on.
 *
 * Composed into both attributions rather than typed twice, so the two brands
 * cannot end up negating to different degrees.
 */
export const NOT_AUDITED = "not independently audited";

// ───────────────────── a figure and its provenance ─────────────────────

/** One line of the ledger: a number, what it measures, and how it is known. */
export interface ProofFigure {
  id: string;
  /**
   * The number, VERBATIM from §6.7. Mono, keyword-free.
   *
   * QUOTED, NOT COMPUTED AND NOT REFORMATTED. Every range uses the en dash the
   * rest of the deck uses (`RANGE_DASH` in `src/deck/sections.ts` — a hyphen is
   * indistinguishable in a code review and obvious on a projector), and nothing
   * appends a unit to a quoted figure: the period these ranges cover is stated in
   * the attribution under them, which is the one place it can be said without
   * editing a number somebody else published.
   */
  figure: string;
  /** What the number is about. A LABEL and therefore keyword-free: it is the
   *  name of a measurement, and a copper italic inside one would emphasise a
   *  fragment of a name. */
  metric: string;
  /** ON THE ROW, not once per column (§6.7, and the issue's AC for Berau names
   *  each of the three). A leader who reads one line out loud reads its
   *  provenance with it, and a row copied into a status deck takes the mark
   *  along. */
  mark: EpistemicMark;
}

/**
 * This slide's brand-varying half: an organisation's own figures, or the stated
 * fact that this deck names no organisation.
 *
 * A UNION, so "figures without an attribution" and "an attribution for no
 * figures" are both unrepresentable, and so `general` CANNOT RENDER AN INVENTED
 * FIGURE. The rejected model was one interface with `figures: readonly
 * ProofFigure[]` and an empty array for `general`: it type-checks with an
 * attribution naming a source for nothing, it renders a blank band that reads on
 * a projector as a slide which failed to load, and it is one edit away from
 * holding a plausible number somebody added "just to fill it in". The `figures`
 * arm has no empty case worth writing and the `no-organisation` arm has no
 * figures field at all.
 *
 * The eyebrow is inside the `figures` arm for the same reason the attribution is:
 * it names WHOSE proof this is, and a deck with no proof has no owner to name.
 */
export type OwnProofBlock =
  | {
      readonly kind: "figures";
      /** Mono eyebrow, keyword-free. Names whose proof the room is looking at —
       *  which is the whole argument of pose 0 and the reason the headline can
       *  stay brand-neutral. */
      readonly eyebrow: string;
      readonly figures: readonly ProofFigure[];
      /**
       * The column's source line, printed ON the slide (§6.7 — "cite
       * attributed"). Mono, keyword-free: it is a citation, not a sentence the
       * slide makes a point with.
       *
       * It must name WHO the figures came from, repeat the epistemic mark its own
       * rows carry, and end in `NOT_AUDITED`. The test walks the marks actually
       * present and requires each to appear here, so a column of
       * participant-claimed rows cannot sit under an attribution that says
       * vendor-reported.
       */
      readonly attribution: string;
    }
  | {
      readonly kind: "no-organisation";
      /** Real copy, in the slot the rows would have used. Prose. */
      readonly line: string;
      readonly lineKw: readonly string[];
    };

// ───────────────────── shared copy ─────────────────────

export const investOwnProofContent = {
  figLabel: "PROOF FROM INSIDE THE COMPANY",

  /**
   * The premise, and DELIBERATELY ONLY THE PREMISE.
   *
   * The turn — "…and these are yours" — is made by the eyebrow and the rows,
   * which are on the brand axis, because a shared headline that named the room's
   * own company would be FALSE under `general`, which names none. That is the
   * same reasoning that puts the ladder's closer on the brand axis in
   * `src/slides/leader-gap/content.ts`: a shared line has to be true on every
   * slide it appears on.
   *
   * It is also true of the room the numbers come from. GEMS' figures were
   * published by a vendor writing a customer story — an outsider — and the
   * company IN that story is the one in the room. The eyebrow says whose proof it
   * is; the attribution says who published it. Both facts are on the slide,
   * which is the only way this argument is honest.
   */
  headline: "An outsider's case study is easy to discount.",
  /** The slide's first line of prose, and one highlight on it. */
  headlineKw: ["easy to discount"],

  /**
   * THE THESIS (§4.5), by value. Not a wording of the leader cover's and A.1's
   * line — the same string, imported. See the constants' own doc comment in
   * `src/slides/opening-section-a/content.ts` for why they live there.
   *
   * BRAND-INVARIANT, and that is a decision. The rows above it are the brand's
   * own evidence; the sentence they are evidence FOR belongs to the deck. A brand
   * axis here would be two phrasings of one thesis again, which is the exact
   * failure §4.5 exists to prevent.
   */
  closer: LEADER_THESIS_LINE,
  closerKw: LEADER_THESIS_LINE_KW,
} as const;

// ───────────────────── the brand axis (§4.4 slot 3) ─────────────────────

/**
 * GEMS — GEMVIS' four published figures (§6.7).
 *
 * VERBATIM, AND VENDOR-REPORTED. The four numbers are Google Cloud's own
 * published description of what GEMVIS did for GEMS, which is what makes them
 * usable in this room at all: the company in the story is the company in the
 * room. It is also what limits them — a vendor writing about its own customer is
 * an interested party, so §12.3 item 2 says to cite attributed and, ideally, have
 * DigiTech confirm the figures before Aug 19. THIS BLOCK IS THE ATTRIBUTED-ONLY
 * FORM: nothing here claims confirmation the deck does not have, and if DigiTech
 * does confirm, the change is one attribution line and four chips — not a
 * re-argued slide.
 *
 * The same source already prints on the Capability Ladder (`leader-gap`), where
 * "50 applications, 4,000+ users" licenses DigiTech's ≈L3 placement. Two slides,
 * one citation, deliberately worded the same way.
 */
const GEMS_BLOCK: OwnProofBlock = {
  kind: "figures",
  // GEMVIS is DigiTech's platform serving the group, so the eyebrow names the
  // COMPANY and not the function: a Div Head outside DigiTech still reads it as
  // theirs. `leader-gap` names DigiTech where the claim is about the function.
  eyebrow: "GEMVIS · GEMS' OWN PLATFORM",
  figures: [
    {
      id: "decision-speed",
      figure: "+90%",
      metric: "Executive decision speed",
      mark: "vendor-reported",
    },
    {
      id: "retrieval",
      // The arrow is the deck's own (E.12 and B.4 both use it for a before→after
      // pair); "under 1 hour" is the source's hedge and is kept as the source
      // wrote it rather than rounded to "1 hour".
      figure: "2 days → under 1 hour",
      metric: "Multi-operational retrieval",
      mark: "vendor-reported",
    },
    {
      id: "portfolios",
      figure: "50+",
      metric: "Application portfolios",
      mark: "vendor-reported",
    },
    {
      id: "users",
      figure: "4,000+",
      metric: "Users on the platform",
      mark: "vendor-reported",
    },
  ],
  attribution:
    "Source: Google Cloud's published GEMVIS customer story — vendor-reported figures, " +
    `${NOT_AUDITED}.`,
};

/**
 * Berau — the Vol-1 winners' own annual-impact estimates (§6.7).
 *
 * PARTICIPANT-CLAIMED, WHICH IS A DIFFERENT KIND OF CLAIM FROM GEMS' AND IS
 * MARKED DIFFERENTLY. Nobody published these; the teams that built the work said
 * what they thought it was worth, in a competition they were entering. That is
 * still the strongest evidence in the room — it is their own people, on their own
 * processes — and it is exactly the kind of number a Div Head will be asked to
 * defend upward, so the chip travels with every one of the three.
 *
 * THE PERIOD IS STATED ONCE, in the attribution, and not three times in the
 * metric names. §6.7 calls these ANNUAL impact; the figures themselves are quoted
 * verbatim, so appending "per year" to each would edit a quoted number, and
 * repeating it in all three metric names would put the same two words down the
 * column while the thing that actually differs — the use case — reads second.
 */
const BERAU_BLOCK: OwnProofBlock = {
  kind: "figures",
  eyebrow: "VOL-1 WINNERS · BERAU COAL'S OWN TEAMS",
  figures: [
    {
      id: "production-status",
      // En dash, U+2013, in all three ranges — see `ProofFigure.figure`.
      figure: "IDR 135–155M",
      metric: "One-click production status",
      mark: "participant-claimed",
    },
    {
      id: "document-automation",
      figure: "IDR 35–38M",
      // §6.7 writes this "document/knowledge automation"; the slash is spelled
      // out because a projected slash at 15px reads as a line break.
      metric: "Document and knowledge automation",
      mark: "participant-claimed",
    },
    {
      id: "geospatial-safety",
      figure: "IDR 200–700M",
      metric: "Geospatial safety evaluator",
      mark: "participant-claimed",
    },
  ],
  attribution:
    "Source: the Vol-1 winners' own annual-impact estimates — participant-claimed figures, " +
    `${NOT_AUDITED}.`,
};

/**
 * `general` — UNREACHABLE TODAY, and kept to the shortest honest thing.
 *
 * No `general-leader` variant is registered (`VARIANTS` in `@/deck-variants`), so
 * no composed deck asks for this block. It exists for the reason A.1's leader
 * resolver is applied to `general` too: registering that variant should serve a
 * slide that shows NOBODY's figures, rather than crash at first paint or — far
 * worse — fall through to another organisation's evidence on the one slide whose
 * entire argument is "these numbers are yours".
 *
 * SO THE REFUSAL IS THE TYPE AND NOT THE COPY. This arm has no `figures` field to
 * fill, which is what makes the failure above impossible rather than merely
 * unwritten, and the one line it does carry names no organisation and contains no
 * digit. DELIBERATELY THE THINNEST BLOCK OF THE THREE: every word here is copy no
 * audience has ever read, and dead copy that reads as finished is how invented
 * evidence gets shipped by a later edit that "just fills this in". Whoever
 * registers `general-leader` will have to write the real thing.
 *
 * The closer still prints under this block, and correctly: the thesis is the
 * deck's, not a brand's, and it is the sentence a room with no named proof is
 * still being asked to accept.
 */
const GENERAL_BLOCK: OwnProofBlock = {
  kind: "no-organisation",
  line: "This deck names no organisation, so it has no proof of its own to show.",
  lineKw: ["no proof of its own"],
};

/**
 * This slide's brand-varying half, brand by brand.
 *
 * A `Record` keyed by `Brand` and not a `brand === "gems"` ternary, for the same
 * reason `capabilityLadderFor`'s and `hubBrandLineFor`'s tables are records: a
 * fourth brand must FAIL TO COMPILE here rather than silently show one
 * organisation the evidence of another. On this slide that is not a tidiness
 * argument — showing a Div Head another company's numbers is the one failure the
 * slide is built to prevent. This is §4.4's "a content block per brand, not a
 * brand × deckSet matrix": the deck-set axis does not reach this slide, because a
 * slide only the leader decks compose has nothing to vary against.
 *
 * NOT A GENERIC OVERRIDE BAG, and not read off `VARIANT` inside a component:
 * `sectionOverrides` stays composition-only (§4.1), the slide file resolves the
 * brand ONCE at module scope, and every component below it takes the resolved
 * block as a prop. That is what lets the test render both brands in one epoch.
 */
const OWN_PROOF_BY_BRAND: Record<Brand, OwnProofBlock> = {
  berau: BERAU_BLOCK,
  gems: GEMS_BLOCK,
  general: GENERAL_BLOCK,
};

/**
 * This slide's figures and their provenance for one brand. Pass `VARIANT.brand`.
 *
 * THE ONLY WAY IN. The table above is deliberately not exported: a caller that
 * could read it could also enumerate keys the brand table does not have, and the
 * tests that hold a rule over "every brand" would then prove it over this file's
 * own key set instead of over `BRANDS`. They walk `Object.keys(BRANDS)` and come
 * through here, so a brand registered without a block fails at the type and a
 * block written for a brand that does not exist fails at the same place.
 */
export function ownProofFor(brand: Brand): OwnProofBlock {
  return OWN_PROOF_BY_BRAND[brand];
}

// ───────────────────── §6.7's D.3 · the deadlock, and who can skip it ─────────────────────
//
// FOUR BEATS, AND BEAT 3 IS WHAT MAKES THE OTHER THREE SAYABLE. The deadlock (no
// budget without proof, no proof without budget) → what we actually did, with the
// bill itemised → it worked, management was convinced, full investment was released →
// the turn, which is that the person in the chair does not have to repeat any of it.
// §6.7 and the issue are explicit that beat 3 is LOAD-BEARING: without it beat 2 is
// advice to breach somebody's terms of service, and with it the slide is a
// consciously priced trade-off that ended legitimately — a story a Div Head can
// repeat upward. So {@link investChickenEggContent.verdict} is not a summary and it
// is not optional; it is the beat that licenses the two above it, and no arrangement
// of this copy may let the argument stop at beat 2.
//
// THE VOICE TURNS ONCE, AND THAT TURN IS THE SLIDE. Beats 1–3 are FIRST PERSON PAST —
// what we did, what it cost us, how it ended. Beat 4 is SECOND PERSON PRESENT — what
// you do not have to repeat. Nothing in the first three beats is addressed to the
// room and nothing in the fourth is a confession, which is what keeps a story about
// breaking somebody's rules from reading as a recommendation to break them.
//
// NO BRAND AXIS, AND THAT IS A DECISION RATHER THAN AN OMISSION. §4.4's table of
// seven brand × deckSet slots does not list this slide — slot 3 is `invest-own-proof`
// and slot 4 is D.4's on-prem beat — and the reason is whose story it is: the
// deadlock, the shared accounts and the ban are NANOVEST'S OWN, not the client's. A
// resolver here would have to invent a version of this history for a division that
// never lived it, which is the failure `ownProofFor` above exists to prevent arriving
// from the other direction. One story, told the same way in both leader decks. Do not
// add a resolver — there is nothing true to put in it.
//
// THE REGISTERS. `kw` on PROSE ONLY, as everywhere in this file. FOUR prose lines,
// each with a `*Kw` sibling: `headline`, `workaround`, `verdict`, `turn`. Everything
// else is a LABEL, carries no `*Kw` and may not gain one: `figLabel`, both
// `deadlockClauses`, `costsEyebrow`, `pilotEyebrow`, and the eight `LineItem` labels.
// The clauses are the sharpest case — they are a rule quoted in the mono register, and
// a copper italic inside "NO BUDGET WITHOUT PROOF" would emphasise a fragment of a
// rule.
//
// TWO ABSENCE RULES THIS COPY HOLDS (the issue's AC 5 and AC 6), both checkable by
// grep over the strings below.
//
//   1. NO VENDOR, AND NO CLAIM ABOUT WEAK ENFORCEMENT. §6.7 keeps the vendor-leniency
//      comparison ("ChatGPT seems not strict") OFF the slide and leaves it to the
//      presenter's mouth: choosing a vendor by weakness of enforcement, printed three
//      slides from the governance recommendation, is indefensible in a Sinar Mas
//      context. So no vendor is named here at all — none of `ChatGPT`, `OpenAI`,
//      `Claude`, `Anthropic`, `Gemini`, `Google`, `Copilot`, `Microsoft` — and none of
//      `lenient`, `leniency`, `not strict`, `less strict`, `strict`, `unenforced`,
//      `enforcement`, `blind eye`, `looks the other way`, `tolerated`, `got away`
//      appears in any string. "banned repeatedly" is the OPPOSITE claim and it is
//      required: enforcement happened, to us, more than once. It is also why beat 2
//      cannot be softened — a workaround nobody ever caught would have cost nothing,
//      and the bill is the point.
//   2. NO TOKEN EITHER OF THE OTHER TWO SHADOW-AI PASSES OWNS (§6.2). The deck spends
//      shadow AI three times with an enforced escalation — B.2 as CONDITION, D.4 beat
//      2 as EXPOSURE, D.3 (here) as RATIONAL BEHAVIOUR — and §6.2 puts that in the
//      spec rather than in the implementer's judgement, because the escalation
//      degenerates into repetition the moment two passes share an image or a
//      statistic. So this block carries none of B.2's condition vocabulary (`no SOP`,
//      `no guidance`, `improvise`) and none of D.4's (`revoke`, `produce`, `6.7`,
//      `9.2`, `self-hosted`, `on-prem`, `consumer account`, `workspace`,
//      `governance retrofit`, `Culture, Risk, Governance, Ethics`).
//
//      D.4 IS BUILT NOW — #58 rendered it into the block at the bottom of this file on
//      2026-08-05 — so half of this check has stopped being a claim about spec text and
//      become a claim about rendered copy, which is a strictly stronger thing.
//      `tests/unit/invest-security.test.tsx` owes the mirror of it from the other side.
//      TWO OF THE TEN D.4 TOKENS ABOVE ARE NOW HISTORICAL RATHER THAN RESERVED, and
//      saying so is cheaper than letting the list quietly lie: D.4 prints NEITHER `6.7`
//      NOR `9.2`. `docs/researches/2026-08-04-vendor-pricing-and-data-handling.md` §9
//      traced both literals to the superseded Artificial Analysis Index v4.0 and #58
//      shipped the v4.1 pair (`4` and `5.2`) that shipping B.4 already uses. Forbidding
//      them here still costs nothing and still guards the escalation against a later
//      author lifting the SPEC's old sentence, so the two patterns stay.
//      B.2 IS BUILT NOW TOO, AND THIS PASSAGE USED TO SAY THE OPPOSITE. Until
//      2026-08-08 it read "B.2 IS STILL UNBUILT, so that half of the check remains
//      against §6.2's spec text and not against rendered copy", and that was the honest
//      limit at the time. gh#66 rendered `gap-no-sop` into
//      `src/slides/leader-gap/content.ts` (export `gapNoSopContent`, figLabel "THE RULE
//      NOBODY WROTE"), so BOTH halves of this check are now claims about rendered copy.
//      `tests/unit/invest-chicken-egg.test.tsx` imports that module and runs the rule in
//      BOTH directions: none of B.2's image tokens in this block, none of this block's
//      nine reserved tokens in B.2's strings, no three-word phrase shared either way,
//      and — the statistic half — B.2 prints no digit in any rendered string, asserted
//      rather than quoted, against this block's single quantity.
//      WHAT B.2 ACTUALLY PRINTS, so the three tokens above can be read for what they
//      now are: it spends §6.2's verb ONCE ("Everyone improvises a rule that works for
//      them"), and it prints NEITHER `no guidance` NOR `no SOP` anywhere. So `improvise`
//      is a live reservation against rendered copy and the other two are reservations
//      against the SPEC's phrasing only — kept, because a later author lifting §6.2's
//      sentence into this slide is a different failure from lifting B.2's copy, and both
//      are cheap to forbid. B.2's own image is a lopsided diptych — three things the
//      organisation handed out against four questions each followed by an EMPTY RULE —
//      and this slide draws none of it: no login, no demonstration, no encouragement, no
//      silence, no unanswered question.
//      The one place B.2's vocabulary was already on a stage before it shipped is
//      `leader-shape/content.ts`'s governance decision ("where the data may go … before
//      someone improvises"), which is C.1 indexing it on purpose — B.2's own header
//      records the same anchor from the other end, and nothing below repeats it.
//      THE READING OF ALL THREE PASSES IN DECK ORDER — the check §6.2 actually turns on,
//      which no token rule replaces — is recorded ONCE, in D.4's block at the bottom of
//      this file, because D.4 is the pass the escalation ends on. In one line for this
//      block: D.3 adds an ACT to B.2's absence and never restates it — the reason it
//      gives for the workaround is the budget deadlock above, not a missing rule.
//
//      THE ONE ADJACENCY THAT CANNOT BE REMOVED, stated rather than hidden. §6.7
//      prescribes "no audit trail" and "data outside the boundary" as two of THIS
//      slide's four costs, while D.4 beat 2 is "data you cannot audit, revoke, or
//      produce". The words touch. The images do not: D.3's four costs are a PAST-TENSE
//      BILL in the first person — what our own workaround cost US — and D.4's is a
//      PRESENT-TENSE EXPOSURE in the second person — what YOU cannot do today. D.3
//      also names NONE OF D.4's THREE DESTINATIONS: no consumer account, no
//      company-managed workspace, nothing self-hosted. Said that precisely, and not as
//      "it names no account of any kind", because THIS SLIDE DOES NAME AN ACCOUNT —
//      `workaround` below prints "shared accounts", which §6.7 requires and which beat 2
//      cannot be written without. What D.4 owns is the three-way destination PICTURE, and
//      "shared accounts" is none of the three. D.3 carries no statistic of D.4's either.
//      That is the whole of what can be claimed here: two line items on a bill share two
//      words with a later slide's exposure, and neither the picture nor the number is
//      shared.
//
// THE ONLY QUANTITY IN THIS BLOCK IS `30-DAY`, AND IT IS D.3'S OWN. `grep -rn
// "30-day\|30 day\|30-DAY" docs/specs/` returns exactly one spec line — §6.7's D.3
// sentence, line 862 — and `30` appears nowhere in §6.2's B.2 paragraph or in §6.7's
// D.4 paragraph. So the one number this slide prints cannot be the statistic §6.2
// forbids two passes from sharing. (Greps run 2026-08-05.) SINCE 2026-08-08 THE B.2 HALF
// OF THAT IS STRONGER THAN A GREP OF THE SPEC: `gap-no-sop` is built and prints NO DIGIT
// IN ANY RENDERED STRING, which `tests/unit/invest-chicken-egg.test.tsx` asserts over
// the imported copy rather than reading off B.2's own comment. A pass with no numeral in
// it cannot share a statistic with anything.

/**
 * One row of a short sans list in this section — a cost D.3 paid, a term of its pilot,
 * or one of D.4's three exposures.
 *
 * ONE INTERFACE FOR ALL THREE, because they are the same object three times: short
 * label-register strings, each with a stable `id` for whatever the renderer keys and
 * tags its rows with, at the same size in the same tier. `id` is kebab-case, like the
 * ledger's above, so the three lists' hooks read the same way in a test. Duplicate
 * interfaces would exist only to drift apart, and
 * `./chicken-egg-geometry.ts` gives D.3's two lists ONE row height and ONE pitch —
 * `./security-geometry.ts` reuses the same two numbers for D.4's — for the same reason:
 * what differs between a bill, a set of terms and an exposure is the budget each one
 * has, not the shape of a row.
 *
 * THE COUNT IS NOT PART OF THIS TYPE. D.3's two lists are four rows each and D.4's is
 * three, and each list's own tuple annotation is where its count is refused.
 */
export interface LineItem {
  id: string;
  /**
   * A LABEL, and therefore keyword-free: each one is the name of a thing, and a
   * copper italic inside a name emphasises a fragment of it.
   *
   * SENTENCE CASE, like the ledger's metric names above. §6.7 writes all eleven of
   * these strings — D.3's four costs and four terms, D.4's three exposures — inside
   * running prose, so the words are §6.7's and the initial capital is
   * this file's — the row is a label, and a label that starts lower case reads as a
   * sentence that lost its first half.
   */
  label: string;
}

/**
 * Exactly four, held by the TYPE.
 *
 * A FIXED-LENGTH READONLY TUPLE, not a length-checked array type, and the reason is
 * where the error lands. `readonly [T, T, T, T]` puts a fifth entry's error ON the
 * fifth entry, at the definition site, with no cast anywhere. The alternative —
 * `readonly T[] & { length: 4 }` — cannot be satisfied by an array literal without a
 * cast, and a cast is the one construction that can be wrong in silence.
 *
 * IT IS ALSO WHAT MAKES THE COUNT READABLE FROM OUTSIDE. A tuple's `["length"]` is the
 * literal `4`, so `./chicken-egg-geometry.ts` pins its own copy of D.3's two counts to
 * these tuples — and `./security-geometry.ts` pins D.4's domain count to the third —
 * through a TYPE-ONLY `import()`: no runtime import, which both of those modules
 * need in order to stay importable from bare Node.
 *
 * AND FOUR IS NOT A COPY EDIT. §6.7 names four costs, the issue's AC names four
 * pilot constraints, and §6.7 names four governance domains; a fifth of any of them is
 * a different argument, not a longer list.
 */
type Four<T> = readonly [T, T, T, T];

/**
 * BEAT 1 — the deadlock, as the two clauses that lock each other.
 *
 * EXACTLY TWO, AND THE TYPE SAYS SO: a two-clause cycle is what a deadlock IS. A third
 * clause would make it a queue or a dependency chain — something with an end — and the
 * slide's first beat would stop being the thing beats 2 to 4 answer.
 *
 * MONO LABEL REGISTER, keyword-free, and stored SHOUTED rather than title-cased
 * (unlike `hubLabel` in `src/slides/leader-shape/content.ts`): neither string is ever
 * quoted in prose, so the register's `textTransform` is a no-op on them and the data
 * reads as the stage does.
 *
 * THE LOOP IS IN THE WORDS, NOT IN A DRAWN RING. Each clause is the other one with its
 * two nouns swapped, which is what a room reads as a cycle — and it is why the pair
 * gets two plain shelves in `./chicken-egg-geometry.ts` and no third box for an arrow
 * to live in. Drawing the cycle would spend an `<svg>` on saying what the two strings
 * already say to anyone who reads them in order.
 */
const DEADLOCK_CLAUSES: readonly [string, string] = [
  "NO BUDGET WITHOUT PROOF",
  "NO PROOF WITHOUT BUDGET",
];

/**
 * BEAT 2's BILL — §6.7's four costs, verbatim and in §6.7's order.
 *
 * THE ORDER IS §6.7'S AND IT IS NOT RE-SORTED, because it reads as an escalation of
 * WHOSE problem each one is: work lost (the person doing it) → no audit trail (the
 * company's records) → data outside the boundary (the company's risk) → usage
 * invisible to the people who later have to approve it (the desk the slide is
 * addressed to). Sorted by length, or by severity as an author happens to see it, the
 * bill would stop landing on the room.
 *
 * FOUR, AND THE `Four` TUPLE HOLDS IT. These are the AC's own list; a fifth cost is a
 * different argument.
 */
const COSTS: Four<LineItem> = [
  { id: "work-lost", label: "Work lost mid-stream" },
  { id: "no-audit-trail", label: "No audit trail" },
  { id: "data-outside-boundary", label: "Data outside the boundary" },
  {
    id: "usage-invisible",
    label: "Usage invisible to the people who later have to approve it",
  },
];

/**
 * BEAT 4's TERMS — the four things that make the pilot approvable, in the issue's AC
 * order.
 *
 * EVERY ONE OF THEM IS A LIMIT, which is the reason the card is an offer and not an
 * ask: a handful of seats bounds the headcount, one named use case each bounds the
 * scope, a kill criterion says in advance what stopping looks like, and a spend cap
 * bounds the exposure. With the 30 days in `pilotEyebrow` that is four limits and a
 * clock — everything a division head needs to say yes to it in one breath, and the
 * reason this is the shortest copy on the slide.
 */
const PILOT_CONSTRAINTS: Four<LineItem> = [
  { id: "seats", label: "A handful of seats" },
  { id: "use-case", label: "One named use case each" },
  { id: "kill-criterion", label: "A kill criterion" },
  { id: "spend-cap", label: "A spend cap" },
];

export const investChickenEggContent = {
  figLabel: "THE DEADLOCK, AND WHO CAN SKIP IT",

  /**
   * The premise, and it is deliberately about EVERY division rather than about ours.
   *
   * "Every division" is what makes the next three beats a case study instead of an
   * anecdote: if the deadlock is structural, the room recognises it before the story
   * starts, and the story is then evidence rather than an excuse. The keyword is on
   * the sameness for the same reason — the one thing the first line has to land is that
   * this deadlock is THEIRS, not something that once happened to a vendor.
   */
  headline: "Every division starts in the same deadlock.",
  headlineKw: ["the same deadlock"],

  deadlockClauses: DEADLOCK_CLAUSES,

  /**
   * BEAT 2 — what we actually did, in one sentence, with its price in the same
   * breath.
   *
   * TWO KEYWORDS AND NOT ONE, which is the only distribution of emphasis that is
   * honest here. "shared accounts" alone would highlight the act and leave the
   * consequence unmarked — a slide that emphasises the workaround and mutes the ban is
   * a slide recommending the workaround. The pair marks the trade: what we did, and
   * what it got us. (`KeywordHighlight`'s own note allows 1–3 per chunk.)
   *
   * "So we did it" OPENS ON THE CONSEQUENCE OF BEAT 1 and not on a new subject: the
   * deadlock above is the reason, and the sentence is the behaviour it produced. That is
   * this slide's §6.2 pass — shadow AI as RATIONAL BEHAVIOUR — and it is carried by the
   * causal "So" rather than by an adjective. Nothing here calls the workaround
   * reasonable; the sentence's grammar does it, which is the only way a slide can say it
   * without appearing to recommend it.
   */
  workaround: "So we did it on shared accounts, and we were banned repeatedly.",
  workaroundKw: ["shared accounts", "banned repeatedly"],

  /**
   * The bill's label. Mono, keyword-free.
   *
   * PAST TENSE, AND THAT IS THE WORK IT DOES. "WHAT IT COST" says the bill is closed —
   * it was paid, by us, and the four rows under it are a record. "WHAT IT COSTS" would
   * make the same four rows a warning aimed at the room, which is D.4 beat 2's job and
   * not this slide's (see the §6.2 note above).
   */
  costsEyebrow: "WHAT IT COST",
  costs: COSTS,

  /**
   * BEAT 3 — the load-bearing one. Three sentences, in the order they happened.
   *
   * THE KEYWORD IS ON THE RELEASE OF THE INVESTMENT and not on "It worked", because
   * the emphasis is the last thing the room takes away and "it worked" is a claim
   * anybody can make about anything. "Full investment was released" is the fact that
   * ends the story legitimately, and it is the clause a Div Head repeats upward.
   *
   * THREE SENTENCES AND NOT ONE, deliberately: they are three separate events —
   * the work landed, the people with the budget were convinced, the money moved — and
   * a single comma-spliced line would let a reader take the third as a restatement of
   * the first.
   *
   * THE FOUR-WORD SPAN WRAPS, AND NARROWING IT TO `["released"]` WAS CONSIDERED AND
   * DECLINED on 2026-08-05. Do not re-open it without new evidence; the review that
   * raised it is recorded here so the next reader does not have to re-litigate it.
   *   · WHAT WAS RAISED. The box is cut for two lines and the keyword breaks across them
   *     — "Full investment was" (226.97px, ending x=769.31) then "released" (90.39px,
   *     from x=48), measured in Chromium. A one-word span would keep §6.7's sentence
   *     verbatim, move no geometry, and leave the load-bearing beat with an unbroken
   *     copper phrase. `./components/ChickenEggBeats.tsx` records the three measurements
   *     that rejected narrowing the BOX instead; this is the cheaper alternative it did
   *     not consider.
   *   · WHY IT IS STILL FOUR WORDS. The rendered frame was inspected, not argued about:
   *     both fragments are copper italic, contiguous in reading order, and the second
   *     starts at the column's left edge directly under the first — at projection
   *     distance that reads as ONE wrapped emphasis, not as two marks. Against which the
   *     copy cost is real and permanent: "released" alone emphasises the verb, and the
   *     fact that ends this story legitimately is the whole clause. That is the argument
   *     the paragraph above makes, and a split line box is a weaker reason to give it up
   *     than a cosmetic one.
   */
  verdict: "It worked. Management was convinced. Full investment was released.",
  verdictKw: ["Full investment was released"],

  /**
   * BEAT 4 — the turn, and the only sentence on the slide addressed to the room.
   *
   * "all three" AND NOT "beats 1–3". §6.7 phrases the turn as "you are the person who
   * can skip beats 1–3" — the spec's own numbering of this slide's beats, which the room
   * is never shown — so the printed line counts what the left column has just shown it
   * instead: the deadlock, the workaround, and the bill. What is being skipped is the
   * ROUTE, not the outcome: the person in the chair can authorise the proof directly, so
   * none of the three steps we took to earn it has to happen again.
   *
   * THE ADDRESS CARRIES THE SENTENCE AND THE KEYWORD IS DELIBERATELY NOT ON IT. A copper
   * italic on "You are the person who can" would emphasise the flattery; on "skip all
   * three" it emphasises the offer, which is the thing being agreed to.
   */
  turn: "You are the person who can skip all three.",
  turnKw: ["skip all three"],

  /**
   * The card's label. Mono, keyword-free — and the only quantity on the slide.
   *
   * "INSTEAD —" IS DOING REAL WORK. Without it the card reads as one more thing the
   * slide is asking for; with it the card REPLACES the route the story just described,
   * which is the whole shape of beat 4. The em dash is the deck's own (see `kicker` in
   * `src/slides/leader-shape/content.ts`).
   *
   * IT IS THE WIDEST STRING IN THE OFFER COLUMN — 270.61px measured, against the
   * card's 336px measure — so `./chicken-egg-geometry.ts` cut that column for THIS
   * string rather than for the four terms under it. A wrapped eyebrow inside a
   * bordered box reads as damage, not as a label.
   */
  pilotEyebrow: "INSTEAD — A 30-DAY PROOF PILOT",
  pilotConstraints: PILOT_CONSTRAINTS,
} as const;

// ───────────────────── §6.7's D.4 · where the data goes, and what answers it ─────────────────────
//
// THREE BEATS, AND THE THIRD ONE IS THE ONLY THING THE ROOM CAN ACT ON. Where your
// data actually goes, across three destinations → your real exposure today is not the
// vendor, it is shadow AI → the four governance domains as the SOP starter, with
// "governance retrofit" named as what happens if they are written down later instead.
// §6.7's beat order is kept in the reveal order and in the reading order.
//
// §12.2's GATE, AND THE BRANCH THAT SHIPPED: **the CATEGORY branch. No vendor's
// current policy is asserted anywhere in this block.** §12.2 gives exactly two
// options — every vendor-specific claim traces to the verification record, or the beat
// describes the CATEGORY and asserts no named vendor's policy — and calls this the
// highest-consequence place in the deck to be wrong, in a group with real compliance
// obligations. The record exists and most of it is usable
// (`docs/researches/2026-08-04-vendor-pricing-and-data-handling.md`, #52, read live
// 2026-08-04), so this is a choice and not a fallback. Three reasons, in the order they
// decided it:
//
//   1. BEAT 2's THESIS IS "YOUR EXPOSURE IS SHADOW AI, NOT THE VENDOR". A slide that
//      spent beat 1 on one named vendor's retention window would spend beat 2 arguing
//      against the frame it had just built. The category IS the argument here.
//   2. §6's EIGHT CROSS-VENDOR PATTERNS ARE THE ONLY CLAIMS NO SINGLE VENDOR'S POLICY
//      CHANGE CAN BREAK, and the record's own §11 says re-check every load-bearing URL
//      after 2026-09-04. This deck is presented 18–19 August. A category claim sourced
//      to a pattern that held at all three vendors on 2026-08-04 survives one of them
//      changing its terms the week before the session; a quoted retention window does
//      not, and nobody would notice it had stopped being true.
//   3. THE RECORD'S §2 FORBIDS THE ONE VENDOR CLAIM A PRESENTER WOULD REACH FOR. No
//      leniency, laxity or enforcement-posture claim about any vendor may appear on any
//      slide (§6.7 keeps it verbal), and §7's F12 gives it no replacement sentence at
//      all. Honoured here: none of `lenient`, `not strict`, `enforcement`, `tolerated`
//      appears below, and none of the copy characterises what any vendor does in
//      practice beyond what a published term states.
//
// So every claim below is lifted from §6 (the cross-vendor patterns) or §7 (the F1–F12
// sentences), and none of `Anthropic`, `Google`, `OpenAI`, `Claude`, `Gemini`,
// `ChatGPT`, `Bedrock`, `Vertex`, `Azure`, `gpt-oss`, `Workspace`, `GEAP` or `GDC`
// appears in any string this block authors. Which sentence came from where:
//
//   · the headline and the first two contracts — §6 pattern 1 / F1 ("same brand, same
//     screen, opposite default")
//   · the third contract and the two figures' framing — §6 pattern 8 / F8 ("nobody
//     sells you the frontier model for your own data centre")
//   · the second contract's "an admin exists" — §6 pattern 2, stated as the CONTRAST
//     beat 2 then pays off
//   · beat 2's line and its three rows — §6 pattern 2 / F4, verbatim in substance
//
// THE ONE VENDOR NAME ON THE STAGE IS A CITATION, NOT A POLICY, AND IT IS GEMS' OWN
// ARCHITECTURE. {@link OnPremCallback}'s `runs-it` arm prints "Google Cloud's published
// GEMVIS customer story" as the source of the DigiTech callback (§4.4 slot 4). That is
// a published claim about the room's own company's hardware, not an assertion about any
// vendor's terms, so it is outside the rule above rather than an exception to it — and
// it is the same citation `invest-own-proof` prints two slides earlier, worded the same
// way and carrying the same `NOT_AUDITED` negation, so the deck cites one source once.
// gh#57's `namesAVendor` proxy already allowlists it for exactly this reason. Do not
// widen that allowlist to cover a policy claim.
//
// BEAT 1's TWO NUMBERS ARE `4` AND `5.2`, NOT §6.7's `6.7` AND `9.2`, AND THIS IS THE
// SLIDE THAT CORRECTS THE SPEC. The research record's §9 traced both spec literals to
// the SUPERSEDED Artificial Analysis Index v4.0 capture of 8 June 2026; §9.3 shows
// `9.2` is a collision trap, because it is still live in v4.1 — as the CODING gap for
// the UNRESTRICTED licence tier, where §6.7 uses it for tool-calling, so a reviewer
// checking the spec against the current data finds the number, ticks it off and ships
// something wrong on both axes. Shipping B.4 (`src/slides/landscape-section-b/
// content.ts`) already uses Kimi K3 — the RESTRICTED tier — across all four of its
// panels, at 4 / 1.8 / 5.2 / 4 with `Artificial Analysis · 2 August 2026`, so this
// slide takes the same tier and says so on the stage rather than mixing tiers with the
// slide the room saw an hour earlier. §9.4 assigns the one-line spec edit to this
// ticket; it is made, with a dated amendment in §6.7.
//
//   · `4` AND NEVER `4.0`. v4.1 renders the Intelligence Index as INTEGERS (§9.5), so
//     the decimal place does not exist and may not be invented.
//   · NOTHING HERE IMPLIES OPEN WEIGHTS GOT WORSE. The Agentic index's scale changed in
//     v4.1 (old max 77.8 → 55.3), so a smaller agentic gap is a scale change (§9.5).
//     This block prints ONE capture, dated, and makes no comparison to an older one.
//   · THE STALE "90% THE INTELLIGENCE, 1/15th THE COST" LINE IS NOT REUSED. §9.5 shows
//     it does not reproduce on v4.1 data, so this slide makes no cost claim at all —
//     that argument is D.5's, with D.5's own anchors.
//
// BEAT 3's PROVENANCE IS FRAMING 2, FOR BOTH BRANDS, WITH NO BRAND FORK. §10 of the
// record traced Culture · Risk · Governance · Ethics to the bottom and found them
// AUTHORED, not sourced: every in-repo mention converges on slide 19 of our OWN April
// 2026 deck, and the four domains enter the corpus in a sibling repo's brainstorm as
// the presenter's own question. The #52 acceptance criterion asking for them to be
// sourced could not be met, and that is recorded rather than worked around.
//
//   · FRAMING 1 WAS NOT SHIPPED, AND WHY. §10.2 ranks "the GEMS event committee asked
//     for guidance and SOP covering Culture, Risk, Governance, Ethics" strongest —
//     it is the only externally originated instance (`docs/prompts/gems-catalyst.md:49`,
//     under "Feedback from Event Committee"). It is also ARTIFACT-FREE: a verbally
//     relayed note with nothing committed, and §11.1 item 12 lists getting it in
//     writing as an open gap. A slide that printed it would be attributing a written
//     requirement to a committee that has not written one, in front of that committee.
//     If the minutes arrive before Aug 19 this is one string.
//   · FRAMING 3 IS FORBIDDEN. "Sourced to a named external document" is unsupported.
//   · SO THE LINE IS FRAMING 2's SHAPE — "the four domains WE PROPOSED to Sinar Mas
//     Group HR" — and it prints the negation as well as the claim, which is gh#56's
//     `NOT_AUDITED` idiom: never "Group requires", never "sourced to". BOTH BRANDS GET
//     THE SAME LINE. §4.4's slot 4 is the on-prem callback and nothing else; a second
//     brand slot here would be a provenance invented to fill a fork.
//
// §6.2's HARD CONSTRAINT — THIS IS THE THIRD PASS OF THE SHADOW-AI ESCALATION, and it
// may share no image and no statistic with either of the other two (B.2 = condition ·
// D.3 = rational behaviour · here = exposure). What is checked, and how:
//
//   · AGAINST D.3, WHICH IS BUILT AND IS IN THIS FILE. Read the block above and
//     `tests/unit/invest-chicken-egg.test.tsx`, which holds thirteen reserved-token
//     regexes over D.3's copy. NO IMAGE IS SHARED: D.3 draws a two-clause deadlock, a
//     first-person past-tense confession on shared accounts, a ban, an itemised bill and
//     a bordered pilot card; this slide draws a present-tense, second-person map of
//     three destinations and an exposure nobody has paid for yet. Nothing below prints
//     `deadlock`, `no budget without proof`, `shared accounts`, `banned repeatedly`,
//     `WHAT IT COST`, `30-day`, `proof pilot`, `kill criterion` or `spend cap`, and
//     no string BEAT 2 prints is in the first person or the past tense. Beat 2's is
//     the scope, because beat 2 is the shadow-AI pass; `domainsProvenance` below IS
//     first-person past ("we proposed"), on purpose — it is beat 3's provenance
//     line, it names who authored the four domains, and it draws no shadow-AI image.
//   · NO STATISTIC IS SHARED, AND BEAT 2 CARRIES ZERO NUMBERS AT ALL. That is the
//     cheapest way to hold the rule and the only way to make it testable as an
//     ABSENCE rather than as a list of forbidden values: D.3's only quantity is its
//     30-day window, B.2's RENDERED COPY names no quantity — no digit in any of its
//     fifteen strings, asserted in this slide's test since gh#66 rather than read off
//     §6.2's paragraph — and a beat with no digit in it cannot collide with either. The
//     two figures live in BEAT 1, where §6.7 puts them, and they are B.4's numbers
//     rather than a second slide's new ones.
//   · gh#57 DELIBERATELY LEFT `revoke` AND `produce` TO THIS SLIDE, and beat 2 spends
//     both. The one adjacency §6.7 forces is `audit`: D.3's bill has "No audit trail"
//     and this beat has "You cannot audit what was asked". The words touch and the
//     images do not — a closed past-tense bill against an open present-tense exposure —
//     which is exactly what D.3's own block says from the other side.
//   · AGAINST B.2, WHICH IS BUILT NOW — AND THIS BULLET USED TO SAY IT WAS NOT. Until
//     2026-08-08 it read "AGAINST B.2, WHICH IS UNBUILT … so this half of the check runs
//     against §6.2's SPEC TEXT and not against rendered copy", which was true and is the
//     limit gh#57's commit recorded. gh#66 rendered `gap-no-sop` into
//     `src/slides/leader-gap/content.ts` (`gapNoSopContent`, fifteen rendered strings),
//     so this half is now a claim about rendered copy and it is checked in BOTH
//     directions by `tests/unit/invest-security.test.tsx`, which imports that module:
//     none of B.2's image tokens (`handed out`, `login`, `demonstration`,
//     `encouragement`, `silence`, `still gets answered`, `no rule to break`, `the
//     leader's job`, `wrote their own`, `never wrote down`, `which work may`, `the rule
//     nobody wrote`) in this block, none of beat 2's (`shadow AI`, `administers`,
//     `vendor`, `exposure`, `audit`, `revoke`, `produce`, `you cannot`) in B.2's
//     strings, and no three-word phrase shared either way. What was already settled
//     stands: none of `no SOP`, `no guidance` or `improvise` appears below, and beat 3
//     says where the SOP STARTS rather than that there is none — the absence of guidance
//     is B.2's image and this slide does not draw it. B.2 prints no digit at all, which
//     is now asserted against its copy rather than inferred from its spec paragraph, so
//     the no-shared-statistic half holds as an absence on both sides.
//   · THE NAME IS STILL THIS SLIDE'S, AND THAT IS NOW A FACT ABOUT TWO RENDERED BLOCKS
//     RATHER THAN A PLAN. B.2 describes the condition and never prints "shadow AI";
//     beat 2's `exposureLine` is where the deck labels it, at the last step of the
//     escalation. Both halves are asserted in this slide's test.
//
// THE ESCALATION, READ IN DECK ORDER ON 2026-08-08 — all three passes, end to end, in
// the order a room meets them. This is the reading §6.2's constraint actually turns on;
// the token and phrase rules in the two test files are guards against the cheapest way
// to break it, not a substitute for it. What was read and what it showed:
//
//   · B.2 (`gapNoSopContent`) — CONDITION. A login, a demonstration, encouragement in
//     writing, against four questions nobody wrote an answer to, then "Nobody broke a
//     rule. There was no rule to break." Third person, impersonal, no actor blamed, no
//     digit, and the phenomenon is never named. It describes an ABSENCE and stops.
//   · D.3 (this file's second block) — RATIONAL BEHAVIOUR. First person, past tense:
//     the budget deadlock, "So we did it on shared accounts, and we were banned
//     repeatedly", a closed four-line bill, then the pilot that would have avoided it.
//     IT NEVER RESTATES B.2's CONDITION — the reason it gives for the behaviour is the
//     deadlock, not a missing rule — so the second pass adds an ACT rather than
//     repeating the absence that preceded it.
//   · D.4 beat 2 (this block) — EXPOSURE. Second person, present tense: "You cannot
//     audit what was asked", "revoke it when the person leaves", "produce it when an
//     auditor asks", and only here "It is not the vendor. It is shadow AI, and nobody
//     administers it." The third pass adds what cannot be undone, and names it.
//
//   THE ESCALATION IS CARRIED BY GRAMMAR AS WELL AS BY CONTENT, which is the part a
//   token rule cannot see: impersonal → first-person past → second-person present.
//   Absence, then act, then consequence you cannot reverse. Read in that order none of
//   the three is redundant, and read in any other order the last one arrives as an
//   accusation.
//
//   THE CLOSEST THING TO AN OVERLAP, recorded rather than hidden: `nobody` occurs in
//   both B.2 ("Nobody wrote the rule") and beat 2 ("nobody administers it"). Different
//   referent, different clause, and it is a pronoun — forbidding it would be a rule
//   about English, not about images. The measured word overlap between the two blocks is
//   `nobody`, `what`, `asked`, `when`, `leaves` and nothing else of four letters or
//   more; between B.2 and D.3 it is `what`, `work`, `have`, `case`. No image word is in
//   either list.
//
// THE KEYWORD RULE, this slide's own two lists. `kw` goes on PROSE ONLY, as everywhere
// in this file.
//
//   · PROSE, each with a `*Kw` sibling — FIVE strings: `headline`, `verdict`,
//     `exposureLine`, `retrofitLine`, and the brand callback's `line` (both arms).
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — `figLabel`, the three
//     destination `label`s and their three `contract` lines, both `figure`s and both
//     `metric`s, `priceSource`, `exposureEyebrow`, `sopEyebrow`, the three exposure
//     `label`s, the four domain `name`s, `domainsProvenance`, and the callback's
//     `source`. The sharpest cases are the four domains and the three contracts: a
//     domain is a HEADING an SOP is written under, and a copper italic inside
//     "GOVERNANCE" would emphasise a fragment of a heading; the contracts sit in the
//     same 15px sans register as the exposure rows, where a serif copper italic reads
//     as a rendering fault rather than as emphasis.
//
// NO LETTER AND NO NUMBER IN ANY RENDERED STRING, as everywhere under this directory
// (§3.4 R2 / §3.5). This slide composes **D.4** today, which is §6.7's own number for
// it: it printed D.3 from #58 until gh#70 built `invest-base-rates` (§6.7's D.1) at the
// head of the run, and stepped one number that day with no edit to any string. Do not
// pin the figure.

/**
 * Exactly three, held by the TYPE — the sibling of {@link Four} and there for the same
 * reason: the error lands on the fourth entry, at the definition site, with no cast.
 *
 * THREE IS THE ARGUMENT, NOT A LENGTH. §6.7, §12.2 and the research record all frame
 * beat 1 as three destinations, and `./security-geometry.ts` gives the stage a
 * THREE-COLUMN grid whose columns ARE those destinations. A fourth destination has
 * nowhere on the stage to go, which is a fact the geometry can only pin if the count is
 * a literal type here.
 */
type Three<T> = readonly [T, T, T];

/** Exactly two. Beat 1 quotes B.4's write-and-reason and tool-calling gaps and no
 *  others — B.4's coding and multimodal panels are that slide's argument, not this
 *  one's — and `./security-geometry.ts` gives the price band two of the grid's three
 *  columns. A third figure would have to take the column the brand callback is in. */
type Two<T> = readonly [T, T];

/**
 * One of beat 1's three destinations: the category, and what its contract says.
 *
 * A CATEGORY AND NEVER A PRODUCT. `label` names a kind of account, not a plan and not a
 * vendor's SKU, which is what §12.2's category branch means in practice (see the block
 * header). `contract` is one sentence lifted from the research record's cross-vendor
 * patterns, true of the category at all three vendors the deck names on 2026-08-04, and
 * it is the cell that carries the diagonal the headline states.
 */
export interface DataDestination {
  id: string;
  /** Mono LABEL register, stored SHOUTED. Never quoted in prose anywhere — the spec
   *  writes these three in running text but no string on this stage or in any test
   *  quotes the label itself — so the register's `textTransform` is a no-op on it and
   *  the data reads as the stage does. Same call as `deadlockClauses` above. */
  label: string;
  /** The 15px sans LABEL register, keyword-free. One line, and it may not grow to two:
   *  `./security-geometry.ts` cuts the box for one and the shelf under it is the
   *  price band. */
  contract: string;
}

/**
 * One of beat 1's two numbers: the gap, and what it is a gap in.
 *
 * BOTH ARE B.4's, RE-QUOTED RATHER THAN RE-DERIVED. §6.7 says this is where B.4's
 * message lands with its own numbers, so the two figures below are the strings that
 * slide already prints for the same two metrics at the same licence tier from the same
 * capture. Nothing here computes a gap: a slide that subtracted two scores would be a
 * second derivation of a number the deck already publishes, and the two would drift.
 */
export interface PriceFigure {
  id: string;
  /** The gap, mono and keyword-free. `4 pts` carries no decimal place because v4.1
   *  publishes the Intelligence Index as an integer (research §9.5) — `4.0` would be
   *  invented precision. */
  figure: string;
  /** What the gap is in. A LABEL: it names a measurement, and a copper italic inside
   *  one would emphasise a fragment of a name. */
  metric: string;
}

/**
 * One of beat 3's four governance domains.
 *
 * STORED TITLE CASE AND SHOUTED BY THE REGISTER, unlike `deadlockClauses` and unlike
 * {@link DataDestination.label}. These four ARE quoted in prose — §6.7 writes
 * "Culture, Risk, Governance, Ethics", the issue's AC quotes the same four, and the
 * research record's §10 traces that exact spelling — so the data keeps the spelling
 * every source uses and the CSS does the shouting. Same decision as `hubLabel` in
 * `src/slides/leader-shape/content.ts`.
 */
export interface GovernanceDomain {
  id: string;
  /** A HEADING an SOP is written under. Keyword-free. */
  name: string;
}

/**
 * §4.4 slot 4 — what the organisation in the room already runs on its own hardware, or
 * the stated fact that it runs none.
 *
 * A UNION, FOR `OwnProofBlock`'s REASON. "A source line attributing nothing" and "a
 * sourced claim with no source" are both unrepresentable, and the arm that makes a
 * claim is the only arm that has a `source` field to fill. The rejected model was one
 * interface with `source?: string`: it type-checks with the callback's provenance
 * missing, and the failure it permits is the one §12.3 item 2 exists to prevent — a
 * vendor-published claim about a customer's architecture printed as if the deck had
 * checked it.
 *
 * THE ABSENCE IS COPY, NOT AN EMPTY SLOT. #16's finding 4 and `leader-gap`'s
 * "MineTech has nothing comparable to place on this ladder" both say the same thing:
 * a brand with nothing to show gets a sentence saying so, because a blank band under a
 * heading reads on a projector as a slide that failed to load. So `runs-none` carries
 * real prose in the slot `runs-it` fills, and the renderer has no empty case.
 */
export type OnPremCallback =
  | {
      readonly kind: "runs-it";
      /** Prose — the one sentence on this stage about the organisation in the room. */
      readonly line: string;
      readonly lineKw: readonly string[];
      /** How the claim is known, in the same closed union `invest-own-proof` uses. The
       *  source line below is composed from THIS value, so the chip's word and the
       *  citation's word cannot disagree. */
      readonly mark: EpistemicMark;
      /**
       * The citation, printed ON the stage rather than in a footnote (§12.3 item 2 —
       * "cite attributed"). Mono, keyword-free: it is a citation, not a sentence the
       * slide makes a point with, and it ends in {@link NOT_AUDITED} for the reason
       * that constant exists.
       */
      readonly source: string;
    }
  | {
      readonly kind: "runs-none";
      /** Prose, and the whole of the slot. There is nothing to attribute, so there is
       *  no `source` field to leave empty. */
      readonly line: string;
      readonly lineKw: readonly string[];
    };

/**
 * BEAT 1 — the three destinations, in the order §6.7 and §12.2 both give them.
 *
 * THE ORDER IS AN ESCALATION OF WHO IS ACCOUNTABLE, which is why it is not re-sorted:
 * nobody (a personal account has no administrator) → the company, by contract → you,
 * because it is your hardware. Read across the row, the three `contract` cells are the
 * diagonal the headline states: the screen does not change and the contract does.
 *
 * EVERY CELL IS A CATEGORY CLAIM AND NONE OF THEM IS A VENDOR'S POLICY. See the block
 * header for the branch and the sourcing; in one line, each `contract` is true of the
 * category at all three vendors the deck names, per the research record's §6, so no
 * single vendor changing its terms before Aug 19 falsifies a word of it.
 */
const DESTINATIONS: Three<DataDestination> = [
  {
    id: "personal",
    label: "PERSONAL CONSUMER ACCOUNT",
    // §6 pattern 1 / F1. "commonly" is the record's own hedge and is load-bearing: it
    // is the difference between a category claim and an assertion about three named
    // vendors' current defaults.
    contract: "Your conversations commonly train the model.",
  },
  {
    id: "company-managed",
    label: "COMPANY-MANAGED WORKSPACE",
    // §6 pattern 1 (commercial terms bar training) plus pattern 2 read the other way.
    // The admin half is here rather than in beat 2 because it is the CONTRAST beat 2
    // pays off — the exposure is that the personal account has no administrator, and a
    // room that has not been told an administrator exists anywhere hears that as a
    // complaint about software.
    contract: "Training is barred, and an admin exists.",
  },
  {
    id: "self-hosted",
    // The one label with a slash. §6.7, §12.2 and the record all name this destination
    // twice over — "self-hosted / on-prem" — because the two words are not synonyms to
    // an infrastructure lead, and dropping either one loses half the audience.
    label: "SELF-HOSTED / ON-PREM",
    // §6 pattern 8 / F8, compressed: none of the frontier vendors will sell you its best
    // model to run in your own data centre. The two figures below are what that costs.
    contract: "Your own hardware — and not the frontier.",
  },
];

/**
 * BEAT 1's PRICE — B.4's two gaps, at B.4's licence tier, from B.4's capture.
 *
 * NOT §6.7's `6.7` AND `9.2`. Both of those come from the superseded Index v4.0 and
 * `9.2` is a collision trap; the block header carries the full argument and the spec
 * was corrected by this ticket. The pair below is the one shipping B.4 uses.
 *
 * TWO, AND THE TUPLE HOLDS IT. §6.7 names two metrics; B.4's other two panels are that
 * slide's argument and repeating them here would make beat 1 a benchmark slide.
 */
const PRICE_FIGURES: Two<PriceFigure> = [
  {
    id: "write-and-reason",
    figure: "4 pts",
    metric: "off the lead on write-and-reason",
  },
  {
    id: "tool-calling",
    figure: "5.2 pts",
    metric: "back on tool-calling",
  },
];

/**
 * BEAT 2's THREE — the exposure, as the three things nobody can do about it.
 *
 * SECOND PERSON, PRESENT TENSE, AND NOT ONE DIGIT BETWEEN THEM. All three are §6.2's
 * requirement working out in the copy: D.3's bill is what our workaround cost US and is
 * closed; this is what YOU cannot do TODAY and is open. The absence of numbers is what
 * makes "no shared statistic" testable as an absence rather than as a list.
 *
 * §6.7's ORDER — audit, revoke, produce — and it is not re-sorted. It escalates by who
 * is asking: you, on your own initiative → HR, on the day someone leaves → an outside
 * party who is entitled to an answer. The record's F4 is the same three in one
 * sentence; three rows is what makes each one separately unmissable.
 */
const EXPOSURES: Three<LineItem> = [
  { id: "cannot-audit", label: "You cannot audit what was asked" },
  { id: "cannot-revoke", label: "You cannot revoke it when the person leaves" },
  { id: "cannot-produce", label: "You cannot produce it when an auditor asks" },
];

/**
 * BEAT 3's FOUR — the governance domains an SOP starts from, in §6.7's order.
 *
 * ALL FOUR RENDER, ALWAYS. The issue's AC is "renders all four", and the four are a set
 * rather than a ranking: an SOP that covered three of them would be an SOP with a hole,
 * and a stage that showed three would be making a claim about which one matters least.
 * The tuple is what refuses a fifth, and `./security-geometry.ts` pins its own count to
 * this one.
 */
const DOMAINS: Four<GovernanceDomain> = [
  { id: "culture", name: "Culture" },
  { id: "risk", name: "Risk" },
  { id: "governance", name: "Governance" },
  { id: "ethics", name: "Ethics" },
];

export const investSecurityContent = {
  figLabel: "WHERE THE DATA GOES, AND WHAT ANSWERS IT",

  /**
   * The premise, and it IS beat 1's diagonal rather than an introduction to it.
   *
   * The research record's §1 names the one thing a Div Head is most likely to get
   * wrong — the tier changes the CONTRACT, not the INTERFACE — and §6 pattern 1 states
   * it as "same brand, same screen, opposite default". Putting that in the headline
   * rather than in a fourth box under the table buys the stage a whole band and makes
   * the three columns under it EVIDENCE for a claim the room has already read, instead
   * of three facts it has to assemble.
   *
   * TWO SENTENCES AND NOT ONE CLAUSE. "The screen is the same, but the contract is not"
   * is one concession; two full stops make it two statements, and the second one is the
   * only one the slide is about — which is where the keyword goes.
   */
  headline: "The screen is the same. The contract is not.",
  headlineKw: ["The contract is not"],

  destinations: DESTINATIONS,
  priceFigures: PRICE_FIGURES,

  /**
   * The two figures' provenance, on the stage and not in a footnote.
   *
   * IT HAS TO CARRY FOUR THINGS, and it is the only string on the slide that can: WHAT
   * is being compared (the best open weights, against the frontier), WHO published it,
   * WHEN it was captured, and WHICH LICENCE TIER. The tier is the half a reader would
   * never guess and the half research §9.4 is emphatic about — "pick one tier; do not
   * mix" — and this is the same tier, from the same capture, that B.4 disclosed to the
   * same room earlier in the day.
   *
   * MONO, LOWER CASE, KEYWORD-FREE. A sentence-length citation set in uppercase mono is
   * something nobody in the back row reads; `invest-own-proof`'s attribution drops the
   * transform for the same reason and this line follows it.
   *
   * IT NAMES ONE CAPTURE AND MAKES NO COMPARISON TO AN EARLIER ONE. Research §9.5
   * records that the Agentic index's scale changed in v4.1 (old max 77.8 → 55.3), so a
   * smaller agentic gap than last quarter's is a scale change and not models getting
   * worse. A line that quoted two dates would invite exactly that reading.
   */
  priceSource:
    "Best open weights against the frontier — Artificial Analysis, 2 August 2026, " +
    "commercial use restricted.",

  /**
   * BEAT 1's CONCLUSION, stated rather than implied — the issue's AC says so.
   *
   * THE TWO HALVES ARE ONE TRADE AND BOTH ARE MARKED. "Right for the sensitive
   * workloads" alone is a recommendation to self-host and would send a division head
   * off to price GPUs for everything; "wrong for everything else" alone is a
   * recommendation not to. The pair is the decision, so the two keywords are the two
   * halves of it — the same distribution of emphasis `workaround` above uses, and for
   * the same reason.
   *
   * "Self-hosting" IS NAMED, and the subject is not left to the figures above. This is
   * the sentence a Div Head repeats to an infrastructure lead, and a verdict whose
   * subject has to be inferred from the box above it is a verdict that arrives without
   * its subject.
   */
  verdict: "Self-hosting is right for the sensitive workloads, and wrong for everything else.",
  verdictKw: ["the sensitive workloads", "everything else"],

  /**
   * BEAT 2's label. Mono, keyword-free.
   *
   * "TODAY" IS THE WORD THAT MAKES IT BEAT 2. Everything above this line is about a
   * choice the room has not made yet; this is about the position it is already in,
   * before any contract is signed and whatever beat 1 concludes. And "YOUR" is what
   * turns the slide around: beats 1 and 3 are advice, and this one is a description of
   * the room.
   */
  exposureEyebrow: "YOUR REAL EXPOSURE TODAY",

  /**
   * BEAT 2 — the whole thesis in one sentence.
   *
   * IT NAMES WHAT THE EXPOSURE IS NOT, FIRST. §6.7's beat is "your real exposure today
   * is shadow AI, NOT the vendor", and the order matters on a slide whose first beat
   * was three vendor contracts: a room that has just read about training defaults and
   * retention will hear beat 3 as a procurement problem unless this sentence takes that
   * frame away before it offers another. Which is also why no vendor is named anywhere
   * on this stage — see the block header.
   *
   * "nobody administers it" IS THE RECORD'S F4, COMPRESSED. "A personal account has no
   * administrator. Nobody in the company can list what was asked, export it for an
   * audit, or revoke it when the person leaves." The first sentence is this line; the
   * three that follow are the three rows under it.
   */
  exposureLine: "It is not the vendor. It is shadow AI, and nobody administers it.",
  exposureLineKw: ["not the vendor", "nobody administers it"],

  exposures: EXPOSURES,

  /**
   * BEAT 3's label. Mono, keyword-free.
   *
   * "WHERE THE SOP STARTS" AND NOT "THERE IS NO SOP". The absence of guidance is B.2's
   * image (§6.2) and this slide may not draw it; what this beat owns is the STARTING
   * POINT. The phrasing also keeps the four domains honest — they are where an SOP
   * begins, not the SOP.
   */
  sopEyebrow: "WHERE THE SOP STARTS",

  domains: DOMAINS,

  /**
   * BEAT 3's failure mode, named verbatim because the issue's AC names it verbatim.
   *
   * "governance retrofit" IS THE KEYWORD, which is the only place the emphasis can
   * honestly go: "Start here now" is the ask and the retrofit is the cost of not, and a
   * room remembers the cost. A retrofit is what governance becomes when it is written
   * after the incident that needed it — the same work, done under a deadline set by
   * somebody else — and naming it is what makes the four chips above an offer rather
   * than a checklist.
   *
   * "Start here" POINTS AT THE FOUR CHIPS DIRECTLY ABOVE IT, which is why the sentence
   * is short: the four domains have already been read, and re-listing them in prose
   * would spend a line saying what the stage says.
   */
  retrofitLine: "Start here now. The alternative is a governance retrofit.",
  retrofitLineKw: ["a governance retrofit"],

  /**
   * BEAT 3's provenance — framing 2 of the research record's §10.2, for both brands.
   *
   * IT PRINTS THE NEGATION AS WELL AS THE CLAIM, which is the whole point and is
   * `NOT_AUDITED`'s idiom applied to a different kind of overclaim. §10 established that
   * the four domains are AUTHORED and not sourced: they enter the corpus as the
   * presenter's own question, and the only committed artifact that renders all four is
   * our own April 2026 deck. §10.2 permits "we proposed" and forbids "Group requires",
   * so the line says both — what we did, and what it is not. A slide that merely omitted
   * the requirement claim would still be read as making it, because a Sinar Mas Group HR
   * date beside four governance domains reads as a mandate unless something says
   * otherwise.
   *
   * NO BRAND FORK. Both leader decks print this line unchanged: it is a fact about who
   * wrote the four domains, and that is the same fact in both rooms. §4.4 gives this
   * slide exactly one brand slot and it is the on-prem callback below.
   *
   * MONO, LOWER CASE, KEYWORD-FREE — the same register and the same reasoning as
   * {@link investSecurityContent.priceSource}.
   */
  domainsProvenance:
    "The four domains we proposed to Sinar Mas Group HR, April 2026 — not a Group requirement.",
} as const;

// ───────────────────── the brand axis (§4.4 slot 4) ─────────────────────

/**
 * How GEMS' on-prem claim is known, as a value — so the chip's word and the citation's
 * word are one string.
 *
 * The same closed union `invest-own-proof` uses, and deliberately not a second one:
 * both slides in this section are printing a Google Cloud customer story's claim about
 * GEMS, and two spellings of "vendor-reported" in one section would be two epistemic
 * vocabularies in one room.
 */
const GEMS_ON_PREM_MARK: EpistemicMark = "vendor-reported";

/**
 * GEMS — DigiTech already runs the third destination (§6.7, §4.4 slot 4).
 *
 * THIS IS THE ONE CLAIM ON THE SLIDE THAT IS ABOUT A NAMED ORGANISATION, and it is
 * about the one in the room. Google Cloud's published GEMVIS customer story describes
 * GEMVIS as hybrid infrastructure — sensitive mining data processed on private
 * on-premises GPU servers for RAG, with higher-level reasoning called out to a managed
 * platform (`docs/researches/2026-07-31-gems-digitech-ai-landscape.md`, which traces
 * that to the customer story three times over). So beat 1's third destination is not a
 * hypothetical for this room: it is already running, and the verdict above it is a
 * description of a decision GEMS has already taken.
 *
 * VENDOR-REPORTED, AND SAID SO. A vendor writing about its own customer is an
 * interested party — §12.3 item 2's whole point — so the mark and the citation travel
 * with the claim, exactly as `invest-own-proof`'s four GEMVIS figures do. The two
 * slides cite the same source in the same words on purpose.
 */
const GEMS_ON_PREM: OnPremCallback = {
  kind: "runs-it",
  // "already" is the word that makes this a callback rather than a case study: the room
  // is not being shown what someone else did, it is being shown what it did.
  line: "DigiTech already runs private on-prem GPU servers for sensitive-data RAG.",
  lineKw: ["private on-prem GPU servers"],
  mark: GEMS_ON_PREM_MARK,
  source:
    `Source: Google Cloud's published GEMVIS customer story — ${GEMS_ON_PREM_MARK}, ` +
    `${NOT_AUDITED}.`,
};

/**
 * Berau — MineTech runs none of it, STATED (§6.7, §4.4 slot 4).
 *
 * #16's FINDING 4 IS WHY THIS IS COPY AND NOT A BLANK. The same rule
 * `src/slides/leader-gap/content.ts` follows for the Capability Ladder's missing
 * marker: a brand with nothing in the slot gets a sentence saying so, because an empty
 * band under a heading reads on a projector as a slide that did not finish loading, and
 * because the absence is itself the finding a division head needs. The second sentence
 * is what keeps it from sounding like an accusation — there is nothing to point at, so
 * the decision beat 1 just described is still open here.
 *
 * NO SOURCE FIELD, AND THE TYPE IS WHY. Nobody published this absence; it is what the
 * deck knows about the room. The `runs-none` arm has no `source` to fill, so a later
 * edit cannot attribute it to a document that does not exist.
 */
const BERAU_ON_PREM: OnPremCallback = {
  kind: "runs-none",
  line: "MineTech runs none of this today. There is no on-prem server to point at.",
  lineKw: ["none of this today"],
};

/**
 * `general` — UNREACHABLE TODAY, and kept to the shortest honest thing.
 *
 * No `general-leader` variant is registered, so no composed deck asks for this block;
 * it exists for the reason `GENERAL_BLOCK` above exists, and it is deliberately the
 * thinnest of the three. It names no organisation and claims no hardware, which is the
 * one failure that would matter here: a slot that fell through to another company's
 * on-prem estate on the slide about where sensitive data goes.
 */
const GENERAL_ON_PREM: OnPremCallback = {
  kind: "runs-none",
  line: "This deck names no organisation, so it has no hardware of its own to name.",
  lineKw: ["no hardware of its own"],
};

/**
 * §4.4 slot 4, brand by brand.
 *
 * A `Record` keyed by `Brand` for `OWN_PROOF_BY_BRAND`'s reason: a fourth brand must
 * FAIL TO COMPILE here rather than silently show one organisation another's
 * infrastructure. On this slide that is the sharpest version of the argument in the
 * deck — the slide is about where sensitive data goes, and the failure would be
 * telling a room it runs private GPU servers it does not have.
 */
const ON_PREM_BY_BRAND: Record<Brand, OnPremCallback> = {
  berau: BERAU_ON_PREM,
  gems: GEMS_ON_PREM,
  general: GENERAL_ON_PREM,
};

/**
 * This slide's on-prem callback for one brand. Pass `VARIANT.brand`.
 *
 * THE ONLY WAY IN, exactly as `ownProofFor` is: the table above is not exported, so a
 * rule over "every brand" is proved over `BRANDS` and not over this file's own key set.
 */
export function onPremCallbackFor(brand: Brand): OnPremCallback {
  return ON_PREM_BY_BRAND[brand];
}

// ───────────────────── §6.7's D.5 · individual seats become a managed line item ─────────────────────
//
// THREE BEATS, AND THE THIRD ONE IS ARITHMETIC THE ROOM RUNS ITSELF. Today's individual
// subscriptions, as four gaps (no admin, no visibility, nothing revoked on exit, no
// volume leverage) → company-managed seats, as four capabilities (admin control, SSO,
// central billing, usage analytics — and the analytics are what make the November
// post-assessment mean anything) → the arithmetic as a FORMULA with named inputs,
// tiered so it does not read as "buy everyone a seat". §6.7's beat order is kept in
// the reveal order and in the reading order, and NO SINGLE TOTAL IS EVER PRINTED:
// a formula with the room's own numbers in it invites no argument about the inputs,
// and a hardcoded total is exactly that argument (#59's AC).
//
// §12.2's GATE, AND THE BRANCH THAT SHIPPED: **the RECORD branch — the opposite call
// from D.4's, made for the opposite reason.** D.4 shipped the CATEGORY branch because
// its beat 2 argues "your exposure is shadow AI, not the vendor", and naming vendors
// would fight its own frame. This slide's beat 3 is a price the room is being asked
// to compute, and a price with no vendor and no plan attached is not a price — so
// every figure below traces to the #52 verification record
// (`docs/researches/2026-08-04-vendor-pricing-and-data-handling.md`), and every one
// carries CURRENCY, BILLING PERIOD and the DATE IT WAS READ (2026-08-04), in the same
// string as the number. Which figure came from where:
//
//   · the three seat tiers — record §8.3's table, rows Claude Team Standard
//     ($20/seat/mo annual, $25 monthly), Claude Team Premium ($100/seat/mo annual,
//     $125 monthly) and Claude Enterprise ($20/seat/mo, annual only, all usage billed
//     at API rates on top). USD-confirmed: `claude.com/pricing` renders USD from this
//     geolocation (record §0.1), so none of these is caught by the IDR caveat.
//   · the lever line — §8.3's own framing point 2: annual-vs-monthly is 20–25%
//     cheaper at every vendor and needs no negotiation. The two monthly figures it
//     quotes are the same §8.3 rows' monthly columns.
//   · the Berau anchor — record §8.1, with all of its corrections honoured below.
//   · the GEMS non-anchor — record §8.2, quoted as an absence and not replaced.
//
// WHY THE SUBSET IS CLAUDE'S THREE TIERS AND NOTHING ELSE. §8.3 offers nine rows and
// this slide prints three, deliberately: the Berau anchor IS a Claude subscription
// (§8.1), the closest thing GEMS has to a stated direction is "for claude better use
// team plan" (§8.2 — a direction, not a price, and not printed), and three tiers of
// ONE vendor's plans are what demonstrates TIERING, which is the argument. What is
// deliberately NOT printed, and why:
//
//   · ChatGPT Go and every Google AI consumer plan — record §0.1: their USD prices
//     are UNVERIFIED from this geolocation and no USD figure may be asserted.
//   · Gemini Enterprise app rows — their billing period is UNVERIFIED (§8.3), and a
//     price on this slide without its period fails the gate this block ships under.
//   · ChatGPT Business and the Workspace rows — verified and usable, and omitted
//     only because a cross-vendor comparison is a different slide's argument. If a
//     session needs one, §8.3 has the sourced rows ready.
//
// "MEASURE VALUE, NOT ACTIVITY" IS THE CLOSER, AND §8.3 GIVES IT A HARD EDGE: the
// Claude Enterprise seat fee buys ACCESS and no usage at all — every token is billed
// on top at API rates — so seat count and spend are genuinely different quantities,
// and a seat count is not adoption. The closer says all of that in one sentence
// rather than implying it, because the AC requires the sentence on the slide.
//
// THE BRAND AXIS IS §4.4 SLOT 7 AND IT IS THE ANCHOR BLOCK ALONE. Berau has a real,
// organizer-published local anchor; GEMS has none, STATED rather than papered over.
// Three corrections from record §8.1 that the Berau arm must never lose:
//
//   1. IT IS A VOL-2 PRIZE, not Vol-1 — page 2 of the plan deck gives Vol-1 no
//      subscription and no $204.
//   2. $204 IS NOT CLAUDE PRO'S PRICE. It is the organizer's stated prize value, a
//      $17 × 12 monthly-equivalent derivation; the vendor's actual published annual
//      charge is $200 (read live 2026-08-04). The arm attributes the figure to the
//      organizer and prints the vendor's own number beside it, so nobody in the room
//      can catch the slide asserting a price the vendor does not publish.
//   3. NO COMPETITION-WINDOW DATES. The plan deck says Jun–Jul where the spec says
//      Sep–Oct (§8.1 correction 3), and the conflict is unresolved — so no date from
//      either source prints. "Vol-2" is a volume, not a date.
//
// THE NOVEMBER TIE HAS NO BRAND FORK, and that is #59's own call: the issue's AC ties
// beat 2's analytics to "the November post-assessment" for the slide, not per brand.
// It is GEMS' W1-Nov gate by origin (§6.8), and for a Berau room it is the same
// argument — the analytics are what a post-assessment measures adoption against.
//
// ADJACENCY WITH D.4, STATED RATHER THAN HIDDEN. This slide is NOT one of §6.2's
// three shadow-AI passes, so no reserved-token rule binds it — but beat 1's third gap
// ("Nothing revoked on exit") touches the vocabulary of D.4's second exposure ("You
// cannot revoke it when the person leaves"), and §6.7 mandates both. The words touch
// and the images do not: D.4's is an EXPOSURE nobody administers, this slide's is a
// PROCUREMENT GAP a managed seat closes — and beat 2's SSO row is the closing of it.
// No statistic is shared with any slide in this file: every number in this block is a
// price, and no other block prints one.
//
// THE KEYWORD RULE, this slide's own two lists. `kw` goes on PROSE ONLY, as
// everywhere in this file.
//
//   · PROSE, each with a `*Kw` sibling — THREE shared strings: `headline`,
//     `analyticsLine`, `closer` — plus the anchor's `line` (every arm).
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — `figLabel`, the
//     three eyebrows, the four gaps, the four capabilities, `formulaEyebrow`,
//     `formula` (arithmetic, not a sentence), the three tier labels and their three
//     price strings, `leverLine`, and both anchor `source` lines. The sharpest cases
//     are the price strings: a copper italic inside "USD 20 /seat/mo" would
//     emphasise a fragment of a quantity, and the price IS the quotation — the whole
//     string is already in the quoted register.
//
// NO LETTER AND NO NUMBER IN ANY RENDERED STRING, as everywhere under this directory
// (§3.4 R2 / §3.5). This slide composes **D.5** today, which is §6.7's own number for
// it: it printed D.4 from #59 until gh#70 built `invest-base-rates` (§6.7's D.1) at the
// head of the run, and stepped one number that day with no edit to any string. Do not
// pin the figure.

/**
 * One row of beat 3's tier table: who the tier is for, and what its seat costs.
 *
 * THE PRICE IS ONE STRING AND THE GATE IS WHY. §12.2 requires currency, billing
 * period and date-read ON every price; splitting them into fields would let a
 * renderer print the number and trim the date for space, which is exactly the
 * stale-price failure the gate exists to prevent. One string renders whole or not at all,
 * and a test can hold "every price carries its date" as a regex over these three
 * values without knowing the layout.
 */
export interface SeatTier {
  id: string;
  /** Who this tier is for — the TIERING, which is what keeps the formula from
   *  reading as "buy everyone a seat". A LABEL, sentence case, keyword-free. */
  tier: string;
  /** The quoted list price: currency, amount, billing period, date read — verbatim
   *  from record §8.3, read 2026-08-04. Mono, keyword-free. */
  price: string;
}

/**
 * §4.4 slot 7 — the local price anchor: Berau's organizer-published prize value,
 * GEMS' stated absence of one, or the fact that this deck names no organisation.
 *
 * A UNION, for `OwnProofBlock`'s and `OnPremCallback`'s reason: the three arms make
 * three different KINDS of claim, and the type is what stops an edit from moving a
 * figure between them. `organizer-prize` is the only arm allowed to carry a number;
 * `list-price-only` asserts an absence and cites the search that established it —
 * record §8.2's whole finding is that NO official GEMS figure exists, and a `figure`
 * field on that arm would be the slot an invented one arrives through.
 */
export type PriceAnchor =
  | {
      readonly kind: "organizer-prize";
      /** Mono eyebrow over the anchor column. Keyword-free. */
      readonly eyebrow: string;
      /** Prose — the anchor itself, with its currency and period in the sentence. */
      readonly line: string;
      readonly lineKw: readonly string[];
      /**
       * The attribution, printed ON the stage (the §12.2 idiom this section always
       * uses). It must attribute the figure to the ORGANIZER, deny that it is the
       * vendor's price, and print the vendor's actual published charge with its own
       * date — record §8.1's correction 2, all three halves. Mono, keyword-free.
       */
      readonly source: string;
    }
  | {
      readonly kind: "list-price-only";
      readonly eyebrow: string;
      /** Prose — the stated absence, dated, pointing at the list prices as the only
       *  anchor. Never a number: §8.2 forbids repurposing any adjacent figure. */
      readonly line: string;
      readonly lineKw: readonly string[];
      /** What was searched and when, so the absence is a finding and not a shrug.
       *  Mono, keyword-free. */
      readonly source: string;
    }
  | {
      readonly kind: "no-organisation";
      /** Real copy in the slot the anchor would have used. Prose. */
      readonly line: string;
      readonly lineKw: readonly string[];
    };

/**
 * BEAT 1 — what an individual subscription cannot give the company, in §6.7's order.
 *
 * FOUR, AND THE `Four` TUPLE HOLDS IT: §6.7 and the AC name exactly these four, and
 * a fifth gap is a different argument. TERSE ON PURPOSE — four short absences down a
 * column read as a deficit ledger, which is the beat; padding them into sentences
 * would make beat 1 louder than the managed column it exists to be answered by.
 */
const SEAT_GAPS: Four<LineItem> = [
  { id: "no-admin", label: "No admin" },
  { id: "no-visibility", label: "No visibility" },
  { id: "nothing-revoked", label: "Nothing revoked on exit" },
  { id: "no-volume-leverage", label: "No volume leverage" },
];

/**
 * BEAT 2 — what company-managed seats add, in §6.7's order.
 *
 * THE FOURTH ROW IS THE ONE THE SLIDE IS ABOUT: usage analytics are what
 * {@link investSubscriptionContent.analyticsLine} ties to the November
 * post-assessment, and the reveal order puts that sentence LAST so the beat ends on
 * the payoff rather than on a feature list.
 */
const SEAT_CAPABILITIES: Four<LineItem> = [
  { id: "admin-control", label: "Admin control" },
  { id: "sso", label: "SSO" },
  { id: "central-billing", label: "Central billing" },
  { id: "usage-analytics", label: "Usage analytics" },
];

/**
 * BEAT 3's TIER TABLE — record §8.3's three Claude rows, priced verbatim.
 *
 * THREE, AND THE `Three` TUPLE HOLDS IT — the same three-and-only-three the geometry
 * cuts row shelves for. EVERY PRICE STRING CARRIES ITS OWN CURRENCY, PERIOD AND
 * DATE-READ, per the block header; the tier labels carry the tiering, which is the
 * half that answers "so we buy everyone a seat?" — most of a division rides the
 * cheap tier, a few heavy builders ride the expensive one, and past 150 seats the
 * plan changes shape.
 */
const SEAT_TIERS: Three<SeatTier> = [
  {
    id: "team-standard",
    tier: "Most of the division — Claude Team Standard",
    price: "USD 20 /seat/mo · billed annually · read 2026-08-04",
  },
  {
    id: "team-premium",
    tier: "A few heavy builders — Claude Team Premium",
    price: "USD 100 /seat/mo · billed annually · read 2026-08-04",
  },
  {
    id: "enterprise",
    tier: "Above 150 seats — Claude Enterprise",
    price: "USD 20 /seat/mo · annual only, usage on top · read 2026-08-04",
  },
];

export const investSubscriptionContent = {
  figLabel: "FROM INDIVIDUAL SEATS TO A LINE ITEM",

  /**
   * The premise, in §6.7's own words — the slide's title phrase is the claim.
   *
   * "become" IS THE VERB DOING THE WORK: beat 1 is what the seats are today, beat 2
   * is what "managed" adds, and beat 3 is what "line item" means — a number a Div
   * Head computes and defends, not one this deck hands them. The keyword is on the
   * destination because the destination is what the room is being asked to buy.
   */
  headline: "Individual subscriptions become a managed line item.",
  headlineKw: ["a managed line item"],

  /** BEAT 1's label. Mono, keyword-free. "TODAY" does the same work it does on
   *  D.4's exposure eyebrow: this column is the position the room is already in. */
  gapsEyebrow: "TODAY — INDIVIDUAL SUBSCRIPTIONS",
  gaps: SEAT_GAPS,

  /** BEAT 2's label. Mono, keyword-free. */
  seatsEyebrow: "COMPANY-MANAGED SEATS",
  capabilities: SEAT_CAPABILITIES,

  /** The third column's label over the November tie. Mono, keyword-free. */
  analyticsEyebrow: "WHAT THE ANALYTICS BUY",

  /**
   * BEAT 2's payoff — the sentence the AC requires: analytics tied to the November
   * post-assessment. Without this line, "usage analytics" is a feature; with it,
   * the managed seat is the instrument the mandate's own measurement runs on.
   * The keyword is on the assessment because that is the date the room already has.
   */
  analyticsLine:
    "Usage analytics are what make the November post-assessment mean anything.",
  analyticsLineKw: ["November post-assessment"],

  /** BEAT 3's label — and the "RUN IT" is the AC's "runnable, not answered" said as
   *  an instruction. Mono, keyword-free. */
  formulaEyebrow: "THE ARITHMETIC — RUN IT FOR YOUR OWN DIVISION",

  /**
   * THE FORMULA, with its three named inputs: the room's own seat count, the tier
   * table's price, and the twelve months that make it an annual line item.
   *
   * ARITHMETIC, NOT A SENTENCE — mono, keyword-free, and it computes NOTHING: no
   * string in this block holds a product of these inputs, which is how "no single
   * total is presented as the audience's answer" is held as an absence a test can
   * grep for rather than a claim about intent. "tier by tier" is in the formula
   * itself so the tiering is an input and not a footnote.
   */
  formula: "your seats × price / seat / month × 12, tier by tier",

  tiers: SEAT_TIERS,

  /**
   * THE CHEAPEST LEVER ON THE SLIDE — record §8.3's framing point 2, with the two
   * monthly figures that demonstrate it. Both carry their period ("billed monthly")
   * and the shared date-read in the same string, per the gate. A LABEL-register
   * sentence like D.4's contract lines, keyword-free.
   */
  leverLine:
    "Billed monthly the same seats are USD 25 and USD 125 (read 2026-08-04) — " +
    "annual billing is 20–25% cheaper, and it needs no negotiation.",

  /**
   * THE CLOSER — the AC's required sentence, with §8.3's hard edge attached.
   *
   * All three clauses are load-bearing: the imperative is the principle, "a seat
   * count is not adoption" is the AC's explicit second half, and "a seat fee buys
   * access, not usage" is the sourced fact that makes the distinction physical —
   * the Enterprise tier above literally bills usage separately from the seat, so
   * seat count and spend measure different things. Two keywords: the principle and
   * the negation, which is the pair a Div Head repeats in November.
   */
  closer:
    "Measure value, not activity — a seat count is not adoption, and a seat fee " +
    "buys access, not usage.",
  closerKw: ["Measure value, not activity", "not adoption"],
} as const;

// ───────────────────── the brand axis (§4.4 slot 7) ─────────────────────

/**
 * Berau — the organizer's published prize value as the local anchor (record §8.1).
 *
 * EVERY ONE OF §8.1's THREE CORRECTIONS IS IN THE STRINGS: it is named a Vol-2
 * prize, the figure is attributed to the ORGANIZER with the vendor's actual $200
 * annual charge printed beside it, and no competition-window date appears. The
 * anchor earns its place because it is already local — a Claude seat has already
 * been priced in this room, by this room's own organizer, so beat 3's inputs are
 * not hypothetical here.
 */
const BERAU_ANCHOR: PriceAnchor = {
  kind: "organizer-prize",
  eyebrow: "THE ANCHOR THIS ROOM HAS",
  line:
    "The Vol-2 competition prize: one year of Claude, valued by the organizer at " +
    "USD 204 / year.",
  lineKw: ["USD 204 / year"],
  source:
    "The organizer's stated prize value, not the vendor's price — the vendor's " +
    "published annual charge is USD 200 / year. Both read 2026-08-04.",
};

/**
 * GEMS — no official internal figure, STATED (record §8.2).
 *
 * THE ABSENCE IS THE FINDING. §8.2 searched every GEMS source in the repo and found
 * no seat price, budget, prize or procurement figure — and it explicitly forbids
 * repurposing the adjacent figures (Rp 23.6bn is a reported benefit, not spend). So
 * this arm points the room at the tier table's list prices, which are the only
 * anchor the deck may honestly print, and says WHY in the same breath. The date is
 * the issue's own "as of 2026-08-03"; the search that established the absence ran
 * 2026-08-04 and the source line says so.
 */
const GEMS_ANCHOR: PriceAnchor = {
  kind: "list-price-only",
  eyebrow: "THE ANCHOR THIS ROOM DOES NOT HAVE",
  line:
    "No internal GEMS figure was official as of 2026-08-03. The list prices on " +
    "the left are the only anchor.",
  lineKw: ["No internal GEMS figure was official"],
  source:
    "Checked across every GEMS source in the verification record, 2026-08-04 — " +
    "no seat price, budget, or prize exists to quote.",
};

/**
 * `general` — UNREACHABLE TODAY, and kept to the shortest honest thing, for exactly
 * `GENERAL_BLOCK`'s and `GENERAL_ON_PREM`'s reasons: no `general-leader` variant is
 * registered, the arm exists so registering one would show NOBODY's figure rather
 * than crash or fall through to another room's anchor, and it is deliberately the
 * thinnest of the three. The formula and the tier table still render — list prices
 * are the vendor's, not a brand's — so the one line here is only about the anchor.
 */
const GENERAL_ANCHOR: PriceAnchor = {
  kind: "no-organisation",
  line: "This deck names no organisation, so it has no local figure to anchor on.",
  lineKw: ["no local figure"],
};

/**
 * §4.4 slot 7, brand by brand.
 *
 * A `Record` keyed by `Brand`, for `OWN_PROOF_BY_BRAND`'s and `ON_PREM_BY_BRAND`'s
 * reason: a fourth brand must FAIL TO COMPILE here rather than silently show one
 * organisation another's price anchor — and on this slide the failure has a second
 * face, which is showing GEMS a local figure §8.2 proved does not exist.
 */
const PRICE_ANCHOR_BY_BRAND: Record<Brand, PriceAnchor> = {
  berau: BERAU_ANCHOR,
  gems: GEMS_ANCHOR,
  general: GENERAL_ANCHOR,
};

/**
 * This slide's price anchor for one brand. Pass `VARIANT.brand`.
 *
 * THE ONLY WAY IN, exactly as `ownProofFor` and `onPremCallbackFor` are: the table
 * above is not exported, so a rule over "every brand" is proved over `BRANDS` and
 * not over this file's own key set.
 */
export function priceAnchorFor(brand: Brand): PriceAnchor {
  return PRICE_ANCHOR_BY_BRAND[brand];
}

// ───────────────────── §6.7's D.1 · the base rate, and the default it prices ─────────────────────
//
// FILED LAST BECAUSE IT WAS BUILT LAST, AND NOT WHERE §6.7 ORDERS IT. §6.7 numbers this
// slide D.1 and the four blocks above D.2–D.5, so a reader arriving from the spec will
// look for this block at the TOP of the file. It is at the bottom, on the precedent
// `src/slides/leader-gap/content.ts` sets and keeps: that file opens on the Capability
// Ladder (§6.5, its run's LAST slide) because gh#53 built it first, and every block since
// has been APPENDED in build order. Filing by build order keeps a new slide's diff to one
// appended block; filing by spec order would move four blocks the day a fifth arrives, and
// the section's order is stated where it is composed — `../index.ts` and
// `src/deck/deck-sets.ts` — not by scroll position here.
//
// §6.7 IS ONE LINE, "`invest-base-rates` — D.1. 78% → 6%.", and gh#70 is what says what
// the two numbers are: **78% adoption versus 6% proper implementation**, the REPORTED
// CONTEXT of the group HR agentic-organization deck's slide 3 (THE AGENTIC ORGANIZATION),
// recorded at `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md` line 106. The
// whole of that source line is:
//
//     "Reported context: 25–55% productivity improvement; 78% adoption versus 6% proper
//      implementation."
//
// TWO OF THOSE THREE FIGURES ARE ON THIS STAGE AND THE THIRD IS DELIBERATELY OFF IT. The
// 25–55% productivity improvement sits in the same sentence and is a DIFFERENT CLAIM — what
// adoption was worth to the organisations that got it right, not how many got there — and
// proof of value is D.2's job, made with the room's OWN organisation rather than with a
// third party's range. gh#70's AC reads "no other statistic is invented around them";
// quoting a third figure from the same sentence would invent nothing and would still be a
// second argument, and this slide makes one.
//
// ═══ WHAT THE ATTRIBUTION MAY CLAIM, AND IT IS LESS THAN B.1's. `gap-hardest-part`
// (§6.1) quotes a statistic the research names an upstream owner for — "Reported by BCG /
// McKinsey" — and its own content block records that it may claim no read date and no
// study title, because we hold neither. THIS PAIR IS WEAKER PROVENANCE AGAIN: the research
// files it under "Reported context" and names NO upstream owner at all — no publisher, no
// study, no year, no sample. So the honest ceiling is WHERE WE READ IT, and
// {@link investBaseRatesContent.statisticSource} says exactly that and stops. It must
// never gain a consultancy, a year, an "n =", or the word "study" applied to anything but
// the absence of one. An invented citation on the opening slide of the section that asks
// for money is the single worst string this deck could print.
//
// ═══ THE POPULATION IS ORGANIZATIONS, AND THAT IS A READING RATHER THAN A QUOTATION.
// Line 106 gives two bare percentages and names no denominator. gh#70 states it in its own
// first sentence — "Most organizations adopt; almost none implement properly" — and slide 3
// of the source deck is titled THE AGENTIC ORGANIZATION, so organizations is what the pair
// is about. It is written down here because the figure on the stage draws MARKS, and a mark
// has to be a mark OF something: {@link investBaseRatesContent.statisticEyebrow} is the one
// string that carries the unit, and it is therefore the one string that would have to
// change if the reading were ever contradicted. The two figures would not.
//
// ═══ THE FOUR UNRELATED 70/30s THIS SLIDE STAYS OUT OF, counted rather than remembered,
// and written down here because TWO of them sit within a page of the pair above in the same
// source deck. (1) §6.5's L3 rung is "Decision contract · 70/30 split" — how much of a
// bounded agentic decision the machine may take. (2) §6.1's is the ADOPTION-FAILURE split,
// quoted on B.1 and drawn there as a split bar. (3) The SAME research slide 3 that carries
// this pair also "contrasts an older 70% execution / 30% planning-and-review split"
// (analysis line 105, directly above the pair's own line 106). (4) HR slide 12's
// sharpen-the-axe principle is 70% preparation /
// 30% execution (`docs/researches/internal-hr-group.md` line 200). Four splits, one number,
// no relation between any two of them — so NO STRING BELOW PRINTS 70, 30 OR THE PHRASE
// "70/30", and no drawing on this stage partitions anything into two complementary parts,
// which is also why the figure is not a bar (see `./base-rates-geometry.ts`).
//
// ═══ WHAT THIS SLIDE MAY NOT SAY, because a sibling owns each of these:
//
//   · THE HARDEST PART, the 70%, `procured` / `instantly` / `invoice` / `tool access` /
//     `organizational capability` / `earned` / `people & process` → §6.1 (B.1). B.1 and
//     this slide quote the SAME SOURCE DECK and quote DIFFERENT SLIDES of it — B.1 takes
//     its 70% off "The Hardest Part Isn't the Tools", this takes the pair off "The Agentic
//     Organization" — so no statistic is shared. No image is either: B.1's is one bar
//     PARTITIONED 70/30, and this stage's is two COUNTS of one repeated mark.
//   · SHADOW AI, SOPs, MISSING GUIDANCE, IMPROVISATION → §6.2 (B.2), and §6.2 binds the
//     deck's three shadow-AI passes to share no image and no statistic. This slide is not
//     one of the three and names none of it.
//   · NANOVEST'S OWN FAILURES and THE PATTERN ACROSS THEM → §6.3 / §6.4 (B.3, B.4).
//     Nothing below is in the first person and nothing below is a story.
//   · L1–L5, THE RUNGS, `capability` → §6.5 (B.5).
//   · THE SIX PILLARS, KOTTER/TAM, MIDDLE-OUT → §6.6 (section C).
//   · THIS COMPANY'S OWN FIGURES, and any organisation's name → D.2, the block at the top
//     of this file. NOT ONE ORGANISATION IS NAMED ON THIS STAGE, which is also why there is
//     no brand axis (below): the argument is about everybody else.
//   · THE DEADLOCK, SHARED ACCOUNTS, `you are the person who can skip` → D.3.
//   · DATA RESIDENCY, THE THREE DESTINATIONS, SHADOW AI AS EXPOSURE → D.4.
//   · SEATS, PRICES, THE ARITHMETIC → D.5. NO PRICE APPEARS BELOW: the closer prices the
//     DEFAULT in the sense of "what it buys you", and the only currency on this stage is
//     the two percentages.
//
// ═══ ONE CONTENT BLOCK, NO BRAND AXIS, NO `…For(brand)` RESOLVER — the second block in
// this file to make that call, after D.3's, and the plainest of the two. §4.4's seven brand
// × deckSet slots do not list this slide; the pair is a third party's reported context about
// organisations in general, and neither Berau nor GEMS has a version of a base rate. A
// `Record<Brand, …>` here would be one honest entry and two written by inventing evidence.
// The slide file imports no `VARIANT` at all — the NINTH leader-only file in the tree to do
// so, after gh#68's `shape-middle-out` and gh#69's `mandate-levers`, the two tickets before
// this one, and
// `./invest-base-rates.tsx` carries the measured census plus the correction to the "third"
// two `leader-gap` headers still claim — which is what lets its test mount the same
// component under both leader brands and prove the two rooms read identical bytes. Do not
// invent variance here: the brand-varying proof is D.2's job, one slide later.
//
// ═══ THE KEYWORD RULE, applied without an exception: `kw` on PROSE ONLY.
//
//   · PROSE, each with a `*Kw` sibling — FOUR strings: `headline`, `adoptionReading`,
//     `implementationReading`, `closer`.
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — EIGHT strings: `figLabel`,
//     `statisticEyebrow`, `statisticSource`, both figures, both row labels, `readingEyebrow`.
//     THE TWO FIGURES ARE THE SHARPEST CASE THE RULE HAS ANYWHERE IN THIS FILE: they are
//     somebody else's quantities, and a copper italic inside "78%" would emphasise a
//     fragment of a number. They are also what `./base-rates-geometry.ts` cuts the two mark
//     fields from, so a reword that moved a figure and left the fields alone is a lie —
//     welded by a cross-module assertion in the test, exactly as B.1 welds its bar.
//
// ═══ NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). This slide composes
// as the FIRST of the `invest` run, which today means D.1 — §6.7's own number for it, and
// the first time this directory's composed figures and §6.7's have agreed since gh#56. The
// four slides behind it each gave up one number on the day this one landed and no file of
// theirs was opened to do it. Neither figure is written down here: `FigLabel` takes a LABEL
// only. THE TWO PERCENTAGES BELOW ARE THE ONLY NUMERALS ON THE STAGE.

export const investBaseRatesContent = {
  /** The `FigLabel`'s LABEL. The letter and number in front of it are DERIVED from the
   *  composed deck (§3.5) and are authored nowhere. */
  figLabel: "THE BASE RATE, AND THE DEFAULT IT PRICES",

  /**
   * The claim, as the slide's title phrase — and it lands BEFORE the pair on purpose.
   *
   * THE NUMBERS ARE EVIDENCE FOR THIS SENTENCE, NOT THE OTHER WAY ROUND (B.1's rule, and
   * the same reason its headline precedes its statistic): a stage that opened on "78%"
   * would make a room work out what the number was evidence for, and the first thing it
   * would try is "we are doing well". This sentence refuses that reading before either
   * figure arrives.
   *
   * IT IS A REFUSAL AND NOT AN ACCUSATION. "Adoption is not the achievement" says nothing
   * about the room's own adoption — the slide names no organisation at all — so a Div Head
   * who has already rolled out licences is being told what that puts them level with,
   * rather than that it was wrong.
   */
  headline: "Adoption is not the achievement.",
  headlineKw: ["not the achievement"],

  /**
   * The mono LABEL over the evidence, and it carries the UNIT the figure draws in.
   *
   * TWO DUTIES, ON PURPOSE. "THE REPORTED BASE RATE" says what kind of object the room is
   * about to read — reported, not measured here, and a rate rather than a result. "ONE MARK
   * IS ONE ORGANIZATION IN A HUNDRED" declares the denominator BEFORE a single mark is
   * drawn, because a field of marks with no stated unit is decoration. Keyword-free; see
   * the block header on why the unit is a reading rather than a quotation.
   */
  statisticEyebrow: "THE REPORTED BASE RATE · ONE MARK IS ONE ORGANIZATION IN A HUNDRED",

  /**
   * THE ATTRIBUTION, printed ON the stage and above the figures rather than under them.
   *
   * WHAT IT CLAIMS: where we read the pair, that the deck we read it in names no upstream
   * study, and that this deck quotes rather than measures. WHAT IT DOES NOT CLAIM, because
   * we hold none of it: a publisher, a consultancy, a study title, a year, a read date, a
   * sample. The research records the pair as "Reported context" and names no owner — so
   * naming one would be an invention, and an invented citation is worse than a plain one.
   *
   * IT IS DELIBERATELY THE FIRST THING UNDER THE EYEBROW, which is the opposite of B.1's
   * order — that slide binds its citation 8px UNDER the sentence it attributes. The reason
   * is the provenance: when the strongest thing that can be said about a number is where it
   * was read, the stage says it FIRST and shows the numbers after, rather than letting a
   * room read two large unattributed percentages and meet the caveat afterwards.
   *
   * Mono, keyword-free: it is a citation, not a sentence the slide makes a point with.
   */
  statisticSource:
    "Reported as context in the group HR agentic-organization deck, which names no " +
    "upstream study — a pair this deck quotes rather than measures.",

  /**
   * The majority rate, VERBATIM from the source's own "78% adoption".
   *
   * KEYWORD-FREE, and it is the number `./base-rates-geometry.ts` cuts the upper mark field
   * from: `ADOPTION_SHARE` is 0.78 because this string says 78%. A reword that changed one
   * and left the other is the failure nobody would see on a projector, so the two are welded
   * by a cross-module assertion in `tests/unit/invest-base-rates.test.tsx`.
   */
  adoptionFigure: "78%",

  /** The upper row's label. Mono, keyword-free. "HAVE" makes it a predicate of the figure
   *  beside it, so the row reads as one sentence — the percentage is of ORGANIZATIONS, which
   *  the eyebrow has already said. */
  adoptionLabel: "HAVE ADOPTED AI",

  /** The minority rate, VERBATIM from the source's own "6% proper implementation". The other
   *  end of the same weld — `IMPLEMENTATION_SHARE` is 0.06 because this string says 6%. */
  implementationFigure: "6%",

  /** The lower row's label. Mono, keyword-free. "PROPERLY" is the source's own qualifier and
   *  the slide never defines it: what proper implementation requires is B.1's, B.5's and
   *  section C's argument, and a definition here would spend three of their beats. */
  implementationLabel: "HAVE IMPLEMENTED IT PROPERLY",

  /** The mono LABEL over the reading band. Mono, keyword-free, and it names the frame the
   *  closer pays off — this section is about what a position is WORTH, so the two readings
   *  under it are priced rather than described. */
  readingEyebrow: "WHAT EACH RATE BUYS",

  /**
   * What the majority rate is worth. PROSE, so it carries keywords.
   *
   * THE SENTENCE MAKES NO CLAIM ABOUT DIFFICULTY, which is the boundary with B.1: that
   * slide argues adoption is the EASY 30% and capability the hard 70%. This one argues only
   * that adoption is CROWDED — nearly everyone is already there — and crowded is a fact
   * about the base rate rather than about effort.
   */
  adoptionReading:
    "Adoption is the common position. Almost every organization already holds it, " +
    "so holding it proves nothing.",
  adoptionReadingKw: ["the common position", "proves nothing"],

  /**
   * What the minority rate is worth. PROSE, and the mirror of the line beside it: COMMON
   * against RARE, PROVES NOTHING against WORTH PAYING FOR.
   *
   * "WORTH PAYING FOR" IS THE SECTION'S OWN VERB and the reason this slide opens WHY
   * INVEST: scarcity is the investment case, stated once and left for D.2 to evidence with
   * the room's own numbers. It says nothing about HOW to reach the rare position — that is
   * the rest of the deck — and it names no cost, which is D.5's.
   */
  implementationReading:
    "Proper implementation is the rare one. Almost no organization reaches it, " +
    "so reaching it is worth paying for.",
  implementationReadingKw: ["the rare one", "worth paying for"],

  /**
   * THE CLOSER — gh#70's own sentence for what this slide is for, and the slide's last
   * arrival. PROSE.
   *
   * ONE SENTENCE AND NOT TWO, WHICH IS A DECISION. B.1's closer is a pair whose second half
   * frames the run behind it ("Everything after this is the 70%"), and a second sentence
   * here would be that move made twice in one deck — the same objection
   * `src/slides/leader-gap/content.ts` records about echoes between consecutive stages. It
   * also counts nothing and names no position: the run this slide opens is composed per
   * deck set (§3.4), so a sentence that counted its own successors would go stale the first
   * time one was inserted or cut.
   */
  closer: "Doing what everyone does buys what everyone gets.",
  closerKw: ["what everyone gets"],
} as const;
