# Spec: E5 — Prompt Examples Slide
**File:** `src/slides/foundation-core-section-e/E5PromptExamples.tsx`
**Date:** 2026-06-01
**Status:** Ready for implementation (Task 2 of 4)

---

## Purpose

This slide replaces the current `e5Content` (best-practices / constraints wall) with a gallery of six annotated prompt examples. It is the payoff slide for Section E: after showing the six structures (E3) and three basic techniques (E4), attendees see exactly how those parts combine in a real prompt they could type themselves tomorrow.

Audience: ~400 management attendees, many 50+, non-technical. Keep every prompt short (3–6 sentences), plain language, zero jargon.

---

## Fixed Header / Footer Copy

| Field | Value |
|---|---|
| `figLabel` | `LAYER 1 · EXAMPLES` |
| `headline` | `The recipe, in real prompts.` |
| `headlineKw` | `["real prompts"]` |
| `footer` | `Notice the pattern, not the wording. Every strong prompt is just these parts, assembled.` |
| `footerKw` | `["pattern", "assembled"]` |

Footer is revealed on step 2 (after the user has clicked through at least one use case).

---

## Structure Element Reference (from E3)

| id | Name | Essence |
|---|---|---|
| `role` | Role | Who AI should be |
| `instruction` | Instruction | Action + how (constraints, style, process) |
| `output` | Output Format | Shape of result |
| `context` | Context | Background, objectives, audience, constraints |
| `examples` | Examples | Show what good output looks like |
| `input` | Input | The specific data to work with |

## Technique Reference (from E4, basic tier only)

| id | Title | Essence |
|---|---|---|
| `zero-shot` | Zero-Shot | Ask once, no examples |
| `few-shot` | Few-Shot | Show 2–3 examples |
| `cot` | Chain-of-Thought | Think step by step |

---

## The Six Use Cases

### Progression logic

- **email & summary** — simplest: 3–4 structures, Zero-Shot
- **actions & compare** — add Input; compare adds Chain-of-Thought reasoning
- **timeline & rewrite** — richest: 5 structures; timeline is the deliberate multi-technique demo (CoT + Few-Shot); rewrite is the Few-Shot showcase

---

### 1. `email` — Draft an Email

**Title:** Draft an Email
**Subtitle:** Turn a rough idea into a polished message.
**Icon:** `Mail`
**Technique(s):** Zero-Shot
**Goal:** Turn a rough idea into a properly toned, ready-to-send email without starting from scratch.

#### Prompt (full, concatenated)

```
You are a professional business writer.

Draft a short email to a colleague asking to reschedule next Tuesday's check-in — I have a conflicting commitment that just came up.

Keep it friendly and under 80 words.
```

#### Segments

| # | Text | Structure |
|---|---|---|
| 1 | `You are a professional business writer.` | `role` |
| 2 | `Draft a short email to a colleague asking to reschedule next Tuesday's check-in — I have a conflicting commitment that just came up.` | `instruction` |
| 3 | `Keep it friendly and under 80 words.` | `output` |

```jsonc
// segments array
[
  {
    "text": "You are a professional business writer.",
    "structure": "role"
  },
  {
    "text": "Draft a short email to a colleague asking to reschedule next Tuesday's check-in — I have a conflicting commitment that just came up.",
    "structure": "instruction"
  },
  {
    "text": "Keep it friendly and under 80 words.",
    "structure": "output"
  }
]
```

**structures:** `["role", "instruction", "output"]`

**techniques:**
```jsonc
[
  {
    "id": "zero-shot",
    "label": "Zero-Shot",
    "refs": []
  }
]
```

> Zero-Shot: no examples provided — the model draws on training to produce the output in one pass. `refs: []` (no special segment to highlight; it is the baseline technique).

---

### 2. `summary` — Summarize a Report

**Title:** Summarize a Report
**Subtitle:** Compress a long document into a short briefing.
**Icon:** `FileText`
**Technique(s):** Zero-Shot
**Goal:** Compress a lengthy report into a short, scannable briefing without reading every word yourself.

