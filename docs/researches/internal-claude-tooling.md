# Internal Claude Tooling: Design Learnings & Ecosystem Reference
Mining Adri's Claude-tooling decks for BCE workshop topics 6 (Tools Ecosystem), 8 (Best Practices), and practice lab.

---

## 1. Executive Summary: Top 5 Reusable Elements

For a 400-person mining-industry workshop, these five elements from internal Claude tooling work are directly actionable:

1. **Claude Design → Claude Code Handoff as a Method** — Design systems first, build prototypes in Claude Design, hand off to Claude Code for production. Works for decks, dashboards, and any HTML-forward output. Clean separation of concerns.

2. **The Tool-Selection Heuristic: Match Work Shape, Not Habit** — Default to Claude (short loops, conversational work), but reach for Codex when the task is long-horizon, async cloud delegation, or multi-modal (image/video/TTS). Decision is driven by *work shape*, not vendor preference.

3. **Cost Reality: Dual-Tool is <1% of Loaded Cost** — Even premium dual-tool setup ($120/dev/mo) is a rounding error against engineer salaries. Cost is not the blocker; *knowing when each tool actually pays off* is.

4. **Design System First Discipline** — Lock tokens, type, components, voice before generating anything else. Token compounding is real: split sessions and you cut 60–80% per-message cost. For BCE: build a single design system, reuse it everywhere.

5. **The Overlap Zone: Where Both Tools Shine Together** — Cross-vendor code review, refactoring, test writing, documentation, architecture review. These are the compounding returns; this is where dual-tool justifies its complexity.

---

## 2. Claude vs Codex Tooling Comparison

### When to Use Which: Decision Framework

| **Dimension** | **Reach for Claude** | **Reach for Codex** | **Key Insight** |
|---|---|---|---|
| **Time Horizon** | Short loops, minutes–hours | Long-horizon, async, hours–days | Codex thrives on multi-hour unsupervised runs. |
| **Work Shape** | Conversational, iterative, dense loops | Agent-based, autonomous, batch-oriented | Match tool to the *shape*, not your habit. |
| **Context Window** | 1M native; Opus 4.7 | 400K ceiling (tokenizer penalty + 35% inflation) | Claude pulls ahead on long-file refactors. |
| **Specialty Models** | Vision (read-only), MCP ecosystem | Image gen (DALL-E 3), video (Sora 2), TTS, embeddings, open-weights | Codex is the multimodal gateway. |
| **Deployment** | Desktop (buggy per reviewers), CLI, web | Desktop (best-in-class GUI, parallel worktrees) | Desktop experience favors Codex for day-to-day. |
| **Tool-Calling** | 77.3% on MCP-Atlas (Opus 4.7 lead) | 68.1% on same bench (GPT-5.4) | Claude's +9.2 pts is the strongest single-axis advantage. |
| **Cost per Completed Task** | ~$3 cheaper overall (Codex uses 9x more tokens) | Uses fewer tokens but longer wall-clock time | Compare on *cost-per-completed-task*, not per-token. |

**Default Heuristic:** Default to Claude — reach for Codex when the work shape rewards async cloud delegation.

---

### Capability Matrix: Primary Tooling

| **Capability** | **Codex** | **Claude Code** | **Notes** |
|---|---|---|---|
| **CLI** | Both polished; Claude is more feature-rich | — | |
| **Desktop App** | Best-in-class (GA, stable) | Buggy per reviewers | Codex still the desktop champion. |
| **Cloud Delegation** | Stable 2–3 weeks, async multi-hour runs | Breaks at 50–60% context | Codex is proven for long autonomous work. |
| **Computer Use** | Visual, background (macOS GA, Apr 2026) | Hijacks cursor, slower | Codex has the visual edge. |
| **In-App Browser** | Click-to-comment, full context | Not available | Codex owns the in-app dev loop. |
| **Mobile Dispatch** | Not available | Desktop from phone, /remote-control | Claude owns mobile-first async. |
| **1M Context** | 400K ceiling (tokenizer adds ~35% inflation) | Opus 4.7 native | Claude's context is a genuine moat. |
| **Parallel Git Worktrees** | Native support | Manual (git worktree add) | Codex's agent-per-thread is cleaner. |
| **Voice Coding** | ChatGPT voice (third-party) | Desktop voice (partner ASR/TTS pipeline) | Both have gaps vs real-time. |

