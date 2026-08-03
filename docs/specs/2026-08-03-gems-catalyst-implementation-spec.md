# GEMS AI Catalyst — full change spec (implementation-ready)

**Date:** 2026-08-03 · **Owner:** repo owner (solo facilitator) · **Source map:** [#1](https://github.com/adrianto-nanovest/bc-presentation/issues/1) · **Assembled on:** [#13](https://github.com/adrianto-nanovest/bc-presentation/issues/13)

This is the destination artifact of the Wayfinder map. It consolidates every resolved
decision from #2–#12 and #15–#19 into one implementable document. **No decision is made
here that is not either (a) already resolved on a closed ticket, or (b) explicitly marked
as decided in this spec with its rationale.** Anything still open is in §12.

Resolution sources: #5 (variant architecture) · #6 (GEMS brand deltas) · #7 (shared
substitutions) · #8 (leader re-spine) · #9 (B4 refresh) · #10 (Loop Engineering) ·
#11 (E9 — shipped) · #12 (I1 — shipped) · #15 (light theme) · #16 (leader slides) ·
#17 (E.12 canvas) · #18 (E.12 open form) · **#19 (E.12 form — resolved 2026-08-03)**.

**Decision ticket spawned by this assembly, now resolved:** #19 — which E.12 form ships.
**Resolved 2026-08-03: neither #17 C nor #18 A. A clean-sheet third build,
`src/slides/prototype-gh19b-e12-loop-engineering/`, is the form that ships.** This replaces
the content brief that §8.3 previously called fixed — see §8.3 and §12.1.

---

## 0 · Status, baseline, and how to read this

### 0.1 Observed baseline (verified 2026-08-03, `main` at `f2f14ed`)

