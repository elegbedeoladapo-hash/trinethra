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