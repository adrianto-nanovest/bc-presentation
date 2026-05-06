# Major AI Techniques & Frameworks of 2026
## Research for Berau Coal Energy Workshop

---

## 1. Executive Summary

Five key findings for BCE employees:

- **MCP is becoming the universal translator** between Claude/AI tools and your company's existing systems (email, calendar, data). Instead of building custom integrations, MCP creates a standard "plug-and-play" protocol so AI can safely access what it needs.

- **RAG (retrieval-augmented generation) is still vital** even as models get smarter. It's the difference between an AI that hallucinates guesses and an AI that pulls facts from your actual documents—especially critical when incorrect information costs money or safety.

- **Skills (prompts + templates) package expertise once, use everywhere**—so your company doesn't repeat "how to analyze a mining safety report" in twenty different places. Claude Skills let you create reusable "playbooks" that work across chat, code, and APIs.

- **Agent orchestration = smart delegation**. Instead of one AI doing everything, multiple specialized agents handle different tasks (cost analysis, safety checks, equipment scheduling) and coordinate—faster, more reliable, less prone to drift.

- **These four fit together in layers**: Agents decide what to do → Skills tell them how → MCP lets them access tools → RAG gives them ground-truth data. Understanding which layer solves which problem is the foundation of practical AI deployment.

---

## 2. MCP (Model Context Protocol)

### Plain-Language Intro

Imagine your company has employee schedules in Google Calendar, emails in Gmail, equipment data in a spreadsheet, and maintenance records in a custom system. Right now, an AI can't access any of it safely or reliably. 

MCP is a **universal "plug-and-play" adapter**. It lets Claude or other AI tools securely connect to your business systems—calendars, email, databases, APIs—using one standard language instead of thousands of custom bridges. Think of it like USB: one standard connector instead of different cables for every device.

### Technical Detail

**How it works:**
- **Host** (Claude or your app) initiates the connection
- **MCP Server** (e.g., Gmail server, Slack server) waits to receive requests
- **JSON-RPC messages** carry requests and responses back and forth

**What MCP servers expose:**
1. **Resources**: Data and context (documents, meeting notes, employee records)
2. **Tools**: Functions the AI can call (send an email, update a spreadsheet, fetch a report)
3. **Prompts**: Templated workflows (e.g., "process a safety incident report" template)

**Security baked in:**
- Users must explicitly approve what data is shared
- Tools show what they'll do before running
- Hosts implement access controls (the AI can read mining logs but not payroll)

### 2026 Ecosystem State

**Maturation milestone:** By May 2026, MCP shifted from Anthropic experiment to industry standard:
- **97 million SDK downloads** across all languages (as of December 2025)
- **10,000+ active MCP servers** in production use
- **Governance shift**: Anthropic donated MCP to the Agentic AI Foundation (co-founded by Anthropic, Block, OpenAI) in December 2025, signaling it's now vendor-neutral infrastructure
- **Enterprise security added**: OAuth 2.1 scope consent (April 2026)—fine-grained permission controls for regulated industries
- **New UI standard**: MCP Apps (SEP-1865, early 2026) lets servers deliver interactive dashboards and forms, not just text

**Top 2026 servers in production:**
- Google Workspace: Calendar, Gmail, Drive, Sheets
- Slack, Zapier (workflow automation)
- Salesforce (CRM data)
- Custom enterprise servers (K2View for multi-source data delivery)

**Industry adoption:** MCP Dev Summit North America (April 2026, NYC) drew 1,200 attendees—proof it's moved from niche to mainstream.

### Concrete Example for Mining Workers

**Scenario:** A shift supervisor at BCE needs to check equipment availability before scheduling maintenance.

*Without MCP:*
- Manually log into three systems (equipment database, calendar, safety log)
- Copy-paste data into a spreadsheet
- Call IT if systems don't talk to each other
- Takes 45 minutes

*With MCP + Claude:*
- Tell Claude: "Show me available excavators next Tuesday, and check if anyone's certified for that model."
- Claude uses MCP to:
  - Query the equipment database → returns list of excavators + availability
  - Check the maintenance calendar → no conflicts
  - Pull the training log → shows who's certified
