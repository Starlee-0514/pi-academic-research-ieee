# Templates

Project-specific IEEE templates live here.

## Prompt-layer protocols

- `protocols/anti-leakage.prompt.md` — marks missing research material as `[MATERIAL GAP]` instead of filling from model memory.
- `protocols/citation-verification.prompt.md` — standardizes citation metadata checks and verdicts.
- `protocols/claim-alignment.prompt.md` — maps manuscript claims to evidence, locators, and support verdicts.
- `protocols/score-trajectory.prompt.md` — tracks review/revision score movement and regressions.

## Agent prompt templates

Phase 1 agent templates live under `agents/`:

- `agents/deep-research/` — research question, bibliography, source verification, synthesis, and Socratic mentor roles.
- `agents/academic-paper/` — intake, structure, draft writer, citation compliance, formatter, and revision coach roles.
- `agents/paper-reviewer/` — field analyst, methodology reviewer, domain reviewer, devil's advocate, and editorial synthesizer roles.
- `agents/pipeline/` — orchestrator, state tracker, and integrity verification roles.

Each template is an IEEE-first rewritten prompt role adapted structurally from upstream ARS agent inventories.

## Planned files

- `ieee_conference_template.tex`
- `ieee_journal_template.tex`
- `response_to_reviewers.md`
- `camera_ready_checklist.md`

Avoid copying upstream templates without preserving their license and attribution.
