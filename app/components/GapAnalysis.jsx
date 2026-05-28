export default function GapAnalysis({ gaps }) {
  function getDimensionInfo(dimension) {
    const map = {
      execution: {
        label: "Driving Execution",
        description: "Getting things done on time without reminders",
        icon: "⚡",
      },
      systems_building: {
        label: "Systems Building",
        description: "Creating tools and processes that outlast the Fellow",
        icon: "🏗️",
      },
      kpi_impact: {
        label: "KPI Impact",
        description: "Connecting work to measurable business outcomes",
        icon: "📊",
      },
      change_management: {
        label: "Change Management",
        description: "Getting the floor team to adopt new processes",
        icon: "🤝",
      },
    };

    return (
      map[dimension] || {
        label: dimension,
        description: "",
        icon: "❓",
      }
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      {/* Header */}
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
        Gap Analysis
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        Assessment dimensions the transcript did not cover
      </p>

      {/* No gaps state */}
      {gaps.length === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700 font-medium">
            ✅ No major gaps detected
          </p>
          <p className="text-xs text-green-600 mt-1">
            The transcript covered all four assessment dimensions.
          </p>
        </div>
      )}

      {/* Gap cards */}
      <div className="flex flex-col gap-3">
        {gaps.map((gap, index) => {
          const info = getDimensionInfo(gap.dimension);
          return (
            <div
              key={index}
              className="rounded-lg border border-amber-200 bg-amber-50 p-4"
            >
              {/* Top row */}
              <div className="flex items-center gap-2 mb-2">
                <span>{info.icon}</span>
                <span className="text-sm font-semibold text-amber-800">
                  {info.label}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-600">
                  Gap
                </span>
              </div>

              {/* Dimension description */}
              <p className="text-xs text-amber-600 mb-2">{info.description}</p>

              {/* Gap detail */}
              <p className="text-xs text-amber-800 leading-relaxed">
                {gap.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}