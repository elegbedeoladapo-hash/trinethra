import { NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt";
import { parseAnalysis, validateAnalysis } from "@/lib/parser";

export const maxDuration = 300; // allow long AI processing if needed

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "llama3.2";

export async function POST(request) {
  try {
    const { transcript } = await request.json();

    // Validation
    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: "Transcript cannot be empty." },
        { status: 400 }
      );
    }

    if (transcript.trim().length < 50) {
      return NextResponse.json(
        { error: "Transcript is too short to analyze meaningfully." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(transcript);

    const ollamaResponse = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.1,
          num_predict: 1500, // 🔥 Reduced for faster response
        },
      }),
    });

    if (!ollamaResponse.ok) {
      return NextResponse.json(
        {
          error:
            "Could not reach Ollama. Make sure Ollama is running locally.",
        },
        { status: 503 }
      );
    }

    const ollamaData = await ollamaResponse.json();
    const rawText = ollamaData.response;

    let analysis;
    try {
      analysis = parseAnalysis(rawText);
      validateAnalysis(analysis);
      // -----------------------------
// -----------------------------
// RUBRIC BOUNDARY ENFORCEMENT
// -----------------------------

const lowerTranscript = transcript.toLowerCase();

// Karthik-type ceiling: explicit lack of independent pushback
if (
  analysis.score.value >= 7 &&
  (
    lowerTranscript.includes("doesn't really push back") ||
    lowerTranscript.includes("if i tell him to do something, he does it") ||
    lowerTranscript.includes("he does it. even if it's not the best way")
  )
) {
  analysis.score.value = 6;
  analysis.score.label = "Reliable and Productive";
  analysis.score.band = "Productivity";
  analysis.score.justification +=
    " Supervisor explicitly mentions lack of independent pushback, which caps score at 6 per rubric boundary.";
}

// Dependency trap ceiling (Anil-type case)
if (
  analysis.score.value >= 7 &&
  (
    lowerTranscript.includes("my right hand") ||
    lowerTranscript.includes("takes so much off my plate") ||
    lowerTranscript.includes("don't know how we managed before") ||
    lowerTranscript.includes("focus on the business instead of firefighting")
  )
) {
  analysis.score.value = 6;
  analysis.score.label = "Reliable and Productive";
  analysis.score.band = "Productivity";
  analysis.score.justification +=
    " Supervisor language indicates dependency trap (personal absorption rather than independent systems), which caps score at 6 per rubric.";
}
    } catch (parseError) {
      return NextResponse.json(
        {
          error: "Model returned invalid JSON format.",
          raw: rawText,
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}