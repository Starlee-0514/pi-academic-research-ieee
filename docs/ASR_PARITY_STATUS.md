# ASR Parity Status

This document summarizes the current differences between this IEEE-first Pi package and the local upstream reference `ref_repos/academic-research-skills`.

## Current parity level

This package is now **prompt-layer and command-layer compatible** with the main ASR workflows, but it is **not yet full automation parity** with upstream ARS.

- Core Pi routes: 19 `/ars-*` skill routes.
- Agent prompt templates: 37 IEEE-first templates under `templates/agents/`.
- Safety protocol templates: 4 prompt-layer protocols under `templates/protocols/`.
- Tests: `npm test` validates routes, skill metadata, safety protocol references, and agent template registries.

## Command parity

| Upstream-style command | Current status | Notes |
|---|---|---|
| `/ars-plan` | Supported | Routes to `ieee-academic-paper:plan`. |
| `/ars-full` | Supported | Alias for full IEEE paper drafting. |
| `/ars-paper` | Pi extension addition | Same target as `/ars-full`, clearer local name. |
| `/ars-outline` | Supported | Routes to `outline-only`. |
| `/ars-lit-review` | Supported | Routes to IEEE deep research. |
| `/ars-abstract` | Supported | IEEE abstract + Index Terms. |
| `/ars-revision` | Supported | Full revision workflow. |
| `/ars-revision-coach` | Supported | Reviewer-comment coaching workflow. |
| `/ars-citation-check` | Supported | IEEE citation audit workflow. |
| `/ars-format-convert` | Supported | IEEEtran/package formatting guidance. |
| `/ars-disclosure` | Supported | Venue-aware disclosure drafting. |
| `/ars-reviewer` | Supported | Alias for full IEEE reviewer mode. |
| `/ars-review` | Pi extension addition | Same target as `/ars-reviewer`, clearer local name. |
| `/ars-mark-read` | Lightweight support | Stores read keys in `.pi/ieee-academic-research-read-state.json`. |
| `/ars-unmark-read` | Lightweight support | Removes keys from the local read-state file. |

Additional Pi-specific routes include `/ars-research`, `/ars-quick`, `/ars-fact-check`, `/ars-methodology`, `/ars-rereview`, and `/ars-pipeline`.

## Agent/template parity

This package uses one prompt template per upstream-style agent role instead of separate runtime agents.

| Area | Upstream reference | Current package |
|---|---:|---:|
| Deep research agents | 14 files in the local reference agent directory | 13 IEEE-first templates; timeline extraction is folded into bibliography/synthesis rather than separate. |
| Academic paper agents | 12 | 12 IEEE-first templates. |
| Paper reviewer agents | 7 | 7 IEEE-first templates. |
| Pipeline agents | 5 | 5 IEEE-first templates. |

## Safety protocol parity

| Capability | Current status | Automation level |
|---|---|---|
| Anti-leakage / material gap tagging | Supported | Prompt-layer protocol. |
| Citation verification statuses | Supported | Prompt-layer protocol + optional Semantic Scholar helper. |
| Claim-reference alignment | Supported | Prompt-layer protocol. |
| Score trajectory | Supported | Prompt-layer protocol. |
| Semantic Scholar verification | Partial | `npm run verify:citation -- <title>` performs a single-title lookup. Not wired into Pi runtime. |
| Claim audit pipeline | Not yet | Planned optional automation. |
| VLM figure verification | Not yet | Planned optional automation. |
| Benchmark/repro-lock/schema CI | Partial | Skill metadata/template lint exists; upstream-style schemas not yet ported. |

## Main remaining gaps

1. **Automation depth** — upstream has many Python CI/audit scripts; this package currently keeps most checks as prompt-layer protocols.
2. **Corpus adapters** — upstream has Zotero/Obsidian/folder adapters; this package has only a design plan for IEEE ingestion.
3. **Claim audit runtime** — upstream has claim-audit finalizers and calibration scripts; this package has protocol scaffolding only.
4. **Temporal/provenance hardening** — upstream has newer trust/provenance checks; this package records attribution and source ledgers but does not yet validate all provenance schemas.
5. **Full process reports** — upstream includes process summary/collaboration-depth reporting; this package has templates but not a generated report pipeline.

## Recommended next implementation order

1. Add command/route lint coverage for all upstream-compatible aliases.
2. Expand Semantic Scholar helper into citation-table batch verification.
3. Add source-ledger and NOTICE lint.
4. Add claim-audit JSON output schema.
5. Add Zotero-first ingestion MVP from `docs/IEEE_INGESTION_PLAN.md`.
