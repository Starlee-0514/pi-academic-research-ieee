# 使用指南：Pi Academic Research IEEE

這個套件提供一組 IEEE 優先的 Pi skills 與 `/ars-*` 指令，協助你完成從研究構想到投稿前檢查的工作流：文獻研究、論文規劃、IEEE 風格撰寫、技術審稿、修回與 camera-ready 檢查。

如果你想看完整操作範例，請先讀 [`docs/WALKTHROUGH.md`](WALKTHROUGH.md)。

> 目前套件標記為 `private: true`，主要供本機 Pi 開發與個人/非商業研究工作流使用。

## 1. 安裝與啟用

在此專案根目錄執行：

```bash
npm install
pi -e .
```

或在其他專案中安裝本地套件：

```bash
pi install /absolute/path/to/pi-academic-research-ieee
```

啟用後可在 Pi 中使用本套件提供的 skills 與指令。

## 2. 快速確認是否載入成功

在 Pi 裡輸入：

```text
/ieee-ars-info
```

查看可用模式：

```text
/ieee-ars-modes
```

如果你只想用命令列做基本驗證，也可以執行：

```bash
npm test
```

## 3. 最常用指令

### 從零開始一篇 IEEE 論文

```text
/ars-pipeline 我的研究主題是：...
```

適合完整流程：研究範圍 → 文獻與基線 → 論文架構 → 草稿 → 審稿 → 修回 → 最終檢查。

### 規劃論文架構

```text
/ars-plan 我想寫一篇 IEEE conference paper，主題是 ...
```

輸出通常包含：研究問題、貢獻主張、IEEE 章節架構、證據缺口、下一步問題。

### 做文獻回顧與基線整理

```text
/ars-lit-review 請幫我整理近五年關於 ... 的 IEEE/ACM/頂會相關研究
```

適合產出 related-work matrix、資料集、指標、baseline、公平比較與研究缺口。

### 檢查事實或 claims

```text
/ars-fact-check 請檢查以下 claims 是否需要引用或證據：...
```

會產生 claim-by-claim 驗證表，標示哪些需要 citation、實驗結果或作者補充。

### 撰寫或改寫 IEEE manuscript

```text
/ars-paper 請根據以下 outline 與實驗結果草擬 IEEE-style manuscript：...
```

若資料不足，skill 會先問必要問題，不會自行編造實驗、引用或結果。

### 只寫摘要與 Index Terms

```text
/ars-abstract 請根據以下方法與結果寫 IEEE abstract 和 Index Terms：...
```

### 審稿與投稿前技術檢查

```text
/ars-review 請用 IEEE reviewer 角度審查以下 manuscript：...
```

會從 novelty、technical soundness、baselines、ablation、reproducibility、limitations、venue fit 等角度評估。

### 只檢查方法與實驗設計

```text
/ars-methodology 請審查我的 experiments 是否足以支撐 claims：...
```

### 修回與 re-review

```text
/ars-revision 以下是 reviewer comments 和我的草稿，請幫我做 revision plan：...
```

```text
/ars-rereview 請檢查 revised manuscript 是否已回應先前 reviewer concerns：...
```

### IEEEtran / citation / camera-ready 格式檢查

```text
/ars-format-convert 請把我的 manuscript 檢查成 IEEEtran submission checklist
```

```text
/ars-citation-check 請檢查以下 references 是否符合 IEEE numbered citation 與 BibTeX 要求
```

## 4. Skills 對應表

| 需求 | 建議指令 | 底層 skill |
|---|---|---|
| 完整研究到投稿流程 | `/ars-pipeline` | `ieee-academic-pipeline` |
| 研究範圍、文獻、證據地圖 | `/ars-research`, `/ars-lit-review`, `/ars-fact-check` | `ieee-deep-research` |
| 論文規劃、草稿、摘要、格式 | `/ars-plan`, `/ars-paper`, `/ars-abstract`, `/ars-format-convert` | `ieee-academic-paper` |
| 技術審稿、方法檢查、re-review | `/ars-review`, `/ars-methodology`, `/ars-rereview` | `ieee-paper-reviewer` |

你也可以直接呼叫 skill：

```text
/skill:ieee-academic-paper
```

但一般建議使用 `/ars-*` 指令，因為它們會自動帶入適合的 mode、審查強度與預期輸出。

## 5. 建議輸入格式

為了得到最準確的結果，請盡量提供：

```markdown
目標 venue/type：IEEE conference / IEEE journal / unknown
研究主題：
目前階段：idea / literature review / outline / draft / revision / camera-ready
主要貢獻 claim：
可用證據：datasets、metrics、baselines、results、figures、tables
限制：page limit、deadline、anonymous review、venue rules
希望輸出：outline / related-work matrix / manuscript draft / review / checklist
```

範例：

```text
/ars-plan
目標：IEEE conference，8 pages
主題：edge devices 上的 lightweight anomaly detection
目前有：三個 datasets、F1/AUC 結果、兩個 baseline，還沒有 ablation
希望輸出：論文架構、claim-evidence map、需要補的實驗清單
```

## 6. 重要限制

- 不會編造不存在的 citation、DOI、實驗結果、資料集、reviewer comment 或 line number。
- 若缺少必要資訊，會標示 `AUTHOR_INPUT_NEEDED` 或先提問。
- Citation 與 BibTeX metadata 仍需作者最後自行核對。
- 不同 IEEE venue 的格式規則可能不同；請以目標 venue 官方 CFP / author kit 為準。

## 7. 本機開發與封裝檢查

列出技能檔：

```bash
npm run check:skills
```

執行 smoke test：

```bash
npm test
```

檢查 npm package 內容：

```bash
npm run pack:dry-run
```

## 8. 推薦工作流

1. `/ars-pipeline` 建立整體狀態卡。
2. `/ars-lit-review` 補文獻、baseline、dataset、metric matrix。
3. `/ars-plan` 確認 IEEE 論文架構與貢獻。
4. `/ars-paper` 分段草擬 manuscript。
5. `/ars-review` 做投稿前審稿。
6. `/ars-revision` 修正 blocking issues。
7. `/ars-citation-check` 與 `/ars-format-convert` 做最終檢查。
