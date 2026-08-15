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
// Node anyway: `scripts/d2-figure-verify.mjs` imports `./geometry.ts` — which keeps the
// property — and transcribes every string from spec §6.7 on purpose.
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
   * The turn — "…and these are yours" — is made by the source plate and the rows,
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
   *
   * REWORDED TWICE ON 2026-08-14, AND BOTH SHIPPED LINES ARE RECORDED.
   *
   * FIRST it read "An outsider's case study is easy to discount." with
   * `easy to discount` highlighted, and the owner's objection was that the room
   * cannot parse it: "discount" as a VERB meaning "treat as worth less" is a
   * register a division head reading a projected line in a second language does
   * not reach for, and "an outsider's case study" is three abstractions before
   * the sentence has a subject.
   *
   * THEN it read "Someone else's numbers are easy to ignore." with
   * `easy to ignore` highlighted. That fixed the vocabulary and kept the shape,
   * and the shape was the remaining fault: it is a NEGATIVE about people who are
   * not in the room, so the room has to hold "someone else" in mind and then
   * invert it before the dossier below means anything. The line on the slide now
   * states the RULE in the positive, and the plate is its direct answer — the
   * headline asks whose numbers count, `sourceCaption` below says WHOSE PROOF
   * THIS IS, and the name under it answers. Headline and figure are one sentence.
   *
   * WHY `a leader` AND NOT `a room` OR `you`. "You" would be an accusation from a
   * stage; "a room" is one abstraction more than the sentence can afford at 40px.
   * "A leader" is who the deck is for and who the figures have to move, and the
   * possessive that follows it — `their own` — is the highlight, because that
   * phrase is the whole premise.
   *
   * IT STILL NAMES NO ORGANISATION AND CARRIES NO DIGIT, which is the rule the test
   * holds over it: the headline is the premise every brand's block answers, and a
   * premise that named a company would be answering itself. It is 47 characters
   * against the test's 48-character budget, and the display face sets it on one
   * line at 40px — measured on the stage, not assumed: 407px in an 1184px row.
   */
  headline: "The only numbers a leader trusts are their own.",
  /** The slide's first line of prose, and one highlight on it. */
  headlineKw: ["their own"],

  /**
   * The source plate's own header, over the name of whoever the figures belong to.
   *
   * A LABEL, so no `*Kw` sibling — and BRAND-INVARIANT, so it lives here beside the
   * headline rather than inside `OwnProofBlock`: what varies between the two decks is
   * WHOSE proof it is, never the fact that the plate is answering that question.
   *
   * IT DOES NOT REPEAT THE FIG LABEL, which is the one thing a second mono caps line
   * on this stage could do wrong. `figLabel` above says PROOF FROM INSIDE THE COMPANY
   * — the slide's subject — and this says which of the slide's boxes the reader is
   * looking at. The plate below it names the owner and the four hairlines leaving its
   * right edge run to the figures that owner reported, so the caption, the name and
   * the wires are three halves of one sentence and none of them is the fig label
   * again.
   *
   * RENDERED ONLY WHERE THERE IS AN OWNER TO NAME — the plate is inside the `figures`
   * arm, so a deck that names no organisation prints no caption either.
   */
  sourceCaption: "WHOSE PROOF THIS IS",

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
// bill itemised → it worked, the proof did the convincing, the full investment was
// released → the turn, which is that the person in the chair does not have to repeat
// any of it. A fifth string closes the stage under those four ({@link
// investChickenEggContent.closer}); it is the deck's thesis shelf, not a beat.
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
// THE REGISTERS. `kw` on PROSE ONLY, as everywhere in this file. FIVE prose lines,
// each with a `*Kw` sibling: `headline`, `workaround`, `verdict`, `turn` and — since
// the 2026-08-14 rework — `closer`. Everything else is a LABEL, carries no `*Kw` and
// may not gain one: `figLabel`, both `deadlockClauses`, `costsEyebrow`, `pilotEyebrow`,
// the eight `LineItem` labels, and the five figure labels at the bottom of the block
// (`budgetLabel`, `proofLabel`, `destinationEyebrow`, `deadlockToken`,
// `authorityToken`). The clauses are the sharpest case — they are a rule quoted in the
// mono register, and a copper italic inside "NO BUDGET WITHOUT PROOF" would emphasise a
// fragment of a rule.
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
//      THREE OF THE TEN D.4 TOKENS ABOVE ARE NOW HISTORICAL RATHER THAN RESERVED, and
//      saying so is cheaper than letting the list quietly lie: D.4 prints NEITHER `6.7`
//      NOR `9.2`. `docs/researches/2026-08-04-vendor-pricing-and-data-handling.md` §9
//      traced both literals to the superseded Artificial Analysis Index v4.0 and #58
//      shipped the v4.1 pair (`4` and `5.2`) that shipping B.4 already uses. The third is
//      `governance retrofit`, which left D.4's stage on 2026-08-14 with the thesis rewrite
//      recorded at {@link investGovernanceContent.closer} — no slide in either deck spells
//      `retrofit` now. Forbidding all three here still costs nothing and still guards the
//      escalation against a later author lifting the SPEC's old sentence, so the patterns
//      stay.
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
//      now are — REMEASURED 2026-08-11, when B.2's fray redesign cut the sentence that
//      spelled §6.2's verb ("Everyone improvises a rule that works for them" left the
//      stage; the fan of private hairlines draws it now, and the presenter says it). So
//      ALL THREE are reservations against the SPEC's phrasing only — `improvise`
//      included, again — kept, because a later author lifting §6.2's sentence into this
//      slide is a different failure from lifting B.2's copy, and both are cheap to
//      forbid. B.2's own image since the redesign: three issued boxes against four
//      question boxes with EMPTY answer rules, over a rollout spine that stops at a dot
//      captioned NEVER WRITTEN and frays into two dozen private hairlines — and this
//      slide draws none of it: no login, no demonstration, no encouragement, no
//      silence, no unanswered question, no stopped or frayed line.
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
   * BEAT 3 — the load-bearing one, and the sentence the 2026-08-14 rework RE-WROTE. Two
   * clauses now, in the order they happened.
   *
   * ═══ WHAT IT SAID UNTIL 2026-08-14, AND WHY THAT WAS WRONG IN THE ROOM IT IS SHOWN
   * IN. It read "It worked. Management was convinced. Full investment was released." —
   * three sentences, and the middle one names the audience in the third person. THIS
   * DECK IS PRESENTED TO TOP MANAGEMENT. Telling the people who release budget that
   * "management was convinced" puts them off the stage and turns the beat into a report
   * about somebody else's decision; the owner's note on it was exactly that, and it is
   * the reason the sentence changed rather than the geometry around it.
   *
   * ═══ WHAT REPLACED IT, AND WHAT THAT BUYS. "The proof did the convincing" says the
   * SAME event without naming a party: what moved the money was evidence, and the room
   * is the party that would be moved by it. It is also the whole argument of the slide
   * compressed into five words — the deadlock says proof is unobtainable, the pilot says
   * it is buyable, and this clause says it is what pays.
   *
   * ═══ THE KEYWORD IS ON THE RELEASE OF THE INVESTMENT and not on "It worked", because
   * the emphasis is the last thing the room takes away and "it worked" is a claim
   * anybody can make about anything. "the full investment was released" is the fact that
   * ends the story legitimately, and it is the clause a Div Head repeats upward.
   *
   * ═══ IT IS ONE LINE NOW, WHICH RETIRES A LONG NOTE. The shipped copy set two lines in
   * a 728px column and broke its copper keyword across them; a 2026-08-05 review
   * considered narrowing the span to `["released"]`, recorded the three measurements
   * that rejected narrowing the BOX instead, and left the span at four words. The
   * redraw gives this sentence a 974px measure and ONE line
   * (`./chicken-egg-geometry.ts`'s `VERDICT_W`), so the wrap that started that review no
   * longer exists and neither does the argument. What survives it is the rule the review
   * settled on: the emphasis is the whole clause that ends the story, not the verb.
   */
  verdict: "It worked. The proof did the convincing, and the full investment was released.",
  verdictKw: ["the full investment was released"],

  /**
   * THE CLOSER — the deck's own last line on this stage, and the only string here that
   * is not one of §6.7's four beats.
   *
   * ═══ WHY THIS SLIDE HAS ONE AT ALL, when it never did before. Every other slide in
   * this run ends on a sentence at `./geometry.ts`'s thesis shelf — D.1's "Doing what
   * everyone does buys what everyone gets", D.2's, D.4's — and D.3 used to end on beat
   * 3 instead, set at 26px over two lines, which made the LOUDEST thing on the stage a
   * sentence about what happened to us. The 2026-08-14 rework moves that sentence back
   * to the size of the other beats and gives the floor to a line addressed to the room.
   *
   * ═══ IT IS NOT A SUMMARY OF THE FOUR BEATS, AND IT MAY NOT BECOME ONE. It is the
   * ASK: the four beats end with an offer on the stage, and this is the sentence that
   * says who has to do something about it. First person past, then second person
   * present — the same single turn the slide makes at beat 4, restated as the thing to
   * leave with.
   *
   * ═══ THE KEYWORD IS ON THE ACT AND NOT ON THE PROOF. "simply authorise it" is what
   * the room can do that we could not; a copper italic on "the long way" would emphasise
   * our own detour, which is the half of this slide that is a warning rather than an
   * offer.
   *
   * ═══ IT NAMES NO SIGNATURE, deliberately. B.1's race ("only one of these arrives by
   * signature") and K.3's headline ("not one of them needs a signature but yours") both
   * own that word in this deck, and a third slide reaching for it would make three
   * different asks sound like one. "Authorise" is the same act named in the register a
   * division head uses for it.
   */
  closer: "We had to earn that proof the long way. You can simply authorise it.",
  closerKw: ["simply authorise it"],

  /**
   * BEAT 4 — the turn, and the only sentence on the slide addressed to the room.
   *
   * ═══ IT COUNTED UNTIL 2026-08-14, AND THE COUNT HAD NOTHING TO POINT AT. §6.7 phrases
   * the turn as "you are the person who can skip beats 1–3" — the spec's own numbering of
   * this slide's beats, which the room is never shown — so the shipped line counted what
   * the left column had just shown instead: "You are the person who can skip all three."
   * The three were the deadlock, the workaround and the bill. NOTHING ON THE STAGE SAYS
   * SO. On the pose this sentence lands in, the only enumerated thing under it is a row of
   * FOUR terms, so "three" reads as a miscount of the list directly below it rather than
   * as a reference to the three beats above it. The owner's note on it was exactly that,
   * and it is why the sentence changed and not the figure.
   *
   * ═══ WHAT REPLACED IT NAMES THE THING BEING SKIPPED. "the deadlock" is the noun
   * `figLabel` and `headline` have already put on this stage — "THE DEADLOCK, AND WHO CAN
   * SKIP IT" leaves the pointer open on purpose, and this is the line that closes it. It
   * also generalises correctly: what a division head skips is not three of our steps, it
   * is the LOCK that made those steps necessary at all.
   *
   * ═══ THE DEADLOCK, NOT THE PROOF. The proof is still bought — on the short road drawn
   * directly under this line, on the four terms beside it. Only the route is skipped, so
   * the sentence may never be softened into "skip the proof": that would offer the room a
   * budget with no evidence under it, which is the argument D.1 to D.4 exist to refuse.
   *
   * ═══ THE ADDRESS CARRIES THE SENTENCE AND THE KEYWORD IS DELIBERATELY NOT ON IT. A
   * copper italic on "You are the person who can" would emphasise the flattery; on "skip
   * the deadlock" it emphasises the offer, which is the thing being agreed to. The span
   * stops short of "entirely" — the adverb is the sentence's finality, not its act, and a
   * keyword that ran to the full stop would emphasise the clause instead of the offer
   * inside it.
   */
  turn: "You are the person who can skip the deadlock entirely.",
  turnKw: ["skip the deadlock"],

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

  // ─── THE FIGURE'S OWN FIVE LABELS (2026-08-14) ────────────────────────────
  //
  // ALL FIVE ARE LABELS: mono or display, keyword-free, and none of them may gain a
  // `*Kw` sibling. They exist because the redraw put a DRAWN OBJECT on this stage for
  // the first time, and a drawn object needs naming; every one of them is one or two
  // words, because a caption long enough to be read as a sentence would be a fifth beat
  // nobody wrote.
  //
  // NOT ONE OF THEM ADDS A CLAIM. `budgetLabel` and `proofLabel` are the two nouns
  // already inside `DEADLOCK_CLAUSES`; `destinationEyebrow` restates clause 0 from the
  // other end; `deadlockToken` names the figure the headline already named; and
  // `authorityToken` is the pronoun beat 4 is written in. A reader checking this block
  // against §6.7 will find no new fact here, which is the point — the figure argues with
  // §6.7's own words or it does not argue.

  /**
   * The cycle's two poles, in the display face.
   *
   * SHOUTED, LIKE THE CLAUSES, and for the same reason: neither string is ever quoted in
   * prose, so the register's own casing is what the stage shows. They are the two nouns
   * both clauses are built from, which is what makes the ring readable without reading
   * either clause — a room that only sees BUDGET and PROOF with two arrows between them
   * has already got it.
   *
   * `proofLabel` IS PRINTED ONCE AND PLACED TWICE. The same box carries it at the ring's
   * right pole and, from pose 1, on the destination both roads end at
   * (`./components/ChickenEggBeats.tsx`). One string, because it is one thing.
   */
  budgetLabel: "BUDGET",
  proofLabel: "PROOF",

  /**
   * The destination plate's eyebrow — clause 0 read forwards.
   *
   * "NO BUDGET WITHOUT PROOF" is the same statement as "WHAT UNLOCKS THE BUDGET",
   * negated. Act 1 states it as the thing that traps a division; act 2 states it as the
   * thing worth buying, over the plate both roads arrive at. That is the whole reversal
   * the slide performs, and it is done in two labels rather than in a sentence.
   */
  destinationEyebrow: "WHAT UNLOCKS THE BUDGET",

  /**
   * The two road heads.
   *
   * `deadlockToken` NAMES THE SHRUNK PADLOCK so a room that looks away during the act
   * change is not asked to recognise a 33px glyph on its own.
   *
   * `authorityToken` IS ONE WORD ON PURPOSE. It sits under the key at the head of the
   * road being offered, directly below beat 4's own sentence, and the sentence is what
   * says what the room can do — the label only has to say WHOSE road it is. Anything
   * longer ("YOUR AUTHORITY", "THIS ROOM") either flatters or duplicates C.4's own tag.
   */
  deadlockToken: "THE DEADLOCK",
  authorityToken: "YOU",
} as const;