- Claude responds in 30 seconds: "Three excavators available. Martinez and Singh are certified."
- Supervisor approves the schedule directly in Claude's interface

**What's actually happening:**
1. Claude sends an MCP request to the Equipment Server: "List available excavators for date X"
2. Equipment Server returns: `[Excavator-47, Excavator-52, Excavator-61]`
3. Claude sends MCP request to Certification Server: "Who's trained on these models?"
4. Server returns: `[Martinez, Singh]`
5. Claude assembles the answer in plain language

The supervisor never touches three systems. The data is live, not stale. And if the equipment database is updated mid-shift, Claude sees the change automatically.

---

## 3. RAG (Retrieval-Augmented Generation)

### Plain-Language Intro

Large language models are like a smart person who's read a lot but doesn't have perfect recall. Without help, they'll confidently generate plausible-sounding answers that are completely wrong—"hallucinations."

**RAG is a fact-checker's toolkit.** Before Claude answers a question, it retrieves the actual relevant documents (mining safety procedures, equipment specs, incident reports) and grounds its response in those facts. It's the difference between "What do you think?" and "What do the actual rules say?"

### Technical Detail

**The RAG pipeline (2026 version):**

1. **Retrieval (the bottleneck)**
   - User asks a question: "What's the maximum payload for Excavator-47?"
   - System searches for relevant documents:
     - **Semantic search** (vector embeddings): finds conceptually similar content even if words don't match exactly
     - **Keyword search** (BM25): finds exact term matches ("Excavator-47" + "maximum payload")
     - **Hybrid search**: runs both in parallel, re-ranks results
     - **Cross-encoder scoring**: a specialized model re-ranks top results by relevance—the "secret sauce" of production RAG
   - Top 3–5 documents bubble to the surface

2. **Augmentation**
   - Those documents are inserted into Claude's context window
   - System prompt tells Claude: "Answer using only the provided documents. If not found, say so."

3. **Generation**
   - Claude generates an answer grounded in the actual data
   - Hallucinations drop dramatically because Claude is working from facts, not guessing

**Agentic RAG (the 2026 evolution):**
Instead of a fixed retrieval step, an autonomous agent decides:
- "Do I need to search for equipment specs?"
- "Should I pull multiple documents and synthesize them?"
- "Is the answer already in my context, or do I need a database query?"

The agent uses three tools:
- `keyword_search`: Find exact terms
- `semantic_search`: Find conceptual matches
- `chunk_read`: Deep dive into a specific document

This iterative, agent-driven retrieval handles complex questions that a simple "search → generate" pipeline would botch.

### How RAG Is Evolving (and What's Still Relevant)

**The myth:** "Long-context models make RAG obsolete."

**The reality (backed by 2026 benchmarks):**
- Gemini 1.5 Pro can handle 1 million tokens but achieves only 60% recall on multi-fact retrieval (40% miss rate)
- Cost: 1M-token request = 30–60× slower and 1,250× more expensive than a RAG pipeline
- **Winning strategy:** Use RAG to retrieve the right 10–50K tokens, then pass those to the long-context window for reasoning. Hybrid approach beats both alone.

**Graph RAG (new in 2025–2026):**
- Instead of just vector search, build a knowledge graph of relationships
- "Who reported the crack in the mine shaft?" → System traverses Incident → ReportedBy → Employee
- Excellent for multi-hop questions (Q: "Which equipment failed under Operator X in the last quarter?" A: Traverse Equipment ← FailureReport ← Operator)
- Harder to set up, but essential for complex, interconnected data

**Agentic RAG (dominant pattern in 2026):**
- AI agent decides when and what to retrieve
- Iteratively refines queries: "The first search missed some data; let me try with different keywords."
- Can combine structured queries (SQL) with vector search in one workflow

### When RAG Still Matters Most

