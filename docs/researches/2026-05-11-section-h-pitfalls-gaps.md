# Section H Research Gaps: Pitfalls & Best Practices
## Concrete Patterns for Non-AI-Native Professionals

**Research Date:** 2026-05-11
**Audience:** ~400 mining-industry professionals (non-AI-native)
**Purpose:** Fill research gaps for Section H slide deck content

---

## Research Focus

This document fills the gaps identified in the existing Section H research, focusing on **concrete incidents, plain-language explanations, and practical mitigation patterns** for knowledge-work professionals who are not AI-native.

All examples avoid mining-specific content (per body-slide conventions) and use universal knowledge-work scenarios: document review, scheduling, drafting, decision support, research, and reporting.

---

## Part 1: Under-Researched Pitfalls

### Pitfall Gap 1: Sharing Credentials / Sensitive Data with AI Tools

**Plain-language explanation:**
When you paste text into ChatGPT, Claude, or similar tools, that data typically leaves your organization's security perimeter and enters the AI provider's systems. Depending on the provider's policies and your account type, that data may be used to train future models, stored for compliance reasons, or visible to provider staff.

**What data leaks:**
- Source code containing API keys or database credentials
- Internal meeting transcripts with strategic plans
- Customer information (names, emails, contracts)
- Financial data (budgets, projections, vendor pricing)
- Proprietary methodologies or processes

**Concrete real-world incident: Samsung ChatGPT Leak (April 2023)**

Within 20 days of allowing ChatGPT access, Samsung experienced three separate incidents where engineers exposed confidential company information:

1. **Incident 1:** An engineer copied source code from a faulty semiconductor database into ChatGPT to get help debugging it.
2. **Incident 2:** An engineer pasted code for optimizing equipment testing sequences to identify defective chips.
3. **Incident 3:** An engineer recorded a confidential internal meeting, transcribed it, then pasted the transcript into ChatGPT to generate meeting notes.

**The cost:**
- Samsung banned all generative AI tools (ChatGPT, Bard, Bing Chat) on company devices within a month.
- Employees found violating the policy faced disciplinary action up to termination.
- Because OpenAI's terms of service at the time permitted using submitted content to improve models, the data could not be recalled—it was permanently out in the wild.

**What made this worse:**
Each engineer thought they were doing something reasonable: fixing bugs, optimizing code, summarizing meetings. The problem was not malicious intent—it was lack of awareness that pasting data into ChatGPT was equivalent to publishing it outside the company's security boundaries.

**Updated statistics (2025-2026):**
- **77% of employees leak data via ChatGPT** according to shadow AI reports.
- **Sensitive data makes up 34.8%** of employee ChatGPT inputs in Q4 2025 (up from 11% in 2023).
- In November 2025, **over 225,000 OpenAI credentials** were found for sale on dark web markets, harvested by "infostealer" malware.
- In July-August 2025, a CISA acting director uploaded at least **four "For Official Use Only" government documents** to ChatGPT's public platform.

**Controls that exist (2026):**

1. **Enterprise accounts with data isolation:**
   - ChatGPT Enterprise, Claude Team/Enterprise, and Gemini Enterprise promise that your data is NOT used to train models and is isolated from other tenants.
   - These accounts typically cost $30–$60/user/month and include compliance features (SSO, audit logs, data retention policies).

2. **Workspace isolation:**
   - Multi-tenant SaaS systems enforce strict tenant boundaries so one customer's data cannot contaminate another's via semantic search or retrieval.
   - Network segmentation creates digital boundaries between different AI agent types and the systems they access.

3. **Single Sign-On (SSO):**
   - Integrating AI tools with Okta, Azure AD, or similar identity providers ensures only authenticated, authorized users can access the AI system.
   - SSO allows IT teams to enforce device posture requirements (e.g., "only managed company devices can access the AI").

4. **Redaction / Data Loss Prevention (DLP):**
   - DLP tools scan documents before they're submitted to AI systems, automatically redacting or pseudonymizing sensitive fields like Social Security numbers, API keys, passwords, or credit card numbers.
   - Some systems require **99.98% accuracy** in PII (personally identifiable information) detection to meet compliance standards.
   - Sanctioned AI tools can process content while redacting plain-text passwords before submission.

5. **Shadow AI prevention:**
   - Organizations block consumer AI tools (ChatGPT, Claude, Gemini free accounts) at the network level.
   - Microsoft Edge for Business redirects blocked prompts to Microsoft 365 Copilot, where enterprise data protection applies (compliance boundaries, tenant isolation, no model training on user data).

**Paired practice that solves it:**
Before using AI for any work task, ask: "Would I be comfortable posting this on the company website?" If not, use only enterprise-tier AI accounts with contractual data protection, or redact sensitive information before submission.

**Plain-language analogy:**
Pasting company data into a free AI tool is like emailing your draft contract to a stranger and asking them to edit it—you've lost control of where that data goes and who sees it.

---

### Pitfall Gap 2: Too Prescriptive on Non-Deterministic Use Cases

**Plain-language explanation:**
Some tasks have exactly one correct answer (deterministic), while others benefit from exploration and variation (non-deterministic). Writing rigid, overly detailed prompts for non-deterministic tasks kills the AI's ability to surprise you with creative solutions. Conversely, being too vague on deterministic tasks wastes time in clarification loops.

**What "deterministic vs. non-deterministic" means in plain language:**

- **Deterministic task:** Same input -> same output, every time. Think: converting a CSV file to JSON format, extracting all email addresses from a document, calculating totals in a spreadsheet.
- **Non-deterministic task:** Same input -> different outputs are acceptable (and often desirable). Think: drafting a summary of a 50-page report, brainstorming project names, analyzing risks in a decision memo.

**When to write rigid prompts (deterministic use cases):**

If the task is **highly regulated, compliance-driven, or precision-critical**, you want the AI to follow a fixed template every time:
- Healthcare scheduling (ask required questions in a specific order to ensure compliance)
- Legal disclosures (deliver fixed messages with no room for reinterpretation)
- Data transformation (convert format A to format B with zero variance)

For these tasks, use structured prompts with:
- Strict templates or output formats (e.g., "output must be valid JSON with these exact fields")
- Schema definitions (e.g., "each row must have: date, amount, category")
- Sampling parameters set to remove randomness (e.g., temperature=0 in API calls)

**When to leave prompts open-ended (non-deterministic use cases):**

If the task is **inherently ambiguous, exploratory, or benefits from variety**, rigid prompts backfire:
- Drafting a customer email (different customers need different tones)
- Summarizing research findings (emphasis depends on audience)
- Product recommendations (surfacing options based on interest, not fixed rules)

For these tasks, use open-ended prompts:
- "Summarize this report for a non-technical executive audience. Focus on actionable insights."
- "Draft a response to this customer complaint. Be empathetic and solution-focused."
- "Analyze the risks in this proposal. What concerns should we address before moving forward?"

**Concrete example of the mistake:**

**Bad (too prescriptive on non-deterministic task):**
"Analyze this 30-page research report. Your summary must be exactly 250 words. Include exactly three bullet points. The first sentence must restate the report title. Use Times New Roman font. Begin each bullet with an action verb."

**Why it's bad:**
You're asking the AI to optimize for word count and formatting instead of insight quality. The AI will spend its "reasoning budget" on counting words rather than identifying the most important findings.

**Good (appropriately open-ended):**
"Summarize this research report in 1–2 paragraphs for a senior executive who needs to decide whether to fund the project. Highlight the three most important findings and any major risks."

