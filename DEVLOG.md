# Development Log

One entry per working session. Use the format below consistently.
Entries are prepended (newest first).

---

## 2026-05-22 — Added skill metadata and safety protocol lint

**Changes:**
- Added `scripts/lint-skill-metadata.mjs` to verify each `SKILL.md` has `metadata.data_access_level`, `metadata.task_type`, a safety protocol registry, and at least one protocol reference.
- Updated `package.json` so `npm test` runs both the extension smoke test and the new skill metadata/protocol lint; added `npm run lint:skills`.
- Updated `ROADMAP.md` to mark the lint check completed.
- Ran `npm test`; smoke test and lint passed.

**Decisions:**
- Kept the lint dependency-free with simple frontmatter checks instead of introducing a YAML parser or schema dependency.

**Next Steps:**
- [HIGH] Create the Phase 1 `templates/agents/` prompt templates.
- [MED] Expand the lint to validate future agent template registries once templates are added.

## 2026-05-22 — Added prompt-layer ASR safety protocols

**Changes:**
- Added `templates/protocols/anti-leakage.prompt.md`, `citation-verification.prompt.md`, `claim-alignment.prompt.md`, and `score-trajectory.prompt.md` as IEEE-first prompt-layer safety protocols.
- Updated `skills/ieee-deep-research/SKILL.md`, `skills/ieee-academic-paper/SKILL.md`, `skills/ieee-paper-reviewer/SKILL.md`, and `skills/ieee-academic-pipeline/SKILL.md` with safety protocol registries and `data_access_level` / `task_type` metadata.
- Updated `templates/README.md`, `ROADMAP.md`, `references/source-ledger.md`, and `NOTICE.md` to document the new protocols and upstream attribution.

**Decisions:**
- Implemented safety features first as prompt-layer contracts rather than API or CI automation, keeping the package dependency-free and Pi-native.
- Kept Semantic Scholar, claim-audit, VLM figure verification, and schema enforcement as later optional automation layers.

**Next Steps:**
- [HIGH] Build the Phase 1 `templates/agents/` prompt templates and connect them through skill template registries.
- [MED] Add a lightweight lint script to verify `data_access_level`, `task_type`, and protocol references remain present.
- [LOW] Prototype optional Semantic Scholar verification after the prompt-layer citation protocol stabilizes.

## 2026-05-22 — Added ASR parity prompt-template migration design

**Changes:**
- Added `docs/ASR_PARITY_PROMPT_TEMPLATE_DESIGN.md` to define a one-agent/one-prompt-template migration strategy, proposed template layout, skill registry approach, phased implementation plan, and handling strategy for parity features such as anti-leakage, citation verification, claim-reference alignment, score trajectory, and metadata.
- Updated `ROADMAP.md` with the high-priority in-progress ASR parity prompt-template migration item.
- Updated `references/source-ledger.md` and `NOTICE.md` with attribution and exact upstream source paths for the design adaptation.

**Decisions:**
- Chose a design-first pass per user direction before modifying skill behavior.
- Chose rewritten IEEE-first prompt templates rather than direct upstream prompt-body copying, while preserving the upstream agent-role inventory and safety/protocol concepts as structural references.

**Next Steps:**
- [HIGH] Implement Phase 1 minimal prompt templates under `templates/agents/` and add template registries to the four IEEE skills.
- [HIGH] Add `data_access_level` and `task_type` metadata to skill frontmatter.
- [MED] Add prompt-layer anti-leakage, citation-verification, and score-trajectory output contracts before adding optional API/script automation.

## 2026-05-22 — Added configurable extension display language and settings panel

**Changes:**
- Updated `extensions/index.ts` so command descriptions, router notifications, and `/ieee-ars-modes` output can display in English by default or Traditional Chinese via `PI_IEEE_LANG` / `.pi/ieee-academic-research-ieee.json`.
- Added `/ars-setting`, an overlay settings panel that lets users select the display language and press `Ctrl+S` or Enter to save, then reloads the extension.
- Updated `scripts/smoke-extension.mjs` to validate default English, environment-variable language selection, project config language selection, and config-file writing.
- Documented the display-language setting and `/ars-setting` workflow in `README.md` and `docs/USAGE.md`.
- Updated `ROADMAP.md` to mark configurable extension display language and the interactive settings panel completed.

