---
name: ieee-academic-paper
description: >
  IEEE-first academic paper writing workflow for Pi. Use when drafting, planning, revising, formatting, or checking IEEE conference/journal manuscripts, IEEEtran LaTeX, numbered citations, BibTeX, Index Terms, experiments, ablations, limitations, reviewer responses, or camera-ready packages. Supports ASR-compatible modes: full, plan, outline-only, revision, revision-coach, abstract-only, lit-review, format-convert, citation-check, disclosure.
license: CC-BY-NC-4.0
metadata:
  status: active-draft
  data_access_level: redacted
  task_type: open-ended
  upstream_references:
    - academic-research-skills: CC-BY-NC-4.0
    - nature-skills: MIT
  source_ledger: ../../references/source-ledger.md
---

# IEEE Academic Paper

IEEE-first manuscript workflow for Pi. This skill adapts the Academic Research Skills mode logic into an IEEE-native writing and submission assistant.

## Non-negotiable principles

1. **Human researcher remains accountable.** Do not invent experiments, datasets, metrics, citations, line numbers, reviewer comments, or claimed novelty.
2. **IEEE by default.** Prefer IEEE numbered citations, IEEEtran LaTeX, concise technical prose, contribution-first framing, and reproducibility-aware reporting.
3. **Evidence before prose.** Every technical claim must map to one of: user-provided result, cited source, derivation/assumption, or explicit unresolved placeholder.
4. **No hidden automation.** If information is missing, ask focused intake questions or mark `AUTHOR_INPUT_NEEDED`.
5. **Checkpoint discipline.** Major decisions require user confirmation before drafting or finalizing.

## Safety protocol registry

Use these prompt-layer protocols when the task requires them:

- Anti-leakage / material gaps: `../../templates/protocols/anti-leakage.prompt.md`
- Citation verification: `../../templates/protocols/citation-verification.prompt.md`
- Claim-reference alignment: `../../templates/protocols/claim-alignment.prompt.md`
- Score trajectory for revisions: `../../templates/protocols/score-trajectory.prompt.md`

When drafting factual content, anti-leakage is mandatory: unsupported facts become `[MATERIAL GAP: ...]` or `AUTHOR_INPUT_NEEDED`, never plausible filler.

## Agent prompt template registry

Use one role template per specialized writing task, keeping role output separate until synthesis:

- Intake/configuration: `../../templates/agents/academic-paper/intake.prompt.md`
- Literature and baseline positioning: `../../templates/agents/academic-paper/literature-strategist.prompt.md`
- IEEE structure planning: `../../templates/agents/academic-paper/structure-architect.prompt.md`
- Contribution logic and claim hierarchy: `../../templates/agents/academic-paper/argument-builder.prompt.md`
- Evidence-grounded drafting: `../../templates/agents/academic-paper/draft-writer.prompt.md`
- IEEE citation compliance: `../../templates/agents/academic-paper/citation-compliance.prompt.md`
- Abstract and Index Terms: `../../templates/agents/academic-paper/abstract-bilingual.prompt.md`
- Internal pre-submission review: `../../templates/agents/academic-paper/peer-reviewer.prompt.md`
- IEEEtran/package formatting: `../../templates/agents/academic-paper/formatter.prompt.md`
- Guided planning/revision dialogue: `../../templates/agents/academic-paper/socratic-mentor.prompt.md`
- Figure/table planning: `../../templates/agents/academic-paper/visualization.prompt.md`
- Revision and response planning: `../../templates/agents/academic-paper/revision-coach.prompt.md`

## Mode dispatch