// ───────────────────── §6.7's D.4 · where the data goes, and who answers for it ─────────────────────
//
// ═══════════════════════════════════════════════════════════════════════════════════════
// ═══ THE MERGE. READ THIS BEFORE EDITING ANY STRING BELOW.
// ═══════════════════════════════════════════════════════════════════════════════════════
//
// THIS BLOCK IS TWO SLIDES' WORTH OF COPY, CUT DOWN TO ONE ARGUMENT. It replaces the D.4
// block ("where the data goes, and what answers it" — three destinations, two benchmark
// figures, three exposures, four governance domains) and the D.5 block ("from individual
// seats to a line item" — four procurement gaps, four capabilities, a seat-price formula and
// three priced tiers). Both were walls of type: the owner's note on the rendered frames was
// that the largest object on either stage was a paragraph, and that a division head had to
// READ both slides to find out what they claimed.
//
// THE TWO SLIDES WERE ONE ARGUMENT ALL ALONG, AND THAT IS WHY THEY MERGE RATHER THAN SHRINK.
// D.4's exposure was "nobody administers it"; D.5's first gap was "no admin". D.4's second
// exposure was "you cannot revoke it when the person leaves"; D.5's third gap was "nothing
// revoked on exit". Two slides were describing ONE defect from two desks — a risk desk and a
// procurement desk — and then offering the same fix twice. Merged, the deficit is stated once
// and the fix is wired to it: four things nobody can do, four switches, four things a managed
// seat turns on.
//
// ═══ WHAT IS DELIBERATELY GONE, and each one is a decision rather than a cut for space:
//
//   1. EVERY DATE, AND THEREFORE EVERY PRICE. The old D.5 printed three seat prices, each
//      carrying its currency, its billing period and the date it was read, because a price
//      with no date is a stale price waiting to be caught. This slide is a standalone
//      deliverable — it is read in rooms and months this file cannot know — so no date may
//      appear on it, and a price with no date is exactly what the old block's own gate
//      forbade. The two go together: dropping the dates drops the prices, and a governance
//      slide is the wrong place to quote a rate card in any case. A seat price is a
//      procurement question and this stage now asks a control question.
//   2. THE TWO BENCHMARK FIGURES (the old "4 pts" and "5.2 pts" against the frontier). They
//      were a quoted capture with a date on it, they priced only the third destination, and
//      they made a room reading a three-column comparison attach two numbers to two of the
//      three columns. The claim they supported survives in {@link investGovernanceContent
//      .verdict} without them.
//   3. THE FOUR GOVERNANCE DOMAINS (culture · risk · governance · ethics). They could only
//      ship beside the line that said who proposed them and that they are nobody's
//      requirement, and that line is a date and an organisation this slide may not name. Four
//      abstract nouns with their provenance removed would read as a mandate, which is the one
//      overclaim the old block worked hardest to avoid. What replaces them is the thesis, and
//      it says the same thing with the room's own deadline in it.
//   4. THE BRAND AXIS, both slots. The old D.4 forked on whether the room already runs
//      private on-prem GPU servers, and the old D.5 on whether it has a local price anchor;
//      both forks needed a source line on the stage. One story, byte-identical in both leader
//      decks, is the same call `./content.ts`'s D.3 block makes, and it is a claim a browser
//      check can settle by diffing the two decks' rendered boxes.
//
// ═══ WHAT IS ON THE STAGE, in four poses, and why each one is one HERO rather than a band of
// a table:
//
//   0 — ONE SCREEN, THREE DOORS. The screen every person in the room has already used, a bus
//       out of it, and three destinations: an open door, a shut door with a badge, a rack that
//       never opens. Each door carries its account type and ONE two-sentence contract — what
//       happens to the words, and who is in charge. The verdict closes it.
//   1 — WHAT NOBODY CAN DO. The first door travels to the left margin and becomes the token
//       the whole circuit hangs off; four rows arrive, each a thing nobody can do wired
//       through a switch that is OFF to a slot that is empty.
//   2 — WHAT A MANAGED SEAT GIVES. The four switches flip, the four right-hand wires complete,
//       the four controls land, and the door SHUTS. The answer sentence names what changed.
//   3 — THE FLOOR. The rule, and the thesis alone under it.
//
// ═══ THE COPY RULES THIS BLOCK KEEPS.
//
//   · ASD-STE100 AND ZINSSER, WHICH FOR THIS BLOCK MEANS ONE MEASURABLE THING: no sentence on
//     this stage runs past one line at its own register, and no sentence carries two claims.
//     Every prose line below is two short sentences or one; every list row is a verb and its
//     object. That is the whole of why the merged slide holds more argument than either parent
//     did on fewer words.
//   · NO VENDOR'S TERMS ARE ASSERTED ANYWHERE. The three contracts describe CATEGORIES of
//     account — personal, company-managed, own metal — and name nobody. That is the old D.4's
//     own gate branch and it is the only one that survives a vendor changing its terms the
//     week before a session, which for a standalone deliverable is every week.
//   · NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). This slide composes
//     **D.4** today, fourth in the `invest` run, and the run is four long since the merge. The
//     figure is derived from what the deck holds; `FigLabel` takes a label only. Do not pin it.
//   · THE KEYWORD RULE, unchanged from every block in this file: `kw` goes on PROSE ONLY.
//     · PROSE, each with a `*Kw` sibling — `headline`, `verdict`, `exposureLine`,
//       `answerLine`, `closer`.
//     · LABELS, carrying no `*Kw` and forbidden from gaining one — `figLabel`,
//       `screenEyebrow`, the three door `label`s and their three `contract`s, both column
//       eyebrows, the four exposures, the four controls, and both token labels. The sharpest
//       case is a door's contract: a copper italic inside "No training on your words" would
//       emphasise a fragment of a term, and the whole string is already the quotation.

/** Exactly three, held by the TYPE — see {@link DataDestination}. */
type Three<T> = readonly [T, T, T];

/**
 * One of the three places the same keystrokes can end up.
 *
 * THREE FIELDS AND NOT FOUR, and the missing one is a vendor. `label` is the account TYPE,
 * `contract` is what its terms amount to, and `glyph` names which of the three drawings the
 * figure puts on it. Nothing here names a product, and there is nowhere to put one.
 */
