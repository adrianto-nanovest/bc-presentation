# NotebookLM Claude Code Plugin: Capability Research

**Date:** 2026-05-07  
**Research Scope:** `/Users/macbook/Projects/_nanovest_bitbucket/mcp-notebooklm/plugin/notebooklm` (plugin files only)

---

## 1. What It Is

A comprehensive Claude Code plugin that extends NotebookLM's notebook, source, and content-generation capabilities through CLI and MCP interfaces, enabling multi-surface notebook orchestration, hybrid research (notebook + local + web), and session-based "second brain" architecture with automatic knowledge compilation.

---

## 2. Workflow Capabilities

### Core Notebook & Source Operations
- **Notebook management:** create, list, rename, delete, describe (with AI summaries and suggested topics)
- **Source ingestion:** add sources via URL, plain text, local file, or Google Drive; list, rename, delete, refresh, and check freshness
- **Bulk source operations:** batch add in chunks of 10; parallel freshness checks across all sources; selective sync of stale sources

### Query & Research
- **Single-notebook query:** RAG-powered question answering with AI-generated citations
- **Cross-notebook synthesis:** query multiple notebooks in parallel and synthesize findings with contradiction detection
- **Hybrid research:** combine notebook RAG with local file search (Grep, Read, Glob) and web search (WebSearch, WebFetch)
- **Follow-up conversations:** maintain multi-turn chat history within notebooks with configurable chat goals and response length

### Content Generation (Studio Artifacts)
- **Generation types:** audio podcasts, video summaries, written reports, quizzes, flashcards, infographics, slide decks, data tables, mind maps
- **Export artifacts:** push generated reports to Google Docs or data tables to Google Sheets
- **Selective generation:** target specific sources or apply custom instructions and language overrides
- **Async task tracking:** monitor generation progress and download completed artifacts

### Second Brain (Compounding Knowledge Archive)
- **Session capture:** distill current work into structured markdown with frontmatter (What we did / Decisions / Learnings / Open threads / Systems touched)
- **Promotion workflow:** review captured sessions, push to "compiler" notebook as sources, auto-compile updates to a living `00-Wiki` synthesis
- **Micro-compilation:** after each session promotion, automatically update the wiki's affected sections with new citations
- **Deep recompilation:** batch-recompile entire wiki from all local sessions with user review gate before publication
- **Pull-to-cache:** retrieve relevant past work from cross-notebook research into local `.nlm-brain/researches/` directories for offline RAG
- **Refresh state:** reconcile local project config against actual NotebookLM notebooks, update graph metadata, and flag stale sources

### Discovery & Orchestration
- **Web research integration:** discover new sources via web search and Drive search, with ranked notebook recommendations for queries
- **Notebook discovery:** auto-discover relevant notebooks for a topic before querying
- **YouTube curation:** discover and add YouTube videos as sources with caption validation
- **Website crawling:** crawl a website and import multiple pages as sources
- **Research tasks:** start async research jobs (web or Drive) and import discovered sources into notebooks

### Settings & Collaboration
- **Chat configuration:** customize notebook chat behavior with goals, custom prompts, and response lengths
- **Language settings:** set output language for all artifact generation
- **Sharing:** control notebook public-link access and invite collaborators with role-based permissions (viewer, editor, owner)
- **Profiles:** manage multiple Google accounts with automatic profile switching

---

## 3. Integrated Tools & MCPs

### MCP Tools (FastMCP Server)
The plugin exposes a FastMCP server (`notebooklm-mcp`) with 50+ typed tools:

**Notebook Tools:**
- `notebook_list`, `notebook_create`, `notebook_get`, `notebook_rename`, `notebook_delete`, `notebook_describe`

**Source Tools:**
- `source_list`, `source_add` (url/text/file/drive), `source_get`, `source_get_content`, `source_delete`, `source_rename`, `source_refresh`
- `source_check_freshness`, `source_check_freshness_all`, `source_sync_stale`

**Query & Chat Tools:**
- `notebook_query` (RAG with citations), `chat_history`, `chat_configure`

**Note Tools:**
- `note_list`, `note_create`, `note_update`, `note_delete`

**Sharing Tools:**
- `notebook_share_status`, `notebook_share_public`, `notebook_share_invite`