**Decisions:**
- Kept English as the default for backward compatibility, with `PI_IEEE_LANG` taking precedence over project config and invalid config falling back safely to English.
- Saved interactive settings to the project-local `.pi/ieee-academic-research-ieee.json` file so the choice persists without changing global Pi settings.

**Next Steps:**
- [LOW] Consider adding localized skill frontmatter descriptions if Pi surfaces skill descriptions prominently in the UI.

## 2026-05-22 — Started IEEE article-reading ingestion strategy

**Changes:**
- Added `docs/IEEE_INGESTION_PLAN.md` with a comprehensive Zotero-first, Playwright-optional ingestion strategy, architecture, evidence status model, MVP phases, and decision matrix.
- Updated `ROADMAP.md` with a high-priority in-progress item for IEEE article access and reading workflows.
- Refined the implementation direction around Zotero-first article management, optional Playwright web-page reading, and source-grounded extraction constraints.

**Decisions:**
- Prefer a Zotero-first architecture for durable metadata, citation keys, attachments, notes, and user-managed access rights; use Playwright only as an optional browser-assisted retrieval/reading layer when the user already has lawful access.
- Avoid designing around paywall bypass, credential automation, or bulk scraping; the agent should preserve provenance and operate on user-provided or user-authorized sources.

**Next Steps:**
- [HIGH] Draft an architecture document for the IEEE ingestion pipeline and source-grounded reading model.
- [MED] Define MVP commands for adding, indexing, and querying IEEE papers from Zotero collections.
- [MED] Decide whether Playwright should be packaged as an optional integration or kept as a local recipe.

## 2026-05-22 — Added example IEEE workflow walkthrough

**Changes:**
- Added `docs/WALKTHROUGH.md` with a complete example from research intake through literature review, paper planning, methodology audit, drafting, review, revision, citation checks, and IEEEtran final checks.
- Updated `README.md` and `docs/USAGE.md` to link the walkthrough.
- Updated `ROADMAP.md` to mark the example walkthrough completed.
- Ran `npm test`; smoke test passed with 15 ASR-compatible routes validated.

**Decisions:**
- Kept the walkthrough explicitly example-only and warned users to replace placeholder claims, citations, and results with their own verified evidence.

**Next Steps:**
- [MED] Add reusable prompt templates for common IEEE research, writing, review, and citation-check tasks.
- [LOW] Add terminal transcript screenshots once the Pi UX stabilizes.

## 2026-05-22 — Added user-facing usage documentation

**Changes:**
- Added `docs/USAGE.md` with installation, command examples, skill mapping, input templates, limitations, and local development checks.
- Updated `README.md` with a usage entry point, bilingual quick start, common `/ars-*` commands, recommended first prompt, current package shape, and development commands.
- Updated `ROADMAP.md` to mark usage documentation completed.
- Ran `npm test`; smoke test passed with 15 ASR-compatible routes validated.
- Checked `README.md` and `docs/USAGE.md` for command/link consistency and aligned README package-shape wording with the new `docs/` directory.

**Decisions:**
- Kept usage guidance command-first because the Pi extension router is the recommended interface over direct skill invocation.

**Next Steps:**
- [MED] Add example IEEE project walkthroughs once templates and camera-ready assets are added.
- [MED] Add screenshots or terminal transcripts after the package UX stabilizes.

## 2026-05-22 — Validated local Pi package loading

**Changes:**
- Ran `pi -e . --no-session -p "/ieee-ars-modes"` and `pi -e . --no-session -p "/ieee-ars-info"`; both exited successfully.
- Ran `pi -e . --no-session --mode json -p "/ieee-ars-modes"` to confirm JSON-mode startup exits successfully.
- Updated `ROADMAP.md` to mark Pi package validation completed.

**Decisions:**
- Validated non-agent extension commands instead of `/ars-plan` because `/ars-plan` intentionally dispatches a model turn and can time out in smoke tests.

**Next Steps:**
- [HIGH] Begin nature-skills integration after selecting which nature workflows to adapt first.
- [MED] Add IEEEtran templates, reviewer rubric references, and camera-ready package templates.

