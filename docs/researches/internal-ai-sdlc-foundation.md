# Nanovest AI SDLC Foundation: Content & Design Mining Report
**For:** Berau Coal Energy (BCE) AI Workshop (~400 employees, 240 minutes)
**From:** Nanovest AI Foundation Presentation (26-slide deck) + Source Repository
**Date:** 2026-05-06
**Status:** Complete Research & Reusability Analysis

---

## Executive Summary

### Top 5 Reusable Elements (Content + Design)

**CONTENT REUSE:**

1. **"The Dumb Zone" Concept** (Slides 4 → BCE Topic 1-4)
   - Core insight: AI performance degrades past 60% context usage
   - Traffic light system (green/yellow/red) is immediately memorable
   - Directly addresses BCE's "AI engineering fundamentals" topic
   - **Verdict:** HIGHLY REUSABLE — foundational to all AI tooling training

2. **Plugin Stack Architecture** (Slides 8-13 → BCE Topic 5)
   - Layered framework: Commands (user-invoked) → Agents (delegated) → Skills (automatic) → Base (always loaded)
   - Progressive disclosure pattern for skills (metadata → instructions → resources)
   - Hooks + MCP integration examples
   - **Verdict:** CORE CONTENT — maps directly to "AI Techniques" and "Tools ecosystem" topics

3. **6-Step AI Development Workflow** (Slide 14 → BCE Topic 3, 9)
   - Research → Brainstorm → Plan → Implement → Test → Ship
   - Universal structure applicable across vibe coding, TDG, SDD, and Ralph Wiggum
   - Subagent offloading pattern reduces context bloat
   - **Verdict:** FOUNDATIONAL PATTERN — works for BCE's process improvement angle

4. **Ralph Wiggum Pattern (Autonomous Iteration)** (Slides 15-20 → BCE Topic 9)
   - Loop-based autonomous development with failure-driven learning
   - Artifact hierarchy: JTBD → Topics → Specs → Implementation Plan
   - Cost reduction: $50K MVP → $297 (99.4% savings)
   - Maps to Agile (Theme → Epic → Stories → Tasks)
   - **Verdict:** TRANSFORMATIVE PATTERN — demonstrates "how to start adopting AI" with concrete ROI

5. **V-Bounce Human-AI Collaboration Model** (Slide 23 → BCE Topic 2, 8)
   - Time shift: Specify (30%) → Generate (20%) → Verify (50%)
   - Developer as orchestrator, not executor
   - Mindset transformation for mining industry (process-oriented workers)
   - **Verdict:** CRITICAL MINDSET SHIFT — aligns with BCE management's demand for "tangible prototype outputs"

**DESIGN REUSE:**

