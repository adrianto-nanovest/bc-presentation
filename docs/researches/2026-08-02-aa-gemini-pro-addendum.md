# Artificial Analysis — Gemini Pro tier, openness re-check, MMMU-Pro (2 August 2026)

**Addendum to:** `docs/researches/2026-07-31-artificialanalysis-model-data.md`
(that document is unchanged; this file closes three of its "Open items for the B4 refresh decision")

**Source of Truth:** Artificial Analysis (artificialanalysis.ai), **Intelligence Index v4.1**
— version string re-read live and unchanged: *"Artificial Analysis Intelligence Index v4.1
incorporates 9 evaluations: GDPval-AA v2, 𝜏³-Banking, Terminal-Bench v2.1, SciCode,
Humanity's Last Exam, GPQA Diamond, CritPt, AA-Omniscience, AA-LCR"*

**Data fetched:** 2 August 2026, via local `playwright-cli` against the live dashboard
**Viewport:** **1600 × 1200 CSS px, devicePixelRatio 1** (same as the 31 July capture)

Closes open items **1** (Gemini Pro gap), **7** (two openness classifications) and
**3** (MMMU-Pro live source). Open items 2, 4, 5, 6, 8 are untouched by this addendum.

---

## Capture URLs

The roster is the predecessor's 27 models **plus** `gemini-3-1-pro-preview`, `gemini-3-pro`
and `gemini-3-deep-think` = **30 requested models**. Reusable model list:

```
mimo-v2-5-pro,gemini-3-5-flash-lite,inkling,claude-sonnet-5,minimax-m3,command-a-plus,
gpt-5-6-luna,nvidia-nemotron-3-ultra-550b-a55b,qwen3-7-max,gemini-3-6-flash,grok-4-5,
claude-opus-4-8,claude-4-5-haiku-reasoning,claude-opus-5,gpt-5-6-terra,deepseek-v4-pro,
gemma-4-31b,claude-fable-5,muse-spark-1-1,gpt-5-6-sol,mistral-medium-3-5,gpt-5-5-pro,
gpt-oss-120b,glm-5-2,kimi-k3,deepseek-v4-flash,claude-opus-5-high,gemini-3-1-pro-preview,
gemini-3-pro,gemini-3-deep-think
```

> **Method change vs the predecessor — read this before reusing its single URL.**
> Each chart group takes **one** tab value. AA keeps the **first** occurrence of a repeated
> query parameter, so a single URL cannot pin both the bar-chart and the scatter variant of
> the same group. The predecessor's combined URL therefore pins the scatter tabs and hides
> the `Cost per Task` / `Total Cost` bar charts. This capture used **one URL per chart**,
> all sharing the model list above (written below as `…&models=<LIST>`):

| # | Chart read | URL (verbatim, minus the shared `models=` list) |
|---|---|---|
| 1 | Artificial Analysis Intelligence Index (bars) | `https://artificialanalysis.ai/?intelligence=artificial-analysis-intelligence-index&models=<LIST>` |
| 2 | Artificial Analysis Coding Index (bars) | `https://artificialanalysis.ai/?intelligence=coding-index&models=<LIST>` |
| 3 | Artificial Analysis Agentic Index (bars) | `https://artificialanalysis.ai/?intelligence=agentic-index&models=<LIST>` |
| 4 | Intelligence Index by Open Weights / Proprietary (bars) | `https://artificialanalysis.ai/?intelligence-category=open-weights-vs-proprietary&models=<LIST>` |
| 5 | Cost per Intelligence Index Task (stacked bars) | `https://artificialanalysis.ai/?cost=cost-per-task&models=<LIST>` |
| 6 | Intelligence Index vs. Cost per Task (scatter) | `https://artificialanalysis.ai/?cost=intelligence-vs-cost-per-task&models=<LIST>` |
| 7 | Cost to Run Intelligence Index (bars) | `https://artificialanalysis.ai/?total-cost=total-cost&models=<LIST>` |
| 8 | Intelligence Index vs. Cost to Run Index (scatter) | `https://artificialanalysis.ai/?total-cost=intelligence-vs-total-cost&models=<LIST>` |
| 9 | Benchmarks → Intelligence Evaluations → **MMMU-Pro** (bars) | `https://artificialanalysis.ai/?models=<LIST>` (no tab param; scroll to *Benchmarks*) |
| 10 | Openness Index (bars) | `https://artificialanalysis.ai/?models=<LIST>` (default tab of the *Openness Index* group) |
| 11 | Coding Agent Index | `https://artificialanalysis.ai/?coding-agents=index&models=<LIST>` |