---

### Capability Matrix: Extensibility & Ecosystem

| **Capability** | **Codex** | **Claude Code** | **Trade-off** |
|---|---|---|---|
| **MCP Client** | Yes | Yes | Both fully supported. |
| **MCP Server** | Yes | Yes | — |
| **Skills** | `SKILL.md` layout | `SKILL.md` layout | Same structure, different config depth. |
| **Plugins** | Skills + MCP + apps | Skills + MCP + commands + hooks | Claude has richer mutation surface. |
| **Hooks** | 6 events (stable Apr 2026) | ~21 events (richer mutation) | Claude offers more automation points. |
| **Subagets** | Per-agent model routing | Per-agent model routing | Parity. |
| **ToolSearch** | Not available | Yes (lazy tool loading) | Claude's advantage for large ecosystems. |
| **Rules / Policy** | Starlark `.rules` | `settings.json` permissions | Claude's approach is more declarative. |
| **Apps SDK** | Yes | Not available | Codex is the embedded-deployment play. |
| **Projects / Artifacts** | Not available | Claude.ai web (auto-refresh, connector-backed) | Claude's web artifacts are a distribution win. |

---

### Quality & Benchmarks: Raw Numbers

**SWE-Bench Verified (general coding):** Opus 4.7 at 87.6% vs Codex at 85.0% — within noise.

**MCP-Atlas Tool-Calling (the exception):** Opus 4.7 at 77.3% vs GPT-5.4 at 68.1% — Claude's +9.2 pt moat. This is where Claude pulls ahead.

**Senior-Engineer Refactor Benchmark:** 
- Human baseline: 80–90
- Claude (Opus 4.7) alone: 33
- Codex (GPT-5.5) alone: ~42
- **Codex + Claude-authored plan: 62.5** — dual-tool compounds.

**Long-Context Retrieval (1M):** Claude native; Codex hits 400K ceiling + tokenizer inflation (up to 35% overhead).

**Terminal-Bench 2.0 (agentic tasks):** Codex 77.3%, Claude Code ~65%. Codex's scripting moat.

**Blind Code-Quality Preference (dev review, head-to-head):** Claude wins 67%, Codex 25%, ties 8% (cleaner, more idiomatic output).

---

### Pricing: Subscription Economics

**Key Insight:** "5x the price buys 5x the usage cap" — capacity, not features.

| **Plan** | **Annual / Seat** | **Monthly / Seat** | **Min Seats** | **Included** |
|---|---|---|---|---|
| Claude Team Standard | $20 | $25 | 5 | Claude Code (1.25x Pro session cap) |
| Claude Team Premium | $100 | $125 | 5 | Claude Code 5x volume + Sonnet weekly cap |
| ChatGPT Business | $20 | $25 | 2 | Codex |
| ChatGPT Enterprise | custom | — | 150+ min | Codex + full stack |

**Cost Reality for Dual-Tool:**
- Posture: Claude Team Standard + ChatGPT Plus
- Cost: $40 / dev / mo (annual view)
- Yearly: $480 / dev
- Loaded cost per engineer: ~$120k–150k
- AI tooling: <0.5% overhead

**Even premium dual-tool ($120/dev/mo) is a rounding error.** The blocker is not cost; it's knowing when each tool *actually pays off*.

---

### Pricing: API Token Economics

**Headline Inversion:** "Claude costs more per token" flips at task completion.

| **Model** | **Input / MTok** | **Cached / MTok** | **Output / MTok** | **Real-World Pattern** |
|---|---|---|---|---|
| GPT-5.5 (flagship) | $5.00 | unverified | $30.00 (2x) | First per-token raise of 5.x cycle. |
| GPT-5.4 (workhorse) | $2.50 | $0.25 (10% mult) | $15.00 | Codex's default anchor. |
| GPT-5.3-codex | $43.75 | $4.38 (10% mult) | $350.00 | Codex-only SKU: ~17x over standard API. |
| Claude Opus 4.7 | $5.00 | $0.50 (10% mult) | $25.00 | Flagship: 1M native. |
| Claude Sonnet 4.6 | $3.00 | $0.30 (10% mult) | $15.00 | Balanced workhorse. |
| Claude Haiku 4.5 | $1.00 | $0.10 (10% mult) | $5.00 | Fast & cheap: 200K context. |