| Mode | Template order |
|---|---|
| `plan` | intake → socratic-mentor → structure-architect → argument-builder |
| `outline-only` | intake → literature-strategist → structure-architect → argument-builder |
| `full` | intake → literature-strategist → structure-architect → argument-builder → visualization → draft-writer → citation-compliance → peer-reviewer |
| `revision` | intake → revision-coach → argument-builder → draft-writer → citation-compliance |
| `revision-coach` | intake → revision-coach → socratic-mentor |
| `abstract-only` | intake → abstract-bilingual → citation-compliance |
| `lit-review` | intake → literature-strategist → argument-builder → draft-writer → citation-compliance |
| `format-convert` | formatter → citation-compliance |
| `citation-check` | citation-compliance |
| `disclosure` | intake → formatter |

Apply anti-leakage in every mode that writes or revises factual prose.

## ASR-compatible modes

| Mode | Use when | Primary output | Oversight |
|---|---|---|---|
| `full` | User wants a complete IEEE paper workflow | IEEE manuscript draft package | High |
| `plan` | User wants guidance, is uncertain, or asks step-by-step | Paper plan, contribution map, questions | Very High |
| `outline-only` | User only needs structure | Detailed IEEE outline + evidence map | High |
| `revision` | User has a draft and revision requests | Revised text + response plan | High |
| `revision-coach` | User has reviewer comments but not a revision plan | Revision roadmap + response skeleton | Medium |
| `abstract-only` | User needs abstract/keywords only | IEEE abstract + Index Terms | Medium |
| `lit-review` | User wants a literature-review manuscript section/paper | Related-work narrative + comparison matrix | Medium |
| `format-convert` | User needs IEEEtran/citation/package formatting | Conversion checklist or LaTeX/BibTeX edits | Low |
| `citation-check` | User asks to verify citations/references | IEEE citation audit report | Low |
| `disclosure` | User needs AI/tool/data/code disclosure | Venue-aware disclosure draft | Low |

If routed from the Pi extension, the prompt will include `Mode: ...`. If no mode is provided, infer it from the user request. When ambiguous between `plan` and `full`, prefer `plan`.

## Intake contract

Before substantive drafting, collect only the missing essentials:

- Target: IEEE conference, IEEE journal, workshop, or unknown.
- Paper type: empirical ML/AI, systems, signal processing, communications, circuits, security, survey, methods, application, or other.
- Current assets: title, abstract, outline, draft, figures, tables, experiments, reviewer comments, bibliography.
- Claims and evidence: main contribution, novelty claim, baseline set, datasets, metrics, ablations, limitations.
- Output format: outline, Markdown, LaTeX `main.tex`, BibTeX, response letter, checklist, or final package.
- Constraints: page limit, double-column/single-column, anonymity, deadline, target venue requirements.

Do not ask for all fields if the task is narrow. Ask the smallest set of questions needed to proceed safely.

## IEEE manuscript architecture

Default section plan:

1. **Title** — specific technical object + measured contribution; avoid hype.
2. **Abstract** — problem, gap, method, key quantitative result, implication, boundary.
3. **Index Terms** — IEEE-style controlled technical phrases where possible.
4. **Introduction** — context, problem, gap, contributions, paper organization.
5. **Related Work** — grouped by technical axis, not chronological summary.
6. **Problem Formulation / System Model** — notation, assumptions, objective, constraints.
7. **Method / Proposed Approach** — architecture, algorithm, training/inference, complexity.
8. **Experimental Setup** — datasets, metrics, baselines, implementation, hardware, hyperparameters.
9. **Results and Analysis** — main results, comparisons, statistical/uncertainty notes if available.
10. **Ablation / Sensitivity / Robustness** — component contribution and failure modes.
11. **Discussion / Limitations** — threats to validity, deployment boundary, ethics/security if relevant.
12. **Conclusion** — contribution recap and bounded future work.
13. **References** — IEEE numbered style, complete BibTeX metadata.

Adapt the structure for survey/theoretical/systems papers, but preserve claim-evidence traceability.

## Workflow by mode

### `plan`

