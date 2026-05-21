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

## Package shape

```text
pi-academic-research-ieee/
├── package.json
├── README.md
├── docs/
│   └── USAGE.md
├── extensions/
│   └── index.ts
├── skills/
│   ├── ieee-deep-research/
│   ├── ieee-academic-paper/
│   ├── ieee-paper-reviewer/
│   └── ieee-academic-pipeline/
├── references/
├── scripts/
├── templates/
└── ref_repos/              # local-only, gitignored
```

## Usage / 使用方式

For the full usage guide, see [`docs/USAGE.md`](docs/USAGE.md).
完整中文使用說明請看 [`docs/USAGE.md`](docs/USAGE.md)。

### Quick start / 快速開始

From this repository / 在本專案根目錄執行：

```bash
npm install
pi -e .
```

Inside Pi, verify the package and list commands / 進入 Pi 後確認套件與指令是否載入：

```text
/ieee-ars-info
/ieee-ars-modes
```

From another project, install the local package with / 若要在其他專案使用本地套件：

```bash
pi install /absolute/path/to/pi-academic-research-ieee
```

### Common commands / 常用指令

- `/ars-pipeline` — end-to-end IEEE research-to-submission workflow.  
  從研究構想到投稿前檢查的完整 IEEE 工作流。
- `/ars-plan` — IEEE manuscript planning, contribution map, and author questions.  
  規劃 IEEE 論文架構、貢獻主張、證據缺口與作者待回答問題。
- `/ars-lit-review` — related-work matrix, baselines, datasets, metrics, and evidence map.  
  整理文獻回顧、baseline、dataset、metric 與 claim-evidence map。
- `/ars-paper` — IEEE-oriented manuscript drafting workflow.  
  依照 IEEE 風格協助撰寫 manuscript、section draft 或完整草稿。
- `/ars-review` — IEEE-style technical peer review and revision roadmap.  
  用 IEEE reviewer 角度檢查 novelty、technical soundness、實驗、ablation、reproducibility 與 venue fit。
- `/ars-citation-check` — IEEE numbered-citation and BibTeX issue report.  
  檢查 IEEE 編號引用、BibTeX metadata、引用缺口與格式問題。

### Recommended first prompt / 建議第一個 prompt

```text
/ars-pipeline
目標：IEEE conference / journal / unknown
主題：...
目前階段：idea / literature review / outline / draft / revision / camera-ready
已有資料：papers、datasets、baselines、metrics、results、figures、tables
希望輸出：research plan / outline / draft / review / checklist
```

## Local development

Run the smoke test:

```bash
npm test
```

List skill files:

```bash
npm run check:skills
```

Check package contents before publishing:

```bash
npm run pack:dry-run
```

## Licensing

This repository currently uses `CC-BY-NC-4.0` by default and is marked `private: true` in `package.json`.

See [`NOTICE.md`](NOTICE.md) before publishing or redistributing.
