# Berau Coal Energy AI Workshop — Deck

React + Tailwind + Framer Motion presentation deck for the BC Vol-2 Session-2 workshop. See `docs/specs/2026-05-06-process-and-design-meta.md` for the design substrate decisions; see `docs/plans/2026-05-06-design-system-implementation.md` for the build plan that produced this scaffolding.

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

`?variant=` reaches the gate only on requests that carry it — the document, not
`/assets/*.js`. On a host with no row of its own (a Vercel preview) those
sub-resources resolve to `general`, so log in at bare `/` first, then open
`/?variant=<id>` and log in again as that brand. On `localhost` the gate never
runs, so `?variant=` alone is enough.

## Layout

- `src/design-system/` — Color, typography, spacing, shadow tokens. The single source of truth for both Tailwind theme and CSS variables.
- `src/deck/` — Deck shell: state, keyboard nav, slide wrapper, slide registry.
- `src/motion/` — Framer-Motion-backed primitives: StepReveal, LoopingAmbient, Interactive, Static.
- `src/primitives/` — Layout primitives: Hero, SectionDivider, ContentSlide, QuoteSlide, HexLadder.
- `scripts/` — Export and calibration scripts.
- `tests/unit/` — Vitest + Testing Library.
- `tests/e2e/` — Playwright (3 projection viewports).
