# LLM Benchmarks Research — June 2026
**Source of Truth:** Artificial Analysis (artificialanalysis.ai), Intelligence Index v4.0
**Data Fetched:** 8 June 2026
**URL:** https://artificialanalysis.ai/

> This file is the source-of-truth for **slide B.4** (`landscape-section-b/content.ts`,
> `b4Content`). All numbers below were read directly off the Artificial Analysis
> charts on 8 June 2026 and mirror what the slide renders. Use 1 decimal place for
> all index scores.
>
> **Important — each category uses a DIFFERENT AA index, on its own scale:**
> Write&Reason → *Intelligence Index*; Code → *Coding Index*; Agentic → *Agentic
> Index*; Multimodal → *MMMU-Pro (%)*. The Cost × Intelligence scatter uses the
> *overall Intelligence Index* on its Y-axis. So a model can read differently across
> sections (e.g. **DeepSeek V4 Pro = 47.5 on the Coding Index but 52 on the overall
> Intelligence Index**) — these are different metrics, not errors.

---

## PART 1 — CATEGORY LEADERBOARDS (feeds the R1 bar panels)

Each block = top-3 closed-weight + 1 open-weight contender, in descending order.

### 1. Write & Reason — AA Intelligence Index
| Rank | Model | Score | Type |
|------|-------|------:|------|
| 1 | Claude Opus 4.8 (max) | **61.4** | closed |
| 2 | GPT-5.5 (xhigh) | 60.2 | closed |
| 3 | Gemini 3.1 Pro | 57.2 | closed |
| — | **MiniMax-M3** | **54.7** | **open-weight** |

Open-weight gap to leader: **6.7** (61.4 − 54.7).
*(Context, not on slide: Opus 4.7 57.3, GPT-5.4 56.8, GPT-5.5 medium 56.7, Qwen3.7 Max 56.6.)*

### 2. Code — AA Coding Index (Terminal-Bench Hard, SciCode)
| Rank | Model | Score | Type |
|------|-------|------:|------|
| 1 | GPT-5.5 (xhigh) | **59.1** | closed |
| 2 | Claude Opus 4.8 (max) | 56.7 | closed |
| 3 | Gemini 3.1 Pro | 55.5 | closed |
| — | **DeepSeek V4 Pro** | **47.5** | **open-weight** |

Open-weight gap to leader: **11.6** (59.1 − 47.5).
*(Context: GPT-5.5 high 58.5, GPT-5.4 xhigh 57.2, GPT-5.5 medium 56.2, Qwen3.7 Max 50.1.)*

### 3. Agentic — AA Agentic Index (GDPval-AA, τ²-Bench Telecom)
| Rank | Model | Score | Type |
|------|-------|------:|------|
| 1 | Claude Opus 4.8 (max) | **77.8** | closed |
| 2 | GPT-5.5 (xhigh) | 74.1 | closed |
| 3 | Gemini 3.5 Flash | 70.4 | closed |
| — | **MiniMax-M3** | **68.6** | **open-weight** |

Open-weight gap to leader: **9.2** (77.8 − 68.6).
*(Context: GPT-5.5 high 72.0, Opus 4.7 71.3, Gemini 3.5 Flash medium 70.4, GPT-5.5 medium 69.4.)*

### 4. Multimodal — MMMU-Pro (visual reasoning, %)
| Rank | Model | Score | Type |
|------|-------|------:|------|
| 1 | Gemini 3.5 Flash | **84%** | closed |
| 2 | GPT-5.5 (xhigh) | 80% | closed |
| 3 | Claude Opus 4.7 (max) | 79% | closed |
| — | **MiniMax-M3** | **80%** | **open-weight** |

MiniMax-M3 **ties GPT-5.5 (80%)** and edges Opus 4.7 (79%); 4.0 off the leader.
*(Context: Gemini 3.1 Pro 82%, Muse Spark 81%, Kimi K2.6 79%, Grok 4.3 78%, Qwen3.5 397B 77%.)*

---

## PART 2 — COST × INTELLIGENCE (feeds the R3 scatter)

- **X axis:** "Cost to Run Intelligence Index" (USD, log scale) — per AA model cards.
- **Y axis:** AA Intelligence Index (overall, integer as shown on the cost cards).
- 4 closed-weight + 4 open-weight.

| Model | Intelligence | Cost to Run (USD) | Type |
|-------|------------:|------------------:|------|
| Claude Opus 4.8 (max) | 61 | $4,685.85 | closed |
| GPT-5.5 (xhigh) | 60 | $3,357.00 | closed |
| Gemini 3.1 Pro Preview | 57 | $892.28 | closed |
| Grok 4.3 (high) | 53 | $395.17 | closed |
| Kimi K2.6 | 54 | $947.87 | open-weight |
| MiniMax-M3 | 55 | $308.34 | open-weight |
| DeepSeek V4 Pro (Max) | 52 | $267.82 | open-weight |
| MiMo-V2.5-Pro | 54 | $160.82 | open-weight |

