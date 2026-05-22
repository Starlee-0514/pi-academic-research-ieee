# Notices and Attribution

This workspace/package is an IEEE-first Pi package scaffold that is intended to be developed with reference to two upstream projects:

## Upstream references

1. **Academic Research Skills**
   - Repository: https://github.com/Imbad0202/academic-research-skills
   - Author: Cheng-I Wu
   - License: Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)
   - Local reference clone: `ref_repos/academic-research-skills/` (gitignored)
   - Notes: Because this upstream license is non-commercial, any derivative material copied or adapted from it must remain non-commercial unless separate permission is obtained from the rightsholder.

2. **nature-skills**
   - Repository: https://github.com/Yuan1z0825/nature-skills
   - Author: Yuan Yizhe
   - License: MIT License
   - Local reference clone: `ref_repos/nature-skills/` (gitignored)
   - Notes: MIT attribution and license text are preserved in `LICENSE.nature-skills-MIT`.

## Adapted material in this package

As of 2026-05-22, `docs/ASR_PARITY_PROMPT_TEMPLATE_DESIGN.md` adapts the upstream Academic Research Skills architecture and agent-role inventory into an IEEE-first prompt-template migration plan. The prompt-layer protocols under `templates/protocols/` adapt upstream safety concepts for anti-leakage, citation verification, claim alignment, and score trajectory tracking. The agent prompts under `templates/agents/` adapt upstream agent-role inventories into IEEE-first prompt templates. The exact local source paths are recorded in `references/source-ledger.md`. These files are rewritten structural adaptations, not direct copies of upstream prompt bodies.

## Project licensing posture

This scaffold is marked `private: true` in `package.json` and uses `CC-BY-NC-4.0` as the package license by default because the planned work may adapt non-commercial upstream material from Academic Research Skills.

Before publishing to npm or another public registry:

- Audit whether any upstream prompt text, templates, protocols, scripts, or documentation were copied or adapted.
- Keep CC BY-NC 4.0 if derivative material from Academic Research Skills remains.
- Do not relicense Academic Research Skills-derived content as MIT, Apache-2.0, ISC, or another permissive/commercial license.
- Preserve attribution to both upstream projects.
- Consider obtaining explicit permission if commercial use or commercial distribution is intended.

This notice is not legal advice.
