# Nanovest Product Plugin — Complete Capability Research

**Date:** May 2026 | **Plugin Version:** 1.0.0 | **Framing:** Neutral, objective

---

## 1. What It IS

A Claude Code plugin that orchestrates the end-to-end PRD (Product Requirements Document) lifecycle—from structured brainstorming through Confluence publishing and Jira task generation—using specialized sub-agents and integrated design, diagramming, and collaboration tools.

---

## 2. The 8-Phase Pipeline

The plugin implements a linear workflow with optional branches:

1. **Setup** (`init-setup`) — Environment detection and dependency installation. One-time configuration.
2. **Initialize** (`init-prd`) — Creates feature workspace, collects feature metadata (name, Figma URL, Jira project, team).
3. **Brainstorm** (`prd-brainstorm`) — Four-phase conversational discovery: open exploration, pattern recognition, deep Q&A, session wrap-up. Produces `session.md` and `prd-plan.md`.
4. **Draft** (`prd-drafter`) — Generates complete PRD from plan using plan-reviewer and draft-reviewer agents. Produces `prd-base.md`.
5. **Optional: Design Mapping** (`prd-figma`) — Analyzes Figma screens, maps to acceptance criteria, extracts bilingual UI copy (EN/ID). Produces `figma-mapping.md` and screenshots.
6. **Optional: Flowcharts** (`prd-flowchart`) — Designs and generates process diagrams (Mermaid/Excalidraw/Draw.io) with self-evaluation. Produces source files and PNG exports.
7. **Enrichment** (`prd-enricher`) — Merges Figma screens, copy tables, and flowcharts into PRD; applies ADF annotations for Confluence. Produces `prd-final.md`.
8. **Publish** (`prd-publish`) — Validates final document, converts to Confluence ADF format, creates/updates live page with image uploads. Produces live Confluence page (source of truth).

Post-publish skills (optional):
- **Edit** (`prd-edit`) — Modify published PRDs on Confluence
- **Parse** (`parse-prd`) — Export published PRDs as dev-ready markdown with structured index
- **Task Generation** (`task-generator`) — Create Jira Epic + Stories from PRD user stories (also used standalone)

---

## 3. Integrated Tools and MCP Connectors

### Primary Integrations (Required/Must-Have)

| Tool | Role | How Used |
|---|---|---|
| **Atlassian (Confluence + Jira)** | Document publishing, task tracking | MCP connector; prd-publish writes/updates Confluence pages; task-generator creates Jira issues |
| **Node.js (v18+)** | Execution runtime | Powers flowchart generation, export, credential helpers |

### Optional Tool Integrations (Enhanced Features)

| Tool | Role | How Used | Plugin Skills |
|---|---|---|---|
| **Figma** | Design source of truth | MCP connector; parallel screen analysis, screenshot export, metadata extraction | prd-figma, screen-analyzer |
| **Excalidraw** | Interactive diagram editing | MCP connector; diagram generation via flowchart-generator skill | prd-flowchart, flowchart-generator |
| **Draw.io** | Enterprise diagram editing | Desktop CLI + custom connector; diagram source generation and rendering | prd-flowchart, flowchart-generator |
| **Mermaid Chart** | Code-based diagramming | Web-based or native rendering; Mermaid syntax generation | prd-flowchart, flowchart-generator |
| **Google Drive (GWS)** | Team file sharing | Helper script; auto-sync PRD markdown and assets | prd-publish (step 3) |
| **Playwright + Chromium** | Headless diagram rendering | Optional; enables self-evaluation of Excalidraw/Mermaid diagrams | flowchart-generator |

---

## 4. Flowchart-Flow Capability (HIGHLIGHTED)

The plugin generates process flow diagrams at multiple levels of capability:

### Diagram Generation and Visualization

**Tool Support:**
- **Mermaid** — Code-based flowcharts; Confluence-native rendering (no export needed); fast iteration.
- **Excalidraw** — Interactive, hand-drawn aesthetic; JSON format; supports swimlanes, shape libraries, annotation layers.
- **Draw.io** — Enterprise-grade XML format; desktop CLI rendering; precise layout control, component libraries (BPMN, UML, AWS stencils).

