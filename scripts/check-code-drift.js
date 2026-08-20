#!/usr/bin/env node

/**
 * Interface-string drift check.
 *
 * `check-i18n-drift.js` watches the pages under content/. This watches the
 * other half: the strings in src/, docusaurus.config.ts, and the sidebars.
 *
 * <Translate> resolves by id, not by message:
 *
 *   codeTranslations[id ?? message] ?? message ?? id
 *
 * So changing the English text behind an existing id leaves the old Chinese in
 * place, and nothing warns you. This records the English message for every id
 * and fails when one of them changes.
 *
 * The English side is extracted with Docusaurus itself rather than by parsing
 * JSX here, so the two always agree on what an id is.
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const englishRoot = path.join(root, 'i18n', 'en');
const chineseRoot = path.join(root, 'i18n', 'zh-Hans');
const manifestPath = path.join(chineseRoot, 'CODE_SOURCES.json');

// Every translation file Docusaurus writes for a locale.
const TRANSLATION_FILES = [
  'code.json',
  'docusaurus-theme-classic/navbar.json',
  'docusaurus-theme-classic/footer.json',
  'docusaurus-plugin-content-docs/current.json',
];

/**
 * Ids built at runtime, so `write-translations` cannot see them. The demo
 * gallery composes `demos.item.<Slug>` and `demos.section.<Name>` from its own
 * data. They are maintained by hand and have no extractable English source.
 */
const RUNTIME_ID_PREFIXES = ['demos.item.', 'demos.section.'];

function isRuntimeId(id) {
  return RUNTIME_ID_PREFIXES.some((prefix) => id.startsWith(prefix));
}

function extractEnglish() {
  // write-translations ADDS missing ids but keeps any message already on disk.
  // A stale i18n/en/ would therefore freeze the English baseline and hide the
  // exact drift this script looks for, so regenerate it from scratch.
  fs.rmSync(englishRoot, { recursive: true, force: true });

  execFileSync(
    'npx',
    ['docusaurus', 'write-translations', '--locale', 'en'],
    { cwd: root, stdio: 'pipe' }
  );
}

function readMessages(localeRoot) {
  const messages = {};

  for (const file of TRANSLATION_FILES) {
    const filePath = path.join(localeRoot, file);
    if (!fs.existsSync(filePath)) continue;

    const entries = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const [id, entry] of Object.entries(entries)) {
      if (!entry || typeof entry.message !== 'string') continue;
      messages[`${file}::${id}`] = entry.message;
    }
  }

  return messages;
}

function messageHash(message) {
  return crypto.createHash('sha256').update(message).digest('hex');
}

function currentSources() {
  extractEnglish();
  const english = readMessages(englishRoot);
  const sources = {};

  for (const [key, message] of Object.entries(english)) {
    sources[key] = messageHash(message);
  }

  return sources;
}

function writeManifest() {
  const manifest = {
    version: 1,
    algorithm: 'sha256',
    sources: currentSources(),
  };

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    `Recorded ${Object.keys(manifest.sources).length} English interface strings.`
  );
}

function checkManifest() {
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Interface-string manifest does not exist: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (
    manifest.version !== 1 ||
    manifest.algorithm !== 'sha256' ||
    !manifest.sources ||
    typeof manifest.sources !== 'object'
  ) {
    throw new Error('Interface-string manifest has an unsupported format.');
  }

  extractEnglish();
  const english = readMessages(englishRoot);
  const chinese = readMessages(chineseRoot);
  const failures = [];

  for (const [key, message] of Object.entries(english)) {
    if (!(key in chinese)) {
      failures.push(`Untranslated interface string: ${key}`);
      continue;
    }

    const expectedHash = manifest.sources[key];
    if (!expectedHash) {
      failures.push(`Missing English hash: ${key}`);
      continue;
    }

    if (messageHash(message) !== expectedHash) {
      failures.push(`English interface string changed: ${key}`);
    }
  }

  for (const key of Object.keys(chinese)) {
    const id = key.slice(key.indexOf('::') + 2);
    if (isRuntimeId(id)) continue;
    if (!(key in english)) {
      failures.push(`Chinese string has no English source: ${key}`);
    }
  }

  if (failures.length) {
    failures.forEach((failure) => console.error(failure));
    console.error(
      '\nUpdate i18n/zh-Hans/ to match, then run: npm run update:i18n-sources'
    );
    process.exitCode = 1;
    return;
  }

  const runtimeIds = Object.keys(chinese).filter((key) =>
    isRuntimeId(key.slice(key.indexOf('::') + 2))
  ).length;

  console.log(
    `${Object.keys(english).length} interface strings match their recorded English text ` +
      `(${runtimeIds} runtime ids maintained by hand).`
  );
}

try {
  if (process.argv.includes('--write')) {
    writeManifest();
  } else {
    checkManifest();
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
