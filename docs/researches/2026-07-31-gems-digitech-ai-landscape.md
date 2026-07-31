# PT Golden Energy Mines (GEMS) DigiTech AI and Digital-Systems Landscape

**Research date:** 2026-07-31  
**Company:** PT Golden Energy Mines Tbk (GEMS), identified on its corporate site as part of the Sinar Mas Mining group ([GEMS corporate site](https://www.goldenenergymines.com/))  
**Purpose:** Verify and enrich the internal claims in `docs/prompts/gems-catalyst.md` using public sources.

## Executive summary

Public evidence confirms that GEMS has a substantial in-house DigiTech portfolio spanning pit-to-port operations and back-office processes. GEMS says DigiTech was established in 2020; its public landing page reports 50+ digital solutions, 4,000+ users, and 5+ awards. Google Cloud independently hosts a customer story describing roughly 50 application portfolios and 4,000+ users, which broadly corroborates the scale claims. GEMS' 2024 Annual Report says DigiTech develops AI-based systems across production, Run-of-Mine stockpiles, hauling, port loading and shipping, HSE, general affairs, and finance. ([GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/); [Google Cloud customer story](https://cloud.google.com/customers/gems); [GEMS 2024 Annual Report, pp. 68-70](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf))

The internal brief is directionally right about GEMVIS, SiCantik, WIM, FAMOUS, and Usign, but several architecture and product-boundary details need correction:

| Internal claim | Public-evidence verdict | Required correction or qualification |
|---|---|---|
| Databricks is GEMS' data/document aggregation layer with an embedded chatbot | **Unverified** | No located GEMS, Google Cloud, or Databricks source names Databricks in GEMS' stack. Databricks has the generic technical capability to ingest documents and support retrieval/agent applications, but that does not verify GEMS adoption. ([Databricks platform scope](https://docs.databricks.com/gcp/en/lakehouse-architecture/scope); [Databricks AI Search](https://docs.databricks.com/gcp/en/ai-search/ai-search); [Google Cloud customer story](https://cloud.google.com/customers/gems)) |
| GEMVIS is an omnichannel AI platform embedded in internal apps, running on Google Cloud, with a future agentic roadmap and Databricks connection | **Partly confirmed; materially outdated** | Omnichannel embedding and Google Cloud use are confirmed. GEMVIS is already described publicly as a hierarchical multi-agent system, not merely a future agentic plan. Its public architecture is hybrid: private on-premises GPU servers handle sensitive-data RAG, while Google Cloud/Gemini handles higher-level reasoning and cloud infrastructure. WhatsApp, Slack, and Databricks are not publicly named. ([Google Cloud customer story](https://cloud.google.com/customers/gems)) |
| MirraX is a computer-vision mining-field monitoring and analysis system | **Unverified** | No located GEMS, Sinar Mas Mining, annual-report, sustainability-report, or credible media source mentions a GEMS system named MirraX. Do not use this claim publicly without an internal product owner/source. ([GEMS DigiTech catalogue](https://www.goldenenergymines.com/digitech/); [GEMS 2025 Annual Report](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf); [GEMS 2025 Sustainability Report](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf)) |
| SiCantik detects mining-vehicle violations and also measures WIM | **Partly confirmed, but conflates two products** | SiCantik is the AI analytical-CCTV platform. WIM is a separate moving-truck weighing system that itself uses scale sensors, RFID, IoT, computer vision, and monitoring towers. ([GEMS 2024 Annual Report, p. 70](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf); [GEMS 2025 Sustainability Report, p. 66](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf)) |
| FAMOUS combines computer vision and IoT to monitor vehicles and driver safety, violations, and fatigue | **Mostly confirmed** | Fleet/driver monitoring, IoT, real-time monitoring, safety, and fatigue-related use are supported. Public sources do not clearly attribute computer vision specifically to FAMOUS; GEMS instead explicitly attributes computer vision to SiCantik and WIM. ([GEMS FMS article, 2024-06-04](https://www.goldenenergymines.com/2024/06/04/digisast-01/); [ANTARA, 2025-09-12](https://www.antaranews.com/berita/5104145/gems-dorong-transformasi-digital-tambang-untuk-efisiensi-keberlanjutan); [GEMS 2024 Annual Report, p. 118](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf)) |
| Usign is a document-approval system with an AI chatbot over document contents | **Mostly confirmed, narrower than stated** | Usign is a cloud-based digital-signature and approval platform. GEMS' 2025 Annual Report confirms a GEMVIS AI chatbot assists document validation and approval, but does not say users can freely question the full document contents. ([GEMS 2025 Annual Report, p. 73](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf)) |

The most important architectural update is GEMVIS. Google Cloud now describes it as an operating multi-agent intelligence layer spanning 50 applications, with reported executive decision-speed improvement above 90% and multi-operational data retrieval reduced from two days to under one hour. Those figures are customer-story claims, not independently audited performance results. ([Google Cloud customer story](https://cloud.google.com/customers/gems))

## Evidence standard and source caveats

- **Confirmed** means a named system or capability appears in a first-party GEMS filing/page or in a technology-provider customer case based on GEMS' deployment.
- **Company/vendor-reported outcome** means the number is publicly stated by GEMS or its provider but was not independently audited in the located material.
- **Unverified** means the claim may be true internally, but no public source located in this research supports it. Absence from public sources is not proof that the system does not exist.
- The supplied `goldenenergymines.org/2025/07/22/digitech-article4/` URL is not the live corporate page. The working official source is the same path on [`goldenenergymines.com`](https://www.goldenenergymines.com/2025/07/22/digitech-article4/).

## 1. Databricks data aggregation layer and chatbot

### What public sources confirm

No located public GEMS source confirms that Databricks aggregates company data or documents, hosts an embedded GEMS chatbot, or connects to GEMVIS. The generic [Databricks homepage](https://www.databricks.com/) supplied in the brief is product marketing, not a GEMS customer reference. Searches of GEMS' 2024 and 2025 reports, [DigiTech catalogue](https://www.goldenenergymines.com/digitech/), [Google Cloud's architecture description](https://cloud.google.com/customers/gems), and Databricks' public customer material did not locate a GEMS/Databricks reference.

Databricks can technically support the described pattern: its official documentation says the platform ingests structured, semi-structured, and unstructured data such as images and documents, while AI Search can supply retrieval for RAG applications. This establishes technical plausibility only, not GEMS use. ([Databricks platform scope](https://docs.databricks.com/gcp/en/lakehouse-architecture/scope); [Databricks AI Search](https://docs.databricks.com/gcp/en/ai-search/ai-search))

### Public architecture that is actually documented

Google Cloud says GEMS has about 50 application portfolios and that GEMVIS unifies data from 50 applications. It names Coal Chain Management as one specialized source, private on-premises GPU servers for sensitive-data RAG, Gemini Enterprise Agent Platform for high-level reasoning, and Google Compute Engine, GKE, Cloud Armor, Cloud Monitoring, and Google Workspace in the broader deployment. Databricks is not named. ([Google Cloud customer story](https://cloud.google.com/customers/gems))

### Correction to the internal description

**Use:** “GEMS has a large application/data estate that GEMVIS connects conversationally across roughly 50 solutions.” ([Google Cloud customer story](https://cloud.google.com/customers/gems))  
**Do not use publicly without internal evidence:** “Databricks is GEMS' aggregation layer,” “all company documents are stored in Databricks,” “Databricks hosts the chatbot,” or “GEMVIS connects to Databricks.”

## 2. GEMVIS — GEMS Valuable Intelligence System

### What public sources confirm

GEMS introduced GEMVIS publicly on 22 July 2025 as a business-aware intelligence system offering contextual insights, smart recommendations, and personalized data access. The corporate DigiTech page also presents GEMVIS as a 24/7 assistant for company and operational information. ([GEMS GEMVIS article, 2025-07-22](https://www.goldenenergymines.com/2025/07/22/digitech-article4/); [GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/))

Google Cloud provides the strongest architecture description:

- GEMVIS is a **hierarchical multi-agent system**. A Gemini-based Dispatcher Agent interprets intent and routes requests to specialist agents. ([Google Cloud customer story](https://cloud.google.com/customers/gems))
- The system uses **hybrid infrastructure**: sensitive mining data is processed on private on-premises GPU servers for RAG, while an enterprise API invokes Gemini Enterprise Agent Platform for higher-level reasoning. ([Google Cloud customer story](https://cloud.google.com/customers/gems))
- Google Cloud is GEMS' primary infrastructure provider for the application estate; named components include Compute Engine, GKE, Cloud Armor, Cloud Monitoring, Gemini, Gemini Enterprise Agent Platform, Google Maps Platform, and Google Workspace. ([Google Cloud customer story](https://cloud.google.com/customers/gems))
- GEMVIS draws from specialist sources including CCM and leverages data from 50 “satellite solutions.” ([Google Cloud customer story](https://cloud.google.com/customers/gems))
- “Omnichannel” is publicly defined as the ability to embed GEMVIS in existing internal solutions. The public source does **not** name WhatsApp or Slack. ([Google Cloud customer story](https://cloud.google.com/customers/gems))

### Quotable specifics, dates, and outcomes

- **22 July 2025:** GEMS called GEMVIS a system ready to provide “contextual insights, smart recommendations, and personalized access to data.” ([GEMS GEMVIS article](https://www.goldenenergymines.com/2025/07/22/digitech-article4/))
- Google Cloud reports executive decision-making speed improved by **more than 90%**, multi-operational data retrieval fell from **two days to under one hour**, and the system serves a data estate of **50+ portfolios** and **4,000+ users**. These are provider/customer-reported outcomes. ([Google Cloud customer story](https://cloud.google.com/customers/gems))
- Eky Pratama Halim describes GEMVIS as giving employees a “true helicopter view of the entire operation chain.” ([Google Cloud customer story](https://cloud.google.com/customers/gems))
- GEMS' September 2025 AI/OCR article claims AI reduced response times by **60%** and improved compliance by **35%**. The page groups GEMVIS and AI-powered OCR together, so the numbers should not be attributed solely to GEMVIS. ([GEMS “Game Changers” article, 2025-09-25](https://www.goldenenergymines.com/digitech-article10/))

### Roadmap

The roadmap is more specific than “agentic AI later.” The system is already multi-agent; future work is to add specialist agents for ESG, carbon-emissions tracking, and geotechnical analysis, and to explore Google's AlphaEarth foundation model for spatial/environmental data. ([Google Cloud customer story](https://cloud.google.com/customers/gems))

### Correction to the internal description

Describe GEMVIS as an **existing hybrid, hierarchical multi-agent intelligence system** built with Google Cloud/Gemini and private on-premises RAG, embedded across internal applications. Keep “WhatsApp,” “Slack,” and “Databricks connection” marked **unverified** unless DigiTech supplies internal architecture or channel documentation. ([Google Cloud customer story](https://cloud.google.com/customers/gems))

## 3. MirraX

### Verification result

**Unverified.** No located first-party GEMS page, annual report, sustainability report, Google Cloud customer story, credible Indonesian mining article, or indexed GEMS social post names “MirraX” as a GEMS product. Searches for spelling variants did not identify a relevant system. ([GEMS DigiTech catalogue](https://www.goldenenergymines.com/digitech/); [GEMS 2025 Annual Report](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf); [GEMS 2025 Sustainability Report](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf); [Google Cloud customer story](https://cloud.google.com/customers/gems))

Public GEMS sources do mention other field-monitoring or visualization systems—SiCantik, Mining Eyes, Uscavis/Unified SCADA Vision, FAMOUS, and the command center—but none is publicly presented as an alias for MirraX. Uscavis converts WinCC data into dashboards and insights for conveyor performance and crusher availability; Mining Eyes appears in the 2024 Annual Report as a connectivity/monitoring initiative. ([GEMS Uscavis article, 2025-06-10](https://www.goldenenergymines.com/2025/06/10/digisast-14/); [GEMS 2024 Annual Report, pp. 70-72](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf))

### Correction to the internal description

Do not present MirraX as a verified public GEMS product. Ask the internal owner whether the name is confidential, renamed, misspelled, or refers to one of the publicly documented platforms. Until then, retain: **“MirraX — internal claim; public function, deployment, owner, and outcomes unverified.”**

## 4. SiCantik and Weigh-in-Motion (WIM)

These are separate systems in GEMS' public taxonomy. The internal brief incorrectly folds WIM into SiCantik. ([GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/); [GEMS 2025 Sustainability Report, p. 66](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf))

### 4.1 SiCantik — System Camera Analytic

#### What public sources confirm

GEMS describes SiCantik as an advanced analytical CCTV system combining human and machine intelligence. It is installed in multiple PT Borneo Indobara (BIB) areas to detect heavy equipment activity in critical dumping areas, monitor violations on coal-delivery roads, detect PPE and individual-behavior violations at the port, and monitor safe work behavior in offices and workshops. Both GEMS personnel and work partners use its monitoring. ([GEMS 2024 Annual Report, p. 70](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf))

Tambang's 27 November 2025 report, quoting GEMS CDTO Dimas Sutejo, adds vessel-number detection, vessel contamination, coal-spill detection, smoke/smoking detection, and PPE compliance; it says deployments span ports, hauling roads, offices, and pits. It also reports that automated camera analytics replaced tasks previously requiring continuous manual monitoring. This is credible secondary reporting, not a technical specification. ([Tambang, 2025-11-27](https://tambang.co.id/golden-energy-mines-gems-akselerasi-digitalisasi-untuk-tambang-yang-lebih-efisien/))

#### Dates, recognition, and outcomes

- GEMS' 2024 Annual Report records copyright registrations for the SiCantik module and video work, first announced on **1 July 2024**, and the **Subroto Award 2024** in Mineral and Coal Engineering and Environmental Innovation on **10 October 2024**. The 2025 Annual Report reproduces registration numbers **000645586** and **000645027** with protection stated through 1 July 2074. ([GEMS 2024 Annual Report, p. 70](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf); [GEMS 2025 Annual Report, certification section](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf))
- GEMS' DigiTech landing page claims safety violations including overspeed and fatigue fell by **up to 30%** across a group of applications—FMS, SiCantik, and Genesys. This is not a SiCantik-only effect. ([GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/))

#### Correction

The core internal description—computer vision detecting operational violations—is confirmed. Add the broader detection scope and national recognition. Remove WIM from SiCantik's product boundary.

### 4.2 WIM — Weigh-in-Motion

#### What public sources confirm

WIM records truck loads without requiring the truck to stop. GEMS' 2025 Sustainability Report says the solution combines moving-scale sensors, RFID, IoT, computer vision, and monitoring towers, and integrates with the custom CCM ERP. The report attributes reduced waiting time and fuel use, improved cycle time, lower fuel-related emissions, faster reporting, and better data-driven decisions to the system. ([GEMS WIM article, 2024-07-16](https://www.goldenenergymines.com/2024/07/16/digisast-06/); [GEMS 2025 Sustainability Report, p. 66](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf))

ANTARA reports that WIM automates coal-truck weighing to reduce queues, emissions, and accident risk. The official reports substantiate waiting-time, fuel, emissions, and cycle-time benefits; the accident-risk statement was located only in the secondary report and has no public quantified result. ([ANTARA, 2025-09-12](https://www.antaranews.com/berita/5104145/gems-dorong-transformasi-digital-tambang-untuk-efisiensi-keberlanjutan); [GEMS 2025 Sustainability Report, p. 66](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf))

#### Quotable specifics and outcomes

- **16 July 2024:** GEMS described WIM as a solution that “records loads without stopping the truck” and said BIB was the first Indonesian coal producer to implement technology of this kind. The “first” claim is GEMS' own and was not independently validated here. ([GEMS WIM article](https://www.goldenenergymines.com/2024/07/16/digisast-06/))
- GEMS' 2023 Annual Report says WIM is certified by Indonesia's Legal Metrology Standardization Center (BSML) for commercial transactions. It describes embedded strip-bar and infrared sensors for axle configuration, total load, tilt, and speed; CCTV and RFID for automatic hull-number recognition; capacity of **45 tons per axle**; weighing **3× faster** than static weighing; and operating-cost savings of **up to 90%**. These are company-reported specifications and savings. ([GEMS 2023 Annual Report, pp. 67-68](https://www.goldenenergymines.com/wp-content/files/Annual_Report_GEMS_2023.pdf))
- GEMS' newer DigiTech page groups WIM and UCan in the up-to-3× hauling weighing-delay claim, consistent with the earlier WIM speed figure but without a published test protocol. ([GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/))
- A September 2024 GEMS LinkedIn post says WIM contributed **95.4% of production volume**. The post does not define the denominator or causal method, so use this only with that caveat. ([GEMS LinkedIn post](https://www.linkedin.com/posts/goldenenergymines_goldenenergymines-gems-bib-activity-7244290582834003968-awNB))

#### Correction

Treat WIM as its own IoT/computer-vision weighing product integrated with CCM—not as a SiCantik feature.

## 5. FAMOUS — Fleet and Hauling Assignment Management System

### What public sources confirm

GEMS' June 2024 article expands the name as **Fleet and Hauling Assignment Management System** and says the platform was developed with Custodian, monitors driver behavior for health and safety, and had been progressively deployed to approximately 1,000 hauling trucks since 2022. GEMS' current site says FAMOUS × Uassist combines FMS, HMS, and AI and is deployed across **1,000+ hauling trucks** of multiple brands, types, and sizes. ([GEMS FMS article, 2024-06-04](https://www.goldenenergymines.com/2024/06/04/digisast-01/); [GEMS DigiTech homepage](https://www.goldenenergymines.com/home/home-digitech/))

GEMS' 2024 Sustainability Report identifies FAMOUS 2.0 as the real-time system used to monitor coal-hauling partners. The report separately describes GEMS' smart-mining estate as using IoT devices across mine sites, hauling roads, trucks, and ports to monitor equipment condition, worker safety, and operational efficiency. ANTARA more directly calls FAMOUS IoT-based and says it monitors mining vehicles and driver behavior. ([GEMS 2024 Sustainability Report, p. 59](https://www.goldenenergymines.com/wp-content/files/GEMS_SR_2024.pdf); [ANTARA, 2025-09-12](https://www.antaranews.com/berita/5104145/gems-dorong-transformasi-digital-tambang-untuk-efisiensi-keberlanjutan))

GEMS' 2025 Sustainability Report is more specific: FAMOUS 2.0 uses AI, sensors, wearables, GPS, and real-time status monitoring to identify, monitor, and manage physical, mental, and emotional fatigue; supervisors can optimize routes and fleet schedules to improve hauling fuel efficiency. GEMS' 2024 Annual Report likewise says its Fatigue Management System monitors drivers' location, behavior, and condition. ([GEMS 2025 Sustainability Report, p. 65](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf); [GEMS 2024 Annual Report, p. 118](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf))

GEMS' 2025 Annual Report attributes **Rp23.6 billion** in total direct benefits to Famous and Uassist together, including avoided asset-damage losses, better internal/partner oversight, vehicle-utilization optimization, fuel savings, and an emissions benefit equated to preserving about **4,930 trees per year**. It separately says Uassist's automated assignment increased task productivity by **23%**. These are combined/company-reported benefits, not FAMOUS-only or independently audited results. GEMS' DigiTech page also groups FMS, SiCantik, and Genesys with an **up to 30%** reduction in overspeed/fatigue safety violations. ([GEMS 2025 Annual Report, p. 71](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf); [GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/))

### Corrections and additions

- **Confirmed:** fleet and hauling monitoring, driver-behavior analysis, real-time oversight, IoT basis, safety/fatigue use, and 1,000+ truck scale. ([GEMS FMS article](https://www.goldenenergymines.com/2024/06/04/digisast-01/); [ANTARA](https://www.antaranews.com/berita/5104145/gems-dorong-transformasi-digital-tambang-untuk-efisiensi-keberlanjutan))
- **Unverified:** computer vision specifically inside FAMOUS. The public portfolio instead explicitly assigns computer vision to SiCantik and WIM. ([GEMS 2025 Sustainability Report, p. 66](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf))
- Public naming is inconsistent: one 2024 corporate archive post contains the likely typo “Flat Management System,” while formal reports and the main product article use Fleet Management System/Fleet and Hauling Assignment Management System. Use the latter. ([GEMS DigiTech article archive, page 2](https://www.goldenenergymines.com/category/digitech-article/page/2/); [GEMS FMS article](https://www.goldenenergymines.com/2024/06/04/digisast-01/))

## 6. Usign

### What public sources confirm

GEMS says Usign began rolling out in **September 2023** as a digital-signature platform. Its 2023 Annual Report describes real-time monitoring, user authentication, QR verification, real-time email/WhatsApp notifications, responsive tablet/mobile interfaces, planned SAP integration, and approximately **98% cost savings**. WhatsApp here is an approval notification channel; it is not evidence that GEMVIS itself is a WhatsApp chatbot. ([GEMS Usign article, 2024-06-25](https://www.goldenenergymines.com/2024/06/25/digisast-03/); [GEMS 2023 Annual Report, p. 68](https://www.goldenenergymines.com/wp-content/files/Annual_Report_GEMS_2023.pdf))

The 2025 Annual Report describes Usign more precisely as a **cloud-based digital document-signing solution** that integrates digital signatures with official, registered, state-recognized document seals. ([GEMS 2025 Annual Report, p. 73](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf))

The same report confirms a GEMVIS AI virtual assistant/chatbot supports users during document validation and approval. An Indonesian Directorate General of Intellectual Property patent publication goes further: application **S00202507278**, filed **1 August 2025** and published **20 August 2025**, describes an internal NLP assistant providing contextual, interactive pre-signing confirmation of document content. This supports contextual content checking, but still does not establish unrestricted question-answering over every document. ([GEMS 2025 Annual Report, p. 73](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf); [Indonesian DGIP patent publication](https://dgip.go.id/index.php/berita-resmi/2304/download))

Usign also provides authorization for the SiniSaja contractor-permit workflow, linking contractor registration and operating/project permits to corporate digital signatures. ([GEMS 2024 Annual Report, p. 71](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf))

### Quotable specifics and outcomes

- GEMS says Usign is intended to reduce administrative-error risk, accelerate decisions, and improve efficiency, security, and compliance across document approvals. ([GEMS 2025 Annual Report, p. 73](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf))
- GEMS reports annual printing/paper savings corresponding to **1,297 kgCO₂e** and approximately **21 trees per year**. These are company-reported equivalences; the calculation method is not disclosed in the report excerpt. ([GEMS 2025 Annual Report, p. 73](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf))
- GEMS states Usign is protected by copyright and patents; the government publication independently confirms the named patent application and its abstract, though an application/publication is not the same as proof of final grant. ([GEMS 2025 Annual Report, p. 73](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf); [Indonesian DGIP patent publication](https://dgip.go.id/index.php/berita-resmi/2304/download))

### Correction to the internal description

Use: **“Usign is GEMS' cloud document-signing and approval platform, with a GEMVIS AI assistant supporting validation and approval.”** Keep “chat over document contents” marked unverified unless internal product documentation demonstrates that behavior.

## DigiTech team and transformation context

### Formation, mandate, and operating model

GEMS' audited-style corporate reporting says the Digital & Technology Solutions (DigiTech) Division was established in **2020** as an innovation catalyst. The public DigiTech landing page instead says “Since 2021”; this appears to describe its public “years of innovation” counter rather than the legal/organizational formation date. Use 2020 for formation. ([GEMS 2024 Annual Report, p. 68](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf); [GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/))

Secondary reporting quotes Dimas Sutejo saying computerization began before 2019, digital transformation ran in 2020-2022, and “digital acceleration” began in 2023. This reconciles the earlier operational history with the division's 2020 formation. ([Tambang, 2025-11-27](https://tambang.co.id/golden-energy-mines-gems-akselerasi-digitalisasi-untuk-tambang-yang-lebih-efisien/))

The public team page names Risetiyawan Dimas Sutejo as Chief Digital and Technology Officer and organizes work into Digital Factory & Operation, Demand Touchpoint, Demand Solution, and Strategic Planning & Governance. The functions respectively build operational products, capture field/stakeholder demand, convert prioritized demand into feasible solutions, and manage strategic alignment, PMO, governance, and long-term planning. ([GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/))

### Scale and measured impact

- GEMS reports **50+ solutions**, **4,000+ users**, and **5+ awards**; Google Cloud separately reports 50+ portfolios and 4,000+ users. ([GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/); [Google Cloud customer story](https://cloud.google.com/customers/gems))
- GEMS reports hauling-weighing delay processes up to **3× faster**, overspeed/fatigue violations down up to **30%**, and support functions up to **7× faster and auditable**. These are portfolio-level marketing metrics without baselines or evaluation methods on the page. ([GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/))
- GEMS' 2025 Sustainability Report says a command center monitors pit-to-port activity on **26 large screens** operated by **nine dedicated personnel**, using customizable in-house applications. ([GEMS 2025 Sustainability Report, p. 65](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf))
- GEMS says **113 Genta Gendis** change agents acted as adoption ambassadors in 2024 across initiatives including Uchat, Uportal, SiCantik, and FAMS. ([GEMS DigiTech article archive](https://www.goldenenergymines.com/category/digitech-article/))

### Publicly documented data/AI working-model change

Google Cloud says GEMVIS shifted DigiTech analysts and data scientists away from manual report production toward data exploration and establishing training baselines, with emphasis on data quality and hyper-local precision. This is evidence of a team-level operating-model change, though not a measure of company-wide AI adoption. ([Google Cloud customer story](https://cloud.google.com/customers/gems))

The internal brief's claims about limited Claude subscriptions and weak AI adoption outside DigiTech were not located in public sources and remain **unverified internal context**.

## Other public GEMS AI and digitalization initiatives

This is a selected, not exhaustive, catalogue; GEMS itself claims more than 50 solutions. ([GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/))

| Initiative | Publicly documented function and specifics |
|---|---|
| **CCM — Coal Chain Management** | Custom pit-to-ship mining ERP. Live from mid-2023; monitors production status/performance online and in real time, integrates data, and was positioned to support BIB's production goal of up to **54 MTPA**. It is also a named GEMVIS source and WIM integration target. ([GEMS CCM article, 2024-06-18](https://www.goldenenergymines.com/2024/06/18/digisast-02/); [Google Cloud customer story](https://cloud.google.com/customers/gems); [GEMS 2025 Sustainability Report, p. 66](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf)) |
| **Command Center / CCR** | Integrated real-time pit-to-port oversight. The 2025 report states 26 large screens and nine dedicated staff; GEMS says digital products feed the centralized control environment. ([GEMS 2025 Sustainability Report, p. 65](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf); [GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/)) |
| **Uscavis / Unified SCADA Vision** | Converts WinCC plant data into dashboards and insights for conveyor performance and crusher availability; integrates with SYNOVA. The 2024 Annual Report also describes SCADA integration with FAMOUS, CCM, RPPJ, and U-GEMS, including remote operations, alarms, interactive visualizations, and analytics. ([GEMS Uscavis article, 2025-06-10](https://www.goldenenergymines.com/2025/06/10/digisast-14/); [GEMS 2024 Annual Report, p. 70](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf)) |
| **iSafe + INSTING** | iSafe BIB is an offline mobile safety-accountability app integrated with the INSTING machine-learning platform and SiCantik. GEMS says it can be used anywhere to support employee safety awareness. ([GEMS iSafe article, 2024-07-23](https://www.goldenenergymines.com/2024/07/23/digisast-07/)) |
| **iCore** | Integrated HSE management covering personnel, equipment, and infrastructure readiness before mine entry. Modules include Esimper, IComm, and HIO Report for SIMPER licensing, commissioning, hazard reporting, digital testing, centralized data, and real-time monitoring. ([GEMS DigiTech article archive, page 2](https://www.goldenenergymines.com/category/digitech-article/page/2/)) |
| **URise** | ROM-management digitization with real-time tracking, automated recording, and coordinated workflows. GEMS reports stock accuracy improved up to **97%** and foreman efficiency by **50%**. These are company-reported figures without a published evaluation method. ([GEMS DigiTech article archive](https://www.goldenenergymines.com/category/digitech-article/)) |
| **Usea** | BIB vessel tracking with real-time location, CCM integration, weather data, geofencing, and end-to-end delivery monitoring. ([GEMS Usea article, 2024-07-30](https://www.goldenenergymines.com/2024/07/30/digisast-08/)) |
| **UCan** | Automation for the loading, weighing, dumping, and closing cycle; present since 2023. GEMS groups UCan with WIM in its up-to-3× hauling-weighing speed claim. ([GEMS DigiTech article archive, page 2](https://www.goldenenergymines.com/category/digitech-article/page/2/); [GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/)) |
| **Ubox** | Document Management System introduced in 2023 to modernize document workflows and reduce paper/carbon impacts. It is distinct from Usign's signing/approval function. ([GEMS DigiTech article archive, page 5](https://www.goldenenergymines.com/page/5/?Itemid=&dir=DESC&gid=37&limit=5&limitstart=0&option=com_docman&order=name&task=cat_view)) |
| **Uideation** | Employee idea platform for submitting, refining, receiving feedback on, and tracking proposals from concept to implementation. ([GEMS DigiTech article archive](https://www.goldenenergymines.com/category/digitech-article/)) |
| **AI-powered OCR** | GEMS says OCR streamlines finance, marketing, and operations. The same article reports **60%** faster response and **35%** better compliance across its bundled AI story, but does not isolate OCR's contribution. ([GEMS “Game Changers” article, 2025-09-25](https://www.goldenenergymines.com/digitech-article10/)) |
| **SAP RISE, RPA, and digital procurement** | GEMS' 2024 report describes SAP RISE migration and robotic-process automation; its 2025 report describes iCosystem as 12 connected applications covering end-to-end procurement planning, execution, control, and reporting. ([GEMS 2024 Annual Report, pp. 68-69](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf); [GEMS 2025 Annual Report, pp. 72-73](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf)) |
| **Operational IoT and environmental monitoring** | GEMS reports IoT devices across mines, hauling roads, trucks, and ports; SPARING water-quality monitoring; contaminant detection through the processing chain; and mechanical conveyor sampling. These are estate-level capabilities, not one named AI product. ([GEMS 2024 Sustainability Report, p. 59](https://www.goldenenergymines.com/wp-content/files/GEMS_SR_2024.pdf)) |

## Bottom-line corrections for workshop material

1. Remove Databricks from the public-facing architecture unless GEMS supplies an internal source. Public architecture supports “50-application data estate + GEMVIS + hybrid on-prem RAG + Google Cloud/Gemini.” ([Google Cloud customer story](https://cloud.google.com/customers/gems))
2. Update GEMVIS from “future agentic roadmap” to “existing hierarchical multi-agent system,” with future specialist-agent expansion. ([Google Cloud customer story](https://cloud.google.com/customers/gems))
3. Replace “WhatsApp/Slack omnichannel” with “embedded across existing internal solutions”; keep the named channels unverified. ([Google Cloud customer story](https://cloud.google.com/customers/gems))
4. Mark MirraX unverified and omit it from externally sourced slides until its internal owner confirms the name and function. ([GEMS DigiTech catalogue](https://www.goldenenergymines.com/digitech/); [GEMS 2025 Annual Report](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf))
5. Split SiCantik and WIM. SiCantik is AI analytical CCTV; WIM is a distinct sensor/RFID/IoT/computer-vision moving-weigh system integrated with CCM. ([GEMS 2024 Annual Report, p. 70](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf); [GEMS 2025 Sustainability Report, p. 66](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf))
6. Describe FAMOUS as IoT/AI-enabled fleet, hauling, partner, and driver-behavior monitoring; do not assign computer vision to it without internal evidence. ([GEMS FMS article](https://www.goldenenergymines.com/2024/06/04/digisast-01/); [ANTARA](https://www.antaranews.com/berita/5104145/gems-dorong-transformasi-digital-tambang-untuk-efisiensi-keberlanjutan))
7. Describe Usign's verified AI behavior narrowly: GEMVIS assists document validation and approval. “Chat over document contents” remains unverified. ([GEMS 2025 Annual Report, p. 73](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf))

## Sources

### Primary: GEMS corporate publications and pages

- [GEMS corporate site](https://www.goldenenergymines.com/)
- [GEMS DigiTech landing page](https://www.goldenenergymines.com/id/digitech-id/)
- [GEMS DigiTech homepage module](https://www.goldenenergymines.com/home/home-digitech/)
- [GEMS GEMVIS article, 22 July 2025](https://www.goldenenergymines.com/2025/07/22/digitech-article4/)
- [GEMS “Game Changers” AI/OCR article, 25 September 2025](https://www.goldenenergymines.com/digitech-article10/)
- [GEMS DigiTech article archive](https://www.goldenenergymines.com/category/digitech-article/)
- [GEMS DigiTech article archive, page 2](https://www.goldenenergymines.com/category/digitech-article/page/2/)
- [GEMS DigiTech article archive, page 5](https://www.goldenenergymines.com/page/5/?Itemid=&dir=DESC&gid=37&limit=5&limitstart=0&option=com_docman&order=name&task=cat_view)
- [GEMS Fleet and Hauling Assignment Management System article, 4 June 2024](https://www.goldenenergymines.com/2024/06/04/digisast-01/)
- [GEMS CCM article, 18 June 2024](https://www.goldenenergymines.com/2024/06/18/digisast-02/)
- [GEMS Usign article, 25 June 2024](https://www.goldenenergymines.com/2024/06/25/digisast-03/)
- [GEMS WIM article, 16 July 2024](https://www.goldenenergymines.com/2024/07/16/digisast-06/)
- [GEMS iSafe BIB article, 23 July 2024](https://www.goldenenergymines.com/2024/07/23/digisast-07/)
- [GEMS Usea article, 30 July 2024](https://www.goldenenergymines.com/2024/07/30/digisast-08/)
- [GEMS Uscavis article, 10 June 2025](https://www.goldenenergymines.com/2025/06/10/digisast-14/)
- [GEMS 2023 Annual Report](https://www.goldenenergymines.com/wp-content/files/Annual_Report_GEMS_2023.pdf)
- [GEMS 2024 Annual Report](https://www.goldenenergymines.com/wp-content/files/AR_2024__GEMS_E-reporting_230425.pdf)
- [GEMS 2024 Sustainability Report](https://www.goldenenergymines.com/wp-content/files/GEMS_SR_2024.pdf)
- [GEMS 2025 Annual Report](https://www.goldenenergymines.com/wp-content/files/AR_2025__GEMS_Lengkap_270426_highres.pdf)
- [GEMS 2025 Sustainability Report](https://www.goldenenergymines.com/wp-content/files/8._SR_GEMs_260426_final.pdf)
- [GEMS LinkedIn WIM/change-management post](https://www.linkedin.com/posts/goldenenergymines_goldenenergymines-gems-bib-activity-7244290582834003968-awNB)

### Primary: technology-provider documentation

- [Google Cloud GEMS customer story](https://cloud.google.com/customers/gems)
- [Databricks platform scope on Google Cloud](https://docs.databricks.com/gcp/en/lakehouse-architecture/scope)
- [Databricks AI Search documentation](https://docs.databricks.com/gcp/en/ai-search/ai-search)
- [Databricks homepage](https://www.databricks.com/)

### Primary: government record

- [Indonesian Directorate General of Intellectual Property — Usign patent publication](https://dgip.go.id/index.php/berita-resmi/2304/download)

### Credible secondary reporting

- [ANTARA — “GEMS dorong transformasi digital tambang untuk efisiensi keberlanjutan,” 12 September 2025](https://www.antaranews.com/berita/5104145/gems-dorong-transformasi-digital-tambang-untuk-efisiensi-keberlanjutan)
- [Majalah TAMBANG — “Golden Energy Mines (GEMS) Akselerasi Digitalisasi untuk Tambang yang Lebih Efisien,” 27 November 2025](https://tambang.co.id/golden-energy-mines-gems-akselerasi-digitalisasi-untuk-tambang-yang-lebih-efisien/)