**Output Quality:**
- Source files: Mermaid (.mmd), Excalidraw (.excalidraw JSON), Draw.io (XML)
- PNG exports: 3x scale production quality (via Playwright for Mermaid/Excalidraw, Draw.io Desktop CLI)
- Visual validation: Self-evaluation loop (render → read PNG → fix issues → re-render, max 5 iterations)

**Coverage and Traceability:**
- Diagrams mapped to user stories (section grouping in outline)
- Story boundaries extracted from PRD during design conversation
- Manifest.json tracks all diagrams: source path, export status, story mappings
- All diagrams in one PRD use the same tool (visual consistency enforced)

**Design Process:**
1. PRD-informed design conversation (reading flowchart section narratives + user stories)
2. Structured outline building with node types (process, decision, start, end, error, async, crossflow)
3. Decision condition clarification (API response, user action, error handling)
4. Tool selection scoring (affinity matrix) against full diagram set
5. Generation with quality feedback loop

**Embedding in Confluence:**
- Mermaid: rendered natively in ADF via extension node (no PNG attachment needed)
- Excalidraw/Draw.io: PNG embedded as mediaSingle node; source file available in references/

---

## 5. Sub-Agents and Skills

### Specialized Sub-Agents (Internally Dispatched)

| Agent | Purpose | Triggered By | Input | Output |
|---|---|---|---|---|
| **plan-reviewer** | Pre-draft validation of content plan | prd-drafter | prd-plan.md, session.md, PRD template | Coverage/depth/ambiguity/consistency issues |
| **draft-reviewer** | Post-draft validation of generated PRD | prd-drafter | prd-base.md, prd-plan.md, session.md, template | Structural and content quality issues |
| **research-agent** | External source lookup during brainstorm | prd-brainstorm | Research queries (Confluence, web, local files) | Structured summaries per source |
| **screen-analyzer** | Single Figma screen analysis (parallel) | prd-figma | Screen metadata, AC tables, terminology guide | Screenshot, caption, copy EN/ID, AC mapping |
| **validate-agent** | PRD validation before publishing | prd-publish, prd-edit | prd-final.md, validation checklist | Structural/content issues + auto-fix recommendations |
| **converter-agent** | Markdown to ADF JSON conversion | prd-publish, prd-edit | prd-final.md, ADF templates, email-accountId map | prd-adf.json, media-map.json |

### Primary Skills (User-Facing)

| Skill | Scope | Dispatch Mode |
|---|---|---|
| **init-setup** | Environment check and dependency install | Direct invocation |
| **init-prd** | Workspace creation and metadata collection | Direct invocation |
| **prd-brainstorm** | Interactive 4-phase requirements discovery | Direct invocation |
| **prd-drafter** | PRD generation (uses plan-reviewer + draft-reviewer agents) | Direct invocation; orchestrates agents |
| **prd-figma** | Figma discovery, screen analysis, copy extraction (uses screen-analyzer agents) | Direct invocation; spawns parallel agents |
| **prd-flowchart** | Diagram design conversation and generation (uses flowchart-generator) | Direct invocation; orchestrates generator skill |
| **flowchart-generator** | Internal diagram source generation (internal-only, called by prd-flowchart) | Sub-skill dispatch (not user-facing) |
| **prd-enricher** | Asset integration and ADF annotation | Direct invocation |
| **prd-publish** | Validation, conversion, Confluence publishing (uses validate-agent + converter-agent) | Direct invocation; orchestrates agents |
| **prd-edit** | Published PRD modification (uses validate-agent + converter-agent) | Direct invocation; orchestrates agents |
| **parse-prd** | Fetch published PRD as dev-ready markdown | Direct invocation |
| **task-generator** | Jira Epic + Story creation from user stories | Direct invocation; standalone or chained |

---

## 6. Orchestration Topology

### Main Agent → Sub-Agents → Tools

