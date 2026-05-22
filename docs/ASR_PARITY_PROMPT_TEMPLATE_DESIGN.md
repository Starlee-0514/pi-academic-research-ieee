# ASR Parity Prompt-Template Design

Purpose: plan how this Pi package can move closer to upstream Academic Research Skills (ARS) while staying IEEE-first and Pi-native.

This document is a design note only. It does not implement runtime agent dispatch yet.

## Design stance

- Keep one Pi skill per broad workflow: `ieee-deep-research`, `ieee-academic-paper`, `ieee-paper-reviewer`, and `ieee-academic-pipeline`.
- Represent each upstream-style agent as one prompt template instead of a separate runtime agent.
- Use templates as lightweight, auditable role prompts that the skill can invoke or quote when a stage requires that role.
- Rewrite templates for IEEE workflows rather than directly copying upstream prompt bodies.
- Treat automated checks in phases:
  - **Prompt-layer now:** checklists, refusal rules, required tags, traceability tables.
  - **Script/API layer later:** Semantic Scholar, claim audits, schema linting, calibration runners, VLM figure checks.

## Proposed package layout

```text
templates/
  agents/
    deep-research/
      research-question.prompt.md
      research-architect.prompt.md
      bibliography.prompt.md
      source-verification.prompt.md
      synthesis.prompt.md
      meta-analysis.prompt.md
      risk-of-bias.prompt.md
      ethics-review.prompt.md
      socratic-mentor.prompt.md
      devils-advocate.prompt.md
      editor-in-chief.prompt.md
      monitoring.prompt.md
      report-compiler.prompt.md
    academic-paper/
      intake.prompt.md
      literature-strategist.prompt.md
      structure-architect.prompt.md
      argument-builder.prompt.md
      draft-writer.prompt.md
      citation-compliance.prompt.md
      abstract-bilingual.prompt.md
      peer-reviewer.prompt.md
      formatter.prompt.md
      socratic-mentor.prompt.md
      visualization.prompt.md
      revision-coach.prompt.md
    paper-reviewer/
      field-analyst.prompt.md
      eic.prompt.md
      methodology-reviewer.prompt.md
      domain-reviewer.prompt.md
      perspective-reviewer.prompt.md
      devils-advocate-reviewer.prompt.md
      editorial-synthesizer.prompt.md
    pipeline/
      pipeline-orchestrator.prompt.md
      state-tracker.prompt.md
      integrity-verification.prompt.md
      claim-ref-alignment-audit.prompt.md
      collaboration-depth.prompt.md
```

Recommended template frontmatter:

```yaml
---
name: ieee-draft-writer
upstream_role: academic-paper/agents/draft_writer_agent.md
source_license: CC-BY-NC-4.0
adaptation: IEEE-first rewritten prompt template
stage: academic-paper
inputs:
  - contribution_contract
  - verified_evidence_map
  - manuscript_outline
outputs:
  - section_draft
  - material_gap_log
hard_rules:
  - no_fabricated_citations
  - no_unprovided_results
  - mark_material_gap
---
```

## Skill invocation model

Each `SKILL.md` should gain a short **Prompt template registry** section, not full prompt bodies. Example:

```markdown
## Prompt template registry

When a stage needs a specialized role, use the matching template under `templates/agents/...` and keep the template output separate before synthesis.

- Research scoping → `templates/agents/deep-research/research-question.prompt.md`
- Source checks → `templates/agents/deep-research/source-verification.prompt.md`
- Drafting → `templates/agents/academic-paper/draft-writer.prompt.md`
- Review synthesis → `templates/agents/paper-reviewer/editorial-synthesizer.prompt.md`
```

This keeps the Pi extension simple: `/ars-*` still routes to a skill, and the skill decides which prompt templates to apply.

## Feature handling plan