#### Prompt (full, concatenated)

```
Summarize the following report into a 5-bullet executive briefing.

The audience is senior management who have 2 minutes to read it, so lead with the most important finding and skip implementation detail.

[Paste report text here]
```

#### Segments

| # | Text | Structure |
|---|---|---|
| 1 | `Summarize the following report into a 5-bullet executive briefing.` | `instruction` |
| 2 | `The audience is senior management who have 2 minutes to read it, so lead with the most important finding and skip implementation detail.` | `context` |
| 3 | `[Paste report text here]` | `input` |

> Note: the Output Format (5-bullet executive briefing) is embedded in the instruction sentence rather than separated — this is intentional to keep the prompt feeling like one natural request. The `output` structure is therefore covered by the `instruction` segment. If the slide builder wants a discrete `output` pill, split segment 1 at the clause boundary:
> - `"Summarize the following report"` → `instruction`
> - `"into a 5-bullet executive briefing."` → `output`
>
> **Recommended split (cleaner for annotation):**

```jsonc
// segments array (recommended split)
[
  {
    "text": "Summarize the following report",
    "structure": "instruction"
  },
  {
    "text": "into a 5-bullet executive briefing.",
    "structure": "output"
  },
  {
    "text": "The audience is senior management who have 2 minutes to read it, so lead with the most important finding and skip implementation detail.",
    "structure": "context"
  },
  {
    "text": "[Paste report text here]",
    "structure": "input"
  }
]
```

**structures:** `["instruction", "output", "context", "input"]`

**techniques:**
```jsonc
[
  {
    "id": "zero-shot",
    "label": "Zero-Shot",
    "refs": []
  }
]
```

---

### 3. `actions` — Meeting → Action Items

**Title:** Meeting → Action Items
**Subtitle:** Turn messy notes into a clear task list.
**Icon:** `ListChecks`
**Technique(s):** Zero-Shot
**Goal:** Convert raw meeting notes into a clean, assigned action-item list without manually re-reading everything.

#### Prompt (full, concatenated)

```
You are an efficient meeting coordinator.

Read the notes below and extract every action item. For each item, list: the task, the person responsible, and the due date if mentioned.

Format the result as a numbered list. If no owner or date is clear, write "TBD."

[Paste meeting notes here]
```

#### Segments

| # | Text | Structure |
|---|---|---|
| 1 | `You are an efficient meeting coordinator.` | `role` |
| 2 | `Read the notes below and extract every action item. For each item, list: the task, the person responsible, and the due date if mentioned.` | `instruction` |
| 3 | `Format the result as a numbered list. If no owner or date is clear, write "TBD."` | `output` |
| 4 | `[Paste meeting notes here]` | `input` |

```jsonc
// segments array
[
  {
    "text": "You are an efficient meeting coordinator.",
    "structure": "role"
  },
  {
    "text": "Read the notes below and extract every action item. For each item, list: the task, the person responsible, and the due date if mentioned.",
    "structure": "instruction"
  },
  {
    "text": "Format the result as a numbered list. If no owner or date is clear, write \"TBD.\"",
    "structure": "output"
  },
  {
    "text": "[Paste meeting notes here]",
    "structure": "input"
  }
]
```

**structures:** `["role", "instruction", "output", "input"]`

**techniques:**
```jsonc
[
  {
    "id": "zero-shot",
    "label": "Zero-Shot",
    "refs": []
  }
]
```

---

### 4. `compare` — Compare & Recommend

**Title:** Compare & Recommend
**Subtitle:** Weigh options side-by-side, then pick one.
**Icon:** `Scale`
**Technique(s):** Chain-of-Thought
**Goal:** Get a structured comparison of two or more options — and a final recommendation with clear reasoning — rather than a vague "it depends."

#### Prompt (full, concatenated)

