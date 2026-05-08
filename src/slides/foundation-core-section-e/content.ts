// Single source of truth for all Section E slide copy. Plan A populates
// e1Content..e5Content; Plan B will append e6Content..e11Content.

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
