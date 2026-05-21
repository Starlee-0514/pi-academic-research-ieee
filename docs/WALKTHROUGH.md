# 完整範例：從研究題目到 IEEE 投稿前檢查

這份 walkthrough 示範如何用本套件把一個研究想法逐步推進到 IEEE-style manuscript 與投稿前檢查。內容是使用方式範例，不代表真實實驗結果；請用自己的資料、引用與結果替換。

## 範例情境

```markdown
目標 venue/type：IEEE conference，8 pages，雙欄
研究主題：Edge devices 上的 lightweight anomaly detection
目前階段：已有初步 idea 和部分實驗結果
已有資料：
- Datasets：SWaT、WADI、自建 IoT sensor log
- Baselines：Isolation Forest、Autoencoder、TinyML CNN
- Metrics：F1、AUC、latency、memory footprint
- 初步結果：方法在 SWaT/WADI 上 F1 較最佳 baseline 高，但尚未做完整 ablation
限制：需要匿名投稿；兩週內完成初稿
希望輸出：research plan、related-work matrix、paper outline、review checklist
```

## Step 1：啟動完整 pipeline

在 Pi 中輸入：

```text
/ars-pipeline
目標 venue/type：IEEE conference，8 pages，雙欄
研究主題：Edge devices 上的 lightweight anomaly detection
目前階段：已有初步 idea 和部分實驗結果
已有資料：SWaT、WADI、自建 IoT sensor log；Isolation Forest、Autoencoder、TinyML CNN；F1、AUC、latency、memory footprint
限制：匿名投稿；兩週內完成初稿
希望輸出：research plan、related-work matrix、paper outline、review checklist
```

預期 Pi 會先建立類似這樣的狀態卡：

```markdown
## IEEE Pipeline State
- Target venue/type: IEEE conference, 8 pages, double-column
- Current stage: INTAKE / RESEARCH
- Paper title/topic: Lightweight anomaly detection on edge devices
- Contribution claim: AUTHOR_INPUT_NEEDED
- Available evidence: datasets, baselines, metrics, preliminary results
- Missing evidence: ablation, robustness, exact quantitative table, citation metadata
- Baselines/datasets/metrics: partially specified
- Citation status: missing related-work evidence map
- Review status: not reviewed
- Final package status: not started
- Next recommended route: ieee-deep-research:lit-review
```

重點：如果 Pi 要求你確認 scope，先確認或補充缺失資訊，不要直接跳到寫全文。

## Step 2：做文獻與 baseline mapping

```text
/ars-lit-review
請針對 edge-device anomaly detection 整理近五年相關研究，特別關注：
1. TinyML / edge inference
2. Industrial control system datasets such as SWaT and WADI
3. Latency and memory-constrained baselines
4. IEEE/ACM/USENIX/ML venues中的可比較方法
輸出 related-work matrix、baseline fairness notes、citation gaps。
```

理想輸出應包含：

```markdown
| Source | Venue/Year | Problem | Method | Dataset | Metrics | Baselines | Code/Data | Supports | Risks |
|---|---|---|---|---|---|---|---|---|---|
| ... | ... | ... | ... | SWaT/WADI | F1/AUC/latency | ... | ... | Related Work / Baseline | Need metadata check |
```

作者接著要做：

- 補齊 BibTeX metadata。
- 刪除不相關或不可靠來源。
- 確認 baseline 是否公平，例如硬體、模型大小、tuning budget 是否可比。

## Step 3：規劃 IEEE 論文架構

```text
/ars-plan
請根據目前 topic、datasets、baselines、metrics 和 related-work matrix，規劃 IEEE conference paper。
請輸出：
1. tentative title
2. contribution claims
3. claim-evidence map
4. section outline
5. missing experiments ranked by priority
```

建議期待輸出：

```markdown
## Contribution Contract
1. Claim: A lightweight detector reduces memory footprint while preserving detection F1.
   Evidence: SWaT/WADI result table, memory profiling, latency profiling.
   Risk: Need ablation to isolate lightweight module contribution.

2. Claim: The method is practical for edge devices.
   Evidence: latency, RAM/flash usage, hardware description.
   Risk: Need target hardware details and power/throughput if claimed.
```

