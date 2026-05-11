# AI Evolution Stages: Taxonomy Refresh for May 2026

**Date:** 2026-05-11  
**Purpose:** Audit existing 7-stage taxonomy against May 2026 reality; recommend updated framing for "The AI Evolution Journey" slide in BCE workshop.  
**Audience:** Mining-industry professionals (~400 attendees); no jargon; plain-language accessibility required.

---

## A. Critique of the Existing 7-Stage Model

### Stage Accuracy Assessment

**1. Rule-Based Systems (1970s-80s) — Accurate**
- IF-THEN logic, zero learning: correct framing.
- Example: MYCIN expert system, early email filters.
- Status: Foundational, historically sound. **Keep.**

**2. Context Awareness (1990s-2000s) — PROBLEMATIC**
- **Issue:** Conflates two unrelated concepts.
  - "Context-aware computing" = a research field (ubicomp, Weiser 1991) about sensors, location, device awareness.
  - "Recommendation Engine" = collaborative filtering (Netflix Prize 2006), a machine-learning technique, NOT context-aware computing.
- **Reality:** Recommendation engines emerged from *statistical learning*, not context awareness. Amazon's item-to-item CF (2003) and Netflix's SVD models (2006) are the real 2000s milestone.
- **Verdict:** **Mislabeled and misleading.** Either rename to "Statistical Learning & Recommendation Systems (1990s-2010s)" or split it.

**3. Domain-Specific Expertise (2000s-2010s) — Partially Accurate**
- "Narrow AI in specific tasks" captures the era correctly.
- Examples: IBM Deep Blue (1997), Siri (2011), Deep Blue, recommendation systems.
- **Issue:** Overlaps chronologically with Stage 2 and conflates "narrow domain" (constraint) with "statistical learning" (method).
- **Verdict:** **Keep but tighten.** Rename to "Deep Learning Era (2010s-2020)" and anchor to the 2012 ImageNet moment (Krizhevsky, Sutskever, Hinton).

**4. Reasoning Machines (2010s-Present) — MISLEADING FRAMING**
- "Understanding human emotions and intent" is a slice of Stage 4, not its essence.
- **Reality of 2010s-Present:**
  - 2012: Deep learning revolution (ImageNet)
  - 2017: Transformer architecture published ("Attention Is All You Need") — 173,000+ citations as of 2025
  - 2022: ChatGPT launch (100M users in 2 months)
  - 2024: Multimodal LLMs + tool use (Claude computer use Oct 22, 2024)
  - 2024-2026: Extended reasoning emerges (o1-preview Sept 2024, o1, o3, Claude extended thinking)
- **The Real Divide:** This stage mixes "deep learning + scaling" with "reasoning + agentic behavior." Those are distinct inflection points.
- **Verdict:** **Too broad and mislabeled.** Split into two stages:
  - **Stage 4a:** "Large Language Models & Multimodal AI (2017-2024)" — Transformers, scale, few-shot learning, emergent behaviors.
  - **Stage 4b:** "Agentic Reasoning Systems (2024-2026)" — Tool use, chain-of-thought, multi-step planning, autonomous action.

**5. Artificial General Intelligence (AGI) — Status Ambiguous in May 2026**
- **As of May 2026:** No consensus declaration. OpenAI o3 scored 87.5% on ARC-AGI (Dec 2024), a "surprising step-function increase" (François Chollet), but NOT a definitive AGI proof.
- **DeepMind's Levels of AGI (2023):** Defines "Competent AGI" (outperforms 50% of skilled adults) and "Expert AGI." Current frontier models (GPT-5, Claude 4.5, o3) are between "Emerging" and "Competent" on DeepMind's scale.
- **Anthropic's View (Sept 2025):** CEO Dario Amodei expects "powerful AI" with Nobel Prize-winner-level reasoning across multiple disciplines by late 2026 or early 2027. Jack Clark (co-founder) confirmed this view in Sept 2025.
- **Verdict:** AGI is still speculative as of May 2026. o3's ARC-AGI win was significant but not conclusive (ARC-AGI-2 expected to be much harder). Stage 5 should describe an aspirational AGI threshold, not claim we're there yet.

