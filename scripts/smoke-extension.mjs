import assert from 'node:assert/strict';
import { ROUTES, buildSkillPrompt } from '../extensions/index.ts';

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

console.log(`OK: ${ROUTES.length} ASR-compatible routes validated.`);
