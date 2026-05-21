---
name: ieee-academic-pipeline
description: End-to-end IEEE research-to-submission workflow for Pi. Use for complete IEEE paper projects from research scoping through manuscript drafting, technical review, revision, IEEEtran finalization, response letters, and camera-ready checks.
license: CC-BY-NC-4.0
metadata:
  status: scaffold
  related_skills:
    - ieee-deep-research
    - ieee-academic-paper
    - ieee-paper-reviewer
  upstream_references:
    - academic-research-skills: CC-BY-NC-4.0
    - nature-skills: MIT
---

# IEEE Academic Pipeline

This is a scaffold orchestrator skill for an IEEE-first research and manuscript workflow.

## Target stages

1. Research scoping and contribution definition
2. Literature and baseline mapping
3. Manuscript outline and IEEE section plan
4. Drafting with IEEE citation and LaTeX conventions
5. Technical integrity and reproducibility audit
6. IEEE-style peer review simulation
7. Revision and response-to-reviewer planning
8. IEEEtran final package generation
9. Camera-ready checklist

## Expected final package

```text
main.tex
refs.bib
figures/
tables/
supplementary/
cover_letter.md
response_to_reviewers.md
camera_ready_checklist.md
page_limit_check.md
```

## Future implementation notes

- Add pipeline state tracking.
- Add IEEE conference vs journal branch points.
- Add final package validation checklist.
