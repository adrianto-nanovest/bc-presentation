# Emerging Concepts: Placement Decision Report
**Date:** 2026-05-11  
**For:** Workshop Section F (Techniques) vs. Section G (Tools Ecosystem)  
**Audience:** 400 non-engineer mining-industry attendees

---

## 1. Agentic OS / Command Center

**Plain-language description:**  
A management dashboard that treats AI agents like workers—you tell it what goal you want achieved, it routes the request to the right agent or skill, and shows you progress on a Kanban board. No terminal windows or agent juggling needed.

**Tool or technique/pattern?**  
**PATTERN.** This is a transferable architectural approach (goal-based routing, status dashboarding, multi-agent coordination) that applies to any multi-agent system. The pattern exists independently of specific products (MindStudio's Command Center, PwC's Agent OS, or open-source AIOS all follow the same pattern).

**Recommended placement:**  
**Section F (Techniques).** This is core AI orchestration knowledge for enterprise teams managing multiple agents. Mining company attendees who deploy agents internally will recognize the value. Concrete analogy: "like a mine shift supervisor (agent OS) routing work orders to different crews (agents) based on what needs doing, not which crew is available."

**Authoritative sources:**
- [What Is the Agentic OS Command Center? MindStudio](https://www.mindstudio.ai/blog/agentic-os-command-center-manage-agents-by-goals)
- [The Rise of Agentic Operating Systems | Medium](https://medium.com/@abhinav.dobhal/the-rise-of-agentic-operating-systems-0de233dbc1e9)

---

## 2. openClaw

**Plain-language description:**  
An open-source personal automation framework that connects Claude (or other AI agents) to your messaging apps (Discord, Telegram, WhatsApp) so you can message an agent from your phone and have it execute tasks (write code, manage workflows, respond to events).

**Tool or technique/pattern?**  
**TOOL (specific product).** OpenClaw is a concrete, open-source software implementation released by Peter Steinberger in November 2025. There is no transferable architectural pattern here—it's a framework you run or don't run. Related projects (ClaudeClaw, OpenHarness, Claw Code) are competing implementations of the same idea.

**Recommended placement:**  
**Section G (Tools Ecosystem).** OpenClaw is too specific and infrastructure-focused for a non-engineer audience. The 2026 context (Anthropic's API pricing conflict, fragmentation between Claude Code Channels and third-party harnesses) makes this feel like beta-era tooling fragmentation, not a stable pattern mining teams should understand. **Consider skipping entirely**—the value prop is "access agents on your phone," which mining ops can grasp, but the competitive/licensing muddle would confuse attendees.

**Authoritative sources:**
- [GitHub - moazbuilds/claudeclaw](https://github.com/moazbuilds/claudeclaw)
- [Anthropic just shipped an OpenClaw killer called Claude Code Channels | VentureBeat](https://venturebeat.com/orchestration/anthropic-just-shipped-an-openclaw-killer-called-claude-code-channels/)

---

## 3. Hermes Agent

**Plain-language description:**  
An open-source autonomous agent (released February 2026 by Nous Research) that lives on your server, remembers what it learns, improves its own skills over time, and connects to Telegram, Discord, Slack, WhatsApp, and CLI. Self-improving agent with persistent memory.

**Tool or technique/pattern?**  
**TOOL (specific framework).** Hermes Agent is a concrete, open-source implementation. The *technique* underneath (persistent memory, skill self-improvement) is generalizable, but Hermes is the product you'd use to implement it. It's not a pattern you'd teach; it's a tool you'd evaluate.

**Recommended placement:**  
**Section G (Tools Ecosystem) — or skip.** Hermes is pitched as production-ready but sits at ~105k GitHub stars after 7 weeks (viral but not stable). Hermes documentation itself flags: "For customer-facing or compliance-sensitive processes, conduct a security review first" and recommends enterprises stick with SAP Joule or Microsoft Copilot Studio for critical workflows. For a mining audience, the interesting *pattern* (persistent memory + self-improving skills) is worth mentioning in Section F as a future technique, but Hermes the product is too bleeding-edge and framework-specific to justify booth time.

**Authoritative sources:**
- [GitHub - NousResearch/hermes-agent](https://github.com/nousresearch/hermes-agent)
- [Hermes Agent 2026: First Production-Ready Self-Improving Open-Source AI Agent | Innobu](https://www.innobu.com/en/articles/hermes-agent-self-improvement-open-source-2026.html)

---

## 4. LLMs Wiki / Second Brain Pattern

**Plain-language description:**  
Instead of dumping documents into a retriever (RAG) and asking an LLM to rediscover facts from scratch on every query, you maintain a persistent, interconnected wiki of structured notes that the LLM builds and refines over time. Knowledge compounds; each interaction enriches the wiki.

**Tool or technique/pattern?**  
**PATTERN (transferable technique).** This is a conceptual shift from retrieval-based RAG to knowledge-accumulation-based systems. The pattern is implementation-agnostic (works with Obsidian + Claude Code, Notion, specialized tools like Kompl or SwarmVault). Andrej Karpathy's May 2026 GitHub Gist catalyzed the term, but the idea is about *how you structure and maintain knowledge*, not which tool you use.

**Recommended placement:**  
**Section F (Techniques).** This is a crucial RAG evolution for enterprise audiences. It directly contrasts with the retrieval mindset most attendees are familiar with ("upload PDFs, search for answers"). Mining teams managing large operational knowledge bases (safety procedures, equipment manuals, ore-processing specs) will immediately see the value: "Build a living manual that gets smarter as we use it, instead of searching old files." This is more tangible than OpenClaw and more applicable than Hermes.

**2026 evolution to flag:**  
The ecosystem fractured rapidly (llm-wiki-cli, Kompl, SwarmVault, Aura, ΩmegaWiki, Link all implement variants). The canonical difference from RAG is now well-established. In workshop context, just emphasize: "Wiki/knowledge-graph pattern beats static RAG for knowledge that grows with your business."

**Authoritative sources:**
- [Why Andrej Karpathy's "LLM Wiki" is the Future of Personal Knowledge | Medium, Apr 2026](https://evoailabs.medium.com/why-andrej-karpathys-llm-wiki-is-the-future-of-personal-knowledge-7ac398383772)
- [Beyond RAG: How Andrej Karpathy's LLM Wiki Pattern Builds Knowledge That Actually Compounds | Level Up Coding, Apr 2026](https://levelup.gitconnected.com/beyond-rag-how-andrej-karpathys-llm-wiki-pattern-builds-knowledge-that-actually-compounded-31a08528665e)

---

## Summary: Placement Recommendations

| Concept | Type | Section F | Section G | Skip? | Confidence |\n|---------|------|-----------|-----------|-------|------------|\n| **Agentic OS / Command Center** | Pattern | **YES** | — | — | High |\n| **openClaw** | Tool | — | Maybe | **LIKELY** | High |\n| **Hermes Agent** | Tool | — | Maybe | **LIKELY** | High |\n| **LLM Wiki / Second Brain** | Pattern | **YES** | — | — | High |\n\n**Net:** Include Agentic OS and LLM Wiki in Section F (techniques). These are pattern-level concepts that unlock how a non-engineer audience thinks about multi-agent systems and knowledge management. Defer or skip OpenClaw and Hermes Agent—too tool-specific, rapidly evolving, and infrastructure-heavy for mining ops without deep DevOps experience.\n