import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ROUTES, buildSkillPrompt, resolveDisplayLanguage, writeDisplayLanguageConfig } from '../extensions/index.ts';

assert.ok(Array.isArray(ROUTES), 'ROUTES must be an array');
assert.equal(ROUTES.length, 15, 'expected 15 ASR-compatible routes');

const commands = new Set(ROUTES.map((route) => route.command));
for (const command of ['ars-plan', 'ars-lit-review', 'ars-review', 'ars-pipeline']) {
  assert.ok(commands.has(command), `missing route: ${command}`);
}

const route = ROUTES.find((item) => item.command === 'ars-plan');
assert.ok(route, 'ars-plan route must exist');
assert.equal(route.skill, 'ieee-academic-paper');
assert.equal(route.mode, 'plan');

const prompt = buildSkillPrompt(route, 'draft an IEEE paper plan');
assert.match(prompt, /^\/skill:ieee-academic-paper/);
assert.match(prompt, /Mode: plan/);
assert.match(prompt, /Oversight: Very High/);
assert.match(prompt, /draft an IEEE paper plan/);

assert.equal(resolveDisplayLanguage(process.cwd(), {}), 'en');
assert.equal(resolveDisplayLanguage(process.cwd(), { PI_IEEE_LANG: 'zh-TW' }), 'zh-TW');

const tempCwd = mkdtempSync(join(tmpdir(), 'pi-ieee-lang-'));
mkdirSync(join(tempCwd, '.pi'));
writeFileSync(join(tempCwd, '.pi', 'ieee-academic-research-ieee.json'), JSON.stringify({ displayLanguage: '中文' }));
assert.equal(resolveDisplayLanguage(tempCwd, {}), 'zh-TW');

const savedConfig = writeDisplayLanguageConfig(tempCwd, 'en');
assert.ok(existsSync(savedConfig), 'language config should be written');
assert.deepEqual(JSON.parse(readFileSync(savedConfig, 'utf8')), { displayLanguage: 'en' });
assert.equal(resolveDisplayLanguage(tempCwd, {}), 'en');

console.log(`OK: ${ROUTES.length} ASR-compatible routes validated.`);
