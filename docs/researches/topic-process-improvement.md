# Process Improvement Framework: BPA / RPA / IPA / APA

Research compiled for Berau Coal Energy (BCE) AI Workshop | 400 mining-industry employees | May 2026

---

## 1. Executive Summary

- **BPA (Business Process Automation)** integrates systems and workflows end-to-end using APIs, rules engines, and orchestration—pre-AI roots, best for multi-department, deterministic processes with predictable steps (e.g., employee onboarding, procure-to-pay).

- **RPA (Robotic Process Automation)** mimics human clicks/keystrokes on legacy systems using software bots—handles structured, repetitive, rule-based tasks at scale with 0 system changes (e.g., data entry, report generation, form processing); global market $13.86B in 2023, growing 17.1% CAGR.

- **IPA (Intelligent Process Automation)** layers AI/ML, natural language processing (NLP), and computer vision onto RPA and BPA—unlocks unstructured data handling, autonomous decision-making, and continuous learning (e.g., contract intelligence, document classification, anomaly detection); IPA market $17.71B in 2026, projected $58.29B by 2035.

- **APA (Agentic Process Automation)** represents 2026's evolution: autonomous agents that plan, adapt, and collaborate across multi-step workflows without rigid rules—context-aware, self-improving, and business-outcome-focused (vs. task-focused). Real example: Dutch insurance firm achieved 91% claims automation, 46% faster processing, 9% higher satisfaction.

- **Decision principle:** Automate broken processes *after* fixing them. 73% of failed automation projects tried to speed up already-broken workflows. Measure impact, build small, document thoroughly, manage change with affected staff.

---

## 2. Plain-Language Definitions

### BPA (Business Process Automation)
**What it is:** Connecting different computer systems and workflows so information flows automatically from one place to another, with preset decision rules ("if order total > $10K, escalate to manager"). Think of it as wiring up your mine's systems so payment requests auto-route to the right approver, or safety reports auto-file to compliance.

**When you use it:** Large, cross-department workflows with predictable steps, many systems, lots of handoffs. No special AI needed—just "if this, then that" logic and system integration.

**Example:** Employee onboarding—new hire created in HR system → automatically create credentials in email → update payroll → send welcome kit → enroll in training. All without manual copy-paste.

---

### RPA (Robotic Process Automation)
**What it is:** A software bot that sits on your computer and mimics what a human would do: open an email, log into a system, copy data from column A to column B, submit a form, copy/paste into a spreadsheet. No system rewiring needed; bots work with the existing screens you see every day.

**When you use it:** Repetitive, structured tasks on systems you can't (or don't want to) rebuild. High-volume, low-thinking-required work—the kind of task where a human spends 3 hours a day but could be done 10x faster if rules were clear.

**Example:** Weekly inventory report: bot logs into the warehouse database, extracts fuel-consumption data for each shift, formats into Excel, emails to operations manager. Saves 4 hours/week.

---

### IPA (Intelligent Process Automation)
**What it is:** RPA + AI. The bot can now read messy, handwritten documents (computer vision), understand what a contract *means* (NLP), spot unusual patterns (machine learning), and make judgment calls without calling a human. It learns from mistakes and improves over time.

**When you use it:** Workflows with lots of variation, unstructured data (PDFs, emails, images), or decisions that need some "smarts"—not just rules. Complex enough that hardcoding every edge case would take months.

**Example:** HSE incident report review: bot reads submitted reports (handwritten photos), extracts safety incident details (NLP), checks against historical patterns to flag similar past incidents (ML), auto-assigns severity level (decision), routes to appropriate safety officer. Learns from corrections to improve accuracy.

---

### APA (Agentic Process Automation) — 2026 Frontier
**What it is:** An autonomous agent that understands your overall business goal (e.g., "ensure all mining equipment undergoes preventive maintenance within SLAs") and plans its own workflow to achieve it—requesting info when needed, adapting to change, collaborating with other agents, improving continuously.

**When you use it:** High-complexity, dynamic processes where rules change often or decisions depend on multiple, unpredictable factors. Long-running workflows that span days or weeks.

