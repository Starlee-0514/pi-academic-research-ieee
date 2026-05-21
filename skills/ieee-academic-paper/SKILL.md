---
name: ieee-academic-paper
description: IEEE-first academic paper writing workflow for Pi. Use when drafting, revising, formatting, or checking IEEE conference/journal manuscripts, IEEEtran LaTeX, numbered citations, BibTeX, Index Terms, experiments, ablations, limitations, or camera-ready packages.
license: CC-BY-NC-4.0
metadata:
  status: scaffold
  upstream_references:
    - academic-research-skills: CC-BY-NC-4.0
    - nature-skills: MIT
---

# IEEE Academic Paper

This is a scaffold skill for developing an IEEE-first manuscript workflow.

## Development intent

Build from the local reference repositories in `../../ref_repos/` while preserving attribution and license constraints documented in `../../NOTICE.md`.

## Target behavior

Use this skill for IEEE-oriented writing tasks:

- IEEE conference or journal manuscript planning
- IEEEtran LaTeX structure
- IEEE numbered citations and BibTeX checks
- Abstract and Index Terms
- Related Work, Method/System Model, Experiments, Ablation, Complexity, Limitations, Conclusion
- Camera-ready and page-limit checks

## IEEE defaults

- Citation style: IEEE numbered references (`[1]`, `[2]`)
- Preferred output: `main.tex` + `refs.bib` + `figures/` + `tables/`
- Template target: IEEEtran
- Writing style: concise, technical, evidence-first, contribution-focused

## Future implementation notes

- Add IEEE writing guide in `references/ieee_writing_guide.md`.
- Add IEEE citation checklist in `references/ieee_citation_checklist.md`.
- Add IEEEtran templates in `templates/`.
- Keep copied/adapted upstream text clearly attributed.
