# Artificial Analysis — Model Scores & Cost per Task (31 July 2026)

**Source of Truth:** Artificial Analysis (artificialanalysis.ai), **Intelligence Index v4.1**
**Data Fetched:** 31 July 2026, via local `playwright-cli` against the live dashboard
**URL:** https://artificialanalysis.ai/

> Raw datapoints to refresh **slide B4** (`landscape-section-b/content.ts`, `b4Content`) —
> obsolete model roster/scoring, brief item 5, applies to **all** deck variants.
> Replaces the benchmark numbers in `2026-06-08-llm-benchmarks-june-2026.md` (Index v4.0).
> It does **not** carry over that doc's `scaleMax` values or qualitative matrix — see
> *B4 wiring notes* below for what still needs deciding.

**Capture URL** (pins an explicit 27-model roster so the numbers are reproducible):

```
https://artificialanalysis.ai/?intelligence=agentic-index&cost=intelligence-vs-cost-per-task
  &total-cost=intelligence-vs-total-cost&coding-agents=index
  &models=mimo-v2-5-pro,gemini-3-5-flash-lite,inkling,claude-sonnet-5,minimax-m3,
    command-a-plus,gpt-5-6-luna,nvidia-nemotron-3-ultra-550b-a55b,qwen3-7-max,
    gemini-3-6-flash,grok-4-5,claude-opus-4-8,claude-4-5-haiku-reasoning,claude-opus-5,
    gpt-5-6-terra,deepseek-v4-pro,gemma-4-31b,claude-fable-5,muse-spark-1-1,gpt-5-6-sol,
    mistral-medium-3-5,gpt-5-5-pro,gpt-oss-120b,glm-5-2,kimi-k3,deepseek-v4-flash,
    claude-opus-5-high#total-cost-tabs
```

> **Each category is a DIFFERENT index on its own scale** (unchanged from the June doc):
> Write & Reason → *Intelligence Index* (0–100, integers as rendered);
> Code → *Coding Index*; Agentic → *Agentic Index*; Multimodal → *MMMU-Pro (%)*.
> Both cost charts plot the *overall Intelligence Index* on their Y-axis. A model
> can therefore read differently across sections — different metrics, not errors.

**Licence terminology** — AA uses **three** tiers, and the tables below shorten them
differently to fit. They mean the same thing throughout:

| AA's label | Shorthand used here |
|---|---|
| Proprietary | `closed` · `closed-weight` · `proprietary` |
| Open Weights (Commercial Use Restricted) | `open (restricted)` · "open-weight — commercial use restricted" |
| Open Weights | `open` · "open-weight — unrestricted" |

The restricted tier matters commercially and is **not** in B4's current closed/open binary.

---

## Method & provenance

| Step | How | Status |
|---|---|---|
| Bar-chart scores | Read value labels + `<a>` axis labels out of the rendered SVG, paired by x-centre | **verified** |
| Cost per task (+ breakdown) | Stacked bars; per-bar total = topmost label. Every bar also hover-checked | **verified** |
| Total cost, cost-per-task scatter | Scatter encodes values only as log-axis pixels → read from hover tooltips | **verified** |
| Openness (open weights / proprietary) | Bar fill colour, joined to hover-verified model names by pixel x | **verified** |
| MMMU-Pro (multimodal) | **Screenshot only** — not present on the main dashboard | **not re-verified live** |

Verification actually performed (not assumed):

- **Two independent paths agree.** Cost per task read from stacked-bar labels matches the
  cost-per-task *scatter* tooltips for all 23 models; Intelligence Index read from bars
  matches the scatter tooltips for all 23.
- **Segment sums check out.** For all 23 cost rows, `Answer + Reasoning + Cache Write +
  Cache Hit + Input` equals the displayed total within rounding (≤ $0.02).
- `Download data` on the site is **paywalled** (opens a `/pricing` dialog), so no CSV/API
  export was used — all numbers come from the rendered charts.

**Screenshot cross-check, per screenshot** (all five named in the issue):