如果 Pi 標示 `AUTHOR_INPUT_NEEDED`，請補資料，不要要求它自行填數字。

## Step 4：補實驗與 ablation 清單

```text
/ars-methodology
請審查以下 experiment plan 是否足夠支撐 IEEE conference submission：
- Datasets: SWaT, WADI, IoT sensor log
- Metrics: F1, AUC, latency, memory footprint
- Baselines: Isolation Forest, Autoencoder, TinyML CNN
- Planned ablations: remove feature compression, remove temporal module, vary model size
請輸出 blockers、high-priority fixes、reproducibility checklist。
```

可能需要補的項目：

- dataset split 與 leakage 檢查；
- baseline tuning budget；
- confidence interval 或 repeated runs；
- model size、hardware、batch size、runtime setting；
- ablation 對應每個 contribution claim。

## Step 5：開始寫 manuscript draft

建議分段要求，不要一次要求寫完整論文：

```text
/ars-paper
請先根據以下資料草擬 IEEE Introduction：
- Problem: edge anomaly detection needs accurate and resource-efficient inference
- Gap: existing high-accuracy models often exceed edge memory/latency budgets
- Proposed method: [貼你的真實方法，不要空泛]
- Evidence: [貼你的真實結果表]
- Contributions: [貼 Step 3 確認後的 contribution contract]
要求：IEEE concise style；不要編造 citation；缺引用處標成 [CITATION_NEEDED]。
```

完成 Introduction 後，再分別處理：

1. Related Work
2. Problem Formulation / System Model
3. Method
4. Experimental Setup
5. Results and Analysis
6. Ablation / Robustness
7. Limitations
8. Conclusion

## Step 6：投稿前審稿

```text
/ars-review
請用 IEEE reviewer 角度審查以下 manuscript draft。
請特別檢查：novelty、technical soundness、baseline fairness、ablation coverage、reproducibility、limitations、IEEE venue fit。
[貼 manuscript 或相關段落]
```

建議把輸出整理成 revision plan：

```markdown
| Priority | Issue | Why it matters | Fix |
|---|---|---|---|
| BLOCKER | Missing fair baseline against recent tiny anomaly detector | Weak novelty/acceptance risk | Add baseline X or justify exclusion |
| HIGH | No ablation for compression module | Main claim unsupported | Add remove-compression ablation |
```

## Step 7：修回與 re-review

```text
/ars-revision
以下是 review issues 與我已完成的修改，請幫我整理 revision plan 和 response skeleton：
[貼 review issues]
[貼修改摘要]
```

修改後再做：

```text
/ars-rereview
請檢查 revised manuscript 是否已解決以下 prior concerns：
[貼 prior concerns]
[貼 revised text 或修改摘要]
```

## Step 8：citation 與 IEEEtran 檢查

```text
/ars-citation-check
請檢查以下 references 和 in-text citations 是否符合 IEEE numbered citation，並列出缺 DOI、缺 venue、格式不一致或 citation-support mismatch 的項目。
[貼 references / BibTeX / manuscript citation snippets]
```

```text
/ars-format-convert
請根據 IEEEtran camera-ready/submission package 角度檢查：
- main.tex 結構
- figures/tables 是否適合雙欄
- anonymous metadata 是否移除
- bibliography 是否可編譯
- supplementary/code/data disclosure 是否完整
```

## 最終檢查清單

提交前至少確認：

- [ ] 每個 contribution claim 都有結果、引用、推導或明確限制。
- [ ] baseline 是近期且公平的，排除項目有合理說明。
- [ ] dataset split、metrics、hardware、hyperparameters、seeds 足夠重現。
- [ ] ablation 對應主要方法元件。
- [ ] limitations 與 threats to validity 明確。
- [ ] IEEE numbered citations 與 BibTeX metadata 已人工核對。
- [ ] figures/tables 在 IEEE 雙欄格式可讀。
- [ ] 匿名投稿版本沒有作者 metadata 或自我揭露痕跡。
- [ ] camera-ready 或 submission package 符合目標 venue 官方 author kit。
