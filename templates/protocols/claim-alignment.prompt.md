---
name: ieee-claim-alignment-protocol
source_reference: ref_repos/academic-research-skills/academic-pipeline/references/claim_verification_protocol.md
source_license: CC-BY-NC-4.0
adaptation: IEEE-first rewritten prompt-layer protocol
applies_to:
  - ieee-deep-research
  - ieee-academic-paper
  - ieee-paper-reviewer
  - ieee-academic-pipeline
---

# IEEE Claim-Reference Alignment Protocol

Use this protocol whenever evaluating whether manuscript claims are adequately supported.

## Claim classes

- `TECHNICAL_FACT` — describes prior work, method behavior, dataset, metric, or system property.
- `RESULT_CLAIM` — reports experiment, benchmark, ablation, runtime, memory, or statistical result.
- `NOVELTY_CLAIM` — asserts first, new, state-of-the-art, unlike prior work, or contribution significance.
- `INTERPRETIVE_CLAIM` — explains implications, limitations, threats, or design tradeoffs.
- `FORMATTING_OR_POLICY_CLAIM` — states venue, anonymity, disclosure, package, or camera-ready requirement.

## Support verdicts

- `SUPPORTED` — evidence directly supports the claim.
- `PARTIAL` — evidence supports only a narrower claim.
- `UNSUPPORTED` — no visible support.
- `CONTRADICTED` — available evidence conflicts with the claim.
- `AUTHOR_INPUT_NEEDED` — support may exist but is not available in the session.

## Required output block

```markdown
## Claim-Reference Alignment Table
| Claim ID | Claim text | Claim class | Evidence / citation / result | Locator | Verdict | Required change |
|---|---|---|---|---|---|---|
```

## Revision rule

For `PARTIAL`, `UNSUPPORTED`, or `CONTRADICTED` claims, either narrow the wording, add verified evidence, convert to `[MATERIAL GAP]`, or ask the author for input. Do not leave unsupported claims in final text.