1. **Dynamic, large datasets** (>100K tokens): Long context gets too expensive; retrieval stays cheaper
2. **Fact-sensitive domains** (mining safety, compliance, equipment specs): Hallucination cost is too high
3. **Real-time data** (today's equipment status, live shift reports): Retrieval pulls fresh data; long-context windows are static
4. **Specialized embedding models**: OpenAI text-embedding-3-large, Cohere embed-v3, Voyage AI show 40–60% retrieval quality improvements over 2023

### Concrete Example for Mining Workers

**Scenario:** A maintenance engineer needs to troubleshoot a broken drill bit on the excavator. Safety standards say the drill must meet specs, but she can't remember which spec.

*Without RAG:*
- Search company wiki manually → finds 14 pages on drilling
- Scans through maintenance logs → doesn't find this specific model
- Calls engineering, waits 20 minutes
- Gets told: "Check the OEM manual" → digs through a PDF, finds it
- Total time: 45 minutes

*With RAG + Claude:*
- Upload or link to: equipment specs database, maintenance logs, OEM manuals
- Ask Claude: "What's the spec for drill bits on Excavator-47? Did we recently replace one?"
- Claude's RAG pipeline:
  1. Searches equipment database → finds "Excavator-47, drill model XYZ-10"
  2. Searches specs → retrieves XYZ-10 manual: "Maximum hardness 62 HRC"
  3. Searches maintenance logs → finds "Replaced 2026-04-12, new hardness 64 HRC"
  4. Synthesizes: "Spec says ≤62 HRC, but the replacement bit is 64 HRC—possibly oversharpened. Recommend reverting to standard or investigating why it was spec'd higher."
- Total time: 90 seconds, with facts pulled from actual company data

---

## 4. Plugins & Skills (Reusable Units of Capability)

### Plain-Language Intro

Writing instructions (prompts) for Claude works great the first time. But if you have 50 safety officers, each training Claude the same way, you've written the same instructions 50 times. If you change the rules, you update all 50.

**Skills and Plugins** let you write the instructions *once*, package them as a reusable unit, and activate them wherever Claude is used—chat, code, APIs. Think of it as the difference between posting a memo in the office kitchen vs. storing the memo in a handbook everyone can reference.

### Technical Detail

**Claude Skills (Anthropic ecosystem):**
- **What it is:** A Markdown file (`SKILL.md`) that lives in `~/.claude/skills/` or gets loaded on demand
- **What it contains:** 
  - A role statement ("You are an expert safety auditor")
  - Detailed procedures (step-by-step how to audit a report)
  - Examples (sample good/bad audit results)
  - Format specs (how to structure your output)
  - Constraints ("Always flag missing signatures; never approve verbally")

- **Where it activates:** Claude Chat, Claude Code, Claude API (via Agents)
- **Activation:** Manual (user selects skill) or automatic (agent invokes at the right step)

**Example skill (Mine Safety Audit):**
```markdown
# SKILL: Mine Safety Audit

## Role
You are an expert BCE mine safety auditor trained on 
XYZ Mining Code and BCE Standard Operating Procedures.

## Task
Audit a daily incident report or equipment checklist against 
safety standards. Flag violations, suggest corrective actions.

## Key Rules
- Equipment must pass safety test before operation (NON-NEGOTIABLE)
- Environmental conditions: temp, humidity, ventilation must be 
  logged and within spec
- If SOP is unclear, flag as ambiguous—never assume

## Output Format
[VIOLATION or PASS], [SEVERITY: CRITICAL/MAJOR/MINOR], 
[SOP REFERENCE], [RECOMMENDED ACTION]

## Example
Input: "Excavator XYZ-10 tested at 9:00 AM, ambient temp 48°C."
SOP limit: 45°C max.
Output: [VIOLATION], [SEVERITY: MAJOR], 
[SOP 3.2.1], [Action: Cool equipment or defer to cooler shift]
```

When a safety officer uploads a report, they say "Use Mine Safety Audit skill," and Claude behaves like that expert auditor, not a generalist.

**Plugins (distribution):**
- Skills can be published as **Plugins** for discovery
- Installed from official Anthropic marketplace or community repositories
- One Plugin bundles one or more Skills + dependencies

**ChatGPT Plugins (OpenAI ecosystem, for context):**
- Earlier attempt at reusable capability; less mature than Skills
- Mostly fell out of favor by 2026 in favor of more structured approaches (Agents, Skills, MCP)

### Skills in 2026: Current State

**Official Anthropic Skills** (built by Anthropic):
- Data analysis, code review, research synthesis, etc.
- Available across Claude.ai, Claude Code, Claude API

**Community Skills Ecosystem:**
- 232+ published Claude Code skills (as of early 2026)
- Repositories like `awesome-claude-skills` catalog top ones
- Professional marketplace for enterprise skills (compliance, HR, domain-specific)

**Best practice:** Teams maintain a shared skill library:
- One "Incident Report Analyzer" skill, versioned
- 50 managers use it, all with same rigor
- Update once; every user gets the change next session

### Concrete Example for Mining Workers

**Scenario:** BCE processes daily equipment check-in reports. Quality is inconsistent—some are thorough, others are sloppy. Managers spend 2 hours daily reviewing.

*Without Skills:*
- Manager manually prompts Claude: "Check this report for completeness, look for missing ventilation data, flag if repairs are documented..."
- Claude does an okay job, but next day a different manager prompts it differently
- Inconsistent standards
- 2 hours/day manual review

*With a "Daily Equipment Check Skill":*
1. Skill author (senior engineer) writes `SKILL.md` once:
   - "Verify all fields are filled"
   - "Ventilation logged within ±2% of spec"
   - "Repairs documented with tech ID"
   - "Any anomaly triggers escalation"

2. Manager uploads daily report, says "Use Daily Equipment Check Skill"

3. Claude audits against the exact standards, returns:
   ```
   PASS — All fields complete, ventilation OK, repairs documented
   OR
   FAIL — Ventilation missing; escalate to engineering
   ```

4. Manager spends 5 minutes reviewing Claude's summary, not 2 hours reading reports

**Bonus:** Next month, safety standards change. Skill author updates `SKILL.md` once. All 50 managers automatically get the new standard on their next use.

---

## 5. Agent Orchestration

### Plain-Language Intro

A single AI agent is like a single employee doing every job: hiring, accounting, engineering, safety. It's stretched thin, makes mistakes, and gets slow under complex tasks.

**Multi-agent orchestration** is like a company with specialized departments. A **Planner** agent breaks down a big request (plan next month's mining schedule) into subtasks. **Specialist agents** handle scheduling, cost analysis, safety review, equipment maintenance. They coordinate, share findings, and the Planner synthesizes a final answer. Faster, more reliable, less prone to drift.

### Technical Detail

**Single-Agent Loop (the baseline):**
```
User Input → Claude (all-purpose) → Action/Response → Done
```
Works for simple tasks ("What's 2+2?"). Struggles with:
- Complex workflows needing different expertise
- Quality control (who checks the answer?)
- Scaling (one agent bottleneck for 100 tasks)

**Multi-Agent Patterns (2026 taxonomy):**

| Pattern | Structure | Use Case |
|---------|-----------|----------|
| **Hierarchical / Supervisor-Worker** | Manager agent orchestrates teams of specialist workers | Large orgs: planner → (cost analyst, safety officer, scheduler) each handles their domain |
| **Sequential Processing** | Agent A → Agent B → Agent C, deterministic flow | Assembly-line workflows: intake → validation → execution → delivery |
| **Feedback Loop / Self-Correction** | Agent generates draft, Reviewer agent checks, cycles until passing | Quality-critical: writer → reviewer → refinement loop |
| **Graph Orchestration** | Agents as nodes in directed graph, explicit control edges | Complex dependencies: safety check → cost check → equipment check, can run in parallel if independent |
| **Collaborative Swarm** | Agents run in parallel, vote or combine results | Consensus decisions: 3 independent safety auditors review, majority rules |
| **Task-Specialized** | Each agent handles one type of task (retrieval, reasoning, validation) | Agentic RAG: retriever agent → reasoner agent → critic agent |

### Production Patterns (2026 Data)

**Supervisor-Worker (Most Common):**
- 57% of organizations with multi-step agent workflows in production
- Example: CEO Assistant
  - **Planner**: "Is this email requiring an action or just FYI?"
  - **Responder**: "Draft a reply"
  - **Reviewer**: "Check tone, compliance, correctness"
  - **Executor**: "Send if approved, archive if FYI"

**Research Architecture (Benchmark Result):**
- Multi-agent research system (parallel sub-agents + lead planner) **outperformed single-agent Claude Opus by 90.2%** in internal evaluations
- Setup: Planner + Researcher (web search) + Analyzer (synthesize findings) + Fact-Checker (verify claims)

**Frameworks enabling multi-agent at scale (2026):**
- LangGraph (LangChain): Agent state machine; 90K+ GitHub stars
- CrewAI: Role-based agent teams; 20K+ stars, strong in Spanish-speaking markets
- Anthropic Agent SDK (released with Claude 4.6): Stateful agent loops with tool use, integrated with MCP

### When to Use Each Pattern

**Single Agent:**
- Simple, deterministic tasks ("Summarize this email")
- Cost-sensitive (one model call vs. three)
- Real-time requirements (latency critical)

**Hierarchical / Supervisor-Worker:**
- Complex, multi-domain decisions (scheduling + budgeting + safety)
- Different expertise levels needed
- Clear accountability (manager agents are responsible)

**Sequential with Feedback Loops:**
- Quality over speed (code review, compliance checks)
- Iterative refinement (draft → edit → finalize)

**Parallel / Swarm:**
- Independent subtasks that can run simultaneously
- Consensus or voting needed
- Time-sensitive (want answers fast)

### Concrete Example for Mining Workers

**Scenario:** BCE needs to plan next month's mining schedule considering equipment availability, operator certifications, equipment maintenance, safety rotation, and costs. This is too complex for one person or one AI.

*Single-agent approach (does poorly):*
- Ask Claude: "Plan next month's schedule"
- Claude tries to optimize everything at once: equipment → certifications → maintenance → safety → costs
- Result: Equipment broken down, operators overworked, safety checks missed, costs way over budget
- Back to drawing board

*Multi-agent orchestration (Supervisor-Worker pattern):*

1. **Planner Agent** receives: "Plan mining schedule for June 2026"
   - Breaks into subtasks:
     - Task 1: Equipment Availability Agent → "Which units are operational June 1–30?"
     - Task 2: Certification Agent → "Who's certified for which equipment?"
     - Task 3: Safety Agent → "What's our rotation requirement? Any restrictions?"
     - Task 4: Cost Agent → "What's the budget constraint?"
     - Task 5: Maintenance Agent → "Any planned maintenance windows?"

2. All subtask agents run in parallel (takes 2 minutes):
   - Equipment Agent: "Excavators 1–5 available. Excavator 6 needs bearing replacement June 5–12."
   - Cert Agent: "Martinez certified on 1–4. Singh certified on 1–5. Chen only on 3–5."
   - Safety Agent: "Requirement: no operator >15 days straight. Minimum 2-day rest."
   - Cost Agent: "Budget: $80K for labor + equipment."
   - Maintenance Agent: "Excavator 6 down June 5–12. Generator service June 25."

3. **Planner Agent** synthesizes:
   - Proposes: "June 1–4: Martinez on Excavators 1–4 (available, certified, within rotation). June 5–12: Excavator 6 offline (maintenance); rotate Singh and Chen onto 3–5. June 13–30: Bring back all units; stagger operators to respect safety limits."
   - Cost check: Runs at $65K (under budget)
   - Sends to **Reviewer Agent**: "Check safety compliance, cost, and operator fatigue"

4. **Reviewer Agent** returns: "APPROVED. All safety rules met. Budget OK. Recommend notifying Martinez of June 12 rest day 24 hours prior."

5. **Executor Agent** sends notifications, logs schedule, syncs calendar

**Time and quality:**
- Human planner (without AI): 8 hours, 1 constraint missed (safety rotation)
- Single Claude agent: 5 minutes, multiple mistakes (overbooked operators)
- Multi-agent orchestration: 3 minutes, fully optimized, all constraints met

---

## 6. How They Fit Together (Layered Architecture)

These four techniques operate at *different layers* of an AI system. Confusing them causes architecture failures.

```
┌────────────────────────────────────────────────────┐
│  USER REQUEST: "Plan June mining schedule"         │
└────────────────────────────────────────────────────┘
                          ↓
┌────────────────────────────────────────────────────┐
│         ORCHESTRATION LAYER (Agent)                │
│  "What are the substeps? Who should I ask?"        │
│  - Planner Agent decides: Equipment? Certif? Cost? │
│  - Spawns sub-agents                               │
└────────────────────────────────────────────────────┘
                          ↓
         ┌────────────────┬──────────────┐
         ↓                ↓              ↓
    ┌─────────────┐ ┌──────────┐ ┌──────────────┐
    │  Skills     │ │ Skills   │ │ Skills       │
    │ (Expertise) │ │(Expertise)│ │ (Expertise)  │
    └─────────────┘ └──────────┘ └──────────────┘
    "Cost Analyzer" "Safety Rules" "Scheduling Logic"
                          ↓
         ┌────────────────┴──────────────┐
         ↓                               ↓
    ┌─────────────────────┐    ┌──────────────────┐
    │  MCP LAYER          │    │   RAG LAYER      │
    │ (Connectivity)      │    │  (Knowledge)     │
    └─────────────────────┘    └──────────────────┘
    Queries equipment DB   Retrieves equipment
    Checks calendar        specs and maintenance
    Reads certification    logs
    records               Pulls safety procedures
         ↓                       ↓
    ┌─────────────────────────────────────────────┐
    │  DATA SOURCES                               │
    │  Equipment DB | Calendar | Safety Logs      │
    │  Certification | Maintenance Manuals        │
    └─────────────────────────────────────────────┘
```

**Layer breakdown:**

1. **Orchestration Layer (Agents)**
   - Decides: What's the goal? What steps?
   - Spawns parallel workers (cost agent, safety agent, etc.)
   - Synthesizes final answer
   - Tools available: other agents, skills, MCP

2. **Expertise Layer (Skills)**
   - "How do I do safety auditing correctly?"
   - "What's the cost formula?"
   - Loaded into agents on demand
   - Provides consistency (everyone uses the same rules)

3. **Connectivity Layer (MCP)**
   - Safely connects to real systems without custom code
   - Equipment database server, Calendar server, Certification server
   - Standardized protocol (JSON-RPC)
   - Security baked in (user consent, access controls)

4. **Knowledge Layer (RAG)**
   - Retrieves facts when agents need them
   - "What's the equipment spec?" → Searches manuals
   - "Any recent incidents?" → Pulls logs
   - Prevents hallucination

**A real workflow:**

*User:* "Check if we can add a night shift on June 15"

1. **Planner Agent** (Orchestration) says: "I need to check: Is equipment available? Are operators certified? Is it safe?"

2. Uses **Scheduling Feasibility Skill** (Expertise): "Here's how to check shift constraints"

3. Calls **Equipment Server via MCP** (Connectivity): "Equipment status June 15?"
   - Server responds: "Excavators 1–5 available, 6 offline"

4. Calls **Certification Server via MCP** (Connectivity): "Night-shift certified operators?"
   - Server responds: "Martinez, Singh available"

5. Uses **RAG** (Knowledge): Retrieves safety manual
   - Searches: "Night shift safety requirements"
   - Finds: "Night shifts require lighting inspection, 2-person minimum per site"

6. Uses **Safety Audit Skill** (Expertise): "Does June 15 meet safety rules?"

7. Synthesizes: "YES, can run night shift. Martinez + Singh available. Equipment ready. Lighting inspection due. Cost estimate: $X."

**Key insight:** None of these layers "compete." They work together:
- Agent decides *what* to do
- Skill decides *how* to do it
- MCP makes *tools available*
- RAG provides *facts*

---

## 7. Slide-Ready Hooks & Sound-Bites

Use these for the 120-minute animated deck:

### **MCP**
- "MCP is the universal adapter. Think USB for AI."
- "One protocol to safely access all your business systems—email, schedules, data."
- "Security first: users approve what data is shared, tools show their impact before running."
- "2026: 10,000+ MCP servers live, 97M SDK downloads, industry standard."

### **RAG**
- "RAG stops hallucinations. It's like giving Claude your safety manual before asking a question."
- "Retrieval is the bottleneck, not generation. Good RAG = fast + accurate."
- "Agentic RAG: AI decides when and what to retrieve, not just one fixed search."
- "Hybrid approach wins: RAG to find the right data, long context to reason across it."

### **Skills**
- "Write expertise once, use everywhere. No more repeating the same instructions to 50 people."
- "Skills = templates for thinking. Like a job description that Claude follows perfectly."
- "Automatic versioning: update the skill once, everyone gets the new standard."
- "Works across chat, code, APIs—one playbook, three ways to use it."

### **Agent Orchestration**
- "Specialists > generalists. A planning agent + cost agent + safety agent beats one agent doing everything."
- "Multi-agent benchmarks: 90% smarter than single agent on complex tasks."
- "Orchestration reduces mistakes. Quality-check agent catches errors before they cost money."
- "Scales: 3 agents for one job, 30 agents for a company."

### **Fitting It Together**
- "Agents ask questions. Skills teach them the right way. MCP gets the data. RAG ensures facts."
- "Prompt engineering is just the beginning. Context engineering—what goes IN the window—is the real skill."
- "These aren't trendy. They're foundational. Like learning to use a spreadsheet in 2000s."
- "Start with ONE agent + ONE skill + ONE MCP connection. Build, measure, expand."

---

## 8. Citations

### MCP & Architecture

- [Specification - Model Context Protocol (2025-11-25)](https://modelcontextprotocol.io/specification/2025-11-25)
- [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [Anthropic MCP Model Context Protocol explained 2026: 7 Powerful Shifts](https://ainetizens.com/anthropic-mcp-model-context-protocol-explained-2026/)
- [Model Context Protocol (MCP): The Complete 2026 Guide](https://sureprompts.com/blog/model-context-protocol-mcp-complete-guide-2026)
- [MCP's 2026 Roadmap: From Agent Integration Standard to Production Connectivity Layer](https://tedt.org/MCPs-2026-Roadmap/)
- [Donating the Model Context Protocol and establishing of the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
- [A Year of MCP: From Internal Experiment to Industry Standard](https://www.pento.ai/blog/a-year-of-mcp-2025-review)
- [Awesome MCP servers: Directory of the top 15 for 2026](https://www.k2view.com/blog/awesome-mcp-servers)
- [50 Most Popular MCP Servers in 2026](https://mcpmanager.ai/blog/most-popular-mcp-servers/)
- [Email MCP servers: overview, examples, and use cases](https://www.merge.dev/blog/email-mcp-server)

### RAG & Retrieval

- [Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG](https://arxiv.org/abs/2501.09136)
- [Next-Generation Agentic RAG with LangGraph (2026 Edition)](https://medium.com/@vinodkrane/next-generation-agentic-rag-with-langgraph-2026-edition-d1c4c068d2b8)
- [RAG Production Guide 2026: Retrieval-Augmented Generation](https://lushbinary.com/blog/rag-retrieval-augmented-generation-production-guide/)
- [A-RAG: Scaling Agentic Retrieval-Augmented Generation via Hierarchical Retrieval Interfaces](https://arxiv.org/abs/2602.03442)
- [Retrieval-Augmented Generation (RAG): Connecting AI to the Real World](https://blog.weskill.org/2026/04/retrieval-augmented-generation-rag.html)
- [All you need to know about RAG (in 2026)](https://aishwaryasrinivasan.substack.com/p/all-you-need-to-know-about-rag-in)
- [Is RAG Dead? Long Context, Grep, and the End of the Mandatory Vector DB](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/)
- [RAG vs Long Context: Do Vector Databases Still Matter in 2026?](https://markaicode.com/vs/rag-vs-long-context/)
- [Vector Databases vs. Graph RAG for Agent Memory: When to Use Which](https://machinelearningmastery.com/vector-databases-vs-graph-rag-for-agent-memory-when-to-use-which/)
- [Long-Context Models vs. RAG: When the 1M-Token Window Is the Wrong Tool](https://tianpan.co/blog/2026-04-09-long-context-vs-rag-production-decision-framework)

### Skills & Plugins

- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Claude Code Plugins vs Skills — What's the Difference? (2026)](https://www.agensi.io/learn/claude-code-plugins-vs-skills-explained)
- [Agent Skills - Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Top 10 Claude Code Skills, Plugins & CLIs for 2026](https://www.mejba.me/blog/top-10-claude-code-skills-plugins-clis-2026)
- [Top 10 Anthropic Claude Agent Skills for 2026](https://www.nimbleway.com/blog/anthropic-claude-agent-skills)

### Agent Orchestration & Multi-Agent Systems

- [Multi-Agent Systems & AI Orchestration Guide 2026](https://www.codebridge.tech/articles/mastering-multi-agent-orchestration-coordination-is-the-new-scale-frontier)
- [Best Multi-Agent Frameworks in 2026: LangGraph, CrewAI](https://gurusup.com/blog/best-multi-agent-frameworks-2026)
- [Agent Architecture Patterns: 2026 Taxonomy Guide](https://www.digitalapplied.com/blog/agent-architecture-patterns-taxonomy-2026)
- [The Orchestration of Multi-Agent Systems: Architectures, Protocols, and Enterprise Adoption](https://arxiv.org/html/2601.13671v1)
- [AI Agent Engineering in 2026: Architectures, Patterns, and Real-World Systems](https://blog.whoisjsonapi.com/ai-agent-engineering-in-2026-architectures-patterns-and-real-world-systems/)
- [Multi-Agent Orchestration: How to Build Agent Teams That Actually Work](https://www.mindstudio.ai/blog/multi-agent-orchestration-patterns)
- [AI Agent Orchestration for Developers: The Complete 2026 Guide](https://fungies.io/ai-agent-orchestration-developers-guide-2026/)
- [AI Agent Orchestration Patterns - Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns)
- [Guide to Multi-Agent Systems in 2026](https://botpress.com/blog/multi-agent-systems)
- [Single-agent vs. multi-agent systems: enterprise AI tradeoffs](https://www.dataiku.com/stories/blog/single-agent-vs-multi-agent-systems)
- [Towards a science of scaling agent systems: When and why agent systems work](https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/)

### How They Fit Together

- [RAG vs AI Agents vs MCP Guide (2026)](https://aiworkflowlab.dev/article/rag-vs-ai-agents-vs-mcp-architecture-decision-guide-2026)
- [RAG MCP and Agentic AI: Architecture Patterns for 2026](https://aetherlink.ai/en/blog/rag-mcp-and-agentic-ai-architecture-patterns-for-2026)
- [MCP vs RAG vs AI Agents: Understanding the Modern AI Architecture Landscape](https://medium.com/@sergey.prusov/mcp-vs-rag-vs-ai-agents-understanding-the-modern-ai-architecture-landscape-9dca4fb78daa)
- [What Is MCP? Model Context Protocol Explained for 2026](https://decodethefuture.org/en/what-is-mcp-model-context-protocol/)
- [MCP vs RAG vs AI Agents: Differences and How They Work Together](https://infranodus.com/docs/mcp-vs-rag-vs-ai-agents)
- [MCP vs. Agent Skills: Why You Need Both for AI Agents](https://www.analyticsvidhya.com/blog/2026/04/mcp-vs-agent-skills/)

### Context & Prompt Engineering Fundamentals

- [Context Engineering: The Complete Guide 2026](https://techsy.io/en/blog/context-engineering-guide)
- [AI and Prompt Engineering Trends for 2026: The Definitive Guide](https://promptbestie.com/en/ai-prompt-engineering-trends-2026-definitive-guide/)
- [Prompt Engineering Best Practices 2026](https://thomas-wiegold.com/blog/prompt-engineering-best-practices-2026/)
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

**Document prepared:** May 2026  
**Audience:** Berau Coal Energy (BCE) ~400 employees, non-AI-native  
**Workshop context:** 120-min animated HTML deck + 120-min practice lab  
**Deck framework:** Plain-language intros + technical detail + 2026 ecosystem state + concrete mining examples per technique