```
I need to choose a tool for managing our team's weekly reporting: Option A is a shared spreadsheet, Option B is a project management app we already have a licence for.

Think through this step by step: first compare them on ease of use, visibility for stakeholders, and maintenance effort. Then weigh those factors for a 12-person team where most members are not tech-savvy.

End with a single clear recommendation and a one-sentence reason.
```

#### Segments

| # | Text | Structure |
|---|---|---|
| 1 | `I need to choose a tool for managing our team's weekly reporting: Option A is a shared spreadsheet, Option B is a project management app we already have a licence for.` | `input` |
| 2 | `Think through this step by step: first compare them on ease of use, visibility for stakeholders, and maintenance effort.` | `instruction` |
| 3 | `Then weigh those factors for a 12-person team where most members are not tech-savvy.` | `context` |
| 4 | `End with a single clear recommendation and a one-sentence reason.` | `output` |

```jsonc
// segments array
[
  {
    "text": "I need to choose a tool for managing our team's weekly reporting: Option A is a shared spreadsheet, Option B is a project management app we already have a licence for.",
    "structure": "input"
  },
  {
    "text": "Think through this step by step: first compare them on ease of use, visibility for stakeholders, and maintenance effort.",
    "structure": "instruction"
  },
  {
    "text": "Then weigh those factors for a 12-person team where most members are not tech-savvy.",
    "structure": "context"
  },
  {
    "text": "End with a single clear recommendation and a one-sentence reason.",
    "structure": "output"
  }
]
```

**structures:** `["input", "instruction", "context", "output"]`

**techniques:**
```jsonc
[
  {
    "id": "cot",
    "label": "Chain-of-Thought",
    "refs": ["instruction"]
  }
]
```

> Chain-of-Thought is activated by "Think through this step by step" in the `instruction` segment — highlight that segment when the CoT pill is hovered.

---

### 5. `timeline` — Plan a Project Timeline

**Title:** Plan a Project Timeline
**Subtitle:** Break a goal into phases with dates.
**Icon:** `Calendar`
**Technique(s):** Chain-of-Thought + Few-Shot

> **Multi-technique demo note:** This is the one prompt where two techniques are legitimately present. Chain-of-Thought appears in the instruction ("work through each phase in order"). Few-Shot appears as a concrete example of how one phase should be written. Keep it short — the example is only 2 lines.

**Goal:** Break a high-level goal into a realistic, phased schedule with named milestones and target dates.

#### Prompt (full, concatenated)

```
You are an experienced project planner.

I need a four-phase rollout plan for launching a new internal reporting process across a department of 60 people, starting 1 July. Work through each phase in order: define the goal of the phase, who is involved, and the target completion date.

Write each phase in this format —
Phase 1 — [Name]: [Goal]. Team: [who]. Done by: [date].

Present the result as a short numbered list, one phase per line.
```

#### Segments

| # | Text | Structure |
|---|---|---|
| 1 | `You are an experienced project planner.` | `role` |
| 2 | `I need a four-phase rollout plan for launching a new internal reporting process across a department of 60 people, starting 1 July.` | `context` |
| 3 | `Work through each phase in order: define the goal of the phase, who is involved, and the target completion date.` | `instruction` |
| 4 | `Write each phase in this format — Phase 1 — [Name]: [Goal]. Team: [who]. Done by: [date].` | `examples` |
| 5 | `Present the result as a short numbered list, one phase per line.` | `output` |

```jsonc
// segments array
[
  {
    "text": "You are an experienced project planner.",
    "structure": "role"
  },
  {
    "text": "I need a four-phase rollout plan for launching a new internal reporting process across a department of 60 people, starting 1 July.",
    "structure": "context"
  },
  {
    "text": "Work through each phase in order: define the goal of the phase, who is involved, and the target completion date.",
    "structure": "instruction"
  },
  {
    "text": "Write each phase in this format — Phase 1 — [Name]: [Goal]. Team: [who]. Done by: [date].",
    "structure": "examples"
  },
  {
    "text": "Present the result as a short numbered list, one phase per line.",
    "structure": "output"
  }
]
```

**structures:** `["role", "context", "instruction", "examples", "output"]`

