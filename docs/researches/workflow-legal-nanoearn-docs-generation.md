# Workflow — Legal NanoEarn Document Generation

**Repo:** `/Users/macbook/Projects/_nanovest_bitbucket/n8n-projects/legal-nanoearn-docs-generation`
**Stack:** n8n + Gemini 2.5 Pro (no Claude)
**Last researched:** 2026-05-07

## What it does

Automatically generates legal placement documents (Agreement or Statement Letters) with dual approval gates (Finance → Legal), then triggers e-signature collection via Dropbox Sign, with AI-powered document revision on decline.

## Trigger

Dual entry points:
- **Admin Portal webhook** — `POST /legal-nanoearn-webhook`
- **Slack slash command** — `/nanoearn` opens a modal form

## Pipeline (6 chained sub-workflows)

| # | Sub-workflow | Nodes | Purpose |
|---|--------------|-------|---------|
| 1 | Slack Slash Command | 7 | Opens modal form |
| 2 | Slack Interactive Router | 9 | Routes form submission + approval buttons |
| 3 | Docs Generation | 38 | Creates document, calls Finance approval |
| 4 | Approval Workflow | 38 | Finance approve/decline → Legal approve/decline → Dropbox Sign |
| 5 | AI Revision Agent | 17 | On decline, uses Gemini 2.5 Pro to parse reason, regenerate document, route back to Finance |
| 6 | Dropbox Sign Webhook | 27 | Handles signature completion/decline, uploads signed PDF |

## AI agent usage (all Gemini, not Claude)

**Gemini 2.5 Pro** lives inside the AI Revision Agent sub-workflow. On a decline, it:
1. Parses the human-written decline reason
2. Extracts structured field changes (amounts, dates, translations)
3. Applies cascade updates (e.g., amount change → recalc word-form + yield)
4. Regenerates the document with fresh template

Temperature 0.1 — deterministic field extraction.

## Tools / integrations

- Google Docs (document templates, generation)
- Google Sheets (tracking)
- Google Drive (storage, modifiedTime cache invalidation)
- Slack (interactive buttons, modals, slash commands)
- Dropbox Sign (e-signature)
- Google Service Account JWT auth (auto-refresh with 5-min buffer)

## Data flow

Webhook payload (18 fields) → static config cache (n8n Data Tables, 95% API reduction) → folder structure (Year/Entity/User) → document generation (45 fields: number-to-words, Indonesian/English dates, yield calculations) → Google Sheets tracking → Slack interactive message with metadata → approval workflow → Dropbox Sign PDF export → signature request → webhook callback → PDF upload to Drive → completion notification.

## Visual topology

6 separate n8n workflows with 3 decision nodes:

- **Entry fork:** Admin Portal OR Slack slash → Interactive Router
- **Finance approval:** Approve → Legal request | Decline → AI Revision
- **Legal approval:** Approve → Dropbox Sign | Decline → AI Revision
- **Signature status:** All signed → upload PDF | Declined → notify team

Linear path: Trigger → Config load → Folder setup → Doc generation → Finance review → Legal review → E-signature → completion.
Revision loops: Decline → AI rewrite → back to Finance.

## Notable patterns

- **Data Tables caching** — timestamp comparison on Google Drive `modifiedTime`; cache invalidation triggers Sheets refresh
- **JWT token refresh** — 5-minute expiry buffer prevents mid-execution auth failures
- **Metadata embedding** — Slack message metadata stores context (tracking_sheet_id, document_url, client info), eliminating DB lookups in approval flow
- **Cascade updates** — amount field change triggers word-form recalc (IDR vs USD); date changes cascade to yield calculations
- **Structured AI output** — Gemini response parsed into `[field, old_value, new_value]` tuples for deterministic updates
- **Signature validation** — HMAC-SHA256 on all three webhooks (Slack slash, Slack interactive, Dropbox Sign) with 5-minute replay protection

## Animation cues (for portfolio harness simulation)

The workflow is **multi-branch with revision loops**. Best visual framing:

1. **Entry pulse** — single webhook/slash command triggers → bifurcates into config cache check (Data Tables decision diamond)
2. **Sequential spine** — linear left-to-right flow: Config → Folder setup → Doc generation → Slack post (with metadata bubble attached)
3. **Approval chevron** — Finance + Legal approval nodes as stacked horizontal gates; decline branches loop upward to AI Revision cloud
4. **AI rewrite loop** — Gemini icon pulsing inside cloud; arrows loop revised doc back to Finance approval
5. **Signature terminus** — Dropbox Sign box with PDF export; webhook arrow pointing back to completion node
6. **Caching side-channel** — faint Data Tables layer with timestamp comparison; cache-hit vs cache-miss fork

**Key motion metaphor:** *cascading approvals with intelligent revision loops* — approve/decline toggles in Finance/Legal nodes as binary switches; decline branches illuminate and route to AI cloud; AI agent pulses while processing, then sends back revised document as feedback arc to Finance.

**Color cues for animation:**
- Green for Gemini blocks
- Orange for decision diamonds
- Blue for Slack / webhook interactions
- Gold for Google API calls
- (Adjust to fit deck's copper-only palette: substitute the green/blue/gold with copper-stop variants)
