# AI Tools Ecosystem 2026: Claude, Google, OpenAI
## Research Document for BCE Mining Industry Workshop

**Created:** May 2026  
**Updated:** June 8, 2026 (refresh pass — see changelog below)  
**Audience:** ~400 Berau Coal Energy (BCE) employees, non-AI-native  
**Context:** 120-min animated HTML deck + 120-min practice lab (Claude-focused with Google & OpenAI coverage)

---

## 0. June 8, 2026 Refresh — What Changed Since the May Draft

> This callout records the deltas verified on June 8, 2026. Inline sections below have been updated to match; this list is the quick index.

- **Coding — the key distinction (per `2026-06-08-llm-benchmarks-june-2026.md`, Artificial Analysis Intelligence Index v4.0):** Split the claim by *model* vs *harness*. **GPT-5.5 leads the raw Code Index (59.1)** ahead of Opus 4.8 (56.7) — OpenAI has the strongest raw coding *model*. But **Opus 4.8 leads the Agentic Index (77.8)** and Reasoning (61.4) — Claude has the strongest agentic-coding *harness/ecosystem* (Claude Code). LLM-wise OpenAI wins coding; harness-wise Claude wins agentic coding.
- **Claude:** Latest flagship is now **Opus 4.8** (May 28, 2026) — supersedes Opus 4.7. Leads AA **Reasoning (61.4)** and **Agentic (77.8)**; best agentic-coding harness (Claude Code). [[Opus 4.8 release](https://www.anthropic.com/news/claude-opus-4-8)]
- **Google:** "Most generous free tier" is **no longer accurate** — Google removed free Pro-model API access in **April 2026**; consumer free tiers are now roughly equal across the big three. Google's real 2026 edge is **lowest cost at scale** (Gemini Flash ≈ $0.15/1M tokens, ~85B API calls/mo). Latest models: **Gemini 3.1 Pro / 3.5 Flash**; Gemini 2.0 retired June 1, 2026. New: **Workspace Intelligence** (Apr 2026 semantic layer). [[Gemini free-tier change](https://help.apiyi.com/en/google-gemini-api-free-tier-changes-april-2026-guide-en.html)]
- **OpenAI:** Specialization is **"jack of all trades" / generalist breadth** — broad across consumer, agents, and coding. Its one best-in-class crown is the **raw coding model: GPT-5.5 tops the AA Code Index (59.1)**. Other wins: **consumer reach** (1B monthly / 900M weekly users) and **AI web search**. Latest model: **GPT-5.5** (Apr 23, 2026); GPT-5.6/GPT-6 not released. **Sora (consumer) discontinued** Apr 26, 2026. [[Everything-Platform analysis](https://www.leoniscap.com/research/openai-building-the-everything-platform-in-ai)]
- **Slide G.1 impact:** OpenAI tagline `coding + accessibility` → `jack of all trades`; OpenAI bullet 1 → `GPT-5.5 — strongest raw coding model` (raw-model coding crown); Claude bullet 1 `Strongest coding + reasoning (CursorBench leader)` → `Top agentic coding + deepest reasoning` (Claude = agentic/harness leader, not raw model); Google bullet 3 `Most generous free tier` → `Free tier + lowest cost at scale`.

---

## 1. Executive Summary

The AI tools landscape in early 2026 has matured into a **specialized, multi-vendor ecosystem** rather than a single winner. Three major players dominate:

- **Claude (Anthropic) — reasoning + agentic + ecosystem:** Deep reasoning and agentic workflows. **Leads the AA Reasoning (61.4) and Agentic (77.8) indices** and owns the best agentic-coding *harness* (Claude Code) — though **GPT-5.5 edges it on the raw Code Index** (59.1 vs 56.7). Strong product ecosystem (Code, Design, Cowork, Skills/MCP).
- **Google (Gemini + Workspace) — integration + research:** Integrated into everyday productivity tools (Gmail, Docs, Sheets, Drive, Chat) and unified by Workspace Intelligence. NotebookLM is the standout source-grounded research product. **No longer the "most generous free tier"** (free Pro access removed April 2026); the real edge is now **lowest cost at scale** (Gemini Flash ≈ $0.15/1M).
- **OpenAI (ChatGPT + Codex + Workspace Agents) — jack of all trades:** The generalist — strong across consumer chat, web search, agents, and coding. Its standout is the **raw coding model: GPT-5.5 tops the AA Code Index (59.1)**; Claude still leads *agentic* coding (the harness). Other wins: widest consumer reach (1B monthly users) and AI web search.

**Key Finding:** No single tool dominates all use cases. The optimal strategy is **use-case-driven tool selection** combined with **cross-tool workflows** (e.g., Claude for code + Google NotebookLM for research + Workspace Gemini for writing).

**For BCE employees:** Start with Claude (committee provides accounts) for hands-on practice. Google Workspace AI is already integrated into your email/docs/sheets. OpenAI is optional for comparison.

---

## 2. Claude Capabilities Deep Dive

### 2.1 Claude Models (Opus 4.8, Sonnet 4.6, Haiku 4.5)

**Claude Opus 4.8** (Latest, May 28, 2026)
- **Best for:** Complex reasoning, long-horizon agentic coding, high-autonomy work
- **Context:** 1M tokens
- **Pricing:** $5/input, $25/output (per million tokens)
- **Standout:** Leads the AA Reasoning (61.4) and Agentic (77.8) indices (GPT-5.5 leads the raw Code Index, 59.1); ~4x less likely to let code flaws pass unremarked vs Opus 4.7
- **When to use:** The hardest reasoning + multi-step agentic coding tasks
- **Simple example:** "Audit this 12-file service for race conditions, propose fixes, and write regression tests."

**Claude Opus 4.7** (Previous flagship, Jan 2026)
- **Best for:** Complex reasoning, agentic coding, design handoffs
- **Context:** 1M tokens (~555k words), 128k max output
- **Pricing:** $5/input, $25/output (per million tokens)
- **Standout:** 3x vision resolution improvement, self-verification layer, xhigh effort level
- **When to use:** Mission-critical tasks (e.g., architectural decisions, multi-step code generation)
- **Simple example:** "Redesign this database schema for a mining operation to scale from 1K to 100K daily records. Show me the ERD, migration strategy, and validation tests."

**Claude Sonnet 4.6** (Released February 17, 2026)
- **Best for:** Daily development work, most professional users
- **Performance:** 99% of Opus 4.6 coding ability (79.6% vs 80.8% SWE-bench) at 40% lower cost
- **Speed:** 2x faster than Opus
- **Pricing:** $3/input, $15/output (per million tokens)
- **When to use:** General-purpose development, document analysis, creative writing
- **Simple example:** "Write a Python script to parse CSV mining logs and flag anomalies in equipment temperature readings."

**Claude Haiku 4.5** (Latest small model)
- **Best for:** High-volume, low-complexity tasks; real-time applications
- **Context:** 200k tokens (~150k words)
- **Pricing:** $1/input, $5/output (per million tokens)
- **Speed:** Processes simple tasks in milliseconds
- **When to use:** Batch processing, API integrations, high-frequency queries
- **Simple example:** "Classify 10,000 safety incident reports as critical/medium/low priority based on keywords."

**Model Selection Rule:** Sonnet 4.6 is the "daily driver"; use Opus 4.8 for truly hard problems; Haiku 4.5 for volume and cost.

---

### 2.2 Claude.ai Chat & Live Artifacts

**Claude.ai Chat Interface**
- Full conversational AI with all Claude models (Opus 4.7, Sonnet 4.6, Haiku 4.5)
- Multi-turn conversations with context memory
- File upload for document analysis, code review, data exploration
- Web search integration (browse current info real-time)
- Conversation history and organization

**Live Artifacts (NEW, April 2026)**
- Interactive components rendered in a side panel (no context-switching)
- Types: code snippets, dashboards, trackers, web pages, interactive tools
- **Key innovation:** Data refresh on every opening (e.g., KPI dashboard always shows latest Slack metrics)
- Use cases: Real-time dashboards, project trackers, comparison tools, status boards
- **When to use:** Anything that needs to stay fresh without manual updates

**Artifacts Connectors (via MCP)**
Default integrations: Asana, Linear, Slack, Google Calendar, Gmail, Notion, Salesforce, HubSpot, Stripe, Jira, Google Drive.

**Simple example:** "Create a live artifact that shows my Asana project's open tasks, due date, and assignee. Update it whenever I open it."

---

### 2.3 Claude Code (Desktop + CLI)

**Desktop App Redesign (April 14, 2026)**
- From-scratch rebuild for parallel agent workflows (not sequential)
- Multi-pane interface: chat, diff, preview, terminal, file editor, plan, tasks, subagent
- Customizable layout (tile panes as needed)
- Built-in terminal for running tests/builds
- Fast diff viewer optimized for large changesets
- Desktop: macOS and Windows (Linux CLI still available)

**Claude Code CLI (Terminal-native)**
- Universal across Linux, macOS, Windows
- Fully compatible with plugins and workspace settings
- Used by developers who prefer terminal workflows

**Routines (NEW, research preview, April 2026)**
- Scheduled or triggered cloud automation that runs on Anthropic infrastructure
- Packages: prompt + repo(s) + connectors
- **Trigger types:**
  - Scheduled: hourly, nightly, weekly, or at specific times
  - GitHub: auto-run on PR/release/issue events
  - API: trigger via HTTP POST with bearer token
- **Daily limits:** 5 (Pro), 15 (Max), 25 (Team/Enterprise)
- **Simple example:** "Every night at 9pm, scan new issues in GitHub, auto-label by area of code, assign owners based on codebase refs, post summary to Slack."

**When to use Claude Code:**
- Local development (desktop app) vs. lightweight tasks (CLI)
- Routines for repetitive, scheduled work that shouldn't depend on you being awake

---

### 2.4 Claude Cowork (Workspace Collaboration)

**General Availability: April 9, 2026**
- Autonomous task execution for knowledge work (not just code)
- Designed for non-engineers: operations, marketing, finance, legal

**Key capabilities:**
- **File & data:** Rename/organize files, extract data from receipts into spreadsheets, propose folder structure
- **Reports:** Create branded documents using templates, synthesize scattered notes into drafts, run reports on schedule (daily/weekly/monthly)
- **Cross-platform:** Integrates with desktop apps, mobile pairing, Slack, Chrome
- **Live Artifacts:** Dashboards that auto-refresh from connected tools
- **Real-time progress:** Watch Claude work, approve actions before they execute

**Enterprise features:**
- Role-based access control (RBAC)
- Audit logs for compliance
- Event emission for tool calls, file access, skill usage

**When to use:** Anything that feels like "work I could delegate to an assistant if I had one." Not just code.

**Simple example:** "Every Friday, pull all timesheet data from our HR system, create a summary report by department, and email leadership. Flag any anomalies."

---

### 2.5 Claude Design (Prototype-to-Production)

**Launch: April 17, 2026** (Anthropic Labs)
- Powered by Claude Opus 4.7
- Web-based (no download needed)

**Workflow:**
1. **Design system learning:** Claude reads your codebase + Figma files → extracts colors, typography, components
2. **Prototype creation:** Describe a design in plain language → Claude generates HTML/CSS/React
3. **Design intent bundle:** Package as implementation bundle (components, design tokens, copy, interaction notes)
4. **Handoff to Claude Code:** Pass bundle to Claude Code → produces production code in your framework

**Differentiators vs. Lovable/v0:**
- Extracts design system from GitHub repo (not just Figma imports)
- Applies your system automatically to all future projects
- Seamless handoff to production via Claude Code

**When to use:** Moving from design concept to coded prototype to production, with design consistency baked in.

**Simple example:** "Design a dashboard for real-time mining equipment monitoring. Use our brand colors (from codebase), components (from Figma), and generate React code I can deploy."

---

### 2.6 Claude Skills & Model Context Protocol (MCP)

**MCP (Model Context Protocol)**
- Standard for connecting Claude to external tools, databases, APIs
- Provides **data connectivity** (read from Jira, GitHub, Slack, etc.)
- Shipped January 2026: MCP Apps allow servers to return interactive UI (dashboards, forms) directly in chat

**Claude Skills**
- Procedural knowledge (instructions + scripts) for how to use MCP connections effectively
- Lightweight: 30-50 tokens per skill, loaded only when needed
- Orchestrate multiple MCP servers; single MCP server supports dozens of skills

**How they work together:**
- MCP = connectivity, Skills = knowledge about how to use that connectivity
- Example: MCP connects to Salesforce API, Skill teaches Claude CRM best practices

**Real-world example (Prismatic, May 2026):**
- Prismatic Skills for Claude Code: open-source plugin enabling faster integration shipping
- Works with Prism MCP dev server (connects Claude to Prismatic environment)

**When to use:** When you need Claude to reliably interact with your company's internal tools (Jira, Salesforce, Slack, databases).

---

### 2.7 Claude API Advanced Features

**Prompt Caching**
- Cache frequently-used system prompts, document context, or long reference material
- **2026 update (Feb 5):** Workspace-level isolation (not org-level), ensuring data separation
- **Cost impact:** TTL changed from 60 min to 5 min in early 2026 (reduced cache hit rates), but 1-hour option now available
- Reduces input token costs by 60-90% on typical production workloads
- **When to use:** Processing many queries against the same large document; multi-turn workflows with consistent system instructions

**Extended Thinking (Opus 4.6+ & Sonnet 4.6)**
- Claude thinks through complex problems before responding
- Trade-off: slower, but much more accurate on reasoning tasks
- **When to use:** Math, logic puzzles, debugging, strategic planning

**Adaptive Thinking (Opus 4.7 only)**
- New feature: Claude decides whether to use thinking automatically based on task difficulty
- No speed penalty if thinking not needed

**Computer Use Tool**
- Claude can control a computer (click buttons, read screen, type text)
- Enables automation of legacy systems, visual UI testing, screenshot analysis
- **When to use:** Automating workflows in tools that don't have APIs (e.g., old enterprise software)

**Vision Processing (All models)**
- Analyze images, charts, diagrams, screenshots
- Pricing: ~$0.01 per image (varies by size)

**Tool Use (Built-in)**
- Claude can call functions/APIs you define
- Structured output for programmatic workflows
- **When to use:** Building agents that need to interact with backend systems

---

## 3. Google Capabilities Deep Dive

### 3.1 Google Gemini Models & Availability

**Gemini Lineup (June 2026)**
- **Gemini 3.1 Pro:** Most capable reasoning model
- **Gemini 3.5 Flash:** Newest fast tier — the volume/cost leader (~$0.15/1M tokens)
- **Gemini 3.1 Flash / Flash-Lite:** Fast, cost-effective alternatives
- **Retired:** Gemini 2.0 support ended June 1, 2026
- **Integration:** Embedded in ALL Workspace apps (Gmail, Docs, Sheets, Slides, Drive, Meet, Chat), unified by **Workspace Intelligence** (semantic layer, April 2026)

**Pricing & Access**
- **Gemini in Workspace:** Included in Business Standard+, Enterprise plans at no additional cost (since Jan 2025)
- **Business Starter:** Limited daily prompts
- **Free tier (Gemini.google.com):** Limited consumer access; **free Pro-model API access was removed April 2026** — only Flash models retain an API free tier
- **Gemini Pro subscription:** $19.99/month (access to Gemini Advanced, ability to create Gems)
- **⚠️ "Most generous free tier" no longer holds (June 2026):** consumer free tiers are now roughly equal across Claude/ChatGPT/Gemini. Google's pricing edge is **lowest cost at scale** (Gemini 3.5 Flash ≈ $0.15/1M), not a more generous free tier.

---

### 3.2 Gemini in Google Workspace (Embedded AI)

**Google Docs (Writing)**
- Contextual writing assistant: generate content in your preferred style
- Refine, shorten, expand text
- **When to use:** Any document writing (reports, memos, proposals)

**Google Sheets (Data & Formulas)**
- Formula generation from plain English: "Calculate revenue growth quarter-over-quarter"
- Full pivot tables and charts from natural language queries
- Data analysis without manual formula entry
- **When to use:** Financial analysis, data summarization, trend spotting

**Google Slides (Presentations)**
- Full deck generation from outline
- Imagen 3 custom image generation (beta, March 2026)
- **When to use:** Rapid presentation creation

**Gmail (Communication)**
- Smart replies (suggest responses based on email)
- Thread summaries (digest long conversations)
- **When to use:** High-volume email management

**Google Meet (Video Calls)**
- Real-time transcript summarization
- Action item extraction
- **When to use:** Meeting notes without manual transcription

**Workspace Intelligence (NEW, March 2026)**
- New AI layer understanding organizational context across apps
- Example: Gemini in Docs knows about your previous Sheets analysis, can reference it automatically
- Enables more personalized automation

**When to use:** Anything in Google Workspace becomes AI-enhanced; no separate login needed.

**Simple example:** "In Docs, write an executive summary of our Q1 mining safety incidents. I'll paste the Sheets data here."

---

### 3.3 NotebookLM (Research & Analysis Focused)

**What it is:** Google's specialized research assistant, powered by Gemini. Designed for **source-grounded research** (cites your documents, not internet).

**Core workflow:**
1. Upload sources (PDFs, Google Docs, links, research papers)
2. Ask NotebookLM questions → get answers citing your sources (no hallucinations)
3. Generate deep-dive content in multiple formats

**Key features:**

**Audio Overview**
- AI hosts have an in-depth podcast-style discussion of your sources
- 80+ languages supported
- Interactive mode: join the conversation with hosts to steer discussion
- Generates in ~2 minutes

**Video Overview** (NEW in 2026)
- Visual alternative to Audio: narrated slides with visuals from your documents
- Customizable:
  - Format: Explainer (comprehensive) or Brief (condensed)
  - Visual style: Whiteboard, Watercolor, Kawaii, Heritage, Paper-craft, Anime, Retro Print
  - Language: 80+
  - Steering prompt: guide AI toward specific topics
- Generation time: 30+ minutes
- **Cinematic Video Overview** (ultra-premium): animated films using Gemini 3 + Veo 3 (requires Google AI Ultra subscription)

**Notebooks in Gemini** (NEW, April 2026)
- Seamless sync between NotebookLM notebooks and Gemini app
- Use Gemini to gather web research, save to notebook, instantly access NotebookLM's advanced features
- Bidirectional sync

**Content Limits by Plan (Free → Pro)**
- Free: 50 sources per notebook
- Gemini Plus: 100 sources
- Gemini Pro: 300 sources
- Gemini Ultra: 600 sources

**When to use NotebookLM:**
- Analyzing proprietary documents (mining reports, internal data, research papers)
- Generating executive summaries without manual reading
- Creating training materials from source documents
- Team research projects where citation/traceability is critical

**Simple example:** "Upload 5 mining safety incident reports. Generate an Audio Overview explaining trends, then create a video summary for training."

---

### 3.4 Google Gems (Custom AI Assistants)

**What it is:** Personalized Gemini instances with custom instructions and knowledge bases.

**How to use:**
1. Define detailed instructions (role, expertise, tone, constraints)
2. Optional: Add custom knowledge or files
3. Reuse in conversations, share with team

**Gallery:**
- 10,000+ public Gems (as of March 2026)
- Categories: productivity, creativity, education, business

**Advanced features:**
- Connect to external apps (e.g., Gems that adjust output based on step count, weather)
- Persistent behavior across conversations

**Requirements:** Gemini Advanced subscription ($19.99/month)

**When to use:**
- Repeatable tasks with consistent requirements (research brief writer, code reviewer)
- Team workflows where multiple people need the same assistant behavior
- Custom expertise compilation

**Simple example:** "Create a Gem called 'Mining Safety Expert' that knows our safety protocols and always flags high-risk scenarios in incident reports."

---

### 3.5 Stitch (Design-to-Code)

**What it is:** Google Labs AI-native design tool (visual UI design → production React/Next.js code).

**Workflow:**
1. Design visually: drag components, set layouts, define responsive breakpoints
2. Export to production-quality React or Next.js
3. Integrate with AI Studio or Antigravity for further iteration

**When to use:** Non-engineers designing interfaces, design teams wanting direct code export

---

### 3.6 Google AI Studio

**What it is:** Browser-based playground for experimenting with Gemini models.

**Access:** Free tier available, latest models (Gemini 3 Pro, 3 Flash)

**Key features:**
- **Build:** Describe an app in natural language → get working React + Tailwind code
- **Preview:** Live iteration
- **Export:** Deploy to Google Cloud Run or export code

**When to use:** Quick prototyping, learning Gemini capabilities, AI model experimentation

**Simple example:** "Build a real-time equipment monitoring dashboard for mining operations. Give me React code."

---

### 3.7 Google Antigravity (Claude Code Competitor)

**What it is:** Full-featured IDE (VS Code base) with embedded Gemini 3.1 Pro and browser subagent.

**Architecture:**
- Unified environment (no context-switching vs CLI tools)
- VS Code foundation (familiar UI)
- Mission Control for agent orchestration
- AGENTS.md support for multi-agent workflows

**Performance:**
- Princeton's CORE-Bench Hard: Antigravity 40% vs Claude Code 77.78%
- Claude Code significantly outperforms on coding benchmarks

**Pricing:**
- Free tier: Generous but rate limits have tightened in early 2026
- Free tier users report hitting limits in 2-3 hours of intensive use
- Opaque rate limiting (unpredictable costs)

**Enterprise:**
- Listed but not yet available (as of May 2026)
- No security certifications documented

**When to use:** If you prefer unified visual IDE + want to try Gemini, but be aware coding performance lags Claude significantly.

---

## 4. OpenAI Brief

### 4.1 ChatGPT & Models

**Latest Models (June 2026)**
- **GPT-5.5:** Current flagship (released April 23, 2026) — strong at coding, agents, computer use
- **GPT-5.5 Pro:** Premium variant
- **GPT-5.4 Thinking:** Previous-gen reasoning model with explicit "thinking" before response
- **GPT-5.x Codex:** Agentic coding model line
- _Note:_ GPT-5.6 / GPT-6 are **not released** (rumor only). **Sora (consumer app) was discontinued** April 26, 2026 — do not cite as a current capability.

**Positioning (June 2026):** OpenAI is the **"jack of all trades"** — capable across consumer chat, web search, agents, and coding. Its one clear best-in-class crown is the **raw coding model**: GPT-5.5 tops the AA Coding Index (59.1), ahead of Opus 4.8 (56.7). But Claude leads the **Agentic** index (77.8) and reasoning — so OpenAI wins the *model*, Claude wins the *agentic harness*. Other moats: **consumer distribution** (1B monthly / 900M weekly users) and AI-native web search.

**Key features:**
- **Web browsing:** Real-time internet search with cited answers
- **Shopping:** Visual product search, comparison
- **Interactive learning:** Visual modules for 70+ math/science topics
- **Advanced security:** Passkeys and security keys for enhanced sign-in
- **Vision:** Image analysis, screenshot understanding

**When to use:** General-purpose assistant with web search + web shopping integration; well-documented ecosystem.

---

### 4.2 Workspace Agents (Replaces Custom GPTs)

**Launch:** April 2026 (research preview), free until May 6, 2026, then credit-based pricing

**What it is:** Evolution of GPTs—continuously running cloud agents for enterprise workflows.

**Key capabilities:**
- Auto-triggered (schedule, GitHub events, third-party webhooks)
- Run in cloud even when you're offline
- Integration: Slack, Salesforce, Google Workspace, third-party apps
- Built-in monitoring and audit logs

**Enterprise controls:**
- RBAC for agents
- Sensitive data protection
- Controlled tool access per user group

**When to use:** Team automation workflows, recurring business processes

**vs. Claude Cowork:**
- OpenAI: Cloud agents with heavy third-party app focus
- Claude: Broader autonomous task execution (file management, report generation, knowledge work)

---

### 4.3 OpenAI API & Codex

**API headline features:**
- Vision processing
- Tool use (function calling)
- Structured output
- Batch processing

**Codex:**
- Specialized coding model
- Integrated into Workspace Agents

---

## 5. Capability Matrix

| **Use Case** | **Claude (Best Fit)** | **Google (Best Fit)** | **OpenAI (Best Fit)** |
|---|---|---|---|
| **Chat Q&A** | Sonnet 4.6 (fast, accurate) | Gemini 3.1 Pro (web search) | GPT-5.5 (web search, ecosystem) |
| **Document analysis** | Opus 4.7 (vision 3x, reasoning) | NotebookLM (source-grounded) | GPT-5.4 Thinking |
| **Code generation** | Claude Code (best agentic-coding *harness*) | Antigravity (IDE) | **GPT-5.5 / Codex** (best raw coding *model* — AA Code Index 59.1) |
| **Prototype/Design** | Claude Design (design system extraction) | Stitch (visual design) + AI Studio (build) | No equivalent |
| **Agentic workflow** | Claude Cowork (autonomous task) | Workspace Intelligence (multi-app) | Workspace Agents (cloud, scheduled) |
| **Research** | Live Artifacts (data refresh) | NotebookLM (source citation) | ChatGPT (web search, broad) |
| **Data viz / Dashboard** | Live Artifacts (auto-refresh) | Sheets + Gemini (formula gen) | ChatGPT (web search) |
| **Scheduling** | Claude Routines (cron-like) | Workspace Intelligence | Workspace Agents |
| **Writing** | Claude.ai (natural prose) | Docs + Gemini (contextual) | ChatGPT (web search) |
| **Spreadsheet automation** | N/A | Sheets + Gemini (formula, pivots) | ChatGPT (web search) |

---

## 6. When-to-Use-Which Decision Rules

### Start here: What's your primary constraint?

**"I need it to be accurate and not hallucinate."**
→ **NotebookLM** (source-grounded research) OR **Claude Opus 4.7** (strongest reasoning)

**"I need to move fast and iterate."**
→ **Claude Sonnet 4.6** (40% cheaper than Opus, 99% coding ability) OR **ChatGPT with web search** (fastest public iteration)

**"I need to build something that runs automatically on a schedule."**
→ **Claude Routines** (repo + connectors + cron trigger) OR **Workspace Agents** (scheduled cloud agents)

**"I need design-to-code workflow."**
→ **Claude Design** → **Claude Code** (integrated handoff) OR **Stitch** → **AI Studio** (Google alternative)

**"I need to analyze internal documents without internet."**
→ **NotebookLM** (proprietary content, no web search needed) OR **Claude.ai with file upload** (Artifacts for dashboards)

**"I'm already in Google Workspace (email, docs, sheets)."**
→ **Gemini in Workspace** (zero context-switch, embedded) + **NotebookLM** (for research)

**"I need an IDE experience, not CLI."**
→ **Claude Code desktop** (Mac/Windows, multi-pane) OR **Antigravity** (VS Code base, but slower coding)

**"I need custom AI assistants I can reuse."**
→ **Claude Skills** (lightweight, attached to Claude Code/Cowork) OR **Google Gems** (reusable custom Gemini + instructions)

**"I need real-time data dashboards."**
→ **Claude Live Artifacts** (auto-refresh on every open) + **Asana/Slack/Jira connectors**

---

## 7. Slide-Ready Hooks

### For the opening (set context):
- **"Three vendors. Specialization over single winners. Your job isn't to pick one; it's to pick the right tool for each task."**
- **"Claude excels at thinking hard. Google excels at integrating everywhere. OpenAI is the versatile generalist — a jack of all trades with the widest reach."**

### For each tool intro:

**Claude:**
- _"Think of Claude as a co-developer who can reason through hard problems and write production code without your help."_
- _"Live Artifacts mean your dashboard updates itself every time you look at it—no manual refresh needed."_

**Google:**
- _"Gemini isn't a separate app—it's baked into the tools you already use. Gmail, Docs, Sheets, all AI-native now."_
- _"NotebookLM: upload your mining safety reports, get a podcast-style summary in 2 minutes. No hallucinations—it cites your docs."_

**OpenAI:**
- _"ChatGPT is the everyman tool — it does a bit of everything: web search, agents, coding, images. Its GPT-5.5 model now tops raw coding benchmarks, and it's the one most people already have open."_
- _"ChatGPT's web search means you're not limited to old training data. Ask about today's news, today's stock prices, today's mining regulations."_

### For decision-making:
- **"Need accuracy? NotebookLM. Need speed? Sonnet 4.6. Need automation? Routines. Need design? Claude Design."**
- **"You're probably already using Google Workspace. Gemini is free. Just click the sparkle icon."**

### For the practice lab:
- **"We've given you Claude accounts. First 30 min: chat + code. Last 30 min: try Live Artifacts to build a real dashboard."**
- **"Bonus: Switch to Google Sheets and use Gemini to write a formula that would take you 10 minutes to code by hand."**

---

## 8. Citations & Sources

### Claude Models & API
- [Claude Models Overview - Anthropic API Docs](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Models overview - Claude API Docs](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Claude Opus 4.6 vs Sonnet 4.6 vs Haiku 4.5 [2026 Tested]](https://tech-insider.org/claude-opus-vs-sonnet-vs-haiku-2026/)
- [Prompt caching - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [Building with extended thinking - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)

### Claude.ai & Artifacts
- [Claude Live Artifacts: Persistent AI Workspace Guide (2026)](https://www.eigent.ai/blog/claude-live-artifacts-guide)
- [Claude Artifacts: What They Are and How to Use Them (2026)](https://albato.com/blog/publications/how-to-use-claude-artifacts-guide)
- [What are artifacts and how do I use them? | Claude Help Center](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them)

### Claude Code
- [Use Claude Code Desktop - Claude Code Docs](https://code.claude.com/docs/en/desktop)
- [Claude Code Desktop Redesign 2026: Parallel Sessions Review](https://devtoolpicks.com/blog/claude-code-desktop-redesign-parallel-sessions-2026)
- [Redesigning Claude Code on desktop for parallel agents | Claude](https://claude.com/blog/claude-code-desktop-redesign)
- [Automate work with routines - Claude Code Docs](https://code.claude.com/docs/en/routines)
- [Introducing routines in Claude Code | Claude](https://claude.com/blog/introducing-routines-in-claude-code)

### Claude Cowork
- [Cowork: Claude Code power for knowledge work | Claude by Anthropic](https://claude.com/product/cowork)
- [Claude Cowork: Your AI Desktop Assistant](https://coworkerai.io/)

### Claude Design
- [Introducing Claude Design by Anthropic Labs](https://www.anthropic.com/news/claude-design-anthropic-labs)
- [From Prompt to Production: A Designer's Step-by-Step Workflow with Claude Design + Claude Code](https://www.designsystemscollective.com/from-prompt-to-production-a-designers-step-by-step-workflow-with-claude-design-claude-code-a7705daad026)
- [Claude Design (Anthropic): The Complete 2026 Guide](https://agence-scroll.com/en/blog/claude-design-anthropic-2026-guide)

### Claude Skills & MCP
- [Introduction to Model Context Protocol](https://anthropic.skilljar.com/introduction-to-model-context-protocol)
- [Extending Claude's capabilities with skills and MCP | Claude](https://claude.com/blog/extending-claude-capabilities-with-skills-mcp-servers)
- [Claude Skills vs MCP: A Technical Comparison for AI Workflows | IntuitionLabs](https://intuitionlabs.ai/articles/claude-skills-vs-mcp)

### Google Gemini & Workspace
- [Google shares Gemini updates to Docs, Sheets, Slides and Drive](https://blog.google/products-and-platforms/products/workspace/gemini-workspace-updates-march-2026/)
- [Google Workspace Gemini AI in 2026: Docs, Sheets, Slides, Gmail Guide | Happycapy Guide](https://happycapyguide.com/google-workspace-gemini-ai-docs-sheets-slides-2026/)
- [Google Workspace Updates Blog](https://workspaceupdates.googleblog.com/)
- [Gemini in Google Workspace: Every Feature Explained (2026)](https://www.buildfastwithai.com/blogs/gemini-google-workspace-features-guide)

### NotebookLM
- [Google introduces Notebooks in Gemini, a project management tool synced with NotebookLM](https://blog.google/innovation-and-ai/products/gemini-app/notebooks-gemini-notebooklm/)
- [Generate Video Overviews in NotebookLM - NotebookLM Help](https://support.google.com/notebooklm/answer/16454555?hl=en)
- [Generate Audio Overview in NotebookLM - NotebookLM Help](https://support.google.com/notebooklm/answer/16212820?hl=en)
- [What's new in NotebookLM: Video Overviews and an upgraded Studio](https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-video-overviews-studio-upgrades/)

### Google Gems
- [Gemini Gems — build custom AI experts from Gemini](https://gemini.google/overview/gems/)
- [Google Gemini Gems: Latest Guide to Custom AI Agents for 2026 Productivity and Workflow Automation](https://blockchain.news/ainews/google-gemini-gems-latest-guide-to-custom-ai-agents-for-2026-productivity-and-workflow-automation)
- [How to Use Gemini Gems for Custom AI Instructions (Complete 2026 Guide)](https://bootfile.ai/blog/how-to-use-gemini-gems-for-custom-ai-instructions-complete-2026-guide)

### Google AI Studio & Stitch
- [2026 Guide: Google AI Studio from Idea to Prototype | ShipAi](https://www.shipai.dev/blog/google-ai-studio-2026-guide)
- [Design UI using AI with Stitch from Google Labs](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/)

### Google Antigravity
- [Google Antigravity vs Claude Code: Agent-First Development vs Terminal-First Control](https://www.augmentcode.com/tools/google-antigravity-vs-claude-code)
- [Google Antigravity vs Claude Code: Key Differences in 2026](https://kanerika.com/blogs/google-antigravity-vs-claude-code/)
- [Claude Code vs. Antigravity: Which AI Tool Is Better? | DataCamp](https://www.datacamp.com/blog/claude-code-vs-antigravity)

### OpenAI ChatGPT
- [ChatGPT — Release Notes | OpenAI Help Center](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [ChatGPT in 2026: Pricing, Models and Features That Actually Matter](https://www.gend.co/blog/chatgpt-2026-latest-features)
- [ChatGPT Guide 2026: Features, Pricing, Tips, Alternatives & More | TECHi](https://www.techi.com/chatgpt/)
- [ChatGPT Models Explained: Complete Comparison Guide (2026)](https://www.ai-toolbox.co/chatgpt-models/chatgpt-models-explained-complete-comparison-2026)

### OpenAI Workspace Agents & GPTs
- [Introducing workspace agents in ChatGPT | OpenAI](https://openai.com/index/introducing-workspace-agents-in-chatgpt/)
- [OpenAI unveils Workspace Agents, a successor to custom GPTs for enterprises](https://venturebeat.com/orchestration/openai-unveils-workspace-agents-a-successor-to-custom-gpts-for-enterprises-that-can-plug-directly-into-slack-salesforce-and-more/)
- [Workspace agents | OpenAI](https://openai.com/academy/workspace-agents/)

### Comparison & Use Cases
- [AI Models in 2026: Which One Should You Actually Use?](https://gurusup.com/blog/ai-comparisons)
- [AI Workflow Orchestration Tools 2026: Comparison](https://www.digitalapplied.com/blog/ai-workflow-orchestration-tools-2026-comparison)
- [Top AI Coding Tools in 2026 | Comparison, Insights & Use Cases](https://www.aubergine.co/insights/top-ai-coding-design-tools-in-2026)
- [The best AI models in 2026: What model to pick for your use case | Pluralsight](https://www.pluralsight.com/resources/blog/ai-and-data/best-ai-models-2026-list)

---

## Document Metadata

- **Research completed:** May 6, 2026
- **Refresh pass:** June 8, 2026 (model lineups, Google free-tier change, OpenAI "jack of all trades" positioning — see §0 changelog)
- **Knowledge cutoff:** Early June 2026
- **Geographic scope:** Global (primary focus on tools available in English-speaking regions)
- **Industry relevance:** Mining operations, equipment monitoring, safety reporting, team collaboration
- **Bias note:** Research prioritized publicly available information. Enterprise features for Google and OpenAI are less documented than Claude's.

---

**End of Research Document**

For workshop use: Extract sections by audience role (engineers need 2.1-2.7, operations needs 3.1-3.4, leadership needs section 5-6). Combine with HTML slide deck and live practice environment.