**techniques:**
```jsonc
[
  {
    "id": "cot",
    "label": "Chain-of-Thought",
    "refs": ["instruction"]
  },
  {
    "id": "few-shot",
    "label": "Few-Shot",
    "refs": ["examples"]
  }
]
```

> CoT: "Work through each phase in order" tells the model to reason sequentially — highlight `instruction`.
> Few-Shot: the format template (`Phase 1 — [Name]: ...`) is a one-shot output example — highlight `examples`.

---

### 6. `rewrite` — Rewrite for an Audience

**Title:** Rewrite for an Audience
**Subtitle:** Make technical text plain for non-experts.
**Icon:** `Users`
**Technique(s):** Few-Shot
**Goal:** Transform jargon-heavy text into plain language that any non-specialist can understand and act on.

> **Few-Shot requirement:** The prompt must include a short "before → after" example pair embedded inside it, using generic IT or HR jargon (NOT mining). This gives the model a concrete target tone.

#### Prompt (full, concatenated)

```
You are a plain-language editor.

Rewrite the paragraph below so that anyone unfamiliar with technical terms can understand it. Match the style of this example:

Before: "The system will undergo scheduled maintenance to apply critical security patches and upgrade legacy middleware dependencies."
After: "We will briefly take the system offline to fix security issues and update some older software components."

Keep the same meaning, use short sentences, and avoid any technical terms.

[Paste the paragraph to rewrite here]
```

#### Segments

| # | Text | Structure |
|---|---|---|
| 1 | `You are a plain-language editor.` | `role` |
| 2 | `Rewrite the paragraph below so that anyone unfamiliar with technical terms can understand it.` | `instruction` |
| 3 | `Match the style of this example: Before: "The system will undergo scheduled maintenance to apply critical security patches and upgrade legacy middleware dependencies." After: "We will briefly take the system offline to fix security issues and update some older software components."` | `examples` |
| 4 | `Keep the same meaning, use short sentences, and avoid any technical terms.` | `output` |
| 5 | `[Paste the paragraph to rewrite here]` | `input` |

```jsonc
// segments array
[
  {
    "text": "You are a plain-language editor.",
    "structure": "role"
  },
  {
    "text": "Rewrite the paragraph below so that anyone unfamiliar with technical terms can understand it.",
    "structure": "instruction"
  },
  {
    "text": "Match the style of this example:\nBefore: \"The system will undergo scheduled maintenance to apply critical security patches and upgrade legacy middleware dependencies.\"\nAfter: \"We will briefly take the system offline to fix security issues and update some older software components.\"",
    "structure": "examples"
  },
  {
    "text": "Keep the same meaning, use short sentences, and avoid any technical terms.",
    "structure": "output"
  },
  {
    "text": "[Paste the paragraph to rewrite here]",
    "structure": "input"
  }
]
```

**structures:** `["role", "instruction", "examples", "output", "input"]`

**techniques:**
```jsonc
[
  {
    "id": "few-shot",
    "label": "Few-Shot",
    "refs": ["examples"]
  }
]
```

> Few-Shot: the before/after example pair in the `examples` segment is the shot. Highlight it when the Few-Shot pill is hovered.

---

## Progression Summary

| Order | id | Structures used | # Structures | Technique(s) |
|---|---|---|---|---|
| 1 | `email` | role, instruction, output | 3 | Zero-Shot |
| 2 | `summary` | instruction, output, context, input | 4 | Zero-Shot |
| 3 | `actions` | role, instruction, output, input | 4 | Zero-Shot |
| 4 | `compare` | input, instruction, context, output | 4 | Chain-of-Thought |
| 5 | `timeline` | role, context, instruction, examples, output | 5 | CoT + Few-Shot |
| 6 | `rewrite` | role, instruction, examples, output, input | 5 | Few-Shot |

