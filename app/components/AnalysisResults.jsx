import ScoreCard from "@/app/components/ScoreCard";
import EvidenceList from "@/app/components/EvidenceList";
import KpiMapping from "@/app/components/KpiMapping";
import GapAnalysis from "@/app/components/GapAnalysis";
import FollowUpQuestions from "@/app/components/FollowUpQuestions";

export default function AnalysisResults({ analysis, loading, error }) {
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Analyzing transcript...</p>
        <p className="text-gray-400 text-sm mt-2">
          The local AI model is processing. This takes 30–60 seconds.
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-700 font-medium mb-2">Analysis Failed</p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-gray-500 font-medium">No analysis yet</p>
        <p className="text-gray-400 text-sm mt-2">
          Paste a transcript on the left and click Run Analysis
        </p>
      </div>
    );
  }

  // Results
  return (
    <div className="p-6 flex flex-col gap-6">
      {/* AI draft warning banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-3">
        <span className="text-amber-500 text-lg">⚠️</span>
        <p className="text-amber-700 text-sm">
          <span className="font-semibold">This is an AI-generated draft.</span>{" "}
          Review each section carefully. Accept, edit, or reject findings based
          on your own judgment.
        </p>
      </div>

      <ScoreCard score={analysis.score} />
      <EvidenceList evidence={analysis.evidence} />
      <KpiMapping kpiMapping={analysis.kpiMapping} />
      <GapAnalysis gaps={analysis.gaps} />
      <FollowUpQuestions questions={analysis.followUpQuestions} />
    </div>
  );
}