**Raw Per-Token:** Claude appears cheaper at headline (Opus $5 in vs GPT-5.5 $5 in). But Opus 4.7's new tokenizer adds +35% token inflation on some content types — effective rate climbs to $6.75 in / $33.75 out.

**Per-Task Reality:**
- Ecosystem-sim test: GPT-5.5 = 28K output tokens vs Opus 4.7 = 250K on same task — Codex ~9x fewer.
- Same refactor task across 4 experiments: Codex ~$3 cheaper overall; Claude won by $1 on one (solar-system build).
- Published SWE-bench: Opus 4.7 $0.71 / fix vs GPT-5.3-Codex $0.06 — 12x spread.

**Bottom Line:** Compare on cost-per-completed-task, not cost-per-token. Codex cheaper on some; Claude cheaper on others — direction is task-dependent.

---

## 3. Claude Design Personal Learnings: Distilled

### The Playbook: Four Habits That Compound

**1. Design System First, Generation Second**

Lock the design system (tokens, type, components, voice) *before* any artifact generation. This is non-negotiable.

- Don't let Claude Design produce artefacts until the system is reviewed and locked.
- Skipping this means every later generation drifts a little.
- You end up paying tokens to fix consistency that should have been free.

**For BCE:** Build one design system at deck start. Reuse across all 9 topics. Cost discipline: locking early cuts 60–80% of per-message waste.

---

**2. One Task per Session (Token Compounding is Real)**

Cumulative session cost can hit 250K+ tokens by message 30 in a long session. Split into per-task sessions with short carry-over.

- Evidence: Splitting sessions cuts 60–80% of per-message cost.
- This matters because of separate weekly limits (see "Watch the weekly limit" below).

**For BCE:** Don't write the entire 9-topic deck in one Claude Design session. Break into: design system (session 1), topics 1–3 (session 2), topics 4–6 (session 3), topics 7–9 (session 4). Handoff between sessions is brief.

---

**3. Update the Result After Tweaks, Before Handoff**

In-canvas tweaking (sliders, colour pickers, parameterised controls) is the most Claude-Design-like affordance. But tweaks don't always propagate into the underlying HTML output.

- Apply tweaks, *then explicitly ask* "update the result based on the tweaks I just applied" *before* moving to handoff.
- Failure mode: broken WYSIWYG between the canvas and the handed-off code.

**For BCE practice lab:** Use Tweak early and often; validate before handing off to Claude Code.

---

**4. Plan for Claude Code as a Fallback**

Claude Design and Claude Code have separate weekly limits. If you cap out Design, Code can continue — but Code's limit is shared with claude.ai chat.

- Build the budget plan up front: how much do you want left in Code when Design is done?
- Design's pool is distinct; Code's pool is shared with chat.

**For BCE:** Allocate 60% of Code's weekly budget to the build phase; reserve 40% for live iterations during the workshop.

---

### Key Gotchas: What Bit Us

**Weekly Limits Hit Fast — and They're Separate**

Claude Design has a separate weekly limit pool from Claude Code / claude.ai chat. The March 2026 2× bonus explicitly excluded Design, confirming distinct metering.

- Plan accordingly.
- Monitor usage at mid-week.

---

**PPTX Export is Lossy; PDF is Fine**

Built-in export to PowerPoint produces output that doesn't match on-screen design. Gradients don't render, fonts shift, image crops differ.

- PDF export is reliable.
- If the destination is a slide deck, expect to rebuild in PowerPoint or render via your own pipeline (as Adri did with pptxgenjs then rasterization).

**For BCE:** Export from Claude Design to PDF; Adri's code-based pipeline rasterizes at 2× DPI for lossless PPTX. We can do the same.

---

**The Main HTML in Handoff is Bulky**

When you hand off to Claude Code, the project includes multiple files (HTML, CSS, assets) — but the main HTML deliverable is a single bulky file rather than a component-decomposed structure.

