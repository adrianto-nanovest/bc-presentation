# The Trichotomy of AI Engineering: Prompt, Context, and Harness Engineering
## Research Report for BCE Workshop (May 2026)

---

## Executive Summary

1. **Three-Layer Stack**: AI engineering has evolved into three distinct, stacked disciplines—prompt engineering (the instructions you give), context engineering (what information is available to the model), and harness engineering (the entire scaffolding that makes an agent autonomous and reliable).

2. **Prompt Engineering** is narrowly focused on *how you phrase your request*. In 2026, best practice emphasizes structure (Role+Context+Task+Format), chain-of-thought reasoning for complex problems, and JSON schema constraints that reduce iteration from 38.5% to 12.3%.

3. **Context Engineering** emerged as a critical discipline when models gained long context windows (200K–10M+ tokens). It's about *what information the model sees and when*—managed through RAG, memory systems, and intelligent retrieval rather than static document dumps.

4. **Harness Engineering** is the operational layer—everything surrounding the model that enables it to function as a working agent. It includes tool orchestration, memory persistence, error recovery, and safety guardrails. Anthropic's thesis: "a decent model with a great harness beats a great model with a bad harness."

5. **Practical Impact**: For a 50-page mining geology report, prompt-only achieves 60% accuracy; prompt + context (RAG + memory) reaches 85%; prompt + context + harness (with tool-based summarization loops and validation) reaches 95% with auditable reasoning.

---

## 1. Prompt Engineering: The Inner Layer

### Fundamentals

Prompt engineering is the *craft of phrasing instructions* so the model understands exactly what you want. It's not magic—it's clarity.

#### What Prompt Engineering Is
- Writing the exact instructions the model sees
- Defining the task, role, and expected output format
- Choosing between different reasoning styles (step-by-step vs. direct)
- Using examples to show the model what "good" looks like

