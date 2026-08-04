// Section THE SHAPE — every string C.1 prints, and the one axis it varies on.
//
// Spec §6.6 (content) · §7.1 (the visual contract #16 settled) · §4.4 slot 5 (the
// brand axis). Named by SECTION KEY and not by letter. `shape` happens to be C in
// both this ticket's composed leader deck and §4.3's finished one — the remaining
// `gap` slides lengthen B without displacing it, C.3 and C.4 extend this run, and
// `invest` lands behind it — so the letter is STABLE, and that is exactly why it is
// still not written down. What moves is everything behind this run (§3.4 R2), the
// letter is derived per deck (§3.5), and a directory that hardcoded the C it is
// currently entitled to would be a file betting on a composition rather than
// reading one. No file under `src/slides/leader-shape/` may hold a letter.
//
// Markup convention, as everywhere else in the deck: data carries plain strings
// plus a sibling `*Kw` array of substrings to highlight at render time. No inline
// `<em>` in data.
//
// THE KEYWORD RULE. `kw` goes on PROSE ONLY, and on this slide there is exactly
// one line of prose — the headline. The kicker, the hub's two lines and the six
// pillar labels are all set in the mono LABEL register, where a copper italic
// reads as a rendering fault, so none of them has a `*Kw` sibling.
// `tests/unit/shape-agentic-org.test.tsx` holds that as a list, so a new string
// has to pick a side.
//
// WHAT IS DELIBERATELY NOT IN THIS FILE, because this ticket does not render it:
//
//   1. THE SIX LEADER DECISIONS and their `→ ACT III` pointers. The prototype
//      carries one per pillar (`decision`, `decisionKw`, `actIII` in
//      `src/slides/prototype-gh16-leader-slides/brief.ts`) and §6.6 keeps them —
//      as the focus walk that grows this slide from 2 steps to 9 in the NEXT
//      ticket. They are not written here early. Dead copy that reads as finished
//      is how unreviewed copy ships: the next edit "just fills it in", and the
//      argument nobody agreed to is on a projector. See the same reasoning under
//      `GENERAL_BLOCK` in `src/slides/leader-gap/content.ts`.
//   2. THE CLOSER, for the same reason and in the same ticket.
//   3. SPECIFY → GENERATE → VERIFY. §6.6 DROPS the HR original's panel outright —
//      C.4 (leader F.4) already does it better — and the freed space is what the
//      focus walk is spent on. It is not missing from this file; it is refused.
//      Do not re-add it here or anywhere on this slide.
//
// Type-only import, so this module pulls in nothing at runtime and stays plain
// data — importable from a node test.
import type { Brand } from "@/deck-variants";

// ───────────────────── the six pillars ─────────────────────

/**
 * The lucide icon names this slide uses, as a closed union.
 *
 * A BARE `string` WOULD FAIL SILENTLY. The shared `LucideIcon` shim resolves a
 * name through a map and renders NOTHING for a miss (`if (!Comp) return null`),
 * so a typo costs one pillar its icon and no error anywhere — on a six-icon ring
 * that reads as a pillar that did not finish loading. The union makes the typo a
 * compile error; the test additionally asserts all six render an `<svg>`, which
 * is the half the union cannot prove (a name can be spelled right and still be
 * absent from the shim's map).
 */
export type PillarIcon = "Users" | "Bot" | "Workflow" | "Boxes" | "Compass" | "Shield";

export interface Pillar {
  id: string;
  /** Resolved through the section-E `LucideIcon` shim — see
   *  `./components/PillarOrbit.tsx` for why that one and not a fourth copy. */
  icon: PillarIcon;
  /**
   * The pillar as HR p4 names it, VERBATIM.
   *
   * A LABEL, and keyword-free by the rule above: these six strings are the
   * vocabulary the rest of section C and all of section D refer back to, and a
   * highlight inside one of them would emphasise a fragment of a name.
   */
  label: string;
}

/**
 * HR p4's six pillars, in RING ORDER — which is the FOCUS WALK's order, not the
 * order HR p4 prints them in.
 *
 * HR p4 reads: People & Mindset · AI Companions · Process & Methodology · Tools &
 * Platform · Strategy & Leadership · Governance & Policies. This array reads
 * Governance · Tools · People · Strategy · Process · Companions, and the
 * difference is a teaching decision the owner approved along with variant A on a
 * browser walkthrough of all six #16 prototypes: the walk opens on the two
 * pillars section D opens on (§6.6 — security and no-SOP land on *Governance &
 * Policies*, subscriptions on *Tools & Platform*) so the centrepiece hands
 * straight over to the section after it.
 *
 * ONE ORDER ARRAY, NOT TWO. A second array holding "HR p4's printed order" would
 * exist only to be out of step with this one, and nothing on the slide renders
 * it — the ring, the labels and the next ticket's walk all index THIS array.
 * `./geometry.ts` computes six centres in the same order, so pillar `i`'s box is
 * `PILLAR_CENTRES[i]` and there is no rung→tread table to drift.
 */