**Studio/Artifact Tools:**
- `studio_create` (generate audio/video/report/quiz/flashcards/infographic/slide_deck/data_table/mind_map)
- `studio_status`, `studio_delete`
- `download_artifact` (audio/video/report/quiz/flashcards/infographic/slide_deck/mind_map/data_table)

**Research Tools:**
- `research_start` (web or Drive), `research_status`, `research_import`

**Export Tools:**
- `export_artifact` (docs/sheets)

**Auth & Profile Tools:**
- `save_auth_tokens`, `refresh_auth`
- `profile_add`, `profile_add_complete`, `profile_list`, `profile_status`, `profile_use`, `profile_remove`, `profile_reset`

**Settings & Info Tools:**
- `set_language`, `server_info`

### CLI Commands (notebooklm / nlm)

**Upstream inherited commands:**
- `nlm list` — list notebooks
- `nlm create <name>` — create notebook
- `nlm source add <url>` — add source
- `nlm ask <query>` — query notebook (RAG)
- `nlm generate <type> <prompt>` — start generation
- `nlm artifact list` — list artifacts
- `nlm download <type> <path>` — download artifact
- `nlm auth check` — verify auth status

**Platform-added commands:**

Profile Management:
- `nlm profile list` — show all profiles and active marker
- `nlm profile use <name>` — switch active profile
- `nlm profile status` — show active profile details and storage paths
- `nlm profile add <name>` — create new profile and log in
- `nlm profile remove <name>` — delete profile and auth data

Export:
- `nlm export-sheets <artifact-id>` — export data table to Google Sheets
- `nlm export-docs <artifact-id>` — export report to Google Docs

System:
- `nlm login [--auto|--manual|--playwright|--browser chrome|msedge|chromium]` — authenticate to NotebookLM (system Chrome by default, Playwright fallback, or manual cookie paste)
- `nlm reset` — wipe all profiles and auth (irreversible)
- `nlm update [--force]` — upgrade wrapper and refresh upstream dependencies from PyPI
- `nlm setup mcp [--target desktop|code-cli|both|--only desktop|code-cli|--dry-run|--force|--skip-verify|--binary-path <path>]` — register MCP in Claude Desktop or Code CLI config

### External Service Integration

**Google APIs:**
- **NotebookLM API:** all notebook/source/chat/artifact/research operations (upstream `notebooklm-py@0.3.4`)
- **Google Sheets:** `export_to_sheets` tool pushes data tables to Google Sheets (via Playwright automation)
- **Google Docs:** `export_to_docs` tool pushes reports to Google Docs (via Playwright automation)
- **Google Drive:** source discovery, Drive file import as sources, Drive quota checks

**Authentication:**
- **Google OAuth 2.0:** via Playwright (system Chrome → Edge → Playwright Chromium) with storage-state persistence
- **Profile-scoped auth:** separate Playwright browser profiles per Google account; no shared session

**Transport:**
- **CLI:** Click-based CLI with Click context helpers (JSON output, notebook options, auth decorators)
- **MCP:** FastMCP with stdio (default) or streamable-http transport (configurable port, default 8000)

---

## 4. Sub-Agents & Skills

### Main Skills (User-Facing)

**`nlm`** — NotebookLM Domain Expert
- Role: Route user intents (research, generation, source mgmt, notebook ops) to appropriate workflows
- Capabilities: Single-command workflows (list, create, add source), routing for complex ops to agents, agent dispatch protocol (Phase 1 discovery → user approval → Phase 2 execution)
- Integration: Preloads agent skills; provides CLI quick reference and gotchas matrix
- Agent dispatch triggers:
  - `deep-researcher` — hybrid RAG (notebook + local + web)
  - `cross-notebook-query` — cross-notebook synthesis
  - `youtube-curator` — YouTube discovery and bulk add
  - `drive-scout` — Drive file search and import
  - `url-crawler` — website crawl and page import
  - `studio-producer` — long-running generation

