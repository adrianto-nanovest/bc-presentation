# Context Engineering Pitfalls

**Summary:** A plain-language synthesis of the four ways a context window can degrade AI output quality — poisoning, distraction, confusion, and conflict — with mitigations and workshop-facing relevance notes.

**Sources consolidated:** `context-pitfall-poisoning.md`, `context-pitfall-distraction.md`, `context-pitfall-confusion.md`, `context-pitfall-conflict.md`, plus the "Context Engineering for Marketing" article from delve.ai.

---

## Introduction

In AI systems, the "context window" is everything the model can see when generating a response: your instructions, the conversation history, retrieved documents, tool outputs. Context engineering is the discipline of managing what goes into that window — and what stays out. For the BCE workshop audience, the practical implication is this: what you give an AI shapes what it gives back, and giving it more is not automatically giving it better. These four pitfalls describe the most common ways a context window works against you.

---

## 1. Context Poisoning

### Definition

Context Poisoning occurs when compromised, outdated, vague, or hallucinated information enters the context window and is then repeatedly referenced — causing the model to build subsequent reasoning on top of bad information. The corruption propagates silently. The model treats the poisoned content as truth and compounds errors across the conversation without any visible signal that something has gone wrong.

### Mechanism

Four failure patterns drive it. First, **hallucination embedding**: the model invents a fact early in a session; that fact gets referenced in later turns; each reference reinforces it. Second, **stale memory override**: older stored facts overwrite newer tool outputs because there is no logic for deciding which is more current. Third, **retrieval noise flooding**: low-relevance documents bury accurate information. Fourth, **contradictory context merge**: mutually exclusive facts from different sources create logical errors that the model resolves arbitrarily or not at all. Vague, ambiguous input is a fifth channel: text that can be interpreted multiple ways gives the model a choice point without enough grounding to choose correctly. The cascading nature is the dangerous part — by the time an output looks wrong, the chain of reasoning producing it has been poisoned for many steps.

### Concrete Example

An analyst pastes last quarter's headcount figure into a strategy document the AI is helping revise. The headcount changes in week two, but the AI continues referencing the original figure through six weeks of revisions. The strategy ships citing a number off by 30%. Nobody can pinpoint where it went wrong because the error is distributed across every revision rather than concentrated in one.

### Mitigation

- **Subagent verification** — a separate verification agent with its own clean context fact-checks claims before they are embedded in the working context. The verifier never shares the poisoned thread.
- **Context quarantine / isolation** — separate context by trust level; system instructions are isolated from untrusted retrieval outputs.
- **Context pruning** — actively remove stale, low-relevance, or unverified content; pair with TTL (expiry) policies on stored memory.
- **Source prioritization** — assign trust thresholds across sources; newer tool outputs override older stored facts; verified sources beat unverified ones.
- **Conflict resolution** — explicit detection when two sources contradict, so the model surfaces the conflict instead of silently merging.
- **Temporal filtering** — constrain retrieval to recent documents (e.g., last six months) to prevent stale data from re-entering context.

### Workshop-Relevance Note

As a user, you encounter context poisoning whenever you paste outdated material into a long conversation and keep building on the AI's response without checking its source. The practical discipline is to start fresh sessions for new topics and verify any number, date, or named source the AI cites before treating it as load-bearing.

---

## 2. Context Distraction

### Definition

Context Distraction (sometimes called "context rot") is the phenomenon where output quality measurably declines as accumulated tokens grow within a session — even when the relevant information is still technically available. The model becomes overwhelmed by the sheer volume of surrounding tokens, favoring patterns from past behavior over fresh reasoning. Drew Breunig's summary is precise: beyond a certain context length, models "favor repeating actions from vast history rather than synthesizing novel plans." The Gemini research team observed this threshold beyond 100,000 tokens, though degradation begins earlier in practice.

### Mechanism

Three compounding mechanisms drive it. **Token accumulation**: every turn, retrieved document, and tool call result piles up. **Attention dilution**: transformer attention is quadratic in token count — at 100,000 tokens the model is computing roughly 10 billion pairwise relationships; the attention budget per token shrinks and signal becomes harder to isolate. **Lost-in-the-Middle effect** (Liu et al., 2023): models attend most reliably to the beginning and end of the window; information in the middle is systematically under-used. As context grows, critical material migrates into this dead zone. The result is repetition, stale framings, and reduced capacity for novel synthesis even when the underlying model is unchanged.

### Concrete Example