**Concrete example of the opposite mistake:**

**Bad (too vague on deterministic task):**
"Can you do something with this data?"

**Why it's bad:**
The AI doesn't know if you want it summarized, visualized, cleaned, transformed, or analyzed. You'll waste several turns clarifying.

**Good (appropriately specific):**
"Convert this CSV file to JSON format. Each row should become an object with keys matching the column headers. Output valid JSON with no additional commentary."

**Paired practice that solves it:**
Before writing a prompt, ask: "Is there exactly one right answer, or are multiple good answers possible?" If one right answer -> be specific (format, schema, constraints). If multiple good answers -> focus on intent and audience, not mechanics.

---

### Pitfall Gap 3: Hitting Session / Weekly Rate Limits

**Plain-language explanation:**
AI providers limit how much you can use their tools within a given time window—not to be mean, but to prevent any single user from monopolizing compute resources. If you hit these limits, the AI simply stops working until the time window resets or you upgrade your plan.

**Current rate limits (2026):**

**Claude Pro:**
- ~45 messages per 5-hour rolling window (~200+ daily)
- Weekly quota introduced August 28, 2025 (applies to heavy users, <5% of subscribers)
- Two weekly limits: overall usage cap + Opus-specific cap
- During peak usage times, limits may drop to 35–40 messages per 5-hour window

**Claude Max plans:**
- Max 5x ($100/month): ~225 messages per 5-hour window
- Max 20x ($200/month): ~900 messages per 5-hour window
- Some Max users report hitting caps in under 2 hours with intensive Claude Code usage

**ChatGPT Plus ($20/month):**
- 320–640 messages per day (varies by model and demand)
- Separate caps for GPT-4 vs. GPT-3.5

**What happens when you hit the limit:**
- The AI stops responding with: "You've reached your usage limit. Please try again in X hours."
- Your work is interrupted. You cannot resume until the time window resets.
- No data is lost, but productivity halts.

**Common mistakes that burn through limits fast:**

1. **Sending the same context repeatedly:**
   Asking the AI to "review this 50-page document" in 10 consecutive messages wastes tokens. Instead, load the document once and ask all questions in a single session.

2. **Editing system instructions mid-session:**
   Changing CLAUDE.md or custom instructions mid-session often busts the cache, forcing the AI to reprocess everything from scratch.

3. **Running complex refactoring tasks in one giant request:**
   Breaking large tasks into smaller, scoped operations reduces per-request context and keeps you under per-message token limits.

4. **Using the most expensive model for everything:**
   Using Opus for simple lookups when Haiku would suffice burns through your quota 15x faster (Haiku is ~15x cheaper per token than Opus).

**Recovery strategies when you hit limits:**

1. **Exponential backoff with jitter:**
   If you're hitting API rate limits programmatically, retry with exponential backoff (wait 1s, then 2s, then 4s, etc.) plus random jitter to avoid "thundering herd" retries.

2. **Model switching:**
   Use /model to switch to a lighter model (Haiku or Sonnet) when hitting limits. Reserve Opus for tasks requiring top-tier reasoning.

3. **Context management:**
   Use /clear or /compact to reduce carried context. This shrinks your per-message token usage and lets you fit more messages in the 5-hour window.

4. **Extra usage (Claude):**
   Claude Pro/Max subscribers can enable "extra usage" to continue using Claude after hitting limits, paying standard API rates per token for overage. This converts from subscription pricing to consumption-based pricing seamlessly.

5. **API vs. subscription:**
   For heavy users spending >$60–$80/month, direct API access with prepaid credits often costs less per token than Max subscriptions and offers explicit, documented rate limits.

6. **Batch API:**
   For non-time-sensitive work, use the Batch API (if available), which offers cost reductions and doesn't count against standard rate limits.