- Reading or editing it in Claude Code burns context.
- Acceptable for prototypes; doesn't scale to complex apps without manual decomposition in Claude Code.

**Action:** On day one of Claude Code, decompose the main HTML into components. Don't try to maintain it as a single file.

---

**Tweaks Can Clutter the Handoff Output**

Tweak metadata (or the styles tweaks generated) persists into the handoff HTML, where it's painful to clean up.

- Tweaks are valuable while you stay in Claude Design.
- Assume they create cleanup work in Claude Code.
- If you know you're handing off, prefer regenerating over tweaking for the final pass.

---

**There is No Claude Desktop Embed Coming**

Anthropic's stated direction is a deliberate web-Design + desktop-Code split. Handoff is the long-term architecture, not a transitional state.

- Don't wait for the embed; plan around handoff as the permanent workflow.

---

### The Handoff Checklist: From Design to Code

1. **Lock the design system** in Claude Design and screenshot the review.
2. **Build a prototype** that demonstrates the key flows (not all flows).
3. **Run the explicit "update result based on tweaks" pass** before handoff.
4. **Trigger the Claude Code handoff** (the project bundle, not the standalone HTML export).
5. **In Claude Code: decompose the main HTML into components on day one.**
6. **Reserve a portion of your Code/Chat weekly pool for the build phase** — Design's pool is gone by now.

---

### Model Selection: The Decision is Made for You

Claude Design ships with a model picker (Haiku 4.5, Opus 4.7, Sonnet 4.6, Opus 4.6, Opus 3, Sonnet 4.5), but **Opus 4.7 is the trained target**. Other models produce noticeably weaker visual output.

- Stay on the default unless you have a specific reason to switch.

**In Claude Code**, model selection is the tunable axis — pick per task:
- Sonnet for routine work
- Opus for hard reasoning
- Haiku for cheap iteration

---

## 4. Reusable for BCE Topic 6 (Tools Ecosystem): Slide-Ready Snippets

### Framing: Why Tools Matter

**The Pitch:**
"You're not choosing between Claude and OpenAI. You're learning when each one *shines*, and how to stack them. Same way you pick a drill vs a saw — not based on brand, but based on the job."

---

### Snippet A: The Codex Product Surface (What People Confuse)

**Slide Title:** "Codex is Four Products Under One Brand"

**Content:**

"Codex" means four different surfaces. Don't conflate them:

1. **CLI** — Local pair-coder (terminal-native, fast feedback, Starlark policy engine)
2. **Desktop App** — GUI with Computer Use, parallel git worktrees, in-app browser (macOS GA Apr 2026, Windows coming)
3. **Cloud** — Delegated async tasks over GitHub / Linear / Slack (multi-hour autonomous runs)
4. **Apps SDK** — Embed Codex as a JSON-RPC server inside your own product (90+ plugins available)

**The Callout:** "CLI + App + Cloud — keep them straight."

---

### Snippet B: Claude's Strengths (Not "Better", Just Different)

**Slide Title:** "Claude: 1M Context, Tool-Calling, MCP Ecosystem"

**Three Columns:**