Structure coverage across all six use cases:
- `role` — used in: email, actions, timeline, rewrite (4 of 6)
- `instruction` — used in: all 6 (6 of 6)
- `output` — used in: all 6 (6 of 6)
- `context` — used in: summary, compare, timeline (3 of 6)
- `examples` — used in: timeline, rewrite (2 of 6) — the two non-Zero-Shot showcases
- `input` — used in: summary, actions, compare, rewrite (4 of 6)

---

## Data Model Summary

The slide builder should transcribe this into `e5Content` in `src/slides/foundation-core-section-e/content.tsx`. Field shape:

```typescript
export const e5Content = {
  figLabel: "LAYER 1 · EXAMPLES",
  headline: "The recipe, in real prompts.",
  headlineKw: ["real prompts"],
  footer: "Notice the pattern, not the wording. Every strong prompt is just these parts, assembled.",
  footerKw: ["pattern", "assembled"],

  useCases: [
    // --- 1. email ---
    {
      id: "email",
      icon: "Mail",
      title: "Draft an Email",
      subtitle: "Turn a rough idea into a polished message.",
      goal: "Turn a rough idea into a properly toned, ready-to-send email without starting from scratch.",
      segments: [
        { text: "You are a professional business writer.", structure: "role" },
        { text: "Draft a short email to a colleague asking to reschedule next Tuesday's check-in — I have a conflicting commitment that just came up.", structure: "instruction" },
        { text: "Keep it friendly and under 80 words.", structure: "output" },
      ],
      structures: ["role", "instruction", "output"],
      techniques: [
        { id: "zero-shot", label: "Zero-Shot", refs: [] },
      ],
    },

    // --- 2. summary ---
    {
      id: "summary",
      icon: "FileText",
      title: "Summarize a Report",
      subtitle: "Compress a long document into a short briefing.",
      goal: "Compress a lengthy report into a short, scannable briefing without reading every word yourself.",
      segments: [
        { text: "Summarize the following report", structure: "instruction" },
        { text: "into a 5-bullet executive briefing.", structure: "output" },
        { text: "The audience is senior management who have 2 minutes to read it, so lead with the most important finding and skip implementation detail.", structure: "context" },
        { text: "[Paste report text here]", structure: "input" },
      ],
      structures: ["instruction", "output", "context", "input"],
      techniques: [
        { id: "zero-shot", label: "Zero-Shot", refs: [] },
      ],
    },

    // --- 3. actions ---
    {
      id: "actions",
      icon: "ListChecks",
      title: "Meeting → Action Items",
      subtitle: "Turn messy notes into a clear task list.",
      goal: "Convert raw meeting notes into a clean, assigned action-item list without manually re-reading everything.",
      segments: [
        { text: "You are an efficient meeting coordinator.", structure: "role" },
        { text: "Read the notes below and extract every action item. For each item, list: the task, the person responsible, and the due date if mentioned.", structure: "instruction" },
        { text: "Format the result as a numbered list. If no owner or date is clear, write \"TBD.\"", structure: "output" },
        { text: "[Paste meeting notes here]", structure: "input" },
      ],
      structures: ["role", "instruction", "output", "input"],
      techniques: [
        { id: "zero-shot", label: "Zero-Shot", refs: [] },
      ],
    },

    // --- 4. compare ---
    {
      id: "compare",
      icon: "Scale",
      title: "Compare & Recommend",
      subtitle: "Weigh options side-by-side, then pick one.",
      goal: "Get a structured comparison of two or more options — and a final recommendation with clear reasoning — rather than a vague \"it depends.\"",
      segments: [
        { text: "I need to choose a tool for managing our team's weekly reporting: Option A is a shared spreadsheet, Option B is a project management app we already have a licence for.", structure: "input" },
        { text: "Think through this step by step: first compare them on ease of use, visibility for stakeholders, and maintenance effort.", structure: "instruction" },
        { text: "Then weigh those factors for a 12-person team where most members are not tech-savvy.", structure: "context" },
        { text: "End with a single clear recommendation and a one-sentence reason.", structure: "output" },
      ],
      structures: ["input", "instruction", "context", "output"],
      techniques: [
        { id: "cot", label: "Chain-of-Thought", refs: ["instruction"] },
      ],
    },

    // --- 5. timeline ---
    {
      id: "timeline",
      icon: "Calendar",
      title: "Plan a Project Timeline",
      subtitle: "Break a goal into phases with dates.",
      goal: "Break a high-level goal into a realistic, phased schedule with named milestones and target dates.",
      segments: [
        { text: "You are an experienced project planner.", structure: "role" },
        { text: "I need a four-phase rollout plan for launching a new internal reporting process across a department of 60 people, starting 1 July.", structure: "context" },
        { text: "Work through each phase in order: define the goal of the phase, who is involved, and the target completion date.", structure: "instruction" },
        { text: "Write each phase in this format — Phase 1 — [Name]: [Goal]. Team: [who]. Done by: [date].", structure: "examples" },
        { text: "Present the result as a short numbered list, one phase per line.", structure: "output" },
      ],
      structures: ["role", "context", "instruction", "examples", "output"],
      techniques: [
        { id: "cot",      label: "Chain-of-Thought", refs: ["instruction"] },
        { id: "few-shot", label: "Few-Shot",          refs: ["examples"] },
      ],
    },

    // --- 6. rewrite ---
    {
      id: "rewrite",
      icon: "Users",
      title: "Rewrite for an Audience",
      subtitle: "Make technical text plain for non-experts.",
      goal: "Transform jargon-heavy text into plain language that any non-specialist can understand and act on.",
      segments: [
        { text: "You are a plain-language editor.", structure: "role" },
        { text: "Rewrite the paragraph below so that anyone unfamiliar with technical terms can understand it.", structure: "instruction" },
        {
          text: "Match the style of this example:\nBefore: \"The system will undergo scheduled maintenance to apply critical security patches and upgrade legacy middleware dependencies.\"\nAfter: \"We will briefly take the system offline to fix security issues and update some older software components.\"",
          structure: "examples"
        },
        { text: "Keep the same meaning, use short sentences, and avoid any technical terms.", structure: "output" },
        { text: "[Paste the paragraph to rewrite here]", structure: "input" },
      ],
      structures: ["role", "instruction", "examples", "output", "input"],
      techniques: [
        { id: "few-shot", label: "Few-Shot", refs: ["examples"] },
      ],
    },
  ],
} as const;
```

