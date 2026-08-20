#!/usr/bin/env node

/**
 * Verifies the post-build machine-readable surfaces.
 *
 * checksitemap.js only validates URLs that appear in sitemap.xml, and the .md
 * twins never enter the sitemap. Without this check a new page ships without
 * its markdown twin forever, and nothing says so.
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const failures = [];

const { collect, resolveBuiltPage } = require('./generate-llms');

// Check against the pages that actually have an MDX source, not against every
// built HTML file — routes like /docs/sandbox.html come from a React page in
// src/pages/ and have no markdown to twin.
for (const [label, contentRoot, buildRoot] of [
  ['en', path.join(ROOT, 'content'), path.join(ROOT, 'build')],
  [
    'zh-Hans',
    path.join(ROOT, 'i18n', 'zh-Hans', 'docusaurus-plugin-content-docs', 'current'),
    path.join(ROOT, 'build', 'zh-Hans'),
  ],
]) {
  const routes = [...collect(contentRoot).keys()];
  const missing = routes.filter((route) => {
    const html = resolveBuiltPage(buildRoot, route);
    return !html || !fs.existsSync(html.replace(/\.html$/, '.md'));
  });
  if (missing.length) {
    failures.push(
      `${label}: ${missing.length} of ${routes.length} pages have no .md twin, e.g. ${missing[0]}`
    );
  } else {
    console.log(`${label}: ${routes.length} pages, each with a markdown twin.`);
  }
}

// The Chinese index must not be the English one.
const zhIndex = path.join(ROOT, 'build', 'zh-Hans', 'llms.txt');
const enIndex = path.join(ROOT, 'build', 'llms.txt');
if (!fs.existsSync(zhIndex) || !fs.existsSync(enIndex)) {
  failures.push('llms.txt missing from one or both locale builds.');
} else {
  const zh = fs.readFileSync(zhIndex, 'utf-8');
  if (zh === fs.readFileSync(enIndex, 'utf-8')) {
    failures.push('zh-Hans/llms.txt is byte-identical to the English one.');
  } else {
    const cjk = (zh.match(/[一-鿿]/g) || []).length;
    if (cjk < 200) failures.push(`zh-Hans/llms.txt has only ${cjk} CJK characters — not localised.`);
    else console.log(`zh-Hans/llms.txt is localised (${cjk} CJK characters).`);
  }
}

if (failures.length) {
  failures.forEach((f) => console.error(f));
  process.exitCode = 1;
}
