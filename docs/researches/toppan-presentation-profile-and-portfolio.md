# Adri's Professional Profile & Portfolio Inventory
**Extracted from: toppan-presentation (Toppan Ecquaria AI Consulting Deck)**

---

## PURPOSE 1: ADRI'S PROFESSIONAL PROFILE

### Core Identity & Self-Framing

**Title & Role:**
- **Head of TPM & AI Lead** (Nanovest, 2022–Present)
- **Technical Program Manager** (TPM) with self-driven AI mastery

**Background & Experience:**
- 13+ Years in tech delivery (Application Engineer → Head of TPM)
- Deep expertise in Agile, Scrum, and SDLC process optimization across enterprise
- Certified Scrum Master | Agile Coach | PMI-ACP certified

**AI Journey & Self-Narrative:**
From learning reference and AI Ideation materials:
- **Self-taught in AI**: "Self-driven AI mastery through continuous learning. Leading AI transformation as Steering Committee Lead with hands-on implementation."
- **Methodology**: Deep understanding of AI stack (AI → ML → DL → Gen AI → LLM), Prompt Engineering, Context Engineering, AI Agents, RAG, and MCP Protocol
- **Thought Leadership**: References Cole Medin, Nate Herk, BMad Code, Grace Leung (self-directed learning from industry experts)
- **Philosophy**: Views AI implementation as bridge between business complexity and technical capability; positioned as both strategist and practitioner

**What He Frames As His Expertise:**
1. **Traditional (13 years)**: Process optimization, Agile/Scrum, enterprise SDLC
2. **Emerging (self-taught, recent)**: AI-driven development, prompt/context engineering, AI Agents, RAG systems, agentic automation
3. **Intersection**: TPM + AI = making AI-driven development practical at organizational scale

**Hook 2 Narrative Potential:**
Adri is a **non-engineer TPM who taught himself AI from scratch**—not by reading papers, but by building production systems solo. He went from managing traditional development to leading Nanovest's "Beyond Copilots" AI transformation, personally architecting enterprise-grade systems (Archon, n8n workflows, MCP tools). This is the "TPM-becomes-AI-practitioner" story.

---

## PURPOSE 2: PORTFOLIO INVENTORY

### Flagship Project: **Archon Platform**

**What it does:**  
Centralized knowledge management platform connecting AI coding assistants (Claude Code, Cursor, Codex) to organizational documentation, code repos, and project context via MCP Protocol.

**Tech Stack:**  
- Retrieval-Augmented Generation (RAG) with hybrid search (vector + keyword)
- Confluence Cloud integration (4,000+ pages synced in 15 min)
- MCP Protocol for AI IDE integration  
- Vector embeddings, contextual embeddings, smart reranking

**Solo-with-AI Build Evidence:**  
- Architecture designed end-to-end (not off-the-shelf RAG tool)
- Custom Confluence processor for metadata extraction, JIRA linking, macro resolution
- Multi-LLM support (OpenAI, Google, Anthropic, Ollama)
- Production-ready v0.2.0 with documented roadmap through v0.5.0

**Why it matters for Hook 2:**  
Core proof that Adri **architected a full enterprise AI platform alone**—not code-generation UI, but infrastructure-level RAG with MCP integration. Shows he understands AI at architectural depth.

---

### Production n8n Workflows (3 systems running 24/7)

#### 1. **Stocks Hot Now**
- **What**: Automated stock intelligence pipeline
- **Tech**: 10 RSS sources + Gemini 2.5 Pro filtering + Crawl4AI scraping + ticker analysis + Slack delivery
- **Metrics**: Daily briefs with top 10 stock tickers, impact scoring, outlook analysis
- **Evidence of solo build**: End-to-end workflow orchestration (collection → AI filtering → analysis → formatting → delivery)
- **Hook 2 value**: Single person built a real-time financial intelligence system that runs unsupervised

#### 2. **Legal Docs Generation**
- **What**: 6 interconnected n8n workflows automating document creation, approval, and e-signature
- **Tech**: Google Docs/Sheets generation + two-stage approval (Finance → Legal) + AI-powered revisions + Dropbox Sign integration + Slack interactive buttons
- **Metrics**: 6 workflows, 38-node main workflow, 95% API call reduction via caching
- **Evidence of solo build**: Complex multi-stage orchestration with AI revision agent + human approval loops + external e-signature integration
- **Hook 2 value**: Solo built enterprise legal process automation—not simple template, but stateful multi-actor workflow

#### 3. **Exchange News Alerting System**
- **What**: Cryptocurrency exchange monitoring with AI classification
- **Tech**: Multi-source RSS (RSSHub + native feeds), Gemini 2.5 Pro AI classification, Opsgenie alerting, configurable via n8n Data Tables
- **Metrics**: 5 exchanges monitored hourly, AI filters for operational relevance
- **Evidence of solo build**: Multi-source feed aggregation, AI relevance filtering, alert deduplication, configurable intelligence
- **Hook 2 value**: Built a specialized domain AI system (crypto ops intelligence) solo

