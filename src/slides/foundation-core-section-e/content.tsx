// Single source of truth for all Section E slide copy. Plan A populates
// e1Content..e5Content; Plan B will append e6Content..e11Content.

import type { ReactNode } from "react";

export const e2Content = {
  headline: "Layer 1: Prompt — clarity.",
  headlineKeywords: ["Prompt"] as const,
  definition: "The instructions you give the model.",
  definitionKeywords: ["instructions"] as const,
  outcomes: [
    { text: "Vague in → vague out.", keywords: ["Vague in"] as const },
    { text: "Structured in → structured out.", keywords: ["Structured in"] as const },
    {
      text: "Show what good looks like → fewer iterations, more useful results.",
      keywords: ["Show what good looks like"] as const,
    },
  ],
  bridge: "Next: the canonical structure behind every good prompt.",
  bridgeKeywords: ["canonical structure"] as const,
  naivePrompt: "Write me this week's project report.",
  naiveResult: [
    "This week, the team made progress on several initiatives.",
    "Various items were completed and others are ongoing.",
    "Next week we plan to continue the work in flight.",
    "Please reach out with any questions.",
  ].join("\n"),
  properPrompt: [
    "Role: You are a project lead preparing the Friday status report.",
    "Task: Draft a concise weekly status — (1) what shipped, (2) what's at risk,",
    "      (3) what's planned for next week.",
    "Context: For the EOD Friday team standup. Audience: 8 cross-functional",
    "         stakeholders. Last week we missed a milestone on Module B.",
    "Examples: See last week's report (attached) — match structure, tone,",
    "          and focus areas.",
    "Output: Markdown, H2 sections, ~250 words. Lead with the at-risk item.",
  ].join("\n"),
  properElementLabels: ["Role:", "Task:", "Context:", "Examples:", "Output:"] as const,
  properResult: [
    "## At Risk: Module B",
    "Migration is 1 sprint behind plan; root cause is the upstream schema change.",
    "## Shipped",
    "- Onboarding revamp · 12% activation lift in test cohort",
    "- Checkout refactor merged behind flag",
    "## Next Week",
    "- Cut Module B remediation branch",
    "- Roll checkout flag to 25%",
  ].join("\n"),
};

export const e3Content = {
  headline: "One skeleton. Many names.",
  headlineKeywords: ["One skeleton"] as const,
  footerCaption: "Different mnemonics. Same six ingredients.",
  footerCaptionKeywords: ["Same six ingredients"] as const,
  spine: [
    {
      id: "role",
      num: 1 as const,
      name: "Role",
      essence: "Who AI should be",
      popoverLines: [
        "Define who the AI should be.",
        '"You are ... with N years exp specialized in ..."',
        "Examples: project lead, ops analyst, geology reviewer.",
      ],
    },
    {
      id: "instruction",
      num: 2 as const,
      name: "Instruction",
      essence: "Action to perform + how",
      popoverLines: [
        "Clear action + constraints.",
        '"Analyze ..." · "Please exclude ..." · "Ultrathink on ..."',
        "Also covers: style, tone, process detail, control.",
      ],
    },
    {
      id: "output",
      num: 3 as const,
      name: "Output Format",
      essence: "Shape of the result",
      popoverLines: [
        "Specify how the response is structured.",
        "Formats: Markdown · Tables · YAML · JSON · CSV · PDF.",
      ],
    },
    {
      id: "context",
      num: 4 as const,
      name: "Context",
      essence: "Background + audience",
      popoverLines: [
        "Essential additional information.",
        "Categories: Background · Objectives · Goal · Audience · Constraints.",
      ],
    },
    {
      id: "examples",
      num: 5 as const,
      name: "Examples",
      essence: "Show good output",
      popoverLines: [
        "Show what good output looks like.",
        "Forms: Attached example docs · sample input/output pairs.",
      ],
    },
    {
      id: "input",
      num: 6 as const,
      name: "Input",
      essence: "Specific data",
      popoverLines: [
        "The specific data to work with.",
        "Forms: Attached file · specific request.",
        "Note: User prompt; if instructions are generic → system prompt.",
      ],
    },
  ],
  frameworks: [
    { id: "race", acronym: "RACE", breakdown: "Role · Action · Context · Explanation", spineHits: [1, 2, 4] as const },
    { id: "care", acronym: "CARE", breakdown: "Context · Action · Result · Example", spineHits: [4, 2, 3, 5] as const },
    { id: "ape", acronym: "APE", breakdown: "Action · Purpose · Execution", spineHits: [2] as const },
    { id: "roses", acronym: "ROSES", breakdown: "Role · Objective · Scenario · Expected output · Solution", spineHits: [1, 2, 4, 3, 2] as const },
    { id: "create", acronym: "CREATE", breakdown: "Character · Request · Examples · Adjustments · Type · Extras", spineHits: [1, 2, 5, 3, 4] as const },
    { id: "coast", acronym: "COAST", breakdown: "Context · Objective · Actions · Scenario · Task", spineHits: [4, 2, 2, 4, 2] as const },
    { id: "tag", acronym: "TAG", breakdown: "Task · Action · Goal", spineHits: [2, 2, 2] as const },
    { id: "pain", acronym: "PAIN", breakdown: "Problem · Action · Information · Next steps", spineHits: [4, 2, 6, 2] as const },
    { id: "rise", acronym: "RISE", breakdown: "Role · Input · Steps · Execution", spineHits: [1, 6, 2, 2] as const },
    { id: "creo", acronym: "CREO", breakdown: "Context · Request · Explanation · Outcome", spineHits: [4, 2, 3, 2] as const },
  ],
};

// Helper used by E.3 slide to build SpineElement[] with React popover nodes.
export function spinePopoverContent(lines: readonly string[]): ReactNode {
  return (
    <ul className="flex flex-col gap-1 font-serif text-neutral-100" style={{ fontSize: "0.95rem", lineHeight: 1.4 }}>
      {lines.map((l, i) => (
        <li key={i}>{l}</li>
      ))}
    </ul>
  );
}