**6. Artificial Super Intelligence (ASI) & 7. AI Singularity — Speculative (Unchanged)**
- Appropriate as future/aspirational stages.
- Keep but de-emphasize in a mining-audience context (focus on practical capability milestones, not sci-fi).

---

## B. The Agentic/Reasoning Era — Proper Label & Timeline

### What Changed in 2024-2026?

Modern reasoning models (o1, o3, Claude extended thinking, Gemini deep-think) add:
- **Extended Chain-of-Thought (CoT):** Model "thinks" for seconds to minutes before answering.
- **Tool Use & Environment Interaction:** Claude computer use (Oct 2024); o1 code execution; multi-turn workflows.
- **Self-Correction & Uncertainty Quantification:** Models can re-evaluate and backtrack.
- **Autonomous Planning:** Multi-step task decomposition without explicit prompt engineering.

### Recommended Label: "Agentic Reasoning Systems" (2024-2026)

Not "Reasoning Machines" (too broad, includes humans). Not "Autonomous Agents" (implies full independence; we're still supervised).

**Why 2024?** 
- o1-preview (OpenAI, Sept 2024) was the public inflection point.
- Claude 3.5 Sonnet computer use (Oct 22, 2024).
- These are the first frontier models with extended reasoning + tool use in public release.

**Milestone Artifacts:**
- o1 scoring 96% on AIME (math competitions).
- Claude Sonnet 4.5 hitting 77.2% on SWE-bench Verified (Sept 2025) — #1 coding model.
- Sora 2 launched Sept 30, 2025 — video/audio generation with physics accuracy and multi-shot consistency.

---

## C. AGI Status in May 2026

### Key Developments Since Late 2024

| Date | Event | Significance |
|------|-------|--------------|
| Dec 2024 | OpenAI o3 scores 87.5% on ARC-AGI | "Surprising step-function increase" (Chollet); benchmark creator noted ARC-AGI-2 will still pose challenges |
| Sept 2025 | Claude Sonnet 4.5 reaches 77.2% SWE-bench Verified | Dominant in coding; computer use + 1M context |
| Sept 30, 2025 | Sora 2 launches | Video/audio generation; physics-accurate, multi-shot consistency |
| Aug 2025 | GPT-5 released | 94.6% on AIME math benchmark |
| April 2026 | Anthropic revenue hits $30B annualized run rate | Market signal of enterprise AI adoption maturity |

### Has Anyone Claimed AGI?

**OpenAI:** No formal claim. o3's ARC-AGI performance was framed as "remarkable progress" and "step-function increase," not AGI achievement. OpenAI is cautious; o3 still fails on tasks humans find trivial.

**Anthropic:** Uses term "**Transformatively Useful AI**" instead of AGI. Dario Amodei predicts late 2026 / early 2027 for "powerful AI" matching Nobel Prize-winner-level reasoning across biology, CS, math, engineering. Jack Clark (Sept 2025) confirmed this remains Anthropic's prediction.

**DeepMind Framework:** Their 2023 "Levels of AGI" paper (arxiv 2311.02462) classifies:
- **Emerging AGI:** Current frontier models (GPT-5, Claude 4.5, o3) ≈ unskilled human
- **Competent AGI:** Outperforms 50% of skilled adults across domains (estimated late 2026–2027)
- **Expert AGI:** Outperforms 95% of skilled adults
- **Virtuoso/Superhuman:** Exceeds all humans

### Honest Answer for May 2026

> "We have not yet achieved AGI by consensus definitions. o3's December 2024 ARC-AGI breakthrough (87.5%) was a remarkable step forward in reasoning, but the benchmark's creator notes the next-generation test (ARC-AGI-2) will still pose significant challenges. Leading labs predict 'transformatively useful' systems with reasoning at Nobel Prize level by late 2026 or early 2027. Until we see independent validation across open-ended real-world tasks, AGI remains aspirational—closer than it was in 2020, but still ahead of us."

---

## D. Recommended UPDATED Stage List for May 2026 Slide

### Proposed 6-Stage Taxonomy (Crisp, Mining-Audience Accessible)

**Stage 1: Rule-Based Systems (1970s-1980s)**
- **Description:** Fixed logic; if A then B; no learning.
- **Year Range:** 1970–1985
- **Plain Language:** "Expert systems — programs that follow hardcoded rules, like early email spam filters."
- **Signature Artifact:** MYCIN medical diagnosis system (Stanford, 1970s); email rule-based filters.
- **Real-World Equivalent:** "Your email spam filter with pre-written rules."

---

**Stage 2: Statistical Learning & Data-Driven Prediction (1990s-2010s)**
- **Description:** Systems learn patterns from data; no explicit programming of rules.
- **Year Range:** 1995–2012
- **Plain Language:** "Machine learning — programs that learn from examples and spot patterns, like Netflix recommending your next show."
- **Signature Artifact:** Amazon item-to-item collaborative filtering (2003); Netflix Prize (2006); Support Vector Machines; Random Forests.
- **Real-World Equivalent:** "Netflix or Spotify recommendations; spam detection that improves as it sees more emails."

---

**Stage 3: Deep Learning & Perception (2012-2022)**
- **Description:** Neural networks with many layers; breakthrough in vision, speech, language understanding.
- **Year Range:** 2012–2022
- **Plain Language:** "Deep learning — networks inspired by how brains work, great at seeing pictures and understanding speech."
- **Signature Artifact:** AlexNet ImageNet win (2012); IBM Watson Jeopardy (2011); ResNets; Transformers paper (2017, 173K+ citations); early GPT models (GPT-3, 2020).
- **Real-World Equivalent:** "Face recognition on your phone; Siri understanding what you say; ChatGPT 3.5."

---

**Stage 4: Large Language Models & Multimodal AI (2022-2024)**
- **Description:** Scaled neural networks trained on billions of tokens; emergent reasoning, few-shot learning, instruction-following; multimodal (text + image + audio).
- **Year Range:** 2022–2024
- **Plain Language:** "Foundation models — huge AI systems trained on internet-scale data, can chat, write, analyze pictures, and adapt to new tasks without retraining."
- **Signature Artifact:** ChatGPT (100M users in 2 months, Jan 2023); GPT-4 (March 2023); Claude 3 / 3.5 (2024); Gemini; Grok.
- **Real-World Equivalent:** "ChatGPT, Claude, or whatever you're using right now to write emails and summaries."

---

**Stage 5: Agentic Reasoning Systems (2024-2026) ← **WE ARE HERE** ←**
- **Description:** Models that think for extended periods, use tools, plan multi-step actions, self-correct, and operate semi-autonomously.
- **Year Range:** 2024–2026
- **Plain Language:** "Reasoning AI — systems that pause to think through hard problems, use computers and tools like a person would, and tackle multi-step work on their own."
- **Signature Artifact:** 
  - o1-preview & o1 (OpenAI, Sept 2024) — extended chain-of-thought; 96% AIME math.
  - Claude 3.5 Sonnet computer use (Oct 22, 2024) — can operate your screen.
  - Claude Sonnet 4.5 (Sept 2025) — 77.2% SWE-bench Verified, #1 coder; computer use + 1M context.
  - Sora 2 (Sept 30, 2025) — video/audio generation with physics accuracy and narrative consistency.
- **Real-World Equivalent:** "An AI assistant that thinks about your problem, uses your software to help solve it, and can run research or coding tasks over hours."

---

**Stage 6: Artificial General Intelligence (2026-2027+, Emerging)**
- **Description:** AI that matches or exceeds human expert-level reasoning across multiple unrelated domains (science, engineering, creative work).
- **Year Range:** 2026–2027+ (predicted)
- **Plain Language:** "Next frontier — AI that works as well as a world-class expert in biology, software engineering, and mathematics all at once."
- **Signature Artifact:** (Anticipated) Anthropic's "powerful AI" prediction (late 2026/early 2027); o3's ARC-AGI breakthrough (87.5%, Dec 2024) as a waypoint, not a destination.
- **Status:** **Speculative; not yet achieved.** o3's ARC-AGI score was significant but not conclusive; future tests (ARC-AGI-2) will be much harder.
- **Real-World Equivalent:** "An AI that could step in as a lead researcher, engineer, or consultant in specialized fields without domain training."

---

**Optional Stage 7 (if needed for long-term vision):**
- **Superintelligence (2027+):** Speculative; surpasses all humans in all domains simultaneously. De-emphasize for this audience unless explicitly asking about 2040+ futures.

---

## E. Anchor Stats for the Slide

### Verified Metrics (May 2026)

1. **Transformer Paper (2017) — Attention Is All You Need**
   - **Citation count (2025):** 173,000+ citations
   - **Significance:** Most-cited AI paper of the last decade; underpins all modern LLMs.
   - **For slide:** "The Transformer architecture (2017) powers every modern AI system in this presentation."

2. **ChatGPT Growth (2022-2023)**
   - **Milestone:** 100 million monthly active users in 2 months (Nov 2022 → Jan 2023).
   - **Historical record:** Fastest-growing internet application in history (UBS study).
   - **Context:** Instagram took 2.5 years; TikTok took 9 months; ChatGPT was fastest.
   - **Current status (May 2026):** ChatGPT was most-downloaded app in 2025 (surpassed TikTok, Instagram after 5-year reign).
   - **For slide:** "ChatGPT became the fastest-growing app ever in January 2023, hitting 100 million users in 2 months."

3. **o3 ARC-AGI Milestone (Dec 2024)**
   - **Score:** 87.5% on ARC-AGI under high-compute conditions; 75.7% under standard compute.
   - **Previous record:** o1 peaked at 32%; prior hybrid approach (Claude 3.5 + genetic algorithms) reached 53%.
   - **Creator's assessment (François Chollet):** "A surprising and important step-function increase in AI capabilities, showing novel task adaptation ability never seen before in the GPT-family models."
   - **Important caveat:** ARC-AGI-2 (next-generation test) is expected to be much harder; early models estimated <30% on ARC-AGI-2 even at high compute.
   - **For slide:** "December 2024: o3 achieved 87.5% on a reasoning benchmark that stumps prior AI systems—a notable step forward, not yet AGI."

4. **Claude Computer Use (Oct 22, 2024)**
   - **Capability:** Claude can now interpret screen content, control keyboard/mouse, operate software like a human.
   - **Status:** Public beta; rapidly improving.
   - **Later milestone:** Claude Sonnet 4.5 (Sept 2025) — 77.2% on SWE-bench Verified (#1 coding model), bundled with computer use.
   - **For slide:** "October 2024: AI gained the ability to use computers—not just reason about code, but run it."

5. **Sora 2 Launch (Sept 30, 2025)**
   - **Capability:** Text-to-video/audio generation with physics accuracy, multi-shot consistency, character persistence.
   - **Significance:** Moved video generation from "impressive toys" to "production tool."
   - **For slide:** "September 2025: AI video generation reached production quality, enabling minutes-long videos with narrative consistency."

6. **Anthropic's AGI Timeline (as of Sept 2025)**
   - **Prediction:** "Powerful AI" with Nobel Prize-level reasoning (biology, CS, math, engineering) expected late 2026 or early 2027.
   - **Self-improvement prediction:** 60% probability of recursive self-improvement by end of 2028.
   - **For slide:** "Industry leaders predict transformatively capable AI by early 2027—within 12 months."

---

## F. Summary: What Changed Since the Original Taxonomy?

| Original Stage | Issue | Recommended Fix |
|---|---|---|
| Stage 2: Context Awareness | Mislabeled; conflates ubicomp with collaborative filtering | Rename to "Statistical Learning & Data-Driven Prediction (1990s-2010s)" |
| Stage 3: Domain-Specific Expertise | Overlaps chronologically; doesn't highlight 2012 deep learning inflection | Rename to "Deep Learning & Perception (2012-2022)" |
| Stage 4: Reasoning Machines | Too broad; conflates scaling with agentic reasoning; "emotions/intent" framing is too narrow | **Split into two stages:** LLMs (2022-2024) and Agentic Reasoning (2024-2026) |
| Stage 5: AGI | Described neutrally; still accurate | Keep as "emerging" in May 2026; emphasize it's predicted late 2026–2027, not yet achieved |
| Stages 6-7: ASI & Singularity | Speculative; appropriate for long-term vision but de-emphasize for this audience | Keep as optional; note as "beyond our forecasting horizon" |

---

## G. Key Talking Points for the Slide (Mining-Audience Frame)

1. **Rule-based era solved narrow problems** — like old mine scheduling; worked until problems got too complex.

2. **Data-driven era let systems learn** — Netflix figures out what you like; your company's predictive maintenance models learn from equipment sensors.

3. **Deep learning era won the perception battles** — computers could finally "see" and "hear"; foundation for everything after.

4. **LLMs brought scale and generality** — ChatGPT showed one model could do writing, analysis, coding, summarization. That changed everything in the last 3 years.

5. **Agentic reasoning is the *current* inflection** — we're transitioning from "answer my question" to "solve my problem for me." It's the shift from a smart intern (LLM) to a capable analyst who can operate your tools. **We are here.**

6. **AGI is close but not here yet** — The smartest labs expect it in 12–18 months. When it arrives, it won't be a gradual fade-in; it'll be a capability cliff. Until then, the value is in using Stage 5 systems (agentic reasoning) to augment human expertise.

---

## H. Sources & References

### Research Papers & Technical Resources
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — Vaswani et al., June 2017. 173,000+ citations.
- [Levels of AGI for Operationalizing Progress on the Path to AGI](https://deepmind.google/research/publications/levels-of-agi-for-operationalizing-progress-on-the-path-to-agi/) — Google DeepMind, 2023. Standard framework for classifying AGI progress.

### Current Events & Product Releases
- [OpenAI o3: Breakthrough on ARC-AGI-Pub](https://arcprize.org/blog/oai-o3-pub-breakthrough) — ARC Prize org, Dec 2024.
- [Introducing computer use](https://www.anthropic.com/news/3-5-models-and-computer-use) — Anthropic, Oct 22, 2024.
- [Sora 2 is here](https://openai.com/index/sora-2/) — OpenAI, Sept 30, 2025.
- [Claude Sonnet 4.6](https://www.anthropic.com/news/claude-sonnet-4-6) — Anthropic, 2025. Extended thinking; 1M context.

### Business & Adoption Metrics
- [ChatGPT Statistics (2026)](https://www.businessofapps.com/data/chatgpt-statistics/) — Business of Apps. 100M users in 2 months (Jan 2023); most-downloaded app 2025.
- [Why ChatGPT Is the Fastest Growing Web Platform Ever](https://time.com/6253615/chatgpt-fastest-growing/) — TIME Magazine.
- [Anthropic Revenue $30B Run Rate (April 2026)](https://www.nyreport.com/2026/05/08/anthropic-races-to-expand-ai-compute/) — Reuters via NY Report.

### Forward-Looking Predictions
- [Anthropic's AGI Timeline Prediction (Sept 2025)](https://www.lesswrong.com/posts/gabPgK9e83QrmcvbK/what-s-up-with-anthropic-predicting-agi-by-early-2027-1) — LessWrong; Dario Amodei & Jack Clark.

---

## Conclusion

The original 7-stage taxonomy conflates distinct technical inflections (collaborative filtering vs. context-aware computing; scaling vs. reasoning) and uses imprecise labels. The refreshed 6-stage model clarifies the timeline and anchors each stage to concrete artifacts (ChatGPT, o3, Claude computer use).

**Most important update:** We've moved from a "reasoning machines" stage (poorly defined) to a clear present-day milestone: **Agentic Reasoning Systems (2024-2026).** This is where we are. AGI is predicted for late 2026–2027 but has not been declared achieved.

For a May 2026 mining-industry audience, the framing should be: *"We are in the era of AI systems that can think for extended periods, use tools autonomously, and tackle multi-step problems. AGI is coming, probably within a year, but today's value is in using these Stage 5 agentic systems to amplify human expertise."*

