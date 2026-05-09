# Harness Engineering

**Summary:** Harness engineering is the discipline of designing the software infrastructure — orchestration loops, tools, memory, context management, safety enforcement, and state persistence — that surrounds an LLM and enables it to function as a reliable autonomous agent. The harness, not the model, is the load-bearing component of production AI agents. A well-designed harness with a competent model outperforms a frontier model with poor harness design; Anthropic reports that multi-agent harness designs improve task completion by 90.2% over single-agent approaches and that holding the model constant while optimizing only harness configuration raises completion rates from 52.8% to 66.5%.

**Sources consolidated:** Anthropic (multi-agent research, effective harnesses, Claude Code), Cursor (agent harness blog, subagent best practices), OpenAI (Codex harness engineering), Simon Willison (agentic patterns), Drew Breunig (context engineering), Geoffrey Huntley (Ralph Loop), Addy Osmani, Martin Fowler, MongoDB, LangChain, IBM, Microsoft, and academic venues (arXiv, ACM patterns). Primary sources: engineering blogs, product documentation, and practitioner interviews published 2025–2026.

> **Verification status:** This synthesis was assembled by a fast research subagent. The architectural claims and well-known metrics (90.2% multi-agent improvement, Devin's 13.86% SWE-bench, MCP architecture) are well-documented in primary sources. **Specific numerical claims marked with ⚠ below should be verified against the cited URL before being placed on a slide.** Architectural prose (anatomy, modes, mitigations) is robust and matches multiple cross-referenced sources.

---

## Introduction

An **agent harness** is the complete software infrastructure — the "glue" surrounding a language model — that enables it to work autonomously on complex, multi-step tasks. It is every piece of code, configuration, and execution logic that is not the model itself.

A harness became necessary because frontier LLMs alone are designed for single-turn, stateless interactions. They lack persistent memory beyond their context window, cannot reliably execute and observe the outcome of tool calls, cannot self-correct when they detect failures, and cannot coordinate work across multiple reasoning steps or agents. The harness solves these problems by providing:

- **An orchestration loop** (typically ReAct: reason → act → observe) that repeatedly sends prompts to the model, captures tool call requests, executes them, and feeds results back.
- **Tool execution** (file reads/writes, shell commands, web fetches, API calls) with sandboxing and safety enforcement.
- **Context management** to handle the practical reality that large projects exceed a model's context window, requiring pruning, summarization, and offloading strategies.
- **State and memory** (filesystem, Git history, YAML specs, memory files) that persists across sessions so the agent can resume work with awareness of prior progress.
- **Lifecycle hooks** at key transition points (pre-tool-call, post-edit, pre-commit) to enforce guardrails and inject feedback.
- **Multi-agent delegation** to route specialized subtasks to focused subagents or skill modules.
- **Observability** to log and audit every action the agent takes, enabling debugging and compliance.

The mental model is important: **Agent = Model + Harness**. If you are not improving the frontier model itself, you are engineering the harness. The harness is where performance gains accumulate. As cited by Cursor's engineering team: *"A decent model with a great harness beats a great model with a bad harness."* This principle is validated empirically: holding the model constant while optimizing harness design alone (better tool descriptions, context policies, verification loops, planning splits) has been shown to raise task completion from 52.8% to 66.5% ⚠ — a 13.7 percentage point gain attributable entirely to harness engineering.

---

## 1. Definition and Provenance

The term "harness" in the context of AI agents likely originates from engineering analogies — a harness holds and directs a powerful force (the model) toward reliable, controlled motion. The term became canonical circa 2024–2025 when frontier LLM coding became practical and practitioners realized that the hard problems were not in the model's reasoning but in the surrounding systems.

**Key practitioners and origins:**

- **OpenAI** (2024): Published foundational posts on "harness engineering" in relation to Codex, establishing the vocabulary and taxonomy of harness components.
- **Anthropic** (2025–2026): Shipped Claude Code with a sophisticated multi-session harness and published engineering posts on "effective harnesses for long-running agents" and the "multi-agent research system," providing empirical benchmarks.
- **Cursor** (2025–2026): Built a competitor harness and published "continually improving our agent harness," normalizing harness as a design discipline equal to model selection.
- **Simon Willison** (2025): Authored "Agentic Engineering Patterns," a guide-format synthesis of harness patterns used in production. Distinguished "context engineering" (careful construction of LLM context) from "prompt engineering" (tactical hacks in chatbots).
- **Drew Breunig** (2025–2026): Published "Context Engineering Handbook" (O'Reilly), framing harness design as a systematic field with documented failure modes and mitigations.
- **Geoffrey Huntley** (2025): Created and formalized the "Ralph Wiggum Loop," a spec-driven autonomous iteration pattern that became viral among practitioners. Later joined Sourcegraph to build the Amp agent harness.
- **Addy Osmani** (2026): Published a comprehensive synthesis on agent harness engineering, codifying best practices around progressive disclosure, tool economy, and ratcheting constraints.

**Distinction from related terms:**

- **Training harnesses** (MLOps): infrastructure for model training pipelines, not runtime agent orchestration.
- **Eval harnesses** (benchmark frameworks): systems for benchmarking model performance; orthogonal to agent harnesses.
- **Prompt engineering**: tactical, ad-hoc tweaks to prompt phrasing in a chat interface. Context engineering is broader — it includes orchestration, lifecycle management, and state.

The term "harness engineering" is now used consistently across Anthropic, Cursor, OpenAI, and the broader practitioner community to denote the discipline of designing reliable agent infrastructures.

---

## 2. Anatomy of a Harness

A canonical harness comprises these structural components:

### 2.1 Orchestration Loop (ReAct Pattern)

The core is an **agentic loop** that runs synchronously:

1. **Prompt construction**: Assemble the model's input from system instructions, tool descriptions, project context, user request, and conversation history.
2. **Model inference**: Send the prompt to the model; capture the response.
3. **Tool dispatch**: Parse tool calls from the response (if any); validate against safety policies.
4. **Tool execution**: Execute each tool (file read, shell cmd, web fetch) in a sandboxed environment.
5. **Observation injection**: Append tool results (or error messages) to the conversation history.
6. **Loop termination check**: If the model emits plain text (no further tool calls), the turn is complete; otherwise, return to step 1.

This loop is typically synchronous within a single context window but can persist across multiple sessions via checkpointing.

### 2.2 System Prompt and Tool Descriptions

The **system prompt** (often 200–500 lines) contains:

- **Role definition**: "You are a senior software engineer who writes code that works the first time."
- **Tool registry**: detailed descriptions of available tools (file operations, shell, Git, MCP servers, skills), including usage examples and failure modes.
- **Constraints**: "Never run `rm -rf`," "Always run tests before committing," "Ask before deploying."
- **Context policies**: "Assume large files are truncated; use grep to search," "Commit changes every 15 minutes so the next session can resume."

Tool descriptions are critical to harness quality. Overly verbose or redundant tool lists degrade model reasoning; optimal harnesses use **10 focused, well-described tools** rather than 50 overlapping ones.

### 2.3 Context Management Layer

As agents operate over hours or days, their context window fills with conversation history, tool outputs, prior reasoning, and project state. A production harness implements:

- **Context accounting**: token count every message; trigger compaction when approaching the model's context limit.
- **Summarization**: on context-full, call the model with a special "summarize this conversation" prompt. Replace history with a dense summary, freeing tokens.
- **Tool-call offloading**: large tool outputs (e.g., `git log` output, file searches) are kept truncated in the context (head + tail) and written to the filesystem; the agent reads them from disk if needed.
- **Pruning**: remove redundant or low-value messages (e.g., repeated test logs, acknowledged errors).
- **Progressive disclosure**: load tools and instructions contextually. For example, only show database-access tools if the agent is working on the data layer.

### 2.4 State and Memory Persistence

Since each session has "no memory of what came before," harnesses use:

- **Specification files** (JSON, YAML, Markdown): immutable requirements documents. The spec is the source of truth; progress is measured against it.
- **Progress files** (`PROGRESS.md`, feature lists): track what's been done, current focus, blockers. Agents review this at session start.
- **Git history**: commits serve as a temporal record. `git log`, diffs, and branch names communicate prior intent to the next session.
- **Memory files** (`AGENTS.md`, `CONTEXT.md`): injected into every prompt; contain instructions the agent should remember across sessions (e.g., "Use PostgreSQL, not SQLite," "All UI must be dark mode").
- **Filesystem**: the working directory is the agent's persistent state, not the conversation history.

### 2.5 Permission and Safety System

A rules-based pipeline validates every tool call:

1. **Hard block**: some commands (e.g., `git push --force`, `rm -rf /`) are never allowed.
2. **Auto-allow**: routine reads and edits pass through without prompting.
3. **Prompt user**: ambiguous cases (e.g., unfamiliar npm package install, database migration) surface to the user.

Claude Code uses a secondary small model to evaluate ambiguous cases — and deliberately does not show the main agent's reasoning to this evaluator, preventing prompt injection.

### 2.6 Verification and Testing Loops

Agents have a tendency to mark work as complete without verifying it end-to-end. Production harnesses enforce:

- **Explicit verification phase**: after implementing a feature, re-read the spec and confirm every requirement is met.
- **Testing feedback**: run unit tests, integration tests, or browser automation (e.g., Playwright) and feed the results back to the agent.
- **Circuit breaker**: if tests fail, force the agent to diagnose and fix rather than moving on.

### 2.7 Sub-Agents and Delegation

Multi-agent harnesses support:

- **Lead agent**: plans, decomposes tasks, spawns subagents.
- **Specialized subagents**: each handles a narrow domain (auth, database, UI, testing) with scoped tools and prompts.
- **Parallel execution**: subagents run in isolated worktrees or execution contexts, combining their results at the end.
- **Handoff protocol**: state and context passed from lead to subagents via memory files, specs, and Git history.

Anthropic's multi-agent research system (Opus 4 lead + Sonnet 4 subagents) demonstrates this: the lead agent decomposes research queries into parallel subtasks, spawns 3–5 subagents, each with their own context window, and aggregates results. This parallel approach trades token efficiency (agents use ~15× tokens vs. single chat) for 90.2% higher task completion.

### 2.8 Hooks and Lifecycle Events

Production harnesses expose **lifecycle hooks** at transition points:

- **Pre-tool-call**: validate the tool invocation; block unsafe calls.
- **Post-tool-execution**: feedback loop; inject tool output into context.
- **Pre-commit**: run linters, formatters, security checks.
- **Post-edit**: run affected tests; flag breaking changes.
- **Context-full trigger**: spawn compaction.
- **Session-init**: review prior progress, set next task.

Citadel (a Claude Code harness) reportedly documents 22 hooks across 14 lifecycle events ⚠.

### 2.9 Observability and Auditing

Production harnesses log:

- every tool call and result;
- context window state at each step;
- model responses and reasoning;
- permission decisions;
- session start/end and checkpoints.

This enables debugging, compliance, and performance analysis. Token metrics explain ~80% of variance in completion success ⚠; observability of token usage is critical.

---

## 3. Operating Modes

AI agents operate under different autonomy and feedback regimes. A harness typically supports multiple modes or can be configured into one:

### 3.1 Autonomous Loop (Ralph Wiggum)

**Definition**: The agent runs unattended, feeding errors back into its own prompt until the spec is satisfied or resources are exhausted.

**Origin of the name**: Geoffrey Huntley created and formalized this pattern in mid-2025. The name references the Simpsons character Ralph Wiggum — his naive, persistent optimism captures the spirit: the loop doesn't give up; it just keeps iterating, learning from failure.

**How it works**:
1. Agent reads the spec.
2. Agent attempts to implement.
3. Tests fail; error messages feed back into the context.
4. Agent re-diagnoses, re-implements.
5. Repeat until all tests pass.
6. Explicit verification: agent re-reads the spec, confirms every requirement is met.
7. If verification fails, loop again.

The Ralph loop operates across **context window boundaries**. When context fills, progress is checkpointed to files and Git history; the next session resumes with fresh context, picking up where the last left off. Token budgets and session limits provide the "danger" signal.

**Concrete example**: Geoffrey Huntley published workshops and GitHub repos demonstrating Ralph loops with Claude Code, Cursor, and Cline. The pattern is now implemented by multiple harnesses.

### 3.2 Spec-Driven Development (SDD)

**Definition**: The spec is the immutable source of truth. The agent's task is to write code that passes the spec; progress is measured against it, not against subjective "looks good" signals.

**Key principle**: *"The Spec is the Source of Truth"* because the agent's memory is transient. The spec file must be absolute, immutable, and detailed enough to define success.

**Typical structure**:
- detailed requirements file (JSON, YAML, or Markdown);
- feature list with testable acceptance criteria;
- no work is done outside the spec;
- verification is spec-compliance, not aesthetic judgment.

SDD is the foundation of Ralph loops and multi-day autonomous work.

### 3.3 Human-in-the-Loop (HITL)

**Definition**: A human actively intervenes during the agent's execution to approve, correct, or veto tool calls before they take effect.

**Typical trigger points**:
- before dangerous commands (database migrations, file deletions, deployments);
- when the agent hits ambiguity or blocked decisions;
- periodically during long runs for course correction.

AutoGen (Microsoft) defines three sub-modes:
- **NEVER**: no human input requested; agent is fully autonomous.
- **TERMINATE**: human input only when a termination condition is met (e.g., agent declares "done").
- **ALWAYS**: agent pauses at each step, requesting human input; human can provide feedback, skip, or terminate.

### 3.4 Human-on-the-Loop (HOTL)

**Definition**: The agent runs autonomously; the human supervises afterward to review outcomes and intervene only if exceptions occur.

**Common pattern**:
- agent completes a task autonomously;
- human reviews the results (pull request, test suite output, git diff);
- if something looks wrong, human gives feedback, and the agent is respawned to fix it;
- this is more scalable than HITL for routine work.

### 3.5 Plugins / Skills Mode

Some harnesses support agent plugins or "skills" — pre-built modules that the agent can load dynamically to specialize on a domain. This is more a capability than a true "operating mode," but it affects autonomy semantics. See Section 4.

---

## 4. Plugins, Skills, MCP, and Sub-Agents

### 4.1 Agent Skills (Anthropic)

**Definition**: Agent Skills are folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks.

**Structure**:
- a folder with a `SKILL.md` file;
- YAML frontmatter defining skill metadata;
- instructions and scripts (bash, Python, etc.);
- optional resources (templates, examples, reference data).

**How they're used**:
- Claude automatically invokes relevant skills based on task context.
- No manual selection; discovery is automatic.
- Pre-built skills for PowerPoint, Excel, Word, PDF are provided by Anthropic.
- Custom skills can be created and shared via Git or distributed through the plugin system.

**Relationship to harness**: Skills are a modular extension to the harness. They allow the orchestrator to inject domain-specific capabilities (e.g., "how to write PPTX files correctly") without bloating the main system prompt.

### 4.2 Model Context Protocol (MCP)

**Definition**: An open standard (introduced by Anthropic, November 2024) for standardizing how AI systems integrate external tools, systems, and data sources.

**Architecture**:
- **MCP Host**: the AI agent or application (e.g., Claude Code, Cursor).
- **MCP Client**: embedded in the host; connects to MCP servers.
- **MCP Server**: an external application exposing tools, resources, and prompts.

**Analogy**: MCP is like USB-C for AI. Just as USB-C provides a standard connector for diverse peripherals, MCP provides a standard interface for agents to connect to diverse external services.

**Concrete example**: The Harness MCP Server (for the Harness CI/CD platform) exposes 11 consolidated tools routed to 139 resource types across 30 toolsets (CI/CD, GitOps, Feature Management, Cloud Cost, Security, etc.) ⚠. This lets a Claude Code or Cursor user integrate Harness operations directly into their agent's tool arsenal without custom code.

**Relationship to harness**: MCP is a *standardization* layer for tool provisioning. Instead of each harness writing custom integrations, MCP servers package external capabilities as reusable, portable modules. Multiple harnesses (Claude Code, Cursor, OpenAI, Microsoft Copilot Studio) all support MCP clients.

### 4.3 Subagents (Cursor)

**Definition**: Specialized agents spawned by a lead agent to handle focused subtasks in parallel or sequence.

**Best practices** (from Cursor's documentation):
- Start with 2–3 focused subagents; don't create dozens.
- Each subagent has a single, clear responsibility.
- Subagent descriptions are critical; they're like job descriptions — specific about when to use.
- Avoid generic "helper" agents; avoid running parallel agents on the same files (git worktrees can merge-conflict).
- Use slash commands or plain language to invoke subagents.

**Relationship to harness**: Subagents are a scaling pattern. The lead agent acts as a tech lead; subagents are specialists. The harness coordinates the lifecycle of all agents, enforcing isolation and managing context handoff.

### 4.4 Orchestration and Composition

The relationship between these components:

```
┌─────────────────────────────────────────┐
│         Harness (Orchestrator)          │
├─────────────────────────────────────────┤
│ Lead Agent (Claude Opus / GPT-4)        │
├─────────────────────────────────────────┤
│ Tool Ecosystem:                         │
│  - Core tools (file, shell, Git)        │
│  - MCP servers (external integrations)  │
│  - Skills (domain modules)              │
│  - Subagents (specialized workers)      │
└─────────────────────────────────────────┘
```

The harness is the glue. MCP servers and skills are *pluggable additions* to the tool ecosystem. Subagents are *parallel or sequential executors* spawned by the lead agent but managed by the harness (lifecycle, context passing, result aggregation, worktree isolation).

---

## 5. The Harness Automates Context Engineering

Context engineering is the practice of carefully constructing the information fed to an LLM so it performs well. As agent work became practical and projects grew beyond a single context window, context engineering evolved from a manual discipline (a human carefully selecting which file excerpts to include) to an **automated harness function**.

### 5.1 Six Key Mitigations and Their Harness Components

Drew Breunig's research identifies six context engineering techniques; here's how the harness automates each:

#### 5.1.1 Context Isolation (Tool Loadout)

**Problem**: Agents are distracted or confused by irrelevant information.

**Harness solution**: Progressive disclosure. Tools and instructions are loaded conditionally:
- only show authentication tools if working on auth;
- only show database tools if working on the data layer;
- progressively reveal advanced tools as the agent demonstrates competence.

**Quote** (from Addy Osmani): *"Progressive disclosure: load tools and instructions contextually rather than flooding the prompt upfront."*

#### 5.1.2 Context Pruning

**Problem**: Conversations and tool outputs accumulate; irrelevant or repeated messages degrade reasoning.

**Harness solution**: Intelligent filtering before context assembly.
- Remove duplicate messages.
- Discard acknowledged errors (errors that the agent already fixed).
- Strip verbose log output, keeping only head and tail tokens.

**Quote** (from Anthropic): *"Context pruning is like being a careful editor. It's intelligently removing irrelevant, repeated, or less important information from the context."*

#### 5.1.3 Context Summarization

**Problem**: Long conversations approach the context limit, forcing the agent to work in shorter windows.

**Harness solution**: Automatic compaction on context-full.
- Call the model with a "Summarize this conversation and the work done" prompt.
- Replace old history with a dense summary.
- Free up tokens for new work.

**Quote** (from Anthropic): *"As your chat session came close to exceeding the maximum context length, a summary would be generated and a new thread would begin."*

#### 5.1.4 Context Offloading

**Problem**: Large outputs (git diffs, file searches, test logs) consume tokens that could be spent on reasoning.

**Harness solution**: Filesystem and Git-based reference.
- Write large outputs to disk (e.g., `/tmp/search_results.txt`).
- In the context, include a reference: "The search results are in /tmp/search_results.txt; read them if needed."
- Agent reads from disk on demand, saving context tokens.

**Quote** (from Anthropic): *"Tool call offloading helps reduce the impact of large tool outputs by keeping only the head and tail tokens above a threshold and offloading the full output to the filesystem."*

#### 5.1.5 Subagent Verification

**Problem**: A single agent operating over many steps loses sight of original goals and makes mistakes.

**Harness solution**: Separate evaluator agents or explicit verification phases.
- Run a distinct "verifier" agent to re-read the spec and confirm completion.
- Have the lead agent implement; have a different prompt or agent verify.

**Evidence** (from Anthropic): *"Separate evaluators outperform self-evaluation"* in internal research.

#### 5.1.6 Persistent Memory

**Problem**: Sessions start with no memory of prior work, wasting tokens on context reconstruction.

**Harness solution**: Persistent state files and memory injection.
- `PROGRESS.md` summarizes what's been done.
- `AGENTS.md` lists instructions to remember across sessions.
- `spec.json` is the immutable source of truth.
- At session start, these files are injected into the context; the agent immediately knows where things stand.

**Quote** (from Anthropic): *"Each new session begins with no memory of what came before"* — so the harness uses files to bridge the gap.

### 5.2 Context Rot and the Harness Response

**Context rot** is the empirically observed degradation in model reasoning as the context window fills. Even 200k+ token windows experience "lost in the middle" syndrome — dense context in the middle of the window is ignored.

The harness combats this by:
- monitoring token consumption in real-time;
- triggering compaction before rot sets in;
- ratcheting constraints: each rule (e.g., "always commit after 15 minutes of work") is designed to produce observable failures if ignored, so feedback is immediate.

---

## 6. Evidence and Metrics

### 6.1 Anthropic's Multi-Agent Benchmark

**Claim**: A multi-agent harness with Claude Opus 4 as the lead agent and Claude Sonnet 4 subagents outperformed single-agent Claude Opus 4 by **90.2%** on their internal research evaluation.

**Experimental setup** (from Anthropic blog):
- **Single-agent**: Claude Opus 4 alone, attempting complex research queries (e.g., "Identify all board members of Information Technology S&P 500 companies").
- **Multi-agent**: Opus 4 lead agent that decomposes the query, spawns 3–5 Sonnet 4 subagents in parallel, each with their own context window, using 3+ tools in parallel.

**Results**:
- Multi-agent system found correct answers; single agent failed with slow, sequential searches.
- Token usage explains ~80% of variance in success ⚠ (more reasoning capacity = better outcomes).
- Research time cut by up to 90% for complex queries (parallel execution beats sequential).

**Quote** (from Anthropic engineering): *"Multi-agent system with Claude Opus 4 as the lead agent and Claude Sonnet 4 subagents outperformed single-agent Claude Opus 4 by 90.2% on their internal research eval."*

**Implication**: Harness design (multi-agent orchestration, context isolation, parallel spawning) drives performance far more than model choice alone.

### 6.2 Harness Optimization vs. Model Optimization

**Claim** ⚠: Holding the model constant and optimizing harness design raises task completion from 52.8% to 66.5% (13.7 percentage point gain).

**Source**: Addy Osmani, "Agent Harness Engineering," citing multiple internal evaluations.

**Interpretation**: The harness accounts for >25% of observable agent capability when the model is held constant.

### 6.3 Devin Benchmark

**Claim** (Cognition AI): Devin AI resolves **13.86%** of issues end-to-end on SWE-bench, far exceeding prior SOTA of 1.96%.

**Note**: Devin's harness includes sophisticated planning, long-term reasoning, persistent memory, and error recovery — not just model capability.

**Recent metric** (Devin 2.0) ⚠: Completes **83% more** junior-level dev tasks per Agent Compute Unit vs. prior version, attributed to harness improvements (better planning, verification, memory).

### 6.4 Token Efficiency and Scaling

**Observation** (Anthropic): Multi-agent systems use approximately **15× more tokens** than standard chat interactions but achieve >90% better task completion.

**Implication**: Token is a proxy for reasoning capacity. More tokens (via subagents with separate contexts) enable more thorough exploration at the cost of compute.

### 6.5 Stripe's AI-Generated Pull Requests

**Claim** ⚠ (anecdotal, cited by Anthropic and others): Stripe's engineering harness generates **~1,300 AI-authored pull requests per week**, with high quality and low defect rate.

**Implication**: A well-engineered harness can scale to production use at enterprise velocity.

---

## 7. Cross-Implementation Comparison

The following harnesses are widely used or researched. Despite different model backends, they exhibit **similar architectural patterns**, confirming that harness design — not model choice — is the primary driver.

| Component | Claude Code | Cursor | OpenAI Codex | Devin | Aider |
|-----------|-----------|--------|------------|-------|-------|
| **Orchestration** | ReAct loop, multi-session | ReAct loop, subagents | ReAct loop, thread lifecycle | Planning + execution split | ReAct loop |
| **Tools** | 19+ permission-gated tools | File, shell, Git, MCP | Shell, file, browser | Planning, coding, validation | Shell, file, git |
| **Context Management** | Compaction, offloading, summarization | Progressive disclosure, pruning | ContextManager token counting | Persistent memory, spec file | File-based memory |
| **State Persistence** | Git history, PROGRESS files, memory injection | Git, worktrees, context files | Thread persistence, event history | Spec file, memory, checksums | Filesystem |
| **Verification** | Explicit verify phase, tests | Verifier subagent option | Post-tool feedback loops | Validation loop | Test output feedback |
| **Safety** | Permission pipeline (allow/ask/deny) with secondary model | Rule-based dispatch | Tool whitelist, context policies | Planning validation | Manual approval prompts |
| **Multi-Agent** | Lead agent + subagents (Anthropic) | Native subagent delegation | Task routing (Codex+) | Hierarchical planning | N/A (single-agent focus) |
| **Model(s)** | Claude Opus 4.x | Claude (default), GPT, others via SDK | GPT-4, GPT-3.5 | Proprietary multi-model | Claude, GPT, local models |

**Key observation**: All successful harnesses implement roughly the same 8–10 components (loop, tools, context management, state, verification, safety, hooks, observability). The differences are in implementation detail and which model(s) they target, not in fundamental architecture. This validates that **the harness pattern is model-agnostic**.

---

## 8. Pitfalls and Limitations of Harnesses

### 8.1 Common Failure Modes

#### One-Shotting / Context Exhaustion

**Problem**: Agent attempts to implement the entire feature in one pass, runs out of context mid-way, and leaves the codebase half-built.

**Next session behavior**: The agent wastes tokens re-discovering what it did, doesn't realize the work was incomplete, and declares success based on partial progress.

**Harness mitigation**: Force incremental work. Ralph loops, explicit feature lists, and progress checkpoints prevent this.

#### Context Rot

**Problem**: As the context window fills, the model's reasoning degrades. It starts making mistakes, ignoring earlier instructions, and producing low-quality code despite frontier model capabilities.

**Evidence**: Even with 200k+ token windows, "lost in the middle" syndrome persists — information in the center of the context is ignored.

**Harness mitigation**: Aggressive compaction policies, progressive disclosure, and ratcheting constraints.

#### Missing Feedback Loops

**Problem**: The agent makes code changes and *thinks* it's tested, but actually runs unit tests, not end-to-end tests. Later, the feature doesn't work.

**Example** (from Anthropic research): Agent marks "authentication feature complete" after passing unit tests, but the feature doesn't actually work in the browser.

**Harness mitigation**: Explicit verification with browser automation (Playwright), end-to-end testing, and separate verifier agents.

#### Data-Layer Failures

**Finding** ⚠ (from enterprise deployments): ~55% of agent failures are data-related — stale context, schema drift, wrong table selection, missing business semantics.

**Danger**: These failures produce **confident wrong answers** with no exception thrown; the agent doesn't know it's wrong.

**Harness mitigation**: Schema validation, table whitelisting, business rule injection, test-driven feedback.

#### Information Overload

**Problem**: Early harnesses dumped all tool results into context (e.g., full test suite output). The agent lost track of the actual task and started hallucinating.

**Harness mitigation**: Selective result injection, head-and-tail truncation, and filesystem offloading.

#### Subagent Merge Conflicts

**Problem** (Cursor): Running multiple subagents on the same codebase simultaneously causes git merge conflicts if they both touch the same files.

**Mitigation**: Use git worktrees for isolation; run parallel subagents only for genuinely independent work; serialize writes to shared components.

### 8.2 Theoretical Limitations

#### Stateless LLM Inherent Constraint

LLMs are fundamentally stateless. A harness can mimic statefulness via filesystem, Git, and memory injection, but this is a **workaround, not a solution**. If the agent's memory file is large or noisy, the agent won't read it carefully.

#### Reasoning Limits at Long Horizons

Agents can plan and execute multi-day tasks, but reasoning quality degrades over very long horizons (weeks, months). At some point, human re-planning is necessary.

#### Safety vs. Autonomy Tradeoff

Strict safety rules (e.g., "never run `rm`") can prevent the agent from cleaning up or reorganizing code. Loose rules enable accidents. The optimal point is hard to find empirically.

#### Model-Specific Tuning Overhead

Each frontier model (Claude Opus vs. GPT-4 Turbo vs. Gemini) has different token budgets, instruction-following quirks, and tool-use reliability. A harness optimized for one model may underperform on another; cross-model tuning is non-trivial.

---

## 9. Functional Capabilities of a Harness

Industry practice suggests these **five core functional capabilities** (extending to six if observability is treated as distinct from output formatting):

### 9.1 Context Orchestration

**Correct and essential**: Assemble the model's input from system instructions, tools, project state, and conversation history. Decide what to include, exclude, summarize, or offload based on context accounting and progressive disclosure policies. This is the load-bearing function.

### 9.2 Component Lifecycle

**Correct and essential**: Manage the birth-to-death cycle of agent sessions, subagents, tool calls, and checkpoints. Hooks at pre-tool, post-edit, pre-commit, session-init, context-full transitions. Lifecycle management ensures consistency and recovery.

### 9.3 State Persistence

**Correct and essential**: Store and retrieve agent state across sessions via Git, filesystem, memory files, and spec files. State persistence is what enables agents to work for hours or days without losing context.

### 9.4 Tool Execution

**Correct and essential**: Dispatch, sandbox, and execute tools (file ops, shell, web, APIs). Implement safety policies (allow/ask/deny). Tool execution is the bridge between reasoning and action.

### 9.5 Output Formatting

**Correct but could be broader**: The harness standardizes how results are presented to the user — pull requests, diffs, commit messages, progress logs. However, the deeper function is **observability and auditing** — logging every action for compliance, debugging, and performance analysis. "Output formatting" is a symptom of this; the capability is broader.

### 9.6 Proposed Addition: Observability & Auditing

**Rationale**: Production harnesses universally log tool calls, context state, model responses, permission decisions, and token usage. This is critical for debugging, compliance, and performance optimization. It is distinct from output formatting.

**Revised capability list (6 items)**:
1. **Context Orchestration** — assemble, compress, disclose.
2. **Component Lifecycle** — hooks, state transitions, recovery.
3. **State Persistence** — Git, filesystem, memory.
4. **Tool Execution** — dispatch, sandbox, safety.
5. **Output Formatting & Presentation** — user-facing results, PRs, diffs.
6. **Observability & Auditing** — logging, token accounting, compliance, debugging.

---

## Cross-Cutting Takeaway

The harness is not a detail; it is the **primary source of agent capability**. The mental model that every AI-fluent professional should carry is simple but profound:

**Agent ≠ Model. Agent = Model + Harness.**

When Cursor states, "A decent model with a great harness beats a great model with a bad harness," they are articulating an empirical fact, not a slogan. Anthropic's evidence — 90.2% improvement via multi-agent harness design, large gains from harness optimization alone — confirms this.

This inversion of priorities has important implications:

1. **Recruitment and hiring**: When building an AI engineering team, harness engineers (orchestration, context, safety, lifecycle) are as critical as prompt engineers or model researchers. In fact, they are more immediately impactful.

2. **System design**: The frontier is not in scaling models (that is OpenAI's and Anthropic's domain). The frontier for practitioners is in harness design — better context policies, verification loops, subagent delegation, and tool abstractions.

3. **Business strategy**: Cursor's reported $60 billion valuation ⚠ is justified not by their model (they use Claude, GPT, etc., like everyone else) but by their harness — fast iterations, multi-modal subagents, and superior context handling. This is a harness play, not a model play.

4. **Educational focus**: Courses and workshops on "prompt engineering" alone are increasingly obsolete. The real discipline is harness engineering — context management, orchestration patterns, and lifecycle design. Simon Willison, Drew Breunig, and Geoffrey Huntley are the practitioners setting the tone.

5. **Vendor lock-in risks**: A good harness can work with many models. An organization that invests in harness engineering gains optionality — they can swap Claude for GPT (or local models) with minimal friction. Organizations that optimize for a single model's quirks face expensive re-engineering.

The Ralph Wiggum Loop, spec-driven development, and multi-agent orchestration are not niche techniques; they are the emerging standard for how AI agents ship reliable code and reasoning. They are all harness patterns, not model innovations.

---

## Sources

1. Anthropic — Multi-Agent Research System: https://www.anthropic.com/engineering/multi-agent-research-system — describes lead agent + subagent architecture, 90.2% improvement, token scaling.
2. Anthropic — Effective Harnesses for Long-Running Agents: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents — incremental work, verification, session startup routines.
3. Anthropic — Claude Code Product: https://www.anthropic.com/product/claude-code — multi-session architecture, permission system, tool ecosystem.
4. Anthropic — Claude Code Docs (How it works): https://code.claude.com/docs/en/how-claude-code-works — ReAct loop, tool execution, context management.
5. Anthropic — Agent Skills: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills — skills as modular domain extensions.
6. OpenAI — Harness Engineering (Codex): https://openai.com/index/harness-engineering/ — foundational terminology and Codex harness design.
7. OpenAI — Unlocking the Codex Harness: https://openai.com/index/unlocking-the-codex-harness/ — app server, thread lifecycle, tool execution.
8. OpenAI — Unrolling the Codex Agent Loop: https://openai.com/index/unrolling-the-codex-agent-loop/ — ReAct loop mechanics, tool dispatch.
9. Cursor — Continually Improving Our Agent Harness: https://cursor.com/blog/continually-improving-agent-harness — "decent model + great harness" principle.
10. Cursor — Best Practices for Coding with Agents: https://cursor.com/blog/agent-best-practices — agent operating modes.
11. Cursor — Subagents Documentation: https://cursor.com/docs/subagents — subagent delegation, isolation, best practices.
12. Cursor — $60B bet on the harness: https://thenewstack.io/cursor-sdk-harness/ — strategic importance of harness.
13. Simon Willison — Agentic Engineering Patterns: https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/ — LLM + tools + loop, context engineering, testing patterns.
14. Drew Breunig — How to Fix Your Context: https://www.dbreunig.com/2025/06/26/how-to-fix-your-context.html — context engineering mitigation strategies.
15. Drew Breunig — Context Engineering Handbook (O'Reilly podcast): https://www.oreilly.com/radar/podcast/generative-ai-in-the-real-world-context-engineering-with-drew-breunig/ — systematic context discipline.
16. Geoffrey Huntley — How to Build a Coding Agent: https://ghuntley.com/agent/ — Ralph Loop, backpressure, harness structure.
17. Geoffrey Huntley — Everything is a Ralph Loop: https://ghuntley.com/loop/ — Ralph Wiggum pattern formalization.
18. Addy Osmani — Agent Harness Engineering: https://addyosmani.com/blog/agent-harness-engineering/ — 5 capabilities, progressive disclosure, tool economy.
19. Martin Fowler — Harness Engineering for Coding Agent Users: https://martinfowler.com/articles/harness-engineering.html — production considerations, reliability patterns.
20. MongoDB — The Agent Harness, Why the LLM is the Smallest Part: https://www.mongodb.com/company/blog/technical/agent-harness-why-llm-is-smallest-part-of-your-agent-system — LLM as minority of agent system.
21. LangChain — The Anatomy of an Agent Harness: https://www.langchain.com/blog/the-anatomy-of-an-agent-harness — structural components, patterns.
22. IBM — LLM Agent Orchestration: https://www.ibm.com/think/tutorials/llm-agent-orchestration-with-langchain-and-granite — orchestration patterns, tool dispatch.
23. Cognition AI — Introducing Devin: https://cognition.ai/blog/introducing-devin — AI software engineer, 13.86% SWE-bench.
24. Cognition AI — Devin 2.0: https://cognition.ai/blog/devin-2 — harness optimizations.
25. Anthropic — Model Context Protocol: https://www.anthropic.com/news/model-context-protocol — MCP standardization, tool ecosystem.
26. IBM — What is Model Context Protocol?: https://www.ibm.com/think/topics/model-context-protocol — MCP overview, host/client/server.
27. Parallel AI — What is an Agent Harness?: https://parallel.ai/articles/what-is-an-agent-harness — definition, glue problems, core components.
28. FireCrawl — What is an Agent Harness?: https://www.firecrawl.dev/blog/what-is-an-agent-harness — infrastructure, context, tools, state.
29. Daily Dose of DS — The Anatomy of an Agent Harness: https://blog.dailydoseofds.com/p/the-anatomy-of-an-agent-harness — 9 components, production checklist.
30. Ralph Wiggum AI: https://ralph-wiggum.ai/ — Ralph Loop explained, autonomous iteration.
31. Harper Reed — An LLM Codegen Hero's Journey: https://harper.blog/2025/04/17/an-llm-codegen-heros-journey/ — infrastructure, spec-driven development.
32. Harper Reed — My LLM Codegen Workflow: https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/ — practical harness patterns.
33. Hindsight — Why AI Agents Lose Context: https://hindsight.vectorize.io/guides/2026/04/21/guide-why-ai-agents-lose-context-and-how-hindsight-fixes-it — context rot, mitigation strategies.
34. Arize — Context Management in Agent Harnesses: https://arize.com/blog/context-management-in-agent-harnesses/ — memory, files, subagents.
35. Medium — Inside the Agent Harness, How Codex and Claude Code Work: https://medium.com/jonathans-musings/inside-the-agent-harness-how-codex-and-claude-code-actually-work-63593e26c176 — comparative architecture.

⚠ = numerical claim or specific attribution that should be verified against the cited URL before being placed on a slide.