**Paired practice that solves it:**
Monitor your usage in real time (Claude Code's status line shows token usage and cache hit rate). If your cache hit rate drops below 30%, you're wasting tokens. Compact or clear the session. If you regularly hit limits, upgrade your plan or switch to API access with higher quotas.

**Plain-language analogy:**
Rate limits are like a data plan on your phone. You get X gigabytes per month. If you stream 4K video all day, you'll hit the cap and your speed drops. The solution is either use less bandwidth (lower quality video) or upgrade to a bigger plan.

---

### Pitfall Gap 4: One-Session Implementation (The AI Dumb Zone)

**Plain-language explanation:**
AI models have a "context window"—the amount of text they can "remember" at once. When you work in a single session for hours, that window fills with old messages, failed attempts, outdated instructions, and conversational noise. As the window fills, the AI's accuracy degrades because it's spending its "attention budget" sifting through clutter instead of focusing on your current request.

This degradation is called **context rot**.

**What context rot looks like in practice:**

- The AI starts repeating itself or forgetting instructions you gave 30 minutes ago.
- The AI references an outdated version of a document you've since revised.
- The AI makes mistakes it didn't make earlier in the session (e.g., calling the wrong tool, misinterpreting your request).
- Responses slow down because the AI is processing a bloated context window.

**Why it happens:**

Research consistently shows that AI models are better at paying attention to information at the **beginning and end** of the context window than to information in the **middle**. Your early instructions—the foundational context—get pushed into the "middle zone" as the session grows, and the model's attention drifts away from them.

**Concrete symptom:**

You're working with an AI to draft a project proposal. In the first hour, the AI produces polished, well-structured drafts. By hour three, the AI starts:
- Repeating the same ideas in slightly different words
- Ignoring constraints you specified early in the session ("keep it under 2 pages" -> outputs 5 pages)
- Mixing up project names or details from earlier drafts

**Why "just compact it" isn't always the answer:**

Some tools (like Claude) offer /compact commands to summarize old conversation history and shrink the context window. This helps, but:
- Compaction itself is lossy—nuance and detail get dropped.
- If the session is already degraded, compaction won't recover lost quality; it just delays the next degradation.
- Compaction still leaves you working in a single, ever-growing thread.

**The "start fresh session" pattern:**

Start a fresh session when:
- You start a new topic or subtask
- The AI does something problematic and you want it to try again with a clean slate
- The conversation exceeds ~15 messages or feels "sluggish"
- You notice the AI ignoring earlier instructions

**Concrete example:**

**Bad (one-session implementation):**
You start a session to draft a report. Over 3 hours and 40 messages, you:
- Ask the AI to research the topic
- Draft an outline
- Write section 1
- Revise section 1 (3 times)
- Write section 2
- Realize section 1 needs a different structure
- Ask the AI to rewrite section 1
- The AI now mixes old and new structure, ignoring your latest instructions

**Good (fresh session pattern):**
You start a session to research the topic (10 messages). Once you have the outline, you start a **new session** to write section 1, pasting only the final outline (not the research noise). After finalizing section 1, you start a **new session** to write section 2, pasting only section 1 and the outline.

Result: Each session has a lean, focused context. The AI never works in the "dumb zone."

**Paired practice that solves it:**
Treat AI sessions like chapters in a book, not one infinite scroll. After completing a subtask, save the key output (the outline, the draft, the decision) and start a new session for the next subtask, carrying forward only the essential context.

**Plain-language analogy:**
Context rot is like a messy desk. The more papers pile up, the harder it is to find the one you need. You could organize the mess (compaction), but eventually it's faster to clear the desk and start fresh.

---

### Pitfall Gap 5: Stale / Incorrect Data as Source of Truth

**Plain-language explanation:**
AI models are trained on data up to a specific cutoff date. They don't automatically "know" about events, regulations, or information that came after that date. If you ask an AI to cite recent statistics or reference new policies without providing that data yourself, the AI may confidently hallucinate plausible-sounding (but wrong) information.

**Current knowledge cutoff dates (2026):**

- **Claude 4.7 Opus:** Reliable knowledge cutoff in January 2026 (released April 17, 2026)
- **ChatGPT-5.4:** Knowledge cutoff August 31, 2025 (released March 6, 2026)
- **GPT-4o:** Knowledge cutoff October 2023 (still used in many integrations)
- **Gemini 3.1 Flash-Lite:** Knowledge cutoff January 2025 (released March 3, 2026)

**Important distinction:**
A model's **inherent knowledge** (limited by its cutoff date) is different from its **ability to access current information**. Some tools (Perplexity, Gemini, ChatGPT with browsing enabled, Claude with MCP tools) can search the web or query live databases, but this behavior is not automatic—it depends on the tool, the account type, and sometimes the specific prompt.

**When AI confidently uses outdated information:**

- You ask for "the latest industry regulations" -> AI cites regulations from 2024, unaware of 2026 updates.
- You ask for "current market data" -> AI invents plausible-sounding but fake statistics.
- You reference a product launched in March 2026 -> AI says "I don't have information about that product" or invents features.

**Concrete symptom:**

You're drafting a compliance memo and ask the AI: "What are the current OSHA requirements for workplace air quality monitoring?"

The AI responds with confidence: "OSHA requires employers to monitor air quality quarterly using certified instruments, with results reported to the regional office within 30 days."

This sounds authoritative. But if OSHA updated the requirements in February 2026 (after the AI's training cutoff), the AI's answer is outdated and potentially non-compliant.

**Mitigation patterns:**

1. **Retrieval-Augmented Generation (RAG):**
   RAG systems connect AI models to external, up-to-date data sources in real-time. Instead of relying on the model's frozen training data, the system retrieves current documents (from your company's knowledge base, regulatory databases, or the web) and feeds them to the AI alongside your prompt.

   Example: You ask about OSHA requirements -> the RAG system searches your company's compliance database for the latest OSHA guidance -> the AI drafts a response grounded in that live data.

2. **Real-time search integration:**
   Tools like Perplexity always search the web. ChatGPT's browsing is triggered selectively. Claude uses MCP tools for web access but doesn't browse by default. If freshness matters (news, financial data, regulatory updates), use a tool that actively retrieves current information.

3. **Explicit source citation:**
   When asking for facts, request citations: "What are the current OSHA air quality requirements? Please cite your source."
   If the AI cannot cite a source (or cites a source from before the cutoff date), treat the answer as suspect.

4. **Provide the data yourself:**
   If you need the AI to reference a specific regulation, policy, or dataset, paste it into the prompt. Don't assume the AI "knows" it.

**RAG in 2026:**
RAG has shifted from experimentation to production-critical architecture. Organizations maintain current information by:
- Asynchronously updating documents and their embeddings through automated real-time processes
- Periodic batch processing to refresh knowledge bases
- Integrating with real-time search for domains where freshness matters (news, financial data, regulatory compliance)

By 2026, **85% of enterprise RAG deployments** incorporate privacy-preserving techniques (up from 32% in 2024), driven primarily by regulatory compliance.

**Paired practice that solves it:**
Never trust an AI's "knowledge" of recent events, regulations, or statistics without verification. If the information is critical, either (1) provide the source document in your prompt, or (2) use a tool with live search/retrieval, and always verify the citation.

**Plain-language analogy:**
An AI's knowledge cutoff is like a reference book from 2024. It's useful for general knowledge, but if you need 2026 regulations, you can't rely on the book—you need to go to the library (web search) or bring the 2026 document yourself.

---

### Pitfall Gap 6: Over-Engineering (Using AI When a Simple Script Would Work)

**Plain-language explanation:**
AI models are probabilistic—they predict the most likely next word based on patterns. For tasks that require **perfect repeatability, mathematical precision, or zero tolerance for error**, a simple deterministic script (a fixed set of rules) is often faster, cheaper, and more reliable than AI.

**When NOT to use AI:**

1. **Tasks requiring mathematical accuracy:**
   "Calculate the total of these 50 invoices" -> A spreadsheet formula or Python script will give you the exact answer every time. An AI might round incorrectly, misinterpret a column, or hallucinate a number.

2. **Tasks requiring perfect repeatability:**
   "Generate a compliance report in this exact format every week" -> A script that pulls data from your database and fills a template will produce identical output every time. An AI might rephrase sentences, reorder sections, or introduce subtle variance.

3. **Simple, routine tasks:**
   "Clean the build directory and update dependencies" -> This is a one-line shell script. Using AI is like hiring an architect to hammer a nail—massive overkill.

4. **Tasks requiring deterministic outcomes:**
   In engineering, 1 + 1 must always equal 2. AI models prioritize the likelihood of a response over the veracity of the data, so they can produce "hallucinations" that look perfectly professional but are factually or mathematically incorrect.

**Concrete example of over-engineering:**

**Bad (using AI):**
You have a weekly task: Pull sales data from your CRM, calculate total revenue by region, and email a summary to leadership.

You build an AI agent that:
- Connects to your CRM
- Asks the AI to "analyze" the sales data
- Generates a natural-language summary
- Emails the summary

**Why it's bad:**
- The AI might misinterpret revenue numbers (hallucinate a trend that doesn't exist).
- The AI's output varies week to week (different phrasing, different emphasis), making it hard to compare trends.
- You're paying AI token costs for a task that doesn't benefit from AI's strengths (creativity, pattern-matching, natural language understanding).

**Good (using a deterministic script):**
You write a Python script that:
- Queries your CRM for last week's sales
- Calculates total revenue by region (simple math)
- Fills a fixed email template with the numbers
- Sends the email

Result: Same output every week, zero hallucination risk, runs in seconds, costs pennies.

**When AI *is* the right tool:**

- "Summarize this 50-page legal document for a non-lawyer" -> AI excels at extracting key points and adapting tone for audience.
- "Draft a response to this customer complaint" -> AI can generate empathetic, context-aware language that a fixed template cannot.
- "What risks should we consider before launching this product?" -> AI can surface non-obvious patterns from unstructured data.

**The hybrid approach:**

The best systems combine deterministic logic with AI:
- Use AI to **interpret** ambiguous inputs (e.g., "What does this customer email mean?")
- Use deterministic logic to **enforce** outcomes (e.g., "Route the email to the correct team based on this category")

Think of it as a loop: **interpret -> structure -> enforce**. The AI interprets unstructured or ambiguous inputs. You structure that interpretation into reliable signals. Then your deterministic logic enforces the outcomes you expect.

**Paired practice that solves it:**
Before using AI, ask: "Does this task have one correct answer? Does it require exact repeatability?" If yes -> use a script. If the task is ambiguous, creative, or exploratory -> use AI. Don't over-engineer by default.

**Plain-language analogy:**
Using AI for deterministic tasks is like using a race car to drive to the grocery store. It's expensive, complex, and overkill. Save the race car for the racetrack (complex, high-stakes, creative tasks).

---

## Part 2: Under-Researched Best Practices

### Best Practice Gap 7: Don't Reinvent the Wheel (Leverage Existing Skills, MCP Servers, Plugins)

**Plain-language explanation:**
The AI ecosystem has matured rapidly. Instead of building custom solutions from scratch, you can often find pre-built "skills," "plugins," or "MCP servers" that solve your problem. These are reusable components built by the community or AI providers, tested by thousands of users, and maintained independently.

**Key ecosystems (2026):**

1. **Claude Skills:**
   Markdown instruction files that teach Claude Code specific behaviors. Skills are versioned, searchable, and shareable.
   As of May 2026: **4,200+ skills** in community registries.

2. **MCP (Model Context Protocol) Servers:**
   Open standard introduced by Anthropic (donated to Linux Foundation in December 2025) for connecting AI tools to external data sources and services.
   As of March 2026: **10,000+ public MCP servers**, 97 million downloads/month.
   Supported by ChatGPT, Claude, Cursor, Gemini, Microsoft Copilot, VS Code, and others.

3. **ChatGPT Custom GPTs:**
   Pre-configured chatbots with custom instructions, tools, and knowledge bases, searchable in the GPT Store (launched November 2023).
   Largest ecosystem by far; potentially monetizable.

4. **Google Gemini Gems:**
   Custom AI personas that tap into Gmail, Drive, Calendar, Docs (if you're on Google Workspace).
   Unique advantage: deep integration with Google services.

**Why this matters:**

Instead of spending 10 hours building a custom "summarize research papers" workflow, you can:
- Search the Claude Skills registry for "research summarizer"
- Install a pre-built skill with one command
- Customize it if needed

The community has already solved many common problems. Reusing their work saves time, reduces bugs, and often produces better results (because the skill has been refined by hundreds of users).

**Discovery platforms:**

- **TokRepo:** Free registry with 500+ skills, MCP servers, and workflows, searchable by category with install commands.
- **claudemarketplace.com:** Community-curated directory with ratings and install counts (150+ skills as of March 2026).
- **MCP server registries:** Letting you browse servers, read reviews, and install with minimal configuration.

**Concrete example:**

**Bad (reinventing the wheel):**
You need to connect your AI workflow to a company database. You spend 2 weeks writing custom code to:
- Authenticate with the database
- Parse queries
- Return results in a format the AI can understand
- Handle errors

**Good (leveraging the ecosystem):**
You search the MCP registry for "database connector." You find a pre-built MCP server for your database type (PostgreSQL, MySQL, etc.). You install it with one command, configure your credentials, and it works.

Time saved: 2 weeks. Bug risk: near zero (the MCP server is battle-tested by thousands of users).

**Skills vs. MCP servers:**

- **Skills** define workflows and standards (how the AI should behave).
- **MCP servers** provide data and external connections (databases, APIs, file systems).
- The most powerful setups **combine both**: a skill defines the workflow, and an MCP server provides the live data.

**Paired practice that solves it:**
Before building any custom AI integration, spend 30 minutes searching registries (TokRepo, claudemarketplace.com, MCP server lists) for pre-built solutions. If you find a 70% match, fork it and customize rather than starting from scratch.

---

### Best Practice Gap 8: Foundation First, Then Application

**Plain-language explanation:**
Many people jump straight to using AI tools (ChatGPT, Claude, Copilot) without understanding how those tools work under the hood. This leads to surprises, frustration, and poor results. Building a basic mental model of how AI works—before diving into applications—makes you a dramatically more effective user.

**Why understanding matters before tools:**

Without a mental model, you treat AI as a "magic box." When it fails, you don't know why. When it succeeds, you can't replicate the success. With a mental model, you understand:
- Why the AI sometimes hallucinates (it's predicting likely words, not retrieving truth)
- Why context size matters (attention budget is limited)
- Why phrasing your prompt differently changes the output (the model is sensitive to input patterns)

**Three mental models for non-engineers:**

These are from a widely-cited April 2026 Medium article on LLM mental models:

1. **The Librarian (Latent Space & Semantic Search):**
   Imagine a librarian who doesn't know the exact location of every book, but understands the *meaning* of your question and points you to the relevant shelf. AI models work the same way: they don't store facts like a database; they store patterns in a high-dimensional "meaning space." When you ask a question, the AI finds the nearest pattern and generates a response based on that.

2. **The Weighted Die (Probability Distributions):**
   AI outputs are not deterministic—they're drawn from a probability distribution. The model predicts "the next word is 60% likely to be 'increase,' 30% likely to be 'growth,' 10% likely to be 'rise.'" It then rolls a weighted die to pick one. This is why asking the same question twice can give different answers.

3. **The Scratch Pad (Reasoning Models Think Through Problems):**
   Newer models (like OpenAI's o1 or Claude's extended thinking) use a "scratch pad" to work through problems step by step before answering. This is like showing your work in math class—it improves accuracy but takes longer and costs more tokens.

**Concrete progression for non-engineers:**

A 2026 generative AI learning roadmap (designed for career-switchers, not researchers) recommends:
1. **Master Python and ML basics first** (2–4 weeks)
2. **Learn deep learning fundamentals** (understand neural networks, training, loss functions) (4–6 weeks)
3. **Then dive into LLMs, RAG, and agents** with proper context (8–12 weeks)

This "foundations first" approach prevents gaps in understanding. Without it, learners "jump between tutorials and end up with gaps in math, coding, or deployment."

**Why this matters for non-coders:**

You don't need to understand transformer mathematics to make good AI decisions, but you need a mental model better than "magic box."

For example:
- If you know AI predicts likely words (not truth), you'll verify facts instead of trusting hallucinations.
- If you know context windows have attention budgets, you'll trim irrelevant information instead of pasting entire manuals.
- If you know probability distributions explain variance, you'll set temperature=0 for deterministic tasks instead of wondering why outputs differ.

**Paired practice that solves it:**
Before diving into advanced AI tools, spend 2–3 hours learning:
- What a language model is (pattern predictor, not knowledge base)
- What a context window is (short-term memory with limited attention)
- What a prompt is (instructions + examples that shape behavior)

Resources: YouTube explainers on "How ChatGPT works," Anthropic's "Claude 101" docs, or any intro LLM course. You'll save 10+ hours of trial-and-error later.

---

### Best Practice Gap 9: Goal-Driven Approach (Start from the Outcome, Work Backward)

**Plain-language explanation:**
Many organizations adopt AI tactically—"Let's try ChatGPT for email drafts!"—without asking what business problem they're solving. This leads to fragmented tools, inconsistent results, and no measurable ROI. The goal-driven approach flips this: start with a clear business outcome, then identify how AI helps achieve it.

**Tool-driven approach (2025 pattern):**

- Marketing team buys an AI writing tool -> uses it to polish a few emails -> adoption is uneven -> results are inconsistent -> no clear impact on revenue.
- Revenue team applies AI tactically -> improves call summaries or email drafts -> doesn't change underlying workflows -> minimal productivity gain.

**Goal-driven approach (2026 direction):**

- Marketing team sets a goal: "Increase qualified leads by 15% in Q2."
- They identify the constraint: "Our content team can only publish 4 blog posts per month; competitors publish 12."
- They ask: "How can AI help us produce more high-quality content?"
- They implement AI-assisted drafting + human editing -> publish 10 posts/month -> track lead conversion from blog traffic -> measure ROI.

**Key distinctions:**

| Tool-Driven | Goal-Driven |
|-------------|-------------|
| "Let's use AI for something." | "What outcome do we need? Can AI help?" |
| Success = adoption rate ("80% of employees used ChatGPT") | Success = business KPIs ("Reduced churn by 15%") |
| Metrics: tool usage, feature adoption | Metrics: revenue, cost savings, time-to-market |
| Top-down mandate: "Everyone use this tool" | Bottom-up discovery: "Which workflows have the biggest payoff?" |

**Concrete example:**

**Bad (tool-driven):**
A company hears about AI and decides: "Everyone should use ChatGPT for their work."
- No clear success criteria
- No measurement plan
- After 6 months: "Some people use it, some don't. We don't know if it helped."

**Good (goal-driven):**
A company identifies a problem: "Our customer support team takes 48 hours to respond to tickets, but customers expect responses within 12 hours."
- Goal: Reduce median response time to <12 hours.
- Constraint: Support team is maxed out; hiring more staff isn't feasible.
- AI solution: Implement AI-powered ticket triage + draft responses for common questions -> human agents review and send.
- Metrics: Median response time drops to 8 hours. Customer satisfaction score increases 12%. ROI is measurable.

**Industry shift (2025 -> 2026):**

According to 2026 industry reports:
- In 2025, companies crowdsourced AI efforts -> impressive adoption numbers, but seldom meaningful business outcomes.
- In 2026, companies adopt enterprise-wide strategies where **senior leadership picks focused AI investments** based on high-ROI workflows.
- Success is measured through **business KPIs** (reduce churn by 15%, increase throughput by 20%, shorten processing time by 30%), not technical metrics.

**PwC 2026 prediction:**
"The advantage won't be who has the most AI—it will be who has the clearest strategy and decision-making system."

**Paired practice that solves it:**
Before adopting any AI tool, answer these questions:
1. What business outcome are we trying to achieve? (Specific, measurable goal)
2. What's the current constraint preventing us from achieving it?
3. How will AI help remove that constraint?
4. How will we measure success?

If you can't answer all four, you're not ready to adopt the tool yet.

---

### Best Practice Gap 10: Human-in-the-Loop (Approval Gates, Review Before Commit)

**Plain-language explanation:**
Fully autonomous AI sounds appealing ("Let the AI handle it!"), but in practice, production-grade AI systems insert **strategic approval gates** where humans review the AI's plan before execution. This isn't micromanagement—it's risk mitigation.

**Evolution: Permission-Based -> Auto Mode with Gates (2026)**

Anthropic introduced **auto mode** in Claude Code (2026), which shifts oversight from individual steps to overall strategy:
- **Old model (permission-based):** User approves every action (run this command, modify this file, etc.). Tedious and slow.
- **New model (auto mode with gates):** AI shows the user its **intended plan** up-front. User reviews, edits, and approves the plan. AI then executes autonomously, escalating to the human only when uncertain or when hitting a high-risk action.

**When to insert human review:**

1. **High-impact tool calls:**
   - Deleting files, modifying production databases, sending emails to external stakeholders -> require human approval.
   - Reading files, querying read-only databases, running tests -> can be auto-approved.

2. **Uncertain AI:**
   - If the AI's confidence score is low, it should escalate to a human: "I'm 60% sure this is the right course. Please confirm."

3. **Strategic decision points:**
   - Before committing code, before sending a report to leadership, before executing a financial transaction -> human review.

4. **Plan-level review (not step-level):**
   Instead of approving every micro-action, review the AI's plan: "I will do steps 1–5 to achieve goal X. Do you approve?" This is faster and gives you visibility into the AI's reasoning.

**Concrete example:**

**Bad (no human-in-the-loop):**
An AI agent monitors equipment sensors and automatically orders replacement parts when sensors indicate wear.
One day, a sensor glitches and sends false data. The AI orders $50,000 in unnecessary parts. By the time a human notices, the order is shipped.

**Good (approval gate at high-cost actions):**
The same AI monitors sensors and flags when parts might be needed. It generates a purchase recommendation with supporting data (sensor readings, historical trends, cost estimate). A human reviews the recommendation, confirms the sensor readings look legitimate, and approves the order.
When the sensor glitches, the human catches it: "These readings don't match the maintenance log. Let's verify before ordering."

**Anthropic's 2026 agentic coding playbook:**

For any AI agent that changes code, the team should know:
- The prompt that triggered the action
- Files touched
- Commands run
- Test output
- Model used
- Human approver

This creates an audit trail for compliance, debugging, and continuous improvement.

**User behavior patterns (2026):**

Experienced users are more likely to let AI work autonomously, stepping in when something goes wrong or needs redirection. Higher interrupt rates often reflect active monitoring by users who have honed instincts for when intervention is needed.

**Best human-in-the-loop designs:**

- **Auto-allow no-risk actions** (reading files, running tests)
- **Gate at strategic decision points** (commit, deploy, purchase, email external stakeholders)
- **Escalate when uncertain** (AI flags low-confidence decisions for human review)
- **Never ask questions with obvious answers** (don't make the user approve trivial actions)

**Paired practice that solves it:**
For any AI workflow touching sensitive data or high-stakes actions, design a **single approval gate** where the AI presents its plan and the human approves or adjusts. Don't gate every micro-step (exhausting), but don't run fully autonomous either (risky).

---

### Best Practice Gap 11: Build Skills Over Tools (Reusable Domain Expertise)

**Plain-language explanation:**
AI tools come and go. ChatGPT might be the leader today; something else might dominate in 2028. But the **skills** you build—prompt engineering, workflow design, problem decomposition—are portable. Invest in reusable domain expertise (captured in Skills, Gems, or Notebooks) rather than tool-specific tricks.

**What "build skills over tools" means:**

- **Tool-focused:** "I know 47 ChatGPT keyboard shortcuts."
  **Skill-focused:** "I know how to break a complex task into subtasks that any AI can handle."

- **Tool-focused:** "I can make Claude Code do X."
  **Skill-focused:** "I understand when to use deterministic scripts vs. AI, regardless of which AI I'm using."

**Reusable artifacts (2026):**

1. **Claude Skills:**
   Markdown files that capture your workflow. If you switch from Claude Code to another tool, you can port the workflow by adapting the skill file.

2. **ChatGPT Custom GPTs:**
   Pre-configured chatbots with custom instructions. You can export the instructions and use them in other tools.

3. **NotebookLM Workbooks:**
   Structured knowledge bases (study guides, timelines, FAQs) generated from your sources. These outputs are portable—you own the content, not just access to the tool.

4. **Prompt libraries:**
   Collections of reusable prompts for common tasks (summarization, drafting, analysis). Tools like Anthropic's prompt library or community GitHub repos let you copy and adapt prompts across platforms.

**Why this matters:**

Companies seek workers who "understand both ML foundations and practical GenAI stacks, not just how to call a single API."

A 56% wage premium exists for workers with AI skills (McKinsey, 2026), but those skills are:
- **Durable:** Prompt engineering, workflow design, eval creation
- **Not durable:** Tool-specific features that might disappear in the next update

**Concrete example:**

**Bad (tool-focused):**
You spend 20 hours mastering ChatGPT's "Canvas" feature for collaborative editing. Six months later, OpenAI deprecates Canvas in favor of a new interface. Your 20 hours are wasted.

**Good (skill-focused):**
You spend 20 hours learning how to write effective prompts for collaborative editing workflows: how to structure instructions, how to give feedback iteratively, how to blend AI drafts with human judgment. These skills transfer to any tool (ChatGPT, Claude, Gemini, future platforms).

**How to build portable skills:**

1. **Document your workflows as "Skills" or "SOPs" (standard operating procedures).**
   Example: "To draft a project proposal, I (1) gather requirements, (2) use AI to generate a first draft, (3) review for accuracy and tone, (4) refine with 2–3 iterations."
   This workflow works with ChatGPT, Claude, Gemini, or any future tool.

2. **Learn the fundamentals (see Best Practice Gap 8).**
   Understanding how LLMs work makes you tool-agnostic. You can adapt to new platforms quickly because you understand the underlying principles.

3. **Build reusable prompt templates.**
   Instead of writing a one-off prompt for each task, write a template:
   "Summarize [document] for [audience], focusing on [key themes]. Highlight [specific concerns]."
   This template works across tools and tasks.

**Paired practice that solves it:**
For every AI task you complete, ask: "What did I learn that I can reuse?" Write it down. After 10 tasks, you'll have a library of reusable patterns that make you 10x faster, regardless of which tool you're using.

---

### Best Practice Gap 12: Context Monitoring (Status Line Tracking)

**Plain-language explanation:**
In tools like Claude Code, the **status line** shows real-time information about your session: how many tokens you've used, your cache hit rate, and how close you are to rate limits. Monitoring this in real time lets you course-correct before you hit limits or degrade performance.

**What the status line shows (Claude Code, 2026):**

1. **Token counts:**
   - `total_input_tokens`: Everything in the context window (input + cache creation + cache reads)
   - `total_output_tokens`: AI's responses
   - `used_percentage`: How full your context window is

2. **Cache hit rate:**
   - What percentage of your context is being reused from the cache vs. reprocessed from scratch.
   - Below 30% cache hit rate -> you're paying full input price every turn (inefficient).

3. **Model used:**
   - Which model (Opus, Sonnet, Haiku) is handling your request.

4. **Rate limit proximity:**
   - How close you are to hitting your 5-hour or weekly cap.

**Why monitoring matters:**

If you don't monitor, you'll:
- Hit rate limits unexpectedly ("Why did it stop working?")
- Waste tokens on low cache hit rates (burning through your quota 3x faster than necessary)
- Slow down as your context window fills (without knowing why)

If you do monitor, you can:
- **Compact or clear** when cache hit rate drops below 30%
- **Switch models** if you're burning through Opus quota on simple tasks
- **Start a fresh session** when `used_percentage` exceeds 70% (before context rot sets in)

**What busts the cache (drops cache hit rate to ~0%):**

- Editing CLAUDE.md or custom instructions mid-session
- Switching models mid-session
- Rearranging system messages

**Concrete example:**

**Bad (no monitoring):**
You're working in a long session. Around message 30, you notice responses are slower and less accurate. You keep going. By message 50, the AI is repeating itself and ignoring earlier instructions. You don't know why. You restart, losing progress.

**Good (with monitoring):**
You glance at the status line and see:
- `used_percentage`: 68%
- Cache hit rate: 22%

You realize: "My context is almost full, and I'm wasting tokens." You run /compact to summarize old turns, which brings your `used_percentage` down to 40% and cache hit rate back to 65%. The AI's performance improves immediately.

**Available monitoring tools (2026):**

- **Built-in status line:** Claude Code's default status line (customizable via settings).
- **AgentsRoom token meter:** Real-time display of input/output tokens, cache reads/writes, cache hit rate, message count, model used, and usage tips.
- **ccusage:** Historical analyzer for past sessions (track trends over time).
- **Claude-Code-Usage-Monitor:** Live monitoring with ML-based predictions of when you'll hit limits.

**Session monitor tips (contextual):**

Some monitors surface tips based on your live cache hit rate:
- Below 30%: "Tip: Consider using /compact to improve cache efficiency."
- Above 70% used_percentage: "Tip: Your context is getting full. Consider starting a fresh session."

**Paired practice that solves it:**
Glance at your status line every 10–15 messages. If cache hit rate drops below 30% or used_percentage exceeds 70%, take action (compact, clear, or start fresh). This keeps your sessions lean and efficient.

---

### Best Practice Gap 13: Subagent Offloading (Protecting the Main Context Window)

**Plain-language explanation:**
Instead of doing all work in a single AI session (which fills the context window with noise), you can **delegate** exploratory or research-heavy tasks to "subagents"—specialized AI assistants that run in their own isolated context windows. Only their final summary returns to your main session, keeping your main context lean.

**The problem subagents solve:**

A 200K-token context window sounds huge, but a multi-hour session on a real project fills it fast:
- Tool output (logs, file contents, search results)
- Conversation history (40+ messages)
- Repeated file reads (the same document loaded 5 times because you edited it)

Once you're at two-thirds capacity (roughly 130K tokens), response quality degrades—not because the model changed, but because the signal-to-noise ratio collapsed.

**How subagents work:**

Subagents are specialized AI assistants that run in their own isolated context window (200K tokens each, separate from your main session). When you delegate a task to a subagent:
- The subagent's exploration, file reads, and command output stay in **its** context.
- Only a **concise summary** returns to your main session.

Result: Your main context stays lean and focused.

**Built-in subagents (Claude Code, 2026):**

1. **Explore (read-only, runs on Haiku):**
   Optimized for speed and cost. Searches and understands a codebase without making changes.

2. **Plan:**
   Gathers context before Claude presents a strategy in plan mode.

3. **General-purpose:**
   Handles tasks that need both exploration and modification.

**When subagents save tokens:**

- **Research tasks:** "Search the web for the latest regulations on X."
  Instead of cluttering your main session with 20 search results, a subagent reads them all and returns a 1-paragraph summary.

- **File discovery:** "Find all files in this repo that reference function X."
  The subagent scans hundreds of files; your main session only sees the final list.

- **Exploratory analysis:** "Analyze this dataset and identify trends."
  The subagent does the heavy lifting; you get a clean summary.

**When subagents add overhead:**

- **Simple lookups:** "What's the definition of X?"
  Spawning a subagent for a one-line answer is slower than just asking in your main session.

- **Tasks requiring continuity:** "Review this draft, then revise it based on my feedback, then revise it again."
  Subagents don't share context, so you'd have to manually ferry context between them. Better to do this in your main session.

**Model routing for cost optimization:**

- **Main session (Opus):** High-level reasoning, architectural judgment, synthesis.
- **Subagents (Sonnet):** Implementation work, routine searches.
- **Subagents (Haiku):** File discovery, simple transformations.

The cost difference is significant: **Haiku is ~15x cheaper per token than Opus**.

**Concrete example:**

**Bad (no subagent):**
You ask your main session: "Research the latest best practices for API security."
The AI searches 15 sources, loads dozens of articles, and fills your main context with 50K tokens of research. You now have 30% less room for your actual work.

**Good (with subagent):**
You dispatch a **subagent** to research API security. The subagent reads 15 sources in its own 200K-token context. It returns a 500-word summary to your main session.
Your main context: +500 words.
Subagent's context: +50K tokens (but isolated, doesn't affect your main session).

**Parallel execution (Gemini CLI, 2026):**

Gemini CLI subagents support **parallel execution** out of the box. You can run multiple subagents simultaneously (e.g., "Research topic A" + "Research topic B" + "Research topic C"), and all three return results in parallel, saving time.

**Paired practice that solves it:**
For any task that requires extensive exploration, search, or file reading, ask: "Will this clutter my main context?" If yes, delegate to a subagent. Reserve your main session for synthesis, decision-making, and final output.

---

### Best Practice Gap 14: Automation Testing + Self-Healing Mechanism

**Plain-language explanation:**
In traditional software, you write tests to catch regressions (new changes that break old functionality). The same principle applies to AI workflows: write **eval tests** to catch when AI outputs degrade. "Self-healing" refers to AI systems that automatically adapt when minor changes occur (e.g., a button moved on a webpage), reducing manual maintenance.

**Eval-driven workflows for non-coding tasks:**

You don't need to be a developer to use evals. Evals for AI outputs can be:
1. **Code-based:** "Does the output match this expected format?" (e.g., JSON schema, required fields)
2. **Model-based:** "Does another AI judge this output as accurate/relevant/appropriate?"
3. **Human-based:** "Do expert reviewers rate this output as high-quality?"

**Concrete example (non-coding):**

You use AI to draft weekly summaries of customer feedback. Each summary should:
- Highlight top 3 themes
- Include at least one direct quote
- Be <300 words
- Maintain a neutral, professional tone

**Eval test (code-based):**
- Word count <300? Pass
- Contains at least 1 quote (text in quotation marks)? Pass
- Lists exactly 3 themes? Pass

**Eval test (model-based):**
- Prompt a second AI: "Rate this summary on tone (1–5 scale, where 1=biased, 5=neutral). Does it accurately reflect the themes in the source data?"
- If the rating is <4, flag for human review.

**Eval test (human-based):**
- Once per month, have a subject-matter expert review 10 random summaries.
- Track accuracy over time: Are we improving? Regressing?

**Self-healing AI systems:**

Self-healing applies primarily to **AI-powered test automation** (for software QA), but the principle applies broadly: instead of breaking when the environment changes slightly, the AI adapts.

**Example in software testing:**
Old test: "Click the button with ID='submit-btn'."
The developer changes the button ID to 'submit-button'.
Traditional test: Breaks.
Self-healing test: AI recognizes "This is still the submit button (same label, same position, same function)" and updates the test automatically. Pass.

**Example in document workflows:**
Your AI workflow extracts data from weekly reports. The report format changes (column order swapped, new section added).
Traditional workflow: Breaks (hardcoded to expect columns in a specific order).
Self-healing workflow: AI recognizes "This column is still 'Revenue' even though it moved" and adapts. Pass.

**AI testing adoption (2025–2026):**

- **81% of development teams** use AI in their testing workflows (2025).
- **72.8% of experienced testers** selected AI-powered testing and autonomous test generation as their top priority for 2026.

**Key trends:**

1. **Self-healing automation:** Reduces test maintenance overhead by adapting to minor UI changes without requiring manual updates.
2. **Autonomous test generation:** AI generates test cases based on requirements or user behavior.
3. **Intelligent regression testing:** AI identifies which tests are most likely to catch regressions (prioritizes high-risk areas).

**Paired practice that solves it:**
For any AI workflow you plan to run repeatedly (weekly reports, monthly summaries, automated responses), write 3–5 eval tests:
1. One **format check** (does output match expected structure?)
2. One **quality check** (is the content accurate/relevant?)
3. One **edge case check** (does it handle unusual inputs gracefully?)

Run these evals every time the workflow runs. If evals fail, investigate before shipping the output.

---

## Part 3: Summary Table (Gaps Filled)

| Topic | Type | Key Insight | Paired Practice |
|-------|------|-------------|-----------------|
| **Sharing credentials with AI** | Pitfall | 77% of employees leak data; Samsung lost proprietary code to ChatGPT | Use enterprise accounts with SSO, DLP, workspace isolation |
| **Too prescriptive on non-deterministic tasks** | Pitfall | Rigid prompts kill creativity; vague prompts waste time | Ask: One right answer? Be specific. Multiple answers? Focus on intent. |
| **Hitting rate limits** | Pitfall | Claude Pro: ~45 msg/5h; common mistakes burn quota fast | Monitor status line; compact when cache <30%; switch models |
| **One-session implementation (context rot)** | Pitfall | Long sessions degrade as context fills with noise | Start fresh session every ~15 messages or new subtask |
| **Stale data as source of truth** | Pitfall | Models don't auto-update; Claude 4.7 cutoff: Jan 2026 | Use RAG, real-time search, or provide current docs yourself |
| **Over-engineering** | Pitfall | AI is overkill for deterministic, repeatable tasks | Ask: One correct answer + exact repeatability? Use script, not AI. |
| **Don't reinvent the wheel** | Best Practice | 10,000+ MCP servers, 4,200+ Claude Skills available | Search registries before building custom solutions |
| **Foundation first, then application** | Best Practice | Mental models (Librarian, Weighted Die, Scratch Pad) prevent trial-and-error | Spend 2–3h learning how LLMs work before diving into tools |
| **Goal-driven approach** | Best Practice | 2026 shift: outcome-focused > tool-focused | Define outcome + constraint + AI role + success metrics first |
| **Human-in-the-loop** | Best Practice | Anthropic 2026: plan-level approval > step-level | Gate high-impact actions; auto-allow low-risk; escalate when uncertain |
| **Build skills over tools** | Best Practice | 56% wage premium for AI-skilled workers; skills are portable | Document workflows as reusable Skills/SOPs/templates |
| **Context monitoring (status line)** | Best Practice | Cache <30% = wasting tokens; used >70% = context rot risk | Glance at status every 10–15 messages; compact or clear as needed |
| **Subagent offloading** | Best Practice | Delegate exploration to subagents; keep main context lean | Use subagents for research/search; main session for synthesis |
| **Automation testing + self-healing** | Best Practice | 81% of teams use AI in testing; self-healing reduces maintenance | Write 3–5 evals per workflow; run on every execution |

---

## Part 4: Sources & Citations

### Pitfall Research Sources

**Sharing Credentials / Sensitive Data:**
- [Incident 768: ChatGPT Implicated in Samsung Data Leak](https://incidentdatabase.ai/cite/768/)
- [Samsung workers accidentally leak confidential data via ChatGPT](https://www.privacy.com.sg/resources/samsung-workers-accidentally-leak-confidential-data/)
- [ChatGPT Data Leaks and Security Incidents (2023-2026): A Comprehensive Overview](https://wald.ai/blog/chatgpt-data-leaks-and-security-incidents-20232024-a-comprehensive-overview)
- [77% of Employees Leak Data via ChatGPT, Report Finds](https://www.esecurityplanet.com/news/shadow-ai-chatgpt-dlp/)
- [Protect your enterprise from shadow AI: Microsoft RSAC 2026](https://blogs.windows.com/msedgedev/2026/03/23/protect-your-enterprise-from-shadow-ai-and-more-announcements-at-rsac-2026/)
- [Privacy-Aware RAG: How to Stop Sensitive Data Leaks in AI (2026 Guide)](https://brics-econ.org/privacy-aware-rag-how-to-stop-sensitive-data-leaks-in-ai-2026-guide)
- [Enterprise AI Agents with SSO, Compliance & Security Features](https://www.mindstudio.ai/blog/enterprise-ai-agents-sso-compliance-security)

**Deterministic vs Non-Deterministic:**
- [Not All AI Agent Use Cases Are Created Equal: When to Script, When to Set Free](https://www.salesforce.com/blog/deterministic-ai/)
- [Deterministic AI: What it is and when to use it](https://zapier.com/blog/deterministic-ai/)
- [What Is Deterministic AI? Benefits, Limits & Use Cases](https://www.kubiya.ai/blog/what-is-deterministic-ai)
- [From Prompt to Pipeline: Engineering Deterministic Outputs from Non-Deterministic AI Models](https://medium.com/@CreativeBitsAI/from-prompt-to-pipeline-engineering-deterministic-outputs-from-non-deterministic-ai-models-75c48251a2a1)

**Rate Limits:**
- [Claude Max Plan Explained: Pricing, Limits & Features](https://intuitionlabs.ai/articles/claude-max-plan-pricing-usage-limits)
- [How do usage and length limits work? | Claude Help Center](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)
- [Claude Code Rate Limits Explained 2026 | Developer Guide](https://www.sitepoint.com/claude-code-rate-limits-explained/)
- [How to stop hitting Claude usage limits](https://ruben.substack.com/p/how-to-stop-hitting-claude-usage)
- [Claude AI Message Limit: Free vs Pro Caps + How to Maximize Usage (2026)](https://aionx.co/claude-ai-reviews/claude-ai-message-limit/)

**Context Rot:**
- [Context Rot: Why AI Gets Worse the Longer You Chat (And How to Fix It)](https://www.producttalk.org/context-rot/)
- [What Is Context Rot? Why Long AI Coding Sessions Produce Worse Results](https://www.mindstudio.ai/blog/what-is-context-rot-ai-coding)
- [Context Window Management: Strategies for Long-Context AI Agents and Chatbots](https://www.getmaxim.ai/articles/context-window-management-strategies-for-long-context-ai-agents-and-chatbots/)
- [Best practices for cost-efficient, high-quality context management in long AI chats](https://community.openai.com/t/best-practices-for-cost-efficient-high-quality-context-management-in-long-ai-chats/1373996)

**Stale Data / Knowledge Cutoffs:**
- [AI Knowledge Cutoff Dates: Every Major LLM Updated (2026)](https://www.temso.ai/blog/ai-knowledge-cutoff-dates-every-major-llm-updated-for-2026)
- [RAG in 2026: Bridging Knowledge and Generative AI](https://squirro.com/squirro-blog/state-of-rag-genai)
- [The 2025 Guide to Retrieval-Augmented Generation (RAG)](https://www.edenai.co/post/the-2025-guide-to-retrieval-augmented-generation-rag)
- [Models overview - Claude API Docs](https://platform.claude.com/docs/en/about-claude/models/overview)

**Over-Engineering:**
- [When NOT to use AI in Engineering](https://engineers.tools/articles/when-not-to-use-ai-in-engineering/)
- [Stop Wasting Time on AI: When Deterministic Tools Solve Problems Faster & Better](https://www.christopherspenn.com/2025/11/stop-wasting-time-on-ai-when-deterministic-tools-solve-problems-faster-better/)
- [AI Agents and Deterministic Workflows: A Spectrum, Not a Binary Choice](https://www.deepset.ai/blog/ai-agents-and-deterministic-workflows-a-spectrum)

### Best Practice Research Sources

**Don't Reinvent the Wheel:**
- [Claude Code Skills Ecosystem: The Complete 2026 Guide](https://getbeam.dev/blog/claude-code-skills-ecosystem-guide.html)
- [Claude AI MCP Servers: The Complete Setup Guide for 2026](https://gaugr.app/en/blog/claude-mcp-servers-complete-setup-guide)
- [Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
- [Claude Code Plugins | Skills, MCP Servers & Marketplace Directory](https://claudemarketplaces.com/)

**Foundation First:**
- [How LLMs Actually Work: Three Mental Models for Clarity of Thought](https://medium.com/@fzaidi2014/how-llms-actually-work-three-mental-models-that-change-everything-85c84085ea40)
- [Generative AI Roadmap 2026: Learn LLMs, Diffusion Models & AI Agents](https://www.scaler.com/blog/generative-ai-roadmap/)
- [Foundation Models vs LLMs From Beginner to Advanced](https://medium.com/@priyaskulkarni/foundation-models-vs-llms-from-beginner-to-advanced-with-real-world-examples-f282fc3d0677)

**Goal-Driven Approach:**
- [2026 AI Business Predictions: PwC](https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-predictions.html)
- [AI Reality Check: 2025 Adoption vs 2026 Enterprise Transformation](https://www.lowtouch.ai/ai-adoption-2025-vs-2026/)
- [The patterns shaping AI adoption in 2026](https://www.insightpartners.com/ideas/ai-adoption-2026/)

**Human-in-the-Loop:**
- [Inside Claude Code Auto Mode: Anthropic's Autonomous Coding System with Human Approval Gates](https://www.infoq.com/news/2026/05/anthropic-claude-code-auto-mode/)
- [Anthropic's 2026 Agentic Coding Report: Orchestration Era](https://www.contextstudios.ai/blog/anthropics-2026-agentic-coding-report-orchestration-era)
- [Why AI still needs you: Exploring Human-in-the-Loop systems](https://workos.com/blog/why-ai-still-needs-you-exploring-human-in-the-loop-systems)

**Build Skills Over Tools:**
- [Claude Skills vs Gemini Gems vs ChatGPT GPTs: Which One Wins?](https://findskill.ai/blog/claude-skills-vs-gemini-gems-vs-chatgpt-gpts/)
- [Understanding AI Workspace Features: Claude Projects, ChatGPT Custom GPTs, and Gemini Gems](https://zimanaanalytics.medium.com/understanding-ai-workspace-features-claude-projects-chatgpt-custom-gpts-and-gemini-gems-8fe4991bd7cb)
- [Claude Features 2026: Projects, Artifacts, Memory, Computer Use, Skills, MCP](https://suprmind.ai/hub/claude/features/)

**Context Monitoring:**
- [Customize your status line - Claude Code Docs](https://code.claude.com/docs/en/statusline)
- [Claude Code token usage: per-session token consumption tracker with cache hit rate](https://agentsroom.dev/features/claude-code-token-usage)
- [Building a Custom Claude Code Statusline to Track Worktrees and Usage](https://www.dandoescode.com/blog/claude-code-custom-statusline)

**Subagent Offloading:**
- [Claude Code Subagents: The Complete Guide to AI Agent Delegation](https://medium.com/@sathishkraju/claude-code-subagents-the-complete-guide-to-ai-agent-delegation-d0a9aba419d0)
- [Subagents: How Delegating Work Solves the Context Window Problem](https://selfservicebi.co.uk/series/context-window-optimization/subagents-how-delegating-work-solves-the-context-window-problem/)
- [Subquadratic launches with $29M to bring 12M-token context windows to AI](https://siliconangle.com/2026/05/05/subquadratic-launches-29m-bring-12m-token-context-windows-ai/)

**Automation Testing + Self-Healing:**
- [QA Automation Trends 2026: Statistics, AI, and Future of Testing](https://quashbugs.com/blog/state-of-qa-automation-2026-report)
- [AI Agent Testing Automation: Developer Workflows for 2026](https://www.sitepoint.com/ai-agent-testing-automation-developer-workflows-for-2026/)
- [Why AI-Augmented Software Testing is the Future of QA (2026 Guide)](https://www.testdevlab.com/blog/ai-augmented-software-testing-future-of-qa)
- [12 BEST AI Test Automation Tools for 2026](https://testguild.com/7-innovative-ai-test-automation-tools-future-third-wave/)

---

## End Notes

This research document fills the gaps identified in the existing Section H materials by providing:
- **Concrete incidents** (Samsung ChatGPT leak, CISA gov doc upload, rate limit burnouts)
- **Plain-language explanations** (no jargon without definition)
- **Real-world costs** (77% employee data leakage, 34.8% sensitive data in inputs)
- **Mitigation patterns** (SSO, DLP, redaction, RAG, eval-driven workflows, subagents)
- **2026-current data** (Claude 4.7 cutoff Jan 2026, 10K+ MCP servers, 81% AI testing adoption)

All examples avoid mining-specific content and use universal knowledge-work scenarios, per the body-slide conventions for Sections B–H.

**Knowledge date:** 2026-05-11