**Example:** Fleet maintenance orchestration: agent receives equipment sensor alerts, checks maintenance history, consults spare-parts inventory, coordinates with shift schedules, books technician time, orders parts if needed, tracks execution, adapts if technician unavailable. Autonomously achieves "zero unplanned downtime" goal.

---

## 3. Comparison Table: BPA vs RPA vs IPA vs APA

| **Dimension** | **BPA** | **RPA** | **IPA** | **APA** |
|---|---|---|---|---|
| **Technology** | APIs, rules engines, workflow orchestration | Software bots, screen automation | RPA + AI/ML, NLP, computer vision | LLM-based agents, multi-agent orchestration |
| **Data Type** | Structured (ERP records, forms) | Structured (typed fields, databases) | Structured + unstructured (PDFs, emails, images, handwriting) | Any data type, multi-modal |
| **Decision Making** | Fixed rules ("if X > 100, do Y") | Fixed rules only | Rules + learned patterns (ML); some judgment | Context-aware, adaptive, autonomous planning |
| **Learning** | None | None | Improves from feedback, self-corrects | Continuous learning, goal-adaptive |
| **Complexity Suitable For** | Multi-step deterministic processes | High-volume, simple repetitive tasks | Variable processes with judgment calls | Dynamic, long-running, multi-agent workflows |
| **Implementation Time** | Weeks–months (requires system integration) | Days–weeks (minimal system changes) | Weeks–months (data labeling, model training) | Weeks–months (prompt engineering, agent design) |
| **Cost (Setup)** | Moderate–High | Low–Moderate | High (requires data science) | High (LLM APIs, orchestration infrastructure) |
| **Cost (Ongoing)** | Moderate (integration maintenance) | Low–Moderate (bot updates) | Moderate–High (model retraining, feedback loops) | Moderate–High (API costs, agent tuning) |
| **Example Use Case** | Procure-to-pay, employee onboarding, travel request workflow | Weekly reporting, form processing, copy-paste elimination | Contract intelligence, invoice OCR, anomaly detection, incident classification | Fleet maintenance orchestration, supply chain optimization, HSE incident response coordination |
| **Typical ROI** | 20–40% cost reduction | 30–50% time savings on repetitive tasks | 40–60% cost reduction on knowledge work | 50–70% process outcome improvement (vs just speed) |

---

## 4. Decision Framework: When to Use Which

### Step 1: Assess Your Current Process
- **Does the process work well today?**
  - **YES** → Go to Step 2  
  - **NO** → **STOP.** Fix the process first before automating. Automating a broken process just makes it fail faster at scale. (73% of failed automation projects did this.)

### Step 2: Characterize the Work
- **Data Type?**
  - Structured (database records, typed forms) + Deterministic (same steps every time) → **Use BPA or RPA**
  - Mix of structured + some unstructured (occasional PDFs, emails) → **Use RPA or IPA**
  - Heavy unstructured (lots of handwritten docs, images, emails), requires judgment → **Use IPA or APA**

- **Volume?**
  - High-volume, simple repetition (100s per day, low thinking) → **Use RPA**
  - Medium volume, some variation → **Use BPA or IPA**
  - Low volume, high complexity → **Use IPA or APA**

- **Frequency of change?**
  - Rules are stable, rarely change → **Use BPA or RPA**
  - Rules evolve, new edge cases emerge → **Use IPA or APA**

### Step 3: Check Your Systems
- **Can we change the underlying systems?**
  - YES, we can integrate/rebuild → **Use BPA** (best investment, most efficient)
  - NO, we're stuck with legacy screens → **Use RPA** (works on top of existing UI)

### Step 4: Evaluate Complexity & ROI
- **Process has clear, consistent rules?**
  - YES → **RPA or BPA**
  - NO, lots of judgment calls → **IPA or APA**

- **Need autonomous, adaptive behavior?**
  - Multi-step, long-running, decisions depend on real-time data → **APA**
  - Tactical, predictable scope → **RPA, BPA, or IPA**

### Quick Selection Flowchart

