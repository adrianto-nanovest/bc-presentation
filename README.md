# AI Catalyst Workshop — Deck

React + Tailwind + Framer Motion presentation deck for the AI Catalyst Workshop. See `docs/specs/2026-05-06-process-and-design-meta.md` for the design substrate decisions; see `docs/plans/2026-05-06-design-system-implementation.md` for the build plan that produced this scaffolding.

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
```

Navigation:
- `→` next slide
- `←` previous slide
- `Space` next animation step within the current slide

### Which variant localhost serves

`localhost` and `127.0.0.1` resolve to **`general`** — the same default as any
unmatched host. Append `?variant=<id>` to see another one:

```
http://localhost:5173/?variant=gems-middle-mgmt
```

Ids are the five in the host table below. The override also works on Vercel
preview URLs, which is the only way to check a hostname rule before its domain
is assigned. `general` has no Practice Lab, so `?variant=` is also how you reach
K.1 / K.2 locally.

## Test

```bash
npm test             # vitest unit + integration
npm run e2e          # playwright e2e (viewport, keyboard, exports)
npm run typecheck    # tsc -b — app, vite config, and the Edge middleware
```

## Export

```bash
npm run export:pdf   # exports/smoke-deck.pdf  (multipage, canonical-pose-paused)
npm run export:pptx  # exports/smoke-deck.pptx (screenshot-stitched, static)
```

Both default to the **`general`** deck — deliberately, so a forgotten flag
produces an unbranded file rather than the wrong client's. Choose the deck with
`--variant=<id>`; pass the output path first, as the npm scripts already do:

```bash
node scripts/export-pdf.mjs  exports/gems.pdf   --variant=gems-middle-mgmt
node scripts/export-pptx.mjs exports/berau.pptx --variant=berau-middle-mgmt
node scripts/screenshot-exchange-alerts.mjs screenshots/gems.png --variant=gems-leader
```

Ids are the five in the host table below. An unknown id, or a misspelt flag,
exits non-zero with the usage text — the scripts never fall back to the default
once you have asked for something. Each one prints the variant it rendered, and
`DECK_URL` overrides the base url.

The ids are not restated in the scripts; they read `src/deck-variants.ts`
directly, which needs **Node ≥22.18** (type stripping on by default) and prints
one `ExperimentalWarning: Type Stripping` line per run. That is expected — the
alternative was a second copy of the variant list drifting out of step.

## Calibrate the palette against a projector

```bash
npm run projection-test
```

Opens the HexLadder slide. See `docs/runbooks/projection-test.md` for the full procedure.

## Deploy — environment variables and domains

One Vercel project, one `main` branch, five hostnames. Both the client and the
Edge gate resolve the variant by one rule — **`?variant=` → hostname →
`general`** — and the brand then carries the copy, the cookie, the favicon and
the password.

| host | variant | brand |
|---|---|---|
| `bc-presentation.vercel.app` | `berau-middle-mgmt` | berau (primary, already shared) |
| `bc-leader-ai-workshop.vercel.app` | `berau-leader` | berau |
| `gems-middle-mgmt-ai-workshop.vercel.app` | `gems-middle-mgmt` | gems |
| `gems-leader-ai-workshop.vercel.app` | `gems-leader` | gems |
| `ai-catalyst-workshop.vercel.app` | `general` | general — also the fallback for any unmatched host |

### Variables

All are Production-scope variables on the Vercel project. `middleware.ts` reads
them at the edge; nothing is bundled into the client.

| variable | gates |
|---|---|
| `AUTH_SECRET` | HMAC key that signs the session cookie token. Required. One key for every brand. |
| `SITE_PASSWORD_BERAU` | The door password for both berau hosts. |
| `SITE_PASSWORD_GEMS` | The door password for both gems hosts. |
| `SITE_PASSWORD_GENERAL` | The door password for the general host and for preview URLs. |
| `SITE_PASSWORD` | **Legacy fallback.** Holds berau's password. Do not change or remove it yet — see the retirement order. |

### Fallback rule

Password resolution is `SITE_PASSWORD_<BRAND> ?? SITE_PASSWORD`. A brand with no
variable of its own falls back to `SITE_PASSWORD`.

If `AUTH_SECRET` or the resolved password is missing, the middleware fails
closed: HTTP 503 and the "Access not configured" page. It never shows the deck.

Resolution is uniform across all three brands (#23): the gate resolves the
brand from the shared table — `?variant=` → host → `general` — and then reads
that brand's variable, so `SITE_PASSWORD_BERAU` and `SITE_PASSWORD_GEMS` are now
live. **Merged, not yet deployed**: verify every domain at its door on the first
deploy after this lands.

### Session cookies are brand-bound (#24)

The session token is `<brand>.<exp>.<sig>`, and the HMAC signature covers
`` `${brand}|${exp}` ``. On every request the gate re-checks the signature, the
expiry, **and** that the token's brand is the brand this request resolved to.

Why: all brands share one `AUTH_SECRET`. A signature over the bare expiry is
therefore valid for every brand, which left the cookie *name* as the only
separation — and a cookie name is supplied by the caller, so a berau token pasted
into `gems_session` on a GEMS domain used to be accepted. The brand is now inside
the signature, so the boundary is cryptographic rather than nominal.

**Deploying this logs everybody out.** Tokens in the old `<exp>.<sig>` format have
two fields, not three, so they fail closed to the login page. Every live 7-day
cookie is invalidated the moment the deploy goes live, so ship it on a day with
**no session running** (free windows: Aug 3–5, 8–11, 14–17, 21+) and before the
GEMS domains are handed out. No new environment variables; `AUTH_SECRET` is
unchanged, and rotating it would invalidate the same sessions again.

### Retirement order for `SITE_PASSWORD`

The order is load-bearing. `SITE_PASSWORD` holds berau's password, so a wrong
step silently changes berau's door password — and 7-day cookies hide the break
until the next person logs in, which can be a participant at the door.

1. Set `SITE_PASSWORD_BERAU` to the exact current `SITE_PASSWORD` value.
2. Set `SITE_PASSWORD_GENERAL` and `SITE_PASSWORD_GEMS`.
3. Deploy the uniform resolver (#23) and verify every domain at its door.
4. Only then repurpose or retire `SITE_PASSWORD`.

Steps 1 and 2 are done. Step 3 is pending, so step 4 must wait.

### Brand assets

Brand logos and favicons live in `assets/brand/` (`bce-logo.png`,
`gems-logo.svg`, `general-ai-logo.png`) and are served from `/brand/…`, because
`vite.config.ts` sets `publicDir: "assets"`. The pre-auth login page renders its
brand favicon, so `config.matcher` in `middleware.ts` exempts the whole `brand/`
prefix — one stable exemption, so adding a brand never edits that regex.

### Checking a variant on a preview URL

Open `/?variant=<id>` and log in once, as that brand. On `localhost` the gate
never runs, so `?variant=` alone is enough.

One login is enough because of the **selector cookie** (#30). `?variant=`
reaches the gate only on requests that carry it — the document, not
`/assets/*.js` — so on a host with no row of its own (a preview URL) those
sub-resources used to resolve to `general`, be gated by `general_session`, and be
answered with login HTML while the document was gated by the overridden brand.
The app never booted, and checking a variant took two logins.

So a request that proves a brand on such a host — a successful login carrying a
valid `?variant=`, or a **valid session** opening one — also gets `variant=<id>`,
and the Edge order becomes **`?variant=` → host → selector cookie → `general`**.
It is not a credential: it only chooses *which* brand's session cookie is
demanded, so forging it forwards nothing without that brand's signed token. Three
limits keep it narrow:

- **Mapped hosts ignore it**, so every host with a row behaves exactly as before
  and still emits one `Set-Cookie` per login.
- **Documents ignore it** (`Sec-Fetch-Dest`), so the client resolver — which
  cannot read cookies — never disagrees with the gate about who the viewer is.
- A login **without** `?variant=` clears it, so the last login wins.

An older session already in your browser needs no second login either: the
forward path re-issues the cookie the first time that session opens
`/?variant=<id>`.

One thing the brand boundary does **not** give you: content confidentiality. One
build ships every variant and the client selects, so any authenticated brand can
fetch the shared bundle and read another brand's slides out of it. The password
per brand gates the door and the rendered deck, not the bytes.

## Layout

- `src/design-system/` — Color, typography, spacing, shadow tokens. The single source of truth for both Tailwind theme and CSS variables.
- `src/deck/` — Deck shell: state, keyboard nav, slide wrapper, slide registry.
- `src/motion/` — Framer-Motion-backed primitives: StepReveal, LoopingAmbient, Interactive, Static.
- `src/primitives/` — Layout primitives: Hero, SectionDivider, ContentSlide, QuoteSlide, HexLadder.
- `scripts/` — Export and calibration scripts.
- `tests/unit/` — Vitest + Testing Library.
- `tests/e2e/` — Playwright (3 projection viewports).
