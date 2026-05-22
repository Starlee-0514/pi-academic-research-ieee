---
name: ieee-anti-leakage-protocol
source_reference: ref_repos/academic-research-skills/academic-paper/references/anti_leakage_protocol.md
source_license: CC-BY-NC-4.0
adaptation: IEEE-first rewritten prompt-layer protocol
applies_to:
  - ieee-academic-paper
  - ieee-academic-pipeline
---

# IEEE Anti-Leakage Protocol

Use this protocol whenever drafting, revising, summarizing, or formatting factual manuscript content.

## Purpose

Separate **provided or verified research material** from the model's general background knowledge. The model may use general knowledge for language, structure, and explanation, but not to invent empirical facts, citations, results, dataset details, venue rules, or reviewer comments.

## Allowed factual sources

A factual claim may be written as manuscript content only if it is grounded in one of these sources:

1. User-provided data, result, figure, table, code output, or manuscript text.
2. A cited source with enough bibliographic detail to verify.
3. A clearly marked assumption, derivation, or design choice supplied by the author.
4. A placeholder explicitly labeled for later author input.

## Hard rules

- Do not fill missing evidence from memory.
- Do not create plausible citations, DOIs, venues, line numbers, datasets, baselines, or quantitative results.
- Do not silently strengthen novelty, performance, or generality claims.
- If evidence is missing, write `[MATERIAL GAP: <specific missing item>]` or `AUTHOR_INPUT_NEEDED`.
- Keep a material-gap log when drafting or revising.

## Required output block

```markdown
## Material-Gap Log
| Location | Missing material | Why it matters | Safe next action |
|---|---|---|---|
```
