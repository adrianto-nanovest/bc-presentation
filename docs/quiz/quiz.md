# BCE AI Workshop — Comprehension Quiz

> **For event organizer use.** Ten multiple-choice questions covering Sections B through H and J, in order.
> Each question has exactly one correct answer. The answer key is at the bottom of this file.
> Recommended time: ~12 minutes (≈70 seconds per question).

---

## Section B — The AI Landscape

### Q1. The Nested Family of Terminology

In Section B, AI terminology was presented as **five concentric rings**, where each inner ring is a *subset* of the outer one — not equal categories. Which of the following correctly orders the rings from **broadest** (outermost) to **narrowest** (innermost)?

- **A.** Machine Learning → Artificial Intelligence → Deep Learning → Generative AI → Large Language Models
- **B.** Artificial Intelligence → Machine Learning → Deep Learning → Generative AI → Large Language Models
- **C.** Artificial Intelligence → Deep Learning → Machine Learning → Large Language Models → Generative AI
- **D.** Generative AI → Large Language Models → Deep Learning → Machine Learning → Artificial Intelligence

---

## Section C — Mindset

### Q2. The Shape of Human–AI Collaboration

Section C describes the shape of human–AI collaboration as a four-stage workflow: **Specify → Generate → Verify → Ship It.** Which option best captures *who does what* in this new shape of work?

- **A.** Humans specify, generate, and verify; AI only ships the result.
- **B.** Humans focus on **Specify** and **Verify**; AI handles the bulk of **Generate**.
- **C.** AI specifies and verifies; humans generate the actual content by hand.
- **D.** Humans and AI split every stage roughly 50/50.

---

## Section D — Foundation Core (Process before Automation)

### Q3. Walking the Decision Tree

Section D presented a five-question decision tree for choosing the right level of automation (**BPM → RPA → IPA → Agentic**). The tree must be walked **in order**, and skipping a level was warned to make "the level above fail harder."

A team walks the tree and finds: their process *works today*, they have *already removed waste and bottlenecks*, they have *repetitive rule-based steps*, BUT the steps **do not** need AI's core strengths (summarization, NLU, etc.). Which level is the correct fit?

- **A.** BPM — go back and redesign the process.
- **B.** RPA — automate the rule-based steps; reclaim hours.
- **C.** IPA — layer AI's core strengths on top.
- **D.** Agentic — let an autonomous agent pursue the goal.

---

## Section E — Foundation Core (The Three Layers)

### Q4. The Three Nested Layers

Section E introduced three nested engineering layers of AI system design, where each outer layer *contains* the inner ones. Which option lists them correctly from **innermost (the instructions)** to **outermost (the system around the model)**?

- **A.** Prompt → Context → Harness
- **B.** Context → Prompt → Harness
- **C.** Harness → Context → Prompt
- **D.** Prompt → Harness → Context

### Q5. The Harness Practices

Section E's harness layer enumerates **eight practices** that production-grade teams use to make agents reliable — things like *orchestration*, *plugins*, *memory*, *observability*, *triggers*, *spec-driven development*, *human-in-the-loop*, and *autonomous retry loops*. Which of the following is **NOT** one of those eight harness practices?

- **A.** Orchestration
- **B.** Observability
- **C.** Tokenization
- **D.** Human-in-the-Loop

---

## Section F — Foundation Techniques (The Agentic Stack)

### Q6. Skills and Progressive Disclosure

Section F introduced **Skills** as a way to package expertise that Claude can load on demand. The defining characteristic of a Skill is **progressive disclosure** — three levels of information loaded at different times to keep the context budget lean while keeping expertise unlimited. Which option correctly describes the progressive-disclosure model?

- **A.** All three levels (metadata, instructions, resources) are fully loaded at the start of every session.
- **B.** **Metadata** is always loaded; **instructions** load only when the Skill is triggered; **resources** load only as needed.
- **C.** Resources are loaded first; instructions next; metadata is appended at the end of the session.
- **D.** A Skill loads its full contents in a fixed order regardless of whether the user invokes it.

### Q7. Agent Orchestration Patterns