```
START: Does process work today?
  ├─ NO → FIX IT FIRST (don't automate broken processes)
  └─ YES
      ├─ Structured data + Deterministic?
      │   ├─ YES
      │   │   ├─ Can we rebuild systems? → YES = BPA | NO = RPA
      │   │   └─ High volume? → YES = RPA | NO = BPA
      │   └─ NO → Continue below
      │
      └─ Mix of structured + unstructured data?
          ├─ YES, but some judgment
          │   └─ → IPA (layering AI onto RPA)
          └─ YES, high judgment + dynamic
              └─ → APA (autonomous agent)
```

---

## 5. Mining-Relevant Examples

### Example 1: Fleet Maintenance Scheduling (RPA→IPA)
**Challenge:** Maintenance teams manually check equipment sensor logs, cross-reference maintenance schedules, email shift supervisors to book downtime, update spreadsheets.  
**RPA Solution:** Bot logs into fleet management system weekly, extracts overdue maintenance, generates email to supervisor, updates master maintenance log. Saves 6–8 hrs/week.  
**IPA Evolution:** Bot reads sensor telemetry (vibration, pressure, temperature), applies ML model trained on historical breakdowns, predicts failures 2 weeks in advance, auto-books maintenance during low-production windows, notifies parts procurement to pre-order items. Reduces unplanned downtime by 35–40%.

**Source:** Mining fleet management systems integrate GPS, telemetry, and predictive maintenance (Hexagon, Sicuro Technology, others). Detected rising vibration in haul truck wheel motors enables preventive intervention vs. mid-haul breakdown.

---

### Example 2: HSE Compliance Reporting (RPA→IPA)
**Challenge:** Safety incidents reported on paper forms or in emails, manually reviewed, categorized, and logged into compliance database. Takes 3–5 days per incident.  
**RPA Solution:** Bot captures email attachments (incident reports), extracts key fields (date, location, injury type), inputs into compliance database. Cuts entry time from 2 hrs to 5 mins per incident.  
**IPA Evolution:** Bot reads handwritten or photo-based reports, uses computer vision to extract details, applies NLP to classify incident severity and root cause, checks against historical incidents to identify patterns (e.g., recurring hazards in certain areas), auto-flags for senior safety officer review. Enables predictive safety interventions.

**Source:** Mining HSE solutions now integrate geofencing, driver monitoring, fatigue detection, and automated safety alerts; process mining reveals procedural deviations and supports root cause analysis.

---

### Example 3: Contract & Supplier Management (IPA)
**Challenge:** Mining contracts for equipment, fuel supply, and logistics are reviewed manually by procurement. Legal reviews for compliance clauses. Takes 5–7 days per contract.  
**IPA Solution:** Bot reads contract PDF, extracts terms (price, delivery schedule, penalty clauses, insurance requirements), compares against company standards using ML classifier, flags deviations, generates summary for legal review. Reduces review time to 1 day.

**Source:** Pre-built RPA bots like "Contract & Agreement Document Extraction and Validation" quickly identify anomalies in signed contracts. Contract level changes (compensation, roles) are auto-detected and pro-rated in payroll.

---

### Example 4: Geology Data Extraction & Resource Estimation (IPA→APA)
**Challenge:** Geologists collect drill core samples, bore logs, and seismic survey data in mixed formats (PDFs, spreadsheets, proprietary software). Manual compilation into resource estimation models takes weeks per survey.  
**IPA Solution:** Bot ingests geological reports (PDFs, images of logs), extracts mineral composition and depth data via OCR + NLP, feeds into automated resource estimation model, generates map visualization and grade-tonnage projections. Cuts estimation time from 3 weeks to 3 days.  
**APA Evolution:** Agent continuously monitors incoming geological data, automatically rebalances resource estimates as new drill results arrive, optimizes mining plan to maximize ore grade and reduce waste, coordinates updates across production scheduling and financial forecasting systems.

**Source:** Coal mining software enables rapid geological data analysis, mine design optimization, and accurate scheduling. Intelligent coal mines integrate IoT, cloud computing, big data, and AI.

---

