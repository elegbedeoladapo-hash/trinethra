"use client";

import { useState } from "react";
import TranscriptPanel from "@/app/components/TranscriptPanel";
import AnalysisResults from "@/app/components/AnalysisResults";

export default function Home() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAnalyze(transcript) {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Trinethra — Supervisor Feedback Analyzer
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          DeepThought Fellow Performance Module · AI-assisted draft for intern review
        </p>
      </div>

      {/* Two panel layout */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left panel - Transcript input */}
        <div className="w-2/5 border-r border-gray-200 bg-white overflow-y-auto">
          <TranscriptPanel onAnalyze={handleAnalyze} loading={loading} />
        </div>

        {/* Right panel - Analysis results */}
        <div className="w-3/5 overflow-y-auto bg-gray-50">
          <AnalysisResults
            analysis={analysis}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </main>
  );
}
