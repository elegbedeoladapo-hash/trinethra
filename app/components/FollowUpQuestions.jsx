export default function FollowUpQuestions({ questions }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      {/* Header */}
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
        Suggested Follow-up Questions
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        Ask these in the next supervisor call to fill assessment gaps
      </p>

      {/* Empty state */}
      {questions.length === 0 && (
        <p className="text-sm text-gray-400 italic">
          No follow-up questions generated.
        </p>
      )}

      {/* Questions */}
      <div className="flex flex-col gap-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-blue-100 bg-blue-50 p-4"
          >
            {/* Question number and text */}
            <div className="flex gap-3 mb-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-gray-800 leading-relaxed">
                {item.question}
              </p>
            </div>

            {/* Target gap */}
            <div className="ml-9 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-blue-500 font-medium uppercase">
                  Targets:
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700">
                  {item.targetGap.replace(/_/g, " ")}
                </span>
              </div>

              {/* Looking for */}
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                <span className="font-medium text-gray-600">
                  Looking for:{" "}
                </span>
                {item.lookingFor}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 italic">
          These questions are AI-suggested based on gaps in the transcript.
          Adapt them to fit the natural flow of your conversation.
        </p>
      </div>
    </div>
  );
}