---

### Engineering Infrastructure Tools (4 custom-built systems)

#### 1. **MCP CLI Installer**
- **What**: Interactive CLI tool for installing/managing internal MCP servers
- **Scope**: Bitbucket MCP, Atlassian MCP, Google Workspace MCP, Datadog, Sentry, SonarQube integration
- **Tech**: Bash CLI, credential management, Claude Desktop configuration automation, optional auto-update scheduling
- **Evidence of solo build**: Full CLI product (prerequisite checks, multi-select UI, automated setup, uninstall scripts)
- **Hook 2 value**: Built the "glue layer" enabling AI tools to access internal systems—infrastructure thinking

#### 2. **Coding Metrics System**
- **What**: Developer coding time tracker with Git hooks + FastAPI backend
- **Tech**: Git hooks, FastAPI, Bitbucket validation, Google Sheets reporting, validation dashboards
- **Evidence of solo build**: Full stack (client-side hooks + server + analytics + reporting)
- **Hook 2 value**: Shows he can build full-stack systems beyond just AI—real engineering

#### 3. **Atlassian Confluence Crawler**
- **What**: Specialized crawler for RAG knowledge-base creation
- **Tech**: Python, HTML-to-Markdown conversion, webhook sync, Google Drive storage, JIRA macro resolution, PostgreSQL event tracking, FastAPI REST API
- **Evidence of solo build**: Production-ready crawler with special Confluence handling (macros, metadata, hierarchy), RAG-optimized storage
- **Hook 2 value**: Built data pipeline infrastructure for AI systems—shows data architecture understanding

#### 4. **Google Apps Script CLI**
- **What**: Complete CLI workflow for managing GAS projects with version control and deployment
- **Tech**: init.sh for project setup, deploy.sh for .js→.gs conversion, secrets.js for env management, clasp automation
- **Scope**: Multi-project management, automated deployment, GitHub collaboration for GAS code
- **Evidence of solo build**: Complete CLI product with UX (interactive setup), deployment automation, secrets handling
- **Hook 2 value**: Solved a real infrastructure problem (GAS version control + deployment)—shows problem-solving not just AI hype

---

### Knowledge & Strategy Documents
- **AI Mastery Learning Reference**: Comprehensive self-study guide covering AI Stack, Prompt/Context Engineering, Agents, RAG, MCP, BMAD methodology, n8n automation
- **Toppan Consultation Strategy**: Enterprise-grade positioning document showing how to value-sell RAG architecture + MCP integration to government clients
- **AI Ideation Competition**: "Beyond Copilots" transformation roadmap (4 pillars, 4 phases) with 20x ROI financial model

---

## GAPS: What's NOT in Toppan Presentation (Assemble Separately for Hook 2)

1. **Quantified Solo-Build Timeline**: No data on "built X in Y weeks without engineering help"
   - *Recommendation*: Document when each system was built and team size (if any). "Built Archon v0.1 solo in 3 months" is Hook 2 gold.

2. **Before/After Metrics**: No measurable impact evidence (time saved, errors reduced, ROI achieved)
   - *Recommendation*: Gather: "Legal Docs automation saves X hours/month," "Confluence crawler reduced onboarding time by Y%"

3. **AI Tool Stack Evolution**: No explicit "learned from nothing → shipped production" narrative
   - *Recommendation*: Timeline: When did he first use Claude? First n8n workflow? First RAG system? Archon launch date?

4. **Customer/User Feedback**: No testimonials from teams using these tools
   - *Recommendation*: Collect quotes from Nanovest team members on impact (Slack alerts saved our ops team, Legal docs process is 10x faster, etc.)

5. **Technical Decision Rationale**: Why MCP over custom APIs? Why hybrid search over pure vector? Why n8n over custom code?
   - *Recommendation*: Add "Architecture decisions" section showing deliberate technical choices, not just tool selection

6. **Failure & Iteration Stories**: All systems shown as "production ready" but no learning journey visible
   - *Recommendation*: "First version of Archon used only vector search—results were too broad. Added hybrid (BM25 + vector) after 2 months of user feedback."

7. **"Self-Taught" Credibility Proof**: Learning reference lists experts but no evidence of how he applied teachings
   - *Recommendation*: "Applied Cole Medin's context engineering principles to [system] → improved relevance by X%"

8. **Code as Portfolio**: No GitHub/repo links or code samples
   - *Recommendation*: Link to public repos (even anonymized for confidentiality) showing code quality, architecture decisions, documentation

---

## Design & Visual Treatment Notes

