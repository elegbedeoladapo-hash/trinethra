"use client";

import { useState } from "react";
import transcripts from "@/data/sample-transcripts.json";

export default function TranscriptPanel({ onAnalyze, loading }) {
  const [transcript, setTranscript] = useState("");

  function loadSample(index) {
    setTranscript(transcripts.transcripts[index].transcript);
  }

  function handleSubmit() {
    if (!transcript.trim()) return;
    onAnalyze(transcript);
  }

  return (
    <div className="p-6 flex flex-col h-full">
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Supervisor Transcript
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Paste a supervisor call transcript or load a sample below
        </p>
      </div>

      {/* Sample loaders */}
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-2">Load sample transcript:</p>
        <div className="flex flex-col gap-2">
          {transcripts.transcripts.map((t, i) => (
            <button
              key={t.id}
              onClick={() => loadSample(i)}
              className="text-left text-xs px-3 py-2 rounded-md border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition-colors"
            >
              <span className="font-medium">{t.fellow.name}</span> ·{" "}
              {t.company.name}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste supervisor transcript here..."
        className="flex-1 w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300"
      />

      {/* Character count */}
      <p className="text-xs text-gray-400 mt-2 text-right">
        {transcript.length} characters
      </p>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !transcript.trim()}
        className="mt-3 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
      >
        {loading ? "Analyzing... (this may take 30-60 seconds)" : "Run Analysis"}
      </button>
    </div>
  );
}