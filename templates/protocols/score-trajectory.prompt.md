---
name: ieee-score-trajectory-protocol
source_reference: ref_repos/academic-research-skills/academic-pipeline/references/score_trajectory_protocol.md
source_license: CC-BY-NC-4.0
adaptation: IEEE-first rewritten prompt-layer protocol
applies_to:
  - ieee-paper-reviewer
  - ieee-academic-paper
  - ieee-academic-pipeline
---

# IEEE Score Trajectory Protocol

Use this protocol during review, revision, and re-review to detect regressions across quality dimensions.

## Dimensions

Use the IEEE reviewer dimensions unless a venue-specific rubric is supplied:

1. Novelty and significance
2. Technical soundness
3. Experimental rigor
4. Baseline fairness
5. Ablation coverage
6. Reproducibility
7. Clarity and IEEE fit
8. Limitations and ethics

## Scoring rules

- Score 0–100 only when there is enough evidence.
- Use `INSUFFICIENT_INFORMATION` when the manuscript lacks enough material.
- Compare the current score to the previous review/revision round when available.
- Flag any dimension that regresses by more than 3 points or changes from scored to `INSUFFICIENT_INFORMATION`.
- A regression flag is advisory unless it affects a blocker; explain the cause and proposed fix.

## Required output block

```markdown
## Score Trajectory
| Dimension | Previous | Current | Delta | Regression? | Reason | Fix |
|---|---:|---:|---:|---|---|---|
```

## Blocking rule

If a revision fixes one issue but creates a new `BLOCKER` or severe regression in technical soundness, experimental rigor, citation validity, or reproducibility, stop and ask for author confirmation before proceeding.
