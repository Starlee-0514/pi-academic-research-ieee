#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const skillsDir = join(root, "skills");
const allowedDataLevels = new Set(["raw", "redacted", "verified_only"]);
const allowedTaskTypes = new Set(["open-ended", "outcome-gradable"]);
const requiredProtocols = [
  "templates/protocols/anti-leakage.prompt.md",
  "templates/protocols/citation-verification.prompt.md",
  "templates/protocols/claim-alignment.prompt.md",
  "templates/protocols/score-trajectory.prompt.md",
];

function skillFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return skillFiles(path);
    return entry.isFile() && entry.name === "SKILL.md" ? [path] : [];
  });
}

function frontmatterOf(text) {
  if (!text.startsWith("---\n")) return "";
  const end = text.indexOf("\n---", 4);
  return end === -1 ? "" : text.slice(4, end);
}

function metadataValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^\\s{2}${key}:\\s*(.+)\\s*$`, "m"));
  return match?.[1]?.trim();
}

const errors = [];

for (const protocol of requiredProtocols) {
  if (!existsSync(join(root, protocol))) {
    errors.push(`Missing protocol template: ${protocol}`);
  }
}

for (const file of skillFiles(skillsDir)) {
  const rel = relative(root, file);
  const text = readFileSync(file, "utf8");
  const fm = frontmatterOf(text);
  if (!fm) {
    errors.push(`${rel}: missing YAML frontmatter`);
    continue;
  }

  const dataLevel = metadataValue(fm, "data_access_level");
  const taskType = metadataValue(fm, "task_type");
  if (!allowedDataLevels.has(dataLevel ?? "")) {
    errors.push(`${rel}: metadata.data_access_level must be one of ${[...allowedDataLevels].join(", ")}`);
  }
  if (!allowedTaskTypes.has(taskType ?? "")) {
    errors.push(`${rel}: metadata.task_type must be one of ${[...allowedTaskTypes].join(", ")}`);
  }

  if (!text.includes("## Safety protocol registry")) {
    errors.push(`${rel}: missing Safety protocol registry section`);
  }

  const usesAnyProtocol = requiredProtocols.some((protocol) => text.includes(protocol.replace("templates/", "../../templates/")));
  if (!usesAnyProtocol) {
    errors.push(`${rel}: no safety protocol references found`);
  }
}

if (errors.length) {
  console.error("Skill metadata/protocol lint failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`OK: ${skillFiles(skillsDir).length} skill files include metadata and safety protocol references.`);
