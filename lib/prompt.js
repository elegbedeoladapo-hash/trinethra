export function buildPrompt(transcript) {
  return `You are evaluating DeepThought Fellow performance strictly using rule-based logic.

SCORING RULES:

1–3 → Need Attention
4–6 → Executes assigned work reliably
7–10 → Independent problem identification + systems building

HARD DECISION RULES:

RULE 1 — DEPENDENCY CEILING:
If supervisor describes:
- "Right hand"
- "Takes things off my plate"
- Personal absorption
AND no independent systems described,
Then MAX SCORE = 6.

RULE 2 — STRUCTURAL OVERRIDE (Meena-type case):
If transcript shows ANY of the following:
- Built structured tracker where none existed
- Quantified a pattern nobody had measured before
- Created monitoring/early-warning system
- Created SOP or documented structured process
Then MINIMUM SCORE = 7,
even if supervisor is critical or adoption is weak.

Adoption failure → Change Management gap,
NOT score reduction below 7.

RULE 3 — SURVIVABILITY TEST:
If structured processes would continue in Fellow's absence → eligible 7+.
If everything depends on personal presence → max 6.

SUPERVISOR BIASES:
- Presence bias (criticizes laptop/system work)
- Helpfulness bias (overrates absorption)

ASSESSMENT DIMENSIONS:
1. Driving Execution
2. Systems Building
3. KPI Impact
4. Change Management

KPIs:
Lead Generation, Lead Conversion, Upselling, Cross-selling,
NPS, PAT, TAT, Quality

TRANSCRIPT:
${transcript}

Return ONLY valid JSON in this structure:

{
  "score": {
    "value": 7,
    "label": "Problem Identifier",
    "band": "Performance",
    "justification": "Apply rule-based logic and explain clearly which rule triggered.",
    "confidence": "medium"
  },
  "evidence": [
    {
      "quote": "exact quote",
      "signal": "positive",
      "dimension": "systems_building",
      "interpretation": "what structural system was built"
    }
  ],
  "kpiMapping": [
    {
      "kpi": "TAT",
      "evidence": "what supervisor described",
      "systemOrPersonal": "system"
    }
  ],
  "gaps": [
    {
      "dimension": "change_management",
      "detail": "adoption weakness if present"
    }
  ],
  "followUpQuestions": [
    {
      "question": "specific question",
      "targetGap": "change_management",
      "lookingFor": "evidence of adoption ability"
    }
  ]
}`;
}