// Section WHY INVEST — every string its two built slides print, and the one axis
// one of them varies on.
//
// TWO SLIDES, ONE MODULE: `invest-own-proof` (§6.7's D.2) above, and
// `invest-chicken-egg` (§6.7's D.3) in the block at the bottom of this file. The
// module is the SECTION's — as in `leader-gap` and `leader-shape`, which are named
// the same way — so a second slide's copy belongs IN it rather than beside it, and
// §6.2's rule that the deck's three shadow-AI passes may share no image and no
// statistic is easier to keep in one file than across two.
//
// Spec §6.7 (content for both) · §6.2 (the three shadow-AI passes, which bound
// D.3's copy) · §4.4 slot 3 (D.2's brand axis — and the reason D.3 has none) ·
// §4.5 (the thesis line) · §12.3 item 2 (the GEMVIS figures are vendor-reported).
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
// WHAT IS DELIBERATELY NOT IN THIS FILE, because no ticket has rendered it yet:
// §6.7's D.1 (`invest-base-rates`, 78% → 6%), D.4 (`invest-security`, #58) and D.5
// (`invest-subscription`, #59). None of their copy is written here early. Dead copy
// that reads as finished is how unreviewed copy ships — the next edit "just fills it
// in", and the argument nobody agreed to is on a projector. Same reasoning as the top
// of `src/slides/leader-shape/content.ts`.
//
// D.3 CAME OFF THAT LIST when #57 rendered it (the block at the bottom of this file),
// AND THE LIST NAMED THE WRONG TICKET FOR D.1 — recorded rather than quietly deleted,
// because the next author would otherwise go looking for a Phase 6 ticket that does
// not exist. The old text said D.1 through D.5 "are #57–#59". Checked on 2026-08-05
// with `gh issue view 57` and `gh issue list`: #57 is D.3 (this ticket), #58 is D.4,
// #59 is D.5, and NO issue covers `invest-base-rates` at all — §11's phase table puts
// it in the PHASE 7 row ("Leader new slides, second tier", line 1408), next to
// `gap-no-sop`. So D.1 is not waiting on a Phase 6 ticket; it is not in this phase.
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
//      BOTH OF THOSE PASSES ARE UNBUILT AS OF 2026-08-05, so this check is against
//      their SPEC text and not against rendered copy — which is the honest limit of
//      it. `gap-no-sop` (B.2) sits in §11's Phase 7 row and `src/slides/leader-gap/`
//      holds only the Capability Ladder; `invest-security` (D.4) is #58. The one place
//      either pass's vocabulary is already on a stage is `leader-shape/content.ts`'s
//      governance decision ("where the data may go … before someone improvises"),
//      which is C.1 indexing them on purpose — and nothing below repeats either
//      anchor.
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
// forbids two passes from sharing. (Greps run 2026-08-05.)

/**
 * One row of either list on this slide — a cost we paid, or a term of the pilot.
 *
 * ONE INTERFACE FOR BOTH, because the two lists are the same object twice: four short
 * label-register strings, each with a stable `id` for whatever the renderer keys and
 * tags its rows with, at the same size in the same tier. `id` is kebab-case, like the
 * ledger's above, so the two slides' hooks read the same way in a test. Two identical
 * interfaces would exist only to drift apart, and
 * `./chicken-egg-geometry.ts` gives both lists ONE row height and ONE pitch for the
 * same reason — what differs between the bill and the terms is the budget each one
 * has, not the shape of a row.
 */
export interface LineItem {
  id: string;
  /**
   * A LABEL, and therefore keyword-free: each one is the name of a thing, and a
   * copper italic inside a name emphasises a fragment of it.
   *
   * SENTENCE CASE, like the ledger's metric names above. §6.7 writes these eight
   * strings inside running prose, so the words are §6.7's and the initial capital is
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
 * literal `4`, so `./chicken-egg-geometry.ts` pins its own copy of both counts to
 * these tuples through a TYPE-ONLY `import()` — no runtime import, which that module
 * needs in order to stay importable from bare Node.
 *
 * AND FOUR IS NOT A COPY EDIT. §6.7 names four costs and the issue's AC names four
 * pilot constraints; a fifth of either is a different argument, not a longer list.
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
