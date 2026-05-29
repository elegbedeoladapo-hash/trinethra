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