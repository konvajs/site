#!/usr/bin/env node

/**
 * Guard the first-render path in the generated site.
 *
 * This check uses built HTML because Docusaurus can change script attributes
 * and asset markup during generation. It intentionally checks only stable,
 * user-visible contracts instead of bundle hashes or timing measurements.
 */

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const buildRoot = path.join(root, 'build');
const checkTranslations = process.argv.includes('--translations');
const failures = [];
const blockingScripts = new Map();
const widgetsThatMustBeDeferred = new Set(['cdn.convertbox.com']);
const eagerWidgets = new Map();
const eagerFrames = new Map();

function listHtmlFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!checkTranslations && entryPath === path.join(buildRoot, 'zh-Hans')) {
        continue;
      }
      files.push(...listHtmlFiles(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(entryPath);
    }
  }
  return files;
}

function scriptTags(html) {
  return [...html.matchAll(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*>/gi)].map(
    (match) => match[0]
  );
}

function iframeTags(html) {
  return [...html.matchAll(/<iframe\b[^>]*\bsrc=["'][^"']+["'][^>]*>/gi)].map(
    (match) => match[0]
  );
}

function attribute(tag, name) {
  return new RegExp(`\\b${name}=["']([^"']+)["']`, 'i').exec(tag)?.[1];
}

for (const file of listHtmlFiles(buildRoot)) {
  const html = fs.readFileSync(file, 'utf8');
  for (const tag of scriptTags(html)) {
    const src = attribute(tag, 'src');
    if (!src || src.startsWith('/')) continue;

    let hostname;
    try {
      hostname = new URL(src).hostname;
    } catch {
      hostname = '';
    }
    if (widgetsThatMustBeDeferred.has(hostname)) {
      const current = eagerWidgets.get(src) || {count: 0, example: file};
      current.count += 1;
      eagerWidgets.set(src, current);
    }

    const doesNotBlockParser =
      /\b(?:async|defer)(?:\s|=|>)/i.test(tag) ||
      /\btype=["']module["']/i.test(tag);
    if (!doesNotBlockParser) {
      const current = blockingScripts.get(src) || {count: 0, example: file};
      current.count += 1;
      blockingScripts.set(src, current);
    }
  }

  for (const tag of iframeTags(html)) {
    const src = attribute(tag, 'src');
    if (!src || src.startsWith('/') || /\bloading=["']lazy["']/i.test(tag)) {
      continue;
    }
    const current = eagerFrames.get(src) || {count: 0, example: file};
    current.count += 1;
    eagerFrames.set(src, current);
  }
}

for (const [src, result] of eagerWidgets) {
  failures.push(
    `${src} loads before user interaction on ${result.count} pages, e.g. ${path.relative(
      root,
      result.example
    )}`
  );
}

for (const [src, result] of blockingScripts) {
  failures.push(
    `${src} blocks HTML parsing on ${result.count} pages, e.g. ${path.relative(
      root,
      result.example
    )}`
  );
}

for (const [src, result] of eagerFrames) {
  failures.push(
    `${src} is an external iframe without loading="lazy" on ${result.count} pages, e.g. ${path.relative(
      root,
      result.example
    )}`
  );
}

function checkHomepage(homePath, label) {
  if (!fs.existsSync(homePath)) {
    failures.push(`${label} homepage does not exist; run the production build first.`);
    return;
  }
  const home = fs.readFileSync(homePath, 'utf8');
  const userImages = [...home.matchAll(/<img\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) =>
      /\bsrc=["']\/(?:zh-Hans\/)?assets\/users\//i.test(tag)
    );

  if (userImages.length === 0) {
    failures.push(`${label} homepage has no lazy-loadable showcase images.`);
  }
  for (const tag of userImages) {
    if (!/\bloading=["']lazy["']/i.test(tag)) {
      failures.push(`${label} homepage has a showcase image without loading="lazy".`);
      break;
    }
    if (!/\bdecoding=["']async["']/i.test(tag)) {
      failures.push(`${label} homepage has a showcase image without decoding="async".`);
      break;
    }
  }
  if (/background-image:[^;"']*\/assets\/users\//i.test(home)) {
    failures.push(`${label} homepage uses eager CSS backgrounds for showcase images.`);
  }
}

checkHomepage(path.join(buildRoot, 'index.html'), 'English');
if (checkTranslations) {
  checkHomepage(path.join(buildRoot, 'zh-Hans', 'index.html'), 'Chinese');
}

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else {
  console.log(
    'Built pages have no parser-blocking external scripts; ConvertBox waits for interaction; external embeds and homepage images are lazy.'
  );
}