**Annotation arrow:** Claude Opus 4.8 → MiniMax-M3 — *"90% the intelligence, 1/15th
the cost."* Maths: 55 / 61 = **90.2%** intelligence; $308.34 / $4,685.85 = **1/15.2**
the run cost.

*Note on Intelligence values:* the scatter uses the **integer** figures printed on AA's
cost cards (MiniMax-M3 = 55, Opus = 61). The Write&Reason bar uses the 1-decimal
Intelligence Index (MiniMax-M3 = 54.7, Opus = 61.4) from the leaderboard. Same metric,
different rounding; the scatter doesn't display the number (it's a dot position).

---

## PART 3 — "AT A GLANCE" RELATIVE-STRENGTH MATRIX (feeds qualitativeSummary)

Exactly one **best** per column. Open-weight row = MiniMax-M3.

| Model | Write & Reason | Code | Agentic | Multimodal | Cost |
|-------|:---:|:---:|:---:|:---:|:---:|
| Claude Opus 4.8 | **best** | good | **best** | good | weak |
| GPT-5.5 | good | **best** | good | good | weak |
| Gemini 3.1 Pro | good | good | good | **best** | weak |
| MiniMax-M3 | average | average | good | good | **best** |

Column winners: reason → Opus 4.8 (61.4) · code → GPT-5.5 (59.1) · agentic → Opus 4.8
(77.8) · multimodal → Gemini 3.5 Flash (84%) · cost → open-weight. Footer line on the
slide: *"Frontier wins 4 of 5 categories. Open-weight wins cost by a wide margin."*

---

## PART 4 — SELECTION NOTES & CAVEATS

- **Index version:** Artificial Analysis Intelligence Index **v4.0** (10 evals: GDPval-AA,
  τ²-Bench Telecom, Terminal-Bench Hard, SciCode, AA-LCR, AA-Omniscience, IFBench,
  Humanity's Last Exam, GPQA Diamond, CritPt).
- **Open-weight contenders are genuinely open-weight.** Qwen3.7 Max scores well
  (Reason 56.6, Code 50.1) but its "Max" tier is **API-only / proprietary**, so it was
  **deliberately excluded** as an open-weight contender. The open-weight slots use
  **MiniMax-M3** (Reason, Agentic, Multimodal) and **DeepSeek V4 Pro** (Code).
- **MiniMax-M3 is the open-weight through-line** of the slide: contender in 3 of 4
  categories, the open-weight row in the matrix, and the scatter's annotation target.
- **Rolling data:** AA serves a rolling 72-hour window, not dated snapshots — "8 June
  2026" is the fetch date stamped on the slide (`freshness`).
- **Per-category scales** in `content.ts` (`B4BenchmarkBlock.scaleMax`): Reason 65,
  Code 65, Agentic 85, Multimodal 100 (with `unit: "%"`). These exist because the four
  indices are on different ranges.

---

## SOURCES

- [Artificial Analysis Intelligence Index v4.0](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index)
- [AA Coding Index](https://artificialanalysis.ai/) · [AA Agentic Index](https://artificialanalysis.ai/) · [MMMU-Pro](https://artificialanalysis.ai/evaluations/mmmu-pro)
- [LLM Leaderboard (100+ models)](https://artificialanalysis.ai/leaderboards/models)
- Per-model cost cards (Cost to Run Intelligence Index, USD): artificialanalysis.ai model pages for
  Claude Opus 4.8, GPT-5.5, Gemini 3.1 Pro, Grok 4.3, Kimi K2.6, MiniMax-M3, DeepSeek V4 Pro, MiMo-V2.5-Pro.

---

## TL;DR FOR THE SLIDE

1. **Claude Opus 4.8 leads overall** (Intelligence 61.4, Agentic 77.8); **GPT-5.5 leads
   Code** (59.1); **Gemini 3.5 Flash leads Multimodal** (84%). Frontier wins 4 of 5.
2. **Open-weight is closing fast where it counts:** MiniMax-M3 is within **6.7** on
   reasoning and **ties GPT-5.5 on multimodal (80%)**; the widest remaining gap is
   Code (DeepSeek V4 Pro, 11.6 back).
3. **The cost story is the punchline:** MiniMax-M3 delivers ~**90%** of Opus 4.8's
   intelligence for ~**1/15th** the cost to run the index ($308 vs $4,686).

---

**Report Prepared:** 8 June 2026
