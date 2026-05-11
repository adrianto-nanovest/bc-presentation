# Section G Tooling Research: Lesser-Known Tools & Under-Researched Surfaces

**Research date:** 2026-05-11
**Purpose:** Fill knowledge gaps for Section G of AI workshop deck
**Audience:** ~400 mining-industry professionals, non-AI-native

---

## 1. OpenClaw — Open-Source Personal AI Assistant

**What it is:** OpenClaw (formerly Clawdbot, then Moltbot) is a free and open-source autonomous AI agent that runs on your own devices and can execute tasks via large language models. Think of it as your personal AI assistant that answers you through the messaging apps you already use — WhatsApp, Telegram, Slack, Discord, even iMessage — rather than forcing you to open yet another app.

**Who built it:** Developed by Austrian developer Peter Steinberger, first published in November 2025. In February 2026, Steinberger announced he would be joining OpenAI, with stewardship transitioning to a non-profit foundation.

**Current capabilities (May 2026):**
- Multi-channel inbox supporting 20+ messaging platforms (WhatsApp, Telegram, Slack, Discord, iMessage, Microsoft Teams, Signal, and more)
- 100+ built-in skills connecting AI models to apps, browsers, and system tools
- Voice capabilities on macOS, iOS, and Android
- Live Canvas that you control for visual outputs
- Self-hosted deployment — runs on your hardware, not in the cloud
- Can access email, calendars, messaging platforms, and other connected services

**Why it matters for non-engineers:** OpenClaw democratizes AI agents by letting you interact through familiar channels (your existing messaging apps) rather than learning new interfaces. However, because it can access sensitive services, it requires careful setup and carries real security implications if misconfigured.

**Example use case:** A mining operations manager could configure OpenClaw to monitor their Slack channels, summarize daily incident reports from email, and respond to routine questions via WhatsApp — all without switching between apps.

**Viral adoption:** With 350,000+ GitHub stars as of May 2026, OpenClaw became the most-starred software project in GitHub history. The repository surpassed 100,000 stars within just two months of its initial release.

**Security considerations:** Because OpenClaw can access email, calendars, and messaging platforms, misconfigured instances present real security and privacy risks. The agent is also susceptible to prompt injection attacks. In March 2026, the Chinese government restricted state agencies and state-owned enterprises from using OpenClaw due to security concerns including unauthorized data deletion, data leaks, and excessive energy usage.