export interface DataDestination {
  id: string;
  /**
   * The account type, in the mono LABEL register and stored SHOUTED.
   *
   * KEYWORD-FREE, like every label in this file: each one is the name of a thing, and a copper
   * italic inside a name emphasises a fragment of it.
   */
  label: string;
  /**
   * What the contract amounts to: TWO SHORT SENTENCES, always in the same order — what happens
   * to the words, then who is in charge.
   *
   * THE PARALLELISM IS THE COMPARISON. Three strings in one shape can be read as one table with
   * no table drawn; three strings in three shapes are three remarks. It is also the reason none
   * of them names a retention window or a training default in vendor language — the room is
   * comparing WHO HOLDS THE PEN, not three privacy policies.
   */
  contract: string;
  /**
   * Which drawing the figure hangs on this door: an open door, a shut door with a badge, or a
   * rack that never opens.
   *
   * A CLOSED UNION AND NOT A STRING, so a fourth destination cannot arrive with a glyph name
   * the figure has no drawing for. The first one is load-bearing beyond its own door: `open` is
   * the glyph that travels into act 2 and shuts there, so renaming it breaks the act change
   * rather than a picture.
   */
  glyph: "open" | "guarded" | "onsite";
}

/**
 * BEAT 1 — the three destinations, in ascending order of control.
 *
 * THE ORDER IS AN ESCALATION AND NOT A PREFERENCE. Personal account, then company-managed,
 * then the company's own metal: each one holds the data more tightly than the last, so a room
 * reading left to right is reading a dial and not a menu. The verdict then says where on that
 * dial to stop, which is a sentence that only works if the dial is drawn in order.
 *
 * THE FIRST ONE IS THE SUBJECT OF THE REST OF THE SLIDE. Act 2 is about the personal account
 * and nothing else — that is where the four gaps live — so its door is the one that travels.
 */
const DESTINATIONS: Three<DataDestination> = [
  {
    id: "personal",
    // "can train" AND NOT "trains". The category claim is that a consumer account's terms
    // PERMIT training by default; asserting that any particular vendor does it today would be
    // a policy claim about a named party, which this stage does not make.
    label: "PERSONAL ACCOUNT",
    contract: "Your words can train the model. No admin exists.",
    glyph: "open",
  },
  {
    id: "company-managed",
    label: "COMPANY-MANAGED WORKSPACE",
    contract: "No training on your words. An admin is in charge.",
    glyph: "guarded",
  },
  {
    id: "onsite",
    // "THE COMPANY'S OWN HARDWARE" AND NOT "SELF-HOSTED / ON-PREM". Two pieces of jargon
    // replaced by the thing they mean, which is this block's whole editorial rule: a division
    // head who has never deployed a model still knows what own hardware is.
    label: "THE COMPANY'S OWN HARDWARE",
    contract: "Nothing leaves the site. You run the machines.",
    glyph: "onsite",
  },
];

/**
 * BEAT 2 — the four things nobody can do about a personal account.
 *
 * FOUR VERBS AND THEIR OBJECTS, AND NOTHING ELSE. Each string is what a person in the room
 * would try to do and cannot: audit it, revoke it, produce it, price it. They are stored as
 * bare capabilities rather than as "You cannot …" sentences, because the column they sit in
 * carries a heading that says nobody can do any of them and the switch beside each one is OFF.
 * Repeating the negation four times would spend four lines saying what the stage says once.
 *
 * THE ORDER IS THE ESCALATION AN AUDITOR WALKS. What was asked → who still has access → show
 * me → what did it cost. The first three are the old D.4's three exposures, in its order; the
 * fourth is the old D.5's spend gap, which belongs here because it is the same absence.
 *
 * ROW `i` IS WIRED TO CONTROL `i` — see {@link SEAT_CONTROLS}. The two tuples are read as one
 * four-row circuit by `../governance-geometry.ts`, which refuses to compile if they differ in
 * length.
 */
const EXPOSURES: Four<LineItem> = [
  { id: "cannot-audit", label: "Audit what was asked" },
  { id: "cannot-revoke", label: "Revoke access when someone leaves" },
  { id: "cannot-produce", label: "Show a record to an auditor" },
  { id: "cannot-price", label: "See what the division spends" },
];

/**
 * BEAT 3 — the four things a managed seat turns on, in the deficit's own order.
 *
 * EACH ONE ANSWERS THE ROW IT SITS ON AND NOT THE LIST AS A WHOLE, which is what the wire
 * between them draws. "One audit trail" answers "audit what was asked"; "one sign-in, one off
 * switch" answers "revoke access when someone leaves"; "export on demand" answers "show a
 * record to an auditor"; "one bill, usage in view" answers "see what the division spends". A
 * reordering of either tuple silently rewires the figure, which is why the pairing is stated
 * here and asserted in `tests/unit/invest-governance.test.tsx`.
 *
 * "ONE" DOES THE WORK IN THREE OF THE FOUR. The defect is not that these things are impossible
 * — a determined person can reconstruct some of them from four inboxes — it is that they are
 * not in ONE place with ONE owner. That is the difference a managed seat buys, and the word is
 * the cheapest way to say it.
 *
 * NO VENDOR FEATURE NAMES. "Single sign-on" is a category and appears as "one sign-in"; nothing
 * here is a product's capability list, and none of these strings would need editing if every
 * vendor in the market changed its packaging tomorrow.
 */
const SEAT_CONTROLS: Four<LineItem> = [
  { id: "audit-trail", label: "One audit trail" },
  { id: "one-sign-in", label: "One sign-in, one off switch" },
  { id: "export", label: "Export on demand" },
  { id: "one-bill", label: "One bill, usage in view" },
];

export const investGovernanceContent = {
  figLabel: "WHERE THE DATA GOES, AND WHO ANSWERS FOR IT",

  /**
   * The headline, and it is the merged slide's whole claim in nine words.
   *
   * IT NAMES THE SUBJECT THE ROOM GETS WRONG. Both parent slides opened on a symptom — one on
   * the screen looking identical, the other on subscriptions becoming a line item — and both
   * left the room to work out what the two had in common. It is the ACCOUNT: the account
   * decides the contract (act 1) and the account is what nobody owns (act 2). One noun carries
   * the whole slide, so the keyword is the clause that names it.
   *
   * TWO SENTENCES AND NOT ONE CLAUSE. "The tool is not the risk, the account is" is one
   * concession; two full stops make it two statements, and the second one is the only one the
   * slide is about.
   */
  headline: "The tool is not the risk. The account is.",
  headlineKw: ["The account is"],

  /**
   * The screen's own label — mono, centred over the drawing, keyword-free.
   *
   * IT IS THE CLAIM THE FAN UNDER IT PROVES. "One screen · three contracts" is what a bus with
   * three taps off it looks like, said in five words, so the room reads the shape and the words
   * as one statement rather than reading a diagram and then hunting for its caption.
   */
  screenEyebrow: "ONE SCREEN · THREE CONTRACTS",

  destinations: DESTINATIONS,

  /**
   * BEAT 1's CONCLUSION, stated rather than implied.
   *
   * THE TWO HALVES ARE ONE TRADE AND BOTH ARE MARKED. "Right for the most sensitive work" alone
   * is a recommendation to buy hardware and would send a division head off to price GPUs for
   * everything; "wrong for the rest" alone is a recommendation not to. The pair is the
   * decision, so the two keywords are the two halves of it.
   *
   * "OWN HARDWARE" IS NAMED, and the subject is not left to the door above it. This is the
   * sentence a division head repeats to an infrastructure lead, and a verdict whose subject has
   * to be inferred from a drawing is a verdict that arrives without its subject.
   *
   * IT QUOTES NO BENCHMARK. The parent slide priced this trade with two figures from a dated
   * capture; the trade is the same without them, and a figure that needs a date cannot ship on
   * a standalone deliverable. What the sentence asserts is a fit, which is what a division head
   * is deciding.
   */
  verdict: "Own hardware is right for the most sensitive work. It is wrong for the rest.",
  verdictKw: ["the most sensitive work", "wrong for the rest"],

  /**
   * BEAT 2 — the turn, and the sentence the whole merge exists for.
   *
   * IT NAMES WHAT THE RISK IS NOT, FIRST. A room that has just read three contracts will hear
   * everything after it as a procurement problem unless this line takes that frame away before
   * it offers another. Which is also why no vendor is named anywhere on this stage.
   *
   * "NOBODY OWNS" AND NOT "NOBODY ADMINISTERS". The parent slide's verb was the IT word, and it
   * is the right word in a systems review; in front of a board, ownership is the word that has
   * consequences attached — somebody's name against a thing — and it is one syllable shorter.
   */
  exposureLine: "The risk is not the vendor. It is the account that nobody owns.",
  exposureLineKw: ["not the vendor", "nobody owns"],

  /** The deficit column's heading. Mono, keyword-free. "TODAY" is what makes it beat 2: this is
   *  not a warning about a decision, it is a description of the position the room is already in
   *  before any contract is signed. */
  exposureEyebrow: "WHAT NOBODY CAN DO TODAY",

  exposures: EXPOSURES,

  /** The offer column's heading. Mono, keyword-free. "GIVES" and not "BUYS": the parent slide's
   *  argument about what a seat fee purchases needed a price on the stage, and this column is
   *  about capability rather than cost. */
  controlsEyebrow: "WHAT A MANAGED SEAT GIVES",

  controls: SEAT_CONTROLS,

  /**
   * BEAT 3's conclusion, and it re-frames the ask for the only room that can grant it.
   *
   * A BOARD HEARS "MANAGED SEATS" AS PROCUREMENT, and the parent slide leaned into that: it put
   * a formula and a rate card on the stage and closed on "measure value, not activity". This
   * sentence refuses the frame. The thing a managed seat adds is not capacity and not a
   * discount; it is a person whose name is against the account — which is the one thing on this
   * slide that needs a signature rather than a budget.
   *
   * BOTH KEYWORDS ARE NEEDED. "Not a bigger license" is the frame being refused and "an owner"
   * is the frame being offered, and a room that reads only one of the two gets the wrong half.
   */
  answerLine: "A managed seat is not a bigger license. It is an owner.",
  answerLineKw: ["not a bigger license", "an owner"],

  /**
   * The two states of the token the four rows hang off, and they answer the figure's own label.
   *
   * NINE CHARACTERS IS THE HARD CEILING and it is measured, not chosen. The label box is 84px
   * between the stage margin and the circuit ({@link TOKEN_LABEL_W} in
   * `../governance-geometry.ts`), and JetBrains Mono at 9.5px/0.10em sets ≈6.65px per
   * character — so nine characters is 59.9px and ten is 66.6, both of which fit, while
   * "NOBODY OWNS IT" at fourteen is ≈93px and overflows into the first row of the circuit.
   * That is why the pair is two words and not a phrase.
   *
   * THEY ARE THE SAME ANSWER TWICE, WITH AND WITHOUT A NAME IN IT. The slide is called "…and
   * WHO answers for it"; at pose 1 the answer is nobody and at pose 2 it is one person. Mono,
   * keyword-free.
   */
  nobodyToken: "NOBODY",
  ownerToken: "ONE OWNER",

  /**
   * THE THESIS — the one line this deck asks the room to leave with, on §4.5's shelf.
   *
   * IT NAMES THE TWO ROOMS THIS SUBJECT CAN BE DISCUSSED IN, and asks the board to pick the
   * first one. Today it is a decision: somebody in this room signs, and the four rows of beat
   * 2 turn on. Unsigned, the same subject comes back as an investigation — an incident review,
   * an audit, a regulator's request — and then the questions are the same four questions, asked
   * by somebody else, with a date attached. The argument is WHO SETS THE DATE, which is the
   * only thing on this slide a board is uniquely able to act on.
   *
   * IT REPLACED "Write the rules now. A retrofit is the same work, on somebody else's
   * deadline." on 2026-08-14, on the owner's call, and the fault was comprehension. "Retrofit"
   * is a systems word that a division head reads as re-work rather than as a summons, and the
   * sentence hid its actor: the room had to infer WHO owned the deadline before the line meant
   * anything. "An investigation" names that actor in one noun. THE WORD `retrofit` LEFT D.4'S
   * STAGE WITH IT — see the retired entry in `tests/unit/gap-no-sop.test.tsx`, which held it as
   * a token this slide owned.
   *
   * IT OPENS ON A VERB, WHICH THE OTHER FOUR PROSE LINES DO NOT. `headline`, `verdict`,
   * `exposureLine` and `answerLine` are all statements, and three of them are built on "X is
   * not Y. It is Z." A fifth sentence in that shape would read as one more observation; a
   * thesis has to be an ask, and "Set the policy" is the shortest one this argument has.
   *
   * NO DATE, AND THE SENTENCE IS SHARPER FOR IT. "While this is still a decision" is true in
   * every month this deck is shown, which a named window would not be.
   *
   * ONE LINE, full width, 19px on the same shelf D.1, D.2 and D.3 use. Asserted by name in
   * `scripts/d4-figure-verify.mjs`, because a thesis that wrapped would be the one wrap on this
   * stage a room could not miss. It is SHORTER than the line it replaced (68 characters against
   * 77), so the shelf it fits was already proved.
   */
  closer: "Set the policy while this is still a decision, not an investigation.",
  closerKw: ["still a decision", "an investigation"],
} as const;