**`nlm-setup`** — Install, Auth, & Config
- Role: Idempotent setup for CLI, MCP, and authentication across surfaces (CLI, Desktop Code, Cowork)
- Capabilities: Capability-based install (prerequisite detection), auth flow (system Chrome + Playwright fallback), MCP registration, environment detection (Cowork via Desktop Commander, local Bash, unsupported surface)
- Pre-flight checks: `nlm` binary, auth status, Node/uv/Python versions, Desktop/Code CLI presence
- Integration: Suggests itself when `nlm` is missing or auth expired; coordinated prerequisite install via shell scripts

**`nlm-second-brain`** — Compounding Knowledge Archive
- Role: Turn NotebookLM into a persistent, synchronized second brain across sessions
- Capabilities: Capture sessions to markdown, promote to compiler notebooks, auto-compile wikis, pull past work into local cache, deep-recompile with review gate, refresh state reconciliation
- Bindings: Per-workspace compiler notebook (new or existing), optional accumulator notebooks for bulk research
- Integration: Stores state in `.nlm-brain/` (sessions/, wikis/, researches/) + `~/.notebooklm/brain/` (global config, graph, compile history)

### Sub-Agents (Dispatched from `nlm` skill)

**`deep-researcher`**
- Role: Hybrid research across notebook sources, local files, and the web
- Workflow: Decompose question → parallel nlm RAG → assess coverage → gap-fill (local Grep/Read or WebSearch/WebFetch) → synthesize
- Output: Findings by topic + citation table with source type (nlm/local/web) + optional suggested note
- Scope: `notebook-only`, `notebook+local`, or `notebook+local+web` (user intent or default)

**`cross-notebook-query`**
- Role: Query and synthesize across multiple notebooks with contradiction detection
- Workflow: Discovery phase (list notebooks, title + metadata scan, rank by relevance, present to user) → Query phase (parallel initial queries, follow-up on weak answers, synthesize, detect contradictions)
- Output: Ranked recommendation list in discovery phase; per-notebook summary + overall synthesis in query phase; optional `## Contradictions` section

**`youtube-curator`**
- Role: Discover YouTube videos by topic, validate captions, bulk-add as sources
- Workflow: Two-phase dispatch (Phase 1: search and present list; Phase 2: add with caption validation and size filtering)
- Constraint: Prunes sources < 500 bytes of extracted text (caption-less videos)

**`drive-scout`**
- Role: Search Google Drive by topic, bulk-import files as sources
- Workflow: Two-phase (Phase 1: search and present list; Phase 2: add with quota checks and chunk batching)
- Constraint: Caps at 20 sources per operation; circuit-breaker on 3 consecutive failures

**`url-crawler`**
- Role: Crawl a website, discover pages, bulk-import as sources
- Workflow: Two-phase (Phase 1: crawl and present page list; Phase 2: add with URL validation)
- Constraint: Batch adds in chunks of 10; respects robots.txt

**`brain-compiler`**
- Role: Rebuild `00-Wiki` holistically from all local session sources
- Workflow: Read local sessions from `.nlm-brain/sessions/` + repo context → synthesize → produce draft → return diff
- Trigger: Called by Deep recompile operation; user reviews diff before publish
- Integration: Takes local session files as input; returns structured wiki update

---

## 5. Orchestration Topology

### Agent Orchestration Graph