| Screenshot | Covers | Result |
|---|---|---|
| `2026-07-31-agentic.png` | Agentic Index, 25 bars | all shared values match exactly |
| `2026-07-31-coding.png` | Coding Index, 25 bars | all shared values match exactly |
| `2026-07-31-write-and-reason.png` | **overall Intelligence Index**, 25 bars | all shared values match exactly |
| `2026-07-31-multimodal.png` | MMMU-Pro (%), 6 bars only | sole source for Part 1 §4 — no live equivalent |
| `2026-07-31-intelligence-vs-cost.png` | Intelligence vs **total** cost scatter | values match; **quadrant edge differs** — see Part 3c |

Two things the screenshots do **not** cover: **cost per task** (no screenshot exists for it —
those figures rest on the live extract plus the two-path agreement above) and **openness**
(the reference screenshots colour bars by *provider*, not licence, so Part 3d cannot be
screenshot-verified).

**Provenance caveats worth carrying into B4:**

1. **AA changed the Cost-per-Task methodology.** A methodology notice on the page (dated
   30 Jul 2026) reads: *"We have updated our Cost per Task methodology, resulting in slight
   absolute increases in cost estimates but with minimal impact on relative positioning."*
   Cost figures here are **not** directly comparable to the June 2026 doc.
2. **`2026-07-31-write-and-reason.png` shows the chart titled "Artificial Analysis
   Intelligence Index".** That *is* the right source for the Write & Reason panel (the panel
   is fed by the overall Intelligence Index) — there is no separate "write & reason" chart on
   AA. Flagged only so nobody hunts for one.
3. **Precision differs from the June doc,** which instructed "use 1 decimal place for all
   index scores". Index v4.1 renders the **overall Intelligence Index as integers**, so 1 dp
   is not available for Write & Reason; Coding and Agentic are 1 dp as before. Values are
   recorded exactly as AA renders them — no padded decimals.

### Roster coverage gaps

| | Count | Missing |
|---|---:|---|
| Requested in URL | 27 | — |
| Have index scores (Intelligence / Coding / Agentic) | 26 | **GPT-5.5 Pro** — no data in any chart |
| Have cost data (per-task + total) | 23 | GPT-5.5 Pro, **Inkling**, **Gemma 4 31B**, **Command A+** |
| Models visible in the screenshots | 26 of 589 in catalogue | Live read shows 27 of 590. The +1 selected model is `claude-opus-5-high` (added by the pinned URL); the catalogue count also differs by 1, cause not established |

---

## PART 1 — Category leaderboards (feeds the B4 bar panels)

Curation rule applied: **best Claude + best ChatGPT + best Gemini**, plus the **best
open-weight** contender. Because AA splits open weights into two licence tiers, the best
*unrestricted* open-weight model is listed separately — the distinction is material for
commercial use.

> **Assumption flagged:** "3 best numbers from Claude, ChatGPT and Gemini" is read as
> *one best model per brand* (which guarantees Gemini appears). Ranking the top 3
> closed-weight models purely by score gives a different, Gemini-free set — that
> ordering is noted under each table so either reading is available.

### 1. Write & Reason — AA Intelligence Index (v4.1)

| Rank | Model | Score | Type |
|------|-------|------:|------|
| 1 | Claude Opus 5 (max) | **61** | closed |
| 2 | GPT-5.6 Sol (max) | 59 | closed |
| 3 | Gemini 3.6 Flash | 50 | closed |
| — | **Kimi K3 (max)** | **57** | **open-weight — commercial use restricted** |
| — | **GLM-5.2 (max)** | **51** | **open-weight — unrestricted** |

Pure top-3 closed by score: Claude Opus 5 (max) 61 · Claude Fable 5 (with fallback) 60 · GPT-5.6 Sol (max) 59.
**Open-weight gap to leader:** 4 points (Kimi K3, restricted) · 10 points (GLM-5.2, unrestricted).

### 2. Code — AA Coding Index (Terminal-Bench v2.1, SciCode)

| Rank | Model | Score | Type |
|------|-------|------:|------|
| 1 | Claude Opus 5 (max) | **78.0** | closed |
| 2 | GPT-5.6 Sol (max) | 77.4 | closed |
| 3 | Gemini 3.6 Flash | 69.2 | closed |
| — | **Kimi K3 (max)** | **76.2** | **open-weight — commercial use restricted** |
| — | **GLM-5.2 (max)** | **68.8** | **open-weight — unrestricted** |