// ───────────────────── §6.7's D.1 · the base rate, and what it earns ─────────────────────
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
// ═══════════════════════════════════════════════════════════════════════════════════════
// ═══ THE 2026-08-14 RESOURCING, AND WHY THE FIGURES MOVED. READ THIS BEFORE EDITING.
// ═══════════════════════════════════════════════════════════════════════════════════════
//
// §6.7 IS ONE LINE — "`invest-base-rates` — D.1. 78% → 6%." — and gh#70 built it as the pair
// **78% adoption versus 6% proper implementation**, taken from the REPORTED CONTEXT of the
// group HR agentic-organization deck's slide 3 and recorded at
// `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md` line 106. That source named
// NO upstream owner — no publisher, no study, no year, no sample — so the slide's own
// attribution could claim nothing but WHERE IT HAD BEEN READ.
//
// THAT PAIR WAS RESOURCED ON 2026-08-14 AND IT DOES NOT EXIST. Traced to primary reports,
// "78% adopted, 6% properly implemented" is a CROSS-WAVE MASHUP that blog aggregators
// assembled and no single study states:
//
//   · 78% is McKinsey's own figure from the survey it fielded 16–31 JULY 2024 (n = 1,491,
//     101 nations), published 12 March 2025 as "The state of AI: How organizations are
//     rewiring to capture value": "78 percent of respondents say their organizations use AI
//     in at least one business function". THAT report's maturity figure is ONE PER CENT, not
//     six — "only 1 percent of company executives describe their gen AI rollouts as
//     'mature'", from the complementary Superagency survey quoted inside it.
//   · 6% is McKinsey's figure from the NEXT wave, fielded 25 June – 29 July 2025
//     (n = 1,993, 105 nations), published 5 November 2025 as "The state of AI in 2025:
//     Agents, innovation, and transformation" — and in THAT report the adoption figure is
//     88%, not 78%: "88 percent report regular AI use in at least one business function,
//     compared with 78 percent a year ago."
//
// SO THE TWO NUMBERS ARE ONE YEAR APART, AND THE SLIDE NOW QUOTES THE LATER WAVE ALONE.
// Both figures below — 88% and 6% — come from the November 2025 report and from no other
// document: 88% is what it measured, and 6% is its own defined class. One report, one sample,
// one field window, one citation. That is the whole reason the figures moved: the pair the
// ticket asked for could not be sourced, and the pair that replaced it can be, from a single
// page.
//
// ═══ AND THE THIRD FIGURE — 78%, the report's OWN year-ago comparison — WAS CUT ON THE
// OWNER'S CALL, later the same day. It was sourced and correctly dated; it was also a SECOND
// ARGUMENT. The stage spent a pose filling the left field to 78 and a pose adding ten more
// squares, and what the room took from those two poses was "adoption is rising", which is not
// what this slide concludes. The slide now says WHERE EVERYONE IS, once. 78% may not come
// back as a figure, a note or a clause: `REFUSED_FIGURES` in the test does not list it (it was
// this slide's own for one day) but `the two rates` does, by pinning the stage's number-shaped
// tokens to exactly "88%" and "6%".
//
// ═══ WHAT "6%" ACTUALLY MEANS, AND WHY THE LABEL NO LONGER SAYS "PROPERLY". The report's
// definition is FINANCIAL and it is quoted here in full because the old label paraphrased it
// into something it does not say: "Respondents who attribute EBIT impact of 5 percent or more
// to AI use and say their organization has seen 'significant' value from AI use — our
// definition of AI high performers, representing about 6 percent of respondents." So 6% is
// not "implemented properly", which is a judgement nobody published; it is EARNING, at a
// stated threshold, in the survey's own words. {@link investBaseRatesContent.implementationLabel}
// therefore prints the survey's own term — AI HIGH PERFORMERS — and the citation carries the
// definition. Do not restore "PROPERLY": it was the one word on the old stage that claimed
// more than any source said.
//
// ═══ THE FIGURES THIS SLIDE STILL MAY NOT PRINT, and the list grew with the resourcing:
//
//   · 25% and 55% — a 25–55% productivity improvement sits in the SAME sentence of the HR
//     research as the old pair. It is a different claim (what adoption was worth to those who
//     got it right, not how many got there) and proof of value is D.2's job, made with the
//     room's own organisation. gh#70's AC forbids inventing a statistic around the pair, and
//     quoting a third sourced one would still make this slide two arguments.
//   · 1% — the 2024 wave's maturity figure. It is the honest partner of a 78% ADOPTION
//     headline and this slide no longer makes one: printing 1% beside 88% would cross the
//     waves again in the opposite direction.
//   · 25%, 5.5% — E.5 (`b5-todays-landscape`) already draws an adoption-to-outcome funnel of
//     88 / 25 / 5.5 as three bars. THAT SLIDE AND THIS ONE SHARE THE 88% AND NOTHING ELSE:
//     see the boundary block below, which records the overlap as a known deck-level problem for
//     the owner rather than pretending it away.
//   · 5%, 95%, 4%, 26%, 13%, 8% — MIT NANDA's pilots-to-production share, BCG's future-built
//     and past-proof-of-concept shares, Cisco's Pacesetters, Accenture's front-runners. Each
//     is a real published number and each is a DIFFERENT population; none is quoted here.
//   · 70, 30, "70/30" — four unrelated 70/30s exist in this deck's sources (§6.5's L3 rung,
//     §6.1's adoption-failure split drawn on B.1, an older execution/planning split on the
//     same HR slide 3, and HR slide 12's sharpen-the-axe principle). No string below prints
//     any of them and no drawing on this stage partitions anything into two complementary
//     parts.
//
// ═══ WHAT THE ATTRIBUTION MAY NOW CLAIM, WHICH IS MORE THAN IT COULD BEFORE — and it is
// still bounded. {@link investBaseRatesContent.citation} names the publisher, the report, the
// month of publication, the sample size and the number of nations, because every one of those
// is IN the report. It does NOT name a page, a URL, an author, or a read date, because a
// citation is not a bibliography and this deck holds no page numbers. The field window went
// with the 2026-08-14 trim: the month of publication and the title identify the wave, and a
// second date on the same line bought a reader nothing and cost the room a second line.
//
// ═══ THE POPULATION IS RESPONDENTS, AND THE STAGE SAYS ORGANIZATIONS. The report's own unit
// is the RESPONDENT — one senior participant per organization, GDP-weighted across 105 nations
// — and {@link investBaseRatesContent.unitEyebrow} draws a square per ORGANIZATION. That is
// the report's own gloss ("their organizations use AI") and not this deck's invention, but it
// is a gloss, so it is written down here: the eyebrow is the one string that would have to
// change if the reading were ever contradicted. The three figures would not.
//
// ═══ WHAT THIS SLIDE MAY NOT SAY, because a sibling owns each of these:
//
//   · THE HARDEST PART, the 70%, `procured` / `instantly` / `invoice` / `tool access` /
//     `organizational capability` / `earned` / `people & process` → §6.1 (B.1). B.1's image is
//     one bar PARTITIONED 70/30; this stage's is two hundreds of one repeated square.
//   · SHADOW AI, SOPs, MISSING GUIDANCE, IMPROVISATION → §6.2 (B.2), and §6.2 binds the deck's
//     three shadow-AI passes to share no image and no statistic. This slide is not one of the
//     three and names none of it.
//   · NANOVEST'S OWN FAILURES and THE PATTERN ACROSS THEM → §6.3 / §6.4 (B.3, B.4). Nothing
//     below is in the first person and nothing below is a story.
//   · L1–L5, THE RUNGS, `capability` → §6.5 (B.5).
//   · THE SIX PILLARS, KOTTER/TAM, MIDDLE-OUT → §6.6 (section C).
//   · THIS COMPANY'S OWN FIGURES, and any organisation's name → D.2, the block at the top of
//     this file. NOT ONE ORGANISATION IS NAMED ON THIS STAGE — the survey's publisher is a
//     CITATION, not a subject — which is also why there is no brand axis (below).
//   · THE DEADLOCK, SHARED ACCOUNTS, `you are the person who can skip` → D.3.
//   · DATA RESIDENCY, THE THREE DESTINATIONS, SHADOW AI AS EXPOSURE → D.4.
//   · SEATS, PRICES, THE ARITHMETIC → D.5. NO PRICE APPEARS BELOW: the closer prices the
//     DEFAULT in the sense of "what it buys you", and the only currency on this stage is the
//     two percentages.
//
// ═══ THE ONE OVERLAP THIS BLOCK DOES NOT RESOLVE, recorded rather than hidden. E.5
// (`b5-todays-landscape`, `src/slides/landscape-section-b/content.ts`) opens on the SAME 88%
// from the SAME publisher, captioned "of organizations have adopted AI", and its chart title
// is "Adoption is not outcome." — one letter-section later in the leader deck than this
// slide. D.1 and E.5 therefore make adjacent arguments off one shared figure. Three things
// keep them from being the same slide: the IMAGE differs (two hundreds of squares against
// three horizontal bars), the SECOND figure differs (6% AI high performers, an EBIT
// threshold, against 5.5% measurable ROI), and the ARGUMENT differs — E.5 asks what adoption
// produced, D.1 asks what a common position is worth. THE THIRD SEPARATOR IS GONE since the
// 2026-08-14 owner cut: D.1 used to carry a year-over-year move (78% → 88%) that E.5 does not,
// which made its base rate a TREND rather than a level. Whether the deck wants both slides at
// all is the owner's call and not this file's; what this file will not do is paper over the
// overlap by inventing a different statistic for D.1.
//
// ═══ ONE CONTENT BLOCK, NO BRAND AXIS, NO `…For(brand)` RESOLVER — the second block in this
// file to make that call, after D.3's, and the plainer of the two. §4.4's seven brand ×
// deckSet slots do not list this slide; the figures are one publisher's survey of
// organisations in general, and neither Berau nor GEMS has a version of a base rate. A
// `Record<Brand, …>` here would be one honest entry and two written by inventing evidence.
// The slide file imports no `VARIANT` at all — see `./invest-base-rates.tsx` for the measured
// census — which is what lets its test mount the same component under both leader brands and
// prove the two rooms read identical bytes. Do not invent variance here: the brand-varying
// proof is D.2's job, one slide later.
//
// ═══ THE KEYWORD RULE, applied without an exception: `kw` on PROSE ONLY.
//
//   · PROSE, each with a `*Kw` sibling — FOUR strings: `headline`, `adoptionReading`,
//     `implementationReading`, `closer`.
//   · LABELS, carrying no `*Kw` and forbidden from gaining one — NINE strings: `figLabel`,
//     `unitEyebrow`, `citation`, the two figures, the two rate labels and the two notes.
//     THE TWO FIGURES ARE THE SHARPEST CASE THE RULE HAS ANYWHERE IN THIS FILE: they are
//     somebody else's quantities, and a copper italic inside "88%" would emphasise a fragment
//     of a number. They are also what `./base-rates-geometry.ts` cuts the two grids' fills
//     from, so a reword that moved a figure and left a fill alone is a lie — welded by a
//     cross-module assertion in the test, exactly as B.1 welds its bar.
//
// ═══ NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). This slide composes as
// the FIRST of the `invest` run, which today means D.1 — §6.7's own number for it. Neither
// figure is written down here: `FigLabel` takes a LABEL only. THE TWO PERCENTAGES AND THE
// CITATION'S OWN NUMERALS ARE THE ONLY DIGITS ON THE STAGE.