**Citations:**
- [GitHub - openclaw/openclaw](https://github.com/openclaw/openclaw)
- [OpenClaw - Wikipedia](https://en.wikipedia.org/wiki/OpenClaw)
- [KDnuggets: OpenClaw Explained](https://www.kdnuggets.com/openclaw-explained-the-free-ai-agent-tool-going-viral-already-in-2026)
- [NVIDIA Blog: What OpenClaw Agents Mean for Every Organization](https://blogs.nvidia.com/blog/what-openclaw-agents-mean-for-every-organization/)

---

## 2. Hermes Agent — The Self-Improving AI Agent

**What it is:** Hermes Agent is an open-source autonomous AI agent built by Nous Research, released in February 2026. Unlike most AI assistants that start fresh with each conversation, Hermes Agent has a built-in learning loop — it remembers what it learns, creates skills from experience, and gets more capable the longer it runs. Imagine an assistant that actually gets better at helping you over time, not just session by session.

**Who built it:** Nous Research, released February 2026.

**Current capabilities:**
- Self-improving learning loop — creates skills from experience and improves them during use
- Persistent memory across sessions — builds a deepening model of who you are
- Searches its own past conversations for context
- Nudges itself to persist knowledge rather than forgetting
- Multi-platform support: Telegram, Discord, Slack, WhatsApp, Signal, Email, CLI
- Model flexibility — works with 200+ models via OpenRouter, NVIDIA NIM, Hugging Face, OpenAI, and custom endpoints
- Can run on a $5 VPS, GPU cluster, or serverless infrastructure

**Why it matters for non-engineers:** Most AI assistants treat every conversation as a blank slate. Hermes Agent learns your preferences, remembers your projects, and builds contextual understanding over time — more like working with a colleague who gets to know your work style than repeatedly training a new intern.

**Example use case:** A safety officer could use Hermes Agent to track recurring incident patterns. Over weeks, the agent learns which safety protocols apply to which scenarios, remembers site-specific terminology, and proactively flags similar situations based on past incidents — capabilities that improve with each interaction.

**Community adoption:** Since launching in February 2026, Hermes Agent has collected over 64,000 GitHub stars and triggered what developers are calling a "migration wave" away from OpenClaw among users who prioritize persistent learning capabilities.

**Recent updates:** On April 8, 2026, Hermes Agent shipped v0.8.0 with 209 merged pull requests. The headline feature: the agent patched its own blind spots through automated benchmarking, demonstrating genuine self-improvement capabilities.

**Privacy & licensing:** All data stays on your machine. No telemetry, no tracking, no cloud lock-in. Released under MIT license.

**Citations:**
- [GitHub - NousResearch/hermes-agent](https://github.com/nousresearch/hermes-agent)
- [Hermes Agent - The Agent That Grows With You](https://hermes-agent.nousresearch.com/)
- [Medium: Hermes Agent - The AI That Remembers What It Learned Yesterday](https://medium.com/@creativeaininja/hermes-agent-the-open-source-ai-agent-that-actually-remembers-what-it-learned-yesterday-278441cd1870)
- [utilo: Hermes Agent Review 2026](https://utilo.io/en/home/blog/hermes-agent-review-2026)

---

## 3. n8n — Workflow Automation Meets AI (2026 MCP Integration)

**What it is:** n8n is a workflow automation platform that connects apps and services. In 2026, n8n released MCP (Model Context Protocol) integration that fundamentally changed how non-engineers interact with automation. Instead of manually designing workflows node-by-node, you can now describe what you want in natural language, and AI assistants like Claude build, validate, and deploy the workflow for you.

**How non-engineers use it (2026):** Describe your workflow in plain language ("When someone fills out our equipment request form, create a Slack notification, add it to our maintenance tracking spreadsheet, and send a confirmation email"). The AI builds the workflow, validates it, runs it, and fixes itself if something breaks. You review and approve rather than wire connections manually.

**Relationship to Claude/MCP:** n8n's MCP server gives Claude (and other MCP-compatible AI tools) direct access to your n8n instance. Claude doesn't just suggest workflows in chat — it reaches into n8n, identifies the exact nodes needed, wires the connections, sets the triggers, and configures data transformations. The AI has access to 2,352 workflow templates with 99.96% AI metadata coverage.

**Key capabilities:**
- AI-driven workflow creation — Claude, ChatGPT, Cursor, and Windsurf can all build n8n workflows via MCP
- Automated validation and testing — the AI runs the workflow to confirm it works
- Self-healing — if a workflow breaks, the AI can diagnose and fix issues
- Template library — 2,352+ pre-built workflow templates
- One important constraint: Claude Code cannot set credentials. It can configure a node to reference a credential by name, but API keys, OAuth tokens, and passwords must already exist in n8n and be selected manually

**Why it matters for non-engineers:** Traditional workflow automation required understanding logic flows, API endpoints, and data mapping. The 2026 MCP integration means you describe the outcome you want, and AI handles the technical implementation. This shifts workflow automation from "IT project" to "describe your process and review what gets built."

**Example use case:** A shift supervisor wants daily reports combining data from three systems (equipment logs, incident reports, maintenance schedules). Instead of requesting IT support, they describe the workflow to Claude. Claude builds the n8n workflow, schedules it to run daily at 6 AM, and delivers a formatted report to the supervisor's inbox — all within a single conversation.

**Technical implementation:** The n8n-mcp project (authored by czlonkowski, MIT license) integrates with Claude Desktop, Claude Code, Windsurf, and Cursor. The MCP server provides comprehensive access to n8n node documentation, properties, and operations.

**Citations:**
- [n8n Blog: n8n's MCP server can now build workflows](https://blog.n8n.io/n8n-mcp-server/)
- [GitHub - czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp)
- [AIToolly: n8n-MCP - Build n8n Workflows with Claude and Cursor](https://aitoolly.com/ai-news/article/2026-05-06-n8n-mcp-a-new-model-context-protocol-tool-for-building-n8n-workflows-via-claude-desktop-and-cursor)
- [n8n integrations: Claude](https://n8n.io/integrations/claude/)

---

## 4. Claude Interactive Diagrams — Visual Thinking Without Design Tools

**What it is:** Claude Interactive Diagrams is a web feature (launched April 2026) that lets Claude respond with interactive charts, diagrams, and visualizations rendered inline as part of conversations. Instead of describing a process in text or pasting a static image, Claude builds live, interactive visuals using HTML — the same building blocks as web pages.

**How it differs from Live Artifacts:** Live Artifacts are full interactive apps or documents you can edit and iterate on. Interactive Diagrams are conversation-native visualizations that appear directly in your chat to clarify concepts, show relationships, or visualize data. Think of Diagrams as "illustrations that help Claude explain" vs. Artifacts as "working prototypes you can modify and export."

**Use cases for non-engineers:**
- Data visualization — "chart this quarterly incident data" produces an interactive chart you can hover over for details
- Process diagrams — "show me how the equipment approval workflow works" generates a flowchart with clickable steps
- Side-by-side comparisons — "compare these three safety protocols" creates an interactive comparison table
- System diagrams — "map out our reporting structure" visualizes hierarchies and relationships

**How it works:** Claude decides when a visual would help based on your question. You can also request diagrams explicitly with phrases like "draw this as a diagram," "show me how this changes over time," or "chart this data." The visuals are interactive (hover for details, click to expand) rather than static screenshots.

**Availability (May 2026):** Custom visuals are in beta and available to all Claude users on web and desktop, in both Chat and Cowork. They do not currently render on Claude for iOS or Claude for Android.

**Example use case:** A mine planning engineer asks Claude to "compare water usage across our three sites for the last six months." Claude generates an interactive chart showing trends, with hover tooltips revealing exact values and annotations highlighting anomalies — all without the engineer needing to open Excel or a BI tool.

**Technical note:** Interactive Diagrams use HTML rendering, making them inherently interactive and specific to your question. This contrasts with static image generation tools that produce fixed outputs.

**Competitive context:** This release came just days after OpenAI made ChatGPT capable of generating interactive visuals for science and math concepts, indicating industry-wide movement toward conversational visualization.

**Citations:**
- [Claude Blog: Claude builds interactive visuals right in your conversation](https://claude.com/blog/claude-builds-visuals)
- [Claude Help Center: Custom visuals in chat and Cowork](https://support.claude.com/en/articles/13979539-custom-visuals-in-chat)
- [Medium: Claude Can Now Create Complex Diagrams](https://medium.com/@ayushi.parmar.2520/claude-can-now-create-complex-diagrams-i-tested-21-prompts-goodbye-design-tools-22e8f6792dd2)
- [The New Stack: Anthropic's Claude can now draw interactive charts and diagrams](https://thenewstack.io/anthropics-claude-interactive-visualizations/)

---

## 5. Claude Dispatch / Remote Control — Assign Tasks from Mobile

**What it is:** Two related features that let you control Claude from your phone or remotely:

**Claude Dispatch** (launched March 17, 2026): Send a task from the Claude mobile app, and Claude executes it on your desktop computer with access to your local files, installed apps, connected services, and Computer Use capabilities. Think of it as delegating work to an assistant who sits at your desk while you're away.

**Claude Code Remote Control** (research preview, all plans): Continue a running Claude Code session from your phone, tablet, or any browser. Start a task at your desk, then steer it from your phone on the couch or a browser on another computer. The session runs locally on your machine the entire time.

**How Dispatch works:**
- Message a task from the Claude mobile app on iOS or Android
- Claude Desktop (running on your computer) receives the task and begins working
- One continuous conversation thread syncs between your phone and desktop
- Claude has access to your local files, apps, connected services, and can use Computer Use
- Setup takes about two minutes (scan a QR code to pair your phone with Desktop)
- Your computer must stay awake with Claude Desktop open

**How Remote Control works:**
- Start a Claude Code session in your terminal or VS Code with `claude --remote-control` or `/remote-control`
- Open the session URL or scan the QR code on your phone or another browser
- The session runs on your machine with full access to your local environment, MCP servers, tools, and project configuration
- The conversation stays in sync across all connected devices
- Survives interruptions — if your laptop sleeps or network drops, it reconnects automatically

**Who it's for:**
- **Dispatch**: Delegating work while you're away from your desk with minimal setup
- **Remote Control**: Steering in-progress work from another device; checking status; reviewing outputs remotely

**Availability:**
- **Dispatch**: Available to Pro ($20/month) and Max ($100-200/month) subscribers as research preview
- **Remote Control**: Research preview, available on all plans (off by default for Team/Enterprise until admin enables)

**Example use case:** A mining engineer heads to a remote site for the day. Before leaving, they use Dispatch to send Claude a task: "Compile yesterday's equipment diagnostics into a summary report and identify any anomalies." Claude Desktop processes local log files, cross-references maintenance schedules, generates the report, and notifies the engineer via mobile push notification when complete — all while the engineer is in the field.

**Security:** Your local Claude Code session makes outbound HTTPS requests only and never opens inbound ports. All traffic travels through the Anthropic API over TLS with multiple short-lived credentials.

**Citations:**
- [XDA Developers: Claude's Dispatch feature turned my phone into a remote control](https://www.xda-developers.com/claudes-dispatch-feature-turned-my-phone-into-a-remote-control-for-my-entire-workflow/)
- [Claude Code Docs: Continue local sessions with Remote Control](https://code.claude.com/docs/en/remote-control)
- [MindStudio: What Is Claude Code Dispatch?](https://www.mindstudio.ai/blog/what-is-claude-code-dispatch)
- [Fortune: I used Claude's new Dispatch feature for a month](https://fortune.com/2026/04/28/claude-dispatch-feature-capabilities-service/)

---

## 6. Claude Plugins — Extending Claude Beyond Skills & MCP

**What they are:** Claude Plugins are packages that extend Claude Code with custom commands, agents, hooks, and MCP servers through the plugin system. They are distinct from Skills (which are pre-built AI capabilities you invoke with `/` commands) and MCP servers (which connect Claude to external tools and data).

**How they differ:**
- **Skills**: Pre-built AI capabilities (like `/plan` or `/review`) that Claude uses to perform specific tasks
- **MCP servers**: Connections to external tools (like Slack, GitHub, databases) that provide data and actions
- **Plugins**: Bundled packages that can include custom commands, specialized agents, workflow hooks, and MCP servers all together

**Notable plugins (2026 catalog):**
- Development tools for specific frameworks and languages
- AI workflow orchestrators for complex multi-step tasks
- Productivity enhancers (code review automation, documentation generators)
- Security plugins for vulnerability scanning and compliance
- Data engineering tools for pipeline management

**Official catalog:** Anthropic maintains "claude-plugins-official," automatically available when you start Claude Code. Browse at claude.com/plugins. The official marketplace includes both Anthropic-developed plugins and vetted third-party contributions.

**Installation:** Use `/plugin install <name>@claude-plugins-official` to install from the official catalog, or run `/plugin` to open the plugin manager and browse available options.

**Third-party marketplaces:**
- **claudemarketplaces.com**: Curated directory of high-quality plugins, skills, and MCP servers
- **buildwithclaude.com**: 508+ practical extensions across Claude.ai, Claude Code, and Claude API
- **GitHub collections**: Community repositories like ComposioHQ/awesome-claude-plugins

**Coverage:** The plugin ecosystem spans categories including development tools, AI workflows, productivity, security, and data engineering.

**Why non-engineers care:** While many plugins target developers, some provide business-focused capabilities like automated report generation, compliance checking, or workflow automation that don't require coding knowledge to use.

**Transparency note:** Public documentation about the plugin system is limited compared to Skills and MCP. Most available information comes from community-driven catalogs rather than comprehensive official docs. This may indicate the plugin system is still evolving or targeted primarily at technical users.

**Citations:**
- [Claude Marketplaces: Plugins Directory](https://claudemarketplaces.com/)
- [GitHub - anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)
- [Claude Code Docs: Discover and install plugins](https://code.claude.com/docs/en/discover-plugins)
- [Build with Claude: Plugins](https://buildwithclaude.com/plugins)

---

## 7. Claude Projects — Knowledge Containers on the Web

**What it is:** Claude Projects (on claude.ai) is a feature that lets you create self-contained workspaces with their own chat histories and knowledge bases. Think of a Project as a persistent context container — a folder that remembers everything related to a specific initiative, complete with uploaded documents, conversation history, and custom instructions.

**How it differs from Cowork:** Cowork is for real-time collaboration with other people and AI working together. Projects are knowledge containers for you to organize your own work by topic or initiative, with AI that remembers context across sessions.

**Key capabilities:**
- Upload relevant documents, text, code, or other files to a project's knowledge base
- Claude uses uploaded content to understand context for all chats within that project
- Each project has its own isolated chat history
- Supports PDF, DOCX, CSV, TXT, HTML, and more formats
- Up to 30MB per file with unlimited files

**Enhanced RAG (Retrieval Augmented Generation) for paid plans:**
- Free users: 5 projects with basic knowledge base
- Paid plans (Pro, Max, Team, Enterprise): Unlimited projects with RAG capabilities that expand capacity 10x
- When project knowledge approaches context limits, Claude automatically enables RAG mode to handle large amounts of content while maintaining response quality

**Team & Enterprise sharing:** Users on Team and Enterprise plans can share projects with organization members, enabling collaborative knowledge sharing.

**Recent updates (2026):** Project RAG capabilities expanded 10x in capacity compared to the original 2025 release, making them viable for large technical documentation sets and extensive research collections.

**Example use case:** A mining operations team creates a Project called "2026 Site Expansion" and uploads environmental impact assessments, regulatory requirements, engineering specs, and past project retrospectives (hundreds of pages total). Every conversation within that Project has instant access to this knowledge base. When discussing permit requirements, Claude references the uploaded regulatory docs. When planning timelines, Claude recalls lessons from past project retrospectives — all without re-uploading or re-explaining context.

**Why it matters for non-engineers:** Projects solve the "explain the background every time" problem. Upload your domain knowledge once, and every conversation within that Project benefits. You're not training a new AI assistant from scratch each chat — you're working with one that already knows your project's context.

**Citations:**
- [Claude Help Center: What are projects?](https://support.claude.com/en/articles/9517075-what-are-projects)
- [Suprmind: Claude Features 2026 - Projects](https://suprmind.ai/hub/claude/features/)
- [Alex Merced: Context Management Strategies for Claude Web](https://iceberglakehouse.com/posts/2026-03-context-claude-web/)
- [fwdslash.ai: What Is a Claude Project?](https://www.fwdslash.ai/blog/what-is-a-claude-project)

---

## 8. Built-in Claude Code Agents — The Deferred Tool Catalog

**What they are:** Claude Code includes several specialized AI assistants (subagents) that handle specific types of tasks. When Claude encounters work that matches a subagent's expertise, it delegates to that specialist, which runs independently and returns results. This keeps specialized work out of your main conversation context.

**The core built-in agents:**

### **Explore Agent**
- **What it does:** Read-only file search and codebase exploration
- **When it activates:** When Claude needs to search or understand a codebase without making changes
- **Thoroughness levels:** Quick (targeted lookups), medium (balanced exploration), very thorough (comprehensive analysis)
- **Why non-engineers care:** Keeps search results and exploratory work out of your main conversation, so summaries are concise rather than overwhelming

### **Plan Agent**
- **What it does:** Research specialist that gathers context before presenting implementation plans
- **When it activates:** During plan mode when Claude needs to understand your codebase before drafting a plan
- **Why non-engineers care:** Separates "understanding the landscape" from "proposing the approach," making plans more focused

### **Task Agent / General Purpose Agent**
- **What it does:** Handles complex, multi-step tasks requiring both exploration and action
- **When it activates:** For work that combines research, decision-making, and execution
- **Why non-engineers care:** Manages long-running workflows without cluttering your conversation with every intermediate step

### **Claude Code Guide**
- **What it does:** Provides guidance on using Claude Code features and capabilities
- **When it activates:** When you ask "how do I..." questions about Claude Code itself

### **statusline-setup**
- **What it does:** Configures shell integration for Claude Code status display in your terminal prompt
- **When it activates:** During initial setup or when requested

**How subagents work:** Each runs in its own context window with a custom system prompt, specific tool access, and independent permissions. Subagents cannot spawn other subagents (prevents infinite nesting). They return summaries to the main conversation rather than full transcripts.

**Deferred tool schemas:** Claude Code uses "deferred tool schemas" to limit context consumption. Not all tools load immediately — they're loaded on-demand when needed, part of a five-layer context-reduction strategy to manage the 200K-1M token context window efficiently.

**Why this matters for non-engineers:** You don't need to know which agent handles what. Claude automatically delegates to specialists when appropriate. What you'll notice: cleaner conversations with less noise, because exploration and research happen "offstage" and you see summarized results.

**Transparency note:** Detailed public documentation of the full deferred tool catalog is limited. Most available information comes from technical analysis (like the Piebald-AI/claude-code-system-prompts repository) rather than official comprehensive guides. This suggests the system is architected for automatic invocation rather than manual user management.

**Citations:**
- [Claude Code Docs: Create custom subagents](https://code.claude.com/docs/en/sub-agents)
- [Developers Digest: Claude Code Agent Teams, Subagents, and MCP](https://www.developersdigest.tech/blog/claude-code-agent-teams-subagents-2026)
- [GitHub - Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts)
- [DEV Community: The Task Tool - Claude Code's Agent Orchestration System](https://dev.to/bhaidar/the-task-tool-claude-codes-agent-orchestration-system-4bf2)

---

## 9. Built-in Claude Code Commands — The Command Catalog

**What they are:** Slash commands you run inside Claude Code sessions to control behavior, manage context, review work, and integrate with external services. Type `/` to see the full list (including custom commands and those from MCP servers).

**Command categories:**

### **Session Management**
- `/status` — Show current session state, model, usage
- `/context` — View what's currently in context
- `/clear` — Clear conversation history
- `/compact` — Compress context to recover space
- `/resume` — Resume a previous session
- `/exit` — End the session

### **File Operations & Search**
- File references: `@README.md` to include a file, `@src/components/` to include a directory, `@https://example.com` to fetch a URL
- Claude Code uses specialized tools (ReadFile, etc.) rather than shell commands for file operations
- Built-in grep capabilities if you don't have exact filenames

### **Web Integration**
- `/web-search` — Enable web search capabilities
- URL fetching via `@https://` syntax
- Web search with dynamic filtering (web_search_20260209 tool version)

### **Planning & Review**
- `/plan` — Enter planning mode to draft implementation strategies
- `/review` — Review code changes or PRs
- `/diff` — Show changes between versions
- `/debug` — Enter debugging mode

### **Model Configuration**
- `/model opus` — Switch to Opus (most capable)
- `/model sonnet` — Switch to Sonnet (balanced)
- `/model haiku` — Switch to Haiku (fastest)
- `/effort xhigh` — Set effort level for Opus 4.7 coding/agentic workloads

### **Workflow & Automation**
- `/remote-control` (or `/rc`) — Enable remote access from mobile/web
- `/mobile` — Display QR code to download Claude mobile app
- Custom commands from `.claude/commands/` and `~/.claude/commands/` directories

### **MCP & Plugins**
- `/mcp` — Manage Model Context Protocol servers
- `/plugin` — Open plugin manager to browse and install plugins
- Commands from connected MCP servers appear in the `/` menu

**How commands are discovered:** Run `/help` to see all available slash commands, including custom commands and those provided by MCP servers. The list is dynamic based on your configuration.

**Why non-engineers care:** Commands provide shortcuts for common tasks. `/plan` before tackling complex work gives you a roadmap. `/context` shows what Claude remembers when answers seem off. `/clear` starts fresh when switching topics. You don't need to memorize them — type `/` and browse.

**Example use case:** Before asking Claude to redesign a report template, run `/context` to see if Claude has loaded the right files. If not, use `@templates/current-report.html` to include the existing template, then request changes. Later, run `/diff` to review exactly what changed.

**Extensibility:** Custom commands live in `.claude/commands/` (project-specific) or `~/.claude/commands/` (user-wide), making them available across sessions.

**Citations:**
- [Claude Code Docs: Overview](https://code.claude.com/docs/en/overview)
- [Script by AI: Claude Code Commands Cheat Sheet](https://www.scriptbyai.com/claude-code-commands-cheat-sheet/)
- [Blake Crosley: Claude Code Cheat Sheet 2026](https://blakecrosley.com/guides/claude-code-cheatsheet)
- [Shipyard: Claude Code CLI Cheatsheet](https://shipyard.build/blog/claude-code-cheat-sheet/)

---

## 10. Google Workspace Studio — Agentic Automation for Workspace

**What it is:** Google Workspace Studio is the place to automate work and design, manage, and share AI agents within Google Workspace. Think of it as no-code automation for Gmail, Docs, Sheets, Calendar, and Drive that uses AI to make decisions, not just follow rigid rules.

**How it differs from Workspace Intelligence:** Workspace Intelligence is the underlying AI system that understands the relationships between your emails, docs, meetings, and collaborators (the "brain"). Workspace Studio is the no-code automation builder that uses that intelligence to create workflows (the "hands").

**Who uses it:** Business and enterprise Workspace plan subscribers. Included with Google Workspace business and enterprise plans (not consumer Gmail accounts).

**Key capabilities:**
- **Skills for agentic automation:** Create skills in Workspace Studio and invoke them anywhere you use Gemini in Workspace. Convert standard operating procedures into skills for team-wide automation.
- **Enhanced meeting workflows:** Trigger flows when meeting transcripts or Notes by Gemini are ready; select up to 100 meetings to trigger a flow.
- **Gems integration:** Integrate Gemini Gems (custom AI personas) into your flows as workflow steps.
- **Language support:** Expanded to seven new languages in 2026.
- **Governance controls:** Agent management, AI control center, and Studio-specific controls to monitor, audit, and control agent access to organizational data.

**General availability & adoption (2026):** Google made Workspace Studio generally available at Google Cloud Next 2026, citing:
- 3.5 million monthly active users
- 170 million tasks automated in a single month
- 700% growth in three months

**Usage limits:** Through June 1, 2026, Workspace customers have promotional access to higher limits. After that date, per-user usage limits apply.

**Example use case:** An HR team creates a Workspace Studio flow: "When a new hire form is submitted in Google Forms, create a folder in Drive, add them to the team calendar, send a welcome email series, and notify their manager in Chat." The AI handles conditional logic (if role = manager, add extra permissions) without hardcoded rules.

**Why non-engineers care:** Traditional workflow automation required "if-this-then-that" logic and broke when edge cases appeared. Studio's agentic approach means the AI can reason about context and adapt. You describe the outcome, and the AI figures out the steps — including handling variations you didn't explicitly program.

**Citations:**
- [Google Workspace Blog: 10 more announcements for Workspace at Next 2026](https://workspace.google.com/blog/product-announcements/10-more-announcements-workspace-at-next-2026)
- [Google Workspace Updates: Google Workspace Studio available in more languages](https://workspaceupdates.googleblog.com/2026/05/google-workspace-studio-available-in-more-languages.html)
- [Google Workspace Updates: Use your Gems in Studio flows](https://workspaceupdates.googleblog.com/2026/04/use-your-gems-in-your-google-workspace-studio-flows.html)
- [zenphi: Google Workspace Studio - News From Next 2026](https://zenphi.com/google-workspace-studio-google-cloud-next/)

---

## 11. Google Flow (Veo 3) — AI Video Generation with Native Audio

**What it is:** Google Flow is an AI filmmaking tool built by Google DeepMind, custom-designed for Google's video generation model Veo 3. Released in 2026, Flow integrates Veo 3's video generation capabilities with native audio generation and Imagen 3 for visual assets.

**Veo 3 capabilities:**
- AI video generation with expanded creative controls
- Native audio generation — understands acoustic properties of visual scenes and generates matching sound effects, ambient noise, and dialogue
- Extended video length support
- Integration with Imagen 3 for high-quality still frames and visual assets

**How it differs from video editing tools:** Traditional video editors require you to shoot or source footage, then arrange it. Flow generates video from text descriptions, including synchronized audio. Think "AI filmmaking" rather than "video editing."

**Access and pricing (2026):**
- **Free tier:** Available to all personal Google account holders through Google Vids and Google Flow
- **Google Flow (Google Labs):** 50 daily AI credits for Veo 3.1 generation (~12 videos per day) with no payment required
- **Google One AI Premium ($19.99/month):** Full Veo 3 integration and additional credits

**April 2, 2026 announcement:** Google announced Veo 3.1 would be available free of charge to all personal Google account holders through Google Vids and Google Flow.

**Use cases for non-engineers:**
- Training video creation from scripts
- Process documentation with narration
- Safety briefing videos with realistic scenarios
- Equipment demonstration videos

**Example use case:** A training coordinator writes: "Create a 90-second safety briefing showing proper equipment shutdown procedure, with voiceover explaining each step." Flow generates the video with matching audio narration, ambient industrial sounds, and visual demonstration — no filming or voice recording required.

**Technical innovation:** Veo 3's "native audio generation" represents a paradigm shift. Previous AI video tools generated silent videos, requiring separate audio tracks. Veo 3 understands that a scene showing rain should sound like rain, a busy office should have ambient conversation — the audio emerges from understanding the visual context.

**Citations:**
- [Google Labs: Flow](https://labs.google/flow/about)
- [Google Blog: Introducing Flow - AI filmmaking tool designed for Veo](https://blog.google/innovation-and-ai/products/google-flow-veo-ai-filmmaking-tool/)
- [veo3ai.io: Veo 3.1 Is Free for Everyone](https://www.veo3ai.io/blog/veo-3-1-free-for-everyone-how-to-use-2026)
- [creati.ai: Google Launches Flow with Native Audio Support](https://creati.ai/ai-news/2026-01-27/google-flow-veo-3-ai-video-generation-tool/)

---

## 12. Gemini Canvas Standalone — AI-Powered Document & Code Workspace

**What it is:** Gemini Canvas is a standalone feature within the Gemini app that provides a dedicated workspace for creating documents, code, prototypes, and interactive content with AI assistance. It's distinct from Gemini integration within Google Workspace Docs.

**How it differs from Workspace Docs Gemini:** Workspace Docs Gemini adds AI capabilities to your existing Google Docs workflow (suggest edits, draft content within a doc). Gemini Canvas is a separate environment designed for AI-native creation where the interface itself is built around co-creation with AI.

**What it does:**
- Create documents with AI collaboration
- Code web apps and interactive prototypes
- Transform content into various formats (web pages, quizzes, audio overviews)
- Build interactive UI mockups
- Generate visual content

**Recent expansion (March 2026):** Google expanded Canvas in AI Mode to all U.S. users in English, making it available in both Google Search's AI Mode and the standalone Gemini app. This followed an eight-month limited Google Labs debut in July 2025.

**Access & pricing:**
- **Free tier:** Available to all Gemini users with key features including image generation, Canvas, Gems, and Gemini Live voice
- **Google AI Pro / Google AI Ultra subscribers:** Access to Gemini 3 models with 1 million-token context window for larger, more complex projects

**How to access:** Below the prompt bar in Gemini, select "Canvas" and enter your prompt to start a document or coding project.

**Features available:**
- Document creation and editing
- Web app and prototype building
- Content transformation (turn text into interactive formats)
- Image generation
- Audio overview creation

**Example use case:** A project manager opens Gemini Canvas and prompts: "Create a project kickoff presentation for our site expansion, including timeline, key milestones, risk factors, and resource requirements." Canvas generates an interactive presentation with editable sections. The manager refines specific sections by highlighting and requesting changes, all within the Canvas interface.

**Why non-engineers care:** Canvas provides a workspace where AI isn't just a chatbot suggesting ideas — it's a co-creator actively building artifacts with you. You can see and edit outputs directly rather than copying suggestions back and forth.

**Citations:**
- [Gemini: Canvas Overview](https://gemini.google/overview/canvas/)
- [TechCrunch: Google Search rolls out Gemini's Canvas to all US users](https://techcrunch.com/2026/03/04/https-techcrunch-com-2026-03-04-google-search-rolls-out-geminis-canvas-in-ai-mode-to-all-us-users/)
- [WinBuzzer: Google Launches Canvas in AI Mode for All U.S. Users](https://winbuzzer.com/2026/03/05/google-gemini-canvas-ai-mode-all-us-users-coding-writing-xcxwbn/)
- [Medium: AI App Prototyping with Gemini Canvas](https://medium.com/vibe-coding-dad/gemini-canvas-is-magic-for-rapid-prototyping-babbde6ac25f)

---

## 13. OpenAI Codex App — Desktop AI Coding Partner

**What it is:** OpenAI's official Codex desktop application is a focused workspace for agentic software development. Launched for macOS in February 2026 (Windows support followed March 4), Codex provides a command center for working on code projects in parallel with built-in worktree support, Git functionality, and automations.

**April 2026 major update** transformed Codex from a coding assistant into a comprehensive development partner with computer use capabilities. More than 3 million developers use Codex weekly as of April 2026.

**Key capabilities (April 2026):**
- **Background Computer Use:** Codex can now use all apps on your computer by seeing, clicking, and typing with its own cursor (macOS; EU/UK rollout pending)
- **Enhanced developer workflows:** Review PRs, view multiple files & terminals simultaneously, connect to remote devboxes via SSH
- **In-app browser:** Faster iteration on frontend designs, apps, and games without switching windows
- **Image generation:** Create visual assets within the development workflow
- **Preference memory:** Remembers your coding style and preferences across sessions
- **Learning from actions:** Adapts based on your previous development patterns
- **Ongoing work management:** Takes on repeatable tasks and long-running automation

**Availability:** Included with ChatGPT Plus, Pro, Business, Edu, and Enterprise plans.

**When a non-engineer would care:** While Codex targets developers, enterprise non-engineers encounter it when:
- Reviewing technical proposals (Codex helps developers generate and explain architectural decisions)
- Understanding system capabilities (Codex can diagram and document existing systems for non-technical stakeholders)
- Collaborating with development teams (developers using Codex can produce clearer documentation and visual explanations)

**Example use case (enterprise context):** A project manager needs to understand the current state of a data pipeline. A developer uses Codex to generate a visual diagram of the pipeline architecture, export documentation explaining each component in business terms, and create a dashboard showing current performance metrics — all within Codex's interface, then shared with the non-technical team.

**Computer Use implications:** The April 2026 Computer Use capability means Codex can interact with any software on the developer's machine, including design tools, databases, deployment platforms, and communication apps. This shifts Codex from "code editor assistant" to "development environment orchestrator."

**Transparency note:** While Codex is widely used by developers, its direct relevance to non-engineering mining professionals is limited. Its inclusion here reflects the tools-context.md brief to cover it, but for Section G audience targeting, the focus should be on how Codex outputs (documentation, diagrams, system explanations) facilitate cross-functional collaboration rather than the coding capabilities themselves.

**Citations:**
- [OpenAI Developers: Codex App](https://developers.openai.com/codex/app)
- [OpenAI Blog: Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- [SmartScope: Codex Desktop Major Update April 2026](https://smartscope.blog/en/generative-ai/chatgpt/codex-desktop-major-update-april-2026/)
- [Microsoft Store: Codex - Download on Windows](https://apps.microsoft.com/detail/9plm9xgg6vks?hl=en-US&gl=US)

---

## Additional Context: Google Tools Brief Summaries

### Google Workspace Intelligence
The underlying AI system that understands semantic relationships across your Workspace apps, turning scattered emails, chats, docs, and files into a cohesive knowledge graph. Powers the reasoning capabilities that Workspace Studio uses for automation.

### Google Gemini Gems
Custom AI personas you create with detailed instructions, personalities, and knowledge bases for repeatable tasks. Key features include:
- PACT framework (Persona, Assignment, Context, Template) for consistent behavior
- Multimodal integration (text, images, links)
- Sharing functionality for team collaboration
- Super Gems (2026) with buttons and forms that resemble custom apps
- Free tier includes Gems along with image generation, Canvas, and Gemini Live voice

**Example:** Create a "Safety Report Reviewer" Gem trained on company safety standards that reviews incident reports for completeness and compliance — invoke it whenever reviewing reports for consistent analysis.

### Google NotebookLM (2026 Major Updates)
AI research tool and thinking partner. Major 2026 features:
- **Cinematic Video Overviews:** Immersive videos with animations and visuals for learning topics
- **Ten infographic styles:** Sketch Note, Kawaii, Professional, Scientific, Anime, Clay, Editorial, Instructional, Bento Grid, Bricks
- **Slide revisions & PPTX export:** Edit generated presentations and export to PowerPoint
- **Improved flashcards & quizzes:** Progress saved across sessions, mark cards as mastered or missed
- **EPUB support:** Upload eBooks as source material
- **Artifact creation in chat:** Transform conversations into Audio Overviews, Video Overviews, reports without leaving chat
- **Education integration:** Students 18+ can create notebooks for courses in Google Classroom
- Runs on Gemini 3 models (as of March 2026)

### Google Stitch
AI-native UI design tool acquired from Galileo AI in May 2025, integrated with Gemini. March 2026 update added:
- **Multi-screen generation:** Describe an entire app flow, get up to 5 interconnected screens
- **AI-native infinite canvas:** Explore ideas with images, text, code; design agent tracks progress
- **Voice commands:** Real-time design critiques
- **Code export:** HTML, CSS, Tailwind, Vue.js, Angular, Flutter, SwiftUI
- **Pricing:** Free with daily limits (400 design credits, 15 redesign credits = ~12,450 monthly credits)
- Requires only a standard Google account, no payment

---

## Summary & Key Themes

**Democratization:** Tools like OpenClaw (messaging-first AI), n8n MCP (natural language workflows), and Google Stitch (no-code design) lower technical barriers — you describe outcomes, AI handles implementation.

**Persistent context:** Hermes Agent (learning over time), Claude Projects (knowledge containers), and Gemini Gems (reusable personas) solve the "explain everything again" problem by remembering context across sessions.

**Mobile-first flexibility:** Claude Dispatch/Remote Control and Workspace Studio (invoke skills anywhere in Workspace) enable work from anywhere, not just at your desk.

**Visual-first interfaces:** Claude Interactive Diagrams, NotebookLM's infographics/videos, and Gemini Canvas shift from "describe in text" to "show me visually" — reducing cognitive load for complex topics.

**Enterprise-ready governance:** Workspace Studio governance controls, NotebookLM's private conversation history, and Claude's security model (Remote Control never opens inbound ports) address organizational security requirements.

**Agent specialization:** Built-in Claude Code agents (Explore, Plan, Task) and Gemini Gems demonstrate movement toward "many specialized assistants" rather than "one general chatbot."

**Gap acknowledgment:** Several tools (Claude Plugins catalog details, Codex direct enterprise use cases for non-engineers) have limited public documentation targeting non-technical audiences. This reflects tools still evolving or primarily serving technical users, with cross-functional applications emerging over time.

---

**Research methodology:** Cross-referenced multiple sources for each tool where possible. Noted instances where public information is limited or where enterprise-only features lack detailed documentation. All claims tied to cited sources dated 2026 or explicitly describing 2026 capabilities.