6. **Color Palette & Typography System**
   - Teal (#1a9ba1): Headlines, AI-driven elements, primary accent
   - Orange (#f5a623): Warnings, "BEFORE" states, caution
   - Green (#2ecc71): Success, "AFTER" states, human-driven elements
   - Dark navy (#253443): Dark slide backgrounds
   - Light off-white (#f5f7fa): Light slide backgrounds
   - Applied consistently across all 26 slides

7. **Before/After Card Layouts**
   - Two-column comparison with colored borders (orange left, green right)
   - Used in: Subagents slide, Mindset Shift slide, Agile Enhancement slide
   - Visual hierarchy: title → problem → solution → key insight

8. **Circular/Cyclical Diagram Patterns**
   - Context Lifecycle: 6 circular nodes with flow arrows
   - Ralph Wiggum Loop: 4-stage cycle with "while :; do" at center
   - Feedback Loop: PROMPT → EXECUTE → CHECK → LEARN (with retry arrow)
   - Effective for showing iterative processes in mining context

---

## Slide-by-Slide Content Breakdown

| # | Title | Core Point | BCE Topic Mapping | Reuse Verdict | Adaptation Notes |
|---|-------|-----------|-------------------|----------------|------------------|
| 1 | Title: AI SDLC Foundation | Branding, audience setup | N/A (opening) | ADAPT | Change "Nanovest Engineering" to "Berau Coal Energy" |
| 2 | The AI Productivity Paradox | Problem statement: developers feel faster but take 19% longer (METR Study) | Topic 2: Mindset transformation | REUSE | Quote METR study directly; mining context: "You use machines but aren't more productive?" |
| 3 | The "Almost Right" Problem | 66% of developers' frustration: AI code works but needs 5-10 iterations | Topic 1, 3: AI landscape & process improvements | REUSE | Change examples from "Java service" to mining domain (equipment control systems, safety checks) |
| 4 | The Dumb Zone — Compounding Effect | Traffic light system (0-30% peak, 30-60% acceptable, 60%+ dumb zone) | Topic 1, 4: AI evolution & AI engineering fundamentals | **HIGHLY REUSE** | Perfect visual for mining engineers; explain cost multiplier (pay full context every turn) |
| 5 | Fix #1: Monitor Your Context | cc-statusline tool (version, model, context %, token count) | Topic 4: AI engineering fundamentals | REUSE + ADAPT | Tool exists; may need customization for BCE's Claude Code setup |
| 6 | Fix #2: Offload to Subagents | Before/After: main agent bloated (85%) vs. orchestrator + subagents (20%) | Topic 4, 5: AI engineering & MCP/agent orchestration | REUSE | Directly applicable; mining parallel: delegate heavy tasks to specialists |
| 7 | The Context Lifecycle | 6-stage cycle: START FRESH → WORK & MONITOR → OFFLOAD → COMPACT → CLEAR → AVOID DUMB ZONE | Topic 4: AI engineering fundamentals | REUSE | Turn into daily ritual/habit for miners using AI tools |
| 8 | The Engineering Evolution | Three stages: Prompt Engineering → Context Engineering → **Harness Engineering** (plugins) | Topic 4, 5: AI engineering & AI techniques | REUSE | Frame as progression: "write better prompts" → "understand context" → "build infrastructure" |
| 9 | The Plugin Architecture | Internal: Commands/Agents/Skills/Base; External: Hooks/MCP + 8 integration logos | Topic 5, 6: AI techniques & tools ecosystem | **HIGHLY REUSE** | Nanovest's plugin system IS the differentiator; show how integration works in mining context |
| 10 | Skills: Automatic Domain Knowledge | Progressive disclosure (Metadata→Instructions→Resources); java-backend example | Topic 4, 5: AI engineering & AI techniques | REUSE | Replace java-backend with mining-domain examples (geology, equipment, safety protocols) |
| 11 | Agents & Commands: When to Use What | Commands (user-invoked, explicit) vs. Agents (Claude delegates) vs. Skills (automatic) | Topic 5: AI techniques | REUSE | Key insight: each agent has isolated context; perfect for explaining agent orchestration |
| 12 | Hooks & MCP: Real Examples | JIRA integration walkthrough; PostToolUse, PreToolUse event automation | Topic 5, 6: AI techniques & tools ecosystem | REUSE | Replace JIRA with mining/logistics systems (equipment tracking, incident management) |
| 13 | Nanovest Plugins: Ready to Use | nanovest-backend, nanovest-frontend, nanovest-qa available; installation steps | Topic 6: Tools ecosystem | ADAPT | Create BCE-specific plugins (mining-operations, safety-protocols, equipment-management) |
| 14 | The 6-Step AI Development Workflow | Research → Brainstorm → Plan → Implement → Test → Ship (with subagent offloading) | Topic 3, 9: Process improvements & adoption | **HIGHLY REUSE** | Universal; applies to any development task including process automation |
| 15 | Simple AI Development Patterns | Vibe Coding (prototyping risk) vs. Test-Driven Generation (quality) | Topic 3: Process improvements | REUSE | Mining context: Vibe coding for safety checks is risky; TDG for compliance-critical work |
| 16 | Spec-Driven Development (SDD) | Write spec → AI generates plan → human validates → AI implements → human verifies | Topic 3, 9: Process improvements & adoption | REUSE | "Specs are the new code" — perfect for mining SOP (Standard Operating Procedures) |
| 17 | The Ralph Wiggum Pattern | Named persistence loop; `while :; do cat PROMPT.md \| claude-code ; done` | Topic 9: Adoption | **HIGHLY REUSE** | Cost examples ($50K→$297) resonate with BCE management; shows ROI |
| 18 | The Artifact Hierarchy | JTBD → Topics → Specs → Implementation Plan (maps to Theme→Epic→Story→Task) | Topic 3, 9: Process improvements & adoption | REUSE | Mining parallel: Job → Areas of Work → Detailed Procedures → Task List |
| 19 | How the Loop Works (Feedback Mechanism) | Promise-based (tests pass) + Iteration-based (--max-iterations N) safety nets | Topic 5, 9: AI techniques & adoption | REUSE | Emphasize: "fail predictably, learn, retry" culture shift |
| 20 | Bringing It Together | SDD + Ralph + Plugins = Production-Ready SDLC (3-column: Human/Ralph/Plugins) | Topic 3, 5, 9: All technical topics | REUSE | Summary slide; shows integration of all concepts |
| 21 | AI Enhances Agile | Same ceremonies, faster execution; "bolts" (hours/days) within sprints | Topic 2, 3: Mindset & process improvements | REUSE | Mining teams already do sprint cycles; show how AI accelerates build phase |
| 22 | The Mindset Shift | Developer as EXECUTOR → ORCHESTRATOR; time shift (30% specify, 20% generate, 50% verify) | Topic 2, 8: Mindset transformation & best practices | **HIGHLY REUSE** | Critical for mining engineers moving from manual to AI-assisted work |
| 23 | The V-Bounce | Human (Specify→Verify) + AI (Generate); productivity multiplier model | Topic 2, 8: Mindset transformation & best practices | **HIGHLY REUSE** | Visualizes the collaboration loop; helps non-technical staff understand roles |
| 24 | Key Takeaways | 5 actionable items: Dumb Zone, Plugin Stack, Workflows, AI+Agile, Orchestrator role | Topic 8, 9: Best practices & adoption | REUSE | Adapt 5 points to BCE context |
| 25 | What's Next | 4 parallel workstreams: Plugin Evolution, Zero-Friction MCP, Knowledge Infrastructure, Quality Automation | Topic 9: Adoption roadmap | ADAPT | Replace with BCE-specific roadmap; show what's coming in their AI ecosystem |
| 26 | Handoff | Reja/Yohanes demo; resources & links | N/A (closing) | ADAPT | Point to BCE's equivalent demo/framework partners |

---

## Design & Animation Components from Nanovest Repository

### Source Repository Structure
**Location:** `/Users/macbook/Projects/_web_presentation/nanovest-ai-foundation-presentation/`

**Key files identified:**
- `CLAUDE.md` — Project documentation
- `docs/plans/2025-01-28-ai-sdlc-foundation-presentation.md` — Complete 26-slide specification
- `docs/brainstorm/2025-01-29-presentation-redesign-brainstorm.md` — Design decisions
- `docs/research/ralph-wiggum-pattern.md` — Deep dive (1200+ lines)
- `gemini_images/` — 12 PNG assets at 2752×1536 (16:9 aspect ratio)

**No custom HTML/CSS/JS components found** — Nanovest presentation uses:
- PowerPoint/PDF format (static slides)
- Generated images (Gemini AI at consistent 2752×1536 resolution)
- Markdown specifications for design handoff

### Reusable Design Patterns

#### Pattern 1: Traffic Light Status Indicators
**Used in:** "The Dumb Zone" slide
**Code concept (for HTML implementation):**
```
Three circular indicators (🟢 🟡 🔴) with:
- Green: 0-30% context (peak performance state)
- Yellow: 30-60% context (warning state)
- Red: 60%+ context (critical state)

Each zone includes:
- % range label
- Status description ("Peak Performance" / "Plan/Compact" / "Clear Now")
- Action text (color-coded)
```
**BCE Application:** Use same system for equipment status (operational/maintenance/critical), mining sites (active/caution/halt)

#### Pattern 2: Before/After Comparison Cards
**Used in:** Subagents, Mindset Shift, Agile Enhancement slides
**Structure:**
```
Left column (orange accent):              Right column (green accent):
┌─────────────────────────┐              ┌─────────────────────────┐
│ WITHOUT / BEFORE        │              │ WITH / AFTER            │
│ ────────────────        │              │ ───────────             │
│ Problem description     │              │ Solution outcome        │
│ Visual icon/diagram     │              │ Visual icon/diagram     │
│ Metric: 85%             │              │ Metric: 20%             │
└─────────────────────────┘              └─────────────────────────┘
```
**BCE Application:** Safety protocols (manual vs. AI-assisted), equipment maintenance (scheduled vs. predictive)

#### Pattern 3: Circular Flow Diagrams
**Used in:** Context Lifecycle (6 nodes), Ralph Wiggum (4 stages), Feedback Loop (4 stages)
**Key characteristics:**
- Circular arrows connecting nodes
- Icons/labels in center or at nodes
- Teal primary color for flow direction
- Action text in boxes around the circle
**BCE Application:** Mining process workflows (extraction → processing → safety checks → shipment)

#### Pattern 4: Layered Pyramid Structure
**Used in:** Artifact Hierarchy (4 levels)
**Structure:**
```
       Level 1: JTBD (narrow)
      /                      \
    Level 2: Topics (wider)
   /                          \
 Level 3: Specs (even wider)
/                              \
Level 4: Implementation Plan (widest)

Right sidebar: Agile mapping + scoping test
```
**BCE Application:** Organizational hierarchy or process decomposition (Strategic→Department→Team→Individual Task)

#### Pattern 5: Three-Column Integration Layout
**Used in:** "Bringing It Together" slide (YOU / RALPH / PLUGINS)
**Structure:**
```
┌─────────────┬──────────────┬──────────────┐
│ Orchestrate │ Execute      │ Guide        │
│ ────────────┼──────────────┼──────────────┤
│ Strategic   │ Autonomous   │ Standards    │
│ decisions   │ iteration    │ Quality gates│
└─────────────┴──────────────┴──────────────┘
```
**BCE Application:** Roles in mining automation (Engineer / Autonomous System / Safety Protocol)

### Image Assets & Specifications

**12 Generated Images (all 2752×1536, 16:9 aspect ratio):**

| # | File Name | Primary Purpose | Design Notes |
|---|-----------|-----------------|--------------|
| 1 | `01-the-dumb-zone.png` | Context degradation curve | Traffic light system, performance curve, warning icon |
| 2 | `02-cc-statusline-dashboard.png` | Tool UI showcase | Terminal-style mockup, context % bar, annotations |
| 3 | `03-context-offloading.png` | Before/after subagent comparison | Orange bloat (LEFT) vs. green distributed (RIGHT) |
| 4 | `04-context-lifecycle.png` | 6-stage circular cycle | Teal nodes with icons, circular flow, brain center |
| 5 | `05-plugin-architecture.png` | 4-layer + external systems | Internal boxes (teal) + External (purple/green) + MCP logos |
| 6 | `06-mindset-shift.png` | Developer role evolution | Silhouettes (gray BEFORE → green AFTER), large orange arrow |
| 7 | `08-ralph-wiggum-core-loop.png` | Iteration cycle | 4-stage loop (PROMPT→EXECUTE→CHECK→LEARN), bash code center |
| 8 | `09-artifact-hierarchy-pyramid.png` | 4-level hierarchy | Pyramid with colored levels, agile mapping sidebar |
| 9 | `10-feedback-loop-mechanism.png` | Ralph loop mechanics | 4-step cycle + exit conditions (promise/iteration), limits scale |
| 10 | `11-ralph-sdd-plugins-integration.png` | Three-column integration | Human/Ralph/Plugins columns with swim lanes |
| 11 | `12-engineering-evolution.png` | Three-stage progression | Orange→Teal→Green stages, bottom arrow "The Progression" |
| 12 | `20-ai-enhances-agile.png` | Sprint acceleration | Traditional vs. AI-enhanced comparison, "Bolts" callout |

**Color Consistency Across All Images:**
- Primary Teal: #1a9ba1 (headlines, UI elements, primary accent)
- Secondary Orange: #f5a623 (warnings, "before" states)
- Tertiary Green: #2ecc71 (success, "after" states)
- Dark Navy: #253443 (dark backgrounds, contrasts)
- Light Off-white: #f5f7fa (light backgrounds)
- Accent Gray: #718096 (muted text, secondary elements)

---

## Reusable Patterns: Typography, Color, Motion, Architecture

### Typography System
**Font Strategy (from Nanovest CLAUDE.md):**
- **Headlines:** Bold, condensed font (likely sans-serif like Inter, Roboto, or system font)
- **Body text:** Regular weight, readable line height (implied 1.5–1.6x)
- **Code/Terminal:** Monospace (for technical content like bash loops, config)
- **Callouts:** Italic for emphasis (e.g., "Specs are the new code")

**Size Hierarchy (inferred from slide importance):**
- Slide titles: Very large (60–80px equivalent)
- Section headers: Large (40–50px)
- Bullet points: Medium (24–32px)
- Annotations/captions: Small (16–20px)
- Code blocks: Monospace, smaller (12–14px)

### Color Application Rules

**Teal (#1a9ba1) — Use For:**
- Section headers and slide titles (underline accent)
- Primary action buttons/CTAs
- AI-driven elements, automation, "after" states
- Numbered circles (1, 2, 3 steps)
- Card borders (top border for AI-driven content)
- Progress indicators (fill color)

**Orange (#f5a623) — Use For:**
- Warning labels ("BEFORE", "CAUTION", "⚠")
- Problem statements, risks
- Older/outdated approaches
- Transient states ("accept edits on background task")
- Arrows showing transformation/change

**Green (#2ecc71) — Use For:**
- Success states, checkmarks (✓)
- "AFTER" labels, desired outcomes
- Human-driven elements, quality gates
- Positive metrics/results
- Card borders (top border for human-driven content)

**Navy Dark (#253443) — Use For:**
- Dark slide backgrounds (title slides, section dividers)
- Text on light backgrounds (for contrast)
- Important borders and frames

**Off-white (#f5f7fa) — Use For:**
- Light slide backgrounds (content slides)
- Card/box backgrounds

**Gray (#718096) — Use For:**
- Muted text, secondary information
- Disabled states
- Placeholder text

### Motion & Animation Patterns

**Identified Animation Types (from Nanovest plan):**

1. **Sequential reveal** — Bullet points appear one at a time
2. **Circular/cyclical motion** — Used in loops (Context Lifecycle, Ralph Wiggum, Feedback Loop)
3. **Flow arrows** — Animated arrows showing progression (6-Step, SDD, V-Bounce)
4. **Scale/emphasis** — Important callouts grow slightly or shift position
5. **Color fade** — Traffic light states changing (green→yellow→red)

**Recommended Animation Libraries for BCE Deck:**
- **Framer Motion** (React-based, smooth, beginner-friendly)
- **Reveal.js** (presentation-specific, easy to implement)
- **GSAP** (professional-grade, precise timing)
- **CSS Animations** (lightweight, no library needed)

**Animation Timing:**
- Bullet reveal: 0.3–0.5s per item
- Circular flows: 2–3s full cycle (loopable)
- Flow arrows: 0.8–1.2s traversal
- Color transitions: 0.5s (not too fast, not too slow)

### Slide Template Architecture

**Standard Slide Layout (from Nanovest):**

```
┌─────────────────────────────────────┐
│ TEAL ACCENT BAR                     │ ← 20–40px teal underline
├─────────────────────────────────────┤
│ SLIDE TITLE                         │ ← Large, bold
│ (Dark text on light, or light on    │
│  dark background)                   │
├─────────────────────────────────────┤
│                                     │
│  MAIN CONTENT AREA                  │ ← Diagram, bullet list, image
│  (Image, diagram, or text)          │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ [OPTIONAL] KEY INSIGHT BOX          │ ← Teal or purple border
│ "Critical takeaway in one sentence" │
└─────────────────────────────────────┘
```

**Variant: Two-Column Layout**
```
┌──────────────────┬──────────────────┐
│ BEFORE (Orange)  │ AFTER (Green)    │
│ ──────────────── │ ────────────────  │
│ Problem visual   │ Solution visual   │
│ Metric: 85%      │ Metric: 20%       │
└──────────────────┴──────────────────┘
```

**Variant: Three-Column Layout**
```
┌──────────────────┬──────────────────┬──────────────────┐
│ Col 1 (Green)    │ Col 2 (Orange)   │ Col 3 (Teal)     │
│ ──────────────── │ ──────────────── │ ──────────────── │
│ Human role       │ Ralph Wiggum     │ Plugin system    │
│ "Orchestrate"    │ "Execute"        │ "Guide"          │
└──────────────────┴──────────────────┴──────────────────┘
```

**Dark Slide (Title/Section Divider):**
- Background: Navy (#253443)
- Text: White (#ffffff)
- Accent: Teal underline or box
- Icon: Large, teal or white

---

## BCE Topic Mapping Summary

### How Nanovest Content Maps to BCE's 9 Topics

| BCE Topic | Nanovest Slides | Key Content | Reuse Level |
|-----------|-----------------|------------|------------|
| (1) AI evolution & landscapes | 2, 3, 4, 8 | Historical context (prompt → context → harness engineering); paradox study | REUSE |
| (2) AI mindset transformation | 2, 6, 22, 23 | Dumb Zone cost model; Developer as orchestrator; V-Bounce human-AI flow | **HIGHLY REUSE** |
| (3) Process improvements (BPA/RPA/IPA) | 3, 6, 7, 14, 15, 16, 18, 20, 21 | 6-Step workflow; SDD; 3 pattern types (Vibe/TDG/Ralph); Ralph cost savings | **HIGHLY REUSE** |
| (4) AI Engineering fundamentals | 4, 5, 7, 8, 9, 10, 11 | Dumb Zone mechanics; cc-statusline; Context lifecycle; Plugin architecture; Skills | **HIGHLY REUSE** |
| (5) AI Techniques (MCP/RAG/skills/orchestration) | 8, 9, 10, 11, 12, 13, 14, 20 | Plugin architecture; Skills progressive disclosure; Agents vs Commands; Hooks; MCP examples | **HIGHLY REUSE** |
| (6) Tools ecosystem (Claude/Google/OpenAI) | 5, 13 | cc-statusline tool; Nanovest plugin ecosystem; MCP integrations (JIRA, Google, Sentry, etc.) | ADAPT |
| (7) Common pitfalls | 3, 4 | "Almost right" problem; Dumb Zone; iteration spirals; context bloat | REUSE |
| (8) Best practices | 7, 14, 20, 24 | Context lifecycle discipline; 6-Step workflow; SDD; Plugin usage; Orchestrator mindset | REUSE |
| (9) How to start adopting AI | 14, 17, 18, 19, 24, 25 | Ralph Wiggum pattern; Cost ROI ($50K→$297); JTBD artifact hierarchy; Key takeaways | **HIGHLY REUSE** |

### Content Gaps (What BCE Needs to Add)

1. **Mining-specific examples** — Replace Java/React with mining domain examples (equipment control, geology analysis, safety protocols)
2. **Mining industry context** — References to mining operations, regulatory compliance (safety certifications, environmental standards)
3. **Internal tools/systems** — Replace Nanovest plugins with BCE's systems (mining equipment tracking, logistics, safety management)
4. **Localization** — References to Berau region, Indonesian context, local teams
5. **Prototype outcomes** — Show actual mining automation prototypes built with AI (required by BCE management)

---

## Source Citations

### Nanovest AI SDLC Foundation Deck
- **File:** `/Users/macbook/Projects/_web_presentation/berau-presentation/docs/references/nanovest-ai-sdlc-foundation.pdf`
- **Pages:** 27 pages total
- **Format:** PDF, animated HTML deck (embedded videos/interactions)
- **Content Quality:** Professional, research-backed (METR Study, Thoughtworks, GitHub, McKinsey references)

### Nanovest Source Repository
- **Location:** `/Users/macbook/Projects/_web_presentation/nanovest-ai-foundation-presentation/`
- **Key Documentation:**
  - `CLAUDE.md` — Project overview, style guide
  - `docs/plans/2025-01-28-ai-sdlc-foundation-presentation.md` — Full 26-slide spec with speaker notes
  - `docs/brainstorm/2025-01-29-presentation-redesign-brainstorm.md` — Design decisions, audience analysis, research findings
  - `docs/research/ralph-wiggum-pattern.md` — Comprehensive Ralph Wiggum deep dive (1200+ lines)
  - `docs/plans/2025-01-29-ralph-wiggum-slides-expansion.md` — Ralph Wiggum expansion plan (4 slides)
  - `docs/plans/2025-01-29-slide-25-whats-next-design.md` — Roadmap design
- **Assets:**
  - 12 PNG images at 2752×1536 (16:9 aspect ratio) in `gemini_images/`
  - Generated via Gemini AI with detailed YAML prompts
- **Reference Materials:**
  - `references/ai-workshop-sdlc.pdf` — Original workshop deck (predecessor)
  - `references/claude-code-token-usage-guide.md` — Technical reference
  - `references/official-docs.md` — Links to Claude Code, Anthropic, GitHub docs

### Research References Cited in Nanovest Materials
- **METR Study (2025)** — AI experienced developers took 19% longer with tools than without
- **GitHub Copilot Study** — 46% of developers write code with Copilot; 30% adoption rate
- **Thoughtworks** — "Spec-Driven Development: One of 2025's most important AI practices"
- **McKinsey** — Developer productivity multipliers with generative AI
- **Geoffrey Huntley (Creator, Ralph Wiggum Pattern)** — ghuntley.com/ralph/; GitHub: how-to-ralph-wiggum
- **Y Combinator W25** — 25% of batch had 95% AI-generated code using Ralph Wiggum pattern

### Official Documentation Links (from Nanovest materials)
- Claude Code Plugins: https://code.claude.com/docs/en/plugins
- Agent Skills: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Subagents: https://code.claude.com/docs/en/sub-agents
- Hooks Guide: https://code.claude.com/docs/en/hooks-guide
- MCP: https://code.claude.com/docs/en/mcp
- Anthropic Harnesses: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

---

## Recommendations for BCE Deck

### What to Reuse Directly
1. **Dumb Zone concept + traffic light system** (slides 4, 7)
2. **Plugin architecture diagram** (slides 8, 9)
3. **6-Step workflow + subagent offloading** (slide 14)
4. **Ralph Wiggum pattern + cost ROI** (slides 17–20)
5. **V-Bounce human-AI collaboration model** (slide 23)
6. **Mindset shift visualization** (slide 22)
7. **Color palette and design patterns** (all slides)

### What to Adapt for Mining Context
1. Replace technical examples (Java, React, JIRA) with mining domain examples
2. Create mining-specific skills (geological-analysis, equipment-maintenance, safety-protocols)
3. Adapt Ralph Wiggum cost example: Show mining operation ROI (e.g., $X → $Y savings)
4. Use mining Agile ceremonies (shift planning, site briefings) in "AI Enhances Agile" section
5. Replace Nanovest plugin stack with BCE's equivalent

### What to Add for Tangible Prototype Outputs
1. **Live demo segment** — Show AI-assisted mining operation automation in action
2. **Prototype gallery** — Before/after mining process improvements (2–3 examples)
3. **Cost calculator** — Interactive tool showing BCE's potential ROI
4. **Hands-on lab guide** — Step-by-step walkthrough for 120-min practice lab
5. **Prompt library** — Mining-specific prompts engineers can use immediately

### Design Recommendations
- **Keep the teal/orange/green color system** — It's proven effective and accessible
- **Use mining equipment/site photos** — Humanize the content for mining workers
- **Add progress bars** — Show context usage in real-time during demos
- **Circular diagrams for mining workflows** — Mine extraction → processing → safety → shipment → repeat
- **Before/after photos** — Manual mining process vs. AI-assisted process

---

## Conclusion

The Nanovest AI SDLC Foundation deck is **highly reusable** for BCE's workshop, particularly for:
- Foundational concepts (Dumb Zone, context management)
- Structural patterns (6-Step workflow, Ralph Wiggum, artifact hierarchy)
- Mindset transformation (orchestrator role, V-Bounce collaboration)
- Technical architecture (plugin stack, skills, agents)

**Estimated reuse:** 70% of Nanovest content directly applicable to BCE with domain adaptation.
**Estimated new content needed:** 30% (mining context, local examples, prototype demos).

The combination of **rigorous technical depth** (Nanovest) + **mining domain focus** (BCE) + **tangible prototypes** (management requirement) will create a powerful, practical AI workshop for 400 mining employees.

---

*End of Report*
*Generated: 2026-05-06*
*Report Version: 1.0*