export const investBaseRatesContent = {
  /** The `FigLabel`'s LABEL. The letter and number in front of it are DERIVED from the
   *  composed deck (§3.5) and are authored nowhere.
   *
   *  IT WAS "THE BASE RATE, AND THE DEFAULT IT PRICES" until 2026-08-14. The second half was
   *  a promise the stage never kept — nothing on it was a default and nothing was priced —
   *  and "WHAT IT EARNS" is what the resourced figures actually compare: a rate of use
   *  against a rate of return. Same register, same length, one claim instead of two. */
  figLabel: "THE BASE RATE, AND WHAT IT EARNS",

  /**
   * The claim, as the slide's title phrase — and it lands BEFORE any figure on purpose.
   *
   * THE NUMBERS ARE EVIDENCE FOR THIS SENTENCE, NOT THE OTHER WAY ROUND (B.1's rule, and the
   * same reason its headline precedes its statistic): a stage that opened on "88%" would make
   * a room work out what the number was evidence for, and the first thing it would try is "we
   * are doing well". This sentence refuses that reading before a square is filled.
   *
   * "PROFITS" IS THE SURVEY'S OWN GROUND AND NOT A FLOURISH. The 6% is defined by EBIT
   * impact, so the verb the pair actually supports is a financial one — which is also what
   * makes this headline different from E.5's "Adoption is not outcome." one section later:
   * that slide argues about OUTCOME, this one about MONEY.
   *
   * IT IS A REFUSAL AND NOT AN ACCUSATION. It says nothing about the room's own adoption —
   * the slide names no organisation at all — so a Div Head who has already rolled out
   * licences is being told what that puts them level with, rather than that it was wrong.
   */
  headline: "Almost everyone adopted. Almost nobody profits.",
  headlineKw: ["Almost nobody profits"],

  /**
   * The mono LABEL over the evidence, and it carries the UNIT both grids are drawn in.
   *
   * ONE DUTY, AND IT USED TO CARRY TWO. Until 2026-08-14 it read "THE REPORTED BASE RATE ·
   * EACH FIELD IS A HUNDRED ORGANIZATIONS, ONE SQUARE EACH" — 79 characters, of which the
   * first 22 said again what the figure caption above already says. What a room needs before
   * it looks at a field of squares is the UNIT, because a field of squares with no stated
   * unit is decoration. So the eyebrow states the unit, once, in the shortest sentence that
   * states it. Keyword-free; see the block header on why ORGANIZATION is the report's own
   * gloss on its RESPONDENT unit.
   */
  unitEyebrow: "ONE SQUARE IS ONE ORGANIZATION IN A HUNDRED",

  /**
   * THE CITATION, printed ON the stage, above both fields, and ONE line for both.
   *
   * WHAT IT CLAIMS, all of it from the report itself: the publisher, the report's title, the
   * month it was published, the sample size, the number of nations, and the definition the 6%
   * is the 6% OF. WHAT IT DOES NOT CLAIM: a page, a URL, an author, a read date, or that this
   * deck verified anything the report asserts.
   *
   * IT WAS TWICE THIS LONG UNTIL 2026-08-14 — 360 characters over two lines, which is a wall
   * of legal text above the evidence it licenses and which nobody in the fourth row reads. It
   * lost the report's subtitle, the field window, and the words "published", "respondents
   * across" and "attributed to". It lost NO fact a reader would need to find the report or to
   * know what the rare class is. One line, ≈165 characters, same document.
   *
   * IT IS ONE STRING BECAUSE THERE IS ONE SOURCE, and that is the credibility this slide runs
   * on rather than an economy: splitting it into two plate captions would say two studies, and
   * two studies is exactly what the figure this slide replaced turned out to be (see the block
   * header). It stays ABOVE the fields so no frame of this slide ever shows an unattributed
   * percentage.
   *
   * "FIVE PERCENT" IS SPELLED IN WORDS ON PURPOSE and may not become "5%": the stage may print
   * no percentage but its own two, and the test sweeps the rendered stage for number-shaped
   * tokens.
   *
   * Mono, keyword-free: it is a citation, not a sentence the slide makes a point with.
   */
  citation:
    "McKinsey · “The state of AI in 2025” · November 2025 · 1,993 respondents in 105 nations · " +
    "high performers: five percent or more of EBIT from AI, and significant value.",

  /**
   * The adoption rate the survey measured: "88%".
   *
   * The number `./base-rates-geometry.ts` cuts `ADOPTION_SHARE` = 0.88 from, and the one the
   * left field rests at. A reword that changed this and left the fill alone is the failure
   * nobody would see on a projector, so the two are welded by a cross-module assertion in
   * `tests/unit/invest-base-rates.test.tsx`.
   *
   * THE 78% IS GONE, AND THAT IS THE 2026-08-14 OWNER CUT. The report's own sentence carries a
   * year-ago comparison — "88 percent … compared with 78 percent a year ago" — and this slide
   * used to spend a whole pose on it, filling the left field to 78 and then adding ten
   * squares. What the room has to know is WHERE EVERYONE IS. The rise was a second argument in
   * a slide that makes one, so the stage states the current rate, once, and `priorFigure`,
   * `priorNote` and `PRIOR_SHARE` no longer exist anywhere in this slide.
   */
  adoptionFigure: "88%",

  /**
   * The left field's label — what the 88% are 88% OF, in the plainest words that stay true.
   *
   * IT USED TO READ "REPORT REGULAR AI USE IN ONE BUSINESS FUNCTION OR MORE", which is the
   * report's own predicate carried onto a stage whole. "Business function or more" is survey
   * grammar: a room has to parse it before it can read the number above it, and a label that
   * needs parsing is a label the room reads instead of the figure.
   *
   * "SOMEWHERE IN THE BUSINESS" IS THE SAME CLAIM IN PLAIN WORDS. The report measures regular
   * use in AT LEAST ONE business function — that is, use somewhere in the business and not
   * everywhere in it — and the word does the qualifier's whole job while sounding like
   * something a person would say. "REGULARLY" stays and is load-bearing: this is not "have
   * bought licences". Mono, keyword-free.
   */
  adoptionLabel: "USE AI REGULARLY, SOMEWHERE IN THE BUSINESS",

  /** The note under the left figure. Mono, keyword-free. It says WHERE the rate comes from —
   *  the survey the citation names — which is what stops the two fields from reading as two
   *  studies disagreeing. It carried "· UP FROM 78%" until the year-ago comparison was cut. */
  adoptionNote: "THIS SURVEY",

  /** The share the same survey calls AI high performers: "6%". The other end of the same weld
   *  — `IMPLEMENTATION_SHARE` is 0.06 because this string says 6%. */
  implementationFigure: "6%",

  /**
   * The right field's label — THE SURVEY'S OWN TERM, and the string that carries the whole
   * correction recorded in the block header.
   *
   * IT USED TO READ "HAVE IMPLEMENTED IT PROPERLY", which no source says: the report defines
   * this class financially (EBIT impact of at least 5% attributed to AI, plus self-reported
   * significant value) and calls it AI HIGH PERFORMERS. The definition is in the citation
   * above, so the label can be the term itself. Mono, keyword-free, and it may not regain the
   * word "properly".
   */
  implementationLabel: "ARE AI HIGH PERFORMERS",

  /** The note under the third figure. Mono, keyword-free, and it does the one job the two
   *  fields cannot do by themselves: it says the rare rate and the common one were measured in
   *  the SAME survey, of the SAME respondents, so the gap between the two fields is not two
   *  studies disagreeing. */
  implementationNote: "THIS SURVEY, SAME RESPONDENTS",

  /**
   * What the common rate is worth. PROSE, so it carries keywords.
   *
   * THE SENTENCE MAKES NO CLAIM ABOUT DIFFICULTY, which is the boundary with B.1: that slide
   * argues adoption is the EASY 30% and capability the hard 70%. This one argues only that
   * adoption is CROWDED.
   *
   * "AND IT IS STILL FILLING UP" WENT WITH THE 78%. That clause read the year-over-year rise,
   * and the rise is no longer on the stage — a sentence that describes a movement the room
   * cannot see is a claim it has to take on trust.
   */
  adoptionReading: "Adoption is the common position. Holding it proves nothing.",
  adoptionReadingKw: ["the common position", "proves nothing"],

  /**
   * What the rare rate is worth. PROSE, and the mirror of the line beside it: COMMON against
   * RARE, PROVES NOTHING against WORTH PAYING FOR.
   *
   * "WORTH PAYING FOR" IS THE SECTION'S OWN VERB and the reason this slide opens WHY INVEST:
   * scarcity is the investment case, stated once and left for D.2 to evidence with the room's
   * own numbers. It says nothing about HOW to reach the rare position — that is the rest of
   * the deck — and it names no cost, which is D.5's.
   */
  implementationReading:
    "Earning from it is the rare position. Few hold it, so it is worth paying for.",
  implementationReadingKw: ["the rare position", "worth paying for"],

  /**
   * THE CLOSER — the slide's last arrival, and the line the room leaves with. PROSE.
   *
   * IT IS NOT §4.5's THESIS, which is a different string in
   * `src/slides/opening-section-a/content.ts` and belongs to A.1 and D.2. This one is local to
   * D.1 and prices the base rate above it.
   *
   * ONE SENTENCE AND NOT TWO, WHICH IS A DECISION. B.1's closer is a pair whose second half
   * frames the run behind it ("Everything after this is the 70%"), and a second sentence here
   * would be that move made twice in one deck. It also counts nothing and names no position:
   * the run this slide opens is composed per deck set (§3.4), so a sentence that counted its
   * own successors would go stale the first time one was inserted or cut.
   *
   * 19px AND ON THE FLOOR OF THE STAGE, which is `./base-rates-geometry.ts`'s decision and is
   * recorded there: it used to be 22px in the middle of the lower half, where it competed with
   * the figures and read as their caption.
   */
  closer: "Doing what everyone does buys what everyone gets.",
  closerKw: ["what everyone gets"],
} as const;