```
┌─────────────────────────────────────────────────────────────────┐
│ Claude (Main Harness)                                           │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ User Intent                                               │   │
│ │ (research, generate, manage, capture)                    │   │
│ └───────────────────────────────────────────────────────────┘   │
│                            ↓                                      │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ Skill Router (nlm skill)                                  │   │
│ │ - Route by intent type                                   │   │
│ │ - Simple ops → direct CLI                                │   │
│ │ - Complex ops → dispatch agents                          │   │
│ └───────────────────────────────────────────────────────────┘   │
│     ↓                    ↓                    ↓                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Direct CLI Path       Multi-Source Path      Capture Path    │
│ (≤3 commands)         (agents in parallel)   (second-brain)  │
│ - list                - deep-researcher      - nlm-second-   │
│ - create              - cross-notebook-      brain skill     │
│ - ask                 query                  - Capture       │
│ - source add          - youtube-curator      - Promote       │
│ - generate            - drive-scout          - Micro-compile │
│ - download            - url-crawler          - Pull          │
│ - export              - studio-producer      - Deep recompile│
│                                                               │
└──────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
┌──────────────────────────────────────────────────────────────┐
│ NotebookLM Upstream (notebooklm-py client)                   │
│ - Notebook API                                               │
│ - Source API (CRUD + refresh + research)                    │
│ - Chat API (query + history + config)                       │
│ - Artifact API (generate + download + list)                 │
│ - Note API                                                   │
│ - Sharing API                                                │
│ - Research API (web + Drive discovery)                      │
│ - Settings API                                               │
└──────────────────────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────────────────────┐
│ Google APIs                                                   │
│ - NotebookLM Service                                         │
│ - Google Sheets (export-to-sheets)                           │
│ - Google Docs (export-to-docs)                              │
│ - Google Drive (file search, Drive source import)           │
│ - Google OAuth 2.0 (Playwright-mediated)                    │
└──────────────────────────────────────────────────────────────┘

      Local File System (Second Brain Archive)
         ↓
      .nlm-brain/
      ├── sessions/       (captured work)
      ├── wikis/         (compiled knowledge)
      └── researches/    (pulled past work)
      
      ~/.notebooklm/brain/
      ├── config.json    (global notebook registry)
      ├── graph.json     (citation graph + backlinks)
      └── logs/          (compilation history)
```

### Execution Modes

**Sequential within Skill:**
- Pre-flight checks → routing decision → workflow → output
- No concurrency at the main skill level

**Parallel within Agents:**
- Deep-researcher: all sub-queries to nlm in parallel (10-20s wall time)
- Cross-notebook-query: initial queries to all approved notebooks in parallel
- Source discovery agents (youtube, drive, url): two-phase with discovery parallelization
- Freshness checks: `source_check_freshness_all` checks all sources in parallel

**Async Tracking (Studio Producer):**
- `studio_create` returns task_id; user polls `studio_status` until completion
- Downloads via `download_artifact` after generation finishes

**Local-First (Second Brain):**
- Capture and micro-compile modify local files first (P2: local is authoritative)
- Then push to nlm via delete-by-title + add idiom (P1a: title-based identity)
- Graph updates are append-only and non-breaking

### Tool Dispatch Patterns

**CLI-first:** Direct CLI invocation via Bash for single commands, programmatic JSON parsing for agent workflows
- `nlm` commands return structured text or JSON (with `--json` flag)
- All agents use `--json` output for parsing

**MCP-opt-in:** Users who prefer typed MCP tools over CLI can run `nlm setup mcp` to register the FastMCP server
- Workflows remain tool-agnostic; Claude picks best available path
- MCP transport: stdio (default) or streamable-http

**Retry-on-auth:** All nlm calls route through a wrapper that detects 401/session-expired and retries once after prompting for re-auth
- If second call fails, user is directed to `nlm login` and operation is paused
- Never auto-retries or prompts for credentials in silent mode

---

## 6. CLI Commands Summary

### Notebook Operations
```
nlm list                              # list all notebooks
nlm create "Title"                    # create notebook
nlm use <id>                          # switch active notebook
nlm metadata -n <id> --json           # notebook metadata + source summary
nlm rename -n <id> "New Title"        # rename notebook
nlm delete -n <id> -y                 # delete notebook
```

### Source Operations
```
nlm source add "https://example.com"  # add URL source
nlm source add <path-to-file.md>      # add local file source
nlm source list -n <id> --json        # list sources in notebook
nlm source get -n <id> <src-id>       # get source details
nlm source fulltext <src-id>          # get raw content from source
nlm source delete -n <id> <src-id>    # delete source
nlm source rename -n <id> <src-id> "New Title"  # rename source
nlm source refresh -n <id> <src-id>   # refresh URL/Drive source
```

### Query & Chat
```
nlm ask "question" -n <id>            # query notebook RAG
nlm ask "q" -n <id> --json            # query with JSON output
nlm ask "q" -s <src-id>               # query specific source only
nlm ask "q" -c <conv-id>              # follow-up in conversation
```

### Generation & Artifacts
```
nlm generate audio "Create a podcast about X"   # start audio generation
nlm generate report "Write an analysis of X"    # start report generation
nlm generate quiz "Create a quiz on X"          # start quiz generation
nlm artifact list -n <id>                       # list all artifacts
nlm artifact list -n <id> --type audio          # list by type
nlm download audio <artifact-id> ./path/        # download artifact
```