Pure top-3 closed by score: Claude Opus 5 (max) 78.0 · GPT-5.6 Sol (max) 77.4 · GPT-5.6 Terra (max) 76.7.
**Open-weight gap to leader:** 1.8 points (Kimi K3, restricted) · 9.2 points (GLM-5.2, unrestricted).

### 3. Agentic — AA Agentic Index (GDPval-AA v2, 𝜏³-Banking)

| Rank | Model | Score | Type |
|------|-------|------:|------|
| 1 | Claude Opus 5 (max) | **55.3** | closed |
| 2 | GPT-5.6 Sol (max) | 54.0 | closed |
| 3 | Gemini 3.6 Flash | 38.7 | closed |
| — | **Kimi K3 (max)** | **50.1** | **open-weight — commercial use restricted** |
| — | **GLM-5.2 (max)** | **43.1** | **open-weight — unrestricted** |

Pure top-3 closed by score: Claude Opus 5 (max) 55.3 · GPT-5.6 Sol (max) 54.0 · Claude Fable 5 (with fallback) 52.8.
**Open-weight gap to leader:** 5.2 points (Kimi K3, restricted) · 12.2 points (GLM-5.2, unrestricted).

### 4. Multimodal — MMMU-Pro (%) — ⚠ screenshot only, not re-verified live

Source: `docs/references/artificialanalysis/2026-07-31-multimodal.png` (6 models only).
MMMU-Pro is **not** on the main dashboard, so this was not re-extracted or verified.

| Rank | Model | Score | Type |
|------|-------|------:|------|
| 1 | Claude Opus 5 (max) | **85%** | closed |
| =2 | GPT-5.6 Sol (max) | 83% | closed |
| =2 | Gemini 3.6 Flash | 83% | closed |
| — | **Kimi K3 (max)** | **81%** | **open-weight — commercial use restricted** |

GPT-5.6 Sol and Gemini 3.6 Flash are **tied at 83%** (AA renders MMMU-Pro as whole
percentages, so the tie may not be a true tie). **Open-weight gap to leader:** 4 points
(Kimi K3, restricted); no unrestricted open-weight model appears at all.

Also in that screenshot: Grok 4.5 (high) 80% (closed), MiniMax-M3 79% (open, restricted).
No unrestricted open-weight model appears — treat the open-weight row here as weaker
evidence than the other three categories.

> **⚠ Gemini caveat for all four tables.** The pinned roster contains only
> **Gemini 3.6 Flash** and **Gemini 3.5 Flash-Lite** — no Gemini Pro tier. The "best
> Gemini" rows above are therefore **Flash-tier** models and are *not* comparable to the
> June doc's `Gemini 3.1 Pro` (57.2). If B4 needs a like-for-like Gemini Pro number, the
> roster must be extended before the slide is written.

---

## PART 2 — Cost (feeds the B4 cost/scatter panel)

Two distinct metrics, do not conflate:

- **Cost per task** — USD to run one average Intelligence-Index task.
- **Cost to run Intelligence Index** — USD to run the whole v4.1 eval suite (9 evaluations).