// ─────────────────── WHY INVEST · BRIDGE OUT (gh#72) ───────────────────

/**
 * The bridge out of the leader deck's front block and into the retained curriculum —
 * leader decks only, and the biggest tonal change in either deck.
 *
 * IT CARRIES TWO RUNS, NOT ONE, and that is why beat 1 names both. `shape` ships no
 * bridge of its own (see `../leader-gap/content.ts`'s `gapBridgeContent` for the
 * argument), so this stage is the last word for THE SHAPE and WHY INVEST together:
 * "The shape is drawn" is C's, "The case is made" is D's, and `shape` / `case` are
 * each run's own vocabulary rather than a summary word invented here.
 *
 * BEAT 1 LINE B IS THE WHOLE REASON THIS SLIDE EXISTS. §4.3 retains curriculum
 * sections E–J verbatim and has them SKIMMED live, and until this bridge landed the
 * deck went from a governance sentence straight into "FROM RULES TO REASONING" with
 * nothing said about why forty slides were about to go past at speed. "Neither one
 * teaches a single person" is the reason, stated as the argument's own next step: an
 * operating model and a budget create no capability, and what follows is what does.
 *
 * NO COUNT IN ANY STRING. "Forty slides" is a fact about the composed deck (§3.4) and
 * would go stale on the next insert — the bridge says what the run IS, never how long
 * it is, and beat 2 hands off in prose because the letter is derived.
 */
export const investBridgeContent = {
  heroSrc: "/heroes/invest-to-curriculum-bridge.jpg",
  figLabel: "BRIDGE · CURRICULUM",
  beat1: {
    lineA: { text: "The shape is drawn. The case is made.", kw: ["shape", "case"] },
    lineB: { text: "Neither one teaches a single person.", kw: ["teaches"] },
  },
  beat2: { text: "Next: what your people actually learn.", kw: ["actually learn"] },
} as const;

// ───────────────────── §6.7's D.2 · the surface, and what holds it up ─────────────────────
//
// ═══════════════════════════════════════════════════════════════════════════════════════
// ═══ THE SLIDE THE RUN DID NOT HAVE. READ THIS BEFORE EDITING ANY STRING BELOW.
// ═══════════════════════════════════════════════════════════════════════════════════════
//
// NO SLIDE IN EITHER DECK SAYS THAT A FINISHED-LOOKING RESULT PROVES NOTHING, and a sweep
// of `src/` for data readiness, data quality and time-to-prepare found nothing at all. The
// four base-rate slides say projects FAIL; the eight traps in `../application-section-h`
// say an untrained operator SHIPS the wrong thing. Neither says the sentence a division
// head has to leave with, which is that THE ARTIFACT CARRIES NO SIGNAL ABOUT THE WORK
// UNDER IT. That is a different claim from every one of them, and it is the one that
// changes what a leader does in a review.
//
// ═══ IT IS A REFUSAL AND NOT AN ACCUSATION, which is D.1's own gate and the harder half
// of this block. A room of division heads has approved work on exactly the evidence this
// slide is about to disqualify, so every sentence below is written to fault the ARTIFACT
// and never the reader:
//
//   · "Both charts look the same" is a property of two drawings.
//   · "The surface does not tell you which" faults the surface. The verb's subject is the
//     thing on the stage, not the person looking at it.
//   · The specimen is OURS. The two figures in the headline are our own build times on our
//     own work, so the slide opens by disqualifying the presenter's artifact — which is
//     the only artifact in the room nobody has to defend.
//   · NOTHING IS DATED AND NOBODY IS NAMED. No organisation, no vendor, no month.
//
// A ROOM CANNOT BE TOLD IT WAS FOOLED. It can be told that a signal it has used for
// twenty years stopped working, which is the same information with the blame on the tool.
//
// ═══ THE SLIDE CARRIES ITS OWN PROVENANCE MARK, and that is the argument rather than a
// disclaimer. {@link investShowcaseTrapContent.mark} says the two figures are ours and
// that nobody audited them — the same epistemic grammar `investOwnProofContent` puts on
// every card it prints. A slide that asks a room to demand provenance and then shows its
// own cannot be heard as a lecture, and a slide that asked without showing would be the
// exact failure it describes. It also settles a logistics problem in copy: the artifact
// behind these numbers is not publishable, so the mark says SHOWN LIVE and the stage
// carries no link, no screenshot and no address.
//
// ═══ WHAT IS ON THE STAGE, in five poses, and each hero is ONE drawn object:
//
//   0 — THE PICTURE. One finished chart assembles itself and stops, over four empty frames
//       nobody looks at. Beside it, the prompt that built it and three more finished-looking
//       things the same prompt makes. Under both, an effort line filled six pixels of four
//       hundred and eighty. The SPEED is the claim, and the card is the CONCESSION.
//   1 — WHAT IS UNDER IT. The four frames light up and take their names, one at a time and
//       slowly, while the effort line crawls the other seventy-nine eightieths. Nothing
//       leaves the stage. The TEMPO is the claim.
//   2 — TWO CHARTS. The same chart twice, each over its own effort line. One keeps its four
//       rows and its five days; the other has an empty frame and thirty minutes. A scan
//       travels across both and finds no difference on top.
//   3 — THE RECAP. Three cards, each holding a small drawing of the act it recaps, and each
//       turning a finding into a question a leader can ask in any review. This is the pose
//       the room writes down.
//   4 — THE FLOOR. The rule, and the ask alone under it.
//
// ═══ THE COPY RULES THIS BLOCK KEEPS.
//
//   · ASD-STE100 AND ZINSSER, and for this block the measurable form is: no sentence runs
//     past ten words, no sentence carries two claims, every sentence is active voice, and
//     no word is longer than its job. The room is a board, read to in a second language.
//   · THE PLAIN WORD EVERY TIME. `chart` and not artifact, `source` and not provenance,
//     `meaning` and not ontology, `match` and not reconciliation, `check` and not
//     validation. The four rows below are the four expensive things, named in words a
//     division head uses at their own desk.
//   · NO LETTER AND NO NUMBER IN ANY RENDERED STRING (§3.4 R2 / §3.5). This slide composes
//     **D.2** today, second in the `invest` run. `FigLabel` takes a label only.
//   · THE FIGURES ARE PRINTED AS WORDS, NOT DIGITS — "thirty minutes", "five days" — and
//     both are welded to the drawing in `../showcase-trap-geometry.ts`. Neither carries a
//     keyword: a copper italic on a quantity emphasises the count instead of the claim.
//   · AND NEITHER FIGURE IS IN THE HEADLINE. They are printed BESIDE the column that
//     measures them and in the two eyebrows that title the acts, which is where a
//     measurement belongs. The title makes the claim; see the note on `headline`.
//   · THE KEYWORD RULE, unchanged from every block in this file: `kw` goes on PROSE ONLY.
//     · PROSE, each with a `*Kw` sibling — `headline`, `surfaceLine`, `sourceLine`,
//       `twinLine`, `recapLine`, `closer`, and each question's `question`.
//     · LABELS, carrying no `*Kw` and forbidden from gaining one — `figLabel`, the four
//       pose eyebrows, the chart's own title, `mark`, `hollowLabel`, both meter readings,
//       `promptLabel`, `promptLine`, `promptBuildsLabel`, every line of `promptBuilds`,
//       `promptFoot`, and every `label` and `finding` on the four layers and the three
//       questions.
//     · THE PROMPT CARD'S FIVE STRINGS ARE ALL LABELS, and that is deliberate rather than
//       an oversight. A copper italic inside the card would rank a concession against the
//       claim on the shelf under it; the card is the room's own position, quoted without
//       comment, and a slide that emphasises the other side's words is arguing with them.
//
// ═══ WHAT THIS SLIDE MAY NOT SAY, and the sibling that owns each token. Every one of
// these is a live string somewhere else in the composed leader deck, and the whole reason
// this slide can be inserted between D.1 and D.3 is that it repeats none of them:
//
//   · `70%` / `30%` / any "70/30" split ....... B.1 `gap-hardest-part`
//   · `88%` / `6%` ............................ D.1 `invest-base-rates`
//   · `25%` / `5.5%` .......................... E.5 `b5-todays-landscape`
//   · `73%` ................................... G.1 `d1-the-trap`
//   · `vibe coding`, `prompt-and-pray`,
//     `confidently wrong`, `hallucinat*`,
//     `stale data`, `context rot` ............. J.1 `h1-pitfall-wall`
//   · `human-in-the-loop`, `eval-driven` ...... J.2 `h2-discipline-wall`
//   · `shadow AI` ............................. banned deck-wide (§6.2's three passes)
//   · `kill criterion`, `spend cap`, `seats`,
//     `shared accounts` ....................... D.3 `invest-chicken-egg`
//   · `audit`, `revoke`, `managed seat`,
//     `the account` ........................... D.5 `invest-governance`
//   · `not independently audited`,
//     `vendor-reported`, `participant-claimed`  D.4 `invest-own-proof`
//   · `block the time`, `name a champion` ..... K.3 `mandate-levers`
//   · `a gate, not a date` .................... K.2 `mandate-phases-gates`
//
// NO BRAND AXIS, EITHER SLOT. The specimen is ours and the questions are generic, so this
// block imports no `Brand` and both leader decks render it byte for byte — which is a
// claim a test settles by mounting it twice and diffing.

