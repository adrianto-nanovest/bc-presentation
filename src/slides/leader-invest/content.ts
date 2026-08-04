// Section WHY INVEST — every string `invest-own-proof` prints, and the one axis
// it varies on.
//
// Spec §6.7 (content) · §4.4 slot 3 (the brand axis) · §4.5 (the thesis line) ·
// §12.3 item 2 (the GEMVIS figures are vendor-reported). Named by SECTION KEY and
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
// THE KEYWORD RULE. `kw` goes on PROSE ONLY, and this slide has exactly two lines
// of prose — the headline and the closer (plus `general`'s one-line refusal, which
// no composed deck reaches). The eyebrow, all seven figures — GEMS' four and Berau's
// three — their metric names, the epistemic chips and the attribution line are LABELS
// in the mono or sans register, where a copper italic reads as a rendering fault, so
// none of them has a `*Kw` sibling. The test holds that as a list, so a new string
// has to pick a side.
//
// WHAT IS DELIBERATELY NOT IN THIS FILE, because this ticket does not render it:
// D.1 (`invest-base-rates`, 78% → 6%), D.3 (`invest-chicken-egg`, four beats),
// D.4 (`invest-security`) and D.5 (`invest-subscription`) are #57–#59 and their own
// tickets. None of their copy is written here early. Dead copy that reads as
// finished is how unreviewed copy ships — the next edit "just fills it in", and the
// argument nobody agreed to is on a projector. Same reasoning as the top of
// `src/slides/leader-shape/content.ts`.
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
