# Loop Engineering — Summaries of Two X Articles
## Source capture, 2026-08-03

---

## Source Data (confirmed)

| Item | Article A | Article B |
|---|---|---|
| Author | @elune0x ("elune", growth @kollectivexyz, 495 followers) | @AnatoliKopadze ("Anatoli Kopadze", 131,797 followers) |
| Post URL | https://x.com/elune0x/status/2079923329633313196 | https://x.com/AnatoliKopadze/status/2068328135611822149 |
| Title | *Loop Engineering: How to Build Agents That Improve Their Own Work* | *Loops explained: Claude, GPT, Mira and what actually works* |
| Published | 2026-07-22 | 2026-06-20 |
| Format | X Article (335 content blocks) | X Article (122 content blocks) |
| Engagement | 361,493 views / 115 likes / 314 bookmarks / 22 RT | 21,789,346 views / 8,205 likes / 33,030 bookmarks / 1,255 RT |
| Cover media | media_id 2079724829943492608 — https://pbs.twimg.com/media/HNyqtsdXcAA8CTm.jpg (2000x800) | media_id 2068297830385483776 — https://pbs.twimg.com/media/HLQR6x3WgAAoX0v.jpg (1900x760) |

Both cover images were downloaded and inspected.

- **Cover A**: banner diagram, header "SYSTEM DEEP DIVE | LOOP CONCEPTS", logos Claude / OpenAI / Kimi. Shows a hand-drawn flow: `Start (User Prompt) -> Plan -> Build -> Run -> Verify -> Refine`, caption "Iterative, Self-Improving Agents". A right-side panel "System State & memory" shows a state graph plus `Claude.md patterns` and `Project structure` files.
- **Cover B**: banner diagram, logos Claude / ChatGPT / Mira, title "Everything you need to know … And what nobody tells you". Left box "Prompt: Ask -> Answer -> Stop". Center "LOOPS" ring: `Discover -> Plan -> Execute -> Verify -> Iterate`, with a lower row `Memory -> State -> Verifier -> Stop condition -> Cost`. Right box "Loop: Goal -> Work -> Check -> Repeat".

---

## Article A — @elune0x, "Loop Engineering"

### Core thesis
Stop prompting agents step by step. Build a loop that prompts them for you. The human must stop being the feedback loop.

Two quotes are used as anchors:
- "You should not be prompting coding agents anymore. You should be designing loops that prompt your agents."
- Boris Cherny (leads Claude Code at Anthropic): "I do not prompt Claude anymore. I have loops running that prompt Claude and figure out what to do. My job is to write loops."

### The 5 stages
`Discover -> Plan -> Execute -> Verify -> Iterate`. Pass the check, ship it. Fail the check, return to the loop.

### Old vs new workflow
- Old: you write the prompt, agent outputs, you inspect, you repair, you repeat manually.
- New: you define the outcome; the loop discovers, plans, executes, checks, corrects, and stops when the goal is complete.
- "A prompt gives an agent a single instruction. A loop gives the agent an entire job."

### Cost — the stated main blocker
- Medium coding loop: 50K–200K tokens.
- Fleet with orchestrator plus specialists: 500K–2M tokens.
- A daily-scheduled loop: millions of tokens per week.
- Every retry, correction, verification step, and subagent adds cost.
- The author admits the fair criticism ("easy for you to say, you have unlimited OpenAI access") and states that cheap models with large context windows are what make loops practical. Requirements listed: affordable input/output tokens, large context, reliable tool calling, structured JSON output, high concurrency, enough context to remember earlier steps.

### Two sizes
- **Single-agent loop** — one agent discovers, plans, executes, reviews, retries. Good for focused tasks, limited scope, clear goals, content drafts, bug fixes, research summaries.
- **Fleet loop** — one orchestrator splits the objective, assigns specialists, specialists delegate to subagents. Behaves like a small autonomous team.

### Two types
- **Open loop** — broad goal, agent finds its own path. Can find things you did not specify, but can explore too many directions, waste tokens, make fast low-quality work, drift, and become hard to control.
- **Closed loop** — human defines the path first: clear objective, defined stages, evaluation after every stage, a stop condition, and a human handoff when stuck. Cheaper, more trustworthy, cleaner. **Recommendation: start closed, open up only after the checks are strong.**