/**
 * One of the four expensive things under a finished chart.
 *
 * `label` IS THE PLAIN NAME and `finding` IS WHAT IT COSTS, in that order, because a room
 * reading four rows at speed needs the noun before the sentence. Both are LABELS in the
 * keyword sense — the noun is a name and the sentence is already the whole of the row —
 * so neither may gain a `*Kw`.
 */
export interface HiddenLayer {
  id: string;
  /** The plain name. Mono caps, keyword-free, and no longer than the label box holds. */
  label: string;
  /** What the layer actually took. One sentence, active voice, keyword-free. */
  line: string;
}

/**
 * One of the three questions the recap hands the room.
 *
 * THE SHAPE IS FINDING → QUESTION, and the order is the argument. `finding` is what the
 * three acts established and `question` is what a leader can do with it tomorrow, which
 * is the only thing on this slide that survives the meeting. The question is the ONE
 * prose string on the row and therefore the one that carries a keyword; `label` and
 * `finding` are a name and a verdict, and both are keyword-free.
 *
 * EVERY QUESTION ENDS IN A QUESTION MARK AND OPENS ON AN INTERROGATIVE. That is the form
 * B.4 already uses for an open question, so the room reads three of them as a set rather
 * than as three more assertions.
 */
export interface TrapQuestion {
  id: string;
  /** The subject, in one or two words. Mono caps, keyword-free. */
  label: string;
  /** What the acts proved about it. Sans, keyword-free. */
  finding: string;
  /** What a leader asks in a review. Serif, and the row's only prose. */
  question: string;
  /** 1–3 substrings of {@link question}. */
  questionKw: readonly string[];
  /** Which mark in `./components/ShowcaseTrapGlyphs.tsx` draws this row. */
  glyph: "chart" | "source" | "decision";
}

/**
 * The four things under the chart, and they are the four EXPENSIVE ones rather than the
 * four technical ones.
 *
 * EXACTLY FOUR, HELD BY THE TYPE. A fifth is a different argument: these are the four
 * stages a number passes through before anybody may sign under it, and each one is a
 * separate day of somebody's week. `../showcase-trap-geometry.ts` pins its row count to
 * this tuple, so a fifth row fails to compile at the number the stack is drawn from.
 *
 * THEY ARE ORDERED BY DEPENDENCY, not by cost. A field with no agreed meaning cannot be
 * matched; two systems that disagree cannot be checked. The stack reads top to bottom as
 * the order the work has to happen in, which is why no row carries a duration.
 */
const HIDDEN_LAYERS: Four<HiddenLayer> = [
  {
    id: "source",
    label: "THE SOURCE",
    line: "Where each number comes from.",
  },
  {
    id: "meaning",
    label: "THE MEANING",
    line: "What each field really means.",
  },
  {
    id: "match",
    label: "THE MATCH",
    line: "Two systems, made to agree.",
  },
  {
    id: "check",
    label: "THE CHECK",
    line: "A person compared it to the real thing.",
  },
];

/**
 * The three questions, and this tuple is the slide's whole deliverable.
 *
 * EXACTLY THREE, HELD BY THE TYPE, and one per act: pose 0 earns the first, pose 1 the
 * second, pose 2 the third. A fourth question would be one the stage never proved.
 *
 * THEY ARE A TOOL AND NOT A TEST. Each one is answerable by the person presenting, costs
 * the asker nothing, and implies no view about the answer — which is what keeps a slide
 * about bad evidence from reading as a slide about bad judgment.
 */
/**
 * The three other things the same prompt makes, and the third one is this deck.
 *
 * EXACTLY THREE, HELD BY THE TYPE. Three reads as a range; four reads as an inventory, and
 * an inventory invites the room to audit it instead of agreeing with it.
 *
 * THEY GO GENERAL → GENERAL → PRESENT. A dashboard and a landing page are things the room
 * has commissioned; the third is the object in front of them right now. The order matters:
 * the first two earn the claim, and the third spends it on the one artifact nobody has to
 * defend.
 */
const PROMPT_BUILDS: Three<string> = [
  "A dashboard.",
  "A landing page.",
  "A deck like this one.",
];

const TRAP_QUESTIONS: Three<TrapQuestion> = [
  {
    id: "chart",
    label: "THE CHART",
    finding: "Fast to make.",
    question: "How long did the data take?",
    questionKw: ["the data take"],
    glyph: "chart",
  },
  {
    id: "data",
    label: "THE DATA",
    finding: "Slow to make, and hidden.",
    question: "Where did each number come from?",
    questionKw: ["each number"],
    glyph: "source",
  },
  {
    id: "decision",
    label: "THE DECISION",
    finding: "Both look the same.",
    question: "Who checked it, and against what?",
    questionKw: ["against what"],
    glyph: "decision",
  },
];

