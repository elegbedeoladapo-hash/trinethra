import { NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt";
import { parseAnalysis, validateAnalysis } from "@/lib/parser";

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "llama3.2";

export async function POST(request) {
  try {
    // Get transcript from request body
    const { transcript } = await request.json();

    // Basic validation
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

    // Build the prompt
    const prompt = buildPrompt(transcript);

    // Send to Ollama
    const ollamaResponse = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.1, // Low temperature = consistent structured output
          num_predict: 3000, // Enough tokens for full JSON response
        },
      }),
    });

    // Check if Ollama is running
    if (!ollamaResponse.ok) {
      return NextResponse.json(
        {
          error:
            "Could not reach Ollama. Make sure Ollama is running locally on port 11434.",
        },
        { status: 503 }
      );
    }

    const ollamaData = await ollamaResponse.json();
    const rawText = ollamaData.response;

    // Parse the response
    let analysis;
    try {
      analysis = parseAnalysis(rawText);
      validateAnalysis(analysis);
    } catch (parseError) {
      return NextResponse.json(
        {
          error:
            "The model returned an unexpected format. Please try again.",
          raw: rawText,
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    // Ollama not running at all
    if (error.cause?.code === "ECONNREFUSED") {
      return NextResponse.json(
        {
          error:
            "Ollama is not running. Please start Ollama and try again.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}