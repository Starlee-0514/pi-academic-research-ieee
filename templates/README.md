# Templates

Project-specific IEEE templates live here.

## Prompt-layer protocols

- `protocols/anti-leakage.prompt.md` — marks missing research material as `[MATERIAL GAP]` instead of filling from model memory.
- `protocols/citation-verification.prompt.md` — standardizes citation metadata checks and verdicts.
- `protocols/claim-alignment.prompt.md` — maps manuscript claims to evidence, locators, and support verdicts.
- `protocols/score-trajectory.prompt.md` — tracks review/revision score movement and regressions.

## Agent prompt templates

Phase 1 agent templates live under `agents/`:

- `agents/deep-research/` — research question, research architecture, bibliography, source verification, synthesis, systematic-review, ethics, adversarial review, monitoring, and reporting roles.
- `agents/academic-paper/` — intake, literature strategy, structure, argument, draft writer, citation compliance, abstract, internal review, formatter, Socratic planning, visualization, and revision roles.
- `agents/paper-reviewer/` — field analyst, EIC, methodology reviewer, domain reviewer, perspective reviewer, devil's advocate, and editorial synthesizer roles.
- `agents/pipeline/` — orchestrator, state tracker, integrity verification, claim-reference audit, and collaboration-depth roles.

Each template is an IEEE-first rewritten prompt role adapted structurally from upstream ARS agent inventories.

## Planned files

- `ieee_conference_template.tex`
- `ieee_journal_template.tex`
- `response_to_reviewers.md`
- `camera_ready_checklist.md`

Avoid copying upstream templates without preserving their license and attribution.
