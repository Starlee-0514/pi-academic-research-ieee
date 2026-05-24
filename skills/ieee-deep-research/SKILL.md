---
name: ieee-deep-research
description: >
  IEEE-oriented deep research workflow for Pi. Use for technical literature review, related work mapping, systematic evidence collection, baseline identification, dataset/method comparison, claim verification, Socratic research scoping, and systematic review planning for IEEE-style papers. Supports ASR-compatible modes: full, quick, review, lit-review, fact-check, socratic, systematic-review.
license: CC-BY-NC-4.0
metadata:
  status: active-draft
  data_access_level: raw
  task_type: open-ended
  upstream_references:
    - academic-research-skills: CC-BY-NC-4.0
    - nature-skills: MIT
  source_ledger: ../../references/source-ledger.md
---

# IEEE Deep Research

IEEE-first research workflow for turning a topic, claim set, or draft idea into a rigorous evidence base for an IEEE manuscript.

## Core rules

1. Do not fabricate papers, datasets, metrics, DOI metadata, or experimental results.
2. Prefer peer-reviewed IEEE, ACM, USENIX, NeurIPS/ICML/ICLR/CVPR/ACL-style venues where relevant; use arXiv as preprint evidence, not final authority.
3. Track every source by what it supports: background, method, dataset, metric, baseline, limitation, or contradiction.
4. For IEEE writing handoff, produce matrices and claim-evidence maps rather than narrative-only summaries.
5. If search access is unavailable, state limits and provide a reproducible search plan instead of pretending completeness.

## Safety protocol registry

Use these prompt-layer protocols when the task requires them:

- Citation verification: `../../templates/protocols/citation-verification.prompt.md`
- Claim-reference alignment: `../../templates/protocols/claim-alignment.prompt.md`

If a protocol cannot be fully executed because search/source access is unavailable, disclose the limit and return `AUTHOR_INPUT_NEEDED`; do not pretend verification succeeded.

## Agent prompt template registry

Use one role template per specialized research task, keeping outputs separate before synthesis:

- RQ scoping / contribution discovery: `../../templates/agents/deep-research/research-question.prompt.md`
- Research strategy and method blueprint: `../../templates/agents/deep-research/research-architect.prompt.md`
- Source discovery and literature set construction: `../../templates/agents/deep-research/bibliography.prompt.md`
- Citation/source metadata checks: `../../templates/agents/deep-research/source-verification.prompt.md`
- Related-work synthesis and claim-evidence mapping: `../../templates/agents/deep-research/synthesis.prompt.md`
- Systematic-review quantitative synthesis: `../../templates/agents/deep-research/meta-analysis.prompt.md`
- Bias/threat assessment: `../../templates/agents/deep-research/risk-of-bias.prompt.md`
- Ethics/security/privacy review: `../../templates/agents/deep-research/ethics-review.prompt.md`
- Guided exploratory dialogue: `../../templates/agents/deep-research/socratic-mentor.prompt.md`
- Adversarial challenge: `../../templates/agents/deep-research/devils-advocate.prompt.md`
- Publishability gate: `../../templates/agents/deep-research/editor-in-chief.prompt.md`
- Session drift monitoring: `../../templates/agents/deep-research/monitoring.prompt.md`
- Final research handoff: `../../templates/agents/deep-research/report-compiler.prompt.md`

## Mode dispatch

| Mode | Template order |
|---|---|
| `socratic` | socratic-mentor → research-question → devils-advocate → report-compiler |
| `quick` | research-question → bibliography → source-verification → synthesis |
| `full` | research-question → research-architect → bibliography → source-verification → synthesis → devils-advocate → editor-in-chief → report-compiler |
| `lit-review` | bibliography → source-verification → synthesis → report-compiler |
| `fact-check` | source-verification → synthesis |
| `review` | source-verification → risk-of-bias → devils-advocate → editor-in-chief |
| `systematic-review` | research-question → bibliography → source-verification → risk-of-bias → meta-analysis → synthesis → report-compiler |

