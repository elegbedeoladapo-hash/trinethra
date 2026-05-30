export function buildPrompt(transcript) {
  return `You are evaluating DeepThought Fellow performance.

Step 1 — Identify:
- Did the Fellow identify a problem the supervisor had NOT formally measured?
- Did the Fellow create structured monitoring where none existed?
- Did the Fellow expand scope independently beyond assigned tasks?

Step 2 — Apply scoring boundary:

Score 6 if:
- Work is reliable but within assigned scope.
- Supervisor already knew about issues.
- Fellow improved execution but did not redefine the problem.

Score 7 if:
- Fellow quantified an unmeasured systemic issue.
- Created structured tracking or monitoring.
- Reframed how the business sees the problem.
- Expanded scope independently.

DEPENDENCY RULE:
If supervisor describes workload absorption ("right hand", "takes off my plate")
AND no independent systems survive departure,
cap score at 6.

IMPORTANT:
Maintaining a tracker alone does NOT qualify as 7.
Quantifying an operational pattern nobody had formally measured DOES qualify.

TRANSCRIPT:
${transcript}

Return ONLY valid JSON:

{
  "score": {
    "value": 7,
    "label": "Problem Identifier",
    "band": "Performance",
    "justification": "One paragraph explaining why this is 6 or 7.",
    "confidence": "medium"
  },
  "evidence": [
    {
      "quote": "exact quote",
      "signal": "positive",
      "dimension": "systems_building",
      "interpretation": "brief explanation"
    }
  ],
  "kpiMapping": [
    {
      "kpi": "TAT",
      "evidence": "supervisor-described outcome",
      "systemOrPersonal": "system"
    }
  ],
  "gaps": [
    {
      "dimension": "change_management",
      "detail": "missing dimension"
    }
  ],
  "followUpQuestions": [
    {
      "question": "specific question",
      "targetGap": "change_management",
      "lookingFor": "what a strong answer reveals"
    }
  ]
}

Use only these dimensions:
execution
systems_building
kpi_impact
change_management

Do not include any explanation outside JSON.`;
}