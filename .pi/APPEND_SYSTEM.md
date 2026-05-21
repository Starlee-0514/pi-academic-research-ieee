# Project Context

> This project is a Node/Pi package scaffold for developing IEEE-first academic research, writing, review, and submission workflows for Pi.

- **Language / Runtime:** Node.js / TypeScript for Pi extension scaffolding; Markdown for skills
- **Key frameworks:** Pi package resources (`extensions/`, `skills/`); no app framework detected
- **Package manager:** npm
- **Linter / Formatter:** none detected

---

# Development Environment

> Commands to install dependencies, run the project, and run tests.

- **Install deps:** `npm install`
- **Run / Start:** `pi -e .`
- **Run tests:** `[TBD — ask user]`
- **Lint / Format:** `[TBD — ask user]`

---

# Development Workflow

Follow these steps for every coding task:

1. Understand the change before starting — read relevant files first
2. Make the change in small, logical increments
3. If a change touches >3 files or alters behavior, pause and summarize before proceeding
4. After completing, update tracking files per the Tracking Rules below
5. If something unexpected is found (hidden side effects, conflicting conventions), **stop and ask the user** before continuing

---

# Tracking Rules

These rules are mandatory after every significant change:

| What happened | What to update |
|---|---|
| New feature added or started | Add to `ROADMAP.md` → In Progress |
| Feature completed | Move to `ROADMAP.md` → Completed |
| Bug fixed or refactor done | Add entry to `DEVLOG.md` |
| Architectural decision made | Add to `DEVLOG.md` under Decisions |
| Breaking change introduced | Add to `DEVLOG.md` AND note in `CHANGELOG.md` if it exists |
| New dependency added | Note in `DEVLOG.md` with rationale |
| Upstream material copied/adapted | Update `NOTICE.md` and record exact source path/license in `DEVLOG.md` |

DEVLOG.md entry format (prepend — newest first):
```
## YYYY-MM-DD — [One-line summary]

**Changes:**
- [specific file/module + what changed]

**Decisions:**
- [rationale for approach taken, or "None"]

**Next Steps:**
- [concrete remaining tasks with priority tag]
```

ROADMAP.md entry format:
```
- [HIGH/MED/LOW] Task name — brief description if needed
```
When completing an item, move it to ✅ Completed and append date:
```
- [HIGH] Task name ✓ YYYY-MM-DD
```

---

# Code Conventions

- Pi skills must live under `skills/<skill-name>/SKILL.md` and use lowercase hyphenated names.
- Pi extension entrypoint is `extensions/index.ts` and should avoid unnecessary runtime dependencies.
- Keep `ref_repos/` local-only and gitignored; do not commit nested upstream repositories.
- Preserve attribution and license notes when copying or adapting upstream material from `academic-research-skills` or `nature-skills`.
- IEEE-oriented implementation should prefer IEEE numbered citations, IEEEtran LaTeX, concise technical prose, reproducibility checks, baseline fairness, ablation coverage, and camera-ready validation.
- No conventions file found — ask user before establishing formatter/linter rules.

---

# When to Ask the User

Always pause and ask before:
- Deleting or overwriting any file not created in the current session
- Changing project structure (moving directories, renaming modules)
- Adding a new dependency or updating a major one
- Choosing between two valid technical approaches
- Making changes outside the scope of the original request
- Publishing to npm or changing `private: true`
- Relicensing or removing upstream attribution/license notices