Model detail pages read (independent second source for openness and total cost):

- `https://artificialanalysis.ai/models/gemini-3-1-pro-preview`
- `https://artificialanalysis.ai/models/gemini-3-pro`
- `https://artificialanalysis.ai/models/gemini-3-deep-think`
- `https://artificialanalysis.ai/models/deepseek-v4-flash`
- `https://artificialanalysis.ai/models/mistral-medium-3-5`
- `https://artificialanalysis.ai/models/glm-5-2`

**Not used:** AA's `Download data` export and API — paywalled, as recorded in the predecessor.

---

## Method & provenance

Same technique as the predecessor, with one hardening step described below.

| Step | How | Status |
|---|---|---|
| Model catalogue enumeration | Opened the chart's model `combobox`; all **590** options are rendered in the DOM at once (not virtualised). Read `data-value` (slug) + `<span>` (display name) off every `[role=option]`, filtered to options whose logo `<img src>` is `google_small.svg` → 60 Google entries | **verified** |
| Bar-chart scores | Read value labels + `<a>` axis labels out of the rendered SVG, paired by x-centre | **verified** |
| Bar-chart scores — second path | **Every bar hovered** by dispatching `mouseover`/`mousemove` at the bar's own bounding-box centre and reading `.recharts-tooltip-wrapper`. Tooltip supplies the model name, so name↔value↔fill pairing is direct, not inferred from pixel proximity | **verified** |
| Openness (3 tiers) | Bar `fill` attribute on the *Intelligence Index by Open Weights / Proprietary* chart, joined to the **hover tooltip's own model name** (not to axis-label pixels), then mapped through the legend swatch colours read from the legend buttons' inline `background-color` | **verified** |
| Openness — second path | Model detail page header badge (*"Open weights model"* / *"Proprietary model"*) + the `License` row and `Model weights` link in *Technical specifications* | **verified** |
| Cost per task (+ breakdown) | Stacked bars; per-bar total = topmost label; also hover-checked | **verified** |
| Cost per task / total cost, scatter | Scatter encodes values only as log-axis pixels → read from hover tooltips with a real mouse (`mousemove`) | **verified** |
| MMMU-Pro | *Benchmarks → Intelligence Evaluations → MMMU-Pro* mini bar chart; SVG `%` labels **and** per-bar hover tooltips, both paths compared | **verified** |
| Coding Agent Index | SVG text labels only (chart has no `<a>` axis links) | **verified** |

### Hardening step, and why it matters

On the openness chart the `<a>` axis-label centres sit **≈ 19 px to the left** of the bar
centres, while the bar pitch is ≈ 40 px. Nearest-neighbour pairing of a label to a bar
therefore has only ~20 px of margin and is a plausible off-by-one source. All openness
calls in this addendum are taken from **hover tooltips**, which name the model themselves,
so no pixel pairing is involved. Two-path agreement was then required before recording a value.

### Verification actually performed (not assumed)

- **Two independent paths agree** for every Gemini Pro figure recorded below
  (SVG label ↔ hover tooltip; and, for cost, chart ↔ model detail page prose).
- **Segment sum checks out** for Gemini 3.1 Pro Preview: `$0.04 + $0.13 + $0.10 + $0.07 +
  $0.01 = $0.35` against a displayed total of `$0.34` — within the ≤ $0.02 rounding
  tolerance the predecessor used.
- **Cost to run Index for Gemini 3.1 Pro Preview agrees three ways:** bar chart `$815`,
  scatter tooltip `$815.11`, model page prose `$815.11`.