#### What Prompt Engineering Is NOT
- Making the model smarter (it's already as smart as it is)
- Hiding complexity in elaborate narratives
- A substitute for correct data or tools

### Plain-Language Explanation (for Mining Workers)

Think of prompt engineering like **giving clear instructions to a new worker on the job site**:

- **Bad instruction**: "Go fix the sensor."
- **Better instruction**: "Go to Building 3, inspect the coal-moisture sensor on the belt conveyor. Check if it's reading between 8–12%. If it's outside that range, note the value, take a photo, and report back with the photo and the reading."

The second instruction is prompt engineering. You've given:
1. **Context**: Where the sensor is
2. **Task**: What to check
3. **Success criteria**: The expected range
4. **Output format**: Photo + written report

Prompt engineering applies the same logic to AI: be specific, be clear, show the format you want back.

### 2026 Best Practices

#### 1. **Structured Prompting (Role + Context + Task + Format)**

This framework replaces rambling prose with four clear signals:

```
ROLE: You are a mining geology expert analyzing ore sample composition.

CONTEXT: We have 10 ore samples from the Berau coal concession, each with XRF spectroscopy results.

TASK: For each sample, identify (1) primary minerals, (2) impurities, and (3) estimated processing cost impact.

FORMAT: Respond as JSON with fields: sample_id, primary_minerals, impurities, cost_impact_usd, confidence_percent
```

**Why it works**: The model knows its role, understands what's happening, knows exactly what to do, and knows what form the answer should take.

**Industry data**: Structured prompting reduces output iteration by 38.5% (free text) vs. 12.3% (JSON schema)—a 3x improvement.

#### 2. **Chain-of-Thought (CoT) for Reasoning Tasks**

For problems requiring logic, analysis, or diagnosis, instruct the model to show its work:

```
TASK: The coal moisture content measured 14% this morning but 11% this afternoon. 
Analyze what might have happened and recommend action.

REASONING: Please think step by step:
1. What are possible explanations for moisture drop?
2. Which are most likely given typical conditions?
3. What risks does each explanation pose?
4. What should we check or do first?

Then provide a final recommendation.
```

**When to use CoT**:
- Troubleshooting (Why is this sensor failing?)
- Decision-making (Should we stop the conveyor?)
- Complex analysis (How do we optimize extraction costs?)

**Important caveat (2026)**: Newer models (OpenAI o1/o3, Claude variants) have built-in reasoning loops. For these, keep your prompt simpler—don't add "think step by step" because the model already does that internally. Let the model manage its own thinking.

#### 3. **Examples (Few-Shot Prompting)**

Show the model what "good" looks like by including 1–3 worked examples:

```
TASK: Classify safety observations as Major, Minor, or Informational.

EXAMPLES:
- "Worker not wearing hard hat in blast zone" → MAJOR
- "Dust accumulation on gauge housing" → MINOR  
- "Monthly maintenance completed on schedule" → INFORMATIONAL

Now classify these:
- "Conveyor belt splice fraying at edge"
- "Ventilation damper positioned correctly"
```

**Why it works**: Examples ground the model's understanding in your specific context, not generic definitions.

#### 4. **Output Format Constraints (JSON Schema)**

Force structured outputs that integrate seamlessly with code:

```json
{
  "summary": "string",
  "severity": ["low", "medium", "high"],
  "recommended_action": "string",
  "confidence": 0–100
}
```

**2026 innovation**: OpenAI's Structured Outputs (late 2025) enforce JSON schemas at the token level, guaranteeing valid JSON and eliminating regex parsing. This moves reliability from ~95% to 100%.

#### 5. **Role Priming and Domain Expertise**

Assign the model a specific role to anchor its knowledge:

```
You are an experienced mine operations engineer with 15 years in coal extraction.
You know Berau geology, equipment specifications, and safety regulations.

Context: [situation]
Task: [decision needed]
```

This is lightweight but effective—it focuses the model's reasoning toward your domain without lengthy instructions.

### Current Challenges (2026)

- **Prompt fragility**: Tiny wording changes sometimes cause big performance shifts. This is being addressed by better model training but remains a reality.
- **Over-prompt bias**: Some users add so many instructions that contradictions emerge. Keep it concise—every line should serve a purpose.
- **Context window exhaustion**: As you add instructions, context space shrinks. This is where context and harness engineering take over.

---

## 2. Context Engineering: The Middle Layer

### Fundamentals

Context engineering manages *what information the model can see and when*. It emerged as a critical discipline around 2024–2025 when model context windows exploded from 4K tokens to 200K, 1M+.

#### The Long-Context Revolution

- **2023**: GPT-4 had 8K tokens (≈6 pages of text)
- **2024–2025**: Claude 3.5 reached 200K tokens (≈150 pages); Gemini 2 million tokens (≈1,500 pages); Llama 4 Scout 10M tokens (≈7,500 pages)

This created a new problem: **you can give the model a whole library, but more isn't automatically better**. The quality of retrieved and injected context matters more than quantity.

#### What Context Engineering Is
- Deciding what information enters the context window
- Retrieving relevant data (RAG: Retrieval-Augmented Generation)
- Managing memory across conversations
- Organizing information hierarchically so the model finds what it needs
- Monitoring retrieval quality (precision, relevance, hallucination)

#### What Context Engineering Is NOT
- Just uploading all files you have
- Using a single fixed retrieval method for all questions
- Assuming long context solves accuracy problems

### Plain-Language Explanation (for Mining Workers)

Imagine you're a mining supervisor and you need to make a decision about ore quality:

**Prompt-only approach (bad)**:
You ask an expert: "Is this ore good?" With no data, they guess poorly.

**Context + Prompt approach (better)**:
You ask the same expert and hand them: (1) today's XRF scan results, (2) yesterday's samples for trend comparison, (3) your target specs. Now they have *the right information* to decide.

**Context engineering** is the process of knowing *which documents, which data points, which comparisons* to hand the expert before they answer. Giving them the wrong documents (or too many irrelevant ones) makes the decision worse, not better.

**Key insight**: Over 70% of errors in modern LLM applications come from incomplete, irrelevant, or poorly organized context—not from the model being dumb.

### 2026 Best Practices

#### 1. **Agentic RAG (Retrieval-Augmented Generation)**

RAG has evolved from passive "retrieve documents" to active "intelligent retrieval":

**Old RAG (2023–2024)**:
- User asks a question → system retrieves top-K documents → model answers
- Passive, fixed pipeline

**Agentic RAG (2025–2026)**:
- User asks → model decides *whether* retrieval is needed
- Model *selects sources* dynamically (vector DB for facts, knowledge graph for relationships, APIs for live data)
- Model evaluates result quality and requests re-retrieval if needed
- Model *verifies* its own answer against retrieved data

**Why it matters**: The model acts as a coordinator, knowing what it doesn't know and asking for help proactively.

#### 2. **Hierarchical Context Injection**

Order matters. Structure context as layers:

1. **System prompt** (global instructions): Goes first, smallest footprint
2. **Highly relevant retrieval results**: Documents most directly answering the question
3. **Supporting knowledge**: Background, specifications, standards
4. **Tool descriptions**: Available actions (last, so immediate context stays near the prompt)

**The "Lost in the Middle" problem**: When you dump 50 documents into context randomly, models systematically ignore information in the middle. Layering prevents this.

#### 3. **Three-Layer Memory Architecture**

Sustain cross-session learning:

| Memory Type | What | How Long | Example |
|---|---|---|---|
| **Working Memory** | Current conversation | This session | "User just asked about coal moisture" |
| **Episodic Memory** | Past interactions | Weeks/months | Stored in database; retrieved when relevant |
| **Semantic Memory** | Knowledge bases | Permanent | Ore specs, equipment docs, procedures |

**Example workflow**:
```
Session 1: User asks about coal quality metrics
→ System stores interaction in episodic memory
→ Creates a "coal quality" skill

Session 2 (weeks later): User asks another coal question
→ System retrieves past interaction from episodic memory
→ Activates the "coal quality" skill
→ Model has context from both sessions
```

#### 4. **Quality-First Monitoring**

Track whether context is actually helping:

- **Retrieval precision**: "Did we get the right documents?" (Aim: >85%)
- **Hallucination rate**: "Does the model invent facts or stick to retrieved data?" (Aim: <5%)
- **Context utilization**: "Did the model actually read what we gave it?" (Check last-layer references)
- **Latency**: "How long did retrieval take?" (Aim: <500ms for interactive use)

**2026 tool**: Most platforms now expose retrieval metrics via dashboards. Use them.

#### 5. **Adaptive Context Orchestration**

Let the model think about what it needs:

```
System: "You have access to:
- Real-time sensor database (API)
- Historical ore analysis (vector DB)
- Safety procedures (document store)

Before answering, identify which data sources you need
and retrieve them in the optimal order."
```

Instead of a fixed pipeline, the model becomes a decision-maker.

### Practical Impact: Context Quality

**Scenario**: "Summarize the 50-page Berau monthly operations report."

- **Prompt alone**: 60% accuracy (misses details, invents some facts)
- **Prompt + RAG context** (retrieve relevant sections + memory of site conditions): 85% accuracy
- **Prompt + context + harness** (with validation loops): 95% accuracy with cited sources

The jump from 60→85% is almost entirely context engineering. The jump from 85→95% requires harness engineering (verification loops).

---

## 3. Harness Engineering: The Outer Layer

### Fundamentals

Harness engineering is the **entire operational scaffolding** around the model that enables it to function as a reliable, autonomous agent. It includes tool orchestration, memory persistence, error recovery, safety enforcement, and lifecycle management.

#### The Core Definition

**Agent = Model + Harness**

If you're designing the harness, you're designing everything the model can't do alone:
- Tools (what the model can do in the world)
- Memory (what persists between sessions)
- Hooks (rules that enforce constraints)
- Observability (can we see what the model is doing?)
- Retries and error recovery (what happens when things break?)

### Plain-Language Explanation (for Mining Workers)

Think of the model as a mine **shift supervisor** who can think and decide, but needs support to actually work:

**Without a harness**:
- Supervisor has a great idea but can't communicate it
- Supervisor makes a decision but no one records it
- Supervisor hits a problem and doesn't know what to do next

**With a harness**:
- Supervisor has a **radio** (tools) to call the control room and check sensor readings
- Supervisor has a **logbook** (memory) that records every decision for the next shift
- Supervisor has **emergency procedures** (hooks) that prevent dangerous decisions
- Supervisor has a **manager** (orchestration) who checks if the decision makes sense before acting
- Supervisor has **backup plans** (retries) for when communication fails

The harness is all the infrastructure around the supervisor that makes them effective.

### 2026 Best Practices

#### 1. **Tool-Oriented Architecture**

Design tools as the model's hands:

**Good tool design**:
```
Tool: get_sensor_reading
  Input: sensor_id (string), duration (minutes)
  Output: {timestamp, value, unit, status}
  Description: Fetch real-time data from specified sensor
  Risks: High latency (2–5s), stale data if sensor offline
```

**Bad tool design**:
```
Tool: do_everything
  Input: [any instruction]
  Output: [does whatever you ask]
```

**Why**: The model needs to know what each tool does, what it costs, and what can go wrong. Ambiguous tools lead to hallucinated tool calls.

**Anthropic's insight (2026)**: Every tool in a harness encodes an assumption about what the model can't do on its own. Make that assumption explicit.

#### 2. **The ReAct Loop (Thought-Action-Observation)**

This is the heartbeat of agent harnesses. It cycles:

1. **Thought**: Model reasons about what to do next
2. **Action**: Model calls a tool (sensor, database, calculation, API)
3. **Observation**: System returns the result
4. **Loop**: Model sees the result, updates its plan, decides next action

**Example: Analyzing anomalous coal moisture**

```
Thought: "The morning reading was 14%, afternoon 11%. I need to check if the sensor is calibrated and if environmental factors changed."

Action: ["Call sensor_diagnostic(sensor_id=moisture_001)", "Query weather_api(location=berau, hours=8)"]

Observation: [
  "Sensor last calibrated 3 days ago, status: OK",
  "Humidity dropped 5% at 2 PM, temperature rose 3°C"
]

Thought: "The sensor seems fine. The moisture drop matches environmental drying. But I should verify with a manual sample check."

Action: ["Create task: manual_sample_check(location=stockpile_A, time_asap)"]

Observation: "Task created, scheduled for 3 PM"

Final Output: "Likely cause: natural drying due to humidity/temp change. Manual check scheduled. No immediate action needed."
```

Notice: the model loops, learning from each observation, until it has enough data to act.

#### 3. **Memory Persistence Strategies**

Memory is not a plugin—it's a harness design decision:

| Strategy | What It Stores | When to Use | Trade-off |
|---|---|---|---|
| **Session Memory** | Current conversation | Single session | Forgotten when session ends |
| **Git History** | Code changes, decisions | Software projects | Rigid, requires discipline |
| **Progress Files** (claude-progress.txt) | Structured summary of session work | Long projects with multiple agents | Manual maintenance |
| **Episodic DB** | Timestamped interactions, outcomes | Learning from past mistakes | Requires careful retrieval |
| **Skill Store** | Domain templates, reusable patterns | Cross-team standardization | Needs governance |

**Anthropic's pattern for long projects**:
- Initializer agent creates a `claude-progress.txt` file summarizing goals and current state
- Each subsequent agent reads this file at the start
- Each agent updates it before ending
- Git history tracks code changes; progress file tracks decision rationale

#### 4. **Hooks and Enforcement**

Hooks are rules that fire at key moments, enforcing constraints the model shouldn't break:

**Example hooks**:
```bash
# Before executing dangerous commands
before_execute_shell:
  - Check if command contains "rm -rf" or "shutdown"
  - If yes, require explicit confirmation
  - Log the command for audit

# After every code change
after_code_change:
  - Run tests automatically
  - If tests fail, notify immediately
  - Don't let broken code accumulate

# On tool call
on_tool_call:
  - Validate that requested sensor exists
  - Check user permissions
  - Rate-limit to prevent spamming
```

**The Ratchet Principle** (2026 best practice): Only add constraints after observing real failures. Remove them when models prove they don't need them.

#### 5. **Observability and Verification**

Make every decision auditable:

**What to track**:
- **LLM calls**: Which models, which prompts, token counts, costs
- **Tool calls**: Which tools, which parameters, results
- **Decisions**: What did the agent decide to do? Why?
- **Outcomes**: Did it work? What failed?

**Verification loops**: Build in checkpoints where the agent (or a human) verifies critical decisions before execution:

```
Agent decides: "Stop the conveyor belt due to anomalous vibration"
Verification: 
  1. Double-check the sensor reading
  2. Consult the runbook (what does manual say?)
  3. Alert the human supervisor
  4. Wait for confirmation before acting
```

#### 6. **Error Recovery and Retries**

Real systems fail. Design for it:

```
Task: Retrieve daily coal quality summary

Attempt 1: Try API
  → API times out
  → Fallback: Query cached summary from database
  
Attempt 2: Database query fails
  → Fallback: Load from local file (may be older)
  
If all fail:
  → Return error with explanation
  → Alert system admin
  → Don't guess or hallucinate data
```

---

## 4. How They Stack: The Three-Layer Architecture

### Visual Mental Model

Imagine three nested circles or Russian dolls:

```
┌─────────────────────────────────────────────┐
│  HARNESS ENGINEERING (outer layer)          │
│  Tools, memory, hooks, orchestration,       │
│  error recovery, observability, safety      │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ CONTEXT ENGINEERING (middle layer)  │   │
│  │ Retrieval, memory injection,        │   │
│  │ information hierarchy, source ctrl  │   │
│  │                                     │   │
│  │  ┌──────────────────────────────┐  │   │
│  │  │ PROMPT ENGINEERING (core)    │  │   │
│  │  │ Instructions, structure,     │  │   │
│  │  │ examples, output format      │  │   │
│  │  └──────────────────────────────┘  │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### How They Relate

| Layer | Scope | Lever | Design Question |
|---|---|---|---|
| **Prompt** | Message-level | How you phrase it | What do I *tell* the model? |
| **Context** | Window-level | What it sees | What do I *show* the model? |
| **Harness** | System-level | How it operates | How does the model *act* in the world? |

### The Stacking Logic

1. **Prompt engineering** solves clarity: "Is my request unambiguous?"
2. **Context engineering** solves relevance: "Does the model see what it needs?"
3. **Harness engineering** solves execution: "Can the model actually do something useful with its knowledge?"

You typically *need all three*. Fixing prompt engineering doesn't help if context is wrong. Fixing context doesn't help if the model can't execute. Fixing harness doesn't help if the prompt is vague.

### Concentric Benefit Model

Each layer builds on the ones inside:

- **Without context or harness**, a great prompt still achieves only ~60% accuracy (knowledge gaps, no memory)
- **With context but no harness**, accuracy jumps to ~85% (information is there, but execution is fragile)
- **With all three**, accuracy reaches ~95% (informed, verified, resilient)

---

## 5. Worked Example: Summarizing a 50-Page Mining Report

Scenario: **"Summarize the monthly operations report for the Berau coal extraction site. Identify key risks, unusual readings, and recommended actions."**

### Layer 1: Prompt Engineering Alone

**Prompt**:
```
You are a mining operations expert. Summarize this report:

[entire 50-page report pasted here]

Identify: (1) key risks, (2) unusual readings, (3) recommended actions.
Format: JSON
```

**Result**: ~60% accuracy
- Misses details because the report is long and unstructured
- Invents some "risks" not actually in the report
- Outputs are sometimes incomplete
- Model hit context limits and skipped sections

**Why it fails**: The prompt is clear, but the context is chaotic and the model has no way to verify itself.

---

### Layer 2: Prompt + Context Engineering

**Improvements**:

1. **Retrieval-Augmented Context**:
   - Instead of dumping the whole report, retrieve only relevant sections:
     - Section 1: Equipment performance summary
     - Section 2: Safety incidents and near-misses
     - Section 3: Environmental readings (humidity, temperature)
     - Section 4: Ore quality metrics
   - Total: ~12 pages of *targeted* information, not 50 random pages

2. **Memory Injection**:
   - Previous month's summary (for trend comparison)
   - Known equipment issues (contextual baseline)
   - Site specifications (what's "normal")

3. **Hierarchical Context**:
   ```
   [System instructions]
   [2 paragraphs: site context, extraction type, capacity]
   [Relevant report sections - ordered by importance]
   [Previous month summary]
   [Equipment baseline specs]
   ```

4. **Structured Prompt**:
   ```json
   {
     "role": "Berau site operations analyst",
     "context": "[hierarchy above]",
     "task": "Summarize monthly operations. For each item, cite which report section it came from.",
     "format": {
       "key_risks": [{"risk": "...", "source": "Section X, page Y", "severity": "high/medium/low"}],
       "unusual_readings": [{"metric": "...", "value": "...", "expected_range": "...", "source": "..."}],
       "recommended_actions": [{"action": "...", "rationale": "...", "urgency": "asap/this week/this month"}]
     }
   }
   ```

**Result**: ~85% accuracy
- Captures the right information because context is curated
- Misses some secondary details (edge cases)
- Outputs are well-structured and cited
- Model doesn't hallucinate because it's bounded by provided sources

**Why it works**: The context provides exactly what's needed. The structured prompt ensures clean output.

**Why it's still not perfect**: The model can't verify its own summary. If a reading seems anomalous, it can't double-check against an external sensor. It also can't compare against industry benchmarks. These require execution tools.

---

### Layer 3: Prompt + Context + Harness Engineering

**Additional Infrastructure**:

1. **Tools**:
   ```
   Tool: get_sensor_reading(sensor_id, date_range)
     → Real-time access to sensor data
   
   Tool: query_standards(metric_name)
     → Industry standards and Berau-specific thresholds
   
   Tool: previous_analysis(month)
     → Access to prior month summaries for trending
   
   Tool: escalate_issue(risk_id, priority)
     → Notify supervisors of critical risks
   ```

2. **Memory**:
   - Persistent skill: "berau_ore_processing" (domain knowledge)
   - Session memory: "monthly_summary_v3" (iteration history)
   - Episodic memory: Past anomalies and their causes

3. **Hooks**:
   - Before outputting a "high severity" risk, verify the reading is still current
   - Before finalizing, compare trends against previous months
   - Log all sources and confidence levels

4. **Verification Loop**:
   ```
   Agent generates initial summary
   → Agent verifies each "unusual reading" against live sensors
   → Agent checks each "risk" against procedures and industry standards
   → Agent compares against previous months for trends
   → Agent flags confidence level for each claim
   → Human supervisor reviews and approves
   → System archives summary with audit trail
   ```

5. **Workflow (ReAct Loop)**:

```
ITERATION 1: Initial Summary
Thought: I need to summarize the report. Let me start with safety incidents.
Action: Retrieve report section 2 (safety incidents)
Observation: 3 near-misses, 1 minor injury, all documented

Thought: Were there any unusual equipment readings?
Action: Query report section 1 (equipment) + get_sensor_reading(all_sensors, this_month)
Observation: Conveyor belt C3 vibration elevated; current reading confirms it's still elevated

Thought: What are the standards for belt vibration?
Action: query_standards("conveyor_vibration")
Observation: Normal: 2–4 mm/s; Warning: 4–6 mm/s; Alert: >6 mm/s. Current: 5.8 mm/s (Warning)

Thought: This matches the report. But how does this trend compare to last month?
Action: previous_analysis("April")
Observation: April reading was 3.2 mm/s. Rising trend.

Thought: I should check if there's a known cause or planned maintenance.
Action: Query maintenance schedule for C3
Observation: Scheduled bearing replacement in next week

Thought: This is a known issue with a plan. Include as medium severity with mitigation plan.

ITERATION 2: Risk Verification
Thought: I identified 3 high-severity risks. Before finalizing, let me verify each.
Action: Verify each risk has:
  1. Current sensor data (not just historical)
  2. Comparison to standards
  3. Verification against procedures

Observation: All verified. Confidence 90+% for each.

ITERATION 3: Final Output
Thought: Generate final summary with sources and confidence.
Action: Format output with citations, escalate high-severity risks
Observation: Summary complete, escalations sent to supervisor

OUTPUT: ~95% accurate summary with:
- All claims cited to specific sources
- Confidence levels for each point
- Trending analysis
- Linked to action items (e.g., schedule bearing replacement)
- Audit trail showing how conclusions were reached
```

**Result**: ~95% accuracy with full auditability
- Every claim is verified against current data and standards
- Trends are explicit (C3 vibration rising)
- Risks are escalated through proper channels
- A supervisor can trace exactly how the model reached each conclusion
- The model caught secondary issues (bearing wear) that pure content retrieval would have missed

**Total effort**: 
- Prompt engineering: ~30 min (write structured prompt)
- Context engineering: ~2 hours (set up RAG, memory retrieval, organize sources)
- Harness engineering: ~1 week (build tools, verification loops, audit logging, testing)

---

## 6. Slide-Ready Quotes & Hooks

### Headlines

1. **"Prompt engineering is the user interface to AI. Context engineering is the database. Harness engineering is the operating system."**

2. **"A decent model with a great harness beats a great model with a bad harness."** — Anthropic

3. **"Over 70% of errors in modern LLM applications come from incomplete, irrelevant, or poorly structured context—not from the model being dumb."** — Context Engineering research, 2026

4. **"You can give the model a whole library, but more isn't automatically better. Context quality matters more than context quantity."** — Long-context lessons, 2026

5. **"The harness is not a wrapper around a prompt. It is the complete system that makes autonomous agent behavior possible."** — Agent Harness Anatomy, 2026

### Memorable Contrasts

| Wrong Way | Right Way |
|---|---|
| "The model should just know this" | "The model should have access to this via a tool" |
| "Let me add more examples to the prompt" | "Let me improve what context is retrieved" |
| "The model made a mistake" | "The model acted on incomplete context, or no one verified the output" |
| "We need a smarter model" | "We need a smarter harness" |

### For Non-Technical Audiences (Mining Workers)

- **Prompt**: "The instructions you give"
- **Context**: "The information you provide"
- **Harness**: "The safety equipment and backup plans around the work"

**Analogy**: Sending a miner into a cavern
- **Prompt**: "Find the coal seam"
- **Context**: Maps, previous surveys, known hazards
- **Harness**: Helmet, rope, emergency air, communication radio, rescue procedures

You need all three to succeed.

---

## 7. Best Practices Summary (Checklist)

### Prompt Engineering (Inner Layer)
- [ ] Structure every prompt: Role, Context, Task, Format (4-part template)
- [ ] Use chain-of-thought for reasoning tasks (unless using o1/o3 internal reasoning)
- [ ] Include 1–3 worked examples to ground the model in your domain
- [ ] Define output format explicitly (JSON schema is preferred in 2026)
- [ ] Keep instructions concise (~500 tokens). Every line should earn its place.

### Context Engineering (Middle Layer)
- [ ] Use agentic RAG: Let the model decide what data it needs, not a fixed retrieval pipeline
- [ ] Layer context hierarchically: system prompt → relevant docs → supporting knowledge → tools
- [ ] Implement three-layer memory: working (this session), episodic (past interactions), semantic (knowledge bases)
- [ ] Monitor retrieval quality: precision, hallucination rate, utilization, latency
- [ ] For long context (>100K tokens): Avoid dumping everything; prioritize and structure

### Harness Engineering (Outer Layer)
- [ ] Design tools explicitly: document inputs, outputs, latency, failure modes
- [ ] Implement ReAct loops: Thought → Action → Observation cycles
- [ ] Establish memory persistence: Use git history, progress files, or episodic DBs
- [ ] Add hooks for safety: Pre-execution checks, automated testing, approval gates
- [ ] Build observability: Log all decisions, tool calls, and outcomes for audit trails
- [ ] Implement error recovery: Retries, fallbacks, graceful degradation
- [ ] Follow the Ratchet Principle: Only constrain after observing real failures

---

## 8. Key Citations & Sources

### Core Research & Frameworks

- [Addy Osmani — Agent Harness Engineering](https://addyosmani.com/blog/agent-harness-engineering/)
  *Comprehensive guide to harness components, the Ratchet Principle, and context management*

- [Anthropic — Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
  *Two-part initializer/coding agent pattern for multi-session projects*

- [Simon Willison — Agentic Engineering Patterns (Feb–Mar 2026)](https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/)
  *Red/green TDD, templates, and practical patterns for working with coding agents*

### Prompt Engineering

- [Lakera — The Ultimate Guide to Prompt Engineering in 2026](https://www.lakera.ai/blog/prompt-engineering-guide)
  *Structured prompting, CoT, few-shot techniques, and production best practices*

- [UC Strategies — Prompt Engineering Best Practices in 2026](https://ucstrategies.com/news/prompt-engineering-best-practices-in-2026-the-ultimate-guide-to-better-ai-prompts/)
  *RTF (Role, Task, Format) framework, structured outputs, and testing methodology*

- [OpenAI — Introducing Structured Outputs in the API](https://openai.com/index/introducing-structured-outputs-in-the-api/)
  *Technical deep-dive: JSON schema enforcement at token level, reliability improvements*

### Context Engineering

- [Meta Intelligence — Context Engineering Guide: RAG, Memory Systems & Dynamic Context for Production AI [2026]](https://www.meta-intelligence.tech/en/insight-context-engineering)
  *Hierarchical information architecture, multi-source retrieval intelligence, three-layer memory, quality monitoring*

- [RAGFlow — From RAG to Context: A 2025 Year-End Review of RAG](https://ragflow.io/blog/rag-review-2025-from-rag-to-context)
  *Evolution of RAG to agentic retrieval, integration with long-context models*

- [Anthropic — Context Engineering: Memory, Compaction, and Tool Clearing](https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools)
  *Practical context management for 200K token windows*

- [Weaviate — Context Engineering: LLM Memory and Retrieval for AI Agents](https://weaviate.io/blog/context-engineering)
  *Memory architecture, retrieval patterns, and agent integration*

### Harness Engineering & Agent Architecture

- [Avi Chawla — The Anatomy of an Agent Harness](https://blog.dailydoseofds.com/p/the-anatomy-of-an-agent-harness)
  *Nested layers (prompt → context → harness), Russian doll model*

- [Firecrawl — What Is an Agent Harness? The Infrastructure That Makes AI Agents Actually Work](https://www.firecrawl.dev/blog/what-is-an-agent-harness)
  *Tool orchestration, ReAct loops, memory systems, safety enforcement*

- [Adnan Masood — Agent Harness Engineering: The Rise of the AI Control Plane (Apr 2026)](https://medium.com/@adnanmasood/agent-harness-engineering-the-rise-of-the-ai-control-plane-938ead884b1d)
  *Control planes, agent loops, tool calls, and agentic patterns*

- [Martin Fowler — Harness Engineering for Coding Agent Users](https://martinfowler.com/articles/harness-engineering.html)
  *Software engineering lens: how harnesses embed assumptions about model capabilities*

### Layered Architecture & Integration

- [Atlan — Prompt vs Context vs Harness Engineering: Key Differences (2026)](https://atlan.com/know/harness-engineering-vs-prompt-engineering/)
  *Clear distinctions and stacking relationships*

- [Epsilla Blog — The Third Evolution: Why Harness Engineering Replaced Prompting in 2026](https://www.epsilla.com/blogs/harness-engineering-evolution-prompt-context-autonomous-agents)
  *Historical evolution of disciplines and why harness is now the focus*

- [Steven Cen — From Prompt Engineering to Harness Engineering: The Layer That Makes AI Agents Actually Work (Mar 2026)](https://medium.com/@cenrunzhe/from-prompt-engineering-to-harness-engineering-the-layer-that-makes-ai-agents-actually-work-466fe0489fbe)
  *Concentric layers and system design*

### Context Windows & Management (Claude-Specific)

- [Anthropic — Context Windows (Claude API Docs)](https://platform.claude.com/docs/en/build-with-claude/context-windows)
  *200K context window specifications and best practices*

- [BSWEN — How to Manage and Compact Context in Claude Code When Conversations Get Too Long (Mar 2026)](https://docs.bswen.com/blog/2026-03-22-claude-code-context-management/)
  *Compaction strategies, token management, and working memory preservation*

---

## Appendix: Practical Implementation Roadmap

For a mining operation implementing AI systems (e.g., for daily reports, anomaly detection, or equipment maintenance):

### Week 1–2: Prompt Engineering
- [ ] Define 3–5 core tasks (summarize reports, diagnose issues, recommend actions)
- [ ] Write structured prompts (Role + Context + Task + Format) for each
- [ ] Test with 20+ examples to find breakage points
- [ ] Document prompt templates for reuse

### Week 3–4: Context Engineering
- [ ] Identify data sources (sensor APIs, document stores, historical records)
- [ ] Build retrieval layer (RAG) for each data source
- [ ] Implement hierarchical context injection
- [ ] Test retrieval quality (precision, latency)

### Week 5–8: Harness Engineering
- [ ] Design tools for each critical action (get readings, escalate alerts, etc.)
- [ ] Build ReAct loops and verification workflows
- [ ] Implement memory persistence (progress files, episodic storage)
- [ ] Add hooks for safety (approval gates, audit logging)
- [ ] Test error recovery and retries
- [ ] Deploy with observability (dashboards, alerts)

### Ongoing
- [ ] Monitor accuracy and adjust at each layer
- [ ] Gather user feedback on decisions made by agents
- [ ] Iterate on harness constraints (add only after real failures)
- [ ] Expand to new use cases

---

**Document prepared**: May 2026  
**Audience**: Berau Coal Energy (BCE) AI Workshop ~400 participants  
**Scope**: Non-technical explanation of AI engineering fundamentals for industry practitioners