### Example 5: Payroll & HR Administration (RPA→IPA)
**Challenge:** Timesheets come from multiple sources (paper, mobile apps, mine systems), manually entered into payroll, cross-checked against policy. Errors common; takes 40+ hrs/month.  
**RPA Solution:** Bot pulls timesheets from all sources, validates against rules (no >12 hr shifts, no missing breaks), auto-enters into payroll system, flags exceptions for HR review. Saves 30 hrs/month.  
**IPA Evolution:** Bot reads timesheets, checks for anomalies (unusual patterns, fatigue risk), pulls contract data to apply correct pay scales and benefits, auto-calculates tax/deductions with local regulation compliance, flags employees approaching overtime thresholds for proactive scheduling adjustment, generates monthly summary for audit.

**Source:** Lenovo used UiPath to automate expense reimbursement, income-tax declaration, and payroll scheduling, increasing HR efficiency 5–8x. ManpowerGroup used UiPath to reduce candidate evaluation from 5–7 minutes to 1 minute per candidate.

---

### Example 6: Fuel & Inventory Tracking (RPA→IPA)
**Challenge:** Fuel consumption tracked across fleet, fuel station inventory managed separately, orders placed manually when stocks dip. Frequent stockouts; overstocking wastes cash.  
**RPA Solution:** Bot reads fuel gauge from fleet system daily, compares against inventory, auto-triggers purchase order when stock hits 20% threshold, updates fuel-cost spreadsheet. Reduces stock-out incidents.  
**IPA Evolution:** Bot ingests real-time fuel consumption from fleet telemetry + production schedules (e.g., upcoming ore-hauling surge), applies demand-forecasting ML model, optimizes delivery schedules to minimize holding costs + prevent stockouts, auto-adjusts thresholds based on supplier lead times and seasonal factors.

**Source:** Mining ERP systems integrate fuel management with telemetry and market analytics. Advanced platforms monitor fuel usage across fleets and can track carbon emissions (methane drainage, diesel consumption, coal production volumes for emissions calculation).

---

## 6. Pitfalls & Anti-Patterns

### **Critical Pitfall #1: Automating Broken Processes**
**Why it fails:** 73% of failed automation projects automated processes that were already broken.  
**Example:** A mining site's current geology data entry takes 3 weeks because geologists use 5 incompatible software systems. You automate the data-entry step, but it still takes 3 weeks because the underlying process is fragmented.  
**Fix:** **Map, measure, and fix the process FIRST.** Eliminate steps, consolidate systems, remove bottlenecks. Then automate the streamlined version. Automation amplifies; broken processes amplified are catastrophes.

---

### **Pitfall #2: Replicating Manual Process Delays**
**Why it fails:** Manual processes have built-in delays because humans are slow. When you automate, those delays become artifacts.  
**Example:** An approval workflow waits 24 hours between each level because that's how long it took managers to review paper forms. When automated, the RPA bot still waits 24 hours between approvals—defeating the purpose of automation.  
**Fix:** Re-engineer timing. A 5-step approval process should run in minutes if the system can move data instantly. Don't replicate human pacing in bots.

---

### **Pitfall #3: Lack of Process Understanding**
**Why it fails:** Automation fails because you didn't fully understand the process.  
**Example:** Fleet maintenance bot programmed to schedule maintenance every 500 operating hours. But 20% of equipment is used intermittently; the bot schedules them for maintenance on a calendar, not operating hours, causing downtime during critical ore-hauling windows.  
**Fix:** **Interview the people who do the work.** Map the process in detail, including exceptions and workarounds. Involve end users in design.

---

### **Pitfall #4: Inadequate Planning & Tool-First Approach**
**Why it fails:** Vendors push their tools; teams pick RPA platforms before understanding their problems.  
**Example:** "We bought UiPath!" then realize 60% of their processes are unstructured documents—RPA alone won't help; they need IPA.  
**Fix:** **Define your problem first.** Diagnose pain points, measure baseline, set clear ROI targets. *Then* choose the tool.

---

### **Pitfall #5: Poor Integration Planning**
**Why it fails:** You scope the target workflow in isolation, ignoring upstream/downstream dependencies.  
**Example:** You automate invoice processing, but 30% of invoices come from suppliers with non-standard formats. The bot chokes, and you have to manually override, defeating time savings.  
**Fix:** **Map dependencies.** Scope includes: where data comes from, all variations, downstream systems, error scenarios.

---