### Export
```
nlm export-sheets <artifact-id> --title "My Table"   # export to Sheets
nlm export-docs <artifact-id> --title "My Report"    # export to Docs
```

### Profile Management
```
nlm profile list                      # list all profiles
nlm profile list --json               # list profiles (JSON)
nlm profile use <name>                # switch active profile
nlm profile status                    # show active profile details
nlm profile add <name>                # create new profile + login
nlm profile remove <name>             # delete profile
```

### Authentication
```
nlm login                             # login (system Chrome by default)
nlm login --auto                      # auto-detect login completion
nlm login --manual                    # paste cookies from Chrome DevTools
nlm login --playwright                # force Playwright Chromium
nlm login --browser chrome            # force system Chrome
nlm login --browser msedge            # force Edge
nlm auth check                        # verify auth status
```

### System
```
nlm reset                             # wipe all profiles and auth
nlm update                            # upgrade wrapper + refresh deps
nlm update --force                    # force reinstall everything
nlm setup mcp --target desktop        # register MCP in Desktop
nlm setup mcp --target code-cli       # register MCP in Code CLI
nlm setup mcp --dry-run               # preview planned registrations
nlm help                              # show all commands
nlm <command> --help                  # command-specific help
```

---

## 7. Authentication Flow

### Initial Login

1. **Invoke:** `nlm login` or `nlm profile add <name>` or `/nlm-setup` skill
2. **Browser Launch:** System Chrome attempted; falls back to Edge, then Playwright Chromium
3. **User Interaction:** Playwright keeps browser window open; user logs into Google account in browser
4. **Session Capture (Manual Mode):** User returns to terminal after login, presses ENTER
5. **Auto-Detect Mode:** CLI polls for SID cookie; auto-detects login completion and closes browser (no terminal interaction)
6. **Storage:** Session state (cookies + origin data) saved to `~/.notebooklm/storage_state.json` (or profile-scoped `~/.notebooklm/profiles/<name>/storage_state.json`)
7. **Extraction:** Best-effort email extraction from page for profile registration

### Multi-Profile Support

- **Default profile:** created automatically on first `nlm login`
- **Additional profiles:** `nlm profile add <name>` creates new profile with separate Google account
- **Active profile:** read from `~/.notebooklm/config.json` (`active_profile` field)
- **Profile switching:** `nlm profile use <name>` persists choice; all subsequent nlm commands use the switched profile
- **Env override:** `NOTEBOOKLM_HOME` env var can target specific profile directory

### Session Management

