# Vendor pricing and data-handling terms — the evidence D.4 and D.5 rest on

**Research date:** 2026-08-04 · **every web claim in this file was read live on that date**
**Ticket:** [#52](https://github.com/adrianto-nanovest/bc-presentation/issues/52) · gates
[#58](https://github.com/adrianto-nanovest/bc-presentation/issues/58) (D.4 `invest-security`) and
[#59](https://github.com/adrianto-nanovest/bc-presentation/issues/59) (D.5 `invest-subscription`)
**Spec:** `docs/specs/2026-08-03-gems-catalyst-implementation-spec.md` §12.2, §6.7, §11 Phase 6
**Vendors:** Anthropic, Google, OpenAI — the three the deck already names. **No vendor added for symmetry.**
**Tiers:** personal consumer account · company-managed workspace · self-hosted / on-prem

§12.2 calls this "the highest-consequence place in the deck to be wrong, in a group with real
compliance obligations." Nothing renders from this file directly. It is the record the two slide
tickets lift copy from, and which a reviewer can re-check next month against the same URLs (§11).

---

## 0 · Rules for using this file

1. **Every claim below is tagged.** `CONFIRMED` = the quoted sentence was read on the vendor's own
   page on 2026-08-04. `INFERENCE` = reasoned from confirmed text, not stated by the vendor.
   `UNVERIFIED` = could not be sourced primarily today. `ABSENT` = confirmed *not* published, which
   is a finding, not a gap.
2. **No secondary source is the sole basis for anything here.** Every row cites the vendor's own
   terms, DPA, privacy centre, official docs, trust portal, or pricing page. Where only a search
   snippet existed, the row is `UNVERIFIED` and carries no claim.
3. **Every `UNVERIFIED` and every deliberately-omitted claim has a category-level replacement
   sentence in §7**, written to §12.2's instruction: describe the category, name no vendor's current
   policy. Those sentences are ready to lift onto the slide as-is.
4. **Prices are a snapshot.** Currency, billing period and date read are on every price. Prices move;
   re-check §10's short list before any session after **2026-09-04**.
5. **Where a vendor contradicts itself, both statements are recorded with both URLs.** Four such
   conflicts exist (§3.4, §4.4, §5.4). None is resolved here, because neither side can be
   demoted without a source saying so.

### 0.1 Geolocation caveat — read this before quoting any consumer price

This machine renders from **Indonesia**. `chatgpt.com/pricing`, `gemini.google/subscriptions` and
`one.google.com/about/plans` are IP-geolocated and returned **IDR**; `?country=US`, `?currency=USD`,
`gl=us` and `hl=en` were all ignored. So:

- **USD consumer prices for ChatGPT Go, Google AI Plus / Pro / Ultra are `UNVERIFIED`.** No USD
  figure is asserted for them anywhere in this file.
- The **IDR** figures for those plans *are* `CONFIRMED` live, and for an Indonesian audience they are
  the better anchor anyway. Use them, labelled IDR.
- Anthropic's `claude.com/pricing` and OpenAI's `help.openai.com` articles render **USD**, so the
  Claude and ChatGPT Plus/Business/Pro numbers are USD-confirmed.

---

## 1 · The one table D.4 beat 1 needs

Beat 1 is *"where your data actually goes"* across three tiers. This is that answer, every cell
sourced in §3–§5. **Read the diagonal:** the tier changes the contract, not the interface.

| | **Personal consumer account** | **Company-managed workspace** | **Self-hosted / on-prem** |
|---|---|---|---|
| **Anthropic** | Trains by default, **opt-out** in settings (forced choice at signup). 30 d retention if off, **5 y de-identified** if on | **Contractually barred** from training. Chats retained **indefinitely by default**; Enterprise can set ≥30 d | **No on-prem SKU.** Bedrock / Vertex / Foundry — the cloud is the processor. Foundry "Hosted on Azure" keeps prompts in Azure |
| **Google** | **Trains by default**, `Keep Activity` toggle. Human-reviewed chats kept **3 y and survive your deletion** | **Contractually barred** (Workspace SST §12.11, GCP SST §18). 90 d → indefinite, admin-set | **No self-installed Gemini.** GEAP = Google-operated in your project; **GDC air-gapped** is genuine on-prem, contact-sales |
| **OpenAI** | Trains by default, `Improve the model for everyone` toggle. 30 d delete tail — **but Apr–Sep 2025 data is still held under legal hold** | **Contractually barred** (Services Agreement §4.2) — **admin can opt the workspace back in**. 30 d delete tail | **No on-prem frontier model.** `gpt-oss` is genuinely self-hostable (Apache 2.0) but is **not frontier**; Azure = Microsoft-hosted |
| **Admin exists?** | **No. None of the three.** No audit export, no revoke, no leaver control | Yes — audit/compliance export is **top-tier-gated** at all three (Anthropic Enterprise-only, OpenAI Enterprise/Edu-only) | Whatever you build. The cloud provider's IAM, or nothing |
| **Residency** | `ABSENT` at all three | Published at all three, **narrower than it reads** — see §6 | Inherent (your hardware) or your cloud's region |

**The single most quotable line, and it is Anthropic's own:** *"By default, we may route customer
traffic to select countries in the US, Europe, Asia and Australia… **Note that data is stored in the
US.**"* ([privacy.claude.com](https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers), read 2026-08-04.) Inference location and storage
location are different questions. That generalizes to all three vendors and it is the one thing a
Div Head is most likely to get wrong.

### 1.1 Three findings that strengthen beat 2 more than the tier table does

D.4 beat 2 is *"your real exposure today is shadow AI — data you cannot audit, revoke, or produce."*
All three of these are primary-sourced and land harder than a generic warning:

1. **Google: deletion cannot reach human-reviewed consumer chats.** *"If you delete your activity,
   past chats already reviewed by service providers aren't deleted because they aren't connected to
   your Google Account. Instead, they're retained for up to 3 years."*
   ([support.google.com](https://support.google.com/gemini/answer/13594961?hl=en)) The same page says
   *"Please don't enter confidential information."*
2. **OpenAI: litigation overrode the published retention policy.** The blanket preservation order
   ended **2025-09-26**, but *"we will securely store limited historical April–September 2025 user
   data"*, de-identified conversations were **produced under a later court order**, and the appeal was
   live as of OpenAI's last published update (**2025-12-16** — no 2026 update exists).
   ChatGPT **Enterprise and Edu were excluded throughout.**
   ([openai.com](https://openai.com/index/response-to-nyt-data-demands/) ·
   [openai.com](https://openai.com/new-york-times/)) This is the strongest available answer to
   *"cannot produce"* — and it is about a court order, not about vendor behaviour.
3. **Anthropic: a personal account on a company email can be absorbed.** *"your Account may be
   linked to the organization's Anthropic enterprise account, and the organization's administrator
   may be able to monitor and control the Account, including having access to Materials"*
   ([Consumer Terms §3](https://www.anthropic.com/legal/consumer-terms)) — the shadow-AI account is
   not permanently outside governance; it is outside it *until someone claims the domain*.

---

## 2 · What is NOT usable on the slide, by instruction

**No vendor-leniency, laxity, or enforcement-weakness claim is available in this record, and none may
appear on any slide.** §6.7 keeps the *"ChatGPT seems not strict"* comparison **verbal**: choosing a
vendor by the weakness of its enforcement, printed three slides from the governance recommendation,
is indefensible in a Sinar Mas context.

This section exists so a later reader cannot mistake absence for an unfinished search. **It was not
researched and it is not here.** The three vendor agents were instructed not to gather it. If a
future reader wants that claim on a slide, it needs new evidence *and* a new decision on §6.7 —
this file supplies neither.

Also off-slide: nothing here characterises what any vendor *does in practice* beyond what its own
published terms state.

---

## 3 · Anthropic (Claude)

Controlling documents, dates as published on the pages read **2026-08-04**: Consumer Terms
**eff. 2025-10-08** · Commercial Terms **eff. 2025-06-17** · Privacy Policy **eff. 2026-07-08** ·
DPA **eff. 2025-02-24**.

### 3.1 Tier 1 — personal (Free / Pro / Max)

*All rows read 2026-08-04.*

| Dim | Finding | Evidence |
|---|---|---|
| **A · Trains by default** | `CONFIRMED` **Yes, opt-out.** Forced choice at signup rather than a silent default | *"including training our models, unless you opt out of training through your account settings"* — [Consumer Terms §4](https://www.anthropic.com/legal/consumer-terms) · *"If you're a new user, you can select your preference in the signup process"* — [news](https://www.anthropic.com/news/updates-to-our-consumer-terms) |
| **A · What survives opt-out** | `CONFIRMED` Two carve-outs | *"Even if you opt out, we will use Materials for model training when: (1) you provide Feedback… or (2) your Materials are flagged for safety review"* — [Consumer Terms §4](https://www.anthropic.com/legal/consumer-terms) |
| **A · Incognito** | `CONFIRMED` Excluded even with training on | *"Your Incognito chats are not used to improve Claude, even if you have enabled Model Improvement"* — [privacy centre](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data) |
| **B · Retention** | `CONFIRMED` **30 d if training off; up to 5 y de-identified if on.** Opt-out is not retroactive | *"Users who don't allow data use for model improvement: 30-day retention period"* — [code docs](https://code.claude.com/docs/en/data-usage) · *"up to 5 years in our model training pipelines"* · *"still be included in model training runs that are already in progress"* — [privacy centre](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data) |
| **B · Deletion real or flag** | `CONFIRMED` **Real, with a 30-day backend tail** | *"Removed from your chat history immediately / Deleted from our back-end storage systems within 30 days"* — [privacy centre](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data) |
| **B · Separate longer clocks** | `CONFIRMED` Flagged content **2 y**; T&S classification scores **7 y**; feedback **5 y**; Claude Code `/share` 6 mo | *"inputs and outputs for up to 2 years and trust and safety classification scores for up to 7 years if your chat or session is flagged"* — [privacy centre](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data) |
| **C · Admin / audit / leaver** | `ABSENT` **No admin tier.** SSO, RBAC, SCIM, audit logs, Compliance API, custom retention all blank on Free/Pro/Max | Feature matrix, "Security and administration" — [claude.com/pricing](https://claude.com/pricing) |
| **C · Corporate-email caveat** | `CONFIRMED` **Load-bearing for beat 2** — see §1.1 | *"the organization's administrator may be able to monitor and control the Account, including having access to Materials"* — [Consumer Terms §3](https://www.anthropic.com/legal/consumer-terms) |
| **D · Residency** | `ABSENT` for consumer. Residency controls are published only for the API/Platform and usage-based Enterprise | *"US-only inference is available on usage-based Enterprise plans"* — [support](https://support.claude.com/en/articles/15422948-enable-us-only-inference-for-your-organization) |
| **E · Price** | `CONFIRMED` Free **$0**. Pro **USD 17/mo billed annually ($200 up front)**, **USD 20/mo month-to-month**. Max 5x **USD 100/mo**, Max 20x **USD 200/mo**, **monthly only** | *"$17 — Per month with annual subscription discount ($200 billed up front). $20 if billed monthly."* — [claude.com/pricing](https://claude.com/pricing) · *"The Max plan is currently available as a monthly subscription only."* — [support](https://support.claude.com/en/articles/11049741-what-is-the-max-plan) |
| **E · Discounts** | `CONFIRMED` **None standing** | *"We do not offer standard discounted pricing any of our paid plans"* — [support](https://support.claude.com/en/articles/11049741-what-is-the-max-plan) |
| **E · Currency label** | `INFERENCE` Page renders bare `$`. USD confirmed for Team ("prices shown are for US customers") and self-serve Enterprise ("USD only"); **inferred** for Pro/Max | [support](https://support.claude.com/en/articles/9266767-what-is-the-team-plan) |

### 3.2 Tier 2 — company-managed (Team / Enterprise)

*All rows read 2026-08-04.*

| Dim | Finding | Evidence |
|---|---|---|
| **A · Trains by default** | `CONFIRMED` **No — contractually barred** | *"Anthropic may not train models on Customer Content from Services."* — [Commercial Terms §B](https://www.anthropic.com/legal/commercial-terms) · *"By default, we will not use your inputs or outputs from our commercial products… to train our models"* — [privacy centre](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training) |
| **A · What changes it** | `CONFIRMED` Feedback/bug reports · **admin opt-in** (Development Partner Program) · safety-flagged content. Owners can kill the feedback path org-wide | *"An organization admin can expressly opt-in to the Development Partner Program"* · *"disable the ability for members… via the thumbs up / down button using the Rate chats setting"* — [privacy centre](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training) |
| **B · Retention default** | `CONFIRMED` **Indefinite by default** | *"By default, data is retained indefinitely unless a custom retention period is set."* — [privacy centre](https://privacy.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans) |
| **B · Custom retention** | `CONFIRMED` **Enterprise only**, minimum **30 d**, month = 30 d, deletion at midnight UTC, stated unrecoverable. Tightening deletes out-of-window data immediately. **Team has no such control** | *"The minimum retention period is 30 days"* · *"cannot be recovered"* · *"deleted immediately upon saving"* — [privacy centre](https://privacy.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans) |
| **B · Deletion tail** | `CONFIRMED` Same 30-day backend tail as consumer | [privacy centre](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data) |
| **B · Separate longer clocks** | `CONFIRMED` Flagged **2 y** · classification scores **7 y** · feedback **5 y** · **Compliance API Activity Feed 6 y** — longer than any chat policy | [privacy centre](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data) · *"the Activity Feed and remote session transcripts retain data for 6 years"* — [platform docs](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) |
| **B · Termination** | `CONFIRMED` 30-day delete, three named exceptions | DPA §H.1 — [DPA](https://www.anthropic.com/legal/data-processing-addendum) |
| **B · ZDR is not zero** | `CONFIRMED` Approval-gated; **excludes the chat plans**; T&S classifier results always persist; flagged content up to 2 y; **Covered Models (Fable 5 / Mythos 5) force 30 d on every platform** | *"ZDR is not included in the standard Enterprise plan"* — [code docs](https://code.claude.com/docs/en/data-usage) · *"Anthropic still retains User Safety classifier results"* — [privacy centre](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to) · *"retained for 30 days… on every platform where these models are offered"* — [privacy centre](https://privacy.claude.com/en/articles/15425996-data-retention-practices-for-covered-models) |
| **C · Admin sees content** | `CONFIRMED` Primary Owner can **export** conversation content, and members are told so. Individual members have **no** self-serve export | *"the ability to request access to your user data through data exports, which may contain your conversations with Claude, uploaded files, and usage patterns"* — [privacy centre](https://privacy.claude.com/en/articles/9265372-who-owns-and-manages-the-data-of-my-team) · [export](https://privacy.claude.com/en/articles/13346720-export-your-organization-s-data) |
| **C · Audit export** | `CONFIRMED` **Enterprise only.** CSV, **180-day lookback**, Owner-only, 24 h link; **chat titles and content excluded** (IDs only) | *"Audit logs are available for Enterprise organizations only."* · *"within the past 180 days"* · *"title and content of chats and projects are not available to be exported"* — [support](https://support.claude.com/en/articles/9970975-access-audit-logs) |
| **C · Compliance API** | `CONFIRMED` **Enterprise only.** Activity Feed + underlying chats/files/projects, retrieve **and delete** on demand | *"programmatic access to their organization's Activity Feed… and, for claude.ai organizations, the underlying chats, files, projects"* — [platform docs](https://platform.claude.com/docs/en/manage-claude/compliance-api) |
| **C · Leaver** | `CONFIRMED` **Removal is an access change, not a deletion.** Chats become inaccessible to remaining members (shared URLs break); private projects inaccessible; **leaver data stays in Owner exports**; re-adding the same email **restores** chats and projects | *"remaining members will no longer be able to access their chats"* · *"will still be included in any data exports run by your organization's Primary Owner"* · *"previous chats and projects will be restored"* — [support](https://support.claude.com/en/articles/12053672-what-happens-to-a-user-s-data-when-they-are-removed-from-a-team-or-enterprise-organization) |
| **D · Residency** | `CONFIRMED` **Inference constrainable, storage not.** US-only inference = usage-based Enterprise only, **1.1x** billing, and explicitly does not control storage | *"Note that data is stored in the US."* — [privacy centre](https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers) · *"It doesn't control: … Data storage."* — [support](https://support.claude.com/en/articles/15422948-enable-us-only-inference-for-your-organization) |
| **D · Certifications** | `CONFIRMED` Team **and** Enterprise: SOC 2 Type 2, ISO 27001, ISO 42001, CSA Star, NIST 800-171. **HIPAA is Enterprise/API only — N/A on Team** | Rendered portal — [trust.anthropic.com](https://trust.anthropic.com/) |
| **E · Team price** | `CONFIRMED` Standard **USD 20/seat/mo annual · USD 25 monthly**. Premium **USD 100/seat/mo annual · USD 125 monthly**. **Min 2, max 150 seats** | *"$20 — Per seat / month if billed annually. $25 if billed monthly."* — [claude.com/pricing](https://claude.com/pricing) · *"Team plans support up to 150 seats."* — [support](https://support.claude.com/en/articles/9266767-what-is-the-team-plan) |
| **E · Enterprise price** | `CONFIRMED` **USD 20/seat/mo, annual — access only. All usage billed separately at API rates.** Min **20 seats** self-serve / **50** sales-assisted; self-serve **USD only** | *"The seat fee only covers access to the platform and doesn't include any usage."* · *"Minimum number of seats — 20 / 50"* — [support](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan) |
| **E · Education / nonprofit / volume** | `ABSENT` (no price published) — Education "discounted rates", nonprofit via Goodstack, Enterprise "tiered incentives on committed spend" | [claude.com/pricing](https://claude.com/pricing) · [nonprofits](https://claude.com/solutions/nonprofits) |

### 3.3 Tier 3 — self-hosted / on-prem

**`ABSENT` — Anthropic does not sell an on-premises Claude SKU.** No page read today offers
customer-hosted weights or a customer-datacenter deployment; confirmed absence across the pricing
page, Regional Compliance page, Trust Center and the platform docs nav. This is an argument from
absence over those pages, **not** proof that no private contract exists.

*All rows read 2026-08-04.*

| Nearest real offering | Finding | Evidence |
|---|---|---|
| **Amazon Bedrock** | `CONFIRMED` **AWS is the sole processor; Anthropic retains nothing.** Anthropic's own ZDR does not apply there | *"On Bedrock, AWS is the data processor and Anthropic does not retain inference inputs or outputs."* — [platform docs](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws) |
| **Google Cloud / Vertex** | `CONFIRMED` Google's data handling, not Anthropic's | *"Data handling for this offering is governed by Google Cloud."* — [platform docs](https://platform.claude.com/docs/en/api/claude-on-vertex-ai) |
| **Microsoft Foundry** | `CONFIRMED` **Strongest published containment.** "Hosted on Azure" keeps prompts and completions in Azure; only usage metadata + safety-flagged content egress | *"prompts and completions remain within Azure. Only usage metadata and content flagged by Anthropic's safety systems egress to Anthropic."* — [platform docs](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry) |
| **Self-hosted sandboxes** (public beta) | `CONFIRMED` Tool execution moves to your infrastructure; **orchestration stays with Anthropic** | *"move tool execution into infrastructure you control, so the agent's code, filesystem, and network egress never leave your environment"* — [platform docs](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes) |
| **Claude apps gateway** | `CONFIRMED` Self-hosted **control plane** (container + PostgreSQL) — SSO, policy, RBAC, cost attribution, IdP-driven offboarding. **Not** self-hosted inference | *"a self-hosted control plane"* · *"The gateway holds your upstream credential and routes inference to the Claude API, Amazon Bedrock, or Google Cloud"* — [blog](https://claude.com/blog/introducing-the-claude-apps-gateway) |
| **Residency, partner clouds** | `CONFIRMED` Real regional residency comes from the partner endpoint, at a **10% premium** over global | *"Regional and multi-region endpoints include a 10% pricing premium"* — [Bedrock](https://platform.claude.com/docs/en/api/claude-on-amazon-bedrock) · [Vertex](https://platform.claude.com/docs/en/api/claude-on-vertex-ai) |
| **Price** | `CONFIRMED` **Not per-seat — consumption-priced.** Fable 5 $10/$50 per MTok · Opus 5 $5/$25 · Sonnet 5 $2/$10 introductory to 2026-08-31 then $3/$15 · Haiku 4.5 $1/$5. US-only inference 1.1x, batch −50% | [claude.com/pricing](https://claude.com/pricing) |
| **Bedrock / Vertex retention windows** | `UNVERIFIED` — Anthropic points to AWS and Google docs, which were **not read**. **Do not state a number.** | [platform docs](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) |

### 3.4 Anthropic contradicts itself on the consumer training default — record both

| Source | Framing |
|---|---|
| [Consumer Terms §4](https://www.anthropic.com/legal/consumer-terms) | **Opt-out** — *"unless you opt out of training through your account settings"* |
| [Privacy centre](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training) | **Opt-in** — *"We will use your chats… if: You choose to allow us"* |
| [claude.com/pricing](https://claude.com/pricing) | The literal word **"Opt-out"** in the Model-training row |
| [News, 2025-08-28](https://www.anthropic.com/news/updates-to-our-consumer-terms) | Reconciles them: **forced choice at signup** |

**On-slide wording:** *"opt-out by contract, forced choice at signup"*, citing the Consumer Terms and
the news post together. Do not cite only one.

---

## 4 · Google (Gemini)

**Naming change confirmed today:** Vertex AI Platform is now **Gemini Enterprise Agent Platform
(GEAP)** — GCP Service Specific Terms §17 reads *"formerly Vertex AI Platform"*, and
`cloud.google.com/vertex-ai/generative-ai/*` **301-redirects** to
`docs.cloud.google.com/gemini-enterprise-agent-platform/*`. Any older link in the deck's notes is stale.

### 4.1 Tier 1 — personal (Gemini Free / AI Plus / Pro / Ultra)

*All rows read 2026-08-04.*

| Dim | Finding | Evidence |
|---|---|---|
| **A · Trains by default** | `CONFIRMED` **Yes.** Lever = **`Keep Activity`**. Off stops future training *unless you send feedback*. Temporary chats excluded. Audio/Live video/screenshare excluded unless opted in | *"Google uses your activity to provide, develop, and improve its services (including training generative AI models)"* · *"won't be used to train our AI models, unless you choose to send Google feedback"* — [support](https://support.google.com/gemini/answer/13594961?hl=en) |
| **A · "on by default"** | `INFERENCE` No sentence says "on by default". Basis is *"from the default of 18 months"*, which presupposes it | [support](https://support.google.com/gemini/answer/13594961?hl=en) |
| **A · Human review** | `CONFIRMED` **Sampled chats go to human reviewers, incl. third-party providers.** Google warns against confidential input | *"A subset of chats are reviewed by human reviewers (including Google's trained service providers)"* · *"Please don't enter confidential information that you wouldn't want a reviewer to see"* — [support](https://support.google.com/gemini/answer/13594961?hl=en) |
| **B · Retention** | `CONFIRMED` Default **18 mo** auto-delete (3 / 36 / never selectable). Keep Activity off → **72 h**. **Human-reviewed chats: 3 y, and your deletion cannot reach them** | *"retained for up to three years"* · *"aren't deleted because they aren't connected to your Google Account"* — [support](https://support.google.com/gemini/answer/13594961?hl=en) |
| **B · Global deletion tail** | `CONFIRMED` **~2 months** to complete, plus up to **6 months** in backups | *"generally takes around 2 months"* · *"up to 6 months"* — [policies.google.com](https://policies.google.com/technologies/retention) |
| **C · Admin / audit / leaver** | `ABSENT` **No admin construct exists.** Google's own notice redirects work/school accounts elsewhere | *"If you have a work or school Google Account, your use of Gemini Apps may be subject to different data handling terms."* — [support](https://support.google.com/gemini/answer/13594961?hl=en) |
| **D · Residency** | `ABSENT` No consumer data-region selection on any page read; Privacy Policy states global processing | *"your information may be processed on servers located outside of the country where you live"* — [policies.google.com](https://policies.google.com/privacy) |
| **E · Price (IDR, as rendered)** | `CONFIRMED` Free **Rp 0**. AI Plus **Rp 75,000/mo**. AI Pro **Rp 309,000/mo**. AI Ultra **from Rp 1,579,000/mo** (5×) or **Rp 3,399,000/mo** (20×). Annual option flagged "Save up to 16%", amount not shown. **All figures monthly** | [gemini.google/subscriptions](https://gemini.google/subscriptions/) · [one.google.com](https://one.google.com/about/plans) |
| **E · Price in USD** | `UNVERIFIED` — see §0.1. **No USD figure asserted.** | — |

### 4.2 Tier 2 — company-managed (Gemini in Workspace + Gemini Enterprise app)

**Two distinct admin-managed products; do not conflate them.** *Gemini in Workspace* (Workspace
editions, Workspace admin console) and the *Gemini Enterprise app* (Cloud-side, per-seat, Cloud sales).

*All rows read 2026-08-04.*

| Dim | Finding | Evidence |
|---|---|---|
| **A · Trains by default** | `CONFIRMED` **No — contractual.** Workspace SST **§12.11 Training Restriction** (last modified 2026-07-16) | *"Google will not use Customer Data to train or fine-tune any of its generative artificial intelligence models supporting the Google Workspace Generative AI Services without Customer's prior permission or instruction."* — [SST](https://workspace.google.com/terms/service-terms/) |
| **A · Human review** | `CONFIRMED` **None**, and no cross-domain training. **The sharp break from Tier 1: identical UI, opposite default** | *"Your content is not human reviewed or otherwise used for Generative AI model training outside your domain without permission."* — [privacy hub](https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub) |
| **B · Retention** | `CONFIRMED` Gemini in Workspace **90 d → indefinite, admin-set**; Gemini app **up to 36 mo**; Gemini Notebook **not retained after session** | *"90 days to indefinite, as determined by admins"* — [privacy hub](https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub) |
| **B · Deletion tail** | `CONFIRMED` **~30-day** post-purge tail during which Vault admins can still search, export, or hold | *"remain available to Vault administrators for approximately 30 more days"* — [Vault](https://support.google.com/vault/answer/2990828) |
| **C · Audit export** | `CONFIRMED` Dedicated **Gemini for Workspace log events** surface. Export to Sheets/CSV, **100,000 rows** (**30 M** with the investigation tool). Default view 7 days | *"limited to 100,000 rows… 30 million rows"* — [admin help](https://knowledge.workspace.google.com/admin/reports/gemini-for-workspace-log-events) |
| **C · Does the audit log hold prompt text?** | `UNVERIFIED` The page documents usage/metadata and **does not state** whether prompt text is captured. (Contrast: the Cloud-side log explicitly does — §4.3) | [admin help](https://knowledge.workspace.google.com/admin/reports/gemini-for-workspace-log-events) |
| **C · Vault coverage** | `CONFIRMED` Vault **retains, holds, searches and exports Gemini app conversations** (prompts + responses); holds override retention and survive deletion | *"Gemini app conversations (comprising user prompts and Gemini app responses)"* — [Vault](https://support.google.com/vault/answer/16677125) |
| **C · Leaver** | `CONFIRMED` in part — delete revokes all access, account **restorable 20 days**, untransferred data permanently deleted. `UNVERIFIED` for Gemini specifically: **Gemini chat history is absent from the transferable list** and no page states its fate | *"can be restored for up to 20 days"* — [admin help](https://knowledge.workspace.google.com/admin/users/delete-or-remove-a-user-from-your-organization) |
| **D · Residency** | `CONFIRMED` Published **and Gemini prompts/outputs are explicitly in scope**. Data Region = **US or Europe**. §1.3 caps the promise; Gemini Notebook excluded | *"(m) Gemini in Workspace: user prompts and Generated Output"* · *"Google may store or process such data… anywhere Google or its Subprocessors maintain facilities"* — [SST](https://workspace.google.com/terms/service-terms/) |
| **E · Workspace price (USD)** | `CONFIRMED` **Base $2.50** (max 20 users, **no Gemini**) · **Starter $7.00** · **Standard $14.00** · **Plus $22** · **Enterprise contact-sales, no seat min or max**. Toggle: *"Annual (Save 16% with 1 year commitment)"*; footer *"All plans billed monthly"*, *"All prices $USD"*. Starter/Standard cap at 300 users | [workspace.google.com/pricing](https://workspace.google.com/pricing) |
| **E · Bundled, not an add-on — this changed** | `CONFIRMED` **Gemini is now bundled into Business and Enterprise base editions.** The old Gemini add-on SKUs are **withdrawn**. Base ($2.50) is the only plan without Gemini. Sold separately now: **capacity** ("AI Expanded Access") | withdrawn SKUs *"no longer available for purchase"* — [admin help](https://knowledge.workspace.google.com/admin/generative-ai/workspace-with-gemini/gemini-ai-features-now-included-in-google-workspace-subscriptions) |
| **E · AI Expanded Access price** | `ABSENT` *"Pricing depends on your local currency and the duration of your subscription."* | [admin help](https://knowledge.workspace.google.com/admin/generative-ai/workspace-with-gemini/ai-expanded-access) |
| **E · Gemini Enterprise app seats** | `CONFIRMED` Business **"Starting at $21 USD per seat per month"** (1–300 seats) · Standard/Plus **"$30 USD per seat per month"** (unlimited, adds VPC-SC, CMEK, residency, HIPAA/FedRAMP High). **Billing period / commitment not stated** → `UNVERIFIED` | [cloud.google.com/gemini-enterprise](https://cloud.google.com/gemini-enterprise) · [editions](https://docs.cloud.google.com/gemini/enterprise/docs/editions) |
| **E · Education** | `CONFIRMED` Google AI Pro for Education **$24 USD/user/mo flexible · $20 USD annual** | [admin help](https://knowledge.workspace.google.com/admin/generative-ai/workspace-with-gemini/how-google-workspace-with-gemini-billing-works) |
| **E · Nonprofit / volume** | `UNVERIFIED` — not read. No claim. | — |

### 4.3 Tier 3 — GEAP (your Cloud project) and GDC air-gapped (genuine on-prem)

**Google does not offer a self-hosted Gemini that you install on your own hardware under your own
licence.** Nearest: **(a) GEAP** — Google-operated, inside your Google Cloud project; **(b) GDC
air-gapped** — Google-managed hardware **on your premises**, fully disconnected. Only (b) is on-prem.

*All rows read 2026-08-04.*

| Dim | Finding | Evidence |
|---|---|---|
| **A · GEAP trains?** | `CONFIRMED` **No — contractual, and it covers pre-GA models too** | GCP SST §18: *"Google will not use Customer Data to train or fine-tune any AI/ML models without Customer's prior permission or instruction."* — [GCP SST](https://cloud.google.com/terms/service-terms) · *"This applies to all managed models… including GA and pre-GA models."* — [docs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/zero-data-retention) |
| **A · Human review** | `CONFIRMED` Only on abuse-classifier trigger, never for training. Customers under a Google Cloud Master Agreement are **exempt from abuse prompt logging by default** | *"This data won't be used to train or fine-tune any AI/ML models."* — [docs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/abuse-monitoring) |
| **B · Retention** | `CONFIRMED` **Zero retention is a configuration, not a default.** Abuse logs **90 d** · Advanced AI models log prompts *and* responses **30 d** · in-memory cache 24 h **on by default** · **Grounding with Search 3 d and Maps 30 d cannot be disabled** · Interactions API `store` **defaults to true** | *"There is no way to disable the storage of this information if you use Grounding with Google Search."* · *"it defaults to true for all models"* — [docs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/zero-data-retention) |
| **C · Audit** | `CONFIRMED` Usage audit logs land in Cloud Logging `_Default`. **They contain prompt and answer content.** `_Default` retention **30 d** (configurable); `_Required` **400 d** (not) | *"Sensitive data isn't filtered out of the audit logs"* — [docs](https://docs.cloud.google.com/gemini/enterprise/docs/set-up-usage-audit-logs) · [quotas](https://docs.cloud.google.com/logging/quotas) |
| **C · Leaver** | `ABSENT` No Gemini-specific offboarding process published; access is IAM/licence-based | — |
| **D · Residency** | `CONFIRMED` Contractual, **with named carve-outs**: Grounding with Search, Web Grounding, Maps and RAG Engine are **excluded**; GEAP is in the AI/ML data-location list but **not** in Assured Workloads | *"and Google will perform (a) and (b) only in that Multi-Region"* · *"excluding Grounding with Google Search, Web Grounding for Enterprise, Grounding with Google Maps, and RAG Engine"* — [data residency](https://cloud.google.com/terms/data-residency) |
| **E · GEAP price** | `CONFIRMED` **Not per-seat — token-priced, USD**, charged only on HTTP 200. E.g. Gemini 3.1 Pro Preview **$2/1M** input ≤200 K, **$12/1M** text output; Gemini 3.6 Flash **$1.50 / $7.50**; 3.5 Flash-Lite **$0.30**. **Do not force a seat price on this tier** | [pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing) |
| **GDC air-gapped** | `CONFIRMED` **Gemini runs on-prem, fully disconnected** — so there is no egress path to Google for training or abuse logging | *"Gemini is now available on GDC."* · *"does not require connectivity to Google Cloud or the public internet… built to remain disconnected in perpetuity."* — [GDC](https://cloud.google.com/distributed-cloud-air-gapped) |
| **GDC terms / audit / price** | `UNVERIFIED` — only the marketing page was read; `cloud.google.com/terms/gdcag/services` was **not loaded**. Price **contact-sales**. Do not assert GDC training/retention wording | — |

### 4.4 Google contradicts itself twice — record both, resolve neither

1. **Which editions get data regions.** Workspace SST §1.4 "In-Scope Edition" lists only G Suite
   Business, Enterprise Plus, Education Standard, Education Plus. The
   [admin help page](https://knowledge.workspace.google.com/admin/compliance/data-covered-by-data-regions)
   lists a much broader set (Frontline Plus, Business Standard/Plus, Enterprise Essentials…).
   **Contract text and help text disagree.**
2. **Add-on vs bundled billing.** The
   [billing help page](https://knowledge.workspace.google.com/admin/generative-ai/workspace-with-gemini/how-google-workspace-with-gemini-billing-works)
   still describes "Google Workspace with Gemini" as a separately-purchased licence, while the live
   pricing page and the "now included" page show it **bundled** with the add-on SKUs withdrawn.

---

## 5 · OpenAI (ChatGPT)

**Access note:** `openai.com` and `help.openai.com` return **HTTP 403** to plain fetchers. All 39
OpenAI pages were read through a rendered Chrome session. **Naming:** *"ChatGPT Team was renamed to
ChatGPT Business on August 29, 2025"* — older OpenAI pages still say "Team".

### 5.1 Tier 1 — personal (Free / Go / Plus / Pro)

*All rows read 2026-08-04.*

| Dim | Finding | Evidence |
|---|---|---|
| **A · Trains by default** | `CONFIRMED` **Yes.** Toggle = **"Improve the model for everyone"** (Settings → Data Controls), changeable anytime. Temporary Chat never trained on | *"ChatGPT, for instance, improves by further training on the conversations people have with it, unless you opt out."* — [help](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance) · Terms of Use **eff. 2026-01-01** — [ToU](https://openai.com/policies/terms-of-use/) |
| **B · Retention / deletion** | `CONFIRMED` **Real deletion**: immediate from account, hard delete within **30 days**. **Carve-out:** content already de-identified while training was allowed is **not pulled back** | *"scheduled for permanent deletion… within 30 days, unless: The chat has already been de-identified"* — [help](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt) · [Privacy Policy](https://openai.com/policies/privacy-policy/) (upd. 2026-04-28) |
| **B · Legal hold** | `CONFIRMED as published` **The published policy was overridden by litigation.** Obligation ended **2025-09-26**; **Apr–Sep 2025 consumer/API data still retained**; de-identified conversations **produced** under a later order; appeal live at last update **2025-12-16**. **Enterprise/Edu and ZDR excluded.** **Status after 2025-12-16 is `UNVERIFIED`** — OpenAI publishes no 2026 update | *"we will securely store limited historical April–September 2025 user data"* — [OpenAI](https://openai.com/index/response-to-nyt-data-demands/) · *"we have complied with the order"* — [OpenAI](https://openai.com/new-york-times/) |
| **C · Admin / audit / leaver** | `ABSENT` **No admin.** Self-serve export only, no audit log, no SCIM/SSO — **unless** the workspace is later claimed by an Enterprise/Edu workspace, at which point admin control attaches | *"Unless your personal workspace has been verified or claimed by a ChatGPT Enterprise or Edu workspace, you manage your personal workspace, not an admin."* — [help](https://help.openai.com/en/articles/20001067-data-access-for-your-managed-chatgpt-account) |
| **D · Residency** | `ABSENT` for consumer — eligibility is limited to API customers and new Enterprise/Edu workspaces | [help](https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt) |
| **E · Price** | `CONFIRMED` **Plus USD 20/mo billed monthly**. **Pro USD 100 and USD 200** tiers. Free **IDR 0**; Go **IDR 75,000/user/mo** (*"may include ads"*). Consumer plans are **month-to-month only — no annual consumer option** | *"Price: $20/month (billed monthly)."* — [help](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus) · *"Pro $100 unlocks 5x higher usage than Plus, while Pro $200 unlocks 20x"* — [help](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers) · [pricing](https://chatgpt.com/pricing/) |
| **E · Go in USD; Pro's period** | `UNVERIFIED` — Go has no USD figure on any primary page; Pro's *"/month"* was read only from the IDR page. See §0.1 | — |

### 5.2 Tier 2 — company-managed (Business / Enterprise / Edu / for Teachers)

*All rows read 2026-08-04.*

| Dim | Finding | Evidence |
|---|---|---|
| **A · Trains by default** | `CONFIRMED` **No — the explicit inverse of consumer**, in policy and in contract (Services Agreement **eff. 2026-01-01**) | *"By default, we do not train on any inputs or outputs from our products for business users, including ChatGPT Business, ChatGPT Enterprise, and the API."* — [help](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance) · §4.2: *"OpenAI will not use Customer Content to develop or improve the Services, unless Customer explicitly agrees."* — [Services Agreement](https://openai.com/policies/services-agreement/) |
| **A · What changes it** | `CONFIRMED` **An admin can opt the workspace back in.** The member cannot rely on the default alone | *"your administrator may be able to access, export, audit, retain, delete and opt-in to share data tied to this account with OpenAI to improve OpenAI's models"* — [help](https://help.openai.com/en/articles/20001067-data-access-for-your-managed-chatgpt-account) |
| **B · Retention** | `CONFIRMED` Enterprise/Edu: **admin-configurable** (indefinite or 90/180 d). **Business: indefinite by default.** Deleted conversations gone within **30 d**. Termination: 30-day delete (§11.3). Enterprise files not saved to Library **expire in 48 h** | *"Your workspace admins control how long your data is retained."* — [enterprise privacy](https://openai.com/enterprise-privacy/) · [help](https://help.openai.com/en/articles/8266418-data-retention-when-a-member-is-removed-from-a-workspace) |
| **C · Audit / compliance export** | `CONFIRMED` **Compliance Platform is Enterprise + Edu only — not Business.** **Logs retained only 30 days; the customer must continuously download them** or lose them | *"The Compliance Platform is available to Enterprise and Edu customers."* · *"retains data for 30 days. If longer retention is desired then consumers should implement a system to continuously download all logs"* — [help](https://help.openai.com/en/articles/9261474-openai-compliance-platform-for-enterprise-and-edu-customers) |
| **C · SSO / SCIM** | `CONFIRMED` SAML SSO + SCIM; **only SCIM-managed users can be auto-deactivated** | *"only those users managed by SCIM can be automatically deactivated"* — [help](https://help.openai.com/en/articles/10011769-scim-integration-faq) |
| **C · Leaver** | `CONFIRMED` Access revoked immediately; content follows workspace retention. **Projects and GPTs reassign to an owner, but the leaver's conversations and files do not transfer and are not visible to that owner.** Re-adding restores content | *"Conversations and files created by the removed member are not transferred, and are not visible to the workspace owner."* — [help](https://help.openai.com/en/articles/8266418-data-retention-when-a-member-is-removed-from-a-workspace) |
| **C · Which terms bind the member** | `CONFIRMED` **Important for the deck:** the consumer ToU and Privacy Policy do **not** apply inside a managed account | *"The OpenAI [Terms of Use] and [Privacy Policy] do not apply to your use of ChatGPT while you are signed in to your administrator-managed account."* — [help](https://help.openai.com/en/articles/20001067-data-access-for-your-managed-chatgpt-account) |
| **D · Residency** | `CONFIRMED` **10 regions** (US, EEA+CH, UK, CA, JP, KR, SG, IN, AU, UAE) for **new Enterprise/Edu** + eligible API. **Business is not eligible.** Included at no extra cost for Enterprise/Edu | [help](https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt) |
| **D · Residency is narrower than it reads** | `CONFIRMED` **Inference** residency only **US, EEA+CH, UAE**, and only on top of data residency. **Metadata, workspace name, billing, user logins and third-party app data may sit outside the region.** Flag this; do not overstate residency on-slide | *"Inference residency… Europe (EEA + Switzerland), United States, United Arab Emirates"* — [help](https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt) |
| **E · Business price** | `CONFIRMED` **USD 25/user/mo monthly · USD 20/user/mo billed annually. Minimum 2 seats.** (IDR: 421,000 monthly / 337,000 annual) | *"$25 per user per month if billed monthly and $20 per user per month if billed annually."* · *"a minimum of 2 standard ChatGPT seats"* — [help](https://help.openai.com/en/articles/8792828-what-is-chatgpt-business) |
| **E · Enterprise price** | `CONFIRMED as contact-sales` **Custom, annual, volume discounts, invoicing. No published per-seat number, no published seat minimum** | *"Custom pricing / Contact our sales team to discuss pricing."* — [pricing](https://chatgpt.com/pricing/?type=team) |
| **E · Nonprofit / Edu** | `CONFIRMED` Business **USD 8/user/mo annual · USD 10 monthly**; Enterprise **up to 75% off** via sales. Teachers **free for verified U.S. K-12 through June 2027**; Edu price `ABSENT` | [help](https://help.openai.com/en/articles/9359041-do-you-offer-nonprofit-pricing) |
| **E · Not included** | `CONFIRMED` Business excludes API usage; **ZDR, BAA and invoicing require a sales-led contract** | *"If you need invoice billing… Zero Data Retention, BAAs, or other sales-led options, use a contracted offering"* — [help](https://help.openai.com/en/articles/8792828-what-is-chatgpt-business) |

### 5.3 Tier 3 — self-hosted / on-prem

**`ABSENT` — OpenAI publishes no on-premises deployment of its frontier models.** Frontier models are
delivered only as OpenAI-hosted services or via partner clouds. **This is an argument from absence:**
OpenAI publishes no positive statement saying it does not offer on-prem. Two near-neighbours exist,
with very different guarantees — **do not merge them on the slide.**

*All rows read 2026-08-04.*

| Case | Finding | Evidence |
|---|---|---|
| **`gpt-oss` — your hardware** | `CONFIRMED` **The strongest guarantee in this whole file, because it is architectural, not contractual.** Apache 2.0, weights free, no seats | *"OpenAI does not receive or process the data you send to these self-hosted models"* · *"The gpt-oss model weights are free to download and use under the Apache 2.0 license"* — [help](https://help.openai.com/en/articles/11870455-openai-open-weight-models-gpt-oss) |
| `gpt-oss` — the cost | `CONFIRMED` **No OpenAI support at all**, and you build your own logging, audit and identity | *"Open-weight deployments are self-managed and self-serviced."* · *"OpenAI does not provide assistance, hands-on implementation, or debugging support"* — [help](https://help.openai.com/en/articles/11870455-openai-open-weight-models-gpt-oss) |
| `gpt-oss` — **capability caveat** | `CONFIRMED` **Not a frontier model.** 120B / 20B, **text-only**, 128 K context. This is exactly the trade-off D.4 beat 1 asserts | *"These models are currently text-only reasoning models."* — [help](https://help.openai.com/en/articles/11870455-openai-open-weight-models-gpt-oss) · [open-models](https://openai.com/open-models/) |
| **Azure OpenAI — your tenant, Microsoft-hosted** | `CONFIRMED` Frontier models, and **OpenAI never sees the data** — Microsoft is the processor | *"are NOT available to OpenAI or other providers of Models sold by Azure"* — [Microsoft Learn](https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy) |
| Azure — retention | `CONFIRMED` Stored data sits at rest **in your tenant, in your geography, deletable at any time**; CMEK supported. **Abuse-monitoring day-count is `UNVERIFIED` — the "30 days" figure is not on today's Microsoft pages. Do not print a number.** | [Microsoft Learn](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/abuse-monitoring) |
| Azure — **the residency trap** | `CONFIRMED` **`Global` and `DataZone` deployment types break single-region processing** — Global *"may be processed in any geography where the relevant model… is deployed"*. Flag this if the deck mentions Azure | [Microsoft Learn](https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy) |
| Azure — price | `CONFIRMED` **Not per-seat** — tokens pay-as-you-go or reserved PTU, USD | [Azure pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/) |
| **ChatGPT Gov** | `CONFIRMED` The **app tier** is a container you install in your own Azure tenant, over Azure OpenAI. **US government agencies only.** Price `ABSENT` | *"Agencies can deploy ChatGPT Gov in their own Microsoft Azure commercial cloud or Azure Government cloud"* — [OpenAI](https://openai.com/global-affairs/introducing-chatgpt-gov/) |

### 5.4 OpenAI contradicts itself on Business admin visibility — record both

| Source | Statement |
|---|---|
| [openai.com/enterprise-privacy](https://openai.com/enterprise-privacy/) | *"Workspace admins have control over workspaces and **can view, access, export, and delete** end user conversations in the workspace."* |
| [help article 8798634](https://help.openai.com/en/articles/8798634-managing-data-sharing-and-privacy-in-chatgpt-business) | *"they **cannot** automatically view other members' private chat history."* + *"**No. Data export is not available** in a ChatGPT Business workspace."* |

**Do not present a single answer for ChatGPT Business.** The honest reading: contractual/technical
capability is asserted, a self-serve read-all/export UI is denied. Enterprise/Edu visibility via the
Compliance Platform **is** unambiguous and confirmed.

---

## 6 · Cross-vendor patterns D.4 can assert safely

Each of these holds at **all three** vendors, sourced above. They are the safest on-slide claims in
this file because no single vendor's policy change breaks them.

1. **The tier changes the contract, not the interface.** Consumer terms permit training; commercial
   terms forbid it. Same brand, same UI, opposite default. (Anthropic Consumer Terms §4 vs Commercial
   Terms §B · Google consumer notice vs Workspace SST §12.11 · OpenAI ToU vs Services Agreement §4.2.)
2. **A personal account has no admin, at any of the three.** No audit export, no revoke, no leaver
   control. This is the whole of D.4 beat 2 in one line.
3. **Audit and compliance export are gated to the top tier.** Anthropic: Enterprise only, and audit
   CSV **excludes chat content**. OpenAI: Enterprise/Edu only, **not** Business. Google: investigation
   tool gated to specific editions. **Buying "a company plan" does not buy auditability.**
4. **Deletion is never instantaneous, and side clocks outlast it.** 30-day backend tails everywhere;
   plus Anthropic T&S scores **7 y** / Compliance API **6 y** / feedback **5 y**, Google human-reviewed
   consumer chats **3 y** and a **6-month** backup tail, OpenAI de-identified content **never pulled
   back**.
5. **"Zero retention" is never zero.** Anthropic: approval-gated, excludes chat plans, and Covered
   Models force 30 d. Google: achievable by configuration, but Grounding retention **cannot be
   disabled**. OpenAI: ZDR is approval-gated and sales-led.
6. **Residency is narrower than the word suggests, and priced.** Storage ≠ inference ≠ metadata.
   Anthropic 1.1x US-only inference and **US-only storage**; partner regional endpoints **+10%**.
   OpenAI API non-US regions **+10% uplift**, and metadata sits outside the region. Google excludes
   Grounding and RAG Engine from its residency commitment.
7. **Removing a seat is an access change, not a deletion.** Anthropic: leaver data stays in Owner
   exports and **is restored if the same email returns**. OpenAI: conversations do not transfer and
   are invisible to the owner, but persist under workspace retention. Google: 20-day restore window.
8. **Nobody sells you the frontier model for your own data centre.** The genuine on-prem options are
   **open-weight** (`gpt-oss`, Apache 2.0) or **vendor-managed hardware on your site** (GDC
   air-gapped). This is precisely the trade-off beat 1 asserts — and §9's corrected numbers are what
   price it.

---

## 7 · Fallback copy — the category-level sentences, ready to lift

§12.2's instruction: if verification does not happen, D.4 **describes the category and asserts no
named vendor's current policy.** Verification *did* happen for most rows, so most of §3–§5 is usable
as-is. These sentences are here for (a) every `UNVERIFIED` row, and (b) the case where a reviewer
next month finds a source has moved and wants to ship without re-verifying.

**Each names no vendor. Each is true of the category as recorded above. Lift verbatim.**

| # | Use instead of | Category-level sentence |
|---|---|---|
| **F1** | Any named vendor's training default | *"Consumer accounts and company-managed accounts sit under different contracts. On the consumer side, using your conversations to improve the model is commonly the default, with an opt-out you have to go and find. On the business side, the major vendors bar it contractually. Same brand, same screen, opposite default."* |
| **F2** | Any specific retention window | *"Deleting a conversation removes it from your view first and from the vendor's storage later — a backend tail measured in weeks is normal. Separate, longer clocks run for safety-flagged content, for feedback you submit, and for compliance logs."* |
| **F3** | A "we keep nothing" / zero-retention claim | *"Zero-retention arrangements exist, but they are negotiated, not default, and they carve out safety systems and the newest models. Assume something is retained unless your contract says otherwise."* |
| **F4** | Any admin-visibility specifics | *"A personal account has no administrator. Nobody in the company can list what was asked, export it for an audit, or revoke it when the person leaves."* |
| **F5** | Any audit-export specifics (incl. Google prompt-text, OpenAI Business conflict, Anthropic UI access) | *"Audit and compliance export are features of the top tier, not of any paid plan. Buying seats is not the same as buying auditability — check which tier the audit log is in before you rely on it."* |
| **F6** | Any leaver specifics (incl. Google Gemini chat history) | *"Removing someone's seat is an access change, not a deletion. Their content generally stays inside the organization's retention policy and its exports."* |
| **F7** | Any residency specifics (incl. GDC terms) | *"Where the model runs and where your data is stored are two separate questions, controlled separately and priced separately. Ask both, and ask what is excluded — grounding, search and metadata often are."* |
| **F8** | Any on-prem / self-hosting claim | *"None of the frontier vendors will sell you its best model to run in your own data centre. What is available is either your own cloud tenant with the vendor operating the model, or open-weight models you genuinely can host — and those are not the frontier."* |
| **F9** | Any USD consumer price (see §0.1) | *"Individual paid plans sit at roughly one to two hundred thousand rupiah per person per month, and the price you see depends on the country you buy from."* |
| **F10** | Any per-seat business price | *"Company-managed seats list in the low tens of US dollars per user per month. Annual billing is cheaper than monthly, there is a seat minimum, and the top enterprise tier is quoted rather than published."* |
| **F11** | Any legal-hold specifics after 2025-12-16 | *"A vendor's published retention policy is not the last word. Litigation can compel a provider to keep data its own policy would have deleted, and that has already happened in this industry. Business-tier agreements have been treated differently from consumer ones."* |
| **F12** | The §2 leniency claim — **always** | **No replacement. This claim is off-slide entirely (§2). Say nothing about any vendor's enforcement posture.** |

---

## 8 · Price anchors for D.5

### 8.1 The Berau anchor — `CONFIRMED`, and it was sourced all along

**`$204/year` is real and organizer-published.** Source: **`docs/references/berau-presentation-plan.pdf`,
page 3 of 21** (git-tracked), described at `docs/references/reference-context.md:9` as *"proposed by
Berau PICs"* — i.e. authored by the Berau Coal organizer, **not by this project**. Verbatim, three
prize columns:

```
Competition   IDR 20 Million +      IDR 12 Million +     IDR 8 Million +
   Reward      1 Year Claude         1 Year Claude        1 Year Claude
                Subscription          Subscription         Subscription
                 (204 Dollar)          (204 Dollar)         (204 Dollar)
```

The spec asserted it at `:625` and `:1481` **without a citation**; `git log --all -S'$204'` returns
exactly one commit — the spec's own. The number was *uncited*, never *unsourced*.

**Three corrections D.5 must respect:**

1. **It is a Vol-2 prize.** Page 2 records **Vol-1** as *"rewards of up to 10 million and have a
   chance to be AI Ambassador"* — **no subscription, no $204**. Copy calling it a Vol-1 prize is wrong.
2. **`$204` is not Claude Pro's annual price.** Live check of
   [claude.com/pricing](https://claude.com/pricing) on **2026-08-04** (WebFetch and `playwright-cli`
   agree): *"$17 — Per month with annual subscription discount (**$200 billed up front**). $20 if
   billed monthly."* So `$204 = $17 × 12` is a correct derivation of the **displayed monthly-equivalent
   rate**, but it is **$4 above Anthropic's actual published annual charge of $200**. Under §12.2's own
   standard, **D.5 must attribute it** — *"the organizer's stated prize value"* — or use **$200** as
   vendor list price. **Do not present `$204` as Claude Pro's price.**
3. **Competition window disagrees with the spec.** Spec `:745` says *"Sep–Oct"*; the plan deck page 3
   says **"Jun – Jul"**. Not resolvable from repo contents — either the schedule slipped after the deck
   was issued, or `:745` is stale. **Flag before any date ships.**

### 8.2 GEMS — `NO OFFICIAL ANCHOR`. Stated plainly, and not invented.

**There is no official GEMS-side seat price, subscription budget, prize, or procurement figure in any
source in this repo.** The spec's *"expected but not yet official"* (`:1482`) is accurate.

Searched: `docs/prompts/gems-catalyst.md` in full, `docs/researches/2026-07-31-gems-digitech-ai-landscape.md`,
all `docs/researches/internal-*.md`, and a repo-wide regex for seat/price/budget/procure/anggaran/`Rp[0-9]`/
`$[0-9]`/hadiah/langganan. `docs/references/202607-ai-catalyst-gems-brief.pdf` yields **no currency
token at all**.

The closest GEMS statement carries no number — `docs/prompts/gems-catalyst.md:23`: *"Digitech also
already have Claude subscription plan (but not all) for their members."* And `:50` (*"for claude
better use team plan"*) is a **direction**, not a price. Note that even the qualitative statement is
flagged unverified at `docs/researches/2026-07-31-gems-digitech-ai-landscape.md:190`.

**Adjacent GEMS figures that are NOT price anchors** — do not repurpose any of these as one:

| Figure | Where | Why not an anchor |
|---|---|---|
| **Rp 23.6 bn** direct benefits (FAMOUS + Uassist) | `2026-07-31-gems-digitech-ai-landscape.md:139` | Company-reported **benefit**, not spend; not audited |
| **+23%** task productivity · **up to 30%** violation reduction · 4,930 trees/yr | same, `:139` | Outcome metrics |
| iCosystem = **12** connected applications | same, `:209` | Application count. "Procurement" there is software scope, not an AI budget |
| DigiTech **on-prem GPU servers** for sensitive-data RAG | spec `:885-886` | Capability. **No capex/opex figure exists anywhere in repo** |

The spec's slot-7 design (`:625` — *"Berau's published $204/yr prize / GEMS list price only"*) already
handles this correctly: **GEMS gets vendor list price and no local anchor.**

### 8.3 Vendor list prices for D.5's arithmetic, all read 2026-08-04

Company-managed seat prices only — the numbers D.5's formula runs on. **USD, and the billing period
matters:** annual is 20–25% cheaper than monthly at every vendor.

| Vendor · plan | Annual billing | Monthly billing | Seat min / max | Note |
|---|---|---|---|---|
| **Claude Team Standard** | **$20**/seat/mo | $25 | 2 – 150 | Above 150 → Enterprise |
| **Claude Team Premium** | **$100**/seat/mo | $125 | 2 – 150 | 5× usage of Standard |
| **Claude Enterprise** | **$20**/seat/mo | — (annual only) | 20 self-serve / 50 sales | **Access only — all usage billed at API rates on top** |
| **ChatGPT Business** | **$20**/user/mo | $25 | min 2 | No API usage included |
| **ChatGPT Enterprise** | contact sales | — | not published | Custom, annual, volume discounts |
| **Google Workspace Business Standard** | **$14**/user/mo | billed monthly, 1-yr commit | up to 300 | **Gemini now bundled**, not an add-on |
| **Google Workspace Business Plus** | **$22**/user/mo | same | up to 300 | |
| **Gemini Enterprise app (Business)** | **$21**/seat/mo | period **`UNVERIFIED`** | 1 – 300 | Cloud-side product, distinct from Workspace |
| **Gemini Enterprise app (Standard/Plus)** | **$30**/seat/mo | period **`UNVERIFIED`** | unlimited | Adds CMEK, residency, HIPAA/FedRAMP High |

**Two framing points for D.5, both sourced above:** (1) *"Measure value, not activity"* has a hard
edge here — the Claude Enterprise seat fee **buys access and no usage**, so seat count and spend are
genuinely different quantities. (2) Annual-vs-monthly is the cheapest lever on the whole slide and
needs no negotiation.

Also cross-checked: `docs/researches/internal-claude-tooling.md:99-101` seat prices still match live —
**no refresh needed there.**

---

## 9 · D.4 beat 1's own numbers — `6.7` and `9.2` are both STALE

**Verdict: both literals come from the superseded 8 June 2026 Index v4.0 capture. Neither matches
what B.4 ships today. And `9.2` is a collision trap.**

Spec `:877-878` asserts *"open-weight is **6.7 points** off the lead on write-and-reason and **9.2
back** on tool-calling."* Traced to `docs/researches/2026-06-08-llm-benchmarks-june-2026.md` —
**Index v4.0**, explicitly superseded by `2026-07-31-artificialanalysis-model-data.md:10`:

| Metric | Leader | Best open-weight | Gap | Line |
|---|---|---|---:|---|
| Write & Reason v4.0 | Claude Opus 4.8 (max) 61.4 | MiniMax-M3 54.7 | **6.7** | `:32` |
| Agentic v4.0 | Claude Opus 4.8 (max) 77.8 | MiniMax-M3 68.6 | **9.2** | `:54` |

`grep -i 'restrict\|licen'` on that file returns **nothing** — v4.0 used a flat closed/open binary.
So "which licence tier were they computed from" has **no answer**: neither, because the tier split did
not exist yet. The two numbers are self-consistent with each other and **both wrong today**.

### 9.1 The v4.1 arithmetic, re-derived per metric per tier

From `docs/researches/2026-07-31-artificialanalysis-model-data.md` (v4.1), scores re-confirmed
2 Aug 2026 by `2026-08-02-aa-gemini-pro-addendum.md`. All six gaps reproduce that doc's own stated lines.

| AA metric (D.4's name for it) | Leader | Restricted (Kimi K3) | Gap | Unrestricted (GLM-5.2) | Gap |
|---|---|---|---:|---|---:|
| **Intelligence Index** ("write-and-reason") | Opus 5 (max) **61** | 57 | **4** | 51 | **10** |
| **Coding Index** | Opus 5 (max) **78.0** | 76.2 | **1.8** | 68.8 | **9.2** |
| **Agentic Index** ("tool-calling") | Opus 5 (max) **55.3** | 50.1 | **5.2** | 43.1 | **12.2** |

v4.1 renders the Intelligence Index as **integers**, so the write-and-reason gap is **`4`, not `4.0`** —
a decimal place is not available and must not be invented.

### 9.2 Shipping B.4 is already correct and tier-consistent

`src/slides/landscape-section-b/content.ts` uses **Kimi K3 (restricted) across all four panels**:
`write-reason` **"4 pts off the lead"** (`:715-719`) · `code` **"1.8 pts"** (`:730-734`) ·
`agentic` **"5.2 pts"** (`:746-750`) · `multimodal` "4 pts" (`:764-768`), with
`freshness: "Artificial Analysis · 2 August 2026"` (`:882-883`). The tier choice is recorded
deliberately at `:698-699`. **B.4 was refreshed; only the spec text lags.**

### 9.3 The `9.2` collision — state this loudly

**`9.2` is live in the v4.1 corpus, but as the Coding-index gap for the unrestricted tier**
(`78.0 − 68.8`). D.4 beat 1 uses it for **Agentic / tool-calling**. Anyone verifying the spec against
the current AA doc will find `9.2` present, tick it off, and ship a number that is **wrong on both
axes — wrong metric and wrong tier.**

### 9.4 Required correction, and who owns it

To match shipping B.4 (restricted tier):

> open-weight is **4 points** off the lead on write-and-reason and **5.2 back** on tool-calling

The unrestricted pair is **10** and **12.2**. That choice is defensible — restricted-licence weights
are commercially unusable for a coal-mining group, and the AA doc flags at `:38` that *"the restricted
tier matters commercially"* — and it **strengthens** beat 1's argument, but it forces four B.4 tagline
edits plus `:698-699`. **Pick one tier; do not mix.**

`invest-security` is **spec-only, not built** — `grep` finds neither literal anywhere in `src/`. The
fix is **one spec edit at `:877-878`**, cost near zero. **Per this ticket's "nothing renders here",
that edit is left to [#58](https://github.com/adrianto-nanovest/bc-presentation/issues/58).**

### 9.5 Two further D.4-adjacent items from the same capture

- **`scatterAnnotation` *"90% the intelligence, 1/15th the cost"* does not reproduce on v4.1 data.**
  GLM-5.2 is 84% at 1/5.4, and the 2 Aug addendum moved its cost again: per-task $0.29 → **$0.69 ≈
  1/3.4** of Opus 5 (max)'s $2.34. Any cost-side claim in D.4 must use the **2 Aug** figures.
- **The Agentic index scale changed in v4.1** (old max 77.8 → 55.3), per
  `2026-07-31-artificialanalysis-model-data.md:432-435`. **A smaller agentic gap is a scale change,
  not models getting worse.** Do not let D.4 imply regression.

---

## 10 · D.4 beat 3 — the four governance domains are AUTHORED, not sourced

**Verdict: the acceptance criterion "sourced, not authored here" is NOT met.** Culture · Risk ·
Governance · Ethics is **repo-internal restatement of the presenter's own April 2026 deck.** No Sinar
Mas Group HR document naming those four is committed anywhere, or named anywhere.

### 10.1 The citation chain, traced to the bottom

All three in-repo mentions converge on **slide 19 of our own deck**:

1. `docs/prompts/gems-catalyst.md:49` — *"no clear guidance & SOP (not limited to Culture, Risk,
   Governance, Ethics)"*, under **"Feedback from Event Committee"** (`:45`). **The only externally
   originated instance** — and it is a verbally-relayed note with **no committed artifact**.
2. `docs/researches/internal-hr-group.md:207` — a reuse-audit row summarizing our own deck; the file's
   own header declares the deck as its source.
3. `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md:338` — *"Additional roadmap domains:
   Culture, Governance, Risk, Ethics"*, describing slide 19–20. That doc's framing (`:8`) is explicit:
   the deck *"presents **Nanovest's** adoption journey"* to Group HR — **Nanovest presenting to Group
   HR, not Group HR issuing to Nanovest.**

`docs/references/hr-group-presentation.pdf` **is** committed and does render the four domains
verbatim on the *Group-Wide Enablement Playbook* slide. So the repo holds the full artifact, not a
summary — **but the artifact is our own work product** ("From Engineers to Everyone — Nanovest AI
Adoption", April 2026).

**Bottom of the chain**, in the sibling repo `hr-group-agentic-org`:
`docs/brainstorms/2026-04-14-section5-slides18-19-brainstorm.md:161-181` records verbatim *"User asked:
**'how about the culture-wise, AI governance, risk and ethics, should we mention all those things?'**"*,
an audit finding Governance/Risk/Ethics **"not covered"** (`:167`), and *"User picked **Level 2**"*
(`:174`). **The four domains enter the corpus there, as the presenter's own question**, with no
external citation at the point of introduction. The two prompts that produced slide 19 contain **zero**
mention of them. The related spec frames slide 19 as *"reported-not-prescribed"* — a **rhetorical
stance, explicitly chosen**, not a provenance record.

### 10.2 Defensible framings, strongest first

1. ✅ **"The GEMS event committee asked for guidance and SOP covering Culture, Risk, Governance,
   Ethics."** Externally originated (`gems-catalyst.md:49`) and the honest strongest claim. Still
   artifact-free — **get it in writing from the committee before Aug 19.**
2. ⚠️ **"The same four domains we proposed to Sinar Mas Group HR in April 2026."** True that the deck
   was presented to Group HR. **Not** true that Group HR authored or ratified the list. Only usable
   with *"we proposed"* — **never** *"Group requires"*.
3. ❌ **"Sourced to a named external document."** **Unsupported. Do not claim.**

**What would upgrade this:** a Sinar Mas Group HR / AISC governance framework or roadmap document
naming those four domains, or written GEMS committee minutes containing the `:49` line. Until then,
framing 1 with framing 2 as backup.

---

## 11 · Re-check list for the next reviewer

Load-bearing URLs only. All read **2026-08-04**; **re-check before any session after 2026-09-04**, and
re-check the price rows before every leader session regardless.

| What to re-check | URL |
|---|---|
| Claude prices (Pro $17/$200, Team $20/$25, Enterprise $20 + usage) | https://claude.com/pricing |
| Claude consumer training default | https://www.anthropic.com/legal/consumer-terms |
| Claude commercial no-training clause | https://www.anthropic.com/legal/commercial-terms |
| Claude storage-is-US sentence | https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers |
| Covered Models forcing 30-day retention | https://privacy.claude.com/en/articles/15425996-data-retention-practices-for-covered-models |
| Gemini consumer training + 3-year human-review retention | https://support.google.com/gemini/answer/13594961?hl=en |
| Workspace SST §12.11 + §1.4 residency scope | https://workspace.google.com/terms/service-terms/ |
| Workspace prices + whether Gemini stays bundled | https://workspace.google.com/pricing |
| Gemini Enterprise seat prices ($21 / $30) | https://cloud.google.com/gemini-enterprise |
| ChatGPT consumer vs business training default | https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance |
| OpenAI Services Agreement §4.2 | https://openai.com/policies/services-agreement/ |
| **OpenAI legal-hold status — the one most likely to have moved** | https://openai.com/index/response-to-nyt-data-demands/ · https://openai.com/new-york-times/ |
| ChatGPT Business price + seat minimum | https://help.openai.com/en/articles/8792828-what-is-chatgpt-business |
| OpenAI residency regions + inference-residency carve-outs | https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt |
| Berau $204 prize (in-repo, will not move) | `docs/references/berau-presentation-plan.pdf` p3 |

**Known access constraints for whoever re-checks:** `openai.com` and `help.openai.com` return **403**
to plain fetchers — use a rendered browser. `claude.com/pricing`, `trust.anthropic.com`,
`cloud.google.com/terms/*` and `workspace.google.com/pricing` need rendering; several return an empty
shell or hide the body outside `innerText`. Consumer pricing pages are **IP-geolocated** and ignore
`?country=` / `?currency=` / `gl=` (§0.1).

### 11.1 Open gaps, carried forward

Not blocking either slide — each has a §7 fallback sentence — but listed so they are not rediscovered:

1. **USD consumer prices** for ChatGPT Go and Google AI Plus/Pro/Ultra → **F9**.
2. **Whether a Claude Team/Enterprise admin can open a member's chat in the UI.** Export and
   Compliance-API retrieval are confirmed; UI access is stated nowhere → **F5**.
3. **Whether Google's Workspace Gemini audit log captures prompt text** → **F5**.
4. **What happens to a Google leaver's Gemini chat history specifically** → **F6**.
5. **GDC air-gapped training/retention/audit terms** — `cloud.google.com/terms/gdcag/services` not
   loaded → **F7 / F8**.
6. **Azure OpenAI abuse-monitoring day-count** — not on today's Microsoft pages. **Print no number.**
7. **OpenAI legal-hold status after 2025-12-16** → **F11**.
8. **Bedrock / Vertex retention windows** — need AWS and Google primary pages, not read → **F2**.
9. **Gemini Enterprise app billing period and commitment length** → **F10**.
10. **Education / nonprofit / volume pricing** at Anthropic, and nonprofit/volume at Google.
11. **Berau competition window** — plan deck says Jun–Jul, spec `:745` says Sep–Oct. Needs a human.
12. **GEMS committee ask in writing** (§10.2) — the one artifact that would fix beat 3's provenance.