Curation rule applied: **best 4 closed-weight + best 4 open-weight**, ranked by
Intelligence Index (i.e. "best" = most capable, then show what it costs — the comparison
B4's scatter is making). Full 23-row table is in Part 3 if a different cut is needed.

### Top 4 closed-weight, by Intelligence Index

| Model | Index | Cost/task | Cost to run full Index |
|---|---:|---:|---:|
| Claude Opus 5 (max) | 61 | $2.34 | $3,835.51 |
| Claude Fable 5 (with fallback) | 60 | $3.15 | $5,630.52 |
| GPT-5.6 Sol (max) | 59 | $1.86 | $3,442.81 |
| Claude Opus 5 (high) | 59 | $1.23 | $1,973.77 |

Brand-diverse alternative (if 3× Claude is unwanted): swap in **GPT-5.6 Terra (max)** — index 55, $0.73/task, $1,607.93 — and **Gemini 3.6 Flash** — index 50, $0.56/task, $726.70.

### Top 4 open-weight, by Intelligence Index

| Model | Index | Cost/task | Cost to run full Index | Licence |
|---|---:|---:|---:|---|
| Kimi K3 (max) | 57 | $0.86 | $2,437.41 | restricted |
| GLM-5.2 (max) | 51 | $0.29 | $710.15 | unrestricted |
| MiniMax-M3 | 44 | $0.14 | $203.86 | restricted |
| DeepSeek V4 Pro (max) | 44 | $0.05 | $176.34 | unrestricted |

Note: **DeepSeek V4 Flash 0731 (max)** scores 50 and costs only $0.03/task, but AA
classifies it **Proprietary**, so it is excluded from the open-weight cut. **Inkling**
(index 41, open weights) has **no cost data** and cannot be placed here.

### Headline contrasts for the slide

- **Cheapest → dearest per task spans ~105×:** DeepSeek V4 Flash 0731 $0.03 → Claude Fable 5 $3.15.
- **Full-suite cost spans ~78×:** DeepSeek V4 Flash 0731 $72.02 → Claude Fable 5 $5,630.52.
- **Effort tier is a real cost lever, same model:** Claude Opus 5 (high) = index 59 at
  $1.23/task vs Claude Opus 5 (max) = index 61 at $2.34/task — **+2 index points for ~1.9× the cost**.
- **Best value near the frontier:** GLM-5.2 (max) reaches index 51 for $0.29/task —
  ~1/8 the per-task cost of Claude Opus 5 (max) at ~84% of its index score.

---

## PART 3 — Full roster tables (raw extract)

### 3a. All index scores (26 models; GPT-5.5 Pro has no data)

Sorted by Intelligence Index. `—` = model absent from that chart.

| Model | Intelligence | Coding | Agentic | Weights |
|---|---:|---:|---:|---|
| Claude Opus 5 (max) | 61 | 78.0 | 55.3 | proprietary |
| Claude Fable 5 (with fallback) | 60 | 76.5 | 52.8 | proprietary |
| GPT-5.6 Sol (max) | 59 | 77.4 | 54.0 | proprietary |
| Claude Opus 5 (high) | 59 | 76.5 | 52.1 | proprietary |
| Kimi K3 (max) | 57 | 76.2 | 50.1 | open (restricted) |
| Claude Opus 4.8 (max) | 56 | 74.3 | 47.2 | proprietary |
| GPT-5.6 Terra (max) | 55 | 76.7 | 47.4 | proprietary |
| Grok 4.5 (high) | 54 | 72.4 | 45.7 | proprietary |
| Claude Sonnet 5 (max) | 53 | 71.5 | 46.7 | proprietary |
| GPT-5.6 Luna (max) | 51 | 71.4 | 45.6 | proprietary |
| GLM-5.2 (max) | 51 | 68.8 | 43.1 | open |
| Muse Spark 1.1 (xhigh) | 51 | 71.3 | 37.5 | proprietary |
| Gemini 3.6 Flash | 50 | 69.2 | 38.7 | proprietary |
| DeepSeek V4 Flash 0731 (max) | 50 | 69.1 | 45.7 | proprietary |
| Qwen3.7 Max | 46 | 66.0 | 30.6 | proprietary |
| MiniMax-M3 | 44 | 58.6 | 35.4 | open (restricted) |
| DeepSeek V4 Pro (max) | 44 | 59.4 | 36.4 | open |
| MiMo-V2.5-Pro | 42 | 60.2 | 29.1 | open |
| Inkling | 41 | 52.1 | 32.3 | open |
| Nemotron 3 Ultra | 38 | 49.3 | 27.4 | open |
| Gemini 3.5 Flash-Lite | 36 | 49.3 | 26.8 | proprietary |
| Mistral Medium 3.5 | 30 | 46.9 | 19.0 | open |
| Claude 4.5 Haiku | 30 | 43.9 | 16.4 | proprietary |
| Gemma 4 31B | 29 | 43.4 | 14.4 | open |
| gpt-oss-120b (high) | 24 | 30.4 | 13.2 | open |
| Command A+ | 23 | 27.8 | 9.2 | open |

### 3b. Cost per Intelligence-Index task, with token-class breakdown (23 models)

Model names as given by the hover tooltip (they disclose the exact endpoint config).
Segments sum to the total within rounding for every row.

| Model (endpoint config) | Cost/task | Answer | Reasoning | Cache Write | Cache Hit | Input |
|---|---:|---:|---:|---:|---:|---:|
| DeepSeek V4 Flash 0731 (Reasoning, Max Effort) | $0.03 | $0.0026 | $0.01 | $0.01 | $0.0035 | $0.0009 |
| MiMo-V2.5-Pro | $0.05 | $0.01 | $0.01 | $0.02 | $0.0014 | $0.0032 |
| DeepSeek V4 Pro (Reasoning, Max Effort) | $0.05 | $0.01 | $0.03 | $0.01 | $0.0015 | $0.0027 |
| GPT-5.6 Luna (max) | $0.07 | $0.01 | $0.02 | $0.03 | $0.01 | $0.0015 |
| gpt-oss-120b (high) | $0.08 | $0.0046 | $0.02 | $0.05 | $0.00 | $0.0009 |
| Gemini 3.5 Flash-Lite | $0.10 | $0.01 | $0.02 | $0.04 | $0.02 | $0.0021 |
| MiniMax-M3 | $0.14 | $0.02 | $0.01 | $0.03 | $0.08 | $0.0023 |
| Claude 4.5 Haiku (Reasoning) | $0.25 | $0.03 | $0.09 | $0.09 | $0.03 | $0.01 |
| Muse Spark 1.1 (xhigh) | $0.29 | $0.03 | $0.06 | $0.09 | $0.10 | $0.01 |
| GLM-5.2 (max) | $0.29 | $0.03 | $0.17 | $0.00 | $0.08 | $0.01 |
| Nemotron 3 Ultra 550B A55B (Reasoning) | $0.41 | $0.02 | $0.04 | $0.35 | $0.00 | $0.0047 |
| Grok 4.5 (high) | $0.44 | $0.04 | $0.05 | $0.15 | $0.19 | $0.01 |
| Gemini 3.6 Flash (high) | $0.56 | $0.09 | $0.10 | $0.22 | $0.13 | $0.01 |
| Mistral Medium 3.5 | $0.61 | $0.06 | $0.14 | $0.32 | $0.08 | $0.01 |
| GPT-5.6 Terra (max) | $0.73 | $0.07 | $0.18 | $0.32 | $0.14 | $0.01 |
| Kimi K3 (max) | $0.86 | $0.10 | $0.28 | $0.19 | $0.26 | $0.02 |
| Claude Opus 5 (Adaptive Reasoning, High Effort) | $1.23 | $0.22 | $0.31 | $0.25 | $0.40 | $0.05 |
| Qwen3.7 Max | $1.28 | $0.04 | $0.13 | $1.08 | $0.01 | $0.02 |
| Claude Sonnet 5 (Adaptive Reasoning, Max Effort) | $1.72 | $0.15 | $0.58 | $0.28 | $0.69 | $0.02 |
| GPT-5.6 Sol (max) | $1.86 | $0.18 | $0.32 | $0.90 | $0.42 | $0.03 |
| Claude Opus 4.8 (Adaptive Reasoning, Max Effort) | $2.03 | $0.24 | $0.88 | $0.37 | $0.50 | $0.05 |
| Claude Opus 5 (Adaptive Reasoning, Max Effort) | $2.34 | $0.36 | $0.64 | $0.41 | $0.87 | $0.05 |
| Claude Fable 5 (Adaptive Reasoning, Max Effort, Opus 4.8 Fallback) | $3.15 | $0.43 | $1.26 | $0.59 | $0.78 | $0.09 |

Reading the breakdown: **Cache Write dominates** for Qwen3.7 Max ($1.08 of $1.28) and
Nemotron 3 Ultra ($0.35 of $0.41), while **Reasoning dominates** for Claude Fable 5
($1.26 of $3.15) and Claude Opus 4.8 ($0.88 of $2.03). GLM-5.2 shows $0.00 Cache Write.

### 3c. Cost to run the full Intelligence Index, vs index score (23 models)

| Model | Cost to run Index | Intelligence Index |
|---|---:|---:|
| DeepSeek V4 Flash 0731 (max) | $72.02 | 50 |
| gpt-oss-120b (high) | $96.28 | 24 |
| MiMo-V2.5-Pro | $107.98 | 42 |
| Gemini 3.5 Flash-Lite | $153.08 | 36 |
| DeepSeek V4 Pro (max) | $176.34 | 44 |
| GPT-5.6 Luna (max) | $190.87 | 51 |
| MiniMax-M3 | $203.86 | 44 |
| Claude 4.5 Haiku | $538.77 | 30 |
| Muse Spark 1.1 (xhigh) | $548.07 | 51 |
| Nemotron 3 Ultra | $550.78 | 38 |
| Grok 4.5 (high) | $639.87 | 54 |
| GLM-5.2 (max) | $710.15 | 51 |
| Gemini 3.6 Flash | $726.70 | 50 |
| Mistral Medium 3.5 | $982.94 | 30 |
| Qwen3.7 Max | $1,604.13 | 46 |
| GPT-5.6 Terra (max) | $1,607.93 | 55 |
| Claude Opus 5 (high) | $1,973.77 | 59 |
| Kimi K3 (max) | $2,437.41 | 57 |
| GPT-5.6 Sol (max) | $3,442.81 | 59 |
| Claude Opus 4.8 (max) | $3,752.55 | 56 |
| Claude Opus 5 (max) | $3,835.51 | 61 |
| Claude Sonnet 5 (max) | $4,010.12 | 53 |
| Claude Fable 5 (with fallback) | $5,630.52 | 60 |

AA shades a **"most attractive quadrant"** (high index, low cost) on this chart. **The
quadrant is not a fixed data threshold — it is literally the top-left quarter of the plot
area**, so its edges move with the axis domain and therefore with window size. Calibrating
the rendered axis from its tick labels (`px = 511·log₁₀($) − 508`; y linear, index 20 at
y=784, 50 at y=567) puts the edges at:

- **cost edge ≈ $710** — the geometric midpoint of the cost axis ($65.5 … $7,706)
- **index floor ≈ 42.5**

**6 models are unambiguously inside:**

| Model | Cost to run Index | Index | Weights |
|---|---:|---:|---|
| DeepSeek V4 Flash 0731 (max) | $72.02 | 50 | proprietary |
| DeepSeek V4 Pro (max) | $176.34 | 44 | open |
| GPT-5.6 Luna (max) | $190.87 | 51 | proprietary |
| MiniMax-M3 | $203.86 | 44 | open (restricted) |
| Muse Spark 1.1 (xhigh) | $548.07 | 51 | proprietary |
| Grok 4.5 (high) | $639.87 | 54 | proprietary |

**⚠ GLM-5.2 (max) — $710.15 / index 51 — sits *on* the boundary** (0.02% past a ~$710
edge). It reads *inside* at the 1600×1200 viewport used for this extract and *outside* in
`2026-07-31-intelligence-vs-cost.png`, which was captured at a narrower width. **Do not
assert GLM-5.2's quadrant membership on a slide** — cite its cost and index instead.

Clearly **outside**: Gemini 3.6 Flash ($726.70 / 50) is past the cost edge; MiMo-V2.5-Pro
($107.98 / **42**) is cheap but falls just below the index floor (42.5). No Claude, GPT-5.6
Sol or GPT-5.6 Terra model qualifies.

Because the quadrant is a viewport-relative rendering artifact, **B4 should state the
cost/index numbers rather than reproduce AA's quadrant** — otherwise the slide's claim
depends on the width of the browser AA was screenshotted in.

### 3d. Openness classification (authoritative, from AA's own chart)

AA uses **three** tiers, not two:

- **Proprietary (15):** Claude Opus 5 (max & high), Claude Fable 5, Claude Opus 4.8,
  Claude Sonnet 5, Claude 4.5 Haiku, GPT-5.6 Sol, GPT-5.6 Terra, GPT-5.6 Luna,
  Grok 4.5, Muse Spark 1.1, Gemini 3.6 Flash, Gemini 3.5 Flash-Lite,
  **DeepSeek V4 Flash 0731**, Qwen3.7 Max
- **Open Weights — commercial use restricted (2):** Kimi K3, MiniMax-M3
- **Open Weights (9):** GLM-5.2, DeepSeek V4 Pro, MiMo-V2.5-Pro, Inkling,
  Nemotron 3 Ultra, Mistral Medium 3.5, Gemma 4 31B, gpt-oss-120b, Command A+

Two classifications that will surprise reviewers and are worth double-checking before
they go on a slide — both are **as AA renders them**, not our inference:
**DeepSeek V4 Flash 0731 = Proprietary** (while DeepSeek V4 Pro is Open Weights), and
**Mistral Medium 3.5 = Open Weights**.

---

## PART 4 — Coding Agent Index (bonus; different leaderboard)

Requested by `coding-agents=index` in the URL. **This is a separate leaderboard with its
own roster (15 of 52)** and its entities are **harness × model** pairs, not bare models —
do not merge it into the model tables above.

| Rank | Agent — Model | Score |
|---:|---|---:|
| 1 | Claude Code — Opus 5 (xhigh) | 67 |
| 2 | Codex — GPT-5.6 Sol (max) | 67 |
| 3 | Claude Code — Fable 5 (max) (with fallback) | 66 |
| 4 | Claude Code — Opus 5 (max) | 66 |
| 5 | Grok Build — Grok 4.5 (high) | 64 |
| 6 | Codex — GPT-5.6 Terra (max) | 62 |
| 7 | Codex — GPT-5.5 (xhigh) | 61 |
| 8 | Kimi Code CLI — Kimi K3 | 61 |
| 9 | Claude Code — Opus 4.8 (max) | 61 |
| 10 | Codex — GPT-5.6 Luna (max) | 59 |
| 11 | Opencode — Muse Spark 1.1 (xhigh) | 54 |
| 12 | Claude Code — GLM-5.2 | 43 |
| 13 | Cursor CLI — Composer 2.5 Fast | 38 |
| 14 | Claude Code — DeepSeek V4 Pro (high) | 31 |
| 15 | Gemini CLI — Gemini 3.1 Pro (high) | 30 |

Note `Gemini CLI — Gemini 3.1 Pro (high)` appears here — so **Gemini 3.1 Pro exists in
AA's catalogue** and could be added to the model roster to fix the Gemini-Pro gap in Part 1.

---

## B4 wiring notes — what this data does and doesn't feed

Read against `src/slides/landscape-section-b/content.ts` → `b4Content`. This doc supplies
benchmark **numbers only**; several sibling fields are hardcoded and will go stale silently.

**B4 has six categories, this extract covers four (plus cost):**

| `b4Content` category | Fed by | Status |
|---|---|---|
| `write-reason` (AA Intelligence Index) | Part 1 §1 | ready |
| `code` (AA Coding Index) | Part 1 §2 | ready |
| `agentic` (AA Agentic Index) | Part 1 §3 | ready |
| `multimodal` (MMMU-Pro %) | Part 1 §4 | **screenshot-only source** |
| `creative` (CREATIVE TOOLS) | — | **no AA source in this extract** |
| `cost-intel` (COST × INTELLIGENCE) | Part 2 / 3c | ready |

**`scaleMax` must be revisited — one value is now outright broken:**

| Category | Current `scaleMax` | New max in this extract | Action |
|---|---:|---:|---|
| `write-reason` | 65 | 61 | still fits |
| `code` | 65 | **78.0** | **breaks — bars would clip; raise to ≥ 80** |
| `agentic` | 85 | 55.3 | fits, but bars render ~35% shorter than the June data (old max 77.8); consider ~65 |
| `multimodal` | 100 | 85 | still fits |

The Agentic drop is a **scale change in AA's v4.1 index, not a capability regression** —
don't let the slide imply models got worse at agentic work.

**Hardcoded strings that must change with the numbers:**

- Category `footnote`s embed the gap literals **"6.7 points"** (`write-reason`),
  **"11.6 points"** (`code`), **"9.2 points"** (`agentic`) — and each is duplicated in
  `footnoteKw`. New values are in Part 1 (4 / 1.8 / 5.2 vs the restricted-tier contender;
  10 / 9.2 / 12.2 vs the unrestricted one). **Pick one tier and use it consistently.**
- `openWeight.tagline` (e.g. `"6.7 pts off the lead"`) repeats the same figure a third time.
- `scatterAnnotation` reads **"90% the intelligence, 1/15th the cost"**. Recompute: vs
  Claude Opus 5 (max) (61 / $3,835.51), GLM-5.2 is 84% of the intelligence at **1/5.4** the
  cost; DeepSeek V4 Flash 0731 is 82% at **1/53**. Neither reproduces 1/15 — the claim needs
  restating, and note the scatter's `cost` field is **cost to run the full Index** (Part 3c),
  not cost per task (Part 3b).
- `freshness` still reads `"Benchmark data: Artificial Analysis · 8 June 2026"` → update to
  **31 July 2026**.
- `benchmarks.*.frontier` names use bare model names (`"Claude Opus 4.8"`, no effort tier),
  while AA's identity includes the effort setting — Claude Opus 5 at `max` vs `high` differs
  by 2 index points and ~1.9× cost (Part 2). Decide whether B4 shows the tier.
- `heatmap` is marked DEPRECATED / not rendered (`qualitativeSummary` is used) — its stale
  rows need no refresh, but don't mistake it for live content.

---

## Open items for the B4 refresh decision

1. **Gemini Pro gap.** The pinned roster has no Gemini Pro tier, so every "best Gemini"
   number above is Flash-tier and not comparable to the June doc's Gemini 3.1 Pro (57.2).
   Decide whether to extend the roster (`gemini-3-1-pro`, or the current Pro slug) and re-extract.
2. **GPT-5.5 Pro returns no data** in any chart despite being in the URL — drop it from the
   roster or substitute another OpenAI model.
3. **MMMU-Pro is screenshot-only** (6 models, no unrestricted open-weight entry). If B4 keeps
   a Multimodal panel, that number needs a live source.
4. **Cost methodology changed** — do not diff these cost figures against the June 2026 doc.
5. **Open-weight tiering.** B4's old "closed vs open" binary loses AA's
   "commercial use restricted" middle tier, which is exactly the tier the strongest
   open-weight models (Kimi K3, MiniMax-M3) sit in. Worth reflecting on the slide.
6. **`code` `scaleMax` is broken** (65 vs a new max of 78.0) — must be raised before the
   slide renders correctly. See *B4 wiring notes*.
7. **Openness labels are unverifiable from the screenshots** (they colour by provider, not
   licence). Two AA classifications will read as errors to reviewers —
   **DeepSeek V4 Flash 0731 = Proprietary** while DeepSeek V4 Pro is Open Weights, and
   **Mistral Medium 3.5 = Open Weights**. Both are as AA renders them; confirm before
   putting either on a slide, since the first one alone decides which model heads the
   open-weight cost cut.
8. **Do not reproduce AA's "most attractive quadrant"** — it is the top-left quarter of the
   plot area, so membership is viewport-dependent (GLM-5.2 flips). Quote cost and index instead.

---

## SOURCES

**Primary (live, 31 July 2026, `playwright-cli`):**

- Artificial Analysis dashboard — https://artificialanalysis.ai/ (full capture URL at top of
  this doc, pinning a 27-model roster)