A long document-revision session: you start by asking the model to draft a weekly report. After twenty rounds of edits — adding sections, requesting tone changes, pasting in source documents — the model begins repeating phrases from earlier drafts, missing recent corrections, and reverting to structures it already abandoned. The thread accumulated; the freshness drained.

### Mitigation

- **Context summarization (compaction)** — replace stretches of accumulated history with a compressed summary. The full detail is lost; the load-bearing facts are preserved in compact form. This is the most direct mitigation for distraction.
- **Context offloading** — move large or rarely-accessed information outside the context window into external stores (filesystem, database, vector store) and retrieve it on demand via a pointer. Research shows up to 54% improvement against benchmarks when offloading is applied properly.
- **Context pruning** — actively remove irrelevant or no-longer-needed turns; drop failed-attempt scratch work; strip tool call results that are no longer needed.
- **Subagent isolation** — spin up subagents with their own fresh context windows for sub-tasks; the main agent receives only the final result, not the dozens of intermediate exchanges.
- **Tool curation** — do not load every available tool into context; curate the set per task. Fewer tools mean less attention dilution.

### Workshop-Relevance Note

You encounter context distraction whenever a single conversation thread runs across many topics or many rounds of revision. The practical habit is to treat long sessions skeptically: if the AI starts repeating itself or its answers feel dull, the thread has likely accumulated past its useful length. Starting a new session with a crisp brief often produces sharper output than continuing a bloated one.

---

## 3. Context Confusion

### Definition

Context Confusion occurs when superfluous content in the context window causes the model to generate a lower-quality response. Drew Breunig's definition is direct: "when superfluous content in the context is used by the model to generate a low-quality response." The core mechanism is simple: if something is in the context, the model pays some attention to it — even if it is irrelevant. More information is not automatically more helpful; past a threshold it actively degrades output. The pop-science framing of "cognitive overload" is useful for explanation, but the underlying mechanism is attention dilution — every token costs some of the model's attention budget, and that budget is finite.

### Mechanism

Three named mechanisms operate here. **Tool overload**: when agents are given many tool definitions, performance degrades empirically across all model sizes. A quantized Llama 3.1 8B model failed a benchmark when given 46 tools but succeeded at the same task when given 19. Beyond roughly 30 tools, descriptions begin overlapping and producing confusion; beyond 100, failure rates approach certainty. **Irrelevant information**: context containing content that does not bear on the question causes models to surface incorrect or off-target responses — smaller models suffer more, but the effect holds across sizes. **Attention overload**: even when no single piece of context is misleading, the total mass dilutes the model's attention to what matters.

### Concrete Example

An analyst pastes a 50-page operations report into the context to "make sure the model has everything." The model's summary misses the three most important items — they were crowded out by noise. The same model, given a curated 6-page extract, produces a sharper and more accurate summary.

### Mitigation

- **Tool loadout curation** — select only the tools needed for the current task rather than loading every available tool. Treat tool definitions as items to be filtered, not dumped wholesale. (Plain-language gloss: tool loadout means the set of tools you carry into a specific task, the same way a technician brings only the instruments relevant to the job at hand.)
- **Context pruning** — actively remove irrelevant information from context as it accumulates; remove historical instructions that no longer apply.
- **RAG (retrieval-augmented generation)** — retrieve only the most relevant documents rather than pasting entire knowledge bases. Caps the volume of content the model sees.
- **Context quarantine** — isolate sub-tasks into their own context windows so cross-task noise does not bleed in.

Note: delve.ai's "context filters" mitigation maps directly to context pruning and RAG above; no substantive discrepancy, just different labeling.

### Workshop-Relevance Note

As a user, context confusion is the pitfall behind the habit of pasting in everything "just in case." More material in a prompt is not free — it competes with the parts that actually matter. The discipline is curation: give the AI what it needs for this task, not everything you have.

---

## 4. Context Conflict (Clash)

### Definition

Context Conflict — also called Context Clash in industry sources and Knowledge Conflict in academic literature — occurs when contradictory information accumulates inside the context window. The model does not typically freeze outright. More commonly it commits early to one interpretation and ignores later corrections, mixes contradictory facts in a single answer, oscillates across turns, or favors its own trained knowledge over supplied context even when the context is correct. The "cognitive gridlock" metaphor is useful for explanation, but the technical reality is commitment to wrong assumptions more than paralysis.

### Mechanism