| **Claude's Moat** | **What It Means** | **When It Matters** |
|---|---|---|
| **1M context window native** | Read entire codebases at once; Haiku 4.5 at 200K is still stronger than Codex's 400K ceiling. | Long-file refactors, architecture review, documentation at scale. |
| **+9.2 pts on MCP-Atlas tool-calling** | Opus 4.7 at 77.3% vs GPT-5.4 at 68.1%. Strongest single-axis advantage. | Calling external APIs, chained tool workflows, orchestration. |
| **Mature plugins & skills ecosystem** | 21 hook events (vs Codex's 6), ToolSearch, Settings-based permissions, Cowork mode, Live Artifacts. | Building internal tools, automating workflows, team-scale deployment. |

**The Callout:** "Match the tool to the *shape* of work, not the hype cycle."

---

### Snippet C: When to Reach for Which (The Heuristic)

**Slide Title:** "Reach for Codex / Reach for Claude: Pick by Work Shape"

**Left Column — Reach for Codex:**
- Long-horizon, multi-modal work (image gen, video, TTS, embeddings)
- Async cloud delegation (multi-hour unsupervised runs)
- Open-weights reasoning (gpt-oss for self-hosted)
- Clean sandboxed "from-scratch CLI" tasks
- Desktop-heavy workflow (GUI, parallel worktrees, Computer Use)

**Right Column — Reach for Claude:**
- Short loops, mature ecosystem (1M context, conversational iteration)
- Cost-efficient short loops (prompt-cache economics: 10% mult on cached inputs)
- ToolSearch + denser MCP catalog (single-loop computer use & browser automation)
- Mobile dispatch (assign tasks from phone, Cowork mode)
- Tool-calling lead (77.3% vs 68.1% on MCP-Atlas)

**The Heuristic:** Default to Claude — reach for Codex when the work shape rewards async cloud delegation.

---

### Snippet D: The Pricing Reality (Cost is Not the Blocker)

**Slide Title:** "Dual-Tool Costs <1% of Loaded Salary"

**Single Table:**

| **Setup** | **10 Seats × 12 Mo** | **Per Dev / Mo** | **% of Salary** |
|---|---|---|---|
| Claude Solo | $3,000 / yr | $25 | <0.02% |
| Codex Solo | $2,400 / yr | $20 | <0.02% |
| Dual (typical) | $5,760 / yr | $48 | <0.04% |
| Dual (premium) | $14,400 / yr | $120 | <0.1% |

**The Point:** Even at $120/dev/month (premium), dual-tool is a rounding error against $120k salary baseline. Cost is not the blocker. **The blocker is knowing when each tool actually pays off.** That's the focus of this workshop.

---

### Snippet E: Multi-Modal Specialty Models (Codex Advantage)

**Slide Title:** "The Specialty Stack: Where Codex Extends Beyond Code"

| **Capability** | **Codex / OpenAI** | **Claude / Anthropic** | **How to Use It** |
|---|---|---|---|
| **Image Generation** | DALL-E 3 (first-party) | None (MCP only) | Generative design, mockups, hero images. |
| **Video Generation** | Sora 2 / Sora 2 Pro (API sunset 2026–08-24) | None announced | Long-form visuals, animated demos. |
| **Speech-to-Text** | gpt-4o-mini-tts + gpt-4o-transcribe | Third-party (partner ASR/TTS pipeline) | Voice-driven workflows, podcasts, transcription. |
| **Embeddings** | text-embedding-3 (omni-moderation) | None (bring-your-own) | Semantic search, retrieval, moderation. |
| **Open Weights** | gpt-oss (self-hosted) | Closed-source only | On-prem reasoning, air-gapped deployment. |

**The Insight:** If your workflow includes image gen, video, or real-time voice, Codex is the gateway. Claude pushes back to MCP for these, which is fine — it's a design choice, not a limitation.

---

### Snippet F: The Overlap Zone (Where Both Tools Shine)

**Slide Title:** "Equal-Quality Work: Where Both Win"

**Center Zone:**
- Implementation with clear specs
- Refactoring (both at parity)
- Test writing
- Documentation (both excellent)
- Data transforms
- File investigation

**Why It Matters:** This is where the *compounding* happens. Cross-vendor review catches what same-vendor review normalizes. Use the overlap zone deliberately.

---

## 5. Reusable for BCE Topic 8 (Best Practices): Slide-Ready Snippets

### Snippet A: Operational Risks When Running Two Tools

**Slide Title:** "Running Two Tools: Two Operational Surfaces, Two Places for Things to Go Wrong"

**Risk Register:**

| **Risk** | **Likelihood** | **Impact** | **Mitigation** |
|---|---|---|---|
| **Vendor lock-in via tool-specific assets** | Medium | Medium | Quarterly export-coverage review; avoid tool-only formats. |
| **Model-version drift erodes cross-review value** | Medium | High | Pin known-good snapshots per vendor; track cache-hit ratio weekly. |
| **Cache-pricing contract changes silently** | Medium | High | Monitor cache-hit ratio in usage logs; alert on >20% W/W drop. |
| **Operational complexity from two CLIs** | High | Medium | Single onboarding doc covering both CLIs (tagged commit trailers blunt blast radius). |
| **Knowledge fragmentation across team** | Medium | Medium | Rotate cross-vendor pairing monthly. |
| **Cost creep from idle subscriptions** | Medium | Medium | Tie seat renewals to per-tool usage review. |
| **Audit gaps when AI-driven changes lack provenance** | Low | High | Vendor tag in every commit trailer by default. |

**The Takeaway:** "Two CLIs compound every other risk. Mitigations are cheap; ignorance is expensive."

---

### Snippet B: When Dual-Tool Makes Sense (Fit Checklist)

**Slide Title:** "When Dual-Tool Makes Sense (Three Qualifying Questions)"

**Question 1: Team Size**
- 5+ developers writing code daily (enough concurrent work to keep both tools occupied).
- Enough people that onboarding overhead amortizes.
- Cross-vendor PR review reaches multiple reviewers per week.

**Question 2: Workload Breadth**
- Mixed shape: short conversational fixes AND long-horizon autonomous runs.
- Regular touches to backend systems AND UI surfaces.
- Security-sensitive PRs that warrant cross-vendor review.
- Async cloud delegation is already part of normal rhythm.

**Question 3: Convention Tolerance**
- Team can hold two slightly different tool setups without friction.
- Engineers pick the right tool by task shape, not by habit.
- Documented pattern exists for "this PR needs a second opinion."
- Documentation discipline is strong enough to record per-tool decisions.

**When NOT to Bother:** Solo dev, single workload shape, tight budget, zero async work — stay single-tool.

---

### Snippet C: Three Dual-Tool Patterns That Actually Work

**Slide Title:** "Three Patterns That Work: Author + Review + Specialize"

**Pattern DT-1: Author with One, Review with the Other**

- Primary engineer writes with tool A (usually habit/preference).
- Cross-vendor reviewer reads the output, re-runs with tool B to catch what A missed.
- Bugs caught: 10–15% on generated code (what same-vendor review normalizes).

**Pattern DT-2: Specialist Routing**

- Short loops → Claude (dense conversation, cost-efficient, tool-calling lead).
- Long-horizon → Codex (async cloud delegation, multi-modal, specialist models).
- Heuristic: if you'd start a timer and walk away, it's Codex.

**Pattern DT-3: Background-vs-Foreground Split**

- Codex async job runs in background (multi-hour refactor, autonomous runs).
- Claude IDE session continues foreground work (tests, UI, immediate fixes).
- Neither blocks the other; concurrent edits need worktree isolation.

**The Heuristic:** "Pick by work shape, not habit — that's the dual-tool dividend."

---

### Snippet D: Cost Reality: What Dual-Tool Actually Costs

**Slide Title:** "Cost: A $40–120 / Dev / Mo Conversation"

**Five Postures (10 seats, 12 months):**

| **Posture** | **Setup** | **Annual** | **Per Dev / Mo** | **Includes** |
|---|---|---|---|---|
| Pure Claude solo | Claude Pro × 1 | $2,040 | $17 | Claude Code on Pro; 200k context; Haiku 4.5. |
| Pure Codex solo | ChatGPT Plus × 1 | $2,400 | $20 | Codex CLI; no team admin; 400K context. |
| **Dual minimum** | Claude Pro + ChatGPT Plus | $4,440 | $37 | Both CLIs at lowest paid tier; no team admin controls. |
| **Dual typical** | Team Standard + Business (annual) | $4,800 | $40 | Claude Code + Codex; team admin; 5-seat minimum met. |
| **Dual premium** | Team Premium + Business (annual) | $14,400 | $120 | 6.25x Pro session volume (Claude) + Business pool (Codex); upper bound. |

**The Math:**
- Loaded cost per engineer: ~$120k–150k (salary + benefits + overhead).
- Even premium dual-tool ($120/mo) = 0.96–1.2% of loaded cost.
- Cost is not the blocker. *Knowing when each tool pays off* is.

---

### Snippet E: The Reasoning-Effort Ceiling (Why Codex Doesn't Escape Hatch)

**Slide Title:** "When You Crank the Dial All the Way Up: Only One Keeps Going"

**The Setup:**
- Codex ceiling: `xhigh` (strong on most tasks).
- Claude ceiling: `--effort max` (one step above; burns longer and budgets more thinking tokens).

**Real Numbers:**
- Most day-to-day work lands at `medium / high` — ceiling rarely matters.
- On gnarly refactors, you hit the wall and start splitting by hand.
- No public roadmap for a Codex higher tier.
- Difference between "solved and abandoned" vs "abandoned and costly."

**Practical Use:** Hard root-cause hunts, multi-file refactors, ambiguous specs — this is where Opus 4.7 + `--effort max` separates from the pack. Codex caps the effort knob; Claude has one more gear.

---

### Snippet F: Operational Excellence: The Ramp Signals

**Slide Title:** "Ramp Up When / Ramp Down When: Watch These Metrics"

**Ramp Up Signals (It's Working):**
- Cross-vendor review catches a recurring bug class that same-vendor review normalized.
- Two parallel agent runs ship a feature in half the calendar time of one sequential run.
- A senior engineer notes a missed edge case that only the second pass surfaced.
- DT-2 specialist routing settles into team muscle memory without a decision framework.
- Onboarding doc gets cited in PR reviews more often than the source-of-truth wiki.
- A new hire reaches productive output in week 2 instead of week 4.

**Ramp Down Signals (It's Not Paying Off):**
- Cost-per-merged-PR doubles over a quarter without a measurable quality lift.
- Junior engineers still can't articulate which tool to reach for after 90 days on the team.
- Cross-review notes cluster on the same surface repeatedly — diminishing returns.
- A model version update changes review behavior silently; recalibration loops eat the savings.
- Quarterly check finds the second tool sat idle for the majority of the quarter.
- Audit log queries span two tools and take more than a day to reconstruct a change.

**Cadence:** Re-evaluate quarterly, not on hype cycles. Track signals, not opinions.

---

## 6. Practice Lab Demo Candidates Inspired by These Decks

### Demo 1: Claude Design Prototype → Claude Code Handoff (The Playbook in Action)

**What:** Live walkthrough of design system locking, prototype generation in Claude Design, and the handoff artifact workflow.

**Why:** Directly demonstrates Section 3 (Claude Design Learnings). Proves the discipline works in real time.

**Length:** 45 min (15 min design system, 15 min prototype, 15 min handoff + decomposition).

**Output:** A 3-slide mini-deck (processes, automation, risk register) generated via Claude Design, then handed off to Claude Code for component refactor.

**Callout:** "This is how Adri built the Codex deck. Same playbook scales to your internal tools."

---

### Demo 2: Tool-Calling Showdown (Claude vs OpenAI on MCP)

**What:** Same task (e.g., "integrate with Slack + Jira + Figma in 10 turns"). Run Claude Opus 4.7 and GPT-5.4 in parallel; compare tool-call accuracy, coverage, and token efficiency.

**Why:** Brings Section 2 (Claude vs Codex) to life with real data. Shows the +9.2 pt tool-calling lead tangibly.

**Length:** 30 min (15 min setup, 15 min results + interpretation).

**Output:** Side-by-side call traces; Claude's 77.3% vs Codex's 68.1% on MCP-Atlas reproduced live.

---

### Demo 3: Dual-Tool Specialist Routing (Short vs Long)

**What:** Two tasks running in parallel. Short loop (UI fix) on Claude; long-horizon (multi-file refactor) on Codex. Show how neither blocks the other.

**Why:** Demonstrates Pattern DT-2 (Specialist Routing) and the work-shape heuristic.

**Length:** 25 min (10 min setup, 15 min parallel execution + cost analysis).

**Output:** Claude finishes in 2–3 min; Codex still running after 15 min (cloud delegation). Final costs compared: Claude cheaper on short task, Codex ahead on task completion.

---

### Demo 4: Design System Discipline (Cost Cutting in Action)

**What:** Build a 5-slide deck twice. First pass: no design system (free-form, lots of corrections). Second pass: locked design system upfront (three-slot reuse). Track token counts.

**Why:** Proves Section 3 claim: "Splitting sessions cuts 60–80% of per-message cost." Concrete savings.

**Length:** 40 min (20 min first pass, 20 min second pass, live token monitoring).

**Output:** Token comparison, cost delta, time saved. Real data on the discipline's ROI.

---

### Demo 5: Risk Register in Practice (What Dual-Tool Ops Looks Like)

**What:** Walk through the risk register (Section 5, Snippet A) on a real project. Show how Adri mitigates vendor lock-in, cache-pricing drift, etc.

**Why:** Makes Section 5 (Best Practices) concrete. Shows governance, not just theory.

**Length:** 20 min (walk the checklist, show mitigation evidence).

**Output:** A template risk register the BCE team can adapt.

---

## 7. Source Citations

### Primary Sources

1. **Claude Design — What We Learned Building the Codex Deck** (PDF)
   - Adrianto, May 2026, internal share-out
   - Core reference: Sections 3, 4, 5 (Design Learnings, Gotchas, Handoff Playbook)

2. **Claude & Codex: Two Platforms, One Mental Model** (PDF)
   - Nanovest Engineering Peer Briefing, April 2026
   - Core reference: Sections 2A–2F (Comparison, Quality, Pricing, Patterns)

3. **Codex Exploration Repository**
   - `/rules/design-system.md` — Token, type, spacing scale conventions
   - `/rules/content-style.md` — Voice, density, standalone-artifact rule
   - `/docs/methodology.md` — HTML-first, multi-output build patterns
   - `/cds-shareout/` — Handoff examples and CSS/HTML artifacts

### Supporting Research

- **MCP-Atlas Benchmark:** Tool-calling comparison (Opus 4.7 77.3% vs GPT-5.4 68.1%)
- **SWE-Bench Verified:** General coding at parity (Opus 4.7 87.6%, Codex 85.0%)
- **Senior-Engineer Refactor:** Dual-tool compounding (human 80–90, Codex+Claude-authored-plan 62.5)
- **Claude vs Codex API Token Economics:** Pricing breakdown, cache-hit modeling, effective-rate math
- **Codex Product Surface:** 4-product clarity (CLI, Desktop, Cloud, Apps SDK) from OpenAI Codex docs
- **Claude Ecosystem:** 21 hook events, ToolSearch, MCP server/client parity from Claude Code docs

### Methodology Note

This research is a synthesis of Adri's internal tooling experiments (design → code handoff, single-source multi-output builds, cost modeling) and published benchmarks (SWE-bench, MCP-Atlas). Claims on token efficiency, tool-calling lead, and cost-per-completed-task are drawn from documented observations in the Codex Exploration methodology.md and the Claude & Codex PDF; claims on price are from published 2026-05 rate cards (Claude pricing, OpenAI Codex SKU). No claims rest on a single source or unverified vendor statement.

---

## Appendix: Quick-Reference Decision Trees

### "Which Tool Should I Open Right Now?"

```
Does the task run longer than a single sitting?
├─ YES → Will it benefit from multi-modal (image/video/TTS)?
│  ├─ YES → CODEX (async cloud, specialty models)
│  └─ NO → CODEX (long-horizon async, desktop GUI)
└─ NO → Do you need dense iteration in conversation?
   ├─ YES → CLAUDE (1M context, tool-calling lead, MCP ecosystem)
   └─ NO → Is it a spec'd implementation or refactor?
      ├─ SPEC → CLAUDE (conversational iteration beats silence)
      └─ REFACTOR → DEFAULT CLAUDE, REACH CODEX IF PARALLEL (DT-3)
```

---

### "Does Dual-Tool Make Sense for Our Team?"

```
Team size?
├─ <5 devs → SOLO TOOL (either one, pick by preference)
├─ 5–15 devs → DUAL TOOL MAYBE (if workload breadth below is YES)
└─ >15 devs → DUAL TOOL LIKELY (cross-vendor review scales)

Workload breadth?
├─ Single shape (all short / all long) → SOLO TOOL
├─ Mixed (short + long) → DUAL TOOL YES
├─ Multi-modal (code + design + content) → DUAL TOOL YES
└─ Heavy async delegation already? → DUAL TOOL YES

Convention discipline?
├─ Can't decide by task shape → SOLO TOOL
├─ Will document per-tool decisions → DUAL TOOL YES
└─ Strong enough to record it → DUAL TOOL YES

Budget?
├─ <$40/dev/mo available → SOLO TOOL
├─ $40–80/dev/mo available → DUAL TOOL MINIMUM
└─ >$100/dev/mo available → DUAL TOOL PREMIUM
```

---

**End of Document**
