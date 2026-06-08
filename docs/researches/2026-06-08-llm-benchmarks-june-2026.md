# LLM Benchmarks Research — May 2026
**Source of Truth:** Artificial Analysis Intelligence Index v4.0  
**Data Fetched:** May 12, 2026  
**URL:** https://artificialanalysis.ai/

---

## PART 1: OVERALL RANKING (Intelligence Index v4.0)

Top 8 models by composite Intelligence Index score:

| Rank | Model | Provider | Score | Key Insight |
|------|-------|----------|-------|------------|
| 1 | **GPT-5.5 (xhigh)** | OpenAI | 60 | Leads across reasoning, agentic, and scientific tasks. |
| 2 | **GPT-5.5 (high)** | OpenAI | 59 | Slightly lower compute intensity than xhigh variant. |
| 3 | **Claude Opus 4.7** | Anthropic | 57 | Excels in instruction following and reasoning. |
| 4 | **Gemini 3.1 Pro Preview** | Google | 57 | Multimodal-strong, fastest speed in top tier. |
| 5 | **GPT-5.4 (xhigh)** | OpenAI | 57 | Prior-generation reasoning model. |
| 6 | **Kimi K2.6** | Moonshot (open-weight) | 54 | **Highest-ranked open-weight model**; competes with GPT-5. |
| 7 | **Grok 4.3** | xAI | 53 | Strong cost efficiency; notably verbose outputs. |
| 8 | **DeepSeek V4 Pro (Reasoning)** | DeepSeek (open-weight) | 52 | Intelligent but slower; very verbose on tasks. |

**Note:** GLM (Zhipu/Z.ai) and latest Qwen3.x models **do not have published Intelligence Index scores** on Artificial Analysis. Qwen3.5 variants are tracked for speed/cost only.

---

## PART 2: BY-CATEGORY PERFORMANCE

### Coding & Software Engineering
**Benchmark used:** SciCode, Terminal-Bench Hard (agentic coding), SWE-Bench-Pro-Hard-AA

| Model | Score/Ranking | Note |
|-------|---------------|------|
| **GPT-5.5 (xhigh)** | ✓ Top performer | Reasoning + agentic terminal tasks |
| **Claude Opus 4.7** | ✓ Tier-1 | Strong on instruction-guided coding |
| **Grok 4.3** | ✓ Top 10 | Faster than Opus; less intelligent |

**[verify] — Individual SWE-Bench/HumanEval scores not published separately in AA interface.**

---

### Reasoning & Math
**Benchmarks used:** GPQA Diamond, Humanity's Last Exam, AIME equivalents (via AA composite)

| Model | Score/Ranking | Note |
|-------|---------------|------|
| **GPT-5.5 (xhigh)** | 60 (Intelligence Index) | Dominates scientific + math reasoning |
| **Claude Opus 4.7** | 57 | Strong physics & logic chains |
| **Gemini 3.1 Pro Preview** | 57 | Multimodal reasoning advantage |

**Note:** AA does not break out individual GPQA/AIME/MATH-500 scores; these are folded into the composite Intelligence Index.

---

### Agentic / Tool Use & Long-Horizon Tasks
**Benchmarks used:** GDPval-AA, τ²-Bench Telecom (tool use), Terminal-Bench Hard, APEX-Agents-AA

| Model | Score/Ranking | Note |
|-------|---------------|------|
| **GPT-5.5 (xhigh)** | 60 (Intelligence Index) | Strongest on real-world agentic tasks |
| **Gemini 3.1 Pro Preview** | 57 | Fast multi-step execution |
| **Claude Opus 4.7** | 57 | Reliable instruction-following agent |

---

### Multimodal (Vision/Video/Audio)
**Benchmarks used:** MMMU-Pro, visual reasoning

| Model | Capabilities | Ranking |
|-------|--------------|---------|
| **Gemini 3.1 Pro Preview** | Text, image, speech, video input → text output | #4 overall |
| **Claude Opus 4.7** | Text, image input → text output | #3 overall |
| **Grok 4.3** | Text, image input → text output | #10 overall |
| **GPT-5.5 (xhigh)** | Text, image input → text output | #1 overall |

**Open-weight:** Kimi K2.6 supports text, image, video input (third in its tier).

---

### Long Context
**Benchmark used:** AA-LCR (long context reasoning), needle-in-haystack via RULER