const PILLARS: readonly Pillar[] = [
  { id: "governance", icon: "Shield", label: "Governance & Policies" },
  { id: "tools", icon: "Boxes", label: "Tools & Platform" },
  { id: "people", icon: "Users", label: "People & Mindset" },
  { id: "strategy", icon: "Compass", label: "Strategy & Leadership" },
  { id: "process", icon: "Workflow", label: "Process & Methodology" },
  { id: "companions", icon: "Bot", label: "AI Companions" },
];

// ───────────────────── shared copy ─────────────────────

export const shapeOrgContent = {
  figLabel: "THE AGENTIC ORGANIZATION",

  headline: "Six pillars move together, or none of them move.",
  /** The slide's one highlight, on its one line of prose. */
  headlineKw: ["move together"],

  /**
   * The standing kicker — the claim the figure is an argument for.
   *
   * STANDS AT BOTH POSES, unlike the prototype's, which sat inside the ring's
   * space and had to fade out as the pillars faded in. It reads as the headline's
   * eyebrow and it is the sentence that makes the diagram a proposal rather than
   * an org chart: an operating model is something a division adopts, a department
   * is something it funds and forgets, a committee is something it schedules.
   *
   * Mono uppercase, so keyword-free. The em dash is the deck's own; the commas
   * are what keep the two refusals reading as one breath.
   *
   * STORED UPPERCASE, unlike `hubLabel` below, and the difference is not an
   * oversight: this string is the prototype's verbatim and is never quoted in
   * prose, so the register's `textTransform` is a no-op on it and the data reads
   * as the stage does. `hubLabel` IS quoted — in the issue's AC, in §6.6 and in
   * the test — so it stays in title case and lets the CSS do the shouting.
   */
  kicker: "AN OPERATING MODEL — NOT A DEPARTMENT, NOT A COMMITTEE",

  /**
   * The hub's first line — §6.6's generic hub.
   *
   * STORED IN TITLE CASE AND RENDERED UPPERCASE. The deck's mono LABEL register
   * uppercases through CSS `textTransform`, so the glyphs on the stage read
   * "THE ENABLER" while `textContent` — and every quotation of this slide in the
   * issue, the spec and the test — stays "The Enabler". Shouting it in the data
   * would put the presentation layer in the content module and make the string
   * unquotable in prose.
   *
   * GENERIC ON PURPOSE (§6.6): the brand line underneath says who the enabler
   * actually is here, and the hub above it says what the job is. A leader whose
   * own function is not named in the hub can still see the shape.
   */
  hubLabel: "The Enabler",

  pillars: PILLARS,
} as const;

// ───────────────────── the brand axis (§4.4 slot 5) ─────────────────────

/**
 * The hub's second line, brand by brand — the ONE thing on this slide that varies
 * with the organisation in front of it (§4.4 slot 5).
 *
 * `null` MEANS THERE IS NO ORGANISATION TO NAME, and the hub prints its label
 * alone. It is not "not written yet" and it is not an empty string: an empty
 * string renders a blank line inside the disc, which on a projector reads as a
 * slide that did not finish, and a placeholder name would be an invented
 * organisation printed at the centre of the deck's centrepiece. So the absence is
 * carried by the TYPE, the renderer has to handle it, and no author can turn it
 * into copy by editing one field.
 *
 * A `Record` keyed by `Brand` and not a `brand === "gems"` ternary, for the same
 * reason `capabilityLadderFor`'s table is one: a fourth brand must FAIL TO
 * COMPILE here rather than silently show one organisation another's name. This is
 * §4.4's "a content block per brand, not a brand × deckSet matrix" — the deck-set
 * axis does not reach this slide, because a slide only the leader decks compose
 * has nothing to vary against.
 *
 * `general` IS UNREACHABLE TODAY, and kept to the thinnest honest thing. No
 * `general-leader` variant is registered (`VARIANTS` in `@/deck-variants`), so no
 * composed deck asks for it. It exists because registering that variant should
 * serve a hub that names NOBODY rather than crash at first paint or — far worse —
 * fall through to another organisation's tech function. `general` names no
 * organisation, so it has nothing to put on the second line, and `null` says
 * exactly that and nothing more.
 */
const HUB_BRAND_LINE_BY_BRAND: Record<Brand, string | null> = {
  berau: "MineTech",
  gems: "DigiTech",
  general: null,
};

/**
 * The hub's brand line for one brand. Pass `VARIANT.brand`.
 *
 * THE ONLY WAY IN. The table above is deliberately not exported: a caller that
 * could read it could also enumerate keys the brand table does not have, and the
 * tests that hold a rule over "every brand" would then prove it over this file's
 * own key set instead of over `BRANDS`. They walk `Object.keys(BRANDS)` and come
 * through here, so a brand registered without a line fails at the type and a line
 * written for a brand that does not exist fails at the same place.
 *
 * The slide file calls this ONCE at module scope and passes the result down as a
 * prop — which is what lets one test render both brands' hubs in a single module
 * epoch (§4.4 slot 5, and see `./shape-agentic-org.tsx`).
 */
export function hubBrandLineFor(brand: Brand): string | null {
  return HUB_BRAND_LINE_BY_BRAND[brand];
}
