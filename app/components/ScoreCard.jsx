export default function ScoreCard({ score }) {
  function getBandColor(band) {
    if (band === "Performance") return "bg-green-50 border-green-200";
    if (band === "Productivity") return "bg-blue-50 border-blue-200";
    return "bg-red-50 border-red-200";
  }

  function getScoreColor(value) {
    if (value >= 7) return "text-green-600";
    if (value >= 4) return "text-blue-600";
    return "text-red-600";
  }

  function getConfidenceBadge(confidence) {
    if (confidence === "high")
      return "bg-green-100 text-green-700 border-green-200";
    if (confidence === "medium")
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  }

  return (
    <div className={`rounded-lg border p-5 ${getBandColor(score.band)}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Performance Score
        </h2>
        <span
          className={`text-xs px-2 py-1 rounded-full border font-medium ${getConfidenceBadge(
            score.confidence
          )}`}
        >
          {score.confidence} confidence
        </span>
      </div>

      {/* Score display */}
      <div className="flex items-end gap-3 mb-3">
        <span className={`text-6xl font-bold ${getScoreColor(score.value)}`}>
          {score.value}
        </span>
        <div className="mb-2">
          <p className="text-gray-800 font-semibold">{score.label}</p>
          <p className="text-gray-500 text-sm">{score.band} Band</p>
        </div>
      </div>

      {/* Score bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full transition-all ${
            score.value >= 7
              ? "bg-green-500"
              : score.value >= 4
              ? "bg-blue-500"
              : "bg-red-500"
          }`}
          style={{ width: `${(score.value / 10) * 100}%` }}
        />
      </div>

      {/* Justification */}
      <div className="bg-white bg-opacity-60 rounded-md p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
          AI Justification
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {score.justification}
        </p>
      </div>

      {/* Reviewer note */}
      <p className="text-xs text-gray-400 mt-3 italic">
        This score is a suggested starting point. Use your judgment to adjust
        based on the evidence below.
      </p>
    </div>
  );
}