| Model | Context Window | Latency (t/s) | Note |
|-------|-----------------|-------|------|
| **Claude Opus 4.7** | 1M tokens (~1500 A4 pages) | 56.6 t/s | Slowest in top tier |
| **GPT-5.5 (xhigh)** | 922k tokens (~1383 A4 pages) | 59.9 t/s | Fast for length |
| **Gemini 3.1 Pro Preview** | 1M tokens | 131 t/s | **Fastest top-tier model** |
| **Grok 4.3** | 1M tokens | 96.5 t/s | Best cost/speed balance |

---

### Instruction Following & Constraint Adherence
**Benchmark used:** IFBench

| Model | Ranking | Note |
|-------|---------|------|
| **Claude Opus 4.7** | Tier-1 | Known for precise instruction adherence |
| **GPT-5.5 (xhigh)** | Tier-1 | Excellent constraint handling |
| **Gemini 3.1 Pro Preview** | Tier-1 | Strong formatting compliance |

---

### Cost Efficiency (Intelligence per $1 million tokens)
**Metric:** Cost-to-intelligence ratio (lower spend for same capability)

| Model | Input Price | Output Price | Blended (3:1) | Intelligence/$ Rank |
|-------|------------|-------------|-------|-------------|
| **Grok 4.3** | $1.25/M | $2.50/M | $1.75/M | **#1 in top tier** (53 int / $1.75) |
| **Kimi K2.6** | $0.95/M | $4.00/M | $2.32/M | **#2 open-weight** (54 int / $2.32) |
| **DeepSeek V4 Pro** | $1.74/M | $3.48/M | $2.32/M | **#3 open-weight** (52 int / $2.32) |
| **Claude Opus 4.7** | $6.25/M | $25.00/M | $12.08/M | Expensive for performance |
| **GPT-5.5 (xhigh)** | $5.00/M | $30.00/M | $15.00/M | Premium pricing |
| **Gemini 3.1 Pro Preview** | $2.00/M | $12.00/M | $4.50/M | Mid-tier cost |

**Open-weight win:** Kimi K2.6 and DeepSeek V4 Pro deliver 54/52 intelligence at ~2-3x lower cost than top closed models.

---

### Speed (Output Tokens Per Second)
**Measured:** Sustained throughput under evaluation load

| Rank | Model | Tokens/sec | Ranking | Use Case |
|------|-------|------------|---------|----------|
| **#1 (general)** | Mercury 2 | 769 t/s | Specialty encoder | Text gen only |
| **#1 (top-tier)** | Gemini 3.1 Pro Preview | 131 t/s | #26 overall | Fast, intelligent |
| **#2 (top-tier)** | Grok 4.3** | 96.5 t/s | #36 overall | Fast + affordable |
| **#3 (top-tier)** | GPT-5.5 (xhigh) | 59.9 t/s | Below-average for tier | Quality over speed |
| **#4 (top-tier)** | Claude Opus 4.7 | 56.6 t/s | Slowest tier-1 | Highest latency |

