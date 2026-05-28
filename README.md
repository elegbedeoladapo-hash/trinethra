# Trinethra — Supervisor Feedback Analyzer

A local AI-powered web application built for DeepThought's Trinethra module.
It analyzes supervisor feedback transcripts and produces structured Fellow performance assessments for psychology interns to review.

---

## What It Does

A psychology intern pastes a supervisor call transcript into the app.
The app sends it to a local LLM (Ollama), which extracts:

- **Performance Score (1-10)** with justification and confidence level
- **Extracted Evidence** — specific quotes tagged as positive, negative, or neutral
- **KPI Mapping** — which of 8 business KPIs the Fellow's work connects to
- **Gap Analysis** — which assessment dimensions the transcript did not cover
- **Suggested Follow-up Questions** — targeted questions for the next call

The AI produces a draft. The intern reviews, edits, and decides. The tool does not replace human judgment.

---

## Architecture
Browser (Next.js Frontend)
↓
Next.js API Route (/api/analyze)
↓
Ollama (local HTTP API at localhost:11434)
↓
llama3.2 model (runs entirely on your machine)


- **Frontend** — Next.js App Router + Tailwind CSS. Two-panel layout: transcript input on the left, analysis results on the right.
- **Backend** — Next.js API route (`/api/analyze/route.js`). Receives transcript, builds prompt, calls Ollama, parses and validates response.
- **LLM** — Ollama running `llama3.2` locally. No cloud APIs. No data leaves the machine.
- **Prompt** — Single structured prompt in `lib/prompt.js` that includes the full rubric, KPI definitions, assessment dimensions, supervisor bias warnings, and Layer 1 vs Layer 2 distinction.
- **Parser** — `lib/parser.js` uses a 3-strategy fallback: direct JSON parse → strip markdown → regex extraction.

---

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- Ollama installed ([ollama.com](https://ollama.com))

### Step 1 — Clone the repo
```bash
git clone https://github.com/elegbedeoladapo-hash/trinethra.git
cd trinethra
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Install and start Ollama
```bash
# Download from ollama.com, then pull the model
ollama pull llama3.2
```

### Step 4 — Start the app
```bash
npm run dev
```

### Step 5 — Open in browser

http://localhost:3000

---

## Why llama3.2?

- Small enough (3B parameters) to run on most laptops with 8GB RAM
- Fast enough for a 30-60 second analysis turnaround
- Strong instruction-following — reliably returns structured JSON
- Free, local, no API key needed

---

## Prompt Engineering Decisions

### Single prompt vs multiple prompts
I chose a single structured prompt over chained calls. Reasoning: for a 48-hour MVP, one prompt is simpler to debug, faster to iterate on, and easier to explain. The tradeoff is that output quality on edge cases may be lower than a multi-step chain — noted as a future improvement.

### Structured output reliability
The prompt explicitly instructs the model to return only valid JSON with no markdown, no explanation, and no text before or after. Temperature is set to 0.1 for consistent output. The parser (`lib/parser.js`) has 3 fallback strategies in case the model adds markdown fences or commentary.

### Rubric and bias injection
The full rubric (all 10 levels), all 8 KPIs, all 4 assessment dimensions, and 5 supervisor bias patterns are injected directly into the prompt. This grounds the model's analysis in the actual evaluation framework rather than generic performance assessment.

### Layer 1 vs Layer 2 distinction
The prompt explicitly defines execution (Layer 1) vs systems building (Layer 2) and includes the survivability test. This prevents the model from giving high scores to Fellows who are merely task-absorbing.

---

## Design Challenges Tackled

### Challenge 2: Structured Output Reliability
LLMs don't always return clean JSON. The parser tries 3 strategies before failing: direct parse, markdown stripping, and regex extraction. Temperature is set to 0.1 to minimize format variation.

### Challenge 4: Showing Uncertainty
The score card displays a confidence level (low/medium/high) returned by the model. A banner at the top of every analysis reminds the intern that this is an AI draft, not a verdict. The justification is always shown so the intern can evaluate the reasoning, not just the score.

### Challenge 5: Gap Detection
The prompt instructs the model to check all 4 assessment dimensions and explicitly flag which ones the transcript did not cover. This is harder than extraction — it requires reasoning about absence, not presence.

---

## What I Would Improve With More Time

1. **Side-by-side transcript and analysis view** — highlight the exact quote in the transcript when the intern hovers over an evidence card
2. **Multiple prompt strategy** — separate calls for evidence extraction, scoring, and gap analysis for higher accuracy
3. **Edit and save** — let the intern edit the AI draft and save a finalized assessment
4. **Confidence calibration** — show which specific rubric signals were found and which were missing, not just a single confidence label
5. **Transcript history** — save past analyses so the intern can compare Fellow progress over multiple calls

---

## Project Structure\

trinethra/
├── app/
│   ├── api/analyze/route.js      # Ollama integration and API endpoint
│   ├── components/
│   │   ├── TranscriptPanel.jsx   # Left panel: transcript input and sample loader
│   │   ├── AnalysisResults.jsx   # Right panel: orchestrates all result sections
│   │   ├── ScoreCard.jsx         # Score, band, confidence, justification
│   │   ├── EvidenceList.jsx      # Color-coded quote cards
│   │   ├── KpiMapping.jsx        # KPI tags with system vs personal indicator
│   │   ├── GapAnalysis.jsx       # Missing assessment dimensions
│   │   └── FollowUpQuestions.jsx # Targeted questions for next call
│   ├── globals.css
│   ├── layout.js
│   └── page.js                   # Main two-panel layout
├── lib/
│   ├── prompt.js                 # LLM prompt with rubric, KPIs, bias logic
│   └── parser.js                 # JSON extraction with 3-strategy fallback
├── data/
│   ├── rubric.json               # Scoring rubric as structured data
│   └── sample-transcripts.json  # 3 test transcripts
└── README.md



