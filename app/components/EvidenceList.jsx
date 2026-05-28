export default function EvidenceList({ evidence }) {
  function getSignalStyles(signal) {
    if (signal === "positive")
      return {
        card: "bg-green-50 border-green-200",
        badge: "bg-green-100 text-green-700 border-green-200",
        icon: "🟢",
      };
    if (signal === "negative")
      return {
        card: "bg-red-50 border-red-200",
        badge: "bg-red-100 text-red-700 border-red-200",
        icon: "🔴",
      };
    return {
      card: "bg-gray-50 border-gray-200",
      badge: "bg-gray-100 text-gray-600 border-gray-200",
      icon: "⚪",
    };
  }

  function formatDimension(dimension) {
    return dimension
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      {/* Header */}
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
        Extracted Evidence
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        Specific quotes from the transcript with AI interpretation
      </p>

      {/* Evidence cards */}
      <div className="flex flex-col gap-3">
        {evidence.map((item, index) => {
          const styles = getSignalStyles(item.signal);
          return (
            <div
              key={index}
              className={`rounded-lg border p-4 ${styles.card}`}
            >
              {/* Top row */}
              <div className="flex items-center gap-2 mb-2">
                <span>{styles.icon}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border font-medium ${styles.badge}`}
                >
                  {item.signal}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full border bg-white text-gray-500 border-gray-200">
                  {formatDimension(item.dimension)}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-gray-700 italic border-l-2 border-gray-300 pl-3 mb-2">
                "{item.quote}"
              </blockquote>

              {/* Interpretation */}
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.interpretation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}