```
┌─────────────────────────────────────────────────────────────────┐
│                       USER (Claude Chat)                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────────┐
                    │  Main Plugin Agent  │
                    │  (routes to skills) │
                    └─────────────────────┘
                              ↓
        ┌─────────────────────┴─────────────────────┐
        ↓                                           ↓
  ┌──────────────┐                         ┌──────────────┐
  │ prd-brainstorm                        │ prd-drafter  │
  │   ├─ research-agent ──→ WebSearch     │   ├─ plan-reviewer
  │   │                   WebFetch        │   ├─ draft-reviewer
  │   └─ Confluence MCP                   │   └─ Read/Write
  │                                       │
  └──────────────┘                        └──────────────┘
        ↓                                         ↓
  ┌──────────────┐                         ┌──────────────┐
  │ prd-figma                              │ prd-flowchart│
  │   ├─ screen-analyzer                   │   ├─ flowchart-generator
  │   │   (parallel, all screens)          │   │   ├─ Mermaid generation
  │   │   └─ Figma MCP                     │   │   ├─ Excalidraw generation
  │   ├─ figma-cred-helper.js              │   │   ├─ Draw.io Desktop CLI
  │   │   └─ Bash/Node.js (OAuth/PAT)      │   │   ├─ export-preview.mjs
  │   └─ Google Drive                      │   │   └─ Playwright (optional)
  │       └─ gws-drive-helper.js           │   └─ Desktop Commander MCP
  │                                        │
  └──────────────┘                        └──────────────┘
        ↓                                         ↓
  ┌──────────────────────────────────────────────────────┐
  │              prd-enricher                            │
  │    (merges outputs from all optional steps)          │
  └──────────────────────────────────────────────────────┘
        ↓
  ┌──────────────────────────────────────────────────────┐
  │              prd-publish                             │
  │   ├─ validate-agent                                  │
  │   ├─ converter-agent                                 │
  │   └─ Confluence MCP (createPage, attachFile, update) │
  │   └─ Desktop Commander (DC) for host commands       │
  └──────────────────────────────────────────────────────┘
        ↓
  ┌──────────────────────────────────────────────────────┐
  │         LIVE CONFLUENCE PAGE (Source of Truth)       │
  └──────────────────────────────────────────────────────┘

Post-publish independent skills:
  · prd-edit  → validate-agent + converter-agent + Confluence MCP
  · parse-prd → Read/Write (dev export)
  · task-generator → Jira MCP (Epic + Stories)
```

**Execution Topology Summary:**
- **Sequential main pipeline:** init → brainstorm → draft → [optional: figma + flowchart] → enrich → publish
- **Parallel sub-agents:** All screens analyzed in parallel (prd-figma); flowchart-generator runs once per diagram
- **Tool firing pattern:**
  - Brainstorm: WebSearch + WebFetch (optional research-agent)
  - Figma: Figma MCP (metadata) + parallel screenshot exports
  - Flowchart: tool-specific generation (Mermaid text, Excalidraw JSON, Draw.io XML) + Playwright export
  - Publish: Confluence MCP for page create/update, credential helpers for image/Drive uploads

---

## 7. Workflow Input → Output

### User Input (Entry Point)

- **Feature name** (init-prd)
- **Feature metadata** — Figma URL (optional), Jira project, team assignment
- **Brainstorm responses** — Requirements, scope, constraints, design decisions
- **Optional design inputs** — Figma file/section URL, diagram descriptions
- **Confluence config** — Space key, existing page ID (if updating)

### Plugin Outputs (Artifacts and SSOT)

| Stage | Artifacts |
|---|---|
| **Brainstorm** | `brainstorm/session.md` (Q&A transcript), `plan/prd-plan.md` (content outline) |
| **Draft** | `draft/prd-base.md` (10-section PRD structure) |
| **Figma (optional)** | `references/figma-mapping.md` (screen→AC mapping), `references/figma-screen-analysis.md` (analysis cache), `assets/figma-*.png` (screenshots) |
| **Flowchart (optional)** | `flowcharts/flowchart-NN-*.{mmd,excalidraw,drawio}` (source), `flowcharts/flowchart-NN-*.png` (export), `flowcharts/manifest.json` (tracking) |
| **Enrich** | `enriched/prd-final.md` (markdown with ADF annotations) |
| **Publish** | **Live Confluence page** (source of truth), `prd-adf.json` (local artifact), `.prd-config.json` (updated with page ID, Jira links) |
| **Post-publish** | `prd-dev.md` (dev export), `prd-index.json` (structured index with Jira/Figma links) |

