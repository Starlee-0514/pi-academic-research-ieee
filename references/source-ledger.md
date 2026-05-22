# Source Adaptation Ledger

Date started: 2026-05-22

Use this ledger whenever upstream material is copied, closely adapted, or used as a structural source for this IEEE-first Pi package.

| Date | Target file | Upstream source path | License | Use type | Notes |
|---|---|---|---|---|---|
| 2026-05-22 | `extensions/index.ts` | `ref_repos/academic-research-skills/MODE_REGISTRY.md` | CC BY-NC 4.0 | Adapted structure | ASR mode taxonomy and route names were used to create native Pi `/ars-*` command routing for IEEE skills. |
| 2026-05-22 | `skills/ieee-academic-paper/SKILL.md` | `ref_repos/academic-research-skills/academic-paper/SKILL.md`; `ref_repos/academic-research-skills/MODE_REGISTRY.md` | CC BY-NC 4.0 | Adapted structure | Rewrote the academic-paper workflow as an IEEE-first skill while preserving the ASR mode logic, phase discipline, and human-checkpoint pattern. |
| 2026-05-22 | `skills/ieee-deep-research/SKILL.md` | `ref_repos/academic-research-skills/deep-research/SKILL.md`; `ref_repos/academic-research-skills/MODE_REGISTRY.md` | CC BY-NC 4.0 | Adapted structure | Rewrote the deep-research mode and phase logic as IEEE-oriented evidence mapping, baseline discovery, and claim verification. |
| 2026-05-22 | `skills/ieee-paper-reviewer/SKILL.md` | `ref_repos/academic-research-skills/academic-paper-reviewer/SKILL.md`; `ref_repos/academic-research-skills/MODE_REGISTRY.md` | CC BY-NC 4.0 | Adapted structure | Rewrote the reviewer mode and multi-perspective logic as an IEEE-style technical review rubric and decision workflow. |
| 2026-05-22 | `skills/ieee-academic-pipeline/SKILL.md` | `ref_repos/academic-research-skills/academic-pipeline/SKILL.md`; `ref_repos/academic-research-skills/MODE_REGISTRY.md` | CC BY-NC 4.0 | Adapted structure | Rewrote the pipeline state-machine concept as an IEEE-specific orchestrator with stage routing, checkpoints, integrity gates, and camera-ready package expectations. |
| 2026-05-22 | `docs/ASR_PARITY_PROMPT_TEMPLATE_DESIGN.md` | `ref_repos/academic-research-skills/docs/ARCHITECTURE.md`; `ref_repos/academic-research-skills/deep-research/agents/`; `ref_repos/academic-research-skills/academic-paper/agents/`; `ref_repos/academic-research-skills/academic-paper-reviewer/agents/`; `ref_repos/academic-research-skills/academic-pipeline/agents/`; selected upstream protocol references listed in the design doc | CC BY-NC 4.0 | Adapted structure | Converted the upstream agent inventory and safety/protocol concepts into an IEEE-first prompt-template migration design without copying upstream prompt bodies. |
| 2026-05-22 | `templates/protocols/anti-leakage.prompt.md`; `skills/ieee-academic-paper/SKILL.md`; `skills/ieee-academic-pipeline/SKILL.md` | `ref_repos/academic-research-skills/academic-paper/references/anti_leakage_protocol.md` | CC BY-NC 4.0 | Adapted structure | Rewrote anti-leakage as an IEEE prompt-layer protocol with `[MATERIAL GAP]` output requirements. |
| 2026-05-22 | `templates/protocols/citation-verification.prompt.md`; `skills/ieee-deep-research/SKILL.md`; `skills/ieee-academic-paper/SKILL.md`; `skills/ieee-academic-pipeline/SKILL.md` | `ref_repos/academic-research-skills/deep-research/references/semantic_scholar_api_protocol.md` | CC BY-NC 4.0 | Adapted structure | Rewrote citation verification as prompt-layer statuses and audit table; no API helper implemented yet. |
| 2026-05-22 | `templates/protocols/claim-alignment.prompt.md`; all IEEE `SKILL.md` files | `ref_repos/academic-research-skills/academic-pipeline/references/claim_verification_protocol.md` | CC BY-NC 4.0 | Adapted structure | Rewrote claim-reference alignment as an IEEE support-verdict protocol. |
| 2026-05-22 | `templates/protocols/score-trajectory.prompt.md`; `skills/ieee-academic-paper/SKILL.md`; `skills/ieee-paper-reviewer/SKILL.md`; `skills/ieee-academic-pipeline/SKILL.md` | `ref_repos/academic-research-skills/academic-pipeline/references/score_trajectory_protocol.md` | CC BY-NC 4.0 | Adapted structure | Rewrote score trajectory as an IEEE review/revision regression tracking protocol. |
| 2026-05-22 | `templates/agents/**`; all IEEE `SKILL.md` files; `scripts/lint-skill-metadata.mjs` | `ref_repos/academic-research-skills/deep-research/agents/`; `ref_repos/academic-research-skills/academic-paper/agents/`; `ref_repos/academic-research-skills/academic-paper-reviewer/agents/`; `ref_repos/academic-research-skills/academic-pipeline/agents/` | CC BY-NC 4.0 | Adapted structure | Rewrote selected upstream agent-role inventories as IEEE-first prompt templates and connected them through skill registries. |

## Use type definitions

- **Copied:** substantial text/code copied with minimal change.
- **Adapted structure:** upstream workflow, taxonomy, or checklist structure reused, but wording rewritten for this package.
- **Conceptual reference:** upstream reviewed for ideas only; no close structure or text reuse.