### The 6 building blocks
1. **Automations** — the heartbeat. Run every morning, on PR open, on file change, on new ticket, or until all tests pass. If you still start every action yourself, the loop does too little.
2. **Worktrees** — isolation so parallel agents do not overwrite each other. Each agent gets its own workspace and branch.
3. **Skills** — reusable project knowledge (product vision, architecture, rules, build and test instructions, forbidden actions). Without skills every run is a cold start.
4. **Plugins and connectors** — GitHub, Slack, Linear, Jira, Gmail, Google Drive, databases, staging APIs. Turns "here is a possible fix" into "I opened the PR, linked the ticket, monitored CI, and posted the update".
5. **Subagents** — separate the maker from the checker. The agent that wrote the code grades itself too kindly. Use distinct agents for exploration, implementation, review, testing, fact-checking, and final summaries.
6. **Memory** — the model forgets; the repo, notes, and project log do not. Store in Markdown files, project logs, Linear tickets, GitHub issues, Obsidian vaults, databases, or Claude Projects.

### Prompt engineer vs loop engineer
- Prompt engineer improves wording to get one stronger response; the human still reviews everything.
- Loop engineer defines what launches the loop, what context the agent gets, which tools it can use, what counts as success, who verifies, when to stop, and where output is stored.
- Same tools, different mindset. Closing line: "A dependable loop will beat a perfect prompt."

### Note on completeness
The article names four example loops (coding, research, content, sales outreach) but the detail for each sits inside embedded images that the text extraction cannot read. Same for the fleet-loop example diagram.

---

## Article B — @AnatoliKopadze, "Loops explained"

### Framing
Same starting problem as Article A: most daily AI users still type a request, wait, fix it, and ask again, all by hand — "not because the faster way is complicated, because nobody showed them what it looks like." The article is aimed at a general audience, not only engineers.

**Important:** the second half is a promotion for a product called **Mira**. Treat the article as part explainer, part advertisement.

### What a loop is
A prompt is a single instruction. A loop is a recursive goal the AI keeps working toward. Three parts do the real work:

1. **Verify — the heart.** Without a real check you do not have a loop, you have "the agent agreeing with itself on repeat". The gate can be a hard test, a measurable threshold, or a rubric. "The model that did the work is far too generous a grader."
2. **State — what makes it learn.** A small side record of what is done, failed, and next, so the next pass resumes instead of restarting. This is also where cost begins.
3. **Stop condition — what keeps it sane.** Every serious loop needs two exits: success, and a hard cap ("after 8 tries, stop and report").

### When a loop is NOT worth it (the most useful section)
Build a loop only when **all four** are true:
1. The task repeats at least weekly (else setup cost never pays back).
2. Something can automatically reject bad output — test, type check, build, linter, hard rule.
3. The agent can do the work end to end, not hand half back to you.
4. "Done" is objective, not a taste judgment. If quality is taste, a human wins.

Miss one box, keep it as a manual prompt. The author states plainly that most people do not need the heavy version.

### Why loops started in code
Code verifies itself — a test passes or it fails. Five building blocks, which Claude Code and Codex both ship:
1. **Automation (heartbeat)** — in Claude Code: `/loop` re-runs a prompt on an interval, `/goal` keeps a session going until a written condition is true, hooks fire commands at lifecycle points, and cron or GitHub Actions keeps it running after the laptop closes.
2. **Skill (reusable instructions)** — saved once as a file: rules, patterns, and a hard "never touch" list.
3. **Sub-agents** — split maker from checker. Writer can be fast and cheap; reviewer slow, strict, and sometimes a stronger model at higher effort. "That separation is most of the quality."
4. **Connectors** — the difference between suggesting a fix and opening the PR, linking the ticket, and pinging the channel on green build.
5. **Verifier (the gate)** — "the one block that decides whether the loop helps you or just spends your money. Everything else is plumbing."

Claim cited without a named source: one engineer used such a loop to rewrite an entire codebase from one language to another in about six days, work that would take close to a year by hand. **Unverified.**

### The cost section
- Cost compounds, it does not add. Every iteration re-sends the goal, code, last result, and failures, and that pile grows each pass. "A loop that runs ten times does not cost ten prompts. It costs ten prompts that each keep getting bigger." Maker-plus-checker doubles the bill.
- **The metric that matters: cost per accepted change** — not tokens spent or loops run. Below a 50% accept rate the loop costs more than it returns.
- **Silent failure**: engineer Geoffrey Huntley's "Ralph Wiggum loop" — the agent decides it is done too early, exits half-finished, and the loop keeps running and spending while producing nothing. "Loops do not crash, they bill you in silence."
- The heavy version belongs to teams with iteration caps, token budgets, cheap models on boring steps, and monitoring.