- **MMMU-Pro agrees two ways** for all 18 models (SVG `%` label ↔ hover tooltip).
- The **`Methodology updated · 30 Jul`** notice on the cost charts is still the most recent
  one. No new methodology notice appeared between 31 Jul and 2 Aug.

### Roster coverage, 30 requested models

| Chart | Models with data | Requested models absent |
|---|---:|---|
| Intelligence Index | 28 | `gpt-5-5-pro`, `gemini-3-deep-think` |
| Coding Index | 27 | + `gemini-3-pro` |
| Agentic Index | 27 | + `gemini-3-pro` |
| Cost per task | 24 | + `inkling`, `gemma-4-31b`, `command-a-plus` |
| Cost to run Index | 24 | same 6 as above |
| MMMU-Pro | 18 | see §3 |

`gpt-5-5-pro` still returns no data anywhere — predecessor open item 2 is unchanged.

---

## §1 — PRIMARY: the Gemini Pro tier

### 1a. What Gemini Pro models exist in AA's catalogue today

Enumerated from the model selector, not guessed. All **590** catalogue options are present
in the DOM when the selector is open; **60** carry Google's logo. Every Pro-tier entry, with
its exact slug, newest first:

| Slug | Display name in AA | In this capture? |
|---|---|---|
| `gemini-3-1-pro-preview` | **Gemini 3.1 Pro Preview** | **yes — newest Pro** |
| `gemini-3-pro` | Gemini 3 Pro Preview (high) | yes |
| `gemini-3-pro-low` | Gemini 3 Pro Preview (low) | no (superseded by `gemini-3-pro`) |
| `gemini-2-5-pro` | Gemini 2.5 Pro | no (older generation) |
| `gemini-2-5-pro-05-06` | Gemini 2.5 Pro Preview (May '25) | no |
| `gemini-2-5-pro-03-25` | Gemini 2.5 Pro Preview (Mar' 25) | no |
| `gemini-2-0-pro-experimental-02-05` | Gemini 2.0 Pro Experimental (Feb '25) | no |
| `gemini-1-5-pro` | Gemini 1.5 Pro (Sep '24) | no |
| `gemini-1-5-pro-may-2024` | Gemini 1.5 Pro (May '24) | no |
| `gemini-1-0-pro` | Gemini 1.0 Pro | no |
| `gemini-3-deep-think` | Gemini 3 Deep Think | yes (added, but has no data — see 1d) |

**There is no 3.5-generation or 3.6-generation Gemini Pro in AA's catalogue.** The newest
Pro, `Gemini 3.1 Pro Preview`, is dated **February 2026** on its model page, whereas
`Gemini 3.6 Flash` is a later release. AA's Gemini Pro tier is a generation behind its
Flash tier. Slugs for the pre-3.x Pro models are listed for completeness; **their scores
were not extracted or verified** — they are strictly older than 3.1 Pro and were out of scope.

The predecessor's note that `Gemini 3.1 Pro` appears in the Coding Agent Index is still
true: `Gemini CLI — Gemini 3.1 Pro (high)` = **30**, still rank 15 of 15 (re-read live).

### 1b. Gemini 3.1 Pro Preview — full extract (all figures verified)

| Field | Value | How read |
|---|---:|---|
| **Intelligence Index (v4.1)** | **46** | bar label + 3 hover tooltips (index chart, openness chart, both scatters) + model page |
| **Coding Index** | **68.8** | bar label + hover tooltip |
| **Agentic Index** | **21.4** | bar label + hover tooltip |
| **Cost per Intelligence-Index task** | **$0.34** | stacked-bar top label + stacked-bar tooltip + scatter tooltip |
| **Cost to run full Intelligence Index** | **$815.11** | scatter tooltip + model page prose (bar chart renders `$815`) |
| **Openness** | **Proprietary** | openness-chart fill `#000000` (legend-mapped) + model page badge *"Proprietary model"* |

Cost-per-task breakdown (tooltip): Answer `$0.04` · Reasoning `$0.13` · Cache Write `$0.10`
· Cache Hit `$0.07` · Input `$0.01`.

Supporting facts from the model page (all verified, useful context, not B4 inputs):
released **February 2026**; input `$2.00` / output `$12.00` / cache hit `$0.20` per 1M
tokens; 1M context; input modalities text, image, speech and video; 56M output tokens
consumed running the Index; AA ranks it `#30 / 185` on intelligence within its class.

### 1c. Gemini 3 Pro Preview (high) — partial, and flagged by AA itself

| Field | Value | How read |
|---|---:|---|
| Intelligence Index (v4.1) | **40 — marked as an ESTIMATE by AA** | bar label + hover tooltip |
| Coding Index | **no data** | absent from the chart (27 bars, not 28) |
| Agentic Index | **no data** | absent from the chart |
| Cost per task | **no data** | absent from the chart |
| Cost to run full Index | **no data** | absent from chart; model page has no *"In total, it cost…"* sentence |
| MMMU-Pro | 80% | see §3 |
| Openness | Proprietary | fill `url(#texture-striped-000000)` + model page badge |

Two hard caveats:

1. Its bar is drawn with the striped texture whose legend entry reads
   **"Estimate (independent evaluation forthcoming)"**. The 40 is AA's estimate, not a
   measured score. Do not put it on a slide as a benchmark result.
2. Its model page carries a deprecation banner: *"This model is deprecated. We only continue
   performance benchmarking for the default 10k input token workload… Google has launched a
   newer model, Gemini 3.1 Pro Preview."* Released **November 2025**.

### 1d. Gemini 3 Deep Think — clean negative

`gemini-3-deep-think` exists in the catalogue and was added to the roster, but its model
page reports `Intelligence: N/A`, `Speed: N/A`, `Verbosity: N/A` and `$0.00` prices, and it
appears in **no** index chart, cost chart or evaluation chart in this capture. It carries no
usable data.

### 1e. What this means for "best Gemini" on B4

**Adding the Pro tier does not change the answer.** Gemini 3.6 Flash still leads every
category AA measures for Gemini, on the numbers verified above:

| Category | Gemini 3.6 Flash | Gemini 3.1 Pro Preview | Gemini 3 Pro Preview (high) |
|---|---:|---:|---:|
| Intelligence Index | **50** | 46 | 40 *(estimate)* |
| Coding Index | **69.2** | 68.8 | — |
| Agentic Index | **38.7** | 21.4 | — |
| MMMU-Pro | **83%** | 82% | 80% |
| Cost per task | $0.56 | **$0.34** | — |
| Cost to run Index | **$726.70**¹ | $815.11 | — |

¹ Gemini 3.6 Flash's `$726.70` is carried from the predecessor for context; in this capture
the bar chart rendered it as `$727` and I did **not** re-read its cents. Treat the two-decimal
form as predecessor data, not as re-verified here.

The one place the Pro tier wins outright is a component evaluation, not an index:
**GPQA Diamond — Gemini 3.1 Pro Preview 94%, joint highest of the 28 models with data**
(tied with GPT-5.6 Sol (max), Claude Opus 5 (high) and Kimi K3 (max)); Gemini 3.6 Flash
scores 93%. Read from SVG labels on the *Intelligence Evaluations → GPQA Diamond* chart.

**Consequence for the predecessor's ⚠ Gemini caveat:** the caveat can now be retired. The
"best Gemini" rows in the predecessor's Part 1 are Flash-tier, and that is because AA has no
competitive Gemini Pro entry — not because the roster was mis-selected. The June doc's
`Gemini 3.1 Pro` at 57.2 was Index **v4.0**; the same model scores **46** on v4.1, so those
two numbers must not be compared.

---

## §2 — SECONDARY: the two openness classifications

Read from the **Artificial Analysis Intelligence Index by Open Weights / Proprietary**
chart (capture URL #4). Legend swatch colours, read from the legend buttons' inline
`background-color`:

| Legend label | Swatch |
|---|---|
| Proprietary | `#000000` |
| Open Weights (Commercial Use Restricted) | `#1C359E` |
| Open Weights | `#409CFA` |
| Estimate (independent evaluation forthcoming) | striped texture over the tier colour |

### 2a. DeepSeek V4 Flash 0731 — **REFUTED**

The predecessor recorded **Proprietary**. As AA renders it on 2 August 2026 it is
**Open Weights (unrestricted)**.

| Evidence | Reading |
|---|---|
| Openness chart, bar fill | `#409CFA` = **Open Weights** |
| Openness chart, hover tooltip on that same bar | `DeepSeek V4 Flash 0731 (Reasoning, Max Effort) / Intelligence Index: 50` — so the fill and the name come from one element, no pixel pairing |
| Model page `/models/deepseek-v4-flash` header badge | **"Open weights model"** |
| Model page → Technical specifications → `License` | **`Mit`** |
| Model page → Technical specifications → `Model weights` | link to **Hugging Face** |

DeepSeek V4 Pro is also `#409CFA` = Open Weights, unchanged from the predecessor. So the two
DeepSeek models are now in the **same** tier, and the anomaly the predecessor flagged no
longer exists.

**I cannot establish why the two readings differ.** I did not observe AA's state on 31 July.
Either AA reclassified the model between the two captures, or the predecessor's
colour-to-name join (which used pixel-x pairing — the exact step hardened here, see *Method*)
mis-assigned it. Do not present this as "AA corrected an error".

**Direct impact on the slide:** the predecessor excluded DeepSeek V4 Flash 0731 from its
open-weight cost cut on the strength of the Proprietary label. On today's data that
exclusion is wrong. DeepSeek V4 Flash 0731 (max) — Intelligence **50**, `$0.03`/task,
`$72.02` to run the Index — is an unrestricted open-weight model and would **head** the
open-weight cut on both score and cost, displacing Kimi K3 (restricted, 57) as the cheapest
credible open-weight headline. Re-read this classification immediately before the slide
ships; it has now moved once inside 48 hours.

### 2b. Mistral Medium 3.5 — **CONFIRMED**

| Evidence | Reading |
|---|---|
| Openness chart, bar fill | `#409CFA` = **Open Weights** |
| Openness chart, hover tooltip on that same bar | `Mistral Medium 3.5 / Intelligence Index: 30` |
| Model page `/models/mistral-medium-3-5` header badge | **"Open weights model"** |
| Model page → `License` | **`Other`** |
| Model page → `Model weights` | link to **Hugging Face** |

AA does place it in the unrestricted **Open Weights** tier, not the restricted tier. Worth
knowing before a reviewer challenges it: AA's own `License` field reads **`Other`**, i.e.
not a recognised permissive licence, yet the model is still bucketed as unrestricted. If the
slide leans on "unrestricted commercial use", that specific claim rests on AA's bucketing
alone, and AA does not name the licence.

### 2c. Full openness tiering in this capture (28 models with data)

- **Proprietary (16):** Claude Opus 5 (max & high), Claude Fable 5, Claude Opus 4.8,
  Claude Sonnet 5, Claude 4.5 Haiku, GPT-5.6 Sol, GPT-5.6 Terra, GPT-5.6 Luna, Grok 4.5,
  Muse Spark 1.1, Gemini 3.6 Flash, **Gemini 3.1 Pro Preview**,
  **Gemini 3 Pro Preview (high)** *(estimate)*, Gemini 3.5 Flash-Lite, Qwen3.7 Max
- **Open Weights — commercial use restricted (2):** Kimi K3, MiniMax-M3
- **Open Weights (10):** GLM-5.2, **DeepSeek V4 Flash 0731**, DeepSeek V4 Pro,
  MiMo-V2.5-Pro, Inkling, Nemotron 3 Ultra, Mistral Medium 3.5, Gemma 4 31B,
  gpt-oss-120b, Command A+

Only difference from the predecessor's tiering, model for model, is DeepSeek V4 Flash 0731
moving Proprietary → Open Weights, plus the two new Gemini Pro entries.

### 2d. Openness Index (separate chart, does not settle 2a)

AA also publishes a numeric **Openness Index** (0–100). Its roster in this capture is 13 of
292 models and **DeepSeek V4 Flash 0731 is not in it**, so it neither supports nor
contradicts §2a. Values read (SVG labels): Nemotron 3 Ultra 83 · DeepSeek V4 Pro 50 ·
GLM-5.2 44 · MiMo-V2.5-Pro / Inkling / Command A+ / Gemma 4 31B / gpt-oss-120b / Kimi K3 all
39 · MiniMax-M3 33 · **Mistral Medium 3.5 33** · Claude 4.5 Haiku 11 ·
Gemini 3 Pro Preview (high) 6. Note this index is *not* restricted to open-weight models.

---

## §3 — SECONDARY: MMMU-Pro has a live source

**Yes. MMMU-Pro is live on the main dashboard** and no longer needs the screenshot.

Location: main page → **Benchmarks** → *Intelligence Evaluations* → the **MMMU-Pro** mini
bar chart, subtitled **"Visual reasoning"**. It renders on scroll (lazy-loaded); no tab or
URL parameter is needed beyond the model list.

**Important scope note:** the *Intelligence Evaluations* section now shows **21** evaluation
charts, while Intelligence Index v4.1 is built from **9**. MMMU-Pro is one of the extra 12 —
it is displayed by AA but is **not** a component of the Intelligence Index. The predecessor's
framing of Multimodal as a separate scale still holds.

All 18 models with data, both read paths in agreement:

| Rank | Model | MMMU-Pro | Openness (from §2c) |
|---:|---|---:|---|
| 1 | Claude Opus 5 (max) | **85%** | proprietary |
| =2 | GPT-5.6 Sol (max) | 83% | proprietary |
| =2 | Gemini 3.6 Flash | 83% | proprietary |
| =4 | Claude Opus 5 (high) | 82% | proprietary |
| =4 | **Gemini 3.1 Pro Preview** | **82%** | proprietary |
| =6 | GPT-5.6 Terra (max) | 81% | proprietary |
| =6 | **Kimi K3 (max)** | **81%** | **open — restricted** |
| =8 | Grok 4.5 (high) | 80% | proprietary |
| =8 | Gemini 3 Pro Preview (high) | 80% | proprietary *(deprecated)* |
| =10 | Gemini 3.5 Flash-Lite | 79% | proprietary |
| =10 | MiniMax-M3 | 79% | open — restricted |
| =10 | GPT-5.6 Luna (max) | 79% | proprietary |
| 13 | Claude Sonnet 5 (max) | 77% | proprietary |
| =14 | **Inkling** | **73%** | **open — unrestricted** |
| =14 | Gemma 4 31B | 73% | open — unrestricted |
| 16 | Mistral Medium 3.5 | 65% | open — unrestricted |
| 17 | Command A+ | 63% | open — unrestricted |
| 18 | Claude 4.5 Haiku | 59% | proprietary |

**The gap the predecessor could not fill is now filled:** unrestricted open-weight models
**do** appear on MMMU-Pro — best is **Inkling at 73%**, 12 points behind Claude Opus 5 (max).
Restricted-tier best is **Kimi K3 (max) at 81%**, 4 points behind.

Values that overlap the predecessor's screenshot-only table (Claude Opus 5 85, GPT-5.6 Sol
83, Gemini 3.6 Flash 83, Kimi K3 81, Grok 4.5 80, MiniMax-M3 79) **all match exactly**, so
the screenshot table was accurate as far as it went; it was simply truncated to 6 models.
AA still renders MMMU-Pro as whole percentages, so the ties may not be true ties.

---

## Incidental finding — outside the three objectives, but it breaks a slide claim

Not requested; surfaced while re-reading the cost charts. Reported separately rather than
folded in.

**GLM-5.2 (max) cost has moved sharply since 31 July.**

| Metric | Predecessor (31 Jul) | This capture (2 Aug) | How read now |
|---|---:|---:|---|
| Cost per task | $0.29 | **$0.69** | stacked-bar top label + tooltip |
| — of which Cache Write | $0.00 | **$0.40** | tooltip breakdown |
| Cost to run full Index | $710.15 | **$1,061.18** | bar chart `$1,061` + model page prose `$1061.18` |

Its Intelligence Index is unchanged at 51. Every other cost figure I re-read in this capture
matches the predecessor — cost per task exactly (22 of the 23 shared models), cost to run the
Index to the rounded dollar the bar chart renders (that chart shows whole dollars; I read
cents only for Gemini 3.1 Pro Preview and GLM-5.2). So this is a single-model change, not a
global re-baseline; the only methodology notice on the page is still the `30 Jul` one.
**Cause not established.**

Two predecessor conclusions this invalidates:

- *"Best value near the frontier: GLM-5.2 (max) reaches index 51 for $0.29/task — ~1/8 the
  per-task cost of Claude Opus 5 (max)"*. On today's numbers it is **$0.69/task ≈ 1/3.4** of
  Claude Opus 5 (max)'s $2.34.
- The GLM-5.2 quadrant-boundary ambiguity (predecessor Part 3c, open item 8) is moot at
  $1,061.18 — it is now clearly outside any ~$710 edge. The underlying warning (the quadrant
  is a viewport-relative rendering artifact) still stands and is unaffected.

---

## Could not establish

1. **Why DeepSeek V4 Flash 0731's openness differs from the 31 July reading.** I only
   observed 2 August state. AA reclassification vs a predecessor pairing error cannot be
   distinguished from here; AA publishes no changelog on the chart.
2. **Why GLM-5.2's cost changed.** No methodology notice, no provider note found on the page.
3. **Whether the 31 July `Gemini 3.6 Flash` cost figures still hold to the cent.** The bar
   charts round to whole dollars for total cost; I read cents only for Gemini 3.1 Pro
   Preview and GLM-5.2 via scatter tooltips / model pages.
4. **Scores for pre-3.x Gemini Pro models** (`gemini-2-5-pro` and older). Slugs enumerated,
   values deliberately not extracted — all are older than `gemini-3-1-pro-preview`.
5. **Whether `Gemini 3 Pro Preview (high)`'s Intelligence Index 40 will survive evaluation.**
   AA labels it an estimate; nothing on the page dates it or commits to a completion date.
6. **A Gemini Pro entry newer than 3.1.** Established as absent by enumerating all 590
   catalogue options and filtering the 60 Google-logo entries — a clean negative, not an
   inference from search text.
7. **A `Creative` source.** Still no AA chart matching B4's `creative` category; unchanged
   from the predecessor.
8. **Legend series toggling.** Clicking the openness legend entries via the CLI did not
   filter the chart in my session, so the toggle-based cross-check of §2 could not be run.
   The tooltip and model-page paths were used instead and agree.

---

## What this changes in the predecessor's open items

| Predecessor open item | Status after this addendum |
|---|---|
| 1. Gemini Pro gap | **Closed.** Newest Pro is `gemini-3-1-pro-preview`; it scores *below* Gemini 3.6 Flash on all four B4 categories. Best-Gemini rows need no change. |
| 3. MMMU-Pro screenshot-only | **Closed.** Live at Benchmarks → Intelligence Evaluations → MMMU-Pro; 18 models incl. unrestricted open weights. |
| 7. Two suspect openness labels | **Closed, one refuted.** Mistral Medium 3.5 = Open Weights confirmed. DeepSeek V4 Flash 0731 = **Open Weights**, not Proprietary — changes which model heads the open-weight cut. |
| 2, 4, 5, 6, 8 | Unchanged; item 8's GLM-5.2 boundary case is moot on the new cost figure. |

---

## SOURCES

**Primary (live, 2 August 2026, `playwright-cli`, viewport 1600 × 1200):** the 11 capture
URLs and 6 model detail pages listed at the top of this document.

**Predecessor:** `docs/researches/2026-07-31-artificialanalysis-model-data.md` (Index v4.1,
31 July 2026) — still the source for every roster figure not re-read here.

**Consumer:** `src/slides/landscape-section-b/content.ts` → `b4Content` (not modified by this
research task).
