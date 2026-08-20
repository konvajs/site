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
  const translatedFiles = listMarkdownFiles(translationRoot);
  const translatedSet = new Set(translatedFiles);
  const sourceFiles = listMarkdownFiles(sourceRoot).filter(
    (file) => !file.startsWith('api/')
  );

  for (const file of sourceFiles) {
    if (!translatedSet.has(file)) {
      failures.push(`Missing Chinese page: ${file}`);
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