## 2026-05-22 — Completed ASR-style IEEE pipeline skill pass

**Changes:**
- Rewrote `skills/ieee-academic-pipeline/SKILL.md` as an IEEE-specific ASR-style orchestrator with stage routing, state card, checkpoints, integrity checks, and final package expectations.
- Updated `references/source-ledger.md` with the exact upstream Academic Research Skills pipeline source path and CC BY-NC 4.0 license.
- Updated `ROADMAP.md` to mark the IEEE-first ASR-style skill implementation as completed.

**Decisions:**
- Used `ref_repos/academic-research-skills/academic-pipeline/SKILL.md` and `ref_repos/academic-research-skills/MODE_REGISTRY.md` (CC BY-NC 4.0) as structural sources while keeping the implementation IEEE-first.
- Kept the orchestrator lightweight: it routes to specialized skills and enforces checkpoints rather than duplicating all skill bodies.

**Next Steps:**
- [HIGH] Validate end-to-end ASR-style command flow with `/ars-pipeline`, `/ars-plan`, `/ars-lit-review`, and `/ars-review`.
- [HIGH] Begin nature-skills integration only after validating ASR-equivalent IEEE behavior.
- [MED] Add IEEEtran templates, reviewer rubric references, and camera-ready package templates.

## 2026-05-22 — Added npm smoke test script

**Changes:**
- Updated `package.json` so `npm test` runs `scripts/smoke-extension.mjs`.

**Decisions:**
- Kept the smoke test dependency-free and model-free to validate ASR command routing quickly in local development and packaging checks.

**Next Steps:**
- [HIGH] Expand `ieee-academic-pipeline` as the ASR-style orchestrator.
- [MED] Consider adding skill frontmatter/schema linting once a test convention is established.

## 2026-05-22 — Expanded ASR-style IEEE research and reviewer skills

**Changes:**
- Rewrote `skills/ieee-deep-research/SKILL.md` into an IEEE-oriented research workflow with ASR-compatible modes, evidence matrices, baseline mapping, claim verification, and systematic-review planning.
- Rewrote `skills/ieee-paper-reviewer/SKILL.md` into an IEEE technical review workflow with ASR-compatible modes, multi-perspective review lenses, methodology audit, re-review verification, and decision labels.
- Updated `references/source-ledger.md` with exact upstream source paths and license notes for both adaptations.

**Decisions:**
- Used `ref_repos/academic-research-skills/deep-research/SKILL.md`, `ref_repos/academic-research-skills/academic-paper-reviewer/SKILL.md`, and `ref_repos/academic-research-skills/MODE_REGISTRY.md` (CC BY-NC 4.0) as structural sources while rewriting content for IEEE-first behavior.
- Preserved the ASR sequence of specialized modes before introducing nature-skills logic.

**Next Steps:**
- [HIGH] Expand `ieee-academic-pipeline` as the ASR-style orchestrator tying research, writing, review, revision, and camera-ready checks together.
- [HIGH] Validate `/ars-lit-review`, `/ars-fact-check`, `/ars-review`, and `/ars-methodology` against the expanded skill bodies.
- [MED] Add reusable IEEE references/templates for reviewer rubrics, related-work matrix, and camera-ready packaging.

## 2026-05-22 — Added non-model extension smoke test

**Changes:**
- Exported `ROUTES` and `buildSkillPrompt` from `extensions/index.ts` so command routing can be tested without launching a model turn.
- Added `scripts/smoke-extension.mjs` to validate ASR-compatible route count, key commands, `/ars-plan` routing, and generated skill prompt shape.

**Decisions:**
- Chose a direct Node smoke test instead of `pi -p /ars-plan` because `/ars-plan` correctly triggers an agent turn and can exceed short non-interactive timeouts.

**Next Steps:**
- [HIGH] Expand `ieee-deep-research` and `ieee-paper-reviewer` so the tested router has complete ASR-style backend coverage.
- [MED] Add this smoke test to an npm script after the package test convention is decided.

## 2026-05-22 — Expanded the ASR-style IEEE paper skill