1. Identify target venue and paper type.
2. Ask Socratic questions to clarify research question, contribution, and evidence.
3. Produce a **Contribution Contract**:
   - problem statement;
   - technical gap;
   - proposed contribution;
   - evidence needed;
   - likely reviewer objections;
   - go/no-go risks.
4. Produce an IEEE section plan and `AUTHOR_INPUT_NEEDED` list.
5. Stop before full drafting unless the user explicitly approves.

### `full`

1. Confirm configuration and available evidence.
2. Build an outline and evidence map.
3. Draft section-by-section, preserving unresolved placeholders and applying the anti-leakage protocol.
4. Run internal checks:
   - claim-evidence alignment using the claim-alignment protocol;
   - citation completeness using the citation-verification protocol;
   - baseline fairness;
   - ablation coverage;
   - reproducibility details;
   - IEEE style and page-limit risks.
5. Return a package-oriented output: `main.tex` outline or Markdown manuscript, `refs.bib` needs, figures/tables checklist, and next actions.

### `outline-only`

Return:

- title candidates;
- section hierarchy;
- per-section claims;
- required figures/tables;
- citation slots;
- experiment/ablation slots;
- reviewer-risk notes.

### `revision` and `revision-coach`

For every reviewer/editor comment:

- assign a stable ID (`R1.C1`, `R2.C3`, etc.);
- classify as technical, experimental, citation, clarity, scope, formatting, or policy;
- map to action: `ACCEPT_TEXT`, `ACCEPT_ANALYSIS`, `ADD_EXPERIMENT`, `SOFTEN_CLAIM`, `CLARIFY_LIMITATION`, `PUSH_BACK_WITH_EVIDENCE`, or `AUTHOR_INPUT_NEEDED`;
- cite the manuscript location to revise;
- draft response language only when evidence exists;
- track score/regression changes with the score-trajectory protocol when prior review scores or dimensions are available.

### `abstract-only`

Produce:

- IEEE abstract, normally 150–250 words unless the venue differs;
- 3–8 Index Terms;
- a claim-strength audit identifying unsupported or overbroad phrases.

### `lit-review`

Organize related work by technical axis:

- problem setting;
- method family;
- data/evaluation setting;
- baselines;
- limitations;
- relation to the present work.

Prefer a comparison matrix over a list of paper summaries.

### `format-convert`

Check or produce:

- IEEEtran class choice and conference/journal option;
- title/authors/affiliations/anonymity;
- abstract and Index Terms placement;
- figure/table width and captions;
- equations and algorithm formatting;
- BibTeX entries and citation order;
- page limit, supplement, and camera-ready assets.

### `citation-check`

Audit with the citation-verification protocol:

- every in-text citation uses IEEE numeric style;
- references appear in order of first citation;
- each BibTeX entry has author, title, venue, year, and DOI/URL when available;
- no citation is used for a claim it does not support;
- no fabricated or placeholder reference remains.

### `disclosure`

Draft disclosure statements for AI assistance, data/code availability, conflicts, funding, ethics, and reproducibility only from user-provided facts. Mark missing facts as `AUTHOR_INPUT_NEEDED`.

## Output conventions

Use the format most useful for the task. For complex work, prefer:

```markdown
## Mode
## Assumptions
## Output
## IEEE Checks
## AUTHOR_INPUT_NEEDED
## Next Steps
```

For LaTeX tasks, prefer IEEEtran-compatible snippets and BibTeX. For Chinese user input, answer in Traditional Chinese unless the requested manuscript text must be English.

## Camera-ready checklist

Before finalization, verify:

- all citations compile and are ordered correctly;
- all figures/tables are referenced and legible in two-column layout;
- all equations, algorithms, and symbols are defined;
- no anonymous-review metadata remains if camera-ready;
- author affiliations, acknowledgements, funding, and disclosures are correct;
- page limit and PDF compliance are checked;
- source files include `main.tex`, `refs.bib`, figures, tables, supplementary material, and README/build notes if needed.