- Charts read: *Artificial Analysis Intelligence Index* · *Coding Index* · *Agentic Index* ·
  *Intelligence Index by Open Weights / Proprietary* · *Cost per Intelligence Index Task* ·
  *Intelligence Index vs. Cost per Intelligence Index Task* ·
  *Intelligence Index vs. Cost to Run Artificial Analysis Intelligence Index* ·
  *Artificial Analysis Coding Agent Index*
- Index composition, as stated on the page: **Intelligence Index v4.1 = 9 evaluations**
  (GDPval-AA v2, 𝜏³-Banking, Terminal-Bench v2.1, SciCode, Humanity's Last Exam, GPQA Diamond,
  CritPt, AA-Omniscience, AA-LCR). Coding Index = Terminal-Bench v2.1 + SciCode.
  Agentic Index = GDPval-AA v2 + 𝜏³-Banking. All quoted from the chart subtitles.

**Cross-check screenshots** (`docs/references/artificialanalysis/`, captured 31 July 2026):
`2026-07-31-agentic.png` · `2026-07-31-coding.png` · `2026-07-31-write-and-reason.png` ·
`2026-07-31-multimodal.png` · `2026-07-31-intelligence-vs-cost.png`

**Predecessor:** `docs/researches/2026-06-08-llm-benchmarks-june-2026.md` (Index v4.0,
8 June 2026) — superseded for benchmark numbers; still the only source for `creative`.

**Consumer:** `src/slides/landscape-section-b/content.ts` → `b4Content`.

**Not used:** AA's `Download data` export and API — paywalled (`/pricing`).