| Upstream capability | Pi treatment | Priority | Notes |
|---|---|---:|---|
| 13 deep-research agents | One prompt template per agent role | HIGH | Start with research question, bibliography, source verification, synthesis, Socratic mentor. |
| 12 academic-paper agents | One prompt template per agent role | HIGH | Start with intake, structure, draft writer, citation compliance, formatter, revision coach. |
| 7 reviewer agents | One prompt template per reviewer role | HIGH | Keep lens outputs separate before editorial synthesis. |
| 5 pipeline agents | One prompt template per pipeline role | HIGH | State tracker and integrity verification are most important. |
| Anti-Leakage Protocol | Prompt-layer hard rule now; script checks later | HIGH | Draft writer must emit `[MATERIAL GAP]` rather than fill missing facts. |
| Citation verification | Prompt-layer three-status audit now; Semantic Scholar script later | HIGH | Use `VERIFIED`, `NOT_FOUND`, `MISMATCH`, plus `AUTHOR_INPUT_NEEDED` when no search access exists. |
| Claim-reference alignment | Prompt-layer table now; optional audit script later | HIGH | Track claim, citation, locator, support verdict, risk. |
| Data access levels | Add metadata to skill frontmatter | HIGH | `raw` for research, `redacted` for writing, `verified_only` for review/pipeline gates. |
| Task type metadata | Add metadata to skill frontmatter | HIGH | All current skills should be `open-ended`. |
| Writing Quality Check | Prompt template + checklist | MED | IEEE-focused lint: hype, vague claims, unsupported superlatives, AI stock phrases, overlong sentences. |
| Style Calibration | Optional prompt template | MED | Accept user-provided samples; never claim detector evasion. |
| Score trajectory | Prompt-layer revision table now; structured JSON later | MED | Track rubric dimensions across review/revision rounds. |
| Reviewer calibration | Design as optional input protocol | MED | Do not invent FNR/FPR without user-supplied labeled examples. |
| Venue disclosure | Prompt template + small policy table | MED | Ask for venue policy when unknown. |
| PRISMA / RoB / meta-analysis | Prompt templates first; computation scripts later | MED | Keep IEEE survey/systematic review orientation. |
| Cross-model verification | Document hook only | LOW | Pi package should not assume access to other providers. |
| VLM figure verification | Document hook only | LOW | Requires image-capable model/tooling. |
| Benchmark schema / repro lock | Add docs/schema later | LOW | Useful for transparency but not required for first parity pass. |
| Anti-context-rot splitting | Already addressed by templates | LOW | Template files keep skill files lean. |

## Implementation phases

### Phase 1 — Registry and minimal templates

1. Create the directory tree under `templates/agents/`.
2. Add high-priority templates only:
   - `deep-research`: research question, bibliography, source verification, synthesis, Socratic mentor.
   - `academic-paper`: intake, structure architect, draft writer, citation compliance, formatter, revision coach.
   - `paper-reviewer`: field analyst, methodology reviewer, domain reviewer, devil's advocate, editorial synthesizer.
   - `pipeline`: state tracker, integrity verification, pipeline orchestrator.
3. Update each `SKILL.md` with a template registry and dispatch rules.
4. Add `data_access_level` and `task_type` metadata to skill frontmatter.

### Phase 2 — Safety and integrity protocols

1. Add Anti-Leakage and `[MATERIAL GAP]` rules to writing templates.
2. Add citation verification and claim-reference alignment templates.
3. Add score trajectory output to reviewer/revision templates.
4. Add an IEEE writing quality checklist template.

### Phase 3 — Optional automation

1. Add scripts for schema linting and frontmatter consistency.
2. Add optional Semantic Scholar lookup helper.
3. Add optional claim-audit data structure.
4. Add optional VLM figure verification protocol when Pi has suitable tooling.

## Source references

The design is adapted structurally from the local upstream reference clone:

- `ref_repos/academic-research-skills/docs/ARCHITECTURE.md` — stage matrix, data access flow, gates, and agent inventory.
- `ref_repos/academic-research-skills/deep-research/agents/` — upstream research agent role inventory.
- `ref_repos/academic-research-skills/academic-paper/agents/` — upstream writing agent role inventory.
- `ref_repos/academic-research-skills/academic-paper-reviewer/agents/` — upstream reviewer agent role inventory.
- `ref_repos/academic-research-skills/academic-pipeline/agents/` — upstream pipeline agent role inventory.
- `ref_repos/academic-research-skills/academic-paper/references/anti_leakage_protocol.md` — anti-leakage concept.
- `ref_repos/academic-research-skills/academic-paper/references/writing_quality_check.md` — writing quality concept.
- `ref_repos/academic-research-skills/academic-pipeline/references/score_trajectory_protocol.md` — score trajectory concept.
- `ref_repos/academic-research-skills/deep-research/references/semantic_scholar_api_protocol.md` — citation verification concept.

All referenced upstream material is CC BY-NC 4.0. This design rewrites the approach for an IEEE-first Pi package and should remain non-commercial unless separate permission is obtained.
