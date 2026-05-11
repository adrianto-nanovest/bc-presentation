# Common Pitfalls and Best Practices when Building with AI

## Pitfalls
- Vibe coding, over-reliance on AI (vague prompt, no adequate context, no review -> hallucination, poor results -> blame AI, lose trust)
- Building without strategy
- Share credentials or sensitive data
- Too prescriptive instructions on non-deterministic use cases (deterministic vs non-deterministic use cases, when to be prescriptive and when to be open-ended)
- Giving Agents Too Many Tools to Operate, no proper management, no progressive disclosure
- Big Idea / scope direct implementation (no design, no detail plan - start small)
- Easily reach session / weekly limits 
- One session implementation (work in AI dumb zone - no clear, no compact)
- Stale / incorrect data as source of truth, no update strategy
- Over-engienering (not knowing properly on AI strength, simple deterministic use case but use AI-based solution)

## Best Practices
- Sharpen the axe philosophy + GIGO principle (Garbage In, Garbage Out). The better the input, the better the output. This applies to both the data fed into AI models and the prompts used to elicit responses. Investing time in crafting high-quality prompts and curating relevant data can significantly enhance the performance of AI systems.
- Experiment and Iterate
- Don't re-invent the wheel, leverage existing resources and tools, and build on top of them. The AI ecosystem is rapidly evolving, and there are many pre-trained models, libraries, and frameworks available that can accelerate development and improve results. Stay updated
- Foundation first, then application. Focus on building a strong foundation of understanding the underlying principles and techniques of AI before diving into specific applications. This will enable you to adapt and innovate more effectively as the field evolves.
- Goal driven approach. Start with a clear understanding of the problem you want to solve or the outcome you want to achieve, and then work backwards to determine how AI can help you get there. This will ensure that your efforts are focused and aligned with your objectives.
- Human in the loop
- Build skills over tools, re-usable domain expertise, use AI platform as tools, shareable.
- Context & Session Management
- Context Monitoring (status line)
- Context & Subagent Offloading
- Automation testing, self-healing mechanism

Dispatch explore agents to do web research on both