- **Session cookies expire:** every 1-2 weeks (Google's security policy)
- **Automatic refresh:** `refresh_auth()` MCP tool or `nlm login` when mid-session failure occurs
- **Prompt for re-auth:** Any 401/session-expired error surfaces "Run `nlm login` to re-auth"
- **Never prompts for credentials:** Only directs user to login flow; no manual username/password handling

### Security Invariants

- **No credentials in context:** Auth files are never echoed, catted, or included in conversation context
- **File permissions:** `chmod 600` on storage_state.json (user read/write only)
- **Profile isolation:** Each profile has separate storage_state, context, and browser profile directory
- **Cowork safety net:** `.secrets/storage_state.json` provides local fallback if Desktop Commander fails mid-session

---

## 8. File Inventory

### Plugin Structure

```
/Users/macbook/Projects/_nanovest_bitbucket/mcp-notebooklm/plugin/notebooklm/
├── .claude-plugin/
│   └── plugin.json                    # Claude Code plugin manifest (name, version, description)
├── .mcp.json                          # MCP server config (registers desktop-commander)
├── agents/                            # Dispatched sub-agents (6 agents)
│   ├── deep-researcher.md             # Hybrid RAG agent
│   ├── cross-notebook-query.md         # Cross-notebook agent
│   ├── brain-compiler.md              # Wiki compilation agent
│   ├── youtube-curator.md             # YouTube discovery agent
│   ├── drive-scout.md                 # Drive search agent
│   └── url-crawler.md                 # Website crawl agent
├── skills/                            # User-facing skills (3 skills)
│   ├── nlm/                           # NotebookLM domain expert
│   │   ├── SKILL.md                   # Main skill definition + routing matrix
│   │   └── references/                # 8 reference docs
│   │       ├── studio-prompting.md
│   │       ├── rag-patterns.md
│   │       ├── workflow-patterns.md
│   │       ├── generation-guide.md
│   │       ├── personas.md
│   │       ├── gotchas.md
│   │       ├── auth-troubleshooting.md
│   │       └── chat-usage-tips.md
│   ├── nlm-setup/                     # Install + auth setup
│   │   ├── SKILL.md                   # Setup process (8 phases)
│   │   └── references/                # 3 reference docs
│   │       ├── decision-table.md
│   │       ├── prerequisites-install.md
│   │       └── mcp-setup-patterns.md
│   └── nlm-second-brain/              # Second brain compounding
│       ├── SKILL.md                   # Full specification (Capture/Promote/Pull/Deep recompile/Refresh)
│       └── references/                # 10 reference docs
│           ├── local-layout.md
│           ├── nlm-wrapper.md
│           ├── surface-detection.md
│           ├── capture-distillation-template.md
│           ├── compiler-prompt.md
│           ├── meta-sources.md
│           ├── memory-integration.md
│           ├── pull-operation.md
│           ├── staleness-signals.md
│           ├── deep-recompile.md
│           ├── config-schema.md
│           ├── graph-schema.md
│           ├── refresh-operation.md
│           └── gotchas.md
└── platform/                          # Python MCP server + CLI wrapper
    ├── pyproject.toml                 # Package config + entry points (notebooklm, nlm, notebooklm-mcp)
    └── src/notebooklm_platform/
        ├── __init__.py                # Version
        ├── cli.py                     # Click CLI wrapper (~870 lines)
        ├── server.py                  # FastMCP server with 50+ tools (~960 lines)
        ├── config.py                  # Config helpers (home dir, cache paths)
        ├── profile.py                 # Profile manager (list, add, switch, remove)
        ├── secrets_cache.py           # Cowork .secrets/ cache
        ├── version.py                 # Version check and update logic
        ├── setup_mcp.py               # MCP registration logic
        └── tools/
            ├── export.py              # Google Sheets/Docs export via Playwright
            └── auth_tools.py          # Cookie save/load helpers
```

### Total Lines of Code (Platform)

- **cli.py:** ~870 lines (CLI commands, login flows, profile mgmt, reset, update)
- **server.py:** ~960 lines (50+ MCP tools, profile tools, auth tools, info tools)
- **config.py:** ~20 lines
- **profile.py:** ~200 lines (profile CRUD, ProfileManager)
- **secrets_cache.py:** ~100 lines
- **version.py:** ~150 lines
- **setup_mcp.py:** ~300 lines (auto-detection, registration logic)
- **export.py:** ~200 lines (Playwright-based export)
- **auth_tools.py:** ~50 lines

**Skill + Reference Docs:** ~40 markdown files, ~6000 lines total (specification + runbooks)

---

## 9. Harness Topology for Animation

### Conceptual Node Graph (4 Layers)

```
┌─ LAYER 1: User Entry Points ─────────────────────────────────┐
│                                                               │
│   User Intent Node                                            │
│   (text: "research X", "add sources", "wrap up")             │
│                                                               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ↓
┌─ LAYER 2: Main Harness (Claude) ────────────────────────────┐
│                                                               │
│   Dispatch Router                                             │
│   ├─ pre-flight: check nlm installed + auth valid            │
│   ├─ route by intent type                                    │
│   └─ choose: direct CLI vs agent dispatch                    │
│                                                               │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌─ LAYER 3: Agent/Workflow Nodes ──────────────────────────────┐
│                                                               │
│  Direct Path         Agent Path             Second-Brain Path │
│  ┌──────────┐         ┌──────────────┐       ┌──────────┐     │
│  │  CLI     │         │  Deep        │       │  Capture │     │
│  │Commands  │         │  Researcher  │       │          │     │
│  │(seq)     │         │  (parallel   │       │  ↓       │     │
│  │          │         │   RAG)       │       │ Promote  │     │
│  │  1. ask  │         │              │       │          │     │
│  │  2.list  │         │ ↓ gap-fill   │       │  ↓       │     │
│  │  3.add   │         │ (local+web)  │       │ Micro-   │     │
│  │ (3 cmds) │         │              │       │ compile  │     │
│  │          │         │  ↓           │       │          │     │
│  │wall: ~1s │         │  Synthesize  │       │ (silent) │     │
│  └──────────┘         └──────────────┘       └──────────┘     │
│                                                               │
│  Cross-notebook      YouTube/Drive        Pull (from wiki)   │
│  Query (2-phase)     Curator (2-phase)    Deep Recompile     │
│  ├─ discovery        ├─ search            ├─ rehydrate       │
│  ├─ approval         ├─ approval          ├─ synthesize      │
│  └─ query            └─ add               ├─ diff + review   │
│                                           └─ publish         │
│                                                               │
│ wall times:                                                   │
│ - simple CLI: ~1-5s                                           │
│ - parallel agents: ~15-30s (network I/O dominant)           │
│ - deep recompile: ~30s-2min (depends on session count)      │
│ - studio generation: 5-45 min (async, polled)               │
│                                                               │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌─ LAYER 4: Backend Services ──────────────────────────────────┐
│                                                               │
│  NotebookLM Client (notebooklm-py ~0.3.4)                    │
│  ├─ notebooks API                                            │
│  ├─ sources API (CRUD + refresh)                             │
│  ├─ chat API (query + history)                               │
│  ├─ artifacts API (generate + download)                      │
│  ├─ notes API                                                │
│  ├─ sharing API                                              │
│  ├─ research API (web + Drive discovery)                     │
│  └─ settings API                                             │
│                                                               │
│  Google Services (via notebooklm-py + Playwright)            │
│  ├─ NotebookLM backend                                       │
│  ├─ Google Sheets (export-to-sheets)                         │
│  ├─ Google Docs (export-to-docs)                             │
│  ├─ Google Drive (file search, Drive sources)                │
│  └─ Google OAuth 2.0 (Playwright auth bridge)                │
│                                                               │
│  Local Filesystem (Second Brain Archive)                      │
│  ├─ .nlm-brain/sessions/                                     │
│  ├─ .nlm-brain/wikis/                                        │
│  ├─ .nlm-brain/researches/                                   │
│  ├─ ~/.notebooklm/brain/config.json                          │
│  ├─ ~/.notebooklm/brain/graph.json                           │
│  └─ ~/.notebooklm/brain/logs/                                │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Sequential Execution Timelines

**Timeline 1: Simple Query**
```
User: "ask about X"
│
→ Dispatch Router: direct-path
│
→ CLI: nlm ask "about X" -n <id> --json
│
→ NotebookLM API: RAG search
│
→ Return: answer + references
│
wall time: 3-5 seconds
```

**Timeline 2: Deep Researcher (Hybrid RAG)**
```
User: "research X across sources and web"
│
→ Dispatch Router: agent-path
│
→ Deep Researcher Agent:
│   ├─ Decompose question into 3-4 sub-queries
│   │
│   ├─ Parallel phase (wall ~12s):
│   │   ├─ nlm ask sub-q-1 → API
│   │   ├─ nlm ask sub-q-2 → API
│   │   └─ nlm ask sub-q-3 → API
│   │
│   ├─ Assess coverage
│   │
│   ├─ Gap-fill phase (if needed, wall ~10s):
│   │   ├─ Grep local files (in parallel)
│   │   └─ WebSearch + WebFetch (in parallel)
│   │
│   └─ Synthesize findings + citation table
│
→ Return: findings + sources + optional note save prompt
│
wall time: 20-30 seconds (network dominant)
```

**Timeline 3: Second-Brain Wrap-Up (Capture + Promote + Micro-compile)**
```
User: "wrap up"
│
→ Dispatch Router: second-brain-path
│
→ Bootstrap check (if needed):
│   ├─ Ask compiler notebook choice
│   └─ Create or link notebook
│
→ Capture phase:
│   ├─ Read conversation history
│   ├─ Distill into session structure (What/Decisions/Learnings/Threads/Tools)
│   └─ Write to .nlm-brain/sessions/YYYY-MM-DD-<slug>.md
│       → Present for review
│
→ User: "promote"
│
→ Promote phase:
│   ├─ nlm source delete-by-title <title> (if exists)
│   ├─ nlm source add <session-file> → returns source_id
│   ├─ Update session frontmatter (status: closed, source_id, timestamps)
│   │
│   └─ Micro-compile (silent):
│       ├─ Fetch current 00-Wiki from nlm
│       ├─ Claude synthesizes wiki delta from session
│       ├─ nlm source delete-by-title "00-Wiki"
│       ├─ nlm source add <updated-wiki-file> → returns new source_id
│       ├─ Write to .nlm-brain/wikis/00-Wiki-current.md
│       └─ Log entry to compile-history.jsonl
│
→ Return: "✓ Session saved. ✓ 00-Wiki updated. ✓ Memory synced."
│
wall time: 15-30 seconds (depends on session size)
```

**Timeline 4: Deep Recompile (Review-Gated)**
```
User: "compile wiki"
│
→ Deep Recompile Operation:
│   ├─ Staleness check (query compile-history.jsonl)
│   │
│   ├─ Rehydrate phase:
│   │   └─ nlm source list → download missing sessions locally
│   │
│   ├─ Dispatch brain-compiler sub-agent:
│   │   ├─ Read all local session files
│   │   ├─ Claude synthesizes holistic wiki
│   │   └─ Write draft to .nlm-brain/wikis/00-Wiki-recompile-pending.md
│   │
│   ├─ Review phase:
│   │   ├─ Compute diff between current and pending
│   │   ├─ Present to user with truncated/full view option
│   │   └─ Await approval
│   │
│   ├─ Publish phase (on approval):
│   │   ├─ Find or create Archive notebook
│   │   ├─ Push current wiki to archive as wiki-v<n>-<date>
│   │   ├─ nlm source delete-by-title "00-Wiki"
│   │   ├─ nlm source add <pending-wiki>
│   │   ├─ Move pending → current locally
│   │   ├─ Log entry to compile-history.jsonl
│   │   └─ Write graph edges for citations
│   │
│   └─ On reject: delete pending, log rejection, no publish
│
→ Return: summary of changes or "rejected"
│
wall time: 30s-2min (depends on session count and diff size)
```

### Animation Stages (Conceptual)

1. **Initialization (0-1s):** Pre-flight checks (which nlm? auth valid?)
2. **Routing (1s):** Decide execution path based on intent
3. **Execution (varies):**
   - Direct CLI: sequential command execution
   - Agents: parallel sub-tasks, convergence at synthesis
   - Second-brain: multi-step with user review gates
4. **Completion:** Return findings or confirmation

### Concurrency Patterns

**High parallelism:** Deep-researcher gap-fill (local Grep + WebSearch in parallel), Cross-notebook initial queries (all notebooks in parallel), Freshness checks (all sources in parallel)

**Sequential with review gates:** Capture → Review → Promote → Micro-compile, Deep Recompile → Diff → Review → Publish

**Async polling:** Studio generation (task_id returned immediately; user polls studio_status in background until completion)

---

## Appendix: Key Design Principles

1. **Local-first (P2):** Local files are authoritative for session content; nlm is the archive
2. **Title-based identity (P1a):** Compiler notebook sources identified by (notebook_id, title), not source_id
3. **Source-id identity (P1b):** Accumulator sources identified by (notebook_id, source_id) with title cache
4. **Workspace-scoped (P5):** pwd at invocation is the workspace root; no traversal up directory tree
5. **Retry-on-auth (P4):** Every nlm call routes through a wrapper that detects 401 and retries once
6. **Narrow allowlist (P3):** Only README/CLAUDE.md/CHANGELOG/MEMORY auto-pushed; never glob the repo
7. **Review gates:** No publish to nlm without prior user-visible review (Promote, Deep Recompile)
8. **Non-destructive logging:** Compile history, graph edges, and refresh logs append-only; no pruning

---

**Report compiled:** 2026-05-07  
**Research subject:** NotebookLM Claude Code Plugin  
**Plugin path:** `/Users/macbook/Projects/_nanovest_bitbucket/mcp-notebooklm/plugin/notebooklm`
