# Upstream Content Audit

Date: 2026-05-22

This file records the working reuse policy for developing the IEEE-first Pi skills from the two local reference repositories. It is a practical project note, not legal advice.

## Summary

Both upstream projects can be used when their license terms are preserved:

| Upstream | Local source path | License | Practical use in this package |
|---|---|---|---|
| Academic Research Skills by Cheng-I Wu | `ref_repos/academic-research-skills/` | CC BY-NC 4.0 | May be copied or adapted for non-commercial use with attribution, modification notice, license notice, and no added restrictions. |
| nature-skills by Yuan Yizhe | `ref_repos/nature-skills/` | MIT | May be copied, adapted, and redistributed if the copyright and MIT permission notice are preserved. |

## Project policy

1. Keep this package `private: true` and `CC-BY-NC-4.0` while it may include or adapt CC BY-NC 4.0 material.
2. Prefer IEEE-specific rewrites rather than direct prompt copying unless reuse is clearly beneficial.
3. When copying or closely adapting upstream text, templates, scripts, or structured checklists:
   - record the exact source path in `DEVLOG.md`;
   - preserve attribution in `NOTICE.md` or the adapted file;
   - mark whether the content is copied, adapted, or only conceptually referenced;
   - keep non-commercial restrictions for Academic Research Skills-derived material.
4. MIT-derived material from `nature-skills` must retain the MIT copyright and permission notice if substantial portions are copied.
5. Do not treat `ref_repos/` as vendored package content; it remains local-only and gitignored.

## Initial source areas to consult

### Academic Research Skills — CC BY-NC 4.0

- `ref_repos/academic-research-skills/academic-paper/SKILL.md`
- `ref_repos/academic-research-skills/academic-paper/references/`
- `ref_repos/academic-research-skills/academic-paper/templates/`
- `ref_repos/academic-research-skills/academic-paper-reviewer/SKILL.md`
- `ref_repos/academic-research-skills/academic-paper-reviewer/references/`
- `ref_repos/academic-research-skills/academic-pipeline/`

### nature-skills — MIT

- `ref_repos/nature-skills/skills/nature-writing/`
- `ref_repos/nature-skills/skills/nature-polishing/`
- `ref_repos/nature-skills/skills/nature-response/`
- `ref_repos/nature-skills/skills/nature-academic-search/`
- `ref_repos/nature-skills/skills/nature-citation/`
- `ref_repos/nature-skills/skills/nature-data/`

## Implementation direction

The first implementation pass should create IEEE-native workflow bodies and reference checklists for:

1. `skills/ieee-academic-paper/SKILL.md`
2. `skills/ieee-paper-reviewer/SKILL.md`
3. `skills/ieee-deep-research/SKILL.md`
4. `skills/ieee-academic-pipeline/SKILL.md`

Recommended first deliverables:

- IEEE manuscript workflow and section checklist.
- IEEE review rubric covering novelty, technical soundness, baselines, ablations, reproducibility, limitations, and venue fit.
- IEEE research matrix for claims, datasets, metrics, baselines, and citation evidence.
- Camera-ready package checklist for IEEEtran submissions.
