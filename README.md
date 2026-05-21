# Pi Academic Research IEEE

IEEE-first academic research and manuscript workflow package for Pi.

This repository is a new workspace scaffold for developing a Pi package inspired by:

- [`Imbad0202/academic-research-skills`](https://github.com/Imbad0202/academic-research-skills) — CC BY-NC 4.0
- [`Yuan1z0825/nature-skills`](https://github.com/Yuan1z0825/nature-skills) — MIT

The upstream repositories are cloned into `ref_repos/` for local reference only and are intentionally gitignored.

## Goal

Build an IEEE-oriented Pi package for academic research workflows:

- IEEE manuscript planning and drafting
- IEEE citation and BibTeX checks
- IEEEtran LaTeX package generation
- Technical paper review with IEEE-style criteria
- Response-to-reviewer and camera-ready workflows

## Planned Pi package shape

```text
pi-academic-research-ieee/
├── package.json
├── extensions/
│   └── index.ts
├── skills/
│   ├── ieee-deep-research/
│   ├── ieee-academic-paper/
│   ├── ieee-paper-reviewer/
│   └── ieee-academic-pipeline/
├── references/
├── templates/
└── ref_repos/              # local-only, gitignored
```

## Local development

Install or test locally with Pi:

```bash
pi -e .
# or, from another project
pi install /absolute/path/to/pi-academic-research-ieee
```

Check package contents before publishing:

```bash
npm run pack:dry-run
```

## Licensing

This repository currently uses `CC-BY-NC-4.0` by default and is marked `private: true` in `package.json`.

See [`NOTICE.md`](NOTICE.md) before publishing or redistributing.