**Source of Truth:** Confluence page (after publish). All local markdown files are working artifacts.

---

## 8. Files Inventory

### Plugin Directory Structure

```
plugin/
├── README.md                          # User-facing overview
├── SETUP_GUIDE.md                     # Installation instructions
├── .claude-plugin/
│   └── plugin.json                    # Plugin metadata
├── hooks/
│   ├── hooks.json                     # Security hooks (PreToolUse)
│   └── block-credentials.sh           # Credential access blocker
├── agents/                            # Sub-agents
│   ├── plan-reviewer.md
│   ├── draft-reviewer.md
│   ├── research-agent.md
│   ├── screen-analyzer.md
│   ├── validate-agent.md
│   └── converter-agent.md
├── skills/
│   ├── init-setup/SKILL.md
│   ├── init-prd/SKILL.md
│   ├── prd-brainstorm/SKILL.md
│   ├── prd-drafter/SKILL.md
│   ├── prd-figma/
│   │   ├── SKILL.md
│   │   └── references/ (screen-analyzer-prompt, figma-mapping-template, metadata-grep-patterns, etc.)
│   ├── prd-flowchart/
│   │   ├── SKILL.md
│   │   └── references/ (diagram-design-guide, tool-selection-guide, tool-setup-guide, manifest-spec, etc.)
│   ├── flowchart-generator/
│   │   ├── SKILL.md
│   │   ├── scripts/ (excalidraw-skeleton-helper.js, export-preview.mjs, test-skeleton-helper.js)
│   │   └── references/ (color-palette, drawio-guide, excalidraw-guide, mermaid-guide, eval-criteria, design-patterns, element-templates, style-reference, etc.)
│   ├── prd-enricher/SKILL.md
│   ├── prd-publish/SKILL.md
│   ├── prd-edit/SKILL.md
│   ├── parse-prd/SKILL.md
│   ├── task-generator/SKILL.md
│   ├── shared-scripts/
│   │   ├── figma-cred-helper.js
│   │   ├── confluence-cred-helper.js
│   │   ├── oauth-helper.js
│   │   ├── gws-drive-helper.js
│   │   ├── adf-to-markdown.js
│   │   ├── env-reader.js
│   │   ├── deps-helper.js
│   │   ├── *.oauth.json (credential templates)
│   └── shared-refs/
│       ├── adf-templates/ (JSON templates for ADF nodes: toc, children, mermaid, jira-filter, jira-legacy)
│       ├── conversion-reference.md
│       ├── placeholder-spec.md
│       ├── validation-checklist.md
│       ├── terminology-guide.md
│       ├── prd-template-markdown.md
│       ├── project-subpods.json
│       ├── session-templates.md
│       ├── feature-toggle-guide.md
│       ├── event-tracking-guide.md
│       ├── error-handling-guide.md
│       ├── nfr-guide.md
│       ├── mcp-setup-guide.md
│       ├── nanovest-instance-config.md
│       ├── risk-assessment-guide.md
│       └── (additional guides for NFRs, edge cases, risk assessment)
```

### Workspace Artifacts (Created Per Feature)