### **Pitfall #6: Insufficient Maintenance & Documentation**
**Why it fails:** Teams assume bots are "fire and forget." They're not. Systems change; bots break.  
**Example:** Your RPA bot stopped working because the supplier's invoice PDF format changed. The bot expected field A, B, C in order; the new format has them in a different order.  
**Fix:** **Plan for maintenance from day 1.** Assign a bot owner. Document logic. Set up monitoring/alerts for bot failures. Build change-control processes for system updates.

---

### **Pitfall #7: Weak Change Management**
**Why it fails:** Even perfect bots fail if people don't use them or resist them.  
**Example:** An automated payroll system is built, but HR staff keep entering data manually because they don't trust the bot or weren't trained on it.  
**Fix:** **Involve affected teams early.** Train them. Celebrate wins. Gather feedback and iterate. Automation is a partnership with people, not a replacement.

---

### **Pitfall #8: Overly Complex Initial Projects**
**Why it fails:** Trying to automate everything at once, including every edge case.  
**Example:** Attempt to build one mega-RPA bot for all HSE incident workflows—will handle handwritten reports, photos, emails, three different legacy systems, and live-chat incident reports. Takes 9 months, is brittle, and breaks when a new scenario appears.  
**Fix:** **Start small and expand.** Automate the 80% of routine cases first (2-week bot). Learn, refine, then add complexity.

---

### **Pitfall #9: No Measurement or Optimization**
**Why it fails:** You build the automation but never measure impact. You don't know if it's working.  
**Example:** Fleet maintenance bot deployed; you assume it saves time, but never measure actual downtime, maintenance costs, or production impact.  
**Fix:** **Set metrics from day 1.** Track: cost savings, time freed, error reduction, uptime improvement. Review monthly. Optimize based on data, not intuition.

---

### **Pitfall #10: Automating Without Clear Objectives**
**Why it fails:** Automation for automation's sake. No clear business goal.  
**Example:** You build an RPA bot because "everyone else is doing RPA," not because it solves a specific pain point. Result: a bot that saves 2 hours/week but cost $100k to build.  
**Fix:** **Start with the business problem.** What pain point? How much is it costing? What's the ROI threshold? Automation must answer a clear business question.

---

## 7. Market & Adoption Data (2026)

- **BPA:** 40% of enterprise applications will embed task-specific AI agents by end of 2026 (up from <5% in 2025). 30% of enterprises will automate >50% of network activities by 2026 (up from <10% in 2023).

- **RPA:** Global RPA service market $13.86B in 2023, growing 17.1% CAGR; projected $64.47B by 2032. UiPath leads with 35.8% market share, followed by Automation Anywhere and Microsoft Power Automate. Blue Prism (acquired by SS&C Technologies in 2022 for $1.6B) focuses on agentic automation.

- **IPA:** IPA market $14.4B in 2023, projected $42.12B by 2032. In 2026: $17.71B, growing to $58.29B by 2035 (12.65% CAGR).

- **APA:** Emerging market. Real-world win: Dutch insurance provider achieved 91% automation of eligible claims, 46% faster processing, 9% higher customer satisfaction using agentic agents.

- **ROI Reality:** 70–85% of automation projects fail. Only 26% deliver expected ROI. Organizations combining AI with BPA strategy see 20–30% operational cost reductions and 40% efficiency improvements (McKinsey).

---

## 8. Key Takeaways for BCE Mining Workshop

1. **Not all three are separate paths.** They stack: BPA (system integration) → RPA (bot layer) → IPA (AI layer) → APA (autonomous orchestration). Your mining operation may need different tools for different processes.

2. **Start with the business problem, not the tool.** Don't pick RPA because it's trendy. Pick it because you have 100+ repetitive, structured tasks costing significant time.

3. **Fix the process before automating.** Broken processes run faster when automated—they just fail faster. Invest in process reengineering first.

4. **Measure constantly.** Set baseline metrics before automation. Track ROI, cost, time, quality, and uptime. Optimize based on data.

5. **Plan for ongoing maintenance.** Bots need love. Assign owners, document logic, monitor for failures, adapt to system changes.

6. **Engage your people.** Automation isn't about replacing workers—it's about freeing them from tedious work so they can do higher-value tasks (maintenance technicians focus on complex repairs, not scheduling; safety officers focus on root-cause investigation, not data entry).

