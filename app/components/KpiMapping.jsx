export default function KpiMapping({ kpiMapping }) {
  function getSystemBadge(systemOrPersonal) {
    if (systemOrPersonal === "system")
      return {
        styles: "bg-green-100 text-green-700 border-green-200",
        label: "System",
        tooltip: "This impact is tied to a system — survives without the Fellow",
      };
    return {
      styles: "bg-orange-100 text-orange-700 border-orange-200",
      label: "Personal",
      tooltip: "This impact depends on the Fellow personally being present",
    };
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      {/* Header */}
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
        KPI Impact
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        Business outcomes the Fellow's work connects to
      </p>

      {/* Empty state */}
      {kpiMapping.length === 0 && (
        <p className="text-sm text-gray-400 italic">
          No clear KPI connections identified in this transcript.
        </p>
      )}

      {/* KPI cards */}
      <div className="flex flex-col gap-3">
        {kpiMapping.map((item, index) => {
          const badge = getSystemBadge(item.systemOrPersonal);
          return (
            <div
              key={index}
              className="rounded-lg border border-gray-200 p-4 bg-gray-50"
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">
                  {item.kpi}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border font-medium ${badge.styles}`}
                  title={badge.tooltip}
                >
                  {badge.label}
                </span>
              </div>

              {/* Evidence */}
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.evidence}
              </p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-gray-400">
            System — continues without Fellow
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-400" />
          <span className="text-xs text-gray-400">
            Personal — depends on Fellow's presence
          </span>
        </div>
      </div>
    </div>
  );
}