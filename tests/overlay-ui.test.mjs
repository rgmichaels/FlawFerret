import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync('src/content/content_script.ts', 'utf8');

test('overlay header title is branded as FlawFerret', () => {
  assert.match(source, /headerTitle\.textContent\s*=\s*"FlawFerret"/);
  assert.doesNotMatch(source, /Copied to clipboard/);
});

test('capture flow does not auto-write to clipboard', () => {
  assert.doesNotMatch(source, /await\s+writeClipboard\(/);
  assert.doesNotMatch(source, /async function writeClipboard\(/);
});

test('footer no longer includes Copy button action', () => {
  assert.doesNotMatch(source, /footerActions\.appendChild\(copyButton\)/);
  assert.doesNotMatch(source, /const copyButton = document\.createElement\("button"\)/);
});

test('missing Jira project validation uses red error color', () => {
  assert.match(source, /jiraStatus\.style\.color\s*=\s*"#c62828"/);
  assert.match(source, /jiraStatus\.textContent\s*=\s*"Choose Jira project"/);
});
