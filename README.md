Trinethra — Supervisor Feedback Analyzer
A local AI-powered web application built for DeepThought’s Trinethra module.

The tool analyzes supervisor feedback transcripts and generates a structured performance assessment draft for psychology interns to review and finalize.

What It Does
A psychology intern pastes a supervisor call transcript into the app.

The app sends the transcript to a local LLM (Ollama) and returns:

Performance Score (1–10) — with rubric-aligned justification and confidence
Extracted Evidence — transcript quotes tagged as positive, negative, or neutral
KPI Mapping — mapping supervisor language to one of the 8 business KPIs
Gap Analysis — which assessment dimensions were not covered
Suggested Follow-up Questions — targeted to identified gaps
The AI generates a draft.
The human intern reviews, edits, and decides.
The tool assists — it does not replace judgment.

Architecture
text

Browser (Next.js Frontend)
        ↓
Next.js API Route (/api/analyze)
        ↓
Ollama (localhost:11434)
        ↓
llama3.2 model (runs locally)
Stack
Frontend — Next.js (App Router) + Tailwind CSS
Backend — Next.js API Route
LLM — Ollama running llama3.2 locally
Parser — 3-stage JSON fallback system
No cloud APIs — fully local inference
All transcript data stays on the user’s machine.

Setup Instructions
Prerequisites
Node.js 18+
Ollama installed (ollama.com)
1. Clone the repo
Bash

git clone https://github.com/elegbedeoladapo-hash/trinethra.git
cd trinethra
2. Install dependencies
Bash

npm install
3. Install and prepare Ollama
Bash

ollama pull llama3.2
4. Start the app
Bash

npm run dev
Open:

text

http://localhost:3000
Why llama3.2?
~2GB model — runs on 8GB RAM laptops
Reliable structured JSON generation
Strong instruction following
Fully local, no API key required
Correctness was prioritized over model size.

Prompt Engineering Decisions
1️⃣ Single Prompt vs Multi‑Prompt
I chose a single structured prompt for MVP:

Lower latency (one API call)
Easier debugging
Simpler architecture
Faster iteration within 48-hour constraint
Tradeoff:

Multi-step chaining could improve edge-case reasoning
Left as future improvement
2️⃣ Rubric Boundary Enforcement (6 vs 7)
The most critical scoring boundary is between:

6 → Reliable Execution
7 → Independent Problem Identification
To ensure stability:

Prompt encodes strict boundary logic
Backend enforces deterministic caps for:
Lack of independent pushback
Dependency trap language (e.g., “my right hand”)
This prevents over-scoring from LLM variability.

3️⃣ Structured Output Reliability
LLMs sometimes return malformed JSON.

The parser implements:

Direct JSON parse
Markdown stripping fallback
Regex extraction fallback
Temperature is set to 0.1 to reduce format variance.

4️⃣ Showing Uncertainty (Automation Bias Prevention)
To prevent blind trust:

Every score includes a confidence label
A banner explicitly states: “AI-generated draft”
Evidence is shown alongside justification
The intern sees reasoning, not just a number.

5️⃣ Gap Detection (Reasoning About Absence)
Gap detection requires identifying what was not mentioned.

The prompt explicitly checks four assessment dimensions:

Driving Execution
Systems Building
KPI Impact
Change Management
Missing dimensions are surfaced with targeted follow-up questions.

Design Challenges Tackled
✅ Challenge 2 — Structured Output Reliability
✅ Challenge 4 — Showing Uncertainty
✅ Challenge 5 — Gap Detection

What I Would Improve With More Time
Transcript ↔ Evidence Linking

Hover over evidence card → highlight source text
Multi-step Prompt Chain

Separate extraction, scoring, and gap reasoning
Editable Draft Mode

Allow intern to modify AI output before finalizing
Confidence Calibration

Show which rubric signals were detected vs missing
Transcript History

Track Fellow progress across multiple calls
Project Structure
text

trinethra/
├── app/
│   ├── api/analyze/route.js
│   ├── components/
│   │   ├── TranscriptPanel.jsx
│   │   ├── AnalysisResults.jsx
│   │   ├── ScoreCard.jsx
│   │   ├── EvidenceList.jsx
│   │   ├── KpiMapping.jsx
│   │   ├── GapAnalysis.jsx
│   │   └── FollowUpQuestions.jsx
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── lib/
│   ├── prompt.js
│   └── parser.js
├── data/
│   ├── rubric.json
│   └── sample-transcripts.json
└── README.md