| Fact | Observed |
|---|---|
| `src/variant.ts` | **2 variants** (`berau`, `general`). Zero references to `gems` or `leader`. |
| `middleware.ts` | 2 `VariantCopy` blocks (`BERAU`, `GENERAL`); one `SITE_PASSWORD` (berau's) + `SITE_PASSWORD_GENERAL`; `mintToken(secret)` signs **expiry only**; ignores `?variant=`. |
| `middleware.ts` type-checking | **Not type-checked.** `tsconfig.json` `include` is `["src","tests"]`; the file sits at repo root. |
| Deck size | **64 slides** live. A 2 · B 5 · C 6 · D 5 · E 12 · F 9 · G 11 · H 3 · I 4 · J 4 · K 3. |
| `FigLabel` call sites | **64** real call sites, every one with hardcoded `section="X" num={n}`. Plus one hardcoded hack at `src/slides/reveal-and-closing/k3-thank-you.tsx:21` (`FIG_NUM = VARIANT === "general" ? 1 : 3`). |
| `SlideDef.section` | A **display letter** (`"A"…"K"`), consumed by `NavBar` and by `useKeyboardNav`'s `a`–`k` jump map. |
| Where `<Slide>` is rendered | Centrally, in `src/deck/Deck.tsx:37` — `index` and `section` are passed from `deckSlides[slideIndex]`. Slide components never render `<Slide>` themselves. |
| Unit-test baseline | **11 files / 21 tests failing**, pre-existing: `deck-registry`, `e10-harness-what-why`, `f8-your-agentic-os`, `foundation-core-index`, `i2-profile-journey`, `i3-portfolio`, `sim-exchange-alerts`, `sim-legal-docs`, `sim-nanovest-product`, `sim-notebooklm`, `sim-stocks-intel`. (436 passing.) |
| `index.html:6` favicon | Points at `/bc-logo.png`, **which does not exist** — berau's favicon 404s today. |
| Export scripts | `scripts/export-pdf.mjs`, `export-pptx.mjs`, `screenshot-exchange-alerts.mjs` navigate to bare `localhost:5173` — no variant argument. |

### 0.2 What has already shipped (do not re-implement)

| Ticket | Commit | Shipped |
|---|---|---|
| #11 · E9 compounding animation | `d411ead` | E9 shared-axis compounding/degradation figure. **Done.** |
| #12 · I1 particle backdrop | `b1ec98b` | I1 grid-pulse particle backdrop, steps 1–2. **Done.** |
| #7 · A.1 agenda column | `6c79491` | 5 question strings + 5 `kw` arrays rewritten, all variants. **Done.** |
| #6 · Drive URL hygiene | `ace479e` | Berau K.2 link chips reduced to canonical ids (removed `ouid=` leak). **Done.** |

`#13`'s original outline listed "E9 motion" and "I1 particles" as pending all-variant work.
They are **not** pending. Only **B4 (#9)**, **Loop Engineering (#10/#17/#18)** and the
**light theme (#15)** remain in that category.

### 0.3 What is prototyped but not productionized

`main` carries five merged dev-only prototype directories, all absent from production
bundles: `src/slides/prototype-gh16-leader-slides` (`?dev=proto16`),
`prototype-gh17-e12-loop-canvas` (`?dev=proto17`), `prototype-gh18-e12-open-form`
(`?dev=proto18`), `prototype-gh19-e12-the-loop` (`?dev=proto19`),
**`prototype-gh19b-e12-loop-engineering` (`?dev=proto19b`)**, plus
`src/deck/PrototypeGh15ThemeBar.tsx` and `src/styles/prototype-gh15-light-theme.css`.
**All are throwaway.** Each winning variant is **rewritten**, not lifted (they were built
under prototype rules: no tests, no error handling, inline styles). Each directory is deleted
by the phase that replaces it.

`proto19` and `proto19b` post-date the original assembly: #19 was opened to pick between #17
and #18, and instead produced two further builds — a spiral-to-ring figure (`proto19`, also
retired) and the clean-sheet rebuild `proto19b`, **which is the form that ships** (§8.3).

### 0.4 Hard schedule constraints

Sessions: **Aug 6, 7** (GEMS middle mgmt) · **Aug 12, 13** (GEMS middle mgmt) ·
**Aug 18** (Berau leader) · **Aug 19, 20** (GEMS leader).

**No merges to `main` on a session day.** Free merge windows: Aug 3–5, 8–11, 14–17, 21+.

---

## 1 · Variant architecture

Resolved on #5, amended by #6 (one `label` field) and #8 (deck sets become flat slide lists).

### 1.1 Model — `BRANDS` × `DECK_SETS`

Two lookup tables plus a variant row of `{ id, brand, deckSet }`. Branding and auth are
**brand**-level; slide composition is **deck-set**-level.

```ts
// src/deck-variants.ts — plain data, no React, no DOM at module scope.
// Imported by BOTH src/variant.ts and middleware.ts via a RELATIVE path
// (the `@/` alias does not resolve in Vercel's middleware build).
export type Brand = "berau" | "general" | "gems";
export type DeckSetId = "standard" | "leader";
export type VariantId =
  | "berau-middle-mgmt" | "berau-leader"
  | "gems-middle-mgmt"  | "gems-leader"
  | "general";
```

| brand | `label` | cookie | password env | favicon | practice lab |
|---|---|---|---|---|---|
| `berau` | `Berau AI Catalyst Workshop` | `berau_session` | `SITE_PASSWORD_BERAU` | `/brand/bce-logo.png` | yes |
| `gems` | `GEMS AI Catalyst Workshop` | `gems_session` | `SITE_PASSWORD_GEMS` | `/brand/gems-logo.svg` | yes |
| `general` | `AI Catalyst Workshop` | `general_session` | `SITE_PASSWORD_GENERAL` | `/brand/general-ai-logo.png` | **no** |

Every other string derives from `label` (#6):

- tab title = `label`
- login page title = `` `${label} — Access` ``
- login eyebrow **and** title-slide workshop chip = `` `${label}${DECK_SETS[deckSet].labelSuffix ?? ""}` ``, suffix = `" · Leadership"`

The suffix shows on **eyebrow + title chip only** — never on tab or login titles (the
audiences sit on different domains, so a tab distinction buys nothing).

**Live copy changes this causes, both accepted (#6):** berau drops `Vol 2, Session 2`, and
berau's tab title moves from `Berau Coal AI Workshop` to `Berau AI Catalyst Workshop`.

Fit already measured (#6): longest string `GEMS AI CATALYST WORKSHOP · LEADERSHIP` ≈ 343 px
in the `nowrap` title chip (berau's current ≈ 325 px) and ≈ 427 px in the 476 px login column.

Company name renders as the acronym **GEMS**, never `Golden Energy Mines`. The Sinar Mas
identity arrives via the favicon — `assets/gems-logo.svg` **is** the Sinar Mas group symbol
(`#ee0305`), confirmed intentional.

### 1.2 Variants and hosts

| variant | brand | deckSet | host(s) |
|---|---|---|---|
| `berau-middle-mgmt` | berau | standard | `bc-presentation.vercel.app` (primary, already shared); optional alias `bc-middle-mgmt-ai-workshop.vercel.app` |
| `berau-leader` | berau | leader | `bc-leader-ai-workshop.vercel.app` (new — Aug 18) |
| `gems-middle-mgmt` | gems | standard | `gems-middle-mgmt-ai-workshop.vercel.app` |
| `gems-leader` | gems | leader | `gems-leader-ai-workshop.vercel.app` |
| `general` | general | standard | `ai-catalyst-workshop.vercel.app` + **fallback** |

Host map is `Record<hostname, VariantId>` (many hosts → one variant), so aliases,
`localhost` and `127.0.0.1` are free entries.

### 1.3 One resolution rule, applied identically on both sides

**Explicit `?variant=` → explicit host → else `general`.**

- `general` becomes the default for `localhost`, `127.0.0.1`, unmatched hosts (Vercel
  previews) **and** the `typeof window === "undefined"` node branch (unit tests). `berau`
  is no longer special.
- **`middleware.ts` must honour `?variant=`.** It ignores it today, so a preview URL
  serves general's login page in front of berau's deck. The login `<form action>` must
  carry the param (`/__auth?variant=…`) or the POST checks the wrong brand's password.
- Isolation boundary is the **brand**, not the variant: with one shared GEMS password a
  middle-management participant can read the leader deck via `?variant=gems-leader`.
  **Accepted deliberately** (#5).

### 1.4 Auth fix — brand-bound tokens (security, not cosmetic) — IMPLEMENTED (#24)

`mintToken` signed only the expiry and all brands share one `AUTH_SECRET`, so **a valid berau
token pasted into `gems_session` on the GEMS domain verified** — the cookie name was the only
separation, and a cookie name is attacker-supplied.

Fix, now in `middleware.ts`: sign `` `${brand}|${exp}` ``, store `"<brand>.<exp>.<sig>"`, reject
on brand mismatch. One `AUTH_SECRET`, no new env vars. Pre-#24 two-field tokens no longer
verify; they fail closed to the login page.

**This invalidates every live session on deploy.** Ship it on a day with no session running.
Merged, not yet deployed — until the deploy lands, production still runs the old scheme.

### 1.5 Favicon / title / hero / assets

- `index.html` ships the **general** default (title + `/brand/general-ai-logo.png`) so the
  checked-in default matches the resolver's default. `src/main.tsx` then **unconditionally**
  applies `BRANDS[brand].{ title, favicon }`.
- Fix `index.html:6` — the current `/bc-logo.png` does not exist. Corrected to `bce-logo.png`
  under the new prefix.
- Brand logos move to **`assets/brand/`** and the middleware matcher exempts the `brand/`
  prefix, so the pre-auth login page can render its brand favicon (it has no
  `<link rel="icon">` at all today, and the request would otherwise be answered with login
  HTML). One stable prefix means the security-critical matcher regex never needs editing
  per brand. Only two references to update: `index.html:6`, `src/main.tsx:14`.
- **Login hero stays `/heroes/title-data-topology.jpg` for all five variants** — abstract
  copper, brand-neutral, and the login page is composed to *be* the title slide, so a
  per-brand hero would force a per-brand `titleContent.heroSrc` too. No `hero` field is
  added to `BRANDS` while all values are identical.

---

## 2 · Deploy & env runbook

### 2.1 Vercel

**One project, five domains, all served from `main`.** Probed 2026-07-31:
`bc-presentation` and `ai-catalyst-workshop` return 200; the four new hostnames return 404
(unassigned — confirm at the moment they are added).

Rules:
1. Variant work happens on branches; verify all five variants on the **preview** URL via
   `?variant=` before merging.
2. **No merges to `main` on a session day** (Aug 6, 7, 12, 13, 18, 19, 20).
3. Instant Rollback is the escape hatch.

### 2.2 Env-var migration — order is load-bearing

`SITE_PASSWORD` currently holds **berau's** password.

```
1. Set SITE_PASSWORD_BERAU   = <current SITE_PASSWORD value>
2. Set SITE_PASSWORD_GENERAL = <general's password>
3. Set SITE_PASSWORD_GEMS    = <gems' password>
4. Deploy the resolver refactor
5. THEN repurpose / retire SITE_PASSWORD
```

Wrong order **silently changes berau's password**, and 7-day cookies mask the break until
somebody new logs in — i.e. until a participant at the door.

Password resolution is uniform: **`SITE_PASSWORD_<BRAND> ?? SITE_PASSWORD`**. Fail-closed
503 only when both are missing.

### 2.3 Pre-deploy checklist (none of these vars is documented in the README today)

- [ ] `SITE_PASSWORD_BERAU`
- [ ] `SITE_PASSWORD_GENERAL`
- [ ] `SITE_PASSWORD_GEMS`
- [ ] `SITE_PASSWORD` (legacy default, retire last)
- [ ] `AUTH_SECRET`
- [ ] Five domains assigned in the Vercel project
- [ ] Brand logos present under `assets/brand/`

### 2.4 Post-deploy verification, per domain (cannot be tested locally)

Slide counts and FigLabel bounds below are the **end state**, after Phase 7. Intermediate
phase gates carry their own counts (§11).

| Check | berau-mm | berau-leader | gems-mm | gems-leader | general |
|---|---|---|---|---|---|
| Login eyebrow copy | | | | | |
| Password accepted | | | | | |
| Wrong-brand cookie rejected | | | | | |
| Favicon | | | | | |
| Tab title | | | | | |
| Title-slide chip | | | | | |
| A.1 content | | | | | |
| K.2 links | | | | | |
| Slide count | 65 | 73 | 65 | 73 | 63 |
| First + last FigLabel | `A.1` / `K.3` | `A.1` / `N.3` | `A.1` / `K.3` | `A.1` / `N.3` | `A.1` / `K.1` |

---

## 3 · Section letters and page numbers — derived, never hardcoded

This section resolves the item deferred from #5, tracked on #7/#8, and **replaces the
"ACT I / ACT II / ACT III" naming used in #8's planning table**. It is the largest
behaviour-preserving refactor in the spec and everything downstream depends on it.

### 3.1 The problem, precisely

1. 64 `FigLabel` call sites hardcode `section="E" num={11}`. Any cut, insert or reorder
   leaves visible gaps (`E.1, E.2, E.4 …`).
2. `SlideDef.section` is a **display letter**, so a slide cannot be moved between narrative
   blocks without lying about where it is (F.8 relocates into the leader deck's Act II).
3. `k3-thank-you.tsx:21` already carries a per-variant number hack (`FIG_NUM`), i.e. the
   problem has already been patched once by hand.
4. `#8`'s leader deck introduced **ACT I / ACT II / ACT III** as block names. Those are
   narrative labels, not section identifiers: they cannot be jumped to, they do not sort,
   and a deck that shows `FIG. E.4` in one variant and "ACT II" in another has two
   incompatible addressing schemes. **Rejected.**

### 3.2 Decision — fully dynamic letters, one rule, no special cases

**Every narrative block is a section with a semantic key. The composed deck assigns letters
in encounter order and numbers within each section.** Nothing on any slide names a letter
or a number.

For the leader deck this means the new blocks take **B, C, D** (and the mandate takes **K**),
and the retained curriculum shifts down the alphabet. Concretely: `THE GAP` is **section B**,
not "ACT I".

**Alternative considered and rejected: fold the gap block into section A.** It yields 13
sections instead of 14 and matches #8's `a`–`m` jump-key estimate, but it makes section A a
7-slide hybrid holding two different jobs (cover + agenda, then a five-slide argument), it
prints the Act I closer as `FIG. A.6` under a letter whose name is `OPENING`, and it costs
the gap block its own jump key on a deck that is explicitly designed to be skimmed live.
Fully dynamic keeps **section A meaning exactly the same thing in every deck set**, which is
the property that makes the standard-deck no-op provable.

### 3.3 Data model

```ts
// src/deck/sections.ts
export type SectionKey =
  // shared
  | "opening" | "landscape" | "mindset" | "process" | "fundamentals"
  | "techniques" | "tools" | "pitfalls" | "meta" | "principles" | "lab"
  // leader-only
  | "gap" | "shape" | "invest" | "mandate";

export const SECTION_NAMES: Record<SectionKey, string> = {
  opening:      "OPENING",                    // not rendered today
  landscape:    "THE LANDSCAPE",              // not rendered today
  mindset:      "MINDSET",                    // not rendered today
  process:      "PROCESS & METHODOLOGY",      // rendered in A.1
  fundamentals: "ENGINEERING FUNDAMENTALS",   // rendered in A.1
  techniques:   "TECHNIQUES",                 // rendered in A.1
  tools:        "TOOLS ECOSYSTEM",            // rendered in A.1
  pitfalls:     "PITFALLS & BEST PRACTICES",  // rendered in A.1
  meta:         "THE META-PROCESS",           // not rendered today
  principles:   "PRINCIPLES",                 // not rendered today
  lab:          "THE PRACTICE LAB",           // not rendered today
  gap:          "THE GAP",                    // rendered in leader A.1
  shape:        "THE SHAPE",                  // rendered in leader A.1
  invest:       "WHY INVEST",                 // rendered in leader A.1
  mandate:      "THE MANDATE",                // rendered in leader A.1
};
```

The five names already rendered are lifted verbatim from today's
`src/slides/opening-section-a/content.ts` `sectionLabel` strings, so A.1 renders
byte-identical text after the refactor.

```ts
// src/deck/types.ts
export interface SlideDef {
  id: string;                 // stable, unique; the deck-set lists reference these
  steps: number;
  animationMode: AnimationMode;
  canonicalPose: number;
  surface?: "dark" | "light";
  sectionKey: SectionKey;     // was: section: "A" | … | "K"
  numbered?: boolean;         // default true; `title` sets false (cover, no FigLabel)
  render: () => JSX.Element;
}
```

**Slide ids are opaque and stable.** They are the current file basenames
(`e11-harness-practices`, `f8-your-agentic-os`, `k3-thank-you`). Letters inside an id are
**historical, not authoritative** — `f8-your-agentic-os` renders as `C.2` in the leader
deck. **Never derive display text from an id.** Enforce with a lint-level convention and a
review note; a test cannot catch it.

### 3.4 The composer

```ts
// src/deck/compose.ts
export interface ComposedSlide {
  def: SlideDef;
  index: number;          // position in the composed deck
  sectionKey: SectionKey;
  letter: string;         // "A" … "N"
  num: number | null;     // null when numbered === false
}

export interface ComposedDeck {
  slides: ComposedSlide[];
  letterOf: (key: SectionKey) => string | undefined;
  sectionFirstIndex: ReadonlyMap<string, number>;   // letter → jump target
}
```

Rules:

| # | Rule |
|---|---|
| R1 | Walk the ordered slide list. A new section **run** starts wherever `sectionKey` differs from the previous slide's. |
| R2 | Letters are assigned to runs in encounter order, `A`, `B`, `C`, … |
| R3 | `num` increments within a run, counting **only** slides with `numbered !== false`. A `numbered: false` slide gets `num = null`. |
| R4 | **A section key may form exactly one run.** A second, non-adjacent run of the same key is a composition error — it would give one key two letters and break `letterOf`. Throws in dev; asserted by a unit test for every deck set. |
| R5 | `sectionFirstIndex[letter]` = index of the first **numbered** slide of that run. This preserves today's behaviour: pressing `A` lands on A.1, not on the cover. |
| R6 | `letterOf(key)` is the only sanctioned way to render a cross-reference to another section. |

### 3.5 Wiring

- `src/deck/Deck.tsx` composes once at module scope (or in a memo) and passes
  `{ letter, num, sectionKey }` for `slideIndex` into `<Slide>`.
- `<Slide>` provides them on a `SlideNumberContext`. Its `section` prop is **removed** —
  the letter now comes from the composed table.
- `FigLabel` drops both props:

```tsx
export function FigLabel({ label }: { label: string }) {
  const { letter, num } = useSlideNumber();
  return (
    <div className="fig-label">
      — FIG. {letter}.{num}
      <span className="dot">·</span>
      <span style={{ color: "var(--copper-200)" }}>{label}</span>
    </div>
  );
}
```

- **64 call sites** drop `section=` and `num=`. `k3-thank-you.tsx`'s `FIG_NUM` constant and
  its `VARIANT` import are **deleted** — general's `K.1` falls out of R3 automatically.
- `NavBar` keeps `Section {letter}` (unchanged text). It now receives the derived letter.
  Rendering `Section {letter} · {SECTION_NAMES[key]}` is available and **optional** — not
  in scope for this refactor.
- `useKeyboardNav`: replace the literal `/^[A-Ka-k]$/` test with `/^[A-Za-z]$/` plus a
  lookup in `sectionFirstIndex` (absent letters stay a no-op). The `a`–`k` → `a`–`n`
  extension then needs no code change and no per-deck-set special case.
  **Reserved letters: `r` (reset deck) and `u` (reset step).** A deck reaching 18+ sections
  would collide; assert `sections.length <= 17` in the composer test. The leader deck has 14.
- `SlideDef.section` → `sectionKey` is a mechanical rename across all 65 slide modules and
  the two dev slides (`hexLadderDevSlide` becomes `sectionKey: "lab"`, still outside
  `deckSlides`).

### 3.6 A.1's agenda pointers must stop naming letters

`src/slides/opening-section-a/content.ts` holds five literal strings
(`"SECTION D · PROCESS & METHODOLOGY"` …). In the leader deck `process` resolves to **G**,
not D, so hardcoded pointers would lie.

```ts
// content shape
interface AgendaQuestion {
  text: string;
  kw: string[];
  sectionRef: { keys: SectionKey[] };   // was: sectionLabel: string
}

// renderer
const label = (keys: SectionKey[]) => {
  const letters = keys.map(letterOf).filter(Boolean) as string[];
  const range = letters.length > 1
    ? `SECTIONS ${letters[0]}–${letters[letters.length - 1]}`
    : `SECTION ${letters[0]}`;
  return `${range} · ${SECTION_NAMES[keys[0]]}`;
};
```

Standard deck (unchanged output): `SECTION D · PROCESS & METHODOLOGY` …

Leader deck right column (#8's five movements — **this is what replaces "ACT I/II/III"**):

| pointer | question |
|---|---|
| `SECTION B · THE GAP` | What if your people **already use AI** where you can't see it? |
| `SECTION C · THE SHAPE` | What if agentic were an **operating model**, not a project? |
| `SECTION D · WHY INVEST` | What if one team's win became **the whole org's baseline**? |
| `SECTIONS E–J · THE CURRICULUM` | What if "using AI properly" had an actual **curriculum**? |
| `SECTION K · THE MANDATE` | What if you knew exactly **what to fund first**? |

`THE CURRICULUM` spans six sections, which is why `sectionRef` takes a **list** and the
renderer formats a range. Its display name is a movement name, not a section name — keep
the literal `"THE CURRICULUM"` for that row rather than inventing a 16th `SectionKey`
(one row, one string, no key that owns no slides).

### 3.7 Verification — the no-op must be provable

1. **Golden snapshot, recorded before the refactor.** Emit `letter.num` for every slide of
   every deck set to a committed fixture (`tests/fixtures/deck-numbering.json`). The
   standard deck must produce **exactly today's A–K and today's indices**; `general` must
   produce `K.1` for `k3-thank-you`. Diff must be empty.
2. Rendered check: screenshot A.1, E.11, F.9, K.3 in `berau-middle-mgmt` and `general`
   before/after; FigLabel text identical.
3. Composer unit tests: R1–R6, the duplicate-run error, `numbered: false` handling, the
   17-section assertion.
4. Guard test: every registered slide appears in at least one deck set or in an explicit
   `orphaned` array (#8).
5. `tsc --noEmit` clean. Unit-test baseline unchanged (11 files / 21 tests, §0.1).

---

## 4 · Deck-set model and leader composition

### 4.1 Model — flat ordered id list, plus overrides

#5's `{ sections, cut }` is **superseded** (#8). The leader deck reorders sections,
relocates a slide out of a cut section (F.8), inserts four blocks and overrides copy on a
retained slide, so section-order-plus-subtraction needs an escape hatch per case. One flat
list of ids is a single artifact to review, and it makes drift explicit: adding a slide to
section E for the middle-management deck does **not** silently change the leader deck.

```ts
export interface DeckSet {
  id: DeckSetId;
  labelSuffix?: string;                               // " · Leadership"
  slides: readonly string[];                          // ordered slide ids
  sectionOverrides?: Readonly<Record<string, SectionKey>>;  // slide id → section key
}
```

**Refinement of #8, made in this spec:** the `overrides` map carries **composition facts
only** (`sectionKey`). Copy variance stays in the slide's own content module behind a typed
resolver (`pick(brand, deckSet)`), the pattern `a1GeneralSlide` already uses. Rationale: a
generic override bag for copy is untyped by construction and the compiler stops helping;
composition overrides are a closed, tiny set (`sectionKey` only, one entry today).

Slide inclusion is driven by **both axes**: the deck-set `slides` list, filtered by the
brand's `practiceLab` flag (absent → `k1`, `k2` drop, and `k3` renumbers to `K.1` by R3).

### 4.2 Standard deck set (65 slides after E.12 lands)

| Letter | key | slides | ids |
|---|---|---|---|
| A | `opening` | 2 | `title` (cover), `a1-what-youve-seen` \| `a1-general` |
| B | `landscape` | 5 | `b1`…`b5` |
| C | `mindset` | 6 | `c1`…`c5`, `c6-bridge-to-d` |
| D | `process` | 5 | `d1`…`d5` |
| E | `fundamentals` | 13 | `e1`…`e11`, **`e12-loop-engineering`**, `e13-bridge-to-f` |
| F | `techniques` | 9 | `f1`…`f9` |
| G | `tools` | 11 | `g1`…`g11` |
| H | `pitfalls` | 3 | `h1`…`h3` |
| I | `meta` | 4 | `i1`…`i4` |
| J | `principles` | 4 | `j1`…`j4` |
| K | `lab` | 3 | `k1`, `k2`, `k3` (general: `k3` only → `K.1`) |

Letters and numbers are **identical to today** except inside E, where E.12 is new and the
bridge becomes E.13.

### 4.3 Leader deck set — 73 slides, 16 leader-only new

`64 (today) + 1 (e12-loop-engineering, all-variant) − 8 (F cut, F.8 kept) + 16 (new) = 73.`
#8's "72" predates E.12's insertion.

| Letter · name | # | Slides (in order) |
|---|---|---|
| **A · OPENING** | 2 | `title` (cover, leader title override) · `a1-what-youve-seen` → **A.1** |
| **B · THE GAP** | 5 | `gap-hardest-part` **new** · `gap-no-sop` **new** · `gap-three-failures` **new** · `gap-the-pattern` **new** · `gap-capability-ladder` **new** |
| **C · THE SHAPE** | 4 | `shape-agentic-org` **new** · `f8-your-agentic-os` *(relocated, `sectionOverrides`)* · `shape-tam-kotter` **new** · `shape-middle-out` **new** |
| **D · WHY INVEST** | 5 | `invest-base-rates` **new** · `invest-own-proof` **new** · `invest-chicken-egg` **new** · `invest-security` **new** · `invest-subscription` **new** |
| **E · THE LANDSCAPE** | 5 | `b1`…`b5` |
| **F · MINDSET** | 6 | `c1`…`c5`, `c6-bridge-to-d` |
| **G · PROCESS & METHODOLOGY** | 5 | `d1`…`d5` |
| **H · ENGINEERING FUNDAMENTALS** | 13 | `e1`…`e11`, `e12-loop-engineering`, `e13-bridge-to-f` *(beat-2 copy override)* |
| **I · TOOLS ECOSYSTEM** | 11 | `g1`…`g11` |
| **J · PITFALLS & BEST PRACTICES** | 3 | `h1`…`h3` |
| **K · THE MANDATE** | 3 | `mandate-enablement` **new** · `mandate-phases-gates` **new** · `mandate-levers` **new** |
| **L · THE META-PROCESS** | 4 | `i1`…`i4` |
| **M · PRINCIPLES** | 4 | `j1`…`j4` |
| **N · THE PRACTICE LAB** | 3 | `k1`, `k2`, `k3` |

**Cut:** `f1`–`f7` and `f9`. **`f8-your-agentic-os` survives, relocated to C.2** — it needs
`sectionOverrides: { "f8-your-agentic-os": "shape" }`, otherwise R1 splits the `shape` run
in three and R4 throws.

**`e13-bridge-to-f` in the leader deck** keeps beat 1 (*"Three layers. The fundamentals are
built."*) and overrides beat 2 to F.9's line — *"Next: the platforms that bring them to
life"* — because F is cut and H.13 now bridges into **I · TOOLS ECOSYSTEM**. One string,
deck-set-scoped.

> **Trap:** #8 wrote this override against slide "E.12", which at the time meant the
> *bridge* slide (`e12-bridge-to-f`). After #10 the bridge is `e13-bridge-to-f` and **E.12
> is the new THE LOOP slide**. The override belongs to the **bridge**, not to THE LOOP.

**Delivery model.** Curriculum sections E–J are retained **verbatim** and skimmed live.
`ArrowRight` jumps to the next slide but lands it at **step 0**, its blankest pose (the #12
complaint); `Space` shows every beat. Pick the key deliberately when rehearsing.

### 4.4 The seven brand × deckSet slots

#5's conclusion that "no delta needs a brand × deckSet pair" is **false**. Cleanest
expression is a `leader` content block under each brand, not a brand × deckSet matrix.

| # | Slot | Varies how |
|---|---|---|
| 1 | A.1 | brand (left column) × deck set (right column, footer, tagline) |
| 2 | Capability Ladder markers | GEMS two markers / Berau one + no MineTech marker |
| 3 | `invest-own-proof` | GEMVIS metrics / Vol-1 IDR figures |
| 4 | `invest-security` on-prem beat | GEMS DigiTech callback / Berau none |
| 5 | Agentic Org hub name | DigiTech / MineTech |
| 6 | `mandate-phases-gates` calendar | GEMS P0 → AI Forge / Berau P0 complete, Aug 18 **is** the gate |
| 7 | `invest-subscription` price anchor | Berau's published $204/yr prize / GEMS list price only |

**K.2 stays purely brand-level** — berau keeps both tracks (the Section Head track is
indicated verbally), GEMS keeps its single track for both deck sets.

### 4.5 Leader title override

Deck-set-scoped title copy: **"From a Few People to the Whole Organization"** plus a tagline
naming what an agentic organization is, what it costs, and what only they can authorize.
The current *"From AI Curiosity to AI Capability"* promises individual capability and then
delivers an investment case.

Thesis line running through the deck (owner's words): *a few people, or one team, already
proved it — imagine it distributed across the whole org.* Carried by the title override,
A.1's left column and question 3, and `invest-own-proof`.

---

## 5 · Brand-level content deltas

Resolved on #6. **Everything here ships to `gems-leader` too** — leaders run the same
practice lab, so no brand × deckSet pair is introduced.

### 5.1 A.1 (GEMS) — the DigiTech portfolio as the hook, with an ownership turn

Risk this slide had to solve: GEMS' portfolio was built **for** participants by a central
team, so "what you've already seen" can land as *the experts already handled this* — the
opposite of DigiTech's steer 4. The tagline makes the turn, phrased as ownership rather
than typing, so it also works for a leader who will sponsor rather than build.

```
figLabel:     "WHAT GEMS ALREADY RUNS"
slideTitle:   "The AI already running at GEMS."      kw: already running
tagline:      "DigiTech built these for you. The questions ahead
               are about building with them."        kw: built these for you · building with them
ruleHeader:   "Already In Production"
leftHeading:  "Five systems already running"
rightHeading: "Questions we'll answer"               ← unchanged from both variants
footer:       "Five systems already live. Five questions still ahead."
                                                     kw: already live · ahead
```

| chip | icon | description | kw |
|---|---|---|---|
| `GEMVIS` | MessageSquare | One assistant, routing your question to specialist agents across fifty systems. | *specialist agents* |
| `SICANTIK` | Camera **(new)** | Cameras that watch for violations and unsafe behaviour, not just record them. | *watch for violations* |
| `FAMOUS` | Truck **(new)** | Sensors and AI reading fleet status, driver behaviour, and fatigue in real time. | *fatigue* |
| `USIGN` | FileSignature **(new)** | Approvals signed digitally, with an AI assistant checking the document first. | *checking the document first* |
| `MIRRAX` | Map *(reused)* | Field monitoring and analysis across the mining area, read by machine vision. | *read by machine vision* |

- **Product labels, not capability labels** — the frame is *this is already yours*, which a
  product name delivers in one glance; the capability rides in the description so the D→H
  questions still connect.
- **Excluded:** Databricks (publicly unverified) and AI-OCR (a GEMVIS sub-capability).
  `MIRRAX` is in on **internal attestation only** (it appears in DigiTech's own slide), so
  its description is pinned to exactly that claim level — no metrics, no vendor, nothing
  the public record contradicts.
- Claim discipline (`docs/researches/2026-07-31-gems-digitech-ai-landscape.md`): no computer
  vision attributed to FAMOUS; Usign's AI limited to validation assist; SiCantik and WIM
  kept separate. GEMVIS' multi-agent routing is publicly documented, so it is safe in front
  of DigiTech — and it plants section F early.
- `questions` stays **shared by reference** with `a1Content.questions`. **Rewording any of
  the five for GEMS requires cloning the array first**, otherwise the edit ships to berau
  and general.
- Known and accepted: three of five systems are field/ops, so back-office participants
  recognise the names rather than their own daily use. The frame works on brand recognition.

### 5.2 K.2 part 2 (GEMS) — `Two Tracks` → `THE ANALYST`

The word "track" disappears from the GEMS deck.

```
id: "analyst"  (was "tracks")  ·  num: 2
name:    "THE ANALYST"
essence: "Same data, same discipline"
desc:    "Everyone works the same dataset as the same persona — an operational
          analyst. One provided Skill, built to cite its sources and refuse to
          fabricate."
descKw:  the same persona · cite its sources · refuse to fabricate
rows:
  "The question"   → '"Why did this happen?"'
  "The Skill"      → root-cause-investigator · evidence-tracing
  "The collateral" → [Runbook] [Main folder] [Starter pack]
```

Links, canonical form, ordered by use:

- Runbook — `https://docs.google.com/document/d/1piHjL5Vm25mj3Nvv-_bN5u3cG3vPX1z3`
- Main folder — `https://drive.google.com/drive/folders/1AIUJsU8usuj8TEIYN8yObN0iQDJ-v4FY`
- Starter pack — `https://drive.google.com/drive/folders/11aqVeWEXWqdwLu6FI3DYu2U6zv0apNeR`

- **Three rows, not one.** The detail panel is sized for the densest part (`The Outputs`,
  5 rows), so a single row of three items reads as empty beside its siblings. The split
  also teaches the anatomy — a question, a Skill that answers it, the materials to run it.
  Verified in the renderer: rows are keyed by `label`, each label renders as a header, so
  functional labels need no component change.
- **No persona row label** — with the card named `THE ANALYST` and the essence saying *same
  discipline*, `Everyone · Analyst` repeats it twice.
- **Storage:** override part 2 only; parts 1, 3, 4 shared **by reference**, so an edit to
  The Case or The Outputs cannot drift between brands.
- Lab facts: GEMS collateral is done and shared (*anyone with link*), a copy of the berau
  **Section Head** set — same manufacturing case, single provided Skill
  `root-cause-investigator`, discipline `evidence-tracing`. The foreign industry is
  deliberate: the lab teaches method, and a fabricated coal case would put invented pit
  numbers in front of people who run real pits.
- One stale comment to update: `k2-practice-lab-overview.tsx:348`.

### 5.3 Shared-slide substitutions — retain as-is

Resolved on #7: **all four DigiTech steers are already delivered by the deck body.** No
shared slide needs GEMS-specific wording, so no shared slide moves behind the brand table.

| Steer | Delivered by |
|---|---|
| 1 · AI culture, not tool training | C.1–C.6, J.2, J.4 |
| 2 · Productivity, automate repetitive work | D.1 → D.5, G.9 |
| 3 · Use AI properly, beyond chat | E.*, F.*, H.1 |
| 4 · Build your own + don't reinvent | K.1/K.2, F.3, F.4, H.2 card 6 (DigiTech's own phrase) |

**Program framing stays out of the middle-management deck** — Sep–Oct competition,
20/12/8M IDR rewards, AI Forge from Jan 2027, DigiTech as steward, integration catalog.
Organizer's announcement, handled verbally. **Reversed for the leader deck only**, in
`mandate-phases-gates` (§6.6) — leaders are asked to *sponsor*, and "gates, not dates"
needs real gates.

The A.1 agenda rewrite from #7 has **already shipped** (`6c79491`); its five strings are
live in `content.ts` and are reproduced in §3.6's standard-deck row for reference only.

---

## 6 · Leader deck content (sections B, C, D, K)

All of §6 applies to **both** `berau-leader` and `gems-leader`. Driver: event-committee
feedback recorded in `docs/prompts/gems-catalyst.md` — (1) shape of the agentic
organization, (2) ROI + security, (3) no guidance or SOP, (4) individual subscriptions,
(5) best way to use the tools, (6) cost efficiency incl. shared accounts and ban risk.

Four of the six asks had **no host slide anywhere** in the 64-slide deck (`governance`,
`subscription`, `team plan`, `procurement` return zero files), which is why this is a
re-spine and not a cut list.

### 6.1 `gap-hardest-part` — B.1

The hardest part is not the tools (70%). Opens the gap between tool access and
organizational capability.

### 6.2 `gap-no-sop` — B.2 · shadow AI as **condition**

There is no guidance, so people improvise. **Shadow AI appears three times in the deck
with enforced escalation and no shared image or statistic:** B.2 = *condition* · D.4 beat 2
= *exposure* (data you cannot audit, revoke, or produce) · D.3 = *rational behaviour*.
**This constraint belongs in the spec, not in the implementer's judgement:** the escalation
degenerates into repetition the moment two of the three passes share an image or a statistic.

### 6.3 `gap-three-failures` — B.3

Nanovest **failures**, first person. HR p16–18 outcomes are **cut** — outcomes brag,
failures transfer, and the confession pays the credibility debt before L.2/L.3 arrive.

### 6.4 `gap-the-pattern` — B.4

The pattern across the three failures.

### 6.5 `gap-capability-ladder` — B.5 · the Capability Ladder

See §7.2 for the prototyped visual contract. Content: **L1 Assisted** (ad-hoc individual
use) → **L2 Copilot at scale** (org-wide, humans drive every task) → **L3 Agentic, bounded**
(decision contract, 70/30 split) → **L4 Multi-agent mesh** (coordinated agents, escalation
paths) → **L5 Full agentic org** ("declared only when earned").

Provenance to cite on the slide: *adapted from SAE J3016 automation levels and Anthropic's
workflow-vs-agent boundary.*

**No AI-adoption assessment data will exist for either brand** (confirmed on #8). The two
markers therefore carry **different epistemic status**, and the visual must make that
legible without a legend:

| marker | GEMS | Berau |
|---|---|---|
| **Tech function — asserted, with citation** | DigiTech ≈ **L3**, sourced to Google Cloud's published description of GEMVIS (hierarchical multi-agent, dispatcher → specialists, 50 applications, 4,000+ users) | **No marker.** MineTech has nothing comparable to GEMVIS. **The absence must be stated as copy, not left blank** — silence reads as an unfinished slide (#16 finding 4) |
| **Organization — open question to the room** | DigiTech's own words: *"outside DigiTech, AI adoption is not really adopted well — even some DigiTech members still falling behind"* → where does that put the other 90%? | 382 trained, competition complete, AI Ambassadors named → *did it become daily use, or did it stop at the certificate?* |

Small **Nanovest marker at L1–L2**, deliberately self-deprecating: the person recommending
this is also on the second rung.

A leader who places themselves on a rung has self-diagnosed; a leader who is told where
they sit argues with the next slide.

The ladder is referenced again in `mandate-phases-gates`, which maps phases onto it
(P0–P1 → solid L2, P2 → bounded L3, P3 → governed L4), so B.5 and K.2 are the same object
seen twice.

### 6.6 Section C · THE SHAPE

**`shape-agentic-org` — C.1 · the centrepiece.** See §7.1 for the prototyped visual
contract. Generic hub **"The Enabler"** with a brand line: **DigiTech** (GEMS) /
**MineTech** (Berau). Six pillars from HR p4: People & Mindset · AI Companions · Process &
Methodology · Tools & Platform · Strategy & Leadership · Governance & Policies.

The HR original's **Specify → Generate → Verify** panel is **dropped** — C.4 (leader F.4)
already does it better. The freed space becomes a **focus walk naming the leader's decision
in each pillar**, which turns the centrepiece into the index for section D: security and
no-SOP land on *Governance & Policies*, subscriptions on *Tools & Platform*, "Leading AI
Culture" on *People & Mindset* + *Strategy & Leadership*.

**`f8-your-agentic-os` — C.2.** Relocated verbatim; `sectionOverrides` entry required.

**`shape-tam-kotter` — C.3.** Adoption/change-management frame. **Build this last** — it is
deliverable verbally if the schedule slips.

**`shape-middle-out` — C.4.** Middle-out adoption.

HR p15's four principles are **not authored** — each backing is delivered natively
(Kotter/TAM in C.3, middle-out in C.4, sharpen-the-axe inside M.2's "Foundation precedes
velocity", BPM→RPA→IPA in G.3/G.4, "solve problems over capabilities" *is* G.4's
lightest-fix ladder). "Learn → Experiment → Build → Integrate → Own" is **out**: it would be
a **third** ladder alongside L1–L5 and P0–P3.

### 6.7 Section D · WHY INVEST

**`invest-base-rates` — D.1.** 78% → 6%.

**`invest-own-proof` — D.2 · brand-varying (slot 3).** A Div Head discounts an outsider's
case study and cannot discount their own company's.

- **GEMS** — GEMVIS: executive decision speed **+90%**, multi-operational retrieval
  **2 days → under 1 hour**, **50+** application portfolios, **4,000+** users. Google Cloud
  customer-story claims — **vendor-reported, not independently audited.** Cite attributed;
  ideally have DigiTech confirm before Aug 19.
- **Berau** — Vol-1 winners, participant-claimed annual impact: **IDR 135–155M** (one-click
  production status), **IDR 35–38M** (document/knowledge automation), **IDR 200–700M**
  (geospatial safety evaluator).

**`invest-chicken-egg` — D.3 · 4 beats.** Deadlock → what we actually did (shared accounts,
banned repeatedly, costs named: work lost mid-stream, no audit trail, data outside the
boundary, usage invisible to the people who later have to approve it) → it worked,
management convinced, full investment released → **the turn: you are the person who can
skip beats 1–3** (30-day proof pilot: a handful of seats, one named use case each, a kill
criterion, a spend cap).

**Beat 3 is load-bearing.** Without it beat 2 reads as advice to breach terms of service;
with it the slide is a consciously priced trade-off that ends legitimately — a story a Div
Head can repeat upward.

**The vendor-leniency comparison ("ChatGPT seems not strict") stays off the slide** and is
delivered verbally. Choosing a vendor by weakness of enforcement, printed three slides from
the governance recommendation, is indefensible in a Sinar Mas context.

**`invest-security` — D.4 · 3 beats.**

1. **Where your data actually goes** — personal consumer account / company-managed
   workspace / self-hosted. This is where B4's message lands with its own numbers:
   open-weight is **6.7 points** off the lead on write-and-reason and **9.2 back** on
   tool-calling, so self-hosting is right for sensitive workloads and wrong for everything
   else.
2. **Your real exposure today is shadow AI, not the vendor** — data you cannot audit,
   revoke, or produce.
3. **The four governance domains** (Culture, Risk, Governance, Ethics) as the SOP starter,
   with **"governance retrofit"** named as the failure mode.

Brand callback (slot 4): GEMS — DigiTech already runs private on-prem GPU servers for
sensitive-data RAG. Berau — none.

**`invest-subscription` — D.5 · 3 beats.** Today individual (no admin, no visibility,
nothing revoked on exit, no volume leverage) → company-managed seats (admin control, SSO,
central billing, usage analytics — which is what makes the November post-assessment mean
anything) → the arithmetic as a formula they run for their own division, plus tiering so it
does not read as "buy everyone a seat". **"Measure value, not activity"** belongs here:
seat count is not adoption. Price anchor is brand-varying (slot 7).

### 6.8 Section K · THE MANDATE

**`mandate-enablement` — K.1.** Enablement model with **generic pillars and tracks,
specific bottlenecks** — DigiTech's own brief supplies the bottleneck ("adoption is
concentrated in one function"), so nothing is speculated.

**`mandate-phases-gates` — K.2 · brand-varying (slot 6).** Phases and gates, mapped onto
B.5's ladder. **This is where #7's competition/AI-Forge exclusion is reversed** — for the
leader deck only.

- **GEMS** — P0 ends at the **W1 Nov post-assessment**; **AI Forge is P1**. Their own
  programme titles phase 3 *"AI Forge — Deep AI Skills to Build an Agentic Organization"*
  and gates entry on *"the post-assessment result"*. Their roadmap already names the
  destination and already gates on measurement rather than calendar. Say it outright: this
  is not a new direction, it is the operating model AI Forge is aimed at, and here is what
  must be true before January.
- **Berau** — P0 is **complete** (workshop May–Jun, competition Jun–Jul, post-assessment
  Jul–Aug). **Aug 18 lands exactly on the gate into "Post Program AI Development — After
  Aug."** What the leaders fund that day decides whether it continues. The AI Ambassadors
  already exist: fund them or lose them.

**`mandate-levers` — K.3.** Four levers, reworded from Group-HR to a BU/Div Head: put it on
the calendar and show up · name a champion, protect them, put it in their objectives ·
clear access and procurement · fund the rhythm and review quarterly.

---

## 7 · New leader slides — prototyped visual contracts (#16)

**Verdict: variant A wins on both slides.** Owner's call, on a browser walkthrough of all
six variants. Prototype at `?dev=proto16`; full record in
`src/slides/prototype-gh16-leader-slides/README.md`. **Rewrite, do not lift.**

### 7.1 `shape-agentic-org` (C.1) — hub and spokes

| Settled | |
|---|---|
| Arrangement | **Hub-and-spokes holds at projection distance.** B (ledger stack) and C (two-column spine) are dead. |
| The focus walk | **Does not dim the other five.** Inactive pillars keep full border and label; the active one *gains* copper fill, a thickened spoke and a halo. **Attention is bought with added light, never subtracted.** |
| Step budget | **Nine steps, not ~4.** Six pillars × one leader-decision each is six beats minimum, plus hub + reveal + closer. #16's "~4 steps" budget moves. |
| Layout risk | The lowest satellite sits at y ≈ 620 (stage bottom ≈ 658), close to the NavBar hover zone, **and it grows on focus**. The closer had to move off the bottom strip into the right column. **Re-check clearance when rebuilt.** |
| Brand | Hub label "The Enabler" + brand line DigiTech / MineTech (slot 5). |

### 7.2 `gap-capability-ladder` (B.5) — staircase path-draw

| Settled | |
|---|---|
| Geometry | The `hr-group-agentic-org/web/index.html` staircase path-draw **ports cleanly into copper** — one `<path>` plus text nodes, re-cut for 1280×720. A rebuilt geometry was not needed: *the geometry was never the cost, only the cyan/violet colour coding.* |
| Asserted vs open | **Separated by form, not hue** — a single-hue copper system has no second hue to spend. Four encodings at once: solid chip vs hairline **dashed** chip · solid leader vs **dashed** leader · filled dot vs **open ring** · mono-uppercase-with-source vs **serif-italic ending in "?"**. No legend. |
| Berau | The **`absence` line is required copy**, not a placeholder — the ladder must state that MineTech has nothing comparable. |
| Steps | 5. |

---

## 8 · All-variant slide updates

### 8.1 B4 refresh (#9) — `b4-tiers-deployment.tsx` + four child components

**Thesis:** keep the spine (six category cards → hover detail panel at step 0 →
at-a-glance matrix at step 1); sharpen the argument from *"frontier vs open-weight"* to
**capability has converged, price has not.**

Sources: AA Intelligence Index **v4.1**, values confirmed **2 Aug 2026** —
`docs/researches/2026-07-31-artificialanalysis-model-data.md` +
`docs/researches/2026-08-02-aa-gemini-pro-addendum.md`; media arenas under
`docs/references/artificialanalysis/`.

**Three data corrections that must carry into the build:**

1. **`DeepSeek V4 Flash 0731` is Open Weights, not Proprietary.** Chart fill, hover tooltip,
   model-page badge and `License: Mit` all agree; weights on Hugging Face. The predecessor
   doc is wrong (probable cause: a ~19 px axis-label-to-bar offset in the colour join).
   This is what puts a 50-index model at $0.03/task into the open column.
2. **`GLM-5.2` costs $0.69/task and $1,061.18 full-index**, not $0.29 / $710.15 — a 138%
   move in 48 hours, index unchanged at 51, cause unestablished.
3. **The Gemini Pro gap closes as a clean negative.** AA's newest Pro is
   `Gemini 3.1 Pro Preview` (Feb 2026) at Intelligence 46 / Coding 68.8 / Agentic 21.4 —
   worse than Gemini 3.6 Flash on all three. There is no 3.5- or 3.6-generation Pro. The
   ⚠ Flash-tier caveat is **retired**.

**Benchmark panels (R1).** Bare model names, no effort tier on the bars — the tier is
disclosed once, in the freshness line, as "scores at maximum reasoning effort".
**`scaleMax` = 100 for all four categories** (was 65 / 65 / 85 / 100; `code` was outright
broken against a new max of 78.0). This deletes the silent-clipping hazard permanently
rather than resetting it, and gives the score labels a denominator.

| Category | Claude Opus 5 | GPT-5.6 Sol | Gemini 3.6 Flash | Kimi K3 | Tagline |
|---|---:|---:|---:|---:|---|
| Write & Reason | **61** | 59 | 50 | 57 | 4 pts off the lead |
| Code | **78.0** | 77.4 | 69.2 | 76.2 | 1.8 pts off the lead |
| Agentic | **55.3** | 54.0 | 38.7 | 50.1 | 5.2 pts off the lead |
| Multimodal | **85%** | 83% | 83% | 81% | 4 pts off the lead |

**Kimi K3 is the contender in all four panels** — one open-weight through-line, chosen over
GLM-5.2 because it carries the thesis (1.8 points off on code). Licence disclosed **once**,
in the section head: `OPEN-WEIGHT CONTENDER · COMMERCIAL USE RESTRICTED`.

**Footnotes carry meaning, never numbers.** The gap figure currently appears three times per
category (`footnote`, `footnoteKw`, `openWeight.tagline`) — that triple-duplication is the
failure mode that produced this ticket. It now lives in the tagline only; precise values
stay visible on every bar's own score label.

- Write & Reason — *The general-purpose score. Two vendors and one open-weight model sit within a few points.*
- Code — *The tightest race of the four — open weights have all but caught up here.*
- Agentic — *Planning and tool-calling is where the frontier still holds a real lead.*
- Multimodal — *Reading scans, photos and charts. Everyone is close; this is table stakes now.*

**Creative card (R2) — four groups, not three.** AA separates Speech Arena (TTS) from
Vocals (music), and the current "VOICE" grouping is wrong on the merits: Suno makes songs,
not voice. Names only, no scores; layout unchanged (four groups need ~240 px of ~385 px).

- **IMAGE** — GPT Image 2 · Reve 2.1 · Nano Banana 2
- **VIDEO** — Gemini Omni Flash · MiniMax H3 · Dreamina Seedance 2.0
- **SPEECH** — Simba 3.2 · Qwen-Audio-3.0-TTS-Plus · Gemini 3.1 Flash TTS
- **MUSIC** — Suno V5.5 · Mureka V9

Two judgement calls recorded: **Nano Banana 2 over MAI-Image-2.5** (AA puts both in rank
Range 3–6 with overlapping CIs — statistically tied, tie broke toward the tool this room may
have touched). **Veo 3.1 and ElevenLabs dropped** — both are the recognisable names and both
are genuinely behind (rank 11 and rank 10, not ties); pre-empt verbally.
`subLabel` → **"Elo arenas · human preference"** (a different metric class from the four
index panels; must not read as comparable).

**Cost card (R3) — X axis switches to cost per task** (log). The old unit ("cost to run the
full Index") is *"running a 9-evaluation benchmark suite once"* — unexplainable in situ and
irrelevant to the room. Axis bounds ≈ **$0.02 → $4**, ticks `$0.05 · $0.20 · $1 · $3`
(replacing `X_MIN 130 / X_MAX 5500` and the `$200…$5k` tick set).

**Eight dots, eight vendors** — one model per vendor, deliberately:

| Closed | Index | $/task | | Open | Index | $/task |
|---|---:|---:|---|---|---:|---:|
| Claude Opus 5 · Anthropic | 61 | 2.34 | | Kimi K3 · Moonshot | 57 | 0.86 |
| GPT-5.6 Sol · OpenAI | 59 | 1.86 | | GLM-5.2 · Zhipu | 51 | 0.69 |
| Grok 4.5 · xAI | 54 | 0.44 | | DeepSeek V4 Flash · DeepSeek | 50 | **0.03** |
| Gemini 3.6 Flash · Google | 50 | 0.56 | | MiniMax-M3 · MiniMax | 44 | 0.14 |

Annotation: Opus 5 → DeepSeek V4 Flash — **"82% of the intelligence, 1/78th the cost."**
Replaces *"90% the intelligence, 1/15th the cost"*, which is unreproducible against any pair
in the data. **No footnote on this card** — the scatter is dense enough. Consequence: the
effort-lever insight (Opus 5 at `high` = 59 for $1.23, i.e. −2 points for half the bill)
lives only in the spoken track.

**At-a-glance matrix (step 1).** Rows follow the roster. **BEST = strict column leader**
(multiple BEST only on an exact tie). A fifth band, **VERY GOOD**, is added; non-leader cells
are banded by distance from the leader so the assignment is reproducible rather than hand-set:

- Capability: **≥95% = VERY GOOD · 88–95% = GOOD · 75–88% = AVERAGE · <75% = WEAK**
- Cost, by multiple of the cheapest: **≤1.75× = VERY GOOD · ≤2.5× = GOOD · ≤4× = AVERAGE · >4× = WEAK** — price ratios spread far wider than score ratios, and the capability bands would flatten the whole column to WEAK

| | W&R | CODE | AGENTIC | MULTIMODAL | COST |
|---|---|---|---|---|---|
| **Claude Opus 5** | BEST | BEST | BEST | BEST | WEAK |
| **GPT-5.6 Sol** | VERY GOOD | VERY GOOD | VERY GOOD | VERY GOOD | AVERAGE |
| **Gemini 3.6 Flash** | AVERAGE | GOOD | WEAK | VERY GOOD | BEST |
| **Kimi K3** | GOOD | VERY GOOD | GOOD | VERY GOOD | VERY GOOD |

Reads as: Opus 5 tops every capability column but is the most expensive; Sol shadows it
everywhere at mid price; Gemini is cheapest and uneven; **Kimi K3 is never best and never
bad at the second-lowest price** — the value row, which is the argument.

**New element — on-prem footnote.** Right column at step 1, below the freshness stamp
(~200 px of slack). Must **not** reuse the italic-serif idiom of the bottom-left thesis line
or the two captions compete — use mono, or a rule above it.

> *The most secure setup is the one you host yourself. Only sub-100B models are affordable
> to run — far behind in general, possibly better than the frontier at the job you fine-tune
> them for.*

One line only, on a slide shared by all five variants: 556 middle-management participants
will never provision a GPU, and the full security argument has a dedicated home at leader
D.4. This line exists to correct one thing the slide would otherwise imply — that the
open-weight row offers a security benefit. It does not: every open-weight model near the
frontier is a 200B–1T MoE consumed through somebody's API, so its data-exposure profile is
identical to Claude's or GPT's.

**Slide copy:**

| Field | From | To |
|---|---|---|
| `freshness` | Artificial Analysis · 8 June 2026 | Artificial Analysis · **2 August 2026** |
| `figLabel` | FRONTIER vs OPEN-WEIGHT | **MODELS BY CATEGORY** |
| `slideTitle` | Six categories, one map of what **wins where**. | Six categories, one map of what **to use where**. |
| `qualitativeSummary.footer` | Frontier wins 4 of 5 categories… | **Capability has one leader. Cost has another. Kimi K3 is close to both.** |
| `creative.subLabel` | Different model class | **Elo arenas · human preference** |
| `cost-intel.subLabel` | Open-weight punchline | **What capability costs** |
| slide `footer` | Frontier wins on average. Fine-tuned open-weight wins on your work. | **The best models are within a few points of each other. The bills are not.** |

`leftSectionTitle`, `rightSectionTitle`, `rightSectionTitlePinned` and the
`AT A GLANCE — RELATIVE STRENGTH` header are unchanged.

**Implementation notes (not decisions):**

- `B4QualitativeCell` gains a fifth member; `cellStyles` gains a fifth entry. Ramp:
  `copper-300` (BEST) → **`copper-500`** (VERY GOOD) → `copper-700` (GOOD) → `neutral-800`
  (AVERAGE) → dotted (WEAK).
- **"VERY GOOD" may not fit** — cells are ~91 px wide, the string runs ~85 px at mono 10 px
  / `0.16em`. Needs a size drop to 9 px or an abbreviation.
- `B4CostScatter`'s `LABEL_Y_OFFSET` (`:73-80`) is tuned for the retired Opus 4.8 / GPT-5.5
  pair. Retune for the new 50–51 index cluster: DeepSeek V4 Flash, Gemini 3.6 Flash and
  GLM-5.2 all sit there, and the latter two are near-coincident in x as well.
- Scatter axis constants (`X_MIN`, `X_MAX`, `X_TICKS`, `fmtCostTick`) all rewritten;
  `fmtCostTick`'s "k" abbreviation is no longer needed.
- `heatmap` remains DEPRECATED and unrendered — do not refresh it, do not mistake it for
  live content.

**Known-unstable, flagged deliberately:** DeepSeek V4 Flash's reclassification cause is
unestablished (present as current state, not as a correction to AA) · GLM-5.2 moved 138% in
48 h (the freshness stamp is what makes any cost figure defensible) · **the entire open
column is Chinese labs** (Moonshot, Zhipu, DeepSeek, MiniMax) — that is the state of open
weights, it will be noticed in a leadership room, and it interacts with the on-prem thread;
name it in the spoken track rather than be asked. Also live: `Gemini 3.6 Flash` reading
**WEAK on agentic** (38.7 vs 55.3 = 70%) is what the data says, and it is a blunt verdict on
a Google model in front of a company running on Google Cloud.

### 8.2 Loop Engineering (#10) — section E gains E.12 · LOOP ENGINEERING

**GO. One new slide, all brands, all deck sets, no cut anywhere.**

**Not a fourth layer.** Three sources draw three different containment boundaries — Osmani
puts the loop **above** the harness, MindStudio **inside** it, this repo's own paper says the
harness already **contains** it. E.1's grammar is *"Three layers. Each one contains the
last."*, so a fourth ring would assert a containment direction that a third of the current
literature calls backwards. Instead: **the three rings are one run (space); the loop is
repetition (time).**

| Slide | Change |
|---|---|
| **E.1** `e1-three-layers` | `steps: 4 → 5`, `canonicalPose: 3 → 4`. New step 4: `RingStack` gains an `orbit` prop — a copper arc sweeps all three rings, mono label `THE LOOP`. Footer → *"Three layers make one run. The loop makes it repeat."* `LayerSummary` untouched. |
| **E.11** `e11-harness-practices` | Ralph card — essence → **"You start one job; it retries until a check passes."** · pattern → `Spec → attempt → check → fix → until done` · bullets → *Errors feed back — it re-diagnoses and retries* / *Runs past one context window via checkpoints* / *Success criteria / goal defined as the check — `/goal` on Claude Code & Codex CLI*. Footer → **"Eight parts. Now — what runs them, without you."** |
| **E.12** `e12-loop-engineering` | **NEW.** See §8.3. |
| **E.13** | File renamed `e12-bridge-to-f.tsx` → `e13-bridge-to-f.tsx` (id, export symbol, unit-test name, `index.ts` slot). Beat 1 → **"Three layers. One loop."** **The `num` prop is not touched — §3 derives it.** |

**Why E.12 is not the Ralph card.** Anthropic's own comparison hands over the boundary:

| | Next turn starts when | Stops when |
|---|---|---|
| `/goal` | the previous turn finishes | a model confirms the condition is met |
| `/loop` | a time interval elapses | you stop it, or Claude decides it is done |

**The Ralph card is `/goal`; E.12 is `/loop` + Routines** — run-until-done versus
run-again-and-again. Scored against Macedo's loop specification, `/goal` has goal ✅
verification ✅ stopping rule ✅ but **no trigger** and **no cross-cycle memory** — precisely
the two rows E.12 teaches. No slide cross-references, no renumbering brittleness; the two
essences do the separating. Both commands verified: Claude Code (v2.1.139+) and Codex CLI
v0.146.0.

**Three real gaps the audit found in the existing harness treatment**, which is exactly
where Loop Engineering lives: E.11 Orchestration says *"Ends when the model emits no more
tool calls"* — the mechanical stop, not the goal-based one · there is **no verification
card** anywhere, so Anthropic's 2026-03-24 finding (a separate skeptical evaluator beats
self-grading) appears nowhere · the Triggers card's pattern line reads
`Manual · Schedule · Event` but all three bullets describe hooks — **scheduled work
discovery, the loop's ignition, is named and never taught.**

Research basis: `docs/researches/2026-07-31-loop-engineering.md` (provenance) +
`docs/researches/2026-08-02-loop-engineering-practitioner-walkthrough.md` (operational
detail). The walkthrough's *"this is the future"* framing is promotional and is **not** used.

### 8.3 E.12 · LOOP ENGINEERING — the form that ships (#19 RESOLVED, 2026-08-03)

**Resolution: neither #17 C · GAUGE nor #18 A · THE DIAL.** Both prototypes are retired. The
slide is built from a **clean-sheet third build**, `src/slides/prototype-gh19b-e12-loop-engineering/`
(`?dev=proto19b`), sourced from the Panaversity *Loop Engineering: A Crash Course* material
rather than from the #10 → #17/#18 lineage. Owner call on #19; one candidate, not a bracket.

> **This supersedes the content brief that this section previously called "fixed regardless
> of form".** The headline, qualifier, tagline, closer, the five `TRIGGER · MEMORY ·
> CONDITION · BUDGET · GATE` rows, the Friday 4 PM worked example and the `steps: 2` /
> `canonicalPose: 1` shape are all **replaced**, not adjusted. #17's arc-gauge-with-cap-tick
> and #18's open ring both die with the ring — the shipping form has no ring. What survives
> from #10 is only §8.2: the placement, the not-a-fourth-layer argument, the E.1 / E.11 /
> E.13 knock-ons, and the `/loop`-not-`/goal` boundary (with one conflict to settle — see
> "Build decisions still required" below).

**Slide shape:**

| Element | Value |
|---|---|
| Headline | **"Stop writing prompts. Start writing loops."** (`kw`: *writing loops*) |
| Qualifier | **None.** The mono strip under the headline is deleted by owner call — the term is carried by the FigLabel and the two practitioner quotes |
| FigLabel | `LOOP ENGINEERING` (letter and number derive — §3) |
| Steps | **`steps: 3`, `canonicalPose: 2`** |
| Pacing | Hover a rail part to magnify it; **click pins**; un-hover **releases**. E.9's grammar, no Space press inside the diagram |
| Closer | **"You wake up to two PRs and one flagged decision. You typed nothing."** |
| Recap footnote | **"Design the loop once — it starts the work, checks the work, remembers the work. You keep *intent* and *accountability*."** — bottom-left, display weight, step 2 |

**Step 0 — the mindset shift.** A diptych, and the argument of the whole slide.

- **Left, `PROMPTING — TURN BY TURN`:** four chips relaying an endless highlight cycle, each
  row owning a quarter of the beat, with a dashed **"you, again"** return path. Verdict:
  *"You are holding the tool the whole time. You are the heartbeat, the checker, and the
  memory. Stop paying attention, and the work stops."*
- **Right, `LOOPING — A SYSTEM YOU DESIGN ONCE`:** a live EKG heartbeat feeding
  `DISCOVER → IMPLEMENT → VERIFY → COMMIT`, a spine (`progress.md`, read first / written
  last), a `risky` escape to the single human gate, `approved` handed back to commit. A token
  runs the column continuously. Verdict: *"The loop holds the steps in the middle. You keep
  intent and accountability."*
- Bridge between the panels: `THE LEVERAGE MOVES ›››`. The left panel **visibly cannot run
  without you**; the right one **visibly can**. That contrast is the slide's thesis, carried
  by motion rather than caption.
- Beneath, the two practitioners who renamed the job: **Boris Cherny** (*"I don't prompt
  Claude anymore. I have loops running that prompt Claude — my job is to write loops."*) and
  **Peter Steinberger** (*"You should be designing loops that prompt your agents."*).

**Step 1 — the big loop, four parts.** Left rail `HEARTBEAT · ONE BEAT · CHECKER · SPINE`,
joined by down-arrows and an amber return arc — *"tomorrow's beat starts by reading the
spine."* A `HintIcon` sits beside the heading. Hovering a part magnifies it onto the right
canvas, with a **stepped leader line physically connecting the card to the panel title**.
Idle shows `ONE BEAT`, so the resting pose is the reference's "two loops, one name" spread.

| Part | Right canvas |
|---|---|
| `HEARTBEAT` | **The four heartbeats** — in-session (`/loop`), conditional (`/goal`, `codex exec` + tests), scheduled (Routines, ChatGPT Tasks / cron), event-driven (Channels, GitHub, `@codex` on a PR) — each with its own stop condition and a plain-language analogy, laid on a *you hold it → it runs without you* axis. Foot: *each single firing of the loop is called a **beat***. **No OpenCode anywhere** (owner call) — Codex / ChatGPT stand in |
| `ONE BEAT` | **The agent runtime** — build the context → the model decides → run the tools → add the results, drawn as an orbit with a circulating comet; dashed exit *the model stops asking — the beat ends, back to the big loop: the checker, then the spine.* Foot: the small loop has no heartbeat and no spine — when the beat ends it remembers nothing |
| `CHECKER` | **The checker ladder** — a passing test (*proof*) → mechanical checks (*partial proof*) → a rubric with a bar (*a claim, not a proof*), with the human gate **widening beneath as the proof thins**. This is where "done is a check, not an opinion" now lives, and it is the **verification card §8.2 found missing** from the whole harness treatment |
| `SPINE` | **Memory between runs** — Run 1 Monday ✕ *the session ends, the model's memory is wiped* ✕ Run 2 Tuesday, over a continuous repo band (`CLAUDE.md` / `AGENTS.md` the front of the diary, `progress.md` the back). Foot: *No spine, no loop.* |

**Step 2 — the worked example.** The rail stays; the canvas becomes the **morning-triage
loop, one beat**: heartbeat 9:00 → read `progress.md` → find the work (≤ 5 items) → draft in
its own worktree (*the maker*) → a separate reviewer grades it (*the checker*) →
`THE VERDICT?` forks to *needs a human* / *open a PR* → update `progress.md` → dashed return,
*again tomorrow at 9:00*. Hovering a rail part now **lights the flow stages that part owns**
(`spine` → read + update · `checker` → reviewer + verdict + both branches · `heartbeat` →
the pill and the return · `beat` → the maker stages). Two day-tokens run the flow on
alternating laps — one passes and opens a PR, the next fails and flags a person.

**Build rules the prototype establishes and the real slide must keep:**

- **Rank is a colour tier, never opacity.** Demotion moves borders to copper-900 and text to
  neutral-400; nothing rests semi-transparent.
- **`kw` on every prose string, never on mono.** All copy lives in a `content.ts` with `*Kw`
  siblings, 1–3 keywords per chunk; titles, tool strips, axis labels and phase names are mono
  and therefore keyword-free.
- **Reduced motion:** zero SMIL nodes mount and every pose still renders complete.
- 1280×720 absolute stage · dark surface · copper single accent · **CSS vars only, no hex
  literals** · no new fonts or libraries · must sit between E.11's 8-card grid and E.13's
  photographic bridge.
- The prototype's `1`–`4` pin keys, `0` reset and `\` replay are **dev affordances, not part
  of the contract** — production keeps hover + click-pin only.

**Observed in the browser** (prototype, via `scripts/p19b-shots.mjs` and
`scripts/p19b-reduced.mjs` against the real `<Slide>` stage at 1280×720): all four hover
states swap the panel and set `data-active`; un-hover releases; click-pin holds after the
pointer leaves; step 2's footnote mounts and all four hovers light their own stages;
`2 → 1 → 0` all re-render; two step-0 frames 1.7 s apart differ across both panels;
`prefers-reduced-motion: reduce` mounts 0 `<animateMotion>` nodes at every step; console
clean; `vite build` leaves no prototype markers in `dist/`.

**Build decisions still required — carried to §12.1:**

1. **`BUDGET` has no home.** The old brief's fifth row (a capped loop, backed by Claude
   Code's 7-day expiry on recurring tasks) appears **nowhere** in the shipping form. The
   closest thing is the triage example's *"at most 5 items"*. Decide explicitly whether the
   cost/runaway guardrail is stated in a foot line, moved to E.11, or dropped — **do not let
   it vanish by omission.**
2. **`/goal` now appears on both E.11 and E.12.** §8.2 separates them as *"the Ralph card is
   `/goal`; E.12 is `/loop` + Routines"*, but the shipping form teaches `/goal` as heartbeat
   kind 2 (`CONDITIONAL — also called run-until-done`), which is the Ralph card. Either kind 2
   names the Ralph card explicitly as a callback, or E.11's card is re-cut again. Cheapest
   fix: one callback line on kind 2.
3. **Projector legibility of the 8.5 px mono tool strips** on the heartbeat cards — the
   smallest type in the deck, unverified.
4. **Step-0 entry choreography.** The right panel's connectors mount with the panel (~1 s, no
   draw-in). Deliberate — step 0 is a poster, not a build-up — but it is an owner call.
5. **Quote wording.** Both quotes are attributed on-slide to named people. Provenance is in
   `docs/researches/2026-07-31-loop-engineering.md` (Cherny, Sequoia AI Ascent May 2026;
   Steinberger, June 2026 post), but the exact Cherny sentence on the slide traces to a
   secondary article and is marked *not verified* in
   `docs/researches/topic-loop-engineering-x-articles.md`. Verify the wording against the
   primary before it goes in front of an audience, or paraphrase.

**Dead on this pick — do not re-import:** the chain→ring fold and its duration scalar, the
open 320° ring with the `YOU` block in the gap, the arc gauge with a cap tick, the
"second ring with no stop" image, and the five-row decision list in any form. The un-hover
question is **settled: release** (pinning is the only way to hold state).

---

## 9 · Global light theme (#15) — last phase

**Verdict: full invert, accent B — Claude coral. CSS-var swap on `html[data-theme="light"]`.**
Decided from real renders across all 64 slides. Brand-, variant- and audience-agnostic: this
is deck chrome, not content.

**Merged state today:** `04d90fa` + `f35dd70` — dev-only, and **deliberately inert in
production**. `dist/` contains none of seven gh#15 markers and the emitted CSS asset is
byte-identical to the pre-merge build. Productionizing it is Phase 8.

### 9.1 Mechanism

- `html[data-theme="light"]` plus one override stylesheet. **159 of 180** slide files consume
  the CSS-var bridge; only **4** use Tailwind color utilities, so Tailwind `dark:` variants
  would restyle almost nothing — **rejected**.
- Residue that vars cannot reach, all solved in the prototype:
  - inline `rgba(10,10,10,α)` / `rgba(20,12,6,α)` / `rgba(0,0,0,α)` backgrounds →
    `[style*="background: rgba(10, 10, 10,"]`-style attribute selectors with `!important`
    (React serializes inline styles canonically, so the literals are matchable)
  - stylesheet dark cards: `.g1-card .g4-quadrant .g7-card .g7-recap-tile .j2-card .j3-card .j4-card .i1-card`
  - SVG presentation attributes: `[fill="rgba(10,10,10,…)"]`, `[fill="#f5f5f5"]` — a
    stylesheet beats presentation attributes

### 9.2 Token map (light)

| role | value |
|---|---|
| canvas | `#faf9f5` |
| ink | `#141413` |
| body-strong | `#252523` |
| body | `#3d3d3a` |
| muted | `#5f5c55` (one step darker than Claude's — projection contrast) |
| hairline | `#e6dfd8` |
| card | `#efe9de` |
| soft | `#f5f0e8` |
| letterbox | `#e8e0d2` |
| accent | coral ladder anchored `#cc785c` |
| small-mono accent text | `#a9583e` (raw coral is ≈3.1:1 on cream — too low at 12 px) |

Copper-100/200 **light-tint chip backgrounds keep their tint and dark ink** — naive ladder
inversion turned tables dark-brown and was rejected at review. Copper accent (variant A) was
rejected in favour of coral.

### 9.3 Dark-authored slides

- "Dark islands on cream" **rejected** — everything inverts.
- **Per-slide opt-out stays fully dark:** Title, **every bridge** (C.6 / E.13 / F.9 / G.11 /
  H.3 / I.4) and I.2. Mechanism: a `data-*dark` attribute on `.stage` re-scopes the dark var
  set for the subtree.
- **This opt-out list must be keyed by slide `id`, not by deck index.** The prototype's
  `GH15_DARK_SLIDES` in `src/deck/Slide.tsx` is a hardcoded `Set` of indices
  (`0, 12, 29, 38, 49, 52, 54, 56`). E.12's insertion shifts every index above 28, and the
  leader deck reorders the whole deck — **the index form is broken by Phases 4 and 5.**
- I-section sims had 5 hardcoded hexes (`#f5f5f5 #a3a3a3 #d99e6c #b86e3d #7a4626`) → swapped
  to vars; dark render verified pixel-identical. (This swap is the one intended production
  change already merged, and it is a no-op: `--neutral-300` is `#a3a3a3`, `--neutral-50` is
  `#f5f5f5`.)

### 9.4 Toggle contract (verified via Playwright in the prototype)

- `t` toggles dark ↔ light. (`v` cycled the accent variant — **prototype-only**, drop it.)
- URL `?theme=` overrides and stays synced; `localStorage` restores on a paramless reload;
  root attributes survive slide navigation.
- Arrow keys stay owned by deck nav. `t` is free in `useKeyboardNav`; `r`/`u` remain reserved.

**The production hazard the prototype already hit, do not repeat it:** the guard
`if (import.meta.env.PROD) return null;` sat **after** the hooks, so in a production build
the toolbar was invisible while everything behind it still ran — the `keydown` handler was
registered (**pressing `T` on the production deck flipped all 64 slides to cream and
persisted it to `localStorage`**), the effect still set `data-theme`, and the top-level
stylesheet import shipped the entire light CSS. Gate at the **mount** boundary, gate the
stylesheet behind an on-demand `import()`, and gate the DOM attributes — all three.

### 9.5 Remediation list — must clear before light is presentable

- **E.8** facet titles render tan-on-cream (hardcoded copper literal).
- **F-section** baked keyframe pulses assume dark backgrounds; suppressed in light.
- **I.1** canvas backdrop draws JS-baked colors — either dark opt-out or read vars at draw
  time.
- **HintIcon** tooltip intentionally stays dark (standard on light UI) — confirm.
- **`.stage.light`** dormant path would double-invert if ever used — delete or guard.
- Author review verdict: *"many areas to be fixed."* **Treat light as opt-in until this list
  is empty.**
- Open, not decided: whether `docs/runbooks/projection-test.md` and the PDF/export path need
  a fixed theme, and which theme each session defaults to.

---

## 10 · Verification plan

### 10.1 Automated

| # | Check | Phase |
|---|---|---|
| 1 | Unit-test the pure variant table + resolver: all 5 ids, host map, `?variant=` override, fallback, node branch | 1 |
| 2 | **Bring `middleware.ts` under type-checking** — own tsconfig project, `types: []` so its ambient `process` declaration stands, `lib: ["ES2022","DOM"]`. It is excluded from `tsconfig.json`'s `include` today: the most dangerous file in the repo is the least checked, and the new shared import makes that worse | 1 |
| 3 | Middleware vitest suite: host → brand · `?variant=` → brand · wrong password → 401 · correct password → correct brand cookie · **cross-brand token rejected** (regresses with no visible symptom) | 1 |
| 4 | Rewrite `tests/unit/deck-registry.test.ts` to assert **per deck set**. It is **already failing** (2 of 4 tests) — its expectations predate sections G/H and K.2/K.3 | 1, 4 |
| 5 | Numbering golden snapshot, per deck set, recorded **before** the refactor; diff must be empty for standard and general | 3 |
| 6 | Composer unit tests: R1–R6, duplicate-run error, `numbered:false`, ≤17 sections | 3 |
| 7 | Deck-set guard test: every registered slide is in ≥1 deck set or in `orphaned` | 4 |
| 8 | E2E `keyboard-nav.spec.ts` slide-count assertion (`>= 26`) still passes; extend to the leader deck's section letters | 3, 4 |
| 9 | `tsc --noEmit` clean at every phase exit; unit-test baseline no worse than 11 files / 21 tests | all |

### 10.2 Manual / rendered

- Every new or restyled slide inspected at **1280×720 in the browser**, and at projection
  distance for §7 and §8.3 (the copper single-hue system's form-based encodings and E.12's
  **8.5 px mono tool strips** — the smallest type in the deck — are exactly what a washed-out
  projector attacks).
- Per-domain post-deploy table — §2.4.
- Export path: `scripts/export-pdf.mjs`, `export-pptx.mjs`,
  `screenshot-exchange-alerts.mjs` **must take a variant argument**. They navigate to bare
  `localhost:5173` today, so the `general` default flip silently makes them export the wrong
  deck.
- E.12's four hover states, click-pin, un-hover release, and `2 → 1 → 0` re-render — the
  prototype's browser checks (`scripts/p19b-shots.mjs`, `p19b-reduced.mjs`) must be
  reproduced against the **real** slide, including `prefers-reduced-motion: reduce` mounting
  **0 `<animateMotion>` nodes** at every step.

---

## 11 · Development phases

Dependencies are strict where stated. Free merge windows: **Aug 3–5, 8–11, 14–17, 21+**.

| Phase | Scope | Depends on | Gate |
|---|---|---|---|
| **1 · Variant architecture & brand deltas** | §1, §2, §5. Shared `BRANDS`/`DECK_SETS` table; both resolvers honour `?variant=`; brand-bound tokens; favicon/title/assets; GEMS A.1 + K.2; env migration in order; checks 1–4 | — | **Live by Aug 5.** `gems-middle-mgmt` must exist for **Aug 6** |
| **2 · B4 model refresh** | §8.1 | none (parallel with 1) | Aug 5 if it fits; otherwise **Aug 11** for the Aug 12–13 batch |
| **3 · Derived section letters & page numbers** | §3. `id` + `sectionKey` + `numbered`; composer; `FigLabel` from context; 64 call sites stripped; `FIG_NUM` hack deleted; A.1 `sectionRef`; jump-key generalization; golden snapshot | 1 | **Behaviour-preserving no-op** for all three live decks, proved by the snapshot diff |
| **4 · Deck-set model + leader deck at zero new slides** | §4. Flat id lists; `sectionOverrides`; leader title + A.1 overrides; F cut with F.8 relocated; bridge beat-2 override; orphan guard | 3 | **The floor: a deliverable leader deck with no new slides.** At this checkpoint the leader deck is **56 slides across 11 sections A–K** (`shape` holds only the relocated F.8; `gap`, `invest` and `mandate` own no slides yet, so they take no letter). It grows to 73 / A–N as Phases 5–7 land |
| **5 · E.12 LOOP ENGINEERING + section-E knock-ons** | §8.2, §8.3. New `e12-loop-engineering` — **`steps: 3`, `canonicalPose: 2`**, productionized from `prototype-gh19b-e12-loop-engineering/` (**rewrite, do not lift**: the prototype is inline-styled and untested); E.1 orbit (steps 4→5); E.11 Ralph re-cut + footer; bridge rename + beat 1 | 3 (else a manual renumber per #10) | **UNBLOCKED — #19 resolved 2026-08-03.** Live for **Aug 12–13** and both leader decks. Ship the five §12.1 calls with the build, not after it. The E.1 / E.11 / bridge edits remain separable |
| **6 · Leader new slides, must-tier** | `shape-agentic-org` (§7.1, 9 steps) · `gap-capability-ladder` (§7.2) · `invest-own-proof` · `invest-security` · `invest-subscription` · `mandate-enablement` · `mandate-phases-gates` | 4 | Vendor claims verified (§12.2) before `invest-security` / `invest-subscription` ship |
| **7 · Leader new slides, second tier** | `gap-hardest-part` · `gap-no-sop` · `gap-three-failures` · `gap-the-pattern` · `invest-base-rates` · `shape-middle-out` · `mandate-levers` · **`shape-tam-kotter` last** | 6 | **Live by Aug 17** for Berau leader **Aug 18**. TAM/Kotter is deliverable verbally if it slips |
| **8 · Light theme productionization** | §9. Remove the DEV gates; drop the accent-variant switcher; **re-key the dark opt-out to slide id**; clear the §9.5 remediation list; decide the export/projection default | 4, 5 (id-keyed opt-out needs the final deck sets) | **After Aug 20.** Ships opt-in; presenter-facing only when §9.5 is empty |

Notes on ordering:

- **Phases 1 and 2 are independent** and can land in either order; 1 has the hard external
  deadline.
- **Phase 3 before Phase 5** is a cost decision, not a correctness one: without it, E.12's
  insertion needs #10's manual renumber of the E-section `num` props.
- **Phase 4 is the risk floor.** If Phases 6–7 slip, `berau-leader` on Aug 18 still has a
  real deck (reordered curriculum, F cut, F.8 relocated, leader title and A.1) — it is
  missing the new argument, not broken.
- **Phase 8 is last by instruction and by dependency** — the dark opt-out list cannot be
  keyed to ids until the deck sets are final.
- Every prototype directory is deleted by the phase that replaces it: `proto16` → Phase 6,
  `proto17` / `proto18` / `proto19` / **`proto19b`** → Phase 5, gh15 theme bar + stylesheet →
  Phase 8. `proto19b` is the one being productionized, so it is deleted **last in the phase**,
  after the real slide renders.

---

## 12 · Open items

### 12.1 RESOLVED 2026-08-03 — which E.12 form ships (#19 closed, Phase 5 unblocked)

**The form is the clean-sheet third build, `prototype-gh19b-e12-loop-engineering/`.** Not
#17's C · GAUGE, not #18's A · THE DIAL, and not the recommendation this section previously
carried (A with C's arc gauge). Full description in §8.3.

**Why the recommendation was not taken.** #17 and #18 were both built to #10's brief, so both
argue *"here are the five decisions that make a loop safe"* — a checklist rendered as
apparatus. The clean-sheet build argues something else: *the leverage moves from typing turns
to designing the system*, with the four parts as the anatomy of that system and the mindset
diptych carrying the shift on its own. Once the argument changed, the ring, the five rows and
the fold had nothing to attach to. Both prior brackets are **retired, not merged** — see
§8.3's "dead on this pick" list.

**Consequences already absorbed into this spec:** §8.3 rewritten end to end · §8.2's E.12 row
and the id `e12-loop-engineering` · `steps: 2` → **3** and `canonicalPose: 1` → **2** in §11 ·
`proto19` and `proto19b` added to the Phase 5 / Appendix A deletion list · §10.2's projector
bullet re-pointed from the BUDGET cap tick to the 8.5 px mono tool strips.

**What #19 leaves open — five build-time calls, to be made *with* the Phase 5 build, not
after it.** None blocks the phase; all are cheap now and expensive on a session day.

| # | Call | Why it cannot be silently skipped |
|---|---|---|
| 1 | **Where the `BUDGET` / runaway guardrail goes** — a foot line on E.12, a move to E.11, or an explicit drop | The old brief's fifth row is the only one with **no successor anywhere** in the shipping form. It is the slide's one risk row, in front of an audience that will go and build these |
| 2 | **`/goal` appearing on both E.11 and E.12** | §8.2 separates them (*Ralph = `/goal`, E.12 = `/loop` + Routines*); the shipping form teaches `/goal` as heartbeat kind 2. One callback line on kind 2 is the cheap fix |
| 3 | **Projector legibility of the 8.5 px mono tool strips** | Smallest type in the deck. Monitor-clean, projector-unverified — the exact failure the projection runbook exists to catch |
| 4 | **Step-0 entry choreography** | The right panel's connectors mount with the panel, no draw-in. Deliberate (step 0 is a poster), but an owner call |
| 5 | **Quote wording for Cherny and Steinberger** | Named attribution on-slide. The exact Cherny sentence traces to a secondary article marked *not verified*; check it against the Sequoia interview or paraphrase |

**Settled by this resolution, no longer open:** un-hover behaviour = **release** (pinning is
the only hold), and fold duration, which dies with the fold. Both were carried from #17.

**Phase 5's other work is still separable.** The E.1 orbit step, the E.11 Ralph re-cut and
footer, and the bridge rename + beat 1 are copy and step-count changes independent of E.12.
If the E.12 build runs past the free merge window, split them out and ship them without it.

### 12.2 Vendor pricing and data-handling claims — verify before Phase 6

The leader deck's `invest-security` boundary comparison and `invest-subscription` arithmetic
both rest on current vendor terms, which change. **This is the highest-consequence place in
the deck to be wrong, in a group with real compliance obligations.**

If verification does not happen, `invest-security` must describe the **categories** without
asserting any named vendor's current policy. Berau's published **$204/year Claude
subscription** prize is a usable local anchor; GEMS's equivalent is expected but not yet
official.

### 12.3 Also open

1. **Give the committee a heads-up** that the deck names DigiTech/MineTech as "The Enabler".
   It aligns with DigiTech's own stated "stewardess" intent, but it is our slide describing
   another department's role, in front of Div Heads.
2. **GEMVIS figures are vendor-reported** (Google Cloud customer story), not independently
   audited. Cite attributed; ideally have DigiTech confirm before Aug 19.
3. **Two ⚠ claims are live on E.11 today and still unverified** — *"Token metrics ≈ 80% of
   completion variance"* (Observability card) and *"Citadel ships 22 hooks across 14 events"*
   (Triggers card). Not blocking; separate ticket.
4. **MirraX remains publicly unverifiable** — in A.1 on internal attestation only, pinned to
   exactly that claim level.
5. **Practice-lab collateral** (`materials/`, `docs/runbooks/`, `docs/quiz/`) beyond K.2's
   links: `docs/quiz/*` has zero Berau/coal/mining mentions in the body — a GEMS run needs a
   title change at most. Not yet swept for the leader decks.
6. **Projection/export default theme** per session (§9.5), and whether the PDF path pins a
   theme.
7. **Admin config UI for per-domain slide toggles** — deferred, filed as
   [#14](https://github.com/adrianto-nanovest/bc-presentation/issues/14). Config-as-code only
   for Aug 2026: a new client costs 1 brand row + 1 variant row (+1 deck set if custom).

---

## Appendix A · Renames and deletions this spec authorizes

| Kind | From | To |
|---|---|---|
| type | `SlideSection = "A" \| … \| "K"` | `SectionKey` (semantic, 15 members) |
| field | `SlideDef.section` | `SlideDef.sectionKey` (+ new `id`, `numbered?`) |
| props | `<FigLabel section num label>` × 64 | `<FigLabel label>` |
| props | `<Slide section>` | removed (letter comes from the composed deck) |
| content | `AgendaQuestion.sectionLabel: string` | `sectionRef: { keys: SectionKey[] }` |
| file | `e12-bridge-to-f.tsx` | `e13-bridge-to-f.tsx` (+ symbol, test, index slot) |
| **delete** | `k3-thank-you.tsx:21` `FIG_NUM` + its `VARIANT` import | — |
| **delete** | `GH15_DARK_SLIDES` index set in `Slide.tsx` | id-keyed opt-out (Phase 8) |
| **delete** | `src/slides/prototype-gh16-leader-slides/` | Phase 6 |
| **delete** | `src/slides/prototype-gh17-e12-loop-canvas/`, `prototype-gh18-e12-open-form/`, `prototype-gh19-e12-the-loop/` | Phase 5 |
| **delete** | `src/slides/prototype-gh19b-e12-loop-engineering/` | Phase 5, **last** — it is the source of the real slide |
| **delete** | `scripts/p19-shots.mjs`, `scripts/p19-extra.mjs`, `scripts/p19b-shots.mjs`, `scripts/p19b-reduced.mjs`, `scripts/proto18-shots.mjs` | Phase 5 |
| **delete** | `PrototypeGh15ThemeBar.tsx`, `styles/prototype-gh15-light-theme.css`, `scripts/prototype-gh15-*.mjs` | Phase 8 |
| **delete** | the four `?dev=proto*` hatches in `Deck.tsx` (`proto17`, `proto18`, `proto19`, `proto19b`) | with their directories |
| fix | `index.html:6` `/bc-logo.png` (404) | `/brand/bce-logo.png` |
| move | `assets/*-logo.*` | `assets/brand/` (+ middleware matcher exemption) |

## Appendix B · Traps recorded, so they are not rediscovered

1. **`SITE_PASSWORD` holds berau's password.** Migrate in the §2.2 order or berau's door
   password changes silently, masked by 7-day cookies.
2. **Cross-brand cookie hole — CLOSED by #24.** `mintToken` signed the expiry only, so with one
   shared `AUTH_SECRET` the cookie name was the only brand separation. Tokens are now
   `<brand>.<exp>.<sig>` signed over `` `${brand}|${exp}` ``. The trap that remains: the deploy
   invalidates every live session, so it must land in a free merge window.
3. **#8's "E.12 override" means the *bridge*, not THE LOOP.** After #10 the bridge is E.13.
4. **`a1Content.questions` is shared by reference** by both the general and the GEMS A.1.
   Rewording one for a single brand requires cloning the array first.
5. **`highlight.tsx:4-23` is a case-sensitive plain substring match that silently no-ops.**
   An apostrophe mismatch drops a copper highlight with no error.
6. **`ArrowRight` lands each slide at step 0**, its blankest pose. For live skimming of the
   leader deck's curriculum, `Space` is the key that shows the beats.
7. **gh#15's dark opt-out is index-keyed** and breaks the moment E.12 inserts or the leader
   deck composes.
8. **A slide id is not a section reference.** `f8-your-agentic-os` renders as `C.2` in the
   leader deck.
9. **`heatmap` in B4 is DEPRECATED and unrendered.** Do not refresh it.
10. **`deck-registry.test.ts` is already red** on `main` — do not read its failure as a
    regression from this work.
