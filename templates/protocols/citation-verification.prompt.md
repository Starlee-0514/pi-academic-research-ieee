---
name: ieee-citation-verification-protocol
source_reference: ref_repos/academic-research-skills/deep-research/references/semantic_scholar_api_protocol.md
source_license: CC-BY-NC-4.0
adaptation: IEEE-first rewritten prompt-layer protocol
applies_to:
  - ieee-deep-research
  - ieee-academic-paper
  - ieee-academic-pipeline
---

# IEEE Citation Verification Protocol

Use this protocol for literature review, source triage, citation checks, and final package review.

## Verification levels

- `VERIFIED` — title, authors, venue, year, and DOI/URL are consistent with a reliable source or user-provided authoritative metadata.
- `MISMATCH` — a source likely exists, but one or more fields conflict or the cited claim does not match the source.
- `NOT_FOUND` — the citation cannot be found or appears fabricated based on available access.
- `AUTHOR_INPUT_NEEDED` — verification cannot be completed because search/source access is unavailable or metadata is insufficient.

Do not use vague statuses such as “probably real” or “difficult to verify” as final verdicts.

## Minimum metadata to check

- author list or first author + et al.;
- full title;
- venue or publisher;
- year;
- DOI, URL, arXiv ID, Semantic Scholar ID, IEEE Xplore ID, ACM DL ID, or equivalent when available;
- citation role: background, method, dataset, metric, baseline, limitation, contradiction, or claim support.

## Required output block

```markdown
## Citation Verification Table
| Ref ID | Claimed citation | Metadata checked | Supports claim? | Verdict | Fix |
|---|---|---|---|---|---|
```

## Blocking rule

Any `NOT_FOUND` citation or high-impact `MISMATCH` must remain out of manuscript prose unless the author supplies corrected metadata or approves removal/reframing.
