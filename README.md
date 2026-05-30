<div align="center">

# Trinethra — AI Supervisor Feedback Analyzer

**Turn raw feedback transcripts into structured performance assessments — instantly.**

![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-Llama%203.2-grey?style=flat)
![Local LLM](https://img.shields.io/badge/LLM-Local%20Inference-orange?style=flat)

</div>

---

## What it does

Trinethra takes a supervisor feedback transcript and generates a structured, rubric-aligned performance assessment draft using a locally running AI model — no cloud API costs, no data leaving your machine.

Built for HR teams and organisations that need consistent, structured performance reviews but want to keep sensitive employee data private and on-premise.

---

## Why this is different

Most AI tools send your data to OpenAI or Anthropic servers. Trinethra runs inference **completely locally** using Ollama — meaning:

- 🔒 **Zero data exposure** — employee transcripts never leave your machine
- 💸 **Zero API costs** — no per-token billing
- ⚡ **Offline capable** — works without internet after setup
- 🏢 **Enterprise-ready privacy** — suitable for HR and legal compliance

---

## Features

- 📝 **Transcript input** — paste any supervisor feedback transcript
- 🤖 **Local LLM processing** — powered by Llama 3.2 via Ollama
- 📊 **Structured output** — rubric-aligned assessment with scores and comments
- 🔄 **Fallback logic** — custom JSON parser handles imperfect LLM output gracefully
- 🎨 **Clean UI** — built with Next.js App Router and Tailwind CSS
- ⚙️ **API route architecture** — clean separation of frontend and AI processing

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | JavaScript |
| Styling | Tailwind CSS |
| AI Model | Llama 3.2 via Ollama |
| LLM Integration | Local HTTP API (localhost:11434) |
| Output Handling | Custom JSON parser with fallback logic |

---

## How it works

User pastes transcript
↓
Next.js API Route receives request
↓
Structured prompt sent to Ollama (localhost:11434)
↓
Llama 3.2 generates JSON assessment
↓
Custom parser validates + sanitises output
↓
Fallback logic handles edge cases
↓

---

## Quick Start

### Prerequisites
You must have [Ollama](https://ollama.ai) installed and running locally.

```bash
# Install Ollama (Mac/Linux)
curl -fsSL https://ollama.ai/install.sh | sh

# Pull the Llama 3.2 model
ollama pull llama3.2

# Confirm Ollama is running
ollama serve
```

### Run the app

```bash
git clone https://github.com/elegbedeoladapo-hash/trinethra.git
cd trinethra
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> Ollama must be running on port 11434 before starting the app.

---

## Architecture Decision — Why local LLM?

Performance data is among the most sensitive information in any organisation. Sending employee feedback transcripts to a third-party API creates:

- Legal liability under GDPR and similar regulations
- Risk of sensitive data being used for model training
- Per-token costs that scale poorly across large HR teams

Running Llama 3.2 locally via Ollama solves all three problems simultaneously. The tradeoff is setup complexity — but for any organisation handling real employee data, that tradeoff is the correct one.

---

<div align="center">
Built by <a href="https://my-portfolio-y33e.vercel.app">Oladapo Elegbede</a> · 
<a href="mailto:elegbedeoladapo@gmail.com">elegbedeoladapo@gmail.com</a> · 
<a href="https://linkedin.com/in/oladapo-elegbede">LinkedIn</a>
</div>
Structured assessment rendered to user