7. **2026 trend:** From "tool-first" (let's buy RPA software) to "outcome-first" (let's achieve zero unplanned downtime). Agentic automation (APA) is the frontier—autonomous agents orchestrating multi-step workflows toward business goals, not just executing predefined tasks.

---

## 9. Citations

### BPA Research
- [The Ultimate Guide to Business Process Automation (BPA)](https://kissflow.com/workflow/bpm/business-process-automation/)
- [Business Process Automation: Enterprise Strategy in 2026 | Elementum AI](https://www.elementum.ai/blog/business-process-automation-guide)
- [What is Business Process Automation (BPA)? [A 2026 Guide]](https://www.adopt.ai/blog/business-process-automation)
- [IBM: What Is Business Process Automation (BPA)?](https://www.ibm.com/think/topics/business-process-automation)
- [Asana: Business Process Automation Guide 2026](https://asana.com/resources/business-process-automation)

### RPA Research & Vendors
- [2026 Guide: Best RPA Tools and Why UiPath is #1 - Auxis](https://www.auxis.com/learn/rpa/top-rpa-tools/)
- [5 Best Robotic Process Automation (RPA) Software in 2026 | SS&C Blue Prism](https://www.blueprism.com/guides/robotic-process-automation-rpa/best-software/)
- [Gartner Magic Quadrant: Automation Anywhere, Microsoft, NICE, Blue Prism, UiPath Top RPA Providers](https://automationtoday.net/featuredarticles/automation-anywhere-microsoft-nice-ssc-blue-prism-and-uipath-top-gartner-list-of-rpa-providers/)
- [RPA Tools Comparison: UiPath vs BluePrism vs Automation Anywhere](https://www.signitysolutions.com/blog/rpa-tools-comparison)

### IPA Research
- [RPA, AI and Intelligent Process Automation](https://www.hyland.com/en/resources/terminology/robotic-process-automation/rpa-ai-intelligent-automation)
- [AI Algorithms in Intelligent Process Automation (2026 Guide) | Artsyl](https://www.artsyltech.com/blog/AI-Algorithms-in-Process-Automation)
- [What is Intelligent Process Automation (IPA)? | TechTarget Definition](https://www.techtarget.com/searchenterpriseai/definition/intelligent-process-automation-IPA)
- [Intelligent Process Automation: Beyond RPA](https://www.skan.ai/blogs/intelligent-process-automation-ipa-beyond-rpa-to-true-business-efficiency)
- [SS&C Blue Prism: Intelligent Process Automation](https://www.blueprism.com/resources/blog/intelligent-process-automation/)
- [Kissflow: Intelligent Process Automation Overview](https://kissflow.com/workflow/bpm/intelligent-process-automation/)

### APA (Agentic Process Automation) Research
- [RPA vs APA: Agentic process automation in 2026 | Beam AI](https://beam.ai/agentic-insights/from-rpa-to-apa-why-bots-alone-cant-keep-up-in-2026)
- [Why the Next Era of Agentic Automation Changes Everything | Beam AI](https://beam.ai/agentic-insights/ai-landscape-2026-why-the-era-of-agentic-automation-changes-everything)

### Comparison Frameworks
- [RPA vs BPA vs IPA: What's the Difference? - XB Software](https://xbsoftware.com/blog/rpa-vs-bpa-vs-ipa/)
- [Choosing IPA vs. RPA vs. BPA: Best Automation Guide | Rapid Innovation](https://www.rapidinnovation.io/post/how-to-pick-the-right-automation-ipa-vs-rpa-vs-bpa)
- [RPA vs. BPA vs. DPA: Compare process automation technologies | TechTarget](https://www.techtarget.com/searchcio/tip/Process-automation-technologies-evolve-RPA-vs-BPA-vs-DPA)
- [The differences between BPA, RPA and IPA | Zvolv](https://zvolv.com/the-differences-between-bpa-rpa-and-ipa/)
- [IPA vs. RPA vs. BPA: what is the right automation option for your company? | ITRex](https://itrexgroup.com/blog/ipa-vs-rpa-vs-bpa/)

### Mining Industry Applications
- [Fleet Management Systems In Mining: 7 Ways To Boost Efficiency](https://farmonaut.com/mining/fleet-management-systems-in-mining-7-ways-to-boost-efficiency)
- [Mine fleet management | Hexagon](https://hexagon.com/solutions/mine-fleet-management)
- [Mining Heavy Equipment Fleet Management: Complete Guide 2026](https://heavyvehicleinspection.com/blog/post/mining-heavy-equipment-fleet-management-complete-guide)
- [Safety and Security in Mining Fleet Management](https://www.realtimenetworks.com/blog/safety-and-security-in-mining-fleet-management)
- [Fleet management for mining | Sicuro Technology](https://sicurotechnology.com/blog/mining-fleet-management/)
- [Process Mining Digital Transformation Trends For The Mining Industry](https://farmonart.com/mining/process-mining-digital-transformation-trends-for-mining-2026)
- [Mining ERP Systems: Top 2025 Trends In Energy & Hydraulic](https://farmonaut.com/mining/mining-erp-systems-top-2025-trends-in-energy-hydraulic)
- [How are Coal Mining Industries Leveraging Real-Time Data? | Taabi](https://taabi.ai/blog/how-are-coal-mining-industries-leveraging-real-time-data)
- [Intelligent coal mine technology systems in China | Springer Nature](https://link.springer.com/article/10.1007/s40789-022-00491-3)
- [The 7 Best Mining Software of 2026 | SafetyCulture](https://safetyculture.com/apps/mining-software)

### HR & Payroll Automation
- [RPA and IPA Changes HR and Payroll Services](https://digitalworkforce.com/intelligent-automation-solutions/rpa-in-hr-and-payroll/)
- [12 Use Cases of RPA in HR You Can Start With](https://www.nalashaa.com/rpa-for-human-resources/)
- [RPA in Human Resources: Use Cases, Examples & Best Practices | iTRANSITION](https://www.itransition.com/rpa/hr)
- [Payroll Trends for 2025: How AI and Automation Are Reshaping the Industry | Corpay](https://www.corpay.com/resources/blog/payroll-trends-how-ai-and-automation-are-reshaping-the-industry)

### Automation Anti-Patterns & Pitfalls
- [Five Reasons Why Business Automation Initiatives Fail and How to Avoid Them | IBM](https://newsroom.ibm.com/Five-Reasons-Why-Business-Automation-Initiatives-Fail-and-How-to-Avoid-Them)
- [The #1 Reason Automation Projects Fail | Autonoly](https://www.autonoly.com/blog/6879c5f571d44a7c526efbd1/breaking-the-1-reason-automation-projects-fail-its-not-what-you-think)
- [7 Automation Pitfalls That Will Cost You Thousands | Go Rogue Ops](https://www.gorogueops.com/blog/automation-pitfalls-avoid-thousands)
- [Automation Mistakes: The Anti-Patterns Holding IT Back | Resolve](https://resolve.io/blog/top-automation-mistakes)
- [Avoiding the Automation Trap: 4 Reasons Projects Fail and How to Prevail](https://blog.rpathautomation.com/4-reasons-why-automations-fail)
- [Top 7 Pitfalls in Automation Projects and How to Avoid Them | Lydonia](https://lydonia.ai/top-7-pitfalls-in-automation-projects-and-how-to-avoid-them)
- [Why Automation Efforts Fail and How Process Intelligence Fixes It | Skan AI](https://www.skan.ai/blogs/top-ten-reasons-why-automation-efforts-fail-skan)
- [16 Common Challenges of Business Process Automation](https://www.lowcode.agency/blog/business-process-automation-challenges)
- [Automation Processes Gone Wrong: 11 Costly Mistakes and How to Avoid Them | Capacity](https://capacity.com/learn/intelligent-automation/automation-processes/)

---

**Document prepared for:** Berau Coal Energy AI Workshop (400 mining-industry employees)  
**Context:** 120-min animated HTML deck + 120-min practice lab on process automation, AI/ML, and agentic automation  
**Target audience proficiency:** Non-AI-native; seeking plain-language understanding of when/where automation applies to daily mining work  
**Last updated:** May 2026