Three conflict types are recognized in the academic literature (Xu et al., 2024). **Context-memory conflict**: supplied context contradicts the model's trained knowledge; stronger models often persist with internal beliefs even when external evidence is correct. **Inter-context conflict**: multiple supplied sources — documents, tool outputs, sub-agent results — contradict each other. **Intra-memory conflict**: the model's own internal knowledge contains contradictions. In agent systems, inter-context conflict dominates.

Arrival order matters critically. A Microsoft and Salesforce study modified benchmark prompts so that information arrived sharded across multi-turn dialogue rather than all at once. OpenAI's o3 model dropped from 98.1 to 64.1 — a 34-point performance collapse. Models "make assumptions in early turns and prematurely attempt to generate final solutions, on which they overly rely." Once committed, "they become lost and do not recover."

### Concrete Example

A model is asked to write a compliance summary. The retrieved knowledge base contains last quarter's policy and this quarter's revised policy. Without version tagging, the model averages or alternates between them, producing a summary that satisfies neither version. The user cannot tell which parts of the output reflect current policy and which reflect the outdated one.

### Mitigation

- **Context isolation (quarantine)** — decompose a task into smaller jobs, each with its own context window. Two contexts that would conflict if merged stay clean if they never touch. Each subagent reasons within a smaller, internally consistent slice and returns a condensed summary; the orchestrator never sees the raw sub-context. Anthropic's multi-agent research system outperformed its single-agent baseline by 90.2% on internal evaluations using this pattern.
- **Versioned context** — tag every piece of context with provenance and version metadata so the model (or the system around it) can reason about which version it is using. A model that sees `[Policy v3, 2025-Q4, supersedes v2]` can disambiguate; a model that sees the same policy text twice without metadata cannot. This requires upstream discipline in retrieval systems.
- **Context pruning** — actively remove conflicting or stale items from context before sending. Removing the outdated version of a document before retrieval prevents the conflict from forming in the first place.
- **Subagent verification** — when subagents return contradictory results, route them through a verification agent that explicitly reconciles before the orchestrator stitches an answer.
- **Selective memory management** — be deliberate about what enters long-term memory; periodically prune duplicates and outdated facts to prevent conflicts from accumulating upstream of any prompt.

Note: delve.ai uses "context pruning" as the primary mitigation here, consistent with the local doc. No substantive contradiction; the local doc adds versioned context and subagent verification as additional mechanisms.

### Workshop-Relevance Note

As a user, you encounter context conflict whenever you work from multiple documents in the same session without telling the AI which one to trust — or when you correct the AI mid-conversation but the original instruction is still in the thread. The practical habit is to be explicit about what is current: if you have a newer version of a document, say so and remove the older one.

---

## Cross-Cutting Takeaway

All four pitfalls share a common root: the context window is not a neutral container. Everything in it exerts influence on the output — whether it is accurate or not, recent or not, relevant or not. Poisoning shows that bad information compounds silently. Distraction shows that too much information degrades freshness. Confusion shows that irrelevant information dilutes accuracy. Conflict shows that contradictory information forces arbitrary choices. The single mental model an AI-fluent professional should carry is this: **the quality of your context determines the quality of your output, and that quality is about what you leave out as much as what you put in.** Active curation — starting fresh when a thread grows stale, trimming what no longer applies, being explicit about which version is authoritative — is the habit that separates effective AI use from unreliable AI use.

---

## Sources

### Local research notes (consolidated into this file)

- `docs/researches/context-pitfall-poisoning.md`
- `docs/researches/context-pitfall-distraction.md`
- `docs/researches/context-pitfall-confusion.md`
- `docs/researches/context-pitfall-conflict.md`

### External reference

- delve.ai — "Context Engineering for Marketing" (The Problems section): https://www.delve.ai/blog/context-engineering-marketing

### Primary upstream sources (from the local docs)

- Drew Breunig — How Long Contexts Fail (June 2025): https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html
- Drew Breunig — How to Fix Your Context (June 2025): https://www.dbreunig.com/2025/06/26/how-to-fix-your-context.html
- Liu et al., 2023 — Lost in the Middle (arXiv:2307.03172): https://arxiv.org/abs/2307.03172
- Xu et al., 2024 — Knowledge Conflicts for LLMs: A Survey (arXiv:2403.08319): https://arxiv.org/abs/2403.08319
- Cemri et al., 2025 — Why Do Multi-Agent LLM Systems Fail? (arXiv:2503.13657)
- Microsoft + Salesforce sharded-context performance study (arXiv:2403.08319v2)
