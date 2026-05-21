# Development Log

One entry per working session. Use the format below consistently.
Entries are prepended (newest first).

---

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