**Current Toppan Aesthetic:**
- Dark theme (near-black background #050510 with navy/purple accents)
- Cyan (#00f0ff) + purple (#a855f7) + magenta (#f0147a) accent palette
- Syne font for headings (bold, geometric), DM Sans for body (clean, modern)
- Neural grid background with floating particles—"AI/tech" visual language
- Card-based layout with carousels for showcasing screenshots
- Animated progress bars and nav dots

**For Hook 2 Breakout:** Could maintain dark theme but emphasize Adri's journey differently—timeline, before/after comparisons, or constellation diagram showing how tools/skills interconnect.

---

## Corrections from Adri (2026-05-07)

The toppan repo is a snapshot in time. Some items the agent extracted are **out of scope or sunset** for the BCE Hook 2 showcase. Use this section as the canonical filter when composing Section I.

### OUT — do NOT showcase

- **Archon Platform** — sunset. RAG sync complexity + infra/LLM cost made it non-viable. Do not mention.
- **Atlassian / Confluence Crawler** — sunset alongside Archon (same reason).
- **Infrastructure tools** (MCP CLI installer, coding metrics tracker, Confluence crawler, Google Apps Script CLI) — too technical for the BCE audience; not narratable to mining-industry professionals. Skip entirely.

### IN — confirmed showcase candidates

- **3 active MCPs** (out of ~9 originally built; the other 6 were obsoleted once official 3rd-party MCPs shipped):
  - **Sonarqube MCP**
  - **Bitbucket MCP**
  - **Gemini-Multimedia-Gen MCP**
- **Claude Code Plugins** (NEW — not in original research):
  - **`nanovest-product` plugin** — ideation → PRD generation workflow
  - **`notebooklm` plugin** — details TBD; Adri to provide separately
- **n8n workflows** — original research listed 3 (stocks intelligence, legal docs generation, crypto exchange alerts). Status not explicitly confirmed in correction; treat as "candidate, confirm before composition."
- **Prior workshop decks themselves** (HR Group, Townhall AISC, AI-SDLC, Pilot Workshop) — solo-built AI-assisted presentation work; meta-credibility proof. Status as "portfolio item" TBD during brainstorm.
- **The Berau deck itself** (this very deck, by reveal time) — strongest proof point of all; status TBD during brainstorm.

### Implications for Hook 2 composition

- **Tech depth is constrained.** With Archon out, no big "enterprise RAG + MCP" deep-dive option. Showcase leans toward many lightweight artifacts rather than one heavy system.
- **Audience-fit filter applies.** Items must be narratable to non-technical mining professionals. MCPs need framing (what an MCP IS in plain language, why it matters) before being shown.
- **Plugins are the freshest material.** `nanovest-product` and `notebooklm` plugins are the newest portfolio items and the closest to "I built this with AI to do my job better" — high relevance for the replication ask in Section J.

### Adri's AI learning journey (timeline)

- **March 2025** — started learning AI from scratch (no prior formal AI training)
- **March → August 2025 (6 months)** — pursued foundation + experiment; deliberately did NOT chase deliverables during this window. Goal was depth of understanding before output.
- **September 2025 onward** — began producing meaningful deliverables (the portfolio items above grew from this period)
- **Total elapsed by workshop delivery (May 2026)** — ~14 months

### Further corrections (2026-05-07, during I.3 brainstorm)

- **gemini-image-gen MCP — main model is `nano banana pro`** (not Imagen 4). Imagen 4 supported but not primary. Update any audience-facing copy accordingly.
- **Decks are NOT portfolio tiles in I.3.** Frame Adri's prior work as **"workshops facilitated"** instead. Listed workshops: HR Group AI Workshop (Sinarmas Group cross-org — the only group-level one), Townhall AISC (Nanovest internal), AI-SDLC (Nanovest internal), Pilot Workshop (Nanovest internal).
- **Workflows > Plugins for showcase emphasis.** I.3 should highlight n8n workflows MORE than plugins, not the other way around. Both get animated simulations of harness pattern (main agent orchestration · agent chaining · tool calling).
- **MCPs and Workshops get LIGHT treatment** in I.3 — simple text/diagram, no animated simulation.
- **No commit counts, no 'solo' repetitions** in audience-facing copy (see `feedback_audience_framing.md`).

### Section I key message (locked)

> "I stay current with new AI frameworks, techniques, and tools. But for that to mean anything to you, you need proper foundation and understanding first. That's what I pursued in my first 6 months."

This is the throughline of Section I and shapes how the journey + portfolio are framed: foundation precedes velocity. The 6-month foundation window is itself a credential — it says "I didn't shortcut, you don't have to either."

---

**Last Updated:** May 7, 2026  
**Source:** `/Users/macbook/Projects/_web_presentation/toppan-presentation` (with 2026-05-07 corrections from Adri above)