**Changes:**
- Rewrote `skills/ieee-academic-paper/SKILL.md` from scaffold into an active IEEE-first manuscript workflow with ASR-compatible modes, intake contract, IEEE section architecture, revision handling, citation checks, and camera-ready checks.
- Added `references/source-ledger.md` to track exact upstream source paths, licenses, and adaptation type.

**Decisions:**
- Used `ref_repos/academic-research-skills/academic-paper/SKILL.md` and `ref_repos/academic-research-skills/MODE_REGISTRY.md` (CC BY-NC 4.0) as structural references, but rewrote the skill content for IEEE-first behavior.
- Kept nature-skills integration deferred until ASR-compatible IEEE behavior is validated.

**Next Steps:**
- [HIGH] Expand `ieee-deep-research`, `ieee-paper-reviewer`, and `ieee-academic-pipeline` to match the ASR-style router coverage.
- [HIGH] Validate `/ars-plan`, `/ars-citation-check`, and `/ars-format-convert` against the expanded `ieee-academic-paper` skill.
- [MED] Add IEEEtran templates and BibTeX validation references.

## 2026-05-22 — Added ASR-compatible IEEE command router

**Changes:**
- Reworked `extensions/index.ts` into an ASR-style command router with `/ars-*` commands that dispatch to the current IEEE Pi skills and carry mode, spectrum, oversight, and expected-output metadata.
- Added `/ieee-ars-modes` to show the available ASR-compatible command mappings.
- Updated `ROADMAP.md` to mark the ASR-compatible Pi extension command router as completed.

**Decisions:**
- Used `ref_repos/academic-research-skills/MODE_REGISTRY.md` (CC BY-NC 4.0) as the primary source for mode taxonomy and routing logic, while rewriting the Pi extension implementation natively for this package.
- Deferred nature-skills integration until the ASR-style routing and IEEE skill behavior are verified.

**Next Steps:**
- [HIGH] Expand IEEE skill bodies so routed `/ars-*` commands have substantive IEEE workflows behind them.
- [HIGH] Validate router behavior in Pi with commands such as `/ieee-ars-modes`, `/ars-plan`, `/ars-lit-review`, and `/ars-review`.
- [MED] Add a dedicated source-path ledger if future work closely adapts upstream prompt text or templates.

## 2026-05-22 — Completed initial upstream reuse audit

**Changes:**
- Added `references/upstream-content-audit.md` documenting the practical reuse policy for `ref_repos/academic-research-skills/` (CC BY-NC 4.0) and `ref_repos/nature-skills/` (MIT).
- Updated `ROADMAP.md` to mark the initial license/content audit as completed.

**Decisions:**
- Both upstream projects are usable when their license terms are preserved: Academic Research Skills remains non-commercial with attribution/modification notices, and nature-skills requires MIT copyright/permission notice preservation for substantial copied material.
- First implementation pass will prefer IEEE-native rewrites, with exact source paths recorded before any direct copying or close adaptation.

**Next Steps:**
- [HIGH] Implement IEEE-first skill bodies, references, templates, and validation checklists.
- [HIGH] Maintain an exact source-path ledger whenever upstream text, templates, scripts, or structured checklists are copied or closely adapted.
- [MED] Test local package loading with `pi -e .`.

## 2026-05-22 — Initialized the IEEE-first Pi package workspace

**Changes:**
- Created the project scaffold for a Pi package with `package.json`, `README.md`, `NOTICE.md`, `.gitignore`, and placeholder Pi extension/skill directories.
- Cloned `academic-research-skills` and `nature-skills` into `ref_repos/` as local-only reference repositories.
- Added scaffold IEEE-oriented skills under `skills/` without copying upstream prompt bodies.
- Added placeholder `references/` and `templates/` directories for future IEEE-specific implementation.

**Decisions:**
- Marked the package as `private: true` and `CC-BY-NC-4.0` because planned work may adapt material from the CC BY-NC 4.0 `academic-research-skills` project.
- Kept reference repositories in `ref_repos/` and gitignored them to avoid accidental vendoring or nested-repo commits.

**Next Steps:**
- [HIGH] Audit upstream content before copying or adapting any prompt text, templates, scripts, or references.
- [HIGH] Implement IEEE-first skill bodies, references, templates, and validation checklists.
- [MED] Test local package loading with `pi -e .`.
