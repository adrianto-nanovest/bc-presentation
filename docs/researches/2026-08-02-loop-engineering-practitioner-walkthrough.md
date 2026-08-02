# Loop Engineering — Practitioner Walkthrough (Video-Sourced)

**Date:** 2026-08-02
**Primary source:** [1 YouTube transcript from "Upgraded", extracted from NotebookLM](https://www.youtube.com/watch?v=Ry3YyG22EUc)
**Youtube title:** The New AI prompting Method Everyone Is Talking About: Loops (And How To Use Them)
**Companion doc:** `docs/researches/2026-07-31-loop-engineering.md` (web/literature provenance study). This document does not replace it. It records what one practitioner video teaches, in operational detail.

---

## 0. Source and method

| Item | Value |
|---|---|
| NotebookLM notebook | `AI Loop Engineering: The Self-Prompting Future of Productivity` (`69453f80-578d-40e7-99f0-d0ded041a955`) |
| Source ID | `6a740340-f01b-4831-8231-db9f31f04618` |
| Source title | *The New AI prompting Method Everyone Is Talking About: Loops (And How To Use Them)* |
| Source type | YouTube video transcript |
| URL | https://www.youtube.com/watch?v=Ry3YyG22EUc |
| Extracted | 2026-08-02, 22,315 characters |

Extraction command (reproducible):

```bash
nlm source fulltext 6a740340-f01b-4831-8231-db9f31f04618 \
  -n 69453f80-578d-40e7-99f0-d0ded041a955 -o loop-transcript.md
```

**Evidence rules used in this document:**

- **[S]** — stated in the transcript. Attribution only. The transcript is one practitioner opinion, not a verified benchmark.
- **[I]** — inference by the author of this document from source material.
- **[U]** — unverified or absent from the source.

**Known source limits:** auto-generated captions, no timestamps, no citations, no measurements. Speaker name of the video is not in the transcript. Names spoken in the video are transcribed phonetically; "Boris Cherney" is almost certainly Boris Cherny [I]. All cost, speed, and quality claims are anecdotal [S].

---

## 1. Executive summary

**Core claim [S]:** Prompting turn-by-turn is obsolete for repeated work. Replace yourself as the prompter. Build a loop where the AI prompts itself: one human goal in, agents discover the work, execute in parallel, verify against the goal, write memory to files, and start the next cycle.

**Named practitioners [S]:** Boris Cherny (creator of Claude Code) and Peter Steinberger (creator of OpenClaw) both describe this as how they now program. They do not prompt a chatbot and do not hand-write code.

**Scope claim [S]:** Loops are discussed mostly for coding, but apply to content creation, research, and self-teaching. All of these still run through coding tools such as Claude Code or Codex. A terminal is not required of the user.

**The five structural elements [S]:** goal (human-set, once) → discovery/plan → parallel execution → verification against goal → memory outside the conversation. A ship step and a "what next" step close the cycle.

**The main control decision [S]:** open loop (agent selects its own direction, discovers work you would not think of, burns massive tokens, never naturally stops) versus closed loop (bounded goal, visible path, evaluation at each step, constrained budget). The source recommends closed loops for everyone without an unlimited budget.

**Honest limits admitted by the source [S]:** AI is not always right about judgment-heavy questions such as which YouTube topic will perform. Output has "the AI look". An agent without full context produces wrong details. Human review stays in the loop for quality assurance.

**Assessment [I]:** The video is a competent, concrete introduction to closed-loop agent design. Its value is the pattern catalogue and the prompt structure, not its authority claims. It contains no cost data, no failure-recovery design, no security or governance content, and no evaluation rigor beyond a boolean loop condition.

---

## 2. The shift: manual iteration versus loop

### 2.1 Old method [S]

```
human writes prompt → agent produces output → human reads output →
human writes next prompt → agent produces output → repeat forever
```

The source calls this iteration, and calls it slow. The human is the bottleneck in every cycle, and the human is spent on transport rather than on judgment [I].

### 2.2 New method [S]

```
GOAL (human, once)
   ↓
DISCOVERY      agents find what needs doing
   ↓
PLAN           break into clear steps
   ↓
EXECUTE        parallel; "spin out 15 different agents who each go and do one thing"
   ↓
VERIFY         a verification agent asks: did this accomplish our goal?
   ↓
   ├── yes → SHIP → (optional) "what should we do next?" → back to DISCOVERY
   └── no  → iterate → back to PLAN/EXECUTE
   
MEMORY  lives outside the conversation, records state and completed steps,
        and is what makes the iteration succeed
```

**Load-bearing detail [S]:** memory lives *outside* the conversation. The transcript states this is what allows the agents to iterate successfully.

**[I]** This is the real engineering content of the idea. Conversation context is volatile and bounded; a loop that survives more than one cycle needs durable state in files. Everything else in the diagram is workflow drawing. Memory is the part that makes the workflow a system.

### 2.3 Orchestrated topology [S]

```
              ORCHESTRATOR AGENT
        owns the goal, reads memory file,
        delegates tasks, synthesises outputs
        ┌──────────┼──────────┐
     AGENT 1    AGENT 2    AGENT 3
   each runs its own discovery→ship→loop cycle
        └──────────┼──────────┘
              FINISHED PRODUCT
```

Each specialist runs its own internal loop. The orchestrator merges the results into one plan [S].

---

## 3. Open loop versus closed loop

| Dimension | Open loop [S] | Closed loop [S] |
|---|---|---|
| Instruction | "Go out there, see what we should do, then go do it" | Start from a bounded goal |
| Direction | Agent chooses; can change direction after finishing one | Path is understood before the run |
| Discovery value | High — finds work you would not think of | Lower — limited to the bounded goal |
| Token cost | "Burns massive tokens" | "Keeps budget fairly normal, fairly constrained" |
| Evaluation | Not specified | Clear evaluation at each step |
| Recommended for | Unlimited budget only ("say if you work at Meta") | Everyone else — the source's recommendation |

**[I]** The distinction is really about who owns the stopping rule. An open loop has no naturally terminating condition, so cost is unbounded by construction. A closed loop makes the stopping rule an explicit artefact. For any organisation on a paid subscription or metered API, closed is the only defensible default.

**[U]** The source gives no numbers: no token counts, no dollar figures, no runtime for either type.

---

## 4. Loop conditions (stopping rules)

The stopping rule is the single most repeated design element in the source. Every worked example carries one. Collected [S]:

| Loop | Condition to continue |
|---|---|
| Scout / research agent | Fewer than 3 fresh, not-yet-acted-on ideas exist |
| Orchestrator (pickleball) | Any of: fewer than 3 unacted content ideas; site not fully linked to the quiz; next lead magnet not defined |
| Site growth check | Site is not growing — no fresh content ideas, lead-magnet pipeline not full |
| Freelancer status updates | Any active client did not get an update this week |
| Student briefing | Fewer than 2 genuinely new developments this week (if not met: dig deeper) |

**Extracted pattern [I]:** a good loop condition is a **countable, checkable statement about state on disk**, not a quality opinion. "3 or more fresh ideas not yet acted upon" can be evaluated by reading a log. "Is the content good" cannot. Loops fail to terminate when the condition needs taste.

**[U]** The source does not cover: maximum cycle count, timeout, budget cap, or what to do when the condition is never satisfiable. That is a real gap for production use [I].

---

## 5. Memory design

Files named in the source [S]:

| File | Role |
|---|---|
| `outputs/next_steps` | The orchestrator's memory of the previous cycle. Read **before** doing anything. Contains a summary, top 3 actions for the week, and the focus of the next loop cycle. |
| Log files | Track what each agent is doing, so you can look back and so agents know where each one is in the process. |
| `outputs/growth_agent_notes` | Repetition and diminishing-returns flags, written to keep future cycles fresh. |
| `outputs/quiz` | Deliverable — one self-contained HTML file. |
| `outputs/social_captions` | Deliverable — three platform-native captions. |
| `outputs/next_quiz_recommendation` | Deliverable — next lead magnet proposal. |
| Skill file (freelancer example) | Holds each client's name, project goals, and preferred tone. Described as "the memory of who your clients are". |

**Three distinct memory kinds [I]:**

1. **State memory** — what is done, what is pending (`next_steps`, logs). Prevents repeated work.
2. **Anti-repetition memory** — what was produced before (`growth_agent_notes`, "checks the past 3 weeks of briefings so it doesn't repeat things"). Prevents output collapse across cycles.
3. **Profile memory** — stable facts and preferences (skill file). Prevents re-teaching the agent every run.

**[I]** The second kind is the one most often missed. Without it a weekly loop converges to writing near-identical output forever, and the loop condition still reports success.

---

## 6. Worked case study — pickleball e-commerce

**Scenario [S]:** an online pickleball gear store with some customers, and a goal to grow. Goal statement given to the orchestrator: *grow the pickleball e-commerce site automatically, without doing every task manually.*

Three agents run at the same time.

### 6.1 Agent 1 — the Builder

**Job [S]:** create a Harry Potter × pickleball personality quiz.

Prompt elements observed [S]:
- Role and exclusivity: "You're the builder. Your only job is…"
- Exact deliverable and path: a single self-contained HTML file to `/outputs/quiz`
- Hard constraints: 6 questions, 4 possible results
- Tone constraint: each question fun and slightly absurd
- Hidden mapping requirement: questions map to playing styles (aggressive, strategic, social, defensive)
- Conversion mechanic: email capture form shown before the result, CTA "see your full result"
- Collaboration clause: "ask questions if needed"

**Result [S]:** one-shotted and working. Named "The Sorting Paddle". Email gate before the result functioned. Source's own critique: "obviously it's not perfect, it's got the kind of AI look".

### 6.2 Agent 2 — the Scout

**Job [S]:** research real content opportunities, explicitly independent of the quiz being built in parallel.

Prompt elements observed [S]:
- Named sources: Reddit and specific subreddits, search trends, competitor sites, YouTube traction
- A four-axis scoring rubric: audience size, purchase intent, content gap (is it underserved), quiz/lead-magnet potential
- Fixed output shape: ranked list of top 8, each with topic, one-line angle, source of traction, the 4 scores, recommended content format
- Logging requirement to the log files
- Loop condition: continue until 3 or more fresh unacted ideas exist

**Result [S]:** ranked opportunities including "is my paddle legal", intermediate upgrade trigger guide, injury prevention gear guide, shoes/when the upgrade pays off, women's gear content, beginner starter kit quiz. Source review: "seems solid" — explicitly "without looking too in depth" [S].

**[I]** The scoring rubric is what makes this agent's output usable by the next agent. Unranked research is not actionable; a 4-axis score is a machine-readable handoff.

### 6.3 Agent 3 — the Growth agent

**Job [S]:** "do everything a smart marketing hire would do in the first 48 hours after product launch." Reads the other two agents' outputs before acting.

Four tasks [S]:
1. **Site link audit** — every page or section where a quiz link fits, with exact location, exact copy, and reason.
2. **Launch email** — subject line, preview text, full body, CTA; casual, fun, pickleball-obsessed.
3. **Social captions** — 3 captions, one each for Instagram, Reddit, Facebook group. Platform-native. The Reddit one must not read like marketing; the Instagram one needs a hook in the first line.
4. **Lead magnet recommendation** — single best next lead magnet, with title, format, 3-sentence description, and why it will outperform or complement the existing quiz.

Then a self-evaluation step [S]: were obvious placements missed in a previous cycle? Are any captions similar to a prior run? Flag repetition or diminishing returns to `growth_agent_notes`. Log "growth agent complete" when done.

**Result [S]:** 12 placement recommendations with copy for each. Launch email and copy notes. Three captions. Next quiz recommendation: "is your paddle past its prime", with supporting data points.

**Observed defect [S]:** one recommended line of copy was wrong because "it didn't have the full context of the quiz."

**[I]** This is the most instructive moment in the video and it is not treated as such. Parallel agents were deliberately made independent for speed, so agent 3 wrote copy about an artefact it had not fully read. Parallelism buys wall-clock time and costs cross-agent context. The orchestrator's synthesis step is where that debt has to be repaid.

### 6.4 The orchestrator

Prompt structure observed [S]:

1. Role: orchestrator managing a fleet of 3 sub-agents for the business.
2. Job: delegate work, monitor outputs, synthesise results into one unified action plan.
3. **Memory first:** before doing anything, check whether `/outputs/next_steps` exists; if it does, read it first — "it is your memory from the previous cycle" — and use it to understand what is already completed before delegating anything.
4. Goal statement: launch a new lead magnet, research content opportunities, execute the 48-hour post-launch push.
5. Spawn sub-agents, passing the exact same prompts used manually.
6. Synthesise: write `next_steps` containing a summary, the top 3 actions to take this week, and what the next loop cycle should focus on.
7. Evaluate the three loop conditions; if unmet, continue.

**Schedule [S]:** the whole thing runs on a weekly cadence that automatically triggers the orchestrator.

**Extension [S]:** more agents can be spun out — for example a copywriter agent producing blog posts from the ranked ideas, which cycles back in and triggers new agents when the queue empties. "Now you can see how this starts to build on itself."

### 6.5 Operational note on the run

**[S]** The demo was run with the human as orchestrator, in three separate Claude Code sessions started with `Command+N`, purely so the sub-agents' work is visible as separate tabs. With a real orchestrator agent in Claude Code on desktop, the sub-agents are created inside the one chat and you do not see what they are doing. The source states the result is the same.

**[I]** Same result, different observability. For a first build, run agents in visible sessions to learn the failure modes; move to a single orchestrator once you trust the loop conditions and logging.

---

## 7. Four generalised loop patterns

The source presents these as an exercise: read the scenario, design the loop. Consolidated [S]:

| | **Freelancer** | **Student** | **Shop owner** | **Creator** |
|---|---|---|---|---|
| **Pain** | 2 hours every Friday writing 6 client status updates | Cannot keep up with daily papers and weekly tools | Knows product descriptions need work, never does it | Picks the next video "based on vibes" |
| **Trigger** | Every Friday, 4 PM | Every Sunday, overnight | Monthly, on the 1st | Every Monday morning |
| **Inputs read** | Project folders (what changed) | Week's developments in the topic | Sales data — what sold, what did not | Full ideas list; last 90 days of performance; what is trending |
| **Memory used** | Skill file: client names, project goals, preferred tone | Past 3 weeks of briefings | Change log with the reason for each change | Historical over/under-performers |
| **Filtering** | — | Score by relevance to what you actually study; drop anything below threshold | Identify 3 products with high traffic and low conversion | Score every idea; flag ideas competitors already covered |
| **Output** | Personalised draft per client into a review folder | Plain-English briefing: what happened, why it matters | Rewritten descriptions with better hooks and clearer CTAs; promo copy for top 3 performers | Ranked top 5 ideas |
| **Human gate** | Yes — review folder, explicit QA | No | No | Yes — "think for yourself, think critically" |
| **Loop condition** | Did every active client get an update this week? | Are there 2+ genuinely new developments? If not, dig deeper | — | — |

**Common skeleton [I]:**

```
schedule trigger → read durable memory → gather fresh inputs →
filter/score against a stated threshold → produce a fixed-shape artefact →
write to a reviewable location → log what was done → check loop condition
```

**[I]** Note which two loops keep a human gate: the ones with an external audience (client-facing messages) or with irreducible taste (content bets). The two without a gate act on internal artefacts only. That is a usable rule for deciding where the human belongs.

---

## 8. Prompt design patterns extracted

Derived from the four prompts shown [I], all elements individually attested [S]:

1. **Single-role, single-job framing.** "You're the builder. Your only job is…" — scope exclusion is stated, not implied.
2. **Exact deliverable, exact path.** Every agent writes to a named file location. No agent finishes only in chat.
3. **Countable constraints.** 6 questions, 4 results, top 8 opportunities, 3 captions, 12 placements. Countable output makes verification mechanical.
4. **Explicit scoring rubric when the output must be prioritised.** Four named axes, not "rank by quality".
5. **Per-item required fields.** "Include the topic, one-line angle, source, 4 scores, recommended format." Fixed shape enables the next agent to consume it.
6. **Platform- or channel-native constraints.** "The Reddit one should not read like marketing. The Instagram one needs a hook in the first line."
7. **Read-before-act clause.** "Read these before doing anything." For the orchestrator: read memory before delegating.
8. **Independence clause when parallel.** "Completely independent of the quiz being built in parallel." Prevents blocking — and causes the context defect in §6.3.
9. **Self-evaluation clause.** After the tasks, compare against prior cycles and flag repetition or diminishing returns.
10. **Completion logging.** "When all tasks are complete, log growth agent complete." The log is the orchestrator's signal.
11. **Clarification clause.** "Ask questions if needed" — the source says it always includes this, to converge on what you actually want.

---

## 9. Limits, risks, and what the source admits

Admitted in the source [S]:

- **Judgment tasks are weak.** For YouTube topic selection specifically, the source — an experienced creator — says AI "is not always perfect at knowing what topics are really good". Advice: use it for a ranked list and a second opinion, then think for yourself.
- **Output has an AI look.** The one-shot quiz was accepted as usable, not as finished.
- **Context gaps produce confidently wrong details.** The growth agent wrote copy that misdescribed the quiz.
- **Open loops cost a lot.** Recommended only with unlimited budget.
- **Human QA is retained** where output goes to real people.

Not covered by the source, and required before production use [U] / [I]:

| Gap | Why it matters |
|---|---|
| Cost data | No token or currency figures for either loop type. "Fairly constrained" is not a budget. |
| Failure and recovery | No treatment of an agent that errors, hangs, or writes a corrupt memory file mid-cycle. |
| Runaway protection | No max-iteration count, timeout, or spend cap, even for closed loops. |
| Verification rigor | The "verification agent" is asserted but never built or shown. Loop conditions are checked, not output quality. |
| Security and permissions | Nothing on credentials, write scope, what an agent may touch, or acting on live systems. Every demo output was a file in `outputs/`. |
| Data governance | Scraping Reddit/competitor sites and mailing a customer list are treated as unremarkable. |
| Multi-cycle evidence | Only the first cycle is demonstrated. Repetition control, the hard part of a weekly loop, is prompted for but never observed working. |
| Model/tool specifics | No versions, no settings, no comparison between Claude Code and Codex. |

**[I] Highest-risk omission:** no spend cap and no max iterations. A closed loop with an unsatisfiable condition behaves exactly like an open loop, on a schedule, unattended.

---

## 10. Prerequisites and getting started

**Stated requirements [S]:**
- A Claude subscription (Pro plan or higher for Claude Code) or a Codex subscription.
- Loops run through coding tools — Claude Code or Codex — even for non-coding work.
- Non-technical users are explicitly in scope: "if a terminal window scares you, don't worry".
- Parallel sessions: `Command+N` for a new session per agent.

**[I] Suggested first build, smallest viable loop:**

1. Pick one recurring task with a countable definition of done.
2. Write the goal in one sentence.
3. Create the memory file and decide what a cycle must record.
4. Write one agent prompt: role, single job, exact output path, countable constraints, "ask questions if needed".
5. Run it manually, visibly, once. Read the output yourself.
6. Add the loop condition as a statement about the memory file.
7. Add the anti-repetition check against prior cycles.
8. Add the schedule only after two manual cycles produce different, correct output.
9. Add the orchestrator only when there is more than one agent to coordinate.

Steps 5 and 8 are the verification steps; the schedule is the last thing added, not the first [I].

---

## 11. Relation to the companion research doc

`docs/researches/2026-07-31-loop-engineering.md` establishes the provenance of the term from published sources: Addy Osmani's essay of 2026-06-07 is the earliest clear named use found, with Steinberger and Cherny as precursor voices, and IBM classifying loop engineering as an *emerging* practice.

| Point | Video source [S] | Companion doc |
|---|---|---|
| Who is behind it | Cherny and Steinberger "are all talking about this" | Same two named as precursors; Osmani named the practice |
| Status | "The future of how people are going to work with AI" | Emerging named practice, not an established discipline |
| Definition | Self-prompting loop over agents, with memory | Same narrow definition (Osmani/Macedo), plus broader vendor definitions |
| Components | Goal, discovery, parallel execution, verification, memory, stopping rule | Trigger, goal, verification, stopping rule, memory (Macedo's loop specification) |
| Evidence type | One demo, first cycle only, no measurement | Published essays, preprints, vendor docs; explicitly early-stage |

**[I]** The two agree closely on structure. The video adds concrete prompt-level and file-level practice; the companion doc supplies the sourcing and the caution that the discipline claim currently runs ahead of the evidence. Use the video for how, the companion doc for how much weight to give it. The video's "this is the future" framing is promotional and should not be quoted as a finding.

---

## 12. Glossary

| Term | Meaning as used in the source |
|---|---|
| **Loop / loop engineering** | Designing a system where the AI prompts itself repeatedly toward a human-set goal, instead of the human prompting each turn. |
| **Open loop** | Unbounded direction; the agent selects its own work and keeps going. High discovery, high token burn. |
| **Closed loop** | Bounded goal, visible path, evaluation at each step, constrained budget. The recommended default. |
| **Loop condition** | The checkable state test that decides continue or stop. |
| **Orchestrator agent** | Owns the goal, reads memory, delegates to sub-agents, synthesises outputs into one action plan. |
| **Sub-agent / specialist** | Single-job agent (builder, scout, growth) running its own internal cycle. |
| **Memory** | Durable state outside the conversation — `next_steps`, logs, notes, skill files. |
| **Skill file** | Stable profile facts and preferences an agent loads each run. |
| **Verification agent** | Agent that checks whether the goal was accomplished before shipping. Asserted in the model, not demonstrated. |
| **Next steps file** | Orchestrator memory: summary, top 3 actions this week, focus of the next cycle. |

---

## 13. Key quotes

Line numbers refer to the exported transcript in §0; re-export reproduces them.

- "They don't just prompt a chatbot, and they definitely don't write code by hand, but instead they create these loops where the AI prompts itself." (11–14)
- "You start with the goal. This is set by the human once." (52–53)
- "The other key piece here is memory, which lives outside of the conversation and keeps track of what is going on, what steps have been completed so that the agents can successfully iterate." (73–77)
- "It burns massive tokens because it can go in any direction that it wants." (98–100)
- "I would recommend the closed loop, which is where you start with that bounded goal… There's a clear evaluation at each step, and this keeps budget fairly normal." (107–114)
- "Check if /outputs/next_steps exists. If it does, read it first. It is your memory from the previous cycle." (512–515)
- "It didn't have the full context of the quiz, so it got that wrong." (470–471)
- "As much as I love AI, I don't want to pretend like it is always perfect… you have to think for yourself, think critically." (659–671)
