export function parseAnalysis(rawText) {
  // Strategy 1: Direct JSON parse
  try {
    return JSON.parse(rawText);
  } catch {
    // move to next strategy
  }

  // Strategy 2: Strip markdown code blocks
  try {
    const stripped = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(stripped);
  } catch {
    // move to next strategy
  }

  // Strategy 3: Extract JSON object with regex
  try {
    const match = rawText.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch {
    // move to next strategy
  }

  // All strategies failed
  throw new Error(
    "Could not parse model response into valid JSON. The model may have returned an unexpected format."
  );
}

export function validateAnalysis(data) {
  const required = [
    "score",
    "evidence",
    "kpiMapping",
    "gaps",
    "followUpQuestions",
  ];

  const missing = required.filter((key) => !data[key]);

  if (missing.length > 0) {
    throw new Error(`Analysis is missing required fields: ${missing.join(", ")}`);
  }

  return true;
}