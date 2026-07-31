# Loop Engineering in AI/LLM Engineering

**Date:** 2026-07-31

## Summary

**Confirmed:** “Loop Engineering” is a genuine but very recent name in AI-agent discourse. The strongest traceable naming event is Addy Osmani’s essay **“Loop Engineering,” published June 7, 2026**, which defines it as replacing manual, turn-by-turn prompting with a system that finds work, dispatches agents, verifies results, records state, and decides what happens next. Osmani explicitly says it is still early and places it “one floor above” a single-agent harness. [Addy Osmani, 2026-06-07](https://addyosmani.com/blog/loop-engineering/)

**Confirmed:** Adoption followed quickly: O’Reilly republished Osmani’s essay on June 22; a software-engineering preprint formalized a “loop specification” on June 28; further practitioner, conference, and preprint usage appeared in July; and IBM published a vendor explainer on July 17 calling Loop Engineering an **“emerging agentic engineering practice.”** [O’Reilly, 2026-06-22](https://www.oreilly.com/radar/loop-engineering/) [Macedo, arXiv, 2026-06-28](https://arxiv.org/abs/2607.00038) [IBM, 2026-07-17](https://www.ibm.com/think/topics/loop-engineering)

**Inference:** As of July 31, 2026, it is **not an established discipline** with a stable scope, standard vocabulary, recognized professional role, or consensus boundary. It is an emerging label for practices already described as agent-loop design, evaluator–optimizer workflows, eval-driven development, feedback-loop design, long-running-agent harness design, and human-in-the-loop governance. This conclusion is supported by Osmani calling the idea early and expressing skepticism, IBM calling it emerging, and major OpenAI and Anthropic sources describing the practices without presenting “Loop Engineering” as a distinct field. [Osmani, 2026-06-07](https://addyosmani.com/blog/loop-engineering/) [IBM, 2026-07-17](https://www.ibm.com/think/topics/loop-engineering) [Anthropic, 2024-12-19](https://www.anthropic.com/engineering/building-effective-agents) [OpenAI, 2026-02-11](https://openai.com/index/harness-engineering/)

**Bottom line:** The term is real, but the discipline claim is ahead of the evidence. Its useful core is designing the temporal and control structure around repeated agent work: triggers, goals, feedback, verification, retry and recovery policy, state, stopping conditions, budgets, and human decision boundaries.

## Research scope and classification rule

This report treats an occurrence as **genuine named-term usage** when “Loop Engineering” functions as the name of an AI/agent practice and the source supplies a definition or sustained discussion. Merely placing “loop” near “engineering,” discussing an “engineering loop,” or using “human-in-the-loop engineering” does not establish the named discipline.

Web search cannot prove that no earlier isolated use exists. The conclusion about origin is therefore limited to the earliest clear, attributable, indexed AI usage found in this review.

## 1. Is “Loop Engineering” an established or emerging named discipline?

### Verdict

**Confirmed:** It is an **emerging named practice**, not an established discipline. IBM uses exactly that classification, while Osmani’s originating essay says the idea is still early and that he remains skeptical about cost and applicability. [IBM, 2026-07-17](https://www.ibm.com/think/topics/loop-engineering) [Osmani, 2026-06-07](https://addyosmani.com/blog/loop-engineering/)

**Inference:** The phrase currently works best as practitioner shorthand for “engineering the system that repeatedly invokes, checks, and steers agents.” Its scope is not settled: some sources restrict it to an outer automation layer above a harness, while others use it for almost the entire agent runtime.

### Provenance and adoption timeline

| Date | Source and usage | Assessment |
|---|---|---|
| 2023 | ReAct interleaved model reasoning and environmental action; Self-Refine formalized iterative generation, feedback, and refinement. Neither called this “Loop Engineering.” [ReAct, ICLR 2023](https://arxiv.org/abs/2210.03629) [Self-Refine, NeurIPS 2023](https://papers.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html) | Established technical ancestry, not named-term usage. |
| 2024-12-19 | Anthropic described agents, workflows, tool-use loops, and an evaluator–optimizer workflow in which one LLM generates and another evaluates repeatedly. [Anthropic](https://www.anthropic.com/engineering/building-effective-agents) | Direct conceptual predecessor, not named-term usage. |
| 2025-09-29 | Anthropic defined agents as “LLMs autonomously using tools in a loop” and context engineering as curating the tokens available on every inference step. [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Established agent-loop and context terminology, not named-term usage. |
| 2026-02-11 | OpenAI’s harness-engineering account described engineers designing environments and feedback loops for reliable agent work, including iterative review and recurring background tasks. [OpenAI](https://openai.com/index/harness-engineering/) | Very close practice under the name “harness engineering.” |
| 2026-03-24 | Anthropic documented continuous iteration, context resets, structured handoffs, and separate planner, generator, and evaluator agents as harness design. [Anthropic](https://www.anthropic.com/engineering/harness-design-long-running-apps) | Very close practice under “harness design.” |
| May–June 2026 | Peter Steinberger argued that developers should design loops that prompt coding agents; Boris Cherny described his work as writing loops rather than manually prompting Claude. Osmani cited both statements when naming the practice. [Steinberger post](https://x.com/steipete/status/2063697162748260627) [Cherny’s May 2026 conference interview](https://www.youtube.com/watch?v=SlGRN8jh2RI) [Osmani’s attribution](https://addyosmani.com/blog/loop-engineering/) | Genuine precursor framing, but not firm evidence that either speaker coined the exact discipline name. |
| 2026-06-07 | Osmani published **“Loop Engineering”** and defined it as replacing oneself as the person prompting the agent with a system that does so automatically. [Osmani](https://addyosmani.com/blog/loop-engineering/) | Earliest clear, attributable named-term usage found. |
| 2026-06-22 | O’Reilly Radar republished Osmani’s essay under the same title. [O’Reilly](https://www.oreilly.com/radar/loop-engineering/) | Genuine usage and broader publication, but not an independent definition. |
| 2026-06-28 | Sandeco Macedo submitted a preprint defining a reusable external “loop specification” containing a trigger, goal, verification step, stopping rule, and memory. [arXiv](https://arxiv.org/abs/2607.00038) | Evidence that the term entered research-oriented writing; still a single-author preprint. |
| 2026-07-15 | Osmani’s written version of his AI Engineer World’s Fair closing keynote distinguished model, harness, loop, and software factory, while placing human accountability at the outer boundary. [Osmani](https://addyosmani.com/blog/own-the-outer-loop/) | Authoritative practitioner clarification and conference usage. |
| 2026-07-16 | The “Proof-or-Stop” preprint used Loop Engineering for evidence-gated lifecycle control around autonomous coding agents. [arXiv](https://arxiv.org/abs/2607.14890) | Genuine named usage with empirical claims, but explicitly a v1 preprint. |
| 2026-07-17 | IBM defined Loop Engineering as designing agentic workflows that act, observe, decide, and iterate toward a user goal with minimal intervention. [IBM](https://www.ibm.com/think/topics/loop-engineering) | First clear institutional vendor adoption found. |

### Competing definitions

#### A. Self-prompting outer automation

Osmani’s narrow definition is that a developer designs a system which discovers work, hands it to agents, checks results, stores progress, and chooses the next action. He distinguishes this from the environment of one agent run and says Loop Engineering sits above that harness. [Osmani, 2026-06-07](https://addyosmani.com/blog/loop-engineering/)

The Macedo preprint makes this separation more explicit: a human supplies a reusable external loop specification—trigger, goal, verifier, stopping rule, and memory—to an existing agent harness. [Macedo, 2026-06-28](https://arxiv.org/abs/2607.00038)

#### B. Broad agentic-workflow design

IBM uses a broader definition: designing workflows in which agents dynamically act, observe, decide, and adjust until a goal is reached. Its component list includes scheduling, hooks, context engineering, tool access, worktrees, skills, subagents, and persistent state. [IBM, 2026-07-17](https://www.ibm.com/think/topics/loop-engineering)

Under this definition, Loop Engineering substantially overlaps both harness engineering and ordinary agentic-loop design.

#### C. Evidence-gated lifecycle control

The “Proof-or-Stop” preprint narrows the emphasis to lifecycle gates: an agent’s statements that work is reviewed, tested, or done remain claims until supported by current, mechanically admissible evidence. The loop advances, retries, stops, or escalates according to those gates. [Huang et al., 2026-07-16](https://arxiv.org/abs/2607.14890)

#### D. Human ownership of the outer loop

Osmani’s later keynote framing keeps autonomous execution inside the system but puts humans in constraints, sampling, audit, verdict, and ownership loops. The agent performs investigation, implementation, and verification; a human remains accountable for whether evidence is sufficient to affect production. [Osmani, 2026-07-15](https://addyosmani.com/blog/own-the-outer-loop/)

### Genuine usage versus coincidental pairings

**Genuine AI usage** includes sources where the phrase is a title or defined practice: Osmani, O’Reilly, IBM, and the June–July 2026 preprints. [Osmani](https://addyosmani.com/blog/loop-engineering/) [O’Reilly](https://www.oreilly.com/radar/loop-engineering/) [IBM](https://www.ibm.com/think/topics/loop-engineering) [Macedo](https://arxiv.org/abs/2607.00038)

**Conceptually related but not named-term usage:**

- OpenAI’s May 27 article describes a Codex-driven improvement loop and later calls it an “engineering loop,” but does not present “Loop Engineering” as a named discipline. [OpenAI](https://openai.com/index/building-self-improving-tax-agents-with-codex/)
- Anthropic uses “agent loop,” “evaluator–optimizer workflow,” “continuous iteration cycles,” and “harness design,” but the reviewed primary sources do not define a discipline called Loop Engineering. [Anthropic, 2024-12-19](https://www.anthropic.com/engineering/building-effective-agents) [Anthropic, 2026-03-24](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- “Human-in-the-loop engineering” normally modifies a system or supervision approach; it does not necessarily name Loop Engineering.

**Unrelated homonyms:**

- Electrical and process-control engineering has long used “loop engineering” for designing field-equipment electrical loops between instruments and automation systems. [South African DCS engineering standard](https://www.etenders.gov.za/home/Download/?blobName=c631c64f-6dee-43ac-8acf-13777c35d5b8.pdf&downloadedFileName=240-132042345.pdf)
- Protein engineering uses “loop engineering” for modifying flexible structural loops in enzymes. [Biotechnology Advances, December 2025](https://www.sciencedirect.com/science/article/pii/S0734975025002022)
- These domains do not provide evidence for prior use of the AI-agent discipline.

## 2. What practices does the term name?

### Designing the agent’s execution cycle

The basic runtime cycle is model call → inspect response → execute tool calls or handoffs → append results → call the model again → terminate on final output or a turn limit. OpenAI’s Agents SDK calls this the built-in “agent loop.” [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/running_agents/)

IBM describes a comparable goal → action → observation → adjustment cycle and emphasizes measurable termination conditions. [IBM](https://www.ibm.com/think/topics/loop-engineering)

### Triggers, scheduling, and work discovery

In the narrow outer-loop definition, a loop begins from a timer, event, queue, issue, CI failure, or other discovery mechanism rather than a human manually starting every turn. Osmani treats automation as the heartbeat that turns a one-time agent run into recurring work. [Osmani](https://addyosmani.com/blog/loop-engineering/)

### Goals, completion tests, budgets, and stop policy

A loop must specify what success means, when another iteration is justified, when retrying has stopped producing new evidence, and when to fail, pause, or escalate. IBM calls for explicit, verifiable stopping criteria; the Macedo preprint makes the stopping rule part of the loop specification; OpenAI’s runtime separately enforces a configurable maximum-turn boundary. [IBM](https://www.ibm.com/think/topics/loop-engineering) [Macedo](https://arxiv.org/abs/2607.00038) [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/running_agents/)

### Feedback and verification loops

Verification can come from unit tests, integration tests, linters, type checks, browser state, production traces, model graders, or human review. Anthropic’s long-running-agent work found that separating the generator from a skeptical evaluator was more tractable than asking the generating agent to grade itself. [Anthropic, 2026-03-24](https://www.anthropic.com/engineering/harness-design-long-running-apps)

This is the maker/checker or generator/evaluator pattern inside Loop Engineering. The checker’s verdict determines whether the loop terminates, retries with feedback, or escalates.

### Eval loops

An **eval loop** is related but operates at the development-system level rather than necessarily inside one runtime task. Anthropic defines agent evals as tasks, repeated trials, graders, and complete traces; it recommends capability evals for hill-climbing and regression evals for protecting existing behavior. [Anthropic, 2026-01-09](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

OpenAI’s Tax AI case shows a larger improvement loop: practitioner corrections become structured production traces, recurring failures become eval targets, Codex proposes changes, targeted and regression evals validate them, and ambiguous cases return to humans. [OpenAI, 2026-05-27](https://openai.com/index/building-self-improving-tax-agents-with-codex/)

Thus a runtime verification loop asks, “Should this task continue?” An eval-development loop asks, “Did this agent or harness variant improve across a representative task set?”

### State, memory, and context across iterations

Repeated work needs durable state recording what was attempted, what evidence was produced, what remains open, and what the next run should do. Osmani lists external memory as the loop’s “spine,” while the Macedo preprint includes memory in the loop specification. [Osmani](https://addyosmani.com/blog/loop-engineering/) [Macedo](https://arxiv.org/abs/2607.00038)

Context engineering governs which parts of that state, history, tool output, and project knowledge enter each model call. Anthropic defines it as curating the highest-value tokens from an evolving universe of possible information. [Anthropic, 2025-09-29](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

### Concurrency and multi-agent roles

Worktrees isolate parallel agents; skills preserve reusable task knowledge; connectors expose external systems; and subagents allow separate exploration, implementation, and verification roles. These are part of Osmani’s concrete Loop Engineering inventory and IBM’s broader component list. [Osmani](https://addyosmani.com/blog/loop-engineering/) [IBM](https://www.ibm.com/think/topics/loop-engineering)

### Human-in-the-loop cadence

Loop design determines where humans intervene: every tool call, only for sensitive actions, at review gates, after exception escalation, or at the final production verdict. OpenAI’s Agents SDK supports durable pause, approval or rejection, serialization, and resumption for sensitive tool calls. [OpenAI Agents SDK HITL documentation](https://openai.github.io/openai-agents-python/human_in_the_loop/)

Anthropic reports that frequent permission prompts cause approval fatigue and argues for stronger environmental boundaries so humans can supervise at meaningful decision points rather than approve every low-level step. [Anthropic, 2026-05-25](https://www.anthropic.com/engineering/how-we-contain-claude)

**Inference:** The most coherent synthesis is a set of nested loops at different timescales:

1. An inner tool-use loop within an agent run.
2. A task loop that verifies and retries work.
3. An outer automation loop that discovers and schedules new work.
4. An eval loop that improves the agent or harness over releases.
5. A human governance loop that sets constraints and approves consequential outcomes.

No reviewed source has established this five-loop model as a standard taxonomy.

## 3. Relationship to adjacent engineering terms

| Term | Primary object | Relationship to Loop Engineering |
|---|---|---|
| **Prompt engineering** | The wording and organization of instructions supplied to a model. [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | A loop contains prompts; it does not eliminate the need for good instructions. Loop Engineering determines when prompts run, how follow-up prompts are produced, and what evidence controls another iteration. [Osmani](https://addyosmani.com/blog/loop-engineering/) |
| **Context engineering** | The information and token set available during each inference: instructions, tools, retrieved data, history, and state. [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Context engineering governs what each iteration sees. Loop Engineering governs the sequence of iterations and how their outputs alter state, verification, and subsequent context. |
| **Harness engineering** | The runtime and environment around the model: tools, permissions, sandboxing, state, context management, observability, reviews, and feedback mechanisms. [OpenAI](https://openai.com/index/harness-engineering/) [Anthropic](https://www.anthropic.com/engineering/harness-design-long-running-apps) | Under Osmani’s narrow framing, a harness enables one agent run and Loop Engineering repeatedly invokes that harness. Under broader industry and repo framing, the harness already contains orchestration and verification loops, leaving Loop Engineering as an emphasis within harness engineering rather than a separate layer. |
| **Agentic-loop design** | The immediate runtime control flow: model → tool or handoff → observation → next model turn → final output or limit. [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/running_agents/) | This is the mechanical inner loop. Narrow Loop Engineering additionally covers external triggers, durable state across runs, independent verification, scheduling, budgets, and human gates. IBM’s broad definition largely collapses the distinction. [IBM](https://www.ibm.com/think/topics/loop-engineering) |

### Position against this repository’s harness-engineering framing

The repository’s existing paper defines harness engineering broadly: orchestration loops, tools, context management, state and memory, permissions, verification, subagents, hooks, and observability all belong to the harness. [Repository paper](./harness-engineering.md)

That broad framing is consistent with OpenAI’s harness account, which includes feedback loops, recurring background tasks, review, validation, recovery, and agent-accessible environments. [OpenAI, 2026-02-11](https://openai.com/index/harness-engineering/) It is also consistent with Anthropic’s harness work, which includes continuous iteration, context resets, structured handoffs, and planner–generator–evaluator coordination. [Anthropic, 2026-03-24](https://www.anthropic.com/engineering/harness-design-long-running-apps)

**Inference:** Against this repo’s framing, Loop Engineering is not cleanly a new layer containing capabilities absent from the harness. It is a different emphasis on the harness’s **temporal/control-plane dimension**: when runs begin, how they feed back into one another, what proves progress, when they stop, and where humans intervene.

Osmani’s “one floor above the harness” distinction remains coherent only if “harness” is defined narrowly as the environment for one agent run. If the harness includes long-running orchestration, verification, retries, scheduling, and persistence—as this repo does—the two terms overlap heavily. The disagreement is definitional, not evidence of two clearly separated technical disciplines.

## 4. Source authority and evidentiary weight

### Strongest sources for the named term

- **Addy Osmani, “Loop Engineering,” June 7, 2026.** Earliest clear named definition found and the central practitioner source. It is a personal essay; the page explicitly says its views do not represent Google. [Source](https://addyosmani.com/blog/loop-engineering/)
- **O’Reilly Radar, June 22, 2026.** Professionally edited republication that increased visibility but explicitly identifies itself as a repost of Osmani’s article, so it is not independent corroboration. [Source](https://www.oreilly.com/radar/loop-engineering/)
- **IBM, “What is loop engineering?”, July 17, 2026.** Strongest institutional vendor adoption of the exact name found; IBM explicitly labels it emerging. It is an explanatory article, not a standard or technical specification. [Source](https://www.ibm.com/think/topics/loop-engineering)
- **Addy Osmani, “Own the Outer Loop,” July 15, 2026.** Written version of an AI Engineer World’s Fair 2026 closing keynote; strongest practitioner source for the model → harness → loop → factory distinction and the human-accountability boundary. [Source](https://addyosmani.com/blog/own-the-outer-loop/)

### Strongest sources for the underlying practices

- **Anthropic, “Building effective agents,” December 19, 2024.** Primary vendor account of agents, workflows, tool-use patterns, and evaluator–optimizer loops. [Source](https://www.anthropic.com/engineering/building-effective-agents)
- **Anthropic, “Effective context engineering for AI agents,” September 29, 2025.** Primary definition of context engineering and of agents as LLMs autonomously using tools in a loop. [Source](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- **Anthropic, “Demystifying evals for AI agents,” January 9, 2026.** Primary account of trials, graders, traces, capability evals, regression evals, and eval-driven agent development. [Source](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- **OpenAI, “Harness engineering,” February 11, 2026.** Primary account of environments, agent legibility, feedback loops, review loops, recurring tasks, and human/agent division of labor. [Source](https://openai.com/index/harness-engineering/)
- **Anthropic, “Harness design for long-running application development,” March 24, 2026.** Primary evidence for context resets, structured handoffs, continuous iteration, and generator/evaluator separation. [Source](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- **OpenAI, “Building self-improving tax agents with Codex,” May 27, 2026.** Primary production case for converting human corrections and traces into eval targets and bounded engineering tasks. [Source](https://openai.com/index/building-self-improving-tax-agents-with-codex/)
- **OpenAI Agents SDK documentation, accessed July 31, 2026.** Authoritative living documentation for the mechanical agent loop, turn limits, handoffs, tools, sessions, and human approval/resumption. [Agent loop](https://openai.github.io/openai-agents-python/running_agents/) [HITL](https://openai.github.io/openai-agents-python/human_in_the_loop/)
- **Anthropic, “How we contain Claude across products,” May 25, 2026.** Primary evidence on approval fatigue, sandbox boundaries, and the limits of per-action human supervision. [Source](https://www.anthropic.com/engineering/how-we-contain-claude)

### Conference and practitioner evidence

- **Boris Cherny at Sequoia AI Ascent, May 2026.** Primary conference interview documenting the shift toward writing and operating loops; useful as a precursor, not firm evidence that Cherny coined the exact term “Loop Engineering.” [Video](https://www.youtube.com/watch?v=SlGRN8jh2RI)
- **Peter Steinberger, June 2026.** Primary social post for the slogan about designing loops that prompt agents; Osmani used it as a direct precursor to his definition. [Post](https://x.com/steipete/status/2063697162748260627)
- **Osmani’s AI Engineer World’s Fair closing keynote, written version July 15, 2026.** Primary practitioner talk for the human “outer loop” interpretation. [Source](https://addyosmani.com/blog/own-the-outer-loop/)

### Research evidence

- **ReAct, ICLR 2023, and Self-Refine, NeurIPS 2023.** Peer-reviewed technical ancestry for action–observation and feedback–refinement loops; neither uses the new discipline name. [ReAct](https://arxiv.org/abs/2210.03629) [Self-Refine](https://papers.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html)
- **Macedo, submitted June 28, 2026.** Early formalization of Loop Engineering and an external loop specification; arXiv preprint, not evidence of field-wide consensus. [Source](https://arxiv.org/abs/2607.00038)
- **Huang et al., submitted July 16, 2026.** Evidence-gated lifecycle-control interpretation with empirical results and stated limitations; explicitly a v1 preprint. [Source](https://arxiv.org/abs/2607.14890)

## Sources

1. Addy Osmani, “Loop Engineering,” 2026-06-07 — https://addyosmani.com/blog/loop-engineering/
2. O’Reilly Radar, “Loop Engineering,” 2026-06-22 — https://www.oreilly.com/radar/loop-engineering/
3. IBM, “What is loop engineering?”, 2026-07-17 — https://www.ibm.com/think/topics/loop-engineering
4. Addy Osmani, “Own the Outer Loop,” 2026-07-15 — https://addyosmani.com/blog/own-the-outer-loop/
5. Sandeco Macedo, “Stop Hand-Holding Your Coding Agent,” submitted 2026-06-28 — https://arxiv.org/abs/2607.00038
6. Jek Huang et al., “Proof-or-Stop,” submitted 2026-07-16 — https://arxiv.org/abs/2607.14890
7. Anthropic, “Building effective agents,” 2024-12-19 — https://www.anthropic.com/engineering/building-effective-agents
8. Anthropic, “Effective context engineering for AI agents,” 2025-09-29 — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
9. Anthropic, “Demystifying evals for AI agents,” 2026-01-09 — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
10. Anthropic, “Harness design for long-running application development,” 2026-03-24 — https://www.anthropic.com/engineering/harness-design-long-running-apps
11. Anthropic, “How we contain Claude across products,” 2026-05-25 — https://www.anthropic.com/engineering/how-we-contain-claude
12. OpenAI, “Harness engineering: leveraging Codex in an agent-first world,” 2026-02-11 — https://openai.com/index/harness-engineering/
13. OpenAI, “Building self-improving tax agents with Codex,” 2026-05-27 — https://openai.com/index/building-self-improving-tax-agents-with-codex/
14. OpenAI Agents SDK, “Running agents,” accessed 2026-07-31 — https://openai.github.io/openai-agents-python/running_agents/
15. OpenAI Agents SDK, “Human-in-the-loop,” accessed 2026-07-31 — https://openai.github.io/openai-agents-python/human_in_the_loop/
16. Shunyu Yao et al., “ReAct,” ICLR 2023 — https://arxiv.org/abs/2210.03629
17. Aman Madaan et al., “Self-Refine,” NeurIPS 2023 — https://papers.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html
18. Boris Cherny, Sequoia AI Ascent interview, May 2026 — https://www.youtube.com/watch?v=SlGRN8jh2RI
19. Peter Steinberger, agent-loop post, June 2026 — https://x.com/steipete/status/2063697162748260627
20. “Loop engineering” in DCS/electrical instrumentation — https://www.etenders.gov.za/home/Download/?blobName=c631c64f-6dee-43ac-8acf-13777c35d5b8.pdf&downloadedFileName=240-132042345.pdf
21. “Loop engineering” in enzymes, *Biotechnology Advances*, December 2025 — https://www.sciencedirect.com/science/article/pii/S0734975025002022

## Open questions for the placement decision

- Is “Loop Engineering” intended to mean only the outer automation that repeatedly invokes an existing harness, or the full act–observe–verify agent runtime?
- Should the term be presented as a June 2026 emerging label, or should the material emphasize the older, established concepts beneath it?
- Does the chosen harness definition stop at one agent run, or already include orchestration, retries, verification, scheduling, and persistence?
- Is the central loop the agent’s inner tool-use cycle, the engineering team’s eval/improvement cycle, or the human accountability loop around production?
- Should evidence gates and human ownership be essential parts of the definition, or optional safety practices around a narrower execution loop?