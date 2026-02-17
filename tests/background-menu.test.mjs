import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync('src/sw/qa_issue_background_service.ts', 'utf8');

test('context menu label matches product name', () => {
  assert.match(source, /title:\s*"FlawFerret"/);
});

test('context menu handler performs on-demand content script injection', () => {
  assert.match(source, /chrome\.scripting\.executeScript\(/);
  assert.match(source, /capture-and-copy/);
});
