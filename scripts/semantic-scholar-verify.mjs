#!/usr/bin/env node
import { setTimeout as delay } from "node:timers/promises";

const title = process.argv.slice(2).join(" ").trim();
if (!title || ["-h", "--help"].includes(title)) {
  console.error("Usage: node scripts/semantic-scholar-verify.mjs <paper title>");
  console.error("Outputs JSON with VERIFIED / MISMATCH / NOT_FOUND / AUTHOR_INPUT_NEEDED.");
  process.exit(title ? 0 : 1);
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function levenshtein(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j += 1) rows[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      rows[i][j] = Math.min(
        rows[i - 1][j] + 1,
        rows[i][j - 1] + 1,
        rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return rows[a.length][b.length];
}

function similarity(a, b) {
  const left = normalize(a);
  const right = normalize(b);
  if (!left || !right) return 0;
  const distance = levenshtein(left, right);
  return 1 - distance / Math.max(left.length, right.length);
}

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 15000);

try {
  const params = new URLSearchParams({
    query: title,
    limit: "5",
    fields: "title,authors,year,venue,externalIds,url,paperId",
  });
  const response = await fetch(`https://api.semanticscholar.org/graph/v1/paper/search?${params}`, {
    signal: controller.signal,
    headers: { "User-Agent": "pi-academic-research-ieee/0.1" },
  });
  if (response.status === 429) await delay(1000);
  if (!response.ok) throw new Error(`Semantic Scholar HTTP ${response.status}`);
  const payload = await response.json();
  const candidates = Array.isArray(payload.data) ? payload.data : [];
  const ranked = candidates
    .map((paper) => ({ paper, titleSimilarity: similarity(title, paper.title ?? "") }))
    .sort((a, b) => b.titleSimilarity - a.titleSimilarity);
  const best = ranked[0];
  if (!best) {
    console.log(JSON.stringify({ inputTitle: title, verdict: "NOT_FOUND", candidates: [] }, null, 2));
    process.exit(0);
  }
  const verdict = best.titleSimilarity >= 0.7 ? "VERIFIED" : "MISMATCH";
  console.log(JSON.stringify({
    inputTitle: title,
    verdict,
    titleSimilarity: Number(best.titleSimilarity.toFixed(3)),
    best: best.paper,
    candidates: ranked.map((item) => ({ titleSimilarity: Number(item.titleSimilarity.toFixed(3)), ...item.paper })),
  }, null, 2));
} catch (error) {
  console.log(JSON.stringify({
    inputTitle: title,
    verdict: "AUTHOR_INPUT_NEEDED",
    error: error instanceof Error ? error.message : String(error),
  }, null, 2));
} finally {
  clearTimeout(timeout);
}
