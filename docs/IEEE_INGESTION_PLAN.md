# IEEE Article Ingestion and Reading Plan

This plan refines how an IEEE-first Pi agent should read and reason over IEEE papers while respecting access limits, provenance, and reproducibility.

## Goals

- Let the agent work with IEEE papers the user can lawfully access.
- Preserve source provenance: DOI, IEEE Xplore URL, PDF path, Zotero item key, citation key, and extraction timestamp.
- Support source-grounded reading: every summary, claim, or citation recommendation should be traceable to paper sections, pages, or quoted snippets.
- Avoid paywall bypass, credential automation, bulk scraping, or hidden redistribution of copyrighted PDFs.

## Recommended Strategy: Zotero-first, Playwright-optional

### 1. Zotero-first core

Use Zotero as the durable paper library and citation authority.

Best for:
- Stable metadata: title, authors, year, venue, DOI, abstract, tags.
- User-managed PDFs and snapshots.
- BibTeX / Better BibTeX citation keys.
- Collections for projects, related work, baselines, methods, and rebuttal evidence.
- Repeatable local workflows without depending on browser state.

Agent responsibilities:
- Read Zotero collections/items through local export, Zotero API, or Better BibTeX output.
- Index user-attached PDFs when available.
- Build evidence matrices from extracted sections.
- Keep all outputs linked to Zotero item IDs and citation keys.

Primary limitation:
- Zotero only has what the user has added or can access. It does not solve discovery alone.

### 2. Playwright-assisted browser reading

Use Playwright as an optional access and discovery helper, not as the source of truth.

Best for:
- Opening an IEEE Xplore article page already accessible in the user's browser/session.
- Capturing metadata visible on the web page.
- Following DOI / IEEE links from Zotero metadata.
- Checking article page structure when PDF text extraction is poor.

Agent constraints:
- Do not automate paywall bypass or credential entry.
- Do not bulk crawl IEEE Xplore.
- Prefer user-confirmed single-paper or small-batch actions.
- Store only metadata, extracted snippets needed for grounding, and local references; avoid redistributing full copyrighted content.

Primary limitation:
- Browser pages are less stable than Zotero records and may fail due to login, institution access, CAPTCHA, layout changes, or rate limits.

### 3. PDF/text extraction layer

Use the user's local PDF attachment when available.

Best for:
- Section-aware reading: Abstract, Introduction, Related Work, Method, Experiments, Results, Limitations, References.
- Figure/table caption extraction.
- Page-grounded quotations.
- Claim verification and citation mapping.

Fallbacks:
- If PDF text extraction fails, use OCR only when the user has a lawful local copy.
- If no PDF exists, operate on metadata/abstract only and clearly mark the evidence as incomplete.

## Architecture

```text
User project
  └─ Zotero collection / exported BibTeX / local PDFs
       ↓
Ingestion adapter
  ├─ Zotero adapter: items, metadata, citation keys, attachment paths
  ├─ PDF adapter: text, pages, sections, captions, references
  └─ Browser adapter optional: IEEE page metadata and user-authorized page text
       ↓
Provenance store
  ├─ paper_id, zotero_key, citekey, DOI, URL
  ├─ local_pdf_path, extraction method, timestamp
  └─ access/evidence status
       ↓
Reading index
  ├─ section chunks with page anchors
  ├─ figures/tables/captions
  ├─ bibliography entries
  └─ extracted claims/contributions/baselines
       ↓
IEEE workflows
  ├─ literature review matrix
  ├─ related-work drafting
  ├─ baseline fairness audit
  ├─ citation support checking
  └─ reviewer-response evidence lookup
```

## Evidence Status Model

Every paper should carry a clear status:

- `metadata-only`: title/abstract/DOI available; no full-text support.
- `fulltext-local`: local user-provided PDF was extracted.
- `fulltext-browser`: user-authorized browser page text was used.
- `partial-extraction`: full text attempted but sections/pages are incomplete.
- `needs-user-access`: metadata exists, but full text is unavailable.

The agent should downgrade confidence when evidence is metadata-only or partial.

## MVP Scope

### Phase 1 — Zotero/local PDF MVP

Implement first because it is the most stable and compliant.

Commands or workflows:
- Import a Zotero collection export or Better BibTeX `.bib` file.
- Resolve local PDF attachments when paths are available.
- Extract text into section/page chunks.
- Produce a paper card for each article:
  - citation key
  - DOI / IEEE URL
  - venue/year
  - contribution
  - method
  - datasets/baselines
  - limitations
  - evidence status
- Generate an IEEE related-work matrix.

### Phase 2 — Optional Zotero API integration

Add live Zotero integration if local exports are too manual.

Options:
- Local Zotero data directory / Better BibTeX auto-export.
- Zotero Web API with user-provided API key.
- Read-only first; write-back later for tags/notes.

### Phase 3 — Playwright-assisted single-paper reading

Add only after the local workflow is reliable.

Capabilities:
- Open a user-provided IEEE Xplore URL.
- Extract visible metadata and abstract.
- Detect whether full text or PDF access appears available.
- Ask user before downloading/opening PDFs.
- Attach provenance to the corresponding Zotero item or temporary paper card.

### Phase 4 — Research workflow integration

Connect ingestion to existing IEEE skills:
- `/ars-lit-review`: source-grounded related-work table.
- `/ars-citation-check`: verify every claim has adequate support.
- `/ars-methodology`: extract datasets, baselines, metrics, ablations.
- `/ars-review`: assess novelty, technical soundness, reproducibility, and IEEE venue fit.

## Decision Matrix

| Approach | Strengths | Weaknesses | Recommended role |
|---|---|---|---|
| Zotero-first | Stable metadata, citations, local PDFs, project collections, reproducible | Requires user to maintain library | Core system |
| Playwright-first | Can inspect live IEEE pages, useful for discovery and metadata gaps | Fragile, login/access issues, scraping risk | Optional helper |
| PDF-only | Direct full-text grounding, works offline | Metadata/citation keys may be incomplete | Extraction layer |
| DOI/metadata-only | Lightweight, safe, fast | Cannot support detailed claims | Discovery/fallback only |

## Recommended Product Position

Build the agent as a **research-library reader**, not an IEEE crawler.

The safest and most useful framing:
- User curates papers in Zotero.
- Agent reads user-authorized metadata/PDFs.
- Browser automation is optional and transparent.
- Outputs are evidence-grounded and citation-manager-friendly.

## Open Questions

- Should the first implementation read Zotero via Better BibTeX export, Zotero Web API, or local Zotero storage?
- Should extracted text be stored as Markdown files, JSON chunks, or an internal index?
- Should the agent write notes/tags back into Zotero, or remain read-only at first?
- How much browser automation is acceptable for the intended users and institutions?