Section F described **four canonical orchestration patterns** for multi-agent workflows — each one a different shape of how sub-agents coordinate to finish a job. Which of the following is **NOT** one of those four patterns?

- **A.** Centralized — a planner at the top dispatches to workers.
- **B.** Decentralized — peer mesh, agents coordinate among themselves.
- **C.** Chain — sequential hand-off, one agent feeds the next.
- **D.** Recursive — each agent spawns a copy of itself indefinitely.

---

## Section G — Application (Choosing the Right Tools)

### Q8. The Specialization Principle

Section G surveyed Claude, Google, and OpenAI ecosystems and closed with a guiding principle for choosing among them. Which statement matches the principle as presented?

- **A.** "Pick the most capable vendor and use it for everything."
- **B.** "Open-source tools always beat frontier ones in the long run."
- **C.** "Pick the right tool for each task — never the right vendor for every task."
- **D.** "Always default to the cheapest tool that gets the job done."

---

## Section H — The Discipline

### Q9. Untrained Use vs. Trained Use

Section H ("The Discipline") opened with **eight pitfalls of untrained AI use** — things like *vibe coding*, *prompt-and-pray*, *tool overload*, *context rot*, and *confidently-wrong*. Which of the following was **NOT** listed as one of those untrained-use pitfalls in H.1?

- **A.** Vibe coding
- **B.** Prompt-and-pray
- **C.** Context rot
- **D.** Spec-driven iteration

---

## Section J — The Recipe (Closing)

### Q10. Mindset Before Tools

Section J closed the workshop with **five hard-earned mindset principles**, framed as *"Mindset before tools."* Which of the following is one of those five principles as it appeared on the slide?

- **A.** "Foundation precedes velocity — understand before you output."
- **B.** "Always adopt the newest model the day it launches."
- **C.** "Optimize for output first; refine the spec later."
- **D.** "Solo builders should skip specs and ship by feel."

---

## Answer Key

> **For facilitators only.** Do not distribute with the quiz form.

| #   | Section | Correct Answer | Source on the slide                                                                                       |
| --- | ------- | -------------- | --------------------------------------------------------------------------------------------------------- |
| 1   | B.2     | **B**          | "Five rings, one nested family" — AI ⊃ ML ⊃ DL ⊃ GenAI ⊃ LLM                                              |
| 2   | C.3–C.4 | **B**          | "AI handles the typing. You handle the thinking." + the V-shaped workflow (Specify/Verify shift up).      |
| 3   | D.4     | **B**          | Decision tree: repetitive rule-based steps **without** needing AI's core strengths → stop at **RPA**.     |
| 4   | E.1     | **A**          | Three layers: Prompt (instructions) → Context (information) → Harness (the system around the model).     |
| 5   | E.10    | **C**          | Eight harness practices are Orchestration, Plugins, Memory, Observability, Triggers, Spec-driven, HITL, Ralph Wiggum. **Tokenization** is a Section B.3 LLM-pipeline stage, not a harness practice. |
| 6   | F.4     | **B**          | Progressive disclosure: L1 metadata always loaded → L2 instructions on trigger → L3 resources as needed. |
| 7   | F.7     | **D**          | The four canonical patterns are **Centralized · Decentralized · Chain · Parallel** (fan-out/merge). "Recursive" is not in the set. |
| 8   | G.1     | **C**          | "Pick the right tool for each task — never the right vendor for every task."                              |
| 9   | H.1     | **D**          | "Spec-driven" is a Section E harness practice, **not** an H.1 pitfall.                                    |
| 10  | J.2     | **A**          | First of the five principles: "Foundation precedes velocity."                                             |

---

## Scoring Guidance

- **9–10 correct** — Strong grasp of the workshop's full arc; ready to apply.
- **6–8 correct** — Solid understanding of mindset + headlines; revisit the technical sections (E, F).
- **3–5 correct** — Core ideas landed; recommend a recap of the three-layer model and the agentic stack.
- **0–2 correct** — Encourage a re-watch; focus first on Sections B and C (terminology + mindset) before tools.