**Open-weight comparison:**
- Kimi K2.6: 49.3 t/s (#40 overall) — slow for capacity
- DeepSeek V4 Pro: 30.1 t/s (#50 overall) — notably slow

---

## PART 3: OPEN-WEIGHT VS FRONTIER FRAMING

### The Verdict: Open-Weight Has Arrived

**Closed Frontier Models (Score >57):**
- GPT-5.5 (xhigh): 60
- Claude Opus 4.7: 57
- Gemini 3.1 Pro: 57

**Open-Weight / Near-Frontier (Score 52–54):**
- Kimi K2.6: 54 (Moonshot) — **only 6 points behind Opus 4.7**
- Grok 4.3: 53 (xAI) — **closes to 4 points**
- DeepSeek V4 Pro: 52 (DeepSeek) — **8 points behind**

### Categories Where Open-Weight Matches Closed:
1. **Cost Efficiency**: Kimi K2.6 (54 int) at $2.32/M vs. Opus 4.7 (57 int) at $12.08/M — **5.2x cheaper for 5.3% less intelligence**
2. **Multimodal**: Kimi K2.6 supports text+image+video (closed models only text+image)
3. **Reasoning**: DeepSeek V4 uses reasoning tokens like GPT-5.5; reasoning model parity with much lower cost

### Where Frontier Holds Advantage:
- **Raw Intelligence**: GPT-5.5 (60) is still the single strongest across benchmarks
- **Speed at Scale**: Gemini 3.1 Pro's 131 t/s beats Kimi (49 t/s) significantly
- **Cost at Very High Intelligence**: GPT-5.5's $15/M blended is premium, but no open-weight reaches 60 on index

### Recommendation for Slide:
**Headline:** "Open-weight models (Kimi, DeepSeek) now deliver 85–95% of frontier intelligence at 20–40% of the cost. Speed and latency remain weak points."

---

## PART 4: SUGGESTED CHART SHAPES FOR SLIDES

### Chart 1: Overall Intelligence Ranking
**Type:** Horizontal bar chart  
**X-axis:** Intelligence Index score (0–60)  
**Y-axis:** Model names (8 models)  
**Color coding:** Closed (blue) vs. Open-weight (green)  
**Top 3 bars:** GPT-5.5 (60), Claude/Gemini (57), Kimi (54)  
**Message:** "Open-weight closes the gap. Kimi K2.6 delivers 90% of the intelligence of frontier models."

---

### Chart 2: Cost vs. Intelligence Bubble Chart
**Type:** Scatter / bubble chart  
**X-axis:** Cost per 1M blended tokens (log scale, $1–$20)  
**Y-axis:** Intelligence Index score (40–60)  
**Bubble size:** Context window (1k–1M tokens)  
**Color:** Closed vs. open-weight  
**Quadrants:** Mark "best value" (top-left), "premium" (top-right), etc.  
**Key insight:** Grok 4.3 and Kimi sit in the Pareto frontier (cheapest for their intelligence tier).

---

### Chart 3: Speed vs. Latency Trade-off
**Type:** Horizontal bar chart (dual-axis or split)  
**Bar 1:** Output throughput (tokens/sec)  
**Bar 2:** Time-to-first-token (seconds)  
**Models:** Top 5 (GPT-5.5, Opus 4.7, Gemini, Kimi, Grok)  
**Message:** "Gemini is fastest (131 t/s, 36s latency). Kimi is balanced. Opus is the slowest."

---

### Chart 4: By-Category Radar Chart
**Type:** 6-point radar (one for each model)  
**Axes:** Reasoning, Coding, Multimodal, Speed, Cost, Long-context  
**Models to overlay:** GPT-5.5 (xhigh), Claude Opus 4.7, Gemini 3.1 Pro, Kimi K2.6  
**Message:** "No model dominates all dimensions. Gemini leads on speed. Kimi on cost. GPT-5.5 on reasoning."

---

### Chart 5: Long-Context Capability Comparison
**Type:** Grouped bar chart  
**X-axis:** Models (top 5)  
**Bar groups:** Context window (tokens) | Throughput (t/s) | Time-to-first-token (s)  
**Key insight:** Claude Opus leads in window size (1M); Gemini leads in speed despite same window.

---

### Chart 6: Cost-Efficiency Per Intelligence Point
**Type:** Bar chart (cost per unit of intelligence)  
**Y-axis:** $ per intelligence point (lower = better)  
**Models:** Top 8  
**Top 3 efficient:** Grok 4.3, Kimi K2.6, DeepSeek V4 Pro  
**Message:** "Grok 4.3 is the most cost-efficient frontier model. Kimi is the best open-weight value."

---

## PART 5: RAW NUMBERS TABLE

Below is the master benchmark table for your slide data feeds:

| **Model** | **Provider** | **Intelligence Index** | **Speed (t/s)** | **Latency (TTFT, sec)** | **Input $/M** | **Output $/M** | **Blended $/M** | **Context Window** | **Multimodal** | **Reasoning** | **Verbosity (M tokens)** |
|-----------|-----------|--------------|---------|---------|----------|----------|----------|--------|------|------|------|
| GPT-5.5 (xhigh) | OpenAI | **60** | 59.9 | N/A | $5.00 | $30.00 | $15.00 | 922k | Text+Image | Yes | 88M |
| GPT-5.5 (high) | OpenAI | **59** | N/A | N/A | N/A | N/A | N/A | 922k | Text+Image | Yes | N/A |
| Claude Opus 4.7 | Anthropic | **57** | 56.6 | N/A | $6.25 | $25.00 | $12.08 | 1M | Text+Image | No | 57M |
| Gemini 3.1 Pro Preview | Google | **57** | 131.0 | 36.03 | $2.00 | $12.00 | $4.50 | 1M | Text+Image+Speech+Video | Yes | 57M |
| GPT-5.4 (xhigh) | OpenAI | **57** | N/A | N/A | N/A | N/A | N/A | ~900k | Text+Image | Yes | N/A |
| Kimi K2.6 | Moonshot (open-weight) | **54** | 49.3 | 2.71 | $0.95 | $4.00 | $2.32 | 256k | Text+Image+Video | Yes | 190M |
| Grok 4.3 | xAI | **53** | 96.5 | N/A | $1.25 | $2.50 | $1.75 | 1M | Text+Image | Yes | 88M |
| DeepSeek V4 Pro (Reasoning) | DeepSeek (open-weight) | **52** | 30.1 | 1.79 | $1.74 | $3.48 | $2.32 | N/A | Text | Yes | 190M |

---

### Key Data Notes:

- **[verify]** = Artificial Analysis does not publish individual benchmark scores (GPQA, AIME, SWE-Bench, HumanEval) separately; all are folded into the composite Intelligence Index.
- **Gemini 3.1 Pro Preview** shows exceptional speed (131 t/s) due to its non-reasoning default; reasoning variants may be slower.
- **Kimi K2.6** is the highest-ranked open-weight model but slower than closed counterparts (49 t/s vs. 56–131 t/s).
- **Grok 4.3** is positioned as the cost-efficiency leader among frontier models ($1.75/M blended for 53 intelligence).
- **DeepSeek V4 Pro** uses reasoning tokens for extended thinking, similar to GPT-5.5; marked as "very verbose" at 190M tokens generated.
- **Qwen3.5** (multiple sizes) and **GLM** models do not have published Intelligence Index scores as of May 2026. They are tracked for speed/cost/latency only, not for reasoning capability.
- **Verbosity ("M tokens")** = tokens generated during evaluation; higher indicates wordier responses.

---

## PART 6: SOURCES

**Primary Source:**
- [Artificial Analysis Intelligence Index v4.0](https://artificialanalysis.ai/)
- [AI Model Rankings Leaderboard](https://artificialanalysis.ai/models)

**Model-Specific Pages Fetched:**
- [GPT-5.5 (xhigh)](https://artificialanalysis.ai/models/gpt-5-5)
- [Claude Opus 4.7](https://artificialanalysis.ai/models/claude-opus-4-7)
- [Gemini 3.1 Pro Preview](https://artificialanalysis.ai/models/gemini-3-1-pro-preview)
- [Kimi K2.6](https://artificialanalysis.ai/models/kimi-k2-5)
- [Grok 4.3](https://artificialanalysis.ai/models/grok-4-3)
- [Grok 4.20 0309](https://artificialanalysis.ai/models/grok-4-20)
- [DeepSeek V4 Pro](https://artificialanalysis.ai/models/deepseek-v4-pro)

**Benchmarks Referenced (AA's 10-point Intelligence Index):**
1. GDPval-AA (agentic real-world tasks)
2. Terminal-Bench Hard (agentic terminal/coding)
3. τ²-Bench Telecom (tool use)
4. SciCode (coding assessment)
5. AA-LCR (long-context reasoning)
6. AA-Omniscience (knowledge/hallucination)
7. GPQA Diamond (scientific reasoning)
8. Humanity's Last Exam (combined reasoning/knowledge)
9. IFBench (instruction following)
10. CritPt (physics reasoning)

**Additional Benchmarks on AA Platform (not all published separately):**
- SWE-Bench-Pro-Hard-AA
- MMMU-Pro (visual reasoning)
- APEX-Agents-AA (long-horizon agentic tasks)

---

## Summary for Slide

**3-sentence TL;DR:**

1. **GPT-5.5 (60) dominates**, but Kimi K2.6 (54) delivers 90% of frontier intelligence at 1/5th the cost—open-weight is now competitive.
2. **No single model wins all categories:** Gemini leads on speed (131 t/s), Grok on cost-efficiency ($1.75/M), Kimi on multimodal (text+image+video).
3. **Adoption decision matrix:** Choose GPT-5.5 for maximum reasoning; Gemini for speed at scale; Grok/Kimi for cost-sensitive workloads.

---

**Report Prepared:** May 12, 2026  
**Next Update Recommended:** July 2026 (expect new releases from Anthropic, Google, DeepSeek)