Use `monitoring` as an advisory template for long-running research sessions or when the user changes scope midstream.

## ASR-compatible modes

| Mode | Use when | Output |
|---|---|---|
| `full` | User has a clear technical topic/RQ | Research brief, evidence map, related-work matrix, IEEE paper handoff |
| `quick` | User needs fast orientation | 500–1500 word technical brief + next searches |
| `review` | User provides a paper/source to assess | Source quality and citation-use review |
| `lit-review` | User needs related work | Thematic related-work synthesis + comparison matrix |
| `fact-check` | User provides claims | Claim-by-claim verification table |
| `socratic` | User is uncertain or exploring | Guided RQ/contribution discovery |
| `systematic-review` | User wants structured review/meta-analysis | Protocol, search strings, inclusion criteria, PRISMA-style plan |

When ambiguous between `socratic` and `full`, prefer `socratic`.

## Intake contract

Collect the minimum missing information:

- research area and target IEEE venue/type;
- candidate problem statement or claim;
- known papers, datasets, baselines, codebases;
- desired output mode;
- search constraints: years, venues, databases, inclusion/exclusion rules;
- whether the result feeds `ieee-academic-paper`.

## Research workflow

### Phase 1 — Scope and contribution

Produce:

- research question or technical objective;
- in-scope / out-of-scope boundaries;
- likely IEEE contribution type: algorithm, system, dataset, benchmark, theory, survey, application, reproducibility study;
- expected evidence needed for acceptance.

### Phase 2 — Search and source triage

Track:

- databases/venues searched;
- query strings and synonyms;
- inclusion/exclusion criteria;
- source quality tier;
- source role in the manuscript.

Use this table by default:

| Source | Venue/Year | Problem | Method | Dataset | Metrics | Baselines | Code/Data | Supports | Risks |
|---|---|---|---|---|---|---|---|---|---|

### Phase 3 — Method and baseline mapping

For technical papers, identify:

- standard baselines and why they are fair;
- missing baselines that reviewers may expect;
- datasets and splits;
- evaluation metrics and statistical/uncertainty needs;
- ablations and sensitivity tests;
- complexity, runtime, memory, and deployment constraints.

### Phase 4 — Synthesis

Produce an IEEE-oriented synthesis:

- grouped related-work themes;
- gap statement;
- positioning table;
- claim-evidence map;
- contradictions or weak support;
- recommended manuscript sections and figures/tables.

### Phase 5 — Verification and handoff

Before handing off to `ieee-academic-paper`, apply the citation-verification and claim-alignment protocols, then flag:

- unsupported novelty claims;
- citation-support mismatches;
- fabricated/uncertain bibliographic metadata;
- outdated baselines;
- dataset leakage or unfair comparison risks;
- reproducibility gaps.

## Mode-specific outputs

### `fact-check`

Use:

| Claim | Required support | Candidate evidence | Verdict | Risk | Fix |
|---|---|---|---|---|---|

Verdicts: `SUPPORTED`, `PARTIAL`, `UNSUPPORTED`, `CONTRADICTED`, `AUTHOR_INPUT_NEEDED`.

### `socratic`

Ask one question at a time when needed. Converge only after the user can state:

- the problem;
- the technical gap;
- the proposed contribution;
- the evidence plan;
- the likely reviewer objection.

### `systematic-review`

Return a protocol:

- review question;
- databases/venues;
- search strings;
- inclusion/exclusion criteria;
- screening plan;
- extraction fields;
- bias/threat assessment;
- synthesis/meta-analysis feasibility;
- PRISMA-style reporting plan.

## Default final structure

```markdown
## Mode
## Scope
## Search / Evidence Limits
## Findings
## Related-work Matrix
## Claim-Evidence Map
## IEEE Reviewer Risks
## Handoff to ieee-academic-paper
## AUTHOR_INPUT_NEEDED
```

For Chinese input, respond in Traditional Chinese unless the requested manuscript text must be English.
