#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const GALLERY_PATH = path.join(ROOT, 'src/pages/docs/sandbox.html.tsx');
const ENGLISH_ROOT = path.join(ROOT, 'content/docs/sandbox');
const CHINESE_ROOT = path.join(
  ROOT,
  'i18n/zh-Hans/docusaurus-plugin-content-docs/current/docs/sandbox'
);
const CODE_PATH = path.join(ROOT, 'i18n/zh-Hans/code.json');
const CHINESE_LOCALE_ROOT = path.join(ROOT, 'i18n/zh-Hans');
const IMAGE_ROOT = path.join(ROOT, 'static/assets/demos');
const failures = [];
const checkTranslations = process.argv.includes('--translations');

function frontmatterValue(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return undefined;
  return match[1].trim().replace(/^("|')|("|')$/g, '');
}

function pageInfo(root, file) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const title = frontmatterValue(source, 'title');
  const label = frontmatterValue(source, 'sidebar_label') ?? title;
  const slug = frontmatterValue(source, 'slug');
  return { label, path: `sandbox/${path.posix.basename(slug)}` };
}

const gallerySource = fs.readFileSync(GALLERY_PATH, 'utf8');
const itemPattern =
  /^ {4}'([^']+)': \{\n {6}image: '([^']+)',\n {6}path: '([^']+)',\n {4}\},/gm;
const galleryItems = [];
let match;
while ((match = itemPattern.exec(gallerySource))) {
  galleryItems.push({ label: match[1], image: match[2], path: match[3] });
}

const sourceFiles = fs
  .readdirSync(ENGLISH_ROOT)
  .filter((file) => /\.mdx?$/.test(file))
  .sort();
const sourcePages = new Map(
  sourceFiles.map((file) => {
    const info = pageInfo(ENGLISH_ROOT, file);
    return [info.path, { ...info, file }];
  })
);
const galleryPaths = new Set();
const hasChineseTranslation =
  checkTranslations && fs.existsSync(CHINESE_LOCALE_ROOT);
const code = hasChineseTranslation
  ? JSON.parse(fs.readFileSync(CODE_PATH, 'utf8'))
  : null;

for (const item of galleryItems) {
  if (galleryPaths.has(item.path)) {
    failures.push(`Duplicate gallery path: ${item.path}`);
  }
  galleryPaths.add(item.path);

  const page = sourcePages.get(item.path);
  if (!page) {
    failures.push(`Gallery item has no sandbox page: ${item.path}`);
    continue;
  }
  if (item.label !== page.label) {
    failures.push(
      `English gallery label differs for ${item.path}: ` +
        `${JSON.stringify(item.label)} != ${JSON.stringify(page.label)}`
    );
  }
  if (!fs.existsSync(path.join(IMAGE_ROOT, item.image))) {
    failures.push(`Gallery image does not exist: ${item.image}`);
  }

  if (hasChineseTranslation) {
    const chinesePage = pageInfo(CHINESE_ROOT, page.file);
    const slug = path.posix.basename(item.path, '.html');
    const id = `demos.item.${slug}`;
    const entry = code[id];
    if (!entry) {
      failures.push(`Chinese gallery id does not exist: ${id}`);
    } else {
      if (entry.message !== chinesePage.label) {
        failures.push(
          `Chinese gallery label differs for ${item.path}: ` +
            `${JSON.stringify(entry.message)} != ${JSON.stringify(chinesePage.label)}`
        );
      }
      const expectedDescription = `Demo gallery label for ${item.path}`;
      if (entry.description !== expectedDescription) {
        failures.push(
          `Chinese gallery description differs for ${id}: ` +
            `${JSON.stringify(entry.description)} != ${JSON.stringify(expectedDescription)}`
        );
      }
    }
  }
}

for (const pagePath of sourcePages.keys()) {
  if (!galleryPaths.has(pagePath)) {
    failures.push(`Sandbox page is missing from the gallery: ${pagePath}`);
  }
}

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else {
  console.log(
    `${galleryItems.length} sandbox pages have gallery entries and images` +
      (hasChineseTranslation ? ', plus matching Chinese labels.' : '.')
  );
}
