#!/usr/bin/env node

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sourceRoot = path.join(root, 'content');
const translationRoot = path.join(
  root,
  'i18n',
  'zh-Hans',
  'docusaurus-plugin-content-docs',
  'current'
);
const manifestPath = path.join(root, 'i18n', 'zh-Hans', 'SOURCES.json');

// English pages that are allowed to ship without a Chinese mirror, for now.
// Paths are relative to `content/`, exactly as they appear in the messages
// below: 'docs/react/Testing.mdx'.
//
// Add an entry when a new English page must land before its translation, so
// the page is not held hostage by the translation. The check still prints it
// on every run, so the gap stays visible instead of being forgotten.
//
// Remove the entry as soon as the Chinese page exists. The check warns about
// an entry that is no longer needed, and about an entry whose English page is
// gone. A stale allowlist is how this rots.
//
// This list only excuses a *missing* translation. A Chinese page whose English
// source changed still fails the build, allowlist or not.
const I18N_PENDING = [];

function listMarkdownFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  const files = [];

  function visit(currentDirectory) {
    for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
      const entryPath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        visit(entryPath);
      } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
        files.push(
          path.relative(directory, entryPath).split(path.sep).join('/')
        );
      }
    }
  }

  visit(directory);
  return files.sort();
}

function sourceHash(file) {
  const contents = fs.readFileSync(path.join(sourceRoot, file));
  return crypto.createHash('sha256').update(contents).digest('hex');
}

function currentSources() {
  const sources = {};

  for (const file of listMarkdownFiles(translationRoot)) {
    const sourcePath = path.join(sourceRoot, file);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Chinese page has no English source: ${file}`);
    }
    sources[file] = sourceHash(file);
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
    `Recorded ${Object.keys(manifest.sources).length} Chinese source hashes.`
  );
}

function checkManifest() {
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Source manifest does not exist: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (
    manifest.version !== 1 ||
    manifest.algorithm !== 'sha256' ||
    !manifest.sources ||
    typeof manifest.sources !== 'object'
  ) {
    throw new Error('Source manifest has an unsupported format.');
  }

  const failures = [];
  const notices = [];
  const translatedFiles = listMarkdownFiles(translationRoot);
  const translatedSet = new Set(translatedFiles);
  const sourceFiles = listMarkdownFiles(sourceRoot).filter(
    (file) => !file.startsWith('api/')
  );
  const sourceSet = new Set(sourceFiles);
  const pending = new Set(I18N_PENDING);

  for (const file of sourceFiles) {
    if (translatedSet.has(file)) continue;

    if (pending.has(file)) {
      notices.push(`Pending translation: ${file}`);
      continue;
    }

    failures.push(`Missing Chinese page: ${file}`);
  }

  for (const file of pending) {
    if (!sourceSet.has(file)) {
      notices.push(
        `Stale I18N_PENDING entry, no English page there: ${file}`
      );
    } else if (translatedSet.has(file)) {
      notices.push(
        `Stale I18N_PENDING entry, the Chinese page exists — remove it: ${file}`
      );
    }
  }

  for (const file of translatedFiles) {
    const expectedHash = manifest.sources[file];
    if (!expectedHash) {
      failures.push(`Missing source hash: ${file}`);
      continue;
    }

    const sourcePath = path.join(sourceRoot, file);
    if (!fs.existsSync(sourcePath)) {
      failures.push(`Chinese page has no English source: ${file}`);
      continue;
    }

    if (sourceHash(file) !== expectedHash) {
      failures.push(`English source changed: ${file}`);
    }
  }

  for (const file of Object.keys(manifest.sources)) {
    if (!translatedSet.has(file)) {
      failures.push(`Source hash has no Chinese page: ${file}`);
    }
  }

  notices.forEach((notice) => console.warn(notice));

  if (failures.length) {
    failures.forEach((failure) => console.error(failure));
    process.exitCode = 1;
    return;
  }

  console.log(
    `${translatedFiles.length} Chinese pages match their recorded English sources.`
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
