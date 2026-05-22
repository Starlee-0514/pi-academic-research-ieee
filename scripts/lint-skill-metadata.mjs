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

function filesMatching(dir, predicate) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return filesMatching(path, predicate);
    return entry.isFile() && predicate(entry.name) ? [path] : [];
  });
}

function skillFiles(dir) {
  return filesMatching(dir, (name) => name === "SKILL.md");
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

const requiredAgentTemplates = filesMatching(join(root, "templates", "agents"), (name) => name.endsWith(".prompt.md"))
  .map((path) => relative(root, path).replaceAll("\\", "/"));
const skills = skillFiles(skillsDir);
const allSkillText = skills.map((file) => readFileSync(file, "utf8")).join("\n");
const errors = [];

for (const protocol of requiredProtocols) {
  if (!existsSync(join(root, protocol))) {
    errors.push(`Missing protocol template: ${protocol}`);
  }
}

for (const template of requiredAgentTemplates) {
  const fullPath = join(root, template);
  if (!existsSync(fullPath)) {
    errors.push(`Missing agent prompt template: ${template}`);
    continue;
  }
  const templateText = readFileSync(fullPath, "utf8");
  if (!frontmatterOf(templateText)) {
    errors.push(`${template}: missing YAML frontmatter`);
  }
  const skillReference = template.replace("templates/", "../../templates/");
  if (!allSkillText.includes(skillReference)) {
    errors.push(`${template}: not referenced by any skill registry`);
  }
}

for (const file of skills) {
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
  if (!text.includes("## Agent prompt template registry")) {
    errors.push(`${rel}: missing Agent prompt template registry section`);
  }
  if (!text.includes("## Mode dispatch")) {
    errors.push(`${rel}: missing Mode dispatch section`);
  }

  const usesAnyProtocol = requiredProtocols.some((protocol) => text.includes(protocol.replace("templates/", "../../templates/")));
  if (!usesAnyProtocol) {
    errors.push(`${rel}: no safety protocol references found`);
  }

  const usesAnyAgentTemplate = requiredAgentTemplates.some((template) => text.includes(template.replace("templates/", "../../templates/")));
  if (!usesAnyAgentTemplate) {
    errors.push(`${rel}: no agent prompt template references found`);
  }
}

if (errors.length) {
  console.error("Skill metadata/protocol lint failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`OK: ${skills.length} skill files and ${requiredAgentTemplates.length} agent templates passed metadata/registry lint.`);