export const investShowcaseTrapContent = {
  figLabel: "THE SURFACE AND THE SOURCE",

  /**
   * The headline, and it is what a division head is buying, in eight words.
   *
   * IT REPLACED "The chart took thirty minutes. The data took five days." on 2026-08-15, on
   * the owner's call, and the fault was that the sentence was EVIDENCE rather than a CLAIM.
   * Two measurements are what the figure below is for — §3's rule is that the label names
   * the figure and the TITLE MAKES THE CLAIM, and a headline reporting a stopwatch leaves
   * the room to work out what it was told. The two figures did not leave the stage; they
   * moved to where they are measured, beside the drawing that measures them
   * ({@link investShowcaseTrapContent.surfaceReading}, {@link
   * investShowcaseTrapContent.sourceReading}) and into the two eyebrows that title the acts.
   * The old sentence was also 55 characters against this one's 41, which is the other half
   * of the problem — see the note on length below.
   *
   * IT IS A PURCHASE AND NOT A WARNING, which is what puts it in WHY INVEST. The room is
   * not told it has been fooled; it is told what its money is actually for. "You are buying
   * the work" is a sentence a division head can repeat to a board without conceding
   * anything, and the whole risk of this slide is a room that has to concede something
   * before it can agree.
   *
   * THE SUBJECT IS THE PURCHASE AND NOT THE BUYER. "You are buying the work, not the
   * picture" describes a transaction; "do not be fooled by the picture" describes a person.
   * Same information, and only one of them can be said to a room that has approved work on
   * exactly the evidence this stage is about to disqualify.
   *
   * BOTH KEYWORDS ARE NEEDED, and they are the two halves of the contrast — the same call
   * D.5's `answerLine` makes. "the work" alone is a platitude and "not the picture" alone is
   * a rebuke; the pair is the claim.
   *
   * IT MUST FIT ONE LINE, and that is geometry rather than taste. `.slide-headline.small` is
   * 40px on 1.05 from `top: 80`, so ONE line ends at y=122 and the eyebrow shelf starts at
   * 156; a second line would end at 164 and print through it.
   * {@link HEADLINE_BUDGET_CHARS} in `../showcase-trap-geometry.ts` holds the ceiling and a
   * test holds this string against it.
   *
   * IT SHARES NO WORD WITH {@link investShowcaseTrapContent.figLabel}. The label names the
   * two halves of the drawing (the surface, the source) and the title names the trade; a
   * title in its label's words is a caption.
   */
  headline: "You are buying the work, not the picture.",
  headlineKw: ["the work", "not the picture"],

  /** Pose 0's eyebrow. Mono, keyword-free. It states the input, so the drawing under it
   *  reads as an output rather than as a diagram in search of a caption. */
  surfaceEyebrow: "THIRTY MINUTES · ONE PROMPT",

  /**
   * The chart's own title, and it is deliberately the dullest string on the stage.
   *
   * A GENERIC BUSINESS NOUN, because the specimen may not be interesting. The moment this
   * says something a room recognises, the room starts assessing the chart instead of the
   * argument about charts. Mono, keyword-free.
   */
  chartTitle: "QUARTERLY VIEW",

  /**
   * POSE 0's LINE.
   *
   * "AS A PICTURE" IS THE WHOLE CONCESSION, and it has to be a concession rather than a
   * complaint. The chart IS complete: the work of making a picture is genuinely finished,
   * which is why the room was right to find it impressive. The sentence grants that in
   * full and moves the incompleteness to a word the next pose can open.
   *
   * "AI MODELS DESIGN WELL NOW" IS THE CAPABILITY CLAIM, AND THE CARD ABOVE IT IS ITS PROOF.
   * {@link investShowcaseTrapContent.promptLine} asks for no layout, no labels and no
   * colour, and the chart on the stage has all three — so the design on this stage was not
   * specified by anyone, and the claim is about the model rather than about the typing. A
   * room that has watched one line of typing produce a presentable artifact already believes
   * this; the sentence says it out loud so the concession is complete before pose 1 argues.
   *
   * "NOW" IS THE SAME TENSE {@link investShowcaseTrapContent.recapLine} CLOSES ON. Both
   * sentences report a change in the market, not a fault in anyone's judgment — which is
   * what keeps three acts about hidden cost from reading as three acts about bad taste.
   *
   * THREE CLAUSES AND 79 CHARACTERS against {@link SENTENCE_BUDGET_CHARS} in
   * `../showcase-trap-geometry.ts`, which allows 80, each clause
   * inside ASD-STE100's ten words. It is the longest line on this shelf, and there is no
   * room for a fourth.
   */
  surfaceLine: "One prompt built this. AI models design well now. As a picture, it is complete.",
  surfaceLineKw: ["As a picture"],

  /**
   * THE PROMPT CARD — five strings, and together they are the slide's CONCESSION.
   *
   * WHY A CONCESSION IS ON THE STAGE AT ALL. The room in front of this slide has approved
   * work on exactly the evidence the next two poses disqualify, and a room that has to
   * concede something before it can agree will not agree. So pose 0 agrees FIRST, in the
   * room's own terms and without a caveat: one line of typing, and three more finished-
   * looking things the same speed produces. Everything on this card is true, none of it is
   * hedged, and the argument does not start until pose 1.
   *
   * `promptLabel` NAMES WHOSE TYPING IT IS. "WHAT WE TYPED" and not "THE PROMPT", because
   * the specimen is ours — the same reason `mark` says OUR OWN WORK. It also keeps the word
   * "prompt" off a third shelf; the eyebrow and the act line already carry it.
   *
   * `promptLine` IS THE ARTIFACT AND NOT A DESCRIPTION OF ONE. It is set in the mono
   * register behind a chevron, so a room reads it as the thing that was typed rather than as
   * a sentence about typing.
   *
   * IT NAMES ITS DATA, AND THAT IS THE HALF THE OLD LINE DID NOT HAVE. "Make a quarterly
   * view of this." was replaced on 2026-08-16, on the owner's call, and the fault was that a
   * lazy prompt gives the room a way out: write a better prompt and the cost goes away. This
   * one points at the file the four rows under the chart produce, so the prompt is already
   * competent and pose 1 cannot be answered by improving it. The attached data IS the five
   * days — the typing is the thirty minutes.
   *
   * IT ASKS FOR NO DESIGN. No layout, no labels, no colour, and the chart on the stage has
   * all three. That silence is what {@link investShowcaseTrapContent.surfaceLine} spends: a
   * prompt that had specified the design would make the result obedience, and the sentence
   * under the card claims capability.
   *
   * 45 CHARACTERS against {@link PROMPT_LINE_BUDGET_CHARS} in `../showcase-trap-geometry.ts`,
   * which allows 46. It is one typed line and it may not become two: the card sets it
   * `nowrap`, and the typewriter reveal steps once per character across a single row.
   *
   * `promptBuilds` IS THREE AND THE THIRD ONE IS THIS DECK. Naming the artifact the room is
   * looking at is the safest way to make the point: nobody in the room has to be the example,
   * because the presenter already is. It is also simply true, and a slide that asks for
   * provenance while hiding its own would fail its own second question.
   *
   * `promptFoot` IS THE PIVOT, AND IT ACCUSES NOBODY. "All of it looks finished" is a
   * statement about four artifacts, not about anyone's judgment of them — and "looks" is the
   * one word pose 1 needs to have been said out loud before it can say what does not show.
   */
  promptLabel: "WHAT WE TYPED",
  promptLine: "Use the attached data. Make a quarterly view.",
  promptBuildsLabel: "IT ALSO BUILDS",
  promptBuilds: PROMPT_BUILDS,
  promptFoot: "All of it looks finished.",

  /**
   * The mark, and it is the slide's argument turned on itself.
   *
   * THREE TOKENS, EACH DOING ONE JOB. `OUR OWN WORK` names whose artifact is on trial —
   * ours, so nobody in the room has to defend anything. `SELF-REPORTED` is the epistemic
   * mark the two figures in the headline require, in the same grammar
   * `investOwnProofContent` uses on every card it prints: nobody audited our stopwatch.
   * `SHOWN LIVE` is why the stage carries no link — the artifact behind these numbers is
   * not publishable, and a slide that promised a reference it cannot give would fail its
   * own third question.
   *
   * IT SITS ON THE EYEBROW'S OWN SHELF, RIGHT-ALIGNED, on every pose that has our specimen
   * on the stage. That is the one place a second mono line cannot be read as a caption for a
   * drawing or as a heading for the column under it — and it puts the provenance where a
   * reader looks for it on a printed figure, at the top, beside the title.
   *
   * Mono, keyword-free: it is three tokens, not a sentence.
   */
  mark: "OUR OWN WORK · SELF-REPORTED · SHOWN LIVE",

  /** The reading at the HEAD of the effort line — the point six pixels along it that the
   *  picture's own cost reaches. Mono, keyword-free, and on the stage from pose 0: it is
   *  what the extension tick under it is pointing at. */
  surfaceReading: "THIRTY MINUTES",

  /** The reading at the FOOT of the same line, four hundred and eighty pixels further on.
   *  Mono, keyword-free. It arrives when the line does. */
  sourceReading: "FIVE DAYS",

  /** Pose 1's eyebrow. Mono, keyword-free. "NOBODY SEES THIS" is the half that makes the
   *  slide a trap rather than a cost breakdown: the four rows below are not merely
   *  expensive, they are INVISIBLE, and invisible is what the acts have to establish
   *  before pose 2 can land. */
  sourceEyebrow: "FIVE DAYS · NOBODY SEES THIS",

  layers: HIDDEN_LAYERS,

  /**
   * POSE 1's LINE.
   *
   * "NOT ONE OF THEM SHOWS" AND NOT "NONE OF THEM SHOWS". Same meaning, and the emphatic
   * form is what a sentence needs when it is the one the whole slide turns on. It is also
   * the plainer of the two read aloud in a second language.
   *
   * THE SUBJECT IS THE WORK AND NOT THE VIEWER. "Nobody sees them" would put a person in
   * the sentence; "not one of them shows" leaves the fault with the four rows, which is
   * this block's rule.
   */
  sourceLine: "Four things sit under it. Not one of them shows.",
  sourceLineKw: ["Not one of them shows"],

  /** Pose 2's eyebrow. Mono, keyword-free. */
  twinEyebrow: "TWO CHARTS · ONE SURFACE",

  /**
   * What the second chart has under it, printed inside the empty frame.
   *
   * IT NAMES AN ABSENCE, WHICH A DRAWING CANNOT. An empty dashed frame beside a stack of
   * four full ones reads as "not drawn yet" unless something says otherwise, and the one
   * reading this slide cannot afford is that the right-hand chart is unfinished. It is
   * finished. That is the point. Mono, keyword-free.
   */
  hollowLabel: "NOTHING UNDER IT",

  /**
   * POSE 2's LINE, and it is the sentence the deck did not have.
   *
   * "THE SURFACE DOES NOT TELL YOU WHICH" — the verb's subject is the surface. Every
   * other way of writing this sentence puts the room in it ("you cannot tell which",
   * "nobody can tell which"), and a division head who has approved work on a surface
   * hears those as a verdict on themselves. This one is a statement about a drawing.
   *
   * IT ASSERTS NO CONSEQUENCE. There is no "and that is dangerous", no "and it gets
   * signed". A room that has just watched two identical charts with different foundations
   * does not need the consequence spelled out, and spelling it out is where a slide like
   * this turns into a warning.
   */
  twinLine: "Both charts look the same. The surface does not tell you which.",
  twinLineKw: ["The surface does not tell you which"],

  /** The recap's eyebrow. Mono, keyword-free, and it says what the pose is FOR — three
   *  boxes under a heading that promises questions read as a tool, and the same three
   *  under a heading that promised findings read as a summary. */
  recapEyebrow: "THREE QUESTIONS TO ASK",

  questions: TRAP_QUESTIONS,

  /**
   * POSE 3's LINE — the sentence the whole run was for, and the one a board repeats.
   *
   * IT NAMES THE PURCHASE, WHICH IS WHY THIS SLIDE IS IN "WHY INVEST". Three acts have shown
   * that the picture is cheap and the work under it is not; without this line the room
   * leaves with a warning, and a warning is not a budget decision. "Getting it right is the
   * investment" is the same claim the headline makes, said in the room's own accounting
   * word, at the moment the room has just been handed the three questions that spend it.
   *
   * "SPEED IS CHEAP NOW" IS A COMPLIMENT AND NOT A COMPLAINT. It grants the thing the room
   * already believes — and grants it in the present tense, as a change in the market rather
   * than as a fault in anyone's judgment. What follows is what the money is for. Nobody has
   * conceded anything and nothing has been taken away.
   *
   * IT PROMISES NO NUMBER AND NAMES NO PROGRAMME. Not "the right investment is a pilot",
   * not "budget for specs" — the sentence is about what a leader is buying, and the slides
   * behind it are where the mechanism belongs.
   */
  recapLine: "Speed is cheap now. Getting it right is the investment.",
  recapLineKw: ["Getting it right", "the investment"],

  /**
   * THE THESIS — the one line this slide asks the room to leave with, on §4.5's shelf.
   *
   * IT IS AN INSTRUCTION AND THE OTHER THREE PROSE LINES ARE STATEMENTS, which is the
   * same division D.5's closer makes and for the same reason: three observations followed
   * by a fourth observation is a slide with no ask in it. "Ask what is under it" is the
   * shortest ask this argument has, and the room can act on it in the next meeting they
   * sit in.
   *
   * "THAT QUESTION COSTS NOTHING" IS THE HALF THAT MAKES IT SAFE TO GIVE. The whole risk
   * of this slide is that a room hears it as "you have been approving the wrong things";
   * the second sentence reframes the ask as free rather than as remedial — nobody has to
   * concede anything to start asking it, and a question that costs nothing needs no
   * admission behind it.
   *
   * IT NAMES NO ARTEFACT AND NO ROLE. Not "under the chart", not "of your team" — "it"
   * is whatever the room is looking at next week, which is every artifact rather than
   * this one.
   *
   * IT FOLLOWS `recapLine` ON ONE SHELF AND DOES NOT SIT BESIDE IT. Pose 3 names what the
   * room is buying; pose 4 names the one thing it can do about it on Monday. Two sentences
   * on one shelf, in that order, is a claim followed by an ask — and the second one only
   * costs nothing because the first one has already said what the money is for.
   *
   * ONE LINE, full width, 19px upright on the same shelf D.1, D.3, D.4 and D.5 use — and,
   * since the 2026-08-16 redraw, the same shelf this slide's own four other sentences use.
   */
  closer: "Ask what is under it. That question costs nothing.",
  closerKw: ["what is under it", "costs nothing"],
} as const;