---

## Implementation Notes for Task 2

1. **Segment rendering:** Each `segment.text` renders as an inline span. The span receives a color-coded underline / background tint keyed to `segment.structure`. Concatenating all segment spans (with natural spacing) must read as one fluent paragraph of prose.

2. **Structure pills:** Rendered from `structures[]` in the order given. Each pill, when hovered or clicked, highlights every segment whose `structure` matches that pill's id.

3. **Technique pills:** Rendered separately. When a technique pill is hovered, highlight every segment whose `structure` id appears in that technique's `refs[]`. If `refs` is empty (Zero-Shot), no segments are highlighted — the pill is informational only.

4. **Placeholder text** (`[Paste … here]`) should render in a visually distinct style (e.g., muted italic) to signal "user fills this in." It still carries the `input` structure id and receives the Input color.

5. **`summary` segment 1+2 join:** The slide renderer should concatenate segment 1 (`"Summarize the following report"`) and segment 2 (`"into a 5-bullet executive briefing."`) with a single space — they read as one sentence, just color-split at the clause boundary. No newline between them.

6. **`rewrite` examples segment newlines:** The `\n` characters in the examples segment text should render as line breaks within the highlighted span (use `white-space: pre-line` or split on `\n`).

7. **Keyword highlighting (deck-wide rule):** Apply copper-accent + italic to 1–3 keywords in each `subtitle` or `goal` string at render time, consistent with the rest of the deck. Suggested keywords per use case:
   - email: `polished message`
   - summary: `short briefing`
   - actions: `clear task list`
   - compare: `recommendation`
   - timeline: `phases with dates`
   - rewrite: `non-experts`