```
feature-workspace/
├── .prd-config.json                   # Feature config (metadata, section selections, tool paths, confluence/jira IDs)
├── brainstorm/
│   ├── session.md                     # Q&A transcript
│   └── prd-plan.md                    # Content outline for drafting
├── draft/
│   └── prd-base.md                    # Generated PRD (sections 1-10)
├── references/
│   ├── figma-mapping.md               # Screen→AC mapping, copy tables (optional)
│   ├── figma-screen-analysis.md       # Analysis cache (optional)
│   └── *.md                           # Research files (from research-agent)
├── flowcharts/
│   ├── manifest.json                  # Diagram tracking (optional)
│   ├── .spec-flowchart-NN.json        # Diagram specifications
│   ├── flowchart-NN-*.mmd/.excalidraw/.drawio  # Source files
│   └── flowchart-NN-*.png             # Production PNG exports
├── assets/
│   ├── figma-*.png                    # Figma screenshots (optional)
│   └── flowchart-*.png                # Diagram PNG copies (optional)
├── enriched/
│   └── prd-final.md                   # Enriched PRD with ADF annotations
├── prd-adf.json                       # ADF JSON for Confluence (local artifact)
├── prd-adf-media-map.json             # UUID→attachment mapping
└── published/
    └── (export artifacts post-publish)
```

---

## Harness Topology for Animation

### Node-Graph Representation

**Nodes:**
1. **User** — entry point (represents PM/product manager)
2. **prd-brainstorm** — requirements discovery (4-phase conversation)
3. **prd-drafter** — PRD generation (uses plan-reviewer, draft-reviewer agents)
4. **prd-figma** — Figma analysis (parallel screen-analyzer agents)
5. **prd-flowchart** — diagram orchestration (uses flowchart-generator skill)
6. **flowchart-generator** — internal diagram source generation
7. **prd-enricher** — asset assembly and ADF annotation
8. **prd-publish** — validation, conversion, publishing (uses validate-agent, converter-agent agents)
9. **Confluence** — live Confluence page (SSOT)
10. **Jira** — task tracking (via task-generator)
11. **prd-edit** — post-publish editing
12. **parse-prd** — dev export
13. **task-generator** — standalone Jira task creation

**Edges (Sequential):**
- User → prd-brainstorm → prd-drafter (always)
- prd-drafter → prd-figma (optional branch)
- prd-drafter → prd-flowchart (optional branch)
- prd-figma → prd-enricher (if executed)
- prd-flowchart → prd-enricher (if executed)
- (prd-figma and prd-flowchart run in parallel, both feed to enricher)
- prd-enricher → prd-publish (always after enrichment)
- prd-publish → Confluence (always)
- prd-publish → Jira (optional: task-generator can run mid-enrichment or post-publish)
- Confluence ← prd-edit (post-publish iteration)
- Confluence → parse-prd (post-publish dev export)

**Parallel Execution Zones:**
- **During prd-figma:** All screen-analyzer agents run in parallel (one per screen)
- **During prd-flowchart:** Diagram generation delegated to flowchart-generator (one invocation per diagram, diagrams queued sequentially)
- **Optional: prd-figma and prd-flowchart can run in parallel** if both are specified after draft completes

**Tool Firing Pattern:**
- **Brainstorm phase:** WebSearch, WebFetch, Confluence MCP (research-agent, optional)
- **Figma phase:** Figma MCP (metadata), parallel Figma exports (screenshots), Google Drive sync
- **Flowchart phase:** Mermaid text generation OR Excalidraw JSON + skeleton helper OR Draw.io XML + Desktop CLI + Playwright export
- **Enrichment phase:** Read/Write operations, ADF annotation synthesis
- **Publish phase:** Validate + Convert agents, Confluence MCP (page create/update), image upload, Google Drive sync

**Animatable Transitions:**
- Brainstorm → Draft: show session.md transcript building, then plan outline construction
- Draft → Figma: show parallel screen boxes lighting up (one per screen), each with copy extraction and AC mapping
- Figma/Flowchart → Enricher: show asset boxes (screenshots, diagrams) merging into PRD sections
- Enricher → Publish: show ADF annotation injection (status badges, dates, mentions, layout structures)
- Publish → Confluence: show page creation and image upload progress
- Post-publish: show edit/parse/task-gen as independent branches from the Confluence page

---

## End of Research

**Document generated:** 2026-05-07 | **Plugin scope:** `/Users/macbook/Projects/_nanovest_bitbucket/nanovest-confluence/plugin` | **Data freshness:** Current version v1.0.0 | **No audience bias applied.**
