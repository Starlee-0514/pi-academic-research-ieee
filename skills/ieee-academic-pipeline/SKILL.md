---
name: ieee-academic-pipeline
description: End-to-end IEEE research-to-submission workflow for Pi. Use for complete IEEE paper projects from research scoping through manuscript drafting, technical review, revision, IEEEtran finalization, response letters, and camera-ready checks. ASR-style orchestrator that coordinates ieee-deep-research, ieee-academic-paper, and ieee-paper-reviewer.
license: CC-BY-NC-4.0
metadata:
  status: active-draft
  data_access_level: verified_only
  task_type: open-ended
  related_skills:
    - ieee-deep-research
    - ieee-academic-paper
    - ieee-paper-reviewer
  upstream_references:
    - academic-research-skills: CC-BY-NC-4.0
    - nature-skills: MIT
  source_ledger: ../../references/source-ledger.md
---

# IEEE Academic Pipeline

ASR-style orchestrator for a complete IEEE research-to-submission workflow. This skill coordinates specialized IEEE skills; it should not silently perform every stage at once without checkpoints.

## Orchestrator rules

1. Detect the user's current stage and route to the narrowest useful IEEE skill/mode.
2. Require confirmation at major stage boundaries.
3. Preserve a visible state dashboard: stage, inputs, deliverables, blockers, next route.
4. Never invent missing research evidence, reviewer comments, citation metadata, experiments, line numbers, or venue requirements.
5. Prefer single-skill routing when the user asks for a narrow task; the pipeline is opt-in.

## Safety protocol registry

Use these prompt-layer protocols as pipeline gates or handoff checks:

- Anti-leakage / material gaps: `../../templates/protocols/anti-leakage.prompt.md`
- Citation verification: `../../templates/protocols/citation-verification.prompt.md`
- Claim-reference alignment: `../../templates/protocols/claim-alignment.prompt.md`
- Score trajectory and regression detection: `../../templates/protocols/score-trajectory.prompt.md`

Pipeline stages should preserve protocol outputs as artifacts rather than collapsing them into prose-only summaries.

## Stage map

| Stage | Name | Route | Primary deliverable | Gate |
|---|---|---|---|---|
| 0 | INTAKE | orchestrator | Project state card | User confirms scope |
| 1 | RESEARCH | `ieee-deep-research` (`socratic`, `full`, `lit-review`, `fact-check`) | RQ, evidence map, related-work matrix | User confirms evidence sufficiency |
| 2 | PAPER PLAN | `ieee-academic-paper` (`plan`, `outline-only`) | IEEE outline, contribution contract | User approves structure |
| 3 | DRAFT | `ieee-academic-paper` (`full`) | Manuscript draft / section drafts | Claim-evidence check |
| 3.5 | INTEGRITY | orchestrator + relevant skills | Citation, baseline, reproducibility audit | Blocking issues resolved or acknowledged |
| 4 | REVIEW | `ieee-paper-reviewer` (`full`, `methodology-focus`) | IEEE review + decision roadmap | User chooses revision strategy |
| 5 | REVISE | `ieee-academic-paper` (`revision`, `revision-coach`) | Revised manuscript + response skeleton | User verifies changes |
| 5.5 | RE-REVIEW | `ieee-paper-reviewer` (`re-review`) | Residual issue report | Remaining blockers resolved |
| 6 | FINALIZE | `ieee-academic-paper` (`format-convert`, `citation-check`) | IEEEtran package checklist | Camera-ready pass |
| 7 | SUBMISSION PACKAGE | orchestrator | Final file manifest and next actions | User confirms completion |

## Entry-point detection

- Vague idea, no research question → Stage 1 / `ieee-deep-research:socratic`.
- Clear topic, needs literature/baselines → Stage 1 / `ieee-deep-research:full` or `lit-review`.
- User wants to write/plan paper → Stage 2 / `ieee-academic-paper:plan`.
- Existing draft, needs critique → Stage 3.5 or 4 depending on request.
- Reviewer comments received → Stage 5 / `ieee-academic-paper:revision-coach`.
- Final formatting/camera-ready → Stage 6 / `ieee-academic-paper:format-convert` and `citation-check`.

When uncertain, ask one clarification question rather than dispatching the wrong stage.

## Project state card

Maintain this compact state when running the pipeline:

```markdown
## IEEE Pipeline State
- Target venue/type:
- Current stage:
- Paper title/topic:
- Contribution claim:
- Available evidence:
- Missing evidence:
- Baselines/datasets/metrics:
- Citation status:
- Review status:
- Final package status:
- Next recommended route:
```

## Mandatory integrity checks

Run before review and before finalization. Apply the anti-leakage, citation-verification, claim-alignment, and score-trajectory protocols where relevant:

- Claims have evidence or placeholders.
- Novelty claims are bounded.
- Citations are real, relevant, and IEEE-numbered.
- Baselines are current and fair.
- Datasets/splits/metrics are described.
- Ablations and robustness checks are adequate for the claim.
- Reproducibility details are sufficient.
- Limitations and threats to validity are explicit.
- Figures/tables are legible in IEEE two-column layout.
- No anonymous-review metadata remains in camera-ready files.
- Material gaps, citation mismatches, unsupported claims, and score regressions are surfaced as separate tables.

If any check fails, classify it:

- `BLOCKER` — likely rejection or submission failure.
- `HIGH` — should fix before review/submission.
- `MED` — useful improvement.
- `LOW` — polish.
- `AUTHOR_INPUT_NEEDED` — cannot proceed without user facts.

## Checkpoint format

After each major stage, output:

```markdown
━━━ Stage X Complete: <name> ━━━
Deliverables:
- ...

Risks:
- ...

Recommended next route:
- /skill:<skill> with mode <mode>

Decision needed:
1. Continue
2. Revise current stage
3. Pause / export state
4. Change target venue or scope
```

Do not continue to the next stage until the user approves, except for small diagnostic substeps within the same stage.

## Final IEEE package expectation

```text
main.tex
refs.bib
figures/
tables/
supplementary/
cover_letter.md              # if needed
response_to_reviewers.md     # if revision/resubmission
camera_ready_checklist.md
page_limit_check.md
README_build.md              # build notes / toolchain
```

## Default output

For pipeline requests, start with:

```markdown
## Detected Entry Point
## IEEE Pipeline State
## Recommended Route
## Immediate Questions
## Next Checkpoint
```

For Chinese input, respond in Traditional Chinese unless the manuscript or letter itself must be in English.