### Build order
Prove it by hand once, harden it, then automate it. "Scheduling something you have not made reliable by hand is exactly how loops blow up while you sleep."

### Manual loop in any LLM
You can run a loop with one paragraph: give the model a goal, strict success criteria, and a protocol that forces self-checking before it is allowed to stop. The model drafts, grades itself against the criteria, finds the weak spot, and rewrites until it clears the bar.

What is still missing: **you are the trigger.** No schedule, no event wake-up, no reach-out. Close the tab and it is gone.

### The Mira promotion (second half)
- **Mira** is a Telegram-based agent. Loops are described in plain words and are called **Skills**; each has a trigger, an action, and self-running execution.
- Claimed capabilities: connects to 500+ apps via **Composio** (Notion, Gmail, Google Calendar, GitHub, Figma, Stripe and more), long-term memory across sessions and group chats, model-agnostic (GPT, Claude, Gemini by task).
- Positioning: "ChatGPT answers, Mira acts."
- Claimed use cases — work (thread catch-up, filing tickets, meeting briefs, group-chat memory), creators (voice note to finished post in ~30 seconds, one brief to six platform versions, image and video generation, photo edit, background swap, mascots, lip-sync), voice (transcription, read-back, group voice summaries, hands-free), and life (habit streak coach, journal, calorie tracking from a photo, language practice, flight price watcher and auto-buy, de-clickbaited daily digest).
- **All Mira capability claims are the author's marketing copy. None were verified.**

### Closing take
"Loops are not a trend. They are a shift in who does the work." But: do not force them where they do not belong or you will burn money for nothing. Start with what is free, and only move up when you actually feel the limit.

---

## Comparison

| Dimension | Article A (elune0x) | Article B (Kopadze) |
|---|---|---|
| Audience | Builders and AI engineers | General AI users |
| Stage model | Discover, Plan, Execute, Verify, Iterate | Same five, plus Memory / State / Verifier / Stop condition / Cost |
| Building blocks | 6 (adds Worktrees and Memory) | 5 (no worktrees; memory folded into state) |
| Cost treatment | Token volume per loop type; answer is cheap long-context models | Compounding cost; answer is the "cost per accepted change" metric and a 50% accept-rate floor |
| Gate on adoption | Start closed, open later | 4-box test; most people should not build one |
| Named risk | Open-loop drift and waste | "Ralph Wiggum loop" — silent early exit that keeps billing |
| Commercial intent | Follow-me call to action only | Product promotion for Mira (Telegram) |

### Where they agree
1. The human is the bottleneck; the target is to remove the human from the inner loop.
2. Verification is the load-bearing part. No independent gate means no loop.
3. Separate the maker agent from the checker agent — this yields most of the quality gain.
4. Persistent memory or state is required, or every run starts from zero.
5. A hard stop condition is required.
6. Reusable skill files replace re-pasted context.
7. Connectors are what make the loop act instead of suggest.
8. Cost is the real limiter, not the concept.

### Where they differ
- Article A pushes the reader **toward** building loops and treats cheap tokens as the unlock. Article B pushes the reader **away** from the heavy version unless four conditions hold, then sells a no-code alternative.
- Article B gives the sharper economics (compounding context, cost per accepted change, 50% floor) and the sharper failure mode (silent early exit). Article A gives the more complete build inventory (worktrees, subagent role split, memory stores).

---

## Reliability Notes

- **Confirmed**: author handles, titles, publish dates, engagement counts, cover-image content, and the full body text. All were retrieved directly from the X article payload and the images were viewed.
- **Not verified**: the Boris Cherny quote, the "codebase rewritten in six days" claim, the Geoffrey Huntley "Ralph Wiggum loop" attribution, the token-range figures in Article A, the 50% accept-rate threshold in Article B, and every Mira capability claim. These are the authors' assertions and were not checked against primary sources.
- **Not captured**: both articles embed content inside images that carry no alt text in the payload — 16 in Article A (including the four worked loop examples and the fleet diagram) and 44 in Article B (including the Claude Code and Mira screenshots). The extraction API strips the image URLs, so those blocks could not be read. Any conclusion that depends on the worked examples is therefore incomplete.
- **Bias**: Article B's second half is paid-style promotion. Article A is written by a growth marketer and ends with a follow-and-bookmark call to action.
